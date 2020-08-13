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
desc : 建造斗场
*/
var AcArenaView = (function (_super) {
    __extends(AcArenaView, _super);
    function AcArenaView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._progressBar = null;
        _this._numbg = null;
        _this._zziTxt = null;
        _this._curMeterTxt = null;
        _this._dbnumricecurbg = null;
        _this._curRiceTxt = null;
        _this._dbnumricenextbg = null;
        _this._nextRiceTxt = null;
        _this._collectflag = null;
        _this._curJindu = 0;
        _this._awardbg = null;
        _this._scrollList = null;
        _this._lqBtn = null;
        _this._prevBtn = null;
        _this._prevAwardRiceTxt = null;
        _this._nextBtn = null;
        _this._nextAwardRiceTxt = null;
        _this._curAwardRiceTxt = null;
        _this._bottomBg = null;
        _this._midBuild = null;
        _this._movieGroup = null;
        _this._prevBuildStatus = 0;
        //建筑位置
        _this._pos = {
            1: { x: 0, y: 456, nameX: 25, nameY: 128, sceneName: ViewConst.POPUP.ACARENAPOPUPVIEW },
            2: { x: 75, y: 705, nameX: 75, nameY: 50, sceneName: ViewConst.POPUP.ACARENAPOPUPVIEW3 },
            3: { x: 435, y: 673, nameX: -60, nameY: 35, sceneName: ViewConst.POPUP.ACARENAPOPUPVIEW4 },
            4: { x: 429, y: 477, nameX: 50, nameY: 120, sceneName: ViewConst.POPUP.ACARENAPOPUPVIEW2 },
        };
        _this._moviecfg = {
            1: [{ x: 265, y: 469, scaleX: 1 }, { x: 324, y: 639, scaleX: -1 }, { x: 355, y: 662, scaleX: -1 }],
            2: [{ x: 295, y: 666, scaleX: -1 }, { x: 386, y: 631, scaleX: -1 }, { x: 347, y: 584, scaleX: 1 }],
            3: [{ x: 267, y: 591, scaleX: -1 }, { x: 279, y: 674, scaleX: 1 }, { x: 346, y: 672, scaleX: -1 }, { x: 393, y: 617, scaleX: -1 }],
            4: [{ x: 234, y: 643, scaleX: 1 }, { x: 265, y: 698, scaleX: -1 }, { x: 337, y: 584, scaleX: 1 }, { x: 396, y: 678, scaleX: -1 }, { x: 450, y: 597, scaleX: -1 }],
            5: [{ x: 168, y: 620, scaleX: 1 }, { x: 272, y: 713, scaleX: -1 }, { x: 295, y: 580, scaleX: -1 }, { x: 393, y: 685, scaleX: -1 }, { x: 431, y: 605, scaleX: -1 }, { x: 444, y: 656, scaleX: -1 }],
            6: [],
        };
        _this._midPos = {
            1: { x: 0, y: 0 },
            2: { x: 215, y: 574 },
            3: { x: 185, y: 548 },
            4: { x: 104, y: 492 },
            5: { x: 63, y: 438 },
        };
        return _this;
    }
    Object.defineProperty(AcArenaView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcArenaView.prototype.getUiCode = function () {
        var code = this.code;
        return code;
    };
    AcArenaView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        return "acArenaRuleInfo-" + code;
    };
    AcArenaView.prototype.getRuleInfoParam = function () {
        var view = this;
        return [view.cfg.ratio1.toString(), view.cfg.rankNeed.toString()];
    };
    AcArenaView.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    };
    // 背景图名称
    AcArenaView.prototype.getBgName = function () {
        var code = this.getUiCode();
        return "arenabg-" + code;
    };
    AcArenaView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "arenaview" + code, "arenabg-" + code, "arenatopbg-" + code, "dragonboatprogress_bg", "dragonboatprogress", "dragonboatnumbg",
            "acwealthcarpview_servantskintxt", "acwealthcarpview_skineffect1", "acwealthcarpview_skineffect", "alliancetask_frame3", "arenabuildstatus2-" + code, "arenabuildstatus3-" + code, "arenabuildstatus4-" + code, "arenabuildstatus5-" + code,
            "dblamp", "lihuahong", "lihuahuang", "lihualan", "collectflag"
        ]);
    };
    AcArenaView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU), view.lqJinduAward, view);
        //top背景图
        var topbg = BaseBitmap.create("arenatopbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(topbg);
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true), 20, TextFieldConst.COLOR_BLACK);
        // 423 205
        timeTxt.width = 390;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [225, 23]);
        view.addChild(timeTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArenaTip1-" + code), 18, TextFieldConst.COLOR_BROWN);
        tipTxt.width = 390;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 5]);
        view.addChild(tipTxt);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y + topbg.height - 14);
        view._timebg = timebg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
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
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topbg.x + 103, topbg.y + 130);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topbg.x + 103, topbg.y + 130);
        this.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(topbg.x, topbg.y);
        view.addChild(touchPos);
        touchPos.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSKINVIEW, {
                skinId: view.cfg.getSkin(view.code),
                need: 10000
            });
        }, ViewController);
        var bottomBg = BaseBitmap.create("arenabottombg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //石材数目
        var numbg = BaseBitmap.create("public_numbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, numbg, topbg, [25, topbg.height + 20]);
        view.addChild(numbg);
        view._numbg = numbg;
        var zziTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_QUALITY_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zziTxt, numbg, [10, 0]);
        view.addChild(zziTxt);
        view._zziTxt = zziTxt;
        var zziImg = BaseLoadBitmap.create("arenaIcon-" + code);
        zziImg.width = zziImg.height = 100;
        zziImg.setScale(0.5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, zziImg, numbg, [0 - 0.5 * zziImg.width / 2 + 10, 0]);
        view.addChild(zziImg);
        //进度条
        var progress = ComponentManager.getProgressBar("dragonboatprogress", "dragonboatprogress_bg", 610);
        progress.width = 610;
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, bottomBg, [0, 15]);
        progress.setDragIcon("arenaIcon2-" + code);
        view.addChild(progress);
        view._progressBar = progress;
        var curMeterTxt = ComponentManager.getTextField('', 18, 0xfcf3b4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curMeterTxt, progress);
        view.addChild(curMeterTxt);
        view._curMeterTxt = curMeterTxt;
        var dbnumriceprevbg = BaseBitmap.create('dragonboatnumbg');
        dbnumriceprevbg.height = 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dbnumriceprevbg, progress, [0, progress.height + 5]);
        view.addChild(dbnumriceprevbg);
        view._dbnumricecurbg = dbnumriceprevbg;
        var prevriceTxt = ComponentManager.getTextField("", 18, 0xfcf3b4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, prevriceTxt, dbnumriceprevbg, [0, 2]);
        view.addChild(prevriceTxt);
        view._curRiceTxt = prevriceTxt;
        var dbnumricenextbg = BaseBitmap.create('dragonboatnumbg');
        dbnumricenextbg.height = 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, dbnumricenextbg, progress, [0, progress.height + 5]);
        view.addChild(dbnumricenextbg);
        view._dbnumricenextbg = dbnumricenextbg;
        var nextriceTxt = ComponentManager.getTextField("", 18, 0xfcf3b4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextriceTxt, dbnumricenextbg, [0, 2]);
        view.addChild(nextriceTxt);
        view._nextRiceTxt = nextriceTxt;
        //奖励
        var awardbg = BaseBitmap.create('public_9_bg41');
        awardbg.width = 510;
        awardbg.height = 130;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [0, 60]);
        view.addChild(awardbg);
        awardbg.alpha = 0;
        view._awardbg = awardbg;
        var tmpRect = new egret.Rectangle(0, 0, 500, 115);
        var scrollList = ComponentManager.getScrollList(ItemScrollItem, null, tmpRect);
        scrollList.addTouchTap(view.clickItemHandler, view);
        view._scrollList = scrollList;
        scrollList.verticalScrollPolicy = 'off';
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, awardbg);
        view.addChild(scrollList);
        var lqBtn = ComponentManager.getButton("arenabtn-" + code, 'DragonBoatDayLq', view.lqClick, view);
        lqBtn.setColor(TextFieldConst.COLOR_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, bottomBg, [0, 5]);
        view.addChild(lqBtn);
        view._lqBtn = lqBtn;
        var prevBtn = ComponentManager.getButton("arenapagebtn-" + code, '', view.prevClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, prevBtn, bottomBg, [30, 65]);
        view.addChild(prevBtn);
        view._prevBtn = prevBtn;
        var prevAwardRiceTxt = ComponentManager.getTextField("", 18, 0xc2b88b);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, prevAwardRiceTxt, prevBtn, [0, 0]);
        view.addChild(prevAwardRiceTxt);
        view._prevAwardRiceTxt = prevAwardRiceTxt;
        var nextBtn = ComponentManager.getButton("arenapagebtn-" + code, '', view.nextClick, view);
        nextBtn.anchorOffsetX = nextBtn.width / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, nextBtn, bottomBg, [30, 65]);
        nextBtn.scaleX = -1;
        view.addChild(nextBtn);
        view._nextBtn = nextBtn;
        var nextWardriceTxt = ComponentManager.getTextField("", 18, 0xc2b88b);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, nextWardriceTxt, nextBtn, [0, 0]);
        view.addChild(nextWardriceTxt);
        view._nextAwardRiceTxt = nextWardriceTxt;
        var curAwardRiceTxt = ComponentManager.getTextField("", 26, 0xfcf3b4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curAwardRiceTxt, awardbg, [0, -27]);
        view.addChild(curAwardRiceTxt);
        view._curAwardRiceTxt = curAwardRiceTxt;
        var flag = BaseBitmap.create("collectflag");
        flag.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, lqBtn);
        view.addChild(flag);
        flag.visible = false;
        view._collectflag = flag;
        view._curJindu = view.vo.getCurJindu();
        var midBuild = BaseBitmap.create("");
        view._midBuild = midBuild;
        view.addChild(midBuild);
        var group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth;
        group.height = GameConfig.stageHeigth;
        view.addChild(group);
        view._movieGroup = group;
        var _loop_1 = function (i) {
            var buildMask = BaseBitmap.create("arenabuild" + i + "-" + code);
            buildMask.addTouch(function (e) {
                if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                    if (buildMask.alpha == 0) {
                        buildMask.alpha = 0.3;
                    }
                    else {
                        buildMask.alpha = 0;
                    }
                }
                else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
                    buildMask.alpha = 0;
                }
                if (e.type == egret.TouchEvent.TOUCH_END) {
                    buildMask.alpha = 0;
                    if (GameData.serverTime < view.vo.et) {
                        //弹板
                        ViewController.getInstance().openView(view._pos[i].sceneName, {
                            code: view.code,
                            aid: view.aid
                        });
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    }
                }
            }, view, null, true);
            buildMask.setScale(4);
            buildMask.x = view._pos[i].x + view.viewBg.x;
            buildMask.y = view._pos[i].y + view.viewBg.y;
            view.addChild(buildMask);
            buildMask.alpha = 0;
            var buildName = ComponentManager.getButton("arenabuild" + i + "name-" + code, '', function () {
                //弹板
                if (GameData.serverTime < view.vo.et) {
                    //弹板
                    ViewController.getInstance().openView(view._pos[i].sceneName, {
                        code: view.code,
                        aid: view.aid
                    });
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                }
            }, view);
            buildName.x = view._pos[i].nameX + buildMask.x;
            buildName.y = view._pos[i].nameY + buildMask.y;
            view.addChild(buildName);
            buildName.name = "buildName" + i;
        };
        //建筑区域
        for (var i = 1; i <= 4; ++i) {
            _loop_1(i);
        }
        view.freshView();
    };
    AcArenaView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_ARENAINFO, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcArenaView.prototype.receiveData = function (data) {
        var view = this;
        // view.vo.setRankInfo(data.data.data);
    };
    AcArenaView.prototype.getBuildStatus = function () {
        var view = this;
        var status = 1;
        var arr = [0, 2, 4, 6, 8]; //view.cfg.animation;
        var curJindu = view.vo.getCurJindu();
        for (var i in arr) {
            if (curJindu >= arr[i]) {
                status = Number(i) + 1;
            }
        }
        return status;
    };
    AcArenaView.prototype.freshBuildStatus = function () {
        var view = this;
        var code = view.getUiCode();
        var midBuild = view._midBuild;
        var buildStatus = view.getBuildStatus();
        if (view._prevBuildStatus != buildStatus) {
            midBuild.setRes(buildStatus == 1 ? "" : "arenabuildstatus" + buildStatus + "-" + code);
            midBuild.x = view.viewBg.x + view._midPos[buildStatus].x;
            midBuild.y = view.viewBg.y + view._midPos[buildStatus].y;
            var aniNode = view._movieGroup;
            var curcfg = view._moviecfg[buildStatus];
            aniNode.removeChildren();
            if (buildStatus == 5) {
                view.showLihua();
            }
            else {
                var _loop_2 = function (key) {
                    var upgradeClip = ComponentManager.getCustomMovieClip("alliancetask_frame3", 6, 300);
                    upgradeClip.setScale(0.3);
                    upgradeClip.scaleX *= curcfg[key].scaleX;
                    upgradeClip.x = curcfg[key].x + view.viewBg.x;
                    upgradeClip.y = curcfg[key].y + view.viewBg.y;
                    egret.Tween.get(upgradeClip, { loop: false }).wait(260 * (Number(key) + 1)).call(function () {
                        upgradeClip.playWithTime(0);
                    }, this_1);
                    aniNode.addChild(upgradeClip);
                };
                var this_1 = this;
                for (var key in curcfg) {
                    _loop_2(key);
                }
            }
        }
        view._prevBuildStatus = buildStatus;
    };
    AcArenaView.prototype.prevClick = function () {
        var view = this;
        view._curJindu = Math.max(0, view._curJindu - 1);
        view.fresh_jindu(view._curJindu);
    };
    AcArenaView.prototype.nextClick = function () {
        var view = this;
        if (view._curJindu == 0) {
            view._curJindu = 1;
        }
        view._curJindu = Math.min(view.vo.getArr('teamReward').length, view._curJindu + 1);
        view.fresh_jindu(view._curJindu);
    };
    AcArenaView.prototype.fresh_jindu = function (jindu) {
        var view = this;
        var code = view.getUiCode();
        view._zziTxt.text = view.vo.getZongzi().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._zziTxt, view._numbg);
        var totalMeter = view.vo.getTotalRiceNum();
        var str = totalMeter >= view.vo.getEndMeter() ? LanguageManager.getlocal("acArenaEnd_" + this.getUiCode()) : (LanguageManager.getlocal("acArenaTotalNum_" + this.getUiCode(), [view.vo.getTotalRiceNum().toString()]));
        view._curMeterTxt.text = str; //
        if (totalMeter >= view.vo.getEndMeter()) {
            //
            //停止动画
            //view._boatclip.timeRate = 30;
            // if(AcDraftVoteView.CODE=="1"){
            // 	egret.Tween.removeTweens(view._dbboatbg);
            // 	egret.Tween.removeTweens(view._dbboatbg2);
            // 	view._boatclip.stop();
            // 	view._boatclip.playWithTime(1);
            // } 
            //`lihuahong`,`lihuahuang`,`lihualan`
        }
        var cur_jindu = jindu;
        //当前进度米数
        var curData = view.vo.getteamRewardDataById(cur_jindu);
        var curRice = '';
        if (curData) {
            curRice = curData.needMeter.toString();
        }
        else {
            curRice = '0';
        }
        view._curRiceTxt.text = curRice; //LanguageManager.getlocal(`acArenaRwardNum_${code}`, [curRice]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0, 2]);
        //下一个进度米数
        var nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
        var nextRice = '';
        if (nextData) {
            nextRice = nextData.needMeter.toString();
        }
        else {
            var prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
            view._curRiceTxt.text = prevData.needMeter.toString();
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0, 2]);
            nextRice = curData.needMeter.toString();
        }
        view._nextRiceTxt.text = nextRice;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextRiceTxt, view._dbnumricenextbg, [0, 2]);
        view.fresh_rewward(view._curJindu);
        //进度条
        var percent = 0;
        var totalRice = view.vo.getTotalRiceNum();
        var curMeter = 0;
        if (cur_jindu == 0) {
            curMeter = nextData.needMeter;
            nextData = view.vo.getteamRewardDataById(2);
            nextRice = nextData.needMeter.toString();
        }
        else {
            curMeter = curData.needMeter;
        }
        if (cur_jindu == 0) {
            percent = totalRice / curMeter;
        }
        else if (nextData) {
            percent = (totalRice - curMeter) / (nextData.needMeter - curMeter);
        }
        else {
            if (totalRice >= view.vo.getEndMeter()) {
                percent = 1;
            }
            else {
                var prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
                percent = (totalRice - curMeter) / (curMeter - prevData.needMeter);
            }
        }
        view._progressBar.setPercentage(percent);
        if (view._curJindu == view.vo.getCurJindu() && totalRice >= (nextData ? nextData.needMeter : curMeter)) {
            view._progressBar.resetIconPosition(575);
        }
        view._progressBar.setIconVisible(view._curJindu == view.vo.getCurJindu());
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._curMeterTxt, view, [0, view._progressBar.y + view._progressBar.height + 15 - view.y]);
    };
    AcArenaView.prototype.fresh_rewward = function (cur_jindu) {
        var view = this;
        var code = view.getUiCode();
        if (cur_jindu == 0) {
            cur_jindu = 1;
        }
        //进度奖励
        var prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
        var prevRice = '';
        if (prevData) {
            view._prevAwardRiceTxt.visible = view._prevBtn.visible = true;
            prevRice = prevData.needMeter.toString();
        }
        else {
            prevRice = '';
            view._prevAwardRiceTxt.visible = view._prevBtn.visible = false;
        }
        view._prevAwardRiceTxt.text = LanguageManager.getlocal("acArenaRwardNum_" + code, [prevRice]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._prevAwardRiceTxt, view._prevBtn, [view._prevBtn.width, 0]);
        var curData = view.vo.getteamRewardDataById(cur_jindu);
        var nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
        var curMeter = curData.needMeter;
        var nextMeter = 0; //n
        view._curAwardRiceTxt.text = LanguageManager.getlocal("acArenaRwardNum_" + code, [curMeter]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._bottomBg, [0, 82]);
        if (nextData) {
            view._nextAwardRiceTxt.visible = view._nextBtn.visible = true;
            nextMeter = nextData.needMeter;
        }
        else {
            view._nextAwardRiceTxt.visible = view._nextBtn.visible = false;
        }
        view._nextAwardRiceTxt.text = LanguageManager.getlocal("acArenaRwardNum_" + code, [nextMeter.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view._nextAwardRiceTxt, view._nextBtn, [view._nextBtn.width - 25, 0]);
        view._nextAwardRiceTxt.x = view._nextBtn.x - view._nextAwardRiceTxt.textWidth - 25;
        view._scrollList.refreshData(view.vo.gerCurRiceAward(view._curJindu), code);
        view._scrollList.width = (view.vo.gerCurRiceAward(view._curJindu)).length > 3 ? 480 : 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._scrollList, view._awardbg);
        var curTotalMeter = view.vo.getTotalRiceNum();
        if (curTotalMeter >= curMeter) {
            view._collectflag.visible = view.vo.isGetJinduAward(view._curJindu);
            view._lqBtn.setEnable(true);
        }
        else {
            view._collectflag.visible = false;
            view._lqBtn.setEnable(false);
        }
        view._lqBtn.visible = !view._collectflag.visible;
        //小红点
        if (prevData && view.vo.isCanLqAwardJindu(view._curJindu - 1)) {
            App.CommonUtil.addIconToBDOC(view._prevBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._prevBtn);
        }
        if (nextData && view.vo.isCanLqAwardJindu(view._curJindu + 1, true)) {
            App.CommonUtil.addIconToBDOC(view._nextBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._nextBtn);
        }
    };
    AcArenaView.prototype.lqClick = function () {
        var view = this;
        if (GameData.serverTime < view.vo.et) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU, {
                activeId: view.acTivityId,
                rechargeId: view._curJindu
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    };
    AcArenaView.prototype.lqJinduAward = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            return;
        }
        view.fresh_rewward(view._curJindu);
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = new egret.Point(view.width / 2, GameConfig.stageHeigth - 200);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcArenaView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x + (view._timebg.width - view._timeCountTxt.width) * 0.5;
    };
    AcArenaView.prototype.clickItemHandler = function (event) {
        var view = this;
        var index = Number(event.data);
        var arr = view.vo.gerCurRiceAward(view._curJindu);
        var item = arr[index];
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item.id);
    };
    AcArenaView.prototype.freshView = function () {
        //第一页 红点
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var view = this;
        var buildName1 = view.getChildByName("buildName1");
        if (vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(buildName1);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(buildName1);
        }
        var buildName2 = view.getChildByName("buildName2");
        if (vo.getpublicRedhot3()) {
            App.CommonUtil.addIconToBDOC(buildName2);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(buildName2);
        }
        var jindu = view.vo.getCurJindu();
        view.fresh_jindu(jindu);
        view.freshBuildStatus();
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcArenaView.prototype.getReportTipData = function () {
        return { title: { key: "acArenareporttitle-" + this.code }, msg: { key: "acArenareportmsg-" + this.code } };
    };
    AcArenaView.prototype.showLihua = function () {
        var view = this;
        //dblamp1
        // let dblamp1 = ComponentManager.getCustomMovieClip("dblamp",2,800);
        // dblamp1.width = 57;
        // dblamp1.height = 181;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dblamp1, view._movieGroup, [15,315], true);
        // view._movieGroup.addChild(dblamp1);
        // let dblamp2 = ComponentManager.getCustomMovieClip("dblamp",2,800);
        // dblamp2.width = 57;
        // dblamp2.height = 181;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, dblamp2, view._movieGroup, [15,315], true);
        // view._movieGroup.addChild(dblamp2);
        // let dblamp3 = ComponentManager.getCustomMovieClip("dblamp",2,800);
        // dblamp3.width = 57;
        // dblamp3.height = 181;
        // dblamp3.setScale(0.7);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dblamp3, dblamp1, [15+dblamp1.width,0-40]);
        // view._movieGroup.addChild(dblamp3);
        // let dblamp4 = ComponentManager.getCustomMovieClip("dblamp",2,800);
        // dblamp4.width = 57;
        // dblamp4.height = 181;
        // dblamp4.setScale(0.7);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, dblamp4, dblamp2, [15+dblamp2.width,0-40]);
        // view._movieGroup.addChild(dblamp4);
        // dblamp1.playWithTime(-1);
        // dblamp2.playWithTime(-1);
        // dblamp3.playWithTime(-1);
        // dblamp4.playWithTime(-1);
        var deviationNum = 0;
        var param = {
            1: { color: 'hong', pos: [500, 340 + deviationNum], scale: 0.9, wait: 0 },
            2: { color: 'huang', pos: [80, 310 + deviationNum], scale: 1.85, wait: 200 },
            3: { color: 'huang', pos: [300, 300 + deviationNum], scale: 1.5, wait: 400 },
            4: { color: 'lan', pos: [200, 250 + deviationNum], scale: 2, wait: 650 },
            5: { color: 'hong', pos: [40, 360 + deviationNum], scale: 1, wait: 900 }
        };
        var ths = this;
        var _loop_3 = function (i) {
            if (view._movieGroup && !view._movieGroup.getChildByName("lihua" + i)) {
                var unit = param[i];
                var lihuaclip_1 = ComponentManager.getCustomMovieClip("lihua" + unit.color, 10, 115);
                lihuaclip_1.setScale(unit.scale);
                lihuaclip_1.name = "lihua" + i;
                lihuaclip_1.x = unit.pos[0];
                lihuaclip_1.y = unit.pos[1];
                view._movieGroup.addChild(lihuaclip_1);
                egret.Tween.get(lihuaclip_1).wait(unit.wait).call(function () {
                    egret.Tween.removeTweens(lihuaclip_1);
                    if (view._movieGroup) {
                        view._movieGroup.addChild(lihuaclip_1);
                        lihuaclip_1.playWithTime(-1);
                    }
                }, view);
            }
        };
        for (var i in param) {
            _loop_3(i);
        }
    };
    AcArenaView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU), view.lqJinduAward, view);
        view._timeCountTxt = null;
        view._timebg = null;
        view._progressBar = null;
        view._numbg = null;
        view._zziTxt = null;
        view._curMeterTxt = null;
        view._dbnumricecurbg = null;
        view._curRiceTxt = null;
        view._dbnumricenextbg = null;
        view._nextRiceTxt = null;
        view._collectflag = null;
        view._curJindu = 0;
        view._awardbg = null;
        view._scrollList = null;
        view._lqBtn = null;
        view._prevBtn = null;
        view._prevAwardRiceTxt = null;
        view._nextBtn = null;
        view._nextAwardRiceTxt = null;
        view._bottomBg = null;
        view._midBuild = null;
        view._movieGroup.dispose();
        view._movieGroup = null;
        view._prevBuildStatus = 0;
        _super.prototype.dispose.call(this);
    };
    return AcArenaView;
}(AcCommonView));
__reflect(AcArenaView.prototype, "AcArenaView");
//# sourceMappingURL=AcArenaView.js.map