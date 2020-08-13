class WelfareViewGodBless extends WelfareViewTab
{

	private _scrollList:ScrollList = null;
	private _vipLevel:number = 0;

	public constructor() {
		super();
	}

	protected init():void
	{
		super.init();

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		

		let bg = BaseBitmap.create("public_tc_bg01");
		bg.x = 17;
		bg.width= 454;
		bg.height= this.bottomBg.height-73;//570;
		bg.y=226;
		this.addChild(bg);


		let dibian:BaseBitmap=BaseBitmap.create("public_line");
		dibian.width = 480; 
		dibian.y =165;
		dibian.x =8;
		this.addChild(dibian);


		this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
		let info = Config.DailyluckCfg.getLuckIdList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth - 354);
		this._scrollList = ComponentManager.getScrollList(WelfareViewGoldblessScrollItem,info,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0,235); 

		if (!Api.switchVoApi.checkClosePay()&&!PlatformManager.checkHideIconByIP()) {
			let lookVipBtn:BaseBitmap = BaseBitmap.create("godbless_btn_chakanvip");
			lookVipBtn.setPosition(470 - lookVipBtn.width,140);
			lookVipBtn.addTouchTap(this.lookVip,this); 
			this.addChild(lookVipBtn);
		}


		let cardNameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("godblessTitle"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// cardNameTF.x = 201;//line1.x + line1.width/2 - cardNameTF.width/2;
		// cardNameTF.y = 200;// line1.y + line1.height/2 - cardNameTF.height/2;
		cardNameTF.x = bg.x + bg.width/2 - cardNameTF.width/2;
		cardNameTF.y = 200;
		this.addChild(cardNameTF);
	
		let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.x = cardNameTF.x - 40 - leftLine.width;
		leftLine.y = cardNameTF.y + cardNameTF.height/2 - leftLine.height/2

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.scaleX = -1;
		rightLine.x = cardNameTF.x + cardNameTF.width + 40 + rightLine.width;
		rightLine.y = cardNameTF.y + cardNameTF.height/2 - rightLine.height/2;
		this.addChild(leftLine);
		this.addChild(rightLine);


		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = 490;
		bottomBg.height = GameConfig.stageHeigth - 65;
		bottomBg.x = 0;
		bottomBg.y = 0;
		this.addChild(bottomBg);
	}

	private refresh():void
	{	
		if (this._vipLevel != Api.playerVoApi.getPlayerVipLevel())
		{	
			this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
			let info = Config.DailyluckCfg.getLuckIdList();
			this._scrollList.refreshData(info);
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"godbless_bookRoom","godbless_child","godbless_manage","godbless_rank","godbless_servantLv","godbless_wife",
			"godbless_btn_chakanvip"
			]);
	}

	private lookVip():void
	{	
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		this._scrollList = null;
		this._vipLevel = 0;
		super.dispose();
	}
}