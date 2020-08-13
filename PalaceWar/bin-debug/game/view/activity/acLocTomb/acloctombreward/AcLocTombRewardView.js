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
var AcLocTombRewardView = (function (_super) {
    __extends(AcLocTombRewardView, _super);
    function AcLocTombRewardView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcLocTombRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombRewardView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankRewardTab1",
            "acPunishRankRewardTab2",
            "acwipeBossReward"
        ];
    };
    AcLocTombRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "wipescore1icon", "wipescore2icon",
            "aobaidescnamebg"
        ]);
    };
    AcLocTombRewardView.prototype.getTitleStr = function () {
        return 'itemDropDesc_1011';
    };
    AcLocTombRewardView.prototype.initView = function () {
    };
    AcLocTombRewardView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcLocTombRewardView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcLocTombRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLocTombRewardView;
}(CommonView));
__reflect(AcLocTombRewardView.prototype, "AcLocTombRewardView");
//# sourceMappingURL=AcLocTombRewardView.js.map