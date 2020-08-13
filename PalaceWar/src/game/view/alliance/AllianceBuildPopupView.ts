/**
 * 帮会建设
 * author dky
 * date 2017/12/5
 * @class AllianceBuildPopupView
 */
class AllianceBuildPopupView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;

	// private _wifeInfoVo: WifeInfoVo;

	private _text1:BaseTextField;

	private _buildTimeTF:BaseTextField;

	private _index:number = 0;

	private _dataList:any[];
	private _monthCardType:number = 0;

	private _monthCardContainer:BaseDisplayObjectContainer = null;

	public constructor() 
	{
		super();
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}
	

	public initView():void
	{		
		if (Api.shopVoApi.ifBuyMonthCard())
		{	
			//可免费
			this._monthCardType = 1;
		}

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD,this.doBuy,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);

		Api.mainTaskVoApi.checkShowGuide("AllianceBuildPopupView");
		//
		let icon1Bg = BaseBitmap.create("public_9_resbg");
		icon1Bg.x = 20+GameData.popupviewOffsetX;
		icon1Bg.y = 15;
		this.addChildToContainer(icon1Bg);

		let icon1 = BaseLoadBitmap.create("itemicon1");
		icon1.setScale(0.5);
		icon1.x = icon1Bg.x - 3 ;
		icon1.y = icon1Bg.y + icon1Bg.height/2 - 100/2 + 25;
		this.addChildToContainer(icon1);

		let gem = Api.playerVoApi.getPlayerGemStr();

		this._text1 = ComponentManager.getTextField(gem, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._text1.x = icon1Bg.x + 50;
		this._text1.y = icon1Bg.y + icon1Bg.height/2 - this._text1.height/2;
		this.addChildToContainer(this._text1);

		let addGoldBtn = ComponentManager.getButton("mainui_btn1","",this.addGoldBtnClickHandler,this);
		addGoldBtn.x = icon1Bg.x + icon1Bg.width - 15;
		addGoldBtn.y = icon1Bg.y + icon1Bg.height/2 - addGoldBtn.height/2;
		this.addChildToContainer(addGoldBtn);
		if(Api.switchVoApi.checkClosePay())
		{
			addGoldBtn.visible=false;
		}

		let allianecVo = Api.allianceVoApi.getAllianceVo();
		let bNum = allianecVo.info.donateNum?allianecVo.info.donateNum:0;
		bNum = allianecVo.maxmn - bNum;
		if(bNum <0){
			bNum = 0;
		}
		let buildStr = LanguageManager.getlocal("allianceBuildTime",[bNum,allianecVo.maxmn.toString()]);		

		this._buildTimeTF = ComponentManager.getTextField(buildStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		this._buildTimeTF.x = this.viewBg.width - this._buildTimeTF.width - 40-GameData.popupviewOffsetX;
		this._buildTimeTF.y = icon1Bg.y + icon1Bg.height/2 - this._buildTimeTF.height/2;
		if(bNum <=0){
			this._buildTimeTF.text = LanguageManager.getlocal("allianceBuildTime2",[bNum,allianecVo.maxmn.toString()]);	
		}
		this.addChildToContainer(this._buildTimeTF);


		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 535;
		bottomBg.height = 575;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		bottomBg.y = 75;
		this.addChildToContainer(bottomBg);

		let list1: Array<number> = new Array();

		for (var index = 0; index < 4; index++) {
			list1.push(index);
		}

		this._dataList =new Array<any>();
		let cfg = Config.AlliancebaseCfg.contributeList;
		for (var index = 1; index < 6; index++) {
			this._dataList.push(cfg[index.toString()]);
		}

		// let list = Config.WifebaseCfg.wifeGift;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,525,555);
		this._scrollList = ComponentManager.getScrollList(AllianceBuildScrollItem,this._dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 5 ,bottomBg.y + 8);

		this.checkMonthCard();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"dinnertypepopupview","activity_rank_ask"
					]);
	}
	private addGoldBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}

	private doBuy(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ALLIANCE_DONATE, {monthcardDonate:data.monthcard , donatetype:data.key});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.ret == false){
			return;
		}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_DONATE) {
			// if(data.data.data && data.data.data.rewards)
			// {
			// 	let rewards= GameData.formatRewardItem(data.data.data.rewards);
			// 	if(rewards&&rewards.length>0)
			// 	{
			// 		App.CommonUtil.playRewardFlyAction(rewards);
			// 	}
			// }
			this._scrollList.refreshData(this._dataList);
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceBuildSuccess"));
			let gem = Api.playerVoApi.getPlayerGemStr();
			this._text1.text = gem;

			let cfg = Config.AlliancebaseCfg.contributeList;

			let doData = cfg[data.data.data.donatetype];
			let itemDescStr = LanguageManager.getlocal("allianceBuildGet",[doData.exp,doData.asset,doData.contribution])
			let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
			if(data.data.data.donateMaxFlag){
				App.CommonUtil.playRewardFlyAction([
				// 	{
				// tipMessage:LanguageManager.getlocal("allianceBuildGet1")+"+"+doData.exp},
				// {tipMessage:LanguageManager.getlocal("allianceBuildGet2")+"+"+doData.asset},
				{tipMessage:LanguageManager.getlocal("allianceBuildGet3")+"+"+doData.contribution},
				],pos);
			}
			else{
				App.CommonUtil.playRewardFlyAction([
					{
				tipMessage:LanguageManager.getlocal("allianceBuildGet1")+"+"+doData.exp},
				{tipMessage:LanguageManager.getlocal("allianceBuildGet2")+"+"+doData.asset},
				{tipMessage:LanguageManager.getlocal("allianceBuildGet3")+"+"+doData.contribution},
				],pos);
			}
			
		}

		
	}
	private refreshHandler()
	{

	}


	public hide():void
	{
		super.hide();
	}
	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }
	private checkData()
	{
		this._text1.text = Api.playerVoApi.getPlayerGemStr();
		let allianecVo = Api.allianceVoApi.getAllianceVo();

		let bNum = allianecVo.info.donateNum?allianecVo.info.donateNum:0;
		bNum = allianecVo.maxmn - bNum;
		if(bNum <0){
			bNum = 0;
		}
		let buildStr = LanguageManager.getlocal("allianceBuildTime",[bNum,allianecVo.maxmn.toString()]);		
		this._buildTimeTF.text = buildStr;

		if(bNum <=0){
			this._buildTimeTF.text = LanguageManager.getlocal("allianceBuildTime2",[bNum,allianecVo.maxmn.toString()]);	
		}		
	
	}
	private receivePushData():void
	{
		this._scrollList.refreshData(this._dataList);
		this.checkMonthCard();
	}

	public tick():void
	{
		if (this._monthCardType == 1 && Api.shopVoApi.ifBuyMonthCard()==false)
		{	
			this._monthCardType = 0;
			this._scrollList.refreshData(this._dataList);
		}
	}

	private checkMonthCard():void
	{
		if (Api.switchVoApi.checkOpenMonthcardDonate())
		{
			if (Api.shopVoApi.ifBuyMonthCard())
			{
				if (this._monthCardContainer)
				{
					this._monthCardContainer.dispose();
					this._monthCardContainer = null;
				}
			}
			else
			{
				if (!this._monthCardContainer)
				{
					this._monthCardContainer = new BaseDisplayObjectContainer();
					this._monthCardContainer.y = GameConfig.stageHeigth/2+365;
					this.addChild(this._monthCardContainer);

					let titlebg = BaseBitmap.create("public_9_bg15");
					titlebg.width = 540;
					titlebg.setPosition(this.width/2 - titlebg.width/2, 3);
					this._monthCardContainer.addChild(titlebg);

					let title = ComponentManager.getTextField(LanguageManager.getlocal("buyMonthcardForFree"),
					TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
					title.width = 480;
					title.lineSpacing = 4;
					title.textAlign = egret.HorizontalAlign.CENTER;
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,title,titlebg,[-5,10]);
					this._monthCardContainer.addChild(title);

					if (titlebg.height<(title.height+10))
					{
						titlebg.height = title.height+20;
					}

					let askImg = ComponentManager.getButton(`activity_rank_ask`, ``, ()=>{
						ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
					}, this);
					App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, askImg, titlebg, [0, 0]);
					this._monthCardContainer.addChild(askImg);
				}
			}
		}
	}

	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		
		// 未婚滑动列表
		this._scrollList = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD,this.doBuy,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);

		this._text1 = null;
		this._index = null;
		this._dataList = null;
		this._monthCardType = 0;
		this._monthCardContainer = null;

		super.dispose();
	}
}