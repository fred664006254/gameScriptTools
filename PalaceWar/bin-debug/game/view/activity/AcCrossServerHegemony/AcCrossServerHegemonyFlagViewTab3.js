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
//
var AcCrossServerHegemonyFlagViewTab3 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagViewTab3, _super);
    // private _oldScore: number = 0;
    function AcCrossServerHegemonyFlagViewTab3(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._flagNum = null;
        _this._scoreNumTxt = null;
        _this._scoreBtn = null;
        _this._canGetTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
        // console.log(param);
    }
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagViewTab3.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE, this.refreshScore, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshView, this);
        var rankData = Api.crossServerHegemonyVoApi.getFlagRankData();
        var redBg = BaseBitmap.create("accshegemony_ranktitlebg");
        redBg.width = 620;
        redBg.x = GameConfig.stageWidth / 2 - redBg.width / 2;
        redBg.y = 10;
        this.addChild(redBg);
        var detailBg = BaseBitmap.create("arena_bottom");
        detailBg.width = 600;
        detailBg.height = 235;
        detailBg.x = GameConfig.stageWidth / 2 - detailBg.width / 2;
        detailBg.y = GameConfig.stageHeigth - 89 - 60 - detailBg.height - 10;
        this.addChild(detailBg);
        var outbg = BaseBitmap.create("public_9_bg14");
        outbg.width = GameConfig.stageWidth - 20;
        // outbg.height = 730 - (1136 - GameConfig.stageHeigth ) - 60;//GameConfig.stageHeigth - 69 - 99;
        outbg.height = GameConfig.stageHeigth - 99 - 60 - 14 - redBg.height - detailBg.height - 1;
        outbg.x = GameConfig.stageWidth / 2 - outbg.width / 2;
        outbg.y = redBg.y + redBg.height + 2;
        this.addChild(outbg);
        outbg.visible = false;
        var detailLine = BaseBitmap.create("public_line1");
        detailLine.width = 600;
        detailLine.x = detailBg.x + detailBg.width / 2 - detailLine.width / 2;
        detailLine.y = detailBg.y + detailBg.height / 2 - detailLine.height / 2 + 5;
        this.addChild(detailLine);
        var playerName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagPlayername", [Api.playerVoApi.getPlayerName()]), 24, TextFieldConst.COLOR_WHITE);
        playerName.x = detailBg.x + 20;
        playerName.y = detailBg.y + 15;
        this.addChild(playerName);
        // let fNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.flagItemID);
        var fNum = this.vo.getSpecailToolNum();
        var flagNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagNum", [String(fNum)]), 24, TextFieldConst.COLOR_WHITE);
        flagNum.x = playerName.x;
        flagNum.y = playerName.y + playerName.height + 5;
        this.addChild(flagNum);
        this._flagNum = flagNum;
        var scoreNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagScore", [String(this.vo.getScore())]), 24, TextFieldConst.COLOR_WHITE);
        scoreNum.x = playerName.x;
        scoreNum.y = flagNum.y + flagNum.height + 5;
        this.addChild(scoreNum);
        this._scoreNumTxt = scoreNum;
        var rule1 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule1", [this.vo.resultscore]), 20, TextFieldConst.COLOR_WHITE);
        rule1.width = 560;
        rule1.lineSpacing = 4;
        rule1.x = playerName.x;
        rule1.y = detailBg.y + 135;
        this.addChild(rule1);
        var scoreBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "acCrossServerHegemonyFlagScoreBtn", this.scoreBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        scoreBtn.x = detailBg.x + detailBg.width - 20 - scoreBtn.width;
        scoreBtn.y = detailLine.y - scoreBtn.height - 5;
        this.addChild(scoreBtn);
        this._scoreBtn = scoreBtn;
        this._canGetTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagGetScore", [String(this.vo.canGetScore())]), 20, TextFieldConst.COLOR_BROWN);
        this._canGetTxt.x = this._scoreBtn.x + this._scoreBtn.width / 2 - this._canGetTxt.width / 2;
        this._canGetTxt.y = this._scoreBtn.y - 2 - this._canGetTxt.height;
        this.addChild(this._canGetTxt);
        if (this.vo.canGetScore() <= 0) {
            this._canGetTxt.visible = false;
        }
        var ruleBtn = ComponentManager.getButton("accshegemony_rulebtn", "acCrossServerHegemonyFlagRuleBtn", this.ruleBtnClick, this, null, null, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        ruleBtn.x = detailBg.x + detailBg.width - ruleBtn.width - 10;
        ruleBtn.y = detailBg.y + detailBg.height - 5 - ruleBtn.height;
        this.addChild(ruleBtn);
        // let listBg = BaseBitmap.create();
        // listBg.width = 600;
        // listBg.height = 640 - (1136 - GameConfig.stageHeigth);
        // listBg.x = GameConfig.stageWidth/2 - listBg.width/2;
        // listBg.y = line1.y - listBg.height;
        // this.addChild(listBg);
        var redRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRank"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        redRankTxt.x = 86 - redRankTxt.width / 2;
        redRankTxt.y = redBg.y + redBg.height / 2 - redRankTxt.height / 2;
        this.addChild(redRankTxt);
        var redDetailTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagDetail"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        redDetailTxt.x = 272 - redDetailTxt.width / 2;
        redDetailTxt.y = redBg.y + redBg.height / 2 - redDetailTxt.height / 2;
        this.addChild(redDetailTxt);
        var redTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagTotal"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        redTotalTxt.x = 450 - redTotalTxt.width / 2;
        redTotalTxt.y = redBg.y + redBg.height / 2 - redTotalTxt.height / 2;
        this.addChild(redTotalTxt);
        var redPlusTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagPlus"), 20, TextFieldConst.COLOR_WARN_YELLOW);
        redPlusTxt.x = 555 - redPlusTxt.width / 2;
        redPlusTxt.y = redBg.y + redBg.height / 2 - redPlusTxt.height / 2;
        this.addChild(redPlusTxt);
        var list = [];
        if (rankData && rankData.rank) {
            list = rankData.rank;
        }
        // let list = rankData.rank;
        var rect = new egret.Rectangle(0, 0, 620, outbg.height - 6);
        var scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyFlagScrollList3, list, rect, { aid: this.param.data.aid, code: this.param.data.code });
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2; //bottomBg.x;
        scrollList.y = outbg.y + 3;
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // this._oldScore = this.vo.getScore();
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this.refreshView();
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.refreshView = function () {
        if (!this._canGetTxt) {
            return;
        }
        // this._oldScore = 0;
        this._canGetTxt.text = LanguageManager.getlocal("acCrossServerHegemonyFlagGetScore", [String(this.vo.canGetScore())]);
        this._canGetTxt.x = this._scoreBtn.x + this._scoreBtn.width / 2 - this._canGetTxt.width / 2;
        this._scoreNumTxt.text = LanguageManager.getlocal("acCrossServerHegemonyFlagScore", [String(this.vo.getScore())]);
        // let fNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.flagItemID);
        var fNum = this.vo.getSpecailToolNum();
        this._flagNum.text = LanguageManager.getlocal("acCrossServerHegemonyFlagNum", [String(fNum)]);
        if (this.vo.canGetScore() > 0) {
            App.CommonUtil.addIconToBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(true);
        }
        else {
            this._canGetTxt.visible = false;
            App.CommonUtil.removeIconFromBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(false);
        }
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.refreshScore = function (event) {
        if (event && event.data && event.data.ret && event.data.data.ret == 0) {
            if (event && event.data && event.data.data && event.data.data.ret == 0) {
                var data = event.data.data.data;
                var addscore = data.addscore;
                if (addscore > 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyFlagPulsScore", [String(addscore)]));
                }
            }
        }
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.refreshData = function (event) {
        if (event.data && event.data.ret && event.data.data.ret == 0) {
            var d = event.data.data.data;
            var rank = d.rank;
            Api.crossServerHegemonyVoApi.setFlagOnlyRankData(rank);
            this._scrollList.refreshData(rank, { aid: this.param.data.aid, code: this.param.data.code });
            // let fNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.flagItemID);
            var fNum = this.vo.getSpecailToolNum();
            this._flagNum.text = LanguageManager.getlocal("acCrossServerHegemonyFlagNum", [String(fNum)]);
        }
    };
    // private canGetScore():number{
    //     let rankData = Api.crossServerHegemonyVoApi.getFlagRankData().rank;
    //     let needGetNum = 0;
    //     for(let i = 0;i < rankData.length; i++){
    //         let rData = rankData[i];
    //         if(Number(rData.endflag) != 0){
    //             if(!this.vo.checkGetFlagByAid(rData.aid)){
    //                 let sendFlagNum = this.vo.getFlagNumByAid(rData.aid);
    //                 let rebate = this.cfg.getFlagRebateByRank(i + 1);
    //                 needGetNum += sendFlagNum * rebate;
    //             }
    //         }
    //     }
    //     return needGetNum * this.cfg.flagScoreNum;
    // }
    AcCrossServerHegemonyFlagViewTab3.prototype.ruleBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYFLAGRULEPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
        });
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.scoreBtnClick = function () {
        if (this.vo.canGetScore() > 0) {
            // this._oldScore = this.vo.getScore();
            NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE, { activeId: this.vo.aidAndCode });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoGetFlag"));
        }
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.tick = function () {
    };
    AcCrossServerHegemonyFlagViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE, this.refreshScore, this);
        this._scrollList = null;
        this._flagNum = null;
        this._scoreNumTxt = null;
        this._scoreBtn = null;
        this._canGetTxt = null;
        // this._oldScore = 0;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagViewTab3;
}(CommonViewTab));
__reflect(AcCrossServerHegemonyFlagViewTab3.prototype, "AcCrossServerHegemonyFlagViewTab3");
//# sourceMappingURL=AcCrossServerHegemonyFlagViewTab3.js.map