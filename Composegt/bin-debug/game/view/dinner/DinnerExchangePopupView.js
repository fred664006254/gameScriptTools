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
    DinnerExchangePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SHOPITEM), this.shopItemCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_FEFRESHITEM), this.gemsRefreshCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SCOREDINNER), this.buyItemCallback, this);
        this._pointText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._pointText.y = 11;
        this.addChildToContainer(this._pointText);
        var bg11 = BaseBitmap.create("public_tc_bg01");
        bg11.width = 540;
        bg11.height = 670;
        bg11.x = this.viewBg.width / 2 - bg11.width / 2;
        bg11.y = 40;
        this.addChildToContainer(bg11);
        // let rect = egret.Rectangle.create();
        // rect.setTo(0,0,bg1.width-20,bg1.height-20);
        var rect = egret.Rectangle.create();
        rect.setTo(bg11.x - 10, bg11.y + 10, this.viewBg.width, bg11.height - 20);
        // 中部可滑动区域
        this._scrollContainer = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(this._scrollContainer, rect);
        this.addChildToContainer(scrollView);
        this._scrollContainer.setPosition(0, 0);
        this.resetPointText();
        //底部
        var bottomBg = BaseBitmap.create("public_alphabg");
        bottomBg.width = 528;
        bottomBg.height = 82;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, rect.y + rect.height + 20);
        this.addChildToContainer(bottomBg);
        var gemRefresh = ComponentManager.getTextField(LanguageManager.getlocal("gemRefresh") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        gemRefresh.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height / 2 - 5 - gemRefresh.height);
        gemRefresh.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(gemRefresh);
        this._gemRefreshText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._gemRefreshText.setPosition(gemRefresh.x + gemRefresh.width + 12, gemRefresh.y);
        this.addChildToContainer(this._gemRefreshText);
        this.resetGemRefreshtText();
        var autoRefresh = ComponentManager.getTextField(LanguageManager.getlocal("autoRefresh") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        autoRefresh.setColor(TextFieldConst.COLOR_BROWN);
        autoRefresh.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(autoRefresh);
        this._autoRefreshText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._autoRefreshText.setPosition(autoRefresh.x + autoRefresh.width + 12, autoRefresh.y);
        this.addChildToContainer(this._autoRefreshText);
        var refreshBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "refresh", this.refreshHandle, this);
        refreshBtn.setPosition(this.viewBg.width - refreshBtn.width - 40, bottomBg.y + bottomBg.height / 2 - refreshBtn.height / 2);
        // refreshBtn.setColor(TextFieldConst.COLOR_BLACK);
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
            bgContainer.setPosition(21 + 176 * (idx % 3), 250 * Math.floor(idx / 3));
            this._scrollContainer.addChild(bgContainer);
            this._itemsContainerTab.push(bgContainer);
        }
    };
    DinnerExchangePopupView.prototype.getShopItemContainer = function (key) {
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_listbg");
        itemBg.width = 167;
        itemBg.height = 240;
        bgContainer.addChild(itemBg);
        var itemBg2 = BaseBitmap.create("public_up3");
        // itemBg2.skewX=180;
        itemBg2.width = 167 - 10;
        itemBg2.height = 30;
        itemBg2.x = 5;
        itemBg2.y = 4;
        // itemBg2.height = 218;
        bgContainer.addChild(itemBg2);
        var shopId = Api.dinnerVoApi.getShopInfo()[key];
        var itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);
        var iconModel = GameData.formatRewardItem(itemCfg.content)[0];
        var itemName = ComponentManager.getTextField(iconModel.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemName.setPosition(itemBg.width / 2 - itemName.width / 2, 7);
        bgContainer.addChild(itemName);
        var itemIcon = GameData.getItemIcon(iconModel, true);
        itemIcon.setPosition(itemBg.width / 2 - itemIcon.width / 2, 40);
        itemIcon.name = "icon";
        bgContainer.addChild(itemIcon);
        itemIcon.getChildByName("numLb").visible = false;
        var priceName = LanguageManager.getlocal("pointNumber");
        if (itemCfg.type == 2) {
            priceName = LanguageManager.getlocal("gemName");
        }
        var priceText = ComponentManager.getTextField(itemCfg.cost + priceName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        priceText.setPosition(itemBg.width / 2 - priceText.width / 2, itemIcon.y + itemIcon.height + 3);
        priceText.setColor(TextFieldConst.COLOR_BROWN);
        bgContainer.addChild(priceText);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.buyItem, this, [key]);
        exchangeBtn.setPosition(itemBg.width / 2 - exchangeBtn.width / 2, itemBg.height - exchangeBtn.height - 18);
        // exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
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
        //此处需要判断消耗什么类型的道具
        if (!itemCfg.type || itemCfg.type == 1) {
            if (Api.dinnerVoApi.getTotalScore() < itemCfg.cost) {
                App.CommonUtil.showTip(LanguageManager.getlocal("pointNumberLess"));
                return;
            }
            this.exchangeDo(idx);
        }
        else {
            if (Api.playerVoApi.getPlayerGem() < itemCfg.cost) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                return;
            }
            //展示信息
            var message = LanguageManager.getlocal("shopBuyUseGem", [itemCfg.cost.toString(), GameData.formatRewardItem(itemCfg.content)[0].name]);
            //玩家所持有的元宝数
            var playerGem = Api.playerVoApi.getPlayerGem();
            //ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:rewardItemVo.num,confirmCallback:this.confirmCallbackHandler,handler:this,icon:rewardItemVo.icon,iconBg: rewardItemVo.iconBg,num:playerGem,msg:message,id : 1});
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                useNum: itemCfg.cost,
                confirmCallback: this.exchangeDo.bind(this, idx),
                handler: this,
                num: playerGem,
                msg: message,
                id: 1 //消耗物品id  1->元宝
            });
        }
    };
    DinnerExchangePopupView.prototype.exchangeDo = function (idx) {
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
