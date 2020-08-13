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
var AcLaborDayPopupViewTab3 = (function (_super) {
    __extends(AcLaborDayPopupViewTab3, _super);
    function AcLaborDayPopupViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLaborDayPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLaborDayPopupViewTab3.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH_LIST, this.update, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH, this.update, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var taskArr = vo.getArr("task");
        taskArr = view.updataArr(taskArr);
        var tmpRect = new egret.Rectangle(0, 0, 510, view.height);
        var scrollList = ComponentManager.getScrollList(AcLaborDayTab3Item, taskArr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [35, 65]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcLaborDayPopupViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getArr("task");
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcLaborDayPopupViewTab3.prototype.updataArr = function (arr) {
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
    AcLaborDayPopupViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH_LIST, this.update, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcLaborDayPopupViewTab3;
}(AcCommonViewTab));
__reflect(AcLaborDayPopupViewTab3.prototype, "AcLaborDayPopupViewTab3");
//# sourceMappingURL=AcLaborDayPopupViewTab3.js.map