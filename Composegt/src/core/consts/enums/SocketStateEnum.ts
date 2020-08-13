/**
 * socket状态枚举
 * author 陈可
 * date 2017/9/8
 * @class SocketStateEnum
 */
enum SocketStateEnum
{
	STATE_INIT,
	STATE_CONNECTING,
	STATE_CONNECTED,
	STATE_RECONNECTING,
	STATE_RECONNECTED,
	STATE_NOCONNECT
}