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
 * desc : item
 */
var AcSingleDay2019ShopItem = (function (_super) {
    __extends(AcSingleDay2019ShopItem, _super);
    function AcSingleDay2019ShopItem() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._btn = null;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcSingleDay2019ShopItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ShopItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ShopItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ShopItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_SINGLEDAY2019;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ShopItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019ShopItem.prototype.getUiCode = function () {
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
    AcSingleDay2019ShopItem.prototype.initItem = function (index, data, item) {
        var view = this;
        view._code = item;
        var itemCfg = data;
        view._data = itemCfg;
        var bg = BaseBitmap.create("acsingledayitembg"); //public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rIcon = itemCfg.item;
        var itemInfo = Config.ItemCfg.getItemCfgById(itemCfg.item.split('_')[1]);
        var nametTxt = itemInfo.nameTxt;
        nametTxt.setPosition(bg.x + (bg.width - nametTxt.width) / 2, bg.y + 30);
        nametTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nametTxt);
        var icon = GameData.getItemIcon(GameData.formatRewardItem(itemCfg.item)[0], true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nametTxt.y + nametTxt.height + 5);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        if (itemCfg.limit) {
            var tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
            view.addChild(tag);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [(itemCfg.rebate * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
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
            var limitNum = itemCfg.limit - view.vo.getBuyShopList2(itemCfg.id);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]), 18, 0xa87e00);
            view.addChild(limitTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
            // let mark:BaseBitmap=BaseBitmap.create("common_shopmark");
            // mark.setPosition(5.5,5.5);
            // this.addChild(mark);
            // let markTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("composeTimeLimitDesc"),12,TextFieldConst.COLOR_BROWN);
            // markTxt.anchorOffsetX=markTxt.width/2;
            // markTxt.anchorOffsetY=markTxt.height/2;
            // markTxt.rotation=-45;
            // markTxt.setPosition(mark.width/3+7,mark.height/3+7);
            // this.addChild(markTxt);
            view._limitTxt = limitTxt;
        }
        //原价
        var originTxt = ComponentManager.getTextField(LanguageManager.getlocal('originalPriceTitle') + "：", 20, 0xbb2800);
        view.addChild(originTxt);
        var goldGemBM = BaseBitmap.create("public_icon1");
        goldGemBM.width = 30;
        goldGemBM.height = 30;
        view.addChild(goldGemBM);
        var originPriceTxt = ComponentManager.getTextField(itemCfg.price.toString(), 20, 0xbb2800);
        view.addChild(originPriceTxt);
        var distance = (bg.width - originTxt.textWidth - 30 - 5 - originPriceTxt.textWidth) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, originTxt, bg, [distance, icon.y + icon.height + 25]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldGemBM, originTxt, [originTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width + 5, 0]);
        var shopline = BaseBitmap.create("shopview_line");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, goldGemBM);
        view.addChild(shopline);
        shopline.visible = itemCfg.rebate < 1;
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height - composeBtn.height - 20);
        view.addChild(composeBtn);
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 30;
        oneGemBM.height = 30;
        view.addChild(oneGemBM);
        var priceTxt = ComponentManager.getTextField(Math.ceil(itemCfg.rebate * itemCfg.price).toString(), 20, TextFieldConst.COLOR_BLACK);
        view.addChild(priceTxt);
        distance = (composeBtn.width - priceTxt.textWidth - 30 - 5) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, oneGemBM, composeBtn, [distance, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, priceTxt, oneGemBM, [oneGemBM.width + 5, 0]);
        view._btn = composeBtn;
        if (itemCfg.limit) {
            var limitNum = itemCfg.limit - view.vo.getBuyShopList2(itemCfg.id);
            if (limitNum <= 0) {
                view._btn.setGray(true);
            }
        }
    };
    AcSingleDay2019ShopItem.prototype.refresh = function () {
        var view = this;
        var itemCfg = view._data;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit - view.vo.getBuyShopList2(itemCfg.id);
            view._limitTxt.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
            view._btn.setGray(limitNum <= 0);
        }
    };
    AcSingleDay2019ShopItem.prototype.composeHandler = function () {
        var view = this;
        var data = view._data;
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
            this.vo.lastidx = this._index;
            this.vo.lasttype = 2;
            this.vo.buytype = data.type;
            this.vo.lastpos = view._btn.localToGlobal(view._btn.width / 2 + 50, 20);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY, {
                mType: 2,
                itemKey: data.id,
                activeId: this.aid + "-" + this._code
            });
        }
    };
    /**
     * 不同格子X间距
     */
    AcSingleDay2019ShopItem.prototype.getSpaceX = function () {
        return 5;
    };
    /**
     * 不同格子Y间距
     */
    AcSingleDay2019ShopItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSingleDay2019ShopItem.prototype.dispose = function () {
        this._data = null;
        this._limitTxt = null;
        this._btn = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019ShopItem;
}(ScrollListItem));
__reflect(AcSingleDay2019ShopItem.prototype, "AcSingleDay2019ShopItem");
//# sourceMappingURL=AcSingleDay2019ShopItem.js.map