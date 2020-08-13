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
/**
 * 活动奖励
 * author yangtao
 * date 2020.5.18
 * @class AcDrinkTeaRewardPopViewTab1
 */
var AcWeaponHousePopupViewTab3 = (function (_super) {
    __extends(AcWeaponHousePopupViewTab3, _super);
    function AcWeaponHousePopupViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    AcWeaponHousePopupViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALL, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);
        var vo = this.vo;
        var dataList = this.getArr();
        dataList = this.updataArr(dataList);
        //let dataList = this.vo.getSortrechargeAllCfg();
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcWeaponHousePopupViewTab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(25, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcWeaponHousePopupViewTab3.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var replacerewards = rData.replacerewards;
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        this.refreshView();
    };
    AcWeaponHousePopupViewTab3.prototype.refreshView = function (event) {
        if (!this.vo) {
            return;
        }
        //let dataList = this.vo.getSortrechargeAllCfg();
        //this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
        this.update();
    };
    Object.defineProperty(AcWeaponHousePopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHousePopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHousePopupViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.getArr();
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, { aid: this.aid, code: this.code });
    };
    AcWeaponHousePopupViewTab3.prototype.getArr = function () {
        var view = this;
        var arr = [];
        var task = view.cfg.scheduleAll;
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
    AcWeaponHousePopupViewTab3.prototype.updataArr = function (arr) {
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
                if (arr[i].taskType == 1) {
                    if (taskNum >= arr[i].needNum) {
                        arr2.push(arr[i]);
                    }
                    else {
                        arr3.push(arr[i]);
                    }
                }
                else {
                    if (taskNum >= arr[i].value2) {
                        arr2.push(arr[i]);
                    }
                    else {
                        arr3.push(arr[i]);
                    }
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcWeaponHousePopupViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALL, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHousePopupViewTab3;
}(AcCommonViewTab));
__reflect(AcWeaponHousePopupViewTab3.prototype, "AcWeaponHousePopupViewTab3");
//# sourceMappingURL=AcWeaponHousePopupViewTab3.js.map