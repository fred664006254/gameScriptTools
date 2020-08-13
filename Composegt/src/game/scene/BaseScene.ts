/**
 * author 陈可
 * date 2017/9/15
 * @class BaseScene
 */
abstract class BaseScene extends BaseLoadDisplayObjectContiner
{
	protected _sceneLayer:BaseDisplayObjectContainer;
	protected _effectLayer:BaseDisplayObjectContainer;
	protected _mapLayer:BaseBitmap;
	// 大地图的2个背景层
	protected _mapLayer2:BaseBitmap;
	protected _mapLayer3:BaseBitmap;
	protected _mapLayer4:BaseBitmap;
	protected _mapGuang:CustomMovieClip;
	protected _sceneScroll:ScrollView;
	protected _dailybossyanhuo:CustomMovieClip;
	// protected _skyLayer:BaseBitmap;
	protected _npcList:string[]=[];
	protected posCfg:Object={};
	protected shadowCfg:Object={};
	protected namePosCfg:Object={};
	protected reddotPosCfg:Object={};
	protected npcMessageCfg:Object={};
	protected guideNeedTouchCfg:Object={};
	protected bubbleCfg:Object={};
	protected _bubbleList:string[]=[];
	protected _bubbleShowIdx:number = 0;
	
	private _isCfgInit:boolean=false;
	public static scrollToPos:number = -1;
	public static readonly scrollToCenterPos:number = 640;
	private _npcNameList:BaseLoadBitmap[] = [];
	private _npcNamebgList:BaseLoadBitmap[] = [];
	private _npcRedList:BaseBitmap[] = [];
	public constructor()
	{
		super();
	}

	private initCfg():void
	{
		if(this._isCfgInit==false)
		{
			let sceneName:string= App.StringUtil.firstCharToLower(this.getClassName());
			let curCfg=Config.SceneCfg.getSceneCfgBySceneName(sceneName);
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
				
			}
		}
	}

	protected init():void
	{
		this.initCfg();
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.refreshMode,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW,this.checkGuideNpc,this);
		let thisClassName:string=egret.getQualifiedClassName(this);
		thisClassName=thisClassName.toLowerCase();
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
				if (thisClassName == "cityscene" && Api.switchVoApi.checkScrollCityScene()) {
					this._mapLayer=BaseBitmap.create("cityscene_scroll_1");
					this._mapLayer2=BaseBitmap.create("cityscene_scroll_2");
					this._mapLayer2.y = GameConfig.stageHeigth-1136;
					this._mapLayer3=BaseBitmap.create("cityscene_scroll_3");					
					this._mapLayer3.y = GameConfig.stageHeigth-1136;
					this._mapLayer4=BaseBitmap.create("cityscene_scroll_4");					
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

				} else {
					this._mapLayer=BaseBitmap.create(thisClassName);
				}
			}
			if (this._mapLayer4) {
				this._sceneLayer.addChild(this._mapLayer4);
			}
			if (this._mapLayer3) {
				this._sceneLayer.addChild(this._mapLayer3);
			}
			this._sceneLayer.addChild(this._mapLayer);
			if (this._mapGuang) {
				this._sceneLayer.addChild(this._mapGuang);
			}
			if (this._mapLayer2) {
				this._sceneLayer.addChild(this._mapLayer2);
			}
		}
		if(!this._effectLayer)
		{
			this._effectLayer=new BaseDisplayObjectContainer();
			this._sceneLayer.addChild(this._effectLayer);
		}

		this.setLayerPosition();
		if (thisClassName == "cityscene" && Api.switchVoApi.checkScrollCityScene()) {
			let rect = egret.Rectangle.create();
			rect.setTo(0,0 ,640,1136);
			let scrollView = ComponentManager.getScrollView(this._sceneLayer,rect);
			scrollView.horizontalScrollPolicy = "on";
			scrollView.verticalScrollPolicy = "off";
			scrollView.bounces=false;
			scrollView.addEventListener(egret.Event.CHANGE,()=>{
				if(Api.rookieVoApi.isGuiding)
				{
					scrollView.horizontalScrollPolicy = "off";
				}else{
					scrollView.horizontalScrollPolicy = "on";
				}
				this._mapLayer2.x = (this._mapLayer.width - this._mapLayer2.width) * (scrollView.scrollLeft / (this._mapLayer.width - GameConfig.stageWidth));
				this._mapLayer3.x = (this._mapLayer.width - this._mapLayer3.width) * (scrollView.scrollLeft / (this._mapLayer.width - GameConfig.stageWidth));
				this._mapLayer4.x = (this._mapLayer.width - this._mapLayer4.width) * (scrollView.scrollLeft / (this._mapLayer.width - GameConfig.stageWidth));
				this._mapGuang.x = (this._mapLayer2.x + this._mapLayer3.x)/2 + 370;
			},this);
			// scrollView.add
			// this._sceneLayer.addChild(scrollView);
			if (BaseScene.scrollToPos != -1) {
				scrollView.setScrollLeft(BaseScene.scrollToPos);
				scrollView.horizontalScrollPolicy = "off";
				BaseScene.scrollToPos = -1;
			} else {
				scrollView.setScrollLeft(BaseScene.scrollToCenterPos);
			}
			this.addChild(scrollView);
			this._sceneScroll = scrollView;
		} else {
			this.addChild(this._sceneLayer);
		}
		this.initNPC();
		// this._sceneLayer.anchorOffsetX = this._sceneLayer.width/2;
		// this._sceneLayer.anchorOffsetY = this._sceneLayer.height/2;
		// this._sceneLayer.x =  this._sceneLayer.width/2;
		// this._sceneLayer.y =  this._sceneLayer.height/2;

		this.refreshAfterShow();
		// App.CommonUtil.formatSeaScreen(this);
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
			if(!result)
			{
				return;
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
		}else if (npcName=="home")
		{
			if(Api.wifeVoApi.checkNpcMessage()||Api.childVoApi.checkNpcMessage()||Api.adultVoApi.checkNpcMessage())
			{
				this.showNpcMessage(npcName);
			}else{
				this.hideNpcMessage(npcName);
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
					this._npcNamebgList.push(nameBg);
					let moveCall:()=>void=()=>{
						egret.Tween.get(nameBg).to({alpha:0.5},1000).to({alpha:1},1000).call(moveCall,this);
					};
					moveCall();
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
			deltaAniY = 10;
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		//npc名字背景黄色光竖着改横着
		if(PlatformManager.checkIsTextHorizontal()&& !PlatformManager.checkIsViSp()){
			rect.setTo(0,0,150,69);
		} else {
			rect.setTo(0,0,59,133);
		}
		
		let nameBg:BaseLoadBitmap=BaseLoadBitmap.create("scenenamebg",rect);
		// nameBg.setScale(1.2);
		nameBg.name=this.getNpcMessageName(npcName);
		let npcNameSp = this._sceneLayer.getChildByName(npcName+"name")
		nameBg.setPosition(npcNameSp.x+(npcNameSp.width-nameBg.width*nameBg.scaleX)/2,npcNameSp.y+(npcNameSp.height-nameBg.height*nameBg.scaleY)/2+deltaAniY);
		this._sceneLayer.addChildAt(nameBg,this._sceneLayer.getChildIndex(npcNameSp));
		
		//npc名字的红点
		let reddot:BaseBitmap = BaseBitmap.create("public_dot2");
		reddot.name=npcName+"dot";
		nameBg.visible = false;
		// reddot.visible = false;
		this._npcRedList.push(reddot);
		
		//如果这个npc配置了红点  根据配置设置红点位置 如果没有配置取默认
		if(this.reddotPosCfg && this.reddotPosCfg[npcName])
		{
			reddot.setPosition(this.reddotPosCfg[npcName].x + this._mapLayer.x,this.reddotPosCfg[npcName].y + this._mapLayer.y + deltaAniY);

		} else {
			reddot.setPosition(npcNameSp.x+npcNameSp.width-reddot.width+5,npcNameSp.y-10 + deltaAniY);
		}
		
		this._sceneLayer.addChild(reddot);
		
		if (npcName == "dailyboss") {
			// 烟火动
			let dailybossyanhuo = ComponentManager.getCustomMovieClip("cityscene_yanhuo",7,200);
			dailybossyanhuo.width = 350;
			dailybossyanhuo.height = 250;
			dailybossyanhuo.setScale(2);
			dailybossyanhuo.x = 365;
			dailybossyanhuo.y = GameConfig.stageHeigth - 1136 - 50;
            dailybossyanhuo.playWithTime();
			dailybossyanhuo.name = "dailybossyanhuo";
			this._sceneLayer.addChildAt(dailybossyanhuo, this._sceneLayer.getChildIndex(npcNameSp));
			this._dailybossyanhuo = dailybossyanhuo;
		}
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

			if (npcName == "dailyboss") {
				if (this._dailybossyanhuo) {
					CustomMovieClip.release(this._dailybossyanhuo);
					this._dailybossyanhuo = null;
				}
			}

		}
	}

	protected initNPC():void
	{
		let npcKeyList=Object.keys(this.posCfg);
		for(var key in this.posCfg)
		{
			if(Api.switchVoApi.checkOpenShenhe())
			{
				if(key=="rank"||key=="alliance"||key=="dailyboss" ||key== "conquest" || key == "trade")
				{
					continue
				}
			}

			let functionName:string = "checkOpen"+App.StringUtil.firstCharToUper(key);
			if(Api.switchVoApi[functionName])
			{
				if(!Api.switchVoApi[functionName]())
				{
					continue;
				}
			}
			if(this.shadowCfg[key])
			{
				let {x,y}=<{x:number,y:number}>this.shadowCfg[key];
				let shadow:BaseLoadBitmap=undefined;
				shadow=BaseLoadBitmap.create(this.getNpcName(key)+"_shadow");
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
				npc=BaseLoadBitmap.create(this.getNpcName(key));
			}
			npc.name=key;
			npc.x=this._mapLayer.x+x;
			npc.y=this._mapLayer.y + this._mapLayer.height - 1136+y;
			if(!isNaN(alpha))
			{
				npc.alpha=alpha;
			}
			// npc.filters=[new egret.GlowFilter(0xff0000,1,4,4,3,1)];
			if(scale)
			{
				npc.scaleX=npc.scaleY=scale;
			}
			this._sceneLayer.addChild(npc);

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
				
				let npcNameRes:string=this.getNpcName(ckey);
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
				npcName.setPosition(this._mapLayer.x+x,this._mapLayer.y+this._mapLayer.height - 1136+y);
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
		if(npcKeyList&&npcKeyList.length>0)
		{
			this._sceneLayer.addTouch(this.onNPCTouchHandler,this,null,true);
		}
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
		let data  = event.data;
		this.checkNpcShow(data.key);
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
		if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].isShowNpc)
		{
			let isShowNpc:boolean=Api[modelName+"VoApi"].isShowNpc();
			let npcshadow=this._sceneLayer.getChildByName(modelName+"_shadow");
			if(this.posCfg[modelName]&&this.posCfg[modelName]["alpha"]!=null&&!Api.switchVoApi.checkOpenHideNPC())
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
		if(key == "wife")
		{
			let wifeCfg = Config.WifeCfg.getWifeCfgById("101");
			if(wifeCfg.isBule())
			{
				return "homenpcwife_male";
			}else{
				return "homenpcwife";
			}
		}
		if (className == "cityscene" && key.indexOf("name") == -1 && Api.switchVoApi.checkScrollCityScene()) {
			if(Api.switchVoApi.checkIsInBlueWife()&&ResourceManager.hasRes(className.substr(0,className.indexOf("scene"))+"npcscroll"+key+"_blueType"))
			{
				return className.substr(0,className.indexOf("scene"))+"npcscroll"+key+"_blueType";
			}
			return className.substr(0,className.indexOf("scene"))+"npcscroll"+key;
		} else {
			if(Api.switchVoApi.checkIsInBlueWife()&&ResourceManager.hasRes(className.substr(0,className.indexOf("scene"))+"npc"+key+"_blueType"))
			{
				return className.substr(0,className.indexOf("scene"))+"npc"+key+"_blueType";
			}
			return className.substr(0,className.indexOf("scene"))+"npc"+key;
		}
	}
	private _clickNpc:BaseLoadBitmap|BaseLoadDragonBones;
	private onNPCTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
		{
			return;
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			let hitKey:string=null;
			for(var key in this._npcList)
			{
				let b=this._sceneLayer.getChildByName(this._npcList[key]);
				let p = this._sceneLayer.globalToLocal(e.stageX,e.stageY);
				let hitMaxY:number=-9999;
				let ofp = this._sceneLayer.localToGlobal(0,0);
				if(b.hitTestPoint(Math.floor(e.localX+ofp.x*this.scaleX),Math.floor(e.localY+(ofp.y+GameData.layerPosY)*this.scaleY),GameData.isSupportHitTestPoint))
				{
					//处理点击逻辑
					// alert(this._npcList[key]);
					if(b.y>hitMaxY)
					{
						hitMaxY=b.y;
						hitKey=this._npcList[key];
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
					this._clickNpc=null;
					return;
				}
				// hitKey = this.formatModelToCheck(hitKey);
				if(Api.rookieVoApi.isInGuiding)
				{
					if(!this.guideNeedTouchCfg[hitKey])
					{
						this._clickNpc=null;
					}
				}
				else if(Api.rookieVoApi.isGuiding){
					let key = Api.rookieVoApi.curGuideKey;
					if(key && key!=hitKey&&key!="home")
					{
						// this._clickNpc=null;
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
			}
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

					if(Api[hitKey+"VoApi"]&&Api[hitKey+"VoApi"].openMainView)
					{
						Api[hitKey+"VoApi"].openMainView();
					}
					else
					{
						
						let viewClassName:string=App.StringUtil.firstCharToUper(hitKey)+"View";
							
						if(this.checkHasView(hitKey))
						{
							if(hitKey == "home")
							{
								SceneController.getInstance().goHome();
								Api.rookieVoApi.checkNextStep();
								GameData.isHomeScene = true;
								MainUI.getInstance()._goOutBtn.texture = ResourceManager.getRes("mainui_btn3");
							}else{
								ViewController.getInstance().openView(viewClassName);
							}
							
						}
						else
						{
							App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
							if(DEBUG)
							{
								ViewController.getInstance().openView(viewClassName);
							}
							
						}
					}

					
				}
				this._clickNpc=null;
			}
		}
	}

	private checkHasView(modelName:string):boolean
	{
		if(modelName == "home")
		{
			return true;
		}
		let viewClassName:string=App.StringUtil.firstCharToUper(modelName)+"View";
		return egret.hasDefinition(viewClassName);
	}

	protected setLayerPosition():void
	{
		this._mapLayer.setPosition(0,GameConfig.stageHeigth-this._mapLayer.height);
		this.setFly();
	}

	protected setFly():void
	{
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
				if (posX + bulle.width/2 + 5 > GameConfig.stageWidth)
				{
					posX = GameConfig.stageWidth -  bulle.width/2 - 5;
				}
				bulle.setPosition(posX,npcNameSp.y+ this.bubbleCfg[showName].y + bulle.height/2);
				this._sceneLayer.addChild(bulle);
			}
		}
	}

	protected getResourceList():string[]
	{
		let thisClassName:string=egret.getQualifiedClassName(this);
		thisClassName=thisClassName.toLowerCase();
		let resArr:string[];
		if (thisClassName == "cityscene" && Api.switchVoApi.checkScrollCityScene()) {
			resArr=["cityscene_scroll_1","cityscene_scroll_2","cityscene_scroll_3","cityscene_scroll_4"];
		} else {
			resArr=[thisClassName];
		}
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

	public show(isfromShow?:boolean ):void
	{
		Api.rookieVoApi.hiddenRookieView();
		if(this.isShow())
		{
			if(!this.parent)
			{
				this.getParent().addChild(this);
			}
			this.refreshAfterShow(isfromShow);
		}
		else
		{
			super.show();
		}
	}
	public hide(isDispose?:boolean):void
	{
		this.sceneExitAni();
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
	protected resGroupLoadError():void
	{
		super.hideLoadingMask();
		super.hide();
	}

	protected refreshAfterShow(isfromShow:boolean = false):void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE);
		this.playBg();
		if(!isfromShow){
			this.sceneEnterAni();
		}
		if(App.DeviceUtil.isWXgame()&&Api.switchVoApi.checkOpenFeedBack()&&!GameData.isComposeScene)
		{
			PlatformManager.feedbackButtonToggle("show")
		}

		if(ViewController.getInstance().checkHasShowedView() && !Api.rookieVoApi.isInGuiding&&!Api.rookieVoApi.curGuideKey)
		{
			return;
		}
		if(this.posCfg && this.posCfg[Api.rookieVoApi.curGuideKey] )
		{
			Api.rookieVoApi.checkWaitingGuide();
			// Api.rookieVoApi.curGuideKey = null;
		}
		Api.rookieVoApi.showRookieView();
		

	}

	public sceneEnterAni()
	{
		if( ! Api.switchVoApi.checkOpenGooutAni() ){
			return;
		}
		this.tick();
		// this._sceneLayer.scaleX = this._sceneLayer.scaleY = 0.95;
		// egret.Tween.get(this._sceneLayer,{loop:false}).wait(300).to({scaleX:1.0,scaleY:1.0},300,egret.Ease.sineOut).set({scaleX:1.0,scaleY:1.0});
		for (let index = 0; index < this._npcNameList.length; index++) {
			let element = this._npcNameList[index];
			let namebg = this._npcNamebgList[index];
			let redpoint = this._npcRedList[index];
			if(namebg){
				namebg.visible = false;
			}
			if(redpoint){
				redpoint.visible = false;
			}
			element.alpha = 0;
			let oldy = element.y;
			element.y -= 10;
			egret.Tween.get(element,{loop:false}).wait(300).to({alpha:1.0,y:oldy},300,egret.Ease.sineOut).call(()=>{
				if(namebg){
					namebg.visible = true;
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

		// this._sceneLayer.scaleX = this._sceneLayer.scaleY =1.0;
		// egret.Tween.get(this._sceneLayer,{loop:false}).wait(300).to({scaleX:0.95,scaleY:0.95},300,egret.Ease.sineInOut).set({scaleX:1.0,scaleY:1.0});
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
		this._mapLayer2=null;
		this._mapLayer3=null;
		this._mapLayer4=null;
		this._mapGuang=null;
		this._sceneScroll=null;
		this._dailybossyanhuo=null;
		// this._skyLayer=null;
		this._clickNpc=null;
		this._isCfgInit=false;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE,this.refreshMode,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW,this.checkGuideNpc,this);
		this._bubbleList.length = 0;
		this._bubbleShowIdx = 0;
		this._npcNameList = [];
		this._npcNamebgList = [];
		this._npcRedList = [];
		super.dispose();
	}
}