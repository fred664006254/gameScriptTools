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
        var _this = this;
        this._initCb = initCb;
        this._initCbObj = initCbObject;
        var sub = PlatformManager.getAppid();
        var middle = PlatformManager.getSpName();
        var big = PlatformManager.getBigAppid();
        console.log("sub middle big", sub, middle, big);
        var cb = function (data) {
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, PlatCfg.loadJsonError, PlatCfg);
            PlatCfg.loginLogo = data.loginLogo;
            PlatCfg.loginBg = data.loginBg;
            if (PlatformManager.checkIsIOSShenheSp()) {
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
            }
            else {
                PlatCfg.loginBg = "loginbg";
                if (PlatformManager.checkIsFB()) {
                    PlatCfg.loginBg = "loginbg_fben";
                }
                else if (data.use) {
                    PlatCfg.loginBg = data.loginBg;
                }
            }
            if (PlatformManager.checkIsTWBSp()) {
                var date = new Date();
                if (date.getTime() / 1000 >= 1548727200) {
                    if (PlatCfg.loginBg && ResourceManager.hasRes(PlatCfg.loginBg + "_tw2")) {
                        PlatCfg.loginBg = PlatCfg.loginBg + "_tw2";
                    }
                    if (PlatCfg.loginLogo && ResourceManager.hasRes(PlatCfg.loginLogo + "_tw2")) {
                        PlatCfg.loginLogo = PlatCfg.loginLogo + "_tw2";
                    }
                }
            }
            if (PlatCfg._initCb) {
                PlatCfg._initCb.call(PlatCfg._initCbObj);
            }
            _this._initCb = null;
            _this._initCbObj = null;
        };
        var jsonName = "";
        if (sub !== "" && RES.hasRes("sub" + sub + "_json")) {
            jsonName = "sub" + sub + "_json";
        }
        else if (middle !== "" && RES.hasRes("middle" + middle + "_json")) {
            jsonName = "middle" + middle + "_json";
        }
        else if (big !== "" && big !== "0" && RES.hasRes("big" + big + "_json")) {
            jsonName = "big" + big + "_json";
        }
        else {
            var cfgNameKey = "0";
            if (!PlatCfg.defaultCfg[PlatformManager.getSpid()]) {
                cfgNameKey = "1";
                if (!ResourceManager.hasRes("big1_json")) {
                    cfgNameKey = "0";
                }
            }
            else {
                if (Number(big) == 17009000 && Number(sub) > 17009010) {
                    cfgNameKey = "1";
                    if (!ResourceManager.hasRes("big1_json")) {
                        cfgNameKey = "0";
                    }
                }
            }
            jsonName = "big" + cfgNameKey + "_json";
            PlatCfg._jsonName = jsonName;
        }
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, PlatCfg.loadJsonError, PlatCfg);
        ResourceManager.loadItem(jsonName, cb, this);
    };
    PlatCfg.loadJsonError = function (e) {
        if (e.resItem.name == PlatCfg._jsonName) {
            App.ResourceUtil.retrySwithCDN(e.resItem.name, function () {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, PlatCfg.loadJsonError, PlatCfg);
                PlatCfg.initCfg(PlatCfg._initCb, PlatCfg._initCbObj);
            }, PlatCfg);
        }
    };
    PlatCfg.defaultCfg = {
        "3k": "1",
        "yyb": "1",
        "xly": "1",
        "zjly": "1",
        "tw": "1",
        "kr": "1",
        "th": "1",
        "en": "1"
    };
    PlatCfg._jsonName = "";
    PlatCfg._initCb = null;
    PlatCfg._initCbObj = null;
    return PlatCfg;
}());
__reflect(PlatCfg.prototype, "PlatCfg");
//# sourceMappingURL=PlatCfg.js.map