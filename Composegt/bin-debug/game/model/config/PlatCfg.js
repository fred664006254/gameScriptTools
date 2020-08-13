var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 平台配置
 * @author 赵占涛
 */
var PlatCfg = (function () {
    function PlatCfg() {
    }
    // 初始化平台配置
    PlatCfg.initCfg = function (initCb, initCbObject) {
        var sub = PlatformManager.getAppid();
        var middle = PlatformManager.getSpName();
        var big = PlatformManager.getBigAppid();
        console.log("sub middle big", sub, middle, big);
        var logoCfg = {
            "1003017007": "loginres_logo_jshy",
            "1003017008": "loginres_logo_jztx",
            "1003017009": "loginres_logo_hsmn",
            "1014001004": "loginres_logo_wdbtn",
            "1014001005": "loginres_logo_wjdzd",
            "1014004007": "loginres_logo_ypxjd",
        };
        var cb = function (data) {
            PlatCfg.loginLogo = data.loginLogo;
            PlatCfg.loginBg = data.loginBg;
            if (logoCfg[sub]) {
                PlatCfg.loginLogo = logoCfg[sub];
            }
            var loginBgName = "loginbg_" + sub;
            if (RES.hasRes(loginBgName)) {
                PlatCfg.loginBg = loginBgName;
            }
            else {
                loginBgName = "loginbg_" + big;
                if (RES.hasRes(loginBgName)) {
                    PlatCfg.loginBg = loginBgName;
                }
            }
            initCb.call(initCbObject);
        };
        if (sub !== "" && RES.hasRes("sub" + sub + "_json")) {
            ResourceManager.loadItem("sub" + sub + "_json", cb, this);
        }
        else if (middle !== "" && RES.hasRes("middle" + middle + "_json")) {
            ResourceManager.loadItem("middle" + middle + "_json", cb, this);
        }
        else if (big !== "" && RES.hasRes("big" + big + "_json")) {
            ResourceManager.loadItem("big" + big + "_json", cb, this);
        }
        else {
            ResourceManager.loadItem("big0_json", cb, this);
        }
    };
    return PlatCfg;
}());
__reflect(PlatCfg.prototype, "PlatCfg");
