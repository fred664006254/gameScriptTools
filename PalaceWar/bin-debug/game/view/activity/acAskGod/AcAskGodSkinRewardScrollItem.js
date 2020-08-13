var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcAskGodSkinRewardScrollItem = /** @class */ (function (_super) {
    __extends(AcAskGodSkinRewardScrollItem, _super);
    function AcAskGodSkinRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcAskGodSkinRewardScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodSkinRewardScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodSkinRewardScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodSkinRewardScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodSkinRewardScrollItem.prototype, "typeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodSkinRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        //item bg
        var bg = BaseBitmap.create("acaskgod_exchangebg-" + this.typeCode);
        bg.height = 345;
        this.addChild(bg);
        this.width = bg.width;
        this.height = bg.height;
        var thisData = data;
        this._data = thisData;
        var type = parseInt(thisData.getReward.split("_")[0]);
        var id = parseInt(thisData.getReward.split("_")[1]);
        var num = parseInt(thisData.getReward.split("_")[2]);
        var titleTxtStr = LanguageManager.getlocal("");
        var icon = null;
        var imgstr = "";
        var tipStr = "";
        if (type == 6) {
            var itemCfg = Config.ItemCfg.getItemCfgById(id);
            var getStr = itemCfg.getRewards;
            if (getStr && getStr.split("_")[0] == "19") {
                var itemSerCfg = Config.ServantskinCfg.getServantSkinItemById(getStr.split("_")[1]);
                var servantid = itemSerCfg.servantId;
                var servantCfg = Config.ServantCfg.getServantItemById(servantid);
                titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemSerCfg.name, servantCfg.name]);
                icon = BaseBitmap.create(itemSerCfg.body);
                icon.scaleX = icon.scaleY = 0.45;
                imgstr = "acaskgod_servantbg";
                if (Api.servantVoApi.isOwnSkinOfSkinId(id + "")) {
                    tipStr = "acAskGodExchangeTips3";
                }
            }
            else {
                titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemCfg.name, ""]);
                icon = itemCfg.getIconContainer();
                imgstr = "acaskgod_servantbg";
            }
        }
        else if (type == 8) {
            var itemCfg = Config.ServantCfg.getServantItemById(id);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemCfg.name, ""]);
            icon = BaseBitmap.create(itemCfg.halfIcon);
            if (Api.servantVoApi.getServantObj(id + "")) {
                tipStr = "acAskGodExchangeTips1";
            }
        }
        else if (type == 10) {
            var itemCfg = Config.WifeCfg.getWifeCfgById(id);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemCfg.name, ""]);
            icon = BaseBitmap.create(itemCfg.icon);
            if (Api.wifeVoApi.getWifeInfoVoById(id)) {
                tipStr = "acAskGodExchangeTips2";
            }
        }
        else if (type == 11) {
            var itemCfg = Config.TitleCfg.getTitleCfgById(id);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemCfg.name, ""]);
            icon = itemCfg.getIconContainer();
            imgstr = "acaskgod_servantbg";
        }
        else if (type == 16) {
            var itemCfg = Config.WifeskinCfg.getWifeCfgById(id);
            var wifeid = itemCfg.wifeId;
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeid);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemCfg.name, wifeCfg.name]);
            icon = BaseBitmap.create(itemCfg.body);
            icon.scaleX = icon.scaleY = 0.23;
            imgstr = "acaskgod_wifebg";
            if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)) {
                tipStr = "acAskGodExchangeTips4";
            }
        }
        else if (type == 19) {
            var itemCfg = Config.ServantskinCfg.getServantSkinItemById(id);
            var servantid = itemCfg.servantId;
            var servantCfg = Config.ServantCfg.getServantItemById(servantid);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-" + this.typeCode, [itemCfg.name, servantCfg.name]);
            icon = BaseBitmap.create(itemCfg.body);
            icon.scaleX = icon.scaleY = 0.45;
            imgstr = "acaskgod_servantbg";
            if (Api.servantVoApi.isOwnSkinOfSkinId(id + "")) {
                tipStr = "acAskGodExchangeTips3";
            }
        }
        if (imgstr) {
            var img = BaseBitmap.create(imgstr);
            img.x = this.width / 2 - img.width / 2;
            img.y = 20;
            this.addChild(img);
        }
        if (icon) {
            icon.x = this.width / 2 - icon.width * icon.scaleX / 2;
            icon.y = this.height / 2 - icon.height * icon.scaleY / 2 - 25;
            this.addChild(icon);
        }
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        titleTxt.x = this.width / 2 - titleTxt.width / 2;
        titleTxt.y = bg.y + 23;
        this.addChild(titleTxt);
        var bot = BaseBitmap.create("acaskgod_maskbg");
        bot.x = this.width / 2 - bot.width / 2;
        bot.y = bg.y + bg.height - 115;
        this.addChild(bot);
        if (tipStr) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(tipStr), 16, TextFieldConst.COLOR_WARN_GREEN);
            tipTxt.x = this.width / 2 - tipTxt.width / 2;
            tipTxt.y = bot.y + bot.height / 2 - tipTxt.height / 2 + 3;
            this.addChild(tipTxt);
        }
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", function () {
            if ((!_this.vo.isStart)) {
                _this.vo.showAcEndTip();
                return;
            }
            var times = _this.vo.getExchangeTimes(thisData.id + "");
            if (times < thisData.limitTime) {
                if (Api.itemVoApi.getItemNumInfoVoById(thisData.needItem) >= thisData.needNum) {
                    NetManager.request(NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE, { activeId: _this.vo.aidAndCode, shopId: data.id });
                }
                else {
                    var message = LanguageManager.getlocal("acAskGodExchangeNotEnough");
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: message,
                        title: "itemUseConstPopupViewTitle",
                        touchMaskClose: true,
                        callback: function () {
                            ViewController.getInstance().hideView(ViewConst.POPUP.ACASKGODSKINREWARDPOPVIEW);
                        },
                        handler: _this,
                        needClose: 1,
                        needCancel: true
                    });
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAskGodExchangeTimesNotEnough"));
            }
        }, this);
        btn.x = this.width / 2 - btn.width / 2;
        btn.y = bg.y + bg.height - btn.height - 10;
        this.addChild(btn);
        var times = this.vo.getExchangeTimes(thisData.id + "");
        if (times >= thisData.limitTime) {
            btn.setGray(true);
        }
        else {
            btn.setGray(false);
        }
        var needItemCfg = Config.ItemCfg.getItemCfgById(thisData.needItem);
        var needIcon = BaseBitmap.create(needItemCfg.icon);
        needIcon.setScale(0.45);
        needIcon.x = 20;
        needIcon.y = btn.height / 2 - needIcon.height * needIcon.scaleY / 2;
        btn.addChild(needIcon);
        var numTxt = ComponentManager.getTextField(String(thisData.needNum), 22, TextFieldConst.COLOR_BROWN);
        numTxt.x = needIcon.x + needIcon.width * needIcon.scaleX + 10;
        numTxt.y = btn.height / 2 - numTxt.height / 2;
        btn.addChild(numTxt);
        var detailImg = ComponentManager.getButton("servant_info_detail", "", this.showDetail, this);
        detailImg.setPosition(bg.width - detailImg.width - 10, 45);
        this.addChild(detailImg);
        var left = thisData.limitTime - this.vo.getExchangeTimes(thisData.id + "");
        var tipTimesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAskGodExchangeTips5", [left + ""]), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTimesTxt.x = this.width / 2 - tipTimesTxt.width / 2;
        tipTimesTxt.y = btn.y - tipTimesTxt.height;
        this.addChild(tipTimesTxt);
    };
    AcAskGodSkinRewardScrollItem.prototype.showDetail = function () {
        var data = this._data;
        var type = parseInt(data.getReward.split("_")[0]);
        var id = parseInt(data.getReward.split("_")[1]);
        var needItemCfg = Config.ItemCfg.getItemCfgById(data.needItem);
        if (type == 6) {
            var itemCfg = Config.ItemCfg.getItemCfgById(id);
            var getStr = itemCfg.getRewards;
            if (getStr && getStr.split("_")[0] == "19") {
                var wifeBg = "previewbg_servantskin";
                var wifeType = Config.ServantskinCfg.formatRewardItemVoStr(getStr.split("_")[1]);
                var wifeCfg = Config.ServantskinCfg.getServantSkinItemById(getStr.split("_")[1]);
                var cfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
                var adata = { data: [
                        { idType: wifeType, topMsg: LanguageManager.getlocal("acAskGodTopMsg", [data.needNum + "", needItemCfg.name, wifeCfg.name + "-" + cfg.name]), bgName: wifeBg, scale: 0.8 },
                    ] };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, id);
            }
        }
        else if (type == 8) {
            var wifeBg = "previewbg_servantskin";
            var wifeType = Config.ServantCfg.formatRewardItemVoStr(id);
            var wifeCfg = Config.ServantCfg.getServantItemById(id);
            var adata = { data: [
                    { idType: wifeType, topMsg: LanguageManager.getlocal("acAskGodTopMsg", [data.needNum + "", needItemCfg.name, wifeCfg.name]), bgName: wifeBg, scale: 0.8 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);
        }
        else if (type == 10) {
            var wifeBg = "acthrowarrowview_wifeskinbg";
            var wifeType = Config.WifeCfg.formatRewardItemVoStr(id);
            var wifeCfg = Config.WifeCfg.getWifeCfgById(id);
            var adata = { data: [
                    { idType: wifeType, topMsg: LanguageManager.getlocal("acAskGodTopMsg", [data.needNum + "", needItemCfg.name, wifeCfg.name]), bgName: wifeBg, scale: 0.6 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);
        }
        else if (type == 11) {
            var rewardsArr = GameData.formatRewardItem(this._data.getReward);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, rewardsArr[0]);
        }
        else if (type == 16) {
            var wifeBg = "acthrowarrowview_wifeskinbg";
            var wifeType = Config.WifeskinCfg.formatRewardItemVoStr(id);
            var wifeCfg = Config.WifeskinCfg.getWifeCfgById(id);
            var cfg = Config.WifeCfg.getWifeCfgById(wifeCfg.wifeId);
            var adata = { data: [
                    { idType: wifeType, topMsg: LanguageManager.getlocal("acAskGodTopMsg", [data.needNum + "", needItemCfg.name, wifeCfg.name + "-" + cfg.name]), bgName: wifeBg, scale: 0.6 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);
        }
        else if (type == 19) {
            var wifeBg = "previewbg_servantskin";
            var wifeType = Config.ServantskinCfg.formatRewardItemVoStr(id);
            var wifeCfg = Config.ServantskinCfg.getServantSkinItemById(id);
            var cfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
            var adata = { data: [
                    { idType: wifeType, topMsg: LanguageManager.getlocal("acAskGodTopMsg", [data.needNum + "", needItemCfg.name, wifeCfg.name + "-" + cfg.name]), bgName: wifeBg, scale: 0.8 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);
        }
    };
    AcAskGodSkinRewardScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcAskGodSkinRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAskGodSkinRewardScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcAskGodSkinRewardScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcAskGodSkinRewardScrollItem.js.map