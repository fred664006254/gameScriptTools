class HomeScene extends BaseScene
{
	private _isRequestedOfflineReward:boolean=false;

	// private _taohuaParticle:particle.GravityParticleSystem;
	private _butterflys:BaseBitmap[];

	public constructor()
	{
		super();
	}

	protected isNpcNameMove():boolean
	{
		return false;
	}

	private doGuideScroll2() {
		if (this._sceneScroll && this._isScroll && this._sceneScroll.horizontalScrollPolicy == "off") {
			if (!Api.rookieVoApi.isInGuiding)
			{
				this._sceneScroll.horizontalScrollPolicy = "on";
			}
		}
	}

	private doGuideScroll(evt:egret.Event) 
	{	
		if (this._sceneScroll && this._isScroll)
		{
			this._sceneScroll.setScrollLeft(evt.data);
			this._sceneScroll.horizontalScrollPolicy = "off";
		}
		
	}

	protected init():void
	{
		super.init();
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.refreshNpc,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshNpc,this);
		App.MessageHelper.addNetMessage(NetRequestConst.OTHERINFO_SETDANGJIA,this.refreshNpc,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2,this.doGuideScroll2,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_HOMESCENE_SCROLL,this.doGuideScroll,this);
		if(!this._isRequestedOfflineReward&&Api.switchVoApi.checkAutoResManage())
		{
			this._isRequestedOfflineReward=true;
			Api.manageVoApi.checkAndShowAutoReward("2");
		}
		if(Api.rookieVoApi.isInGuiding){
			Api.rookieVoApi.checkWaitingGuide();
		}

		// TimerManager.doTimer(30, 15, this.showAni, this);
		// ResourceManager.loadResources("taohua",null,this);
		// ResourceManager.loadItem("taohua_json",this.playAni,this);
		// this.loadEffectRes();
		this.userLoginRequestHandler();
		if(RSDKHelper.isInit&&PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
		{
			try
			{
				qqwanbaplugin.sendToWanbaData({ach_type:3,ach_des:LanguageManager.getlocal("mainui_shili"),ach_value:Api.playerVoApi.getPlayerPower()});
			}
			catch(e)
			{
				console.log("tjqs error");
			}
		}
	}

	private _effectGroups:string[][]=[["taohua","taohua_json"],["hudie"],["hudie01"],["hudie02"]];
	private _loadIndex:number=-1;
	private _needDestoryRes:string[]=[];
	private loadEffectRes():void
	{
		this._loadIndex++;
		let needDistoryRes:string=ResourceManager.loadResources(this._effectGroups[this._loadIndex],[],this.showEffectAndLoadNext,null,this);
		if(this._needDestoryRes.indexOf(needDistoryRes)<0)
		{
			this._needDestoryRes.push(needDistoryRes);
		}
		this.userLoginRequestHandler();
	}
	
	private userLoginRequestHandler():void
	 {	
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}

		if(	GameData.announcementData&&GameData.announcementData.length>0)
		{	if(Api.rookieVoApi.isInGuiding)
			{
				return
			}
			else
			{
				if(GameData.checkShowNoticeInGame())
				{
					Api.viewqueueVoApi.checkShowView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW,GameData.announcementData);
				}
			}
		}

		if (GameData.wbrewards&&GameData.wbrewards.length>0)
		{	
			Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.GETGIFTPOPUPVIEW,{rewards:GameData.wbrewards});
			
		}

		if (Api.otherInfoVoApi.getReturnrewardWB6()&&Api.otherInfoVoApi.getReturnrewardWB6() == 1 &&PlatformManager.checkIsWanbaSp())
		{	
			Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.RETURNREWARDPOPUPVIEW);
			
		}

		PlatformManager.checkDownloadApp();
		//玩吧兑换积分礼包
		// alert(PlatformManager.getGiftId());
		if(PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502" )
		{
			if(GameData.wbrewardsFlag)
			{
				PlatformManager.giftExchange(this.exchangeCallback,this);
				// this.exchangeCallback("0",{ret:"0"});
				
			}
			else{
				Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"2003"});
			}

		}		
		// 实名认证 
		if (GameData.idcardSwitch==true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null)
		{	
			Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
		}
		//活动公告
		if (Api.switchVoApi.checkOpenActivityPop() && Api.otherInfoVoApi.checkShowAcitivePop())
		{	
			if (Config.AcCfg.isGetAll == true)
			{
				Api.acVoApi.checkShowePopupView();
			}
			else
			{
				App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_POP,this.showAcitivePop,this);
			}
		}
		//购买月卡
		Api.shopVoApi.checkShowBuyMonthCard();
		//回归礼包
		if(Api.playerReturnVoApi.getRebackRewards() != ''){
			Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.REBACKPOPUPVIEW);
		}
		if (GameData.wbisshow)
		{
			Api.viewqueueVoApi.checkShowView("QianfuView");
		}

		if (Api.rookieVoApi.isInGuiding == false)
		{
			RSDKHelper.checkReceiveGooglePlayPoint();
		}
		Api.sevenDaysSignupLoginVoApi.checkShowFirView();
		//神兵宝库获得全服奖励数据（刷新红点）
		if(Api.acVoApi.getActivityVoByAidAndCode("weaponHouse"))
		{
			let code = Api.acVoApi.getActivityVoByAidAndCode("weaponHouse").code;
			NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALLLIST, { activeId: "weaponHouse-"+code });
		}
	}

	private showAcitivePop():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_POP,this.showAcitivePop,this);
		if (Api.switchVoApi.checkOpenActivityPop() && Api.otherInfoVoApi.checkShowAcitivePop())
		{	
			if (Config.AcCfg.isGetAll == true)
			{	
				Api.acVoApi.checkShowePopupView();
			}
		}
	}


	private exchangeCallback(code:string,data:any):void
	{	
		// alert("data"+data.ret);
		if(String(code) == "0"){
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD,{giftId:PlatformManager.getGiftId()});
		}
		else{
			Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:String(data.ret)});
		}
		
		
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:data.data.data.rewards,code:"0"});
			}
		}
	}

	private showEffect():void
	{
		let time1 = App.MathUtil.getRandom(10000, 20000) ;
			let time2 = App.MathUtil.getRandom(0, 1500) ;

			let taohuaParticle = App.ParticleUtil.getParticle("taohua");
			taohuaParticle.x = 0;
			taohuaParticle.y = this.height - 700;
			taohuaParticle.rotation = -66;
			taohuaParticle.start();	
			this._effectLayer.addChild(taohuaParticle);
			egret.Tween.get( taohuaParticle)
			.call(function(){
				taohuaParticle.start();
			},this)
			// .wait(time1)
			// .call(function(){
			// 	taohuaParticle.stop();	
				
			// 	// taohuaParticle.remov
			// },this)
			// .wait(time2)
			// .call(function(curtaohuaParticle:particle.GravityParticleSystem){
			// 	this._effectLayer.removeChild(curtaohuaParticle);
			// 	egret.Tween.removeTweens(curtaohuaParticle);
			// 	this.showEffect();
				
			// },this,[taohuaParticle])
	}

	private showEffectAndLoadNext():void
	{

		if(this._loadIndex == 0)
		{

			this.showEffect();
		}

		if(this._loadIndex == 1)
		{
			// let hudieClip = ComponentManager.getCustomMovieClip("hudie_",14,100);
			// hudieClip.x = 400;
			// hudieClip.y = this.height - 550;
			// this._effectLayer.addChild(hudieClip);
			// hudieClip.play();
		}

		if(this._loadIndex == 2)
		{
			// let hudie01Clip = ComponentManager.getCustomMovieClip("hudie01_",12,100);
			// hudie01Clip.x = 470;
			// hudie01Clip.y = this.height - 560;
			// this._effectLayer.addChild(hudie01Clip);
			// hudie01Clip.play();
		}


		if(this._loadIndex == 3)
		{
			// let dayanClip = ComponentManager.getCustomMovieClip("dayan_",12,100);
			// dayanClip.x = 700;
			// dayanClip.y = this.height - 660;
			// this._effectLayer.addChild(dayanClip);
			// dayanClip.play();
			// egret.Tween.get( dayanClip,{loop:true}).to( { x:-300,y: this.height - 900}, 8000 );
			// this.playBtAni();
			// this.createBt();

			
		}
		// var spr:egret.Sprite = new egret.Sprite();
		// spr.graphics.beginFill( 0x00ff00 );
		// spr.graphics.drawRect(390,  this.height - 630, 250, 180);
		// spr.graphics.endFill();
		// this._effectLayer.addChild( spr );
		// spr.alpha = 50;

		if(this._loadIndex<(this._effectGroups.length-1)&&this.isShow())
		{
			this.loadEffectRes();
		}
		// to do 根据index或者配置key显示动画
	}

	private createBt()
	{
		this._butterflys = new Array<BaseBitmap>();
			//(390,  this.height - 630, 250, 180);
			let bgPoints = [
				{x:410,y:this.height - 550,scale:0.5},
				{x:460,y:this.height - 545,scale:1},
				{x:520,y:this.height - 540,scale:0.8},
				{x:570,y:this.height - 520,scale:0.8},

			]
			//产生3个不重复的随机数（随机蝴蝶）
			let startArray =  new Array(1,2,3);  
			let N = 3;//随机数个数    
			let resultArray =new Array(3);//结果存放在里面    
			for(let i = 0; i < N; i++)    
			{    
				let seed = App.MathUtil.getRandom(0, startArray.length - i) ;//从剩下的随机数里生成    
				resultArray[i] = startArray[seed];//赋值给结果数组    
				startArray[seed] = startArray[startArray.length - i - 1];//把随机数产生过的位置替换为未被选中的值。    
			}  
			resultArray.push( App.MathUtil.getRandom(1,4));
			
			
			for (var index = 0; index < 4; index++) {
				

				let bt = "hudie_";
				if(resultArray[index] == 1)
				{
					bt = "hudie_"
				}
				else if(resultArray[index] == 2)
				{
					bt = "hudie01_"
				}
				else if(resultArray[index] == 3)
				{
					bt = "hudie02_"
				}

				let hudieClip = ComponentManager.getCustomMovieClip(bt,15,100);
				hudieClip.x = bgPoints[index].x;
				hudieClip.y = bgPoints[index].y;
				this._effectLayer.addChild(hudieClip);
				hudieClip.playWithTime();
				hudieClip.setScale(bgPoints[index].scale);
				this.playBtAni(hudieClip);
			
		}
	}
	private playBtAni(hudieClip:CustomMovieClip)
	{	
		let baginX = hudieClip.x;
		let baginY = hudieClip.y;
				//随机轨迹
		let flyPointS = new Array();
		for (var jj = 0; jj < 3; jj++) {
			let x = App.MathUtil.getRandom(390,390+250);
			let y = App.MathUtil.getRandom(this.height - 630,this.height - 630 + 180);
			flyPointS.push({x:x,y:y});
		}

				
		// App.DisplayUtil.addFactorFunc(CustomMovieClip);
		hudieClip["tweenMoveList"]=
		[
			egret.Point.create(hudieClip.x,hudieClip.y),
			egret.Point.create(hudieClip.x,flyPointS[0].y),
			egret.Point.create(flyPointS[0].x,flyPointS[0].y)
		];

		let waitTime = App.MathUtil.getRandom(1000,5000)
			App.LogUtil.log(flyPointS[2].y);

		egret.Tween.get( hudieClip).wait(waitTime)
		.to({factor: 1}, 2000)
		 .call(this.playBtAni,this,[hudieClip])
		// .to( { x:flyPointS[0].x,y:flyPointS[0].y}, 1000 )
		// .to( { x:flyPointS[1].x,y:flyPointS[1].y}, 1000 )
		// .to( { x:flyPointS[2].x,y:flyPointS[2].y}, 1000 )
		// .to( { x:baginX,y:baginY}, 1000 )
		// .call(this.playBtAni,this,[hudieClip])
	
	}
	
	protected setLayerPosition():void
	{
		super.setLayerPosition();
		// let tree:BaseLoadBitmap=BaseLoadBitmap.create("homescenetree");
		// tree.setPosition(0,this._mapLayer.y-103);
		// this._sceneLayer.addChild(tree);
	}

	private _yunList:BaseBitmap[]=[];
	// protected setFly():void
	// {
	// 	let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
	// 	let posArr:{x:number,y:number}[]=[];
	// 	posArr.push({x:0,y:100});
	// 	posArr.push({x:0,y:370});
	// 	posArr.push({x:100,y:80});
	// 	posArr.push({x:465,y:120});
	// 	posArr.push({x:390,y:0});
	// 	for(let i:number=0;i<5;i++)
	// 	{
	// 		let bmp:BaseBitmap=BaseLoadBitmap.create("homesceneyun"+(i+1));
	// 		if(bmp.texture==null)
	// 		{
	// 			bmp.visible=false;
	// 		}
	// 		container.addChild(bmp);
	// 		bmp.setPosition(posArr[i].x-20,posArr[i].y);
	// 		this._yunList.push(bmp);
	// 		bmp["yunSpeed"]=this.createRandSpeed();
	// 	}
	// 	let index:number = this._sceneLayer.getChildIndex(this._sceneLayer.getChildByName("sky"));
	// 	this._sceneLayer.addChildAt(container,index+1);
	// 	TimerManager.doTimer(20,0,this.move,this);
	// }
	private createRandSpeed():number
	{
		let value:number=Math.random()>0.5?1:-1;
		let speed:number=0.35+value*Math.random()*0.15;
		return speed;
	}
	private move():void
	{
		for(var i:number=0;i<this._yunList.length;i++)
		{
			let bmp:BaseBitmap=this._yunList[i];
			// bmp.y-=speed;
			// if(bmp.y<-bmp.height-speed)
			// {
			// 	bmp.y=GameConfig.stageHeigth-660;
			// }
			bmp.x+=bmp["yunSpeed"];
			if(bmp.texture&&bmp.visible==false)
			{
				bmp.visible=true;
			}
			if(bmp.x>GameConfig.stageWidth)
			{
				bmp.x=-bmp.width;
				bmp["yunSpeed"]=this.createRandSpeed();
			}
		}
	}


	protected refreshAfterShow():void
	{
		super.refreshAfterShow();
		// if(!ViewController.getInstance().checkHasShowedView() && !Api.rookieVoApi.isInGuiding)
		if(!Api.rookieVoApi.isInGuiding)
		{
			if(Api.otherInfoVoApi.isJD618RewardEnable())
			{
				//是否弹出jd618 界面
				Api.viewqueueVoApi.checkShowView(ViewConst.BASE.ACJD618VIEW);
			}
		}
	}

	public show(isfromShow?:boolean):void
	{
		super.show(isfromShow);

		if (GameData.isShowedHomeScene == false)
		{
			GameData.isShowedHomeScene=true;
			Api.playerVoApi.checkAddiction(true);
		}
	}

	private refreshNpc()
	{
		let key = Config.SceneCfg.getChangeKey();
		let wifename:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(`${key}name`);
		let childname:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(`childname`);
		let role:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(key);
		if(!role){	
			return;
		}
		let res = this.getChangeNpcRes(key);
		role.setload(res);
		let nameres = this.getChangeNpcNameRes(key);
		wifename.setload(nameres);
		let childnameres = this.getChangeNpcNameRes(`child`);
		childname.setload(childnameres);
	}


	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING,this.refreshNpc,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshNpc,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.OTHERINFO_SETDANGJIA,this.refreshNpc,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2,this.doGuideScroll2,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_HOMESCENE_SCROLL,this.doGuideScroll,this);
		
		this._yunList.length=0;
		TimerManager.remove(this.move,this);
		
		this._butterflys = null;

		while(this._needDestoryRes.length>0)
		{
			ResourceManager.destroyRes(this._needDestoryRes.pop());
		}
		this._loadIndex=-1;
		GameData.announcementData = null
		super.dispose();
	}
}