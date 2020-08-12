/*
 *@description: 任务数据
 *@author: hwc
 *@date: 2020-04-11 20:28:04
 *@version 0.0.1
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
var TaskInfoVo = (function (_super) {
    __extends(TaskInfoVo, _super);
    function TaskInfoVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastday = 0;
        /** 每日奖励领取第一个物品 */
        _this.freeGet1 = 0;
        /** 每日奖励领取第二个物品 */
        _this.freeGet2 = 0;
        /** 每日奖励领取第三个物品 */
        _this.freeGet3 = 0;
        /** 任务刷新标记 */
        _this.freshFlag = 0;
        _this.taskInfo = [];
        return _this;
    }
    TaskInfoVo.prototype.initData = function (data) {
        var _this = this;
        if (!data || !data.info)
            return;
        this.lastday = data.lastday || this.lastday;
        this.freeGet1 = data.info.freeGet1 || this.freeGet1;
        this.freeGet2 = data.info.freeGet2 || this.freeGet2;
        this.freeGet3 = data.info.freeGet3 || this.freeGet3;
        this.freshFlag = data.info.freshFlag;
        data.info.taskInfo.forEach(function (element, index) {
            _this.taskInfo[index] = {
                id: element.id,
                v: element.v,
                f: element.f,
                index: index
            };
        });
        var arrTasks = [];
        var finishTasks = [];
        var endTasks = [];
        for (var index = 0; index < this.taskInfo.length; index++) {
            var element = this.taskInfo[index];
            switch (element.f) {
                case 0:
                    arrTasks.push(element);
                    break;
                case 1:
                    finishTasks.push(element);
                    break;
                case 2:
                    endTasks.push(element);
                    break;
                default:
                    break;
            }
        }
        this.taskInfo = finishTasks.concat(arrTasks).concat(endTasks);
    };
    TaskInfoVo.prototype.dispose = function () {
        this.lastday = 0;
        this.freeGet1 = 0;
        this.freeGet2 = 0;
        this.freeGet3 = 0;
        this.freshFlag = 0;
        this.taskInfo = [];
    };
    return TaskInfoVo;
}(BaseVo));
__reflect(TaskInfoVo.prototype, "TaskInfoVo");
//# sourceMappingURL=TaskInfoVo.js.map