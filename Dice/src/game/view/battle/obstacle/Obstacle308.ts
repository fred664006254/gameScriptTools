class Obstacle308 extends Obstacle
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
        this.width = 70;
        this.height = 70;
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


        this.status=1;
        this._mvEt=BattleStatus.battleLogicHasTickTime+30*10;

        this._endPos.x=pos.x;
        this._endPos.y=pos.y;
        this.setScale(0);
        this.playPlaceEffect();
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
            egret.Tween.get(this).to({scaleX:2,scaleY:2},100).call(()=>{
                egret.Tween.removeTweens(this);
                this.playAtkSound();
                let useDid=this.diceData.id;
                let effectKey="obstacle_"+useDid;
                // if((!hit)||(!ResMgr.hasRes(effectKey+"1")))
                // {
                //     effectKey="bthiteffect";
                // }
                // else
                // {
                //     // this.setScale(4);
                // }
                    
                let frameCount=this.frameCount(effectKey);
                let resArr:string[]=[];
                for(var i:number=1;i<=frameCount;i++)
                {
                    resArr.push(effectKey+i);
                }
                this.frameImages = resArr;
                this.playFrameRate=70;
                // this.playFrameRate
                // this.setEndCallBack(this.dispose,this);
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
        super.dispose();
    }


    protected checkDamage():void
    {
        if(BattleStatus.checkCdDoTime(this._cd,this.birthTime))
        {
            let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            let point = new egret.Point(this.x, this.y);
            // let findmonsterDataList = [];

            // let keys = Object.keys(monstersList);
            // for(let i = 0; i < keys.length; ++ i){
            //     const monster = monstersList[keys[i]];
            //     let monspoint = new egret.Point(monster.x, monster.y);
            //     if(DiceHelper.checkSelfIsInPointRange(point, monspoint, this._radius) && !monster.isDie() && !monster.lost()){
            //         monster.beAtk({hp:this._dmg,isMe:this.diceData.isMe,crit:false});
            //     }
            // }
            let findmonsterDataList = DiceHelper.findRangMonster(this._lineDis,this._radius,this.diceData.isMe);
            let l=findmonsterDataList.length;
            for (let i = 0; i < l; i++) 
            {
                const mData = findmonsterDataList[i];
                if(!mData.lost(this.diceData.isMe))
                {
                    const monster=monstersList[mData.getName()];
                    monster.beAtk({hp:this._dmg,isMe:this.diceData.isMe,crit:false});
                }
            }
        }
    }

    // public dispose():void{
    //     egret.Tween.get(this).to({alpha:0},530).call(()=>{
    //         egret.Tween.removeTweens(this);
    //         super.dispose();
    //     },this);
    // }

}