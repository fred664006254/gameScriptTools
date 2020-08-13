/**
 * 福利
 * author dmj
 * date 2017/11/02
 * @class WelfareView
 */
class WelfareView extends CommonView
{
	/**
	 * 福利中心显示功能配置
	 * 配置规则：WelfareView后面的文件名，例如：WelfareViewFirstRecharge.ts   就配置FristRecharge
	 */ //	"OfficialWeChat"
	private _functionConfig:string[] = [
										"RechargeBox",
										"Signin",
										"FirstRecharge",
										"MonthCard",
										"YearCard",
										"GodBless",
										"Binding",
										"OfficialWeChat",
										"Realname",
										"PlayerComeBack",
										"FunctionPreview",
										"Qgroup",
										"Rebate", 
										"Rebate2", 
										"NewInvite",
										"Housekeeper",
										];
    // tab按钮的资源数组
	private _tabbarList:string[]=[];
	//左侧背景
	private _leftBg:BaseBitmap = null;
	private _tabbarTextList:string[]=[];

	private _lastFirstRechargeflag:number = null;
	private _lastSigninShowRedDot:boolean = null;
	public constructor() 
	{
		super();
	}

	public show(data?:{tab?:string}):void
	{
		this._functionConfig = Api.arrivalVoApi.getFunctionCfgList();
		// if (Api.switchVoApi.checkTWShenhe()) {
		// 	for(var i=0;i<this._functionConfig.length;i++)
		// 	{
		// 		if (this._functionConfig[i]=="YearCard")
		// 		{
		// 			this._functionConfig.splice(i,1);
		// 		}
		// 	}	
		// }
		//审核服下益玩大平台特殊处理
		if((PlatformManager.checkIsShenHeYiWan() || Api.switchVoApi.checkTWShenhe()) && PlatformManager.checkIsShenHeShowCard()==false){
			let delete_arr = ['YearCard','MonthCard'];
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard())
			{
				delete_arr = ['NewYearCard','NewMonthCard'];
			}
			for(let str of delete_arr){
				let idx = this._functionConfig.indexOf(str);
				if(idx > -1){
					this._functionConfig.splice(idx , 1);
				}
			}
		}
		//新好友邀请功能
		if(!Api.switchVoApi.checkOpenNewInvite()){
			let delete_arr = ['NewInvite'];
			for(let str of delete_arr){
				let idx = this._functionConfig.indexOf(str);
				if(idx > -1){
					this._functionConfig.splice(idx , 1);
				}
			}
		}

		if(!Api.switchVoApi.checkOpenPlayerComeBack()){
			let delete_arr = ['PlayerComeBack'];
			for(let str of delete_arr){
				let idx = this._functionConfig.indexOf(str);
				if(idx > -1){
					this._functionConfig.splice(idx , 1);
				}
			}
		}

		if(!Api.switchVoApi.checkOpenHousekeeper()){
			let delete_arr = ['Housekeeper'];
			for(let str of delete_arr){
				let idx = this._functionConfig.indexOf(str);
				if(idx > -1){
					this._functionConfig.splice(idx , 1);
				}
			}
		}

		if(data && data.tab)
		{
			this.selectedTabIndex = this._functionConfig.indexOf(data.tab);
		}
		for(var i=0;i<this._functionConfig.length;i++)
		{
			let preName:string = this._functionConfig[i].toLowerCase();
			if(preName == "signin"&&Api.arrivalVoApi.getIsAugustsignin())
			{
				preName = "augustsignin"
			}
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&preName == "monthcard")
			{
				preName = "newmonthcard";
			}
			if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&preName == "yearcard")
			{
				preName = "yearcard_new";
			}
			this._tabbarList.push(preName + "_btn");
			this._tabbarTextList.push("");
		}	
		this.tabViewData = {};
		super.show(data);
	}

	public initView():void
	{
		// if (Api.switchVoApi.checkTWShenhe()) {
		// 	for(var i=0;i<this._functionConfig.length;i++)
		// 	{
		// 		if (this._functionConfig[i]=="YearCard")
		// 		{
		// 			this._functionConfig.splice(i,1);
		// 		}
		// 	}	
		// }
		Api.mainTaskVoApi.checkShowGuide();
		//审核服下益玩大平台特殊处理
		if((PlatformManager.checkIsShenHeYiWan() || Api.switchVoApi.checkTWShenhe()) && PlatformManager.checkIsShenHeShowCard()==false){
			let delete_arr = ['YearCard','MonthCard'];
			for(let str of delete_arr){
				let idx = this._functionConfig.indexOf(str);
				if(idx > -1){
					this._functionConfig.splice(idx , 1);
				}
			}
		}

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkTabbarGroupState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkTabbarGroupState,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD,this.checkTabbarGroupState,this);	
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE,this.checkTabbarGroupState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.checkTabbarGroupState,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT,this.hide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW,this.hideAndShowYearCard,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.refreshFunctionRed,this);	
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.refreshGrowGoldRed,this);

		let leftBg:BaseBitmap = BaseBitmap.create("common_left_bg");
		leftBg.x = 0;
		leftBg.y = 0;
		leftBg.height = GameConfig.stageHeigth - this.container.y;
		this.addChildToContainer(leftBg);
		this._leftBg = leftBg;

		this.tick();
		this.refreshGrowGoldRed();
	}

	private hideAndShowYearCard(){
		this.hide();		
		ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
	}
	protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + this._functionConfig[this.selectedTabIndex]);
		if(tabveiwClass)
		{
			if(this.tabViewData[this.selectedTabIndex])
			{
				this.addChildToContainer(this.tabViewData[this.selectedTabIndex]);
			}
			else
			{
				// let bg:BaseBitmap = BaseBitmap.create("welfare_9_bg");
				// bg.setPosition(149,0);
				// this.addChildToContainer(bg);
				let tabView:WelfareViewTab = new tabveiwClass();
				tabView.show();
				tabView.setPosition(149,0);
				this.tabViewData[this.selectedTabIndex] = tabView;
				this.addChildToContainer(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChildFromContainer(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
	}

	protected initTabbarGroup():void
	{
		// super.initTabbarGroup();
		let tabContainer = new BaseDisplayObjectContainer();

		let scrollH = GameConfig.stageHeigth - this.container.y+10;
        let rect = new egret.Rectangle(0,0,148,scrollH);
        let scrollView = ComponentManager.getScrollView(tabContainer,rect);
        scrollView.y = 90;
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off";
		
        this.addChild(scrollView);

		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,TabBarGroup.ALIGN_VERTICAL);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			tabContainer.addChild(this.tabbarGroup);
			// this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			// this.changeTab();
		}

		// this.tabbarGroup.setAligh();
		this.tabbarGroup.x = 0;
		this.tabbarGroup.y = 0;
		this.container.y = 89;
		this.tabbarGroup.setSpace(6);
		this.tabbarGroup.addLine("welfare_line");
		this.tabbarGroup.selectedIndex = this.selectedTabIndex;

		this.checkTabbarGroupState();
		this.refreshFunctionRed();

		if (this._functionConfig[this.selectedTabIndex] == "Housekeeper" || this._functionConfig[this.selectedTabIndex] == "GrowGold")
		{
			scrollView.setScrollTop(scrollH-this.container.height);
		}
	}

	private checkTabbarGroupState():void
	{
		let firstRechargeflag = Api.shopVoApi.getPayFlag();
		let firstIndex:number = this._functionConfig.indexOf("FirstRecharge");
		
		if(this._lastFirstRechargeflag == null || this._lastFirstRechargeflag != firstRechargeflag)
		{
			this._lastFirstRechargeflag = firstRechargeflag;
			if(firstRechargeflag == 1)
			{
				this.tabbarGroup.showStatusIcon(firstIndex,"public_dot2");
				this.tabbarGroup.setRedPos(firstIndex, 120, 5);
			}
			else
			{
				this.tabbarGroup.removeStatusIcon(firstIndex);
			}
		}
		
		let signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
		let signinIndex:number = this._functionConfig.indexOf("Signin");
		if(this._lastSigninShowRedDot == null || this._lastSigninShowRedDot != signinShowRedDot)
		{
			this._lastSigninShowRedDot = signinShowRedDot;
			if(signinShowRedDot == true)
			{
				this.tabbarGroup.showStatusIcon(signinIndex,"public_dot2");
				this.tabbarGroup.setRedPos(signinIndex, 120, 5);
			}
			else
			{
				this.tabbarGroup.removeStatusIcon(signinIndex);
			}
		}

		//实名认证红点 
		let realnameIndex:number = this._functionConfig.indexOf("Realname");
		if(Api.otherInfoVoApi.checkrealnamerewards()&&PlatformManager.client.checkPerson())
		{
			this.tabbarGroup.showStatusIcon(realnameIndex,"public_dot2");
			this.tabbarGroup.setRedPos(realnameIndex, 120, 5);
		}
		else
		{
			this.tabbarGroup.removeStatusIcon(realnameIndex);
		} 

		//邀请好友红点 
		let newinviteIndex:number = this._functionConfig.indexOf("NewInvite");
		if(Api.switchVoApi.checkOpenNewInvite() && Api.newinviteVoApi.getShowRed())
		{
			this.tabbarGroup.showStatusIcon(newinviteIndex,"public_dot2");
			this.tabbarGroup.setRedPos(newinviteIndex, 120, 5);
			
		}
		else
		{
			this.tabbarGroup.removeStatusIcon(newinviteIndex);
		}

		//召回好友红点 
		let comebackIndex:number = this._functionConfig.indexOf("PlayerComeBack");
		if(Api.switchVoApi.checkOpenPlayerComeBack() && Api.newrebackVoApi.getShowRed())
		{
			this.tabbarGroup.showStatusIcon(comebackIndex,"public_dot2");
			this.tabbarGroup.setRedPos(comebackIndex, 120, 5);
		}
		else
		{
			this.tabbarGroup.removeStatusIcon(comebackIndex);
		}
		

	}
	private refreshFunctionRed():void
	{
		//功能预览红点
		let functionIndex:number = this._functionConfig.indexOf("FunctionPreview");
		if (functionIndex>=0)
		{
			if(Api.otherInfoVoApi.getFunctionRedhot()==true)
			{
				this.tabbarGroup.showStatusIcon(functionIndex,"public_dot2");
				this.tabbarGroup.setRedPos(functionIndex, 120, 5);
			}
			else
			{
				this.tabbarGroup.removeStatusIcon(functionIndex);
			}
		}
		


	}

	//
	private refreshGrowGoldRed():void
	{
		//功能预览红点
		let functionIndex:number = this._functionConfig.indexOf("GrowGold");
		if (functionIndex>=0)
		{
			if(Api.shopVoApi.checkGrowGoldRed()==true)
			{
				this.tabbarGroup.showStatusIcon(functionIndex,"public_dot2");
				this.tabbarGroup.setRedPos(functionIndex, 120, 5);
			}
			else
			{
				this.tabbarGroup.removeStatusIcon(functionIndex);
			}
		}
	}



	protected getTabbarTextArr():Array<string>
	{
		return this._tabbarTextList;
	}

	protected getResourceList():string[]
	{
		let resArray = this._tabbarList;
		if (Api.switchVoApi.checkOpenHousekeeper())
		{
			resArray.push("housekeeper_open");
		}
		
		return super.getResourceList().concat(resArray).concat([
			
			"common_9_bg","common_left_bg","welfare_line",
			"signin_had_get","welfare_hasbuy",
			"dinner_gems_1","recharge_discount_left",
			]);
	}
	
	protected getTabbarName():string|string[]
	{	
		return this._tabbarList;
	}
	public hide():void
	{
		super.hide();
	}

	public tick() {
		if (this.getSelectedTab() && this.getSelectedTab()["tick"]) {
			this.getSelectedTab()["tick"].call(this.getSelectedTab());
		}
		let functionYearCardIndex:number = this._functionConfig.indexOf("YearCard");
		if(this.tabbarGroup)
		{
			if(!Api.shopVoApi.ifBuyYearCard())
			{
				let vo = Api.acVoApi.checkIsYearCardDiscount();
				if((Api.switchVoApi.checkOpenNewMonthCardAndYearCard()&&App.DeviceUtil.isWXgame()) || (vo))
				{
					this.tabbarGroup.showStatusIcon(functionYearCardIndex,"recharge_discount_left",true);
					this.tabbarGroup.setRedPos(functionYearCardIndex, 120, -5);
				}
				else
				{
					this.tabbarGroup.removeStatusIcon(functionYearCardIndex);
				}
			}
			else
			{
				this.tabbarGroup.removeStatusIcon(functionYearCardIndex);
			}
		}
		let functionMouthCardIndex: number = this._functionConfig.indexOf("MonthCard");
		if (this.tabbarGroup) {
			let mouthVo = Api.acVoApi.checkIsMonthDiscount();
			if (mouthVo && mouthVo.checkBuyMouth()) {
				this.tabbarGroup.showStatusIcon(functionMouthCardIndex, "recharge_discount_left", true);
				this.tabbarGroup.setRedPos(functionMouthCardIndex, 120, -5);
			}
			else {
				this.tabbarGroup.removeStatusIcon(functionMouthCardIndex);
			}
		}
	
	}
	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkTabbarGroupState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkTabbarGroupState,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD,this.checkTabbarGroupState,this);	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.refreshFunctionRed,this);	
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE,this.checkTabbarGroupState,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT,this.hide,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW,this.hideAndShowYearCard,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.checkTabbarGroupState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.refreshGrowGoldRed,this);
		if(this.tabViewData)
		{
			for(var key in this.tabViewData)
			{
				var view = this.tabViewData[key];
				if(view)
				{
					if(this.container.contains(view))
					{
						this.removeChildFromContainer(view);
					}
					view.dispose();
					view = null;
				}
			}
			this.tabViewData = null;
		}
		this._tabbarList=[];
		this._leftBg= null;
		this._tabbarTextList=[];
		this._lastFirstRechargeflag = null;
		this._lastSigninShowRedDot = null;
		if(this.tabbarGroup)
		{ 
			this.tabbarGroup = null;
		}
		super.dispose();
	}
}