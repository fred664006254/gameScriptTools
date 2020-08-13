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
	{	//1 充值过  2 已经领取
		return Api.shopVoApi.getPayFlag()==0;
	}

	/**
	 * 
	 * 检测是否还有次充
	 */
	public checkSecondRecharge():boolean
	{
		return Api.shopVoApi.getSecondRateCharge() == 0;
	}


	/**
	 * 检测是否有首冲  并且 没有吕布
	 */
	public checkFirstRechargeNoLvbu():boolean
	{
		//1 充值过  2 已经领取
		return Api.shopVoApi.getPayFlag()==0 && Api.servantVoApi.getServantObj("1033") == null;
	}

	/**
	 * 检测是否有次充  并且 没有红颜
	 */
	public checkSecondRechargeNoWife():boolean
	{
		//1 充值过  2 已经领取
		return Api.shopVoApi.getSecondRateCharge() == 0 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null;
	}

}