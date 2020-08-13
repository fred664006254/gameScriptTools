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
var AcLimitedRewardDetailScrollItem = (function (_super) {
    __extends(AcLimitedRewardDetailScrollItem, _super);
    function AcLimitedRewardDetailScrollItem() {
        return _super.call(this) || this;
    }
    AcLimitedRewardDetailScrollItem.prototype.initItem = function (index, data) {
        this._limitedRewardInfoVo = data;
        var acLimitedRewardVo = Api.acVoApi.getActivityVoByAidAndCode(this._limitedRewardInfoVo.aid, this._limitedRewardInfoVo.code.toString());
        var flag = acLimitedRewardVo.getFlagByIdAndCondition(this._limitedRewardInfoVo.id, this._limitedRewardInfoVo.condition);
        var temW = 520;
        var temH = 148;
        this._selectedIndex = index;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = temW;
        bg.height = 148;
        this.addChild(bg);
        var rewardGradeTF = ComponentManager.getTextField(LanguageManager.getlocal("rewardGradeNum", [this._limitedRewardInfoVo.id.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        rewardGradeTF.x = 20;
        rewardGradeTF.y = 15;
        this.addChild(rewardGradeTF);
        var progress = "(" + App.StringUtil.changeIntToText(acLimitedRewardVo.v, 1) + "/" + App.StringUtil.changeIntToText(this._limitedRewardInfoVo.condition, 1) + ")";
        var conditonTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        var textStrKey = "limitedCondition2";
        if (flag == 2) {
            textStrKey = "limitedCondition";
            // textStr = LanguageManager.getlocal("limitedCondition2",[this._limitedRewardInfoVo.getTitleStr,progress]);
        }
        conditonTF.text = LanguageManager.getlocal(textStrKey, [this._limitedRewardInfoVo.getTitleStr, progress]);
        conditonTF.x = temW - conditonTF.width - 20;
        conditonTF.y = 16;
        this.addChild(conditonTF);
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.x = temW / 2 - lineSp.width / 2;
        lineSp.y = rewardGradeTF.y + rewardGradeTF.height + 5;
        this.addChild(lineSp);
        var rewardList = GameData.formatRewardItem(this._limitedRewardInfoVo.reward);
        this._rewardList = rewardList;
        if (rewardList) {
            var temX = 0;
            var temScale = 0.7;
            for (var i = 0; i < rewardList.length; i++) {
                var icon = GameData.getItemIcon(rewardList[i], true);
                icon.x = 10 + 7 * (i + 1) + icon.width * temScale * i;
                icon.y = lineSp.y + 13;
                icon.scaleX = icon.scaleY = temScale;
                this.addChild(icon);
            }
        }
        if (flag == 1) {
            var hasGetSp = BaseBitmap.create("signin_had_get");
            hasGetSp.x = temW - 85 - hasGetSp.width / 2;
            hasGetSp.y = bg.y + bg.height / 2 - hasGetSp.height / 2 + 18;
            this.addChild(hasGetSp);
        }
        else {
            var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.clickGetBtnHandler, this);
            getBtn.x = temW - 85 - getBtn.width / 2;
            getBtn.y = bg.y + bg.height / 2 - getBtn.height / 2 + 18;
            this.addChild(getBtn);
            this._getBtn = getBtn;
            if (flag == 2) {
                getBtn.setEnable(false);
            }
            if (flag == 0) { }
        }
    };
    AcLimitedRewardDetailScrollItem.prototype.updateButtonState = function () {
        var acLimitedRewardVo = Api.acVoApi.getActivityVoByAidAndCode(this._limitedRewardInfoVo.aid, this._limitedRewardInfoVo.code.toString());
        var flag = acLimitedRewardVo.getFlagByIdAndCondition(this._limitedRewardInfoVo.id, this._limitedRewardInfoVo.condition);
        if (flag == 1 && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("signin_had_get");
            hasGetSp.x = this._getBtn.x + this._getBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
        }
        if (this._rewardList) {
            var globalPt = this._getBtn.localToGlobal(this._getBtn.width / 2, this._getBtn.height / 2);
            var runPos = new egret.Point(globalPt.x + 55, globalPt.y - 30);
            App.CommonUtil.playRewardFlyAction(this._rewardList, runPos);
        }
    };
    AcLimitedRewardDetailScrollItem.prototype.clickGetBtnHandler = function (param) {
        // if(Api.acVoApi.checkActivityStartByAid(this._limitedRewardInfoVo.aid,String(this._limitedRewardInfoVo.code))){
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD, { "rkey": this._limitedRewardInfoVo.id, "index": this._selectedIndex });
        // }else{
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("composeLimitTimeEndDesc"));
        // }
    };
    AcLimitedRewardDetailScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcLimitedRewardDetailScrollItem.prototype.update = function () {
    };
    AcLimitedRewardDetailScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcLimitedRewardDetailScrollItem.prototype.dispose = function () {
        this._limitedRewardInfoVo = null;
        this._selectedIndex = null;
        this._getBtn = null;
        this._rewardList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLimitedRewardDetailScrollItem;
}(ScrollListItem));
__reflect(AcLimitedRewardDetailScrollItem.prototype, "AcLimitedRewardDetailScrollItem");
//# sourceMappingURL=AcLimitedRewardDetailScrollItem.js.map