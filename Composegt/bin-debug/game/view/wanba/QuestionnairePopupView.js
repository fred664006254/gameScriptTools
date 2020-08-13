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
 * 调查问卷
 * author dky
 * date 2019/1/25
 * @class QuestionnairePopupView
 */
var QuestionnairePopupView = (function (_super) {
    __extends(QuestionnairePopupView, _super);
    function QuestionnairePopupView() {
        var _this = _super.call(this) || this;
        // private _q1a1CheckBox:CheckBox;
        // private _q1a2CheckBox:CheckBox;
        // private _q2aList :CheckBox[];
        _this._q1aList = [];
        _this._q2aList = [];
        _this._q3aList = [];
        return _this;
    }
    QuestionnairePopupView.prototype.initView = function () {
        this._q1aList = new Array();
        this._q2aList = new Array();
        this._q3aList = new Array();
        // itemInfo.ic
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 770;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = bg.width - 20;
        bg1.height = bg.height - 20;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = bg.y + 10;
        this.addChildToContainer(bg1);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireGetTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameText.x = GameConfig.stageWidth / 2 - nameText.width / 2;
        nameText.y = bg1.y + 20;
        this.addChildToContainer(nameText);
        var qbg1 = BaseBitmap.create("public_tc_bg05");
        qbg1.width = 510;
        qbg1.height = 40;
        qbg1.x = GameConfig.stageWidth / 2 - qbg1.width / 2;
        ;
        qbg1.y = nameText.y + 30;
        this.addChildToContainer(qbg1);
        var q1Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q1Text.x = 70;
        q1Text.y = qbg1.y + qbg1.height / 2 - q1Text.height / 2;
        this.addChildToContainer(q1Text);
        var q1a1checkbox = ComponentManager.getCheckBox();
        q1a1checkbox.x = 150;
        q1a1checkbox.y = qbg1.y + qbg1.height + 10;
        q1a1checkbox.setScale(0.8);
        this.addChildToContainer(q1a1checkbox);
        this._q1aList.push(q1a1checkbox);
        q1a1checkbox.addTouchTap(this.q1Handler, this, [0]);
        var q1a1Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ1A1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q1a1Text.x = q1a1checkbox.x + q1a1checkbox.width + 5;
        q1a1Text.y = q1a1checkbox.y + 5;
        this.addChildToContainer(q1a1Text);
        var q1a2checkbox = ComponentManager.getCheckBox();
        q1a2checkbox.setScale(0.8);
        q1a2checkbox.x = 350;
        q1a2checkbox.y = q1a1checkbox.y;
        this.addChildToContainer(q1a2checkbox);
        this._q1aList.push(q1a2checkbox);
        q1a2checkbox.addTouchTap(this.q1Handler, this, [1]);
        var q1a2Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ1A2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q1a2Text.x = q1a2checkbox.x + q1a2checkbox.width + 5;
        q1a2Text.y = q1a1Text.y;
        this.addChildToContainer(q1a2Text);
        var qbg2 = BaseBitmap.create("public_tc_bg05");
        qbg2.width = 510;
        qbg2.height = 40;
        qbg2.x = GameConfig.stageWidth / 2 - qbg2.width / 2;
        ;
        qbg2.y = qbg1.y + 90;
        this.addChildToContainer(qbg2);
        var q2Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2Text.x = q1Text.x;
        q2Text.y = qbg2.y + qbg2.height / 2 - q2Text.height / 2;
        this.addChildToContainer(q2Text);
        var q2a1checkbox = ComponentManager.getCheckBox();
        q2a1checkbox.x = q1a1checkbox.x;
        q2a1checkbox.y = qbg2.y + qbg2.height + 10;
        q2a1checkbox.setScale(0.8);
        this.addChildToContainer(q2a1checkbox);
        this._q2aList.push(q2a1checkbox);
        q2a1checkbox.addTouchTap(this.q2Handler, this, [0]);
        var q2a1Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a1Text.x = q2a1checkbox.x + q2a1checkbox.width + 5;
        q2a1Text.y = q2a1checkbox.y + 5;
        this.addChildToContainer(q2a1Text);
        var q2a2checkbox = ComponentManager.getCheckBox();
        q2a2checkbox.x = q1a2checkbox.x;
        q2a2checkbox.y = q2a1checkbox.y;
        q2a2checkbox.setScale(0.8);
        this.addChildToContainer(q2a2checkbox);
        this._q2aList.push(q2a2checkbox);
        q2a2checkbox.addTouchTap(this.q2Handler, this, [1]);
        var q2a2Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a2Text.x = q2a2checkbox.x + q2a2checkbox.width + 5;
        q2a2Text.y = q2a2checkbox.y + 5;
        this.addChildToContainer(q2a2Text);
        var q2a3checkbox = ComponentManager.getCheckBox();
        q2a3checkbox.x = q1a1checkbox.x;
        q2a3checkbox.y = q2a1checkbox.y + 50;
        q2a3checkbox.setScale(0.8);
        this.addChildToContainer(q2a3checkbox);
        this._q2aList.push(q2a3checkbox);
        q2a3checkbox.addTouchTap(this.q2Handler, this, [2]);
        var q2a3Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a3Text.x = q2a3checkbox.x + q2a3checkbox.width + 5;
        q2a3Text.y = q2a3checkbox.y + 5;
        this.addChildToContainer(q2a3Text);
        var q2a4checkbox = ComponentManager.getCheckBox();
        q2a4checkbox.x = q1a2checkbox.x;
        q2a4checkbox.y = q2a3checkbox.y;
        q2a4checkbox.setScale(0.8);
        this.addChildToContainer(q2a4checkbox);
        this._q2aList.push(q2a4checkbox);
        q2a4checkbox.addTouchTap(this.q2Handler, this, [3]);
        var q2a4Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A4"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a4Text.x = q2a4checkbox.x + q2a4checkbox.width + 5;
        q2a4Text.y = q2a4checkbox.y + 5;
        this.addChildToContainer(q2a4Text);
        var q2a5checkbox = ComponentManager.getCheckBox();
        q2a5checkbox.x = q1a1checkbox.x;
        q2a5checkbox.y = q2a3checkbox.y + 50;
        q2a5checkbox.setScale(0.8);
        this.addChildToContainer(q2a5checkbox);
        this._q2aList.push(q2a5checkbox);
        q2a5checkbox.addTouchTap(this.q2Handler, this, [4]);
        var q2a5Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A5"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a5Text.x = q2a5checkbox.x + q2a5checkbox.width + 5;
        q2a5Text.y = q2a5checkbox.y + 5;
        this.addChildToContainer(q2a5Text);
        var q2a6checkbox = ComponentManager.getCheckBox();
        q2a6checkbox.x = q1a2checkbox.x;
        q2a6checkbox.y = q2a5checkbox.y;
        q2a6checkbox.setScale(0.8);
        this.addChildToContainer(q2a6checkbox);
        this._q2aList.push(q2a6checkbox);
        q2a6checkbox.addTouchTap(this.q2Handler, this, [5]);
        var q2a6Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A6"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a6Text.x = q2a6checkbox.x + q2a6checkbox.width + 5;
        q2a6Text.y = q2a6checkbox.y + 5;
        this.addChildToContainer(q2a6Text);
        var q2a7checkbox = ComponentManager.getCheckBox();
        q2a7checkbox.x = q1a1checkbox.x;
        q2a7checkbox.y = q2a5checkbox.y + 50;
        q2a7checkbox.setScale(0.8);
        this.addChildToContainer(q2a7checkbox);
        this._q2aList.push(q2a7checkbox);
        q2a7checkbox.addTouchTap(this.q2Handler, this, [6]);
        var q2a7Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A7"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a7Text.x = q2a7checkbox.x + q2a7checkbox.width + 5;
        q2a7Text.y = q2a7checkbox.y + 5;
        this.addChildToContainer(q2a7Text);
        var q2a8checkbox = ComponentManager.getCheckBox();
        q2a8checkbox.x = q1a2checkbox.x;
        q2a8checkbox.y = q2a7checkbox.y;
        q2a8checkbox.setScale(0.8);
        this.addChildToContainer(q2a8checkbox);
        this._q2aList.push(q2a8checkbox);
        q2a8checkbox.addTouchTap(this.q2Handler, this, [7]);
        var q2a8Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ2A8"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q2a8Text.x = q2a6Text.x;
        q2a8Text.y = q2a8checkbox.y + 5;
        this.addChildToContainer(q2a8Text);
        ///qqqq3
        var qbg3 = BaseBitmap.create("public_tc_bg05");
        qbg3.width = 510;
        qbg3.height = 40;
        qbg3.x = GameConfig.stageWidth / 2 - qbg3.width / 2;
        ;
        qbg3.y = q2a5checkbox.y + 90;
        this.addChildToContainer(qbg3);
        var q3Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q3Text.x = q1Text.x;
        q3Text.y = qbg3.y + qbg3.height / 2 - q3Text.height / 2;
        this.addChildToContainer(q3Text);
        var q3a1checkbox = ComponentManager.getCheckBox();
        q3a1checkbox.x = q1a1checkbox.x;
        q3a1checkbox.y = qbg3.y + qbg3.height + 10;
        q3a1checkbox.setScale(0.8);
        this.addChildToContainer(q3a1checkbox);
        this._q3aList.push(q3a1checkbox);
        q3a1checkbox.addTouchTap(this.q3Handler, this, [0]);
        var q3a1Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ3A1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q3a1Text.x = q3a1checkbox.x + q3a1checkbox.width + 5;
        q3a1Text.y = q3a1checkbox.y + 5;
        this.addChildToContainer(q3a1Text);
        var q3a2checkbox = ComponentManager.getCheckBox();
        q3a2checkbox.x = q1a2checkbox.x;
        q3a2checkbox.y = q3a1checkbox.y;
        q3a2checkbox.setScale(0.8);
        this.addChildToContainer(q3a2checkbox);
        this._q3aList.push(q3a2checkbox);
        q3a2checkbox.addTouchTap(this.q3Handler, this, [1]);
        var q3a2Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ3A2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q3a2Text.x = q2a2Text.x;
        q3a2Text.y = q3a2checkbox.y + 5;
        this.addChildToContainer(q3a2Text);
        var qbg4 = BaseBitmap.create("public_tc_bg05");
        qbg4.width = 510;
        qbg4.height = 40;
        qbg4.x = GameConfig.stageWidth / 2 - qbg4.width / 2;
        ;
        qbg4.y = qbg3.y + 90;
        this.addChildToContainer(qbg4);
        var q4Text = ComponentManager.getTextField(LanguageManager.getlocal("questionnaireQ4"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        q4Text.x = q1Text.x;
        q4Text.y = qbg4.y + qbg4.height / 2 - q4Text.height / 2;
        this.addChildToContainer(q4Text);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 134, "public_tc_srkbg05", LanguageManager.getlocal("questionnaireQ4Tip"), TextFieldConst.COLOR_WHITE);
        inputTF.y = qbg4.y + qbg4.height + 15;
        this.addChildToContainer(inputTF);
        this._inputMsg = inputTF.getChildByName("textField");
        this._inputMsg.y = 10;
        this._inputMsg.height = 130;
        this._inputMsg.width = 456;
        this._inputMsg.maxChars = 200;
        this._inputMsg.multiline = true;
        inputTF.x = bg1.x + bg1.width / 2 - inputTF.width / 2;
        var changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "DragonBoatDayLq", this.getHandler, this);
        changeBtn.x = this.viewBg.width / 2 - changeBtn.width / 2;
        changeBtn.y = inputTF.y + inputTF.height + 15;
        // changeBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(changeBtn);
        this._getButton = changeBtn;
    };
    QuestionnairePopupView.prototype.q1Handler = function (event, ii) {
        this.q1Index = ii + 1;
        for (var index = 0; index < this._q1aList.length; index++) {
            var element = this._q1aList[index];
            if (ii != index) {
                element.setSelected(false);
            }
        }
    };
    QuestionnairePopupView.prototype.q2Handler = function (event, ii) {
        this.q2Index = ii + 1;
        for (var index = 0; index < this._q2aList.length; index++) {
            var element = this._q2aList[index];
            if (ii != index) {
                element.setSelected(false);
            }
        }
    };
    QuestionnairePopupView.prototype.q3Handler = function (event, ii) {
        this.q3Index = ii + 1;
        for (var index = 0; index < this._q3aList.length; index++) {
            var element = this._q3aList[index];
            if (ii != index) {
                element.setSelected(false);
            }
        }
    };
    QuestionnairePopupView.prototype.getHandler = function (param) {
        if (!this.q1Index || !this.q2Index || !this.q3Index) {
            App.CommonUtil.showTip(LanguageManager.getlocal("questionnaireEmptyTip"));
            return;
        }
        var q4 = this._inputMsg.text;
        if (!this._inputMsg.bindData) {
            q4 = "";
        }
        var device = App.DeviceUtil.isIOS() ? "IOS" : "Android";
        this.request(NetRequestConst.REQUEST_OTHERINFO_QUESTIONNAIRE, { question1: this.q1Index, question2: this.q2Index, question3: this.q3Index, question4: q4, system: device });
        this._getButton.setEnable(false);
    };
    //请求回调
    QuestionnairePopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.data && data.data.data.rewards) {
            var rewards = GameData.formatRewardItem(data.data.data.rewards);
            if (rewards && rewards.length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
        }
        this.hide();
    };
    // protected getResourceList():string[]
    // {
    // 	return super.getResourceList().concat([
    // 				"shield_cn"
    // 				]);
    // }
    QuestionnairePopupView.prototype.dispose = function () {
        // this._inputPassWard = null;
        this._inputMsg = null;
        // this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return QuestionnairePopupView;
}(PopupView));
__reflect(QuestionnairePopupView.prototype, "QuestionnairePopupView");
