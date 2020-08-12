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
var DailyTaskInfoVo = (function (_super) {
    __extends(DailyTaskInfoVo, _super);
    function DailyTaskInfoVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.freeGet1 = 0;
        _this.freeGet2 = 0;
        _this.freeGet3 = 0;
        return _this;
    }
    DailyTaskInfoVo.prototype.initData = function (data) {
        throw new Error("Method not implemented.");
    };
    DailyTaskInfoVo.prototype.dispose = function () {
        throw new Error("Method not implemented.");
    };
    return DailyTaskInfoVo;
}(BaseVo));
__reflect(DailyTaskInfoVo.prototype, "DailyTaskInfoVo");
//# sourceMappingURL=DailyTaskInfoVo.js.map