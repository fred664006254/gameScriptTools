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
var EmperorwarBattleView = (function (_super) {
    __extends(EmperorwarBattleView, _super);
    function EmperorwarBattleView() {
        var _this = _super.call(this) || this;
        _this._reportVoApi = null;
        //1 上  2 下
        _this._headTab1 = [];
        _this._headTab2 = [];
        _this._roundText = null;
        _this._maskTab1 = [];
        _this._maskTab2 = [];
        _this._roundBg = null;
        _this._roundBitmap = null;
        _this._skipBtn = null;
        _this._skip = false;
        //数据
        _this._curRound = 0;
        _this._curIdex = 0;
        _this._curRoundFirst = 0;
        _this._isEnd = false;
        _this._winTab = [0, 0];
        _this._isPause = false;
        return _this;
    }
    EmperorwarBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emperor_battle_round", "emperor_battle_top_bg", "emperor_hero_bg",
            "emperor_hero_empty", "emperor_round_1", "emperor_round_2", "emperor_round_3", "emperor_round_4", "emperor_round_5", "servant_empty", "atkracecross_win", "atkracecross_loss",
            "atkrace_battle_info", "atkrace_skip", "progress7_bg", "progress8", "emperor_round_bg", "specialview_commoni_namebg"
        ]);
    };
    EmperorwarBattleView.prototype.getBgName = function () {
        return "emperorwarbg3";
    };
    EmperorwarBattleView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, 0);
            this.addChild(this.viewBg);
        }
    };
    EmperorwarBattleView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_CHALLENGE;
    };
    EmperorwarBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    EmperorwarBattleView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorwarBattleView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorwarBattleView.prototype.initView = function () {
        if (this.param.data.test) {
            var info = [
                [1, 1, {}, { "quality": 4, "cheer": 0, "attr": 40, name: "dsfsdfsdfs", "pic": 1, "level": 1, "fullattr": 414 }, { "quality": 4, "cheer": 0, "attr": -360, name: "23123123", "pic": 2, "level": 1, "fullattr": 414 }],
                [1, 1, [[0, 0]],
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 10019786439, "lv": 400, "attr": 49, "fullattr": 49, "s1lv": 1, "s2lv": 1, "clv": 6 },
                    {}],
                [2, 2, [[0, 20222730]],
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 224697, "lv": 400, "attr": 14, "fullattr": 14, "s1lv": 1, "s2lv": 1, "clv": 0 },
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 19505168, "lv": 350, "attr": -20221408, "fullattr": 1322, "s1lv": 29, "s2lv": 11, "clv": 5 }],
                [2, 2, [[0, 600], [0, 20222730], [0, 20222730]],
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 6, "lv": 190, "attr": -69698, "fullattr": 21832, "s1lv": 1, "s2lv": 1, "clv": 2 },
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 1017, "lv": 350, "attr": 14114392, "fullattr": 14114992, "s1lv": 24, "s2lv": 12, "clv": 5 }],
                [1, 1, [[0, 20222730], [0, 20222730], [0, 20222730]],
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 1650, "lv": 51, "attr": 6, "fullattr": 6, "s1lv": 1, "s2lv": 1, "clv": 0 },
                    { weaponDps: 999, level: 100, "sid": "1001", "quality": 13963520, "lv": 350, "attr": -147446, "fullattr": 1054, "s1lv": 28, "s2lv": 12, "clv": 5 }]
            ];
            this._reportVoApi = new EmperorwarReportVoApi();
            this._reportVoApi.formatData(info);
        }
        else {
            this._reportVoApi = this.param.data.voApi;
        }
        this.initTopInfo();
        this._skip = false;
        this._skipBtn = ComponentManager.getButton("atkrace_skip", null, this.skipBattle, this);
        this._skipBtn.setPosition(GameConfig.stageWidth - this._skipBtn.width - 12, 145);
        this.addChild(this._skipBtn);
        this._skipBtn.visible = false;
        this.roundBeginAnim();
    };
    EmperorwarBattleView.prototype.initTopInfo = function () {
        var topBg = BaseBitmap.create("emperor_battle_top_bg");
        this.addChild(topBg);
        var info = this._reportVoApi.getCompetitorInfo(1);
        // let playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic,info[0].phototitle);
        var playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic, info[0].phototitle);
        playerHead1.setPosition(3, 8);
        this.addChild(playerHead1);
        // let playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic,info[1].phototitle);
        var playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic, info[1].phototitle);
        playerHead2.setPosition(GameConfig.stageWidth - playerHead1.x - playerHead2.width, playerHead1.y);
        this.addChild(playerHead2);
        this._headTab1.push(playerHead1);
        this._headTab2.push(playerHead2);
        var maskHead1 = BaseBitmap.create("public_9_bg11");
        maskHead1.width = playerHead1.width;
        maskHead1.height = playerHead1.height;
        maskHead1.x = playerHead1.x;
        maskHead1.y = 0;
        this.addChild(maskHead1);
        maskHead1.visible = false;
        var maskHead2 = BaseBitmap.create("public_9_bg11");
        maskHead2.width = GameConfig.stageWidth - playerHead2.x;
        maskHead2.height = playerHead2.height;
        maskHead2.x = GameConfig.stageWidth - maskHead2.width;
        maskHead2.y = 0;
        this.addChild(maskHead2);
        maskHead2.visible = false;
        this._maskTab1.push(maskHead1);
        this._maskTab2.push(maskHead2);
        for (var i = 0; i < 4; i++) {
            var playerInfo = this._reportVoApi.getCompetitorInfo(i + 2);
            var leftHeroContainer = new BaseDisplayObjectContainer();
            leftHeroContainer.setPosition(107 + i * 45, 8);
            this.addChild(leftHeroContainer);
            var heroBg = BaseBitmap.create("emperor_hero_bg");
            leftHeroContainer.addChild(heroBg);
            var servantPic = void 0;
            if (playerInfo[0].sid) {
                if (this._reportVoApi.getIsMeJoin()) {
                    servantPic = Api.servantVoApi.getServantObj(playerInfo[0].sid).halfImgPath;
                }
                else {
                    if (playerInfo[0].equip) {
                        servantPic = "skin_half_" + playerInfo[0].equip;
                    }
                    else {
                        servantPic = Config.ServantCfg.getServantItemById(playerInfo[0].sid).halfIcon;
                    }
                }
            }
            else {
                servantPic = "emperor_hero_empty";
            }
            var servantIcon = void 0;
            if (playerInfo[0].sid) {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 180, 177);
                servantIcon = BaseLoadBitmap.create(servantPic, rect);
                servantIcon.setScale((heroBg.height - 4) / servantIcon.height);
                var mask = egret.Rectangle.create();
                mask.setTo(90 - heroBg.width / 2, 0, (heroBg.width - 4) / servantIcon.scaleX, (heroBg.height - 5) / servantIcon.scaleY);
                servantIcon.mask = mask;
                servantIcon.setPosition(-64 * servantIcon.scaleX, 2);
            }
            else {
                servantIcon = BaseBitmap.create(servantPic);
                servantIcon.setPosition(0, 2);
            }
            leftHeroContainer.addChild(servantIcon);
            this._headTab1.push(leftHeroContainer);
            var maskHero1 = BaseBitmap.create("public_9_bg11");
            maskHero1.width = heroBg.width;
            maskHero1.height = heroBg.height;
            maskHero1.x = leftHeroContainer.x;
            maskHero1.y = leftHeroContainer.y;
            this.addChild(maskHero1);
            this._maskTab1.push(maskHero1);
            maskHero1.visible = false;
            //右边
            var leftHeroContainer2 = new BaseDisplayObjectContainer();
            leftHeroContainer2.setPosition(GameConfig.stageWidth - 152 - i * 45, 8);
            this.addChild(leftHeroContainer2);
            var heroBg2 = BaseBitmap.create("emperor_hero_bg");
            leftHeroContainer2.addChild(heroBg2);
            var servantPic2 = void 0;
            if (playerInfo[1].sid) {
                if (playerInfo[1].equip) {
                    servantPic2 = "skin_half_" + playerInfo[1].equip;
                }
                else {
                    servantPic2 = Config.ServantCfg.getServantItemById(playerInfo[1].sid).halfIcon;
                }
            }
            else {
                servantPic2 = "emperor_hero_empty";
            }
            var servantIcon2 = void 0;
            if (playerInfo[1].sid) {
                var rect2 = egret.Rectangle.create();
                rect2.setTo(0, 0, 180, 177);
                servantIcon2 = BaseLoadBitmap.create(servantPic2, rect2);
                servantIcon2.setScale((heroBg2.height - 4) / servantIcon2.height);
                var mask2 = egret.Rectangle.create();
                mask2.setTo(90 - heroBg2.width / 2, 0, (heroBg2.width - 4) / servantIcon2.scaleX, (heroBg2.height - 5) / servantIcon2.scaleY);
                servantIcon2.mask = mask2;
                servantIcon2.setPosition(-64 * servantIcon2.scaleX, 2);
            }
            else {
                servantIcon2 = BaseBitmap.create(servantPic2);
                servantIcon2.setPosition(0, 2);
            }
            leftHeroContainer2.addChild(servantIcon2);
            this._headTab2.push(leftHeroContainer2);
            var maskHero2 = BaseBitmap.create("public_9_bg11");
            maskHero2.width = heroBg.width;
            maskHero2.height = heroBg.height;
            maskHero2.x = leftHeroContainer2.x;
            maskHero2.y = leftHeroContainer2.y;
            this.addChild(maskHero2);
            this._maskTab2.push(maskHero2);
            maskHero2.visible = false;
        }
        var roundBg = BaseBitmap.create("emperor_battle_round");
        roundBg.setPosition(GameConfig.stageWidth / 2 - roundBg.width / 2, 0);
        this.addChild(roundBg);
        this._roundText = ComponentManager.getBitmapText("1", TextFieldConst.FONTNAME_BOSS_SCORE);
        this._roundText.setPosition(GameConfig.stageWidth / 2 - this._roundText.width / 2, 45);
        this.addChild(this._roundText);
        if (PlatformManager.checkIsEnSp()) {
            this._roundText.setPosition(GameConfig.stageWidth / 2 - this._roundText.width / 2, 54);
        }
    };
    EmperorwarBattleView.prototype.roundBeginAnim = function () {
        this._curRound++;
        this._roundText.text = String(this._curRound);
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
        this.removeRoundAnim();
        this._roundBg = BaseBitmap.create("emperor_round_bg");
        this._roundBg.setPosition(-this._roundBg.width, GameConfig.stageHeigth / 2 - 50);
        this.addChild(this._roundBg);
        this._roundBitmap = BaseBitmap.create("emperor_round_" + this._curRound);
        this._roundBitmap.setPosition(GameConfig.stageWidth, this._roundBg.y + this._roundBg.height / 2 - this._roundBitmap.height / 2);
        this.addChild(this._roundBitmap);
        egret.Tween.get(this._roundBg).to({ x: GameConfig.stageWidth / 2 - this._roundBg.width / 2 }, 600);
        egret.Tween.get(this._roundBitmap).to({ x: GameConfig.stageWidth / 2 - this._roundBitmap.width / 2 }, 500).wait(600).call(this.roundBegin, this);
    };
    EmperorwarBattleView.prototype.removeRoundAnim = function () {
        if (this._roundBg) {
            egret.Tween.removeTweens(this._roundBg);
            this.removeChild(this._roundBg);
            this._roundBg = null;
        }
        if (this._roundBitmap) {
            egret.Tween.removeTweens(this._roundBitmap);
            this.removeChild(this._roundBitmap);
            this._roundBitmap = null;
        }
    };
    EmperorwarBattleView.prototype.roundBegin = function () {
        this._skipBtn.visible = true;
        this._isPause = false;
        this.removeRoundAnim();
        this._curIdex = 1;
        this._curRoundFirst = this._reportVoApi.getFirstHandByRound(this._curRound) % 2;
        var bloods = this._reportVoApi.getBattleBloodByRound(this._curRound);
        this._topMaxValue = bloods[1] == null ? 0 : bloods[1];
        this._bottomMaxValue = bloods[0] == null ? 0 : bloods[0];
        this.setTopProgress(bloods[1], bloods[1]);
        this._topProgress.y = 117;
        this.setBottomProgress(bloods[0], bloods[0]);
        var playerInfo = this._reportVoApi.getCompetitorInfo(this._curRound);
        if (this._curRound == 1) {
            this.setUpHero(null, playerInfo[1], 4);
            this.setDownHero(null, playerInfo[0], 4);
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
                this.setUpHero(upHeroPic, { level: playerInfo[1].lv, name: LanguageManager.getlocal("servant_name" + playerInfo[1].sid), quality: playerInfo[1].quality, pos: this._curRound - 1 }, 0, flag);
            }
            else {
                this.setUpHero(null);
            }
            if (playerInfo[0].sid) {
                var downPic = void 0;
                var flag = false;
                if (this._reportVoApi.getIsMeJoin()) {
                    downPic = Api.servantVoApi.getFullImgPathWithId(playerInfo[0].sid);
                }
                else {
                    if (playerInfo[0].equip) {
                        flag = true;
                        downPic = "skin_full_" + playerInfo[0].equip;
                    }
                    else {
                        downPic = Config.ServantCfg.getServantItemById(playerInfo[0].sid).fullIcon;
                    }
                }
                this.setDownHero(downPic, { level: playerInfo[0].lv, name: LanguageManager.getlocal("servant_name" + playerInfo[0].sid), quality: playerInfo[0].quality, pos: this._curRound - 1 }, 0, flag);
            }
            else {
                this.setDownHero(null);
            }
        }
        this._upHero.x = 17;
        this._downHero.x = 280;
        this._upHero.y = 140;
        this._downHero.y = GameConfig.stageHeigth - 420;
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        this._upHero.visible = true;
        this._downHero.visible = true;
        this._topProgress.visible = true;
        this._bottomProgress.visible = true;
        egret.Tween.get(this._upHero).wait(600).call(this.checkWeapon, this);
    };
    EmperorwarBattleView.prototype.checkWeapon = function () {
        if (this._curRound == 1) {
            this.checkWeaponBack();
            return;
        }
        var playerInfo = this._reportVoApi.getCompetitorInfo(this._curRound);
        var serId = playerInfo[0].sid;
        var serId2 = playerInfo[1].sid;
        var value1 = playerInfo[0].weaponDps;
        var value2 = playerInfo[1].weaponDps;
        if (!value1 && !value2) {
            this.checkWeaponBack();
            return;
        }
        ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW, {
            sid: serId,
            type: 1,
            atype: 4,
            value: value1,
            sid2: serId2,
            type2: 4,
            atype2: 4,
            value2: value2,
            f: this.checkWeaponBack,
            o: this,
            auto: false,
        });
    };
    EmperorwarBattleView.prototype.checkWeaponBack = function (skip) {
        if (skip === void 0) { skip = 0; }
        if (this && this.isShow()) {
            if (skip == 0) {
                this.showRound();
            }
            else if (skip == 1) {
                this._downHero.showLight(this.showRound, this);
            }
            else if (skip == 2) {
                this._upHero.showLight(this.showRound, this);
            }
            else if (skip == 3) {
                this._upHero.showLight();
                this._downHero.showLight(this.showRound, this);
            }
            else {
                this.showRound();
            }
        }
    };
    /**
     * 开始一回合战斗
     */
    EmperorwarBattleView.prototype.showRound = function () {
        var _this = this;
        if (this._topCurValue > 0 && this._bottomCurValue > 0) {
            var area_1 = 1;
            if (this._curRoundFirst != this._curIdex % 2) {
                area_1 = 2;
            }
            var reportInfo_1;
            if (this._curRound == 1) {
                // let pos:number = this._curIdex%2 == 1 ? 1:2;
                reportInfo_1 = this._reportVoApi.getReportByRoundAndIndex(this._curRound, this._curIdex, area_1);
            }
            else {
                reportInfo_1 = this._reportVoApi.getReportByRoundAndIndex(this._curRound, this._curIdex);
            }
            var round = 5;
            if (this._curRound > 0 && this._curIdex > 1 && ((this._curIdex - 1) % (2 * round) == 0)) {
                this.showWinBattle(LanguageManager.getlocal("acThreeKingdomsbattletip7", [String(Math.floor(this._curIdex / 2))]), false, true);
                egret.Tween.get(this).wait(1300).call(function () {
                    _this.attackHandle(area_1, reportInfo_1[1], reportInfo_1[0] == 1);
                    _this._curIdex++;
                });
            }
            else {
                this.attackHandle(area_1, reportInfo_1[1], reportInfo_1[0] == 1);
                this._curIdex++;
            }
        }
        else {
            this.showEndGameBefore();
        }
    };
    EmperorwarBattleView.prototype.showWinBattle = function (str, isup, ismiddle) {
        if (ismiddle === void 0) { ismiddle = false; }
        var view = this;
        var descbg = BaseBitmap.create("specialview_commoni_namebg");
        var tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;
        if (ismiddle) {
            descbg.setPosition(GameConfig.stageWidth / 2 - descbg.width / 2, GameConfig.stageHeigth / 2 - descbg.height / 2);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0, 150]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChild(descbg);
        this.addChild(tipTxt);
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
    EmperorwarBattleView.prototype.showEndGameBefore = function () {
        var failMan;
        if (this._reportVoApi.getBattleResultByRound(this._curRound) == 1) {
            failMan = this._upHero;
        }
        else {
            failMan = this._downHero;
        }
        egret.Tween.get(failMan).to({ alpha: 0 }, 800).call(this.showEndGame, this);
    };
    EmperorwarBattleView.prototype.skipBattle = function () {
        if (this._isEnd != true) {
            if (!this._skip) {
                this.showLoadingMask();
                this._skip = true;
                this._isPause = true;
            }
        }
    };
    EmperorwarBattleView.prototype.atkEndCallback = function () {
        if (this._isPause && this._skip) {
            this.hideLoadingMask();
            this.showEndGame();
            this._skip = false;
        }
        if (this._isEnd != true && this._isPause != true) {
            this.showRound();
        }
    };
    EmperorwarBattleView.prototype.showEndGame = function () {
        if (this._isEnd) {
            return;
        }
        this.removeRoundAnim();
        this._upHero.clearHero();
        this._downHero.clearHero();
        this.showMaskAndWin(this._curRound);
        if (this._curRound >= 5) {
            this.showGameOver();
        }
        else {
            var curRoundResult = this._reportVoApi.getBattleResultByRound(this._curRound);
            ViewController.getInstance().openView(ViewConst.BASE.EMPERORWARROUNDRESULTVIEW, { f: this.endCallBack, o: this, result: curRoundResult });
        }
    };
    EmperorwarBattleView.prototype.showGameOver = function () {
        this._isEnd = true;
        for (var i = 1; i <= 5; i++) {
            var curRoundResult = this._reportVoApi.getBattleResultByRound(i);
            this._winTab[curRoundResult - 1]++;
        }
        if (this._winTab[0] >= 3) {
            var info = this._reportVoApi.getCompetitorInfo(1);
            var nameTab = [];
            nameTab.push(info[0].name, info[1].name);
            ViewController.getInstance().openView(ViewConst.BASE.EMPERORWARBATTLERESULTVIEW, { f: this.endCallBack, o: this, result: 1, names: nameTab });
        }
        else if (this._winTab[1] >= 3) {
            var info = this._reportVoApi.getCompetitorInfo(1);
            var nameTab = [];
            nameTab.push(info[1].name, info[0].name);
            ViewController.getInstance().openView(ViewConst.BASE.EMPERORWARBATTLERESULTVIEW, { f: this.endCallBack, o: this, result: 2, names: nameTab });
        }
    };
    EmperorwarBattleView.prototype.endCallBack = function () {
        if (this._isEnd == true) {
            this.hide();
        }
        else {
            this.roundBeginAnim();
        }
    };
    EmperorwarBattleView.prototype.showMaskAndWin = function (round) {
        var mask1 = this._maskTab1[round - 1];
        var mask2 = this._maskTab2[round - 1];
        mask1.visible = true;
        mask2.visible = true;
        var resultIcon1;
        var resultIcon2;
        if (this._reportVoApi.getBattleResultByRound(round) == 1) {
            resultIcon1 = "atkracecross_win";
            resultIcon2 = "atkracecross_loss";
        }
        else {
            resultIcon2 = "atkracecross_win";
            resultIcon1 = "atkracecross_loss";
        }
        var result1 = BaseBitmap.create(resultIcon1);
        result1.setPosition(mask1.x + mask1.width / 2 - result1.width / 2, mask1.y + mask1.height / 2 - result1.height / 2);
        this.addChild(result1);
        var result2 = BaseBitmap.create(resultIcon2);
        result2.setPosition(mask2.x + mask2.width / 2 - result2.width / 2, mask2.y + mask2.height / 2 - result2.height / 2);
        this.addChild(result2);
    };
    EmperorwarBattleView.prototype.dispose = function () {
        this._isEnd = false;
        this._headTab1.length = 0;
        this._headTab2.length = 0;
        this._maskTab1.length = 0;
        this._maskTab2.length = 0;
        this._roundText = null;
        this._curRound = 0;
        this._curIdex = 0;
        this._curRoundFirst = 0;
        this._reportVoApi = null;
        this._winTab = [0, 0];
        this._roundBg = null;
        this._roundBitmap = null;
        this._isPause = false;
        this._skipBtn = null;
        this._skip = false;
        _super.prototype.dispose.call(this);
    };
    return EmperorwarBattleView;
}(BaseBattleView));
__reflect(EmperorwarBattleView.prototype, "EmperorwarBattleView");
//# sourceMappingURL=EmperorwarBattleView.js.map