/**
 * socket连接状态
 * author 陈可
 * date 2017/9/8
 * @class SocketStateConst
 */
var SocketStateConst;
(function (SocketStateConst) {
    /**
     * socket连接上
     */
    SocketStateConst.SOCKET_CONNECTED = "socket_connect";
    /**
     * socket断线重新连接上
     */
    SocketStateConst.SOCKET_RECONNECTED = "socket_reconnect";
    /**
     * socket断线了，开始尝试重连
     */
    SocketStateConst.SOCKET_START_RECONNECT = "socket_start_reconnect";
    /**
     * socket已关闭
     */
    SocketStateConst.SOCKET_CLOSE = "socket_close";
    /**
     * socket接收消息
     */
    SocketStateConst.SOCKET_DATA = "socket_data";
    /**
     * socket连接不上
     */
    SocketStateConst.SOCKET_NOCONNECT = "socket_noconnect";
})(SocketStateConst || (SocketStateConst = {}));
