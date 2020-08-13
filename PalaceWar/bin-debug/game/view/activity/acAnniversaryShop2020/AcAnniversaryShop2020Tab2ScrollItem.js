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
 * 超值礼包 item
 * author ycg
 * date 2019.11.28
 * @class AcAnniversaryShop2020Tab2ScrollItem
 */
var AcAnniversaryShop2020Tab2ScrollItem = (function (_super) {
    __extends(AcAnniversaryShop2020Tab2ScrollItem, _super);
    function AcAnniversaryShop2020Tab2ScrollItem() {
        return _super.call(this) || this;
    }
    AcAnniversaryShop2020Tab2ScrollItem.prototype.initItem = function (index, data, param) {
        var _this = this;
        this._aid = param.aid;
        this._code = param.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(param.aid, param.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(param.aid, param.code);
        this._vo = vo;
        this._data = data;
        var view = this;
        var itemCfg = data;
        var bgStr = "acsingledayitembg";
        if (itemCfg.showType == 1) {
            bgStr = ResourceManager.hasRes("anniversaryshop_singlegiftbg-" + this.getTypeCode() + "_2") ? "anniversaryshop_singlegiftbg-" + this.getTypeCode() + "_2" : "anniversaryshop_singlegiftbg-1_2";
        }
        var bg = BaseBitmap.create(bgStr);
        bg.setPosition(3, 3);
        view.addChild(bg);
        if (index == param.dataLength) {
            view.height = bg.height + 100;
        }
        var itemInfo = Config.ItemCfg.getItemCfgById(itemCfg.item.split('_')[1]);
        var nametTxt = itemInfo.nameTxt;
        nametTxt.setPosition(bg.x + (bg.width - nametTxt.width) / 2, bg.y + 32);
        nametTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nametTxt);
        var icon = GameData.getItemIcon(GameData.formatRewardItem(itemCfg.item)[0], true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nametTxt.y + nametTxt.height + 3);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        if (itemCfg.rebate) {
            var tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
            view.addChild(tag);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('acAnniversaryShop2020_discount-' + this.getTypeCode(), [(itemCfg.rebate * 10).toString()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            var tagnum = 10 - itemCfg.rebate * 10;
            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                tagTxt.text = LanguageManager.getlocal('discountTitle', [(tagnum * 10).toString()]);
            }
            tagTxt.width = 70;
            tagTxt.height = 20;
            tagTxt.textAlign = egret.HorizontalAlign.CENTER;
            tagTxt.anchorOffsetX = tagTxt.width / 2;
            tagTxt.anchorOffsetY = tagTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 24, -tagTxt.anchorOffsetY + 22]);
            tagTxt.rotation = -45;
            view.addChild(tagTxt);
        }
        if (itemCfg.limit) {
            var limitNum = itemCfg.limit - vo.getBuyShopList2(itemCfg.id);
            var limitStr = "acAnniversaryShop2020_limit-" + this.getTypeCode();
            if (itemCfg.limitType == 2) {
                limitStr = "acAnniversaryShop2020_dayLimit-" + this.getTypeCode();
            }
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(limitStr, [limitNum.toString()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
            view.addChild(limitTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
            if (itemCfg.showType == 1) {
                limitTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }
        //原价
        var originTxt = ComponentManager.getTextField(LanguageManager.getlocal('acAnniversaryShop2020_originPrice-' + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
        view.addChild(originTxt);
        var goldGemBM = BaseBitmap.create("public_icon1");
        goldGemBM.width = 30;
        goldGemBM.height = 30;
        view.addChild(goldGemBM);
        var originPrice = Math.floor(itemCfg.price / itemCfg.rebate);
        var originPriceTxt = ComponentManager.getTextField(originPrice.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
        view.addChild(originPriceTxt);
        var priceW = originTxt.width + goldGemBM.width + originPriceTxt.width;
        originTxt.setPosition(bg.x + bg.width / 2 - priceW / 2, icon.y + icon.height + 25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldGemBM, originTxt, [originTxt.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width, 0]);
        var shopline = BaseBitmap.create("shopview_line");
        shopline.width = priceW + 16;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, shopline, originTxt, [-8, 0]);
        view.addChild(shopline);
        shopline.visible = itemCfg.rebate < 1;
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", function () {
            if (!vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var limitNum = data.limit - vo.getBuyShopList2(data.id);
            if (limitNum <= 0) {
                var limitStr = "acAnniversaryShop2020_notBuy-" + _this.getTypeCode() + "_" + data.limitType;
                App.CommonUtil.showTip(LanguageManager.getlocal(limitStr));
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNIVERSARYSHOP2020BUYITEMPOPUPVIEW, { aid: _this._aid, code: _this._code, type: 2, id: data.id, callback: _this.buyShopHandler, obj: _this });
            // this.buyShopHandler();
        }, this);
        buyBtn.setPosition(bg.x + (bg.width - buyBtn.width * buyBtn.scaleX) / 2, bg.y + bg.height - buyBtn.height - 20);
        view.addChild(buyBtn);
        buyBtn.setText(itemCfg.price.toString(), false);
        buyBtn.addTextIcon("public_icon1");
        // let oneGemBM = BaseBitmap.create("public_icon1");
        // oneGemBM.width = 30;
        // oneGemBM.height = 30;
        // view.addChild(oneGemBM);
        // let priceTxt = ComponentManager.getTextField(itemCfg.price.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // view.addChild(priceTxt);
        // let distance = (buyBtn.width - priceTxt.textWidth - 30 - 5)/2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, oneGemBM, buyBtn, [distance, 0]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, priceTxt, oneGemBM, [oneGemBM.width + 5, 0]);
        if (itemCfg.limit) {
            var limitNum = itemCfg.limit - vo.getBuyShopList2(itemCfg.id);
            if (limitNum <= 0) {
                buyBtn.setGray(true);
            }
        }
    };
    AcAnniversaryShop2020Tab2ScrollItem.prototype.buyShopHandler = function (param) {
        var couponNum = 0;
        if (param) {
            couponNum = param;
        }
        App.LogUtil.log("buyShopHandler parma: " + param);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, { activeId: this._vo.aidAndCode, mType: 2, itemKey: this._data.id, couponNum: couponNum });
    };
    AcAnniversaryShop2020Tab2ScrollItem.prototype.getTypeCode = function () {
        return this._code;
    };
    AcAnniversaryShop2020Tab2ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAnniversaryShop2020Tab2ScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._data = null;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020Tab2ScrollItem;
}(ScrollListItem));
__reflect(AcAnniversaryShop2020Tab2ScrollItem.prototype, "AcAnniversaryShop2020Tab2ScrollItem");
//# sourceMappingURL=AcAnniversaryShop2020Tab2ScrollItem.js.map