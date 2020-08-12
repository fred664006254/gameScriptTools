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
/*
 *@description: 任务列表的 item
 *@author: hwc
 *@date: 2020-04-11 16:06:16
 *@version 0.0.1
 */
var taskitemconst;
(function (taskitemconst) {
    taskitemconst["random_title_pre"] = "random_task_title_";
    taskitemconst["random_task_dec"] = "random_task_desc";
    taskitemconst["random_task_had_reward"] = "random_task_had_reward";
    taskitemconst["random_task_can_reward"] = "random_task_can_reward";
})(taskitemconst || (taskitemconst = {}));
var TaskListItem = (function (_super) {
    __extends(TaskListItem, _super);
    function TaskListItem() {
        return _super.call(this) || this;
    }
    TaskListItem.prototype.initItem = function (index, data, itemParam) {
        switch (data.type) {
            case 0:
                this.opeTask = new OperrationTask();
                this.opeTask.initView();
                this.addChild(this.opeTask);
                break;
            case 1:
                this.dailytask = new DailyTask();
                this.dailytask.initView();
                this.addChild(this.dailytask);
                break;
            case 2:
                this.randomTask = new RandomTask(this, index - 1);
                this.randomTask.initView();
                break;
            default:
                break;
        }
    };
    /**
     * 不同格子X间距
     */
    TaskListItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    TaskListItem.prototype.getSpaceY = function () {
        return 5;
    };
    TaskListItem.prototype.dispose = function () {
        this.randomTask = null;
        this.opeTask = null;
        this.dailytask = null;
        _super.prototype.dispose.call(this);
    };
    return TaskListItem;
}(ScrollListItem));
__reflect(TaskListItem.prototype, "TaskListItem");
//# sourceMappingURL=TaskListItem.js.map