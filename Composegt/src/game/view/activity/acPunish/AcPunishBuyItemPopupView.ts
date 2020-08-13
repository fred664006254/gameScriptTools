/**
 * 购买道具
 * author dky
 * date 2017/11/21
 * @class AcPunishBuyItemPopupView
 */
class AcPunishBuyItemPopupView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;

	// private _wifeInfoVo: WifeInfoVo;

	// private _text1:BaseTextField;

	private _index:number = 0;

	private _dataList:any[];
	static aid:string ="";
	static code:string="";
	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM,this.doBuy,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshHandler,this);

		
		// //亲密度
		// let icon1Bg = BaseBitmap.create("public_hb_bg01");
		// icon1Bg.x = 20;
		// icon1Bg.y = 15;
		// this.addChildToContainer(icon1Bg);

		// let icon1 = BaseLoadBitmap.create("itemicon1");
		// icon1.setScale(0.5);
		// icon1.x = icon1Bg.x - 3 ;
		// icon1.y = icon1Bg.y + icon1Bg.height/2 - 100/2 + 25;
		// this.addChildToContainer(icon1);

		// let gem = Api.playerVoApi.getPlayerGemStr();

		// this._text1 = ComponentManager.getTextField(gem, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		// this._text1.x = icon1Bg.x + 50;
		// this._text1.y = icon1Bg.y + icon1Bg.height/2 - this._text1.height/2;
		// this.addChildToContainer(this._text1);

		let goldBar:ResBar = ComponentManager.getResBar(ItemEnums.gem,true);
		goldBar.setPosition(40,15);
		this.addChildToContainer(goldBar);

		let addGoldBtn = ComponentManager.getButton("mainui_btn1","",this.addGoldBtnClickHandler,this);
		addGoldBtn.x = goldBar.x + goldBar.width -20;
		addGoldBtn.y = goldBar.y + goldBar.height/2 - addGoldBtn.height/2 - 7;
		this.addChildToContainer(addGoldBtn);

		if(PlatformManager.checkHideIconByIP())
		{
			addGoldBtn.visible = false;
		}

		// if(Api.switchVoApi.checkPunishVip()){
			let itemName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			itemName.setPosition(this.viewBg.width - itemName.width - 50,goldBar.y + goldBar.height/2 - addGoldBtn.height/2 + 10);
			this.addChildToContainer(itemName);
		// }
	

		let bottomBg = BaseBitmap.create("public_tc_bg01");
		bottomBg.width = 540;
		bottomBg.height = 605;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		bottomBg.y = 75;
		this.addChildToContainer(bottomBg);

		let list1: Array<number> = new Array();

		for (var index = 0; index < 4; index++) {
			list1.push(index)
			
		}

		this._dataList =new Array<any>();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("punish", AcPunishBuyItemPopupView.code);
		for (var index = 1; index < 5; index++) {
			this._dataList.push(cfg.punishList[index.toString()]);
			
		}


		// let list = Config.WifebaseCfg.wifeGift;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,520,bottomBg.height-15);
		this._scrollList = ComponentManager.getScrollList(AcPunishBuyItemScrollItem,this._dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 10 ,bottomBg.y + 10);

	}

	private addGoldBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		// this.hide();
	}

	private doBuy(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		// if(this._index >= 3)
		// {
		// 	this.hide();
		// 	return;
		// }
		this.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, { activeId:AcPunishBuyItemPopupView.aid+ "-"+ AcPunishBuyItemPopupView.code,itemKey:data.key});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <AcPunishBuyItemScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			let gem = Api.playerVoApi.getPlayerGemStr();
			// this._text1.text = gem
		}

		
	}
	private refreshHandler()
	{
		this._scrollList.refreshData(this._dataList);
	}

	private checkData()
	{
		// this._text1.text = Api.playerVoApi.getPlayerGemStr();
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

	public dispose():void
	{
	
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshHandler,this);
		// 未婚滑动列表
		this._scrollList = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM,this.doBuy,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		// this._text1 = null;
		this._index = null;
		this._dataList = null;

		super.dispose();
	}
}