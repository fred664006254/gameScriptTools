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
var NewQuestionnairePopupView = (function (_super) {
    __extends(NewQuestionnairePopupView, _super);
    function NewQuestionnairePopupView() {
        var _this = _super.call(this) || this;
        _this._radioNums = 0;
        return _this;
    }
    NewQuestionnairePopupView.prototype.initView = function () {
        var _this = this;
        this._radioNums = 0;
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
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("newquestion_37wd_tip_3", [Config.QuestionnaireCfg.getReward()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameText.x = GameConfig.stageWidth / 2 - nameText.width / 2;
        nameText.y = bg1.y + 20;
        this.addChildToContainer(nameText);
        NewQuestionnaireCtrl.getIns().clearAnswers();
        var list = Config.QuestionnaireCfg.getList();
        var _scroRect = new egret.Rectangle(70, 161 + 15, 500, 620);
        this._scrollList = ComponentManager.getScrollList(NewQuestionnaireItem, list, _scroRect);
        this._scrollList.x = 70;
        this._scrollList.y = 100; //161+15;
        this.addChildToContainer(this._scrollList);
        //统计单选数量
        list.forEach(function (item) {
            if (item.answerNum == 0 && item.multipleChoice == 0) {
            }
            else {
                _this._radioNums++;
            }
        });
        var changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "DragonBoatDayLq", this.getHandler, this);
        changeBtn.x = this.viewBg.width / 2 - changeBtn.width / 2;
        changeBtn.y = 726; //798+9;
        // changeBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(changeBtn);
        this._getButton = changeBtn;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE, this.receiveData, this);
    };
    NewQuestionnairePopupView.prototype.getHandler = function (param) {
        var view_data = NewQuestionnaireCtrl.getIns(), answers = view_data.getAnswers();
        var data = {}, sendData = {};
        var radioNum = 0; //统计已答单选题数量
        for (var key in answers) {
            data[key] = answers[key];
            if (answers[key].length > 0) {
                radioNum++;
            }
        }
        if (radioNum < this._radioNums) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newquestion_37wd_tip_2"));
            return;
        }
        if (view_data.getInputStr() == "") {
            App.CommonUtil.showTip(LanguageManager.getlocal("newquestion_37wd_tip_2"));
            return;
        }
        var device = App.DeviceUtil.isIOS() ? "IOS" : "Android";
        var q4 = view_data.getInputStr();
        data[view_data.getInputId()] = q4;
        sendData["answer"] = data;
        sendData["sysphone"] = device;
        this.request(NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE, sendData);
        this._getButton.setEnable(false);
    };
    //请求回调
    NewQuestionnairePopupView.prototype.receiveData = function (event) {
        var data = event.data;
        if (!data.ret) {
            // App.CommonUtil.showTip(LanguageManager.getlocal(data.data.msg));
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
    NewQuestionnairePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._scrollList = null;
    };
    return NewQuestionnairePopupView;
}(PopupView));
__reflect(NewQuestionnairePopupView.prototype, "NewQuestionnairePopupView");
