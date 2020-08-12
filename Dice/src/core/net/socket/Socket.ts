/**
 * socket封装
 * author 陈可
 * date 2017/9/8
 * @class Socket
 */
class Socket extends egret.EventDispatcher
{
	private _socket:egret.WebSocket=undefined;
	private _connectState:number=SocketStateEnum.STATE_INIT;
	private _host:string=undefined;
	private _port:number=undefined;
	private _reconnectCount:number=0;
	private _maxReconnectCount:number=10;
	private _dataMsg:ByteMsg;
	private _operaClose:boolean=false;
	private _isCloseAndTryConnect:boolean=false;
	/** 尝试连接超时时间 */
	private _connectTimeout:number=5000;
	private _connectTimeoutCount:number=-1;
	public constructor() 
	{
		super();
		this.init();
	}
	private init():void
	{
		this.initSocket();
		this._dataMsg=new ByteMsg();
		this._connectState=SocketStateEnum.STATE_INIT;
	}

	private initSocket():void
	{
		this._socket=new egret.WebSocket();
		this._socket.type = egret.WebSocket.TYPE_BINARY;
		this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
	}

	/**
     * 开始Socket连接
     */
    public connect(host:string,port:number):void
	{
        if (App.DeviceUtil.IsHtml5())
		{
            if (!window["WebSocket"]) 
			{
                App.LogUtil.log("不支持WebSocket");
                return;
            }
        }
		this._operaClose=false;
		this._host=host;
		this._port=port;
        // if (this._dataMsg instanceof egret.ByteArray) 
		// {
        //     this._socket.type = egret.WebSocket.TYPE_BINARY;
        // }
        App.LogUtil.log("socket开始连接: " + this._host + ":" + this._port);
		if(this._connectState==SocketStateEnum.STATE_RECONNECTING)
		{}
		else
		{
			this._connectState=SocketStateEnum.STATE_CONNECTING;
		}
		if(NetManager.checkHttps())
		{
			let addValue:number=1000;
		// 	if(Number(this._port)==10000||Number(this._port)==10001)
		// 	{
		// 		addValue=1100;
		// 	}
		// 	else if(Number(this._port)==2002||Number(this._port)==1002)
		// 	{
		// 		addValue=100;
		// 	}
			this._socket.connectByUrl("wss://"+this._host+":"+String(Number(this._port)+addValue));
		}
		// else
		// {
        	this._socket.connect(this._host, this._port);
		// }
		this.clearConnectTime();
		this._connectTimeoutCount=egret.setTimeout(this.connectTimeoutHandler,this,this._connectTimeout);
	}
	
	private connectTimeoutHandler():void
	{
		this.clearConnectTime();
		this.onSocketClose(null);
	}
	private clearConnectTime()
	{
		if(this._connectTimeoutCount>-1)
		{
			egret.clearTimeout(this._connectTimeoutCount);
			this._connectTimeoutCount=-1;
		}
	}

	public close(isCloseAndTryConnect?:boolean):void
	{
		App.LogUtil.log("close");
		if(this._socket)
		{
			this._isCloseAndTryConnect=Boolean(isCloseAndTryConnect);
			this._operaClose=true;
			this.removeEvt();
			this._socket.close();
			if(this._isCloseAndTryConnect)
			{
				this.resetAndReconnect();
			}
			else
			{
				this.resetSocket();
			}
		}
	}

    /**
     * 重新连接
     */
    private reconnect():void 
	{
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) 
		{
			App.LogUtil.log("socket开始重连"+this._reconnectCount);
			this._connectState=SocketStateEnum.STATE_RECONNECTING;
            this.connect(this._host,this._port);
        }
		else
		{
			App.LogUtil.log("socket次数"+this._reconnectCount,"不再重连");
			this._connectState = SocketStateEnum.STATE_NOCONNECT;
			this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_NOCONNECT));
			this._isCloseAndTryConnect=false;
        }
    }

	/**
     * 服务器连接成功
     */
    private onSocketOpen(e:egret.Event):void 
	{
		this.clearConnectTime();
		App.LogUtil.log("socket连接成功");
		this._isCloseAndTryConnect=false;
		this._reconnectCount = 0;
		if(this._connectState==SocketStateEnum.STATE_RECONNECTING)
		{
			this._connectState=SocketStateEnum.STATE_RECONNECTED;
			this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_RECONNECTED));
		}
		else
		{
			this._connectState=SocketStateEnum.STATE_CONNECTED;
			this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_CONNECTED));
		}
    }

	private onReceiveData(e:egret.ProgressEvent):void
	{
		let receiveData:any = this._dataMsg.receive(this._socket);
		let dataEvent:egret.Event = egret.Event.create(egret.Event,SocketStateConst.SOCKET_DATA);
		dataEvent.data=receiveData;
		this.dispatchEvent(dataEvent);
	}

	private onSocketClose(e:egret.Event):void
	{
		if(e)
		{
			this.clearConnectTime();
		}
		if(this._operaClose)
		{
			App.LogUtil.log("主动操作关闭socket");
			this._connectState=SocketStateEnum.STATE_INIT;
			if(this._isCloseAndTryConnect)
			{
				this._reconnectCount=0;
			}
			else
			{
				return;
			}
		}
		App.LogUtil.log("socket关闭，开始检测重连");
		this.resetAndReconnect();
	}

	private onSocketError(e:egret.IOErrorEvent):void
	{
		this.clearConnectTime();
		if(LoginMgr.isLoginGameSuccess)
		{
			App.LogUtil.log("socket错误，开始检测重连");
			this.resetAndReconnect();
		}
		else{
			this._reconnectCount=0;
			this.resetSocket();  
		}

	}

	public resetAndReconnect(resetCount:boolean=false):void
	{
		if(resetCount)
		{
			this._reconnectCount=0;
		}
		this.resetSocket();
		this.reconnect();
		if(this._reconnectCount<this._maxReconnectCount)
		{
			this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_START_RECONNECT));
		}
	}

	/**
	 * 发送数据
	 * @param data 数据对象json格式
	 */
	public send(data:any)
	{
		if(!data)
		{
			data={};
		}
		this._dataMsg.send(this._socket,data);
	}

	public isConnected():boolean
	{
		return this._socket.connected;
	}

	/**
	 * 是否正在重连
	 */
	public isReConnecting():boolean
	{
		return this._connectState==SocketStateEnum.STATE_RECONNECTING;
	}

	public isNoConnect():boolean
	{
		return this._connectState==SocketStateEnum.STATE_NOCONNECT;
	}

	private resetSocket():void
	{
		this.removeEvt();
		this.clearConnectTime();
		this.initSocket();
	}

	private removeEvt():void
	{
		if(this._socket)
		{
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
			this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
		}
	}

	/**
	 * 调用这个方法说明这个对象不再使用了
	 */
	public dispose():void
	{
		this.removeEvt();
		this.clearConnectTime();
		this._dataMsg=null;
		this._connectState=null;
		this._host=null;
		this._port=null;
		this._socket=null;
		this._operaClose=false;
		this._isCloseAndTryConnect=false;
	}
}