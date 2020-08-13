/**
 * author 陈可
 * date 2017/9/11
 * @class BaseView
 */
abstract class BaseView extends BaseLoadDisplayObjectContiner
{
	// 背景
	protected viewBg:BaseBitmap|BaseDisplayObjectContainer;
	// 标题背景
	protected titleBg:BaseBitmap; 
	// 遮罩层
	protected _maskBmp:BaseBitmap; 
	// // 标题背景2
	// private titleBg2:BaseBitmap;
	// 标题文本
	protected titleTF:BaseTextField;
	// 关闭按钮
	protected closeBtn:BaseButton;
	// 自定义显示内容容器(必须添加到该容器)
	protected container:BaseDisplayObjectContainer;
	// 参数
	protected param:any;

	// 页签
	protected tabbarGroup:TabBarGroup;

	protected tabbarBg:BaseBitmap;
	protected tabbarBgLine:BaseBitmap;

	// 保存tabview数据
	protected tabViewData:Object = {};
	// 当前选中的页签
	protected _selectedTabIndex:number = 0;
	// 上次选中的页签
	private _lastSelectedTabIndex:number = null;

	private _needStopEffectList:string[]=[];

	private static _recodeSoundBgList:string[]=[];

	private static _showLogList:string[]=[];

	public constructor()
	{
		super();
	}
	protected init():void
	{
		this.initMask();
		this.initBg();
		this.initTitle();
		this.initContainer();
		this.initViewBg();
		this.initTabbarGroup();
		this.initCloseBtn();
		this.initView();
		this.initBorder();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0)
		{
			let l:number=tabArr.length;
			for(let i:number=0;i<l;i++)
			{

				if(this.selectedTabIndex>0)
				{
					// this.selectedTabIndex = i;
					// this.tabbarGroup.selectedIndex=this.selectedTabIndex;
					this.changeTab();
					break;
				}
				else if(this.checkTabCondition(i))
				{
					// // 重新checkTabCondition方法处理	
					// if(this.selectedTabIndex>1)
					// {
					// 	this.selectedTabIndex = i;
					// 	this.tabbarGroup.selectedIndex=this.selectedTabIndex;
					// 	this.changeTab();
					// 	break;
					// }
					this.selectedTabIndex = i;
					this.tabbarGroup.selectedIndex=this.selectedTabIndex;
					this.changeTab();
					break;
				}
			}
			
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

		if(this.isShowOpenAni()&&!Api.rookieVoApi.isInGuiding&&Api.switchVoApi.checkOpenViewOpenAni())
		{
			if(egret.is(this,"PopupView"))
			{
				//打开特效
				this.alpha=0;
				this.scaleX=0.5;
				this.scaleY=0.5;
				this.anchorOffsetX=GameConfig.stageWidth/2;
				this.anchorOffsetY=GameConfig.stageHeigth/2;
				this.x = GameConfig.stageWidth/2;
				this.y = GameConfig.stageHeigth/2;
				if(this._maskBmp)
				{
					this._maskBmp.setScale(2);
					this._maskBmp.x = -GameConfig.stageWidth/2;
					this._maskBmp.y = -GameConfig.stageHeigth/2;
				}
				egret.Tween.get(this, {loop : false}).to({scaleX : 1.1, scaleY : 1.1,alpha:1},200).to({scaleX : 1, scaleY : 1},100)
				.call(function()
				{
					this.alpha=1;
					this.anchorOffsetX=0;
					this.anchorOffsetY=0;
					this.x = 0;
					this.y = 0;
					this.scaleX=1;
					this.scaleY=1;
					egret.Tween.removeTweens(this);
					if(this._maskBmp)
					{
						this._maskBmp.setScale(1);
						this._maskBmp.x = 0;
						this._maskBmp.y = 0;
					}
					
				},this);
			}
			else
			{
				this.alpha=0;
				this.scaleX=1.1;
				this.scaleY=1.1;
				this.anchorOffsetX=GameConfig.stageWidth/2;
				this.anchorOffsetY=GameConfig.stageHeigth/2;
				this.x = GameConfig.stageWidth/2;
				this.y = GameConfig.stageHeigth/2;
				egret.Tween.get(this, {loop : false}).to({scaleX : 1, scaleY : 1,alpha:1},200)
				.call(function()
				{
					this.alpha=1;
					this.anchorOffsetX=0;
					this.anchorOffsetY=0;
					this.x = 0;
					this.y = 0;
					this.scaleX=1;
					this.scaleY=1;
					egret.Tween.removeTweens(this);
					// this._maskBmp.setScale(1);
					// this._maskBmp.x = 0;
					// this._maskBmp.y = 0;
				},this);

			}
		}
		
		if(App.DeviceUtil.isWXgame()&&Api.switchVoApi.checkOpenFeedBack())
		{
			PlatformManager.feedbackButtonToggle("hide")
		}

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
		let textArr:string[]=this.getTabbarTextArr();
		// if(textArr&&textArr.length>0)
		// {
			// resArr.push("commonview_biaoqianbg01");
			// resArr.push("commonview_biaoqianbg02");
			resArr.push("commonview_biaoqianbg03");
			resArr.push("commonview_biaoqianbg04");

		if(textArr.length > 0){

			resArr.push("popupview_bg3");
			resArr.push("popupview_bg5");
		}
		if(this.getBorderName()){
			resArr.push("commonview_border1");
			resArr.push("commonview_bottom");
		}

		// }
		// if(RES.hasRes(soundBgName))
		// {
		// 	resArr.push(soundBgName);
		// }
		return resArr;
	};

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
		return buttomY;
	}

	protected getTabbarTextArr():Array<string>
	{
		return [];
	}
	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_TAB;
	}

	// 初始化tabbarGroup
	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			// if(GameData.isUseNewUI)
			// {
				// let tabbarBg1:BaseBitmap=BaseBitmap.create("commonview_biaoqianbg01");
				// // tabbarBg1.setPosition(0,this.getTitleButtomY());
				// tabbarBg1.x = -15;
				// // this.addChild(tabbarBg1);
				// let tabbarBg:BaseBitmap=BaseBitmap.create("commonview_biaoqianbg02");
				// tabbarBg.x = -15;
				// // tabbarBg.setPosition(0,this.getTitleButtomY());
				// this.addChild(tabbarBg);
			// }

			// if(egret.is(this,"PopupView"))
			// {
			// 	let tabBg = BaseBitmap.create("popupview_bg3");
			// 	let tabLine = BaseBitmap.create("popupview_bg5");
			// 	tabLine.width = tabBg.width;
			// 	tabLine.x = tabBg.x ;
			// 	tabLine.y = tabBg.y + tabBg.height;
			// 	// this.addChild(tabBg);
			// 	// this.addChild(tabLine);
			// }
			if(this.getTabbarName() == ButtonConst.BTN_WINTAB)
			{
				this.tabbarBg=BaseBitmap.create("popupview_bg3");
				this.tabbarBg.x = GameConfig.stageWidth/2 - this.tabbarBg.width/2;
				this.tabbarBg.y = this.viewBg.y + 170;
				this.tabbarBgLine =BaseBitmap.create("popupview_bg5");
				this.tabbarBgLine.width = this.tabbarBg.width;
				this.tabbarBgLine.x = this.tabbarBg.x;
				this.tabbarBgLine.y = this.tabbarBg.y + 69-this.tabbarBgLine.height;
				this.addChild(this.tabbarBg);
				this.addChild(this.tabbarBgLine);
			}
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			if(this.getTabbarName() == ButtonConst.BTN_TAB){
				this.tabbarGroup.setSpace(-12.5);
				// this.tabbarGroup.x = 
			}
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			// this.tabbarGroup.addChildAt(tabbarBg,0);
			// this.tabbarGroup.addChildAt(tabbarBg1,0);
			
			// this.changeTab();
		}
	}
	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			if(egret.is(this,"PopupView"))
			{
				if(this.tabbarBg){
					tabX = this.tabbarBg.x + 10;
					tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
				} else{
					tabX=this.viewBg.x+30;
					// tabY=this.viewBg.y+60;
					tabY=this.viewBg.y+75;
				}

			}
			else
			{
				// tabX=15;
				tabX=22;
				// if(GameData.isUseNewUI)
				// {
					tabY=this.titleBg?this.titleBg.y+this.titleBg.height:92;

				if(this.tabbarBg){
					// tabX = this.tabbarBg.x + 10;
					tabX = this.tabbarBg.x + 10;
					tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
				}
				// }
				// else
				// {
				// 	tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
				// }
			}
			tabX+=this.getTabbarGroupX(); 
			tabY+=this.getTabbarGroupY();
			this.tabbarGroup.setPosition(tabX,tabY);
	
		}
	}
	protected getTabbarGroupX():number
	{
		return 0;
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
		return this.getClassName().toLowerCase() + "titlebg";
	}
	
	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return this.getClassName().toLowerCase() + "closebtn";
	}
	protected getBorderName():string
	{
		return null;
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
			if(bgName == "popupview_bg2")
			{
				this.viewBg.width = this.getShowWidth();
			}
			else if(bgName == "public_rule_bg")
			{}
			else
			{
				this.viewBg.width = GameConfig.stageWidth;
				this.viewBg.height = GameConfig.stageHeigth;
			}
		}
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
		this._maskBmp.height=GameConfig.stageHeigth;
		this._maskBmp.touchEnabled = true;
		this.addChild(this._maskBmp);
		if(this.isTouchMaskClose())
		{
			this._maskBmp.addTouchTap(this.hide,this);
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
			return;
		}
		Api.rookieVoApi.hiddenRookieView();
		if(BaseView._showLogList.length>20)
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

	protected closeHandler():void
	{
		this.hide();
	}

	public hide():void
	{
		
		if(this.isShow())
		{
			let checkStopSoundBg=this.checkStopSoundBg();
			if(this.isShowOpenAni()&&!Api.rookieVoApi.isInGuiding&&Api.switchVoApi.checkOpenViewOpenAni())
			{	
				if(egret.is(this,"PopupView"))
				{
					//关闭特效
					if(this._maskBmp)
					{
						this._maskBmp.setScale(2);
						this._maskBmp.x = -GameConfig.stageWidth/2;
						this._maskBmp.y = -GameConfig.stageHeigth/2;
					}
					this.anchorOffsetX=GameConfig.stageWidth/2;
					this.anchorOffsetY=GameConfig.stageHeigth/2;
					this.x = GameConfig.stageWidth/2;
					this.y = GameConfig.stageHeigth/2;
					egret.Tween.get(this, {loop : false}).to({scaleX : 0.5, scaleY : 0.5,alpha:0},200)
					.call(()=>
					{
						
						egret.Tween.removeTweens(this);
						this.alpha=1;
						this.anchorOffsetX=0;
						this.anchorOffsetY=0;
						this.x = 0;
						this.y = 0;
						this.scaleX=1;
						this.scaleY=1;
						super.hide();
						
					},this);
				}
				else
				{
					this.anchorOffsetX=GameConfig.stageWidth/2;
					this.anchorOffsetY=GameConfig.stageHeigth/2;
					this.x = GameConfig.stageWidth/2;
					this.y = GameConfig.stageHeigth/2;
					egret.Tween.get(this, {loop : false}).to({scaleX : 1.1, scaleY : 1.1,alpha:0},200)
					.call(()=>
					{
						egret.Tween.removeTweens(this);
						this.alpha=1;
						this.anchorOffsetX=0;
						this.anchorOffsetY=0;
						this.x = 0;
						this.y = 0;
						this.scaleX=1;
						this.scaleY=1;
						super.hide();
					},this);

				}
			}else{
				super.hide();
			}
			
	
			// super.hide();
			if(checkStopSoundBg)
			{
				SoundManager.resumeBg();
			}
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
			if(bgName == "popupview_bg2")
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

		if(this.getTitleStr())
		{
			this.titleTF = new BaseTextField();
			this.titleTF.text = LanguageManager.getlocal(this.getTitleStr(),this.getTitleParams());
			this.titleTF.size = 28;
			this.titleTF.x = this.width/2 - this.titleTF.width/2;
			// if(GameData.isUseNewUI)
			// {
				// this.titleTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
				this.titleTF.setColor(TextFieldConst.COLOR_TITLE_NAME);
			// }
			// else
			// {
			// 	this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
			// }

			// if(PlatformManager.checkIsKRSp())
			// {
				
			// }
			this.addChild(this.titleTF);
			if(this.titleBg)
			{
				// if(GameData.isUseNewUI)
				// {
					this.titleTF.y = 18;
				// }
				// else
				// {
				// 	this.titleTF.y = this.titleBg.y + this.titleBg.height/2 - this.titleTF.height/2 + 21;
				// }
			}
			else
			{
				this.titleTF.y = 10;
			}
		}
	}

	// 初始化自定义容器
	private initContainer():void
	{
		this.container = new BaseDisplayObjectContainer();
		let tmpIdx = this.getChildIndex(this.getChildByName("titleBg"));
		this.addChildAt(this.container,tmpIdx);
		if(this.getTitleBgName() == "commonview_titlebg" && this.titleBg)
		{
			this.container.x = 0;
			this.container.y = this.titleBg.height + 15 + this.getContainerY();
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
			if(this.getBgName() == "popupview_bg2" || this.getBgName() == "public_rule_bg")
			{
				this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()?0:(this.viewBg.width - this.closeBtn.width + 20);
				this.closeBtn.y = this.viewBg.y - 20;
			}
			else
			{
				this.closeBtn.x =  PlatformManager.hasSpcialCloseBtn()?0:(GameConfig.stageWidth - this.closeBtn.width);
				this.closeBtn.y = 0;
			}
		}
		
	}

	private initBorder():void
	{
		if(this.getBorderName()){
			if(this.getBorderName() == "commonview_border1"){
				let border = BaseBitmap.create("commonview_border1");
				let bottom = BaseBitmap.create("commonview_bottom");

				border.width = GameConfig.stageWidth;
				border.height = GameConfig.stageHeigth - 69;
				border.x = 0;
				border.y = GameConfig.stageHeigth - border.height;
				this.addChild(border);

				bottom.x = 0;
				bottom.y = GameConfig.stageHeigth - bottom.height;
				this.addChild(bottom);

			}


		}


	}

	protected preInit():void
	{
		super.preInit();
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
		// return 618;
		return 630;
	}

	// 弹框面板高度，重新该方法后，不会动态计算高度
	protected getShowHeight():number
	{
		return 0;
	}
	// 获取container初始y坐标 		
	protected getContainerY():number
	{
		if(this.getBgName() == "popupview_bg2")
		{
			return 65;
		}
		return 0;
	}

	protected isShowMask():boolean
	{
		return true;
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
		this._maskBmp = null;
		this.viewBg = null;
		this.titleBg = null;
		this.titleTF = null;
		this.closeBtn = null;
		this.container = null;
		this.alpha=1;
		this.anchorOffsetX=0;
		this.anchorOffsetY=0;
		this.x = 0;
		this.y = 0;
		this.scaleX=1;
		this.scaleY=1;
		this.tabbarBg = null;
		this.tabbarBgLine = null;;
		this._selectedTabIndex = 0;
		this._lastSelectedTabIndex = null;
		super.dispose();
	}
}