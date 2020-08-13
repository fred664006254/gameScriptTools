/*
    author : shaoliang
    date : 2019.10.25
    desc : 天下至尊-战斗
*/
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
var LadderBattleView = (function (_super) {
    __extends(LadderBattleView, _super);
    function LadderBattleView() {
        var _this = _super.call(this) || this;
        //第几场
        _this._type = 0;
        //第几轮
        _this._curRound = 0;
        _this._curIdex = 0;
        _this._curRoundFirst = 0;
        _this._reportVoApi = null;
        _this._beginAnimNode = null;
        _this._fuction = null;
        _this._obj = null;
        _this._topIcons = [];
        _this._bottomIcons = [];
        _this._isEnd = false;
        _this._skipBtn = null;
        _this._skip = false;
        _this._isPause = false;
        return _this;
    }
    LadderBattleView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_CHALLENGE;
    };
    LadderBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    LadderBattleView.prototype.getTitleStr = function () {
        return null;
    };
    LadderBattleView.prototype.getTitleBgName = function () {
        return null;
    };
    LadderBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladder_bg2", "atkrace_skip", 'specialview_commoni_namebg',
            "ladderbattle", "atkrace_battle_info", "progress7_bg", "progress8",
        ]);
    };
    LadderBattleView.prototype.getBgName = function () {
        return "ladder_bg2";
    };
    LadderBattleView.prototype.initView = function () {
        this._type = this.param.data.type;
        this._fuction = this.param.data.f;
        this._obj = this.param.data.o;
        this._reportVoApi = Api.laddertournamentVoApi.reportVoApi;
        if (this.param.data.f2 && this.param.data.o2) {
            this.param.data.f2.apply(this.param.data.o2);
        }
        this._skip = false;
        this._skipBtn = ComponentManager.getButton("atkrace_skip", null, this.skipBattle, this);
        this._skipBtn.setPosition(GameConfig.stageWidth - this._skipBtn.width - 12, 200);
        if (this._type == 1) {
            this._skipBtn.y = 40;
        }
        this.addChild(this._skipBtn);
        this._skipBtn.visible = false;
        this.initBattleInfo();
    };
    LadderBattleView.prototype.skipBattle = function () {
        if (this._isEnd != true) {
            if (!this._skip) {
                if (this._type != 1) {
                    this._curRound = 5;
                }
                this.showLoadingMask();
                this._skip = true;
                this._isPause = true;
            }
        }
    };
    LadderBattleView.prototype.initBattleInfo = function () {
        if (this._type == 1) {
        }
        else {
            var topBg = BaseBitmap.create("public_9_bg89");
            topBg.width = GameConfig.stageWidth;
            topBg.height = 194;
            this.addChildToContainer(topBg);
            var downBg = BaseBitmap.create("public_9_bg89");
            downBg.width = GameConfig.stageWidth;
            downBg.height = 194;
            downBg.y = GameConfig.stageHeigth - downBg.height;
            this.addChildToContainer(downBg);
            var topInfo = this._reportVoApi.getServantInfo(this._type, 2);
            var bottomInfo = this._reportVoApi.getServantInfo(this._type, 1);
            for (var i = 0; i < 5; i++) {
                var topServant = new LadderBattleServantIcon();
                topServant.init(topInfo[i]);
                topServant.anchorOffsetX = topServant.width / 2;
                topServant.anchorOffsetY = topServant.height / 2;
                topServant.setPosition(70 + i * 124, 83);
                this.addChildToContainer(topServant);
                var bottomServant = new LadderBattleServantIcon();
                bottomServant.init(bottomInfo[i]);
                bottomServant.anchorOffsetX = bottomServant.width / 2;
                bottomServant.anchorOffsetY = bottomServant.height / 2;
                bottomServant.setPosition(topServant.x, GameConfig.stageHeigth - 85);
                this.addChildToContainer(bottomServant);
                this._topIcons.push(topServant);
                this._bottomIcons.push(bottomServant);
            }
        }
        this.roundBeginAnim();
    };
    LadderBattleView.prototype.roundBeginAnim = function () {
        this._curRound++;
        if (this._upHero) {
            this._upHero.visible = false;
        }
        if (this._downHero) {
            this._downHero.visible = false;
        }
        if (this._bottomProgress) {
            this._bottomProgress.visible = false;
        }
        if (this._topProgress) {
            this._topProgress.visible = false;
        }
        this._skipBtn.visible = false;
        this._beginAnimNode = new BaseDisplayObjectContainer();
        this.addChild(this._beginAnimNode);
        var view = this;
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("ladderTournament_BattleIcon_ske")) {
            var idleNameTab = ["jiang", "qinglong", "baihu", "zhuque", "xuanwu"];
            var bone = App.DragonBonesUtil.getLoadDragonBones("ladderTournament_BattleIcon", 1, idleNameTab[this._type - 1]);
            bone.x = GameConfig.stageWidth / 2;
            bone.y = GameConfig.stageHeigth / 2;
            this._beginAnimNode.addChild(bone);
            bone.setDragonBoneEventListener(dragonBones.EventObject.START, function () {
                var oneNode = new BaseDisplayObjectContainer();
                view._beginAnimNode.addChild(oneNode);
                var roundBg = BaseBitmap.create("ladder_battle_typebg" + view._type);
                oneNode.addChild(roundBg);
                var picstr = "ladder_battle_round" + view._curRound;
                if (view._type == 1) {
                    picstr = "ladder_battle_round0";
                }
                var roundBitmap = BaseBitmap.create(picstr);
                roundBitmap.setPosition(roundBg.width / 2 - roundBitmap.width / 2, roundBg.height / 2 - roundBitmap.height / 2);
                oneNode.addChild(roundBitmap);
                roundBg.alpha = 0;
                oneNode.setScale(GameConfig.stageWidth / roundBg.width);
                oneNode.y = GameConfig.stageHeigth / 2 - roundBg.height * oneNode.scaleY / 2;
                egret.Tween.get(oneNode).
                    to({ x: GameConfig.stageWidth / 2 - roundBg.width / 2,
                    y: GameConfig.stageHeigth / 2 - roundBg.height / 2,
                    scaleX: 1, scaleY: 1
                }, 150).
                    wait(1500).call(view.roundBegin, view);
            }, this);
            // bone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
            // 	this.roundBegin();
            // }, this);
        }
        else {
            var oneNode = new BaseDisplayObjectContainer();
            this._beginAnimNode.addChild(oneNode);
            var roundBg = BaseBitmap.create("ladder_battle_typebg" + this._type);
            oneNode.addChild(roundBg);
            var picstr = "ladder_battle_round" + this._curRound;
            if (this._type == 1) {
                picstr = "ladder_battle_round0";
            }
            var roundBitmap = BaseBitmap.create(picstr);
            roundBitmap.setPosition(roundBg.width / 2 - roundBitmap.width / 2, roundBg.height / 2 - roundBitmap.height / 2);
            oneNode.addChild(roundBitmap);
            oneNode.setScale(GameConfig.stageWidth / roundBg.width);
            oneNode.y = GameConfig.stageHeigth / 2 - roundBg.height * oneNode.scaleY / 2;
            egret.Tween.get(oneNode).
                to({ x: GameConfig.stageWidth / 2 - roundBg.width / 2,
                y: GameConfig.stageHeigth / 2 - roundBg.height / 2,
                scaleX: 1, scaleY: 1
            }, 500).
                wait(300).call(this.roundBegin, this);
        }
    };
    LadderBattleView.prototype.removeRoundAnim = function () {
        if (this._beginAnimNode) {
            egret.Tween.removeTweens(this._beginAnimNode);
            this.removeChild(this._beginAnimNode);
            this._beginAnimNode = null;
        }
    };
    LadderBattleView.prototype.roundBegin = function () {
        this._skipBtn.visible = true;
        this._isPause = false;
        this.removeRoundAnim();
        this._curIdex = 1;
        this._curRoundFirst = this._reportVoApi.getFirstHandByRound(this._type, this._curRound) % 2;
        var bloods = this._reportVoApi.getBattleBloodByRound(this._type, this._curRound);
        this._topMaxValue = bloods[1] == null ? 0 : bloods[1];
        this._bottomMaxValue = bloods[0] == null ? 0 : bloods[0];
        this.setTopProgress(bloods[1], bloods[1]);
        this.setBottomProgress(bloods[0], bloods[0]);
        var playerInfo = this._reportVoApi.getCompetitorInfo(this._type, this._curRound);
        if (this._type == 1) {
            this.setUpHero(null, playerInfo[1], 4);
            this.setDownHero(null, playerInfo[0], 4);
            this._upHero.x = 17;
            this._downHero.x = 280;
            this._upHero.y = 140;
            this._downHero.y = GameConfig.stageHeigth - 420;
        }
        else {
            if (playerInfo[1].sid) {
                var flag = false;
                var upHeroPic = "";
                if (playerInfo[1].equip) {
                    upHeroPic = "skin_full_" + playerInfo[1].equip;
                    flag = true;
                }
                else {
                    upHeroPic = Config.ServantCfg.getServantItemById(playerInfo[1].sid).fullIcon;
                }
                this.setUpHero(upHeroPic, { level: playerInfo[1].lv, name: LanguageManager.getlocal("servant_name" + playerInfo[1].sid), quality: playerInfo[1].quality, pos: this._type - 1 }, 0, flag);
            }
            else {
                this.setUpHero(null);
            }
            if (playerInfo[0].sid) {
                var downPic = void 0;
                var flag = false;
                if (playerInfo[0].equip) {
                    flag = true;
                    downPic = "skin_full_" + playerInfo[0].equip;
                }
                else {
                    downPic = Config.ServantCfg.getServantItemById(playerInfo[0].sid).fullIcon;
                }
                this.setDownHero(downPic, { level: playerInfo[0].lv, name: LanguageManager.getlocal("servant_name" + playerInfo[0].sid), quality: playerInfo[0].quality, pos: this._type - 1 }, 0, flag);
            }
            else {
                this.setDownHero(null);
            }
            this._upHero.x = 17;
            this._downHero.x = 280;
            this._upHero.y = 190;
            this._downHero.y = GameConfig.stageHeigth - 600;
            this._topProgress.y = 162;
            this._bottomProgress.y = GameConfig.stageHeigth - 194 + 4;
        }
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        this._upHero.visible = true;
        this._downHero.visible = true;
        this._topProgress.visible = true;
        this._bottomProgress.visible = true;
        egret.Tween.get(this._upHero).wait(600).call(this.showRound, this);
    };
    LadderBattleView.prototype.showWinBattle = function (str, isup, ismiddle) {
        if (ismiddle === void 0) { ismiddle = false; }
        var view = this;
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        // let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        var descbg = BaseBitmap.create("specialview_commoni_namebg");
        var tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;
        if (ismiddle) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view.container, [-40, 0]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0, 150]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChildToContainer(descbg);
        this.addChildToContainer(tipTxt);
        descbg.alpha = 0;
        tipTxt.alpha = 0;
        egret.Tween.get(descbg).to({ alpha: 1 }, 200).wait(800).to({ alpha: 0 }, 200).call(function () {
            descbg.dispose();
            descbg = null;
        }, this);
        egret.Tween.get(tipTxt).to({ alpha: 1 }, 200).wait(800).to({ alpha: 0 }, 200).call(function () {
            tipTxt.dispose();
            tipTxt = null;
        }, this);
    };
    /**
     * 开始一回合战斗
     */
    LadderBattleView.prototype.showRound = function () {
        var _this = this;
        if (this._topCurValue > 0 && this._bottomCurValue > 0) {
            var round = 5;
            if (this._curRound > 0 && this._curIdex > 1 && ((this._curIdex - 1) % (2 * round) == 0)) {
                this.showWinBattle(LanguageManager.getlocal("acThreeKingdomsbattletip7", [String(Math.floor(this._curIdex / 2))]), false, true);
                egret.Tween.get(this).wait(1300).call(function () {
                    var area = 1;
                    if (_this._curRoundFirst != _this._curIdex % 2) {
                        area = 2;
                    }
                    var reportInfo = _this._reportVoApi.getReportByRoundAndIndex(_this._type, _this._curRound, _this._curIdex);
                    _this.attackHandle(area, reportInfo[1], reportInfo[0] == 1);
                    _this._curIdex++;
                });
            }
            else {
                var area = 1;
                if (this._curRoundFirst != this._curIdex % 2) {
                    area = 2;
                }
                var reportInfo = this._reportVoApi.getReportByRoundAndIndex(this._type, this._curRound, this._curIdex);
                this.attackHandle(area, reportInfo[1], reportInfo[0] == 1);
                this._curIdex++;
            }
        }
        else {
            this.showEndGameBefore();
        }
    };
    LadderBattleView.prototype.atkEndCallback = function () {
        if (this._isPause && this._skip) {
            this.hideLoadingMask();
            this.showEndGame();
            this._skip = false;
        }
        if (this._isEnd != true && this._isPause != true) {
            this.showRound();
        }
    };
    LadderBattleView.prototype.showEndGameBefore = function () {
        var failMan;
        if (this._reportVoApi.getBattleResultByRound(this._type, this._curRound) == 1) {
            failMan = this._upHero;
        }
        else {
            failMan = this._downHero;
        }
        egret.Tween.get(failMan).to({ alpha: 0 }, 800).call(this.showEndGame, this);
    };
    LadderBattleView.prototype.showEndGame = function () {
        if (this._isEnd) {
            return;
        }
        if (this._type == 1) {
            this.battleEnd();
            return;
        }
        this.removeRoundAnim();
        this._upHero.clearHero();
        this._downHero.clearHero();
        this.showMaskAndWin(this._curRound);
        if (this._curRound >= 5) {
            this.battleEnd();
        }
        else {
            this.roundBeginAnim();
        }
    };
    //真结束
    LadderBattleView.prototype.battleEnd = function () {
        this._isEnd = true;
        var curRoundResult = this._reportVoApi.getBattleWinByType(this._type) ? 1 : 2;
        var socretab = this._reportVoApi.getBattleResultByType(this._type);
        ViewController.getInstance().openView(ViewConst.BASE.LADDERBATTLEWIN, { f: this.battleCallbackEnd,
            o: this,
            result: curRoundResult,
            score: socretab,
            type: this._type
        });
    };
    LadderBattleView.prototype.battleCallbackEnd = function () {
        this._fuction.apply(this._obj, [this._type]);
        this.hide();
    };
    //给icon贴上 胜 或 负
    LadderBattleView.prototype.showMaskAndWin = function (round) {
        for (var r = 1; r <= round; r++) {
            if (this._reportVoApi.getBattleResultByRound(this._type, r) == 1) {
                this._topIcons[r - 1].setResult(2);
                this._bottomIcons[r - 1].setResult(1);
            }
            else {
                this._topIcons[r - 1].setResult(1);
                this._bottomIcons[r - 1].setResult(2);
            }
        }
    };
    LadderBattleView.prototype.dispose = function () {
        this._isEnd = false;
        this._type = 0;
        this._curRound = 0;
        this._reportVoApi = null;
        this._fuction = null;
        this._obj = null;
        this._beginAnimNode = null;
        this._curIdex = 0;
        this._curRoundFirst = 0;
        this._topIcons.length = 0;
        this._bottomIcons.length = 0;
        this._isPause = false;
        this._skipBtn = null;
        this._skip = false;
        _super.prototype.dispose.call(this);
    };
    return LadderBattleView;
}(BaseBattleView));
__reflect(LadderBattleView.prototype, "LadderBattleView");
//# sourceMappingURL=LadderBattleView.js.map