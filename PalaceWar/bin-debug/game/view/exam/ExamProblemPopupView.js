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
  * 科举答题 题目面板
  * author 杨成国
  * date 2019.7.24
  * @class ExamProblemPopupView
  */
var ExamProblemPopupView = (function (_super) {
    __extends(ExamProblemPopupView, _super);
    function ExamProblemPopupView() {
        var _this = _super.call(this) || this;
        /**考试类型 */
        _this._problemType = 1; //0 会试 1 殿试
        /**考试问题数目 */
        _this._totalProblemNum = 10;
        /**题目列表 */
        _this._problems = [];
        /**当前题目序号 */
        _this._problemNum = 0;
        /**总时间 */
        _this.TOTAL_TIME = 30000;
        /** 使用的时间*/
        _this._useTime = 0;
        _this._answerItemsContainer = [];
        /**答案位置 */
        _this._answerPos = [];
        /**选择的答案 下标 不是id*/
        _this._selectedIndex = 0;
        /**正确答案 */
        _this._rightAnswerId = 0;
        /**是否已经选择了答案 */
        _this._isSelectedAnswer = false;
        /**每题开始时间戳 */
        _this._problemStartTime = 0;
        /**三秒倒计时时间 */
        _this._problemShowStartTime = 0;
        _this._startTime = 0;
        _this._isSendRequest = false;
        return _this;
    }
    // protected isTouchMaskClose():boolean{
    //     return true;
    // }
    ExamProblemPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_EXAM_START, requestData: { phaseId: this.param.data.type + 1 } };
    };
    ExamProblemPopupView.prototype.receiveData = function (data) {
    };
    ExamProblemPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EXAM_ANSWER, this.examAnswerHandler, this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EXAM_START, this.examStart, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SCOKET_RECONNECT_LOGIN, this.reConnect, this);
        if (this.param.data) {
            this._problemType = this.param.data.type;
            this._totalProblemNum = this.param.data.questionNum;
        }
        // this.request(NetRequestConst.REQUEST_EXAM_START, { phaseId:this._problemType+1});
        this._problems = Api.examVoApi.getExamProblemByExamType(String(this._problemType));
        var bg = BaseBitmap.create("examview_problem_bg");
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var problemTitleStr = "examview_meet_title1";
        if (this._problemType == 1) {
            problemTitleStr = "examview_imperial_title1";
        }
        var problemTitle = BaseLoadBitmap.create(problemTitleStr);
        problemTitle.width = 155; // 606  448
        problemTitle.height = 522;
        problemTitle.setPosition(bg.x - 5, bg.y);
        this.addChildToContainer(problemTitle);
        //正确题数
        var rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        var rightNumBg = BaseBitmap.create("countrywarrewardview_itembg");
        rightNumBg.width = 130;
        rightNumBg.height = 40;
        rightNumBg.setPosition(problemTitle.x + problemTitle.width / 2 - rightNumBg.width / 2, problemTitle.y + problemTitle.height - 130);
        this.addChildToContainer(rightNumBg);
        var rightNum = ComponentManager.getTextField(LanguageManager.getlocal("examinationRightNumStr", [String(rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rightNum.x = rightNumBg.x + 35;
        rightNum.y = rightNumBg.y + rightNumBg.height / 2 - rightNum.height / 2;
        this.addChildToContainer(rightNum);
        this._rightNum = rightNum;
        //积分
        var scoreBg = BaseBitmap.create("countrywarrewardview_itembg");
        scoreBg.width = 130;
        scoreBg.height = 40;
        scoreBg.setPosition(rightNumBg.x, rightNumBg.y + rightNumBg.height + 15);
        this.addChildToContainer(scoreBg);
        var scoreNum = ComponentManager.getTextField(LanguageManager.getlocal("examinationScoreNum", [String(rightData.score)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreNum.x = rightNum.x;
        scoreNum.y = scoreBg.y + scoreBg.height / 2 - scoreNum.height / 2;
        this.addChildToContainer(scoreNum);
        this._scoreNum = scoreNum;
        this._problemNum = 1;
        //题目进度
        var problemNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationProblemNum", [String(this._problemNum), String(this._totalProblemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        problemNumText.setPosition(problemTitle.x + problemTitle.width + 20, problemTitle.y + 25);
        this.addChildToContainer(problemNumText);
        this._problemNumText = problemNumText;
        //题目
        var problemContainer = new BaseDisplayObjectContainer();
        problemContainer.width = 380;
        problemContainer.height = 100;
        problemContainer.setPosition(problemNumText.x + 0, problemNumText.y + 25);
        this.addChildToContainer(problemContainer);
        this._problemContainer = problemContainer;
        var problemBg = BaseBitmap.create("public_9_bg21");
        problemBg.width = problemContainer.width;
        problemBg.height = problemContainer.height;
        problemContainer.addChild(problemBg);
        var typeNum = Number(this._problemType) + 1;
        var problemStr = LanguageManager.getlocal("examinationProblem-" + typeNum + "-" + this._problems[this._problemNum - 1][0]);
        var problemText = ComponentManager.getTextField(problemStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        problemText.width = 360;
        problemText.height = 150;
        problemText.setPosition(10, 15);
        problemContainer.addChild(problemText);
        this._problemText = problemText;
        //答案
        var answerContainer = new BaseDisplayObjectContainer();
        answerContainer.setPosition(problemContainer.x + 53, problemContainer.y + problemContainer.height + 15);
        this.addChildToContainer(answerContainer);
        this._answerContainer = answerContainer;
        var answerPos = Api.examVoApi.getAnswerRandPos();
        for (var i = 0; i < answerPos.length; i++) {
            this._answerItemsContainer[i] = this.createOneAnswer(i);
            this._answerItemsContainer[i].y += (this._answerItemsContainer[i].height + 16) * i + 6;
            answerContainer.addChild(this._answerItemsContainer[i]);
        }
        this.setAnswers(0);
        //进度条
        var progress = ComponentManager.getProgressBar("progress11", "progress11_bg", 300);
        progress.x = problemContainer.x + problemContainer.width / 2 - progress.width / 2;
        progress.y = bg.y + bg.height - 120;
        this.addChildToContainer(progress);
        progress.setPercentage(1);
        this._progress = progress;
        //倒计时
        var progressTimeInfo = ComponentManager.getTextField(LanguageManager.getlocal("examinationTimeDownInfo", [String(this.TOTAL_TIME / 1000)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_BLACK);
        progressTimeInfo.setPosition(progress.x + progress.width / 2 - progressTimeInfo.width / 2, progress.y + progress.height + 10);
        this.addChildToContainer(progressTimeInfo);
        this._progressTimeInfo = progressTimeInfo;
        // //弹窗提示
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        // 	title:"examinationStartTitle",
        // 	msg:LanguageManager.getlocal("examinationStartInfo"),
        // 	callback:this.startExam,
        // 	handler:this,
        //     needCancel:true,
        //     cancelcallback:() =>{
        //         this.hide();
        //         }
        //     }); 
        this._problemShowStartTime = GameData.serverTime;
        // this.showThreeSecondAni();
        this.onShowThreeSecondCompleted();
    };
    ExamProblemPopupView.prototype.examStart = function (event) {
    };
    ExamProblemPopupView.prototype.setAnswers = function (type) {
        if (type == 0) {
            this._answerPos = Api.examVoApi.getAnswerRandPos();
            for (var i = 0; i < this._answerPos.length; i++) {
                this.refreshAnswers(i, 0);
            }
            this._answerContainer.visible = false;
        }
        else if (type == 1) {
            this.refreshAnswers(this._selectedIndex, 1);
        }
        else if (type == 2) {
            this.refreshAnswers(this._selectedIndex, 2);
            // let rightAnswer = Api.examVoApi.getRightAnswerIdByProblemNum(this._problemNum);
            var rightAnswer = 1; //默认第一个答案正确
            var index = 0;
            for (var i = 0; i < this._answerPos.length; i++) {
                if (this._answerPos[i] == rightAnswer) {
                    index = i;
                    break;
                }
            }
            this.refreshAnswers(index, 1);
        }
        else if (type == 3) {
            this.refreshAnswers(this._selectedIndex, 3);
        }
    };
    /**刷新答案 type 0 默认 1 正确 2 错误  3 选中*/
    ExamProblemPopupView.prototype.refreshAnswers = function (index, type) {
        if (index == -1) {
            return;
        }
        var answerId = this._answerPos[index];
        var container = this._answerItemsContainer[index];
        var bg = container.getChildByName("answerBg");
        var answerText = container.getChildByName("answerText");
        var rightFlag = container.getChildByName("rightFlag");
        if (type == 0) {
            bg.setRes("examview_gray_bg");
            var problemTypeNum = Number(this._problemType) + 1;
            var answerStr = LanguageManager.getlocal("examinationAnsewer-" + problemTypeNum + "-" + this._problems[this._problemNum - 1][0] + "-" + answerId);
            answerText.text = answerStr;
            answerText.setPosition(bg.x + bg.width / 2 - answerText.width / 2, bg.y + bg.height / 2 - answerText.height / 2);
            rightFlag.visible = false;
        }
        else if (type == 1) {
            bg.setRes("examview_green_bg");
            rightFlag.setRes("examview_right");
            rightFlag.visible = true;
        }
        else if (type == 2) {
            bg.setRes("examview_red_bg");
            rightFlag.setRes("examview_error");
            rightFlag.visible = true;
        }
        else if (type == 3) {
            bg.setRes("examview_green_bg");
        }
    };
    /**创建一个答案 */
    ExamProblemPopupView.prototype.createOneAnswer = function (index) {
        var answerContainer = new BaseDisplayObjectContainer();
        answerContainer.width = 260;
        answerContainer.height = 52;
        answerContainer.name = String(index);
        var bg = BaseBitmap.create("examview_gray_bg");
        bg.width = 260;
        bg.height = 52;
        bg.name = "answerBg";
        answerContainer.addChild(bg);
        var answerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        answerText.setPosition(20, 15);
        answerContainer.addChild(answerText);
        answerText.name = "answerText";
        var rightFlag = BaseBitmap.create("examview_right");
        rightFlag.setPosition(answerContainer.width - rightFlag.width, answerContainer.height / 2 - rightFlag.height / 2);
        rightFlag.name = "rightFlag";
        answerContainer.addChild(rightFlag);
        answerContainer.addTouchTap(this.answerClick, this, [index]);
        return answerContainer;
    };
    /**选择答案 */
    ExamProblemPopupView.prototype.answerClick = function (target, index) {
        if (this._isSelectedAnswer == true) {
            return;
        }
        this._isSelectedAnswer = true;
        // TimerManager.remove(this.examTick, this);
        egret.stopTick(this.examTick, this);
        this._selectedIndex = index;
        this.setAnswers(3);
        if (this._useTime >= this.TOTAL_TIME) {
            this._useTime = this.TOTAL_TIME;
        }
        var useTime = egret.getTimer() - this._startTime;
        App.LogUtil.log("user aa0: " + useTime);
        if (useTime >= this.TOTAL_TIME) {
            useTime = this.TOTAL_TIME;
        }
        var diff = this._useTime - useTime;
        if (diff > 1000) {
            useTime = useTime + Math.floor(diff / 1000) * 1000;
        }
        if (useTime > this.TOTAL_TIME) {
            useTime = this.TOTAL_TIME;
        }
        App.LogUtil.log("user aa1: " + useTime);
        this._isSendRequest = true;
        NetManager.request(NetRequestConst.REQUEST_EXAM_ANSWER, { phaseId: this._problemType + 1, qNum: this._problemNum, choose: this._answerPos[index], ts: useTime });
    };
    /**答题回调 */
    ExamProblemPopupView.prototype.examAnswerHandler = function (event) {
        if (!event.data.ret) {
            if (event.data.data && event.data.data.ret != -10001) {
                this._useTime = 0;
                this._isSendRequest = false;
                this.showNextAnswer();
            }
            return;
        }
        var data = event.data.data.data;
        this._useTime = 0;
        this._isSendRequest = false;
        var day = Api.examVoApi.getWeekendByType(this._problemType);
        var isInShow = Api.examVoApi.isInShow(day);
        if (!isInShow) {
            this.showTimeEndView();
            return;
        }
        var phaseScoreData = data.exam.phase[this._problemType][this._problemNum - 1];
        var score = 0;
        if (phaseScoreData[3] > 0) {
            score = phaseScoreData[1];
        }
        // let score = Api.examVoApi.getRightScoreByProblem(this._problemType, this._problemNum - 1);
        App.LogUtil.log("examAnswerHandler score is:" + score);
        if (this._selectedIndex == -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationTimeout"));
            this.setAnswers(2);
        }
        else if (score > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationRightAnswer", [String(score)]));
            var rewards = Api.examVoApi.cfg.getReward;
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
            this.setAnswers(1);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationErrorAnswer"));
            this.setAnswers(2);
        }
        this.showNextAnswer();
        var rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        this._rightNum.text = LanguageManager.getlocal("examinationRightNumStr", [String(rightData.rightNum)]);
        this._scoreNum.text = LanguageManager.getlocal("examinationScoreNum", [String(rightData.score)]);
    };
    /**获取下一题key */
    ExamProblemPopupView.prototype.getNextProblemStr = function () {
        var typeNum = Number(this._problemType) + 1;
        return LanguageManager.getlocal("examinationProblem-" + typeNum + "-" + this._problems[this._problemNum - 1][0]);
    };
    /**确认开始 */
    ExamProblemPopupView.prototype.startExam = function () {
        this.showThreeSecondAni();
    };
    /**播放 3，2，1 */
    ExamProblemPopupView.prototype.showThreeSecondAni = function () {
        var numberBg = BaseBitmap.create("acsingleday_cd_num3");
        numberBg.setPosition(this._problemContainer.x + this._problemContainer.width / 2 - numberBg.width / 2, this._answerContainer.y + this._answerContainer.height / 2 - numberBg.height / 2);
        this.addChildToContainer(numberBg);
        var diffTime = GameData.serverTime - this._problemShowStartTime;
        if (diffTime >= 3 && this._problemShowStartTime != 0) {
            this._problemStartTime = GameData.serverTime - diffTime;
            this.onShowThreeSecondCompleted();
            numberBg.visible = false;
            return;
        }
        else {
            this._problemStartTime = GameData.serverTime;
        }
        App.LogUtil.log("*******start show3:::" + this._problemStartTime);
        var tw = egret.Tween.get(numberBg).wait(1000)
            .call(function () {
            numberBg.setRes("acsingleday_cd_num2");
            var diffTime = GameData.serverTime - this._problemShowStartTime;
            if (diffTime >= 4 && this._problemShowStartTime != 0) {
                App.LogUtil.log("*******start show4: ");
                this._problemStartTime = GameData.serverTime - (diffTime - 4) + 3;
                this.onShowThreeSecondCompleted();
                numberBg.visible = false;
                egret.Tween.removeTweens(tw);
            }
        }, this)
            .wait(1000)
            .call(function () { numberBg.setRes("acsingleday_cd_num1"); }, this)
            .wait(1000)
            .call(function () {
            this.onShowThreeSecondCompleted();
            numberBg.visible = false;
            egret.Tween.removeTweens(tw);
        }, this);
    };
    /**三二一 播放完成 */
    ExamProblemPopupView.prototype.onShowThreeSecondCompleted = function () {
        this.setAnswers(0);
        this._isSelectedAnswer = false;
        this._startTime = egret.getTimer();
        this._problemStartTime = GameData.serverTime;
        egret.startTick(this.examTick, this);
        this._answerContainer.visible = true;
    };
    ExamProblemPopupView.prototype.examTick = function (timeStamp) {
        // let currUserTime = GameData.serverTime - this._problemStartTime - 3;
        var currUserTime = GameData.serverTime - this._problemStartTime;
        App.LogUtil.log("examtick: aaa0: " + currUserTime);
        if (currUserTime < 0) {
            this._problemStartTime = this._problemStartTime + currUserTime;
            currUserTime = 1;
        }
        App.LogUtil.log("examtick: aaa: " + currUserTime);
        //切后台
        if (currUserTime >= (this.TOTAL_TIME) / 1000) {
            this._progress.setPercentage(0);
            this._progressTimeInfo.text = LanguageManager.getlocal("examinationTimeDownInfo", ["0"]);
            this._progressTimeInfo.x = this._progress.x + this._progress.width / 2 - this._progressTimeInfo.width / 2;
            this._isSelectedAnswer = true;
            this._selectedIndex = -1;
            this._isSendRequest = true;
            NetManager.request(NetRequestConst.REQUEST_EXAM_ANSWER, { phaseId: this._problemType + 1, qNum: this._problemNum, choose: 5, ts: this.TOTAL_TIME });
            egret.stopTick(this.examTick, this);
            return false;
        }
        App.LogUtil.log("examtick: currUserTime: " + currUserTime);
        var endTime = this.TOTAL_TIME - currUserTime * 1000;
        this._useTime = currUserTime * 1000;
        this._progress.setPercentage(endTime / this.TOTAL_TIME);
        this._progressTimeInfo.text = LanguageManager.getlocal("examinationTimeDownInfo", [String(endTime / 1000)]);
        this._progressTimeInfo.x = this._progress.x + this._progress.width / 2 - this._progressTimeInfo.width / 2;
        return false;
    };
    /** 下一题 */
    ExamProblemPopupView.prototype.showNextAnswer = function () {
        this._useTime = 0;
        if (this._problemNum + 1 <= this._totalProblemNum) {
            this._problemNum += 1;
            var tw_1 = egret.Tween.get(this._problemText).wait(2000).call(function () {
                this.setAnswers(0);
            }, this)
                .to({ alpha: 0 }, 1000)
                .call(function () {
                this._problemNumText.text = LanguageManager.getlocal("examinationProblemNum", [String(this._problemNum), String(this._totalProblemNum)]);
                this._problemText.text = this.getNextProblemStr();
                this._progress.setPercentage(1);
                this._progressTimeInfo.text = LanguageManager.getlocal("examinationTimeDownInfo", [String(this.TOTAL_TIME / 1000)]);
                this._progressTimeInfo.x = this._progress.x + this._progress.width / 2 - this._progressTimeInfo.width / 2;
                this._problemShowStartTime = GameData.serverTime;
            }, this)
                .to({ alpha: 1 }, 1000)
                .call(function () {
                // this.showThreeSecondAni();
                this.onShowThreeSecondCompleted();
                egret.Tween.removeTweens(tw_1);
            }, this);
        }
        else {
            //答题结束
            this.showAnswerFinishView();
        }
    };
    /**答题结束统计 */
    ExamProblemPopupView.prototype.showAnswerFinishView = function () {
        var totalProblemNumStr = "examinationMeetTotalProblemNum";
        if (this._problemType == 1) {
            totalProblemNumStr = "examinationImperialTotalProblemNum";
        }
        var totalProblemNumText = ComponentManager.getTextField(LanguageManager.getlocal(totalProblemNumStr, [String(this._totalProblemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        totalProblemNumText.setPosition(this._problemContainer.x + this._problemContainer.width / 2 - totalProblemNumText.width / 2, this._problemContainer.y + 50);
        this.addChildToContainer(totalProblemNumText);
        var rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        var rightNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationRightNum", [String(rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        rightNumText.setPosition(this._problemContainer.x + this._problemContainer.width / 2 - rightNumText.width - 30, totalProblemNumText.y + totalProblemNumText.height + 30);
        this.addChildToContainer(rightNumText);
        var errorNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationErrorNum", [String(this._totalProblemNum - rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        errorNumText.setPosition(this._problemContainer.x + this._problemContainer.width / 2 + 30, rightNumText.y);
        this.addChildToContainer(errorNumText);
        //总用时
        var allTime = Api.examVoApi.getReplytime() / 1000;
        var timeText = ComponentManager.getTextField(LanguageManager.getlocal("examinationTotalSeconds", [String(allTime.toFixed(3))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        timeText.setPosition(this._problemContainer.x + this._problemContainer.width / 2 - timeText.width / 2, errorNumText.y + errorNumText.height + 30);
        this.addChildToContainer(timeText);
        //积分获得
        var scoreNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationTotalScore", [String(rightData.score)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        scoreNumText.setPosition(this._problemContainer.x + this._problemContainer.width / 2 - scoreNumText.width / 2, timeText.y + timeText.height + 30);
        this.addChildToContainer(scoreNumText);
        //确认按钮
        var enterBtn = ComponentManager.getButton("btn_big_yellow", "examinationEnter", this.enterFinishBtnClick, this);
        enterBtn.setPosition(this._problemContainer.x + this._problemContainer.width / 2 - enterBtn.width / 2, scoreNumText.y + scoreNumText.height + 30);
        this.addChildToContainer(enterBtn);
        this._problemContainer.visible = false;
        this._answerContainer.visible = false;
        this._progress.visible = false;
        this._progressTimeInfo.visible = false;
        this._problemNumText.visible = false;
    };
    /**答题结束确认 关闭 */
    ExamProblemPopupView.prototype.enterFinishBtnClick = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EXAM_FRESH, { examType: this._problemType });
        this.hide();
    };
    /**答题过程中活动结束 */
    ExamProblemPopupView.prototype.showTimeEndView = function () {
        var _this = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "examinationStartTitle",
            msg: LanguageManager.getlocal("examinationEndInfo"),
            callback: function () {
                _this.showAnswerFinishView();
            },
            handler: this,
            needCancel: false,
        });
    };
    ExamProblemPopupView.prototype.reConnect = function () {
        if (this._isSendRequest) {
            NetManager.request(NetRequestConst.REQUEST_EXAM_ANSWER, { phaseId: this._problemType + 1, qNum: this._problemNum, choose: 5, ts: this.TOTAL_TIME });
        }
    };
    ExamProblemPopupView.prototype.getShowHeight = function () {
        return 448;
    };
    ExamProblemPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "examview_problem_bg",
            "examview_gray_bg",
            "examview_green_bg",
            "examview_red_bg",
            "examview_right",
            "examview_error",
            "acsingleday_cd_num1",
            "acsingleday_cd_num2",
            "acsingleday_cd_num3",
            "progress11_bg",
            "progress11"
        ]);
    };
    ExamProblemPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    ExamProblemPopupView.prototype.getBgName = function () {
        return null;
    };
    ExamProblemPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    ExamProblemPopupView.prototype.getTitleStr = function () {
        return null;
    };
    ExamProblemPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SCOKET_RECONNECT_LOGIN, this.reConnect, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EXAM_ANSWER, this.examAnswerHandler, this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EXAM_START, this.examStart, this);
        this._problemType = 1;
        this._totalProblemNum = 10;
        this._problems = [];
        this._problemNum = 1;
        this._rightNum = null;
        this._scoreNum = null;
        this._problemContainer = null;
        this._problemText = null;
        this._problemNumText = null;
        this._problem = null;
        this._progress = null;
        this._progressTimeInfo = null;
        this._useTime = 0;
        this._answerContainer = null;
        this._answerItemsContainer = [];
        this._answerPos = [];
        this._selectedIndex = 0;
        this._rightAnswerId = 0;
        this._problemShowStartTime = 0;
        this._startTime = 0;
        this._isSendRequest = false;
        // TimerManager.remove(this.examTick, this);
        egret.stopTick(this.examTick, this);
        _super.prototype.dispose.call(this);
    };
    return ExamProblemPopupView;
}(PopupView));
__reflect(ExamProblemPopupView.prototype, "ExamProblemPopupView");
//# sourceMappingURL=ExamProblemPopupView.js.map