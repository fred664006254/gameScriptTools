/**
 * author yanyuling
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
var AcMoonlightView = (function (_super) {
    __extends(AcMoonlightView, _super);
    function AcMoonlightView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._bottomBg = null;
        _this._progress = null;
        _this._boxList = [];
        _this._isPlaying = false;
        _this._rewards = null;
        _this._acvo = undefined;
        _this._bg = null;
        _this._showNumText = null;
        _this._fire = null;
        // private _isSingle:boolean = true;
        _this._anim = null;
        _this._taskBtn = null;
        return _this;
    }
    Object.defineProperty(AcMoonlightView.prototype, "vo", {
        // private aid:string;
        // private code:string;
        get: function () {
            if (!this._acvo) {
                this._acvo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            }
            return this._acvo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMoonlightView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMoonlightView.prototype.getRuleParam = function () {
        return [String(this.cfg.cost), String(this.cfg.cost * 10)];
    };
    AcMoonlightView.prototype.getRequestData = function () {
        if (this.vo.isFirst()) {
            return { requestType: NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, requestData: {
                    activeId: this.vo.aidAndCode,
                    flagkey: "moonlight",
                    value: 1
                } };
        }
        else {
            return null;
        }
    };
    AcMoonlightView.prototype.receiveData = function (data) {
    };
    AcMoonlightView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO, this.refreshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD, this.eventCollectHandlerCallBack, this);
        var titleFont = BaseBitmap.create(this.getDefaultRes("acmoonlight_title"));
        titleFont.x = GameConfig.stageWidth / 2 - titleFont.width / 2;
        titleFont.y = 10;
        this.addChild(titleFont);
        var topbg = BaseBitmap.create(this.getDefaultRes("acmoonlight_topbg"));
        topbg.x = 0;
        topbg.y = 72;
        this.addChild(topbg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 18, 0x42df1b);
        this._activityTimerText.x = 15;
        this._activityTimerText.y = topbg.y + 3;
        this._activityTimerText.text = this.vo.getAcLocalTime(true);
        this.addChild(this._activityTimerText);
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        var deltaT = this.vo.et - GameData.serverTime;
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acMoonlight_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acMoonlight_acCD", [LanguageManager.getlocal("acMoonlight_acCDEnd")]);
        }
        // acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
        acCDTxt.x = GameConfig.stageWidth - 15 - acCDTxt.width;
        acCDTxt.y = this._activityTimerText.y;
        this.addChild(acCDTxt);
        var ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleText.width = GameConfig.stageWidth - 30;
        ruleText.multiline = true;
        ruleText.lineSpacing = 1;
        ruleText.x = 15;
        ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 1;
        ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_description"), ["" + this.cfg.cost]);
        this.addChild(ruleText);
        var drawNum = this.cfg.drawNum;
        var maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length - 1]["needNum"];
        var shownum = this.vo.ainfo.score > maxDrawNum ? maxDrawNum : this.vo.ainfo.score;
        this._showNumText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonlight_moonvalue"), [String(shownum)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._showNumText.x = 15;
        this._showNumText.y = topbg.y + topbg.height - 13 - this._showNumText.height; //ruleText.y + ruleText.height + 1;
        this.addChild(this._showNumText);
        this._anim = ComponentManager.getCustomMovieClip("acmoonlight_effect-1", 5, 70);
        this._anim.x = 330;
        this._anim.y = GameConfig.stageHeigth - 575; //GameConfig.stageHeigth/2;
        this._anim.texture = ResourceManager.getRes(this.getDefaultRes("acmoonlight_baseeffect"));
        this.addChild(this._anim);
        // this._anim.blendMode = egret.BlendMode.ADD;
        this._anim.setEndCallBack(function () {
            _this.recallAniBack();
        }, this);
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full_" + this.cfg.wifeId + "_ske")) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full_" + this.cfg.wifeId);
            droWifeIcon.setScale(1);
            droWifeIcon.x = 120;
            droWifeIcon.y = GameConfig.stageHeigth - 30;
            this.addChild(droWifeIcon);
        }
        else {
            // wife 的 图片
            var scaleNum = 0.8;
            var wifeBM = BaseLoadBitmap.create("wife_full_" + this.cfg.wifeId);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = -100;
            wifeBM.y = GameConfig.stageHeigth - 840 * 0.8;
            this.addChild(wifeBM);
        }
        var bottomBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_bottom"));
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this.addChild(bottomBg);
        this._bottomBg = bottomBg;
        //抽奖一次
        var oneBtn = ComponentManager.getButton(this.getDefaultRes("acmoonlight_onebtn"), null, this.oneSendBtnHandler, this);
        oneBtn.x = GameConfig.stageWidth / 4 - oneBtn.width / 2;
        oneBtn.y = bottomBg.y + bottomBg.height - oneBtn.height;
        this.addChild(oneBtn);
        var oneBtnText = BaseBitmap.create(this.getDefaultRes("acmoonlight_onebtntext"));
        oneBtnText.x = oneBtn.x + oneBtn.width / 2 - oneBtnText.width / 2;
        oneBtnText.y = oneBtn.y + oneBtn.height - 30 - oneBtnText.height;
        this.addChild(oneBtnText);
        var oneBtnGemBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_btndetailbg"));
        oneBtnGemBg.x = oneBtnText.x + oneBtnText.width / 2 - oneBtnGemBg.width / 2;
        oneBtnGemBg.y = oneBtnText.y + oneBtnText.height;
        this.addChild(oneBtnGemBg);
        var oneBtnGem = BaseBitmap.create("itemicon1");
        oneBtnGem.scaleX = 0.4;
        oneBtnGem.scaleY = 0.4;
        var oneBtnGemText = ComponentManager.getTextField(String(this.cfg.cost), 20, TextFieldConst.COLOR_CROSS_YELLOW);
        oneBtnGem.x = oneBtnGemBg.x + oneBtnGemBg.width / 2 - (oneBtnGem.width * oneBtnGem.scaleX + oneBtnGemText.width + 10) / 2;
        oneBtnGem.y = oneBtnGemBg.y + oneBtnGemBg.height / 2 - oneBtnGem.height * oneBtnGem.scaleY / 2;
        this.addChild(oneBtnGem);
        oneBtnGemText.x = oneBtnGem.x + oneBtnGem.width * oneBtnGem.scaleX + 10;
        oneBtnGemText.y = oneBtnGemBg.y + oneBtnGemBg.height / 2 - oneBtnGemText.height / 2;
        this.addChild(oneBtnGemText);
        var tenbg = BaseBitmap.create(this.getDefaultRes("acmoonlight_btnbg"));
        tenbg.x = 3 * GameConfig.stageWidth / 4 - tenbg.width - 30;
        tenbg.y = bottomBg.y + bottomBg.height - tenbg.height - 60;
        this.addChild(tenbg);
        //抽奖十次
        var tenBtn = ComponentManager.getButton(this.getDefaultRes("acmoonlight_tenbtn"), null, this.tenSendBtnHandler, this);
        tenBtn.x = 3 * GameConfig.stageWidth / 4 - tenBtn.width / 2;
        tenBtn.y = bottomBg.y + bottomBg.height - tenBtn.height;
        this.addChild(tenBtn);
        var tenBtnText = BaseBitmap.create(this.getDefaultRes("acmoonlight_tenbtntext"));
        tenBtnText.x = tenBtn.x + tenBtn.width / 2 - tenBtnText.width / 2;
        tenBtnText.y = tenBtn.y + tenBtn.height - 30 - tenBtnText.height;
        this.addChild(tenBtnText);
        var tenBtnGemBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_btndetailbg"));
        tenBtnGemBg.x = tenBtnText.x + tenBtnText.width / 2 - tenBtnGemBg.width / 2;
        tenBtnGemBg.y = tenBtnText.y + tenBtnText.height;
        this.addChild(tenBtnGemBg);
        var tenBtnGem = BaseBitmap.create("itemicon1");
        tenBtnGem.scaleX = 0.4;
        tenBtnGem.scaleY = 0.4;
        var tenBtnGemText = ComponentManager.getTextField(String(this.cfg.cost * 10), 20, TextFieldConst.COLOR_CROSS_YELLOW);
        tenBtnGem.x = tenBtnGemBg.x + tenBtnGemBg.width / 2 - (tenBtnGem.width * tenBtnGem.scaleX + tenBtnGemText.width + 10) / 2;
        tenBtnGem.y = tenBtnGemBg.y + tenBtnGemBg.height / 2 - tenBtnGem.height * tenBtnGem.scaleY / 2;
        this.addChild(tenBtnGem);
        tenBtnGemText.x = tenBtnGem.x + tenBtnGem.width * tenBtnGem.scaleX + 10;
        tenBtnGemText.y = tenBtnGemBg.y + tenBtnGemBg.height / 2 - tenBtnGemText.height / 2;
        this.addChild(tenBtnGemText);
        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type4_yellow", "progress_type4_bg", 530);
        this._progress.x = GameConfig.stageWidth / 2 - this._progress.width / 2;
        this._progress.y = topbg.y + topbg.height + 26;
        this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);
        // 查看按钮
        var lookBtnBg = BaseBitmap.create("mainui_bottombtnbg");
        lookBtnBg.x = GameConfig.stageWidth - 15 - lookBtnBg.width;
        lookBtnBg.y = this._progress.y + 60;
        this.addChild(lookBtnBg);
        var lookBtn = ComponentManager.getButton(this.getDefaultRes("acmoonlight_lookbtn"), "", this.lookBtnHandler, this);
        lookBtn.x = lookBtnBg.x + lookBtnBg.width / 2 - lookBtn.width / 2;
        lookBtn.y = lookBtnBg.y + lookBtnBg.height / 2 - lookBtn.height / 2;
        this.addChild(lookBtn);
        var lookTxt = BaseBitmap.create("acmoonlight_searchtext");
        lookTxt.x = lookBtn.x + lookBtn.width / 2 - lookTxt.width / 2;
        lookTxt.y = lookBtnBg.y + lookBtnBg.height - lookTxt.height;
        this.addChild(lookTxt);
        // 活动任务按钮
        var taskBtnBg = BaseBitmap.create("mainui_bottombtnbg");
        taskBtnBg.x = lookBtnBg.x - 5 - taskBtnBg.width;
        taskBtnBg.y = lookBtnBg.y; //lookBtnBg.y + lookBtnBg.height+ 5;
        this.addChild(taskBtnBg);
        var taskBtn = ComponentManager.getButton(this.getDefaultRes("acmoonlight_taskicon"), "", this.taskBtnHandler, this);
        taskBtn.x = taskBtnBg.x + taskBtnBg.width / 2 - taskBtn.width / 2;
        taskBtn.y = taskBtnBg.y + taskBtnBg.height / 2 - taskBtn.height / 2;
        this.addChild(taskBtn);
        this._taskBtn = taskBtn;
        var taskTxt = BaseBitmap.create("acspringouting_taskname-1");
        taskTxt.x = taskBtn.x + taskBtn.width / 2 - taskTxt.width / 2;
        taskTxt.y = taskBtnBg.y + taskBtnBg.height - taskTxt.height;
        this.addChild(taskTxt);
        var fire = BaseBitmap.create(this.getDefaultRes("acmoonlight_progbg"));
        fire.x = this._progress.x - fire.width / 2;
        fire.y = this._progress.y + this._progress.height / 2 - fire.height / 2;
        this.addChild(fire);
        var fireText = BaseBitmap.create(this.getDefaultRes("acmoonlight_progname"));
        fireText.x = fire.x + fire.width / 2 - fireText.width / 2;
        fireText.y = fire.y + 20;
        this.addChild(fireText);
        for (var index = 0; index < drawNum.length; index++) {
            var tmprcfg = drawNum[index];
            // let perY = startY - (index+1) * perHeight;
            // 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
            var rStatus = this.vo.getBoxStatusById(index);
            var imgres = this.getDefaultRes("acmoonlight_box" + rStatus);
            var boxImg = BaseBitmap.create(imgres);
            boxImg.anchorOffsetX = boxImg.width / 2;
            boxImg.anchorOffsetY = boxImg.height / 2;
            boxImg.name = "boxImg" + index;
            boxImg.x = this._progress.x + this.cfg.drawNum[String(index)]["needNum"] / maxDrawNum * this._progress.width;
            boxImg.y = this._progress.y + this._progress.height / 2;
            var lightImg = BaseBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 40;
            lightImg.anchorOffsetY = 40;
            lightImg.name = "lightImg" + index;
            lightImg.x = boxImg.x;
            lightImg.y = boxImg.y;
            lightImg.visible = false;
            this.addChild(lightImg);
            this.addChild(boxImg);
            boxImg.addTouchTap(this.getBoxReward, this, [index]);
            var numTxtBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_prognumbg"));
            numTxtBg.x = boxImg.x - numTxtBg.width / 2;
            numTxtBg.y = boxImg.y + boxImg.height / 2 + 5;
            this.addChild(numTxtBg);
            var need = this.cfg.drawNum[index]["needNum"];
            var numTxt = ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            numTxt.x = numTxtBg.x + numTxtBg.width / 2 - numTxt.width / 2;
            numTxt.y = numTxtBg.y + numTxtBg.height / 2 - numTxt.height / 2;
            this.addChild(numTxt);
        }
        this.refreshData();
        // this.showFirstDialog();
        // TimerManager.doTimer(10000,0,this.showTalk,this);
    };
    AcMoonlightView.prototype.eventCollectHandlerCallBack = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                var data = event.data.data.data;
                var rewards = data.rewards;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                Api.servantVoApi.checkServantChangeRewards(data.cfrewards, data.rewards);
            }
        }
    };
    AcMoonlightView.prototype.refreshData = function () {
        var maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length - 1]["needNum"];
        var shownum = this.vo.ainfo.score > maxDrawNum ? maxDrawNum : this.vo.ainfo.score;
        this._showNumText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_moonvalue"), [String(shownum)]);
        var scene = this.cfg.drawNum;
        var num = this.vo.ainfo.score;
        if (this._taskBtn) {
            if (this.vo.isHaveTaskRedDot()) {
                App.CommonUtil.addIconToBDOC(this._taskBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._taskBtn);
            }
        }
        this._progress.setPercentage(this.getProgressPercent());
        var fireNum = this.cfg.drawNum;
        for (var index = 0; index < fireNum.length; index++) {
            var rStatus = this.vo.getBoxStatusById(index);
            var imgres = this.getDefaultRes("acmoonlight_box" + rStatus);
            var boxImg = this.getChildByName("boxImg" + index);
            var lightImg = this.getChildByName("lightImg" + index);
            if (boxImg instanceof (BaseBitmap)) {
                boxImg.texture = ResourceManager.getRes(imgres);
                boxImg.anchorOffsetX = boxImg.width / 2;
                boxImg.anchorOffsetY = boxImg.height / 2;
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
    };
    AcMoonlightView.prototype.getProgressPercent = function () {
        var drawNum = this.cfg.drawNum;
        var maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length - 1]["needNum"];
        if (this.vo.ainfo.score > maxDrawNum) {
            return 1;
        }
        else {
            return this.vo.ainfo.score / maxDrawNum;
        }
    };
    AcMoonlightView.prototype.lookBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
    };
    AcMoonlightView.prototype.taskBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTTASKPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcMoonlightView.prototype.oneSendBtnHandler = function () {
        if (this._isPlaying) {
            return;
        }
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() >= this.cfg.cost) {
            // this._isSingle = true;
            this.confirmOneCallbackHandler();
        }
        else {
            var message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_gemNotEnough"), ["" + this.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
        }
    };
    AcMoonlightView.prototype.tenSendBtnHandler = function () {
        if (this._isPlaying) {
            return;
        }
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() >= this.cfg.cost * 10) {
            // this._isSingle = false;
            var message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_btnCostGem"), ["" + this.cfg.cost * 10]);
            //显示弹出框
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                useNum: this.cfg.cost * 10,
                confirmCallback: this.confirmTenCallbackHandler,
                handler: this,
                num: Api.playerVoApi.getPlayerGem(),
                msg: message,
                id: 1 //消耗物品id  1->元宝
            });
        }
        else {
            var message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_gemNotEnoughTen"), ["" + this.cfg.cost * 10]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
        }
        // if(this.vo.lotterynum <= 0){		
        // 	let message = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_sendTip1"),[""+this.vo.cfg.cost]);
        // 	ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        // 		title:"itemUseConstPopupViewTitle",
        // 		msg:message,
        // 		callback:()=>{
        // 			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        // 		},
        // 		handler:this,
        // 		needCancel:true
        // 	});
        // 	return;
        // }
        // this._isPlaying = true;
        // if(this.vo.lotterynum>=10){
        // 	this._isSingle = false;
        // } else {
        // 	this._isSingle = true;
        // }
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,this.sendReward,this);
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,{activeId:this.vo.aidAndCode,});
    };
    AcMoonlightView.prototype.confirmOneCallbackHandler = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD, this.sendReward, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD, { activeId: this.vo.aidAndCode, gid: 1 });
    };
    AcMoonlightView.prototype.confirmTenCallbackHandler = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD, this.sendReward, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD, { activeId: this.vo.aidAndCode, gid: 10 });
    };
    AcMoonlightView.prototype.initBg = function () {
        this._bg = BaseLoadBitmap.create(this.getDefaultRes("acmoonlight_bg"));
        this._bg.width = 640;
        this._bg.height = 1136;
        this._bg.x = 0;
        this._bg.y = GameConfig.stageHeigth - 1136; //GameConfig.stageHeigth / 2 - this._bg.height/2;
        this.addChild(this._bg);
    };
    AcMoonlightView.prototype.sendReward = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD, this.sendReward, this);
        if (event.data.data.ret < 5) {
            var rewards = event.data.data.data.rewards;
            this._rewards = rewards;
            SoundManager.playEffect(SoundConst.EFFECT_MOONLIGHT_ANIM);
            this._anim.playWithTime(1);
            // if(this._isSingle){
            // 	this._anim.playWithTime(1);
            // 	// this.recallAniBack();
            // } else {
            // 	this.recallAniBack();
            // }
        }
    };
    AcMoonlightView.prototype.recallAniBack = function () {
        this._isPlaying = false;
        var check = null;
        SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            "rewards": this._rewards,
            "otherRewards": null,
            "isPlayAni": true,
            showTip: null,
            callback: check,
            target: this,
        });
        this._rewards = null;
    };
    AcMoonlightView.prototype.getBoxReward = function (event, boxId) {
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var score = this.vo.ainfo.score;
        var cfg = this.cfg;
        var drawNum = cfg.drawNum;
        var element = drawNum[boxId];
        //不可领取
        if (element.needNum > score) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTREWARDPOPUPVIEW, { aid: this.aid, code: this.code, boxid: boxId + 1 });
            // ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});
            return;
        }
        //已领取
        if (this.vo.ainfo.stageinfo[boxId + 1]) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTREWARDPOPUPVIEW, { aid: this.aid, code: this.code, boxid: boxId + 1, });
            // ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD, this.boxRewardNetResp, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD, { activeId: this.vo.aidAndCode, gid: boxId + 1 });
    };
    //获得宝箱奖励
    AcMoonlightView.prototype.boxRewardNetResp = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD, this.boxRewardNetResp, this);
        if (event.data.data.ret == 0) {
            // this.refreshData();
            var data = event.data.data.data;
            //  Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards);
            Api.wifeVoApi.checkWifeChangeRewards(data.cfrewards, data.rewards);
            //  SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
            //     ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            //         "rewards":data.rewards,
            //         "otherRewards":null,
            //         "isPlayAni":true, 
            //         showTip:null,
            //         callback:null,
            //         target:this
            //     });
        }
        else {
            App.CommonUtil.showTip(event.data.data.ret);
        }
    };
    AcMoonlightView.prototype.tick = function () {
        var deltaT = this.vo.et - GameData.serverTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [LanguageManager.getlocal("acWifeSkinInheritReward_acCDEnd")]);
        }
        this._acCDTxt.x = GameConfig.stageWidth - 15 - this._acCDTxt.width;
        return false;
    };
    AcMoonlightView.prototype.getSoundBgName = function () {
        return "music_moonlightbg-1";
    };
    AcMoonlightView.prototype.getTitleBgName = function () {
        return this.getDefaultRes("acmoonlight_titlebg");
    };
    AcMoonlightView.prototype.getTitleStr = function () {
        return null;
    };
    AcMoonlightView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            this.getDefaultRes("acmoonlight_bottom"),
            this.getDefaultRes("acmoonlight_box1"),
            this.getDefaultRes("acmoonlight_box2"),
            this.getDefaultRes("acmoonlight_box3"),
            this.getDefaultRes("acmoonlight_btnbg"),
            this.getDefaultRes("acmoonlight_btndetailbg"),
            this.getDefaultRes("acmoonlight_lookbtn"),
            this.getDefaultRes("acmoonlight_onebtn"),
            this.getDefaultRes("acmoonlight_onebtntext"),
            this.getDefaultRes("acmoonlight_progbg"),
            this.getDefaultRes("acmoonlight_progname"),
            this.getDefaultRes("acmoonlight_prognumbg"),
            this.getDefaultRes("acmoonlight_taskicon"),
            this.getDefaultRes("acmoonlight_tenbtn"),
            this.getDefaultRes("acmoonlight_tenbtntext"),
            this.getDefaultRes("acmoonlight_title"),
            this.getDefaultRes("acmoonlight_titlebg"),
            this.getDefaultRes("acmoonlight_topbg"),
            this.getDefaultRes("acmoonlight_red"),
            this.getDefaultRes("acmoonlight_baseeffect"),
            "collectflag",
            "acmoonlight_searchtext",
            "dailytask_box_light",
            "itemicon1",
            "acspringouting_taskname-1",
            "progress_type4_yellow",
            "progress_type4_bg",
        ]);
    };
    AcMoonlightView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD, this.eventCollectHandlerCallBack, this);
        var drawNum = this.cfg.drawNum;
        for (var index = 0; index < drawNum.length; index++) {
            var boxImg = this.getChildByName("boxImg" + index);
            var lightImg = this.getChildByName("lightImg" + index);
            if (boxImg) {
                egret.Tween.removeTweens(boxImg);
            }
            if (lightImg) {
                egret.Tween.removeTweens(lightImg);
            }
        }
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._bottomBg = null;
        this._progress = null;
        this._boxList = [];
        this._isPlaying = false;
        this._rewards = null;
        this._acvo = undefined;
        this._bg = null;
        this._showNumText = null;
        this._fire = null;
        // this._isSingle = true;
        this._anim = null;
        this._taskBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcMoonlightView;
}(AcCommonView));
__reflect(AcMoonlightView.prototype, "AcMoonlightView");
