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
 * 充值转盘
 * @author 赵占涛
 */
var AcMayDayRechargeView = (function (_super) {
    __extends(AcMayDayRechargeView, _super);
    function AcMayDayRechargeView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcMayDayRechargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayRechargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayRechargeView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM, this.update, this);
        AcMayDayRechargeView.AID = view.aid;
        AcMayDayRechargeView.CODE = view.code;
        view._nodeContainer = new BaseDisplayObjectContainer();
        view.addChildToContainer(view._nodeContainer);
        this.update();
        if (PlatformManager.checkHideIconByIP()) {
            this.tabbarGroup.setLocked(1, true);
        }
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    AcMayDayRechargeView.prototype.checkTabCondition = function (index) {
        if (index == 1 && PlatformManager.checkHideIconByIP()) {
            return false;
        }
        return true;
    };
    AcMayDayRechargeView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcMayDayRechargeView.prototype.getTabbarTextArr = function () {
        return ["AcTurnTableViewTab1_" + this.code
        ];
    };
    AcMayDayRechargeView.prototype.hide = function () {
        // let curTab = this.getSelectedTab();
        if (!AcMayDayRechargeView._isCircleRun) {
            _super.prototype.hide.call(this);
        }
        // 	if (!this._isCircleRun){
        //         super.hide();
        //     }
    };
    AcMayDayRechargeView.prototype.getTabbarGroupY = function () {
        return 0; //232
    };
    AcMayDayRechargeView.prototype.getTitleButtomY = function () {
        return 148;
    };
    AcMayDayRechargeView.prototype.getTitleBgName = function () {
        return "commonview_db_04";
    };
    AcMayDayRechargeView.prototype.getRuleInfo = function () {
        return "acmaydayrechargeRuleInfo" + this.code;
    };
    AcMayDayRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_red",
            "itemeffect",
            "collectflag",
            "dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3",
            "dailytask_box2_1", "dailytask_box2_2", "dailytask_box2_3",
            "dailytask_box_light", "acturntable_bg", "acturntable_point",
            "acturntable_rankicon_2",
            "progress_type1_yellow", "progress_type1_bg",
            "rank_biao", "acnewyear_middlebg",
            "acturntable_bg2", "acturntable_on", "acturntable_pointcircle",
            "acturntable_7zhe", "dailytask_dt_02", "dailytask_dt_01", "dailytask_dt_03",
            "prisonview_1",
            "common_numbg"
        ]);
    };
    AcMayDayRechargeView.prototype.update = function () {
        //第一页 红点
        var vo = this.vo;
        if (!vo) {
            return;
        }
    };
    AcMayDayRechargeView.prototype.dispose = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM, this.update, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    AcMayDayRechargeView.AID = null;
    AcMayDayRechargeView.CODE = null;
    AcMayDayRechargeView._isCircleRun = false;
    return AcMayDayRechargeView;
}(AcCommonView));
__reflect(AcMayDayRechargeView.prototype, "AcMayDayRechargeView");
