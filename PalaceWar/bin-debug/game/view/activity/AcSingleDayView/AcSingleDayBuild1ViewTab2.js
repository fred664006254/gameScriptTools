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
var AcSingleDayBuild1ViewTab2 = (function (_super) {
    __extends(AcSingleDayBuild1ViewTab2, _super);
    function AcSingleDayBuild1ViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcSingleDayBuild1ViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1ViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1ViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayBuild1ViewTab2.prototype.initView = function () {
        //110
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD, this.refreashView, this);
        var view = this;
        view.height = GameConfig.stageHeigth - view.y - 110;
        var rechargeData = this.vo.getSortRecharge();
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        var bg = BaseBitmap.create("public_9_bg22");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 110;
        this.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 40, bg.height - 45);
        this._scrollList = ComponentManager.getScrollList(AcSingleDayBuild1ViewTab2ScrollItem, rechargeData, rect, { vo: this.vo });
        this._scrollList.setPosition(17, 23);
        this.addChild(this._scrollList);
    };
    AcSingleDayBuild1ViewTab2.prototype.refreashView = function (event) {
        if (event.data.ret) {
            if (event.data.data.cmd == NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD) {
                // let rewardVo = GameData.formatRewardItem(event.data.data.data.rewards);
                // App.CommonUtil.playRewardFlyAction(rewardVo);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: event.data.data.data.rewards, isPlayAni: true });
            }
        }
        var rechargeData = this.vo.getSortRecharge();
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(rechargeData, { vo: this.vo });
    };
    AcSingleDayBuild1ViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD, this.refreashView, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild1ViewTab2;
}(CommonViewTab));
__reflect(AcSingleDayBuild1ViewTab2.prototype, "AcSingleDayBuild1ViewTab2");
//# sourceMappingURL=AcSingleDayBuild1ViewTab2.js.map