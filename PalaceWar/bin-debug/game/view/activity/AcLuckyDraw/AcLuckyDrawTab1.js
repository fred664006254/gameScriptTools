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
var AcLuckyDrawPopupViewTab1 = (function (_super) {
    __extends(AcLuckyDrawPopupViewTab1, _super);
    function AcLuckyDrawPopupViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLuckyDrawPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawPopupViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
        var id = this.vo.showId;
        this.vo.showId = null;
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
        this._scrollList.setPosition(28, 62);
        this.addChild(this._scrollList);
        if (typeof id != 'undefined') {
            for (var i = 0; i < processCfg.length; i++) {
                if (processCfg[i].id == id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcLuckyDrawPopupViewTab1.prototype.sortFunc = function (a, b) {
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
    AcLuckyDrawPopupViewTab1.prototype.weathRewardHandle = function (event) {
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
    AcLuckyDrawPopupViewTab1.prototype.refreashView = function () {
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
    AcLuckyDrawPopupViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcLuckyDrawPopupViewTab1.prototype, "AcLuckyDrawPopupViewTab1");
//# sourceMappingURL=AcLuckyDrawTab1.js.map