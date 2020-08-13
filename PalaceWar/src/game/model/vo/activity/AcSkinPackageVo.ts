class AcSkinPackageVo extends AcBaseVo
{   

    public chargeNum:number = 0;
    private getFlag:Object = null;

	public constructor(){
		super();
	}


    public get isShowIcon():boolean
	{
        return this["show"] == 1;
		// return true;
	}

    public get isShowRedDot():boolean
	{   
        let curFlag:number = this.getCurFlag();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("skinPackage", this.code);

        if (curFlag < cfg.getRewardMax() )
		{   
            let needGem:number = cfg.getGemNeed(curFlag);
            if ( this.chargeNum>=needGem)
            {
                return true;
            }
        }

		return false;
	}

    public getCurFlag():number
	{   
        let f:number = 0;
        while (this.getFlag[f+1] ==1 )
        {
            f++;
        }
        return f;
    }

    public dispose():void
    { 
        this.chargeNum = 0;
        this.getFlag = 0;

		super.dispose();
	}
}