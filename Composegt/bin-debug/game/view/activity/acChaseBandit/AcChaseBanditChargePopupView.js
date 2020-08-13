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
 * 	母亲节充值活动
 * author 钱竣
 * date 2018/11/27
 */
var AcChaseBanditChargePopupView = (function (_super) {
    __extends(AcChaseBanditChargePopupView, _super);
    function AcChaseBanditChargePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        return _this;
    }
    Object.defineProperty(AcChaseBanditChargePopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaseBanditChargePopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaseBanditChargePopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaseBanditChargePopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaseBanditChargePopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcChaseBanditChargePopupView.prototype.getTitleStr = function () {
        return "taskViewTitle";
    };
    AcChaseBanditChargePopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcChaseBanditChargePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, this.christmasTaskRewardHandel, this);
        var view = this;
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 835;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this._nodeContainer.addChild(bg);
        var taskData = this.cfg.getTaskList();
        var processCfg = [];
        for (var i in taskData) {
            var unit = taskData[i];
            processCfg.push({
                value: unit.value,
                getReward: unit.getReward,
                questType: unit.questType,
                openType: unit.openType,
                id: Number(i) + 1,
                specialGift: unit.specialGift,
                isGet: view.vo.isGetRecharge(Number(i) + 1)
            });
        }
        processCfg.sort(this.sortFunc.bind(this));
        var rect = new egret.Rectangle(0, 0, 518, bg.height - 23);
        this._scrollList = ComponentManager.getScrollList(AcChaseBanditChargeItem, processCfg, rect, this._aidAndCode);
        this._scrollList.setPosition(bg.x + bg.width / 2 - this._scrollList.width / 2, bg.y + 10);
        this.addChildToContainer(this._scrollList);
    };
    AcChaseBanditChargePopupView.prototype.sortFunc = function (a, b) {
        var lqua = a.isGet;
        var lqub = b.isGet;
        // 是否已领取
        if (a.isGet != b.isGet) {
            if (a.isGet) {
                return 1;
            }
            else {
                return -1;
            }
        }
        // 是否可领取
        var canGetA = this.vo.getChargeNum(a.questType) >= a.value;
        var canGetB = this.vo.getChargeNum(b.questType) >= b.value;
        if (canGetA != canGetB) {
            if (canGetA) {
                return -1;
            }
            else {
                return 1;
            }
        }
        return a.id - b.id;
    };
    /**
     * 领奖回调
     */
    AcChaseBanditChargePopupView.prototype.christmasTaskRewardHandel = function (event) {
        var view = this;
        if (event.data.ret) {
            // taskId
            var list = [];
            var rechargeId = view.vo.selIdx;
            var starnum = view.cfg.task[rechargeId].specialGift;
            if (starnum) {
                var icon = "chasebandit_icon-" + view.getUiCode();
                var starItem = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }
            var reward = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list);
        }
    };
    AcChaseBanditChargePopupView.prototype.refreashView = function () {
        var view = this;
        var taskData = this.cfg.task;
        var processCfg = [];
        for (var i in taskData) {
            var unit = taskData[i];
            processCfg.push({
                value: unit.value,
                getReward: unit.getReward,
                questType: unit.questType,
                openType: unit.openType,
                id: Number(i) + 1,
                specialGift: unit.specialGift,
                isGet: view.vo.isGetRecharge(Number(i) + 1)
            });
        }
        processCfg.sort(this.sortFunc.bind(this));
        this._scrollList.refreshData(processCfg, this._aidAndCode);
    };
    AcChaseBanditChargePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_db_01", "activity_charge_red", "progress_type1_yellow", "progress_type1_bg"
        ]);
    };
    AcChaseBanditChargePopupView.prototype.getShowHeight = function () {
        return 935;
    };
    AcChaseBanditChargePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, this.christmasTaskRewardHandel, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaseBanditChargePopupView;
}(PopupView));
__reflect(AcChaseBanditChargePopupView.prototype, "AcChaseBanditChargePopupView");
