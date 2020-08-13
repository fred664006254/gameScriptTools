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
var AcNewOpenViewTab2 = (function (_super) {
    __extends(AcNewOpenViewTab2, _super);
    function AcNewOpenViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcNewOpenViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS), this.rewardCallBack, this);
        var vo = this.vo;
        var taskArr = this.vo.getRechangeArr();
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 383);
        var scrollList = ComponentManager.getScrollList(AcNewOpenRechargeItem, taskArr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.y = 8;
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcNewOpenViewTab2.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var taskArr = this.vo.getRechangeArr();
        this._scrollList.refreshData(taskArr, this.code);
        this.vo.lastpos = null;
    };
    AcNewOpenViewTab2.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = "1053_0_" + cfg.specialGift + "_" + this.getUiCode() + "|" + rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcNewOpenViewTab2.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenViewTab2;
}(AcCommonViewTab));
__reflect(AcNewOpenViewTab2.prototype, "AcNewOpenViewTab2");
//# sourceMappingURL=AcNewOpenViewTab2.js.map