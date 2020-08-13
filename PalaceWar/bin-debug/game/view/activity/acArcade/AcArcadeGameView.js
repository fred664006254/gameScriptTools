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
  * 拉霸机活动
  * @author 张朝阳
  * date 2019/6/6
  * @class AcArcadeGameView
  */
var AcArcadeGameView = (function (_super) {
    __extends(AcArcadeGameView, _super);
    function AcArcadeGameView() {
        var _this = _super.call(this) || this;
        _this._lightEffect1 = null;
        _this._lightEffect2 = null;
        _this._gameBM = null;
        _this._useBg = null;
        _this._useTF = null;
        _this._machineContainer = null;
        _this._numBg = null;
        _this._numTF = null;
        _this._pullrodUp = null;
        _this._pullrodDown = null;
        _this._leftBtn = null;
        _this._rightBtn = null;
        _this._leftBtnTxt = null;
        _this._rightBtnTxt = null;
        _this.code = null;
        _this.aid = null;
        _this._gameCoin = null;
        _this._leftPoint = null;
        _this._rightPoint = null;
        _this._gameCoinScale = 0.27;
        _this._txtEffect = null;
        /** 对象池 */
        _this._rewardsPool = {};
        /**位置信息1 */
        _this._posList1 = [];
        /**位置信息2 */
        _this._posList2 = [];
        /**位置信息3 */
        _this._posList3 = [];
        /**reward 信息 */
        _this._containerList1 = [];
        /**reward 信息 */
        _this._containerList2 = [];
        /**reward 信息 */
        _this._containerList3 = [];
        _this._startPosY1 = 0;
        _this._startPosY2 = 0;
        _this._startPosY3 = 0;
        _this._rewardsVoList = null;
        _this._index1 = 0;
        _this._slideIndex1 = 0;
        _this._index2 = 0;
        _this._slideIndex2 = 0;
        _this._index3 = 0;
        _this._slideIndex3 = 0;
        _this._endPosY1 = 0;
        _this._isStop1 = false;
        _this._stopIndex1 = 0;
        _this._endPosY2 = 0;
        _this._isStop2 = false;
        _this._stopIndex2 = 0;
        _this._endPosY3 = 0;
        _this._isStop3 = false;
        _this._stopIndex3 = 0;
        _this._lastId1 = null;
        _this._lastId2 = null;
        _this._lastId3 = null;
        _this._isPlayAni = false;
        _this._offestId1 = 0;
        _this._offestId2 = 0;
        _this._offestId3 = 0;
        _this._farmelightEffect = null;
        _this._container1 = null;
        _this._container2 = null;
        _this._container3 = null;
        _this._handlerData = null;
        _this._fireEffect1 = null;
        _this._fireEffect2 = null;
        _this._fireEffect3 = null;
        _this._fireEffect4 = null;
        _this._isBatch = false;
        _this._lihuaCfg = {
            1: { color: 'hong', pos: [112, 118], scale: 1.5, wait: 0 },
            2: { color: 'huang', pos: [374, 118], scale: 1.5, wait: 200 },
            3: { color: 'lan', pos: [50, 262], scale: 1.5, wait: 400 },
            4: { color: 'huang', pos: [432, 262], scale: 1.5, wait: 650 },
            5: { color: 'hong', pos: [-36, 408], scale: 1.5, wait: 900 },
            6: { color: 'lan', pos: [524, 408], scale: 1.5, wait: 1100 },
        };
        _this._bg = null;
        _this._lihuaIndex = 0;
        return _this;
    }
    AcArcadeGameView.prototype.getContainerY = function () {
        return 0;
    };
    AcArcadeGameView.prototype.initView = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, this.logsHandle, this);
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;
        var bg = BaseLoadBitmap.create("acarcadeview_laba_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        this._bg = bg;
        var titleBg = BaseLoadBitmap.create("acarcadeview_laba_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);
        this.addChildToContainer(titleBg);
        //奖池
        var rewardbtn = ComponentManager.getButton("acarcadeview_rewardbtn-" + this.getUiCode(), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACARCADEGAMEREWARDVIEW, { code: _this.code, aid: _this.aid });
        }, this);
        rewardbtn.setPosition(titleBg.x + 35, titleBg.y + titleBg.height + 40);
        this.addChildToContainer(rewardbtn);
        //记录
        var logBtn = ComponentManager.getButton("acarcadeview_logbtn-" + this.getUiCode(), "", function () {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, { activeId: vo.aidAndCode });
        }, this);
        logBtn.setPosition(titleBg.x + titleBg.width - logBtn.width - 35, rewardbtn.y);
        this.addChildToContainer(logBtn);
        this._gameBM = BaseLoadBitmap.create("acarcadeview_machine-" + this.getUiCode());
        this._gameBM.width = 528;
        this._gameBM.height = 795;
        this._gameBM.setPosition(titleBg.x + titleBg.width / 2 - this._gameBM.width / 2, titleBg.y + titleBg.height + 65);
        this._pullrodUp = BaseLoadBitmap.create("acarcadeview_pullrodup-" + this.getUiCode());
        this._pullrodUp.setPosition(this._gameBM.x + 492, this._gameBM.y + 287);
        this.addChildToContainer(this._pullrodUp);
        this._pullrodDown = BaseLoadBitmap.create("acarcadeview_pullroddown-" + this.getUiCode());
        this._pullrodDown.setPosition(this._gameBM.x + 492, this._gameBM.y + 287);
        this.addChildToContainer(this._pullrodDown);
        this.addChildToContainer(this._gameBM);
        this._lightEffect1 = BaseLoadBitmap.create("acarcadeview_effect_light1");
        this._lightEffect1.setPosition(this._gameBM.x + 69, this._gameBM.y + 22);
        this.addChildToContainer(this._lightEffect1);
        this._lightEffect1.blendMode = egret.BlendMode.ADD;
        this._lightEffect2 = BaseLoadBitmap.create("acarcadeview_effect_light2");
        this._lightEffect2.setPosition(this._gameBM.x + 69, this._gameBM.y + 23);
        this.addChildToContainer(this._lightEffect2);
        this._lightEffect2.blendMode = egret.BlendMode.ADD;
        this._txtEffect = BaseLoadBitmap.create("acarcadeview_effect_txtlight");
        this._txtEffect.setPosition(this._gameBM.x + 89, this._gameBM.y + 44);
        this.addChildToContainer(this._txtEffect);
        this._txtEffect.alpha = 0;
        this._txtEffect.blendMode = egret.BlendMode.ADD;
        this._useBg = BaseLoadBitmap.create("acarcadeview_usebg-" + this.getUiCode());
        this._useBg.width = 259;
        this._useBg.height = 30;
        this._useBg.setPosition(this._gameBM.x + 135, this._gameBM.y + 260);
        this.addChildToContainer(this._useBg);
        this._useTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUse-" + this.code, ["1"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._useTF.setPosition(this._useBg.x + this._useBg.width / 2 - this._useTF.width / 2, this._useBg.y + this._useBg.height / 2 - this._useTF.height / 2);
        this.addChildToContainer(this._useTF);
        this._machineContainer = new BaseDisplayObjectContainer();
        this._machineContainer.width = 384;
        this._machineContainer.height = 176;
        this._machineContainer.setPosition(this._gameBM.x + 72, this._gameBM.y + 305);
        this.addChildToContainer(this._machineContainer);
        this._machineContainer.mask = new egret.Rectangle(0, 0, 384, 176);
        var machineMask = BaseLoadBitmap.create("acarcadeview_machinemask-" + this.getUiCode());
        machineMask.setPosition(this._machineContainer.x, this._machineContainer.y);
        this.addChildToContainer(machineMask);
        this._farmelightEffect = BaseBitmap.create("acarcadeview_effect_farmelight");
        this._farmelightEffect.setPosition(this._machineContainer.x + this._machineContainer.width / 2 - this._farmelightEffect.width / 2, this._machineContainer.y + this._machineContainer.height / 2 - this._farmelightEffect.height / 2);
        this.addChildToContainer(this._farmelightEffect);
        this._farmelightEffect.blendMode = egret.BlendMode.ADD;
        this._farmelightEffect.alpha = 0;
        var fire = BaseBitmap.create("acarcadeview_fire1");
        this._fireEffect1 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect1.anchorOffsetX = fire.width / 2;
        this._fireEffect1.anchorOffsetY = fire.height / 2;
        this._fireEffect1.blendMode = egret.BlendMode.ADD;
        this._fireEffect1.setPosition(this._machineContainer.x, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect1);
        this._fireEffect1.alpha = 0;
        // this._fireEffect1.playWithTime(-1);
        this._fireEffect2 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect2.frameImages = this.getClipArr();
        this._fireEffect2.anchorOffsetX = fire.width / 2;
        this._fireEffect2.anchorOffsetY = fire.height / 2;
        this._fireEffect2.blendMode = egret.BlendMode.ADD;
        this._fireEffect2.setPosition(this._machineContainer.x + 128, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect2);
        this._fireEffect2.alpha = 0;
        // this._fireEffect2.playWithTime(-1);
        this._fireEffect3 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect3.anchorOffsetX = fire.width / 2;
        this._fireEffect3.anchorOffsetY = fire.height / 2;
        this._fireEffect3.blendMode = egret.BlendMode.ADD;
        this._fireEffect3.setPosition(this._machineContainer.x + 256, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect3);
        this._fireEffect3.alpha = 0;
        // this._fireEffect3.playWithTime(-1);
        this._fireEffect4 = ComponentManager.getCustomMovieClip("acarcadeview_fire", 10, 33);
        this._fireEffect4.frameImages = this.getClipArr();
        this._fireEffect4.anchorOffsetX = fire.width / 2;
        this._fireEffect4.anchorOffsetY = fire.height / 2;
        this._fireEffect4.blendMode = egret.BlendMode.ADD;
        this._fireEffect4.setPosition(this._machineContainer.x + 384, this._machineContainer.y + 70);
        this.addChildToContainer(this._fireEffect4);
        this._fireEffect4.alpha = 0;
        // this._fireEffect4.playWithTime(-1);
        this.playCilp1();
        this.playCilp2();
        this.playCilp3();
        this.playCilp4();
        this._leftPoint = BaseBitmap.create("acarcadeview_point-" + this.getUiCode());
        this._leftPoint.anchorOffsetX = 13;
        this._leftPoint.anchorOffsetY = 13;
        this._leftPoint.setPosition(this._machineContainer.x, this._machineContainer.y + this._machineContainer.height / 2);
        this.addChildToContainer(this._leftPoint);
        this._rightPoint = BaseBitmap.create("acarcadeview_point-" + this.getUiCode());
        this._rightPoint.anchorOffsetX = 13;
        this._rightPoint.anchorOffsetY = 13;
        this._rightPoint.rotation = -180;
        this._rightPoint.setPosition(this._machineContainer.x + this._machineContainer.width, this._machineContainer.y + this._machineContainer.height / 2);
        this.addChildToContainer(this._rightPoint);
        this._numBg = BaseLoadBitmap.create("acarcadeview_numbg-" + this.getUiCode());
        this._numBg.width = 259;
        this._numBg.height = 30;
        this._numBg.setPosition(this._gameBM.x + 135, this._gameBM.y + 493);
        this.addChildToContainer(this._numBg);
        this._gameCoin = BaseLoadBitmap.create("acarcadeview_item_gamecoin-" + this.getUiCode());
        this._gameCoin.width = 100;
        this._gameCoin.height = 100;
        this._gameCoin.setScale(this._gameCoinScale);
        this._gameCoin.setPosition(this._numBg.x + this._numBg.width / 2 - this._gameCoin.width * this._gameCoinScale, this._numBg.y + this._numBg.height / 2 - this._gameCoin.height / 2 * this._gameCoinScale);
        this.addChildToContainer(this._gameCoin);
        this._numTF = ComponentManager.getTextField(String(vo.getCoin()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._numTF.setPosition(this._numBg.x + this._numBg.width / 2, this._numBg.y + this._numBg.height / 2 - this._numTF.height / 2);
        this.addChildToContainer(this._numTF);
        this._leftBtn = ComponentManager.getButton("acarcadeview_leftbtn-" + this.getUiCode(), "", function () {
            if (_this._isPlayAni) {
                return;
            }
            var v1 = Api.acVoApi.getActivityVoByAidAndCode(_this.param.data.aid, _this.param.data.code);
            if (v1.checkIsInEndShowTime() || (!v1.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (v1.getCoin() <= 0 && vo.isFree() == false) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeGameRewardViewNotCoin-" + this.code));
                var msg = LanguageManager.getlocal("acArcadeGameViewTipMsg-" + _this.code);
                var title = "itemUseConstPopupViewTitle";
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + _this.code, handler: _this, callback: function () {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADERECHARGEVIEW, { code: _this.code, aid: _this.aid });
                    }
                });
                // App.CommonUtil.showTip(LanguageManager.getlocal("acLiangBiographyView_NoreviewTip-" + this.code));
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, { activeId: vo.aidAndCode, isBatch: 0 });
            // this.movePos();
        }, this);
        this._leftBtn.setPosition(this._gameBM.x + 51, this._gameBM.y + 554);
        this.addChildToContainer(this._leftBtn);
        this._leftBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseOne-" + this.code), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        this._leftBtnTxt.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - this._leftBtnTxt.width / 2, this._leftBtn.y + this._leftBtn.height / 2 - this._leftBtnTxt.height / 2 - 10);
        this.addChildToContainer(this._leftBtnTxt);
        this._rightBtn = ComponentManager.getButton("acarcadeview_rightbtn-" + this.getUiCode(), "", function () {
            if (_this._isPlayAni) {
                return;
            }
            var v1 = Api.acVoApi.getActivityVoByAidAndCode(_this.param.data.aid, _this.param.data.code);
            if (v1.checkIsInEndShowTime() || (!v1.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (v1.getCoin() < 2) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeGameRewardViewNotCoin-" + this.code));
                var msg = LanguageManager.getlocal("acArcadeGameViewTipMsg-" + _this.code);
                var title = "itemUseConstPopupViewTitle";
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + _this.code, handler: _this, callback: function () {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADERECHARGEVIEW, { code: _this.code, aid: _this.aid });
                    }
                });
                return;
            }
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, { activeId: vo.aidAndCode, isBatch: 1 });
            // this.movePos();
        }, this);
        this._rightBtn.setPosition(this._gameBM.x + 264, this._gameBM.y + 554);
        this.addChildToContainer(this._rightBtn);
        this._rightBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseTen-" + this.code), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        this._rightBtnTxt.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - this._rightBtnTxt.width / 2, this._rightBtn.y + this._rightBtn.height / 2 - this._rightBtnTxt.height / 2 - 10);
        this.addChildToContainer(this._rightBtnTxt);
        var colorribbonBM = BaseLoadBitmap.create("acarcadeview_colorribbon-" + this.getUiCode());
        colorribbonBM.setPosition(bg.x, this._gameBM.y + 485);
        this.addChildToContainer(colorribbonBM);
        this.initRewardPoolList();
        this.playLightAni(360);
        this.refreshPullrod(false);
        // this.movePos();
        this.refreshView();
    };
    /**初始化奖池 */
    AcArcadeGameView.prototype.initRewardPoolList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var rewards = cfg.poolListItemCfg[0].rewardPoolList();
        this._rewardsVoList = GameData.formatRewardItem(rewards);
        this._posList1 = [];
        this._containerList1 = [];
        this._posList2 = [];
        this._containerList2 = [];
        this._posList3 = [];
        this._containerList3 = [];
        //第一条
        for (var i = 0; i < this._rewardsVoList.length; i++) {
            var rewardVo = this._rewardsVoList[i];
            var rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "1", rewardVo);
            rewardContainer.setPosition(10 + rewardContainer.width / 2, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            var itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList1.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList1.push(rewardContainer);
            this._index1++;
            if (i == 0) {
                this._startPosY1 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY1 = rewardContainer.y;
            }
        }
        //第二条
        for (var i = 0; i < this._rewardsVoList.length; i++) {
            var rewardVo = this._rewardsVoList[i];
            var rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "2", rewardVo);
            rewardContainer.setPosition(this._machineContainer.width / 2, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            var itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList2.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList2.push(rewardContainer);
            if (i == 0) {
                this._startPosY2 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY2 = rewardContainer.y;
            }
        }
        //第三条
        for (var i = 0; i < this._rewardsVoList.length; i++) {
            var rewardVo = this._rewardsVoList[i];
            var rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "3", rewardVo);
            rewardContainer.setPosition(this._machineContainer.width - rewardContainer.width / 2 - 10, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            var itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList3.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList3.push(rewardContainer);
            if (i == 0) {
                this._startPosY3 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY3 = rewardContainer.y;
            }
        }
    };
    AcArcadeGameView.prototype.refreshView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        this._numTF.text = "X" + String(vo.getCoin());
        this._useTF.text = LanguageManager.getlocal("acArcadeGameViewUse-" + this.code, [String(vo.lotteryValue())]);
        if (vo.isFree()) {
            this._leftBtnTxt.text = LanguageManager.getlocal("acArcadeGameViewUseFree-" + this.code);
        }
        else {
            this._leftBtnTxt.text = LanguageManager.getlocal("acArcadeGameViewUseOne-" + this.code);
        }
        this._leftBtnTxt.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - this._leftBtnTxt.width / 2, this._leftBtn.y + this._leftBtn.height / 2 - this._leftBtnTxt.height / 2 - 10);
        var num = 1;
        if (vo.getCoin() >= 10) {
            num = 10;
        }
        else if (vo.getCoin() < 10 && vo.getCoin() >= 2) {
            num = vo.getCoin();
        }
        else {
            num = 2;
        }
        this._rightBtnTxt.text = LanguageManager.getlocal("acArcadeGameViewUseTen-" + this.code, [String(num)]);
        this._rightBtnTxt.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - this._rightBtnTxt.width / 2, this._rightBtn.y + this._rightBtn.height / 2 - this._rightBtnTxt.height / 2 - 10);
    };
    AcArcadeGameView.prototype.refreshPullrod = function (isDown) {
        this._pullrodUp.setVisible(!isDown);
        this._pullrodDown.setVisible(isDown);
    };
    AcArcadeGameView.prototype.lotteryHandle = function (event) {
        if (event.data.ret) {
            this._handlerData = event.data.data.data;
            this._lastId1 = this._handlerData.shootSet[0] + "1";
            this._lastId2 = this._handlerData.shootSet[1] + "2";
            this._lastId3 = this._handlerData.shootSet[2] + "3";
            this._isBatch = this._handlerData.isBatch == 0 ? false : true;
            this.movePos();
        }
    };
    AcArcadeGameView.prototype.logsHandle = function (event) {
        if (event.data.ret) {
            var logs = event.data.data.data.logs;
            ViewController.getInstance().openView(ViewConst.POPUP.ACARCADEGAMELOGVIEW, { logs: logs, aid: this.aid, code: this.code });
        }
    };
    AcArcadeGameView.prototype.movePos = function () {
        if (this._isPlayAni) {
            return;
        }
        this._isPlayAni = true;
        this.refreshPullrod(true);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        // let index1 = Math.floor((Math.random() * cfg.poolListItemCfg[0].prizePool.length));
        // this._lastId1 = cfg.poolListItemCfg[0].prizePool[index1][0] + "1";
        // let index2 = Math.floor((Math.random() * cfg.poolListItemCfg[0].prizePool.length));
        // this._lastId2 = cfg.poolListItemCfg[0].prizePool[index2][0] + "2";
        // let index3 = Math.floor((Math.random() * cfg.poolListItemCfg[0].prizePool.length));
        // this._lastId3 = cfg.poolListItemCfg[0].prizePool[index3][0] + "3";
        this._farmelightEffect.alpha = 1;
        if (this._isBatch) {
            this._fireEffect1.alpha = 1;
            this._fireEffect2.alpha = 1;
            this._fireEffect3.alpha = 1;
            this._fireEffect4.alpha = 1;
        }
        var time = 20;
        this._isStop1 = false;
        this._stopIndex1 = 0;
        this._slideIndex1 = this._offestId1;
        // this._isStop1 = true;
        this.movePos1(time);
        this._isStop2 = false;
        this._stopIndex2 = 0;
        this._slideIndex2 = this._offestId2;
        this.movePos2(time);
        this._isStop3 = false;
        this._stopIndex3 = 0;
        this._slideIndex3 = this._offestId3;
        this.movePos3(time);
        this.playPointAni1();
        this.playPointAni2();
    };
    /**
    * 位置移动
    */
    AcArcadeGameView.prototype.movePos1 = function (time) {
        var _this = this;
        this._slideIndex1++;
        // console.log("this._slideIndex1:   " + this._slideIndex1);
        var lastid = this._lastId1;
        if (this._slideIndex1 >= (this._rewardsVoList.length * 2 + this._offestId1) && this._isStop1 == false) {
            for (var i = 0; i < this._containerList1.length; i++) {
                var rewardContainer = this._containerList1[i];
                if (rewardContainer.y == this._endPosY1 && rewardContainer.name == lastid) {
                    // this._container1 = rewardContainer;
                    this._isStop1 = true;
                    // console.log("this._slideIndex1:   " + this._slideIndex1);
                    break;
                }
            }
        }
        if (this._isStop1) {
            this._stopIndex1++;
        }
        if (this._stopIndex1 > (this._rewardsVoList.length * 2)) {
            this._offestId1 = (this._slideIndex1 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            console.log("this._lastId1   " + this._lastId1);
            // console.log("this._offestId1:   " + this._offestId1);
            // console.log("this._slideIndex1:   " + this._slideIndex1);
            // this._isPlayAni = false;
            if (this._isBatch) {
                this.playStopClip1();
            }
            return;
        }
        var _loop_1 = function (i) {
            var movePos = this_1._posList1[(i - (this_1._slideIndex1 % this_1._posList1.length) + this_1._posList1.length) % this_1._posList1.length];
            var timetmp = time;
            if (this_1._containerList1[i].y == this_1._startPosY1) {
                var floorReward = this_1._rewardsVoList[this_1._index1 % this_1._rewardsVoList.length];
                this_1._containerList1[i] = this_1.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "1", floorReward);
                var itemlightEffect = this_1._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this_1._containerList1[i].visible = false;
            }
            egret.Tween.get(this_1._containerList1[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(function () {
                egret.Tween.removeTweens(_this._containerList1[i]);
                if (i == _this._posList1.length - 1) {
                    egret.Tween.get(_this._containerList1[i]).wait(0).call(function () {
                        egret.Tween.removeTweens(_this._containerList1[i]);
                        _this._index1++;
                        if (_this._isStop1) {
                            // this.movePos1(16 + (this._stopIndex1 * 0.15) * (this._stopIndex1 * 0.15) * (2 + (this._stopIndex1 * 0.15)));
                            _this.movePos1(20 + (_this._stopIndex1 * 0.05) * (_this._stopIndex1 * 0.04) * (52 * _this._stopIndex1));
                        }
                        else {
                            _this.movePos1(time);
                        }
                    }, _this);
                }
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < this._posList1.length; i++) {
            _loop_1(i);
        }
    };
    /**
    * 位置移动
    */
    AcArcadeGameView.prototype.movePos2 = function (time) {
        var _this = this;
        this._slideIndex2++;
        var lastid = this._lastId2;
        if (this._isStop2) {
            this._stopIndex2++;
        }
        if (this._slideIndex2 >= (this._rewardsVoList.length * 3 + this._offestId2) && this._isStop2 == false) {
            for (var i = 0; i < this._containerList2.length; i++) {
                if (this._containerList2[i].y == this._endPosY2 && this._containerList2[i].name == lastid) {
                    // this._container2 = this._containerList2[i];
                    if (this._isBatch) {
                        this.playStopClip2();
                    }
                    this._isStop2 = true;
                }
            }
        }
        if (this._stopIndex2 == (this._rewardsVoList.length * 2)) {
            this._offestId2 = (this._slideIndex2 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            return;
        }
        var _loop_2 = function (i) {
            var movePos = this_2._posList2[(i - (this_2._slideIndex2 % this_2._posList2.length) + this_2._posList2.length) % this_2._posList2.length];
            var timetmp = time;
            if (this_2._containerList2[i].y == this_2._startPosY2) {
                var floorReward = this_2._rewardsVoList[this_2._index2 % this_2._rewardsVoList.length];
                this_2._containerList2[i] = this_2.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "2", floorReward);
                var itemlightEffect = this_2._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this_2._containerList2[i].visible = false;
            }
            egret.Tween.get(this_2._containerList2[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(function () {
                egret.Tween.removeTweens(_this._containerList2[i]);
                if (i == _this._posList2.length - 1) {
                    egret.Tween.get(_this._containerList2[i]).wait(0).call(function () {
                        egret.Tween.removeTweens(_this._containerList2[i]);
                        _this._index2++;
                        if (_this._isStop2) {
                            // this.movePos2(time + 2);
                            _this.movePos2(20 + (_this._stopIndex2 * 0.05) * (_this._stopIndex2 * 0.04) * (52 * _this._stopIndex2));
                        }
                        else {
                            _this.movePos2(time);
                        }
                    }, _this);
                }
            }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < this._posList2.length; i++) {
            _loop_2(i);
        }
    };
    /**
    * 位置移动
    */
    AcArcadeGameView.prototype.movePos3 = function (time) {
        var _this = this;
        this._slideIndex3++;
        var lastid = this._lastId3;
        if (this._isStop3) {
            this._stopIndex3++;
        }
        if (this._slideIndex3 >= (this._rewardsVoList.length * 4 + this._offestId3) && this._isStop3 == false) {
            for (var i = 0; i < this._containerList3.length; i++) {
                if (this._containerList3[i].y == this._endPosY3 && this._containerList3[i].name == lastid) {
                    // this._container3 = this._containerList3[i];
                    this._isStop3 = true;
                }
            }
        }
        if (this._stopIndex3 == (this._rewardsVoList.length * 2)) {
            this._offestId3 = (this._slideIndex3 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            // this._isPlayAni = false;
            if (this._isBatch) {
                this.playStopClip3();
            }
            else {
                this.playLotteryEndAni();
            }
            return;
        }
        var _loop_3 = function (i) {
            var movePos = this_3._posList3[(i - (this_3._slideIndex3 % this_3._posList3.length) + this_3._posList3.length) % this_3._posList3.length];
            var timetmp = time;
            if (this_3._containerList3[i].y == this_3._startPosY3) {
                var floorReward = this_3._rewardsVoList[this_3._index3 % this_3._rewardsVoList.length];
                this_3._containerList3[i] = this_3.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "3", floorReward);
                var itemlightEffect = this_3._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this_3._containerList3[i].visible = false;
            }
            egret.Tween.get(this_3._containerList3[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(function () {
                egret.Tween.removeTweens(_this._containerList3[i]);
                if (i == _this._posList3.length - 1) {
                    egret.Tween.get(_this._containerList3[i]).wait(0).call(function () {
                        egret.Tween.removeTweens(_this._containerList3[i]);
                        _this._index3++;
                        if (_this._isStop3) {
                            // this.movePos3(time + 2);
                            _this.movePos3(20 + (_this._stopIndex3 * 0.05) * (_this._stopIndex3 * 0.04) * (52 * _this._stopIndex3));
                        }
                        else {
                            _this.movePos3(time);
                        }
                    }, _this);
                }
            }, this_3);
        };
        var this_3 = this;
        for (var i = 0; i < this._posList3.length; i++) {
            _loop_3(i);
        }
    };
    /**对象池操作 */
    AcArcadeGameView.prototype.getRewardContainer = function (id, rewardVo) {
        if (this._rewardsPool[id]) {
            return this._rewardsPool[id];
        }
        else {
            var rewardContainer = GameData.getItemIcon(rewardVo);
            rewardContainer.name = id;
            rewardContainer.anchorOffsetX = rewardContainer.width / 2;
            rewardContainer.anchorOffsetY = rewardContainer.height / 2;
            this._machineContainer.addChild(rewardContainer);
            var numLb = rewardContainer.getChildByName("numLb");
            var magnifierIcon = rewardContainer.getChildByName("magnifierIcon");
            if (numLb) {
                numLb.visible = false;
            }
            if (magnifierIcon) {
                magnifierIcon.visible = false;
            }
            if (rewardContainer.getChildByName("numbg")) {
                rewardContainer.getChildByName("numbg").visible = false;
            }
            var itemlightEffect = BaseBitmap.create("acarcadeview_effect_itemlight");
            itemlightEffect.anchorOffsetX = itemlightEffect.width / 2;
            itemlightEffect.anchorOffsetY = itemlightEffect.height / 2;
            itemlightEffect.setPosition(rewardContainer.width / 2, rewardContainer.height / 2);
            rewardContainer.addChild(itemlightEffect);
            itemlightEffect.name = "itemlight";
            itemlightEffect.alpha = 0;
            itemlightEffect.blendMode = egret.BlendMode.ADD;
            this._rewardsPool[id] = rewardContainer;
            return this._rewardsPool[id];
        }
    };
    /**灯光的动画 */
    AcArcadeGameView.prototype.playLightAni = function (time) {
        var _this = this;
        egret.Tween.removeTweens(this._lightEffect1);
        egret.Tween.removeTweens(this._lightEffect2);
        this._lightEffect1.visible = true;
        this._lightEffect2.visible = false;
        egret.Tween.get(this._lightEffect1, { loop: true }).wait(time).call(function () {
            _this._lightEffect1.visible = false;
            _this._lightEffect2.visible = true;
        }, this).wait(time).call(function () {
            _this._lightEffect1.visible = true;
            _this._lightEffect2.visible = false;
        }, this);
    };
    AcArcadeGameView.prototype.playLotteryEndAni = function () {
        var _this = this;
        this.playLightAni(160);
        if (this._isBatch) {
            this._lihuaIndex = 0;
            this.showLihua();
        }
        egret.Tween.removeTweens(this._txtEffect);
        this._txtEffect.alpha = 0;
        var loopNumber = 0;
        egret.Tween.get(this._txtEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(function () {
            loopNumber++;
            if (loopNumber >= 5) {
                _this._txtEffect.alpha = 0;
                egret.Tween.removeTweens(_this._txtEffect);
                _this.playLightAni(360);
                _this.refreshPullrod(false);
                var otherRewards = "1017_0_" + _this._handlerData.moonCoin + "_" + _this.code;
                ViewController.getInstance().openView(ViewConst.POPUP.ACARCADEGAMEGETREWARDPOPUPVIEW, {
                    rewards: _this._handlerData.rewards, otherRewards: otherRewards, isPlayAni: true, buffers: _this._handlerData.buffers, code: _this.code, aid: _this.aid, callback: function () {
                        _this._isPlayAni = false;
                    }, handler: _this
                });
            }
        }, this);
        var loopNum = 0;
        this._farmelightEffect.alpha = 0;
        egret.Tween.removeTweens(this._farmelightEffect);
        egret.Tween.get(this._farmelightEffect, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(function () {
            loopNum++;
            if (loopNum >= 5) {
                _this._farmelightEffect.alpha = 0;
                egret.Tween.removeTweens(_this._farmelightEffect);
            }
        }, this);
        this._container1 = this._machineContainer.getChildByName(this._lastId1);
        this._container2 = this._machineContainer.getChildByName(this._lastId2);
        this._container3 = this._machineContainer.getChildByName(this._lastId3);
        if (this._container1) {
            var itemlightEffect_1 = this._container1.getChildByName("itemlight");
            if (itemlightEffect_1) {
                itemlightEffect_1.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect_1);
                var effectLoopNumber_1 = 0;
                egret.Tween.get(itemlightEffect_1, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(function () {
                    effectLoopNumber_1++;
                    if (effectLoopNumber_1 >= 5) {
                        itemlightEffect_1.alpha = 0;
                        egret.Tween.removeTweens(itemlightEffect_1);
                    }
                }, this);
            }
        }
        if (this._container2) {
            var itemlightEffect_2 = this._container2.getChildByName("itemlight");
            if (itemlightEffect_2) {
                itemlightEffect_2.alpha = 0;
                egret.Tween.removeTweens(itemlightEffect_2);
                var effectLoopNumber_2 = 0;
                egret.Tween.get(itemlightEffect_2, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(function () {
                    effectLoopNumber_2++;
                    if (effectLoopNumber_2 >= 5) {
                        itemlightEffect_2.alpha = 0;
                        egret.Tween.removeTweens(itemlightEffect_2);
                    }
                }, this);
            }
        }
        if (this._container3) {
            var itemlightEffect_3 = this._container3.getChildByName("itemlight");
            if (itemlightEffect_3) {
                itemlightEffect_3.alpha = 0;
                egret.Tween.removeTweens(itemlightEffect_3);
                var effectLoopNumber_3 = 0;
                egret.Tween.get(itemlightEffect_3, { loop: true }).to({ alpha: 1 }, 60).wait(100).to({ alpha: 0 }, 60).call(function () {
                    effectLoopNumber_3++;
                    if (effectLoopNumber_3 >= 5) {
                        itemlightEffect_3.alpha = 0;
                        egret.Tween.removeTweens(itemlightEffect_3);
                    }
                }, this);
            }
        }
    };
    /**指针动画1 */
    AcArcadeGameView.prototype.playPointAni1 = function () {
        var _this = this;
        this._leftPoint.rotation = 0;
        egret.Tween.removeTweens(this._leftPoint);
        var time = 75;
        var loopTime = 0;
        egret.Tween.get(this._leftPoint, { loop: true }).to({ rotation: -90 }, time).to({ rotation: 0 }, time).to({ rotation: 90 }, time).to({ rotation: 0 }, time).call(function () {
            loopTime++;
            if (loopTime > 8) {
                _this._leftPoint.rotation = 0;
                egret.Tween.removeTweens(_this._leftPoint);
            }
        }, this);
    };
    /**指针动画1 */
    AcArcadeGameView.prototype.playPointAni2 = function () {
        var _this = this;
        this._rightPoint.rotation = -180;
        egret.Tween.removeTweens(this._rightPoint);
        var time = 75;
        var loopTime = 0;
        egret.Tween.get(this._rightPoint, { loop: true }).to({ rotation: -270 }, time).to({ rotation: -180 }, time).to({ rotation: -90 }, time).to({ rotation: -180 }, time).call(function () {
            loopTime++;
            if (loopTime > 11) {
                _this._rightPoint.rotation = -180;
                egret.Tween.removeTweens(_this._rightPoint);
            }
        }, this);
    };
    AcArcadeGameView.prototype.playCilp1 = function () {
        var _this = this;
        this._fireEffect1.playWithTime(2);
        this._fireEffect1.setEndCallBack(function () {
            _this._fireEffect1.rotation = (_this._fireEffect1.rotation + 180) % 360;
            if (_this._fireEffect1.rotation == 0) {
                _this._fireEffect1.setPosition(_this._machineContainer.x, _this._machineContainer.y + 70);
            }
            else {
                _this._fireEffect1.setPosition(_this._machineContainer.x, _this._machineContainer.y + 100);
            }
            _this.playCilp1();
        }, this);
    };
    AcArcadeGameView.prototype.playCilp2 = function () {
        var _this = this;
        this._fireEffect2.playWithTime(2);
        this._fireEffect2.setEndCallBack(function () {
            _this._fireEffect2.rotation = (_this._fireEffect2.rotation + 180) % 360;
            if (_this._fireEffect2.rotation == 0) {
                _this._fireEffect2.setPosition(_this._machineContainer.x + 128, _this._machineContainer.y + 70);
            }
            else {
                _this._fireEffect2.setPosition(_this._machineContainer.x + 128, _this._machineContainer.y + 100);
            }
            _this.playCilp2();
        }, this);
    };
    AcArcadeGameView.prototype.playCilp3 = function () {
        var _this = this;
        this._fireEffect3.playWithTime(2);
        this._fireEffect3.setEndCallBack(function () {
            _this._fireEffect3.rotation = (_this._fireEffect3.rotation + 180) % 360;
            if (_this._fireEffect3.rotation == 0) {
                _this._fireEffect3.setPosition(_this._machineContainer.x + 256, _this._machineContainer.y + 70);
            }
            else {
                _this._fireEffect3.setPosition(_this._machineContainer.x + 256, _this._machineContainer.y + 100);
            }
            _this.playCilp3();
        }, this);
    };
    AcArcadeGameView.prototype.playCilp4 = function () {
        var _this = this;
        this._fireEffect4.playWithTime(2);
        this._fireEffect4.setEndCallBack(function () {
            _this._fireEffect4.rotation = (_this._fireEffect4.rotation + 180) % 360;
            if (_this._fireEffect4.rotation == 0) {
                _this._fireEffect4.setPosition(_this._machineContainer.x + 384, _this._machineContainer.y + 70);
            }
            else {
                _this._fireEffect4.setPosition(_this._machineContainer.x + 384, _this._machineContainer.y + 100);
            }
            _this.playCilp4();
        }, this);
    };
    AcArcadeGameView.prototype.playStopClip1 = function () {
        var _this = this;
        egret.Tween.removeTweens(this._fireEffect1);
        this._fireEffect1.alpha = 1;
        egret.Tween.get(this._fireEffect1).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(_this._fireEffect1);
            _this._fireEffect1.alpha = 0;
        }, this);
        egret.Tween.removeTweens(this._fireEffect2);
        this._fireEffect2.alpha = 1;
        egret.Tween.get(this._fireEffect2).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(_this._fireEffect2);
            _this._fireEffect2.alpha = 0;
        }, this);
    };
    AcArcadeGameView.prototype.playStopClip2 = function () {
        var _this = this;
        egret.Tween.removeTweens(this._fireEffect3);
        this._fireEffect3.alpha = 1;
        egret.Tween.get(this._fireEffect3).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(_this._fireEffect3);
            _this._fireEffect3.alpha = 0;
        }, this);
    };
    AcArcadeGameView.prototype.playStopClip3 = function () {
        var _this = this;
        egret.Tween.removeTweens(this._fireEffect4);
        this._fireEffect4.alpha = 1;
        egret.Tween.get(this._fireEffect4).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(_this._fireEffect4);
            _this._fireEffect4.alpha = 0;
            _this.playLotteryEndAni();
        }, this);
    };
    AcArcadeGameView.prototype.showLihua = function () {
        var _this = this;
        var index = Math.floor(Math.random() * 6) + 1;
        var item = this._lihuaCfg[index];
        if (item) {
            var depth = this.container.getChildIndex(this._bg);
            var lihuaclip_1 = ComponentManager.getCustomMovieClip("lihua_" + item.color + "000", 9, 115);
            lihuaclip_1.setScale(item.scale);
            lihuaclip_1.x = this._bg.x + item.pos[0];
            lihuaclip_1.y = this._bg.y + item.pos[1];
            this.container.addChildAt(lihuaclip_1, depth + 1);
            lihuaclip_1.playWithTime(1);
            lihuaclip_1.setEndCallBack(function () {
                _this._lihuaIndex++;
                _this.container.removeChild(lihuaclip_1);
                if (_this._lihuaIndex >= 6) {
                    _this._lihuaIndex = 0;
                    return;
                }
                _this.showLihua();
            }, this);
        }
        else {
            this.showLihua();
        }
    };
    /**真动画数组 */
    AcArcadeGameView.prototype.getClipArr = function () {
        return [
            "acarcadeview_fire5",
            "acarcadeview_fire6",
            "acarcadeview_fire7",
            "acarcadeview_fire8",
            "acarcadeview_fire9",
            "acarcadeview_fire10",
            "acarcadeview_fire1",
            "acarcadeview_fire2",
            "acarcadeview_fire3",
            "acarcadeview_fire4",
            "acarcadeview_fire5",
        ];
    };
    AcArcadeGameView.prototype.getBgName = function () {
        return null;
    };
    AcArcadeGameView.prototype.getTitleBgName = function () {
        return null;
    };
    AcArcadeGameView.prototype.getTitleStr = function () {
        return null;
    };
    AcArcadeGameView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acarcadeview_leftbtn-" + this.getUiCode(), "acarcadeview_leftbtn-" + this.getUiCode() + "_down",
            "acarcadeview_rightbtn-" + this.getUiCode(), "acarcadeview_rightbtn-" + this.getUiCode() + "_down",
            "acarcadeview_effect_itemlight", "acarcadeview_effect_farmelight", "acarcadeview_fire"
        ]);
    };
    AcArcadeGameView.prototype.getUiCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    };
    AcArcadeGameView.prototype.getProbablyInfo = function () {
        return "";
    };
    AcArcadeGameView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, this.logsHandle, this);
        this._lightEffect1 = null;
        this._lightEffect2 = null;
        this._gameBM = null;
        this._useBg = null;
        this._useTF = null;
        this._machineContainer = null;
        this._numBg = null;
        this._numTF = null;
        this._pullrodUp = null;
        this._pullrodDown = null;
        this._leftBtn = null;
        this._rightBtn = null;
        this._leftBtnTxt = null;
        this._rightBtnTxt = null;
        this.code = null;
        this.aid = null;
        this._gameCoin = null;
        this._leftPoint = null;
        this._rightPoint = null;
        this._gameCoinScale = 0.27;
        this._txtEffect = null;
        this._rewardsPool = {};
        this._posList1 = [];
        this._posList2 = [];
        this._posList3 = [];
        this._containerList1 = [];
        this._containerList2 = [];
        this._containerList3 = [];
        this._startPosY1 = 0;
        this._startPosY2 = 0;
        this._startPosY3 = 0;
        this._rewardsVoList = null;
        this._index1 = 0;
        this._slideIndex1 = 0;
        this._index2 = 0;
        this._slideIndex2 = 0;
        this._index3 = 0;
        this._slideIndex3 = 0;
        this._endPosY1 = 0;
        this._isStop1 = false;
        this._stopIndex1 = 0;
        this._endPosY2 = 0;
        this._isStop2 = false;
        this._stopIndex2 = 0;
        this._endPosY3 = 0;
        this._isStop3 = false;
        this._stopIndex3 = 0;
        this._lastId1 = null;
        this._lastId2 = null;
        this._lastId3 = null;
        this._isPlayAni = false;
        this._offestId1 = 0;
        this._offestId2 = 0;
        this._offestId3 = 0;
        this._container1 = null;
        this._container2 = null;
        this._container3 = null;
        this._handlerData = null;
        this._fireEffect1 = null;
        this._fireEffect2 = null;
        this._fireEffect3 = null;
        this._fireEffect4 = null;
        this._isBatch = false;
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeGameView;
}(CommonView));
__reflect(AcArcadeGameView.prototype, "AcArcadeGameView");
//# sourceMappingURL=AcArcadeGameView.js.map