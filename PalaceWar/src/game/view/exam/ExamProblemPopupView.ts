/**
  * 科举答题 题目面板
  * author 杨成国
  * date 2019.7.24
  * @class ExamProblemPopupView
  */
 class ExamProblemPopupView extends PopupView{
    /**考试类型 */
    public _problemType:number = 1;  //0 会试 1 殿试
    /**考试问题数目 */
    public _totalProblemNum:number = 10;
    /**题目列表 */
    public _problems:number[] = [];
    /**当前题目序号 */
    public _problemNum:number = 0;
    /**正确题数 */
    public _rightNum:BaseTextField;
    /**积分 */
    public _scoreNum:BaseTextField;
    /**问题容器 */
    public _problemContainer:BaseDisplayObjectContainer;
    /**问题 */
    public _problemText:BaseTextField;
    /**题目进度 */
    public _problemNumText:BaseTextField;
    /**题目 */
    public _problem:BaseTextField;
    /**时间进度条 */
    public _progress:ProgressBar;
    /**倒计时时间 */
    public _progressTimeInfo:BaseTextField;
    /**总时间 */
    public TOTAL_TIME = 30000;
    /** 使用的时间*/
    public _useTime:number = 0;
    /**答案 */
    public _answerContainer:BaseDisplayObjectContainer;
    public _answerItemsContainer:BaseDisplayObjectContainer[] = [];
    /**答案位置 */
    public _answerPos:number[] = [];
    /**选择的答案 下标 不是id*/
    public _selectedIndex:number = 0;
    /**正确答案 */
    public _rightAnswerId:number = 0;
    /**是否已经选择了答案 */
    public _isSelectedAnswer:boolean = false;
    /**每题开始时间戳 */
    public _problemStartTime:number = 0;
    /**三秒倒计时时间 */
    public _problemShowStartTime:number = 0;
    public _startTime:number = 0;
    public _isSendRequest:boolean = false;

    public constructor(){
       super();
    }

    // protected isTouchMaskClose():boolean{
    //     return true;
    // }

    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_EXAM_START,requestData: { phaseId: this.param.data.type + 1}};
    }
    
    protected receiveData(data:{ret:boolean,data:any}):void
	{
        
	}

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EXAM_ANSWER, this.examAnswerHandler, this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EXAM_START, this.examStart, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SCOKET_RECONNECT_LOGIN, this.reConnect, this);
        if (this.param.data){
            this._problemType = this.param.data.type;
            this._totalProblemNum = this.param.data.questionNum;
        }
        // this.request(NetRequestConst.REQUEST_EXAM_START, { phaseId:this._problemType+1});
        this._problems = Api.examVoApi.getExamProblemByExamType(String(this._problemType));
        let bg = BaseBitmap.create("examview_problem_bg");
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);

        let problemTitleStr = "examview_meet_title1";
        if (this._problemType == 1){
            problemTitleStr = "examview_imperial_title1"
        }
        let problemTitle = BaseLoadBitmap.create(problemTitleStr);
        problemTitle.width = 155; // 606  448
        problemTitle.height = 522;
        problemTitle.setPosition(bg.x - 5, bg.y);
        this.addChildToContainer(problemTitle);
        //正确题数
        let rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        let rightNumBg = BaseBitmap.create("countrywarrewardview_itembg");
        rightNumBg.width = 130;
        rightNumBg.height = 40;
        rightNumBg.setPosition(problemTitle.x + problemTitle.width/2 - rightNumBg.width/2, problemTitle.y + problemTitle.height - 130);
        this.addChildToContainer(rightNumBg);
        let rightNum = ComponentManager.getTextField(LanguageManager.getlocal("examinationRightNumStr", [String(rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rightNum.x = rightNumBg.x + 35;
        rightNum.y = rightNumBg.y + rightNumBg.height/2 - rightNum.height/2;
        this.addChildToContainer(rightNum);
        this._rightNum = rightNum;
        //积分
        let scoreBg = BaseBitmap.create("countrywarrewardview_itembg");
        scoreBg.width = 130;
        scoreBg.height = 40;
        scoreBg.setPosition(rightNumBg.x , rightNumBg.y + rightNumBg.height + 15);
        this.addChildToContainer(scoreBg);
        let scoreNum = ComponentManager.getTextField(LanguageManager.getlocal("examinationScoreNum", [String(rightData.score)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreNum.x = rightNum.x;
        scoreNum.y = scoreBg.y + scoreBg.height/2 - scoreNum.height/2;
        this.addChildToContainer(scoreNum);
        this._scoreNum = scoreNum;

        this._problemNum = 1;
        //题目进度
        let problemNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationProblemNum", [String(this._problemNum), String(this._totalProblemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        problemNumText.setPosition(problemTitle.x + problemTitle.width + 20, problemTitle.y + 25)
        this.addChildToContainer(problemNumText);
        this._problemNumText = problemNumText;

        //题目
        let problemContainer = new BaseDisplayObjectContainer();
        problemContainer.width = 380;
        problemContainer.height = 100;
        problemContainer.setPosition(problemNumText.x + 0, problemNumText.y + 25);
        this.addChildToContainer(problemContainer);
        this._problemContainer = problemContainer;

        let problemBg = BaseBitmap.create("public_9_bg21");
        problemBg.width =  problemContainer.width;
        problemBg.height = problemContainer.height;
        problemContainer.addChild(problemBg);

        let typeNum = Number(this._problemType) + 1;
        let problemStr = LanguageManager.getlocal("examinationProblem-"+typeNum+"-"+this._problems[this._problemNum-1][0]);
        let problemText = ComponentManager.getTextField(problemStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        problemText.width = 360;
        problemText.height = 150;
        problemText.setPosition(10, 15);
        problemContainer.addChild(problemText);
        this._problemText = problemText;

        //答案
        let answerContainer = new BaseDisplayObjectContainer();
        answerContainer.setPosition(problemContainer.x + 53, problemContainer.y + problemContainer.height+15);
        this.addChildToContainer(answerContainer);
        this._answerContainer = answerContainer;

        let answerPos = Api.examVoApi.getAnswerRandPos();
        for (let i=0; i < answerPos.length; i++){
            this._answerItemsContainer[i] = this.createOneAnswer(i);
            this._answerItemsContainer[i].y += (this._answerItemsContainer[i].height + 16) * i + 6;
            answerContainer.addChild(this._answerItemsContainer[i]);
        }
        this.setAnswers(0);

        //进度条
        let progress = ComponentManager.getProgressBar("progress11", "progress11_bg", 300);
        progress.x = problemContainer.x + problemContainer.width/2 - progress.width/2; 
        progress.y = bg.y + bg.height - 120;
        this.addChildToContainer(progress);
        progress.setPercentage(1);
        this._progress = progress; 
        //倒计时
        let progressTimeInfo = ComponentManager.getTextField(LanguageManager.getlocal("examinationTimeDownInfo", [String(this.TOTAL_TIME/1000)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_BLACK);
        progressTimeInfo.setPosition(progress.x + progress.width/2 - progressTimeInfo.width/2 , progress.y +progress.height + 10);
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
    }

    public examStart(event:egret.Event){

    }

    public setAnswers(type:number){
        if (type == 0){
            this._answerPos = Api.examVoApi.getAnswerRandPos();
            for (let i = 0; i < this._answerPos.length; i++){
                this.refreshAnswers(i, 0);
            }
            this._answerContainer.visible = false;
        }
        else if (type == 1){
            this.refreshAnswers(this._selectedIndex, 1);
        }
        else if (type == 2){
            this.refreshAnswers(this._selectedIndex, 2);
            // let rightAnswer = Api.examVoApi.getRightAnswerIdByProblemNum(this._problemNum);
            let rightAnswer = 1; //默认第一个答案正确
            let index = 0;
            for (let i=0; i < this._answerPos.length; i++){
                if (this._answerPos[i] == rightAnswer){
                    index = i;
                    break;
                }
            }
            this.refreshAnswers(index, 1);
        }
        else if (type == 3){
            this.refreshAnswers(this._selectedIndex, 3);
        }   
    }

    /**刷新答案 type 0 默认 1 正确 2 错误  3 选中*/
    public refreshAnswers(index:number, type:number){
        if (index == -1){
            return;
        }
        let answerId = this._answerPos[index];
        let container:BaseDisplayObjectContainer = this._answerItemsContainer[index];
        let bg = <BaseBitmap>container.getChildByName("answerBg");
        let answerText = <BaseTextField>container.getChildByName("answerText");
        let rightFlag = <BaseBitmap>container.getChildByName("rightFlag");
        
        if (type == 0){
            bg.setRes("examview_gray_bg");
            let problemTypeNum = Number(this._problemType) + 1;
            let answerStr = LanguageManager.getlocal("examinationAnsewer-"+problemTypeNum+"-"+this._problems[this._problemNum-1][0]+"-"+answerId);
            answerText.text = answerStr;
            answerText.setPosition(bg.x + bg.width/2 - answerText.width/2, bg.y + bg.height/2 - answerText.height/2);
            
            rightFlag.visible = false;
        }
        else if (type == 1){
            bg.setRes("examview_green_bg");
            rightFlag.setRes("examview_right");
            rightFlag.visible = true;                  
        }
        else if (type == 2){
            bg.setRes("examview_red_bg");
            rightFlag.setRes("examview_error");
            rightFlag.visible = true;
        }
        else if (type == 3){
            bg.setRes("examview_green_bg");
        }
    }

    /**创建一个答案 */
    public createOneAnswer(index:number):BaseDisplayObjectContainer{
        let answerContainer = new BaseDisplayObjectContainer();
        answerContainer.width = 260;
        answerContainer.height = 52;
        answerContainer.name = String(index);
        let bg:BaseBitmap = BaseBitmap.create("examview_gray_bg");
        bg.width = 260;
        bg.height = 52;
        bg.name = "answerBg";
        answerContainer.addChild(bg);

        let answerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        answerText.setPosition(20, 15);
        answerContainer.addChild(answerText);
        answerText.name = "answerText";

        let rightFlag = BaseBitmap.create("examview_right");
        rightFlag.setPosition(answerContainer.width - rightFlag.width, answerContainer.height/2 - rightFlag.height/2);
        rightFlag.name = "rightFlag";
        answerContainer.addChild(rightFlag);
        answerContainer.addTouchTap(this.answerClick, this, [index]);
        return answerContainer;
    }

    /**选择答案 */
    public answerClick(target:Object, index:number){
        if (this._isSelectedAnswer == true){
            return ;
        }
        this._isSelectedAnswer = true;
        // TimerManager.remove(this.examTick, this);
        egret.stopTick(this.examTick, this);
        this._selectedIndex = index;
        this.setAnswers(3);
        if (this._useTime >= this.TOTAL_TIME){
            this._useTime = this.TOTAL_TIME;
        }
        let useTime = egret.getTimer() - this._startTime;
        App.LogUtil.log("user aa0: "+useTime);
        if (useTime >= this.TOTAL_TIME){
            useTime = this.TOTAL_TIME;
        }
        let diff = this._useTime - useTime;
        if ( diff > 1000){
            useTime = useTime + Math.floor(diff / 1000) * 1000;
        }
        if (useTime > this.TOTAL_TIME){
            useTime = this.TOTAL_TIME;
        }
        App.LogUtil.log("user aa1: "+useTime);
        this._isSendRequest = true;
        NetManager.request(NetRequestConst.REQUEST_EXAM_ANSWER, { phaseId:this._problemType+1, qNum:this._problemNum, choose: this._answerPos[index], ts:useTime});
    }

    /**答题回调 */
    public examAnswerHandler(event: egret.Event){
        if (!event.data.ret){
            if (event.data.data && event.data.data.ret != -10001){
                this._useTime = 0;
                this._isSendRequest = false;
                this.showNextAnswer();
            }
            return;
        }
        let data = event.data.data.data;
        this._useTime = 0;
        this._isSendRequest = false;
        let day:number = Api.examVoApi.getWeekendByType(this._problemType);
        let isInShow = Api.examVoApi.isInShow(day);
        if (!isInShow){
            this.showTimeEndView();
            return;
        }
        let phaseScoreData = data.exam.phase[this._problemType][this._problemNum - 1];
        let score = 0;
        if (phaseScoreData[3] > 0){
            score = phaseScoreData[1];
        }
        // let score = Api.examVoApi.getRightScoreByProblem(this._problemType, this._problemNum - 1);
        App.LogUtil.log("examAnswerHandler score is:"+score);
        if (this._selectedIndex == -1){
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationTimeout")); 
            this.setAnswers(2);
        }
        else if (score > 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationRightAnswer", [String(score)]));
            let rewards = Api.examVoApi.cfg.getReward;
            let rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList); 
            this.setAnswers(1);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationErrorAnswer")); 
            this.setAnswers(2);
        }
        this.showNextAnswer();
        let rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        this._rightNum.text = LanguageManager.getlocal("examinationRightNumStr", [String(rightData.rightNum)])
        this._scoreNum.text = LanguageManager.getlocal("examinationScoreNum", [String(rightData.score)]);
    }

    /**获取下一题key */
    public getNextProblemStr():string{
        let typeNum = Number(this._problemType) + 1;
        return LanguageManager.getlocal("examinationProblem-"+typeNum+"-"+this._problems[this._problemNum-1][0]);
    }

    /**确认开始 */
    public startExam():void{
        this.showThreeSecondAni();
    }

    /**播放 3，2，1 */
    public showThreeSecondAni():void{
        let numberBg = BaseBitmap.create("acsingleday_cd_num3");
        numberBg.setPosition(this._problemContainer.x + this._problemContainer.width/2 - numberBg.width/2, this._answerContainer.y + this._answerContainer.height/2 - numberBg.height/2);
        this.addChildToContainer(numberBg);
        let diffTime = GameData.serverTime - this._problemShowStartTime;
        if (diffTime >= 3 && this._problemShowStartTime != 0){
            this._problemStartTime = GameData.serverTime - diffTime;
            this.onShowThreeSecondCompleted();
            numberBg.visible = false;
            return ;
        }
        else{
            this._problemStartTime = GameData.serverTime;
        }
        App.LogUtil.log("*******start show3:::"+this._problemStartTime);
        let tw = egret.Tween.get(numberBg).wait(1000)
        .call(function(){
            numberBg.setRes("acsingleday_cd_num2");
            let diffTime = GameData.serverTime - this._problemShowStartTime;
            if (diffTime >= 4 && this._problemShowStartTime != 0){
                App.LogUtil.log("*******start show4: ");
                this._problemStartTime = GameData.serverTime - (diffTime - 4) + 3;
                this.onShowThreeSecondCompleted();
                numberBg.visible = false;
                egret.Tween.removeTweens(tw);
            }
    
    }, this)
        .wait(1000)
        .call(function(){numberBg.setRes("acsingleday_cd_num1")}, this)
        .wait(1000)
        .call(function(){ 
            this.onShowThreeSecondCompleted();
            numberBg.visible = false;
            egret.Tween.removeTweens(tw);
        }, this);
    }

    /**三二一 播放完成 */
    public onShowThreeSecondCompleted():void{
        this.setAnswers(0);
        this._isSelectedAnswer = false;
        this._startTime = egret.getTimer();
        this._problemStartTime = GameData.serverTime;
        egret.startTick(this.examTick, this);
        this._answerContainer.visible = true;
    }

    public examTick(timeStamp:number):boolean{
        // let currUserTime = GameData.serverTime - this._problemStartTime - 3;
        let currUserTime = GameData.serverTime - this._problemStartTime;
        App.LogUtil.log("examtick: aaa0: "+ currUserTime);
        if (currUserTime < 0){
            this._problemStartTime = this._problemStartTime + currUserTime;
            currUserTime = 1;
        }
        App.LogUtil.log("examtick: aaa: "+ currUserTime);
        //切后台
        if (currUserTime >= (this.TOTAL_TIME)/1000){
            this._progress.setPercentage(0);
            this._progressTimeInfo.text = LanguageManager.getlocal("examinationTimeDownInfo", ["0"]);
            this._progressTimeInfo.x = this._progress.x + this._progress.width/2 - this._progressTimeInfo.width/2;
            this._isSelectedAnswer = true;
            this._selectedIndex = -1;
            this._isSendRequest = true;
            NetManager.request(NetRequestConst.REQUEST_EXAM_ANSWER, { phaseId:this._problemType+1, qNum:this._problemNum, choose: 5, ts:this.TOTAL_TIME});
            egret.stopTick(this.examTick,this);
            return false;
        }
        App.LogUtil.log("examtick: currUserTime: "+ currUserTime);
        let endTime = this.TOTAL_TIME - currUserTime*1000;
        this._useTime = currUserTime*1000;
        this._progress.setPercentage(endTime/this.TOTAL_TIME);
        this._progressTimeInfo.text = LanguageManager.getlocal("examinationTimeDownInfo", [String(endTime/1000)]);
        this._progressTimeInfo.x = this._progress.x + this._progress.width/2 - this._progressTimeInfo.width/2;
        return false;
    }

    /** 下一题 */
    public showNextAnswer():void{
        this._useTime = 0;
        if (this._problemNum + 1 <= this._totalProblemNum){
            this._problemNum += 1;
            let tw = egret.Tween.get(this._problemText).wait(2000).call(function(){
                this.setAnswers(0);
            }, this)
            .to({alpha:0},1000)
            .call(function(){
                this._problemNumText.text = LanguageManager.getlocal("examinationProblemNum", [String(this._problemNum), String(this._totalProblemNum)]);
                this._problemText.text = this.getNextProblemStr();
                this._progress.setPercentage(1);
                this._progressTimeInfo.text = LanguageManager.getlocal("examinationTimeDownInfo", [String(this.TOTAL_TIME/1000)]);
                this._progressTimeInfo.x = this._progress.x + this._progress.width/2 - this._progressTimeInfo.width/2;
                this._problemShowStartTime = GameData.serverTime;
            }, this)
            .to({alpha:1}, 1000)
            .call(function(){
                // this.showThreeSecondAni();
                this.onShowThreeSecondCompleted();
                egret.Tween.removeTweens(tw);
            }, this)
        }
        else{
            //答题结束
            this.showAnswerFinishView();
        }
    }

    /**答题结束统计 */
    public showAnswerFinishView(){
        let totalProblemNumStr = "examinationMeetTotalProblemNum";
        if (this._problemType == 1){
            totalProblemNumStr = "examinationImperialTotalProblemNum"
        }
        let totalProblemNumText = ComponentManager.getTextField(LanguageManager.getlocal(totalProblemNumStr, [String(this._totalProblemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        totalProblemNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 - totalProblemNumText.width/2, this._problemContainer.y + 50);
        this.addChildToContainer(totalProblemNumText);

        let rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        let rightNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationRightNum", [String(rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        rightNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 - rightNumText.width - 30, totalProblemNumText.y + totalProblemNumText.height + 30);
        this.addChildToContainer(rightNumText);
        let errorNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationErrorNum", [String(this._totalProblemNum - rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        errorNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 + 30, rightNumText.y);
        this.addChildToContainer(errorNumText);
        //总用时
        let allTime = Api.examVoApi.getReplytime()/1000;
        let timeText = ComponentManager.getTextField(LanguageManager.getlocal("examinationTotalSeconds", [String(allTime.toFixed(3))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        timeText.setPosition(this._problemContainer.x + this._problemContainer.width/2 - timeText.width/2, errorNumText.y + errorNumText.height + 30);
        this.addChildToContainer(timeText);
        //积分获得
        let scoreNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationTotalScore", [String(rightData.score)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        scoreNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 - scoreNumText.width/2, timeText.y + timeText.height + 30);
        this.addChildToContainer(scoreNumText);
        //确认按钮
        let enterBtn = ComponentManager.getButton("btn_big_yellow", "examinationEnter", this.enterFinishBtnClick, this);
        enterBtn.setPosition(this._problemContainer.x + this._problemContainer.width/2 - enterBtn.width/2, scoreNumText.y + scoreNumText.height + 30);
        this.addChildToContainer(enterBtn);

        this._problemContainer.visible = false;
        this._answerContainer.visible = false;
        this._progress.visible = false;
        this._progressTimeInfo.visible = false;
        this._problemNumText.visible = false;
    }

    /**答题结束确认 关闭 */
    public enterFinishBtnClick():void{
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EXAM_FRESH, {examType:this._problemType});
        this.hide();
    }

    /**答题过程中活动结束 */
    public showTimeEndView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"examinationStartTitle",
			msg:LanguageManager.getlocal("examinationEndInfo"),
			callback:() =>{
                this.showAnswerFinishView();
            },
			handler:this,
            needCancel:false,
            });
    }

    public reConnect():void{
        if (this._isSendRequest){
            NetManager.request(NetRequestConst.REQUEST_EXAM_ANSWER, { phaseId:this._problemType+1, qNum:this._problemNum, choose: 5, ts:this.TOTAL_TIME});
        } 
    }

    protected getShowHeight():number{
		return 448;
    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
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
    }
    
    protected getCloseBtnName():string {
		return null;
	}

	protected getBgName():string {
		return null;
	}
	protected getTitleBgName():string {
		return null;
	}
	protected getTitleStr():string {
		return null;
	}

    public dispose(){
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
        this._progress =null;
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
        egret.stopTick(this.examTick,this);
        super.dispose();
    }
}