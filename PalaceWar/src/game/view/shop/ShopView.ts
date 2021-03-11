/**
 * 商店
 * author dmj
 * date 2017/9/22
 * @class ShopView
 */
class ShopView extends CommonView
{
	//元宝文本
	private gemTF:BaseTextField = null;
	private _cdTxt:BaseTextField = null;

	public _isShowMainGuide:boolean = false;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		
		if (Api.arrivalVoApi.isShowed500Rewards())
		{
			let showguide = LocalStorageManager.get(LocalStorageConst.LOCAL_GUIDE_SHOP+Api.playerVoApi.getPlayerID());
			if(!showguide || showguide == "")
			{
				Api.rookieVoApi.isInGuiding = true;
				Api.rookieVoApi.curGuideKey = "shop";
				ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"shop_1",f:null,o:this});

				this.selectedTabIndex = 1;
				LocalStorageManager.set(LocalStorageConst.LOCAL_GUIDE_SHOP+Api.playerVoApi.getPlayerID(),"1");
			}
		}
		super.init();
	}
	
	public initView():void
	{
		let taskId = Api.mainTaskVoApi.getCurMainTaskId()
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if(taskCfg && taskCfg.openType == "shop"){
			this._isShowMainGuide = true;
			Api.mainTaskVoApi.checkShowGuide();
		}

		let temW = 38;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.useCallback,this);
		
		let gembg = BaseBitmap.create(`public_numbg`);
		gembg.width = 165;
		this.addChild(gembg);
		gembg.x = 0;
		gembg.y = 50;
		
		let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.scaleX = temW/gemIcon.width;
		gemIcon.scaleY = temW/gemIcon.height;
		gemIcon.x = PlatformManager.hasSpcialCloseBtn()?430:5;
		gemIcon.y = PlatformManager.hasSpcialCloseBtn()?320:55;
		this.addChild(gemIcon);

		this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.gemTF.x = gemIcon.x + temW + 5;
		this.gemTF.y = gemIcon.y + 7;
		this.addChild(this.gemTF);

		let goToRechargeBtn:BaseButton = ComponentManager.getButton("mainui_btn1","",this.goToRechargeHandler,this);
		// goToRechargeBtn.scaleX = temW/goToRechargeBtn.width;
		// goToRechargeBtn.scaleY = temW/goToRechargeBtn.height;
		goToRechargeBtn.setScale(0.85);
		goToRechargeBtn.x = gembg.x + gembg.width - 20;
		goToRechargeBtn.y = gemIcon.y;
		this.addChild(goToRechargeBtn);
		if(Api.switchVoApi.checkClosePay())
		{
			goToRechargeBtn.visible=false;
		}

		let bg = BaseBitmap.create("shopview_bg2");
		bg.x = 0;
		bg.y = 0;
		this.addChildToContainer(bg);

		if(Api.shopVoApi.getet() >= GameData.serverTime)
		{
			let cdbg  = BaseBitmap.create("shopviewtimebg");
			cdbg.x = bg.x + bg.width - cdbg.width ;
			cdbg.y = bg.y + bg.height - cdbg.height ;
			cdbg.name = "cdbg";
			this.addChildToContainer(cdbg);

			let timeStr = App.DateUtil.getFormatBySecond(Api.shopVoApi.getet() - GameData.serverTime,3);
			this._cdTxt = ComponentManager.getTextField("",20);
			this._cdTxt.textColor = 0x00ff00;
			this._cdTxt.text = LanguageManager.getlocal("shop_cdTxt",[timeStr]);
			this._cdTxt.x = cdbg.x+cdbg.width/2- this._cdTxt.width/2 + 15;
			this._cdTxt.y = cdbg.y + cdbg.height/2- this._cdTxt.height/2;
			this.addChildToContainer(this._cdTxt);
			if(PlatformManager.checkIsEnLang())
			{
				this._cdTxt.x = GameConfig.stageWidth-this._cdTxt.width - 5;
			}
		}
		// let bottomBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
		// bottomBg.x = 0 ;
		// bottomBg.y = bg.y + bg.height;
		// bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y;
		// this.addChildToContainer(bottomBg);

		// let topBg:BaseBitmap = BaseBitmap.create("public_9_bg32");
		// topBg.width = GameConfig.stageWidth - 30;
		// topBg.height = bottomBg.height - 100;
		// topBg.x = 15;
		// topBg.y = bottomBg.y + 80;
		// this.addChildToContainer(topBg);

		// if (Api.rookieVoApi.curGuideKey == "shop")
		// {
		// 	this.clickTabbarHandler({index:1});
		// }
		this.setBigFameY(173);
		this.setBigFameCorner();
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
		this.gemTF.text = Api.playerVoApi.getPlayerGem().toString();
	}

	private goToRechargeHandler():void
	{
		// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}

	protected getResourceList():string[]
	{	
		let array:string[] = super.getResourceList();
		if (Api.arrivalVoApi.isShowed500Rewards() || Api.sixsection1VoApi.isOpenSixSection1())
		{	
			array.push("shopview_limited");
			array.push("shopview_greenbar");
		}
		return array.concat([
					"shopviewtimebg","shopview_bg2","shopview_corner","shopview_line","shoptitle","shopview_itemtitle",
					"servant_bottombg","common_titlebg","vipLimit_img",`commonview_bigframe`,"commonview_tabbar_bg"
					]);
	}
	
	protected getTitleStr():string{
		return null;
	}

	protected getTitlePic():string{
		return `shoptitle`;
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
		return 215;
	}

	public tick():boolean
    {
        if (Api.shopVoApi.getet() >= GameData.serverTime)
        {
			let timeStr = App.DateUtil.getFormatBySecond(Api.shopVoApi.getet() - GameData.serverTime,3);
			this._cdTxt.text = LanguageManager.getlocal("shop_cdTxt",[timeStr]);
			this._cdTxt.visible = true;

			let cdbg = this.container.getChildByName(`cdbg`);
			if(cdbg){
				cdbg.visible = true;
				this._cdTxt.x = cdbg.x+cdbg.width/2- this._cdTxt.width/2 + 15;
				this._cdTxt.y = cdbg.y + cdbg.height/2- this._cdTxt.height/2;
			}
			if(PlatformManager.checkIsEnLang())
			{
				this._cdTxt.x = GameConfig.stageWidth-this._cdTxt.width - 5;
			}
			return true;
        }else
		{
			if(this._cdTxt){
				this._cdTxt.visible = false;
			}			
			let cdbg = this.container.getChildByName(`cdbg`);
			if(cdbg){
				cdbg.visible = false;
			}
		}
        return false;
    }
	
	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType: NetRequestConst.REQUEST_SHOP_GETSHOPCFG,requestData:{}};
	}
	protected getTabbarTextArr():Array<string>
	{
		return ["shopViewTab1"
				,"shopViewTab3"
				// ,"itemBtn"
		];
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_BIG_TAB2;
	}

	protected addTabbarGroupBg():boolean{
		return true;
	}

	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			if(egret.is(this,"PopupView"))
			{
				tabX=this.viewBg.x+30;
				tabY=this.viewBg.y+60;
			}
			else
			{
				tabX=15;
				tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
			}
			tabY+=(this.getTabbarGroupY()+3-16);
			this.tabbarGroup.setPosition((this.width - this.tabbarGroup.width)/2,tabY+3);

			if(this.tabbarGroupBg){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.tabbarGroupBg, this.tabbarGroup, [-0,-8 + 16+2-3]);
			}
			
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
		this.gemTF = null;
		if(this._isShowMainGuide){
			Api.mainTaskVoApi.hideGuide();
		}
		this._isShowMainGuide = false;
		super.dispose();
	}
}