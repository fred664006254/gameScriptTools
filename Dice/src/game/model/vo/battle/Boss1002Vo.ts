class Boss1002Vo extends BossVo
{
    public effectNum = 0;

    public constructor()
    {
        super();
    }

    public initData(cfg:Config.BossItemCfg)
    {
        this.skillcd = cfg.parameter[0] * 1000;
        this.effectNum = cfg.parameter[1];
        this.initcd = cfg.parameter[2] * 1000;;
        super.initData(cfg);
    }

    public dispose():void
    {
        this.effectNum = 0;
        super.dispose();
    }
}