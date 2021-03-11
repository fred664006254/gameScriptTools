/**
 * author 陈可
 * date 2017/9/11
 * @class BaseView
 */
abstract class BaseView extends BaseLoadDisplayObjectContiner
{
	// 背景
	protected viewBg:BaseBitmap|BaseDisplayObjectContainer|BaseLoadBitmap;
	// 标题背景
	protected titleBg:BaseBitmap;
	protected titleBgShadow:BaseBitmap;
	// 遮罩层
	protected _maskBmp:BaseBitmap; 
	// // 标题背景2
	// private titleBg2:BaseBitmap;
	// 标题文本
	protected titleTF:BaseTextField;
	protected titleBmp:BaseBitmap;
	// 关闭按钮
	protected closeBtn:BaseButton;
	// 自定义显示内容容器(必须添加到该容器)
	protected container:BaseDisplayObjectContainer;
	// 参数
	protected param:any;

	// 页签
	protected tabbarGroup:TabBarGroup;
	protected tabbarGroupBg:BaseBitmap;
	// 保存tabview数据
	protected tabViewData:Object = {};
	// 当前选中的页签
	protected _selectedTabIndex:number = 0;
	// 上次选中的页签
	private _lastSelectedTabIndex:number = null;

	private _needStopEffectList:string[]=[];

	private static _recodeSoundBgList:string[]=[];

	private static _showLogList:string[]=[];

	private static _waitHideList:Object={};

	//大梁
	protected peamBmp:BaseBitmap = null;
	//大框
	protected bigframe:BaseBitmap = null;
	/**
	 * 正在加载的界面数量
	 */
	private static _showloadingCount:number=0;

	// 规则说明按钮
	protected _ruleBtn:BaseButton;
	//使用队列
	private _useQueue:boolean = false;

	public constructor()
	{
		super();
	}

	protected get uiType():string
	{
		return "";
	}

	protected init():void
	{
		this.removeLoadingCount();
		this.initMask();
		this.initBg();
		this.initTitle();
		this.initContainer();
		this.initBigFrame();
		this.initBeam();
		
		this.initViewBg();
		this.initTabbarGroup();
		this.initCloseBtn();
		this.initRuleBtn();
		this.initView();
		this.initProbablyBtn();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0)
		{
			this.changeTab();
		}
		if(this["checkGuide"]&&(this["checkGuide"] instanceof Function))
		{
			this["checkGuide"]();
		}
		this.playBg();
		/*******以下为居中处理，因为所有view包含mask后都是全屏，使用绝对锚点处理，如有问题不要在子类处理，需要在此处处理 */
		// this.anchorOffsetX=GameConfig.stageWidth*0.5;
		// this.anchorOffsetY=GameConfig.stageHeigth*0.5;
		// this.x=this.anchorOffsetX;
		// this.y=this.anchorOffsetY;
		//**********以上为居中处理 */
		Api.rookieVoApi.showRookieView();
		//隐藏标题背景阴影
		this.hideTitleBgShadow();
		//弹窗动画
		this.playOpenViewEffect();
	}

	private initRuleBtn():void
	{
		if(this.getRuleInfo())
		{
			let ruleBtnName = this.getRuleBtnName();
			this._ruleBtn = ComponentManager.getButton(ruleBtnName,"",this.clickRuleBtnHandler,this);
			this._ruleBtn.x = 12 + (PlatformManager.hasSpcialCloseBtn()?80:0);
			this._ruleBtn.y = 22;
			if (ruleBtnName == ButtonConst.BTN2_RULE){
				this._ruleBtn.y = 0;
			}
			this.addChild(this._ruleBtn);
		}
	}

	protected initProbablyBtn():void
	{
		if(Api.switchVoApi.checkOpenProbably()==true && this.getProbablyInfo())
		{
			let probablyBtn = ComponentManager.getButton("btn_probably","",this.clickProbablyBtnHandler,this);
			let posX:number = 12;
			if (PlatformManager.hasSpcialCloseBtn())
			{
				posX+=80;
			}
			if (this._ruleBtn)
			{
				posX=this._ruleBtn.x+this._ruleBtn.width-10;
			}
			probablyBtn.x = posX;
			probablyBtn.y = 22;
			this.addChild(probablyBtn);
		}
	}

	protected getExtraRuleInfo():string{
		return '';
	}

	protected clickRuleBtnHandler(param:any):void
	{
		let msg = '';
		let extra = this.getExtraRuleInfo();
		if(extra && extra !== ''){
			msg = extra;
		}
		else{
			let keyParam = this.getRuleInfoParam();
			msg = LanguageManager.getlocal(this.getRuleInfo(),keyParam);
		}
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,msg);
	}
	protected clickProbablyBtnHandler(param:any):void
	{
		let keyParam = this.getProbablyInfoParam();
		let msg = LanguageManager.getlocal(this.getProbablyInfo(),keyParam);
		ViewController.getInstance().openView(ViewConst.POPUP.PROBABLYINFOPOPUPVIEW,msg);
	}


	protected getRuleInfoParam():string[]
	{
		return [];
	}

	protected getProbablyInfoParam():string[]
	{
		return [];
	}

	// 规则说明内容
	protected getRuleInfo():string
	{
		let ruleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo";
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
		{
			
		}
		return "";
	}

	// 概率内容
	protected getProbablyInfo():string
	{
		let ruleStr=this.getClassName().toLowerCase().replace("view","")+"ProbablyInfo";
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
		{
			
		}
		return "";
	}

	private playBg():void
	{
		if(this.isShow())
		{
			let soundBgName:string=this.getSoundBgName();
			if(RES.hasRes(soundBgName))
			{
				SoundManager.playBg(soundBgName);
				let className:string=this.getClassName();
				let idx:number=BaseView._recodeSoundBgList.indexOf(className);
				if(idx<0)
				{
					BaseView._recodeSoundBgList.push(className);
				}
				else
				{
					BaseView._recodeSoundBgList=BaseView._recodeSoundBgList.concat(BaseView._recodeSoundBgList.splice(idx,1));
				}
			}
		}
	}

	private stopBg():void
	{
		if(this.isShow())
		{
			let soundBgName:string=this.getSoundBgName();
			if(RES.hasRes(soundBgName))
			{
				let checkStopSoundBg:boolean=this.checkStopSoundBg();
				if(checkStopSoundBg)
				{
					SoundManager.stopBgByName(soundBgName);
				}
				let className:string=this.getClassName();
				let idx:number=BaseView._recodeSoundBgList.indexOf(className);
				if(idx>-1)
				{
					BaseView._recodeSoundBgList.splice(idx,1);
				}
				if(checkStopSoundBg)
				{
					if(BaseView._recodeSoundBgList.length>0)
					{
						let view:BaseView = ViewController.getInstance().getView(BaseView._recodeSoundBgList[BaseView._recodeSoundBgList.length-1]);
						view.playBg();
					}
					else
					{
						SceneController.getInstance().playBg();
					}
				}
			}
		}
	}

	private checkStopSoundBg():boolean
	{
		let showedViewList = ViewController.getInstance().getShowedView();
		let soundBgNum:number=0;
		let i:number=0;
		let l:number=showedViewList.length;
		let soundBgName:string=this.getSoundBgName();
		for(i=0;i<l;i++)
		{
			if(soundBgName==showedViewList[i]["getSoundBgName"]())
			{
				soundBgNum++;
				if(soundBgNum>1)
				{
					return false;
				}
			}
		}
		return true;
	}

	protected getSoundBgName():string
	{
		let className:string=this.getClassName().toLowerCase();
		className=className.substring(0,className.indexOf("view"));
		return "music_"+className;
	}
	protected abstract initView():void;
	protected getResourceList():string[]
	{
		// let soundBgName:string=this.getSoundBgName();
		let resArr:string[]=[];
		// if(RES.hasRes(soundBgName))
		// {
		// 	resArr.push(soundBgName);
		// }
		return resArr;
	};

	protected checkAndPushRes(resKey:string,arr:string[]):void
	{
		if(resKey&&RES.hasRes(resKey)&&ResourceManager.checkResInGroupByKey(resKey,this.needCheckResGroup())==false)
		{
			arr.push(resKey);
		}
	}

	protected needCheckResGroup():string
	{
		return "loginRes";
	}

	protected initViewBg():void
	{
	}

	protected getTitleButtomY():number
	{
		let buttomY:number = 0;
		if(this.tabbarGroup)
		{
			buttomY=this.tabbarGroup.y+this.tabbarGroup.height;
		}
		else
		{
			if(this.titleBg)
			{
				buttomY=this.titleBg.y+this.titleBg.height;
			}
			else
			{
				if(this.titleTF)
				{
					buttomY=this.titleTF.y+this.titleTF.height;
				}
			}
		}
		if (this.peamBmp)
		{
			buttomY+=40;
		}

		return buttomY;
	}

	protected getTabbarTextArr():Array<string>
	{
		return [];
	}
	// 页签图名称
	protected getTabbarName():string|string[]
	{	
		if (this.uiType == "2")
		{
			return ButtonConst.BTN2_TAB;
		}
		return ButtonConst.BTN_TAB;
	}

	protected getTabbarBg():string
	{
		return "commonview_tabbar_bg";
	}

	// 初始化tabbarGroup
	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			if(this.addTabbarGroupBg()){
				let bg = BaseBitmap.create(this.getTabbarBg());
				this.addChild(bg);
				this.tabbarGroupBg = bg;
			}

			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			if (this.uiType == "2")
			{
				this.tabbarGroup.setSpace(0);
				this.tabbarGroup.x+=5;
				this.tabbarGroup.setColor(0xe1ba86,0x472c26);
				this.setBigFameY(0);
			}
			
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			if(this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2){
				this.tabbarGroup.addZshi();
			}
		}
	}

	protected addTabbarGroupBg():boolean{
		return false;
	}
	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			if(egret.is(this,"PopupView"))
			{
				tabX=this.viewBg.x+30;
				tabY=this.viewBg.y+60;
				if (this.getBgName() == "popupview_bg3")
				{
					tabX=this.viewBg.x+30+26.5;
					tabY=this.viewBg.y+70;
				}
			}
			else
			{
				tabX=15;
				tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
			}
			tabY+=this.getTabbarGroupY();

			if(this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2){
				tabY -= 16;
			}
			this.tabbarGroup.setPosition(tabX,tabY);

			if(this.tabbarGroupBg){
				let tmpy = 0;
				if(this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2){
					tmpy = 8;
				}
				this.tabbarGroupBg.setPosition(GameConfig.stageWidth/2-this.tabbarGroupBg.width/2,this.tabbarGroup.y+tmpy);		
			}
			
		}
	}
	protected getTabbarGroupY():number
	{
		return 0;
	}

	protected clickTabbarHandler(data:any):void
	{
		
		App.LogUtil.log("index: " + data.index);
		var index = Number(data.index);
		if(this.checkTabCondition(index) == false)
		{
			// 重新checkTabCondition方法处理
			this.tabbarGroup.selectedIndex=this.selectedTabIndex;
			return;
		}
		if (index == 1)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
		}
		this.lastSelectedTabIndex = this.selectedTabIndex;
		this.selectedTabIndex = index;
		this.changeTab();

	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{
		return true;
	}

	protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
				this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.container.x,this.container.y + this.getTabbarGroupY());
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
				// this.param = null;
				// this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		
	}

	/**获取当前选中的tab实例 */
	public getSelectedTab():ViewTab
	{
		if(this.tabViewData && this.tabViewData[this.selectedTabIndex])
		{
			return this.tabViewData[this.selectedTabIndex];
		}
		return null;
	}

	/**检查是否为当前选中的页签 */
	public checkSelectedTab(index:number):boolean
	{
		if(index == this.selectedTabIndex)
		{
			return true;
		}
		return false;
	}

	protected addRedPoint(index:number):void
	{
		if(this.tabbarGroup)
		{
			this.tabbarGroup.addRedPoint(index);
		}
	}

	protected removeRedPoint(index:number):void
	{
		if(this.tabbarGroup)
		{
			this.tabbarGroup.removeRedPoint(index);
		}
	}
	protected getBgName():string
	{
		return this.getClassName().toLowerCase() + "bg";
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return this.getClassName().toLowerCase() + "titlebg"+this.uiType;
	}
	// 是否隐藏标题背景阴影
	protected isHideTitleBgShadow():boolean
	{
		return false;
	}

	//是否展示弹窗动效
	protected isShowOpenAni():boolean
	{
		return true;
	}

	//显示弹窗动效
	protected playOpenViewEffect():void{

	}
	
	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return this.getClassName().toLowerCase() + "closebtn";
	}

	//规则按钮
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN_RULE;
	}

	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			if(bgName == "public_rule_bg")
			{
				this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
			}
			else
			{
				this.viewBg = BaseBitmap.create(bgName);
			}
			if(bgName=="commonview_bg1"&&(this.viewBg instanceof BaseBitmap))
			{
				this.viewBg.fillMode=egret.BitmapFillMode.REPEAT;
			}
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			if(bgName == "popupview_bg1")
			{
				this.viewBg.width = this.getShowWidth();
			}
			else if(bgName == "public_rule_bg")
			{}
			else
			{
				this.viewBg.width = GameConfig.stageWidth;
				this.viewBg.height = this.getStageHeight();
			}
		}
	}

	protected getStageHeight():number
	{
		return this.supportFullScreen()?GameConfig.stageFullHeigth:GameConfig.stageHeigth;
	}

	protected isTouchMaskClose():boolean
	{
		return false;
	}

	private initMask():void
	{
		if(!this.isShowMask())
		{
			return;
		}
		this._maskBmp = BaseBitmap.create("public_9_viewmask");
		this._maskBmp.width=GameConfig.stageWidth;
		this._maskBmp.height=this.getStageHeight();
		this._maskBmp.touchEnabled = true;
		this.addChild(this._maskBmp);
		let tmpmask:BaseShape=null;
		if(!ResourceManager.getRes("public_9_viewmask"))
		{
			tmpmask=new BaseShape();
			tmpmask.graphics.beginFill(0,0.6);
			tmpmask.graphics.drawRect(0,0,GameConfig.stageWidth,this.getStageHeight());
			tmpmask.graphics.endFill;
			this.addChild(tmpmask);
		}
		if(this.isTouchMaskClose())
		{
			this._maskBmp.addTouchTap(this.hide,this);
			if(tmpmask)
			{
				tmpmask.addTouchTap(this.hide,this);
			}
		}
	}
	// 子类中添加显示对象到container中
	protected addChildToContainer(obj:egret.DisplayObject):void
	{
		if(obj)
		{
			this.container.addChild(obj);
		}
	}
	// 子类中从container中移除显示对象
	protected removeChildFromContainer(obj:egret.DisplayObject):void
	{
		if(obj)
		{
			this.container.removeChild(obj);
		}
	}
	
	public show(data?:{tab?:string}):void
	{
		if(this.isShow())
		{
			this.switchToTop(data);
			return;
		}
		
		BaseView._showloadingCount++;
		App.LogUtil.log("view.showCount:",BaseView._showloadingCount);

		Api.rookieVoApi.hiddenRookieView();
		if(BaseView._showLogList.length>50)
		{
			BaseView._showLogList.shift();
		}
		// if(DEBUG)
		// {
		// 	App.LogUtil.show("showLog:"+this.getClassName());
		// }
		App.LogUtil.log("showLog:"+this.getClassName());
		BaseView._showLogList.push(this.getClassName());
		this.param = data;
		
		if(data && data.tab)
		{
			this.selectedTabIndex = Number(data.tab.indexOf("-")?data.tab.split("-")[0]:data.tab);
		}
		super.show();
	}

	private removeLoadingCount():void
	{
		BaseView._showloadingCount--;
		App.LogUtil.log("view.hideCount:",BaseView._showloadingCount);
		if(BaseView._showloadingCount==0)
		{
			for(let key in BaseView._waitHideList)
			{
				let hideData:{hide:Function,hideThisObj:any}=BaseView._waitHideList[key];
				if(hideData)
				{
					hideData.hide.call(hideData.hideThisObj);
					hideData.hide=null;
					hideData.hideThisObj=null;
					delete BaseView._waitHideList[key];
					App.LogUtil.log(this.getClassName()+"初始化完成,关闭界面"+key);
				}
			}
		}
	}

	protected closeHandler():void
	{
		this.hide();
	}

	public hide():void
	{
		if(this.isShow())
		{
			if(!this.isInit())
			{
				this.removeLoadingCount();
			}
			if(BaseView._showloadingCount>0)
			{
				let thisName:string=this.getClassName();
				let hideData:{hide:Function,hideThisObj:any}=BaseView._waitHideList[thisName];
				if(hideData==null)
				{
					hideData={hide:this.hide,hideThisObj:this};
					BaseView._waitHideList[thisName]=hideData;
					App.LogUtil.log(thisName,"等待关闭");
					return;
				}
			}

			let checkStopSoundBg=this.checkStopSoundBg();
			let useQueue = this._useQueue;
			super.hide();
			if(checkStopSoundBg)
			{
				SoundManager.resumeBg();
			}
			if (useQueue)
			{
				Api.viewqueueVoApi.checkWaitingView();
			}
			App.LogUtil.log("baseview checkWaitingShowInHome");
			Api.unlocklist2VoApi.checkWaitingShowInHome();
		}
	}

	// 初始化标题
	protected initTitle():void
	{
		let titleBgName:string=this.getTitleBgName();
		if(titleBgName)
		{
			let bgName:string=this.getBgName();
			this.titleBg = BaseBitmap.create(titleBgName);
			this.titleBg.name = "titleBg";
			this.titleBg.x = GameConfig.stageWidth/2 - this.titleBg.width/2;
			
			this.addChild(this.titleBg);
			if(bgName == "popupview_bg1")
			{
				this.titleBg.y = this.viewBg.y - this.titleBg.height/2;
			}
			else if(bgName == "public_rule_bg")
			{
				this.titleBg.y = this.viewBg.y - this.titleBg.height;
			}
			else
			{
				this.titleBg.y = 0;
			}
		}

		let titlepic = this.getTitlePic();
		if (this.uiType == "2" && ResourceManager.hasRes(titlepic))
		{
			this.titleBmp = BaseBitmap.create(titlepic);
			this.titleBmp.setPosition(this.width/2 - this.titleBmp.width/2,this.titleBg.y+this.titleBg.height-this.titleBmp.height);
			this.addChild(this.titleBmp);
		}
		else if(this.getTitleStr())
		{
			this.titleTF = new BaseTextField();
			this.titleTF.text = LanguageManager.getlocal(this.getTitleStr(),this.getTitleParams());
			this.titleTF.name = "titleTF";
			if (PlatformManager.checkIsRuSp())
			{
				this.titleTF.size = 16;
			}
			else if (PlatformManager.checkIsThSp()){
				this.titleTF.fontFamily = TTFManager.TH_FONTNAME;
				this.titleTF.size = 20;
			}
			this.titleTF.x = this.width/2 - this.titleTF.width/2;
			if (this.uiType == "2")
			{	
				this.titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
			}
			else
			{
				this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
			}
			
			this.addChild(this.titleTF);
			if(this.titleBg)
			{
				this.titleTF.y = this.titleBg.y + this.titleBg.height/2 - this.titleTF.height/2 + 23.5;
			}
			else
			{
				this.titleTF.y = 10;
			}
		}
	}

	protected initBigFrame():void
	{	
		if (this.getBigFrame())
		{
			let posY = 0;
			if (this.titleBg)
			{
				posY = this.titleBg.y + this.titleBg.height;
			}
			let framebg = BaseBitmap.create(this.getBigFrame());
			// framebg.y = posY;
			framebg.height = GameConfig.stageHeigth - this.container.y;
			this.addChildToContainer(framebg);
			this.bigframe = framebg;
		}
		
	}

	protected setBigFameHeight(h:number):void{
		if (this.bigframe){
			this.bigframe.height = h;
		}
	}

	protected setBigFameY(y:number):void
	{
		if (this.bigframe)
		{
			this.bigframe.y = y;
			this.bigframe.height = GameConfig.stageHeigth - this.container.y - y;
		}
	}
	// 1, 下面两个角， 2四个角
	protected setBigFameCorner(type:number =1):void
	{
		if (this.bigframe)
		{
			let corner1 =  BaseLoadBitmap.create("commonview_corner");
			corner1.y = this.bigframe.y+this.bigframe.height-23;
			this.addChildToContainer(corner1);

			let corner2 =  BaseLoadBitmap.create("commonview_corner");
			corner2.scaleX = -1;
			corner2.setPosition(this.bigframe.width,corner1.y);
			this.addChildToContainer(corner2);

			if (type==2)
			{
				let corner3 =  BaseLoadBitmap.create("commonview_corner");
				corner3.scaleY = -1;
				corner3.y = this.bigframe.y+23;
				this.addChildToContainer(corner3);

				let corner4 =  BaseLoadBitmap.create("commonview_corner");
				corner4.setScale(-1);
				corner4.setPosition(this.bigframe.width,corner3.y);
				this.addChildToContainer(corner4);
			}
		}
	}


	protected initBeam():void
	{
		if (this.getBeamName())
		{	
			let posY = 0;
			if (this.titleBg)
			{
				posY = this.titleBg.y + this.titleBg.height;
			}
			this.peamBmp = BaseBitmap.create(this.getBeamName());
			this.peamBmp.y = posY;
			this.addChild(this.peamBmp);
		}
	}

	// 初始化自定义容器
	protected initContainer():void
	{
		this.container = new BaseDisplayObjectContainer();
		let tmpIdx = this.getChildIndex(this.getChildByName("titleBg"));
		this.addChildAt(this.container,tmpIdx);
		if((this.getTitleBgName() == "commonview_titlebg"||this.getTitleBgName() == "commonview_snowtitlebg") && this.titleBg)
		{
			this.container.x = 0;
			this.container.y = this.titleBg.height + 15 + this.getContainerY();
		}
		else if((this.getTitleBgName() == "commonview_titlebg2") && this.titleBg)
		{
			this.container.y = this.titleBg.height + this.getContainerY();
		}
		else
		{
			this.container.y = this.getContainerY();
		}
	}

	// 初始化关闭按钮
	private initCloseBtn():void
	{
		if(this.getCloseBtnName())
		{
			this.closeBtn = ComponentManager.getButton(this.getCloseBtnName(),"",this.closeHandler,this);
			this.addChild(this.closeBtn);
			if(this.getBgName() == "popupview_bg1" || this.getBgName() == "public_rule_bg")
			{
				this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()?20:(this.viewBg.width - this.closeBtn.width + 20);
				this.closeBtn.y = this.viewBg.y - 20;
			}
			else
			{
				this.closeBtn.x =  PlatformManager.hasSpcialCloseBtn()?20:(GameConfig.stageWidth - this.closeBtn.width);
				this.closeBtn.y = 0;
			}
		}
		
	}

	

	protected preInit():void
	{
		super.preInit();
		let getReportData=this.getReportTipData();
		if(getReportData&&getReportData.title&&getReportData.title.key&&LanguageManager.checkHasKey(getReportData.title.key)&&
		getReportData.msg&&getReportData.msg.key&&LanguageManager.checkHasKey(getReportData.msg.key))
		{	
			let localkey:string = getReportData.title.key+getReportData.msg.key+Api.playerVoApi.getPlayerID();
			let lastTime:number = 0;
			let timeStr:string = LocalStorageManager.get(localkey);
			if (timeStr && timeStr!="")
			{
				lastTime = Number(timeStr);
			}

			if (!App.DateUtil.checkIsToday(lastTime))
			{	
				LocalStorageManager.set(localkey,String(GameData.serverTime));
				ViewController.getInstance().openView(ViewConst.BASE.ACCOMMONREPORTVIEW,{
					title : LanguageManager.getlocal(getReportData.title.key,getReportData.title.param),
					msg : LanguageManager.getlocal(getReportData.msg.key,getReportData.msg.param),
				});
			}
			
		}
	}
	
	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
	{
		let preKey=this.getClassName().toLowerCase().replace("view","");
		let titleKey=preKey+"ReportTipTitle";
		let msgKey=preKey+"ReportTipMsg";
		return {title:{key:titleKey},msg:{key:msgKey}};
	}




	protected set selectedTabIndex(index:number)
	{
		if(!isNaN(index))
		{
			this._selectedTabIndex = index;
		}
	}
	protected get selectedTabIndex():number
	{
		return this._selectedTabIndex;
	}
	protected set lastSelectedTabIndex(index:number)
	{
		if(!isNaN(index))
		{
			this._lastSelectedTabIndex = index; 
		}
		
	}
	protected get lastSelectedTabIndex():number
	{
		return this._lastSelectedTabIndex;
	}

	// 标题内容,规则：面板类名+Title
	// 比如：PlayerView是用户信息面板，该面板的标题格式为：playerViewTitle,注意首字母要小写
	protected getTitleStr():string
	{
		return App.StringUtil.firstCharToLower(this.getClassName()) + "Title";
	}

	protected getTitlePic():string
	{	
		let cname:string = this.getClassName()
		return cname.toLowerCase() + "title";
	}
	/**
	 * 大框
	 */
	protected getBigFrame():string
	{	
		return null;
	}

	/**
	 * 房梁
	 */
	protected getBeamName():string
	{	
		return null;
	}

	protected getTitleParams():string[]
	{
		return null;
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.panelLayer;
	}
	// 弹框面板宽度，高度动态计算
	protected getShowWidth():number
	{	
		if(this.getBgName() == "popupview_bg3")
		{
			return 623;
		}
		return 570;
	}

	// 弹框面板高度，重新该方法后，不会动态计算高度
	protected getShowHeight():number
	{
		return 0;
	}
	// 获取container初始y坐标 		
	protected getContainerY():number
	{
		if(this.getBgName() == "popupview_bg1")
		{
			return 51;
		}
		else if(this.getBgName() == "popupview_bg3")
		{
			return 59.5;
		}
		return 0;
	}

	protected supportFullScreen():boolean
	{
		return false;
	}

	protected isShowMask():boolean
	{
		return true;
	}

	protected hideTitleBgShadow():void{
		if (this.titleBg && this.titleBgShadow && this.isHideTitleBgShadow()){

			this.titleBgShadow.visible = false;
		}
	}

	protected playEffect(effectName:string,isStopWhenClose?:boolean):void
	{
		if(isStopWhenClose)
		{
			if(this._needStopEffectList.indexOf(effectName)<0)
			{
				this._needStopEffectList.push(effectName);
			}
		}
		SoundManager.playEffect(effectName);
	}

	public setUseQueue(v:boolean):void{
		this._useQueue = v;
	}

	public dispose():void
	{
		this.stopBg();
		if(this._needStopEffectList&&this._needStopEffectList.length>0)
		{
			let l:number=this._needStopEffectList.length;
			for(let i:number=l-1;i>=0;i--)
			{
				SoundManager.stopEffect(this._needStopEffectList.pop());
			}
		}
		if(this.tabbarGroup)
		{
			this.removeChild(this.tabbarGroup);
			this.tabbarGroup.dispose();
			this.tabbarGroup = null;
		}
		if(this.tabViewData)
		{
			for(var key in this.tabViewData)
			{
				var view = this.tabViewData[key];
				if(view)
				{
					if(this.contains(view))
					{
						this.removeChild(view);
					}
					else if(this.container.contains(view))
					{
						this.removeChildFromContainer(view);
					}
					view.dispose();
					view = null;
				}
			}
			this.tabViewData = {};
		}
		if(this._ruleBtn)
		{
			this.removeChild(this._ruleBtn);
			this._ruleBtn.dispose();
			this._ruleBtn = null;
		}
		this._maskBmp = null;
		this.viewBg = null;
		this.titleBg = null;
		this.titleTF = null;
		this.closeBtn = null;
		this.container = null;
		this.titleBgShadow = null;
		this.titleBmp = null;
		this.tabbarGroupBg = null;
		this.peamBmp = null;
		this.bigframe = null;
		
		this._selectedTabIndex = 0;
		this._lastSelectedTabIndex = null;
		this._useQueue = false;
		super.dispose();
	}
}