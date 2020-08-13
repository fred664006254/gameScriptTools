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
 * 奖励
 * author wxz
 * date 2020.6.15
 * @class AcSkySoundRewardPopView
 */
var AcSkySoundRewardPopView = (function (_super) {
    __extends(AcSkySoundRewardPopView, _super);
    function AcSkySoundRewardPopView() {
        var _this = _super.call(this) || this;
        _this.tabbarGroup = null;
        return _this;
    }
    AcSkySoundRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();
    };
    AcSkySoundRewardPopView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    Object.defineProperty(AcSkySoundRewardPopView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcSkySoundRewardPopView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcSkySoundRewardPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.showExchangeDot()) {
            this.tabbarGroup.addRedPoint(0);
            this.tabbarGroup.setRedPos(0, this.tabbarGroup.getTabBar(0).width - 28, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
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
    Object.defineProperty(AcSkySoundRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkySoundRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkySoundRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkySoundRewardPopView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkySoundRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcSkySoundRewardPopView.prototype.getTabbarTextArr = function () {
        return ["acSkySound_reward_title1-" + this.TypeCode,
            "acSkySound_reward_title2-" + this.TypeCode,
            "acSkySound_reward_title3-" + this.TypeCode,
            "acSkySound_reward_title4-" + this.TypeCode
        ];
    };
    /**标题 */
    AcSkySoundRewardPopView.prototype.getTitleStr = function () {
        return "acSkySound_reward_title-" + this.TypeCode;
    };
    AcSkySoundRewardPopView.prototype.getShowHeight = function () {
        return 840;
    };
    AcSkySoundRewardPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3", "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1", "ackite_skintopbg", "ackite_skintopline", "activity_charge_red", "destroysametaskbg", "servant_star",
            "skin_detail_namebg", "servantweaponshowbg", "specialview_commoni_namebg", "tailor_get_light",
            "acskysound_exchangebg", "dechuanchangearrow-1"
        ]).concat("skysoundtab3-" + this.TypeCode);
    };
    AcSkySoundRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkySoundRewardPopView;
}(PopupView));
__reflect(AcSkySoundRewardPopView.prototype, "AcSkySoundRewardPopView");
//# sourceMappingURL=AcSkySoundRewardPopView.js.map