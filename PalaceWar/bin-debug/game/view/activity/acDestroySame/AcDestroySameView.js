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
/*
author : qianjun
date : 2018.4.14
desc : 暗夜魅影
*/
var AcDestroySameView = /** @class */ (function (_super) {
    __extends(AcDestroySameView, _super);
    function AcDestroySameView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._haveTxt = null;
        _this._roundBg = null;
        _this._roundTxt = null;
        _this._progressBar = null;
        _this._pool = null;
        _this._popGroup = null;
        _this._rewardBtn = null;
        _this._roundBtn = null;
        _this._stop = false;
        _this._dbbone = null;
        _this._skipAnim = false;
        _this._destroyLog = [];
        _this._rewards = "";
        _this.total = 0;
        _this.damage = 0;
        _this.isbatch = false;
        return _this;
    }
    AcDestroySameView.prototype.getProbablyInfo = function () {
        return this.getCnByCode("acDestroySameProbablyInfo");
    };
    Object.defineProperty(AcDestroySameView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySameView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDestroySameView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        var view = this;
        if (Number(this.getUiCode()) < 4) {
            var localkey = this.acTivityId + this.vo.et + Api.playerVoApi.getPlayerID();
            var lastTime = 0;
            var timeStr = LocalStorageManager.get(localkey);
            if (timeStr && timeStr != "") {
                lastTime = Number(timeStr);
            }
            if (!App.DateUtil.checkIsToday(lastTime)) {
                LocalStorageManager.set(localkey, String(GameData.serverTime));
                ViewController.getInstance().openView(ViewConst.BASE.ACDESTROYSAMEPREVVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }
    };
    AcDestroySameView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        return App.CommonUtil.getCnByCode("acDestroySameRuleInfo", this.code, code);
    };
    AcDestroySameView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcDestroySameView.prototype.getStop = function () {
        return this._stop;
    };
    AcDestroySameView.prototype.initBg = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.viewBg, this);
            var boneName = "";
            switch (Number(this.getUiCode())) {
                case 1:
                    boneName = "acdestroysame_batbos";
                    break;
                case 4:
                    boneName = "acshenqi_qinglong";
                    break;
            }
            //(
            if (!Api.switchVoApi.checkCloseBone() && RES.hasRes(boneName + "_tex_json") && App.CommonUtil.check_dragon()) {
                var bat = App.DragonBonesUtil.getLoadDragonBones(boneName);
                view._dbbone = bat;
                if (Number(code) == 1) {
                    var smallbat = App.DragonBonesUtil.getLoadDragonBones("acdestroysame_upperlayer");
                    var zshi = App.DragonBonesUtil.getLoadDragonBones("acdestroysame_bottomlayer");
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bat, this, [0, 400]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, smallbat, this, [0, 400]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, this, [0, 400]);
                    this.addChild(zshi);
                    this.addChild(bat);
                    this.addChild(smallbat);
                }
                else {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bat, this, [0, 1136 + 100]);
                    this.addChild(bat);
                }
                bat.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, this.dragonMc, this);
            }
            else {
                if (Number(code) < 3) {
                    var bat = BaseLoadBitmap.create(App.CommonUtil.getResByCode("destroysamebat", code));
                    bat.width = 640;
                    bat.height = 1136;
                    var smallbat = BaseLoadBitmap.create(App.CommonUtil.getResByCode("destroysamesmallbat", code));
                    smallbat.width = 640;
                    smallbat.height = 1136;
                    var zshi = BaseLoadBitmap.create(App.CommonUtil.getResByCode("destroysamezshi", code));
                    zshi.width = 640;
                    zshi.height = 1136;
                    this.addChild(bat);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bat, this);
                    this.addChild(smallbat);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, smallbat, this);
                    this.addChild(zshi);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, zshi, this);
                }
            }
            if (Number(code) == 3) {
                var fazhen1 = BaseBitmap.create(App.CommonUtil.getResByCode("destroysamefazhen1", code));
                var fazhen2 = BaseBitmap.create(App.CommonUtil.getResByCode("destroysamefazhen2", code));
                var fazhen3 = BaseBitmap.create(App.CommonUtil.getResByCode("destroysamefazhen3", code));
                fazhen1.anchorOffsetX = fazhen1.width / 2;
                fazhen1.anchorOffsetY = fazhen1.height / 2;
                fazhen2.anchorOffsetX = fazhen2.width / 2;
                fazhen2.anchorOffsetY = fazhen2.height / 2;
                fazhen3.anchorOffsetX = fazhen3.width / 2;
                fazhen3.anchorOffsetY = fazhen3.height / 2;
                this.addChild(fazhen1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fazhen1, this);
                this.addChild(fazhen2);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fazhen2, this);
                this.addChild(fazhen3);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fazhen3, this);
                egret.Tween.get(fazhen1, { loop: true }).to({ rotation: 360 }, 40000);
                egret.Tween.get(fazhen2, { loop: true }).to({ rotation: -360 }, 30000);
                egret.Tween.get(fazhen3, { loop: true }).to({ rotation: 360 }, 20000);
                var eggEff = ComponentManager.getCustomMovieClip("destoysameegg", 10);
                this.addChild(eggEff);
                eggEff.width = 300;
                eggEff.height = 420;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eggEff, view, [0, -50]);
                eggEff.playWithTime(-1);
            }
        }
    };
    // 背景图名称
    AcDestroySameView.prototype.getBgName = function () {
        var code = this.getUiCode();
        return App.CommonUtil.getResByCode("destroysamebg", code);
    };
    AcDestroySameView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("destroysametitle", this.getUiCode());
    };
    // 获取container初始y坐标 		
    AcDestroySameView.prototype.getContainerY = function () {
        return 92;
    };
    AcDestroySameView.prototype.getTitleStr = function () {
        return null;
    };
    AcDestroySameView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        var arr = [
            "destroysamecode1", "acwealthcarpview_servantskintxt", "acwealthcarpview_skineffect1", "destroysamezshi",
            "specialview_commoni_namebg", "destroysamezshi2", "destroysamebottombg", "motherdaychargebtn-3", "motherdaychargebtn-3_down", "mainlandcitynamebg-1",
            "progress8", "progress7_bg", "destroysametaskbg", "luckydrawiconbg-1", "activitypop_check1", "activitypop_check2"
        ];
        if (RES.hasRes("destroysamecode" + code) && Number(code) != 1) {
            arr.push("destroysamecode" + code);
            arr.push("destroysamebottombg-" + code);
        }
        if (Number(this.code) > 4 && Number(code) < 12) {
            arr.push("destroytop-" + this.getTopUiCode());
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcDestroySameView.prototype.getTopUiCode = function () {
        var code = this.getUiCode();
        if (Number(code) == 4) {
            code = Math.floor(Number(this.code) / 2) * 2 + '';
        }
        return code;
    };
    AcDestroySameView.prototype.initView = function () {
        var _this = this;
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - 92;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_ATTACK), view.attackCallback, view);
        //top背景图
        var topbg = BaseBitmap.create(this.getResByCode("destroytop", this.getTopUiCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, topbg, view.titleBg, [0]);
        topbg.y = -7;
        view.addChildToContainer(topbg);
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true, String(0xffffff)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // 423 205
        timeTxt.width = 390;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [Number(this.getUiCode()) < 3 ? 225 : 180, 12]);
        view.addChildToContainer(timeTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode("AcDestroySameTip4")), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = Number(this.getUiCode()) < 3 ? 390 : 430;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 5]);
        view.addChildToContainer(tipTxt);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timebg);
        timebg.y = (topbg.y + topbg.height - 14);
        view._timebg = timebg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChildToContainer(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y + 6;
        timebg.width = tip2Text.width + 50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x + (timebg.width - tip2Text.width) * 0.5;
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topbg.x + 103 - skinTxtEffectBM.width / 2, topbg.y + 130 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create(Number(code) == 4 ? "servantweapontxt" : "acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topbg.x + 103, topbg.y + 130);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create(Number(code) == 4 ? "servantweapontxt" : "acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topbg.x + 103, topbg.y + 130);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(topbg.x, topbg.y);
        view.addChildToContainer(touchPos);
        touchPos.addTouchTap(function () {
            if (view._stop) {
                return;
            }
            if (Number(code) == 4) {
                if (view.cfg.coreReward1) {
                    var itemcfg = Config.ItemCfg.getItemCfgById(view.cfg.coreReward);
                    ViewController.getInstance().openView(ViewConst.POPUP.SERVANTWEAPONSHOWVIEW, {
                        weaponIds: view.cfg.coreReward1,
                        topMsg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip9", _this.code, code), [Number(_this.code) & 1 ? '7500' : "10000", itemcfg.name])
                    });
                }
                else {
                    var weaponcfg = Config.ServantweaponCfg.getWeaponItemById(view.cfg.coreReward);
                    ViewController.getInstance().openView(ViewConst.POPUP.SERVANTWEAPONSHOWVIEW, {
                        weaponId: view.cfg.coreReward,
                        topMsg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip9", _this.code, code), [Number(_this.code) & 1 ? '7500' : "10000", weaponcfg.name])
                    });
                }
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEPOPUPVIEW3, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, ViewController);
        //活动奖励
        var rewardbtn = ComponentManager.getButton("motherdaychargebtn-3", "", function () {
            if (view._stop) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        view._rewardBtn = rewardbtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardbtn, topbg, [10, topbg.height + 10]);
        if (Number(code) == 3) {
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) {
                var openOtherBtn = ComponentManager.getButton("destroyshopbtn-3", "", function () {
                    if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                        ViewController.getInstance().openViewByFunName("qingyuan");
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                    }
                }, this);
                view.addChildToContainer(openOtherBtn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, openOtherBtn, rewardbtn, [0, rewardbtn.height + 10]);
            }
        }
        //当前轮数
        var roundbg = BaseBitmap.create("mainlandcitynamebg-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, roundbg, rewardbtn, [rewardbtn.width + 10, 0]);
        view._roundBg = roundbg;
        var curround = view.vo.getCurround();
        var roundtxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlePassRound-1", [curround.toString()]), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundtxt, roundbg);
        view._roundTxt = roundtxt;
        //血量
        var progressbar = ComponentManager.getProgressBar("progress8", "progress7_bg", 367);
        view.addChildToContainer(progressbar);
        progressbar.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, roundbg, [roundbg.width - 13, 0]);
        view._progressBar = progressbar;
        progressbar.setPercentage(Number(code) == 3 ? 0 : 1);
        progressbar.setTextSize(18);
        progressbar.setText(Number(code) == 3 ? "0%" : "100%");
        view.addChildToContainer(roundbg);
        view.addChildToContainer(roundtxt);
        var boxreward = ComponentManager.getButton(this.getResByCode("destroybox"), "", function () {
            if (view._stop) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, view);
        boxreward.setScale(0.8);
        view.addChildToContainer(boxreward);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, boxreward, progressbar, [progressbar.width * progressbar.scaleX, 0]);
        view._roundBtn = boxreward;
        //底图修饰
        var bottomzshi = BaseBitmap.create("destroysamezshi");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomzshi, view.container, [0, 0], true);
        view.addChildToContainer(bottomzshi);
        var bottomzshi2 = BaseBitmap.create("destroysamezshi2");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomzshi2, view.container, [0, 0], true);
        view.addChildToContainer(bottomzshi2);
        var bottomzshi3 = BaseBitmap.create("destroysamezshi2");
        bottomzshi3.anchorOffsetX = bottomzshi3.width / 2;
        bottomzshi3.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, bottomzshi3, view.container, [0, 0], true);
        view.addChildToContainer(bottomzshi3);
        var bottombg = BaseBitmap.create(App.CommonUtil.getResByCode("destroysamebottombg", code));
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0, 30], true);
        //跳过动画
        var skipCheck = BaseBitmap.create(this._skipAnim ? "activitypop_check2" : "activitypop_check1");
        skipCheck.y = bottombg.y - skipCheck.height;
        view.addChildToContainer(skipCheck);
        skipCheck.addTouchTap(function () {
            _this._skipAnim = !_this._skipAnim;
            skipCheck.texture = ResourceManager.getRes(_this._skipAnim ? "activitypop_check2" : "activitypop_check1");
        }, this);
        var checkTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acskysoundCheckTip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        skipCheck.x = GameConfig.stageWidth / 2 - skipCheck.width / 2 - checkTxt1.width / 2 - 2;
        checkTxt1.setPosition(skipCheck.x + skipCheck.width + 4, skipCheck.y + skipCheck.height / 2 - checkTxt1.height / 2);
        view.addChildToContainer(checkTxt1);
        var group = new BaseDisplayObjectContainer();
        group.width = 315;
        group.height = 315;
        view.addChildToContainer(group);
        view._popGroup = group;
        group.x = bottombg.x + 20;
        group.y = bottombg.y + 23;
        group.mask = new egret.Rectangle(0, 0, 330, 330);
        var destroyone = ComponentManager.getButton(this.getResByCode("destroyonebtn"), "", function () {
            //消耗一次
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getItemNum() < 1) {
                view.showTipView();
                //App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
            }
            else {
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_ATTACK, {
                    activeId: view.acTivityId,
                    pos: view.getPos(view.vo.pointidx),
                    batch: 0
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, destroyone, view.container, [10, 70], true);
        view.addChildToContainer(destroyone);
        var onedescbg = BaseBitmap.create("specialview_commoni_namebg");
        view.addChildToContainer(onedescbg);
        var useTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTip4-1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt);
        var useIcon = BaseBitmap.create(this.getResByCode("destroyitemicon2"));
        view.addChildToContainer(useIcon);
        var useTxt2 = ComponentManager.getTextField("X 1", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt2);
        useTxt2.name = "useTxt2";
        onedescbg.width = useTxt.width + useIcon.width + useTxt2.width + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, onedescbg, destroyone, [0, destroyone.height + 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt, onedescbg, [10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useIcon, useTxt, [useTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt2, useIcon, [useIcon.width, 0]);
        var destroyall = ComponentManager.getButton(this.getResByCode("destroyallbtn"), "", function () {
            //消耗10次
            if (view._stop) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getItemNum() < 10) {
                view.showTipView();
                //App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
            }
            else {
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_ATTACK, {
                    activeId: view.acTivityId,
                    batch: 1
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destroyall, view.container, [10, 70], true);
        view.addChildToContainer(destroyall);
        var adddescbg = BaseBitmap.create("specialview_commoni_namebg");
        view.addChildToContainer(adddescbg);
        var alluseTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTip4-1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt);
        var alluseIcon = BaseBitmap.create(this.getResByCode("destroyitemicon2"));
        view.addChildToContainer(alluseIcon);
        var alluseTxt2 = ComponentManager.getTextField("X 10", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt2);
        adddescbg.width = alluseTxt.width + alluseIcon.width + alluseTxt2.width + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, adddescbg, destroyall, [0, destroyall.height + 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt, adddescbg, [10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseIcon, alluseTxt, [alluseTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt2, alluseIcon, [alluseIcon.width, 0]);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getCnByCode("AcDestroySameTip5")), 18, TextFieldConst.COLOR_WARN_GREEN);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt2, adddescbg, [10, adddescbg.height + 5]);
        //当前拥有
        var havebg = BaseBitmap.create("luckydrawiconbg-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, havebg, bottomzshi, [0, 10]);
        view.addChildToContainer(havebg);
        var haveTxt = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftCurrHave-1"), 20);
        view.addChildToContainer(haveTxt);
        var haveIcon = BaseBitmap.create(this.getResByCode("destroyitemicon2"));
        view.addChildToContainer(haveIcon);
        var haveTxt2 = ComponentManager.getTextField(view.vo.getItemNum() + "", 20);
        view.addChildToContainer(haveTxt2);
        view._haveTxt = haveTxt2;
        var width = (bottomzshi.width - (haveTxt.width + haveIcon.width + haveTxt2.width)) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, haveTxt, bottomzshi, [width, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveIcon, haveTxt, [haveTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveTxt2, haveIcon, [haveIcon.width, 0]);
        view.initPool();
        view.freshView();
    };
    //弹窗提示
    AcDestroySameView.prototype.showTipView = function () {
        var _this = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "acthrowstoneTipTitle",
            msg: LanguageManager.getlocal(this.getCnByCode("AcDestroySameTip8")),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMEPOPUPVIEW, {
                    aid: _this.aid,
                    code: _this.code
                });
            },
            handler: this,
            needCancel: true
        });
    };
    AcDestroySameView.prototype.initPool = function () {
        var view = this;
        view._pool = {};
        for (var i = 1; i <= 9; ++i) {
            var point_1 = new AcDestroySamePopPoint();
            point_1.init(i, view.aid, view.code);
            view._popGroup.addChild(point_1);
            view._pool[i] = point_1;
            var pos = point_1.getPoint();
            point_1.x = (pos.y - 1) * 108;
            point_1.y = (pos.x - 1) * 108;
        }
        var id = view.findMaxPoint();
        var point = view._pool[id];
        point.touchPoint();
    };
    AcDestroySameView.prototype.cleanupPool = function () {
        var view = this;
        for (var key in view._pool) {
            var point = view._pool[key];
            point.dispose();
        }
        view._pool = {};
    };
    AcDestroySameView.prototype.findMaxPoint = function () {
        var view = this;
        var id = 1;
        var max = 0;
        for (var i = 1; i <= 9; ++i) {
            var point = view._pool[i];
            point.touchPoint();
            var count = 0;
            for (var k = 1; k <= 9; ++k) {
                var unit = view._pool[k];
                if (unit.getSelect()) {
                    ++count;
                    unit.setSelect(false);
                }
            }
            if (count > max) {
                max = count;
                id = i;
            }
        }
        return id;
    };
    AcDestroySameView.prototype.getPoint = function (id) {
        var view = this;
        var point = view._pool[id];
        return point;
    };
    AcDestroySameView.prototype.makePointLine = function (evt) {
        var view = this;
        if (evt.data == 0) {
            for (var i in view._pool) {
                var point = view._pool[i];
                point.setSelect(false);
                point.setInCal(false);
            }
        }
        else {
            var point = view.getPoint(evt.data);
            if (point) {
                point.setSelect(true);
                if (!point.getInCal()) {
                    point.makeLinePoint();
                }
            }
        }
    };
    AcDestroySameView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_DESTROYSAME_INFO, requestData: {
                activeId: view.vo.aidAndCode
            } };
    };
    AcDestroySameView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setBosshp(data.data.data.bossHp);
    };
    //获取横纵坐标
    AcDestroySameView.prototype.getPos = function (id) {
        var arr = [];
        arr.push(Math.ceil(id / 3));
        arr.push(id % 3 == 0 ? 3 : id % 3);
        return arr;
    };
    AcDestroySameView.prototype.freshView = function () {
        var view = this;
        //当前轮数 和 血量
        var code = view.getUiCode();
        var curround = view.vo.getCurround();
        view._roundTxt.text = LanguageManager.getlocal("acBattlePassRound-1", [curround.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._roundTxt, view._roundBg);
        var percent = 0;
        var numstr = "";
        if (curround > Object.keys(view.cfg.bossList).length) {
            percent = 1;
            numstr = LanguageManager.getlocal("prisonerInfinite");
        }
        else {
            var curhp = Number(code) == 3 ? (view.cfg.bossList[curround].bossHp - view.vo.getCurbossHp()) : view.vo.getCurbossHp();
            percent = (curhp) / view.cfg.bossList[curround].bossHp;
            numstr = curhp + "/" + view.cfg.bossList[curround].bossHp;
        }
        view._progressBar.setPercentage(percent);
        view._progressBar.setText(numstr);
        view._haveTxt.text = view.vo.getItemNum().toString();
        if (view.vo.getpublicRedhot1() || view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
            var reddot = this._rewardBtn.getChildByName("reddot");
            reddot.x = 65;
            reddot.y = 5;
        }
        if (!view.vo.getpublicRedhot1() && !view.vo.getpublicRedhot2()) {
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
        if (view.vo.getpublicRedhot3()) {
            App.CommonUtil.addIconToBDOC(view._roundBtn);
            var reddot = this._roundBtn.getChildByName("reddot");
            reddot.x = 80;
            reddot.y = 10;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._roundBtn);
        }
        var usetxt2 = view.container.getChildByName("useTxt2");
        usetxt2.text = "" + (view.vo.getFreeNum() > 0 ? LanguageManager.getlocal("acYiyibusheFree") : "X 1");
    };
    AcDestroySameView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x + (view._timebg.width - view._timeCountTxt.width) * 0.5;
    };
    AcDestroySameView.prototype.attackCallback = function (evt) {
        var view = this;
        if (!evt.data.ret) {
            view._stop = false;
            return;
        }
        var data = evt.data.data.data;
        if (data) {
            if (data.hasKill) {
                view._stop = false;
                App.CommonUtil.showTip(LanguageManager.getlocal("AcDestroySameTip10-1"));
                return;
            }
            if (data.destroyLog) {
                var total = 0;
                var damage = 0;
                for (var i in data.destroyLog) {
                    total += (data.destroyLog[i].posSet.length);
                    damage += (data.destroyLog[i].damage);
                }
                view._destroyLog = data.destroyLog;
                view._rewards = data.rewards;
                view.total = total;
                view.damage = damage;
                view.isbatch = data.batch;
                if (this._skipAnim) {
                    this.skipShowMoive();
                }
                else {
                    this.showMovie();
                }
            }
            else {
                view._stop = false;
            }
            if (data.bossHp) {
                view.vo.setBosshp(data.bossHp);
                view.freshView();
            }
            // if(data.batch){
            // }
            // else{
            // }
        }
    };
    AcDestroySameView.prototype.skipShowMoive = function () {
        var view = this;
        //  let tmp = view._destroyLog[view._destroyLog.length-1];
        //  view.fillPoint(tmp.nxtGrid);
        this.cleanupPool();
        this.initPool();
        if (view._rewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW, {
                rewards: view._rewards,
                tipMsg: LanguageManager.getlocal(this.getCnByCode("AcDestroySameTip7"), [view.total.toString(), view.damage.toString()])
            });
        }
        view._stop = false;
        var id = view.findMaxPoint();
        var point = view._pool[id];
        point.touchPoint();
    };
    AcDestroySameView.prototype.showMovie = function () {
        var _this = this;
        var view = this;
        var tmp = view._destroyLog[0];
        if (tmp) {
            //...
            // let id = (tmp.pos[0] - 1) * 3 + tmp.pos[1];
            // let point : AcDestroySamePopPoint = view._pool[id];
            // point.touchPoint();
            // 清理位置
            for (var i in view._pool) {
                var tmppoint = view._pool[i];
                tmppoint.setSelect(false);
            }
            for (var i in tmp.posSet) {
                var unit = tmp.posSet[i];
                var id = (unit[0] - 1) * 3 + unit[1];
                var point = view._pool[id];
                point.setSelect(true);
            }
            var count_1 = 0;
            var clipname = Number(this.getUiCode()) < 3 ? "destorysamedandao" : "destorysamedandao4";
            var framenum = 6;
            var tmpW = 200;
            var tmpH = 650;
            if (Number(this.getUiCode()) == 4) {
                framenum = 9;
                tmpW = 80;
                tmpH = 350;
            }
            var clip_1 = ComponentManager.getCustomMovieClip(clipname, framenum, 50);
            clip_1.width = tmpW;
            clip_1.height = tmpH;
            this.addChildToContainer(clip_1);
            clip_1.x = 220;
            clip_1.y = view._popGroup.y - 320;
            if (Number(this.getUiCode()) == 3) {
                clip_1.y = view._popGroup.y - 200;
            }
            clip_1.blendMode = egret.BlendMode.ADD;
            if (Number(this.getUiCode()) == 4) {
                clip_1.setScale(2);
                clip_1.x = 245;
            }
            framenum = 16;
            var chicun = 500;
            if (Number(this.getUiCode()) == 3) {
                framenum = 10;
                chicun = 300;
            }
            if (Number(this.getUiCode()) == 4) {
                framenum = 16;
                chicun = 400;
            }
            var jizhongname = Number(this.getUiCode()) < 3 ? "destroysamejizhong" : "destroysamejizhong-" + this.getUiCode();
            var hit_1 = ComponentManager.getCustomMovieClip(jizhongname, framenum, 50);
            hit_1.width = chicun;
            hit_1.height = chicun;
            hit_1.anchorOffsetX = hit_1.width / 2;
            hit_1.anchorOffsetY = hit_1.height / 2;
            this.addChildToContainer(hit_1);
            hit_1.x = 320;
            hit_1.y = 350;
            if (Number(this.getUiCode()) == 3) {
                hit_1.setScale(2);
                var eggEff = ComponentManager.getCustomMovieClip("destoysameegg", 10);
                eggEff.width = 300;
                eggEff.height = 420;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eggEff, view, [0, -50]);
                hit_1.y = eggEff.y + eggEff.height / 2 - view.container.y;
            }
            hit_1.blendMode = egret.BlendMode.ADD;
            hit_1.setEndCallBack(function () {
                hit_1.dispose();
                hit_1 = null;
            }, view);
            if (Number(this.getUiCode()) == 4) {
                hit_1.setScale(2);
            }
            clip_1.setFrameEvent(3, function () {
                hit_1.playWithTime(1);
                if (Number(_this.getUiCode()) == 4) {
                    view.onHit();
                }
            }, view);
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                clip_1 = null;
                SoundManager.playEffect("effect_battle_hit");
                if (view._dbbone) {
                    view._dbbone.playDragonMovie("hit", 1);
                }
            }, view);
            var first = true;
            SoundManager.playEffect("effect_activity_bassbreak");
            var _loop_1 = function (i) {
                var tmppoint = view._pool[i];
                var tmppos = tmppoint.getPoint();
                if (tmppoint.getSelect()) {
                    if (first && !view.isbatch) {
                        first = !first;
                        egret.Tween.get(clip_1).wait(200).call(function () {
                            //发射子弹   
                            clip_1.playWithTime(1);
                        }, view);
                    }
                    tmppoint.showEffect(function () {
                        ++count_1;
                        if (count_1 == tmp.posSet.length) {
                            egret.Tween.get(view).wait(200).call(function () {
                                //先下落
                                //第一列 147 258 369
                                _this.movePoint(1, 3, tmp.nxtGrid);
                            }, view);
                        }
                        tmppoint.alpha = 0;
                        tmppoint.dispose();
                        view._pool[i] = null;
                        tmppoint = null;
                    }, view);
                }
            };
            for (var i in view._pool) {
                _loop_1(i);
            }
        }
        else {
            if (view.isbatch) {
                //发射子弹
                var clipname = Number(this.getUiCode()) < 3 ? "destorysamedandao" : "destorysamedandao4";
                var framenum = 6;
                var tmpW = 200;
                var tmpH = 650;
                if (Number(this.getUiCode()) == 4) {
                    framenum = 9;
                    tmpW = 80;
                    tmpH = 350;
                }
                var clip_2 = ComponentManager.getCustomMovieClip(clipname, framenum, 50);
                clip_2.width = tmpW;
                clip_2.height = tmpH;
                clip_2.x = 220;
                clip_2.y = view._popGroup.y - 320;
                clip_2.playWithTime(1);
                if (Number(this.getUiCode()) == 3) {
                    clip_2.y = view._popGroup.y - 200;
                }
                clip_2.blendMode = egret.BlendMode.ADD;
                if (Number(this.getUiCode()) == 4) {
                    clip_2.setScale(2);
                    clip_2.x = 245;
                }
                this.addChildToContainer(clip_2);
                framenum = 16;
                var chicun = 500;
                if (Number(this.getUiCode()) == 3) {
                    framenum = 10;
                    chicun = 300;
                }
                if (Number(this.getUiCode()) == 4) {
                    framenum = 16;
                    chicun = 400;
                }
                var jizhongname = Number(this.getUiCode()) < 3 ? "destroysamejizhong" : "destroysamejizhong-" + this.getUiCode();
                var hit_2 = ComponentManager.getCustomMovieClip(jizhongname, framenum, 50);
                hit_2.width = chicun;
                hit_2.height = chicun;
                hit_2.anchorOffsetX = hit_2.width / 2;
                hit_2.anchorOffsetY = hit_2.height / 2;
                this.addChildToContainer(hit_2);
                hit_2.x = 320;
                hit_2.y = 350;
                if (Number(this.getUiCode()) == 3) {
                    hit_2.setScale(2);
                    var eggEff = ComponentManager.getCustomMovieClip("destoysameegg", 10);
                    eggEff.width = 300;
                    eggEff.height = 420;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eggEff, view, [0, -50]);
                    hit_2.y = eggEff.y + eggEff.height / 2 - view.container.y;
                }
                hit_2.blendMode = egret.BlendMode.ADD;
                hit_2.setEndCallBack(function () {
                    hit_2.dispose();
                    hit_2 = null;
                    if (view._rewards) {
                        ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW, {
                            rewards: view._rewards,
                            tipMsg: LanguageManager.getlocal(_this.getCnByCode("AcDestroySameTip7"), [view.total.toString(), view.damage.toString()])
                        });
                    }
                    view._stop = false;
                    var id = view.findMaxPoint();
                    var point = view._pool[id];
                    point.touchPoint();
                }, view);
                if (Number(this.getUiCode()) == 4) {
                    hit_2.setScale(2);
                }
                clip_2.setFrameEvent(3, function () {
                    hit_2.playWithTime(1);
                    if (Number(_this.getUiCode()) == 4) {
                        view.onHit();
                    }
                }, view);
                clip_2.setEndCallBack(function () {
                    clip_2.dispose();
                    clip_2 = null;
                    SoundManager.playEffect("effect_battle_hit");
                    if (view._dbbone) {
                        view._dbbone.playDragonMovie("hit", 1);
                    }
                }, view);
            }
            else {
                if (view._rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW, {
                        rewards: view._rewards,
                        tipMsg: LanguageManager.getlocal(this.getCnByCode("AcDestroySameTip7"), [view.total.toString(), view.damage.toString()])
                    });
                }
                view._stop = false;
                var id = view.findMaxPoint();
                var point = view._pool[id];
                point.touchPoint();
            }
        }
    };
    AcDestroySameView.prototype.movePoint = function (y, to, newmap, time) {
        var _this = this;
        if (time === void 0) { time = 80; }
        var view = this;
        var newid = (to - 1) * 3 + y;
        var last = y == 3 && to == 1;
        var total = 0;
        if (view._pool[newid]) {
            if (to > 1) {
                this.movePoint(y, to - 1, newmap);
            }
            else {
                if (y + 1 < 4) {
                    this.movePoint(y + 1, 3, newmap);
                }
            }
            if (last) {
                //填充
                view.fillPoint(newmap);
            }
        }
        else {
            if (last) {
                view.fillPoint(newmap);
            }
            else {
                if (to == 1) {
                    if (y + 1 < 4) {
                        this.movePoint(y + 1, 3, newmap);
                    }
                }
                else {
                    var ismove = false;
                    var _loop_2 = function (i) {
                        var id = (i - 1) * 3 + y;
                        var point = view._pool[id];
                        if (point) {
                            total = Math.max(total, (to - i) * time);
                            ismove = true;
                            egret.Tween.get(point).to({ y: (to - 1) * 108 }, (to - i) * time).call(function () {
                                var newpoint = new AcDestroySamePopPoint();
                                var newType = newmap[to - 1][y - 1];
                                newpoint.init(newid, view.aid, view.code, newType);
                                view._popGroup.addChild(newpoint);
                                view._pool[newid] = newpoint;
                                var newpos = newpoint.getPoint();
                                newpoint.x = (newpos.y - 1) * 108;
                                newpoint.y = (newpos.x - 1) * 108;
                                view._pool[id].dispose();
                                view._pool[id] = null;
                                if (to > 1) {
                                    _this.movePoint(y, to - 1, newmap);
                                }
                                if (last) {
                                    //填充
                                    view.fillPoint(newmap);
                                }
                            }, view);
                            return "break";
                        }
                        else {
                            if (to > 1 && i == 1) {
                                this_1.movePoint(y, to - 1, newmap);
                            }
                            if (last) {
                                //填充
                                view.fillPoint(newmap);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var i = to - 1; i >= 1; --i) {
                        var state_1 = _loop_2(i);
                        if (state_1 === "break")
                            break;
                    }
                }
            }
        }
    };
    AcDestroySameView.prototype.fillPoint = function (newmap, time) {
        if (time === void 0) { time = 80; }
        var view = this;
        //填充
        var totaltime = 0;
        for (var y = 1; y < 4; ++y) {
            var posy = 1;
            for (var x = 3; x > 0; --x) {
                var id = (x - 1) * 3 + y;
                if (!view._pool[id]) {
                    var newpoint = new AcDestroySamePopPoint();
                    var newType = newmap[x - 1][y - 1];
                    newpoint.init(id, view.aid, view.code, newType);
                    view._popGroup.addChild(newpoint);
                    view._pool[id] = newpoint;
                    var newpos = newpoint.getPoint();
                    newpoint.x = (newpos.y - 1) * 108;
                    newpoint.y = -108 * posy;
                    ++posy;
                    totaltime = Math.max(totaltime, (x - 1 + posy) * time);
                    egret.Tween.get(newpoint).to({ y: (newpos.x - 1) * 108 }, (x - 1 + posy) * time);
                }
            }
        }
        egret.Tween.get(view).wait(totaltime).call(function () {
            view._destroyLog.splice(0, 1);
            view.showMovie();
        }, view);
    };
    AcDestroySameView.prototype.onHit = function () {
        var view = this;
        if (view._dbbone) {
            var tmpY = view._dbbone.y;
            egret.Tween.get(view._dbbone).to({ y: tmpY - 100 }, 100).to({ y: tmpY }, 100).call(function () {
                egret.Tween.removeTweens(view._dbbone);
            }, view);
        }
    };
    AcDestroySameView.prototype.dragonMc = function () {
        this._dbbone.playDragonMovie("idle", 0);
    };
    AcDestroySameView.prototype.hide = function () {
        if (this._stop) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcDestroySameView.prototype.dispose = function () {
        var view = this;
        view._timeCountTxt = null;
        view._timebg = null;
        view._roundTxt = null;
        view._roundBg = null;
        view._progressBar = null;
        view._popGroup.removeTouchTap();
        view._popGroup = null;
        view._pool = null;
        view._haveTxt = null;
        view._destroyLog = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_ATTACK), view.attackCallback, view);
        view._stop = false;
        view.isbatch = false;
        view.total = 0;
        view.damage = 0;
        if (view._dbbone) {
            view._dbbone = null;
        }
        this._skipAnim = false;
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameView;
}(AcCommonView));
//# sourceMappingURL=AcDestroySameView.js.map