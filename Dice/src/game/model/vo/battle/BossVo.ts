class BossVo extends MonsterVo
{
    public skillcd = 0;
    public cdTimeArr:number[]=[];
    public initcd = 0;

    public constructor()
    {
        super();
    }

    public initData(cfg:Config.BossItemCfg)
    {
        super.initData(cfg);
        this.monsterSp = Config.BattleCfg.getBossSp(BattleStatus.battleType == 1 ? BattleStatus.round : Math.floor(BattleStatus.round / 10));
        this.setCdTimeArr(BattleStatus.battleType == 1 ? 0 : BattleStatus.battleLogicHasTickTime);
        this.inithp = this.hp;
    }

    public setCdTimeArr(time?:number):void
    {
        if(!time){
            time = this.birthTime;
        }
        this.cdTimeArr=BattleStatus.formatCdPartTime(this.initcd,time);
    }

    public dispose():void
    {
        this.skillcd = 0;
        this.initcd = 0;
        super.dispose();
    }
}