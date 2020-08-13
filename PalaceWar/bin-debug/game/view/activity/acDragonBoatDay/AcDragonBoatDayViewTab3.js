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
desc : 端午活动节日任务
*/
var AcDragonBoatDayViewTab3 = (function (_super) {
    __extends(AcDragonBoatDayViewTab3, _super);
    function AcDragonBoatDayViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayViewTab3.prototype.initView = function () {
        var view = this;
        var boatview = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        var vo = this.vo;
        var taskArr = vo.getArr("task");
        taskArr = view.updataArr(taskArr);
        for (var i in taskArr) {
            taskArr[i].width = view.width - 40;
        }
        view._taskArr = taskArr;
        var tmpRect = new egret.Rectangle(0, 0, 598, view.height - 50);
        var scrollList = ComponentManager.getScrollList(AcDragonBoatDayTab3ScrollItem, taskArr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 5]);
        view.addChild(scrollList);
    };
    AcDragonBoatDayViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getArr("task");
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcDragonBoatDayViewTab3.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var AcMayDayVo = this.vo;
        if (!AcMayDayVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = AcMayDayVo.getTask(arr[i].questType);
            if (this.vo.isGetTaskReward(arr[i].key)) {
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
    AcDragonBoatDayViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayViewTab3;
}(AcCommonViewTab));
__reflect(AcDragonBoatDayViewTab3.prototype, "AcDragonBoatDayViewTab3");
//# sourceMappingURL=AcDragonBoatDayViewTab3.js.map