/**
 * socket状态枚举
 * author 陈可
 * date 2017/9/8
 * @class SocketStateEnum
 */
var SocketStateEnum;
(function (SocketStateEnum) {
    SocketStateEnum[SocketStateEnum["STATE_INIT"] = 0] = "STATE_INIT";
    SocketStateEnum[SocketStateEnum["STATE_CONNECTING"] = 1] = "STATE_CONNECTING";
    SocketStateEnum[SocketStateEnum["STATE_CONNECTED"] = 2] = "STATE_CONNECTED";
    SocketStateEnum[SocketStateEnum["STATE_RECONNECTING"] = 3] = "STATE_RECONNECTING";
    SocketStateEnum[SocketStateEnum["STATE_RECONNECTED"] = 4] = "STATE_RECONNECTED";
    SocketStateEnum[SocketStateEnum["STATE_NOCONNECT"] = 5] = "STATE_NOCONNECT";
})(SocketStateEnum || (SocketStateEnum = {}));
