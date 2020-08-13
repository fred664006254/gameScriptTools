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
var NewAtkracecrossView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossView, _super);
    function NewAtkracecrossView() {
        var _this = _super.call(this) || this;
        _this._moreArrow = null;
        _this.bottomBg = null;
        _this._isShowMore = false;
        _this.touchBoo = true;
        _this.moveContainer = null;
        _this.listconditions = null;
        _this.describeTxt = null;
        _this._nameTxt = null;
        _this._currMaskBmp = null;
        _this._touchBg = null;
        _this.moreBg = null;
        _this.isData = false;
        _this._scrollList = null;
        _this._atkraceInfoVoList = [];
        _this._topBg = null;
        _this._scoreTextTab = [];
        _this._listconditions = null;
        _this._rewwardTime = null;
        _this._rewardCDTime = 0;
        _this._countDownTime = 0;
        _this._infoContainer = null;
        _this._countDownText = null;
        _this._fightflag = null;
        _this._topType = 0; // 顶部显示类型， 1:两个服， 2:多个服
        _this._serverList = null;
        _this._chatTxt = null;
        _this.awardBtn = null;
        _this._fameBtn = null;
        _this._isCanJoin = false;
        _this._isFightEnd = false;
        return _this;
    }
    NewAtkracecrossView.prototype.getTitleBgName = function () {
        return null;
    };
    NewAtkracecrossView.prototype.getTitleStr = function () {
        return null;
    };
    NewAtkracecrossView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    NewAtkracecrossView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    NewAtkracecrossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "newcrossatkrace_bg2", "atkracecross_award_text", "atkracecross_award", "atkracecross_loss", "atkracecross_top", "atkracecross_win",
            "atkrace_morale", "atkracecross_rankbg", "atkracecross_rank", "newcrossatkrace_buff", "newcrossatkrace_bufftext",
            "sixsectionmainui_bottombg", "servant_mask", "arena_visit", "arena_visit_text", "forpeople_bottom", "arena_rank", "arena_rank_text",
            "rankinglist_line", "arena_bottom_bg", "newcrossatkrace_title", "rankinglist_rankbg", "newcrossatkrace_moretxt", "newcrossatkrace_downflag", "newcrossatkrace_famebtn_name", "newcrossatkrace_famebtn_icon",
        ]);
    };
    //规则说明内容
    NewAtkracecrossView.prototype.getRuleInfo = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        var key = "newatkracecross_rule";
        // if(Api.switchVoApi.checkServantRefuseBattle()){
        // 	key = "atkracecrossInfo_withOpenRefusal";
        // }
        return App.CommonUtil.getCrossLeagueCn(key, crossVo.isCrossLeague());
    };
    NewAtkracecrossView.prototype.getRuleInfoParam = function () {
        var cfg = Api.atkracecrossVoApi.getNewCrossCfg();
        return [String(cfg.lowerLimit2), String(cfg.lowerLimit3)];
    };
    NewAtkracecrossView.prototype.getBgName = function () {
        return "newcrossatkrace_bg2";
    };
    Object.defineProperty(NewAtkracecrossView.prototype, "vo", {
        get: function () {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.param.data.code);
            return crossVo;
        },
        enumerable: true,
        configurable: true
    });
    // 初始化背景
    NewAtkracecrossView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
            // let bg2 = BaseBitmap.create("newcrossatkrace_bg3");
            // bg2.y = this.viewBg.y+this.viewBg.height-bg2.height;
            // this.addChild(bg2); 
        }
    };
    NewAtkracecrossView.prototype.getRequestData = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        var timeNumber2 = 3600 * 24;
        if (crossVo.et - GameData.serverTime <= timeNumber2) {
            this._isFightEnd = true;
        }
        return { requestType: NetRequestConst.REQUEST_NEWATKRACECROSS_INDEX, requestData: { activeId: crossVo.aidAndCode } };
    };
    NewAtkracecrossView.prototype.receiveData = function (data) {
        if (data.data.data.fightflag == false) {
            this._fightflag = false;
        }
        else {
            this._fightflag = true;
        }
        Api.atkracecrossVoApi.zonerankinfos = data.data.data.zonerankinfos;
        // Api.atkracecrossVoApi.zonerankinfos = [{zid:1,point:99},{zid:3,point:992}];
        if (this._topType == 2 && this._serverList && Api.atkracecrossVoApi.zonerankinfos) {
            this._serverList.refreshData(Api.atkracecrossVoApi.zonerankinfos);
        }
        else if (this._topType == 1 && this._scoreTextTab.length > 0 && Api.atkracecrossVoApi.zonerankinfos) {
            for (var i = 0; i < this._scoreTextTab.length; i++) {
                var zonerankinfos = Api.atkracecrossVoApi.zonerankinfos;
                var myServerInfo = void 0;
                var otherSerInfo = void 0;
                if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
                    myServerInfo = zonerankinfos[0];
                    otherSerInfo = zonerankinfos[1];
                }
                else {
                    myServerInfo = zonerankinfos[1];
                    otherSerInfo = zonerankinfos[0];
                }
                this._scoreTextTab[0].text = String(myServerInfo.point);
                this._scoreTextTab[1].text = String(otherSerInfo.point);
            }
            this._scoreTextTab[1].setPosition(GameConfig.stageWidth - 110 - this._scoreTextTab[1].width, this._scoreTextTab[0].y);
        }
        if (data.data.data.iscanjoin == 0) {
            this._isCanJoin = false;
        }
        else {
            this._isCanJoin = true;
        }
        Api.atkracecrossVoApi.isCanJoin = this._isCanJoin;
        if (this._infoContainer) {
            this.resetInfo();
        }
    };
    Object.defineProperty(NewAtkracecrossView.prototype, "crossVo", {
        get: function () {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.param.data.code);
            return crossVo;
        },
        enumerable: true,
        configurable: true
    });
    NewAtkracecrossView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS, this.battleCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND, this.fightendCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_REVENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_KILL), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_REFRESH), this.refreshServant, this);
        Api.acVoApi.isHandled_BI = false;
        Api.acVoApi.isHandled_LRP = false;
        Api.acVoApi.isHandled_ILI = false;
        var titlePic = BaseBitmap.create(App.CommonUtil.getCrossLeagueRes("newcrossatkrace_title", this.crossVo.isCrossLeague()));
        titlePic.setScale(0.8);
        titlePic.setPosition(GameConfig.stageWidth / 2 - titlePic.width * 0.8 / 2, 0);
        this.addChild(titlePic);
        this.container.y = titlePic.y + titlePic.height * 0.8 - 15;
        this.initBottom();
        if (Api.atkracecrossVoApi.zonerankinfos.length != 2) {
            this.initTop2();
        }
        else {
            this.initTop1();
        }
        //检查有没有没有领取的奖励
        if (this._fightflag && this._isCanJoin && this._isFightEnd == false) {
            var rewardc = Api.atkracecrossVoApi.getRewardc();
            if (rewardc && rewardc.flag && rewardc.flag > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSREWARDPOPUPVIEW, {});
            }
        }
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_LIST, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_LIST), this.useCallback, this);
        if ((this._isCanJoin || this._isFightEnd) && this.crossVo.getSids().length > 0) {
            this.resetInfo();
        }
        else {
            this.initCannotJoin();
        }
    };
    //重置信息
    NewAtkracecrossView.prototype.resetInfo = function () {
        this._countDownTime = 0;
        if (this._infoContainer) {
            this.removeChildFromContainer(this._infoContainer);
            this._infoContainer = null;
        }
        if (this._countDownText) {
            this._countDownText = null;
        }
        this._infoContainer = new BaseDisplayObjectContainer();
        this._infoContainer.y = GameConfig.stageHeigth - 1136 - 15;
        this.addChildToContainer(this._infoContainer);
        //是否无法出战
        if (this._fightflag == false) {
            //对话框
            var wordsBg = BaseBitmap.create("public_9_bg25");
            wordsBg.width = 260;
            wordsBg.height = 78;
            wordsBg.setPosition(GameConfig.stageWidth / 2 - wordsBg.width / 2, 250 + 1136 - GameConfig.stageHeigth);
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
        else if (this._isFightEnd == false) {
            //检查是否已有门客
            var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
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
            }
            else {
                //出战次数
                var itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code);
                var maxCount = itemCfg.getDailyNum();
                var myInfo = Api.atkracecrossVoApi.getMyInfo();
                //对话框
                var wordsBg = BaseBitmap.create("public_9_bg25");
                wordsBg.width = 260;
                wordsBg.height = 78;
                wordsBg.setPosition(GameConfig.stageWidth / 2 - wordsBg.width / 2, 250 + 1136 - GameConfig.stageHeigth);
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
                    var extraCoefficient = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code).getParameter1();
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
                    this._countDownTime = myInfo.lasttime + Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code).getIntervalTime() - GameData.serverTime;
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
        else {
            this.initResult();
        }
    };
    NewAtkracecrossView.prototype.clickDialog2 = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
    };
    NewAtkracecrossView.prototype.clickDialog = function () {
        var itemId = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code).getFightAdd();
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
    NewAtkracecrossView.prototype.buyChallenge = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_USEEXTRA, { activeId: crossVo.aidAndCode });
    };
    //点击门客 进入战斗
    NewAtkracecrossView.prototype.clickServant = function () {
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSARRESTVIEW, { f: this.refreshServant, o: this });
        }
        else {
            var nameStr = myAtkInfo.getFName();
            ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSAGREEPOPUPDIALOG, { type: 1, name: nameStr, sid: myAtkInfo.mesid.sid, f: this.refreshServant, o: this });
        }
    };
    //顶部
    NewAtkracecrossView.prototype.initTop1 = function () {
        this._topType = 1;
        this._topBg = BaseBitmap.create("atkracecross_top");
        this._topBg.y = -16;
        this.addChildToContainer(this._topBg);
        var zonerankinfos = Api.atkracecrossVoApi.zonerankinfos;
        var myServerInfo;
        var otherSerInfo;
        if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
            myServerInfo = zonerankinfos[0];
            otherSerInfo = zonerankinfos[1];
        }
        else {
            myServerInfo = zonerankinfos[1];
            otherSerInfo = zonerankinfos[0];
        }
        var server1name = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, myServerInfo.zid);
        var serverId1 = ComponentManager.getTextField(server1name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serverId1.setPosition(56 - serverId1.width / 2, this._topBg.y + 46);
        this.addChildToContainer(serverId1);
        var server2name = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, otherSerInfo.zid);
        var serverId2 = ComponentManager.getTextField(server2name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.textWidth / 2, serverId1.y);
        this.addChildToContainer(serverId2);
        this._scoreTextTab.length = 0;
        var serverScore1 = ComponentManager.getBitmapText(String(myServerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
        serverScore1.setPosition(114, this._topBg.y + 67);
        this.addChildToContainer(serverScore1);
        this._scoreTextTab.push(serverScore1);
        var serverScore2 = ComponentManager.getBitmapText(String(otherSerInfo.point), TextFieldConst.FONTNAME_ITEMTIP);
        serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
        this.addChildToContainer(serverScore2);
        this._scoreTextTab.push(serverScore2);
    };
    NewAtkracecrossView.prototype.initTop2 = function () {
        this._topType = 2;
        this._topBg = BaseBitmap.create("atkracecross_rankbg");
        this._topBg.y = -16;
        this._topBg.height = 224;
        this.addChildToContainer(this._topBg);
        var serverText = BaseBitmap.create("atkracecross_rank");
        serverText.setPosition(GameConfig.stageWidth / 2 - serverText.width / 2, this._topBg.y + 8);
        this.addChildToContainer(serverText);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(GameConfig.stageWidth / 2 - 155 - rankText.width / 2, this._topBg.y + 50);
        this.addChildToContainer(rankText);
        var qufuText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qufuText.setPosition(GameConfig.stageWidth / 2 - qufuText.width / 2, rankText.y);
        this.addChildToContainer(qufuText);
        var pointText = ComponentManager.getTextField(LanguageManager.getlocal("pointNumber"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pointText.setPosition(GameConfig.stageWidth / 2 + 155 - pointText.width / 2, rankText.y);
        this.addChildToContainer(pointText);
        var zonerankinfos = Api.atkracecrossVoApi.zonerankinfos;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 134);
        this._serverList = ComponentManager.getScrollList(AtkracecrossServerItem, zonerankinfos, rect);
        this.addChildToContainer(this._serverList);
        this._serverList.y = this._topBg.y + 80;
    };
    NewAtkracecrossView.prototype.initCannotJoin = function () {
        var cannotJoinBg = BaseBitmap.create("public_9_downbg");
        cannotJoinBg.width = 410;
        cannotJoinBg.height = 125;
        cannotJoinBg.setPosition(GameConfig.stageWidth / 2 - cannotJoinBg.width / 2, GameConfig.stageHeigth / 2 - 220);
        this.addChildToContainer(cannotJoinBg);
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        var rcannotJoinDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newAtkracecrossNotJoin", crossVo.isCrossLeague())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rcannotJoinDesc.width = cannotJoinBg.width;
        rcannotJoinDesc.setPosition(GameConfig.stageWidth / 2 - rcannotJoinDesc.width / 2, cannotJoinBg.y + 40);
        rcannotJoinDesc.lineSpacing = 6;
        rcannotJoinDesc.textAlign = "center";
        this.addChildToContainer(rcannotJoinDesc);
        if (this._isCanJoin && this.crossVo.getSids().length == 0) {
            rcannotJoinDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newAtkracecrossNotJoin2", crossVo.isCrossLeague()));
        }
    };
    NewAtkracecrossView.prototype.initResult = function () {
        if (this._topType == 1) {
            var resultIcon1 = void 0;
            var resultIcon2 = void 0;
            var zonerankinfos = Api.atkracecrossVoApi.zonerankinfos;
            if (Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid())) {
                resultIcon1 = "atkracecross_win";
                resultIcon2 = "atkracecross_loss";
            }
            else {
                resultIcon2 = "atkracecross_win";
                resultIcon1 = "atkracecross_loss";
            }
            var result1 = BaseBitmap.create(resultIcon1);
            result1.setPosition(185, this._topBg.y + 15);
            this.addChildToContainer(result1);
            var result2 = BaseBitmap.create(resultIcon2);
            result2.setPosition(424, result1.y);
            this.addChildToContainer(result2);
            if (PlatformManager.checkIsThSp()) {
                result1.x += 25;
                result2.x -= 44;
            }
        }
        var endCDBg = BaseBitmap.create("public_9_downbg");
        endCDBg.width = 410;
        endCDBg.height = 218;
        endCDBg.setPosition(GameConfig.stageWidth / 2 - endCDBg.width / 2, GameConfig.stageHeigth / 2 - 220);
        this.addChildToContainer(endCDBg);
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        var servername = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Api.atkracecrossVoApi.zonerankinfos[0].zid);
        var rewardDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkracecrossRewardDesc", crossVo.isCrossLeague()), [servername]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardDesc.width = endCDBg.width;
        rewardDesc.setPosition(GameConfig.stageWidth / 2 - rewardDesc.width / 2, endCDBg.y + 40);
        rewardDesc.lineSpacing = 6;
        rewardDesc.textAlign = "center";
        this.addChildToContainer(rewardDesc);
        this._rewardCDTime = crossVo.et - GameData.serverTime;
        this._rewwardTime = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossRewardTime", [this.getCountTimeStr2()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
        this._rewwardTime.setPosition(GameConfig.stageWidth / 2 - this._rewwardTime.width / 2, rewardDesc.y + rewardDesc.height + 30);
        this.addChildToContainer(this._rewwardTime);
    };
    NewAtkracecrossView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    NewAtkracecrossView.prototype.getCountTimeStr2 = function () {
        var time = this._rewardCDTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    NewAtkracecrossView.prototype.tick = function () {
        var view = this;
        // let vo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        if (this.vo.getZoneRewardRed()) {
            App.CommonUtil.addIconToBDOC(view.awardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view.awardBtn);
        }
        //领奖倒计时
        if (this._rewwardTime) {
            this._rewardCDTime--;
            this._rewwardTime.text = LanguageManager.getlocal("atkracecrossRewardTime", [this.getCountTimeStr2()]);
            if (this._rewardCDTime < 0) {
                this.refreshEnterBtn();
            }
        }
        //江湖名望
        if (this.vo.checkFameRed()) {
            App.CommonUtil.addIconToBDOC(this._fameBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._fameBtn);
        }
        //出战倒计时
        if (this._countDownText) {
            this._countDownTime--;
            this._countDownText.text = this.getCountTimeStr();
            if (this._countDownTime < 0) {
                this.refreshServant();
            }
        }
        if (this._chatTxt) {
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
            }
            this._chatTxt.text = showStr;
        }
    };
    NewAtkracecrossView.prototype.refreshEnterBtn = function () {
    };
    //底部
    NewAtkracecrossView.prototype.initBottom = function () {
        var bottom = BaseBitmap.create("sixsectionmainui_bottombg");
        var maskDown = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
        this.addChildAt(maskDown, this.getChildIndex(this.container) - 1);
        var chatbg = null;
        if (1) {
            //跨服聊天消息
            chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
            chatbg.width = GameConfig.stageWidth;
            chatbg.height = 35;
            chatbg.x = 0;
            chatbg.y = GameConfig.stageHeigth - bottom.height - chatbg.height - 3 + 12;
            this.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler, this);
            var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width / 2;
            chatIcon.anchorOffsetY = chatIcon.height / 2;
            chatIcon.x = chatIcon.width / 2 + 10;
            chatIcon.y = chatbg.y + chatbg.height / 2;
            this.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true
            }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
            }
            this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width - 15, 0]);
            this.addChild(this._chatTxt);
        }
        //来访消息
        var visitBg = ComponentManager.getButton("forpeople_bottom", null, this.visitHandle, this, null, 0);
        visitBg.setPosition(12, GameConfig.stageHeigth - 200 - (chatbg ? chatbg.height : 0));
        this.addChild(visitBg);
        var visitIcon = BaseBitmap.create("arena_visit");
        visitIcon.setPosition(visitBg.width / 2 - visitIcon.width / 2, visitBg.height / 2 - visitIcon.height / 2 - 5);
        visitBg.addChild(visitIcon);
        var visitText = BaseBitmap.create("arena_visit_text");
        visitText.setPosition(visitBg.width / 2 - visitText.width / 2, visitIcon.y + visitIcon.height - 30);
        visitBg.addChild(visitText);
        //活动奖励
        var awardBg = ComponentManager.getButton("forpeople_bottom", null, this.rewardHandle, this, null, 0);
        awardBg.setPosition(GameConfig.stageWidth - awardBg.width - 24, visitBg.y - 115);
        this.addChild(awardBg);
        this.awardBtn = awardBg;
        var awardIcon = BaseBitmap.create("atkracecross_award");
        awardIcon.setPosition(awardBg.width / 2 - awardIcon.width / 2, awardBg.height / 2 - awardIcon.height / 2 - 5);
        awardBg.addChild(awardIcon);
        var awardText = BaseBitmap.create("atkracecross_award_text");
        awardText.setPosition(awardBg.width / 2 - awardText.width / 2, awardIcon.y + awardIcon.height - 30);
        awardBg.addChild(awardText);
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
            /**
            if (this._isCanJoin && this.crossVo.getSids().length>0)
            {
                //加成按钮
                let ruleBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.clickDetailBtnHandler,this);
                this.addChildAt(ruleBg,100);

                let ruleicon:BaseBitmap = BaseBitmap.create("newcrossatkrace_buff");
                ruleBg.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ruleicon, ruleBg, [0,0], true);
                ruleBg.addChild(ruleicon);

                let buffText:BaseBitmap = BaseBitmap.create("newcrossatkrace_bufftext");
                buffText.setPosition(ruleBg.width/2-buffText.width/2,rankIcon.y + rankIcon.height -30);
                ruleBg.addChild(buffText);
                
                // if(LocalStorageManager.get(LocalStorageConst.LOCAL_IMACY_RULE) == ''){
                // 	this.clickDetailBtnHandler(1);
                // 	LocalStorageManager.set(LocalStorageConst.LOCAL_IMACY_RULE, '1');
                // }
                // if(PlatformManager.hasSpcialCloseBtn()){
                    this.setLayoutPosition(LayoutConst.horizontalCentertop, ruleBg, visitBg, [0, -ruleBg.height - 10]);
                // }
                // else{
                // 	ruleBg.x = 24;
                // 	ruleBg.y = awardBg.y-awardBg.height-5;
                // }
            }
            */
            var fameBg = ComponentManager.getButton("forpeople_bottom", null, this.fameBtnHandler, this);
            this.addChildAt(fameBg, 100);
            this._fameBtn = fameBg;
            var fameicon = BaseBitmap.create("newcrossatkrace_famebtn_icon");
            fameBg.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fameicon, fameBg, [0, 0], true);
            fameBg.addChild(fameicon);
            var fameText = BaseBitmap.create("newcrossatkrace_famebtn_name");
            fameText.setPosition(fameBg.width / 2 - fameText.width / 2, rankIcon.y + rankIcon.height - 30);
            fameBg.addChild(fameText);
            this.setLayoutPosition(LayoutConst.horizontalCentertop, fameBg, visitBg, [0, -fameBg.height - 10]);
            if (this.vo.checkFameRed()) {
                App.CommonUtil.addIconToBDOC(this._fameBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._fameBtn);
            }
        }
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);
        this.bottomBg = bottom;
        var showMore = ComponentManager.getButton("newcrossatkrace_moretxt", null, this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - bottom.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("newcrossatkrace_downflag");
        this._moreArrow.setPosition(showMore.x - this._moreArrow.width + 12, GameConfig.stageHeigth - bottom.height / 2 - this._moreArrow.height / 2);
        this.addChild(this._moreArrow);
    };
    NewAtkracecrossView.prototype.chatBgClickHandler = function () {
        if (Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace")) {
            var activeStr = "newCrossServerAtkRace-" + Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code;
            ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: activeStr });
        }
    };
    NewAtkracecrossView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            if (event.data.data.data.atklist) {
                this._atkraceInfoVoList = event.data.data.data.atklist;
                this.showText();
                this.refreshText();
            }
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
    NewAtkracecrossView.prototype.showText = function () {
        if (this.describeTxt == null) {
            var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            describeTxt.width = 450;
            describeTxt.x = 20;
            describeTxt.y = GameConfig.stageHeigth - 40 - 18;
            this.describeTxt = describeTxt;
            this.addChild(describeTxt);
        }
        if (this._nameTxt == null) {
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            nameTxt.x = 20;
            nameTxt.y = GameConfig.stageHeigth - 67 - 18;
            this.addChild(nameTxt);
            this._nameTxt = nameTxt;
        }
    };
    NewAtkracecrossView.prototype.refreshText = function () {
        if (this._atkraceInfoVoList.length > 0 && this._atkraceInfoVoList[0].info) {
            var data = this._atkraceInfoVoList[0];
            //击败｜｜全歼
            var str = "";
            if (data.info.type == "director") {
                var atkInfo = data.info.uinfo;
                var defenInfo = data.info.fuinfo;
                var fameCfg = this.vo.getFameCfgByLine(data.info.x);
                var fameName = LanguageManager.getlocal("newatkrackcross_fameTitleName" + (fameCfg.baseCfg.index + 1));
                var fameStr = fameName;
                if (data.info.x > 1) {
                    var seatCount = fameCfg.seatCount + data.info.y;
                    fameStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [fameName, seatCount]);
                }
                this.describeTxt.text = LanguageManager.getlocal("newatkrackcross_fameHoldLog1", [defenInfo.name, fameStr]);
                if (this._nameTxt) {
                    var sidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.info.zid);
                    var zidStr = LanguageManager.getlocal("atkraceCrossServeDes", [sidname]);
                    this._nameTxt.text = zidStr + atkInfo.name;
                }
            }
            else {
                if (this.isData && data.info.type == 1) {
                    str = LanguageManager.getlocal("atkracebeat");
                }
                else {
                    str = LanguageManager.getlocal("atkraceAnnihilation");
                }
                var currName = Config.ServantCfg.getServantItemById(data.info.sid).name;
                //追杀文字
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
                    var sidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.info.zid);
                    var zidStr = LanguageManager.getlocal("atkraceCrossServeDes", [sidname]);
                    this._nameTxt.text = zidStr + this._atkraceInfoVoList[0].info.name;
                }
            }
        }
    };
    NewAtkracecrossView.prototype.rankHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSRANKLISTVIEW);
    };
    NewAtkracecrossView.prototype.visitHandle = function () {
        if (this._isCanJoin == false) {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceNoDes", crossVo.isCrossLeague())));
            return;
        }
        if (!this.crossVo.getSids() || this.crossVo.getSids().length == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkraceServantLess30Tip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSVISITVIEW);
    };
    NewAtkracecrossView.prototype.rewardHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSACTIVITYREWARDVIEW);
    };
    NewAtkracecrossView.prototype.showMoreHandle = function () {
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
    NewAtkracecrossView.prototype.showList = function () {
        if (this.moveContainer) {
            this.moveContainer.dispose();
            this.moveContainer = null;
        }
        if (this.listconditions) {
            this.listconditions.dispose();
            this.listconditions = null;
        }
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
            this._scrollList = ComponentManager.getScrollList(NewActrackCrossMoreItem, this._atkraceInfoVoList, rect);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.y = 5;
            this._scrollList.x = 0;
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
        var num = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code).getbeatNum();
        var listconditions = ComponentManager.getTextField(LanguageManager.getlocal("newatkracelistconditions", [num + ""]), 20);
        listconditions.lineSpacing = 4;
        listconditions.textAlign = TextFieldConst.ALIGH_CENTER;
        listconditions.x = 100;
        listconditions.y = GameConfig.stageHeigth - 70;
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
        }, this);
    };
    NewAtkracecrossView.prototype.closeList = function () {
        this.touchBoo = false;
        this.listconditions.visible = false;
        if (this.describeTxt) {
            this.describeTxt.visible = true;
            this._nameTxt.visible = true;
        }
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                this.touchBoo = true;
                egret.Tween.removeTweens(this.moveContainer);
                if (this.moveContainer) {
                    this.moveContainer.dispose();
                    this.moveContainer = null;
                }
                if (this.listconditions) {
                    this.listconditions.dispose();
                    this.listconditions = null;
                }
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
    NewAtkracecrossView.prototype.battleCallback = function () {
        this.resetInfo();
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_LIST, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_LIST), this.useCallback, this);
    };
    NewAtkracecrossView.prototype.fightendCallback = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossFightEndTip"));
        this._isFightEnd = true;
        ViewController.getInstance().hideView(ViewConst.COMMON.NEWATKRACECROSSARRESTVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.CONFIRMPOPUPVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.NEWATKRACECROSSAGREEPOPUPDIALOG);
        ViewController.getInstance().hideView(ViewConst.BASE.BATTLEWIN);
        ViewController.getInstance().hideView(ViewConst.BASE.PROMPTVIEW);
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_INDEX, { activeId: crossVo.aidAndCode });
    };
    NewAtkracecrossView.prototype.challengeCallback = function (data) {
        if (data.data.ret) {
            if (AtkraceCrossChallengeItem.data && AtkraceChallengeItem.data.type == 1) {
                if (this.touchBoo) {
                    this.moveContainer.y = 1150;
                    this._currMaskBmp.visible = false;
                    this._isShowMore = false;
                    this.closeList();
                    this._moreArrow.scaleY = 1;
                    this._moreArrow.y = GameConfig.stageHeigth - 94 / 2 - this._moreArrow.height / 2;
                }
            }
            this.refreshServant();
            ViewController.getInstance().hideView(ViewConst.POPUP.NEWATKRACECROSSCHALLENGEVIEW);
            this.clickServant();
        }
    };
    NewAtkracecrossView.prototype.refreshServant = function () {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_INDEX, { activeId: crossVo.aidAndCode });
    };
    NewAtkracecrossView.prototype.clickDetailBtnHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSBUFFVIEW, {
            code: this.param.data.code
        });
    };
    NewAtkracecrossView.prototype.fameBtnHandler = function () {
        if (this._isCanJoin == false) {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceNoDes", crossVo.isCrossLeague())));
            return;
        }
        if (!this.crossVo.getSids() || this.crossVo.getSids().length == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkraceServantLess30Tip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSFAMEPOPUPVIEW, {
            aid: "newCrossServerAtkRace",
            code: Api.atkracecrossVoApi.newcrossCode
        });
    };
    NewAtkracecrossView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS, this.battleCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND, this.fightendCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_REVENGE), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_KILL), this.challengeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_LIST), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_REFRESH), this.refreshServant, this);
        this._moreArrow = null;
        this.bottomBg = null;
        this._isShowMore = false;
        this.touchBoo = true;
        this.moveContainer = null;
        this.listconditions = null;
        this.describeTxt = null;
        this._nameTxt = null;
        this._currMaskBmp = null;
        this._touchBg = null;
        this.moreBg = null;
        this.isData = false;
        this._scrollList = null;
        this._atkraceInfoVoList = null;
        this._topBg = null;
        this._scoreTextTab.length = 0;
        this._rewwardTime = null;
        this._countDownTime = 0;
        this._infoContainer = null;
        this._countDownText = null;
        this._fightflag = null;
        this._topType = 0;
        this._serverList = null;
        this._isCanJoin = false;
        this._rewardCDTime = 0;
        this._isFightEnd = false;
        this._chatTxt = null;
        this.awardBtn = null;
        this._fameBtn = null;
        Api.chatVoApi.clearAcCrossChatList();
        _super.prototype.dispose.call(this);
    };
    return NewAtkracecrossView;
}(CommonView));
//# sourceMappingURL=NewAtkracecrossView.js.map