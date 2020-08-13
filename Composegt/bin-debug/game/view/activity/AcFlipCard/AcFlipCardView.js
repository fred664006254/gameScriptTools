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
 * author yanyuling
 */
var AcFlipCardView = (function (_super) {
    __extends(AcFlipCardView, _super);
    function AcFlipCardView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._maxLivenessValue = 0;
        _this._cardList = [];
        _this._boxList = [];
        _this._selIdx = 1;
        _this._priceTXT1 = null;
        _this._priceTXT2 = null;
        _this._isPlaying = false;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        return _this;
    }
    Object.defineProperty(AcFlipCardView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFlipCardView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FLIPCARD_REWARD_END, this.resetCards, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH, this.refreshTaskRed, this);
        this._selIdx = this.acVo.getCurSelectCardIdx();
        this.viewBg.y = 40;
        var flipcard_txt = BaseBitmap.create("flipcard_txt");
        flipcard_txt.x = GameConfig.stageWidth / 2 - flipcard_txt.width / 2;
        flipcard_txt.y = 0;
        this.addChild(flipcard_txt);
        var flipcard_bg06 = BaseBitmap.create("flipcard_bg06");
        flipcard_bg06.width = GameConfig.stageWidth; //-10;
        flipcard_bg06.height = 180;
        flipcard_bg06.x = GameConfig.stageWidth / 2 - flipcard_bg06.width / 2;
        flipcard_bg06.y = 70;
        this.addChildToContainer(flipcard_bg06);
        // 任务
        var iconBg = BaseBitmap.create("mainui_bottombtnbg");
        iconBg.x = GameConfig.stageWidth - iconBg.width - 15;
        iconBg.y = flipcard_bg06.y + flipcard_bg06.height - 5;
        iconBg.addTouchTap(this.taskBtnHandler, this);
        this.addChildToContainer(iconBg);
        var taskButton = ComponentManager.getButton("flipcard" + "_taskIcon_" + this.code, "", this.taskBtnHandler, this);
        taskButton.width = taskButton.height = 80;
        taskButton.x = iconBg.x + iconBg.width / 2 - taskButton.width / 2;
        taskButton.y = iconBg.y + iconBg.height / 2 - taskButton.height / 2;
        this.addChildToContainer(taskButton);
        this._taskBtn = taskButton;
        var taskButtonTxt = BaseBitmap.create("acchristmasview_1_taskname");
        taskButtonTxt.x = taskButton.x + taskButton.width / 2 - taskButtonTxt.width / 2 + 3;
        taskButtonTxt.y = taskButton.y + 50;
        this.addChildToContainer(taskButtonTxt);
        var infoBtn = ComponentManager.getButton("acmidautumnview_infobtn", "", this.infoBtnClick, this);
        infoBtn.setPosition(taskButton.x - taskButton.width - 10, taskButton.y);
        this.addChild(infoBtn);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = flipcard_bg06.x + 15;
        this._activityTimerText.y = flipcard_bg06.y + 20;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 5;
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFlipCard_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 20);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 3;
        this._ruleText.width = flipcard_bg06.width - this._activityTimerText.x * 2;
        this._ruleText.text = LanguageManager.getlocal("acFlipCard_Rule" + this.code);
        this.addChildToContainer(this._ruleText);
        var searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt1.text = LanguageManager.getlocal("acFlipCard_txt2", ["10"]);
        searchtxt1.y = GameConfig.stageHeigth - this.container.y - 140;
        if (GameConfig.stageHeigth <= 960) {
            searchtxt1.y = GameConfig.stageHeigth - this.container.y - 115;
        }
        // searchtxt1.visible = false;
        this.addChildToContainer(searchtxt1);
        var searchBtn1 = ComponentManager.getButton("flipcard_button2", "acFlipCard_txt3", this.searchHandler, this, [1]);
        searchBtn1.x = 50;
        searchBtn1.y = searchtxt1.y + 25;
        searchtxt1.x = searchBtn1.x + searchBtn1.width / 2 - searchtxt1.width / 2;
        searchBtn1.name = "searchBtn1";
        this.addChildToContainer(searchBtn1);
        var searchtxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt2.text = LanguageManager.getlocal("acFlipCard_txt2", ["20"]);
        searchtxt2.x = 430;
        searchtxt2.y = searchtxt1.y;
        this.addChildToContainer(searchtxt2);
        var searchBtn2 = ComponentManager.getButton("flipcard_button2", "acFlipCard_txt4", this.searchHandler, this, [10]);
        searchBtn2.x = GameConfig.stageWidth - searchBtn2.width - searchBtn1.x;
        searchBtn2.y = searchBtn1.y;
        searchtxt2.x = searchBtn2.x + searchBtn2.width / 2 - searchtxt2.width / 2;
        this.addChildToContainer(searchBtn2);
        searchBtn2.name = "searchBtn2";
        searchBtn1.setColor(TextFieldConst.COLOR_BROWN);
        searchBtn2.setColor(TextFieldConst.COLOR_BROWN);
        this._priceTXT1 = searchtxt1;
        this._priceTXT2 = searchtxt2;
        var wifeId = this.acVo.config.getWifeID();
        var wcfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var posy = searchtxt1.y - 100;
        this.showDBDragon(posy);
        var flipcard_bg02 = BaseBitmap.create("flipcard_bg02");
        flipcard_bg02.x = GameConfig.stageWidth / 2 - flipcard_bg02.width / 2;
        flipcard_bg02.y = searchtxt1.y - 120;
        this.addChildToContainer(flipcard_bg02);
        this._progress = ComponentManager.getProgressBar("flipcard_progress", "flipcard_progressbg", 480);
        this._progress.x = GameConfig.stageWidth / 2 - this._progress.width / 2;
        this._progress.y = flipcard_bg02.y + flipcard_bg02.height / 2 - this._progress.height / 2;
        this._progress.setPercentage(0);
        this.addChildToContainer(this._progress);
        var flipcard_bg05 = BaseBitmap.create("flipcard_bg05");
        flipcard_bg05.x = this._progress.x - flipcard_bg05.width / 2;
        flipcard_bg05.y = this._progress.y + this._progress.height / 2 - flipcard_bg05.height / 2;
        this.addChildToContainer(flipcard_bg05);
        var flipcard_bg04 = BaseBitmap.create("flipcard_bg04");
        flipcard_bg04.x = flipcard_bg05.x + flipcard_bg05.width / 2 - flipcard_bg04.width / 2;
        flipcard_bg04.y = flipcard_bg05.y + flipcard_bg05.height - flipcard_bg04.height;
        this.addChildToContainer(flipcard_bg04);
        this._curLivenessTxt = ComponentManager.getTextField("123", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curLivenessTxt.text = "" + this.acVo.lotterynum;
        this._curLivenessTxt.anchorOffsetX = this._curLivenessTxt.width / 2;
        this._curLivenessTxt.x = flipcard_bg05.x + flipcard_bg05.width / 2;
        this._curLivenessTxt.y = flipcard_bg05.y + flipcard_bg05.height / 2 - this._curLivenessTxt.height / 2 - 5;
        this.addChildToContainer(this._curLivenessTxt);
        var staticTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFlipCard_txt5"), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        staticTxt.x = flipcard_bg04.x + flipcard_bg04.width / 2 - staticTxt.width / 2;
        staticTxt.y = flipcard_bg04.y + flipcard_bg04.height / 2 - staticTxt.height / 2;
        this.addChildToContainer(staticTxt);
        //初始化宝箱
        var rewardList = this.acVo.config.ReviewNum;
        var rkeys = Object.keys(rewardList);
        var perWidth = 430 / rkeys.length;
        //进度是0
        var perX = this._progress.x;
        var len = rkeys.length;
        var deltaX = this._progress.width / len;
        for (var index = 0; index < len; index++) {
            var tmprcfg = rewardList[String(index + 1)];
            // let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
            var imgpre = "flipcard_box1";
            // if(len-1 == index){
            //     imgpre = "acrechargeboxview_box1";
            // }
            var rStatus = 0; // this.getBoxStatusById(rkeys[index]);
            var boxImg = BaseBitmap.create(imgpre);
            boxImg.anchorOffsetX = boxImg.width / 2;
            boxImg.anchorOffsetY = boxImg.height / 2;
            boxImg.name = "boxImg" + index;
            boxImg.x = perX + deltaX * (index + 1);
            boxImg.y = this._progress.y;
            this.addChildToContainer(boxImg);
            boxImg.addTouchTap(this.boxHandler, this, [index]);
            this._boxList.push(boxImg);
        }
        // this.refreshBoxImg();
        var flipcard_bg03 = BaseBitmap.create("flipcard_bg03");
        flipcard_bg03.x = GameConfig.stageWidth - flipcard_bg03.width - 40;
        flipcard_bg03.y = flipcard_bg02.y - flipcard_bg03.height - 25;
        this.addChildToContainer(flipcard_bg03);
        var refreshBtn = ComponentManager.getButton("flipcard_button1", "", this.refreshHandler, this, [10]);
        refreshBtn.x = flipcard_bg03.x + flipcard_bg03.width - refreshBtn.width + 5;
        refreshBtn.y = flipcard_bg03.y + flipcard_bg03.height / 2 - refreshBtn.height / 2 + 5;
        this.addChildToContainer(refreshBtn);
        // let cfg = <Config.AcCfg.FlipCardCfg>this.acVo.config;
        var flipcard_bg03txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        flipcard_bg03txt.text = LanguageManager.getlocal("acFlipCard_txt1", [String(this.acVo.config.refrestPrice)]);
        flipcard_bg03txt.x = flipcard_bg03.x + flipcard_bg03.width / 2 - flipcard_bg03txt.width / 2;
        flipcard_bg03txt.y = flipcard_bg03.y + flipcard_bg03.height / 2 - flipcard_bg03txt.height / 2;
        this.addChildToContainer(flipcard_bg03txt);
        var startX = 335;
        var startY = flipcard_bg03.y - 260;
        for (var index2 = 0; index2 < 6; index2++) {
            var cardImg = new FlipCardItem();
            var ctype = this.acVo.getCardType(index2 + 1);
            cardImg.resetData(index2, ctype, this.acVo.config.getCardAddVaule(ctype), this.acVo.getCardReward(index2 + 1), this.code);
            if (index2 == 3) {
                startX = 335;
                startY += 155;
            }
            cardImg.x = startX;
            cardImg.y = startY;
            startX += 117;
            this.addChildToContainer(cardImg);
            this._cardList.push(cardImg);
            cardImg.setselectedStatus(index2 + 1 == this._selIdx);
            cardImg.addTouchTap(this.switchSeleCard, this, [index2]);
        }
        this.refreshUI();
        this.refreshTaskRed();
        this.randomSay();
    };
    AcFlipCardView.prototype.showDBDragon = function (posY) {
        var wifeId = this.acVo.config.getWifeID();
        var wcfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var boneName = wcfg.bone + "_ske";
        var dagonBonesName = wcfg.bone; // "servant_full2_"+ servantId ;
        if (!Api.switchVoApi.checkCloseBone() && boneName && Api.wifeVoApi.isHaveBone(boneName) && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._skinImg) {
                this._skinImg.visible = false;
            }
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true;
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.x = 170;
            this._droWifeIcon.y = posY + 40;
            this.addChildToContainer(this._droWifeIcon);
        }
        else {
            if (!this._skinImg) {
                var tarScale = 0.6;
                var skinW = 640 * tarScale;
                var skinH = 840 * tarScale;
                this._skinImg = BaseLoadBitmap.create(wcfg.body);
                this._skinImg.width = skinW;
                this._skinImg.height = skinH;
                this._skinImg.x = -40;
                this._skinImg.y = posY - this._skinImg.height;
                this.addChildToContainer(this._skinImg);
            }
        }
    };
    AcFlipCardView.prototype.refreshUI = function () {
        var cfg = this.acVo.config;
        this._curLivenessTxt.text = "" + this.acVo.lotterynum;
        this._curLivenessTxt.anchorOffsetX = this._curLivenessTxt.width / 2;
        this._priceTXT1.text = LanguageManager.getlocal("acFlipCard_txt2", ["" + this.acVo.getFlipPrice()]);
        this._priceTXT2.text = LanguageManager.getlocal("acFlipCard_txt2", ["" + this.acVo.getBatchFlipPrice()]);
        this._progress.setPercentage(this.acVo.lotterynum / cfg.valueMax);
        this.changeCardSelected();
        this.refreshBoxImg();
    };
    AcFlipCardView.prototype.infoBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
    };
    //刷新宝箱状态
    AcFlipCardView.prototype.refreshBoxImg = function () {
        var lotterynum = this.acVo.lotterynum;
        var cfg = this.acVo.config;
        var ReviewNum = cfg.ReviewNum;
        var len = this._boxList.length;
        for (var index = 1; index <= len; index++) {
            var stage = this.acVo.getStageinfo(index);
            var boxImg = this._boxList[index - 1];
            egret.Tween.removeTweens(boxImg);
            var imgpre = "flipcard_box";
            // if(len == index){
            //     imgpre = "acrechargeboxview_box";
            // }
            if (stage == 1) {
                boxImg.texture = ResourceManager.getRes(imgpre + 3);
            }
            else {
                if (ReviewNum[index - 1].needNum > lotterynum) {
                    boxImg.texture = ResourceManager.getRes(imgpre + 1);
                }
                else {
                    boxImg.texture = ResourceManager.getRes(imgpre + 2);
                    egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
            }
        }
    };
    AcFlipCardView.prototype.changeCardSelected = function () {
        for (var index = 0; index < this._cardList.length; index++) {
            var element = this._cardList[index];
            element.setselectedStatus(index + 1 == this._selIdx);
        }
    };
    AcFlipCardView.prototype.switchSeleCard = function (param, param2) {
        if (this._isPlaying) {
            return;
        }
        // if(this.acVo.isCardFliped(param2+1)){
        //     return;
        // }
        this._selIdx = param2 + 1;
        this.changeCardSelected();
    };
    AcFlipCardView.prototype.boxHandler = function (param, param2) {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var cfg = this.acVo.config;
        var ReviewNum = cfg.ReviewNum[param2];
        if (this.acVo.getStageinfo(param2 + 1) == 0 && this.acVo.lotterynum >= ReviewNum.needNum) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD, this.boxHandlerNetBack, this);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD, { activeId: this.acVo.aidAndCode, gid: param2 + 1 });
        }
        else {
            ViewController.getInstance().openView("AcFlipCardBoxRewardPopupView", { rewardstr: ReviewNum.getReward, need: ReviewNum.needNum });
        }
    };
    AcFlipCardView.prototype.boxHandlerNetBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD, this.boxHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards = rdata.rewards;
            var cfrewards = rdata.cfrewards;
            // let rList = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rList);
            if (cfrewards.indexOf("8_") > 0) {
                Api.servantVoApi.checkServantChangeRewards(cfrewards, rewards);
            }
            else {
                Api.wifeVoApi.checkWifeChangeRewards(cfrewards, rewards);
            }
            this.refreshBoxImg();
        }
    };
    AcFlipCardView.prototype.taskBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView("AcFlipCardTaskPopupView", { aid: this.aid, code: this.code });
    };
    AcFlipCardView.prototype.refreshHandler = function () {
        if (this._isPlaying) {
            return;
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.getFlipNums() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip4'));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < this.acVo.config.refrestPrice) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip1'));
            return;
        }
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = this.acVo.config.refrestPrice;
        var message = LanguageManager.getlocal("acFlipCardBoxReward_refreshbox_tip", [needGem]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
            useNum: needGem,
            confirmCallback: this.dorefreshReq,
            handler: this, icon: "itemicon1",
            iconBg: "itembg_1",
            num: gem,
            msg: message,
            id: 1
        });
    };
    AcFlipCardView.prototype.dorefreshReq = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE, this.refreshClickhandler, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE, { activeId: this.acVo.aidAndCode, });
    };
    AcFlipCardView.prototype.resetCards = function () {
        this._isPlaying = false;
        if (!this.acVo.isCardReset()) {
            return;
        }
        this._selIdx = this.acVo.getCurSelectCardIdx();
        for (var index = 0; index < this._cardList.length; index++) {
            var element = this._cardList[index];
            var ctype = this.acVo.getCardType(index + 1);
            element.resetData(index, ctype, this.acVo.config.getCardAddVaule(ctype), this.acVo.getCardReward(index + 1), this.code);
            // element.showFlipAni();//翻牌动画
        }
    };
    AcFlipCardView.prototype.refreshClickhandler = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            //动画+刷新
            this.resetCards();
            this.refreshUI();
        }
    };
    AcFlipCardView.prototype.searchHandler = function (param) {
        if (this._isPlaying == true) {
            return;
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (!this.acVo.isFlipEnable()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip2'));
            return;
        }
        // if(this.acVo["chipnum"] >= this.acVo.config.RansackItemNum)
        // {
        // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
        // 	// App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitor_nettip4'));
        //     return;
        // }
        // if(this.acVo["attacknum"] < param){
        // 	let rewardStr = LanguageManager.getlocal("acRansackTraitor_nettip6",[this.acVo["attacknum"]]);
        // 	ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        // 		title:"itemUseConstPopupViewTitle",
        // 		msg:rewardStr,
        // 		callback:this.rechargeClick,
        // 		handler:this,
        // 		needCancel:true
        // 	});
        // 	return;
        // }
        if (param == 1) {
            if (this.acVo.isCardFliped(this._selIdx)) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip3'));
                return;
            }
            if (Api.playerVoApi.getPlayerGem() < this.acVo.getFlipPrice()) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_Notenoughdes'));
                return;
            }
            this._isPlaying = true;
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD, this.searchHandlerNetBack, this);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD, { activeId: this.acVo.aidAndCode, tid: this._selIdx });
        }
        else if (param == 10) {
            if (Api.playerVoApi.getPlayerGem() < this.acVo.getBatchFlipPrice()) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_Notenoughdes'));
                return;
            }
            this._isPlaying = true;
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD, this.searchHandlerNetBack, this);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD, { activeId: this.acVo.aidAndCode, tid: param });
        }
    };
    AcFlipCardView.prototype.searchHandlerNetBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD, this.searchHandlerNetBack, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards = rdata.rewards;
            var rewardarr = rdata.rewardarr;
            var cfrewards = rdata.cfrewards;
            // let rList = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rList);
            if (event.data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD) {
                var keys = Object.keys(rewardarr);
                var len = keys.length;
                // keys.sort();
                var deltaT = 0;
                // for (var index = 0; index < keys.length; index++) {
                //     var key = keys[index];
                //     if (rewardarr.hasOwnProperty(key)) {
                //         let isShow = index+1 == len ? true : false;
                //         if(this.acVo.getCardType(Number(key)) == 1){
                //             deltaT += 800 ;
                //         }else{
                //             deltaT += 300;
                //         }
                //        this._cardList[Number(key)-1].showFlipAni(rewardarr[key],isShow,rewards,cfrewards,deltaT);//翻牌动画
                //     }
                // }
                var idx = 0;
                for (var index = 0; index < this._cardList.length; index++) {
                    var card = this._cardList[index];
                    var tmpkey = "" + (index + 1);
                    var tmpreward = rewardarr[tmpkey];
                    if (tmpreward) {
                        var isShow = idx + 1 == len ? true : false;
                        if (this.acVo.getCardType(index + 1) == 1) {
                            deltaT += 800;
                        }
                        else {
                            deltaT += 300;
                        }
                        this._cardList[index].showFlipAni(tmpreward, isShow, rewards, cfrewards, deltaT); //翻牌动画
                        idx++;
                    }
                }
            }
            else {
                this._cardList[this._selIdx - 1].showFlipAni(rewards, true, rewards, cfrewards); //翻牌动画   
            }
            // this._selIdx ++ ;
            // if(this._selIdx == 7 || !this.acVo.isFlipEnable()){
            //     this._selIdx = 1;
            // }
            this._selIdx = this.acVo.getCurSelectCardIdx();
            this.refreshUI();
            //动画+刷新
        }
    };
    AcFlipCardView.prototype.randomSay = function () {
        var _this = this;
        var cfg = this.acVo.config;
        var ReviewNum = cfg.ReviewNum;
        if (this.acVo.lotterynum < cfg.valueMax) {
            // 随机一个人说话
            var rndSayBg_1 = BaseBitmap.create("public_9_qipao");
            var rndSayTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acFlipCardBoxReward_talk_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rndSayBg_1.width = rndSayTxt_1.width + 40;
            rndSayBg_1.height = 56;
            rndSayBg_1.x = this._progress.x + this._progress.width - rndSayBg_1.width + 40;
            rndSayBg_1.y = this._progress.y - rndSayBg_1.height - 10;
            // rndSayBg.scaleY = -1;
            this.addChildToContainer(rndSayBg_1);
            rndSayTxt_1.x = rndSayBg_1.x + rndSayBg_1.scaleX * rndSayBg_1.width / 2 - rndSayTxt_1.width / 2;
            rndSayTxt_1.y = rndSayBg_1.y + rndSayBg_1.height / 2 - rndSayTxt_1.height / 2 - 8;
            this.addChildToContainer(rndSayTxt_1);
            var rndSayHead_1 = BaseBitmap.create("flipcard_talk_head_" + this.code);
            // rndSayHead.setScale(0.5);
            rndSayHead_1.x = rndSayBg_1.x - rndSayHead_1.width + 28;
            rndSayHead_1.y = rndSayBg_1.y + rndSayBg_1.height / 2 - rndSayHead_1.height / 2 - 3;
            this.addChildToContainer(rndSayHead_1);
            egret.Tween.get(rndSayBg_1)
                .wait(4000)
                .call(function () {
                rndSayBg_1.visible = false;
                rndSayTxt_1.visible = false;
                rndSayHead_1.visible = false;
            })
                .wait(6000)
                .call(function () {
                _this.randomSay();
                rndSayBg_1.parent.removeChild(rndSayBg_1);
                rndSayTxt_1.parent.removeChild(rndSayTxt_1);
                rndSayHead_1.parent.removeChild(rndSayHead_1);
            });
        }
    };
    AcFlipCardView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "acFlipCard_acCD";
        if (this.code == "4") {
            cdStrK = "acFlipCard_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFlipCard_acCDEnd")]);
        }
        return false;
    };
    AcFlipCardView.prototype.refreshTaskRed = function () {
        if (this.acVo.isShowTaskRed()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
    };
    AcFlipCardView.prototype.getTitleStr = function () {
        return "";
    };
    AcFlipCardView.prototype.getBgName = function () {
        return "flipcard_bg01";
    };
    // 标题背景名称
    AcFlipCardView.prototype.getTitleBgName = function () {
        return "flipcard_titlebg";
    };
    // // 关闭按钮图标名称
    // protected getCloseBtnName():string
    // {
    // 	return this.getClassName().toLowerCase() + "closebtn";
    // }
    AcFlipCardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "flipcard_bg01", "flipcard_bg02", "flipcard_bg03", "flipcard_bg04", "flipcard_bg05", "flipcard_bg06",
            "flipcard_butterfly", "flipcard_button1", "flipcard_button2", "flipcard_card", "flipcard_progress",
            "flipcard_progressbg",
            "flipcard_titlebg", "flipcard_txt", "flipcard_ani", "flipcard_box1", "flipcard_box2", "flipcard_box3", "flipcard_select", "flipcard_ani",
            "flipcard_select2_1", "flipcard_select2", "flipcard_select3_1", "flipcard_select3", "flipcard_addmask",
            "flipcard_card" + this.code + "_1",
            "flipcard_card" + this.code + "_2",
            "flipcard_card" + this.code + "_3",
            "flipcard_select1_1",
            "flipcard_select1",
            "acchristmasview_1_taskname",
            "flipcard_taskIcon_" + this.code, "acrechargeboxview_box1", "acrechargeboxview_box2", "acrechargeboxview_box3",
            "flipcard_talk_head_" + this.code,
            "acmidautumnview_infobtn", "ldcardparticle", "ldcardparticle_json", "flipcard_bg07",
        ]);
    };
    AcFlipCardView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH, this.refreshTaskRed, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FLIPCARD_REWARD_END, this.resetCards, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._progress = null;
        this._livenessIcon = null;
        this._curLivenessTxt = null;
        this._maxLivenessValue = 0;
        this._curRewardBoxId = "";
        this._cardList = [];
        this._boxList = [];
        this._selIdx = 1;
        this._priceTXT1 = null;
        this._priceTXT2 = null;
        this._isPlaying = false;
        this._taskBtn = null;
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinImg = null;
        _super.prototype.dispose.call(this);
    };
    return AcFlipCardView;
}(AcCommonView));
__reflect(AcFlipCardView.prototype, "AcFlipCardView");
var FlipCardItem = (function (_super) {
    __extends(FlipCardItem, _super);
    function FlipCardItem() {
        var _this = _super.call(this) || this;
        _this._boxImg = null;
        _this._boxIdx = 0;
        _this._ctype = 0;
        _this._cardCode = "";
        _this._selBoxImg = undefined;
        _this._rewardIcon = undefined;
        _this._rewardTxt = undefined;
        _this._rewardTxtbg = undefined;
        _this.init();
        return _this;
    }
    /**
     * 填内容
     */
    FlipCardItem.prototype.init = function () {
        this._boxImg = BaseBitmap.create("flipcard_card");
        this._boxImg.width = 114;
        this._boxImg.height = 151;
        this._boxImg.anchorOffsetX = this._boxImg.width / 2;
        this._boxImg.anchorOffsetY = this._boxImg.height / 2;
        this.addChild(this._boxImg);
        this._selBoxImg = BaseBitmap.create("flipcard_select");
        this._selBoxImg.width = 136;
        this._selBoxImg.height = 175;
        this._selBoxImg.anchorOffsetX = this._selBoxImg.width / 2;
        this._selBoxImg.anchorOffsetY = this._selBoxImg.height / 2;
        this.addChild(this._selBoxImg);
        this._rewardTxtbg = BaseBitmap.create("flipcard_bg07");
        this._rewardTxtbg.x = -this._rewardTxtbg.width / 2;
        this._rewardTxtbg.y = this._selBoxImg.height / 2 - this._rewardTxtbg.height - 13;
        this.addChild(this._rewardTxtbg);
        this._rewardTxt = ComponentManager.getTextField("0", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardTxtbg.visible = this._rewardTxt.visible = false;
        this._rewardTxt.y = this._rewardTxtbg.y + this._rewardTxtbg.height / 2 - this._rewardTxt.height / 2;
        this._rewardTxt.x = this._rewardTxtbg.x + this._rewardTxtbg.width / 2 - this._rewardTxt.width / 2;
        this.addChild(this._rewardTxt);
    };
    FlipCardItem.prototype.showFlipAni = function (rewards, isShowReward, showRewards, cfrewards, deltaT) {
        var _this = this;
        if (deltaT) {
            egret.Tween.get(this).wait(deltaT).call(function () {
                _this.cardMovie(rewards, isShowReward, showRewards, cfrewards);
            }, this);
        }
        else {
            this.cardMovie(rewards, isShowReward, showRewards, cfrewards);
        }
    };
    FlipCardItem.prototype.makeRwardIcon = function (rewards) {
        var icon = GameData.getRewardItemIcons(rewards, true)[0];
        icon.setScale(0.4);
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2 * icon.scaleX;
        icon.y = 18;
        icon.x = 30;
        this.addChild(icon);
        icon.visible = false;
        this._rewardIcon = icon;
    };
    FlipCardItem.prototype.setselectedStatus = function (isSel) {
        this._selBoxImg.visible = isSel;
    };
    FlipCardItem.prototype.resetData = function (idx, ctype, addvalue, rewards, cardCode) {
        this._cardCode = cardCode || "1";
        this._boxIdx = idx;
        this._ctype = ctype;
        this._rewardTxtbg.visible = this._rewardTxt.visible = false;
        this._rewardTxt.text = LanguageManager.getlocal("acFlipCard_txt6", ["" + addvalue]);
        this._rewardTxt.anchorOffsetX = this._rewardTxt.width / 2;
        if (rewards) {
            this.makeRwardIcon(rewards);
            this._rewardIcon.alpha = 1.0;
            this._rewardIcon.visible = this._rewardTxtbg.visible = this._rewardTxt.visible = true;
            this._boxImg.texture = ResourceManager.getRes("flipcard_card" + this._cardCode + "_" + this._ctype);
        }
        else {
            this._boxImg.texture = ResourceManager.getRes("flipcard_card");
            if (this._rewardIcon) {
                this.removeChild(this._rewardIcon);
                this._rewardIcon = null;
            }
        }
        var circleeffect2 = this.getChildByName("circleeffect2");
        if (circleeffect2) {
            egret.Tween.removeTweens(circleeffect2);
            this.removeChild(circleeffect2);
            circleeffect2 = null;
        }
        var circleeffect1 = this.getChildByName("circleeffect1");
        if (circleeffect1) {
            egret.Tween.removeTweens(circleeffect1);
            this.removeChild(circleeffect1);
            circleeffect1 = null;
        }
    };
    /**
 * 卡牌翻牌动画 card 1红 2绿  special 高级卡牌特效
*/
    FlipCardItem.prototype.cardMovie = function (rewards, isShowReward, showRewards, cfrewards) {
        var _this = this;
        var view = this;
        var btnGroup = this;
        this.makeRwardIcon(rewards);
        var special = false;
        if (this._ctype == 1 || this._ctype == 2) {
            special = true;
        }
        // 
        SoundManager.playEffect("effect_doubleseven3_clickbtn");
        // special = false;
        if (this._ctype == 1) {
            //光刺
            // card =
            var cardCircle_1 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            cardCircle_1.blendMode = egret.BlendMode.ADD;
            cardCircle_1.anchorOffsetX = cardCircle_1.width / 2;
            cardCircle_1.anchorOffsetY = cardCircle_1.height / 2;
            cardCircle_1.setScale(0.45);
            // cardCircle.x = 60;
            // cardCircle.y = 90;
            btnGroup.addChildAt(cardCircle_1, 0);
            egret.Tween.get(cardCircle_1).to({ scaleX: 0.93, scaleY: 0.93 }, 330).wait(1330).call(function () {
                egret.Tween.removeTweens(cardCircle_1);
                btnGroup.removeChild(cardCircle_1);
                cardCircle_1 = null;
            }, view);
            egret.Tween.get(cardCircle_1).to({ rotation: 90 }, 1660);
            var _loop_1 = function (i) {
                var cardlight = BaseBitmap.create("flipcard_select" + btnGroup._ctype);
                cardlight.blendMode = egret.BlendMode.ADD;
                cardlight.anchorOffsetX = cardlight.width / 2;
                cardlight.anchorOffsetY = cardlight.height / 2;
                cardlight.alpha = 0;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight, this);
                btnGroup.addChild(cardlight);
                cardlight.setScale(1.45);
                egret.Tween.get(cardlight).wait(i * 260).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400).to({ alpha: 0 }, 260).call(function () {
                    egret.Tween.removeTweens(cardlight);
                    btnGroup.removeChild(cardlight);
                    cardlight = null;
                }, view);
            };
            //聚集
            for (var i = 0; i < 4; ++i) {
                _loop_1(i);
            }
            var tmpX = btnGroup.x;
            var tmpY = btnGroup.y;
            egret.Tween.get(btnGroup).wait(200)
                .set({ x: tmpX - 0.1, y: tmpY + 1.3 }).wait(60)
                .set({ x: tmpX + 1.6, y: tmpY - 1.3 }).wait(60)
                .set({ x: tmpX - 2.9, y: tmpY - 0.6 }).wait(60)
                .set({ x: tmpX, y: tmpY - 0.8 }).wait(60)
                .set({ x: tmpX + 1.2, y: tmpY - 3.9 }).wait(60)
                .set({ x: tmpX - 3.1, y: tmpY - 1.1 }).wait(60)
                .set({ x: tmpX - 1.8, y: tmpY + 1 }).wait(60)
                .set({ x: tmpX + 0.7, y: tmpY - 1.5 }).wait(60)
                .set({ x: tmpX - 3.5, y: tmpY - 4.2 }).wait(60)
                .set({ x: tmpX - 3.3, y: tmpY - 1.3 }).wait(60)
                .set({ x: tmpX + 1.9, y: tmpY - 2.8 }).wait(60)
                .set({ x: tmpX - 3, y: tmpY + 0.8 }).wait(60)
                .set({ x: tmpX - 1.5, y: tmpY + 1 }).wait(60)
                .set({ x: tmpX + 1.2, y: tmpY - 0.3 }).wait(60)
                .set({ x: tmpX - 2.3, y: tmpY }).wait(60)
                .set({ x: tmpX, y: tmpY }).wait(60)
                .to({ scaleX: 0.05, scaleY: 2.5 }, 200).wait(100).
                call(function () {
                btnGroup.scaleX = -0.1;
                // btn.setRes(`luckydrawcard${2}-${1}`);
                var cardres = "flipcard_card" + _this._cardCode + "_" + _this._ctype;
                btnGroup._boxImg.texture = ResourceManager.getRes(cardres);
                btnGroup._rewardIcon.alpha = 1;
                btnGroup._rewardIcon.visible = btnGroup._rewardTxtbg.visible = btnGroup._rewardTxt.visible = true;
            }, view).
                to({ scaleX: 0.85, scaleY: 0.85 }, 130).
                to({ scaleX: 1.15, scaleY: 1.15 }, 70).
                to({ scaleX: 1, scaleY: 1 }, 260).wait(840)
                .call(function () {
                view.endMovie(rewards, isShowReward, showRewards, cfrewards);
            }, view);
            egret.Tween.get(btnGroup).wait(1160).wait(200).to({ alpha: 0 }, 10).to({ alpha: 1 }, 10);
            //卡牌高亮透明度动画
            var highlight_1 = BaseBitmap.create("flipcard_addmask");
            highlight_1.anchorOffsetX = highlight_1.width / 2;
            highlight_1.anchorOffsetY = highlight_1.height / 2;
            highlight_1.blendMode = egret.BlendMode.ADD;
            highlight_1.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, this);
            btnGroup.addChild(highlight_1);
            egret.Tween.get(highlight_1).wait(1160).wait(330).set({ alpha: 1 }).wait(130).to({ alpha: 0 }, 330).call(function () {
                egret.Tween.removeTweens(highlight_1);
                btnGroup.removeChild(highlight_1);
                highlight_1 = null;
            }, view);
            //卡牌光晕透明度动画
            var cardbg = BaseBitmap.create("flipcard_select" + btnGroup._ctype); //flipcard_addmask
            cardbg.anchorOffsetX = cardbg.width / 2;
            cardbg.anchorOffsetY = cardbg.height / 2;
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = "cardbg";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, this);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(1160).wait(330).set({ alpha: 1 });
            //爆点光刺
            var boomeffect_1 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            boomeffect_1.blendMode = egret.BlendMode.ADD;
            boomeffect_1.anchorOffsetX = boomeffect_1.width / 2;
            boomeffect_1.anchorOffsetY = boomeffect_1.height / 2;
            boomeffect_1.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeffect, this);
            btnGroup.addChild(boomeffect_1);
            boomeffect_1.setScale(1.6);
            egret.Tween.get(boomeffect_1).wait(1160).wait(330).set({ alpha: 1 }).to({ scaleX: 0, scaleY: 0 }, 130).call(function () {
                egret.Tween.removeTweens(boomeffect_1);
                btnGroup.removeChild(boomeffect_1);
                boomeffect_1 = null;
            }, view);
            //翻牌时扩散动画
            var cardlight1_1 = BaseBitmap.create("flipcard_select" + btnGroup._ctype);
            cardlight1_1.blendMode = egret.BlendMode.ADD;
            cardlight1_1.anchorOffsetX = cardlight1_1.width / 2;
            cardlight1_1.anchorOffsetY = cardlight1_1.height / 2;
            cardlight1_1.alpha = 0;
            cardlight1_1.name = "cardlight1";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight1, this);
            btnGroup.addChild(cardlight1_1);
            cardlight1_1.setScale(1.08);
            egret.Tween.get(cardlight1_1).wait(1160).wait(330).to({ scaleX: 1.8, scaleY: 1.8 }, 200);
            egret.Tween.get(cardlight1_1).wait(1160).wait(330).set({ alpha: 0.8 }).to({ alpha: 0 }, 250).call(function () {
                egret.Tween.removeTweens(cardlight1_1);
                btnGroup.removeChild(cardlight1_1);
                cardlight1_1 = null;
            }, view);
            var cardlight2_1 = BaseBitmap.create("flipcard_select" + btnGroup._ctype);
            cardlight2_1.blendMode = egret.BlendMode.ADD;
            cardlight2_1.anchorOffsetX = cardlight2_1.width / 2;
            cardlight2_1.anchorOffsetY = cardlight2_1.height / 2;
            cardlight2_1.alpha = 0;
            cardlight2_1.name = "cardlight2";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight2, this);
            btnGroup.addChild(cardlight2_1);
            cardlight2_1.setScale(0.85);
            egret.Tween.get(cardlight2_1).wait(1160).wait(330).to({ scaleX: 1.8, scaleY: 1.8 }, 330);
            egret.Tween.get(cardlight2_1).wait(1160).wait(330).set({ alpha: 1 }).to({ alpha: 0 }, 400).call(function () {
                egret.Tween.removeTweens(cardlight2_1);
                btnGroup.removeChild(cardlight2_1);
                cardlight2_1 = null;
            }, view);
            //卡牌后面旋转光刺
            var circleeffect_1 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            circleeffect_1.blendMode = egret.BlendMode.ADD;
            circleeffect_1.anchorOffsetX = circleeffect_1.width / 2;
            circleeffect_1.anchorOffsetY = circleeffect_1.height / 2;
            circleeffect_1.alpha = 0;
            circleeffect_1.name = "circleeffect1";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect, this);
            btnGroup.addChildAt(circleeffect_1, 0);
            circleeffect_1.setScale(1);
            egret.Tween.get(circleeffect_1).wait(1160).wait(330).set({ alpha: 1 }).to({ rotation: 360 }, 18000).call(function () {
                egret.Tween.removeTweens(circleeffect_1);
                btnGroup.removeChild(circleeffect_1);
                circleeffect_1 = null;
            }, view);
            var circleeffect2_1 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            circleeffect2_1.blendMode = egret.BlendMode.ADD;
            circleeffect2_1.anchorOffsetX = circleeffect2_1.width / 2;
            circleeffect2_1.anchorOffsetY = circleeffect2_1.height / 2;
            circleeffect2_1.alpha = 0;
            circleeffect2_1.name = "circleeffect2";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect2, this);
            btnGroup.addChildAt(circleeffect2_1, 0);
            circleeffect2_1.setScale(0.85);
            egret.Tween.get(circleeffect2_1).wait(1160).wait(330).set({ alpha: 1 }).to({ rotation: -360 }, 18000).call(function () {
                egret.Tween.removeTweens(circleeffect2_1);
                btnGroup.removeChild(circleeffect2_1);
                circleeffect2_1 = null;
            }, view);
            //扫光
            var scanEffect_1 = ComponentManager.getCustomMovieClip("flipcard_ani", 8, 60);
            scanEffect_1.width = 124;
            scanEffect_1.height = 163;
            scanEffect_1.anchorOffsetX = scanEffect_1.width / 2;
            scanEffect_1.anchorOffsetY = scanEffect_1.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scanEffect, this);
            scanEffect_1.alpha = 0;
            btnGroup.addChild(scanEffect_1);
            egret.Tween.get(scanEffect_1).wait(1160).wait(1000).set({ alpha: 1 }).call(function () {
                scanEffect_1.playWithTime(1);
            }, view).wait(550).call(function () {
                egret.Tween.removeTweens(scanEffect_1);
                btnGroup.removeChild(scanEffect_1);
                scanEffect_1 = null;
            }, this);
            //粒子效果
            var lizi_1 = App.ParticleUtil.getParticle("ldcardparticle");
            lizi_1.anchorOffsetX = lizi_1.width / 2;
            lizi_1.anchorOffsetY = lizi_1.height / 2;
            btnGroup.addChild(lizi_1);
            egret.Tween.get(lizi_1).wait(1160).wait(330).call(function () {
                lizi_1.start();
            }, view).wait(300).call(function () {
                egret.Tween.removeTweens(lizi_1);
                lizi_1.stop();
                btnGroup.removeChild(lizi_1);
                lizi_1 = null;
            }, view);
        }
        else if (this._ctype == 2) {
            //光刺
            // card =
            var cardCircle_2 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            cardCircle_2.blendMode = egret.BlendMode.ADD;
            cardCircle_2.anchorOffsetX = cardCircle_2.width / 2;
            cardCircle_2.anchorOffsetY = cardCircle_2.height / 2;
            cardCircle_2.setScale(0.45);
            // cardCircle.x = 60;
            // cardCircle.y = 90;
            btnGroup.addChildAt(cardCircle_2, 0);
            egret.Tween.get(cardCircle_2).to({ scaleX: 0.93, scaleY: 0.93 }, 330).wait(1330).call(function () {
                egret.Tween.removeTweens(cardCircle_2);
                btnGroup.removeChild(cardCircle_2);
                cardCircle_2 = null;
            }, view);
            egret.Tween.get(cardCircle_2).to({ rotation: 90 }, 1660);
            var _loop_2 = function (i) {
                var cardlight = BaseBitmap.create("flipcard_select" + btnGroup._ctype);
                cardlight.blendMode = egret.BlendMode.ADD;
                cardlight.anchorOffsetX = cardlight.width / 2;
                cardlight.anchorOffsetY = cardlight.height / 2;
                cardlight.alpha = 0;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight, this);
                btnGroup.addChild(cardlight);
                cardlight.setScale(1.45);
                egret.Tween.get(cardlight).wait(i * 260).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400).to({ alpha: 0 }, 260).call(function () {
                    egret.Tween.removeTweens(cardlight);
                    btnGroup.removeChild(cardlight);
                    cardlight = null;
                }, view);
            };
            //聚集
            for (var i = 0; i < 4; ++i) {
                _loop_2(i);
            }
            var tmpX = btnGroup.x;
            var tmpY = btnGroup.y;
            egret.Tween.get(btnGroup).wait(200)
                .set({ x: tmpX - 0.1, y: tmpY + 1.3 }).wait(60)
                .set({ x: tmpX + 1.6, y: tmpY - 1.3 }).wait(60)
                .set({ x: tmpX - 2.9, y: tmpY - 0.6 }).wait(60)
                .set({ x: tmpX, y: tmpY - 0.8 }).wait(60)
                .set({ x: tmpX, y: tmpY }).wait(60)
                .to({ scaleX: 0.05, scaleY: 2.5 }, 200).wait(100).
                call(function () {
                btnGroup.scaleX = -0.1;
                // btn.setRes(`luckydrawcard${2}-${1}`);
                var cardres = "flipcard_card" + _this._cardCode + "_" + _this._ctype;
                btnGroup._boxImg.texture = ResourceManager.getRes(cardres);
                btnGroup._rewardIcon.alpha = 1;
                btnGroup._rewardIcon.visible = btnGroup._rewardTxtbg.visible = btnGroup._rewardTxt.visible = true;
            }, view).
                to({ scaleX: 0.85, scaleY: 0.85 }, 130).
                to({ scaleX: 1.15, scaleY: 1.15 }, 70).
                to({ scaleX: 1, scaleY: 1 }, 260).wait(840)
                .call(function () {
                view.endMovie(rewards, isShowReward, showRewards, cfrewards);
            }, view);
            egret.Tween.get(btnGroup).wait(1160 - 420).wait(200).to({ alpha: 0 }, 10).to({ alpha: 1 }, 10);
            //卡牌高亮透明度动画
            var highlight_2 = BaseBitmap.create("flipcard_addmask");
            highlight_2.anchorOffsetX = highlight_2.width / 2;
            highlight_2.anchorOffsetY = highlight_2.height / 2;
            highlight_2.blendMode = egret.BlendMode.ADD;
            highlight_2.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, this);
            btnGroup.addChild(highlight_2);
            egret.Tween.get(highlight_2).wait(1160).wait(330).set({ alpha: 1 }).wait(130).to({ alpha: 0 }, 330).call(function () {
                egret.Tween.removeTweens(highlight_2);
                btnGroup.removeChild(highlight_2);
                highlight_2 = null;
            }, view);
            //卡牌光晕透明度动画
            var cardbg = BaseBitmap.create("flipcard_select" + btnGroup._ctype); //flipcard_addmask
            cardbg.anchorOffsetX = cardbg.width / 2;
            cardbg.anchorOffsetY = cardbg.height / 2;
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = "cardbg";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, this);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(1160).wait(330).set({ alpha: 1 });
            //爆点光刺
            var boomeffect_2 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            boomeffect_2.blendMode = egret.BlendMode.ADD;
            boomeffect_2.anchorOffsetX = boomeffect_2.width / 2;
            boomeffect_2.anchorOffsetY = boomeffect_2.height / 2;
            boomeffect_2.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeffect, this);
            btnGroup.addChild(boomeffect_2);
            boomeffect_2.setScale(1.6);
            egret.Tween.get(boomeffect_2).wait(1160).wait(330).set({ alpha: 1 }).to({ scaleX: 0, scaleY: 0 }, 130).call(function () {
                egret.Tween.removeTweens(boomeffect_2);
                btnGroup.removeChild(boomeffect_2);
                boomeffect_2 = null;
            }, view);
            //翻牌时扩散动画
            var cardlight1_2 = BaseBitmap.create("flipcard_select" + btnGroup._ctype);
            cardlight1_2.blendMode = egret.BlendMode.ADD;
            cardlight1_2.anchorOffsetX = cardlight1_2.width / 2;
            cardlight1_2.anchorOffsetY = cardlight1_2.height / 2;
            cardlight1_2.alpha = 0;
            cardlight1_2.name = "cardlight1";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight1, this);
            btnGroup.addChild(cardlight1_2);
            cardlight1_2.setScale(1.08);
            egret.Tween.get(cardlight1_2).wait(1160).wait(330).to({ scaleX: 1.8, scaleY: 1.8 }, 200);
            egret.Tween.get(cardlight1_2).wait(1160).wait(330).set({ alpha: 0.8 }).to({ alpha: 0 }, 250).call(function () {
                egret.Tween.removeTweens(cardlight1_2);
                btnGroup.removeChild(cardlight1_2);
                cardlight1_2 = null;
            }, view);
            var cardlight2_2 = BaseBitmap.create("flipcard_select" + btnGroup._ctype);
            cardlight2_2.blendMode = egret.BlendMode.ADD;
            cardlight2_2.anchorOffsetX = cardlight2_2.width / 2;
            cardlight2_2.anchorOffsetY = cardlight2_2.height / 2;
            cardlight2_2.alpha = 0;
            cardlight2_2.name = "cardlight2";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight2, this);
            btnGroup.addChild(cardlight2_2);
            cardlight2_2.setScale(0.85);
            egret.Tween.get(cardlight2_2).wait(1160).wait(330).to({ scaleX: 1.8, scaleY: 1.8 }, 330);
            egret.Tween.get(cardlight2_2).wait(1160).wait(330).set({ alpha: 1 }).to({ alpha: 0 }, 400).call(function () {
                egret.Tween.removeTweens(cardlight2_2);
                btnGroup.removeChild(cardlight2_2);
                cardlight2_2 = null;
            }, view);
            //卡牌后面旋转光刺
            var circleeffect_2 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            circleeffect_2.blendMode = egret.BlendMode.ADD;
            circleeffect_2.anchorOffsetX = circleeffect_2.width / 2;
            circleeffect_2.anchorOffsetY = circleeffect_2.height / 2;
            circleeffect_2.alpha = 0;
            circleeffect_2.name = "circleeffect1";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect, this);
            btnGroup.addChildAt(circleeffect_2, 0);
            circleeffect_2.setScale(1);
            egret.Tween.get(circleeffect_2).wait(1160).wait(330).set({ alpha: 1 }).to({ rotation: 360 }, 18000).call(function () {
                egret.Tween.removeTweens(circleeffect_2);
                btnGroup.removeChild(circleeffect_2);
                circleeffect_2 = null;
            }, view);
            var circleeffect2_2 = BaseBitmap.create("flipcard_select" + btnGroup._ctype + "_1");
            circleeffect2_2.blendMode = egret.BlendMode.ADD;
            circleeffect2_2.anchorOffsetX = circleeffect2_2.width / 2;
            circleeffect2_2.anchorOffsetY = circleeffect2_2.height / 2;
            circleeffect2_2.alpha = 0;
            circleeffect2_2.name = "circleeffect2";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect2, this);
            btnGroup.addChildAt(circleeffect2_2, 0);
            circleeffect2_2.setScale(0.85);
            egret.Tween.get(circleeffect2_2).wait(1160).wait(330).set({ alpha: 1 }).to({ rotation: -360 }, 18000).call(function () {
                egret.Tween.removeTweens(circleeffect2_2);
                btnGroup.removeChild(circleeffect2_2);
                circleeffect2_2 = null;
            }, view);
            //扫光
            var scanEffect_2 = ComponentManager.getCustomMovieClip("flipcard_ani", 8, 60);
            scanEffect_2.width = 124;
            scanEffect_2.height = 163;
            scanEffect_2.anchorOffsetX = scanEffect_2.width / 2;
            scanEffect_2.anchorOffsetY = scanEffect_2.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scanEffect, this);
            scanEffect_2.alpha = 0;
            btnGroup.addChild(scanEffect_2);
            egret.Tween.get(scanEffect_2).wait(1160).wait(1000).set({ alpha: 1 }).call(function () {
                scanEffect_2.playWithTime(1);
            }, view).wait(550).call(function () {
                egret.Tween.removeTweens(scanEffect_2);
                btnGroup.removeChild(scanEffect_2);
                scanEffect_2 = null;
            }, this);
            //粒子效果
            var lizi_2 = App.ParticleUtil.getParticle("ldcardparticle");
            lizi_2.anchorOffsetX = lizi_2.width / 2;
            lizi_2.anchorOffsetY = lizi_2.height / 2;
            btnGroup.addChild(lizi_2);
            egret.Tween.get(lizi_2).wait(1160).wait(330).call(function () {
                lizi_2.start();
            }, view).wait(300).call(function () {
                egret.Tween.removeTweens(lizi_2);
                lizi_2.stop();
                btnGroup.removeChild(lizi_2);
                lizi_2 = null;
            }, view);
        }
        else {
            //卡牌背面动画
            egret.Tween.get(btnGroup).
                to({ scaleX: 0.05, scaleY: 1.5 }, 130).wait(100).
                call(function () {
                btnGroup.scaleX = -0.1;
                btnGroup._rewardIcon.alpha = 1;
                btnGroup._rewardIcon.visible = btnGroup._rewardTxtbg.visible = btnGroup._rewardTxt.visible = true;
                // btn.setRes(`luckydrawcard${1}-${1}`);
                var cardres = "flipcard_card" + _this._cardCode + "_" + _this._ctype;
                btnGroup._boxImg.texture = ResourceManager.getRes(cardres);
            }, view).
                to({ scaleX: 0.9, scaleY: 0.9 }, 130).
                to({ scaleX: 1.03, scaleY: 1.03 }, 70).wait(0).
                call(function () {
                view.endMovie(rewards, isShowReward, showRewards, cfrewards);
            }, view).
                to({ scaleX: 1, scaleY: 1 }, 260);
            egret.Tween.get(btnGroup).wait(130).to({ alpha: 0 }, 10).to({ alpha: 1 }, 10);
            //卡牌高亮透明度动画
            var highlight_3 = BaseBitmap.create("flipcard_addmask");
            highlight_3.blendMode = egret.BlendMode.ADD;
            highlight_3.alpha = 0;
            highlight_3.anchorOffsetX = highlight_3.width / 2;
            highlight_3.anchorOffsetY = highlight_3.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, this._boxImg);
            btnGroup.addChild(highlight_3);
            egret.Tween.get(highlight_3).wait(260).set({ alpha: 1 }).to({ alpha: 0 }, 330).call(function () {
                egret.Tween.removeTweens(highlight_3);
                btnGroup.removeChild(highlight_3);
                highlight_3 = null;
            }, view);
            //卡牌光晕透明度动画
            var cardbg_1 = BaseBitmap.create('flipcard_select' + btnGroup._ctype);
            cardbg_1.blendMode = egret.BlendMode.ADD;
            cardbg_1.alpha = 0;
            cardbg_1.name = "cardbg";
            cardbg_1.anchorOffsetX = cardbg_1.width / 2;
            cardbg_1.anchorOffsetY = cardbg_1.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, this._boxImg);
            btnGroup.addChild(cardbg_1);
            egret.Tween.get(cardbg_1).wait(260).set({ alpha: 1 }).wait(330).to({ alpha: 0 }, 330).
                call(function () {
                egret.Tween.removeTweens(cardbg_1);
                //最后一张卡不同颜色 播放完释放
                // if(btnIdx == endIdx){
                btnGroup.removeChild(cardbg_1);
                cardbg_1 = null;
                // }
            }, view);
        }
        btnGroup.setChildIndex(this._rewardIcon, 9999);
        btnGroup.setChildIndex(this._rewardTxt, 9999);
    };
    FlipCardItem.prototype.endMovie = function (reward, isShowReward, showRewards, cfrewards) {
        var view = this;
        var midbtnGroup = this;
        egret.Tween.get(midbtnGroup).to({ scaleX: 1.04, scaleY: 1.04 }, 330).to({ scaleX: 1, scaleY: 1 }, 330).call(function () {
            egret.Tween.removeTweens(midbtnGroup);
            //移出光晕
            var cardbg = midbtnGroup.getChildByName("cardbg");
            if (cardbg) {
                egret.Tween.removeTweens(cardbg);
                egret.Tween.get(cardbg).to({ alpha: 1 }, 300).call(function () {
                    midbtnGroup.removeChild(cardbg);
                    cardbg = null;
                }, midbtnGroup);
            }
            var circleeffect2 = midbtnGroup.getChildByName("circleeffect2");
            if (circleeffect2) {
                egret.Tween.removeTweens(circleeffect2);
                egret.Tween.get(circleeffect2).to({ alpha: 0 }, 500).call(function () {
                    midbtnGroup.removeChild(circleeffect2);
                    circleeffect2 = null;
                }, midbtnGroup);
            }
            var circleeffect1 = midbtnGroup.getChildByName("circleeffect1");
            if (circleeffect1) {
                egret.Tween.removeTweens(circleeffect1);
                egret.Tween.get(circleeffect1).to({ alpha: 0 }, 500).call(function () {
                    midbtnGroup.removeChild(circleeffect1);
                    circleeffect1 = null;
                }, midbtnGroup);
            }
            if (isShowReward) {
                // Api.wifeVoApi.checkWifeChangeRewards(cfrewards,showRewards);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": showRewards ? showRewards : reward,
                    "otherRewards": null,
                    "isPlayAni": true,
                    showTip: null,
                    callback: function () {
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FLIPCARD_REWARD_END);
                    },
                    target: midbtnGroup,
                });
            }
        }, view);
    };
    FlipCardItem.prototype.dispose = function () {
        this._boxImg = null;
        this._boxIdx = 0;
        this._selBoxImg = null;
        this._ctype = 0;
        this._rewardIcon = null;
        this._rewardTxt = null;
        this._rewardTxtbg = null;
        _super.prototype.dispose.call(this);
    };
    return FlipCardItem;
}(BaseDisplayObjectContainer));
__reflect(FlipCardItem.prototype, "FlipCardItem");
