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
//元素
var Dice413 = (function (_super) {
    __extends(Dice413, _super);
    function Dice413(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice413.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        var len = data.star; //;
        for (var i = 1; i <= len; ++i) {
            this.createObstacle(0);
        }
        this.makeRound();
    };
    Dice413.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        if (data.star < this._obs.length) {
            var len = this._obs.length - data.star;
            for (var i = 1; i <= len; ++i) {
                this._obs[i].dispose();
                this._obs[i] = null;
            }
        }
        else if (data.star > this._obs.length) {
            var len = data.star - this._obs.length;
            for (var i = 1; i <= len; ++i) {
                this.createObstacle(0);
            }
        }
        this.makeRound();
    };
    Dice413.prototype.createObstacle = function (starIdx) {
        // this.playAtkAction();
        var fpos = { x: this.x, y: this.y };
        var obstacle = Obstacle.createObstacle(this.getDiceData(), fpos, "Obstacle413", null, true);
        this._extraGroup.addChild(obstacle);
        this._obs.push(obstacle);
    };
    Dice413.prototype.makeRound = function () {
        var rotation = 360 / this._obs.length;
        var rad = Math.PI / 180;
        var radius = 120;
        var centerX = 0;
        var centerY = -30;
        var speed = 0.02;
        var _loop_1 = function (i) {
            var unit = this_1._obs[i];
            egret.Tween.removeTweens(this_1._obs[i]);
            //计算角度
            var angle = (rotation) * i * rad;
            var xielv = 1 / Math.tan(angle);
            unit.x = centerX + radius * Math.cos(angle);
            unit.y = centerY + radius * Math.sin(angle);
            egret.Tween.get(unit, { loop: true, onChange: function () {
                    angle += speed;
                    unit.x = centerX + radius * Math.cos(angle);
                    unit.y = centerY + radius * Math.sin(angle);
                }, onChangeObj: this_1 }).to({ alpha: 1 }, 360 / speed);
        };
        var this_1 = this;
        for (var i = 0; i < this._obs.length; ++i) {
            _loop_1(i);
        }
    };
    Dice413.prototype.dispose = function () {
        for (var i = 0; i < this._obs.length; ++i) {
            egret.Tween.removeTweens(this._obs[i]);
            this._obs[i].dispose();
            this._obs[i] = null;
        }
        this._obs = [];
        _super.prototype.dispose.call(this);
    };
    return Dice413;
}(BaseDice));
__reflect(Dice413.prototype, "Dice413");
//# sourceMappingURL=Dice413.js.map