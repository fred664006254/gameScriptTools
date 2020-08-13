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
var AcThrowArrowRewardPopupViewTab1 = (function (_super) {
    __extends(AcThrowArrowRewardPopupViewTab1, _super);
    function AcThrowArrowRewardPopupViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThrowArrowRewardPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThrowArrowRewardPopupViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var list = this.vo.getSortRechargeCfg();
        list.sort(function (a, b) { return a.sortId - b.sortId; });
        var tmpRect = new egret.Rectangle(0, 0, 520, view.height + 30);
        var scrollList = ComponentManager.getScrollList(AcThrowArrowRechargeScrollItem, list, tmpRect, { aid: this.aid, code: this.code });
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30, 60]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcThrowArrowRewardPopupViewTab1.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        // let cfg = view.cfg.recharge[view.vo.lastidx];
        var str = "1006_0_" + rData.specialGift + "_" + this.getUiCode() + "|" + rewards;
        var rewardList = GameData.formatRewardItem(str);
        // let pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList); //pos
        // this.vo.lastidx = null;
    };
    AcThrowArrowRewardPopupViewTab1.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var list = this.vo.getSortRechargeCfg();
        list.sort(function (a, b) { return a.sortId - b.sortId; });
        view._scrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code });
    };
    AcThrowArrowRewardPopupViewTab1.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowRewardPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcThrowArrowRewardPopupViewTab1.prototype, "AcThrowArrowRewardPopupViewTab1");
//# sourceMappingURL=AcThrowArrowRewardPopupViewTab1.js.map