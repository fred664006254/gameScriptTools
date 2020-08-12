/**
 * --原名称：狂风骰子  --新名称：狂风
*/
class Dice304 extends BaseDice
{
    private isFirst = false;

    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected init(data:DiceData, appearEff?:string):void
    {
        super.init(data,appearEff);
        let dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    }

    public refresh(data:DiceData,appeareff?:string):void
    {
        super.refresh(data, appeareff);
        let dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    }

    public powerup(pwlv:number):void
    {
        super.powerup(pwlv);
        let dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    }

    public checkDoAction():void{
        //攻击
        super.checkDoAction();
        //特殊技能
        let dicedata = this.getDiceData();
        let arr3 = dicedata.special2cdTimeArr;
        let l3 = arr3.length;
        for (let i = 0; i < l3; i++) 
        {
            let t=arr3[i];
            if(!!BattleStatus.checkCdDoTime(dicedata.special2cd,t))
            {
                dicedata.special2cd = (dicedata.property2 + dicedata.property1) * 1000;
                dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
                // this.isFirst = true;
                
                this.checkSpecial2Atk(i);
            }
        }
    }

    protected addBuffStatus(addStatus:string):void
    {
        if(addStatus == `304`)
        {
            let key = `${addStatus}`;
            let cfg = Config.DiceCfg.getAddDiceEffById(key);
            let name = `adddice${key}`;
            if(cfg){
                if(RES.hasRes(`${name}1`)){
                    let changeeff = ComponentMgr.getCustomMovieClip(`dice304eff`,null,70,BattleCustomEffect);
                    changeeff.anchorOffsetX = 140 / 2;
                    changeeff.anchorOffsetY = 140 / 2;
                    changeeff.playWithTime(1);
                    changeeff.y = -50;

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
                    },this);
                    this._extraGroup.addChild(changeeff);
                    // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                }
            }
        }
        else{
            super.addBuffStatus(addStatus);
        }
    }

    protected removeBuffAddStatus(stringid:string):void{
        if(stringid == `304`){
            let clipname = `${stringid}_dicebuff`;
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


    protected checkSpecial2Atk(starIdx:number):void{
        let dicedata = this.getDiceData();
        let buffData:IDiceBuffData={diceId:dicedata.id, keep:dicedata.property1*1000, atkspeed:dicedata.property3[0], cd:0, isMe:dicedata.isMe, from:`${dicedata.x}_${dicedata.y}`};//this._keep
        this.playAtkSound();
        DiceBuff.addBuff(buffData,this);
    }

    public dispose():void{
        this.isFirst = false;
        super.dispose();
    }
}