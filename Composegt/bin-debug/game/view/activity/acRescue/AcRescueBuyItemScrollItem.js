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
 * @class AcRescueBuyItemScrollItem
 */
var AcRescueBuyItemScrollItem = (function (_super) {
    __extends(AcRescueBuyItemScrollItem, _super);
    function AcRescueBuyItemScrollItem() {
        return _super.call(this) || this;
    }
    AcRescueBuyItemScrollItem.prototype.initItem = function (index, data) {
        // let cfg = Config.WifebaseCfg.wifeGift
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM), this.buyCallback, this);
        this._itemIndex = index;
        this._itemData = data;
        this.width = 520;
        this.height = 142 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_listbg");
        bgBg.width = this.width;
        bgBg.height = 142;
        // bgBg.scaleY = 136/148;
        this.addChild(bgBg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 126;
        leftBg.height = bgBg.height - 19;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        this._key = key;
        var itemCfg = Config.ItemCfg.getItemCfgById(data.powerItem);
        // let itemCfg = Config.ItemCfg.getItemCfgById("1401"); 
        var itemIcon = itemCfg.getIconContainer(true);
        itemIcon.setPosition(15, bgBg.height / 2 * bgBg.scaleY - itemIcon.width / 2);
        itemIcon.name = "icon";
        this.addChild(itemIcon);
        var itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemName.setPosition(itemIcon.x + itemIcon.width + 12, 15);
        this.addChild(itemName);
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        var maxNum = data.buyLimit;
        if (typeof (data.buyLimit) == "number") {
            maxNum = data.buyLimit;
        }
        else {
            if (data.buyLimit) {
                // if(Api.switchVoApi.checkPunishVip()){
                maxNum = data.buyLimit[Api.playerVoApi.getPlayerVipLevel()];
                if (!maxNum) {
                    maxNum = data.buyLimit[data.buyLimit.length - 1];
                }
                // }else{
                // 	maxNum = data.buyLimit[0];
                // }
            }
        }
        var num = 0;
        if (acVo.item[(index + 1).toString()]) {
            num = acVo.item[(index + 1).toString()];
        }
        var leftNum = maxNum - num;
        var numStr = LanguageManager.getlocal("acPunishBuyItemLimit", [leftNum.toString()]);
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._numTF.setPosition(itemName.x, itemName.y + itemName.height + 7);
        this.addChild(this._numTF);
        // if(Api.switchVoApi.checkPunishVip()&& Api.playerVoApi.getPlayerVipLevel() >0 && data.buyLimit && key == "2")
        if (Api.playerVoApi.getPlayerVipLevel() > 0 && data.buyLimit && key == "2") {
            var vipBB = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).icon);
            this.addChild(vipBB);
            vipBB.setScale(0.8);
            vipBB.setPosition(itemName.x - 6, itemName.y + itemName.height + 5);
            if (!data.buyLimit) {
                // this._numTF.visible = false;
                vipBB.visible = false;
            }
            this._numTF.setPosition(itemName.x + 65, itemName.y + itemName.height + 7);
        }
        // if(Api.switchVoApi.checkPunishVip()&& Api.playerVoApi.getPlayerVipLevel() >0 && key == "2")
        // if( Api.playerVoApi.getPlayerVipLevel() >0 && key == "2")
        // {
        // 	this._numTF.setPosition(itemName.x,itemName.y + itemName.height + 7);
        // }
        if (!data.buyLimit) {
            this._numTF.visible = false;
        }
        // let score = LanguageManager.getlocal("acPunishBuyItemScore",[data.getScore]) ;
        // let itemScore:BaseTextField = ComponentManager.getTextField(score,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // itemScore.setPosition(itemName.x,itemName.y + itemName.height + 7);
        // this.addChild(itemScore);
        var itemDescStr = LanguageManager.getlocal("rescueItemGet", [data.getPower]);
        // itemDescStr
        //acPunishBuyItemGet
        var itemDesc = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDesc.setPosition(itemName.x, this._numTF.y + this._numTF.height + 7);
        itemDesc.width = 250;
        this.addChild(itemDesc);
        var iconStr = "public_icon2";
        var costNumStr = 0;
        if (this._itemIndex == 0) {
            costNumStr = data.costGold;
        }
        else if (this._itemIndex == 1) {
            iconStr = "public_icon1";
            costNumStr = data.costGem;
        }
        var costIcon = BaseBitmap.create(iconStr);
        costIcon.x = 400;
        costIcon.y = 5;
        // costIcon.setScale(0.4)
        this.addChild(costIcon);
        var costNum = ComponentManager.getTextField(costNumStr.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        costNum.setPosition(445, itemName.y + 7);
        costNum.width = 260;
        this.addChild(costNum);
        if (this._itemIndex == 2) {
            itemDesc.y = itemDesc.y - 10;
            var acVo_1 = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
            var getNum = acVo_1.getRechargeText();
            var gettNum = ComponentManager.getTextField(getNum, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
            gettNum.setPosition(itemDesc.x, itemDesc.y + itemDesc.height + 7);
            gettNum.width = 250;
            this.addChild(gettNum);
        }
        var btnStr = "acPunishBuyItemBuy";
        var btnName = ButtonConst.BTN_SMALL_YELLOW;
        if (!data.buyLimit) {
            costIcon.visible = false;
            costNum.visible = false;
            var state = acVo.getRechargeState();
            if (state == 1) {
                btnStr = "taskCollect";
                btnName = ButtonConst.BTN_SMALL_YELLOW;
            }
            else if (state == 2) {
                btnStr = "acPunishBuyItemGoNow";
                btnName = ButtonConst.BTN_SMALL_BLUE;
            }
            else if (state == 3) {
                // btnStr = "taskCollect";
                // btnName = ButtonConst.BTN_SMALL_YELLOW;
                btnStr = "acPunishBuyItemGoNow";
                btnName = ButtonConst.BTN_SMALL_BLUE;
            }
        }
        var chooseBtn = ComponentManager.getButton(btnName, btnStr, this.chooseBtnClick, this);
        chooseBtn.x = 385;
        chooseBtn.y = bgBg.height / 2 * bgBg.scaleY - chooseBtn.height / 2 + 10;
        this.addChild(chooseBtn);
        // chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AcRescueBuyItemScrollItem.prototype.chooseBtnClick = function () {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        if (acVo.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this._itemIndex != 2 && this._itemIndex != 3) {
            var acVo_2 = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
            var maxNum = this._itemData.buyLimit;
            if (typeof (this._itemData.buyLimit) == "number") {
                maxNum = this._itemData.buyLimit;
            }
            else {
                if (this._itemData.buyLimit) {
                    // if(Api.switchVoApi.checkPunishVip()){
                    maxNum = this._itemData.buyLimit[Api.playerVoApi.getPlayerVipLevel()];
                    if (!maxNum) {
                        maxNum = this._itemData.buyLimit[this._itemData.buyLimit.length - 1];
                    }
                    // }else{
                    // 	maxNum = this._itemData.buyLimit[0];
                    // }
                }
            }
            var num = 0;
            if (acVo_2.item[(this._itemIndex + 1).toString()]) {
                num = acVo_2.item[(this._itemIndex + 1).toString()];
            }
            var leftNum = maxNum - num;
            if (!num) {
                leftNum = maxNum;
            }
            if (leftNum <= 0) {
                // if(Api.switchVoApi.checkPunishVip()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip2"));
                // }else{
                // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip"));
                // }
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
            var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(this._itemData.powerItem));
            var itemNum = 0;
            if (itemInfo) {
                itemNum = itemInfo.num;
            }
            if (itemNum >= this._itemData.holdLimit) {
                App.CommonUtil.showTip(LanguageManager.getlocal("rescueItemLimit"));
                return;
            }
            this.doBuy();
        }
        if (this._itemIndex == 2) {
            var acVo_3 = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
            if (acVo_3.getRechargeState() == 1) {
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD, { activeId: AcRescueBuyItemPopupView.aid + "-" + AcRescueBuyItemPopupView.code, gtype: 3 });
            }
            else if (acVo_3.getRechargeState() == 2) {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, {});
            }
            else if (acVo_3.getRechargeState() == 3) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("rescueGetMaxTip"));
                // return
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, {});
            }
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCUE_BUYITEM,{"key":this._key,"index":this._itemIndex});
        }
    };
    AcRescueBuyItemScrollItem.prototype.doBuy = function () {
        // this._index = data.index;
        // if(this._index >= 3)
        // {
        // 	this.hide();
        // 	return;
        // }
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        if (acVo.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (!acVo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM, { activeId: AcRescueBuyItemPopupView.aid + "-" + AcRescueBuyItemPopupView.code, itemKey: this._key });
    };
    //请求回调
    AcRescueBuyItemScrollItem.prototype.buyCallback = function (event) {
        var data = event.data;
        if (data.data.ret == 0) {
            //领取成功
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            this.refreshData(this._itemIndex);
            var gem = Api.playerVoApi.getPlayerGemStr();
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
        }
    };
    AcRescueBuyItemScrollItem.prototype.refreshData = function (index) {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        // let maxNum = this._itemData.buyLimit;
        var maxNum = this._itemData.buyLimit;
        if (typeof (this._itemData.buyLimit) == "number") {
            maxNum = this._itemData.buyLimit;
        }
        else {
            if (this._itemData.buyLimit) {
                // if(Api.switchVoApi.checkPunishVip()){
                maxNum = this._itemData.buyLimit[Api.playerVoApi.getPlayerVipLevel()];
                if (!maxNum) {
                    maxNum = this._itemData.buyLimit[this._itemData.buyLimit.length - 1];
                }
                // }else{
                // 	maxNum = this._itemData.buyLimit[0];
                // }
            }
        }
        var num = 0;
        if (acVo.item[(index + 1).toString()]) {
            num = acVo.item[(index + 1).toString()];
        }
        var leftNum = maxNum - num;
        var numStr = LanguageManager.getlocal("acPunishBuyItemLimit", [leftNum.toString()]);
        // if(Api.switchVoApi.checkPunishVip()&& Api.playerVoApi.getPlayerVipLevel() >0   && this._key == "2")
        if (Api.playerVoApi.getPlayerVipLevel() > 0 && this._key == "2") {
            numStr = LanguageManager.getlocal("acPunishBuyItemLimit", [leftNum.toString()]);
        }
        this._numTF.text = numStr;
    };
    AcRescueBuyItemScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    AcRescueBuyItemScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRescueBuyItemScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM), this.buyCallback, this);
        this._numTF = null;
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AcRescueBuyItemScrollItem;
}(ScrollListItem));
__reflect(AcRescueBuyItemScrollItem.prototype, "AcRescueBuyItemScrollItem");
