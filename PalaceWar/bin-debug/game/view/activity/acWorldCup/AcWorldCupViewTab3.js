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
desc : 世界杯活动
*/
var AcWorldCupViewTab3 = (function (_super) {
    __extends(AcWorldCupViewTab3, _super);
    function AcWorldCupViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWorldCupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupViewTab3.prototype.initView = function () {
        var view = this;
        var mainview = ViewController.getInstance().getView('AcWorldCupView');
        view.height = mainview.tabHeight;
        view.width = mainview.tabWidth;
        //top背景图
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.height = view.height - 100;
        listBg.width = 610;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view);
        view.addChild(listBg);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM, this.update, this);
        var vo = this.vo;
        var objList = vo.getArr("actMarket");
        var arr = view.updataArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 600, view.height - 155);
        var scrollList = ComponentManager.getScrollList(AcWorldCupTab3Item, arr, tmpRect, this.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 5]);
        view.addChild(scrollList);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupShopDesc'), 22, TextFieldConst.COLOR_QUALITY_YELLOW);
        view.setLayoutPosition(LayoutConst.rightbottom, descTxt, listBg, [10, 15]);
        view.addChild(descTxt);
    };
    AcWorldCupViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getArr("actMarket");
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcWorldCupViewTab3.prototype.updataArr = function (arr) {
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
    AcWorldCupViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupViewTab3;
}(AcCommonViewTab));
__reflect(AcWorldCupViewTab3.prototype, "AcWorldCupViewTab3");
//# sourceMappingURL=AcWorldCupViewTab3.js.map