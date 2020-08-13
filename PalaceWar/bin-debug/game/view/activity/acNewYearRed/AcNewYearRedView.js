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
author : qinajun
*/
var AcNewYearRedView = (function (_super) {
    __extends(AcNewYearRedView, _super);
    function AcNewYearRedView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._redGroup = null;
        _this._progressBar = null;
        _this._bubble = null;
        _this._jinduTxt = null;
        _this._stop = false;
        _this._proLight = null;
        _this._idx = 1;
        _this.lihuaCfg = {
            1: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450, x: -102, y: 80, scale: 1 },
            2: { color: "blue", framenum: 11, firenum: 10, width: 450, height: 450, x: 101, y: 158, scale: 1 },
            3: { color: "green", framenum: 11, firenum: 10, width: 400, height: 400, x: 292, y: -14, scale: 1 },
            4: { color: "red", framenum: 10, firenum: 10, width: 500, height: 500, x: -18, y: 203, scale: 1 },
            5: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450, x: 162, y: 288, scale: 1 },
            6: { color: "green", framenum: 11, firenum: 10, width: 400, height: 400, x: 42, y: 0, scale: 1 },
            7: { color: "blue", framenum: 11, firenum: 10, width: 450, height: 450, x: 415, y: 125, scale: 1 },
            8: { color: "red", framenum: 10, firenum: 10, width: 500, height: 500, x: 308, y: 203, scale: 1 },
            9: { color: "purple", framenum: 12, firenum: 10, width: 450, height: 450, x: -74, y: 371, scale: 1 },
        };
        return _this;
    }
    Object.defineProperty(AcNewYearRedView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearRedView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearRedView.prototype.getBgName = function () {
        return this.getResByCode("newyearredbg");
    };
    AcNewYearRedView.prototype.initBg = function () {
        var bgtop = BaseBitmap.create(this.getResByCode("newyearredbg2"));
        this.addChild(bgtop);
        var bgtop2 = BaseBitmap.create(this.getResByCode("newyearredbg2"));
        this.addChild(bgtop2);
        _super.prototype.initBg.call(this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bgtop, this.viewBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bgtop2, bgtop, [bgtop.width - 5, 0]);
        egret.Tween.get(bgtop, { loop: true }).
            to({ x: -bgtop.width }, bgtop.width * 300).
            to({ x: bgtop.width - 10 }, 1).
            to({ x: 0 }, (bgtop.width - 10) * 300);
        egret.Tween.get(bgtop2, { loop: true }).
            to({ x: -bgtop2.width }, (2 * bgtop.width - 10) * 300).
            to({ x: bgtop2.width - 10 }, 1);
    };
    AcNewYearRedView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 3:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcNewYearRedView.prototype.getContainerY = function () {
        return 88;
    };
    AcNewYearRedView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcNewYearRedView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        var arr = ["newyearred-" + code, "acwealthcarpview_skineffect1", "acthrowstone_common_wife_txt", "newyearredbg2-1", "newyearredbg-1", "progress10", "progress10_bg", "wife_doublefly_namebg", "wifeview_namebg", "acwealthcarpview_servantskintxt", "newyearred-1"
        ];
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcNewYearRedView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("AcNewYearRedRuleInfo", this.code);
    };
    AcNewYearRedView.prototype.getTitleStr = function () {
        return null;
    };
    AcNewYearRedView.prototype.getTitleBgName = function () {
        return "newyearredtitle-" + this.code;
    };
    Object.defineProperty(AcNewYearRedView.prototype, "progressOffX", {
        get: function () {
            if (this.getUiCode() == "2") {
                return 160;
            }
            return 140;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearRedView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view.height = GameConfig.stageHeigth;
        view.width = GameConfig.stageWidth;
        view.container.height = view.height - this.getContainerY();
        var code = view.getUiCode();
        var zshi = BaseBitmap.create(this.getResByCode("newyearredtop"));
        view.addChildToContainer(zshi);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, view.container, [0, 0], true);
        var bottombg = BaseBitmap.create(this.getResByCode("newyearreddescbg"));
        // view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0, 0], true);
        var zshi2 = BaseBitmap.create(this.getResByCode("newyearredtop"));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi2, bottombg, [0, -zshi2.height]);
        var chargebtn = ComponentManager.getButton(view.getResByCode("newyearredrecharge"), '', function () {
            if (!_this.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }, view);
        // view.addChildToContainer(chargebtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, chargebtn, zshi2, [25, -chargebtn.height - 10]);
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true, String(0xffffff)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, bottombg, [15, 10]);
        // view.addChildToContainer(timeTxt);
        var tipTxtStr = LanguageManager.getlocal(this.getCnByCode("AcNewYearRedTip1"), [view.cfg.getCoreRewardGemNum().toString()]);
        if (view.getUiCode() == "2") {
            zshi2.visible = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, chargebtn, bottombg, [25, -chargebtn.height + 40]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, bottombg, [15, 153]);
            var specialData_1 = view.vo.getSpecailShowData();
            tipTxtStr = LanguageManager.getlocal(this.getCnByCode("AcNewYearRedTip1"), ["" + specialData_1.needNum]);
        }
        var tipTxt = ComponentManager.getTextField(tipTxtStr, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 590;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 5]);
        // view.addChildToContainer(tipTxt);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        timebg.y = (bottombg.y - 14);
        if (view.getUiCode() == "2") {
            timebg.y = bottombg.y + 115;
        }
        view._timebg = timebg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y + 6;
        timebg.width = tip2Text.width + 50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x + (timebg.width - tip2Text.width) * 0.5;
        var wifeCfg = null;
        if (view.getUiCode() == "1" || view.getUiCode() == "3") {
            wifeCfg = Config.WifeCfg.getWifeCfgById(view.cfg.coreReward);
        }
        else if (view.getUiCode() == "2") {
            wifeCfg = Config.WifeskinCfg.getWifeCfgById(view.cfg.coreReward);
        }
        var doubleGragon = App.CommonUtil.getDoubleGragon(view.cfg.coreReward);
        var boneName = undefined;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        //
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && (doubleGragon || RES.hasRes(boneName)) && App.CommonUtil.check_dragon()) {
            if (doubleGragon) {
                doubleGragon.x = 320;
                doubleGragon.y = zshi2.y + 50;
                // doubleGragon.mask = new egret.Rectangle(-354, -800, 914, 820);
                doubleGragon.setScale(0.75);
                view.addChildToContainer(doubleGragon);
                // let nameBg1 = <BaseBitmap>doubleGragon.getChildByName(`nameBg1`)
                // nameBg1.setPosition(-270,-550);
                // let nameBg2 = <BaseBitmap>doubleGragon.getChildByName(`nameBg2`)
                // nameBg2.setPosition(250,-550);
                // let nameTF1 = doubleGragon.getChildByName(`nameTF1`)
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
                // let nameTF2 = doubleGragon.getChildByName(`nameTF2`)
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
            }
            else {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = 302;
                droWifeIcon.y = zshi2.y - 500;
                if (view.getUiCode() == "2") {
                    droWifeIcon.y = bottombg.y + 90;
                }
                droWifeIcon.mask = new egret.Rectangle(-354, -800, 914, 820);
                droWifeIcon.setScale(0.75);
                view.addChildToContainer(droWifeIcon);
            }
        }
        else {
            var wifeImg = BaseLoadBitmap.create(wifeCfg.body); //
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.setScale(0.52);
            view.addChildToContainer(wifeImg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wifeImg, zshi2, [0, zshi2.height]);
            if (view.getUiCode() == "2") {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wifeImg, bottombg, [0, 210]);
            }
        }
        if (doubleGragon) {
            var ishorizon = false;
            if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp()) {
                ishorizon = true;
            }
            var nameres = ishorizon ? "wife_doublefly_namebg" : "public_infobg2";
            var nameBg1 = BaseBitmap.create(nameres);
            view.addChildToContainer(nameBg1);
            var nameBg2 = BaseBitmap.create(nameres);
            view.addChildToContainer(nameBg2);
            var nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            view.addChildToContainer(nameTF1);
            var nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            view.addChildToContainer(nameTF2);
            if (ishorizon) {
                nameBg1.setScale(0.75);
                nameBg2.setScale(0.75);
                nameTF1.setScale(0.75);
                nameTF2.setScale(0.75);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, nameBg1, zshi2, [180, zshi2.height - 3]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, nameBg2, zshi2, [330, zshi2.height - 3]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
            }
            else {
                nameBg1.setPosition(50, zshi2.y - 300);
                nameBg2.setPosition(470, zshi2.y - 400);
                nameTF1.width = 27;
                nameTF2.width = 27;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1, [5, -5]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2, [5, -5]);
            }
        }
        view.addChildToContainer(bottombg);
        view.addChildToContainer(zshi2);
        view.addChildToContainer(chargebtn);
        view.addChildToContainer(timeTxt);
        view.addChildToContainer(tipTxt);
        view.addChildToContainer(timebg);
        view.addChildToContainer(tip2Text);
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxtEffect, zshi2, [0, -120]);
        var skinTxtImg = "acthrowstone_common_wife_txt";
        if (view.getUiCode() == "2") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxtEffect, bottombg, [0, -90]);
            skinTxtImg = "acwealthcarpview_servantskintxt";
        }
        var skinTxt = BaseBitmap.create(skinTxtImg);
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect, [0, 0]);
        var skinTxteffect = BaseBitmap.create(skinTxtImg);
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect, [0, 0]);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect, [0, 0]);
        view.addChildToContainer(touchPos);
        touchPos.addTouchTap(function () {
            var data = null;
            if (view.getUiCode() == "1") {
                var cfg = Config.WifeCfg.getWifeCfgById(_this.cfg.coreReward);
                var needstr = LanguageManager.getlocal("AcNewYearRedTip3-1", [_this.cfg.getCoreRewardGemNum().toString(), cfg.name]);
                var wifId = Config.WifeCfg.formatRewardItemVoStr(_this.cfg.coreReward);
                data = { data: [
                        { idType: wifId, topMsg: needstr, bgName: "", scale: 0.8, title: "", offY: 120 },
                    ], showType: "" };
            }
            else if (view.getUiCode() == "2") {
                var cfg = Config.WifeskinCfg.getWifeCfgById(_this.cfg.coreReward);
                var specialData_2 = view.vo.getSpecailShowData();
                var needstr = LanguageManager.getlocal("AcNewYearRedTip3-2", [specialData_2.needNum.toString(), cfg.name]);
                var wifId = Config.WifeskinCfg.formatRewardItemVoStr(_this.cfg.coreReward);
                data = { data: [
                        { idType: wifId, topMsg: needstr, bgName: "", scale: 0.6, title: "", offY: 0 },
                    ], showType: "" };
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, ViewController);
        var group = new BaseDisplayObjectContainer();
        var width = view.progressOffX * (Number(Object.keys(this.cfg.recharge).length)) - 40;
        if (view.getUiCode() == "2") {
            width = view.progressOffX * (Number(Object.keys(this.cfg.recharge).length)) - 50;
        }
        var progressbar = ComponentManager.getProgressBar("newyearredprogress-" + code, "newyearredprogressbg-" + code, width);
        progressbar.x = 50;
        group.addChild(progressbar);
        view._redGroup = group;
        view._progressBar = progressbar;
        var scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, GameConfig.stageWidth, 305));
        view.addChildToContainer(scrollview);
        scrollview.bounces = false;
        scrollview.horizontalScrollPolicy = 'on';
        scrollview.verticalScrollPolicy = 'off';
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, zshi, [0, 55]);
        if (view.getUiCode() == "2") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, zshi, [0, 25]);
        }
        var curId = 1;
        var _loop_1 = function (i) {
            var unit = view.cfg.recharge[i];
            var unitgroup = new BaseDisplayObjectContainer();
            unitgroup.name = "group" + i;
            group.addChild(unitgroup);
            unitgroup.x = progressbar.x + 90 + (Number(i) - 1) * view.progressOffX;
            if (view.getUiCode() == "2") {
                unitgroup.x = progressbar.x + 110 + (Number(i) - 1) * view.progressOffX;
            }
            unitgroup.y = progressbar.y + progressbar.height;
            unitgroup.mask = new egret.Rectangle(-60, 0, 220, unit.show ? 300 : 220);
            var line = BaseBitmap.create(this_1.getResByCode("newyearredline"));
            unitgroup.addChild(line);
            var red = ComponentManager.getButton(this_1.getResByCode("newyearredbag" + (unit.show ? 2 : 1)), '', function () {
                ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARREDRECHARGEVIEW, {
                    code: view.code,
                    aid: view.aid,
                    id: unit.id
                });
            }, view);
            unitgroup.addChild(red);
            red.name = "red" + i;
            if (view.getUiCode() == "1") {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, unitgroup, [0, unit.show ? 0 : -95], true);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, red, line, [0, unit.show ? 80 : 45]);
            }
            else if (view.getUiCode() == "2") {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, unitgroup, [0, 5], true);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, red, line, [0, 70]);
            }
            if (view.getUiCode() == "1") {
                if (unit.show) {
                    var fu = BaseBitmap.create(this_1.getResByCode("newyearredfu"));
                    unitgroup.addChild(fu);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fu, red, [0, red.height + 15]);
                }
            }
            var txt = ComponentManager.getTextField(LanguageManager.getlocal(this_1.getCnByCode("AcNewYearRedTip2"), [unit.needGem.toString()]), 20);
            unitgroup.addChild(txt);
            txt.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [unit.show ? -5 : 0, 15]);
            if (view.getUiCode() == "2") {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [0, 0]);
            }
            txt.name = "txt" + i;
            if (0) {
                if (view.vo.getChargeNum() >= unit.needGem && curId == 1 && !view.vo.isGetRecharge(unit.id)) {
                    curId = unit.id;
                }
            }
            else {
                if (view.vo.getChargeNum() >= unit.needGem) {
                    curId = unit.id;
                }
            }
            var wifeicon = null;
            if (view.getUiCode() == "1") {
                if (view.cfg.getCoreRewardGemIdx() == Number(i)) {
                    var wifecfg = Config.WifeCfg.getWifeCfgById(view.cfg.coreReward);
                    wifeicon = BaseLoadBitmap.create(wifecfg.icon); //
                    wifeicon.width = 205;
                    wifeicon.height = 196;
                    wifeicon.setScale(0.5);
                    wifeicon.setPosition(7, 105);
                    unitgroup.addChildAt(wifeicon, 3);
                    wifeicon.alpha = 0.2;
                    // egret.Tween.get(wifeicon,{loop:true}).to({alpha : 0.6}, 1500).to({alpha : 0.2}, 1500);
                }
            }
            else if (view.getUiCode() == "2") {
                var specialData_3 = view.vo.getSpecailShowData();
                if (specialData_3.index && specialData_3.index == Number(i)) {
                    var skinCfg = Config.WifeskinCfg.getWifeCfgById(view.cfg.coreReward);
                    wifeicon = BaseLoadBitmap.create(skinCfg.icon); //
                    wifeicon.width = 205;
                    wifeicon.height = 196;
                    var iconMask = new egret.Rectangle(0, 0, 160, 132);
                    wifeicon.mask = iconMask;
                    wifeicon.setScale(0.5);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wifeicon, red, [0, 30]);
                    unitgroup.addChildAt(wifeicon, 3);
                    wifeicon.alpha = 0.2;
                    // egret.Tween.get(wifeicon,{loop:true}).to({alpha : 0.6}, 1500).to({alpha : 0.2}, 1500);
                }
            }
            if (wifeicon) {
                egret.Tween.get(wifeicon, { loop: true }).to({ alpha: 0.6 }, 1500).to({ alpha: 0.2 }, 1500);
            }
            unitgroup.anchorOffsetX = unitgroup.width / 2;
            var randomT = 800 + Math.floor(Math.random() * 1000);
            var randomR = 3.5 + 2 * Math.random();
            egret.Tween.get(unitgroup, { loop: true })
                .to({ rotation: randomR }, randomT, egret.Ease.quadOut)
                .to({ rotation: -randomR }, randomT * 2, egret.Ease.quadInOut)
                .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
        };
        var this_1 = this;
        for (var i in view.cfg.recharge) {
            _loop_1(i);
        }
        var alpha = BaseBitmap.create("public_alpha");
        alpha.width = group.width;
        alpha.height = group.height;
        group.addChild(alpha);
        var bubble = BaseBitmap.create(this.getResByCode("newyearredbubble"));
        bubble.anchorOffsetX = bubble.width / 2;
        view._bubble = bubble;
        group.addChild(bubble);
        var jinduTxt = ComponentManager.getTextField("", 20);
        group.addChild(jinduTxt);
        view._jinduTxt = jinduTxt;
        if (view.getUiCode() == "2") {
            var proLight = BaseBitmap.create(this.getResByCode("newyearredprogresslight"));
            group.addChild(proLight);
            view._proLight = proLight;
            proLight.anchorOffsetX = proLight.width;
            proLight.anchorOffsetY = proLight.height / 2;
            var proMaskLeft = BaseBitmap.create(this.getResByCode("newyearredprogressmask"));
            proMaskLeft.setPosition(zshi.x, zshi.y + 9);
            view.addChildToContainer(proMaskLeft);
            var proMaskRight = BaseBitmap.create(this.getResByCode("newyearredprogressmask"));
            proMaskRight.scaleX = -1;
            proMaskRight.setPosition(GameConfig.stageWidth, zshi.y + 9);
            view.addChildToContainer(proMaskRight);
        }
        view.update();
        var corNeedGem = view.cfg.getCoreRewardGemNum();
        var stX = 90;
        var specialData = this.vo.getSpecailShowData();
        if (view.getUiCode() == "2") {
            stX = 110;
            corNeedGem = specialData.needNum;
        }
        if (view.vo.getChargeNum() >= corNeedGem) {
            scrollview.scrollLeft = Math.min(Math.max(0, stX + (curId - 3) * view.progressOffX), group.width - scrollview.width);
        }
        else {
            var posX = 0;
            var coreid = view.cfg.getCoreRewardGemIdx();
            if (view.getUiCode() == "2") {
                // let specialData = this.vo.getSpecailShowData();
                if (specialData.index) {
                    coreid = specialData.index;
                }
            }
            posX = Math.min(Math.max(0, stX + (curId - 3) * view.progressOffX), group.width - scrollview.width);
            scrollview.scrollLeft = stX + (coreid - 2) * view.progressOffX;
            view._stop = true;
            egret.Tween.get(scrollview).wait(1000).to({ scrollLeft: posX }, (scrollview.scrollLeft - posX) / 2).call(function () {
                egret.Tween.removeTweens(scrollview);
                view._stop = false;
            }, view);
        }
        this.showlihua();
    };
    AcNewYearRedView.prototype.showlihua = function () {
        var _this = this;
        var view = this;
        //for(let i in this.lihuaCfg){
        var cfg = this.lihuaCfg[this._idx];
        var fireeff = ComponentManager.getCustomMovieClip("newyearlihua" + cfg.color + "fire", cfg.firenum, 70);
        fireeff.width = 150;
        fireeff.height = 500;
        fireeff.playWithTime(1);
        this.container.addChildAt(fireeff, 1);
        fireeff.setEndCallBack(function () {
            fireeff.dispose();
            fireeff = null;
        }, view);
        var lihua = ComponentManager.getCustomMovieClip("newyearlihua" + cfg.color, cfg.framenum, 70);
        lihua.width = cfg.width;
        lihua.height = cfg.height;
        this.container.addChildAt(lihua, 1);
        lihua.setEndCallBack(function () {
            lihua.dispose();
            lihua = null;
        }, view);
        lihua.setPosition(cfg.x, cfg.y);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fireeff, lihua, [0, 200]);
        egret.Tween.get(lihua).wait((cfg.firenum - 3) * 70).call(function () {
            lihua.playWithTime(1);
            ++_this._idx;
            if (_this._idx == 10) {
                _this._idx = 1;
            }
            view.showlihua();
            egret.Tween.removeTweens(lihua);
        }, view);
        //}
    };
    AcNewYearRedView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x + (view._timebg.width - view._timeCountTxt.width) * 0.5;
    };
    AcNewYearRedView.prototype.update = function () {
        var view = this;
        var redgroup = view._redGroup;
        var jindu = 0;
        for (var i in view.cfg.recharge) {
            var unit = view.cfg.recharge[i];
            var unitgroup = redgroup.getChildByName("group" + i);
            var red = unitgroup.getChildByName("red" + i);
            var txt = unitgroup.getChildByName("txt" + i);
            var eff = unitgroup.getChildByName("eff" + i);
            if (view.vo.isGetRecharge(unit.id)) {
                jindu = unit.id;
                if (eff) {
                    eff.dispose();
                    eff = null;
                }
                txt.text = LanguageManager.getlocal("candyGetAlready");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [unit.show ? -5 : 0, 15]);
                if (view.getUiCode() == "2") {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, red, [0, 0]);
                }
            }
            else {
                if (view.vo.getChargeNum() >= unit.needGem) {
                    if (!eff) {
                        var eff_1 = ComponentManager.getCustomMovieClip("newyearredeff", 10);
                        eff_1.name = "eff" + i;
                        unitgroup.addChild(eff_1);
                        eff_1.playWithTime(-1);
                        eff_1.x = -50;
                        eff_1.y = unit.show ? 40 : -10;
                        eff_1.blendMode = egret.BlendMode.ADD;
                        if (view.getUiCode() == "2") {
                            eff_1.x = -32;
                            eff_1.y = 25; //40
                        }
                    }
                    jindu = unit.id;
                }
                else {
                    if (eff) {
                        eff.dispose();
                        eff = null;
                    }
                }
            }
        }
        var cur = 0;
        if (jindu == 0) {
            cur = 0;
        }
        else if (jindu == Object.keys(view.cfg.recharge).length) {
            cur = view._progressBar.width;
        }
        else {
            var stX = 90;
            if (view.getUiCode() == "2") {
                stX = 110;
            }
            var curcfg = view.cfg.recharge[jindu];
            var nextcfg = view.cfg.recharge[jindu + 1];
            cur = (jindu - 1) * view.progressOffX + stX + (view.vo.getChargeNum() - curcfg.needGem) / ((nextcfg.needGem - curcfg.needGem) / view.progressOffX);
        }
        var per = cur / view._progressBar.width; //view.vo.getChargeNum() / (view.cfg.recharge[Object.keys(view.cfg.recharge).length].needGem);
        view._progressBar.setPercentage(per);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._bubble, view._progressBar, [view._progressBar.width * per-view._bubble.anchorOffsetX, view._progressBar.height]);
        view._bubble.x = view._progressBar.x + view._progressBar.width * per;
        view._bubble.y = view._progressBar.y + view._progressBar.height;
        if (view._proLight) {
            view._proLight.setPosition(view._bubble.x + 8, view._progressBar.y + view._progressBar.height / 2);
        }
        view._jinduTxt.text = view.vo.getChargeNum().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._jinduTxt, view._bubble);
        if (view.getUiCode() == "2") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._jinduTxt, view._bubble, [0, 9]);
        }
    };
    AcNewYearRedView.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcNewYearRedView.prototype.dispose = function () {
        var view = this;
        view._timeCountTxt = null;
        view._timebg = null;
        view._redGroup = null;
        view._progressBar = null;
        view._bubble = null;
        view._jinduTxt = null;
        view._stop = false;
        view._proLight = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return AcNewYearRedView;
}(AcCommonView));
__reflect(AcNewYearRedView.prototype, "AcNewYearRedView");
//# sourceMappingURL=AcNewYearRedView.js.map