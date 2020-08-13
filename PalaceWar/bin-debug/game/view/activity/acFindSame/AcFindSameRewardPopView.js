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
 * author weixiaozhe
 * date 2020.4.27
 * @class AcFindSameRewardPopView
 */
var AcFindSameRewardPopView = (function (_super) {
    __extends(AcFindSameRewardPopView, _super);
    function AcFindSameRewardPopView() {
        var _this = _super.call(this) || this;
        _this.tabbarGroup = null;
        return _this;
    }
    AcFindSameRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();
        // let rewardBg = BaseBitmap.create("public_9_bg4");
        // rewardBg.width = 538;
        // rewardBg.height = 680;
        // rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, this.tabbarGroup.y - 5+40);
        // this.addChildToContainer(rewardBg);
    };
    AcFindSameRewardPopView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    Object.defineProperty(AcFindSameRewardPopView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameRewardPopView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    // protected initTabbarGroup():void
    // {
    // 	let tabBarTextArr:string[] = this.getTabbarTextArr();
    // 	if(tabBarTextArr&&tabBarTextArr.length>0)
    // 	{
    // 		this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr,this.clickTabbarHandler, this);
    // 		this.addChild(this.tabbarGroup);
    // 		this.setTabBarPosition();
    // 		this.container.y = this.getTitleButtomY();
    // 		this.tabbarGroup.selectedIndex=this._selectedTabIndex;
    // 		this.tabbarGroup.x = 0+GameData.popupviewOffsetX;
    //         this.tabbarGroup.y =20;
    //     }
    //     this.refreshView();
    // }
    AcFindSameRewardPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetChargeReward()) {
            this.tabbarGroup.addRedPoint(0);
            this.tabbarGroup.setRedPos(0, this.tabbarGroup.getTabBar(0).width - 24, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCangetAchieveReward()) {
            this.tabbarGroup.addRedPoint(1);
            this.tabbarGroup.setRedPos(1, this.tabbarGroup.getTabBar(1).width - 30, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isShowTaskRewardRedDot()) {
            this.tabbarGroup.addRedPoint(2);
            this.tabbarGroup.setRedPos(2, this.tabbarGroup.getTabBar(2).width - 30, 0);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    Object.defineProperty(AcFindSameRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardPopView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameRewardPopView.prototype.getTabbarTextArr = function () {
        return ["findsame_reward_title1-" + this.TypeCode,
            "findsame_reward_title2-" + this.TypeCode,
            "findsame_reward_title4-" + this.TypeCode,
            "findsame_reward_title3-" + this.TypeCode
        ];
    };
    /**标题 */
    AcFindSameRewardPopView.prototype.getTitleStr = function () {
        return "findsame_reward_title-" + this.TypeCode;
    };
    AcFindSameRewardPopView.prototype.getShowHeight = function () {
        return 830;
    };
    AcFindSameRewardPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3", "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1", "ackite_skintopbg", "ackite_skintopline", "activity_charge_red", "destroysametaskbg",
            "skin_detail_namebg", "servantweaponshowbg", "specialview_commoni_namebg", "tailor_get_light",
        ]);
    };
    AcFindSameRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcFindSameRewardPopView;
}(PopupView));
__reflect(AcFindSameRewardPopView.prototype, "AcFindSameRewardPopView");
//# sourceMappingURL=AcFindSameRewardPopView.js.map