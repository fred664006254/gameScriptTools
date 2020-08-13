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
	private static _loadingWait:NetLoadingWait.LoadingWait;
	private static _loadingWaitCount:number=0;
	/**
	 * 请求type列表
	 */
	private _requestTypeList:string[]=[];

	/**
	 * 是否已经请求过
	 */
	private _isRequesed:boolean=false;

	private _curRequestData:{requestType:string,requestData:any};
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
			return;
		}
		let equestData=this.getRequestData();
		if(equestData)
		{
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_GAMESOCKET_RECOUNT,this.gameSocketRecountHandler,this);
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

		//不自动调用资源加载
		if(this.getClassName()!="WifebattleView" && this.getClassName()!="AcCrossServerWifeBattleView"){
			this.loadRes();
		}
		
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return null;
	}

	protected request(requestType:string,requestData:any):void
	{
		if(!requestType)
		{
			return;
		}
		this._curRequestData={requestType:requestType,requestData:requestData};
		let eventType:string=NetManager.getMessageName(requestType);
		if(this._requestTypeList.indexOf(eventType)<0)
		{
			App.MessageHelper.addEventListener(eventType,this.receiveEvent,this);
			this._requestTypeList.push(requestType);
		}
		NetManager.request(requestType,requestData);
	}
	private receiveEvent(event:egret.Event):void
	{

		let requestData=this._curRequestData;

		if(requestData)
		{
			if(event.type==NetManager.getMessageName(requestData.requestType))
			{
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

		this.receiveData(event.data);
		if(requestData)
		{
			if(event.type==NetManager.getMessageName(requestData.requestType))
			{
				if(this._isRequesed==false)
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

	private removeAllRequestEvents():void
	{
		let l:number=this._requestTypeList.length;
		if(l>0)
		{
			for(let i:number=l-1;i>=0;i--)
			{
				this.removeRequestEvent(this._requestTypeList[i]);
			}
		}
	}

	private removeRequestEvent(requestType:string):void
	{
		let index:number=this._requestTypeList.indexOf(requestType);
		if(index>-1)
		{
			App.MessageHelper.removeEventListener(NetManager.getMessageName(requestType),this.receiveEvent,this);
			this._requestTypeList.splice(index,1);
		}
	}


	protected receiveData(data:{ret:boolean,data:any}):void
	{

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
		if(this._isLoaded==false && resouceList && resouceList.length>0)
		{
			this._groupName = ResourceManager.loadResources(resouceList,null,this.delayLoadComplete,null,this,this.resGroupLoadError);
		}
		else
		{
			this.delayLoadComplete();
		}
	}

	protected isShowOpenAni():boolean
	{
		return true;
	}


	private gameSocketRecountHandler(e:egret.Event):void
	{
		if(this._isRequesed==false)
		{//首次
			this.requestLoadError();
		}
	}

	protected requestLoadError(tip?:boolean):void
	{
		tip&&App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
		this.hideLoadingMask();
		this.hide();
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
		BaseLoadDisplayObjectContiner._loadingWaitCount++
	}

	protected hideLoadingMask():void
	{
		if(!this.isShowLoadingMask())
		{
			return;
		}
		BaseLoadDisplayObjectContiner._loadingWaitCount--
		if(BaseLoadDisplayObjectContiner._loadingWait)
		{
			// App.LogUtil.show("displayhide");
			if(BaseLoadDisplayObjectContiner._loadingWaitCount>0&&Api.switchVoApi.checkOpenResNeedLoading())
			{
				egret.setTimeout( ()=>{
					BaseLoadDisplayObjectContiner._loadingWait.hideMask();
				},this,5000)
				// BaseLoadDisplayObjectContiner._loadingWait.hideMask();
			}else{
				BaseLoadDisplayObjectContiner._loadingWait.hideMask();
			}
			
		}
	}

	protected resGroupLoadError():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("resLoadErrorTip"));
		this.hideLoadingMask();
		this.hide();
	}

	/**
	 * 为了处理多个界面切换闪到主场景的问题，资源加载回调强制延迟一帧
	 */
	private delayLoadComplete():void
	{
		if(this.isShow())
		{
			egret.callLater(this.loadComplete,this);
		}
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
			this._isInit=true;
			this.init();
			let className:string=this.getClassName();
			if(this.getParent())
			{
				if(this.getClassName()=="PracticeView"||className=="PrestigeView"||className=="PlayerView"){

				
					if(PlayerBottomUI.checkInstance()&&this.getParent().contains(PlayerBottomUI.getInstance()))
					{
						let childIdex:number=this.getParent().getChildIndex(PlayerBottomUI.getInstance());
						this.getParent().addChildAt(this,childIdex);
					}
					else
					{
						this.getParent().addChild(this);

					}
				} else {
					this.getParent().addChild(this);
				}
				
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
		this.removeAllRequestEvents();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_GAMESOCKET_RECOUNT,this.gameSocketRecountHandler,this);
		if(this._isLoaded)
		{
			if(this._groupName)
			{
				ResourceManager.destroyRes(this._groupName);
				this._groupName=undefined;
			}
			this._isLoaded=false;
		}
		this._isShow=false;
		this._isInit=false;
		this._isRequesed=false;
		this._curRequestData=null;
		super.dispose();
	}
}