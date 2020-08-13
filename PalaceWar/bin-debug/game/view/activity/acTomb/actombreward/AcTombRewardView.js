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
 * author:qianjun
 * desc:奖励弹窗
*/
var AcTombRewardView = (function (_super) {
    __extends(AcTombRewardView, _super);
    function AcTombRewardView() {
        return _super.call(this) || this;
    }
    AcTombRewardView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    Object.defineProperty(AcTombRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRewardView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombRewardView.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombRewardView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankRewardTab1",
            "acPunishRankRewardTab2",
            "acwipeBossReward"
        ];
    };
    AcTombRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "wipescore1icon", "wipescore2icon",
            "aobaidescnamebg"
        ]);
    };
    AcTombRewardView.prototype.getTitleStr = function () {
        return 'itemDropDesc_1011';
    };
    AcTombRewardView.prototype.initView = function () {
    };
    AcTombRewardView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_TOMBRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcTombRewardView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcTombRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTombRewardView;
}(CommonView));
__reflect(AcTombRewardView.prototype, "AcTombRewardView");
//# sourceMappingURL=AcTombRewardView.js.map