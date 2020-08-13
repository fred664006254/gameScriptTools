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
desc : 劳动节活动
*/
var AcLaborDayView = (function (_super) {
    __extends(AcLaborDayView, _super);
    function AcLaborDayView() {
        var _this = _super.call(this) || this;
        _this._rewardBtn = null;
        _this._clickIdx = 0;
        _this._timeCountTxt = null;
        _this._topbg = null;
        _this._pos = {
            1: { x: 437, y: 524 },
            2: { x: 252, y: 576 },
            3: { x: 82, y: 540 },
            4: { x: 130, y: 625 },
            5: { x: 373, y: 671 },
            6: { x: 0, y: 666 },
            7: { x: 153, y: 774 },
            8: { x: 166, y: 926 },
        };
        return _this;
    }
    Object.defineProperty(AcLaborDayView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    //
    AcLaborDayView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_LABORINFO, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcLaborDayView.prototype.receiveData = function (data) {
        var view = this;
        // view.vo.setRankInfo(data.data.data);
    };
    AcLaborDayView.prototype.initBg = function () {
        var _this = this;
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
        var len = Object.keys(view.cfg.teamReward).length;
        var _loop_1 = function (i) {
            var status_1 = view.vo.getLandStatusById(i);
            var land = BaseLoadBitmap.create("laborland" + i + "_" + status_1 + "-" + view.getUiCode(), null, {
                callback: function () {
                    var curjindu = view.vo.getCurJindu();
                    var landGroup = new BaseDisplayObjectContainer();
                    landGroup.width = 51;
                    landGroup.height = 62;
                    landGroup.anchorOffsetX = landGroup.width / 2;
                    landGroup.anchorOffsetY = landGroup.height;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, landGroup, land, [0, -42]);
                    landGroup.name = "landgroup" + i;
                    view.addChild(landGroup);
                    var bubble = BaseBitmap.create("labordaybubble-" + view.getUiCode());
                    landGroup.addChild(bubble);
                    var boxstatus = Math.max(1, status_1 - 1);
                    var box = BaseBitmap.create("labordaybox" + boxstatus + "-" + view.getUiCode());
                    box.name = "landbox" + i;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, box, bubble);
                    landGroup.addChild(box);
                    if (boxstatus == 1) {
                        var tmpY = landGroup.y;
                        egret.Tween.get(landGroup, { loop: true }).
                            to({ y: tmpY + 5 }, 1000).
                            to({ y: tmpY }, 1000);
                    }
                    else if (boxstatus == 2 && !view.vo.isGetJinduAward(i)) {
                        /**
                         * 混合叠加模式，播放速度0.07秒每张图。

                        摇摆动画：
                        旋转：0  -5   8   -6    5    -4   3   -2    1    -1   每个过程用时0.066秒.
                        -1  至 0 用时0.1秒 .
                        间隔0.3秒后再次摇摆.
                         *  */
                        var laborboxeff = ComponentManager.getCustomMovieClip("laborboxeff" + view.getUiCode() + "-", 10, 70);
                        laborboxeff.name = "laborboxeff" + i;
                        laborboxeff.blendMode = egret.BlendMode.ADD;
                        laborboxeff.width = 115;
                        laborboxeff.height = 122;
                        laborboxeff.anchorOffsetX = laborboxeff.width / 2;
                        laborboxeff.anchorOffsetY = laborboxeff.height / 2;
                        laborboxeff.playWithTime(-1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, laborboxeff, box);
                        landGroup.addChild(laborboxeff);
                        var time1 = 130;
                        var time2 = 200;
                        egret.Tween.get(landGroup, { loop: true }).
                            to({ rotation: -5 }, time1).
                            to({ rotation: 8 }, time1).
                            to({ rotation: -6 }, time1).
                            to({ rotation: 5 }, time1).
                            to({ rotation: -4 }, time1).
                            to({ rotation: 3 }, time1).
                            to({ rotation: -2 }, time1).
                            to({ rotation: 1 }, time1).
                            to({ rotation: -1 }, time1).
                            to({ rotation: 0 }, time2).
                            wait(600);
                    }
                    box.addTouchTap(function () {
                        if (view._clickIdx > 0) {
                            return;
                        }
                        var status = view.vo.getLandStatusById(i);
                        var boxRewardId = i;
                        var lqFlag = view.vo.isGetJinduAward(i);
                        if (lqFlag || status < 3) {
                            // this.playBoxAni(boxRewardId);
                            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, {
                                'type': AcConst.AID_LABORDAY,
                                'id': boxRewardId,
                                "code": _this.code
                            });
                        }
                        else {
                            view._clickIdx = i;
                            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LABORJINDU, {
                                activeId: view.acTivityId,
                                rechargeId: boxRewardId
                            });
                        }
                    }, view);
                    var lqFlag = view.vo.isGetJinduAward(i);
                    if ((!lqFlag && status_1 == 3) || curjindu == i) {
                        //发光效果
                        landGroup.alpha = 1;
                    }
                    else {
                        landGroup.alpha = 0.7;
                    }
                    //进度条
                    var progressbar = ComponentManager.getProgressBar("labordayprogress-" + view.getUiCode(), "labordayprogress_bg-" + view.getUiCode(), 138);
                    progressbar.setTextSize(14);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, progressbar, land, [13.5, 25]);
                    view.addChild(progressbar);
                    progressbar.name = "progressbar" + i;
                    var percent = view.vo.getJinduPercent(i);
                    progressbar.setPercentage(percent, view.vo.getTotalRiceNum() + "/" + view.cfg.teamReward[i - 1].needMeter);
                    var progressicon = BaseBitmap.create("labordayprogressicon-" + view.getUiCode());
                    progressicon.name = "progressicon" + i;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressicon, progressbar, [-27, 0]);
                    view.addChild(progressicon);
                    if (curjindu == i && status_1 < 3) {
                        progressicon.visible = progressbar.visible = true;
                    }
                    else {
                        progressicon.visible = progressbar.visible = false;
                    }
                },
                callbackThisObj: view
            });
            land.x = view._pos[i].x;
            land.y = view._pos[i].y + view.viewBg.y;
            land.name = "land" + i;
            view.addChild(land);
        };
        for (var i = 1; i <= len; ++i) {
            _loop_1(i);
        }
    };
    AcLaborDayView.prototype.getBgName = function () {
        return "labordaybg-" + this.getUiCode();
    };
    AcLaborDayView.prototype.initView = function () {
        var view = this;
        view._clickIdx = 0;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH, this.update, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LABORJINDU), view.jinduCallBack, view);
        //top背景图
        var topbg = BaseBitmap.create("labortop-" + view.getUiCode());
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(topbg);
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true), 20);
        // 423 205
        timeTxt.width = 385;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [225, 73]);
        view.addChild(timeTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLaborTip1-" + view.code), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 385;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 5]);
        view.addChild(tipTxt);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y + topbg.height - 14);
        view._topbg = timebg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y + 6;
        timebg.width = tip2Text.width + 50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = view._topbg.x + (view._topbg.width - view._timeCountTxt.width) * 0.5;
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topbg.x + 103 - skinTxtEffectBM.width / 2, topbg.y + 160 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topbg.x + 103, topbg.y + 160);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topbg.x + 103, topbg.y + 160);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACLABORDAYSKINPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, ViewController);
        var rewardBtn = ComponentManager.getButton("labordayreward-" + view.getUiCode(), '', function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACLABORDAYPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rewardBtn, view, [40, 35]);
        view.addChild(rewardBtn);
        view._rewardBtn = rewardBtn;
        var shopBtn = ComponentManager.getButton("labordayshop-" + view.getUiCode(), '', function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACLABORDAYPOPUPVIEW, {
                aid: view.aid,
                code: view.code,
                index: 3
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, shopBtn, view, [40, 35]);
        view.addChild(shopBtn);
        view.update();
        view.setChildIndex(view.closeBtn, 99999);
    };
    AcLaborDayView.prototype.jinduCallBack = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            var rewards = data.rewards;
            var rewardList_1 = GameData.formatRewardItem(rewards);
            var group_1 = view.getChildByName("landgroup" + view._clickIdx);
            var pos_1 = null;
            if (group_1) {
                var box_1 = group_1.getChildByName("landbox" + view._clickIdx);
                var boomeff_1 = ComponentManager.getCustomMovieClip("laborboxboom" + view.getUiCode() + "-", 7, 70);
                boomeff_1.blendMode = egret.BlendMode.ADD;
                boomeff_1.width = 194;
                boomeff_1.height = 196;
                boomeff_1.anchorOffsetX = boomeff_1.width / 2;
                boomeff_1.anchorOffsetY = boomeff_1.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeff_1, box_1, [1, -5]);
                group_1.addChild(boomeff_1);
                boomeff_1.playWithTime(1);
                var landeff = group_1.getChildByName("laborboxeff" + view._clickIdx);
                if (landeff) {
                    egret.Tween.get(landeff).to({ alpha: 0 }, 700).call(function () {
                        egret.Tween.removeTweens(group_1);
                    }, view);
                }
                boomeff_1.setEndCallBack(function () {
                    group_1.removeChild(boomeff_1);
                    var land = view.getChildByName("land" + view._clickIdx);
                    if (land) {
                        /*混合叠加模式，播放速度0.07秒每张图。
                        点击后。光效效果淡出用时0.7秒。*/
                        egret.Tween.get(land).to({ alpha: 0 }, 500).call(function () {
                            egret.Tween.removeTweens(land);
                            var status = view.vo.getLandStatusById(view._clickIdx);
                            var boxstatus = Math.max(1, status - 1);
                            group_1.alpha = 0.7;
                            var landeff = group_1.getChildByName("laborboxeff" + view._clickIdx);
                            if (landeff) {
                                egret.Tween.removeTweens(group_1);
                                landeff.dispose();
                            }
                            land.setload("laborland" + view._clickIdx + "_" + status + "-" + view.getUiCode());
                            land.alpha = 1;
                            view._clickIdx = 0;
                            box_1.setRes("labordaybox" + boxstatus + "-" + view.getUiCode());
                            pos_1 = new egret.Point(group_1.x + group_1.width / 2, group_1.y + group_1.height / 2);
                            App.CommonUtil.playRewardFlyAction(rewardList_1, pos_1);
                        }, view);
                    }
                }, view);
            }
            else {
                pos_1 = new egret.Point(view.width / 2, GameConfig.stageHeigth - 200);
                view._clickIdx = 0;
                App.CommonUtil.playRewardFlyAction(rewardList_1, pos_1);
            }
        }
    };
    AcLaborDayView.prototype.freshLand = function () {
        var view = this;
        var len = Object.keys(view.cfg.teamReward).length;
        for (var i = 1; i <= len; ++i) {
            var curJindu = view.vo.getCurJindu();
            var land = view.getChildByName("land" + i);
            if (land && view._clickIdx !== i) {
                var status_2 = view.vo.getLandStatusById(i);
                land.setload("laborland" + i + "_" + status_2 + "-" + view.getUiCode());
                var landGroup = view.getChildByName("landgroup" + i);
                if (landGroup) {
                    var boxstatus = Math.max(1, status_2 - 1);
                    var box = landGroup.getChildByName("landbox" + i);
                    if (box) {
                        box.setRes("labordaybox" + boxstatus + "-" + view.getUiCode());
                        var lqFlag = view.vo.isGetJinduAward(i);
                        if ((!lqFlag && status_2 == 3) || curJindu == i) {
                            //发光效果
                            landGroup.alpha = 1;
                        }
                        else {
                            landGroup.alpha = 0.7;
                        }
                    }
                    var landeff = landGroup.getChildByName("laborboxeff" + i);
                    if (!landeff && boxstatus == 2 && !view.vo.isGetJinduAward(i)) {
                        egret.Tween.removeTweens(landGroup);
                        var laborboxeff = ComponentManager.getCustomMovieClip("laborboxeff" + view.getUiCode() + "-", 10, 70);
                        laborboxeff.name = "laborboxeff" + i;
                        laborboxeff.blendMode = egret.BlendMode.ADD;
                        laborboxeff.width = 115;
                        laborboxeff.height = 124;
                        laborboxeff.anchorOffsetX = laborboxeff.width / 2;
                        laborboxeff.anchorOffsetY = laborboxeff.height / 2;
                        laborboxeff.playWithTime(-1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, laborboxeff, box);
                        landGroup.addChild(laborboxeff);
                        var time1 = 130;
                        var time2 = 200;
                        egret.Tween.get(landGroup, { loop: true }).
                            to({ rotation: -5 }, time1).
                            to({ rotation: 8 }, time1).
                            to({ rotation: -6 }, time1).
                            to({ rotation: 5 }, time1).
                            to({ rotation: -4 }, time1).
                            to({ rotation: 3 }, time1).
                            to({ rotation: -2 }, time1).
                            to({ rotation: 1 }, time1).
                            to({ rotation: -1 }, time1).
                            to({ rotation: 0 }, time2).
                            wait(600);
                    }
                    else {
                        if (landeff && view.vo.isGetJinduAward(i)) {
                            egret.Tween.removeTweens(landGroup);
                            landeff.dispose();
                        }
                    }
                    var progressbar = view.getChildByName("progressbar" + i);
                    var progressicon = view.getChildByName("progressicon" + i);
                    if (progressbar) {
                        var percent = view.vo.getJinduPercent(i);
                        progressbar.setPercentage(percent, view.vo.getTotalRiceNum() + "/" + view.cfg.teamReward[i - 1].needMeter);
                        if (curJindu == i && status_2 < 3) {
                            progressicon.visible = progressbar.visible = true;
                        }
                        else {
                            progressicon.visible = progressbar.visible = false;
                        }
                    }
                }
            }
        }
    };
    AcLaborDayView.prototype.getRuleInfo = function () {
        return "acLaborDayRuleInfo-" + this.code;
    };
    AcLaborDayView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "labordaybg-" + code, "acwealthcarpview_servantskintxt", "acwealthcarpview_skineffect1", "acwealthcarpview_skineffect",
            "aclaborday" + code, "laborboxeff" + code + "-", "laborboxboom" + code + "-"
        ]).concat(arr);
    };
    // public get tabHeight():number{
    //     let view = this;
    //     return view._bottomBg.height;
    // }
    // public get tabWidth():number{
    //     let view = this;
    //     return view.width;
    // }
    AcLaborDayView.prototype.update = function () {
        var view = this;
        //第一页 红点
        var vo = view.vo;
        if (!vo) {
            return;
        }
        if (vo.getpublicRedhot2() || vo.getpublicRedhot3()) {
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
        //  if(this.public_dot1)
        //  {
        //      this.public_dot1.visible = vo.getpublicRedhot1();
        //  }
        //  //第二页 红点
        //  if(this.public_dot2)
        //  {
        //       this.public_dot2.visible =  vo.getpublicRedhot2();
        //  }    
        //  //第三页 红点
        //  if(this.public_dot3)
        //  {
        //       this.public_dot3.visible =  vo.getpublicRedhot3();
        //  }   
        // if(this.code=="5")
        // {
        //     this.tabbarGroup.visible =false; 
        //     this.public_dot3.visible =false;
        //     this.public_dot2.visible =false;
        //     this.public_dot1.visible =false;
        // }  
        view.freshLand();
    };
    AcLaborDayView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._topbg.x = GameConfig.stageWidth - view._topbg.width - 12;
        view._timeCountTxt.x = view._topbg.x + (view._topbg.width - view._timeCountTxt.width) * 0.5;
    };
    AcLaborDayView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcLaborDayView.prototype.dispose = function () {
        var view = this;
        view._timeCountTxt = null;
        view._clickIdx = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH, this.update, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LABORJINDU), view.jinduCallBack, view);
        view._rewardBtn = null;
        var len = Object.keys(view.cfg.teamReward).length;
        var curJindu = view.vo.getCurJindu();
        for (var i = 1; i <= len; ++i) {
            var land = view.getChildByName("land" + i);
            if (land) {
                var landGroup = view.getChildByName("landgroup" + i);
                if (landGroup) {
                    var box = landGroup.getChildByName("landbox" + i);
                    if (box) {
                        box.removeTouchTap();
                        box.dispose();
                    }
                    var landeff = landGroup.getChildByName("laborboxeff" + i);
                    if (landeff) {
                        egret.Tween.removeTweens(landGroup);
                        landeff.dispose();
                    }
                    landGroup.dispose();
                }
                var progressbar = view.getChildByName("progressbar" + i);
                if (progressbar) {
                    progressbar.dispose();
                }
                var progressicon = view.getChildByName("progressicon" + i);
                if (progressicon) {
                    progressicon.dispose();
                }
                land.dispose();
            }
        }
        _super.prototype.dispose.call(this);
    };
    return AcLaborDayView;
}(AcCommonView));
__reflect(AcLaborDayView.prototype, "AcLaborDayView");
//# sourceMappingURL=AcLaborDayView.js.map