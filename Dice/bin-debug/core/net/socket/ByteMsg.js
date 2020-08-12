var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * JSON消息处理
 * author 陈可
 * date 2017/9/8
 * @class JsonMsg
 */
var ByteMsg = (function (_super) {
    __extends(ByteMsg, _super);
    function ByteMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._byteArray = null;
        return _this;
    }
    /**
     * 发送消息处理
     * @param socket 消息socket
     * @param data 消息数据
     */
    ByteMsg.prototype.send = function (socket, jsonData) {
        App.LogUtil.warn("socket send:", jsonData);
        var byteData = this.encode(jsonData);
        if (byteData) {
            socket.type = egret.WebSocket.TYPE_BINARY;
            socket.writeBytes(new egret.ByteArray(byteData));
            socket.flush();
        }
    };
    /**
     * 接收消息处理
     * @param socket 消息socket
     */
    ByteMsg.prototype.receive = function (socket) {
        var byte = new egret.ByteArray();
        socket.readBytes(byte);
        var jsonData = this.decode(byte.bytes);
        var d = jsonData;
        // if(d.cmd=="battle.sync"&&d.data&&d.data.syncOptData)
        // {
        //     if(Object.keys(d.data.syncOptData).length>0)
        //     {
        //         App.LogUtil.warn(d.uid,d.data.syncOptData);
        //     }
        // }
        App.LogUtil.warn("socket receive:", jsonData);
        return jsonData;
    };
    /**
     * 消息封装
     * @param data
     */
    ByteMsg.prototype.encode = function (jsonData) {
        var cmd = jsonData.cmd;
        var sckey = cmd.replace(".", "_");
        if (jsonData.params) {
            for (var key in jsonData.params) {
                if (jsonData.params.hasOwnProperty(key)) {
                    var element = jsonData.params[key];
                    if (!element) {
                        delete jsonData.params[key];
                    }
                }
            }
        }
        var keyl = jsonData.params ? Object.keys(jsonData.params).length : 0;
        if (dice["cs_" + sckey] && keyl > 0) {
            var params = jsonData.params;
            var ret = dice["cs_" + sckey].verify(params);
            if (ret) {
                console.log(ret);
                throw Error(ret);
            }
            var cData = dice["cs_" + sckey].create(params);
            jsonData.params = dice["cs_" + sckey].encode(params).finish();
        }
        else {
            delete jsonData.params;
        }
        // var ret = dice.CsRayMsg.verify(jsonData);
        // if(ret){
        //     console.log(ret);
        //     throw Error(ret);
        // }
        // else
        // {
        var msg = dice.CsRayMsg.create(jsonData);
        // console.log(msg);
        var buf = dice.CsRayMsg.encode(jsonData).finish();
        // }
        return buf;
    };
    /**
     * 解析数据
     * @param dataStr
     */
    ByteMsg.prototype.decode = function (rData) {
        var jsonData = null;
        try {
            jsonData = dice.ScRayMsg.decode(rData);
        }
        catch (e) {
            var errorStr = "";
            if (!this._byteArray) {
                this._byteArray = new egret.ByteArray(rData);
            }
            else {
                this._byteArray.clear();
                this._byteArray.buffer = rData;
            }
            var readAvailable = this._byteArray.readAvailable;
            if (readAvailable > 0) {
                errorStr = this._byteArray.readUTFBytes(readAvailable);
            }
            App.MsgHelper.dispEvt(MsgConst.SC_DECODE_ERROR, errorStr);
            return;
        }
        if (jsonData.data) {
            var cmd = jsonData.cmd;
            var sckey = cmd.replace(".", "_");
            if (dice["sc_" + sckey]) {
                jsonData.data = dice["sc_" + sckey].decode(jsonData.data);
            }
            else {
                App.LogUtil.log("缺少对应解析配置");
            }
        }
        var model = jsonData.model;
        if (model) {
            for (var modelName in model) {
                if (model.hasOwnProperty(modelName)) {
                    var modelData = model[modelName];
                    var modeldecodekey = "model_" + modelName;
                    if (dice[modeldecodekey]) {
                        model[modelName] = dice[modeldecodekey].decode(modelData);
                    }
                }
            }
        }
        return jsonData;
    };
    ByteMsg.prototype.dispose = function () {
        this._byteArray = null;
    };
    return ByteMsg;
}(BaseClass));
__reflect(ByteMsg.prototype, "ByteMsg");
//# sourceMappingURL=ByteMsg.js.map