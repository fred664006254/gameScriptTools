/** 
 * 加载基类容器类
 * author 陈可
 * date 2017/9/11
 * @class BaseLoadDisplayObjectContiner
 */
abstract class BaseLoadDisplayObjectContiner extends BaseDisplayObjectContainer
{
	private _isLoaded:boolean=false;
	private _groupName:string=undefined;
	private _isShow:boolean=false;
	private _isInit:boolean=false;

	/**
	 * 加载资源重试次数
	 */
	private _loadResTryNum:number=0;
	private static _loadingWait:NetLoadingWait.LoadingWait;
	/**
	 *加载资源计时中，超时加log
	 */
	private _waitResTime:number=-1;
	
	/**
	 *开始加载资源的时间点
	 */
	private _startLoadTime:number=0;

	private _baseurlWhenInit:string='';
	public constructor()
	{
		super();
	}

	protected abstract init():void;
	protected abstract getResourceList():string[];
	protected abstract getParent():egret.DisplayObjectContainer;

	public show(data?:any):void
	{
		if(this.isShow())
		{
			this.switchToTop(data);
			return;
		}
		let equestData=this.getRequestData();
		if(equestData)
		{
			App.MsgHelper.addEvt(MsgConst.SOCKET_RECOUNT,this.gameSocketRecountHandler,this);
			this._curRequestData={requestType:equestData.requestType,requestData:equestData.requestData};
			this.request(equestData.requestType,equestData.requestData);
		}
		else
		{
			this._isRequesed=true;
		}
		this.showLoadingMask();
		// App.LogUtil.show("displayshow");
		this._isShow=true;
		this.loadRes();
	}
	protected switchToTop(data?:{tab?:string}):void
	{
		if(this._isInit)
		{
			let parent=this.getParent();
			if(parent&&parent.contains(this))
			{
				let thisIndex:number=parent.getChildIndex(this);
				let numChildren:number=parent.numChildren;
				if(numChildren-thisIndex>1)
				{
					let className:string=this.getClassName();
					if(className=="PracticeView"||className=="PrestigeView"||className=="PlayerView"||className=="OfficialcareerView")
					{
					}
					else
					{
						parent.removeChild(this);
						parent.addChild(this);
					}
				}
			}
		}
	}

	protected receiveEvent(event:egret.Event):void
	{

		let requestData=this._curRequestData;

		if(requestData)
		{
			if(event.type==requestData.requestType)
			{
				this._curRequestData=null;
				if(event.data&&event.data.ret==false)
				{
					if(this._isRequesed==false)
					{//首次
						this.requestLoadError();
					}
					return;
				}
			}
		}

		this.netEventCallBack(event);
		if(requestData)
		{
			if(event.type==requestData.requestType)
			{
				if(this._isRequesed==false&&this.isShow())
				{//首次
					this._isRequesed=true;
					if(this.isLoaded&&this._isRequesed)
					{
						this.preInit();
					}
				}
			}
		}
	}

	protected msgEventCallBack(evt : egret.Event):void{
		switch(evt.type){
			default:
				break;
		}
	}

	/**
	 * 是否已经调用show方法，在调用show之后到hide之前show为true
	 */
	public isShow():boolean
	{
		return this._isShow;
	}

	public isInit():boolean
	{
		return this._isInit;
	}

	public hide():void
	{
		if(this.isShow())
		{
			this.dispose();
		}
	}

	protected loadRes():void
	{
		let resouceList:string[]=this.getResourceList();
		this._startLoadTime=egret.getTimer();
		if(this._isLoaded==false && resouceList && resouceList.length>0)
		{
			this._waitResTime=egret.setTimeout((resouceList:string[])=>{
				this.clearResTimeCount();
				this.reportResLoadTimeOut();
			},this,GameData.waitLdRpt,resouceList);
			this._groupName = ResMgr.loadResources(resouceList,null,this.delayLoadComplete,null,this,this.resGroupLoadError);
		}
		else
		{
			this.delayLoadComplete();
		}
	}

	private gameSocketRecountHandler(e:egret.Event):void
	{
		if(this._isRequesed==false)
		{//首次
			this.requestLoadError();
		}
	}

	protected isShowLoadingMask():boolean
	{
		return true;
	}

	protected showLoadingMask():void
	{
		if(!this.isShowLoadingMask())
		{
			return;
		}
		if(!BaseLoadDisplayObjectContiner._loadingWait)
		{
			BaseLoadDisplayObjectContiner._loadingWait=NetLoadingWait.showMask(500);
		}
		else
		{
			BaseLoadDisplayObjectContiner._loadingWait.showMask();
		}
	}

	protected hideLoadingMask():void
	{
		if(!this.isShowLoadingMask())
		{
			return;
		}
		if(BaseLoadDisplayObjectContiner._loadingWait)
		{
			// App.LogUtil.show("displayhide");
			BaseLoadDisplayObjectContiner._loadingWait.hideMask();
		}
	}

	
	protected requestLoadError():void
	{
		let requestErrorTip:string=this.getRequestErrorTip();
		// if(requestErrorTip)
		// {
		// 	App.CommonUtil.showTip(requestErrorTip);
		// }
		this.hideLoadingMask();
		this.hide();
	}
	/**	
	 * 请求失败的提示
	 */
	protected getRequestErrorTip():string
	{
		return LangMger.getlocal("requestLoadErrorTip");
	}

	protected resGroupLoadError():void
	{
		this.clearResTimeCount();
		if(this._groupName)
		{
			ResMgr.destroyRes(this._groupName);
			ResMgr.deleteDiskCacheByKeyOrUrl(this._groupName);
			this._groupName=undefined;
		}
		if(this._loadResTryNum<5)
		{
			this._loadResTryNum++;
			console.log("loadres "+this.getClassName()+" error retry-"+this._loadResTryNum);
			this.loadRes();
		}
		else
		{
			if(App.DeviceUtil.IsHtml5()&&!this._baseurlWhenInit)
			{
				this._baseurlWhenInit=document.baseURI;
			}
			App.ResourceUtil.retrySwithCDN(this.getClassName(),(count:number)=>{
				if(count<12)
				{
					this._loadResTryNum++;
					console.log("loadres "+this.getClassName()+" error retry-"+this._loadResTryNum);
					this.loadRes();
				}
				else
				{
					this.cancleLoadAndTip();
				}
			},this,false,()=>{
				this.cancleLoadAndTip();
			});
		}
	}

	private cancleLoadAndTip():void
	{
			App.CommonUtil.showTip(LangMger.getlocal("resLoadErrorTip"));
		this.hideLoadingMask();
		this.hide();
		if(this._baseurlWhenInit)
		{
			if(App.DeviceUtil.IsHtml5()&&window["recoveryCDN"])
			{
				window["recoveryCDN"](this.getClassName(),this._baseurlWhenInit);
			}
		}
		this._loadResTryNum=0;
	}

	/**
	 * 为了处理多个界面切换闪到主场景的问题，资源加载回调强制延迟一帧
	 */
	private delayLoadComplete():void
	{
		if(this._baseurlWhenInit)
		{
			if(App.DeviceUtil.IsHtml5()&&window["recoveryCDN"])
			{
				window["recoveryCDN"](this.getClassName(),this._baseurlWhenInit);
			}
		}
		this.clearResTimeCount();
		if(egret.getTimer()-this._startLoadTime>=GameData.waitLdRpt)
		{
			this.reportResLoadTimeOut();
		}
		if(this.isShow())
		{
			egret.callLater(this.loadComplete,this);
		}
	}

	private clearResTimeCount():void
	{
		if(this._waitResTime>-1)
		{
			egret.clearTimeout(this._waitResTime);
			this._waitResTime=-1;
		}
	}

	private reportResLoadTimeOut():void
	{
		let reportData={view:this.getClassName(),res:this.getResourceList(),cost:egret.getTimer()-this._startLoadTime};
		StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"reswait3");
	}

	private loadComplete():void
	{
		if(this.isShow())
		{
			this._isLoaded=true;
			if(this.isLoaded&&this._isRequesed)
			{
				this.preInit();
			}
			this.hideLoadingMask();
		}
	}

	protected preInit():void
	{
		if(this.isLoaded&&this._isRequesed)
		{
			this.initEventListener();
			this._isInit=true;
			this.init();
			let className:string=this.getClassName();
			let parent=this.getParent();
			if(parent)
			{
				parent.addChild(this);
			}
		}
	}

	protected hideScene():boolean
	{
		return true;
	}

	protected get isLoaded():boolean
	{
		return this._isLoaded;
	}

	public dispose():void
	{
		this.clearResTimeCount();
		this.removeAllRequestEvents();
		App.MsgHelper.removeEvt(MsgConst.SOCKET_RECOUNT,this.gameSocketRecountHandler,this);
		if(this._isLoaded)
		{
			if(this._groupName)
			{
				ResMgr.destroyRes(this._groupName);
				this._groupName=undefined;
			}
			this._isLoaded=false;
		}
		this._isShow=false;
		this._isInit=false;
		this._isRequesed=false;
		this._curRequestData=null;
		this._loadResTryNum=0;
		this._baseurlWhenInit='';
		this._requestTypeList = [];
		super.dispose();
	}
}