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

	protected init():void
	{
		super.init();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_REVERSIONSETTING),this.refreshNpc,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING),this.refreshNpc,this);
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
		// this.userLoginRequestHandler();
		if(PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
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
	private refreshNpc()
	{
		let wifename:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName("wifename");
		let childname:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName("childname");
		let wife:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName("wife");
		if(!wifename||!childname)
		{	
			return;
		}
		if(Api.switchVoApi.checkIsInBlueWife())
		{
			wifename.setRes("homenpcwifename_blueType");
			childname.setRes("homenpcchildname_blueType");
			wife.setRes("homenpcwife_blueType")
		}else{
			wifename.setRes("homenpcwifename");
			childname.setRes("homenpcchildname");
			
		}
		if(!wife)
		{	
			return;
		}
		let wifeCfg = Config.WifeCfg.getWifeCfgById("101");
		if(wifeCfg.isBule())
		{
			wife.setRes("homenpcwife_male")
		}else{
			wife.setRes("homenpcwife")
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
		// this.userLoginRequestHandler();
	}
	 


	private exchangeCallback(code:string,data:any):void
	{	
		// alert("data"+data.ret);
		if(String(code) == "0"){
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD,{giftId:PlatformManager.getGiftId()});
		}
		else{
			ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:String(data.ret)});
		}
		
		
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:data.data.data.rewards,code:"0"});
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

	
	// protected getResourceList():string[]
	// {
		
	// 	return [];
	// }
	
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
	public show(isfromShow?:boolean):void
	{
		super.show(isfromShow);

		if (GameData.isShowedHomeScene == false)
		{
			GameData.isShowedHomeScene=true;
			Api.playerVoApi.checkAddiction(true);
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_REVERSIONSETTING),this.refreshNpc,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING),this.refreshNpc,this);
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