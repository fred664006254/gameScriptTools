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
        _this._timeCountTxt = null;
        _this._bottomBg7 = null;
        return _this;
    }
    AcDragonBoatDayView.prototype.getContainerY = function () {
        return 0;
    };
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
    AcDragonBoatDayView.prototype.getTypeCode = function () {
        var code = this.code;
        if (this.code == '6') {
            code = '3';
        }
        return code;
    };
    //
    AcDragonBoatDayView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.width = GameConfig.stageWidth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        //top背景图
        var _topBg = BaseBitmap.create("dragonboatmanbg-" + view.getTypeCode());
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0, view.titleBg.height - 0]);
        view._topBg = _topBg;
        view.addChild(_topBg);
        view.swapChildren(view.closeBtn, _topBg);
        if (view.getTypeCode() == "1" || view.getTypeCode() == "3") {
            var servantCfg = Config.ServantCfg.getServantItemById("1049");
            if (servantCfg.quality2) {
                var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
                cornerImg.x = 25;
                cornerImg.y = 235;
                cornerImg.setScale(1.3);
                view.addChild(cornerImg);
                if (PlatformManager.checkIsTextHorizontal()) {
                    cornerImg.x = 10;
                    cornerImg.y = 110;
                }
            }
        }
        //活动时间   
        var vo = this.vo;
        if (this.getTypeCode() != "2" && this.getTypeCode() != "5") {
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), this.getTypeCode() == '4' ? 20 : 22, TextFieldConst.COLOR_WHITE);
            view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _topBg, this.getTypeCode() == '4' ? [230, 110] : [197, 110]);
            if (this.getTypeCode() == "7") {
                view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _topBg, [197, 65]);
            }
            if (this.getTypeCode() == "8") {
                view.setLayoutPosition(LayoutConst.lefttop, view._activityTimerText, _topBg, [197, 75]);
            }
            view.addChild(view._activityTimerText);
            //活动描述
            var dayDesc = '';
            if ((this.code == '1' || this.code == '3' || this.code == '6') && Api.switchVoApi.checkServantRefuseBattle()) {
                dayDesc = "DragonBoatDayDesc-" + view.code + "_withOpenRefusal";
            }
            else {
                dayDesc = "DragonBoatDayDesc-" + view.code;
            }
            view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(dayDesc), this.getTypeCode() == '4' ? 18 : 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view._activityDescText.width = this.getTypeCode() == '4' ? 400 : 432;
            if (this.getTypeCode() == "7") {
                view._activityDescText.width = 420;
            }
            view._activityDescText.lineSpacing = 6;
            view.setLayoutPosition(LayoutConst.lefttop, view._activityDescText, view._activityTimerText, [0, 5 + view._activityTimerText.textHeight]);
            view.addChild(view._activityDescText);
            if (this.getTypeCode() == "7") {
                var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(view._topBg.x + 100 - skinTxtEffectBM.width / 2, view._topBg.y + 190 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(function () {
                    var topMsg = LanguageManager.getlocal("DragonBoatDayWifeSkinTopMsg_" + _this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: _this.cfg.show, topMsg: topMsg }); // 红颜id 没配置
                }, this);
                var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(view._topBg.x + 100, view._topBg.y + 190);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            }
            if (this.getTypeCode() == "8") {
                var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(0, 205);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(function () {
                    var topMsg = LanguageManager.getlocal("DragonBoatDayWifeSkinTopMsg_" + _this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: _this.cfg.show, topMsg: topMsg }); // 红颜id 没配置
                }, this);
                var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(view._topBg.x + 100, view._topBg.y + 190);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
                var str = view.vo.isInActivity() ? "allianceWeekEndViewCuontDown" : "acLaborDaytime-1";
                var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 20);
                view.addChild(tip2Text);
                view._timeCountTxt = tip2Text;
                view.setLayoutPosition(LayoutConst.lefttop, tip2Text, view._activityTimerText, [0, 5 + view._activityTimerText.textHeight]);
                view.setLayoutPosition(LayoutConst.lefttop, view._activityDescText, tip2Text, [0, 5 + tip2Text.textHeight]);
            }
        }
        //targroup
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, _topBg, [0, _topBg.height + 2]);
        var tarGroupBg = BaseBitmap.create('dragonboattarbg');
        tarGroupBg.width = view.width;
        tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0, _topBg.height - 10]);
        view.addChild(tarGroupBg);
        view.swapChildren(view.tabbarGroup, tarGroupBg);
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
            view.setChildIndex(tarGroupBg, 3);
            view.setChildIndex(this.tabbarGroup, 4);
            tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15 + 19;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0, _topBg.height - 19]);
        }
        //bottombg
        var _bottomBg = BaseBitmap.create("dragonboattab1bg");
        _bottomBg.height = GameConfig.stageHeigth - view.tabbarGroup.y - view.tabbarGroup.height;
        view._bottomBg = _bottomBg;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, _bottomBg, view, [0, 5]);
        if (this.getTypeCode() == "2") {
            _bottomBg.y = 142;
            //  view.setLayoutPosition(LayoutConst.horizontalCenterbottom, _bottomBg, view,[0,142]);
        }
        _bottomBg.x = 0;
        view.addChild(_bottomBg);
        if (this.getTypeCode() == "5") {
            _bottomBg.visible = false;
        }
        if (this.getTypeCode() == "5") {
            var dbboatbg = BaseLoadBitmap.create('dragonboatbgnew5');
            dbboatbg.width = 640;
            dbboatbg.height = 960;
            this.addChild(dbboatbg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, dbboatbg, this);
            this.setChildIndex(dbboatbg, 4);
            var dragonfontbg = BaseLoadBitmap.create('dragonfontbg');
            dragonfontbg.width = 640;
            dragonfontbg.height = 109;
            dragonfontbg.x = 0;
            dragonfontbg.y = 90;
            this.addChild(dragonfontbg);
            this.setChildIndex(dragonfontbg, 5);
        }
        view.container.width = tarGroupBg.width;
        view.container.height = tarGroupBg.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.container, view.tabbarGroup, [0, view.tabbarGroup.height + 12]);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width - 5;
        public_dot1.y = this.tabbarGroup.y + this.tabbarGroup.getTabBar(0).y;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width - 5;
        public_dot2.y = this.tabbarGroup.y + this.tabbarGroup.getTabBar(1).y;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width - 5;
        public_dot3.y = this.tabbarGroup.y + this.tabbarGroup.getTabBar(2).y;
        this.public_dot3 = public_dot3;
        this.update();
    };
    AcDragonBoatDayView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        var tabView = view.getSelectedTab();
        tabView.x = 0;
        if (this._bottomBg7) {
            if (data.index == 0) {
                this._bottomBg7.setVisible(true);
            }
            else {
                this._bottomBg7.setVisible(false);
            }
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
        if ((this.code == '1' || this.code == '3' || this.code == '6') && Api.switchVoApi.checkServantRefuseBattle()) {
            return "DragonBoatDayRuleInfo-" + this.code + "_withOpenRefusal";
        }
        return "DragonBoatDayRuleInfo-" + this.code;
    };
    AcDragonBoatDayView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        arr.push("dragonboatitem" + view.getTypeCode());
        arr.push("dragonboatmanbg-" + view.getTypeCode());
        var code = this.getTypeCode();
        if (code == '4') {
            arr.push('dragonboatman');
            arr.push('dragonboatbg4-1');
            arr.push('dragonboatbg4-2');
            arr.push('dragonboatbg4-3');
            arr.push('dragonboatmask');
        }
        if (code == "7") {
            arr.push("dragonboattitlebg-" + code);
            arr.push('dragonboathead' + code);
            arr.push('dragonboatrankbtn-' + code);
            arr.push('dragonboatrankbtn-' + code + "_down");
            arr.push("acwealthcarpview_skineffect");
            arr.push("acsearchproofview_common_skintxt");
            arr.push("acdragonboatvieweffect_ribbona");
            arr.push("acdragonboatvieweffect_ribbonb");
            arr.push("acdragonboatvieweffect_teama");
            arr.push("acdragonboatvieweffect_teamb");
            arr.push("acdragonboatvieweffect_teamc");
            // arr.push("dragonboatbg"+this.getTypeCode()+"-1");
        }
        if (this.getTypeCode() == "8") {
            arr.push("dragonboattitlebg-" + code);
            arr.push('dragonboathead' + code);
            arr.push("acsearchproofview_common_skintxt");
            arr.push("dragonboatbuttombg-" + code);
            arr.push("dragonboatbuttombg-" + code);
            arr.push('dragonboatlamp1');
            arr.push('dragonboatlamp2');
            arr.push('dragonboatlamp3');
            arr.push('dragonboatlamp4');
            arr.push('dragonboatlamp5');
            arr.push('dragonboatlamp6');
            arr.push("dragonboatbg" + code + "-1");
        }
        return _super.prototype.getResourceList.call(this).concat([
            "dragonboatbg", "dragonboatnumbg", "dragonboatprogress_bg", "dragonboatprogress", "dragonboattab1bg", "dragonboattarbg",
            "dragonboatrank", "dragonboatrank_down", "dragonboathead1", "dragonboathead2", "dragonboat1", "dragonboat2", "dragonboatbg2", "acturntable_rankicon_down", "acturntable_rankicon",
            "activity_charge_red",
            "accarnivalview_tab_red", "progress5", "progress3_bg", "accarnivalview_tab_green",
            "shopview_corner", "shopview_line",
            "dblamp1", "dblamp2",
            "dragonboat3_1", "dragonboat3_2", "dragonboathead3",
            "dragobottombg", "dragonfont",
        ]).concat(arr);
    };
    Object.defineProperty(AcDragonBoatDayView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view._bottomBg.height;
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
        if (this.getTypeCode() == "5") {
            this.tabbarGroup.visible = false;
            this.public_dot3.visible = false;
            this.public_dot2.visible = false;
            this.public_dot1.visible = false;
        }
    };
    // 标题背景名称
    AcDragonBoatDayView.prototype.getTitleBgName = function () {
        if (this.getTypeCode() == "7") {
            return "dragonboattitlebg-" + this.getTypeCode();
        }
        return _super.prototype.getTitleBgName.call(this);
    };
    AcDragonBoatDayView.prototype.getTitleStr = function () {
        if (this.getTypeCode() == "7") {
            return null;
        }
        return _super.prototype.getTitleStr.call(this);
    };
    AcDragonBoatDayView.prototype.tick = function () {
        var view = this;
        if (view._timeCountTxt) {
            var str = view.vo.isInActivity() ? "allianceWeekEndViewCuontDown" : "acLaborDaytime-1";
            view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        }
    };
    AcDragonBoatDayView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, this.update, this);
        var view = this;
        view._activityDescText = view._activityTimerText = null;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        this._bottomBg7 = null;
        view._timeCountTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayView;
}(AcCommonView));
__reflect(AcDragonBoatDayView.prototype, "AcDragonBoatDayView");
//# sourceMappingURL=AcDragonBoatDayView.js.map