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
var AcDragonBoatDayViewTab2 = (function (_super) {
    __extends(AcDragonBoatDayViewTab2, _super);
    function AcDragonBoatDayViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayViewTab2.prototype.getTypeCode = function () {
        var code = this.code;
        if (this.code == '6') {
            code = '3';
        }
        return code;
    };
    AcDragonBoatDayViewTab2.prototype.initView = function () {
        var view = this;
        var boatview = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        var vo = this.vo;
        var objList = vo.getArr("recharge");
        var arr = view.updateArr(objList);
        // let keys = Object.keys(objList);
        // keys.sort((a:string,b:string)=>{
        // 	return Number(a) - Number(b) ;
        // });
        var tmpRect = new egret.Rectangle(0, 0, 598, view.height - 50);
        var scrollList = ComponentManager.getScrollList(AcDragonBoatDayTab2ScrollItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 5]);
        view.addChild(scrollList);
    };
    AcDragonBoatDayViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("recharge"));
        view._scrollList.refreshData(arr, view.code);
    };
    AcDragonBoatDayViewTab2.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = vo.getChargeNum();
        for (var i = 0; i < arr.length; i++) {
            if (vo.isGetRecharge(arr[i].key)) {
                arr1.push(arr[i]);
            }
            else {
                if (rechareTotal >= arr[i].needGem) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcDragonBoatDayViewTab2.prototype.dispose = function () {
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayViewTab2;
}(AcCommonViewTab));
__reflect(AcDragonBoatDayViewTab2.prototype, "AcDragonBoatDayViewTab2");
//# sourceMappingURL=AcDragonBoatDayViewTab2.js.map