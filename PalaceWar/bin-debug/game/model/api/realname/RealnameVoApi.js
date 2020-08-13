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
 * 实名认证Api
 * author 赵占涛
 * date 2018/8/9
 * @class RealnameVoApi
 */
var RealnameVoApi = (function (_super) {
    __extends(RealnameVoApi, _super);
    function RealnameVoApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 设置实名认证信息 */
    RealnameVoApi.prototype.setIdcardInfo = function (idnumber, name, usertype, cb) {
        var reqData = { t: "setidcardinfo", pid: LoginManager.getLocalUserName(), idnumber: idnumber, name: name, usertype: usertype };
        if (ServerCfg.checkServerDebug()) {
            reqData.debug = 1;
        }
        var version = PlatformManager.getAppVersion();
        var channel = PlatformManager.getAppid();
        if (version) {
            reqData.version = version;
        }
        if (channel) {
            reqData.channel = channel;
        }
        if (PlatformManager.checkIsIOSShenheSp()) {
            reqData.isShenhe = "1";
        }
        reqData.isnew = true;
        if (App.DeviceUtil.isAndroid()) {
            console.log("判断为andorid");
            reqData.os = "android";
        }
        else if (App.DeviceUtil.isIOS()) {
            console.log("判断为ios");
            reqData.os = "ios";
        }
        NetManager.http.get(ServerCfg.svrCfgUrl, reqData, function (newdata) {
            GameData.isAntiaddiction = false;
            cb(false);
        }, function () {
            NetLoading.hide();
            cb(true);
            console.log("get setidcardinfo error");
        }, this);
    };
    return RealnameVoApi;
}(BaseVoApi));
__reflect(RealnameVoApi.prototype, "RealnameVoApi");
//# sourceMappingURL=RealnameVoApi.js.map