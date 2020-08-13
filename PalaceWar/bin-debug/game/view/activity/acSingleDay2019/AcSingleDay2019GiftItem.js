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
 * author : qianjun
 * desc : 礼包item
 */
var AcSingleDay2019GiftItem = (function (_super) {
    __extends(AcSingleDay2019GiftItem, _super);
    function AcSingleDay2019GiftItem() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._btn = null;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcSingleDay2019GiftItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_SINGLEDAY2019;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019GiftItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcSingleDay2019GiftItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._code = itemparam;
        view.width = 640;
        view.height = 215;
        view._data = data;
        //创建ui
        //背景图片
        var code = view.getUiCode();
        var giftid = data.id;
        var bg = BaseBitmap.create("newsingledaytab4gift" + giftid + "bg-" + code);
        this.addChild(bg);
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay2019gift" + giftid + "-" + code), 20, TextFieldConst.COLOR_BLACK);
        this.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0, 13]);
        var iconbg = BaseBitmap.create("newsingledaytab4gift" + giftid + "iconbg-" + code);
        this.addChild(iconbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, iconbg, bg, [45, 40]);
        var icon = BaseBitmap.create("newsingledaytab4gift" + giftid + "icon-" + code);
        this.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg);
        icon.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAY2019ITEMSPOPUPVIEW, {
                aid: view.aid,
                code: view.code,
                titleName: "acSingleDay2019gift" + data.id + "-" + code,
                reward: data.item,
                id: data.id
            });
        }, view);
        var discountgroup = new BaseDisplayObjectContainer();
        discountgroup.x = iconbg.x + 5;
        discountgroup.y = iconbg.y + 10;
        this.addChild(discountgroup);
        var mark = BaseBitmap.create("common_shopmark");
        discountgroup.addChild(mark);
        var markNum = data.rebate * 10;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
            markNum = (10 - data.rebate * 10) * 10;
        }
        var markTxt = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheDiscount", ["" + markNum]), 12, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, markTxt, mark);
        discountgroup.addChild(markTxt);
        markTxt.anchorOffsetX = markTxt.width / 2;
        markTxt.anchorOffsetY = markTxt.height / 2;
        markTxt.x = 25;
        markTxt.y = 20;
        markTxt.rotation = -45;
        discountgroup.setScale(1.3);
        var descbg = BaseBitmap.create("newsingledaytab4descbg-" + code);
        this.addChild(descbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descbg, iconbg, [iconbg.width - 10, 0]);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay2019gift" + giftid + "desc-" + code), 18, TextFieldConst.COLOR_BLACK);
        descText.width = 200;
        descText.lineSpacing = 5;
        this.addChild(descText);
        descText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descText, descbg, [10, 0]);
        var originTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab3OldProce-1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        var gemicon = BaseBitmap.create("public_icon1");
        var originPrice = ComponentManager.getTextField("x" + data.price, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var line = BaseBitmap.create("shopview_line");
        line.width = 150;
        this.addChild(originTxt);
        this.addChild(gemicon);
        this.addChild(originPrice);
        this.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, line, bg, [440, 80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originTxt, line, [7, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemicon, originTxt, [originTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPrice, gemicon, [gemicon.width, 0]);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", function () {
            //
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var limitNum = data.limit - view.vo.getBuyShopList2(data.id);
            if (limitNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < (data.price * data.rebate)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal("acSingleDay2019Tip6-" + code, ["" + (data.price * data.rebate).toFixed(0), LanguageManager.getlocal("acSingleDay2019gift" + giftid + "-" + code)]),
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: false,
                    callback: function () {
                        _this.vo.lastidx = _this._index;
                        _this.vo.lasttype = 2;
                        _this.vo.buytype = data.type;
                        _this.vo.lastpos = btn.localToGlobal(btn.width / 2 + 50, 20);
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY, {
                            mType: 2,
                            itemKey: data.id,
                            activeId: _this.aid + "-" + _this._code
                        });
                    },
                    handler: _this,
                    needClose: 1,
                    needCancel: true,
                    bgRes: "newsingledaytab4gift" + giftid + "showbg-" + _this.getUiCode(),
                    height: 80,
                    titleTfColor: TextFieldConst.COLOR_BLACK,
                    titleTfOffY: 14
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, line, [0, line.height + 20]);
        this.addChild(btn);
        btn.setText("x" + (data.price * data.rebate).toFixed(0), false);
        btn.addTextIcon("public_icon1");
        view._btn = btn;
        var limitNum = data.limit - view.vo.getBuyShopList2(data.id);
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]), 18, 0x21eb39);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, descbg, [0, -limitTxt.height - 3]);
        view._limitTxt = limitTxt;
        limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
        this.refresh();
    };
    AcSingleDay2019GiftItem.prototype.refresh = function () {
        var view = this;
        var data = view._data;
        var limitNum = data.limit - view.vo.getBuyShopList2(data.id);
        view._limitTxt.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
        view._limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
        view._btn.setGray(limitNum == 0);
    };
    AcSingleDay2019GiftItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcSingleDay2019GiftItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSingleDay2019GiftItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._limitTxt = null;
        this._btn = null;
        this._data = null;
    };
    return AcSingleDay2019GiftItem;
}(ScrollListItem));
__reflect(AcSingleDay2019GiftItem.prototype, "AcSingleDay2019GiftItem");
//# sourceMappingURL=AcSingleDay2019GiftItem.js.map