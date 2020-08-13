/**
 * author yanyuling
 */
class AcFlipCardView extends AcCommonView
{
   
    constructor() {
        super();
    }

    private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;

    private _progress:ProgressBar;
	private _livenessIcon:BaseBitmap;
	private _curLivenessTxt:BaseTextField;
	private _maxLivenessValue:number=0;
	private _curRewardBoxId:string;

    private _cardList:FlipCardItem[] = [];
    private _boxList:BaseBitmap[] = [];
    public _selIdx:number = 1;
    private _priceTXT1:BaseTextField = null;
    private _priceTXT2:BaseTextField = null;
    private _taskBtn:BaseButton;
    private _isPlaying:boolean = false;
    private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _skinImg:BaseLoadBitmap=undefined;
    protected get acVo():AcFlipCardVo
	{
		return <AcFlipCardVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}

    public initView()
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FLIPCARD_REWARD_END,this.resetCards,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH,this.refreshTaskRed,this);
        this._selIdx = this.acVo.getCurSelectCardIdx();
        this.viewBg.y = 40;
        let flipcard_txt = BaseBitmap.create("flipcard_txt");
        flipcard_txt.x = GameConfig.stageWidth/2 - flipcard_txt.width/2;
        flipcard_txt.y = 0;
        this.addChild(flipcard_txt);

        let flipcard_bg06 = BaseBitmap.create("flipcard_bg06");
        flipcard_bg06.width = GameConfig.stageWidth;//-10;
        flipcard_bg06.height = 180;
        flipcard_bg06.x = GameConfig.stageWidth/2 - flipcard_bg06.width/2;
        flipcard_bg06.y = 70;
        this.addChildToContainer(flipcard_bg06);

        // 任务
        let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        iconBg.x = GameConfig.stageWidth - iconBg.width - 15;
        iconBg.y = flipcard_bg06.y+flipcard_bg06.height - 5;
        iconBg.addTouchTap(this.taskBtnHandler,this);
        this.addChildToContainer(iconBg);

        let taskButton:BaseButton = ComponentManager.getButton("flipcard"+"_taskIcon_"+this.code,"",this.taskBtnHandler,this);
        taskButton.width = taskButton.height = 80;
        taskButton.x =iconBg.x + iconBg.width/2 - taskButton.width/2;
        taskButton.y = iconBg.y + iconBg.height/2 - taskButton.height/2;
        this.addChildToContainer(taskButton);
        this._taskBtn = taskButton;

		let taskButtonTxt:BaseBitmap=BaseBitmap.create("acchristmasview_1_taskname");
		taskButtonTxt.x = taskButton.x + taskButton.width/2 - taskButtonTxt.width/2+3;
		taskButtonTxt.y = taskButton.y + 50 ;
		this.addChildToContainer(taskButtonTxt);

        let infoBtn = ComponentManager.getButton("acmidautumnview_infobtn","",this.infoBtnClick,this);
        infoBtn.setPosition(taskButton.x - taskButton.width - 10,taskButton.y );
        this.addChild(infoBtn);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = flipcard_bg06.x +15
		this._activityTimerText.y = flipcard_bg06.y + 20;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);

		let deltaY = 5;
		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("",20, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFlipCard_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//规则
		this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),20,);
		this._ruleText.x = this._activityTimerText.x;
		this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 3;
        this._ruleText.width = flipcard_bg06.width - this._activityTimerText.x*2;
		this._ruleText.text = LanguageManager.getlocal("acFlipCard_Rule"+this.code);
		this.addChildToContainer(this._ruleText);

        let searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt1.text  = LanguageManager.getlocal("acFlipCard_txt2",["10"]);
		searchtxt1.y = GameConfig.stageHeigth - this.container.y - 140;
        if(GameConfig.stageHeigth <= 960){
            searchtxt1.y = GameConfig.stageHeigth - this.container.y - 115;
        }
		// searchtxt1.visible = false;
		this.addChildToContainer(searchtxt1);

		let searchBtn1 = ComponentManager.getButton("flipcard_button2","acFlipCard_txt3",this.searchHandler,this,[1]);
		searchBtn1.x = 50;
		searchBtn1.y = searchtxt1.y + 25;
		searchtxt1.x = searchBtn1.x + searchBtn1.width/2 - searchtxt1.width/2;
		searchBtn1.name = "searchBtn1";
		this.addChildToContainer(searchBtn1);

		let searchtxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt2.text  = LanguageManager.getlocal("acFlipCard_txt2",["20"]);
		searchtxt2.x = 430;
		searchtxt2.y = searchtxt1.y;
		this.addChildToContainer(searchtxt2);

		let searchBtn2 = ComponentManager.getButton("flipcard_button2","acFlipCard_txt4",this.searchHandler,this,[10]);
		searchBtn2.x = GameConfig.stageWidth -searchBtn2.width - searchBtn1.x ;
		searchBtn2.y = searchBtn1.y;
		searchtxt2.x = searchBtn2.x + searchBtn2.width/2 - searchtxt2.width/2;
		this.addChildToContainer(searchBtn2);
		searchBtn2.name = "searchBtn2";

        searchBtn1.setColor(TextFieldConst.COLOR_BROWN);
        searchBtn2.setColor(TextFieldConst.COLOR_BROWN);
        this._priceTXT1 = searchtxt1;
        this._priceTXT2 = searchtxt2;

        let wifeId = this.acVo.config.getWifeID();
        let wcfg = Config.WifeCfg.getWifeCfgById(wifeId);
        
        let posy = searchtxt1.y - 100;
        this.showDBDragon(posy);

        let flipcard_bg02 = BaseBitmap.create("flipcard_bg02");
        flipcard_bg02.x = GameConfig.stageWidth/2 - flipcard_bg02.width/2;
        flipcard_bg02.y = searchtxt1.y - 120;
        this.addChildToContainer(flipcard_bg02);

        this._progress = ComponentManager.getProgressBar("flipcard_progress","flipcard_progressbg",480);
		this._progress.x = GameConfig.stageWidth/2 - this._progress.width/2;
		this._progress.y = flipcard_bg02.y + flipcard_bg02.height/2 -  this._progress.height/2;
		this._progress.setPercentage(0);
		this.addChildToContainer(this._progress);

        let flipcard_bg05 =  BaseBitmap.create("flipcard_bg05");
		flipcard_bg05.x = this._progress.x - flipcard_bg05.width/2;
		flipcard_bg05.y = this._progress.y + this._progress.height/2 - flipcard_bg05.height/2;
        this.addChildToContainer(flipcard_bg05);

        let flipcard_bg04 =  BaseBitmap.create("flipcard_bg04");
		flipcard_bg04.x = flipcard_bg05.x + flipcard_bg05.width/2 - flipcard_bg04.width/2;
		flipcard_bg04.y = flipcard_bg05.y + flipcard_bg05.height - flipcard_bg04.height;
        this.addChildToContainer(flipcard_bg04);

        this._curLivenessTxt =  ComponentManager.getTextField("123",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curLivenessTxt.text = ""+this.acVo.lotterynum;
        this._curLivenessTxt.anchorOffsetX = this._curLivenessTxt.width/2;
        this._curLivenessTxt.x = flipcard_bg05.x + flipcard_bg05.width/2 ;
        this._curLivenessTxt.y = flipcard_bg05.y + flipcard_bg05.height/2  - this._curLivenessTxt.height/2- 5;
        this.addChildToContainer(this._curLivenessTxt);

        let staticTxt =  ComponentManager.getTextField(LanguageManager.getlocal("acFlipCard_txt5") ,16,TextFieldConst.COLOR_LIGHT_YELLOW);
		staticTxt.x = flipcard_bg04.x + flipcard_bg04.width/2 - staticTxt.width/2;
        staticTxt.y = flipcard_bg04.y + flipcard_bg04.height/2 - staticTxt.height/2;
		this.addChildToContainer(staticTxt);

		//初始化宝箱
		let rewardList = this.acVo.config.ReviewNum;
		let rkeys = Object.keys(rewardList);
		let perWidth = 430/rkeys.length;

		//进度是0
		let perX = this._progress.x;
        let len = rkeys.length;
        let deltaX = this._progress.width / len;
		for (var index = 0; index < len; index++) {

			let tmprcfg = rewardList[String(index+1)];
			// let perX = startX + tmprcfg.needLiveness/this._maxLivenessValue *450;
            let imgpre = "flipcard_box1";
            // if(len-1 == index){
            //     imgpre = "acrechargeboxview_box1";
            // }
			let rStatus = 0;// this.getBoxStatusById(rkeys[index]);
			let boxImg = BaseBitmap.create(imgpre);
			boxImg.anchorOffsetX = boxImg.width/2;
			boxImg.anchorOffsetY = boxImg.height/2;
			boxImg.name = "boxImg"+index;
            boxImg.x = perX+ deltaX * (index+1);
			boxImg.y = this._progress.y;
            this.addChildToContainer(boxImg);
			boxImg.addTouchTap(this.boxHandler,this,[index]);
            this._boxList.push(boxImg);
		}
        // this.refreshBoxImg();

        let flipcard_bg03 =  BaseBitmap.create("flipcard_bg03");
        flipcard_bg03.x = GameConfig.stageWidth - flipcard_bg03.width - 40;
        flipcard_bg03.y = flipcard_bg02.y  - flipcard_bg03.height - 25;
        this.addChildToContainer(flipcard_bg03);

        let refreshBtn = ComponentManager.getButton("flipcard_button1","",this.refreshHandler,this,[10]);
		refreshBtn.x = flipcard_bg03.x + flipcard_bg03.width -refreshBtn.width +5;
		refreshBtn.y = flipcard_bg03.y + flipcard_bg03.height/2 - refreshBtn.height/2+5;
		this.addChildToContainer(refreshBtn);
        // let cfg = <Config.AcCfg.FlipCardCfg>this.acVo.config;
        let flipcard_bg03txt =  ComponentManager.getTextField("" ,TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        flipcard_bg03txt.text = LanguageManager.getlocal("acFlipCard_txt1",[String(this.acVo.config.refrestPrice)]);
        flipcard_bg03txt.x = flipcard_bg03.x + flipcard_bg03.width/2 - flipcard_bg03txt.width/2;
        flipcard_bg03txt.y = flipcard_bg03.y + flipcard_bg03.height/2 - flipcard_bg03txt.height/2;
        this.addChildToContainer(flipcard_bg03txt);

        let startX = 335;
        let startY = flipcard_bg03.y - 260;
        for (let index2 = 0; index2 < 6; index2++) {
            let cardImg = new FlipCardItem();
            let ctype = this.acVo.getCardType(index2+1);
            cardImg.resetData(index2,ctype ,this.acVo.config.getCardAddVaule(ctype),this.acVo.getCardReward(index2+1) ,this.code);
            if(index2 == 3){
                startX = 335;
                startY += 155;
            }
            cardImg.x = startX;
            cardImg.y = startY;
            startX +=  117;
            this.addChildToContainer(cardImg);
            this._cardList.push(cardImg);
            cardImg.setselectedStatus(index2+1 == this._selIdx);
            cardImg.addTouchTap(this.switchSeleCard,this,[index2]); 
        }

        this.refreshUI();
        this.refreshTaskRed();
        this.randomSay();
    }   

    private showDBDragon(posY:number)
    {
        let wifeId = this.acVo.config.getWifeID();
        let wcfg = Config.WifeCfg.getWifeCfgById(wifeId);
        let boneName = wcfg.bone + "_ske";
        let dagonBonesName =wcfg.bone;// "servant_full2_"+ servantId ;

        if(  !Api.switchVoApi.checkCloseBone() && boneName && Api.wifeVoApi.isHaveBone(boneName) && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            if(this._skinImg){
                this._skinImg.visible = false;
            }
            if(this._droWifeIcon){
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true; 
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.x = 170;
            this._droWifeIcon.y =posY+40;
            this.addChildToContainer(this._droWifeIcon);
        }else{
			if(!this._skinImg){
                let tarScale = 0.6;
				let skinW =640*tarScale;
				let skinH = 840*tarScale;
				
				this._skinImg = BaseLoadBitmap.create(wcfg.body);
				this._skinImg.width = skinW;
				this._skinImg.height = skinH;
                this._skinImg.x = -40;
                this._skinImg.y = posY - this._skinImg.height ;
				this.addChildToContainer(this._skinImg);
			}
		}
	}

    private refreshUI()
    {
        let cfg = <Config.AcCfg.FlipCardCfg>this.acVo.config;
        this._curLivenessTxt.text = "" + this.acVo.lotterynum;
        this._curLivenessTxt.anchorOffsetX = this._curLivenessTxt.width/2;
        this._priceTXT1.text = LanguageManager.getlocal("acFlipCard_txt2",[""+ this.acVo.getFlipPrice() ]); 
        this._priceTXT2.text = LanguageManager.getlocal("acFlipCard_txt2",[""+ this.acVo.getBatchFlipPrice() ]); 
        this._progress.setPercentage(this.acVo.lotterynum / cfg.valueMax );
        this.changeCardSelected();
        this.refreshBoxImg();
    }

    private infoBtnClick()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNACINFOPOPUPVIEW,{"code":this.code,"aid":this.aid});
	}
    //刷新宝箱状态
    public refreshBoxImg()
    {
        let lotterynum = this.acVo.lotterynum ;
        let cfg = <Config.AcCfg.FlipCardCfg>this.acVo.config;
        let ReviewNum = cfg.ReviewNum;
        let len = this._boxList.length
        
        for (var index = 1; index <= len; index++) {
            let stage = this.acVo.getStageinfo(index);
            let boxImg = this._boxList[index-1];
            egret.Tween.removeTweens(boxImg);
            let imgpre = "flipcard_box";
            // if(len == index){
            //     imgpre = "acrechargeboxview_box";
            // }
            if(stage == 1){
                boxImg.texture = ResourceManager.getRes(imgpre+3)
            }else{
                if(ReviewNum[index-1].needNum > lotterynum)
                {
                    boxImg.texture = ResourceManager.getRes(imgpre+1)
                }else{
                    boxImg.texture = ResourceManager.getRes(imgpre+2);
                    egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
                }
            }
        }
    }

    private changeCardSelected()
    {
         for (var index = 0; index < this._cardList.length; index++) {
            var element = this._cardList[index];
            element.setselectedStatus(index+1 == this._selIdx);
        }
    }

    private switchSeleCard(param:any,param2:any)
    {
        if(this._isPlaying){
            return;
        }
        // if(this.acVo.isCardFliped(param2+1)){
        //     return;
        // }
        this._selIdx = param2 +1;
        this.changeCardSelected();
    }

    public boxHandler(param:any,param2:any)
    {
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        let cfg = <Config.AcCfg.FlipCardCfg>this.acVo.config;
        let ReviewNum = cfg.ReviewNum[param2];
        if(  this.acVo.getStageinfo(param2+1) == 0 && this.acVo.lotterynum >= ReviewNum.needNum){
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD,this.boxHandlerNetBack,this);
		    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD,{activeId:this.acVo.aidAndCode,gid:param2+1})
        }else{
            ViewController.getInstance().openView("AcFlipCardBoxRewardPopupView",{rewardstr:ReviewNum.getReward,need:ReviewNum.needNum});
        }
    }

    private boxHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD,this.boxHandlerNetBack,this);
		if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;
            let cfrewards = rdata.cfrewards;
            // let rList = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rList);
            if(cfrewards.indexOf("8_") > 0){ //奖励门客
                Api.servantVoApi.checkServantChangeRewards(cfrewards,rewards);
            }else{
                Api.wifeVoApi.checkWifeChangeRewards(cfrewards,rewards);
            }
            this.refreshBoxImg();
		}
	}

    private taskBtnHandler()
    {
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView("AcFlipCardTaskPopupView",{aid:this.aid,code:this.code});
    }
    
    private refreshHandler()
	{
        if(this._isPlaying){
            return;
        }
		if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if( this.acVo.getFlipNums() == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip4'));
            return;
		}
		if( Api.playerVoApi.getPlayerGem() < this.acVo.config.refrestPrice)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip1'));
            return;
		}
        
        let gem = Api.playerVoApi.getPlayerGem();
        let needGem = this.acVo.config.refrestPrice;
        let message:string = LanguageManager.getlocal("acFlipCardBoxReward_refreshbox_tip",[needGem]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{
            useNum:needGem,
            confirmCallback:this.dorefreshReq,
            handler:this,icon:"itemicon1",
            iconBg: "itembg_1",
            num:gem,
            msg:message,
            id : 1
        });
	}

    private dorefreshReq()
    {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE,this.refreshClickhandler,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE,{activeId:this.acVo.aidAndCode,})
    }

    private resetCards()
    {
        this._isPlaying = false;
        if(!this.acVo.isCardReset()){
            return;
        }
        this._selIdx = this.acVo.getCurSelectCardIdx();
        for (var index = 0; index < this._cardList.length; index++) {
            var element = this._cardList[index];
            let ctype = this.acVo.getCardType(index+1);
            element.resetData(index,ctype ,this.acVo.config.getCardAddVaule(ctype),this.acVo.getCardReward(index+1),this.code);
            // element.showFlipAni();//翻牌动画
        }
    }
	private refreshClickhandler(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE,this.searchHandlerNetBack,this);
		 if (event.data.data.ret === 0) {
             //动画+刷新
            this.resetCards();
            this.refreshUI();
		}
	}

    private searchHandler(param:any)
	{
        if(this._isPlaying == true){
            return;
        }
		if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
       

        if (!this.acVo.isFlipEnable())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip2'));
            return;
        }
		// if(this.acVo["chipnum"] >= this.acVo.config.RansackItemNum)
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
		// 	// App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitor_nettip4'));
        //     return;
		// }
		// if(this.acVo["attacknum"] < param){
		// 	let rewardStr = LanguageManager.getlocal("acRansackTraitor_nettip6",[this.acVo["attacknum"]]);
		// 	ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
		// 		title:"itemUseConstPopupViewTitle",
		// 		msg:rewardStr,
		// 		callback:this.rechargeClick,
		// 		handler:this,
		// 		needCancel:true
		// 	});
		// 	return;
		// }
        if(param == 1){
            if(this.acVo.isCardFliped(this._selIdx)){
                App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_nettip3'));
                return;
            }
            if( Api.playerVoApi.getPlayerGem() < this.acVo.getFlipPrice())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_Notenoughdes'));
                return;
            }
            this._isPlaying = true;
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD,this.searchHandlerNetBack,this);
		    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD,{activeId:this.acVo.aidAndCode,tid:this._selIdx})
        }else if(param == 10){
             if( Api.playerVoApi.getPlayerGem() < this.acVo.getBatchFlipPrice())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acFlipCard_Notenoughdes'));
                return;
            }
            this._isPlaying = true;
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD,this.searchHandlerNetBack,this);
		    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD,{activeId:this.acVo.aidAndCode,tid:param})
        }
	}

	private searchHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD,this.searchHandlerNetBack,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD,this.searchHandlerNetBack,this);
		 if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;
            let rewardarr = rdata.rewardarr;
            let cfrewards = rdata.cfrewards;
            // let rList = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rList);
            if (event.data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD){
                let keys = Object.keys(rewardarr);
                let len = keys.length;
                // keys.sort();
                let deltaT = 0;
                // for (var index = 0; index < keys.length; index++) {
                //     var key = keys[index];
                //     if (rewardarr.hasOwnProperty(key)) {
                //         let isShow = index+1 == len ? true : false;
                //         if(this.acVo.getCardType(Number(key)) == 1){
                //             deltaT += 800 ;
                //         }else{
                //             deltaT += 300;
                //         }
                //        this._cardList[Number(key)-1].showFlipAni(rewardarr[key],isShow,rewards,cfrewards,deltaT);//翻牌动画
                       
                //     }
                // }
                let idx = 0;
                for (var index = 0; index < this._cardList.length; index++) {
                    let card = this._cardList[index];
                    let tmpkey = ""+(index+1);
                    let tmpreward = rewardarr[ tmpkey];
                    if(tmpreward){
                        let isShow = idx+1 == len ? true : false;
                        if(this.acVo.getCardType(index+1) == 1){
                            deltaT += 800 ;
                        }else{
                            deltaT += 300;
                        }
                        this._cardList[index].showFlipAni(tmpreward,isShow,rewards,cfrewards,deltaT);//翻牌动画
                        idx ++;
                    }
                }
            }else{
                 this._cardList[this._selIdx-1].showFlipAni(rewards,true,rewards,cfrewards);//翻牌动画   
            }
            
            // this._selIdx ++ ;
            // if(this._selIdx == 7 || !this.acVo.isFlipEnable()){
            //     this._selIdx = 1;
            // }

            this._selIdx = this.acVo.getCurSelectCardIdx();
            this.refreshUI();
  
            //动画+刷新
		}
	}

    private randomSay() {
        let cfg = <Config.AcCfg.FlipCardCfg>this.acVo.config;
        let ReviewNum = cfg.ReviewNum;
        if (this.acVo.lotterynum < cfg.valueMax) {
            // 随机一个人说话
            let rndSayBg:BaseBitmap=BaseBitmap.create("public_9_qipao");
            let rndSayTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acFlipCardBoxReward_talk_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rndSayBg.width=rndSayTxt.width + 40;
            rndSayBg.height=56;
            rndSayBg.x = this._progress.x + this._progress.width - rndSayBg.width + 40;
            rndSayBg.y = this._progress.y - rndSayBg.height - 10;
            // rndSayBg.scaleY = -1;
            this.addChildToContainer(rndSayBg);
            rndSayTxt.x = rndSayBg.x + rndSayBg.scaleX * rndSayBg.width/2 - rndSayTxt.width/2;
            rndSayTxt.y = rndSayBg.y +rndSayBg.height / 2 - rndSayTxt.height / 2-8;
            this.addChildToContainer(rndSayTxt);

            let rndSayHead:BaseBitmap=BaseBitmap.create("flipcard_talk_head_"+this.code); 
            // rndSayHead.setScale(0.5);
            rndSayHead.x = rndSayBg.x - rndSayHead.width + 28;
            rndSayHead.y = rndSayBg.y +rndSayBg.height/2 - rndSayHead.height/2 - 3;
            this.addChildToContainer(rndSayHead);

            egret.Tween.get(rndSayBg)
                .wait(4000)
                .call(()=>{
                    rndSayBg.visible = false;
                    rndSayTxt.visible = false;
                    rndSayHead.visible = false;
                })
                .wait(6000)            
                .call(()=>{
                    this.randomSay();
                    rndSayBg.parent.removeChild(rndSayBg);
                    rndSayTxt.parent.removeChild(rndSayTxt);
                    rndSayHead.parent.removeChild(rndSayHead);
                });
        }
    }

   public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime;
		let cdStrK = "acFlipCard_acCD";
		if(this.code == "4"){
			cdStrK = "acFlipCard_acCD2";
		}
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFlipCard_acCDEnd")]);
		}
	
		return false;
	}

    private refreshTaskRed()
    {
        if(this.acVo.isShowTaskRed())
        {
            App.CommonUtil.addIconToBDOC(this._taskBtn );
        }else{
            App.CommonUtil.removeIconFromBDOC(this._taskBtn );
        }
    }
    protected getTitleStr()
    {
        return "";
    }
    protected getBgName():string
	{
		return  "flipcard_bg01";
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return  "flipcard_titlebg";
	}
	
	// // 关闭按钮图标名称
	// protected getCloseBtnName():string
	// {
	// 	return this.getClassName().toLowerCase() + "closebtn";
	// }

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"flipcard_bg01","flipcard_bg02","flipcard_bg03", "flipcard_bg04","flipcard_bg05","flipcard_bg06",
            "flipcard_butterfly", "flipcard_button1","flipcard_button2", "flipcard_card", "flipcard_progress",
            "flipcard_progressbg",
            "flipcard_titlebg","flipcard_txt", "flipcard_ani","flipcard_box1","flipcard_box2","flipcard_box3","flipcard_select","flipcard_ani",
            "flipcard_select2_1", "flipcard_select2","flipcard_select3_1","flipcard_select3","flipcard_addmask",
            "flipcard_card"+this.code+"_1",
            "flipcard_card"+this.code+"_2",
            "flipcard_card"+this.code+"_3",
            "flipcard_select1_1",
            "flipcard_select1",
            "acchristmasview_1_taskname",
            "flipcard_taskIcon_"+this.code,"acrechargeboxview_box1","acrechargeboxview_box2","acrechargeboxview_box3",
            "flipcard_talk_head_"+this.code,
            "acmidautumnview_infobtn","ldcardparticle","ldcardparticle_json","flipcard_bg07",
            
		]);
	}

	public dispose(): void {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH,this.refreshTaskRed,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FLIPCARD_REWARD_END,this.resetCards,this);

        this._activityTimerText = null;
        this._acCDTxt= null;
        this._ruleText = null;
        this._progress= null;
        this._livenessIcon= null;
        this._curLivenessTxt= null;
        this._maxLivenessValue=0;
        this._curRewardBoxId = "";
        this._cardList = [];
        this._boxList = [];
        this._selIdx = 1;
        this._priceTXT1 = null;
        this._priceTXT2 = null;
        this._isPlaying = false;
        this._taskBtn = null;
         if(this._droWifeIcon){
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
        this._skinImg = null;

		super.dispose();
	}
}

class FlipCardItem extends BaseDisplayObjectContainer
{
    public constructor() 
	{
		super();
		this.init();
	}
    private _boxImg:BaseBitmap = null;
    private _boxIdx:number = 0;
    private _ctype:number = 0;
    private _cardCode:string = "";
    private _selBoxImg:BaseBitmap = undefined;
    private _rewardIcon:BaseDisplayObjectContainer = undefined;
    private _rewardTxt:BaseTextField = undefined;
    private _rewardTxtbg:BaseBitmap = undefined;
    flipcard_bg07
	/**
	 * 填内容
	 */
	protected init():void
	{
        this._boxImg = BaseBitmap.create("flipcard_card");
        this._boxImg.width = 114;
        this._boxImg.height = 151;
        this._boxImg.anchorOffsetX = this._boxImg.width/2;
        this._boxImg.anchorOffsetY = this._boxImg.height/2;
        this.addChild(this._boxImg);

        this._selBoxImg = BaseBitmap.create("flipcard_select");
        this._selBoxImg.width = 136;
        this._selBoxImg.height = 175;
        this._selBoxImg.anchorOffsetX = this._selBoxImg.width/2;
        this._selBoxImg.anchorOffsetY = this._selBoxImg.height/2;
        this.addChild(this._selBoxImg);
        
        this._rewardTxtbg= BaseBitmap.create("flipcard_bg07");
        this._rewardTxtbg.x  = - this._rewardTxtbg.width/2;
        this._rewardTxtbg.y  =   this._selBoxImg.height/2 - this._rewardTxtbg.height-13;
        this.addChild(this._rewardTxtbg);

        this._rewardTxt = ComponentManager.getTextField("0" ,18 ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardTxtbg.visible = this._rewardTxt.visible = false;
        this._rewardTxt.y = this._rewardTxtbg.y + this._rewardTxtbg.height/2 - this._rewardTxt.height/2;
        this._rewardTxt.x = this._rewardTxtbg.x + this._rewardTxtbg.width/2 - this._rewardTxt.width/2;
        this.addChild(this._rewardTxt);

    }

    public showFlipAni(rewards?:string,isShowReward?:boolean,showRewards?:string,cfrewards?:string,deltaT?:number)
    {
        if(deltaT){
            egret.Tween.get(this).wait(deltaT).call(()=>{
                this.cardMovie(rewards,isShowReward,showRewards,cfrewards);
            },this);
        }else{
            this.cardMovie(rewards,isShowReward,showRewards,cfrewards);
        }

    }

    public makeRwardIcon(rewards:string)
    {
        let icon = GameData.getRewardItemIcons(rewards,true)[0];
        icon.setScale(0.4);
        icon.anchorOffsetX = icon.width/2;
        icon.anchorOffsetY = icon.height/2*icon.scaleX;
        icon.y = 18;
        icon.x = 30;
        this.addChild(icon);
        icon.visible = false;
        this._rewardIcon  = icon;

    }
    public setselectedStatus(isSel:boolean)
    {
        this._selBoxImg.visible = isSel;
    }
    public resetData(idx:number,ctype:number,addvalue:number,rewards:string,cardCode:string)
    {
        this._cardCode = cardCode || "1";
        this._boxIdx = idx;
        this._ctype = ctype;
        this._rewardTxtbg.visible = this._rewardTxt.visible = false;
        this._rewardTxt.text = LanguageManager.getlocal("acFlipCard_txt6",[""+addvalue]);
        this._rewardTxt.anchorOffsetX = this._rewardTxt.width/2;
        if(rewards){
            this.makeRwardIcon(rewards);
            this._rewardIcon.alpha = 1.0;
            this._rewardIcon.visible =  this._rewardTxtbg.visible = this._rewardTxt.visible = true;
            this._boxImg.texture = ResourceManager.getRes("flipcard_card" + this._cardCode + "_"+this._ctype);
        }else{
            this._boxImg.texture = ResourceManager.getRes("flipcard_card");
            if(this._rewardIcon){
                this.removeChild(this._rewardIcon);
                this._rewardIcon = null;
            }
        }

        let circleeffect2 =  this.getChildByName("circleeffect2");
        if(circleeffect2){
            egret.Tween.removeTweens(circleeffect2);
            this.removeChild(circleeffect2);
            circleeffect2 = null;
        }
        let circleeffect1 =  this.getChildByName("circleeffect1");
        if(circleeffect1){
            egret.Tween.removeTweens(circleeffect1);
            this.removeChild(circleeffect1);
            circleeffect1 = null;
        }

    }

        /** 
     * 卡牌翻牌动画 card 1红 2绿  special 高级卡牌特效
    */
    private cardMovie( rewards : string,isShowReward?:boolean,showRewards?:string,cfrewards?:string):void{
        let view = this;
        let btnGroup = this;
        this.makeRwardIcon(rewards);
        let special = false;
        if(this._ctype == 1 || this._ctype == 2){
            special = true;
        }
        // 
        SoundManager.playEffect("effect_doubleseven3_clickbtn");
        // special = false;
        if(this._ctype == 1){
            //光刺
            // card =
            let cardCircle = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            cardCircle.blendMode = egret.BlendMode.ADD;
            cardCircle.anchorOffsetX = cardCircle.width / 2;
            cardCircle.anchorOffsetY = cardCircle.height / 2;
            cardCircle.setScale(0.45);
            // cardCircle.x = 60;
            // cardCircle.y = 90;
            btnGroup.addChildAt(cardCircle, 0);

            egret.Tween.get(cardCircle).to({scaleX : 0.93, scaleY : 0.93}, 330).wait(1330).call(()=>{
                egret.Tween.removeTweens(cardCircle);
                btnGroup.removeChild(cardCircle);
                cardCircle = null;
            },view);

            egret.Tween.get(cardCircle).to({rotation : 90}, 1660);
            //聚集
            for(let i = 0; i < 4; ++ i){
                let cardlight = BaseBitmap.create("flipcard_select"+btnGroup._ctype );
                cardlight.blendMode = egret.BlendMode.ADD;
                cardlight.anchorOffsetX = cardlight.width / 2;
                cardlight.anchorOffsetY = cardlight.height / 2;
                cardlight.alpha = 0;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight, this);
                btnGroup.addChild(cardlight);
                cardlight.setScale(1.45);

                egret.Tween.get(cardlight).wait(i * 260).to({scaleX : 1, scaleY : 1, alpha : 1}, 400).to({alpha : 0}, 260).call(()=>{
                    egret.Tween.removeTweens(cardlight);
                    btnGroup.removeChild(cardlight);
                    cardlight = null;
                },view);
            }
            let tmpX = btnGroup.x;
            let tmpY = btnGroup.y;
            egret.Tween.get(btnGroup).wait(200)
            .set({x : tmpX - 0.1, y : tmpY + 1.3}).wait(60)
            .set({x : tmpX + 1.6, y : tmpY - 1.3}).wait(60)
            .set({x : tmpX - 2.9, y : tmpY - 0.6}).wait(60)
            .set({x : tmpX, y : tmpY - 0.8}).wait(60)
            .set({x : tmpX + 1.2, y : tmpY - 3.9}).wait(60)
            .set({x : tmpX - 3.1, y : tmpY - 1.1}).wait(60)
            .set({x : tmpX - 1.8, y : tmpY + 1}).wait(60)
            .set({x : tmpX + 0.7, y : tmpY - 1.5}).wait(60)
            .set({x : tmpX - 3.5, y : tmpY - 4.2}).wait(60)
            .set({x : tmpX - 3.3, y : tmpY - 1.3}).wait(60)
            .set({x : tmpX + 1.9, y : tmpY - 2.8}).wait(60)
            .set({x : tmpX - 3, y : tmpY + 0.8}).wait(60)
            .set({x : tmpX - 1.5, y : tmpY + 1}).wait(60)
            .set({x : tmpX + 1.2, y : tmpY - 0.3}).wait(60)
            .set({x : tmpX - 2.3, y : tmpY}).wait(60)
            .set({x : tmpX, y : tmpY}).wait(60)
            .to({scaleX : 0.05, scaleY : 2.5}, 200).wait(100).
            call(()=>{
                btnGroup.scaleX = -0.1;
                // btn.setRes(`luckydrawcard${2}-${1}`);
                let cardres = "flipcard_card" + this._cardCode + "_"+this._ctype
                btnGroup._boxImg.texture = ResourceManager.getRes(cardres);
                btnGroup._rewardIcon.alpha = 1;
                btnGroup._rewardIcon.visible =  btnGroup._rewardTxtbg.visible =  btnGroup._rewardTxt.visible = true;
            },view).
            to({scaleX : 0.85, scaleY : 0.85}, 130).
            to({scaleX : 1.15, scaleY : 1.15}, 70).
            to({scaleX : 1, scaleY : 1}, 260).wait( 840)
            .call(()=>{
                view.endMovie( rewards,isShowReward,showRewards,cfrewards);
            },view);

            egret.Tween.get(btnGroup).wait(1160).wait(200).to({alpha : 0},10).to({alpha : 1},10);

            //卡牌高亮透明度动画
            let highlight = BaseBitmap.create(`flipcard_addmask`);
            highlight.anchorOffsetX = highlight.width / 2;
            highlight.anchorOffsetY = highlight.height / 2;
            highlight.blendMode = egret.BlendMode.ADD;
            highlight.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, this);
            btnGroup.addChild(highlight);
            egret.Tween.get(highlight).wait(1160).wait(330).set({alpha : 1}).wait(130).to({alpha : 0},330).call(()=>{
                egret.Tween.removeTweens(highlight);
                btnGroup.removeChild(highlight);
                highlight = null;
            }, view);

            //卡牌光晕透明度动画
            let cardbg = BaseBitmap.create("flipcard_select"+btnGroup._ctype ); //flipcard_addmask
            cardbg.anchorOffsetX = cardbg.width / 2;
            cardbg.anchorOffsetY = cardbg.height / 2;
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = `cardbg`;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, this);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(1160).wait(330).set({alpha : 1});
            //爆点光刺
            let boomeffect = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            boomeffect.blendMode = egret.BlendMode.ADD;
            boomeffect.anchorOffsetX = boomeffect.width / 2;
            boomeffect.anchorOffsetY = boomeffect.height / 2;
            boomeffect.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeffect, this);
            btnGroup.addChild(boomeffect);
            boomeffect.setScale(1.6);
            egret.Tween.get(boomeffect).wait(1160).wait(330).set({alpha : 1}).to({scaleX : 0, scaleY : 0}, 130).call(()=>{
                egret.Tween.removeTweens(boomeffect);
                btnGroup.removeChild(boomeffect);
                boomeffect = null;
            },view);
            //翻牌时扩散动画
            let cardlight1 = BaseBitmap.create("flipcard_select"+btnGroup._ctype );
            cardlight1.blendMode = egret.BlendMode.ADD;
            cardlight1.anchorOffsetX = cardlight1.width / 2;
            cardlight1.anchorOffsetY = cardlight1.height / 2;
            cardlight1.alpha = 0;
            cardlight1.name ="cardlight1";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight1, this);
            btnGroup.addChild(cardlight1);
            cardlight1.setScale(1.08);

            egret.Tween.get(cardlight1).wait(1160).wait(330).to({scaleX : 1.8, scaleY : 1.8}, 200);

            egret.Tween.get(cardlight1).wait(1160).wait(330).set({alpha : 0.8}).to({alpha : 0}, 250).call(()=>{
                egret.Tween.removeTweens(cardlight1);
                btnGroup.removeChild(cardlight1);
                cardlight1 = null;
            },view);

            let cardlight2 = BaseBitmap.create("flipcard_select"+btnGroup._ctype );
            cardlight2.blendMode = egret.BlendMode.ADD;
            cardlight2.anchorOffsetX = cardlight2.width / 2;
            cardlight2.anchorOffsetY = cardlight2.height / 2;
            cardlight2.alpha = 0;
            cardlight2.name ="cardlight2";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight2, this);
            btnGroup.addChild(cardlight2);
            cardlight2.setScale(0.85);

            egret.Tween.get(cardlight2).wait(1160).wait(330).to({scaleX : 1.8, scaleY : 1.8}, 330);

            egret.Tween.get(cardlight2).wait(1160).wait(330).set({alpha : 1}).to({alpha : 0}, 400).call(()=>{
                egret.Tween.removeTweens(cardlight2);
                btnGroup.removeChild(cardlight2);
                cardlight2 = null;
            },view);

            //卡牌后面旋转光刺
            let circleeffect = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            circleeffect.blendMode = egret.BlendMode.ADD;
            circleeffect.anchorOffsetX = circleeffect.width / 2;
            circleeffect.anchorOffsetY = circleeffect.height / 2;
            circleeffect.alpha = 0;
            circleeffect.name = `circleeffect1`;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect, this);
            btnGroup.addChildAt(circleeffect,0);
            circleeffect.setScale(1);
            egret.Tween.get(circleeffect).wait(1160).wait(330).set({alpha : 1}).to({rotation : 360}, 18000).call(()=>{
                egret.Tween.removeTweens(circleeffect);
                btnGroup.removeChild(circleeffect);
                circleeffect = null;
            },view);

            let circleeffect2 = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            circleeffect2.blendMode = egret.BlendMode.ADD;
            circleeffect2.anchorOffsetX = circleeffect2.width / 2;
            circleeffect2.anchorOffsetY = circleeffect2.height / 2;
            circleeffect2.alpha = 0;
            circleeffect2.name = `circleeffect2`;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect2, this);
            btnGroup.addChildAt(circleeffect2,0);
            circleeffect2.setScale(0.85);
            egret.Tween.get(circleeffect2).wait(1160).wait(330).set({alpha : 1}).to({rotation : -360}, 18000).call(()=>{
                egret.Tween.removeTweens(circleeffect2);
                btnGroup.removeChild(circleeffect2);
                circleeffect2 = null;
            },view);

            //扫光
            let scanEffect = ComponentManager.getCustomMovieClip("flipcard_ani", 8, 60);
            scanEffect.width = 124;
            scanEffect.height = 163;
            scanEffect.anchorOffsetX = scanEffect.width / 2;
            scanEffect.anchorOffsetY = scanEffect.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scanEffect, this);
            scanEffect.alpha = 0;
            btnGroup.addChild(scanEffect);
            egret.Tween.get(scanEffect).wait(1160).wait(1000).set({alpha : 1}).call(()=>{
                scanEffect.playWithTime(1);
            },view).wait(550).call(()=>{
                egret.Tween.removeTweens(scanEffect);
                btnGroup.removeChild(scanEffect);
                scanEffect = null;
            },this);
            //粒子效果
            let lizi = App.ParticleUtil.getParticle("ldcardparticle");
            lizi.anchorOffsetX = lizi.width / 2;
            lizi.anchorOffsetY = lizi.height / 2;
            btnGroup.addChild(lizi);
            egret.Tween.get(lizi).wait(1160).wait(330).call(()=>{
                lizi.start();
            },view).wait(300).call(()=>{
                egret.Tween.removeTweens(lizi);
                lizi.stop();
                btnGroup.removeChild(lizi);
                lizi = null;
            },view);
            
        }else if(this._ctype == 2){
            //光刺
            // card =
            let cardCircle = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            cardCircle.blendMode = egret.BlendMode.ADD;
            cardCircle.anchorOffsetX = cardCircle.width / 2;
            cardCircle.anchorOffsetY = cardCircle.height / 2;
            cardCircle.setScale(0.45);
            // cardCircle.x = 60;
            // cardCircle.y = 90;
            btnGroup.addChildAt(cardCircle, 0);

            egret.Tween.get(cardCircle).to({scaleX : 0.93, scaleY : 0.93}, 330).wait(1330).call(()=>{
                egret.Tween.removeTweens(cardCircle);
                btnGroup.removeChild(cardCircle);
                cardCircle = null;
            },view);

            egret.Tween.get(cardCircle).to({rotation : 90}, 1660);
            //聚集
            for(let i = 0; i < 4; ++ i){
                let cardlight = BaseBitmap.create("flipcard_select"+btnGroup._ctype );
                cardlight.blendMode = egret.BlendMode.ADD;
                cardlight.anchorOffsetX = cardlight.width / 2;
                cardlight.anchorOffsetY = cardlight.height / 2;
                cardlight.alpha = 0;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight, this);
                btnGroup.addChild(cardlight);
                cardlight.setScale(1.45);

                egret.Tween.get(cardlight).wait(i * 260).to({scaleX : 1, scaleY : 1, alpha : 1}, 400).to({alpha : 0}, 260).call(()=>{
                    egret.Tween.removeTweens(cardlight);
                    btnGroup.removeChild(cardlight);
                    cardlight = null;
                },view);
            }
            let tmpX = btnGroup.x;
            let tmpY = btnGroup.y;
            egret.Tween.get(btnGroup).wait(200)
            .set({x : tmpX - 0.1, y : tmpY + 1.3}).wait(60)
            .set({x : tmpX + 1.6, y : tmpY - 1.3}).wait(60)
            .set({x : tmpX - 2.9, y : tmpY - 0.6}).wait(60)
            .set({x : tmpX, y : tmpY - 0.8}).wait(60)
            // .set({x : tmpX + 1.2, y : tmpY - 3.9}).wait(60)
            // .set({x : tmpX - 3.1, y : tmpY - 1.1}).wait(60)
            // .set({x : tmpX - 1.8, y : tmpY + 1}).wait(60)
            // .set({x : tmpX + 0.7, y : tmpY - 1.5}).wait(60)

            // .set({x : tmpX - 3.5, y : tmpY - 4.2}).wait(60)
            // .set({x : tmpX - 3.3, y : tmpY - 1.3}).wait(60)
            // .set({x : tmpX + 1.9, y : tmpY - 2.8}).wait(60)
            // .set({x : tmpX - 3, y : tmpY + 0.8}).wait(60)
            // .set({x : tmpX - 1.5, y : tmpY + 1}).wait(60)
            // .set({x : tmpX + 1.2, y : tmpY - 0.3}).wait(60)
            // .set({x : tmpX - 2.3, y : tmpY}).wait(60)
            .set({x : tmpX, y : tmpY}).wait(60)
            .to({scaleX : 0.05, scaleY : 2.5}, 200).wait(100).
            call(()=>{
                btnGroup.scaleX = -0.1;
                // btn.setRes(`luckydrawcard${2}-${1}`);
                let cardres = "flipcard_card" + this._cardCode + "_"+this._ctype
                btnGroup._boxImg.texture = ResourceManager.getRes(cardres);
                btnGroup._rewardIcon.alpha = 1;
                btnGroup._rewardIcon.visible =  btnGroup._rewardTxtbg.visible =  btnGroup._rewardTxt.visible = true;
            },view).
            to({scaleX : 0.85, scaleY : 0.85}, 130).
            to({scaleX : 1.15, scaleY : 1.15}, 70).
            to({scaleX : 1, scaleY : 1}, 260).wait( 840)
            .call(()=>{
                view.endMovie( rewards,isShowReward,showRewards,cfrewards);
            },view);

            egret.Tween.get(btnGroup).wait(1160-420).wait(200).to({alpha : 0},10).to({alpha : 1},10);

            //卡牌高亮透明度动画
            let highlight = BaseBitmap.create(`flipcard_addmask`);
            highlight.anchorOffsetX = highlight.width / 2;
            highlight.anchorOffsetY = highlight.height / 2;
            highlight.blendMode = egret.BlendMode.ADD;
            highlight.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, this);
            btnGroup.addChild(highlight);
            egret.Tween.get(highlight).wait(1160).wait(330).set({alpha : 1}).wait(130).to({alpha : 0},330).call(()=>{
                egret.Tween.removeTweens(highlight);
                btnGroup.removeChild(highlight);
                highlight = null;
            }, view);

            //卡牌光晕透明度动画
            let cardbg = BaseBitmap.create("flipcard_select"+btnGroup._ctype ); //flipcard_addmask
            cardbg.anchorOffsetX = cardbg.width / 2;
            cardbg.anchorOffsetY = cardbg.height / 2;
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = `cardbg`;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, this);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(1160).wait(330).set({alpha : 1});
            //爆点光刺
            let boomeffect = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            boomeffect.blendMode = egret.BlendMode.ADD;
            boomeffect.anchorOffsetX = boomeffect.width / 2;
            boomeffect.anchorOffsetY = boomeffect.height / 2;
            boomeffect.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeffect, this);
            btnGroup.addChild(boomeffect);
            boomeffect.setScale(1.6);
            egret.Tween.get(boomeffect).wait(1160).wait(330).set({alpha : 1}).to({scaleX : 0, scaleY : 0}, 130).call(()=>{
                egret.Tween.removeTweens(boomeffect);
                btnGroup.removeChild(boomeffect);
                boomeffect = null;
            },view);
            //翻牌时扩散动画
            let cardlight1 = BaseBitmap.create("flipcard_select"+btnGroup._ctype );
            cardlight1.blendMode = egret.BlendMode.ADD;
            cardlight1.anchorOffsetX = cardlight1.width / 2;
            cardlight1.anchorOffsetY = cardlight1.height / 2;
            cardlight1.alpha = 0;
            cardlight1.name ="cardlight1";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight1, this);
            btnGroup.addChild(cardlight1);
            cardlight1.setScale(1.08);

            egret.Tween.get(cardlight1).wait(1160).wait(330).to({scaleX : 1.8, scaleY : 1.8}, 200);

            egret.Tween.get(cardlight1).wait(1160).wait(330).set({alpha : 0.8}).to({alpha : 0}, 250).call(()=>{
                egret.Tween.removeTweens(cardlight1);
                btnGroup.removeChild(cardlight1);
                cardlight1 = null;
            },view);

            let cardlight2 = BaseBitmap.create("flipcard_select"+btnGroup._ctype );
            cardlight2.blendMode = egret.BlendMode.ADD;
            cardlight2.anchorOffsetX = cardlight2.width / 2;
            cardlight2.anchorOffsetY = cardlight2.height / 2;
            cardlight2.alpha = 0;
            cardlight2.name ="cardlight2";
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight2, this);
            btnGroup.addChild(cardlight2);
            cardlight2.setScale(0.85);

            egret.Tween.get(cardlight2).wait(1160).wait(330).to({scaleX : 1.8, scaleY : 1.8}, 330);

            egret.Tween.get(cardlight2).wait(1160).wait(330).set({alpha : 1}).to({alpha : 0}, 400).call(()=>{
                egret.Tween.removeTweens(cardlight2);
                btnGroup.removeChild(cardlight2);
                cardlight2 = null;
            },view);

            //卡牌后面旋转光刺
            let circleeffect = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            circleeffect.blendMode = egret.BlendMode.ADD;
            circleeffect.anchorOffsetX = circleeffect.width / 2;
            circleeffect.anchorOffsetY = circleeffect.height / 2;
            circleeffect.alpha = 0;
            circleeffect.name = `circleeffect1`;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect, this);
            btnGroup.addChildAt(circleeffect,0);
            circleeffect.setScale(1);
            egret.Tween.get(circleeffect).wait(1160).wait(330).set({alpha : 1}).to({rotation : 360}, 18000).call(()=>{
                egret.Tween.removeTweens(circleeffect);
                btnGroup.removeChild(circleeffect);
                circleeffect = null;
            },view);

            let circleeffect2 = BaseBitmap.create("flipcard_select"+btnGroup._ctype + "_1");
            circleeffect2.blendMode = egret.BlendMode.ADD;
            circleeffect2.anchorOffsetX = circleeffect2.width / 2;
            circleeffect2.anchorOffsetY = circleeffect2.height / 2;
            circleeffect2.alpha = 0;
            circleeffect2.name = `circleeffect2`;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect2, this);
            btnGroup.addChildAt(circleeffect2,0);
            circleeffect2.setScale(0.85);
            egret.Tween.get(circleeffect2).wait(1160).wait(330).set({alpha : 1}).to({rotation : -360}, 18000).call(()=>{
                egret.Tween.removeTweens(circleeffect2);
                btnGroup.removeChild(circleeffect2);
                circleeffect2 = null;
            },view);

            //扫光
            let scanEffect = ComponentManager.getCustomMovieClip("flipcard_ani", 8, 60);
            scanEffect.width = 124;
            scanEffect.height = 163;
            scanEffect.anchorOffsetX = scanEffect.width / 2;
            scanEffect.anchorOffsetY = scanEffect.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scanEffect, this);
            scanEffect.alpha = 0;
            btnGroup.addChild(scanEffect);
            egret.Tween.get(scanEffect).wait(1160).wait(1000).set({alpha : 1}).call(()=>{
                scanEffect.playWithTime(1);
            },view).wait(550).call(()=>{
                egret.Tween.removeTweens(scanEffect);
                btnGroup.removeChild(scanEffect);
                scanEffect = null;
            },this);
            //粒子效果
            let lizi = App.ParticleUtil.getParticle("ldcardparticle");
            lizi.anchorOffsetX = lizi.width / 2;
            lizi.anchorOffsetY = lizi.height / 2;
            btnGroup.addChild(lizi);
            egret.Tween.get(lizi).wait(1160).wait(330).call(()=>{
                lizi.start();
            },view).wait(300).call(()=>{
                egret.Tween.removeTweens(lizi);
                lizi.stop();
                btnGroup.removeChild(lizi);
                lizi = null;
            },view);
            
        }
        else{
             //卡牌背面动画
            egret.Tween.get(btnGroup).
            to({scaleX : 0.05, scaleY : 1.5}, 130).wait(100).
            call(()=>{
                btnGroup.scaleX = -0.1;
                btnGroup._rewardIcon.alpha = 1;
                btnGroup._rewardIcon.visible =  btnGroup._rewardTxtbg.visible =  btnGroup._rewardTxt.visible = true;
                // btn.setRes(`luckydrawcard${1}-${1}`);
                 let cardres = "flipcard_card" + this._cardCode + "_"+this._ctype
                btnGroup._boxImg.texture = ResourceManager.getRes(cardres);
            },view).
            to({scaleX : 0.9, scaleY : 0.9}, 130).
            to({scaleX : 1.03, scaleY : 1.03}, 70).wait(0).
            call(()=>{
                view.endMovie( rewards,isShowReward,showRewards,cfrewards);
            },view).
            to({scaleX : 1, scaleY : 1}, 260);
            egret.Tween.get(btnGroup).wait(130).to({alpha : 0},10).to({alpha : 1},10);

            //卡牌高亮透明度动画
            let highlight = BaseBitmap.create(`flipcard_addmask`);
            highlight.blendMode = egret.BlendMode.ADD;
            highlight.alpha = 0;
            highlight.anchorOffsetX = highlight.width / 2;
            highlight.anchorOffsetY = highlight.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight, this._boxImg);
            btnGroup.addChild(highlight);
            egret.Tween.get(highlight).wait(260).set({alpha : 1}).to({alpha : 0},330).call(()=>{
                egret.Tween.removeTweens(highlight);
                btnGroup.removeChild(highlight);
                highlight = null;
            }, view);

            //卡牌光晕透明度动画
            let cardbg = BaseBitmap.create('flipcard_select'+btnGroup._ctype);
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = `cardbg`;
            cardbg.anchorOffsetX = cardbg.width / 2;
            cardbg.anchorOffsetY = cardbg.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, this._boxImg);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(260).set({alpha : 1}).wait(330).to({alpha : 0},330).
            call(()=>{
                egret.Tween.removeTweens(cardbg);
                //最后一张卡不同颜色 播放完释放
                // if(btnIdx == endIdx){
                    btnGroup.removeChild(cardbg);
                    cardbg = null;
                // }
            },view);
        }

        btnGroup.setChildIndex(this._rewardIcon, 9999);
        btnGroup.setChildIndex(this._rewardTxt, 9999);
    }

    private endMovie( reward : string,isShowReward?:boolean,showRewards?:string,cfrewards?:string):void{
        let view = this;
        let midbtnGroup : any = this;
        egret.Tween.get(midbtnGroup).to({scaleX : 1.04, scaleY : 1.04}, 330).to({scaleX : 1, scaleY : 1}, 330).call(()=>{
            egret.Tween.removeTweens(midbtnGroup);
                //移出光晕
                let cardbg = <BaseBitmap>midbtnGroup.getChildByName(`cardbg`);
                if(cardbg){
                    egret.Tween.removeTweens(cardbg);
                    egret.Tween.get(cardbg).to({alpha : 1},300).call(()=>{
                         midbtnGroup.removeChild(cardbg);
                        cardbg = null;
                    },midbtnGroup);
                }

                let circleeffect2 =  midbtnGroup.getChildByName("circleeffect2");
                if(circleeffect2){
                    egret.Tween.removeTweens(circleeffect2);
                    egret.Tween.get(circleeffect2).to({alpha : 0},500).call(()=>{
                        midbtnGroup.removeChild(circleeffect2);
                        circleeffect2 = null;
                    },midbtnGroup);
                }
                let circleeffect1 =  midbtnGroup.getChildByName("circleeffect1");
                if(circleeffect1){
                    egret.Tween.removeTweens(circleeffect1);
                    egret.Tween.get(circleeffect1).to({alpha : 0},500).call(()=>{
                        midbtnGroup.removeChild(circleeffect1);
                        circleeffect1 = null;
                    },midbtnGroup);
                }

                if(isShowReward){
                    // Api.wifeVoApi.checkWifeChangeRewards(cfrewards,showRewards);
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                        "rewards": showRewards ? showRewards :reward,
                        "otherRewards":null,
                        "isPlayAni":true, 
                        showTip:null,
                        callback:()=>{
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FLIPCARD_REWARD_END);
                        },
                        target:midbtnGroup,
                    });
                }
        }, view);
    }

	public dispose(): void {

        this._boxImg = null;
        this._boxIdx=0;
        this._selBoxImg = null;
        this._ctype = 0;
        this._rewardIcon = null;
        this._rewardTxt = null;
        this._rewardTxtbg = null;

		super.dispose();
	}
}