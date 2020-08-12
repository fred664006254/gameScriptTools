var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 服务器列表配置
 */
var ServerCfg = (function () {
    function ServerCfg() {
    }
    ;
    ServerCfg.initSvrUrl = function () {
        var hosturl = ServerCfg.getHost();
        this.svrCfgUrl = "//" + hosturl + "/gucenter/";
        this.baseUrl = "//" + hosturl + "/gucenter/";
    };
    ServerCfg.getHost = function () {
        if (App.DeviceUtil.IsHtml5()) {
            if (PlatMgr.checkIsPlatSp()) {
                return ServerCfg.allHost[App.TestUtil.getTestPlat()];
            }
        }
        var localMultiLanguage = PlatMgr.getLocalMultiLanguage();
        if (localMultiLanguage && ServerCfg.allHost[localMultiLanguage]) {
            return ServerCfg.allHost[localMultiLanguage];
        }
        return ServerCfg.allHost[PlatMgr.getSpid()];
        //return ServerCfg.allHost["wanba"];
    };
    ServerCfg.checkServerDebug = function () {
        var isDebug = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var baseUrl = document.baseURI || window.location.pathname;
            if (baseUrl && baseUrl.indexOf("gt_test") > -1) {
                isDebug = true;
            }
        }
        else if (PlatMgr.checkIsTest() || PlatMgr.checkIsLocal()) {
            isDebug = true;
        }
        if (PlatMgr.checkIsPlatSp()) {
            if (App.TestUtil.checkIsTestPlat1000()) {
                isDebug = true;
            }
            else {
                isDebug = false;
            }
        }
        return isDebug;
        // return true;
    };
    ServerCfg.checkTestByBaseDiv = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var baseUrl = document.baseURI;
            if (baseUrl.indexOf("gt_test") > -1) {
                return true;
            }
        }
        return false;
    };
    // 获取微信小游戏default
    ServerCfg.getWxDefaultUrl = function () {
        if (PlatMgr.checkIsWxSp()) {
            // return "https://gt-fkwx-cdn.raygame3.com/gt_wx/resource/";
            // return "resource/";
            return "https://lz-wx-cdn.leishengame.com/gt_wx/resource/default.res.json";
        }
    };
    // 获取微信小游戏资源url
    ServerCfg.getWxGameResourceUrl = function () {
        if (PlatMgr.checkIsWxSp()) {
            // return "https://gt-fkwx-cdn.raygame3.com/gt_wx/resource/";
            // return "resource/";
            return "https://lz-wx-cdn.leishengame.com/gt_wx/resource/";
        }
    };
    // 获取qq小游戏资源url
    ServerCfg.getQQGameResourceUrl = function () {
        if (PlatMgr.checkIsQQGameSp()) {
            return "https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/";
        }
    };
    // 获取qq小游戏资源url
    ServerCfg.getQQGameResJsonUrl = function () {
        if (PlatMgr.checkIsQQGameSp()) {
            return "https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/default.res.json";
        }
    };
    // 获取玩一玩资源url
    ServerCfg.getWywResourceUrl = function () {
        return Http.getProtocol() + "//" + ServerCfg.getHost() + "/wywclient/resource/";
    };
    /**
     * 根据url目录名命名规则获取到的字符串来查找连接哪个服
     */
    ServerCfg.getHostIdByPath = function (pathKey) {
        if (!ServerCfg.allHost[pathKey]) {
            for (var key in ServerCfg.allHost) {
                var tmpKey = pathKey;
                if (tmpKey.indexOf("_") > -1) {
                    tmpKey = tmpKey.split("_")[0];
                }
                if (tmpKey == key) {
                    pathKey = tmpKey;
                    break;
                }
            }
        }
        return pathKey;
    };
    /**
     * 根据前端目录key名获取当前地址使用的语言资源key
     * @param pathKey 目录key
     */
    ServerCfg.getClientResKeyByPath = function (pathKey) {
        var tmpKey = pathKey;
        if (tmpKey.indexOf("_") > -1) {
            tmpKey = tmpKey.split("_")[1];
        }
        if (tmpKey) {
            pathKey = tmpKey;
        }
        return pathKey;
    };
    ServerCfg.getTstPidUrl = function () {
        // if(PlatformManager.checkIsLocal())
        // {
        //     return "//gt-local-web01.raygame3.com/pidcode.php"
        // }
        return "//" + ServerCfg.getHost() + "/clientscript/pidcode.php";
    };
    /**
     * 退出sdk账号时候清理服务器列表数据
     */
    ServerCfg.clear = function () {
        ServerCfg.selectServer = {};
        ServerCfg.myserver = null;
        ServerCfg.serverlist = null;
    };
    ServerCfg.allHost = {
        "local": "192.168.8.95",
        "test": "dice-test.leishengame.com",
        "wx": "lz-wx-web01.leishengame.com",
        "ls": "lz-ls-web01.leishengame.com",
        "iosshenhe": "lz-ios-shenhe.leishengame.com",
    };
    /**
     * 上次登录的服务器，登录成功后就可以取
     */
    ServerCfg.lastServer = {};
    /**
     * 当前选择的服务器，选择后可用
     */
    ServerCfg.selectServer = {};
    ServerCfg.baseUrl = "//192.168.8.95/gucenter/";
    ServerCfg.serverTokenUrl = "getServerInfo.php";
    ServerCfg.svrCfgUrl = "//192.168.8.95/gucenter/";
    return ServerCfg;
}());
__reflect(ServerCfg.prototype, "ServerCfg");
var ServerItemCfg = (function () {
    function ServerItemCfg() {
    }
    ServerItemCfg.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    return ServerItemCfg;
}());
__reflect(ServerItemCfg.prototype, "ServerItemCfg");
//# sourceMappingURL=ServerCfg.js.map