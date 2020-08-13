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
var StudyatkBattleResultView = (function (_super) {
    __extends(StudyatkBattleResultView, _super);
    function StudyatkBattleResultView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._type = 1; //1 同级胜利   2 同级失败  3 不同级胜利
        return _this;
    }
    StudyatkBattleResultView.prototype.getResourceList = function () {
        var rewardPic = [];
        if (this.param.data.type == 2) {
            rewardPic = ["battle_fail_word"];
        }
        else {
            rewardPic = ["battle_win_word"];
        }
        return rewardPic.concat([]);
    };
    StudyatkBattleResultView.prototype.getTitleBgName = function () {
        return null;
    };
    StudyatkBattleResultView.prototype.getTitleStr = function () {
        return null;
    };
    StudyatkBattleResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    StudyatkBattleResultView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this.param.data && this.param.data.type) {
            this._type = this.param.data.type;
        }
        var winBg = BaseBitmap.create("public_9_wordbg");
        winBg.width = GameConfig.stageWidth;
        winBg.height = 168;
        var discStr;
        if (Api.switchVoApi.checkOpenStudyatkNewRule()) {
            // 统一使用一个key
            winBg.height = 220;
            discStr = LanguageManager.getlocal("studyatk_battle_result_new");
            if (Api.switchVoApi.checkIsTitleState("3501") || Api.switchVoApi.checkIsTitleState("3601")) {
                discStr = LanguageManager.getlocal("studyatk_battle_result_new2");
            }
        }
        else {
            if (this._type == 3) {
                discStr = LanguageManager.getlocal("studyatk_battle_result1");
            }
            else {
                discStr = LanguageManager.getlocal("studyatk_battle_result2");
            }
        }
        winBg.setPosition(GameConfig.stageWidth / 2 - winBg.width / 2, GameConfig.stageHeigth / 2 - winBg.height / 2);
        this.addChildToContainer(winBg);
        var wordPic;
        if (this._type == 2) {
            App.DisplayUtil.changeToGray(winBg);
            wordPic = "battle_fail_word";
        }
        else {
            wordPic = "battle_win_word";
        }
        var winText = BaseBitmap.create(wordPic);
        winText.setPosition(GameConfig.stageWidth / 2 - winText.width / 2, winBg.y - winText.height / 2);
        this.addChildToContainer(winText);
        var battleResult = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.addChildToContainer(battleResult);
        if (this._type == 2) {
            battleResult.text = LanguageManager.getlocal("studyatkBattle_lost");
            battleResult.setPosition(winBg.width / 2 - battleResult.width / 2, winBg.y + 69);
            battleResult.textColor = TextFieldConst.COLOR_QUALITY_RED;
        }
        else {
            battleResult.text = LanguageManager.getlocal("studyatkBattle_win");
            battleResult.setPosition(winBg.width / 2 - battleResult.width / 2, winBg.y + 69);
            battleResult.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
        var battleFail2 = ComponentManager.getTextField(discStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        battleFail2.lineSpacing = 5;
        battleFail2.setPosition(winBg.width / 2 - battleFail2.width / 2, battleResult.y + 45);
        this.addChildToContainer(battleFail2);
    };
    StudyatkBattleResultView.prototype.touchTap = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    StudyatkBattleResultView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._type = 1;
        _super.prototype.dispose.call(this);
    };
    return StudyatkBattleResultView;
}(BaseView));
__reflect(StudyatkBattleResultView.prototype, "StudyatkBattleResultView");
//# sourceMappingURL=StudyatkBattleResultView.js.map