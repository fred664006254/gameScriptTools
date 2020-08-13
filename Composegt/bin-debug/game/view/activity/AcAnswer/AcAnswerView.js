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
/**
 * yanyuling
 * 问卷答题
 */
var AcAnswerView = (function (_super) {
    __extends(AcAnswerView, _super);
    function AcAnswerView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._scoreTxt = null;
        _this._timesText = null;
        _this._activitynessText = null;
        _this._questOrderText = null;
        _this._questScoreText = null;
        _this._questDescText = null;
        _this._questprogress = null;
        _this._questOrderText2 = null;
        _this._questCdBifFont = null;
        _this._cdNums = 0;
        _this._questionSecs = 0;
        _this._answerOptList = [];
        _this._curOpt = 0;
        _this._isanswering = false;
        _this._endParams = undefined;
        _this._isFromAnserBtn = false; //是否按钮出发答题
        _this._rightAnswerOpt = 0; //正确答案id；
        _this._isOptClicked = false;
        _this._resiTimeText = null;
        _this._isInView = false;
        _this._sTime = 0;
        return _this;
    }
    Object.defineProperty(AcAnswerView.prototype, "config", {
        //init view 
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnswerView.prototype, "code", {
        get: function () {
            if (this.param && this.param.data) {
                return this.param.data;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnswerView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAnswerView.prototype.initView = function () {
        this._isInView = true;
        var cfg = this.config;
        App.MessageHelper.addEventListener(MessageConst.EXAMANSWER_POINTCHANGE, this.refreshAfterPointChange, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.refreshAfterPointChange, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshAfterPointChange, this);
        var bg = BaseBitmap.create("acanswer_centerbg");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2 + this.titleBg.height;
        this.addChild(bg);
        this._bg = bg;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            //排行榜 
            var bottomBg = BaseBitmap.create("acanswer_bottomg");
            this.addChild(bottomBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, this.viewBg);
            var rankBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acPunishRankRewardPopupViewTitle", this.rankHandle, this, null, 0);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankBtn, bottomBg);
            this.addChild(rankBtn);
        }
        var timeBg = BaseLoadBitmap.create("acanswer_topbg");
        timeBg.width = GameConfig.stageWidth;
        timeBg.height = 142;
        timeBg.x = 0;
        timeBg.y = this.titleBg.y + this.titleBg.height;
        this.addChild(timeBg);
        var timeText = ComponentManager.getTextField(LanguageManager.getlocal("acAnswerTime", [this.acVo.acTimeAndHour]), 20, TextFieldConst.COLOR_WHITE);
        timeText.x = timeBg.x + 5;
        timeText.y = timeBg.y + 10;
        this.addChild(timeText);
        var deltaT = this.acVo.et - 86400 - GameData.serverTime;
        var timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acAnswerResidueTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
        }
        else {
            timeStr = LanguageManager.getlocal("acAnswerResidueTime", [LanguageManager.getlocal("acAnswerTimeEnd")]);
        }
        this._resiTimeText = ComponentManager.getTextField(timeStr, 20, TextFieldConst.COLOR_WHITE);
        this._resiTimeText.x = GameConfig.stageWidth - 5 - this._resiTimeText.width;
        this._resiTimeText.y = timeText.y;
        this.addChild(this._resiTimeText);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("acAnswerDesc", ["" + cfg.cost, "" + cfg.answerTime]), 20, TextFieldConst.COLOR_WHITE);
        descText.width = 600;
        descText.lineSpacing = 7;
        descText.x = timeText.x;
        descText.y = timeText.y + timeText.height + 10;
        this.addChild(descText);
        var txt = BaseBitmap.create("examanswer_title_img");
        txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
        txt.y = this.titleBg.y + 5;
        this.addChild(txt);
        var closebtn = ComponentManager.getButton(ButtonConst.BTN_WIN_CLOSEBTN, "", this.closeBtnHandler, this);
        closebtn.x = PlatformManager.hasSpcialCloseBtn() ? 20 : (GameConfig.stageWidth - closebtn.width - 20);
        closebtn.y = txt.y;
        closebtn.name = "collectBtn";
        this.addChild(closebtn);
        this._closebtn = closebtn;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        //当前活跃度
        this._activitynessText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        this._activitynessText.text = LanguageManager.getlocal("acAnswerCurAct", ["" + this.acVo.point]);
        this._activitynessText.x = GameConfig.stageWidth / 2;
        this._activitynessText.y = bg.y + 180;
        this._nodeContainer.addChild(this._activitynessText);
        //今日答题次数
        this._timesText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        this._timesText.text = LanguageManager.getlocal("acAnswerTodayNum", ["" + this.acVo.anum]);
        this._timesText.x = GameConfig.stageWidth / 2;
        this._timesText.y = this._activitynessText.y + this._activitynessText.height + 2;
        this._nodeContainer.addChild(this._timesText);
        //开始答题按钮
        var answerbtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acAnswerStart", this.answerBtnHandler, this);
        answerbtn.x = GameConfig.stageWidth / 2 - answerbtn.width / 2;
        answerbtn.y = this._timesText.y + 50;
        this.addChild(answerbtn);
        this._answerbtn = answerbtn;
        if (this.acVo.point < (this.acVo.anum + 1) * this.config.cost) {
            this._answerbtn.setText("acAnswerStart_needAct");
        }
        if ((this.acVo.et - 86400 - GameData.serverTime) <= 0) {
            this._answerbtn.setText("acPunishEnd");
            App.DisplayUtil.changeToGray(this._answerbtn);
        }
        //科举积分
        this._scoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        this._scoreTxt.text = LanguageManager.getlocal("acAnswerScore", ["" + this.acVo.tscore]);
        this._scoreTxt.x = GameConfig.stageWidth / 2;
        this._scoreTxt.y = answerbtn.y + answerbtn.height + 10;
        this._nodeContainer.addChild(this._scoreTxt);
        //某一个问题的上部信息
        this._questionsContainer = new BaseDisplayObjectContainer();
        this.addChild(this._questionsContainer);
        this._questOrderText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._questOrderText.text = LanguageManager.getlocal("acAnswerQuestionCount");
        this._questOrderText.x = 160;
        this._questOrderText.y = bg.y + 70;
        this._questionsContainer.addChild(this._questOrderText);
        this._questScoreText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._questScoreText.text = LanguageManager.getlocal("acAnswerScoreCount");
        this._questScoreText.x = 470 - this._questScoreText.width;
        this._questScoreText.y = this._questOrderText.y;
        this._questionsContainer.addChild(this._questScoreText);
        this._questDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        this._questDescText.multiline = true;
        this._questDescText.lineSpacing = 3;
        this._questDescText.width = 330;
        this._questDescText.text = ""; //LanguageManager.getlocal("acAnswerQuestionCount");
        this._questDescText.x = this._questOrderText.x;
        this._questDescText.y = this._questOrderText.y + 30;
        this._questionsContainer.addChild(this._questDescText);
        this._questprogress = ComponentManager.getProgressBar("progress_type3_yellow", "progress_type3_bg", 300);
        this._questprogress.x = GameConfig.stageWidth / 2 - this._questprogress.width / 2;
        this._questprogress.y = this._questDescText.y + 100;
        this._questprogress.setTextColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        this._questprogress.setTextSize(18);
        this._questprogress.setPercentage(0.5);
        this._questionsContainer.addChild(this._questprogress);
        this._questOrderText2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._questOrderText2.text = LanguageManager.getlocal("acAnswerQuestionCount");
        this._questOrderText2.x = GameConfig.stageWidth / 2 - this._questOrderText2.width / 2;
        this._questOrderText2.y = this._questprogress.y + 70;
        this._questionsContainer.addChild(this._questOrderText2);
        this._questCdBifFont = ComponentManager.getBitmapText("3", "activity_fnt", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // this._questCdBifFont.text  = LanguageManager.getlocal("acAnswerQuestionCount");
        this._questCdBifFont.x = GameConfig.stageWidth / 2 - this._questCdBifFont.width / 2 - 5;
        this._questCdBifFont.y = this._questOrderText2.y + 50;
        this._questionsContainer.addChild(this._questCdBifFont);
        // ComponentManager.getBitmapText(this._curPrizeNum.toString(),"activity_fnt");
        //问题的下部选项信息
        this._questionOptContainer = new BaseDisplayObjectContainer();
        this.addChild(this._questionOptContainer);
        this._endContainer = new BaseDisplayObjectContainer();
        this.addChild(this._endContainer);
        this._endContainer.visible = this._questionOptContainer.visible = this._questionsContainer.visible = false;
        if (this._endParams) {
            this.showEndResult(this._endParams);
        }
        else {
            this.refreshAfterPointChange();
        }
    };
    AcAnswerView.prototype.showEnterInfo = function () {
        this._endContainer.visible = this._questionsContainer.visible = false;
        this._nodeContainer.visible = true;
        this._answerbtn.visible = true;
        this.refreshAfterPointChange();
    };
    AcAnswerView.prototype.refreshAfterPointChange = function () {
        if (!this._isInView)
            return;
        var cost_point = (this.acVo.anum + 1) * this.config.cost;
        if (this.acVo.anum == this.config.answerTime) {
            cost_point = (this.acVo.anum) * this.config.cost;
        }
        if (this.acVo.point < cost_point) {
            this._activitynessText.text = LanguageManager.getlocal("acAnswerCurAct_red", [this.acVo.point + "/" + cost_point]);
        }
        else {
            this._activitynessText.text = LanguageManager.getlocal("acAnswerCurAct", [this.acVo.point + "/" + cost_point]);
        }
        this._timesText.text = LanguageManager.getlocal("acAnswerTodayNum", [this.acVo.anum + "/" + this.config.answerTime]);
        this._scoreTxt.text = LanguageManager.getlocal("acAnswerScore", ["" + this.acVo.tscore]);
        this._activitynessText.anchorOffsetX = this._activitynessText.width / 2;
        this._timesText.anchorOffsetX = this._timesText.width / 2;
        this._scoreTxt.anchorOffsetX = this._scoreTxt.width / 2;
        if (this.acVo.point < cost_point && this.acVo.anum < this.config.answerTime) {
            this._answerbtn.setText("acAnswerStart_needAct");
        }
        else {
            this._answerbtn.setText("acAnswerStart");
        }
        if (this.acVo.anum == this.config.answerTime) {
            this._answerbtn.setText("acAnswerStart_acEnd");
            App.DisplayUtil.changeToGray(this._answerbtn);
        }
        if ((this.acVo.et - 86400 - GameData.serverTime) <= 0) {
            this._answerbtn.setText("acPunishEnd");
            App.DisplayUtil.changeToGray(this._answerbtn);
        }
    };
    AcAnswerView.prototype.refreshQuestionInfo = function () {
        this._isOptClicked = false;
        this._cdNums = 3;
        this._questprogress.setPercentage(1.0);
        this._questprogress.setText(LanguageManager.getlocal("acAnswerTimeCount", ["" + this.config.timeLimit]));
        var qinfo = this.acVo.qinfo;
        this._questionsContainer.visible = true;
        this._nodeContainer.visible = false;
        this._answerbtn.visible = false;
        this._questOrderText.text = LanguageManager.getlocal("acAnswerQuestionCount", [(qinfo.endindex + 1) + "/" + this.config.answerNum]);
        this._questScoreText.text = LanguageManager.getlocal("acAnswerScoreCount", ["" + qinfo.score]);
        var queidx = qinfo.list[qinfo.endindex] - 1;
        var questcfg = this.config.poolList[queidx];
        // if(!questcfg || !questcfg.questionID){
        //     console.log("queidx >>> " + queidx);
        //     for (var key in qinfo.list) {
        //         if (qinfo.list.hasOwnProperty(key)) {
        //             console.log(key + " >>> " + qinfo.list[key]);
        //         }
        //     }
        // }
        var questionID = questcfg.questionID;
        this._questDescText.text = LanguageManager.getlocal("question_" + questionID);
        this._questOrderText2.text = LanguageManager.getlocal("acAnswerQuestionCount", ["" + (qinfo.endindex + 1)]);
        this._rightAnswerOpt = questcfg.rightAnswer;
        this._questionOptContainer.visible = false;
        if (this._answerOptList.length > 0) {
            for (var index = 0; index < 4; index++) {
                var optBitmap = this._answerOptList[index].optBitmap;
                optBitmap.texture = ResourceManager.getRes("examanswer_selected_bg2");
                var optflag = this._answerOptList[index].optflag;
                var flagpath = "examanswer_flag2";
                if (this._rightAnswerOpt == (index + 1)) {
                    flagpath = "examanswer_flag1";
                }
                optflag.texture = ResourceManager.getRes(flagpath);
                optflag.visible = false;
                var opttxt = this._answerOptList[index].opttxt;
                opttxt.text = LanguageManager.getlocal("question_" + questionID + "_" + (index + 1));
                opttxt.x = optBitmap.x + optBitmap.width / 2 - opttxt.width / 2;
            }
        }
        else {
            this._questionOptContainer.removeChildren();
            for (var index = 0; index < 4; index++) {
                var curidx = index + 1;
                var optBitmap = BaseBitmap.create("examanswer_selected_bg2");
                optBitmap.x = GameConfig.stageWidth / 2 - optBitmap.width / 2;
                optBitmap.y = this._questprogress.y + this._questprogress.height + (6 + optBitmap.height) * index + 5;
                optBitmap.addTouchTap(this.sendAnswerOpt, this, [curidx]);
                this._questionOptContainer.addChild(optBitmap);
                var opttxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                opttxt.text = LanguageManager.getlocal("question_" + questionID + "_" + curidx);
                opttxt.x = optBitmap.x + optBitmap.width / 2 - opttxt.width / 2;
                opttxt.y = optBitmap.y + optBitmap.height / 2 - opttxt.height / 2;
                this._questionOptContainer.addChild(opttxt);
                var flagpath = "examanswer_flag2";
                if (this._rightAnswerOpt == (index + 1)) {
                    flagpath = "examanswer_flag1";
                }
                var optflag = BaseBitmap.create(flagpath);
                optflag.x = optBitmap.x + optBitmap.width - 10;
                optflag.y = optBitmap.y + optBitmap.height / 2 - optflag.height / 2;
                this._questionOptContainer.addChild(optflag);
                optflag.visible = false;
                this._answerOptList.push({ optBitmap: optBitmap, optflag: optflag, opttxt: opttxt });
            }
        }
    };
    AcAnswerView.prototype.showEndResult = function (param) {
        this._closebtn.visible = true;
        this._isanswering = false; //答题结束
        this._questionsContainer.visible = false;
        this._nodeContainer.visible = false;
        this._answerbtn.visible = false;
        this._questionOptContainer.visible = false;
        // this._questionOptContainer.removeChildren();
        this._endContainer.removeChildren();
        this._endContainer.visible = true;
        //今日答题次数
        var restxt1 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt1.text = LanguageManager.getlocal("acAnswerRightCount");
        restxt1.x = GameConfig.stageWidth / 2 - restxt1.width / 2;
        restxt1.y = this._bg.y + 130;
        this._endContainer.addChild(restxt1);
        var restxt2 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt2.text = LanguageManager.getlocal("acAnswerQuestion", ["" + param.oknum]);
        restxt2.x = GameConfig.stageWidth / 2 - restxt2.width / 2;
        restxt2.y = restxt1.y + 30;
        this._endContainer.addChild(restxt2);
        var restxt3 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt3.text = LanguageManager.getlocal("acAnswerSumTime", ["" + param.usetime]);
        restxt3.x = GameConfig.stageWidth / 2 - restxt3.width / 2;
        restxt3.y = restxt2.y + 60;
        this._endContainer.addChild(restxt3);
        var restxt4 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt4.text = LanguageManager.getlocal("acAnswerComment", [this.getScroRankTxt(param.score)]);
        restxt4.x = GameConfig.stageWidth / 2 - restxt4.width / 2;
        restxt4.y = restxt3.y + 30;
        this._endContainer.addChild(restxt4);
        var restxt5 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt5.text = LanguageManager.getlocal("acAnswerGetScore", ["" + param.score]);
        restxt5.x = GameConfig.stageWidth / 2 - restxt5.width / 2;
        restxt5.y = restxt4.y + 70;
        this._endContainer.addChild(restxt5);
        var restxt6 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt6.text = LanguageManager.getlocal("acAnswerGetGoods", ["" + param.tnum]);
        restxt6.x = GameConfig.stageWidth / 2 - restxt6.width / 2;
        restxt6.y = restxt5.y + 30;
        this._endContainer.addChild(restxt6);
        //开始答题按钮
        var confirmbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.showEnterInfo, this);
        confirmbtn.x = GameConfig.stageWidth / 2 - confirmbtn.width / 2;
        confirmbtn.y = restxt5.y + 90;
        this._endContainer.addChild(confirmbtn);
    };
    AcAnswerView.prototype.getScroRankTxt = function (score) {
        var rank = this.config.ranklist;
        for (var index = 0; index < rank.length; index++) {
            var element = rank[index].scoreRange;
            if (element[0] <= score && element[1] > score) {
                return LanguageManager.getlocal("acAnswer_rankTxt" + (index + 1));
                // break;
            }
        }
        return LanguageManager.getlocal("acAnswer_rankTxt1");
    };
    AcAnswerView.prototype.sendAnswerOpt = function (obj, optid) {
        if (!this.acVo.isInActivity() || this.acVo.isInExtra()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            this.hide();
            return;
        }
        if (this._isOptClicked) {
            return;
        }
        if (this.acVo.cannum < 1 || this.checkIsNewDay()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acAnswerStart_acEnd"));
            this.hide();
            return;
        }
        var usetime = Math.floor((this._sTime - egret.getTimer()) / 1000) + this.config.timeLimit;
        if (usetime < 0) {
            optid = 0;
        }
        this._isOptClicked = true;
        this._curOpt = optid;
        var usttime = Math.max((this.config.timeLimit - Math.max(usetime, 0)), 0);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWEROPT, this.sendAnswerOptCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWEROPT, { activeId: this.acVo.aidAndCode, optid: "" + optid, usttime: usttime });
        if (this._curOpt > 0) {
            this.refreshOptState();
        }
    };
    AcAnswerView.prototype.refreshOptState = function () {
        this._answerOptList[this._curOpt - 1].optBitmap.texture = ResourceManager.getRes("examanswer_selected_bg1");
        for (var index = 0; index < this._answerOptList.length; index++) {
            var element = this._answerOptList[index];
            var optflag = element.optflag;
            optflag.visible = true;
        }
    };
    AcAnswerView.prototype.sendAnswerOptCallBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWEROPT, this.sendAnswerOptCallBack, this);
        var data = event.data;
        if (data.data.ret == 0) {
            var qinfo = this.acVo.qinfo;
            if (this._rightAnswerOpt == this._curOpt) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnswer_answerTip3", ["" + data.data.data.score]));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnswer_answerTip4", ["" + data.data.data.score]));
            }
            var rewards = data.data.data.rewards || "";
            //答完所有题目
            if (qinfo.endindex == 0) {
                var retrewards = data.data.data.retrewards;
                var tnum = retrewards.split("_")[2];
                egret.Tween.get(this).wait(1000).call(this.showEndResult, this, [{ oknum: data.data.data.oknum, score: data.data.data.tscore, usetime: data.data.data.usetime, tnum: tnum }]);
                if (rewards != "") {
                    rewards = rewards + "|" + retrewards;
                }
                else {
                    rewards = retrewards;
                }
            }
            else {
                egret.Tween.get(this).wait(1000).call(this.refreshQuestionInfo, this);
            }
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
    };
    AcAnswerView.prototype.answerBtnHandler = function () {
        if (!this.acVo.isInActivity() || this.acVo.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        //需要判断活跃积分是否足够
        if (this.acVo.point < (this.acVo.anum + 1) * this.config.cost && this.acVo.anum < this.config.answerTime) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acAnswer_answerTip1"));
            ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
            return;
        }
        if (this.acVo.anum >= this.config.answerTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acAnswer_answerTip2"));
            return;
        }
        var rewardStr = LanguageManager.getlocal("acAnswerConfirmTip");
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: rewardStr,
            callback: this.doStartAnswer,
            handler: this,
            needCancel: true
        });
    };
    AcAnswerView.prototype.doStartAnswer = function () {
        this._isFromAnserBtn = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWERWIN, { activeId: this.acVo.aidAndCode, issure: 1 });
    };
    AcAnswerView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWERWIN, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcAnswerView.prototype.receiveData = function (data) {
        if (data.data.ret == 0) {
            var rdata = data.data.data;
            if (rdata.usetime != undefined) {
                var retrewards = rdata.retrewards || "";
                var tnum = retrewards.split("_")[2] || 0;
                this._endParams = { oknum: rdata.oknum, score: rdata.tscore, usetime: rdata.usetime, tnum: tnum };
            }
            if (this._isFromAnserBtn) {
                this._isanswering = true;
                this._closebtn.visible = false;
                this.refreshQuestionInfo();
            }
        }
        this._isFromAnserBtn = false;
    };
    AcAnswerView.prototype.checkIsNewDay = function () {
        return !(App.DateUtil.getWeeTs(this.acVo.todaySt) == App.DateUtil.getWeeTs(GameData.serverTime));
    };
    AcAnswerView.prototype.tick = function () {
        if (!this.acVo.isStart) {
            this._closebtn.visible = true;
        }
        var deltaT = this.acVo.et - 86400 - GameData.serverTime;
        if (this._resiTimeText && deltaT > 0) {
            this._resiTimeText.text = LanguageManager.getlocal("acAnswerResidueTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this._resiTimeText.x = GameConfig.stageWidth - 5 - this._resiTimeText.width;
        }
        else {
            this._resiTimeText.text = LanguageManager.getlocal("acAnswerResidueTime", [LanguageManager.getlocal("acAnswerTimeEnd")]);
            this._resiTimeText.x = GameConfig.stageWidth - 5 - this._resiTimeText.width;
            this._answerbtn.setText("acPunishEnd");
            App.DisplayUtil.changeToGray(this._answerbtn);
        }
        if (!this._isanswering) {
            return;
        }
        //3s倒计时
        var limit = this.config.timeLimit;
        if (this._cdNums > 0) {
            this._questCdBifFont.text = "" + this._cdNums;
            this._questOrderText2.visible = this._questCdBifFont.visible = true;
            this._questprogress.setPercentage(1.0);
            this._questprogress.setText(LanguageManager.getlocal("acAnswerTimeCount", ["" + limit]));
            this._sTime = egret.getTimer();
            this._questionSecs = limit;
            this._questionOptContainer.visible = false;
        }
        else {
            // if(this._cdNums == 0){
            //     this._sTime = GameData.serverTime;
            //     this._questionSecs = limit;
            // }
            this._questOrderText2.visible = this._questCdBifFont.visible = false;
            this._questionOptContainer.visible = true;
            //真正开始答题,展示选项
            if (this._questionSecs > 0) {
                this._questprogress.setPercentage(this._questionSecs / limit);
                this._questprogress.setText(LanguageManager.getlocal("acAnswerTimeCount", ["" + this._questionSecs]));
                this._questionSecs = Math.floor((this._sTime - egret.getTimer()) / 1000) + limit;
            }
            else {
                if (this._questionSecs + 100 != 0) {
                    this._questionSecs = 0;
                    this._questprogress.setPercentage(0);
                    this._questprogress.setText(LanguageManager.getlocal("acAnswerTimeCount", ["0"]));
                    this.sendAnswerOpt(this, 0);
                    this._questionSecs = -100;
                }
            }
        }
        this._cdNums--;
        return false;
    };
    AcAnswerView.prototype.rankHandle = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACANSWERRANKREWARDPOPUPVIEW, { aid: this.acVo.aid, code: this.acVo.code });
    };
    //跳转充值界面
    AcAnswerView.prototype.closeBtnHandler = function () {
        this.hide();
    };
    //不显示标题名字
    AcAnswerView.prototype.getTitleStr = function () {
        return null;
    };
    AcAnswerView.prototype.getTitleBgName = function () {
        return "acanswer_titlebg";
    };
    // 不使用组件的关闭按钮
    AcAnswerView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcAnswerView.prototype.getBgName = function () {
        return "acanswer_bg";
    };
    //加载资源
    AcAnswerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acanswer_bg", "acanswer_centerbg", "acanswer_titlebg", "acanswer_topbg", "acanswer_bottomg",
            "examanswer_flag1", "examanswer_flag2", "examanswer_selected_bg1", "examanswer_selected_bg2", "examanswer_title_img",
            "progress_type3_yellow", "progress_type3_bg", "activity_fnt", "arena_rank_text", "arena_rank", "forpeople_bottom",
        ]);
    };
    AcAnswerView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.EXAMANSWER_POINTCHANGE, this.refreshAfterPointChange, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.refreshAfterPointChange, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshAfterPointChange, this);
        this._isInView = false;
        this._bg = null;
        this._nodeContainer = null;
        this._questionsContainer = null;
        this._questionOptContainer = null;
        this._activityTimerText = null;
        this._scoreTxt = null;
        this._timesText = null;
        this._activitynessText = null;
        this._questOrderText = null;
        this._questScoreText = null;
        this._questDescText = null;
        this._questprogress = null;
        this._questOrderText2 = null;
        this._questCdBifFont = null;
        this._answerbtn = null;
        ;
        this._cdNums = 0;
        this._questionSecs = 0;
        this._answerOptList = [];
        this._curOpt = 0;
        this._isanswering = false;
        this._endParams = undefined;
        this._isFromAnserBtn = false; //是否按钮出发答题
        this._rightAnswerOpt = 0;
        this._isOptClicked = false;
        this._resiTimeText = null;
        this._sTime = 0;
        _super.prototype.dispose.call(this);
    };
    return AcAnswerView;
}(AcCommonView));
__reflect(AcAnswerView.prototype, "AcAnswerView");
