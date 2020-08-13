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
var AcSingleDayBuild3Item = (function (_super) {
    __extends(AcSingleDayBuild3Item, _super);
    function AcSingleDayBuild3Item() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcSingleDayBuild3Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_SINGLEDAY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild3Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SINGLEDAY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild3Item.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_SINGLEDAY + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayBuild3Item.prototype.initItem = function (index, data, item) {
        var view = this;
        view._code = item;
        var itemCfg = data;
        view._itemCfg = itemCfg;
        var bg = BaseBitmap.create("public_dj_bg01"); //public_dj_bg01  public_9_probiginnerbg
        bg.width = 172;
        bg.height = 280;
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rIcon = itemCfg.rewardIcons[0];
        var itemInfo = Config.ItemCfg.getItemCfgById(itemCfg.itemID.split('_')[1]);
        var nametTxt = itemInfo.nameTxt;
        nametTxt.setPosition(bg.x + (bg.width - nametTxt.width) / 2, bg.y + 13);
        view.addChild(nametTxt);
        var icon = GameData.getItemIcon(GameData.formatRewardItem(itemCfg.itemID)[0], true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nametTxt.y + nametTxt.height + 7);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        if (itemCfg.limit) {
            var tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
            view.addChild(tag);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [(itemCfg.rebate * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            var tagnum = 10 - itemCfg.rebate * 10;
            if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp()) {
                tagTxt.text = LanguageManager.getlocal('discountTitle', [tagnum.toString()]);
            }
            if (PlatformManager.checkIsViSp()) {
                tagTxt.text = "-" + tagnum * 10 + "%";
            }
            tagTxt.width = 70;
            tagTxt.height = 20;
            tagTxt.textAlign = egret.HorizontalAlign.CENTER;
            tagTxt.anchorOffsetX = tagTxt.width / 2;
            tagTxt.anchorOffsetY = tagTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 24, -tagTxt.anchorOffsetY + 22]);
            tagTxt.rotation = -45;
            view.addChild(tagTxt);
            var limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id + 1);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        var originTxt = ComponentManager.getTextField(LanguageManager.getlocal('originalPriceTitle') + "：", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(originTxt);
        var goldGemBM = BaseBitmap.create("public_icon1");
        goldGemBM.width = 30;
        goldGemBM.height = 30;
        view.addChild(goldGemBM);
        var originPriceTxt = ComponentManager.getTextField(itemCfg.price.toString(), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(originPriceTxt);
        var distance = (bg.width - originTxt.textWidth - 30 - 5 - originPriceTxt.textWidth) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, originTxt, bg, [distance, icon.y + icon.height + 30]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldGemBM, originTxt, [originTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width + 5, 0]);
        var shopline = BaseBitmap.create("shopview_line");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, goldGemBM);
        view.addChild(shopline);
        shopline.visible = itemCfg.rebate < 1;
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height - composeBtn.height - 10);
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
        view._composeBtn = composeBtn;
        if (itemCfg.limit) {
            var limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id + 1);
            if (limitNum <= 0) {
                view._composeBtn.setGray(true);
            }
        }
    };
    AcSingleDayBuild3Item.prototype.refreshItem = function () {
        var view = this;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id + 1);
            if (limitNum <= 0) {
                view._composeBtn.setGray(true);
            }
            view._limitTxt.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
        }
    };
    AcSingleDayBuild3Item.prototype.composeHandler = function () {
        var view = this;
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var itemcfg = this._itemCfg;
        var limitNum = itemcfg.limit - view.vo.getLimitBuyNum(itemcfg.id + 1);
        if (limitNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        var coupon = view.vo.getMyRedpt();
        var arr = [];
        for (var i in coupon) {
            var unit = coupon[i];
            if (unit.value <= Math.ceil(itemcfg.rebate * itemcfg.price * 0.5)) {
                arr.push(unit);
            }
        }
        //if(arr.length){
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYBUYCONFIRMPOPUPVIEW, {
            id: itemcfg.id,
            price: itemcfg.rebate * itemcfg.price,
            itemid: itemcfg.itemID,
            coupon: arr,
            confirmCallback: function (param) {
                if (!view.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                var couponId = 0;
                if (param > 0) {
                    couponId = param;
                    NetManager.request(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP, {
                        activeId: view.acTivityId,
                        itemKey: itemcfg.id + 1,
                        mType: 2,
                        couponId: couponId
                    });
                }
                else {
                    NetManager.request(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP, {
                        activeId: view.acTivityId,
                        itemKey: itemcfg.id + 1,
                        mType: 2
                    });
                }
            },
            handler: view
        });
        //}
        // else{
        //     let cost = Api.playerVoApi.getPlayerGem() - Math.ceil(itemcfg.rebate * itemcfg.price);
        //     if(cost < 0){
        //         App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
        //         return;
        //     }
        //     NetManager.request(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP,{activeId : view.acTivityId, itemKey : itemcfg.id + 1, mType : 2});
        // }
    };
    /**
     * 不同格子X间距
     */
    AcSingleDayBuild3Item.prototype.getSpaceX = function () {
        return 27;
    };
    /**
     * 不同格子Y间距
     */
    AcSingleDayBuild3Item.prototype.getSpaceY = function () {
        return 20;
    };
    AcSingleDayBuild3Item.prototype.dispose = function () {
        this._itemCfg = null;
        this._composeBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild3Item;
}(ScrollListItem));
__reflect(AcSingleDayBuild3Item.prototype, "AcSingleDayBuild3Item");
