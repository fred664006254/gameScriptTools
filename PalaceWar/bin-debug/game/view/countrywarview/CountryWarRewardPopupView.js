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
 * 	国战奖励相关
 * author 张朝阳
 * date 2018/11/15
 * @class CountryWarRewardPopupView
 */
var CountryWarRewardPopupView = (function (_super) {
    __extends(CountryWarRewardPopupView, _super);
    function CountryWarRewardPopupView() {
        var _this = _super.call(this) || this;
        /**规则说明按钮 */
        _this._explainBtn = null;
        /**奖励按钮 */
        _this._rewardBtn = null;
        /**点将按钮 */
        _this._servantBtn = null;
        /**排行按钮 */
        _this._rankBtn = null;
        _this._isExplain = false;
        _this._isRewarad = false;
        _this._isServant = false;
        _this._isRank = false;
        _this._explainContainer = null;
        _this._rewardContainer = null;
        _this._servantContainer = null;
        _this._rankContainer = null;
        //_rewardContainer 相关
        _this._rewardScrollList = null;
        _this._rewardMyTitle = null;
        _this._rewardTime = null;
        _this._rewardReceiveBtn = null;
        _this._rewardMailDesc = null;
        _this._receiveBM = null;
        _this._rwdType = 0;
        _this._rewardType = 0;
        //servantContainer  相关
        _this._servantScrollList = null;
        //rankContainer  相关
        _this._selfRankContainer = null;
        _this._serverRankContainer = null;
        _this._rankScrollList = null;
        _this._serverRankScrollList = null;
        _this._rankDpsList = [];
        _this._containerType = 0;
        _this._rewardTabBar = null;
        return _this;
    }
    CountryWarRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_GETZIDRANK, this.zidRankHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_GETREWAEDS, this.rewardHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_COUNTRYWAR_MODEL, this.refreashView, this);
    };
    /**
     * 刷新UI
     */
    CountryWarRewardPopupView.prototype.refreashView = function () {
        if (Api.countryWarVoApi.isShowRewardRedPoint()) {
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
        }
    };
    /**
     * 区服排行
     */
    CountryWarRewardPopupView.prototype.rewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            this.showRewardUI();
        }
    };
    /**
     * 区服排行
     */
    CountryWarRewardPopupView.prototype.zidRankHandle = function (event) {
        if (event.data.ret) {
            var zidRank = event.data.data.data.zidrank;
            this.showRankUI(zidRank);
        }
    };
    /**
     * 重置高度
     */
    CountryWarRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x -= 35 - GameData.popupviewOffsetX;
        var offest = 34;
        this._explainBtn = ComponentManager.getButton("countrywarrewardview_explainbtn", "", this.explainBtnClick, this);
        this._explainBtn.setPosition(this.viewBg.x + offest + GameData.popupviewOffsetX, 0);
        this.addChildToContainer(this._explainBtn);
        this._rewardBtn = ComponentManager.getButton("countrywarrewardview_rewardbtn", "", this.rewaradBtnClick, this);
        this._rewardBtn.setPosition(this._explainBtn.x + this._explainBtn.width + offest, this._explainBtn.y);
        this.addChildToContainer(this._rewardBtn);
        this._servantBtn = ComponentManager.getButton("countrywarrewardview_servantbtn", "", this.servantBtnClick, this);
        this._servantBtn.setPosition(this._rewardBtn.x + this._rewardBtn.width + offest, this._rewardBtn.y);
        this.addChildToContainer(this._servantBtn);
        this._rankBtn = ComponentManager.getButton("countrywarrewardview_rankbtn", "", this.rankBtnClick, this);
        this._rankBtn.setPosition(this._servantBtn.x + this._servantBtn.width + offest, this._servantBtn.y);
        this.addChildToContainer(this._rankBtn);
        if (this.param && this.param.data && this.param.data.type) {
            if (this.param.data.type == 4) {
                this.rankBtnClick();
            }
            if (this.param.data.type == 3) {
                this.servantBtnClick();
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
    CountryWarRewardPopupView.prototype.explainBtnClick = function () {
        this._containerType = 1;
        if (this._isExplain) {
            return;
        }
        this._isExplain = true;
        this._explainBtn.touchEnabled = false;
        this._rewardBtn.touchEnabled = true;
        this._servantBtn.touchEnabled = true;
        this._rankBtn.touchEnabled = true;
        this._isServant = false;
        this._isRank = false;
        this._isRewarad = false;
        this._explainBtn.setBtnBitMap("countrywarrewardview_explainbtn_light");
        this._rewardBtn.setBtnBitMap("countrywarrewardview_rewardbtn");
        this._servantBtn.setBtnBitMap("countrywarrewardview_servantbtn");
        this._rankBtn.setBtnBitMap("countrywarrewardview_rankbtn");
        this.showExplainUI();
    };
    /**
     * 显示规则说明的UI
     */
    CountryWarRewardPopupView.prototype.showExplainUI = function () {
        if (this._rankContainer && (this.container.getChildByName("rankContainer"))) {
            this.container.removeChild(this._rankContainer);
        }
        if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
            this.container.removeChild(this._rewardContainer);
        }
        if (this._servantContainer && (this.container.getChildByName("servantContainer"))) {
            this.container.removeChild(this._servantContainer);
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
        var level = LanguageManager.getlocal("officialTitle" + Config.CountrywarCfg.unlock);
        var txtDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardruleDesc1", [level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        txtDesc1.width = 500;
        txtDesc1.lineSpacing = 3;
        txtDesc1.setPosition(bg.width / 2 - txtDesc1.width / 2, 10);
        rectContainer.addChild(txtDesc1);
        var ruleBg = BaseLoadBitmap.create("countrywarrewardview_rulebg");
        ruleBg.width = 530;
        ruleBg.height = 194;
        ruleBg.setPosition(bg.width / 2 - ruleBg.width / 2, txtDesc1.y + txtDesc1.height);
        rectContainer.addChild(ruleBg);
        var txtDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardruleDesc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        txtDesc2.width = 500;
        txtDesc2.lineSpacing = 3;
        txtDesc2.height += txtDesc2.size;
        txtDesc2.setPosition(bg.width / 2 - txtDesc2.width / 2, ruleBg.y + ruleBg.height);
        rectContainer.addChild(txtDesc2);
    };
    /**
     * 奖励事件
     */
    CountryWarRewardPopupView.prototype.rewaradBtnClick = function () {
        this._containerType = 2;
        if (this._isRewarad) {
            return;
        }
        this._isRewarad = true;
        this._explainBtn.touchEnabled = true;
        this._rewardBtn.touchEnabled = false;
        this._servantBtn.touchEnabled = true;
        this._rankBtn.touchEnabled = true;
        this._isServant = false;
        this._isExplain = false;
        this._isRank = false;
        this._rewardBtn.setBtnBitMap("countrywarrewardview_rewardbtn_light");
        this._explainBtn.setBtnBitMap("countrywarrewardview_explainbtn");
        this._servantBtn.setBtnBitMap("countrywarrewardview_servantbtn");
        this._rankBtn.setBtnBitMap("countrywarrewardview_rankbtn");
        this.showRewardUI();
    };
    /**
     * 	奖励的UI
     */
    CountryWarRewardPopupView.prototype.showRewardUI = function () {
        if (this._rankContainer && (this.container.getChildByName("rankContainer"))) {
            this.container.removeChild(this._rankContainer);
        }
        if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
            // this.container.get
            this.container.removeChild(this._explainContainer);
        }
        if (this._servantContainer && (this.container.getChildByName("servantContainer"))) {
            this.container.removeChild(this._servantContainer);
        }
        if (this._rewardContainer) {
            this.addChildToContainer(this._rewardContainer);
            this.refreashRewardView(this._rewardType);
            return;
        }
        this._rwdType = 1;
        this._rewardContainer = new BaseDisplayObjectContainer();
        this._rewardContainer.name = "rewardContainer";
        this.addChildToContainer(this._rewardContainer);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 536;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rewardBtn.y + this._rewardBtn.height + 5);
        this._rewardContainer.addChild(bg);
        var titleBg = BaseBitmap.create("public_9_bg37");
        titleBg.width = bg.width;
        titleBg.height = 54;
        titleBg.setPosition(bg.x, bg.y);
        this._rewardContainer.addChild(titleBg);
        var buttomBg = BaseBitmap.create("public_9_bg1");
        buttomBg.width = bg.width;
        buttomBg.height = 82;
        buttomBg.setPosition(bg.x, bg.y + bg.height + 5);
        this._rewardContainer.addChild(buttomBg);
        var tabarArr = ["countryWarRewardTabBarReward1", "countryWarRewardTabBarReward2", "countryWarRewardTabBarReward3"];
        var rewardTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabarArr, this.rewardTabBarClick, this);
        rewardTabBar.setPosition(titleBg.x + 10, titleBg.y + titleBg.height - rewardTabBar.height);
        this._rewardContainer.addChild(rewardTabBar);
        this._rewardTabBar = rewardTabBar;
        var rewardData = [Config.CountrywarCfg.winnerReward, Config.CountrywarCfg.loserReward, Config.CountrywarCfg.lastReward];
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - titleBg.height - 10);
        this._rewardScrollList = ComponentManager.getScrollList(CountryWarRewardItem, rewardData, rect, { type: 1 });
        this._rewardScrollList.setPosition(titleBg.x, titleBg.y + titleBg.height + 3);
        this._rewardContainer.addChild(this._rewardScrollList);
        this._rewardMyTitle = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardMyTitleServer", [Api.mergeServerVoApi.getAfterMergeSeverName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardMyTitle.setPosition(buttomBg.x + 12, buttomBg.y + 12);
        this._rewardContainer.addChild(this._rewardMyTitle);
        var timeStr = App.DateUtil.getFormatBySecond(Api.countryWarVoApi.getCountTime(), 1);
        this._rewardTime = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardTime", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardTime.setPosition(buttomBg.x + 12, buttomBg.y + buttomBg.height - this._rewardTime.height - 12);
        this._rewardContainer.addChild(this._rewardTime);
        this._rewardReceiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.rewardReceiveBtnClick, this);
        this._rewardReceiveBtn.setPosition(buttomBg.x + buttomBg.width - this._rewardReceiveBtn.width - 12, buttomBg.y + buttomBg.height / 2 - this._rewardReceiveBtn.height / 2);
        this._rewardContainer.addChild(this._rewardReceiveBtn);
        var receiveScale = 0.6;
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.setScale(receiveScale);
        this._receiveBM.setPosition(this._rewardReceiveBtn.x + this._rewardReceiveBtn.width / 2 - this._receiveBM.width * receiveScale / 2, this._rewardReceiveBtn.y + this._rewardReceiveBtn.height / 2 - this._receiveBM.height * receiveScale / 2);
        this._rewardContainer.addChild(this._receiveBM);
        this._rewardMailDesc = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (this._rewardMailDesc.width > 320) {
            this._rewardMailDesc.width = 320;
        }
        this._rewardMailDesc.setPosition(buttomBg.x + buttomBg.width - this._rewardMailDesc.width - 12, buttomBg.y + buttomBg.height / 2 - this._rewardMailDesc.height / 2);
        this._rewardContainer.addChild(this._rewardMailDesc);
        this.refreashRewardView(this._rewardType);
    };
    /**奖励领取事件 */
    CountryWarRewardPopupView.prototype.rewardReceiveBtnClick = function () {
        this.request(NetRequestConst.REQUEST_COUNTRYWAY_GETREWAEDS, { rwdtype: this._rwdType });
    };
    /**刷新rewardUI */
    CountryWarRewardPopupView.prototype.refreashRewardView = function (type) {
        var curpeirodType = Api.countryWarVoApi.getCurpeirod();
        this._rewardTabBar.removeRedPoint(0);
        this._rewardTabBar.removeRedPoint(1);
        if (curpeirodType == 1 || curpeirodType == 2) {
            if (type == 0) {
                this._rewardReceiveBtn.setVisible(true);
                this._rewardReceiveBtn.setEnable(false);
                this._receiveBM.setVisible(false);
                this._rewardMailDesc.setVisible(false);
            }
            else if (type == 1) {
                this._rewardReceiveBtn.setVisible(true);
                this._rewardReceiveBtn.setEnable(false);
                this._receiveBM.setVisible(false);
                this._rewardMailDesc.setVisible(false);
            }
            else if (type == 2) {
                this._rewardReceiveBtn.setVisible(false);
                this._receiveBM.setVisible(false);
                this._rewardMailDesc.setVisible(true);
            }
        }
        if (curpeirodType == 1) {
            this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardMyTitleServer", [LanguageManager.getlocal("countryWarRewardType1")]);
        }
        else if (curpeirodType == 2) {
            this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardMyTitleServer", [LanguageManager.getlocal("countryWarRewardType2")]);
        }
        else if (curpeirodType == 3) {
            if (type == 0) {
                if (Api.countryWarVoApi.getIsWin()) {
                    this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardMyTitleServer", [LanguageManager.getlocal("countryWarRewardType3")]);
                }
                else {
                    this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardMyTitleServer", [LanguageManager.getlocal("countryWarRewardType4")]);
                }
                if (Api.countryWarVoApi.getIslunkong()) {
                    this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardMyTitleServer", [LanguageManager.getlocal("countryWarRewardType9")]);
                }
                if (Api.countryWarVoApi.isReceiveZidReward()) {
                    this._receiveBM.setVisible(true);
                    App.CommonUtil.removeIconFromBDOC(this._rewardReceiveBtn);
                    this._rewardReceiveBtn.setVisible(false);
                }
                else {
                    this._receiveBM.setVisible(false);
                    this._rewardReceiveBtn.setVisible(true);
                    if (Api.countryWarVoApi.getIslunkong()) {
                        if (Api.countryWarVoApi.isPlayerSerVantLevel()) {
                            this._rewardReceiveBtn.setEnable(true);
                            this._rewardReceiveBtn.setText(LanguageManager.getlocal("taskCollect"), false);
                            App.CommonUtil.addIconToBDOC(this._rewardReceiveBtn);
                        }
                        else {
                            this._rewardReceiveBtn.setEnable(false);
                            this._rewardReceiveBtn.setText(LanguageManager.getlocal("countryWarRewardType7"), false);
                            App.CommonUtil.removeIconFromBDOC(this._rewardReceiveBtn);
                        }
                    }
                    else {
                        if (Api.countryWarVoApi.isFightSuccess()) {
                            this._rewardReceiveBtn.setEnable(true);
                            this._rewardReceiveBtn.setText(LanguageManager.getlocal("taskCollect"), false);
                            App.CommonUtil.addIconToBDOC(this._rewardReceiveBtn);
                        }
                        else {
                            this._rewardReceiveBtn.setEnable(false);
                            this._rewardReceiveBtn.setText(LanguageManager.getlocal("countryWarRewardType7"), false);
                            App.CommonUtil.removeIconFromBDOC(this._rewardReceiveBtn);
                        }
                    }
                }
                this._rewardMailDesc.setVisible(false);
            }
            else if (type == 1) {
                var cityNum = Api.countryWarVoApi.getWinNum();
                this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardMyTitleServer", [LanguageManager.getlocal("countryWarRewardType5", [String(cityNum)])]);
                if (Api.countryWarVoApi.isRankReward()) {
                    this._receiveBM.setVisible(true);
                    App.CommonUtil.removeIconFromBDOC(this._rewardReceiveBtn);
                    this._rewardReceiveBtn.setVisible(false);
                }
                else {
                    this._receiveBM.setVisible(false);
                    this._rewardReceiveBtn.setVisible(true);
                    if (Api.countryWarVoApi.getIslunkong()) {
                        this._rewardReceiveBtn.setEnable(false);
                        this._rewardReceiveBtn.setText(LanguageManager.getlocal("countryWarRewardType7"), false);
                        App.CommonUtil.removeIconFromBDOC(this._rewardReceiveBtn);
                    }
                    else {
                        if (Api.countryWarVoApi.isFightSuccess()) {
                            this._rewardReceiveBtn.setEnable(true);
                            this._rewardReceiveBtn.setText(LanguageManager.getlocal("taskCollect"), false);
                            App.CommonUtil.addIconToBDOC(this._rewardReceiveBtn);
                        }
                        else {
                            this._rewardReceiveBtn.setEnable(false);
                            this._rewardReceiveBtn.setText(LanguageManager.getlocal("countryWarRewardType7"), false);
                            App.CommonUtil.removeIconFromBDOC(this._rewardReceiveBtn);
                        }
                    }
                }
                this._rewardMailDesc.setVisible(false);
            }
            else if (type == 2) {
                this._receiveBM.setVisible(false);
                this._rewardMyTitle.text = LanguageManager.getlocal("countryWarRewardRankRank", [this.getMyRank()]);
                this._rewardReceiveBtn.setVisible(false);
                this._rewardMailDesc.setVisible(true);
            }
            if (Api.countryWarVoApi.getIslunkong()) {
                if (!Api.countryWarVoApi.isReceiveZidReward() && Api.countryWarVoApi.isPlayerSerVantLevel()) {
                    this._rewardTabBar.addRedPoint(0);
                }
            }
            else {
                if (Api.countryWarVoApi.isFightSuccess() && Api.countryWarVoApi.isReceiveZidReward() == false) {
                    this._rewardTabBar.addRedPoint(0);
                }
                if (Api.countryWarVoApi.isFightSuccess() && Api.countryWarVoApi.isRankReward() == false) {
                    this._rewardTabBar.addRedPoint(1);
                }
            }
        }
        this.tick();
    };
    /**Tab 事件 */
    CountryWarRewardPopupView.prototype.rewardTabBarClick = function (data) {
        if (data.index == 0) {
            var rewardData = [Config.CountrywarCfg.winnerReward, Config.CountrywarCfg.loserReward, Config.CountrywarCfg.lastReward];
            this._rewardScrollList.refreshData(rewardData, { type: 1 });
            this._rwdType = 1;
        }
        else if (data.index == 1) {
            var rewardData = Config.CountrywarCfg.getCityReward();
            this._rewardScrollList.refreshData(rewardData, { type: 2 });
            this._rwdType = 2;
        }
        else if (data.index == 2) {
            var rewardData = Config.CountrywarCfg.getRankListCfg();
            this._rewardScrollList.refreshData(rewardData, { type: 3 });
        }
        this._rewardType = data.index;
        this.refreashRewardView(this._rewardType);
    };
    /**
     * 点将事件
     */
    CountryWarRewardPopupView.prototype.servantBtnClick = function () {
        this._containerType = 3;
        if (this._isServant) {
            return;
        }
        this._isServant = true;
        this._explainBtn.touchEnabled = true;
        this._rewardBtn.touchEnabled = true;
        this._servantBtn.touchEnabled = false;
        this._rankBtn.touchEnabled = true;
        this._isExplain = false;
        this._isRank = false;
        this._isRewarad = false;
        this._servantBtn.setBtnBitMap("countrywarrewardview_servantbtn_light");
        this._explainBtn.setBtnBitMap("countrywarrewardview_explainbtn");
        this._rewardBtn.setBtnBitMap("countrywarrewardview_rewardbtn");
        this._rankBtn.setBtnBitMap("countrywarrewardview_rankbtn");
        this.showServantUI();
    };
    /**
     * 点将UI
     */
    CountryWarRewardPopupView.prototype.showServantUI = function () {
        var servantInfoCfgList = Api.countryWarVoApi.getOneMonthCfg();
        if (this._rankContainer && (this.container.getChildByName("rankContainer"))) {
            this.container.removeChild(this._rankContainer);
        }
        if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
            this.container.removeChild(this._explainContainer);
        }
        if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
            this.container.removeChild(this._rewardContainer);
        }
        if (this._servantContainer) {
            this._servantScrollList.refreshData(servantInfoCfgList);
            this.addChildToContainer(this._servantContainer);
            return;
        }
        this._servantContainer = new BaseDisplayObjectContainer();
        this._servantContainer.name = "servantContainer";
        this.addChildToContainer(this._servantContainer);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._servantBtn.y + this._servantBtn.height + 5);
        this._servantContainer.addChild(bg);
        var topTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServantTopTxt"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topTxt.width = 500;
        topTxt.lineSpacing = 3;
        topTxt.setPosition(bg.x + 15, bg.y + 10);
        this._servantContainer.addChild(topTxt);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - topTxt.height - 20);
        this._servantScrollList = ComponentManager.getScrollList(CountryWarRewardServantItem, servantInfoCfgList, rect);
        this._servantScrollList.setPosition(bg.x, topTxt.y + topTxt.height + 10);
        this._servantContainer.addChild(this._servantScrollList);
    };
    /**
     * 排行事件
     */
    CountryWarRewardPopupView.prototype.rankBtnClick = function () {
        this._containerType = 4;
        if (this._isRank) {
            return;
        }
        this._isRank = true;
        this._explainBtn.touchEnabled = true;
        this._rewardBtn.touchEnabled = true;
        this._servantBtn.touchEnabled = true;
        this._rankBtn.touchEnabled = false;
        this._isServant = false;
        this._isExplain = false;
        this._isRewarad = false;
        this._rankBtn.setBtnBitMap("countrywarrewardview_rankbtn_light");
        this._explainBtn.setBtnBitMap("countrywarrewardview_explainbtn");
        this._rewardBtn.setBtnBitMap("countrywarrewardview_rewardbtn");
        this._servantBtn.setBtnBitMap("countrywarrewardview_servantbtn");
        this.request(NetRequestConst.REQUEST_COUNTRYWAY_GETZIDRANK, {});
        // this.showRankUI();
    };
    /**
     * 排行UI
     */
    CountryWarRewardPopupView.prototype.showRankUI = function (zidRank) {
        if (this._servantContainer && (this.container.getChildByName("servantContainer"))) {
            this.container.removeChild(this._servantContainer);
        }
        if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
            this.container.removeChild(this._explainContainer);
        }
        if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
            this.container.removeChild(this._rewardContainer);
        }
        if (this._rankContainer) {
            this._rankScrollList.refreshData(this._rankDpsList);
            this._serverRankScrollList.refreshData(zidRank);
            this.addChildToContainer(this._rankContainer);
            return;
        }
        this._rankContainer = new BaseDisplayObjectContainer();
        this._rankContainer.name = "rankContainer";
        this.addChildToContainer(this._rankContainer);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 536;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._rewardBtn.y + this._rewardBtn.height + 5);
        this._rankContainer.addChild(bg);
        var buttomBg = BaseBitmap.create("public_9_bg1");
        buttomBg.width = bg.width;
        buttomBg.height = 82;
        buttomBg.setPosition(bg.x, bg.y + bg.height + 5);
        this._rankContainer.addChild(buttomBg);
        var tabbarBg = BaseBitmap.create("public_9_bg52");
        tabbarBg.width = 530;
        tabbarBg.height = 58;
        tabbarBg.setPosition(bg.x, bg.y);
        this._rankContainer.addChild(tabbarBg);
        var tabarArr = ["countryWarRewardTabBarRank1", "countryWarRewardTabBarRank2"];
        var rewardTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabarArr, this.rankTabBarClick, this);
        rewardTabBar.setPosition(bg.x + 10, bg.y + 10);
        this._rankContainer.addChild(rewardTabBar);
        //_selfRankContainer 相关
        this._selfRankContainer = new BaseDisplayObjectContainer();
        this._rankContainer.addChild(this._selfRankContainer);
        var topbg = BaseLoadBitmap.create("countrywarrewardview_rankitembg");
        topbg.width = 530;
        topbg.height = 37;
        topbg.setPosition(bg.x, tabbarBg.y + tabbarBg.height);
        this._selfRankContainer.addChild(topbg);
        var topTxtTime = Api.countryWarVoApi.acTimeAndHour(false);
        var topTxtpk1 = Api.mergeServerVoApi.getAfterMergeSeverName();
        var topTxtpk2 = Api.mergeServerVoApi.getSeverName(Api.countryWarVoApi.getEnermyZid());
        var topTxtStr = "";
        if (Api.countryWarVoApi.getIslunkong()) {
            topTxtStr = LanguageManager.getlocal("countryWarRewardRankTopTip2", [topTxtTime, topTxtpk1]);
        }
        else {
            topTxtStr = LanguageManager.getlocal("countryWarRewardRankTopTip", [topTxtTime, topTxtpk1, topTxtpk2]);
        }
        var topTxt = ComponentManager.getTextField(topTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        topTxt.setPosition(topbg.x + topbg.width / 2 - topTxt.width / 2, topbg.y + topbg.height / 2 - topTxt.height / 2);
        this._selfRankContainer.addChild(topTxt);
        var titleBg = BaseBitmap.create("public_9_bg53");
        titleBg.width = 530;
        titleBg.height = 35;
        titleBg.setPosition(topbg.x, topbg.y + topbg.height);
        this._selfRankContainer.addChild(titleBg);
        var buttomDescBg = BaseBitmap.create("public_9_bg52");
        buttomDescBg.width = 530;
        buttomDescBg.height = 60;
        buttomDescBg.anchorOffsetX = buttomDescBg.width / 2;
        buttomDescBg.anchorOffsetY = buttomDescBg.height / 2;
        buttomDescBg.rotation = 180;
        buttomDescBg.setPosition(bg.x + buttomDescBg.width / 2, bg.y + bg.height - buttomDescBg.height / 2);
        this._selfRankContainer.addChild(buttomDescBg);
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTipTxt.width = 500;
        buttomTipTxt.lineSpacing = 3;
        buttomTipTxt.setPosition(buttomDescBg.x - buttomTipTxt.width / 2, buttomDescBg.y - buttomTipTxt.height / 2);
        this._selfRankContainer.addChild(buttomTipTxt);
        var rankTitle1 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTitle1.setPosition(bg.x + 40 - rankTitle1.width / 2, titleBg.y + titleBg.height / 2 - rankTitle1.height / 2);
        this._selfRankContainer.addChild(rankTitle1);
        var nickNameTitle1 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardNickNameTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickNameTitle1.setPosition(bg.x + 180 - nickNameTitle1.width / 2, titleBg.y + titleBg.height / 2 - nickNameTitle1.height / 2);
        this._selfRankContainer.addChild(nickNameTitle1);
        var ServerTitle1 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServerTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        ServerTitle1.setPosition(bg.x + 335 - ServerTitle1.width / 2, titleBg.y + titleBg.height / 2 - ServerTitle1.height / 2);
        this._selfRankContainer.addChild(ServerTitle1);
        var powerTitle1 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankPowerTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        powerTitle1.setPosition(bg.x + 465 - powerTitle1.width / 2, titleBg.y + titleBg.height / 2 - powerTitle1.height / 2);
        this._selfRankContainer.addChild(powerTitle1);
        var rect1 = new egret.Rectangle(0, 0, bg.width, buttomDescBg.y - titleBg.y - titleBg.height - buttomDescBg.height / 2);
        this._rankScrollList = ComponentManager.getScrollList(CountryWarRewardRankItem, this._rankDpsList, rect1);
        this._rankScrollList.setPosition(bg.x, titleBg.y + titleBg.height);
        this._selfRankContainer.addChild(this._rankScrollList);
        this._rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        //_serverRankContainer 相关
        this._serverRankContainer = new BaseDisplayObjectContainer();
        this._rankContainer.addChild(this._serverRankContainer);
        var titleBg2 = BaseBitmap.create("public_9_bg53");
        titleBg2.width = 530;
        titleBg2.height = 35;
        titleBg2.setPosition(tabbarBg.x, tabbarBg.y + tabbarBg.height);
        this._serverRankContainer.addChild(titleBg2);
        var buttomDescBg2 = BaseBitmap.create("public_9_bg52");
        buttomDescBg2.width = 530;
        buttomDescBg2.height = 86;
        buttomDescBg2.anchorOffsetX = buttomDescBg2.width / 2;
        buttomDescBg2.anchorOffsetY = buttomDescBg2.height / 2;
        buttomDescBg2.rotation = 180;
        buttomDescBg2.setPosition(bg.x + buttomDescBg2.width / 2, bg.y + bg.height - buttomDescBg2.height / 2);
        this._serverRankContainer.addChild(buttomDescBg2);
        var pointCfg = Config.CountrywarCfg.getPoint();
        var buttomTipTxt2Str = LanguageManager.getlocal("countryWarRewardServerRankTip", [String(pointCfg[5].credit), String(pointCfg[0].credit), String(pointCfg[4].credit), String(pointCfg[1].credit), String(pointCfg[3].credit), String(pointCfg[2].credit)]);
        var buttomTipTxt2 = ComponentManager.getTextField(buttomTipTxt2Str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTipTxt2.width = 500;
        buttomTipTxt2.lineSpacing = 3;
        buttomTipTxt2.setPosition(buttomDescBg2.x - buttomTipTxt2.width / 2, buttomDescBg2.y - buttomTipTxt2.height / 2);
        this._serverRankContainer.addChild(buttomTipTxt2);
        var rankTitle2 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTitle2.setPosition(bg.x + 75 - rankTitle2.width / 2, titleBg2.y + titleBg2.height / 2 - rankTitle2.height / 2);
        this._serverRankContainer.addChild(rankTitle2);
        var serverTitle2 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardServerTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverTitle2.setPosition(bg.x + 260 - serverTitle2.width / 2, titleBg2.y + titleBg2.height / 2 - serverTitle2.height / 2);
        this._serverRankContainer.addChild(serverTitle2);
        var scoreTitle2 = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardScoreTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTitle2.setPosition(bg.x + 430 - scoreTitle2.width / 2, titleBg2.y + titleBg2.height / 2 - scoreTitle2.height / 2);
        this._serverRankContainer.addChild(scoreTitle2);
        var rect2 = new egret.Rectangle(0, 0, bg.width, buttomDescBg2.y - titleBg2.y - titleBg2.height - buttomDescBg2.height / 2);
        this._serverRankScrollList = ComponentManager.getScrollList(CountryWarRewardServerRankItem, zidRank, rect2);
        this._serverRankScrollList.setPosition(bg.x, titleBg2.y + titleBg2.height);
        this._serverRankContainer.addChild(this._serverRankScrollList);
        this._serverRankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._serverRankContainer.setVisible(false);
        //下部相关
        var myName = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankNickName", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        myName.setPosition(buttomBg.x + 12, buttomBg.y + 12);
        this._rankContainer.addChild(myName);
        var myRank = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankRank", [this.getMyRank()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRank.setPosition(myName.x, buttomBg.y + buttomBg.height - myRank.height - 12);
        this._rankContainer.addChild(myRank);
        var myServer = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankServant", [Api.mergeServerVoApi.getAfterMergeSeverName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        myServer.setPosition(buttomDescBg.x, myName.y);
        this._rankContainer.addChild(myServer);
        var myPower = ComponentManager.getTextField(LanguageManager.getlocal("countryWarRewardRankPower", [this.getMyPower()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        myPower.setPosition(myServer.x, myRank.y);
        this._rankContainer.addChild(myPower);
    };
    CountryWarRewardPopupView.prototype.rankTabBarClick = function (data) {
        if (data.index == 0) {
            this._selfRankContainer.setVisible(true);
            this._serverRankContainer.setVisible(false);
        }
        else if (data.index == 1) {
            this._selfRankContainer.setVisible(false);
            this._serverRankContainer.setVisible(true);
        }
    };
    CountryWarRewardPopupView.prototype.tick = function () {
        if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
            var curpeirodType = Api.countryWarVoApi.getCurpeirod();
            var timeStr = "";
            if (curpeirodType == 1) {
                timeStr = LanguageManager.getlocal("countryWarRewardType1");
            }
            else if (curpeirodType == 2) {
                timeStr = LanguageManager.getlocal("countryWarRewardType2");
            }
            else if (curpeirodType == 3) {
                timeStr = App.DateUtil.getFormatBySecond(Api.countryWarVoApi.getCountTime(), 1);
            }
            this._rewardTime.text = LanguageManager.getlocal("countryWarRewardTime", [timeStr]);
        }
    };
    CountryWarRewardPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_COUNTRYWAY_GETDPSRANK, requestData: {} };
    };
    CountryWarRewardPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.dpsrank) {
                this._rankDpsList = data.data.data.dpsrank;
            }
        }
    };
    /**
     * 自己的排名
     */
    CountryWarRewardPopupView.prototype.getMyRank = function () {
        for (var i = 0; i < this._rankDpsList.length; i++) {
            var rankDps = this._rankDpsList[i];
            if (rankDps.uid == Api.playerVoApi.getPlayerID()) {
                return String(i + 1);
            }
        }
        return LanguageManager.getlocal("countryWarRewardType6");
    };
    /**
     * 自己的权势
     */
    CountryWarRewardPopupView.prototype.getMyPower = function () {
        for (var i = 0; i < this._rankDpsList.length; i++) {
            var rankDps = this._rankDpsList[i];
            if (rankDps.uid == Api.playerVoApi.getPlayerID()) {
                return App.StringUtil.changeIntToText(rankDps.dps);
            }
        }
        if (Api.countryWarVoApi.isFightSuccess()) {
            return LanguageManager.getlocal("countryWarRewardType6");
        }
        return LanguageManager.getlocal("countryWarRewardType8");
    };
    CountryWarRewardPopupView.prototype.getTitleStr = function () {
        return "countryWarRewardTitle";
    };
    CountryWarRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "countrywarrewardview", "rankinglist_rankbg", "countrywarservantnumbg", "countrywarservantnamebg"
        ]);
    };
    CountryWarRewardPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    CountryWarRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_GETZIDRANK, this.zidRankHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_GETREWAEDS, this.rewardHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_COUNTRYWAR_MODEL, this.refreashView, this);
        this._explainBtn = null;
        this._rewardBtn = null;
        this._servantBtn = null;
        this._rankBtn = null;
        this._rewardType = 0;
        this._isExplain = false;
        this._isRewarad = false;
        this._isServant = false;
        this._isRank = false;
        this._explainContainer = null;
        this._rewardContainer = null;
        this._servantContainer = null;
        this._rankContainer = null;
        this._rewardScrollList = null;
        this._rewardMyTitle = null;
        this._rewardTime = null;
        this._rewardReceiveBtn = null;
        this._rewardMailDesc = null;
        this._selfRankContainer = null;
        this._serverRankContainer = null;
        this._rankScrollList = null;
        this._serverRankScrollList = null;
        this._rankDpsList = [];
        this._rwdType = 0;
        this._receiveBM = null;
        this._containerType = 0;
        this._rewardTabBar = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarRewardPopupView;
}(PopupView));
__reflect(CountryWarRewardPopupView.prototype, "CountryWarRewardPopupView");
//# sourceMappingURL=CountryWarRewardPopupView.js.map