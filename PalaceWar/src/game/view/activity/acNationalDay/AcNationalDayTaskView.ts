/**
 * 国庆活动任务
 * author yangchengguo
 * date 2019.9.9
 * @class AcNationalDayTaskView
 */
class AcNationalDayTaskView extends CommonView{
    public _showDay:number = 1;
    public _totalDay:number = 7;
    public _bottomBg:BaseBitmap = null;
    public _progressBar:ProgressBar = null;
    public _goBtn:BaseButton = null;
    public _getBtn:BaseButton = null;
    public _collectFlag:BaseBitmap = null;
    public _dayTitle:BaseTextField = null;
    public _sevenRewardBox:BaseButton = null;
    public _sevenRewardBoxGet:BaseButton = null;
    public _sevenRewardBoxEnd:BaseButton = null;
    public _sevenRewardRate:any[] = [];
    public _dailyTask:any[] = [];
    public _tokenNum:BaseTextField = null;
    public _boxInfo:BaseTextField = null;
    public _scrollList:ScrollList = null;
    public _leftBtn:BaseButton = null;
    public _rightBtn:BaseButton = null;
    public _rightBtnDot:BaseBitmap = null;
    public _acDesc:BaseTextField = null;
    public _isFreshDot:boolean = false;
    public _acDescY:number = 0;
    public _boxLight:BaseBitmap = null;
    public _boxLight1:BaseBitmap = null;
    public _isNeedFreshAllView:boolean = true;
    public _isShowPopRewardView:boolean = false;
    public _boxTitle:BaseTextField = null;
    public _acDescBg:BaseBitmap = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, this.getTaskCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACNATIONALDAY_GET_TASK_REWARD, this.refreshTaskView, this);
        this._showDay = this.vo.getDay();
        if (this.param.data.showDay){
            this._showDay = this.param.data.showDay;
        }
        if (this._showDay > this._totalDay){
            this._showDay = this._totalDay;
        }
        this._dailyTask = this.vo.getTaskCfgById(this._showDay);
        //活动介绍背景
        let acDescBgStr = ResourceManager.hasRes("acnationalday_task_infobg-"+this.getTypeCode()+"_"+this._showDay)?"acnationalday_task_infobg-"+this.getTypeCode()+"_"+this._showDay:"acnationalday_task_infobg-1_"+this._showDay;
        let acDescBg = BaseBitmap.create(acDescBgStr);
        acDescBg.setPosition(this.titleBg.x + this.titleBg.width/2 - acDescBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        this._acDescBg = acDescBg;

        //活动第几天
        let dayBg = BaseBitmap.create("acnationalday_task_day_bg");
        dayBg.setPosition(acDescBg.x +acDescBg.width/2 - dayBg.width/2, acDescBg.y + 20);
        this.addChildToContainer(dayBg);
        //天数标题
        let dayTitle = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayDayNum-"+this.getTypeCode()+"_"+this._showDay), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        dayTitle.setPosition(dayBg.x + dayBg.width/2 - dayTitle.width/2 + 2, dayBg.y + dayBg.height/2 - dayTitle.height/2);
        this.addChildToContainer(dayTitle);
        this._dayTitle = dayTitle;

        //活动介绍
        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTaskInfoStart-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        acDesc.width = 380;
        acDesc.lineSpacing = 6;
        acDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        acDesc.setPosition(acDescBg.x + acDescBg.width/2 - acDesc.width/2, acDescBg.y + 80);
        this.addChildToContainer(acDesc);
        this._acDesc = acDesc;
        this._acDescY = acDescBg.y + 80;

        this.refreshAcDesc();

        //向左按钮
        let leftBtn = ComponentManager.getButton("btn_leftpage","", this.changeBtnClick , this, [{index:"left"}]); 
        leftBtn.setPosition(55, acDesc.y - 20);       
        leftBtn.setScale(1);
        this.addChildToContainer(leftBtn);
        this._leftBtn = leftBtn;

        //向右按钮
        let rightBtn = ComponentManager.getButton("btn_leftpage","", this.changeBtnClick , this, [{index:"right"}]); 
        rightBtn.setScale(-1);
        rightBtn.setPosition(GameConfig.stageWidth - 120 - rightBtn.width * rightBtn.scaleX, leftBtn.y + 60);       
        this.addChildToContainer(rightBtn);
        this._rightBtn = rightBtn;

        if (this._showDay == 1){
            this._leftBtn.visible = false;
        }
        else if (this._showDay == this._totalDay){
            this._rightBtn.visible = false;
        }
					
        let rightBtnDot:BaseBitmap = BaseBitmap.create("public_dot2");
        rightBtnDot.setPosition(rightBtn.x - rightBtnDot.width, rightBtn.y - rightBtn.height);
        this.addChildToContainer(rightBtnDot);
        this._rightBtnDot = rightBtnDot;
        rightBtnDot.visible = false;

        this.showChangeBtnRedDot();

        //七日奖励
        let sevenRewardBg = BaseBitmap.create("public_9_bg85");
        sevenRewardBg.width = GameConfig.stageWidth;
        sevenRewardBg.height = 80;
        sevenRewardBg.setPosition(0, acDescBg.y + acDescBg.height - sevenRewardBg.height - 5);
        this.addChildToContainer(sevenRewardBg);

        //七日奖励宝箱
        let sevenRewardBox = ComponentManager.getButton("acnationalday_reward_show_btn", "", this.sevenRewardBtnHandler, this);
        sevenRewardBox.setPosition(sevenRewardBg.x + 3, sevenRewardBg.y + sevenRewardBg.height/2 - sevenRewardBox.height/2 + 2);
        this.addChildToContainer(sevenRewardBox);
        this._sevenRewardBox = sevenRewardBox;

        let light =  BaseBitmap.create("tailor_get_light");
        light.anchorOffsetX =  light.width/2;
        light.anchorOffsetY =  light.height/2;
        light.setScale(0.4);
        light.x = sevenRewardBox.x + sevenRewardBox.width/2;
        light.y = sevenRewardBox.y + sevenRewardBox.height/2;
        egret.Tween.get(light,{loop:true}).to({rotation:360}, 6000);
        this.addChildToContainer(light);
        this._boxLight = light;
        light.visible = false;

        let light2 =  BaseBitmap.create("tailor_get_light");
        light2.anchorOffsetX =  light2.width/2;
        light2.anchorOffsetY =  light2.height/2;
        light2.setScale(0.4);
        light2.x = sevenRewardBox.x + sevenRewardBox.width/2;
        light2.y = sevenRewardBox.y + sevenRewardBox.height/2;
        egret.Tween.get(light2,{loop:true}).to({rotation:-360}, 6000);
        this.addChildToContainer(light2);
        this._boxLight1 = light2;
        light2.visible = false;

        let sevenRewardBoxGet = ComponentManager.getButton("acnationalday_reward_get_btn", "", this.sevenRewardBtnHandler, this);
        sevenRewardBoxGet.setPosition(sevenRewardBg.x + 3, sevenRewardBg.y + sevenRewardBg.height/2 - sevenRewardBoxGet.height/2 + 2);
        this.addChildToContainer(sevenRewardBoxGet);
        sevenRewardBoxGet.visible = false;
        this._sevenRewardBoxGet = sevenRewardBoxGet;
        App.CommonUtil.addIconToBDOC(sevenRewardBoxGet);

        let sevenRewardBoxEnd = ComponentManager.getButton("acnationalday_reward_get_end_btn", "", this.sevenRewardBtnHandler, this);
        sevenRewardBoxEnd.setPosition(sevenRewardBg.x + 3, sevenRewardBg.y + sevenRewardBg.height/2 - sevenRewardBoxEnd.height/2 + 2);
        this.addChildToContainer(sevenRewardBoxEnd);
        sevenRewardBoxEnd.visible = false;
        this._sevenRewardBoxEnd = sevenRewardBoxEnd;

        //七日奖励进度
        this.showSevenRewardRate();
        //刷新七日奖励进度
        this.refreshSevenRewardRate();

        let bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - acDescBg.height - acDescBg.y;
        bottomBg.x = 0; 
        bottomBg.y = acDescBg.height + acDescBg.y; 
        this._bottomBg = bottomBg;
        this.addChildToContainer(bottomBg); 

        //每日宝箱任务
        let dailyBoxContainer = this.showDailyBoxView();
        dailyBoxContainer.setPosition(bottomBg.x + bottomBg.width/2 - dailyBoxContainer.width/2, bottomBg.y + 20);
        this.addChildToContainer(dailyBoxContainer)
        this.refreshDailyBoxView();
        
        let line = BaseBitmap.create("public_line1");
		line.x = GameConfig.stageWidth/2 - line.width/2;
		line.y = dailyBoxContainer.y + dailyBoxContainer.height + 8;
        this.addChildToContainer(line); 
          
        //任务列表
        let listBg = BaseBitmap.create("public_9_bg43");
        listBg.width = bottomBg.width - 40;
        listBg.height = bottomBg.height - (line.y - bottomBg.y) - 35;
        listBg.setPosition(GameConfig.stageWidth/2 - listBg.width/2, line.y + line.height + 8);
        this.addChildToContainer(listBg); 

        //任务列表
        let taskList:any[] = [];
        for (let i=1; i < this._dailyTask.length; i++){
            taskList[i-1] = this._dailyTask[i];
        }
        let rect =  new egret.Rectangle(0, 0, listBg.width - 10, listBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcNationalDayTaskScrollItem, taskList, rect, {aid:this.aid, code:this.code, currDay:this._showDay});
        scrollList.setPosition(listBg.x + 5, listBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    //切换按钮显示红点
    public showChangeBtnRedDot():void{
        App.CommonUtil.removeIconFromBDOC(this._leftBtn);
        for (let i = 1; i < this._showDay; i++){
            if (this.vo.isCanGetTaskRewardByDay(i)){
                App.CommonUtil.addIconToBDOC(this._leftBtn);
                break;
            }
        }

        this._rightBtnDot.visible = false;
        for (let i = this._showDay + 1; i <= this._totalDay; i++){
            if (this.vo.isCanGetTaskRewardByDay(i)){
                this._rightBtnDot.visible = true;
                break;
            }
        }

        let day = this.vo.getDay();
        if (this._showDay < day && this.vo.isShowDailyChargeRedDot()){
            this._rightBtnDot.visible = true;
        }
        if (this._showDay > day && this.vo.isShowDailyChargeRedDot()){
            App.CommonUtil.addIconToBDOC(this._leftBtn);
        }
    }

    //七日奖励进度
    public showSevenRewardRate():void{
        let rateLineStr = ResourceManager.hasRes("acnationalday_reward_line-"+this.getTypeCode()) ? "acnationalday_reward_line-"+this.getTypeCode() : "acnationalday_reward_line-1";
        let rateLine = BaseBitmap.create(rateLineStr);
        rateLine.setPosition(this._sevenRewardBox.x + this._sevenRewardBox.width, this._sevenRewardBox.y + this._sevenRewardBox.height/2 - 2);
        this.addChildToContainer(rateLine);

        for (let i = 0; i < this._totalDay; i++){
            let rateImg = ResourceManager.hasRes("acnationalday_rewarditem_close-"+this.getTypeCode()) ? "acnationalday_rewarditem_close-"+this.getTypeCode() : "acnationalday_rewarditem_close-1";
            let closeFlag = ComponentManager.getButton(rateImg, "", null, this);
            closeFlag.setPosition(rateLine.x + 30 + i * (closeFlag.width + 15), rateLine.y - 20);
            this.addChildToContainer(closeFlag);
            closeFlag.touchEnabled = false;

            let openContainer = new BaseDisplayObjectContainer();
            openContainer.setPosition(closeFlag.x, closeFlag.y);
            this.addChildToContainer(openContainer);
            let openImg = ResourceManager.hasRes("acnationalday_rewarditem_open-"+this.getTypeCode()) ? "acnationalday_rewarditem_open-"+this.getTypeCode() : "acnationalday_rewarditem_open-1";
            let openFlag = BaseBitmap.create(openImg);
            openContainer.addChild(openFlag);
            let openOk = BaseBitmap.create("examview_right");
            openOk.setPosition(10, 10);
            openContainer.addChild(openOk);
            let rateData = {close:closeFlag, open:openContainer};
            this._sevenRewardRate[i] = rateData;
        }
    }

    //刷新七日奖励进度
    public refreshSevenRewardRate():void{
        for (let i = 0; i < this._sevenRewardRate.length; i++){
            let aa = this.vo.isCompleteDailyTask(i+1);
            App.LogUtil.log("aa: "+aa);
            if (this.vo.isCompleteDailyTask(i+1)){
                this._sevenRewardRate[i].close.visible = false;
                this._sevenRewardRate[i].open.visible = true;
            }
            else{
                this._sevenRewardRate[i].close.visible = true;
                this._sevenRewardRate[i].open.visible = false;
                if (this.vo.getDay() > i + 1){
                    this._sevenRewardRate[i].close.setGray(true);
                }
                else{
                    this._sevenRewardRate[i].close.setGray(false);
                }
            }
        }
        if (this.vo.isGetSevenReward()){
            this._sevenRewardBox.visible = false;
            this._sevenRewardBoxGet.visible = false;
            this._sevenRewardBoxEnd.visible = true;
            this._boxLight.visible = false;
            this._boxLight1.visible = false;
        }
        else{
            this._sevenRewardBoxEnd.visible = false;
            if (this.vo.isCanGetSevenReward()){
                this._sevenRewardBox.visible = false;
                this._sevenRewardBoxGet.visible = true;
                this._boxLight.visible = true;
                this._boxLight1.visible = true;
            }
            else{
                this._sevenRewardBox.visible = true;
                this._sevenRewardBoxGet.visible = false;
                this._boxLight.visible = false;
                this._boxLight1.visible = false;
            }
        }
    }

    //七日奖励
    public sevenRewardBtnHandler():void{
        if (this.vo.isGetSevenReward()){
            //已领取
            // ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYCLOTHERVIEW, {aid:this.aid, code:this.code});
            ViewController.getInstance().openView(ViewConst.POPUP.ACNATIONALDAYREWARDPOPUPVIEW, {rewards:this.cfg.bigPrize, topMsg:"acNationalDayRewardTopMsg-"+this.getTypeCode()});
        }
        else{
            this._sevenRewardBoxEnd.visible = false;
            if (this.vo.isCanGetSevenReward()){
                //可领取
                if ((!this.vo.isStart)) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
                }
                this._isNeedFreshAllView = false;
                this._isShowPopRewardView = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, { activeId: this.vo.aidAndCode, questType: "0", diffday: this._totalDay, ftype:2 });
            }
            else{
                //不可领取
                // ViewController.getInstance().openView(ViewConst.COMMON.ACNATIONALDAYCLOTHERVIEW, {aid:this.aid, code:this.code});
                ViewController.getInstance().openView(ViewConst.POPUP.ACNATIONALDAYREWARDPOPUPVIEW, {rewards:this.cfg.bigPrize, topMsg:"acNationalDayRewardTopMsg-"+this.getTypeCode()});
            }
        }
    }

    //每日宝箱相关
    public showDailyBoxView():BaseDisplayObjectContainer{
        //宝箱 相关
        let dailyBoxContainer = new BaseDisplayObjectContainer();
        let bigRewardBg = BaseBitmap.create("newyearewardbg");
        bigRewardBg.setPosition(0, 0);
        dailyBoxContainer.addChild(bigRewardBg);

        dailyBoxContainer.width = bigRewardBg.width;
        dailyBoxContainer.height = bigRewardBg.height;

        let bigRewardTitle = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTaskRewardInfo-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        bigRewardTitle.setPosition(bigRewardBg.x + bigRewardBg.width/2 - bigRewardTitle.width/2, bigRewardBg.y + 7);
        dailyBoxContainer.addChild(bigRewardTitle);

        //宝箱背景
        let boxBg = BaseBitmap.create("progress6_bg");
        boxBg.setPosition(bigRewardBg.x + 20, bigRewardBg.y + 60);
        dailyBoxContainer.addChild(boxBg);

        let box = BaseBitmap.create("acnewyear_box");
        box.setPosition(boxBg.x + 10, boxBg.y + 7);
        dailyBoxContainer.addChild(box);
        box.addTouchTap(this.boxClickHandler, this);

        let boxTitle = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTaskBigRewardTitle-"+this.getTypeCode()+"_"+this._showDay), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
        boxTitle.setPosition(boxBg.x + boxBg.width + 15, bigRewardBg.y + 70);
        dailyBoxContainer.addChild(boxTitle);
        this._boxTitle = boxTitle;

        let boxInfo = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTaskBigRewardInfo-"+this.getTypeCode(), ["0"]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        boxInfo.setPosition(boxTitle.x, boxTitle.y + boxTitle.height + 15);
        dailyBoxContainer.addChild(boxInfo);
        this._boxInfo = boxInfo;

        //物品数量相关
        // let tokenBg = BaseBitmap.create("acnationalday_icon_bg");
        // tokenBg.setPosition(dailyBoxContainer.width - 135, 45);
        // dailyBoxContainer.addChild(tokenBg);

        // let tokenStr = ResourceManager.hasRes("acnationalday_rewarditem_small_icon-"+this.getTypeCode()) ? "acnationalday_rewarditem_small_icon-"+this.getTypeCode() : "acnationalday_rewarditem_small_icon-1";
        // let token = BaseBitmap.create(tokenStr);
        // token.setPosition(tokenBg.x, tokenBg.y);
        // dailyBoxContainer.addChild(token);

        // let tokenNum = ComponentManager.getTextField("+0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        // tokenNum.setPosition(token.x + token.width, token.y + token.height/2 - tokenNum.height/2+2);
        // dailyBoxContainer.addChild(tokenNum);
        // this._tokenNum = tokenNum;

        //进度条
        let progressBar = ComponentManager.getProgressBar("progress5", "progress3_bg", 400);
        progressBar.setPosition(boxInfo.x, boxInfo.y + boxInfo.height + 20);
        dailyBoxContainer.addChild(progressBar);
        let progressText = LanguageManager.getlocal("acNationalDayMoneyInfo-"+this.getTypeCode(), ["0", "0"]);
        progressBar.setPercentage(0, progressText);
        this._progressBar = progressBar;

        //前往按钮
		this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.collectHandler, this);
		this._goBtn.setPosition(bigRewardBg.width - this._goBtn.width - 30, 95);
        dailyBoxContainer.addChild(this._goBtn);
        if (this._showDay == this.vo.getDay() && !this.vo.isClickedDailyCharge()){
            App.CommonUtil.addIconToBDOC(this._goBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._goBtn);
        }
		
		//领取
		this._getBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._getBtn.x = this._goBtn.x;
		this._getBtn.y = this._goBtn.y;
		this._getBtn .visible = false;
        dailyBoxContainer.addChild(this._getBtn);
        App.CommonUtil.addIconToBDOC(this._getBtn);

        //已领取
        this._collectFlag = BaseBitmap.create("collectflag"); 
        this._collectFlag.setScale(0.6);
        this._collectFlag.setPosition(bigRewardBg.width - this._goBtn.width - 20, 70);
        dailyBoxContainer.addChild(this._collectFlag);
        return dailyBoxContainer;
    }

    //刷新每日宝箱界面
    public refreshDailyBoxView():void{
        let taskData = this._dailyTask[0];
        this._boxInfo.text = LanguageManager.getlocal("acNationalDayTaskBigRewardInfo-"+this.getTypeCode(), [String(taskData.value)]);
        let currDay = this.vo.getDay();
        let status = this.vo.getTaskCompleteStatus(this._showDay, taskData.questType);
        if (this._showDay > currDay){
            this._goBtn.visible = true;
            this._goBtn.setGray(true);
            this._getBtn.visible = false;
            this._collectFlag.visible = false;
            App.CommonUtil.removeIconFromBDOC(this._goBtn);
        }
        else {
            if (status == 0){
                this._goBtn.visible = true;
                if (this._showDay != currDay){
                    this._goBtn.setGray(true);
                    App.CommonUtil.removeIconFromBDOC(this._goBtn);
                }
                else{
                    if (this.vo.isInActivity()){
                        this._goBtn.setGray(false);
                        if (!this.vo.isClickedDailyCharge()){
                            App.CommonUtil.addIconToBDOC(this._goBtn);
                        }
                        else{
                            App.CommonUtil.removeIconFromBDOC(this._goBtn);
                        }
                    }
                    else{
                        this._goBtn.setGray(true);
                        App.CommonUtil.removeIconFromBDOC(this._goBtn);
                    }
                    
                }
                this._getBtn.visible = false;
                this._collectFlag.visible = false;
            }
            else if (status == 1){
                this._goBtn.visible = false;
                this._getBtn.visible = true;
                this._collectFlag.visible = false;
            }
            else{
                this._goBtn.visible = false;
                this._getBtn.visible = false;
                this._collectFlag.visible = true;
            }
        }
        let currNum = this.vo.getTaskNumByType(this._showDay, taskData.questType);
        let perStr = LanguageManager.getlocal("acNationalDayMoneyInfo-"+this.getTypeCode(), [String(currNum), String(taskData.value)]);
        this._progressBar.setPercentage(currNum / taskData.value, perStr);
        // this._tokenNum.text = "+"+taskData.specialReward;
        let rewardStr = LanguageManager.getlocal("acNationalDayTaskBigRewardTitle-"+this.getTypeCode()+"_"+this._showDay);
        this._boxTitle.text = rewardStr;
    }

    //每日宝箱
    public collectHandler():void{
        if (!this.vo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
        }
        let taskData = this._dailyTask[0];
        let currDay = this.vo.getDay();
        if (this._showDay > currDay){
            App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskNotStart"));
			return;
        }
        let status = this.vo.getTaskCompleteStatus(this._showDay, taskData.questType);
        if (this._showDay == currDay){
            if (status == 0){
                this.vo.setClickedDailyCharge();
                this._isFreshDot = true;
                if (taskData.openType){
                    this.taskGoByOpenType(taskData.openType);
                } 
                if (this.vo.isClickedDailyCharge()){
                    App.CommonUtil.removeIconFromBDOC(this._goBtn);
                }
            }
            else if (status == 1){
                this._isNeedFreshAllView = false;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, {activeId: this.vo.aidAndCode, questType: taskData.questType, diffday:this._showDay, ftype:1})
            }
        }
        else if (this._showDay < currDay){
            if (status == 0){
                App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskEnd"));
			    return;
            }
            else if (status == 1){
                this._isNeedFreshAllView = false;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, {activeId: this.vo.aidAndCode, questType: taskData.questType, diffday:this._showDay, ftype:1})
            }
        }
    }

    //领取任务奖励回调
    public getTaskCallback(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        if (this._isShowPopRewardView){
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards, "isPlayAni":true});
            this._isShowPopRewardView = false;
        }
        else{
            let rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    //向左向右切换按钮
    public changeBtnClick(data:any){
        // if (!this.vo.isInActivity()){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		// 	return;
        // }
        if (data.index == "left"){
            this._showDay -= 1;
            // if (this._showDay <= 0){
            //     this._showDay = this._totalDay + this._showDay;
            // }
            this._rightBtn.visible = true;
            if (this._showDay <= 1){
                this._showDay = 1;
                this._leftBtn.visible = false;
            }
        }
        else if (data.index == "right"){
            this._showDay += 1;
            // if (this._showDay > this._totalDay){
            //     this._showDay = this._showDay - this._totalDay;
            // }
            this._leftBtn.visible = true;
            if (this._showDay >= this._totalDay){
                this._showDay = this._totalDay;
                this._rightBtn.visible = false;
            }
        }

        this._dailyTask = this.vo.getTaskCfgById(this._showDay);
        this._dayTitle.text = LanguageManager.getlocal("acNationalDayDayNum-"+this.getTypeCode()+"_"+this._showDay);
        this.refreshTaskList();
        this.refreshDailyBoxView();
        this.showChangeBtnRedDot();
        this.refreshAcDesc();
        this.refreshTitleBg();
    }

    public refreshView():void{
        if (this._isNeedFreshAllView){
            this._showDay = this.vo.getDay();
            if (this._showDay > this._totalDay){
                this._showDay = this._totalDay;
            }
            this._dailyTask = this.vo.getTaskCfgById(this._showDay);
            this._dayTitle.text = LanguageManager.getlocal("acNationalDayDayNum-"+this.getTypeCode()+"_"+this._showDay);
        }
        this._isNeedFreshAllView = true;

        this.refreshTaskList();
        this.refreshDailyBoxView();
        this.refreshAcDesc();
        this.refreshSevenRewardRate();
        this.refreshTitleBg();
    }

    //刷新任务列表
    public refreshTaskList():void{
        let taskList:any[] = [];
        for (let i=1; i < this._dailyTask.length; i++){
            taskList[i-1] = this._dailyTask[i];
        }
        this._scrollList.refreshData(taskList, {aid:this.aid, code:this.code, currDay:this._showDay});
    }

    //刷新活动介绍
    public refreshAcDesc():void{
        let currDay = this.vo.getDay();
        let strKey = "acNationalDayTaskInfoStart-"+this.getTypeCode();
        if (this._showDay < currDay){
            strKey = "acNationalDayTaskInfoEnd-"+this.getTypeCode();
            this._acDesc.y = this._acDescY + 10;
        }
        else if (this._showDay > currDay){
            strKey = "acNationalDayTaskInfoNotStart-"+this.getTypeCode();
            // this._acDesc.y = this._acDescY + 15;
        }
        else{
            this._acDesc.y = this._acDescY;
        }
        this._acDesc.text = LanguageManager.getlocal(strKey);
    }

    //刷新titlebg
    public refreshTitleBg():void{
        let res = ResourceManager.hasRes("acnationalday_task_titlebg-"+this.getTypeCode()+"_"+this._showDay)?"acnationalday_task_titlebg-"+this.getTypeCode()+"_"+this._showDay : "acnationalday_task_titlebg-1_"+this._showDay;
        this.titleBg.setRes(res);

        let acDescBgStr = ResourceManager.hasRes("acnationalday_task_infobg-"+this.getTypeCode()+"_"+this._showDay)?"acnationalday_task_infobg-"+this.getTypeCode()+"_"+this._showDay:"acnationalday_task_infobg-1_"+this._showDay;
        this._acDescBg.setRes(acDescBgStr);
    }

    //点击宝箱
    public boxClickHandler():void{
        let rewards = this._dailyTask[0].getReward;
        ViewController.getInstance().openView(ViewConst.POPUP.ACNATIONALDAYREWARDPOPUPVIEW, {rewards: rewards});
    }

    public taskGoByOpenType(openType:string):void{
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if(!openType){
            return; 
        }
        if(openType == "")
        {
            PlayerBottomUI.getInstance().show();
        } 
        else
        {
            let viewName = App.StringUtil.firstCharToUper(openType);
            if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
            {
                let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
                if(!isShowNpc)
                {
                    let lockedStr:string=Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
                    App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen") );
                    return;
                }
            }
            if (egret.getDefinitionByName(viewName + "View"))
            {
                ViewController.getInstance().openView(viewName+ "View"); 
                
            }else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
            {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else
            {
                if(openType=="recharge")
                {
                    ViewController.getInstance().openView(viewName+"Vip"+ "View");
                }
            } 
        } 
    }

    public refreshTaskView():void{
        this._isNeedFreshAllView = false;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get cfg():Config.AcCfg.NationalDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcNationalDayVo{
        return <AcNationalDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    //code 类型
    public getTypeCode():string{
        if (this.code == "2"){
            return "1"
        }
        return this.code;
    }

    //背景图
    protected getBgName():string{
        return "";
    }

    //标题背景
    protected getTitleBgName():string{
        let index = 4;
        if (this.param && this.param.data && this.param.data.showDay){
           index = this.param.data.showDay;
        }
        App.LogUtil.log("getTitleBgName: "+index);
        return ResourceManager.hasRes("acnationalday_task_titlebg-"+this.getTypeCode()+"_"+index)?"acnationalday_task_titlebg-"+this.getTypeCode()+"_"+index : "acnationalday_task_titlebg-1_4";
    }

    //标题
    protected getTitleStr():string{
        return "";
    }

    //规则
    protected getRuleInfo(): string {
        return "acNationalDayTaskRuleInfo-"+this.getTypeCode();
    }

    protected getRuleInfoParam():string[]{
        return [
            String(1/this.cfg.ratio)
        ];
    }

    protected isHideTitleBgShadow():boolean{
		return true;
	}

    //资源
    public getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = [
                "acnationalday_task_infobg-1_1","acnationalday_task_infobg-1_2",
                "acnationalday_task_infobg-1_3","acnationalday_task_infobg-1_4",
                "acnationalday_task_infobg-1_5","acnationalday_task_infobg-1_6",
                "acnationalday_task_infobg-1_7",
                "acnationalday_reward_line-1", "acnationalday_rewarditem_close-1",
                "acnationalday_rewarditem_open-1", "acnationalday_rewarditem_small_icon-1",
                "acnationalday_task_titlebg-1_1","acnationalday_task_titlebg-1_2","acnationalday_task_titlebg-1_3","acnationalday_task_titlebg-1_4","acnationalday_task_titlebg-1_5","acnationalday_task_titlebg-1_6","acnationalday_task_titlebg-1_7"
            ];
        }
        return super.getResourceList().concat([
            "newyearewardbg", "progress6_bg", "acnewyear_box", "progress5", "progress3_bg","progress3",
            "btn_leftpage", "acnationalday_task_day_bg", "examview_right", "collectflag",
            "acnationalday_icon_bg", "acnationalday_reward_show_btn", "acnationalday_reward_show_btn_down", "acnationalday_reward_get_btn", "acnationalday_reward_get_btn_down", "acnewyear_bottom2", "acnationalday_reward_get_end_btn", "acnationalday_reward_get_end_btn_down", "acnationalday_reward_get_btn", "acnationalday_reward_get_btn_down", "tailor_get_light",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_1",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_2",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_3",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_4",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_5",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_6",
            "acnationalday_task_infobg-"+this.getTypeCode()+"_7",
            "acnationalday_reward_line-"+this.getTypeCode(),
            "acnationalday_rewarditem_close-"+this.getTypeCode(),
            "acnationalday_rewarditem_open-"+this.getTypeCode(),
            "acnationalday_rewarditem_small_icon-"+this.getTypeCode(),
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_1",
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_2",
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_3",
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_4",
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_5",
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_6",
            "acnationalday_task_titlebg-"+this.getTypeCode()+"_7",

            
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, this.getTaskCallback, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW, {isFreshDot:this._isFreshDot});
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACNATIONALDAY_GET_TASK_REWARD, this.refreshTaskView, this);
        this._showDay = 1;
        this._bottomBg = null;
        this._progressBar = null;
        this._goBtn = null;
        this._getBtn = null;
        this._collectFlag = null;
        this._dayTitle = null;
        this._sevenRewardBox = null;
        this._sevenRewardRate = [];
        this._dailyTask = [];
        this._tokenNum = null;
        this._scrollList = null;
        this._sevenRewardBoxGet = null;
        this._sevenRewardBoxEnd = null;
        this._leftBtn = null;
        this._rightBtn = null;
        this._rightBtnDot = null;
        this._acDesc = null;
        this._isFreshDot = false;
        this._acDescY = 0;
        this._isNeedFreshAllView = true;
        this._isShowPopRewardView = false;
        this._boxTitle = null;

        super.dispose();
    }
}