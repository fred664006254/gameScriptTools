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
        this.width = 525;
        this.height = 126 + this.getSpaceY();
        var key = (index + 1).toString();
        var bgBg = BaseBitmap.create("public_9_bg14");
        bgBg.width = this.width;
        bgBg.height = 148;
        bgBg.scaleY = 126 / 148;
        this.addChild(bgBg);
        this._key = key;
        this._itemId = cfg[key].item;
        var itemCfg = Config.ItemCfg.getItemCfgById(cfg[key].item);
        var itemIcon = itemCfg.getIconContainer(true);
        itemIcon.setPosition(15, bgBg.height / 2 * bgBg.scaleY - itemIcon.width / 2);
        itemIcon.name = "icon";
        this.addChild(itemIcon);
        var itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        itemName.setPosition(itemIcon.x + itemIcon.width + 10, 18);
        this.addChild(itemName);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
        var numStr = LanguageManager.getlocal("numTitle") + hasNum;
        this._numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            this._numTF.setPosition(itemName.x, itemName.y + itemName.height + 15);
        }
        else {
            this._numTF.setPosition(itemName.x, itemName.y + itemName.height + 10);
        }
        this.addChild(this._numTF);
        var itemDescStr = "";
        if (cfg[key].intimacy) {
            itemDescStr = LanguageManager.getlocal("wifeGiveAdd1", [cfg[key].intimacy]);
        }
        else if (cfg[key].glamour) {
            itemDescStr = LanguageManager.getlocal("wifeGiveAdd2", [cfg[key].glamour]);
        }
        else if (cfg[key].accomplishment) {
            itemDescStr = LanguageManager.getlocal("wifeGiveAdd3", [cfg[key].accomplishment]);
        }
        var itemDesc = ComponentManager.getTextField(itemDescStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            itemDesc.setPosition(itemName.x, this._numTF.y + this._numTF.height + 15);
        }
        else {
            itemDesc.setPosition(itemName.x, this._numTF.y + this._numTF.height + 10);
        }
        this.addChild(itemDesc);
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", this.chooseBtnClick, this);
        chooseBtn.x = 390 - 20;
        chooseBtn.y = bgBg.height / 2 * bgBg.scaleY - chooseBtn.height / 2;
        this.addChild(chooseBtn);
        chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
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
        var numStr = LanguageManager.getlocal("numTitle") + hasNum;
        this._numTF.text = numStr;
    };
    WifeGiveScrollItem.prototype.getBtnClickHandler = function () {
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
    };
    WifeGiveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    WifeGiveScrollItem.prototype.dispose = function () {
        this._numTF = null;
        this._key = null;
        this._itemId = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return WifeGiveScrollItem;
}(ScrollListItem));
__reflect(WifeGiveScrollItem.prototype, "WifeGiveScrollItem");
//# sourceMappingURL=WifeGiveScrollItem.js.map