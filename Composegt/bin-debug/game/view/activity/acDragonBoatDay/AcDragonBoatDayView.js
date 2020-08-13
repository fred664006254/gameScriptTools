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
/*
author : qianjun
date : 2018.4.14
desc : 龙舟活动
*/
var AcDragonBoatDayView = (function (_super) {
    __extends(AcDragonBoatDayView, _super);
    function AcDragonBoatDayView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._activityDescText = null;
        _this._topBg = null;
        _this._bottomBg = null;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    //
    AcDragonBoatDayView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        //top背景图
        var _topBg = BaseBitmap.create("dragonboatmanbg-" + view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0, view.titleBg.height]);
        view._topBg = _topBg;
        view.addChild(_topBg);
        view.swapChildren(view.closeBtn, _topBg);
        //活动时间   
        var vo = this.vo;
        if (this.code == "1" || this.code == "3" || this.code == "5") {
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            // view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _topBg, [197,110]);
            view.addChild(view._activityTimerText);
            view._activityTimerText.x = 10;
            view._activityTimerText.y = 287;
            view._activityTimerText.size = 20;
            //活动描述
            view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            // view._activityDescText.width = 456 - 24; 
            // view._activityDescText.lineSpacing = 6;
            // view.setLayoutPosition(LayoutConst.lefttop, view._activityDescText, view._activityTimerText, [0,2+view._activityTimerText.textHeight]);
            view.addChild(view._activityDescText);
            view._activityDescText.x = view._activityTimerText.x;
            view._activityDescText.size = 18;
            view._activityDescText.width = 630;
            view._activityDescText.y = 318;
        }
        //targroup
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, _topBg, [0, _topBg.height + 11]);
        var tarGroupBg = BaseBitmap.create('dragonboattarbg');
        tarGroupBg.width = view.width;
        tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0, _topBg.height - 10]);
        view.addChild(tarGroupBg);
        view.swapChildren(view.tabbarGroup, tarGroupBg);
        if (this.code == "2") {
            view.setChildIndex(tarGroupBg, 3);
            view.setChildIndex(this.tabbarGroup, 4);
            tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15 + 19;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0, _topBg.height - 19]);
        }
        //bottombg
        // let _bottomBg:BaseBitmap = BaseBitmap.create(``);
        // _bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y - view.tabbarGroup.height;
        // view._bottomBg = _bottomBg;
        // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, _bottomBg, view);
        // if(this.code=="2")
        // {
        //     _bottomBg.y = 142;
        //     //  view.setLayoutPosition(LayoutConst.horizontalCenterbottom, _bottomBg, view,[0,142]);
        // }
        // _bottomBg.x = 0;
        // view.addChild(_bottomBg);
        view.container.width = tarGroupBg.width;
        view.container.height = tarGroupBg.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.container, view.tabbarGroup, [0, view.tabbarGroup.height + 13]);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = 133; // this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-5;
        public_dot1.y = this.tabbarGroup.y + 10;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = 280; //this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width-45;
        public_dot2.y = this.tabbarGroup.y + 10;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = 430; //this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-45;
        public_dot3.y = this.tabbarGroup.y + 10;
        this.public_dot3 = public_dot3;
        this.update();
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth - 2;
        borderBg.height = GameConfig.stageHeigth - 455 - 8;
        borderBg.x = 2;
        borderBg.y = this.tabbarGroup.y + this.tabbarGroup.height;
        this.addChild(borderBg);
        if (PlatformManager.checkHideIconByIP()) {
            this.tabbarGroup.setLocked(1, true);
        }
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    AcDragonBoatDayView.prototype.checkTabCondition = function (index) {
        if (index == 1 && PlatformManager.checkHideIconByIP()) {
            return false;
        }
        return true;
    };
    AcDragonBoatDayView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        var tabView = view.getSelectedTab();
        if (tabView) {
            tabView.x = 0;
        }
    };
    AcDragonBoatDayView.prototype.getTabbarTextArr = function () {
        return ["DragonBoatDayViewTab1_" + this.code,
            "DragonBoatDayViewTab2_" + this.code,
            "DragonBoatDayViewTab3_" + this.code,
            "DragonBoatDayViewTab4_" + this.code
        ];
    };
    AcDragonBoatDayView.prototype.getRuleInfo = function () {
        return "DragonBoatDayRuleInfo-" + this.code;
    };
    AcDragonBoatDayView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dragonboatbg", "dragonboatitem1", "dragonboatitem2", "dragonboatmanbg-1", "dragonboatnumbg", "dragonboatprogress_bg", "dragonboatprogress", "dragonboattab1bg", "dragonboattarbg",
            "punish_rank_icon", "punish_rank_name", , "dragonboathead1", "dragonboathead2", "dragonboat1", "dragonboat2", "dragonboatbg2", "acturntable_rankicon_down", "acturntable_rankicon",
            "activity_charge_red", "collectflag",
            "accarnivalview_tab_red", "progress5", "progress3_bg", "accarnivalview_tab_green2",
            "shopview_corner", "shopview_line",
            "dblamp1", "dblamp2",
            // "lihua_hong0001","lihua_hong0002","lihua_hong0003","lihua_hong0004","lihua_hong0005",
            // "lihua_hong0006","lihua_hong0007","lihua_hong0008","lihua_hong0009",
            // "lihua_huang0001","lihua_huang0002","lihua_huang0003","lihua_huang0004","lihua_huang0005",
            // "lihua_huang0006","lihua_huang0007","lihua_huang0008","lihua_huang0009",
            // "lihua_lan0001","lihua_lan0002","lihua_lan0003","lihua_lan0004","lihua_lan0005",
            // "lihua_lan0006","lihua_lan0007","lihua_lan0008","lihua_lan0009",
            "dragonboat3_1", "dragonboat3_2", "dragonboatitem3", "dragonboatmanbg-3", "dragonboatmanbg-5", "dragonboathead3",
            "rechargevie_db_01",
            "recharge_diban_01",
            "dragonboatred",
            "forpeople_bottom",
            "activity_charge_red",
            "activity_db_01",
            "progress_type1_yellow",
            "progress_type1_bg",
            "rank_biao"
        ]);
    };
    Object.defineProperty(AcDragonBoatDayView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return GameConfig.stageHeigth - view.tabbarGroup.y - view.tabbarGroup.height; // view._bottomBg.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayView.prototype.update = function () {
        //第一页 红点
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = vo.getpublicRedhot1();
        }
        //第二页 红点
        if (this.public_dot2) {
            this.public_dot2.visible = vo.getpublicRedhot2();
        }
        //第三页 红点
        if (this.public_dot3) {
            this.public_dot3.visible = vo.getpublicRedhot3();
        }
    };
    AcDragonBoatDayView.prototype.dispose = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        var view = this;
        view._activityDescText = view._activityTimerText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayView;
}(AcCommonView));
__reflect(AcDragonBoatDayView.prototype, "AcDragonBoatDayView");
