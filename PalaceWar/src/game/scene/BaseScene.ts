/**
 * author 陈可
 * date 2017/9/15
 * @class BaseScene
 */
abstract class BaseScene extends BaseLoadDisplayObjectContiner
{
	protected _sceneLayer:BaseDisplayObjectContainer;
	protected _maskLayer:BaseDisplayObjectContainer = null;
	protected _effectLayer:SceneEffect = null;
	protected _mapLayer:BaseBitmap;
	// protected _skyLayer:BaseBitmap;
	protected _npcList:string[]=[];
	protected posCfg:Object={};
	protected shadowCfg:Object={};
	protected namePosCfg:Object={};
	protected reddotPosCfg:Object={};
	protected npcMessageCfg:Object={};
	protected guideNeedTouchCfg:Object={};
	protected bubbleCfg:Object={};
	protected buildBgCfg:Object={};

	protected _bubbleList:string[]=[];
	protected _bubbleShowIdx:number = 0;
	
	private _isCfgInit:boolean=false;
	private _curSceneBg:string = "";
	protected _sceneName:string = "";

	private _maskTab:BaseBitmap[] = [];

	private _npcNameList:BaseLoadBitmap[] = [];
	private _npcNamebgList:BaseLoadBitmap[] = [];
	private _npcRedList:BaseBitmap[] = [];
	private _isfromShow:boolean = false;

	//场景拖动
	protected _sceneScroll:ScrollView;
	protected _isScroll:boolean = false;
	public static scrollToPos:number = -1;
	// 大地图的2个背景层
	protected _mapLayer2:BaseLoadBitmap;
	protected _mapLayer3:BaseLoadBitmap|BaseBitmap;
	protected _mapLayer4:BaseLoadBitmap|BaseBitmap;
	protected _mapGuang:CustomMovieClip;

	protected _preLayer:BaseLoadBitmap = null;

	protected _leftArrow:BaseDisplayObjectContainer = null;
	protected _rightArrow:BaseDisplayObjectContainer = null;

	public static homeScrollToPos:number = -1;

	public constructor()
	{
		super();
	}

	private initCfg():void
	{
		if(this._isCfgInit==false)
		{
			let sceneId:string = Api.otherInfoVoApi.getCurSceneId(this._sceneName);

			let curCfg=Config.SceneCfg.getSceneCfgBySceneName(this._sceneName, sceneId);
			this._isCfgInit=true;
			if(curCfg)
			{
				if(curCfg.posCfg)
				{
					this.posCfg=curCfg.posCfg;
				}
				if(curCfg.shadowCfg)
				{
					this.shadowCfg=curCfg.shadowCfg;
				}
				if(curCfg.namePosCfg)
				{
					this.namePosCfg=curCfg.namePosCfg;
				}
				if(curCfg.reddotPosCfg)
				{
					this.reddotPosCfg=curCfg.reddotPosCfg;
				}
				if(curCfg.npcMessageCfg)
				{
					this.npcMessageCfg=curCfg.npcMessageCfg;
				}
				if(curCfg.guideNeedTouchCfg)
				{
					this.guideNeedTouchCfg=curCfg.guideNeedTouchCfg;
				}
				if(curCfg.bubbleCfg)
				{
					this.bubbleCfg=curCfg.bubbleCfg;
				}
				if(curCfg.buildBgCfg)
				{
					this.buildBgCfg=curCfg.buildBgCfg;
				}
				else
				{
					this.buildBgCfg = null;
				}
				
			}
		}
	}

	protected init():void
	{	
		this._sceneName= App.StringUtil.firstCharToLower(this.getClassName());

		this.initCfg();
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.refreshMode,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW,this.checkGuideNpc,this);
		let thisClassName:string=egret.getQualifiedClassName(this);
		thisClassName=thisClassName.toLowerCase();

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGEBG+thisClassName,this.checkChangeBg,this);
		if(!this._sceneLayer)
		{
			this._sceneLayer=new BaseDisplayObjectContainer();
		}
		// if(!this._skyLayer)
		// {
		// 	this._skyLayer=BaseBitmap.create(thisClassName+"sky");
		// 	this._skyLayer.name="sky";
		// 	this._sceneLayer.addChild(this._skyLayer);
		// }
		if(!this._mapLayer)
		{
			let checkResName:string=thisClassName+"_"+PlatformManager.getAppid();
			if(Number(ServerCfg.selectServer.zid)>900&&Number(ServerCfg.selectServer.zid)<1000&&RES.hasRes(checkResName))
			{
				let rect:egret.Rectangle=egret.Rectangle.create();
				rect.setTo(0,0,640,1136);
				this._mapLayer=BaseLoadBitmap.create(checkResName,rect);
				NetLoading.show();
				let timeNum = egret.setTimeout(function() {
					NetLoading.hide();
					if(timeNum>-1)
					{
						egret.clearTimeout(timeNum);
						timeNum=-1;
					}
				},this, 1000);
			}
			else
			{	
				this._mapLayer=BaseBitmap.create(this._curSceneBg);
			}
			//场景拖动
			let rect = egret.Rectangle.create();
			rect.setTo(0,0 ,642,1136);
			let scrollView = ComponentManager.getScrollView(this._sceneLayer,rect);
			scrollView.verticalScrollPolicy = "off"; 
			scrollView.bounces=false;
			this._sceneScroll = scrollView;
			scrollView.addEventListener(egret.Event.CHANGE,()=>{

				if (this._mapLayer2)
				{
					this._mapLayer2.x = (this._mapLayer.width - this._mapLayer2.width) * (scrollView.scrollLeft / (this._mapLayer.width - GameConfig.stageWidth));
				}
				if (this._mapLayer3)
				{
					this._mapLayer3.x = (this._mapLayer.width - this._mapLayer3.width) * (scrollView.scrollLeft / (this._mapLayer.width - GameConfig.stageWidth));
				}
				if (this._mapLayer4)
				{
					this._mapLayer4.x = (this._mapLayer.width - this._mapLayer4.width) * (scrollView.scrollLeft / (this._mapLayer.width - GameConfig.stageWidth));
				}
				if (this._mapGuang)
				{	
					this._mapGuang.x = (this._mapLayer2.x + this._mapLayer3.x)/2 + 370;
				}
				this.checkArrowShow();
				this.checkArrowReddot();
				
			},this);
			this._sceneLayer.addChild(this._mapLayer);
			this.addChild(scrollView);

			// this._sceneLayer.addChild(scrollView);
			this.setLayerPosition();
			this.checkLayerScroll();
			this.checkScrollEffect();
			this.checkLayerScroll(true);
			
			this._sceneLayer.removeChild(this._mapLayer);
			this._sceneLayer.addChild(this._mapLayer);
			this._sceneLayer.width = this._mapLayer.width;
			
			if (this._mapGuang)
			{
				this._sceneLayer.removeChild(this._mapGuang);
				this._sceneLayer.addChild(this._mapGuang);
			}
			if (this._preLayer)
			{
				this._sceneLayer.removeChild(this._preLayer);
				this._sceneLayer.addChild(this._preLayer);
			}
		}
		if(!this._effectLayer)
		{
			this._effectLayer=new SceneEffect();
			this._sceneLayer.addChild(this._effectLayer);

			let cId:string = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
			if (Config.SceneeffectCfg.hasSceneEffect(cId))
			{	
				this._effectLayer.y = 0;
				this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
			}
				//通用特效
			if(Config.SceneeffectCfg.hasCommonEff(cId)){
				this._effectLayer.showCommonSceneEffect(cId);
				this._effectLayer.y = this._mapLayer.y;
			}
		}
		if(!this._maskLayer)
		{
			this._maskLayer=new BaseDisplayObjectContainer();
			this._sceneLayer.addChild(this._maskLayer);
		}

		this.setLayerPosition();
		let cId:string = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
		if(Config.SceneeffectCfg.hasCommonEff(cId)){
			this._effectLayer.y = this._mapLayer.y;
		}

		// this.addChild(this._sceneLayer);
		this.initBuildBg();
		this.initNPC();
	

		this.refreshAfterShow();
		this.tick();
	}

	private checkLayerScroll(isClear?:boolean):void
	{
		if (this._mapLayer.width>640)
		{	
			if (Api.rookieVoApi.isInGuiding)
			{
				this._sceneScroll.horizontalScrollPolicy = "off";
			}
			else
			{
				this._sceneScroll.horizontalScrollPolicy = "on";
			}

			this._isScroll = true;
		}
		else
		{
			this._sceneScroll.horizontalScrollPolicy = "off";
			this._isScroll = false;
		}
		if (this._isScroll == true)
		{	
			this._sceneScroll.setScrollLeft(0);
			if (BaseScene.scrollToPos != -1) {
				this._sceneScroll.setScrollLeft(BaseScene.scrollToPos);
				this._sceneScroll.horizontalScrollPolicy = "off";
				if (isClear)
				{
					BaseScene.scrollToPos = -1;
				}
			} else {
				let posx = (this._mapLayer.width-640)/2;
				 if (this._sceneName == "homeScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName)=="106")
				 {
					 posx = 660;
				 }
				this._sceneScroll.setScrollLeft(posx);
			}
		}
		else
		{
			this._sceneScroll.setScrollLeft(0);
		}
	}

	private playBg():void
	{
		let bgName:string=this.getSoundBgName();
		if(RES.hasRes(bgName))
		{
			SoundManager.playBg(bgName);
		}
	}

	private getSoundBgName():string
	{
		let className:string=this.getClassName().toLowerCase();
		className=className.substring(0,className.indexOf("scene"));
		return "music_"+className;
	}

	private refreshMode(event:egret.Event)
	{
		let npcName:string=event.data;

		if(npcName==MessageConst.MESSAGE_MODEL_USERINFO)
		{
			this.checkNpcStatus();
		}
		else
		{
			if(this.posCfg)
			{
				for(let key in this.posCfg)
				{
					if(npcName.indexOf(key)>-1)
					{
						npcName=key;
					}
				}
			}
			this.checkNpcShow(npcName);
		}
	}

	protected checkShowNpcMessage(npcName:string):void
	{
		let modelName:string=npcName;
		modelName = this.formatModelToCheck(modelName);
		let npc:BaseLoadBitmap|BaseLoadDragonBones=<BaseLoadBitmap|BaseLoadDragonBones>this._sceneLayer.getChildByName(modelName);
		let npcname=this._sceneLayer.getChildByName(modelName+"name");
		if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].isShowNpc)
		{
			let result:boolean=Api[modelName+"VoApi"].isShowNpc();
			if (Api.unlocklist2VoApi.checkShowOpenFunc() && (!result || Api.unlocklist2VoApi.isInNeedShowEffect(modelName))){
				return ;
			}
			else{
				if(!result)
				{
					return;
				}
			}
		}

		if(Api[npcName+"VoApi"]&&Api[npcName+"VoApi"].checkNpcMessage)
		{
			let message=Api[npcName+"VoApi"].checkNpcMessage();
			// let messageStr:string="大人有资产待打理";
			if(message)
			{
				this.showNpcMessage(npcName);
			}
			else
			{
				this.hideNpcMessage(npcName);
			}
			if(npcName=="manage")
			{
				if(Api[npcName+"VoApi"].checkAffairNpcMessage)
				{
					let messageStr:string = Api[npcName+"VoApi"].checkAffairNpcMessage();
					let functionName:string="affair"
					if(messageStr)
					{
						this.showNpcMessage(functionName);
					}
					else
					{
						this.hideNpcMessage(functionName);
					}
				}
			}
		}
	}

	private showNpcMessage(npcName:string):void
	{
		if(this._sceneLayer)
		{
			if(!this.getNpcMessage(npcName))
			{
				let npc:BaseLoadBitmap|BaseLoadDragonBones=<BaseLoadBitmap|BaseLoadDragonBones>this._sceneLayer.getChildByName(npcName);
				if(npc&&npc.isLoaded()&&npc.visible&&this.getNpcMessage(npcName)==null&&this.checkHasView(npcName))
				{
					if (this.bubbleCfg && this.bubbleCfg[npcName])
					{
						//气泡
						let isHas:boolean = false;
						for (let k in this._bubbleList)
						{
							if (this._bubbleList[k] == npcName)
							{
								isHas = true;
								break;
							}
						}
						if (isHas==false)
						{
							this._bubbleList.splice(App.MathUtil.getRandom(0,this._bubbleList.length),0,npcName);
						}
					}
					let nameBg:BaseLoadBitmap = this.createNpcMessage(npcName);
					nameBg.alpha = 0;

					// let reddot:BaseBitmap = this._npcRedList[this._npcRedList.length-1];
					let reddot:BaseBitmap = <BaseBitmap>this._sceneLayer.getChildByName(npcName+"dot");
					reddot.alpha = 0;

					this._npcNamebgList.push(nameBg);
					let moveCall:()=>void=()=>{
						egret.Tween.get(nameBg).to({alpha:0.5},1000).to({alpha:1},1000).call(moveCall,this);
					};
					egret.Tween.get(nameBg).wait(500).call(function(){
						// nameBg.alpha = 1;
						reddot.alpha = 1;
						moveCall();
					});
					
				}
			}
		}
	}
	private getNpcMessageName(npcName:string):string
	{
		return npcName+"tipMessage";
	}
	private getNpcMessage(npcName:string):BaseLoadBitmap
	{
		return <BaseLoadBitmap>this._sceneLayer.getChildByName(this.getNpcMessageName(npcName));
	}
	private createNpcMessage(npcName:string):BaseLoadBitmap
	{
		let deltaAniY = 0;
		if(Api.switchVoApi.checkOpenGooutAni()){
			deltaAniY = 0;
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		//npc名字背景黄色光竖着改横着
		if(PlatformManager.checkIsTextHorizontal()){
			rect.setTo(0,0,150,69);
		} else {
			rect.setTo(0,0,59,133);
		}

		let npcMessageName:string = this.getNpcMessageName(npcName);
		let npcMessage:BaseLoadBitmap = <BaseLoadBitmap>this._sceneLayer.getChildByName(npcMessageName);
		if(npcMessage)
		{
			BaseLoadBitmap.release(npcMessage);
		}
		
		let nameBg:BaseLoadBitmap=BaseLoadBitmap.create("scenenamebg",rect);
		// nameBg.setScale(1.2);
		nameBg.name=this.getNpcMessageName(npcName);
		let npcNameSp = this._sceneLayer.getChildByName(npcName+"name")
		nameBg.setPosition(npcNameSp.x+(npcNameSp.width-nameBg.width*nameBg.scaleX)/2,npcNameSp.y+(npcNameSp.height-nameBg.height*nameBg.scaleY)/2 + deltaAniY);
		this._sceneLayer.addChildAt(nameBg,this._sceneLayer.getChildIndex(npcNameSp));
		//npc名字的红点
		let reddot:BaseBitmap = BaseBitmap.create("public_dot2");
		reddot.name=npcName+"dot";
		// nameBg.visible = false;
		this._npcRedList.push(reddot);
		if(PlatformManager.checkIsTextHorizontal() && npcName == "atkrace"){
			nameBg.y += 3;
		}
		
		//如果这个npc配置了红点  根据配置设置红点位置 如果没有配置取默认
		if(this.reddotPosCfg && this.reddotPosCfg[npcName])
		{
			reddot.setPosition(this.reddotPosCfg[npcName].x + this._mapLayer.x,this.reddotPosCfg[npcName].y + this._mapLayer.y + deltaAniY);

		} else {
			let cky = npcName+"name";
			let {x,y,scale}=<{x:number,y:number,scale?:number}>this.namePosCfg[cky];
			// reddot.setPosition(npcNameSp.x+npcNameSp.width-reddot.width+5,npcNameSp.y-10 + deltaAniY);
			reddot.setPosition(this._mapLayer.x + x+npcNameSp.width-reddot.width+5, this._mapLayer.y + y-10 + deltaAniY);
		}

		let ckey:string=npcName+"name";
		if (this.namePosCfg[ckey] && this.namePosCfg[ckey].scale)
		{	
			let s = this.namePosCfg[ckey].scale;
			nameBg.setScale(s);
			reddot.setScale(s);
			let npcnameRect = Config.SceneCfg.getNpcnameRect();
			if (npcnameRect != null) {
				reddot.x -=(this.reddotPosCfg[npcName].x-this.namePosCfg[ckey].x)*(1-s);
				reddot.y -=6;
				nameBg.y +=7;
			}
		}

		// if(PlatformManager.checkIsTextHorizontal())
		// {
		// 	reddot.setPosition(npcNameSp.x+npcNameSp.width*npcNameSp.scaleX-reddot.width/2,npcNameSp.y-10);
		// }
		// else
		// {
		// 	reddot.setPosition(npcNameSp.x+npcNameSp.width-reddot.width+5,npcNameSp.y-10);
		// }
		this._sceneLayer.addChild(reddot);
		return nameBg;
	}
	private hideNpcMessage(npcName:string):void
	{
		if(this._sceneLayer)
		{	

			if (this.bubbleCfg && this.bubbleCfg[npcName])
			{
				//气泡
				for (let k in this._bubbleList)
				{
					if (this._bubbleList[k] == npcName)
					{
						this._bubbleList.splice(Number(k),1);
						break;
					}
				}
			}
			let npcMessageName:string = this.getNpcMessageName(npcName);
			let npcMessage:BaseLoadBitmap = <BaseLoadBitmap>this._sceneLayer.getChildByName(npcMessageName);
			if(npcMessage)
			{
				BaseLoadBitmap.release(npcMessage);
			}

			let reddot:BaseBitmap=<BaseBitmap>this._sceneLayer.getChildByName(npcName+"dot");
			if(reddot)
			{
				BaseBitmap.release(reddot);
			}


		}
	}

	protected initNPC():void
	{	
		let allkeys:string[] = Object.keys(this.posCfg);

		allkeys.sort((a,b)=>{
			let sortA = this.posCfg[a].sortId ? this.posCfg[a].sortId : 0;
			let sortB = this.posCfg[b].sortId ? this.posCfg[b].sortId : 0;
			return Number(sortA) - Number(sortB)
		});

		let className:string=this.getClassName().toLowerCase();
		for(let i:number=0; i<allkeys.length;i++)
		{	
			let key = allkeys[i];
			if(Api.switchVoApi.checkOpenShenhe())
			{
				if(key=="rank"||key=="alliance"||key=="dailyboss" ||key== "conquest" || key == "trade")
				{
					continue
				}
			}

			if(key=="skin" && !Api.switchVoApi.openCrossChat() ){
				continue;
			}
			//屏蔽特定渠道 /*|| PlatformManager.checkIsTWBSp() || PlatformManager.checkIsThSp() */ 
			// if (key=="skin" &&(PlatformManager.checkIsEnLang()   ) ){
			// 	continue;
			// }
			
			let functionName:string = "checkOpen"+App.StringUtil.firstCharToUper(key);
			if(Api.switchVoApi[functionName])
			{
				if(!Api.switchVoApi[functionName]())
				{
					continue;
				}
			}
			if(this.shadowCfg && this.shadowCfg[key])
			{
				let {x,y}=<{x:number,y:number}>this.shadowCfg[key];
				let shadow:BaseLoadBitmap=undefined;

				let resName = this.getNpcName(key)+"_shadow";
				// if (className == "homescene")
				// {	
					let newRes:string = resName + "_"+ Api.otherInfoVoApi.getCurSceneId(this._sceneName);
					if (ResourceManager.hasRes(newRes))
					{
						resName = newRes;
					}
				// }
				shadow=BaseLoadBitmap.create(resName);
				shadow.name=key+"_shadow";
				shadow.setPosition(this._mapLayer.x+x,this._mapLayer.y+y);
				this._sceneLayer.addChild(shadow);
			}

			let {x,y,scale,alpha,close,dragonBones}=<{x:number,y:number,scale?:number,alpha?:number,close?:boolean,dragonBones?:{x:number,y:number}}>this.posCfg[key];
			if(dragonBones)
			{
				// if(!App.DeviceUtil.CheckWebglRenderMode())
				// {
				// }
				dragonBones=null;
			}
			this._npcList.push(key);
			let npc:BaseLoadBitmap|BaseLoadDragonBones=undefined;
			if(dragonBones)
			{
				x+=dragonBones.x;
				y+=dragonBones.y;
				npc=App.DragonBonesUtil.getLoadDragonBones(key);
			}
			else
			{
				npc=BaseLoadBitmap.create(this.getNpcName2(key));
				let changekey = Config.SceneCfg.getChangeKey();
				if(key == changekey){
					let res = this.getChangeNpcRes(key);
					npc.setload(res);
				}
			}
			npc.name=key;
		
			npc.x=this._mapLayer.x+x;
			npc.y=this._mapLayer.y+y;
			if(!isNaN(alpha))
			{
				npc.alpha=alpha;
			}
			// npc.filters=[new egret.GlowFilter(0xff0000,1,4,4,3,1)];
			if(scale)
			{
				npc.scaleX=npc.scaleY=scale;
			}
			if (key == "wife")
			{	
				let z :number= this._sceneLayer.numChildren < 3 ? this._sceneLayer.numChildren : 3;
				this._sceneLayer.addChildAt(npc,z);
			}
			else
			{
				this._sceneLayer.addChild(npc);
			}
			

			let ckey:string=key+"name";
			if(this.namePosCfg[ckey])
			{
				let {x,y,scale}=<{x:number,y:number,scale?:number}>this.namePosCfg[ckey];
				this._npcList.push(ckey);
				let npcName:BaseLoadBitmap=undefined;
				let nameRect:egret.Rectangle=egret.Rectangle.create();
				// nameRect.setTo(0,0,35,96);   other
				// nameRect.setTo(0,0,148,30);  en
				//如果sceneCfg中配置了npcnameRect 则用配置的，如果没有配置 使用默认的
				let npcnameRect = Config.SceneCfg.getNpcnameRect();
				if (npcnameRect != null) {
					nameRect.setTo(npcnameRect.x,npcnameRect.y,npcnameRect.w,npcnameRect.h);
				} else {
					nameRect.setTo(0,0,35,96);
				}
				
				let npcNameRes:string=this.getNpcName2(ckey);
				if(Api.switchVoApi["checkOpenNew"+App.StringUtil.firstCharToUper(key)])
				{
					let result=Api.switchVoApi["checkOpenNew"+App.StringUtil.firstCharToUper(key)]();
					if(result)
					{
						if(RES.hasRes(npcNameRes+"_2"))
						{
							npcNameRes+="_2";
						}
					}
				}
				npcName=BaseLoadBitmap.create(npcNameRes,nameRect,{callback:this.checkNpcShow,callbackThisObj:this,callbackParams:[key]});
				npcName.name=ckey;
				npcName.setPosition(this._mapLayer.x+x,this._mapLayer.y+y);
				if(scale)
				{
					npcName.setScale(scale);
				}
				this._sceneLayer.addChild(npcName);
				this._npcNameList.push(npcName);
				
				let isMove:boolean=true;
				if(Api[key+"VoApi"]&&Api[key+"VoApi"].isShowNpc)
				{
					isMove=Api[key+"VoApi"].isShowNpc();
				}
				if(this.isNpcNameMove()&&isMove&&this.checkHasView(key))
				{
					let nameY:number=npcName.y;
					let moveCall:()=>void=()=>{
						egret.Tween.get(npcName).to({y:nameY+5},1000).to({y:nameY-5},1000).call(moveCall,this);
					};
					moveCall();
				}
			}
			this.checkNpcShow(key);
		}
		
		this._sceneLayer.touchEnabled=true;
		let ths=this;
		this._sceneLayer.addTouch(this.onNPCTouchHandler,this,null,true);
	}

	protected getChangeNpcNameRes(key:string):string{
		let res = `homenpc${key}name`;
		if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`homenpc${key}name_blueType`)){
			res = `homenpc${key}name_blueType`;
		}
		return res;
	}

	protected getChangeNpcRes(key:string):string{
		let str = Api.otherInfoVoApi.getDangjiaNpc();
		let res = `homenpc${key}2`;
		if(str != `` && RES.hasRes(`${res}_${str}`)){
			res += `_${str}`;
		}
		else{
			let wifeCfg = Config.WifeCfg.getWifeCfgById("101");
			if(wifeCfg.isBule()){
				res = `homenpc${key}_male`;
			}
			else{
				res = `homenpc${key}`;
			}
		}
		return res;
	}

	private formatModelToCheck(modelName:string):string
	{
		if(modelName==MessageConst.MESSAGE_MODEL_USERINFO||modelName==MessageConst.MESSAGE_MODEL_WIFESKIN)
		{
			modelName="wife";
		}
		return modelName;
	}
	private checkGuideNpc(event:egret.Event)
	{
		let data = event.data;
		App.LogUtil.log("checkGuideNpc "+data.key);
		this.checkNpcShow(data.key);
	}

	private log(str?:string)
	{
		let wbgameidArr:number[]=window["wbgameidArr"];
		// if(!wbgameidArr)
		// {
		// 	wbgameidArr=[Api.playerVoApi.getPlayerID()];
		// }
		if(wbgameidArr&&wbgameidArr.indexOf(Api.playerVoApi.getPlayerID())>-1)
		{
			if(this._log)
			{
				if(!str)
				{
					StatisticsHelper.reportGameResLoadFail(this._log);
				}
				else
				{
					this._log+=str;
				}
			}
			else if(str)
			{
				this._log+=str;
			}
		}
	}

	protected checkNpcShow(e:egret.Event|string):void
	{
		let modelName:string;
		if(typeof(e)=="string")
		{
			modelName=e;
		}
		else
		{
			modelName=e.data;
		}
		modelName = this.formatModelToCheck(modelName);
		let npc:BaseLoadBitmap|BaseLoadDragonBones=<BaseLoadBitmap|BaseLoadDragonBones>this._sceneLayer.getChildByName(modelName);
		let npcname=this._sceneLayer.getChildByName(modelName+"name");
		if(npcname==null)
		{
			 return
		}
		if (!Api.unlocklist2VoApi.checkShowOpenFunc()){
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].isShowNpc)
			{
				let isShowNpc:boolean=Api[modelName+"VoApi"].isShowNpc();
				let npcshadow=this._sceneLayer.getChildByName(modelName+"_shadow");
				if(this.posCfg[modelName]&&this.posCfg[modelName]["alpha"]!=null)
				{
					if(isShowNpc)
					{
						if(this.isNpcNameMove()&&npcname.filters!=null)
						{
							let nameY:number=npcname.y;
							let moveCall:()=>void=()=>{
								egret.Tween.get(npcname).to({y:nameY+5},1000).to({y:nameY-5},1000).call(moveCall,this);
							};
							moveCall();
						}
						App.DisplayUtil.changeToNormal(npcname);
					}
					else
					{
						App.DisplayUtil.changeToGray(npcname);
					}
				}
				else
				{
					if(npc)
					{
						npc.visible=isShowNpc;
					}
					if(npcname)
					{
						npcname.visible=isShowNpc;
					}
					if(npcshadow)
					{
						npcshadow.visible=isShowNpc;
					}
				}
			}
			else
			{
				if(!this.checkHasView(modelName))
				{
					if(npcname)
					{
						App.DisplayUtil.changeToGray(npcname);
					}
				}
			}
		}
		else{
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].isShowNpc)
			{
				let isShowNpc:boolean=Api[modelName+"VoApi"].isShowNpc();
				let npcshadow=this._sceneLayer.getChildByName(modelName+"_shadow");
				let isNeedShowEff = Api.unlocklist2VoApi.isInNeedShowEffect(modelName);
				if(this.posCfg[modelName]&&this.posCfg[modelName]["alpha"]!=null)
				{
					if(isShowNpc && !isNeedShowEff)
					{
						if(this.isNpcNameMove()&&npcname.filters!=null)
						{
							let nameY:number=npcname.y;
							let moveCall:()=>void=()=>{
								egret.Tween.get(npcname).to({y:nameY+5},1000).to({y:nameY-5},1000).call(moveCall,this);
							};
							moveCall();
						}
						// App.DisplayUtil.changeToNormal(npcname);
						npcname.visible = true;
					}
					else
					{
						// App.DisplayUtil.changeToGray(npcname);
						npcname.visible = false;
					}
				}
				else
				{
					let isShow = false;
					if (isShowNpc && !isNeedShowEff){
						isShow = true;
					}
					if(npc)
					{
						npc.visible=isShow;
					}
					if(npcname)
					{
						npcname.visible=isShow;
					}
					if(npcshadow)
					{
						npcshadow.visible=isShow;
					}
				}
			}
			else
			{
				if(!this.checkHasView(modelName))
				{
					if(npcname)
					{
						// App.DisplayUtil.changeToGray(npcname);
						npcname.visible = false;
					}
				}
			}
		}
		
		if(npc&&npc.visible&&npc.isLoaded())
		{
			this.checkShowNpcMessage(modelName);
		}

	}

	protected isNpcNameMove():boolean
	{
		return false;
	}

	private checkNpcStatus():void
	{
		for(let key in this.posCfg)
		{
			this.checkNpcShow(key);
		}
	}
	protected getNpcName(key:string):string
	{
		let className:string=this.getClassName().toLowerCase();
		return className.substr(0,className.indexOf("scene"))+"npc"+key;
	}

	protected getNpcName2(key:string):string
	{
		let changekey = Config.SceneCfg.getChangeKey();
		let className:string=this.getClassName().toLowerCase();
		let resName = className.substr(0,className.indexOf("scene"))+"npc"+key;			
		if(key == changekey)
		{
			let wifeCfg = Config.WifeCfg.getWifeCfgById("101");
			if(wifeCfg.isBule())
			{
				return `homenpc${changekey}_male`;
			}else{
				return `homenpc${changekey}`;
			}
		}
		if(key == `${changekey}name`)
		{
			return this.getChangeNpcNameRes(changekey);
		}
		if(key == `childname`){
			return this.getChangeNpcNameRes(`child`);
		}
	
		let newRes:string = resName + "_"+ Api.otherInfoVoApi.getCurSceneId(this._sceneName);
		if (ResourceManager.hasRes(newRes))
		{
			resName = newRes;
		}

		return resName;
	}

	private _log:string="";
	private _logIndex:number=0;

	private _clickNpc:BaseLoadBitmap|BaseLoadDragonBones;
	private onNPCTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
		{
			return;
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			this._logIndex++;
			this._log="";
			this.log(this.getClassName()+":idx="+this._logIndex+":stageX="+e.stageX+":stageY="+e.stageY+":localX="+e.localX+":localY="+e.localY);
			let hitKey:string=null;
			for(var key in this._npcList)
			{
				let b=this._sceneLayer.getChildByName(this._npcList[key]);
				let p = this._sceneLayer.globalToLocal(e.stageX,e.stageY);
				let hitMaxY:number=-9999;
				let ofp = this._sceneLayer.localToGlobal(0,0);
				this.log("::"+this._npcList[key]+":b::"+b.x+":"+b.y+":"+b.width+":"+b.height+":ofp::"+ofp.x+":"+ofp.y+":p::"+p.x+":"+p.y);
				let hitTest = GameData.isSupportHitTestPoint;
				if (this._isScroll || PlatformManager.checkIsTWBSp() && Api.playerVoApi.getPlayerID() == 47006324)
				{
					hitTest = false;
				}
				if(b.hitTestPoint(Math.floor(e.localX+ofp.x*this.scaleX),Math.floor(e.localY+(ofp.y+GameData.layerPosY)*this.scaleY),hitTest))
				{
					this.log("::hit="+this._npcList[key]);
					//处理点击逻辑
					// alert(this._npcList[key]);
					if(b.y>hitMaxY)
					{
						hitMaxY=b.y;
						hitKey=this._npcList[key];
						this.log("::find="+hitKey);
					}
				}
			}
			// let clickNpc:BaseBitmap=null;
			if(hitKey)
			{
				if(hitKey.indexOf("name")>-1)
				{
					hitKey=hitKey.substring(0,hitKey.indexOf("name"));
				}
				this._clickNpc=<BaseLoadBitmap|BaseLoadDragonBones>this._sceneLayer.getChildByName(hitKey);
				if(this._clickNpc&&this._clickNpc.visible==false)
				{
					this.log("::"+hitKey+"=!visible");
					this._clickNpc=null;
					return;
				}
				// hitKey = this.formatModelToCheck(hitKey);
				if(Api.rookieVoApi.isInGuiding)
				{
					if(!this.guideNeedTouchCfg[hitKey])
					{
						this.log("::isInGuidingCfg=null");
						this._clickNpc=null;
					}
				}
				else if(Api.rookieVoApi.isGuiding){
					let key = Api.rookieVoApi.curGuideKey;
					if(key && key!=hitKey)
					{
						this.log("::curGuideKey=null");
						this._clickNpc=null;
					}
					else if (hitKey=="affair" && Api.rookieVoApi.curStep == "child_1")
					{
						this.log("::affair=null");
						this._clickNpc=null;
					}
				}
			}
		}
		//功能解锁特效开关判断
		if (Api.unlocklist2VoApi.checkShowOpenFunc()){
			if (this._clickNpc){
				let hitKey=this._clickNpc.name;
				App.LogUtil.log("hitKey "+hitKey);
				if(hitKey)
				{
					if (Api.unlocklist2VoApi.isInUnlockList(hitKey)){
						if (Api.unlocklist2VoApi.isInNeedShowEffect(hitKey)){
							return ;
						}
						else{
							if (Api[hitKey+"VoApi"] && Api[hitKey+"VoApi"].isShowNpc){
								if (!Api[hitKey+"VoApi"].isShowNpc()){
									return;
								}
							}
						}
					}
					
				}
			}
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			if(this._clickNpc)
			{
				if(this.posCfg[this._clickNpc.name].touchDown===false)
				{}
				else
				{
					this._clickNpc.alpha=0.3;
				}
				this.log("::touchDown="+(this.posCfg[this._clickNpc.name].touchDown===false));
			}
			this.log();
		}
		else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
			if(this._clickNpc)
			{
				if(this.posCfg[this._clickNpc.name].touchDown===false)
				{}
				else
				{
					this._clickNpc.alpha=0;
				}
				this._clickNpc=null;
			}
		}
		if(e.type==egret.TouchEvent.TOUCH_END)
		{
			if(this._clickNpc)
			{
				if(this._clickNpc)
				{
					if(this.posCfg[this._clickNpc.name].touchDown===false)
					{}
					else
					{
						this._clickNpc.alpha=0;
					}
				}
				let hitKey=this._clickNpc.name;
				if(hitKey)
				{
					if(Api[hitKey+"VoApi"]&&Api[hitKey+"VoApi"].isShowNpc)
					{
						let isShowNpc:boolean=Api[hitKey+"VoApi"].isShowNpc();
						if(isShowNpc==false&&this.posCfg[hitKey]&&this.posCfg[hitKey].alpha!=null)
						{
							this._clickNpc=null;
							let lockedStr:string=Api[hitKey+"VoApi"].getLockedString?Api[hitKey+"VoApi"].getLockedString():LanguageManager.getlocal("sysWaitOpen");
							App.CommonUtil.showTip(lockedStr?lockedStr:LanguageManager.getlocal("sysWaitOpen"));
							return;
						}
					}

					ViewController.getInstance().openViewByFunName(hitKey);

					
				}
				this._clickNpc=null;
			}
		}
	}

	private checkHasView(modelName:string):boolean
	{
		if (modelName == "palace") {
			modelName = "palaceNew"; // 因为老皇宫代码和资源都删除了，所以这块要特殊处理
		}
		let viewClassName:string=App.StringUtil.firstCharToUper(modelName)+"View";
		return egret.hasDefinition(viewClassName);
	}

	protected setLayerPosition():void
	{
		this._mapLayer.y=GameConfig.stageHeigth-this._mapLayer.height;
	}

	protected tick():void
	{
		if(this.posCfg)
		{
			for(let key in this.posCfg)
			{
				this.checkShowNpcMessage(key);
			}
			this.checkShowBubble();
		}

		if (this._sceneName == "cityScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName)=="202")
		{
			if (Api.otherInfoVoApi.getSceneResName(this._sceneName) != this._curSceneBg)
			{
				this._curSceneBg = Api.otherInfoVoApi.getSceneResName(this._sceneName);
				ResourceManager.loadItem(this._curSceneBg,this.resetSceneBg,this);
			}
		}
		if (this._isScroll)
		{
			this.checkArrowReddot();
		}
	}



	private resetSceneBg():void
	{	
		if (!this._mapLayer)
		{
			return;
		}
		this._mapLayer.texture = ResourceManager.getRes(this._curSceneBg);
		this.setLayerPosition();
		let cId:string = Api.otherInfoVoApi.getCurSceneId(this._sceneName);

		//通用特效
		if(Config.SceneeffectCfg.hasCommonEff(cId)){
			this._effectLayer.showCommonSceneEffect(cId);
			this._effectLayer.y = this._mapLayer.y;
		}
		else if (this._effectLayer.sceneType)
		{
			this._effectLayer.hideSceneEffect();
		}

		if (Config.SceneeffectCfg.hasSceneEffect(cId))
		{
			this._effectLayer.y = 0;
			this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
		}
		
		this.initBuildBg();
	}


	protected checkShowBubble():void
	{
		if (Api.switchVoApi.checkopenBubble()==true && GameData.serverTime%5 == 0 )
		{
			if (this._bubbleList.length>0 && Api.rookieVoApi.isInGuiding == false)
			{
				this._bubbleShowIdx++;
				if (this._bubbleShowIdx>=this._bubbleList.length)
				{
					this._bubbleShowIdx=0;
				}
				let showName:string = this._bubbleList[this._bubbleShowIdx];
				let bulle:BubbleTip = new BubbleTip();
				bulle.init(showName,this.bubbleCfg[showName].length);	
				let npcNameSp = this._sceneLayer.getChildByName(showName+"name");
				let posX:number = npcNameSp.x + this.bubbleCfg[showName].x + 15;
				if (posX + bulle.width/2 + 5 > this._sceneLayer.width)
				{
					posX = this._sceneLayer.width -  bulle.width/2 - 5;
				}
				bulle.setPosition(posX,npcNameSp.y+ this.bubbleCfg[showName].y + bulle.height/2);
				this._sceneLayer.addChild(bulle);
			}
		}
	}

	protected getResourceList():string[]
	{
		let thisClassName:string=egret.getQualifiedClassName(this);
		thisClassName=App.StringUtil.firstCharToLower(thisClassName);

		this._curSceneBg =  Api.otherInfoVoApi.getSceneResName(thisClassName);
		let resArr:string[]=[this._curSceneBg];
		resArr.push("scene_arrow");
		// let bgName:string=this.getSoundBgName();
		// if(RES.hasRes(bgName)&&bgName.indexOf("home")<0)
		// {
		// 	resArr.push(bgName);
		// }
		return resArr;
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.bgLayer;
	}

	public show(isfromShow?:boolean):void
	{
		Api.rookieVoApi.hiddenRookieView();
		if(this.isShow())
		{	
			this._isfromShow = isfromShow;
			NetLoading.show();
			this._curSceneBg = Api.otherInfoVoApi.getSceneResName(this._sceneName);
			ResourceManager.loadItem(this._curSceneBg,this.showLoadingBgCallback,this);
		}
		else
		{
			super.show();
		}
	}
	public hide(isDispose?:boolean):void
	{
		if(isDispose)
		{
			super.hide();
		}
		else
		{
			if(this.parent)
			{
				this.parent.removeChild(this);
			}
		}
	}
	// protected resGroupLoadError():void
	// {
	// 	super.hideLoadingMask();
	// 	super.hide();
	// }

	protected refreshAfterShow():void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE,{sceneId:this.getClassName()});
		this.playBg();
		
		if (!this._isfromShow){
			this.sceneEnterAni();
		}

		if(ViewController.getInstance().checkHasShowedView() && !Api.rookieVoApi.isGuiding)
		{
			return;
		}
		if(this.posCfg && this.posCfg[Api.rookieVoApi.curGuideKey] ){
				Api.rookieVoApi.checkWaitingGuide();
				// Api.rookieVoApi.curGuideKey = null;
			}
			Api.rookieVoApi.showRookieView();
	}

	private checkChangeBg(event:egret.Event)
	{
		let sid:string  = event.data.id;

		this._isCfgInit = false;
		this.initCfg();

		this._sceneLayer.removeChildren();

		this._npcList.length = 0;


		for (var k1 in this._npcNamebgList) {
            var v1 = this._npcNamebgList[k1];
			egret.Tween.removeTweens(v1);
            v1.dispose();
        }
		this._npcNamebgList.length = 0;

		for (let k2 in this._npcRedList) {
            let v2 = this._npcRedList[k2];
			egret.Tween.removeTweens(v2);
            v2.dispose();
        }
		this._npcRedList.length = 0;

		let sceneResName:string = Api.otherInfoVoApi.getSceneResName(this._sceneName);//sceneResName
		this._curSceneBg = sceneResName;
		this._mapLayer=BaseBitmap.create(sceneResName);
		this._sceneLayer.addChild(this._mapLayer);
		this.setLayerPosition();
		this.checkLayerScroll();
		this.checkScrollEffect();
		this.checkLayerScroll(true);
		this._sceneLayer.removeChild(this._mapLayer);
		this._sceneLayer.addChild(this._mapLayer);
		this._sceneLayer.width = this._mapLayer.width;

		if (this._preLayer)
		{
			this._sceneLayer.removeChild(this._preLayer);
			this._sceneLayer.addChild(this._preLayer);
		}
		

		let cId:string = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
		if (Config.SceneeffectCfg.hasSceneEffect(cId))
		{
			this._effectLayer.y = 0;
			this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
		}
		else if (this._effectLayer.sceneType)
		{
			this._effectLayer.hideSceneEffect();
		}
		
		this._sceneLayer.addChild(this._effectLayer);
		// this._effectLayer=new SceneEffect();
		// this._sceneLayer.addChild(this._effectLayer);

		// if(Config.SceneeffectCfg.hasSceneEffect(cId))
		// {
		// 	this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
		// }
		//通用特效
		if(Config.SceneeffectCfg.hasCommonEff(cId)){
			this._effectLayer.showCommonSceneEffect(cId);
			this._effectLayer.y = this._mapLayer.y;
		}

		this._maskLayer=new BaseDisplayObjectContainer();
		this._sceneLayer.addChild(this._maskLayer);

		this.initBuildBg();

		this.initNPC();

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_SCENESCROLL);
		// this.refreshAfterShow();
		
	}

	protected initBuildBg():void
	{
		if (this._maskTab.length>0)
        {
            for (var k1 in this._maskTab) {
                var v1 = this._maskTab[k1];
                egret.Tween.removeTweens(v1);
                v1.dispose();
            }
			this._maskTab.length = 0;
        }

		if (this.buildBgCfg)
		{
			for(let key in this.buildBgCfg)
			{
				let resName = this._curSceneBg+ "_"+key;
				let mask:BaseLoadBitmap=BaseLoadBitmap.create(resName);
				mask.setPosition(this._mapLayer.x+this.buildBgCfg[key].x,this._mapLayer.y+this.buildBgCfg[key].y);
				this._maskLayer.addChild(mask);
				this._maskTab.push(mask);
			}
		}
	}

	private showLoadingBgCallback():void
	{
		NetLoading.hide();
		this.resetSceneBg();
		if(!this.parent)
		{
			this.getParent().addChild(this);
		}
		this.refreshAfterShow();
	}

	public sceneEnterAni()
	{
		if( ! Api.switchVoApi.checkOpenGooutAni() ){
			return;
		}
		for (let index = 0; index < this._npcNameList.length; index++) {
			let element = this._npcNameList[index];
			
			let npcname:string = element.name.substring(0,element.name.length-4);
			let namebg2 = this.getNpcMessage(npcname);;
			//let namebg = this._npcNamebgList[index];
			// let redpoint = this._npcRedList[index];
			let redpoint = <BaseBitmap>this._sceneLayer.getChildByName(npcname+"dot");
			
			if(namebg2){
				namebg2.visible = false;
			}
			if(redpoint){
				redpoint.visible = false;
			}
			element.alpha = 0;
			let oldy = element.y;
			// element.y -= 10;
			egret.Tween.removeTweens(element);
			egret.Tween.get(element,{loop:false}).wait(500).to({y: oldy-10}, 0).to({alpha:1.0,y:oldy},300,egret.Ease.sineOut).call(()=>{
				if(namebg2){
					namebg2.visible = true;
				}
				if(redpoint){
					redpoint.visible = true;
				}
			});
		}
	}
	public sceneExitAni()
	{
		if( ! Api.switchVoApi.checkOpenGooutAni() ){
			return;
		}
	}
	private addEff():void{
		let view = this;
	}

	protected freshEff():void{
		let view = this;
	}

	protected checkScrollEffect():void{
		if (this._mapLayer2)
		{
			this._mapLayer2.dispose();
			this._mapLayer2=null;
		}
		if (this._mapLayer3)
		{
			this._mapLayer3.dispose();
			this._mapLayer3=null;
		}
		if (this._mapLayer4)
		{
			this._mapLayer4.dispose();
			this._mapLayer4=null;
		}
		if (this._mapGuang)
		{
			this._mapGuang.dispose();
			this._mapGuang=null;
		}
		if (this._preLayer)
		{
			this._preLayer.dispose();
			this._preLayer=null;
		}
		if (this._isScroll)
		{
			if (this._sceneName == "cityScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName)=="205")
			{	
				let rect2 = new egret.Rectangle();
				rect2.setTo(0,0,1720,344);
				this._mapLayer2=BaseLoadBitmap.create("cityscene_scroll_2",rect2);
				this._mapLayer2.y = GameConfig.stageHeigth-1136;
				let rect3 = new egret.Rectangle();
				rect3.setTo(0,0,1520,418);
				this._mapLayer3=BaseLoadBitmap.create("cityscene_scroll_3",rect3);					
				this._mapLayer3.y = GameConfig.stageHeigth-1136;
				let rect4 = new egret.Rectangle();
				rect4.setTo(0,0,1284,418);
				this._mapLayer4=BaseLoadBitmap.create("cityscene_scroll_4",rect4);					
				this._mapLayer4.y = GameConfig.stageHeigth-1136;

				// 大地图光
				this._mapGuang = ComponentManager.getCustomMovieClip("cityscene_guang",7,200);
				this._mapGuang.width = 300;
				this._mapGuang.height = 300;
				this._mapGuang.setScale(2);
				this._mapGuang.x = 370;
				this._mapGuang.y = 0;
				this._mapGuang.playWithTime();
				this._mapGuang.blendMode = egret.BlendMode.ADD; 

				
				this._sceneLayer.addChild(this._mapLayer4);
				this._sceneLayer.addChild(this._mapLayer3);
				this._sceneLayer.addChild(this._mapLayer2);
				this._sceneLayer.addChild(this._mapGuang);
			}
			else if (this._sceneName == "homeScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName)=="106")
			{
				
				let rect2 = new egret.Rectangle();
				rect2.setTo(0,0,1654,553);
				let rect3 = new egret.Rectangle();
				rect3.setTo(0,0,1540,602);
				let rect4 = new egret.Rectangle();
				rect4.setTo(0,0,1413,534);

				this._mapLayer2=BaseLoadBitmap.create("homescene_scroll_2",rect2);
				this._mapLayer2.y = GameConfig.stageHeigth-1136+100;

				this._mapLayer3=BaseBitmap.create("homescene_scroll_3");
				this._mapLayer3.y = GameConfig.stageHeigth-1136;

				this._mapLayer4=BaseBitmap.create("homescene_scroll_4");
				this._mapLayer4.y = GameConfig.stageHeigth-1136;


				this._sceneLayer.addChild(this._mapLayer4);
				this._sceneLayer.addChild(this._mapLayer3);
				this._sceneLayer.addChild(this._mapLayer2);


				this._preLayer = BaseLoadBitmap.create("homescene_scroll_1");
				this._preLayer.y = GameConfig.stageHeigth-1136;
				this._sceneLayer.addChild(this._preLayer);
			}

			if (!this._leftArrow)
			{
				this._leftArrow = new BaseDisplayObjectContainer();
				this._leftArrow.setPosition(77,GameConfig.stageHeigth/2-40);
				this.addChild(this._leftArrow);

				
				let arrow1 = ComponentManager.getCustomMovieClip("scene_arrow",10);
				arrow1.scaleX = -1;
				this._leftArrow.addChild(arrow1);
				
				

				this._rightArrow = new BaseDisplayObjectContainer();
				this._rightArrow.setPosition(GameConfig.stageWidth-77,GameConfig.stageHeigth/2-40);
				this.addChild(this._rightArrow);
				let arrow2 = ComponentManager.getCustomMovieClip("scene_arrow",10);
				this._rightArrow.addChild(arrow2);

				arrow1.playWithTime(0);
				arrow2.playWithTime(0);

				App.CommonUtil.addIconToBDOC(this._leftArrow);
				App.CommonUtil.addIconToBDOC(this._rightArrow);

				let red1 = this._leftArrow.getChildByName("reddot");
				let red2 = this._rightArrow.getChildByName("reddot");

				red1.x = -63;
				red1.y = 8;
				red2.x = 38;
				red2.y = red1.y;

				// egret.Tween.get(this._leftArrow,{loop:true})
				// .to({scaleX:0.8,scaleY:0.8},500)
				// .to({scaleX:1,scaleY:1},500);

				// egret.Tween.get(this._rightArrow,{loop:true})
				// .to({scaleX:-0.8,scaleY:0.8},500)
				// .to({scaleX:-1,scaleY:1},500);
			}
			this._leftArrow.visible = true;
			this._rightArrow.visible = true;
		}
		else
		{
			if (this._leftArrow)
			{
				this._leftArrow.visible = false;
			}
			if (this._rightArrow)
			{
				this._rightArrow.visible = false;
			}
		}

	}

	private checkArrowShow():void
	{
		if (this._leftArrow)
		{
			this._leftArrow.visible = this._sceneScroll.scrollLeft>10;
		}
		if (this._rightArrow)
		{
			this._rightArrow.visible = (this._mapLayer.width-GameConfig.stageWidth-this._sceneScroll.scrollLeft)>10;
		}
	}

	private checkArrowReddot():void
	{
		if (!this._leftArrow || !this._rightArrow)
		{
			return;
		}
		let leftRed:boolean = false;
		let rightRed:boolean = false;

		for(let key in this.posCfg)
		{
			let reddot:BaseBitmap=<BaseBitmap>this._sceneLayer.getChildByName(key+"dot");
			if (reddot)
			{
				if (reddot.x+reddot.width < this._sceneScroll.scrollLeft)
				{
					leftRed = true;
				}
				else if (reddot.x > this._sceneScroll.scrollLeft+GameConfig.stageWidth)
				{
					rightRed = true;
				}
				if (leftRed&&rightRed)
				{
					break;
				}
			}
		}

		if (leftRed)
		{	
			App.CommonUtil.addIconToBDOC(this._leftArrow);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._leftArrow);
		}
		if (rightRed)
		{
			App.CommonUtil.addIconToBDOC(this._rightArrow);
		}
		else
		{
			App.CommonUtil.removeIconFromBDOC(this._rightArrow);
		}

	}

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.checkNpcStatus,this);
		this._npcList.length=0;
		if(this._sceneLayer)
		{
			this._sceneLayer.dispose();
			this._sceneLayer=null;
		}
		this._mapLayer=null;
		this._effectLayer = null;
		// this._skyLayer=null;
		this._clickNpc=null;
		this._isCfgInit=false;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.refreshMode,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW,this.checkGuideNpc,this);
		let thisClassName:string=egret.getQualifiedClassName(this);
		thisClassName=thisClassName.toLowerCase();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGEBG+thisClassName,this.checkChangeBg,this);
		this._bubbleList.length = 0;
		this._bubbleShowIdx = 0;
		this._curSceneBg = "";
		this._sceneName = "";
		this._maskTab.length = 0;
		this.buildBgCfg = null;
		this._maskLayer = null;
		//动效
		this._npcNameList.length = 0;
		for (let k1 in this._npcNamebgList) {
            let v1 = this._npcNamebgList[k1];
			egret.Tween.removeTweens(v1);
            v1.dispose();
        }
		this._npcNamebgList.length = 0;
		for (let k2 in this._npcRedList) {
            let v2 = this._npcRedList[k2];
			egret.Tween.removeTweens(v2);
            v2.dispose();
        }
		this._npcRedList.length = 0;
		this._isfromShow = false;

		//拖动
		this._sceneScroll = null;
		this._isScroll = false;
		this._mapLayer2 = null;
		this._mapLayer3 = null;
		this._mapLayer4 = null;
		this._mapGuang = null;
		this._preLayer = null;

		this._leftArrow = null;
		this._rightArrow = null;

		super.dispose();
	}
}