class Boss1003Vo extends BossVo
{
    public radius = 0;
    public healhpscale = 0;

    public constructor()
    {
        super();
    }

    public initData(cfg:Config.BossItemCfg)
    {
        this.skillcd = cfg.parameter[0] * 1000;
        this.radius = cfg.parameter[1];
        this.healhpscale = cfg.parameter[2];
        this.initcd = cfg.parameter[3] * 1000;;
        super.initData(cfg);
    }

    public dispose():void
    {
        this.radius = 0;
        this.healhpscale = 0;
        super.dispose();
    }
}