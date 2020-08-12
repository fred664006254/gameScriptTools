class Dice103 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
        this.changeAtkspeed();
    }

    private changeAtkspeed():void{
        let dicedata = this.getDiceData();

        let cfg=Config.DiceCfg.getCfgById(dicedata.id);
        dicedata.cd=Math.ceil(cfg.getAtkSpeedByLv(dicedata.lv)*1000 * (1-dicedata.property1)/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame;
        dicedata.initcd = dicedata.cd;
        dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
        this.buffExec();
    }
    
    public refresh(data:DiceData,appeareff?:string):void
    {
        super.refresh(data, appeareff);
        this.changeAtkspeed();
    }

    public powerup(pwlv:number):void
    {
        super.powerup(pwlv);
        this.changeAtkspeed();
    }
}