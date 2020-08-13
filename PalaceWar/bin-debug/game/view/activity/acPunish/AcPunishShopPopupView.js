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
 * 泰拳活动 商店
 * author ycg
 * date 2019.9.25
 * @class AcPunishShopPopupView
 */
var AcPunishShopPopupView = (function (_super) {
    __extends(AcPunishShopPopupView, _super);
    function AcPunishShopPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._shopTopContainer = null;
        _this._storeTopContainer = null;
        _this._scoreTopContainer = null;
        _this._bottomTip = null;
        _this._btnIndex = 0;
        _this._bg = null;
        return _this;
    }
    AcPunishShopPopupView.prototype.getOffsetX = function () {
        return 23;
    };
    AcPunishShopPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, this.refreshShop, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, this.refreshExchange, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY, this.refreshStoreUse, this);
        var tabName = ["acPunishShopTabName-" + this.getTypeCode(), "acPunishStoreTabName-" + this.getTypeCode(), "acPunishExPopupViewTitle"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 35 + GameData.popupviewOffsetX - 6;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        bg.height = 700;
        bg.setPosition(20 + GameData.popupviewOffsetX - 6, 52);
        this.addChildToContainer(bg);
        this._bg = bg;
        var titleBg = BaseBitmap.create("countrywarrewardview_itembg");
        titleBg.width = bg.width;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 3);
        this.addChildToContainer(titleBg);
        //商店顶部
        var shopTopContainer = new BaseDisplayObjectContainer();
        shopTopContainer.width = bg.width;
        shopTopContainer.height = titleBg.height;
        shopTopContainer.setPosition(titleBg.x, titleBg.y);
        this.addChildToContainer(shopTopContainer);
        this._shopTopContainer = shopTopContainer;
        var shopTopIcon = BaseBitmap.create("public_icon1");
        shopTopIcon.name = "shopTopIcon";
        shopTopIcon.setScale(0.8);
        shopTopIcon.y = shopTopContainer.height / 2 - shopTopIcon.height / 2 * shopTopIcon.scaleY;
        shopTopContainer.addChild(shopTopIcon);
        var shopNum = ComponentManager.getTextField("" + Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        shopTopIcon.x = shopTopContainer.width / 2 - (shopTopIcon.width * shopTopIcon.scaleX + shopNum.width) / 2;
        shopNum.setPosition(shopTopIcon.x + shopTopIcon.width * shopTopIcon.scaleX, shopTopContainer.height / 2 - shopNum.height / 2);
        shopNum.name = "shopNum";
        shopTopContainer.addChild(shopNum);
        //仓库顶部
        var storeTopContainer = new BaseDisplayObjectContainer();
        storeTopContainer.width = bg.width;
        storeTopContainer.height = titleBg.height;
        storeTopContainer.setPosition(titleBg.x, titleBg.y);
        this.addChildToContainer(storeTopContainer);
        this._storeTopContainer = storeTopContainer;
        storeTopContainer.visible = false;
        var storeNumInfo = ComponentManager.getTextField(LanguageManager.getlocal("acPunishCurrEnergy-" + this.getTypeCode(), ["" + this.vo.energy]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        storeNumInfo.name = "storeNumInfo";
        storeNumInfo.y = storeTopContainer.height / 2 - storeNumInfo.height / 2;
        storeTopContainer.addChild(storeNumInfo);
        //积分顶部
        var scoreTopContainer = new BaseDisplayObjectContainer();
        scoreTopContainer.width = bg.width;
        scoreTopContainer.height = titleBg.height;
        scoreTopContainer.setPosition(titleBg.x, titleBg.y);
        this.addChildToContainer(scoreTopContainer);
        this._scoreTopContainer = scoreTopContainer;
        scoreTopContainer.visible = false;
        var scoreNumInfo = ComponentManager.getTextField(LanguageManager.getlocal("acPunishCurrScore-" + this.getTypeCode(), ["" + this.vo.score]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        scoreNumInfo.name = "scoreNumInfo";
        scoreNumInfo.y = scoreTopContainer.height / 2 - scoreNumInfo.height / 2;
        scoreTopContainer.addChild(scoreNumInfo);
        var dataList = [];
        var dataCfg = this.cfg.punishList;
        for (var key in dataCfg) {
            var currData = { id: Number(key), data: dataCfg[key] };
            dataList.push(currData);
        }
        dataList.sort(function (a, b) { return a.id - b.id; });
        var rect = new egret.Rectangle(0, 0, 530, bg.height - titleBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcPunishShopScrollItem, dataList, rect, { aid: this.aid, code: this.code, type: 0 });
        scrollList.setPosition(bg.x + 5, bg.y + titleBg.height + 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        this.refreshTopView();
        //底部提示 
        var bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("acPunishShopBottomTip-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomTip.setPosition(bg.x + bg.width / 2 - bottomTip.width / 2, bg.y + bg.height + 60);
        this.addChildToContainer(bottomTip);
        this._bottomTip = bottomTip;
        // this._scrollList.verticalScrollPolicy = "off";
    };
    //tabbar 点击事件
    AcPunishShopPopupView.prototype.tabBtnClickHandler = function (params) {
        App.LogUtil.log("param.index" + params.index);
        var btnIndex = params.index;
        this._btnIndex = btnIndex;
        var dataList = [];
        if (btnIndex == 0 || btnIndex == 1) {
            var dataCfg = this.cfg.punishList;
            for (var key in dataCfg) {
                var currData = { id: Number(key), data: dataCfg[key] };
                dataList.push(currData);
            }
            dataList.sort(function (a, b) { return a.id - b.id; });
        }
        else if (btnIndex == 2) {
            var dataCfg = this.cfg.shop;
            for (var key in dataCfg) {
                var currData = { id: Number(key), data: dataCfg[key] };
                dataList.push(currData);
            }
            dataList.sort(function (a, b) { return a.id - b.id; });
        }
        this.refreshTopView();
        this.refreshBottomTip();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code, type: btnIndex });
    };
    //刷新顶部显示
    AcPunishShopPopupView.prototype.refreshTopView = function () {
        var index = this._btnIndex;
        if (index == 0) {
            this._shopTopContainer.visible = true;
            this._storeTopContainer.visible = false;
            this._scoreTopContainer.visible = false;
            var shopIcon = this._shopTopContainer.getChildByName("shopTopIcon");
            var shopNum = this._shopTopContainer.getChildByName("shopNum");
            shopNum.text = Api.playerVoApi.getPlayerGemStr();
            shopIcon.x = this._shopTopContainer.width / 2 - (shopIcon.width * shopIcon.scaleX + shopNum.width) / 2;
            shopNum.x = shopIcon.x + shopIcon.width * shopIcon.scaleX;
        }
        else if (index == 1) {
            this._shopTopContainer.visible = false;
            this._storeTopContainer.visible = true;
            this._scoreTopContainer.visible = false;
            var storeNumInfo = this._storeTopContainer.getChildByName("storeNumInfo");
            storeNumInfo.text = LanguageManager.getlocal("acPunishCurrEnergy-" + this.getTypeCode(), ["" + this.vo.energy]);
            storeNumInfo.x = this._storeTopContainer.width / 2 - storeNumInfo.width / 2;
        }
        else if (index == 2) {
            this._shopTopContainer.visible = false;
            this._storeTopContainer.visible = false;
            this._scoreTopContainer.visible = true;
            var scoreNumInfo = this._scoreTopContainer.getChildByName("scoreNumInfo");
            scoreNumInfo.text = LanguageManager.getlocal("acPunishCurrScore-" + this.getTypeCode(), ["" + this.vo.score]);
            scoreNumInfo.x = this._scoreTopContainer.width / 2 - scoreNumInfo.width / 2;
        }
    };
    //刷新底部显示
    AcPunishShopPopupView.prototype.refreshBottomTip = function () {
        var index = this._btnIndex;
        this._bottomTip.visible = false;
        if (index == 0) {
            this._bottomTip.visible = true;
            this._bottomTip.text = LanguageManager.getlocal("acPunishShopBottomTip-" + this.getTypeCode());
        }
        else if (index == 1) {
            this._bottomTip.visible = true;
            this._bottomTip.text = LanguageManager.getlocal("acPunishStoreBottomTip-" + this.getTypeCode());
        }
        this._bottomTip.x = this._bg.x + this._bg.width / 2 - this._bottomTip.width / 2;
    };
    //刷新view
    AcPunishShopPopupView.prototype.refreshView = function () {
        var btnIndex = this._btnIndex;
        var dataList = [];
        if (btnIndex == 0 || btnIndex == 1) {
            var dataCfg = this.cfg.punishList;
            for (var key in dataCfg) {
                var currData = { id: Number(key), data: dataCfg[key] };
                dataList.push(currData);
            }
            dataList.sort(function (a, b) { return a.id - b.id; });
        }
        else if (btnIndex == 2) {
            var dataCfg = this.cfg.shop;
            for (var key in dataCfg) {
                var currData = { id: Number(key), data: dataCfg[key] };
                dataList.push(currData);
            }
            dataList.sort(function (a, b) { return a.id - b.id; });
        }
        this.refreshTopView();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code, type: btnIndex });
    };
    //商店购买
    AcPunishShopPopupView.prototype.refreshShop = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    //道具使用
    AcPunishShopPopupView.prototype.refreshStoreUse = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var strList = [];
        if (rData.getEnergy) {
            var flyStr = LanguageManager.getlocal("acPunishGetEnergtTxt-" + this.getTypeCode(), [String(rData.getEnergy)]);
            App.LogUtil.log("flyStr: " + flyStr);
            strList.push({ tipMessage: flyStr });
            App.CommonUtil.playRewardFlyAction(strList);
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    //积分兑换
    AcPunishShopPopupView.prototype.refreshExchange = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcPunishShopPopupView.prototype.getTypeCode = function () {
        if (this.code == "13") {
            return "12";
        }
        return this.code;
    };
    Object.defineProperty(AcPunishShopPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPunishShopPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPunishShopPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPunishShopPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcPunishShopPopupView.prototype.getTitleStr = function () {
        return "acPunishShopTitle-" + this.getTypeCode();
    };
    AcPunishShopPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2", "countrywarrewardview_itembg"
        ]).concat(list);
    };
    AcPunishShopPopupView.prototype.getShowHeight = function () {
        return 850;
    };
    AcPunishShopPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcPunishShopPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, this.refreshShop, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, this.refreshExchange, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY, this.refreshStoreUse, this);
        this._scrollList = null;
        this._shopTopContainer = null;
        this._storeTopContainer = null;
        this._scoreTopContainer = null;
        this._btnIndex = 0;
        this._bottomTip = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishShopPopupView;
}(PopupView));
__reflect(AcPunishShopPopupView.prototype, "AcPunishShopPopupView");
//# sourceMappingURL=AcPunishShopPopupView.js.map