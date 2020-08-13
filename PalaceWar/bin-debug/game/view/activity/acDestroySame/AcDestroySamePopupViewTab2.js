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
author : qinajun
date : 2018.4.14
desc : 活动节日任务
*/
var AcDestroySamePopupViewTab2 = (function (_super) {
    __extends(AcDestroySamePopupViewTab2, _super);
    function AcDestroySamePopupViewTab2(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDestroySamePopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySamePopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySamePopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySamePopupViewTab2.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_TASK), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 545 - 10;
        Bg.height = 660;
        Bg.x = 27 + 5;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var taskArr = this.getArr();
        taskArr = view.updataArr(taskArr);
        var tmpRect = new egret.Rectangle(0, 0, 530, view.height - 10);
        var scrollList = ComponentManager.getScrollList(AcDestroySameTaskItem, taskArr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcDestroySamePopupViewTab2.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.getArr();
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcDestroySamePopupViewTab2.prototype.getArr = function () {
        var view = this;
        var arr = [];
        var task = view.cfg.task;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            for (var j = 0; j < unit.length; ++j) {
                var tasknum = view.vo.getTask(id + 1, j + 1);
                var isget = view.vo.isGetTaskReward(id + 1, j + 1);
                var tmp = unit[j];
                tmp.id1 = id + 1;
                tmp.id2 = j + 1;
                if (isget && Number(j) == 2) {
                    arr.push(tmp);
                    break;
                }
                if (!isget) {
                    arr.push(tmp);
                    break;
                }
            }
        }
        return arr;
    };
    AcDestroySamePopupViewTab2.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var AcMayDayVo = this.vo;
        if (!AcMayDayVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = AcMayDayVo.getTask(arr[i].id1, arr[i].id2);
            if (this.vo.isGetTaskReward(arr[i].id1, arr[i].id2)) {
                arr1.push(arr[i]);
            }
            else {
                if (taskNum >= arr[i].value) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcDestroySamePopupViewTab2.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var taskid = view.vo.taskid.split("_");
        var cfg = view.cfg.task[Number(taskid[0]) - 1][Number(taskid[1]) - 1];
        var str = rewards;
        if (cfg.specialReward) {
            str = "1029_0_" + cfg.specialReward + "_" + this.getUiCode() + "|" + rewards;
        }
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDestroySamePopupViewTab2.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_TASK), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDestroySamePopupViewTab2;
}(AcCommonViewTab));
__reflect(AcDestroySamePopupViewTab2.prototype, "AcDestroySamePopupViewTab2");
//# sourceMappingURL=AcDestroySamePopupViewTab2.js.map