/*
    author : shaoliang
    desc : 京城夜赏
    date : 2019.12.9
*/
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
var AcAnnualCelebration2020View = (function (_super) {
    __extends(AcAnnualCelebration2020View, _super);
    function AcAnnualCelebration2020View() {
        var _this = _super.call(this) || this;
        _this._cdText = null;
        _this._bgGroup = null;
        _this._noticescrollView = null;
        _this._checkFlag1 = null;
        _this._checkFlag2 = null;
        _this._throwType = 0; //0 单抽  1十连抽 2 如意抽
        _this._numTF = null;
        _this._diceBtn = null;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        _this._boxInfoList = [];
        _this._circleText = null;
        _this._rewardBtn = null;
        _this._rewardScrollView = null;
        _this._prevRoundReward = '';
        _this._rewardGroup = null;
        _this._carGroup = null;
        _this._car = null;
        _this._carTip = null;
        _this._stopPlay = false;
        _this._stopClick = null;
        // private _checkBox : CheckBox = null;
        _this._oneKeySearchStatus = false;
        _this._isAIDice = false;
        _this._isPlay = false;
        _this._aiReddot = null;
        _this._aidicename = null;
        _this.mapLightOffset = {
            1: { x: -38, y: -25 },
            4: { x: -36, y: -30 },
            7: { x: -28, y: -42 },
            10: { x: -23, y: -26 },
            13: { x: -46, y: -70 },
            16: { x: -36, y: -36 },
            19: { x: -36, y: -26 },
            22: { x: -45, y: -30 },
        };
        _this.mapPos = {
            1: { x: 52, y: 568, width: 180, height: 116, n: "citynpcbookroomname", np: [212, 544], np2: [92, 549] },
            2: { x: 288, y: 562, width: 54, height: 54 },
            3: { x: 358, y: 513, width: 54, height: 54 },
            4: { x: 143, y: 370, width: 180, height: 116, n: "citynpcpalacename", np: [323, 402], np2: [190, 423] },
            5: { x: 417, y: 410, width: 54, height: 54 },
            6: { x: 532, y: 421, width: 54, height: 54 },
            7: { x: 527, y: 479, width: 180, height: 116, n: "citynpcatkracename", np: [624, 443], np2: [544, 471] },
            8: { x: 687, y: 477, width: 54, height: 54 },
            9: { x: 755, y: 438, width: 54, height: 54 },
            10: { x: 815, y: 375, width: 54, height: 54, n: "citynpcsearchname", np: [880, 387], np2: [778, 410] },
            11: { x: 963, y: 481, width: 54, height: 54 },
            12: { x: 900, y: 518, width: 54, height: 54 },
            13: { x: 993, y: 559, width: 54, height: 54, n: "citynpcstudyatkname", np: [1150, 553], np2: [1052, 542] },
            14: { x: 1197, y: 706, width: 54, height: 54 },
            15: { x: 1111, y: 745, width: 54, height: 54 },
            16: { x: 902, y: 741, width: 236, height: 132, n: "citynpcalliancename", np: [1045, 719], np2: [924, 722] },
            17: { x: 802, y: 839, width: 54, height: 54 },
            18: { x: 716, y: 765, width: 54, height: 54 },
            19: { x: 567, y: 640, width: 54, height: 54, n: "citynpcdinnername", np: [697, 615], np2: [560, 620] },
            20: { x: 512, y: 742, width: 54, height: 54 },
            21: { x: 537, y: 862, width: 54, height: 54 },
            22: { x: 324, y: 790, width: 54, height: 54, n: "citynpcrankname", np: [461, 760], np2: [326, 772] },
            23: { x: 212, y: 788, width: 188, height: 124 },
            24: { x: 169, y: 696, width: 54, height: 54 },
        };
        _this._rewardData = null;
        return _this;
    }
    Object.defineProperty(AcAnnualCelebration2020View.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020View.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020View.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020View.prototype, "uicode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020View.prototype.getTitleStr = function () {
        return null;
    };
    // 标题背景名称
    AcAnnualCelebration2020View.prototype.getTitleBgName = function () {
        return null;
    };
    AcAnnualCelebration2020View.prototype.getRuleInfo = function () {
        return "acAC2020Rule-" + this.uicode;
    };
    AcAnnualCelebration2020View.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        var code = this.uicode;
        ret = ret.concat([
            "annualcelebration_title-1", "annualcelebration_descbg-1", "acwealthcarpview_skineffect1", "acwealthcarpview", "acliangbiographyview_common_acbg",
            "acannualcelebration-1", "annualcelebration_bigbg", "hold_dinner_box", "annualcelebration_bottombg-1", "acannualcelebration_aidice3",
            "treasureboxicon-1", "annualcelebration_rewardbg-1", "treasurereward-1", "acenjoynight1",
            "enjoynightcarbg-" + code, "enjoynightcar1-", "treasuregquan-1", "treasuregquan1-",
            "treasurecarmove1-", "treasurecarscale-1", "acnationalday_common_rewardtxt",
        ]);
        return ret;
    };
    AcAnnualCelebration2020View.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL), view.playBoxCallback, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.uicode;
        var titleBg = BaseBitmap.create("annualcelebration_title-1");
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);
        var acDescBg = BaseBitmap.create("annualcelebration_descbg-1");
        acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        this.addChildToContainer(titleBg);
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(acDescBg.x + 103 - skinTxtEffectBM.width / 2, acDescBg.y + 120 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(acDescBg.x + 103, acDescBg.y + 120);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(acDescBg.x + 103, acDescBg.y + 120);
        this.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(acDescBg.x, acDescBg.y);
        view.addChild(touchPos);
        touchPos.addTouchTap(function () {
            if (_this._stopClick) {
                return;
            }
            if (_this._isPlay) {
                return;
            }
            var needstr = LanguageManager.getlocal("acAC2020_need_circle", [String(_this.cfg.getSkinNeedCircle())]);
            var wifId = Config.WifeCfg.formatRewardItemVoStr(_this.cfg.show);
            var data = { data: [
                    { idType: wifId, topMsg: needstr, bgName: "", scale: 0.8, title: "", offY: 120 },
                ], showType: "" };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, this);
        var vo = this.vo;
        //活动时间
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-" + code, [vo.acTimeAndHour]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTF.width = 466;
        timeTF.setPosition(175, acDescBg.y + 8);
        this.addChildToContainer(timeTF);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acAnnualCelebration2020Desc-" + code), 18, TextFieldConst.COLOR_WHITE);
        descTF.width = 465;
        descTF.lineSpacing = 4;
        descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 8);
        this.addChildToContainer(descTF);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2 - 6;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewCountDownTime-" + code, [vo.acCountDownNoExtra]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        //领奖
        var bottomBg = BaseBitmap.create("annualcelebration_rewardbg-1");
        bottomBg.y = 234;
        view.addChild(bottomBg);
        var roundbottomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureRoundReward-" + code, [(view.vo.getCircleNum() + 1).toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        roundbottomTxt.lineSpacing = 5;
        roundbottomTxt.textAlign = egret.HorizontalAlign.CENTER;
        view._circleText = roundbottomTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, roundbottomTxt, bottomBg, [10, 0]);
        view.addChild(roundbottomTxt);
        var rewardbtn = ComponentManager.getButton("treasurereward-1", '', function () {
            if (_this._stopClick) {
                return;
            }
            if (_this._isPlay) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACANNUALCELEBRATION2020REWARDVIEW, {
                aid: _this.aid,
                code: _this.code,
                uicode: _this.uicode,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardbtn, bottomBg);
        view.addChild(rewardbtn);
        view._rewardBtn = rewardbtn;
        //奖励
        var rewardgroup = new BaseDisplayObjectContainer();
        rewardgroup.height = 90;
        view.addChild(rewardgroup);
        view._rewardGroup = rewardgroup;
        var rewardStr = view.vo.getCurRoundReward();
        var rewardArr = GameData.getRewardItemIcons(rewardStr, true, false);
        var tmpX = (455 - rewardArr.length * 80 - (rewardArr.length - 1) * 5) / 2;
        if (rewardArr.length > 5) {
            tmpX = 5;
        }
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            icon.setScale(80 / 108);
            icon.x = tmpX + 85 * Number(i);
            icon.y = 5;
            rewardgroup.addChild(icon);
        }
        var rect = new egret.Rectangle(0, 0, 455, 90);
        var noticescrollView = ComponentManager.getScrollView(rewardgroup, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noticescrollView, bottomBg);
        view.addChild(noticescrollView);
        view._prevRoundReward = rewardStr;
        //底部
        var buttombg = BaseBitmap.create("annualcelebration_bottombg-1");
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
        view.addChild(buttombg);
        var diceBtn = ComponentManager.getButton("treasureboxicon-1", null, this.diceBtnClick, this, null, 1);
        diceBtn.setPosition(GameConfig.stageWidth / 2 - diceBtn.width / 2, buttombg.y + 10);
        view.addChild(diceBtn);
        this._diceBtn = diceBtn;
        var dicetext = BaseBitmap.create("acannualcelebration_dicetext-1");
        dicetext.setPosition(GameConfig.stageWidth / 2 - dicetext.width / 2, buttombg.y + 110);
        view.addChild(dicetext);
        //十连骰子
        var tenDiceIcon = BaseBitmap.create("acannualcelebration_tendice-1");
        tenDiceIcon.setPosition(116, buttombg.y + 62);
        view.addChild(tenDiceIcon);
        var probg1 = BaseBitmap.create("hold_dinner_box");
        probg1.x = 79;
        probg1.y = buttombg.y + 115;
        this.addChild(probg1);
        probg1.addTouchTap(this.tenThrowCheckHandle, this);
        var name1 = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_throw_ten", [String(vo.getAIDiceNum())]), 20, TextFieldConst.COLOR_WHITE);
        name1.setPosition(probg1.x + probg1.width + 8, probg1.y + probg1.height / 2 - name1.height / 2);
        this.addChild(name1);
        var checkFlag1 = BaseLoadBitmap.create("hold_dinner_check");
        checkFlag1.width = checkFlag1.height = 38;
        checkFlag1.setPosition(probg1.x, probg1.y);
        this.addChild(checkFlag1);
        checkFlag1.visible = false;
        this._checkFlag1 = checkFlag1;
        //如意骰子
        var AIDiceIcon = BaseBitmap.create("acannualcelebration_aidice-1");
        AIDiceIcon.setPosition(500, buttombg.y + 64);
        view.addChild(AIDiceIcon);
        var probg2 = BaseBitmap.create("hold_dinner_box");
        probg2.x = 458;
        probg2.y = buttombg.y + 115;
        this.addChild(probg2);
        probg2.addTouchTap(this.aiThrowCheckHandle, this);
        var name2 = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_ai_throw_num"), 20, TextFieldConst.COLOR_WHITE);
        name2.lineSpacing = 5;
        name2.width = 150;
        // name2.textAlign = egret.HorizontalAlign.CENTER;
        name2.setPosition(probg2.x + probg2.width + 8, probg2.y + probg2.height / 2 - name2.height / 2);
        this.addChild(name2);
        this._aidicename = name2;
        var checkFlag2 = BaseLoadBitmap.create("hold_dinner_check");
        checkFlag2.width = checkFlag2.height = 38;
        checkFlag2.setPosition(probg2.x, probg2.y);
        this.addChild(checkFlag2);
        checkFlag2.visible = false;
        this._checkFlag2 = checkFlag2;
        this._aiReddot = BaseBitmap.create("public_dot2");
        this._aiReddot.setPosition(probg2.x, probg2.y);
        this.addChild(this._aiReddot);
        this.setLayoutPosition(LayoutConst.righttop, this._aiReddot, probg2, [-10, -10]);
        this._aiReddot.visible = false;
        this._numTF = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_WHITE);
        this._numTF.width = 250;
        this._numTF.textAlign = egret.HorizontalAlign.CENTER;
        this._numTF.setPosition(GameConfig.stageWidth / 2 - this._numTF.width / 2, buttombg.y + 140);
        this.addChild(this._numTF);
        this.update();
        view._carGroup = new BaseDisplayObjectContainer();
        view._carGroup.width = GameConfig.stageWidth;
        view._carGroup.height = GameConfig.stageHeigth; // - 80 - 119 - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carGroup, view);
        view._carGroup.addTouchTap(function () {
            view._stopPlay = true;
            view.moveCar();
            view._carGroup.removeChildren();
        }, view);
        var car = BaseBitmap.create("enjoynightcar-1");
        view._bgGroup.addChild(car);
        view._car = car;
        // let carTip = BaseBitmap.create(`enjoynightcartip-1`);
        var carTip = ComponentManager.getCustomMovieClip("acac2020_arrow_effect", 11);
        view._bgGroup.addChild(carTip);
        carTip.playWithTime();
        carTip.width = 154;
        carTip.height = 200;
        view._carTip = carTip;
        // egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
        view.moveCar(false);
        view.addChild(view._carGroup);
        this.tick();
    };
    AcAnnualCelebration2020View.prototype.tenThrowCheckHandle = function () {
        if (this._throwType == 1) {
            this._checkFlag1.visible = false;
            this._throwType = 0;
        }
        else {
            this._checkFlag1.visible = true;
            this._checkFlag2.visible = false;
            this._throwType = 1;
        }
        this._diceBtn.setBtnBitMap("treasureboxicon-1");
        this.update();
    };
    AcAnnualCelebration2020View.prototype.aiThrowCheckHandle = function () {
        if (this._throwType == 2) {
            this._checkFlag2.visible = false;
            this._throwType = 0;
            this._diceBtn.setBtnBitMap("treasureboxicon-1");
        }
        else {
            this._checkFlag2.visible = true;
            this._checkFlag1.visible = false;
            this._throwType = 2;
            this._diceBtn.setBtnBitMap("acannualcelebration_aidice3");
        }
        this.update();
    };
    AcAnnualCelebration2020View.prototype.freshView = function () {
        var view = this;
        var code = view.code;
        this.update();
    };
    AcAnnualCelebration2020View.prototype.initBg = function () {
        var _this = this;
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
        var bgName = "annualcelebration_bigbg";
        if (bgName) {
            var rect6 = new egret.Rectangle(0, 0, 1280, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect6);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            // this.viewBg.y += 60;
            var bggroup = new BaseDisplayObjectContainer();
            bggroup.width = this.viewBg.width;
            bggroup.height = 1136; //GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.viewBg, bggroup, [0,0], true);
            bggroup.addChild(this.viewBg);
            var _loop_1 = function (i) {
                var unit = this_1.cfg.map[i];
                var picName = "acenjoynight_b_common";
                if (unit.buildingType) {
                    picName = "acannualcelebration_b_" + unit.buildingType;
                }
                var posCfg = this_1.mapPos[unit.pointID];
                var mask1 = BaseBitmap.create(picName);
                mask1.x = posCfg.x;
                mask1.y = this_1.viewBg.y + posCfg.y;
                mask1.setScale(4);
                var touchT = mask1;
                if (unit.buildingType) {
                    mask1.setScale(1);
                    if (this_1.mapLightOffset[unit.pointID]) {
                        var offset = this_1.mapLightOffset[unit.pointID];
                        mask1.x = posCfg.x + offset.x;
                        mask1.y = this_1.viewBg.y + posCfg.y + offset.y;
                    }
                    var touchSp = BaseBitmap.create("public_alphabg");
                    touchSp.width = mask1.width / 3 * 2;
                    touchSp.height = mask1.height / 3 * 2;
                    touchSp.x = mask1.x + mask1.width / 6;
                    touchSp.y = mask1.y + mask1.height / 6;
                    bggroup.addChild(touchSp);
                    touchT = touchSp;
                }
                mask1.alpha = 0;
                mask1.name = "item" + unit.pointID;
                touchT.addTouch(function (e) {
                    if (_this._stopClick) {
                        return;
                    }
                    if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                        if (mask1.alpha == 0) {
                            mask1.alpha = 1;
                        }
                        else {
                            mask1.alpha = 0;
                        }
                    }
                    else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
                        mask1.alpha = 0;
                    }
                    if (e.type == egret.TouchEvent.TOUCH_END) {
                        mask1.alpha = 0;
                        var viewName = '';
                        var mapId = "common";
                        var mapname = "common";
                        if (unit.buildingType) {
                            mapId = unit.buildingType;
                            mapname = "taixue";
                        }
                        ViewController.getInstance().openView("AcAC2020Award" + App.StringUtil.firstCharToUper(mapname), {
                            code: _this.code,
                            uicode: _this.uicode,
                            aid: _this.aid,
                            mapId: unit.id,
                            buildingType: mapId
                        });
                    }
                }, this_1, null, true);
                bggroup.addChild(mask1);
                if (posCfg.n) {
                    var name_1 = BaseLoadBitmap.create(posCfg.n);
                    if (PlatformManager.checkIsTextHorizontal()) {
                        name_1.setPosition(posCfg.np2[0], this_1.viewBg.y + posCfg.np2[1]);
                    }
                    else {
                        name_1.setPosition(posCfg.np[0], this_1.viewBg.y + posCfg.np[1]);
                    }
                    bggroup.addChild(name_1);
                }
            };
            var this_1 = this;
            for (var i in this.cfg.map) {
                _loop_1(i);
            }
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 300);
            var noticescrollView = ComponentManager.getScrollView(bggroup, rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            // noticescrollView.verticalScrollPolicy = 'off';
            noticescrollView.y = 220;
            noticescrollView.setShowArrow(false);
            noticescrollView.name = "noticescrollView";
            this.addChild(noticescrollView);
            this._noticescrollView = noticescrollView;
        }
    };
    AcAnnualCelebration2020View.prototype.tick = function () {
        var cfg = this.cfg;
        var vo = this.vo;
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.uicode, [vo.acCountDownNoExtra]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        var view = this;
        if (view.vo.checkCircleRedDot() || view.vo.checkTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
    };
    AcAnnualCelebration2020View.prototype.diceBtnClick = function () {
        if (this._stopClick) {
            return;
        }
        if (this._isPlay) {
            return;
        }
        var view = this;
        if (!view.vo.isInActy()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._throwType == 2) {
            if (view.vo.getAIDiceNum() > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020AIDICEPOPUPVIEW, {
                    aid: view.aid,
                    code: view.code,
                    uicode: view.uicode,
                    confirmCallback: function (idx) {
                        view._stopClick = true;
                        view._isAIDice = true;
                        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL, {
                            activeId: view.acTivityId,
                            chooseNum: idx
                        });
                    },
                    handler: view
                });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            }
            return;
        }
        var neednum = 1;
        var is10 = null;
        if (this._throwType == 1) {
            neednum = 10;
            is10 = 1;
        }
        if (view.vo.getBoxNum() >= neednum) {
            view._stopClick = true;
            view._isAIDice = false;
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL, {
                activeId: view.acTivityId,
                isten: is10
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
    };
    AcAnnualCelebration2020View.prototype.update = function () {
        var vo = this.vo;
        var num = 0;
        if (this._throwType == 2) {
            num = vo.getAIDiceNum();
        }
        else {
            num = vo.getBoxNum();
        }
        this._numTF.text = LanguageManager.getlocal("acTreasureBoxNum-1", [String(num)]);
        this._aiReddot.visible = vo.getAIDiceNum() > 0;
        this._aidicename.text = LanguageManager.getlocal("acAC2020_ai_throw_num", [String(vo.getAIDiceNum())]);
    };
    AcAnnualCelebration2020View.prototype.playBoxCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        view._rewardData = null;
        view._rewardData = data;
        if (evt.data.data.ret < 0) {
            view._stopClick = false;
            App.CommonUtil.showTip(LanguageManager.getlocal('limitedCollectErrorTips'));
            return;
        }
        view._stopPlay = false;
        //刷新奖励
        view._circleText.text = LanguageManager.getlocal("acTreasureRoundReward-1", [(view.vo.getCircleNum() + 1).toString()]);
        var rewardStr = view.vo.getCurRoundReward();
        if (view._prevRoundReward !== rewardStr) {
            view._rewardGroup.removeChildren();
            var rewardArr = GameData.getRewardItemIcons(rewardStr, true, false);
            var tmpX = (455 - rewardArr.length * 80 - (rewardArr.length - 1) * 5) / 2;
            if (rewardArr.length > 5) {
                tmpX = 5;
            }
            for (var i in rewardArr) {
                var icon = rewardArr[i];
                icon.setScale(80 / 108);
                icon.x = tmpX + 85 * Number(i);
                icon.y = 5;
                view._rewardGroup.addChild(icon);
            }
        }
        view._prevRoundReward = rewardStr;
        ViewController.getInstance().openView(ViewConst.BASE.ACAC2020BOXRESULTVIEW, {
            aid: view.aid,
            code: view.code,
            uicode: view.uicode,
            result: data.randNumber,
            skip: view._oneKeySearchStatus,
            aidice: view._isAIDice,
            confirmCallback: function () {
                if (view._oneKeySearchStatus) {
                    view.moveCar(false);
                    view.showBoxEnd();
                }
                else {
                    if (view._carGroup) {
                        view._carGroup.removeChildren();
                    }
                    // view.setChildIndex(view._carGroup, 99999);
                    // let bg = BaseBitmap.create(`public_9_viewmask`);
                    // bg.height = view._carGroup.height;//GameConfig.stageHeigth - 80 - 119 - view.titleBg.height;
                    // bg.width = GameConfig.stageWidth;
                    // view._carGroup.addChild(bg);
                    // let carbg = BaseBitmap.create(`enjoynightcarbg-1`);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, carbg, view._carGroup, [0,0], true);
                    // view._carGroup.addChild(carbg);
                    // let carbg2 = BaseBitmap.create(`enjoynightcarbg-1`);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, carbg2, carbg, [carbg.width,0]);
                    // view._carGroup.addChild(carbg2);
                    // let boatclip = ComponentManager.getCustomMovieClip(`treasurecar1-`,6,100);
                    // boatclip.width = 368;
                    // boatclip.height = 170;
                    // view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, view._carGroup, [0,carbg.y + carbg.height - boatclip.height - 35], true);
                    // view._carGroup.addChild(boatclip); 
                    // boatclip.playWithTime(-1);
                    // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasurecarTip1-1`),22,TextFieldConst.COLOR_BLACK);
                    // view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._carGroup, [0,carbg.y + 20], true);
                    // view._carGroup.addChild(tipTxt); 
                    // let tipBg = BaseBitmap.create(`public_itemtipbg2`);
                    // view._carGroup.addChild(tipBg);
                    // let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasurecarTip2-1`),22);
                    // view._carGroup.addChild(tipTxt2); 
                    // tipBg.width = tipTxt2.textWidth + 60;
                    // view.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view._carGroup, [0,carbg.y + carbg.height + 15], true);
                    // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, tipBg);
                    // egret.Tween.get(carbg,{loop : true}).
                    // to({x : -carbg.width},5000). 
                    // to({x : carbg.width - 10}, 1).
                    // to({x : 0},5000);
                    // egret.Tween.get(carbg2,{loop : true}).
                    // to({x : -carbg2.width}, 10000).
                    // to({x : carbg2.width - 10}, 1);
                    // egret.Tween.get(carbg).wait(1500).call(()=>{
                    //     if(!view._stopPlay){
                    view.moveCar();
                    //
                    view._carGroup.removeChildren();
                    //     }
                    // },view);
                }
            },
            handler: view
        });
    };
    AcAnnualCelebration2020View.prototype.moveCar = function (flag) {
        if (flag === void 0) { flag = true; }
        var view = this;
        //小车位置
        var curMap = view.vo.getCurMapId();
        var item = view._bgGroup.getChildByName("item" + curMap);
        var info = view.mapPos[curMap];
        var curLeft = view._noticescrollView.scrollLeft;
        if (flag) {
            var lamp_1 = ComponentManager.getCustomMovieClip("treasurecarmove1-", 15, 50);
            lamp_1.blendMode = egret.BlendMode.ADD;
            lamp_1.width = 407;
            lamp_1.height = 154;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp_1, view._car);
            lamp_1.playWithTime(1);
            egret.Tween.get(view._car).to({ alpha: 0 }, 230).call(function () {
                view._carTip.alpha = 0;
            }, view);
            lamp_1.setEndCallBack(function () {
                if (lamp_1) {
                    view._bgGroup.removeChild(lamp_1);
                }
                egret.Tween.get(view._car).wait(200).call(function () {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [item.width * item.scaleX / 2 - 15, item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                    var posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                    var left = Math.min(Math.max(0, posX), view.viewBg.width / 2);
                    var posY = view._car.y + view._car.height / 2 - (GameConfig.stageHeigth - 300) / 2 - 220;
                    posY = Math.max(0, posY);
                    var maxY = 1136 - (GameConfig.stageHeigth - 220);
                    var right = Math.min(posY, maxY);
                    egret.Tween.get(view._noticescrollView).to({ scrollLeft: left, scrollTop: right }, 500).wait(500).call(function () {
                        var car1 = BaseBitmap.create("treasurecarscale-1");
                        car1.anchorOffsetX = car1.width / 2;
                        car1.anchorOffsetY = car1.height / 2;
                        car1.setScale(2);
                        view._bgGroup.addChild(car1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car1, view._car, [40, 32.5]);
                        egret.Tween.get(car1).to({ scaleX: 1, scaleY: 1 }, 170).wait(230).call(function () {
                            egret.Tween.removeTweens(car1);
                            view._bgGroup.removeChild(car1);
                        }, view);
                        var car2 = BaseBitmap.create("treasurecarscale-1");
                        car2.alpha = 0.08;
                        car2.anchorOffsetX = car2.width / 2;
                        car2.anchorOffsetY = car2.height / 2;
                        car2.setScale(2);
                        view._bgGroup.addChild(car2);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car2, view._car, [40, 32.5]);
                        egret.Tween.get(car2).wait(130).to({ scaleX: 1, scaleY: 1, alpha: 0.75 }, 170).wait(100).call(function () {
                            egret.Tween.removeTweens(car2);
                            view._bgGroup.removeChild(car2);
                        }, view);
                        var car3 = BaseBitmap.create("treasurecarscale-1");
                        car3.alpha = 0.08;
                        car3.anchorOffsetX = car3.width / 2;
                        car3.anchorOffsetY = car3.height / 2;
                        car3.setScale(2);
                        view._bgGroup.addChild(car3);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car3, view._car, [40, 32.5]);
                        egret.Tween.get(car3).wait(260).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140).call(function () {
                            egret.Tween.removeTweens(car3);
                            view._bgGroup.removeChild(car3);
                        }, view).call(function () {
                            var lamp2 = ComponentManager.getCustomMovieClip("treasurecarmove1-", 15, 50);
                            lamp2.blendMode = egret.BlendMode.ADD;
                            lamp2.width = 407;
                            lamp2.height = 154;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp2, view._car);
                            lamp2.playWithTime(1);
                            view._car.alpha = 1;
                            lamp2.setEndCallBack(function () {
                                if (lamp2) {
                                    egret.Tween.get(lamp2).to({ alpha: 0 }, 200).call(function () {
                                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [10, 100 - view._carTip.height]);
                                        // egret.Tween.removeTweens(view._carTip);
                                        view._carTip.alpha = 1;
                                        //     egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
                                        // },view).wait(200).call(()=>{
                                        egret.Tween.removeTweens(lamp2);
                                        view._bgGroup.removeChild(lamp2);
                                        view.showBoxEnd();
                                    }, view);
                                }
                            }, view);
                            view._bgGroup.addChild(lamp2);
                        }, view);
                        egret.Tween.removeTweens(view._noticescrollView);
                    }, view);
                }, view);
            }, view);
            view._bgGroup.addChild(lamp_1);
        }
        else {
            if (item) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [item.width * item.scaleX / 2 - 15, item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                var posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                var left = Math.min(Math.max(0, posX), view.viewBg.width / 2);
                view._noticescrollView.scrollLeft = left;
                var posY = view._car.y + view._car.height / 2 - (GameConfig.stageHeigth - 300) / 2 - 220;
                posY = Math.max(0, posY);
                var maxY = 1136 - (GameConfig.stageHeigth - 220);
                var right = Math.min(posY, maxY);
                view._noticescrollView.scrollTop = right;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [10, 100 - view._carTip.height]);
                // egret.Tween.removeTweens(view._carTip);
                // egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
            }
        }
    };
    AcAnnualCelebration2020View.prototype.showBoxEnd = function () {
        var view = this;
        var info = view.cfg.map[view.vo.getCurMapId()];
        var data = view._rewardData;
        view.freshView();
        if (info.pointType == 2) {
            view.showReward(data, 2);
        }
        else {
            view.showReward(data);
        }
        view._stopClick = false;
    };
    AcAnnualCelebration2020View.prototype.showAvg = function () {
        var view = this;
        var mapId = view.vo.getCurMapId();
        ViewController.getInstance().openView(ViewConst.BASE.ACAC2020AVGVIEW, {
            aid: view.aid,
            code: view.code,
            uicode: view.uicode,
            mapId: mapId,
            key: view.vo.getMapTimes(),
        });
    };
    AcAnnualCelebration2020View.prototype.showReward = function (data, type) {
        if (type === void 0) { type = 1; }
        var view = this;
        if (data.isten) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020TENPOPUPVIEW, {
                aid: view.aid,
                code: view.code,
                uicode: view.uicode,
                info: data.rollArr,
            });
        }
        else {
            var addValue = data.addValue;
            if (type == 2) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020GETREWARDVIEW, {
                    aid: view.aid,
                    code: view.code,
                    uicode: view.uicode,
                    rewards: data.rewards,
                    extra: data.wealthGodRewards,
                    addValue: addValue,
                    confirmCallback: function () {
                        view.showAvg();
                    },
                    handler: view
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020GETREWARDVIEW, {
                    aid: view.aid,
                    code: view.code,
                    uicode: view.uicode,
                    rewards: data.rewards,
                    extra: data.wealthGodRewards,
                    addValue: addValue,
                });
            }
        }
    };
    AcAnnualCelebration2020View.prototype.getuicode = function () {
        return this.uicode;
    };
    AcAnnualCelebration2020View.prototype.getUicode = function () {
        return this.getuicode();
    };
    /**
    * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
    */
    // protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{
    //     let localkey:string = `acEnjoyNightreportTipTime`+this.code+"_"+Api.playerVoApi.getPlayerID();
    //     let timeStr:string = LocalStorageManager.get(localkey);
    //     let lastTime:number = 0;
    //     if (timeStr && timeStr!="")
    //     {   
    //         lastTime = Number(timeStr);
    //     }
    //     if (lastTime < this.vo.et)
    //     {   
    //         let getReportData:any = {title:{key:`acEnjoyNightreporttitle-${this.code}`},msg:{key:`acEnjoyNightreportmsg-${this.code}`}};
    //         LocalStorageManager.set(localkey,String(this.vo.et));
    //         return getReportData;
    //     }
    //     else
    //     {
    //        return null;
    //     }
    // }
    AcAnnualCelebration2020View.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL), view.playBoxCallback, view);
        view._bgGroup = null;
        view._stopClick = null;
        view._cdText = null;
        this._checkFlag1 = null;
        this._checkFlag2 = null;
        this._throwType = 0;
        this._numTF = null;
        this._diceBtn = null;
        this._rewardScrollView = null;
        this._prevRoundReward = null;
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this._circleText = null;
        this._rewardBtn = null;
        this._rewardGroup = null;
        this._boxInfoList = [];
        view._bgGroup = null;
        if (view._carGroup) {
            view._carGroup.removeTouchTap();
            view._carGroup.dispose();
            view._carGroup = null;
        }
        view._car = null;
        // egret.Tween.removeTweens(view._carTip);
        view._carTip = null;
        view._noticescrollView = null;
        view._stopPlay = false;
        view._stopClick = false;
        this._isPlay = false;
        this._isAIDice = false;
        this._aiReddot = null;
        this._aidicename = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnnualCelebration2020View;
}(AcCommonView));
__reflect(AcAnnualCelebration2020View.prototype, "AcAnnualCelebration2020View");
//# sourceMappingURL=AcAnnualCelebration2020View.js.map