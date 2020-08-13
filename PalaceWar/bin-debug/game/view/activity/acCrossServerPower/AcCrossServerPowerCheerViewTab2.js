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
//助威
var AcCrossServerPowerCheerViewTab2 = (function (_super) {
    __extends(AcCrossServerPowerCheerViewTab2, _super);
    function AcCrossServerPowerCheerViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._flagNum = null;
        _this._scoreNumTxt = null;
        _this._scoreBtn = null;
        _this._canGetTxt = null;
        _this._cheerTip = null;
        _this.param = param;
        _this.initView();
        return _this;
        // console.log(param);
    }
    AcCrossServerPowerCheerViewTab2.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossServerPowerCheerViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerCheerViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD, this.refreshScore, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_USEFLAG, this.refreshData, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var baseView = ViewController.getInstance().getView("AcCrossServerPowerCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;
        var redBg = BaseBitmap.create("accshegemony_ranktitlebg");
        redBg.width = 620;
        redBg.x = GameConfig.stageWidth / 2 - redBg.width / 2;
        redBg.y = 10;
        this.addChild(redBg);
        var detailBg = BaseBitmap.create("arena_bottom");
        detailBg.width = 600;
        detailBg.height = 270;
        detailBg.x = GameConfig.stageWidth / 2 - detailBg.width / 2;
        detailBg.y = this.height - detailBg.height - 5;
        this.addChild(detailBg);
        var fNum = this.vo.getFightFlagNum();
        var flagNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerflag", this.getUiCode()), [String(fNum)]), 24, TextFieldConst.COLOR_WHITE);
        flagNum.x = detailBg.x + 20;
        flagNum.y = detailBg.y + 25;
        this.addChild(flagNum);
        this._flagNum = flagNum;
        var score = this.vo.getFlagScore();
        var scoreNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerPopularNum", this.getUiCode()), [String(score)]), 24, TextFieldConst.COLOR_WHITE);
        scoreNum.x = flagNum.x;
        scoreNum.y = flagNum.y + flagNum.height + 20;
        this.addChild(scoreNum);
        this._scoreNumTxt = scoreNum;
        var detailLine = BaseBitmap.create("public_line1");
        detailLine.width = 600;
        detailLine.x = detailBg.x + detailBg.width / 2 - detailLine.width / 2;
        detailLine.y = scoreNum.y + scoreNum.height + 15;
        this.addChild(detailLine);
        var info = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerInfo", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        info.width = 600;
        info.lineSpacing = 5;
        info.x = scoreNum.x;
        info.y = detailLine.y + detailLine.height + 20;
        this.addChild(info);
        var scoreBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, App.CommonUtil.getCnByCode("acCrossserverPowerCheerGetPopular", this.getUiCode()), this.scoreBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        scoreBtn.x = detailBg.x + detailBg.width - 20 - scoreBtn.width;
        scoreBtn.y = detailLine.y - scoreBtn.height - 15;
        this.addChild(scoreBtn);
        this._scoreBtn = scoreBtn;
        var ruleBtn = ComponentManager.getButton("accshegemony_rulebtn", App.CommonUtil.getCnByCode("acCrossserverPowerCheerRuleInfo", this.getUiCode()), this.ruleBtnClick, this, null, null, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        ruleBtn.x = detailBg.x + detailBg.width - ruleBtn.width - 10;
        ruleBtn.y = detailBg.y + detailBg.height - 5 - ruleBtn.height;
        this.addChild(ruleBtn);
        //倒计时
        var cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerNotOpen", this.getUiCode(), "7"));
        var cheerEndTime = this.vo.getCheerEndTime();
        if (GameData.serverTime >= cheerEndTime) {
            cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerFinish", this.getUiCode(), "7"));
        }
        else {
            if (!this.vo.isInAcPreTime()) {
                var timeStr = App.DateUtil.getFormatBySecond((cheerEndTime - GameData.serverTime), 1);
                cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerTimeDown", this.getUiCode(), "7"), [timeStr]);
            }
        }
        var cheerTip = ComponentManager.getTextField(cheerTipStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        cheerTip.setPosition(detailBg.x + 20, detailBg.y + detailBg.height - cheerTip.height - 10);
        this.addChild(cheerTip);
        this._cheerTip = cheerTip;
        var redRankTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerRank", this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        redRankTxt.x = 66 - redRankTxt.width / 2;
        redRankTxt.y = redBg.y + redBg.height / 2 - redRankTxt.height / 2;
        this.addChild(redRankTxt);
        var redNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerNick", this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        redNameTxt.x = 180 - redNameTxt.width / 2;
        redNameTxt.y = redBg.y + redBg.height / 2 - redNameTxt.height / 2;
        this.addChild(redNameTxt);
        var redPlusTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerAddPower", this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        redPlusTxt.x = 315 - redPlusTxt.width / 2;
        redPlusTxt.y = redBg.y + redBg.height / 2 - redPlusTxt.height / 2;
        this.addChild(redPlusTxt);
        var redTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerNumTitle", this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        redTotalTxt.x = 440 - redTotalTxt.width / 2;
        redTotalTxt.y = redBg.y + redBg.height / 2 - redTotalTxt.height / 2;
        this.addChild(redTotalTxt);
        var playerAddTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerSelfNum", this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        playerAddTxt.x = 560 - playerAddTxt.width / 2;
        playerAddTxt.y = redBg.y + redBg.height / 2 - playerAddTxt.height / 2;
        this.addChild(playerAddTxt);
        var list = [];
        var rankData = Api.crossPowerVoApi.flagRankInfo;
        if (rankData) {
            list = rankData;
        }
        var listH = detailBg.y - redBg.y - redBg.height - 5;
        var rect = new egret.Rectangle(0, 0, 620, listH);
        var scrollList = ComponentManager.getScrollList(AcCrossServerPowerCheerViewScrollItem2, list, rect, { aid: this.aid, code: this.code });
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2; //bottomBg.x;
        scrollList.y = redBg.y + redBg.height + 3;
        this.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        TickManager.addTick(this.tick, this);
        this.refreshView();
    };
    AcCrossServerPowerCheerViewTab2.prototype.tick = function () {
        if (this._cheerTip) {
            var cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerNotOpen", this.getUiCode(), "7"));
            var cheerEndTime = this.vo.getCheerEndTime();
            if (GameData.serverTime >= cheerEndTime) {
                cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerFinish", this.getUiCode(), "7"));
            }
            else {
                if (!this.vo.isInAcPreTime()) {
                    var timeStr = App.DateUtil.getFormatBySecond((cheerEndTime - GameData.serverTime), 1);
                    cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerTimeDown", this.getUiCode(), "7"), [timeStr]);
                }
            }
            this._cheerTip.text = cheerTipStr;
        }
    };
    AcCrossServerPowerCheerViewTab2.prototype.refreshView = function () {
        this._scoreNumTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerPopularNum", this.getUiCode()), [String(this.vo.getFlagScore())]);
        this._flagNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerflag", this.getUiCode()), [String(this.vo.getFightFlagNum())]);
        if (!this.vo.isGetFlagScore() && this.vo.isCanGetFlagScore()) {
            App.CommonUtil.addIconToBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(true);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(false);
        }
        var list = [];
        var rankData = Api.crossPowerVoApi.flagRankInfo;
        if (rankData) {
            list = rankData;
        }
        this._scrollList.refreshData(list, { aid: this.aid, code: this.code });
    };
    AcCrossServerPowerCheerViewTab2.prototype.refreshScore = function (event) {
        if (event && event.data && event.data.ret) {
            var data = event.data.data.data;
            var addscore = data.addscore;
            if (addscore > 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerFlagPulsScore", this.getUiCode()), [String(addscore)]));
            }
        }
        this.refreshView();
    };
    AcCrossServerPowerCheerViewTab2.prototype.refreshData = function (event) {
        if (event.data && event.data.ret) {
            var d = event.data.data.data;
            var rank = d.atkranks;
            Api.crossPowerVoApi.setFlagRankInfo(rank);
            this._scrollList.refreshData(rank, { aid: this.param.data.aid, code: this.param.data.code });
            this.refreshView();
        }
    };
    AcCrossServerPowerCheerViewTab2.prototype.scoreBtnClick = function () {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        if (this.vo.isCanGetFlagScore()) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD, { activeId: this.vo.aidAndCode });
        }
    };
    AcCrossServerPowerCheerViewTab2.prototype.ruleBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERCHEERRULEPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerPowerCheerViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD, this.refreshScore, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_USEFLAG, this.refreshData, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        TickManager.removeTick(this.tick, this);
        this._scrollList = null;
        this._flagNum = null;
        this._scoreNumTxt = null;
        this._scoreBtn = null;
        this._cheerTip = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerCheerViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerPowerCheerViewTab2.prototype, "AcCrossServerPowerCheerViewTab2");
//# sourceMappingURL=AcCrossServerPowerCheerViewTab2.js.map