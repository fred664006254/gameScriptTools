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
 * 奖励预览
 * date 2019.11.11
 * author ycg
 * @class AcHeroineRewardPopupView
 */
var AcHeroineRewardPopupView = (function (_super) {
    __extends(AcHeroineRewardPopupView, _super);
    // public tabbarGroup:TabBarGroup = null;
    function AcHeroineRewardPopupView() {
        return _super.call(this) || this;
    }
    AcHeroineRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();
    };
    AcHeroineRewardPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isShowRechargeRedDot()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    AcHeroineRewardPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acHeroineRechargeTitle-" + this.getTypeCode(),
            "acHeroineClothesTitle-" + this.getTypeCode(),
            "acHeroineWifeTitle-" + this.getTypeCode(),
        ];
    };
    AcHeroineRewardPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        else if (this.code == "6") {
            return "5";
        }
        else if (this.code == "8") {
            return "7";
        }
        else if (this.code == "10") {
            return "9";
        }
        return this.code;
    };
    Object.defineProperty(AcHeroineRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcHeroineRewardPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    // protected getShowWidth():number{
    //     return 600;
    // }
    AcHeroineRewardPopupView.prototype.getTitleStr = function () {
        return "acHeroineRewardPopupTitle-" + this.getTypeCode();
    };
    AcHeroineRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3_bg", "progress5", "accarnivalview_tab_red", "accarnivalview_tab_green", "skin_detail_namebg",
        ]);
    };
    AcHeroineRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 21;
    };
    AcHeroineRewardPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 21;
    };
    AcHeroineRewardPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.y -= 5;
    };
    AcHeroineRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcHeroineRewardPopupView;
}(PopupView));
__reflect(AcHeroineRewardPopupView.prototype, "AcHeroineRewardPopupView");
//# sourceMappingURL=AcHeroineRewardPopupView.js.map