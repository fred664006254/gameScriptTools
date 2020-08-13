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
        _this._wordsBg = null;
        _this._wordsCornerBg = null;
        _this._dialogType = 0;
        _this._beAttackClip = null;
        _this._isHaveTitle = false;
        return _this;
    }
    StudyatkBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_battle_info", "arena_bg", "battle_attack_anim"
        ]);
    };
    StudyatkBattleView.prototype.getBgName = function () {
        return "arena_bg";
    };
    StudyatkBattleView.prototype.initView = function () {
        this._winCode = this.param.data.wcode;
        this._myInfo = this.param.data.info;
        var downPlayer = this.getPlayerContainer(0);
        downPlayer.y = GameConfig.stageHeigth - 520 + downPlayer.anchorOffsetY;
        this.addChildToContainer(downPlayer);
        this._oldPosTab[0] = egret.Point.create(downPlayer.x, downPlayer.y);
        var upPlayer = this.getPlayerContainer(1);
        upPlayer.y = 30 + downPlayer.anchorOffsetY;
        ;
        this.addChildToContainer(upPlayer);
        this._oldPosTab[1] = egret.Point.create(upPlayer.x, upPlayer.y);
        this._playerTab = [downPlayer, upPlayer];
        this._beAttackClip = ComponentManager.getCustomMovieClip("atk_anim_", 7, 70);
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
        egret.Tween.get(attacker).to({ scaleX: 1, scaleY: 1 }, 300);
        egret.Tween.get(deffencer).to({ scaleX: 0.8, scaleY: 0.8, }, 300).call(this.showDialog, this);
        // x: attackerPoint.x, y: attackerPoint.y 
        // x: deffencerPoint.x, y: deffencerPoint.y 
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
        var wordsBgH = this._rattleText.height + 36;
        if (wordsBgH < 80) {
            wordsBgH = 80;
        }
        this._wordsBg.height = wordsBgH;
        this._wordsCornerBg.y = this._wordsBg.y + this._wordsBg.height - 3;
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
        this._playerTab[0].alpha = 1;
        this._playerTab[1].alpha = 1;
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
        var moveTo = egret.Point.create(heroArray[0].x + (1 - scaleTo) * 382 / 2, moveY);
        egret.Tween.get(heroArray[0]).
            to({ y: heroArray[0].y + offsetY }, 150).
            to({ y: moveY, scaleX: scaleTo, scaleY: scaleTo }, moveTime1).
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
        if (beAttackHero) {
            egret.Tween.get(beAttackHero).to({ y: beAttackHero.y + offsetY }, 100).to({ y: beAttackHero.y }, 120).to({ alpha: 0 }, 800).call(this.showBattleRsult, this);
            var tempBitmap = BaseBitmap.create("atk_anim_1");
            this._beAttackClip.setPosition(GameConfig.stageWidth / 2 - tempBitmap.width / 2, beAttackHero.y + 360 / 2 - tempBitmap.height / 2);
            this.addChildToContainer(this._beAttackClip);
            this._beAttackClip.goToAndPlay(0);
            this._beAttackClip.playWithTime(1);
        }
    };
    StudyatkBattleView.prototype.clipEndCallback = function () {
        if (this._beAttackClip) {
            this.removeChildFromContainer(this._beAttackClip);
        }
    };
    StudyatkBattleView.prototype.showBattleRsult = function () {
        var dialogType;
        if (this._isHaveTitle) {
            //失败情况统一 传type 2
            if (this._dialogType == 3 || this._dialogType == 6 || this._dialogType == 7 || this._dialogType == 8) {
                dialogType = 2;
            }
            else {
                dialogType = 1;
            }
        }
        else {
            dialogType = this._dialogType;
        }
        ViewController.getInstance().openView(ViewConst.BASE.STUDYATKBATTLERESULEVIEW, { f: this.hide, o: this, type: dialogType });
    };
    StudyatkBattleView.prototype.initDialogBg = function () {
        this._rattleContainer = new BaseDisplayObjectContainer();
        this._wordsBg = BaseBitmap.create("public_9_bg25");
        this._rattleContainer.addChild(this._wordsBg);
        this._wordsBg.width = 270;
        this._wordsBg.height = 80;
        this._wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
        this._wordsCornerBg.x = 40;
        this._wordsCornerBg.y = this._wordsBg.y + this._wordsBg.height - 3;
        this._rattleContainer.addChild(this._wordsCornerBg);
        this._rattleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._rattleText.width = this._wordsBg.width - 26;
        this._rattleText.textColor = TextFieldConst.COLOR_BLACK;
        this._rattleText.lineSpacing = 5;
        this._rattleText.setPosition(this._wordsBg.width / 2 - this._rattleText.width / 2, 18);
        this._rattleContainer.addChild(this._rattleText);
        this._rattleContainer.x = GameConfig.stageWidth / 2 + 40;
    };
    StudyatkBattleView.prototype.initDialog = function () {
        var dialogType = this.getDialogType();
        ;
        // if (this._myInfo[0].level > this._myInfo[1].level) {
        // 	dialogType = 3;
        // }
        // else {
        // 	if (this._winCode == 1) {
        // 		dialogType = 1;
        // 	}
        // 	else {
        // 		dialogType = 2;
        // 	}
        // }
        this._dialogType = dialogType;
        var randType = App.MathUtil.getRandom() > 50 ? 2 : 1;
        var myTitle = LanguageManager.getlocal("officialTitle" + this._myInfo[0].level);
        var enemyTitle = LanguageManager.getlocal("officialTitle" + this._myInfo[1].level);
        var myExp = this._myInfo[0].exp;
        var enemyExp = this._myInfo[1].exp;
        var titleinfo = App.CommonUtil.getTitleData(this._myInfo[0].titleKey);
        var myTitleCfg = Config.TitleCfg.getTitleCfgById(titleinfo.title);
        var othertitleinfo = App.CommonUtil.getTitleData(this._myInfo[1].titleKey);
        var enemyTitleCfg = Config.TitleCfg.getTitleCfgById(othertitleinfo.title);
        if (this._isHaveTitle == false) {
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
        }
        else {
            if (dialogType == 1) {
                //双方都有称号，我的称号 大于 你的称号 胜利
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType1_1_1", [enemyTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType1_2_1", [enemyTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType1_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType1_4_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType1_5_1"));
            }
            else if (dialogType == 2) {
                //我有称号 。对方没有称号 胜利
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType2_1_1", [enemyTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType2_2_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType2_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType2_4_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType2_5_1"));
            }
            else if (dialogType == 3) {
                //我没有称号 。对方有称号 失败
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType3_1_1", [enemyTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType3_2_1", [enemyTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType3_3_1"));
            }
            else if (dialogType == 4) {
                //4.己方胜利（对方称号与己方一致，官职对拼己方胜利）
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType4_1_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType4_2_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType4_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType4_4_1", [enemyTitleCfg.titleName, enemyTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType4_5_1", [myTitle]));
            }
            else if (dialogType == 5) {
                //己方胜利（对方称号与己方一致，官职对拼一致，政绩对拼己方胜利）
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType5_1_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType5_2_1", [myTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType5_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType5_4_1", [enemyTitleCfg.titleName, enemyTitle, String(enemyExp)]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType5_5_1", [myTitle, String(myExp)]));
            }
            else if (dialogType == 6) {
                //6.己方失败（对方称号与己方一致，官职对拼己方失败）
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType6_1_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType6_2_1", [myTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType6_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType6_4_1", [enemyTitleCfg.titleName, enemyTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType6_5_1"));
            }
            else if (dialogType == 7) {
                //7.己方失败（对方称号与己方一致，官职对拼一致，政绩对拼己方失败）
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType7_1_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType7_2_1", [myTitle]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType7_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType7_4_1", [enemyTitleCfg.titleName, enemyTitle, String(enemyExp)]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType7_5_1"));
            }
            else if (dialogType == 8) {
                //对方称号大于自己
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType8_1_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType8_2_1"));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType8_3_1", [myTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType8_4_1", [enemyTitleCfg.titleName]));
                this._dialogTab.push(LanguageManager.getlocal("studyAtk_fight_dialogType8_5_1"));
            }
        }
    };
    // idx 0 下面  1 上面
    StudyatkBattleView.prototype.getPlayerContainer = function (idx) {
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = 270;
        bgContainer.height = 370;
        var buttomBg = BaseBitmap.create("public_9_downbg");
        buttomBg.width = 270;
        buttomBg.height = 80;
        var info = this._myInfo[idx];
        var curLv = info.level;
        var titleinfo = App.CommonUtil.getTitleData(info.title);
        if (titleinfo.clothes != "") {
            if (!Config.TitleCfg.getIsTitleOnly(titleinfo.clothes)) {
                curLv = titleinfo.clothes;
            }
        }
        var playerImg = Api.playerVoApi.getPlayerPortrait(curLv, info.pic);
        var isnew = Api.playerVoApi.getNewPalaceRole(curLv);
        var maskRect = new egret.Rectangle();
        maskRect.setTo(0, 0, playerImg.width, 320); //playerImg.width
        playerImg.mask = maskRect;
        // playerImg.setScale(300/playerImg.height);
        playerImg.x = buttomBg.width / 2 - playerImg.width / 2;
        bgContainer.addChild(playerImg);
        buttomBg.y = 300 - 12;
        bgContainer.addChild(buttomBg);
        var playerName = ComponentManager.getTextField(info.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        playerName.setPosition(28, buttomBg.y + 15);
        bgContainer.addChild(playerName);
        var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("mainui_officer") + LanguageManager.getlocal("officialTitle" + info.level), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoDesc1.setPosition(playerName.x, playerName.y + playerName.height + 8);
        bgContainer.addChild(infoDesc1);
        bgContainer.anchorOffsetX = bgContainer.width / 2;
        bgContainer.anchorOffsetY = bgContainer.height / 2;
        bgContainer.x = (GameConfig.stageWidth / 2);
        return bgContainer;
    };
    /**
     * 获得比拼类型
     *
     */
    StudyatkBattleView.prototype.getDialogType = function () {
        var dialogType;
        var myInfo = this._myInfo[0];
        var otherInfo = this._myInfo[1];
        var titleinfo = App.CommonUtil.getTitleData(this._myInfo[0].titleKey);
        var myTitleCfg = Config.TitleCfg.getTitleCfgById(titleinfo.title);
        var othertitleinfo = App.CommonUtil.getTitleData(this._myInfo[1].titleKey);
        var otherTitleCfg = Config.TitleCfg.getTitleCfgById(othertitleinfo.title);
        var myType = 0;
        var otherType = 0;
        if (!Api.switchVoApi.checkOpenStudyatkNewRule()) {
            myTitleCfg = null;
            otherTitleCfg = null;
        }
        else {
            //皇>帝>王>卿>仕>公>候
            if (myTitleCfg && myTitleCfg.titleType) {
                myType = myTitleCfg.titleType;
            }
            if (otherTitleCfg && otherTitleCfg.titleType) {
                otherType = otherTitleCfg.titleType;
            }
        }
        //都没有称号情况下走原来的一套 dialogType：1 政绩比拼胜利 2 失败 3 官职比拼胜利
        if (myType == 0 && otherType == 0) {
            this._isHaveTitle = false;
            if (myInfo.level > otherInfo.level) {
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
        }
        else {
            this._isHaveTitle = true;
            // 双方都有称号，我的称号 大于 你的称号 胜利 1
            if (myType > 0 && otherType > 0) {
                //双方称号都相同
                if (myType == otherType) {
                    //官职 自己 大于对方 。胜利
                    if (myInfo.level > otherInfo.level) {
                        dialogType = 4;
                    }
                    else if (myInfo.level < otherInfo.level) {
                        dialogType = 6;
                    }
                    else if (myInfo.level == otherInfo.level) {
                        //政绩比拼胜利
                        if (this._winCode == 1) {
                            dialogType = 5;
                        }
                        else {
                            dialogType = 7;
                        }
                    }
                }
                else {
                    //皇>帝>王>卿>仕>公>候
                    if (myType == 7) {
                        dialogType = 1;
                    }
                    else if (otherType == 7) {
                        dialogType = 8;
                    }
                    else {
                        //都有称号 ，对方称号 大于自己的称号  失败 8 成功 1
                        if ((myType <= 4 && otherType <= 4) || (myType >= 5 && otherType >= 5)) {
                            dialogType = myType < otherType ? 1 : 8;
                        }
                        else if (myType >= 5 && otherType < 5) {
                            dialogType = otherType > 2 ? 1 : 8;
                        }
                        else if (otherType >= 5 && myType < 5) {
                            dialogType = myType < 3 ? 1 : 8;
                        }
                    }
                }
            }
            else if (myType > 0 && otherType == 0) {
                dialogType = 2;
            }
            else if (myType == 0 && otherType > 0) {
                dialogType = 3;
            }
        }
        return dialogType;
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
        this._wordsCornerBg = null;
        this._wordsBg = null;
        this._isHaveTitle = false;
        _super.prototype.dispose.call(this);
    };
    return StudyatkBattleView;
}(CommonView));
__reflect(StudyatkBattleView.prototype, "StudyatkBattleView");
//# sourceMappingURL=StudyatkBattleView.js.map