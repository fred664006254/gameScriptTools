class Boss1004Vo extends BossVo
{
    public constructor()
    {
        super();
    }

    public initData(cfg:Config.BossItemCfg)
    {
        this.skillcd = cfg.parameter[0] * 1000;
        this.initcd = cfg.parameter[1] * 1000;;
        super.initData(cfg);
    }

    public dispose():void
    {
        super.dispose();
    }
}