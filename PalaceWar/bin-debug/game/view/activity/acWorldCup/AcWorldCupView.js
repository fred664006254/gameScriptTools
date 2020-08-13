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
desc : 世界杯活动
*/
var AcWorldCupView = (function (_super) {
    __extends(AcWorldCupView, _super);
    function AcWorldCupView() {
        var _this = _super.call(this) || this;
        _this._myPointsTxt = null;
        _this._acurFootballText = null;
        _this._activityTimerText = null;
        _this._activityDescText = null;
        _this._topBg = null;
        _this._bottomBg = null;
        _this._flower = null;
        _this._pointsGroup = null;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        _this.dayRatio = null;
        _this.dayRatioBg = null;
        return _this;
    }
    Object.defineProperty(AcWorldCupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupView.prototype.getContainerY = function () {
        return 0;
    };
    //
    AcWorldCupView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM, this.update, this);
        view._pointsGroup = new BaseDisplayObjectContainer();
        view._pointsGroup.setLayoutPosition(LayoutConst.leftbottom, view._pointsGroup, view, [40, 37]);
        view.addChild(view._pointsGroup);
        var myPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupVoteText2'), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, myPointsTxt, view._pointsGroup, [0, 9], true);
        view._pointsGroup.addChild(myPointsTxt);
        view._myPointsTxt = myPointsTxt;
        var flower = BaseBitmap.create('worldcupfootball');
        view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, myPointsTxt, [myPointsTxt.textWidth + 5, 0]);
        view._pointsGroup.addChild(flower);
        view._flower = flower;
        var vo = view.vo;
        var havescore = vo.getCurPoints();
        var fTxt = ComponentManager.getTextField(havescore.toString(), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, fTxt, flower, [flower.width + 10, 0]);
        view._pointsGroup.addChild(fTxt);
        view._acurFootballText = fTxt;
        //top背景图
        var _topBg = BaseBitmap.create("worldcuptopbg-" + this.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0, view.titleBg.height]);
        view._topBg = _topBg;
        view.addChild(_topBg);
        view.swapChildren(view.closeBtn, _topBg);
        var _descBg = BaseBitmap.create("acturntabletop_descbg");
        _descBg.width = 476;
        _descBg.height = 124;
        view.setLayoutPosition(LayoutConst.rightbottom, _descBg, _topBg, [5, 5]);
        view.addChild(_descBg);
        var period = view.vo.getCurPeriod();
        var dayRatioBg = BaseLoadBitmap.create("worldcuptopdesc-" + period);
        view.setLayoutPosition(LayoutConst.lefttop, dayRatioBg, _descBg, [50, -55]);
        view.addChild(dayRatioBg);
        view.dayRatioBg = dayRatioBg;
        var today = Math.min(vo.getCurDay(), view.cfg.odds.length);
        var dayRatio = BaseLoadBitmap.create("worldcupratio" + today);
        dayRatio.height = 38;
        view.setLayoutPosition(LayoutConst.lefttop, dayRatio, _descBg, [300, -52]);
        view.addChild(dayRatio);
        dayRatio.visible = period == 1;
        view.dayRatio = dayRatio;
        var btn = ComponentManager.getButton('worldcupckan', '', view.ckanclick, view);
        view.setLayoutPosition(LayoutConst.righttop, btn, _descBg, [10, -btn.height - 5]);
        view.addChild(btn);
        //活动时间   
        view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _descBg, [15, 10]);
        view.addChild(view._activityTimerText);
        //活动描述
        view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal("AcWorldCupRuleInfo-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._activityDescText.width = 456;
        view._activityDescText.lineSpacing = 6;
        view.setLayoutPosition(LayoutConst.lefttop, view._activityDescText, view._activityTimerText, [0, 6 + view._activityTimerText.textHeight]);
        view.addChild(view._activityDescText);
        //targroup
        view.setLayoutPosition(LayoutConst.lefttop, view.tabbarGroup, _topBg, [15, _topBg.height + 4]);
        //bottombg
        var _bottomBg = BaseBitmap.create("servant_bottombg");
        _bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 20;
        view._bottomBg = _bottomBg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _bottomBg, view, [0, _topBg.y + _topBg.height]);
        _bottomBg.x = 0;
        view.addChild(_bottomBg);
        view.swapChildren(view.tabbarGroup, _bottomBg);
        view.container.width = _bottomBg.width;
        view.container.height = _bottomBg.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.container, view, [0, view.tabbarGroup.y + view.tabbarGroup.height + 13]);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width - 5;
        public_dot1.y = this.tabbarGroup.y;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width - 5;
        public_dot2.y = this.tabbarGroup.y;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width - 5;
        public_dot3.y = this.tabbarGroup.y;
        this.public_dot3 = public_dot3;
        this.update();
    };
    AcWorldCupView.prototype.getRuleInfo = function () {
        return "AcWorldCupRule";
    };
    AcWorldCupView.prototype.ckanclick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPRATIOVIEW, {
            aid: this.aid,
            code: this.code
        });
    };
    AcWorldCupView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        var tabView = view.getSelectedTab();
        tabView.x = 0;
        view._myPointsTxt.visible = view._flower.visible = view._acurFootballText.visible = (data.index != 1);
        view.swapChildren(view._pointsGroup, view.tabViewData[data.index]);
    };
    AcWorldCupView.prototype.getTabbarTextArr = function () {
        return ["AcWorldCupViewTab1_1",
            "AcWorldCupViewTab2_1",
            "AcWorldCupViewTab3_1",
        ];
    };
    AcWorldCupView.prototype.getTitleStr = function () {
        return "acWorldCup-1ViewTitle";
    };
    AcWorldCupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "CHE", "PRT", "SAU", "EGY", "CRI", "MEX", "SRB", "MAR", "RUS", "HRV", "POL", "JPN", "DEU", "NGA", "GBR", "SEN", "BRA", "AUS", "URY", "TUN", "KOR", "PAN", "COL", "BEL", "FRA", "SWE", "ISL", "DNK", "IRN", "PER", "ESP", "ARG",
            "worldcupchampbg", "worldcupchamphead", "worldcupckan_down", "worldcupckan", "worldcupfootball", "worldcupin_1", "worldcupin_2", "worldcupin_3", "worldcupline", "worldcupratio1", "worldcupratio2", "worldcupratio3", "worldcupratio4", "worldcupratio5", "worldcupratio6", "worldcupratio7", "worldcuptopbg-1", "worldcuptopdesc-1",
            "acturntabletop_descbg", "dragonboattarbg", "shopview_corner", "shopview_line", "servant_bottombg",
            "worldcuptopdesc-2", "worldcuptopdesc-3"
        ]);
    };
    Object.defineProperty(AcWorldCupView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._bottomBg.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupView.prototype, "tabWidth", {
        get: function () {
            var view = this;
            return view.width;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupView.prototype.update = function () {
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
        var view = this;
        view._acurFootballText.text = view.vo.getCurPoints().toString();
        var today = Math.min(vo.getCurDay(), view.cfg.odds.length);
        var period = view.vo.getCurPeriod();
        view.dayRatio.visible = period == 1;
        view.dayRatioBg.setload("worldcuptopdesc-" + period);
        view.dayRatio.setload("worldcupratio" + today);
        if (period == 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            view.hide();
        }
    };
    AcWorldCupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM, this.update, this);
        var view = this;
        view._activityDescText = view._activityTimerText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        view._myPointsTxt = null;
        view._acurFootballText = null;
        view._topBg = null;
        view._flower = null;
        view._pointsGroup.removeChildren();
        view._pointsGroup = null;
        BaseLoadBitmap.release(view.dayRatioBg);
        view.dayRatioBg = null;
        BaseLoadBitmap.release(view.dayRatio);
        view.dayRatio = null;
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupView;
}(AcCommonView));
__reflect(AcWorldCupView.prototype, "AcWorldCupView");
/**
阿根廷 ARG
澳大利亚 AUS
比利时 BEL
巴西 BRA
瑞士 CHE
哥伦比亚 COL
哥斯达黎加 CRI
德国 DEU
丹麦 DNK
埃及 EGY
西班牙 ESP
法国 FRA
英国 GBR
克罗地亚 HRV
伊朗 IRN
冰岛 ISL
日本 JPN
韩国 KOR
摩洛哥 MAR
墨西哥 MEX
尼日利亚 NGA
巴拿马 PAN
波兰 POL
葡萄牙 PRT
俄罗斯 RUS
沙特 SAU
塞内加尔 SEN
塞尔维亚 SRB
瑞典 SWE
突尼斯 TUN
乌拉圭 URY
秘鲁 PER
*/ 
//# sourceMappingURL=AcWorldCupView.js.map