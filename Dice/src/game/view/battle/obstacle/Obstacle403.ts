class Obstacle403 extends Obstacle
{
    public constructor()
    {
        super();
    }

    public init(diceData:DiceData,pos:{x:number,y:number},monsterdisline?:number):void
    {
        this.diceData=diceData;
        this.initData(diceData);
        let res="obstacle_"+this._diceId;
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
        //this.rotation = App.MathUtil.seededRandom(0,360,BattleStatus.battleLogicHasTickTime/diceData.index);
    }


    protected initData(diceData:DiceData):void
    {
        this._diceId=diceData.id;
        this._keep=diceData.property1*1000;
        this._radius=50;//diceData.property3[0];
    }

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
                egret.Tween.get(this,{loop:true}).to({rotation:360},2000);
                egret.Tween.get(this,{loop:true}).to({scaleX : 0.8, scaleY : 0.8},1000).to({scaleX : 1, scaleY : 1},1000);
                this.playAtkSound();
            },this);
        }

    }

    protected checkDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let findmonsterDataList = DiceHelper.findRangMonster(this._lineDis,this._radius,this.diceData.isMe);
        let l=findmonsterDataList.length;

        let namearr = [];
        for (let i = 0; i < l; i++) 
        {
            const mData = findmonsterDataList[i];
            if(!mData.lost(this.diceData.isMe))
            {
                const monster=monstersList[mData.getName()];
                namearr.push(mData.getName());
                let buffData:IBuffData={diceId:this.diceData.id,keep:0,speed:this.diceData.property3[1],cd:0,isMe:this.diceData.isMe};//
                MonsterBuff.addBuff(buffData,mData);
            }
        }

        for(let i in monstersList){
            let monster = monstersList[i];
            if(monster.checkHasBuff(this.diceData.id) && namearr.indexOf(i) == -1){
                monster.removeBuff(this.diceData.id);
            }
        }
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

}