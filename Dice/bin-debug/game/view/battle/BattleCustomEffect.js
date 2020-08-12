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
var BattleBaseEffect = (function (_super) {
    __extends(BattleBaseEffect, _super);
    function BattleBaseEffect() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BattleBaseEffect.prototype, "frameImages", {
        set: function (textureNames) {
            this._frameImages = textureNames;
        },
        enumerable: true,
        configurable: true
    });
    return BattleBaseEffect;
}(CustomMovieClip));
__reflect(BattleBaseEffect.prototype, "BattleBaseEffect");
var BattleCustomEffect = (function (_super) {
    __extends(BattleCustomEffect, _super);
    function BattleCustomEffect() {
        return _super.call(this) || this;
    }
    BattleCustomEffect.prototype.updateFrame = function (timeStamp) {
        var hasTexture = !!this.texture;
        var result = _super.prototype.updateFrame.call(this, timeStamp);
        if (this.texture) {
            this.anchorOffsetX = this.width * 0.5;
            this.anchorOffsetY = this.height * 0.5;
            if (!hasTexture) {
                this.dispatchEvent(new egret.Event(MsgConst.BT_EFFECT_FIRST_SHOW));
            }
            if (BattleStatus.stopActEffect) {
                this.stop();
                this.exceEndCallback();
            }
        }
        return result;
    };
    return BattleCustomEffect;
}(BattleBaseEffect));
__reflect(BattleCustomEffect.prototype, "BattleCustomEffect");
var BattleDiceEffect = (function (_super) {
    __extends(BattleDiceEffect, _super);
    function BattleDiceEffect() {
        return _super.call(this) || this;
    }
    BattleDiceEffect.prototype.updateFrame = function (timeStamp) {
        var result = _super.prototype.updateFrame.call(this, timeStamp);
        if (this.texture) {
            this.anchorOffsetX = this.width * 0.5;
            this.anchorOffsetY = this.height - 4;
            if (BattleStatus.stopActEffect) {
                this.stop();
                this.exceEndCallback();
            }
        }
        return result;
    };
    BattleDiceEffect.prototype.playIdle = function () {
        this.stop();
        if (!this.idleImgs) {
            this.idleImgs = this._frameImages;
        }
        else {
            this._frameImages = this.idleImgs;
        }
        this.playFrameRate = 150;
        this.setEndCallBack(null, null);
        this.playWithTime();
    };
    BattleDiceEffect.prototype.playAtk = function (resName) {
        if (BattleStatus.stopActEffect) {
            this.stop();
            this.exceEndCallback();
        }
        this.stop();
        if (!this.atkImgs) {
            this.setFramesByNamePre(resName);
            this.atkImgs = this._frameImages;
        }
        else {
            this._frameImages = this.atkImgs;
        }
        this.playFrameRate = 40;
        this.setEndCallBack(this.playIdle, this);
        this.playWithTime(1);
    };
    BattleDiceEffect.prototype.dispose = function () {
        this.idleImgs = null;
        _super.prototype.dispose.call(this);
    };
    return BattleDiceEffect;
}(BattleBaseEffect));
__reflect(BattleDiceEffect.prototype, "BattleDiceEffect");
//# sourceMappingURL=BattleCustomEffect.js.map