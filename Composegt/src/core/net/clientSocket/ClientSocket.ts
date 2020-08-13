class ClientSocket extends egret.EventDispatcher
{
	private _clientSocket:RSDKWebSocket;
	private connected:boolean=false;
	private _connectState:number=SocketStateEnum.STATE_INIT;
	private _host:string;
	private _port:number;
	private _name:string;
	private _operaClose:boolean=false;
	private _isCloseAndTryConnect:boolean=false;
	private static _newIndex:number=0;
	public constructor() 
	{
		super();
		ClientSocket._newIndex++;
		this._name="ClientSocket"+ClientSocket._newIndex;
		App.LogUtil.log(this._name);
		this._clientSocket=new RSDKWebSocket(this._name);
		window[this._name]=this;
		this.setWebSocketCallback();
	}

	public connect(host:string,port:number):void
	{
		App.LogUtil.log("clientsocket连接"+host+port+"name="+this._name);
		this._operaClose=false;
		this._host=host;
		this._port=port;
		this._clientSocket.connectWebSocket(this._name,"ws://"+host+":"+port);
	}

	public isConnected():boolean
	{
		return this.connected;
	}

	public isNoConnect():boolean
	{
		return this._connectState==SocketStateEnum.STATE_NOCONNECT;
	}

	public send(data:any):void
	{
		App.LogUtil.log("send::name="+this._name);
		this._clientSocket.sendWebSocketMessage(this._name,App.StringUtil.toString(data));
	}

	private disconnectWebSocket():void
	{
		this._clientSocket.disconnectWebSocket(this._name);
	}

	private setWebSocketCallback():void
	{
		this._clientSocket.setWebSocketCallback(this._name,this.callback.bind(this));
		// window[this._name].webSocketCallback=this.callback.bind(this);
	}

	private callback(code:string,msg:string):void
	{
		App.LogUtil.log("clientsocket回调"+code+"::"+msg);
		if(code)
		{
			switch(code)
			{
				case RSDKCode.RET_WEBSOCKET_CONNECT_SUCCEED:
					this._isCloseAndTryConnect=false;
					this.connected=true;
					this._connectState=SocketStateEnum.STATE_CONNECTED;
					this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_CONNECTED));
					break;
				case RSDKCode.RET_WEBSOCKET_CONNECT_FAIL:
					this.connected=false;
					this._connectState=SocketStateEnum.STATE_INIT;
					break;
				case RSDKCode.RET_WEBSOCKET_CONNECT_DIS://只有手动关闭socket才会走的这里
					this.connected=false;
					this._connectState=SocketStateEnum.STATE_INIT;
					// this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_NOCONNECT));
					if(this._operaClose)
					{
						if(this._isCloseAndTryConnect)
						{
							this.resetAndReconnect();
						}
					}
					break;
				case RSDKCode.RET_WEBSOCKET_RECEIVE_MSG_SUCCEED:
					let receiveData:any;
					try
					{
						receiveData=JSON.parse(msg);
					}
					catch(e)
					{
						receiveData=JSON.parse(msg);
					}
					let dataEvent:egret.Event = egret.Event.create(egret.Event,SocketStateConst.SOCKET_DATA);
					dataEvent.data=receiveData;
					this.dispatchEvent(dataEvent);
					break;
				case RSDKCode.RET_WEBSOCKET_CONNECT_TIMEOUT:
				case RSDKCode.RET_WEBSOCKET_ERROR:
					this._isCloseAndTryConnect=false;
					this.connected=false;
					this._connectState=SocketStateEnum.STATE_NOCONNECT;
					this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_NOCONNECT));
					break;
			}
		}
	}

	public resetAndReconnect(resetCount:boolean=false):void
	{
		this.connect(this._host,this._port);
	}

	public close(isCloseAndTryConnect?:boolean):void
	{
		this._isCloseAndTryConnect=Boolean(isCloseAndTryConnect);
		this._operaClose=true;
		this.disconnectWebSocket();
	}

	public dispose():void
	{
		this._operaClose=false;
		this._isCloseAndTryConnect=false;
	}
}