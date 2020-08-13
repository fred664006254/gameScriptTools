/**
 * 	拼图奖励活动奖励相关
 * author 张朝阳
 * date 2019/7/16
 * @class AcMotherDayActivityRewardPopupView
 */
class AcMotherDayActivityRewardPopupView extends PopupView {

	private _chargeBtn: BaseButton = null;

	private _taskBtn: BaseButton = null;

	private _shopBtn: BaseButton = null;

	private _chargeContainer: BaseDisplayObjectContainer = null;

	private _taskContainer: BaseDisplayObjectContainer = null;

	private _shopContainer: BaseDisplayObjectContainer = null;

	private _shopNotPartContainer: BaseDisplayObjectContainer = null;

	private _shopHasPartContainer: BaseDisplayObjectContainer = null;

	/**充值奖励ScrollList */
	private _chargeScrollList: ScrollList = null;

	private _taskTabBar: TabBarGroup = null;

	private _taskScrollList: ScrollList = null;

	private _shopScrollList: ScrollList = null;

	private _isCharge: boolean = false;
	private _isTask: boolean = false;
	private _isShop: boolean = false;

	private _containerType = 0;

	private _dayId: number = 1;

	private _tabType: number = 0;

	private _gemTF: BaseTextField = null;

	private _gemTF2: BaseTextField = null;

	private _gemTF3: BaseTextField = null;

	private isSceneCode(code : string):boolean{
		let arr = [3,4,7,8];
		return arr.indexOf(Number(code)) > -1;
	}

	protected getUiCode(): string {
        let code = '';
        switch (Number(this.param.data.code)) {
            case 2:
            case 5:
            case 6:
                code = '1';
                break;
            case 4:
                code = '3';
                break;
            case 7:
            case 8:
                code = '7';
                break;
            default:
                code = this.param.data.code;
                break;
        }
        return code;
    }

	public constructor() {
		super();
	}
	protected initView(): void {
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE, this.chargeHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOTHERDAY_GETMOTHERDAYTASK, this.taskHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOTHERDAY_BUYMOTHERDAYSHOP, this.shopHandle, this);

	}
	/**
	 * 刷新UI
	 */
	private refreashView() {

		let cfg = <Config.AcCfg.MotherDayCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);

		if (vo.getpublicRedhot2()) {
			App.CommonUtil.addIconToBDOC(this._chargeBtn);
		}
		else {
			App.CommonUtil.removeIconFromBDOC(this._chargeBtn);
		}

		if (vo.checTaskRedDot()) {
			App.CommonUtil.addIconToBDOC(this._taskBtn);
		}
		else {
			App.CommonUtil.removeIconFromBDOC(this._taskBtn);
		}

		if (this._chargeScrollList) {
			let chargelist = vo.getSortRechargeCfg();
			chargelist.sort((a, b) => { return a.sortId - b.sortId });
			this._chargeScrollList.refreshData(chargelist, { aid: this.param.data.aid, code: this.param.data.code });
		}

		if (this._taskScrollList) {
			let tasklist = vo.getSortTaskCfg(String(this._dayId));
			tasklist.sort((a, b) => { return a.sortId - b.sortId });
			this._taskScrollList.refreshData(tasklist, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
		}
		this.refreashTabBar();

		if (this._shopScrollList) {
			this._shopScrollList.refreshData(cfg.getShopCfgList(this.getUiCode()), { aid: this.param.data.aid, code: this.param.data.code });
		}
		if (this._gemTF) {
			this._gemTF.text = String(Api.playerVoApi.getPlayerGem());
		}
		if (this._gemTF2) {
			this._gemTF2.text = String(Api.playerVoApi.getPlayerGem());
		}
		if (this._gemTF3) {
			let id = 0;
			if(Number(this.getUiCode()) == 3){
				id = 2011;
			}
			if(Number(this.getUiCode()) == 7){
				id = 2014;
			}
			this._gemTF3.text = String(Api.itemVoApi.getItemNumInfoVoById(id));
		}

	}
	/**tab 刷新 */
	private refreashTabBar() {
		let cfg = <Config.AcCfg.MotherDayCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		if (this._taskTabBar) {
			if (vo.checTaskRedDot1()) {
				this._taskTabBar.addRedPoint(0);
			}
			else {
				this._taskTabBar.removeRedPoint(0);
			}
			if (vo.checTaskRedDot2()) {
				this._taskTabBar.addRedPoint(1);
			}
			else {
				this._taskTabBar.removeRedPoint(1);
			}
			if (vo.checTaskRedDot3()) {
				this._taskTabBar.addRedPoint(2);
			}
			else {
				this._taskTabBar.removeRedPoint(2);
			}
		}
	}

	
	/**充值奖励返回 */
	private chargeHandle(event: egret.Event) {
		if (event.data.ret) {
			let specialGift = event.data.data.data.specialGift;
			let rewards = event.data.data.data.rewards;
			if (specialGift) {
				rewards = "1007_0_" + specialGift + "_" + (this.getUiCode()) + "|" + event.data.data.data.rewards;
			}
			let rewardVoList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);
		}
	}
	/** 任务奖励返回 */
	private taskHandle(event: egret.Event) {
		if (event.data.ret) {
			let specialReward = event.data.data.data.specialReward;
			let rewards = event.data.data.data.rewards;
			if (specialReward) {
				rewards = "1007_0_" + specialReward + "_" + (this.getUiCode()) + "|" + event.data.data.data.rewards;
			}
			let rewardVoList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);
		}
	}
	/** 任务奖励返回 */
	private shopHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardVoList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);
		}
	}
	/**
	 * 重置高度
	 */
	protected resetBgSize() {
		super.resetBgSize();
		this.container.x -= 35;

		this._chargeBtn = ComponentManager.getButton("acmotherdayview_rechargebtn-" + (this.isSceneCode(this.param.data.code) ? `3` : this.getUiCode()), "", this.chargeBtnClick, this);
		this._chargeBtn.setPosition(this.viewBg.x + 65+GameData.popupviewOffsetX*2, 0);
		this.addChildToContainer(this._chargeBtn);

		this._taskBtn = ComponentManager.getButton("acmotherdayview_taskbtn-" + (this.isSceneCode(this.param.data.code) ? `3` : this.getUiCode()), "", this.taskBtnClick, this);
		this._taskBtn.setPosition(this.viewBg.x + 235+GameData.popupviewOffsetX*2, 0);
		this.addChildToContainer(this._taskBtn);

		this._shopBtn = ComponentManager.getButton("acmotherdayview_shopbtn-" + (this.isSceneCode(this.param.data.code) ? `3` : this.getUiCode()), "", this.shopBtnClick, this);
		this._shopBtn.setPosition(this.viewBg.x + 405+GameData.popupviewOffsetX*2, 0);
		this.addChildToContainer(this._shopBtn);


		if (this.param && this.param.data && this.param.data.type) {
			if (this.param.data.type == 2) {
				// this.rankBtnClick();
			}
			if (this.param.data.type == 3) {
				// this.rechargeBtnClick();
			}
		}
		else {
			this.chargeBtnClick();
		}
		this.refreashView();

	}

	/**
	 * 充值说明事件
	 */
	private chargeBtnClick() {
		this._containerType = 1;
		if (this._isCharge) {
			return;
		}
		this._isCharge = true;
		this._isShop = false;
		this._isTask = false;
		this._chargeBtn.touchEnabled = false;
		this._taskBtn.touchEnabled = true;
		this._shopBtn.touchEnabled = true;

		this._chargeBtn.updateButtonImage(BaseButton.BTN_STATE2);
		this._taskBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._shopBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this.showChargeUI();
	}

	/**
	 * 充值奖励UI
	 */
	private showChargeUI() {

		let cfg = <Config.AcCfg.MotherDayCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let list = vo.getSortRechargeCfg();
		list.sort((a, b) => { return a.sortId - b.sortId });
		if (this._taskContainer && (this.container.getChildByName("taskContainer"))) {
			this.container.removeChild(this._taskContainer);
		}
		if (this._shopContainer && (this.container.getChildByName("shopContainer"))) {
			this.container.removeChild(this._shopContainer);
		}
		if (this._chargeContainer) {
			this._chargeScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code });
			this.addChildToContainer(this._chargeContainer);
			return;
		}
		this._chargeContainer = new BaseDisplayObjectContainer();
		this._chargeContainer.name = "chargeContainer";
		this._chargeContainer.x = GameData.popupviewOffsetX;
		this.addChildToContainer(this._chargeContainer);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 624;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._chargeBtn.y + this._chargeBtn.height + 5);
		this._chargeContainer.addChild(bg);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
		this._chargeScrollList = ComponentManager.getScrollList(AcMotherDayActivityRewardChargeScrollItem, list, rect, { aid: this.param.data.aid, code: this.param.data.code });
		this._chargeScrollList.setPosition(bg.x + 5, bg.y + 10);
		this._chargeScrollList.bounces = false;
		this._chargeContainer.addChild(this._chargeScrollList);
	}

	/**
	 * 任务说明事件
	 */
	private taskBtnClick() {
		this._containerType = 2;
		if (this._isTask) {
			return;
		}
		this._isCharge = false;
		this._isShop = false;
		this._isTask = true;
		this._chargeBtn.touchEnabled = true;
		this._taskBtn.touchEnabled = false;
		this._shopBtn.touchEnabled = true;

		this._chargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._taskBtn.updateButtonImage(BaseButton.BTN_STATE2);
		this._shopBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this.showTaskUI();
	}
	/**
	 * 任务奖励UI
	 */
	private showTaskUI() {
		let cfg = <Config.AcCfg.MotherDayCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		if (this._chargeContainer && (this.container.getChildByName("chargeContainer"))) {
			this.container.removeChild(this._chargeContainer);
		}
		if (this._shopContainer && (this.container.getChildByName("shopContainer"))) {
			this.container.removeChild(this._shopContainer);
		}
		if (this._taskContainer) {
			this.taskTabBarClick({ index: this._tabType });
			this.refreashTabBar();
			this.addChildToContainer(this._taskContainer);
			return;
		}
		this._taskContainer = new BaseDisplayObjectContainer();
		this._taskContainer.name = "taskContainer";
		this.addChildToContainer(this._taskContainer);
		this._taskContainer.x = GameData.popupviewOffsetX;

		let scenecode = this.isSceneCode(this.param.data.code) ? `3` : this.param.data.code;
		let tabarArr = ["acMotherDayActivityRewardTaskTab1-" +scenecode, "acMotherDayActivityRewardTaskTab2-" + scenecode , "acMotherDayActivityRewardTaskTab3-" + scenecode];
		this._taskTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabarArr, this.taskTabBarClick, this);
		this._taskTabBar.setPosition(this.viewBg.x + 25+GameData.popupviewOffsetX, this._taskBtn.y + this._taskBtn.height + 5);
		this._taskContainer.addChild(this._taskTabBar);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 624 - 46;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._taskTabBar.y + this._taskTabBar.height);
		this._taskContainer.addChild(bg);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
		this._taskScrollList = ComponentManager.getScrollList(AcMotherDayActivityRewardTaskScrollItem, null, rect, { dayId: this._dayId, aid: this.param.data.aid, code: this.param.data.code });
		this._taskScrollList.setPosition(bg.x + 5, bg.y + 10);
		this._taskScrollList.bounces = false;
		this._taskContainer.addChild(this._taskScrollList);
		this._tabType = Number(vo.getNowDayTask()) - 1;
		this.taskTabBarClick({ index: this._tabType });
		this._taskTabBar.selectedIndex = this._tabType;
		this.refreashTabBar();
	}
	/**Tab 事件 */
	private taskTabBarClick(data: any) {
		this._tabType = data.index;
		let cfg = <Config.AcCfg.MotherDayCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		if (data.index == 0) {
			this._dayId = 1;
			let list = vo.getSortTaskCfg(String(this._dayId));
			list.sort((a, b) => { return a.sortId - b.sortId });
			this._taskScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
		}
		else if (data.index == 1) {
			this._dayId = 2;
			let list = vo.getSortTaskCfg(String(this._dayId));
			list.sort((a, b) => { return a.sortId - b.sortId });
			this._taskScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });

		}
		else if (data.index == 2) {
			this._dayId = 3;
			let list = vo.getSortTaskCfg(String(this._dayId));
			list.sort((a, b) => { return a.sortId - b.sortId });
			this._taskScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
		}

	}

	/**
	 * 充值说明事件
	 */
	private shopBtnClick() {
		this._containerType = 3;
		if (this._isShop) {
			return;
		}
		this._isCharge = false;
		this._isShop = true;
		this._isTask = false;
		this._chargeBtn.touchEnabled = true;
		this._taskBtn.touchEnabled = true;
		this._shopBtn.touchEnabled = false;

		this._chargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._taskBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._shopBtn.updateButtonImage(BaseButton.BTN_STATE2);
		this.showShopUI();
	}

	/**
	 * 充值奖励UI
	 */
	private showShopUI() {

		let cfg = <Config.AcCfg.MotherDayCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		// let list = vo.getSortRechargeCfg();
		// list.sort((a, b) => { return a.sortId - b.sortId });
		if (this._taskContainer && (this.container.getChildByName("taskContainer"))) {
			this.container.removeChild(this._taskContainer);
		}
		if (this._chargeContainer && (this.container.getChildByName("chargeContainer"))) {
			this.container.removeChild(this._chargeContainer);
		}
		if (this._shopContainer) {
			if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock("104", "homeScene")) {
				this._shopHasPartContainer.setVisible(true);
				this._shopNotPartContainer.setVisible(false);
			}
			else {
				this._shopHasPartContainer.setVisible(false);
				this._shopNotPartContainer.setVisible(true);
			}
			this.addChildToContainer(this._shopContainer);
			return;
		}
		this._shopContainer = new BaseDisplayObjectContainer();
		this._shopContainer.name = "shopContainer";
		this.addChildToContainer(this._shopContainer);
		this._shopContainer.x = GameData.popupviewOffsetX;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 624;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._chargeBtn.y + this._chargeBtn.height + 5);
		this._shopContainer.addChild(bg);

		this._shopNotPartContainer = new BaseDisplayObjectContainer();
		this._shopContainer.addChild(this._shopNotPartContainer);

		let itembg = BaseBitmap.create("specialview_commoni_namebg");
		itembg.setPosition(bg.x + bg.width / 2 - itembg.width / 2, bg.y + 25 - itembg.height / 2);
		this._shopNotPartContainer.addChild(itembg);

		let needIconScale = 0.4;
		let itemGem = BaseLoadBitmap.create("itemicon1");
		itemGem.width = 100;
		itemGem.height = 100;
		itemGem.setScale(needIconScale);
		itemGem.setPosition(itembg.x, itembg.y + itembg.height / 2 - itemGem.height / 2 * needIconScale);
		this._shopNotPartContainer.addChild(itemGem);

		this._gemTF = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._gemTF.setPosition(itemGem.x + itemGem.width * needIconScale, itembg.y + itembg.height / 2 - this._gemTF.height / 2)
		this._shopNotPartContainer.addChild(this._gemTF);

		this._shopHasPartContainer = new BaseDisplayObjectContainer();
		this._shopContainer.addChild(this._shopHasPartContainer);

		let itembg2 = BaseBitmap.create("specialview_commoni_namebg");
		itembg2.setPosition(bg.x + bg.width / 2 - itembg2.width - 50, bg.y + 25 - itembg2.height / 2);
		this._shopHasPartContainer.addChild(itembg2);

		let itemGem2 = BaseLoadBitmap.create("itemicon1");
		itemGem2.width = 100;
		itemGem2.height = 100;
		itemGem2.setScale(needIconScale);
		itemGem2.setPosition(itembg2.x, itembg2.y + itembg2.height / 2 - itemGem2.height / 2 * needIconScale);
		this._shopHasPartContainer.addChild(itemGem2);

		this._gemTF2 = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._gemTF2.setPosition(itemGem2.x + itemGem2.width * needIconScale, itembg2.y + itembg2.height / 2 - this._gemTF2.height / 2)
		this._shopHasPartContainer.addChild(this._gemTF2);

		let itembg3 = BaseBitmap.create("specialview_commoni_namebg");
		itembg3.setPosition(bg.x + bg.width / 2 + 50, bg.y + 25 - itembg3.height / 2);
		this._shopHasPartContainer.addChild(itembg3);

		let id = 0;
		if(Number(this.getUiCode()) == 3){
			id = 2011;
		}
		if(Number(this.getUiCode()) == 7){
			id = 2014;
		}
		let itemGem3 = BaseLoadBitmap.create(`itemicon${id}`);
		itemGem3.width = 100;
		itemGem3.height = 100;
		itemGem3.setScale(needIconScale);
		itemGem3.setPosition(itembg3.x, itembg3.y + itembg3.height / 2 - itemGem3.height / 2 * needIconScale);
		this._shopHasPartContainer.addChild(itemGem3);

		this._gemTF3 = ComponentManager.getTextField(String(Api.itemVoApi.getItemNumInfoVoById(id)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._gemTF3.setPosition(itemGem3.x + itemGem3.width * needIconScale, itembg3.y + itembg3.height / 2 - this._gemTF3.height / 2)
		this._shopHasPartContainer.addChild(this._gemTF3);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20 - 35);
		this._shopScrollList = ComponentManager.getScrollList(AcMotherDayActivityRewardShopScrollItem, cfg.getShopCfgList(this.getUiCode()), rect, { aid: this.param.data.aid, code: this.param.data.code });
		this._shopScrollList.setPosition(bg.x + 5, bg.y + 10 + 35);
		this._shopScrollList.bounces = false;
		this._shopContainer.addChild(this._shopScrollList);
		if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock("104", "homeScene")) {
			this._shopHasPartContainer.setVisible(true);
			this._shopNotPartContainer.setVisible(false);
		}
		else {
			this._shopHasPartContainer.setVisible(false);
			this._shopNotPartContainer.setVisible(true);
		}
	}

	protected getTitleStr() {
		return "acMotherDayActivityRewardPopupViewTitle-3";
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"accarnivalview_tab_green", "accarnivalview_tab_red", "progress5", "progress3_bg", "activity_charge_red", "specialview_commoni_namebg",
			"shopview_corner"
		]);
	}

	protected getShowHeight() {
		return 840;
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE, this.chargeHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOTHERDAY_GETMOTHERDAYTASK, this.taskHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOTHERDAY_BUYMOTHERDAYSHOP, this.shopHandle, this);
		this._chargeBtn = null;
		this._taskBtn = null;
		this._shopBtn = null;
		this._chargeContainer = null;
		this._taskContainer = null;
		this._shopContainer = null;
		this._chargeScrollList = null;
		this._taskScrollList = null;
		this._shopNotPartContainer = null;
		this._shopHasPartContainer = null;
		this._taskTabBar = null;
		this._isCharge = false;
		this._isTask = false;
		this._isShop = false;
		this._containerType = 0;
		this._dayId = 1;
		this._tabType = 0;
		this._shopScrollList = null;
		this._gemTF = null;
		this._gemTF2 = null;
		this._gemTF3 = null;
		super.dispose();
	}
}