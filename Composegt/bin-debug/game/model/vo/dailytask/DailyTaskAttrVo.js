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
 * 每日任务,单个任务详情vo
 * author yanyuling
 * date 2017/10/27
 * @class DailyTaskAttrVo
 */
var DailyTaskAttrVo = (function (_super) {
    __extends(DailyTaskAttrVo, _super);
    function DailyTaskAttrVo() {
        return _super.call(this) || this;
    }
    DailyTaskAttrVo.prototype.initData = function (data) {
        this.task_f = data.f;
        this.task_v = data.v;
    };
    DailyTaskAttrVo.prototype.dispose = function () {
        this.task_f = null;
        this.task_v = null;
    };
    return DailyTaskAttrVo;
}(BaseVo));
__reflect(DailyTaskAttrVo.prototype, "DailyTaskAttrVo");
