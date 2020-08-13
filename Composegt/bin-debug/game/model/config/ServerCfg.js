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
    /**
     * 设置登录的服务器数据
     * @param zid
     */
    ServerCfg.setLoginServer = function (zid) {
        if (ServerCfg.lastServer.zid != zid) {
            var l = ServerCfg.serverlist.length;
            for (var i = 0; i < l; i++) {
                var item = ServerCfg.serverlist[i];
                if (item.zid == zid) {
                    for (var key in item) {
                        ServerCfg.lastServer[key] = item[key];
                    }
                    break;
                }
            }
        }
    };
    /**
     * 选择的服务器数据
     * @param zid
     */
    ServerCfg.setSelectServer = function (zid) {
        var zidTemp = ServerCfg.selectServer.zid;
        if (ServerCfg.selectServer.old_zid) {
            zidTemp = ServerCfg.selectServer.old_zid;
        }
        if (zidTemp != zid) {
            var l = ServerCfg.serverlist.length;
            for (var i = 0; i < l; i++) {
                var item = ServerCfg.serverlist[i];
                var itemZid = item.zid;
                if (item.old_zid) {
                    itemZid = item.old_zid;
                }
                if (itemZid == zid) {
                    ServerCfg.setServerData(item);
                    break;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
        }
    };
    ServerCfg.setServerData = function (data) {
        ServerCfg.selectServer = {};
        for (var key in data) {
            if (PlatformManager.getSpid() == "locals" && (key == "ip_server" || key == "ip_chat")) {
                ServerCfg.selectServer[key] = ServerCfg.getHost();
            }
            else {
                ServerCfg.selectServer[key] = data[key];
            }
        }
    };
    ServerCfg.initSvrUrl = function () {
        var hosturl = ServerCfg.getHost();
        this.svrCfgUrl = "//" + hosturl + "/tank-global/index.php/";
        this.baseUrl = "//" + hosturl + "/gucenter/";
    };
    ServerCfg.getHost = function () {
        if (App.DeviceUtil.IsHtml5()) {
            if (PlatformManager.checkIsPlatSp()) {
                return ServerCfg.allHost[App.TestUtil.getTestPlat()];
            }
        }
        var localMultiLanguage = PlatformManager.getLocalMultiLanguage();
        if (localMultiLanguage && ServerCfg.allHost[localMultiLanguage]) {
            return ServerCfg.allHost[localMultiLanguage];
        }
        return ServerCfg.allHost[PlatformManager.getSpid()];
        //return ServerCfg.allHost["wanba"];
    };
    ServerCfg.checkServerDebug = function () {
        var isDebug = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var baseUrl = document.baseURI;
            if (baseUrl && baseUrl.indexOf("gt_test") > -1) {
                isDebug = true;
            }
            else if (!baseUrl && window.location.pathname.indexOf("gt_test") > -1) {
                isDebug = true;
            }
        }
        else if (PlatformManager.checkIsTest() || PlatformManager.checkIsLocal()) {
            isDebug = true;
        }
        if (App.CommonUtil.getOption("testplat") && ServerCfg.allHost[App.CommonUtil.getOption("testplat")]) {
            isDebug = false;
        }
        return isDebug;
    };
    ServerCfg.checkTestByBaseDiv = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var baseUrl = document.baseURI;
            if (baseUrl.indexOf("gt_test") > -1) {
                return true;
            }
            else if (!baseUrl && window.location.pathname.indexOf("gt_test") > -1) {
                return true;
            }
        }
        return false;
    };
    // 获取微信小游戏资源url
    ServerCfg.getWxGameResourceUrl = function () {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gdhc-wxmg-cdn.leishenhuyu.com/gt_wxmg/resourceallin/";
    };
    // 获取微信wxapp小游戏资源url
    ServerCfg.getWxappGameResourceUrl = function () {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gd-wxapp-cdn.qitiangame.com/gt_wxapp/gt_wxapp/resourceallin/";
    };
    // 获取百度小游戏资源url
    ServerCfg.getBaiduGameResourceUrl = function () {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gd-h5ly-cdn.leishenhuyu.com/gt_h5ly/gt_h5ly/resourceallin/";
    };
    // 获取qq小游戏资源url
    ServerCfg.getQQGameResourceUrl = function () {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gd-wanba-cdn-1252343260.file.myqcloud.com/gt_wanba/resourceallin/";
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
                if (pathKey.indexOf(key) > -1) {
                    pathKey = key;
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
    ServerCfg.allHost = {
        "local": "192.168.8.95",
        "locals": "local-test-83.raygame3.com",
        "test": "compose-test.leishenhuyu.com",
        "wx": "gdhc-wx-web001.leishenhuyu.com",
        "wd": "gdhc-wd-web01.leishenhuyu.com",
        "wxmg": "gdhc-wxmg-web01.leishenhuyu.com",
        "newhope": "gdhc-newhope-web01.leishenhuyu.com",
    };
    // {sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}
    /**
     * 上次登录的服务器，登录成功后就可以取
     */
    ServerCfg.lastServer = {};
    /**
     * 当前选择的服务器，选择后可用
     */
    ServerCfg.selectServer = {};
    ServerCfg.baseUrl = "//192.168.8.83/gucenter/";
    ServerCfg.serverTokenUrl = "getaccess_token.php";
    ServerCfg.svrCfgUrl = "//192.168.8.83/tank-global/index.php/";
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
