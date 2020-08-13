/*
    author : shaoliang
    date : 2019.10.22
    desc : 天下至尊-选择对手
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
var LadderOpponentView = (function (_super) {
    __extends(LadderOpponentView, _super);
    function LadderOpponentView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._timesText = null;
        _this._myRankScoreText = null;
        return _this;
    }
    Object.defineProperty(LadderOpponentView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderOpponentView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderOpponentView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderOpponentView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderOpponentView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    LadderOpponentView.prototype.getTitleStr = function () {
        return "acLadder_opponent_choose";
    };
    LadderOpponentView.prototype.getRequestData = function () {
        // if (Api.laddertournamentVoApi.getOpponentInfo())
        // {
        //     return {requestType:NetRequestConst.REQUEST_LT_SEARCH,requestData:{activeId:this.acTivityId}};
        // }
        return { requestType: NetRequestConst.REQUEST_LT_SEARCH, requestData: { activeId: this.acTivityId } };
    };
    LadderOpponentView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emparena_bottom", "ladder_challeng_btn", "ladder_opponent_titlebg",
            "ladder_opponent_bg1", "ladder_opponent_bg2", "ladder_opponent_bg3",
            "ladder_opponent_bottom", "ladder_opponent_score1", "ladder_opponent_score2",
            "ladder_opponent_timesbg", "ladder_opponet_topbg",
        ]);
    };
    LadderOpponentView.prototype.initView = function () {
        var playersinfo = Api.laddertournamentVoApi.getOpponentInfo();
        if (!playersinfo || playersinfo[0]["uid"] == Api.playerVoApi.getPlayerID() || playersinfo[1]["uid"] == Api.playerVoApi.getPlayerID() || playersinfo[2]["uid"] == Api.playerVoApi.getPlayerID()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_please_wait"));
            this.hide();
            return;
        }
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SEARCH), this.refreshCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT), this.fightCallback, this);
        var topbg = BaseBitmap.create("ladder_opponet_topbg");
        topbg.y = -12;
        view.addChildToContainer(topbg);
        var powerBg = BaseBitmap.create("ladder_power_bg1");
        powerBg.setPosition(GameConfig.stageWidth / 2 - powerBg.width / 2, topbg.y + 0);
        this.addChildToContainer(powerBg);
        var power = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_TotalPower") + Api.playerVoApi.getPlayerPower(), 20, TextFieldConst.COLOR_BROWN);
        power.setPosition(GameConfig.stageWidth / 2 - power.width / 2, powerBg.y + powerBg.height / 2 - power.height / 2 + 5);
        this.addChildToContainer(power);
        var powerBg2 = BaseBitmap.create("ladder_power_bg2");
        powerBg2.setPosition(GameConfig.stageWidth / 2 - powerBg2.width / 2, powerBg.y + powerBg.height - 5);
        this.addChildToContainer(powerBg2);
        var toptext1 = ComponentManager.getTextField("1", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        toptext1.width = powerBg2.width;
        toptext1.textAlign = egret.HorizontalAlign.CENTER;
        toptext1.lineSpacing = 4;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, toptext1, powerBg2);
        this.addChildToContainer(toptext1);
        this._myRankScoreText = toptext1;
        this.resetRank();
        var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 95 - 110 - topbg.height + topbg.y);
        var scrollList = ComponentManager.getScrollList(LadderOpponentViewItem, Api.laddertournamentVoApi.getOpponentInfo(), tmpRect);
        scrollList.setPosition(0, topbg.y + topbg.height);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        this._scrollList = scrollList;
        var bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this.addChild(bottomBg);
        var tips = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_opponent_tips"), 20, TextFieldConst.COLOR_WHITE);
        tips.setPosition(20, bottomBg.y + 35);
        tips.lineSpacing = 5;
        this.addChild(tips);
        var changeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acLadder_change_opponent", this.changeHandle, this);
        changeBtn.setPosition(GameConfig.stageWidth * 0.75 - changeBtn.width / 2, bottomBg.y + 48);
        this.addChild(changeBtn);
        var times = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WHITE);
        times.width = GameConfig.stageWidth / 2;
        times.x = GameConfig.stageWidth / 2;
        times.y = bottomBg.y + 18;
        times.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(times);
        this._timesText = times;
        this.tick();
    };
    LadderOpponentView.prototype.resetRank = function () {
        var myinfo = Api.laddertournamentVoApi.getMyRankArray();
        var ranknum = myinfo.myrank;
        var rankstr;
        var pointStr;
        if (ranknum && myinfo.value != null) {
            rankstr = String(ranknum);
            pointStr = Api.laddertournamentVoApi.getMyPoint().toString(); //String(myinfo.value);
        }
        else {
            pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
        }
        this._myRankScoreText.text = LanguageManager.getlocal("acLadder_soreAndRank", [pointStr, rankstr]);
    };
    LadderOpponentView.prototype.tick = function () {
        var info = Api.laddertournamentVoApi.getRefreshInfo();
        var num = info.num;
        if (num > 0) {
            this._timesText.text = LanguageManager.getlocal("acLadder_opponent_times", [String(num), "5"]);
        }
        else {
            var oneGap = 300;
            var timeGap = GameData.serverTime - info.lasttime;
            var times = Math.floor(timeGap / oneGap);
            if (times > 0) {
                this._timesText.text = LanguageManager.getlocal("acLadder_opponent_times", [String(times), "5"]);
            }
            else {
                var timestr = App.DateUtil.getFormatBySecond(300 - timeGap, 1);
                this._timesText.text = LanguageManager.getlocal("acLadder_opponent_refreshtime", [timestr]);
            }
        }
        if (Api.laddertournamentVoApi.checkIsTruce()) {
            this.hide();
        }
    };
    LadderOpponentView.prototype.changeHandle = function () {
        var info = Api.laddertournamentVoApi.getRefreshInfo();
        var num = info.num;
        if (num <= 0) {
            var oneGap = 300;
            var timeGap = GameData.serverTime - info.lasttime;
            var times = Math.floor(timeGap / oneGap);
            if (times <= 0) {
                var timestr = App.DateUtil.getFormatBySecond(300 - timeGap, 1);
                var tipstr = LanguageManager.getlocal("acLadder_opponent_notimes", [timestr]);
                App.CommonUtil.showTip(tipstr);
                return;
            }
        }
        NetManager.request(NetRequestConst.REQUEST_LT_SEARCH, { activeId: this.acTivityId, refresh: 1 });
    };
    LadderOpponentView.prototype.refreshCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        if (this._scrollList) {
            this.refreshList();
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_refresh_success"));
            this.resetRank();
        }
    };
    LadderOpponentView.prototype.fightCallback = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            return;
        }
        if (evt.data.data.ret == -3) {
            NetManager.request(NetRequestConst.REQUEST_LT_SEARCH, { activeId: this.acTivityId });
            return;
        }
        if (!evt.data.ret) {
            return;
        }
        if (rData.pklogs) {
            Api.laddertournamentVoApi.setFightData(rData);
            ViewController.getInstance().openView(ViewConst.COMMON.LADDEROPPONENAPPEARTVIEW);
            this.hide();
        }
        else {
            if (this._scrollList) {
                this.refreshList();
            }
        }
    };
    LadderOpponentView.prototype.refreshList = function () {
        this._scrollList.refreshData(Api.laddertournamentVoApi.getOpponentInfo());
        this.tick();
    };
    LadderOpponentView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SEARCH), this.refreshCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT), this.fightCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        this._scrollList = null;
        this._timesText = null;
        this._myRankScoreText = null;
        _super.prototype.dispose.call(this);
    };
    return LadderOpponentView;
}(CommonView));
__reflect(LadderOpponentView.prototype, "LadderOpponentView");
//# sourceMappingURL=LadderOpponentView.js.map