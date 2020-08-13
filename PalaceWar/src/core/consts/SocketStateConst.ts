/**
 * socket连接状态
 * author 陈可
 * date 2017/9/8
 * @class SocketStateConst
 */
namespace SocketStateConst
{
    /**
     * socket连接上
     */
    export const SOCKET_CONNECTED:string="socket_connect";

    /**
     * socket断线重新连接上
     */
    export const SOCKET_RECONNECTED:string="socket_reconnect";

    /**
     * socket断线了，开始尝试重连
     */
    export const SOCKET_START_RECONNECT:string="socket_start_reconnect";

    /**
     * socket已关闭
     */
    export const SOCKET_CLOSE:string="socket_close";

    /**
     * socket接收消息
     */
    export const SOCKET_DATA:string="socket_data";

    /**
     * socket连接不上
     */
    export const SOCKET_NOCONNECT:string="socket_noconnect";
}