/**
 * 	投壶活动奖励相关
 * author 张朝阳
 * date 2019/4/3
 * @class AcThrowArrowPopupView
 */
class AcThrowArrowPopupView extends PopupView {

	/**规则说明按钮 */
	private _explainBtn: BaseButton = null;
	/**奖励池子按钮 */
	private _rewardBtn: BaseButton = null;
	/**充值奖励按钮 */
	private _rechargeBtn: BaseButton = null;
	/**按钮 */
	private _logBtn: BaseButton = null;
	/**玩法Container */
	private _explainContainer: BaseDisplayObjectContainer = null;
	/**奖励Container */
	private _rewardContainer: BaseDisplayObjectContainer = null;
	/**充值Container */
	private _rechargeContainer: BaseDisplayObjectContainer = null;
	/**记录Container */
	private _logContainer: BaseDisplayObjectContainer = null;
	/**充值奖励ScrollList */
	private _rechargeScrollList: ScrollList = null;
	/**日志ScrollList */
	private _logScrollList: ScrollList = null;

	private _isExplain: boolean = false;
	private _isRewarad: boolean = false;
	private _isServant: boolean = false;
	private _isRank: boolean = false;


	private _containerType = 0;


	public constructor() {
		super();
	}
	protected initView(): void {
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD, this.throwArrowgetRechargerwdHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS, this.showLogUI, this);

	}
	/**
	 * 刷新UI
	 */
	private refreashView() {
		let vo = <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		if (vo.checkRechargeRedDot()) {
			App.CommonUtil.addIconToBDOC(this._rechargeBtn);
		}
		else {
			App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
		}
		if (this._isServant) {
			this.showRechargeUI();
		}
	}
	/**充值奖励返回 */
	private throwArrowgetRechargerwdHandle(event: egret.Event) {
		if (event.data.ret) {
			let specialGift = event.data.data.data.specialGift;
			let rewards = "1006_0_" + specialGift + "_" + this.param.data.code + "|" + event.data.data.data.rewards
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
		this.container.x+=GameData.popupviewOffsetX;
		let offest = 34;
		this._explainBtn = ComponentManager.getButton("acthrowarrowview_descbtn-" + this.getUiCode(), "", this.explainBtnClick, this);
		this._explainBtn.setPosition(this.viewBg.x + offest+GameData.popupviewOffsetX, 0);
		this.addChildToContainer(this._explainBtn);

		this._rewardBtn = ComponentManager.getButton("acthrowarrowview_rewardbtn-" + this.getUiCode(), "", this.rewaradBtnClick, this);
		this._rewardBtn.setPosition(this._explainBtn.x + this._explainBtn.width + offest, this._explainBtn.y);
		this.addChildToContainer(this._rewardBtn);

		this._rechargeBtn = ComponentManager.getButton("acthrowarrowview_rechargerewardbtn-" + this.getUiCode(), "", this.rechargeBtnClick, this);
		this._rechargeBtn.setPosition(this._rewardBtn.x + this._rewardBtn.width + offest, this._rewardBtn.y);
		this.addChildToContainer(this._rechargeBtn);

		this._logBtn = ComponentManager.getButton("acthrowarrowview_logbtn-" + this.getUiCode(), "", this.rankBtnClick, this);
		this._logBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width + offest, this._rechargeBtn.y);
		this.addChildToContainer(this._logBtn);


		if (this.param && this.param.data && this.param.data.type) {
			if (this.param.data.type == 4) {
				this.rankBtnClick();
			}
			if (this.param.data.type == 3) {
				this.rechargeBtnClick();
			}
		}
		else {
			this.explainBtnClick();
		}
		this.refreashView();

	}

	/**
	 * 规则说明事件
	 */
	private explainBtnClick() {
		this._containerType = 1;
		if (this._isExplain) {
			return;
		}
		this._isExplain = true;
		this._explainBtn.touchEnabled = false;
		this._rewardBtn.touchEnabled = true;
		this._rechargeBtn.touchEnabled = true;
		this._logBtn.touchEnabled = true;
		this._isServant = false;
		this._isRank = false;
		this._isRewarad = false;
		this._explainBtn.updateButtonImage(BaseButton.BTN_STATE2);
		this._rewardBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._rechargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._logBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this.showExplainUI();
	}
	/**
	 * 显示规则说明的UI
	 */
	private showExplainUI() {
		if (this._logContainer && (this.container.getChildByName("logContainer"))) {
			this.container.removeChild(this._logContainer)
		}
		if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
			this.container.removeChild(this._rewardContainer)
		}
		if (this._rechargeContainer && (this.container.getChildByName("rechargeContainer"))) {
			this.container.removeChild(this._rechargeContainer)
		}
		if (this._explainContainer) {
			this.addChildToContainer(this._explainContainer)
			return;
		}
		this._explainContainer = new BaseDisplayObjectContainer();
		this._explainContainer.name = "explainContainer";
		this.addChildToContainer(this._explainContainer);
		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 624;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._explainBtn.y + this._explainBtn.height + 5);
		this._explainContainer.addChild(bg);

		let rectContainer = new BaseDisplayObjectContainer();
		this._explainContainer.addChild(rectContainer);

		let rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
		let scrollView = ComponentManager.getScrollView(rectContainer, rect);
		scrollView.bounces = false;
		scrollView.setPosition(bg.x, bg.y + 5);
		this._explainContainer.addChild(scrollView);

		let txtDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_ExplainDesc1-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		txtDesc1.width = 500;
		txtDesc1.lineSpacing = 10;
		txtDesc1.setPosition(bg.width / 2 - txtDesc1.width / 2, 10);
		rectContainer.addChild(txtDesc1);

		let ruleBg = BaseLoadBitmap.create("acthrowarrowview_explain-" + this.getUiCode());
		ruleBg.width = 520;
		ruleBg.height = 183;
		ruleBg.setPosition(bg.width / 2 - ruleBg.width / 2, txtDesc1.y + txtDesc1.height)
		rectContainer.addChild(ruleBg);

		let txtDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_ExplainDesc2-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		txtDesc2.width = 500;
		txtDesc2.lineSpacing = 10;
		txtDesc2.height += txtDesc2.size;
		txtDesc2.setPosition(bg.width / 2 - txtDesc2.width / 2, ruleBg.y + ruleBg.height);
		rectContainer.addChild(txtDesc2);

	}
	/**
	 * 奖励事件
	 */
	private rewaradBtnClick() {
		this._containerType = 2;
		if (this._isRewarad) {
			return;
		}
		this._isRewarad = true;
		this._explainBtn.touchEnabled = true;
		this._rewardBtn.touchEnabled = false;
		this._rechargeBtn.touchEnabled = true;
		this._logBtn.touchEnabled = true;
		this._isServant = false;
		this._isExplain = false;
		this._isRank = false;
		this._explainBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._rewardBtn.updateButtonImage(BaseButton.BTN_STATE2);
		this._rechargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._logBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this.showRewardUI();
	}
	/**
	 * 	奖励的UI
	 */
	private showRewardUI() {

		let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);

		if (this._logContainer && (this.container.getChildByName("logContainer"))) {
			this.container.removeChild(this._logContainer)
		}
		if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
			this.container.removeChild(this._explainContainer)
		}
		if (this._rechargeContainer && (this.container.getChildByName("rechargeContainer"))) {
			this.container.removeChild(this._rechargeContainer)
		}
		if (this._rewardContainer) {
			this.addChildToContainer(this._rewardContainer);
			return;
		}
		this._rewardContainer = new BaseDisplayObjectContainer();
		this._rewardContainer.name = "rewardContainer";
		this.addChildToContainer(this._rewardContainer);

		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 624;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rewardBtn.y + this._rewardBtn.height + 5);
		this._rewardContainer.addChild(bg);

		let titleBg = BaseBitmap.create("fourpeople_bottom");
		this._rewardContainer.addChild(titleBg);
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_rewardTopTitle-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleBg.width = titleTF.width + 60;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
		this._rewardContainer.addChild(titleTF);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - titleBg.height - 30);
		let scrollList = ComponentManager.getScrollList(AcThrowArrowRewardScrollItem, cfg.throwArrowPoolListItemCfgList, rect, { aid: this.param.data.aid, code: this.param.data.code });
		scrollList.setPosition(bg.x + bg.width / 2 - scrollList.width / 2, titleBg.y + titleBg.height + 5);
		scrollList.bounces = false;
		this._rewardContainer.addChild(scrollList);
	}

	/**
	 * 充值奖励
	 */
	private rechargeBtnClick() {
		this._containerType = 3;
		if (this._isServant) {
			return;
		}
		this._isServant = true;
		this._explainBtn.touchEnabled = true;
		this._rewardBtn.touchEnabled = true;
		this._rechargeBtn.touchEnabled = false;
		this._logBtn.touchEnabled = true;
		this._isExplain = false;
		this._isRank = false;
		this._isRewarad = false;
		this._explainBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._rewardBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._rechargeBtn.updateButtonImage(BaseButton.BTN_STATE2);
		this._logBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this.showRechargeUI();
	}
	/**
	 * 充值奖励UI
	 */
	private showRechargeUI() {

		// let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let vo = <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let list = vo.getSortRechargeCfg();
		list.sort((a, b) => { return a.sortId - b.sortId });

		if (this._logContainer && (this.container.getChildByName("logContainer"))) {
			this.container.removeChild(this._logContainer);
		}
		if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
			this.container.removeChild(this._explainContainer);
		}
		if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
			this.container.removeChild(this._rewardContainer);
		}
		if (this._rechargeContainer) {
			this._rechargeScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code });
			this.addChildToContainer(this._rechargeContainer);
			return;
		}
		this._rechargeContainer = new BaseDisplayObjectContainer();
		this._rechargeContainer.name = "rechargeContainer";
		this.addChildToContainer(this._rechargeContainer);

		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 624;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rechargeBtn.y + this._rechargeBtn.height + 5);
		this._rechargeContainer.addChild(bg);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
		this._rechargeScrollList = ComponentManager.getScrollList(AcThrowArrowRechargeScrollItem, list, rect, { aid: this.param.data.aid, code: this.param.data.code });
		this._rechargeScrollList.setPosition(bg.x + 5, bg.y + 10);
		this._rechargeScrollList.bounces = false;
		this._rechargeContainer.addChild(this._rechargeScrollList);
	}
	/**
	 * 排行事件
	 */
	private rankBtnClick() {
		this._containerType = 4;
		if (this._isRank) {
			return;
		}
		this._isRank = true;
		this._explainBtn.touchEnabled = true;
		this._rewardBtn.touchEnabled = true;
		this._rechargeBtn.touchEnabled = true;
		this._logBtn.touchEnabled = false;
		this._isServant = false;
		this._isExplain = false;
		this._isRewarad = false;
		this._explainBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._rewardBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._rechargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
		this._logBtn.updateButtonImage(BaseButton.BTN_STATE2);
		let vo = <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS, { activeId: vo.aidAndCode });
		// this.showLogUI();
	}
	/**
	 * 排行UI
	 */
	private showLogUI(event: egret.Event) {
		if (!event.data.ret) {
			return;
		}
		let logs = event.data.data.data.logs;
		if (logs.length > 1) {
			logs.sort((a, b) => {
				return b[0] - a[0];
			})
		}
		if (this._rechargeContainer && (this.container.getChildByName("rechargeContainer"))) {
			this.container.removeChild(this._rechargeContainer);
		}
		if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
			this.container.removeChild(this._explainContainer);
		}
		if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
			this.container.removeChild(this._rewardContainer);
		}
		if (this._logContainer) {
			this._logScrollList.refreshData(logs, { aid: this.param.data.aid, code: this.param.data.code });
			this.addChildToContainer(this._logContainer);
			return;
		}
		this._logContainer = new BaseDisplayObjectContainer();
		this._logContainer.name = "logContainer";
		this.addChildToContainer(this._logContainer);

		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 624;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rewardBtn.y + this._rewardBtn.height + 5);
		this._logContainer.addChild(bg);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10);
		this._logScrollList = ComponentManager.getScrollList(AcThrowArrowLogScrollItem, logs, rect, { aid: this.param.data.aid, code: this.param.data.code });
		this._logScrollList.setPosition(bg.x + bg.width / 2 - this._logScrollList.width / 2, bg.y + bg.height / 2 - this._logScrollList.height / 2);
		this._logContainer.addChild(this._logScrollList);
		this._logScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));




	}



	protected getTitleStr() {
		return "acThrowArrowPopupView_title-" + this.param.data.code;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"countrywarrewardview", "rankinglist_rankbg", "countrywarservantnumbg", "countrywarservantnamebg"
		]);
	}
	protected getUiCode(): string {
		if (this.param.data.code == "2") {
			return "1";
		}
		if (this.param.data.code == "4") {
			return "3";
		}
		return this.param.data.code;
	}
	protected getShowHeight() {
		return 840;
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD, this.throwArrowgetRechargerwdHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS, this.showLogUI, this);




		this._explainBtn = null;
		this._rewardBtn = null;
		this._rechargeBtn = null;
		this._logBtn = null;
		this._isExplain = false;
		this._isRewarad = false;
		this._isServant = false;
		this._isRank = false;
		this._explainContainer = null;
		this._rewardContainer = null;
		this._rechargeContainer = null;
		this._logContainer = null;
		this._logScrollList = null;
		this._containerType = 0;
		super.dispose();
	}
}