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
 * 联盟
 * author dky
 * date 2017/11/28
 * @class AllianceView
 */
var AllianceView = (function (_super) {
    __extends(AllianceView, _super);
    function AllianceView() {
        var _this = _super.call(this) || this;
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this._currMaskBmp = null;
        _this.touchBoo = true;
        _this.moreBg = null;
        _this._atkraceInfoVoList = [];
        _this.bottom = null;
        _this.allianceVo = null;
        _this.moveContainer = null;
        _this.nameTxt = null;
        _this._describeTxt = null;
        _this._applyRedDotSp = null;
        _this._strTxt = null;
        _this._touchBg = null;
        _this._iconContainer = null;
        _this._activityIconList = [];
        _this._iconNameList = {};
        _this._lastL = 0;
        _this.bottomBtnCfg = [
            {
                id: 1,
                btnName: "manage",
                btnIconImg: "alliance_manageicon",
                btnNameImg: "alliance_manage",
            },
            {
                id: 2,
                btnName: "build",
                btnIconImg: "alliance_buildicon",
                btnNameImg: "alliance_build",
            },
            {
                id: 3,
                btnName: "member",
                btnIconImg: "alliance_memicon",
                btnNameImg: "alliance_mem",
            },
            {
                id: 4,
                btnName: "exchange",
                btnIconImg: "alliance_exicon",
                btnNameImg: "alliance_ex",
            },
            {
                id: 5,
                btnName: "boss",
                btnIconImg: "alliance_bossicon",
                btnNameImg: "alliance_boss",
            },
            {
                id: 6,
                btnName: "rank",
                btnIconImg: "allianc_rankicon",
                btnNameImg: "alliance_rank",
            },
            {
                id: 7,
                btnName: "task",
                btnIconImg: "alliance_taskicon",
                btnNameImg: "alliance_task",
            },
            {
                id: 8,
                btnName: "war",
                btnIconImg: "alliance_waricon",
                btnNameImg: "alliance_war",
            },
        ];
        return _this;
    }
    AllianceView.prototype.getRequestData = function () {
        if (Api.switchVoApi.checkOpenAllianceWar()) {
            this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, null);
        }
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE, requestData: {} };
    };
    AllianceView.prototype.initView = function () {
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE, this.checkData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_TRANSFER, this.refreshBottom, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE, this.quitAlliance, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND, this.quitAlliance, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.doRefreshChat, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        this.allianceVo = allianceVo;
        var bottomBg = BaseLoadBitmap.create("alliance_bg1");
        bottomBg.x = 0;
        bottomBg.y = -15;
        this.addChildToContainer(bottomBg);
        var npcPic = BaseBitmap.create("story_npc_8");
        npcPic.x = 0;
        npcPic.y = GameConfig.stageHeigth - this.container.y - 467 - 150;
        this.addChildToContainer(npcPic);
        this._wordbg = BaseBitmap.create("public_9v_bg11");
        this._wordbg.x = 30;
        this._wordbg.y = npcPic.y - 100;
        this._wordbg.width = 260;
        this._wordbg.height = 78;
        this.addChildToContainer(this._wordbg);
        // this._wordbgCor = BaseBitmap.create("public_9_bg25_tail");
        // this._wordbgCor.x = 160;
        // this._wordbgCor.y = this._wordbg.y + this._wordbg.height - 3;
        // this.addChildToContainer(this._wordbgCor);
        this._wordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._wordsText.text = LanguageManager.getlocal("allianceBOSSTip1");
        this._wordsText.x = this._wordbg.x + 20;
        this._wordsText.y = this._wordbg.y + 20;
        this._wordsText.width = 220;
        this._wordsText.height = 80;
        this.addChildToContainer(this._wordsText);
        var titleBg = BaseBitmap.create("alliance_attbg");
        titleBg.width = 612;
        titleBg.x = 15;
        titleBg.y = -5;
        this.addChildToContainer(titleBg);
        this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow", "progress_type1_bg", 499);
        this._progressBar.x = titleBg.x + 86;
        this._progressBar.y = titleBg.y + 77;
        this.addChildToContainer(this._progressBar);
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
        var expStr = allianceVo.exp + " / " + allianceCfg.exp;
        this._progressBar.setPercentage(allianceVo.exp / allianceCfg.exp);
        this._expTF = ComponentManager.getTextField(expStr, 18, TextFieldConst.COLOR_WHITE);
        this._expTF.x = this._progressBar.x + this._progressBar.width / 2 - this._expTF.width / 2;
        this._expTF.y = this._progressBar.y + this._progressBar.height / 2 - this._expTF.height / 2 - 1;
        this.addChildToContainer(this._expTF);
        var infoBtn = BaseBitmap.create("public_alphabg");
        infoBtn.width = 100;
        infoBtn.height = 100;
        infoBtn.x = 15;
        infoBtn.y = -5;
        this.addChildToContainer(infoBtn);
        infoBtn.addTouchTap(this.infoCilck, this);
        var levelBg = BaseBitmap.create("alliance_level");
        levelBg.x = titleBg.x + 13;
        levelBg.y = titleBg.y + 27;
        this.addChildToContainer(levelBg);
        this._levelTF = ComponentManager.getBitmapText(allianceVo.level.toString(), "recharge_fnt");
        // this._levelTF.setScale(0.8); 
        this._levelTF.x = levelBg.x + levelBg.width / 2 - this._levelTF.width / 2;
        this._levelTF.y = levelBg.y + levelBg.height;
        this.addChildToContainer(this._levelTF);
        this._allianceNameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        this._allianceNameTF.text = allianceVo.name;
        this._allianceNameTF.x = titleBg.x + 90;
        this._allianceNameTF.y = titleBg.y + 20;
        this.addChildToContainer(this._allianceNameTF);
        var wealthStr = LanguageManager.getlocal("allianceWealthTitle", [allianceVo.wealth.toString()]);
        this._moneyTF = ComponentManager.getTextField(wealthStr, 18, TextFieldConst.COLOR_WHITE);
        this._moneyTF.x = this._allianceNameTF.x;
        this._moneyTF.y = titleBg.y + 50;
        this.addChildToContainer(this._moneyTF);
        var idStr = LanguageManager.getlocal("allianceIDTitle", [allianceVo.id.toString()]);
        var idTF = ComponentManager.getTextField(idStr, 20, TextFieldConst.COLOR_WHITE);
        idTF.x = 450 + 148 - idTF.width;
        idTF.y = this._moneyTF.y;
        this.addChildToContainer(idTF);
        // 
        var memStr = LanguageManager.getlocal("allianceMemberTitle", [allianceVo.mn + "/" + allianceVo.maxmn]);
        this._memberTF = ComponentManager.getTextField(memStr, 20, TextFieldConst.COLOR_WHITE);
        this._memberTF.x = idTF.x - 25 - this._memberTF.width;
        this._memberTF.y = this._moneyTF.y;
        this.addChildToContainer(this._memberTF);
        //	公告
        var noticeBg = BaseBitmap.create("public_9v_bg10");
        noticeBg.width = 200;
        noticeBg.height = 300;
        noticeBg.x = 400;
        noticeBg.y = 200;
        this.addChildToContainer(noticeBg);
        // //	公告
        // let noticeBB = BaseBitmap.create("alliance_notice");
        // noticeBB.x = noticeBg.x + noticeBg.width/2 - noticeBB.width/2;
        // noticeBB.y = noticeBg.y + 20;
        // this.addChildToContainer(noticeBB);
        var noticeTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceNotice"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        // this._levelTF.setScale(0.8); 
        noticeTF.x = noticeBg.x + noticeBg.width / 2 - noticeTF.width / 2;
        noticeTF.y = noticeBg.y + 15;
        this.addChildToContainer(noticeTF);
        var downTitleLine = BaseBitmap.create("public_huawen_bg");
        downTitleLine.setPosition(noticeBg.x + noticeBg.width / 2 - downTitleLine.width / 2, noticeTF.y + noticeTF.height + 10);
        this.addChildToContainer(downTitleLine);
        var msgStr = allianceVo.message;
        if (msgStr == "") {
            msgStr = LanguageManager.getlocal("allianceMessageTip");
        }
        this._messageTF = ComponentManager.getTextField(msgStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._messageTF.width = 180;
        this._messageTF.x = noticeBg.x + noticeBg.width / 2 - this._messageTF.width / 2;
        this._messageTF.y = downTitleLine.y + downTitleLine.height + 10;
        this.addChildToContainer(this._messageTF);
        this._bBg = BaseBitmap.create("public_bottombg1");
        this._bBg.height = 94;
        this._bBg.y = GameConfig.stageHeigth - this._bBg.height;
        this.addChild(this._bBg);
        this.bottom = this._bBg;
        // let buttonBg:BaseBitmap = BaseBitmap.create("public_9_alliancebtnbg");
        // buttonBg.width = GameConfig.stageWidth
        // buttonBg.y = bottom.y - buttonBg.height + 30;
        // this.addChild(buttonBg);
        this._iconContainer = new BaseDisplayObjectContainer();
        this._iconContainer.height = 80;
        this._iconContainer.width = GameConfig.stageWidth;
        this._iconContainer.x = 50;
        this._iconContainer.y = 195;
        this._iconContainer.name = "iconContainer";
        this.addChild(this._iconContainer);
        this.initIcons();
        this.initButtom();
        this.showAni();
        this.tick();
        this.checkRedPoint();
    };
    AllianceView.prototype.initIcons = function () {
        var acIconList = Api.acVoApi.getAllianceActivityIcons();
        var l = acIconList.length;
        for (var i = 0; i < l; i++) {
            var icon = acIconList[i];
            var name_1 = icon.name;
            var _a = name_1.split("-"), aid = _a[0], code = _a[1];
            this._iconNameList[icon.name.split("_")[0]] = icon;
            this._iconContainer.addChild(icon);
            this._activityIconList.push(icon);
        }
    };
    AllianceView.prototype.showAni = function () {
        // let 
        if (!this.param) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.BASE.ALLIANCECREATEANIVIEW, { type: this.param.data.type });
    };
    AllianceView.prototype.showAni2 = function () {
        ViewController.getInstance().openView(ViewConst.BASE.ALLIANCECREATEANIVIEW, { type: 2 });
    };
    AllianceView.prototype.initButtom = function () {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.info.joinFlag == 1) {
            this.showAni2();
        }
        this._bottomContiner = new BaseDisplayObjectContainer();
        //填内容
        this.addChild(this._bottomContiner);
        //聊天按钮相关
        var chatbg = BaseBitmap.create(ResourceManager.getRes("public_lt_bg01"));
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 35;
        chatbg.x = 0;
        chatbg.y = -17;
        this._bottomContiner.addChild(chatbg);
        // let bottomBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg"));
        // bottomBg.x=0;
        // bottomBg.y=-bottomBg.height;
        // this._bottomContiner.addChild(bottomBg);
        var bottomBg = BaseBitmap.create("alliance_bg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.y = 12;
        this._bottomContiner.addChild(bottomBg);
        this._bottomContiner.setPosition(0, this._bBg.y - bottomBg.height);
        var PerWidth = 95;
        var curIdx = 0;
        // let starIndex = 0;
        // if(myAllianceVo.po != 1 && myAllianceVo.po != 2)
        // {
        // 	starIndex = 1;
        // }
        // let i = starIndex;
        // if(this.bottomBtnCfg&&this.bottomBtnCfg.length==6&&Api.switchVoApi.checkOpenShenhe())
        // {
        // 	this.bottomBtnCfg.pop();
        // }
        var isManage = myAllianceVo.po == 1 || myAllianceVo.po == 2;
        for (var i = 0; i < this.bottomBtnCfg.length; i++) {
            var btncfg = this.bottomBtnCfg[i];
            if (btncfg.btnName === "manage" && isManage && Api.switchVoApi.checkOpenAllianceTask()) {
                // 显示帮会管理但不在最底下一行
                var imgBg = BaseBitmap.create("alliance_iconbg");
                imgBg.x = 43 + GameConfig.stageWidth - 150 - 100;
                imgBg.y = 35 - 150;
                this._bottomContiner.addChild(imgBg);
                // curIdx +=1 ;
                var imgBtn = ComponentManager.getButton(btncfg.btnIconImg, "", this.bottomBtnClickHandler, this, [btncfg]);
                imgBtn.x = 42 + GameConfig.stageWidth - 150 - 100;
                imgBtn.y = 25 - 150;
                imgBtn.name = btncfg.btnName;
                this._bottomContiner.addChild(imgBtn);
                // curIdx +=1 ;
                var imgName = BaseBitmap.create(btncfg.btnNameImg);
                imgName.x = 35 + GameConfig.stageWidth - 150 - 100;
                imgName.y = 95 - 150;
                this._bottomContiner.addChild(imgName);
            }
            else if (btncfg.btnName === "manage" && !isManage) {
                // 不显示帮会管理				
            }
            else if (btncfg.btnName === "task" && !Api.switchVoApi.checkOpenAllianceTask()) {
                // 没开帮会任务，不显示图标
            }
            else if (btncfg.btnName === "rank" && (!Api.switchVoApi.checkOpenShenhe()) && Api.switchVoApi.checkOpenAllianceWar()) {
                // 显示帮会排行但不在最底下一行
                var imgBg = BaseBitmap.create("alliance_iconbg");
                imgBg.x = 43 + GameConfig.stageWidth - 150;
                imgBg.y = 35 - 150;
                this._bottomContiner.addChild(imgBg);
                // curIdx +=1 ;
                var imgBtn = ComponentManager.getButton(btncfg.btnIconImg, "", this.bottomBtnClickHandler, this, [btncfg]);
                imgBtn.x = 42 + GameConfig.stageWidth - 150;
                imgBtn.y = 25 - 150;
                imgBtn.name = btncfg.btnName;
                this._bottomContiner.addChild(imgBtn);
                // curIdx +=1 ;
                var imgName = BaseBitmap.create(btncfg.btnNameImg);
                imgName.x = 35 + GameConfig.stageWidth - 150;
                imgName.y = 95 - 150;
                this._bottomContiner.addChild(imgName);
            }
            else if (btncfg.btnName === "rank" && Api.switchVoApi.checkOpenShenhe()) {
                // 审核，不开排行榜
            }
            else if (btncfg.btnName === "war" && !Api.switchVoApi.checkOpenAllianceWar()) {
                // 没开帮会争霸，不显示图标
            }
            else {
                // if (btncfg.isOPen) 
                // {
                var imgBg = BaseBitmap.create("alliance_iconbg");
                imgBg.x = 43 + PerWidth * curIdx;
                imgBg.y = 35;
                this._bottomContiner.addChild(imgBg);
                // curIdx +=1 ;
                var imgBtn = ComponentManager.getButton(btncfg.btnIconImg, "", this.bottomBtnClickHandler, this, [btncfg]);
                imgBtn.x = 42 + PerWidth * curIdx;
                imgBtn.y = 25;
                imgBtn.name = btncfg.btnName;
                this._bottomContiner.addChild(imgBtn);
                // curIdx +=1 ;
                var imgName = BaseBitmap.create(btncfg.btnNameImg);
                imgName.x = 35 + PerWidth * curIdx;
                imgName.y = 95;
                this._bottomContiner.addChild(imgName);
                curIdx += 1;
                // }
            }
        }
        // curIdx = 0;
        // i = starIndex;
        // for (i; i < this.bottomBtnCfg.length; i++)
        // {
        // 	let btncfg = this.bottomBtnCfg[i];
        // 	// if (btncfg.isOPen) 
        // 	// {
        // 		let imgBtn = ComponentManager.getButton(btncfg.btnIconImg,"",this.bottomBtnClickHandler,this,[btncfg]);
        // 		imgBtn.x = 42 +PerWidth*curIdx ;
        // 		imgBtn.y = 25;
        // 		imgBtn.name = btncfg.btnName;
        // 		this._bottomContiner.addChild(imgBtn);
        // 		curIdx +=1 ;
        // 	// }
        // }
        // curIdx = 0;
        // i = starIndex;
        // for (i; i < this.bottomBtnCfg.length; i++)
        // {
        // 	let btncfg = this.bottomBtnCfg[i];
        // 	// if (btncfg.isOPen) 
        // 	// {
        // 		let imgName = BaseBitmap.create(btncfg.btnNameImg);
        // 		imgName.x = 35 +PerWidth*curIdx ;
        // 		imgName.y = 95;
        // 		this._bottomContiner.addChild(imgName);
        // 		curIdx +=1 ;
        // 	// }
        // }
        // this.checkAchPoint();
        // this.checkAllRedPoint();
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(this.chatBgClickHandler, this);
        var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
        chatIcon.anchorOffsetX = chatIcon.width / 2;
        chatIcon.anchorOffsetY = chatIcon.height / 2;
        chatIcon.x = chatIcon.width / 2 + 20;
        chatIcon.y = chatbg.y + chatbg.height / 2;
        this._bottomContiner.addChild(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var showStr = Api.chatVoApi.getLastMessage();
        if (!showStr) {
            showStr = "1";
        }
        this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._chatTxt.x = chatIcon.x + 20;
        this._chatTxt.y = chatIcon.y - this._chatTxt.height / 2;
        this._chatTxt.width = 480;
        this._chatTxt.height = 50;
        this._chatTxt.lineSpacing = 50;
        this._bottomContiner.addChild(this._chatTxt);
        this._chatTxtPoint = ComponentManager.getTextField("...", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._chatTxtPoint.x = 542;
        this._chatTxtPoint.y = chatIcon.y - this._chatTxtPoint.height / 2 - 5;
        this._chatTxtPoint.visible = false;
        // this._chatTxtPoint.width = 450;
        // this._chatTxtPoint.height = 20;
        this._bottomContiner.addChild(this._chatTxtPoint);
        this.doRefreshChat();
        var showMore = ComponentManager.getButton("arena_more", null, this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - this.bottom.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - this.bottom.height / 2 - this._moreArrow.height / 2);
        this.addChild(this._moreArrow);
        this._atkraceInfoVoList = this.allianceVo.log;
        this.showText();
    };
    AllianceView.prototype.showMoreHandle = function () {
        if (this.touchBoo) {
            this._isShowMore = !this._isShowMore;
            if (this._isShowMore == true) {
                this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                this.showList();
            }
            else {
                this._moreArrow.scaleY = 1;
                this._moreArrow.y -= this._moreArrow.height;
                this.closeList();
            }
        }
    };
    AllianceView.prototype.showList = function () {
        this.moveContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);
        this.moreBg = BaseBitmap.create("arena_bottom_bg");
        this.moreBg.width = 640;
        this.moreBg.height = GameConfig.stageHeigth - 330;
        this.moveContainer.addChild(this.moreBg);
        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width = GameConfig.stageWidth;
        this._currMaskBmp.height = GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp, this.getChildIndex(this.bottom));
        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9v_bg11");
        this._touchBg.width = 640;
        this._touchBg.height = 260;
        this._touchBg.x = 0;
        this._touchBg.y = -240;
        this._touchBg.alpha = 0;
        this._touchBg.addTouchTap(this.showMoreHandle, this);
        this.moveContainer.addChild(this._touchBg);
        if (this.allianceVo.log && this.allianceVo.log.length > 0) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 10, 640, GameConfig.stageHeigth - 380);
            this._scrollList = ComponentManager.getScrollList(AllianceMoreItem, this._atkraceInfoVoList, rect);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.y = 25;
        }
        else {
            var atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            atkracedes3.x = 250;
            atkracedes3.y = 300;
            this.moveContainer.addChild(atkracedes3);
        }
        this.moveContainer.y = 1150;
        this.touchBoo = false;
        egret.Tween.get(this.moveContainer).to({ y: 250 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
        }, this);
    };
    AllianceView.prototype.showText = function () {
        if (this._atkraceInfoVoList && this._atkraceInfoVoList.length > 0) {
            //名称  
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            nameTxt.text = this._atkraceInfoVoList[0][2];
            var dtype = this._atkraceInfoVoList[0][0];
            if (PlatformManager.checkIsJPSp() && dtype != 2 && dtype != 8 && dtype != 13 && dtype != 14 && dtype != 15) {
                nameTxt.text = this._atkraceInfoVoList[0][2] + LanguageManager.getlocal("alliancelogdes_name_suffix_jp");
            }
            nameTxt.x = 20;
            nameTxt.y = GameConfig.stageHeigth - 67;
            this.addChild(nameTxt);
            this.nameTxt = nameTxt;
            var strTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            strTxt.x = 440;
            strTxt.y = GameConfig.stageHeigth - 46;
            strTxt.text = "...";
            this.addChild(strTxt);
            strTxt.visible = false;
            this._strTxt = strTxt;
            var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            var str = Api.allianceVoApi.getStr(this._atkraceInfoVoList[0]);
            describeTxt.x = 20;
            describeTxt.y = GameConfig.stageHeigth - 40;
            describeTxt.height = 16;
            describeTxt.text = str;
            this._describeTxt = describeTxt;
            if (describeTxt.width >= 420) {
                describeTxt.width = 420;
                strTxt.visible = true;
            }
            else {
                strTxt.visible = false;
            }
            this.addChild(describeTxt);
        }
    };
    AllianceView.prototype.refreshText = function () {
        if (this.nameTxt && this._atkraceInfoVoList.length > 1 && this._describeTxt) {
            this.nameTxt.text = this._atkraceInfoVoList[0][2];
            this._describeTxt.text = Api.allianceVoApi.getStr(this._atkraceInfoVoList[0]);
            if (this._describeTxt.width >= 420) {
                this._describeTxt.width = 420;
                this._strTxt.visible = true;
            }
            else {
                this._strTxt.visible = false;
            }
        }
    };
    AllianceView.prototype.closeList = function () {
        this.touchBoo = false;
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                this.touchBoo = true;
                egret.Tween.removeTweens(this.moveContainer);
            }, this);
        }
        if (this._currMaskBmp && this._currMaskBmp.parent) {
            this._currMaskBmp.parent.removeChild(this._currMaskBmp);
            this._currMaskBmp.dispose();
            this._currMaskBmp = null;
        }
        if (this._touchBg && this._touchBg.parent) {
            this._touchBg.parent.removeChild(this._touchBg);
            this._touchBg.dispose();
            this._touchBg = null;
        }
    };
    AllianceView.prototype.refreshBottom = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW);
        // this.hide();
        if (this._bottomContiner) {
            // this.removeChildFromContainer(this._bottomContiner);
            this.removeChild(this._bottomContiner);
            this._bottomContiner = null;
        }
        this.initButtom();
    };
    AllianceView.prototype.quitAlliance = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceMemberQuitSuccess"));
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
    };
    AllianceView.prototype.checkRedPoint = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        if (allianceVo.apply[0]) {
            if (this._applyRedDotSp == null && this._bottomContiner.getChildByName("manage")) {
                this._applyRedDotSp = BaseBitmap.create("public_dot2");
                var achBtn = this._bottomContiner.getChildByName("manage");
                this._applyRedDotSp.x = achBtn.x + achBtn.width - this._applyRedDotSp.width + 5;
                this._applyRedDotSp.y = achBtn.y + 10;
                this._bottomContiner.addChild(this._applyRedDotSp);
            }
            else {
                if (this._applyRedDotSp) {
                    this._applyRedDotSp.visible = true;
                }
            }
        }
        else {
            if (this._applyRedDotSp) {
                this._applyRedDotSp.visible = false;
            }
        }
    };
    AllianceView.prototype.bottomBtnClickHandler = function (param) {
        // let isOPen= param.isOPen;
        // if(!isOPen)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
        // 	return;
        // }
        var btnName = param.btnName;
        switch (btnName) {
            case "manage":
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEMANAGEPOPUPVIEW);
                // ViewController.getInstance().openView(ViewConst.COMMON.ACRANKACTIVEVIEW,"1");
                break;
            case "build":
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBUILDPOPUPVIEW);
                break;
            case "member":
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEMEMBERPOPUPVIEW);
                break;
            case "exchange":
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEEXPOPUPVIEW);
                break;
            case "boss":
                // App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSPOPUPVIEW);
                break;
            case "rank":
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCERANKPOPUPVIEW);
                break;
            case "task":
                if (this.allianceVo.level >= Config.AlliancetaskCfg.getAllianceTaskNeedLv()) {
                    ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKVIEW);
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip1", [String(Config.AlliancetaskCfg.getAllianceTaskNeedLv())]));
                }
                break;
            case "war":
                var allianceVo = Api.allianceVoApi.getAllianceVo();
                if (allianceVo.level < Config.AlliancewarCfg.allianceLevelNeed) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarOpenTip", [String(Config.AlliancewarCfg.allianceLevelNeed)]));
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWARVIEW);
                }
                break;
            default:
                break;
        }
    };
    AllianceView.prototype.chatBgClickHandler = function () {
        // App.LogUtil.log("chatBgClickHandler >>>>> ");
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB1);
    };
    AllianceView.prototype.doRefreshChat = function () {
        this._chatTxt.text = Api.chatVoApi.getLastMessage();
        var chatTxt = ComponentManager.getTextField(Api.chatVoApi.getLastMessage(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        if (chatTxt.width >= 480) {
            this._chatTxtPoint.visible = true;
        }
        else {
            this._chatTxtPoint.visible = false;
        }
    };
    AllianceView.prototype.checkData = function () {
        var curCmd = NetManager.curReceiveCmd;
        if (Api.playerVoApi.getPlayerAllianceId() == 0 && curCmd != NetRequestConst.REQUEST_ALLIANCE_DISBAND && curCmd != NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("allianceBeKick"));
            ViewController.getInstance().hideAllView();
            Api.allianceVoApi.openMainView();
            return;
        }
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var wealthStr = LanguageManager.getlocal("allianceWealthTitle", [allianceVo.wealth.toString()]);
        var memStr = LanguageManager.getlocal("allianceMemberTitle", [allianceVo.mn + "/" + allianceVo.maxmn]);
        this._allianceNameTF.text = allianceVo.name;
        var msgStr = allianceVo.message;
        if (msgStr == "") {
            msgStr = LanguageManager.getlocal("allianceMessageTip");
        }
        this._messageTF.text = msgStr;
        this._levelTF.text = allianceVo.level.toString();
        this._memberTF.text = memStr;
        this._moneyTF.text = wealthStr;
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
        var expStr = allianceVo.exp + " / " + allianceCfg.exp;
        this._expTF.text = expStr;
        this._progressBar.setPercentage(allianceVo.exp / allianceCfg.exp);
        //显示消息 
        this._atkraceInfoVoList = allianceVo.log;
        if (this._scrollList) {
            this._scrollList.refreshData(this._atkraceInfoVoList);
            this._scrollList.y = 5;
        }
        this.refreshText();
        this.checkRedPoint();
    };
    AllianceView.prototype.infoCilck = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCESHOWINFOPOPUPVIEW, { aid: allianceVo.id });
    };
    AllianceView.prototype.doQuickAlliance = function () {
        // this.hide();
        // App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
    };
    AllianceView.prototype.createHander = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCECREATEPOPUPVIEW);
    };
    AllianceView.prototype.doGetReward = function (event) {
        // this._achId = event.data.achId;
        this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS, { aid: event.data.achId });
    };
    //请求回调
    AllianceView.prototype.receiveData = function (data) {
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
    };
    AllianceView.prototype.tick = function () {
        var aVo = Api.allianceVoApi.getAllianceVo();
        if (!aVo.isBossOpen()) {
            this._wordbg.visible = false;
            // this._wordbgCor.visible = false;
            this._wordsText.visible = false;
        }
        else {
            this._wordbg.visible = true;
            // this._wordbgCor.visible = true;
            this._wordsText.visible = true;
        }
        var l = this._activityIconList.length;
        if (l > 0) {
            var isdelete = false;
            for (var i = l - 1; i >= 0; i--) {
                var icon = this._activityIconList[i];
                var name_2 = icon.name;
                var _a = name_2.split("-"), aid = _a[0], code = _a[1];
                var acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
                if (acvo) {
                    if (Api.acVoApi.checkActivityStartByAid(aid, code) == false || acvo.isShowIcon == false) {
                        icon.dispose();
                        this._activityIconList.splice(i, 1);
                        delete this._iconNameList[icon.name];
                        isdelete = true;
                    }
                }
            }
            if (isdelete || (this._lastL != l)) {
                this.sortIcons();
                this.setIconsPos();
            }
            this.checkActivityIconState();
        }
        this._lastL = this._activityIconList.length;
        if (this._bottomContiner) {
            var allianceVo = Api.allianceVoApi.getAllianceVo();
            if (Api.switchVoApi.checkOpenAllianceWar() && (allianceVo.level >= Config.AlliancewarCfg.allianceLevelNeed)) {
                var period = Api.allianceWarVoApi.getWarPeriod();
                var warBtn = this._bottomContiner.getChildByName("war");
                // if (warBtn && (period == 1 || period == 4)) {
                //红点显示
                if (Api.allianceWarVoApi.isFight() && Api.allianceWarVoApi.getOldInfo()) {
                    var myInfo = Api.allianceVoApi.getMyAllianceVo();
                    if ((myInfo.po == 1 || myInfo.po == 2) && (!Api.allianceWarVoApi.isReceiveAllianceReward())) {
                        App.CommonUtil.addIconToBDOC(warBtn, null, null, null, 10);
                    }
                    else if (!Api.allianceWarVoApi.isReceiveMyReward()) {
                        App.CommonUtil.addIconToBDOC(warBtn, null, null, null, 10);
                    }
                    else if (period == 1 && Api.allianceWarVoApi.isJoin() && (!Api.allianceWarVoApi.getMyInfo())) {
                        App.CommonUtil.addIconToBDOC(warBtn, null, null, null, 10);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(warBtn);
                    }
                }
                else {
                    if (period == 1 && Api.allianceWarVoApi.isJoin() && (!Api.allianceWarVoApi.getMyInfo())) {
                        App.CommonUtil.addIconToBDOC(warBtn, null, null, null, 10);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(warBtn);
                    }
                }
                // }
            }
        }
    };
    AllianceView.prototype.sortIcons = function () {
        var that = this;
        this._activityIconList.sort(function (a, b) {
            var nameA = a.name;
            var nameA2 = null;
            if (nameA) {
                if (nameA.indexOf("_") > -1) {
                    var names = nameA.split("_");
                    nameA = names[0];
                    nameA2 = names[1];
                }
                if (nameA.indexOf("-") > -1) {
                    var names = nameA.split("-");
                    nameA = names[0];
                    nameA2 = names[1];
                }
            }
            var nameB = b.name;
            var nameB2 = null;
            if (nameB) {
                if (nameB.indexOf("_") > -1) {
                    var names = nameB.split("_");
                    nameB = names[0];
                    nameB2 = names[1];
                }
                if (nameB.indexOf("-") > -1) {
                    var names = nameB.split("-");
                    nameB = names[0];
                    nameB2 = names[1];
                }
            }
            var sortIdA = Config.IconorderCfg.getIconSortIdByCfgName(nameA);
            var sortIdB = Config.IconorderCfg.getIconSortIdByCfgName(nameB);
            return sortIdA - sortIdB;
        });
    };
    AllianceView.prototype.setIconsPos = function () {
        if (Api.switchVoApi.checkTWShenhe() == true) {
            for (var k in this._activityIconList) {
                var v = this._activityIconList[k];
                if (v.name == "welfare_func") {
                    v.setPosition(30 + v.width / 2, v.height / 2);
                }
                else {
                    v.visible = false;
                }
            }
            return;
        }
        var l = this._activityIconList.length;
        var haveLeftIcon = false;
        var iconIdx = 0;
        for (var i = 0; i < l; i++) {
            var icon = this._activityIconList[i];
            var iconwidth = 70;
            var iconheight = 69;
            if (haveLeftIcon) {
                icon.x = 30 + 80 + 20 + (icon.width + 20) * (iconIdx % 5) + icon.width / 2; //30+(icon.width+20)*(i%6)+icon.width/2;
                icon.y = Math.floor(iconIdx / 5) * (icon.height + 10) + icon.height / 2; //Math.floor(i/6)*(icon.height+10)+icon.height/2;
            }
            else {
                icon.x = 30 + (icon.width + 20) * (iconIdx % 6) + icon.width / 2;
                icon.y = Math.floor(iconIdx / 6) * (icon.height + 10) + icon.height / 2;
            }
            iconIdx++;
        }
    };
    /**
     * 检查活动icon红点
     */
    AllianceView.prototype.checkActivityIconState = function () {
        var l = this._activityIconList.length;
        var isExtendShowRedDot = false;
        for (var i = 0; i < l; i++) {
            var icon = this._activityIconList[i];
            if (icon.name && icon.name.split("_")[1] == "func") {
                continue;
            }
            if (icon && icon.name != "welfare") {
                var name_3 = icon.name;
                var aid = "";
                var code = "";
                aid = name_3.split("-")[0];
                code = name_3.split("-")[1];
                var isShowRedDot = void 0;
                var aidArr = Config.IconorderCfg.getAidListByCfgName(aid);
                if (aidArr && aidArr.length > 0) {
                    var needCheckId = aidArr;
                    for (var ii = 0; ii < needCheckId.length; ii++) {
                        if (!isShowRedDot) {
                            isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii], null);
                        }
                    }
                }
                else {
                    isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid, code);
                }
                if (isShowRedDot == true) {
                    App.CommonUtil.addIconToBDOC(icon);
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(icon);
                }
            }
        }
    };
    AllianceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "recharge_fnt",
            "arena_bottom",
            "arena_arrow", "arena_bottom_bg", "arena_more",
            "dinner_line", "progress_type1_yellow", "progress_type1_bg",
            "rankinglist_line", "rankinglist_rankbg", "story_npc_8", "alliance_bg",
            "rank_biao", "atkrace_xian_1",
        ]);
    };
    AllianceView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenRankActive()) {
            return "allianceRuleInfo_new";
        }
        else {
            return "allianceRuleInfo";
        }
    };
    AllianceView.prototype.dispose = function () {
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.doRefreshChat, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE, this.checkData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_TRANSFER, this.refreshBottom, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND, this.quitAlliance, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        this._wordbg = null;
        // this._wordbgCor = null;
        this._wordsText = null;
        this._progressBar = null;
        this._levelTF = null;
        this._expTF = null;
        this._moneyTF = null;
        this._memberTF = null;
        this._messageTF = null;
        this._bottomContiner = null;
        this._chatTxt = null;
        this._chatTxtPoint = null;
        this._allianceNameTF = null;
        this._scrollList = null;
        this._moreArrow = null;
        this._isShowMore = false;
        this._currMaskBmp = null;
        this.touchBoo = true;
        this.moreBg = null;
        this._atkraceInfoVoList = [];
        this.bottom = null;
        this._bBg = null;
        ;
        this.allianceVo = null;
        this.moveContainer = null;
        this._describeTxt = null;
        this._strTxt = null;
        this._touchBg = null;
        this._iconContainer = null;
        this._activityIconList = [];
        this._iconNameList = {};
        this._lastL = 0;
        _super.prototype.dispose.call(this);
    };
    return AllianceView;
}(CommonView));
__reflect(AllianceView.prototype, "AllianceView");
