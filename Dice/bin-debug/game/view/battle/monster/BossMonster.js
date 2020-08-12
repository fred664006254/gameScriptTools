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
var BossMonster = (function (_super) {
    __extends(BossMonster, _super);
    function BossMonster(data, isMe, isAdd) {
        var _this = _super.call(this, data, isMe, isAdd) || this;
        _this._first = true;
        _this._isSkill = false;
        return _this;
    }
    BossMonster.prototype.getMonsterType = function () {
        return 3;
    };
    BossMonster.prototype.init = function (data, isAdd) {
        _super.prototype.init.call(this, data, isAdd);
        var clip = ComponentMgr.getCustomMovieClip("bossbom_effect", null, 70);
        clip.anchorOffsetX = 140 / 2;
        clip.anchorOffsetY = 140 / 2;
        clip.y = 30;
        clip.playWithTime(-1);
        this.addChildAt(clip, 0);
    };
    BossMonster.prototype.setHp = function () {
        this._hpTxt.setString("0");
        this._hpTxt.anchorOffsetX = this._hpTxt.width * 0.5 + 0.5;
    };
    BossMonster.prototype.hpTxtTween = function () {
        App.TweenUtil.numTween(this._hpTxt, 0, this._data.hp);
    };
    BossMonster.prototype.fastTick = function () {
        this.checkDoAction();
    };
    BossMonster.prototype.checkDoAction = function () {
        var data = this._data;
        if (data) {
            var arr = data.cdTimeArr;
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var t = arr[i];
                var cd = data.skillcd;
                if (this._first) {
                    cd = data.initcd;
                }
                if (BattleStatus.checkCdDoTime(cd, t) > 0) {
                    this._isSkill = true;
                    this.checkAtk();
                    if (this._first) {
                        this._first = false;
                        data.cdTimeArr = [];
                        data.cdTimeArr = BattleStatus.formatCdPartTime(data.skillcd, BattleStatus.battleLogicHasTickTime);
                    }
                }
            }
        }
    };
    BossMonster.prototype.checkAtk = function () {
    };
    BossMonster.prototype.playAtkSound = function (sound) {
        if (this._data.isMe) {
            if (RES.hasRes(sound)) {
                SoundMgr.playEffect(sound);
            }
        }
    };
    BossMonster.prototype.move = function (moveCallback, thisObj) {
        if (this._isSkill) {
        }
        else {
            _super.prototype.move.call(this, moveCallback, thisObj);
        }
    };
    BossMonster.prototype.setSkill = function () {
        this._isSkill = false;
    };
    BossMonster.prototype.dispose = function () {
        this._first = true;
        this._isSkill = false;
        _super.prototype.dispose.call(this);
    };
    return BossMonster;
}(BaseMonster));
__reflect(BossMonster.prototype, "BossMonster");
//# sourceMappingURL=BossMonster.js.map