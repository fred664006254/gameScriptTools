/**
 * 请求返回状态码
 * author 陈可
 * date 2019/11/19
 * @class ResponseEnums
 * 范围-10001每次新加都减一，不允许大于-10001
 */
var ResponseEnums;
(function (ResponseEnums) {
    /**
     * 网络错误,socket重连了
     */
    ResponseEnums[ResponseEnums["socketError"] = -10001] = "socketError";
})(ResponseEnums || (ResponseEnums = {}));
