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
desc : 劳动活动 累积充值
*/
var AcLaborDayPopupViewTab1 = (function (_super) {
    __extends(AcLaborDayPopupViewTab1, _super);
    function AcLaborDayPopupViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLaborDayPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLaborDayPopupViewTab1.prototype.initView = function () {
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
        var objList = vo.getArr("recharge");
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 510, view.height);
        var scrollList = ComponentManager.getScrollList(AcLaborDayTab1Item, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [35, 65]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcLaborDayPopupViewTab1.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("recharge"));
        view._scrollList.refreshData(arr, view.code);
    };
    AcLaborDayPopupViewTab1.prototype.updateArr = function (arr) {
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
    AcLaborDayPopupViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH_LIST, this.update, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcLaborDayPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcLaborDayPopupViewTab1.prototype, "AcLaborDayPopupViewTab1");
//# sourceMappingURL=AcLaborDayPopupViewTab1.js.map