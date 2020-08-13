class DailybossnewScroePopupView extends ScorePopupView
{
	public constructor() 
	{
		super();
	}
	protected getScoreDataList()
	{
		return Config.DailybossnewCfg.getShopList();
	}
	protected initMessage():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWBOSS_BUY,this.refresh,this);
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossnewVoApi.getScore();
	}
	protected getListItemClass():any
	{
		return DailybossnewScroePopupListItem;
	}

	protected initList():void{
		let view : any = this;
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.name = `listbg`;
		bg.width=540;
		bg.height=680;
		bg.setPosition(15+GameData.popupviewOffsetX,view._leftScoreTxt.y+view._leftScoreTxt.height+10);
		view.addChildToContainer(bg);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,660);
		view._scrollList = ComponentManager.getScrollList(view.getListItemClass(),view.getScoreDataList(),rect);
		// view._scrollList.setPosition(bg.x+5,bg.y+5+3);
		view._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view.addChildToContainer(view._scrollList);
		view._scrollList.x = bg.x+5;
		view._scrollList.y = bg.y+5+3;
		// let scrollList = view._scrollList;
		// scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
		// let arrow = BaseBitmap.create("popupview_rulearrow");
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, scrollList, [0,scrollList.height + 5]);
		// this.addChildToContainer(arrow);
		// let startY = arrow.y;
		// egret.Tween.get(arrow,{loop : true}).to({y : startY - 10}, 800).to({y : startY}, 800);
		// arrow.visible = scrollList.checkShowArrow();
		// this._arrow = arrow;

		this._leftScoreTxt.text =LanguageManager.getlocal("dailybossnewCurScore",[this.getOwnScoreNum().toString()]);
	}

	protected refresh(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e?e.data:null;
		if(data.data.data&&data.data.data.rewards)
		{
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
		}
		if(this._leftScoreTxt)
		{
			this._leftScoreTxt.text =LanguageManager.getlocal("dailybossnewCurScore",[this.getOwnScoreNum().toString()]);
		}
	}

	protected getShowHeight():number{
		return 800;
	}


	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWBOSS_BUY,this.refresh,this);
		super.dispose();
	}
}

class DailybossnewScroePopupListItem extends ScorePopupListItem
{
	public constructor() 
	{
		super();
	}

	protected needScore():number
	{
		return Api.dailybossnewVoApi.getShopItemNeedScore(this._data.id);
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossnewVoApi.getScore();
	}

	protected canExchangeNum():number
	{	
		if(this._data.limit)
		{
			return this._data.limit - Api.dailybossnewVoApi.getShopItemByNum(String(this._idx+1));
		}
		return 1;
	}


	protected getRequestType():string
	{
		return NetRequestConst.REQUEST_NEWBOSS_BUY;
	}


}