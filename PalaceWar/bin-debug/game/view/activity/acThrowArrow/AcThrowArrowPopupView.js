var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 	投壶活动奖励相关
 * author 张朝阳
 * date 2019/4/3
 * @class AcThrowArrowPopupView
 */
var AcThrowArrowPopupView = (function (_super) {
    __extends(AcThrowArrowPopupView, _super);
    function AcThrowArrowPopupView() {
        var _this = _super.call(this) || this;
        /**规则说明按钮 */
        _this._explainBtn = null;
        /**奖励池子按钮 */
        _this._rewardBtn = null;
        /**充值奖励按钮 */
        _this._rechargeBtn = null;
        /**按钮 */
        _this._logBtn = null;
        /**玩法Container */
        _this._explainContainer = null;
        /**奖励Container */
        _this._rewardContainer = null;
        /**充值Container */
        _this._rechargeContainer = null;
        /**记录Container */
        _this._logContainer = null;
        /**充值奖励ScrollList */
        _this._rechargeScrollList = null;
        /**日志ScrollList */
        _this._logScrollList = null;
        _this._isExplain = false;
        _this._isRewarad = false;
        _this._isServant = false;
        _this._isRank = false;
        _this._containerType = 0;
        return _this;
    }
    AcThrowArrowPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD, this.throwArrowgetRechargerwdHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS, this.showLogUI, this);
    };
    /**
     * 刷新UI
     */
    AcThrowArrowPopupView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        if (vo.checkRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }
        if (this._isServant) {
            this.showRechargeUI();
        }
    };
    /**充值奖励返回 */
    AcThrowArrowPopupView.prototype.throwArrowgetRechargerwdHandle = function (event) {
        if (event.data.ret) {
            var specialGift = event.data.data.data.specialGift;
            var rewards = "1006_0_" + specialGift + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
    };
    /**
     * 重置高度
     */
    AcThrowArrowPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x -= 35;
        this.container.x += GameData.popupviewOffsetX;
        var offest = 34;
        this._explainBtn = ComponentManager.getButton("acthrowarrowview_descbtn-" + this.getUiCode(), "", this.explainBtnClick, this);
        this._explainBtn.setPosition(this.viewBg.x + offest + GameData.popupviewOffsetX, 0);
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
    };
    /**
     * 规则说明事件
     */
    AcThrowArrowPopupView.prototype.explainBtnClick = function () {
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
    };
    /**
     * 显示规则说明的UI
     */
    AcThrowArrowPopupView.prototype.showExplainUI = function () {
        if (this._logContainer && (this.container.getChildByName("logContainer"))) {
            this.container.removeChild(this._logContainer);
        }
        if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
            this.container.removeChild(this._rewardContainer);
        }
        if (this._rechargeContainer && (this.container.getChildByName("rechargeContainer"))) {
            this.container.removeChild(this._rechargeContainer);
        }
        if (this._explainContainer) {
            this.addChildToContainer(this._explainContainer);
            return;
        }
        this._explainContainer = new BaseDisplayObjectContainer();
        this._explainContainer.name = "explainContainer";
        this.addChildToContainer(this._explainContainer);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._explainBtn.y + this._explainBtn.height + 5);
        this._explainContainer.addChild(bg);
        var rectContainer = new BaseDisplayObjectContainer();
        this._explainContainer.addChild(rectContainer);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        var scrollView = ComponentManager.getScrollView(rectContainer, rect);
        scrollView.bounces = false;
        scrollView.setPosition(bg.x, bg.y + 5);
        this._explainContainer.addChild(scrollView);
        var txtDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_ExplainDesc1-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        txtDesc1.width = 500;
        txtDesc1.lineSpacing = 10;
        txtDesc1.setPosition(bg.width / 2 - txtDesc1.width / 2, 10);
        rectContainer.addChild(txtDesc1);
        var ruleBg = BaseLoadBitmap.create("acthrowarrowview_explain-" + this.getUiCode());
        ruleBg.width = 520;
        ruleBg.height = 183;
        ruleBg.setPosition(bg.width / 2 - ruleBg.width / 2, txtDesc1.y + txtDesc1.height);
        rectContainer.addChild(ruleBg);
        var txtDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_ExplainDesc2-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        txtDesc2.width = 500;
        txtDesc2.lineSpacing = 10;
        txtDesc2.height += txtDesc2.size;
        txtDesc2.setPosition(bg.width / 2 - txtDesc2.width / 2, ruleBg.y + ruleBg.height);
        rectContainer.addChild(txtDesc2);
    };
    /**
     * 奖励事件
     */
    AcThrowArrowPopupView.prototype.rewaradBtnClick = function () {
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
    };
    /**
     * 	奖励的UI
     */
    AcThrowArrowPopupView.prototype.showRewardUI = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        if (this._logContainer && (this.container.getChildByName("logContainer"))) {
            this.container.removeChild(this._logContainer);
        }
        if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
            this.container.removeChild(this._explainContainer);
        }
        if (this._rechargeContainer && (this.container.getChildByName("rechargeContainer"))) {
            this.container.removeChild(this._rechargeContainer);
        }
        if (this._rewardContainer) {
            this.addChildToContainer(this._rewardContainer);
            return;
        }
        this._rewardContainer = new BaseDisplayObjectContainer();
        this._rewardContainer.name = "rewardContainer";
        this.addChildToContainer(this._rewardContainer);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rewardBtn.y + this._rewardBtn.height + 5);
        this._rewardContainer.addChild(bg);
        var titleBg = BaseBitmap.create("fourpeople_bottom");
        this._rewardContainer.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_rewardTopTitle-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleBg.width = titleTF.width + 60;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this._rewardContainer.addChild(titleTF);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - titleBg.height - 30);
        var scrollList = ComponentManager.getScrollList(AcThrowArrowRewardScrollItem, cfg.throwArrowPoolListItemCfgList, rect, { aid: this.param.data.aid, code: this.param.data.code });
        scrollList.setPosition(bg.x + bg.width / 2 - scrollList.width / 2, titleBg.y + titleBg.height + 5);
        scrollList.bounces = false;
        this._rewardContainer.addChild(scrollList);
    };
    /**
     * 充值奖励
     */
    AcThrowArrowPopupView.prototype.rechargeBtnClick = function () {
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
    };
    /**
     * 充值奖励UI
     */
    AcThrowArrowPopupView.prototype.showRechargeUI = function () {
        // let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var list = vo.getSortRechargeCfg();
        list.sort(function (a, b) { return a.sortId - b.sortId; });
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
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rechargeBtn.y + this._rechargeBtn.height + 5);
        this._rechargeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
        this._rechargeScrollList = ComponentManager.getScrollList(AcThrowArrowRechargeScrollItem, list, rect, { aid: this.param.data.aid, code: this.param.data.code });
        this._rechargeScrollList.setPosition(bg.x + 5, bg.y + 10);
        this._rechargeScrollList.bounces = false;
        this._rechargeContainer.addChild(this._rechargeScrollList);
    };
    /**
     * 排行事件
     */
    AcThrowArrowPopupView.prototype.rankBtnClick = function () {
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
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS, { activeId: vo.aidAndCode });
        // this.showLogUI();
    };
    /**
     * 排行UI
     */
    AcThrowArrowPopupView.prototype.showLogUI = function (event) {
        if (!event.data.ret) {
            return;
        }
        var logs = event.data.data.data.logs;
        if (logs.length > 1) {
            logs.sort(function (a, b) {
                return b[0] - a[0];
            });
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
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rewardBtn.y + this._rewardBtn.height + 5);
        this._logContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10);
        this._logScrollList = ComponentManager.getScrollList(AcThrowArrowLogScrollItem, logs, rect, { aid: this.param.data.aid, code: this.param.data.code });
        this._logScrollList.setPosition(bg.x + bg.width / 2 - this._logScrollList.width / 2, bg.y + bg.height / 2 - this._logScrollList.height / 2);
        this._logContainer.addChild(this._logScrollList);
        this._logScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcThrowArrowPopupView.prototype.getTitleStr = function () {
        return "acThrowArrowPopupView_title-" + this.param.data.code;
    };
    AcThrowArrowPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "countrywarrewardview", "rankinglist_rankbg", "countrywarservantnumbg", "countrywarservantnamebg"
        ]);
    };
    AcThrowArrowPopupView.prototype.getUiCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        if (this.param.data.code == "4") {
            return "3";
        }
        return this.param.data.code;
    };
    AcThrowArrowPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    AcThrowArrowPopupView.prototype.dispose = function () {
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
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowPopupView;
}(PopupView));
__reflect(AcThrowArrowPopupView.prototype, "AcThrowArrowPopupView");
//# sourceMappingURL=AcThrowArrowPopupView.js.map