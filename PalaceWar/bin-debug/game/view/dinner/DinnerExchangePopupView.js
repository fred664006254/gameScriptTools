/**
 * 积分兑换道具板子
 * author shaoliang
 * date 2017/10/31
 * @class DinnerExchangePopupView
 */
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
var DinnerExchangePopupView = (function (_super) {
    __extends(DinnerExchangePopupView, _super);
    function DinnerExchangePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollContainer = null;
        //商品显示对象
        _this._itemsContainerTab = [];
        _this._isLoading = false;
        _this._buyClickId = null;
        return _this;
    }
    DinnerExchangePopupView.prototype.isShowOpenAni = function () {
        if (Api.rookieVoApi.isGuiding) {
            return false;
        }
        return true;
    };
    DinnerExchangePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SHOPITEM), this.shopItemCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_FEFRESHITEM), this.gemsRefreshCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SCOREDINNER), this.buyItemCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.hide, this);
        this._pointText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._pointText.y = 11;
        this.addChildToContainer(this._pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, this.viewBg.width, 720);
        // 中部可滑动区域
        this._scrollContainer = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(this._scrollContainer, rect);
        this.addChildToContainer(scrollView);
        this._scrollContainer.setPosition(GameData.popupviewOffsetX, 40);
        this.resetPointText();
        //底部
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 528;
        bottomBg.height = 82;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, rect.height + 10);
        this.addChildToContainer(bottomBg);
        var gemRefresh = ComponentManager.getTextField(LanguageManager.getlocal("gemRefresh") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        gemRefresh.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height / 2 - 5 - gemRefresh.height);
        this.addChildToContainer(gemRefresh);
        this._gemRefreshText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._gemRefreshText.setPosition(gemRefresh.x + gemRefresh.width + 12, gemRefresh.y);
        this.addChildToContainer(this._gemRefreshText);
        this.resetGemRefreshtText();
        var autoRefresh = ComponentManager.getTextField(LanguageManager.getlocal("autoRefresh") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        autoRefresh.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(autoRefresh);
        this._autoRefreshText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._autoRefreshText.setPosition(autoRefresh.x + autoRefresh.width + 12, autoRefresh.y);
        this.addChildToContainer(this._autoRefreshText);
        var refreshBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "refresh", this.refreshHandle, this);
        refreshBtn.setPosition(this.viewBg.width - refreshBtn.width - 30 - 26.5, bottomBg.y + bottomBg.height / 2 - refreshBtn.height / 2);
        refreshBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(refreshBtn);
        //如果刷新时间到了
        if (Api.dinnerVoApi.getShopLastTime() - GameData.serverTime + Config.DinnerCfg.getShopReTime() <= 0) {
            this.tick();
        }
        else {
            this.resetAutoRefreshtText();
            this.refreshShowItems();
        }
    };
    //刷新回掉
    DinnerExchangePopupView.prototype.shopItemCallback = function (p) {
        this._isLoading = false;
        if (p.data.ret == true) {
            this.refreshShowItems();
        }
    };
    //刷新商品
    DinnerExchangePopupView.prototype.refreshShowItems = function () {
        if (this._itemsContainerTab.length > 0) {
            for (var k in this._itemsContainerTab) {
                this._scrollContainer.removeChild(this._itemsContainerTab[k]);
            }
            this._itemsContainerTab.length = 0;
        }
        var itemsInfo = Api.dinnerVoApi.getShopInfo();
        for (var k in itemsInfo) {
            var idx = Number(k);
            var bgContainer = this.getShopItemContainer(idx);
            bgContainer.setPosition(21 + 178 * (idx % 3), 225 * Math.floor(idx / 3));
            this._scrollContainer.addChild(bgContainer);
            this._itemsContainerTab.push(bgContainer);
        }
    };
    DinnerExchangePopupView.prototype.getShopItemContainer = function (key) {
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 170;
        itemBg.height = 218;
        bgContainer.addChild(itemBg);
        var shopId = Api.dinnerVoApi.getShopInfo()[key];
        var itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);
        var iconModel = GameData.formatRewardItem(itemCfg.content)[0];
        var itemName = ComponentManager.getTextField(iconModel.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemName.setPosition(itemBg.width / 2 - itemName.width / 2, 7);
        bgContainer.addChild(itemName);
        var itemIcon = GameData.getItemIcon(iconModel, true);
        itemIcon.setPosition(itemBg.width / 2 - itemIcon.width / 2, 30);
        itemIcon.name = "icon";
        bgContainer.addChild(itemIcon);
        itemIcon.getChildByName("numLb").visible = false;
        if (itemIcon.getChildByName("numbg")) {
            itemIcon.getChildByName("numbg").visible = false;
        }
        var priceText = ComponentManager.getTextField(itemCfg.cost + LanguageManager.getlocal("pointNumber"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        priceText.setPosition(itemBg.width / 2 - priceText.width / 2, itemIcon.y + itemIcon.height + 3);
        bgContainer.addChild(priceText);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.buyItem, this, [key]);
        exchangeBtn.setPosition(itemBg.width / 2 - exchangeBtn.width / 2, itemBg.height - exchangeBtn.height - 8);
        exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
        bgContainer.addChild(exchangeBtn);
        if (Api.dinnerVoApi.getBuyInfo()[key + 1] == 1) {
            App.DisplayUtil.changeToGray(itemIcon);
            App.DisplayUtil.changeToGray(exchangeBtn);
        }
        return bgContainer;
    };
    DinnerExchangePopupView.prototype.buyItem = function (idx) {
        if (Api.dinnerVoApi.getBuyInfo()[idx + 1] == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
            return;
        }
        var shopId = Api.dinnerVoApi.getShopInfo()[idx];
        var itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);
        if (Api.dinnerVoApi.getTotalScore() < itemCfg.cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("pointNumberLess"));
            return;
        }
        this._buyClickId = idx;
        NetManager.request(NetRequestConst.REQUEST_DINNER_SCOREDINNER, { "posId": idx + 1 });
    };
    DinnerExchangePopupView.prototype.refreshHandle = function () {
        var useNum = Api.dinnerVoApi.getShopNum();
        var totalNum = Config.DinnerCfg.getShopReset();
        if (useNum >= totalNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemRefreshTimesOver"));
        }
        else {
            var needGem = Config.DinnerCfg.getShopNeedGem()[Api.dinnerVoApi.getShopNum()];
            var message = LanguageManager.getlocal("dinnerGemsRefresh", [App.StringUtil.toString(needGem)]);
            var gem = Api.playerVoApi.getPlayerGem();
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.gemsRefreshItem, handler: this, icon: "itemicon1", iconBg: "itembg_1", num: gem, msg: message, id: 1, useNum: needGem });
        }
    };
    DinnerExchangePopupView.prototype.gemsRefreshItem = function () {
        var needGem = Config.DinnerCfg.getShopNeedGem()[Api.dinnerVoApi.getShopNum()];
        if (needGem > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_DINNER_FEFRESHITEM, {});
    };
    //手动刷新
    DinnerExchangePopupView.prototype.gemsRefreshCallback = function (p) {
        if (p.data.ret == true) {
            this.refreshShowItems();
            this.resetGemRefreshtText();
        }
    };
    //购买物品
    DinnerExchangePopupView.prototype.buyItemCallback = function (p) {
        if (p.data.ret == true) {
            var shopId = Api.dinnerVoApi.getShopInfo()[this._buyClickId];
            var itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);
            var iconModels = GameData.formatRewardItem(itemCfg.content);
            App.CommonUtil.playRewardFlyAction(iconModels);
            this.resetPointText();
            this.refreshShowItems();
        }
    };
    DinnerExchangePopupView.prototype.resetPointText = function () {
        this._pointText.text = LanguageManager.getlocal("dinnerPoint", [Api.dinnerVoApi.getTotalScore().toString()]);
        this._pointText.x = this.viewBg.width / 2 - this._pointText.width / 2;
        // this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
    };
    DinnerExchangePopupView.prototype.resetGemRefreshtText = function () {
        var num = Config.DinnerCfg.getShopReset() - Api.dinnerVoApi.getShopNum();
        if (num < 0) {
            num = 0;
        }
        this._gemRefreshText.text = num + "/" + Config.DinnerCfg.getShopReset();
    };
    DinnerExchangePopupView.prototype.resetAutoRefreshtText = function () {
        var time = Api.dinnerVoApi.getShopLastTime() - GameData.serverTime + Config.DinnerCfg.getShopReTime();
        if (time < 0) {
            time = 0;
        }
        this._autoRefreshText.text = App.DateUtil.getFormatBySecond(time);
    };
    DinnerExchangePopupView.prototype.tick = function () {
        if (this._isLoading == false && (Api.dinnerVoApi.getShopLastTime() - GameData.serverTime + Config.DinnerCfg.getShopReTime() <= 0)) {
            this._isLoading = true;
            NetManager.request(NetRequestConst.REQUEST_DINNER_SHOPITEM, {});
        }
        this.resetAutoRefreshtText();
    };
    DinnerExchangePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SHOPITEM), this.shopItemCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_FEFRESHITEM), this.gemsRefreshCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SCOREDINNER), this.buyItemCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.hide, this);
        this._pointText = null;
        this._itemsContainerTab.length = 0;
        this._isLoading = false;
        this._buyClickId = null;
        this._scrollContainer = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerExchangePopupView;
}(PopupView));
__reflect(DinnerExchangePopupView.prototype, "DinnerExchangePopupView");
//# sourceMappingURL=DinnerExchangePopupView.js.map