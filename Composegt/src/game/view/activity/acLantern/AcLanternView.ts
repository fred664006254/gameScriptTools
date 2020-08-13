/**
 * author jiangliuyang
 */

class AcLanternView extends AcCommonView{
	public constructor() {
		super();
	}

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _bottomBg: BaseBitmap = null;
    private _progress : ProgressBar = null;
	private _boxList:BaseBitmap[] = [];
	private _isPlaying: Boolean = false;
	private _rewards: any = null;
	private _acvo:AcLanternVo = undefined;
	private _bg: BaseLoadBitmap = null;
	private _showNumText: BaseTextField = null;
	private _fire:BaseBitmap = null;
	private _isSingle:boolean = true;
	private _anim:CustomMovieClip = null;
	private _taskBtn:BaseButton = null;
    private _fireText:BaseTextField = null;
    private _checkBox:CheckBox = null;
	private _canNumText: BaseTextField = null;
	private _cjAnim:BaseLoadDragonBones = null;
	private _taskHand: BaseBitmap = null;
	private _talk:BaseTextField = null;
	private _talkBg:BaseBitmap = null;
	private _talkId :number = 0;
	private _handX:number = 0;
	private _handY:number = 0;
	private _intervalId :number = 0;
	// private aid:string;
	// private code:string;
	private get vo() : AcLanternVo{
       	if(!this._acvo){
		    this._acvo =  <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	   	}
		return this._acvo;
    }
	private get cfg() : Config.AcCfg.LanternCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	protected initBg():void
	{


		this._bg = BaseLoadBitmap.create(this.getDefaultRes("aclanternview_bg"));
		this._bg.width = 640;
		this._bg.height = 1136;
		this._bg.x = 0;
		this._bg.y = GameConfig.stageHeigth - 1136;//GameConfig.stageHeigth / 2 - this._bg.height/2;
		this.addChild(this._bg);
		if(App.CommonUtil.check_dragon() && RES.hasRes("xiaodonglong_ske"))
        {
       
            let animIcon=App.DragonBonesUtil.getLoadDragonBones("xiaodonglong");


			animIcon.x = 80;
            animIcon.y = GameConfig.stageHeigth  ;
            this.addChild(animIcon);
			
        }


		if(App.CommonUtil.check_dragon() && RES.hasRes("choujiang_ske"))
        {
       
            this._cjAnim =App.DragonBonesUtil.getLoadDragonBones("choujiang");
			this._cjAnim.x = 0;
            this._cjAnim.y = GameConfig.stageHeigth ;
            this.addChild(this._cjAnim);
			// this._cjAnim.stop();
			this._cjAnim.visible = false;
        }

	}

	protected initView(): void {

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO,this.refreshData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNITEMT,this.eventCollectHandlerCallBack,this);

		let titleFont = BaseBitmap.create(this.getDefaultRes("aclanternview_title"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 10;
		this.addChild(titleFont);


		
		let topbg = BaseBitmap.create(this.getDefaultRes("aclanternview_topbg"));
   
        topbg.x = 0;
		topbg.y = 72;
        this.addChild(topbg);
		if(this.closeBtn){
			this.setChildIndex(this.closeBtn,this.getChildIndex(topbg));
		}

		 let flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width-60;
        flag.y =  35;
        this.addChild(flag);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 14
		this._activityTimerText.y = topbg.y + 8;
		this._activityTimerText.text  = this.vo.getAcLocalTime(true);
		this.addChild(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		let deltaT = this.vo.et - GameData.serverTime;
		this._acCDTxt = acCDTxt;

		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acLantern_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acLantern_acCD", [LanguageManager.getlocal("acLantern_acCDEnd")]);
		}

		// acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		acCDTxt.x = this._activityTimerText.x;//GameConfig.stageWidth - 15 - acCDTxt.width;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 5;
		this.addChild(acCDTxt);
		
		let lanternNum = this.cfg.lanternNum;
		let maxDrawNum = this.cfg.lanternNum[this.cfg.lanternNum.length-1]["needNum"];
		let ruleText = ComponentManager.getTextField("",18, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleText.width = 612;//GameConfig.stageWidth - 30;
		ruleText.multiline = true;
		ruleText.lineSpacing = 3;
		ruleText.x = 14
		ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 5;
		ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acLantern_description"),[String(maxDrawNum)]);
		this.addChild(ruleText);

		this._canNumText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLantern_btntxt3"),[String(this.vo.v)]),18, 0x42df1b);
		this._canNumText.x = 14//GameConfig.stageWidth - 10 - this._canNumText.width;
		this._canNumText.y = topbg.y + topbg.height - 20 - this._canNumText.height;
		this.addChild(this._canNumText);

		

		
		if(App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full_"+ this.cfg.wifeID + "_ske"))
        {
       
            let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full_"+ this.cfg.wifeID);
            droWifeIcon.setScale(1)
            // droWifeIcon.x = 120;
			droWifeIcon.x = 320;
            droWifeIcon.y = GameConfig.stageHeigth - 30;
            this.addChild(droWifeIcon);
        }
        else
        {
            // wife 的 图片
            let scaleNum = 0.8;
            let wifeBM =  BaseLoadBitmap.create("wife_full_"+ this.cfg.wifeID);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = 320 - 640 * scaleNum / 2;
            wifeBM.y = GameConfig.stageHeigth - 840 * 0.8;
            this.addChild(wifeBM);
        }




		let bottomBg = BaseBitmap.create(this.getDefaultRes("aclanternview_desk"));
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		this.addChild(bottomBg);
		this._bottomBg = bottomBg;



		if(App.CommonUtil.check_dragon() && RES.hasRes("daidonglong_ske"))
        {
       
            let animIcon=App.DragonBonesUtil.getLoadDragonBones("daidonglong");


			animIcon.x = 0;
            animIcon.y = GameConfig.stageHeigth ;
            this.addChild(animIcon);
        }
        else
        {

			let leftIcon = BaseBitmap.create(this.getDefaultRes("aclanternview_pen"));
			leftIcon.x = bottomBg.x + 127;
			leftIcon.y = bottomBg.y - 60;
			this.addChild(leftIcon);
			
			let rightIcon =  BaseBitmap.create(this.getDefaultRes("aclanternview_light2"));
			rightIcon.x = bottomBg.x + 390;
			rightIcon.y = bottomBg.y - 105;
			this.addChild(rightIcon);

        }






		let talkBg = BaseBitmap.create( this.getDefaultRes("aclanternview_talkbg"));
		talkBg.x = 50;
		talkBg.y = bottomBg.y - 460;
		this._talkBg = talkBg;
		this.addChild(talkBg);

		let talk = ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
		talk.rotation = -12;
		talk.width = 140;
		this._talk = talk;
		this.addChild(talk);
		this.showDialog();
		this._intervalId = egret.setInterval(this.showDialog,this,30000);

		let txt1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLantern_btntxt1")),18,TextFieldConst.COLOR_WHITE);
		let txt2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLantern_btntxt4")),18,TextFieldConst.COLOR_WHITE);

        txt1.width = 162;
		txt1.lineSpacing = 5;
        txt1.x = 186 - txt1.width/2;
        txt1.y = GameConfig.stageHeigth - 15 - txt1.height;
        this.addChild(txt1);

        
        txt2.x = GameConfig.stageWidth - 186 - txt2.width/2;
        txt2.y = GameConfig.stageHeigth - 15 - txt2.height;
        this.addChild(txt2);

     


        let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal(this.getDefaultCn("acLantern_btntxt2")),null,18,TextFieldConst.COLOR_WHITE);
        checkBox.x = GameConfig.stageWidth - 186 - (checkBox.width )/2;
        checkBox.y = txt2.y - 5 - checkBox.height;
        checkBox.name="tenCheckBox"
        this.addChild(checkBox);
        checkBox.setSelected(false);
        this._checkBox=checkBox;


        // let leftTouchPanel:BaseDisplayObjectContainer = new BaseDisplayObjectContainer(); 
		let leftTouchPanel = BaseBitmap.create("public_alphabg");
        leftTouchPanel.width = 125;
        leftTouchPanel.height = 125;
        leftTouchPanel.x = bottomBg.x + 125;
        leftTouchPanel.y = bottomBg.y - 80;
        leftTouchPanel.addTouchTap(this.leftHandler,this);
        this.addChild(leftTouchPanel);


        // let rightTouchPanel:BaseDisplayObjectContainer = new BaseDisplayObjectContainer(); public_alphabg
		let rightTouchPanel = BaseBitmap.create("public_alphabg");
        rightTouchPanel.width = 160;
        rightTouchPanel.height = 160;
        rightTouchPanel.x = bottomBg.x + 380;
        rightTouchPanel.y = bottomBg.y - 126;
        rightTouchPanel.addTouchTap(this.rightHandler,this);
        this.addChild(rightTouchPanel);

    

        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type4_yellow","progress_type4_bg",530);
		this._progress.x = GameConfig.stageWidth/2-this._progress.width/2;
        this._progress.y = topbg.y + topbg.height + 26;
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);


        let btnbg = BaseBitmap.create(this.getDefaultRes("aclanternview_taskbtnbg"));
        btnbg.x = GameConfig.stageWidth - btnbg.width;
        btnbg.y = this._progress.y + 63;
        this.addChild(btnbg);

        let taskBtn:BaseButton = ComponentManager.getButton(this.getDefaultRes("aclanternview_taskbtn"),"",this.taskBtnHandler,this,null,3);
        taskBtn.x = GameConfig.stageWidth - 15 - taskBtn.width;
        taskBtn.y = btnbg.y + btnbg.height;
        this.addChild(taskBtn); 
		this._taskBtn = taskBtn;



		let fire = BaseBitmap.create(this.getDefaultRes("aclanternview_numbg"));
		fire.x = this._progress.x - fire.width/2;
		fire.y = this._progress.y + this._progress.height/2 - fire.height/2 + 9;
		this.addChild(fire);
        
        let fireText =  ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acLantern_progname")),16,TextFieldConst.COLOR_LIGHT_YELLOW);
        fireText.x = fire.x + fire.width/2 - fireText.width/2- 10;
		fireText.y = fire.y +40;
		this.addChild(fireText);
        this._fireText = fireText;

		this._showNumText = ComponentManager.getTextField(String(this.vo.usenum),18,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._showNumText.x = this._fireText.x + this._fireText.width/2 - this._showNumText.width/2;
        this._showNumText.y = this._fireText.y + fireText.height;
        this.addChild(this._showNumText);


		for (let index = 0; index < lanternNum.length; index++) {
			let tmprcfg = lanternNum[index];
			// let perY = startY - (index+1) * perHeight;
           
			// 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("aclanternview_box"+rStatus);
			
			let boxImg = BaseBitmap.create(imgres);
			boxImg.anchorOffsetX = boxImg.width/2;
			boxImg.anchorOffsetY = boxImg.height/2;
			boxImg.name = "boxImg"+index;
			boxImg.x = this._progress.x + this.cfg.lanternNum[String(index)]["needNum"]/maxDrawNum * this._progress.width;
			boxImg.y = this._progress.y + this._progress.height/2;
			
			let lightImg =  BaseBitmap.create(this.getDefaultRes("aclanternview_boxlight"));
			lightImg.anchorOffsetX = lightImg.width/2;
			lightImg.anchorOffsetY = lightImg.height/2;
			lightImg.scaleX = 0.4;
			lightImg.scaleY = 0.4;
			lightImg.name = "lightImg"+index
            lightImg.x = boxImg.x;
			lightImg.y = boxImg.y;
			lightImg.visible = false;
			this.addChild(lightImg);
			this.addChild(boxImg);

			let boxEffect = ComponentManager.getCustomMovieClip("aclantern_lightanim",10,70);
			boxEffect.name ="boxEffect"+index;
			boxEffect.x = boxImg.x - 104/2;
			boxEffect.y = boxImg.y - 109/2;
			this.addChild(boxEffect);
			boxEffect.addTouchTap(this.getBoxReward,this,[index]);
            boxImg.addTouchTap(this.getBoxReward,this,[index]);
            if(index == lanternNum.length -1){
				this._handX = boxImg.x;
				this._handY = boxImg.y;
			}


            let numTxtBg = BaseBitmap.create(this.getDefaultRes("aclanternview_pronumbg"));
            numTxtBg.x = boxImg.x- numTxtBg.width/2;
            numTxtBg.y = boxImg.y + boxImg.height/2 +5;
            this.addChild(numTxtBg);

			let need = this.cfg.lanternNum[index]["needNum"];
			let numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = numTxtBg.x + numTxtBg.width/2 - numTxt.width/2;
			numTxt.y = numTxtBg.y + numTxtBg.height/2 - numTxt.height/2;
			this.addChild(numTxt);
		}
		this.refreshData();

		this.showFirstDialog();

		
	}
	
	private showDialog(){
		
		let rankList = [];
		for(let i = 0; i < 4;i++){
			if(i + 1 != this._talkId){
				rankList.push(i+1);
			}
		}
		let talkIndex = Math.floor(Math.random() * rankList.length);
		this._talkId = rankList[talkIndex];

	
		this._talk.text = LanguageManager.getlocal(this.getDefaultCn("acLantern_talk"+this._talkId));
		this._talk.x = this._talkBg.x + 15+10;
		this._talk.y = this._talkBg.y + 63;


	}
	private showFirstDialog(){
        if(!this.vo.getOpened()){
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.vo.aidAndCode, flagkey:"opened", value:1});
           this.checkHand()

        }
    }
	protected getCloseBtnName():string
	{
       
		return "btn_closebtn2";
	}
    private checkHand():void
    {
        let posX  = this._handX + 0;
        let posY  = this._handY + 0;
        
        this._taskHand = BaseBitmap.create("guide_hand");
        this._taskHand.x = posX;
        this._taskHand.y = posY;
        this._taskHand.setScale(0.5);
        this.addChild(this._taskHand);

        egret.Tween.get(this._taskHand,{loop:true})
            .to({y:posY - 5 ,scaleX:0.4,scaleY:0.4}, 500)
            .to({y:posY ,scaleX:0.5,scaleY:0.5}, 500)
    }

    private leftHandler()
    {
 		if(this.vo.noteflag){
            //已领取
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"msg": LanguageManager.getlocal("acLantern_leftBtnTip") ,
				"needCancel":false,
				"title":"itemUseConstPopupViewTitle",
				"callback":null,
				"handler":this,
			});
            
        } else {
			 ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNMAILPOPUPVIEW,{aid:this.aid,code:this.code});
        }
    }
    private rightHandler()
    {

		if(this._checkBox.checkSelected()){
			this.tenSendBtnHandler();
		} else {
			this.oneSendBtnHandler();
		}
		


    }
    protected eventCollectHandlerCallBack(event:egret.Event)
    {

		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				
				let data = event.data.data.data;
				let rewards = data.rewards;
				let addlanternnum = data.addlanternnum;
				if(addlanternnum && addlanternnum > 0){
					rewards = "27_0001_" + addlanternnum + "|" + rewards;
				}
				let rList = GameData.formatRewardItem(rewards);
				App.CommonUtil.playRewardFlyAction(rList);
		
				Api.servantVoApi.checkServantChangeRewards( data.cfrewards, rewards);
				
				
			}
		}
		

    }
	private refreshData()
	{

		let maxDrawNum = this.cfg.lanternNum[this.cfg.lanternNum.length-1]["needNum"];
		let shownum = this.vo.usenum > maxDrawNum ? maxDrawNum :  this.vo.usenum;
		this._showNumText.text = String(shownum);
		this._canNumText.text = LanguageManager.getlocal(this.getDefaultCn("acLantern_btntxt3"),[String(this.vo.v)]);

		let scene = this.cfg.lanternNum;
		let num =0;//this.vo.ainfo.score;

		if(this._taskBtn){
			if(this.vo.isHaveTaskRedDot()){
				App.CommonUtil.addIconToBDOC(this._taskBtn,null,null,-10,30);
			} else {
				App.CommonUtil.removeIconFromBDOC(this._taskBtn)
			}

		}



		this._progress.setPercentage(this.getProgressPercent());
		let fireNum = this.cfg.lanternNum;
		for (var index = 0; index < fireNum.length; index++) {
			
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("aclanternview_box"+rStatus);
			let boxImg = this.getChildByName("boxImg"+index);
			let lightImg = this.getChildByName("lightImg"+ index);
			let boxEffect:CustomMovieClip = <CustomMovieClip>this.getChildByName("boxEffect"+ index);

			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres);
				boxImg.anchorOffsetX = boxImg.width/2;
				boxImg.anchorOffsetY = boxImg.height/2;
			}
			if(rStatus == 2){
				lightImg.visible = true;
				boxImg.visible = false;
				boxEffect.visible = true;
				boxEffect.playWithTime(-1);
				// egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				// egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);

			} else {
				lightImg.visible = false;
				boxImg.visible = true;
				boxEffect.visible = false;
				boxEffect.stop();
				// egret.Tween.removeTweens(lightImg);
				// egret.Tween.removeTweens(boxImg);
			}
		}


	}

	private getProgressPercent():number
	{
		let lanternNum = this.cfg.lanternNum;
		let maxDrawNum = this.cfg.lanternNum[this.cfg.lanternNum.length-1]["needNum"];

        // return 0;
		if(this.vo.usenum > maxDrawNum){
            
			return 1;
		} else {
			return this.vo.usenum / maxDrawNum;
		}
	}

    private taskBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNTASKPOPUPVIEW,{aid:this.aid,code:this.code});
 
    }
	private oneSendBtnHandler():void
	{
		if(this._isPlaying){
			return;
		}
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(this.vo.v >= 1){
			this._isSingle = true;
			this.confirmOneCallbackHandler();
	
		} else {
			// App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acLantern_lightnotenough")));
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"msg": LanguageManager.getlocal(this.getDefaultCn("acLantern_lightnotenough"),[String(this.vo.v)]) ,
				"needCancel":true,
				"title":"itemUseConstPopupViewTitle",
				"callback":this.taskBtnHandler,
				"handler":this,
			});

		}

	}    
	private tenSendBtnHandler():void
	{
		if(this._isPlaying){
			return;
		}
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(this.vo.v >= 10){
			this._isSingle = false;
			this.confirmTenCallbackHandler();
	
		} else {
			// App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acLantern_lightnotenough")));
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"msg": LanguageManager.getlocal(this.getDefaultCn("acLantern_lightnotenough"),[String(this.vo.v)]) ,
				"needCancel":true,
				"title":"itemUseConstPopupViewTitle",
				"callback":this.taskBtnHandler,
				"handler":this,
			});
		}

        /*
		if(this._isPlaying){
			return;
		}
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

		if(Api.playerVoApi.getPlayerGem() >= this.cfg.cost * 10){
			// this._isSingle = false;
			let message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_btnCostGem"),[""+this.cfg.cost*10]);

			//显示弹出框
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{
				useNum: this.cfg.cost * 10,								//物品价格
				confirmCallback: this.confirmTenCallbackHandler,	//确认回调函数
				handler: this,									//target
				num: Api.playerVoApi.getPlayerGem(),									//玩家元宝数
				msg: message,									//显示消息
				id:1											//消耗物品id  1->元宝
			});
		} else {
			let message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_gemNotEnoughTen"),[""+this.cfg.cost * 10]);

			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:message,
				callback:()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				},
				handler:this,
				needCancel:true
			});
		}
        */


		// if(this.vo.lotterynum <= 0){		
		// 	let message = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_sendTip1"),[""+this.vo.cfg.cost]);
			
		// 	ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
		// 		title:"itemUseConstPopupViewTitle",
		// 		msg:message,
		// 		callback:()=>{
		// 			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		// 		},
		// 		handler:this,
		// 		needCancel:true
		// 	});
		// 	return;
		// }
		// this._isPlaying = true;
		// if(this.vo.lotterynum>=10){
		// 	this._isSingle = false;
		// } else {
		// 	this._isSingle = true;
		// }
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,this.sendReward,this);
		// NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,{activeId:this.vo.aidAndCode,});
	}
	private confirmOneCallbackHandler()
	{
		SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNLOTTERY,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNLOTTERY,{activeId:this.vo.aidAndCode,isTenPlay:0});
	}
	private confirmTenCallbackHandler()
	{
		SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNLOTTERY,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNLOTTERY,{activeId:this.vo.aidAndCode,isTenPlay:1});
	}



	private sendReward(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNLOTTERY,this.sendReward,this);
		
		if (event.data.data.ret ==0) {
		
			let rewards = event.data.data.data.rewards;
			this._rewards = rewards;
		
			

			if(this._cjAnim){
				this._cjAnim.visible = true;
				this._isPlaying = true;
				if(this._isSingle){
					this._cjAnim.playDragonMovie("danchou",1);
					this._cjAnim.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
						this.recallAniBack();
       				 }, this);

				} else {
					this._cjAnim.playDragonMovie("shilianchou",1);
					this._cjAnim.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
						this.recallAniBack();
					}, this);
				}
			} else {
				this.recallAniBack();
			}

			// if(this._isSingle){
			// 	this._anim.playWithTime(1);

			// 	// this.recallAniBack();
			// } else {
			// 	this.recallAniBack();
			// }
	
		}
	}
	private recallAniBack()
	{
		this._isPlaying = false;
		let check = null;
		this._cjAnim.visible = false;
		SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
			"rewards":this._rewards,
			"otherRewards":null,
			"isPlayAni":true, 
			showTip:null,
			callback:check,
			target:this,
		});
		this._rewards = null;
	}

	
	private getBoxReward(event:any,boxId:number)
	{
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if(this._taskHand){
            this._taskHand.visible = false;
            egret.Tween.removeTweens(this._taskHand);
			this._taskHand = null;
        }

		let score = this.vo.usenum;//this.vo.ainfo.score;
		let cfg = this.cfg;
		let lanternNum = cfg.lanternNum;

		let element = lanternNum[boxId];
		//不可领取
		if(element.needNum > score){

			// ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENEDETAILPOPUPVIEW,{sceneId:sceneId,wifename:this._wifeInfoVo.name});
			if(lanternNum.length == boxId+1){
				// let wifeItemCfg:Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(310);//Api.wifeVoApi.getWifeInfoVoById(310);
				// ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENEDETAILPOPUPVIEW,{sceneId:"31001",wifename: wifeItemCfg.name});
				ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNDETAILPOPUPVIEW,{"code":this.code,"aid":this.aid});
			} else {
				ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1});
			}
			
		
			return;
		}
		

		//已领取
		if(this.vo.rateflag[boxId+1]){
			// ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1})
			if(lanternNum.length == boxId+1){
				// let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(310);
				// ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENEDETAILPOPUPVIEW,{sceneId:"31001",wifename: wifeInfoVo.name});
				ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNDETAILPOPUPVIEW,{"code":this.code,"aid":this.aid});
			} else {
				ViewController.getInstance().openView(ViewConst.POPUP.ACLANTERNREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1});
			}
			return
		}

		// WifeBathSceneView
		// WifeVoApi
		if(lanternNum.length == boxId+1){
			let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this.cfg.wifeID);
			if(!wifeVo){
				App.CommonUtil.showTip(LanguageManager.getlocal("acLantern_haveNoWife"));
				return 
			}
			let isHave = wifeVo.checkHaveScene(this.cfg.wifeBathSceneID);
			
			if(isHave){
				App.CommonUtil.showTip(LanguageManager.getlocal("acLantern_haveScene"));
				return;
			} 
		}

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNRATE,this.boxRewardNetResp,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNRATE,{activeId:this.vo.aidAndCode,rateId:boxId+1});
		

	}
	//获得宝箱奖励
	private boxRewardNetResp(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNRATE,this.boxRewardNetResp,this);
		if (event.data.data.ret == 0) {
			// this.refreshData();
			 let data = event.data.data.data;

			 let rewards = data.rewards;
			 let rewardArrList = GameData.formatRewardItem(rewards);

			 for(let i = 0;i<rewardArrList.length;i++){
				 if(rewardArrList[i].type == 104){ 
					ViewController.getInstance().openView(ViewConst.BASE.WIFEBATHSCENEVIEW,{id:this.cfg.wifeID,sceneId:this.cfg.wifeBathSceneID});
					// ViewController.getInstance().openView(ViewConst.BASE.WIFEBATHSCENEVIEW,{id:this.cfg.wifeID,sceneId:this.cfg.wifeBathSceneID});

					return;
				 }
			 }
			//  if(rewards.indexOf("104_") == -1)
			 
			 Api.wifeVoApi.checkWifeChangeRewards(data.cfrewards,data.rewards);

		} else {
			App.CommonUtil.showTip(event.data.data.ret);
		}
	}


    public tick(): boolean {

		let deltaT = this.vo.et - GameData.serverTime;
	
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acLantern_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acLantern_acCD", [LanguageManager.getlocal("acLantern_acCDEnd")]);
		}
		this._acCDTxt.x = GameConfig.stageWidth - 15 - this._acCDTxt.width;
		return false;
	}

	protected getSoundBgName():string
	{
		return "music_lanternbg";
	}

    protected getTitleBgName():string
	{
		return this.getDefaultRes("aclanternview_titlebg");
    }
	protected getTitleStr():string
	{
        return  null;
    }

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
			
			this.getDefaultRes("aclanternview_box1"),
			this.getDefaultRes("aclanternview_box2"),
			this.getDefaultRes("aclanternview_box3"),
			this.getDefaultRes("aclanternview_boxlight"),
            this.getDefaultRes("aclanternview_closebtn"),
			this.getDefaultRes("aclanternview_desk"),
			this.getDefaultRes("aclanternview_light1"),
            this.getDefaultRes("aclanternview_light2"),
			this.getDefaultRes("aclanternview_numbg"),
			this.getDefaultRes("aclanternview_page"),
			this.getDefaultRes("aclanternview_pen"),
            this.getDefaultRes("aclanternview_pronumbg"),
            // this.getDefaultRes("aclanternview_tabbtn"),
            // this.getDefaultRes("aclanternview_tabbtn_down"),
            this.getDefaultRes("aclanternview_talkbg"),
			this.getDefaultRes("aclanternview_taskbtn"),
			this.getDefaultRes("aclanternview_taskbtnbg"),
            this.getDefaultRes("aclanternview_title"),
			this.getDefaultRes("aclanternview_titlebg"),
			this.getDefaultRes("aclanternview_topbg"),
			"aclanternview_tabbtn",
			"aclanternview_tabbtn_down",
			// "collectflag",
			// "acmoonlight_searchtext",
			// "dailytask_box_light",
            // "itemicon1",
            // "acspringouting_taskname-1",
			"progress_type4_yellow",
            "progress_type4_bg",
			"guide_hand",
			"itemeffect",
			"oneyear_flag"
		]);
	}



	public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO,this.refreshData,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD,this.eventCollectHandlerCallBack,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNITEMT,this.eventCollectHandlerCallBack,this);
		let drawNum = this.cfg.lanternNum;
		for (var index = 0; index < drawNum.length; index++) {
			let boxImg = this.getChildByName("boxImg" + index);
            let lightImg =  this.getChildByName("lightImg"+ index);
			if(boxImg){
				egret.Tween.removeTweens(boxImg);
			}
			if(lightImg){
				egret.Tween.removeTweens(lightImg);
			}
            
        }
		if(this._taskHand){
			egret.Tween.removeTweens(this._taskHand);
		}
		egret.clearInterval(this._intervalId);
		this._taskHand = null;
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._bottomBg = null;
    	this._progress = null;
		this._boxList = [];
		this._isPlaying= false;
		this._rewards = null;
		this._acvo = undefined;
		this._bg = null;
		this._showNumText = null;
		this._fire = null;

		this._anim = null;
		this._taskBtn = null;
		this._isSingle = true;
		this._anim = null;
		this._taskBtn = null;
    	this._fireText = null;
    	this._checkBox = null;
		this._canNumText = null;
		this._cjAnim = null;
		this._talk = null;
		this._talkId = 0;
		this._talkBg = null;
		this._intervalId= 0;
		super.dispose();
	}

}



