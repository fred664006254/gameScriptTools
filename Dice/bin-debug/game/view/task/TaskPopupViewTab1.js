/*
 *@description: 任务面板
 *@author: hwc
 *@date: 2020-06-08 20:17:02
 *@version
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
var TaskPopupViewTab1 = (function (_super) {
    __extends(TaskPopupViewTab1, _super);
    function TaskPopupViewTab1(parameters) {
        var _this = _super.call(this) || this;
        _this.listview = null;
        _this.listdata = null;
        _this.initView();
        return _this;
    }
    TaskPopupViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    TaskPopupViewTab1.prototype.initView = function () {
        this.listdata = Api.DailytaskVoApi.getTaskListData();
        var h = 690;
        var listview = ComponentMgr.getScrollList(TaskListItem, this.listdata, new egret.Rectangle(0, 0, 495, h));
        listview.setPosition(16, 60);
        this.addChild(listview);
        this.listview = listview;
        this.initEventListener();
    };
    TaskPopupViewTab1.prototype.getNetConstEventArr = function () {
        return [
            NetConst.TASK_GET_REWARDS,
        ];
    };
    TaskPopupViewTab1.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_DAILYTASK, MsgConst.REWARD_RANDOM_TASK,
        ];
    };
    TaskPopupViewTab1.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_DAILYTASK:
                view.refreshList();
                break;
            case MsgConst.REWARD_RANDOM_TASK:
                view.rewardRandomTask(evt);
                break;
        }
    };
    TaskPopupViewTab1.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.TASK_GET_REWARDS:
                view.openRewardPopupview(evt);
                break;
        }
    };
    TaskPopupViewTab1.prototype.openRewardPopupview = function (event) {
        var data = event.data.data;
        var ret = event.data.ret;
        var gold = Config.DailytaskCfg.getRandomTaskGoldByID(Api.DailytaskVoApi.getTouchID());
        var gem = Config.DailytaskCfg.getRandomTaskGemByID(Api.DailytaskVoApi.getTouchID());
        if (ret) {
            // ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
            //     title : LangMger.getlocal("reward_pupopview_title"),
            //     rewards : `2_1_${gold}|1_1_${gem}`
            // });
        }
        else {
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title: LangMger.getlocal("reward_pupopview_title"),
                msg: data.msg
            });
        }
    };
    TaskPopupViewTab1.prototype.rewardRandomTask = function (event) {
        var taskId = event.data.taskID;
        var index = event.data.index;
        NetManager.request(NetConst.TASK_GET_REWARDS, { taskId: taskId });
    };
    TaskPopupViewTab1.prototype.refreshList = function () {
        this.listdata = Api.DailytaskVoApi.getTaskListData();
        this.listview.refreshData(this.listdata);
    };
    return TaskPopupViewTab1;
}(CommonViewTab));
__reflect(TaskPopupViewTab1.prototype, "TaskPopupViewTab1");
//# sourceMappingURL=TaskPopupViewTab1.js.map