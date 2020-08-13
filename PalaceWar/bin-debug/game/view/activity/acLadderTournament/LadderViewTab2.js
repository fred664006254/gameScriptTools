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
var LadderViewTab2 = (function (_super) {
    __extends(LadderViewTab2, _super);
    function LadderViewTab2() {
        var _this = _super.call(this) || this;
        _this._btnlist = [];
        _this._downsearchBtn = null;
        _this._clip = null;
        _this._upTipNode = null;
        _this._upSearchNode = null;
        _this._totalPower = null;
        _this._todayTimes = null;
        _this._itemIcon = null;
        _this._buyTimes = null;
        _this._aid = null;
        _this._code = null;
        _this._myRankScoreText = null;
        return _this;
    }
    Object.defineProperty(LadderViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderViewTab2.prototype, "acTivityId", {
        get: function () {
            return this._aid + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    LadderViewTab2.prototype.init = function (aid, code) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SELECTSERVANT), this.resetPower, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT), this.resetTopInfo, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK), this.resetTopInfo, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_LADDERTOURNAMENT, this.modelRefresh, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.resetRank, this);
        this._aid = aid;
        this._code = code;
        //下部
        var downBtn = ComponentManager.getButton("ladder_search_opponent", null, this.enterGroundHandle, this, null, 1);
        downBtn.setPosition(GameConfig.stageWidth / 2 - downBtn.width / 2, GameConfig.stageHeigth - 375 - 80);
        this.addChild(downBtn);
        this._downsearchBtn = downBtn;
        App.DisplayUtil.changeToGray(downBtn);
        var clip = ComponentManager.getCustomMovieClip("ladder_ef_xzds", 10, 120);
        // clip.setScale(1.1);
        clip.setPosition(downBtn.x - 20, downBtn.y - 53);
        this.addChild(clip);
        clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        this._clip = clip;
        this._clip.visible = false;
        var powerBg = BaseBitmap.create("ladder_power_bg1");
        // powerBg.width = 308;
        powerBg.setPosition(GameConfig.stageWidth / 2 - powerBg.width / 2, downBtn.y + downBtn.height - 10);
        this.addChild(powerBg);
        var power = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_TotalPower") + Api.playerVoApi.getPlayerPower(), 20, TextFieldConst.COLOR_BROWN);
        power.setPosition(GameConfig.stageWidth / 2 - power.width / 2, powerBg.y + powerBg.height / 2 - power.height / 2 + 5);
        this.addChild(power);
        this._totalPower = power;
        var powerBg2 = BaseBitmap.create("ladder_power_bg2");
        powerBg2.setPosition(GameConfig.stageWidth / 2 - powerBg2.width / 2, powerBg.y + powerBg.height - 5);
        this.addChild(powerBg2);
        var toptext1 = ComponentManager.getTextField("1", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        toptext1.width = powerBg2.width;
        toptext1.textAlign = egret.HorizontalAlign.CENTER;
        toptext1.lineSpacing = 4;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, toptext1, powerBg2);
        this.addChild(toptext1);
        this._myRankScoreText = toptext1;
        this.resetRank();
        // 中部
        var posTab = [
            { x: 135 + 50, y: 542 - 50 },
            { x: 0, y: 424 - 20 },
            { x: -45, y: 548 + 20 - 20 },
            { x: 51, y: 598 + 20 },
            { x: 225, y: 632 + 20 }
        ];
        var offsetY = (GameConfig.stageHeigth - 1136) / 2;
        var boos = ComponentManager.getCustomMovieClip("ladder_general1_stand_", 5, 150);
        boos.setScale(1.2);
        boos.setPosition(posTab[0].x, posTab[0].y - 290 + offsetY + 80);
        boos.playWithTime();
        this.addChild(boos);
        for (var i = 0; i < 4; i++) {
            var onebtn = new LadderTeamIcon();
            onebtn.init(i + 1, this.teamIconClick, this, Api.laddertournamentVoApi.isTeamFullByType(i));
            onebtn.setPosition(posTab[i + 1].x, posTab[i + 1].y - 290 + offsetY);
            this.addChild(onebtn);
            onebtn.setBuff(Api.laddertournamentVoApi.getBuffTimes(i + 1) > 0);
            this._btnlist.push(onebtn);
        }
        this.removeChild(this._btnlist[1]);
        this.addChild(this._btnlist[1]);
        //上部
        if (Api.laddertournamentVoApi.isTeamFull()) {
            this.initTop2();
        }
        else {
            this.initTop1();
        }
    };
    LadderViewTab2.prototype.resetRank = function () {
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
        this._myRankScoreText.text = LanguageManager.getlocal("acLadder_soreAndRank", [pointStr, rankstr]);
    };
    //不满 - tip
    LadderViewTab2.prototype.initTop1 = function () {
        this._upTipNode = new BaseDisplayObjectContainer();
        this.addChild(this._upTipNode);
        var tipbg = BaseBitmap.create("ladder_word_bg");
        tipbg.setPosition(GameConfig.stageWidth - 43 - tipbg.width, 60);
        this._upTipNode.addChild(tipbg);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_team_dispatch_tip"), 20, TextFieldConst.COLOR_BROWN);
        tip.width = 106;
        tip.lineSpacing = 5;
        tip.textAlign = egret.HorizontalAlign.CENTER;
        tip.setPosition(tipbg.x + tipbg.width / 2 - tip.width / 2, tipbg.y + 21);
        this._upTipNode.addChild(tip);
    };
    //满编 - button
    LadderViewTab2.prototype.initTop2 = function () {
        if (this._upTipNode) {
            this._upTipNode.dispose();
            this._upTipNode = null;
        }
        this._upSearchNode = new BaseDisplayObjectContainer();
        this.addChild(this._upSearchNode);
        var searchBtn = ComponentManager.getButton("ladder_search", null, this.enterGroundHandle, this, null, 1);
        searchBtn.setPosition(375, 50);
        this._upSearchNode.addChild(searchBtn);
        var infobg = BaseBitmap.create("ladderview_timebarbg");
        infobg.width = searchBtn.width;
        infobg.setPosition(searchBtn.x, searchBtn.y + searchBtn.height + 3);
        this._upSearchNode.addChild(infobg);
        var todaytimes = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_today_times", [String(0), String(5)]), 20);
        todaytimes.setPosition(searchBtn.x + searchBtn.width / 2 - todaytimes.width / 2, searchBtn.y + searchBtn.height + 8);
        this._upSearchNode.addChild(todaytimes);
        this._todayTimes = todaytimes;
        var itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];
        var icon = BaseLoadBitmap.create("itemicon_small2281");
        icon.width = 50;
        icon.height = 45;
        icon.setPosition(searchBtn.x + 50, infobg.y + infobg.height / 2 - icon.height / 2);
        this._upSearchNode.addChild(icon);
        this._itemIcon = icon;
        var needitem = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewTaskPlan", [String(0), String(5)]), 20);
        needitem.setPosition(icon.x + icon.width + 2, icon.y + icon.height / 2 - needitem.height / 2);
        this._upSearchNode.addChild(needitem);
        this._buyTimes = needitem;
        App.DisplayUtil.changeToNormal(this._downsearchBtn);
        this._clip.visible = true;
        this.resetTopInfo();
    };
    LadderViewTab2.prototype.resetTopInfo = function () {
        if (!this._upSearchNode) {
            return;
        }
        var fightNum = Api.laddertournamentVoApi.getFightTimes();
        var totalNum = this.cfg.freeNum;
        var freeNum = totalNum > fightNum ? totalNum - fightNum : 0;
        this._todayTimes.text = LanguageManager.getlocal("acLadder_today_times", [String(freeNum), String(totalNum)]);
        if (freeNum > 0) {
            this._todayTimes.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            this._todayTimes.visible = true;
            this._buyTimes.visible = false;
            this._itemIcon.visible = false;
        }
        else {
            this._todayTimes.textColor = TextFieldConst.COLOR_WARN_RED;
            this._todayTimes.visible = false;
            this._buyTimes.visible = true;
            this._itemIcon.visible = true;
        }
        var itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
        var needNum = itemvo.num;
        this._buyTimes.text = LanguageManager.getlocal("AcMazeViewTaskPlan", [String(hasNum), String(needNum)]);
        if (hasNum >= needNum) {
            this._buyTimes.textColor = TextFieldConst.COLOR_WHITE;
        }
        else {
            this._buyTimes.textColor = TextFieldConst.COLOR_WHITE;
        }
    };
    LadderViewTab2.prototype.modelRefresh = function () {
        for (var i = 0; i < this._btnlist.length; i++) {
            this._btnlist[i].setBuff(Api.laddertournamentVoApi.getBuffTimes(i + 1) > 0);
        }
    };
    LadderViewTab2.prototype.enterGroundHandle = function () {
        if (!Api.laddertournamentVoApi.isTeamFull()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_teams_less"));
            return;
        }
        if (Api.laddertournamentVoApi.checkIsTruce()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_truceTip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.LADDEROPPONENTVIEW, { aid: this._aid, code: this._code });
    };
    LadderViewTab2.prototype.resetPower = function () {
        if (Api.laddertournamentVoApi.isTeamFull() && !this._upSearchNode) {
            this.initTop2();
        }
        this._totalPower.text = LanguageManager.getlocal("allianceRankTotalPower") + Api.playerVoApi.getPlayerPower();
        this._totalPower.x = GameConfig.stageWidth / 2 - this._totalPower.width / 2;
        for (var i = 0; i < this._btnlist.length; i++) {
            this._btnlist[i].setTeamFull(Api.laddertournamentVoApi.isTeamFullByType(i));
        }
    };
    LadderViewTab2.prototype.teamIconClick = function (idx) {
        ViewController.getInstance().openView(ViewConst.POPUP.LADDERCHOOSETEAMPOPUPVIEW, { type: idx, aid: this._aid, code: this._code });
    };
    LadderViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SELECTSERVANT), this.resetPower, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT), this.resetTopInfo, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_LADDERTOURNAMENT, this.modelRefresh, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK), this.resetTopInfo, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.resetRank, this);
        this._btnlist.length = 0;
        this._downsearchBtn = null;
        this._upTipNode = null;
        this._upSearchNode = null;
        this._totalPower = null;
        this._todayTimes = null;
        this._itemIcon = null;
        this._buyTimes = null;
        this._aid = null;
        this._code = null;
        this._clip = null;
        this._myRankScoreText = null;
        _super.prototype.dispose.call(this);
    };
    return LadderViewTab2;
}(BaseDisplayObjectContainer));
__reflect(LadderViewTab2.prototype, "LadderViewTab2");
//# sourceMappingURL=LadderViewTab2.js.map