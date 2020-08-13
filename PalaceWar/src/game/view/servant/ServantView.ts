/**
 * 门客
 * author yanyuling
 * date 2017/9/25
 * @class ItemView
 */

class ServantView  extends CommonView
{
	static  DROPBTN_COLOR1:number = 0xfffcd8;
	static  DROPBTN_COLOR2:number = 0x99a3b4;
	private _nodeContainer:BaseDisplayObjectContainer;
	private _dropDownContainer:BaseDisplayObjectContainer;
	private _dropDownBtn:BaseButton;
	private _dropDownFlag:BaseBitmap;
	private _dropBtnList:BaseButton[];
	private _lastDropIdx:number=1;
	private _scrollList:ScrollList = null;
	private _qingyuanBtn:BaseButton = null;
	public constructor() {
		super();
	}

	protected getBgName():string
	{
		return "public_9_bg84";
	}

	protected get uiType():string
	{
		return "2";
	}

	protected showGuideAgain():string
	{	
		if (Api.switchVoApi.checkOpenExile())
		{
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile")){
					return "servant2_2_2";
				}
			}
			else{
				return "servant2_2_2";
			}
		}

		return "servant2_2";
	}

	protected clickGuideAgain():void
	{
		super.clickGuideAgain();

		if (this._scrollList)
		{
			this._scrollList.setScrollTop(0);
			this._scrollList.verticalScrollPolicy = "off";
		}
		else
		{
			let tab1:ServantViewTab1 = <ServantViewTab1>this.tabViewData[0];
			if (tab1)
			{	
				tab1.refreshSort();
				tab1._scrollList.setScrollTop(0,1);
				tab1._scrollList.verticalScrollPolicy = "off";
			}
		}
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

	protected initTabbarGroup():void
	{	
		
		
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			let tabbg = BaseBitmap.create("commonview_tabbar_bg");
			tabbg.x = 10;
			tabbg.y = 94;
			this.addChild(tabbg);


			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			this.tabbarGroup.setSpace(0);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.y+=3;
			this.tabbarGroup.x=(this.width - this.tabbarGroup.width)/2;
			this.tabbarGroup.setColor(0xe1ba86,0x472c26);

			this.tabbarGroup.addZshi();
		}
	}

	protected clickTabbarHandler(data:any):void
	{
		
		super.clickTabbarHandler(data);

		if (this._guideBtn)
		{
			let index = Number(data.index);
			this._guideBtn.visible = (index==0);
		}

	}

	// protected setTabBarPosition():void
	// {
	// 	if(this.tabbarGroup)
	// 	{
	// 		this.tabbarGroup.x = (this.width - this.tabbarGroup.width)/2;
	// 	}
	// }

	public initView():void
	{
		this.bigframe.height = GameConfig.stageHeigth - this.container.y-10;
		this.bigframe.y = -60;

		Api.mainTaskVoApi.isKeepGuide = true;
		Api.mainTaskVoApi.checkShowGuide();
		if (Api.unlocklist2VoApi.checkShowOpenFunc()){
			if (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile") || Api.unlocklist2VoApi.checkNeedShowByName("servantExile")){
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.refreshExileView, this);
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.refreshExileView, this);
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreshExileView, this);
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.refreshExileView, this);
				this.refreshExileView();
				if (Api.unlocklist2VoApi.checkNeedShowByName("servantExile")){
					App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
					Api.unlocklist2VoApi.checkWaitingShowByName("servantExile");
				}
				return ;
			}
		}
		else{
			if(Api.switchVoApi.checkOpenExile())
			{
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.refreshExileView, this);
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.refreshExileView, this);
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreshExileView, this);
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.refreshExileView, this);
				this.refreshExileView();
				return;
			}
		}
		
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END2,this.rookieGuideEndCheck,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.refreshQingyuan, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshQingyuan, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshQingyuan,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.refreshQingyuan,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA,this.refreshQingyuan,this);
        //衣装强化
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.refreshQingyuan,this);
        //使用丹药
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.refreshQingyuan,this);
         //书记升级
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshQingyuan,this);
        //神器
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.refreshQingyuan,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.refreshQingyuan,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.refreshQingyuan,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.refreshQingyuan,this);
        //光环
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_UPAURA,this.refreshQingyuan,this);

		this._dropBtnList = [];
		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		this._lastDropIdx = Api.otherInfoVoApi.getServantSortId();
		
		//衬底
		let topBg = BaseBitmap.create("commonview_substrate");
		topBg.height = GameConfig.stageHeigth -165+25;
		topBg.y = -10;
		topBg.x = GameConfig.stageWidth/2 - topBg.width/2;
		// this._nodeContainer.addChild(topBg);

		//门客滚顶区域
		let scroY = topBg.y+10;
		let innerbg =  BaseBitmap.create("public_9_bg74");
		innerbg.width = topBg.width-10;
		innerbg.height = topBg.height - 20;
		innerbg.x = topBg.x+5;
		innerbg.y = scroY;
		// this._nodeContainer.addChild(innerbg);

		let downBg = BaseBitmap.create("servantview_bottomui");
		downBg.x = 0;
		downBg.y = topBg.y+topBg.height-10;
		this._nodeContainer.addChild(downBg);

		let servantNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		servantNumTxt.text = LanguageManager.getlocal("servant_count") + Api.servantVoApi.getServantCount();
		servantNumTxt.x = downBg.x+30;
		servantNumTxt.y = downBg.y + downBg.height/2 - servantNumTxt.height/2-10;
		this._nodeContainer.addChild(servantNumTxt);

		this._dropDownBtn = ComponentManager.getButton("common_select_frame","",this.dropDownBtnClickHandler,this,[0]);
		this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 40;
		this._dropDownBtn.y = servantNumTxt.y + servantNumTxt.height/2 - this._dropDownBtn.height/2;
		this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
		this._nodeContainer.addChild(this._dropDownBtn);
		this._dropDownBtn.setText("servant_dropTxt"+this._lastDropIdx);
		this._dropBtnList.push(this._dropDownBtn);

		this._dropDownFlag = BaseBitmap.create("common_arrow_1");
		this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
		this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width -this._dropDownFlag.width-3 ;
		this._dropDownFlag.y =this._dropDownBtn.y + this._dropDownBtn.height -this._dropDownFlag.height/2-3;
		this._nodeContainer.addChild(this._dropDownFlag);

		this._dropDownContainer = new BaseDisplayObjectContainer()
		this._dropDownContainer.visible = false;
		this._dropDownContainer.x = this._dropDownBtn.x;
		this._dropDownContainer.y = this._dropDownBtn.y - this._dropDownBtn.height;
		
		let dropCfg=[
			"servant_dropTxt1","servant_dropTxt2","servant_dropTxt3","servant_dropTxt4"
		]

		for (var index = 1; index <=dropCfg.length; index++) {
			let tmpBtn = ComponentManager.getButton("common_select_frame","",this.dropDownBtnClickHandler,this,[index]);
			this._dropBtnList.push(tmpBtn);
			tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
			tmpBtn.y = -tmpBtn.height*(index-1) -3;
			this._dropDownContainer.addChild(tmpBtn);
			tmpBtn.setText(dropCfg[index-1]);
		}
		
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth-4,innerbg.height-10);
		let keys = Api.servantVoApi.getServantInfoIdListWithSort(this._lastDropIdx);
		this._scrollList = ComponentManager.getScrollList(ServantNewScrollItem,[],rect);
		this._scrollList.y = scroY+5;
		this._scrollList.x = 2;
		this._nodeContainer.addChild(this._scrollList);
		this._scrollList.refreshData(keys);	
		this._nodeContainer.addChild(this._dropDownContainer);

		//情缘绘卷入口
		if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
            let qingyuanBtn = ComponentManager.getButton("qingyuannew_icon", "", () => {
                // if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                    ViewController.getInstance().openViewByFunName("qingyuan");
                // }
                // else {
                //     App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                // }
            }, this);
            qingyuanBtn.setPosition(downBg.x - 20, downBg.y - qingyuanBtn.height);
			this._nodeContainer.addChild(qingyuanBtn);
			this._qingyuanBtn = qingyuanBtn;
			let redDot = BaseBitmap.create("public_dot2");
            redDot.setPosition(qingyuanBtn.x + qingyuanBtn.width - 39, qingyuanBtn.y + 24);
            this._nodeContainer.addChild(redDot);
            redDot.name = "qingyuanRedDot";
            this.refreshQingyuan();
        }

		if (Api.rookieVoApi.getIsGuiding() && Api.rookieVoApi.curStep == "weapon_5")
		{	
			let guideIdx:number = 0;
			for (let i=0; i<keys.length; i++)
			{
				let tmp = keys[i];
				if (tmp == "1001")
				{
					guideIdx = i;
					this._scrollList.setScrollTopByIndex(guideIdx);

					let item = <ServantNewScrollItem>this._scrollList.getItemByIndex(guideIdx);
					let posnew = item.localToGlobal();
					RookieCfg.rookieCfg["weapon_6"].clickRect.x = posnew.x+10;
            		RookieCfg.rookieCfg["weapon_6"].clickRect.y = posnew.y+3;
					break;
				}
			}
		}
		if (Api.rookieVoApi.getIsGuiding())
		{
			this._scrollList.verticalScrollPolicy = "off";
		}

		Api.rookieVoApi.checkNextStep();
		
	}

	private refreshQingyuan():void{
		if (this._qingyuanBtn){
			let redDot = <BaseBitmap>this._nodeContainer.getChildByName("qingyuanRedDot");
			if (Api.encounterVoApi.isShowNpc()){
				// App.CommonUtil.addIconToBDOC(this._qingyuanBtn);
				redDot.visible = true;
			}
			else{
				redDot.visible = false;
			}
		}
	}

	public dropDownBtnClickHandler(btnIdx:number)
	{
		let tmpIdx = this._lastDropIdx;
		for (var index = 1; index < this._dropBtnList.length; index++) {
			this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
		}
		this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
		if (this._dropDownContainer.visible)
		{
			this._dropDownFlag.scaleY = 1;
			this._dropDownContainer.visible = false;
		}else
		{
			this._dropDownFlag.scaleY = -1;
			this._dropDownContainer.visible = true;
		}
		if (btnIdx > 0 )
		{
			this._dropDownBtn.setText("servant_dropTxt"+btnIdx);
			this._lastDropIdx = btnIdx;
		}

		if(tmpIdx == this._lastDropIdx)
		{
			return;
		}
		
		//排序数据，刷新列表
		let keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
		this._scrollList.refreshData(keys);	
		NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT,{sortId:this._lastDropIdx});	
	}

	/**功能开启回调 */
	private freshOpenFunc(evt:egret.Event):void{
		if (evt && evt.data){
			let key = evt.data.key;
			if (key == "servantExile"){
				this.refreshExileView();
			}
		}
	}

	/**刷新门客出海界面 */
	private refreshExileView() {
		if (Api.unlocklist2VoApi.checkShowOpenFunc()){
			if (Api.unlocklist2VoApi.checkNeedShowByName("servantExile")){
				let tabbar = this.tabbarGroup.getTabBar(1);
				tabbar.visible = false;
				return;
			}
		}
		let tabbar = this.tabbarGroup.getTabBar(1);
		tabbar.visible = true;
		if (Api.servantVoApi.getServantCount() > Config.ExileCfg.numNeed) {
			let reddotExile = LocalStorageManager.get(String(Api.playerVoApi.getPlayerID()) + "SevantExile");
			if ((!reddotExile) || (Api.servantExileVoApi.isShowExileRedDot()) || Api.servantExileVoApi.getExileBuffRed() ) {
				this.tabbarGroup.addRedPoint(1)
			}
			else {
				this.tabbarGroup.removeRedPoint(1)
			}
			App.DisplayUtil.changeToNormal(this.tabbarGroup.getTabBar(1));
		}
		else {
			this.tabbarGroup.removeRedPoint(1)
			App.DisplayUtil.changeToGray(this.tabbarGroup.getTabBar(1));
		}
	}
	protected getResourceList():string[]
	{
		let resArr:string[]=[]
		resArr = [
			"bookroom_tipbg", "servantexileview_frameanimation_idle", "servantexileview_frameanimation_talk", "servantexileview_frameanimation_walk",
			"servantexileview_frameanimation_back",
			"commonview_tabbar_bg",
		];
		
		if (Api.switchVoApi.checkOpenExileBuff())
		{
			resArr.push("exile_fleet_buff");
			resArr.push("exile_servant_buff");
		}

		return super.getResourceList().concat([
			"common_select_frame","common_select_frame_down","common_arrow_1","servanticon_lvbg",
			"servant_star","servant_icon_effect",
			"servant_cardbg_selected","servant_topnumbg",
			"exile_seet_timebg",
			"servanticon_select",
			"servant_lvbg","servant_starbg","commonview_substrate","common_bar_bg",
			"servantview_bottomui","qingyuannew_icon"
		]).concat(resArr);
	}
	public hide():void
	{
		if(this._lastDropIdx != Api.otherInfoVoApi.getServantSortId() && (!Api.switchVoApi.checkOpenExile()))
		{
			NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT,{sortId:this._lastDropIdx});
		}
		super.hide();
	}
	protected getRuleInfo():string
	{
		if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenExile() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile") || Api.unlocklist2VoApi.checkNeedShowByName("servantExile")))) {
			if (Api.switchVoApi.checkOpenBanishFreeTime()) {
				return "servantViewRuleInfo_exile_withfree";
			}
			return "servantViewRuleInfo_exile";
		}
		return "servant_description";
	}

	protected getExtraRuleInfo():string
    {   
        let params:string[] = [];

        if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenExile() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile") || Api.unlocklist2VoApi.checkNeedShowByName("servantExile"))))
        {	
			let exileParams:string = "";
			if (Api.switchVoApi.checkOpenExileBuff()) {
				exileParams = LanguageManager.getlocal("servantViewRuleInfo_part5");
			}
			if (Api.switchVoApi.checkOpenBanishFreeTime()) {
				exileParams = LanguageManager.getlocal("servantViewRuleInfo_part2",[exileParams]);
			}
			
			params.push(LanguageManager.getlocal("servantViewRuleInfo_part1",[exileParams]));
        }
        else
        {
			params.push("");
        }
        
        if ( Api.switchVoApi.checkWeaponFunction())
        {	
           	params.push(LanguageManager.getlocal("servantViewRuleInfo_part3"));
        }
        else
        {
            params.push("");
        }

		if ( Api.switchVoApi.checkOpenWifeExSkill())
        {	
           	params.push(LanguageManager.getlocal("servantViewRuleInfo_part4"));
        }
        else
        {
            params.push("");
        }

        return LanguageManager.getlocal("servantViewRuleInfo_spell",params);
    }

	protected getTabbarTextArr():Array<string>
	{
		if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenExile() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("servantExile") || Api.unlocklist2VoApi.checkNeedShowByName("servantExile"))))
		{
			return ["servantViewTab1Title_exile","servantViewTab2Title_exile"];
		}
		return [];
	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{
		if (Api.switchVoApi.checkOpenExile()) {
			if (Config.ExileCfg.numNeed < Api.servantVoApi.getServantCount()) {
				LocalStorageManager.set(String(Api.playerVoApi.getPlayerID()) + "SevantExile","true");
				this.refreshExileView();
				return true;
			}
			else {
				App.CommonUtil.showTip(LanguageManager.getlocal("servantViewShowTip_exile", [String(Config.ExileCfg.numNeed)]));
				return false;
			}
		}
		return true;
	}

	private rookieGuideEndCheck():void
	{
		if (this._scrollList)
		{
			this._scrollList.verticalScrollPolicy = "on";
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.refreshExileView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.refreshExileView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.refreshExileView, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_NOTICE_GUIDE_END2,this.rookieGuideEndCheck,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.refreshExileView, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.refreshQingyuan, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshQingyuan, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshQingyuan,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.refreshQingyuan,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA,this.refreshQingyuan,this);
        //衣装强化
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.refreshQingyuan,this);
        //使用丹药
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.refreshQingyuan,this);
         //书记升级
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshQingyuan,this);
        //神器
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.refreshQingyuan,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.refreshQingyuan,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.refreshQingyuan,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.refreshQingyuan,this);
        //光环
		App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_SERVANT_UPAURA,this.refreshQingyuan,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
		// this._nodeContainer.removeChildren();
		// this._nodeContainer.dispose()
		// this._dropDownContainer.removeChildren();
		// this._dropDownContainer.dispose()
		Api.mainTaskVoApi.isKeepGuide = false;
		Api.mainTaskVoApi.hideGuide();
		this._nodeContainer = null;
		this._dropDownContainer = null;
		this._scrollList = null;
		this. _dropDownBtn = null;
		this. _dropDownFlag = null;
		this._dropBtnList = null;
		this._lastDropIdx = 1;
		this._qingyuanBtn = null;
		super.dispose();
	}
}