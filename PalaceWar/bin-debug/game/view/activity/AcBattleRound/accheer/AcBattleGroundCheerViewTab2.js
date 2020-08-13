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
 * 任务
 */
var AcBattleGroundCheerViewTab2 = (function (_super) {
    __extends(AcBattleGroundCheerViewTab2, _super);
    function AcBattleGroundCheerViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._needSnedMsg = false;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcBattleGroundCheerViewTab2.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcBattleGroundCheerViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundCheerViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundCheerViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreashView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_TASK), this.christmasTaskRewardHandel, this);
        var baseview = ViewController.getInstance().getView('AcBattleGroundCheerView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var downottomBg = BaseBitmap.create("battlegroundbottombg-" + code);
        downottomBg.height = 85;
        downottomBg.y = view.height - downottomBg.height;
        this.addChild(downottomBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("battlegroundcheertip15-" + code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, downottomBg);
        this.addChild(tipTxt);
        var leftHorn = BaseBitmap.create("battlehorn");
        leftHorn.x = downottomBg.x;
        leftHorn.y = downottomBg.y + downottomBg.height;
        this.addChild(leftHorn);
        var rightHorn = BaseBitmap.create("battlehorn");
        rightHorn.scaleX = -1;
        rightHorn.x = downottomBg.width - rightHorn.width + 22;
        rightHorn.y = leftHorn.y;
        this.addChild(rightHorn);
        var taskData = this.cfg.audienceTask;
        var processCfg = [];
        for (var i in taskData) {
            var unit = taskData[i];
            processCfg.push({
                value: unit.value,
                getReward: unit.getReward,
                id: Number(i),
                helpAdd: unit.helpAdd,
                isGet: view.vo.isGetTask(i),
                questType: unit.questType,
                openType: unit.openType
            });
        }
        var tmp = this.sortFunc(processCfg);
        var rect = new egret.Rectangle(0, 0, 620, downottomBg.y - 10);
        view._list = ComponentManager.getScrollList(AcBattlegroundChargeItem, tmp, rect, this.code);
        view.addChild(view._list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._list, view);
    };
    AcBattleGroundCheerViewTab2.prototype.sortFunc = function (arr) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = vo.getTaskValue(arr[i].questType);
            if (this.vo.isGetTask(arr[i].id)) {
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
    /**
     * 领奖回调
     */
    AcBattleGroundCheerViewTab2.prototype.christmasTaskRewardHandel = function (event) {
        var view = this;
        if (event.data.ret) {
            view._needSnedMsg = true;
            // taskId
            var list = [];
            var rechargeId = view.vo.selIdx;
            var starnum = view.cfg.audienceTask[rechargeId].helpAdd;
            var reward = "1020_0_" + starnum + "_" + view.getUiCode() + "|" + event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list, view.vo.lastpos);
        }
    };
    AcBattleGroundCheerViewTab2.prototype.refreashView = function () {
        var view = this;
        var taskData = this.cfg.audienceTask;
        var processCfg = [];
        for (var i in taskData) {
            var unit = taskData[i];
            processCfg.push({
                value: unit.value,
                getReward: unit.getReward,
                id: Number(i),
                helpAdd: unit.helpAdd,
                isGet: view.vo.isGetTask(i),
                questType: unit.questType,
                openType: unit.openType
            });
        }
        var tmp = this.sortFunc(processCfg);
        this._list.refreshData(tmp, this.code);
    };
    AcBattleGroundCheerViewTab2.prototype.dispose = function () {
        var view = this;
        view._list = null;
        if (view._needSnedMsg) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH);
        }
        view._needSnedMsg = false;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreashView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_TASK), this.christmasTaskRewardHandel, this);
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundCheerViewTab2;
}(PopupViewTab));
__reflect(AcBattleGroundCheerViewTab2.prototype, "AcBattleGroundCheerViewTab2");
//# sourceMappingURL=AcBattleGroundCheerViewTab2.js.map