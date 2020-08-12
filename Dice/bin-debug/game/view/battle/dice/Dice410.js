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
/**
 * -原名称：召唤骰子  --新名称：召唤
 * 合并骰子时，随机召唤1个骰子
*/
var Dice410 = (function (_super) {
    __extends(Dice410, _super);
    function Dice410(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice410.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Dice410;
}(BaseDice));
__reflect(Dice410.prototype, "Dice410");
//# sourceMappingURL=Dice410.js.map