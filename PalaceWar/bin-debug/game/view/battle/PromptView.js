/**
 * 温馨提示，也用于战斗失败
 * author shaoliang
 * date 2017/9/29
 * @class PromptView
 */
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
var PromptView = /** @class */ (function (_super) {
    __extends(PromptView, _super);
    function PromptView() {
        var _this = _super.call(this) || this;
        // 1，战斗失败， 2，没兵了   3，没钱啦 4,擂台失败 5.贸易失败
        _this._type = null;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    PromptView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._type = this.param.data.type;
            if (this._type == 1 || this._type == 2 || this._type == 4) {
                rewardPic.push("battle_fail_word");
            }
        }
        return rewardPic.concat([]);
    };
    PromptView.prototype.getTitleBgName = function () {
        return null;
    };
    PromptView.prototype.getTitleStr = function () {
        return null;
    };
    PromptView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    PromptView.prototype.initView = function () {
    };
    PromptView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this._type == 1 || this._type == 2 || this._type == 4 || this._type == 5) {
            var winBg = BaseBitmap.create("public_rule_bg");
            winBg.setPosition(GameConfig.stageWidth / 2 - winBg.width, GameConfig.stageHeigth - 568 - winBg.height / 2);
            this.addChildToContainer(winBg);
            var winBg2 = BaseBitmap.create("public_rule_bg");
            winBg2.scaleX = -1;
            winBg2.setPosition(GameConfig.stageWidth / 2 + winBg2.width - 1, GameConfig.stageHeigth - 568 - winBg2.height / 2);
            this.addChildToContainer(winBg2);
            var awardBg = BaseBitmap.create("public_9_bg1");
            awardBg.width = 500;
            awardBg.height = 140;
            awardBg.setPosition(GameConfig.stageWidth / 2 - awardBg.width / 2, winBg.y + winBg.height / 2 - awardBg.height / 2 + 20);
            this.addChildToContainer(awardBg);
            App.DisplayUtil.changeToGray(winBg);
            App.DisplayUtil.changeToGray(winBg2);
            var winText = BaseBitmap.create("battle_fail_word");
            winText.setPosition(GameConfig.stageWidth / 2 - winText.width / 2, GameConfig.stageHeigth - 568 - winBg.height / 2 - 35);
            this.addChildToContainer(winText);
            if (this._type == 4) {
                var battleFail = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                battleFail.setPosition(winBg.width - battleFail.width / 2 - 20, winBg.y + 145);
                battleFail.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                this.addChildToContainer(battleFail);
                var strr = "-1";
                if (this.param.data.winScore != null) {
                    strr = String(this.param.data.winScore);
                }
                var moraleAdd = ComponentManager.getTextField(strr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
                moraleAdd.setPosition(battleFail.x + battleFail.width + 10, battleFail.y);
                this.addChildToContainer(moraleAdd);
            }
            else {
                var battleFail = ComponentManager.getTextField(LanguageManager.getlocal("battleFail"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                if (this._type == 5) {
                    battleFail.text = LanguageManager.getlocal("battleFail2");
                }
                battleFail.setPosition(winBg.width - battleFail.width / 2, winBg.y + 145);
                battleFail.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                this.addChildToContainer(battleFail);
            }
            var battleFail2 = ComponentManager.getTextField(LanguageManager.getlocal("battleFailTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            battleFail2.setPosition(winBg.width - battleFail2.width / 2, winBg.y + 200);
            battleFail2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            this.addChildToContainer(battleFail2);
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);
            this.container.anchorOffsetX = GameConfig.stageWidth / 2;
            this.container.anchorOffsetY = GameConfig.stageHeigth / 2;
            this.container.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            this.container.scaleX = 0.1;
            this.container.scaleY = 1;
            egret.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 120); //.to({scaleX:1.1,scaleY:1.1},100) 
        }
        if (this._type == 5 && Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == "trade") { }
        else if (this._type != 4) {
            var tipBB = BaseBitmap.create("public_tipbg");
            tipBB.height = 264;
            tipBB.setPosition(GameConfig.stageWidth / 2 - tipBB.width / 2, GameConfig.stageHeigth - tipBB.height - 30);
            this.addChild(tipBB);
            var promptTip = ComponentManager.getTextField(LanguageManager.getlocal("promptTip"), TextFieldConst.FONTSIZE_TITLE_SMALL);
            promptTip.setPosition(GameConfig.stageWidth / 2 - promptTip.width / 2, tipBB.y + 22);
            promptTip.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            this.addChild(promptTip);
            var tipBg1 = BaseBitmap.create("public_9_tipbg");
            tipBg1.height = 62;
            tipBg1.setPosition(GameConfig.stageWidth / 2 - tipBg1.width / 2, tipBB.y + 56);
            this.addChild(tipBg1);
            var tipBg2 = BaseBitmap.create("public_9_tipbg");
            tipBg2.height = 62;
            tipBg2.setPosition(GameConfig.stageWidth / 2 - tipBg2.width / 2, tipBg1.y + tipBg1.height * 2);
            this.addChild(tipBg2);
            for (var i = 1; i <= 3; i++) {
                var preKey = "promptTip";
                if (this._type == 5) {
                    preKey = "tradepromptTip";
                }
                var promptContent = ComponentManager.getTextField(LanguageManager.getlocal(preKey + i), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                promptContent.setPosition(48, tipBg1.y + tipBg1.height * (i - 0.5) - promptContent.height / 2);
                this.addChild(promptContent);
                var sureBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.sureBtnClick, this, [i]);
                sureBtn.setPosition(463, tipBg1.y + tipBg1.height * (i - 0.5) - sureBtn.height / 2);
                sureBtn.setColor(TextFieldConst.COLOR_BLACK);
                this.addChild(sureBtn);
            }
        }
    };
    PromptView.prototype.sureBtnClick = function (idx) {
        var type = idx;
        ViewController.getInstance().hideAllView();
        if (type == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }
        else if (type == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
        }
        else if (type == 3) {
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
        }
        //手动调用士兵限时礼包强弹
        // Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.SOLDIER);
    };
    PromptView.prototype.touchTap = function () {
        if (this._type == 1 || this._type == 2) {
            return;
        }
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        //手动调用士兵限时礼包强弹
        // Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.SOLDIER);
        this.hide();
    };
    PromptView.prototype.getCloseBtnName = function () {
        if (this._type == 5 && Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == "trade") {
            return ButtonConst.COMMON_CLOSE_1;
        }
        return "";
    };
    PromptView.prototype.dispose = function () {
        this._type = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return PromptView;
}(BaseView));
//# sourceMappingURL=PromptView.js.map