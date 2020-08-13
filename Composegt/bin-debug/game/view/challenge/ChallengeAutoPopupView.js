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
    /**生成新标头 */
    ChallengeAutoPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    ChallengeAutoPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        // let grayBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // grayBg.width = 518;
        // grayBg.height = 180;
        // grayBg.setPosition(this.viewBg.width/2 - grayBg.width/2 , 65);
        // this.addChildToContainer(grayBg);
        // let innerBg = BaseBitmap.create("public_9v_bg04");
        // innerBg.width = 498;
        // innerBg.height = 160;
        // innerBg.x = this.viewBg.width/2 - innerBg.width/2;
        // innerBg.y = grayBg.y + grayBg.height/2 - innerBg.height/2;
        // this.addChildToContainer(innerBg);
        var goldBg = BaseBitmap.create("public_hb_bg01");
        goldBg.setPosition(this.viewBg.width / 2 - goldBg.width / 2, 28);
        this.addChildToContainer(goldBg);
        var goldIcon = BaseLoadBitmap.create("itemicon4");
        goldIcon.setScale(0.5);
        goldIcon.x = goldBg.x - 3;
        goldIcon.y = goldBg.y + goldBg.height / 2 - 100 / 2 + 22;
        this.addChildToContainer(goldIcon);
        var goldText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        goldText.setPosition(goldBg.x + 50, goldBg.y + goldBg.height / 2 - goldText.height / 2);
        this.addChildToContainer(goldText);
        goldBg.width = goldText.width + 70;
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 530;
        bg.height = 300;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = 75;
        this.addChildToContainer(bg);
        var line = BaseBitmap.create("public_line4");
        line.width = 460;
        line.x = this.viewBg.width / 2 - line.width / 2;
        line.y = 270;
        this.addChildToContainer(line);
        var fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "challengeAutoFightBtn", this.goToFight, this);
        fightBtn.setPosition(this.viewBg.width / 2 - fightBtn.width / 2, 254 + 40);
        this.addChildToContainer(fightBtn);
        // fightBtn.setColor(TextFieldConst.COLOR_BLACK);
        //计算消耗
        var nowCid = Api.challengeVoApi.getCurChannelId() - 1;
        var targetCid = nowCid;
        //剩余士兵
        var ksoldier = Api.playerVoApi.getSoldier();
        var cost = 0;
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
                var report = Api.conquestVoApi.getBattleResult2(atk1, soldier1, atk2, soldier2);
                if (report.success == true) {
                    targetCid++;
                    ksoldier = report.left1;
                    cost = cost + report.cost;
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
        // let consume = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier()-ksoldier);
        var consume = App.StringUtil.changeIntToText(cost);
        var consumeText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightConsume", [String(consume)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        consumeText.setPosition(this.viewBg.width / 2 - consumeText.width / 2, bg.y + 55);
        this.addChildToContainer(consumeText);
        // let bcid:number = Math.floor(targetCid / 41) + 1;
        // let mcid:number = Math.floor(targetCid % 41 / 8 ) + 1;
        var bcid = Api.challengeVoApi.getBigChannelIdByCid2(targetCid);
        var mcid = Api.challengeVoApi.getMiddleChannelById(targetCid);
        // mcid = mcid == 6 ? 5 : mcid;
        var targetStr = LanguageManager.getlocal("challengeTitle" + bcid);
        var targetText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightTarget", [String(bcid), targetStr, String(mcid)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        targetText.setPosition(this.viewBg.width / 2 - targetText.width / 2, consumeText.y + consumeText.height + 12);
        this.addChildToContainer(targetText);
        var dialogText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightNoDialog"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        dialogText.setPosition(this.viewBg.width / 2 - dialogText.width / 2, targetText.y + targetText.height + 12);
        this.addChildToContainer(dialogText);
    };
    ChallengeAutoPopupView.prototype.goToFight = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CHALLENGEAUTOREWARDSPOPUOVIEW, { f: this._callbackF, o: this._obj });
        this.hide();
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ChallengeAutoPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ChallengeAutoPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return ChallengeAutoPopupView;
}(PopupView));
__reflect(ChallengeAutoPopupView.prototype, "ChallengeAutoPopupView");
