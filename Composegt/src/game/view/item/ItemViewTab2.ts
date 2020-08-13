class ItemViewTab2 extends CommonViewTab
{
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.initView,this);
		NetManager.request(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,{});
	}
	public initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2,this.refreshList,this);
		let bg1:BaseBitmap = BaseBitmap.create("commonview_woodbg");
		// bg1.y = 5;
		bg1.width = GameConfig.stageWidth;
		bg1.height = GameConfig.stageHeigth - this.getViewTitleButtomY();
		// bg1.x = 10;
		this.addChild(bg1);

		// let border = BaseBitmap.create("public_9v_bg03");
		// border.width = GameConfig.stageWidth;
		// border.height = bg1.height;
		// border.x;
		// this.addChild(border);

		let border = BaseBitmap.create("commonview_border1");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth - 69 - 89;
		border.x = 0;
		border.y = 0;//69 + 89;
		this.addChild(border);

		let bottom = BaseBitmap.create("commonview_bottom");
		bottom.x = 0;
		bottom.y = GameConfig.stageHeigth - bottom.height - 69 - 89+5;
		this.addChild(bottom);

		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,574,bg1.height-40);
		this._scrollList=ComponentManager.getScrollList(ComposeListItem,Api.itemVoApi.getComposeItemList(),rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition((GameConfig.stageWidth - rect.width)/2,bg1.y+7);
// this._scrollList.setPosition(bg1.x+(bg1.width-rect.width)/2,bg1.y+10);
	}

	private refreshList():void
	{
		if(this._scrollList)
		{
			this._scrollList.refreshData(Api.itemVoApi.getComposeItemList());
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.initView,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2,this.refreshList,this);
		this._scrollList = null;
		super.dispose();
	}
}

class ComposeListItem extends ScrollListItem
{
	private _itemCfg:Config.ComposeItemCfg;
	private _composeBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any):void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		let itemCfg=<Config.ComposeItemCfg>data;
		this._itemCfg=itemCfg;
		let bg:BaseBitmap=BaseBitmap.create("public_dj_bg02");//public_dj_bg01  public_9_probiginnerbg
		// bg.width=172;
		// bg.height=232;
		// bg.setPosition(3,3);
		this.addChild(bg);


		let nametTxt:BaseTextField=itemCfg.nameTxt;
		if(PlatformManager.checkIsViSp()){
			nametTxt.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
		}
		nametTxt.setPosition(bg.x+(bg.width-nametTxt.width)/2,bg.y+13); 
		this.addChild(nametTxt);

		let icon:BaseDisplayObjectContainer=itemCfg.getIconContainer(true);
		icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nametTxt.y+nametTxt.height+18);
		this.addChild(icon);
		this.width=bg.width+this.getSpaceX();

		if(itemCfg.timeLimit)
		{
			let mark:BaseBitmap=BaseBitmap.create("common_shopmark2");
			mark.setPosition(0,140);
			this.addChild(mark);
			let markTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("composeTimeLimitDesc"),16,TextFieldConst.COLOR_WARN_YELLOW2);
			// markTxt.anchorOffsetX=markTxt.width/2;
			// markTxt.anchorOffsetY=markTxt.height/2;
			// markTxt.rotation=-45;
			markTxt.setPosition(mark.x + mark.width/2 - markTxt.width/2,mark.y + mark.height/2 - markTxt.height/2-3);
			this.addChild(markTxt);
		}

		let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"composeBtn",this.composeHandler,this);
		composeBtn.setPosition(bg.x+(bg.width-composeBtn.width * composeBtn.scaleX)/2,bg.y+bg.height-composeBtn.height-10);
		this.addChild(composeBtn);
		this._composeBtn=composeBtn;
		this.checkRedPoint();
	}

	private checkRedPoint():void
	{
		if(this._composeBtn)
		{
			if(Api.itemVoApi.checkCanComposeById(this._itemCfg.id))
			{
				App.CommonUtil.addIconToBDOC(this._composeBtn);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._composeBtn);
			}
		}

	}

	private composeHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.COMPOSEPOPUPVIEW,this._itemCfg.id);
	}


	/**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 20;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 20;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		this._itemCfg=null;
		this._composeBtn=null;
		// this._scrollList = null;
		
		super.dispose();
	}
}