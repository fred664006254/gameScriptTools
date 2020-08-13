/*
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动
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
var AcDuanWuPopupViewTab3 = (function (_super) {
    __extends(AcDuanWuPopupViewTab3, _super);
    function AcDuanWuPopupViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDuanWuPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuPopupViewTab3.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMC), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var taskArr = vo.getArr("task");
        taskArr = view.updataArr(taskArr);
        var tmpRect = new egret.Rectangle(0, 0, 520, view.height + 30);
        var scrollList = ComponentManager.getScrollList(AcDuanWuTab2Item, taskArr, tmpRect, [view.code, view.getUiCode()]);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30, 60]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcDuanWuPopupViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getArr("task");
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, [this.code, this.getUiCode()]);
    };
    AcDuanWuPopupViewTab3.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var acDuanWuVo = this.vo;
        if (!acDuanWuVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = acDuanWuVo.getTask(arr[i].questType);
            if (this.vo.isGetTaskReward(arr[i].taskId)) {
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
    AcDuanWuPopupViewTab3.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.task[view.vo.lastidx];
        var str = "1015_0_" + cfg.xiongHuangGet + "_" + this.getUiCode() + "|" + rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDuanWuPopupViewTab3.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMC), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuPopupViewTab3;
}(AcCommonViewTab));
__reflect(AcDuanWuPopupViewTab3.prototype, "AcDuanWuPopupViewTab3");
//# sourceMappingURL=AcDuanWuPopupViewTab2.js.map