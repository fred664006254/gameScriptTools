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
/**
 * 神器迷宫
 * author ycg
 * date 2020.4.24
 * @class AcWeaponMazeView
 */
var AcWeaponMazeView = /** @class */ (function (_super) {
    __extends(AcWeaponMazeView, _super);
    function AcWeaponMazeView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._progress = null;
        _this._progressTF = null;
        _this._processTotal = null;
        _this._boxList = [];
        _this._detailBtn = null;
        _this._boxContainer = null;
        _this._playBtn = null;
        _this._freeTxt = null;
        _this._playTxt = null;
        _this._toolNumBg = null;
        _this._toolNum = null;
        _this._isPlay = false;
        _this._rewardData = null;
        _this._mapContainer = null;
        _this._mapList = [];
        _this._pFlag = null;
        _this._mapBoxList = [];
        _this._mapType = [];
        _this._lastBoxVo = [];
        _this._isTenPlay = false;
        _this._flagMoveSpeed = 3;
        _this._moveFlagPos = [];
        _this._moveFlagCount = 0;
        _this._isSkipAni = false;
        return _this;
    }
    AcWeaponMazeView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("acweaponmaze_bg", this.getUiCode());
    };
    AcWeaponMazeView.prototype.getTitleStr = function () {
        return null;
    };
    AcWeaponMazeView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("acweaponmaze_titlebg", this.getUiCode());
    };
    AcWeaponMazeView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcWeaponMazeView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acWeaponMazeRuleInfo", this.getUiCode());
    };
    AcWeaponMazeView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acWeaponMazeProbablyInfo", this.getUiCode());
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcWeaponMazeView.prototype.getReportTipData = function () {
        return { title: { key: App.CommonUtil.getCnByCode("acWeaponMazeReportTitle", this.getUiCode()) }, msg: { key: App.CommonUtil.getCnByCode("acWeaponMazeReportMsg", this.getUiCode()) } };
    };
    AcWeaponMazeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acweaponmazecode1", "acweaponmazecode" + this.getUiCode(),
            "acthreekingofwife_infobg-1", "luckydrawrewardword-2", "servantweapontxt", "acwealthcarpview_skineffect", "acheroine_free", "public_9_powertipbg2", "acrecovery_boxlight", "acweaponmazeboxopenlighteff", "acweaponmazebox2openeff", "acweaponmazebox1openeff", "acweaponmazeboxyanwueff"
        ]);
    };
    AcWeaponMazeView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 2:
                code = "1";
                break;
            case 4:
                code = "3";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcWeaponMazeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY, this.lotteryCallback, this);
        this._timeBg = null;
        this._timeTxt = null;
        this._progress = null;
        this._progressTF = null;
        this._processTotal = null;
        this._boxList = [];
        this._detailBtn = null;
        this._boxContainer = null;
        this._playBtn = null;
        this._freeTxt = null;
        this._playTxt = null;
        this._toolNumBg = null;
        this._toolNum = null;
        this._isPlay = false;
        this._rewardData = null;
        this._mapContainer = null;
        this._mapList = [];
        this._pFlag = null;
        this._mapBoxList = [];
        this._lastBoxVo = [];
        this._isTenPlay = false;
        this._moveFlagPos = [];
        this._moveFlagCount = 0;
        this._isSkipAni = false;
        _super.prototype.dispose.call(this);
    };
    AcWeaponMazeView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY, this.lotteryCallback, this);
        var mapContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(mapContainer);
        var map = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_mapbg", this.getUiCode()));
        mapContainer.width = map.width;
        mapContainer.height = map.height;
        mapContainer.x = GameConfig.stageWidth / 2 - map.width / 2;
        mapContainer.y = GameConfig.stageHeigth - map.height;
        this._mapContainer = mapContainer;
        var mapType = this.vo.getMapType();
        this._mapType = mapType;
        for (var i = 0; i < mapType.length; i++) {
            var map_1 = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_mapbg", this.getUiCode()));
            mapContainer.addChild(map_1);
            if (i == 0) {
                map_1.y = 0;
            }
            else {
                map_1.y = -map_1.height * i;
            }
            if (mapType[i] == -1) {
                map_1.scaleY = -1;
                if (i == 0) {
                    map_1.y = map_1.height;
                }
                else {
                    map_1.y = -map_1.height * (i - 1);
                }
            }
            this._mapList.push(map_1);
            App.LogUtil.log("map.y " + map_1.y + " type " + mapType[i]);
        }
        var pContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(pContainer);
        pContainer.width = mapContainer.width;
        pContainer.height = mapContainer.height;
        pContainer.x = GameConfig.stageWidth / 2 - pContainer.width / 2;
        pContainer.y = GameConfig.stageHeigth - pContainer.height;
        var pFlag = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_red", this.getUiCode()));
        pFlag.anchorOffsetX = pFlag.width / 2;
        pFlag.anchorOffsetY = pFlag.height / 2;
        pFlag.setPosition(231, 597);
        pContainer.addChild(pFlag);
        this._pFlag = pFlag;
        var topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_bgtop", this.getUiCode()));
        topBg.y = 0;
        this.addChildToContainer(topBg);
        var descBgImg = "acthreekingofwife_infobg-1";
        if (this.getUiCode() == "3") {
            descBgImg = "acweaponmaze_infobg-" + this.getUiCode();
        }
        var descBg = BaseBitmap.create(descBgImg);
        this.addChildToContainer(descBg);
        if (this.getUiCode() == "3") {
            descBg.y = this.titleBg.y + this.titleBg.height - 7;
        }
        else {
            descBg.y = this.titleBg.y + this.titleBg.height - 80;
        }
        var boxContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(boxContainer);
        this._boxContainer = boxContainer;
        //神器
        if (this.getUiCode() == "1") {
            var weaponCfg = Config.ServantweaponCfg.getWeaponItemById(this.cfg.coreReward);
            var weaponIcon = BaseLoadBitmap.create(weaponCfg.icon);
            weaponIcon.width = 346;
            weaponIcon.height = 346;
            this.addChildToContainer(weaponIcon);
            weaponIcon.setScale(0.65);
            weaponIcon.setPosition(-20, this.titleBg.y + this.titleBg.height - 50);
        }
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = descBg.x + 170;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDesc", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 470;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChildToContainer(descTxt);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = descBg.y + descBg.height - this._timeBg.height / 2 - 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        boxContainer.width = GameConfig.stageWidth;
        boxContainer.setPosition(0, descBg.y + descBg.height);
        var boxBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_processbg", this.getUiCode()));
        boxBg.setPosition(0, 0);
        boxContainer.addChild(boxBg);
        boxContainer.height = boxBg.height;
        var progressBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_progressbg", this.getUiCode()));
        progressBg.setPosition(90, boxBg.y + 40);
        boxContainer.addChild(progressBg);
        this._progress = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_progress", this.getUiCode()));
        this._progress.setPosition(progressBg.x, progressBg.y);
        boxContainer.addChild(this._progress);
        var percent = this.vo.getProcessNum() / this.vo.getCurrMaxProNum();
        if (percent > 1) {
            percent = 1;
        }
        var proMask = new egret.Rectangle(0, 0, this._progress.width * percent, this._progress.height);
        this._progress.mask = proMask;
        var progressNumber = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessNum", this.getUiCode()), [String(this.vo.getProcessNum()), String(this.vo.getCurrMaxProNum())]);
        this._progressTF = ComponentManager.getTextField(progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._progressTF.anchorOffsetX = this._progressTF.width / 2;
        this._progressTF.setPosition(boxBg.x + boxBg.width / 2, progressBg.y + progressBg.height + 12);
        boxContainer.addChild(this._progressTF);
        //总进度
        var processNumbg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_numbg", this.getUiCode()));
        processNumbg.setPosition(15, boxBg.y + boxBg.height / 2 - processNumbg.height / 2 + 2);
        boxContainer.addChild(processNumbg);
        //进度数量TF
        var numStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessTotalNum", this.getUiCode()), [String(this.vo.getProcessNum())]);
        this._processTotal = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._processTotal.textAlign = TextFieldConst.ALIGH_CENTER;
        this._processTotal.anchorOffsetX = this._processTotal.width / 2;
        this._processTotal.setPosition(processNumbg.x + processNumbg.width / 2, processNumbg.y + 21);
        boxContainer.addChild(this._processTotal);
        //预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(descBg.x - 15, descBg.y + descBg.height - skinTxtEffect.height / 2 - 30);
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("servantweapontxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect, [0, 0]);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("servantweapontxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        // skinTxt1.addTouchTap(() => {
        //     ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW4, {aid: this.aid, code: this.code});
        // }, this);
        var skinAlpha = BaseBitmap.create("public_alphabg");
        skinAlpha.width = 160;
        skinAlpha.height = 70;
        skinAlpha.setPosition(skinTxt.x - skinAlpha.width / 2, skinTxt.y - 40);
        this.addChildToContainer(skinAlpha);
        skinAlpha.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW4, { aid: _this.aid, code: _this.code });
        }, this);
        //详情按钮
        var detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acweaponmaze_detailbtn", this.getUiCode()), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        detailBtn.setPosition(20, boxContainer.y + boxContainer.height + 20);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        //play btn
        var playBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acweaponmaze_playbtn", this.getUiCode()), "", this.playBtnClick, this);
        playBtn.setPosition(GameConfig.stageWidth / 2 - playBtn.width / 2, GameConfig.stageHeigth - playBtn.height - 49 + 23);
        this.addChildToContainer(playBtn);
        this._playBtn = playBtn;
        var freeTxt = BaseBitmap.create("acheroine_free");
        freeTxt.setPosition(playBtn.x + playBtn.width / 2 - freeTxt.width / 2, playBtn.y + playBtn.height / 2 - freeTxt.height / 2 - 6);
        // freeTxt.setPosition(playBtn.width/2 - freeTxt.width/2, playBtn.height/2 - freeTxt.height/2 - 5);
        this.addChildToContainer(freeTxt);
        this._freeTxt = freeTxt;
        var toolNumBg = BaseBitmap.create("public_9_powertipbg2");
        this.addChildToContainer(toolNumBg);
        this._toolNumBg = toolNumBg;
        var toolNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeToolNum", this.getUiCode()), ["0"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        toolNumBg.width = toolNum.width + 30;
        toolNumBg.setPosition(GameConfig.stageWidth / 2 - toolNumBg.width / 2, GameConfig.stageHeigth - toolNumBg.height + 3);
        toolNum.setPosition(toolNumBg.x + toolNumBg.width / 2 - toolNum.width / 2, toolNumBg.y + toolNumBg.height / 2 - toolNum.height / 2 + 7);
        var playTxt = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_playtxt1", this.getUiCode()));
        playTxt.setPosition(playBtn.x + playBtn.width / 2 - freeTxt.width / 2, playBtn.y + playBtn.height - playTxt.height + 5);
        // playTxt.setPosition(playBtn.width/2 - freeTxt.width/2, playBtn.height - playTxt.height + 5);
        this.addChildToContainer(playTxt);
        this._playTxt = playTxt;
        //跳过动画
        var skipContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(skipContainer);
        var skipBg = BaseBitmap.create("public_select");
        skipBg.setPosition(playBtn.x + playBtn.width + 30, playBtn.y + 50);
        skipContainer.addChild(skipBg);
        skipBg.addTouchTap(function () {
            _this._isSkipAni = !_this._isSkipAni;
            if (_this._isSkipAni) {
                skipBg.setRes("public_select_down");
            }
            else {
                skipBg.setRes("public_select");
            }
        }, this);
        var skipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_skipAni"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        skipTxt.setPosition(skipBg.x + skipBg.width + 5, skipBg.y + skipBg.height / 2 - skipTxt.height / 2);
        skipContainer.addChild(skipTxt);
        this.initBox();
        this.refreshBox();
        //mapBox
        this.initMapBox();
        this.refreshView();
    };
    AcWeaponMazeView.prototype.initBox = function () {
        var _this = this;
        var dataList = this.cfg.getAchieveCfgList();
        var dataLen = dataList.length;
        var sepIndex = this.vo.getSepIndex();
        var maxNum = dataList[sepIndex - 1].needNum;
        var _loop_1 = function (i) {
            var data = dataList[i];
            var boxImg = App.CommonUtil.getResByCode("acweaponmaze_box2_1", this_1.getUiCode());
            if (i == sepIndex - 1) {
                boxImg = App.CommonUtil.getResByCode("acweaponmaze_bigbox", this_1.getUiCode());
            }
            var box = BaseBitmap.create(boxImg);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            var per = data.needNum / maxNum;
            box.setPosition(this_1._progress.x + this_1._progress.width * per, this_1._progress.y + this_1._progress.height / 2 + 5);
            box.addTouchTap(function () {
                var selId = data.id;
                var rewardId = _this.vo.getAchieveRewardId();
                if (rewardId > 0 && rewardId >= dataList[sepIndex - 1].id) {
                    selId = rewardId;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW2, { aid: _this.aid, code: _this.code, id: selId });
            }, this_1);
            var boxLight = BaseBitmap.create("acrecovery_boxlight");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            this_1._boxContainer.addChild(boxLight);
            this_1._boxContainer.addChild(box);
            boxLight.setPosition(box.x, box.y);
            egret.Tween.get(boxLight, { loop: true }).to({ rotation: 360 }, 2500);
            boxLight.visible = false;
            var redDot = null;
            if (i == sepIndex - 1) {
                boxLight.setScale(1.5);
                var boxWordBM = BaseBitmap.create("luckydrawrewardword-2");
                boxWordBM.setPosition(box.x - boxWordBM.width / 2, box.y + 15);
                this_1._boxContainer.addChild(boxWordBM);
                redDot = BaseBitmap.create("public_dot2");
                redDot.setPosition(box.x + box.width / 2 - redDot.height, box.y - box.height / 2);
                redDot.visible = false;
                this_1._boxContainer.addChild(redDot);
            }
            var boxInfo = { box: box, boxLight: boxLight, redDot: redDot };
            this_1._boxList[i] = boxInfo;
        };
        var this_1 = this;
        for (var i = 0; i < sepIndex; i++) {
            _loop_1(i);
        }
    };
    AcWeaponMazeView.prototype.refreshBox = function () {
        var data = this.cfg.getAchieveCfgList();
        var currNum = this.vo.getProcessNum();
        var len = this._boxList.length;
        for (var i = 0; i < len - 1; i++) {
            var boxInfo = this._boxList[i];
            egret.Tween.removeTweens(boxInfo.box);
            boxInfo.box.rotation = 0;
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                boxInfo.boxLight.visible = false;
                boxInfo.box.setRes(App.CommonUtil.getResByCode("acweaponmaze_box2_2", this.getUiCode()));
            }
            else {
                if (currNum >= data[i].needNum) {
                    boxInfo.boxLight.visible = true;
                    egret.Tween.get(boxInfo.box, { loop: true }).to({ rotation: 5 }, 80).to({ rotation: -10 }, 160).to({ rotation: 0 }, 80);
                }
                else {
                    boxInfo.box.setRes(App.CommonUtil.getResByCode("acweaponmaze_box2_1", this.getUiCode()));
                }
            }
        }
        var sepIndex = this.vo.getSepIndex();
        var sepMaxNum = data[sepIndex - 1].needNum;
        var lastBox = this._boxList[this._boxList.length - 1];
        if (this.vo.isCangetAchieveReward()) {
            lastBox.redDot.visible = true;
            lastBox.boxLight.visible = true;
        }
        else {
            lastBox.redDot.visible = false;
            lastBox.boxLight.visible = false;
        }
    };
    //迷宫宝箱
    AcWeaponMazeView.prototype.initMapBox = function () {
        var boxInfo = this.vo.box;
        var boxPosCfg = this.mapBoxPos[0];
        if (this._mapType[0] == -1) {
            boxPosCfg = this.mapBoxPos[1];
        }
        for (var i = 0; i < boxInfo.length; i++) {
            var data = boxInfo[i];
            var boxType = 1;
            if (data.t == 1) {
                boxType = 2;
            }
            var boxStatus = 1;
            if (data.f == 1) {
                boxStatus = 2;
            }
            var boxImg = App.CommonUtil.getResByCode("acweaponmaze_box" + boxType + "_" + boxStatus, this.getUiCode());
            var box = BaseBitmap.create(boxImg);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            var posLen = boxPosCfg[i].length;
            box.x = boxPosCfg[i][posLen - 1].x;
            box.y = boxPosCfg[i][posLen - 1].y;
            //掉落特效
            var downEff = ComponentManager.getCustomMovieClip("acweaponmazeboxyanwueff", 8, 70);
            downEff.width = 87;
            downEff.height = 75;
            downEff.anchorOffsetX = downEff.width / 2;
            downEff.anchorOffsetY = downEff.height / 2;
            downEff.setPosition(box.x, box.y);
            downEff.visible = false;
            this._mapContainer.addChild(downEff);
            this._mapContainer.addChild(box);
            var boxData = { box: box, downEff: downEff };
            this._mapBoxList.push(boxData);
        }
    };
    AcWeaponMazeView.prototype.getOpenBoxArr = function () {
        console.log("openboxArr ", this._lastBoxVo);
        console.log("openboxArr new ", this.vo.box);
        var arr = [];
        if (this._isTenPlay) {
            for (var i = 0; i < this._lastBoxVo.length; i++) {
                if (this._lastBoxVo[i].f != 1) {
                    arr.push(i);
                }
            }
        }
        else {
            if (this._rewardData && this._rewardData.fullFlag) {
                for (var i = 0; i < this._lastBoxVo.length; i++) {
                    if (this._lastBoxVo[i].f != 1) {
                        arr.push(i);
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < this._lastBoxVo.length; i++) {
                    if (this._lastBoxVo[i].f != this.vo.box[i].f) {
                        arr.push(i);
                        break;
                    }
                }
            }
        }
        return arr;
    };
    AcWeaponMazeView.prototype.refreshMapBox = function (isNewMap) {
        App.LogUtil.log("refreshMapBox " + isNewMap);
        if (isNewMap) {
            var boxInfo = this.vo.box;
            var boxPosCfg = this.mapBoxPos[0];
            if (this._mapType[0] == -1) {
                boxPosCfg = this.mapBoxPos[1];
            }
            for (var i = 0; i < boxInfo.length; i++) {
                var boxType = 1;
                if (boxInfo[i].t == 1) {
                    boxType = 2;
                }
                var boxStatus = 1;
                if (boxInfo[i].f == 1) {
                    boxStatus = 2;
                }
                var boxImg = App.CommonUtil.getResByCode("acweaponmaze_box" + boxType + "_" + boxStatus, this.getUiCode());
                this._mapBoxList[i].box.setRes(boxImg);
                var posLen = boxPosCfg[i].length;
                this._mapBoxList[i].box.x = boxPosCfg[i][posLen - 1].x;
                this._mapBoxList[i].box.y = boxPosCfg[i][posLen - 1].y;
            }
        }
        else {
            var openBox = this.getOpenBoxArr();
            console.log("openbox ", openBox);
            var data = this._lastBoxVo;
            for (var i = 0; i < openBox.length; i++) {
                var boxType = 1;
                if (data[openBox[i]].t == 1) {
                    boxType = 2;
                }
                var boxStatus = 2;
                var boxImg = App.CommonUtil.getResByCode("acweaponmaze_box" + boxType + "_" + boxStatus, this.getUiCode());
                this._mapBoxList[openBox[i]].box.setRes(boxImg);
            }
        }
    };
    //地图宝箱动画
    AcWeaponMazeView.prototype.showMapBoxDownAni = function () {
        var _this = this;
        App.LogUtil.log("showMapBoxDownAni ");
        var len = this._mapBoxList.length;
        var _loop_2 = function (i) {
            var box = this_2._mapBoxList[i].box;
            var offY = box.y;
            box.visible = true;
            if (i == len - 1) {
                egret.Tween.get(box, { loop: false }).to({ y: offY - 250 }).to({ y: offY }, 300, egret.Ease.sineInOut).call(function () {
                    App.LogUtil.log("showMapBoxDownAni end ");
                    var downEff = _this.getMapBoxDownAni();
                    downEff.playWithTime(1);
                    downEff.setPosition(box.x, box.y + 10);
                    _this._mapContainer.addChildAt(downEff, _this._mapContainer.getChildIndex(box) - 1);
                    downEff.setEndCallBack(function () {
                        downEff.dispose();
                    }, _this);
                    _this.hideViewMask();
                });
            }
            else {
                egret.Tween.get(box, { loop: false }).to({ y: offY - 250 }).to({ y: offY }, 300, egret.Ease.sineInOut).call(function () {
                    var downEff = _this.getMapBoxDownAni();
                    downEff.playWithTime(1);
                    downEff.setPosition(box.x, box.y + 10);
                    _this._mapContainer.addChildAt(downEff, _this._mapContainer.getChildIndex(box) - 1);
                    downEff.setEndCallBack(function () {
                        downEff.dispose();
                    }, _this);
                });
            }
        };
        var this_2 = this;
        for (var i = 0; i < len; i++) {
            _loop_2(i);
        }
    };
    //掉落特效
    AcWeaponMazeView.prototype.getMapBoxDownAni = function () {
        var downEff = ComponentManager.getCustomMovieClip("acweaponmazeboxyanwueff", 8, 70);
        downEff.width = 87;
        downEff.height = 75;
        downEff.anchorOffsetX = downEff.width / 2;
        downEff.anchorOffsetY = downEff.height / 2;
        return downEff;
    };
    AcWeaponMazeView.prototype.playBtnClick = function () {
        var _this = this;
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        if (toolNum > 0 || this.vo.isFree()) {
            var isTen = 0;
            this._isTenPlay = false;
            if (!this.vo.isFree() && toolNum >= 10) {
                isTen = 1;
                this._isTenPlay = true;
            }
            this._lastBoxVo = this.vo.box;
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: isTen });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeRechargeTip", this.getUiCode())),
                touchMaskClose: true,
                title: "itemUseConstPopupViewTitle",
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONMAZEDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
                },
                handle: this,
                needClose: 1,
                needCancel: true,
                confirmTxt: "taskGoBtn"
            });
        }
    };
    AcWeaponMazeView.prototype.lotteryCallback = function (evt) {
        if (!evt.data.ret) {
            this._isPlay = false;
            return;
        }
        var rData = evt.data.data.data;
        this._rewardData = rData;
        if (this._isSkipAni) {
            this.refreshMapBox(false);
            this.showRewardView();
        }
        else {
            this.showBoxAni();
        }
    };
    AcWeaponMazeView.prototype.showBoxAni = function () {
        var view = this;
        view.showViewMask();
        if (view._isTenPlay) {
            var openArr = this.getOpenBoxArr();
            for (var i = 0; i < openArr.length; i++) {
                if (i == openArr.length - 1) {
                    view.playOpenAni(openArr[i], true, true);
                }
                else {
                    view.playOpenAni(openArr[i], true, false);
                }
            }
            // view.refreshMapBox(false);
            // egret.Tween.get(view).wait(100).call(()=>{
            //     view.showRewardView();
            // });
        }
        else {
            var openBoxArr = this.getOpenBoxArr();
            if (openBoxArr.length == 1) {
                var boxPosCfg = this.mapBoxPos[0];
                if (this._mapType[0] == -1) {
                    boxPosCfg = this.mapBoxPos[1];
                }
                this._moveFlagPos = boxPosCfg[openBoxArr[0]];
                // this._moveFlagPos = boxPosCfg[0];
                this._moveFlagCount = 0;
                this.moveFlag();
            }
            else {
                view.refreshMapBox(false);
                egret.Tween.get(view).wait(100).call(function () {
                    view.showRewardView();
                });
            }
        }
    };
    //红点移动
    AcWeaponMazeView.prototype.moveFlag = function () {
        if (this._moveFlagCount >= this._moveFlagPos.length) {
            //此处添加宝箱动画
            // this.refreshMapBox(false);
            // egret.Tween.get(this).wait(100).call(()=>{
            //     this.showRewardView();
            // });
            this._pFlag.visible = false;
            var openBoxArr = this.getOpenBoxArr();
            var index = openBoxArr[0];
            this.playOpenAni(index);
            return;
        }
        var desPos = this._moveFlagPos[this._moveFlagCount];
        if (this._moveFlagCount == 0) {
            this.moveFlagAni({ x: this._pFlag.x, y: this._pFlag.y }, desPos);
        }
        else {
            this.moveFlagAni(this._moveFlagPos[this._moveFlagCount - 1], desPos);
        }
    };
    AcWeaponMazeView.prototype.moveFlagAni = function (origPos, desPos) {
        var view = this;
        if (origPos.x == desPos.x) {
            var dt = Math.abs(desPos.y - origPos.y) * this._flagMoveSpeed;
            egret.Tween.get(view._pFlag, { loop: false }).to({ y: desPos.y }, dt).call(function () {
                view._moveFlagCount += 1;
                view.moveFlag();
            });
        }
        else {
            var dt = Math.abs(desPos.x - origPos.x) * this._flagMoveSpeed;
            egret.Tween.get(view._pFlag, { loop: false }).to({ x: desPos.x }, dt).call(function () {
                view._moveFlagCount += 1;
                view.moveFlag();
            });
        }
    };
    AcWeaponMazeView.prototype.resetMoveFlagInfo = function () {
        this._pFlag.visible = true;
        this._pFlag.setPosition(231, 597);
        this._moveFlagCount = 0;
        this._moveFlagPos = null;
    };
    AcWeaponMazeView.prototype.playOpenAni = function (index, isMulti, isEnd) {
        var view = this;
        var box = view._mapBoxList[index].box;
        var type = view._lastBoxVo[index].t;
        var openEff = null;
        if (type == 2) {
            openEff = ComponentManager.getCustomMovieClip("acweaponmazebox1openeff", 12, 70);
            openEff.width = 57;
            openEff.height = 110;
            openEff.anchorOffsetX = openEff.width / 2;
            openEff.anchorOffsetY = 87;
            openEff.setPosition(box.x, box.y);
            this._mapContainer.addChild(openEff);
        }
        else {
            openEff = ComponentManager.getCustomMovieClip("acweaponmazebox2openeff", 12, 70);
            openEff.width = 60;
            openEff.height = 110;
            openEff.anchorOffsetX = openEff.width / 2;
            openEff.anchorOffsetY = 85;
            openEff.setPosition(box.x, box.y);
            this._mapContainer.addChild(openEff);
        }
        App.LogUtil.log("playOpenAni " + index);
        box.visible = false;
        openEff.playWithTime(1);
        openEff.setFrameEvent(10, function () {
            view.refreshMapBox(false);
            //光特效
            App.LogUtil.log("playOpenAni frame 10 ");
            var light = ComponentManager.getCustomMovieClip("acweaponmazeboxopenlighteff", 13, 70);
            light.width = 152;
            light.height = 152;
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.setPosition(box.x, box.y - 85);
            view._mapContainer.addChild(light);
            light.playWithTime(1);
            light.setEndCallBack(function () {
                App.LogUtil.log("light frame end ");
                box.visible = true;
                light.dispose();
                openEff.dispose();
                if (isMulti) {
                    if (isEnd) {
                        view.showRewardView();
                    }
                }
                else {
                    view.showRewardView();
                }
            }, view);
        }, view);
        openEff.setEndCallBack(function () {
            openEff.visible = false;
            // box.visible = true;
            App.LogUtil.log("eff frame end ");
        }, view);
    };
    Object.defineProperty(AcWeaponMazeView.prototype, "mapBoxPos", {
        //mapBox 第一个数组 无翻转 第二个数组 图片翻转 以左上角为0，0
        get: function () {
            return [
                [
                    [{ x: 231, y: 567 }, { x: 53, y: 566 }, { x: 53, y: 539 }, { x: 53, y: 510 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 405, y: 504 }, { x: 405, y: 567 }, { x: 348, y: 567 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 287, y: 504 }, { x: 287, y: 385 }, { x: 231, y: 385 }, { x: 231, y: 415 }, { x: 230, y: 446 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 287, y: 504 }, { x: 287, y: 385 }, { x: 345, y: 385 }, { x: 345, y: 449 }, { x: 410, y: 449 }, { x: 410, y: 322 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 287, y: 504 }, { x: 287, y: 326 }, { x: 229, y: 326 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 287, y: 504 }, { x: 287, y: 326 }, { x: 345, y: 326 }, { x: 345, y: 263 }, { x: 411, y: 263 }, { x: 411, y: 244 }, { x: 410, y: 211 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 287, y: 504 }, { x: 287, y: 326 }, { x: 345, y: 326 }, { x: 345, y: 263 }, { x: 287, y: 263 }, { x: 287, y: 203 }, { x: 310, y: 203 }, { x: 345, y: 201 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 504 }, { x: 113, y: 504 }, { x: 113, y: 445 }, { x: 53, y: 445 }, { x: 53, y: 356 }, { x: 53, y: 324 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 263 }, { x: 185, y: 263 }, { x: 220, y: 261 }],
                    [{ x: 231, y: 567 }, { x: 171, y: 566 }, { x: 171, y: 263 }, { x: 53, y: 263 }, { x: 53, y: 205 }, { x: 133, y: 205 }, { x: 166, y: 201 }],
                ],
                [
                    [{ x: 231, y: 567 }, { x: 310, y: 567 }, { x: 346, y: 562 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 411, y: 506 }, { x: 411, y: 525 }, { x: 410, y: 556 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 266, y: 442 }, { x: 231, y: 442 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 384 }, { x: 346, y: 384 }, { x: 346, y: 324 }, { x: 406, y: 324 }, { x: 406, y: 444 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 384 }, { x: 231, y: 384 }, { x: 231, y: 354 }, { x: 230, y: 319 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 266 }, { x: 405, y: 266 }, { x: 405, y: 202 }, { x: 385, y: 202 }, { x: 352, y: 200 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 266 }, { x: 172, y: 266 }, { x: 172, y: 203 }, { x: 53, y: 203 }, { x: 53, y: 230 }, { x: 56, y: 262 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 266 }, { x: 113, y: 266 }, { x: 113, y: 324 }, { x: 53, y: 324 }, { x: 53, y: 413 }, { x: 53, y: 445 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 266 }, { x: 172, y: 266 }, { x: 172, y: 506 }, { x: 185, y: 506 }, { x: 221, y: 504 }],
                    [{ x: 231, y: 567 }, { x: 287, y: 567 }, { x: 287, y: 506 }, { x: 345, y: 506 }, { x: 345, y: 442 }, { x: 287, y: 442 }, { x: 287, y: 266 }, { x: 172, y: 266 }, { x: 172, y: 506 }, { x: 53, y: 506 }, { x: 53, y: 564 }, { x: 133, y: 564 }, { x: 169, y: 564 }],
                ]
            ];
        },
        enumerable: true,
        configurable: true
    });
    //地图移动
    AcWeaponMazeView.prototype.moveMap = function () {
        var _this = this;
        this._mapType = this.vo.getMapType();
        this._pFlag.visible = false;
        egret.Tween.get(this._mapContainer, { loop: false }).to({ y: GameConfig.stageHeigth }, 500).call(function () {
            for (var i = 0; i < _this._mapBoxList.length; i++) {
                _this._mapBoxList[i].box.visible = false;
            }
            _this.freshMap();
            _this.refreshMapBox(true);
            _this._pFlag.visible = true;
            _this.showMapBoxDownAni();
        });
    };
    //刷新底图
    AcWeaponMazeView.prototype.freshMap = function () {
        var mapType = this._mapType;
        for (var i = 0; i < mapType.length; i++) {
            var map = this._mapList[i];
            map.scaleY = 1;
            if (i == 0) {
                map.y = 0;
            }
            else {
                map.y = -map.height * i;
            }
            if (mapType[i] == -1) {
                map.scaleY = -1;
                if (i == 0) {
                    map.y = map.height;
                }
                else {
                    map.y = -map.height * (i - 1);
                }
            }
            App.LogUtil.log("freshMap " + map.y + " ii " + mapType[i]);
        }
        App.LogUtil.log("mapCon h " + this._mapContainer.height);
        this._mapContainer.y = GameConfig.stageHeigth - this._mapContainer.height;
        App.LogUtil.log("_mapContainer y " + this._mapContainer.y);
    };
    //展示奖励
    AcWeaponMazeView.prototype.showRewardView = function () {
        var view = this;
        var rData = view._rewardData;
        view._isPlay = false;
        if (rData) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "callback": function () {
                    view.resetMoveFlagInfo();
                    if (rData.fullFlag) {
                        view.refreshUi();
                        view.moveMap();
                    }
                    else {
                        view.hideViewMask();
                        view.refreshUi();
                    }
                } });
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
        else {
            view.resetMoveFlagInfo();
            view.hideViewMask();
        }
    };
    //mask
    AcWeaponMazeView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcWeaponMazeView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcWeaponMazeView.prototype.refreshView = function () {
        //进度相关
        var currProcess = this.vo.getProcessNum();
        var processMaxNum = this.vo.getCurrMaxProNum();
        this._processTotal.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessTotalNum", this.getUiCode()), [String(currProcess)]);
        this._processTotal.anchorOffsetX = this._processTotal.width / 2;
        this._progressTF.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessNum", this.getUiCode()), [String(currProcess), String(processMaxNum)]);
        this._progressTF.anchorOffsetX = this._progressTF.width / 2;
        var data = this.cfg.getAchieveCfgList();
        var sepIndex = this.vo.getSepIndex();
        var sepMaxNum = data[sepIndex - 1].needNum;
        var percent = currProcess / sepMaxNum;
        if (currProcess >= sepMaxNum) {
            percent = 1;
        }
        var proMask = new egret.Rectangle(0, 0, this._progress.width * percent, this._progress.height);
        this._progress.mask = proMask;
        if (this.vo.isCangetAchieveReward() || this.vo.isCanGetRechargeReward()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        //play btn
        if (this.vo.isFree()) {
            this._freeTxt.visible = true;
        }
        else {
            this._freeTxt.visible = false;
        }
        var toolNum = this.vo.getToolNum();
        var playTxtImg = App.CommonUtil.getResByCode("acweaponmaze_playtxt1", this.getUiCode());
        if (!this.vo.isFree() && toolNum >= 10) {
            playTxtImg = App.CommonUtil.getResByCode("acweaponmaze_playtxt2", this.getUiCode());
        }
        this._playTxt.setRes(playTxtImg);
        this._toolNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeToolNum", this.getUiCode()), ["" + toolNum]);
        this._toolNumBg.width = this._toolNum.width + 30;
        this._toolNumBg.x = GameConfig.stageWidth / 2 - this._toolNumBg.width / 2;
        this._toolNum.x = this._toolNumBg.x + this._toolNumBg.width / 2 - this._toolNum.width / 2;
    };
    AcWeaponMazeView.prototype.refreshUi = function () {
        if (this._isPlay) {
            return;
        }
        this.refreshView();
        this.refreshBox();
    };
    AcWeaponMazeView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]);
        this._timeBg.width = 60 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
    };
    return AcWeaponMazeView;
}(AcCommonView));
//# sourceMappingURL=AcWeaponMazeView.js.map