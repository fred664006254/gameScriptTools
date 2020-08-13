class AcWifeBathingVo extends AcBaseVo
{
    //玩家当前进度
    public scorenum: number;
    //是否已经领取
    public get: number;
    
    public opened = null;
    
    public constructor()
    {
        super();
    }
	private get cfg() : Config.AcCfg.WifeBathingCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
    public initData(data: any): void
    {
        for(let key in data)
        {
            this[key] = data[key];
        }

        //状态发生变化
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACWIFEBATHING_REFRESHVO);

    }

    public getAvgConfig(id, code):any{
		return this.cfg.getDialogById(id, code);
	}
	public getOpened():boolean{
		return this.opened == 1;
	}
    public get isShowRedDot(): boolean
    {
        let acVo:any = Api.acVoApi.getActivityVoByAidAndCode("wifeBathing");
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode("wifeBathing",acVo.code);
        if(!acCfg)
        {
            return false;
        }
        if (acVo.get == 0 && acVo.scorenum >= acCfg.need){
            return true;
        } else {
            return false;
        }

    }

 	/**重写
	 * 是否在活动开始期间，true：在期间，false:已结束或者未开始
	 */
	public get isStart():boolean
	{
		if((this.st <= GameData.serverTime) && (this.et > GameData.serverTime) &&  !this.checkOwnWifeScene())
		{
			return true;
		}
		return false;
	}

    //已经拥有这个红颜场景
    private checkOwnWifeScene():boolean{

        let acCfg:Config.AcCfg.WifeBathingCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        let wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(acCfg.wifeId);
        if(wifeInfoVo && wifeInfoVo.scene && wifeInfoVo.scene[acCfg.wifeBathingId]){
            return true;
        }
    
        return false;

    }

    public dispose(): void
    {
        this.scorenum = 0;
        this.get = 0;
        this.opened = null;
    }


}