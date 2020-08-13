/**
 * 购买道具
 * author dky
 * date 2017/11/21
 * @class AcRescueBuyItemPopupView
 */
class AcRescueBuyItemPopupView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;

	// private _wifeInfoVo: WifeInfoVo;

	private _powerText:BaseTextField;
	private _scoreText:BaseTextField;
	private _bottomNodeList=[];
	private _topNodeList=[];
	private _index:number = 0;

	private _dataList:any[];
	static aid:string ="";
	static code:string="";
	private _tabbarGroup:TabBarGroup = undefined;
	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkData,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM),this.checkData,this);
	

		let tabName = ["rescueShoptab1","rescueShoptab2","acPunishExPopupViewTitle"];
		let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,this.tabBtnClickHandler,this);
		tabbarGroup.setSpace(3);
		tabbarGroup.x = 40;
        tabbarGroup.y = 60;
        this.addChildToContainer(tabbarGroup);
		this._tabbarGroup = tabbarGroup;

		

		for (var index = 0; index < tabName.length; index++) {
			let tmpNode = new BaseDisplayObjectContainer();
			tmpNode.x = tabbarGroup.x-1;
			tmpNode.y = tabbarGroup.y+ tabbarGroup.height-3;
			this._bottomNodeList.push(tmpNode);
			this.addChildToContainer(tmpNode);

			let topNode = new BaseDisplayObjectContainer();
			this._topNodeList.push(topNode);
			this.addChildToContainer(topNode);
		} 



		let goldBar:ResBar = ComponentManager.getResBar(ItemEnums.gem,true);
		goldBar.setPosition(40,15);
		this._topNodeList[0].addChild(goldBar);

		let addGoldBtn = ComponentManager.getButton("mainui_btn1","",this.addGoldBtnClickHandler,this);
		addGoldBtn.x = goldBar.x + goldBar.width -20;
		addGoldBtn.y = goldBar.y + goldBar.height/2 - addGoldBtn.height/2 - 7;
		this._topNodeList[0].addChild(addGoldBtn);

		if(PlatformManager.checkHideIconByIP())
		{
			addGoldBtn.visible = false;
		}

		// if(Api.switchVoApi.checkPunishVip()){
			// let itemName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			// itemName.setPosition(this.viewBg.width - itemName.width - 50,goldBar.y + goldBar.height/2 - addGoldBtn.height/2 + 10);
			// this._topNodeList[0].addChild(itemName);
		// }
		let txtBg1 = BaseBitmap.create("public_tc_bg02");
		txtBg1.x = this.viewBg.width/2 - txtBg1.width/2;
		txtBg1.y = 10;
		this.addChildToContainer(txtBg1);
		this._topNodeList[1].addChild(txtBg1);
		
		let txtBg2 = BaseBitmap.create("public_tc_bg02");
		txtBg2.x = this.viewBg.width/2 - txtBg2.width/2;
		txtBg2.y = 10;
		this.addChildToContainer(txtBg2);
		this._topNodeList[2].addChild(txtBg2);
		let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
		this._powerText = ComponentManager.getTextField(LanguageManager.getlocal("rescuePower") + acVo.power,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._powerText.setPosition(this.viewBg.width/2 - this._powerText.width/2,goldBar.y + goldBar.height/2 - addGoldBtn.height/2 + 10);
		this._topNodeList[1].addChild(this._powerText);

		this._scoreText = ComponentManager.getTextField(LanguageManager.getlocal("pointNumber") +":"+ acVo.score,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._scoreText.setPosition(this.viewBg.width/2 - this._scoreText.width/2,goldBar.y + goldBar.height/2 - addGoldBtn.height/2 + 10);
		this._topNodeList[2].addChild(this._scoreText);
		




		this.initShopInfo(this._bottomNodeList[0]);
		this.initCangKuInfo(this._bottomNodeList[1]);
		this.initExInfo(this._bottomNodeList[2]);

		tabbarGroup.selectedIndex = this.param.tab?parseInt(this.param.tab):0;
		this.tabBtnClickHandler({index:this.param.tab?parseInt(this.param.tab):0}); 
		// this.initItemsInfo(this._bottomNodeList[2],bottomH);

	}

	protected initShopInfo(tmpNode:BaseDisplayObjectContainer)
	{
		let acRescueBuyItemPopup1 = new AcRescueBuyItemPopup1();
		tmpNode.addChild(acRescueBuyItemPopup1);
		
	}

	protected initCangKuInfo(tmpNode:BaseDisplayObjectContainer)
	{
		let acRescueBuyItemPopup2 = new AcRescueBuyItemPopup2();
		tmpNode.addChild(acRescueBuyItemPopup2);
		tmpNode["acRescueBuyItemPopup2"] = acRescueBuyItemPopup2;
	}

	protected initExInfo(tmpNode:BaseDisplayObjectContainer)
	{
		let acRescueBuyItemPopup3 = new AcRescueBuyItemPopup3();
		tmpNode.addChild(acRescueBuyItemPopup3);
		
	}

	protected tabBtnClickHandler(params:any)
    {
		for (var index = 0; index < this._bottomNodeList.length; index++) {
			this._bottomNodeList[index].visible = false;
			this._topNodeList[index].visible = false;
			if(this._bottomNodeList[index].acRescueBuyItemPopup2&&this._bottomNodeList[index].acRescueBuyItemPopup2.refreshUI2)
			{
				this._bottomNodeList[index].acRescueBuyItemPopup2.refreshUI2()
			}

		}
		this._bottomNodeList[params.index].visible = true;
		this._topNodeList[params.index].visible = true;
    }

	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["rescueShoptab1","rescueShoptab2",
	// 	"acPunishExPopupViewTitle",
	// 	];
	// }

	private addGoldBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		// this.hide();
	}



	
	private refreshHandler()
	{
		// this._scrollList.refreshData(this._dataList);
	}

	private checkData()
	{
		let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
		// this._topNodeList[1].addChild(this._powerText);
		let power = this._powerText.text;

		this._powerText.text = LanguageManager.getlocal("rescuePower") + acVo.power;
		this._scoreText.text = LanguageManager.getlocal("pointNumber") +":"+ acVo.score;
		
		// this._
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
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				// "progress2_bg","progress2"
				"progress4tc_01","progress4tc_02"
		]);
	}

	public dispose():void
	{
	
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshHandler,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM),this.checkData,this);
		// 未婚滑动列表
		this._scrollList = null;
		
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		// this._text1 = null;
		this._index = null;
		this._dataList = null;
		this._tabbarGroup= null;
		this._bottomNodeList =[];
		this._topNodeList = [];
		this._powerText=null;
		this._scoreText=null;
		// this.

		super.dispose();
	}
}