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
 * 买道具Item
 * author dky
 * date 2017/11/21
 * @class AcPunishBuyItemScrollItem
 */
var AcPunishBuyItemScrollItem = (function (_super) {
    __extends(AcPunishBuyItemScrollItem, _super);
    function AcPunishBuyItemScrollItem() {
        var _this = _super.call(this) || this;
        _this._buyButton = null;
        return _this;
    }
    AcPunishBuyItemScrollItem.prototype.initItem = function (index, data) {
        // let cfg = Config.WifebaseCfg.wifeGift
        this._itemIndex = index;
        this._itemData = data;
        this.width = 525;
        this.height = 126 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_9_bg14");
        bgBg.width = this.width;
        bgBg.height = 148;
        bgBg.scaleY = 126 / 148;
        this.addChild(bgBg);
        this._key = key;
        var itemCfg = Config.ItemCfg.getItemCfgById(data.item);
        var itemIcon = itemCfg.getIconContainer(true);
        itemIcon.setPosition(15, bgBg.height / 2 * bgBg.scaleY - itemIcon.width / 2);
        itemIcon.name = "icon";
        this.addChild(itemIcon);
        var itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        itemName.setPosition(itemIcon.x + itemIcon.width + 10, 10);
        this.addChild(itemName);
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishBuyItemPopupView.aid, AcPunishBuyItemPopupView.code);
        var maxNum = data.buyLimit;
        if (typeof (data.buyLimit) == "number") {
            maxNum = data.buyLimit;
        }
        else {
            if (data.buyLimit) {
                if (Api.switchVoApi.checkPunishVip()) {
                    maxNum = data.buyLimit[Math.min(Api.playerVoApi.getPlayerVipLevel(), 13)];
                }
                else {
                    maxNum = data.buyLimit[0];
                }
            }
        }
        var num = 0;
        if (acVo.item[(index + 1).toString()]) {
            num = acVo.item[(index + 1).toString()];
        }
        var leftNum = maxNum - num;
        var numStr = LanguageManager.getlocal("acPunishBuyItemLimit", [leftNum.toString()]);
        if (Api.switchVoApi.checkPunishVip() && Api.playerVoApi.getPlayerVipLevel() > 0 && data.buyLimit && key == "2") {
            numStr = LanguageManager.getlocal("acPunishBuyItemLimit2", [leftNum.toString()]);
            var ssTF = ComponentManager.getTextField("(", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            ssTF.setPosition(itemName.x + itemName.width + 5, itemName.y);
            this.addChild(ssTF);
            var vipBB = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).icon);
            this.addChild(vipBB);
            vipBB.setScale(0.8);
            vipBB.setPosition(ssTF.x + ssTF.width, itemName.y);
            if (!data.buyLimit) {
                // this._numTF.visible = false;
                vipBB.visible = false;
            }
        }
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._numTF.setPosition(itemName.x + itemName.width + 5, itemName.y);
        this.addChild(this._numTF);
        if (Api.switchVoApi.checkPunishVip() && Api.playerVoApi.getPlayerVipLevel() > 0 && key == "2") {
            this._numTF.setPosition(itemName.x + itemName.width + 80, itemName.y);
        }
        if (!data.buyLimit) {
            this._numTF.visible = false;
        }
        var score = LanguageManager.getlocal("acPunishBuyItemScore", [data.getScore]);
        var itemScore = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        itemScore.setPosition(itemName.x, itemName.y + itemName.height + 7);
        this.addChild(itemScore);
        var itemDescStr = "";
        for (var index = 0; index < data.drop.length; index++) {
            var iconModel = GameData.formatRewardItem(data.drop[index][0])[0];
            if (index == 0) {
                itemDescStr = iconModel.name;
            }
            else {
                itemDescStr = itemDescStr + "、" + iconModel.name;
            }
        }
        itemDescStr = LanguageManager.getlocal("acPunishBuyItemGet", [itemDescStr]);
        itemDescStr;
        //acPunishBuyItemGet
        var itemDesc = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        itemDesc.setPosition(itemName.x, itemScore.y + itemScore.height + 7);
        itemDesc.width = 260;
        this.addChild(itemDesc);
        var iconStr = "itemicon2";
        var costNumStr = 0;
        if (this._itemIndex == 0) {
            costNumStr = data.costGold;
        }
        else if (this._itemIndex == 1) {
            iconStr = "itemicon1";
            costNumStr = data.costGem;
        }
        var costIcon = BaseLoadBitmap.create(iconStr);
        costIcon.x = 400;
        costIcon.y = 5;
        costIcon.setScale(0.4);
        this.addChild(costIcon);
        var costNum = ComponentManager.getTextField(costNumStr.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        costNum.setPosition(445, itemName.y + 7);
        costNum.width = 260;
        this.addChild(costNum);
        var btnStr = "acPunishBuyItemBuy";
        var btnName = ButtonConst.BTN_SMALL_YELLOW;
        if (!data.buyLimit) {
            btnStr = "acPunishBuyItemGoNow";
            btnName = ButtonConst.BTN_SMALL_RED;
            costIcon.visible = false;
            costNum.visible = false;
        }
        var chooseBtn = ComponentManager.getButton(btnName, btnStr, this.chooseBtnClick, this);
        chooseBtn.x = 380;
        chooseBtn.y = bgBg.height / 2 * bgBg.scaleY - chooseBtn.height / 2 + 10;
        this.addChild(chooseBtn);
        chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._buyButton = chooseBtn;
        this.checkBtnRed();
    };
    AcPunishBuyItemScrollItem.prototype.checkBtnRed = function () {
        if (this._itemIndex == 0) {
            var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishBuyItemPopupView.aid, AcPunishBuyItemPopupView.code);
            if (acVo.checkHasGoldenTimes()) {
                App.CommonUtil.addIconToBDOC(this._buyButton);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._buyButton);
            }
        }
    };
    AcPunishBuyItemScrollItem.prototype.chooseBtnClick = function () {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishBuyItemPopupView.aid, AcPunishBuyItemPopupView.code);
        if (acVo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(AcPunishBuyItemPopupView.aid, AcPunishBuyItemPopupView.code);
        var startTime = acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._itemIndex != 2 && this._itemIndex != 3) {
            var maxNum = this._itemData.buyLimit;
            if (typeof (this._itemData.buyLimit) == "number") {
                maxNum = this._itemData.buyLimit;
            }
            else {
                if (this._itemData.buyLimit) {
                    if (Api.switchVoApi.checkPunishVip()) {
                        maxNum = this._itemData.buyLimit[Math.min(13, Api.playerVoApi.getPlayerVipLevel())];
                    }
                    else {
                        maxNum = this._itemData.buyLimit[0];
                    }
                }
            }
            var num = 0;
            if (acVo.item[(this._itemIndex + 1).toString()]) {
                num = acVo.item[(this._itemIndex + 1).toString()];
            }
            var leftNum = maxNum - num;
            if (!num) {
                leftNum = maxNum;
            }
            if (leftNum <= 0) {
                if (Api.switchVoApi.checkPunishVip() && this._itemIndex == 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip2"));
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip"));
                }
                return;
            }
            if (this._itemIndex == 0) {
                if (Api.playerVoApi.getPlayerGold() < this._itemData.costGold) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
                    return;
                }
            }
            else if (this._itemIndex == 1) {
                if (Api.playerVoApi.getPlayerGem() < this._itemData.costGem) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                    return;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM, { "key": this._key, "index": this._itemIndex });
        }
        if (this._itemIndex == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2, {});
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM,{"key":this._key,"index":this._itemIndex});
        }
        else if (this._itemIndex == 3) {
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM,{"key":this._key,"index":this._itemIndex});
            if (Api.acVoApi.checkActivityStartByAid("dailyCharge")) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACRECHARGEVIEW, { code: "1" });
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1, {});
            }
        }
    };
    AcPunishBuyItemScrollItem.prototype.refreshData = function (index) {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishBuyItemPopupView.aid, AcPunishBuyItemPopupView.code);
        // let maxNum = this._itemData.buyLimit;
        var maxNum = this._itemData.buyLimit;
        if (typeof (this._itemData.buyLimit) == "number") {
            maxNum = this._itemData.buyLimit;
        }
        else {
            if (this._itemData.buyLimit) {
                if (Api.switchVoApi.checkPunishVip()) {
                    maxNum = this._itemData.buyLimit[Math.min(13, Api.playerVoApi.getPlayerVipLevel())];
                }
                else {
                    maxNum = this._itemData.buyLimit[0];
                }
            }
        }
        var num = 0;
        if (acVo.item[(index + 1).toString()]) {
            num = acVo.item[(index + 1).toString()];
        }
        var leftNum = maxNum - num;
        var numStr = LanguageManager.getlocal("acPunishBuyItemLimit", [leftNum.toString()]);
        if (Api.switchVoApi.checkPunishVip() && Api.playerVoApi.getPlayerVipLevel() > 0 && this._key == "2") {
            numStr = LanguageManager.getlocal("acPunishBuyItemLimit2", [leftNum.toString()]);
        }
        this._numTF.text = numStr;
        this.checkBtnRed();
    };
    AcPunishBuyItemScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    AcPunishBuyItemScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcPunishBuyItemScrollItem.prototype.dispose = function () {
        this._numTF = null;
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        this._buyButton = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishBuyItemScrollItem;
}(ScrollListItem));
__reflect(AcPunishBuyItemScrollItem.prototype, "AcPunishBuyItemScrollItem");
//# sourceMappingURL=AcPunishBuyItemScrollItem.js.map