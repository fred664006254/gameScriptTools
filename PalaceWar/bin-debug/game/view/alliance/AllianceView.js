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
 * 联盟
 * author dky
 * date 2017/11/28
 * @class AllianceView
 */
var AllianceView = /** @class */ (function (_super) {
    __extends(AllianceView, _super);
    function AllianceView() {
        var _this = _super.call(this) || this;
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this._currMaskBmp = null;
        _this.touchBoo = true;
        _this.moreBg = null;
        _this._atkraceInfoVoList = [];
        _this.bottomBg = null;
        _this.allianceVo = null;
        _this.moveContainer = null;
        _this.nameTxt = null;
        _this._describeTxt = null;
        _this._applyRedDotSp = null;
        _this._strTxt = null;
        _this._touchBg = null;
        _this._bottomBtnCfg = [];
        _this._btnNode = null;
        _this._topBtnCfg = [];
        _this._topBtnContiner = null;
        _this._public_dot = null;
        _this._public_dot2 = null;
        // 帮会管理红点
        _this._public_dot3 = null;
        _this._needShowGuide = false;
        _this._empCircle = null;
        _this._dotX = 0;
        _this._dotY = 0;
        _this._dotX2 = 0;
        _this._dotY2 = 0;
        _this._dotTF = null;
        _this._viewDetails = null;
        _this._messageRefresh = false;
        _this._speakStr = null;
        _this._speakTF = null;
        _this._speakTail = null;
        _this._speakBg = null;
        _this._messageLength = 0;
        _this._isShowFlag1 = 0;
        _this._isShowFlag2 = 0;
        _this._expLogBtn = null;
        _this._mainTaskHandKeyExchange = null;
        _this._mainTaskHandKeyBuild = null;
        return _this;
    }
    Object.defineProperty(AllianceView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AllianceView.prototype.getContainerY = function () {
        return 14;
    };
    AllianceView.prototype.getRequestData = function () {
        if (Api.switchVoApi.checkOpenAllianceWar()) {
            this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, null);
        }
        // if(Api.switchVoApi.checkAllianceweekend())
        // {
        // 	this.request(NetRequestConst.REQYEST_ALLIANCEWEEK_GETWEEKDETAILS, {});
        // }
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
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH, this.refreshBtnStatus, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2, this.refreshBtnStatus, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETWEEKDETAILS, this.weekEndHandle, this);
        this.initbtmCfg();
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        this.allianceVo = allianceVo;
        var bottomBg = BaseBitmap.create("alliance_bg1");
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY());
        this.addChildToContainer(bottomBg);
        var npcPic = BaseBitmap.create("story_npc_8");
        npcPic.x = 0;
        npcPic.y = GameConfig.stageHeigth - this.container.y - 467 - 150;
        this.addChildToContainer(npcPic);
        this._wordbg = BaseBitmap.create("public_9_bg25");
        this._wordbg.x = 30;
        this._wordbg.y = npcPic.y - 100;
        this._wordbg.width = 260;
        this._wordbg.height = 78;
        this.addChildToContainer(this._wordbg);
        this._wordbgCor = BaseBitmap.create("public_9_bg25_tail");
        this._wordbgCor.x = 160;
        this._wordbgCor.y = this._wordbg.y + this._wordbg.height - 3;
        this.addChildToContainer(this._wordbgCor);
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
        this._progressBar = ComponentManager.getProgressBar("progress9", "progress9_bg", 499);
        this._progressBar.x = titleBg.x + 91;
        this._progressBar.y = titleBg.y + 71;
        this.addChildToContainer(this._progressBar);
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
        var expStr = allianceVo.exp + " / " + allianceCfg.exp;
        this._progressBar.setPercentage(allianceVo.exp / allianceCfg.exp);
        this._expTF = ComponentManager.getTextField(expStr, 18, TextFieldConst.COLOR_WHITE);
        this._expTF.x = this._progressBar.x + this._progressBar.width / 2 - this._expTF.width / 2;
        this._expTF.y = this._progressBar.y + this._progressBar.height / 2 - this._expTF.height / 2;
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
        levelBg.y = titleBg.y + 30;
        this.addChildToContainer(levelBg);
        this._levelTF = ComponentManager.getBitmapText(allianceVo.level.toString(), "recharge_fnt");
        // this._levelTF.setScale(0.8); 
        this._levelTF.x = levelBg.x + levelBg.width / 2 - this._levelTF.width / 2;
        this._levelTF.y = levelBg.y + levelBg.height + 5;
        this.addChildToContainer(this._levelTF);
        this._allianceNameTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        this._allianceNameTF.text = allianceVo.name;
        this._allianceNameTF.x = titleBg.x + 120;
        this._allianceNameTF.y = titleBg.y + 20;
        this.addChildToContainer(this._allianceNameTF);
        var wealthStr = LanguageManager.getlocal("allianceWealthTitle", [allianceVo.wealth.toString()]);
        this._moneyTF = ComponentManager.getTextField(wealthStr, 18, TextFieldConst.COLOR_WHITE);
        this._moneyTF.x = this._allianceNameTF.x;
        this._moneyTF.y = titleBg.y + 50;
        this.addChildToContainer(this._moneyTF);
        // 
        var memStr = LanguageManager.getlocal("allianceMemberTitle", [allianceVo.mn + "/" + allianceVo.maxmn]);
        this._memberTF = ComponentManager.getTextField(memStr, 18, TextFieldConst.COLOR_WHITE);
        this._memberTF.x = 300;
        this._memberTF.y = this._moneyTF.y;
        this.addChildToContainer(this._memberTF);
        var idStr = LanguageManager.getlocal("allianceIDTitle", [allianceVo.id.toString()]);
        var idTF = ComponentManager.getTextField(idStr, 18, TextFieldConst.COLOR_WHITE);
        idTF.x = 430;
        idTF.y = this._moneyTF.y;
        this.addChildToContainer(idTF);
        //	公告
        var noticeBg = BaseBitmap.create("alliance_noticebg");
        noticeBg.x = 340;
        noticeBg.y = 200;
        noticeBg.addTouchTap(this.noticeTouchHandler, this);
        // if(PlatformManager.checkIsEnSp()||PlatformManager.checkIsThSp()||PlatformManager.checkIsTWBSp())
        // {
        // 	noticeBg.height = 370;
        // }
        this.addChildToContainer(noticeBg);
        //	公告
        var noticeBB = BaseBitmap.create("alliance_notice");
        noticeBB.x = noticeBg.x + noticeBg.width / 2 - noticeBB.width / 2;
        noticeBB.y = noticeBg.y + 20;
        this.addChildToContainer(noticeBB);
        var msgStr = allianceVo.message;
        if (msgStr == "") {
            msgStr = LanguageManager.getlocal("allianceMessageTip");
        }
        this._messageTF = ComponentManager.getTextField(msgStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._messageTF.width = 220;
        this._messageTF.height = 200;
        this._messageTF.x = noticeBg.x + noticeBg.width / 2 - this._messageTF.width / 2;
        this._messageTF.y = noticeBg.y + 20 + 40;
        this.addChildToContainer(this._messageTF);
        //...
        this._dotTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._dotTF.text = "...";
        this._dotTF.x = this._messageTF.x;
        this._dotTF.y = this._messageTF.y + 205;
        this._dotTF.visible = false;
        this.addChildToContainer(this._dotTF);
        this._viewDetails = ComponentManager.getTextField(LanguageManager.getlocal("noticetouchdes"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // this._viewDetails.x =this._dotTF.x+70;
        this._viewDetails.y = this._dotTF.y;
        this._viewDetails.x = noticeBB.x + (noticeBB.width - this._viewDetails.width) * 0.5;
        // this._viewDetails.visible  =  false;
        this.addChildToContainer(this._viewDetails);
        //公告文本高度超框处理
        // if(!PlatformManager.checkIsEnSp()||!PlatformManager.checkIsThSp()||!PlatformManager.checkIsTWBSp())
        // {
        // 	if(this._messageTF.height>200)
        // 	{
        // 		this._messageTF.height = 200;
        // 		//...
        // 		// noticetouchdes
        // 		this._dotTF.visible = true;
        // 		// this._viewDetails.visible = true; 
        // 	}
        // 	else
        // 	{
        // 		if(this._dotTF)
        // 		{
        // 			this._dotTF.visible =false;
        // 			// this._viewDetails.visible = false;
        // 		}
        // 	}
        // } 
        this._bBg = BaseBitmap.create("arena_bottom");
        this._bBg.y = GameConfig.stageHeigth - this._bBg.height;
        this.addChild(this._bBg);
        this.bottomBg = this._bBg;
        // let buttonBg:BaseBitmap = BaseBitmap.create("public_9_alliancebtnbg");
        // buttonBg.width = GameConfig.stageWidth
        // buttonBg.y = bottom.y - buttonBg.height + 30;
        // this.addChild(buttonBg);
        this.initButtom();
        this.showAni();
        this.tick();
        this.checkRedPoint();
        if (this._messageRefresh == true) {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEDETAILSPOPUPVIEW);
        }
    };
    AllianceView.prototype.noticeTouchHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEDETAILSPOPUPVIEW);
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
        var chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 35;
        chatbg.x = 0;
        chatbg.y = 0;
        this._bottomContiner.addChild(chatbg);
        // let bottomBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg"));
        // bottomBg.x=0;
        // bottomBg.y=-bottomBg.height;
        // this._bottomContiner.addChild(bottomBg);
        var bottomBg = BaseBitmap.create("public_9_alliancebtnbg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.name = "bottomBg";
        // bottomBg.y = bottom.y - bottomBg.height + 30;
        this._bottomContiner.addChild(bottomBg);
        this._bottomContiner.setPosition(0, this._bBg.y - bottomBg.height + 30);
        var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.name = "arrow_leftBtn";
        arrow_leftBtn.setScale(0.6);
        arrow_leftBtn.x = bottomBg.x + 25;
        arrow_leftBtn.y = bottomBg.y + bottomBg.height / 2 - arrow_leftBtn.height / 2 * 0.6 + 10;
        this._bottomContiner.addChild(arrow_leftBtn);
        this._arrow_leftBtn = arrow_leftBtn;
        var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.name = "arrow_rightBtn";
        arrow_rightBtn.scaleX = -1 * 0.6;
        arrow_rightBtn.scaleY = 0.6;
        arrow_rightBtn.x = bottomBg.x + bottomBg.width - arrow_rightBtn.width * 0.6 + 10;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this._bottomContiner.addChild(arrow_rightBtn);
        this._arrow_rightBtn = arrow_rightBtn;
        // this.checkAchPoint();
        // this.checkAllRedPoint();
        // this.initBotBtnList();
        chatbg.touchEnabled = true;
        chatbg.addTouchTap(this.chatBgClickHandler, this);
        var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
        chatIcon.anchorOffsetX = chatIcon.width / 2;
        chatIcon.anchorOffsetY = chatIcon.height / 2;
        chatIcon.x = chatIcon.width / 2 + 10;
        chatIcon.y = chatbg.y + chatbg.height / 2;
        this._bottomContiner.addChild(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var showStr = Api.chatVoApi.getLastMessage();
        if (!showStr) {
            showStr = "1";
        }
        var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr) {
            showStr = emoticonStr;
        }
        this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._chatTxt.x = chatIcon.x + 20;
        this._chatTxt.y = chatIcon.y - this._chatTxt.height / 2;
        this._chatTxt.width = 480;
        this._chatTxt.height = 50;
        this._chatTxt.lineSpacing = 50;
        this._bottomContiner.addChild(this._chatTxt);
        this._chatTxtPoint = ComponentManager.getTextField("...", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._chatTxtPoint.x = 522;
        this._chatTxtPoint.y = chatIcon.y - this._chatTxtPoint.height / 2 - 5;
        this._chatTxtPoint.visible = false;
        // this._chatTxtPoint.width = 450;
        // this._chatTxtPoint.height = 20;
        this._bottomContiner.addChild(this._chatTxtPoint);
        this.doRefreshChat();
        var showMore = ComponentManager.getButton("arena_more", null, this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - this.bottomBg.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - this.bottomBg.height / 2 - this._moreArrow.height / 2);
        this.addChild(this._moreArrow);
        this._atkraceInfoVoList = this.allianceVo.log;
        this.showText();
        this.initBotBtnList();
    };
    AllianceView.prototype.switchHandler = function (param) {
        var changeW = 505;
        var btnScrollView = this._bottomContiner.getChildByName("btnScrollView");
        var scroL = btnScrollView.scrollLeft;
        if (param == "right") {
            if (scroL + changeW > btnScrollView.getMaxScrollLeft()) {
                scroL = btnScrollView.getMaxScrollLeft();
            }
            else {
                scroL += changeW;
            }
        }
        if (param == "left") {
            if (scroL - changeW < 0) {
                scroL = 0;
            }
            else {
                scroL -= changeW;
            }
        }
        btnScrollView.setScrollPosition(0, scroL);
        this.changeArrowBtnStatus();
    };
    AllianceView.prototype.changeArrowBtnStatus = function () {
        var btnScrollView = this._bottomContiner.getChildByName("btnScrollView");
        var scroL = btnScrollView.scrollLeft;
        var maxSLeft = btnScrollView.getMaxScrollLeft();
        if (scroL <= 0) {
            this._arrow_leftBtn.setEnable(false);
            this._arrow_rightBtn.setEnable(true);
        }
        if (scroL >= maxSLeft) {
            this._arrow_leftBtn.setEnable(true);
            this._arrow_rightBtn.setEnable(false);
        }
        if (scroL > 0 && scroL < maxSLeft) {
            this._arrow_leftBtn.setEnable(true);
            this._arrow_rightBtn.setEnable(true);
        }
    };
    AllianceView.prototype.initBotBtnList = function () {
        var _this = this;
        var btnScrollView = this._bottomContiner.getChildByName("btnScrollView");
        if (btnScrollView) {
            btnScrollView.dispose();
        }
        if (this._topBtnContiner) {
            this._topBtnContiner.dispose();
            this._topBtnContiner = null;
        }
        if (this._btnNode) {
            this._btnNode.dispose();
            this._btnNode = null;
        }
        if (this._speakTF) {
            this._speakTF.dispose();
            this._speakTF = null;
        }
        if (this._speakTail) {
            this._speakTail.dispose();
            this._speakTail = null;
        }
        if (this._speakBg) {
            this._speakBg.dispose();
            this._speakBg = null;
        }
        this._topBtnContiner = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._topBtnContiner);
        this.initbtmCfg();
        this.initTopBtnCfg();
        this._arrow_rightBtn.setVisible(false);
        this._arrow_leftBtn.setVisible(false);
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        var bottomBg = this._bottomContiner.getChildByName("bottomBg");
        var PerWidth = 95;
        var curIdx = 0;
        this._btnNode = new BaseDisplayObjectContainer();
        var _loop_1 = function (i) {
            var btncfg = this_1._bottomBtnCfg[i];
            var imgBg = BaseBitmap.create("alliance_iconbg");
            imgBg.x = 13 + PerWidth * curIdx;
            imgBg.y = 60;
            imgBg.name = btncfg.btnName + "imgBg";
            this_1._btnNode.addChild(imgBg);
            var imgBtn = ComponentManager.getButton(btncfg.btnIconImg, "", this_1.bottomBtnClickHandler, this_1, [btncfg]);
            imgBtn.x = 8 + PerWidth * curIdx;
            imgBtn.y = 50;
            imgBtn.name = btncfg.btnName;
            this_1._btnNode.addChild(imgBtn);
            var imgName = BaseBitmap.create(btncfg.btnNameImg);
            imgName.x = 5 + PerWidth * curIdx;
            imgName.y = 120;
            this_1._btnNode.addChild(imgName);
            imgName.name = btncfg.btnName + "imgName";
            curIdx += 1;
            if (btncfg.btnName == "task" && !Api.allianceTaskVoApi.isAllianceTaskLVEnable()) {
                App.DisplayUtil.changeToGray(imgBg);
                App.DisplayUtil.changeToGray(imgBtn);
                App.DisplayUtil.changeToGray(imgName);
            }
            if (btncfg.btnName == "war") {
                var allianceVo = Api.allianceVoApi.getAllianceVo();
                if (allianceVo.level < Config.AlliancewarCfg.allianceLevelNeed) {
                    App.DisplayUtil.changeToGray(imgBg);
                    App.DisplayUtil.changeToGray(imgBtn);
                    App.DisplayUtil.changeToGray(imgName);
                }
            }
            if (btncfg.btnName == "week") {
                if (this_1._speakTF) {
                    return "continue";
                }
                this_1._speakStr = LanguageManager.getlocal("allianceWeekEndViewAcTimeTip");
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                this_1._speakTail = BaseBitmap.create("public_9_bg25_tail");
                this_1._speakBg = BaseBitmap.create("public_9_bg25");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                var posX = imgBtn.x;
                if (posX + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX, bottomBg.y);
                this_1._bottomContiner.addChild(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2);
                this_1._bottomContiner.addChild(this_1._speakTF);
                this_1._speakTail.skewY = 180;
                this_1._speakTail.setPosition(imgBtn.x + imgBtn.width, this_1._speakBg.y + this_1._speakBg.height - 2);
                this_1._bottomContiner.addChild(this_1._speakTail);
                egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                    _this._speakTF.text = _this._speakStr;
                    _this._speakBg.width = _this._speakTF.width + 40;
                    var posX = imgBtn.x;
                    if (posX + _this._speakBg.width + 5 > GameConfig.stageWidth) {
                        posX = GameConfig.stageWidth - _this._speakBg.width - 15;
                    }
                    _this._speakBg.setPosition(posX, bottomBg.y);
                    _this._speakTF.setPosition(_this._speakBg.x + _this._speakBg.width / 2 - _this._speakTF.width / 2, _this._speakBg.y + _this._speakBg.height / 2 - _this._speakTF.height / 2);
                    _this._speakTail.setPosition(imgBtn.x + imgBtn.width, _this._speakBg.y + _this._speakBg.height - 2);
                    _this._speakTF.text = "";
                    _this._speakTail.setVisible(true);
                    _this._speakTF.setVisible(true);
                    _this._speakBg.setVisible(true);
                    _this._messageLength = 0;
                    egret.Tween.get(_this._speakTF, { loop: true }).wait(75).call(function () {
                        _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                        _this._messageLength++;
                    }, _this);
                }, this_1).wait(this_1._speakStr.length * 75 + 3000).call(function () {
                    _this._speakTail.setVisible(false);
                    _this._speakTF.setVisible(false);
                    _this._speakBg.setVisible(false);
                    _this._messageLength = 0;
                    egret.Tween.removeTweens(_this._speakTF);
                }, this_1).wait(10000);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this._bottomBtnCfg.length; i++) {
            _loop_1(i);
        }
        this._btnNode.width += 40;
        var srowW = bottomBg.width - 160;
        if (Api.switchVoApi.checkAllianceweekend()) {
            srowW = bottomBg.width - 50;
        }
        var scrRect = new egret.Rectangle(0, 0, srowW, bottomBg.height);
        this._btnNode.width = srowW * Math.ceil(this._bottomBtnCfg.length / 5);
        btnScrollView = ComponentManager.getScrollView(this._btnNode, scrRect);
        btnScrollView.verticalScrollPolicy = "off";
        btnScrollView.horizontalScrollPolicy = "off";
        btnScrollView.bounces = false;
        btnScrollView.x = bottomBg.x + 80;
        if (Api.switchVoApi.checkAllianceweekend()) {
            btnScrollView.x = bottomBg.x + 30;
        }
        btnScrollView.y = bottomBg.y;
        btnScrollView.name = "btnScrollView";
        btnScrollView.touchEnabled = false;
        this._bottomContiner.addChild(btnScrollView);
        for (var i = 0; i < this._topBtnCfg.length; i++) {
            var btncfg = this._topBtnCfg[i];
            var imgBg = BaseBitmap.create("alliance_iconbg");
            imgBg.setPosition(GameConfig.stageWidth - (imgBg.width + 20) * (i + 1), 100);
            imgBg.name = btncfg.btnName + "imgBg";
            this._topBtnContiner.addChild(imgBg);
            if (btncfg.btnName == "allianceRecharge" || btncfg.btnName == "allianceRechargetotal") {
                var circle = BaseBitmap.create('mainui_iconani');
                circle.anchorOffsetX = circle.width / 2;
                circle.anchorOffsetY = circle.height / 2;
                circle.setPosition(imgBg.x + imgBg.width / 2 - 3, imgBg.y + imgBg.height / 2); //this._topBtnContiner.width/2 , this._topBtnContiner.height/2);
                this._topBtnContiner.addChild(circle);
                egret.Tween.get(circle, { loop: true }).to({ rotation: 360 }, 1000);
                this._empCircle = circle;
                if (btncfg.btnName == "allianceRecharge") {
                    this._dotX = circle.x + circle.width - 90;
                    this._dotY = 100; //circle.y;
                }
                else {
                    this._dotX2 = circle.x + circle.width - 90;
                    this._dotY2 = 100; //circle.y;
                }
            }
            var imgBtn = ComponentManager.getButton(btncfg.btnIconImg, "", this.bottomBtnClickHandler, this, [btncfg]);
            imgBtn.setPosition(imgBg.x + imgBg.width / 2 - imgBtn.width / 2 - 5, imgBg.y + imgBg.height / 2 - imgBtn.height / 2);
            imgBtn.name = btncfg.btnName;
            this._topBtnContiner.addChild(imgBtn);
            var imgName = BaseBitmap.create(btncfg.btnNameImg);
            imgName.setPosition(imgBg.x + imgBg.width / 2 - imgName.width / 2, imgBg.y + imgBg.height - imgName.height);
            this._topBtnContiner.addChild(imgName);
        }
        if (this._topBtnContiner.getChildByName("manageimgBg")) {
            var bgt = this._topBtnContiner.getChildByName("manageimgBg");
            this._public_dot3 = BaseBitmap.create("public_dot2");
            this._public_dot3.setPosition(bgt.x + bgt.width - this._public_dot3.width, bgt.y);
            this._topBtnContiner.addChild(this._public_dot3);
            this._public_dot3.visible = this.getIsHasApply();
            ;
        }
        if (this.vo) {
            var public_dot = BaseBitmap.create("public_dot2");
            public_dot.x = this._dotX;
            public_dot.y = this._dotY;
            this.addChildToContainer(public_dot);
            this._public_dot = public_dot;
            this._public_dot.visible = false;
            this._public_dot.visible = this.vo.isShowRedDot;
        }
        if (this.vo2) {
            var public_dot2 = BaseBitmap.create("public_dot2");
            public_dot2.x = this._dotX2;
            public_dot2.y = this._dotY2;
            this.addChildToContainer(public_dot2);
            this._public_dot2 = public_dot2;
            this._public_dot2.visible = false;
            this._public_dot2.visible = this.vo2.isShowRedDot;
        }
        //主线任务
        var exchangeBtn = this._btnNode.getChildByName("exchange");
        if (exchangeBtn) {
            this._mainTaskHandKeyExchange = App.MainTaskHandUtil.addHandNode(this, this._bottomContiner.x + btnScrollView.x + 136, this._bottomContiner.y + btnScrollView.y + 90, [exchangeBtn], 701, true, function () {
                return true;
            }, this);
        }
        //主线任务建设
        var currTaskId = Api.mainTaskVoApi.getCurMainTaskId();
        if (currTaskId) {
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(currTaskId);
            if (taskCfg) {
                var buildBtn = this._btnNode.getChildByName("build");
                if (taskCfg.questType == 702 || taskCfg.questType == 703) {
                    this._mainTaskHandKeyBuild = App.MainTaskHandUtil.addHandNode(this, this._bottomContiner.x + btnScrollView.x + 36, this._bottomContiner.y + btnScrollView.y + 90, [buildBtn], taskCfg.questType, true, function () {
                        return true;
                    }, this);
                }
            }
        }
    };
    AllianceView.prototype.getIsHasApply = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        return allianceVo.apply[0];
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
        this.setChildIndex(this._currMaskBmp, this.getChildIndex(this.bottomBg));
        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");
        this._touchBg.width = 640;
        this._touchBg.height = 260;
        this._touchBg.x = 0;
        this._touchBg.y = -240;
        this._touchBg.alpha = 0;
        this._touchBg.addTouchTap(this.showMoreHandle, this);
        this.moveContainer.addChild(this._touchBg);
        //经验日志
        var expLogbtn = ComponentManager.getButton("alliance_log_btn", null, this.showExpLog, this);
        expLogbtn.setPosition(0, -expLogbtn.height);
        this.moveContainer.addChild(expLogbtn);
        this._expLogBtn = expLogbtn;
        // expLogbtn.visible = false;
        if (this.allianceVo.log && this.allianceVo.log.length > 0) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 10, 640, GameConfig.stageHeigth - 340);
            this._scrollList = ComponentManager.getScrollList(AllianceMoreItem, this._atkraceInfoVoList, rect);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.y = 5;
        }
        else {
            var atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x = 250;
            atkracedes3.y = 300;
            this.moveContainer.addChild(atkracedes3);
        }
        this.moveContainer.y = 1150;
        this.touchBoo = false;
        egret.Tween.get(this.moveContainer).to({ y: 260 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
            // expLogbtn.visible = true;
        }, this);
    };
    AllianceView.prototype.showExpLog = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCELOGPOPUPVIEW);
    };
    AllianceView.prototype.showText = function () {
        if (this._atkraceInfoVoList && this._atkraceInfoVoList.length > 0) {
            //名称  
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            nameTxt.text = this._atkraceInfoVoList[0][2];
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
    AllianceView.prototype.refreshBtnStatus = function () {
        if (this._public_dot && this.vo) {
            this._public_dot.visible = this.vo.isShowRedDot;
        }
        if (this._public_dot2 && this.vo2) {
            this._public_dot2.visible = this.vo2.isShowRedDot;
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
            var view_1 = this;
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                view_1.touchBoo = true;
                egret.Tween.removeTweens(view_1.moveContainer);
                view_1.moveContainer.visible = false;
                if (view_1._expLogBtn) {
                    view_1._expLogBtn.dispose();
                    view_1._expLogBtn = null;
                }
                view_1.removeChild(view_1.moveContainer);
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
        this.initBotBtnList();
    };
    AllianceView.prototype.quitAlliance = function (evt) {
        // if(evt.data.data.ret < 0){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"))
        // 	return;
        // }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceMemberQuitSuccess"));
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
    };
    AllianceView.prototype.checkRedPoint = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        if (allianceVo.apply[0]) {
            if (this._applyRedDotSp == null && this._btnNode.getChildByName("manage")) {
                this._applyRedDotSp = BaseBitmap.create("public_dot2");
                var achBtn = this._btnNode.getChildByName("manage");
                this._applyRedDotSp.x = achBtn.x + achBtn.width - this._applyRedDotSp.width + 5;
                this._applyRedDotSp.y = achBtn.y + 10;
                this._btnNode.addChild(this._applyRedDotSp);
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
                if (Api.allianceVoApi.getAllianceVo().level < Config.AlliancetaskCfg.getAllianceTaskNeedLv()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskOpenLvTip"));
                }
                else {
                    var date = App.DateUtil.getServerDate();
                    if (this._needShowGuide && date.getDate() < 3) {
                        this._needShowGuide = false;
                        Api.rookieVoApi.curGuideKey = "alliancetask";
                        Api.rookieVoApi.insertWaitingGuide({ "idx": "alliancetask_1" }, true);
                        Api.rookieVoApi.checkWaitingGuide();
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKVIEW);
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
            case "allianceRecharge":
                if (this.vo.isActivityPeriod2() == false) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
                    return;
                }
                var arr = Api.acVoApi.getAcIconListByAid(AcConst.AID_AllIANCERECHARGECOUNT);
                if (arr) {
                    var desOeject = Api.allianceVoApi.getInProgressRechargeCount(arr);
                    ViewController.getInstance().openView(ViewConst.COMMON.ACALLIANCERECHARFWCOUNTVIEW, {
                        aid: "" + desOeject.bindData.aid,
                        code: "" + desOeject.bindData.code
                    });
                }
                break;
            //帮会累计充值
            case "allianceRechargetotal":
                if (this.vo2.isActivityPeriod2() == false) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
                    return;
                }
                var arr2 = Api.acVoApi.getAcIconListByAid(AcConst.AID_AllIANCERECHARGETOTAL);
                if (arr2) {
                    var desOeject = Api.allianceVoApi.getInProgressRechargeTotal(arr2);
                    ViewController.getInstance().openView(ViewConst.COMMON.ACALLIANCERECHARFWCOUNTTOTALVIEW, {
                        aid: "" + desOeject.bindData.aid,
                        code: "" + desOeject.bindData.code
                    });
                }
                break;
            case "week":
                var allianceVo_week = Api.allianceVoApi.getAllianceVo();
                if (allianceVo_week.level < Config.AllianceweekendCfg.allianceLv) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekLockTip", [String(Config.AllianceweekendCfg.allianceLv)]));
                    return;
                }
                if (!Api.allianceWeekVoApi.checkActivityStart()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewUnbeginTip"));
                    return;
                }
                this._isShowFlag1 = Api.myAllianceWeekVoApi.getShowFlag();
                this.request(NetRequestConst.REQYEST_ALLIANCEWEEK_GETWEEKDETAILS, {});
                // ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWEEKENDVIEW);
                break;
            default:
                break;
        }
    };
    AllianceView.prototype.chatBgClickHandler = function () {
        // App.LogUtil.log("chatBgClickHandler >>>>> ");
        ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB1);
    };
    AllianceView.prototype.doRefreshChat = function () {
        var showStr = Api.chatVoApi.getLastMessage();
        var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr) {
            showStr = emoticonStr;
        }
        this._chatTxt.text = showStr;
        var chatTxt = ComponentManager.getTextField(Api.chatVoApi.getLastMessage(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        if (chatTxt.width >= 480) {
            this._chatTxtPoint.visible = true;
        }
        else {
            this._chatTxtPoint.visible = false;
        }
    };
    Object.defineProperty(AllianceView.prototype, "vo", {
        get: function () {
            var arr = Api.acVoApi.getAcIconListByAid(AcConst.AID_AllIANCERECHARGECOUNT);
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGECOUNT, "1");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllianceView.prototype, "vo2", {
        get: function () {
            var arr = Api.acVoApi.getAcIconListByAid(AcConst.AID_AllIANCERECHARGETOTAL);
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGETOTAL);
        },
        enumerable: true,
        configurable: true
    });
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
        if (this._public_dot3) {
            this._public_dot3.visible = this.getIsHasApply();
        }
    };
    AllianceView.prototype.infoCilck = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCESHOWINFOPOPUPVIEW, { aid: allianceVo.id });
    };
    AllianceView.prototype.doQuickAlliance = function () {
        // this.hide();
        // App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
    };
    Object.defineProperty(AllianceView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGECOUNT, "1");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllianceView.prototype, "acVo2", {
        //累计充值VO
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_AllIANCERECHARGETOTAL);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化
     */
    AllianceView.prototype.initTopBtnCfg = function () {
        this._topBtnCfg.length = 0;
        //排行榜
        if ((!Api.switchVoApi.checkOpenShenhe()) && (Api.switchVoApi.checkOpenAllianceWar())) {
            this._topBtnCfg.push({
                id: 4,
                btnName: "rank",
                btnIconImg: "allianc_rankicon",
                btnNameImg: "alliance_rank"
            });
        }
        //查看成员
        this._topBtnCfg.push({
            id: 3,
            btnName: "member",
            btnIconImg: "alliance_memicon",
            btnNameImg: "alliance_mem"
        });
        //帮会管理
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.po <= 2) {
            this._topBtnCfg.push({
                id: 2,
                btnName: "manage",
                btnIconImg: "alliance_manageicon",
                btnNameImg: "alliance_manage"
            });
        }
        if (this.acVo && this.acVo.isStart) {
            this._topBtnCfg.push({
                id: 1,
                btnName: "allianceRecharge",
                btnIconImg: "ac_alliancerechargecount-1_icon",
                btnNameImg: "ac_alliancerechargecount-1_name"
            });
        }
        if (this.acVo2 && this.acVo2.isStart) {
            this._topBtnCfg.push({
                id: 4,
                btnName: "allianceRechargetotal",
                btnIconImg: "ac_alliancerechargetotal-1_icon",
                btnNameImg: "ac_alliancerechargetotal-1_name"
            });
        }
    };
    AllianceView.prototype.initbtmCfg = function () {
        this._bottomBtnCfg = [
            {
                id: 2,
                btnName: "build",
                btnIconImg: "alliance_buildicon",
                btnNameImg: "alliance_build"
            },
            // {
            // 	id:3,
            // 	btnName:"member",
            // 	btnIconImg:"alliance_memicon",
            // 	btnNameImg:"alliance_mem",
            // 	// isOPen:true,
            // },
            {
                id: 4,
                btnName: "exchange",
                btnIconImg: "alliance_exicon",
                btnNameImg: "alliance_ex"
            },
            {
                id: 5,
                btnName: "boss",
                btnIconImg: "alliance_bossicon",
                btnNameImg: "alliance_boss"
            },
        ];
        // let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        // if(myAllianceVo.po <= 2){
        // 	this._bottomBtnCfg.unshift({
        // 		id:1,
        // 		btnName:"manage",
        // 		btnIconImg:"alliance_manageicon",
        // 		btnNameImg:"alliance_manage",
        // 		// isOPen:true,
        // 	});
        // }
        if (Api.switchVoApi.checkOpenAllianceTask()) {
            this._bottomBtnCfg.push({
                id: 6,
                btnName: "task",
                btnIconImg: "alliance_taskicon",
                btnNameImg: "alliance_task"
            });
        }
        if ((!Api.switchVoApi.checkOpenShenhe()) && (!Api.switchVoApi.checkOpenAllianceWar())) {
            this._bottomBtnCfg.push({
                id: 7,
                btnName: "rank",
                btnIconImg: "allianc_rankicon",
                btnNameImg: "alliance_rank"
            });
        }
        if (Api.switchVoApi.checkOpenAllianceWar()) {
            this._bottomBtnCfg.push({
                id: 8,
                btnName: "war",
                btnIconImg: "alliance_waricon",
                btnNameImg: "alliance_war"
            });
        }
        if (Api.switchVoApi.checkAllianceweekend()) {
            this._bottomBtnCfg.push({
                id: 9,
                btnName: "week",
                btnIconImg: "allianceweekendview_icon",
                btnNameImg: "allianceweekendview_name"
            });
        }
        // else{
        // 	if(!Api.switchVoApi.checkOpenShenhe()){
        // 		this._bottomBtnCfg.push({
        // 			id:7,
        // 			btnName:"rank",
        // 			btnIconImg:"allianc_rankicon",
        // 			btnNameImg:"alliance_rank",
        // 			// isOPen:false,
        // 		})
        // 	}
        // }
    };
    /**请求勤王除恶model回调 */
    AllianceView.prototype.weekEndHandle = function () {
        this._isShowFlag2 = Api.myAllianceWeekVoApi.getShowFlag();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWEEKENDVIEW, { isShow: this._isShowFlag2 == this._isShowFlag1 });
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
        if (!data || !data.ret) {
            return;
        }
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        if (data.data.data.myalliance && data.data.data.myalliance.info && data.data.data.myalliance.info.taskrefresh == 1) {
            this._needShowGuide = true;
        }
        if (data.data.data.messageRefresh) {
            this._messageRefresh = true;
        }
        else {
            this._messageRefresh = false;
        }
    };
    AllianceView.prototype.tick = function () {
        var aVo = Api.allianceVoApi.getAllianceVo();
        if (!aVo.isBossOpen()) {
            this._wordbg.visible = false;
            this._wordbgCor.visible = false;
            this._wordsText.visible = false;
        }
        else {
            this._wordbg.visible = true;
            this._wordbgCor.visible = true;
            this._wordsText.visible = true;
        }
        if (this._btnNode) {
            // let buildBtn = <BaseButton>this._btnNode.getChildByName("build");
            // if (buildBtn){
            // 	if (Api.allianceVoApi.getIsDonatet()){
            // 		App.CommonUtil.removeIconFromBDOC(buildBtn);
            // 	}
            // 	else{
            // 		App.CommonUtil.addIconToBDOC(buildBtn);
            // 	}
            // }
            var taskBtn = this._btnNode.getChildByName("task");
            if (taskBtn) {
                if (Api.allianceTaskVoApi.isShowRedForEntrance()) {
                    App.CommonUtil.addIconToBDOC(taskBtn);
                    this.checkArrowBtnRed(true);
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(taskBtn);
                    this.checkArrowBtnRed(false);
                }
            }
            var allianceVo = Api.allianceVoApi.getAllianceVo();
            if (Api.switchVoApi.checkOpenAllianceWar() && (allianceVo.level >= Config.AlliancewarCfg.allianceLevelNeed)) {
                var period = Api.allianceWarVoApi.getWarPeriod();
                var warBtn = this._btnNode.getChildByName("war");
                if (warBtn && (period == 1 || period == 4)) {
                    //红点显示
                    if (Api.allianceWarVoApi.isFight() && Api.allianceWarVoApi.getOldInfo()) {
                        var myInfo = Api.allianceVoApi.getMyAllianceVo();
                        if ((myInfo.po == 1 || myInfo.po == 2) && (!Api.allianceWarVoApi.isReceiveAllianceReward())) {
                            App.CommonUtil.addIconToBDOC(warBtn);
                        }
                        else if (!Api.allianceWarVoApi.isReceiveMyReward()) {
                            App.CommonUtil.addIconToBDOC(warBtn);
                        }
                        else if (period == 1 && Api.allianceWarVoApi.isJoin() && (!Api.allianceWarVoApi.getMyInfo())) {
                            App.CommonUtil.addIconToBDOC(warBtn);
                        }
                        else {
                            App.CommonUtil.removeIconFromBDOC(warBtn);
                        }
                    }
                    else {
                        if (period == 1 && Api.allianceWarVoApi.isJoin() && (!Api.allianceWarVoApi.getMyInfo())) {
                            App.CommonUtil.addIconToBDOC(warBtn);
                        }
                        else {
                            App.CommonUtil.removeIconFromBDOC(warBtn);
                        }
                    }
                }
            }
            if (Api.switchVoApi.checkAllianceweekend()) {
                var weekBtn = this._btnNode.getChildByName("week");
                var weekimgName = this._btnNode.getChildByName("weekimgName");
                App.CommonUtil.removeIconFromBDOC(weekBtn);
                if (weekBtn) {
                    if (allianceVo.level >= Config.AllianceweekendCfg.allianceLv) {
                        this._speakTF.alpha = 0;
                        this._speakTail.alpha = 0;
                        this._speakBg.alpha = 0;
                        // App.DisplayUtil.changeToNormal(weekBtn);
                        // App.DisplayUtil.changeToNormal(weekimgName);
                        if (Api.allianceWeekVoApi.checkActivityStart()) {
                            App.DisplayUtil.changeToNormal(weekBtn);
                            App.DisplayUtil.changeToNormal(weekimgName);
                            if (Api.myAllianceWeekVoApi.checkUserJoinAllianceTime()) {
                                if (Api.allianceWeekVoApi.checkBattleTime()) {
                                    this._speakTF.alpha = 1;
                                    this._speakTail.alpha = 1;
                                    this._speakBg.alpha = 1;
                                    this._speakStr = LanguageManager.getlocal("allianceWeekEndViewAcTimeTip");
                                }
                                else if (Api.allianceWeekVoApi.checkRestTime()) {
                                    this._speakTF.alpha = 1;
                                    this._speakTail.alpha = 1;
                                    this._speakBg.alpha = 1;
                                    this._speakStr = LanguageManager.getlocal("allianceWeekEndViewRestBattleTip", [Api.allianceWeekVoApi.getRestTime()]);
                                }
                                else if (Api.allianceWeekVoApi.checkIsHasExtraTime() && Api.myAllianceWeekVoApi.checkShowDot() && Api.myAllianceWeekVoApi.getScore() > 0) {
                                    this._speakTF.alpha = 1;
                                    this._speakTail.alpha = 1;
                                    this._speakBg.alpha = 1;
                                    this._speakStr = LanguageManager.getlocal("allianceWeekEndViewHasRewardsReceiveTip");
                                }
                                if (((!Api.allianceWeekVoApi.checkIsHasExtraTime()) && Api.myAllianceWeekVoApi.checkShowDot()) || (Api.allianceWeekVoApi.checkIsHasExtraTime() && Api.myAllianceWeekVoApi.checkShowDot() && Api.myAllianceWeekVoApi.getScore() > 0) || Api.allianceWeekVoApi.checkInBattleRedDot()) {
                                    App.CommonUtil.addIconToBDOC(weekBtn);
                                }
                            }
                        }
                        else {
                            App.DisplayUtil.changeToGray(weekBtn);
                            App.DisplayUtil.changeToGray(weekimgName);
                        }
                    }
                    else {
                        App.DisplayUtil.changeToGray(weekBtn);
                        App.DisplayUtil.changeToGray(weekimgName);
                        this._speakTF.alpha = 0;
                        this._speakTail.alpha = 0;
                        this._speakBg.alpha = 0;
                    }
                }
            }
        }
        var buildBtn = this._btnNode.getChildByName("build");
        if (buildBtn) {
            if (Api.allianceVoApi.checkDonateRed()) {
                App.CommonUtil.addIconToBDOC(buildBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(buildBtn);
            }
        }
        // if (Api.switchVoApi.checkOpenMonthcardDonate())
        // {
        // 	let buildBtn = <BaseButton>this._btnNode.getChildByName("build");
        // 	if (buildBtn)
        // 	{
        // 		if (Api.allianceVoApi.isShowFreeBuidRed())
        // 		{
        // 			App.CommonUtil.addIconToBDOC(buildBtn);
        // 		}
        // 		else
        // 		{
        // 			App.CommonUtil.removeIconFromBDOC(buildBtn);
        // 		}
        // 	}
        // }
    };
    AllianceView.prototype.getRuleInfoParam = function () {
        var zoneStr = 24;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour;
        return [zoneStr + ""];
    };
    AllianceView.prototype.checkArrowBtnRed = function (isRed) {
        // let btnScrollView = <ScrollView>this._bottomContiner.getChildByName("btnScrollView");
        // let scroL = btnScrollView.scrollLeft;
        // let maxSLeft = btnScrollView.getMaxScrollLeft();
        if (this._arrow_leftBtn.isEnable()) {
            // App.CommonUtil.addIconToBDOC(this._arrow_leftBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._arrow_leftBtn);
        }
        if (this._arrow_rightBtn.isEnable() && isRed) {
            App.CommonUtil.addIconToBDOC(this._arrow_rightBtn);
            var red = this._arrow_rightBtn.getChildByName("reddot");
            red.x = 5;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._arrow_rightBtn);
        }
    };
    AllianceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_alliancerechargetotal-1_name", "alliance_bg1", "alliance_attbg", "alliance_level", "alliance_noticebg", "recharge_fnt",
            "alliance_notice", "arena_bottom",
            "arena_arrow", "arena_bottom_bg", "arena_more_down", "arena_more",
            "alliance_manageicon", "alliance_manage", "alliance_buildicon",
            "alliance_build", "alliance_memicon", "alliance_mem", "alliance_exicon",
            "alliance_ex", "alliance_bossicon", "alliance_boss", "allianc_rankicon", "alliance_rank", "alliance_waricon", "alliance_war",
            "alliance_iconbg", "dinner_rank_titlebg", "dinner_line", "progress9", "progress9_bg",
            "rankinglist_line", "rankinglist_rankbg", "story_npc_8", "alliance_taskicon", "alliance_task",
            "allianceview_treasure", "ac_alliancerechargecount-1_name", "ac_alliancerechargecount-1_icon",
            "mainui_iconani", "ac_alliancerechargetotal-1_icon", "alliance_log_btn",
            "allianceweekendview_name",
            "allianceweekendview_icon",
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
    AllianceView.prototype.getExtraRuleInfo = function () {
        var params = [];
        var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour;
        params.push(String(zoneStr));
        if (Api.switchVoApi.checkOpenRankActive()) {
            params.push(LanguageManager.getlocal("allianceRuleInfoPart1"));
        }
        else {
            params.push("");
        }
        return LanguageManager.getlocal("allianceRuleInfoSpell", params);
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
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH, this.refreshBtnStatus, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2, this.refreshBtnStatus, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETWEEKDETAILS, this.weekEndHandle, this);
        this._wordbg = null;
        this._wordbgCor = null;
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
        this.bottomBg = null;
        this._bBg = null;
        ;
        this.allianceVo = null;
        this.moveContainer = null;
        this._describeTxt = null;
        this._strTxt = null;
        this._touchBg = null;
        this._bottomBtnCfg = null;
        this._btnNode = null;
        this._topBtnCfg = [];
        this._topBtnContiner = null;
        this._public_dot = null;
        this._needShowGuide = false;
        if (this._empCircle) {
            egret.Tween.removeTweens(this._empCircle);
        }
        this._empCircle = null;
        this._dotX = 0;
        this._dotY = 0;
        this._dotX2 = 0;
        this._dotY2 = 0;
        this._public_dot2 = null;
        this._public_dot3 = null;
        this._dotTF = null;
        this._messageRefresh = false;
        this._speakStr = null;
        this._speakTF = null;
        this._speakTail = null;
        this._speakBg = null;
        this._messageLength = 0;
        this._isShowFlag1 = 0;
        this._isShowFlag2 = 0;
        this._expLogBtn = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKeyExchange);
        this._mainTaskHandKeyExchange = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKeyBuild);
        this._mainTaskHandKeyBuild = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceView;
}(CommonView));
//# sourceMappingURL=AllianceView.js.map