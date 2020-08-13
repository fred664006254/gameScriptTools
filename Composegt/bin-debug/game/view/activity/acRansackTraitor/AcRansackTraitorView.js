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
 * 20190401
 * 奸臣皮肤兑换
 */
var AcRansackTraitorView = (function (_super) {
    __extends(AcRansackTraitorView, _super);
    function AcRansackTraitorView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText = null;
        _this._inOrderText2 = null;
        _this._searchtxt3 = null;
        _this._aniPlaying = false;
        return _this;
    }
    AcRansackTraitorView.prototype.decode = function () {
        switch (String(this.code)) {
            case "1":
                return "1";
            case "2":
                return "2";
            case "3":
                return "3";
            case "4":
                return "4";
            case "5":
                return "1";
            case "6":
                return "2";
            case "7":
                return "3";
            case "8":
                return "4";
        }
    };
    AcRansackTraitorView.prototype.getBgName = function () {
        return "ransackTraitor_bg1";
    };
    AcRansackTraitorView.prototype.initView = function () {
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RANSACTARTIOR_REFRESH, this.refreshUIInfos, this);
        this.showText();
        //下面属性背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 160;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt1.text = LanguageManager.getlocal("ransackTraitor_btntoptxt1");
        searchtxt1.y = bottomBg.y + 20;
        searchtxt1.visible = false;
        this.addChildToContainer(searchtxt1);
        var searchBtn1 = ComponentManager.getButton("ransackTraitor_btn", "ransackTraitor_btn1", this.searchHandler, this, [1]);
        searchBtn1.x = 50;
        searchBtn1.y = searchtxt1.y + 25;
        searchtxt1.x = searchBtn1.x + searchBtn1.width / 2 - searchtxt1.width / 2;
        searchBtn1.name = "searchBtn1";
        this.addChildToContainer(searchBtn1);
        var searchtxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt2.text = LanguageManager.getlocal("ransackTraitor_btntoptxt2");
        searchtxt2.x = 430;
        searchtxt2.y = searchtxt1.y;
        this.addChildToContainer(searchtxt2);
        var searchBtn2 = ComponentManager.getButton("ransackTraitor_btn", "ransackTraitor_btn2", this.searchHandler, this, [10]);
        searchBtn2.x = GameConfig.stageWidth - searchBtn2.width - searchBtn1.x;
        searchBtn2.y = searchBtn1.y;
        searchtxt2.x = searchBtn2.x + searchBtn2.width / 2 - searchtxt2.width / 2;
        this.addChildToContainer(searchBtn2);
        searchBtn2.name = "searchBtn2";
        var searchtxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._searchtxt3 = searchtxt3;
        this._searchtxt3.text = LanguageManager.getlocal("ransackTraitor_txt3", ["0"]);
        searchtxt3.y = searchBtn2.y + searchBtn2.height + 5;
        searchtxt3.x = GameConfig.stageWidth / 2 - searchtxt3.width / 2;
        this.addChildToContainer(searchtxt3);
        // 兑换
        var rewardLookBtn = ComponentManager.getButton("punish_reward_icon", "", this.rewardLookClick, this);
        rewardLookBtn.x = 5;
        rewardLookBtn.y = bottomBg.y - rewardLookBtn.height - 5;
        rewardLookBtn.name = "rewardLookBtn";
        this.addChildToContainer(rewardLookBtn);
        var rewardLookTxt = BaseBitmap.create("ransackTraitor_txt2");
        rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width / 2 - rewardLookTxt.width / 2;
        rewardLookTxt.y = rewardLookBtn.y + 50;
        this.addChildToContainer(rewardLookTxt);
        this._rewardLookBtn = rewardLookBtn;
        // 充值
        var rechargeBtn = ComponentManager.getButton("ac_luckbag-1_icon", "", this.rechargeClick, this);
        rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
        rechargeBtn.y = rewardLookBtn.y;
        this.addChildToContainer(rechargeBtn);
        var rechargeTxt = BaseBitmap.create("ransackTraitor_txt1");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + 50;
        this.addChildToContainer(rechargeTxt);
        this.refreshUIInfos();
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITORSTORYVIEW, { aid: this.aid, code: this.code });
    };
    AcRansackTraitorView.prototype.rechargeClick = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcRansackTraitorView.prototype.refreshUIInfos = function () {
        this._inOrderText.text = LanguageManager.getlocal("ransackTraitor_txt1", [this.acVo["attacknum"]]);
        this._inOrderText2.text = LanguageManager.getlocal("ransackTraitor_txt2", [this.acVo["chipnum"] + "/" + this.acVo.config.RansackItemNum]);
        this._searchtxt3.text = LanguageManager.getlocal("ransackTraitor_txt3", [this.acVo["attacknum"]]);
        var perc = this.acVo["chipnum"] / this.acVo.config.RansackItemNum;
        this._progress.setPercentage(perc);
        if (this.acVo["chipnum"] >= this.acVo.config.RansackItemNum) {
            App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn1"));
            App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn2"));
            this._searchtxt3.visible = this._inOrderText.visible = false;
            this._inOrderText2.x = this._inOrderText.x;
            // ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
        }
        var idfall = this.acVo.isExchangeEnable();
        if (idfall) {
            App.CommonUtil.addIconToBDOC(this._rewardLookBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardLookBtn);
        }
    };
    AcRansackTraitorView.prototype.rewardLookClick = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcRansackTraitorView.prototype.searchHandler = function (param) {
        if (this._aniPlaying) {
            return;
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo["chipnum"] >= this.acVo.config.RansackItemNum) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW, { "aid": this.aid, "code": this.code });
            // App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitor_nettip4'));
            return;
        }
        if (this.acVo["attacknum"] < param) {
            var rewardStr = LanguageManager.getlocal("acRansackTraitor_nettip6", [this.acVo["attacknum"]]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.rechargeClick,
                handler: this,
                needCancel: true
            });
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK, this.searchHandlerNetBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK, { activeId: this.acVo.aidAndCode, attack: param });
    };
    AcRansackTraitorView.prototype.searchHandlerNetBack = function (event) {
        var _this = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards_1 = rdata.rewards;
            var idFind_1 = false;
            var RansackItem = this.acVo.config.RansackItem;
            if (rewards_1.indexOf(RansackItem) > -1) {
                idFind_1 = true;
            }
            //序列帧
            var skinClip_1 = ComponentManager.getCustomMovieClip("ac_ransackTraitor_ani", 17, 100);
            var deltaS2 = 1.0;
            skinClip_1.width = 400 * deltaS2;
            skinClip_1.height = 400 * deltaS2;
            skinClip_1.anchorOffsetY = skinClip_1.height;
            skinClip_1.anchorOffsetX = skinClip_1.width / 2;
            // skinClip.blendMode = egret.BlendMode.ADD;
            skinClip_1.x = GameConfig.stageWidth / 2;
            skinClip_1.y = GameConfig.stageHeigth - 300;
            this.addChildToContainer(skinClip_1);
            var tmpthis_1 = this;
            tmpthis_1._aniPlaying = true;
            egret.Tween.get(skinClip_1, { loop: false }).call(function () {
                skinClip_1.playWithTime(1);
                //  SoundManager.playBg("music_ransackTraitor");
                SoundManager.playEffect("music_ransackTraitor");
            }, this).wait(1800).call(function () {
                tmpthis_1._aniPlaying = false;
                _this.container.removeChild(skinClip_1);
                skinClip_1 = null;
                var chipnum = _this.acVo["chipnum"];
                _this.refreshUIInfos();
                var findAll = false;
                if (chipnum == _this.acVo.config.RansackItemNum) {
                    findAll = true;
                }
                var popdata = { findAll: findAll, aid: _this.aid, code: _this.code, rewards: rewards_1, idFind: idFind_1 };
                ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITORPOPUPVIEW, popdata);
                if (idFind_1 && chipnum % 6 == 0 && chipnum > 0) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORGUIDSTORYVIEW, { aid: _this.aid, code: _this.code, idFind: idFind_1 });
                }
                if (!idFind_1) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORGUIDSTORYVIEW, { aid: _this.aid, code: _this.code, idFind: idFind_1 });
                }
                //最后一个
                if (findAll) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORGUIDSTORYVIEW, { aid: _this.aid, code: _this.code, idFind: idFind_1 });
                }
            }, this);
        }
    };
    AcRansackTraitorView.prototype.showText = function () {
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("ransackTraitor_bg6");
        forpeople_top.y = -15;
        this.addChildToContainer(forpeople_top);
        var skinid = this.acVo.config.getRewardSkinId();
        var sicon = Config.ServantskinCfg.getServantSkinItemById(skinid).body;
        var serIcon = BaseLoadBitmap.create(sicon);
        serIcon.width = 640;
        serIcon.height = 482;
        serIcon.setScale(0.5);
        var widthN = 282 - 8;
        var heightN = 335;
        var mask = new egret.Rectangle(172, 0, widthN, heightN);
        serIcon.mask = mask;
        serIcon.x = -80;
        serIcon.y = forpeople_top.y + 15;
        this.addChildToContainer(serIcon);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 160;
        this._activityTimerText.y = forpeople_top.y + 16;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true, "0x00ff00");
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 3;
        if (PlatformManager.checkIsViSp()) {
            deltaY = 5;
        }
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("ransackTraitor_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //谋士令
        this._inOrderText = ComponentManager.getTextField("", 19, 0xfedb39);
        this._inOrderText.text = LanguageManager.getlocal("ransackTraitor_txt1");
        this._inOrderText.x = this._activityTimerText.x;
        this._inOrderText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(this._inOrderText);
        this._inOrderText2 = ComponentManager.getTextField("", 19, 0xfedb39);
        this._inOrderText2.text = LanguageManager.getlocal("ransackTraitor_txt2");
        this._inOrderText2.x = forpeople_top.x + forpeople_top.width - 170;
        this._inOrderText2.y = this._inOrderText.y;
        this.addChildToContainer(this._inOrderText2);
        var cfg = this.acVo.config;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.multiline = true;
        this._ruleText.width = GameConfig.stageWidth - this._activityTimerText.x - 10;
        this._ruleText.lineSpacing = 2;
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.y = this._inOrderText.y + this._inOrderText.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("ransackTraitor_Rule" + this.decode(), [cfg.cost, cfg.RansackItemNum, cfg.RansackItemNum]);
        this.addChildToContainer(this._ruleText);
        // _progress
        this._progress = ComponentManager.getProgressBar("ransackTraitor_progress", "ransackTraitor_progressbg", 540);
        this._progress.x = GameConfig.stageWidth / 2 - this._progress.width / 2;
        this._progress.y = forpeople_top.y + forpeople_top.height + 40;
        this._progress.setTextSize(18);
        this.addChildToContainer(this._progress);
        var box = BaseLoadBitmap.create("ransackTraitor_box" + this.decode());
        box.width = 82;
        box.height = 78;
        box.y = this._progress.y + this._progress.height / 2 - box.height / 2;
        box.x = this._progress.x - box.width / 2;
        this.addChildToContainer(box);
        box.addTouchTap(this.rewardBoxHandler, this);
        var numbg = BaseBitmap.create("ransackTraitor_numbg2");
        numbg.y = box.y + box.height - numbg.height;
        numbg.x = numbg.x + box.width / 2 - numbg.width / 2;
        this.addChildToContainer(numbg);
        var txt2 = ComponentManager.getTextField("", 19);
        txt2.text = LanguageManager.getlocal("ransackTraitor_txt4");
        txt2.x = numbg.x + numbg.width / 2 - txt2.width / 2 + 5;
        txt2.y = numbg.y + numbg.height / 2 - txt2.height / 2 + 2;
        this.addChildToContainer(txt2);
        var sepNum = this.acVo.config.RansackItemNum / 4;
        for (var index = 1; index <= 4; index++) {
            var numbg_1 = BaseBitmap.create("ransackTraitor_numbg");
            numbg_1.y = this._progress.y + this._progress.height / 2 - numbg_1.height / 2;
            numbg_1.x = this._progress.x + this._progress.width * index / 4 - numbg_1.width / 2;
            this.addChildToContainer(numbg_1);
            var numTxt = ComponentManager.getTextField("", 20);
            numTxt.text = sepNum * index + "";
            numTxt.x = numbg_1.x + numbg_1.width / 2 - numTxt.width / 2;
            numTxt.y = numbg_1.y + numbg_1.height / 2 - numTxt.height / 2;
            this.addChildToContainer(numTxt);
        }
    };
    AcRansackTraitorView.prototype.rewardBoxHandler = function () {
    };
    AcRansackTraitorView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "ransackTraitor_acCD";
        if (this.decode() == "4") {
            cdStrK = "ransackTraitor_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        return false;
    };
    AcRansackTraitorView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ransackTraitor_numbg2",
            "arena_bottom", "punish_reward_icon", "ac_luckbag-1_icon",
            "ransackTraitor_btn", "ransackTraitor_2003", "ransackTraitor_txt4", "ransackTraitor_bg3", "ransackTraitor_2001", "ransackTraitor_2004", "ransackTraitor_2002",
            "ransackTraitor_txt1", "ransackTraitor_bg1", "ransackTraitor_txt2", "ransackTraitor_txt3",
            "ransackTraitor_bg2", "ransackTraitor_leftimg", "ransackTraitor_bg6", "ransackTraitor_bg4", "ransackTraitor_namebg2", "ransackTraitor_numbg",
            "ransackTraitor_progressbg", "ransackTraitor_progress", "ransackTraitor_bg5", "ransackTraitor_namebg", "ransackTraitor_flag",
            "ac_ransackTraitor_ani",
        ]);
    };
    // 
    // protected getSoundBgName():string
    // {
    // 	return "music_ransackTraitor";
    // }
    AcRansackTraitorView.prototype.getRuleInfo = function () {
        return "ransackTraitorRuleInfo" + this.code;
    };
    AcRansackTraitorView.prototype.getRuleParam = function () {
        var cfg = this.acVo.config;
        return [cfg.cost, cfg.RansackItemNum, cfg.RansackItemNum];
    };
    AcRansackTraitorView.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RANSACTARTIOR_REFRESH, this.refreshUIInfos, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._inOrderText = null;
        this._ruleText = null;
        this._inOrderText2 = null;
        this._progress = null;
        this._searchtxt3 = null;
        this._rewardLookBtn = null;
        this._aniPlaying = false;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorView;
}(AcCommonView));
__reflect(AcRansackTraitorView.prototype, "AcRansackTraitorView");
