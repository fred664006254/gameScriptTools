/**
 * author 陈可
 * date 2017/9/15
 * @class BaseScene
 */
abstract class BaseScene extends BaseLoadDisplayObjectContiner
{
	protected _sceneLayer:BaseDisplayObjectContainer=null;
	protected _sceneBg:BaseBitmap=null;
	// 页签
	protected tabbarGroup:TabBarGroup;
	protected tabbarGroupBg:BaseBitmap;
	// 保存tabview数据
	protected tabViewData:Object = {};
	// 当前选中的页签
	protected _selectedTabIndex:number = 0;
	// 上次选中的页签
	private _lastSelectedTabIndex:number = null;

	// 参数
	protected param:{[key:string]:any};


	public constructor()
	{
		super();
	}

	protected init():void
	{	

		let bgName=this.getBgName();

		if(!this._sceneLayer)
		{
			this._sceneLayer=new BaseDisplayObjectContainer();
		}
		if(!this._sceneBg)
		{
			let useBaseBg=false;
			if(!ResMgr.hasRes(bgName))
			{
				bgName="public_ab_scenebg";
				useBaseBg=true;
			}
			this._sceneBg=BaseBitmap.create(bgName);
			if(useBaseBg)
			{
				this._sceneBg.width=GameConfig.stageWidth;
				this._sceneBg.height=GameConfig.stageHeigth;
			}
			this._sceneLayer.addChild(this._sceneBg);
		}
		this.addChild(this._sceneLayer);
		this.refreshAfterShow(true);
		this.initTabbarGroup();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0)
		{
			this.changeTab();
		}
		this.tick();
	}

	// 初始化tabbarGroup
	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	

			this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
		}
	}

	protected setTabBarPosition():void{

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
		//暂时将皮肤页面置灰
		if(index == 1)
		return false;
		else
		return true;
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


	protected getBgName():string
	{
		let thisClassName:string=this.getClassName();
		return thisClassName.toLowerCase()+"bg";
	}

	private playBg():void
	{
		let bgName:string=this.getSoundBgName();
		if(RES.hasRes(bgName))
		{
			SoundMgr.playBg(bgName);
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
	}

	protected tick():void
	{
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=[];
		let thisClassName:string=egret.getQualifiedClassName(this);
		thisClassName=thisClassName.toLowerCase();
		if(ResMgr.hasRes(thisClassName))
		{
			resArr.push(thisClassName);
		}
		return resArr;
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerMgr.bgLayer;
	}

	public show(params?:{[key:string]:any}):void
	{
		this.param=params;
		if(this.isShow())
		{
			if(!this.parent)
			{
				this.getParent().addChild(this);
			}
			this.refreshAfterShow();
		}
		else
		{
			super.show(params);
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

	protected refreshAfterShow(bool:boolean=false):void
	{
		App.MsgHelper.dispEvt(MsgConst.HIDE_LAST_SCENE,{sceneId:this.getClassName()});
		this.playBg();

		if(ViewController.getInstance().checkHasShowedView())
		{
			return;
		}
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

	protected changeTab(name?:string):void{
		if(!name){
			name = this.getClassName();
		} 
		let tabveiwClass:any = egret.getDefinitionByName(name + "Tab" + (this.selectedTabIndex+1));
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
				let tabView:ViewTab = new tabveiwClass();
				this.tabViewData[this.selectedTabIndex] = tabView;
				// tabView["param"]=this.param;
				let pos = this.getTabPos();
				tabView.setPosition(pos.x,pos.y);
				this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		
	}

	protected getMsgConstEventArr():string[]{
		return [
			MsgConst.REFRESH_MODEl
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case MsgConst.REFRESH_MODEl:
				view.refreshMode(evt);
				break;
		}
	}

	protected getTabPos():{x:number,y:number}{
		return {
			x : 0,
			y : 0
		}
	}

	public dispose():void
	{
		let view = this;
		view._sceneLayer=null;
		view._sceneBg=null;

		let thisClassName:string=egret.getQualifiedClassName(view);
		thisClassName=thisClassName.toLowerCase();
		this.param=null;
	
		view.tabbarGroup && view.tabbarGroup.dispose();
		view.tabbarGroup = null;
		view.tabViewData = {};
		view._selectedTabIndex = -1;
		view._lastSelectedTabIndex = -1;
		super.dispose();
	}
}