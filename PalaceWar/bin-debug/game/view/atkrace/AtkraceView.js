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
var AtkraceView = /** @class */ (function (_super) {
    __extends(AtkraceView, _super);
    function AtkraceView() {
        var _this = _super.call(this) || this;
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this._curServant = null;
        _this._infoContainer = null;
        /**
         * 倒计时
         */
        _this._countDownTime = 0;
        _this._countDownText = null;
        _this.listconditions = null;
        _this._fightflag = null;
        _this._atkraceInfoVoList = [];
        _this.bottomBg = null;
        _this._currMaskBmp = null;
        _this.touchBoo = true;
        _this.moreBg = null;
        _this.describeTxt = null;
        _this.moveContainer = null;
        _this.isData = false;
        _this._touchBg = null;
        _this._nameTxt = null;
        _this._mainTaskHandKey = null;
        _this._avoidButton = null;
        _this._fameButton = null;
        _this._mainTaskHandKey1 = null;
        return _this;
    }
    AtkraceView.prototype.showGuideAgain = function () {
        return "atkrace_2";
    };
    AtkraceView.prototype.clickGuideAgain = function () {
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
            _super.prototype.clickGuideAgain.call(this);
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
            this._mainTaskHandKey1 = null;
        }
        else {
            var str = LanguageManager.getlocal("showGuideAgainTip_atkrace");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: str,
                callback: this.clickRuleBtnHandler,
                handler: this,
                needCancel: false
            });
        }
    };
    Object.defineProperty(AtkraceView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AtkraceView.prototype.getBigFrame = function () {
        return null;
    };
    AtkraceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "rankinglist_line",
            "arena_bg", "forpeople_bottom", "arena_bottom", "atkrace_morale",
            "arena_arrow", "arena_bottom_bg", "arena_more_down", "arena_more", "arena_rank", "arena_rank_text", "arena_visit", "arena_visit_text",
            "servant_mask", "dinner_line",
            "guide_hand",
            "atkraceservantavoid_buttonicon",
            "atkracefame_famebtn",
            "atkracefame_famebtn_down"
        ]);
    };
    // 规则说明内容
    AtkraceView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenRevengeList()) {
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                return "atkraceInfo2_withOpenRefusal";
            }
            return "atkraceInfo2";
        }
        else {
            return "atkraceInfo";
        }
    };
    AtkraceView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + ""];
    };
    AtkraceView.prototype.getExtraRuleInfo = function () {
        var params = [];
        if (Api.switchVoApi.checkOpenRevengeList()) {
            params.push(LanguageManager.getlocal("atkraceInfoPart2"));
        }
        else {
            params.push(LanguageManager.getlocal("atkraceInfoPart1"));
        }
        var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        params.push(String(zoneStr));
        if (Api.switchVoApi.checkServantRefuseBattle()) {
            params.push(LanguageManager.getlocal("atkraceInfoPart3"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkAutoAtkrace()) {
            params.push(LanguageManager.getlocal("atkraceInfoPart4"));
        }
        else {
            params.push("");
        }
        return LanguageManager.getlocal("atkraceInfoSpell", params);
    };
    AtkraceView.prototype.getBgName = function () {
        return "arena_bg";
    };
    // 初始化背景
    AtkraceView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
        }
    };
    AtkraceView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ATKRACE_INDEX, requestData: {} };
    };
    AtkraceView.prototype.receiveData = function (data) {
        if (data.data.data.fightflag == false) {
            this._fightflag = false;
        }
        else {
            this._fightflag = true;
        }
        if (this._infoContainer) {
            this.resetInfo();
        }
    };
    AtkraceView.prototype.initView = function () {
        Api.rookieVoApi.checkNextStep();
        if (Api.rookieVoApi.curGuideKey == "atkrace" && Api.rookieVoApi.isGuiding == false) {
            Api.rookieVoApi.removeWaitingGuide();
        }
        Api.mainTaskVoApi.checkShowGuide();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.battleCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);
        this.initBottom();
        this.resetInfo();
        //门客免战按钮
        if (Api.switchVoApi.checkServantRefuseBattle() && Api.atkraceVoApi.checkHaveAvoidServant()) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_AVOIDREDPOINT, this.servantAvoidHandle, this);
            this._avoidButton = ComponentManager.getButton("atkraceservantavoid_buttonicon", null, this.clickServantAvoid, this, null, 0);
            this._avoidButton.setPosition(GameConfig.stageWidth - this._avoidButton.width - 24, 100 - this.container.y);
            this.addChildToContainer(this._avoidButton);
            this.checkAvoidReddot();
        }
        //门客名望按钮
        if (Api.switchVoApi.checkServantFame()) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.checkFameReddot, this);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ATKRACE_FIGHT, this.checkFameReddot, this);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT, this.checkFameReddot, this);
            this._fameButton = ComponentManager.getButton("atkracefame_famebtn", null, function () {
                ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEFAMEVIEW);
            }, this, null, 0);
            this._fameButton.setPosition(GameConfig.stageWidth - this._fameButton.width - 24, GameConfig.stageHeigth - 320);
            this.addChild(this._fameButton);
            this.checkFameReddot();
        }
        //检查有没有没有领取的奖励
        if (this._fightflag) {
            var rewardc = Api.atkraceVoApi.getRewardc();
            if (rewardc && rewardc.flag && rewardc.flag > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW, {});
            }
        }
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.useCallback, this);
    };
    //重置信息
    AtkraceView.prototype.resetInfo = function () {
        // this.closeList();
        this._countDownTime = 0;
        if (this._infoContainer) {
            this.removeChildFromContainer(this._infoContainer);
            this._infoContainer = null;
        }
        if (this._countDownText) {
            this._countDownText = null;
        }
        this._infoContainer = new BaseDisplayObjectContainer();
        this._infoContainer.y = GameConfig.stageHeigth - 1136;
        this.addChildToContainer(this._infoContainer);
        //是否无法出战
        if (this._fightflag == false) {
            //对话框
            var wordsBg = BaseBitmap.create("public_9_bg25");
            wordsBg.width = 260;
            wordsBg.height = 78;
            wordsBg.setPosition(GameConfig.stageWidth / 2 - wordsBg.width / 2, 250);
            this._infoContainer.addChild(wordsBg);
            var wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
            wordsCornerBg.x = wordsBg.x + wordsBg.width / 2 + 20;
            wordsCornerBg.y = wordsBg.y + wordsBg.height - 3;
            this._infoContainer.addChild(wordsCornerBg);
            var wordsText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceNoServant"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            wordsText.width = 224;
            wordsText.lineSpacing = 6;
            wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.width / 2, wordsBg.y + wordsBg.height / 2 - wordsText.height / 2);
            this._infoContainer.addChild(wordsText);
        }
        else {
            //检查是否已有门客
            var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
            if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
                //有门客
                var sid = myAtkInfo.mesid.sid;
                var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
                servantFullImg.width = 405;
                servantFullImg.height = 467;
                servantFullImg.x = GameConfig.stageWidth / 2 - servantFullImg.width / 2;
                servantFullImg.y = this.viewBg.height - 180 - servantFullImg.height;
                this._infoContainer.addChild(servantFullImg);
                servantFullImg.addTouchTap(this.clickServant, this);
                //对话框
                var wordsBg = BaseBitmap.create("public_9_bg25");
                wordsBg.width = 260;
                wordsBg.height = 78;
                wordsBg.setPosition(GameConfig.stageWidth / 2 - wordsBg.width / 2, servantFullImg.y - 80);
                this._infoContainer.addChild(wordsBg);
                var wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
                wordsCornerBg.x = wordsBg.x + wordsBg.width / 2 + 20;
                wordsCornerBg.y = wordsBg.y + wordsBg.height - 3;
                this._infoContainer.addChild(wordsCornerBg);
                var textStr = void 0;
                if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
                    textStr = LanguageManager.getlocal("arenaServantSpeak2");
                }
                else {
                    textStr = LanguageManager.getlocal("arenaServantSpeak1", [LanguageManager.getlocal("servant_name" + myAtkInfo.mesid.sid)]);
                }
                var wordsText = ComponentManager.getTextField(textStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                wordsText.width = 224;
                wordsText.lineSpacing = 6;
                wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.width / 2, wordsBg.y + wordsBg.height / 2 - wordsText.height / 2);
                this._infoContainer.addChild(wordsText);
                this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(this._infoContainer, servantFullImg.x + servantFullImg.width / 2 - 20, servantFullImg.y + 140, [servantFullImg], 601, true, function () {
                    return true;
                }, this);
            }
            else {
                //出战次数
                var maxCount = Config.AtkraceCfg.getDailyNum();
                var myInfo = Api.atkraceVoApi.getMyInfo();
                //对话框
                var wordsBg = BaseBitmap.create("public_9_bg25");
                wordsBg.width = 260;
                wordsBg.height = 78;
                wordsBg.setPosition(GameConfig.stageWidth / 2 - wordsBg.width / 2, 250);
                this._infoContainer.addChild(wordsBg);
                var wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
                wordsCornerBg.x = wordsBg.x + wordsBg.width / 2 + 20;
                wordsCornerBg.y = wordsBg.y + wordsBg.height - 3;
                this._infoContainer.addChild(wordsCornerBg);
                var myNum = myInfo.num;
                var textStr = void 0;
                if (myNum >= maxCount) {
                    //次数已满
                    var lv60plus = Api.servantVoApi.getServantCountLevel60Plus();
                    var extraCoefficient = Config.AtkraceCfg.getParameter1();
                    var extraMax = Math.floor(lv60plus / extraCoefficient);
                    if (myInfo.extranum >= extraMax) {
                        //没次数了
                        textStr = LanguageManager.getlocal("arenaMaxNum");
                        wordsBg.addTouchTap(this.clickDialog2, this);
                    }
                    else {
                        textStr = LanguageManager.getlocal("arenaAddNum", [myInfo.extranum.toString(), extraMax.toString()]);
                        wordsBg.addTouchTap(this.clickDialog, this);
                    }
                    var wordsText = ComponentManager.getTextField(textStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                    wordsText.width = 224;
                    wordsText.lineSpacing = 6;
                    wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.width / 2, wordsBg.y + wordsBg.height / 2 - wordsText.height / 2);
                    this._infoContainer.addChild(wordsText);
                }
                else {
                    //倒计时
                    this._countDownTime = myInfo.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                    var wordsText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceCountDowning"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                    wordsText.width = 224;
                    wordsText.lineSpacing = 6;
                    wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.width / 2, wordsBg.y + wordsBg.height / 2 - wordsText.height / 2 - 15);
                    this._infoContainer.addChild(wordsText);
                    this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_RED);
                    this._countDownText.setPosition(wordsBg.x + wordsBg.width / 2 - this._countDownText.width / 2, wordsText.y + wordsText.height + 7);
                    this._infoContainer.addChild(this._countDownText);
                }
            }
        }
    };
    AtkraceView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AtkraceView.prototype.tick = function () {
        if (this._countDownText) {
            this._countDownTime--;
            this._countDownText.text = this.getCountTimeStr();
            if (this._countDownTime < 0) {
                this.refreshServant();
            }
        }
    };
    AtkraceView.prototype.refreshServant = function () {
        this.request(NetRequestConst.REQUEST_ATKRACE_INDEX, {});
    };
    AtkraceView.prototype.initGuideAgain = function () {
        if (Api.switchVoApi.checkOpenGuideAgain() && this.showGuideAgain()) {
            this._guideBtn = ComponentManager.getButton("guide_btn", "", this.clickGuideAgain, this);
            this._guideBtn.x = 12 + (this._ruleBtn ? 70 : 0);
            this._guideBtn.y = 30;
            this.addChildAt(this._guideBtn, this.getChildIndex(this._ruleBtn));
        }
    };
    //底部
    AtkraceView.prototype.initBottom = function () {
        var bottom = BaseBitmap.create("arena_bottom");
        bottom.height = 94;
        var maskDown = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
        this.addChild(maskDown);
        this.swapChildren(maskDown, this.container);
        //来访消息
        var visitBg = ComponentManager.getButton("forpeople_bottom", null, this.visitHandle, this, null, 0);
        visitBg.setPosition(24, GameConfig.stageHeigth - 200);
        this.addChild(visitBg);
        var visitIcon = BaseBitmap.create("arena_visit");
        visitIcon.setPosition(visitBg.width / 2 - visitIcon.width / 2, visitBg.height / 2 - visitIcon.height / 2 - 5);
        visitBg.addChild(visitIcon);
        var visitText = BaseBitmap.create("arena_visit_text");
        visitText.setPosition(visitBg.width / 2 - visitText.width / 2, visitIcon.y + visitIcon.height - 30);
        visitBg.addChild(visitText);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            //排行榜
            var rankBg = ComponentManager.getButton("forpeople_bottom", null, this.rankHandle, this, null, 0);
            rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 24, visitBg.y);
            this.addChild(rankBg);
            var rankIcon = BaseBitmap.create("arena_rank");
            rankIcon.setPosition(rankBg.width / 2 - rankIcon.width / 2, rankBg.height / 2 - rankIcon.height / 2 - 5);
            rankBg.addChild(rankIcon);
            var rankText = BaseBitmap.create("arena_rank_text");
            rankText.setPosition(rankBg.width / 2 - visitText.width / 2, rankIcon.y + rankIcon.height - 30);
            rankBg.addChild(rankText);
        }
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);
        this.bottomBg = bottom;
        var showMore = ComponentManager.getButton("arena_more", null, this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - bottom.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, GameConfig.stageHeigth - bottom.height / 2 - this._moreArrow.height / 2);
        this.addChild(this._moreArrow);
        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this, showMore.x + showMore.width / 2, showMore.y + showMore.height / 2, [showMore], 603, true, function () {
            return true;
        }, this);
        var hand = App.MainTaskHandUtil.getHand(this._mainTaskHandKey);
        if (hand && hand.hand) {
            hand.hand.rotation = 200;
        }
    };
    AtkraceView.prototype.visitHandle = function () {
        Api.rookieVoApi.checkNextStep();
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
    };
    AtkraceView.prototype.rankHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACERANKLISTVIEW);
    };
    AtkraceView.prototype.showMoreHandle = function () {
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
    //门客免战红点
    AtkraceView.prototype.checkAvoidReddot = function () {
        if (Api.atkraceVoApi.checkOpenAvoidReddot()) {
            App.CommonUtil.addIconToBDOC(this._avoidButton);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._avoidButton);
        }
    };
    //门客名望红点
    AtkraceView.prototype.checkFameReddot = function () {
        if (Api.atkraceVoApi.checkHaveServantCanUpFame()) {
            App.CommonUtil.addIconToBDOC(this._fameButton);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._fameButton);
        }
    };
    AtkraceView.prototype.clickServantAvoid = function () {
        NetManager.request(NetRequestConst.REQUEST_SERVANT_AVOIDREDPOINT, null);
    };
    AtkraceView.prototype.servantAvoidHandle = function () {
        var servantInfoList = [];
        var allAvoidServantList = Config.ServantCfg.getCanAvoidServantList();
        for (var index = 0; index < allAvoidServantList.length; index++) {
            var servantId = allAvoidServantList[index];
            var servantObj = Api.servantVoApi.getServantObj(servantId);
            var servantInfo = {};
            if (servantObj) {
                servantInfo = { servantId: servantObj.servantId, servantName: servantObj.servantName, level: servantObj.level, totalValue: servantObj.total, avoidState: servantObj.avoid || 1, qualityBoxImgPath: servantObj.qualityBoxImgPath, halfImgPath: servantObj.halfImgPath, banishSt: servantObj.banishSt };
            }
            else {
                var servantCfg = Config.ServantCfg.getServantItemById(servantId);
                servantInfo = { servantId: servantCfg.id, servantName: servantCfg.name, level: 0, totalValue: 0, avoidState: 0, qualityBoxImgPath: "servant_cardbg_0", halfImgPath: servantCfg.halfIcon, banishSt: 0 };
            }
            servantInfoList.push(servantInfo);
        }
        servantInfoList.sort(function (a, b) {
            if (a.avoidState && !b.avoidState) {
                return -1;
            }
            else if (!a.avoidState && b.avoidState) {
                return 1;
            }
            else {
                return Number(a.servantId) - Number(b.servantId);
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESERVANTAVOIDPOPUPVIEW, { servantList: servantInfoList });
        this.checkAvoidReddot();
    };
    //点击门客 进入战斗
    AtkraceView.prototype.clickServant = function () {
        if (Api.rookieVoApi.isGuiding && Api.rookieVoApi.curStep == "atkrace_4") {
            return;
        }
        Api.rookieVoApi.checkNextStep();
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEARRESTVIEW);
        }
        else {
            var nameStr = myAtkInfo.getFName();
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW, { type: 1, name: nameStr, sid: myAtkInfo.mesid.sid, uid: myAtkInfo.uid, allianceId: myAtkInfo.fallianceId });
        }
    };
    AtkraceView.prototype.doGuide = function (event) {
        // if (event && event.data)
        // {
        // 	let id =  event.data.id;
        // 	if (id == "atkrace_7" || id == "atkrace_6" )
        // 	{
        // 		this.clickServant();
        // 	}
        // }
    };
    AtkraceView.prototype.battleCallback = function () {
        this.resetInfo();
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.useCallback, this);
    };
    AtkraceView.prototype.clickDialog2 = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
    };
    AtkraceView.prototype.clickDialog = function () {
        var itemId = Config.AtkraceCfg.getFightAdd();
        var needNum = 1;
        var itemVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        var numItem = 0;
        if (itemVo) {
            numItem = itemVo.num;
        }
        var message = LanguageManager.getlocal("atkRace_buyChallenge", [LanguageManager.getlocal("itemName_" + itemId)]);
        var mesObj = {
            confirmCallback: this.buyChallenge,
            handler: this,
            icon: "itemicon" + itemId,
            iconBg: Config.ItemCfg.getItemCfgById(itemId).iconBg,
            num: numItem,
            useNum: needNum,
            msg: message,
            id: itemId
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    AtkraceView.prototype.buyChallenge = function () {
        this.request(NetRequestConst.REQUEST_ATKRACE_USEEXTRA, {});
    };
    AtkraceView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            this._atkraceInfoVoList = event.data.data.data.atklist;
            this.showText();
            this.refreshText();
            if (this.listconditions) {
                this.listconditions.visible = false;
            }
            if (this._atkraceInfoVoList.length > 0) {
                this.isData = true;
            }
            else {
                this.isData = false;
            }
        }
        else {
            this.isData = false;
        }
    };
    AtkraceView.prototype.showText = function () {
        if (this.describeTxt == null) {
            var describeTxt = null;
            describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            describeTxt.width = 450;
            describeTxt.x = 20;
            describeTxt.y = GameConfig.stageHeigth - 40;
            this.describeTxt = describeTxt;
            this.addChild(describeTxt);
        }
        if (this._nameTxt == null) {
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            nameTxt.x = 20;
            nameTxt.y = GameConfig.stageHeigth - 67;
            this.addChild(nameTxt);
            this._nameTxt = nameTxt;
        }
    };
    AtkraceView.prototype.refreshText = function () {
        if (this._atkraceInfoVoList.length > 0 && this._atkraceInfoVoList[0].info) {
            var data = this._atkraceInfoVoList[0];
            //击败｜｜全歼
            var str = "";
            if (this.isData && data.info.type == 1) {
                str = LanguageManager.getlocal("atkracebeat");
            }
            else {
                str = LanguageManager.getlocal("atkraceAnnihilation");
            }
            var currName = Config.ServantCfg.getServantItemById(data.info.sid).name;
            if (data.info.streak && data.info.streak >= 3) {
                var desStr = "actrackStraight";
                if (data.info.atype && data.info.atype == 2) {
                    desStr = "actrackStraight_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr = "actrackStraight_4"; //追杀  全歼了
                }
                else if (data.info.atype && data.info.atype == 3) {
                    desStr = "actrackStraight_3"; //追杀  全歼了
                }
                this.describeTxt.text = LanguageManager.getlocal(desStr, [LanguageManager.getlocal("actrackservant"), currName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
            }
            else {
                var desStr2 = "actrackDescription";
                if (data.info.atype && data.info.atype == 2) {
                    desStr2 = "actrackDescription_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr2 = "actrackStraight_4_2"; //追杀 
                }
                else if (data.info.atype && data.info.atype == 3) {
                    desStr2 = "actrackDescription_3"; //追杀 
                }
                this.describeTxt.text = LanguageManager.getlocal(desStr2, [LanguageManager.getlocal("actrackservant"), currName, str, data.info.uname2, data.info.fightnum]);
            }
            if (this._nameTxt) {
                this._nameTxt.text = this._atkraceInfoVoList[0].info.name;
            }
        }
    };
    AtkraceView.prototype.showList = function () {
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
        if (this.isData) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 10, 640, GameConfig.stageHeigth - 340);
            this._scrollList = ComponentManager.getScrollList(ActrackMoreItem, this._atkraceInfoVoList, rect);
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
        //描述文字：击败门客20
        var num = Config.AtkraceCfg.getbeatNum();
        var listconditions = ComponentManager.getTextField(LanguageManager.getlocal("atkracelistconditions", [num + ""]), 20);
        listconditions.x = 100;
        listconditions.y = GameConfig.stageHeigth - 50;
        this.addChild(listconditions);
        this.listconditions = listconditions;
        if (this.listconditions) {
            this.listconditions.visible = false;
        }
        if (this.describeTxt) {
            this.describeTxt.visible = false;
            this._nameTxt.visible = false;
        }
        egret.Tween.get(this.moveContainer).to({ y: 250 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
            if (this.listconditions) {
                this.listconditions.visible = true;
            }
            // if(this.isData){
            // 	this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
            // 		this,
            // 		this.moveContainer.x + 530,
            // 		this.moveContainer.y + 70, 
            // 		[],
            // 		603, 
            // 		true, 
            // 		function() {
            // 			let hand = App.MainTaskHandUtil.getHand(this._mainTaskHandKey);
            // 			hand.willDelete = true;
            // 			hand.hand.visible = false;
            // 			return true;
            // 		}, 
            // 		this
            // 	);
            // }
        }, this);
    };
    AtkraceView.prototype.closeList = function () {
        var _this = this;
        this.touchBoo = false;
        if (this.listconditions) {
            this.listconditions.visible = false;
        }
        if (this.describeTxt) {
            this.describeTxt.visible = true;
            this._nameTxt.visible = true;
        }
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                _this.touchBoo = true;
                egret.Tween.removeTweens(_this.moveContainer);
                _this.moveContainer.dispose();
                _this.moveContainer = null;
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
    AtkraceView.prototype.challengeCallback = function (data) {
        if (data.data.ret) {
            if (AtkraceChallengeItem.data && AtkraceChallengeItem.data.type == 1) {
                if (this.touchBoo) {
                    this.moveContainer.y = 1150;
                    this._currMaskBmp.visible = false;
                    this._isShowMore = false;
                    this.closeList();
                    this._moreArrow.scaleY = 1;
                    this._moreArrow.y = GameConfig.stageHeigth - 94 / 2 - this._moreArrow.height / 2; // this._moreArrow.height;
                }
            }
            this.refreshServant();
            this.checkFameReddot();
            ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
            this.clickServant();
        }
    };
    AtkraceView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.battleCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_AVOIDREDPOINT, this.servantAvoidHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.checkFameReddot, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ATKRACE_FIGHT, this.checkFameReddot, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT, this.checkFameReddot, this);
        this._moreArrow = null;
        this._isShowMore = false;
        this._curServant = null;
        this._infoContainer = null;
        this._countDownTime = 0;
        this._countDownText = null;
        this._fightflag = null;
        this._currMaskBmp = null;
        this.moreBg = null;
        this.moveContainer = null;
        this.touchBoo = true;
        this.listconditions = null;
        this.describeTxt = null;
        this._touchBg = null;
        this._nameTxt = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceView;
}(CommonView));
//# sourceMappingURL=AtkraceView.js.map