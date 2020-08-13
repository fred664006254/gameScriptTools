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
/**
 * @author hyd
 * 放风筝活动
 */
var AcKiteView = (function (_super) {
    __extends(AcKiteView, _super);
    function AcKiteView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._isPlayAni = false;
        _this._progressBar = null;
        _this._numTxt = null;
        _this.kiteCon = null;
        _this.kiteBg = null;
        _this.kiteBgImg = null;
        _this.kite = null;
        _this._scollView = null;
        //private kiteLine: BaseBitmap = null;
        _this.kiteLine = null;
        _this.lineCircle = null;
        _this.lineCircleAni = null;
        _this.fakelineCircle = null;
        _this.fakelineCircleAni = null;
        _this.nowPos = null;
        _this.btnParam = 0;
        _this.windsCon = null;
        _this.winds = {};
        _this.detailBtn = null;
        _this.haveNum = null;
        _this.cloudCon = null;
        _this.clouds = {};
        _this.rightBarCon = null;
        _this.rightBarBg = null;
        _this.rightBar = null;
        _this.rightBarTips = null;
        _this.rewards = '';
        _this._proLight = null;
        //风筝上升一个单位对应像素
        _this.unitPixel = 160;
        _this.nowHeightTxt = null;
        _this.nowHeightBg = null;
        return _this;
    }
    AcKiteView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACKITE_LOTTERY, this.receiveRewardHandle, this);
        this._timeBg = null;
        this._timeTxt = null;
        this._isPlayAni = null;
        this._progressBar = null;
        this._numTxt = null;
        this.unitPixel = 160;
        this._scollView = null;
        this.kiteCon = null;
        this.kiteBg = null;
        this.kiteBgImg = null;
        this.kite = null;
        this.kiteLine = null;
        this.lineCircle = null;
        this.lineCircleAni = null;
        this.nowPos = null;
        this.btnParam = 0;
        this.windsCon = null;
        this.winds = {};
        this.detailBtn = null;
        this.haveNum = null;
        this.cloudCon = null;
        this.clouds = {};
        this.rightBarCon = null;
        this.rightBar = null;
        this.rightBarBg = null;
        this.rightBarTips = null;
        this.rewards = '';
        this.nowHeightTxt = null;
        this.nowHeightBg = null;
        this._proLight = null;
        _super.prototype.dispose.call(this);
    };
    AcKiteView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshUi, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACKITE_LOTTERY, this.receiveRewardHandle, this);
        this.initKiteContainer();
        //活动背景
        var descBg = BaseBitmap.create("acthreekingofwife_infobg-1");
        descBg.y = this.titleBg.y + this.titleBg.height - 70;
        this.addChildToContainer(descBg);
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acKiteTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = descBg.x + 10;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);
        //活动文本
        var descSkinNeed = this.vo.getSkinNeedData();
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteInfo", this.getTypeCode()), [String(this.cfg.cost), String(descSkinNeed)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 600;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChildToContainer(descTxt);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = descBg.y + descBg.height - this._timeBg.height / 2 - 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(this.vo.acCountDown, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        var bottomBg = BaseBitmap.create(this.getDefaultRes("ackite_bottombg"));
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        var progressHead = BaseBitmap.create(this.getDefaultRes("ackite_progresshead"));
        // 血条
        this._progressBar = ComponentManager.getProgressBar(this.getDefaultRes("ackite_progress"), this.getDefaultRes("ackite_progressbg"), 540);
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2 + progressHead.width / 2 - 20;
        this._progressBar.y = bottomBg.y + 64;
        this.addChildToContainer(this._progressBar);
        //已经攻击次数
        progressHead.x = this._progressBar.x - progressHead.width + 15;
        this.addChildToContainer(progressHead);
        progressHead.y = this._progressBar.y + this._progressBar.height / 2 - progressHead.height / 2 - 2;
        //pro light
        var proLight = BaseBitmap.create("acwealthcomingview_progresslight");
        proLight.anchorOffsetX = proLight.width - 2;
        proLight.setPosition(this._progressBar.x, this._progressBar.y + this._progressBar.height / 2 - proLight.height / 2);
        this.addChildToContainer(proLight);
        this._proLight = proLight;
        this._numTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteProcess", this.getTypeCode()), [String(this.vo.scorenum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._numTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._numTxt.lineSpacing = 5;
        this._numTxt.x = progressHead.x + progressHead.width / 2 - this._numTxt.width / 2 - 2;
        this._numTxt.y = progressHead.y + progressHead.height / 2 - this._numTxt.height / 2 - 2;
        this.addChildToContainer(this._numTxt);
        var boxCfg = this.cfg.progressList;
        var boxShowMax = 5;
        var boxMaxNeed = boxCfg[boxShowMax - 1].need;
        var _loop_1 = function (index) {
            var data = boxCfg[index];
            // 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
            var rStatus = this_1.vo.getBoxStatusByIndex(data.id);
            var imgres = this_1.getDefaultRes("ackite_box" + rStatus);
            var boxImg = BaseBitmap.create(imgres);
            boxImg.width = 66;
            boxImg.height = 63;
            boxImg.anchorOffsetX = boxImg.width / 2;
            boxImg.anchorOffsetY = boxImg.height / 2;
            boxImg.name = "boxImg" + index;
            boxImg.x = this_1._progressBar.x + boxCfg[index].need / boxMaxNeed * this_1._progressBar.width;
            boxImg.y = this_1._progressBar.y + this_1._progressBar.height / 2 - 5;
            var lightImg = BaseBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 40;
            lightImg.anchorOffsetY = 40;
            if (index == boxShowMax - 1) {
                boxImg.setScale(1.5);
                boxImg.x = this_1._progressBar.x + boxCfg[index].need / boxMaxNeed * this_1._progressBar.width - boxImg.width * 0.5 + 15;
                boxImg.y = this_1._progressBar.y + this_1._progressBar.height / 2 - 5;
                lightImg.setScale(1.5);
            }
            lightImg.name = "lightImg" + index;
            lightImg.x = boxImg.x;
            lightImg.y = boxImg.y;
            lightImg.visible = false;
            this_1.addChildToContainer(lightImg);
            this_1.addChildToContainer(boxImg);
            boxImg.addTouchTap(function () {
                if (!_this.vo.isStart) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                var selId = data.id;
                if (_this.vo.isSecondProcess()) {
                    selId = _this.vo.getCurrRedProcessId();
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACKITEDETAILPOPUPVIEWTAB2, {
                    code: _this.code,
                    aid: _this.aid,
                    id: selId
                });
            }, this_1);
        };
        var this_1 = this;
        for (var index = 0; index < boxShowMax; index++) {
            _loop_1(index);
        }
        var poolBtn = ComponentManager.getButton(this.getDefaultRes("ackite_poolbtn"), "", function () {
            if (!_this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSRECHARGEPOOLVIEW, {
                aid: _this.aid,
                code: _this.code,
                topMsg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKitePoolTopMsg", _this.getTypeCode())),
                rewards: _this.cfg.getPoolRewards(),
            });
        }, this);
        poolBtn.setPosition(10, descBg.y + descBg.height + 15);
        this.addChildToContainer(poolBtn);
        //详情按钮
        var detailBtn = ComponentManager.getButton(this.getDefaultRes("ackite_detailbtn"), "", this.infoBtnClick, this);
        detailBtn.x = 0;
        detailBtn.y = bottomBg.y - 160 - detailBtn.height;
        this.addChildToContainer(detailBtn);
        this.detailBtn = detailBtn;
        var haveNumBg = BaseBitmap.create(this.getDefaultRes("ackite_havenumbg"));
        haveNumBg.setPosition(GameConfig.stageWidth / 2 - haveNumBg.width / 2, bottomBg.y - haveNumBg.height + 35);
        this.addChildToContainer(haveNumBg);
        var haveNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteCanUseNum", this.getTypeCode()), ["" + this.cfg.unitLength, String(this.vo.starNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        haveNum.width = haveNumBg.width;
        haveNum.lineSpacing = 4;
        haveNum.textAlign = egret.HorizontalAlign.CENTER;
        haveNum.setPosition(haveNumBg.x, haveNumBg.y + 8);
        this.addChildToContainer(haveNum);
        this.haveNum = haveNum;
        var nowHeightBg = BaseBitmap.create(this.getDefaultRes("ackite_nowheightbg"));
        this.addChildToContainer(nowHeightBg);
        // nowHeightBg.width = 140;
        nowHeightBg.setPosition(GameConfig.stageWidth - nowHeightBg.width - 40, descBg.y + descBg.height + 30);
        this.nowHeightBg = nowHeightBg;
        var nowStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteCurHeight", this.getTypeCode()), ["" + this.vo.nowhight * this.cfg.unitLength]);
        var nowHeightTxt = ComponentManager.getTextField(nowStr, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.nowHeightTxt = nowHeightTxt;
        nowHeightTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        // nowHeightBg.width = nowHeightTxt.width + 30;
        // nowHeightBg.x = GameConfig.stageWidth - nowHeightBg.width - 30;
        nowHeightTxt.setPosition(nowHeightBg.x + nowHeightBg.width - nowHeightTxt.width - 5, nowHeightBg.y + nowHeightBg.height / 2 - nowHeightTxt.height / 2);
        this.addChildToContainer(nowHeightTxt);
        this.initRightBar();
        this.refreshUi();
    };
    AcKiteView.prototype.initRightBar = function () {
        var rightBarCon = new BaseDisplayObjectContainer();
        this.rightBarCon = rightBarCon;
        this.kiteCon.addChild(rightBarCon);
        rightBarCon.setPosition(GameConfig.stageWidth - 20, this.kiteBg.height - 1136 + 380);
        rightBarCon.rotation = -90;
        var rightBarBg = BaseBitmap.create(this.getDefaultRes("ackite_progressbg"));
        rightBarCon.anchorOffsetY = rightBarBg.height / 2;
        rightBarBg.width = this.kiteBg.height - 210 + (1136 - GameConfig.stageHeigth);
        rightBarCon.addChild(rightBarBg);
        this.rightBarBg = rightBarBg;
        var rightBar = BaseBitmap.create(this.getDefaultRes("ackite_progress"));
        rightBar.anchorOffsetY = rightBar.height / 2;
        rightBar.x = rightBarBg.x;
        rightBar.y = rightBarBg.height / 2;
        rightBar.width = this.kiteBg.height - 1136;
        this.rightBar = rightBar;
        rightBarCon.addChild(rightBar);
        var tipLong = rightBarBg.width;
        var tipNum = Math.round(tipLong / this.unitPixel);
        this.rightBarTips = [];
        this.rightBarTips.length = 0;
        this.refreshRightBar();
    };
    AcKiteView.prototype.getBgImgHeight = function () {
        var height = this.kiteBg.height;
        if (height >= 2048) {
            height = 2048;
        }
        return height;
    };
    AcKiteView.prototype.initKiteContainer = function () {
        this.nowPos = this.vo.posinfo;
        var kiteCon = new BaseDisplayObjectContainer();
        this.kiteCon = kiteCon;
        kiteCon.width = 640;
        var bgName = this.getBgName();
        if (bgName) {
            var kiteBg = new BaseDisplayObjectContainer();
            kiteBg.width = 640;
            this.kiteBg = kiteBg;
            kiteBg.height = this.nowPos.y * this.unitPixel + 1136;
            kiteCon.addChild(kiteBg);
            //真正的bg图片
            var kiteBgImg = BaseBitmap.create(bgName);
            this.kiteBgImg = kiteBgImg;
            kiteBgImg.height = this.getBgImgHeight();
            kiteBg.addChild(kiteBgImg);
            this.cloudCon = new BaseDisplayObjectContainer();
            kiteCon.addChild(this.cloudCon);
            this.refreshCloud();
            this.windsCon = new BaseDisplayObjectContainer();
            kiteCon.addChild(this.windsCon);
        }
        var kiteScrView = ComponentManager.getScrollView(kiteCon, new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth));
        this.addChildToContainer(kiteScrView);
        this._scollView = kiteScrView;
        kiteScrView.verticalScrollPolicy = "off";
        kiteScrView.bounces = false;
        //风筝线 风筝 线轮
        var kiteLine = new egret.Shape();
        kiteLine.graphics.lineStyle(2, 0x061B31);
        kiteLine.graphics.moveTo(this.kitePoint.x, this.kitePoint.y);
        kiteLine.graphics.lineTo(this.lineCirclePoint.x - this.kitePoint.x, this.lineCirclePoint.y - this.kitePoint.y);
        kiteLine.graphics.endFill();
        this.kiteCon.addChild(kiteLine);
        this.kiteLine = kiteLine;
        // let kiteLine = BaseBitmap.create(this.getDefaultRes(`ackite_kiteline`));
        // this.addChild(kiteLine);
        // this.kiteLine = kiteLine;
        var kite = new BaseDisplayObjectContainer();
        kite.anchorOffsetX = 169 / 2;
        kite.anchorOffsetY = 90;
        this.kiteCon.addChild(kite);
        this.kite = kite;
        var kiteBone = "fengzheng";
        var kiteBoneName = "fengzheng_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && RES.hasRes(kiteBoneName) && App.CommonUtil.check_dragon()) {
            var kiteDro = App.DragonBonesUtil.getLoadDragonBones(kiteBone);
            this.kite.addChild(kiteDro);
            kiteDro.setPosition(-265, 890);
        }
        else {
            var kiteImg = BaseBitmap.create(this.getDefaultRes("ackite_kite"));
            this.kite.addChild(kiteImg);
        }
        var lineCircle = BaseBitmap.create("ackite_linehandler_1");
        lineCircle.anchorOffsetX = 15;
        lineCircle.anchorOffsetY = 125;
        this.kiteCon.addChild(lineCircle);
        this.lineCircle = lineCircle;
        var lineCircleAni = ComponentManager.getCustomMovieClip("ackite_linehandler_", 3);
        lineCircleAni.anchorOffsetX = 15;
        lineCircleAni.anchorOffsetY = 125;
        this.kiteCon.addChild(lineCircleAni);
        this.lineCircleAni = lineCircleAni;
        this.lineCircleAni.visible = false;
        var fakelineCircle = BaseBitmap.create("ackite_linehandler_1");
        fakelineCircle.anchorOffsetX = 15;
        fakelineCircle.anchorOffsetY = 125;
        this.addChildToContainer(fakelineCircle);
        this.fakelineCircle = fakelineCircle;
        this.fakelineCircle.visible = false;
        var fakelineCircleAni = ComponentManager.getCustomMovieClip("ackite_linehandler_", 3);
        fakelineCircleAni.anchorOffsetX = 15;
        fakelineCircleAni.anchorOffsetY = 125;
        this.addChildToContainer(fakelineCircleAni);
        this.fakelineCircleAni = fakelineCircleAni;
        this.fakelineCircleAni.visible = false;
        this.refreshKite();
        //左上右 按钮
        for (var i = 1; i <= 3; i++) {
            var btnDirection = "left";
            if (i == 2) {
                btnDirection = "up";
            }
            else if (i == 3) {
                btnDirection = "right";
            }
            var goBtn = ComponentManager.getButton(this.getDefaultRes("ackite_go" + btnDirection), "", this.kiteBtn, this, [i]);
            goBtn.setPosition(120 + 155 * (i - 1), GameConfig.stageHeigth - 240);
            this.addChildToContainer(goBtn);
        }
    };
    AcKiteView.prototype.refreshWind = function () {
        var kiteBottomY = this.kiteBg.height - this.kiteState[2].y;
        var kiteY = this.nowPos.y;
        var windInfo = this.vo.mapinfo;
        for (var key in windInfo) {
            if (Number(key) < this.vo.maxhight) {
                if (this.winds[key]) {
                    this.winds[key]["windInfo"] = {};
                    this.winds[key].dispose();
                    this.winds[key] = null;
                }
            }
            else {
                if (Number(key) <= (kiteY + 5)) {
                    if (!this.winds[key]) {
                        var windCon = new BaseDisplayObjectContainer();
                        this.windsCon.addChild(windCon);
                        var wind = ComponentManager.getCustomMovieClip("ackite_meetwind_", 8);
                        wind.playWithTime(0);
                        wind.name = "wind";
                        windCon.anchorOffsetX = 208 / 2;
                        windCon.anchorOffsetY = 159 / 2;
                        var windX = Object.keys(windInfo[key])[0];
                        var windType = Number(windInfo[key][Object.keys(windInfo[key])[0]]);
                        windCon.setPosition(this.kiteState[windX].x, this.kiteBg.height - kiteBottomY - (Number(key) - this.nowPos.y) * this.unitPixel);
                        windCon.addChild(wind);
                        windCon["windInfo"] = {
                            x: Number(windX),
                            y: Number(key),
                            type: windType,
                            bottomY: kiteBottomY + (Number(key) - this.nowPos.y) * this.unitPixel
                        };
                        var windTxtBg = BaseBitmap.create(this.getDefaultRes("ackite_windtxtbg"));
                        windTxtBg.setPosition(wind.x + 208 / 2 - windTxtBg.width / 2 - 30, wind.y + 159 / 2 - windTxtBg.height / 2 - 20);
                        windCon.addChild(windTxtBg);
                        var dtDis = this.cfg.unitLength * this.cfg.followingWindEffect;
                        if (Number(windType) == 2) {
                            dtDis = this.cfg.unitLength * this.cfg.againstWindEffect;
                        }
                        var windTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKite_windtype" + windType, this.getTypeCode()), ["" + dtDis]), 18);
                        windTxt.textAlign = egret.HorizontalAlign.CENTER;
                        windTxt.lineSpacing = 2;
                        windTxtBg.width = windTxt.width + 12;
                        windTxtBg.height = windTxt.height + 12;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, windTxt, windTxtBg);
                        windCon.addChild(windTxt);
                        this.winds[key] = windCon;
                    }
                }
            }
        }
    };
    AcKiteView.prototype.refreshCloud = function () {
        var maxCloud = this.nowPos.y + 5;
        var minCloud = this.nowPos.y - 3;
        if (minCloud < 0) {
            return;
        }
        var beginY = 900;
        for (var ckey in this.clouds) {
            if (this.clouds.hasOwnProperty(ckey)) {
                var thisCloud = this.clouds[ckey];
                if (thisCloud && thisCloud.y > 1136 + 3 * this.unitPixel) {
                    egret.Tween.removeTweens(thisCloud);
                    thisCloud["cloudInfo"] = null;
                    thisCloud.dispose();
                    thisCloud = null;
                }
            }
        }
        var _loop_2 = function (i) {
            if (i % 3 == 0) {
                if (!this_2.clouds[i] || !this_2.clouds[i]["cloudInfo"]) {
                    var cloudBottomY = (beginY + i * this_2.unitPixel);
                    var cloudId = 1;
                    var cloudRes = this_2.getDefaultRes("ackite_cloud" + cloudId);
                    var cloud_1 = BaseBitmap.create(cloudRes);
                    this_2.clouds[i] = cloud_1;
                    cloud_1.anchorOffsetX = cloud_1.width / 2;
                    cloud_1.y = this_2.kiteBg.height - cloudBottomY;
                    if (cloudId == 2) {
                        if (Math.random() > 0.5) {
                            cloud_1.scaleX = -1;
                            cloud_1.x = GameConfig.stageWidth - cloud_1.width / 2;
                        }
                        else {
                            cloud_1.x = cloud_1.width / 2;
                        }
                    }
                    else {
                        if (Math.random() > 0.5) {
                            cloud_1.scaleX = -1;
                        }
                        cloud_1.setScale(0.7 + 0.3 * Math.random());
                        var beginX_1 = -cloud_1.width / 2 * cloud_1.scaleY;
                        var endX_1 = GameConfig.stageWidth + cloud_1.width / 2 * cloud_1.scaleY;
                        var bornX = 40 + 500 * Math.random();
                        if (i < 3) {
                            bornX = beginX_1;
                        }
                        var during_1 = (30 + 5 * Math.random()) * 1000;
                        cloud_1.x = bornX;
                        egret.Tween.get(cloud_1)
                            .to({ x: endX_1 }, during_1 * (endX_1 - bornX) / (endX_1 - beginX_1))
                            .call(function () {
                            cloud_1.x = beginX_1;
                            egret.Tween.removeTweens(cloud_1);
                            egret.Tween.get(cloud_1, { loop: true })
                                .to({ x: endX_1 }, during_1);
                        });
                    }
                    this_2.cloudCon.addChild(cloud_1);
                    cloud_1["cloudInfo"] = {
                        bottomY: cloudBottomY
                    };
                }
            }
        };
        var this_2 = this;
        for (var i = minCloud; i <= maxCloud; i++) {
            _loop_2(i);
        }
    };
    AcKiteView.prototype.refreshKite = function () {
        var xPosIndex = this.nowPos.x;
        this.kite.x = this.kiteState[xPosIndex].x;
        this.kite.y = this.kiteState[xPosIndex].y;
        this.kite.rotation = this.kiteState[xPosIndex].rotation;
        this.lineCircle.x = this.lineCircleState[xPosIndex].x;
        this.lineCircle.y = this.lineCircleState[xPosIndex].y;
        this.lineCircle.rotation = this.lineCircleState[xPosIndex].rotation;
        this.lineCircleAni.x = this.lineCircleState[xPosIndex].x;
        this.lineCircleAni.y = this.lineCircleState[xPosIndex].y;
        this.lineCircleAni.rotation = this.lineCircleState[xPosIndex].rotation;
        this.fakelineCircle.x = this.fakelineCircleState[xPosIndex].x;
        this.fakelineCircle.y = this.fakelineCircleState[xPosIndex].y;
        this.fakelineCircle.rotation = this.fakelineCircleState[xPosIndex].rotation;
        this.fakelineCircleAni.x = this.fakelineCircleState[xPosIndex].x;
        this.fakelineCircleAni.y = this.fakelineCircleState[xPosIndex].y;
        this.fakelineCircleAni.rotation = this.fakelineCircleState[xPosIndex].rotation;
        this.refreshKiteLine();
        this.refreshWind();
        this.refreshCloud();
        this.refreshRightBar();
        this.kiteCon.height = this.kiteBg.height;
    };
    AcKiteView.prototype.refreshRightBar = function () {
        if (this.rightBarCon && this.rightBarBg && this.rightBar) {
            this.rightBarBg.width = this.kiteBg.height - 210 + (1136 - GameConfig.stageHeigth);
            this.rightBar.width = this.kiteBg.height - 1136;
            var tipLong = this.rightBarBg.width;
            var tipNum = Math.round(tipLong / this.unitPixel);
            if (tipNum + 1 > this.rightBarTips.length) {
                for (var i = 0; i < tipNum + 1; i++) {
                    if (this.rightBarTips[i] && this.rightBarTips[i].numChildren) {
                        continue;
                    }
                    var tipCon = new BaseDisplayObjectContainer();
                    var tipBg = BaseBitmap.create(this.getDefaultRes("ackite_kiteprogressbg"));
                    tipCon.addChild(tipBg);
                    var tipTxt = ComponentManager.getTextField(this.cfg.unitLength * i + '', 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg, [0, 0]);
                    tipCon.addChild(tipTxt);
                    tipCon.width = tipBg.width;
                    tipCon.height = tipBg.height;
                    tipCon.setPosition(this.rightBarBg.x + i * this.unitPixel + 30, -10.5);
                    tipCon.rotation = 90;
                    this.rightBarTips.push(tipCon);
                    this.rightBarCon.addChild(tipCon);
                }
            }
        }
    };
    AcKiteView.prototype.refreshKiteLine = function () {
        // this.kiteLine.setPosition(this.kitePoint.x,this.kitePoint.y);
        // this.kiteLine.height = this.getLineHeight();
        // this.kiteLine.rotation = -Math.atan((this.lineCirclePoint.x-this.kitePoint.x)/(this.lineCirclePoint.y-this.kitePoint.y))*180/Math.PI;
        // if (this.kiteLine.height >= 620 + (1136 - GameConfig.stageHeigth)) {
        //     let baseLen = this.kiteLine.height - 620 - (1136 - GameConfig.stageHeigth);
        //     App.ShaderUtil.setAcKiteLineShader(this.kiteLine, 100 / baseLen, 150 / baseLen);
        // } else {
        //     App.ShaderUtil.removeShader(this.kiteLine)
        // }
        if (App.DeviceUtil.CheckWebglRenderMode()) {
            // App.LogUtil.log("x, y ",this.lineCirclePoint.x , this.kitePoint.x, this.lineCirclePoint.y , this.kitePoint.y);
            this.kiteLine.x = this.kitePoint.x;
            this.kiteLine.y = this.kitePoint.y;
            this.kiteLine.graphics.clear();
            this.kiteLine.graphics.lineStyle(2, 0x061B31);
            this.kiteLine.graphics.moveTo(0, 0);
            this.kiteLine.graphics.lineTo(this.lineCirclePoint.x - this.kitePoint.x, this.lineCirclePoint.y - this.kitePoint.y);
            this.kiteLine.graphics.endFill();
            if (this.kiteBgImg.height >= 1136 + 2 * this.unitPixel) {
                var long = Math.sqrt((this.lineCirclePoint.x - this.kitePoint.x) * (this.lineCirclePoint.x - this.kitePoint.x) + (this.lineCirclePoint.y - this.kitePoint.y) * (this.lineCirclePoint.y - this.kitePoint.y));
                var baseLen = this.kiteBgImg.height - 620 - (1136 - GameConfig.stageHeigth);
                var baseA = 100 * GameConfig.stageHeigth / 1136;
                var baseB = 150 * GameConfig.stageHeigth / 1136;
                App.ShaderUtil.setAcKiteLineShader(this.kiteLine, baseA / long, baseB / long);
            }
            else {
                App.ShaderUtil.removeShader(this.kiteLine);
            }
        }
        else {
            this.kiteLine.x = this.kitePoint.x;
            this.kiteLine.y = this.kitePoint.y;
            this.kiteLine.graphics.clear();
            this.kiteLine.graphics.lineStyle(2, 0x061B31);
            this.kiteLine.graphics.moveTo(0, 0);
            if (this.kiteBgImg.height >= 1136 + 2 * this.unitPixel) {
                var long = Math.sqrt((this.lineCirclePoint.x - this.kitePoint.x) * (this.lineCirclePoint.x - this.kitePoint.x) + (this.lineCirclePoint.y - this.kitePoint.y) * (this.lineCirclePoint.y - this.kitePoint.y));
                this.kiteLine.graphics.lineTo((this.lineCirclePoint.x - this.kitePoint.x) * 350 / long, (this.lineCirclePoint.y - this.kitePoint.y) * 350 / long);
            }
            else {
                this.kiteLine.graphics.lineTo(this.lineCirclePoint.x - this.kitePoint.x, this.lineCirclePoint.y - this.kitePoint.y);
            }
            this.kiteLine.graphics.endFill();
        }
    };
    AcKiteView.prototype.getLineHeight = function () {
        return Math.sqrt(Math.pow(this.lineCirclePoint.x - this.kitePoint.x, 2) + (Math.pow(this.lineCirclePoint.y - this.kitePoint.y, 2)));
    };
    AcKiteView.prototype.setIsPlay = function (isPlayAni) {
        if (!isPlayAni) {
            var rewardList = GameData.formatRewardItem(this.rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        this._isPlayAni = isPlayAni;
    };
    AcKiteView.prototype.moveKite = function (wind, rewards) {
        var _this = this;
        this.setIsPlay(true);
        var aimPos = this.nowPos.x;
        if (!wind) {
            if (this.btnParam == 1) {
                aimPos--;
            }
            else if (this.btnParam == 3) {
                aimPos++;
            }
        }
        aimPos = aimPos < 1 ? 1 : aimPos;
        aimPos = aimPos > 3 ? 3 : aimPos;
        //上升
        if (wind || this.btnParam == 2) {
            //线轮
            if (this.kiteBg.height >= 1136 + 2 * this.unitPixel) {
                this.fakelineCircle.visible = false;
                this.fakelineCircleAni.visible = true;
                this.fakelineCircleAni.goToAndPlay(0);
                this.fakelineCircleAni.playWithTime(0);
            }
            else {
                this.fakelineCircle.visible = false;
                this.fakelineCircleAni.visible = false;
                this.lineCircle.visible = false;
                this.lineCircleAni.visible = true;
                this.lineCircleAni.goToAndPlay(0);
                this.lineCircleAni.playWithTime(0);
            }
            var aimPosY_1 = this.nowPos.y;
            if (wind) {
                if (wind == 1) {
                    aimPosY_1 += this.cfg.followingWindEffect;
                }
                else {
                    aimPosY_1 -= this.cfg.againstWindEffect;
                }
            }
            else {
                aimPosY_1++;
            }
            //背景
            var aimBgHeight = aimPosY_1 * this.unitPixel + 1136;
            egret.Tween.get(this.kiteBg, { onChange: this.updateWindPosition, onChangeObj: this })
                .to({ height: aimBgHeight }, 500)
                .call(function () {
                _this.nowPos.y = aimPosY_1;
                if (_this.lineCircle) {
                    _this.lineCircle.visible = true;
                }
                if (_this.lineCircleAni) {
                    _this.lineCircleAni.stop();
                    _this.lineCircleAni.visible = false;
                }
                if (_this.fakelineCircle && _this.fakelineCircleAni) {
                    _this.fakelineCircle.visible = false;
                    _this.fakelineCircleAni.visible = false;
                    ;
                }
            }, this).wait(50).call(this.checkMeetWind, this);
        }
        else {
            //风筝 线轮
            if (this.kiteBg.height >= 1136 + 2 * this.unitPixel) {
                this.fakelineCircle.visible = true;
                this.fakelineCircleAni.visible = false;
                var aimfakelineCircleProp = this.fakelineCircleState[aimPos];
                egret.Tween.get(this.fakelineCircle).to(aimfakelineCircleProp, 500)
                    .call(function () {
                    if (_this.fakelineCircle && _this.fakelineCircleAni) {
                        _this.fakelineCircle.visible = false;
                        _this.fakelineCircleAni.visible = false;
                        ;
                    }
                }, this);
            }
            else {
                this.lineCircle.visible = true;
                this.lineCircleAni.visible = false;
                this.fakelineCircle.visible = false;
                this.fakelineCircleAni.visible = false;
            }
            var aimKiteProp = this.kiteState[aimPos];
            egret.Tween.get(this.kite).to(aimKiteProp, 500);
            var aimlineCircleProp = this.lineCircleState[aimPos];
            egret.Tween.get(this.lineCircle, { onChange: this.refreshKiteLine, onChangeObj: this }).to(aimlineCircleProp, 500)
                .call(function () {
                _this.nowPos.x = aimPos;
                _this.checkMeetWind();
            }, this);
        }
    };
    AcKiteView.prototype.checkMeetWind = function () {
        egret.Tween.removeTweens(this.kiteBg);
        this.refreshKite();
        var isMeetWind = false;
        var _loop_3 = function (key) {
            var wind = this_3.winds[key];
            if (wind) {
                var windInfo = wind["windInfo"];
                if (windInfo) {
                    if (this_3.nowPos.x == windInfo.x && this_3.nowPos.y == windInfo.y) {
                        isMeetWind = true;
                        wind["windInfo"] = {};
                        this_3.moveKite(windInfo.type);
                        egret.Tween.get(wind).to({ alpha: 0 }, 300).call(function () {
                            if (wind) {
                                wind.dispose();
                                wind = null;
                            }
                        });
                    }
                }
            }
        };
        var this_3 = this;
        for (var key in this.winds) {
            _loop_3(key);
        }
        if (!isMeetWind) {
            this.setIsPlay(false);
        }
        //this.refreshKite();
        //this.moveKite(1);
    };
    AcKiteView.prototype.updateWindPosition = function () {
        if (this.lineCircle) {
            this.lineCircle.y = this.lineCircleState[this.nowPos.x].y;
        }
        if (this.lineCircleAni) {
            this.lineCircleAni.y = this.lineCircleState[this.nowPos.x].y;
        }
        if (this.fakelineCircle) {
            this.fakelineCircle.y = this.fakelineCircleState[this.nowPos.x].y;
        }
        if (this.fakelineCircleAni) {
            this.fakelineCircleAni.y = this.fakelineCircleState[this.nowPos.x].y;
        }
        if (this.kiteBgImg) {
            this.kiteBgImg.height = this.getBgImgHeight();
        }
        this.refreshKiteLine();
        for (var key in this.winds) {
            var windCon = this.winds[key];
            if (windCon) {
                var windInfo = windCon["windInfo"];
                if (windInfo && windInfo.bottomY) {
                    windCon.y = this.kiteBg.height - windInfo.bottomY;
                }
            }
        }
        for (var ckey in this.clouds) {
            var cloud = this.clouds[ckey];
            if (cloud) {
                var cloudInfo = cloud["cloudInfo"];
                if (cloudInfo && cloudInfo.bottomY) {
                    cloud.y = this.kiteBg.height - cloudInfo.bottomY;
                }
            }
        }
        if (this.rightBarCon && this.rightBar) {
            this.rightBarCon.y = this.kiteBg.height - 1136 + 380;
            this.rightBar.width = this.kiteBg.height - 1136;
        }
    };
    Object.defineProperty(AcKiteView.prototype, "kitePoint", {
        get: function () {
            if (this.kite) {
                return { x: this.kite.x, y: this.kite.y };
            }
            return { x: 0, y: 0 };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteView.prototype, "lineCirclePoint", {
        get: function () {
            if (this.lineCircle) {
                var _a = 43;
                var _b = 90;
                var _rot = Math.atan(_b / _a);
                var _nowAngle = _rot - this.lineCircle.rotation / 180 * Math.PI;
                var _long = Math.sqrt(_a * _a + _b * _b);
                // App.LogUtil.log("lincecircle "+_long + " lincircle.y "+this.lineCircle.y + " yy "+_long * Math.sin(_nowAngle));
                return { x: this.lineCircle.x + _long * Math.cos(_nowAngle), y: this.lineCircle.y - _long * Math.sin(_nowAngle) };
            }
            return { x: 0, y: 0 };
        },
        enumerable: true,
        configurable: true
    });
    //1左 2上 3右
    AcKiteView.prototype.kiteBtn = function (param) {
        if (this._isPlayAni) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.scorenum <= 0) {
            var message = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKite_notenough", this.getTypeCode()), ["" + this.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        if (this.nowPos.x == 1 && param == 1) {
            return;
        }
        if (this.nowPos.x == 3 && param == 3) {
            return;
        }
        this.btnParam = param;
        this.nowPos = this.vo.posinfo;
        this._isPlayAni = true;
        this.refreshKite();
        NetManager.request(NetRequestConst.REQUEST_ACKITE_LOTTERY, {
            activeId: this.vo.aidAndCode,
            gid: param
        });
    };
    AcKiteView.prototype.refreshUi = function () {
        this._numTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteProcess", this.getTypeCode()), ['' + this.vo.lotterynum]);
        this.haveNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteCanUseNum", this.getTypeCode()), ["" + this.cfg.unitLength, String(this.vo.starNum)]);
        this.nowHeightTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteCurHeight", this.getTypeCode()), ["" + this.vo.nowhight * this.cfg.unitLength]);
        // this.nowHeightBg.width = this.nowHeightTxt.width + 30;
        // this.nowHeightBg.x = GameConfig.stageWidth - 30 - this.nowHeightBg.width;
        this.nowHeightTxt.x = this.nowHeightBg.x + this.nowHeightBg.width - this.nowHeightTxt.width - 5;
        if (this.vo.isHaveTaskRedDot() || this.vo.isHaveBoxRedDot()) {
            App.CommonUtil.addIconToBDOC(this.detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this.detailBtn);
        }
        this.refreshBox();
    };
    AcKiteView.prototype.refreshBox = function () {
        this._progressBar.setPercentage(this.vo.progressPercent);
        this._proLight.x = this._progressBar.x + this._progressBar.width * this.vo.progressPercent;
        var progress = this.cfg.progressList;
        for (var index = 0; index < 5; index++) {
            var rStatus = this.vo.getBoxStatusByIndex(progress[index].id);
            var imgres = this.getDefaultRes("ackite_box" + rStatus);
            var boxImg = this.container.getChildByName("boxImg" + index);
            var lightImg = this.container.getChildByName("lightImg" + index);
            if (boxImg instanceof (BaseBitmap)) {
                boxImg.setRes(imgres);
            }
            if (rStatus == 2) {
                lightImg.visible = true;
                egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            }
            else {
                lightImg.visible = false;
                egret.Tween.removeTweens(lightImg);
                egret.Tween.removeTweens(boxImg);
            }
        }
        if (this.vo.isSecondProcess()) {
            var rStatus = this.vo.getBoxStatusByIndex(progress[4].id);
            if (rStatus == 3) {
                var boxImg = this.container.getChildByName("boxImg4");
                var lightImg = this.container.getChildByName("lightImg4");
                if (this.vo.isSecondProcessRed()) {
                    boxImg.setRes(this.getDefaultRes("ackite_box2"));
                    lightImg.visible = true;
                    egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                    egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
                else {
                    boxImg.setRes(this.getDefaultRes("ackite_box3"));
                    lightImg.visible = false;
                    egret.Tween.removeTweens(lightImg);
                    egret.Tween.removeTweens(boxImg);
                }
            }
        }
    };
    AcKiteView.prototype.infoBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACKITEDETAILPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    /**
     * 抽奖的的返回数据
     */
    AcKiteView.prototype.receiveRewardHandle = function (event) {
        var ret = event.data.ret;
        if (!ret) {
            return;
        }
        var data = event.data.data.data;
        var cmd = event.data.data.cmd;
        if (ret) {
            if (data.rewards) {
                this.rewards = data.rewards;
            }
            this.moveKite();
        }
    };
    AcKiteView.prototype.tick = function () {
        this._timeTxt.text = this.vo.acCountDown;
        this._timeBg.width = 60 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
    };
    Object.defineProperty(AcKiteView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    AcKiteView.prototype.getBgName = function () {
        return this.getDefaultRes("ackite_bg");
    };
    AcKiteView.prototype.getTitleBgName = function () {
        return this.getDefaultRes("ackite_titlebg");
    };
    AcKiteView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acKiteRuleInfo", this.getTypeCode());
    };
    AcKiteView.prototype.getRuleInfoParam = function () {
        var skinNeed = this.vo.getSkinNeedData();
        return [String(this.cfg.cost), String("" + skinNeed)];
    };
    AcKiteView.prototype.getTitleStr = function () {
        return null;
    };
    AcKiteView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acKiteProbablyInfo", this.getTypeCode());
    };
    AcKiteView.prototype.getRequestData = function () {
        if (this.vo.firstOpen != 1) {
            return { requestType: NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, requestData: { activeId: this.vo.aidAndCode, flagkey: "firstOpen", value: 1 } };
        }
        return null;
    };
    Object.defineProperty(AcKiteView.prototype, "kiteState", {
        get: function () {
            return {
                "1": { x: 100, y: 430, rotation: -10 },
                "2": { x: 320, y: 420, rotation: 0 },
                "3": { x: 500, y: 430, rotation: 10 },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteView.prototype, "lineCircleState", {
        get: function () {
            if (this.kiteBg) {
                return {
                    "1": { x: 250, y: this.kiteBgImg.height - 200 - (1136 - GameConfig.stageHeigth), rotation: -50 },
                    "2": { x: 300, y: this.kiteBgImg.height - 200 - (1136 - GameConfig.stageHeigth), rotation: 0 },
                    "3": { x: 320, y: this.kiteBgImg.height - 200 - (1136 - GameConfig.stageHeigth), rotation: 15 },
                };
            }
            else {
                return {
                    "1": { x: 250, y: GameConfig.stageHeigth - 200, rotation: -50 },
                    "2": { x: 300, y: GameConfig.stageHeigth - 200, rotation: 0 },
                    "3": { x: 320, y: GameConfig.stageHeigth - 200, rotation: 15 },
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteView.prototype, "fakelineCircleState", {
        get: function () {
            return {
                "1": { x: 250, y: GameConfig.stageHeigth - 200, rotation: -50 },
                "2": { x: 300, y: GameConfig.stageHeigth - 200, rotation: 0 },
                "3": { x: 320, y: GameConfig.stageHeigth - 200, rotation: 15 },
            };
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcKiteView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode ? defaultCode : "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else if (ResourceManager.hasRes(resName + "-" + defaultCode)) {
            return resName + "-" + defaultCode;
        }
        else {
            return resName;
        }
    };
    AcKiteView.prototype.getTypeCode = function () {
        // if (this.code == "2"){
        //     return "1";
        // }
        return this.code;
    };
    AcKiteView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcKiteView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcKiteView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([
            "ackite_bottombg", "ackite_box1", "ackite_box2", "ackite_box3", "ackite_cloud1",
            "ackite_cloud2", "ackite_descbg", "ackite_goleft", "ackite_goright", "ackite_goup", "ackite_havenumbg", "ackite_kite",
            "ackite_kiteline", "ackite_kiteprogressbg", "ackite_progress", "ackite_progressbg", "ackite_progresshead", "ackite_poolbtn",
            "ackite_titlebg", "ackite_wind", "ackite_windtxtbg", "ackite_detailbtn", "ackite_bg", "ackite_nowheightbg",
            "ackite_ranktitlebg1", "ackite_ranktitlebg2", "ackite_ranktitlebg3", "ackite_ranktitlebg4", "ackite_tasktitlebg", "ackite_processtitlebg",
        ]);
        return _super.prototype.getResourceList.call(this).concat(codeRes).concat([
            "acthreekingofwife_infobg-1",
            "ackite_linehandler_1",
            "acchaoting_closebtn",
            "dailytask_box_light",
            "acwealthcomingview_progresslight",
        ]);
    };
    return AcKiteView;
}(AcCommonView));
__reflect(AcKiteView.prototype, "AcKiteView");
//# sourceMappingURL=AcKiteView.js.map