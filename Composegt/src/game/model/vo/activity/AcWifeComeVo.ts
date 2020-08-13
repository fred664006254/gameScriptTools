class AcWifeComeVo extends AcBaseVo
{
    //充值的数值
    public v: number;
    //是否已经领取
    public get: number;
    
    public constructor()
    {
        super();
    }

    public initData(data: any): void
    {

        let oldV = this.v;
        let oldGet = this.get;


        for(let key in data)
        {
            this[key] = data[key];
        }

        if(this.get == 1){
            Api.acVoApi.setActiveUnlock(1);
        }
        if(oldV != this.v || oldGet != this.get)
        {
            
            //状态发生变化
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE);

        }

    }

    

    public get isShowRedDot(): boolean
    {
        let acVo:any = this;//Api.acVoApi.getActivityVoByAidAndCode("wifeCome",);
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode("wifeCome",acVo.code);
        if(!acCfg)
        {
            return false;
        }
        if (acVo.get == 0 && acVo.v >= acCfg.need){
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
		if((this.st <= GameData.serverTime) && (this.et > GameData.serverTime) &&  !this.checkOwnWife())
		{
			return true;
		}
		return false;
	}

    private checkOwnWife():boolean{
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if(acCfg&&Api.wifeVoApi.getWifeInfoVoById(Number(acCfg.wifeId)))
        {
            return true;
        } else {
            return false;
        }
    }

    public dispose(): void
    {
        this.v = 0;
        this.get = 0;
    }


}