class Obstacle203 extends Obstacle
{
    public constructor()
    {
        super();
    }

    protected initData(diceData:DiceData):void
    {
        this._diceId=diceData.id;
        this._keep=diceData.property2*1000;
        this._dmg=diceData.property1;
        this._radius=diceData.property3[0];
        this._cd=diceData.property3[1]*1000;
    }

    public init(diceData:DiceData,pos:{x:number,y:number},monsterdisline?:number):void
    {
        this.diceData=diceData;
        this.initData(diceData);
        let res="obstacle_"+this._diceId + "1";
        // this.initLoadRes(res);
        this.texture=ResMgr.getRes(res);
        this.width = 100;
        this.height = 100;
        this.anchorOffsetX=this.width*0.5;
        this.anchorOffsetY=this.height*0.5;
        this.setPosition(pos.x,pos.y);

        let posAllCfg=BattleStatus.getLimitPos();
        let posCfg=diceData.isMe?posAllCfg.me:posAllCfg.target;
        let keys=Object.keys(posCfg);
        let l=keys.length-1;
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

        this.status=1;
        this._mvEt=BattleStatus.battleLogicHasTickTime+30*10;
        this.setScale(40/this.width);
    }

    protected playPlaceEffect():void
    {
        if(this.status!=2)
        {
            if(this.parent)
            {
                this.parent.setChildIndex(this,BattleStatus.obstacleZidx);
            }
            else
            {
                BattleStatus.scene.addChildAt(this,BattleStatus.obstacleZidx);
            }
            this.status=2;
            this.birthTime=BattleStatus.battleLogicHasTickTime;
            egret.Tween.get(this).to({scaleX:1,scaleY:1},100).call(()=>{
                egret.Tween.removeTweens(this);
                this.playAtkSound();
                let useDid=this.diceData.id;
                let effectKey="obstacle_"+useDid;
                    
                let frameCount=this.frameCount(effectKey);
                let resArr:string[]=[];
                for(var i:number=1;i<=frameCount;i++)
                {
                    resArr.push(effectKey+i);
                }
                this.frameImages = resArr;
                this.playFrameRate=140;
                this.texture=null;
                this.width=this.height=NaN;
                this.playWithTime(-1);
            },this);
        }
    }

    private frameCount(effectKey:string):number
    {
        let frameCount=0;
        while(ResMgr.hasRes(effectKey+(frameCount+1)))
        {
            frameCount++;
        }
        return frameCount;
    }

    public dispose():void{
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
       
        let keys = Object.keys(monstersList);
        let l = keys.length;

        for(let i = 0; i < l; i++) 
        {
            const mvo = monstersList[keys[i]];
            if(mvo.checkHasBuff(this.diceData.id))
            {
                mvo.removeBuff(this.diceData.id);
            }
        }
        super.dispose();
    }

    protected checkDamage():void
    {
        if(BattleStatus.checkCdDoTime(this._cd,this.birthTime))
        {
            let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            let findmonsterDataList = DiceHelper.findRangMonster(this._lineDis,this._radius,this.diceData.isMe);
            let l=findmonsterDataList.length;
            for (let i = 0; i < l; i++) 
            {
                const mData = findmonsterDataList[i];
                if(!mData.lost(this.diceData.isMe))
                {
                    const monster=monstersList[mData.getName()];
                    let damage = this._dmg;

                    let initInfo=Api.BattleVoApi.getInitInfo(this.diceData.isMe);
                    let isCrit:boolean=false;
                    if(this.diceData.checkCrit(initInfo.uid))//
                    {
                        isCrit=true;
                        let addCritScale=Math.max(0,(initInfo.crivalue-100)/100);
                        damage = this._dmg*(1 + addCritScale);
                        // App.LogUtil.log(initInfo.uid,"暴击",addCritScale,BattleStatus.battleLogicHasTickTime);
                    }
                    monster.beAtk({hp:damage,isMe:this.diceData.isMe,crit:isCrit});
                }
                
            }
        }
    }

}