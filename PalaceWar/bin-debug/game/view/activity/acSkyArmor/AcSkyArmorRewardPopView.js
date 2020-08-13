var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 奖励
 * author wxz
 * date 2020.6.22
 * @class AcSkyArmorRewardPopView
 */
var AcSkyArmorRewardPopView = /** @class */ (function (_super) {
    __extends(AcSkyArmorRewardPopView, _super);
    function AcSkyArmorRewardPopView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AcSkyArmorRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();
    };
    AcSkyArmorRewardPopView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    Object.defineProperty(AcSkyArmorRewardPopView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRewardPopView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 50;
    };
    AcSkyArmorRewardPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isShowAchieveDot()) {
            this.tabbarGroup.addRedPoint(1);
            this.tabbarGroup.setRedPos(1, this.tabbarGroup.getTabBar(1).width - 28, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.showExchangeWifeDot()) {
            this.tabbarGroup.addRedPoint(3);
            this.tabbarGroup.setRedPos(3, this.tabbarGroup.getTabBar(3).width - 28, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(3);
        }
    };
    AcSkyArmorRewardPopView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACMOUSECOME_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcSkyArmorRewardPopView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcSkyArmorRewardPopView.prototype.getMyRankData = function () {
        if (this._rankData) {
            return this._rankData;
        }
        return null;
    };
    Object.defineProperty(AcSkyArmorRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRewardPopView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRewardPopView.prototype.getTabbarTextArr = function () {
        return ["acSkyArmor_reward_title1-" + this.TypeCode,
            "acSkyArmor_reward_title2-" + this.TypeCode,
            "acSkyArmor_reward_title3-" + this.TypeCode,
            "acSkyArmor_reward_title4-" + this.TypeCode
        ];
    };
    /**标题 */
    AcSkyArmorRewardPopView.prototype.getTitleStr = function () {
        return "acSkyArmor_reward_title-" + this.TypeCode;
    };
    AcSkyArmorRewardPopView.prototype.getShowHeight = function () {
        return 840;
    };
    AcSkyArmorRewardPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3", "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1", "ackite_skintopbg", "ackite_skintopline", "activity_charge_red", "destroysametaskbg", "servant_star",
            "servantweaponshowbg", "specialview_commoni_namebg", "tailor_get_light", , "dechuanchangearrow-1",
            "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1"
        ]).concat("skyarmortab3-" + this.TypeCode);
    };
    AcSkyArmorRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkyArmorRewardPopView;
}(PopupView));
//# sourceMappingURL=AcSkyArmorRewardPopView.js.map