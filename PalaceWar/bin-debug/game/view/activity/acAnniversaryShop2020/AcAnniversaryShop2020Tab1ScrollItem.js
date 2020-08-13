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
 * 特惠礼包 item
 * author ycg
 * date 2019.11.28
 * @class AcAnniversaryShop2020Tab1ScrollItem
 */
var AcAnniversaryShop2020Tab1ScrollItem = (function (_super) {
    __extends(AcAnniversaryShop2020Tab1ScrollItem, _super);
    function AcAnniversaryShop2020Tab1ScrollItem() {
        return _super.call(this) || this;
    }
    AcAnniversaryShop2020Tab1ScrollItem.prototype.initItem = function (index, data, param) {
        var _this = this;
        this._aid = param.aid;
        this._code = param.code;
        this._data = data;
        var view = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(param.aid, param.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(param.aid, param.code);
        this._vo = vo;
        var giftType = data.giftTpye;
        var bgStr = ResourceManager.hasRes("anniversaryshop_gift_itembg-" + this.getTypeCode() + "_" + giftType) ? "anniversaryshop_gift_itembg-" + this.getTypeCode() + "_" + giftType : "anniversaryshop_gift_itembg-1_" + giftType;
        var bg = BaseBitmap.create(bgStr);
        this.addChild(bg);
        this.height = bg.height;
        if (index == param.dataLength) {
            this.height += 100;
        }
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_giftName" + giftType + "-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0, 13]);
        var iconBgStr = ResourceManager.hasRes("anniversaryshop_gift_bg-" + this.getTypeCode() + "_" + giftType) ? "anniversaryshop_gift_bg-" + this.getTypeCode() + "_" + giftType : "anniversaryshop_gift_bg-1_" + giftType;
        var iconBg = BaseBitmap.create(iconBgStr);
        this.addChild(iconBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, iconBg, bg, [45, 40]);
        var iconStr = ResourceManager.hasRes("anniversaryshop_gift-" + this.getTypeCode() + "_" + giftType) ? "anniversaryshop_gift-" + this.getTypeCode() + "_" + giftType : "anniversaryshop_gift-1_" + giftType;
        var icon = BaseBitmap.create(iconStr);
        this.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconBg);
        var showBgName = ResourceManager.hasRes("anniversaryshop_giftshowbg-" + this.getTypeCode() + "_" + giftType) ? "anniversaryshop_giftshowbg-" + this.getTypeCode() + "_" + giftType : "anniversaryshop_giftshowbg-1_" + giftType;
        icon.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNIVERSARYSHOP2020GIFTPOPUPVIEW, {
                titleName: "acAnniversaryShop2020_giftName" + giftType + "-" + _this.getTypeCode(),
                reward: data.item,
                bgName: showBgName
            });
        }, view);
        if (data.rebate) {
            var discountgroup = new BaseDisplayObjectContainer();
            discountgroup.x = iconBg.x + 5;
            discountgroup.y = iconBg.y + 10;
            this.addChild(discountgroup);
            var mark = BaseBitmap.create("common_shopmark");
            discountgroup.addChild(mark);
            var markNum = data.rebate * 10;
            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                markNum = (10 - data.rebate * 10) * 10;
            }
            var markTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_discount-" + this.getTypeCode(), ["" + markNum]), 12, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, markTxt, mark);
            discountgroup.addChild(markTxt);
            markTxt.anchorOffsetX = markTxt.width / 2;
            markTxt.anchorOffsetY = markTxt.height / 2;
            markTxt.x = 25;
            markTxt.y = 20;
            markTxt.rotation = -45;
            discountgroup.setScale(1.3);
        }
        var descBgStr = ResourceManager.hasRes("anniversaryshop_giftinfobg-" + this.getTypeCode()) ? "anniversaryshop_giftinfobg-" + this.getTypeCode() : "anniversaryshop_giftinfobg-1";
        var descBg = BaseBitmap.create(descBgStr);
        this.addChild(descBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descBg, iconBg, [iconBg.width - 10, 0]);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_giftInfo" + giftType + "-" + this.getTypeCode()), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        descText.width = 200;
        descText.lineSpacing = 5;
        this.addChild(descText);
        descText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descText, descBg, [5, 0]);
        var originTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_originPrice-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var gemicon = BaseBitmap.create("public_icon1");
        var originPriceNum = Math.floor(data.price / data.rebate);
        var originPrice = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_price-" + this.getTypeCode(), ["" + originPriceNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var line = BaseBitmap.create("shopview_line");
        this.addChild(originTxt);
        this.addChild(gemicon);
        this.addChild(originPrice);
        this.addChild(line);
        var priceW = originTxt.width + gemicon.width + originPrice.width;
        line.width = priceW + 16;
        originTxt.setPosition(bg.x + 516 - priceW / 2, 70);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemicon, originTxt, [originTxt.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPrice, gemicon, [gemicon.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, line, originTxt, [-8, 0]);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", function () {
            if (!vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var limitNum = data.limit - vo.getBuyShopList1(data.id);
            if (limitNum <= 0) {
                var limitStr_1 = "acAnniversaryShop2020_notBuy-" + _this.getTypeCode() + "_" + data.limitType;
                App.CommonUtil.showTip(LanguageManager.getlocal(limitStr_1));
                return;
            }
            var voucherNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemId);
            var needVocherNum = Math.ceil(data.price * data.maxDiscount / cfg.exchangeGem);
            if (needVocherNum > voucherNum) {
                needVocherNum = voucherNum;
            }
            var currGem = Api.playerVoApi.getPlayerGem();
            if (currGem + needVocherNum * cfg.exchangeGem < data.price) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnniversaryShop2020_buyFail"));
                return;
            }
            //打开购买面板
            // this.buyShopHandler();
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNIVERSARYSHOP2020BUYITEMPOPUPVIEW, { aid: _this._aid, code: _this._code, type: 1, id: data.id, callback: _this.buyShopHandler, obj: _this });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, line, [0, line.height + 20]);
        this.addChild(btn);
        btn.setText(LanguageManager.getlocal("acAnniversaryShop2020_price-" + this.getTypeCode(), ["" + data.price]), false);
        btn.addTextIcon("public_icon1");
        if (data.limit) {
            var limitNum_1 = data.limit - vo.getBuyShopList1(data.id);
            if (limitNum_1 <= 0) {
                btn.setGray(true);
            }
        }
        var limitNum = data.limit - vo.getBuyShopList1(data.id);
        var limitStr = "acAnniversaryShop2020_limit-" + this.getTypeCode();
        if (data.limitType == 2) {
            limitStr = "acAnniversaryShop2020_dayLimit-" + this.getTypeCode();
        }
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(limitStr, [limitNum.toString()]), 18, 0x167b2e);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, descBg, [4, -limitTxt.height - 3]);
        limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
    };
    AcAnniversaryShop2020Tab1ScrollItem.prototype.buyShopHandler = function (param) {
        var couponNum = 0;
        if (param) {
            couponNum = param;
        }
        App.LogUtil.log("buyShopHandler parma: " + param);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, { activeId: this._vo.aidAndCode, mType: 1, itemKey: this._data.id, couponNum: couponNum });
    };
    AcAnniversaryShop2020Tab1ScrollItem.prototype.getTypeCode = function () {
        return this._code;
    };
    AcAnniversaryShop2020Tab1ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAnniversaryShop2020Tab1ScrollItem.prototype.dispose = function () {
        this._data = null;
        this._vo = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020Tab1ScrollItem;
}(ScrollListItem));
__reflect(AcAnniversaryShop2020Tab1ScrollItem.prototype, "AcAnniversaryShop2020Tab1ScrollItem");
//# sourceMappingURL=AcAnniversaryShop2020Tab1ScrollItem.js.map