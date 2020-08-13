class ScorePopupView extends PopupView
{
	protected _leftScoreTxt:BaseTextField;
	
	/**
	 * 滑动列表
	 */
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this.initMessage();
		let scorebg = BaseBitmap.create(`countrywarrewardview_itembg`);
		scorebg.setPosition(this.viewBg.x+(this.viewBg.width-scorebg.width)/2,10);
		this.addChildToContainer(scorebg);

		this._leftScoreTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossCanUseScoreNumDesc",[this.getOwnScoreNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._leftScoreTxt.setPosition(this.viewBg.x+(this.viewBg.width-this._leftScoreTxt.width)/2,scorebg.y+(scorebg.height - this._leftScoreTxt.height)/2);
		this.addChildToContainer(this._leftScoreTxt);

		this.initList();
	}

	protected initList():void{
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.name = `listbg`;
		bg.width=540;
		bg.height=610+27;
		bg.setPosition(15+GameData.popupviewOffsetX,this._leftScoreTxt.y+this._leftScoreTxt.height+10);
		this.addChildToContainer(bg);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,600+25);
		this._scrollList = ComponentManager.getScrollList(this.getListItemClass(),this.getScoreDataList(),rect);
		this._scrollList.setPosition(bg.x+5,bg.y+5+3);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		this.addChildToContainer(this._scrollList);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			'popupview_rulearrow',"countrywarrewardview_itembg",
		]);
	}

	protected initMessage():void
	{
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
			this._leftScoreTxt.text =LanguageManager.getlocal("dailybossCanUseScoreNumDesc",[this.getOwnScoreNum().toString()]);
		}
	}

	protected getListItemClass():any
	{
		return ScorePopupListItem;
	}

	protected getScoreDataList():any[]
	{
		return [];
	}

	protected getTitleStr():string
	{
		return "dinnerExchangePopupViewTitle";
	}

	protected getOwnScoreNum():number
	{
		return 0;
	}

	protected getBgExtraHeight():number
	{
		return 30;
	}

	public dispose():void
	{
		super.dispose();
	}
}

class ScorePopupListItem extends ScrollListItem
{
	protected _data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number,limit?:number};
	protected _needTxt:BaseTextField=null;
	protected _canNumTxt:BaseTextField=null;
	protected _idx:number = 0;
	public constructor()
	{
		super();
	}
	protected initItem(index:number,data:any):void
	{
		App.MessageHelper.addNetMessage(this.getRequestType(),this.refresh,this);

		this._data=data;
		this._idx = index;
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg14");
		bg.width=530;
		bg.height=120;
		this.addChild(bg);

		let icon:BaseDisplayObjectContainer=data.iconContainer;
		icon.setPosition(10,bg.y+(bg.height-icon.height)/2);
		this.addChild(icon);

		let itemcfg = data.itemCfg;
		let nameBgStr = `public_itemtipbg2`;
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
			nameBgStr = "public_9_bg80";
		}
		let namebg = BaseBitmap.create(nameBgStr);
		namebg.setPosition(icon.x+icon.width+3,icon.y+8);
		this.addChild(namebg);

		let nameTxt:BaseTextField=itemcfg.nameTxt;
		namebg.width = 180;
		if(PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang()){
			namebg.width = 220 ;
		}
		nameTxt.setPosition(namebg.x+(namebg.width - nameTxt.width)/2,namebg.y+(namebg.height - nameTxt.height)/2);
		this.addChild(nameTxt);

		let score:number = this.needScore();
		if (!score) {
			score = 0;
		}
		this._needTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopNeedDesc",[score.toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._needTxt.setPosition(namebg.x+3,nameTxt.y+nameTxt.height+17);
		this.addChild(this._needTxt);

		this._canNumTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc",[this.canExchangeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._canNumTxt.setPosition(this._needTxt.x,this._needTxt.y+this._needTxt.height+10);
		this.addChild(this._canNumTxt);

		let btn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.exchangeHandler,this);
		btn.setPosition(bg.x+bg.width-btn.width-20,bg.y+(bg.height-btn.height)/2);
		this.addChild(btn);
	}

	protected needScore():number
	{
		return 0;
	}

	protected canExchangeNum():number
	{	
		if(this._data.limit)
		{
			return this._data.limit;
		}
		return 1;
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
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
		NetManager.request(this.getRequestType(),{itemKey:this._data.id});
	}

	protected refresh():void
	{	
		let score:number = this.needScore();
		if (!score) {
			score = 0;
		}
		this._needTxt.text = LanguageManager.getlocal("dailybossScoreShopNeedDesc",[score.toString()]);
		this._canNumTxt.text = LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc",[this.canExchangeNum().toString()]);
	}

	protected getRequestType():string
	{
		return "重写getRequestType方法，返回cmd";
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(this.getRequestType(),this.refresh,this);
		this._needTxt = null;
		this._canNumTxt = null;
		this._idx = 0;

		super.dispose();
	}
}