var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**头衔对战结果 */
var SixSection1TitleBattleResultView = /** @class */ (function (_super) {
    __extends(SixSection1TitleBattleResultView, _super);
    function SixSection1TitleBattleResultView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._type = 1; //1 同级胜利   2 同级失败  3 不同级胜利
        return _this;
    }
    SixSection1TitleBattleResultView.prototype.getResourceList = function () {
        var rewardPic = [];
        if (this.param.data.type == 2) {
            rewardPic = ["battle_fail_word"];
        }
        else {
            rewardPic = ["battle_win_word"];
        }
        return rewardPic.concat([]);
    };
    SixSection1TitleBattleResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    SixSection1TitleBattleResultView.prototype.getTitleBgName = function () {
        return null;
    };
    SixSection1TitleBattleResultView.prototype.getTitleStr = function () {
        return null;
    };
    SixSection1TitleBattleResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    SixSection1TitleBattleResultView.prototype.initView = function () {
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
        // 统一使用一个key
        winBg.height = 220;
        // discStr = LanguageManager.getlocal("studyatk_battle_result_new");
        // if(Api.switchVoApi.checkIsTitleState(`3501`) || Api.switchVoApi.checkIsTitleState(`3601`)){
        //     discStr = LanguageManager.getlocal("studyatk_battle_result_new2");
        // }
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
        battleResult.textAlign = TextFieldConst.ALIGH_CENTER;
        if (this._type == 2) {
            battleResult.text = LanguageManager.getlocal("sixSection1HoldTitleBattle_lost");
            battleResult.setPosition(winBg.width / 2 - battleResult.width / 2, winBg.y + winBg.height / 2 - battleResult.height / 2);
            battleResult.textColor = TextFieldConst.COLOR_QUALITY_RED;
        }
        else {
            battleResult.text = LanguageManager.getlocal("sixSection1HoldTitleBattle_win");
            battleResult.setPosition(winBg.width / 2 - battleResult.width / 2, winBg.y + winBg.height / 2 - battleResult.height / 2);
            battleResult.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
        // let battleFail2:BaseTextField = ComponentManager.getTextField( discStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // battleFail2.lineSpacing = 5;
        // battleFail2.setPosition(winBg.width/2 - battleFail2.width/2, battleResult.y + 45 );
        // this.addChildToContainer(battleFail2);
    };
    SixSection1TitleBattleResultView.prototype.touchTap = function () {
        if (this._obj && this._callbackF) {
            App.LogUtil.log("touchTap hide");
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    SixSection1TitleBattleResultView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._type = 1;
        _super.prototype.dispose.call(this);
    };
    return SixSection1TitleBattleResultView;
}(CommonView));
//# sourceMappingURL=SixSection1TitleBattleResultView.js.map