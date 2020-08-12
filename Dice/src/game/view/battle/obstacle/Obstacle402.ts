class Obstacle402 extends Obstacle
{
    private _isspecial:boolean = false;

    public constructor()
    {
        super();
    }

    public init(diceData:DiceData,pos:{x:number,y:number},monsterdisline?:number):void
    {
        this.diceData=diceData;
        this.initData(diceData);
        let res=this.getRes();
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
        this.setScale(0.1);
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
            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5},500).call(()=>{
                this.status=2;
                this.birthTime=BattleStatus.battleLogicHasTickTime;
                egret.Tween.removeTweens(this);
            },this);
        }
    }

    protected getRes():string{
        this._isspecial = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / this.diceData.index) < this.diceData.property2;
        return `obstacle_${this._diceId}_${this._isspecial ? 2 : 1}`;
    }

    protected initData(diceData:DiceData):void{
        this._diceId = diceData.id;
        this._keep = 0;
        this._dmg = this._isspecial ? 0 : diceData.damage;
        this._radius = this._isspecial ? this.diceData.property3[1] : this.diceData.property3[0];
        this._cd = 0;
    }

    public checkEnd():boolean{
        return false;
    }

    protected checkDamage():void{
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let point = new egret.Point(this.x, this.y);
        let findmonsterDataList = DiceHelper.findRangMonster(this._lineDis,this._radius,this.diceData.isMe);
        let l=findmonsterDataList.length;
        for (let i = 0; i < l; i++) {
            const mData = findmonsterDataList[i];
            if(mData && !mData.lost(this.diceData.isMe))
            {
                const monster=monstersList[mData.getName()];
                if(monster){
                    let damage = this._isspecial ? (monster.getMaxHp() * this.diceData.property1): this._dmg
                    monster.beAtk({hp:damage,isMe:this.diceData.isMe,crit:false,addStatus:`402_${this._isspecial ? 2 : 1}`});
                    this.playAtkSound();
                }
            }
            if(i == l - 1){
                this.dispose();
            }
        }
    }

    public dispose():void{
        this._isspecial = false;
        super.dispose();
    }
}