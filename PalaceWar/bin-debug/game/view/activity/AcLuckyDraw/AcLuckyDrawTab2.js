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
var AcLuckyDrawPopupViewTab2 = (function (_super) {
    __extends(AcLuckyDrawPopupViewTab2, _super);
    function AcLuckyDrawPopupViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLuckyDrawPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD, this.christmasTaskRewardHandel, this);
        var view = this;
        var taskData = this.cfg.recharge;
        var processCfg = [];
        for (var i in taskData) {
            var unit = taskData[i];
            processCfg.push({
                needGem: unit.needGem,
                getReward: unit.getReward,
                id: Number(i),
                specialGift: unit.specialGift,
                isGet: view.vo.isGetRecharge(Number(i))
            });
        }
        processCfg.sort(this.sortFunc);
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcLuckyDrawChargetem, processCfg, rect, this.code);
        this._scrollList.setPosition(28, 62);
        this.addChild(this._scrollList);
    };
    AcLuckyDrawPopupViewTab2.prototype.sortFunc = function (a, b) {
        var lqua = a.isGet;
        var lqub = b.isGet;
        if ((lqua && lqub) || !(lqua || lqub)) {
            return a.needGem - b.needGem;
        }
        else if (lqua) {
            return 1;
        }
        else if (lqub) {
            return -1;
        }
    };
    /**
     * 领奖回调
     */
    AcLuckyDrawPopupViewTab2.prototype.christmasTaskRewardHandel = function (event) {
        var view = this;
        if (event.data.ret) {
            // taskId
            var list = [];
            var rechargeId = view.vo.selIdx;
            var starnum = view.cfg.recharge[rechargeId].specialGift;
            if (starnum) {
                var icon = "luckdrawluckyicon1-" + view.getUiCode();
                var starItem = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }
            var reward = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            var replacerewards = event.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
            App.CommonUtil.playRewardFlyAction(list);
        }
    };
    AcLuckyDrawPopupViewTab2.prototype.refreashView = function () {
        var view = this;
        var taskData = this.cfg.recharge;
        var processCfg = [];
        for (var i in taskData) {
            var unit = taskData[i];
            processCfg.push({
                needGem: unit.needGem,
                getReward: unit.getReward,
                id: Number(i),
                specialGift: unit.specialGift,
                isGet: view.vo.isGetRecharge(Number(i))
            });
        }
        processCfg.sort(this.sortFunc);
        this._scrollList.refreshData(processCfg, this.code);
    };
    AcLuckyDrawPopupViewTab2.prototype.getUiCode = function () {
        if (this.param.data.code == "3") {
            return "1";
        }
        else if (this.param.data.code == "4") {
            return "2";
        }
        return this.param.data.code;
    };
    AcLuckyDrawPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD, this.christmasTaskRewardHandel, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcLuckyDrawPopupViewTab2.prototype, "AcLuckyDrawPopupViewTab2");
//# sourceMappingURL=AcLuckyDrawTab2.js.map