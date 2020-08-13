class WifebattleShopPopupListItem extends ScorePopupListItem
{
	protected _data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number,limit?:number,limitType?:number,limitNum?:number,sell?:string};

	public constructor() 
	{
		super();
	}
	
	protected needScore():number
	{
		return Api.wifebattleVoApi.getShopItemNeedScore(this._data.id);
	}

	protected getOwnScoreNum():number
	{
		return Api.wifebattleVoApi.wifebattleVo.rewardnum;
	}

	protected canExchangeNum():number
	{	
		if(this._data.limitNum)
		{
			return this._data.limitNum - Api.wifebattleVoApi.getShopItemByNum(String(this._idx+1));
		}
		return 1;
	}
	protected limitType():number
	{
		return this._data.limitType;
	}

	protected getRequestType():string
	{
		return NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP;
	}
	protected getMultRequestType():string
	{
		return NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP;
	}
	protected exchangeHandler():void
	{
		if(this.getOwnScoreNum()<this.needScore())
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
			return ;
		}
		if(this.canExchangeNum()<=0)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}
		let exchangeNum = Math.min(this.canExchangeNum(),Math.floor(this.getOwnScoreNum()/this.needScore()));
		if(exchangeNum >= 5){
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMEXCHANGEPOPUPVIEW,{curScoreStrKey:"wifebattleCurScoreKey",needScore:this.needScore(),ownScore:this.getOwnScoreNum(),sendId:this._data.id,itemRewardId:this._data.sell,maxNum:exchangeNum,callback:this.exchangeMultHandler,handler:this});
			return;
		}

		NetManager.request(this.getRequestType(),{itemKey:this._data.id});
	}
	protected exchangeMultHandler(itemNum:number,itemId:number):void
	{
		NetManager.request(this.getRequestType(),{itemKey:itemId,enum:itemNum});
	}

}