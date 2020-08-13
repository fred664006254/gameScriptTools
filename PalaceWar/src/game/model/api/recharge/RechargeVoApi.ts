class RechargeVoApi extends BaseVoApi
{
	public constructor() 
	{
		super();
	}

	/**
	 * 检测是否还有首充
	 */
	public checkFirstRecharge():boolean
	{
		return Api.shopVoApi.getPayFlag()==0;
	}

	/**
	 * 处理泰文华为国际化货币
	 */
	public formatThHwMoneyInfo(param:string[],rechargeId?:string):string[]
	{
		if(PlatformManager.checkisLocalPrice())
		{
			if(!param)
			{
				param=[];
			}
			if(rechargeId)
			{
				param.push(Config.RechargeCfg.getPlatFullPriceById(rechargeId));
			}
			else
			{
				param.push(Config.RechargeCfg.getMoneyName());
			}
		}
		return param;
	}
}