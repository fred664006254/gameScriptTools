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
var AcMergeActiveShopScrollItem = (function (_super) {
    __extends(AcMergeActiveShopScrollItem, _super);
    function AcMergeActiveShopScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    Object.defineProperty(AcMergeActiveShopScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveShopScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveShopScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcMergeActiveView.AID + "-" + AcMergeActiveView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcMergeActiveShopScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var innerbg = BaseBitmap.create("public_listbg");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 145;
        leftBg.height = 152;
        leftBg.x = 5;
        leftBg.y = 5;
        this.addChild(leftBg);
        // 图标
        var itemVo = GameData.formatRewardItem("6_" + this._itemData.itemID + "_1")[0];
        var itemicon = GameData.getItemIcon(itemVo, true, false);
        itemicon.x = 75 - itemicon.width * itemicon.scaleX / 2;
        itemicon.y = 86 - itemicon.height * itemicon.scaleY / 2;
        this.addChild(itemicon);
        // 名字
        var nameTxt = ComponentManager.getTextField(itemVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 160;
        nameTxt.y = 35 - nameTxt.height / 2;
        this.addChild(nameTxt);
        // 描述
        var descTxt = ComponentManager.getTextField(itemVo.desc, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        descTxt.width = 212;
        descTxt.x = 160;
        descTxt.y = 60;
        this.addChild(descTxt);
        // 限购
        var limit = this._itemData.limit;
        if (this.vo.shop[this._itemData.day]) {
            var buyCount = this.vo.shop[this._itemData.day][this._itemData.shopId];
            if (buyCount) {
                limit -= buyCount;
            }
        }
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayLimit", [String(limit)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        limitTxt.x = 510 - limitTxt.width / 2;
        limitTxt.y = 130 - limitTxt.height / 2;
        this.addChild(limitTxt);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.reviceBtnClick, this);
        this._reviceBtn.setText(String(this._itemData.rebate_price), false);
        this._reviceBtn.x = 510 - this._reviceBtn.width / 2;
        this._reviceBtn.y = 86 - this._reviceBtn.height / 2;
        this._reviceBtn.addTextIcon("public_icon1", 1);
        this.addChild(this._reviceBtn);
        //原价
        var originalPriceTF = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle") + ":", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        originalPriceTF.y = this._reviceBtn.y - 25;
        this.addChild(originalPriceTF);
        var goldIcon1 = BaseBitmap.create("public_icon1");
        goldIcon1.setScale(30 / goldIcon1.width);
        goldIcon1.y = this._reviceBtn.y - 30;
        this.addChild(goldIcon1);
        var oldPriceTxt = ComponentManager.getTextField(String(this._itemData.price), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        oldPriceTxt.y = originalPriceTF.y;
        this.addChild(oldPriceTxt);
        // 原价处多元素统一设置位置
        originalPriceTF.x = this._reviceBtn.x + this._reviceBtn.width / 2 - (originalPriceTF.width + goldIcon1.width * goldIcon1.scaleX + oldPriceTxt.width + 3 * 2) / 2;
        goldIcon1.x = originalPriceTF.x + originalPriceTF.width + 2;
        oldPriceTxt.x = goldIcon1.x + goldIcon1.width * goldIcon1.scaleX + 2;
        var discountSp = BaseBitmap.create("public_limitline");
        discountSp.width = (originalPriceTF.width + goldIcon1.width * goldIcon1.scaleX + oldPriceTxt.width + 3 * 2);
        discountSp.x = originalPriceTF.x;
        discountSp.y = oldPriceTxt.y + 7;
        this.addChild(discountSp);
        innerbg.height = 170;
        this.height = innerbg.height + 5;
    };
    /**
     * 领取奖励Click
     */
    AcMergeActiveShopScrollItem.prototype.reviceBtnClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        // 限购
        var limit = this._itemData.limit;
        if (this.vo.shop[this._itemData.day]) {
            var buyCount = this.vo.shop[this._itemData.day][this._itemData.shopId];
            if (buyCount >= limit) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acHuLaoGiftLimitNumTip', [String(limit)]));
                return;
            }
        }
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = this._itemData.rebate_price;
        var message = LanguageManager.getlocal("acHuLaoGiftBuyConfirm", [String(needGem), GameData.formatRewardItem("6_" + this._itemData.itemID + "_1")[0].name]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { useNum: needGem, confirmCallback: this.buyReal, handler: this, icon: "itemicon1", iconBg: "itembg_1", num: gem, msg: message, id: 1 });
    };
    AcMergeActiveShopScrollItem.prototype.buyReal = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = this._itemData.rebate_price;
        if (gem < needGem) {
            App.CommonUtil.showTip(LanguageManager.getlocal('allianceBossOpen_tip5'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYMERGEACTIVESHOP, { activeId: this.acTivityId, thedays: this._itemData.day, shopId: this._itemData.shopId });
    };
    AcMergeActiveShopScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMergeActiveShopScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._aidAndCode = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        this._countText = null;
        _super.prototype.dispose.call(this);
    };
    return AcMergeActiveShopScrollItem;
}(ScrollListItem));
__reflect(AcMergeActiveShopScrollItem.prototype, "AcMergeActiveShopScrollItem");
