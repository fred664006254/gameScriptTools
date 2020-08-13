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
 * @class AcRescueBuyItemCangkuScrollItem
 */
var AcRescueBuyItemCangkuScrollItem = (function (_super) {
    __extends(AcRescueBuyItemCangkuScrollItem, _super);
    function AcRescueBuyItemCangkuScrollItem() {
        return _super.call(this) || this;
    }
    AcRescueBuyItemCangkuScrollItem.prototype.initItem = function (index, data) {
        // let cfg = Config.WifebaseCfg.wifeGift
        this._itemIndex = index;
        this._itemData = data;
        this.width = 520;
        this.height = 182 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_listbg");
        bgBg.width = this.width;
        bgBg.height = 182;
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
        if (data.holdLimit) {
            var holdLimit = ComponentManager.getTextField(LanguageManager.getlocal("rescueHoldLimit", [data.holdLimit]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            holdLimit.setPosition(bgBg.x + bgBg.width - holdLimit.width - 20, bgBg.y + 20);
            this.addChild(holdLimit);
        }
        var useNum = ComponentManager.getTextField(LanguageManager.getlocal("rescueUseNum"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        useNum.setPosition(itemName.x, itemName.y + itemName.height + 7);
        this.addChild(useNum);
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        // let maxNum = data.buyLimit;
        var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(data.powerItem));
        // let itemListCfg = Config.ItemCfg.getItemCfgById
        // let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var itemNum = 0;
        if (itemInfo) {
            itemNum = itemInfo.num;
        }
        if (itemNum <= 0) {
            // itemNum =1;
        }
        var numTxt = "0" + "/" + itemNum;
        this._hasNumTF = ComponentManager.getTextField(numTxt, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._hasNumTF.setPosition(420, 70);
        this._hasNumTF.width = 250;
        this.addChild(this._hasNumTF);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01", "progress4tc_02", itemNum, this.dragCallback, this, null, 0, 220);
        // dragProgressBar.width = 300;
        dragProgressBar.setScale(0.7);
        dragProgressBar.x = itemName.x + 60;
        dragProgressBar.y = itemName.y + 69;
        this.addChild(dragProgressBar);
        // // let score = LanguageManager.getlocal("acPunishBuyItemScore",[data.getScore]) ;
        // // let itemScore:BaseTextField = ComponentManager.getTextField(score,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // // itemScore.setPosition(itemName.x,itemName.y + itemName.height + 7);
        // // this.addChild(itemScore);
        // let itemDescStr = LanguageManager.getlocal("rescueItemGet",[(this._itemData.getPower*itemNum).toString()]);
        var itemDescStr = LanguageManager.getlocal("rescueItemGet", ["0"]);
        // itemDescStr
        //acPunishBuyItemGet
        this._powerTF = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._powerTF.setPosition(itemName.x, 140);
        this._powerTF.width = 250;
        this.addChild(this._powerTF);
        if (itemNum > 0) {
            dragProgressBar.setDragPercent(1, itemNum, 1);
        }
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", this.chooseBtnClick, this);
        chooseBtn.x = 385;
        chooseBtn.y = bgBg.height - chooseBtn.height - 20;
        this.addChild(chooseBtn);
        chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AcRescueBuyItemCangkuScrollItem.prototype.dragCallback = function (curNum) {
        var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(this._itemData.powerItem));
        // let itemListCfg = Config.ItemCfg.getItemCfgById
        // let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var itemNum = 0;
        if (itemInfo) {
            itemNum = itemInfo.num;
        }
        var numTxt = "0" + "/" + itemNum;
        this._useNum = curNum;
        this._hasNumTF.text = curNum + "/" + itemNum;
        var itemDescStr = LanguageManager.getlocal("rescueItemGet", [(this._itemData.getPower * curNum).toString()]);
        this._powerTF.text = itemDescStr;
        // let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
        // this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
        // this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
    };
    AcRescueBuyItemCangkuScrollItem.prototype.chooseBtnClick = function () {
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid, AcRescueBuyItemPopupView.code);
        if (acVo.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(this._itemData.powerItem));
        // let itemListCfg = Config.ItemCfg.getItemCfgById
        // let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        var itemNum = 0;
        if (itemInfo) {
            itemNum = itemInfo.num;
        }
        if (!this._useNum || itemNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        // let acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueBuyItemPopupView.aid,AcRescueBuyItemPopupView.code);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM, { activeId: AcRescueBuyItemPopupView.aid + "-" + AcRescueBuyItemPopupView.code, itemKey: this._key, useNum: this._useNum });
    };
    AcRescueBuyItemCangkuScrollItem.prototype.refreshData = function (index) {
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
            numStr = LanguageManager.getlocal("acPunishBuyItemLimit2", [leftNum.toString()]);
        }
        this._powerTF.text = numStr;
    };
    AcRescueBuyItemCangkuScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    AcRescueBuyItemCangkuScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRescueBuyItemCangkuScrollItem.prototype.dispose = function () {
        this._powerTF = null;
        this._hasNumTF = null;
        this._key = null;
        this._itemData = null;
        this._itemIndex = null;
        this._useNum = null;
        _super.prototype.dispose.call(this);
    };
    return AcRescueBuyItemCangkuScrollItem;
}(ScrollListItem));
__reflect(AcRescueBuyItemCangkuScrollItem.prototype, "AcRescueBuyItemCangkuScrollItem");
