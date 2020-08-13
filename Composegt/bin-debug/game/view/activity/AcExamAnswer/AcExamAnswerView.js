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
var AcExamAnswerView = (function (_super) {
    __extends(AcExamAnswerView, _super);
    function AcExamAnswerView() {
        var _this = _super.call(this) || this;
        _this.aid = undefined;
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
        return _this;
    }
    Object.defineProperty(AcExamAnswerView.prototype, "config", {
        //init view 
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcExamAnswerView.prototype, "code", {
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
    Object.defineProperty(AcExamAnswerView.prototype, "acVo", {
        get: function () {
            this.aid = App.StringUtil.firstCharToLower(this.getClassName().replace("Ac", "").replace("View", ""));
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcExamAnswerView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.EXAMANSWER_POINTCHANGE, this.refreshAfterPointChange, this);
        var bg = BaseBitmap.create("examanswer_bg");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        this.addChild(bg);
        this._bg = bg;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            //排行榜 
            var rankBg = ComponentManager.getButton("forpeople_bottom", null, this.rankHandle, this, null, 0);
            rankBg.setPosition(5, bg.y + bg.height - 270);
            this.addChild(rankBg);
            var rankIcon = BaseBitmap.create("arena_rank");
            rankIcon.setPosition(rankBg.width / 2 - rankIcon.width / 2, rankBg.height / 2 - rankIcon.height / 2 - 5);
            rankBg.addChild(rankIcon);
            var rankText = BaseBitmap.create("arena_rank_text");
            rankText.setPosition(rankBg.width / 2 - rankText.width / 2, rankIcon.y + rankIcon.height - 30);
            rankBg.addChild(rankText);
        }
        var txt = BaseBitmap.create("examanswer_title_img");
        txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
        txt.y = bg.y + 35;
        this.addChild(txt);
        var closebtn = ComponentManager.getButton(ButtonConst.BTN_WIN_CLOSEBTN, "", this.closeBtnHandler, this);
        closebtn.x = GameConfig.stageWidth - closebtn.width - 25;
        closebtn.y = txt.y + 20;
        closebtn.name = "collectBtn";
        this.addChild(closebtn);
        this._closebtn = closebtn;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._activityTimerText.x = 160;
        this._activityTimerText.y = bg.y + 170;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this._nodeContainer.addChild(this._activityTimerText);
        var cfg = this.config;
        var deltaY = 18;
        //规则
        var _ruleText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        _ruleText.multiline = true;
        _ruleText.lineSpacing = 5;
        _ruleText.width = 320;
        _ruleText.text = LanguageManager.getlocal("answer_txt2", ["" + cfg.cost, "" + cfg.answerTime]);
        _ruleText.x = this._activityTimerText.x;
        _ruleText.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this._nodeContainer.addChild(_ruleText);
        //当前活跃度
        this._activitynessText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._activitynessText.text = LanguageManager.getlocal("answer_txt3", ["" + this.acVo.point]);
        this._activitynessText.x = GameConfig.stageWidth / 2;
        this._activitynessText.y = bg.y + 410;
        this._nodeContainer.addChild(this._activitynessText);
        //今日答题次数
        this._timesText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._timesText.text = LanguageManager.getlocal("answer_txt4", ["" + this.acVo.anum]);
        this._timesText.x = GameConfig.stageWidth / 2;
        this._timesText.y = this._activitynessText.y + 30;
        this._nodeContainer.addChild(this._timesText);
        //开始答题按钮
        var answerbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "answer_txt5", this.answerBtnHandler, this);
        answerbtn.x = GameConfig.stageWidth / 2 - answerbtn.width / 2;
        answerbtn.y = this._timesText.y + 30;
        this.addChild(answerbtn);
        this._answerbtn = answerbtn;
        if (this.acVo.point < (this.acVo.anum + 1) * this.config.cost) {
            this._answerbtn.setText("answer_txt51");
        }
        //科举积分
        this._scoreTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._scoreTxt.text = LanguageManager.getlocal("answer_txt6", ["" + this.acVo.tscore]);
        this._scoreTxt.x = GameConfig.stageWidth / 2;
        this._scoreTxt.y = answerbtn.y + answerbtn.height + 10;
        this._nodeContainer.addChild(this._scoreTxt);
        //某一个问题的上部信息
        this._questionsContainer = new BaseDisplayObjectContainer();
        this.addChild(this._questionsContainer);
        this._questOrderText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._questOrderText.text = LanguageManager.getlocal("answer_txt7");
        this._questOrderText.x = 160;
        this._questOrderText.y = bg.y + 170;
        this._questionsContainer.addChild(this._questOrderText);
        this._questScoreText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._questScoreText.text = LanguageManager.getlocal("answer_txt8");
        this._questScoreText.x = 470 - this._questScoreText.width;
        this._questScoreText.y = this._questOrderText.y;
        this._questionsContainer.addChild(this._questScoreText);
        this._questDescText = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        this._questDescText.multiline = true;
        this._questDescText.lineSpacing = 3;
        this._questDescText.width = 330;
        this._questDescText.text = ""; //LanguageManager.getlocal("answer_txt7");
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
        this._questOrderText2.text = LanguageManager.getlocal("answer_txt7");
        this._questOrderText2.x = GameConfig.stageWidth / 2 - this._questOrderText2.width / 2;
        this._questOrderText2.y = this._questprogress.y + 80;
        this._questionsContainer.addChild(this._questOrderText2);
        this._questCdBifFont = ComponentManager.getBitmapText("3", "activity_fnt", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // this._questCdBifFont.text  = LanguageManager.getlocal("answer_txt7");
        this._questCdBifFont.x = GameConfig.stageWidth / 2 - this._questCdBifFont.width / 2;
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
    AcExamAnswerView.prototype.showEnterInfo = function () {
        this._endContainer.visible = this._questionsContainer.visible = false;
        this._nodeContainer.visible = true;
        this._answerbtn.visible = true;
        this.refreshAfterPointChange();
    };
    AcExamAnswerView.prototype.refreshAfterPointChange = function () {
        var cost_point = (this.acVo.anum + 1) * this.config.cost;
        if (this.acVo.anum == this.config.answerTime) {
            cost_point = (this.acVo.anum) * this.config.cost;
        }
        if (this.acVo.point < cost_point) {
            this._activitynessText.text = LanguageManager.getlocal("answer_txt31", [this.acVo.point + "/" + cost_point]);
        }
        else {
            this._activitynessText.text = LanguageManager.getlocal("answer_txt3", [this.acVo.point + "/" + cost_point]);
        }
        this._timesText.text = LanguageManager.getlocal("answer_txt4", [this.acVo.anum + "/" + this.config.answerTime]);
        this._scoreTxt.text = LanguageManager.getlocal("answer_txt6", ["" + this.acVo.tscore]);
        this._activitynessText.anchorOffsetX = this._activitynessText.width / 2;
        this._timesText.anchorOffsetX = this._timesText.width / 2;
        this._scoreTxt.anchorOffsetX = this._scoreTxt.width / 2;
        if (this.acVo.point < cost_point && this.acVo.anum < this.config.answerTime) {
            this._answerbtn.setText("answer_txt51");
        }
        else {
            this._answerbtn.setText("answer_txt5");
        }
        if (this.acVo.anum == this.config.answerTime) {
            this._answerbtn.setText("answer_txt52");
            App.DisplayUtil.changeToGray(this._answerbtn);
        }
    };
    AcExamAnswerView.prototype.refreshQuestionInfo = function () {
        this._isOptClicked = false;
        this._cdNums = 3;
        this._questprogress.setPercentage(1.0);
        this._questprogress.setText(LanguageManager.getlocal("answer_txt9", ["" + this.config.timeLimit]));
        var qinfo = this.acVo.qinfo;
        this._questionsContainer.visible = true;
        this._nodeContainer.visible = false;
        this._answerbtn.visible = false;
        this._questOrderText.text = LanguageManager.getlocal("answer_txt7", [(qinfo.endindex + 1) + "/" + this.config.answerNum]);
        this._questScoreText.text = LanguageManager.getlocal("answer_txt8", ["" + qinfo.score]);
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
        this._questOrderText2.text = LanguageManager.getlocal("answer_txt7", ["" + (qinfo.endindex + 1)]);
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
    AcExamAnswerView.prototype.showEndResult = function (param) {
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
        restxt1.text = LanguageManager.getlocal("answer_txt10");
        restxt1.x = GameConfig.stageWidth / 2 - restxt1.width / 2;
        restxt1.y = this._bg.y + 230;
        this._endContainer.addChild(restxt1);
        var restxt2 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt2.text = LanguageManager.getlocal("answer_txt15", ["" + param.oknum]);
        restxt2.x = GameConfig.stageWidth / 2 - restxt2.width / 2;
        restxt2.y = restxt1.y + 30;
        this._endContainer.addChild(restxt2);
        var restxt3 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt3.text = LanguageManager.getlocal("answer_txt11", ["" + param.usetime]);
        restxt3.x = GameConfig.stageWidth / 2 - restxt3.width / 2;
        restxt3.y = restxt2.y + 60;
        this._endContainer.addChild(restxt3);
        var restxt4 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt4.text = LanguageManager.getlocal("answer_txt12", [this.getScroRankTxt(param.score)]);
        restxt4.x = GameConfig.stageWidth / 2 - restxt4.width / 2;
        restxt4.y = restxt3.y + 30;
        this._endContainer.addChild(restxt4);
        var restxt5 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt5.text = LanguageManager.getlocal("answer_txt13", ["" + param.score]);
        restxt5.x = GameConfig.stageWidth / 2 - restxt5.width / 2;
        restxt5.y = restxt4.y + 70;
        this._endContainer.addChild(restxt5);
        var restxt6 = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
        restxt6.text = LanguageManager.getlocal("answer_txt14", ["" + param.tnum]);
        restxt6.x = GameConfig.stageWidth / 2 - restxt6.width / 2;
        restxt6.y = restxt5.y + 30;
        this._endContainer.addChild(restxt6);
        //开始答题按钮
        var confirmbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.showEnterInfo, this);
        confirmbtn.x = GameConfig.stageWidth / 2 - confirmbtn.width / 2;
        confirmbtn.y = restxt5.y + 90;
        this._endContainer.addChild(confirmbtn);
    };
    AcExamAnswerView.prototype.getScroRankTxt = function (score) {
        var rank = this.config.ranklist;
        for (var index = 0; index < rank.length; index++) {
            var element = rank[index].scoreRange;
            if (element[0] <= score && element[1] > score) {
                return LanguageManager.getlocal("answer_rankTxt" + (index + 1));
                // break;
            }
        }
        return LanguageManager.getlocal("answer_rankTxt1");
    };
    AcExamAnswerView.prototype.sendAnswerOpt = function (obj, optid) {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isOptClicked) {
            return;
        }
        this._isOptClicked = true;
        this._curOpt = optid;
        var usttime = this.config.timeLimit - this._questionSecs;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_ANSWEROPT, this.sendAnswerOptCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_ANSWEROPT, { activeId: this.acVo.aidAndCode, optid: "" + optid, usttime: usttime });
        if (this._curOpt > 0) {
            this.refreshOptState();
        }
    };
    AcExamAnswerView.prototype.refreshOptState = function () {
        this._answerOptList[this._curOpt - 1].optBitmap.texture = ResourceManager.getRes("examanswer_selected_bg1");
        for (var index = 0; index < this._answerOptList.length; index++) {
            var element = this._answerOptList[index];
            var optflag = element.optflag;
            optflag.visible = true;
        }
    };
    AcExamAnswerView.prototype.sendAnswerOptCallBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_ANSWEROPT, this.sendAnswerOptCallBack, this);
        var data = event.data;
        if (data.data.ret == 0) {
            var qinfo = this.acVo.qinfo;
            if (this._rightAnswerOpt == this._curOpt) {
                App.CommonUtil.showTip(LanguageManager.getlocal("answer_answerTip3", ["" + data.data.data.score]));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("answer_answerTip4", ["" + data.data.data.score]));
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
    AcExamAnswerView.prototype.answerBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        //需要判断活跃积分是否足够
        if (this.acVo.point < (this.acVo.anum + 1) * this.config.cost && this.acVo.anum < this.config.answerTime) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("answer_answerTip1"));
            ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
            return;
        }
        if (this.acVo.anum >= this.config.answerTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("answer_answerTip2"));
            return;
        }
        var rewardStr = LanguageManager.getlocal("answer_confirmTip");
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: rewardStr,
            callback: this.doStartAnswer,
            handler: this,
            needCancel: true
        });
    };
    AcExamAnswerView.prototype.doStartAnswer = function () {
        this._isFromAnserBtn = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_ANSWERWIN, { activeId: this.acVo.aidAndCode, issure: 1 });
    };
    AcExamAnswerView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY2S_ANSWERWIN, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcExamAnswerView.prototype.receiveData = function (data) {
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
    AcExamAnswerView.prototype.tick = function () {
        if (!this.acVo.isStart) {
            this._closebtn.visible = true;
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
            this._questprogress.setText(LanguageManager.getlocal("answer_txt9", ["" + limit]));
            this._questionSecs = limit;
            this._questionOptContainer.visible = false;
        }
        else {
            this._questOrderText2.visible = this._questCdBifFont.visible = false;
            this._questionOptContainer.visible = true;
            //真正开始答题,展示选项
            if (this._questionSecs >= 0) {
                this._questprogress.setPercentage(this._questionSecs / limit);
                this._questprogress.setText(LanguageManager.getlocal("answer_txt9", ["" + this._questionSecs]));
                if (this._questionSecs == 0) {
                    this.sendAnswerOpt(this, 0);
                }
            }
            else {
                //下一题 
            }
            this._questionSecs--;
        }
        this._cdNums--;
        return false;
    };
    AcExamAnswerView.prototype.rankHandle = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACEXAMANSWERRANKPOPUPVIEW, { activeId: this.acVo.aidAndCode, score: this.acVo.tscore });
    };
    //跳转充值界面
    AcExamAnswerView.prototype.closeBtnHandler = function () {
        this.hide();
    };
    //不显示标题名字
    AcExamAnswerView.prototype.getTitleStr = function () {
        return null;
    };
    AcExamAnswerView.prototype.getTitleBgName = function () {
        return null;
    };
    // 不使用组件的关闭按钮
    AcExamAnswerView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcExamAnswerView.prototype.getBgName = function () {
        return null;
    };
    //加载资源
    AcExamAnswerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "examanswer_bg", "examanswer_flag1",
            "examanswer_flag2", "examanswer_selected_bg1", "examanswer_selected_bg2", "examanswer_title_img",
            "progress_type3_yellow", "progress_type3_bg", "activity_fnt", "arena_rank_text", "arena_rank", "forpeople_bottom",
        ]);
    };
    AcExamAnswerView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.EXAMANSWER_POINTCHANGE, this.refreshAfterPointChange, this);
        this._bg = null;
        this.aid = null;
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
        _super.prototype.dispose.call(this);
    };
    return AcExamAnswerView;
}(BaseView));
__reflect(AcExamAnswerView.prototype, "AcExamAnswerView");
