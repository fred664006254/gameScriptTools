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
var LadderRankViewTab1 = (function (_super) {
    __extends(LadderRankViewTab1, _super);
    function LadderRankViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._previousBtn = null;
        _this._backBtn = null;
        _this._type = 0;
        _this._scoreText = null;
        _this._rankText = null;
        _this._timeText = null;
        _this.initView();
        return _this;
    }
    LadderRankViewTab1.prototype.initView = function () {
        var view = this;
        var listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 268;
        listbg.setPosition(8, 0);
        this.addChild(listbg);
        var topBg = BaseBitmap.create("ladder_rank_title_bg");
        // topBg.width = 620;
        // topBg.height = 135;
        topBg.x = 10;
        topBg.y = 2;
        view.addChild(topBg);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_desc"), 20, TextFieldConst.COLOR_WHITE);
        descTF.width = 580;
        descTF.lineSpacing = 3;
        descTF.setPosition(30, 20);
        this.addChild(descTF);
        this._type = 1;
        if (Api.laddertournamentVoApi.getNowturn() > 1) {
            var beforeRankBtn = ComponentManager.getButton("ladder_beforerank_btn", null, this.beforeRankHandle, this);
            beforeRankBtn.setPosition(topBg.x + topBg.width - 35 - beforeRankBtn.width, topBg.y + topBg.height - 4 - beforeRankBtn.height);
            this.addChild(beforeRankBtn);
            this._previousBtn = beforeRankBtn;
            this._backBtn = ComponentManager.getButton("ladder_back_btn", null, this.backkHandle, this);
            this._backBtn.setPosition(topBg.x + topBg.width - 35 - beforeRankBtn.width, topBg.y + topBg.height - 4 - beforeRankBtn.height);
            this.addChild(this._backBtn);
            this._backBtn.visible = false;
        }
        var titleBg = BaseBitmap.create("ladder_itemtitlebg");
        titleBg.width = 598;
        titleBg.height = 40;
        titleBg.setPosition(21, topBg.y + topBg.height + 8);
        this.addChild(titleBg);
        var titleText1 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText1.setPosition(85 - titleText1.width / 2, titleBg.y + titleBg.height / 2 - titleText1.height / 2);
        this.addChild(titleText1);
        var titleText2 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText2.setPosition(193 - titleText2.width / 2, titleText1.y);
        this.addChild(titleText2);
        var titleText3 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText3.setPosition(335 - titleText3.width / 2, titleText1.y);
        this.addChild(titleText3);
        var titleText4 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText4.setPosition(455 - titleText4.width / 2, titleText1.y);
        this.addChild(titleText4);
        var titleText5 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText5.setPosition(555 - titleText5.width / 2, titleText1.y);
        this.addChild(titleText5);
        var tmpRect = new egret.Rectangle(0, 0, 606, listbg.height - topBg.y - topBg.height - 64);
        var scrollList = ComponentManager.getScrollList(LadderRankViewTab1Item, [], tmpRect);
        view._scrollList = scrollList;
        scrollList.setPosition(17, titleBg.y + titleBg.height + 8);
        view.addChild(scrollList);
        scrollList.bounces = false;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.y = listbg.y + listbg.height + 7;
        this.addChild(bottomBg);
        var myinfo = Api.laddertournamentVoApi.getMyRankArray();
        var bottomText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_name", [Api.playerVoApi.getPlayerName()]), 20, TextFieldConst.COLOR_WHITE);
        bottomText1.setPosition(65, bottomBg.y + 30);
        this.addChild(bottomText1);
        var bottomText2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        bottomText2.text = LanguageManager.getlocal("acLadder_Score", [String(Api.laddertournamentVoApi.getMyPoint())]);
        bottomText2.setPosition(bottomText1.x, bottomBg.y + 73);
        this.addChild(bottomText2);
        var bottomText3 = ComponentManager.getTextField("server", 20, TextFieldConst.COLOR_WHITE);
        bottomText3.setPosition(bottomText1.x + 320, bottomText1.y);
        bottomText3.text = LanguageManager.getlocal("acLadder_server", [String(Api.mergeServerVoApi.getTrueZid())]);
        this.addChild(bottomText3);
        var bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
        bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);
        this._scoreText = bottomText2;
        this._rankText = bottomText4;
        this._timeText = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeText.width = 480;
        this._timeText.textAlign = egret.HorizontalAlign.CENTER;
        this._timeText.setPosition(descTF.x, 100);
        this.addChild(this._timeText);
        this.resetInfo();
    };
    LadderRankViewTab1.prototype.beforeRankHandle = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.getrankCallBack, this);
        this._type = 2;
        var beforeTurn = Api.laddertournamentVoApi.getNowturn() - 1;
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK, { activeId: Api.laddertournamentVoApi.aidAndCode, turn: beforeTurn });
    };
    LadderRankViewTab1.prototype.backkHandle = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.getrankCallBack, this);
        this._type = 1;
        var beforeTurn = Api.laddertournamentVoApi.getNowturn();
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK, { activeId: Api.laddertournamentVoApi.aidAndCode, turn: beforeTurn });
    };
    LadderRankViewTab1.prototype.getrankCallBack = function (evt) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.getrankCallBack, this);
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (!this._scrollList) {
            return;
        }
        if (this._type == 1) {
            if (rData.rankArr) {
                Api.laddertournamentVoApi.setRankArrya(rData.rankArr);
            }
            if (rData.myrankArr) {
                Api.laddertournamentVoApi.setMyRankArrya(rData.myrankArr);
            }
        }
        else {
            if (rData.rankArr) {
                Api.laddertournamentVoApi.setPreRankArrya(rData.rankArr);
            }
            if (rData.myrankArr) {
                Api.laddertournamentVoApi.setPreMyRankArrya(rData.myrankArr);
            }
        }
        this.resetInfo();
    };
    LadderRankViewTab1.prototype.resetInfo = function () {
        if (!this._scrollList) {
            return;
        }
        if (this._type == 1) {
            if (this._backBtn && this._previousBtn) {
                this._backBtn.visible = false;
                this._previousBtn.visible = true;
            }
            this._scrollList.refreshData(Api.laddertournamentVoApi.getRankArray());
            var myinfo = Api.laddertournamentVoApi.getMyRankArray();
            var ranknum = myinfo.myrank;
            var rankstr = void 0;
            var pointStr = void 0;
            if (ranknum && myinfo.value != null) {
                rankstr = String(ranknum);
                pointStr = String(myinfo.value);
            }
            else {
                pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
            }
            this._scoreText.text = LanguageManager.getlocal("acLadderScore", [pointStr]);
            this._rankText.text = LanguageManager.getlocal("acLadder_rank", [rankstr]);
            this.tick();
        }
        else {
            if (this._backBtn && this._previousBtn) {
                this._backBtn.visible = true;
                this._previousBtn.visible = false;
            }
            this._scrollList.refreshData(Api.laddertournamentVoApi.getPreRankArray());
            var preInfo = Api.laddertournamentVoApi.getPreMyRankArray();
            var point = preInfo.value;
            if (!point) {
                point = 0;
            }
            this._scoreText.text = LanguageManager.getlocal("acLadderScore", [String(point)]);
            var ranknum = preInfo.myrank;
            var rankstr = void 0;
            var pointStr = void 0;
            if (ranknum && preInfo.value != null) {
                rankstr = String(ranknum);
                pointStr = String(preInfo.value);
            }
            else {
                pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
            }
            this._scoreText.text = LanguageManager.getlocal("acLadderScore", [pointStr]);
            this._rankText.text = LanguageManager.getlocal("acLadder_rank", [rankstr]);
            var time = Api.laddertournamentVoApi.getLastTurnTime();
            this._timeText.text = LanguageManager.getlocal("acLadder_rank_pretime", [App.DateUtil.getFormatBySecond(time[0], 6), App.DateUtil.getFormatBySecond(time[1], 6)]);
        }
    };
    LadderRankViewTab1.prototype.tick = function () {
        if (this._type == 1) {
            if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
                this._timeText.text = LanguageManager.getlocal("acPunishEnd");
            }
            else if (Api.laddertournamentVoApi.checkIsTruce()) {
                this._timeText.text = LanguageManager.getlocal("acLadder_TimeCountDownEnd1");
            }
            else {
                var lessTime = Api.laddertournamentVoApi.getNowturnLessTime();
                this._timeText.text = LanguageManager.getlocal("acLadder_rank_time", [App.DateUtil.getFormatBySecond(lessTime, 17)]);
            }
        }
    };
    LadderRankViewTab1.prototype.dispose = function () {
        this._previousBtn = null;
        this._backBtn = null;
        this._type = 0;
        this._scoreText = null;
        this._rankText = null;
        this._timeText = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return LadderRankViewTab1;
}(CommonViewTab));
__reflect(LadderRankViewTab1.prototype, "LadderRankViewTab1");
//# sourceMappingURL=LadderRankViewTab1.js.map