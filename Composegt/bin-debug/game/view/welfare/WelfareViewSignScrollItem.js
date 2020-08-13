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
 * 签到滑动item
 * author dmj
 * date 2017/11/04
 * @class WelfareViewSignScrollItem
 */
var WelfareViewSignScrollItem = (function (_super) {
    __extends(WelfareViewSignScrollItem, _super);
    function WelfareViewSignScrollItem() {
        var _this = _super.call(this) || this;
        //领取按钮
        _this._getBtn = null;
        //当前是第几天
        _this._curDay = 0;
        //当前是第几个cell
        _this._selectedIndex = 0;
        return _this;
    }
    WelfareViewSignScrollItem.prototype.initItem = function (index, data) {
        this._selectedIndex = index;
        this._curDay = data.index;
        this._rewardList = data.rewardList;
        var temW = 491;
        var temH = 145;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 434; //temW - 40;
        bg.height = 165; //0;
        bg.x = temW / 2 - bg.width / 2 - 7;
        bg.y = 5;
        this.addChild(bg);
        var cardNameTF = ComponentManager.getTextField(LanguageManager.getlocal("signinDay", [String(this._curDay)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        cardNameTF.x = bg.x + 160;
        cardNameTF.y = bg.y + 10; //line1.y + line1.height/2 - cardNameTF.height/2;
        this.addChild(cardNameTF);
        var temX = 0;
        var temScale = 0.8;
        for (var i = 0; i < data.rewardList.length; i++) {
            // getRewardItemIcons
            var icon = GameData.getItemIcon(data.rewardList[i], true, true);
            icon.x = 30 + 7 * (i + 1) + icon.width * temScale * i;
            icon.y = bg.y + 47;
            icon.scaleX = icon.scaleY = temScale;
            this.addChild(icon);
            temX = icon.x + icon.width;
        }
        if (data.flag == 1) {
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = 315; //temW - 100 - hasGetSp.width/2+15;
            hasGetSp.y = bg.y + bg.height / 2 - hasGetSp.height / 2; //+10;
            // hasGetSp.scaleX=0.7;
            // hasGetSp.scaleY=0.7; 
            this.addChild(hasGetSp);
        }
        else {
            var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.clickGetBtnHandler, this);
            getBtn.x = temW - 100 - getBtn.width / 2 - 10;
            getBtn.y = bg.y + bg.height / 2 - getBtn.height / 2 + 8;
            this.addChild(getBtn);
            this._getBtn = getBtn;
            if (data.flag == 2) {
                getBtn.setEnable(false);
            }
        }
    };
    WelfareViewSignScrollItem.prototype.updateButtonState = function () {
        var flag = Api.arrivalVoApi.checkFlagByIndex(this._curDay);
        if (flag == 1 && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = 315; //this._getBtn.x + this._getBtn.width/2 - hasGetSp.width/2+15;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2; //-20;//+30;
            // hasGetSp.scaleX=0.7;
            // hasGetSp.scaleY=0.7; 
            this.addChild(hasGetSp);
        }
        if (this._rewardList) {
            var globalPt = this.localToGlobal(this._getBtn.x, this._getBtn.y - 40);
            var runPos = new egret.Point(globalPt.x + 55, globalPt.y - 30);
            App.CommonUtil.playRewardFlyAction(this._rewardList, runPos);
        }
    };
    WelfareViewSignScrollItem.prototype.clickGetBtnHandler = function (param) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN, { "day": this._curDay, "index": this._selectedIndex });
    };
    WelfareViewSignScrollItem.prototype.dispose = function () {
        this._getBtn = null;
        this._curDay = 0;
        this._rewardList = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewSignScrollItem;
}(ScrollListItem));
__reflect(WelfareViewSignScrollItem.prototype, "WelfareViewSignScrollItem");
