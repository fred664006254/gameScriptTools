/*
    author : shaoliang
    date : 2019.10.25
    desc : 天下至尊-阵型
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
var LadderFormationView = (function (_super) {
    __extends(LadderFormationView, _super);
    function LadderFormationView() {
        var _this = _super.call(this) || this;
        _this._leftIcons = [];
        _this._rightIcons = [];
        //第几场
        _this._curType = 0;
        _this._skipBtn = null;
        _this._skip = false;
        return _this;
    }
    LadderFormationView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladder_formation", "dinner_line", "dinner_black_circle",
            "ladder_formation_up", "ladder_formation_icon1", "ladder_formation_icon2",
            "ladder_formation_btn",
            "ladder_general1", "ladder_general2",
            "ladder_soldiers_stand1", "ladder_soldiers_stand2", "ladder_soldiers_stand3", "ladder_soldiers_stand4",
            "ladder_soldiers2_stand1", "ladder_soldiers2_stand2", "ladder_soldiers2_stand3", "ladder_soldiers2_stand4",
        ]);
    };
    // 标题背景名称
    LadderFormationView.prototype.getTitleBgName = function () {
        return "ladderview_title";
    };
    LadderFormationView.prototype.getTitleStr = function () {
        return null;
    };
    LadderFormationView.prototype.getBgName = function () {
        return "ladder_battlebg";
    };
    LadderFormationView.prototype.getCloseBtnName = function () {
        return null;
    };
    LadderFormationView.prototype.initView = function () {
        // let line = BaseBitmap.create("dinner_line");
        // line.width = 1060;
        // line.rotation = 60;
        // line.setPosition(18,-5);
        // this.addChildToContainer(line);
        this.titleBgShadow.visible = false;
        var posTab = [
            { x: 135 + 50, y: 542 - 50 },
            { x: 0, y: 424 - 20 },
            { x: -45, y: 548 + 20 - 20 },
            { x: 51, y: 598 + 20 },
            { x: 225, y: 632 + 20 }
        ];
        var posTab2 = [
            { x: 368 + 70 - 50, y: 433 - 50 },
            { x: 294 + 35 - 30, y: 328 - 20 - 30 },
            { x: 418 + 35 - 15, y: 328 - 20 - 35 },
            { x: 504 + 35, y: 380 - 20 },
            { x: 502 + 35, y: 497 - 20 }
        ];
        var offsetY = (GameConfig.stageHeigth - 1136) / 2;
        for (var i = 0; i < 5; i++) {
            var leftIcon = new LadderBattleTeamIcon();
            leftIcon.init(i + 1, 1);
            leftIcon.setPosition(posTab[i].x, posTab[i].y + offsetY);
            this.addChildToContainer(leftIcon);
            var rightIcon = new LadderBattleTeamIcon();
            rightIcon.init(i + 1, 2);
            rightIcon.setPosition(posTab2[i].x, posTab2[i].y + offsetY);
            this.addChildToContainer(rightIcon);
            if (i == 0) {
                leftIcon.setScale(1.2);
                rightIcon.setScale(1.2);
            }
            this._rightIcons.push(rightIcon);
            this._leftIcons.push(leftIcon);
            //test code
            // leftIcon.setResult(1);
            // rightIcon.setResult(2);
        }
        this.removeChildFromContainer(this._rightIcons[0]);
        this.addChildToContainer(this._rightIcons[0]);
        this._curType = 1;
        egret.Tween.get(this.container).wait(800).call(this.showRound, this);
        this._skip = false;
        this._skipBtn = ComponentManager.getButton("ladder_formation_btn", null, this.skipBattle, this);
        this._skipBtn.setPosition(GameConfig.stageWidth - this._skipBtn.width - 12, GameConfig.stageHeigth - 145);
        this.addChild(this._skipBtn);
    };
    LadderFormationView.prototype.skipBattle = function () {
        if (this._curType <= 5 && this._skip != true) {
            this.showLoadingMask();
            this._skip = true;
            this._curType = 6;
            this.showResult();
        }
    };
    LadderFormationView.prototype.showRound = function () {
        var _this = this;
        var idx = this._curType;
        var leftIcon = this._leftIcons[idx - 1];
        var rightIcon = this._rightIcons[idx - 1];
        if (!leftIcon || !rightIcon) {
            return;
        }
        // this.removeChildFromContainer(rightIcon);
        // this.addChildToContainer(rightIcon);
        // this.removeChildFromContainer(leftIcon);
        // this.addChildToContainer(leftIcon);
        var view = this;
        if (this._curType == 1) {
            var targetPos = [(leftIcon.x + rightIcon.x) / 2, (leftIcon.y + rightIcon.y) / 2];
            leftIcon.showBattle();
            rightIcon.showBattle();
            var oldpox1_1 = leftIcon.x;
            var oldpox2_1 = rightIcon.x;
            var oldpoy1_1 = leftIcon.y;
            var oldpoy2_1 = rightIcon.y;
            var baoclip_1 = ComponentManager.getCustomMovieClip("ladder_ef_blast", 18, 80);
            baoclip_1.setScale(2);
            baoclip_1.blendMode = egret.BlendMode.ADD;
            baoclip_1.setPosition(targetPos[0] - 210, targetPos[1] - 110);
            baoclip_1.setEndCallBack(function () {
                if (view._curType == 1) {
                    view.showBattle(function () {
                        leftIcon.setPosition(oldpox1_1, oldpoy1_1);
                        rightIcon.setPosition(oldpox2_1, oldpoy2_1);
                        leftIcon.showStand();
                        rightIcon.showStand();
                    }, view);
                }
            }, this);
            this.addChild(baoclip_1);
            egret.Tween.get(leftIcon).to({ x: targetPos[0] - 10, y: targetPos[1] + 8 }, 500).wait(0).call(function () {
                leftIcon.stopClipBao();
                rightIcon.stopClipBao();
                baoclip_1.playWithTime(1);
            });
            egret.Tween.get(rightIcon).to({ x: targetPos[0] + 10, y: targetPos[1] - 8 }, 500);
        }
        else {
            leftIcon.showBattle();
            rightIcon.showBattle();
            egret.Tween.get(leftIcon).wait(500).call(function () {
                _this.showBattle();
                leftIcon.showStand();
                rightIcon.showStand();
            });
        }
    };
    LadderFormationView.prototype.showWinAnim = function () {
        var winIcon;
        var loseIcon;
        if (Api.laddertournamentVoApi.reportVoApi.getBattleWinByType(this._curType)) {
            winIcon = this._leftIcons[this._curType - 1];
            loseIcon = this._rightIcons[this._curType - 1];
        }
        else {
            winIcon = this._rightIcons[this._curType - 1];
            loseIcon = this._leftIcons[this._curType - 1];
        }
        winIcon.setResult(1);
        loseIcon.setResult(2);
        if (this._curType == 1) {
            if (Api.laddertournamentVoApi.reportVoApi.getBattleWinByType(this._curType)) {
                for (var i = 1; i < 5; i++) {
                    this._leftIcons[i].showPowerUp();
                }
            }
            else {
                for (var i = 1; i < 5; i++) {
                    this._rightIcons[i].showPowerUp();
                }
            }
        }
        egret.Tween.get(this.container).wait(1200).call(this.showNextBattle, this);
    };
    LadderFormationView.prototype.showBattle = function (ff, oo) {
        if (this._skip != true) {
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERBATTLEVIEW, { f2: ff, o2: oo, type: this._curType, f: this.battleCallback, o: this });
        }
    };
    LadderFormationView.prototype.showResult = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.LADDERBATTLRESULTEVIEW, {
            f: this.hide,
            o: this
        });
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK, { activeId: Api.laddertournamentVoApi.aidAndCode });
    };
    LadderFormationView.prototype.battleCallback = function () {
        this.showWinAnim();
    };
    LadderFormationView.prototype.showNextBattle = function () {
        this._curType++;
        if (this._curType > 5) {
            this.showResult();
        }
        else {
            this.showRound();
        }
    };
    LadderFormationView.prototype.dispose = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LATTERT_BATTLE_END);
        this._leftIcons.length = 0;
        this._rightIcons.length = 0;
        this._curType = 0;
        this._skip = false;
        this._skipBtn = null;
        _super.prototype.dispose.call(this);
    };
    return LadderFormationView;
}(CommonView));
__reflect(LadderFormationView.prototype, "LadderFormationView");
//# sourceMappingURL=LadderFormationView.js.map