/**
 * 科举答题vo
 * author yangchengguo
 * date 2019.7.22
 * @class ExamVo
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
var ExamVo = (function (_super) {
    __extends(ExamVo, _super);
    function ExamVo() {
        var _this = _super.call(this) || this;
        /** 科举答题数目 */
        _this.examNum = {};
        /**是否开启 */
        _this.open = 0;
        /**题目 {0,0,0,0} --题号，得分，耗时，时间戳*/
        _this.phase = {};
        /**答题时间 */
        _this.replytime = 0;
        /**总积分 */
        _this.score = 0;
        /**版本 */
        _this.version = 0;
        return _this;
    }
    ExamVo.prototype.initData = function (data) {
        if (data.info.examNum) {
            this.examNum = data.info.examNum;
        }
        if (data.open) {
            this.open = data.open;
        }
        if (data.phase) {
            this.phase = data.phase;
        }
        if (data.replytime) {
            this.replytime = data.replytime;
        }
        if (data.score) {
            this.score = data.score;
        }
        if (data.version) {
            this.version = data.version;
        }
    };
    ExamVo.prototype.dispose = function () {
    };
    return ExamVo;
}(BaseVo));
__reflect(ExamVo.prototype, "ExamVo");
//# sourceMappingURL=ExamVo.js.map