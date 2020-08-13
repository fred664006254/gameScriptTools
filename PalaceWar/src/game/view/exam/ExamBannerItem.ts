/**
 * 科举答题 banneritem
 * author yangchengguo
 * date 2019.7.23
 * @class ExamBannerItem
 */
 class ExamBannerItem extends BaseDisplayObjectContainer{
    public BANNER_TYPE_NOT_START = 0;
    public BANNER_TYPE_START = 1;
    public BANNER_TYPE_JOINED = 2;
    public BANNER_TYPE_END = 3;
    public _timeCountDown:BaseTextField;
    public _startBtn:BaseButton = null;
    public _maskContainer:BaseDisplayObjectContainer = null;
    public _joinedFlag:BaseBitmap = null;
    public _endFlag:BaseBitmap = null;
    public _data = null;
    public _timeBg = null;
    public _examType = 0;
    public _bannerItemType = 0;
    public _endTimeInfo:BaseTextField = null;
    public _endTimeBg:BaseBitmap = null;
    public _startBtnContainer:BaseDisplayObjectContainer = null;
    public _lampholderlight_tw = null;

    constructor(){
        super();
    }

    public initItem(data:any):void{
        this._data = data;
        this._examType = Api.examVoApi.getExamTypeByDay(data.day);
        let bannerBgStr = "examview_meet_bg1";
        let bannerTitleStr = "examinationMeetTitle-1";
        if (this._examType == 1){
            bannerBgStr = "examview_imperial_bg1";
            bannerTitleStr = "examinationImperialTitle-1";
        }
        this.width = 606;
        this.height = 279;
        TickManager.addTick(this.tick, this);
        let bannerBg = BaseLoadBitmap.create(bannerBgStr);
        bannerBg.width = this.width;
        bannerBg.height = this.height;
        this.addChild(bannerBg);

        let itemTopLine:BaseBitmap = BaseBitmap.create("public_line3");
        itemTopLine.width = bannerBg.width - 240;
        itemTopLine.setPosition(bannerBg.x + 120, bannerBg.y + itemTopLine.height + 5);
        this.addChild(itemTopLine);
        
        let bannerTitle = ComponentManager.getTextField(LanguageManager.getlocal(bannerTitleStr), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        bannerTitle.x = this.width/2 - bannerTitle.width/2;
        bannerTitle.y = 20;
        this.addChild(bannerTitle);

        //倒计时背景
        let endTimeBg = BaseBitmap.create("public_9_bg61");
        endTimeBg.setPosition(20, bannerBg.height - endTimeBg.height - 20);
        this._endTimeBg = endTimeBg;
        this.addChild(endTimeBg);
        this._endTimeBg.visible = false;

        //倒计时
        let endTimeInfo = ComponentManager.getTextField(LanguageManager.getlocal("examinationTimeDown", [""]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        endTimeBg.width = endTimeInfo.width + 40;
        endTimeInfo.setPosition(endTimeBg.x + endTimeBg.width/2 - endTimeInfo.width/2, endTimeBg.y + endTimeBg.height/2 - endTimeInfo.height/2);
        this.addChild(endTimeInfo);
        this._endTimeInfo = endTimeInfo;
        this._endTimeInfo.visible = false;
        if (Api.examVoApi.isFinishExamByDay(data.day) == true){
            this.setBannerItemState(this.BANNER_TYPE_JOINED);
        }
        else if (Api.examVoApi.getEndTimeByDay(data.day) < GameData.serverTime){
            this.setBannerItemState(this.BANNER_TYPE_END);
        } 
        else if (Api.examVoApi.isInShow(data.day)){
            this.setBannerItemState(this.BANNER_TYPE_START);
        }       
        else{
            this.setBannerItemState(this.BANNER_TYPE_NOT_START);
        }
    }

    public setBannerItemState(state:number){
        switch(state){
            case this.BANNER_TYPE_NOT_START:
                if (!this._maskContainer){
                    this._maskContainer = new BaseDisplayObjectContainer();
                    this._maskContainer.width = this.width;
                    this._maskContainer.height = this.height;
                    this.addChild(this._maskContainer);
                    let mask = BaseBitmap.create("public_9_viewmask");
                    mask.width = this.width;
                    mask.height = this.height;
                    this._maskContainer.addChild(mask);

                    let timeBg = BaseBitmap.create("wifestatus_namebg");
                    timeBg.y = mask.height/2 - timeBg.height/2;
                    this._maskContainer.addChild(timeBg);
                    this._timeBg = timeBg;
                    let timeCountDown = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                    
                    let timeCountDownStr = "examinationMeetTimeInfo-1";
                    let timeStr = "";
                    if (this._examType == 0){
                        timeStr = Api.examVoApi.getStartTimeCountDownByDay(6);
                    }
                    else{
                        timeStr = Api.examVoApi.getStartTimeCountDownByDay(0);
                        timeCountDownStr = "examinationImperialTimeInfo-1";
                    }
                    timeCountDown.text = LanguageManager.getlocal(timeCountDownStr, [timeStr]);
                    timeBg.width = timeCountDown.width + 90;
                    timeBg.height = timeCountDown.height + 30;
                    if (timeBg.width > this.width){
                        timeBg.width = this.width;
                    }
                    timeBg.x = this.width/2 - timeBg.width/2;
                    timeCountDown.setPosition(timeBg.x + timeBg.width/2 - timeCountDown.width/2, timeBg.y + timeBg.height/2 - timeCountDown.height/2+1);
                    this._maskContainer.addChild(timeCountDown);
                    this._timeCountDown = timeCountDown;
                    //自己添加定时器
                    // TickManager.addTick(this.timeTick, this);
                }
                break;
            case this.BANNER_TYPE_START:
                if (this._maskContainer){
                    this.removeChild(this._maskContainer);
                    this._maskContainer = null;
                    this._timeCountDown = null;
                    this._timeBg = null;
                }
                this._endTimeBg.visible = true;
                this._endTimeInfo.visible = true;
                this.setEndTimeInfo();
                if (!this._startBtnContainer){
                    this.createStartBtnEffect();
                }
                break;
            case this.BANNER_TYPE_JOINED:
                this.removeStartBtnContainer();
                this._endTimeBg.visible = true;
                this._endTimeInfo.visible = true;
                this.setEndTimeInfo();
                if (!this._joinedFlag){
                    this._joinedFlag= BaseLoadBitmap.create("examview_joined");
                    this._joinedFlag.width = 131;
                    this._joinedFlag.height = 86;
                    this._joinedFlag.setPosition(this.width - this._joinedFlag.width - 50, this.height/2 - this._joinedFlag.height/2);
                    this.addChild(this._joinedFlag);
                }
                break;
            case this.BANNER_TYPE_END:
                this.removeStartBtnContainer();
                if (this._joinedFlag){
                    this.removeChild(this._joinedFlag);
                    this._joinedFlag = null;
                }
                this._endTimeBg.visible = true;
                this._endTimeInfo.visible = true;
                this.setEndTimeInfo();
                if (!this._endFlag){
                    this._endFlag= BaseLoadBitmap.create("public_expire");
                    this._endFlag.width = 131;
                    this._endFlag.height = 86;
                    this._endFlag.setPosition(this.width - this._endFlag.width - 50, this.height/2 - this._endFlag.height/2);
                    this.addChild(this._endFlag);
                }
                break;    
        }
    }

    public tick():void{
        if (this._timeCountDown){
            let timeStr = null;
            let timeCountDownStr = "examinationMeetTimeInfo-1";
            if (this._examType == 0){
                timeStr = Api.examVoApi.getStartTimeCountDownByDay(6);
            }
            else{
                timeStr = Api.examVoApi.getStartTimeCountDownByDay(0);
                timeCountDownStr = "examinationImperialTimeInfo-1";
            }
            if (timeStr){
                this._timeCountDown.text = LanguageManager.getlocal(timeCountDownStr, [timeStr]);
                this._timeBg.width = this._timeCountDown.width + 90;
                this._timeBg.height = this._timeCountDown.height + 30;
                this._timeBg.x = this.width/2 -  this._timeBg.width/2;
                this._timeCountDown.setPosition( this._timeBg.x +  this._timeBg.width/2 -  this._timeCountDown.width/2, this._timeBg.y + this._timeBg.height/2 - this._timeCountDown.height/2 + 1);
            }
            else{
                this.setBannerItemState(this.BANNER_TYPE_START);
            }
        }
        this.setEndTimeInfo();
    }

    public setEndTimeInfo():void{
        if (this._endTimeInfo && this._endTimeInfo.visible == true){
            let endTimeStr = "";
            if (this._examType == 0){
                endTimeStr = Api.examVoApi.getEndTimeCountDownByDay(6);
            }
            else{
                endTimeStr = Api.examVoApi.getEndTimeCountDownByDay(0);
            }
            this._endTimeInfo.text = LanguageManager.getlocal("examinationTimeDown", [endTimeStr]);
            this._endTimeBg.width = this._endTimeInfo.width + 40;
            this._endTimeInfo.x = this._endTimeBg.x + this._endTimeBg.width/2 - this._endTimeInfo.width/2;
        }
    }

    /**开始按钮加特效 */
    public createStartBtnEffect():void{
        let btnContainer = new BaseDisplayObjectContainer();
        let btnBg= BaseBitmap.create("examview_btnbg");
        btnContainer.setPosition(this.width - btnBg.width - 50, this.height/2 - btnBg.height/2+20);
        this.addChild(btnContainer);
        btnContainer.addChild(btnBg);
        this._startBtnContainer = btnContainer;
        btnBg.addTouchTap(this.startBtnClick, this, [this._data.day]);

        let light = BaseBitmap.create("examview_light");
        light.anchorOffsetX = light.width/2;
        light.anchorOffsetY = light.height/2;
        light.setPosition(btnBg.x + btnBg.width/2 + 20, btnBg.y + btnBg.height/2 + 14);

        let lampholderlight = BaseBitmap.create("examview_effect_lampholderlight");
        lampholderlight.anchorOffsetX = lampholderlight.width/2;
        lampholderlight.anchorOffsetY = lampholderlight.height/2;
        lampholderlight.setPosition(light.x, light.y - 3);
        btnContainer.addChild(lampholderlight);
        btnContainer.addChild(light);
        this._lampholderlight_tw = egret.Tween.get(lampholderlight, {loop: true}).to({alpha:0}, 880).to({alpha:1}, 880);

        let lampholderbright = BaseBitmap.create("examvieweffect_lampholderbright");
        lampholderbright.anchorOffsetX = lampholderbright.width/2;
        lampholderbright.anchorOffsetY = lampholderbright.height/2;
        lampholderbright.setPosition(light.x, light.y);
        // btnContainer.addChild(lampholderbright);
        // let lampholderbright_tw = egret.Tween.get(lampholderbright, {loop: true}).to({alpha:0}, 880).to({alpha:0.5}, 880);  

        //按钮后的特效
        let btnEffect = ComponentManager.getCustomMovieClip("examview_effect_light", 10, 100);
		btnEffect.setPosition(btnBg.x - 35, btnBg.y - 50);
        btnEffect.playWithTime(-1);
        btnContainer.addChild(btnEffect);

        //按钮文字
        let btnInfo = BaseBitmap.create("examview_btninfo");
        btnInfo.setPosition(btnBg.x + btnBg.width/2 - btnInfo.width/2 + 10, btnBg.y + btnBg.height - btnInfo.height/2 - 10);
        btnContainer.addChild(btnInfo);
    }

    public removeStartBtnContainer():void{
        if (this._startBtnContainer){
            egret.Tween.removeTweens(this._lampholderlight_tw);
            this.removeChild(this._startBtnContainer);
            this._startBtnContainer = null;
        }
    }

    public startBtnClick(){
        let playerLevel = Api.playerVoApi.getPlayerLevel();
        if (playerLevel < Api.examVoApi.cfg.lvLimit){
            let levelStr = LanguageManager.getlocal("officialTitle"+Api.examVoApi.cfg.lvLimit);
            App.CommonUtil.showTip(LanguageManager.getlocal("examLevelLimit", [levelStr]));
        }
        else{
            App.LogUtil.log("titleBtnClick");
            // ViewController.getInstance().openView(ViewConst.POPUP.EXAMPROBLEMPOPUPVIEW, {type:this._examType, questionNum:this._data.questionNum});
            //弹窗提示
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"examinationStartTitle",
                msg:LanguageManager.getlocal("examinationStartInfo"),
                callback:() =>{
                    ViewController.getInstance().openView(ViewConst.POPUP.EXAMPROBLEMPOPUPVIEW, {type:this._examType, questionNum:this._data.questionNum});
                },
                handler:this,
                needCancel:true,
                }); 
        } 
    }

    public dispose():void{
        this._timeCountDown = null;
        this._maskContainer = null;
        this._startBtn = null;
        this._joinedFlag = null;
        this._data = null;
        this._timeBg = null;
        this._examType = 0;
        this._endFlag = null;
        this._endTimeInfo = null;
        this._endTimeBg = null;
        this._startBtnContainer = null;
        this._lampholderlight_tw = null;
        // TickManager.removeTick(this.timeTick, this);
        TickManager.removeTick(this.tick, this);
    }   
 }