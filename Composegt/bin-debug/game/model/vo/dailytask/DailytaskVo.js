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
 * 每日任务vo
 * author yanyuling
 * date 2017/10/27
 * @class DailyTaskVo
 */
var DailytaskVo = (function (_super) {
    __extends(DailytaskVo, _super);
    function DailytaskVo() {
        var _this = _super.call(this) || this;
        _this.dailyTaskList = {};
        _this.liveness = 0; //活跃度
        return _this;
    }
    DailytaskVo.prototype.initData = function (data) {
        if (this.dailyTaskList == null) {
            this.dailyTaskList = {};
        }
        if (data.liveness != null) {
            this.liveness = data.liveness;
        }
        this.rewards = data.rewards;
        for (var key in data.info) {
            var tmpTaskAttr = this.dailyTaskList[key];
            if (tmpTaskAttr == null) {
                tmpTaskAttr = new DailyTaskAttrVo();
                this.dailyTaskList[key] = tmpTaskAttr;
            }
            tmpTaskAttr.initData(data.info[key]);
            tmpTaskAttr.taskId = key;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC);
    };
    DailytaskVo.prototype.dispose = function () {
        this.dailyTaskList = [];
        this.rewards = null;
        this.liveness = 0;
    };
    return DailytaskVo;
}(BaseVo));
__reflect(DailytaskVo.prototype, "DailytaskVo");
