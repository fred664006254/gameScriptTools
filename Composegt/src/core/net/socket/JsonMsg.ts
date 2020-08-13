/**
 * JSON消息处理
 * author 陈可
 * date 2017/9/8
 * @class JsonMsg
 */
class JsonMsg extends BaseClass
{
	public constructor() 
	{
		super();
	}

	/**
	 * 发送消息处理
	 * @param socket 消息socket
	 * @param data 消息数据
	 */
	public send(socket:egret.WebSocket,data:any):void
	{
		let sendData:any=this.encode(data);
		if(sendData)
		{
			socket.type=egret.WebSocket.TYPE_STRING;
			socket.writeUTF(sendData);
		}
	}

	/**
     * 接收消息处理
     * @param socket 消息socket
     */
    public receive(socket:egret.WebSocket):any 
	{
        var dataStr:string = socket.readUTF();
        return this.decode(dataStr);
    }

	/**
     * 消息封装
     * @param data
     */
    private encode(data:any):any 
	{
        let dataStr:string=App.StringUtil.toString(data);
        return dataStr;
    }

	/**
	 * 解析数据
	 * @param dataStr 
	 */
	private decode(dataStr:string):any
	{
		let receiveData=JSON.parse(dataStr);
		return receiveData;
	}

	public dispose():void
	{
	}
}