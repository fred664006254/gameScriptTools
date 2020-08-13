/**
 * 习武失败，被踢出
 * author yanyuling
 * date 2017/12/01
 * @class StudyatkFailedPopupView
 */
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
var StudyatkFailedPopupView = (function (_super) {
    __extends(StudyatkFailedPopupView, _super);
    function StudyatkFailedPopupView() {
        return _super.call(this) || this;
    }
    StudyatkFailedPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bottomBg = BaseBitmap.create("public_9v_bg04");
        bottomBg.width = 520;
        bottomBg.height = 190;
        bottomBg.name = "bottomBg";
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 20;
        this._nodeContainer.addChild(bottomBg);
        var finishinfo = this.param.data;
        //  Api.studyatkVoApi.getStudyatkFinishinfo();
        var tipTxt = ComponentManager.getTextField("", 22);
        tipTxt.multiline = true;
        tipTxt.width = 450;
        tipTxt.lineSpacing = 20;
        tipTxt.text = LanguageManager.getlocal("studyatk_failedTxt", [finishinfo.uname, Math.floor(finishinfo.studytime / 60), finishinfo.getskill]);
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + bottomBg.height / 2 - tipTxt.height / 2;
        tipTxt.textColor = TextFieldConst.COLOR_BROWN;
        this._nodeContainer.addChild(tipTxt);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.confirmHandler, this);
        confirmBtn.x = this.viewBg.width / 2 - confirmBtn.width / 2;
        confirmBtn.y = bottomBg.y + +bottomBg.height + 15;
        this._nodeContainer.addChild(confirmBtn);
    };
    StudyatkFailedPopupView.prototype.confirmHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STUDYATK_FINISH);
        this.hide();
    };
    StudyatkFailedPopupView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    StudyatkFailedPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkFailedPopupView;
}(PopupView));
__reflect(StudyatkFailedPopupView.prototype, "StudyatkFailedPopupView");
