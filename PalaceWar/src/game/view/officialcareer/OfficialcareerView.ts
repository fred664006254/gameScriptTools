/**
 * 仕途回忆
 * author shaoliang
 * date 2019/4/12
 * @class OfficialcareerView
 */
class OfficialcareerView extends CommonView
{	
	private _sceneLayer:BaseDisplayObjectContainer;
	private _clickNpc:BaseBitmap = null;
	private _npcList:string[]=[];
	private _partTab:Object = null;
	private _openKey:string = null;
	private _cloudEffect: CustomMovieClip = null;

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"officialcareer_bg",`acliangbiographyeffect_cloudeffect1`,
					]);
	}

	protected initBg():void
	{
		this.viewBg = BaseBitmap.create("officialcareer_bg");
		this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
		this.addChild(this.viewBg);
	}

	protected getRuleInfo():string{
		let str = `officialcareerRuleInfo`;
		return str;
	}

	protected clickRuleBtnHandler(param:any):void
	{
		let keyParam = this.getRuleInfoParam();
		let msg = '';
		let extra = this.getExtraRuleInfo();
		if(extra && extra !== ''){
			msg = extra;
		}
		else{
			let str = `officialcareerRuleInfo`;
			msg = LanguageManager.getlocal(str);
			if(Api.switchVoApi.checkOpenQingYuanHuiJuan()){
				msg += "\n" + LanguageManager.getlocal(`officialcareerRuleInfo_qingyuan`);
			}
			if(Api.switchVoApi.checkTitleUpgrade()){
				msg += "\n" + LanguageManager.getlocal(`officialcareerRuleInfo_diwang`);
			}
			if(Api.switchVoApi.checkOpenBiography()){
				msg += "\n" + LanguageManager.getlocal(`officialcareerRuleInfo_liezhuanbenji`);
			}
		}
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,msg);
	}

	protected getTitleStr():string
	{
		return "officialcareer";
	}

	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_ROOKIE_STORY;
	}

	public initView():void
	{
		this._sceneLayer=new BaseDisplayObjectContainer();
		this.addChild(this._sceneLayer);
		
		this._partTab = {
			storyrecall:{
				x:274,
				bottom:301,
				open:Api.switchVoApi.checkOpenStoryRecall()
			}, 
			titleupgrade:{
				x:215,
				bottom:645,
				open:Api.switchVoApi.checkTitleUpgrade(),
			},
			func2:{
				x:72,
				bottom:386
			},
			qingyuan:{
				x:490,
				bottom:713,
				open:Api.switchVoApi.checkOpenQingYuanHuiJuan(),
			},
			func4:{
				x:80,
				bottom:751,
				open:Api.switchVoApi.checkOpenBiography(),
			},
		};

		let allkeys:string[] = Object.keys(this._partTab);

		for(let i:number=0; i<allkeys.length;i++)
		{	
			let key = allkeys[i];
			this._npcList.push(key);
			
			let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			container.name = key;
			

			let npc:BaseBitmap = BaseBitmap.create("officialcareer_"+key);
			container.addChild(npc);

			let nameStr:string = "officialcareer_waitingopen";
			if (this._partTab[key].open == true)
			{
				nameStr = "officialcareer_"+ key +"_name";
			}
			let namePic:BaseBitmap = BaseBitmap.create(nameStr);
			namePic.name = nameStr;
			let alpha:BaseBitmap = BaseBitmap.create("public_9_viewmask");
			alpha.width =namePic.width;
			alpha.height =namePic.height+20;
			alpha.y = npc.height;
			alpha.alpha = 0.1;
			container.addChild(alpha);

			if (npc.width > alpha.width)
			{
				alpha.x = npc.width/2- alpha.width/2;
			}
			else
			{
				npc.x = alpha.width/2- npc.width/2;
			}
			container.anchorOffsetX = container.width/2;
			container.anchorOffsetY = container.height/2;
			container.setPosition(this._partTab[key].x+container.width/2,GameConfig.stageHeigth- this._partTab[key].bottom+container.height/2);

			namePic.setPosition(container.x-namePic.width/2,container.y+npc.height/2-namePic.height/2);
			this._sceneLayer.addChild(namePic);
			this._sceneLayer.addChild(container);

			// if(key == `titleupgrade` && this._partTab[key].open == true){
			// 	this._cloudEffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_cloudeffect", 10, 70);
			// 	let cloudBM = BaseBitmap.create("acliangbiographyeffect_cloudeffect1");
			// 	this._cloudEffect.anchorOffsetX = cloudBM.width / 2;
			// 	this._cloudEffect.anchorOffsetY = cloudBM.height / 2;
			// 	this._cloudEffect.setPosition(container.x, container.y);
			// 	this._cloudEffect.touchEnabled = false;
			// 	container.name = `titleupgrade`;
			// }
			let view = this;
			container.addTouch((event:egret.TouchEvent,iconContainer:BaseDisplayObjectContainer,hitKey:string)=>{
				switch(event.type)
				{
					case egret.TouchEvent.TOUCH_BEGIN:
						iconContainer.setScale(0.9);
					break;
					case egret.TouchEvent.TOUCH_CANCEL:
						iconContainer.setScale(1);
					break;
					case egret.TouchEvent.TOUCH_END:
						iconContainer.setScale(1);

						if (view._partTab[hitKey].open == true)
						{	
							if (hitKey == "storyrecall")
							{
								if (Api.challengeVoApi.getCurBigChannelId() <= 1)
								{
									App.CommonUtil.showTip(LanguageManager.getlocal("storyrecall_noRecord"));
								}
								else
								{									
									view._openKey = hitKey;
									view.openViewHandle();
								}
							}
							//情缘绘卷
							else if(hitKey == "qingyuan"){
								view._openKey = hitKey;
								view.openViewHandle();
							}
							else if(hitKey == `titleupgrade`){
								view._openKey = hitKey;
								view.openViewHandle();
							}
							else if(hitKey == `func4`){
								view._openKey = "biography";
								view.openViewHandle();
							}
						}
						else
						{
							App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
						}

					break;
				}
			},this,[container,key]);
		}
		if(this._cloudEffect){
			this.addChild(this._cloudEffect);
		}
		// this._sceneLayer.touchEnabled=true;
		// this._sceneLayer.addTouch(this.onNPCTouchHandler,this,null);	
		this.tick();	

		this.anchorOffsetX = GameConfig.stageWidth / 2;
		this.anchorOffsetY = GameConfig.stageHeigth / 2;
		this.x = GameConfig.stageWidth / 2;
		this.y = GameConfig.stageHeigth / 2;
    }

	// private onNPCTouchHandler(e:egret.TouchEvent):void
	// {
	// 	if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
	// 	{
	// 		return;
	// 	}
	// 	if(e.type==egret.TouchEvent.TOUCH_BEGIN)
	// 	{

	// 		let hitKey:string=null;
	// 		for(var key in this._npcList)
	// 		{
	// 			let b=this._sceneLayer.getChildByName(this._npcList[key]);

	// 			let checkRect:egret.Rectangle=egret.Rectangle.create();
	// 			checkRect.setTo(b.x-b.width/2,b.y-b.height/2,b.width,b.height);
	// 			if (checkRect.contains(e.stageX,e.stageY))
	// 			{
	// 				hitKey=this._npcList[key];
	// 			}
				
	// 			// let p = this._sceneLayer.globalToLocal(e.stageX,e.stageY);
	// 			// let hitMaxY:number=-9999;
	// 			// let ofp = this._sceneLayer.localToGlobal(0,0);
	// 			// if(b.hitTestPoint(Math.floor(e.localX+ofp.x*this.scaleX),Math.floor(e.localY+(ofp.y+GameData.layerPosY)*this.scaleY),GameData.isSupportHitTestPoint))
	// 			// {
	// 			// 	if(b.y>hitMaxY)
	// 			// 	{
	// 			// 		hitMaxY=b.y;
	// 			// 		hitKey=this._npcList[key];
	// 			// 	}
	// 			// }
	// 		}

	// 		if(hitKey)
	// 		{
	// 			if(hitKey.indexOf("name")>-1)
	// 			{
	// 				hitKey=hitKey.substring(0,hitKey.indexOf("name"));
	// 			}
	// 			this._clickNpc=<BaseBitmap>this._sceneLayer.getChildByName(hitKey);
	// 			if(this._clickNpc&&this._clickNpc.visible==false)
	// 			{
	// 				this._clickNpc=null;
	// 				return;
	// 			}
	// 		}
	// 	}
	// 	if(e.type==egret.TouchEvent.TOUCH_BEGIN)
	// 	{
	// 		if(this._clickNpc)
	// 		{
	// 			this._clickNpc.setScale(0.9);
	// 		}
	// 	}
	// 	else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
	// 	{
	// 		if(this._clickNpc)
	// 		{
	// 			this._clickNpc.setScale(1);
	// 			this._clickNpc=null;
	// 		}
	// 	}
	// 	if(e.type==egret.TouchEvent.TOUCH_END)
	// 	{
	// 		if(this._clickNpc)
	// 		{
	// 			if(this._clickNpc)
	// 			{
	// 				this._clickNpc.setScale(1);
	// 			}
	// 			let hitKey=this._clickNpc.name;
	// 			if(hitKey)
	// 			{	
	// 				if (this._partTab[hitKey].open == true)
	// 				{	
	// 					if (hitKey == "storyrecall")
	// 					{
	// 						if (Api.challengeVoApi.getCurBigChannelId() <= 1)
	// 						{
	// 							App.CommonUtil.showTip(LanguageManager.getlocal("storyrecall_noRecord"));
	// 						}
	// 						else
	// 						{	
								
	// 							this._openKey = hitKey;
	// 							this.openViewHandle();
	// 							// let effect = new StoryShowEffect();
	// 							// LayerManager.maskLayer.addChild(effect);
	// 							// effect.init(this.openViewHandle,this.openViewHandle2,this);

	// 							// let b=this._sceneLayer.getChildByName(hitKey);
	// 							// b.visible = false;
	// 						}
	// 					}
	// 					//情缘绘卷
	// 					else if(hitKey == "qingyuan"){
	// 						this._openKey = hitKey;
	// 						this.openViewHandle();
	// 					}
	// 					else if(hitKey == `titleupgrade`){
	// 						this._openKey = hitKey;
	// 						this.openViewHandle();
	// 						//播放下特效
	// 						// this._cloudEffect.setScale(1);
	// 						// egret.Tween.removeTweens(this._cloudEffect);
	// 						// egret.Tween.get(this).to({scaleX : 1.5, scaleY : 1.5}, 1000);
	// 						// egret.Tween.get(this._cloudEffect).wait(1000).call(() => {
	// 						// 	this._cloudEffect.setScale(8);
	// 						// 	this._cloudEffect.playWithTime(1);
	// 						// 	egret.Tween.removeTweens(this._cloudEffect);
	// 						// 	this._cloudEffect.setEndCallBack(() => {
	// 						// 		this.openViewHandle();
	// 						// 		this.setScale(1);
	// 						// 		this._cloudEffect.setScale(1);
	// 						// 	}, this)
	// 						// }, this)
	// 					}
	// 				}
	// 				else
	// 				{
	// 					App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
	// 				}
	// 			}
	// 			this._clickNpc=null;
	// 		}
	// 	}
	// }

	public tick():void{
		let view = this;
		let allkeys:string[] = Object.keys(this._partTab);
		for(let i:number=0; i<allkeys.length;i++){	
			let key = allkeys[i];
			let group = <BaseDisplayObjectContainer>this._sceneLayer.getChildByName(key);
			if(group){
				let showred = false;
				switch(key){
					case `qingyuan`:
						showred = this._partTab[key].open && Api.encounterVoApi.isShowNpc();
						break;
					case `titleupgrade`:
						showred = this._partTab[key].open && (Api.titleupgradeVoApi.checkNpcMessage() || (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement() && Api.emperorAchieveVoApi.isShowKingAchieveRedDot()));
						break;
				}
				if(showred){
					App.CommonUtil.addIconToBDOC(group);
					if(key == `qingyuan`){
						let reddot = group.getChildByName("reddot");
                    	reddot.x = 90;
                    	reddot.y = 0;
					}
				}
				else{
					App.CommonUtil.removeIconFromBDOC(group);
				}
			}
		}	
	}

	private openViewHandle():void
	{
		ViewController.getInstance().openViewByFunName(this._openKey);
		
	}

	private openViewHandle2():void
	{
		let b=this._sceneLayer.getChildByName(this._openKey);
		b.visible = true;
	}

	public closeHandler():void
	{
		PlayerBottomUI.getInstance().hide(true);
		super.hide();
	}

    public dispose():void
	{
		this._clickNpc = null;
		this._npcList.length = 0;
		this._sceneLayer = null;
		this._partTab = null;
		this._openKey = null;
		this._cloudEffect = null;
		super.dispose();
	}
}