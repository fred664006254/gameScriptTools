/*
    author : shaoliang
    date : 2019.10.29
    desc : 战斗队伍的图标
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
var LadderBattleTeamIcon = (function (_super) {
    __extends(LadderBattleTeamIcon, _super);
    function LadderBattleTeamIcon() {
        var _this = _super.call(this) || this;
        _this._type = 0; //1我放 2敌方
        _this._idx = 0;
        _this._clip = null;
        _this._resKeys = [];
        _this._clipBao = null;
        return _this;
    }
    LadderBattleTeamIcon.prototype.init = function (idx, type) {
        this._type = type;
        this._idx = idx;
        if (this._idx == 1) {
            var prekey = "ladder_general" + this._type;
            this._resKeys = [prekey + "_stand_", prekey + "_win_", prekey + "_fight_"];
            this._clip = ComponentManager.getCustomMovieClip(this._resKeys[0], 4, 150);
            this._clip.playWithTime(0);
            this.addChild(this._clip);
        }
        else {
            var prekey = void 0;
            if (this._type == 1) {
                prekey = "ladder_soldiers_";
            }
            else {
                prekey = "ladder_soldiers2_";
            }
            this._resKeys = [prekey + "stand" + (this._idx - 1) + "_", prekey + "move" + (this._idx - 1) + "_"];
            this._clip = ComponentManager.getCustomMovieClip(this._resKeys[0], 4, 150);
            this._clip.playWithTime(0);
            this.addChild(this._clip);
        }
    };
    // r 1,胜利 2失败
    LadderBattleTeamIcon.prototype.setResult = function (r) {
        var icon = BaseBitmap.create("ladder_formation_icon" + r);
        if (this._idx == 1) {
            if (this._type == 1) {
                icon.setPosition(0, -30);
            }
            else {
                icon.setPosition(4, -34);
            }
        }
        else {
            icon.setPosition(44, -34);
        }
        this.addChild(icon);
        var clip;
        if (r != 1) {
            clip = ComponentManager.getCustomMovieClip("ladder_ef_battle_lose", 10, 100);
            clip.setPosition(icon.x - 100 + icon.width / 2, icon.y - 100 + icon.height / 2);
        }
        else {
            clip = ComponentManager.getCustomMovieClip("ladder_ef_battle_win", 10, 100);
            clip.setPosition(icon.x - 120 + icon.width / 2, icon.y - 120 + icon.height / 2);
            clip.blendMode = egret.BlendMode.ADD;
            if (this._idx == 1) {
                this._clip.playFrameByNamePre(this._resKeys[1], 5);
                this._clip.playWithTime(0);
            }
            else {
                this._clip.playFrameByNamePre(this._resKeys[1], 3);
                this._clip.playWithTime(0);
            }
        }
        this.addChild(clip);
        clip.playWithTime(1);
    };
    LadderBattleTeamIcon.prototype.showBattle = function () {
        if (this._idx == 1) {
            this._clip.playFrameByNamePre(this._resKeys[2], 4);
            this._clip.playWithTime(0);
            this._clipBao = ComponentManager.getCustomMovieClip("ladder_ef_collision", 6, 80);
            this._clipBao.playWithTime(0);
            this._clipBao.setScale(2);
            this._clipBao.blendMode = egret.BlendMode.ADD;
            this.addChild(this._clipBao);
            if (this._type == 1) {
                this._clipBao.setPosition(-210, 100);
                this._clipBao.rotation = -30;
            }
            else {
                this._clipBao.scaleX = -1;
                this._clipBao.setPosition(70, -65);
                this._clipBao.rotation = -30;
            }
        }
        else {
            this._clip.playFrameByNamePre(this._resKeys[1], 3);
            this._clip.playWithTime(0);
        }
    };
    LadderBattleTeamIcon.prototype.stopClipBao = function () {
        if (this._clipBao) {
            this._clipBao.dispose();
            this._clipBao = null;
            this._clip.stop();
        }
    };
    LadderBattleTeamIcon.prototype.showStand = function () {
        if (this._idx == 1) {
            this._clip.playFrameByNamePre(this._resKeys[0], 4);
            this._clip.playWithTime(0);
        }
        else {
            this._clip.playFrameByNamePre(this._resKeys[0], 4);
            this._clip.playWithTime(0);
        }
    };
    LadderBattleTeamIcon.prototype.showPowerUp = function () {
        var powerup = BaseBitmap.create("ladder_formation_up");
        powerup.setPosition(0, 100);
        this.addChild(powerup);
        egret.Tween.get(powerup).to({ y: -50 }, 400).call(function () {
            powerup.dispose();
        });
    };
    LadderBattleTeamIcon.prototype.dispose = function () {
        this._type = 0;
        this._idx = 0;
        this._clip = null;
        this._resKeys.length = 0;
        this._clipBao = null;
        _super.prototype.dispose.call(this);
    };
    return LadderBattleTeamIcon;
}(BaseDisplayObjectContainer));
__reflect(LadderBattleTeamIcon.prototype, "LadderBattleTeamIcon");
//# sourceMappingURL=LadderBattleTeamIcon.js.map