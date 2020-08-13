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
var AtkraceView = (function (_super) {
    __extends(AtkraceView, _super);
    function AtkraceView() {
        var _this = _super.call(this) || this;
        _this.moreHeight = 720;
        _this.moreData = [];
        _this.moreIsShow = false;
        _this.isMoving = false;
        _this.myScore = 100;
        _this.myRank = 100;
        _this.noRival = false;
        return _this;
    }
    AtkraceView.prototype.initView = function () {
        Api.rookieVoApi.checkNextStep();
        this.container.y = 0;
        this.playerInfoBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this.playerInfoBox);
        this.playerInfoBox.y = (GameConfig.stageHeigth - 80 - 290 - 600) / 2 + 80;
        this.playerImg = new BaseDisplayObjectContainer();
        this.playerInfoBox.addChild(this.playerImg);
        var playerBg = BaseBitmap.create("atkrace_bg1");
        this.playerInfoBox.addChild(playerBg);
        playerBg.setPosition((GameConfig.stageWidth - playerBg.width) / 2, 486);
        this.playerNameLabel = ComponentManager.getTextField("", 22, 0xfff4b4);
        this.playerInfoBox.addChild(this.playerNameLabel);
        this.playerNameLabel.width = playerBg.width;
        this.playerNameLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.playerNameLabel.setPosition(playerBg.x, playerBg.y + 6);
        this.playerScoreLabel = ComponentManager.getTextField("", 22, 0xfff4b4);
        this.playerInfoBox.addChild(this.playerScoreLabel);
        this.playerScoreLabel.width = playerBg.width;
        this.playerScoreLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.playerScoreLabel.setPosition(playerBg.x, playerBg.y + 48);
        this.playerRankLabel = ComponentManager.getTextField("", 22, 0xfff4b4);
        this.playerInfoBox.addChild(this.playerRankLabel);
        this.playerRankLabel.width = playerBg.width;
        this.playerRankLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.playerRankLabel.setPosition(playerBg.x, playerBg.y + 76);
        this.bottomBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this.bottomBox);
        this.bottomBox.setPosition(0, GameConfig.stageHeigth - 212);
        this.moreMask = BaseBitmap.create("public_9_viewmask");
        this.addChild(this.moreMask);
        this.moreMask.width = GameConfig.stageWidth;
        this.moreMask.height = GameConfig.stageHeigth - 106;
        this.moreMask.setPosition(0, 0);
        this.moreMask.visible = false;
        this.moreMask.addTouchTap(this.moreInfoSwitch, this);
        var _bg1 = BaseLoadBitmap.create("atkrace_bg2");
        this.bottomBox.addChild(_bg1);
        var _bg2 = BaseLoadBitmap.create("atkrace_bg3");
        this.bottomBox.addChild(_bg2);
        _bg2.setPosition(0, 106);
        this.initBottomBtns();
        this.initMoreInfos();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.onReset, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE, this.onUpdateModel, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.refreshMoreInfo, this);
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        this.refreshPlayerView();
    };
    AtkraceView.prototype.doGuide = function () {
        this.onChallengeTap();
    };
    AtkraceView.prototype.onUpdateModel = function (e) {
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        var data = e.data;
        if (data && data.ret) {
            if (data.data && (data.data.cmd != NetRequestConst.REQUEST_ATKRACE_FIGHT || data.data.cmd != NetRequestConst.REQUEST_ATKRACE_CHOOSE)) {
                this.refreshPlayerView();
            }
        }
    };
    AtkraceView.prototype.refreshServant = function () {
        this.request(NetRequestConst.REQUEST_ATKRACE_INDEX, {});
    };
    /**底部按钮及我的分数等 */
    AtkraceView.prototype.initBottomBtns = function () {
        // 消息按钮
        var msgBtn = ComponentManager.getButton("forpeople_bottom", null, this.onMessageTap, this, null, 0);
        this.bottomBox.addChild(msgBtn);
        msgBtn.setPosition(28, -102);
        var msgIcon = BaseBitmap.create("arena_visit");
        msgIcon.setPosition(msgBtn.width / 2 - msgIcon.width / 2, msgBtn.height / 2 - msgIcon.height / 2 - 5);
        msgBtn.addChild(msgIcon);
        var msgText = BaseBitmap.create("arena_visit_text");
        msgText.setPosition(msgBtn.width / 2 - msgText.width / 2, msgIcon.y + msgIcon.height - 30);
        msgBtn.addChild(msgText);
        // msgBtn.setScale(0.74);
        // 排行按钮
        var rankBtn = ComponentManager.getButton("forpeople_bottom", null, this.onRankTap, this, null, 0);
        this.bottomBox.addChild(rankBtn);
        rankBtn.setPosition(508, -102);
        var rankIcon = BaseBitmap.create("arena_rank");
        rankIcon.setPosition(rankBtn.width / 2 - rankIcon.width / 2, rankBtn.height / 2 - rankIcon.height / 2 - 5);
        rankBtn.addChild(rankIcon);
        var rankText = BaseBitmap.create("arena_rank_text");
        rankText.setPosition(rankBtn.width / 2 - rankText.width / 2, rankIcon.y + rankIcon.height - 30);
        rankBtn.addChild(rankText);
        // rankBtn.setScale(0.74);
        // 挑战按钮
        var challengeBtn = ComponentManager.getButton("atkrace_startBtn", null, this.onChallengeTap, this, null, 0);
        this.bottomBox.addChild(challengeBtn);
        challengeBtn.setPosition((GameConfig.stageWidth - challengeBtn.width) / 2, -70);
        // 我的分数&排名
        this.myScoreLabel = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext6", ["" + this.myScore]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xfdf1b5);
        this.bottomBox.addChild(this.myScoreLabel);
        this.myScoreLabel.setPosition(72, 58);
        this.myRankLabel = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext7", ["" + this.myRank]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xfdf1b5);
        this.bottomBox.addChild(this.myRankLabel);
        this.myRankLabel.setPosition(464, 58);
    };
    /**底部更多信息 */
    AtkraceView.prototype.initMoreInfos = function () {
        this.moreIsShow = false;
        this.moreSwitchBtn = new BaseDisplayObjectContainer();
        this.bottomBox.addChild(this.moreSwitchBtn);
        this.moreSwitchBtn.setPosition(470, 146);
        this.moreSwitchBtn.addTouchTap(this.moreInfoSwitch, this);
        var __arrow = BaseBitmap.create("arena_arrow");
        this.moreSwitchBtn.addChild(__arrow);
        __arrow.name = "more_arrow";
        __arrow.anchorOffsetY = __arrow.height / 2;
        __arrow.setPosition(0, __arrow.height / 2);
        var __moretxt = BaseBitmap.create("arena_more");
        this.moreSwitchBtn.addChild(__moretxt);
        __moretxt.setPosition(__arrow.width + 6, (__arrow.height - __moretxt.height) / 2);
        this.bottomTip = ComponentManager.getTextField("", 22, 0xffffff);
        this.bottomTip.width = 450;
        this.bottomBox.addChild(this.bottomTip);
        this.moreInfoContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moreInfoContainer);
        this.moreInfoContainer.setPosition(0, GameConfig.stageHeigth);
        var _moreBg = BaseLoadBitmap.create("commonview_woodbg");
        _moreBg.width = GameConfig.stageWidth;
        _moreBg.height = this.moreHeight;
        _moreBg.touchEnabled = true;
        this.moreInfoContainer.addChild(_moreBg);
        var _moreL = BaseLoadBitmap.create("atkrace_line2");
        this.moreInfoContainer.addChild(_moreL);
        var list_w = GameConfig.stageWidth;
        var list_h = this.moreHeight - 15;
        this.moreList = ComponentManager.getScrollList(ActrackMoreItem, [], new egret.Rectangle(0, 0, list_w, list_h));
        this.moreInfoContainer.addChild(this.moreList);
        this.moreList.setPosition(0, 15);
        this.moreList.setEmptyTip(LanguageManager.getlocal("atkracedes3"));
    };
    AtkraceView.prototype.onRankTap = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACERANKLISTVIEW);
    };
    AtkraceView.prototype.onMessageTap = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
    };
    AtkraceView.prototype.onChallengeTap = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACESELECTVIEW, {
            fightType: AtkraceFightTypes.choose,
            fightUid: Api.atkraceVoApi.getMyFightInfo().uid
        });
    };
    AtkraceView.prototype.moreInfoSwitch = function () {
        var _this = this;
        if (this.isMoving)
            return;
        this.moreIsShow = !this.moreIsShow;
        this.moreSwitchBtn.getChildAt(0).scaleY = this.moreIsShow ? -1 : 1;
        this.moreMask.visible = this.moreIsShow;
        this.isMoving = true;
        var toY = GameConfig.stageHeigth;
        if (this.moreIsShow) {
            toY -= (this.moreHeight + 106);
        }
        egret.Tween.get(this.moreInfoContainer)
            .to({ y: toY }, 500)
            .call(function () {
            _this.isMoving = false;
        }, this);
        this.refreshBottomLabel();
    };
    AtkraceView.prototype.refreshMoreInfo = function (e) {
        this.moreData = [];
        if (e.data.ret) {
            this.moreData = e.data.data.data.atklist;
        }
        this.moreList.refreshData(this.moreData);
        this.refreshBottomLabel();
    };
    AtkraceView.prototype.refreshBottomLabel = function () {
        if (this.moreIsShow) {
            var num = Config.AtkraceCfg.getbeatNum();
            this.bottomTip.text = LanguageManager.getlocal("atkracelistconditions", [num + ""]);
            this.bottomTip.setPosition(100, 156);
        }
        else {
            if (this.moreData.length > 0) {
                this.bottomTip.text = this.formatMoreMsg(this.moreData[0]);
                this.bottomTip.setPosition(20, 140);
            }
            else {
                this.bottomTip.text = "";
            }
        }
    };
    AtkraceView.prototype.formatMoreMsg = function (data) {
        var rsl = "";
        var act = LanguageManager.getlocal(data.info.type == 1 ? "atkrace_addtext10" : "atkrace_addtext11");
        rsl = LanguageManager.getlocal("atkrace_addtext8", [
            data.info.name,
            act,
            data.info.uname2,
            data.info.fightnum + ""
        ]);
        if (data.info.streak > 2) {
            rsl += LanguageManager.getlocal("atkrace_addtext9", ["" + data.info.streak]);
        }
        return rsl;
    };
    AtkraceView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_ATKRACE_INDEX,
            requestData: {}
        };
    };
    AtkraceView.prototype.receiveData = function (data) {
        this.noRival = !data.ret || data.data.data.nomatchuid;
        if (this.noRival) {
            App.CommonUtil.showTip(LanguageManager.getlocal("atkraceViewError"));
        }
        else {
            this.myRank = data.data.data.myrank || 0;
        }
    };
    /**
     * 重制
     */
    AtkraceView.prototype.onReset = function () {
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        this.refreshPlayerView();
    };
    /**
     * 更新玩家（敌&我）信息
     */
    AtkraceView.prototype.refreshPlayerView = function () {
        this.playerInfoBox.visible = !this.noRival;
        if (!this.noRival) {
            var _ainfo = Api.atkraceVoApi.getMyFightInfo();
            this.playerImg.removeChildren();
            var __playerImg = Api.playerVoApi.getPlayerPortrait(_ainfo.flevel, _ainfo.fpic);
            this.playerImg.addChild(__playerImg);
            __playerImg.anchorOffsetX = __playerImg.width / 2;
            __playerImg.setPosition(GameConfig.stageWidth / 2, 0);
            __playerImg.setScale(0.8);
            this.playerNameLabel.text = _ainfo.fname;
            this.playerScoreLabel.text = LanguageManager.getlocal("atkrace_addtext6", ["" + _ainfo.fpoint]);
            var _rankText = _ainfo.frank > 0 ? "" + _ainfo.frank : LanguageManager.getlocal("atkracedes4");
            this.playerRankLabel.text = LanguageManager.getlocal("atkrace_addtext7", ["" + _rankText]);
            this.myScoreLabel.text = LanguageManager.getlocal("atkrace_addtext6", ["" + Api.atkraceVoApi.getPoint()]);
            var _myrankText = this.myRank > 0 ? "" + this.myRank : LanguageManager.getlocal("atkracedes4");
            this.myRankLabel.text = LanguageManager.getlocal("atkrace_addtext7", ["" + _myrankText]);
        }
    };
    // 规则说明内容
    AtkraceView.prototype.getRuleInfo = function () {
        return "atkraceInfo";
    };
    AtkraceView.prototype.getBgName = function () {
        return "arena_battlebg";
    };
    AtkraceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "forpeople_bottom", "arena_bottom", "atkrace_morale",
            "arena_arrow", "arena_bottom_bg", "arena_more", "arena_rank", "arena_rank_text", "arena_visit", "arena_visit_text",
            "servant_mask", "atkrace_startBtn", "atkrace_bg1",
            "progress_type3_red",
            "progress_type3_bg",
            "atkrace_xian_1",
            "atkrace_xiuxi",
            "atkrace_1_newui",
            "prisonview_1",
            "guide_hand"
        ]);
    };
    AtkraceView.prototype.dispose = function () {
        this.bottomBox = null;
        this.bottomTip = null;
        this.moreMask = null;
        this.moreInfoContainer = null;
        this.moreSwitchBtn = null;
        this.moreList = null;
        this.moreData = null;
        this.myScoreLabel = null;
        this.myRankLabel = null;
        this.playerImg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.onReset, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE, this.onUpdateModel, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.refreshMoreInfo, this);
        _super.prototype.dispose.call(this);
    };
    return AtkraceView;
}(CommonView));
__reflect(AtkraceView.prototype, "AtkraceView");
