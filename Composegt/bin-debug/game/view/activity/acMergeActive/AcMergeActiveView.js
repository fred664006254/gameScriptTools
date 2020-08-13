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
 * 合服纪念活动
 * @author 赵占涛
 */
var AcMergeActiveView = (function (_super) {
    __extends(AcMergeActiveView, _super);
    function AcMergeActiveView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcMergeActiveView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveView.prototype, "acTivityId", {
        get: function () {
            return AcMergeActiveView.AID + "-" + AcMergeActiveView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMergeActiveView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETMERGEZONETIME, requestData: {} };
    };
    AcMergeActiveView.prototype.receiveData = function (data) {
        if (data.ret) {
            AcMergeActiveViewTab1.mztime = data.data.data.mztime;
        }
    };
    AcMergeActiveView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshDateForRedPoint, this);
        AcMergeActiveView.AID = this.aid;
        AcMergeActiveView.CODE = this.code;
        this.width = GameConfig.stageWidth;
        this.refreshDateForRedPoint();
    };
    AcMergeActiveView.prototype.refreshDateForRedPoint = function () {
        if (this.vo.isHaveSignRedDot()) {
            this.tabbarGroup.addRedPoint(0, null, null, -15, 8);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isHaveTaskRedDot()) {
            this.tabbarGroup.addRedPoint(1, null, null, -15, 8);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isHaveRechargeRedDot()) {
            this.tabbarGroup.addRedPoint(3, null, null, -15, 8);
        }
        else {
            this.tabbarGroup.removeRedPoint(3);
        }
    };
    AcMergeActiveView.prototype.getTabbarTextArr = function () {
        return [
            "acMergeActiveTab1Name",
            "acMergeActiveTab2Name",
            "acMergeActiveTab3Name",
            "acMergeActiveTab4Name",
        ];
    };
    AcMergeActiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "mergeactive_descbg",
            "mergeactive_signbg",
            "mergeactive_part1",
            "mergeactive_part2",
            "mergeactive_sign1",
            "mergeactive_sign2",
            "acchristmasview_1_red",
            "recharge_diban_01",
            "commonview_titlebgshadow",
            "progress_type1_yellow2",
            "progress_type3_bg",
        ]);
    };
    AcMergeActiveView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshDateForRedPoint, this);
        _super.prototype.dispose.call(this);
    };
    AcMergeActiveView.AID = null;
    AcMergeActiveView.CODE = null;
    return AcMergeActiveView;
}(AcCommonView));
__reflect(AcMergeActiveView.prototype, "AcMergeActiveView");
