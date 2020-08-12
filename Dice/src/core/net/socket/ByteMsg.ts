
/**
 * JSON消息处理
 * author 陈可
 * date 2017/9/8
 * @class JsonMsg
 */
class ByteMsg extends BaseClass
{
    private _byteArray:egret.ByteArray=null;
    /**
	 * 发送消息处理
	 * @param socket 消息socket
	 * @param data 消息数据
	 */
	public send(socket:egret.WebSocket,jsonData:any):void
	{
        App.LogUtil.warn("socket send:",jsonData);
		let byteData:Uint8Array=this.encode(jsonData);
		if(byteData)
		{
			socket.type=egret.WebSocket.TYPE_BINARY;
			socket.writeBytes(new egret.ByteArray(byteData));
			socket.flush();
		}
	}

	/**
     * 接收消息处理
     * @param socket 消息socket
     */
    public receive(socket:egret.WebSocket):any 
	{
        let byte=new egret.ByteArray();
        socket.readBytes(byte);
        let jsonData=this.decode(byte.bytes);
        let d=<any>jsonData;
        // if(d.cmd=="battle.sync"&&d.data&&d.data.syncOptData)
        // {
        //     if(Object.keys(d.data.syncOptData).length>0)
        //     {
        //         App.LogUtil.warn(d.uid,d.data.syncOptData);
        //     }
        // }
        App.LogUtil.warn("socket receive:",jsonData);
        return jsonData;
    }

	/**
     * 消息封装
     * @param data
     */
    private encode(jsonData:{cmd:string,params:Object|Uint8Array}):Uint8Array 
	{
        let cmd=jsonData.cmd;
        let sckey=cmd.replace(".","_");

        if(jsonData.params)
        {
            for (const key in jsonData.params) 
            {
                if (jsonData.params.hasOwnProperty(key)) 
                {
                    const element = jsonData.params[key];
                    if(!element)
                    {
                        delete jsonData.params[key];
                    }
                }
            }
        }
        let keyl=jsonData.params?Object.keys(jsonData.params).length:0;
        if(dice["cs_"+sckey]&&keyl>0)
        {
            let params=jsonData.params;
            var ret = dice["cs_"+sckey].verify(params);
            if(ret){
                console.log(ret);
                throw Error(ret);
            }

            var cData = dice["cs_"+sckey].create(params);
            jsonData.params=dice["cs_"+sckey].encode(params).finish();
        }
        else
        {
            delete jsonData.params;
        }

        // var ret = dice.CsRayMsg.verify(jsonData);
        
        // if(ret){
        //     console.log(ret);
        //     throw Error(ret);
        // }
        // else
        // {
            var msg = dice.CsRayMsg.create(<any>jsonData);
            // console.log(msg);
            var buf = dice.CsRayMsg.encode(<any>jsonData).finish();
        // }
        return buf;
    }

	/**
	 * 解析数据
	 * @param dataStr 
	 */
	private decode(rData:Uint8Array):Object
	{
        let jsonData:{cmd:string,data:Uint8Array|Object,model?:{[key:string]:Uint8Array|Object},ret:number}=null;
        try
        {
            jsonData=<any>dice.ScRayMsg.decode(rData);
        }
        catch(e)
        {
            let errorStr:string="";
            if(!this._byteArray)
            {
                this._byteArray=new egret.ByteArray(rData);
            }
            else
            {
                this._byteArray.clear();
                this._byteArray.buffer=rData;
            }
            let readAvailable=this._byteArray.readAvailable;
            if(readAvailable>0)
            {
                errorStr=this._byteArray.readUTFBytes(readAvailable);
            }
            App.MsgHelper.dispEvt(MsgConst.SC_DECODE_ERROR,errorStr);
            return;
        }
        if(jsonData.data)
        {
            let cmd=jsonData.cmd;
            let sckey=cmd.replace(".","_");
            if(dice["sc_"+sckey])
            {
                jsonData.data=dice["sc_"+sckey].decode(jsonData.data);
            }
            else
            {
                App.LogUtil.log("缺少对应解析配置");
            }
        }
        let model = jsonData.model;
        if(model)
        {
            for (const modelName in model) {
                if (model.hasOwnProperty(modelName)) {
                    const modelData = model[modelName];
                    let modeldecodekey="model_"+modelName;
                    if(dice[modeldecodekey])
                    {
                        model[modelName] = dice[modeldecodekey].decode(modelData);
                    }
                }
            }
        }
        return jsonData;
	}

	public dispose():void
	{
        this._byteArray=null;
	}
}