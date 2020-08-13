/**
 * 江湖名望 修身战斗
 * date 2020.7.9
 * author ycg
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
var NewAtkraceCrossFameBattleView = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFameBattleView, _super);
    function NewAtkraceCrossFameBattleView() {
        var _this = _super.call(this) || this;
        //第几场
        _this._type = 0;
        //第几轮
        _this._curRound = 0;
        _this._curIdex = 0;
        _this._curRoundFirst = 0;
        _this._beginAnimNode = null;
        _this._fuction = null;
        _this._obj = null;
        _this._isEnd = false;
        _this._skipBtn = null;
        _this._skip = false;
        _this._isPause = false;
        _this._winFlag = 1;
        return _this;
    }
    NewAtkraceCrossFameBattleView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_CHALLENGE;
    };
    NewAtkraceCrossFameBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    NewAtkraceCrossFameBattleView.prototype.getTitleStr = function () {
        return null;
    };
    NewAtkraceCrossFameBattleView.prototype.getTitleBgName = function () {
        return null;
    };
    NewAtkraceCrossFameBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_bg", "atkrace_skip", 'specialview_commoni_namebg', "atkrace_battle_info", "progress7_bg", "progress8",
        ]);
    };
    NewAtkraceCrossFameBattleView.prototype.getBgName = function () {
        return "arena_bg";
    };
    NewAtkraceCrossFameBattleView.prototype.isShowOpenAni = function () {
        return false;
    };
    NewAtkraceCrossFameBattleView.prototype.initView = function () {
        this._winFlag = this.param.data.winuid == this.downPlayerInfo.uid ? 1 : 2;
        this._skip = false;
        this._skipBtn = ComponentManager.getButton("atkrace_skip", null, this.skipBattle, this);
        this._skipBtn.setPosition(GameConfig.stageWidth - this._skipBtn.width - 12, 200);
        this._skipBtn.y = 40;
        this.addChild(this._skipBtn);
        this._skipBtn.visible = false;
        this.initBattleInfo();
    };
    Object.defineProperty(NewAtkraceCrossFameBattleView.prototype, "upPlayerInfo", {
        get: function () {
            //上方信息 敌对
            return this.param.data.finfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFameBattleView.prototype, "downPlayerInfo", {
        get: function () {
            //下方玩家 自己 主视角
            return this.param.data.minfo;
        },
        enumerable: true,
        configurable: true
    });
    NewAtkraceCrossFameBattleView.prototype.skipBattle = function () {
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
    NewAtkraceCrossFameBattleView.prototype.initBattleInfo = function () {
        this.roundBeginAnim();
    };
    NewAtkraceCrossFameBattleView.prototype.roundBeginAnim = function () {
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
        this.roundBegin();
    };
    NewAtkraceCrossFameBattleView.prototype.removeRoundAnim = function () {
        if (this._beginAnimNode) {
            egret.Tween.removeTweens(this._beginAnimNode);
            this.removeChild(this._beginAnimNode);
            this._beginAnimNode = null;
        }
    };
    NewAtkraceCrossFameBattleView.prototype.roundBegin = function () {
        this._skipBtn.visible = true;
        this._isPause = false;
        this._curIdex = 1;
        var info = this.getCurRoundData();
        this._curRoundFirst = info.firstflag == 1 ? 1 : 0;
        var ainfo = info.ainfo;
        var binfo = info.binfo;
        this._topMaxValue = binfo.fullattr;
        this._bottomMaxValue = ainfo.fullattr;
        this.setBottomProgress(ainfo.fightattr ? ainfo.fightattr : ainfo.fullattr, ainfo.fullattr);
        this.setTopProgress(binfo.fightattr ? binfo.fightattr : binfo.fullattr, binfo.fullattr);
        this.setUpHero(null, this.upPlayerInfo, 4);
        this.setDownHero(null, this.downPlayerInfo, 4);
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
        egret.Tween.get(this._upHero).wait(600).call(this.showRound, this);
    };
    NewAtkraceCrossFameBattleView.prototype.showWinBattle = function (str, isup, ismiddle) {
        if (ismiddle === void 0) { ismiddle = false; }
        var view = this;
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        // let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        var descbg = BaseBitmap.create("specialview_commoni_namebg");
        var tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;
        // if(ismiddle){
        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view.container, [0,0]);
        // }
        // else{
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0,150]);
        // }
        descbg.setPosition(GameConfig.stageWidth / 2 - descbg.width / 2, GameConfig.stageHeigth / 2 - descbg.height / 2);
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
    NewAtkraceCrossFameBattleView.prototype.getCurRoundData = function (round) {
        if (round === void 0) { round = 0; }
        if (!round) {
            round = this._curRound;
        }
        var log = this.param.data.pklogs[round - 1];
        if (log) {
            return {
                firstflag: log[0],
                win: log[1],
                reports: log[2],
                ainfo: log[3],
                binfo: log[4]
            };
        }
        else {
            return null;
        }
    };
    /**
     * 开始一回合战斗
     */
    NewAtkraceCrossFameBattleView.prototype.showRound = function () {
        var _this = this;
        var curRoundData = this.getCurRoundData();
        if (this._topCurValue > 0 && this._bottomCurValue > 0) {
            var round = 5;
            if (this._curRound > 0 && this._curIdex > 1 && ((this._curIdex - 1) % (2 * round) == 0)) {
                this.showWinBattle(LanguageManager.getlocal("acThreeKingdomsbattletip7", [String(Math.floor(this._curIdex / 2))]), false, true);
                egret.Tween.get(this).wait(1300).call(function () {
                    var area = 1;
                    if (_this._curRoundFirst != _this._curIdex % 2) {
                        area = 2;
                    }
                    var reportInfo = curRoundData.reports[_this._curIdex - 1];
                    _this.attackHandle(area, reportInfo[1], reportInfo[0] == 1);
                    _this._curIdex++;
                });
            }
            else {
                var area = 1;
                if (this._curRoundFirst != this._curIdex % 2) {
                    area = 2;
                }
                var reportInfo = curRoundData.reports[this._curIdex - 1];
                this.attackHandle(area, reportInfo[1], reportInfo[0] == 1);
                this._curIdex++;
            }
        }
        else {
            this.showEndGameBefore();
        }
    };
    NewAtkraceCrossFameBattleView.prototype.atkEndCallback = function () {
        if (this._isPause && this._skip) {
            this.hideLoadingMask();
            this.showEndGame();
            this._skip = false;
        }
        if (this._isEnd != true && this._isPause != true) {
            this.showRound();
        }
    };
    NewAtkraceCrossFameBattleView.prototype.showEndGameBefore = function () {
        var failMan;
        if (this._winFlag == 1) {
            failMan = this._upHero;
        }
        else {
            failMan = this._downHero;
        }
        egret.Tween.get(failMan).to({ alpha: 0 }, 800).call(this.showEndGame, this);
    };
    NewAtkraceCrossFameBattleView.prototype.showEndGame = function () {
        if (this._isEnd) {
            return;
        }
        // if (this._type == 1)
        // {
        // 	this.battleEnd();
        // 	return;
        // }
        this.removeRoundAnim();
        this._upHero.clearHero();
        this._downHero.clearHero();
        this.showMaskAndWin(this._curRound);
        this.battleEnd();
        // if (this._curRound>=5) 
        // {	
        // 	this.battleEnd();
        // }
        // else {
        // 	this.roundBeginAnim()
        // }
    };
    //真结束
    NewAtkraceCrossFameBattleView.prototype.battleEnd = function () {
        this._isEnd = true;
        this._isPause = true;
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSFAMEBATTLERESULTVIEW, { f: this.hide, o: this, type: this._winFlag });
    };
    NewAtkraceCrossFameBattleView.prototype.battleCallbackEnd = function () {
        this._fuction.apply(this._obj, [this._type]);
        this.hide();
    };
    //给icon贴上 胜 或 负
    NewAtkraceCrossFameBattleView.prototype.showMaskAndWin = function (round) {
    };
    NewAtkraceCrossFameBattleView.prototype.dispose = function () {
        this._isEnd = false;
        this._type = 0;
        this._curRound = 0;
        this._fuction = null;
        this._obj = null;
        this._beginAnimNode = null;
        this._curIdex = 0;
        this._curRoundFirst = 0;
        this._isPause = false;
        this._skipBtn = null;
        this._skip = false;
        this._winFlag = 1;
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFameBattleView;
}(BaseBattleView));
//# sourceMappingURL=NewAtkraceCrossFameBattleView.js.map