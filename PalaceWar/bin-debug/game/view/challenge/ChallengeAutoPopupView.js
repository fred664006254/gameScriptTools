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
var ChallengeAutoPopupView = (function (_super) {
    __extends(ChallengeAutoPopupView, _super);
    function ChallengeAutoPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    ChallengeAutoPopupView.prototype.getTitleStr = function () {
        return "challengeAutoFight";
    };
    // protected isShowOpenAni():boolean
    // {
    // 	return false;
    // }
    ChallengeAutoPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var grayBg = BaseBitmap.create("public_9_bg4");
        grayBg.width = 518;
        grayBg.height = 180;
        grayBg.setPosition(this.viewBg.width / 2 - grayBg.width / 2, 65);
        this.addChildToContainer(grayBg);
        var goldBg = BaseBitmap.create("public_9_resbg");
        goldBg.setPosition(grayBg.x + 12, 12);
        this.addChildToContainer(goldBg);
        var goldIcon = BaseLoadBitmap.create("itemicon4");
        goldIcon.setScale(0.5);
        goldIcon.x = goldBg.x - 3;
        goldIcon.y = goldBg.y + goldBg.height / 2 - 100 / 2 + 25;
        this.addChildToContainer(goldIcon);
        var goldText = ComponentManager.getTextField(Api.playerVoApi.getSoldier().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        goldText.setPosition(goldBg.x + 50, goldBg.y + goldBg.height / 2 - goldText.height / 2);
        this.addChildToContainer(goldText);
        goldBg.width = goldText.width + 70;
        var fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "challengeAutoFightBtn", this.goToFight, this);
        fightBtn.setPosition(this.viewBg.width / 2 - fightBtn.width / 2, 260);
        this.addChildToContainer(fightBtn);
        fightBtn.setColor(TextFieldConst.COLOR_BLACK);
        //计算消耗
        var nowCid = Api.challengeVoApi.getCurChannelId() - 1;
        var targetCid = nowCid;
        //剩余士兵
        var ksoldier = Api.playerVoApi.getSoldier();
        for (var i = nowCid; i <= nowCid + 40; i++) {
            var challengeCfg = ChallengeCfg.getChallengeCfgById(i + 1);
            if (challengeCfg.type == 1) {
                var atk2 = challengeCfg.atk;
                var soldier2 = challengeCfg.soldier;
                if (i == Api.challengeVoApi.getCurChannelId()) {
                    soldier2 -= Api.challengeVoApi.getCurKilledNum();
                }
                var atk1 = Api.playerVoApi.getAtk();
                var soldier1 = ksoldier;
                var report = Api.conquestVoApi.getBattleResult(atk1, soldier1, atk2, soldier2);
                if (report.success == true) {
                    targetCid++;
                    ksoldier = report.left1;
                }
                else {
                    ksoldier = 0;
                    break;
                }
            }
            else {
                break;
            }
        }
        var consume = Api.playerVoApi.getSoldier() - ksoldier;
        var consumeText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightConsume", [String(consume)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        consumeText.setPosition(this.viewBg.width / 2 - consumeText.width / 2, 100);
        this.addChildToContainer(consumeText);
        var bcid = Math.floor(targetCid / 41) + 1;
        var mcid = Math.floor(targetCid % 41 / 8) + 1;
        mcid = mcid == 6 ? 5 : mcid;
        var targetStr = LanguageManager.getlocal("challengeTitle" + bcid);
        var targetText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightTarget", [String(bcid), targetStr, String(mcid)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        targetText.setPosition(this.viewBg.width / 2 - targetText.width / 2, 145);
        this.addChildToContainer(targetText);
        var dialogText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightNoDialog"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        dialogText.setPosition(this.viewBg.width / 2 - dialogText.width / 2, 190);
        this.addChildToContainer(dialogText);
    };
    ChallengeAutoPopupView.prototype.goToFight = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CHALLENGEAUTOREWARDSPOPUOVIEW, { f: this._callbackF, o: this._obj });
        this.hide();
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ChallengeAutoPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ChallengeAutoPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return ChallengeAutoPopupView;
}(PopupView));
__reflect(ChallengeAutoPopupView.prototype, "ChallengeAutoPopupView");
//# sourceMappingURL=ChallengeAutoPopupView.js.map