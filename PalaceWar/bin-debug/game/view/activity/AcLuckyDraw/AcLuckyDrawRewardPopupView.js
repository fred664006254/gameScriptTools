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
 * 财运奖励
 * author 钱竣
 */
var AcLuckyDrawRewardPopupView = (function (_super) {
    __extends(AcLuckyDrawRewardPopupView, _super);
    function AcLuckyDrawRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcLuckyDrawRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
        var view = this;
        var id = this.param.data.id;
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 720;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var processCfg = [];
        for (var i in view.cfg.achievement) {
            var unit = view.cfg.achievement[i];
            processCfg.push({
                needNum: unit.needNum,
                getReward: unit.getReward,
                id: Number(i),
                isGet: view.vo.isGetJinduAward(Number(i))
            });
        }
        processCfg.sort(this.sortFunc);
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcLuckyDrawRewardItem, processCfg, rect, { id: id, code: view.code, aid: view.aid });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        if (typeof id != 'undefined') {
            for (var i = 0; i < processCfg.length; i++) {
                if (processCfg[i].id == id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcLuckyDrawRewardPopupView.prototype.sortFunc = function (a, b) {
        var lqua = a.isGet;
        var lqub = b.isGet;
        if ((lqua && lqub) || !(lqua || lqub)) {
            return a.needNum - b.needNum;
        }
        else if (lqua) {
            return 1;
        }
        else if (lqub) {
            return -1;
        }
    };
    /**刷新item */
    AcLuckyDrawRewardPopupView.prototype.weathRewardHandle = function (event) {
        var view = this;
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var replacerewards = event.data.data.data.replacerewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcLuckyDrawRewardPopupView.prototype.refreashView = function () {
        var view = this;
        var processCfg = [];
        for (var i in view.cfg.achievement) {
            var unit = view.cfg.achievement[i];
            processCfg.push({
                needNum: unit.needNum,
                getReward: unit.getReward,
                id: Number(i),
                isGet: view.vo.isGetJinduAward(Number(i))
            });
        }
        processCfg.sort(this.sortFunc);
        this._scrollList.refreshData(processCfg, { code: view.code, aid: view.aid });
    };
    AcLuckyDrawRewardPopupView.prototype.getTitleStr = function () {
        return "acLuckyDrawLuckyReward-" + this.code;
    };
    AcLuckyDrawRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3"
        ]);
    };
    AcLuckyDrawRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawRewardPopupView;
}(PopupView));
__reflect(AcLuckyDrawRewardPopupView.prototype, "AcLuckyDrawRewardPopupView");
//# sourceMappingURL=AcLuckyDrawRewardPopupView.js.map