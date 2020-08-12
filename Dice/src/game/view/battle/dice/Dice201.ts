/**
 * --原名称：矿山骰子  --新名称：仙灵
 * 每隔一段时间生产SP
*/
class Dice201 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }
    protected init(data:DiceData, appearEff?:string):void
    {
        super.init(data, appearEff);
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
    
    public checkDoAction():void{
        super.checkDoAction();
        let dicedata = this.getDiceData();
        let arr3 = dicedata.special2cdTimeArr;
        let l3=arr3.length;
        for (let i = 0; i < l3; i++) 
        {
            let t=arr3[i];
            if(!!BattleStatus.checkCdDoTime(dicedata.special2cd,t))
            {
                this.checkSpecial2Atk(i);
            }
        }
    }

    /**
     * 一共3种，生产SP的时候触发
        1级
        2级
        3级及以上
    */
    protected playAtkSound():void{
        if(this.checkIsMe()){
            let vo=Api.BattleVoApi.getBattleData(true);
            let pwLv = vo.getPwlvById(`201`);

            let name = `effect_dice_201_${Math.min(pwLv, 3)}`;
            if(RES.hasRes(name)){
                SoundMgr.playEffect(name);
            }
        }
    }

    protected checkSpecial2Atk(starIdx:number):void{
        //增加sp
        let data = this.getDiceData();
        this.playAtkAction();
        this.playAtkSound();

        let mv = ComponentMgr.getCustomMovieClip(`adddice201`,null,70,BattleCustomEffect);
        mv.anchorOffsetX = 150 / 2;
        mv.anchorOffsetY = 150 / 2;
        mv.y = -45;
        this._extraGroup.addChild(mv);
        mv.setEndCallBack(()=>{
            mv.dispose();
            mv = null;
        }, this);
        mv.playWithTime(1);

        let cfg=Config.DiceCfg.getCfgById(data.id);
        let num = data.star * cfg.getProperty1ByLv(data.lv) + cfg.getPowerProperty1ByLv(data.pwlv);

        let txtImg = ComponentMgr.getTextField(`sp+${num}`, TextFieldConst.SIZE_26, 0xf4fffe);
        txtImg.stroke = 2;
        txtImg.strokeColor = 0x1ab186;
        txtImg.anchorOffsetX = txtImg.width / 2;
        txtImg.anchorOffsetY = txtImg.height / 2;
        txtImg.alpha = 0;
        if(this.parent){
            this.parent.addChild(txtImg);
        }
        // this._extraGroup.addChild(txtImg);
        let tmpy = this.y;
        txtImg.x = this.x;
        txtImg.y = tmpy-90;

        let time = BattleStatus.timeparam;
        egret.Tween.get(txtImg).to({alpha : 1, y : tmpy-110}, 12 * time).to({alpha : 1, y : tmpy-115}, 6 * time).to({alpha : 0, y : tmpy-120}, 3 * time).call(()=>{
            txtImg.dispose();
            txtImg = null;
        },this);

        Api.BattleVoApi.addSp(num, data.isMe);
    }

    public dispose():void{
        super.dispose();
    }
}