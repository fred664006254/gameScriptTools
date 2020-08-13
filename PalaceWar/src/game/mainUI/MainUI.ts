/**
 * author 陈可
 * date 2017/9/18
 * @class MainUI
 */

class MainUI extends BaseLoadDisplayObjectContiner
{
	private _topContiner:BaseDisplayObjectContainer=undefined;
	private _iconContainer:BaseDisplayObjectContainer;
	private _bottomContiner:BaseDisplayObjectContainer=undefined;

	private _goOutBtn:BaseBitmap;
	private _mailButton:BaseButton;
	private _settingButton:BaseButton;
	private _helpButton:BaseButton = null;
	private _taskContainer:BaseDisplayObjectContainer;
	private _settingAndMailContainer:BaseDisplayObjectContainer;
	private _missionIcon:BaseBitmap;

	private _chatTxt:BaseTextField;
	private _chatTxtPoint:BaseTextField;
	private _taskTxt:BaseTextField;
	private _functionTxt:BaseTextField;
	private _lampRoll:LampRoll;
	private _mailRedDotSp:BaseBitmap = null;
	private _functionPreviewBg:BaseBitmap = null;
	private _functionAni:CustomMovieClip = null;

	private _activityIconList:BaseDisplayObjectContainer[]=[];
	
	private _iconNameList:Object={};
	private _signName:string =null;
	private _functionIcon:BaseBitmap =null;
	private _lastL:number=0;
	private _tuyouBackToLobby:BaseButton = null;
	private _empContainer:BaseDisplayObjectContainer;
	private _empBtn : BaseButton = null;
	private _friendsBtn : BaseButton = null;
	// private _wxgameKefuBtn : BaseButton = null;	
	private _empCircle : BaseBitmap = null;
	private _empTitleCircle : BaseBitmap = null;
	private _empTurnCircle : BaseBitmap = null;

	private _redPoint : BaseBitmap = null;
	private _wxMoreGameIcon:BaseLoadBitmap = null;

	private _moneyIconContainer:BaseDisplayObjectContainer = null;
	private _changebgButton:BaseButton = null;
	private _zhenqifangButton:BaseButton = null;

	private _extandButton:ExtendIcon = null;
	private _singleLineButton:CommonExtend = null;
	private _pickUpTab:BaseDisplayObjectContainer[] = [];
	private _singleLineTab:BaseDisplayObjectContainer[] = [];
	private _isInExtanding:boolean = false;
	private _clickHand:BaseBitmap=null;
	private _examBtn: BaseButton = null;
	public _examContainer:BaseDisplayObjectContainer = null;
	
	private _singleLineTime:number = 0;

	//左侧icon区域
	private _leftIconContainer:BaseDisplayObjectContainer;
	//左侧icon list
	private _leftIconList:BaseDisplayObjectContainer[] = [];

	private _leftIconMsgList = [];

	private _leftIconMsgListBak = [];
	private _leftIconArrowContainer:BaseDisplayObjectContainer = null;

	//动画添加
	private _topbg:MainUINewTop = null;
	private _isGooutAniing:boolean = false;
	private _chatContainer:BaseDisplayObjectContainer = null;
	private _aniBlackMask:BaseBitmap = null;
	//府内
	private _rightBtnContainer:BaseDisplayObjectContainer = null;
	//府外
	private _rightBtnContainer2:BaseDisplayObjectContainer = null;
	private _isGoout:boolean = false;
	private _gououtTxt :BaseBitmap = null;

	//出巡按钮
	private _cityEmpOutingContainer:BaseDisplayObjectContainer = null;
	private _homeEmpOutingContainer:BaseDisplayObjectContainer = null;

	//府外雁门关
	private _cityDailybossContainer:BaseDisplayObjectContainer = null;

	private _leftBigIconNumber:number = 0;
	private _housekeeperbtn:BaseButton = null;
	private _homeBottomBtns:BaseButton[] = [];

	private _houseFuncBtn:BaseButton = null;
	private _sixSectionBtn:BaseButton = null;
	private _isShowHouseFunc:boolean = false;
	private _houseFuncBtnContainer:BaseDisplayObjectContainer = null;

	private _taskArrow:BaseLoadBitmap = null;

	public constructor() 
	{
		super();
		//玩家基础信息发生变化的刷新
	}

	private initMessage():void
	{
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_SCENESCROLL,this.checkShowCityDailyBossBtn,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FQSTRATEG_SWITCH,this.initFQStrategyIcon,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_NEEDGUIDE,this.needZQFGuide,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doRefreshTaskInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.doRefreshTaskInfo,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.resertMale,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.doRefreshTaskInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT,this.checkAchPoint,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkActivityIconState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPointByModel,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.checkWanBaIcon,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreshText,this);
		
		//功能预览
	    App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT,this.checkIsRefresh,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshText,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initCoverIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initBindIcon,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REALNAME,this.createRealnameRedHot,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_GETMSG),this.freshChatMsg,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.freshPrichat,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.freshPrichatRed,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END,this.rookieGuideEndCheck,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_TASK_END,this.taskEndHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,this.checkChangeBgState,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS,this.checkRealnameRewards,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_MEET_BEAUTY,this.checkMeetBeautyIcon,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_MAINUI_PACKUP,this.singleLineButtonPackUp,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_SENDUSERMSG),this.checkUserMsgIcon,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.checkQingyuanRed, this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_HOUSEUPBTN_GUIDE, this.freshGuide, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_SERVANTBANISH, this.checkQingyuanRed, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN_HOUSEFUNC, this.checkHouseFuncBtn, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunction, this);
		
	}
	/**
	 * 填内容
	 */
	protected init():void
	{	
		if(Api.playerVoApi.getPlayerLevel() >= Config.ServantweaponCfg.lvNeed && Api.zhenqifangVoApi.getInitial()){
			Api.rookieVoApi.curGuideKey = "zhenqifang";
		}
		this._aniBlackMask = BaseBitmap.create(ResourceManager.getRes("public_9_bg84")); 
		this._aniBlackMask.width = GameConfig.stageWidth+100;
		this._aniBlackMask.height = GameConfig.stageHeigth+100;
		this._aniBlackMask.x = this._aniBlackMask.y = -50;
		this._aniBlackMask.alpha = 0;

		this.initTop();
		this.initButtom();

		// 初始化后刷新邮件状态
		this.checkMailState();
		if(Api.switchVoApi.checkAutoLoadDefaultRes())
		{
			App.LoginResLoader.autoLoadNextResItem();
		}

		this.checkEmpBtn();
		// this.checkExamBtn();
		if (PlatformManager.checkShowBackApp())
		{
			this._tuyouBackToLobby = ComponentManager.getButton("loginres_btn4","",this.backToLobbyHandler,this);
			this._tuyouBackToLobby.setPosition(10,120);
			this.addChild(this._tuyouBackToLobby);
			this._tuyouBackToLobby.visible = false;
		}
		if(Api.promoteVoApi._showNotice){
			Api.promoteVoApi._showNotice = false;
			ViewController.getInstance().openView('PromoteNoticeView');
		}
		PlatformManager.isUserInRedPackageActivity(this.initMoneyIcon,this);
		GameData.acPopTime = GameData.serverTime;

		//特效
		this.showEnterAni(true);

		this.initMessage();
	}

	private get _isAtHome():boolean
	{
		return SceneController.getInstance().checkisAtHomeScene();
	}

	private checkEmpBtn():void
	{
		if(Api.switchVoApi.checkEmperorOpen()==true )
		{	
			let api = Api.emperorwarVoApi;
			if (api.getVersion() > 0 && api.isInShow())//api.getVersion() > 0 && api.isInShow()
			{	
				let cfg = Config.EmperorwarCfg;
				TimerManager.remove(this.checkEmpBtn,this);
				if (!this._empBtn)
				{
					this.create_empBtn();
				}
				// if(!Api.servantVoApi.getServantObj(String(cfg.servant))){
				// 	let curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
				// 	if(curNum >= cfg.exchangeNum){
				// 		App.CommonUtil.addIconToBDOC(this._empContainer)
				// 	}
				// 	else{
				// 		App.CommonUtil.removeIconFromBDOC(this._empContainer)
				// 	}
				// }
				// else{
				// 	App.CommonUtil.removeIconFromBDOC(this._empContainer)
				// }
				TimerManager.doTimer((api.getet()-GameData.serverTime+86400)*1000,1,this.checkEmpBtn,this);
			}	
			else
			{
				if (this._empBtn)
				{
					this.disposeEmpBtn();
				}
			}
		}
	}

	private disposeEmpBtn(){
		this._empBtn = null;
		egret.Tween.removeTweens(this._empCircle);
		this._empTitleCircle = null;
		egret.Tween.removeTweens(this._empTurnCircle);
		this._empTurnCircle = null;
		let scanclip : any = this._empContainer.getChildByName('scanclip');
		if(scanclip){
			scanclip.stop();
			scanclip.dispose();
			scanclip = null;
		}

		let emplight : any = this._empContainer.getChildByName('emplight');
		if(emplight){
			egret.Tween.removeTweens(emplight);
			emplight = null;
		}

		if(this._empContainer){
			this._empContainer.dispose();
			this._empContainer = null;
		}
	}

	private create_empBtn():void{
		let empContainer = new BaseDisplayObjectContainer();
		empContainer.width = empContainer.height = 120;
		// this.setLayoutPosition(LayoutConst.rightbottom, empContainer, this, [10, 120]);
		empContainer.x = 520;
		empContainer.y = (GameConfig.stageHeigth - 300);
		if(this._friendsBtn)
		{
			empContainer.y -=  (this._friendsBtn.height - 20);
		}
		this._empContainer = empContainer;
		this.addChild(empContainer);

		empContainer.y = this._friendsBtn ?  this._friendsBtn.y -  empContainer.height : this._houseFuncBtn.y - empContainer.height;
		// this._bottomContiner.addChild(empContainer);
		this._rightBtnContainer.addChild(empContainer);
		let empBtn = ComponentManager.getButton(``,``,this.empClick,this);
		empBtn.width = empBtn.height = 100;
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empBtn, empContainer, [0,0], true);
		empContainer.addChild(empBtn);
		let btnbg = BaseBitmap.create(`empBtnBg`);
		empBtn.addChild(btnbg);
		this._empBtn = empBtn;
		

		let circle = BaseBitmap.create('empcircle');
		circle.anchorOffsetX = circle.width / 2;
		circle.anchorOffsetY = circle.height / 2;
		circle.setScale(1.1);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circle, empBtn, [60*1.1,59*1.1]);
		empContainer.addChild(circle);
		egret.Tween.get(circle,{loop : true}).to({rotation : -360} , 1500);
		this._empCircle = circle;

		let empTitleCircle = BaseBitmap.create('emptitlecircle');
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empTitleCircle, empBtn);
		empContainer.addChild(empTitleCircle);
		// egret.Tween.get(empTitleCircle,{loop : true}).to({rotation : 360} , 1500);
		this._empTitleCircle = empTitleCircle;

		let empturncircle = BaseBitmap.create('empturncircle');
		empturncircle.width = empturncircle.height = 120;
		empturncircle.anchorOffsetX = empturncircle.width / 2;
		empturncircle.anchorOffsetY = empturncircle.height / 2;
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empturncircle, empBtn, [60, 60]);
		empContainer.addChild(empturncircle);
		egret.Tween.get(empturncircle,{loop : true}).to({rotation : -360} , 8000);
		this._empTurnCircle = empturncircle;
		

		let clip = ComponentManager.getCustomMovieClip('empbtn',11, 100);
		clip.width = 70;
		clip.height = 63;
		// clip.anchorOffsetX = 35;
		// clip.anchorOffsetY = 63/2;
		clip.setFrameEvent(11,()=>{
			egret.Tween.get(clip).wait(1000).call(()=>{
				clip.playWithTime(1);
			},this);
			//clip.retain();
			// clip.
		},this);
		clip.setFrameEvent(7,()=>{
			egret.Tween.get(emplight).to({scaleX : 1.5, scaleY : 1.5},500).to({rotation : 60},500).call(()=>{
				emplight.setScale(0.5);
			},this);
			egret.Tween.get(emplight).to({alpha : 1},350).wait(500).to({alpha : 0},150);
			//clip.retain();
			// clip.
		},this);
		clip.playWithTime(1);
		clip.name = 'scanclip'
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, empContainer, [0,0], true);
		empContainer.addChild(clip);

		let btn = BaseBitmap.create(`empBtnname`);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btn, empBtn, [0,42]);
		if (Api.switchVoApi.checkOpenHouseBtnUp()){
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btn, empBtn, [0,50]);
		}
		empContainer.addChild(btn);

		let emplight = BaseBitmap.create('emplight');
		emplight.name = 'emplight';
		emplight.width = emplight.height = 70;
		emplight.anchorOffsetX = emplight.width / 2;
		emplight.anchorOffsetY = emplight.height / 2;
		//this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, empturncircle, empBtn, [60, 60]);
		this.setLayoutPosition(LayoutConst.lefttop, emplight, empTitleCircle, [65,10]);
		empContainer.addChild(emplight);
		emplight.alpha = 0;
		emplight.setScale(0.5);
	}

	private backToLobbyHandler():void
	{	
		SoundManager.isInBackground = true;
		SoundManager.pauseBg();
		PlatformManager.logout();
	}

	private empClick():void{

		if(Api.rookieVoApi.isGuiding && ( Api.rookieVoApi.curStep == "wife_1" ||  Api.rookieVoApi.curStep == "14_1"))
		{
			return;
		}

		let api = Api.emperorwarVoApi;
		if(api.judgeType() == 5){
			ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENDSHOWVIEW);
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENTERVIEW);
		}
	}

	/**科举答题 */
	private checkExamBtn():void{
		// if(Api.switchVoApi.checkExamOpen() == true && Api.examVoApi.isInPeriod() == true)
		if (this._isAtHome){
			if (Api.switchVoApi.checkExamOpen() == true && Api.examVoApi.isInPeriod() == true && Api.examVoApi.isInVersion() == true)
			{	
				if (!this._bottomContiner){
					return;
				}
				if (!this._examContainer){
					this.createExamBtn();
				}	
				else
				{
					// if (this._empBtn){
					// 	this._examBtn.x = this._empContainer.x - this._examBtn.width + 10;
					// }
					// else{
					// 	this._examBtn.x = GameConfig.stageWidth - this._examBtn.width - 20;
					// }
					// this._examBtn.visible = true;
					if (this._empContainer){
						this._examContainer.x = this._empContainer.x - this._examContainer.width - 8; //-1
						// if (Api.switchVoApi.checkOpenHouseBtnUp()){
						// 	this._examContainer.x = GameConfig.stageWidth - this._examContainer.width - 15;	
						// }
						// else{
						// 	this._examContainer.x = this._empContainer.x - this._examContainer.width - 9;
						// }
					}
					else{
						if (Api.switchVoApi.checkOpenHouseBtnUp()){
							this._examContainer.x = GameConfig.stageWidth - this._examContainer.width - 22;	
						}
						else{
							this._examContainer.x = GameConfig.stageWidth - this._examContainer.width - 33;
						}
					}
					this._examContainer.visible = true;
					this.checkExamRedPoint();
				}
			}
			else{
				if (this._examContainer){
					this._examContainer.visible = false;
				}
			}
		}
	}

	private createExamBtn():void{
		let examContainer = new BaseDisplayObjectContainer();
		examContainer.width = examContainer.height = 82;
		
		this._examContainer = examContainer;
		examContainer.x = GameConfig.stageWidth - examContainer.width - 33;
		// examContainer.y = GameConfig.stageHeigth - 360;
		// this.addChild(examContainer);
		examContainer.y = -335;
		if (Api.switchVoApi.checkOpenHouseBtnUp()){
			examContainer.x = GameConfig.stageWidth - examContainer.width - 22;
			examContainer.y = -350;
		}
		// this._bottomContiner.addChild(examContainer);
		this._rightBtnContainer.addChild(examContainer);

		let examBtn = ComponentManager.getButton("exam_icon", "", this.examBtnClick, this);
		examBtn.setPosition(examContainer.width/2 - examBtn.width/2, examContainer.height/2 - examBtn.height/2);
		if (this._empBtn){
			// examBtn.x = this._empContainer.x - examBtn.width + 10;
			examContainer.x = this._empContainer.x - examBtn.width - 8; //-1
		}
		this._examBtn = examBtn;
		examContainer.addChild(examBtn);

		// let btnCircleEffect = ComponentManager.getCustomMovieClip("exam_effect_btn_circle", 9, 100);
		// btnCircleEffect.setPosition(-17, -16);
		// btnCircleEffect.setScale(1.2);
        // btnCircleEffect.playWithTime(-1);
		// examContainer.addChild(btnCircleEffect);
		
		let btnEffect = ComponentManager.getCustomMovieClip("exam_effect_btn", 9, 100);
		btnEffect.setPosition(-4, -18);
		btnEffect.setScale(1.1);
        btnEffect.playWithTime(-1);
		examContainer.addChild(btnEffect);
		
		let btnName = BaseBitmap.create("exam_icon_name");
		btnName.setPosition(0, examBtn.y + examBtn.height - btnName.height/2 + 3);
		examContainer.addChild(btnName);
	}

	private examBtnClick():void{
		if (Api.rookieVoApi.isGuiding)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.EXAMVIEW);
	}

	private checkExamRedPoint():void{

		let bool = Api.examVoApi.isShowRedDot();
		if (!this._examContainer){
			return;
		}
		if(bool)
		{
			App.CommonUtil.addIconToBDOC(this._examContainer);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._examContainer);
		}
	}

	//明君出巡
	private creatEmpOutingBtn():BaseDisplayObjectContainer{
		let container = new BaseDisplayObjectContainer();
		// let outingBtnBg = BaseBitmap.create("mainui_empoutbtnbg");
		let outingBtnBg = ComponentManager.getButton("mainui_empoutbtnbg", "", this.outingBtnClickHandler, this);
		container.addChild(outingBtnBg);
		container.width = outingBtnBg.width;
		container.height = outingBtnBg.height;
		// outingBtnBg.addTouchTap(this.outingBtnClickHandler, this);

		let outingBtnAni = ComponentManager.getCustomMovieClip("emperorouting_homeiconeffect", 10, 70);
		outingBtnAni.setPosition(0,0);
		container.addChild(outingBtnAni);
		outingBtnAni.playWithTime(0);

		let iconAni:BaseBitmap = BaseBitmap.create("mainui_iconani");
		iconAni.anchorOffsetX = iconAni.width/2;
		iconAni.anchorOffsetY = iconAni.height/2;
		iconAni.setScale(1.2);
		iconAni.setPosition(container.width/2 , container.height/2);
		container.addChild(iconAni);
		egret.Tween.get(iconAni,{loop:true})
			.to({rotation: 360}, 1000);

		let btnNameBg = BaseBitmap.create("mainui_empoutbtn_name");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btnNameBg, outingBtnBg, [0, -5]);
		container.addChild(btnNameBg);

		return container;
	}
	
	private initTop():void
	{	
		
		this._topContiner=new BaseDisplayObjectContainer();
		this.addChild(this._topContiner);

		if(App.DeviceUtil.checkIsSeascreen()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
		{
			this._topContiner.y=GameConfig.seaScreenTopH;
		}
		
		if(Api.switchVoApi.checkOpenVoice())
		{
			//声音区分
			let type = LocalStorageManager.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);
			if(type=="true")
			{
				SoundManager.setVoiceOn(true);
			}
			else
			{
				SoundManager.setVoiceOn(false);
			}
		} 
		
		//填内容
		let topbg = new MainUINewTop({showName:true});
		this._topContiner.addChild(topbg);
		this._topbg = topbg;

		this._iconContainer=new BaseDisplayObjectContainer();
		this._iconContainer.y=113;
		this._topContiner.addChild(this._iconContainer);
		//左侧内容
		this._leftIconContainer = new BaseDisplayObjectContainer();
		this._leftIconContainer.x = -10;
		this._leftIconContainer.y = 100;
		this._leftIconContainer.width = 130;
		this._topContiner.addChild(this._leftIconContainer);

		this._leftIconArrowContainer = new BaseDisplayObjectContainer();
		this._leftIconArrowContainer.width = 67;
		this._leftIconArrowContainer.height = 54;
		this._leftIconArrowContainer.anchorOffsetX = this._leftIconArrowContainer.width / 2;
		this._leftIconArrowContainer.x = 50;
		this._leftIconArrowContainer.y = 100;
		this._leftIconArrowContainer.scaleX = -1;
		this._topContiner.addChild(this._leftIconArrowContainer);
		this._leftIconArrowContainer.addTouchTap(()=>{

			if (Api.rookieVoApi.isGuiding)
			{
				return;
			}
			//打开弹窗
			this._leftIconArrowContainer.scaleX = -this._leftIconArrowContainer.scaleX;
			let redpot = this._leftIconArrowContainer.getChildByName(`reddot`);
			if(redpot){
				redpot.x = this._leftIconArrowContainer.scaleX == 1 ? 45 : 0;
				redpot.y = 0;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.BIGICONLEFTMOREPOPUPVEW,{
				callback : ()=>{
					this._leftIconArrowContainer.scaleX = -this._leftIconArrowContainer.scaleX;
					let redpot = this._leftIconArrowContainer.getChildByName(`reddot`);
					if(redpot){
						redpot.x = this._leftIconArrowContainer.scaleX == 1 ? 45 : 0;
						redpot.y = 0;
					}
				},
				handler : this,
				posY : this._topContiner.y + this._leftIconArrowContainer.y
			});

		}, this, null);

		if(Api.switchVoApi.checkLeftActIconOpen() && Config.BigiconCfg.getBigIcon().length > 0){
			this._iconContainer.x = 100;
			this._iconContainer.width = GameConfig.stageWidth - 130;
		}

		//跑马灯
		this._lampRoll = new LampRoll();
		if(!this._isAtHome && Api.chatVoApi.getLastCrossMessage()){
			this._lampRoll.y = 185; 
		}
		else{
			this._lampRoll.y = 106;
		}
		this._topContiner.addChild(this._lampRoll);
		
		if(Config.AcCfg.isGetAll)
		{
			this.initIconsAndCheckStatus();
		}
		else
		{
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		}
		

	}

	private freshChatMsg(evt):void{
		let view = this;
		Api.chatVoApi.clearPriChatList();
		Api.chatVoApi.setPriChatList(evt.data.data.data);
		view._redPoint.visible = Api.chatVoApi.checkMianUIRedDot();
	}

	private freshPrichatRed(evt):void{
		let view = this;
		view._redPoint.visible = Api.chatVoApi.checkMianUIRedDot()
	}

	private rookieGuideEndCheck(evt):void
	{
		if (PlatformManager.checkIsGDTAD1User() || PlatformManager.checkIsGDTAD2User())
		{
			ViewController.getInstance().openView("DesktopPopupView");
		}

		if (this._singleLineButton)
		{
			this._singleLineButton.pickup();
		}

		if (this._taskArrow)
		{
			this._taskArrow.visible = true;
		}
	}

	private singleLineButtonPackUp(evt):void
	{
		if (this._singleLineButton)
		{	
			if (this._singleLineButton._status==1)
			{	
				this._singleLineButton.packUp();
				this.singleLineHandle();
				
			}
		}
	}

	private freshPrichat(evt):void{
		let view = this;
		//Api.chatVoApi.clearPriChatList();
		if(evt.data.data.data['privatechat.info']){
			Api.chatVoApi.setPriChatList(evt.data.data.data['privatechat.info']);
			view._redPoint.visible = Api.chatVoApi.isNewMsg()
		}
	}

	private friendsBtnHandler()
	{
		if(!Api.friendVoApi.isShowNpc())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip",[LanguageManager.getlocal("officialTitle" + GameConfig.config.friendCfg.needLv)]));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.FRIENDSVIEW);
	}

	private housekeeperHandler():void
	{	
		if(Api.shopVoApi.ifBuyButler())
		{
			ViewController.getInstance().openView(ViewConst.COMMON.HOUSEKEEPERVIEW,{});
			this.checkHousekeeperBtnRed();
		}
		else
		{	
			let msg = LanguageManager.getlocal("housekeeper_buy_tip");
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:msg,
                callback:()=>{
                    ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWHOUSEKEEPER);
                },
                handler:RSDKHelper,
                needCancel:true
            });
			Api.housekeeperVoApi.setSaveWeekTime();
			this.checkHousekeeperBtnRed();
		}
	}

	private wxgameKefuBtnHandler()
	{
		RSDKHelper.showWxCustomerService();
	}

	private checkAllRedPoint():void
	{
		for(let key in this.bottomBtnCfg)
		{
			this.checkRedPointByModel(this.bottomBtnCfg[key].btnName);
		}
	}

	private checkRedPointByModel(e:egret.Event|string):void
	{
		if(!this._bottomContiner)
		{
			return;
		}
		let modelName:string=(e instanceof egret.Event)?e.data:e;
		let btn:BaseButton = <BaseButton>this._bottomContiner.getChildByName(modelName);
		if(btn)
		{
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].checkRedPoint)
			{
				let showRedPoint:boolean=Api[modelName+"VoApi"].checkRedPoint();
				let redSp:BaseBitmap;
				if(showRedPoint)
				{
					App.CommonUtil.addIconToBDOC(btn);
					let redpoint = btn.getChildByName("reddot");
					if(Api.switchVoApi.chekcOpenNewUi()){
						redpoint.x = 64;
						redpoint.y = 10;
					}	
					
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(btn);
				}
			}
		}
		if(modelName==MessageConst.MESSAGE_MODEL_SHOP||modelName==MessageConst.MESSAGE_MODEL_USERINFO)
		{
			this.checkVipState();
			this.checkThanksg(); 
			this.checkMultiple();
			this.checkChangeBgState();

			if (this._isAtHome && this._housekeeperbtn && this._housekeeperbtn.visible == false && Api.playerVoApi.getPlayerLevel() >= Config.MasterCfg.levelLimit)
			{	
				this._housekeeperbtn.visible = true;
				this.resetHomeBottomBtns();
			}
			this.checkHousekeeperBtnRed();
		} 
		else if (modelName==MessageConst.MESSAGE_MODEL_OTHERINFO)
		{
			this.checkChangeBgState();
		}
		else if (modelName==MessageConst.MESSAGE_MODEL_SERVANTBANISH)
		{
			this.checkQingyuanRed();
		}
		if(modelName==MessageConst.MESSAGE_MODEL_SHOP)
		{
			this.checkLimitedGiftRedPoint();
		}
		this.checkZhenQiFangState();
		this.checkStrengthenState();
		this.checkSixSectionState();
		this.checkHouseFuncState();
	}

	//门客 情缘红点
	private checkQingyuanRed():void{
		this.checkRedPointByModel("servant");
	}

	// 指引攻略  我要变强红点
	private checkStrengthenState():void
	{
		let strengthenIcon = this.getTopBtnByName("fqStrategy"); 
		if(strengthenIcon)
		{
			let fqSwitch = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
			var isboo  =  Api.switchVoApi.checkOpenStrengthen();
			var isboo2:boolean  =  false;
			if(Config.GameprojectCfg.closeFunction&&Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction)
			{
				isboo2 =true;
			} 
			
			if(isboo&&isboo2&&Api.strengthenVoApi.checkNpcMessage()&&fqSwitch != "OFF")
			{
				App.CommonUtil.addIconToBDOC(strengthenIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(strengthenIcon);
			}
		}
	} 

	private checkAchPoint()
	{	
		let achBtn = <BaseButton>this._bottomContiner.getChildByName("achieve");
		if (achBtn)
		{
			if(Api.achievementVoApi.getAchGetNum() > 0)
			{
				App.CommonUtil.addIconToBDOC(achBtn);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(achBtn);
			}
		}
	}

	private tick():void
	{
		if(GameData.checkTimeLimitWife())
		{
			let container = null;
			if(Api.switchVoApi.checkLeftActIconOpen()){
				container = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("timelimitwife_");
			}
			else{
				container = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("timelimitwife_func");
			}
			
			if(container)
			{
				let vo = Api.shopVoApi.getPayInfoById2("g16");
				let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
				let str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime  - GameData.serverTime,1);
				let timeTF =  <BaseTextField>container.getChildByName("timelimitwife_TF");
				if(timeTF)
				{
					timeTF.text = str;
				}
			}	
		}
		else
		{
			this.removeMainUIIcon("timelimitwife");
		}
		this.checkGrowGold();
		this.checkWanba11Icon();
		this.initSevenDaysSignUpIcon();
		//限时礼包
		if(Api.switchVoApi.checkLimitedGift())
		{
			let time = Api.limitedGiftVoApi.checkHaveLimitedGift();
			if (time > 0){
				
				let container = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("limitedgift_func");
				if(container)
				{
				
					let str =  App.DateUtil.getFormatBySecond(time,1);
					let timeTF =  <BaseTextField>container.getChildByName("limitedgiftTimeTF");
					if(timeTF)
					{
						timeTF.text = str;
					}
				} else {
					//需要创建图标
					container = this.createMainUIIcon("limitedgift");
					let str =  App.DateUtil.getFormatBySecond(time,1);
					let timeTF =  <BaseTextField>container.getChildByName("limitedgiftTimeTF");
					if(!timeTF)
					{
						//时间文本背景
						// let timeBg = BaseBitmap.create("public_icontimebg");
						let timeBg = BaseBitmap.create("public_9_mainicontimebg");
						
						container.addChildAt(timeBg,0);
						timeTF = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_RED2)
						timeTF.setPosition(container.x + container.width / 2 - timeTF.width / 2,container.y + 80 - timeTF.height / 2);
						timeTF.name = "limitedgiftTimeTF";
						if(PlatformManager.checkIsThSp()||PlatformManager.checkIsRuLang())
						{
							timeTF.y = container.y + 80;
						}
						timeBg.width = timeTF.width + 8;
						timeBg.height = timeTF.height + 2;
						timeBg.x = timeTF.x + timeTF.width/2 - timeBg.width/2;
						timeBg.y = timeTF.y + timeTF.height/2 - timeBg.height/2;
						container.addChild(timeTF);
					}

				}
			} else {
				this.removeMainUIIcon("limitedgift");
			}
		}
		else
		{
			this.removeMainUIIcon("limitedgift");
		}


		let shareIcon = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("share_func");
		let vo = Api.otherInfoVoApi.getGeneralShareInfo();
		if(shareIcon&&vo)
		{
			if(vo.et && vo.et == 0 || vo.et <= GameData.serverTime)
			{
				App.CommonUtil.addIconToBDOC(shareIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(shareIcon);
			}
		}

		// if(Api.switchVoApi.checkClosePay())
		// {
		// 	return;
		// }

		if(this._friendsBtn && Api.friendVoApi.isShowNpc())
		{
			this._friendsBtn.setGray(false);
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.checkIsCanShowFunc("friend")){
					this._friendsBtn.visible = this._isAtHome;
				}
				else{
					this._friendsBtn.visible = false;
				}
			}
			else{
				this._friendsBtn.visible = this._isAtHome;
			}
			if( Api.friendVoApi.isShowRedForEnter() ){
				App.CommonUtil.addIconToBDOC(this._friendsBtn);
				let reddot = this._friendsBtn.getChildByName("reddot");
				reddot.x = 51;
				reddot.y =  10;
			}else{
				App.CommonUtil.removeIconFromBDOC(this._friendsBtn);
			}
		}
		this.check12BoxIcon();
		if (Api.switchVoApi.checkLeftActIconOpen())
		{	
			this.sortLeftIcon();
			this.initLeftIcon();
			this.checkLeftRedpoint();
			this.setLeftIconPos();
		}
		else
		{	
			this.sortLeftIcon();
			this.checkLeftRedpoint();
			this.setIconsPos();
		}
		

		let isSort:boolean = false;
		let l:number=this._activityIconList.length;
		if(l>0)
		{
			let isdelete:boolean=false;
			for(let i:number=l-1;i>=0;i--)
			{
				isdelete = false
				let icon:BaseDisplayObjectContainer=this._activityIconList[i];
				let name:string=icon.name;
				let [aid,code]=name.split("-");
				// let aidArr:string[]=Config.IconorderCfg.getAidListByCfgName(aid);
				let aidArr:string[]=Api.acVoApi.getAcListForAid(aid);
				if(aidArr&&aidArr.length>0)
				{
					let needCheckId:string[]=aidArr;
					//组合中任一活动处于开启状态，则不能移除
					for(let ii:number=0;ii<needCheckId.length;ii++)
					{
						let tmpAid = needCheckId[ii].split("-")[0];
						let tmpCode = needCheckId[ii].split("-")[1];
						let acvo=Api.acVoApi.getActivityVoByAidAndCode(tmpAid,tmpCode?tmpCode:code);
						if(acvo)
						{	
							if (acvo.checkIsAtEndShowTime())
							{
								isSort = true;
							}
							if(Api.acVoApi.checkActivityStartByAid(tmpAid,code)==false||acvo.isShowIcon==false)
							{
								isdelete = true;
							}else{
								isdelete=false;
								break;
							}
						}
					}
				}else{
					let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
					if(acvo && (acvo.isShowIcon==false || Api.acVoApi.checkActivityStartByAid(aid,code)==false))
					{
						isdelete = true;
					}
					else if (acvo && acvo.checkIsAtEndShowTime())
					{
						isSort = true;
					}
				}
				
				if(isdelete)
				{
					icon.dispose();
					this._activityIconList.splice(i,1);
					delete this._iconNameList[icon.name];
					isSort = true;
				}
				

				this.setIconTime(icon);
			}
			if(isSort||(this._lastL!=l))
			{
				this.sortIcons();
				this.setIconsPos();
			}
			this.checkActivityIconState();
		}
		this._lastL=this._activityIconList.length;

		Api.acVoApi.checkLimitShowAc();

		if (Api.acVoApi.checkIsHasNewAc())
		{
			this.showNewActivityIcons();
			this.tick();
			return;
		}
		this.checkExamBtn();

		if (this._singleLineButton)
		{
			if (!App.DateUtil.checkIsToday(this._singleLineTime))
			// if ( GameData.serverTime %10 == 0)
			{
				this._singleLineTime = GameData.serverTime;
				if (this._singleLineButton._status != 1)
				{
					this._singleLineButton.pickup();
				}
			}
		}
		this.freshEmpOutBtn();
		this.checkShowCityDailyBossBtn();
		//是否显示巡街动画

		//皇城六部红点
		this.checkSixSectionState();
	}
	private setIconTime(icon)
	{
		// egret.log(icon.name)
		if(icon.name == "newcharge_func" || icon.name == "JD618_func"){
			let lt = 0;
			let timeStr = "";
			if(icon.name == "newcharge_func"){
				lt = Api.shopVoApi.getPayInfo1Time();
				timeStr = App.DateUtil.getFormatBySecond(lt,1);
			}else if(icon.name == "JD618_func")
			{
				timeStr = Api.otherInfoVoApi.getJD618ActivetyTimeStr();
				if(timeStr == "")
				{
					return;
				}
			}

			if(icon.getChildByName("time")){
				let textTxt = <BaseTextField>icon.getChildByName("time");
				textTxt.text = timeStr;
				textTxt.anchorOffsetX = textTxt.width/2;
			}else{
				let timeBg = BaseBitmap.create("public_9_bg15"); 
				timeBg.width = 160;
				timeBg.anchorOffsetX = timeBg.width/2;
				timeBg.x = icon.width/2;
				timeBg.y = 32;
				timeBg.setScale(0.5)
				icon.addChild(timeBg)
				let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_WARN_GREEN);
				timeTF.anchorOffsetX = timeTF.width/2;
				timeTF.x = icon.width/2;
				timeTF.y = 34;
				timeTF.name = "time"
				icon.addChild(timeTF)
			}
		}
	}
	//12元礼包
	private check12BoxIcon()
	{
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag > 0 && Api.switchVoApi.checkOpenNewCharge())
		{
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			if(rechargeItemCfg)
			{
				let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
				let itemVo2 = Api.shopVoApi.getPayInfoById2("g10");
				if(itemVo1&&itemVo1.st + rechargeItemCfg.lastTime > GameData.serverTime ){
					// egret.log(itemVo1.st + rechargeItemCfg.lastTime - 3000 - GameData.serverTime)
				// if(itemVo1&&itemVo1.st + rechargeItemCfg.lastTime - 3000 > GameData.serverTime ){
					this.createMainUIIcon("newcharge");
				}
				else{
					this.removeMainUIIcon("newcharge");
				}
			}
			else{
				this.removeMainUIIcon("newcharge");
			}
		}
		else{
			this.removeMainUIIcon("newcharge");
		}
	}
	
	//京东618礼包
	private checkJD618BoxIcon()
	{
		if(Api.otherInfoVoApi.isJDActiveIconVisible())
		{
			this.createMainUIIcon("JD618");
		}
		else{
			this.removeMainUIIcon("JD618");
		}
	}
	// 腾讯视频入口引导
	private initQqvideoguideIcon()
	{
		if (PlatformManager.getIsWanbaQQLive()) {
			this.createMainUIIcon("qqvideoguide");

			// this.createMainUIIcon("qqvideoquestionnaire");
			//调查按钮已经无效 by shaolaing (10.15)
		}
	}
	private initIconsAndCheckStatus():void
	{		

		// if(Api.switchVoApi.checkClosePay())
		// {
		// 	return;
		// }
		this.initIcons();
		this.setPosAndCheckState();
		//此方法禁止单独添加icon
		TickManager.addTick(this.tick,this);
		this.tick();
	}	

	private initIcons():void
	{
		this.initFQStrategyIcon()
		this.initVipIcon();
		this.initRebateIcon();
		this.initRealnameIcon();
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		let acIconList=Api.acVoApi.getAllActivityIcons();
		let l:number=acIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=acIconList[i];
			this._iconNameList[icon.name.split("_")[0]]=icon;
			this._iconContainer.addChild(icon);
			this._activityIconList.push(icon);
		}
		this.checkThGiftIcon();
		this.initFuliIcons();
		this.checkWanBaIcon();
		this.initCardIcons();
		this.check12BoxIcon();
		this.initContactIcon();
		// this.checkRankActiveIcon();
		this.initTimeLimitWifeIcon();

		this.checkCandyIcon();
		this.initAndCheckAttentionIcon();
		this.initDownloadIcon();
		this.initInviteIcon();
		this.initZhubowanghongIcon();
		this.initCoverIcon();
		this.initBindIcon();

		this.checkJD618BoxIcon()//检测京东618,只需京东渠道检测吧;
		this.initQqvideoguideIcon()//腾讯视频，入口引导 
		this.checkIsPlayerReturn();
		this.initLimitedGiftIcon();
		this.checkIconExtend();
		this.checkIconSingleLine();
		this.checkWanba11Icon();

		this.checkUserMsgIcon();//用户信息登记

		this.initSevenDaysSignUpIcon();
		this.checkGrowGold();

		if(Api.switchVoApi.checkLeftActIconOpen()){
			this.sortLeftIcon();
			this.initLeftIcon(true);
			this.setLeftIconPos();
						
			this._leftIconArrowContainer.x = 50;
			this._leftIconArrowContainer.y = this._leftIconContainer.y + this._leftIconContainer.height + 10;

			let arrow = BaseBitmap.create(`public_lefticonarrow`);
			this._leftIconArrowContainer.addChild(arrow);

			let eff = ComponentManager.getCustomMovieClip(`lefticonarrow`, 10);
			eff.width = 67;
			eff.height = 54;
			eff.playWithTime(-1);
			this._leftIconArrowContainer.addChild(eff);
		}
		this.initMeetBeautyIcon();
		this.initBureaucrat_GuideIcon();
		this.initIconQianFu();
		this.sortIcons();
	}

	private checkIsPlayerReturn():void{
		if(Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime())
		{
			if(Api.playerReturnVoApi.getRebackRewards() != '' && !ViewController.getInstance().checkHasShowedView() ){
				ViewController.getInstance().openView(ViewConst.POPUP.REBACKPOPUPVIEW);
			}
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, this.checkReturnState,this);
			this.createMainUIIcon("playerReturn");
			this.checkReturnState();
		}
		else{
			this.removeMainUIIcon("playerReturn");
		}
	}

	private checkUserMsgIcon():void
	{
		if(Api.switchVoApi.checkOpenWelcomeVipGift() && Api.playerVoApi.getPlayerVipLevel()>=7 && !Api.otherInfoVoApi.checkUserMsg())
		{
			this.createMainUIIcon("userMsg");
			let userMsg = this.getTopBtnByName("userMsg");
			App.CommonUtil.addIconToBDOC(userMsg);
		}
		else
		{
			this.removeMainUIIcon("userMsg");
		}
	}

	private checkReturnState():void{
		let returnIcon = this.getTopBtnByName('playerReturn');
		if(returnIcon){
			if(Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime())
			{
				let boo =Api.playerReturnVoApi.isShowRedDot;
				if(boo)
				{
					App.CommonUtil.addIconToBDOC(returnIcon);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(returnIcon);
				}
			}
			else{
				this.removeMainUIIcon("playerReturn");
			}
		} 
	}

	private setPosAndCheckState():void
	{
		this.sortIcons();
		this.setIconsPos();
		this.checkActivityIconState();
	}



	private sortIcons():void
	{	
		this._pickUpTab.length = 0;
		let that = this;

		this._activityIconList.sort((a:BaseDisplayObjectContainer,b:BaseDisplayObjectContainer)=>{
			let nameA:string=a.name;
			let nameA2:string = null;
			if(nameA)
			{
				if(nameA.indexOf("_")>-1)
				{	
					let names:string[] = nameA.split("_");
					nameA=names[0];
					nameA2 = names[1];
				}
				if(nameA.indexOf("-")>-1)
				{	
					let names:string[] = nameA.split("-");
					nameA=names[0];
					nameA2 = names[1];
				}
			}
			let nameB:string=b.name;
			let nameB2:string = null;
			if(nameB)
			{
				if(nameB.indexOf("_")>-1)
				{	
					let names:string[] = nameB.split("_");
					nameB=names[0];
					nameB2 = names[1];
				}
				if(nameB.indexOf("-")>-1)
				{	
					let names:string[] = nameB.split("-");
					nameB=names[0];
					nameB2 = names[1];
				}
			}
			let sortIdA=Config.IconorderCfg.getIconSortIdByCfgName(nameA);
			let sortIdB=Config.IconorderCfg.getIconSortIdByCfgName(nameB);

			if (Api.switchVoApi.checkOpenMainUIIconExtend())
			{
				if ( (nameA != "rankActive" || (nameA2 && String((Api.acVoApi.getActivityVoByAidAndCode(nameA,nameA2).atype) == "11"))) && Api.acVoApi.getActivityVoByAidAndCode(nameA,nameA2) && Api.acVoApi.getActivityVoByAidAndCode(nameA,nameA2).checkIsInEndShowTime())
				{	
					sortIdA += 1000000001;
					sortIdA += Api.acVoApi.getActivityVoByAidAndCode(nameA,nameA2).getShowTime();

					if (that._pickUpTab.indexOf(a) == -1)
					{
						that._pickUpTab.push(a);
						if ( that._extandButton && that._isInExtanding == false)
						{
							a.visible = (that._extandButton._status == 1);
						}
					}

				}
				if ((nameB != "rankActive" || (nameB2 && String((Api.acVoApi.getActivityVoByAidAndCode(nameB,nameB2).atype) == "11"))) && Api.acVoApi.getActivityVoByAidAndCode(nameB,nameB2) && Api.acVoApi.getActivityVoByAidAndCode(nameB,nameB2).checkIsInEndShowTime())
				{
					sortIdB += 1000000001;
					sortIdB += Api.acVoApi.getActivityVoByAidAndCode(nameB,nameB2).getShowTime();

					if (that._pickUpTab.indexOf(b) == -1)
					{
						that._pickUpTab.push(b);
						if ( that._extandButton && that._isInExtanding == false)
						{
							b.visible = (that._extandButton._status == 1);
						}
					}
				}
			}

			if (sortIdA == sortIdB)
			{
				if (nameA == nameB)
				{
					return Number(nameB2) - Number(nameA2);
				}
				else
				{
					return nameB > nameA ? 1 : -1;
				}
			}
			

			return sortIdA-sortIdB;
		});

		if (this._singleLineButton)
		{	
			this._singleLineTab.length = 0;
			let limit = this.getLimit()+1;

			for (let i = 0; i < this._activityIconList.length; i++)
			{
				if (this._activityIconList[i].name == "singleLine")
				{
					this._activityIconList.splice(i,1);
					break;
				}
			}

			//超过第二行
			if ((this._activityIconList.length - this._pickUpTab.length) > limit)
			{
				this._activityIconList.splice(limit-1,0,this._singleLineButton);
				for (let i = limit; i < this._activityIconList.length; i++)
				{
					this._singleLineTab.push(this._activityIconList[i]);
				}
			}
			else
			{
				this._activityIconList.push(this._singleLineButton);
			}

			this._singleLineButton.setVisible(this._singleLineTab.length>0);
			if (this._extandButton)
			{	
				if (this._pickUpTab.length>0 && this._singleLineButton._status == 1)
				{
					this._extandButton.setVisible( true);
				}
				else
				{
					this._extandButton.setVisible( false);
				}
				if (this._pickUpTab.length>0)
				{
					this.checkActivityIconState();
				}
			}
		}
		else
		{
			if (this._extandButton)
			{
				this._extandButton.setVisible(this._pickUpTab.length>0);
				if (this._pickUpTab.length>0)
				{
					this.checkActivityIconState();
				}
			}
		}
	}
 
	private showNewActivityIcons():void
	{		
		let acIconList=Api.acVoApi.getAllActivityIcons();
		let l:number=acIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=acIconList[i];
			let nameKey:string = icon.name.split("_")[0];
			if (!this._iconNameList[nameKey])
			{	
				this._iconNameList[nameKey]=icon;
				this._iconContainer.addChild(icon);
				this._activityIconList.push(icon);
			}
		}
		this.checkActivityIconState();
		this.sortIcons();
	}

	private checkRankActiveIcon()
	{
		if(Api.acVoApi.getRanActives().length>0){
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("rankActive")
		}
		else{
			this.removeMainUIIcon("rankActive")
			}
	}
	/**七日登陆送 */
	private initSevenDaysSignUpIcon()
	{	
		if (Api.sevenDaysSignupLoginVoApi.checkCreateMainIcon()) {
			let icon: BaseDisplayObjectContainer = this.createMainUIIcon("sevenDaysSignUp" + Api.sevenDaysSignupLoginVoApi.nowType());
			if (Api.sevenDaysSignupLoginVoApi.nowType() == 2) {
				this.removeMainUIIcon("sevenDaysSignUp7");
			}
			else {
				this.removeMainUIIcon("sevenDaysSignUp2");
			}
			if (Api.sevenDaysSignupLoginVoApi.checkShowRedDot()) {
				App.CommonUtil.addIconToBDOC(icon);
			}
			else {
				App.CommonUtil.removeIconFromBDOC(icon);
			}
		}
		else {
			this.removeMainUIIcon("sevenDaysSignUp2");
			this.removeMainUIIcon("sevenDaysSignUp7");
			if(PlatformManager.checkIsRuSp()){
				this.removeMainUIIcon("sevenDaysSignUp1");
			}
			if(PlatformManager.checkIsEnSp()){
				this.removeMainUIIcon("sevenDaysSignUp1");
			}			
		}
	}
	/**
	 * 限时红颜
	 */
	private initTimeLimitWifeIcon()
	{
		if(Api.switchVoApi.checkLeftActIconOpen()){
			return;
		}
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		if(PlatformManager.checkIsThSp()&&App.DeviceUtil.isIOS())
		{
			return;
		}
		if(GameData.checkTimeLimitWife())
		{
			let container = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("timelimitwife_func");
			if(!container)
			{
				let vo = Api.shopVoApi.getPayInfoById2("g16");
				let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
				let str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime - GameData.serverTime,1);
				container = this.createMainUIIcon("timelimitwife",str);
			}
			this.tick();
		}
		else
		{
			this.removeMainUIIcon("timelimitwife");
		}
		
	}
	private initMeetBeautyIcon(){
		this.checkMeetBeautyIcon(null, true);
	}
	/**官路巅峰 */
	private initBureaucrat_GuideIcon() {
		if (PlatformManager.getAppid() == "17009018"||PlatformManager.getAppid()=="17009106") {
			this.createMainUIIcon("bureaucrat_guide");
		}
	}

	/**结识红颜 */
	private checkMeetBeautyIcon(evt:any ,isInit?:boolean)
	{	


		let limitStep = Config.MeetbeautyCfg.getNeedPowerList().length;
		let nowStep = Config.MeetbeautyCfg.getNowPowerStep();
		let iconStr = 'meetbeauty_icon';
		if(nowStep){
			iconStr =  iconStr + '_' + nowStep;
		}
		if (Api.switchVoApi.checkMeetBeautyOpen() && nowStep < limitStep) {
			if(isInit){
				this.createMainUIIcon("meetbeauty");
			}
			else{
				// let iconContainer = this.createMainUIIcon("meetbeauty");
				// let icon =  <BaseLoadBitmap>iconContainer.getChildByName('icon');
				// icon.setRes(iconStr);
			}
		}
		else {
			this.removeMainUIIcon("meetbeauty");
		}
	}

	/**
	 * 创建红包的Icon
	 */
	private initMoneyIcon()
	{
		let modelName = "money";
		this._moneyIconContainer = App.CommonUtil.createMainUIIcon(modelName.toLowerCase()+"_icon",modelName.toLowerCase()+"_icon_name",true);
		this._moneyIconContainer.x = GameConfig.stageWidth - this._moneyIconContainer.width;
		this._moneyIconContainer.y = GameConfig.stageHeigth - 152 - this._moneyIconContainer.height;
		if(this._friendsBtn&&this._friendsBtn.visible)
		{
			this._moneyIconContainer.y -= this._friendsBtn.height;
			if(this._empContainer&&this._empContainer.visible)
			{
				this._moneyIconContainer.y -= this._empContainer.height;
			}
		}
		else
		{
			if(this._empContainer&&this._empContainer.visible)
			{
				this._moneyIconContainer.y -= this._empContainer.height;
			}
		}
		this.addChild(this._moneyIconContainer);
		this._moneyIconContainer.addTouchTap(()=>{
				PlatformManager.redPackageButtonEvent();
		},this);
	}
	/**
	 * 联系客服
	 */
	private initContactIcon()
	{
		let serviceType = PlatformManager.getCustomerServiceType();
		if(App.DeviceUtil.isWXgame()&& serviceType > 0)
		{
			this.createMainUIIcon("contact");
		}
		else
		{
			this.removeMainUIIcon("contact");
		}
		
	}
	private initAndCheckAttentionIcon():void
	{

		
		if(PlatformManager.isSupportAttention()&& !PlatformManager.checkAttention() &&!Api.otherInfoVoApi.getFkFocusInfo() ) //
		{
			// if(!App.MessageHelper.hasEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON))
			// {
			// 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON,this.initAndCheckAttentionIcon,this);
			// }
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("attention");
		}
		else
		{
			if(PlatformManager.isSupportAttention()&&!Api.otherInfoVoApi.getFkFocusInfo()){
				let icon:BaseDisplayObjectContainer = this.createMainUIIcon("attention");
				if(!Api.otherInfoVoApi.getFkFocusInfo()){
					App.CommonUtil.addIconToBDOC(icon);
				}
				else{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
			}
			else{
				this.removeMainUIIcon("attention");
			}
			// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_ATTENTION_ICON,this.initAndCheckAttentionIcon,this);
			
		}
	}
	/**
	 * 初始化F&Q新手引导 
	 */
	private initFQStrategyIcon()
	{
		let fqSwitch = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
		let fqContainer = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("fqStrategy_func");
		if(fqSwitch == "OFF")
		{
			if( fqContainer != null)
			{
				this.removeMainUIIcon("fqStrategy");
			}
		}
		else
		{
			this.createMainUIIcon("fqStrategy"); 	
			this.checkStrengthenState();
		}
	
		
	}
	private initVipIcon():void
	{
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		this.createMainUIIcon("rechargeVip");
	}
	//福利－1.5倍
	private initRebateIcon():void
	{
		if(Api.switchVoApi.checkOpenRechargeRebate())
		{ 
			this.createMainUIIcon("rebate");
		}
		else if(Api.switchVoApi.checkOpenRechargeRebate2())
		{
			this.createMainUIIcon("rebate2");
		}
		else 
		{
			return;
		}
	 
	
	}
	//实名认证
	private initRealnameIcon():void
	{	
		if (GameData.idcardSwitch==true && GameData.idcardNormal == 1 )
		{	
			if ((GameData.idcardType == RealnameConst.USERTYPE_0 || GameData.idcardType == RealnameConst.USERTYPE_1) && Api.gameinfoVoApi.getRealnameRewards() != 0)
			{
				this.createMainUIIcon("realnamerewards");
			}
			
		}
		else if(!Api.switchVoApi.checkOpenCertification()||Api.otherInfoVoApi.certification())
		{	
			
		}
		else
		{
			RSDKHelper.checkRealname((result)=>{
				if(result)
				{
					this.createMainUIIcon("realname");
				} 
			}) 
		}  
	}
	private initCardIcons()
	{
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		// if (Api.switchVoApi.checkTWShenhe()) {
		// 	return;
		// }
		if (PlatformManager.checkIsShenHeYiWan()) {
			return;
		}

		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();

		if(!isBuyMonthCard){
			if(Api.switchVoApi.checkLeftActIconOpen()){

			}
			else{
				this.createMainUIIcon("monthcard");
				this.sortIcons();
				this.setIconsPos();
			}
			
		}
		if(isBuyMonthCard && !isBuyYearCard){
			if(Api.switchVoApi.checkLeftActIconOpen()){

			}
			else{
				this.createMainUIIcon("yearcard");
				this.sortIcons();
				this.setIconsPos();
			}
			
		}		
	}
	/**限时礼包图标 */
	private initLimitedGiftIcon(){

		
		if(Api.switchVoApi.checkLimitedGift()){
			//打开了限时礼包开关
			let time = Api.limitedGiftVoApi.checkHaveLimitedGift();
			if (time > 0){
				
				let container = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("limitedgift_func");
				if(!container)
				{
					container = this.createMainUIIcon("limitedgift");

					let str =  App.DateUtil.getFormatBySecond(time,1);
					
					let timeTF =  <BaseTextField>container.getChildByName("limitedgiftTimeTF");
					if(!timeTF)
					{
						//时间文本背景
						// let timeBg = BaseBitmap.create("public_icontimebg");
						let timeBg = BaseBitmap.create("public_9_mainicontimebg");
						
						container.addChildAt(timeBg,0);

						timeTF = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_RED2)
						timeTF.setPosition(container.x + container.width / 2 - timeTF.width / 2,container.y + 80 - timeTF.height / 2);
						if(PlatformManager.checkIsThSp()||PlatformManager.checkIsRuSp())
						{
							timeTF.y = container.y + 80;
						}
						timeTF.name = "limitedgiftTimeTF";
						timeBg.width = timeTF.width + 8;
						timeBg.height = timeTF.height + 2;
						timeBg.x = timeTF.x + timeTF.width/2 - timeBg.width/2;
						timeBg.y = timeTF.y + timeTF.height/2 - timeBg.height/2;
						container.addChild(timeTF);
					}
				}
							
				// let boo = Api.limitedGiftVoApi.checkRedPoint();
				// if(container){
				// 	if(boo)
				// 	{
				// 		App.CommonUtil.addIconToBDOC(container);
				// 	}
				// 	else
				// 	{
				// 		App.CommonUtil.removeIconFromBDOC(container);
				// 	}
				// }
		
				this.tick();

			}
		} else {
			this.removeMainUIIcon("limitedgift");
		}


	}
	//签到
	private initSignIcons():void
	{
		this.checkSignIcons();
		this.cheackSignRedDot();
	}

	private checkSignIcons():void
	{ 
		if(Api.sevenDaysSignupLoginVoApi.checkUserIsNewer())
		{
			return;
		}
		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		if(totalSignDay>=8)
		{
			if(Api.arrivalVoApi.getIsAugustsignin())
			{	
				this.createMainUIIcon("augustsign");
				this.removeMainUIIcon("sign7");
			}
			return
		}
		if(totalSignDay<=7)
		{
			let flag2 = Api.arrivalVoApi.checkFlagByIndex(2);
			let flag3 = Api.arrivalVoApi.checkFlagByIndex(3);
			let flag7 = Api.arrivalVoApi.checkFlagByIndex(7);

		
			if(totalSignDay<=2&&flag2!=1)
			{
				this.createMainUIIcon("sign2");
				this._signName="sign2";
				return 
			}
			else if(totalSignDay<=3&&flag3!=1)
			{	
				this.createMainUIIcon("sign3");
				this.removeMainUIIcon("sign2");
				
				this._signName="sign3";
				return 
			}
			else if(totalSignDay<=7&&flag7!=1)
			{	
				this.createMainUIIcon("sign7");
				this.removeMainUIIcon("sign3");
				
				this._signName="sign7";
				return 
			}
			else
			{	
				this.removeMainUIIcon("sign7");	
			}
			
		}
		else
		{
			this.removeMainUIIcon("sign7");	
		}
		 
	}
	private cheackSignRedDot():void
	{
		let signIcon = this.getTopBtnByName(this._signName);
		if(signIcon)
		{
			var boo =Api.arrivalVoApi.isShowRedDot;
			if(boo)
			{
				App.CommonUtil.addIconToBDOC(signIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(signIcon);
			}
		} 
	}

	private checkCardIcon()
	{
		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if(isBuyMonthCard){
			if(Api.switchVoApi.checkLeftActIconOpen()){
				this.removeLeftIcon("monthcard");
			}
			else{
				this.removeMainUIIcon("monthcard");
			}
			
		}
		if(isBuyYearCard)
		{
			if(Api.switchVoApi.checkLeftActIconOpen()){
				this.removeLeftIcon("yearcard");
			}
			else{
				this.removeMainUIIcon("yearcard");
			}
		}	
	}
	private checkWanBaIcon():void
	{
		if(Api.otherInfoVoApi.checkShowWanbaDesktopIcon())
		{
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("desktop");
			App.CommonUtil.addIconToBDOC(icon);
		}
		else
		{
			this.removeMainUIIcon("desktop");
		}
		let shareVo = Api.otherInfoVoApi.getGeneralShareInfo();
		
		if(Api.otherInfoVoApi.checkShowWanbaShareIcon() &&						
		 Api.switchVoApi.checkTWShenhe() == false && 					//不是港台审核
		 (!PlatformManager.checkIsThSp()) &&PlatformManager.checkIsHeYue()==false&&
		 shareVo &&
		 (shareVo.sharenum < Config.GameprojectCfg.rewardAllNum ) //分享次数小于总次数才会显示 等于总次数的时候消失
		 
		 ) 
		{
			this.createMainUIIcon("share");
			// let icon:BaseDisplayObjectContainer = this.createMainUIIcon("share");
			// // App.CommonUtil.addIconToBDOC(icon);
			// if(PlatformManager.checkIsFkylcSp())
			// {
				
			// 	if(Api.otherInfoVoApi.getFkIsshowRed()){
			// 		App.CommonUtil.addIconToBDOC(icon);
			// 	}
			// 	else{
			// 		App.CommonUtil.removeIconFromBDOC(icon);
			// 	}
				
			// }
		}
		else
		{
			this.removeMainUIIcon("share");
		}
		
		this.initAndCheckAttentionIcon(); 
		this.checkRealnameIcon2();
	}

	private checkTimelimitwife(){
		if(Api.switchVoApi.checkLeftActIconOpen()){
			let remove = false;
			if(Api.switchVoApi.checkClosePay() || (PlatformManager.checkIsThSp()&&App.DeviceUtil.isIOS()) || !GameData.checkTimeLimitWife()){
				remove = true;
			}
			if(remove){
				this.removeLeftIcon("timelimitwife");
			}
		}
	}

	private  createRealnameRedHot():void
	{
		let icon = this.getTopBtnByName("realname");  
		App.CommonUtil.addIconToBDOC(icon); 
		this.checkRealnameIcon2();
	}

	private checkRealnameIcon2():void
	{
		let icon = this.getTopBtnByName("realname");  
		if(icon)
		{ 
			if(Api.otherInfoVoApi.certification())
			{	 
				App.CommonUtil.removeIconFromBDOC(icon);  
			} 
		}  
	}

	private checkCandyIcon():void
	{
		if(Api.otherInfoVoApi.getCandyGetInfo()&&PlatformManager.getCandyFlag())
		{
			this.createMainUIIcon("candyget");
		}	
	}
	// 微端下载
	private initDownloadIcon():void
	{
		if ((PlatformManager.checkIsTWBSp() && Api.gameinfoVoApi.getDownType() === "pc") 
			|| (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd")) 
			{
			this.createMainUIIcon("download");
		} 
	}
	// 邀请有礼图标
	private initInviteIcon():void
	{
		if (Api.switchVoApi.checkOpenInvite()) {
			this.createMainUIIcon("invite");
		}
	}
	// 主播网红图标
	private initZhubowanghongIcon():void
	{
		if (PlatformManager.checkIsTWBSp()) {
			if (GameData.serverTime * 1000 < new Date("2018/04/14").getTime()) {
				if (Api.wifeVoApi.getWifeInfoVoById(212) === null) {
					this.createMainUIIcon("zhubowanghong");
				}
			}
		}
	}

	// 迁移服务器
	private initIconQianFu():void
	{	
		if (GameData.wbisshow)
		{
			this.createMainUIIcon("qianfu");
		}
		else
		{
			this.removeMainUIIcon("qianfu");
		}
	}

	private initCoverIcon():void
	{
		if (PlatformManager.checkIsWanbaSp() && (!PlatformManager.getIsWanbaQQLive()) && Api.switchVoApi.checkOpenCover() && Api.otherInfoVoApi.getCoverState() !== 2) {
			this.createMainUIIcon("cover");
		} else {
			this.removeMainUIIcon("cover");
		}
	}

	// 绑定有礼图标
	private initBindIcon():void
	{
		if (Api.switchVoApi.checkOpenFbBind()) {
			this.createMainUIIcon("bind");
		} else {
			this.removeMainUIIcon("bind");
		}
	}

	private checkThGiftIcon():void
	{
		this.createMainUIIcon("thgift");
	}
	private initFuliIcons():void
	{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.checkWelfareState,this);	
	
		// if(Api.switchVoApi.checkClosePay())
		// {
		// 	return;
		// }
		this.createMainUIIcon("welfare");
		this.checkFirstRechargeIcon();
		this.checkRealnameRewards();
		this.checkWelfareState();
		this.checkVipState();
		this.initSignIcons();
		this.checkThanksg(); 
		this.checkMultiple(); 
		this.checkWanbaQQbi(); 
		// this.checkWywEgameqq();
		// this.checkGiveJDPeas();
		this.checkWanbaEgameqq();
		// if(Api.switchVoApi.checkOpenStrengthen()&&Config.GameprojectCfg.closeFunction&&Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction)
		// {
		// 	this.createMainUIIcon("strengthen"); 
		// }
		this.checkStrengthenState();

	}

	private checkWanbaEgameqq()
	{
		if(PlatformManager.getIsWanbaQQEGame() || PlatformManager.getIsWywEgame2())
		{
			this.createMainUIIcon("wywegameqq");
		}
	}

	/**
	 * 处理玩吧双11icon
	 */
	private checkWanba11Icon():void
	{
		if(PlatformManager.checkIsWanbaSp())
		{
			let iconName:string="wanba11";
			if(Api.otherInfoVoApi.checkOpenWB11Icon())
			{
				this.createMainUIIcon(iconName);
			}
			else
			{
				if(this._iconNameList[iconName])
				{
					this.removeMainUIIcon(iconName);
				}
			}
		}
	}

	private checkIconExtend()
	{
		if (Api.switchVoApi.checkOpenMainUIIconExtend())
		{
			this._extandButton = new ExtendIcon();
			this._extandButton.init(this.extendHandle,this);
			this._extandButton.name = "extendicon";

			this._activityIconList.push(this._extandButton);
			this._iconContainer.addChild(this._extandButton);

		}
	}

	private checkIconSingleLine():void
	{
		if (Api.switchVoApi.checkOpenMainUIIconSingleLine() && PlatformManager.checkIsQQGameSp()==false)
		{
			this._singleLineButton = new CommonExtend();
			this._singleLineButton.init(this.singleLineHandle,this,true);
			// this._singleLineButton.packUp();
			// this._singleLineButton._status = 1;
			this._singleLineButton.name = "singleLine";
			this._activityIconList.push(this._singleLineButton);
			this._iconContainer.addChild(this._singleLineButton);
			this._singleLineTime = GameData.serverTime;
			if (Api.rookieVoApi.isGuiding)
			{
				this._singleLineButton.packUp();
			}
			this.sortIcons();
			
		}
	}

	public setSingleLine():void
	{
		if (this._singleLineButton && this._singleLineButton._status == 1)
		{
			this._singleLineButton.pickup();
		}
	}

	private singleLineHandle():void
	{
		if (this._isInExtanding)
		{
			return;
		}
		this._isInExtanding = true;
		this._singleLineButton._isInCDTime = true;

		let v:boolean = (this._singleLineButton._status == 1);
		for (let i:number = 0; i<this._singleLineTab.length; i++)
		{	
			if (this._extandButton && this._extandButton._status != 1 && GameData.isInArray(this._singleLineTab[i],this._pickUpTab))
			{	
				this._singleLineTab[i].visible = false;
				this._singleLineTab[i].alpha = 0;
				continue;
			}

			if (this._singleLineTab[i] == this._extandButton && this._pickUpTab.length == 0)
			{
				continue;
			}

			if (v)
			{
				this._singleLineTab[i].visible = true;
				this._singleLineTab[i].alpha = 0;
				egret.Tween.get(this._singleLineTab[i]).to({alpha:1},500);
			}
			else
			{
				this._singleLineTab[i].visible = true;
				this._singleLineTab[i].alpha = 1;
				egret.Tween.get(this._singleLineTab[i]).to({alpha:0},500);
			}			
		}
		egret.Tween.get(this._singleLineButton).wait(520).call(this.singleLineCallback,this);
	}

	private singleLineCallback():void
	{
		this._isInExtanding = false;
		this._singleLineButton._isInCDTime = false;
		let v:boolean = (this._singleLineButton._status == 1);
		if (v == false)
		{
			for (let i:number = 0; i<this._singleLineTab.length; i++)
			{	
				this._singleLineTab[i].visible = false;			
			}
		}
	}


	private extendHandle():void
	{
		if (this._isInExtanding)
		{
			return;
		}
		this._isInExtanding = true;
		this._extandButton._isInCDTime = true;

		let v:boolean = (this._extandButton._status == 1);
		for (let i:number = 0; i<this._pickUpTab.length; i++)
		{	
			if (v)
			{
				this._pickUpTab[i].visible = true;
				this._pickUpTab[i].alpha = 0;
				egret.Tween.get(this._pickUpTab[i]).to({alpha:1},500);
			}
			else
			{
				this._pickUpTab[i].visible = true;
				this._pickUpTab[i].alpha = 1;
				egret.Tween.get(this._pickUpTab[i]).to({alpha:0},500);
			}			
		}
		egret.Tween.get(this._extandButton).wait(520).call(this.extendCallback,this);
	}

	private extendCallback():void
	{
		this._isInExtanding = false;
		this._extandButton._isInCDTime = false;
		let v:boolean = (this._extandButton._status == 1);
		if (v == false)
		{
			for (let i:number = 0; i<this._pickUpTab.length; i++)
			{	
				this._pickUpTab[i].visible = false;			
			}
		}
	}

	//收起icon
	private extendPackup():void
	{
		if (Api.switchVoApi.checkOpenMainUIIconExtend())
		{
			if (this._isInExtanding == true)
			{
				egret.Tween.removeTweens(this._extandButton);
				this._isInExtanding = false;
				this._extandButton.packUp();
			}
			else
			{
				if (this._extandButton && this._extandButton._status == 1)
				{
					this._extandButton.packUp();
					for (let i:number = 0; i<this._pickUpTab.length; i++)
					{	
						this._pickUpTab[i].visible = false;			
					}
				}
			}
		}
	}

	//玩一玩 推广资源互换
	// private checkWywEgameqq()
	// {
	// 	// this.createMainUIIcon("wywegameqq");
	// 	if(PlatformManager.checkIsLmSp())
	// 	{
	// 		this.createMainUIIcon("wywegameqq");
	// 	}
	// }

	private checkGiveJDPeas():void
	{
		if(PlatformManager.getAppid() == "17018002")
		{
			this.createMainUIIcon("givejdpeas");
		}
	}

	private checkWanbaQQbi()
	{
		if(PlatformManager.checkIsWanbaSp()&& GameData.serverTime < 1529337599)
		{
			this.createMainUIIcon("shareqq");
		}
		else
		{
			this.removeMainUIIcon("shareqq");
		}
	}
	private checkThanksg():void
	{
		let thanksIcon = this.getTopBtnByName("thanksgiving");
		let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge();
		
		if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true)
		{
			this.createMainUIIcon("thanksgiving");
		}
		else if(thanksIcon)
		{ 
			this.removeMainUIIcon("thanksgiving");
		}
		else
		{
			return;
		}
	}

	//泰国安卓4倍
	private checkMultiple():void
	{ 
		let multipleIcon = this.getTopBtnByName("firstchargeMultiple"); 
		let isNewRecharge:Boolean = Api.switchVoApi.checkOpenMultiple(); 
		if(isNewRecharge&&Api.shopVoApi.getfourRateChargeth()==true&&App.DeviceUtil.isAndroid())
		{
			this.createMainUIIcon("firstchargeMultiple");
		}
		else if(multipleIcon)
		{  
			this.removeMainUIIcon("firstchargeMultiple");  
		}
		else
		{
			return;
		}
	}

	private checkVipState():void
	{
		let vipIcon = this.getTopBtnByName("rechargeVip");
		if(vipIcon)
		{
			var boo  =Api.vipVoApi.checkRedPoint();
			if(boo)
			{
			 
				App.CommonUtil.addIconToBDOC(vipIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(vipIcon);
			}
		}
	}

	private checkZhenQiFangState():void{
		if(this._zhenqifangButton){
			if(Api.zhenqifangVoApi.isShowNpc()){
				this._zhenqifangButton.setGray(false);
				if (Api.unlocklist2VoApi.checkShowOpenFunc() && this._isAtHome){
					this._zhenqifangButton.visible = true;
					this.resetHomeBottomBtns();
				}
				if(Api.zhenqifangVoApi.checkNpcMessage()){
				
					App.CommonUtil.addIconToBDOC(this._zhenqifangButton);
					let reddot = this._zhenqifangButton.getChildByName("reddot");
					reddot.x = 51;
					reddot.y =  10;
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(this._zhenqifangButton);
				}
			}
			else{
				this._zhenqifangButton.setGray(true);
				if (Api.unlocklist2VoApi.checkShowOpenFunc()){
					this._zhenqifangButton.visible = false;
				}
			}
		}
	}

	private checkChangeBgState():void
	{
		if (this._changebgButton)
		{
			if (Api.otherInfoVoApi.isHasSceneRedot())
			{
				App.CommonUtil.addIconToBDOC(this._changebgButton);
				let reddot = this._changebgButton.getChildByName("reddot");
				reddot.x = 51;
				reddot.y =  10;
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._changebgButton);
			}
		}
	}

	//府内功能按钮
	private checkHouseFuncState():void{
		if (this._houseFuncBtn){
			let zhenqifangState = Api.switchVoApi.checkZhenQiFangOpen() && Api.zhenqifangVoApi.isShowNpc() && Api.zhenqifangVoApi.checkNpcMessage();
			let changeBgState = Api.switchVoApi.checkOpenChangeBg() && Config.SceneCfg.isSceneMulti() && Api.otherInfoVoApi.isHasSceneRedot();
			let friendState = Api.friendVoApi.isShowNpc() && Api.friendVoApi.isShowRedForEnter();
			if (zhenqifangState || changeBgState || friendState){
				App.CommonUtil.addIconToBDOC(this._houseFuncBtn);
				let reddot = this._houseFuncBtn.getChildByName("reddot");
				reddot.x = 75;
				reddot.y = 7;
			}
			else{
				App.CommonUtil.removeIconFromBDOC(this._houseFuncBtn);
			}
		}
	}

	/**
	 * 皇城六部
	 */
	private checkSixSectionState():void{
		if (this._sixSectionBtn){
			if (Api.sixsection1VoApi && Api.sixsection1VoApi.checkRedPoint()){
				App.CommonUtil.addIconToBDOC(this._sixSectionBtn);
				let reddot = this._sixSectionBtn.getChildByName("reddot");
				reddot.x = 75;
				reddot.y = 7;
			}
			else{
				App.CommonUtil.removeIconFromBDOC(this._sixSectionBtn);
			}
		}
	}

	/**
	 * 限时礼包判断红点
	 */
	private checkLimitedGiftRedPoint():void
	{	
		
		if(Api.switchVoApi.checkLimitedGift()){

			let container = <BaseDisplayObjectContainer>this._iconContainer.getChildByName("limitedgift_func");
			let boo = Api.limitedGiftVoApi.checkRedPoint();
			if(container){
				if(boo)
				{
					App.CommonUtil.addIconToBDOC(container);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(container);
				}
			}
		}
	}
	/**
	 * 创建 MainUIIcon
	 * modelName  的icon
	 * timeStr 有倒计时 传字符串
	 */
	private createMainUIIcon(modelName:string,timeStr?:string):BaseDisplayObjectContainer
	{
		if(!this._iconNameList[modelName])
		{
			let isShow = false;
			if(modelName == "welfare" || modelName == "rechargeVip" || modelName == "firstrecharge"
				|| modelName == "monthcard"|| modelName == "yearcard"||modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="rebate"||modelName=="realname" ||modelName=="realnamerewards" ||modelName=="rebate2"||modelName=="qqvideoguide" ||modelName=="qqvideoquestionnaire"
				|| modelName == "fqStrategy" || modelName == "contact"||modelName == "timelimitwife"||modelName == "strengthen"||modelName =="firstchargemultiple" ||modelName == "sevenDaysSignUp2" || modelName == "sevenDaysSignUp7" || modelName == "meetbeauty" 
				||modelName == "bureaucrat_guide" ||modelName == "userMsg"||modelName =="firstchargemultiple" ||modelName == "sevenDaysSignUp1" || modelName == "thgift" || modelName == "growGold"
			)
			{
				isShow = true;
			}
			else
			{
				isShow=Config.IconorderCfg.getisFlickByName(modelName);
			}
			let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(modelName.toLowerCase()+"_icon",modelName.toLowerCase()+"_icon_name",isShow,``,false,``,modelName);
			iconContainer.name=modelName+"_func";
			if(timeStr)
			{
					let timeTF =  <BaseTextField>iconContainer.getChildByName(modelName + "_TF");
					let timeBg =  <BaseBitmap>iconContainer.getChildByName(modelName + "_Bg");
					if((!timeTF)&&(!timeBg))
					{
						timeBg = BaseBitmap.create("public_9_mainicontimebg");
						timeBg.name = modelName + "_Bg";
						timeTF = ComponentManager.getTextField(timeStr,14,TextFieldConst.COLOR_WARN_RED3)
						timeTF.name = modelName + "_TF";
						timeBg.width = timeTF.width + 30;
						timeBg.setPosition(iconContainer.x + iconContainer.width / 2 - timeBg.width / 2,iconContainer.y + 70);
						if(PlatformManager.checkIsTextHorizontal())
						{
							timeBg.y = iconContainer.y + 80;
						}
						
						timeTF.setPosition(timeBg.x + timeBg.width / 2 - timeTF.width / 2,timeBg.y + timeBg.height / 2 - timeTF.height / 2);
						iconContainer.addChild(timeBg);
						iconContainer.addChild(timeTF);
					}
			}
			this._iconNameList[modelName]=iconContainer;
			iconContainer.addTouchTap(()=>{

					//引导过程种不响应
				if(Api.rookieVoApi.isGuiding){
					return;
				}
				
				if(modelName == "JD618")
				{
					let urlPath = "https://pro.m.jd.com/mall/active/3pdMhNYRFMUo7hMQkzobm8oLf8x4/index.html";
          			window.open(urlPath,"_self");
					return;
				}
				else if(modelName=="shareqq")
				{
					RSDKHelper.openUrl("https://h5.qzone.qq.com/h5plus/pyramid/home?_proxy&_wv=14311&group_id=1106558780",null,null)
					// window.open("https://h5.qzone.qq.com/h5plus/pyramid/home?_proxy&_wv=14311&group_id=1106558780");
				}
				// if(modelName == "wywegameqq"){
				// 	//企鹅电竞
				// 	if(PlatformManager.checkIsLmSp())
				// 	{	
				// 		//玩一玩推广资源互换 sdk没有openlink
				// 		NetManager.request(NetRequestConst.REQUEST_STATS_CLICKWYWICON, {});
				// 		let urlPath = "http://cdn.egame.qq.com/game-weex/page/detailV2.html?appid=101477809&_pggwv=8&_wv=1&_wwv=4";
				// 		// window.open(urlPath,"_blank");
				// 		window["BK"].MQQ.Webview.open(urlPath);
				// 		return;
				// 	}					
				// }
				else if(modelName == "qqvideoquestionnaire"){
					//腾讯视频问卷
					let urlPath = "https://wj.qq.com/s/2265517/9ae5";
					window.open(urlPath,"_self");
					return;
				}
				else if(modelName == "contact")
				{
					//微信 显示联系客服
					PlatformManager.getContackService();
					return;
				}
				else if(modelName=="wanba11")
				{
					RSDKHelper.openUrl("https://mobile.qzone.qq.com/l?g=5055 ",null,null);
					return;
				}
				
				let viewName:string=App.StringUtil.firstCharToUper(modelName)+"View";
				let popupViewName:string=App.StringUtil.firstCharToUper(modelName)+"PopupView";
				if(egret.hasDefinition(viewName)==false&&egret.hasDefinition(popupViewName))
				{
					viewName=popupViewName;
				}
				if(modelName=="rechargeVip")
				{
					viewName+="|1";
				}
				else if(modelName=="firstrecharge")
				{
					if(Api.switchVoApi.checkWeChatFirstcharge())
					{
					 	viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
					}
					else
					{
					 	viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					} 
				}
				else if(modelName=="monthcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWMONTHCARD;
				}
				else if(modelName=="growGold")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWGROWGOLD;
				}
				else if(modelName=="yearcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWYEARCARD;
				}
				else if(modelName=="candyget")
				{
					viewName=ViewConst.POPUP.CANDYGETPOPUPVIEW;
				}
				else if(modelName=="newcharge")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWRECHARGEBOX;
				}
				else if(modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="augustsign")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWSIGNIN;
				}
				else if(modelName=="rebate")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE;
				}
				else if(modelName=="rebate2")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE2;
				}
				else if(modelName=="newinvite")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWNEWINVITE;
				}
				else if(modelName=="newreback")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWPLAYERCOMEBACK;
				}
				else if(modelName == "fqStrategy")
				{ 
					if(Api.switchVoApi.checkOpenStrengthen()&&Config.GameprojectCfg.closeFunction&&Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction) 
					{
						viewName = ViewConst.COMMON.FQSTRATEGYVIEWTAB3;
					}
					else
					{
						viewName = ViewConst.COMMON.FQSTRATEGYVIEW;
					}
				}
				else if(modelName == 'playerReturn'){
					viewName == ViewConst.COMMON.PLAYERRETURNVIEW;
				}
				else if(modelName == "timelimitwife"){
					viewName = ViewConst.POPUP.TIMELIMITWIFEVIEW;
				}
				else if(modelName == "limitedgift")
				{
					viewName=ViewConst.POPUP.LIMITEDGIFTVIEW;
				}
				else if(modelName=="wywegameqq")
				{
					viewName=ViewConst.POPUP.EGAMEQQPOPUPVIEW;
				}
				// else if(modelName == "strengthen")
				// {
				// 	viewName=ViewConst.POPUP.STRENGTHENPOPUPVIEW;
				// }
				else if (modelName == "welfare")
				{
					let firstRechargeflag = Api.shopVoApi.getPayFlag();
					if (firstRechargeflag == 0 && Api.rechargeVoApi.checkFirstRecharge() && !Api.switchVoApi.checkClosePay())
					{
						viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					}
				}
				else if(modelName == "sevenDaysSignUp1" || modelName == "sevenDaysSignUp2" || modelName == "sevenDaysSignUp7")
				{
					viewName=ViewConst.COMMON.SEVENDAYSSIGNUPVIEW;
				}
				else if(modelName == "meetbeauty")
				{
					viewName=ViewConst.COMMON.MEETBEAUTYVIEW;
				}
				else if (modelName == "bureaucrat_guide") {
					viewName = ViewConst.COMMON.BUREAUCRATGUIDE;
				}
				else if (modelName == "thgift") {
					viewName = ViewConst.COMMON.SHOPVIEW_TAB2;
				}

				//不要跟随着随意加if了，大部分都是无用的，尽量走规范
				ViewController.getInstance().openView(viewName);
				// window.open("https://www.baidu.com");
			},this);
			this._activityIconList.push(iconContainer);
			this._iconContainer.addChild(iconContainer);
			return iconContainer;
		}
		else
		{
			return this._iconNameList[modelName];
		}
	}

	private removeMainUIIcon(modelName:string):void
	{
		let l:number=this._activityIconList.length;
		for(let i:number=l-1;i>=0;i--)
		{
			if(this._activityIconList[i].name&&this._activityIconList[i].name.split("_")[0]==modelName)
			{
				this._activityIconList[i].dispose();
				this._activityIconList.splice(i,1);
				this.sortIcons();
				this.setIconsPos();
				break;
			}
		}
		if(this._iconNameList[modelName])
		{
			delete this._iconNameList[modelName];
		}
	}

	private getLimit():number
	{
		let limit = 6;
		if(Api.switchVoApi.checkLeftActIconOpen() && Config.BigiconCfg.getBigIcon().length > 0){
			limit = 5;
		}
		return limit;
	}

	private setIconsPos():void
	{
		if (Api.switchVoApi.checkTWShenhe() == true) {
			for (let k in this._activityIconList) {
				let v:BaseDisplayObjectContainer = this._activityIconList[k];
				if (v.name == "welfare_func"&&Api.switchVoApi.checkIsOlyShenheFile()==false) {
					v.setPosition(30+v.width/2,v.height/2);
				}
				else {
					v.visible = false;
				}
			}
			return;
		}
 		let l=this._activityIconList.length;
		for(let i:number=0;i<l;i++)
		{	
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			
			icon.visible =true;
			
			if (this._pickUpTab.indexOf(icon)>-1)
			{
				if ( this._extandButton && this._isInExtanding == false)
				{	
					if (this._extandButton._status != 1)
					{
						icon.visible = false;
					}
				}
			}

			if (this._singleLineTab.indexOf(icon)>-1)
			{
				if ( this._singleLineButton && this._isInExtanding == false)
				{	
					if (this._singleLineButton._status != 1)
					{
						icon.visible = false;
					}
				}
			}
			
			let iconwidth:number = 70;
			let iconheight:number = 69;
			let limit = 6;
			if(Api.switchVoApi.checkLeftActIconOpen() && Config.BigiconCfg.getBigIcon().length > 0){
				limit = 5;
			}
			icon.setPosition(30+(iconwidth+30)*(i%limit)+iconwidth/2,Math.floor(i/limit)*(iconheight+20)+iconheight/2);
			if(PlatformManager.checkIsThSp()||PlatformManager.checkIsRuSp())
			{
				icon.setPosition(30+(iconwidth+30)*(i%limit)+iconwidth/2,Math.floor(i/limit)*(iconheight+30)+iconheight/2);
			}
		}

		
		if (this._singleLineButton)
		{
			this._singleLineButton.setVisible(this._singleLineTab.length>0);
			if (this._extandButton)
			{	
				if (this._pickUpTab.length>0 && this._singleLineButton._status == 1)
				{
					this._extandButton.setVisible( true);
				}
				else
				{
					this._extandButton.setVisible( false);
				}
			}
		}
		else
		{
			if (this._extandButton)
			{
				this._extandButton.setVisible(this._pickUpTab.length>0);
			}
		}
	}

	protected doRefreshTaskInfo()
	{
		if(Api.mainTaskVoApi.getCurMainTaskId() == null)
		{
			this._taskContainer.visible = true;
			this._settingAndMailContainer.y = 0;
			let taskid = Api.dailytaskVoApi.getTaskIdForMainTaskUI();
			this._taskTxt.text =  LanguageManager.getlocal("dailyTaskName"+ taskid);
			let curStatus:number = Api.dailytaskVoApi.getTaskStatusByTaskId(taskid)
			if( curStatus == 2)
			{
				this._taskContainer.visible = false;
				this._settingAndMailContainer.y = 70;
				return;
			}else if( curStatus == 1)
			{
				this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
				this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
				this._missionIcon.x = 25;
			}else
			{
				this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
				this._missionIcon.x = 35
				this._taskTxt.textColor = TextFieldConst.COLOR_WHITE;
			}
			if(this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")){
				if(!this._taskContainer.getChildByName("taskeffect")){
					let upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
					upgradeClip.x = 5;
					upgradeClip.y = -221;
					upgradeClip.name = "taskeffect";
					// let index = this._missionIcon.
					this._taskContainer.addChildAt(upgradeClip,1);
					upgradeClip.playWithTime(0);

					if (this._taskArrow)
					{
						this._taskArrow.dispose();
						this._taskArrow = null;
					}
					if(Number(Api.mainTaskVoApi.getCurMainTaskId())<=10){
						let clickHand = BaseBitmap.create("studyatk_arrow");
						clickHand.rotation = 90;
						clickHand.x = 300;
						clickHand.y = -225;
						clickHand.name = "taskeffect2";
						this._bottomContiner.addChild(clickHand);

						egret.Tween.get(clickHand,{loop:true})
							.to({x:390,scaleX:1.0,scaleY:1.0}, 500)
							.to({x:300 ,scaleX:1.0,scaleY:1.0}, 500)
					}
					
				}
			}else{
				let taskeffect = this._taskContainer.getChildByName("taskeffect");
				let taskeffect2 = this._bottomContiner.getChildByName("taskeffect2")
				if(taskeffect){
					this._taskContainer.removeChild(taskeffect);
				}
				if(taskeffect2){
					this._bottomContiner.removeChild(taskeffect2);
				}
				if(Api.rookieVoApi.isEnLang() &&  Number(Api.mainTaskVoApi.getCurMainTaskId())<=10)
				{
					if (!this._taskArrow)
					{	
						let arrow = BaseLoadBitmap.create("mainui_task_arrow");
						let posx = this._taskTxt.x+this._taskTxt.width+5;
						arrow.x = posx;
						arrow.y = -215;
						this._bottomContiner.addChild(arrow);
						egret.Tween.get(arrow,{loop:true})
							.to({x:posx+30,scaleX:1.0,scaleY:1.0}, 500)
							.to({x:posx ,scaleX:1.0,scaleY:1.0}, 500).wait(3000)
						this._taskArrow = arrow;
					}
					this._taskArrow.visible = true;
					if (Api.rookieVoApi.isInGuiding)
					{
						this._taskArrow.visible = false;
					}
				}
				else
				{
					if (this._taskArrow)
					{
						this._taskArrow.dispose();
						this._taskArrow = null;
					}
				}
			}
			return;
		}
		this._taskTxt.text =  Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[0];
		if (Api.mainTaskVoApi.isCurTaskReach())
		{
			this._taskTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
			this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
			this._missionIcon.x = 25;
		}
		else{
			this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
			this._missionIcon.x = 35
			// egret.Tween.removeTweens(this._missionIcon);
			this._taskTxt.textColor = TextFieldConst.COLOR_WHITE;
		}

		if(this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")){
			if(!this._taskContainer.getChildByName("taskeffect")){
				let upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
				upgradeClip.x = 5;
				upgradeClip.y = -221;
				upgradeClip.name = "taskeffect";
				this._taskContainer.addChildAt(upgradeClip,1);
				upgradeClip.playWithTime(0);

				if (this._taskArrow)
				{
					this._taskArrow.dispose();
					this._taskArrow = null;
				}

				if(Number(Api.mainTaskVoApi.getCurMainTaskId())<=10){
						let clickHand = BaseBitmap.create("studyatk_arrow");
						clickHand.rotation = 90;
						clickHand.x = 300;
						clickHand.y = -225;
						clickHand.name = "taskeffect2";
						this._bottomContiner.addChild(clickHand);

						egret.Tween.get(clickHand,{loop:true})
							.to({x:350,scaleX:1.0,scaleY:1.0}, 500)
							.to({x:300 ,scaleX:1.0,scaleY:1.0}, 500)
					}
			}
		}else{
			let taskeffect = this._taskContainer.getChildByName("taskeffect");
			let taskeffect2 = this._bottomContiner.getChildByName("taskeffect2")
			if(taskeffect){
				this._taskContainer.removeChild(taskeffect);
			}
			if(taskeffect2){
				this._bottomContiner.removeChild(taskeffect2);
			}
			if(Api.rookieVoApi.isEnLang() && Number(Api.mainTaskVoApi.getCurMainTaskId())<=10)
			{
				if (!this._taskArrow)
				{
						let arrow = BaseLoadBitmap.create("mainui_task_arrow");
						let posx = this._taskTxt.x+this._taskTxt.width+5;
						arrow.x = posx;
						arrow.y = -215;
						this._bottomContiner.addChild(arrow);
						egret.Tween.get(arrow,{loop:true})
							.to({x:posx+30,scaleX:1.0,scaleY:1.0}, 500)
							.to({x:posx ,scaleX:1.0,scaleY:1.0}, 500).wait(3000)
						this._taskArrow = arrow;
				}
				this._taskArrow.visible = true;
				if (Api.rookieVoApi.isInGuiding)
					{
						this._taskArrow.visible = false;
					}
			}
			else
			{
				if (this._taskArrow)
				{
					this._taskArrow.dispose();
					this._taskArrow = null;
				}
			}
			
		}
		
		this.checkHousekeeperBtnRed();
	}

	private resertMale():void{
		let view = this;
		this.refreshText(); 
		this.doRefreshTaskInfo(); 
	}

	protected doRefreshChat()
	{
		if(!this._chatTxt)
		{
			return;
		}
		let chatStr = Api.chatVoApi.getLastMessage();
		let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(chatStr);
		if (emoticonStr){
			chatStr = emoticonStr;
		}
		
		this._chatTxt.text = chatStr;
		let chatTxt = ComponentManager.getTextField(chatStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(chatTxt.width >= 480){
			this._chatTxtPoint.visible = true;
		}
		else{
			this._chatTxtPoint.visible = false;
		}
		// if (this._redPoint)
		// {
		// 	this._redPoint.visible = Api.chatVoApi.checkMianUIRedDot();
		// }
	}

	protected doQuickAlliance()
	{
		NetManager.chatServerLogout(null,null);
		Api.chatVoApi.refreshLastMessage();
		this.doRefreshChat();
	}
	private bottomBtnCfg = [
		{
			id:1,
			btnName:"servant",
			btnIconImg:"mainui_bottomimg1",
			isOPen:true,
		},
		{
			id:2,
			btnName:"item",
			btnIconImg:"mainui_bottomimg2",
			isOPen:true,
		},
		{
			id:3,
			btnName:"dailytask",
			btnIconImg:"mainui_bottomimg3",
			isOPen:true,
		},
		{
			id:4,
			btnName:"achieve",
			btnIconImg:"mainui_bottomimg4",
			isOPen:true,
		},
		{
			id:5,
			btnName:"shop",
			btnIconImg:"mainui_bottomimg5",
			isOPen:true,
		},
		{
			id:6,
			btnName:"welfare",
			btnIconImg:"mainui_bottomimg6",
			isOPen:false,
		},
		{
			id:7,
			btnName:"challenge",
			btnIconImg:"mainui_bottomimg9",
			isOPen:false,
		},
		{
			id:8,
			btnName:"manage",
			btnIconImg:"mainui_bottomimg10",
			isOPen:false,
		},
	];
	private initButtom():void
	{
		this._bottomContiner=new BaseDisplayObjectContainer();
		// this._bottomContiner.alpha = 0;
		//填内容
		this._bottomContiner.setPosition(0,GameConfig.stageHeigth-this._bottomContiner.height);
		this.addChild(this._bottomContiner);

		//右边按钮区
		this._rightBtnContainer = new BaseDisplayObjectContainer();
		this._rightBtnContainer.setPosition(0, GameConfig.stageHeigth-this._bottomContiner.height);
		this.addChild(this._rightBtnContainer);

		this._rightBtnContainer2 = new BaseDisplayObjectContainer();
		this._rightBtnContainer2.setPosition(130, 0);
		this._rightBtnContainer2.name = "rightBtnContainer2";
		this._rightBtnContainer2.alpha = 0;
		this.addChild(this._rightBtnContainer2);
		if (!Api.switchVoApi.checkOpenGooutAni())
		{
			this._rightBtnContainer2.x = 0;
			this._rightBtnContainer2.alpha = 1;
		}

		this._chatContainer = new BaseDisplayObjectContainer();
		this._bottomContiner.addChild(this._chatContainer);

		let res = Api.switchVoApi.chekcOpenNewUi() ? "mainui_bottombg_new" : "mainui_bottombg";
		let bottomBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes(res));
		bottomBg.x=0;
		bottomBg.y=-bottomBg.height;
		this._bottomContiner.addChild(bottomBg);
		
		let goOutBtn =  BaseBitmap.create(ResourceManager.getRes(Api.switchVoApi.chekcOpenNewUi() ? "mainui_btn3_new" : "mainui_btn3"));
		goOutBtn.addTouchTap(this.goOutBtnClickHandler,this);
		goOutBtn.anchorOffsetY = goOutBtn.height/2;
		goOutBtn.anchorOffsetX = goOutBtn.width/2;
		goOutBtn.x = 10+ goOutBtn.width/2;
		goOutBtn.y =  bottomBg.y + bottomBg.height/2-2;
		this._bottomContiner.addChild(goOutBtn);
		this._goOutBtn = goOutBtn;
		egret.Tween.get(goOutBtn, {
            loop: true,//设置循环播放
        }).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360

		let goouttxt = BaseBitmap.create(`mainui_btn3_text_new`);
		this._bottomContiner.addChild(goouttxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, goouttxt, goOutBtn, [0,10]);
		this._gououtTxt = goouttxt;
		
		// test code 
		if (PlatformManager.checkIsTWBSp() && PlatformManager.checkIsTest())
		{
			let testbtn = ComponentManager.getButton("btn_small_blue","",()=>{
				PlatformManager.checkPay("g166");
			},this);
			testbtn.setText("g166",false);
			testbtn.setPosition(100,-100);
			testbtn.setScale(0.7);
			this._bottomContiner.addChild(testbtn);
		}

		let PerWidth = 95;
		let curIdx = 0;
		for (let i = 0; i < this.bottomBtnCfg.length; i++)
		{
			let btncfg = this.bottomBtnCfg[i];
			if(Api.switchVoApi.checkIsOlyShenheFile())
			{
				if(btncfg.btnName=="shop")
				{
					btncfg.isOPen=false;
				}
				else if(btncfg.btnName=="manage")
				{
					btncfg.isOPen=true;
				}
			}
			if (btncfg.isOPen) 
			{
				let res = btncfg.btnIconImg;
				let txt = "";
				if(Api.switchVoApi.chekcOpenNewUi() && RES.hasRes(`${btncfg.btnIconImg}_new`)){
					res = `${btncfg.btnIconImg}_new`;
					txt = `${btncfg.btnIconImg}_txt_new`;
				}
				let imgBtn = ComponentManager.getButton(res,"",this.bottomBtnClickHandler,this,[btncfg]);
				imgBtn.x = 168 +PerWidth*curIdx ;
				imgBtn.y = -imgBtn.height-15;
				imgBtn.name = btncfg.btnName;
				this._bottomContiner.addChild(imgBtn);
				if(txt != ""){
					imgBtn.x = 145 +PerWidth*curIdx ;
					imgBtn.y = -imgBtn.height-25;
					let bottomtxt = BaseBitmap.create(txt);
					this._bottomContiner.addChild(bottomtxt);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomtxt, imgBtn, [0,imgBtn.height-7]);
				}
				curIdx +=1 ;
			}
		}
		this.checkAchPoint();
		this.checkAllRedPoint();

		//聊天按钮相关
		let chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
		chatbg.width = GameConfig.stageWidth;
		chatbg.height = 35;
		chatbg.x=0;
		chatbg.y= bottomBg.y-chatbg.height-3;
		this._chatContainer.addChild(chatbg);
		chatbg.touchEnabled = true;
		chatbg.addTouchTap(this.chatBgClickHandler,this);

		let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
		chatIcon.anchorOffsetX = chatIcon.width/2;
		chatIcon.anchorOffsetY = chatIcon.height/2;
		chatIcon.x =  chatIcon.width/2+10;
		chatIcon.y = chatbg.y + chatbg.height/2;
		this._chatContainer.addChild(chatIcon);
		egret.Tween.get(chatIcon, {
            loop: true,//设置循环播放
        }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
		
		let showStr:string=Api.chatVoApi.getLastMessage();
		if(!showStr)
		{
			showStr="1";
		}
		let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
		if (emoticonStr){
			showStr = emoticonStr;
		}
		this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._chatTxt.x = chatIcon.x + 20;
		this._chatTxt.y = chatIcon.y - this._chatTxt.height/2;
		this._chatTxt.width = 480;
		this._chatTxt.height = 50;
		this._chatTxt.lineSpacing = 50;
		this._chatContainer.addChild(this._chatTxt);
		

		this._chatTxtPoint = ComponentManager.getTextField("...",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._chatTxtPoint.x = 522;
		this._chatTxtPoint.y = chatIcon.y - this._chatTxtPoint.height/2 - 5;
		this._chatTxtPoint.visible = false;
		// this._chatTxtPoint.width = 450;
		// this._chatTxtPoint.height = 20;
		this._chatContainer.addChild(this._chatTxtPoint);


		this.doRefreshChat();

		this._taskContainer = new BaseDisplayObjectContainer();
		this._taskContainer.x = 0;
		this._taskContainer.y = 0;
		this._bottomContiner.addChild(this._taskContainer);
		// this._taskContainer.x = 0;
		// this._taskContainer.y = GameConfig.stageHeigth;
		// this.addChild(this._taskContainer);
		

		// if(!Api.switchVoApi.checkClosePay())
		// {
			//功能预览
			let functionPreviewBg = BaseBitmap.create("mainui_functionpreview");
			functionPreviewBg.name = "functionPreviewBg";
			functionPreviewBg.x = 5;
			functionPreviewBg.y = chatbg.y- chatbg.height - functionPreviewBg.height-50;
			// this._bottomContiner.addChild(functionPreviewBg);
			this._taskContainer.addChild(functionPreviewBg);
			this._functionPreviewBg =functionPreviewBg;
			functionPreviewBg.addTouchTap(this.functionClickHandler,this);

			let functionIcon= BaseBitmap.create("mainui_funicon"); 
			functionIcon.x = 18;
			functionIcon.y = functionPreviewBg.y+5;
			// this._bottomContiner.addChild(functionIcon);
			this._taskContainer.addChild(functionIcon);
			this._functionIcon =functionIcon;
		

			var str =Api.otherInfoVoApi.getFunctionName();
			//功能名字
			let _functionTxt = ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			_functionTxt.x =functionPreviewBg.x+75;
			_functionTxt.y =functionPreviewBg.y+15;
			_functionTxt.text = str;
			this._functionTxt =_functionTxt;
			// this._bottomContiner.addChild(_functionTxt);
			this._taskContainer.addChild(_functionTxt);
			this.refreshText();
		// }



		//task 
		let taskBg = BaseBitmap.create("mainui_taskbg170");
		taskBg.name = "taskBg"
		taskBg.x = 5;
		taskBg.y = chatbg.y- chatbg.height - taskBg.height+30;
		this._taskContainer.addChild(taskBg);
		taskBg.addTouchTap(this.missionBtnClickHandler,this);

		let missionIcon = BaseBitmap.create("mainui_missionIcon1")
		missionIcon.anchorOffsetX = missionIcon.width/2;
		missionIcon.anchorOffsetY = missionIcon.height/2;
		missionIcon.x = taskBg.x+15 + missionIcon.width/2;
		missionIcon.y = taskBg.y + taskBg.height/2;
		this._taskContainer.addChild(missionIcon);
		this._missionIcon = missionIcon;
		egret.Tween.get(this._missionIcon, {
			loop: true,//设置循环播放
		}).to({scaleX:0.8,scaleY:0.8},700).to({scaleX:1,scaleY:1.0},700);//设置2000毫秒内 rotation 属性变为360

		this._taskTxt =  ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._taskTxt.x = missionIcon.x + 45;
		this._taskTxt.y = missionIcon.y - 10 ;
		this._taskContainer.addChild(this._taskTxt);

		//邮件设置
		this._settingAndMailContainer = new BaseDisplayObjectContainer();
		this._settingAndMailContainer.x = 0;
		this._settingAndMailContainer.y = 0;
		this._bottomContiner.addChild(this._settingAndMailContainer);
		let settingButton = ComponentManager.getButton("mainui_bottomimg8","",this.settingBtnClickHandler,this);
		settingButton.x = taskBg.x + 10;
		settingButton.y = taskBg.y - 25 - settingButton.height;
		this._settingAndMailContainer.addChild(settingButton);
		// settingButton.visible=false;

		let settingBg = BaseBitmap.create("mainui_bottombtnbg");
		settingBg.x = settingButton.x+settingButton.width/2-settingBg.width/2;
		settingBg.y = settingButton.y;
		this._settingAndMailContainer.addChildAt(settingBg,0);
		// settingBg.visible=false;

		let mailButton = ComponentManager.getButton("mainui_bottomimg12","",this.mailBtnClickHandler,this);
		mailButton.x = settingButton.x;
		mailButton.y = settingButton.y - settingButton.height - 20;
		this._settingAndMailContainer.addChild(mailButton);
		this._mailButton = mailButton;

		let mailBg = BaseBitmap.create("mainui_bottombtnbg");
		mailBg.x = settingBg.x;
		mailBg.y = mailButton.y;
		this._settingAndMailContainer.addChildAt(mailBg,0);

		if (Api.switchVoApi.checkOpenMainUIHelpBtn())
		{
			let helpbg = BaseBitmap.create("mainui_bottombtnbg");
			helpbg.setPosition(settingBg.x,mailBg.y-mailButton.height - 18);
			this._settingAndMailContainer.addChildAt(helpbg,0);

			let helpBtn = ComponentManager.getButton("mainui_help","",this.helpBtnClickHandler,this);
			helpBtn.x = settingButton.x;
			helpBtn.y = mailButton.y - mailButton.height - 20;
			this._settingAndMailContainer.addChild(helpBtn);
			this._helpButton = helpBtn;
		}

		//收缩
		let offsetx = 76;
		if (Api.switchVoApi.checkOpenHouseBtnUp()){
			let houseFuncBtn = ComponentManager.getButton("mainui_housefun_btn", "", this.houseFuncBtnClick,this,null,1);
			houseFuncBtn.setPosition(GameConfig.stageWidth - 110, chatbg.y - houseFuncBtn.height);
			this._rightBtnContainer.addChild(houseFuncBtn);
			this._houseFuncBtn = houseFuncBtn;

			let houseBtnFlag = BaseBitmap.create("mainui_housefunbtn_flag");
			houseFuncBtn.addChild(houseBtnFlag);
			houseBtnFlag.setPosition(houseFuncBtn.width - houseBtnFlag.width, -10);
			houseBtnFlag.name = "houseFuncBtnFlag";
			houseBtnFlag.visible = false;
			egret.Tween.get(houseBtnFlag, {loop: true}).to({y: -5}, 400, egret.Ease.sineOut).to({y: -10}, 400, egret.Ease.sineIn);
			this._homeBottomBtns.push(houseFuncBtn);
			this.checkHouseFuncState();
			offsetx = 100;
		}

		if (Api.switchVoApi.checkOpenHousekeeper())
		{
			let hosekeepBtnImg = "mainui_housekeeper_btn";
			if (Api.switchVoApi.checkOpenHouseBtnUp()){
				hosekeepBtnImg = "mainui_housekeeper_new_btn";
			}
			this._housekeeperbtn = ComponentManager.getButton(hosekeepBtnImg,"",this.housekeeperHandler,this,null,1);
			this._housekeeperbtn.x = GameConfig.stageWidth-offsetx;
			this._housekeeperbtn.y = chatbg.y - this._housekeeperbtn.height;
			if (Api.switchVoApi.checkOpenHouseBtnUp()){
				this._housekeeperbtn.x = this._houseFuncBtn.x - this._housekeeperbtn.width;
				this._housekeeperbtn.y = this._houseFuncBtn.y ;
			}
			
			this._rightBtnContainer.addChild(this._housekeeperbtn);
			

			if (Api.playerVoApi.getPlayerLevel() < Config.MasterCfg.levelLimit)
			{
				this._housekeeperbtn.visible = false;
			}
			else
			{
				// offsetx= this._housekeeperbtn.width;
			}
			this._homeBottomBtns.push(this._housekeeperbtn);

			this.checkHousekeeperBtnState();
			this.checkHousekeeperBtnRed();
		}

		//friends
		if (!Api.switchVoApi.checkOpenHouseBtnUp()){
			this._friendsBtn = ComponentManager.getButton("mainui_friends_btn","",this.friendsBtnHandler,this,null,1);
			this._friendsBtn.x = GameConfig.stageWidth - this._friendsBtn.width-offsetx;
			this._friendsBtn.y = chatbg.y - this._friendsBtn.height;
			if(Api.friendVoApi.isShowNpc() ){
				this._friendsBtn.setGray(false);
			}
			else
			{
				this._friendsBtn.setGray(true);
			}
			this._rightBtnContainer.addChild(this._friendsBtn);
			this._homeBottomBtns.push(this._friendsBtn);
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.unlocklist2VoApi.checkIsCanShowFunc("friend")){
					this._friendsBtn.visible = true;
				}
				else{
					this._friendsBtn.visible = false;
				}
			}
		}

		if (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement()){
			//出巡按钮 府外
			let topbtn = mailButton;
			if (this._helpButton)
			{
				topbtn = this._helpButton;
			}

			let cityEmpOutingContainer = this.creatEmpOutingBtn();
			cityEmpOutingContainer.x = mailButton.x;
			cityEmpOutingContainer.y = topbtn.y - topbtn.height - 35;
			this._settingAndMailContainer.addChild(cityEmpOutingContainer);
			this._cityEmpOutingContainer = cityEmpOutingContainer;
			if (Api.emperorAchieveVoApi.isShowEmperorOutIcon() && (!this._isAtHome)){
				cityEmpOutingContainer.visible = true;
			}
			else{
				cityEmpOutingContainer.visible = false;
			}

			//出巡按钮 府内
			let homeEmpOutingContainer = this.creatEmpOutingBtn();
			homeEmpOutingContainer.x = GameConfig.stageWidth - homeEmpOutingContainer.width - 25;
			homeEmpOutingContainer.y = -330;
			if (Api.switchVoApi.checkOpenHouseBtnUp()){
				homeEmpOutingContainer.y = -345;
			}
			this._rightBtnContainer.addChild(homeEmpOutingContainer);
			this._homeEmpOutingContainer = homeEmpOutingContainer;
			if (Api.emperorAchieveVoApi.isShowEmperorOutIcon() && this._isAtHome){
				homeEmpOutingContainer.visible = true;
			}
			else{
				homeEmpOutingContainer.visible = false;
			}
		}

		if(Api.switchVoApi.checkOpenChangeBg() && Config.SceneCfg.isSceneMulti() && (!Api.switchVoApi.checkOpenHouseBtnUp())){
			this._changebgButton = ComponentManager.getButton("mainui_changebg_btn",null,this.showChangeBg,this,null,1);
			this._changebgButton.setPosition(this._friendsBtn.x-this._changebgButton.width , this._friendsBtn.y);
			// this._bottomContiner.addChild(this._changebgButton);
			this._rightBtnContainer.addChild(this._changebgButton);
			this.checkChangeBgState();

			this._homeBottomBtns.push(this._changebgButton);
		}
		//珍器房
		if(Api.switchVoApi.checkZhenQiFangOpen()  && (!Api.switchVoApi.checkOpenHouseBtnUp())){
			let tmpx = this._changebgButton ? this._changebgButton.x : this._friendsBtn.x;
			this._zhenqifangButton = ComponentManager.getButton("zhenqifangenter",null,this.openZhenqifang,this,null,1);
			this._zhenqifangButton.setPosition(tmpx-this._zhenqifangButton.width , this._friendsBtn.y);
			// this._bottomContiner.addChild(this._zhenqifangButton);
			this._rightBtnContainer.addChild(this._zhenqifangButton);
			this.checkZhenQiFangState();
			if (Api.unlocklist2VoApi.checkShowOpenFunc()){
				if (Api.zhenqifangVoApi.isShowNpc()){
					this._zhenqifangButton.visible = true;
				}
				else{
					this._zhenqifangButton.visible = false;
				}
			}
			else{
				this._zhenqifangButton.visible = true;
			}

			this._homeBottomBtns.push(this._zhenqifangButton);
		}
		//皇城六部
		if (Api.switchVoApi.checkOpenSixSection() && Api.switchVoApi.checkOpenHouseBtnUp()){
			let tmpx = this._housekeeperbtn ? this._housekeeperbtn.x : this._houseFuncBtn.x;
			let sixSectionBtn = ComponentManager.getButton("mainui_sixsectionbtn",null,this.openSixSection,this,null,1);
			sixSectionBtn.setPosition(tmpx - sixSectionBtn.width, this._houseFuncBtn.y);
			this._rightBtnContainer.addChild(sixSectionBtn);
			this._homeBottomBtns.push(sixSectionBtn);
			this._sixSectionBtn = sixSectionBtn;
			this.checkSixSectionState();
		}
		App.LogUtil.log("initbottom "+this._homeBottomBtns.length);
		this.resetHomeBottomBtns();

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL,this.checkMailState,this);

		this.doRefreshTaskInfo();
		this.refreshTaskContainerStatus();
		let public_dot3 = BaseBitmap.create("public_dot2");
		this._bottomContiner.addChild(public_dot3);
		public_dot3.visible = false;
        this.setLayoutPosition(LayoutConst.righttop, public_dot3, chatIcon, [0,-20]);
		this._redPoint = public_dot3; 
		Api.chatVoApi.clearPriChatList();
		NetManager.request(NetRequestConst.REQUEST_PRICHAT_GETMSG, {
			isall : 1
		});


		if(App.DeviceUtil.isWXgame())
		{
			PlatformManager.getWXMoreGameIcon(this.createMoreGameBtn,this);
		}
		let chatStatus:ChatSocketStatus=new ChatSocketStatus();
		chatStatus.setPosition(this._chatTxt.x,chatbg.y+(chatbg.height-chatStatus.height)/2);
		this._bottomContiner.addChild(chatStatus);

		this.checkShowCityDailyBossBtn();
		if (Api.unlocklist2VoApi.checkShowOpenFunc()){
			App.LogUtil.log("mainui.ts init checkWaitingShowInHome");
			Api.unlocklist2VoApi.checkWaitingShowInHome();
		}
	}

	//府内按钮收起
	private houseFuncBtnClick():void{
		this._isShowHouseFunc = !this._isShowHouseFunc;
		let houseBtnFlag = <BaseBitmap>this._houseFuncBtn.getChildByName("houseFuncBtnFlag");
		houseBtnFlag.visible = this._isShowHouseFunc;
		if (this._isShowHouseFunc){
			if (this._houseFuncBtnContainer){
				this._houseFuncBtnContainer.visible = true;
			}
			else{
				let houseFuncBtnContainer = new MainUIHouseFuncBtnView({obj: this, callback: this.houseFuncBtnClick});
				App.LogUtil.log("houseFuncBtnContainer "+houseFuncBtnContainer.width);
				houseFuncBtnContainer.setPosition(GameConfig.stageWidth - houseFuncBtnContainer.width - 10, this._houseFuncBtn.y - houseFuncBtnContainer.height - 5);
				this._rightBtnContainer.addChild(houseFuncBtnContainer);
				this._houseFuncBtnContainer = houseFuncBtnContainer;
			}
		}
		else{
			if (this._houseFuncBtnContainer){
				this._houseFuncBtnContainer.dispose();
				this._houseFuncBtnContainer = null;
			}
		}
	}

	private freshGuide(evt?:egret.Event):void{
		if (evt && evt.data){
			let key = evt.data.key;
			if (key == "zhenqifang_1"){
				if (this._isAtHome && Api.switchVoApi.checkOpenHouseBtnUp()){
					// if (!this._houseFuncBtnContainer){
					// 	this.houseFuncBtnClick();
					// }
					// else{
					// 	this._houseFuncBtnContainer.visible = true;
					// }
					if (this._houseFuncBtnContainer){
						this._houseFuncBtnContainer.dispose();
						this._houseFuncBtnContainer = null;
					}
					this._isShowHouseFunc = true;
					let houseFuncBtnContainer = new MainUIHouseFuncBtnView({obj: this, callback: this.houseFuncBtnClick});
					houseFuncBtnContainer.setPosition(GameConfig.stageWidth - houseFuncBtnContainer.width - 10, this._houseFuncBtn.y - houseFuncBtnContainer.height - 5);
					this._rightBtnContainer.addChild(houseFuncBtnContainer);
					this._houseFuncBtnContainer = houseFuncBtnContainer;
				}
			}
		}
	}

	private checkHouseFuncBtn(evt?:egret.Event):void{
		if (evt && evt.data){
			let key = evt.data.key;
			if (key == "friend"){
				if (this._isAtHome && Api.switchVoApi.checkOpenHouseBtnUp()){
					this._isShowHouseFunc = true;
					let houseBtnFlag = <BaseBitmap>this._houseFuncBtn.getChildByName("houseFuncBtnFlag");
					houseBtnFlag.visible = this._isShowHouseFunc;
					if (this._houseFuncBtnContainer){
						this._houseFuncBtnContainer.dispose();
						this._houseFuncBtnContainer = null;
					}
					if (this._isShowHouseFunc){
						let houseFuncBtnContainer = new MainUIHouseFuncBtnView({obj: this, callback: this.houseFuncBtnClick, isOpenFunc: 1});
						houseFuncBtnContainer.setPosition(GameConfig.stageWidth - houseFuncBtnContainer.width - 10, this._houseFuncBtn.y - houseFuncBtnContainer.height - 5);
						this._rightBtnContainer.addChild(houseFuncBtnContainer);
						this._houseFuncBtnContainer = houseFuncBtnContainer;
					}
				}
			}
		}
	}

	private freshOpenFunction(evt:egret.Event):void{
		if (evt && evt.data){
			let key = evt.data.key;
			if (key == "friend"){
				if (this._friendsBtn){
					this._friendsBtn.visible = true;
					this.resetHomeBottomBtns();
				}
			}
		}
	}

	private checkShowCityDailyBossBtn():void
	{
		if (Api.otherInfoVoApi.isSceneCanScroll("cityScene"))
		{	
			if (!this._rightBtnContainer2)
			{
				return;
			}
			if (!this._cityDailybossContainer)
			{
				this._cityDailybossContainer = new BaseDisplayObjectContainer();
				this._rightBtnContainer2.addChild(this._cityDailybossContainer);
				// this._cityDailybossContainer.addTouchTap(this.openDailybossView,this);

				let bossicon = ComponentManager.getButton("mainui_dailyboss",null,this.openDailybossView,this,null);
				bossicon.setScale(1);
				bossicon.x = 0;
				bossicon.y = 15;
				this._cityDailybossContainer.setPosition(GameConfig.stageWidth-16-bossicon.width,GameConfig.stageHeigth-360);
				this._cityDailybossContainer.addChild(bossicon);

				

				let clip = ComponentManager.getCustomMovieClip("mainui_dailyboss_fire",6);
				bossicon.addChild(clip);
				clip.playWithTime(0);

				let bossname = BaseBitmap.create("mainui_dailyboss_text");
				bossname.setPosition(bossicon.width/2-bossname.width/2+2,bossicon.height-10);
				this._cityDailybossContainer.addChild(bossname);
				
			
			}

			// TimerManager.remove(this.checkShowCityDailyBossBtn,this);
			//检查是否显示 只有在攻打蛮王蛮兵时候显示
			let status1:number=Api.dailybossVoApi.getStatusByName("boss1");
			let isShow:boolean = false;
			// let checktime:number = 0;
			if (status1==1)
			{
				isShow = true;
				// checktime=Api.dailybossVoApi.getEndTimeByName("boss1");
			}
			else
			{
				// checktime=Api.dailybossVoApi.getNextStartLeftTimeByName("boss1");
			}
			if (isShow==false)
			{
				if (Api.switchVoApi.checkNewDailyBoss())
				{
					let status2:number=Api.dailybossnewVoApi.getStatusByName("bossnew");
					if (status2==1)
					{
						isShow = true;
						// checktime=Api.dailybossVoApi.getEndTimeByName("bossnew");
					}
					else
					{
						let checktime2=Api.dailybossVoApi.getNextStartLeftTimeByName("bossnew");
						// if (checktime2<checktime)
						// {
						// 	checktime = checktime2;
						// }
					}
				}
				else
				{
					let status2:number=Api.dailybossVoApi.getStatusByName("boss2");
					if (status2==1)
					{
						isShow = true;
						// checktime=Api.dailybossVoApi.getEndTimeByName("boss2");
					}
					// else
					// {
					// 	let checktime2=Api.dailybossVoApi.getNextStartLeftTimeByName("boss2");
					// 	if (checktime2<checktime)
					// 	{
					// 		checktime = checktime2;
					// 	}
					// }
				}
			}
			// isShow = true;
			this._cityDailybossContainer.visible = isShow;
			// TimerManager.doTimer(checktime*1000+3000,1,this.checkShowCityDailyBossBtn,this);

		}
		else
		{
			if (this._cityDailybossContainer)
			{
				this._cityDailybossContainer.visible = false;
			}
		}
	}

	private openDailybossView():void
	{	
		if(Api.rookieVoApi.isGuiding){
			return;
		}

		ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSVIEW);
	}

	private openZhenqifang():void{
		
		if(Api.rookieVoApi.isGuiding && Api.rookieVoApi.curStep == "102"){
			return;
		}

		let view = this;
		if(Api.zhenqifangVoApi.isShowNpc()){
			ViewController.getInstance().openView(ViewConst.COMMON.ZHENQIFANGVIEW);
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]));
		}
	}

	//皇城六部
	private openSixSection():void{
		if(Api.rookieVoApi.isGuiding)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTIONVIEW);
	}

	private showChangeBg():void
	{	
		if(Api.rookieVoApi.isGuiding)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.CHANGEBGVIEW);
	}

	private createMoreGameBtn(msg:any)
	{
		// alert(msg);
		console.log("msg"+msg); 
		this._wxMoreGameIcon = BaseLoadBitmap.create(msg);	
		this._wxMoreGameIcon.x = GameConfig.stageWidth - 100;
		this._wxMoreGameIcon.y = 200;
		this.addChild(this._wxMoreGameIcon);
		this._wxMoreGameIcon.touchEnabled = true;
		this._wxMoreGameIcon.addTouchTap(this.showMoreGame,this);
		this._wxMoreGameIcon.visible = false;
	}
	private showMoreGame()
	{
		if(App.DeviceUtil.isWXgame())
		{
			PlatformManager.showWXMoreGame();
		}
	}
	private checkIsRefresh():void
	{
		if(Api.otherInfoVoApi.getFunctionRedhot())
		{
			this.refreshText(); 
		}
	}

	private resetHomeBottomBtns():void
	{
		let offX = 76;
		if (Api.switchVoApi.checkOpenHouseBtnUp()){
			offX = 100;
		}
		let posx = GameConfig.stageWidth-offX;
		for (let i = 0; i<this._homeBottomBtns.length; i++)
		{
			let onebtn = this._homeBottomBtns[i];
			if (onebtn.visible)
			{
				if (i == 0 && Api.switchVoApi.checkOpenHouseBtnUp()){
					posx -=10;
				}
				onebtn.x = posx;
				posx -= offX;
			}
		}
	}

	private refreshText():void
	{

		if(this._functionTxt)
		{
			if(Api.otherInfoVoApi.getFunctionName()==null)
			{
				// this._bottomContiner.removeChild(this._functionPreviewBg);
				// this._bottomContiner.removeChild(this._functionTxt);
				// this._bottomContiner.removeChild(this._functionIcon);
				if(this._functionPreviewBg&&this._taskContainer.contains(this._functionPreviewBg))
				{
					this._taskContainer.removeChild(this._functionPreviewBg);
					this._functionPreviewBg = null;
				}
				if(this._functionTxt&&this._taskContainer.contains(this._functionTxt))
				{
					this._taskContainer.removeChild(this._functionTxt);
				}
				if(this._functionIcon&&this._taskContainer.contains(this._functionIcon))
				{
					this._taskContainer.removeChild(this._functionIcon);
				}
				if(this._functionAni&&this._bottomContiner.contains(this._functionAni)){
					this._bottomContiner.removeChild(this._functionAni);
					this._functionAni = null;
				}
			}
			else
			{
				this._functionTxt.text  =  Api.otherInfoVoApi.getFunctionName();
				if(Api.otherInfoVoApi.getFunctionRedhot())
				{
					this._functionTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
				}
				else
				{
					this._functionTxt.textColor =TextFieldConst.COLOR_WHITE;	
				}

				if(Api.otherInfoVoApi.getFunctionRedhot()){
					if(!this._functionAni){
						this._functionAni = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
						this._functionAni.x = 5;
						this._functionAni.y = -303;
						this._functionAni.name = "taskeffect";
						this._bottomContiner.addChild(this._functionAni);
						this._functionAni.playWithTime(0);

						if (!this._isAtHome)
						{
							this._functionAni.visible = false;
						}
					}
				}else{
					if(this._functionAni){
						this._bottomContiner.removeChild(this._functionAni);
						this._functionAni = null;
					}
				}
			}
			let welfareIcon = this.getTopBtnByName("welfare");
			if(welfareIcon)
			{
				let firstRechargeflag = Api.shopVoApi.getPayFlag();
				let signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
				let functionPreViewRedDot = Api.otherInfoVoApi.getFunctionRedhot();
				if(firstRechargeflag == 1 || signinShowRedDot == true||functionPreViewRedDot==true)
				{
					App.CommonUtil.addIconToBDOC(welfareIcon);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(welfareIcon);
				}
			}
		}
	}

	protected refreshTaskContainerStatus():void
	{
		if (this._isAtHome)
		{
			this._iconContainer.visible=true;
			this._leftIconContainer.visible = true;
			this._settingAndMailContainer.visible = false;
			this._rightBtnContainer2.visible = false;
			if (Api.switchVoApi.checkTWShenhe() == true) {
				// this._iconContainer.visible = false;
				for (let k in this._activityIconList) {
					let v:BaseDisplayObjectContainer = this._activityIconList[k];
					if (v.name == "welfare_func"&&Api.switchVoApi.checkIsOlyShenheFile()==false) {
						v.setPosition(30+v.width/2,v.height/2);
					}
					else {
						v.visible = false;
					}
				}
			}
			// this._taskContainer.visible = true;
		}else
		{
			this._iconContainer.visible=false;
			this._leftIconContainer.visible = false;
			this._leftIconArrowContainer.visible = false;
			this._settingAndMailContainer.visible = true
			this._rightBtnContainer2.visible = true;
			// this._taskContainer.visible = false;
		}
	}
	protected roleHeadClickHandler():void
	{
		PlayerBottomUI.getInstance().show();
	}
	private functionClickHandler():void
	{
		if(Api.rookieVoApi.isGuiding)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWFUNCTIONPREVIEW);
	}

	protected mailBtnClickHandler():void
	{
		// NetManager.request(NetRequestConst.REQUEST_MAIL_GET_MYMAILLIST,null);
		ViewController.getInstance().openView(ViewConst.POPUP.MAILPOPUPVIEW);
	}

	protected helpBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SETTINGHELPPOPUPVIEW);
	}

	protected settingBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SettingPopopView, {});
	}
	protected missionBtnClickHandler():void
	{
		
		if (Api.rookieVoApi.isInGuiding && Api.rookieVoApi.curStep == "113")
		{	
			ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
			return;
		}

		if (Api.rookieVoApi.isGuiding && Api.rookieVoApi.curStep != "128")
		{
			return;
		}

		/**
		 * 跳转每日任务
		 */
		if(Api.mainTaskVoApi.getCurMainTaskId() == null)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.MainTASKPOPUPVIEW);
	}
	protected chatBgClickHandler():void
	{	
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}
		// App.LogUtil.log("chatBgClickHandler >>>>> ");
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEW);
	}
	protected addGoldBtnClickHandler():void
	{

	}

	//出巡按钮回调
	protected outingBtnClickHandler():void{
		if (Api.rookieVoApi.isGuiding){
			return ;
		}
		let data = Api.emperorAchieveVoApi.getOutList();
		if (data.length > 0){
			if (data.length == 1){
				ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTVIEW, {uid: data[0].uid});
			}
			else{
				ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTLISTPOPUPVIEW);
			// ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTFIRSTANIVIEW, {uid: data[0].uid});
			}
		}
	}

	//刷新出巡按钮
	private freshEmpOutBtn():void{
		if (!Api.switchVoApi.checkTitleUpgrade() || !Api.switchVoApi.checkOpenEmperorsAchievement()){
			return;
		}
		if (!this._cityEmpOutingContainer){
			return;
		}
		if (!Api.emperorAchieveVoApi.isShowEmperorOutIcon()){
			this._homeEmpOutingContainer.visible = false;
			this._cityEmpOutingContainer.visible = false;
			return;
		}
		else{
			if (this._isAtHome){
				this._homeEmpOutingContainer.visible = true;
				this._cityEmpOutingContainer.visible = false;
				//刷新位置
				if (this._empContainer){
					if (this._examContainer && this._examContainer.visible == true){
						this._homeEmpOutingContainer.x = this._examContainer.x - this._examContainer.width - 10;
					}
					else{
						this._homeEmpOutingContainer.x =this._empContainer.x - this._homeEmpOutingContainer.width - 1;
					}
				}
				else{
					if (this._examContainer && this._examContainer.visible == true){
						this._homeEmpOutingContainer.x = this._examContainer.x - this._examContainer.width - 10;
					}
					else{
						this._homeEmpOutingContainer.x = GameConfig.stageWidth - this._homeEmpOutingContainer.width - 25;
					}
				}
			}
			else{
				this._cityEmpOutingContainer.visible = true;
				this._homeEmpOutingContainer.visible = false;
			}
		}
		//刷新红点
		if (Api.emperorAchieveVoApi.isShowEmpOutRedDot()){
			App.CommonUtil.addIconToBDOC(this._homeEmpOutingContainer);
			App.CommonUtil.addIconToBDOC(this._cityEmpOutingContainer);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(this._homeEmpOutingContainer);
			App.CommonUtil.removeIconFromBDOC(this._cityEmpOutingContainer);
		}
		if (Api.emperorAchieveVoApi.isShowEmpOutAni()){
			let data = Api.emperorAchieveVoApi.getOutList();
			App.LogUtil.log("data*** "+data.length);
			if (data.length > 0 && !ViewController.getInstance().checkHasShowedView()){
				let uid = data[data.length - 1].uid;
				Api.emperorAchieveVoApi.setShowAni(false);
				ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTFIRSTANIVIEW, {uid:uid});
			}
		}
	}

	private doDinnerGuide()
	{
		if(this._isAtHome){
			this.goOutBtnClickHandler();
		}
	}
	protected goOutBtnClickHandler():void
	{
		App.LogUtil.log("goOutBtnClickHandler 0");
		if (Api.switchVoApi.checkOpenGooutAni()){
			if(this._isGooutAniing){
				return;
			}
			App.LogUtil.log("goOutBtnClickHandler 1");
			this.showSwitchCityAni(this.switchSceneSuccess,this);
		}
		else{
			App.LogUtil.log("goOutBtnClickHandler 2");
			SceneController.getInstance().jump(this.switchSceneSuccess,this);
		}
		
	}

	private switchSceneSuccess():void
	{	
		App.LogUtil.log("**showGooutAni** switchSeceneSucces  isathome "+ this._isAtHome);
		if (this._isAtHome)
		{
			App.LogUtil.log("**showGooutAni** switchSeceneSuccess athome start");
			if(!Api.chatVoApi.getIsReadCross()){
				Api.chatVoApi.setIsReadCross(true);
			}
			this._goOutBtn.texture = ResourceManager.getRes(Api.switchVoApi.chekcOpenNewUi() ? "mainui_btn3_new" : "mainui_btn3");
			this._gououtTxt.setRes(`mainui_btn3_text_new`);
			this._gououtTxt.visible = Api.switchVoApi.chekcOpenNewUi();
			if(this._empBtn){
				this._empContainer.visible = true;
			}
			else{
				let api = Api.emperorwarVoApi;
				if(api.isInShow()){
					this.checkEmpBtn();
				}
			}
			if(this._functionPreviewBg)
			{
				this._functionPreviewBg.visible=true;
				this._functionTxt.visible=true;
				this._functionIcon.visible=true;
				if(this._functionAni)
				{
					this._functionAni.visible = true;
				}
			}
			if (this._tuyouBackToLobby)
			{
				this._tuyouBackToLobby.visible = false;
			}
			if(this._friendsBtn){
				if (Api.unlocklist2VoApi.checkShowOpenFunc()){
					if (Api.unlocklist2VoApi.checkIsCanShowFunc("friend")){
						this._friendsBtn.visible = true;
					}
					else{
						this._friendsBtn.visible = false;
					}
				}
				else{
					this._friendsBtn.visible = true;
				}
				if(Api.friendVoApi.isShowNpc())
				{
					this._friendsBtn.setGray(false);
				}
				else
				{
					this._friendsBtn.setGray(true);
				}
			}
			if(this._changebgButton && Api.switchVoApi.checkOpenChangeBg() ){
				this._changebgButton.visible = true;
			}
			if(this._housekeeperbtn && Api.switchVoApi.checkOpenHousekeeper()  && Api.playerVoApi.getPlayerLevel() >= Config.MasterCfg.levelLimit){
				this._housekeeperbtn.visible = true;
			}

			if(this._zhenqifangButton && ((!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkZhenQiFangOpen()) || (Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkZhenQiFangOpen() && Api.zhenqifangVoApi.isShowNpc()))){
				this._zhenqifangButton.visible = true;
			}

			if (this._houseFuncBtn){
				this._houseFuncBtn.visible = true;
			}
			if (this._sixSectionBtn){
				this._sixSectionBtn.visible = true;
			}
			if (this._houseFuncBtnContainer){
				this._houseFuncBtnContainer.visible = this._isShowHouseFunc;
			}

			this.resetHomeBottomBtns();

			if(this._wxMoreGameIcon)
			{
				this._wxMoreGameIcon.visible = false;
			}
			if (!App.DateUtil.checkIsToday(GameData.acPopTime))
			{
				if (Api.switchVoApi.checkOpenActivityPop() && Api.rookieVoApi.isInGuiding == false)
				{
					Api.acVoApi.checkShowePopupView();
				}
			}
			if (this._examContainer){
				this._examContainer.visible = true;
			}
			if (this._homeEmpOutingContainer){
				if (Api.emperorAchieveVoApi.isShowEmperorOutIcon()){
					this._homeEmpOutingContainer.visible = true;
				}
				else{
					this._homeEmpOutingContainer.visible = false;
				}
			}
			if (this._cityEmpOutingContainer){
				this._cityEmpOutingContainer.visible = false;
			}

			GameData.acPopTime = GameData.serverTime;
			if(this.outcityzqf){
				this.outcityzqf = false;
				if(Api.switchVoApi.checkWeaponFunction()){
					Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_1"},true);
				}
			}
			App.LogUtil.log("**showGooutAni** switchSeceneSuccess athome end");
		}else{
			App.LogUtil.log("**showGooutAni** switchSeceneSuccess outhome start");
			if(Api.switchVoApi.checkOpenCountryWar()){
				if(!Api.countryWarVoApi.init){
					NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, {});
				}
			}
			if(this._functionPreviewBg)
			{
				this._functionPreviewBg.visible=false;
				this._functionTxt.visible=false;
				this._functionIcon.visible=false;
				if(this._functionAni)
				{
					this._functionAni.visible = false;
				}
			}
			this._goOutBtn.texture = ResourceManager.getRes(Api.switchVoApi.chekcOpenNewUi() ? "mainui_btn3_1_new" : "mainui_btn3_1");
			this._gououtTxt.setRes(`mainui_btn3_1_text_new`);
			if (this._tuyouBackToLobby)
			{
				this._tuyouBackToLobby.visible = true;
			}
			if(this._empBtn){
				this._empContainer.visible = false;
			}
			if(this._friendsBtn){
				this._friendsBtn.visible = false;
			}
			if(this._changebgButton)
			{
				this._changebgButton.visible = false;
			}
			if(this._housekeeperbtn)
			{
				this._housekeeperbtn.visible = false;
			}
			if(this._zhenqifangButton)
			{
				this._zhenqifangButton.visible = false;
			}
			if (this._houseFuncBtn){
				this._houseFuncBtn.visible = false;
			}
			if (this._sixSectionBtn){
				this._sixSectionBtn.visible = false;
			}
			if (this._houseFuncBtnContainer){
				this._houseFuncBtnContainer.visible = false;
				this.houseFuncBtnClick();
			}
			if(this._wxMoreGameIcon)
			{
				this._wxMoreGameIcon.visible = true;
			}
			if (this._examContainer){
				this._examContainer.visible = false;
			}
			if (this._cityEmpOutingContainer){
				if (Api.emperorAchieveVoApi.isShowEmperorOutIcon()){
					this._cityEmpOutingContainer.visible = true;
				}
				else{
					this._cityEmpOutingContainer.visible = false;
				}
			}
			if (this._homeEmpOutingContainer){
				this._homeEmpOutingContainer.visible = false;
			}
			this.extendPackup();
			App.LogUtil.log("**showGooutAni** switchSeceneSuccess outhome end");
		}
		
		this.refreshTaskContainerStatus();
		App.LogUtil.log("**showGooutAni** switchSeceneSuccess other 1");
		if (Api.rookieVoApi.curStep != "atkrace_1" && Api.rookieVoApi.curStep != "search_1"  && Api.rookieVoApi.curStep != "dinner_1")
		{
			App.LogUtil.log("**showGooutAni** switchSeceneSuccess other 2");
			Api.rookieVoApi.checkNextStep();
		}
		App.LogUtil.log("**showGooutAni** switchSeceneSuccess other 3");
		Api.rookieVoApi.checkWaitingGuide();
		if(Api.switchVoApi.checkIsInBlueWife()&&Api.switchVoApi.checkOpenBlueWifeOutHomeStory())
		{
			App.LogUtil.log("**showGooutAni** switchSeceneSuccess other 4");
			this.openHomeStory()
		}
		App.LogUtil.log("**showGooutAni** switchSeceneSuccess other 5");
		if (Api.unlocklist2VoApi.checkShowOpenFunc()){
			App.LogUtil.log("mainui.ts switch scene checkWaitingShowInHome");
			Api.unlocklist2VoApi.setAtHome(this._isAtHome);
			Api.unlocklist2VoApi.checkWaitingShowInHome();
		}
	}

	private openHomeStory()
	{
		if(Api.rookieVoApi.curGuideKey!=null||this._isAtHome||Api.searchVoApi.isShowNpc()||!Api.switchVoApi.checkIsInBlueWife())
		{
			return;
		}
		let num =0;
		if(Api.otherInfoVoApi.getOtherInfoVo().kvmap&&Api.otherInfoVoApi.getOtherInfoVo().kvmap["homestorynum"])
		{
			num = Number(Api.otherInfoVoApi.getOtherInfoVo().kvmap["homestorynum"]);
		}
		num ++;
		NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETKV,{k:"homestorynum",v:num});
		let storys = {
			"2":
				{
					id:"101022",
					wifeid:"102",
				},
			"4":
				{
					id:"104018",
					wifeid:"103",
				},
			"7":
				{
					id:"103017",
					wifeid:"104",
				},
			"9":
				{
					id:"105021",
					wifeid:"105",
				},
		}
		
		if(storys[num+""])
		{
			let wifevo = Api.wifeVoApi.getWifeInfoVoById(storys[num+""].wifeid);
			let cfg = Config.WifeCfg.getWifeCfgById(storys[num+""].wifeid);
			if(wifevo || !cfg.canBlueWife)
			{
				return;
			}
			ViewController.getInstance().openView(ViewConst.BASE.WIFECHANGESEXAVGVIEW, {callback: null, target:this, storyId:storys[num+""].id});
			// ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW,{callback: null, target:this, storyId:storys[]});
		}
		
	}

	protected bottomBtnClickHandler(param:any):void
	{
		
		// let isOPen= param.isOPen;
		// if(!isOPen)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
		// 	return;
		// }
		let btnName = param.btnName;
		switch (btnName)
		{
			case "servant":
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
				
				break;
			case "item":
				ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB1);
				//测试获得门客或者红颜出对话框功能
				// ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1036","1036"]);
				// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:["306","306"]});
				break;
			case "dailytask":
				ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
				break;
			case "achieve":
				ViewController.getInstance().openView(ViewConst.COMMON.ACHIEVEMENTVIEW);
				//test code.
				//ViewController.getInstance().openView(ViewConst.COMMON.SERVANTNEWUIVIEW,"1001");
				//test code.
				// ViewController.getInstance().openView(ViewConst.COMMON.SERVANTNEWUIVIEW,"1001");
				// ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"weapon_5",f:null,o:this});
				break;
			case "shop": 
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2);
				//test code
				// Api.rookieVoApi.isInGuiding = true;
				// ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"112",f:null,o:this});
				//  ViewController.getInstance().openView(ViewConst.COMMON.OFFICIALCAREERVIEW);//{changeImg:true,}
				// ViewController.getInstance().openView("Special23GetView", {id:"1001",type:23});
				// ViewController.getInstance().openView("Special23GetView", {id:"1001",type:23});
				break;
			case "welfare":
				App.LogUtil.log("welfareCkick >>>> " );
				break;
			case "challenge":
				ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
				break;
			case "manage":
				ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
				break;
			default:
				break;
		}
	}
	
	protected getResourceList():string[]
	{
		let arr = ["mainui_btn1","mainui_fg",
		"mainui_taskbg170",
		"mainui_bottombg","mainui_missionIcon1","mainui_missionIcon2",
		"mainui_bottomimg1",
		"mainui_bottomimg2",
		"mainui_bottomimg3",
		"mainui_bottomimg4",
		"mainui_bottomimg5",
		"mainui_bottomimg8",
		"mainui_bottomimg12",
		"mainui_bottombtnbg",
		"mainui_chatbg",
		"mainui_chatIcon",
		"mainui_btn3",
		"mainui_headbg",
		"mainui_btn3_1",
		"mainui_iconani",
		"mainui_functionpreview",
		"mainui_funicon",
		"taskeffect",
		"studyatk_arrow",
		"mainui_bubble",
		"mainui_friends_btn","mainui_housekeeper_btn",
		"mainui_changebg_btn","mainui_packup_bg","mainui_packup_arrow","mainui_packup_text1","mainui_packup_text2",
		"guide_hand","exam_icon", "exam_icon_name","meetbeauty_icon_name","meetbeauty_icon","meetbeauty_icon_1","meetbeauty_icon_2","meetbeauty_icon_3,bureaucrat_guide_icon,bureaucrat_guide_icon_name"
		,"zhenqifangenter","mainui_empoutbtnbg", "mainui_empoutbtn_name",
		"mainui_dailyboss_text","mainui_dailyboss","mainui_sixsectionbtn",
		"mainui_houseBtnbg","mainui_housefun_btn","mainui_housekeeper_new_btn","mainui_housefunbtn_flag",
		];
		if(Api.switchVoApi.chekcOpenNewUi()){
			arr.push(`mainuinew`);
		}
		if(Api.switchVoApi.checkEmperorOpen()==true)
		{	
			let api = Api.emperorwarVoApi;
			if (api.getVersion() > 0 && api.isInShow())//
			{	
				arr = arr.concat(["empBtnname","empBtnBg","empcircle","emplight","emptitlecircle","empturncircle","empbtn"]);
			}	
		}
		if(Api.switchVoApi.checkOpenMainUIHelpBtn()){
			arr.push(`mainui_help`);
		}
		// if(PlatformManager.getAppid() == "17018002")
		// {
		// 	arr = arr.concat(["givejdpeas_icon","givejdpeas_name"]);
		// }

		return arr;
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.uiLayer;
	}

	/**
	 * 根据名称获取按钮
	 * @param name 
	 */
	private getTopBtnByName(name:string):BaseDisplayObjectContainer
	{
		let l=this._activityIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			if(icon && icon.name &&icon.name.split("_")[0] == name)
			{
				return icon;
			}
		}
		return null;
	}

	private checkRealnameRewards():void
	{	
		if (GameData.idcardSwitch==true && GameData.idcardNormal == 1)
		{
			let icon = this.createMainUIIcon("realnamerewards");
			if (icon)
			{
				if (Api.gameinfoVoApi.getRealnameRewards()==0)
				{
					this.removeMainUIIcon("realnamerewards");
				}
				else if (Api.gameinfoVoApi.getRealnameRewards()==2)
				{
					App.CommonUtil.addIconToBDOC(icon);
				}
			}
		}
	}

	private checkFirstRechargeIcon():void
	{
		if (Api.switchVoApi.checkClosePay()) {
			return;
		}
		if(Api.switchVoApi.checkLeftActIconOpen()){
			if(Api.shopVoApi.getPayFlag()==2)
			{
				this.removeLeftIcon("firstrecharge");
			}
			else
			{
				let icon = this.getLeftIcon("firstrecharge");
				if(icon){
					if(Api.shopVoApi.getPayFlag()==1)
					{
						App.CommonUtil.addIconToBDOC(icon);
						let redpot = icon.getChildByName(`reddot`);
						if(redpot){
							redpot.x = 85;
							redpot.y = 25;
						}
					}
					else
					{
						App.CommonUtil.removeIconFromBDOC(icon);
					}
				}
			}
		}
		else{
			if(Api.shopVoApi.getPayFlag()==2)
			{
				this.removeMainUIIcon("firstrecharge");
			}
			else
			{
				let icon = this.createMainUIIcon("firstrecharge");
				if(Api.shopVoApi.getPayFlag()==1)
				{
					App.CommonUtil.addIconToBDOC(icon);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
			}
		}
	}

	/**
	 * 检测福利红点
	 */
	private checkWelfareState():void
	{
		let welfareIcon = this.getTopBtnByName("welfare");
		if(welfareIcon)
		{
			let firstRechargeflag = Api.shopVoApi.getPayFlag();
			let signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
			let functionPreViewRedDot = Api.otherInfoVoApi.getFunctionRedhot();
			let newinviteRedDot = Api.newinviteVoApi.getShowRed();
			let newrebackRedDot = Api.newrebackVoApi.getShowRed();
			if(firstRechargeflag == 1 || signinShowRedDot == true||functionPreViewRedDot==true||newrebackRedDot==true)
			{
				App.CommonUtil.addIconToBDOC(welfareIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(welfareIcon);
			}
		}
		this.checkFirstRechargeIcon();
		this.checkRealnameRewards();
		this.checkCardIcon();
		this.initCardIcons();  

		this.checkSignState();
		//检测限时红颜  使用的shop model 
 		this.initTimeLimitWifeIcon();
		this.checkTimelimitwife();
		this.checkHousekeeperBtnState();
		this.checkGrowGold();
	}

	private checkGrowGold():void
	{
		if(Api.switchVoApi.checkOpenGrowGold()){
			if (Api.shopVoApi.checkShowGrowGold())
			{
				let icon = this.createMainUIIcon("growGold");
				if(Api.shopVoApi.checkGrowGoldRed())
				{
					App.CommonUtil.addIconToBDOC(icon);
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
			}
			else
			{
				this.removeMainUIIcon("growGold");
			}
		}
		else
		{
			this.removeMainUIIcon("growGold");
		}
	}

	private checkSignState():void
	{
		this.initSignIcons(); 
	}

	private checkLeftRedpoint():void{


		if (Api.acVoApi.isHandled_LRP)
		{
			return;
		}
		Api.acVoApi.isHandled_LRP = true;
		//活动部分 首冲月卡年卡在原有方法中处理
		let leftactlist = this._leftIconList;
		for(let i in leftactlist){
			let unit = leftactlist[i].name;
			let aid = unit.split(`_`)[0];
			let type = unit.split(`_`)[1] ? unit.split(`_`)[1] : '';
			let vo : AcBaseVo = null;
			if(type == ``){
				if(aid == `battlePass`){
					let voList = Api.acVoApi.getActivityVoListByAid(aid);
					for(let i = 0; i < voList.length; ++ i){
						let acvo = voList[i];
						if(Number(acvo.code) != 4 && Number(acvo.code) != 7){
							vo = acvo;
							break;
						}
					}
				}
				else{
					vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
				}
			}
			else{
				vo = Api.acVoApi.checkActivityStartByAidAndType(aid, type);
			}
			if(vo && vo.isStart && (vo.isShowRedDot == true)){
				App.CommonUtil.addIconToBDOC(leftactlist[i]);
				let redpot = leftactlist[i].getChildByName(`reddot`);
				if(redpot){
					redpot.x = 90;
					redpot.y = 20;
				}
			}
			else{
				App.CommonUtil.removeIconFromBDOC(leftactlist[i]);
			}
		}
		//扩展部分红点
		let maxlen = Config.BigiconCfg.getMaxIconLength();
		let arr = Config.BigiconCfg.getBigIcon();
		if(arr.length > maxlen){
			for(let i = maxlen; i < arr.length; ++ i){
				let unit = arr[i];
				if(unit){
					let aid = unit.activity;
					let type = unit.type ? unit.type : ''; 
					let vo : AcBaseVo = null;
					if(type == ``){
						if(aid == `battlePass`){
							let voList = Api.acVoApi.getActivityVoListByAid(aid);
							for(let i = 0; i < voList.length; ++ i){
								let acvo = voList[i];
								if(Number(acvo.code) != 4 && Number(acvo.code) != 7){
									vo = acvo;
									break;
								}
							}
						}
						else{
							vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
						}
					}
					else{
						vo = Api.acVoApi.checkActivityStartByAidAndType(aid, type);
					}
					if(vo && vo.isStart && (vo.isShowRedDot == true)){
						App.CommonUtil.addIconToBDOC(this._leftIconArrowContainer);
						let redpot = this._leftIconArrowContainer.getChildByName(`reddot`);
						if(redpot){
							redpot.x = this._leftIconArrowContainer.scaleX == 1 ? 45 : 0;
							redpot.y = 0;
						}
						break;
					}
					else{
						App.CommonUtil.removeIconFromBDOC(this._leftIconArrowContainer);
					}
				}
			}
		}
		
		//首冲
		this.checkFirstRechargeIcon();
		//月卡年卡
		this.checkCardIcon();
		//小额红颜
		this.checkTimelimitwife();
	}

	private setLeftIconPos():void{
		let tmpY = 0;
		if(this._leftIconMsgList.length == 0){
			this._iconContainer.x = 0;
			this._iconContainer.width = GameConfig.stageWidth;
		}
		else{
			this._iconContainer.x = 100;
			this._iconContainer.width = GameConfig.stageWidth - 130;
			
		}
		if (this._singleLineButton)
		{	
			if (this._leftBigIconNumber != this._leftIconMsgList.length)
			{	
				this._leftBigIconNumber = this._leftIconMsgList.length;
				this.sortIcons();
				// this.setIconsPos();
			}
		}
		this.setIconsPos();
		for(let i in this._leftIconMsgList){
			let unit = this._leftIconMsgList[i];
			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName(`${unit.activity}_${unit.type}`);
			if(icon){
				icon.x = (this._leftIconContainer.width - icon.width) / 2 + icon.width / 2;
				// icon.y = 120 * i;
				icon.y = tmpY + (icon.height / 2);
				tmpY += (icon.height - 10);
			}
			if (PlatformManager.checkIsKRSp() && Api.rookieVoApi.curStep == "adult_1" && Number(i)>=1)
			{
				icon.x = -300;
			}
		}
		
	}

	private createLeftIcon(iconMsg):BaseDisplayObjectContainer
	{
		let modelName = iconMsg.activity;
		let type = iconMsg.type;
		for(let i in this._leftIconList){
			if(this._leftIconList[i].name && this._leftIconList[i].name == (modelName + `_` + type)){
				return;
			}
		}

		let iconContainer : BaseDisplayObjectContainer;
		let ismainui = iconMsg.ismainui && iconMsg.ismainui == 1;
		//主页面图标
		if(ismainui){
			let str = null;
			if(modelName == `timelimitwife`){
				let vo = Api.shopVoApi.getPayInfoById2("g16");
				let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
				str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime - GameData.serverTime,1);
			}
			iconContainer = App.CommonUtil.createMainUIIcon(iconMsg.activity.toLowerCase()+"_icon",iconMsg.activity.toLowerCase()+"_icon_name",true,0,{
				aid : modelName.toLowerCase(),
				type : type + ``
			}, str);
			iconContainer.addTouchTap(()=>{
				//引导过程种不响应
				if(Api.rookieVoApi.isGuiding){
					return;
				}
				let viewName:string=App.StringUtil.firstCharToUper(modelName)+"View";
				let popupViewName:string=App.StringUtil.firstCharToUper(modelName)+"PopupView";
				if(egret.hasDefinition(viewName)==false&&egret.hasDefinition(popupViewName))
				{
					viewName=popupViewName;
				}
				if(modelName=="rechargeVip")
				{
					viewName+="|1";
				}
				else if(modelName=="firstrecharge")
				{
					if(Api.switchVoApi.checkWeChatFirstcharge())
					{
						viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
					}
					else
					{
						viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					} 
				}
				else if(modelName=="monthcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWMONTHCARD;
				}
				else if(modelName=="yearcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWYEARCARD;
				}
				else if(modelName=="candyget")
				{
					viewName=ViewConst.POPUP.CANDYGETPOPUPVIEW;
				}
				else if(modelName=="newcharge")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWRECHARGEBOX;
				}
				else if(modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="augustsign")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWSIGNIN;
				}
				else if(modelName=="rebate")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE;
				}
				else if(modelName=="rebate2")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE2;
				}
				else if(modelName=="newinvite")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWNEWINVITE;
				}
				else if(modelName=="newreback")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWPLAYERCOMEBACK;
				}
				else if(modelName == "fqStrategy")
				{ 
					if(Api.switchVoApi.checkOpenStrengthen()&&Config.GameprojectCfg.closeFunction&&Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction) 
					{
						viewName = ViewConst.COMMON.FQSTRATEGYVIEWTAB3;
					}
					else
					{
						viewName = ViewConst.COMMON.FQSTRATEGYVIEW;
					}
				}
				else if(modelName == 'playerReturn'){
					viewName == ViewConst.COMMON.PLAYERRETURNVIEW;
				}
				else if(modelName == "timelimitwife"){
					viewName = ViewConst.POPUP.TIMELIMITWIFEVIEW;
				}
				else if(modelName == "limitedgift")
				{
					viewName=ViewConst.POPUP.LIMITEDGIFTVIEW;
				}
				else if(modelName=="wywegameqq")
				{
					viewName=ViewConst.POPUP.EGAMEQQPOPUPVIEW;
				}
				else if(modelName=="newCrossServerAtkRace")
				{
					viewName="AcNewCrossServerAtkRaceView";
				}
				// else if(modelName == "strengthen")
				// {
				// 	viewName=ViewConst.POPUP.STRENGTHENPOPUPVIEW;
				// }
				else if (modelName == "welfare")
				{
					let firstRechargeflag = Api.shopVoApi.getPayFlag();
					if (firstRechargeflag == 0 && Api.rechargeVoApi.checkFirstRecharge() && !Api.switchVoApi.checkClosePay())
					{
						viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					}
				}
				else if(modelName == "sevenDaysSignUp1" || modelName == "sevenDaysSignUp2" || modelName == "sevenDaysSignUp7")
				{
					viewName=ViewConst.COMMON.SEVENDAYSSIGNUPVIEW;
				}
				//不要跟随着随意加if了，大部分都是无用的，尽量走规范
				ViewController.getInstance().openView(viewName);
			// window.open("https://www.baidu.com");
			},this);
		}
		//活动图标
		else{
			iconContainer = Api.acVoApi.getAcIconListByAid(iconMsg.activity, [], null, {
				aid : modelName,
				type : type + ``
			})[0];
		}
		iconContainer.name = modelName + `_` + type;
		this._leftIconList.push(iconContainer);
		this._leftIconContainer.addChild(iconContainer);
		return iconContainer;
	}

	private removeLeftIcon(modelName:string, isChildName : boolean = false,type?:number):void
	{
		let l:number=this._leftIconList.length;
		let iconname = ``;
		if(isChildName){
			iconname = modelName;
		}
		else if (type)
		{
			iconname = modelName + "_" + type;
		}
		else{
			for(let i of this._leftIconMsgList){
				if(i.activity == modelName){
					iconname = i.activity + "_" + i.type;
					break;
				}
			}
		}
		

		for(let i:number=l-1;i>=0;i--)
		{

			if(this._leftIconList[i].name && this._leftIconList[i].name == iconname)
			{
		
				this._leftIconList[i].dispose();
				this._leftIconList.splice(i,1);
				break;
			}
		}
	}

	private getLeftIcon(modelName:string):BaseDisplayObjectContainer
	{
		let iconname = ``;
		for(let i of this._leftIconMsgList){
			if(i.activity == modelName){
				iconname = i.activity + "_" + i.type;
				break;
			}
		}

		let l:number=this._leftIconList.length;
		let obj : BaseDisplayObjectContainer = null;
		for(let i:number=l-1;i>=0;i--)
		{
			if(this._leftIconList[i].name && this._leftIconList[i].name == iconname)
			{
				obj = this._leftIconList[i];
				break;
			}
		}
		return obj;
	}

	private sortLeftIcon():void
	{
		let iconStr = null;
		let iconMsg = null;
		this._leftIconMsgListBak = this._leftIconMsgList;
		this._leftIconMsgList = [];
		let arr = Config.BigiconCfg.getBigIcon();
		let maxlen =  Config.BigiconCfg.getMaxIconLength();
		for(let i = 0; i < maxlen; ++ i){
			if(arr[i]){
				this._leftIconMsgList.push(arr[i]);
			}
		}
		this._leftIconArrowContainer.visible = arr.length > maxlen && this._isAtHome;
	}

	//初始化左侧icon栏
	private initLeftIcon(init : boolean = false):void{	


		if (Api.acVoApi.isHandled_ILI)
		{
			return;
		}
		Api.acVoApi.isHandled_ILI = true;

		let l = this._leftIconMsgList.length;
		let lBak = this._leftIconMsgListBak.length;
		let change = false;
		//remove icon
		for(let j = lBak-1;j>=0;j--){
			let isdelete = true;
			for(let i = l-1; i >=0; i --){
				if((this._leftIconMsgList[i].activity+this._leftIconMsgList[i].type) == (this._leftIconMsgListBak[j].activity+this._leftIconMsgListBak[j].type))
				{
					isdelete = false;
				}
			}
			if(isdelete){
				change = true;
				this.removeLeftIcon(this._leftIconMsgListBak[j].activity,null,this._leftIconMsgListBak[j].type);
			}
		}

		//add icon
		for(let i = 0; i < l; i ++){
			let isadd = true;
			if(this._leftIconMsgList[i].activity == `battlePass` && Number(this._leftIconMsgList[i].type) == 4){
				continue;
			}
			for(let j = 0; j < lBak; j++){
				if((this._leftIconMsgList[i].activity+this._leftIconMsgList[i].type) == (this._leftIconMsgListBak[j].activity+this._leftIconMsgListBak[j].type))
				{
					isadd = false;
				}
			}
			if(isadd){
				change = true;
				if(this._leftIconMsgList[i].activity == `timelimitwife`){
					if(!Api.switchVoApi.checkClosePay() && !(PlatformManager.checkIsThSp()&&App.DeviceUtil.isIOS()) && GameData.checkTimeLimitWife()){
						this.createLeftIcon(this._leftIconMsgList[i]);
					}
				}
				else{
					this.createLeftIcon(this._leftIconMsgList[i]);
				}
			}
		}

		for(let i in this._leftIconList){
			let name = this._leftIconList[i].name.split(`_`)[0];
			let isdelete = true;
			for(let j in this._leftIconMsgList){
				if(this._leftIconMsgList[j].activity == name){
					isdelete = false;
					break;
				}
			}
			if(isdelete){
				this.removeLeftIcon(this._leftIconList[i].name, true);
			}
		}
	}

	/**
	 * 检查活动icon红点
	 */
	private checkActivityIconState():void
	{	
		let l=this._activityIconList.length;
		let isExtendShowRedDot:boolean = false;
		let isSingleRedDot:boolean = false;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			if(icon.name&&icon.name.split("_")[1]=="func")
			{
				continue;
			}
			if(icon && icon.name!="welfare")
			{
				let name = icon.name;
				let aid:string = "";
				let code:string = "";
				aid = name.split("-")[0];
				code = name.split("-")[1];
				let isShowRedDot:boolean;
				// let aidArr:string[]=Config.IconorderCfg.getAidListByCfgName(aid);
				let aidArr:string[]=Api.acVoApi.getAcListForAid(aid);
				if(aidArr&&aidArr.length>0)
				{
					let needCheckId:string[]=aidArr;
					for(let ii:number=0;ii<needCheckId.length;ii++)
					{
						let aidT = needCheckId[ii].split("-")[0];
						let codeT = needCheckId[ii].split("-")[1];
						if(!isShowRedDot)
						{
							isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aidT,codeT);
						}
					}
				}
				else
				{
					isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid,code);
				}

				// if(aid=="carnival")
				// {
				// 	let needCheckId:string[]=["carnivalCharge","carnivalCost"];
				// 	for(let ii:number=0;ii<needCheckId.length;ii++)
				// 	{
				// 		if(!isShowRedDot)
				// 		{
				// 			isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii],null);
				// 		}
				// 	}
				// }
				// else
				// {
				// 	isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid,code);
				// }

				if(isShowRedDot == true)
				{
					App.CommonUtil.addIconToBDOC(icon);
					if (this._pickUpTab.indexOf(icon)>-1)
					{
						isExtendShowRedDot = true;
					}
					if (this._singleLineTab.indexOf(icon)>-1)
					{
						isSingleRedDot = true;
					}
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
			}
		}
		if (this._extandButton)
		{
			if(isExtendShowRedDot == true)
			{
				App.CommonUtil.addIconToBDOC(this._extandButton);
				this._extandButton.getChildByName("reddot").x = 52;
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._extandButton);
			}
		}
		if (this._singleLineButton)
		{
			if(isSingleRedDot == true)
			{
				App.CommonUtil.addIconToBDOC(this._singleLineButton);
				this._singleLineButton.getChildByName("reddot").x = 52;
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._singleLineButton);
			}
		}
	}


	/**
	 * 检测邮件红点
	 */
	private checkMailState():void
	{
		if(Api.mailVoApi.checkNpcMessage())
		{
			// if(this._mailButton)
			// {
			// 	this._mailButton.showStatusIcon("public_dot2");
			// }
			// if(this._mailRedDotSp == null && this._mailButton)
			// {
			// 	this._mailRedDotSp = BaseBitmap.create("public_dot2");
			// 	this._mailRedDotSp.x = this._mailButton.x + this._mailButton.width - this._mailRedDotSp.width + 5;
			// 	this._mailRedDotSp.y = this._mailButton.y - 3;
			// 	this._settingAndMailContainer.addChild(this._mailRedDotSp);
			// }
			// else
			// {
			// 	if(this._mailRedDotSp)
			// 	{
			// 		this._mailRedDotSp.visible = true;
			// 	}
			// }

			App.CommonUtil.addIconToBDOC(this._mailButton);
		}
		else
		{
			// if(this._mailButton)
			// {
			// 	this._mailButton.removeStatusIcon();
			// }
			// if(this._mailRedDotSp)
			// {
			// 	this._mailRedDotSp.visible = false;
			// }
			App.CommonUtil.removeIconFromBDOC(this._mailButton);
		}
	}
	// 主线任务完成显示小手
	private taskEndHandler(evt):void
	{
		this.showDialog(1);
	}

	private showDialog(buildId):void{
        let view = this; 
		let cfg = Config.MaintaskCfg.getDialogByBuildId(1);
        if(cfg){
            ViewController.getInstance().openView(ViewConst.BASE.ACDOUBLESEVENTHAVGVIEW,{
                f : view.avgendCallback,
                o : view,
                idx : 1,
                buidId : buildId,
				type: "MainTask",
                
            });
        }
    }
	private avgendCallback()
	{
		this._clickHand = BaseBitmap.create("guide_hand");
		this._taskContainer.addChild(this._clickHand);
		this._clickHand.setPosition(100,-201);
		this._taskContainer.addTouchTap(this.removeHand,this);

  
		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)

	}


	private outcityzqf = false;
	private needZQFGuide():void{
		let view = this;
		if(Api.switchVoApi.checkWeaponFunction()){
			let playerview : any = ViewController.getInstance().getView(ViewConst.COMMON.PLAYERVIEW);
			if(playerview){
				playerview.closeHandler();
			}
			let conquestview = ViewController.getInstance().getView(ViewConst.COMMON.CONQUESTVIEW);
			if(conquestview){
				conquestview.hide();
			}
			let challenge : any = ViewController.getInstance().getView(ViewConst.COMMON.CHALLENGEVIEW);
			if(challenge){
				challenge.hide();
			}
			let searchview : any = ViewController.getInstance().getView(ViewConst.COMMON.SEARCHVIEW);
			if(searchview){
				searchview.hide();
			}
			let AffairView  = ViewController.getInstance().getView(ViewConst.COMMON.AFFAIRVIEW); 
			if(AffairView){
				AffairView.hide();
			}
			if(this._isAtHome){
				Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_1"},true);
				
			}
			else{
				this.outcityzqf = true;
				Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_0"},true);
				//this.goOutBtnClickHandler();
			}
			Api.rookieVoApi.checkWaitingGuide();
		}
	}
	private removeHand():void
	{
		if(this._clickHand&&this._clickHand.parent)
		{
			this._clickHand.parent.removeChild(this._clickHand); 
			this._clickHand=null;
		}
	}

	/**出入府动画 */
	//切入场景ani
	public showEnterAni(isInit:boolean = false)
	{
		App.LogUtil.log("**showGooutAni** showenterani aaaa");
		if( !Api.switchVoApi.checkOpenGooutAni() ){
			return;
		}
		let waitT =  50;
		let waitT2 =  150;
		let waitT3 =  300;
		if(!isInit){
			waitT =  0;
			waitT2 =  100;
			waitT3 =  300;
		}
		App.LogUtil.log("**showGooutAni** showenterani start "+isInit + " isAthome "+this._isAtHome);
		this._topbg.y = -110;
		this._bottomContiner.alpha = this._topbg.alpha = 0;
		this._topbg.showEnterAni(isInit);

		this._bottomContiner.y = GameConfig.stageHeigth + 110;
		egret.Tween.get(this._bottomContiner,{loop:false}).wait(waitT).to({y:GameConfig.stageHeigth,alpha:1.0},300,egret.Ease.sineOut);

		this._rightBtnContainer.alpha = 0;
		this._rightBtnContainer.y = GameConfig.stageHeigth + 110;
		egret.Tween.get(this._rightBtnContainer,{loop:false}).wait(waitT).to({y:GameConfig.stageHeigth,alpha:1},300,egret.Ease.sineInOut);

		// if (this._examContainer && Api.examVoApi.isInPeriod() == true && Api.examVoApi.isInVersion() == true){
		// 	this._examContainer.alpha = 0;
		// 	this._examContainer.y = GameConfig.stageHeigth + 0;
		// 	egret.Tween.get(this._examContainer,{loop:false}).wait(waitT).to({y: GameConfig.stageHeigth - 280 }, 1).to({y:GameConfig.stageHeigth - 360, alpha:1.0}, 300, egret.Ease.sineOut);
		// }

		this._taskContainer.x = -220;
		egret.Tween.get(this._taskContainer,{loop:false}).wait(waitT2).to({x:0},200,egret.Ease.sineOut);
		
		if (this._functionAni){
			this._functionAni.x = -220;
			egret.Tween.get(this._functionAni,{loop:false}).wait(waitT2).to({x:5},200,egret.Ease.sineOut);
		}
		
		this._settingAndMailContainer.x =  -100;
		egret.Tween.get(this._settingAndMailContainer,{loop:false}).wait(waitT2).to({x:0},200,egret.Ease.sineOut);

		this._rightBtnContainer2.x = 130;
		egret.Tween.get(this._rightBtnContainer2,{loop:false}).wait(waitT2).to({x:0,alpha:1},200,egret.Ease.sineOut);

		this._chatContainer.y = 40;
		egret.Tween.get(this._chatContainer,{loop:false}).wait(waitT2).to({y:0},200,egret.Ease.sineOut);




		this._aniBlackMask.alpha = 0.0;
		egret.Tween.get(this._aniBlackMask,{loop:false}).to({alpha:0},100,egret.Ease.sineOut).call(()=>{
			App.LogUtil.log("showenterani last ani is ok");
			this._isGooutAniing = false;
		});
		App.LogUtil.log("**showGooutAni** showenterani end ");
		if (this._isAtHome){
			this.showActivityIconsEnterAni(waitT3);
		}
		App.LogUtil.log("**showGooutAni** showenterani ok ");
	}
	//切出场景ani
	public showExitAni()
	{
		App.LogUtil.log("**showGooutAni** exit start");
		this._isGooutAniing = true;
		let waitT = 100;// 700;
		let waitT2 = 0;// 800;

		this._topbg.y = 0;
		this._bottomContiner.alpha = this._topbg.alpha = 1.0;
		
		this._topbg.showExitAni();
		this._bottomContiner.y = GameConfig.stageHeigth ;
		egret.Tween.get(this._bottomContiner,{loop:false}).wait(waitT).to({y:GameConfig.stageHeigth+110,alpha:0},300,egret.Ease.sineInOut);

		App.LogUtil.log("this._isgout: "+this._isGoout);
		if (this._isGoout){
			this._rightBtnContainer.alpha = 1;
		}
		else{
			this._rightBtnContainer.alpha = 0;
		}
		// this._rightBtnContainer.alpha = 0;
		this._rightBtnContainer.y = GameConfig.stageHeigth ;
		egret.Tween.get(this._rightBtnContainer,{loop:false}).wait(waitT).to({y:GameConfig.stageHeigth+110,alpha:0},300,egret.Ease.sineInOut);



		this._taskContainer.x = 0;
		egret.Tween.get(this._taskContainer,{loop:false}).wait(waitT2).to({x:-220},200,egret.Ease.sineInOut);

		if (this._functionAni){
			this._functionAni.x = 5;
			egret.Tween.get(this._functionAni,{loop:false}).wait(waitT2).to({x:-220},200,egret.Ease.sineOut);
		}
		
		this._chatContainer.y = 0;
		egret.Tween.get(this._chatContainer,{loop:false}).wait(waitT2).to({y:40},200,egret.Ease.sineInOut);

		this._settingAndMailContainer.x = 0;
		egret.Tween.get(this._settingAndMailContainer,{loop:false}).wait(waitT2).to({x:-100},200,egret.Ease.sineInOut);

		if (this._isGoout){
			this._rightBtnContainer2.alpha = 0;
		}
		else{
			this._rightBtnContainer2.alpha = 1;
		}
		egret.Tween.get(this._rightBtnContainer2,{loop:false}).wait(waitT2).to({x:130,alpha:0},200,egret.Ease.sineInOut);
		
		this._aniBlackMask.alpha = 0;
		egret.Tween.get(this._aniBlackMask,{loop:false}).wait(waitT+50).to({alpha:0.0},50,egret.Ease.sineInOut);
		App.LogUtil.log("**showGooutAni** exit end");
		this.showActivityIconsExitAni(waitT2);
	}

	//活动图标ani
	public showActivityIconsEnterAni(deltaT:number)
	{
		let len = this._activityIconList.length;
		for (let index = 0; index < len; index++) {
			let element = this._activityIconList[index];
			let waitT = 20 *index + deltaT;
			element.alpha = 0;
			egret.Tween.get(element,{loop:false}).wait(waitT).to({alpha:1.0},200,egret.Ease.sineOut);
		}

		for (let index = 0; index < this._leftIconList.length; index++) {
			let element = this._leftIconList[index];
			let waitT = 20 *index + deltaT;
			element.alpha = 0;
			egret.Tween.get(element,{loop:false}).wait(waitT).to({alpha:1.0},200,egret.Ease.sineOut);
		}
		if(this._leftIconArrowContainer){
			egret.Tween.get(this._leftIconArrowContainer,{loop:false}).wait(deltaT).to({alpha:1.0},200,egret.Ease.sineOut);
		}
		
		App.LogUtil.log("**showGooutAni** activity enter");
	}

	//活动图标ani
	public showActivityIconsExitAni(deltaT:number)
	{
		// this._activityIconList.push
		let len = this._activityIconList.length;
		for (let index = 0; index < len; index++) {
			let element = this._activityIconList[index];
			let waitT = deltaT;
			// let waitT = 30 * (len -index) + deltaT;
			element.alpha = 1.0;
			egret.Tween.get(element,{loop:false}).wait(waitT).to({alpha:0},200,egret.Ease.sineInOut);
		}
		let len2 = this._leftIconList.length;
		for (let index = 0; index < len2; index++) {
			let element = this._leftIconList[index];
			let waitT =  deltaT;
			// let waitT = 30 * (len -index) + deltaT;
			element.alpha = 1.0;
			egret.Tween.get(element,{loop:false}).wait(waitT).to({alpha:0},200,egret.Ease.sineInOut);
		}
		if(this._leftIconArrowContainer){
			egret.Tween.get(this._leftIconArrowContainer,{loop:false}).wait(deltaT).to({alpha:0},200,egret.Ease.sineOut);
		}
		App.LogUtil.log("**showGooutAni** activity exit");
	}

	private showSwitchCityAni(callback:Function,obj:Object)
	{
		let view = this;
		App.LogUtil.log("showSwitchCityAni ");
		if( !Api.switchVoApi.checkOpenGooutAni() ){
			callback.call(obj);
			view._isGooutAniing = false;
			return;
		}
		view._isGoout = !view._isGoout;
		App.LogUtil.log("**showGooutAni** showSwitchCityAni start");
		App.LogUtil.log("**showGooutAni** showSwitchCityAni start "+view._isAtHome);
		// egret.Tween.get(this,{loop:false}).call(this.showExitAni,this).wait(200).call(
		// 	()=>{
		// 		SceneController.getInstance().jump(this.switchSceneSuccess,this);
		// 	}
		// ).wait(200).call(this.showEnterAni,this);
		let callFunc = function(){
			egret.Tween.get(view,{loop:false}).call(view.showExitAni,view).wait(200).call(view.switchSceneSuccess, view).wait(200).call(view.showEnterAni,view);
			// egret.Tween.get(this,{loop:false}).call(this.showExitAni,this).wait(200).call(this.showEnterAni, this).wait(200).call(this.switchSceneSuccess,this);
		}
		SceneController.getInstance().jump(callFunc, view);
		App.LogUtil.log("**showGooutAni** showSwitchCityAni end");
	}

	private checkHousekeeperBtnState():void
	{	
		if (this._housekeeperbtn)
		{
			if(Api.shopVoApi.ifBuyButler())
			{
				this._housekeeperbtn.setGray(false);
			}
			else
			{
				this._housekeeperbtn.setGray(true);
			}
		}
	}

	private checkHousekeeperBtnRed():void
	{
		if (this._housekeeperbtn)
		{	
			if(Api.shopVoApi.ifBuyButler())
			{
				App.CommonUtil.removeIconFromBDOC(this._housekeeperbtn);
			}
			else
			{
				if (Api.housekeeperVoApi.isHasRedot())
				{
					App.CommonUtil.addIconToBDOC(this._housekeeperbtn);
					let reddot = this._housekeeperbtn.getChildByName("reddot");
					if (Api.switchVoApi.checkOpenHouseBtnUp()){
						reddot.x = this._housekeeperbtn.width - 30;
						reddot.y = 7;
					}
					else{
						reddot.x = 51;
						reddot.y =  10;
					}
					
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(this._housekeeperbtn);
				}
			}
		}
	}

	protected receivePushData(event: egret.Event): void {
        let data: { ret: boolean, data: any } = event.data;
		let itemId:string = null;
		if (data.data.data && data.data.data.payment)
		{
			itemId = data.data.data.payment.itemId;
		}
		let ids:string[] = ["g161","g162","g163","g164","g166"];
        if (data.data.ret == 0 && ids.indexOf(itemId)>=0) {
           
            if (data.data.data.rewards) {
                // let itemid = data.data.data.rewards;
				// let rList = GameData.formatRewardItem(itemid);
				// App.CommonUtil.playRewardFlyAction(rList);   
				ViewController.getInstance().openView(ViewConst.COMMON.PLAYPOINTSREWARDSPOPUPVIEW,{rechangeId:itemId});             
            }
        }
    }


	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_SCENESCROLL,this.checkShowCityDailyBossBtn,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FQSTRATEG_SWITCH,this.initFQStrategyIcon,this);
		TimerManager.remove(this.checkEmpBtn,this);
	 	App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.doRefreshTaskInfo,this);
		 App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.resertMale,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT,this.checkAchPoint,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doRefreshTaskInfo,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.doRefreshTaskInfo,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.doQuickAlliance,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL,this.checkMailState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkActivityIconState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPointByModel,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.checkWanBaIcon,this);

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.refreshText,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.checkWelfareState,this);	 
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_UPGRADE,this.checkIsRefresh,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initCoverIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initBindIcon,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT,this.checkIsRefresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REALNAME,this.createRealnameRedHot,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_GETMSG),this.freshChatMsg,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.freshPrichat,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.freshPrichatRed,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END,this.rookieGuideEndCheck,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, this.checkReturnState,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_TASK_END,this.taskEndHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,this.checkChangeBgState,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS,this.checkRealnameRewards,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_MEET_BEAUTY,this.checkMeetBeautyIcon,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_NEEDGUIDE,this.needZQFGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_SENDUSERMSG),this.checkUserMsgIcon,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAINUI_PACKUP,this.singleLineButtonPackUp,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.checkQingyuanRed, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_HOUSEUPBTN_GUIDE, this.freshGuide, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_SERVANTBANISH, this.checkQingyuanRed, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN_HOUSEFUNC, this.checkHouseFuncBtn, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunction, this);

		if(this._empBtn){
			this.disposeEmpBtn();
		}
		TickManager.removeTick(this.tick,this);
		//添加需要释放的内容
		this._topContiner = null;
		this._bottomContiner = null;
		this._settingAndMailContainer= null;

		this._goOutBtn= null;
		this._mailButton= null;
		this._settingButton= null;
		this._helpButton = null;
		this._taskContainer= null;

		this._chatTxt= null;
		this._taskTxt= null;
		this._lampRoll = null;
		this._mailRedDotSp = null;
		this._activityIconList.length=0;
		this._iconNameList={};
		this._functionPreviewBg  =null;
		this._signName =null;
		this._functionIcon =null;
		this._functionAni = null;
		this._lastL=0;
		this._tuyouBackToLobby = null;
		this._empBtn= null;
		this._friendsBtn = null;
		// this._wxgameKefuBtn = null;
		this._wxMoreGameIcon = null;
		this._moneyIconContainer = null;
		this._changebgButton = null;
		this._extandButton = null;
		this._pickUpTab.length = 0;
		this._isInExtanding = false;
		this._clickHand =null;
		this._redPoint = null;
		this._examBtn = null;
		this._examContainer = null;
		this._leftIconContainer = null;
		//左侧icon list
		this._leftIconList = [];
		this._leftIconMsgList = [];
		this._leftIconMsgListBak = [];
	
		this._zhenqifangButton = null;
		this.outcityzqf = false;

		//动效
		this._topbg = null;
		this._isGooutAniing = false;
		this._chatContainer = null;
		this._aniBlackMask = null;
		this._isGoout = false;
		this._rightBtnContainer = null;
		this._singleLineButton= null;
		this._singleLineTime = 0;
		this._gououtTxt = null;

		this._cityEmpOutingContainer = null;
		this._homeEmpOutingContainer = null;
		this._leftIconArrowContainer.dispose();
		this._leftIconArrowContainer = null;
		this._cityDailybossContainer = null;
		this._rightBtnContainer2 = null;
		this._leftBigIconNumber  = 0;
		this._housekeeperbtn = null;
		this._homeBottomBtns.length = 0;
		this._houseFuncBtn = null;
		this._sixSectionBtn = null;
		this._isShowHouseFunc = false;
		this._houseFuncBtnContainer = null;

		TimerManager.remove(this.checkShowCityDailyBossBtn,this);
		this._taskArrow = null;
		super.dispose();
	}

	private static _instance:MainUI;
	public static getInstance():MainUI
	{
		if(!MainUI._instance)
		{
			MainUI._instance=new MainUI();
		}
		return MainUI._instance;
	}
}