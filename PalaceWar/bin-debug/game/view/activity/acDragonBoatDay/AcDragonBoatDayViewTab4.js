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
desc : 端午活动 累积充值
*/
var AcDragonBoatDayViewTab4 = (function (_super) {
    __extends(AcDragonBoatDayViewTab4, _super);
    function AcDragonBoatDayViewTab4() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayViewTab4.prototype.initView = function () {
        var view = this;
        var boatview = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_LIST, this.update, this);
        var vo = this.vo;
        var objList = vo.getArr("festivalMarket");
        var arr = view.updataArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 598, view.height - 50);
        var scrollList = ComponentManager.getScrollList(AcDragonBoatDayTab4ScrollItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 5]);
        view.addChild(scrollList);
    };
    AcDragonBoatDayViewTab4.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getArr("festivalMarket");
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcDragonBoatDayViewTab4.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var curNum = arr[i].limit - view.vo.getBuyLimitnum(arr[i].sortId + 1);
            if (curNum <= 0) {
                arr1.push(arr[i]);
            }
            else {
                if (curNum > 0) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcDragonBoatDayViewTab4.prototype.dispose = function () {
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_LIST, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayViewTab4;
}(AcCommonViewTab));
__reflect(AcDragonBoatDayViewTab4.prototype, "AcDragonBoatDayViewTab4");
//# sourceMappingURL=AcDragonBoatDayViewTab4.js.map