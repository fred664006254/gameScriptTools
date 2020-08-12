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

	function createSocket(onStartReconnect:(e:egret.Event)=>void,onReconnected:(e:egret.Event)=>void,onNoconnect:(e:egret.Event)=>void,onReceiveData:(e:egret.Event)=>void,thisObj:any):Socket|ClientSocket
	{
		App.LogUtil.log("checkWeiduan"+PlatMgr.checkIsWeiduan());
		let tmpSocket:Socket|ClientSocket;
		if(PlatMgr.checkUseRSDKSocket())
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

	export namespace socket
	{
		/**
		 * websocket请求消息队列
		 * @param data 请求参数
		 * @param callback  请求回调
		 * @param callbackTarget 请求回调对象
		 * @param st 真实发送请求时间戳
		 * @param et 真实接受请求时间戳
		 * @param cst 真实发送请求客户端时间ms
		 * @param cet 真实接收请求客户端时间ms
		 */
		let websocketRequestList:{data:any,callback:(data:{status:"success"|"timeout"|"fail",data:any})=>void,callbackTarget:any,cst?:number,cet?:number}[]=[];
		let isRequesting:boolean=false;
		let gameSocket:Socket|ClientSocket;
		let loadingWait:NetLoadingWait.LoadingWait;
		let maxWaitTime:number=20000;
		let waitTimeOut:number=-1;
		let timeoutReport:number=GameData.waitLdRpt;

		function init():void
		{
			if(!gameSocket)
			{
				gameSocket=createSocket(onStartReconnect,onReconnected,onNoconnect,onReceiveData,socket);
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
			if(GameData.useNewWS)
			{
				socket2.connect(host,port);//同时开始链接第二个socket链接，并且不关心结果
			}
		}

		/**
		 * 调用到这个方法说明socket断了，开始自动重连
		 * @param e 
		 */
		function onStartReconnect(e:egret.Event):void
		{
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
			LoginMgr.reLoginGame();
		}

		/**
		 * socket重试多次后仍然连不上不再连
		 * @param e 
		 */
		function onNoconnect(e:egret.Event):void
		{
			App.LogUtil.log("gamescoket连不上，不连了");
			//提示断网
			clearRequestList();
			if(isReconnecting)
			{
				NetLoading.hide();
				isReconnecting=false;
			}
			LoginMgr.hideLoginLoading();
			ViewController.getInstance().openView(ViewConst.NETERRORPOPUPVIEW);
		}

		export function checkAndReConnect():void
		{
			if(gameSocket&&gameSocket.isNoConnect())
			{
				gameSocket.resetAndReconnect(true);
			}
			if(GameData.useNewWS)
			{
				socket2.checkAndReConnect();
			}
		}

		let noQueueKeys:{[key:string]:number}={};

		export function send(data:any,callback:(data:any)=>void,callbackTarget:any,addQueue:boolean):void
		{
			if(GameData.useNewWS&&!addQueue)
			{
				socket2.send(data,callback,callbackTarget);
				return;
			}
			if(!gameSocket.isConnected())
			{
				return;
			}
			
			if(!addQueue)
			{
				noQueueKeys[data.cmd+"_"+data.rnum]=1;
				gameSocket.send(data);
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
						try
						{
							let reportData={cmd:data.cmd,cost:maxWaitTime+"timeout"};
							StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3");
						}
						catch(e){}
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
				if(websocketRequestList[0].data&&GameData.serverTimeMs)
				{
					websocketRequestList[0].data.clientts=GameData.serverTimeMs;
				}
				websocketRequestList[0].cst=egret.getTimer();
				gameSocket.send(websocketRequestList[0].data);
			}
		}

		function resend():void
		{

		}

		function onReceiveData(e:egret.Event):void
		{
			let data:any=e.data;
			if(!data)
			{
				return;
			}
			if(String(data.cmd).indexOf("push.")==0)
			{
				formatPushData({status:"success",data:data});
			}
			else
			{
				let noQueueKey=data.cmd+"_"+data.rnum;
				if(noQueueKeys[noQueueKey])
				{
					delete noQueueKeys[noQueueKey];
					formatReceive({status:"success",data:data});
				}
				else
				{
					if(websocketRequestList.length>0)
					{
						let curRequestData=websocketRequestList.shift();
						curRequestData.cet=egret.getTimer();
	
						let costT:number=curRequestData.cet-curRequestData.cst;
						if(costT>=timeoutReport)
						{
							try
							{
								let reportData={cmd:data.cmd,cost:costT};
								if(PlatMgr.checkIsTWBSp()||PlatMgr.checkIsThSp()||PlatMgr.checkIsEnSp())
								{
									StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3")
								}
							}
							catch(e){}
						}
						if(websocketRequestList.length>0)
						{
							if(websocketRequestList[0].data&&GameData.serverTimeMs)
							{
								websocketRequestList[0].data.clientts=GameData.serverTimeMs;
							}
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
							if(websocketRequestList[0].data&&GameData.serverTimeMs)
							{
								websocketRequestList[0].data.clientts=GameData.serverTimeMs;
							}
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
			if(GameData.useNewWS)
			{
				socket2.dispose();
			}
		}
	}

	namespace socket2
	{
		/**
		 * websocket请求消息队列
		 * @param data 请求参数
		 * @param callback  请求回调
		 * @param callbackTarget 请求回调对象
		 * @param st 真实发送请求时间戳
		 * @param et 真实接受请求时间戳
		 * @param cst 真实发送请求客户端时间ms
		 * @param cet 真实接收请求客户端时间ms
		 */
		let websocketRequestList:{data:any,callback:(data:{status:"success"|"timeout"|"fail",data:any})=>void,callbackTarget:any,cst?:number,cet?:number}[]=[];
		let isRequesting:boolean=false;
		let gameSocket:Socket|ClientSocket;
		let maxWaitTime:number=20000;
		let waitTimeOut:number=-1;
		// let timeoutReport:number=GameData.waitLdRpt;

		function init():void
		{
			if(!gameSocket)
			{
				gameSocket=createSocket(onStartReconnect,onReconnected,onNoconnect,onReceiveData,socket2);
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

		export function connect(host:string,port:number):void
		{
			init();
			gameSocket.once(SocketStateConst.SOCKET_CONNECTED,()=>{
				App.LogUtil.log("gamescoket2 first connect sucess");
			},socket);
			gameSocket.connect(host,port);
		}

		/**
		 * 调用到这个方法说明socket断了，开始自动重连
		 * @param e 
		 */
		function onStartReconnect(e:egret.Event):void
		{
			if(!isReconnecting)
			{
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
		}

		/**
		 * socket重试多次后仍然连不上不再连
		 * @param e 
		 */
		function onNoconnect(e:egret.Event):void
		{
			App.LogUtil.log("gamescoket2连不上，不连了");
			//提示断网
			if(isReconnecting)
			{
				isReconnecting=false;
			}
			waitToReconnect();
		}
		let waitToRecT=30000;
		let waitToRecOut=-1;
		function waitToReconnect():void
		{
			if(waitToRecOut==-1)
			{
				waitToRecOut=egret.setTimeout(()=>{
					checkAndReConnect();
				},socket2,waitToRecT);
			}
		}

		function clearWaitToReconnect():void
		{
			if(waitToRecOut!=-1)
			{
				egret.clearTimeout(waitToRecOut);
				waitToRecOut=-1;
			}
		}

		export function checkAndReConnect():void
		{
			if(gameSocket&&gameSocket.isNoConnect())
			{
				gameSocket.resetAndReconnect(true);
			}
			clearWaitToReconnect();
		}

		export function send(data:any,callback:(data:any)=>void,callbackTarget:any):void
		{
			if(!gameSocket.isConnected())
			{
				checkAndReConnect();
				return;
			}
			gameSocket.send(data);
		}

		function onReceiveData(e:egret.Event):void
		{
			let data:any=e.data;
			NetManager.formatReceive({status:"success",data:data});
		}
		export function dispose():void
		{
			if(gameSocket)
			{
				gameSocket.close();
			}
			clearWaitToReconnect();
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