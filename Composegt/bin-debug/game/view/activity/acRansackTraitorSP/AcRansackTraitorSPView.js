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
var AcRansackTraitorSPView = (function (_super) {
    __extends(AcRansackTraitorSPView, _super);
    function AcRansackTraitorSPView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText1 = null;
        _this._inOrderText2 = null;
        _this._inOrderText3 = null;
        _this._inOrderText4 = null;
        _this._searchtxt3 = null;
        _this._aniPlaying = false;
        _this._acvo = undefined;
        _this._rechargeBg = null;
        _this._rewardLookBg = null;
        _this._pos = [
            { x: 11, y: 620 },
            { x: 133, y: 569 },
            // {x:180, y:544},
            { x: 123, y: 620 },
            { x: 270, y: 539 },
            // {x:360, y:544},
            { x: 406, y: 620 },
            { x: 407, y: 569 },
            { x: 529, y: 620 },
        ];
        _this._namePos = [
            { x: 66, y: 628 },
            { x: 192, y: 592 },
            { x: 234, y: 648 },
            { x: 317, y: 530 },
            { x: 403, y: 648 },
            { x: 443, y: 592 },
            { x: 573, y: 628 },
        ];
        return _this;
    }
    AcRansackTraitorSPView.prototype.getBgName = function () {
        return "ransackTraitorSP_bg1";
    };
    AcRansackTraitorSPView.prototype.initBg = function () {
        var bgName = this.getBgName();
        this.viewBg = BaseBitmap.create(bgName);
        this.viewBg.y = GameConfig.stageHeigth - 1136;
        this.addChild(this.viewBg);
    };
    AcRansackTraitorSPView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RANSACTARTIORSP_REFRESH, this.refreshUIInfos, this);
        this._acvo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var titleFont = BaseBitmap.create(this.getDefaultRes("ransackTraitorSP_titletxt"));
        titleFont.x = GameConfig.stageWidth / 2 - titleFont.width / 2;
        titleFont.y = 0;
        this.addChild(titleFont);
        this.showText();
        //下面属性背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 160;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        var searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt1.text = LanguageManager.getlocal("ransackTraitorSP_btntoptxt1");
        searchtxt1.y = bottomBg.y + 20;
        searchtxt1.visible = false;
        this.addChildToContainer(searchtxt1);
        var searchBtn1 = ComponentManager.getButton("ransackTraitor_btn", "ransackTraitorSP_btn1", this.searchHandler, this, [1]);
        searchBtn1.x = 50;
        searchBtn1.y = searchtxt1.y + 25;
        searchtxt1.x = searchBtn1.x + searchBtn1.width / 2 - searchtxt1.width / 2;
        searchBtn1.name = "searchBtn1";
        this.addChildToContainer(searchBtn1);
        var searchtxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt2.text = LanguageManager.getlocal("ransackTraitorSP_btntoptxt2");
        searchtxt2.x = 430;
        searchtxt2.y = searchtxt1.y;
        this.addChildToContainer(searchtxt2);
        var searchBtn2 = ComponentManager.getButton("ransackTraitor_btn", "ransackTraitorSP_btn2", this.searchHandler, this, [10]);
        searchBtn2.x = GameConfig.stageWidth - searchBtn2.width - searchBtn1.x;
        searchBtn2.y = searchBtn1.y;
        searchtxt2.x = searchBtn2.x + searchBtn2.width / 2 - searchtxt2.width / 2;
        this.addChildToContainer(searchBtn2);
        searchBtn2.name = "searchBtn2";
        var searchtxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._searchtxt3 = searchtxt3;
        this._searchtxt3.text = LanguageManager.getlocal("ransackTraitorSP_txt3", ["0"]);
        searchtxt3.y = searchBtn2.y + searchBtn2.height + 5;
        searchtxt3.x = GameConfig.stageWidth / 2 - searchtxt3.width / 2;
        this.addChildToContainer(searchtxt3);
        var rewardLookBg = BaseBitmap.create("ransackTraitorSP_leftmask");
        rewardLookBg.x = this.viewBg.x + 0;
        rewardLookBg.y = this.viewBg.y + 758 + 16;
        rewardLookBg.scaleX = 4;
        rewardLookBg.scaleY = 4;
        this._rewardLookBg = rewardLookBg;
        this._rewardLookBg.alpha = 0;
        rewardLookBg.addTouch(this.rewardLookBgClick, this);
        this.addChildToContainer(rewardLookBg);
        // 兑换
        var rewardLookBtn = ComponentManager.getButton("ransackTraitorSP_btnbg", "", this.rewardLookClick, this);
        rewardLookBtn.x = this.viewBg.x + 76 - rewardLookBtn.width / 2;
        rewardLookBtn.y = this.viewBg.y + 847 - rewardLookBtn.height / 2 + 10;
        rewardLookBtn.name = "rewardLookBtn";
        this.addChildToContainer(rewardLookBtn);
        var rewardLookTxt = BaseBitmap.create("ransackTraitorSP_exchangetxt");
        rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width / 2 - rewardLookTxt.width / 2;
        rewardLookTxt.y = rewardLookBtn.y + rewardLookBtn.height / 2 - rewardLookTxt.height / 2 - 4;
        this.addChildToContainer(rewardLookTxt);
        this._rewardLookBtn = rewardLookBtn;
        var rechargeBg = BaseBitmap.create("ransackTraitorSP_rightmask");
        rechargeBg.x = this.viewBg.x + 489;
        rechargeBg.y = this.viewBg.y + 758 + 16;
        rechargeBg.scaleX = 4;
        rechargeBg.scaleY = 4;
        this._rechargeBg = rechargeBg;
        this._rechargeBg.alpha = 0;
        rechargeBg.addTouch(this.rechargeBgClick, this);
        this.addChildToContainer(rechargeBg);
        // 充值
        var rechargeBtn = ComponentManager.getButton("ransackTraitorSP_btnbg", "", this.rechargeClick, this);
        rechargeBtn.x = this.viewBg.x + 564 - rewardLookBtn.width / 2;
        rechargeBtn.y = this.viewBg.y + 847 - rewardLookBtn.height / 2 + 10;
        this.addChildToContainer(rechargeBtn);
        var rechargeTxt = BaseBitmap.create("ransackTraitorSP_rechargetxt");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + rechargeBtn.height / 2 - rechargeTxt.height / 2 - 4;
        this.addChildToContainer(rechargeTxt);
        for (var i = 0; i < this._namePos.length; i++) {
            var pos = this._namePos[i];
            var txt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_buildname" + (i + 1))), 16, 0xcdcdcd);
            txt.x = this.viewBg.x + pos.x - txt.width / 2;
            txt.y = this.viewBg.y + pos.y - txt.height / 2 - 3;
            var txtbg = BaseBitmap.create("ransackTraitorSP_buildnamebg");
            txtbg.width = txt.width + 30;
            txtbg.x = this.viewBg.x + pos.x - txtbg.width / 2;
            txtbg.y = this.viewBg.y + pos.y - txtbg.height / 2 - 3;
            this.addChildToContainer(txtbg);
            this.addChildToContainer(txt);
        }
        this.refreshUIInfos();
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPSTORYVIEW, { aid: this.aid, code: this.code });
    };
    AcRansackTraitorSPView.prototype.rechargeBgClick = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._rechargeBg.alpha = 0.5;
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            this._rechargeBg.alpha = 0;
            this.rechargeClick();
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            this._rechargeBg.alpha = 0;
            this.rechargeClick();
        }
    };
    AcRansackTraitorSPView.prototype.rewardLookBgClick = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._rewardLookBg.alpha = 0.5;
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            this._rewardLookBg.alpha = 0;
            this.rewardLookClick();
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            this._rewardLookBg.alpha = 0;
            this.rewardLookClick();
        }
    };
    AcRansackTraitorSPView.prototype.rechargeClick = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcRansackTraitorSPView.prototype.refreshUIInfos = function () {
        this._searchtxt3.text = LanguageManager.getlocal("ransackTraitorSP_txt3", [this.acVo["cannum"]]);
        var cfg = this.acVo.config;
        var exchangeShop = cfg.exchangeShop;
        var deltaY = 3;
        if (PlatformManager.checkIsViSp()) {
            deltaY = 5;
        }
        for (var i = 0; i < exchangeShop.length; i++) {
            var shopItem = exchangeShop[i];
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
            var isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
            var txt = null; //ransackTraitorSP_txt6
            if (isOwn) {
                txt = LanguageManager.getlocal("ransackTraitorSP_txt6", [LanguageManager.getlocal("servant_name" + skincfg.servantId)]);
            }
            else {
                txt = LanguageManager.getlocal("ransackTraitorSP_txt2", [LanguageManager.getlocal("servant_name" + skincfg.servantId), this._acvo.getItemNumByIndex(String(shopItem.itemID)), shopItem["proofNum"]]);
            }
            //罪证
            // this._inOrderText1 = ComponentManager.getTextField("", 19, 0xfedb39);
            // this["_inOrderText"+(i + 1)] = ComponentManager.getTextField("", 19, 0xfedb39);
            if (!this["_inOrderText" + (i + 1)]) {
                break;
            }
            this["_inOrderText" + (i + 1)].text = txt;
            if (i == 0) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 1) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 2) {
                this["_inOrderText" + (i + 1)].x = this._activityTimerText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            else if (i == 3) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            this.addChildToContainer(this._inOrderText1);
        }
        var idfall = this.acVo.isExchangeEnable();
        var searchAll = this._acvo.checkSearchAll();
        if (searchAll) {
            App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn1"));
            App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn2"));
            if (this._searchtxt3) {
                this._searchtxt3.visible = false;
            }
        }
        if (idfall) {
            App.CommonUtil.addIconToBDOC(this._rewardLookBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardLookBtn);
        }
    };
    AcRansackTraitorSPView.prototype.rewardLookClick = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcRansackTraitorSPView.prototype.searchHandler = function (param) {
        if (this._aniPlaying) {
            return;
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        // if(this.acVo["chipnum"] >= this.acVo.config.RansackItemNum)
        // {
        // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
        // 	// App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitor_nettip4'));
        //     return;
        // }
        if (this._acvo.checkSearchAll()) {
            // App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitorSP_nettip7'));
            ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW, { "aid": this.aid, "code": this.code });
            return;
        }
        if (this.acVo["cannum"] < param) {
            var rewardStr = LanguageManager.getlocal("acRansackTraitorSP_nettip6", [this.acVo["cannum"]]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.rechargeClick,
                handler: this,
                needCancel: true
            });
            return;
        }
        var isbatch = 0;
        if (param > 1) {
            isbatch = 1;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH, this.searchHandlerNetBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH, { activeId: this.acVo.aidAndCode, isbatch: isbatch });
    };
    AcRansackTraitorSPView.prototype.searchHandlerNetBack = function (event) {
        var _this = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards_1 = rdata.rewards;
            //序列帧
            var skinClip_1 = ComponentManager.getCustomMovieClip("ac_ransackTraitor_ani", 17, 100);
            var deltaS2 = 0.3;
            skinClip_1.width = 400 * deltaS2;
            skinClip_1.height = 400 * deltaS2;
            // skinClip.anchorOffsetY = skinClip.height ;
            // skinClip.anchorOffsetX = skinClip.width ;
            // skinClip.blendMode = egret.BlendMode.ADD;
            var posIndex = Math.floor(Math.random() * this._pos.length);
            skinClip_1.x = this.viewBg.x + this._pos[posIndex].x - 10; //GameConfig.stageWidth/2;
            skinClip_1.y = this.viewBg.y + this._pos[posIndex].y - 15; //GameConfig.stageHeigth - 300;
            this.addChild(skinClip_1);
            var tmpthis_1 = this;
            tmpthis_1._aniPlaying = true;
            egret.Tween.get(skinClip_1, { loop: false }).call(function () {
                skinClip_1.playWithTime(1);
                //  SoundManager.playBg("music_ransackTraitor");
                SoundManager.playEffect("music_ransackTraitor");
            }, this).wait(1800).call(function () {
                tmpthis_1._aniPlaying = false;
                _this.removeChild(skinClip_1);
                skinClip_1 = null;
                var isFind = false;
                var RansackItemID = _this.acVo.config.RansackItemID;
                var findItemIndex = -1;
                for (var i = 0; i < RansackItemID.length; i++) {
                    var id = RansackItemID[i];
                    var itemStr = "6_" + id + "_1";
                    if (rewards_1.indexOf(itemStr) > -1) {
                        findItemIndex = i;
                        // findItemIndex = i;
                        isFind = true;
                    }
                }
                var popdata = { aid: _this.aid, code: _this.code, rewards: rewards_1, isFind: isFind, findItemIndex: findItemIndex };
                ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPPOPUPVIEW, popdata);
                if (findItemIndex > -1) {
                    var itemId = RansackItemID[findItemIndex];
                    var zzNum = _this._acvo.getItemNumByIndex(String(itemId));
                    if (zzNum == _this._acvo.config.RansackItemNum || zzNum % 3 == 0) {
                        ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW, { aid: _this.aid, code: _this.code, zzNum: zzNum, findItemIndex: findItemIndex });
                    }
                }
                // let itemId = RansackItemID[findItemIndex];
                // // let chipnum = this.acVo["chipnum"];
                // this.refreshUIInfos();
                // // let findAll = false;
                // // if(chipnum == this.acVo.config.RansackItemNum ){
                // // 	findAll = true;
                // // }
                // if(isFind==true && findItemIndex >=0){
                // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,isFind:isFind,findItemIndex:findItemIndex});
                // }
                // if(idFind && chipnum%6 == 0 && chipnum > 0){
                // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind,findItem:findItem});
                // }
                // if(!idFind){
                // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
                // }
                // //最后一个
                // if(findAll){
                // 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
                // }
            }, this);
        }
    };
    AcRansackTraitorSPView.prototype.showText = function () {
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("ransackTraitor_bg6");
        forpeople_top.y = 69;
        this.addChildToContainer(forpeople_top);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 20;
        this._activityTimerText.y = forpeople_top.y + 12;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true, "0x00ff00");
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 3;
        // if(PlatformManager.checkIsViSp()){
        // 	deltaY = 5;
        // }
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("ransackTraitorSP_acCD", [""]);
        acCDTxt.x = this._activityTimerText.y; //forpeople_top.x + forpeople_top.width - 20 - acCDTxt.width;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        var cfg = this.acVo.config;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.multiline = true;
        this._ruleText.width = 608; //GameConfig.stageWidth - this._activityTimerText.x - 10;
        this._ruleText.lineSpacing = 2;
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.y = this._acCDTxt.y + this._acCDTxt.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("ransackTraitorSP_Rule" + this.code, [cfg.cost, cfg.RansackItemNum, cfg.RansackItemNum]);
        this.addChildToContainer(this._ruleText);
        if (PlatformManager.checkIsJPSp()) {
            var offImg = BaseBitmap.create("ransackTraitorSP_off");
            offImg.x = this._ruleText.x + 114;
            offImg.y = this._ruleText.y + 19 - offImg.height;
            this.addChildToContainer(offImg);
        }
        var exchangeShop = cfg.exchangeShop;
        for (var i = 0; i < exchangeShop.length; i++) {
            var shopItem = exchangeShop[i];
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
            var isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
            var txt = null; //ransackTraitorSP_txt6
            if (isOwn) {
                txt = LanguageManager.getlocal("ransackTraitorSP_txt6", [LanguageManager.getlocal("servant_name" + skincfg.servantId)]);
            }
            else {
                txt = LanguageManager.getlocal("ransackTraitorSP_txt2", [LanguageManager.getlocal("servant_name" + skincfg.servantId), this._acvo.getItemNumByIndex(String(shopItem.itemID)), shopItem["proofNum"]]);
            }
            //罪证
            // this._inOrderText1 = ComponentManager.getTextField("", 19, 0xfedb39);
            this["_inOrderText" + (i + 1)] = ComponentManager.getTextField("", 19, 0xfedb39);
            this["_inOrderText" + (i + 1)].text = txt;
            if (i == 0) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 1) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY;
            }
            else if (i == 2) {
                this["_inOrderText" + (i + 1)].x = this._activityTimerText.x;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            else if (i == 3) {
                this["_inOrderText" + (i + 1)].x = this._ruleText.x + 400; //this._ruleText.width - this["_inOrderText"+(i + 1)].width;
                this["_inOrderText" + (i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText" + (i + 1)].height + deltaY;
            }
            this.addChildToContainer(this["_inOrderText" + (i + 1)]);
        }
    };
    AcRansackTraitorSPView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "ransackTraitorSP_acCD";
        if (this.code == "4") {
            cdStrK = "ransackTraitorSP_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            this._acCDTxt.x = this._activityTimerText.x;
            this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        this._acCDTxt.x = this._activityTimerText.x;
        this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
        return false;
    };
    AcRansackTraitorSPView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ransackTraitor_numbg2",
            "arena_bottom", "punish_reward_icon", "ac_luckbag-1_icon",
            "ransackTraitor_btn", "ransackTraitor_2003", "ransackTraitor_txt4", "ransackTraitor_bg3", "ransackTraitor_2001", "ransackTraitor_2004", "ransackTraitor_2002",
            "ransackTraitor_txt1", "ransackTraitorSP_bg1", "ransackTraitor_txt2", "ransackTraitor_txt3",
            "ransackTraitor_bg2", "ransackTraitor_leftimg", "ransackTraitor_bg6", "ransackTraitor_bg4", "ransackTraitor_namebg2", "ransackTraitor_numbg",
            "ransackTraitor_progressbg", "ransackTraitor_progress", "ransackTraitor_bg5", "ransackTraitor_namebg", "ransackTraitor_flag",
            "ransackTraitor_box1",
            "ransackTraitor_box2",
            "ransackTraitor_box3",
            "ransackTraitorSP_namebg",
            "ransackTraitorSP_leftbtn",
            "ransackTraitorSP_buildnamebg",
            "ransackTraitorSP_btnbg",
            "ransackTraitorSP_rechargetxt",
            "ransackTraitorSP_exchangetxt",
            "ransackTraitorSP_leftmask",
            "ransackTraitorSP_rightmask",
            "oneyear_flag",
            "ransackTraitorSP_off",
            this.getDefaultRes("ransackTraitorSP_titletxt"),
            this.getDefaultRes("ransackTraitorSP_titlebg")
            // "ac_ransackTraitor_ani",
        ]);
    };
    // 
    // protected getSoundBgName():string
    // {
    // 	return "music_ransackTraitor";
    // }
    AcRansackTraitorSPView.prototype.getRuleInfo = function () {
        return "ransackTraitorSPRuleInfo" + this.code;
    };
    AcRansackTraitorSPView.prototype.getTitleStr = function () {
        return null;
    };
    AcRansackTraitorSPView.prototype.getTitleBgName = function () {
        return this.getDefaultRes("ransackTraitorSP_titlebg");
    };
    AcRansackTraitorSPView.prototype.getRuleParam = function () {
        var cfg = this.acVo.config;
        return [cfg.cost, cfg.RansackItemNum, cfg.RansackItemNum];
    };
    AcRansackTraitorSPView.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RANSACTARTIORSP_REFRESH, this.refreshUIInfos, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._inOrderText1 = null;
        this._inOrderText2 = null;
        this._inOrderText3 = null;
        this._inOrderText4 = null;
        this._searchtxt3 = null;
        this._rewardLookBtn = null;
        this._aniPlaying = false;
        this._acvo = undefined;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorSPView;
}(AcCommonView));
__reflect(AcRansackTraitorSPView.prototype, "AcRansackTraitorSPView");
