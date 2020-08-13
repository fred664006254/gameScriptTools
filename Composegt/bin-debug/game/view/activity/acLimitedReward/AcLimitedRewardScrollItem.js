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
 * 限时活动列表item
 * author dmj
 * date 2017/11/07
 * @class AcLimitedRewardScrollItem
 */
var AcLimitedRewardScrollItem = (function (_super) {
    __extends(AcLimitedRewardScrollItem, _super);
    function AcLimitedRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._limitedRewardVo = null;
        _this._selectedIndex = 0;
        _this._lastRed = null;
        _this._acCDTxt = null;
        return _this;
    }
    AcLimitedRewardScrollItem.prototype.initItem = function (index, data) {
        this._limitedRewardVo = data;
        var temW = 618;
        var temH = 148;
        var temX = 150;
        this._selectedIndex = index;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = temW;
        bg.height = 148;
        bg.x = 2;
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 139;
        leftBg.height = 130;
        leftBg.x = 7;
        leftBg.y = 5; //bg.y + bg.height/2 -leftBg.height/2-3; 
        this.addChild(leftBg);
        var titleBg = BaseBitmap.create("activity_charge_red");
        titleBg.x = 145;
        titleBg.y = 19;
        this.addChild(titleBg);
        var iconBg = BaseBitmap.create("progress6_bg");
        iconBg.x = 10;
        iconBg.y = temH / 2 - iconBg.height / 2;
        this.addChild(iconBg);
        var iconSp = BaseLoadBitmap.create(this._limitedRewardVo.icon);
        iconSp.x = iconBg.x + iconBg.width / 2 - 44;
        iconSp.y = iconBg.y + iconBg.height / 2 - 44;
        this.addChild(iconSp);
        var titleNameTF = ComponentManager.getTextField(LanguageManager.getlocal("limitedTitle", [this._limitedRewardVo.getTitleStr]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleNameTF.x = temX;
        titleNameTF.y = titleBg.y + titleBg.height / 2 - titleNameTF.height / 2;
        this.addChild(titleNameTF);
        var timeTF = ComponentManager.getTextField(App.StringUtil.formatStringColor(this._limitedRewardVo.acTimeAndHour, TextFieldConst.COLOR_WARN_RED), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeTF.x = temX;
        timeTF.y = titleNameTF.y + titleNameTF.height + 20;
        this.addChild(timeTF);
        if (!PlatformManager.checkIsWxmgSp()) {
            this._acCDTxt = ComponentManager.getTextField(this._limitedRewardVo.acLocalCountDown, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._acCDTxt.x = temX;
            this._acCDTxt.y = timeTF.y + timeTF.height + 10;
            this.addChild(this._acCDTxt);
        }
        var openBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "openActivityTitle", this.clickItemHandler, this);
        openBtn.x = temW - openBtn.width - 15;
        openBtn.y = temH / 2 - openBtn.height / 2;
        this.addChild(openBtn);
        this._openBtn = openBtn;
        this.checkBtnState();
        egret.startTick(this.tick, this);
    };
    AcLimitedRewardScrollItem.prototype.tick = function (timeStamp) {
        if (!PlatformManager.checkIsWxmgSp()) {
            this._acCDTxt.text = this._limitedRewardVo.acLocalCountDown;
        }
        return false;
    };
    AcLimitedRewardScrollItem.prototype.clickItemHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACLIMITEDREWARDDETAILPOPUPVIEW, { "aid": this._limitedRewardVo.aid, "code": this._limitedRewardVo.code });
    };
    AcLimitedRewardScrollItem.prototype.checkBtnState = function () {
        var red = this._limitedRewardVo.red;
        if (this._lastRed == null || this._lastRed != red) {
            this._lastRed = red;
            if (red == true) {
                this._openBtn.showStatusIcon("public_dot2");
            }
            else {
                this._openBtn.removeStatusIcon();
            }
        }
    };
    AcLimitedRewardScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcLimitedRewardScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcLimitedRewardScrollItem.prototype.dispose = function () {
        egret.stopTick(this.tick, this);
        this._limitedRewardVo = null;
        this._selectedIndex = 0;
        this._openBtn = null;
        this._lastRed = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcLimitedRewardScrollItem;
}(ScrollListItem));
__reflect(AcLimitedRewardScrollItem.prototype, "AcLimitedRewardScrollItem");
