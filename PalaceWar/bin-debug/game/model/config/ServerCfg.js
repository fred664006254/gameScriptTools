/**
 * 服务器列表配置
 */
var ServerCfg = /** @class */ (function () {
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
        var result = false;
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
                    result = true;
                    break;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
            return result;
        }
    };
    ServerCfg.setServerData = function (data) {
        ServerCfg.selectServer = {};
        for (var key in data) {
            ServerCfg.selectServer[key] = data[key];
        }
    };
    //新服预约活动服务器
    ServerCfg.setAcNewServerData = function (data) {
        if (!data) {
            return;
        }
        this.setServerData(data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
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
            var baseUrl = document.baseURI || window.location.pathname;
            if (baseUrl && baseUrl.indexOf("gt_test") > -1) {
                isDebug = true;
            }
            else {
                if (PlatformManager.checkIsFB()) {
                    isDebug = PlatformManager.checkIsTest();
                }
            }
        }
        else if (PlatformManager.checkIsTest() || PlatformManager.checkIsLocal()) {
            isDebug = true;
        }
        if (PlatformManager.checkIsPlatSp()) {
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
    // 获取微信小游戏资源url
    ServerCfg.getWxGameResourceUrl = function () {
        if (PlatformManager.checkIsWxSp()) {
            // return "https://gt-fkwx-cdn.raygame3.com/gt_wx/resource/";
            return "resource/";
        }
    };
    // 获取qq小游戏资源url
    ServerCfg.getQQGameResourceUrl = function () {
        if (PlatformManager.checkIsQQGameSp()) {
            return "https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/";
        }
    };
    // 获取qq小游戏资源url
    ServerCfg.getQQGameResJsonUrl = function () {
        if (PlatformManager.checkIsQQGameSp()) {
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
        "qqgame": "gt-wanba-web01.raygame3.com",
        "wanba": "gt-wanba-web01.raygame3.com",
        "3k": "gt-cn-in.raygame3.com",
        "local": "gt-local-web01.raygame3.com",
        "locals": "local-test-82.raygame3.com",
        "test": "gt-test.raygame3.com",
        "yyb": "gt-yyb-web01.raygame3.com",
        "tw": "gd-game.heyyogame.com",
        "fkylc": "gt-fkylc-web01.raygame3.com",
        "xly": "gt-xly-web01.raygame3.com",
        "xzy": "gt-xzy-web01.raygame3.com",
        "iosshenhe": "gt-shenhe.raygame3.com",
        "zjly": "gt-zjly-web01.raygame3.com",
        "ewan": "gt-ewan-web01.raygame3.com",
        "49y": "gt-49y-web01.raygame3.com",
        "sf": "gt-sf-web01.raygame3.com",
        "kr": "gt-kr-web01.mayngames.co.kr",
        "fkcw": "gt-fkcw-web01.raygame3.com",
        "en": "gt-en-web01.heyyogame.com",
        "9130": "gt-9130-web01.raygame3.com",
        "cps": "gt-cps-web01.raygame3.com",
        "wx": "gt-wanba-web01.raygame3.com",
        "wyw": "gt-wanba-web01.raygame3.com",
        "ty": "gt-ty-web01.raygame3.com",
        "xl": "gt-xl-web01.raygame3.com",
        "jj": "gt-jj-web01.raygame3.com",
        "kr37": "gt-kr37-web01.37games.com",
        "th": "gt-th-web01.heyyogame.com",
        "mm": "gt-mm-web01.raygame3.com",
        "lm": "gt-lm-web01.raygame3.com",
        "idn": "gt-idn-web01.raygame3.com",
        "xy": "gt-xy-web01.raygame3.com",
        "pt": "gt-en-web01.heyyogame.com",
        "ru": "gt-ru-web01.heyyogame.com"
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
    ServerCfg.baseUrl = "//gt-local-web01.raygame3.com/gucenter/";
    ServerCfg.serverTokenUrl = "getaccess_token.php";
    ServerCfg.svrCfgUrl = "//gt-local-web01.raygame3.com/tank-global/index.php/";
    return ServerCfg;
}());
var ServerItemCfg = /** @class */ (function () {
    function ServerItemCfg() {
    }
    ServerItemCfg.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    return ServerItemCfg;
}());
//# sourceMappingURL=ServerCfg.js.map