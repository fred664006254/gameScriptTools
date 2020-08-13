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
    /**
     * 后端数据异常
     */
    ResponseEnums[ResponseEnums["ret-1"] = -1] = "ret-1";
    /**
     * 请求参数错误
     */
    ResponseEnums[ResponseEnums["ret-2"] = -2] = "ret-2";
    /**
     * 条件不满足
     */
    ResponseEnums[ResponseEnums["ret-3"] = -3] = "ret-3";
    /**
     * 保存失败
     */
    ResponseEnums[ResponseEnums["ret-5"] = -5] = "ret-5";
})(ResponseEnums || (ResponseEnums = {}));
//# sourceMappingURL=ResponseEnums.js.map