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
desc : 转盘活动viewtab3 节日任务
*/
var AcMayDayViewTab3 = (function (_super) {
    __extends(AcMayDayViewTab3, _super);
    function AcMayDayViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._rechargeArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMayDayViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayViewTab3.prototype.initView = function () {
        var view = this;
        var style = Number(view.code) > 8;
        if (style) {
            view.width = GameConfig.stageWidth;
            view.height = GameConfig.stageHeigth - 196;
        }
        else {
            var bottomBg = BaseBitmap.create("public_9_bg43");
            bottomBg.width = 625;
            bottomBg.height = GameConfig.stageHeigth - 410;
            bottomBg.x = 5;
            bottomBg.y = -180;
            this.addChild(bottomBg);
        }
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        var mayDayVo = this.vo;
        var rechargeArr = mayDayVo.getArr("task");
        rechargeArr = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr;
        var tmpRect = null;
        var scrollList = null;
        if (style) {
            tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth - 10, view.height - 30);
            scrollList = ComponentManager.getScrollList(AcMayDay3ScrollItem, rechargeArr, tmpRect, this.code);
            scrollList.setPosition(20, 0);
        }
        else {
            tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 430);
            scrollList = ComponentManager.getScrollList(AcMayDay3ScrollItem, rechargeArr, tmpRect, this.code);
            scrollList.setPosition(20, -170);
        }
        this._scrollList = scrollList;
        this.addChild(scrollList);
    };
    AcMayDayViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var rechargeArr = this.vo.getArr("task");
        rechargeArr = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr;
        this._scrollList.refreshData(rechargeArr, this.code);
    };
    AcMayDayViewTab3.prototype.updataArr = function (arr) {
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
    AcMayDayViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        this._rechargeArr = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcMayDayViewTab3;
}(AcCommonViewTab));
__reflect(AcMayDayViewTab3.prototype, "AcMayDayViewTab3");
//# sourceMappingURL=AcMayDayViewTab3.js.map