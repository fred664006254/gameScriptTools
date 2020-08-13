/**
 * 商店
 * author dmj
 * date 2017/9/22
 * @class ShopView
 */
class ShopView extends CommonView
{
	//元宝文本
	// private gemTF:BaseTextField = null;
	private _cdTxt:BaseTextField = null;
	private _isShowMainGuide:boolean = false;
	public constructor() 
	{
		super();
	}
	
	public initView():void
	{

		if(Api.otherInfoVoApi.getOtherInfoVo().kvmap&&Api.otherInfoVoApi.getOtherInfoVo().kvmap["check_vip_store"])
		{

		}else{
			PlatformManager.analytics37JPPoint("custom_recharge_check","check_vip_store",1);
			if(PlatformManager.checkIsJPSp())
			{
				this.request(NetRequestConst.REQUEST_OTHERINFO_SETKV,{k:"check_vip_store",v:"1"});
			}
			
		}
		let taskId = Api.mainTaskVoApi.getCurMainTaskId()
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if(taskCfg && taskCfg.openType == "shop"){
			this._isShowMainGuide = true;
			Api.mainTaskVoApi.checkShowGuide();
		}
		let temW = 38;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.useCallback,this);
		
		// let gemBg = BaseBitmap.create("public_hb_bg01")
		// gemBg.x =  PlatformManager.hasSpcialCloseBtn()?430:9+ 100;  //PlatformManager.hasSpcialCloseBtn()?430:5;
		// gemBg.y =  33;//PlatformManager.hasSpcialCloseBtn()?320:44;
		// this.addChild(gemBg);
		// let gemIcon = BaseBitmap.create("public_icon1");
		// gemIcon.x = 0;
		// gemIcon.y = 22;
		// this.addChild(gemIcon);

		let resBar:ResBar = ComponentManager.getResBar(1,true,145);
		resBar.setPosition(10,22);
		this.addChild(resBar);

		if (PlatformManager.hasSpcialCloseBtn()) {
			resBar.setPosition(100,22);
		}
		
		let goToRechargeBtn = ComponentManager.getButton("mainui_btn1","",this.goToRechargeHandler,this);
		// BaseBitmap.create("public_icon1");
		// gemIcon.scaleX = temW/gemIcon.width;
		// gemIcon.scaleY = temW/gemIcon.height;
		goToRechargeBtn.x = resBar.x + resBar.width - 22 ;//PlatformManager.hasSpcialCloseBtn()?430:5;
		goToRechargeBtn.y = resBar.y - 7 ;//PlatformManager.hasSpcialCloseBtn()?320:44;
		this.addChild(goToRechargeBtn);

		// let plusIcon = BaseBitmap.create("mainui_btn1");
		// plusIcon.x = goToRechargeBtn.width - plusIcon.width + 3;
		// plusIcon.y = goToRechargeBtn.height - plusIcon.height;
		// goToRechargeBtn.addChild(plusIcon);


		// this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		// this.gemTF.x = gemIcon.x + temW + 23;
		// this.gemTF.y = 39;
		// this.addChild(this.gemTF);
		// let gemBar = ComponentManager.getResBar(1,true,200);
		// gemBar.x = PlatformManager.hasSpcialCloseBtn()?430:5;
		// gemBar.y = PlatformManager.hasSpcialCloseBtn()?320:44;
		// this.addChild(gemBar);

		// let goToRechargeBtn:BaseButton = ComponentManager.getButton("mainui_btn1","",this.goToRechargeHandler,this);

		// goToRechargeBtn.setScale(0.85);
		// goToRechargeBtn.x = gemIcon.x + 118;
		// goToRechargeBtn.y = gemIcon.y + 4;

		// this.addChild(goToRechargeBtn);

		if(Api.switchVoApi.checkClosePay()||PlatformManager.checkHideIconByIP())
		{
			goToRechargeBtn.visible=false;
		}

		let bg = BaseLoadBitmap.create("shopview_bg2");
		bg.width = 640;
		bg.height = 244;
		bg.x = 0;
		// bg.y = 69;
		// bg.y = -10;
		this.addChildToContainer(bg);
		
		// let timeBg = BaseBitmap.create("shopview_timebg");
		// timeBg.x = 30;
		// timeBg.y = 195;
		// this.addChildToContainer(timeBg);

		let shadow = BaseBitmap.create("commonview_titlebgshadow");
		shadow.width = GameConfig.stageWidth;
		shadow.height = 8;
		this.addChildToContainer(shadow);


		if(Api.shopVoApi.getet() >= GameData.serverTime)
		{
			let cdbg  = BaseBitmap.create("shopview_timebg");
			// cdbg.setScale(1.5);
			cdbg.x = bg.x  +30;
			cdbg.y = bg.y + 195;
			cdbg.name = "cdbg";
			this.addChildToContainer(cdbg);

			let timeStr = App.DateUtil.getFormatBySecond(Api.shopVoApi.getet() - GameData.serverTime,3);
			this._cdTxt = ComponentManager.getTextField("",20);
			// this._cdTxt.textColor = 0x00ff00;
			this._cdTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			this._cdTxt.text = LanguageManager.getlocal("shop_cdTxt",[timeStr]);
			this._cdTxt.x = cdbg.x+50;
			this._cdTxt.y = cdbg.y + 10;
			this.addChildToContainer(this._cdTxt);
		}
		let woodbg = BaseBitmap.create("commonview_woodbg");
		woodbg.x = 0 ;
		woodbg.y = bg.y + 301 + 10;
		woodbg.height = GameConfig.stageHeigth - woodbg.y - this.container.y;
		this.addChildToContainer(woodbg);
		
		let bottomBg:BaseBitmap = BaseBitmap.create("commonview_border1");
		bottomBg.x = 0 ;
		bottomBg.y = bg.y + 301 + 10;
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y;
		this.addChildToContainer(bottomBg);

		let bottomDown = BaseBitmap.create("commonview_bottom");
		bottomDown.x = 0;
		bottomDown.y = bottomBg.y + bottomBg.height - bottomDown.height;
		this.addChildToContainer(bottomDown);
		// let topBg:BaseBitmap = BaseBitmap.create("public_9v_bg04");
		// topBg.width = GameConfig.stageWidth - 30;
		// topBg.height = bottomBg.height - 100;
		// topBg.x = 15;
		// topBg.y = bottomBg.y + 80;
		// this.addChildToContainer(topBg);

	}
	protected getTitleBgName():string
	{
		return "commonview_titlebg2"
	}
	protected clickTabbarHandler(data:any):void
	{
		
		// App.LogUtil.log("index: " + data.index);
		var index = Number(data.index);
		if(this.checkTabCondition(index) == false)
		{
			// 重新checkTabCondition方法处理
			this.tabbarGroup.selectedIndex=this.selectedTabIndex;
			return;
		}
		this.lastSelectedTabIndex = this.selectedTabIndex;
		this.selectedTabIndex = index;
		this.changeTab();
		if(data.index==0&&Api.shopVoApi.getInterday())
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SHOP_NEXTDAY); 
		}
	}
	private useCallback():void
	{
		// this.gemTF.text = Api.playerVoApi.getPlayerGem().toString();
	}

	private goToRechargeHandler():void
	{
		// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"shopview_corner",
					"servant_bottombg","common_titlebg",
					"activity_hongdi_01","activity_db_01","activity_dazhe_01",
					"activity_charge_red","activity_db_02","commonview_titlebgshadow",
					"palace_diban_01",
					"rechargevie_itembg",
					"shopview_timebg",
					"shopview_rewardbg",
					"shopview_redbg",
					"shopview_itembg",
					"rechargevie_itembg",
					"commonview_titlebg2",

					"commonview_woodbg",
					"commonview_bottom",
					"commonview_border1"
					// "public_9_probiginnerbg"
					]);
	}
	protected getContainerY():number
	{
		return 260;
	}

	protected getTitleButtomY():number
	{
		
		let buttonY:number;
		if(this.titleBg)
		{
			buttonY=this.titleBg.y+this.titleBg.height;
		}
		else
		{
			if(this.titleTF)
			{
				buttonY=this.titleTF.y+this.titleTF.height;
			}
		}
		return buttonY;
	}

	protected getTabbarGroupY():number
	{
		// return 301;
		return 244;
		// return 270;
	}

	public tick():boolean
    {
        if (Api.shopVoApi.getet() >= GameData.serverTime)
        {
			let timeStr = App.DateUtil.getFormatBySecond(Api.shopVoApi.getet() - GameData.serverTime,3);
			this._cdTxt.text = LanguageManager.getlocal("shop_cdTxt",[timeStr]);
			this._cdTxt.visible = true;
			return true;
        }else
		{
			if(this._cdTxt)
				this._cdTxt.visible = false;
		}
        return false;
    }
	
	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType: NetRequestConst.REQUEST_SHOP_GETSHOPCFG,requestData:{}};
	}
	protected getTabbarTextArr():Array<string>
	{
		let tanNames = ["shopViewTab1","shopViewTab3"];
		if (Api.switchVoApi.checkShenheClosePay()) {
			tanNames = ["shopViewTab1"];
		} 
		if(Api.switchVoApi.checkOpenShopVipTab()){
			tanNames.push("shopViewTab4");
		}
		return tanNames;
	}

	public dispose():void
	{
		if(this._isShowMainGuide){
			Api.mainTaskVoApi.hideGuide();
		}
		this._isShowMainGuide = false;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
		// this.gemTF = null;
		this._cdTxt = null;
		super.dispose();
	}
}