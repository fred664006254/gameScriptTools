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
	private _bottomBtnContiner:BaseDisplayObjectContainer=undefined;
	private _bottomComposeBtnContiner:BaseDisplayObjectContainer=undefined;
	private _bottomComposeScrollContiner:BaseDisplayObjectContainer=undefined;
	private _chatContiner:BaseDisplayObjectContainer=undefined;

	public _goOutBtn:BaseBitmap;
	private _mailButton:BaseButton;
	private _settingButton:BaseButton;
	public _taskContainer:BaseDisplayObjectContainer;
	private _composeNumContainer:BaseDisplayObjectContainer;
	private _settingAndMailContainer:BaseDisplayObjectContainer;
	private _isAtCompose:boolean = true;
	private _missionIcon:BaseBitmap;
	private _taskAllCon:BaseDisplayObjectContainer;

	private _chatTxt:BaseTextField;
	private _chatTxtPoint:BaseTextField;
	private _taskTxt:BaseTextField;
	private _lampRoll:LampRoll;
	private _mailRedDotSp:BaseBitmap = null;
	// private _achRedDotSp:BaseBitmap = null;
	private _functionPreviewBg:BaseBitmap = null;
	private _functionAni:CustomMovieClip = null;

	private _activityIconList:BaseDisplayObjectContainer[]=[];
	private _iconNameList:Object={};
	private _signName:string =null;
	// private _functionIcon:BaseBitmap =null;
	private _lastL:number=0;
	private _tuyouBackToLobby:BaseButton = null;
	private _friendsBtn : BaseButton|BaseDisplayObjectContainer = null;
	
	private _extandButton:ExtendIcon = null;
	private _pickUpTab:BaseDisplayObjectContainer[] = [];
	private _isInExtanding:boolean = false;
	//第三方支付按钮是否已经展现
	private _isShowWebPay:boolean = false;
	//左侧icon区域
	private _leftIconContainer:BaseDisplayObjectContainer;
	//左侧icon list
	private _leftIconList:BaseDisplayObjectContainer[] = [];

	private _leftIconMsgList = [];

	private _leftIconMsgListBak = [];
	private _redPoint : BaseBitmap = null;

	private _unfoldBtn:UnfoldBtn = null;
	private _isGooutAniing:boolean = false;//出府动效是否在执行
	private _unlockIndex = 0;//当前解锁到哪里了
	private _clickHand:BaseBitmap;
	private _touchFlag = false;
	/**购买次数 */
	private _buyTimeProgress:ProgressBar=null; 
	private _buyTimeTxt:BaseTextField=null;
	private _buyFullEffect:CustomMovieClip=null;
	private _needFoldBtnNameList:{[key:string]:number}={};
	private _renNumTxt:BaseTextField=null;
	// private _buyTimeTimeCount:number=-1;

	private _leftIconMap =
	{
		timelimitwife : {
			haveIcon: false,
			aid: null,
			code: null,
		},
		timelimitwifefb : {
			haveIcon: false,
			aid: null,
			code: null,
		},
		firstrecharge : {
			haveIcon: false,
			aid: null,
			code: null,
		}, 
		secondrecharge: {
			haveIcon: false,
			aid:null,
			code:null
		},
		jurakudai: {
			haveIcon: false,
			aid: null,
			code: null
		},
		crossServer : {
			haveIcon: false,
			aid: null,
			code: null,
			type: null

		},
		wipeBoss : {
			haveIcon: false,
			aid : null,
			code : null
		},
		rankActive : {
			haveIcon:false,
			aid:null,
			rankActiveList:[]
			
		},
		monthCard: {
			haveIcon: false,
			code: null,
			aid: null
		},
		yearCard: {
			haveIcon: false,
			code: null,
			aid: null
		},
		oneYearOverview: {
			haveIcon: false,
			code: null,
			aid: null
		},
		singleDayOverview: {
			haveIcon: false,
			code: null,
			aid: null
		},
		threerecharge : {
			haveIcon: false,
			aid:null,
			code:null
		},
		fourrecharge : {
			haveIcon: false,
			aid:null,
			code:null
		},
		conquerMainLand: {
			haveIcon: false,
			code: null,
			aid: null
		},
	};
	


	private _wxMoreGameIcon:BaseLoadBitmap = null;
	private _chatRed:BaseBitmap = null;
	private _topbg:MainUINewTop = undefined;
	private _aniBlackMask:BaseBitmap = undefined;
	/**零元礼包计时 */
	private _zeroGiftTime = -1;
	/**X秒未点击 则显示小手引导 */
	private _lastClickTime:number = 0;
	private _taskHand:BaseBitmap = null;
	public constructor() 
	{
		super();
		//玩家基础信息发生变化的刷新
	}
	/**
	 * 填内容
	 */
	private touchAni(event:egret.TouchEvent)
	{

		if(this._touchFlag){
			this.hideHand();
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK);
		}
		this._touchFlag = !this._touchFlag;
		//X秒未点击 小手指任务
		// if(Api.switchVoApi.checkOpenMainQuestFinger() &&  !Api.rookieVoApi.isInGuiding){
		// 	this._lastClickTime = egret.getTimer();
			if(this._taskHand){
				this._taskHand.stopAllActions();
				this._bottomContiner.removeChild(this._taskHand);
				this._taskHand = null;
				
			}
		// }
		//屏幕点击特效
		if(Api.switchVoApi.checkOpenClickEffect())
		{
			let touchEffect = ComponentManager.getCustomMovieClip("touch_ani_", 13, 40);
			LayerManager.maskLayer.addChild(touchEffect);
			touchEffect.name="touchani";
			touchEffect.visible = true;
			// touchEffect.setScale
			// touchEffect.blendMode = egret.BlendMode.ADD; 
			// let pos = touchEffect.localToGlobal(event.localX-94,event.localY-91);
			// touchEffect.setPosition(pos)
			// let pos = touchEffect.localToGlobal(event.localX-94,event.localY-91);
			touchEffect.setPosition(event.stageX-63,event.stageY-63 - GameData.layerPosY);
			
			touchEffect.playWithTime(1);
			touchEffect.setEndCallBack(()=>{
				touchEffect.dispose();
				touchEffect = null;
			}, this);	
		}

        
		
	}

	protected init():void
	{

		if(Api.otherInfoVoApi.getOtherInfoVo().kvmap&&Api.otherInfoVoApi.getOtherInfoVo().kvmap["unlockIndex"])
		{
			this._unlockIndex = Number(Api.otherInfoVoApi.getOtherInfoVo().kvmap["unlockIndex"]);
		}
		if(!Api.rookieVoApi.isGuiding&&this._unlockIndex < MainUIUnLockCfg.getMainUIUnLockCfgByKey("newGuideStep"))
		{
			this._unlockIndex = MainUIUnLockCfg.getMainUIUnLockCfgByKey("newGuideStep")
		}

		GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchAni,this);
		this._lastClickTime = egret.getTimer()+ 1000;

		this._aniBlackMask = BaseBitmap.create(ResourceManager.getRes("mainui_animask")); 
		this._aniBlackMask.width = GameConfig.stageWidth+100;
		this._aniBlackMask.height = GameConfig.stageHeigth+100;
		this._aniBlackMask.x = this._aniBlackMask.y = -50;
		this._aniBlackMask.alpha = 0;
		
		this.initTop();
		this.initButtom();
		this.addChild(this._aniBlackMask);

		// 初始化后刷新邮件状态
		this.checkMailState();
		if(Api.switchVoApi.checkAutoLoadDefaultRes())
		{
			App.LoginResLoader.autoLoadNextResItem();
		}
		if (PlatformManager.checkShowBackApp())
		{
			this._tuyouBackToLobby = ComponentManager.getButton("loginres_btn4","",this.backToLobbyHandler,this);
			this._tuyouBackToLobby.setPosition(10,120);
			this.addChild(this._tuyouBackToLobby);
			this._tuyouBackToLobby.visible = false;
		}
		this.showEnterAni(true);
		
		PlatformManager.analyticsMainUi();
		this.refreshCityRed();

	}
	//切入场景ani
	public showEnterAni(isInit:boolean = false)
	{
		if( ! Api.switchVoApi.checkOpenGooutAni() ){
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
		this._topbg.y = -110;
		this._bottomContiner.alpha = this._topbg.alpha = 0;
		this._topbg.showEnterAni(isInit);

		this._bottomContiner.y = GameConfig.stageHeigth + 110;
		egret.Tween.get(this._bottomContiner,{loop:false}).wait(waitT).to({y:GameConfig.stageHeigth,alpha:1.0},300,egret.Ease.sineOut);

		this._taskContainer.x = -220;
		egret.Tween.get(this._taskContainer,{loop:false}).wait(waitT2).to({x:0},200,egret.Ease.sineOut);

		this._composeNumContainer.x=-220;
		egret.Tween.get(this._composeNumContainer,{loop:false}).wait(waitT2).to({x:0},200,egret.Ease.sineOut);
		
		this._settingAndMailContainer.x =  -100;
		egret.Tween.get(this._settingAndMailContainer,{loop:false}).wait(waitT2).to({x:0},200,egret.Ease.sineOut);

		this._chatContiner.y = 40;
		egret.Tween.get(this._chatContiner,{loop:false}).wait(waitT2).to({y:0},200,egret.Ease.sineOut);

		this._aniBlackMask.alpha = 0.0;
		egret.Tween.get(this._aniBlackMask,{loop:false}).to({alpha:0},50,egret.Ease.sineOut).call(()=>{
			this._isGooutAniing = false;
		});
		this.showActivityIconsEnterAni(waitT3);
	}
	//切处场景ani
	public showExitAni()
	{
		this._isGooutAniing = true;
		let waitT = 100;// 700;
		let waitT2 = 0;// 800;

		this._topbg.y = -0;
		this._bottomContiner.alpha = this._topbg.alpha = 1.0;
		
		this._topbg.showExitAni();
		this._bottomContiner.y = GameConfig.stageHeigth ;
		egret.Tween.get(this._bottomContiner,{loop:false}).wait(waitT).to({y:GameConfig.stageHeigth+110,alpha:0},300,egret.Ease.sineInOut);

		this._taskContainer.x = 0;
		egret.Tween.get(this._taskContainer,{loop:false}).wait(waitT2).to({x:-220},200,egret.Ease.sineInOut);

		this._composeNumContainer.x=0;
		egret.Tween.get(this._composeNumContainer,{loop:false}).wait(waitT2).to({x:-220},200,egret.Ease.sineInOut);
		
		this._chatContiner.y = 0;
		egret.Tween.get(this._chatContiner,{loop:false}).wait(waitT2).to({y:40},200,egret.Ease.sineInOut);

		this._settingAndMailContainer.x = 0;
		egret.Tween.get(this._settingAndMailContainer,{loop:false}).wait(waitT2).to({x:-100},200,egret.Ease.sineInOut);
		
		this._aniBlackMask.alpha = 0;
		egret.Tween.get(this._aniBlackMask,{loop:false}).wait(waitT+50).to({alpha:0.0},50,egret.Ease.sineInOut);
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
		
	}

	private showSwitchCityAni(callback:Function,obj:Object)
	{
		if( ! Api.switchVoApi.checkOpenGooutAni() ){
			callback.call(obj);
			this._isGooutAniing = false;
			return;
		}
		egret.Tween.get(this,{loop:false}).call(this.showExitAni,this).wait(200).call(callback,obj).wait(200).call(this.showEnterAni,this);
		// egret.Tween.get(this,{loop:false}).call(this.showExitAni,this).wait(300).wait(300).call(this.showEnterAni,this);
	}
	private backToLobbyHandler():void
	{	
		SoundManager.isInBackground = true;
		SoundManager.pauseBg();
		PlatformManager.logout();
	}
	private empClick():void{
		ViewController.getInstance().openView('EmperorWarEnterView');
	}
	
	private initTop():void
	{
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_LEFTBUBBLE,this.checkLeftBubble,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doRefreshTaskInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.doRefreshTaskInfo,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.doRefreshTaskInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT,this.checkAchPoint,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkActivityIconState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPointByModel,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.checkWanBaIcon,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK,this.goComposeAndGuideChallenge,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreshText,this);
		
		//功能预览
	    App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT,this.checkIsRefresh,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshText,this);
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initCoverIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initBindIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initWxchatgiftIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initWxaddmyproIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initWxaddoffacctIcon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initRealname3Icon,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initLoginWeekIcon,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REALNAME,this.createRealnameRedHot,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.freshPrichatRed,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.freshPrichat,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_GETMSG),this.freshChatMsg,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS,this.checkRealnameRewards,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.initWanbaviptequanIcon,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD),this.initWanbaviptequanIcon,this);
		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE),this.checkNewQuestionnaireIcon,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG),this.checkZeroGiftRed,this);
		//刷新界面隐藏的功能
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_UNLOCK,this.refreshMainUi,this)
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND,this.showTaskHand,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK,this.hideHand,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE,this.goComose,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINUI_CHALLENGE,this.showHandChallenge,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_REN_NUM,this.refrestRenNumTxt,this);

		App.MessageHelper.addEventListener(MessageConst.MESSGAE_MAINUI_BTNSCROLL,this.scrollBtn,this);
		

		this._topContiner=new BaseDisplayObjectContainer();
		this.addChild(this._topContiner);
		if(App.DeviceUtil.checkIsSeascreen()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
		{
			this._topContiner.y=GameConfig.seaScreenTopH;
		}

		//填内容
		this._isAtCompose = true;
		GameData.isComposeScene = this._isAtCompose;
		let topbg = new MainUINewTop({showName:true});
		// topbg.visible = false;
		this._topContiner.addChild(topbg);
		this._topbg = topbg;

		this._iconContainer=new BaseDisplayObjectContainer();
		this._iconContainer.y=113;
		this._topContiner.addChild(this._iconContainer);

		this._leftIconContainer = new BaseDisplayObjectContainer();
		this._leftIconContainer.x = -10;
		this._leftIconContainer.y = 113;
		this._topContiner.addChild(this._leftIconContainer);
 

		//跑马灯
		this._lampRoll = new LampRoll();
		this._lampRoll.y = 106;
		this._topContiner.addChild(this._lampRoll);
		
		if(Config.AcCfg.isGetAll)
		{
			this.initIconsAndCheckStatus();
		}
		else
		{
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		}
		// TickManager.addTick(this.tick,this);
		// this.tick();

		if(PlatformManager.checkIsViSp())
		{
			RSDKHelper.initKunlunServer(GameData.bigPayId);
		}

	}

	private checkFoldBtnRedPoint():void
	{
		if(Api.switchVoApi.checkOpenUnfold())
		{
			let showRedPoint=false;
			for (const key in this._needFoldBtnNameList) 
			{
				if (this._needFoldBtnNameList.hasOwnProperty(key)) 
				{
					if(Api[key+"VoApi"]&&Api[key+"VoApi"].checkRedPoint)
					{
						let tmpshowRedPoint:boolean=Api[key+"VoApi"].checkRedPoint();
						if(tmpshowRedPoint)
						{
							showRedPoint=true;
							break;
						}
					}
					
				}
			}
			if(showRedPoint)
			{
				App.CommonUtil.addIconToBDOC(this._unfoldBtn,null,null,-7,7);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._unfoldBtn);
			}
		}
	}
	private checkAllRedPoint():void
	{
		for(let key in this.bottomBtnCfg)
		{
			this.checkRedPointByModel(this.bottomBtnCfg[key].btnName);
		}
		let isNeedCheckFoldRedPoint=false;
		for(let key in this.bottomComposeBtnCfg)
		{
			let btnName=this.bottomComposeBtnCfg[key].btnName;
			this.checkRedPointByModel(btnName);
			if(this._needFoldBtnNameList[btnName])
			{
				isNeedCheckFoldRedPoint=true;
			}
		}
		if(isNeedCheckFoldRedPoint)
		{
			this.checkFoldBtnRedPoint();
		}
	}
	private checkRedPointByModel(e:egret.Event|string):void
	{
		this.checkFirstRechargeIcon();
		if(!this._bottomBtnContiner)
		{
			return;
		}
		let modelName:string=(e instanceof egret.Event)?e.data:e;
		let btn:BaseButton = <BaseButton>this._bottomBtnContiner.getChildByName(modelName);

		if(btn)
		{
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].checkRedPoint)
			{
				let showRedPoint:boolean=Api[modelName+"VoApi"].checkRedPoint();
				let redSp:BaseBitmap;
				if(showRedPoint)
				{
					App.CommonUtil.addIconToBDOC(btn,null,null,-7,7);
						// App.CommonUtil.addIconToBDOC(btn);
				}
				else
				{
				  	  App.CommonUtil.removeIconFromBDOC(btn);
				}
			}
		}
		let btn2:BaseButton = <BaseButton>this._bottomComposeBtnContiner.getChildByName(modelName);
		if(!btn2)
		{
			btn2 = <BaseButton>this._bottomComposeScrollContiner.getChildByName(modelName);
		}
		if(btn2)
		{
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].checkRedPoint)
			{
				let showRedPoint:boolean=Api[modelName+"VoApi"].checkRedPoint();
				let redSp:BaseBitmap;
				if(showRedPoint)
				{
					App.CommonUtil.addIconToBDOC(btn2,null,null,-7,7);
						// App.CommonUtil.addIconToBDOC(btn);
				}
				else
				{
				  	  App.CommonUtil.removeIconFromBDOC(btn2);
				}
				if(e instanceof egret.Event)
				{
					this.checkAllRedPoint();
				}
			}else if(modelName == "city"){

				
			}

		}


		if(modelName==MessageConst.MESSAGE_MODEL_SHOP||modelName==MessageConst.MESSAGE_MODEL_USERINFO)
		{
			this.checkVipState();
			// this.checkThanksg(); 
		} 
		if(modelName==MessageConst.MESSAGE_MODEL_SHOP)
		{
			this.checkLimitedGiftRedPoint();
		}
		this.checkStrengthenState();

	}


	private freshChatMsg(evt):void{
		let view = this;
		Api.chatVoApi.clearPriChatList();
		Api.chatVoApi.setPriChatList(evt.data.data.data);
		// view._redPoint.visible = Api.chatVoApi.isNewMsg();
		this.dorefresgChatRed();
	}

	private freshPrichatRed(evt):void{
		// let view = this;
		// view._redPoint.visible = Api.chatVoApi.isNewMsg()
		this.dorefresgChatRed();
	}

	private freshPrichat(evt):void{
		let view = this;
		//Api.chatVoApi.clearPriChatList();
		if(evt.data.data.data['privatechat.info']){
			Api.chatVoApi.setPriChatList(evt.data.data.data['privatechat.info']);
			// view._redPoint.visible = Api.chatVoApi.isNewMsg()
			this.dorefresgChatRed();
		}
	}
	private tick():void
	{
		//越南 第三方支付icon显示
		this.checkViWebPay();
		this.dorefresgChatRed();
		this.checkQQVipGiftIcon();
		if(!Api.switchVoApi.checkClosePay())
		{
			if(GameData.checkTimeLimitWife())
			{
				this._leftIconMap.timelimitwife.haveIcon = true;
				let container = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("timeLimitWife-");
				if(container)
				{
					let vo = Api.shopVoApi.getPayInfoById2("g16");
					let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
					let str = "";
					/*
					if(PlatformManager.checkIsWxSp()){


						let curDay0 = App.DateUtil.getWeeTs(GameData.serverTime);
						let curDay5 = curDay0 + 3600 * 5;
						let endTime = 0;
						if(GameData.serverTime > curDay5){
							//第二天的5点
							endTime = curDay5 + 86400;

						} else {
							endTime = curDay5;
						}
						str = App.DateUtil.getFormatBySecond(endTime  - GameData.serverTime,1);

					} else {
						str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime  - GameData.serverTime,1);
					}
					*/

					str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime  - GameData.serverTime,1);
					
					let timeTF =  <BaseTextField>container.getChildByName("timelimitwifeTimeTF");
					if(timeTF)
					{
						timeTF.text = str;
					}
				}

			}
			else
			{
				this._leftIconMap.timelimitwife.haveIcon = false;
				// this.removeLeftIcon("timelimitwife");
			}
		}

		//越南第三方支付 红颜赠送
		
		if(GameData.checkTimeLimitWifeFb())
		{
			this._leftIconMap.timelimitwifefb.haveIcon = true;
			let container = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("timeLimitWifeFb-");
			if(container)
			{
				
				let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
				let wifeEt = Api.gameinfoVoApi.getRegdt() + cfg.lastTime;
				let str = "";
			

				str =  App.DateUtil.getFormatBySecond(wifeEt  - GameData.serverTime,1);
				
				let timeTF =  <BaseTextField>container.getChildByName("timelimitwifeFbTimeTF");
				if(timeTF)
				{
					timeTF.text = str;
				}
			}
		}
		else
		{
			
	
			this._leftIconMap.timelimitwifefb.haveIcon = false;
	
		}
		//夺帝倒计时
		let vo:AcBeTheKingVo = <AcBeTheKingVo>Api.acVoApi.getActivityVoByAidAndCode("beTheKing");
		if(vo){
			let container = <BaseDisplayObjectContainer>this._iconContainer.getChildByName(vo.aidAndCode);
			if(container){
				let aniSp =  <CustomMovieClip>container.getChildByName("aniSp");
				if(!aniSp){
					aniSp = ComponentManager.getCustomMovieClip("betheking_long_",6,100);
					// aniSp.setScale(1.8);
					aniSp.x = -37;
					aniSp.y = -40;
					container.addChildAt(aniSp,2);
					aniSp.name = "aniSp";
					aniSp.playWithTime(0);
				}
				aniSp.visible = !vo.isDuringPreview();
				let timeTF =  <BaseTextField>container.getChildByName("beTheKingTimeTF");
				if(!timeTF){
					//时间文本背景
					let timeBg = BaseBitmap.create("public_icontimebg");
					container.addChildAt(timeBg,0);
					timeTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_GREEN2)
					timeTF.setPosition( container.width / 2, 70 - timeTF.height / 2);
					timeTF.name = "beTheKingTimeTF";

					timeBg.width = timeTF.width + 8;
					timeBg.height = timeTF.height + 2;
					timeBg.x = timeTF.x + timeTF.width/2 - timeBg.width/2;
					timeBg.y = timeTF.y + timeTF.height/2 - timeBg.height/2+6;
					container.addChild(timeTF);
				}
				timeTF.text = vo.getCdTxtStr();
				timeTF.anchorOffsetX = timeTF.width/2;
			}
		}

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
						let timeBg = BaseBitmap.create("public_icontimebg");
						
						container.addChildAt(timeBg,0);
						timeTF = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_GREEN2)
						timeTF.setPosition(container.x + container.width / 2 - timeTF.width / 2,container.y + 80 - timeTF.height / 2);
						timeTF.name = "limitedgiftTimeTF";

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
		//检测签到红点
		if(Api.switchVoApi.checkSignUp()){
			if(GameData.serverTime > Api.otherInfoVoApi.getLastday() + 24 * 3600)
			{
				Api.otherInfoVoApi.setLastday(Api.otherInfoVoApi.getLastday() + 24 * 3600);
			
				Api.otherInfoVoApi.refreshArrivalNewInfoFlag();
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_OTHERINFO_REFRESHVO);
			}
		}
		
		if(this._friendsBtn && Api.friendVoApi.checkNpcMessage())
		{
			this._friendsBtn.visible = this._isAtCompose;
			if(Api.friendVoApi.getGetFriendVo()&& Api.friendVoApi.isShowRedForEnter() ){
				App.CommonUtil.addIconToBDOC(this._friendsBtn);
				// let reddot = this._friendsBtn.getChildByName("reddot");
				// reddot.x = 60;
				// reddot.y = 10;
			}else{
				App.CommonUtil.removeIconFromBDOC(this._friendsBtn);
			}
		}


		
		this.check12BoxIcon();

		// this.checkRankActiveIcon();
		if (Api.acVoApi.checkIsHasNewAc())
		{
			this.showNewActivityIcons();
		}
		let l:number=this._activityIconList.length;

		if(l>0)
		{
			let isdelete:boolean=false;
			for(let i:number=l-1;i>=0;i--)
			{
				let icon:BaseDisplayObjectContainer=this._activityIconList[i];
				let name:string=icon.name;
			
				let [aid,code]=name.split("-");

			
				let needRemove = this.checkIsLeftIcon(icon,aid,code);
				

				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{

					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false || needRemove)
					{
						icon.dispose();
						this._activityIconList.splice(i,1);
						delete this._iconNameList[icon.name];
						isdelete=true;
					}
				}

				// if(Api.acVoApi.getActivityVoByAidAndCode(aid,code))
				// {
				// 	if(!Api.acVoApi.checkActivityStartByAid(aid,code))
				// 	{
				// 		icon.dispose();
				// 		this._activityIconList.splice(i,1);
				// 		delete this._iconNameList[icon.name];
				// 		isdelete=true;
				// 	}
				// }

				this.setIconTime(icon);
			}

			if(this._leftIconMap.crossServer.haveIcon){
				for(let z = 0;z < this._leftIconList.length;z++){
					let icon = this._leftIconList[z];
				
					if(icon.name.indexOf("crossServer")>-1){
						
						this.checkIsLeftIcon(icon,this._leftIconMap.crossServer.aid,this._leftIconMap.crossServer.code);
					}	
				}
			}

		
			this.sortLeftIcon();
			this.initLeftIcon();
			this.setLeftIconPos();
			this.checkLeftRedpoint();

			if(isdelete||(this._lastL!=l))
			{
				this.sortIcons();
				this.setIconsPos();			
			}
		}
		
		this._lastL=this._activityIconList.length;
		//
		if (this._zeroGiftTime > 0) {
			this._zeroGiftTime--;
			if (this._zeroGiftTime <= 0) {
				this.removeMainUIIcon("zeroGift");
			}
		}
		// if(this._lastClickTime){
		// 	let timer = egret.getTimer();
		// 	if(((timer - this._lastClickTime)>5000)
		// 		&& (Number(Api.mainTaskVoApi.getCurMainTaskId()) <= Api.mainTaskVoApi.needGuideTask)
		// 		&& (LayerManager.panelLayer.numChildren < 1)
		// 		&& !this._taskHand 
		// 		&& (this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon1"))
		// 	){
		// 		this._taskHand = BaseLoadBitmap.create("guide_hand");
		// 		this._taskHand.setScale(0.6);
		// 		this._taskHand.x = 160;
		// 		this._taskHand.y = -185;
		// 		this._taskHand.name = "taskHand";
		// 		this._bottomContiner.addChild(this._taskHand);
		// 		egret.Tween.get(this._taskHand,{loop:true})
		// 			.to({y:this._taskHand.y +30,scaleX:0.8,scaleY:0.8}, 500)
		// 			.to({y:this._taskHand.y ,scaleX:0.6,scaleY:0.6}, 500);
		// 		egret.setTimeout(()=>{
		// 			if(this._taskHand){
		// 				this._lastClickTime = egret.getTimer();
		// 				this._taskHand.stopAllActions();
		// 				this._bottomContiner.removeChild(this._taskHand);
		// 				this._taskHand = null;	
		// 			}
		// 		},this,5000)		
		// 	}			
		// }
	}
	private showTaskHand()
	{
		if(this._taskHand)
		{
			return;
		}
		this._taskHand = BaseBitmap.create("guide_hand");
		this._taskHand.setScale(0.6);
		this._taskHand.x = 160;
		this._taskHand.y = -215;
		this._taskHand.name = "taskHand";
		this._bottomContiner.addChild(this._taskHand);
		egret.Tween.get(this._taskHand,{loop:true})
			.to({y:this._taskHand.y +30,scaleX:0.8,scaleY:0.8}, 500)
			.to({y:this._taskHand.y ,scaleX:0.6,scaleY:0.6}, 500);
		// egret.setTimeout(()=>{
		// 	if(this._taskHand){
		// 		this._lastClickTime = egret.getTimer();
		// 		this._taskHand.stopAllActions();
		// 		this._bottomContiner.removeChild(this._taskHand);
		// 		this._taskHand = null;	
		// 	}
		// },this,5000)		
	}
	private setIconTime(icon)
	{
		// egret.log(icon.name)
		if(icon.name == "newcharge_func"){
			let lt = Api.shopVoApi.getPayInfo1Time();
			let timeStr = App.DateUtil.getFormatBySecond(lt,1)
			if(icon.getChildByName("time")){
				icon.getChildByName("time").text = timeStr;
			}else{
				let timeBg = BaseBitmap.create("public_itemtipbg2"); 
				timeBg.width = 160;
				timeBg.height = 41;
				timeBg.x = -5;
				timeBg.y = 32;
				timeBg.setScale(0.5)
				icon.addChild(timeBg)
				let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_WARN_GREEN);
				timeTF.x = 2;
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
		if(PlatformManager.checkIsJPSp()&&PlatformManager.getAppid()!="1003002003")
		{
			this.initUserCenterIcon();
		}
		

		// this.initVipIcon();
		this.initRebateIcon();
		this.initRealnameIcon();
		this.initRealname3Icon();
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		let acIconList=Api.acVoApi.getAllActivityIcons();

		let l:number=acIconList.length;
		
		for(let i:number=0;i<l;i++)
		{
			
			let icon:BaseDisplayObjectContainer=acIconList[i];
			let name:string=icon.name;
			let [aid,code]=name.split("-");

			if(aid =="wifeBattleRank"){
				continue;
			}
	
			let needRemove = this.checkIsLeftIcon(icon,aid,code);

			if(!needRemove){
				this._iconNameList[icon.name.split("_")[0]]=icon;
				this._iconContainer.addChild(icon);
				this._activityIconList.push(icon);
			} 
			

		}
		
		this.initFuliIcons();
		this.checkWanBaIcon();
		this.initTwitterShareIcon();
		this.initCardIcons();
		this.check12BoxIcon();
		// this.checkRankActiveIcon();
		this.initContactIcon();
		this.initTimeLimitWifeFbIcon()
		//越南 第三方支付icon显示
		this.checkViWebPay();
		this.initTimeLimitWifeIcon()

		this.checkCandyIcon();
		this.initAndCheckAttentionIcon();
		// this.initDownloadIcon();
		this.initInviteIcon();
		this.initZhubowanghongIcon();
		// this.initCoverIcon();
		this.initBindIcon();
		this.initLimitedGiftIcon();
	
		if(PlatformManager.checkIsJPSp())
		{
			this.checkQuestionnaireIcon();
		}
	
		if(PlatformManager.getAppid()=="1003002003")
		{
			this.checkOpenH5Questionnaire();
		}
		// this.createMainUIIcon("questionnairejph5");
		if(PlatformManager.checkIsViSp()&&Api.switchVoApi.openViFacebook()&&Api.playerVoApi.getPlayerLevel()>3)
		{
			this.initFBIcon();
		}	

		if(PlatformManager.getAppid() =="1003004001"&&PlatformManager.checkIsViSp()&&Api.switchVoApi.checkOpenNewAndroidVersion()&&PlatformManager.getAppVersion()+"" != "2")
		{
			this.initNewVersionIcon();
			
		}
		

		if(PlatformManager.checkIsWxmgSp()&&PlatformManager.checkIsUseSDK()&&Api.switchVoApi.checkOpenCircle())
		{
			this.initCircleIcon();
		}

		// if(PlatformManager.app=="WX"&&PlatformManager.checkIsUseSDK())
		// {
		// 	this.initTxQRDialog();
		// 	// this.createMainUIIcon("txqrdialog");
		// }

		this.initWxchatgiftIcon();
		this.initWxaddmyproIcon();
		this.initWxaddoffacctIcon();
		if((PlatformManager.checkIsWxmgSp()||PlatformManager.checkIsWxAppSp())&&Api.switchVoApi.checkOpenAccountmove()&&PlatformManager.getAppid()!="1003016004")
		{
			this.initWxAccountMoveIcon();
		}
		this.initWanbaviptequanIcon();
		
		this.sortLeftIcon();
		this.initLeftIcon();
		this.setLeftIconPos();
		this.checkIconExtend();
		this.checkIsPlayerReturn();//检查
		this.initQQVipGiftIcon();
		this.initLoginWeekIcon();
		
		if (Api.switchVoApi.checkOpen37Question()) {
			this.checkNewQuestionnaireIcon();
		} 
		//创建0元礼包入口
		if (Api.switchVoApi.checkOpenZeroGift()) {
			this.checkZeroGiftIcon();
		} 
	}

	private showHand()
	{
		if(this._clickHand)
		{
			return;
		}
		this._clickHand = BaseBitmap.create("guide_hand");
		// this._clickHand.x = PlatformManager.hasSpcialCloseBtn()?57:620;
		this._clickHand.x = 300;
		this._clickHand.y = -90 + this._bottomComposeScrollContiner.y;
		this._bottomComposeBtnContiner.addChild(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}
	private showHandChallenge()
	{
		if(this._clickHand)
		{
			return;
		}
		this._clickHand = BaseBitmap.create("guide_hand");
		// this._clickHand.x = PlatformManager.hasSpcialCloseBtn()?57:620;
		this._clickHand.x = 430;
		this._clickHand.y = -90 + this._bottomComposeScrollContiner.y;
		this._bottomComposeBtnContiner.addChild(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}
	private hideHand()
	{
		// if(this._clickHand&&this._clickHand.name=="click") 
		if(this._clickHand)
		{
			egret.Tween.removeTweens(this._clickHand);
			this._bottomComposeBtnContiner.removeChild(this._clickHand);
			this._clickHand = null;
		}else if(this._clickHand)
		{
			this._clickHand.name="click";
		}
		
	}
	private checkQQVipGiftIcon():void{
		
		if(PlatformManager.checkIsQQVip()){
			let otherinfo = Api.otherInfoVoApi.getOtherInfo();
			if(!(otherinfo.info.wbqqflag && otherinfo.info.wbqqflag >= 1)){
				this.createMainUIIcon("qqvipgift");
				
			} else {
				this.removeMainUIIcon("qqvipgift");
			}
		}



	}
	
	private checkIsPlayerReturn():void{
		if(Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime())
		{
			//chen fei 和 haifeng 说都可以弹
			if(Api.playerReturnVoApi.getRebackRewards() != ''){
			// if(Api.playerReturnVoApi.getRebackRewards() != '' && !ViewController.getInstance().checkHasShowedView() ){
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

	//越南 第三方支付icon显示
	private checkViWebPay()
	{
		if(PlatformManager.checkIsViSp())
		{
			var sub = PlatformManager.getAppid();
			// if(sub == "1003004003" || sub!="1003004003"&&Api.switchVoApi.openViWebPay()&&Api.playerVoApi.getPlayerLevel()>3)

			if(this._isShowWebPay)
			{
				return;
			}

			if(sub == "1003004003" || (sub!="1003004003"&&Api.switchVoApi.openViWebPay()&&Api.playerVoApi.getPlayerLevel()>2))
			{
				this._isShowWebPay = true;
				// this.initWebPayIcon();
				this.createMainUIIcon("webpay");
			} else {
				this.removeMainUIIcon("webpay");
			}

			if(App.DeviceUtil.isIOS())
			{
				if(Api.switchVoApi.openViIOSWebPay()&&Api.playerVoApi.getPlayerLevel()>2){

					this._isShowWebPay = true;
					// this.initWebPayIcon();
					this.createMainUIIcon("webpay");
				} else {
					this.removeMainUIIcon("webpay");
				}
			}
			

		}
	}

	private initCircleIcon()
	{

		PlatformManager.checkHasCircleFunc((has)=>{
			if (has) {
				
				this.createMainUIIcon("wxcircle");
			}
		})
		
	}

	private initQQVipGiftIcon()
	{
		
		if(PlatformManager.checkIsQQVip()){
			let otherinfo = Api.otherInfoVoApi.getOtherInfo();
			if(!(otherinfo.info.wbqqflag && otherinfo.info.wbqqflag >= 1)){
				let icon = this.createMainUIIcon("qqvipgift");
				App.CommonUtil.addIconToBDOC(icon);
			}
			
		}

	}
	/** 新官上任 */
	private initLoginWeekIcon()
	{
		if (Api.switchVoApi.checkOpenLoginWeek() && !Api.otherInfoVoApi.getLoginWeekTimeout()) {
			let icon = this.createMainUIIcon("loginWeek");
			if (Api.otherInfoVoApi.getLoginWeekRed()) {
				App.CommonUtil.addIconToBDOC(icon);
			} else {
				App.CommonUtil.removeIconFromBDOC(icon);
			}
		} else {
			this.removeMainUIIcon("loginWeek");
		}
	}


	private initTxQRDialog()
	{

		PlatformManager.isFollowingTxAccount((has)=>{
			if (has) {
				
				this.createMainUIIcon("txqrdialog");
			}
		})
		
	}

	private initWxchatgiftIcon()
	{
		if(PlatformManager.checkIsWxmgSp()&&PlatformManager.checkIsUseSDK()&&PlatformManager.isShowCircle && Api.switchVoApi.checkOpenWxchatgift() && Api.otherInfoVoApi.getWxchatgift() != 2)
		{
			let icon = this.createMainUIIcon("wxchatgift");
			if (Api.otherInfoVoApi.getWxchatgift() == 1) {// 可领取时显示红点
				App.CommonUtil.addIconToBDOC(icon);
			} else {
				App.CommonUtil.removeIconFromBDOC(icon);
			}
		} else {
			this.removeMainUIIcon("wxchatgift");
		}
	}
	private initWxaddmyproIcon()
	{
		if(PlatformManager.checkIsWxH5Sp())
		{
			return false;
		}
		if(PlatformManager.checkIsWxmgSp()&& Api.switchVoApi.checkOpenWxaddmypro() && Api.otherInfoVoApi.wxaddmyproStatus() !== 2)
		{
			this.createMainUIIcon("wxaddmypro");
		} else {
			this.removeMainUIIcon("wxaddmypro");
		}

		if(App.DeviceUtil.isIOS()&& PlatformManager.checkIsWxmgSp()&&Api.switchVoApi.checkOpenWxIcon() && Api.otherInfoVoApi.wxiconStatus() != 2)
		// if(Api.otherInfoVoApi.wxiconStatus() != 1)
		{
			this.createMainUIIcon("wxaddicon");
		} 
		else {
			this.removeMainUIIcon("wxaddicon");
		}
	}
	private initWxaddoffacctIcon()
	{
		if(PlatformManager.checkIsWxmgSp()&& Api.switchVoApi.checkOpenWxaddoffacct() && !Api.otherInfoVoApi.wxaddoffacctStatus())
		// if(!Api.otherInfoVoApi.wxaddoffacctStatus())
		{
			this.createMainUIIcon("wxaddoffacct");
		} else {
			this.removeMainUIIcon("wxaddoffacct");
		}
	}
	private initWanbaviptequanIcon()
	{
		if (PlatformManager.checkIsWanbaSp() && Api.switchVoApi.checkOpenWanbaviptequan() && RSDKHelper.qqwbCanIShow("miniGameVIP")) {
			if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
				let tequanIcon = this.createMainUIIcon("wanbaviptequan");
				RSDKHelper.getWanbaviptequanLevel((vipLevel) => {
					WanbaviptequanView.currentVip = parseInt(vipLevel);
					if (WanbaviptequanView.currentVip > 0 && Api.otherInfoVoApi.getWanbaviptequanInfo(WanbaviptequanView.currentVip) != 1) {
						// 可领
						App.CommonUtil.addIconToBDOC(tequanIcon);
					} else {
						// 不可领
						App.CommonUtil.removeIconFromBDOC(tequanIcon);
					}
				});
			}
		} else {
			this.removeMainUIIcon("wanbaviptequan");
		}
	}

	private initWxAccountMoveIcon()
	{
		let icon =this.createMainUIIcon("accountmove");
		App.CommonUtil.addIconToBDOC(icon);
	}
	private initFBIcon()
	{
		this.createMainUIIcon("facebook");
	}

	private initNewVersionIcon()
	{
		let icon = this.createMainUIIcon("newversion");
		App.CommonUtil.addIconToBDOC(icon);
	}


	private checkIsLeftIcon(icon,aid,code):boolean
	{
		    /**查看是否是右侧图标start */
			let needRemove = false;
			
	
			
			//检测是否有可汗活动
			if(icon.name.indexOf("wipeBoss")>-1){

				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.wipeBoss.haveIcon = false;
						return needRemove;
					}
				}
				let names = icon.name.split("-");
				this._leftIconMap.wipeBoss.haveIcon = true;
				this._leftIconMap.wipeBoss.aid = aid;
				this._leftIconMap.wipeBoss.code = code;
				needRemove = true;
			}
			
			//判断风云擂台
			if(icon.name.indexOf("battleGround")>-1){
				
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{
			
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.crossServer.haveIcon = false;
						return needRemove;
					}
				}
	
				let names = icon.name.split("-");
				this._leftIconMap.crossServer.haveIcon = true;
				this._leftIconMap.crossServer.aid = aid;
				this._leftIconMap.crossServer.code = code;
				this._leftIconMap.crossServer.type = "";//accfg.getCrossServerType();
				needRemove = true;
			}	
			//判断跨服蛮王
			if(icon.name.indexOf("crossServerWipeBoss")>-1){
				
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{
			
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.crossServer.haveIcon = false;
						return needRemove;
					}
				}
				let accfg:Config.AcCfg.CrossServerWipeBossCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
				let names = icon.name.split("-");
				this._leftIconMap.crossServer.haveIcon = true;
				this._leftIconMap.crossServer.aid = aid;
				this._leftIconMap.crossServer.code = code;
				// this._leftIconMap.crossServer.type = accfg.getCrossServerType();
				needRemove = true;
			}		
			//判断跨服擂台
			if(icon.name.indexOf("crossServerAtkRace")>-1){
				
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{
			
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.crossServer.haveIcon = false;
						return needRemove;
					}
				}
				let accfg:Config.AcCfg.CrossServerAtkRaceCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
				let names = icon.name.split("-");
				this._leftIconMap.crossServer.haveIcon = true;
				this._leftIconMap.crossServer.aid = aid;
				this._leftIconMap.crossServer.code = code;
				this._leftIconMap.crossServer.type = accfg.getCrossServerType();
				needRemove = true;
			}
			//判断跨服亲密
			if(icon.name.indexOf("crossServerIntimacy")>-1){
				
			
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{					

					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.crossServer.haveIcon = false;
						return needRemove;
					}
				}
				let accfg:Config.AcCfg.CrossServerIntimacyCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
				let names = icon.name.split("-");
				this._leftIconMap.crossServer.haveIcon = true;
				this._leftIconMap.crossServer.aid = aid;
				this._leftIconMap.crossServer.code = code;
				this._leftIconMap.crossServer.type = accfg.getCrossServerType();
				needRemove = true;
			}
			//判断跨服权势
			if(icon.name.indexOf("crossServerPower")>-1){
				
			
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{					

					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.crossServer.haveIcon = false;
						return needRemove;
					}
				}
				let accfg:Config.AcCfg.CrossServerPowerCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
				let names = icon.name.split("-");
				this._leftIconMap.crossServer.haveIcon = true;
				this._leftIconMap.crossServer.aid = aid;
				this._leftIconMap.crossServer.code = code;
				if(accfg){
					this._leftIconMap.crossServer.type = accfg.getCrossServerType();
				} else {
					this._leftIconMap.crossServer.type = "11";
				}
				
				needRemove = true;
			}

			//判断跨服群芳冲榜
			if(icon.name.indexOf("crossServerWifeBattle")>-1){
				
			
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{					

					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.crossServer.haveIcon = false;
						return needRemove;
					}
				}
				let accfg:Config.AcCfg.CrossServerWifeBattleCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
				let names = icon.name.split("-");
				this._leftIconMap.crossServer.haveIcon = true;
				this._leftIconMap.crossServer.aid = aid;
				this._leftIconMap.crossServer.code = code;
				if(accfg){
					this._leftIconMap.crossServer.type = accfg.getCrossServerType();
				} else {
					this._leftIconMap.crossServer.type = "16";
				}
				
				needRemove = true;
			}


			if(icon.name == "rankActive"){
				this._leftIconMap.rankActive.haveIcon = false;
				this._leftIconMap.rankActive.rankActiveList = [];
				this._leftIconMap.rankActive.aid = "rankActive";

				let rankActiveList = Api.acVoApi.getRanActives();
	
				let rankA = null;
				let rankObj = null;
				for(let j: number = 0; j < rankActiveList.length; j++){
					rankA = rankActiveList[j];
					if(rankA.et - 86400 - GameData.serverTime <=0){
						continue;
					}
					switch(rankA.atype){
						case 90:
							//银两增速冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:1, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 1:
							//权势冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:2, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 15:
							//资质冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:3, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 6:
							//擂台冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:4, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 4:
							//帮会冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:5, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 5:
							//亲密冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:6, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 12:
							//帮会势力冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:7, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 14:
							//帮会擂台冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:8, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 13:
							//帮会亲密冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:9, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 22:
							//帮会亲密冲榜
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:10, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;
						case 2:
							//关卡冲榜  //运营要求 调整位置 调整到帮会各种冲榜后面
							this._leftIconMap.rankActive.haveIcon = true;
							rankObj = {order:11, atype:rankA.atype, code:rankA.code};
							this._leftIconMap.rankActive.rankActiveList.push(rankObj);
							break;

					}
				}				
			}

			if( icon.name.indexOf("oneYearOverview")>-1 ){
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{					
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.oneYearOverview.haveIcon = false;
						return needRemove;
					}
				}
				// let accfg:Config.AcCfg.OneYearOverviewCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
				let names = icon.name.split("-");
				this._leftIconMap.oneYearOverview.haveIcon = true;
				this._leftIconMap.oneYearOverview.aid = aid;
				this._leftIconMap.oneYearOverview.code = code;
				needRemove = true;
			}
			if( icon.name.indexOf("singleDayOverview")>-1 ){
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{					
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.singleDayOverview.haveIcon = false;
						return needRemove;
					}
				}
				let names = icon.name.split("-");
				this._leftIconMap.singleDayOverview.haveIcon = true;
				this._leftIconMap.singleDayOverview.aid = aid;
				this._leftIconMap.singleDayOverview.code = code;
				needRemove = true;
			}
			if( icon.name.indexOf("conquerMainLand")>-1 ){
				let acvo=Api.acVoApi.getActivityVoByAidAndCode(aid,code);
				if(acvo)
				{					
					if(Api.acVoApi.checkActivityStartByAid(aid,code)==false||acvo.isShowIcon==false )
					{
						needRemove = true;
						this._leftIconMap.conquerMainLand.haveIcon = false;
						return needRemove;
					}
				}
				let names = icon.name.split("-");
				this._leftIconMap.conquerMainLand.haveIcon = true;
				this._leftIconMap.conquerMainLand.aid = aid;
				this._leftIconMap.conquerMainLand.code = code;
				needRemove = true;
			}
			// if( icon.name.indexOf("rankActive")>-1){
			// 	let _acVoList=Api.acVoApi.getActivityVoListByAid(aid);
			// 	if(_acVoList)
			// 	{
			// 		for(let racode in _acVoList)
			// 		{
			// 			if(_acVoList.hasOwnProperty(racode))
			// 			{
			// 				let vo=<AcBaseVo>_acVoList[racode];
			// 				if(vo&&vo.atype=="90")
			// 				{
			// 					if(( GameData.serverTime < (vo.et  - 86400*(vo.config.extraTime||0)))&&vo.st <= GameData.serverTime){
			// 						needRemove = true;
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}
			// }

			return needRemove;
	}


	private sortLeftIcon():void
	{
		let iconStr = null;
		let iconMsg = null;
		this._leftIconMsgListBak = this._leftIconMsgList;
		this._leftIconMsgList = [];
		//第一个位置 ,如果有周年庆，则不显示一元红颜，王海峰需求，20190725
		if(this._leftIconMap.oneYearOverview.haveIcon){
			iconStr = "left_overview";
			iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.oneYearOverview.aid, code:this._leftIconMap.oneYearOverview.code ,index:1}
			this._leftIconMsgList.push(iconMsg);
		}else if(this._leftIconMap.singleDayOverview.haveIcon){
			iconStr = "left_singledayoverview";
			iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.singleDayOverview.aid, code:this._leftIconMap.singleDayOverview.code ,index:1}
			this._leftIconMsgList.push(iconMsg);
		}else{
			//第一个位置
			if(this._leftIconMap.timelimitwife.haveIcon && !PlatformManager.checkHideIconByIP()){

					//有限时红颜
					iconStr = "left_timelimitwife";	
					
					iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.timelimitwife.aid, code:this._leftIconMap.timelimitwife.code ,index:1}
					this._leftIconMsgList.push(iconMsg);


			} 
			if(this._leftIconMap.timelimitwifefb.haveIcon && !PlatformManager.checkHideIconByIP()){

					//越南fb有限时红颜
					iconStr = "left_timelimitwifefb";	
					
					iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.timelimitwifefb.aid, code:this._leftIconMap.timelimitwifefb.code ,index:1}
					this._leftIconMsgList.push(iconMsg);

			} 
		}
		// 第二个位置
		if(this._leftIconMap.firstrecharge.haveIcon && !PlatformManager.checkHideIconByIP()){

				iconStr = "left_firstrecharge";
				iconMsg = {iconStr: iconStr, atype:"",aid:this._leftIconMap.firstrecharge.aid, code:this._leftIconMap.firstrecharge.code,index:2}
				this._leftIconMsgList.push(iconMsg);

		} else if (this._leftIconMap.jurakudai.haveIcon) {
				iconStr = "left_jurakudai";
				iconMsg = {iconStr: iconStr, atype:"",aid:this._leftIconMap.jurakudai.aid, code:this._leftIconMap.jurakudai.code,index:2}
				this._leftIconMsgList.push(iconMsg);
		} else if(this._leftIconMap.secondrecharge.haveIcon && !PlatformManager.checkHideIconByIP()){
				iconStr = "left_secondrecharge";
				iconMsg = {iconStr: iconStr, atype:"",aid:this._leftIconMap.secondrecharge.aid, code:this._leftIconMap.secondrecharge.code,index:2}
				this._leftIconMsgList.push(iconMsg);

		} else if(this._leftIconMap.threerecharge.haveIcon && !PlatformManager.checkHideIconByIP()){
				iconStr = "left_charge_3";
				iconMsg = {iconStr: iconStr, atype:"",aid:this._leftIconMap.threerecharge.aid, code:this._leftIconMap.threerecharge.code,index:2}
				this._leftIconMsgList.push(iconMsg);

		} else if(this._leftIconMap.fourrecharge.haveIcon && !PlatformManager.checkHideIconByIP()){
				iconStr = "left_charge_4";
				iconMsg = {iconStr: iconStr, atype:"",aid:this._leftIconMap.fourrecharge.aid, code:this._leftIconMap.fourrecharge.code,index:2}
				this._leftIconMsgList.push(iconMsg);

		}
	
		//第四个位置  新3位置
		if(this._leftIconMap.crossServer.haveIcon){
			iconStr = "left_" + this._leftIconMap.crossServer.aid.toLowerCase();
			iconMsg = {iconStr: iconStr,atype:"", ctype:this._leftIconMap.crossServer.type,aid:this._leftIconMap.crossServer.aid, code:this._leftIconMap.crossServer.code,index:3}
			this._leftIconMsgList.push(iconMsg);
		}else if(this._leftIconMap.conquerMainLand.haveIcon){
			iconStr = "left_conquermainland";
			iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.conquerMainLand.aid, code:this._leftIconMap.conquerMainLand.code ,index:3}
			this._leftIconMsgList.push(iconMsg);
	    }

		//第五个位置 新4位置
		if(this._leftIconMap.wipeBoss.haveIcon){
			iconStr = "left_wipeboss";
			iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.wipeBoss.aid, code:this._leftIconMap.wipeBoss.code ,index:4}
			this._leftIconMsgList.push(iconMsg);

		} else if(this._leftIconMap.rankActive.haveIcon){
			let rankList = this._leftIconMap.rankActive.rankActiveList.sort((a,b)=>{
				return a.order - b.order;
			});
			let showRank = rankList[0];
			iconStr = "left_rankactive-";
			iconMsg = {iconStr : iconStr, atype:showRank.atype, aid:"rankActive" ,code:showRank.code,index:4}
			this._leftIconMsgList.push(iconMsg);
		} 
		if(Api.playerVoApi.getPlayerBuyGem()<=0 && Api.switchVoApi.checkOpenHideRechargeIcon())
		{

		}else{
			//第三个位置 新5位置
			if(this._leftIconMap.monthCard.haveIcon && !PlatformManager.checkHideIconByIP()){

					iconStr = "left_monthcard";
					iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.monthCard.aid, code:this._leftIconMap.monthCard.code ,index:5}
					this._leftIconMsgList.push(iconMsg);
				

			} else if(this._leftIconMap.yearCard.haveIcon && !PlatformManager.checkHideIconByIP()){

					iconStr = "left_yearcard";
					iconMsg = {iconStr: iconStr, atype:"", aid:this._leftIconMap.yearCard.aid, code:this._leftIconMap.yearCard.code ,index:5}
					this._leftIconMsgList.push(iconMsg);
			}	
		}
		


		  
	}

	//初始化左侧icon栏
	private initLeftIcon():void
	{	
		// if(PlatformManager.checkHideIconByIP())
		// {
		// 	return;
		// }
		if (Api.switchVoApi.checkTWShenhe()) {
			return;
		}
		if (PlatformManager.checkIs37WdShenheSp()) {
			return;
		}
		if(this._leftIconMsgList.length > 4){
			let lz = this._leftIconMsgList.length;
			// this._leftIconMsgList.pop();
			for(let z = lz-1;z>=0;z--){
				if(this._leftIconMsgList[z].index == 5)
				{
					this._leftIconMsgList.splice(z,1);
				}

			}
		}

		let l = this._leftIconMsgList.length;
		let lBak = this._leftIconMsgListBak.length;



		//remove icon
		for(let j = lBak-1;j>=0;j--){
			let isdelete = true;
			for(let i = l-1; i >=0; i --){
				if(this._leftIconMsgList[i].iconStr+this._leftIconMsgList[i].atype == this._leftIconMsgListBak[j].iconStr+this._leftIconMsgListBak[j].atype)
				{
					isdelete = false;
				}
			}
			if(isdelete){
				// iconContainer.name = iconMsg.aid +"-"+ iconMsg.code;
				// this.removeLeftIcon(this._leftIconMsgListBak[j].iconStr+this._leftIconMsgListBak[j].atype);
				this.removeLeftIcon(this._leftIconMsgListBak[j].aid+this._leftIconMsgListBak[j].atype+"-"+this._leftIconMsgListBak[j].code);
			}
		}

		//add icon
		for(let i = 0; i < l; i ++){
			let isadd = true
			for(let j = 0; j < lBak; j++){
				if(this._leftIconMsgList[i].iconStr+this._leftIconMsgList[i].atype == this._leftIconMsgListBak[j].iconStr+this._leftIconMsgListBak[j].atype)
				{
					isadd = false;
				}
			}
			if(isadd){
				let icon = this.createLeftIcon(this._leftIconMsgList[i]);
				this._leftIconContainer.addChild(icon);
				this._leftIconList.push(icon);
			}
		}
	}
	private checkLeftRedpoint():void
	{
		this.checkFirstRechargeRedpoint();

		this.checkJurakudaiRedPoint();

		this.checkOneYearOverviewRedpoint();

		this.checkSingleDayOverviewRedpoint();

		this.checkConquerMainLandRedpoint();
	}

	/**大宴乡勇-红点 */
	private checkJurakudaiRedPoint() {
		let _vo: AcJurakudaiVo = (<AcJurakudaiVo[]>Api.acVoApi.getActivityVoListByAid("jurakudai"))[0];
		if (_vo) {
			let _icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName(_vo.aidAndCode);
			if (!_icon) return;
			if (_vo.isShowRedDot) {
				App.CommonUtil.addIconToBDOC(_icon);
			} else {
				App.CommonUtil.removeIconFromBDOC(_icon);
			}
		}
	}

	private checkFirstRechargeRedpoint():void
	{
		if(Api.shopVoApi.getPayFlag()==1 && Api.servantVoApi.getServantObj("1033") == null)
		{

			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("firstRecharge-");
			if(icon){
				App.CommonUtil.addIconToBDOC(icon);
			}
			
		}
		else
		{
			// let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("firstRecharge-");
			// App.CommonUtil.removeIconFromBDOC(icon);
		}

		if(Api.switchVoApi.checkOpenSecondCharge()){
			this.checkSecondRechargeRedpoint();
		}
		if(Api.switchVoApi.checkOpenAllCharge()){
			this.checkThreeRechargeRedpoint();
			this.checkFourRechargeRedpoint();
		}
	}
	private checkSecondRechargeRedpoint():void
	{
		if(Api.shopVoApi.getSecondRateCharge()==1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null)
		{

			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("secondRecharge-");
			if(icon){
				App.CommonUtil.addIconToBDOC(icon);
			}
			
		}
		else
		{
			// let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("firstRecharge-");
			// App.CommonUtil.removeIconFromBDOC(icon);
		}
	}

	private checkThreeRechargeRedpoint():void
	{
		if(Api.shopVoApi.getThreeRateCharge()==1)
		{
			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("threerecharge-");
			if(icon){
				App.CommonUtil.addIconToBDOC(icon);
			}
		}
	}

	private checkFourRechargeRedpoint():void
	{
		if(Api.shopVoApi.getFourRateCharge()==1)
		{
			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildByName("fourrecharge-");
			if(icon){
				App.CommonUtil.addIconToBDOC(icon);
			}
		}
	}

	//双十一红点检测
	checkSingleDayOverviewRedpoint():void
	{
		let numChildren = this._leftIconContainer.numChildren;
		for (var index = 0; index < numChildren; index++) {
			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildAt(index);;
			if(icon.name.indexOf("singleDayOverview-") > -1){
				let ameTab = (icon.name).split("-");
				let vo = Api.acVoApi.getActivityVoByAidAndCode(ameTab[0],ameTab[1]);
				// App.CommonUtil.addIconToBDOC(icon);
				icon.getChildByName("reddot").visible = vo && vo.isShowRedDot;
			}
		}
			
	}

	//周年庆红点检测
	private checkOneYearOverviewRedpoint():void
	{
		let numChildren = this._leftIconContainer.numChildren;
		for (var index = 0; index < numChildren; index++) {
			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildAt(index);;
			if(icon.name.indexOf("oneYearOverview-") > -1){
				let ameTab = (icon.name).split("-");
				let vo = Api.acVoApi.getActivityVoByAidAndCode(ameTab[0],ameTab[1]);
				// App.CommonUtil.addIconToBDOC(icon);
				icon.getChildByName("reddot").visible = vo && vo.isShowRedDot;
			}
		}
			
	}

	//定军中原红点
	private checkConquerMainLandRedpoint():void
	{
		let numChildren = this._leftIconContainer.numChildren;
		for (var index = 0; index < numChildren; index++) {
			let icon = <BaseDisplayObjectContainer>this._leftIconContainer.getChildAt(index);;
			if(icon.name.indexOf("conquerMainLand-") > -1){
				let ameTab = (icon.name).split("-");
				let vo = Api.acVoApi.getActivityVoByAidAndCode(ameTab[0],ameTab[1]);
				// App.CommonUtil.addIconToBDOC(icon);
				icon.getChildByName("reddot").visible = vo && vo.isShowRedDot;
			}
		}
			
	}

	private setLeftIconPos():void
	{
		


		this._leftIconList.sort((a,b)=>{
			return a["index"] - b["index"];
		});


		let l = this._leftIconList.length;
		let tmpY = 0;
		for(let i = 0;i<l;i++){
			let icon = this._leftIconList[i];
			icon.x = 0;
			// icon.y = 120 * i;
			icon.y = tmpY;
			tmpY += icon.height-10;
		}
		if(this._leftIconList.length == 0){
			this.setIconsPos();	
		}



		if(this._leftIconList.length > 0){
			
			if(GameData.leftBubble.isFirstChargeBubble){
				
				this.checkLeftBubble("firstChargeBubble");
				GameData.leftBubble.isFirstChargeBubble = false;
			}

		}

	}

	//检测左侧气泡
	private checkLeftBubble(key:string)
	{
		let leftIcon:BaseDisplayObjectContainer = null;
		let imgRes = null;
		for(let i = 0; i < this._leftIconList.length; i++)
		{
			leftIcon = this._leftIconList[i];
			if(leftIcon.name == "firstRecharge-"){
				
				if(Api.switchVoApi.checkOpenFirstCharge6Times()){
					imgRes = "leftbubble_recharge6";
				} else {
					imgRes = "leftbubble_recharge4";
				}
				break;
			}
		}
		if(leftIcon && imgRes){
			let bgLoadCompleteD=function(container:BaseDisplayObjectContainer):void
			{
				
				egret.Tween.get(container)
				.set({alpha:0,visible:true})
				.to({alpha:1},200)
			}
			let bubble = new BaseDisplayObjectContainer();
			bubble.width = 305;
			bubble.height = 375;
			bubble.visible = false;
			let bubbleImg = BaseLoadBitmap.create(imgRes,null,{callback:bgLoadCompleteD,callbackThisObj:this,callbackParams:[bubble]});
			bubbleImg.width = 305;
			bubbleImg.height = 375;
			bubbleImg.addTouchTap(this.leftBubbleClickHandler,this,[leftIcon,bubble]);
			
			bubble.addChild(bubbleImg);



			let closeBtn = ComponentManager.getButton("btn_win_closebtn",null,this.leftBubbleCloseHandler,this,[bubble],3);
			closeBtn.setScale(0.7);
			closeBtn.x = bubble.width - closeBtn.width * closeBtn.scaleX;
			closeBtn.y = 0;
			bubble.addChild(closeBtn);

			bubble.x = leftIcon.x + leftIcon.width - 20;
			bubble.y = leftIcon.y + 7;
			leftIcon.parent.addChild(bubble);
			egret.setTimeout(()=>{
				
				if(bubble && bubble.parent){
					egret.Tween.get(bubble)
					.to({alpha:0},200)
					.call(()=>{
						bubble.parent.removeChild(bubble);
					})
					
				}
			},this,10000);

		}
	}
	private leftBubbleClickHandler(e,leftIcon:BaseDisplayObjectContainer,bubble:BaseDisplayObjectContainer)
	{
		console.log(arguments);
		if(bubble.parent){
			bubble.parent.removeChild(bubble);	
		}
		let event = new egret.Event(egret.TouchEvent.TOUCH_TAP);
	
		leftIcon.dispatchEvent(event);
		
	}
	private leftBubbleCloseHandler(bubble:BaseDisplayObjectContainer)
	{
		if(bubble.parent){
			bubble.parent.removeChild(bubble);	
		}
	}

	private createLeftIcon(iconMsg: {iconStr: string, atype: string, ctype: string, aid: string, code: string, index:number}):BaseDisplayObjectContainer
	{

		let iconContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer(); 
		iconContainer.name = iconMsg.aid + iconMsg.atype+"-"+ iconMsg.code;//iconMsg.iconStr + iconMsg.atype;
		iconContainer["index"] = iconMsg["index"];
		iconContainer.width = 129;
		iconContainer.height = 130;
		
		let iconBg:BaseBitmap = BaseBitmap.create("public_lefticon_bg");
		iconBg.name = "iconBg";
		
		let framNum = 5;
		let iconImg:BaseBitmap = undefined;
		if(iconMsg.aid == "oneYearOverview"){
			iconContainer.width = 140;
			iconContainer.height = 147;
			iconImg = BaseLoadBitmap.create(iconMsg.iconStr+"_" + 10);
			iconImg.name = "iconImg";
			framNum = 9;
		}
		if(iconMsg.aid == "singleDayOverview"){
			// iconContainer.width = 140;
			// iconContainer.height = 147;
			iconImg = BaseLoadBitmap.create(iconMsg.iconStr + "_icon");
			iconImg.width = 129;
			iconImg.height = 130
			iconImg.name = "iconImg";
			
		}
		let iconBgLight = ComponentManager.getCustomMovieClip("left_iconbg_",5,100);
		iconBgLight.name = "iconBgLight";
		let icon = ComponentManager.getCustomMovieClip(iconMsg.iconStr + iconMsg.atype+"_",framNum,100);
		icon.name = "icon";

		let iconNameStr = iconMsg.iconStr + iconMsg.atype + "_name";

		//跨服名称处理
		if(iconMsg.ctype){
			if(ResourceManager.hasRes(iconMsg.iconStr + "-" + iconMsg.ctype + "_name")){
				iconNameStr = iconMsg.iconStr + "-" + iconMsg.ctype + "_name";
			} else {
				iconNameStr = iconMsg.iconStr + iconMsg.atype + "_name";
			}
			
		}
		//iconname后加code 如果没有对应code 的使用原来的iconnamestr

		//韩国开服特殊版本  权势冲榜
		
		if(iconMsg.code.toString() == "51")
		{
			iconNameStr = "left_rankactive-1_name-1";
		} 

		if(iconMsg.aid == "timeLimitWifeFb")
		{
			iconNameStr = "left_timelimitwifefb_name";
		}

		let iconName = BaseLoadBitmap.create(iconNameStr);
		iconName.name = "iconName";
		iconName.width = 90;
		iconName.height = 24;
		iconName.x = iconContainer.width/2 - iconName.width/2;
		iconName.y = iconContainer.height - iconName.height - 15;


		if(!iconImg){
			iconContainer.addChildAt(iconBg,1);
		}else{
			iconContainer.addChildAt(iconBg,0);
			iconContainer.addChild(iconImg);
			icon.blendMode = egret.BlendMode.ADD;
		}
		
		iconContainer.addChildAt(iconBgLight,2);
		iconBgLight.playWithTime(0);
		iconContainer.addChildAt(icon,3);
		icon.playWithTime(0);
		iconContainer.addChildAt(iconName,4);

		// App.CommonUtil.addIconToBDOC(container);
		let redPoint = "public_dot2";
		let reddot: BaseBitmap = BaseBitmap.create(redPoint);
		reddot.x = iconContainer.width - reddot.width - 27;
		reddot.y =  reddot.height+3 ;//- 20;
		reddot.name = "reddot";
		iconContainer.addChild(reddot);
		reddot.visible = false;
		



		if(iconMsg.iconStr == "left_timelimitwife"){
			let timeBg = BaseBitmap.create("public_icontimebg");
			timeBg.height = 30
			timeBg.x = iconContainer.width/2 - timeBg.width/2;
			timeBg.y = iconName.y + iconName.height - 10;
			iconContainer.addChildAt(timeBg,0);
			let time = 0;
			let str = "";
	
			let vo = Api.shopVoApi.getPayInfoById2("g16");
			let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
			time = vo.st + cfg.lastTime ;
			

			str =  App.DateUtil.getFormatBySecond(time - GameData.serverTime,1);

			let timeTF = ComponentManager.getTextField(str,16,TextFieldConst.COLOR_QUALITY_RED)
			timeTF.name = "timelimitwifeTimeTF";
			timeTF.x = timeBg.x + timeBg.width/2 - timeTF.width/2;
			timeTF.y = timeBg.y + timeBg.height/2 - timeTF.height/2+2;
			iconContainer.addChild(timeTF);
		}

		if(iconMsg.iconStr == "left_timelimitwifefb"){
			let timeBg = BaseBitmap.create("public_icontimebg");
			timeBg.height = 30
			timeBg.x = iconContainer.width/2 - timeBg.width/2;
			timeBg.y = iconName.y + iconName.height - 10;
			iconContainer.addChildAt(timeBg,0);
			let time = 0;
			let str = "";
			
				
			let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
			time = Api.gameinfoVoApi.getRegdt() + cfg.lastTime ;

			str =  App.DateUtil.getFormatBySecond(time - GameData.serverTime,1);

			let timeTF = ComponentManager.getTextField(str,16,TextFieldConst.COLOR_QUALITY_RED)
			timeTF.name = "timelimitwifeFbTimeTF";
			timeTF.x = timeBg.x + timeBg.width/2 - timeTF.width/2;
			timeTF.y = timeBg.y + timeBg.height/2 - timeTF.height/2+2;
			iconContainer.addChild(timeTF);
		}
		
		iconContainer.addTouchTap(()=>{
			if(Api.rookieVoApi.isGuiding){
				return;
			}
			let viewName = "";
			if(iconMsg.iconStr == "left_timelimitwife")
			{
				viewName=ViewConst.POPUP.TIMELIMITWIFEVIEW;		
				ViewController.getInstance().openView(viewName);

			} else if(iconMsg.iconStr == "left_timelimitwifefb"){


				viewName=ViewConst.POPUP.TIMELIMITWIFEFBVIEW;	
				ViewController.getInstance().openView(viewName);

			} else if(iconMsg.iconStr == "left_firstrecharge"){
		
				viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
	
				ViewController.getInstance().openView(viewName);
			} else if (iconMsg.iconStr == "left_jurakudai") {
				let name = iconMsg.aid.toLowerCase();
				viewName = "Ac" + name.slice(0, 1).toUpperCase() + name.slice(1) + "View";
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_secondrecharge"){

				viewName=ViewConst.POPUP.SECONDRECHARGEVIEW;
				ViewController.getInstance().openView(viewName);

			} else if(iconMsg.iconStr == "left_wipeboss"){
				ViewController.getInstance().openView("AcWipeBossView", iconMsg.code);
				
			} else if(iconMsg.iconStr == "left_battleground"){

					if(Api.acVoApi.checkActivityStartByAid("battleGround",iconMsg.code)==false)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						this._leftIconMap.crossServer.haveIcon = false;
						return;
					}

				ViewController.getInstance().openView("AcBattleGroundView", iconMsg.code);
			} else if(iconMsg.iconStr == "left_crossserverwipeboss"){
				viewName = "AcCrossServerWipeBossView";
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_crossserveratkrace"){
				viewName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_crossserverintimacy"){
				viewName = "Ac" + App.StringUtil.firstCharToUper("crossServerIntimacy") + "View";
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_crossserverpower"){
				viewName = "Ac" + App.StringUtil.firstCharToUper("crossServerPower") + "View";
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_crossserverwifebattle"){
				viewName = "AcCrossServerWifeBattleEnterView";
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_monthcard"){
				viewName=ViewConst.COMMON.WELFAREVIEWMONTHCARD;
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_yearcard"){
				viewName=ViewConst.COMMON.WELFAREVIEWYEARCARD;
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_rankactive-"){
				ViewController.getInstance().openView("Ac" + App.StringUtil.firstCharToUper("RankActive")+"View", iconMsg.code);
			} else if(iconMsg.iconStr == "left_overview"){
				viewName=ViewConst.COMMON.ACONEYEAROVERVIEW;
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_singledayoverview"){
				viewName=ViewConst.COMMON.ACSINGLEDAYOVERVIEW;
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_conquermainland"){
				viewName=ViewConst.COMMON.ACCONQUERMAINLANDVIEW;
				ViewController.getInstance().openView(viewName, iconMsg.code);
			} else if(iconMsg.iconStr == "left_charge_3"){
				viewName=ViewConst.POPUP.THREERECHARGEVIEW;
				ViewController.getInstance().openView(viewName);
			} else if(iconMsg.iconStr == "left_charge_4"){
				viewName=ViewConst.POPUP.FOURRECHARGEVIEW;
				ViewController.getInstance().openView(viewName);
			}
		},this);
		return iconContainer;
	}

	private removeLeftIcon(modelName:string):void
	{
		let l:number=this._leftIconList.length;

		for(let i:number=l-1;i>=0;i--)
		{

			if(this._leftIconList[i].name && this._leftIconList[i].name == modelName)
			{
		
				this._leftIconList[i].dispose();
				this._leftIconList.splice(i,1);

				break;
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
				if (nameA != "rankActive" && Api.acVoApi.getActivityVoByAidAndCode(nameA,nameA2) && Api.acVoApi.getActivityVoByAidAndCode(nameA,nameA2).checkIsInEndShowTime())
				{	
					sortIdA += 10001;
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
				if (nameB != "rankActive" && Api.acVoApi.getActivityVoByAidAndCode(nameB,nameB2) && Api.acVoApi.getActivityVoByAidAndCode(nameB,nameB2).checkIsInEndShowTime())
				{
					sortIdB += 10001;
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
			
			
			
			return sortIdA-sortIdB;
		});

		if (this._extandButton)
		{
			this._extandButton.setVisible(this._pickUpTab.length>0);
			if (this._pickUpTab.length>0)
			{
				this.checkActivityIconState();
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

			this.sortIcons();
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
			if(this._extandButton){
				if (this._isInExtanding == true)
				{
					egret.Tween.removeTweens(this._extandButton);
					this._isInExtanding = false;
					this._extandButton.packUp();
				}
				else
				{
					
					if (this._extandButton._status == 1)
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
	}


	// private initWebPayIcon():void
	// {	
	// 	this.createMainUIIcon("webpay");
	// }
	private showNewActivityIcons():void
	{		
		let acIconList=Api.acVoApi.getAllActivityIcons();
		let l:number=acIconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=acIconList[i];
			let nameKey:string = icon.name.split("_")[0];
			if(!this._iconNameList[nameKey]){
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
	//越南facebook第三方支付
	private initTimeLimitWifeFbIcon()
	{
		if(GameData.checkTimeLimitWifeFb())
		{
			this._leftIconMap.timelimitwifefb.haveIcon = true;
			this._leftIconMap.timelimitwifefb.aid = "timeLimitWifeFb";
			this._leftIconMap.timelimitwifefb.code = "";
		} 
		else 
		{
			//越南 第三方支付icon显示
			
			this._leftIconMap.timelimitwifefb.haveIcon = false;
		}
	


	}
	/**
	 * 限时红颜
	 */
	private initTimeLimitWifeIcon()
	{
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}

		if(PlatformManager.checkHideIconByIP())
		{
			return;
		}
		if(GameData.checkTimeLimitWife())
		{
			

			this._leftIconMap.timelimitwife.haveIcon = true;
			this._leftIconMap.timelimitwife.aid = "timeLimitWife";
			this._leftIconMap.timelimitwife.code = "";
		
		}
		else
		{
			// this.removeLeftIcon("timelimitwife");
			this._leftIconMap.timelimitwife.haveIcon = false;
		}
		
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

	private initVipIcon():void
	{
		if(Api.switchVoApi.checkClosePay()||PlatformManager.checkIsJPSp())
		{
			return;
		}
		this.createMainUIIcon("rechargeVip");
	}

	private initUserCenterIcon():void
	{
		this.createMainUIIcon("usercenter");
	}

	private checkQuestionnaireIcon():void
	{
		if (!Api.otherInfoVoApi.hasQuestionnaireOk()&&Api.switchVoApi.checkOpenQuestionnaire()) {
			this.createMainUIIcon("questionnaire"); 
		} else {
			this.removeMainUIIcon("questionnaire"); 
		}
	}
	//新问卷调查
	private checkNewQuestionnaireIcon():void
	{
		let time = Api.otherInfoVoApi.getOtherInfo().info["questionflag"];
		let interval = 15 * 24 * 3600;
		let nowTime = GameData.serverTime;
		if (time && nowTime - time < interval) {
			this.removeMainUIIcon("newQuestionnaire");
		} else {
			let btn = this.createMainUIIcon("newQuestionnaire");
			if (btn) {
				App.CommonUtil.addIconToBDOC(btn);
			}
		}
	}
	private checkZeroGiftIcon(): void {
		let zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
		if (zeroGift) {
			let et = zeroGift['et'];
			let nowTime = GameData.serverTime;
			if (nowTime < et) {
				this._zeroGiftTime = et - nowTime;
				let btn = this.createMainUIIcon("zeroGift");
				let leng = 0;
				if (zeroGift && zeroGift["flags"]) {
					for (let k in zeroGift["flags"]) {
						leng++;//已经购买过了
					}
				}
				if ((zeroGift["firstflag"] >= 1) || leng == 3) {//显示红点条件，未购买全并且当天第一点击
				} else {
					if (btn) {
						App.CommonUtil.addIconToBDOC(btn);
					}
				}
			}
		}
	}
	private checkZeroGiftRed(): void {
		let btn = this._iconNameList["zeroGift"];
		if (btn) {
			let zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
			if (zeroGift && zeroGift["firstflag"] >= 1) {
				App.CommonUtil.removeIconFromBDOC(btn);
			}
		}
	}


	private checkOpenH5Questionnaire():void
	{
		if (Api.switchVoApi.checkOpenH5Questionnaire()) {
			this.createMainUIIcon("questionnairejph5"); 
		} else {
			this.removeMainUIIcon("questionnairejph5"); 
		}
	}

	private check37QuestionIcon():void
	{
		if (Api.switchVoApi.checkOpen37Question()) {
			this.createMainUIIcon("questionnaire37"); 
		} else {
			this.removeMainUIIcon("questionnaire37"); 
		}
	}
	//福利－1.5倍
	private initRebateIcon():void
	{
		if(!Api.switchVoApi.checkOpenRechargeRebate())
		{
			return;
		}
		this.createMainUIIcon("rebate");
	}
	//实名认证
	private initRealnameIcon():void
	{
		if(!Api.switchVoApi.checkOpenCertification()||Api.otherInfoVoApi.certification())
		{
			return;
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
	//实名认证3
	private initRealname3Icon():void
	{
		if (Api.switchVoApi.checkOpenCertification3()&&App.DeviceUtil.isWXgame() && !Api.otherInfoVoApi.hasRealname3Ok()) {
			this.createMainUIIcon("realname3"); 
		} else {
			this.removeMainUIIcon("realname3"); 
		}
	}
	private initCardIcons()
	{
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}
		if (Api.switchVoApi.checkTWShenhe()) {
			return;
		}
		if (PlatformManager.checkIsShenHeYiWan()) {
			return;
		}
		if (PlatformManager.checkIs37WdShenheSp()) {
			return;
		}

		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if(!isBuyMonthCard){
			//删除月卡小icon
			// this.createMainUIIcon("monthcard");
			// this.sortIcons();
			// this.setIconsPos();
			this._leftIconMap.monthCard.haveIcon = true;
			this._leftIconMap.monthCard.aid = "monthCard";
			this._leftIconMap.monthCard.code = "";	
		} 
		if(isBuyMonthCard && !isBuyYearCard )
		{
			//删除年卡小icon
			// this.createMainUIIcon("yearcard");
			// this.sortIcons();
			// this.setIconsPos();
			this._leftIconMap.yearCard.haveIcon = true;
			this._leftIconMap.yearCard.aid = "yearCard";
			this._leftIconMap.yearCard.code = "";
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
						let timeBg = BaseBitmap.create("public_icontimebg");
						
						container.addChildAt(timeBg,0);

						timeTF = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_GREEN2)
						timeTF.setPosition(container.x + container.width / 2 - timeTF.width / 2,container.y + 80 - timeTF.height / 2);
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
		if(Api.switchVoApi.checkSignUp()){
			this.checkNewSignIcons();
			this.checkNewSignRedDot();
		} else {
			this.checkSignIcons();
			this.cheackSignRedDot();
		}

	}
	//新版签到
	private checkNewSignIcons():void
	{ 	
		// initSignUpIcon
		let totalSignDay = Api.otherInfoVoApi.getArrivalNewInfo().count;
		if(totalSignDay>=8)
		{
			return
		}
		if(totalSignDay<=7)
		{
			let flag2 = Api.otherInfoVoApi.checkFlagByIndex(2);
			let flag3 = Api.otherInfoVoApi.checkFlagByIndex(3);
			let flag7 = Api.otherInfoVoApi.checkFlagByIndex(7);
			if(totalSignDay<=2&&flag2!=1)
			{
				this.createMainUIIcon("sign2");
				this._signName="sign2";
				return 
			}
			else if(totalSignDay<=3&&flag3!=1)
			{
				this.removeMainUIIcon("sign2");
				this.createMainUIIcon("sign3");
				this._signName="sign3";
				this.setIconsPos();
				return 
			}
			else if(totalSignDay<=7&&flag7!=1)
			{
				this.removeMainUIIcon("sign3");
				this.createMainUIIcon("sign7");
				this._signName="sign7";
				this.setIconsPos();
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
	
	private checkSignIcons():void
	{ 	
		// initSignUpIcon
		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		if(totalSignDay>=8)
		{
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
				this.removeMainUIIcon("sign2");
				this.createMainUIIcon("sign3");
				this._signName="sign3";
				this.setIconsPos();
				return 
			}
			else if(totalSignDay<=7&&flag7!=1)
			{
				this.removeMainUIIcon("sign3");
				this.createMainUIIcon("sign7");
				this._signName="sign7";
				this.setIconsPos();
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
	private checkNewSignRedDot():void
	{
		let signIcon = this.getTopBtnByName(this._signName);
		if(signIcon)
		{
			var boo =Api.otherInfoVoApi.isSignShowRedDot;
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
			// this.removeMainUIIcon("monthcard");
			this._leftIconMap.monthCard.haveIcon = false;
		}
		if(isBuyYearCard)
		{
			// this.removeMainUIIcon("yearcard");
			this._leftIconMap.yearCard.haveIcon = false;
		} 
	}
	private checkShareGroupIcon():void
	{
		//群组分享
		if(PlatformManager.isSupportShare() && Api.switchVoApi.checkOpenWxShareToGroup()) 
		{
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SHAREGROUP_CHECK,this.checkShareGroupIconRed,this);
			
			this.checkShareGroupIconRed();
		}
		else
		{
			this.removeMainUIIcon("sharegroup");
		}
	}
	private checkShareGroupIconRed():void
	{
		
		let icon:BaseDisplayObjectContainer = this.createMainUIIcon("sharegroup");
		let info = Api.otherInfoVoApi.getOtherInfo().info;
		let canReward = false;
		if(PlatformManager.isFromWxCard && PlatformManager.fromWxCardExt &&  info.therealshare.et - GameData.serverTime <= 0){
			canReward = true;
			let data = PlatformManager.fromWxCardExt.split("_");
			let ext = data[0];
			let uid = data[1];
			for(let key in info.therealshare.sharetime){
				if(String(info.therealshare.sharetime[key]) == ext ){
					canReward = false;
					break;
				}
			}
			if(uid != String(Api.playerVoApi.getPlayerID())){
				canReward = false;
			}
		}

		if(canReward){
			App.CommonUtil.addIconToBDOC(icon);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(icon);
		}
		if(info.therealshare.sharenum >=  Config.GameprojectCfg.rewardShareGroupNum){
			this.removeMainUIIcon("sharegroup");
		}

	}
	private checkWanBaIcon():void
	{

		// if(PlatformManager.checkIsJPSp())
		// {
			this.checkQuestionnaireIcon();
		// }
		//腾讯视频跳转
		if(PlatformManager.app=="QQLive")
		{
			this.createMainUIIcon("txgame");
		}
		if(Api.otherInfoVoApi.checkShowWanbaDesktopIcon() && RSDKHelper.qqwbCanIShow("favoritesToDesktop"))
		{
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("desktop");
			App.CommonUtil.addIconToBDOC(icon);
		}
		else
		{
			this.removeMainUIIcon("desktop");
		}
		this.checkShareGroupIcon();
		if(Api.switchVoApi.checkOpenWxShareToGroupOld() && Api.otherInfoVoApi.checkShowWanbaShareIcon()&&!PlatformManager.checkIsWxAppSp()) 
		{
			let icon:BaseDisplayObjectContainer = this.createMainUIIcon("share");

			// App.CommonUtil.addRedDotToBDOC(icon);
			if(PlatformManager.checkIsFkylcSp())
			{
				
				if(Api.otherInfoVoApi.getFkIsshowRed()){
					App.CommonUtil.addIconToBDOC(icon);
				}
				else{
					App.CommonUtil.removeIconFromBDOC(icon);
				}
				
			}
		}
		else
		{
			this.removeMainUIIcon("share");
		}
		
		this.initAndCheckAttentionIcon(); 
		this.checkRealnameIcon2();

	}
	/** 初始化twitter分享 */
	private initTwitterShareIcon():void
	{
		let isShow = false
		/**
		 * 是日本平台  &&  开了开关  &&  今天没分享  && （iOS版本号大于等于17   ||    安卓版本号大于等于8）才展示
		*/
		if (PlatformManager.checkIsJPSp() && Api.switchVoApi.checkOpenTwitterDailyShare() && Api.otherInfoVoApi.getTwdailyshare() != 1)
		{
			if(App.CommonUtil.compareVersion("17.0", PlatformManager.getAppVersion()) <= 0 && App.DeviceUtil.isIOS())
			{
				isShow = true;
			}else if(App.CommonUtil.compareVersion("8", PlatformManager.getAppVersion()) <= 0 && App.DeviceUtil.isAndroid())
			{
				isShow = true;
			}
		}
		
		if (isShow) {
			this.createMainUIIcon("twitterdailyshare");
		} else {
			this.removeMainUIIcon("twitterdailyshare");
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
		if (Api.switchVoApi.checkOpenInvite() && PlatformManager.isSupportShare()) {
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
	private initCoverIcon():void
	{
		if (PlatformManager.checkIsWanbaSp() && Api.switchVoApi.checkOpenCover() && Api.otherInfoVoApi.getCoverState() !== 2) {
			this.createMainUIIcon("cover");
		} else {
			this.removeMainUIIcon("cover");
		}
	}

	// 绑定有礼图标
	private initBindIcon():void
	{
		if (Api.switchVoApi.checkOpenFbBind() 
			&& Api.otherInfoVoApi.getFBBindFlag() != 1
			&& PlatformManager.checkIsTWBSp() 
			&& PlatformManager.checkIsWeiduan() 
			&&  (
				(App.CommonUtil.compareVersion("3.0", PlatformManager.getAppVersion()) !== -1 && App.DeviceUtil.isIOS()) 
				||
				(App.CommonUtil.compareVersion("1.6", PlatformManager.getAppVersion()) !== -1 && App.DeviceUtil.isAndroid())
				)
			) {
			this.createMainUIIcon("bind");
		} else {
			this.removeMainUIIcon("bind");
		}
	}
	private initFuliIcons():void
	{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkWelfareState,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.checkWelfareState,this);	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.checkSignState,this); 
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.initTwitterShareIcon,this); 

		// if(Api.switchVoApi.checkClosePay())
		// {
		// 	return;
		// }
		if(PlatformManager.checkIs37WdShenheSp())
		{
			return;
		}
		this.createMainUIIcon("welfare");
		this.checkFirstRechargeIcon();
		this.checkWelfareState();
		this.checkVipState();
		this.initSignIcons();
		// this.checkThanksg(); 
		if(Api.switchVoApi.checkOpenStrengthen())
		{
			this.createMainUIIcon("strengthen"); 
		}
	
		this.checkStrengthenState();
		if(PlatformManager.checkIsJPSp()&&Api.switchVoApi.checkOpenTwitter())
		{
			this.createMainUIIcon("twitter");
		}

		if(PlatformManager.checkIsJPSp()&&Api.switchVoApi.checkOpenLobi())
		{
			this.createMainUIIcon("lobi");
		}
	}
	private checkThanksg():void
	{	
		if(Api.switchVoApi.checkClosePay())
		{
			return;
		}

		this.createMainUIIcon("thanksgiving");
		let thanksIcon = this.getTopBtnByName("thanksgiving");
		let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge();
		if(thanksIcon)
		{
			if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true)
			{
				this.createMainUIIcon("thanksgiving");
			}
			else
			{
				this.removeMainUIIcon("thanksgiving");
			}
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
	//创建好友图标
	private createFriendIcon():BaseDisplayObjectContainer
	{
		let modelName = "friend";
		let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(modelName.toLowerCase()+"_icon",modelName.toLowerCase()+"_icon_name",false);
		iconContainer.name="friends_func";
		iconContainer.addTouchTap(()=>{
			ViewController.getInstance().openView(ViewConst.COMMON.FRIENDSVIEW);
		},this);
		return iconContainer;
	}
	private createMainUIIcon(modelName:string):BaseDisplayObjectContainer
	{
		if(PlatformManager.checkHideIconByIP())
		{
			if(modelName!="wxaddicon"&&modelName!="share"&&modelName!="sharegroup"&&modelName!="contact"&&modelName!="strengthen"&&modelName != "welfare"&&modelName != "realname3")
			{
				return;
			}
			
		}
		if(!this._iconNameList[modelName])
		{
			let isShow = false;
			if(modelName == "welfare" || modelName == "rechargeVip" || modelName == "firstrecharge"|| modelName == "contact"
				|| modelName == "monthcard"|| modelName == "yearcard"||modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="rebate"||modelName=="realname"
				|| modelName == "timelimitwife"
			){
				isShow = true;
			}
			else
			{
				isShow=Config.IconorderCfg.getisFlickByName(modelName);
			}
			let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(modelName.toLowerCase()+"_icon",modelName.toLowerCase()+"_icon_name",isShow);
			iconContainer.name=modelName+"_func";
			this._iconNameList[modelName]=iconContainer;
			iconContainer.addTouchTap(()=>{

					//引导过程种不响应
				if(Api.rookieVoApi.isGuiding){
					return;
				}

				if(modelName == "usercenter")
				{
					RSDKHelper.callUserCenter();
					return;
				}

				if(modelName == "wxcircle")
				{
					RSDKHelper.showCircle();
					return;
				}

				if(modelName == "txqrdialog")
				{
					RSDKHelper.showTxQRDialog();
					return;
				}

				if(modelName == "webpay")
				{
					// if(App.DeviceUtil.IsHtml5())
					// {
						// window.open("http://pay.htctvn.com/");
						//越南第三方支付
						if(App.DeviceUtil.isIOS())
						{
							// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:NetRequestConst.KID_VITHIRDPAY});
							window.open("http://pay.htctvn.com/");
						}
						else{
							// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:NetRequestConst.KID_VITHIRDPAY});
							PlatformManager.openViWebpay();
						}
						
					// }
					return;
				}
				if(modelName == "facebook")
				{
					if(App.DeviceUtil.IsHtml5())
					{
						window.open("https://www.facebook.com/htctvn");
					}
					return;
				}

				if(modelName == "questionnaire37")
				{
					if(App.DeviceUtil.IsHtml5())
					{
						window.open("https://www.wjx.cn/jq/44341130.aspx");
					}
					return;
				}
				if(modelName == "questionnairejph5")
				{
					if(App.DeviceUtil.IsHtml5())
					{
						window.open("https://jpevents.37games.com/survey/index.html?aid=jmwj4&gameId=2&roleId="+Api.playerVoApi.getPlayerID()+"&roleName="+Api.playerVoApi.getPlayerName()+"&serverId="+ServerCfg.selectServer.zid);
					}
					return;
				}

				if(modelName == "contact")
				{
					//微信 显示联系客服
					PlatformManager.getContackService();
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
				// if(Api.switchVoApi.checkWeChatFirstcharge())
					// {
						viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
					// }
					// else
					// {	
					// 	// viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
					// 	viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					// } 
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
				else if(modelName=="sign2"||modelName=="sign3"||modelName=="sign7")
				{
					if(Api.switchVoApi.checkSignUp()){
						viewName=ViewConst.POPUP.SIGNUPVIEW;
					} else {
						viewName=ViewConst.COMMON.WELFAREVIEWSIGNIN;
					}
					
				}
				else if(modelName=="rebate")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE;
				}
				else if(modelName == "timelimitwife")
				{
					viewName=ViewConst.POPUP.TIMELIMITWIFEVIEW;
				}
				else if(modelName == 'playerReturn'){
					viewName == ViewConst.COMMON.PLAYERRETURNVIEW;
				}
				else if(modelName == "limitedgift")
				{
					viewName=ViewConst.POPUP.LIMITEDGIFTVIEW;
				}
				else if(modelName == "strengthen")
				{
					viewName=ViewConst.POPUP.STRENGTHENPOPUPVIEW;
				}
				else if(modelName == "signup")
				{
					viewName = ViewConst.POPUP.SIGNUPVIEW;
				}
				else if(modelName == "questionnaire")
				{
					viewName = ViewConst.POPUP.QUESTIONNAIREPOPUPVIEW;
				}
				// else if(modelName == "newquestionnaire")
				// {
				// 	viewName = ViewConst.POPUP.NEWQUESTIONNAIREPOPUPVIEW;
				// }
				else if(modelName=="twitter")
				{	
					if(App.DeviceUtil.IsHtml5())
					{
						window.open("https://twitter.com/37games_beauty");
					} 
				}

				else if(modelName=="lobi")
				{	
					if(App.DeviceUtil.IsHtml5())
					{
						window.open("https://web.lobi.co/game/higawari");
					} 
				}
				else if(modelName == "qqvipgift")
				{
					viewName=ViewConst.POPUP.QQVIPGIFTPOPUPVIEW;
					
				}

				ViewController.getInstance().openView(viewName);
				// window.open("https://www.baidu.com");
			},this);
			let checkIn = UnfoldBtn.checkInUnfold(iconContainer);

			
			if(!checkIn){
				this._activityIconList.push(iconContainer);
				this._iconContainer.addChild(iconContainer);
				this.sortIcons();
			}


			// if(Api.switchVoApi.checkClosePay())
			// {
			// 	iconContainer.visible=false;
			// }
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
				this.setIconsPos();
				break;
			}
		}
		if(this._iconNameList[modelName])
		{
			delete this._iconNameList[modelName];
		}
	}

	private setIconsPos():void
	{
		if (Api.switchVoApi.checkTWShenhe() == true) {
			for (let k in this._activityIconList) {
				let v:BaseDisplayObjectContainer = this._activityIconList[k];
				if (v.name == "welfare_func") {
					v.setPosition(30+v.width/2,v.height/2);
				}
				else {
					v.visible = false;
				}
			}
			return;
		}
 		let l=this._activityIconList.length;

		let leftL = this._leftIconList.length;
		let haveLeftIcon = false;
		if(leftL > 0){
			haveLeftIcon = true
		}

		let iconIdx = 0;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=this._activityIconList[i];
			if (this._pickUpTab.indexOf(icon)>-1)
			{
				if ( this._extandButton && this._isInExtanding == false)
				{
					icon.visible = (this._extandButton._status == 1);
				}
			}
			else
			{
				icon.visible =true;
			}
			let iconwidth:number = 70;
			let iconheight:number = 69;
			// icon.setPosition(30+(iconwidth+30)*(i%6)+iconwidth/2,Math.floor(i/6)*(iconheight+10)+iconheight/2);

			if(haveLeftIcon){
				icon.x = 30 + 80 + 20 + (icon.width+20) * (iconIdx % 5) +icon.width/2; //30+(icon.width+20)*(i%6)+icon.width/2;
				icon.y = Math.floor(iconIdx/5)*(icon.height+10)+icon.height/2;//Math.floor(i/6)*(icon.height+10)+icon.height/2;

			} else {
				icon.x = 30+(icon.width+20)*(iconIdx%6)+icon.width/2;
				icon.y = Math.floor(iconIdx/6)*(icon.height+10)+icon.height/2;

			}
			if(icon.name.indexOf("beTheKing") == 0){
				icon.y = GameConfig.stageHeigth - 500;
				icon.x = GameConfig.stageWidth - icon.width+20;
				// this._bottomContiner.addChild(icon);
			}else{
				iconIdx++ ;
			}
			

			// icon.setPosition(30+(icon.width+20)*(i%6)+icon.width/2,Math.floor(i/6)*(icon.height+10)+icon.height/2);
			// icon.x = 30 + 80 + 20 + (icon.width+20) * (i % 5) +icon.width/2; //30+(icon.width+20)*(i%6)+icon.width/2;
			// icon.y = Math.floor(i/5)*(icon.height+10)+icon.height/2;//Math.floor(i/6)*(icon.height+10)+icon.height/2;
		}

		if (this._extandButton)
		{
			this._extandButton.setVisible(this._pickUpTab.length>0);
		}

	}

	protected doRefreshTaskInfo()
	{
		if(Api.mainTaskVoApi.getCurMainTaskId() == null)
		{
			this._taskContainer.visible = true;
			// this._settingAndMailContainer.y = 70;
			let taskid = Api.dailytaskVoApi.getTaskIdForMainTaskUI();
			if(!taskid){
				this._taskContainer.visible = false;
				return;
			}
			this._taskContainer.visible = true;
			if(PlatformManager.checkIs37WdShenheSp())
			{
				this._taskContainer.visible = false;
			}
			this._taskTxt.text =  LanguageManager.getlocal("dailyTaskName"+ taskid);
			let curStatus:number = Api.dailytaskVoApi.getTaskStatusByTaskId(taskid)
			if( curStatus == 2)
			{
				this._taskContainer.visible = false;
				this._settingAndMailContainer.y = 70;
				return;
			}else if( curStatus == 1)
			{
				this._taskTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
				this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
				this._missionIcon.x = 22;
			}else
			{
				this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
				this._missionIcon.x = 28
				this._taskTxt.textColor = TextFieldConst.COLOR_WHITE;
			}
			if(this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")){
				if(!this._taskAllCon.getChildByName("taskeffect")){
					let upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
					upgradeClip.x = -6;
					upgradeClip.y = -223;
					upgradeClip.name = "taskeffect";
					// let index = this._missionIcon.
					this._taskAllCon.addChild(upgradeClip);
					upgradeClip.playWithTime(0);

					// if(Number(Api.mainTaskVoApi.getCurMainTaskId())<=Api.mainTaskVoApi.needGuideTask){
					// 	let clickHand = BaseBitmap.create("mianui_arrow1");
					// 	clickHand.rotation = 90;
					// 	clickHand.x = 440;
					// 	clickHand.y = -220;
					// 	clickHand.name = "taskeffect2";
					// 	this._bottomContiner.addChild(clickHand);

					// 	egret.Tween.get(clickHand,{loop:true})
					// 		.to({x:490,scaleX:1.0,scaleY:1.0}, 500)
					// 		.to({x:440 ,scaleX:1.0,scaleY:1.0}, 500)
					// }
					
				}
			}else{
				if(this._taskAllCon.getChildByName("taskeffect")){
					this._taskAllCon.removeChild(this._taskAllCon.getChildByName("taskeffect"));
					// this._bottomContiner.removeChild(this._bottomContiner.getChildByName("taskeffect2"));
				}
				if(this._bottomContiner.getChildByName("taskeffect2")){
					this._bottomContiner.removeChild(this._bottomContiner.getChildByName("taskeffect2"));
				}
			}
			return;
		}
		this._taskTxt.text =  Api.mainTaskVoApi.getCurTaskNameAndDescTxt2()[1];
		if(this._taskAllCon.getChildByName("taskBg")){
			this._taskAllCon.getChildByName("taskBg").width = Math.max(366,this._taskTxt.width+100);
		}
		if (Api.mainTaskVoApi.isCurTaskReach())
		{
			this._taskTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
			this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon2");
			// this._missionIcon.x = 22;
		}
		else{
			this._missionIcon.texture = ResourceManager.getRes("mainui_missionIcon1");
			// this._missionIcon.x = 28
			// egret.Tween.removeTweens(this._missionIcon);
			this._taskTxt.textColor = TextFieldConst.COLOR_WHITE;
		}

		if(this._missionIcon.texture == ResourceManager.getRes("mainui_missionIcon2")){
			if(!this._taskAllCon.getChildByName("taskeffect")){
				let upgradeClip = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
				upgradeClip.x = -6;
				upgradeClip.y = -223;
				upgradeClip.name = "taskeffect";
				this._taskAllCon.addChild(upgradeClip);
				upgradeClip.playWithTime(0);

				// if(Number(Api.mainTaskVoApi.getCurMainTaskId())<=Api.mainTaskVoApi.needGuideTask){
				// 		let clickHand = BaseBitmap.create("mianui_arrow1");
				// 		clickHand.rotation = 90;
				// 		clickHand.x = 440;
				// 		clickHand.y = -220;
				// 		clickHand.name = "taskeffect2";
				// 		this._bottomContiner.addChild(clickHand);

				// 		egret.Tween.get(clickHand,{loop:true})
				// 			.to({x:490,scaleX:1.0,scaleY:1.0}, 500)
				// 			.to({x:440 ,scaleX:1.0,scaleY:1.0}, 500)
				// 	}
				}
		}else{
			if(this._taskAllCon.getChildByName("taskeffect")){
				this._taskAllCon.removeChild(this._taskAllCon.getChildByName("taskeffect"));
				
			}
			if(this._bottomContiner.getChildByName("taskeffect2")){
				this._bottomContiner.removeChild(this._bottomContiner.getChildByName("taskeffect2"));
			}
		}
		

	

	}

	private dorefresgChatRed()
	{
		if(!this._chatRed){
			return ;
		}
		this._chatRed.visible = Api.chatVoApi.isNewMsg() ||  Api.chatVoApi.isShowRedForAllianeChat() ;
	}
	
	protected doRefreshChat( event?: egret.Event)
	{
		//处理微信切换后台回来聊天报错

		 egret.setTimeout(()=>{
                        
			if(!this._chatTxt)
			{
				return;
			}
			this.dorefresgChatRed();
			this._chatTxt.text = Api.chatVoApi.getLastMessage();
			let chatTxt = ComponentManager.getTextField(Api.chatVoApi.getLastMessage(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			if(chatTxt.width >= 480){
				this._chatTxtPoint.visible = true;
			}
			else{
				this._chatTxtPoint.visible = false;
			}



                    },this,1);
		// setTimeout(function(){

			
		// }, 0)
		
	}

	protected doQuickAlliance(event?: egret.Event)
	{
		NetManager.chatServerLogout(null,null);
		Api.chatVoApi.refreshLastMessage();
		this.doRefreshChat(event);
	}
	private bottomBtnCfg = [
		{
			id:1,
			btnName:"servant",
			btnIconImg:"mainui_bottomCpsimg1",
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
			btnName:"achievement",
			btnIconImg:"mainui_bottomimg4",
			isOPen:true,
		},
		{
			id:5,
			btnName:"shop",
			btnIconImg:"mainui_bottomimg5",
			isOPen:true,
		},
	];

	private bottomComposeBtnCfg = [
		{
			id:1,
			btnName:"servant",
			btnIconImg:"mainui_bottomCpsimg1",
			isOPen:true,
			fold:0,
		},
		{
			id:2,
			btnName:"levy",
			btnIconImg:"mainui_bottomCpsimg2",
			isOPen:true,
			fold:1,
		},
		{
			id:3,
			btnName:"recruit",
			btnIconImg:"mainui_bottomCpsimg3",
			isOPen:true,
			fold:1,
		},
		{
			id:4,
			btnName:"challenge",
			btnIconImg:"mainui_bottomCpsimg4",
			isOPen:true,
			fold:1,
		},
		{
			id:5,
			btnName:"city",
			btnIconImg:"mainui_bottomCpsimg5",
			isOPen:true,
			fold:0,
		},
		{
			id:7,
			btnName:"item",
			btnIconImg:"mainui_bottomimg2",
			isOPen:true,
			fold:2,
		},
		{
			id:8,
			btnName:"dailytask",
			btnIconImg:"mainui_bottomimg3",
			isOPen:true,
			fold:2,
		},
		{
			id:9,
			btnName:"achievement",
			btnIconImg:"mainui_bottomimg4",
			isOPen:true,
			fold:2,
		},
		{
			id:10,
			btnName:"shop",
			btnIconImg:"mainui_bottomimg5",
			isOPen:true,
			fold:2,
		},
		
	];
	private initButtom():void
	{
		this._bottomContiner=new BaseDisplayObjectContainer();
		// this._bottomContiner.alpha = 0;
		//填内容
		this._bottomContiner.setPosition(0,GameConfig.stageHeigth-this._bottomContiner.height);
		this.addChild(this._bottomContiner);
		
		//底部的按钮
		this._bottomBtnContiner = new BaseDisplayObjectContainer();
		this._bottomContiner.addChild(this._bottomBtnContiner);
		this._bottomComposeBtnContiner = new BaseDisplayObjectContainer();

		this._bottomContiner.addChild(this._bottomComposeBtnContiner);

		this._chatContiner = new BaseDisplayObjectContainer();
		this._bottomContiner.addChild(this._chatContiner);

		let bottomBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg2"));
		bottomBg.x=0;
		bottomBg.y=-bottomBg.height;
		this._bottomBtnContiner.addChild(bottomBg);



		let bottomBg2:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_bottombg2"));
		bottomBg2.x=0;
		bottomBg2.y=-bottomBg2.height;
		this._bottomComposeBtnContiner.addChild(bottomBg2);

		this._bottomComposeScrollContiner = new BaseDisplayObjectContainer();
		this._bottomComposeBtnContiner.addChild(this._bottomComposeScrollContiner);
		let scrollBg:BaseBitmap = BaseBitmap.create(ResourceManager.getRes("mainui_scrollbg"));
		scrollBg.x=100;
		scrollBg.y=-42;
		this._bottomComposeScrollContiner.addChild(scrollBg);

		// let goOutBtn =  ComponentManager.getButton("mainui_btn3",null,this.goOutBtnClickHandler,this,null,1) //BaseBitmap.create(ResourceManager.getRes("mainui_btn3"));
		let goOutBtn =  BaseBitmap.create(ResourceManager.getRes("mainui_btn3"));
		goOutBtn.addTouchTap(this.goOutBtnClickHandler,this);
		goOutBtn.anchorOffsetY = goOutBtn.height/2;
		goOutBtn.anchorOffsetX = goOutBtn.width/2;
		goOutBtn.x = GameConfig.stageWidth -  goOutBtn.width  + 40 - 27	;
		goOutBtn.y =  bottomBg.y + bottomBg.height/2+2 + 17;
		this._bottomBtnContiner.addChild(goOutBtn);
		this._goOutBtn = goOutBtn;
		egret.Tween.get(goOutBtn, {
            loop: true,//设置循环播放
        }).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360


		let PerWidth = 100;
		let curIdx = 0;
		for (let i = 0; i < this.bottomBtnCfg.length; i++)
		{
			let btncfg = this.bottomBtnCfg[i];
			if (btncfg.isOPen) 
			{
				let imgBtn = ComponentManager.getButton(btncfg.btnIconImg,"",this.bottomBtnClickHandler,this,[btncfg]);
				imgBtn.x = 12 +PerWidth*curIdx ;
				imgBtn.y = -imgBtn.height-3;
				imgBtn.name = btncfg.btnName;
				this._bottomBtnContiner.addChild(imgBtn);
				curIdx +=1 ;
			}
		}
		let PerWidth2 = 12;
		let curIdx2 = 0;
		for (let i = 0; i < this.bottomComposeBtnCfg.length; i++)
		{
			let btncfg = this.bottomComposeBtnCfg[i];
			if (btncfg.isOPen) 
			{
				let imgBtn = ComponentManager.getButton(btncfg.btnIconImg,"",this.bottomBtnClickHandler,this,[btncfg]);
				
				imgBtn.name = btncfg.btnName;
				
				if(btncfg.btnName=="city")
				{
					imgBtn.x = 0;
					imgBtn.y = 0;
					let container = new BaseDisplayObjectContainer()
					container.addChild(imgBtn)
					container.anchorOffsetY = container.height/2;
					container.anchorOffsetX = container.width/2;
					container.x = PerWidth2 + container.width/2	;
					container.y = -imgBtn.height-3 + container.height/2;
					container.name = "city";
					this._bottomComposeBtnContiner.addChild(container);
					egret.Tween.get(container, {
						loop: true,//设置循环播放
					}).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360

				}else{
					if(i>4)
					{
						imgBtn.x = 12+((i-4)*100);
					}
					else{
						imgBtn.x = PerWidth2 ;
					}
					
					imgBtn.y = -imgBtn.height-3;
					if(btncfg.fold)
					{
						this._bottomComposeScrollContiner.addChild(imgBtn);
						if(btncfg.fold==2)
						{
							this._needFoldBtnNameList[btncfg.btnName]=btncfg.fold;
							imgBtn.y = -imgBtn.height-3 +116;
						}
					}
					else{
						this._bottomComposeBtnContiner.addChild(imgBtn);
					}
					
				}
				if(i==2)
				{
					PerWidth2 = PerWidth2 + 143;
				}else{
					PerWidth2 = PerWidth2 + 120;
				}

				if(btncfg.btnName=="recruit")
				{
					imgBtn.setTouchCallback((e:egret.TouchEvent)=>{
						if(e)
						{
							switch(e.type)
							{
								case egret.TouchEvent.TOUCH_BEGIN:
									this.startBuyPerson();
									break;
								case egret.TouchEvent.TOUCH_END:
								case egret.TouchEvent.TOUCH_CANCEL:
									this.stopBuyPeron();
									break;
							}
						}
					},this);
					let renBm=BaseLoadBitmap.create(Api.composemapVoApi.getcurBuyRes());
					renBm.setScale(94/renBm.width);
					renBm.setPosition((imgBtn.width-renBm.width*renBm.scaleX)*0.5,-30);
					renBm.name="renres";
					imgBtn.addChild(renBm);
					let buyTimeProgress=ComponentManager.getProgressBar("mainui_cmpspro","mainui_cmpsprobg");
					this._buyTimeProgress=buyTimeProgress;
					buyTimeProgress.setPosition(imgBtn.x+(imgBtn.width-buyTimeProgress.width)*0.5,imgBtn.y+imgBtn.height-buyTimeProgress.height-30-6);
					this._bottomComposeScrollContiner.addChild(buyTimeProgress);
					buyTimeProgress.name="buyTimeProgress";
					TickManager.addFastTick(this.fastRefreshBuyTimePro,this);
					// this.fastRefreshBuyTimePro();
					let goldBg=BaseBitmap.create("mainui_cmpspromask");
					goldBg.name="composegoldbg";
					goldBg.setPosition(imgBtn.x+(imgBtn.width-goldBg.width)*0.5,imgBtn.y+imgBtn.height-goldBg.height-30-6);
					this._bottomComposeScrollContiner.addChild(goldBg);
					// let goldres=Config.RewardCfg.getIconByTypeAndId(ItemEnums.gold);
					// let size=100;
					// let scale=0.25;
					// let rect = egret.Rectangle.create();
					// rect.setTo(0,0,size,size);
					// let gold=BaseLoadBitmap.create(goldres,rect);
					// gold.name="composegold";
					// gold.setScale(scale);
					// gold.setPosition(goldBg.x+8,goldBg.y+(goldBg.height-size*scale)*0.5);
					// this._bottomComposeScrollContiner.addChild(gold);
					// let goldnum = App.StringUtil.changeIntToText(Number(Api.composemapVoApi.getComposeCost()));
					let buyNumStr=Api.composemapVoApi.getBuyNum()+"/"+Api.composemapVoApi.getMaxBuyNum();
					let buyTimeTxt=ComponentManager.getTextField(buyNumStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
					buyTimeTxt.width=goldBg.width;
					buyTimeTxt.textAlign=egret.HorizontalAlign.CENTER;
					this._buyTimeTxt=buyTimeTxt;
					// buyTimeTxt.width=goldBg.width-size*scale-8;
					// buyTimeTxt.textAlign=egret.HorizontalAlign.CENTER;
					buyTimeTxt.name="composebuycost";
					// buyTimeTxt.border=true; 
					// buyTimeTxt.setPosition(gold.x+size*scale-3,goldBg.y+(goldBg.height-buyTimeTxt.height)*0.5+1);

					// gold.setPosition(goldBg.x+(goldBg.width-gold.width*scale-buyTimeTxt.width)*0.5,goldBg.y+(goldBg.height-gold.height*scale)*0.5);
					buyTimeTxt.setPosition(goldBg.x+(goldBg.width-buyTimeTxt.width)*0.5,goldBg.y+(goldBg.height-buyTimeTxt.height)*0.5+1);

					this._bottomComposeScrollContiner.addChild(buyTimeTxt);
					App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_COMPOSEMAP,this.refreshComposeGold,this);
				}
				curIdx2 +=1 ;
			}
		}
		// this.checkAchPoint(); 

		
		//聊天按钮相关
		let chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
		chatbg.width = GameConfig.stageWidth;
		chatbg.height = 35;
		chatbg.x=0;
		chatbg.y= -108-chatbg.height-5;
		this._chatContiner.addChild(chatbg);
		chatbg.touchEnabled = true;
		chatbg.addTouchTap(this.chatBgClickHandler,this);

		let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
		chatIcon.anchorOffsetX = chatIcon.width/2;
		chatIcon.anchorOffsetY = chatIcon.height/2;
		chatIcon.x =  chatIcon.width/2+10;
		chatIcon.y = chatbg.y + chatbg.height/2;
		this._chatContiner.addChild(chatIcon);
		egret.Tween.get(chatIcon, {
            loop: true,//设置循环播放
        }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
		
		this._chatRed = BaseBitmap.create("public_dot2");
		this._chatRed.setScale(0.85);
		this._chatRed.x = chatIcon.x + chatIcon.width-30;
		this._chatRed.y =chatIcon.y-20;
		this._chatContiner.addChild(this._chatRed);
		this._chatRed.visible = false;
		
		let showStr:string=Api.chatVoApi.getLastMessage();
		if(!showStr)
		{
			showStr="1";
		}
		this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._chatTxt.x = chatIcon.x + 20;
		this._chatTxt.y = chatIcon.y - this._chatTxt.height/2;
		this._chatTxt.width = 480;
		this._chatTxt.height = 50;
		this._chatTxt.lineSpacing = 50;
		this._chatContiner.addChild(this._chatTxt);
		

		this._chatTxtPoint = ComponentManager.getTextField("...",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._chatTxtPoint.x = 522;
		this._chatTxtPoint.y = chatIcon.y - this._chatTxtPoint.height/2 - 5;
		this._chatTxtPoint.visible = false;
		// this._chatTxtPoint.width = 450;
		// this._chatTxtPoint.height = 20;
		this._chatContiner.addChild(this._chatTxtPoint);
		this.doRefreshChat();
		
		
		this._taskContainer = new BaseDisplayObjectContainer();
		this._taskContainer.x = 0;
		this._taskContainer.y = 0;
		this._bottomContiner.addChild(this._taskContainer);
		this._taskAllCon =  new BaseDisplayObjectContainer();
		this._taskContainer.addChild(this._taskAllCon);

		this._composeNumContainer=new BaseDisplayObjectContainer();
		let numBg=BaseBitmap.create("mainui_composenumbg");
		numBg.x=5;
		numBg.y=-220-numBg.height;
		this._composeNumContainer.addChild(numBg);
		let rentou=BaseBitmap.create("mainui_composerentou"); 
		rentou.setPosition(numBg.x+5,numBg.y+(numBg.height-rentou.height)*0.5);
		this._composeNumContainer.addChild(rentou);
		let numTxt=ComponentManager.getTextField(Api.composemapVoApi.getOwnRenNum()+"/"+Api.composemapVoApi.getUnlockCellNum(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._renNumTxt=numTxt;
		// numTxt.textAlign=egret.HorizontalAlign.CENTER;
		numTxt.width=numBg.width-rentou.x-rentou.width-10;
		numTxt.setPosition(rentou.x+rentou.width+10,rentou.y+(rentou.height-numTxt.height)*0.5+2);
		this._composeNumContainer.addChild(numTxt);
		this._composeNumContainer.x=this._composeNumContainer.y=0;
		this._bottomContiner.addChild(this._composeNumContainer);

		
		if(PlatformManager.checkIs37WdShenheSp())
		{
			this._taskContainer.visible = false;
			this._taskContainer.alpha = 0;
		}

		// if(!Api.switchVoApi.checkClosePay())
		// {
			//功能预览
			let functionPreviewBg = BaseBitmap.create("mainui_funicon");
			functionPreviewBg.name = "functionPreviewBg";
			functionPreviewBg.x = 5;
			functionPreviewBg.y = chatbg.y- chatbg.height -20;
			this._taskContainer.addChild(functionPreviewBg);
			this._functionPreviewBg =functionPreviewBg;
			functionPreviewBg.addTouchTap(this.functionClickHandler,this);

			// let functionIcon= BaseBitmap.create("mianui_funcbg"); 
			// functionIcon.x = 5;
			// functionIcon.y = functionPreviewBg.y;//-265
			// this._taskContainer.addChild(functionIcon);
			// this._functionIcon =functionIcon;
		
			this.refreshText();
		// }
			if(!PlatformManager.checkIs37WdShenheSp())
			{
				
			}else{
				functionPreviewBg.visible = false;
				// functionIcon.visible = false;
			}


		//task 
		let taskBg = BaseBitmap.create("mainui_taskbg170");
		taskBg.name = "taskBg"
		taskBg.x = 0;
		taskBg.y = functionPreviewBg.y;
		this._taskAllCon.addChild(taskBg);
		taskBg.addTouchTap(this.missionBtnClickHandler,this);

		let missionIcon = BaseBitmap.create("mainui_missionIcon1")
		missionIcon.anchorOffsetX = missionIcon.width/2;
		missionIcon.anchorOffsetY = missionIcon.height/2;
		missionIcon.x = taskBg.x + missionIcon.width/2;
		missionIcon.y = taskBg.y + taskBg.height/2;
		this._taskAllCon.addChild(missionIcon);
		this._missionIcon = missionIcon;
		egret.Tween.get(this._missionIcon, {
			loop: true,//设置循环播放
		}).to({scaleX:0.8,scaleY:0.8},700).to({scaleX:1,scaleY:1.0},700);//设置2000毫秒内 rotation 属性变为360

		this._taskTxt =  ComponentManager.getTextField( "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._taskTxt.x = missionIcon.x + 45;
		if(PlatformManager.checkIsTextHorizontal()){
			this._taskTxt.x = missionIcon.x + 25;
		}
		this._taskTxt.y = missionIcon.y - 10 ;
		this._taskAllCon.addChild(this._taskTxt);

		//邮件设置
		this._settingAndMailContainer = new BaseDisplayObjectContainer();
		// this._settingAndMailContainer.x = 0;
		// this._settingAndMailContainer.y = 0;
		// this._bottomContiner.addChild(this._settingAndMailContainer);
		
		this._settingAndMailContainer.x = this._bottomContiner.x;
		this._settingAndMailContainer.y = this._bottomContiner.y;
		this.addChild(this._settingAndMailContainer);
		let settingButton = ComponentManager.getButton("mainui_bottomimg8","",this.settingBtnClickHandler,this);
		settingButton.x = functionPreviewBg.x + 10;
		settingButton.y = taskBg.y - 25 - settingButton.height;
		this._settingAndMailContainer.addChild(settingButton);
		// settingButton.visible=false;
		let mailButton = ComponentManager.getButton("mainui_bottomimg12","",this.mailBtnClickHandler,this);
		mailButton.x = settingButton.x;
		mailButton.y = settingButton.y - settingButton.height - 20;
		this._settingAndMailContainer.addChild(mailButton);
		this._mailButton = mailButton;

		this._friendsBtn = this.createFriendIcon();
		this._friendsBtn.x = GameConfig.stageWidth - this._friendsBtn.width-17 + this._friendsBtn.width /2;
		
		this._friendsBtn.y = chatbg.y - this._friendsBtn.height + this._friendsBtn.height /2 - 90;
		this._friendsBtn.visible = false;
		this._friendsBtn["name"] = "friends_func";
		if(this._friendsBtn && Api.friendVoApi.checkNpcMessage())
		{
			this._friendsBtn.visible = this._isAtCompose;
			if(Api.friendVoApi.getGetFriendVo()&& Api.friendVoApi.isShowRedForEnter() ){
				App.CommonUtil.addIconToBDOC(this._friendsBtn);

			}else{
				App.CommonUtil.removeIconFromBDOC(this._friendsBtn);
			}
		}

		if(Api.friendVoApi.checkNpcMessage() ){
			this._friendsBtn.visible = true;
			let isIn = UnfoldBtn.checkInUnfold(this._friendsBtn);
			if(!isIn){
				this._bottomContiner.addChild(this._friendsBtn);
			}

		}
		if(Api.switchVoApi.checkOpenUnfold()){
			//伸缩按钮
			this._unfoldBtn = new UnfoldBtn();
			this._unfoldBtn.x = GameConfig.stageWidth - this._unfoldBtn.width-20;
			this._unfoldBtn.y = chatbg.y - this._unfoldBtn.height;
			this._bottomContiner.addChild(this._unfoldBtn);
			this._unfoldBtn.visible=this._isAtCompose;

		} 

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL,this.checkMailState,this);

		this.doRefreshTaskInfo();
		this.refreshTaskContainerStatus();

		if(PlatformManager.isShowPreLoading())
		{
			this.createMoreGameBtn();
		}

		Api.chatVoApi.clearPriChatList();
		NetManager.request(NetRequestConst.REQUEST_PRICHAT_GETMSG, {
			isall : 1
		});

		this.refreshMainUi();
		this.checkAllRedPoint();
	}

	private refrestRenNumTxt():void
	{
		if(this._renNumTxt)
		{
			this._renNumTxt.setString(Api.composemapVoApi.getOwnRenNum()+"/"+Api.composemapVoApi.getUnlockCellNum());
		}
	}

	private _lastRefreshTime:number=-1;
	private fastRefreshBuyTimePro(t:number)
	{
		if(this._lastRefreshTime>0&&t-this._lastRefreshTime<100)
		{
			return;
		}
		let buyTimeProgress=this._buyTimeProgress;
		let goldTxt=this._buyTimeTxt;
		if(buyTimeProgress)
		{
			let buyNum=Api.composemapVoApi.getBuyNum();
			let maxNum=Api.composemapVoApi.getMaxBuyNum();
			let buyNumStr="";
			let isFull=buyNum>=maxNum;
			if(buyNum>0)
			{
				buyNumStr=(isFull?App.StringUtil.formatStringColor(buyNum+"",TextFieldConst.COLOR_WARN_GREEN2):buyNum)+"/"+maxNum;
			}
			else
			{
				let leftT=Math.ceil(Api.composemapVoApi.getNextRecoverMaxT()-Api.composemapVoApi.getNextRecoverPassT()/1000);
				buyNumStr=App.DateUtil.getFormatBySecond(leftT);
			}
			goldTxt.setString(buyNumStr);
			if(isFull)
			{
				if(!this._buyFullEffect)
				{
					this._buyFullEffect=ComponentManager.getCustomMovieClip("cmpsbuyeffect",10,70);
					this._buyFullEffect.setScale(1.53);
					let btn=<BaseButton>this._bottomComposeScrollContiner.getChildByName("recruit");
					btn.width=btn.width;
					btn.height=btn.height;
					this._buyFullEffect.setPosition((btn.width-133*this._buyFullEffect.scaleX)*0.5,(btn.height-132*this._buyFullEffect.scaleY)*0.5-17);
					// this._buyFullEffect.setPosition(btn.x+(btn.width-133*this._buyFullEffect.scaleX)*0.5,btn.y+(btn.height-132*this._buyFullEffect.scaleY)*0.5-15);
					btn.addChildAt(this._buyFullEffect,0);	
					this._buyFullEffect.playWithTime();
				}
			}
			else
			{
				if(this._buyFullEffect)
				{
					this._buyFullEffect.dispose();
					this._buyFullEffect=null;
				}
			}
			let percentage=isFull?1:Api.composemapVoApi.getNextRecoverPassT()/(Api.composemapVoApi.getNextRecoverMaxT()*1000);
			buyTimeProgress.setPercentage(percentage);
		}
		this._lastClickTime=t;
	}
	private stopFastRefreshBuyTimePro()
	{
		TickManager.removeFastTick(this.fastRefreshBuyTimePro,this);
	}

	private scrollBtn(e:egret.Event)
	{
		let down=e.data;
		if(down ==2)
		{
			if(this._isAtCompose)
			{
				this._chatContiner.visible = false;
			}
			
			egret.Tween.get(this._bottomComposeScrollContiner,{loop:false}).to({y:-116},300,egret.Ease.sineOut);
			egret.Tween.get(this._taskContainer,{loop:false}).to({y:-80},300,egret.Ease.sineOut);
			egret.Tween.get(this._composeNumContainer,{loop:false}).to({y:-80},300,egret.Ease.sineOut);
		}else{
			this._chatContiner.visible = true;
			egret.Tween.get(this._bottomComposeScrollContiner,{loop:false}).to({y:0},300,egret.Ease.sineOut);
			egret.Tween.get(this._taskContainer,{loop:false}).to({y:0},300,egret.Ease.sineOut);
			egret.Tween.get(this._composeNumContainer,{loop:false}).to({y:0},300,egret.Ease.sineOut);
		}
		
	}

	private refreshComposeGold(e:egret.Event):void
	{
		if(this._bottomComposeBtnContiner)
		{
			let goldBg = <BaseBitmap>this._bottomComposeScrollContiner.getChildByName("composegoldbg");
			let buyTimeTxt = this._buyTimeTxt;
			let buyTimeProgress=this._buyTimeProgress;
			if(buyTimeTxt)
			{
				let buyNum=Api.composemapVoApi.getBuyNum();
				let maxNum=Api.composemapVoApi.getMaxBuyNum();
				let buyNumStr=buyNum+"/"+maxNum;
				buyTimeTxt.setString(buyNumStr);
				buyTimeProgress.setPercentage(buyNum/maxNum);
			}
			let btn=<BaseButton>this._bottomComposeScrollContiner.getChildByName("recruit");
			if(btn)
			{
				let ren = <BaseLoadBitmap>btn.getChildByName("renres");
				if(ren)
				{
					ren.setload(Api.composemapVoApi.getcurBuyRes());
				}
			}
			if(buyTimeTxt)
			{
				buyTimeTxt.setPosition(goldBg.x+(goldBg.width-buyTimeTxt.width)*0.5,goldBg.y+(goldBg.height-buyTimeTxt.height)*0.5+1);
			}
		}
	}

	public getUnlockIndex():number
	{
		return this._unlockIndex;
	}
	public setUnlockIndex(index)
	{
		NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETKV,{k:"unlockIndex",v:index});
		this._unlockIndex=index;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_UNLOCK);
	}
	public refreshMainUi()
	{
		this._iconContainer.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity")&&this._isAtCompose;
		this._leftIconContainer.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity")&&this._isAtCompose;
		this._topbg.visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiTop");
		this._bottomContiner.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiBottom");
		this._chatContiner.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
		if(this._unfoldBtn)
		{
			this._unfoldBtn.visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiCity")?this._isAtCompose:false;
		}
		if(this._isAtCompose&&this._bottomComposeScrollContiner.y!=0)
		{
			this._chatContiner.visible = false;
		}
		this._taskContainer.visible =  MainUIUnLockCfg.getIsUnLockByKey("mianuiTask");
		// this._functionIcon.visible =  MainUIUnLockCfg.getIsUnLockByKey("mianuiTask");
		
		// this._functionIcon.visible =  !MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
		// this._functionPreviewBg.visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");
		this._functionPreviewBg&&(this._functionPreviewBg.visible = false);
		this._taskAllCon.x = (this._functionPreviewBg&&this._functionPreviewBg.visible)?65:5;
		// this._functionTxt.visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");;
		this._bottomComposeScrollContiner.getChildByName("recruit").visible = MainUIUnLockCfg.getIsUnLockByKey("mianuiRecruit");
		this._bottomComposeScrollContiner.getChildByName("challenge").visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiChallenge");
		this._bottomComposeScrollContiner.getChildByName("levy").visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiLevy");
		this._bottomComposeBtnContiner.getChildByName("city").visible =  MainUIUnLockCfg.getIsUnLockByKey("mainuiCity");;
		this._bottomComposeBtnContiner.getChildByName("servant").visible = MainUIUnLockCfg.getIsUnLockByKey("mainuiServant");
		

		if(this._isAtCompose)
		{
			this._bottomBtnContiner.visible = false;
			this._bottomComposeBtnContiner.visible = true;
		}else{
			this._bottomBtnContiner.visible = true;
			this._bottomComposeBtnContiner.visible = false;
		}
	}

	private friendsBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.COMMON.FRIENDSVIEW);
	}


	private createMoreGameBtn()
	{
	
		this._wxMoreGameIcon = BaseLoadBitmap.create("wxmoregameicon");	
		this._wxMoreGameIcon.x = GameConfig.stageWidth - 70;
		this._wxMoreGameIcon.y = 300;
		this.addChild(this._wxMoreGameIcon);
		this._wxMoreGameIcon.touchEnabled = true;
		this._wxMoreGameIcon.addTouchTap(this.showMoreGame,this);
		// this._wxMoreGameIcon.visible = false;
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

	private refreshText():void
	{

		if(this._functionPreviewBg)
		{
			if(Api.otherInfoVoApi.getFunctionName()==null)
			{
				// if(this._taskContainer.contains(this._functionPreviewBg))
				// {
				// 	this._taskContainer.removeChild(this._functionPreviewBg);
				// }
				this._functionPreviewBg.dispose();
				// this._taskContainer.removeChild(this._functionIcon);
				if(this._functionAni){
					if(this._taskContainer.contains(this._functionAni))
					{
						this._taskContainer.removeChild(this._functionAni);
					}
					this._functionAni = null;
				}
			}
			else
			{
				// this._functionTxt.text  =  Api.otherInfoVoApi.getFunctionName();
				if(Api.otherInfoVoApi.getFunctionRedhot())
				{
					// this._functionTxt.textColor =TextFieldConst.COLOR_WARN_GREEN2;
				}
				else
				{
					// this._functionTxt.textColor =TextFieldConst.COLOR_WHITE;	
				}

				if(Api.otherInfoVoApi.getFunctionRedhot()){
					if(!this._functionAni){
						// this._functionAni = ComponentManager.getCustomMovieClip("taskeffect_",8,100);
						// this._functionAni.x = 5;
						// this._functionAni.y = -303;
						// this._functionAni.name = "taskeffect";
						// this._bottomContiner.addChild(this._functionAni);
						// this._functionAni.playWithTime(0);
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
				if((firstRechargeflag == 1 && Api.servantVoApi.getServantObj("1033") == null) || signinShowRedDot == true||functionPreViewRedDot==true)
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
		if (this._isAtCompose)
		{
			this._iconContainer.visible=true;
			this._leftIconContainer.visible = true;
			this._settingAndMailContainer.visible = false
			if (Api.switchVoApi.checkTWShenhe() == true) {
				// this._iconContainer.visible = false;
				for (let k in this._activityIconList) {
					let v:BaseDisplayObjectContainer = this._activityIconList[k];
					if (v.name == "welfare_func") {
						v.setPosition(30+v.width/2,v.height/2);
					}
					else {
						v.visible = false;
					}
				}
			}
			if(Api.mainTaskVoApi.getCurMainTaskId() != null || Api.dailytaskVoApi.getTaskIdForMainTaskUI() != null)
			{
				this._taskContainer.visible = true;
			}else{
				this._taskContainer.visible = false;
			}
		}else
		{

			this._iconContainer.visible=false;
			this._leftIconContainer.visible = false;
			this._settingAndMailContainer.visible = true
			// this._taskContainer.visible = false;
		}
		if(PlatformManager.checkIs37WdShenheSp())
		{
			this._iconContainer.visible=false;
			this._leftIconContainer.visible = false;
			this._settingAndMailContainer.visible = false;
		}
	}
	protected roleHeadClickHandler():void
	{
		PlayerBottomUI.getInstance().show();
		// ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
	}
	private functionClickHandler():void
	{
		if(Api.rookieVoApi.isInGuiding||Api.rookieVoApi.isGuiding)
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
	protected settingBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SettingPopopView, {});
	}
	protected missionBtnClickHandler():void
	{
		/**
		 * 跳转每日任务
		 */
		if(Api.mainTaskVoApi.getCurMainTaskId() == null)
		{
			ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
			return;
		}
		// ViewController.getInstance().openView(ViewConst.POPUP.MainTASKPOPUPVIEW);
		Api.mainTaskVoApi.goHandler();
	}
	protected chatBgClickHandler():void
	{	
		if(PlatformManager.checkIs37WdShenheSp())
		{
			return;
		}
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}
		// App.LogUtil.log("chatBgClickHandler >>>>> ");
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip("很抱歉，聊天系统维护中");
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEW);
		// this._chatRed.visible = false;
	}
	protected addGoldBtnClickHandler():void
	{

	}

	private doDinnerGuide()
	{
		if(this._isAtCompose){
			this.goOutBtnClickHandler();
		}
	}
	private goComose()
	{
		if(GameData.isComposeScene){
			
		}else if(GameData.isHomeScene)
		{
			this.goOutBtnClickHandler();
			this.goOutBtnClickHandler();
		}else
		{	
			this.goOutBtnClickHandler();
		}
	}

	private goComposeAndGuideChallenge() {
		this.goComose();
		this.showHandChallenge();
	}

	public goHome()
	{
		this._bottomBtnContiner.visible = true;
		this._bottomComposeBtnContiner.visible = false;
		SceneController.getInstance().goHome();
		GameData.isHomeScene = true;
		GameData.isComposeScene=false;
		this._isAtCompose=false;
		this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3");
		this.refreshMainUi();
	
	}
	protected goOutBtnClickHandler():void
	{
		if(Api.switchVoApi.checkOpenResNeedLoading()&&Api.rookieVoApi.curGuideKey&&!this._isAtCompose)
		{
			this._goOutBtn.touchEnabled=false;
			egret.setTimeout( ()=>{
				this._goOutBtn.touchEnabled=true;
			},this,800)
		}
		if(this._isGooutAniing){
			return;
		}
		this.showSwitchCityAni(this.goOutBtnClickHandler2,this);
	}
	protected goOutBtnClickHandler2():void
	{
		this.refreshCityRed();
		if(GameData.isHomeScene)
		{
			this.refreshTaskContainerStatus();
			GameData.isHomeScene = false;
			this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3_1");
			SceneController.getInstance().jump();
			return;
		}
		this._isAtCompose = !this._isAtCompose; //修改状态
		GameData.isComposeScene = this._isAtCompose;

		this.refreshMainUi();
		if (this._isAtCompose)
		{
			if(Api.otherInfoVoApi.getOtherInfoVo().kvmap&&Api.otherInfoVoApi.getOtherInfoVo().kvmap["firsts_scrollbtn"])
			{
				if(this._bottomComposeScrollContiner.y!=0)
				{
					this._taskContainer.y = -80;
					this._composeNumContainer.y=this._taskContainer.y;
				}
			}else{
				this.request(NetRequestConst.REQUEST_OTHERINFO_SETKV,{k:"firsts_scrollbtn",v:"1"});
				if(this._unfoldBtn)
				{
					this._unfoldBtn.unfoldBtnHandler();
				}
			}
			
			if(App.DeviceUtil.isWXgame()&&Api.switchVoApi.checkOpenFeedBack())
			{
				PlatformManager.feedbackButtonToggle("hide")
			}
			
			if(!Api.chatVoApi.getIsReadCross()){
				Api.chatVoApi.setIsReadCross(true);
			}
			this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3");
			// if(this._functionPreviewBg&&!PlatformManager.checkIs37WdShenheSp())
			// {
			// 	this._functionPreviewBg.visible=true;
			// 	// this._functionTxt.visible=true;
			// 	this._functionIcon.visible=true;
			// 	if(this._functionAni)
			// 	{
			// 		this._functionAni.visible = true;
			// 	}
			// }

			if(this._wxMoreGameIcon)
			{
				this._wxMoreGameIcon.visible = true;
			}
			if (this._tuyouBackToLobby)
			{
				this._tuyouBackToLobby.visible = false;
			}
			if(this._friendsBtn && Api.friendVoApi.checkNpcMessage() ){
				this._friendsBtn.visible = true;
			}
			if(this._unfoldBtn && Api.switchVoApi.checkOpenUnfold()){
				// this._unfoldBtn.refreshUI();
				this._unfoldBtn.visible = this._isAtCompose;
			}
		

			
		}else{
			if(this._bottomComposeScrollContiner.y!=0)
			{
				this._taskContainer.y = 0;
				this._composeNumContainer.y=0;
			}
			if(App.DeviceUtil.isWXgame()&&Api.switchVoApi.checkOpenFeedBack())
			{
				PlatformManager.feedbackButtonToggle("show")
			}
			// if(this._functionPreviewBg)
			// {
			// 	this._functionPreviewBg.visible=false;
			// 	// this._functionTxt.visible=false;
			// 	this._functionIcon.visible=false;
			// 	if(this._functionAni)
			// 	{
			// 		this._functionAni.visible = false;
			// 	}
			// }
			if(this._wxMoreGameIcon)
			{
				this._wxMoreGameIcon.visible = false;
			}

			if (this._tuyouBackToLobby)
			{
				this._tuyouBackToLobby.visible = true;
			}
			if(this._friendsBtn){
				this._friendsBtn.visible = false;
			}
			if(this._unfoldBtn){
				this._unfoldBtn.visible = false;
			}
			
			this._goOutBtn.texture = ResourceManager.getRes("mainui_btn3_1");
			this.extendPackup();

		}
		
		this.refreshTaskContainerStatus();
		SceneController.getInstance().jump();

		Api.rookieVoApi.checkNextStep();

		if(Api.gameinfoVoApi.getSexdefault()&&Api.switchVoApi.checkOpenBlueWifeOutHomeStory())
		{
			this.openHomeStory()
		}
	}
	private refreshCityRed()
	{
		let cityBtn:BaseButton = <BaseButton>this._bottomComposeBtnContiner.getChildByName("city");
		if(cityBtn)
		{
			if(GameData.checkCityRed())
			{
				App.CommonUtil.addIconToBDOC(cityBtn,null,null,-7,7);
			}
			else
			{
					App.CommonUtil.removeIconFromBDOC(cityBtn);
			}
		}
	}
	private openHomeStory()
	{
		if(Api.rookieVoApi.curGuideKey!=null||this._isAtCompose||Api.searchVoApi.isShowNpc()||!Api.switchVoApi.checkIsInBlueWife())
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
			// let wifevo = )
			if(Api.wifeVoApi.getWifeInfoVoById(storys[num+""].wifeid))
			{
				return;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW,{callback: null, target:this, storyId:storys[num+""].id});
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
				Api.rookieVoApi.checkNextStep();
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
				// ViewController.getInstance().openView(ViewConst.POPUP.SETPASSWORDPOPUPVIEW);
				// ViewController.getInstance().openView(ViewConst.COMMON.SKINVIEW);
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
			case "achievement":
				// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
				ViewController.getInstance().openView(ViewConst.COMMON.ACHIEVEMENTVIEW);
				// ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW);
				// ViewController.getInstance().openView(ViewConst.POPUP.CANDYGETPOPUPVIEW);
			
				//成就功能有了。用其他按钮吧 ~
				break;
			case "shop": 
				// LayerManager.hideLayer()
				// let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"ac_recharge_Btntxt2",this.test ,this);
				// GameConfig.stage.addChild(btn)
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
				// Api.rookieVoApi.isInGuiding = true;
				// ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:null,o:this});
				break;
			case "welfare":
				App.LogUtil.log("welfareCkick >>>> " );
				break;
			case "challenge":
				Api.rookieVoApi.checkNextStep();
				if(!Api.challengeVoApi.getChannelIslock())
				{
					App.CommonUtil.showTip(Api.challengeVoApi.getChannelLockStr())
					return;
				}
				ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
				break;
			case "manage":
				ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
				break;
			case "levy":
				Api.rookieVoApi.checkNextStep();
				ViewController.getInstance().openView(ViewConst.COMMON.LEVYVIEW);
				break;
			case "recruit":
				if(Api.composemapVoApi.checkCanFastBuyPerson()==false)
				{
					this.hideHand();
					Api.rookieVoApi.checkNextStep();
					Api.composemapVoApi.buyPerson();
				}
						
				// Api.rookieVoApi.curGuideKey = "levy";
				// Api.rookieVoApi.insertWaitingGuide({"idx":"levy_1"});
				// Api.rookieVoApi.checkWaitingGuide();
				break;
			case "city":
				this.goOutBtnClickHandler();
				break;
			default:
				break;
		}
	}

	private _buyPersonTimeCount:number=-1;
	private startBuyPerson():void
	{
		if(Api.composemapVoApi.checkCanFastBuyPerson()==false)
		{
			return;
		}
		if(this._buyPersonTimeCount==-1)
		{
			let result = Api.composemapVoApi.buyPerson();
			if(result)
			{
				this._buyPersonTimeCount=egret.setInterval(()=>{
					let result = Api.composemapVoApi.buyPerson();
					if(!result)
					{
						this.stopBuyPeron();
					}
				},this,125);
			}
			else
			{
				this.hideHand();
				Api.rookieVoApi.checkNextStep();
			}
		}
	}
	private stopBuyPeron():void
	{
		if(this._buyPersonTimeCount!=-1)
		{
			egret.clearInterval(this._buyPersonTimeCount);
			this._buyPersonTimeCount=-1;
			this.hideHand();
			Api.rookieVoApi.checkNextStep();
		}
	}

	private test()
	{
		//LayerManager.showLayer()
	}
	
	protected getResourceList():string[]
	{
		return [
			"guide_hand"
				];
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
		//从下面伸缩栏里面找icon
		let unfoldBtn=UnfoldBtn.getUnfoldBtnByName(name);
		if(unfoldBtn != null){
			return unfoldBtn;
		}
		return null;
	}

	private checkRealnameRewards():void
	{	
		if (Api.switchVoApi.checkOpenRealnamerewards())
		{
			let icon = this.createMainUIIcon("realnamerewards");
			if (icon)
			{
				if (Api.otherInfoVoApi.getRealnameRewards()!=null)
				{
					this.removeMainUIIcon("realnamerewards");
				}
				// else if (Api.otherInfoVoApi.getRealnameRewards()==2)
				// {
				// 	App.CommonUtil.addIconToBDOC(icon);
				// }
			}
		}
	}
	private checkFirstRechargeIcon():void
	{
		if (Api.switchVoApi.checkClosePay()) {
			return;
		}
		if(Api.shopVoApi.getPayFlag()==2 || Api.servantVoApi.getServantObj("1033") != null)
		{
			// this.removeMainUIIcon("firstrecharge");
			this._leftIconMap.firstrecharge.haveIcon = false;
		}
		else
		{
			this._leftIconMap.firstrecharge.haveIcon = true;
			this._leftIconMap.firstrecharge.aid = "firstRecharge";
			this._leftIconMap.firstrecharge.code = "";

		}

		if(Api.switchVoApi.checkOpenSecondCharge() && (Api.shopVoApi.getPayFlag()==2 || Api.servantVoApi.getServantObj("1033") != null )&& Api.shopVoApi.getSecondRateCharge() != 2){
			//显示次充
			this._leftIconMap.secondrecharge.haveIcon = true;
			this._leftIconMap.secondrecharge.aid = "secondRecharge";
			this._leftIconMap.secondrecharge.code = "";
		} else {
			//不显示
			this._leftIconMap.secondrecharge.haveIcon = false;

		}

		if(Api.switchVoApi.checkOpenAllCharge()){
			let charge2 = true;
			if(Api.switchVoApi.checkOpenSecondCharge() && Api.shopVoApi.getSecondRateCharge() != 2){
				charge2 = false;
			}
			if(charge2 && Api.shopVoApi.getThreeRateCharge() != 2 )
			{
				//显示3充
				this._leftIconMap.threerecharge.haveIcon = true;
				this._leftIconMap.threerecharge.aid = "threerecharge";
				this._leftIconMap.threerecharge.code = "";
			}else{
				this._leftIconMap.threerecharge.haveIcon = false;
			}
			if(charge2 && Api.shopVoApi.getFourRateCharge() != 2 )
			{
				//显示4充
				this._leftIconMap.fourrecharge.haveIcon = true;
				this._leftIconMap.fourrecharge.aid = "fourrecharge";
				this._leftIconMap.fourrecharge.code = "";
			}else{
				this._leftIconMap.fourrecharge.haveIcon = false;
			}
		}else{
			//不显示
			this._leftIconMap.threerecharge.haveIcon = false;
			this._leftIconMap.fourrecharge.haveIcon = false;
			
		}

		this.checkJurakudaiIcon();
	}

	private checkJurakudaiIcon() {
		if (this._leftIconMap.firstrecharge.haveIcon) return;
		const __aid = "jurakudai";
		let vos = Api.acVoApi.getActivityVoListByAid(__aid);
		if (vos.length) {
			this._leftIconMap.jurakudai.haveIcon = true;
			this._leftIconMap.jurakudai.aid = __aid;
			this._leftIconMap.jurakudai.code = vos[0].code.toString();
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
			if((firstRechargeflag == 1 && Api.servantVoApi.getServantObj("1033") == null)|| signinShowRedDot == true||functionPreViewRedDot==true)
			{
				App.CommonUtil.addIconToBDOC(welfareIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(welfareIcon);
			}
		}
		this.checkFirstRechargeIcon();
		this.checkCardIcon();
		this.checkRealnameRewards();
		this.initCardIcons();  

		this.checkSignState();
		


		//检测限时红颜  使用的shop model 
 		this.initTimeLimitWifeIcon();
	}
	//我要变强红点
	private checkStrengthenState():void
	{
		let strengthenIcon = this.getTopBtnByName("strengthen");
		if(strengthenIcon)
		{
			if(Api.strengthenVoApi.checkNpcMessage())
			{
				App.CommonUtil.addIconToBDOC(strengthenIcon);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(strengthenIcon);
			}
		}
	} 
	
	private checkSignState():void
	{
		this.initSignIcons(); 
	}
	/**
	 * 检查活动icon红点
	 */
	private checkActivityIconState():void
	{
		let l=this._activityIconList.length;
		let isExtendShowRedDot:boolean = false;

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
				let aidArr:string[]=Config.IconorderCfg.getAidListByCfgName(aid);
				if(aidArr&&aidArr.length>0)
				{
					let needCheckId:string[]=aidArr;
					for(let ii:number=0;ii<needCheckId.length;ii++)
					{
						if(!isShowRedDot)
						{
							isShowRedDot = Api.acVoApi.checkShowRedDotByAid(needCheckId[ii],null);
						}
					}
				}
				else
				{
					isShowRedDot = Api.acVoApi.checkShowRedDotByAid(aid,code);
				}

				if(isShowRedDot == true)
				{
					App.CommonUtil.addIconToBDOC(icon);
					if (this._pickUpTab.indexOf(icon)>-1)
					{
						isExtendShowRedDot = true;
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


	}


	/**
	 * 检测邮件红点
	 */
	private checkMailState():void
	{
		if(Api.mailVoApi.getUnreadNum() > 0)
		{
			App.CommonUtil.addIconToBDOC(this._mailButton);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._mailButton);
		}
	}
	
	public dispose():void
	{
		if(App.DeviceUtil.isWXgame()&&Api.switchVoApi.checkOpenFeedBack())
		{
			PlatformManager.feedbackButtonToggle("hide");
		}
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_LEFTBUBBLE,this.checkLeftBubble,this);
	 	App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.doRefreshTaskInfo,this);
		
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACHIEVEMENT,this.checkAchPoint,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK),this.doRefreshTaskInfo,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC,this.doRefreshTaskInfo,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.doRefreshChat,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE,this.doQuickAlliance,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,this.initIconsAndCheckStatus,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL,this.checkMailState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL,this.checkWelfareState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkActivityIconState,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.checkRedPointByModel,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.checkWanBaIcon,this);

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE,this.doDinnerGuide,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK,this.goComposeAndGuideChallenge,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreshText,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,this.checkWelfareState,this);	
	    App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT,this.checkIsRefresh,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.checkIsRefresh,this);
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initCoverIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initBindIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initWxchatgiftIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initWxaddmyproIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initWxaddoffacctIcon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initRealname3Icon,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.initLoginWeekIcon,this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.initWanbaviptequanIcon,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD),this.initWanbaviptequanIcon,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REALNAME,this.createRealnameRedHot,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.checkSignState,this); 
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.initTwitterShareIcon,this); 
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.freshPrichatRed,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.freshPrichat,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_GETMSG),this.freshChatMsg,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS,this.checkRealnameRewards,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE),this.checkNewQuestionnaireIcon,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG),this.checkZeroGiftRed,this);
		
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SHAREGROUP_CHECK,this.checkShareGroupIconRed,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_UNLOCK,this.refreshMainUi,this)
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK,this.hideHand,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_COMPOSEMAP,this.refreshComposeGold,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE,this.goComose,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND,this.showTaskHand,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINUI_CHALLENGE,this.showHandChallenge,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSGAE_MAINUI_BTNSCROLL,this.scrollBtn,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_REN_NUM,this.refrestRenNumTxt,this);
		
		TickManager.removeTick(this.tick,this);
		//添加需要释放的内容
		this._topContiner = null;
		this._bottomContiner = null;
		this._bottomBtnContiner = null;
		this._settingAndMailContainer= null;
		this._bottomComposeBtnContiner =null;
		this._bottomComposeScrollContiner=null;

		this._goOutBtn= null;
		this._mailButton= null;
		this._settingButton= null;
		this._taskContainer= null;
		
		this._isAtCompose= false;
		GameData.isComposeScene = true;

		this._chatTxt= null;
		this._taskTxt= null;
		this._lampRoll = null;
		this._mailRedDotSp = null;
		// this._achRedDotSp = null;
		this._activityIconList.length=0;
		this._iconNameList={};
		this._functionPreviewBg  =null;
		this._signName =null;
		// this._functionIcon =null;
		this._functionAni = null;
		this._lastL=0;

		this._isShowWebPay = false;
		//重置icon数据
		//左侧icon区域
		this._leftIconContainer = null;
		//左侧icon list
		this._leftIconList = [];
		this._leftIconMsgList = [];
		this._leftIconMsgListBak = [];
		this._clickHand = null;
		this._leftIconMap =
		{
			timelimitwife : {
				haveIcon: false,
				aid: null,
				code: null,
			},
			timelimitwifefb : {
				haveIcon: false,
				aid: null,
				code: null,
			},
			firstrecharge : {
				haveIcon: false,
				aid: null,
				code: null,
			}, 
			jurakudai: {
				haveIcon: false,
				aid: null,
				code: null
			},
			secondrecharge : {
				haveIcon: false,
				aid: null,
				code: null,
			}, 
			crossServer : {
				haveIcon: false,
				code:null,
				aid : null,
				type: null
			},
			wipeBoss : {
				haveIcon: false,
				aid : null,
				code : null
			},
			rankActive : {
				haveIcon:false,
				aid:null,
				rankActiveList:[]			
			},
			monthCard: {
				haveIcon: false,
				code: null,
				aid: null
			},
			yearCard: {
				haveIcon: false,
				code: null,
				aid: null
			},
			oneYearOverview: {
				haveIcon: false,
				code: null,
				aid: null
			},
			singleDayOverview: {
				haveIcon: false,
				code: null,
				aid: null
			},
			threerecharge : {
				haveIcon: false,
				aid:null,
				code:null
			},
			fourrecharge : {
				haveIcon: false,
				aid:null,
				code:null
			},
			conquerMainLand: {
				haveIcon: false,
				code: null,
				aid: null
			},
		};

		this._unlockIndex = 0;
		this._wxMoreGameIcon = null;
		this._friendsBtn = null;
		this._unfoldBtn = null;
		this._extandButton = null;
		this._pickUpTab.length = 0;
		this._isInExtanding = false;
		this._redPoint = null;
		this._chatRed = null;
		this._topbg = null;
		this._chatContiner = null;
		this._aniBlackMask = null;
		this._isGooutAniing = false;
		this._lastClickTime = 0;
		this._taskHand = null;
		this._touchFlag = false;
		this._buyTimeProgress=null;
		this._buyFullEffect=null;
		this._needFoldBtnNameList={};
		this._composeNumContainer=null;
		this._renNumTxt=null;
		this.stopBuyPeron();
		this.stopFastRefreshBuyTimePro();

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