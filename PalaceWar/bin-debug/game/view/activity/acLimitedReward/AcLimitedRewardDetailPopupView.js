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
var AcLimitedRewardDetailPopupView = (function (_super) {
    __extends(AcLimitedRewardDetailPopupView, _super);
    function AcLimitedRewardDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._limitedRewardInfoVoList = [];
        return _this;
    }
    AcLimitedRewardDetailPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD, this.clickItemHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        var acLimitedRewardVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._limitedRewardInfoVoList = acLimitedRewardVo.getLimitedRewardInfoVoList();
        var templimitedRewardInfoVo = this._limitedRewardInfoVoList[this._limitedRewardInfoVoList.length - 1];
        if (this._limitedRewardInfoVoList && this._limitedRewardInfoVoList.length > 0) {
            var num = acLimitedRewardVo.getShowNum();
            this._limitedRewardInfoVoList.splice(num, this._limitedRewardInfoVoList.length - num);
        }
        if (templimitedRewardInfoVo.level) {
            this._limitedRewardInfoVoList[this._limitedRewardInfoVoList.length - 1].reward = templimitedRewardInfoVo.reward;
        }
        var rewardGradeTF = ComponentManager.getTextField(LanguageManager.getlocal("rewardGradeTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        rewardGradeTF.x = 30 + GameData.popupviewOffsetX;
        rewardGradeTF.y = 10;
        this.addChildToContainer(rewardGradeTF);
        var temW = this.viewBg.width - 40 - GameData.popupviewOffsetX * 2;
        var temH = this.getShowHeight() - 160;
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = temW;
        bg.height = temH;
        bg.x = 20 + GameData.popupviewOffsetX;
        bg.y = rewardGradeTF.y + rewardGradeTF.height + 10;
        this.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, temW - 10, temH - 20);
        this._scrollList = ComponentManager.getScrollList(AcLimitedRewardDetailScrollItem, this._limitedRewardInfoVoList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(25 + GameData.popupviewOffsetX, bg.y + 10);
        var maxGrade = acLimitedRewardVo.getMaxGrade();
        var len = this._limitedRewardInfoVoList.length;
        maxGrade = (maxGrade + 2) > len ? maxGrade - 2 : maxGrade;
        // 档位小于3挡会有问题
        maxGrade = maxGrade <= 0 ? 0 : maxGrade;
        this._scrollList.setScrollTopByIndex(maxGrade);
        if (acLimitedRewardVo.atype == "17") {
            var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            if (acLimitedRewardVo.v > 0) {
                tipTxt.text = LanguageManager.getlocal("acLimitReward_11_tip1", ["" + acLimitedRewardVo.v]);
            }
            else {
                tipTxt.text = LanguageManager.getlocal("acLimitReward_11_tip2", ["" + acLimitedRewardVo.v]);
            }
            tipTxt.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2;
            tipTxt.y = bg.y + bg.height + 16;
            this.addChildToContainer(tipTxt);
        }
        else if (acLimitedRewardVo.atype == "7") {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLimitReward_7_tip"), 20, TextFieldConst.COLOR_BROWN);
            tipTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2, bg.y + bg.height + 16);
            this.addChildToContainer(tipTxt);
        }
    };
    AcLimitedRewardDetailPopupView.prototype.useCallback = function (event) {
        var ret = event.data.data.ret;
        if (ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("limitedCollectErrorTips"));
            return;
        }
        var limitedrewardDetailScrollItem = this._scrollList.getItemByIndex(this._index);
        if (limitedrewardDetailScrollItem) {
            var acLimitedRewardVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
            limitedrewardDetailScrollItem.updateButtonState();
        }
    };
    AcLimitedRewardDetailPopupView.prototype.clickItemHandler = function (event) {
        var acLimitedRewardVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (acLimitedRewardVo.isStart) {
            this._index = Number(event.data.index);
            var rkey = Number(event.data.rkey);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD, { "activeId": (this._aid + "-" + this._code), "rkey": rkey });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("sevenDaysSignUpViewTimEnd"));
            this.hide();
        }
    };
    /**
     * 获取活动配置
     */
    AcLimitedRewardDetailPopupView.prototype.getRequestData = function () {
        this._aid = String(this.param.data.aid);
        this._code = String(this.param.data.code);
        if (this._aid == "" || this._code == "") {
            return null;
        }
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, requestData: { activeId: this._aid + "-" + this._code } };
    };
    AcLimitedRewardDetailPopupView.prototype.getTitleStr = function () {
        var rRewardVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        return "ac" + App.StringUtil.firstCharToUper(this._aid + "-" + rRewardVo.atype) + "_Title";
    };
    // protected clickConfirmHandler(data:any):void
    // {
    // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANKLISTPOPUPVIEW,{"aid":this._aid,"code":this._code});
    // }
    AcLimitedRewardDetailPopupView.prototype.getShowHeight = function () {
        return 750;
    };
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_NORMAL_YELLOW;
    // }
    // protected getConfirmBtnStr():string
    // {
    // 	return "userProgressTitle";
    // }
    AcLimitedRewardDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD, this.clickItemHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        this._aid = null;
        this._code = null;
        this._scrollList = null;
        this._limitedRewardInfoVoList = null;
        this._index = null;
        _super.prototype.dispose.call(this);
    };
    return AcLimitedRewardDetailPopupView;
}(PopupView));
__reflect(AcLimitedRewardDetailPopupView.prototype, "AcLimitedRewardDetailPopupView");
//# sourceMappingURL=AcLimitedRewardDetailPopupView.js.map