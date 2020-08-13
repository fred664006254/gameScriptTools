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
  * 电玩大本营活动
  * @author 张朝阳
  * date 2019/6/6
  * @class AcArcadeView
  */
var AcArcadeView = (function (_super) {
    __extends(AcArcadeView, _super);
    function AcArcadeView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._isPlayAni = false;
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
        _this._gameCoin = null;
        _this._leftPoint = null;
        _this._rightPoint = null;
        _this._rewardsVoList = null;
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
        _this._offestId1 = 0;
        _this._offestId2 = 0;
        _this._offestId3 = 0;
        // private _farmelightEffect: BaseBitmap = null;
        _this._container1 = null;
        _this._container2 = null;
        _this._container3 = null;
        _this._handlerData = null;
        _this._isBatch = false;
        _this.lampwinfos = {};
        _this.totalgem = 0;
        _this._cost_Centertxt = null;
        _this._loopList = [];
        _this._titleBar = null;
        _this._titleBarText = null;
        _this._titleBg = null;
        _this._lihua = null;
        _this._lihuaMsg = null;
        _this._tipCon = null;
        _this._tempObj = null;
        _this._onceBtn = null;
        _this._tenBtn = null;
        _this._changeList = [];
        _this._rRewards = null;
        _this._oRewards = null;
        _this._lihuaIndex = 0;
        _this._dbdragon = undefined;
        _this._choujiangEndNum = undefined; // 抽奖几个相同的
        // laohuji_ske.dbbin
        _this._enterLiHuaData = undefined;
        return _this;
    }
    Object.defineProperty(AcArcadeView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcArcadeView.prototype.initView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);
        var titletxt = BaseBitmap.create("arcadegame_title_1");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        // titletxt.y = 5;
        this.addChild(titletxt);
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        //顶部背景图片
        var forpeople_top = BaseLoadBitmap.create('arcadegame_topbg_1');
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 75;
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 15;
        this._activityTimerText.y = 109 - 25;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 5;
        if (PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsViSp() || PlatformManager.checkIsKRNewSp()) {
            deltaY = 3;
            this._activityTimerText.y = 109 - 27;
        }
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x; //forpeople_top.x + forpeople_top.width - 220;//this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY; //this._activityTimerText.y ;//
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        if (PlatformManager.checkIsJPSp()) {
            this._ruleText.lineSpacing = 2;
        }
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x * 2;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("acArcadeView_acDesc-" + this.getCnCode(), ["" + cfg.cost, "" + cfg.addPrize, "" + cfg.totalNum]);
        this.addChildToContainer(this._ruleText);
        //跑马灯
        this.initLoop();
        var bottom = BaseBitmap.create("arcadegame_bottombg-" + this.getUiCode());
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height - this.container.y;
        //log 
        var logBg = ComponentManager.getButton("mainui_bottombtnbg", null, this.logBtnHandler, this, null, 0);
        logBg.setPosition(GameConfig.stageWidth - logBg.width - 5, forpeople_top.y + forpeople_top.height + 40);
        this.addChildToContainer(logBg);
        var logIcon = BaseBitmap.create("arcadegame_logbtn");
        logIcon.setPosition(logBg.width / 2 - logIcon.width / 2, logBg.height / 2 - logIcon.height / 2);
        logBg.addChild(logIcon);
        var logText = BaseBitmap.create("arcadegame_logtxt");
        logText.setPosition(logBg.width / 2 - logText.width / 2, logIcon.y + logIcon.height - 30);
        logBg.addChild(logText);
        //jiangchi
        var rewardBg = ComponentManager.getButton("mainui_bottombtnbg", null, this.rewardBtnHandler, this, null, 0);
        rewardBg.setPosition(logBg.x - rewardBg.width - 25, logBg.y);
        this.addChildToContainer(rewardBg);
        var rewardIcon = BaseBitmap.create("arcadegame_rewardbtn");
        rewardIcon.setPosition(rewardBg.width / 2 - rewardIcon.width / 2, rewardBg.height / 2 - rewardIcon.height / 2);
        rewardBg.addChild(rewardIcon);
        var rewardText = BaseBitmap.create("arcadegame_rewardtxt");
        rewardText.setPosition(rewardBg.width / 2 - rewardText.width / 2, rewardIcon.y + rewardIcon.height - 30);
        rewardBg.addChild(rewardText);
        //中奖名单
        var listBtn = ComponentManager.getButton("arcadegame_listbtn", null, this.listBtnHandler, this, null, 0);
        listBtn.setPosition(5, logBg.y);
        this.addChildToContainer(listBtn);
        this._gameBM = BaseLoadBitmap.create("acarcadeview_machine-" + this.getUiCode());
        this._gameBM.width = 611;
        this._gameBM.height = 613;
        // this._gameBM.setPosition(GameConfig.stageWidth / 2 - this._gameBM.width/2 , forpeople_top.y + forpeople_top.height + 160);
        var tmpPosY2 = forpeople_top.y + forpeople_top.height + 160;
        var tmpPosY = (bottom.y + 120 - tmpPosY2) / 2 - this._gameBM.height / 2 + tmpPosY2;
        if (tmpPosY < tmpPosY2) {
            tmpPosY = tmpPosY2;
        }
        this._gameBM.setPosition(GameConfig.stageWidth / 2 - this._gameBM.width / 2, tmpPosY);
        this._pullrodUp = BaseBitmap.create("acarcadeview_pullrodup-" + this.getUiCode());
        this._pullrodUp.setPosition(this._gameBM.x + 551, this._gameBM.y + 94);
        this.addChildToContainer(this._pullrodUp);
        this._pullrodDown = BaseBitmap.create("acarcadeview_pullroddown-" + this.getUiCode());
        this._pullrodDown.setPosition(this._pullrodUp.x, this._pullrodUp.y);
        this.addChildToContainer(this._pullrodDown);
        this.addChildToContainer(this._gameBM);
        this._useBg = BaseLoadBitmap.create("acarcadeview_usebg-1");
        this._useBg.width = 259;
        this._useBg.height = 32;
        this._useBg.setPosition(GameConfig.stageWidth / 2 - this._useBg.width / 2, this._gameBM.y + 80 - 2);
        this.addChildToContainer(this._useBg);
        this._useTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._useTF.text = LanguageManager.getlocal("acArcadeGameViewUse-" + this.getCnCode(), ["1"]);
        this._useTF.anchorOffsetX = this._useTF.width / 2;
        this._useTF.setPosition(this._useBg.x + this._useBg.width / 2, this._useBg.y + this._useBg.height / 2 - this._useTF.height / 2);
        this.addChildToContainer(this._useTF);
        this._machineContainer = new BaseDisplayObjectContainer();
        this._machineContainer.width = 410;
        this._machineContainer.height = 176;
        this._machineContainer.setPosition(this._gameBM.x + 100, this._gameBM.y + 130);
        this.addChildToContainer(this._machineContainer);
        this._machineContainer.mask = new egret.Rectangle(0, 0, 410, 170);
        this.showDBdragons();
        var topflag = BaseBitmap.create("acarcadeview_machine-flag");
        topflag.setPosition(GameConfig.stageWidth / 2 - topflag.width / 2, this._gameBM.y - topflag.height + 110);
        var titleTxt = BaseBitmap.create("arcadegame_txt_gold");
        titleTxt.setPosition(GameConfig.stageWidth / 2 - titleTxt.width / 2, topflag.y - titleTxt.height + 20);
        this.addChildToContainer(topflag);
        this.addChildToContainer(titleTxt);
        var machineMask = BaseLoadBitmap.create("acarcadeview_machinemask-1");
        machineMask.setPosition(this._machineContainer.x, this._machineContainer.y);
        this.addChildToContainer(machineMask);
        this._leftPoint = BaseBitmap.create("arcadegame_arrow");
        this._leftPoint.width = 56;
        this._leftPoint.height = 53;
        this._leftPoint.rotation = -180;
        this._leftPoint.anchorOffsetY = this._leftPoint.height / 2 - 3;
        this._leftPoint.anchorOffsetX = 37;
        this._leftPoint.setPosition(this._machineContainer.x - 10, this._machineContainer.y + this._machineContainer.height / 2);
        this.addChildToContainer(this._leftPoint);
        this._rightPoint = BaseBitmap.create("arcadegame_arrow");
        this._rightPoint.anchorOffsetX = this._leftPoint.anchorOffsetX;
        this._rightPoint.anchorOffsetY = this._leftPoint.anchorOffsetY;
        this._rightPoint.setPosition(this._machineContainer.x + this._machineContainer.width + 10, this._machineContainer.y + this._machineContainer.height / 2 + 5);
        this.addChildToContainer(this._rightPoint);
        this._leftPoint.visible = this._rightPoint.visible = false;
        var colorribbonBM = BaseBitmap.create("acarcadeview_machine-flag2");
        colorribbonBM.setPosition(GameConfig.stageWidth / 2 - colorribbonBM.width / 2, this._gameBM.y + this._gameBM.height - colorribbonBM.height - 10);
        this.addChildToContainer(colorribbonBM);
        this._leftBtn = ComponentManager.getButton("arcadegame_btn2", "", this.rollHandler, this, [0]);
        this._leftBtn.setPosition(this._gameBM.x + 80, this._gameBM.y + 370);
        this.addChildToContainer(this._leftBtn);
        this._leftBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseOne-" + this.getCnCode()), TextFieldConst.FONTSIZE_BUTTON_COMMON + 2, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._leftBtnTxt.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - this._leftBtnTxt.width / 2, this._leftBtn.y + this._leftBtn.height / 2 - this._leftBtnTxt.height / 2 - 5);
        this.addChildToContainer(this._leftBtnTxt);
        this._rightBtn = ComponentManager.getButton("arcadegame_btn1", "", this.rollHandler, this, [1]);
        this._rightBtn.setPosition(this._gameBM.x + 330, this._leftBtn.y);
        this.addChildToContainer(this._rightBtn);
        this._rightBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseTen-" + this.getCnCode()), TextFieldConst.FONTSIZE_BUTTON_COMMON + 2, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rightBtnTxt.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - this._rightBtnTxt.width / 2, this._leftBtnTxt.y);
        this.addChildToContainer(this._rightBtnTxt);
        var costbg_left = BaseBitmap.create("arcadegame_costbg");
        costbg_left.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - costbg_left.width / 2, this._leftBtn.y + this._leftBtn.height + 10);
        this.addChildToContainer(costbg_left);
        var goldLeft = BaseBitmap.create("public_icon1");
        goldLeft.setPosition(costbg_left.x + costbg_left.width / 2 - goldLeft.width, costbg_left.y + costbg_left.height / 2 - goldLeft.height / 2);
        this.addChildToContainer(goldLeft);
        var cost_Lefttxt = ComponentManager.getTextField("" + cfg.cost, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        cost_Lefttxt.setPosition(goldLeft.x + goldLeft.width, costbg_left.y + costbg_left.height / 2 - cost_Lefttxt.height / 2 + 2);
        this.addChildToContainer(cost_Lefttxt);
        var costbg_right = BaseBitmap.create("arcadegame_costbg");
        costbg_right.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - costbg_right.width / 2, costbg_left.y);
        this.addChildToContainer(costbg_right);
        var goldright = BaseBitmap.create("public_icon1");
        goldright.setPosition(costbg_right.x + costbg_right.width / 2 - goldright.width, goldLeft.y);
        this.addChildToContainer(goldright);
        var cost_righttxt = ComponentManager.getTextField("" + (cfg.cost * 10 * cfg.discount), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        cost_righttxt.setPosition(goldright.x + goldright.width, cost_Lefttxt.y);
        this.addChildToContainer(cost_righttxt);
        var goldcenter = BaseBitmap.create("public_icon1");
        goldcenter.setPosition(GameConfig.stageWidth / 2 - goldcenter.width - 50, topflag.y + 30);
        this.addChildToContainer(goldcenter);
        var cost_Centertxt = ComponentManager.getBitmapText("", "activity_fnt", 30);
        this._cost_Centertxt = cost_Centertxt;
        this._cost_Centertxt.text = "" + this.totalgem;
        cost_Centertxt.setScale(0.8);
        cost_Centertxt.setPosition(goldcenter.x + goldcenter.width, goldcenter.y - 2);
        this.addChildToContainer(cost_Centertxt);
        this.initRewardPoolList();
        this.refreshPullrod(false);
        this.refreshView();
        this.addChildToContainer(bottom);
        if (this._enterLiHuaData) {
            this.showLihua(this._enterLiHuaData);
        }
    };
    AcArcadeView.prototype.refreshView = function () {
        this._useTF.text = LanguageManager.getlocal("acArcadeGameViewUse-" + this.getCnCode(), ["" + this.acVo.getTotalTimes()]);
        this._useTF.anchorOffsetX = this._useTF.width / 2;
        this._cost_Centertxt.text = "" + this.totalgem;
    };
    AcArcadeView.prototype.refreshPullrod = function (isDown) {
        this._pullrodUp.setVisible(!isDown);
        this._pullrodDown.setVisible(isDown);
    };
    AcArcadeView.prototype.lotteryHandle = function (event) {
        if (event.data.ret) {
            this._handlerData = event.data.data.data;
            this._lastId1 = this._handlerData.shootSet[0] + "1";
            this._lastId2 = this._handlerData.shootSet[1] + "2";
            this._lastId3 = this._handlerData.shootSet[2] + "3";
            this._isBatch = this._handlerData.isBatch == 0 ? false : true;
            this.totalgem = this._handlerData.nowtotalgem;
            this.refreshView();
            var buffers = this._handlerData.buffers;
            if (buffers["3"] >= 1) {
                this._choujiangEndNum = "3";
            }
            else if (buffers["2"] >= 1) {
                this._choujiangEndNum = "2";
            }
            else {
                this._choujiangEndNum = "1";
            }
            this.movePos();
            if (this._isBatch) {
                egret.Tween.get(this, { loop: false }).wait(1500).call(this.showEndReward, this);
            }
            var lampwinfos = this._handlerData.lampwinfos || [];
            var lampcwardinfos = this._handlerData.lampcwardinfos || [];
            this.dealLampinfos(lampwinfos, lampcwardinfos);
            this.initLoop();
            if (this._handlerData.wuid) {
                this.showLihua({ name: this._handlerData.wname, gem: this._handlerData.wgem });
                var loopStr = LanguageManager.getlocal("acLotteryLoopMsg1", [this._handlerData.wname, "" + this._handlerData.wgem]);
                this._loopList.push(loopStr);
            }
        }
    };
    AcArcadeView.prototype.showDBdragons = function () {
        var _this = this;
        this._dbdragon = App.DragonBonesUtil.getLoadDragonBones("laohuji");
        this._dbdragon.x = this._gameBM.x; //-10;
        this._dbdragon.y = this._gameBM.y + this._gameBM.height; //+100;
        this.addChildToContainer(this._dbdragon);
        this._dbdragon.playDragonMovie("zhongjiang_idle", 0); //COMPLETE
        var tmpthis = this;
        this._dbdragon.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
            // this._dbdragon.playDragonMovie('idle',0);
            var animationName = param1.animationName;
            if (animationName == "choujiang") {
                if (_this._choujiangEndNum == "1") {
                    tmpthis._dbdragon.playDragonMovie("zhongjiang" + _this._choujiangEndNum, 1);
                }
            }
            else if (animationName == "zhongjiang1") {
                tmpthis._dbdragon.playDragonMovie("zhongjiang1", 0);
            }
            else if (animationName == "zhongjiang2") {
                tmpthis._dbdragon.playDragonMovie("zhongjiang1", 0);
            }
            else if (animationName == "zhongjiang3") {
                tmpthis._dbdragon.playDragonMovie("zhongjiang_idle", 0);
            }
            else if (animationName == "zhongjiang_idle") {
            }
        }, this);
    };
    AcArcadeView.prototype.titleBtnHandler = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYPOPUPVIEW, { activeId: this.aid + "-" + this.code });
    };
    AcArcadeView.prototype.rollHandler = function (isBatch) {
        var _this = this;
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isPlayAni) {
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var config = this.acVo.config;
        var needgold = config.cost;
        if (isBatch) {
            needgold = config.cost * 10 * config.discount;
        }
        if (needgold > Api.playerVoApi.getPlayerGem()) {
            var msg = LanguageManager.getlocal("acArcadeGameViewTipMsg-" + this.getCnCode(), ["" + Api.playerVoApi.getPlayerGem()]);
            var title = "itemUseConstPopupViewTitle";
            if (PlatformManager.checkHideIconByIP()) {
                msg = LanguageManager.getlocal("acArcadeGameViewTipMsg_hideByIp-" + this.getCnCode(), ["" + Api.playerVoApi.getPlayerGem()]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "sysConfirm", handler: this, callback: null,
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + this.code, handler: this, callback: function () {
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, { code: _this.code, aid: _this.aid });
                    }
                });
            }
            return;
        }
        SoundManager.playEffect("effect_acarcade");
        this._dbdragon.playDragonMovie("choujiang", 1);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, { activeId: this.acVo.aidAndCode, isBatch: isBatch });
    };
    AcArcadeView.prototype.logBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMELOGVIEW, { activeId: this.acVo.aidAndCode, aid: this.aid, code: this.code });
    };
    AcArcadeView.prototype.rewardBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEREWARDVIEW, { code: this.code, aid: this.aid });
    };
    //中奖名单
    AcArcadeView.prototype.listBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMELISTVIEW, { activeId: this.acVo.aidAndCode, aid: this.aid, code: this.code });
    };
    /**初始化奖池 */
    AcArcadeView.prototype.initRewardPoolList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var rewardList = [];
        var rewards0 = cfg.poolListItemCfg[0].rewardPoolList();
        var rewards1 = cfg.poolListItemCfg[1].rewardPoolList();
        var rewards2 = cfg.poolListItemCfg[2].rewardPoolList();
        rewardList.push(rewards0);
        rewardList.push(rewards1);
        rewardList.push(rewards2);
        var rewards = rewardList.join("|");
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
            rewardContainer.setPosition(15 + rewardContainer.width / 2, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
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
            rewardContainer.setPosition(this._machineContainer.width / 2 + 1, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
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
            rewardContainer.setPosition(this._machineContainer.width - rewardContainer.width / 2 - 13, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
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
    Object.defineProperty(AcArcadeView.prototype, "pollTime", {
        get: function () {
            return 60; // 20;
        },
        enumerable: true,
        configurable: true
    });
    AcArcadeView.prototype.movePos = function () {
        if (this._isPlayAni) {
            return;
        }
        this._isPlayAni = true;
        this.refreshPullrod(true);
        this._isStop1 = false;
        this._stopIndex1 = 0;
        this._slideIndex1 = this._offestId1;
        this._isStop2 = false;
        this._stopIndex2 = 0;
        this._slideIndex2 = this._offestId2;
        this._isStop3 = false;
        this._stopIndex3 = 0;
        this._slideIndex3 = this._offestId3;
        egret.Tween.get(this, { loop: false }).call(this.movePos1, this, [this.pollTime]).wait(this.pollTime / 3 * 1).call(this.movePos2, this, [this.pollTime]).wait(this.pollTime / 3 * 2).call(this.movePos3, this, [this.pollTime]);
        this.playPointAni1();
        this.playPointAni2();
    };
    /**
    * 位置移动
    */
    AcArcadeView.prototype.movePos1 = function (time) {
        var _this = this;
        this._slideIndex1++;
        var lastid = this._lastId1;
        if (this._slideIndex1 >= (this._rewardsVoList.length * 1 + this._offestId1) && this._isStop1 == false) {
            for (var i = 0; i < this._containerList1.length; i++) {
                var rewardContainer = this._containerList1[i];
                if (rewardContainer.y == this._endPosY1 && rewardContainer.name == lastid) {
                    this._isStop1 = true;
                    break;
                }
            }
        }
        if (this._isStop1) {
            this._stopIndex1++;
        }
        if (this._isStop1 || this._stopIndex1 > (this._rewardsVoList.length * 2)) {
            this._offestId1 = (this._slideIndex1 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
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
                            // this.movePos1(this.pollTime + (this._stopIndex1 * 0.05) * (this._stopIndex1 * 0.04) * (52 * this._stopIndex1));
                            //  this.movePos1(this.pollTime + (this._stopIndex1 * 10) );
                            _this.movePos1(_this.pollTime);
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
    AcArcadeView.prototype.movePos2 = function (time) {
        var _this = this;
        this._slideIndex2++;
        var lastid = this._lastId2;
        if (this._slideIndex2 >= (this._rewardsVoList.length * 2 + this._offestId2) && this._isStop2 == false) {
            for (var i = 0; i < this._containerList2.length; i++) {
                if (this._containerList2[i].y == this._endPosY2 && this._containerList2[i].name == lastid) {
                    this._isStop2 = true;
                    break;
                }
            }
        }
        if (this._isStop2) {
            this._stopIndex2++;
        }
        if (this._isStop2 || this._stopIndex2 >= (this._rewardsVoList.length * 2)) {
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
                            // this.movePos2(this.pollTime + (this._stopIndex2 * 0.05) * (this._stopIndex2 * 0.04) * (52 * this._stopIndex2));
                            //  this.movePos2(this.pollTime + (this._stopIndex2 * 10));
                            _this.movePos2(_this.pollTime);
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
    AcArcadeView.prototype.movePos3 = function (time) {
        var _this = this;
        this._slideIndex3++;
        var lastid = this._lastId3;
        if (this._slideIndex3 >= (this._rewardsVoList.length * 3 + this._offestId3) && this._isStop3 == false) {
            for (var i = 0; i < this._containerList3.length; i++) {
                if (this._containerList3[i].y == this._endPosY3 && this._containerList3[i].name == lastid) {
                    this._isStop3 = true;
                    break;
                }
            }
        }
        if (this._isStop3) {
            this._stopIndex3++;
        }
        if (this._isStop3 || this._stopIndex3 >= (this._rewardsVoList.length * 2)) {
            this._offestId3 = (this._slideIndex3 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            this.playLotteryEndAni();
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
                            // this.movePos3(this.pollTime + (this._stopIndex3 * 0.05) * (this._stopIndex3 * 0.04) * (52 * this._stopIndex3));
                            //  this.movePos3(this.pollTime + (this._stopIndex3 * 10)  );
                            _this.movePos3(_this.pollTime);
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
    AcArcadeView.prototype.getRewardContainer = function (id, rewardVo) {
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
            var itemlightEffect = ComponentManager.getCustomMovieClip("xiangkuang", 6, 70);
            itemlightEffect.anchorOffsetX = 23; // 150/2;
            itemlightEffect.anchorOffsetY = 25; // 150/2;
            rewardContainer.addChild(itemlightEffect);
            itemlightEffect.name = "itemlight";
            itemlightEffect.playWithTime(0);
            itemlightEffect.alpha = 0;
            this._rewardsPool[id] = rewardContainer;
            return this._rewardsPool[id];
        }
    };
    AcArcadeView.prototype.showEndReward = function () {
        if (!this._isBatch) {
            var otherRewards = null;
            var tmpthis_1 = this;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: this._handlerData.rewards, otherRewards: otherRewards, isPlayAni: true, callback: function () {
                    tmpthis_1._isPlayAni = false;
                }, target: this });
        }
        else {
            this._lihuaIndex = 0;
            var batchList = this._handlerData.batchList || [];
            var tmpthis_2 = this;
            // ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEBATCHPOPUPVIEW,{f:this.showRewards,o:this,batchList:batchList,aid:this.aid,code:this.code,lotteytime: this._handlerData.lotteytime});
            ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEBATCHPOPUPVIEW, { batchList: batchList, aid: this.aid, code: this.code, lotteytime: this._handlerData.lotteytime, f: function () {
                    tmpthis_2._isPlayAni = false;
                }, o: this });
        }
    };
    AcArcadeView.prototype.playLotteryEndAni = function () {
        this.refreshPullrod(false);
        if (this._choujiangEndNum != "1") {
            this._dbdragon.playDragonMovie("zhongjiang" + this._choujiangEndNum, 1);
        }
        if (!this._isBatch) {
            // this.showEndReward();
            egret.Tween.get(this, { loop: false }).wait(1000).call(this.showEndReward, this);
        }
        var loopNum = 0;
        this._container1 = this._machineContainer.getChildByName(this._lastId1);
        this._container2 = this._machineContainer.getChildByName(this._lastId2);
        this._container3 = this._machineContainer.getChildByName(this._lastId3);
        if (this._container1) {
            var itemlightEffect = this._container1.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                egret.Tween.get(itemlightEffect, { loop: false }).wait(3000).to({ alpha: 0 }, 100);
            }
        }
        if (this._container2) {
            var itemlightEffect = this._container2.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                egret.Tween.get(itemlightEffect, { loop: false }).wait(3000).to({ alpha: 0 }, 100);
            }
        }
        if (this._container3) {
            var itemlightEffect = this._container3.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                egret.Tween.get(itemlightEffect, { loop: false }).wait(3000).to({ alpha: 0 }, 100);
            }
        }
    };
    /**指针动画1 */
    AcArcadeView.prototype.playPointAni1 = function () {
        var _this = this;
        this._rightPoint.rotation = 0;
        egret.Tween.removeTweens(this._rightPoint);
        var time = 75;
        var loopTime = 0;
        egret.Tween.get(this._rightPoint, { loop: true }).to({ rotation: -90 }, time).to({ rotation: 0 }, time).to({ rotation: 90 }, time).to({ rotation: 0 }, time).call(function () {
            loopTime++;
            if (loopTime > 11) {
                _this._rightPoint.rotation = 0;
                egret.Tween.removeTweens(_this._rightPoint);
            }
        }, this);
    };
    /**指针动画1 */
    AcArcadeView.prototype.playPointAni2 = function () {
        var _this = this;
        this._leftPoint.rotation = -180;
        egret.Tween.removeTweens(this._leftPoint);
        var time = 75;
        var loopTime = 0;
        egret.Tween.get(this._leftPoint, { loop: true }).to({ rotation: -270 }, time).to({ rotation: -180 }, time).to({ rotation: -90 }, time).to({ rotation: -180 }, time).call(function () {
            loopTime++;
            if (loopTime > 8) {
                _this._leftPoint.rotation = -180;
                egret.Tween.removeTweens(_this._leftPoint);
            }
        }, this);
    };
    AcArcadeView.prototype.showLihua = function (msg) {
        var _this = this;
        var view = this;
        if (!this._lihua) {
            this._lihua = new BaseDisplayObjectContainer();
            this._lihua.width = GameConfig.stageWidth;
            this._lihua.height = GameConfig.stageHeigth;
            this._lihua.x = 0;
            this._lihua.y = this._gameBM.y - 170;
            this.addChildToContainer(this._lihua);
        }
        var deviationNum = 0;
        var param = {
            "1": { color: 'caise_0000', pos: [500, 40 + deviationNum], scale: 0.9, wait: 0 },
            "2": { color: 'lv_0000', pos: [80, 10 + deviationNum], scale: 1.85, wait: 200 },
            "3": { color: 'lv_0000', pos: [300, 0 + deviationNum], scale: 1.5, wait: 400 },
            "4": { color: 'yanhua_0000', pos: [200, -50 + deviationNum], scale: 2, wait: 650 },
            "5": { color: 'caise_0000', pos: [40, 60 + deviationNum], scale: 1, wait: 900 }
        };
        var _loop_4 = function (i) {
            if (view._lihua && !view._lihua.getChildByName("lihua" + i)) {
                var unit = param[i];
                var lihuaclip_1 = ComponentManager.getCustomMovieClip("" + unit.color, 11, 115);
                lihuaclip_1.setScale(unit.scale);
                lihuaclip_1.name = "lihua" + i;
                lihuaclip_1.x = unit.pos[0];
                lihuaclip_1.y = unit.pos[1];
                view._lihua.addChild(lihuaclip_1);
                egret.Tween.get(lihuaclip_1).wait(unit.wait).call(function () {
                    egret.Tween.removeTweens(lihuaclip_1);
                    if (view._lihua) {
                        view._lihua.addChild(lihuaclip_1);
                        lihuaclip_1.playWithTime(3);
                        lihuaclip_1.setEndCallBack(function () {
                            _this._lihua.removeChild(lihuaclip_1);
                        }, _this);
                    }
                }, view);
            }
        };
        for (var i in param) {
            _loop_4(i);
        }
        if (msg) {
            this.showTip(LanguageManager.getlocal("acLotteryShowMsg", [msg.name, msg.gem.toString()]));
        }
    };
    AcArcadeView.prototype.showTip = function (message) {
        var tipContainer = this._tipCon;
        var msgText = undefined;
        var tipBg = undefined;
        var txtLine = 1;
        if (!tipContainer) {
            tipContainer = new BaseDisplayObjectContainer();
            tipBg = BaseBitmap.create("public_tipbg");
            tipBg.setPosition(-tipBg.width / 2, -tipBg.height / 2 - 20);
            tipBg.height = 200;
            tipBg.name = "tipBg";
            tipContainer.addChild(tipBg);
            msgText = ComponentManager.getTextField(message, 34, TextFieldConst.COLOR_LIGHT_YELLOW);
            msgText.textAlign = egret.HorizontalAlign.CENTER;
            msgText.name = "msgText";
            msgText.lineSpacing = 10;
            txtLine = msgText.numLines;
            tipContainer.addChild(msgText);
            tipContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            this.addChild(tipContainer);
            this._tipCon = tipContainer;
        }
        else {
            tipBg = tipContainer.getChildByName("tipBg");
            msgText = this._tipCon.getChildByName("msgText");
        }
        msgText.text = message;
        msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
        egret.Tween.removeTweens(tipContainer);
        egret.Tween.get(this._tipCon).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 70).wait(2300 * txtLine).to({ alpha: 0 }, 200).call(function (tipContainer) {
            if (tipContainer) {
                egret.Tween.removeTweens(tipContainer);
                if (this.contains(tipContainer)) {
                    this.removeChild(tipContainer);
                }
                tipContainer.setScale(1);
                tipContainer.alpha = 1;
            }
        }.bind(this, this._tipCon), this);
    };
    AcArcadeView.prototype.tick = function () {
        var deltaT = this.acVo.acCountDown;
        var cdStrK = "acFanliReviewReward_acCD";
        if (this._acCDTxt && deltaT) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            return true;
        }
        return false;
    };
    AcArcadeView.prototype.initLoop = function () {
        if (!this._titleBar) {
            this._titleBar = BaseBitmap.create("mainui_chatbg");
            this._titleBar.width = 640;
            this._titleBar.height = 32;
            this._titleBar.x = 0;
            this._titleBar.y = 222;
            this.addChildToContainer(this._titleBar);
            this._titleBarText = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._titleBarText.x = this._titleBar.x + this._titleBar.width / 2 - this._titleBarText.width / 2;
            this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height / 2;
            this.addChildToContainer(this._titleBarText);
        }
        if (this._loopList.length > 0) {
            this.nextLoop(0);
        }
        else {
            this._titleBarText.text = LanguageManager.getlocal("acLotteryLoopEmpty");
            this._titleBarText.x = this._titleBar.x + this._titleBar.width / 2 - this._titleBarText.width / 2;
            this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height / 2;
        }
    };
    //下一个跑马灯
    AcArcadeView.prototype.nextLoop = function (index) {
        var _this = this;
        if (index >= this._loopList.length) {
            index = 0;
        }
        var str = this._loopList[index];
        this._titleBarText.text = str;
        this._titleBarText.x = this._titleBar.x + this._titleBar.width;
        this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height / 2;
        var overX = this._titleBar.x - this._titleBarText.width;
        egret.Tween.removeTweens(this._titleBarText);
        egret.Tween.get(this._titleBarText).to({ x: overX }, 10000)
            .call(function () {
            _this.nextLoop(index + 1);
        });
    };
    /**
     * 刷新红点相关
     */
    AcArcadeView.prototype.refreshRedDot = function () {
    };
    AcArcadeView.prototype.getRuleInfo = function () {
        return "acArcadeRuleInfo-" + this.getCnCode();
    };
    AcArcadeView.prototype.getRuleParam = function () {
        var cfg = this.acVo.config;
        return ["" + cfg.cost, "" + cfg.addPrize, "" + cfg.totalNum];
    };
    AcArcadeView.prototype.getBgName = function () {
        return "acarcadeview_bg-" + this.getUiCode();
    };
    AcArcadeView.prototype.getTitleBgName = function () {
        return "arcadegame_titlebg-" + this.getUiCode();
    };
    AcArcadeView.prototype.getTitleStr = function () {
        return null;
    };
    AcArcadeView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "acarcadeview_bg-" + code, "acarcadeview_machine-" + code,
            "acarcadeview_machine-flag", "acarcadeview_machine-flag2", "acarcadeview_machinemask-1", "acarcadeview_pullroddown-" + code, "acarcadeview_pullrodup-" + code,
            "acarcadeview_usebg-1", "arcadegame_arrow", "arcadegame_bottombg-" + code,
            "arcadegame_costbg", "arcadegame_title_1", "arcadegame_topbg_1", "arcadegame_topbg_2",
            "arcadegame_btn1", "arcadegame_btn2", "arcadegame_listbtn", "arcadegame_logbtn", "arcadegame_logtxt", "arcadegame_rewardbtn",
            "arcadegame_rewardtxt", "arcadegame_titlebg-" + code, "arcadegame_txt_gold", "activity_fnt",
            "caise_0000", "lv_0000", "yanhua_0000",
        ]);
    };
    AcArcadeView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_ARCADEINFO, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcArcadeView.prototype.receiveData = function (data) {
        this.lampwinfos = data.data.data.lampwinfos;
        this.totalgem = data.data.data.totalgem;
        // this._loopList
        var lampwinfos = data.data.data.lampwinfos || [];
        var lampcwardinfos = data.data.data.lampcwardinfos || [];
        this.dealLampinfos(lampwinfos, lampcwardinfos);
        if (data.data.data.wuid) {
            var wname = data.data.data.wname;
            var wgem = data.data.data.wgem;
            this._enterLiHuaData = { name: wname, gem: wgem };
        }
    };
    AcArcadeView.prototype.dealLampinfos = function (lampwinfos, lampcwardinfos) {
        lampwinfos = lampwinfos || [];
        lampcwardinfos = lampcwardinfos || [];
        this._loopList = [];
        var loopStr = "";
        var msgObj = null;
        for (var i = 0; i < lampwinfos.length; i++) {
            msgObj = lampwinfos[i];
            loopStr = LanguageManager.getlocal("acLotteryLoopMsg1", [msgObj[1], msgObj[2].toString()]);
            this._loopList.push(loopStr);
        }
        for (var i = 0; i < lampcwardinfos.length; i++) {
            msgObj = lampcwardinfos[i];
            var randRewardStr = msgObj[3];
            var reward = GameData.formatRewardItem(randRewardStr)[0];
            loopStr = LanguageManager.getlocal("acLotteryLoopMsg2", [msgObj[1], reward.name, reward.num.toString()]);
            this._loopList.push(loopStr);
        }
    };
    AcArcadeView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcArcadeView.prototype.getCnCode = function () {
        if (this.code == "2" || this.code == "3") {
            return "1";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcArcadeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._isPlayAni = false;
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
        this._gameCoin = null;
        this._leftPoint = null;
        this._rightPoint = null;
        this.lampwinfos = null;
        this.totalgem = 0;
        this._cost_Centertxt = null;
        this._posList1 = [];
        this._containerList1 = [];
        this._posList2 = [];
        this._containerList2 = [];
        this._posList3 = [];
        this._containerList3 = [];
        this._machineContainer = null;
        this._rewardsPool = [];
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
        this._offestId1 = 0;
        this._offestId2 = 0;
        this._offestId3 = 0;
        this._container1 = null;
        this._container2 = null;
        this._container3 = null;
        this._handlerData = null;
        this._isBatch = false;
        this._loopList = [];
        this._titleBar = null;
        this._titleBarText = null;
        this._titleBg = null;
        this._rewardsVoList = [];
        this._lihua = null;
        this._lihuaMsg = null;
        this._tipCon = null;
        this._tempObj = null;
        this._onceBtn = null;
        this._tenBtn = null;
        this._changeList = [];
        this._rRewards = null;
        this._oRewards = null;
        this._lihuaIndex = 0;
        if (this._dbdragon) {
            this._dbdragon.stop();
            this._dbdragon.dispose();
            this._dbdragon = null;
        }
        this._choujiangEndNum = "";
        this._enterLiHuaData = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeView;
}(AcCommonView));
__reflect(AcArcadeView.prototype, "AcArcadeView");
