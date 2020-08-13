/**
  * 海滨伊人 活动
  * @author shaoliang
  * date 2020/7/7
  * @class AcSeaWomanView
  */
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
var AcSeaWomanView = /** @class */ (function (_super) {
    __extends(AcSeaWomanView, _super);
    function AcSeaWomanView() {
        var _this = _super.call(this) || this;
        _this._timeRechargeTxt = null;
        _this._acTimeText = null;
        _this._playTimesText = null;
        _this._canplayTimesText = null;
        _this._rewardNodeTab = [];
        _this._playNodeTab = [];
        _this._showId = 0;
        _this._touchId = 0;
        _this._shakeId = 0;
        _this._fullFlag = false;
        _this._delFlag = false;
        _this._isPlaying = false;
        _this._detailBtn = null;
        return _this;
    }
    // 标题背景名称
    AcSeaWomanView.prototype.getTitleBgName = function () {
        return "seawoman_title-" + this.getUiCode();
    };
    AcSeaWomanView.prototype.getTitleStr = function () {
        return null;
    };
    AcSeaWomanView.prototype.getBgName = function () {
        return "seawoman_bg-" + this.getUiCode();
    };
    AcSeaWomanView.prototype.getRuleBtnName = function () {
        return "seawoman_rule-" + this.getUiCode();
    };
    AcSeaWomanView.prototype.getRuleInfo = function () {
        return "acSeaWomanRuleInfo-" + this.getUiCode();
    };
    AcSeaWomanView.prototype.getCloseBtnName = function () {
        return "seawoman_close-" + this.getUiCode();
    };
    Object.defineProperty(AcSeaWomanView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSeaWomanView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcSeaWomanView.prototype.getRuleInfoParam = function () {
        return [String(this.cfg.cost)];
    };
    AcSeaWomanView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "seawomancode" + code, "seawoman_bg-" + code, "seawoman_middlebg-" + code, "seawoman_topbg-" + code,
            "acwealthcarpview_skineffect", "acsearchproofview_common_skintxt", "acmousegold_yun1", "acmousegold_yun2",
            "seawoman_effect_haixing", "seawoman_effect_open", "seawoman_effect_bomb", "seawoman_effect_openball"
        ]);
    };
    AcSeaWomanView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        this.viewBg.y = (GameConfig.stageHeigth - 1136) / 2.03;
    };
    AcSeaWomanView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acSeaWomanProbablyInfo", this.code);
    };
    AcSeaWomanView.prototype.initProbablyBtn = function () {
        if (Api.switchVoApi.checkOpenProbably() == true && this.getProbablyInfo()) {
            var probablyBtn = ComponentManager.getButton("seawoman_probably-" + this.getUiCode(), "", this.clickProbablyBtnHandler, this);
            var posX = 12;
            if (PlatformManager.hasSpcialCloseBtn()) {
                posX += 80;
            }
            if (this._ruleBtn) {
                posX = this._ruleBtn.x + this._ruleBtn.width + 10;
            }
            probablyBtn.x = posX;
            probablyBtn.y = 22;
            this.addChild(probablyBtn);
        }
    };
    AcSeaWomanView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        this.closeBtn.y = 12;
        this.closeBtn.x = 573;
        this._ruleBtn.y = 15;
        var offset = 1136 - GameConfig.stageHeigth;
        var code = this.getUiCode();
        var vo = this.vo;
        var key = this.acTivityId + Api.playerVoApi.getPlayerID() + String(vo.st);
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
                idx: "acSeawoman_1-" + this.getUiCode(), f: function () {
                }, o: this
            });
            LocalStorageManager.set(key, vo.aidAndCode);
        }
        var rewardstr = this.cfg.change["getItem"];
        var rewardvo = GameData.formatRewardItem(rewardstr)[0];
        var skincfg = Config.WifeskinCfg.getWifeCfgById(rewardvo.id);
        var skinBone = skincfg.bone;
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(skinBone + "_ske")) {
            var wifeskinDB = App.DragonBonesUtil.getLoadDragonBones(skinBone);
            wifeskinDB.setScale(0.58);
            wifeskinDB.setPosition(150, 500 - offset * 0.4);
            this.addChildToContainer(wifeskinDB);
        }
        else {
            var wifeskinPic = BaseLoadBitmap.create(skincfg.body);
            wifeskinPic.width = 640 * 0.45;
            wifeskinPic.height = 840 * 0.45;
            wifeskinPic.setPosition(0, 173 - offset * 0.4);
            this.addChildToContainer(wifeskinPic);
        }
        //亦庄预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(148 - skinTxtEffectBM.width / 2, 350 - offset * 0.4);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxteffect, skinTxt);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect);
        view.addChildToContainer(touchPos);
        touchPos.addTouchTap(function () {
            if (_this._isPlaying) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEWTAB3, {
                aid: _this.aid,
                code: _this.code,
                uicode: _this.getUiCode()
            });
        }, ViewController);
        //活动信息
        var topbg = BaseBitmap.create("seawoman_topbg-" + code);
        topbg.setPosition(250, 122 - offset * 0.12);
        view.addChildToContainer(topbg);
        var timeTxt = ComponentManager.getTextField(view.vo.getAcLocalTime(true, "0xfff7e8"), 18, TextFieldConst.COLOR_BLUE);
        timeTxt.width = 600;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [25, 23]);
        view.addChildToContainer(timeTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSeaWomanDesc-" + code, [String(this.cfg.cost)]), 18, TextFieldConst.COLOR_BLACK);
        tipTxt.width = topbg.width - 50;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 8]);
        view.addChildToContainer(tipTxt);
        var rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSeaWomanRechargeInfo-" + code, [String(this.vo.getNextTimeNeedRecharge())]), 18, TextFieldConst.COLOR_BLACK);
        rechargeTxt.width = tipTxt.width;
        rechargeTxt.lineSpacing = 3;
        rechargeTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rechargeTxt, topbg, [0, 46]);
        view.addChildToContainer(rechargeTxt);
        this._timeRechargeTxt = rechargeTxt;
        var timebg = BaseBitmap.create("seawoman_timebg-" + code);
        timebg.setPosition(topbg.x + 23, topbg.y + topbg.height - 25);
        view.addChildToContainer(timebg);
        var timeText = ComponentManager.getTextField(this.vo.getCountDownTime(), 18, TextFieldConst.COLOR_WHITE);
        timebg.width = timeText.width + 30;
        timeText.width = 320;
        timeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeText, timebg);
        view.addChildToContainer(timeText);
        this._acTimeText = timeText;
        var greenGrass = BaseBitmap.create("seawoman_grass-" + code);
        greenGrass.setPosition(topbg.x + topbg.width - 22, topbg.y + topbg.height - 112);
        view.addChildToContainer(greenGrass);
        //middle
        var middleBg = BaseBitmap.create("seawoman_middlebg-" + code);
        middleBg.setPosition(GameConfig.stageWidth / 2 - middleBg.width / 2, this.viewBg.y + 475 - offset * 0.12);
        view.addChildToContainer(middleBg);
        var detailBtn = ComponentManager.getButton("seawoman_detail-" + code, null, this.detailBtnHandler, this);
        detailBtn.setPosition(GameConfig.stageWidth - 113, middleBg.y - 60);
        view.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 51;
            reddot.y = 10;
        }
        var timesbg = BaseBitmap.create("seawoman_timesbg-" + code);
        timesbg.setPosition(middleBg.x + middleBg.width / 2 - timesbg.width / 2, middleBg.y - 18);
        view.addChildToContainer(timesbg);
        var canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes-" + code, [String(this.vo.num)]);
        if (this.vo.isFree()) {
            canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes2-" + code, [String(this.vo.num)]);
        }
        var canplaytimeText = ComponentManager.getTextField(canplaystr, 18, TextFieldConst.COLOR_BLACK);
        canplaytimeText.width = 220;
        canplaytimeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, canplaytimeText, timesbg);
        view.addChildToContainer(canplaytimeText);
        this._canplayTimesText = canplaytimeText;
        //底部
        var playtimesBg1 = BaseBitmap.create("seawoman_timesbg1-" + code);
        playtimesBg1.setPosition(17, middleBg.y + middleBg.height + 28 - offset * 0.05);
        view.addChildToContainer(playtimesBg1);
        playtimesBg1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEW, {
                aid: _this.aid,
                code: _this.code,
                uicode: _this.getUiCode()
            });
        }, this);
        var playtimesBg2 = BaseBitmap.create("seawoman_timesbg2-" + code);
        playtimesBg2.setPosition(playtimesBg1.x + 32, playtimesBg1.y - 18);
        view.addChildToContainer(playtimesBg2);
        var playstr = LanguageManager.getlocal("acSeaWomanPlayTimes-" + code, [String(this.vo.ainfo.v)]);
        var playtimeText = ComponentManager.getTextField(playstr, 18, TextFieldConst.COLOR_WHITE);
        playtimeText.width = 120;
        playtimeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playtimeText, playtimesBg2);
        view.addChildToContainer(playtimeText);
        this._playTimesText = playtimeText;
        var scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 460, 90);
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        this.addChildToContainer(scrollView);
        scrollView.setPosition(GameConfig.stageWidth - rect.width, playtimesBg2.y + 6);
        scrollView.verticalScrollPolicy = "off";
        var cfgs = this.cfg.chessNum;
        for (var i = 0; i < cfgs.length; i++) {
            var oneNode = new SeaWomanRewardNode();
            oneNode.init(cfgs[i], code, this.rewardHandle, this);
            oneNode.setPosition(i * 114, 0);
            scrollContiner.addChild(oneNode);
            oneNode.setShowType(this.vo.getAchievementType(i + 1));
            this._rewardNodeTab.push(oneNode);
        }
        scrollContiner.width += 10;
        scrollView.setScrollLeft(scrollContiner.width - rect.width);
        egret.Tween.get(scrollView).wait(1).call(function () {
            scrollView.setScrollLeft(0, 1000);
        });
        for (var i = 1; i <= 16; i++) {
            var onePlay = new SeaWomanPlayNode();
            onePlay.init(i, code, this.playHandle, this);
            onePlay.setPosition(70 + (i - 1) % 4 * 125, middleBg.y + 0 + Math.floor((i - 1) / 4) * 115);
            this.addChildToContainer(onePlay);
            this._playNodeTab.push(onePlay);
            var oneinfo = this.vo.getMapInfo(i);
            if (oneinfo) {
                onePlay.setInfo(oneinfo);
            }
            else {
                onePlay.setEmpty();
            }
        }
        this._showId = this.vo.getShowId();
        if (this._showId) {
            this._shakeId = this.vo.getShakeId(this._showId);
            if (this._shakeId) {
                this._playNodeTab[this._shakeId - 1].setShake(true);
            }
        }
        var sunnyBone = "acseawomanview_sun";
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(sunnyBone + "_ske")) {
            var sunBone = App.DragonBonesUtil.getLoadDragonBones(sunnyBone);
            sunBone.setPosition(0, 90);
            this.addChild(sunBone);
        }
    };
    AcSeaWomanView.prototype.rewardHandle = function (id) {
        if (this._isPlaying) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEW, {
            aid: this.aid,
            code: this.code,
            uicode: this.getUiCode(),
            id: id
        });
    };
    AcSeaWomanView.prototype.playHandle = function (onePlay) {
        if (onePlay._show || this._isPlaying) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.num <= 0 && this.vo.isFree() == false) {
            var view_1 = this;
            var code = this.getUiCode();
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal("acSeaWomanRechargeTip-" + code),
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    if (!view_1.vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                        return;
                    }
                    //充值
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handle: view_1,
                needClose: 1,
                needCancel: true,
                confirmTxt: "gotocharge"
            });
            return;
        }
        this._isPlaying = true;
        this._touchId = onePlay._id;
        if (this._shakeId) {
            this._playNodeTab[this._shakeId - 1].setShake(false);
            this._shakeId = 0;
        }
        this.request(NetRequestConst.REQUEST_AC_SEAWOMANFLOP, { activeId: this.acTivityId, pos: String(onePlay._id) });
    };
    AcSeaWomanView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_AC_SEAWOMANFLOP) {
                var rData = data.data.data;
                var rewards = rData.rewards;
                var replacerewards = rData.replacerewards;
                var rewardsVo = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardsVo);
                if (replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
                }
                this._delFlag = rData.delFlag;
                this._fullFlag = rData.fullFlag;
                if (this._delFlag == false && this._showId == 0) {
                    view._playNodeTab[this._touchId - 1].setShow(true, true, null, null);
                    this._isPlaying = false;
                    this._showId = this._touchId;
                    this._touchId = 0;
                    this._shakeId = this.vo.getShakeId(this._showId);
                    if (this._shakeId) {
                        this._playNodeTab[this._shakeId - 1].setShake(true);
                    }
                }
                else {
                    view._playNodeTab[this._touchId - 1].setShow(true, true, function () {
                        view.resetPlayNode();
                    }, view);
                }
                // egret.Tween.get(this.container).wait(500).call(this.resetPlayNode,this);
            }
        }
        else {
            if (data.data.cmd == NetRequestConst.REQUEST_AC_SEAWOMANFLOP) {
                this._isPlaying = false;
            }
        }
    };
    AcSeaWomanView.prototype.resetPlayNode = function () {
        //消除
        var view = this;
        if (this._delFlag) {
            if (!this._showId || !this._touchId) {
                return;
            }
            this._delFlag = false;
            this._playNodeTab[this._showId - 1].setRemove(null, null);
            this._playNodeTab[this._touchId - 1].setRemove(function () {
                view.checkFull();
            }, view);
            this._showId = 0;
            this._touchId = 0;
            // egret.Tween.get(this.container).wait(500).call(this.checkFull,this);
        }
        //没消除
        else {
            //第二个
            if (this._showId) {
                this._playNodeTab[this._showId - 1].setShow(false, true, null, null);
                this._playNodeTab[this._touchId - 1].setShow(false, true, function () {
                    view._isPlaying = false;
                }, view);
                this._showId = 0;
                this._touchId = 0;
            }
            else {
                // this._showId = this._touchId;
                // this._touchId = 0;
                // // this._playNodeTab[this._showId-1].setShow(false,true,()=>{
                //     // this._isPlaying = false;
                //      this._shakeId = this.vo.getShakeId(this._showId);
                //     if (this._shakeId)
                //     {
                //         this._playNodeTab[this._shakeId-1].setShake(true);
                //     }
                // });
            }
        }
    };
    AcSeaWomanView.prototype.checkFull = function () {
        if (this._fullFlag) {
            this.showViewMask();
            this.refreshGame();
        }
        else {
            this._isPlaying = false;
        }
    };
    AcSeaWomanView.prototype.refreshGame = function () {
        var _this = this;
        var yunLeft = BaseBitmap.create("acmousegold_yun1");
        yunLeft.setPosition(-yunLeft.width, 0);
        this.addChild(yunLeft);
        var yunRight = BaseBitmap.create("acmousegold_yun2");
        yunRight.setPosition(GameConfig.stageWidth, 0);
        this.addChild(yunRight);
        egret.Tween.get(yunLeft).to({ x: 0 }, 600);
        egret.Tween.get(yunRight).to({ x: GameConfig.stageWidth - yunRight.width }, 600).call(function () {
            egret.Tween.removeTweens(yunRight);
            egret.Tween.removeTweens(yunLeft);
            for (var i = 0; i < 16; i++) {
                var onePlay = _this._playNodeTab[i];
                onePlay.visible = true;
                var oneinfo = _this.vo.getMapInfo(i + 1);
                onePlay.setInfo(oneinfo);
            }
            var t = egret.setTimeout(function () {
                _this._isPlaying = false;
                egret.Tween.get(yunLeft).to({ x: -yunLeft.width }, 600).call(function () {
                    egret.Tween.removeTweens(yunLeft);
                    yunLeft.dispose();
                    yunLeft = null;
                }, _this);
                egret.Tween.get(yunRight).to({ x: GameConfig.stageWidth }, 600).call(function () {
                    egret.Tween.removeTweens(yunRight);
                    yunRight.dispose();
                    yunRight = null;
                    _this.hideViewMask();
                }, _this);
            }, _this, 1500);
        }, this);
    };
    AcSeaWomanView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcSeaWomanView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcSeaWomanView.prototype.detailBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACSEAWOMANPOPVIEW, {
            aid: this.aid,
            code: this.code,
            uicode: this.getUiCode()
        });
    };
    AcSeaWomanView.prototype.tick = function () {
        this._acTimeText.text = this.vo.getCountDownTime();
    };
    AcSeaWomanView.prototype.freshView = function () {
        this._playTimesText.text = LanguageManager.getlocal("acSeaWomanPlayTimes-" + this.getUiCode(), [String(this.vo.ainfo.v)]);
        var canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes-" + this.getUiCode(), [String(this.vo.num)]);
        if (this.vo.isFree()) {
            canplaystr = LanguageManager.getlocal("acSeaWomanCanPlayTimes2-" + this.getUiCode(), [String(this.vo.num)]);
        }
        this._canplayTimesText.text = canplaystr;
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 51;
            reddot.y = 10;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        for (var i = 0; i < this._rewardNodeTab.length; i++) {
            var oneNode = this._rewardNodeTab[i];
            oneNode.setShowType(this.vo.getAchievementType(i + 1));
        }
        this._timeRechargeTxt.text = LanguageManager.getlocal("acSeaWomanRechargeInfo-" + this.getUiCode(), [String(this.vo.getNextTimeNeedRecharge())]);
    };
    AcSeaWomanView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        this._timeRechargeTxt = null;
        this._acTimeText = null;
        this._playTimesText = null;
        this._rewardNodeTab.length = 0;
        this._playNodeTab.length = 0;
        this._showId = 0;
        this._touchId = 0;
        this._shakeId = 0;
        this._fullFlag = false;
        this._delFlag = false;
        this._isPlaying = false;
        this._canplayTimesText = null;
        this._detailBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcSeaWomanView;
}(AcCommonView));
//# sourceMappingURL=AcSeaWomanView.js.map