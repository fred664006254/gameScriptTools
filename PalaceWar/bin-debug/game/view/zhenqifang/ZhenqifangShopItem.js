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
var ZhenqifangShopItem = (function (_super) {
    __extends(ZhenqifangShopItem, _super);
    function ZhenqifangShopItem() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._cdTxt = null;
        _this._itemCfg = null;
        _this._flag = null;
        return _this;
    }
    Object.defineProperty(ZhenqifangShopItem.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangShopItem.prototype.initItem = function (index, data, item) {
        var view = this;
        view.width = 205;
        var itemCfg = data;
        view._itemCfg = itemCfg;
        var bg = BaseBitmap.create(data.limitType == 1 ? "zqfshopitembg" : "acsingledayitembg"); //public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rewardvo = GameData.formatRewardItem(itemCfg.item)[0];
        var nameTxt = ComponentManager.getTextField(rewardvo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, data.limitType == 1 ? rewardvo.nameColor : TextFieldConst.COLOR_BROWN);
        nameTxt.setPosition(bg.x + (bg.width - nameTxt.width) / 2, bg.y + 30);
        view.addChild(nameTxt);
        var icon = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nameTxt.y + nameTxt.height + 5);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        var limitNum = itemCfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemCfg.id);
        var str = "";
        if (limitNum == 0) {
            str = LanguageManager.getlocal("ZhenqifangShopExchangeNot" + itemCfg.limitType, [limitNum.toString()]);
        }
        else {
            str = LanguageManager.getlocal("ZhenqifangShopExchange" + itemCfg.limitType, [limitNum.toString()]);
        }
        var limitTxt = ComponentManager.getTextField(str, 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
        view._limitTxt = limitTxt;
        //周刷新
        if (itemCfg.limitType == 2) {
            limitTxt.visible = limitNum > 0;
            var date = App.DateUtil.getServerDate();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var weekday = date.getDay();
            if (weekday == 0) {
                weekday = 7;
            }
            var endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (7 - weekday + 1) * 86400;
            // 
            var num = endtime - GameData.serverTime;
            if (GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)) {
                num = 0;
                Api.zhenqifangVoApi.freshshop = true;
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
            }
            var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(num == 0 ? "ZhenqifangShopTip3" : "ZhenqifangShopTip4", [App.DateUtil.getFormatBySecond(num, 17)]), 22, TextFieldConst.COLOR_WARN_RED2);
            this.addChild(cdTxt);
            this._cdTxt = cdTxt;
            cdTxt.visible = limitNum == 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdTxt, limitTxt);
        }
        var cost = itemCfg.price;
        var reward = GameData.formatRewardItem(cost)[0];
        var rectd = new egret.Rectangle(0, 0, 38, 38);
        var costicon = BaseLoadBitmap.create(reward.icon, rectd);
        costicon.setPosition(70, 188);
        view.addChild(costicon);
        //原价
        var needNum = reward.num;
        var originPriceTxt = ComponentManager.getTextField(needNum + "", 20, data.limitType == 1 ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, costicon, [costicon.width, 0]);
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height - composeBtn.height - 20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;
        var flag = BaseBitmap.create("zqfshopflag");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;
        composeBtn.visible = limitNum > 0;
        flag.visible = !composeBtn.visible;
        TickManager.addTick(view.tick, view);
    };
    ZhenqifangShopItem.prototype.refreshItem = function (rewards) {
        var view = this;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemCfg.id);
            var str = "";
            if (limitNum == 0) {
                str = LanguageManager.getlocal("ZhenqifangShopExchangeNot" + itemCfg.limitType, [limitNum.toString()]);
            }
            else {
                str = LanguageManager.getlocal("ZhenqifangShopExchange" + itemCfg.limitType, [limitNum.toString()]);
            }
            view._limitTxt.text = str;
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.setVisible(limitNum > 0);
            view._flag.visible = !view._composeBtn.visible;
            view._limitTxt.x = view._composeBtn.x + (view._composeBtn.width - view._limitTxt.textWidth) / 2;
            if (itemCfg.limitType == 2 && limitNum == 0 && view._cdTxt) {
                view._limitTxt.visible = false;
                var date = App.DateUtil.getServerDate();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var weekday = date.getDay();
                if (weekday == 0) {
                    weekday = 7;
                }
                var endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (7 - weekday + 1) * 86400;
                this._cdTxt.visible = true;
                var num = endtime - GameData.serverTime;
                if (GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)) {
                    num = 0;
                    Api.zhenqifangVoApi.freshshop = true;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
                }
                this._cdTxt.text = LanguageManager.getlocal(num == 0 ? "ZhenqifangShopTip3" : "ZhenqifangShopTip4", [App.DateUtil.getFormatBySecond(num, 17)]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._cdTxt, this._limitTxt);
            }
        }
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    ZhenqifangShopItem.prototype.composeHandler = function () {
        var view = this;
        var itemcfg = this._itemCfg;
        var limitNum = itemcfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemcfg.id);
        if (limitNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        var costreward = itemcfg.price;
        var reward = GameData.formatRewardItem(costreward)[0];
        var hasNum = reward.id == 1 ? Api.playerVoApi.getPlayerGem() : Api.itemVoApi.getItemNumInfoVoById(reward.id);
        var needNum = reward.num;
        var cost = hasNum - Number(needNum);
        if (cost < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal(reward.id == 1 ? "allianceBossOpen_tip5" : "itemNumNotEnough"));
            return;
        }
        var rewardvo = GameData.formatRewardItem(itemcfg.item)[0];
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal(reward.id == 1 ? "zhenqifangtip7" : "zhenqifangtip6", [needNum.toString(), rewardvo.name]),
            callback: function () {
                view.api.selIdx = view._index;
                var date = App.DateUtil.getServerDate();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                NetManager.request(NetRequestConst.REQUEST_ZQF_SHOPBUY, {
                    idx: itemcfg.id,
                    month: month
                });
            },
            handler: this,
            needCancel: true
        });
    };
    /**
     * 不同格子X间距
     */
    ZhenqifangShopItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    ZhenqifangShopItem.prototype.getSpaceY = function () {
        return 5;
    };
    ZhenqifangShopItem.prototype.tick = function () {
        var view = this;
        var itemCfg = view._itemCfg;
        var limitNum = itemCfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemCfg.id);
        if (itemCfg.limitType == 2 && limitNum == 0 && view._cdTxt) {
            view._limitTxt.visible = false;
            var date = App.DateUtil.getServerDate();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var weekday = date.getDay();
            if (weekday == 0) {
                weekday = 7;
            }
            var endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (7 - weekday + 1) * 86400;
            var num = endtime - GameData.serverTime;
            if (GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)) {
                num = 0;
                Api.zhenqifangVoApi.freshshop = true;
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
            }
            this._cdTxt.text = LanguageManager.getlocal(num == 0 ? "ZhenqifangShopTip3" : "ZhenqifangShopTip4", [App.DateUtil.getFormatBySecond(num, 17)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._cdTxt, this._limitTxt);
        }
    };
    ZhenqifangShopItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._itemCfg = null;
        this._cdTxt = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangShopItem;
}(ScrollListItem));
__reflect(ZhenqifangShopItem.prototype, "ZhenqifangShopItem");
//# sourceMappingURL=ZhenqifangShopItem.js.map