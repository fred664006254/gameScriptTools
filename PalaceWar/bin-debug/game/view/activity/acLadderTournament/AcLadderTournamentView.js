/*
    author : shaoliang
    date : 2019.10.15
    desc : 天下至尊
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
var AcLadderTournamentView = (function (_super) {
    __extends(AcLadderTournamentView, _super);
    function AcLadderTournamentView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        // 1 进入按钮和排行榜  2 进入派遣
        _this._showType = 0;
        _this._type1Node = null;
        _this._type2Node = null;
        _this._scrollList = null;
        _this._myRankText = null;
        _this._myScoreText = null;
        _this._goodsButton = null;
        _this._logBtn = null;
        _this._xiuzhanBtn = null;
        _this._clip = null;
        _this._acDescBg = null;
        _this._enterBtn = null;
        _this._endBtn = null;
        _this._chatTxt = null;
        return _this;
    }
    AcLadderTournamentView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_LT_GETRANK, requestData: { activeId: this.acTivityId } };
    };
    AcLadderTournamentView.prototype.getContainerY = function () {
        return 14;
    };
    AcLadderTournamentView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.data.rankArr) {
            Api.laddertournamentVoApi.setRankArrya(rData.data.rankArr);
        }
        if (rData.data.myrankArr) {
            Api.laddertournamentVoApi.setMyRankArrya(rData.data.myrankArr);
        }
    };
    AcLadderTournamentView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladderview", "ladder_bg1", "ladder_battlebg", "acliangbiographyview_common_acbg", "ladder_rankbg", "ladder_myrank",
            "ladder_myscore", "ladder_ef_jrzc", "ladder_power_bg1", "ladder_power_bg2",
        ]);
    };
    Object.defineProperty(AcLadderTournamentView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLadderTournamentView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLadderTournamentView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    // 标题背景名称
    AcLadderTournamentView.prototype.getTitleBgName = function () {
        return "ladderview_title";
    };
    AcLadderTournamentView.prototype.getRuleInfo = function () {
        return "acLadderTournamentView_rule";
    };
    AcLadderTournamentView.prototype.getRuleInfoParam = function () {
        var itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];
        var buffstr = String(this.cfg.atkBuff * 100) + "%";
        return [String(this.cfg.freeNum), itemvo.name, buffstr];
    };
    AcLadderTournamentView.prototype.getTitleStr = function () {
        return null;
    };
    AcLadderTournamentView.prototype.getBgName = function () {
        return "ladder_bg1";
    };
    AcLadderTournamentView.prototype.initView = function () {
        this.titleBgShadow.visible = false;
        this.viewBg.height = 1136;
        this.viewBg.y = (GameConfig.stageHeigth - 1136) / 2;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.getrankCallBack, this);
        Api.laddertournamentVoApi.code = this.code;
        var vo = this.vo;
        var cfg = this.cfg;
        var acDescBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        acDescBg.width = 640;
        acDescBg.height = 145;
        acDescBg.setPosition(this.titleBg.x, this.titleBg.y + this.titleBg.height - 7 - 20);
        this.addChildToContainer(acDescBg);
        this._acDescBg = acDescBg;
        var acTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadderTournamentView_acTime", [vo.acTimeAndHour]), 18, TextFieldConst.COLOR_WHITE);
        acTimeDesc.setPosition(this.titleBg.x + 20, acDescBg.y + 10);
        this.addChildToContainer(acTimeDesc);
        var joinServer = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_allservers", [""]), 18, TextFieldConst.COLOR_WHITE);
        joinServer.setPosition(this.titleBg.x + 20, acTimeDesc.y + acTimeDesc.height + 5);
        this.addChildToContainer(joinServer);
        var joinServerTxt = ComponentManager.getLimitLengthServerName(Api.laddertournamentVoApi.getCrossServer(), 20, GameConfig.stageWidth - 50 - joinServer.width, this, TextFieldConst.COLOR_LIGHT_YELLOW);
        joinServerTxt.x = joinServer.x + joinServer.textWidth;
        joinServerTxt.y = joinServer.y;
        this.addChildToContainer(joinServerTxt);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLadderTournamentView_acDesc"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 600;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTimeDesc.x, joinServer.y + joinServer.height + 5);
        this.addChildToContainer(descTF);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("0"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        //四个按钮
        var logBtn = ComponentManager.getButton("ladder_log_btn", null, this.logHandle, this);
        logBtn.setPosition(10, GameConfig.stageHeigth - 213 - 50);
        this.addChild(logBtn);
        this._logBtn = logBtn;
        var rankBtn = ComponentManager.getButton("ladder_rank_btn", null, this.rankHandle, this);
        rankBtn.setPosition(logBtn.x, GameConfig.stageHeigth - 110 - 50);
        this.addChild(rankBtn);
        var rewardBtn = ComponentManager.getButton("ladder_reward_btn", null, this.rewardHandle, this);
        rewardBtn.setPosition(GameConfig.stageWidth - 10 - rewardBtn.width, logBtn.y);
        this.addChild(rewardBtn);
        var goodsBtn = ComponentManager.getButton("ladder_goods_btn", null, this.goodsHandle, this);
        goodsBtn.setPosition(rewardBtn.x, rankBtn.y);
        this.addChild(goodsBtn);
        this._goodsButton = goodsBtn;
        this.showType1();
        this.freshView();
        TimerManager.doTimer(300000, 0, this.getRankInfo, this);
        this.tick();
    };
    AcLadderTournamentView.prototype.getRankInfo = function () {
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK, { activeId: this.acTivityId });
    };
    AcLadderTournamentView.prototype.getrankCallBack = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (rData.rankArr) {
            Api.laddertournamentVoApi.setRankArrya(rData.rankArr);
        }
        if (rData.myrankArr) {
            Api.laddertournamentVoApi.setMyRankArrya(rData.myrankArr);
        }
        if (!rData.turn) {
            this.refreshRank();
        }
        if (this._type2Node) {
            this._type2Node.resetPower();
        }
    };
    AcLadderTournamentView.prototype.refreshRank = function () {
        if (!this._type1Node) {
            return;
        }
        this._scrollList.refreshData(Api.laddertournamentVoApi.getRankArray());
        var myinfo = Api.laddertournamentVoApi.getMyRankArray();
        var ranknum = myinfo.myrank;
        var rankstr;
        var pointStr;
        if (ranknum && myinfo.value != null) {
            rankstr = String(ranknum);
            pointStr = String(myinfo.value);
        }
        else {
            pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
        }
        this._myRankText.text = rankstr;
        this._myScoreText.text = pointStr;
        if (this._type2Node) {
            this._type2Node.resetRank();
        }
    };
    AcLadderTournamentView.prototype.logHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.LADDERLOGVIEW, { aid: this.aid, code: this.code });
    };
    AcLadderTournamentView.prototype.rankHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.LADDERRANKVIEW, { aid: this.aid, code: this.code });
    };
    AcLadderTournamentView.prototype.rewardHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.LADDERREWARDVIEW, { aid: this.aid, code: this.code });
    };
    AcLadderTournamentView.prototype.goodsHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.LADDERGOODSVIEW, { aid: this.aid, code: this.code });
    };
    AcLadderTournamentView.prototype.showType1 = function () {
        this._showType = 1;
        if (this._type2Node) {
            this._type2Node.dispose();
            this._type2Node = null;
        }
        var bg = this.viewBg;
        bg.texture = ResourceManager.getRes(this.getBgName());
        //node1
        this._type1Node = new BaseDisplayObjectContainer();
        this._type1Node.y = this._acDescBg.y + this._acDescBg.height;
        this.addChildToContainer(this._type1Node);
        var enterBtn = ComponentManager.getButton("ladder_enter_ground", null, this.enterHandle, this, null, 1);
        enterBtn.setPosition(GameConfig.stageWidth / 2 - enterBtn.width / 2, GameConfig.stageHeigth - 360 - 50);
        this._type1Node.addChild(enterBtn);
        this._enterBtn = enterBtn;
        var clip = ComponentManager.getCustomMovieClip("ladder_ef_jrzc", 10, 100);
        // clip.scaleX = 1.12;
        // clip.scaleY = 1.08;
        clip.setPosition(enterBtn.x - 5, enterBtn.y - 62);
        this._type1Node.addChild(clip);
        clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        this._clip = clip;
        this._xiuzhanBtn = ComponentManager.getButton("ladder_search_xiuzhan", null, this.enterHandle, this, null, 1);
        this._xiuzhanBtn.setPosition(GameConfig.stageWidth / 2 - this._xiuzhanBtn.width / 2, enterBtn.y);
        this._type1Node.addChild(this._xiuzhanBtn);
        this._endBtn = ComponentManager.getButton("ladder_search_end", null, this.enterHandle, this, null, 1);
        this._endBtn.setPosition(GameConfig.stageWidth / 2 - this._endBtn.width / 2, this._xiuzhanBtn.y);
        this._type1Node.addChild(this._endBtn);
        this._endBtn.visible = false;
        var topBg = BaseBitmap.create("ladder_rankbg");
        topBg.y = 0;
        topBg.height = 224;
        this._type1Node.addChild(topBg);
        var serverText = BaseBitmap.create("ladder_myscore");
        serverText.setPosition(138, topBg.y + 8);
        this._type1Node.addChild(serverText);
        var serverText2 = BaseBitmap.create("ladder_myrank");
        serverText2.setPosition(342, topBg.y + 8);
        this._type1Node.addChild(serverText2);
        var myinfo = Api.laddertournamentVoApi.getMyRankArray();
        var ranknum = myinfo.myrank;
        var rankstr;
        var pointStr;
        if (ranknum) {
            rankstr = String(ranknum);
            pointStr = String(myinfo.value);
        }
        else {
            rankstr = LanguageManager.getlocal("acLadder_notJoin");
            pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
        }
        var toptext1 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WHITE);
        toptext1.setPosition(serverText.x + serverText.width + 3, serverText.y + 7);
        toptext1.text = pointStr; //String(Api.laddertournamentVoApi.getMyPoint());
        this._type1Node.addChild(toptext1);
        this._myScoreText = toptext1;
        var toptext2 = ComponentManager.getTextField(rankstr, 22, TextFieldConst.COLOR_WHITE);
        toptext2.setPosition(serverText2.x + serverText2.width + 3, serverText2.y + 7);
        this._type1Node.addChild(toptext2);
        this._myRankText = toptext1;
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(73 - rankText.width / 2, topBg.y + 50);
        this._type1Node.addChild(rankText);
        var qufuText = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qufuText.setPosition(190 - qufuText.width / 2, rankText.y);
        this._type1Node.addChild(qufuText);
        var titleText3 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText3.setPosition(322 - titleText3.width / 2, rankText.y);
        this._type1Node.addChild(titleText3);
        var titleText4 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText4.setPosition(443 - titleText4.width / 2, rankText.y);
        this._type1Node.addChild(titleText4);
        var titleText5 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText5.setPosition(538 - titleText5.width / 2, rankText.y);
        this._type1Node.addChild(titleText5);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 144);
        this._scrollList = ComponentManager.getScrollList(LadderRankScrollItem, Api.laddertournamentVoApi.getRankArray(), rect);
        this._type1Node.addChild(this._scrollList);
        this._scrollList.y = topBg.y + 80;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        //夸父聊天
        //跨服聊天消息
        var chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
        chatbg.width = GameConfig.stageWidth;
        chatbg.height = 35;
        chatbg.x = 0;
        chatbg.y = GameConfig.stageHeigth - chatbg.height - 1;
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
            loop: true,
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
        this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
        this.addChild(this._chatTxt);
        this.checkBtn();
    };
    AcLadderTournamentView.prototype.chatBgClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    AcLadderTournamentView.prototype.enterHandle = function () {
        if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.laddertournamentVoApi.checkIsTruce()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_truceTip"));
            return;
        }
        if (this.vo.checkShow() == false) {
            var str1 = LanguageManager.getlocal("officialTitle" + this.cfg.needLv);
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_Unlcok", [str1, String(this.cfg.needServant)]));
            return;
        }
        var bg = this.viewBg;
        bg.texture = ResourceManager.getRes("ladder_battlebg");
        this._showType = 2;
        this._type1Node.dispose();
        this._type1Node = null;
        this._type2Node = new LadderViewTab2();
        this._type2Node.y = 215;
        this._type2Node.init(this.aid, this.code);
        this.addChild(this._type2Node);
    };
    AcLadderTournamentView.prototype.tick = function () {
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
        var vo = this.vo;
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = vo.acCountDownEndTime; // LanguageManager.getlocal("acPunishEnd");
        }
        else {
            if (Api.laddertournamentVoApi.getNowturnLessTime2() == 0) {
                this.getRankInfo();
            }
            this._countDownTime.text = Api.laddertournamentVoApi.getNowturnCountDown() + vo.acCountDown17;
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        if (Api.laddertournamentVoApi.checkLogsRedDot()) {
            App.CommonUtil.addIconToBDOC(this._logBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._logBtn);
        }
        if (Api.laddertournamentVoApi.checkIsTruce()) {
            if (this._showType == 2) {
                this.showType1();
            }
        }
        this.checkBtn();
        if (this.vo.isEnd) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE);
            this.hide();
        }
    };
    AcLadderTournamentView.prototype.checkBtn = function () {
        if (this._showType == 1) {
            if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
                if (this._clip && this._enterBtn && this._xiuzhanBtn) {
                    this._clip.visible = false;
                    this._enterBtn.visible = false;
                    this._xiuzhanBtn.visible = false;
                    this._endBtn.visible = true;
                }
            }
            else if (Api.laddertournamentVoApi.checkIsTruce()) {
                if (this._clip && this._enterBtn && this._xiuzhanBtn) {
                    this._clip.visible = false;
                    this._enterBtn.visible = false;
                    this._xiuzhanBtn.visible = true;
                }
            }
            else {
                if (this._clip && this._enterBtn && this._xiuzhanBtn) {
                    this._clip.visible = true;
                    this._enterBtn.visible = true;
                    this._xiuzhanBtn.visible = false;
                }
            }
        }
    };
    AcLadderTournamentView.prototype.freshView = function () {
        if (this.vo.checkTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(this._goodsButton);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._goodsButton);
        }
        if (this._type2Node) {
            this._type2Node.resetPower();
        }
    };
    AcLadderTournamentView.prototype.dispose = function () {
        TimerManager.remove(this.getRankInfo, this);
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.getrankCallBack, this);
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this._showType = 0;
        this._type1Node = null;
        this._type2Node = null;
        this._scrollList = null;
        this._myRankText = null;
        this._myScoreText = null;
        this._goodsButton = null;
        this._logBtn = null;
        this._acDescBg = null;
        this._enterBtn = null;
        this._endBtn = null;
        this._chatTxt = null;
        Api.chatVoApi.clearAcCrossChatList();
        _super.prototype.dispose.call(this);
    };
    return AcLadderTournamentView;
}(AcCommonView));
__reflect(AcLadderTournamentView.prototype, "AcLadderTournamentView");
//# sourceMappingURL=AcLadderTournamentView.js.map