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
 * 折扣商店购买确认
 * date 2019.11.29
 * author ycg
 * @class AcAnniversaryShop2020BuyItemPopupView
 */
var AcAnniversaryShop2020BuyItemPopupView = (function (_super) {
    __extends(AcAnniversaryShop2020BuyItemPopupView, _super);
    function AcAnniversaryShop2020BuyItemPopupView() {
        var _this = _super.call(this) || this;
        _this.aid = null;
        _this.code = null;
        _this.type = null;
        _this.id = null;
        _this._callback = null;
        _this._obj = null;
        _this._useVoucherNum = 0;
        _this._dragProgressBar = null;
        _this._dragNumBg = null;
        _this._dragNumTf = null;
        _this._maxUseNum = 0;
        return _this;
    }
    AcAnniversaryShop2020BuyItemPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this.type = this.param.data.type;
        this.id = this.param.data.id;
        if (this.param.data.callback) {
            this._callback = this.param.data.callback;
            this._obj = this.param.data.obj;
        }
        var moneyBg = BaseBitmap.create("public_9_mainicontimebg");
        moneyBg.setPosition(50 + GameData.popupviewOffsetX, 15);
        this.addChildToContainer(moneyBg);
        moneyBg.name = "moneyBg";
        var gemBM = BaseBitmap.create("public_icon1");
        gemBM.width = 50;
        gemBM.height = 46;
        gemBM.setPosition(25 + GameData.popupviewOffsetX, 10);
        this.addChildToContainer(gemBM);
        var playerGem = Api.playerVoApi.getPlayerGem();
        var moneyInfo = ComponentManager.getTextField("" + playerGem, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        moneyInfo.x = gemBM.x + gemBM.width + 5;
        moneyBg.width = moneyInfo.width + gemBM.width / 2 + 35;
        moneyBg.height = moneyInfo.height + 10;
        moneyInfo.y = moneyBg.y + moneyBg.height / 2 - moneyInfo.height / 2 + 1;
        this.addChildToContainer(moneyInfo);
        moneyInfo.name = "moneyInfo";
        var moneyAddBtn = ComponentManager.getButton("mainui_btn1", "", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }, this);
        moneyAddBtn.setPosition(moneyBg.x + moneyBg.width - 20, moneyBg.y + moneyBg.height / 2 - moneyAddBtn.height / 2);
        this.addChildToContainer(moneyAddBtn);
        moneyAddBtn.name = "moneyAddBtn";
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        // bg.height = 640;
        bg.x = 20 + GameData.popupviewOffsetX;
        bg.y = moneyAddBtn.y + moneyAddBtn.height + 6;
        this.addChildToContainer(bg);
        var shopBgStr = ResourceManager.hasRes("anniversaryshop_buybg-" + this.getTypeCode()) ? "anniversaryshop_buybg-" + this.getTypeCode() : "anniversaryshop_buybg-1";
        var shopBg = BaseBitmap.create(shopBgStr);
        shopBg.setPosition(bg.x + 5, bg.y + 5);
        shopBg.width = bg.width - 10;
        this.addChildToContainer(shopBg);
        var itemNameBg = BaseBitmap.create("fourpeople_bottom");
        this.addChildToContainer(itemNameBg);
        var itemCfg = Config.ItemCfg.getItemCfgById(this.cfg.itemId);
        var itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        itemNameBg.width = itemName.width + 50;
        itemNameBg.height = itemName.height + 16;
        itemNameBg.setPosition(shopBg.x + shopBg.width / 2 - itemNameBg.width / 2, shopBg.y + 10);
        itemName.setPosition(itemNameBg.x + itemNameBg.width / 2 - itemName.width / 2, itemNameBg.y + itemNameBg.height / 2 - itemName.height / 2);
        this.addChildToContainer(itemName);
        var icon = GameData.getItemIcon(itemCfg, false);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, itemName.y + itemName.height + 10);
        this.addChildToContainer(icon);
        var iconBg = icon.getChildByName("iconBg");
        iconBg.visible = false;
        var voucherNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        var currVoucher = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_voucherCurrNum-" + this.getTypeCode(), ["" + voucherNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        currVoucher.setPosition(shopBg.x + shopBg.width / 2 - currVoucher.width / 2, shopBg.y + shopBg.height - 35);
        this.addChildToContainer(currVoucher);
        var bottomBg = BaseBitmap.create("public_9_bg14");
        bottomBg.width = shopBg.width - 10;
        bottomBg.height = 315;
        bottomBg.setPosition(shopBg.x + shopBg.width / 2 - bottomBg.width / 2, shopBg.y + shopBg.height + 5);
        this.addChildToContainer(bottomBg);
        var descBg = BaseBitmap.create("public_9_managebg");
        descBg.width = bottomBg.width - 20;
        descBg.height = 150;
        descBg.setPosition(bottomBg.x + bottomBg.width / 2 - descBg.width / 2, bottomBg.y + 15);
        this.addChildToContainer(descBg);
        var dataCfg = this.cfg.getShopCfgById(this.id, this.type);
        var buyName = "";
        if (this.type == 1) {
            buyName = LanguageManager.getlocal("acAnniversaryShop2020_giftName" + dataCfg.giftTpye + "-" + this.getTypeCode());
        }
        else {
            var buyItemId = (dataCfg.item).split("_")[1];
            var buyItemCfg = Config.ItemCfg.getItemCfgById(buyItemId);
            buyName = buyItemCfg.name;
        }
        //进度条
        this._useVoucherNum = 0;
        var needVocherNum = Math.ceil(dataCfg.price * dataCfg.maxDiscount / this.cfg.exchangeGem);
        var canUseVocherNum = needVocherNum;
        if (voucherNum < needVocherNum) {
            canUseVocherNum = voucherNum;
        }
        if (canUseVocherNum > 0) {
            this._useVoucherNum = 1;
        }
        else {
            this._useVoucherNum = 0;
        }
        this._maxUseNum = canUseVocherNum;
        this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", canUseVocherNum, this.dragCallback, this, null, this._useVoucherNum, 280);
        this._dragProgressBar.setPosition(descBg.x + 60, descBg.y + 20);
        this.addChildToContainer(this._dragProgressBar);
        this._dragProgressBar.setMinNum(0);
        this._dragNumBg = BaseBitmap.create("public_9_bg5");
        this._dragNumBg.width = 90;
        this._dragNumBg.setPosition(this._dragProgressBar.x + this._dragProgressBar.width - 50, this._dragProgressBar.y + this._dragProgressBar.height / 2 - this._dragNumBg.height / 2 - 5);
        this.addChildToContainer(this._dragNumBg);
        this._dragNumTf = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_dragNum-" + this.getTypeCode(), ["" + this._useVoucherNum, "" + canUseVocherNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._dragNumTf.setPosition(this._dragNumBg.x + this._dragNumBg.width / 2 - this._dragNumTf.width / 2, this._dragNumBg.y + this._dragNumBg.height / 2 - this._dragNumTf.height / 2 + 3);
        this.addChildToContainer(this._dragNumTf);
        this._dragNumTf.setColor(canUseVocherNum > 0 ? TextFieldConst.COLOR_LIGHT_YELLOW : TextFieldConst.COLOR_WARN_RED2);
        var enoughNum = this._useVoucherNum * this.cfg.exchangeGem - dataCfg.price * dataCfg.maxDiscount;
        var price = 0;
        if (enoughNum <= 0) {
            price = dataCfg.price - this._useVoucherNum * this.cfg.exchangeGem;
        }
        else {
            price = dataCfg.price * (1 - dataCfg.maxDiscount);
        }
        if (price < 0) {
            price = 0;
        }
        var buyNum = "1";
        if (this.type == 2) {
            buyNum = (dataCfg.item).split("_")[2];
        }
        var buyInfo = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_buyInfo-" + this.getTypeCode(), ["" + price, buyNum, buyName]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BLACK);
        buyInfo.anchorOffsetX = buyInfo.width / 2;
        buyInfo.setPosition(descBg.x + descBg.width / 2, this._dragProgressBar.y + this._dragProgressBar.height + 15);
        this.addChildToContainer(buyInfo);
        buyInfo.name = "buyInfo";
        // let enoughNum = this._useVoucherNum * this.cfg.exchangeGem - dataCfg.price;
        if (this._maxUseNum <= 0) {
            this._dragProgressBar.setPercentage(0);
            this._dragProgressBar.setGray(true);
            this._dragProgressBar.isTouch(false);
            var notHaveVoucherInfo = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_useVoucherInfo-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
            notHaveVoucherInfo.setPosition(descBg.x + descBg.width / 2 - notHaveVoucherInfo.width / 2, buyInfo.y + buyInfo.height + 10);
            this.addChildToContainer(notHaveVoucherInfo);
            notHaveVoucherInfo.name = "buyEmpty";
        }
        else {
            var notUseVoucherTip = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_notuseVoucherInfo-" + this.getTypeCode(), ["" + this._useVoucherNum, "" + (this._useVoucherNum * this.cfg.exchangeGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            notUseVoucherTip.anchorOffsetX = notUseVoucherTip.width / 2;
            notUseVoucherTip.setPosition(descBg.x + descBg.width / 2, buyInfo.y + buyInfo.height + 10);
            this.addChildToContainer(notUseVoucherTip);
            notUseVoucherTip.name = "buyNotUse";
            var buyEnoughInfo = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_enoughInfo-" + this.getTypeCode(), ["" + this._useVoucherNum, "" + (this._useVoucherNum * this.cfg.exchangeGem), "" + enoughNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
            buyEnoughInfo.anchorOffsetX = buyEnoughInfo.width / 2;
            buyEnoughInfo.setPosition(descBg.x + descBg.width / 2, buyInfo.y + buyInfo.height + 10);
            this.addChildToContainer(buyEnoughInfo);
            buyEnoughInfo.name = "buyEnough";
            if (enoughNum <= 0) {
                notUseVoucherTip.visible = true;
                buyEnoughInfo.visible = false;
            }
            else {
                notUseVoucherTip.visible = false;
                buyEnoughInfo.visible = true;
            }
        }
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_RED, "cancelBtn", this.cancelBuyBtnClick, this);
        cancelBtn.setPosition(descBg.x + 30, descBg.y + descBg.height + 15);
        this.addChildToContainer(cancelBtn);
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "confirmBtn", this.enterBuyBtnClick, this);
        enterBtn.setPosition(descBg.x + descBg.width - 30 - enterBtn.width, descBg.y + descBg.height + 15);
        this.addChildToContainer(enterBtn);
        var discount = (1 - dataCfg.maxDiscount) * 100;
        var buyTips = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_voucherTip-" + this.getTypeCode(), ["" + discount]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buyTips.width = descBg.width - 30;
        buyTips.lineSpacing = 5;
        buyTips.setPosition(descBg.x + descBg.width / 2 - buyTips.width / 2, cancelBtn.y + cancelBtn.height + 16);
        this.addChildToContainer(buyTips);
        bg.height = buyTips.y + buyTips.height + 20 - bg.y;
    };
    /**
     * 滑动条的监听事件
     */
    AcAnniversaryShop2020BuyItemPopupView.prototype.dragCallback = function (curNum) {
        App.LogUtil.log("dragcall: ** " + curNum);
        this._useVoucherNum = curNum;
        var buyInfo = this.container.getChildByName("buyInfo");
        var buyEnough = this.container.getChildByName("buyEnough");
        var buyNotUse = this.container.getChildByName("buyNotUse");
        var dataCfg = this.cfg.getShopCfgById(this.id, this.type);
        var buyName = "";
        if (this.type == 1) {
            buyName = LanguageManager.getlocal("acAnniversaryShop2020_giftName" + dataCfg.giftTpye + "-" + this.getTypeCode());
        }
        else {
            var buyItemId = (dataCfg.item).split("_")[1];
            var buyItemCfg = Config.ItemCfg.getItemCfgById(buyItemId);
            buyName = buyItemCfg.name;
        }
        var enoughNum = this._useVoucherNum * this.cfg.exchangeGem - dataCfg.price * dataCfg.maxDiscount;
        var price = 0;
        if (enoughNum <= 0) {
            price = dataCfg.price - this._useVoucherNum * this.cfg.exchangeGem;
        }
        else {
            price = dataCfg.price * (1 - dataCfg.maxDiscount);
        }
        if (price < 0) {
            price = 0;
        }
        var buyNum = "1";
        if (this.type == 2) {
            buyNum = (dataCfg.item).split("_")[2];
        }
        buyInfo.text = LanguageManager.getlocal("acAnniversaryShop2020_buyInfo-" + this.getTypeCode(), ["" + price, buyNum, buyName]);
        buyInfo.anchorOffsetX = buyInfo.width / 2;
        // let enoughNum = curNum * this.cfg.exchangeGem - dataCfg.price;
        if (enoughNum <= 0) {
            enoughNum = 0;
            buyNotUse.text = LanguageManager.getlocal("acAnniversaryShop2020_notuseVoucherInfo-" + this.getTypeCode(), ["" + this._useVoucherNum, "" + (this._useVoucherNum * this.cfg.exchangeGem)]);
            buyNotUse.anchorOffsetX = buyNotUse.width / 2;
            buyEnough.visible = false;
            buyNotUse.visible = true;
        }
        else {
            buyEnough.text = LanguageManager.getlocal("acAnniversaryShop2020_enoughInfo-" + this.getTypeCode(), ["" + this._useVoucherNum, "" + (this._useVoucherNum * this.cfg.exchangeGem), "" + enoughNum]);
            buyEnough.anchorOffsetX = buyEnough.width / 2;
            buyEnough.visible = true;
            buyNotUse.visible = false;
        }
        this._dragNumTf.text = LanguageManager.getlocal("acAnniversaryShop2020_dragNum-" + this.getTypeCode(), ["" + curNum, "" + this._maxUseNum]);
        this._dragNumTf.x = this._dragNumBg.x + this._dragNumBg.width / 2 - this._dragNumTf.width / 2;
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.enterBuyBtnClick = function () {
        var voucherNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        var useNum = this._useVoucherNum;
        if (voucherNum <= 0) {
            useNum = 0;
        }
        var dataCfg = this.cfg.getShopCfgById(this.id, this.type);
        var playerGem = Api.playerVoApi.getPlayerGem();
        if (useNum * this.cfg.exchangeGem + playerGem < dataCfg.price) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acAnniversaryShop2020_buyFail-" + this.getTypeCode()));
            return;
        }
        if (this._callback) {
            this._callback.apply(this._obj, [useNum]);
        }
        this.hide();
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.cancelBuyBtnClick = function () {
        this.hide();
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.refreshView = function () {
        var moneyBg = this.container.getChildByName("moneyBg");
        var moneyInfo = this.container.getChildByName("moneyInfo");
        var moneyAddBtn = this.container.getChildByName("moneyAddBtn");
        moneyInfo.text = "" + Api.playerVoApi.getPlayerGem();
        moneyBg.width = moneyInfo.width + 60;
        moneyAddBtn.x = moneyBg.x + moneyBg.width - 20;
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.getTypeCode = function () {
        return this.param.data.code;
    };
    Object.defineProperty(AcAnniversaryShop2020BuyItemPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnniversaryShop2020BuyItemPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAnniversaryShop2020BuyItemPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.getTitleStr = function () {
        return "acAnniversaryShop2020_buyTitle-" + this.getTypeCode();
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "fourpeople_bottom", "progress2", "progress2_bg"
        ]);
    };
    AcAnniversaryShop2020BuyItemPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.aid = null;
        this.code = null;
        this.type = null;
        this.id = null;
        this._callback = null;
        this._obj = null;
        this._useVoucherNum = 0;
        this._dragProgressBar = null;
        this._dragNumBg = null;
        this._dragNumTf = null;
        this._maxUseNum = 0;
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020BuyItemPopupView;
}(PopupView));
__reflect(AcAnniversaryShop2020BuyItemPopupView.prototype, "AcAnniversaryShop2020BuyItemPopupView");
//# sourceMappingURL=AcAnniversaryShop2020BuyItemPopupView.js.map