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
var AcWeaponHousePopupViewTab2 = (function (_super) {
    __extends(AcWeaponHousePopupViewTab2, _super);
    function AcWeaponHousePopupViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcWeaponHousePopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEONE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);
        var vo = this.vo;
        var dataList = this.getArr();
        dataList = this.updataArr(dataList);
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcWeaponHousePopupViewTab3ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(25, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcWeaponHousePopupViewTab2.prototype.requestCallback = function (event) {
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
    AcWeaponHousePopupViewTab2.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        this.update();
    };
    Object.defineProperty(AcWeaponHousePopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHousePopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHousePopupViewTab2.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.getArr();
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, { aid: this.aid, code: this.code });
    };
    AcWeaponHousePopupViewTab2.prototype.getArr = function () {
        var view = this;
        var arr = [];
        var task = view.cfg.scheduleOne;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            for (var k in unit) {
                var isget = view.vo.GeOnetTaskReward(id, Number(k));
                var tmp = unit[k];
                tmp.id1 = id;
                tmp.id2 = k;
                if (isget) {
                    arr.push(tmp);
                    break;
                }
                // if(!isget && k==unit.length)
                // {
                // 	arr.push(tmp);
                // 	break;
                // }
                // if(!isget){
                // 	arr.push(tmp);
                // 	break;
                // }
            }
        }
        return arr;
    };
    AcWeaponHousePopupViewTab2.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var AcMayDayVo = this.vo;
        if (!AcMayDayVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = AcMayDayVo.getOneTask(arr[i].id1);
            if (this.vo.isGeOnetTaskReward(arr[i].id1, Number(arr[i].id2))) {
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
        return arr1.concat(arr3).concat(arr2);
    };
    AcWeaponHousePopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEONE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHousePopupViewTab2;
}(AcCommonViewTab));
__reflect(AcWeaponHousePopupViewTab2.prototype, "AcWeaponHousePopupViewTab2");
//# sourceMappingURL=AcWeaponHousePopupViewTab2.js.map