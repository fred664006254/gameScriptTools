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
 * 春节活动
 */
var AcNewYearSevenDaysView = (function (_super) {
    __extends(AcNewYearSevenDaysView, _super);
    // private public_dot1:BaseBitmap =null;
    // private public_dot2:BaseBitmap =null;
    function AcNewYearSevenDaysView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._container = null;
        // public static AID:string=null;
        // public static CODE:string =null;
        _this.lastType = 0;
        _this._topBg = null;
        _this._topBg2 = null;
        return _this;
    }
    Object.defineProperty(AcNewYearSevenDaysView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearSevenDaysView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearSevenDaysView.prototype.getUicode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcNewYearSevenDaysView.prototype.getTitleStr = function () {
        return null; //`acNewYearSevenDays-1_Title`;
    };
    AcNewYearSevenDaysView.prototype.getTitleBgName = function () {
        var code = this.getUicode();
        return App.CommonUtil.getResByCode("acnewyear7daytitlename", code);
    };
    AcNewYearSevenDaysView.prototype.initView = function () {
        var _this = this;
        this.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT, this.isShowRedhot, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.isShowRedhot, this);
        var code = this.getUicode();
        var topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewyear7days_topbg", code));
        // topBg.width = GameConfig.stageWidth+18;
        topBg.y = -this.container.y + this.titleBg.height - 7;
        this.addChild(topBg);
        this.addChildToContainer(topBg);
        this._topBg = topBg;
        var container = new BaseDisplayObjectContainer();
        this.addChildToContainer(container);
        this._container = container;
        if (code == "1") {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(0, 0);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            container.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            // skinTxtEffect.touchEnabled = false;
            var skinTxtStr = "acgiftreturnview_common_skintxt";
            var skinTxt = BaseBitmap.create(skinTxtStr);
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            container.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            // skinTxt.touchEnabled = false;
            var skinTxteffect = BaseBitmap.create(skinTxtStr);
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
            container.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            // skinTxteffect.touchEnabled = false;
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 160;
            touchPos.height = 40;
            touchPos.setPosition(25, 57);
            container.addChild(touchPos);
            touchPos.addTouchTap(function () {
                var topMsg = LanguageManager.getlocal("acNewYear7daystitletip-" + _this.code);
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEPOPUPVIEW, { titleId: "4037", topMsg: topMsg });
            }, this);
            container.x = topBg.x + 455;
            container.y = topBg.y + 75;
        }
        var topBg2 = BaseBitmap.create(App.CommonUtil.getResByCode("acnewyear7days_topbg2", code));
        topBg2.width = GameConfig.stageWidth;
        topBg2.y = topBg.y;
        this.addChildToContainer(topBg2);
        this._topBg2 = topBg2;
        this._topBg2.visible = false;
        //最底部背景
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth + 16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y - this.container.y + 9;
        bottomBg.x = -8;
        bottomBg.y = topBg.height + topBg.y - 4;
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._activityTimerText.x = 55;
        this._activityTimerText.y = topBg.y + 148;
        this._activityTimerText.text = LanguageManager.getlocal("sweetgiftDate", [this.vo.acTimeAndHour]);
        this.addChildToContainer(this._activityTimerText);
        if (code == "2") {
            this._activityTimerText.x = 40;
            this._activityTimerText.y = topBg.y + 151;
        }
        var tabName = [];
        var tabY = bottomBg.y + 24;
        var tabX = 15;
        this.isShowRedhot();
        // this.public_dot1 =BaseBitmap.create("public_dot2");
        // this.addChild(this.public_dot1);
        // this.public_dot1.x =210;
        // this.public_dot1.y = this.tabbarGroup.y + 8;  
        // this.public_dot1.visible = this.vo.firstRed();
        // this.public_dot2 =BaseBitmap.create("public_dot2");
        // this.addChild(this.public_dot2);
        // this.public_dot2.x = 607;
        // this.public_dot2.y = this.tabbarGroup.y + 8;
        // this.public_dot2.visible = this.vo.secondRed();
        AcNewYearSevenDaysView.topBgHeight = GameConfig.stageHeigth - this.tabbarGroup.y - this.tabbarGroup.height;
    };
    AcNewYearSevenDaysView.prototype.isShowRedhot = function () {
        // if(AcNewYearViewTab2.isStarBoo==true)
        // { 
        if (this.vo.firstRed()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.secondRed()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        //    this.public_dot1.visible = ;
        //    this.public_dot2.visible = this.vo.secondRed();
        // }
        // else
        // {
        //     this.public_dot2.visible = false; 
        // }
    };
    AcNewYearSevenDaysView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        this.acEnd();
        if (data.index == 1) {
            this._topBg2.visible = true;
            this._topBg.visible = this._container.visible = false;
            this._activityTimerText.visible = false;
        }
        else {
            this._topBg2.visible = false;
            this._topBg.visible = this._container.visible = true;
            this._activityTimerText.visible = true;
        }
    };
    AcNewYearSevenDaysView.prototype.acEnd = function () {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    AcNewYearSevenDaysView.prototype.getTabbarTextArr = function () {
        var code = this.getUicode();
        return ["acNewYearViewTab1",
            "acNewYear7daysViewTab2-" + code,
        ];
    };
    AcNewYearSevenDaysView.prototype.goToRechargeHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcNewYearSevenDaysView.prototype.getResourceList = function () {
        var code = this.getUicode();
        return _super.prototype.getResourceList.call(this).concat([
            "newsingledaytab2bg-1",
            "acgiftreturnview_common_skintxt",
            "newyear7dayscode1",
            "acnewyear_big_package",
            "acnewyear_bottom",
            "acnewyear_bottom2",
            "acnewyear_bottom3",
            "acnewyear_chineseknot_" + code,
            // "acnewyear_chineseknot_2",  
            "acnewyear_box",
            "acnewyear_chineseknot2_" + code,
            // "acnewyear_chineseknot2_2", 
            "acnewyear_look",
            "acnewyear_small_package",
            "acnewyear_topbg_" + code,
            "acnewyear_topbg2_" + code,
            // "acnewyear_topbg_2", 
            // "acnewyear_topbg2_2",  
            "progress3",
            "progress3_bg",
            "progress5",
            "servant_bottombg",
            "progress6_bg",
            "forpeople_bottom",
            "rechargevie_effects",
            "common_titlebg",
            "newsingledaytab2bottombg-1",
            "acmidautumnview_titlebg",
            "newyear7dayscode" + code,
        ]);
    };
    Object.defineProperty(AcNewYearSevenDaysView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    // 页签图名称
    AcNewYearSevenDaysView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_BIG_TAB2;
    };
    AcNewYearSevenDaysView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    // 初始化tabbarGroup
    AcNewYearSevenDaysView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            if (this.addTabbarGroupBg()) {
                var bg = BaseBitmap.create("commonview_tabbar_bg");
                this.addChild(bg);
                this.tabbarGroupBg = bg;
            }
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            if (this.uiType == "2") {
                this.tabbarGroup.setSpace(180);
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
                this.setBigFameY(0);
            }
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
    };
    AcNewYearSevenDaysView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                tabX = this.viewBg.x + 30;
                tabY = this.viewBg.y + 60;
            }
            else {
                tabX = 12;
                tabY = (this.titleBg ? this.titleBg.y + this.titleBg.height + 222 : 100) - 14;
            }
            this.tabbarGroup.setPosition(tabX, tabY);
            if (this.tabbarGroupBg) {
                var tabBgName = ResourceManager.hasRes("acnewyear7days_tabbg-" + this.code) ? "acnewyear7days_tabbg-" + this.code : "acnewyear7days_tabbg";
                this.tabbarGroupBg.setRes(tabBgName);
                var code = this.getUicode();
                this.tabbarGroupBg.x = 0;
                this.tabbarGroupBg.y = tabY + 6;
                var fuimg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewyear7daysfu", code));
                this.addChild(fuimg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fuimg, this.tabbarGroupBg, [0, -14]);
            }
        }
    };
    // 是否隐藏标题背景阴影
    AcNewYearSevenDaysView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcNewYearSevenDaysView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    // 获取container初始y坐标 		
    AcNewYearSevenDaysView.prototype.getContainerY = function () {
        return 360;
    };
    // 关闭按钮图标名称
    AcNewYearSevenDaysView.prototype.getCloseBtnName = function () {
        if (Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == this.getClassName().toLowerCase().replace("view", "")) {
            return "";
        }
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcNewYearSevenDaysView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT, this.isShowRedhot, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.isShowRedhot, this);
        this.lastType = 0;
        this._activityTimerText = null;
        this._topBg = null;
        this._topBg2 = null;
        AcNewYearSevenDaysView.topBgHeight = 0;
        // this.public_dot2 =null;
        this._container = null;
        _super.prototype.dispose.call(this);
    };
    AcNewYearSevenDaysView.topBgHeight = 0;
    return AcNewYearSevenDaysView;
}(AcCommonView));
__reflect(AcNewYearSevenDaysView.prototype, "AcNewYearSevenDaysView");
//# sourceMappingURL=AcNewYearSevenDaysView.js.map