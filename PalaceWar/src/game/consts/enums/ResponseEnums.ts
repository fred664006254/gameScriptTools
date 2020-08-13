/**
 * 请求返回状态码
 * author 陈可
 * date 2019/11/19
 * @class ResponseEnums
 * 范围-10001每次新加都减一，不允许大于-10001
 */
enum ResponseEnums
{
	/**
	 * 网络错误,socket重连了
	 */
	"socketError"=-10001,

	/**
	 * 后端数据异常
	 */
	"ret-1"=-1,

	/**
	 * 请求参数错误
	 */
	"ret-2"=-2,

	/**
	 * 条件不满足
	 */
	"ret-3"=-3,

	/**
	 * 保存失败
	 */
	"ret-5"=-5,
}