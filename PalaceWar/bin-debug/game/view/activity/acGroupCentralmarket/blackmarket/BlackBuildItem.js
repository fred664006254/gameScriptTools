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
var BlackBuildItem = (function (_super) {
    __extends(BlackBuildItem, _super);
    function BlackBuildItem() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(BlackBuildItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BLACKMARKET, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlackBuildItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BLACKMARKET, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlackBuildItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_BLACKMARKET + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    BlackBuildItem.prototype.initItem = function (index, data, item) {
        var view = this;
        view._code = item;
        var itemCfg = data;
        view._itemCfg = itemCfg;
        var bg = BaseBitmap.create("acsingledayitembg"); //public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rIcon = GameData.getRewardItemIcons(data.item, true, false); // itemCfg.rewardIcons[0];
        var itemInfo = Config.ItemCfg.getItemCfgById(itemCfg.item.split('_')[1]);
        var nametTxt = itemInfo.nameTxt;
        nametTxt.setPosition(bg.x + (bg.width - nametTxt.width) / 2, bg.y + 30);
        nametTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nametTxt);
        var icon = GameData.getItemIcon(GameData.formatRewardItem(itemCfg.item)[0], true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nametTxt.y + nametTxt.height + 5);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        if (itemCfg.limit2) {
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
            var limitNum = itemCfg.limit2 - view.vo.getLimitBuyNum(itemCfg.id);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]), 18, 0xa87e00);
            view.addChild(limitTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
            var mark = BaseBitmap.create("common_shopmark");
            mark.setPosition(5.5, 5.5);
            this.addChild(mark);
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
        view._composeBtn = composeBtn;
        if (itemCfg.limit2) {
            var limitNum = itemCfg.limit2 - view.vo.getLimitBuyNum(itemCfg.id);
            if (limitNum <= 0) {
                view._composeBtn.setGray(true);
            }
        }
    };
    BlackBuildItem.prototype.refreshItem = function () {
        var view = this;
        view.vo.isTouch = null;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit2 - view.vo.getLimitBuyNum(itemCfg.id);
            if (limitNum <= 0) {
                view._composeBtn.setGray(true);
            }
            view._limitTxt.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
        }
    };
    BlackBuildItem.prototype.composeHandler = function () {
        var view = this;
        var itemcfg = this._itemCfg;
        view.vo.isTouch = view._itemCfg.id;
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var limitNum = itemcfg.limit2 - view.vo.getLimitBuyNum(itemcfg.id);
        if (limitNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBlackMarketybuyTips"));
            return;
        }
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < this._itemCfg.price * this._itemCfg.rebate) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
            return;
        }
        NetManager.request(NetRequestConst.REQYEST_ACTIVITY_BLACKMARKET, {
            activeId: view.acTivityId,
            rKey: view._itemCfg.id,
            mType: "blackMkt",
        });
    };
    /**
     * 不同格子X间距
     */
    BlackBuildItem.prototype.getSpaceX = function () {
        return 5;
    };
    /**
     * 不同格子Y间距
     */
    BlackBuildItem.prototype.getSpaceY = function () {
        return 5;
    };
    BlackBuildItem.prototype.dispose = function () {
        this._itemCfg = null;
        this._composeBtn = null;
        _super.prototype.dispose.call(this);
    };
    return BlackBuildItem;
}(ScrollListItem));
__reflect(BlackBuildItem.prototype, "BlackBuildItem");
//# sourceMappingURL=BlackBuildItem.js.map