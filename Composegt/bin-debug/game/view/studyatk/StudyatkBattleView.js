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
var StudyatkBattleView = (function (_super) {
    __extends(StudyatkBattleView, _super);
    function StudyatkBattleView() {
        var _this = _super.call(this) || this;
        _this._winCode = 0;
        _this._myInfo = null;
        _this._playerTab = [];
        _this._dialogTab = [];
        _this._curRound = 0;
        _this._oldPosTab = [];
        _this._rattleText = null;
        _this._rattleContainer = null;
        _this._dialogType = 0;
        _this._beAttackClip = null;
        _this._callback = null;
        _this._target = null;
        _this._str = null;
        return _this;
    }
    StudyatkBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_battle_info", "arena_bg", "battle_attack_anim", "dailybosslastattacktitle_di"
        ]);
    };
    StudyatkBattleView.prototype.getBgName = function () {
        return "arena_bg";
    };
    StudyatkBattleView.prototype.initView = function () {
        this._winCode = this.param.data.wcode;
        this._myInfo = this.param.data.info;
        this._callback = this.param.data.f;
        this._target = this.param.data.o;
        this._str = this.param.data.str;
        var downPlayer = this.getPlayerContainer(0);
        downPlayer.y = GameConfig.stageHeigth - 520;
        this.addChildToContainer(downPlayer);
        this._oldPosTab[0] = egret.Point.create(downPlayer.x, downPlayer.y);
        var upPlayer = this.getPlayerContainer(1);
        upPlayer.y = 30;
        this.addChildToContainer(upPlayer);
        this._oldPosTab[1] = egret.Point.create(upPlayer.x, upPlayer.y);
        this._playerTab = [downPlayer, upPlayer];
        this._beAttackClip = ComponentManager.getCustomMovieClip("atk_anim_", 8, 70);
        this._beAttackClip.setEndCallBack(this.clipEndCallback, this);
        this.initDialog();
        this.initDialogBg();
        this.showRound();
        // this.showEnd();
    };
    StudyatkBattleView.prototype.showRound = function () {
        if (this._curRound >= this._dialogTab.length) {
            this.showEnd();
            return;
        }
        var attacker;
        var deffencer;
        var attackerPoint;
        var deffencerPoint;
        var scaleTo = 0.8;
        if (this._curRound % 2 == 0) {
            attacker = this._playerTab[0];
            deffencer = this._playerTab[1];
            attackerPoint = this._oldPosTab[0];
            deffencerPoint = egret.Point.create(this._oldPosTab[1].x + deffencer.width * 0.1, this._oldPosTab[1].y + deffencer.height * 0.1);
        }
        else {
            attacker = this._playerTab[1];
            deffencer = this._playerTab[0];
            attackerPoint = this._oldPosTab[1];
            deffencerPoint = egret.Point.create(this._oldPosTab[0].x + deffencer.width * 0.1, this._oldPosTab[0].y + deffencer.height * 0.1);
        }
        // var colorMatrix = [
        // 	0.3,0.6,0,0,0,
        // 	0.3,0.6,0,0,0,
        // 	0.3,0.6,0,0,0,
        // 	0,0,0,0.9,0
        // ];
        // var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        // attacker.filters=null;
        // deffencer.filters=[colorFlilter];
        attacker.alpha = 1;
        deffencer.alpha = 0.8;
        egret.Tween.removeTweens(attacker);
        egret.Tween.removeTweens(deffencer);
        egret.Tween.get(attacker).to({ scaleX: 1, scaleY: 1, x: attackerPoint.x, y: attackerPoint.y }, 300);
        egret.Tween.get(deffencer).to({ scaleX: 0.8, scaleY: 0.8, x: deffencerPoint.x, y: deffencerPoint.y }, 300).call(this.showDialog, this);
    };
    StudyatkBattleView.prototype.showDialog = function () {
        if (this._curRound % 2 == 0) {
            this._rattleContainer.y = this._playerTab[0].y;
        }
        else {
            this._rattleContainer.y = this._playerTab[1].y;
        }
        this._rattleText.text = this._dialogTab[this._curRound];
        this.addChildToContainer(this._rattleContainer);
        this._curRound++;
        egret.Tween.get(this._rattleContainer).wait(2000).call(this.resetContainer, this);
    };
    StudyatkBattleView.prototype.resetContainer = function () {
        this.removeChildFromContainer(this._rattleContainer);
        this.showRound();
    };
    StudyatkBattleView.prototype.showEnd = function () {
        var heroArray = [];
        var scaleTo = 0.4;
        var moveY;
        var offsetY;
        if (this._winCode == 1) {
            heroArray = this._playerTab;
            moveY = heroArray[1].y + 100;
            offsetY = 50;
        }
        else {
            heroArray = [this._playerTab[1], this._playerTab[0]];
            moveY = heroArray[1].y - 100 + 360 * (1 - scaleTo);
            offsetY = -50;
        }
        if (this.container.getChildIndex(heroArray[0]) < this.container.getChildIndex(heroArray[1])) {
            this.container.swapChildren(heroArray[0], heroArray[1]);
        }
        var moveTime1 = 120;
        var moveTime2 = 300;
        var moveTo = egret.Point.create(heroArray[0].x + (1 - scaleTo) * heroArray[0].width / 2, moveY);
        egret.Tween.get(heroArray[0]).
            to({ y: heroArray[0].y + offsetY }, 150).
            to({ x: moveTo.x, y: moveTo.y, scaleX: scaleTo, scaleY: scaleTo }, moveTime1).
            to({ x: heroArray[0].x, y: heroArray[0].y, scaleX: 1, scaleY: 1 }, moveTime2);
        TimerManager.doTimer(moveTime1 + 150, 1, this.showBeAttackAnim, this);
    };
    StudyatkBattleView.prototype.showBeAttackAnim = function () {
        var offsetY;
        var beAttackHero;
        if (this._winCode == 1) {
            beAttackHero = this._playerTab[1];
            offsetY = -30;
        }
        else {
            beAttackHero = this._playerTab[0];
            offsetY = 30;
        }
        if (!beAttackHero) {
            return;
        }
        egret.Tween.get(beAttackHero).to({ y: beAttackHero.y + offsetY }, 100).to({ y: beAttackHero.y }, 120).to({ alpha: 0 }, 800).call(this.showBattleRsult, this);
        var tempBitmap = BaseBitmap.create("atk_anim_1");
        this._beAttackClip.setPosition(GameConfig.stageWidth / 2 - tempBitmap.width / 2, beAttackHero.y + 360 / 2 - tempBitmap.height / 2);
        this.addChildToContainer(this._beAttackClip);
        this._beAttackClip.goToAndPlay(0);
        this._beAttackClip.playWithTime(1);
    };
    StudyatkBattleView.prototype.clipEndCallback = function () {
        if (this._beAttackClip) {
            this.removeChildFromContainer(this._beAttackClip);
        }
    };
    StudyatkBattleView.prototype.hide = function () {
        if (this._callback && this._target && this._str) {
            this._callback.apply(this._target, [this._str]);
        }
        _super.prototype.hide.call(this);
    };
    StudyatkBattleView.prototype.showBattleRsult = function () {
        ViewController.getInstance().openView(ViewConst.BASE.STUDYATKBATTLERESULEVIEW, { f: this.hide, o: this, type: this._dialogType });
    };
    StudyatkBattleView.prototype.initDialogBg = function () {
        this._rattleContainer = new BaseDisplayObjectContainer();
        /*
        let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
        this._rattleContainer.addChild(wordsBg);
        wordsBg.width = 270;
        wordsBg.height = 80;

        let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
        wordsCornerBg.x = 40;
        wordsCornerBg.y = wordsBg.y +wordsBg.height -3;
        this._rattleContainer.addChild(wordsCornerBg);
        */
        var wordsBg = BaseBitmap.create("public_9v_bg11");
        wordsBg.width = 264;
        wordsBg.height = 130;
        wordsBg.scaleX = -1;
        wordsBg.x = wordsBg.width;
        this._rattleContainer.addChild(wordsBg);
        this._rattleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._rattleText.width = wordsBg.width - 26;
        this._rattleText.textColor = TextFieldConst.COLOR_BLACK;
        this._rattleText.lineSpacing = 5;
        this._rattleText.setPosition(wordsBg.width / 2 - this._rattleText.width / 2, 18);
        this._rattleContainer.addChild(this._rattleText);
        this._rattleContainer.x = GameConfig.stageWidth / 2 + 40;
    };
    StudyatkBattleView.prototype.initDialog = function () {
        var dialogType;
        if (this._myInfo[0].minlevelid > this._myInfo[1].minlevelid) {
            dialogType = 3;
        }
        else {
            if (this._winCode == 1) {
                dialogType = 1;
            }
            else {
                dialogType = 2;
            }
        }
        this._dialogType = dialogType;
        var randType = App.MathUtil.getRandom() > 50 ? 2 : 1;
        // let myTitle:string = LanguageManager.getlocal("officialTitle"+this._myInfo[0].level);
        var myTitle = Api.playerVoApi.getPlayerMinLevelStr(this._myInfo[0].minlevelid);
        // let enemyTitle:string = LanguageManager.getlocal("officialTitle"+this._myInfo[1].level);
        var enemyTitle = Api.playerVoApi.getPlayerMinLevelStr(this._myInfo[1].minlevelid);
        var myExp = this._myInfo[0].exp;
        var enemyExp = this._myInfo[1].exp;
        if (dialogType == 1 && randType == 1) {
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win1_1", [enemyTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win1_2", [enemyTitle, enemyExp.toString()]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win1_3", [myExp.toString()]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win1_4"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win1_5"));
        }
        else if (dialogType == 1 && randType == 2) {
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win2_1"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win2_2", [myTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win2_3", [myTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win2_4", [enemyExp.toString()]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_win2_5", [myExp.toString()]));
        }
        else if (dialogType == 2 && randType == 1) {
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost1_1", [myTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost1_2", [myTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost1_3"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost1_4", [enemyExp.toString()]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost1_5"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost1_6"));
        }
        else if (dialogType == 2 && randType == 2) {
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost2_1", [enemyTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost2_2", [enemyTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost2_3", [myExp.toString()]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost2_4", [enemyExp.toString()]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost2_5"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_lost2_6"));
        }
        else if (dialogType == 3 && randType == 1) {
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_difflv1_1", [enemyTitle]));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_difflv1_2"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_difflv1_3"));
        }
        else if (dialogType == 3 && randType == 2) {
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_difflv2_1"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_difflv2_2"));
            this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_difflv2_3"));
        }
    };
    // idx 0 下面  1 上面
    StudyatkBattleView.prototype.getPlayerContainer = function (idx) {
        var bgContainer = new BaseDisplayObjectContainer();
        var buttomBg = BaseBitmap.create("public_9v_bg05");
        buttomBg.width = 270;
        buttomBg.height = 70;
        var info = this._myInfo[idx];
        var curLv = info.level;
        if (info.title != "") {
            curLv = info.title;
        }
        var playerImg = Api.playerVoApi.getPlayerPortrait(curLv, info.pic);
        var maskRect = new egret.Rectangle();
        maskRect.setTo(0, 0, playerImg.width, 320);
        playerImg.mask = maskRect;
        // playerImg.setScale(300/playerImg.height);
        playerImg.x = buttomBg.width / 2 - 300 / 2;
        bgContainer.addChild(playerImg);
        buttomBg.y = 300 - 12;
        bgContainer.addChild(buttomBg);
        var playerName = ComponentManager.getTextField(info.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        playerName.setPosition(28, buttomBg.y + 14);
        bgContainer.addChild(playerName);
        var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer") + Api.playerVoApi.getPlayerMinLevelStr(info.minlevelid), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoDesc1.setPosition(playerName.x, playerName.y + playerName.height + 5);
        bgContainer.addChild(infoDesc1);
        bgContainer.x = GameConfig.stageWidth / 2 - bgContainer.width / 2;
        return bgContainer;
    };
    StudyatkBattleView.prototype.dispose = function () {
        for (var k in this._playerTab) {
            this._playerTab[k].filters = null;
        }
        this._winCode = 0;
        this._myInfo = null;
        this._playerTab.length = 0;
        this._dialogTab.length = 0;
        this._curRound = 0;
        this._oldPosTab.length = 0;
        this._rattleText = null;
        this._rattleContainer = null;
        this._dialogType = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkBattleView;
}(CommonView));
__reflect(StudyatkBattleView.prototype, "StudyatkBattleView");
