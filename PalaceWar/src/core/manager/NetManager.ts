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
			App.LogUtil.log("gamescoket连不上，不连了");
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
			if(gameSocket&&gameSocket.isNoConnect())
			{
				gameSocket.resetAndReconnect(true);
			}
			if(GameData.useNewWS)
			{
				socket2.checkAndReConnect();
			}
		}

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
							StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3")
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
				if(websocketRequestList[0].data&&GameData.serverTime)
				{
					websocketRequestList[0].data.clientts=GameData.serverTime;
				}
				websocketRequestList[0].cst=egret.getTimer();
				App.LogUtil.log("socket发送",websocketRequestList[0].data);
				gameSocket.send(websocketRequestList[0].data);
			}
		}

		export function closeAndReconnect():void
		{
			gameSocket&&gameSocket.close(true);
			if(GameData.useNewWS)
			{
				socket2.closeAndReconnect();
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
					curRequestData.cet=egret.getTimer();

					let costT:number=curRequestData.cet-curRequestData.cst;
					if(costT>=timeoutReport)
					{
						try
						{
							let reportData={cmd:data.cmd,cost:costT};
							if(PlatformManager.checkIsTWBSp()||PlatformManager.checkIsThSp()||PlatformManager.checkIsEnSp())
							{
								StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3")
							}
						}
						catch(e){}
					}
					if(websocketRequestList.length>0)
					{
						if(websocketRequestList[0].data&&GameData.serverTime)
						{
							websocketRequestList[0].data.clientts=GameData.serverTime;
						}
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
						if(websocketRequestList[0].data&&GameData.serverTime)
						{
							websocketRequestList[0].data.clientts=GameData.serverTime;
						}
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
			clearRequestList();
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
			clearRequestList();
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
				return;
			}
			websocketRequestList.push({data:data,callback:callback,callbackTarget:callbackTarget});
			if(isRequesting==false)
			{
				if(waitTimeOut<0)
				{
					waitTimeOut=egret.setTimeout(()=>{
						gameSocket.close(true);
					},socket,maxWaitTime);
				}
				isRequesting=true;
				if(websocketRequestList[0].data&&GameData.serverTime)
				{
					websocketRequestList[0].data.clientts=GameData.serverTime;
				}
				websocketRequestList[0].cst=egret.getTimer();
				App.LogUtil.log("socket2发送",websocketRequestList[0].data);
				gameSocket.send(websocketRequestList[0].data);
			}
		}

		function onReceiveData(e:egret.Event):void
		{
			let data:any=e.data;
			App.LogUtil.warn("socket2接收",data);
			if(websocketRequestList.length>0)
			{
				let curRequestData=websocketRequestList.shift();
				// curRequestData.cet=egret.getTimer();

				// let costT:number=curRequestData.cet-curRequestData.cst;
				// if(costT>=timeoutReport)
				// {
				// 	try
				// 	{
				// 		let reportData={cmd:data.cmd,cost:costT};
				// 		if(PlatformManager.checkIsTWBSp()||PlatformManager.checkIsThSp()||PlatformManager.checkIsEnSp())
				// 		{
				// 			StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3")
				// 		}
				// 	}
				// 	catch(e){}
				// }
				if(websocketRequestList.length>0)
				{
					if(websocketRequestList[0].data&&GameData.serverTime)
					{
						websocketRequestList[0].data.clientts=GameData.serverTime;
					}
					App.LogUtil.log("socket发送2",websocketRequestList[0].data);
					gameSocket.send(websocketRequestList[0].data);
				}
				else
				{
					isRequesting=false;
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
					if(websocketRequestList[0].data&&GameData.serverTime)
					{
						websocketRequestList[0].data.clientts=GameData.serverTime;
					}
					App.LogUtil.log("socket发送2",websocketRequestList[0].data);
					gameSocket.send(websocketRequestList[0].data);
				}
				else
				{
					isRequesting=false;
					if(waitTimeOut>-1)
					{
						egret.clearTimeout(waitTimeOut);
						waitTimeOut=-1;
					}
				}
			}
		}
		export function closeAndReconnect():void
		{
			gameSocket&&gameSocket.close(true);
		}

		function clearRequestList():void
		{
			isRequesting=false;
			if(websocketRequestList.length>0)
			{
				websocketRequestList.length=0;
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
			clearWaitToReconnect();
		}
	}

	export namespace chat
	{
		/**
		 * websocket请求消息队列
		 */
		let websocketRequestList:{data:any,callback:(data:any)=>void,callbackTarget:any,cst?:number,cet?:number,clientts?:number}[]=[];
		let isRequesting:boolean=false;
		let chatSocket:Socket|ClientSocket;
		/** 聊天最大超时时间 */
		let maxWaitTime:number=20000;
		/** timeout计时 */
		let waitTimeOut:number=-1;
		/** 超时统计timout计时 */
		let timeoutReport:number=GameData.waitLdRpt;
		/** 状态回调列表 */
		let statusCallbackList:{callback:(status:number)=>void,calllbackThisObj:any}[]=[];

		function init():void
		{
			if(!chatSocket)
			{
				chatSocket=createSocket(onStartReconnect,onReconnected,onNoconnect,onReceiveData,chat);
			}
		}
		/**
		 * 添加状态监听
		 * @param callback 
		 * @param calllbackThisObj 
		 */
		export function addStatusCallback(callback:(status:number)=>void,calllbackThisObj:any):void
		{
			let isFind:boolean=false;
			for(let i=statusCallbackList.length-1;i>=0;i--)
			{
				if(statusCallbackList[i].callback==callback&&statusCallbackList[i].calllbackThisObj==calllbackThisObj)
				{
					isFind=true;
				}
			}
			if(!isFind)
			{
				statusCallbackList.push({callback:callback,calllbackThisObj:calllbackThisObj});
			}
		}
		export function removeStatusCallback(callback:(status:number)=>void,calllbackThisObj:any):void
		{
			if(statusCallbackList&&statusCallbackList.length>0)
			{
				for(let i=statusCallbackList.length-1;i>=0;i--)
				{
					if(statusCallbackList[i].callback==callback&&statusCallbackList[i].calllbackThisObj==calllbackThisObj)
					{
						statusCallbackList.splice(i,1);
					}
				}
			}
		}
		function callbackStatus(status:number):void
		{
			if(statusCallbackList.length)
			{
				for (const key in statusCallbackList) {
					if (statusCallbackList.hasOwnProperty(key)) {
						const element = statusCallbackList[key];
						if(element.callback)
						{
							element.callback.call(element.calllbackThisObj,status);
						}
					}
				}
			}
		}
		export function isConnected():boolean
		{
			let result:boolean=false;
			if(chatSocket)
			{
				result = chatSocket.isConnected()&&chatSocket.isNoConnect()==false;
				if(result&&chatSocket["isReConnecting"])
				{
					result=!chatSocket["isReConnecting"]();
				}
			}
			return result;
		}

		export function getSocketStatus():number
		{
			let status=SocketStateEnum.STATE_CONNECTED;
			if(chatSocket["isReConnecting"]&&chatSocket["isReConnecting"]())
			{
				status=SocketStateEnum.STATE_RECONNECTING;
			}
			else if(chatSocket.isNoConnect())
			{
				status=SocketStateEnum.STATE_NOCONNECT;
			}
			else
			{
				status=SocketStateEnum.STATE_CONNECTED;
			}
			return status;
		}
		export function connect(host:string,port:number,connectSuccess:()=>void,thisObj:any):void
		{
			init();
			chatSocket.once(SocketStateConst.SOCKET_CONNECTED,()=>{
				if(connectSuccess)
				{
					App.LogUtil.log("chatsocket首次连接成功");
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
			callbackStatus(SocketStateEnum.STATE_RECONNECTING);
			if(websocketRequestList.length>0)
			{
				let callback=websocketRequestList[0].callback;
				if(callback)
				{
					callback.call(websocketRequestList[0].callbackTarget,{status:"fail"});
				}
			}
			clearRequestList();
			if(!isReconnecting)
			{
				// NetLoading.show();
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
			callbackStatus(SocketStateEnum.STATE_RECONNECTED);
			isReconnecting=false;
			LoginManager.reLoginChat();
		}

		/**
		 * socket重试多次后仍然连不上不再连
		 * @param e 
		 */
		function onNoconnect(e:egret.Event):void
		{
			callbackStatus(SocketStateEnum.STATE_NOCONNECT);
			App.LogUtil.log("chatscoket连不上，不连了");
			clearRequestList();
			if(isReconnecting)
			{
				// NetLoading.hide();
				isReconnecting=false;
			}
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
		export function send(data:any,callback?:(data:{status:"success"|"timeout"|"fail"})=>void,callbackTarget?:any):void
		{
			if(!chatSocket.isConnected())
			{
				return;
			}
			if (callbackTarget)
			{
				console.log("this.push"+callbackTarget.hashCode);
			}
			websocketRequestList.push({data:data,callback:callback,callbackTarget:callbackTarget});
			realSend();
		}

		/**
		 * 真正调用js发送chat请求接口
		 */
		function realSend():void
		{
			if(isRequesting==false)
			{
				if(waitTimeOut<0)
				{
					waitTimeOut=egret.setTimeout(()=>{
						try
						{
							let reportData={cmd:websocketRequestList[0].data.cmd,cost:maxWaitTime+"timeout"};
							StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"chatwait3");
						}
						catch(e){}
						let callback=websocketRequestList[0].callback;
						if(callback)
						{
							callback.call(websocketRequestList[0].callbackTarget,{status:"timeout"});
						}
						chatSocket.close(true);
						if(waitTimeOut>-1)
						{
							egret.clearTimeout(waitTimeOut);
							waitTimeOut=-1;
						}
					},socket,maxWaitTime);
				}
				isRequesting=true;
				if(websocketRequestList[0].data&&GameData.serverTime)
				{
					websocketRequestList[0].data.clientts=GameData.serverTime;
				}
				websocketRequestList[0].cst=egret.getTimer();
				App.LogUtil.log("chatsocket发送",websocketRequestList[0].data);
				chatSocket.send(websocketRequestList[0].data);
			}
		}

		function resend():void
		{

		}
		export function closeAndReconnect():void
		{
			chatSocket&&chatSocket.close(true);
		}

		function onReceiveData(e:egret.Event):void
		{
			let data:any=e.data;
			App.LogUtil.warn("chatSocket接收",data);
			if(websocketRequestList.length>0)
			{
				let curRequestData=websocketRequestList[0];
				if(data.type!="chat"||(curRequestData.data.clientts&&data.sender==Api.playerVoApi.getPlayerID()&&data.clientts==curRequestData.data.clientts))
				{
					if(waitTimeOut>-1)
					{
						egret.clearTimeout(waitTimeOut);
						waitTimeOut=-1;
					}
					curRequestData=websocketRequestList.shift();
				}
				else
				{
					NetManager.formatReceiveChat(data);
					return;
				}

				curRequestData.cet=egret.getTimer();

				let costT:number=curRequestData.cet-curRequestData.cst;
				if(costT>=timeoutReport)
				{
					try
					{
						let reportData={cmd:data.cmd,cost:costT};
						if(PlatformManager.checkIsTWBSp()||PlatformManager.checkIsThSp()||PlatformManager.checkIsEnSp())
						{
							StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3")
						}
					}
					catch(e){}
				}

				isRequesting=false;
				if(websocketRequestList.length>0)
				{
					realSend();
				}
				else
				{
					if(waitTimeOut>-1)
					{
						egret.clearTimeout(waitTimeOut);
						waitTimeOut=-1;
					}
				}

				NetManager.formatReceiveChat(data);
				let callback=curRequestData.callback;
				if(callback)
				{	
					if (data.type == "blocked")
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("chatMsgBlocked"));
					}
					callback.call(curRequestData.callbackTarget,{status:"success"});
				}
				//todo 接收消息后处理
			}
			else
			{
				isRequesting=false;
				NetManager.formatReceiveChat(data);
				if(waitTimeOut>-1)
				{
					egret.clearTimeout(waitTimeOut);
					waitTimeOut=-1;
				}
			}
		}

		function clearRequestList():void
		{
			isRequesting=false;
			if(websocketRequestList.length>0)
			{
				websocketRequestList.length=0;
			}
			isRequesting=false;
			if(waitTimeOut>-1)
			{
				egret.clearTimeout(waitTimeOut);
				waitTimeOut=-1;
			}
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