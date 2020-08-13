/**
 * http封装
 * author 陈可
 * date 2017/9/8
 * @class Http
 */
class Http extends BaseClass
{

	private _httpRequest:egret.HttpRequest=undefined;
	private _isRequesting:boolean=false;
	private _callbackData:{successCallback:(data:any)=>void,errorCallback:()=>void,callbackTarget:any};

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this._httpRequest= new egret.HttpRequest();
		this._httpRequest.addEventListener(egret.Event.COMPLETE, this.onRequestComplete, this);
        this._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onRequestIOError, this);
		this._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS,this.onRequestProgress,this);
	}

	/**
	 * http请求
	 * @param host 请求地址
	 * @param data 请求数据
	 * @param mathed 请求方式get/post
	 * @param resonseType 请求数据传输格式
	 */
	public request(host:string,data:any,method:string,successCallback:(data:any)=>void,errorCallback:()=>void,callbackTarget:any,resonseType:string=egret.HttpResponseType.TEXT):void
	{
		this._callbackData={successCallback:successCallback,errorCallback:errorCallback,callbackTarget:callbackTarget};
		this._isRequesting=true;
		this._httpRequest.responseType = resonseType;
		if(host&&host.indexOf("http")<0)
		{
			host=Http.getProtocol()+host;
		}
		if(method==egret.HttpMethod.POST)
		{
			console.log("http send post");
        	this._httpRequest.open(host, method);
        	this._httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        	this._httpRequest.send(App.StringUtil.toString(data));
		}
		else
		{
			console.log("http send get");
			let requestParams:string="";
			for(let key in data)
			{
				if(requestParams=="")
				{
					requestParams+="?"+key+"="+App.StringUtil.toString(data[key]);
				}
				else
				{
					requestParams+="&"+key+"="+App.StringUtil.toString(data[key]);
				}
			}
			host+=requestParams;
			this._httpRequest.open(host, method);
			this._httpRequest.send();
		}
	}

	private onRequestComplete(event:egret.Event)
	{
		console.log("http complete");
		this._isRequesting=false;
		if(this._callbackData.successCallback)
		{
			let callbackData=this._callbackData;
			this._callbackData=null;
			callbackData.successCallback.call(callbackData.callbackTarget,this._httpRequest.response);
		}
	}

	private onRequestProgress(event:egret.ProgressEvent)
	{
		
	}

	private onRequestIOError(event:egret.IOErrorEvent)
	{
		console.log("http error");
		this._isRequesting=false;
		if(this._callbackData.errorCallback)
		{
			let callbackData=this._callbackData;
			this._callbackData=null;
			callbackData.errorCallback.call(callbackData.callbackTarget);
		}
	}
	public isRequesting():boolean
	{
		return this._isRequesting;
	}
	private encode(data:any):string
	{
		let paramURL: string = "";
        for (let key in data)
		{
            paramURL += `${key}=${data[key]}&`;
        }
        if (paramURL.length > 1)
		{
            return `${paramURL.substring(0, paramURL.length - 1)}`;
        }
        return paramURL;
	}

	/**
	 * 其他运行环境请在此处理，如果有写死的话需要是http:或者https:，需要加上冒号
	 */
	public static getProtocol():string
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			return window.location.protocol;
		} 
		else if (App.DeviceUtil.isWXgame()) {
			return "https:";
		}
		else if (App.DeviceUtil.isWyw()) {
			return "https:";
		}		
		else if (App.DeviceUtil.isBaidugame()) {
			return "https:";
		}
		return "";
	}

	/**
	 * 如果请求已经被发出，则立即终止请求
	 */
	public abort():void
	{
		if(this._httpRequest)
		{
			this._httpRequest.abort();
		}
	}

	/**
	 * 销毁掉不要了，如果只是取消请求请调用abort方法
	 */
	public dispose():void
	{
		if(this._httpRequest)
		{
			this._httpRequest.abort();
			this._httpRequest.removeEventListener(egret.Event.COMPLETE, this.onRequestComplete, this);
        	this._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onRequestIOError, this);
			this._httpRequest.removeEventListener(egret.ProgressEvent.PROGRESS,this.onRequestProgress,this);
			this._httpRequest=null;
		}
	}
}