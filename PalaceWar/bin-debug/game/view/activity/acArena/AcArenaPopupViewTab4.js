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
var AcArenaPopupViewTab4 = (function (_super) {
    __extends(AcArenaPopupViewTab4, _super);
    function AcArenaPopupViewTab4() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcArenaPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcArenaPopupViewTab4.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 640;
        view.width = 545;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var objList = vo.getArr("festivalMarket");
        var arr = view.updataArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 510, view.height);
        var scrollList = ComponentManager.getScrollList(AcArenaTab4Item, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [35, 65]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcArenaPopupViewTab4.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getArr("festivalMarket");
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcArenaPopupViewTab4.prototype.updataArr = function (arr) {
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
            var curNum = arr[i].limit - view.vo.getBuyLimitnum(arr[i].sortId);
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
    AcArenaPopupViewTab4.prototype.dispose = function () {
        this._scrollList = null;
        this._taskArr = null;
        _super.prototype.dispose.call(this);
    };
    return AcArenaPopupViewTab4;
}(AcCommonViewTab));
__reflect(AcArenaPopupViewTab4.prototype, "AcArenaPopupViewTab4");
//# sourceMappingURL=AcArenaPopupViewTab4.js.map