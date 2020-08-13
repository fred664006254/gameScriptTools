/**
 * 新手引导剧情视图
 * author shaoliang
 * date 2017/10/16
 * @class RookieView
 */

class RookieView extends CommonView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _curIdx:string = "";
	
	private _titleText:BaseTextField;
	private _titleBg:BaseBitmap;
	private _continueText:BaseTextField;
	private _descText:BaseTextField;
	private _showManTab:BaseDisplayObjectContainer;

	private _blackBg:BaseBitmap;
	private _curConfig:any = null;
	private _curBgId:number = 0;
	private _myBg:BaseBitmap;
	private _tipBB:BaseBitmap; 
	// private _grayBB:BaseBitmap; 


	private _descContent:string;
	private _isCodon:boolean = false;
	private _codonLength:number = 0;

	private _skipBtn:BaseButton;
	// private _skipBtn2:BaseButton;
	// private _skipBtnBg:BaseBitmap;

	private _guideBg:GuideBackground;
	private _guideTipContainer:BaseDisplayObjectContainer;
	private _circle1:BaseBitmap; 
	private _circle2:BaseBitmap; 
	// private _circle1Container:BaseDisplayObjectContainer;
	// private _circle2Container:BaseDisplayObjectContainer;
	private _circleContainer:BaseDisplayObjectContainer;

	private _clickRect:BaseBitmap; 
	private _clickHand:BaseBitmap; 
	private _cliclText:BaseTextField;
	private _cliclTextBg:BaseBitmap;
	private _iconList:string[]=[];
	private _isPlayMySound:boolean = false;

	private _branchContainer:BaseDisplayObjectContainer;

	private _fogBg:BaseBitmap = null; 
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{	
		// test code
		// Api.rookieVoApi.isInGuiding = true;

		this._curIdx = this.param.data.idx;
		this._callbackF=this.param.data.f;
		this._obj=this.param.data.o;
		
		let guidePic:string[] = [];
		this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
		let startId:number = Number(this._curIdx);
		let tempTab:any = {};
		
		
		let tempIdx:string = this._curIdx;
		do {
			let tempCfg:any = RookieCfg.getRookieCfg(tempIdx);
			if (tempCfg.personPic &&  tempCfg.personPic!=1 &&  tempCfg.personPic!=999) {
				// 加载人物图片
				// if(this._iconList.indexOf(tempCfg.personPic)<0)
				// {
				// 	this._iconList.push(tempCfg.personPic);
				// }
			}
			if (tempCfg.bgId ) {
				if (tempCfg.bgId !="5" && tempCfg.bgId !="6") {
					if (!tempTab["story_bg"+tempCfg.bgId]) {
						tempTab["story_bg"+tempCfg.bgId] = 1;
					}
				}
				else if (tempCfg.bgId == "6") {
					if (!tempTab["homescene"]) {
						tempTab["homescene"] = 1;
					}
				}
				else {
					if (!tempTab["cityscene"]) {
						tempTab["cityscene"] = 1;
					}
				}
			}
			tempIdx = tempCfg.nextId;
		}
		while (tempIdx)

		

		guidePic = Object.keys(tempTab);
		// if(Api.switchVoApi.checkOpenBuleWife()&&Api.gameinfoVoApi.getSexnum()==1&&(tempIdx=="13"||tempIdx=="14"))
		if(Api.switchVoApi.checkOpenBuleWife())
		{
			return guidePic.concat(["skip_btn1",
			"guide_circle",
			"guide_hand",
			"guide_rect",
			// "guideGrayBg",
			"prisonview_1",
			"story_fog",
			"searchstoryview_bottom",
			"guide_manbtn",
			"guide_womanbtn",
			"guide_manname",
			"guide_womanname",
			"story_bg7_male"
			]);
		}
	

		return guidePic.concat(["skip_btn1",
		"guide_circle",
		"guide_hand",
		"guide_rect",
		// "guideGrayBg",
		"prisonview_1",
		"story_fog",
		"searchstoryview_bottom",
		"guide_manbtn",
		"guide_womanbtn",
		"guide_manname",
		"guide_womanname",
		"guide_descbg"
		]);
	}

	protected getTitleBgName():string
	{
		return null;
	}
	protected isShowOpenAni():boolean
	{
		return false;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getBgName():string
	{
		return null;
	}

	protected isShowMask():boolean
	{
		return false;
	}

	protected preInit():void
	{
		if(this._iconList.length>0)
		{
			ResourceManager.loadItem(this._iconList.shift(),this.preInit,this);
		}
		else
		{
			super.preInit();
		}
	}


	protected init():void
	{	
		super.init();

		Api.rookieVoApi.isGuiding = true;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP,this.noticeNextStep,this);

		// if(Api.rookieVoApi.isInGuiding&&Api.rookieVoApi.isGuiding)
		{
			// ViewController.getInstance().hideAllView()
		}
		if(ViewController.getInstance().getView(ViewConst.POPUP.SERVERLISTPOPUPVIEW))
		{
			ViewController.getInstance().hideView(ViewConst.POPUP.SERVERLISTPOPUPVIEW);
		}


		this._blackBg = BaseBitmap.create("public_9_black");
		this._blackBg.height = GameConfig.stageHeigth;
		this._blackBg.width = GameConfig.stageWidth
		this.addChild(this._blackBg);
		this._blackBg.visible =false;

		this.container = new BaseDisplayObjectContainer();
		this.addChild(this.container);

		this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;

	

		this._myBg = BaseBitmap.create();
		// this._myBg.height = GameConfig.stageHeigth;
		this._myBg.width = GameConfig.stageWidth;
		this.addChildToContainer(this._myBg);

		this._guideBg = new GuideBackground();
		this._guideBg.init(this.clickPage,this);
		this.addChildToContainer(this._guideBg);

		this._guideTipContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._guideTipContainer);
		
		this._tipBB = BaseBitmap.create("searchstoryview_bottom");
		// this._tipBB.height = 170;
		// this._tipBB.width = 640;
		this._tipBB.setPosition(GameConfig.stageWidth/2 - this._tipBB.width/2, GameConfig.stageHeigth - this._tipBB.height - 0);
		this._guideTipContainer.addChild(this._tipBB);
		

		// this._skipBtnBg = BaseBitmap.create("public_9_wordbg");
		// this._skipBtnBg.skewX = 180;
		// this._skipBtnBg.height = 66;
		// this._skipBtnBg.setPosition(GameConfig.stageWidth/2 - this._skipBtnBg.width/2, 66);
		// this.addChildToContainer(this._skipBtnBg);

		// this._grayBB = BaseBitmap.create("guideGrayBg");
		// this._grayBB.setPosition(0, 0);
		// // this._grayBB.height = GameConfig.stageHeigth - this._tipBB.height - this._grayBB.y;
		// this._grayBB.height = GameConfig.stageHeigth -  this._grayBB.y;
		// this._grayBB.width = GameConfig.stageWidth;
		// this.addChildToContainer(this._grayBB);


		this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"),20);
		this._continueText.setPosition(this._tipBB.x+ this._tipBB.width -this._continueText.width - 50 , this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
		this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
		this._guideTipContainer.addChild(this._continueText);
		this.textAnim(this._continueText);

		this._titleBg = BaseBitmap.create("prisonview_1");
		this._titleBg.setPosition(25,this._tipBB.y-70)
		this._guideTipContainer.addChild(this._titleBg);
		this._titleBg.visible = false;

		this._titleText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this._titleText.setPosition(40,this._tipBB.y-47);
		this._guideTipContainer.addChild(this._titleText);

		this._descText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._descText.width = GameConfig.stageWidth - 60;
		this._descText.lineSpacing = 8;
		this._descText.setPosition(30,this._tipBB.y+50);
		this._guideTipContainer.addChild(this._descText);


		// rect
		this._clickRect = BaseBitmap.create("guide_rect");
		this.addChildToContainer(this._clickRect);

		this._circleContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._circleContainer);

		// this._circle1Container = new BaseDisplayObjectContainer();
		// this._circleContainer.addChild(this._circle1Container);

		// this._circle2Container = new BaseDisplayObjectContainer();
		// this._circleContainer.addChild(this._circle2Container);

		this._circle1 = BaseBitmap.create("guide_circle");
		this._circle1.anchorOffsetX = this._circle1.width/2;
		this._circle1.anchorOffsetY = this._circle1.height/2;
		this._circle1.alpha = 0.5;
		this._circle1.scaleX = 1.5;
		this._circle1.scaleY = 1.5;
		
		egret.Tween.get(this._circle1,{loop:true})
			.to({scaleX: 2,scaleY:2,alpha:0}, 1000)
		this._circle2 = BaseBitmap.create("guide_circle");
		this._circle2.anchorOffsetX = this._circle2.width/2;
		this._circle2.anchorOffsetY = this._circle2.height/2;
		this._circle2.alpha = 1;
		this._circle2.scaleX = 0.5;
		this._circle2.scaleY = 0.5;

		// egret.Tween.get(this._circleContainer)
		// 	.wait(500)
		// 	.call(function(){
		// 		egret.Tween.get(this._circle2,{loop:true})
		// 		.to({scaleX: 2,scaleY:2,alpha:1}, 1000)
		// 	},this)
		egret.Tween.get(this._circle2,{loop:true})
				.to({scaleX: 2,scaleY:2,alpha:0}, 1000)
		
		
		this._circleContainer.addChild(this._circle1);
		this._circleContainer.addChild(this._circle2);
		this.addChildToContainer(this._circleContainer);

		this._cliclTextBg = BaseBitmap.create("guide_descbg");
		this.addChildToContainer(this._cliclTextBg);

		this._clickHand = BaseBitmap.create("guide_hand");
		this.addChildToContainer(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)

		this._cliclText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// this._cliclText.width = GameConfig.stageWidth - 200;
		this._cliclText.textColor = TextFieldConst.COLOR_BROWN;
		this.addChildToContainer(this._cliclText);

		// 开始游戏
		let btnName:string; 
		if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId"))) {
			btnName = "skip_btn1";
		}
		else {
			btnName = "skip_btn1";
		}

		this._skipBtn = ComponentManager.getButton(btnName,null,this.skipAnim,this);
		this._skipBtn.setPosition(PlatformManager.hasSpcialCloseBtn()?10: (GameConfig.stageWidth-this._skipBtn.width -10) ,10);
		this.addChildToContainer(this._skipBtn);

		// this._skipBtn2 = ComponentManager.getButton("skip_btn1",null,this.skipAnim,this);
		// this._skipBtn2.setPosition(GameConfig.stageWidth-this._skipBtn.width -10 ,10);
		// // this.addChildToContainer(this._skipBtn2);
		// this._skipBtn2.visible = false;


		//临时 屏蔽 跳过按钮
		if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId"))) {
			this._skipBtn.visible = false;
			// this._skipBtnBg.visible = true;
			// this._grayBB.visible = true;
		}
		else {
			this._skipBtn.visible = false;
			// this._skipBtnBg.visible = false;
			// this._grayBB.visible = false;
		}

		if( this._curConfig &&  this._curConfig.otherId &&  this._curConfig.otherId.indexOf("fanliReview_") > -1 )
		{
			if (this._skipBtn && !this._skipBtn.visible) {
				this._skipBtn.visible = true;
				// this._grayBB.visible = true;
			}
		}
		this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
		this.showPage();
	}

	

	private clickPage():void
	{	

		if (this._curConfig && (this._curConfig.clickRect || this._curConfig.branch ) && !this._curConfig.touchAll) {
			return;
		}
		if(this._curConfig&&this._curConfig.branchMale)
		{
			return;
		}
		if (this._isCodon == true) {
			this._isCodon = false;
			this._descText.text = this._descContent;
		}
		else {
			this.doNextStep();
		}
	}

	private doNextStep(step?:string):void
	{

		let nextId:string = null;
		if (step) {
			nextId = step;
		} else if (this._curConfig && this._curConfig.nextMaleId&&Api.switchVoApi.checkIsInBlueWife()) {
			nextId = this._curConfig.nextMaleId;
		}

		else if (this._curConfig && this._curConfig.nextId) {
			nextId = this._curConfig.nextId;
		}
		if(this._curIdx == '127' && PlatformManager.checkIsJPSp() && this._curConfig.jpSpGuide){
			this._curConfig.nextId = null;
			nextId = null;
			this._curConfig.waitNext = 128;
			ViewController.getInstance().openView("JpSpecialGuideView");
			//let jpspGuide:BaseDisplayObjectContainer = new JpSpecialGuideView();
			//GameConfig.stage.addChild(jpspGuide);
		}
		// nextId = this._curConfig.nextMaleId;
		//新手引导结束
		if (this._curConfig && nextId==null && this._curConfig.waitNext==null) {
			Api.rookieVoApi.isInGuiding = false;
		}
		if (this._curIdx == RookieCfg.getRookieCfg("guideEndId"))
		{
			// if (PlatformManager.getIsWanbaQQLive()) {
			// 	ViewController.getInstance().openView(ViewConst.COMMON.QQVIDEOGUIDEVIEW);				
			// }
			if (Api.switchVoApi.checkOpenRealnamerewards() && Api.otherInfoVoApi.getRealnameRewards() == null&&GameData.idcardType == RealnameConst.USERTYPE_0)
			{	
				ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW,{showAcPop:1});
			}
			// 新官上任引导结束后首次弹出
			if (Api.switchVoApi.checkOpenLoginWeek() && !Api.otherInfoVoApi.getLoginWeekTimeout()) {
				ViewController.getInstance().openView(ViewConst.COMMON.LOGINWEEKVIEW,true);	
			}
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_END);	
		}

		if (this._curConfig && nextId==null) {
			if (this._curConfig.waitNext) {
				Api.rookieVoApi.insertWaitingGuide({"idx":this._curConfig.waitNext});
			}
			this.hide();
		}
		else {
			
			this._curIdx = nextId;
			this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
			this.showPage();
		}

		
		if (Number(this._curIdx)== Number(RookieCfg.getRookieCfg("storyStartId2"))) {
			if (this._skipBtn && !this._skipBtn.visible) {
				// this._skipBtn.visible = true;
				// this._skipBtnBg.visible = true;
				// this._grayBB.visible = true;
			}
		}
		else if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId"))) {
		}
		else {
			if (this._skipBtn && this._skipBtn.visible) {
				this._skipBtn.visible = false;
				// this._skipBtnBg.visible = false;
				// this._grayBB.visible = false;
			}
		}
		if( this._curConfig &&  this._curConfig.otherId && this._curConfig.otherId.indexOf("fanliReview_") > -1 )
		{
			if (this._skipBtn && !this._skipBtn.visible) {
				this._skipBtn.visible = true;
				// this._grayBB.visible = true;
			}
		}
		if(this._curConfig && this._curConfig.otherId == "levy_7"){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LEVY_SCOLL_CANTOUCH);		
		}

	}

	private showPage():void
	{
		if(!this._curConfig)
		{
			return;
		}
		if(this._curConfig.needPush)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,{"guideCfg":this._curConfig});		
		}
		
		if(this._curConfig.guideId){

			Api.rookieVoApi.guideId = this._curConfig.guideId;
			PlatformManager.analyticsNewGuide(this._curConfig.guideId);

			if(this._curConfig.guideId == RookieCfg.getRookieCfg("guideSteps")){
				this.request(NetRequestConst.REQUEST_USER_NEWERGUILD, {step:9999});
				PlatformManager.analyticsCompleteNewGuide();
			}
		}
		else{
			//todo 向后台发送数据 this._curConfig.otherId
			this.request(NetRequestConst.REQUEST_USER_STEPGUILD, {step:this._curConfig.otherId});
		}
		
		// App.LogUtil.show(this._curConfig.guideId);
		Api.rookieVoApi.curStep = this._curIdx;
		App.LogUtil.log("QAZ showPage step ",this._curIdx);

		if(this._curConfig.checkNpc)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECKNPC_SHOW,{"key":this._curConfig.checkNpc});
		}

		if (this._curConfig.cityscenescroll != undefined) {
			BaseScene.scrollToPos = this._curConfig.cityscenescroll;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL);
		}

		this.doStepHandle();

		if (this._showManTab) {
			this._guideTipContainer.removeChild(this._showManTab);
			this._showManTab = null;
		}
		let needShoot:boolean = false;
		//底部 描述
		if (this._curConfig.descId) {
			//描述 

			var descId = this._curConfig.descId;
			if(Api.switchVoApi.checkIsInBlueWife()&&Api.gameinfoVoApi.getSexdefault()==1&&  LanguageManager.checkHasKey("rookieStoryDesc"+descId + "_male"))
			{
				descId = descId + "_male";
			}
			if (this._curConfig.clickContinue) {
				this._continueText.visible = true;
				this._isCodon = true;
				this._codonLength = 0;
				this._descText.text="";
				this._descContent = LanguageManager.getlocal("rookieStoryDesc"+descId);
				needShoot = true;
			}
			else {
				this._descText.text = LanguageManager.getlocal("rookieStoryDesc"+descId);
				this._continueText.visible = false;
			}
			// 人物形象
			if (this._curConfig.personPic == 1 || this._curConfig.personPic == 999 ) {

				let playerLv:number;
				if (this._curConfig.personPic == 999) {
					playerLv = 999;
				}
				else {
					playerLv = Api.playerVoApi.getPlayerLevel();
				}

				let myBody:BaseDisplayObjectContainer =  Api.playerVoApi.getPlayerPortrait(playerLv,Api.playerVoApi.getPlayePicId());
				// if (this._curConfig.personPic == 999) {
					myBody.setPosition(170, GameConfig.stageHeigth - myBody.height - 10 + 110);
				// }
				// else {
				// 	myBody.setPosition(0, GameConfig.stageHeigth - myBody.height - 157);
				// }
				let maskRect:egret.Rectangle = new egret.Rectangle();
				maskRect.setTo(0, 0, myBody.width, 430);
				// myBody.mask = maskRect;
				// myBody.setScale(1.32);
				
				this._guideTipContainer.addChildAt(myBody, 0);
				this._showManTab=myBody;
			}
			else if (this._curConfig.personPic) {

				let npcBody:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
				this._guideTipContainer.addChild(npcBody);
				// let npcMan:BaseBitmap = BaseBitmap.create(this._curConfig.personPic);
				// if (this._curConfig.personPic.substring(0,4) == "wife") {
				// 	npcMan.setScale(460/npcMan.height)
				// }
				let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,405,467);
				if (this._curConfig.personPic.substring(0,4) == "wife") {
					rect1.setTo(0,0,355,467);
				}
				if(this._curConfig.personPic.indexOf("servant_full_") > -1  ||  this._curConfig.personPic.indexOf("skin_full_") > -1  ) {
					rect1.setTo(0,0,640,482);
				}
				if(this._curConfig.personPic.substring(0,4) == "wife")
				{
					let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById("101")
					if(wifeInfoVo)
					{
						this._curConfig.personPic = wifeInfoVo.body;
					}
					
				}
				
				let npcMan:BaseLoadBitmap = BaseLoadBitmap.create(this._curConfig.personPic, rect1);
				npcMan.width = rect1.width;
				npcMan.height = rect1.height;
				// npcMan.setScale(1.32)
				npcMan.setPosition(GameConfig.stageWidth/2 - rect1.width/2*npcMan.scaleX, GameConfig.stageHeigth - npcMan.height*npcMan.scaleY - 272 +50 + 60);
				npcBody.addChild(npcMan);

				this._guideTipContainer.addChildAt(npcBody, 0);
				this._showManTab=npcBody;
			}
			else if (this._curConfig.malePersonPic&&Api.switchVoApi.checkIsInBlueWife()) {

				let npcBody:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
				this._guideTipContainer.addChild(npcBody);
				let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,355,467);
				// if(this._curConfig.malePersonPic.substring(0,4) == "wife")
				// {
					let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById("101")
					if(wifeInfoVo)
					{
						this._curConfig.malePersonPic = wifeInfoVo.body;
					}
					
				// }
				
				let npcMan:BaseLoadBitmap = BaseLoadBitmap.create(this._curConfig.malePersonPic,rect1);
				// npcMan.setScale(1.32)
				npcMan.setPosition(GameConfig.stageWidth/2 - rect1.width/2*npcMan.scaleX, GameConfig.stageHeigth - npcMan.height*npcMan.scaleY - 272 +50 + 60);
				npcBody.addChild(npcMan);

				this._guideTipContainer.addChildAt(npcBody, 0);
				this._showManTab=npcBody;
			}
			//名字
			if (this._curConfig.nameId) {
				// this._descText.y = this._tipBB.y+88;
				var nameid = this._curConfig.nameId
				if(Api.switchVoApi.checkIsInBlueWife()&& LanguageManager.checkHasKey(nameid + "_male"))
				{
					nameid = nameid + "_male";
				}
				this._titleText.text = LanguageManager.getlocal(nameid);
				this._titleText.x = this._titleBg.x + (this._titleBg.width- 40)/2 - this._titleText.width/2;
				this._titleBg.visible = true;
			}
			else {
				// this._descText.y = this._tipBB.y+45;
				this._titleText.text = "";
				this._titleBg.visible = false;
			}
			this._guideTipContainer.visible = true;
		}
		else {
			this._guideTipContainer.visible = false;
		}
		//背景图
		let changeTime:number = 0;
		if (this._curConfig.bgId) {
			this.container.alpha = 1;
			if (this._curConfig.bgId != this._curBgId ) {
				let turnTime:number = 350;
				egret.Tween.removeTweens(this.container);
				this._descText.visible = false;
				this._titleText.visible = false;
				this._titleBg.visible = false;
				if (this._curBgId==0) {

					this.container.alpha = 1;
					this._curBgId = this._curConfig.bgId;
					this.changeBgCallBack();
					changeTime=0;
					
				}
				else {

					if (this._showManTab) {
						this._showManTab.alpha = 0;
					}

					this._curBgId = this._curConfig.bgId;
					egret.Tween.get(this.container).to({alpha:0},turnTime).call(this.changeBgCallBack,this).to({alpha:1},turnTime);
					changeTime = turnTime*2;
				}
			}
		}
		else {
			this._myBg.texture = null;
			this._curBgId=0;
		}

		if (needShoot) {
			egret.Tween.get(this).wait(changeTime).call(this.textShootAnim,this);
		}
		if(this._curConfig.showGrayMask)
		{
			this._curConfig.clickRect = {"x":-100,"y":0,"w":0,"h":0};
		}
		if (this._curConfig.clickRect) {
			this._blackBg.visible =false;

			let tempClickRect:any = {"x":this._curConfig.clickRect.x,"y":this._curConfig.clickRect.y,"w":this._curConfig.clickRect.w,"h":this._curConfig.clickRect.h};
			let handPos:egret.Point ;
			if(this._curConfig.handPos){
				handPos = egret.Point.create(this._curConfig.handPos.x,this._curConfig.handPos.y);
			}
			

			if(this._curConfig.clickRect.fromBottom){
            	tempClickRect.y = GameConfig.stageHeigth  - this._curConfig.clickRect.fromBottom;
				if(this._curConfig.handPos&&this._curConfig.handPos.fromBottom)
				{
					handPos.y = GameConfig.stageHeigth -  this._curConfig.handPos.fromBottom;
				}
			
       		 }
			if(this._curConfig.clickRect.fromCenter){
				tempClickRect.y += (GameConfig.stageHeigth - 960) * this._curConfig.clickRect.fromCenter;
				if(this._curConfig.handPos&&this._curConfig.handPos.fromCenter)
				{
					handPos.y += (GameConfig.stageHeigth - 960) * this._curConfig.handPos.fromCenter;
				}
				
       		 }

			if(this._curConfig.needLocalPos && Api.rookieVoApi.waitingPosY){
				tempClickRect.y = Api.rookieVoApi.waitingPosY;
				Api.rookieVoApi.waitingPosY = null;
				if(this._curConfig.handPos)
				{
					handPos.y = tempClickRect.y + 70;
				}
			}
			if(this._curConfig.needLocalPos && Api.rookieVoApi.waitingPosX){
				tempClickRect.x = Api.rookieVoApi.waitingPosX;
				Api.rookieVoApi.waitingPosX = null;
				if(this._curConfig.handPos)
				{
					handPos.x = tempClickRect.x + 70;
				}
			}

			if(this._curConfig.isScenePos)
			{
				if (this._curConfig.sceneKey) {
					let curCfg=Config.SceneCfg.getSceneCfgBySceneName(this._curConfig.isScenePos);
					tempClickRect.x = curCfg.posCfg[this._curConfig.sceneKey].x - 10;
					tempClickRect.y = curCfg.posCfg[this._curConfig.sceneKey].y - (1136-GameConfig.stageHeigth) - 10;
					if(curCfg.posCfg[this._curConfig.sceneKey].w)
					{
						tempClickRect.w = curCfg.posCfg[this._curConfig.sceneKey].w;
						tempClickRect.h = curCfg.posCfg[this._curConfig.sceneKey].h;
					}
				} else {

				}
			}

			this._guideBg.draw(tempClickRect,0.5);
			this._clickRect.visible = true;
			this._clickRect.width = tempClickRect.w + 10;
			this._clickRect.height = tempClickRect.h + 10;
			this._clickRect.x = tempClickRect.x - 5;
			this._clickRect.y = tempClickRect.y - 5;

			let  xx = this._clickRect.x;
			let yy = this._clickRect.y;
			if(tempClickRect.w !=0)
			{
				this._clickRect.setScale(3)
				this._clickRect.x = this._clickRect.x-(this._clickRect.width*this._clickRect.scaleX-this._clickRect.width)/4
				this._clickRect.y = this._clickRect.y -(this._clickRect.height*this._clickRect.scaleY-this._clickRect.height)/4
				//  this._clickRect.alpha = 0;
				egret.Tween.get(this._clickRect, {loop : false}).to({scaleX : 1, scaleY : 1,x:xx,y:yy},200)

			}
			this._circleContainer.visible = false;

			if(this._curConfig.handPos){
				this._clickHand.visible = true;
				this._clickHand.x = handPos.x;
				this._clickHand.y = handPos.y;

				if(this._curConfig.isScenePos)
				{
					if (this._curConfig.sceneKey) {
						let curCfg=Config.SceneCfg.getSceneCfgBySceneName(this._curConfig.isScenePos);
						tempClickRect.x = curCfg.posCfg[this._curConfig.sceneKey].x - 10;
						tempClickRect.y = curCfg.posCfg[this._curConfig.sceneKey].y - (1136-GameConfig.stageHeigth) - 10;
						if(curCfg.posCfg[this._curConfig.sceneKey].w)
						{
							this._clickHand.x = tempClickRect.x + tempClickRect.w/2 - 10;
							this._clickHand.y = tempClickRect.y + tempClickRect.h/2 - 10;
							handPos.x = this._clickHand.x ;
							handPos.y = this._clickHand.y ;
						}
					} else {}
				}

				this._circleContainer.visible = true;
				this._circleContainer.x = handPos.x + 15;
				this._circleContainer.y = handPos.y + 20;
				if(this._curConfig.handPos.flip){
					this._clickHand.skewY = 180;
					this._circleContainer.x = handPos.x - 10;
					this._circleContainer.y = handPos.y + 10;
				}
				else if(this._curConfig.handPos.flipXY){
					this._clickHand.skewX = 180;
					this._clickHand.skewY = 180;
					this._circleContainer.x = handPos.x - 10;
					this._circleContainer.y = handPos.y -5;
				}
				else{
					this._clickHand.skewX = 0;
					this._clickHand.skewY = 0;
				}


			}else{
				this._clickHand.visible = false;
			}
			

			//说明文字
			if(this._curConfig.tipId){
				this._cliclText.visible = true;
				this._cliclText.text = LanguageManager.getlocal("rookieTip" + this._curConfig.tipId);
				this._cliclText.width = 450
				this._cliclText.lineSpacing = 5;
				this._cliclText.x = this.width/2 - this._cliclText.width/2;
				this._cliclText.y = this._curConfig.tipPos.y;

				this._cliclTextBg.visible = true;
				this._cliclTextBg.width = this._cliclText.width + 40;
				if(this._cliclText.height>50)
				{
					this._cliclTextBg.height = this._cliclText.height + 55;
				}else{
					this._cliclTextBg.height = this._cliclText.height + 25;
				}
				this._cliclTextBg.x = this._cliclText.x - 20;
				this._cliclTextBg.y = this._cliclText.y - 23;

				if(this._curConfig.tipPos.fromBottom){
					this._cliclText.y = GameConfig.stageHeigth  - this._curConfig.tipPos.fromBottom;
					this._cliclTextBg.y = this._cliclText.y - 13;
				}
			}
			else{
				this._cliclTextBg.visible = false;
				if(this._cliclText)
				{
					this._cliclText.visible = false;
				}
			}
			// this._skipBtn.visible = false;
			
		}
		else {
			// this._blackBg.visible =true;
			if (this._curConfig.hideBlackBg != true)
			{
				// this._blackBg.visible =true;
			}

			this._guideBg.drawScreen();
		
			this._clickRect.visible = false;
			this._clickHand.visible = false;
			this._cliclText.visible = false;
			this._cliclTextBg.visible = false;
			this._circleContainer.visible = false;


			// this._skipBtn.visible = true;
		}

		if (this._curConfig.isCallback) {
			let tempObj:any = this._obj;
			let tempFunc:Function = this._callbackF;
			if (tempObj && tempFunc) {
				tempFunc.apply(tempObj);
			}
			this._obj=null;
			this._callbackF=null;
		}

		if (this._branchContainer) {
			this.removeChild(this._branchContainer);
			this._branchContainer = null;
		}

		if (this._curConfig.branch) {

			this._branchContainer = new BaseDisplayObjectContainer();
			this.addChild(this._branchContainer);

			let allKey:string[] = Object.keys(this._curConfig.branch);
			let totalHeight:number = allKey.length*110;
			for (let i:number = 0 ; i < allKey.length; i++)
			{	
				// let textstr:string = LanguageManager.getlocal("rookieStoryBranch"+allKey[i]);

				let branchBtn:BaseBitmap = BaseBitmap.create("loginres_9_serverbg");
				branchBtn.width = 440;
				if(PlatformManager.checkIsTextHorizontal()){
					branchBtn.width = 500;
				}
				branchBtn.setPosition(GameConfig.stageWidth/2-branchBtn.width/2, GameConfig.stageHeigth/2 - totalHeight/2 + i*110+branchBtn.height/2);
				this._branchContainer.addChild(branchBtn);
				// branchBtn.addTouchTap(this.clickSelectedHandler,this,[this._curConfig.branch[allKey[i]]]);
				branchBtn.addTouch(this.clickSelectedHandler,this,[branchBtn,this._curConfig.branch[allKey[i]]]);	

				let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rookieStoryBranch"+allKey[i]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				timeDesc.setPosition(branchBtn.x+ branchBtn.width/2 -timeDesc.width/2 + 15 ,branchBtn.y+ branchBtn.height/2 - timeDesc.height/2);
				if(PlatformManager.checkIsTextHorizontal()){
					timeDesc.x = branchBtn.x + 30;
				}
				// if(PlatformManager.checkIsTextHorizontal()){
				// 	branchBtn.width = timeDesc.width + 30;
				// 	timeDesc.x = branchBtn.x + branchBtn.width/2 - timeDesc.width/2;
				// 	branchBtn.x = GameConfig.stageWidth/2 - branchBtn.width/2;
				// }
				this._branchContainer.addChild(timeDesc);
			}
			
		}
		if (this._curConfig.moveHand) {
			let moveClip = ComponentManager.getCustomMovieClip("guidearr",3,300);
			moveClip.name="moveClip"
			moveClip.x = 240;
			moveClip.y = 370;
			// moveClip.y -= (GameConfig.stageHeigth - 960) * 0.5;
			this.addChildToContainer(moveClip);
			moveClip.playWithTime(0);
			let moveHand = BaseBitmap.create("guide_hand");
			moveHand.setPosition(240,380);
			// moveHand.y -= (GameConfig.stageHeigth - 960) * 0.5;
			moveHand.name="moveHand"
			egret.Tween.get(moveHand,{loop:true}).to({x:400},700).wait(500).to({x:240},0)
			// .to({x:420},700).wait(500).to({x:270},0)
			// .to({x:420},700).wait(500).to({x:270},0)
			
			.call(()=>{
			
				},this);
			this.addChildToContainer(moveHand);
			
		}else{
			let moveHand = this.container.getChildByName("moveHand")
			if(moveHand)
			{	
				this.container.removeChild(moveHand);
				moveHand = null;
			}

			let moveClip = this.container.getChildByName("moveClip")
			if(moveClip)
			{	
				this.container.removeChild(moveClip);
				moveClip = null;
			}
		}
		if(this._curConfig.unlock)
		{
			MainUI.getInstance().setUnlockIndex(this._curConfig.unlock);
		}
		if (this._curConfig.touchAll||this._curConfig.showGrayMask) {
			this._clickRect.addTouchTap(this.clickPage,this);
		}
		else {
			this._clickRect.removeTouchTap();
			this._clickRect.touchEnabled=false;
		}

	}

	private clickSelectedManHandler(event:egret.TouchEvent):void
	{
		this._skipBtn.visible = true;
		this.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:2,sflag:1});
		Api.gameinfoVoApi.setSexdefault();
		let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(101)
		wifeInfoVo.sexflag = 1;
		this.doNextStep();
	}
	private clickSelectedWomanHandler(event:egret.TouchEvent):void
	{
		this._skipBtn.visible = true;
		this.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:2});
		this.doNextStep();
	}

	private clickSelectedHandler(event:egret.TouchEvent,branchBtn:BaseBitmap,step:string):void
	{

		this.doNextStep(step);
	}

	private changeBgCallBack():void
	{	
		this._descText.visible = true;
		this._titleText.visible = true;
		if(this._titleText.text == ""){
			this._titleBg.visible = false;
		}
		else{
			this._titleBg.visible = true;
		}
		
		if (this._fogBg)
		{	
			this.removeChildFromContainer(this._fogBg);
			this._fogBg = null;
		}

		if (this._showManTab) {
			this._showManTab.alpha = 1;
		}
		let bgName:string = "story_bg" + this._curBgId;
		if (this._curBgId == 5) {
			bgName = "cityscene"
		}
		else if (this._curBgId == 6) {
			bgName = "homescene"
		}
		else if(Api.switchVoApi.checkIsInBlueWife()&&Api.gameinfoVoApi.getSexdefault()==1&& this._curBgId == 7)
		{
			bgName = "story_bg7_male"
		}
		egret.Tween.removeTweens(this._myBg);
		this._myBg.texture = ResourceManager.getRes(bgName);

		//背景位置
		// if (this._curBgId == 6) {
			this._myBg.y = GameConfig.stageHeigth - this._myBg.height;
			this._myBg.x = 0;
			this._myBg.anchorOffsetX = 0;
			this._myBg.setScale(1);
		// }
		// else {
		// 	this._myBg.y = 0;
		// }
		if (this._curIdx == RookieCfg.getRookieCfg("fogId"))
		{
			this.showFogAnim();
		}
		// else if (this._curIdx == RookieCfg.getRookieCfg("shakeId"))
		// {
		// 	this.showShakeAnim();
		// }
	}

	private _shakeOffset:number = 0;
	private showShakeAnim():void
	{	
		this._myBg.setScale((this._myBg.width+40)/this._myBg.width);
		this._myBg.x = -20;
		this._myBg.y = GameConfig.stageHeigth - this._myBg.height - 30;
		this._shakeOffset = 16;
		this.shakeScreen();
	}
	
	private shakeScreen():void
	{	
		if ( this._shakeOffset > 0 )
		{
			let setX:number = -this._shakeOffset/2-App.MathUtil.getRandom(0,this._shakeOffset);
            let setY:number = GameConfig.stageHeigth - this._myBg.height-this._shakeOffset/2-App.MathUtil.getRandom(0,this._shakeOffset);
			setY *= 1.5;
			this._myBg.setPosition(setX,setY);
			egret.Tween.get(this._myBg).wait(50).call(this.shakeScreen,this);

			this._shakeOffset -= 1;
		}
	}

	private showFogAnim():void
	{	
		this._myBg.y = 0;
		this._myBg.x = -this._myBg.width/4;
		this._myBg.anchorOffsetX = 0.5;
		this._myBg.setScale(1.5);

		this._fogBg = BaseBitmap.create("story_fog");
		this.addChildToContainer(this._fogBg);
		if (this._skipBtn)
		{
			this.addChildToContainer(this._skipBtn);
		}

		egret.Tween.get(this._myBg).to({scaleX:1,scaleY:1,x:0},7000);
	}

	private textShootAnim():void
	{	
		if (this._isCodon == false) {
			return;
		}

		this._codonLength +=1;
		if (this._codonLength > this._descContent.length) {
			this._isCodon = false;
			this._descText.text = this._descContent
		}
		else {
			this._descText.text = this._descContent.substr(0,this._codonLength);
			egret.Tween.get(this._descText).wait(100).call(this.textShootAnim,this);
		}
	}

	private textAnim(t):void
	{
		egret.Tween.removeTweens(t);

		let oldx:number = t.x;
		let oldy:number = t.y;
		let newx:number = t.x - t.width*0.1;
		let newy:number = t.y - t.height*0.1;

		egret.Tween.get(t).to({scaleX:1.2,scaleY:1.2,x:newx,y:newy},600).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).to({scaleX:1.2,scaleY:1.2,x:newx,y:newy},600).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).call(this.textAnim,this,[t]);
	}

	private skipAnim():void
	{	
		NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:NetRequestConst.KID_NEWPLAYERSKIP});
		if (Api.switchVoApi.checkOpenBuleWife()&&Api.gameinfoVoApi.getSexnum()==1&& Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndIdBule"))) {
			let tempObj:any = this._obj;
			let tempFunc:Function = this._callbackF;

			if (tempObj && tempFunc) {
				tempFunc.apply(tempObj);
			}
			this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndIdBule"));
			this.doNextStep();

		}
		// else if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId2"))) {
		// 	let tempObj:any = this._obj;
		// 	let tempFunc:Function = this._callbackF;

		// 	if (tempObj && tempFunc) {
		// 		tempFunc.apply(tempObj);
		// 	}
		// 	this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId2"));
		// 	this.doNextStep();

		// }
		else if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId"))) {
			let tempObj:any = this._obj;
			let tempFunc:Function = this._callbackF;

			if (tempObj && tempFunc) {
				tempFunc.apply(tempObj);
			}
			this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId"));
			this.doNextStep();

		}
		else {
			Api.rookieVoApi.isInGuiding = false;
			this.hide();
		}
		
		if (this._fogBg)
		{	
			this.removeChildFromContainer(this._fogBg);
			this._fogBg = null;
		}
	}

	/**
	 * 收到通知 下一步
	 */
	private noticeNextStep():void
	{
		this.doNextStep();
	}

	protected initView():void
	{
        
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.maskLayer;
	}

	public hide(isDispose?:boolean):void
	{	

		let tempObj:any = this._obj;
		let tempFunc:Function = this._callbackF;
		
		Api.rookieVoApi.isGuiding = false;

		if(!isDispose)
		{
			if (tempObj && tempFunc) {
				tempFunc.apply(tempObj);
			}
		}
		super.hide();
	}

	private doStepHandle():void
	{	
		// if (this._curIdx == "1") {
		// 	SoundManager.playBg(SoundConst.MUSIC_PALACE);
		// }
		// else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicStart")) 
		// {
		// 	SoundManager.playBg(SoundConst.MUSIC_ROOKIE_STORY);
		// }
		// else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicEnd")) 
		// {
		// 	SoundManager.playBg(SoundConst.MUSIC_HOME);
		// }
	}

	protected hideScene():boolean
	{
		return false;
	}

	public dispose():void 
	{	
		if(this._curConfig.showCloseHand){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);	
		}
		Api.rookieVoApi.curGuideKey = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP,this.noticeNextStep,this);

		this._continueText&&egret.Tween.removeTweens(this._continueText);
		this._continueText = null;
		this._callbackF = null;
		this._obj = null;
		this._curIdx = "";
		this._showManTab = null;
		this._curBgId = 0;
		this._tipBB = null;

		this._descContent = null;
		this._isCodon = false;
		this._codonLength = 0;
		if (this._descText) {
			egret.Tween.removeTweens(this._descText);
		}
		this._descText = null;
		this._skipBtn = null;
		this._myBg = null;
		this._circleContainer = null;
		if (this._circle1) {
			egret.Tween.removeTweens(this._circle1);
		}
		this._circle1 = null;
		if (this._circle2) {
			egret.Tween.removeTweens(this._circle2);
		}
		this._circle2 = null;
		this._blackBg = null;
		this._iconList.length=0;
		this._cliclTextBg = null;
		this._isPlayMySound = false;
		// this._skipBtn2 = null;
		this._branchContainer = null;
		egret.Tween.removeTweens(this.container);
		egret.Tween.removeTweens(this);
		if (this._clickHand) {
			egret.Tween.removeTweens(this._clickHand);
		}
		this.visible = true;

		// this._skipBtnBg = null;
		this._titleBg = null;
		// this._grayBB = null;
		this._fogBg = null;
		this._shakeOffset = 0;
		this._guideBg=null;

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2);
		super.dispose();
	}
}