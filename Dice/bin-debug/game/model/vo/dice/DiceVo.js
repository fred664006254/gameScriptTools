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
var DiceVo = (function (_super) {
    __extends(DiceVo, _super);
    // message DiceInfo{
    // 	int32 lv = 1;//骰子等级
    // 	int32 num = 2;//骰子数量
    // }
    function DiceVo() {
        var _this = _super.call(this) || this;
        _this.info = {}; //骰子信息
        _this.crivalue = 0; //暴击伤害
        return _this;
    }
    DiceVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
            Api.DiceVoApi.needfreshDice = true;
        }
    };
    DiceVo.prototype.dispose = function () {
        this.info = {};
        this.crivalue = 0;
    };
    return DiceVo;
}(BaseVo));
__reflect(DiceVo.prototype, "DiceVo");
//# sourceMappingURL=DiceVo.js.map