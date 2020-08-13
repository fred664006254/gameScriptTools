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
var AcExamAnswerVo = (function (_super) {
    __extends(AcExamAnswerVo, _super);
    function AcExamAnswerVo() {
        var _this = _super.call(this) || this;
        _this.anum = 0; //已答次数
        _this.cannum = 0;
        _this.point = 0; //当前活跃度
        _this.tscore = 0; //总积分
        return _this;
    }
    AcExamAnswerVo.prototype.initData = function (data) {
        var oldPoint = this.point || 0;
        for (var key in data) {
            this[key] = data[key];
        }
        if (this.point != oldPoint) {
            App.MessageHelper.dispatchEvent(MessageConst.EXAMANSWER_POINTCHANGE);
        }
    };
    Object.defineProperty(AcExamAnswerVo.prototype, "isShowRedDot", {
        get: function () {
            return this.point >= (this.anum + 1) * this.config.cost;
        },
        enumerable: true,
        configurable: true
    });
    return AcExamAnswerVo;
}(AcBaseVo));
__reflect(AcExamAnswerVo.prototype, "AcExamAnswerVo");
