/*
 *@description: 成就面板
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
var TaskPopupViewTab2 = (function (_super) {
    __extends(TaskPopupViewTab2, _super);
    function TaskPopupViewTab2(parameters) {
        var _this = _super.call(this) || this;
        _this.listview = null;
        _this.listdata = null;
        _this.initView();
        return _this;
    }
    TaskPopupViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    TaskPopupViewTab2.prototype.initView = function () {
        this.listdata = Api.AchievementVoApi.getAchList();
        var h = 690;
        var listview = ComponentMgr.getScrollList(AchieveListItem, this.listdata, new egret.Rectangle(0, 0, 495, h));
        listview.setPosition(16, 60);
        this.addChild(listview);
        this.listview = listview;
        this.initEventListener();
    };
    TaskPopupViewTab2.prototype.getNetConstEventArr = function () {
        return [
            NetConst.TASK_GETACHIEVEMENT,
        ];
    };
    TaskPopupViewTab2.prototype.netEventCallBack = function (evt) {
        var data = evt.data;
        if (data && data.ret) {
            switch (data.data.cmd) {
                case NetConst.TASK_GETACHIEVEMENT:
                    this.getReward(data.data.data);
                    break;
                default:
                    break;
            }
        }
    };
    TaskPopupViewTab2.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_ACHIEVEMENT
        ];
    };
    TaskPopupViewTab2.prototype.msgEventCallBack = function (evt) {
        switch (evt.type) {
            case MsgConst.MODEL_ACHIEVEMENT:
                this.refreshList();
                break;
            default:
                break;
        }
    };
    TaskPopupViewTab2.prototype.refreshList = function () {
        this.listdata = Api.AchievementVoApi.getAchList();
        this.listview.refreshData(this.listdata);
    };
    TaskPopupViewTab2.prototype.getReward = function (data) {
        var type = Api.AchievementVoApi.rewardType;
        if (type === 100) {
            ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                title: LangMger.getlocal("reward_pupopview_title"),
                rewards: data.rewards,
                callback: function () {
                    // App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                }
            });
        }
        else {
            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
        }
    };
    return TaskPopupViewTab2;
}(CommonViewTab));
__reflect(TaskPopupViewTab2.prototype, "TaskPopupViewTab2");
//# sourceMappingURL=TaskPopupViewTab2.js.map