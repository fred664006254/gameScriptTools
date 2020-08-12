class Obstacle extends BattleBaseEffect
{
    protected birthTime:number=0;
    protected _keep:number=0;
    protected _dmg:number=0;
    protected _diceId:string='';
    protected _radius:number=0;
    protected _cd:number=0;
    protected _endPos:{x:number,y:number}={x:0,y:0};
    /**陷阱状态 0待机状态攻击完后放到对象池，1飞行中还未攻击到，2飞行到指定位置放置 */
    protected status:(0|1|2)=0;
    protected diceData:DiceData;
    protected _lineDis:number=0;
    protected _mvEt:number=0;
    private static obstaclePool:{[key:string]:Obstacle[]}={};
    public constructor()
    {
        super();
    }

    public getIsMe():boolean{
        return this.diceData.isMe;
    }

    public init(diceData:DiceData,pos:{x:number,y:number},monsterdisline?:number):void
    {
        this.diceData=diceData;
        this.initData(diceData);
        let res=this.getRes();
        // this.initLoadRes(res);
        this.texture=ResMgr.getRes(res);
        this.anchorOffsetX=this.width*0.5;
        this.anchorOffsetY=this.height*0.5;
        this.setPosition(pos.x,pos.y);
        let posAllCfg=BattleStatus.getLimitPos();
        let posCfg=diceData.isMe?posAllCfg.me:posAllCfg.target;
        let keys=Object.keys(posCfg);
        let l=(keys.length-1);
        let idxNum = App.MathUtil.seededRandom(0,l,BattleStatus.battleLogicHasTickTime/(diceData.index));
        let idx=Math.floor(idxNum);
        let stPos:{x:number,y:number}=posCfg["pos"+idx];
        let edPos:{x:number,y:number}=posCfg["pos"+(idx+1)];
        let disScale=idxNum%1;
        let tPos:{x:number,y:number}={x:stPos.x,y:stPos.y};
        let diffX=edPos.x-stPos.x;
        let diffY=edPos.y-stPos.y;
        if(diffX==0)
        {
            tPos.y+=diffY*disScale;
        }
        else
        {
            tPos.x+=diffX*disScale;
        }
        this._lineDis=0;
        for(let i=1;i<=idx;i++)
        {
            let pos=posCfg["pos"+i];
            let lstPos=posCfg["pos"+(i-1)];
            this._lineDis+=Math.abs(pos.x-lstPos.x)+Math.abs(pos.y-lstPos.y);
        }
        
        if(monsterdisline){
            this._lineDis = monsterdisline;
        }
        else{
            this._lineDis+=Math.abs(diffX*disScale)+Math.abs(diffY*disScale);
        }
        this._endPos.x=tPos.x;
        this._endPos.y=tPos.y;
        this.setScale(40/this.width);
        this.status=1;
        this._mvEt=BattleStatus.battleLogicHasTickTime+30*10;
    }

    protected getRes():string{
        return "obstacle_"+this._diceId;
    }

    protected initData(diceData:DiceData):void
    {
        this._diceId=diceData.id;
        this._keep=diceData.property2*1000;
        this._dmg=diceData.property1;
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            let name = `effect_dice_${this._diceId}`;
            if(RES.hasRes(name)){
                SoundMgr.playEffect(name);
            }
        }
    }

    public fastTick(addT:number):void
    {
        let battleview : any = BattleStatus.scene;
        switch (this.status) {
            case 1:
                this.move(addT);
                break;
            case 2:
                if(this.checkEnd())
                {
                    this.dispose();
                }
                else
                {
                    if(battleview && battleview.isInRound()){
                            
                    }
                    else{
                        this.checkDamage();
                    }
                }
                break;
            default:
                break;
        }
    }

    protected move(addT:number):boolean
    {
        if(this.checkEnd()){

        }
        else{
            let diffX=this._endPos.x-this.x;
            let diffY=this._endPos.y-this.y;    
            let diffT=(this._mvEt-BattleStatus.battleLogicHasTickTime)/BattleStatus.minLogicFrame;
            if(diffT>0)
            {
                this.x+=diffX/diffT;
                this.y+=diffY/diffT;
                if(diffT==1)
                {
                    this.playPlaceEffect();
                }
            }   
        }
        return true;
    }

    /**
     * 命中效果或者怪物死了子弹爆炸
     * @param hit 是否攻击到了
     */
    protected playPlaceEffect():void
    {
        if(this.status!=2)
        {
            this.status=2;
            this.birthTime=BattleStatus.battleLogicHasTickTime;
            if(this.parent)
            {
                this.parent.setChildIndex(this,BattleStatus.obstacleZidx);
            }
            else
            {
                BattleStatus.scene.addChildAt(this,BattleStatus.obstacleZidx);
            }
            egret.Tween.get(this).to({scaleX:1,scaleY:1},100).call(()=>{
                egret.Tween.removeTweens(this);
            },this);
        }
    }

    protected checkDamage():void
    {

    }

    public checkEnd():boolean
    {
        if(this.birthTime > 0 && this._keep > 0){
            return BattleStatus.battleLogicHasTickTime>this.birthTime+this._keep;
        }
        return false;
    }
    protected updateFrame(timeStamp:number):boolean
    {
        let result=super.updateFrame(timeStamp);
        if(this.texture)
        {
            this.anchorOffsetX=this.width*0.5;
            this.anchorOffsetY=this.height*0.5;
        }
        return result;
    }

    public dispose():void
    {
        Obstacle.removeObstacle(this,this._diceId);
        this.status=0;
        this._endPos={x:0,y:0};
        this.diceData=null;
        this._diceId='';
        this._mvEt=0;
        super.dispose();
    }

    public static removeObstacle(obstacle:Obstacle,diceId:string):void
    {
        let obstaclename = Obstacle.getBltCName(diceId);
        let arr:Obstacle[]=Obstacle.obstaclePool[obstaclename];
        if(arr)
        {
            let idx=arr.indexOf(obstacle);
            if(idx>-1)
            {
                arr.splice(idx,1);
            }
        }
    }

    public static createObstacle(diceData:DiceData,stPos:{x:number,y:number},obstaclename?:string,monsterdisline?:number,noAdd?:boolean):Obstacle
    {
        let obstacle:Obstacle=null;
        if(!obstaclename)
        {
            obstaclename = Obstacle.getBltCName(diceData.id);
        }
        let cClass=egret.getDefinitionByName(obstaclename);
        obstacle = new cClass();
        let arr:Obstacle[]=Obstacle.obstaclePool[obstaclename];
        if(!arr)
        {
            arr=[];
            Obstacle.obstaclePool[obstaclename]=arr;
        }
        arr.push(obstacle);
        obstacle.init(diceData,stPos,monsterdisline);
        if(!noAdd){
            if(!obstacle.parent)
            {
                BattleStatus.scene.addChild(obstacle);
            }
            else
            {
                BattleStatus.scene.setChildIndex(obstacle,BattleStatus.scene.numChildren);
            }
        }
        return obstacle;
    }

    private static getBltCName(id:string|number):string
    {
        let cName="Obstacle"+id;
        if(!egret.hasDefinition(cName))
        {
            cName="Obstacle";
        }
        return cName;
    }

    public static releaseAllObstacle():void
    {
        let obstacletPoll=Obstacle.obstaclePool;
        for (const key in obstacletPoll) 
        {
            if (obstacletPoll.hasOwnProperty(key)) 
            {
                const bulletArr = obstacletPoll[key];
                bulletArr.length=0;
                delete obstacletPoll[key];
            }
        }
    }

    public static releaseObstacleInRange(center : egret.Point, radis : number, isMe : boolean):void
    {
        let limitData=BattleStatus.getLimitPos();
        let posData=isMe?limitData.me:limitData.target;

        let obstacletPoll=Obstacle.obstaclePool;
        for (const key in obstacletPoll) 
        {
            if (obstacletPoll.hasOwnProperty(key)) 
            {
                const bulletArr = obstacletPoll[key];
                for(let i = bulletArr.length - 1; i >= 0; -- i){
                    let unit = bulletArr[i];
                    if(unit){
                        if(!(unit instanceof Obstacle413) && DiceHelper.checkSelfIsInPointRange(new egret.Point(unit.x, unit.y), center, radis)){
                            //协助模式下 清掉公用路线上的障碍，不能请对面场上的障碍物
                            if(BattleStatus.battleType == 2){
                                let flag = unit.y == posData.pos1.y || (isMe ? (unit.y <= posData.pos0.y && unit.y > posData.pos1.y) : (unit.y >= posData.pos0.y && unit.y < posData.pos1.y)); 
                                if(flag){
                                    unit.dispose();
                                    unit = null;
                                }
                            }
                            else{
                                if(isMe == unit.getIsMe()){
                                    unit.dispose();
                                    unit = null;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    public static fastTick(addT:number):void
    {
        let obstaclePool=Obstacle.obstaclePool;
        let keys=Object.keys(obstaclePool);
        let battleview : any = BattleStatus.scene;
        keys.sort((a,b)=>{
            let ta=Number(a.replace("Obstacle",""))||0;
            let tb=Number(b.replace("Obstacle",""))||0;
            return ta-tb;
        });
        let kl=keys.length;
        for (var k=0;k<kl;k++) 
        {
            let key=keys[k];
            if (obstaclePool.hasOwnProperty(key)) 
            {
                const obstacles = obstaclePool[key];
                let l=obstacles.length;
                for (let i = l-1; i >=0; i--)
                {
                    let bullet=obstacles[i];
                    if(bullet)
                    {
                        bullet.fastTick(addT);
                    }
                    else
                    {
                        App.LogUtil.log(i);
                    }
                }
            }
        }
    }

}