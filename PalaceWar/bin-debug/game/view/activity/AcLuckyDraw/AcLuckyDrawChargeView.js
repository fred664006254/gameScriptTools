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
 * 	幸运翻牌充值活动
 * author 钱竣
 * date 2018/11/27
 */
var AcLuckyDrawChargeView = (function (_super) {
    __extends(AcLuckyDrawChargeView, _super);
    function AcLuckyDrawChargeView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcLuckyDrawChargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawChargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawChargeView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawChargeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawChargeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawChargeView.prototype.getTitleStr = function () {
        return "acLuckyDrawRecharge-" + this.code;
    };
    AcLuckyDrawChargeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD, this.christmasTaskRewardHandel, this);
        var view = this;
        var bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);
        var bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
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
        var rect = new egret.Rectangle(0, 0, 600, bg2.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcLuckyDrawChargetem, processCfg, rect, this.code);
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y);
        this.addChildToContainer(this._scrollList);
    };
    AcLuckyDrawChargeView.prototype.sortFunc = function (a, b) {
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
    AcLuckyDrawChargeView.prototype.christmasTaskRewardHandel = function (event) {
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
            App.CommonUtil.playRewardFlyAction(list);
        }
    };
    AcLuckyDrawChargeView.prototype.refreashView = function () {
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
    AcLuckyDrawChargeView.prototype.getUiCode = function () {
        if (this.param.data.code == "3") {
            return "1";
        }
        else if (this.param.data.code == "4") {
            return "2";
        }
        return this.param.data.code;
    };
    AcLuckyDrawChargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress3"
        ]);
    };
    AcLuckyDrawChargeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD, this.christmasTaskRewardHandel, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawChargeView;
}(CommonView));
__reflect(AcLuckyDrawChargeView.prototype, "AcLuckyDrawChargeView");
//# sourceMappingURL=AcLuckyDrawChargeView.js.map