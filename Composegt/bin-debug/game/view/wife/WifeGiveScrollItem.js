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
 * 赏赐Item
 * author dky
 * date 2017/11/4
 * @class WifeGiveScrollItem
 */
var WifeGiveScrollItem = (function (_super) {
    __extends(WifeGiveScrollItem, _super);
    function WifeGiveScrollItem() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    WifeGiveScrollItem.prototype.initItem = function (index, data) {
        var cfg = Config.WifebaseCfg.wifeGift;
        this._itemIndex = index;
        this.width = 515;
        this.height = 145 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_listbg3");
        bgBg.width = this.width;
        bgBg.height = 145;
        // bgBg.scaleY = 126/148;
        this.addChild(bgBg);
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 129;
        // leftBg.height = 126;
        // leftBg.x = 5.5;
        // leftBg.y = 5.5;
        // this.addChild(leftBg);
        this._key = key;
        this._itemId = cfg[key].item;
        var itemCfg = Config.ItemCfg.getItemCfgById(cfg[key].item);
        var itemIcon = GameData.getItemIcon(itemCfg, true, true);
        ;
        itemIcon.setPosition(18, bgBg.height / 2 * bgBg.scaleY - itemIcon.width / 2 - 2);
        itemIcon.name = "icon";
        this.addChild(itemIcon);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
        this._numTF2 = ComponentManager.getTextField(String(hasNum), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._numTF2.x = itemIcon.x + itemIcon.width - this._numTF2.width - 5;
        this._numTF2.y = itemIcon.y + itemIcon.height - this._numTF2.height - 5;
        this.addChild(this._numTF2);
        // let nameBg = BaseBitmap.create("public_biaoti2");
        // let nameSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        // if(PlatformManager.checkIsViSp()){
        // 	nameBg.width = 170;
        // 	nameSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        // } else {
        // 	nameBg.width = 150;
        // }
        // nameBg.x = itemIcon.x + itemIcon.width + 15;
        // nameBg.y = 15;
        // this.addChild(nameBg);
        var itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        itemName.x = itemIcon.x + itemIcon.width + 25; //nameBg.x + nameBg.width/2 - itemName.width/2;
        itemName.y = 25; //nameBg.y + nameBg.height/2 - itemName.height/2;
        this.addChild(itemName);
        var numTF = ComponentManager.getTextField(LanguageManager.getlocal("numTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        numTF.setPosition(itemIcon.x + itemIcon.width + 25, itemName.y + itemName.height + 10);
        this.addChild(numTF);
        var numStr = hasNum + "";
        var color = TextFieldConst.COLOR_WARN_GREEN_NEW;
        if (hasNum <= 0) {
            color = TextFieldConst.COLOR_WARN_RED_NEW;
        }
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        this._numTF.setPosition(numTF.x + numTF.width, numTF.y);
        this.addChild(this._numTF);
        var itemDescStr = "";
        if (cfg[key].intimacy) {
            itemDescStr = LanguageManager.getlocal("wifeGiveAdd1", [cfg[key].intimacy]);
        }
        else if (cfg[key].glamour) {
            itemDescStr = LanguageManager.getlocal("wifeGiveAdd2", [cfg[key].glamour]);
        }
        else if (cfg[key].artistry) {
            itemDescStr = LanguageManager.getlocal("wifeGiveAdd3", [cfg[key].artistry]);
        }
        var itemDesc = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        if (PlatformManager.checkIsViSp()) {
            itemDesc.setPosition(itemIcon.x + itemIcon.width + 25, this._numTF.y + this._numTF.height + 25);
        }
        else {
            itemDesc.setPosition(itemIcon.x + itemIcon.width + 25, this._numTF.y + this._numTF.height + 10);
        }
        this.addChild(itemDesc);
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", this.chooseBtnClick, this);
        chooseBtn.x = 360;
        chooseBtn.y = bgBg.height / 2 * bgBg.scaleY - chooseBtn.height / 2;
        this.addChild(chooseBtn);
        // chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        egret.callLater(function () {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(chooseBtn, chooseBtn.width / 2, chooseBtn.height / 2, [chooseBtn], 306, true, function () {
                if (data.isMaxIntimacyWife && data.isFirstHasNumIndex) {
                    this.parent.setChildIndex(this, 100);
                    return true;
                }
                else {
                    return false;
                }
            }, this);
        }, this);
    };
    WifeGiveScrollItem.prototype.chooseBtnClick = function () {
        var cfg = Config.WifebaseCfg.wifeGift;
        var key = (this._itemIndex + 1).toString();
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
        if (hasNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        else {
            if (hasNum < 5) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_GIVE, { "key": this._key, "index": this._itemIndex, "num": 1 });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: this._itemId, maxNum: null, callback: this.useItem, handler: this });
            }
        }
    };
    WifeGiveScrollItem.prototype.useItem = function (itemNum, itemId) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_GIVE, { "key": this._key, "index": this._itemIndex, "num": itemNum });
    };
    WifeGiveScrollItem.prototype.refreshData = function (index) {
        var cfg = Config.WifebaseCfg.wifeGift;
        var key = (index + 1).toString();
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
        var numStr = "" + hasNum;
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (hasNum <= 0) {
            color = TextFieldConst.COLOR_WARN_RED;
        }
        this._numTF.text = numStr;
        this._numTF2.text = numStr;
        this._numTF.setColor(color);
    };
    WifeGiveScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    WifeGiveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    WifeGiveScrollItem.prototype.dispose = function () {
        this._numTF = null;
        this._numTF2 = null;
        this._key = null;
        this._itemId = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return WifeGiveScrollItem;
}(ScrollListItem));
__reflect(WifeGiveScrollItem.prototype, "WifeGiveScrollItem");
