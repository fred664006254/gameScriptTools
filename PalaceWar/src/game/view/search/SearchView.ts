class SearchView extends CommonView
{
	private _sceneLayer:BaseDisplayObjectContainer;
	private _mapLayer:BaseBitmap;
	private _mapLayer2:BaseBitmap;
	private _npcList:string[]=[];
	private _leftText:BaseTextField;
	private _searchBtn:BaseButton;
	private _buyBtn:BaseButton;
	private _personId:string;
	private _rewards:string;
	private _bgResGroupName:string;
	private _isbgResLoaded:boolean=false;
	private _luckProgress:ProgressBar;
	private _checkBox:CheckBox;
	private _checkBox2:CheckBox;
	private _isCfgInit:boolean=false;
	private buildBgCfg:Object={};
	private cheCfg:{x:number,y:number}[]=[];
	private posCfg:Object={};
	private namePosCfg:Object={};
	private _oneKeySearchStatus:boolean=false; //这个不需要关闭清除
	private _twoKeySearchStatus:boolean=false; //这个不需要关闭清除
	private _mainTaskHandKey1:string = null;
	private _mainTaskHandKey2:string = null;
	private tipContainerArr = [];

	private _sceneType:string = "1";// 1白天 2晚上
	private _maskTab:BaseBitmap[] = [];
	private _curSceneBg:string = "";
	protected _maskLayer:BaseDisplayObjectContainer = null;
	protected _effectLayer:SceneEffect = null;
	private _switchTime:number = -1;
	private _bone:BaseLoadDragonBones = null;

	public constructor() 
	{
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getContainerY():number
	{
		return 14;
	}

    protected getBigFrame():string
	{	
		return null;
	}

	protected getResourceList():string[]
	{	
		this._curSceneBg = Api.otherInfoVoApi.getSceneResName("searchScene");

		return super.getResourceList().concat([
			this._curSceneBg,
			"progress3",
			"common_buttombigbg",
			"guide_hand",
		]);
	}

	protected showGuideAgain():string
	{
		return "search_2";
	}

	protected clickGuideAgain():void
	{
		super.clickGuideAgain();
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
		this._mainTaskHandKey1 = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
		this._mainTaskHandKey2 = null;
	}

	private initCfg():void
	{
		if(this._isCfgInit==false)
		{
			let curCfg=Config.SceneCfg.getSceneCfgBySceneName("searchScene",Api.otherInfoVoApi.getCurSceneId("searchScene"));
			this._isCfgInit=true;
			if(curCfg)
			{
				if(curCfg.posCfg)
				{
					this.posCfg=curCfg.posCfg;
				}
				if(curCfg.namePosCfg)
				{
					this.namePosCfg=curCfg.namePosCfg;
				}
				if(curCfg.cheCfg)
				{
					this.cheCfg=curCfg.cheCfg;
				}
				if(curCfg.buildBgCfg)
				{
					this.buildBgCfg=curCfg.buildBgCfg;
				}
			}
		}
	}

	protected initView():void
	{	
		this.initCfg();
		Api.rookieVoApi.checkNextStep();

		Api.mainTaskVoApi.checkShowGuide();

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SEARCH,this.refreshByModel,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		this.container.y=0;
		let sceneTopSpaceY:number=105;
		this._sceneLayer=new BaseDisplayObjectContainer();
		this.addChildToContainer(this._sceneLayer);
		let playerInfo:MainUITop = new MainUITop({showName:false});
		playerInfo.y=this.getTitleButtomY();
		this.addChildToContainer(playerInfo);

		let buttomBg:BaseBitmap=BaseBitmap.create("common_buttombigbg");
		// buttomBg.width=GameConfig.stageWidth;
		// buttomBg.height=96;
		buttomBg.touchEnabled=true;
		buttomBg.setPosition(0,GameConfig.stageHeigth-this.container.y-buttomBg.height);
		this.addChildToContainer(buttomBg);

		let luckText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuck")+LanguageManager.getlocal("syscolonDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		luckText.setPosition(20,buttomBg.y+25);
		this.addChildToContainer(luckText);

		let luckProgress:ProgressBar=ComponentManager.getProgressBar("progress3","progress3_bg",300);
		luckProgress.setPosition(luckText.x+luckText.width,luckText.y+(luckText.height-luckProgress.height)/2);
		this.addChildToContainer(luckProgress);
		let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
		luckProgress.setPercentage(value,Api.searchVoApi.getCurLuckNum()+"/"+Api.searchVoApi.getMaxLuckNum());
		this._luckProgress=luckProgress;

		let addLuckBtn:BaseButton=ComponentManager.getButton("button_add1","",this.openLuckView,this);
		addLuckBtn.setPosition(luckProgress.x+luckProgress.width+5,luckProgress.y+(luckProgress.height-addLuckBtn.height)/2);
		this.addChildToContainer(addLuckBtn);

		let leftText:BaseTextField=ComponentManager.getTextField(Api.searchVoApi.getSearchNumLocalStr(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		leftText.setPosition(luckText.x,buttomBg.y+buttomBg.height-leftText.height-25);
		this.addChildToContainer(leftText);
		this._leftText=leftText;

		if(!Api.searchVoApi.checkOneKey())
		{
			let oneKeyTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckUnlockDesc",[Api.searchVoApi.getOneKeyNeedVipLevel().toString()]),18,TextFieldConst.COLOR_WARN_GREEN);
			oneKeyTxt.setPosition(leftText.x+leftText.width+10,leftText.y + 1);
			oneKeyTxt.name="onekeyTxt";
			this.addChildToContainer(oneKeyTxt);
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkOnekeySearchHandler,this);
		}
		else
		{
			let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("searchOneKeyDesc"));
			checkBox.setPosition(luckProgress.x+luckProgress.width/2+100,leftText.y+(leftText.height-checkBox.height)/2);
			checkBox.name="onekeyCheckBox"
			this.addChildToContainer(checkBox);
			checkBox.setSelected(this._oneKeySearchStatus);
			if(PlatformManager.checkIsTextHorizontal())
			{
				checkBox.x = luckProgress.x+luckProgress.width/2+100 + 100;
			}
			this._checkBox=checkBox;
			

			let checkBox2:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("searchTwoKeyDesc"));
			checkBox2.setPosition(checkBox.x-checkBox2.width-15,checkBox.y);
			checkBox2.name="twokeyCheckBox"
			this.addChildToContainer(checkBox2);
			checkBox2.setSelected(this._twoKeySearchStatus);
			this._checkBox2=checkBox2;
			
			if(PlatformManager.checkIsTextHorizontal())
			{
				checkBox.x = luckProgress.x+luckProgress.width/2+100 + 100;
			}
			
			
			
		}

		let searchBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,this.getTitleStr(),this.lookforHandler,this);
		searchBtn.setPosition(GameConfig.stageWidth-searchBtn.width-12,App.CommonUtil.getCenterY(buttomBg,searchBtn,false));
		this.addChildToContainer(searchBtn);
		if(PlatformManager.checkIsTextHorizontal())
		{
			searchBtn.y -= 20;
		}
		this._searchBtn=searchBtn;
		

		let buyBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"recoverLeftBtn",this.recoverLeftHandler,this);
		buyBtn.setPosition(searchBtn.x,searchBtn.y);
		this.addChildToContainer(buyBtn);
		this._buyBtn=buyBtn;
		if(Api.searchVoApi.getSearchNum()>0)
		{
			searchBtn.visible=true;
			buyBtn.visible=false;
		}
		else
		{
			searchBtn.visible=false;
			buyBtn.visible=true;
		}
		let taskId = Api.mainTaskVoApi.getCurMainTaskId();
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if (taskCfg)
		{
			if (taskCfg.questType == 109){
				this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(
					searchBtn,
					searchBtn.width/2,
					0, 
					[searchBtn],
					109, 
					false, 
					function() {
						return true;
					}, 
					this
				);
				this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(
					buyBtn,
					buyBtn.width/2,
					0, 
					[buyBtn],
					109, 
					true, 
					function() {
						return true;
					}, 
					this
				);
			}
			else if (taskCfg.questType == 303){
				if (!Api.rookieVoApi.isInGuiding && (!Api.rookieVoApi.isGuiding)){
					if (Api.searchVoApi.getSearchNum()>0){
						this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(
							searchBtn,
							searchBtn.width/2,
							0, 
							[searchBtn],
							303, 
							true, 
							function() {
								return true;
							}, 
							this
						);
					}
					else{
						this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(
							buyBtn,
							buyBtn.width/2,
							0, 
							[buyBtn],
							303, 
							true, 
							function() {
								return true;
							}, 
							this
						);
					}
				}
			}
		}
		
		let sceneButtomSpaceY:number=buttomBg.height;

		if(!this._sceneLayer)
		{
			this._sceneLayer=new BaseDisplayObjectContainer();
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-this.container.y-sceneTopSpaceY-sceneButtomSpaceY);
		if(!this._mapLayer)
		{	
			this._curSceneBg = this._curSceneBg;
			this._mapLayer=BaseBitmap.create(this._curSceneBg);
			let mapY:number=GameConfig.stageHeigth-this._mapLayer.height+50;
			mapY=Math.min(0,mapY);
			this._mapLayer.setPosition(0,mapY);
			this._sceneLayer.addChild(this._mapLayer);
		}


		this._effectLayer=new SceneEffect();
		this._sceneLayer.addChild(this._effectLayer);
		this._effectLayer.y = this._mapLayer.y;
		this._maskLayer=new BaseDisplayObjectContainer();
		this._sceneLayer.addChild(this._maskLayer);


		let cId:string = Api.otherInfoVoApi.getCurSceneId("searchScene");
		this._effectLayer.showCommonSceneEffect(cId);
		if (Config.SceneeffectCfg.hasSceneEffect(cId))
		{	
			this._sceneType = this._curSceneBg.substring(this._curSceneBg.length-1,this._curSceneBg.length);
			this._effectLayer.showSceneEffect(this._sceneType, cId);
			this.initBuildBg();
			this._switchTime = 50;
			if (this._sceneType == "2")
			{
				 this._bone = App.DragonBonesUtil.getLoadDragonBones("scene_bone_303_2");
				 this._bone.setPosition(0 , 1136);
				 this._sceneLayer.addChild(this._bone);
			}
		}
		
		this.initNPC();
		this._sceneLayer.addTouch(this.onNPCTouchHandler,this,null,true);
		//,"searchbuildbg1","searchbuildbg2","searchbuildbg3"
		if (Api.otherInfoVoApi.getCurSceneId("searchScene") == "301" || Api.otherInfoVoApi.getCurSceneId("searchScene") == "302")
		{
			this._bgResGroupName = ResourceManager.loadResources(["search_che"],[],this.cheLoadCompleteHandler,null,this);
		}

		//test code 
		// if (PlatformManager.checkIsLocal() && Api.switchVoApi.checkOpenBiography())
		// {
		// 	let touchArea = BaseBitmap.create("public_9_viewmask");
		// 	touchArea.width = 120;
		// 	touchArea.height = 120;
		// 	touchArea.y = 200;
		// 	touchArea.addTouchTap(this.openBiographyView,this);
		// 	this.addChild(touchArea);
		// }

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
				let resName = this._curSceneBg+"_"+key;
				let mask:BaseLoadBitmap=BaseLoadBitmap.create(resName);
				mask.setPosition(this._mapLayer.x+this.buildBgCfg[key].x,this._mapLayer.y+this.buildBgCfg[key].y);
				this._maskLayer.addChild(mask);
				this._maskTab.push(mask);
			}
		}
	}

	private refreshByModel():void
	{
		if(this._luckProgress)
		{
			let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
			this._luckProgress.setPercentage(value,Api.searchVoApi.getCurLuckNum()+"/"+Api.searchVoApi.getMaxLuckNum());
		}
	}

	private checkOnekeySearchHandler():void
	{
		if(Api.searchVoApi.checkOneKey())
		{
			if(this.container)
			{
				let onekeyTxt:BaseTextField=<BaseTextField>this.container.getChildByName("onekeyTxt");
				if(onekeyTxt)
				{
					onekeyTxt.dispose();
				}
				if(!this._checkBox)
				{
					let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("searchOneKeyDesc"));
					checkBox.setPosition(this._luckProgress.x+this._luckProgress.width/2+100,this._leftText.y+(this._leftText.height-checkBox.height)/2);
					checkBox.name="onekeyCheckBox";
					this.addChildToContainer(checkBox);
					checkBox.setSelected(this._oneKeySearchStatus);
					if (PlatformManager.checkIsTextHorizontal()) {
						checkBox.x = this._luckProgress.x + this._luckProgress.width / 2 + 100 + 100;
					}
					this._checkBox=checkBox;
				}
				if(!this._checkBox2)
				{
					let checkBox2:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("searchTwoKeyDesc"));
					checkBox2.setPosition(this._checkBox.x-checkBox2.width-15,this._checkBox.y);
					checkBox2.name="twokeyCheckBox";
					this.addChildToContainer(checkBox2);
					checkBox2.setSelected(this._twoKeySearchStatus);
					this._checkBox2 = checkBox2;
				}
				App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkOnekeySearchHandler,this);
			}
		}
	}

	private cheLoadCompleteHandler():void
	{
		if(!this._sceneLayer)
		{
			return;
		}
		this._isbgResLoaded=true;
		let che:CustomMovieClip=ComponentManager.getCustomMovieClip("search_che",6,100);
		this._sceneLayer.addChildAt(che,this._sceneLayer.getChildIndex(this._mapLayer)+1);
		che.setPosition(this._mapLayer.x+this.cheCfg[0].x,this._mapLayer.y+this.cheCfg[0].y);
		let time=9000;


		egret.Tween.get(che,{loop:true}).call(function(che:CustomMovieClip){che.scaleX=1},this,[che]).to({x:this._mapLayer.x+this.cheCfg[1].x,y:this._mapLayer.y+this.cheCfg[1].y},time).call(function(che:CustomMovieClip){che.scaleX=-1},this,[che]).to({x:this._mapLayer.x+this.cheCfg[2].x,y:this._mapLayer.y+this.cheCfg[2].y},time).wait(1000);
		che.texture=ResourceManager.getRes("search_che1");
		che.anchorOffsetX=che.width/2;
		che.anchorOffsetY=che.height/2;
		che.playWithTime();

		let cheIndex:number=this._sceneLayer.getChildIndex(che)+1;
		for(let key in this.buildBgCfg)
		{
			let resName = "searchbuildbg"+key;
			let newRes:string = resName + "_"+ Api.otherInfoVoApi.getCurSceneId("searchScene");
			if (ResourceManager.hasRes(newRes))
			{
				resName = newRes;
			}
			let bmp:BaseLoadBitmap=BaseLoadBitmap.create(resName);
			bmp.setPosition(this._mapLayer.x+this.buildBgCfg[key].x,this._mapLayer.y+this.buildBgCfg[key].y);
			this._sceneLayer.addChildAt(bmp,cheIndex);
			// 524,141
		}
	}

	private initNPC():void
	{
		for(var key in this.posCfg)
		{
			let {x,y,scale,close,alpha}=<{x:number,y:number,scale?:number,alpha?:number,close?:boolean}>this.posCfg[key];
			this._npcList.push(key);
			let npc:BaseLoadBitmap=undefined;

			let resName = "searchnpc"+key
			let newRes:string = resName + "_"+ Api.otherInfoVoApi.getCurSceneId("searchScene");
			if (ResourceManager.hasRes(newRes))
			{
				resName = newRes;
			}
			npc=BaseLoadBitmap.create(resName);
			npc.name=key;
			// npc.addTouch(this.touchNpcHandler,this,[key]);
			if(!isNaN(scale))
			{
				npc.setScale(scale);
			}
			if(!isNaN(alpha))
			{
				npc.alpha=alpha;
			}
			npc.setPosition(this._mapLayer.x+x,this._mapLayer.y+y);
			this._sceneLayer.addChild(npc);
		}
		for(var key in this.namePosCfg)
		{
			let {x,y,scale,close}=<{x:number,y:number,scale?:number,close?:boolean}>this.namePosCfg[key];
			this._npcList.push(key);
			let npcName:BaseLoadBitmap=undefined;
			npcName=BaseLoadBitmap.create("searchnpcname"+key);
			npcName.name=key+"name";
			npcName.setPosition(this._mapLayer.x+x,this._mapLayer.y+y);
			if(scale)
			{
				npcName.setScale(scale);
			}
			this._sceneLayer.addChild(npcName);
			if(close)
			{
				App.DisplayUtil.changeToGray(npcName);
			}
			else
			{
				let nameY:number=npcName.y;
				let moveCall:()=>void=()=>{
					egret.Tween.get(npcName).to({y:nameY+5},1000).to({y:nameY-5},1000).call(moveCall,this);
				};
				moveCall();
			}
		}
		// this._sceneLayer.touchEnabled=true;
		let ths=this;
	}

	private recoverLeftHandler():void
	{
		let itemId:string=Api.searchVoApi.getNeedItem();
		let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
		// if(hasNum>0)
		// {
			// ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{itemId:itemId,callback:this.usePropHandler,handler:this});
			let itemUseCount = 1;
			let itemCount = hasNum;
			// let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(Config.ChildbaseCfg.needItem));
			// let itemName = Config.ItemCfg.getItemNameById(Config.ChildbaseCfg.needItem)
			let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
			let message: string = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" +itemUseCount, LanguageManager.getlocal("sysStrengDesc")]);
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.usePropHandler, handler: this, icon: itemCfg.icon,iconBg: itemCfg.iconBg, num: itemCount, useNum:itemUseCount,msg: message, id : Number(itemId)});
		// }
		// else
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
		// }
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
		this._mainTaskHandKey1 = null;
	}
	private usePropHandler(num:number):void
	{
		let itemId:string=Api.searchVoApi.getNeedItem();
		let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
		if(hasNum>0)
		{
			this.request(NetRequestConst.REQUEST_SEARCH_PILL,{});
		}
	}

	private _clickNpc:BaseBitmap;
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
				if(b.hitTestPoint(Math.floor(e.localX+ofp.x),Math.floor(e.localY+ofp.y+GameData.layerPosY),GameData.isSupportHitTestPoint))
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
			let clickNpc:BaseBitmap=null;
			if(hitKey)
			{
				if(hitKey.indexOf("name")>-1)
				{
					hitKey=hitKey.substring(0,hitKey.indexOf("name"));
				}
				this._clickNpc=<BaseBitmap>this._sceneLayer.getChildByName(hitKey);
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
					if(this.posCfg[hitKey].close)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
					}
					else if (hitKey=="12")
					{
						if (Api.switchVoApi.checkOpenBiography())
						{
							ViewController.getInstance().openView(ViewConst.POPUP.SEARCHBIOGRAPHYPOPUPVIEW,{});
						}
						else
						{
							App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
						}
					}
					else
					{	
						ViewController.getInstance().openView(ViewConst.POPUP.SEARCHBUILDPOPUPVIEW,hitKey);
					}
				}
				this._clickNpc=null;
			}
		}
	}

	private lookforHandler():void
	{	
		Api.rookieVoApi.checkNextStep();
		if (Api.searchVoApi.getSearchNum()<=0)
		{
			return;
		}

		let isbatch = 0;
		if(this._checkBox)
		{
			this._oneKeySearchStatus=this._checkBox.checkSelected();
		}
		if(Api.searchVoApi.checkOneKey() && this._oneKeySearchStatus){
			isbatch = 1;
		}
		this.request(NetRequestConst.REQUEST_SEARCH_PLAY,{isbatch:isbatch});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_SEARCH_PLAY)
		{
			let personIds:string[]=rData.data.personId;
			if(this._checkBox && this._checkBox.checkSelected())
			{	
				//一键寻访

				this._rewards=rData.data.rewards;
				let rewardStrArr:string[]=this._rewards?this._rewards.split("|"):[];
				if(rewardStrArr.length<1)
				{
					for(let ii:number=0;ii<personIds.length;ii++)
					{
						rewardStrArr.push("");
					}
				}
				let l:number=rewardStrArr.length;
				let rewardsShowArr:string[]=[];

				let biographyArray:any[] = rData.data.biographyArr;
				for(let i:number=0;i<l;i++)
				{
					if(rewardStrArr[i]=="")
					{
						let localStr:string=Api.searchVoApi.getPersonValueLocalStr(personIds[i]);
						if(localStr)
						{
							rewardsShowArr.push(App.StringUtil.formatStringColor(localStr,TextFieldConst.COLOR_WARN_YELLOW));
						}
					}
					else
					{
						if(rewardStrArr[i].indexOf(RewardItemConst.TYPE_INTIMACY.toString())==0)
						{
							let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(personIds[i]);
							if(itemCfg&&itemCfg.wifeId)
							{
								rewardsShowArr.push(App.StringUtil.formatStringColor(Config.WifeCfg.getWifeCfgById(itemCfg.wifeId).name+GameData.formatRewardItem(rewardStrArr[i])[0].message,TextFieldConst.COLOR_WARN_GREEN));
							}
						}
						else
						{
							let rewardItem:RewardItemVo=GameData.formatRewardItem(rewardStrArr[i])[0];
							if(!rewardItem.num)
							{
								let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(personIds[i]);
								rewardsShowArr.push(LanguageManager.getlocal("searchBuildTalk"+itemCfg.build));
							}
							else
							{
								rewardsShowArr.push(rewardItem.message);
							}
						}
					}

					if (Api.switchVoApi.checkBiography() && biographyArray)
					{
						let oneObj = biographyArray[i];
						if (oneObj && Object.keys(oneObj).length>0)
						{	
							let bcfg = Config.BiographyCfg.getCfgBgId(oneObj.id);
							let rewardItem:RewardItemVo=GameData.formatRewardItem(oneObj.rewards)[0];

							let biographyStr = LanguageManager.getlocal("search_biographyTip",[bcfg.typeName2,oneObj.name,rewardItem.message]);
							rewardsShowArr.push(App.StringUtil.formatStringColor(biographyStr,TextFieldConst.COLOR_WARN_YELLOW));
						}
					}
				}

				

				if(Api.wifeVoApi.checkWaitShowWife())
				{ 
					// this._tipMask.alpha=1;
					// this._tipMask.touchEnabled=true;
					let rData = Api.wifeVoApi.getWaitShowWife();
					// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant}); 
					Api.verifySpecialReward(rData.unlockWife,false);
					Api.verifySpecialReward(rData.unlockServant,true);
					Api.openSpecialView();
				}   
				
				if(this._tipSar.length<=0)
				{ 
					this._tipSar=this._tipSar.concat(rewardsShowArr); 
					this.playRewardTip();
				}
				else
				{
					this._tipSar=this._tipSar.concat(rewardsShowArr);
				} 

				//手动调用体力限时礼包强弹  一键寻访
				// Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.POWER_EMPTY);
				Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.POWER);
			}
			else
			{	
				//单次寻访
				if (Api.switchVoApi.checkOpenBiography() && rData.data.biographyArr)
				{
					let oneObj = rData.data.biographyArr[0];
					if (oneObj)
					{
						Api.biographyVoApi.showInfo = oneObj;
					}
				}

				this._personId=rData.data.personId[0];
				this._rewards=rData.data.rewards;
				// this._scrollView.addEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
				this.container.touchChildren=false;
				let buildId=Config.SearchCfg.getPersonItemCfgByPersonId(this._personId).build;
				let build:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(String(buildId));
				// this._scrollView.setScrollLeft(build.x+build.width/2-320,1000);
				this.moveCompleteHandler();


			}
			if(this._checkBox2){
				this._twoKeySearchStatus=this._checkBox2.checkSelected();
				if(this._twoKeySearchStatus && Api.searchVoApi.getSearchNum()<=0 && Api.searchVoApi.checkOneKey()){
					let itemId:string=Api.searchVoApi.getNeedItem();
					let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
					if(hasNum>0){
						this.request(NetRequestConst.REQUEST_SEARCH_PILL,{});
					}
					else{
						let item = Config.ItemCfg.getItemCfgById(itemId);
						App.CommonUtil.showTip(LanguageManager.getlocal("resNotEnoughDesc",[item.name]));
					}
				}
			}
		}
		else if(rData.cmd==NetRequestConst.REQUEST_SEARCH_PILL)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
		}
		this.refresh();
	}

	private _tipTipTimeOut:number=-1;
	private _tipMask:BaseBitmap;
	private _tipSar = [];
	private playRewardTip():void
	{
		if(!this._tipMask)
		{
			this._tipMask = BaseBitmap.create("public_9_bg8");
			this._tipMask.width=GameConfig.stageWidth;
			this._tipMask.height=GameConfig.stageHeigth;
			this._tipMask.alpha=0;
			this._tipMask.touchEnabled=false; 
			LayerManager.msgLayer.addChild(this._tipMask);
		}
		//一键寻访奖励飘字
		// let strArr:string[]=this.ar;
		let offY:number=70;
		let tipContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		let tipBg:BaseBitmap=BaseBitmap.create("public_itemtipbg2");
		tipContainer.addChild(tipBg);
		this.tipContainerArr.push(tipContainer);

		let tipTxt:BaseTextField=ComponentManager.getTextField(this._tipSar.shift(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		tipBg.width=tipBg.width+tipTxt.width;
		tipTxt.setPosition((tipBg.width-tipTxt.width)/2,(tipBg.height-tipTxt.height)/2);
		tipContainer.addChild(tipTxt);

		tipContainer.setPosition((GameConfig.stageWidth-tipContainer.width)/2,(GameConfig.stageHeigth-tipContainer.height)/2+offY);
		LayerManager.msgLayer.addChild(tipContainer);
		if(this._tipMask["count"]==null)
		{
			this._tipMask["count"]=0;
		}
		else{
			tipContainer.y -= 9;
		}
		this._tipMask["count"]++;
		let ths=this;
		egret.Tween.get(tipContainer).to({y:tipContainer.y-offY*2},1000).call(function(tipContainer:BaseDisplayObjectContainer){
			if(tipContainer)
			{
				tipContainer.dispose();
			}
			if(ths._tipMask)
			{
				ths._tipMask["count"]--;
				if(!ths._tipMask["count"])
				{
					BaseBitmap.release(ths._tipMask);
					ths._tipMask=null;

					// let rData = Api.wifeVoApi.getWaitShowWife();
					// if(rData)
					// { 	
					// 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
					// } 
				}
			}
		},this,[tipContainer]);
		if(this._tipTipTimeOut<0)
		{
			this._tipTipTimeOut=egret.setInterval(this.playRewardTip,this,300,this._tipSar);
		}
		if(this._tipSar.length<1)
		{
			if(this._tipTipTimeOut>-1)
			{
				egret.clearInterval(this._tipTipTimeOut);
				this._tipTipTimeOut=-1;
			}
		}
	}

	private moveCompleteHandler():void
	{
		// this._scrollView.removeEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
		let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(this._personId)
		let build=cfg.build;
		let wifecfg = Config.WifeCfg.getWifeCfgById(cfg.wifeId);
		let npc:BaseLoadBitmap=<BaseLoadBitmap>this._sceneLayer.getChildByName(String(build));
		if(npc)
		{
			//egret.Tween.get(npc).to({alpha:0.3},100).to({alpha:0},200).to({alpha:0.3},100).to({alpha:0},200).call(this.showResult,this,[this._personId]);
			if(Api.switchVoApi.checkOpenNewStory()){
				egret.Tween.get(npc).to({alpha:0.3},100).to({alpha:0},200).to({alpha:0.3},100).to({alpha:0},200).call(this.checkHaveStory,this);
			} else {
				egret.Tween.get(npc).to({alpha:0.3},100).to({alpha:0},200).to({alpha:0.3},100).to({alpha:0},200).call(this.showResult,this,[this._personId]);
			}
			
		}
	}

	//检测是否有故事剧情
	private checkHaveStory():void
	{

		let search = Config.SearchCfg.getPersonItemCfgByPersonId(this._personId);
		let storyList:string[] = [];
		let valueStory = null;
		//判断是红颜 还是蓝颜，此处还需要修改
		if(search.wifeId){
			let wifeId = search.wifeId;
			let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
			if(wifeCfg.isBule()){
				if(search.blueValueStory){
					valueStory = search.blueValueStory;
				}
			} else {
				if(search.wifeValueStory){
					valueStory = search.wifeValueStory;
				}
			}
		}
		if(!valueStory){
			this.showResult(Number(this._personId));
			return;
		}

		storyList = valueStory.split(",");

		let mainList = [];
		let normalList = [];
		for(let i = 0;i < storyList.length; i++){
			let indexItemCfg = Config.IndexstoryCfg.getIndexItemCfgById(storyList[i]);
			if(indexItemCfg.eventType == 1){
				mainList.push(indexItemCfg);
			} else {
				normalList.push(indexItemCfg);
			}
		}
		let storyId = null;
	
		let value:number = Api.searchVoApi.getWifeValueById(this._personId);

		//判断主线剧情
		for(let j = 0; j < mainList.length; j ++){
			let main = mainList[j];
			//判断触发类型是寻访次数
			if(main.triggerType == 1){
				//判断符合条件
				if(main.lower <= value && main.upper >= value){
					//判断概率
					if(Math.random() < main.rate){
						//选择剧情id
						let storyIDS = main.storyID.split(",");
						let storyIndex = Math.floor(Math.random() * storyIDS.length);
						storyId = storyIDS[storyIndex];
						break;
					}
				}
			}
		}
		//判断其他剧情
		if(storyId == null){
			for(let j = 0; j < normalList.length; j ++){
				let normal = normalList[j];
				//判断触发类型是寻访次数
				if(normal.triggerType == 1){
					//判断符合条件
					if(normal.lower <= value && normal.upper >= value){
						//判断概率
						if(Math.random() < normal.rate){
							//选择剧情id
							let storyIDS = normal.storyID.split(",");
							let storyIndex = Math.floor(Math.random() * storyIDS.length);
							storyId = storyIDS[storyIndex];
							break;
						}
					}
				}
			}
		}
		if(storyId == null){

			this.showResult(Number(this._personId));

		} else {

			//调用剧情界面
			ViewController.getInstance().openView(ViewConst.BASE.WIFECHANGESEXAVGVIEW,{
				callback: this.showResult, 
				target:this, 
				storyId:storyId
			});
		}
	}

	private showResult(personId:number):void
	{
		let pid = null;
		if(personId){
			pid = personId;
		} else {
			pid = this._personId;
		}
		this.container.touchChildren=true;
		ViewController.getInstance().openView(ViewConst.POPUP.SEARCHRESULTPOPUPVIEW,{personId:pid,rewards:this._rewards});
	}

	private refresh():void
	{
		if(this._leftText)
		{
			this._leftText.text=Api.searchVoApi.getSearchNumLocalStr();
			if(Api.searchVoApi.getSearchNum()>0)
			{
				this._searchBtn.visible=true;
				this._buyBtn.visible=false;
			}
			else
			{
				this._searchBtn.visible=false;
				this._buyBtn.visible=true;
			}
		}
		let onekeyBtn : any = this.container.getChildByName(`onekeyTxt`);
		if(onekeyBtn){
			onekeyBtn.setPosition(this._leftText.x+this._leftText.width+10,this._leftText.y+1);	
		}
		this.refreshByModel();
	}

	private doGuide()
    {
       this.openLuckView();
    }
	private openLuckView():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SEARCHLUCKPOPUPVIEW);
	}

	private openBiographyView():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SEARCHBIOGRAPHYPOPUPVIEW);
	}

	private tick():void
	{
		if(Api.searchVoApi.getSearchNum()<Api.searchVoApi.getMaxSearchNum())
		{
			// if(Api.searchVoApi.getSearchNum()<1)
			// {
				this.refresh();
			// }
		}
		if(this._luckProgress)
		{
			let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
			this._luckProgress.setPercentage(value,Api.searchVoApi.getCurLuckNum()+"/"+Api.searchVoApi.getMaxLuckNum());
		}

		if (this._switchTime>=0 && Api.otherInfoVoApi.getCurSceneId("searchScene")=="303" && this._maskLayer )
		{
			if (this._switchTime ==0)
			{
				if (this._sceneType == "1")
				{
					this._curSceneBg = "searchscene_303_2";
				}
				else
				{
					this._curSceneBg = "searchscene_303_1";
				}
				ResourceManager.loadItem(this._curSceneBg,this.resetSceneBg,this);
			}
			this._switchTime --;
		}
	}

	private resetSceneBg():void
	{	
		if (!this._mapLayer)
		{
			return;
		}
		let view = this;
		this._mapLayer2 = this._mapLayer;
		this._mapLayer = null;
		egret.Tween.get(this._mapLayer2).to({alpha:0},1000).call(function(){
			view._mapLayer2.dispose();
			view._mapLayer2 = null;
		});

		this._mapLayer = BaseBitmap.create(this._curSceneBg);
		let mapY:number=GameConfig.stageHeigth-this._mapLayer.height+50;
		mapY=Math.min(0,mapY);
		this._mapLayer.setPosition(0,mapY);
		this._sceneLayer.addChildAt(this._mapLayer,this._sceneLayer.getChildIndex(this._mapLayer2));
		this._mapLayer.alpha = 0;

		egret.Tween.get(this._mapLayer).to({alpha:1},1000);

		let cId:string = Api.otherInfoVoApi.getCurSceneId("searchScene");

		if (Config.SceneeffectCfg.hasSceneEffect(cId))
		{
			this._sceneType = this._curSceneBg.substring(this._curSceneBg.length-1,this._curSceneBg.length);

			egret.Tween.get(this._effectLayer).to({alpha:0},1000).call(function(){
				view._effectLayer.showSceneEffect(view._sceneType, cId);
				egret.Tween.get(view._effectLayer).to({alpha:1},1000)
			});
			this._switchTime = 50;

			if (this._sceneType == "2")
			{	
				if (!this._bone)
				{
					this._bone = App.DragonBonesUtil.getLoadDragonBones("scene_bone_303_2");
					this._bone.setPosition(0 , 1136);
					this._sceneLayer.addChild(this._bone);
				}				
			}
			else
			{	
				if (this._bone)
				{
					this._bone.dispose();
					this._bone = null;
				}
			}
		}
		else if (this._effectLayer.sceneType)
		{
			this._effectLayer.hideSceneEffect();
		}
		this.initBuildBg();
	}

	protected getButtomLineBg():string
	{
		return null;
	}

	protected getRuleInfo():string
	{
		return "searchViewRuleInfo";
	}

	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		if(this._checkBox)
		{
			this._oneKeySearchStatus=this._checkBox.checkSelected();
		}
		if(this._checkBox2)
		{
			this._twoKeySearchStatus=this._checkBox2.checkSelected();
		}
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SEARCH,this.refreshByModel,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkOnekeySearchHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		this.container.touchChildren=true;
		this._sceneLayer=null;
		this._mapLayer=null;
		this._mapLayer2 = null;
		this._npcList.length=0;
		this._leftText=null;
		this._searchBtn=null;
		this._buyBtn=null;
		this._personId=null;
		this._rewards=null;
		this._clickNpc=null;
		this._luckProgress=null;
		this._checkBox=null;
		this._checkBox2=null;
		this._isCfgInit=false;

		this._sceneType = "1";
		this._curSceneBg = "";
		this._maskTab.length = 0;
		this._maskLayer = null;
		this._effectLayer = null;
		this._switchTime = -1;
		this._bone = null;

		// this._tipSar =[];
		// this._oneKeySearchStatus = false;
		// this._twoKeySearchStatus = false;
		if(this._isbgResLoaded)
		{
			if(this._bgResGroupName)
			{
				ResourceManager.destroyRes(this._bgResGroupName);
				this._bgResGroupName=null;
			}
			this._isbgResLoaded=false;
		}
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
		this._mainTaskHandKey1 = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
		this._mainTaskHandKey2 = null;

		if(this.tipContainerArr&&this.tipContainerArr.length>0)
		{
			for(let i:number=0;i<this.tipContainerArr.length; i++)
			{
				var tipObj = this.tipContainerArr[i];
				egret.Tween.removeTweens(tipObj);
				tipObj.dispose();
				tipObj = null;
				if(i==this.tipContainerArr.length-1)
				{
					egret.clearInterval(this._tipTipTimeOut);
					this._tipTipTimeOut=-1;
					this._tipSar =[]; 
					this._tipMask=null;
				}
			}	 
		}
		super.dispose();
	}
}