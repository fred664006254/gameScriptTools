/**
 * author 陈可
 * date 2017/9/11
 * @class BaseViewController
 */
class BaseViewController extends BaseController
{
	private _viewList:Object=new Object();
	// private _tickList:string[]=[];
	private _isTickStarted:boolean=false;
	public constructor() 
	{
		super();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DPOBJCTR_ADDSTAGE,this.showOrHideViewHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DPOBJCTR_REMOVESTAGE,this.showOrHideViewHandler,this);
	}

	private showOrHideViewHandler(e:egret.Event)
	{
		let viewName:string=e.data;
		let tview:BaseView=this.getView(viewName);
		if(tview instanceof CommonView)
		{
			let tagView:CommonView=null;
			if(LayerManager.panelLayer)
			{
				let numChild:number=LayerManager.panelLayer.numChildren;
				for(let i=numChild-1;i>=0;i--)
				{
					let view:BaseView = <BaseView>LayerManager.panelLayer.getChildAt(i);
					if(view instanceof CommonView)
					{
						if(view==tview)
						{
							continue;
						}
						tagView=view;
						switch(e.type)
						{
							case MessageConst.MESSAGE_DPOBJCTR_ADDSTAGE:
								tagView["onBeCoverHandler"]();
								break;
							case MessageConst.MESSAGE_DPOBJCTR_REMOVESTAGE:
								tagView["onTopHandler"]();
								break;
							default:
								
						}
						break;
					}
				}
			}
		}
	}

	/**
	 * 打开新界面
	 * @param viewId 窗口id
	 * @param data 传递参数，参数自己定，从view的show里面data.data原样取回
	 */
	public openView(viewId:string,data?:any,useQueue:boolean=false):void
	{
		if(viewId)
		{
			let apiNameId:string=viewId.replace("View","");
			apiNameId=App.StringUtil.firstCharToLower(apiNameId);
			if(Api[apiNameId+"VoApi"]&&Api[apiNameId+"VoApi"].getOpenViewMessage)
			{
				let openViewMessage:string=Api[apiNameId+"VoApi"].getOpenViewMessage();
				if(openViewMessage)
				{
					return App.CommonUtil.showTip(openViewMessage);
				}
			}
			let {viewName,viewParam}=this.getViewNameAndParam(viewId);
			let view:BaseView=undefined;
			if(this._viewList.hasOwnProperty(viewName))
			{
				view=this._viewList[viewName];
			}
			else
			{
				let viewClass = egret.getDefinitionByName(viewName);
				if(viewClass)
				{
					view=new viewClass();
					this._viewList[viewName]=view;
				}
				else
				{
					App.LogUtil.show("缺少"+viewName);
					return;
				}
			}
			let param:{tab?:string,data?:any}=undefined;
			if(viewParam)
			{
				param={tab:viewParam};
			}
			if(data)
			{
				if(param)
				{
					param.data=data;
				}
				else
				{
					param={data:data};
				}
			}
			view.setUseQueue(useQueue);
			view.show(param);
			if(view["tick"])
			{
				// let isStart:boolean = this._tickList.length<1;
				// if(this._tickList.indexOf(viewName)<0)
				// {
				// 	this._tickList.push(viewName);
				// }
				// if(isStart)
				// {
					if(this._isTickStarted==false)
					{
						TickManager.addTick(this.tick,this);
						this._isTickStarted=true;
					}
				// }
			}
		}
	}

	private tick():void
	{
		// if(this._tickList.length>0)
		// {
		// 	let l:number=this._tickList.length;
		// 	let view:BaseView=null;
		// 	for(var i:number=l-1;i>=0;i--)
		// 	{
		// 		view=this._viewList[this._tickList[i]];
		// 		if(view&&view.parent)
		// 		{
		// 			let tick:Function=view["tick"];
		// 			tick.apply(view);
		// 		}
		// 		else
		// 		{
		// 			this._tickList.splice(i,1);
		// 		}
		// 	}
		// }
		if(this._viewList)
		{
			for(var key in this._viewList)
			{
				let view:BaseView=this._viewList[key];
				if(view&&view.isInit())
				{
					if(view["tick"])
					{
						view["tick"]();
					}
				}
			}
		}
	}

	public viewHided(viewId:string):void
	{
		// this.checkAndStopTick(viewId);
	}
	
	private checkAndStopTick(viewId:string):void
	{
		// let {viewName}=this.getViewNameAndParam(viewId);
		// let viewIndex:number=this._tickList.indexOf(viewName);
		// if(viewIndex>-1)
		// {
		// 	this._tickList.splice(viewIndex,1);
		// 	if(this._tickList.length<1)
		// 	{
		// 		TickManager.removeTick(this.tick,this);
		// 	}
		// }
	}

	/**
	 * 关闭界面
	 * @param viewId 界面id
	 */
	public hideView(viewId:string):void
	{
		let {viewName}=this.getViewNameAndParam(viewId);
		let view:BaseView=undefined;
		if(this._viewList.hasOwnProperty(viewName))
		{
			view=this._viewList[viewName];
			view.hide();
		}
	}

	/**
	 * 获取界面实例
	 * @param viewId 
	 */
	public getView(viewId:string):BaseView
	{
		let {viewName}=this.getViewNameAndParam(viewId);
		let view:BaseView=undefined;
		if(this._viewList.hasOwnProperty(viewName))
		{
			view=this._viewList[viewName];
		}
		return view;
	}

	private getViewNameAndParam(viewId:string):{viewName:string,viewParam:string}
	{
		let idArr:string[]=viewId.split("|");
		let viewName:string=idArr[0];
		let paramStr:string=idArr[1];
		return {viewName:viewName,viewParam:paramStr};
	}

	/**
	 * 关掉所有view
	 */
	public hideAllView():void
	{
		if(this._viewList)
		{
			for(let key in this._viewList)
			{
				let view:BaseView=this._viewList[key];
				if(view&&view.isShow())
				{
					if(LoginManager.isCreateScene==false&&(view instanceof LoginView))
					{
						// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,view.refresh,view);
            			// view.showLogoAndLoginBtn();
					}
					else if(view instanceof NetErrorPopupView)
					{}
					else
					{
						if(view.hide.length>0)
						{
							view.hide.call(view,true);
						}
						else
						{
							view.hide();
						}
					}
				}
			}
			if(PlayerBottomUI.checkInstance())
			{
				PlayerBottomUI.getInstance().hide(true);
			}
		}
	}

	/**
	 * 检测是否有正在显示的界面
	 * @param isAll 是否是全部view，默认是全部，false时候不包括警告界面和登录界面
	 */
	public checkHasShowedView(isAll:boolean=true):boolean
	{
		if(this._viewList)
		{
			for(let key in this._viewList)
			{
				let view:BaseView=this._viewList[key];
				if(view&&view.isShow())
				{
					if(isAll==false&&((view instanceof NetErrorPopupView) ||(view instanceof LoginView)))
					{}
					else
					{
						return true;
					}
				}
			}
		}
		return false;
	}

	public getShowedView():BaseView[]
	{
		let viewList:BaseView[]=[];
		if(this._viewList)
		{
			for(let key in this._viewList)
			{
				let view:BaseView=this._viewList[key];
				if(view&&view.isShow())
				{
					viewList.push(view);
				}
			}
		}
		return viewList;
	}

	/**
	 * 找到并关闭 返回true，没有要关的板子，返回false
	 */
	public hideTopView():boolean
	{
		if(Api.rookieVoApi.isInGuiding)
		{
			return false;
		}
		// if(!LoginManager.isCreateScene)
		// {
		// 	return false;
		// }
		let msgParent = LayerManager.maskLayer;
		if(msgParent)
		{
			let numChildren=msgParent.numChildren;
			if(numChildren>0)
			{
				while(numChildren>0)
				{
					numChildren--;
					let child=msgParent.getChildAt(numChildren);
					if(child instanceof BaseView)
					{
						if(child instanceof NetErrorPopupView)
						{
							return false;
						}
						else
						{
							child.hide();
							return true;
						}
					}
				}
			}
		}

		let parent = LayerManager.panelLayer;
		if(parent)
		{
			let numChildren=parent.numChildren;
			if(numChildren>0)
			{
				while(numChildren>0)
				{
					numChildren--;
					let child=parent.getChildAt(numChildren);
					if(child instanceof LoginView)
					{
						return false;
					}
					else if(child instanceof BaseView)
					{
						child.hide();
						return true;
					}
					else if(child instanceof PlayerBottomUI)
					{
						PlayerBottomUI.getInstance().hide(true);
					}
				}
			}
		}
		return false;
	}

	public dispose():void
	{
		if(this._viewList)
		{
			for(let key in this._viewList)
			{
				let view:BaseView=this._viewList[key];
				if(view&&view.isShow())
				{
					view.hide();
				}
				delete this._viewList[key];
			}
		}
	}
}