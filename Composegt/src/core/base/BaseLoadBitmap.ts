/**
 * 单资源显示对象动态加载类
 * author 陈可
 * date 2017/9/18
 * @class BaseLoadBitmap
 */
class BaseLoadBitmap extends BaseBitmap
{
	private static baseLoadBitmapPool:BaseLoadBitmap[] = [];
	private static isCanBaseLoadBitmapNew:boolean=false;
	private static _LoadNum:any={};
	private _resurl:string=undefined;
	private _rect:egret.Rectangle=undefined;
	private _groupName:string=undefined; //如果使用组，组名
	private _isloaded:boolean=false;//是否已经加载完成
	private _isloading:boolean=false;
	private _loadCompleteCallback?:{callback:(...args)=>void,callbackThisObj:any,callbackParams?:any[]};

	/**
	 * 动态加载图
	 * @param res 资源key或者资源url
	 * @param rect 资源尺寸，位置
	 * @param loadCompleteCallback 加载完成回调，callback加载完成回调   callbackThisObj加载完成拥有对象  callbackParams
	 */
	public constructor(res:string,rect?:egret.Rectangle,loadCompleteCallback?:{callback:(...args)=>void,callbackThisObj:any,callbackParams?:any[]})
	{
		super();
		if(!BaseLoadBitmap.isCanBaseLoadBitmapNew&&this.getClassName()=="BaseLoadBitmap")
		{
			let errorStr:string="请使用BaseLoadBitmap.create创建";
			App.LogUtil.error(errorStr)
			throw new Error(errorStr);
		}
		this.init(res,rect,loadCompleteCallback);
	}

	public setload(res:string,rect?:egret.Rectangle,loadCompleteCallback?:{callback:(...args)=>void,callbackThisObj:any,callbackParams?:any[]}):void
	{
		if(!res||this._resurl==res)
		{
			return;
		}
		if(this._isloading||this._isloaded)
		{
			this.removeUseCount();
		}
		this.init(res,rect,loadCompleteCallback);
	}

	public isLoaded():boolean
	{
		return this._isloaded;
	}

	private init(res:string,rect?:egret.Rectangle,loadCompleteCallback?:{callback:(...args)=>void,callbackThisObj:any,callbackParams?:any[]}):void
	{
		this._resurl=res;
		this._rect=rect;
		this._loadCompleteCallback=loadCompleteCallback;
		if(this._rect)
		{
			this.width=this._rect.width;
			this.height=this._rect.height;
		}
		this._isloading=true;
		this.loadRes();
		let sz=ResourceManager.getImgSize(res);
		if(sz)
		{
			this.width=sz.w;
			this.height=sz.h;
		}
	}

	private loadRes():void
	{
		this.addUseCount();
		if(!ResourceManager.getRes(this._resurl)||BaseLoadBitmap._LoadNum[this._resurl]==1)
		{
			if(RES.hasRes(this._resurl))
			{
				this._groupName = ResourceManager.loadResources([this._resurl],[],this.dalyLoadComplete,null,this);
				// ResourceManager.loadItem(this._resurl,this.loadComplete,this);
			}
			else
			{
				if(this._resurl.indexOf(".")>-1)
				{
					ResourceManager.loadItemByUrl(this._resurl,this.loadComplete,this,RES.ResourceItem.TYPE_IMAGE);
				}
			}
		}
		else
		{
			this.dalyLoadComplete();
			// this.loadComplete();
		}
	}

	private dalyLoadComplete():void
	{
		egret.callLater(this.loadComplete,this);
	}

	private loadComplete(data?:egret.Texture):void
	{
		this._isloading=false;
		this._isloaded=true;
		if(data)
		{
			this.texture=data;
		}
		else
		{
			this.texture=ResourceManager.getRes(this._resurl);
		}
		if(this._loadCompleteCallback)
		{
			this._loadCompleteCallback.callback.apply(this._loadCompleteCallback.callbackThisObj,this._loadCompleteCallback.callbackParams);
			this.clearCallback();
		}
	}

	private addUseCount():void
	{
		if(this._resurl=="itemicon2001")
		{
			App.LogUtil.log(this._resurl);
		}
		if(BaseLoadBitmap._LoadNum[this._resurl]==null)
		{
			BaseLoadBitmap._LoadNum[this._resurl]=0
		}
		BaseLoadBitmap._LoadNum[this._resurl]++;
	}
	private removeUseCount():void
	{
		if(this._resurl=="itemicon2001")
		{
			App.LogUtil.log(this._resurl);
		}
		// if(BaseLoadBitmap._LoadNum[this._resurl]>0)
		// {
		// 	BaseLoadBitmap._LoadNum[this._resurl]--;
		// }
		// if(BaseLoadBitmap._LoadNum[this._resurl]==0)
		// {
		// 	if(this._groupName)
		// 	{
		// 		ResourceManager.destroyRes(this._groupName);
		// 		this._groupName=null;
		// 	}
		// 	else
		// 	{
		// 		if(RES.hasRes(this._resurl))
		// 		{
		// 			ResourceManager.destroyRes(this._resurl);
		// 			this._resurl=null;
		// 		}
		// 	}
		// }
		this._isloading=false;
		this._isloaded=false;
	}

	private clearCallback():void
	{
		if(this._loadCompleteCallback)
		{
			this._loadCompleteCallback.callback=null;
			this._loadCompleteCallback.callbackThisObj=null;
			this._loadCompleteCallback.callbackParams=null;
			this._loadCompleteCallback=null;
		}
	}

	public dispose():void
	{
		if(this._isloading||this._isloaded)
		{
			this.removeUseCount();
		}
		if(this._rect)
		{
			// egret.Rectangle.release(this._rect);
			this._rect=null;
		}
		this.clearCallback();
		this._resurl=null;
		super.dispose();
	}

	/**
	 * 对象池取
	 * @param value 支持传输BitmapData，Texture或者资源名
	 */
	public static create(res?:string,rect?:egret.Rectangle,loadCompleteCallback?:{callback:(...args)=>void,callbackThisObj:any,callbackParams?:any[]}):BaseLoadBitmap 
	{
		let baseLoadBitmap = App.DisplayUtil.useObjectPool?BaseLoadBitmap.baseLoadBitmapPool.pop():null;
		if (!baseLoadBitmap)
		{
			BaseLoadBitmap.isCanBaseLoadBitmapNew=true;
			baseLoadBitmap = new BaseLoadBitmap(res,rect,loadCompleteCallback);
			BaseLoadBitmap.isCanBaseLoadBitmapNew=false;
		}
		else
		{
			baseLoadBitmap.init(res,rect,loadCompleteCallback);
		}
		return baseLoadBitmap;
	}

	/**
	 * 对象池存
	 * @param value 
	 */
	public static release(baseLoadBitmap:BaseLoadBitmap):void 
	{
		if(!baseLoadBitmap)
		{
			return;
		}
		baseLoadBitmap.dispose();
		if(baseLoadBitmap.texture)
		{
			baseLoadBitmap.texture=null;
		}
		egret.Tween.removeTweens(baseLoadBitmap);
		baseLoadBitmap.setPosition(0,0);
		baseLoadBitmap.setScale(1);
		baseLoadBitmap.rotation=0;
		baseLoadBitmap.alpha=1;
		baseLoadBitmap.width=NaN;
		baseLoadBitmap.height=NaN;
		baseLoadBitmap.mask=null;
		baseLoadBitmap.scrollRect=null;
		baseLoadBitmap.filters=null;
		baseLoadBitmap.anchorOffsetX=0;
		baseLoadBitmap.anchorOffsetY=0;
		baseLoadBitmap.visible=true;
		baseLoadBitmap.name=null;
		baseLoadBitmap.touchEnabled=false;
		baseLoadBitmap.skewX=baseLoadBitmap.skewY=0;
		baseLoadBitmap.blendMode=egret.BlendMode.NORMAL;
		baseLoadBitmap.fillMode=egret.BitmapFillMode.SCALE;
		// baseLoadBitmap.scale9Grid=null;
		if(App.DisplayUtil.useObjectPool)
		{
			if(BaseLoadBitmap.baseLoadBitmapPool.indexOf(baseLoadBitmap)<0)
			{
				BaseLoadBitmap.baseLoadBitmapPool.push(baseLoadBitmap);
			}
		}
	}
}