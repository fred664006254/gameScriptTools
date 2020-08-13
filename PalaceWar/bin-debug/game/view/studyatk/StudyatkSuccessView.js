/**
 * 习武成功
 * author yanyuling
 * date 2017/12/01
 * @class StudyatkSuccessView
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
var StudyatkSuccessView = (function (_super) {
    __extends(StudyatkSuccessView, _super);
    function StudyatkSuccessView() {
        return _super.call(this) || this;
    }
    StudyatkSuccessView.prototype.initView = function () {
    };
    StudyatkSuccessView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "public_rule_bg",
            "studyatk_sucess"
        ]);
    };
    StudyatkSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    StudyatkSuccessView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    StudyatkSuccessView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.addTouchTap(this.touchTap, this, null);
        var winBg = BaseBitmap.create("public_rule_bg");
        winBg.setPosition(GameConfig.stageWidth / 2 - winBg.width, GameConfig.stageHeigth / 2 - winBg.height / 2);
        this.addChildToContainer(winBg);
        var winBg2 = BaseBitmap.create("public_rule_bg");
        winBg2.scaleX = -1;
        winBg2.setPosition(GameConfig.stageWidth / 2 + winBg2.width - 1, GameConfig.stageHeigth / 2 - winBg2.height / 2);
        this.addChildToContainer(winBg2);
        var flag = BaseBitmap.create("studyatk_sucess");
        flag.x = GameConfig.stageWidth / 2 - flag.width / 2;
        flag.y = winBg.y - 8;
        this.addChildToContainer(flag);
        var awardBg = BaseBitmap.create("public_9_bg1");
        awardBg.width = 500;
        awardBg.height = 140;
        awardBg.setPosition(GameConfig.stageWidth / 2 - awardBg.width / 2, GameConfig.stageHeigth / 2 - awardBg.height / 2 - 30);
        this.addChildToContainer(awardBg);
        // getskill
        var finishinfo = this.param.data;
        //  Api.studyatkVoApi.getStudyatkFinishinfo();
        var tipTxt = ComponentManager.getTextField("", 22);
        tipTxt.multiline = true;
        tipTxt.width = 450;
        tipTxt.lineSpacing = 20;
        tipTxt.text = LanguageManager.getlocal("studyatk_successTxt", [Math.floor(finishinfo.studytime / 60), finishinfo.getskill]);
        tipTxt.x = awardBg.x + awardBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = awardBg.y + awardBg.height / 2 - tipTxt.height / 2;
        this.addChildToContainer(tipTxt);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.confirmHandler, this);
        confirmBtn.x = awardBg.x + awardBg.width / 2 - confirmBtn.width / 2;
        confirmBtn.y = awardBg.y + awardBg.height + 15;
        this.addChildToContainer(confirmBtn);
    };
    StudyatkSuccessView.prototype.confirmHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STUDYATK_FINISH);
        this.hide();
    };
    StudyatkSuccessView.prototype.touchTap = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STUDYATK_FINISH);
        this.hide();
    };
    StudyatkSuccessView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return StudyatkSuccessView;
}(BaseView));
__reflect(StudyatkSuccessView.prototype, "StudyatkSuccessView");
//# sourceMappingURL=StudyatkSuccessView.js.map