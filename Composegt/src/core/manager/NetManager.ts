/**
 * 网络通信管理
 * author 陈可
 * date 2017/9/8
 * @class NetManager
 */
namespace NetManager
{
	export namespace http
	{
		let gameHttp:Http;
		let isRequesting:boolean=false;
		/**
		 * http请求消息队列
		 */
		let httpRequestList:{host:string,data:any,method:string,callback:(data:any)=>void,errorCallback:()=>void,callbackTarget:any}[]=[];

		/**
		 * 初始化http数据
		 */
		function initHttp():void
		{
			if(!gameHttp)
			{
				gameHttp=new Http();
			}
		}

		/**
		 * 发送post请求
		 * @param host 请求地址
		 * @param data 请求数据
		 */
		export function post(host:string,data:any,callback:(data:any)=>void,errorCallback:()=>void,callbackTarget:any):void
		{
			request(host,data,egret.HttpMethod.POST,callback,errorCallback,callbackTarget);
		}

		/**
		 * 发送get请求
		 * @param host 请求地址
		 * @param data 请求数据
		 */
		export function get(host:string,data:any,callback:(data:any)=>void,errorCallback:()=>void,callbackTarget:any):void
		{
			request(host,data,egret.HttpMethod.GET,callback,errorCallback,callbackTarget);
		}

		function request(host:string,data:any,method:string,callback:(data:any)=>void,errorCallback:()=>void,callbackTarget:any):void
		{
			initHttp();
			httpRequestList.push({host:host,data:data,method:method,callback:callback,errorCallback:errorCallback,callbackTarget:callbackTarget});
			if(isRequesting==false)
			{
				isRequesting=true;
				gameHttp.request(host,data,method,onReceiveData,onError,http);
			}
		}

		function onError():void
		{
			let curRequestData=httpRequestList.shift();
			let errorCallback=curRequestData.errorCallback;
			if(httpRequestList.length<1)
			{
				if(isRequesting)
				{
					isRequesting=false;
				}
			}
			if(errorCallback)
			{
				errorCallback.call(curRequestData.callbackTarget);
			}
		}

		/**
		 * 发送post请求，在请求队列外，不关心结果和是否成功
		 * @param host 请求地址
		 * @param data 请求数据
		 */
		export function getOutQueue(host:string,data:any):void
		{
			requestOutQueue(host,data,egret.HttpMethod.GET);
		}

		/**
		 * 发送post请求，在请求队列外，不关心结果和是否成功
		 * @param host 请求地址
		 * @param data 请求数据
		 */
		export function postOutQueue(host:string,data:any):void
		{
			requestOutQueue(host,data,egret.HttpMethod.POST);
		}

		/**
		 * 队列之外请求
		 */
		function requestOutQueue(host:string,data:any,method:string):void
		{
			var getxhr = new XMLHttpRequest();
			if(host&&host.indexOf("http")<0)
			{
				host=Http.getProtocol()+host;
			}
			if(method==egret.HttpMethod.POST)
			{
				getxhr.open(method,host,true);
				getxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				getxhr.send(App.StringUtil.toString(data));
			}
			else
			{
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
				getxhr.open(method, host, true);
				getxhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				getxhr.send();

			}
		}

		function onReceiveData(resposeData:any):void
		{
			let data:any=undefined;
			if(typeof(resposeData)=="string")
			{
				data=JSON.parse(resposeData);
			}
			else
			{
				data=resposeData;
			}
			App.LogUtil.warn("http接收",data);
			if(httpRequestList.length>0)
			{
				let curRequestData=httpRequestList.shift();

				if(httpRequestList.length>0)
				{
					let host:string=httpRequestList[0].host;
					let data=httpRequestList[0].data;
					let method=httpRequestList[0].method;
					gameHttp.request(host,data,method,onReceiveData,onError,http);
				}
				else
				{
					isRequesting=false;
				}

				let callback=curRequestData.callback;
				if(callback)
				{
					callback.call(curRequestData.callbackTarget,data);
				}
				//todo 接收消息后处理
			}
			else
			{
				if(httpRequestList.length>0)
				{
					let host:string=httpRequestList[0].host;
					let data=httpRequestList[0].data;
					let method=httpRequestList[0].method;
					gameHttp.request(host,data,method,onReceiveData,onError,http);
				}
				else
				{
					isRequesting=false;
				}
			}
			
		}

		

		export function dispose():void
		{
			if(gameHttp)
			{
				gameHttp.abort();
			}
			if(httpRequestList.length>0)
			{
				httpRequestList.length=0;
			}
			isRequesting=false;
		}
	}

	export namespace socket
	{
		/**
		 * websocket请求消息队列
		 */
		let websocketRequestList:{data:any,callback:(data:{status:"success"|"timeout"|"fail",data:any})=>void,callbackTarget:any,cst?:number,cet?:number}[]=[];
		let isRequesting:boolean=false;
		let gameSocket:Socket|ClientSocket;
		let loadingWait:NetLoadingWait.LoadingWait;
		let maxWaitTime:number=20000;
		let waitTimeOut:number=-1;

		function init():void
		{
			if(!gameSocket)
			{
				gameSocket=createSocket();
			}
		}

		export function isConnected():boolean
		{
			let result:boolean=false;
			if(gameSocket)
			{
				result = gameSocket.isConnected();
			}
			return result;
		}

		function createSocket():Socket|ClientSocket
		{
			App.LogUtil.log("checkWeiduan"+PlatformManager.checkIsWeiduan());
			let tmpSocket:Socket|ClientSocket;
			if(PlatformManager.checkUseRSDKSocket())
			{
				tmpSocket=new ClientSocket();
			}
			else
			{
				tmpSocket=new Socket();
			}
			tmpSocket.addEventListener(SocketStateConst.SOCKET_START_RECONNECT,onStartReconnect,socket);
			tmpSocket.addEventListener(SocketStateConst.SOCKET_RECONNECTED,onReconnected,socket);
			tmpSocket.addEventListener(SocketStateConst.SOCKET_NOCONNECT,onNoconnect,socket);
			tmpSocket.addEventListener(SocketStateConst.SOCKET_DATA,onReceiveData,socket);
			return tmpSocket;
		}
		export function connect(host:string,port:number,connectSuccess:()=>void,thisObj:any):void
		{
			init();
			gameSocket.once(SocketStateConst.SOCKET_CONNECTED,()=>{
				if(connectSuccess)
				{
					 App.LogUtil.log("gamesocket首次连接成功");
					connectSuccess.apply(thisObj);
				}
			},socket);
			gameSocket.connect(host,port);
		}

		/**
		 * 调用到这个方法说明socket断了，开始自动重连
		 * @param e 
		 */
		function onStartReconnect(e:egret.Event):void
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMESOCKET_RECOUNT);
			if(websocketRequestList.length>0)
			{
				let callback=websocketRequestList[0].callback;
				if(callback)
				{
					callback.call(websocketRequestList[0].callbackTarget,{status:"fail",data:{ret:ResponseEnums.socketError,cmd:websocketRequestList[0].data.cmd,data:{}}});
				}
			}
			clearRequestList();
			if(!isReconnecting)
			{
				NetLoading.show();
				isReconnecting=true;
			}
		}
		let isReconnecting:boolean=false;

		/**
		 * socket 重连成功
		 * @param e 
		 */
		function onReconnected(e:egret.Event):void
		{
			isReconnecting=false;
			LoginManager.reLoginGame();
		}

		/**
		 * socket重试多次后仍然连不上不再连
		 * @param e 
		 */
		function onNoconnect(e:egret.Event):void
		{
			App.LogUtil.log("断网了");
			//提示断网
			clearRequestList();
			if(isReconnecting)
			{
				NetLoading.hide();
				isReconnecting=false;
			}
			LoginManager.hideLoginLoading();
			ViewController.getInstance().openView(ViewConst.POPUP.NETERRORPOPUPVIEW);
		}

		export function checkAndReConnect():void
		{
			if(gameSocket.isNoConnect())
			{
				gameSocket.resetAndReconnect(true);
			}
		}

		export function send(data:any,callback:(data:any)=>void,callbackTarget:any):void
		{
			if(!gameSocket.isConnected())
			{
				return;
			}
			websocketRequestList.push({data:data,callback:callback,callbackTarget:callbackTarget});
			if(isRequesting==false)
			{
				if(!loadingWait)
				{
					loadingWait = NetLoadingWait.showMask(500);
				}
				else
				{
					loadingWait.showMask();
				}
				if(waitTimeOut<0)
				{
					waitTimeOut=egret.setTimeout(()=>{
						loadingWait.hideMask();
						let callback=websocketRequestList[0].callback;
						if(callback)
						{
							callback.call(websocketRequestList[0].callbackTarget,{status:"timeout",data:{ret:ResponseEnums.socketError,cmd:websocketRequestList[0].data.cmd,data:{}}});
						}
						gameSocket.close(true);
					},socket,maxWaitTime);
				}
				// App.LogUtil.show("netshow");
				isRequesting=true;
				App.LogUtil.log("socket发送",websocketRequestList[0].data);
				gameSocket.send(websocketRequestList[0].data);
			}
		}

		function resend():void
		{

		}

		function onReceiveData(e:egret.Event):void
		{
			let data:any=e.data;
			App.LogUtil.warn("socket接收",data);
			if(String(data.cmd).indexOf("push.")==0)
			{
				formatPushData({status:"success",data:data});
			}
			else
			{
				if(websocketRequestList.length>0)
				{
					let curRequestData=websocketRequestList.shift();

					if(websocketRequestList.length>0)
					{
						App.LogUtil.log("socket发送",websocketRequestList[0].data);
						gameSocket.send(websocketRequestList[0].data);
					}
					else
					{
						isRequesting=false;
						if(loadingWait)
						{
							loadingWait.hideMask();
							// App.LogUtil.show("nethide");
						}
						if(waitTimeOut>-1)
						{
							egret.clearTimeout(waitTimeOut);
							waitTimeOut=-1;
						}
					}

					let callback=curRequestData.callback;
					if(callback)
					{
						callback.call(curRequestData.callbackTarget,{status:"success",data:data});
					}
					//todo 接收消息后处理
				}
				else
				{
					if(websocketRequestList.length>0)
					{
						App.LogUtil.log("socket发送",websocketRequestList[0].data);
						gameSocket.send(websocketRequestList[0].data);
					}
					else
					{
						isRequesting=false;
						if(loadingWait)
						{
							loadingWait.hideMask();
							// App.LogUtil.show("nethide");
						}
						if(waitTimeOut>-1)
						{
							egret.clearTimeout(waitTimeOut);
							waitTimeOut=-1;
						}
					}
				}
				// NetLoading.hide();
			}
		}

		function clearRequestList():void
		{
			isRequesting=false;
			if(websocketRequestList.length>0)
			{
				websocketRequestList.length=0;
			}
			if(loadingWait)
			{
				loadingWait.hideMask();
			}
			if(waitTimeOut>-1)
			{
				egret.clearTimeout(waitTimeOut);
				waitTimeOut=-1;
			}
		}
		export function dispose():void
		{
			if(gameSocket)
			{
				gameSocket.close();
			}
			clearRequestList();
		}
	}
	export namespace chat
	{
		/**
		 * websocket请求消息队列
		 */
		let websocketRequestList:{data:any,callback:(data:any)=>void,callbackTarget:any}[]=[];
		let isRequesting:boolean=false;
		let chatSocket:Socket|ClientSocket;

		function init():void
		{
			if(!chatSocket)
			{
				chatSocket=createSocket();
			}
		}
		export function isConnected():boolean
		{
			let result:boolean=false;
			if(chatSocket)
			{
				result = chatSocket.isConnected();
			}
			return result;
		}

		function createSocket():Socket|ClientSocket
		{
			App.LogUtil.log("checkWeiduan"+PlatformManager.checkIsWeiduan());
			let tmpSocket:Socket|ClientSocket;
			if(PlatformManager.checkUseRSDKSocket())
			{
				tmpSocket=new ClientSocket();
			}
			else
			{
				tmpSocket=new Socket();
			}
			tmpSocket.addEventListener(SocketStateConst.SOCKET_START_RECONNECT,onStartReconnect,socket);
			tmpSocket.addEventListener(SocketStateConst.SOCKET_RECONNECTED,onReconnected,socket);
			tmpSocket.addEventListener(SocketStateConst.SOCKET_NOCONNECT,onNoconnect,socket);
			tmpSocket.addEventListener(SocketStateConst.SOCKET_DATA,onReceiveData,socket);
			return tmpSocket;
		}
		export function connect(host:string,port:number,connectSuccess:()=>void,thisObj:any):void
		{
			init();
			chatSocket.once(SocketStateConst.SOCKET_CONNECTED,()=>{
				if(connectSuccess)
				{
					connectSuccess.apply(thisObj);
				}
			},socket);
			chatSocket.connect(host,port);
		}

		/**
		 * 调用到这个方法说明socket断了，开始自动重连
		 * @param e 
		 */
		function onStartReconnect(e:egret.Event):void
		{
			isRequesting=false;
			websocketRequestList.length=0;
		}

		/**
		 * socket 重连成功
		 * @param e 
		 */
		function onReconnected(e:egret.Event):void
		{
			LoginManager.reLoginChat();
		}

		/**
		 * socket重试多次后仍然连不上不再连
		 * @param e 
		 */
		function onNoconnect(e:egret.Event):void
		{
			// ViewController.getInstance().openView(ViewConst.POPUP.NETERRORPOPUPVIEW);
		}

		export function checkAndReConnect():void
		{
			if(chatSocket&&chatSocket.isNoConnect())
			{
				chatSocket.resetAndReconnect(true);
			}
		}

		/**
		 * 发送聊天数据
		 * @param data 数据
		 * @param callback 回调，可选，不传走formatReceiveChat
		 * @param callbackTarget 回调方法拥有对象
		 */
		export function send(data:any,callback?:(data:any)=>void,callbackTarget?:any):void
		{
			if(!chatSocket.isConnected())
			{
				return;
			}
			websocketRequestList.push({data:data,callback:callback,callbackTarget:callbackTarget});
			if(isRequesting==false)
			{
				isRequesting=true;
				chatSocket.send(websocketRequestList[0].data);
			}
		}

		function resend():void
		{

		}

		function onReceiveData(e:egret.Event):void
		{
			let data:any=e.data;
			App.LogUtil.warn("chatSocket接收",data);
			if(websocketRequestList.length>0)
			{
				let curRequestData=websocketRequestList.shift();

				if(websocketRequestList.length>0)
				{
					chatSocket.send(websocketRequestList[0].data);
				}
				else
				{
					isRequesting=false;
				}

				let callback=curRequestData.callback;
				if(callback)
				{
					callback.call(curRequestData.callbackTarget,data);
				}
				else
				{
					NetManager.formatReceiveChat(data);
				}
				//todo 接收消息后处理
			}
			else
			{
				isRequesting=false;
				NetManager.formatReceiveChat(data);
			}
		}

		function clearRequestList():void
		{
			if(websocketRequestList.length>0)
			{
				websocketRequestList.length=0;
			}
			isRequesting=false;
		}

		export function dispose():void
		{
			if(chatSocket)
			{
				chatSocket.close();
			}
			clearRequestList();
		}
	}
	/**
	 * 检测是否在线
	 */
	export function checkIsOnline(callback:(isOnline:boolean)=>void):void
	{
		if(isGameOnline)
		{
			if(window["RSDKPlatform"]&&window["RSDKPlatform"].getNetworkStatus&&window["RSDKPlatform"].getNetworkStatus()=="0")
			{
				isGameOnline=false;
				callback(isGameOnline);
			}
			else
			{
				NetManager.http.get(ServerCfg.baseUrl+"/testonline.php",null,()=>{
					isGameOnline=true;
					callback(isGameOnline);
				},()=>{
					isGameOnline=false;
					callback(isGameOnline);
				},NetManager);
			}
		}
		else
		{
			callback(isGameOnline);
		}
	}
	
}
var isGameOnline:boolean=true;
window.addEventListener("online",()=>{
	console.log("game online");
	isGameOnline=true;
});
window.addEventListener("offline",()=>{
	console.log("game offline");
	isGameOnline=false;
})