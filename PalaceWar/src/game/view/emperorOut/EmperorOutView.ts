/**
 * 明君出巡
 * date 2019.12.10
 * author ycg
 * @calss EmperorTourView
 */
class EmperorOutView extends CommonView{
    private _progressBar:ProgressBar = null;
    private _progressBM:BaseBitmap = null;
    private _progressLight:BaseBitmap = null;
    private _boxBM:BaseBitmap = null;
    private _boxLightBM:BaseBitmap = null;
    private _boxRedDot:BaseBitmap = null;
    private _boxList:BaseBitmap[] = [];
    private _scoreNum:BaseTextField = null;
    private _currScoreNum:BaseTextField = null;
    private _wordArrow:BaseBitmap = null;
    private _isShowWordList:boolean = false;
    private _barragePos:number[] = [];
    private _maxBarrageNum:number = 0;
    private _oldMaxBarrageNum:number = 0;
    private _barrageSpeed:number = 0.05;
    private _barrageList:BaseDisplayObjectContainer[] = [];
    private _wordsPool:string[] = [];
    private _barrageContainer:BaseDisplayObjectContainer = null;
    private _barrageNum:number = 0;
    private _barrageHeight:number = 25;
    private _wordListContainer:BaseDisplayObjectContainer = null;
    private _defaultWord:BaseTextField = null;
    private _wordRandList:string[] = [];
    private _timeOutFun:number[] = [];
    private _showData:any = null;
    private _timeInfo:BaseTextField = null;
    private _isShowGoHomeView:boolean = false;
    private _sendWordBtn:BaseButton = null;
    private _btnCdTime:number = 0;
    private _sendWordId:number = 0;
    private _isSendNormalWord:boolean = false;
    private _isOutAuthor:boolean = false;
    private _outWishContainer:BaseDisplayObjectContainer = null;
    private _isInitView:boolean = true;
    private _firstRewardContainer:BaseDisplayObjectContainer = null;
    private _emperorWordId:number = 0;
    private _isShowRewardView:boolean = false;
    private _topTipBg:BaseBitmap = null;
    private _moveTextCount:number = 0;
    private _moveTextArr:any[] = [];
    private _isCanShowWordItem:boolean = true;
    private _isShowMoveTextAni:boolean = false;

    public constructor(){
        super();
    }

    protected getContainerY():number
	{
		return 0;
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
        return {requestType:NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO, requestData:{fuid: this.param.data.uid}};
	}

	protected receiveData(data:{ret:boolean, data:any}):void
	{
        if(data && data.ret)
        { 
            if (data.data.cmd == NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO){
                if (!this._isInitView){
                    this.refreshView();
                }
                else{
                    this._showData = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
                }
            }
        } 
	}

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, this.sendBarrageCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, this.refreshBox, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, this.getBarrageListCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, this.getBonusRewardCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, this.refreshView, this);

        let playerId = Api.playerVoApi.getPlayerID();
        if (Number(this.param.data.uid) == playerId){
            this._isOutAuthor = true;
        }
        else{
            this._isOutAuthor = false;
        }

        let roleContainer = this.getRoleContainer(this._showData);
        this.addChildToContainer(roleContainer);

        let topBg = BaseBitmap.create("emperorout_achieveprobg");
        topBg.setPosition(this.titleBg.x + this.titleBg.width/2 - topBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(topBg);

        let numBg = BaseBitmap.create("acwealthcomingview_numbg");
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numBg, topBg, [12,0]);

        //进度条
		let progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 445);	
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressBar, topBg, [numBg.width + 1, 0]);
        this._progressBar = progressBar;
        this.addChildToContainer(progressBar);
        this.addChildToContainer(numBg);

        //当前总人气值
        let scoreTitle = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutViewScoreTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreTitle.setPosition(numBg.x + numBg.width/2 - scoreTitle.width/2, numBg.y + 25);
        this.addChildToContainer(scoreTitle);

        let currScore = Api.emperorAchieveVoApi.getCurrPopularByuid(this.param.data.uid);
        App.LogUtil.log("currscore: "+currScore);
        let scoreNum = ComponentManager.getTextField(""+currScore, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreNum.anchorOffsetX = scoreNum.width/2;
        scoreNum.setPosition(numBg.x + numBg.width/2, scoreTitle.y + scoreTitle.height + 2);
        this.addChildToContainer(scoreNum);
        this._scoreNum = scoreNum;
        
        let achieveData = Config.EmperoroutingCfg.getAchievement1CfgList();
        if (this._isOutAuthor){
            achieveData = Config.EmperoroutingCfg.getAchievement2CfgList();
        }
        let totalScoreNum = achieveData[achieveData.length - 1].needPopularity;
        let currScoreNum = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutViewCurrScore",[""+currScore, ""+totalScoreNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        currScoreNum.anchorOffsetX = currScoreNum.width/2;
        currScoreNum.setPosition(topBg.x + topBg.width/2, topBg.y + topBg.height - currScoreNum.height - 5);
        this.addChildToContainer(currScoreNum);
        this._currScoreNum = currScoreNum;

        let percent = currScore/totalScoreNum;
        progressBar.setPercentage(percent);

        this._progressBM = BaseBitmap.create("acworshipview_slider");
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * percent, this._progressBar.y);
        this.addChildToContainer(this._progressBM);

        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * percent, this._progressBar.y + this._progressBar.height / 2);
        this.addChildToContainer(this._progressLight);
        if (percent == 0){
            this._progressLight.setVisible(false);
        }
        else{
            this._progressLight.setVisible(true);
        }

        this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxBM.anchorOffsetX = this._boxBM.width / 2;
        this._boxBM.anchorOffsetY = this._boxBM.height;
        this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
        this.addChildToContainer(this._boxBM);
        this._boxBM.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTACHIEVEPOPUPVIEW, {uid:this.param.data.uid});
        }, this);

        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
        this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
        this.addChildToContainer(this._boxLightBM);
        this._boxLightBM.visible = false;

        let boxRewardTxt = BaseBitmap.create("emperorout_rewardtxt");
        boxRewardTxt.setPosition( this._boxBM.x - boxRewardTxt.width/2, this._boxBM.y - boxRewardTxt.height + 10);
        this.addChildToContainer(boxRewardTxt);

        //红点	
        this._boxRedDot = BaseBitmap.create("public_dot2");
        this._boxRedDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._boxRedDot.width / 2, this._boxBM.y - this._boxBM.height + this._boxRedDot.height / 2)
        this.addChildToContainer(this._boxRedDot);

        this.initBox();
        this.refreshBox();

        //顶部tip
        let topTipBg:BaseBitmap = BaseBitmap.create("public_ac_notice_bg");
        topTipBg.width = GameConfig.stageWidth;
        topTipBg.setPosition(0, topBg.y + topBg.height - 2);
        this.addChildToContainer(topTipBg);
        this._topTipBg = topTipBg;

        // public_chatnoticeicon 小喇叭
        //请安tip
        let outWishContainer = new BaseDisplayObjectContainer();
        this._outWishContainer = outWishContainer;
        let wishBg = BaseBitmap.create("emperorout_wishtoptipbg");
        outWishContainer.height = wishBg.height;
        wishBg.name = "wishBg";
        outWishContainer.addChild(wishBg);
        let wishTitle = this.getRoleTitlePic();
        
        let empWordId = this._showData.data.emperorBarrage;
        let empWordStr = "emperorOutViewWishTip";
        if (empWordId){
            this._emperorWordId = empWordId;
            empWordStr = "emperorOutViewEmpWord"+this._emperorWordId;
        }
        let wishInfo = ComponentManager.getTextField(LanguageManager.getlocal(empWordStr), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        wishInfo.name = "wishInfo";
        let wishTitleScale = 0.6;
        if (wishTitle){
            wishTitle.setScale(wishTitleScale);
            wishBg.width = wishInfo.width + 40 + 159 * wishTitleScale;
            wishTitle.setPosition(20, wishBg.height/2 - 59*wishTitleScale/2 - 4);
            wishTitle.name = "wishTitle";
            outWishContainer.addChild(wishTitle);
            wishInfo.setPosition(wishTitle.x + 159 * wishTitleScale, wishBg.y + wishBg.height/2 - wishInfo.height/2);
        }
        else{
            wishBg.width = wishInfo.width + 40;
            wishInfo.setPosition(wishBg.x + wishBg.width/2 - wishInfo.width/2, wishBg.y + wishBg.height/2 - wishInfo.height/2);
        }
        outWishContainer.width = wishBg.width;
        outWishContainer.setPosition(GameConfig.stageWidth, topTipBg.y + topTipBg.height + 10);
        outWishContainer.addChild(wishInfo);
        egret.Tween.get(this._outWishContainer, {loop:true}).to({x: -this._outWishContainer.width}, (this._outWishContainer.width + GameConfig.stageWidth)/ (this._barrageSpeed - 0.02)).to({alpha: 0, x: GameConfig.stageWidth}).wait(10000);

        //帝王
        // let roleContainer = this.getRoleContainer(this._showData);
        roleContainer.setPosition(-20, outWishContainer.y + outWishContainer.height + 20);
        // this.addChildToContainer(roleContainer);

        this.addChildToContainer(outWishContainer);

        let bottomBg = BaseBitmap.create("common_buttombigbg");
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);

        //发言背景
        let wordBg = BaseBitmap.create("public_chatinputbg");
        wordBg.width = 400;
        wordBg.height = 50;
        wordBg.setPosition(bottomBg.x + 50, bottomBg.y + 37);
        this.addChildToContainer(wordBg);
        wordBg.addTouchTap(this.wordArrowClick, this);

        this._wordRandList = this.getRandWordList();
        let defaultWordStr = this.formatWordLength(this._wordRandList[0], 370);
        let defaultWord = ComponentManager.getTextField(defaultWordStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_GRAY_LIGHT);
        defaultWord.setPosition(wordBg.x + 5, wordBg.y + wordBg.height/2 - defaultWord.height/2);
        this.addChildToContainer(defaultWord);
        this._defaultWord = defaultWord;

        let wordArrow = BaseBitmap.create("common_arrow_1");
        wordArrow.setPosition(wordBg.x + wordBg.width - wordArrow.width - 6, wordBg.y + wordBg.height/2 - wordArrow.height/2);
        this.addChildToContainer(wordArrow);
        wordArrow.addTouchTap(this.wordArrowClick, this);
        this._wordArrow = wordArrow;

        //发送按钮
        let sendBtnName = "emperorOutViewSendWordBtnName";
        if (this._isOutAuthor){
            sendBtnName = "emperorOutViewSendWordBtnEmpName";
        }
        let sendWordBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, sendBtnName, this.sendWordBtnClick, this);
        sendWordBtn.setPosition(wordBg.x + wordBg.width + 10, wordBg.y);
        this.addChildToContainer(sendWordBtn);
        this._sendWordBtn = sendWordBtn;

        //首次奖励
        let firstRewardCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(firstRewardCon);
        this._firstRewardContainer = firstRewardCon;
        let firstRewardBg = BaseBitmap.create("emperorout_firstrewardbg");
        firstRewardCon.width = firstRewardBg.width;
        firstRewardCon.height = firstRewardBg.height;
        firstRewardCon.setPosition(sendWordBtn.x + sendWordBtn.width/2 - firstRewardBg.width/2, sendWordBtn.y - 35 );
        firstRewardCon.addChild(firstRewardBg);

        let playerLv = Api.playerVoApi.getPlayerLevel();
        if ((!this._isOutAuthor && playerLv < Config.EmperoroutingCfg.lvNeed) || Api.emperorAchieveVoApi.isMaxBarrageNum(this.param.data.uid)){
            sendWordBtn.setGray(true);
        }
        else{
            sendWordBtn.setGray(false);
        }
        if (Api.emperorAchieveVoApi.isFirstSendWordByUid(this.param.data.uid)){
            firstRewardCon.visible = true;
        }
        else{
            App.CommonUtil.removeIconFromBDOC(sendWordBtn);
            firstRewardCon.visible = false;
        }

        if (Api.emperorAchieveVoApi.isShowSendWordRedDot(this.param.data.uid)){
            App.CommonUtil.addIconToBDOC(sendWordBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(sendWordBtn);
        }

        let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
        let timeInfo = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutViewTimeInfo", [this._showData.data.name, ""+timeData.timeStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeInfo.anchorOffsetX = timeInfo.width/2;
        // timeInfo.setPosition(wordBg.x + wordBg.width/2, wordBg.y + wordBg.height + 10);
        timeInfo.setPosition(bottomBg.x + bottomBg.width/2, wordBg.y + wordBg.height + 5);
        this.addChildToContainer(timeInfo);
        this._timeInfo = timeInfo;

        //请安列表 不是自己没有请安列表
        let wishListBtn = ComponentManager.getButton("emperorout_wishlistbtn", "", this.wishListBtnClick, this);
        wishListBtn.setPosition(bottomBg.x + bottomBg.width - wishListBtn.width - 10, bottomBg.y - wishListBtn.height - 5);
        this.addChildToContainer(wishListBtn);
        if (this._isOutAuthor){
            wishListBtn.visible = true;
        }
        else{
            wishListBtn.visible = false;
        }

        //帝王名字
        let nameBg = BaseBitmap.create("servant_attributemap");
        nameBg.setPosition(bottomBg.x + bottomBg.width/2 - nameBg.width/2, bottomBg.y - nameBg.height - 10);
        this.addChildToContainer(nameBg);
        let name = ComponentManager.getTextField(this._showData.data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
        this.addChildToContainer(name);

        let title = this.getRoleTitlePic();
        if (title){
            title.setPosition(nameBg.x + nameBg.width/2 - 155/2, nameBg.y - 59);
            this.addChildToContainer(title);
        }

        //请安奖励
        // this.showRewardView();
        //回宫提示
        // this.showGoHomeView();
        //弹幕
        this.showBarrageView();
        //发言列表
        let wordListContainer = this.getWordListContainer();
        wordListContainer.setPosition(wordBg.x , wordBg.y - wordListContainer.height - 5);
        this.addChildToContainer(wordListContainer);
        this._wordListContainer = wordListContainer;
        wordListContainer.visible = false;

        this._isInitView = false;
        //是否显示被赏赐页面
        if (Api.emperorAchieveVoApi.isCanGetBonusReward(this.param.data.uid)){
            if (!this._isShowRewardView){
                this.showRewardView();
            }
            this._isShowRewardView = true;
        }

        //每十秒掉一次接口
        egret.Tween.get(this._scoreNum, {loop:true}).wait(15000).call(()=>{
            let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
            if (!this._isShowGoHomeView && timeData.time != 0){
                this.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO, {fuid: this.param.data.uid});
            }
        })

        this.ShowMoveTextAni();
    }

    private refreshView():void{
        let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
        if (timeData.time == 0 || this._isShowGoHomeView){
            return;
        }
        let currScore = Api.emperorAchieveVoApi.getCurrPopularByuid(this.param.data.uid);
        this._scoreNum.text = ""+currScore;
        this._scoreNum.anchorOffsetX = this._scoreNum.width/2;
        let achieveData = Config.EmperoroutingCfg.getAchievement1CfgList();
        if (this._isOutAuthor){
            achieveData = Config.EmperoroutingCfg.getAchievement2CfgList();
        }
        let totalScoreNum = achieveData[achieveData.length - 1].needPopularity;
        this._currScoreNum.text = LanguageManager.getlocal("emperorOutViewCurrScore",[""+currScore, ""+totalScoreNum]);
        this._currScoreNum.anchorOffsetX = this._currScoreNum.width/2;
        let percent = currScore / totalScoreNum;
        this._progressBar.setPercentage(percent)
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * percent, this._progressBar.y);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * percent, this._progressBar.y + this._progressBar.height / 2);

        this.refreshBox();
        this._maxBarrageNum = Api.emperorAchieveVoApi.getMaxBarrageNumByUid(this.param.data.uid);

        //帝王的发言
        if (!this._isOutAuthor){
            let data = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
            let wordId = data.data.emperorBarrage;
            if (wordId && wordId != this._emperorWordId){
                this._emperorWordId = wordId;
                this.freshAuthroWishTip();
            }
        }

        //刷新弹幕
        let maxBarrageNum = Api.emperorAchieveVoApi.getMaxBarrageNumByUid(this.param.data.uid);
        if (this._maxBarrageNum < maxBarrageNum){
            this._oldMaxBarrageNum = this._maxBarrageNum;
            this._maxBarrageNum = maxBarrageNum;
            this.addNewBarrage();
        }

        //是否显示被赏赐页面
        App.LogUtil.log("showreward view "+Api.emperorAchieveVoApi.isCanGetBonusReward(this.param.data.uid));
        if (Api.emperorAchieveVoApi.isCanGetBonusReward(this.param.data.uid)){
            if (!this._isShowRewardView){
                this.showRewardView();
            }
            this._isShowRewardView = true;
        }

        this.ShowMoveTextAni();
    }

    //初始化宝箱
    private initBox():void{
        let data = this.cfg.getAchievement1CfgList();
        let maxNeed = data[data.length - 1].needPopularity;
        this._boxList = [];
        for (let i = 0; i < data.length; i++){
            let box = BaseBitmap.create("acworshipview_box2");
            box.anchorOffsetX = box.width/2;
            box.anchorOffsetY = box.height/2;
            box.setPosition(this._progressBar.x + this._progressBar.width * (data[i].needPopularity / maxNeed), this._progressBar.y + this._progressBar.height/2 - 5);
            this.addChildToContainer(box);
            this._boxList[i] = box;
            box.addTouchTap(this.boxClick, this, [data[i].id]);
        }
    }

    //刷新宝箱
    private refreshBox():void{
        let currScore = Api.emperorAchieveVoApi.getCurrPopularByuid(this.param.data.uid);
        let achieveData = Config.EmperoroutingCfg.getAchievement1CfgList();
        if (this._isOutAuthor){
            achieveData = Config.EmperoroutingCfg.getAchievement2CfgList();
        }
        for (let i = 0; i < achieveData.length; i++){
            if (Api.emperorAchieveVoApi.isGetPopularReward(this.param.data.uid, achieveData[i].id)){
                this._boxList[i].setRes("acworshipview_box3");
            }
            else if (currScore >= achieveData[i].needPopularity){
                this._boxList[i].setRes("acworshipview_box1");
            }
            else{
                this._boxList[i].setRes("acworshipview_box2");
            }
        }
        let playerId = Api.playerVoApi.getPlayerID();
        if (Api.emperorAchieveVoApi.isHavePopularRewardByuid(this.param.data.uid, this._isOutAuthor) && !Api.emperorAchieveVoApi.isFirstSendWordByUid(this.param.data.uid)){
            this._boxRedDot.visible = true;
        }
        else{
            this._boxRedDot.visible = false;
        }
    }

    //点击宝箱
    private boxClick(target:any, index:string):void{
        App.LogUtil.log("boxClick: "+index);
        ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTACHIEVEPOPUPVIEW, {id: index, uid: this.param.data.uid});
    }

    //发言列表按钮
    private wordArrowClick():void{
        if (!this._isCanShowWordItem){
            return;
        }
        this._isShowWordList = !this._isShowWordList;
        let arrBgStr = "common_arrow_1";
        if (this._isShowWordList){
            arrBgStr = "common_arrow_2";
        }
        this._wordArrow.setRes(arrBgStr);
        this._wordListContainer.visible = this._isShowWordList;
        if (this._isShowWordList){
            this._sendWordBtn.setEnable(false);
        }
        else{
            if (this._btnCdTime > 0){
                let time = Config.EmperoroutingCfg.cdTime - (GameData.serverTime - this._btnCdTime);
                if (time > 0){
                    // this._sendWordBtn.setEnable(false);
                    return ;
                }
            }
            this._sendWordBtn.setEnable(true);
            let playerLv = Api.playerVoApi.getPlayerLevel();
            if (!this._isOutAuthor && playerLv < Config.EmperoroutingCfg.lvNeed){
                this._sendWordBtn.setGray(true);
            }
            if (Api.emperorAchieveVoApi.isMaxBarrageNum(this.param.data.uid)){
                this._sendWordBtn.setGray(true);
            }   
        }
    }

    //发送
    private sendWordBtnClick():void{
        let playerLv = Api.playerVoApi.getPlayerLevel();
        if (!this._isOutAuthor && playerLv < Config.EmperoroutingCfg.lvNeed){
            let playerLvTxt = LanguageManager.getlocal("officialTitle"+Config.EmperoroutingCfg.lvNeed);
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutViewSendLimit", [playerLvTxt]));
            return;
        }
        if (this._btnCdTime > 0 ){
            let time = Config.EmperoroutingCfg.cdTime - (GameData.serverTime - this._btnCdTime);
            if (time > 0){
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutViewBtncdTip", [""+time]));
                return ;
            }
        }
        if (Api.emperorAchieveVoApi.isMaxBarrageNum(this.param.data.uid)){
            this._sendWordBtn.setBtnCdSecond(0);
            this._sendWordBtn.setGray(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutViewSendMaxNum"));
            return;
        }
        this._isCanShowWordItem = false;
        this._btnCdTime = GameData.serverTime;
        this._sendWordBtn.setBtnCdSecond(Config.EmperoroutingCfg.cdTime);
        this._sendWordBtn.setBtnCdCallback(5, ()=>{
            App.LogUtil.log("setBtnCdCallback");
            egret.Tween.get(this._sendWordBtn).wait(950).call(()=>{
                this._isCanShowWordItem = true;
            });
        }, this);
        
        let data = Api.emperorAchieveVoApi.getRandBarragePool();
        let wordId = data[this._sendWordId];
        if (Api.emperorAchieveVoApi.isInOuting(this._showData.st)){
            NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, {fuid: this.param.data.uid, barrageId:wordId})
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutListEnd"));
        }
        
    }

    private sendBarrageCallback(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            let rData = evt.data.data.data;
            if (rData.rewards){
                let rewardVo = GameData.formatRewardItem(rData.rewards);
                App.CommonUtil.playRewardFlyAction(rewardVo);
                if (Api.emperorAchieveVoApi.isFirstSendWordByUid(this.param.data.uid)){
                    this._firstRewardContainer.visible = true;
                }
                else{
                    this._firstRewardContainer.visible = false;
                }
                if (Api.emperorAchieveVoApi.isShowSendWordRedDot(this.param.data.uid)){
                    App.CommonUtil.addIconToBDOC(this._sendWordBtn);
                }
                else{
                    App.CommonUtil.removeIconFromBDOC(this._sendWordBtn);
                }
            }
            let sucTipStr = "emperorOutViewSendSuccessTip2";
            if (!this._isOutAuthor){
                this._isSendNormalWord = true;
                sucTipStr = "emperorOutViewSendSuccessTip1";
            }
            else{
                let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
                if (timeData.time != 0 && !this._isShowGoHomeView && this.param && this.param.data){ 
                    let empData = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
                    let empWordId = empData.data.emperorBarrage;
                    if (empWordId){
                        this._emperorWordId = empWordId;
                    }
                    this.freshAuthroWishTip();
                }
            }
            if (Api.emperorAchieveVoApi.isMaxBarrageNum(this.param.data.uid)){
                this._sendWordBtn.setBtnCdSecond(0);
                this._sendWordBtn.setGray(true);
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(sucTipStr));
            this.refreshView();
        }
    }

    //刷新帝王的发言
    private freshAuthroWishTip():void{
        egret.Tween.removeTweens(this._outWishContainer);
        let wishBg = <BaseBitmap>this._outWishContainer.getChildByName("wishBg");
        let wishInfo = <BaseTextField>this._outWishContainer.getChildByName("wishInfo");
        let wishTitle = <BaseDisplayObjectContainer>this._outWishContainer.getChildByName("wishTitle");
        egret.Tween.removeTweens(this._outWishContainer);
        this._outWishContainer.x = GameConfig.stageWidth;
        // wishInfo.text = this._wordRandList[this._sendWordId];
        wishInfo.text = LanguageManager.getlocal("emperorOutViewEmpWord"+this._emperorWordId);
        if (wishTitle){
            wishBg.width = wishInfo.width + 40 + 159 * 0.6;
        }
        else{
            wishBg.width = wishInfo.width + 40;
            wishInfo.x = wishBg.x + wishBg.width/2 - wishInfo.width/2;
        }
        this._outWishContainer.width = wishBg.width;
        egret.Tween.get(this._outWishContainer, {loop:true}).to({x: -this._outWishContainer.width}, (this._outWishContainer.width + GameConfig.stageWidth)/ (this._barrageSpeed - 0.02)).to({alpha: 0, x: GameConfig.stageWidth}).wait(10000);
    }

    //请安列表
    private wishListBtnClick():void{
        NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, {fuid: this.param.data.uid});
        // ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTWISHPOPUPVIEW);
    }

    //请安列表
    private getBarrageListCallback(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            let rData = evt.data.data.data;
            let dataList = rData.barrageList;
            let _data:any = [];
            for (let key in dataList){
                if (dataList[key]){
                    _data.push(dataList[key]);
                }
            }
            if (_data.length > 0){
                ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTWISHPOPUPVIEW, {data: _data, uid: this.param.data.uid});
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutWishListNotHave"));
            }
        }
    }

    //发言列表
    private getWordListContainer():BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        container.width = 400;
        for (let i = 0; i < this._wordRandList.length; i++){
            let wordBg = BaseBitmap.create("public_chatinputbg");
            wordBg.width = 400;
            wordBg.height = 50;
            container.addChild(wordBg);
            wordBg.y = (wordBg.height) * i;
            let txt = ComponentManager.getTextField(this._wordRandList[i], TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            txt.setPosition(wordBg.x + 4, wordBg.y + wordBg.height/2 - txt.height/2);
            container.addChild(txt);
            if (txt.width > wordBg.width){
                wordBg.width = txt.width + 10;
            }
            wordBg.addTouchTap(this.wordItemClick, this, [i]);
            container.height = (wordBg.height) * (i+1);
        }
        return container;
    }

    //发言item
    private wordItemClick(target:any, index:number):void{
        this._defaultWord.text = this.formatWordLength(this._wordRandList[index], 370);
        this._sendWordId = index;
        this.wordArrowClick();
    }

    private formatWordLength(str:string, maxW:number):string{
        if (!str){
            return "";
        }
        let btf = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        if (btf.width > maxW){
            let count = str.length;
            while (btf.width > maxW){
                count -=1;
                btf.text = str.substr(0, count);
            }
            return str.substr(0, count);
        }
        return str;
    }

    //随机发言列表
    private getRandWordList():string[]{
        let wordList:string[] = [];
        let arr:number[] = Api.emperorAchieveVoApi.getRandBarragePool();
        // let randNum = App.MathUtil.getRandom(1, 11);
        // while (arr.length < 3){
        //     if (GameData.isInArray(randNum, arr)){
        //         randNum = App.MathUtil.getRandom(1, 11);
        //     }
        //     else{
        //         arr.push(randNum);
        //     }
        // }
        arr.sort((a, b)=>{return a - b});
        let wordStr = "emperorOutViewWord";
        if (this._isOutAuthor){
            wordStr = "emperorOutViewEmpWord";
        }
        for (let i = 0; i < arr.length; i++){
            let str = LanguageManager.getlocal(wordStr+arr[i]);
            wordList.push(str);
        }
        return wordList;
    }

    public tick():void{
        let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
        this._timeInfo.text = LanguageManager.getlocal("emperorOutViewTimeInfo", [this._showData.data.name, ""+timeData.timeStr]);
        this._timeInfo.anchorOffsetX = this._timeInfo.width/2;
        // this._timeInfo.x = this._firstRewardContainer.x - this._timeInfo.width - 50;
        if (timeData.time == 0 && !this._isShowGoHomeView){
            egret.Tween.removeTweens(this._scoreNum);
            this._isShowGoHomeView = true;
            this.showGoHomeView();
        }
    }

    /**弹幕相关 ************************/
    private showBarrageView():void{
        let container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth;
        container.height = 500;
        this.addChildToContainer(container);
        this._barrageContainer = container;
        container.setPosition(0, this._progressBar.y + 155);
        this._maxBarrageNum = Api.emperorAchieveVoApi.getMaxBarrageNumByUid(this.param.data.uid);
        // this._maxBarrageNum = 1;
        this._oldMaxBarrageNum = this._maxBarrageNum;
        this.getRandomPos(true);
        for (let i = 0;i < 10; i++){
            this._wordsPool.push("emperorOutViewWord"+(i+1));
        }
        for (let i = 0; i < this._maxBarrageNum; i++){
            this._timeOutFun[i] = egret.setTimeout(()=>{
                this._barrageList[i] = this.playBarrageAni(i);
            }, this, 300*i);
        }
    }

    private addNewBarrage():void{
        let oldNum = this._oldMaxBarrageNum;
        for (let i = oldNum; i < this._maxBarrageNum; i++){
            this.getRandomPos(false, i);
            this._timeOutFun[i] = egret.setTimeout(()=>{
                this._barrageList[i] = this.playBarrageAni(i);
            }, this, 300*(i-oldNum));
        }
        this._oldMaxBarrageNum = this._maxBarrageNum;
    }

    //弹幕移动
    private playBarrageAni(index:number):BaseDisplayObjectContainer{
        App.LogUtil.log("playBarrageAni: "+index);
        let str = this.getBarrageWord();
        let wordContainer = this.createBarrageContainer(str);
        wordContainer.x = GameConfig.stageWidth;
        wordContainer.y = this._barragePos[index] * this._barrageHeight;
        this._barrageContainer.addChild(wordContainer);
        // let speed = this.getRandomSpeed();
        // let time = (GameConfig.stageWidth + wordContainer.width)/ speed;
        // let moveToX = -wordContainer.width;
        // egret.Tween.get(wordContainer,{loop:true}).call(()=>{wordContainer.visible = true;}).to({x: moveToX}, time).call(()=>{
        //     wordContainer.visible = false;
        //     this.freshBarrageContainer(wordContainer, index);
        //     speed = this.getRandomSpeed();
        //     time = (GameConfig.stageWidth + wordContainer.width)/ speed;
        //     moveToX = -wordContainer.width;
        //     App.LogUtil.log("movex: "+wordContainer.width+" speed:"+speed + " time"+time);
        // }).wait(60);
        this.freshBarrageContainer(wordContainer, index);
        return wordContainer;
    }

    //重置弹幕
    private freshBarrageContainer(obj:BaseDisplayObjectContainer ,index:number):void{
        let bg = <BaseBitmap>obj.getChildByName("bg");
        let word = <BaseTextField>obj.getChildByName("word");
        obj.x = GameConfig.stageWidth;
        if (this._isSendNormalWord){
            word.text = this._wordRandList[this._sendWordId];
            word.setColor(TextFieldConst.COLOR_RED_ORANGE);
            this._isSendNormalWord = false;
        }
        else{
            word.text = this.getBarrageWord();
            word.setColor(TextFieldConst.COLOR_WHITE);
        }
        obj.width = word.width;
        bg.width = word.width + 25;
        bg.setPosition(word.x + word.width/2 - bg.width/2, word.y + word.height/2 - bg.height/2);
        let offY = this.getRandomPos(false, index);
        obj.y = offY * this._barrageHeight;
        let speed = this.getRandomSpeed();
        let time = (GameConfig.stageWidth + obj.width)/ speed;
        let moveToX = -obj.width;
        egret.Tween.get(obj).to({x: moveToX}, time).wait(100).call(()=>{this.freshBarrageContainer(obj, index)});
    }

    //创建弹幕文字
    private createBarrageContainer(str:string):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        container.height = this._barrageHeight;
        let bg = BaseBitmap.create("palace_rewardbg");
        container.addChild(bg);
        let word = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        bg.width = word.width + 25;
        container.addChild(word);
        bg.setPosition(word.x + word.width/2 - bg.width/2, word.y + word.height/2 - bg.height/2);
        bg.name = "bg";
        word.name = "word";
        container.width = word.width;
        return container;
    }

    //获取弹幕随机位置
    private getRandomPos(isAll:boolean, index?:number):number{
        let maxNum = 22;
        if (isAll){
            this._barragePos = [];
            let arr:number[] = [];
            let randNum = App.MathUtil.getRandom(0, maxNum);
            while (arr.length < this._maxBarrageNum){
                if (!GameData.isInArray(randNum, arr)){
                    arr.push(randNum);
                }
                else{
                    randNum = App.MathUtil.getRandom(0, maxNum);
                }
            }
            this._barragePos = arr;
        }
        let randNum = App.MathUtil.getRandom(0, maxNum);
        while (GameData.isInArray(randNum, this._barragePos)){
            randNum = App.MathUtil.getRandom(0, maxNum);
        }
        if (this._barragePos[index] == null){
            this._barragePos.push(randNum);
        }
        else{
            this._barragePos[index] = randNum;
        }
        return randNum;  
    }

    //随机弹幕速度
    private getRandomSpeed():number{
        let randNum = App.MathUtil.getRandom(1, 6);
        return this._barrageSpeed + (randNum/100);
    }

    //获取弹幕的文字
    private getBarrageWord():string{
        if (this._barrageNum >= this._wordsPool.length){
            this._barrageNum = 0;
        }
        let word = LanguageManager.getlocal(this._wordsPool[this._barrageNum]);
        this._barrageNum += 1;
        return word;
    }
    /**弹幕 end********************************************* */

    //奖励弹窗
    private showRewardView():void{
        let rewardContainer = new BaseDisplayObjectContainer();
        rewardContainer.width = GameConfig.stageWidth;
        rewardContainer.height = GameConfig.stageHeigth;
        this.addChild(rewardContainer);

        let mask = BaseBitmap.create("public_9_viewmask");
        mask.width = rewardContainer.width;
        mask.height = rewardContainer.height;
        rewardContainer.addChild(mask);
        mask.addTouchTap(()=>{
            // rewardContainer.dispose();
        }, this);
        
        let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.width = rewardContainer.width;
        bottomBg.height = 300;
        rewardContainer.addChild(bottomBg);
        bottomBg.x = 0;
        bottomBg.y = rewardContainer.height/2 - bottomBg.height/2;

        let title = BaseBitmap.create("emperorout_rewardtitle");
        title.setPosition(bottomBg.x + bottomBg.width/2 - title.width/2, bottomBg.y - title.height/2);
        rewardContainer.addChild(title);

        let data = this._showData.data;
        let titleData = App.CommonUtil.getTitleData(data.title);
        let titleCfg = Config.TitleCfg;
        let titleconfig = null;
        if (titleData.clothes){
            titleconfig = titleCfg.getTitleCfgById(titleData.clothes);
        }
        let curTitleId = null;
		if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
            curTitleId = titleData.clothes;
        }
        let role = null;
        App.LogUtil.log("showGoHomeView: "+curTitleId);
        if (curTitleId){
            role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic);
            role.y = bottomBg.y - 80;
            let isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
            if (isnew){
                role.x = -200;
            }
            else{
                role.x = -20;
            }	
        }
        else{
            role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic);
            role.y = bottomBg.y - 80;
            role.x = 10;
        }
        rewardContainer.addChild(role);
        let roleRect = new egret.Rectangle(0, 0, role.width, bottomBg.height + 74);
        role.mask = roleRect;

        //帝王名字
        let nameBg = BaseBitmap.create("servant_attributemap");
        nameBg.setPosition(bottomBg.x + 30, bottomBg.y + bottomBg.height - nameBg.height - 15);
        rewardContainer.addChild(nameBg);
        let name = ComponentManager.getTextField(this._showData.data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
        rewardContainer.addChild(name);

        let titleBm = this.getRoleTitlePic();
        if (titleBm){
            titleBm.setPosition(nameBg.x + nameBg.width/2 - 155/2, nameBg.y - 59);
            rewardContainer.addChild(titleBm);
        }

        let tipContainer = this.createBubbleTip(LanguageManager.getlocal("emperorOutViewRewardInfo"), false);
        tipContainer.setPosition(bottomBg.x + bottomBg.width/2 - 20, bottomBg.y + 50);
        rewardContainer.addChild(tipContainer);

        let rewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutViewRewardBtnName", ()=>{
            let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
            if (timeData.time == 0){
                this._isShowRewardView = false;
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutListEnd"));
                rewardContainer.dispose();
                return ;
            }
            NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, {fuid: this.param.data.uid});
        }, this);
        rewardBtn.setPosition(bottomBg.x + bottomBg.width - rewardBtn.width - 100, bottomBg.y + bottomBg.height - rewardBtn.height - 15);
        rewardContainer.addChild(rewardBtn);
        rewardContainer.name = "bonusRewardContainer";
    }

    private getBonusRewardCallback(evt:egret.Event){
        this._isShowRewardView = false;
        if (evt && evt.data && evt.data.ret){
            let rData = evt.data.data.data;
            let rewardVo = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
        }
        let bonusRewardCon = <BaseDisplayObjectContainer>this.getChildByName("bonusRewardContainer");
        bonusRewardCon.dispose();
    }

    //回宫弹窗
    private showGoHomeView():void{
        let bonusRewardCon = <BaseDisplayObjectContainer>this.getChildByName("bonusRewardContainer");
        if (bonusRewardCon){
            this._isShowRewardView = false;
            bonusRewardCon.dispose();
        }
        let rewardContainer = new BaseDisplayObjectContainer();
        rewardContainer.width = GameConfig.stageWidth;
        rewardContainer.height = GameConfig.stageHeigth;
        this.addChild(rewardContainer);

        let mask = BaseBitmap.create("public_9_viewmask");
        mask.width = rewardContainer.width;
        mask.height = rewardContainer.height;
        rewardContainer.addChild(mask);
        mask.addTouchTap(()=>{
            // rewardContainer.dispose();
        }, this);
        
        let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.width = rewardContainer.width;
        bottomBg.height = 300;
        rewardContainer.addChild(bottomBg);
        bottomBg.x = 0;
        bottomBg.y = rewardContainer.height/2 - bottomBg.height/2;

        let title = BaseBitmap.create("emperorout_gohome");
        title.setPosition(bottomBg.x + bottomBg.width/2 - title.width/2, bottomBg.y - title.height/2);
        rewardContainer.addChild(title);

        let role = BaseBitmap.create("empshopman");
        role.setPosition(0, bottomBg.y - 53);
        rewardContainer.addChild(role);
        let roleRect = new egret.Rectangle(0, 0, role.width, bottomBg.height + 50);
        role.mask = roleRect;
        
        let tipStr = LanguageManager.getlocal("emperorOutViewGohomeInfo");
        if (!this._isOutAuthor){
            tipStr = LanguageManager.getlocal("emperorOutViewGohomeEmpInfo", [this._showData.data.name]);
        }
        let tipContainer = this.createBubbleTip(tipStr, false);
        tipContainer.setPosition(bottomBg.x + bottomBg.width/2 - 10, bottomBg.y + 50);
        rewardContainer.addChild(tipContainer);

        let enterBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "confirmBtn", ()=>{
            this._isShowGoHomeView = false;
            if (this._isOutAuthor){
                ViewController.getInstance().openView(ViewConst.COMMON.PALACENEWVIEW);
            }
            this.hide();
        }, this);
        enterBtn.setPosition(bottomBg.x + bottomBg.width - enterBtn.width - 100, bottomBg.y + bottomBg.height - enterBtn.height - 15);
        rewardContainer.addChild(enterBtn);
    }

    //创建气泡提示
    public createBubbleTip(str:string, isSpecialTip:boolean):BaseDisplayObjectContainer{
        let tipContainer = new BaseDisplayObjectContainer();
        let tipBg = BaseBitmap.create("public_9_bg42");
        tipBg.name = "tipBg";
        
        let tipTail = BaseBitmap.create("public_9_bg42_tail");
        tipContainer.addChild(tipTail);
        tipTail.name = "tipTail";
        tipContainer.addChild(tipBg);

        let tipDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tipDesc.width = 300;
        tipDesc.lineSpacing = 6;
        tipBg.height = tipDesc.height + 30;
        tipBg.width = tipDesc.width + 10;
        if (isSpecialTip){
            tipTail.scaleX = -1;
            tipTail.setPosition(tipBg.x + tipBg.width - tipTail.width + 15, tipBg.y + tipBg.height);
        }
        else{
            tipTail.setPosition(tipBg.x + 30, tipBg.y + tipBg.height - 3);
        }
        tipDesc.setPosition(tipBg.x + 15, tipBg.y + tipBg.height/2 - tipDesc.height/2 + 2);
        tipContainer.addChild(tipDesc);
        tipDesc.name = "tipDesc";
        tipContainer.height = tipBg.height + tipTail.height + 20;
        tipContainer.width = tipBg.width;
        return tipContainer;
    }

    public getRoleContainer(roleData:any, isNotBone?:boolean):BaseDisplayObjectContainer{
        let data = roleData.data;
        let titleData = App.CommonUtil.getTitleData(data.title);
        let curLv = titleData.clv;
        let titleCfg = Config.TitleCfg;
        let titleconfig = null;
        let curTitleId = null;
        if (titleData.clothes){
            titleconfig = titleCfg.getTitleCfgById(titleData.clothes);
            curTitleId = titleData.clothes;
        }
        
        let curLevel = 1;
        let isSpecial = false;
		if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
            curTitleId = titleData.clothes;
            isSpecial = true;
            curLevel = titleData.clv;
			if(curLevel == 0){
				curLevel = 1;
			}
        }

        let userContainer:BaseDisplayObjectContainer = null;
        App.LogUtil.log("getRoleContainer: "+curTitleId + " title:"+titleData.title);
		if(curTitleId){
			userContainer = new BaseDisplayObjectContainer();
			// let isnew = Api.playerVoApi.getNewPalaceRole(curLv) || Config.TitleCfg.isTheKingTitleId(curTitleId);
			// userContainer.x = posX;
			// userContainer.y = 20;
			userContainer.name = "userContainer";
			this.addChildToContainer(userContainer);
			
			let role = null;
			let myHair = null;
			let tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
			let resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
			if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
                App.LogUtil.log("aaa dragonbone ");
                role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel);
				role.x = 340; //w432, h508
				role.y = 35;
                role.name = `role`;
				userContainer.addChild(role);
				// myHead.setPosition(273,0);
				// myHair.setPosition(296.5,0);

			}else{
				role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic,0,false,null,null,curLevel);
                role.y = -30;
                let isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
                if (isnew){
                    role.x = 0;
                }
                else{
                    role.x = 155;
                }
				userContainer.addChild(role);
			}
		}else{
			userContainer = new BaseDisplayObjectContainer();
			let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic);
            role.y = -30;
            role.x = 190;
			userContainer.name = "userContainer";
			userContainer.addChild(role);
		}

        return userContainer;
    }

    private getRoleTitlePic():BaseDisplayObjectContainer{
        let titleData = App.CommonUtil.getTitleData(this._showData.data.title);
        let curLv = titleData.tlv;
        let titleId = titleData.title;
        // if (Config.TitleCfg.getIsTitleOnly(titleData.title))
        // {
        //     titleId = 0;
        // }
        // else{
        //     titleId = titleData.title;
        // }
        // if (titleData.clothes != ""){
        //     titleId = titleData.clothes;
        //     curLv = titleData.tlv;
        // }
        
        if (titleId){
            return App.CommonUtil.getTitlePic(titleId, curLv);
        }
        return null;
    }

    //奖励tiP
    private ShowMoveTextAni():void{
        if (this._isShowMoveTextAni){
            return;
        }
        let timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._showData.st);
        if (timeData.time == 0 || this._isShowGoHomeView){
            return ;
        }
        let arr = Api.emperorAchieveVoApi.getBonusTextDataByUid(this.param.data.uid);
        if (arr && arr.length != this._moveTextArr.length){
            if (this._moveTextCount == 0 || this._moveTextArr.length == this._moveTextCount){
                this._moveTextArr = arr;
                this._moveTextCount = 0;
                this._isShowMoveTextAni = true;
                this.showMoveText();
            }
        }
    }

    private showMoveText():void{
        let speed = 0.05;
        if (this._moveTextCount == this._moveTextArr.length){
            this._isShowMoveTextAni = false;
            this.ShowMoveTextAni();
            return;
        }
        let str = LanguageManager.getlocal("emperorOutViewRewardTip", [this._moveTextArr[this._moveTextCount].name, this._showData.data.name]);
        let con = this.getMoveTextContainer(str);
        con.x = GameConfig.stageWidth;
        con.y = this._topTipBg.y;
        this.addChildToContainer(con);
        this._moveTextCount += 1;
        let time1 = (con.width + 50)/speed;
        let time2 = (GameConfig.stageWidth - 50)/speed;
        egret.Tween.get(con).to({x: GameConfig.stageWidth - con.width - 50}, time1).call(()=>{
            this.showMoveText(); 
        }).to({x: - con.width}, time2).call(()=>{
            con.dispose();
        })
    }

    private getMoveTextContainer(str:string):BaseDisplayObjectContainer{
        let conta = new BaseDisplayObjectContainer();
        let icon = BaseBitmap.create("public_chatnoticeicon");
        icon.setScale(0.5);
        conta.addChild(icon);
        let text = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        text.setPosition(icon.x + icon.width * icon.scaleX + 5, icon.y + icon.height * icon.scaleY /2 - text.height/2);
        conta.addChild(text);
        conta.width = icon.width + text.width + 5;
        conta.height = icon.height > text.height ? icon.height* icon.scaleY : text.height;
        return conta;
    }

    private get cfg(){
        return Config.EmperoroutingCfg;
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "emperorout_titlebg";
    }

    protected getBgName():string{
        return "emperorout_bg_night";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "emperorOutViewRuleInfo";
    }

    protected getRuleInfoParam():string[]{
        let outTime = Api.emperorAchieveVoApi.localOutTime();
        let time = Config.EmperoroutingCfg.lastTime / 3600;
        return [""+outTime.st, ""+outTime.et, ""+time];
    }

    public getResourceList():string[]{
        return super.getResourceList().concat([
            "emperorout_titlebg", "emperorout_bg_night", "emperorout_achieveprobg", "emperorout_wishtoptipbg", "emperorout_wishlistbtn", "emperorout_wishlistbtn_down", "progress12_bg", "progress12", "acworshipview_slider", "acwealthcomingview_progresslight", "acwealthcomingview_numbg",
            "acworshipview_box1", "acworshipview_box2", "acworshipview_box3", "acwealthcomingview_box_1", "acwealthcomingview_box_2", "acwealthcomingview_box_light", "emperorout_rewardtxt", "common_buttombigbg", "emperorout_firstrewardbg", "servant_attributemap",
            "common_arrow_1", "common_arrow_2", "emperorout_rewardtitle", "emperorout_gohome", "palace_rewardbg", "empshopman", "public_chatnoticeicon"
        ]);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, this.sendBarrageCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, this.refreshBox, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, this.getBarrageListCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, this.getBonusRewardCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, this.refreshView, this);
        for (let i = 0; i < this._timeOutFun.length; i++){
            egret.clearTimeout(this._timeOutFun[i]);
        }
        egret.Tween.removeTweens(this._scoreNum);
        this._timeOutFun = [];
        this._progressBar = null;
        this._progressBM = null;
        this._progressLight = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._boxRedDot = null;
        this._boxList = [];
        this._scoreNum = null;
        this._currScoreNum = null;
        this._wordArrow = null;
        this._isShowWordList = false;
        this._barragePos = [];
        this._maxBarrageNum = 0;
        this._barrageSpeed = 0.05;
        this._barrageList = [];
        this._wordsPool = [];
        this._barrageContainer = null;
        this._barrageNum = 0;
        this._barrageHeight = 25;
        this._wordListContainer = null;
        this._defaultWord = null;
        this._wordRandList = [];
        this._showData = null;
        this._timeInfo = null;
        this._isShowGoHomeView = false;
        this._sendWordBtn = null;
        this._sendWordId = 0;
        this._isSendNormalWord = false;
        this._isOutAuthor = false;
        this._outWishContainer = null;
        this._oldMaxBarrageNum = 0;
        this._isInitView = true;
        this._isShowRewardView = false;
        this._topTipBg = null;
        this._moveTextCount = 0;
        this._moveTextArr = [];
        this._isCanShowWordItem = true;
        this._isShowMoveTextAni = false;
        this._btnCdTime = 0;

        super.dispose();
    }
}