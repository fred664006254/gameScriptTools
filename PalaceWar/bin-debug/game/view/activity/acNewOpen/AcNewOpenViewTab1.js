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
var AcNewOpenViewTab1 = (function (_super) {
    __extends(AcNewOpenViewTab1, _super);
    function AcNewOpenViewTab1(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcNewOpenViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS), this.rewardCallBack, this);
        var vo = this.vo;
        var taskArr = this.getArr();
        taskArr = view.updataArr(taskArr);
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 383);
        var scrollList = ComponentManager.getScrollList(AcNewOpenTaskItem, taskArr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.y = 8;
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcNewOpenViewTab1.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.getArr();
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, this.code);
    };
    AcNewOpenViewTab1.prototype.getArr = function () {
        var view = this;
        var arr = [];
        var task = view.cfg.task;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            for (var k in unit) {
                var isget = view.vo.isGetTaskReward(id, Number(k) - 1);
                var tmp = unit[k];
                tmp.id1 = id;
                tmp.id2 = k;
                if (isget && k == "5") {
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
    AcNewOpenViewTab1.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var AcMayDayVo = this.vo;
        if (!AcMayDayVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = AcMayDayVo.getTask(arr[i].id1, Number(arr[i].id2) - 1);
            if (this.vo.isGetTaskReward(arr[i].id1, Number(arr[i].id2) - 1)) {
                arr1.push(arr[i]);
            }
            else {
                if (taskNum >= arr[i].peopleNum) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcNewOpenViewTab1.prototype.rewardCallBack = function (evt) {
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
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
        this.vo.lastpos = null;
    };
    AcNewOpenViewTab1.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenViewTab1;
}(AcCommonViewTab));
__reflect(AcNewOpenViewTab1.prototype, "AcNewOpenViewTab1");
//# sourceMappingURL=AcNewOpenViewTab1.js.map