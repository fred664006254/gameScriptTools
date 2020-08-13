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
var AutoResVo = (function (_super) {
    __extends(AutoResVo, _super);
    function AutoResVo() {
        var _this = _super.call(this) || this;
        _this.gold = 0;
        _this.food = 0;
        _this.soldier = 0;
        return _this;
    }
    AutoResVo.prototype.initData = function (data) {
        this.reset();
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    Object.defineProperty(AutoResVo.prototype, "notice", {
        get: function () {
            return Boolean(this.food || this.gold || this.soldier);
        },
        enumerable: true,
        configurable: true
    });
    AutoResVo.prototype.reset = function () {
        this.gold = 0;
        this.food = 0;
        this.soldier = 0;
    };
    AutoResVo.prototype.dispose = function () {
        this.reset();
    };
    return AutoResVo;
}(BaseVo));
__reflect(AutoResVo.prototype, "AutoResVo");
