class DailybossScroePopupView extends ScorePopupView
{
	public constructor() 
	{
		super();
	}
	protected getScoreDataList()
	{
		return Config.DailybossCfg.getShopByOpenTime();
		// return Config.DailybossCfg.shopList;
	}
	protected initMessage():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_BUY,this.refresh,this);
	}
	
	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
	}
	protected getListItemClass():any
	{
		return DailybossScroePopupListItem;
	}

	protected getRequestData() :{requestType:string,requestData:any}
	{	
        
		return {requestType:NetRequestConst.REQUEST_OTHERINFO_GETSERVERINFO,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret)
        { 
            GameData.serverOpenTime = data.data.data.opentime
            // this.dataList = data.data.data.chargeList;
        } 
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_BUY,this.refresh,this);
		super.dispose();
	}
}

class DailybossScroePopupListItem extends ScorePopupListItem
{
	public constructor() 
	{
		super();
	}

	protected needScore():number
	{
		return Api.dailybossVoApi.getShopItemNeedScore(this._data.id);
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
	}

	protected canExchangeNum():number
	{	
		if(this._data.limit)
		{
			return this._data.limit - Api.dailybossVoApi.getShopItemByNum(this._data.id);
		}
		return 1;
	}


	protected getRequestType():string
	{
		return NetRequestConst.REQUEST_DAILYBOSS_BUY;
	}


}