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
var BattlelogVo = (function (_super) {
    __extends(BattlelogVo, _super);
    function BattlelogVo() {
        var _this = _super.call(this) || this;
        _this.info = []; //骰子信息
        return _this;
    }
    BattlelogVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    BattlelogVo.prototype.dispose = function () {
        this.info = [];
    };
    return BattlelogVo;
}(BaseVo));
__reflect(BattlelogVo.prototype, "BattlelogVo");
//# sourceMappingURL=BattlelogVo.js.map