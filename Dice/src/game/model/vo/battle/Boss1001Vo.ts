class Boss1001Vo extends BossVo
{
    public monster3num = 0;
    public monster3hpscale = 0;
    public monster3speed = 0;
    public monster2num = 0;
    public monster2hpscale = 0;
    public monster2speed = 0;


    public constructor()
    {
        super();
    }

    public initData(cfg:Config.BossItemCfg)
    {
        this.skillcd = cfg.parameter[0] * 1000;
        this.monster3num = cfg.parameter[1];
        this.monster3hpscale = cfg.parameter[2];
        this.monster3speed = cfg.parameter[3];

        this.monster2num = cfg.parameter[4];
        this.monster2hpscale = cfg.parameter[5];
        this.monster2speed = cfg.parameter[6];
        this.initcd = cfg.parameter[7] * 1000;
        super.initData(cfg);
    }

    public dispose():void
    {
        this.monster3num = 0;
        this.monster3hpscale = 0;
        this.monster3speed = 0;
        this.monster2num = 0;
        this.monster2hpscale = 0;
        this.monster2speed = 0;
        super.dispose();
    }
}