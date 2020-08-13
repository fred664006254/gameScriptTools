class WifebattleShopPopupListItem extends ScorePopupListItem
{
	protected _data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number,limit?:number,limitType?:number,limitNum?:number,sell?:string,item?:string};

	public constructor() 
	{
		super();
	}

	protected initItem(index:number, data:any):void{
		super.initItem(index, data);
		this._canNumTxt.text = LanguageManager.getlocal(`wifebattleShopLimitNum${this.limitType()}`,[this.canExchangeNum().toString()]);
	}
	
	protected needScore():number
	{
		return Api.wifebattleVoApi.getShopItemNeedScore(this._data.id);
	}

	protected getOwnScoreNum():number
	{
		return Api.wifebattleVoApi.wifebattleVo.rewardnum ? Api.wifebattleVoApi.wifebattleVo.rewardnum : 0;
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
		if(this.canExchangeNum()<=0)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}
		if(this.getOwnScoreNum()<this.needScore())
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
			return ;
		}
		let exchangeNum = Math.min(this.canExchangeNum(),Math.floor(this.getOwnScoreNum()/this.needScore()));
		if(exchangeNum >= 5){
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMEXCHANGEPOPUPVIEW,{
				itemId:this._data.item.split(`_`)[1],
				idx:Number(this._data.id),
				maxNum:exchangeNum,
				callback:this.exchangeMultHandler,
				handler:this});
			return;
		}

		NetManager.request(this.getRequestType(),{itemKey:Number(this._data.id) + 1});
	}
	protected exchangeMultHandler(itemNum:number,itemId:number):void
	{
		NetManager.request(this.getRequestType(),{itemKey:itemId+1,enum:itemNum});
	}
	protected refresh():void{
		super.refresh();
		this._canNumTxt.text = LanguageManager.getlocal(`wifebattleShopLimitNum${this.limitType()}`,[this.canExchangeNum().toString()])
	}

}