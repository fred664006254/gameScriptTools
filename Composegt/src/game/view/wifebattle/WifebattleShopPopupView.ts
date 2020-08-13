class WifebattleShopPopupView extends ScorePopupView
{
	public constructor() 
	{
		super();
	}
	protected getScoreDataList()
	{
		return Config.WifebattleCfg.shopList;
	}
	protected initMessage():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP,this.refresh,this);
	}

	protected getOwnScoreNum():number
	{
		// return Api.wifebattleVoApi.wifebattleVo.rewardnum;
		return Api.wifebattleVoApi.getScore();
	}
	protected getListItemClass():any
	{
		return WifebattleShopPopupListItem;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP,this.refresh,this);
		super.dispose();
	}
}

