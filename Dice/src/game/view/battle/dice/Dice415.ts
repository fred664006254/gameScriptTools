/**
 * --原名称：台风骰子  --新名称：飓风
*/
class Dice415 extends BaseDice
{
    private isFirst1 = false;
    private isFirst2 = false;

    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void
    {
        super.init(data,appeareff);
        let dicedata = this.getDiceData();
        dicedata.special1cd = (dicedata.property1) * 1000;
        dicedata.setspecial1CdTimeArr();

        dicedata.special2cd = (dicedata.property1 + dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    }

    public refresh(data:DiceData,appeareff?:string):void
    {
        super.refresh(data, appeareff);
        let dicedata = this.getDiceData();
        dicedata.special1cd = (dicedata.property1) * 1000;
        dicedata.setspecial1CdTimeArr(BattleStatus.battleLogicHasTickTime);

        dicedata.special2cd = (dicedata.property1 + dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    }

    public checkDoAction():void{
        super.checkDoAction();
        let dicedata = this.getDiceData();
        let arr=dicedata.special1cdTimeArr;
        let l=arr.length;
        for (let i = 0; i < l; i++) 
        {
            let t=arr[i];
            if(!!BattleStatus.checkCdDoTime(dicedata.special1cd,t))
            {
                if(!this.isFirst1){
                    this.isFirst1 = true;
                    dicedata.special1cd = (dicedata.property1 + dicedata.property2) * 1000;
                    dicedata.setspecial1CdTimeArr(BattleStatus.battleLogicHasTickTime);
                }
                this.checkSpecial1Atk(i);
            }
        }

        let arr2=dicedata.special2cdTimeArr;
        let l2=arr2.length;
        for (let i = 0; i < l2; i++) 
        {
            let t=arr2[i];
            if(!!BattleStatus.checkCdDoTime(dicedata.special2cd,t))
            {
                if(!this.isFirst2){
                    this.isFirst2 = true;
                    dicedata.special2cd = (dicedata.property1 + dicedata.property2) * 1000;
                    dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
                }
                this.checkSpecial2Atk(i);
            }
        }
    }

    protected checkSpecial1Atk(starIdx:number):void{
        let dicedata = this.getDiceData();
        this.playAtkSound();
        let buffData:IDiceBuffData={diceId:`${dicedata.id}_1`, keep:(dicedata.property2)*1000, atkspeed:dicedata.property3[1], cd:0, isMe:dicedata.isMe,from:`${dicedata.x}_${dicedata.y}`};//this._keep
        DiceBuff.addBuff(buffData,this);
    }

    protected checkSpecial2Atk(starIdx:number):void{
        let dicedata = this.getDiceData();
        this.playAtkSound();
        // let changeeff = ComponentMgr.getCustomMovieClip(`dice415eff`,null,50,BattleCustomEffect);
        // changeeff.anchorOffsetX = 53 / 2;
        // changeeff.anchorOffsetY = 53 / 2;
        // changeeff.y = -50;

        // let scale = 4;
        // changeeff.setScale(scale);
        // changeeff.playWithTime(1);
        // changeeff.setEndCallBack(()=>{
        //     changeeff.dispose();
        //     changeeff = null;
        // },this);
        // this._extraGroup.addChild(changeeff);

        let buffData:IDiceBuffData={diceId:`${dicedata.id}_2`, keep:(dicedata.property3[0])*1000, atkspeed:dicedata.property3[2], cd:0, isMe:dicedata.isMe, crit : 1,from:`${dicedata.x}_${dicedata.y}`};//this._keep
        DiceBuff.addBuff(buffData,this);
    }

    protected addBuffStatus(addStatus:string):void
    {
        if(BattleStatus.stopActEffect)
        {
            return;
        }
        let clipname = `${addStatus}_dicebuff`;
        let clip = <CustomMovieClip>this._extraGroup.getChildByName(clipname);
        if(!clip){
            if(addStatus == `415_1`)
            {
                let key = `${304}`;
                let cfg = Config.DiceCfg.getAddDiceEffById(key);
                let name = `adddice${key}`;
                if(cfg){
                    if(RES.hasRes(`${name}1`)){
                        let changeeff = ComponentMgr.getCustomMovieClip(`dice415eff`,null,50,BattleCustomEffect);
                        changeeff.anchorOffsetX = 53 / 2;
                        changeeff.anchorOffsetY = 53 / 2;
                        changeeff.y = -50;
    
                        let scale = 4;
                        changeeff.setScale(scale);
                        changeeff.playWithTime(1);
                        changeeff.setEndCallBack(()=>{
                            changeeff.dispose();
                            changeeff = null;
    
                            let mv = ComponentMgr.getCustomMovieClip(name,null,cfg.timeparam,BattleCustomEffect);
                            mv.anchorOffsetX = cfg.width / 2;
                            mv.anchorOffsetY = cfg.height / 2;
                            mv.y = -65;
        
                            if(cfg.playnum > 0){
                                mv.setEndCallBack(()=>{
                                    mv.dispose();
                                    mv = null;
                                }, this);
                            }
                            if(cfg.add){
                                mv.blendMode = egret.BlendMode.ADD;
                            }
                            mv.name = `${addStatus}_dicebuff`;
                            mv.playWithTime(cfg.playnum);
                            this._extraGroup.addChild(mv);
    
                            // BattleStatus.scene.battlePause();
                        },this);
                        this._extraGroup.addChild(changeeff);
                        // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                    }
                }
            }
            else if(addStatus == `415_2`)
            {
                let key = `${415}`;
                let cfg = Config.DiceCfg.getAddDiceEffById(key);
                let name = `adddice${key}`;
                if(cfg){
                    if(RES.hasRes(`${name}1`)){
                        let mv = ComponentMgr.getCustomMovieClip(name,null,cfg.timeparam,BattleCustomEffect);
                        mv.anchorOffsetX = cfg.width / 2;
                        mv.anchorOffsetY = cfg.height / 2;
                        mv.y = -65;
    
                        if(cfg.playnum > 0){
                            mv.setEndCallBack(()=>{
                                mv.dispose();
                                mv = null;
                            }, this);
                        }
                        if(cfg.add){
                            mv.blendMode = egret.BlendMode.ADD;
                        }
                        mv.name = `${addStatus}_dicebuff`;
                        mv.playWithTime(cfg.playnum);
                        this._extraGroup.addChild(mv);
    
                        // let changeeff = ComponentMgr.getCustomMovieClip(`dice304eff`,null,70,BattleCustomEffect);
                        // changeeff.anchorOffsetX = 140 / 2;
                        // changeeff.anchorOffsetY = 140 / 2;
                        // changeeff.playWithTime(1);
                        // changeeff.y = -50;
    
                        // changeeff.setEndCallBack(()=>{
                        //     changeeff.dispose();
                        //     changeeff = null;
    
                           
                        // },this);
                        // this._extraGroup.addChild(changeeff);
                        // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                    }
                }
            }
            else{
                super.addBuffStatus(addStatus);
            }
        }
    }

    protected removeBuffAddStatus(stringid:string):void{
        if(stringid == `415_1` || stringid == `415_2`){
            let clipname = `${stringid}_dicebuff`;
            // clipname = `415_1_dicebuff`;
            let clip = <CustomMovieClip>this._extraGroup.getChildByName(clipname);
            if(clip){
                clip.dispose();
                clip = null;
            }
        }
        else{
            super.removeBuffAddStatus(stringid);
        }
    }

    public dispose():void{
        this.isFirst1 = false;
        this.isFirst2 = false;
        super.dispose();
    }
}