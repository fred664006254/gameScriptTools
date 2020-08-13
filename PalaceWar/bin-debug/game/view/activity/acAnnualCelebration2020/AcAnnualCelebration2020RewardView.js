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
var AcAnnualCelebration2020RewardView = (function (_super) {
    __extends(AcAnnualCelebration2020RewardView, _super);
    function AcAnnualCelebration2020RewardView() {
        return _super.call(this) || this;
    }
    AcAnnualCelebration2020RewardView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            // let tabbg = BaseBitmap.create("commonview_tabbar_bg");
            // tabbg.x = 10;
            // tabbg.y = 94;
            // this.addChild(tabbg);
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            this.tabbarGroup.setSpace(0);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.y += 3;
            this.tabbarGroup.x = (this.width - this.tabbarGroup.width) / 2;
            this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
            // this.tabbarGroup.addZshi();
        }
    };
    AcAnnualCelebration2020RewardView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_BIG_TAB2;
    };
    AcAnnualCelebration2020RewardView.prototype.getTitleStr = function () {
        return "acLaborDayPopupViewTitle-1";
    };
    AcAnnualCelebration2020RewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg",
            "newsingledaytab2bg-1",
            "arena_bottom",
            "acmidautumnview_titlebg",
            "activity_charge_red",
            "destroysametaskbg",
            "newsingledaytab2bottombg-1",
        ]);
    };
    Object.defineProperty(AcAnnualCelebration2020RewardView.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020RewardView.prototype.getTabbarTextArr = function () {
        return ["acAC2020_circle_reward",
            "acAC2020_celebration_task",
        ];
    };
    AcAnnualCelebration2020RewardView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var bottomBg = BaseBitmap.create("newsingledaytab2bg-1");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChildToContainer(bottomBg);
        this.freshView();
    };
    AcAnnualCelebration2020RewardView.prototype.freshView = function () {
        var view = this;
        if (view.vo.checkCircleRedDot()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.checkTaskRedDot()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcAnnualCelebration2020RewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcAnnualCelebration2020RewardView;
}(CommonView));
__reflect(AcAnnualCelebration2020RewardView.prototype, "AcAnnualCelebration2020RewardView");
//# sourceMappingURL=AcAnnualCelebration2020RewardView.js.map