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
var StorychallengeView = (function (_super) {
    __extends(StorychallengeView, _super);
    function StorychallengeView() {
        var _this = _super.call(this) || this;
        _this._topContiner = null;
        _this._middleContiner = null;
        _this._buttomContiner = null;
        _this._bigChannel = 0;
        _this._scrollContiner = null;
        return _this;
    }
    StorychallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "challenge_bg1",
            "challenge_pass",
            "battle_boss",
            "channel_bg",
            "challenge_arrow",
            "challenge_story_bg",
            "challenge_top_bg",
            "channel_light",
        ]);
    };
    StorychallengeView.prototype.getTitleStr = function () {
        return "challengeTitle" + this.param.data.info;
    };
    StorychallengeView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_CHALLENGE;
    };
    StorychallengeView.prototype.initView = function () {
        this._bigChannel = this.param.data.info;
        this.container.y = this.getTitleButtomY();
        this._scrollContiner = new BaseDisplayObjectContainer();
        //不拖动
        this.addChildToContainer(this._scrollContiner);
        this._topContiner = new BaseDisplayObjectContainer();
        this._scrollContiner.addChild(this._topContiner);
        this.initTop();
        this.initMiddle();
        this.initButtom();
    };
    StorychallengeView.prototype.initTop = function () {
        var topinfobg = BaseBitmap.create("challenge_top_bg");
        this._topContiner.addChild(topinfobg);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_tip"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        titleText.setPosition(GameConfig.stageWidth / 2 - titleText.width / 2, 50);
        this._topContiner.addChild(titleText);
    };
    StorychallengeView.prototype.initMiddle = function () {
        this._middleContiner = new BaseDisplayObjectContainer();
        this._middleContiner.y = 105;
        this._scrollContiner.addChild(this._middleContiner);
        this._scrollContiner.swapChildren(this._topContiner, this._middleContiner);
        var middleBg = BaseBitmap.create("challenge_bg1");
        middleBg.setPosition(0, GameConfig.stageHeigth - middleBg.height - 225);
        this._middleContiner.addChild(middleBg);
        var posTab = [[150, 0], [376, 90], [154, 180], [380, 270], [149, 360], [377, 450]];
        var offsetY = GameConfig.stageHeigth / 2 - 195 + 160;
        for (var i = 0; i < 6; i++) {
            if (i <= 4) {
                var arrowIcon = BaseBitmap.create("challenge_arrow");
                arrowIcon.anchorOffsetX = arrowIcon.width / 2;
                arrowIcon.anchorOffsetY = arrowIcon.height / 2;
                arrowIcon.x = posTab[i][0] / 2 + posTab[i + 1][0] / 2 + 65;
                arrowIcon.y = offsetY - posTab[i][1] / 2 - posTab[i + 1][1] / 2 + 65;
                if (i % 2 == 1) {
                    arrowIcon.scaleX = -1;
                    arrowIcon.rotation = 25;
                }
                else {
                    arrowIcon.rotation = -25;
                }
                App.DisplayUtil.changeToGray(arrowIcon);
                this._middleContiner.addChild(arrowIcon);
            }
            if (i <= 4) {
                var passTip = ComponentManager.getButton("challenge_pass", "", this.onClickAttack, this, [i], 0);
                passTip.setPosition(posTab[i][0], offsetY - posTab[i][1]);
                this._middleContiner.addChild(passTip);
            }
            else {
                var attButtom = new ChallengeButton();
                attButtom.initButton(this.onClickAttack, this, i, this._bigChannel);
                attButtom.setPosition(posTab[i][0], offsetY - posTab[i][1]);
                this._middleContiner.addChild(attButtom);
            }
        }
    };
    StorychallengeView.prototype.initButtom = function () {
        this._buttomContiner = new BaseDisplayObjectContainer();
        this._buttomContiner.y = GameConfig.stageHeigth - 195 - this.getTitleButtomY();
        this._scrollContiner.addChild(this._buttomContiner);
        var buttomBg = BaseBitmap.create("challenge_story_bg");
        this._buttomContiner.addChild(buttomBg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = buttomBg.y + 24;
        this._buttomContiner.addChild(line1);
        this.titleTF.text = String(this._bigChannel) + ". " + LanguageManager.getlocal("challengeTitle" + this._bigChannel);
        var titleText = ComponentManager.getTextField(this.titleTF.text, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        titleText.setPosition(GameConfig.stageWidth / 2 - titleText.width / 2, 24);
        this._buttomContiner.addChild(titleText);
        this.titleTF.text = titleText.text;
        this.titleTF.x = GameConfig.stageWidth / 2 - this.titleTF.width / 2;
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("challengeDesc" + this._bigChannel), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        descText.width = GameConfig.stageWidth - 100;
        descText.lineSpacing = 6;
        this._buttomContiner.addChild(descText);
        descText.setPosition(50, 56);
    };
    StorychallengeView.prototype.onClickAttack = function (idx) {
        var smallId = (this._bigChannel - 1) * 41 + idx * 8 + 1;
        var challengeConfig = ChallengeCfg.getChallengeCfgById(smallId);
        if (challengeConfig.dialogue) {
            ViewController.getInstance().openView(ViewConst.BASE.CHALLENGESTORY, { dialogue: challengeConfig.dialogue, recall: true, cid: smallId, f2: this.refreshInfo, o2: this });
        }
    };
    StorychallengeView.prototype.refreshInfo = function (bid) {
        if (this._bigChannel != bid) {
            this._bigChannel = bid;
            this._middleContiner.dispose();
            this.initMiddle();
            this._buttomContiner.dispose();
            this.initButtom();
        }
    };
    StorychallengeView.prototype.hide = function () {
        var f = this.param.data.f;
        f.apply(this.param.data.o, [this._bigChannel]);
        _super.prototype.hide.call(this);
    };
    StorychallengeView.prototype.dispose = function () {
        this._bigChannel = 0;
        this._scrollContiner = null;
        _super.prototype.dispose.call(this);
    };
    return StorychallengeView;
}(CommonView));
__reflect(StorychallengeView.prototype, "StorychallengeView");
//# sourceMappingURL=StorychallengelView.js.map