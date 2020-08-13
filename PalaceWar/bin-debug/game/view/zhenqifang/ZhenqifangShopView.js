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
var ZhenqifangShopView = (function (_super) {
    __extends(ZhenqifangShopView, _super);
    function ZhenqifangShopView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._numTxt = null;
        _this._numTxt2 = null;
        _this._cdTxt = null;
        _this._time = 0;
        return _this;
    }
    ZhenqifangShopView.prototype.getTitleStr = function () {
        return "ZhenqifangShoptitle";
    };
    ZhenqifangShopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_bottombg", "acchristmasview_smalldescbg", "acsingledayitembg", "battlepasscollect3-1", "ladderteam_add"
        ]);
    };
    Object.defineProperty(ZhenqifangShopView.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangShopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SHOPBUY), this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.freshView, this);
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y + 89;
        bottomBg.x = 0;
        bottomBg.y = -80;
        this.addChildToContainer(bottomBg);
        var topbg = BaseBitmap.create("zqfshoptopbg");
        topbg.x = GameConfig.stageWidth / 2 - topbg.width / 2;
        topbg.y = bottomBg.y + 75;
        this.addChildToContainer(topbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("ZhenqifangShopTip1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 13;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
        tipTxt.y = topbg.y + 28;
        this.addChildToContainer(tipTxt);
        var date = App.DateUtil.getServerDate();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var endday = new Date(year, month, 0);
        var daycount = endday.getDate();
        var endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (daycount - day + 1) * 86400 - GameData.serverTime;
        // 
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("ZhenqifangShopTip2", [App.DateUtil.getFormatBySecond(endtime, 16)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        cdTxt.x = GameConfig.stageWidth / 2 - cdTxt.width / 2;
        cdTxt.y = tipTxt.y + tipTxt.textHeight + 13;
        this.addChildToContainer(cdTxt);
        this._cdTxt = cdTxt;
        var bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 160 - topbg.height;
        bottomBg2.width = 615;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        bottomBg2.y = topbg.y + topbg.height + 70;
        this.addChildToContainer(bottomBg2);
        var numbg = BaseBitmap.create("public_9_resbg");
        var rectd = new egret.Rectangle(0, 0, 40, 40);
        var icon = BaseBitmap.create("public_icon1");
        var numTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), 20);
        numbg.setPosition(95, 148);
        this.addChildToContainer(numbg);
        icon.setPosition(numbg.x - 3, numbg.y + numbg.height / 2 - icon.height / 2);
        view.addChildToContainer(icon);
        numTxt.setPosition(icon.x + icon.width, icon.y + icon.height / 2 - numTxt.height / 2 + 2);
        view.addChildToContainer(numTxt);
        view._numTxt = numTxt;
        var needid = 2040;
        var numbg2 = BaseBitmap.create("public_9_resbg");
        var rectd2 = new egret.Rectangle(0, 0, 40, 40);
        var icon2 = BaseBitmap.create("zqfshopicon");
        var numTxt2 = ComponentManager.getTextField(Api.itemVoApi.getItemNumInfoVoById(needid).toString(), 20);
        numbg2.setPosition(GameConfig.stageWidth - 95 - numbg2.width, 148);
        this.addChildToContainer(numbg2);
        icon2.setPosition(numbg2.x - 3, numbg2.y + numbg2.height / 2 - icon2.height / 2);
        view.addChildToContainer(icon2);
        numTxt2.setPosition(icon2.x + icon2.width, icon2.y + icon2.height / 2 - numTxt2.height / 2 + 2);
        view.addChildToContainer(numTxt2);
        view._numTxt2 = numTxt2;
        var addBtn = ComponentManager.getButton("ladderteam_add", null, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.WEAPONRESOLVEPOPVIEW);
        }, this, null, 1);
        addBtn.setPosition(numbg2.x + numbg2.width - 25, numbg2.y + numbg2.height / 2 - addBtn.height / 2);
        this.addChildToContainer(addBtn);
        var shop = Config.ServantweaponCfg.getShopArr();
        var listbg = bottomBg2;
        var tmpRect = new egret.Rectangle(0, 0, 615, listbg.height - 10);
        var scrollList = ComponentManager.getScrollList(ZhenqifangShopItem, shop, tmpRect);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChildToContainer(scrollList);
        view.update();
        view._time = GameData.serverTime;
        // let resetText = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightExchangeReset"), 20,TextFieldConst.COLOR_BROWN);
        // resetText.setPosition(GameConfig.stageWidth/2 - resetText.width/2, bottomBg2.y+bottomBg2.height+12);
        // view.addChildToContainer(resetText);
    };
    ZhenqifangShopView.prototype.update = function () {
        var view = this;
        var numTxt = view._numTxt;
        numTxt.text = Api.playerVoApi.getPlayerGemStr();
        var needid = 2040;
        view._numTxt2.text = Api.itemVoApi.getItemNumInfoVoById(needid).toString();
    };
    ZhenqifangShopView.prototype.freshView = function () {
        var view = this;
        if (Api.zhenqifangVoApi.freshshop) {
            var shop = Config.ServantweaponCfg.getShopArr();
            view._scrollList.refreshData(shop);
            Api.zhenqifangVoApi.freshshop = false;
        }
        view.update();
    };
    ZhenqifangShopView.prototype.tick = function () {
        var view = this;
        var date = App.DateUtil.getServerDate();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var endday = new Date(year, month, 0);
        var daycount = endday.getDate();
        var endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (daycount - day + 1) * 86400 - GameData.serverTime;
        if (GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)) {
            view._cdTxt.text = LanguageManager.getlocal("ZhenqifangShopTip3", [App.DateUtil.getFormatBySecond(endtime, 16)]);
            Api.zhenqifangVoApi.freshshop = true;
            NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
        }
        else {
            view._cdTxt.text = LanguageManager.getlocal("ZhenqifangShopTip2", [App.DateUtil.getFormatBySecond(endtime, 16)]);
        }
        view._cdTxt.x = GameConfig.stageWidth / 2 - view._cdTxt.width / 2;
        if (view._time > 0 && (GameData.serverTime - App.DateUtil.getWeeTs(view._time)) >= 86400) {
            view._time = GameData.serverTime;
            view._cdTxt.text = LanguageManager.getlocal("ZhenqifangShopTip3", [App.DateUtil.getFormatBySecond(endtime, 16)]);
            Api.zhenqifangVoApi.freshshop = true;
            NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
        }
    };
    ZhenqifangShopView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            var view = this;
            var data = event.data.data.data;
            if (data && data.rewards) {
                var rewards = data.rewards;
                var selIdx = view.api.selIdx;
                var item = view._scrollList.getItemByIndex(selIdx);
                if (item) {
                    item.refreshItem(rewards);
                }
                view.api.selIdx = -1;
            }
        }
    };
    ZhenqifangShopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SHOPBUY), this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH, this.freshView, this);
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.freshView, this);
        this._numTxt = null;
        this._numTxt2 = null;
        this._scrollList = null;
        this._cdTxt = null;
        this._time = 0;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangShopView;
}(CommonView));
__reflect(ZhenqifangShopView.prototype, "ZhenqifangShopView");
//# sourceMappingURL=ZhenqifangShopView.js.map