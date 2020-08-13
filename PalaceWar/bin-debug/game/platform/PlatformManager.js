var PlatformManager;
(function (PlatformManager) {
    PlatformManager.isLogin = false;
    PlatformManager.kkk_age = 0;
    function getAppVersion() {
        try {
            if (App.DeviceUtil.isWyw()) {
                return "modifybywywscript_appversion";
            }
            else if (App.DeviceUtil.isQQGame()) {
                return "modifybyqqscript_appversion";
            }
            else if (App.DeviceUtil.isWXgame()) {
                return "3";
            }
            else if (rsdkclientplugin) {
                return rsdkclientplugin.getVersion();
            }
        }
        catch (e) {
            return "0";
        }
        return "0";
    }
    PlatformManager.getAppVersion = getAppVersion;
    var _appid = "";
    function getAppid() {
        if (!LoginManager.isCreateScene) {
            try {
                if (RSDK && RSDK.getAppid && RSDKHelper.isInit) {
                    var appId = RSDK.getAppid();
                    if (appId == "17026001" && App.DeviceUtil.isIOS()) {
                        appId = "17026002";
                    }
                    _appid = appId;
                }
            }
            catch (e) {
                try {
                    if (SDK && SDK.CommonUtil && SDK.CommonUtil.appId) {
                        _appid = SDK.CommonUtil.appId;
                    }
                }
                catch (e) {
                    _appid = "";
                }
            }
        }
        return _appid;
    }
    PlatformManager.getAppid = getAppid;
    function getTestAppid() {
        if (PlatformManager.checkIsLocal() && PlatformManager.checkIsPlatSp() == false) {
            return "1001";
        }
        else {
            return "";
        }
    }
    PlatformManager.getTestAppid = getTestAppid;
    function getBigAppid() {
        var bigAppid = '';
        if (checkIsAreaPkg()) {
            var appid = Number(getAppid());
            if (!appid) {
                bigAppid = App.CommonUtil.getOption("r_bid");
            }
            else {
                bigAppid = String(Math.floor(appid / 1000) * 1000);
            }
        }
        else {
            bigAppid = App.CommonUtil.getOption("r_bid");
            if (!bigAppid) {
                var appid = Number(getAppid());
                bigAppid = String(Math.floor(appid / 1000) * 1000);
            }
        }
        return String(bigAppid);
    }
    PlatformManager.getBigAppid = getBigAppid;
    function getContact() {
        if (PlatformCfg.contactCfg[PlatformManager.getAppid()]) {
            return PlatformCfg.contactCfg[PlatformManager.getAppid()];
        }
        else if (PlatformCfg.contactCfg[PlatformManager.getBigAppid()]) {
            return PlatformCfg.contactCfg[PlatformManager.getBigAppid()];
        }
        else {
            for (var key in PlatformCfg.contactCfg) {
                if (key.indexOf("-") > -1) {
                    var keys = key.split("-");
                    var appid = Number(PlatformManager.getAppid());
                    var bigAppid = Number(PlatformManager.getBigAppid());
                    if (appid >= Number(keys[0]) && appid <= Number(keys[1])) {
                        return PlatformCfg.contactCfg[key];
                    }
                }
            }
        }
        return [];
    }
    PlatformManager.getContact = getContact;
    /**
     * 获取渠道spid，和游戏功能和游戏配置相关，和纯前端资源和多语言cn无关
     */
    function getSpid() {
        var spid = getSpidKey(false);
        var area = GameConfig.getAreaBysubId();
        if (getGameArea() && GameConfig.areaSvrCfg[area]) {
            spid = GameConfig.areaSvrCfg[area];
        }
        return spid;
    }
    PlatformManager.getSpid = getSpid;
    /**
     * 获取前端使用的Spid，可以理解为纯前端资源和多语言cn相关处理时候使用
     */
    var _spid = [null, null];
    function getSpidKey(isClientRes) {
        if (isClientRes === void 0) { isClientRes = true; }
        var pos = isClientRes ? 0 : 1;
        if (isClientRes == true && _spid[pos]) {
            return _spid[pos];
        }
        var spid = null;
        if (App.DeviceUtil.isWyw()) {
            spid = "lm";
        }
        else if (App.DeviceUtil.isQQGame()) {
            spid = "qqgame";
        }
        else if (checkIsLocal() && isClientRes == false) {
            spid = "local";
        }
        else if (checkIsIOSShenheSp()) {
            spid = "iosshenhe";
        }
        else if (checkIsWanbaSp()) {
            spid = "wanba";
        }
        else if (checkIs3KSp()) {
            spid = "3k";
        }
        else if (checkIsLmSp()) {
            spid = "lm";
        }
        else if (checkIsWxSp()) {
            spid = "wx";
        }
        else if (checkIsTestSp()) {
            spid = "test";
        }
        else if (checkIsFBEnSp()) {
            spid = "en";
            return spid;
        }
        else if (checkIsFBTwSp()) {
            spid = "tw";
            return spid;
        }
        else {
            if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
                var pathname = window.location.pathname;
                if (pathname.indexOf("gt_") && pathname.indexOf("/") > -1) {
                    var str = getPathRuleName();
                    if (isClientRes) {
                        spid = ServerCfg.getClientResKeyByPath(str);
                    }
                    else {
                        spid = ServerCfg.getHostIdByPath(str);
                    }
                }
                else {
                    spid = "3k";
                }
            }
            else {
                spid = "3k";
            }
        }
        var tmpName = getPlatName();
        if (tmpName && !checkIsIOSShenheSp()) {
            spid = tmpName;
        }
        _spid[pos] = spid;
        return spid;
    }
    PlatformManager.getSpidKey = getSpidKey;
    /**
     * 根据渠道目录命名规范取后缀
     */
    function getPathRuleName() {
        var key = "";
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            if (pathname.indexOf("gt_") && pathname.indexOf("/") > -1) {
                var pathArr = pathname.split("/");
                var l = pathArr.length;
                for (var i = l - 1; i >= 0; i--) {
                    key = pathArr[i];
                    key = key.replace("gt_", "");
                    if (key != pathArr[i] && pathArr[i].indexOf(".") < 0) {
                        if (key != "test") {
                            key = key.replace("test", "");
                            break;
                        }
                    }
                }
            }
        }
        return key;
    }
    PlatformManager.getPathRuleName = getPathRuleName;
    function checkIsUseSDK() {
        try {
            App.LogUtil.log("getSpid" + getSpid());
            App.LogUtil.log("checkIsWeiduan" + checkIsWeiduan());
            console.log("getAppid" + getAppid());
            console.log("getBigAppid" + getBigAppid());
            console.log("runtimeType:" + egret.Capabilities.runtimeType);
        }
        catch (e) {
            console.log("checkIsUseSDK log error");
        }
        if (checkIsFB()) {
            return true;
        }
        if (App.DeviceUtil.isWXgame()) {
            return true;
        }
        if (App.DeviceUtil.isWyw()) {
            return true;
        }
        if (App.CommonUtil.getOption("r_plat")) {
            return true;
        }
        if (PlatformCfg.useSDK[getBigAppid()] || PlatformCfg.useSDK[getAppid()]) {
            return true;
        }
        if (checkIsPlatSp()) {
            return false;
        }
        if (getSpid().indexOf("local") > -1) {
            if (checkIsWeiduan()) {
                return true;
            }
            return false;
        }
        else if (getSpid() == "3k") {
            if (checkIsTest() == true) {
                if (checkIsWeiduan()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else if (getSpid() == "wanba") {
            if (checkIsTest() == true) {
                if (ServerCfg.checkTestByBaseDiv()) {
                    if (document.location.search) {
                        return true;
                    }
                }
                return false;
                //test code
                // return true;
            }
        }
        else if (getSpid() == "test") {
            // if(checkIsWeiduan())
            // {
            // 	return true;
            // }
            return false;
        }
        else if (getSpid() == "iosshenhe") {
            return false;
        }
        else {
            if (checkIsTest() == true) {
                return false;
            }
        }
        return true;
    }
    PlatformManager.checkIsUseSDK = checkIsUseSDK;
    function getPlatName() {
        var platName = PlatformCfg.platNameCfg[getBigAppid()];
        if (!platName) {
            platName = PlatformCfg.platNameCfg[getAppid()];
        }
        if (PlatformManager.checkIsLocal() && PlatformManager.checkIsPlatSp() == false) {
            platName = "";
        }
        return platName;
    }
    PlatformManager.getPlatName = getPlatName;
    function checkIsPlatSp() {
        if (App.DeviceUtil.IsHtml5() && App.TestUtil.getTestPlat() && (window.location.hostname.indexOf("gt-test") > -1 || PlatformManager.checkIsLocal())) {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsPlatSp = checkIsPlatSp;
    /**
     * 是gt_local 渠道
     */
    function checkIsLocalSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            var localStr = "/gt_local/";
            return pathname.substr(pathname.length - localStr.length) == localStr;
        }
        return false;
    }
    PlatformManager.checkIsLocalSp = checkIsLocalSp;
    function checkIsIOSShenheSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("iosshenhe") > -1;
        }
        return false;
    }
    PlatformManager.checkIsIOSShenheSp = checkIsIOSShenheSp;
    /** 是否审核其他语言版语版 */
    function checkIOSShenheOtherLanguage() {
        if (PlatformManager.checkIsIOSShenheSp()) {
            var tmpT = App.StringUtil.splitString(window.location.pathname, "_");
            if (tmpT[2]) {
                if (tmpT[2].substr(tmpT[2].length - 1) == "/") {
                    return tmpT[2].substr(0, tmpT[2].length - 1);
                }
                else {
                    return tmpT[2];
                }
            }
        }
    }
    PlatformManager.checkIOSShenheOtherLanguage = checkIOSShenheOtherLanguage;
    function checkIsFkylcSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("fkylc") > -1 || App.TestUtil.getTestPlat() == "fkylc";
        }
        return false;
    }
    PlatformManager.checkIsFkylcSp = checkIsFkylcSp;
    function checkIsAiweiyouSp() {
        if (PlatformManager.getAppid() == "17007002") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsAiweiyouSp = checkIsAiweiyouSp;
    function checkIsTWShenheSp() {
        if (PlatformManager.getAppid() == "17004001") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsTWShenheSp = checkIsTWShenheSp;
    function checkIsKRShenhe() {
        if (PlatformManager.checkIsKRSp() && App.DeviceUtil.isIOS() && Api.switchVoApi.checkOpenShenhe()) {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsKRShenhe = checkIsKRShenhe;
    function checkIsXlySp() {
        return getSpid() == "xly";
    }
    PlatformManager.checkIsXlySp = checkIsXlySp;
    function checkIsXzySp() {
        return getSpid() == "xzy";
    }
    PlatformManager.checkIsXzySp = checkIsXzySp;
    function checkIsZjlySp() {
        return getSpid() == "zjly";
    }
    PlatformManager.checkIsZjlySp = checkIsZjlySp;
    function checkIsEwanSp() {
        return getSpid() == "ewan";
    }
    PlatformManager.checkIsEwanSp = checkIsEwanSp;
    function checkIs49ySp() {
        return getSpid() == "49y";
    }
    PlatformManager.checkIs49ySp = checkIs49ySp;
    function checkIsSfSp() {
        return getSpid() == "sf";
    }
    PlatformManager.checkIsSfSp = checkIsSfSp;
    function checkIsFkcwSp() {
        return getSpid() == "fkcw";
    }
    PlatformManager.checkIsFkcwSp = checkIsFkcwSp;
    /**检测文字显示是水平显示 */
    function checkIsTextHorizontal() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            //检测是否是英文  App.CommonUtil.getOption("language")=="en" url参数有language = en
            return checkIsEnLang() || checkIsThSp() || checkIsPtLang() || checkIsRuLang();
        }
        return false;
    }
    PlatformManager.checkIsTextHorizontal = checkIsTextHorizontal;
    function checkIsEnSp() {
        return getSpid() == "en" || App.CommonUtil.getOption("language") == "en";
    }
    PlatformManager.checkIsEnSp = checkIsEnSp;
    /**
     * 是葡语
     */
    function checkIsPtLang() {
        return getSpidKey(true) == "pt";
    }
    PlatformManager.checkIsPtLang = checkIsPtLang;
    /**
     * 是俄语
     */
    function checkIsRuLang() {
        return getSpidKey(true) == "ru" || checkIsRuSp();
    }
    PlatformManager.checkIsRuLang = checkIsRuLang;
    /**
     * 检查是不是英文语言
     */
    function checkIsEnLang() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            return getSpidKey(true) == "en" || checkIsIdnSp() || checkIsFBEnSp();
        }
        return false;
    }
    PlatformManager.checkIsEnLang = checkIsEnLang;
    function checkIs9130Sp() {
        return getSpid() == "9130";
    }
    PlatformManager.checkIs9130Sp = checkIs9130Sp;
    function checkIsCpsSp() {
        return getSpid() == "cps";
        ;
    }
    PlatformManager.checkIsCpsSp = checkIsCpsSp;
    function checkIsTySp() {
        return getSpid() == "ty";
    }
    PlatformManager.checkIsTySp = checkIsTySp;
    function checkIsXlSp() {
        return getSpid() == "xl";
    }
    PlatformManager.checkIsXlSp = checkIsXlSp;
    function checkIsJjSp() {
        return getSpid() == "jj";
    }
    PlatformManager.checkIsJjSp = checkIsJjSp;
    function checkIsKr37Sp() {
        return getSpid() == "kr37";
    }
    PlatformManager.checkIsKr37Sp = checkIsKr37Sp;
    function checkIsThSp() {
        return getSpid() == "th" || App.CommonUtil.getOption("language") == "th";
    }
    PlatformManager.checkIsThSp = checkIsThSp;
    function checkIsRuSp() {
        return getSpid() == "ru" || App.CommonUtil.getOption("language") == "ru";
    }
    PlatformManager.checkIsRuSp = checkIsRuSp;
    function checkIsMmSp() {
        return getSpid() == "mm";
    }
    PlatformManager.checkIsMmSp = checkIsMmSp;
    function checkIsLmSp() {
        if (App.DeviceUtil.isWyw()) {
            return true;
        }
        else if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_lm") > -1 || pathname.indexOf("_testlm") > -1;
        }
        return false;
    }
    PlatformManager.checkIsLmSp = checkIsLmSp;
    /** 是否是微信小游戏平台 */
    function checkIsWxSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_wx") > -1 || pathname.indexOf("_testwx") > -1;
        }
        else if (App.DeviceUtil.isWXgame()) {
            // return window["WX_ISWX"] === true;
            return true;
        }
        return false;
    }
    PlatformManager.checkIsWxSp = checkIsWxSp;
    /** 是否是qq小游戏平台 */
    function checkIsQQGameSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_qq") > -1 || pathname.indexOf("_testqq") > -1;
        }
        else if (App.DeviceUtil.isQQGame()) {
            // return window["WX_ISWX"] === true;
            return true;
        }
        return false;
    }
    PlatformManager.checkIsQQGameSp = checkIsQQGameSp;
    function checkIsIdnSp() {
        return getSpid() == "idn";
    }
    PlatformManager.checkIsIdnSp = checkIsIdnSp;
    function checkIsXySp() {
        return getSpid() == "xy";
    }
    PlatformManager.checkIsXySp = checkIsXySp;
    function getSpFile() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var fileName = void 0;
            var pathname = window.location.pathname;
            if (pathname.substr(pathname.length) != "/") {
                fileName = pathname.substr(pathname.lastIndexOf("/") + 1);
                if (fileName && fileName.indexOf(".") > -1) {
                    fileName = pathname.substring(0, pathname.lastIndexOf("/"));
                    fileName = fileName.substr(pathname.lastIndexOf("/") + 1);
                }
            }
            else {
                fileName = pathname.substring(0, pathname.length);
                fileName = fileName.substr(pathname.lastIndexOf("/") + 1);
            }
            return fileName.replace("gt_test", "").replace("gt_", "");
        }
        return "local";
    }
    PlatformManager.getSpFile = getSpFile;
    function checkIsTest() {
        var result = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            result = pathname.indexOf("_test") > -1;
            if (PlatformManager.checkIsFB()) {
                if (App.CommonUtil.getOption("source") == "fbinstant-328119171335665" || App.CommonUtil.getOption("source") == "fbinstant-652787608466112") {
                    result = true;
                }
            }
        }
        return result;
    }
    PlatformManager.checkIsTest = checkIsTest;
    function checkUseRSDKSocket() {
        var useRSDKSocket = false;
        if (App.DeviceUtil.IsHtml5()) {
            // if(window["RSDKPlatform"])
            // {
            // 	useRSDKSocket=true;
            // }
            if (window["RSDKWebSocket"]) {
                useRSDKSocket = true;
            }
            else {
                useRSDKSocket = false;
            }
            if (!!window["WebSocket"] && window["WebSocket"].prototype.send) {
                useRSDKSocket = false;
            }
            if (window["RSDKWebSocket"] && GameData.testUseClientSocket) {
                useRSDKSocket = true;
            }
        }
        // if(useRSDKSocket&&PlatformManager.client.getAndroidAPILevel()>0&&PlatformManager.client.getAndroidAPILevel()<21)
        // {
        // 	useRSDKSocket=true;
        // }
        // else
        // {
        // 	useRSDKSocket=false;
        // }
        return useRSDKSocket;
    }
    PlatformManager.checkUseRSDKSocket = checkUseRSDKSocket;
    function checkIsWeiduan() {
        var weiduan = false;
        if (App.DeviceUtil.IsHtml5()) {
            if (window) {
                if (window["RSDKPlatform"]) {
                    weiduan = true;
                }
                else if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.RSDKLogin) {
                    weiduan = true;
                }
            }
        }
        return weiduan;
    }
    PlatformManager.checkIsWeiduan = checkIsWeiduan;
    function checkIsTWBSp() {
        return getSpid() == "tw" || App.CommonUtil.getOption("language") == "tw";
    }
    PlatformManager.checkIsTWBSp = checkIsTWBSp;
    function checkIsTWCNSp() {
        return getSpid() == "twcn";
    }
    PlatformManager.checkIsTWCNSp = checkIsTWCNSp;
    function checkIsKRSp() {
        return getSpid() == "kr" || App.CommonUtil.getOption("language") == "kr";
    }
    PlatformManager.checkIsKRSp = checkIsKRSp;
    // export function checkIsKrSp():boolean
    // {
    // 	if(App.DeviceUtil.IsHtml5())
    // 	{
    // 		let pathname:string=window.location.pathname;
    // 		return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
    // 	}
    // 	return false;
    // }
    //港台官网包
    function checkIsTWMCSp() {
        if (PlatformManager.getAppid() == "17004004" || PlatformManager.getAppid() == "17004007") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsTWMCSp = checkIsTWMCSp;
    //4399
    function checkIs4399Sp() {
        if (PlatformManager.getAppid() == "17007003") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs4399Sp = checkIs4399Sp;
    function checkIsYYBSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var host = window.location.host;
            return host.indexOf("yyb") > -1;
        }
        return false;
    }
    PlatformManager.checkIsYYBSp = checkIsYYBSp;
    function checkIsTestSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.lastIndexOf("/gt_test/") == 0;
        }
        return false;
    }
    PlatformManager.checkIsTestSp = checkIsTestSp;
    function checkIsWanbaSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            var host = window.location.host;
            return pathname.indexOf("wanba") > -1 || host.indexOf("urlshare") > -1 || host.indexOf("qzone") > -1;
        }
        return false;
    }
    PlatformManager.checkIsWanbaSp = checkIsWanbaSp;
    function checkIs11WanSp() {
        if (PlatformManager.getAppid() == "17001002") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs11WanSp = checkIs11WanSp;
    function checkIs3kShenHaiSp() {
        if (PlatformManager.getAppid() == "17001195" || PlatformManager.getAppid() == "17001196" || PlatformManager.getAppid() == "17001197" || PlatformManager.getAppid() == "17001198") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs3kShenHaiSp = checkIs3kShenHaiSp;
    function checkIs3KSp() {
        if (checkIsLocal() && checkIsWeiduan()) {
            return true;
        }
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            return window.location.pathname.indexOf("3k") > -1 || App.TestUtil.getTestPlat() == "3k";
        }
        return false;
    }
    PlatformManager.checkIs3KSp = checkIs3KSp;
    function checkIs3KSubSp() {
        return getAppid() == "17001001" || getAppid() == "17001186" || getAppid() == "17001187" || getAppid() == "17001185" || getSpName() == "h5ios3kwan" || getSpName() == "h5iosshiyiwan" || getSpName() == "h5iosyinhu";
    }
    PlatformManager.checkIs3KSubSp = checkIs3KSubSp;
    /**
     *
     * 判断是否为本地地址
     * */
    function checkIsLocal() {
        var result = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var url = window.location.href;
            for (var i = 0; i < GameData.localCfg.length; i++) {
                var str = GameData.localCfg[i];
                if (url.indexOf(str) > -1) {
                    result = true;
                    break;
                }
            }
        }
        else if (App.DeviceUtil.isWXgame()) {
            result = false;
        }
        return result;
    }
    PlatformManager.checkIsLocal = checkIsLocal;
    function isSupportDesktopIcon() {
        // if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
        // 	return true;
        // }
        // else {
        // 	return false;
        // }
        console.log("QAZ fkcw checkDesktop" + PlatformManager.checkDesktop());
        return PlatformManager.checkDesktop();
    }
    PlatformManager.isSupportDesktopIcon = isSupportDesktopIcon;
    /**
     * 获取玩吧渠道环境，QZ是QQ空间，SQ是结合版，QQLive是腾讯视频
     */
    function getWanbaQua() {
        if (App.DeviceUtil.IsHtml5()) {
            if (checkIsWanbaSp() && checkIsUseSDK()) {
                var data = window["OPEN_DATA"];
                var platform = data.platform;
                var app = data.qua.app;
                return app;
            }
        }
        return "";
    }
    /**
     * 获取玩吧渠道环境 用以 企鹅电竞礼包
     */
    function getWanbaPf() {
        if (App.DeviceUtil.IsHtml5()) {
            if (checkIsWanbaSp() && checkIsUseSDK()) {
                var data = window["OPEN_DATA"];
                var app = data.pf;
                return app;
            }
        }
        return "";
    }
    function getWywSrc() {
        if (App.DeviceUtil.IsHtml5()) {
            if (checkIsLmSp() && checkIsUseSDK()) {
                var data = window["GameStatusInfo"];
                var app = data.src;
                return app;
            }
        }
        return 0;
    }
    function getIsWanbaSQ() {
        return getWanbaQua() == "SQ";
        // return checkIsUseSDK();
    }
    PlatformManager.getIsWanbaSQ = getIsWanbaSQ;
    function getIsWanbaQQLive() {
        return getWanbaQua() == "QQLive";
    }
    PlatformManager.getIsWanbaQQLive = getIsWanbaQQLive;
    /**
     * 是不是来自 企鹅电竞
     */
    function getIsWanbaQQEGame() {
        return getWanbaPf() == "wanba_ts.111" || getWanbaPf() == "weixin.112";
    }
    PlatformManager.getIsWanbaQQEGame = getIsWanbaQQEGame;
    /**
     * 是不是来自 【玩一玩】电竞活动二期
     */
    function getIsWywEgame2() {
        return getWywSrc() == 314 || getWywSrc() == 314;
    }
    PlatformManager.getIsWywEgame2 = getIsWywEgame2;
    /**
     * 是不是来自 h5qzonepet
     */
    function getFromQZonePet() {
        if (App.DeviceUtil.IsHtml5()) {
            if (checkIsWanbaSp() && checkIsUseSDK()) {
                var data = window["OPEN_DATA"];
                var via = data.via;
                egret.log("ssSource" + data.via);
                // alert(data.via)
                return via;
            }
        }
        return "";
    }
    PlatformManager.getFromQZonePet = getFromQZonePet;
    function isSupportShare() {
        console.log("QAZ fkcw checkShare" + PlatformManager.checkShare());
        return PlatformManager.checkShare() == 1 || PlatformManager.checkShare() == 2 || PlatformManager.checkShare() == 3 || PlatformManager.checkIsLocal();
        // return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
    }
    PlatformManager.isSupportShare = isSupportShare;
    function isSupportAttention() {
        return (checkIsFkylcSp() && !checkIs4399Sp()) || PlatformManager.hasFollow();
    }
    PlatformManager.isSupportAttention = isSupportAttention;
    function isSupportBindPhone() {
        return PlatformCfg.bindPhone[getAppid()];
    }
    PlatformManager.isSupportBindPhone = isSupportBindPhone;
    function sendToDesktop(callback, callbackThisObj) {
        if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
            window.open("resource/other/一個官人七個妻.url");
        }
        else {
            // qqwanbaplugin.shortcut({title:"极品大官人"},callback.bind(callbackThisObj));
            PlatformManager.requestDesktop({ title: "江山美人", desc: "" }, callback, callbackThisObj);
        }
        // callback.apply(callbackThisObj);
    }
    PlatformManager.sendToDesktop = sendToDesktop;
    function sendCandy(num, callback, callbackThisObj) {
        //signin
        if (RSDKHelper.isInit) {
            qqwanbaplugin.sendCandy("signin", num, callback.bind(callbackThisObj));
        }
    }
    PlatformManager.sendCandy = sendCandy;
    function share(callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            if (checkIsTWBSp() == true) {
                RSDKHelper.fbShare(function (code, data) {
                    if (Number(code) == 16) {
                        if (callback) {
                            callback.apply(callbackThisObj);
                        }
                    }
                    else {
                        console.log("分享失败 " + code);
                    }
                });
            }
            else if (checkIsKRSp() == true) {
                RSDKHelper.krShare(function (code, data) {
                    if (Number(code) == 16) {
                        if (callback) {
                            callback.apply(callbackThisObj);
                        }
                    }
                    else {
                        console.log("分享失败 " + code);
                    }
                });
            }
            else {
                RSDKHelper.share(function (code, data) {
                    if (Number(code) == 0) {
                        if (callback) {
                            callback.apply(callbackThisObj);
                        }
                    }
                });
            }
        }
        // else
        // {
        // 	if(callback)
        // 	{
        // 		callback.apply(callbackThisObj);
        // 	}
        // }
    }
    PlatformManager.share = share;
    function checkIsLoginPlat() {
        var loginResult = false;
        if (checkIsUseSDK()) {
            loginResult = PlatformManager.isLogin;
        }
        else {
            loginResult = true;
        }
        return loginResult;
    }
    PlatformManager.checkIsLoginPlat = checkIsLoginPlat;
    function init() {
        if (checkIsUseSDK()) {
            RSDKHelper.init();
        }
        initUseObjectPool();
        if (App.DeviceUtil.isRuntime2()) {
            window.open = function (url) {
                egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "openUrl", data: { "url": url } }));
            };
        }
    }
    PlatformManager.init = init;
    function login() {
        if (RSDKHelper.isInit) {
            RSDKHelper.login();
        }
    }
    PlatformManager.login = login;
    function logout() {
        PlatformManager.isLogin = false;
        LoginManager.inSDKAccountSwitching = true;
        if (RSDKHelper.isInit) {
            RSDKHelper.logout();
            if (PlatformManager.checkIsKRSp() && !PlatformManager.checkIsWanbaSp()) {
                return true;
            }
            return false;
        }
        else {
            LoginManager.changeAccount();
            return true;
        }
    }
    PlatformManager.logout = logout;
    function showClosePayTip() {
        if (GameData.closePay) {
            App.CommonUtil.showTip(LanguageManager.getlocal("closePaySysTip"));
        }
        return GameData.closePay;
    }
    var payType;
    var payCallback = null;
    var payCallbackThisObj = null;
    /**
     * 调用支付，有限购次数的档位需要调用次方法
     * @param productId 充值档id
     * @param callback
     * @param callbackThisObj
     */
    function checkPay(productId, callback, callbackThisObj) {
        if (showClosePayTip()) {
            return;
        }
        payCallback = callback;
        payCallbackThisObj = callbackThisObj;
        payType = productId;
        NetManager.request(NetRequestConst.REQUEST_PAY_CHECKPAY, { gemType: productId });
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_PAY_CHECKPAY, PlatformManager.checkPayCallback, PlatformManager);
    }
    PlatformManager.checkPay = checkPay;
    function checkPayCallback(event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_PAY_CHECKPAY, PlatformManager.checkPayCallback, PlatformManager);
        if (event.data && event.data.ret == true && event.data.data.data.payflag) {
            pay(payType, payCallback, payCallbackThisObj);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("checkPayTip"));
            App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT);
        }
        payCallback = payCallbackThisObj = null;
    }
    PlatformManager.checkPayCallback = checkPayCallback;
    function pay(productId, callback, callbackThisObj) {
        if (showClosePayTip()) {
            return;
        }
        if (Api.switchVoApi.checkClosePaySys()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("closePaySysTip"));
        }
        if (App.DeviceUtil.isWXgame() && window["__WXGAME_OS__"] === "ios") {
            // 微信小游戏ios暂不开支付
            App.CommonUtil.showTip(LanguageManager.getlocal("wxgameIOSNotPayTip"));
        }
        else if (PlatformManager.checkIsUseSDK()) {
            if (checkIsFB()) {
                var FBInstant = window['FBInstant'];
                var op = FBInstant.getLocale();
                if (op == 'IOS') {
                    App.CommonUtil.showTip(LanguageManager.getlocal("fbIOSNotPayTip"));
                    return;
                }
            }
            if (RSDKHelper.isInit) {
                RSDKHelper.pay(productId, callback, callbackThisObj);
            }
        }
        else {
            if (PlatformManager.checkIsLocal()) {
                // if (GameData.payWaitSendDic[productId] && Number(GameData.payWaitSendDic[productId]) - egret.getTimer() < GameData.payWaitSendCD) 
                // {
                // 	StatisticsHelper.reportGameLog("payWaitSend:" + productId);
                // 	return;
                // }
                // if (!GameData.payWaitSendDic[productId]) {
                // 	GameData.payWaitSendDic[productId] = egret.getTimer();
                // }
                testPay(productId);
            }
        }
    }
    PlatformManager.pay = pay;
    function testPay(productId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (PlatformManager.checkIsLocal() || GameData.isTest()) {
            var order_id = String(new Date().getTime() + Math.random() * 99999999);
            NetManager.request(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT, { order_id: order_id, gold_num: itemCfg.gemCost, platform: "h5", name: itemCfg.id });
        }
        else {
            App.CommonUtil.showTip("购买元宝:" + itemCfg.gemCost);
        }
    }
    function analyticsLogin() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLogin();
        }
    }
    PlatformManager.analyticsLogin = analyticsLogin;
    function analyticsNewGuide(step) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsNewGuide(step);
        }
        App.LogUtil.log("newguide:" + step);
    }
    PlatformManager.analyticsNewGuide = analyticsNewGuide;
    function analyticsPay(id, orderId) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsPay(id, orderId);
        }
    }
    PlatformManager.analyticsPay = analyticsPay;
    function analyticsLevelup() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLevelup();
        }
    }
    PlatformManager.analyticsLevelup = analyticsLevelup;
    function analyticsVipup() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsVipup();
        }
    }
    PlatformManager.analyticsVipup = analyticsVipup;
    function analyticsRegister() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsRegister();
        }
    }
    PlatformManager.analyticsRegister = analyticsRegister;
    function analyticsLoadEnd() {
        console.log("QAZ analyticsLoadEnd " + RSDKHelper.isInit);
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLoadEnd();
        }
    }
    PlatformManager.analyticsLoadEnd = analyticsLoadEnd;
    function analyticsCompleteNewGuide() {
        console.log("analyticsCompleteNewGuide");
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsCompleteNewGuide();
        }
    }
    PlatformManager.analyticsCompleteNewGuide = analyticsCompleteNewGuide;
    /**
     * 港台cost2000统计
     */
    function analyticsCost2000() {
        console.log("analyticsCost2000");
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsCost2000();
        }
    }
    PlatformManager.analyticsCost2000 = analyticsCost2000;
    function pushMsg(data) {
        if (RSDKHelper.isInit && getIsWanbaSQ() == true) {
            var msg = LanguageManager.getlocal("wanbaPushMsg" + data.type);
            qqwanbaplugin.sendMessage(data.frd, "1", msg, null);
        }
    }
    PlatformManager.pushMsg = pushMsg;
    function getGiftId() {
        var gid = null;
        if (RSDKHelper.isInit && checkIsWanbaSp() == true && checkIsUseSDK()) {
            gid = qqwanbaplugin.getGiftId();
        }
        // return "502";
        return gid;
    }
    PlatformManager.getGiftId = getGiftId;
    function giftExchange(callback, callbackThisObj) {
        var gid = null;
        if (RSDKHelper.isInit && checkIsWanbaSp() == true && checkIsUseSDK()) {
            qqwanbaplugin.giftExchange(callback.bind(callbackThisObj));
        }
        // return gid;
    }
    PlatformManager.giftExchange = giftExchange;
    /**
     * 获取是不是从糖果屋登录
     */
    function getCandyFlag() {
        // if (PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
        // {
        // 	return qqwanbaplugin.sendCandyStatus();
        // }
        return false;
    }
    PlatformManager.getCandyFlag = getCandyFlag;
    function checkCrossDomon() {
        if (App.DeviceUtil.IsHtml5()) {
            try {
                var host = window.location.host;
                var baseURI = document.baseURI;
                if (baseURI && baseURI.indexOf(host) < 0) {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }
    PlatformManager.checkCrossDomon = checkCrossDomon;
    function getSpName() {
        var spName = "";
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            spName = App.CommonUtil.getOption("r_plat");
            if (checkIsFBEnSp()) {
                spName = GameData.fbTradeType;
            }
            else if (checkIsFBTwSp()) {
                spName = GameData.fbTwTradeType;
            }
        }
        return spName;
    }
    PlatformManager.getSpName = getSpName;
    function attention(callback, callbackThisObj) {
        console.log("attention:" + RSDKHelper.isInit);
        if (RSDKHelper.isInit) {
            // RSDKHelper.attention();
            RSDKHelper.attention(function (data) {
                if (Number(data) == 1) {
                    if (callback) {
                        callback.apply(callbackThisObj);
                    }
                }
            });
        }
    }
    PlatformManager.attention = attention;
    function checkAttention() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkAttention();
        }
        else {
            return false;
        }
    }
    PlatformManager.checkAttention = checkAttention;
    function getChannelId() {
        try {
            return RSDK.getChannelId();
        }
        catch (e) {
            return "";
        }
    }
    PlatformManager.getChannelId = getChannelId;
    function openUserCenter() {
        if (RSDKHelper.isInit && rsdkclientplugin) {
            rsdkclientplugin.openUserCenter();
        }
    }
    PlatformManager.openUserCenter = openUserCenter;
    function getMoneySign() {
        if (checkIsTWBSp() || checkIsEnLang() || checkIsThSp() || checkIsRuSp() || checkIsEnSp()) {
            return "$";
        }
        else if (checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                return "원";
            }
            else {
                return "$";
            }
        }
        else {
            return "￥";
        }
    }
    PlatformManager.getMoneySign = getMoneySign;
    function checkIsUseBigCfg() {
        // return getBigAppid()=="17001000";
        return checkIsTWBSp();
    }
    PlatformManager.checkIsUseBigCfg = checkIsUseBigCfg;
    function checkIs3kQianYiSp() {
        if (PlatformManager.getAppid() == "17001001" || PlatformManager.getAppid() == "17001051" || PlatformManager.getAppid() == "17001188") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs3kQianYiSp = checkIs3kQianYiSp;
    function checkIsShowWarning() {
        if (checkIsTWBSp() || checkIsKRSp() || checkIsThSp() || checkIsRuSp() || checkIsEnLang() || checkIsFB() || checkIsEnSp()) {
            return false;
        }
        else {
            return true;
        }
    }
    PlatformManager.checkIsShowWarning = checkIsShowWarning;
    function getStatement() {
        var appid = PlatformManager.getAppid();
        var bigAppid = PlatformManager.getBigAppid();
        var spName = PlatformManager.getSpName();
        if (PlatformCfg.statementCfg[appid]) {
            return PlatformCfg.statementCfg[appid];
        }
        else if (PlatformCfg.statementCfg[bigAppid]) {
            return PlatformCfg.statementCfg[bigAppid];
        }
        else if (PlatformCfg.statementCfg[spName]) {
            return PlatformCfg.statementCfg[spName];
        }
        return "";
    }
    PlatformManager.getStatement = getStatement;
    function checkShare() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkShare();
        }
        else {
            return 0;
        }
    }
    PlatformManager.checkShare = checkShare;
    //检查通用分享  只有微信需要
    function checkCommonShare() {
        return App.DeviceUtil.isWXgame();
    }
    PlatformManager.checkCommonShare = checkCommonShare;
    function checkDesktop() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkDesktop();
        }
        else {
            return false;
        }
    }
    PlatformManager.checkDesktop = checkDesktop;
    function hasFollow() {
        if (RSDKHelper.isInit) {
            console.log("QAZ hasFollow " + RSDKHelper.hasFollow());
            return RSDKHelper.hasFollow();
        }
        else {
            return false;
        }
    }
    PlatformManager.hasFollow = hasFollow;
    function getCustomerServiceType() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.getCustomerServiceType();
        }
        else {
            return 0;
        }
    }
    PlatformManager.getCustomerServiceType = getCustomerServiceType;
    function getCustomerServiceData(callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            RSDKHelper.getCustomerService(function (data) {
                if (callback) {
                    GameData.customerServiceData = data;
                    callback.apply(callbackThisObj);
                }
            });
        }
    }
    PlatformManager.getCustomerServiceData = getCustomerServiceData;
    function requestDesktop(data, callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            return RSDKHelper.requestDesktop(data, callback, callbackThisObj);
        }
        else {
            return false;
        }
    }
    PlatformManager.requestDesktop = requestDesktop;
    /**
     * 统计权势，目前玩一玩有用到
     */
    function reportGameResult() {
        if (RSDKHelper.isInit) {
            RSDKHelper.reportGameResult();
        }
        else {
            console.log("no sdk not reportGameResult");
        }
    }
    PlatformManager.reportGameResult = reportGameResult;
    /**
     * 玩一玩检测是否显示红包按钮
     * 需要显示会回调，否则不回调
     */
    function isUserInRedPackageActivity(checkResoultCallback, callbackThisObj) {
        if (RSDKHelper.isInit && !Api.switchVoApi.checkCloseWywRedMoney()) {
            RSDKHelper.isUserInRedPackageActivity(checkResoultCallback, callbackThisObj);
        }
        else {
        }
    }
    PlatformManager.isUserInRedPackageActivity = isUserInRedPackageActivity;
    /**
     * 玩一玩点红包
     */
    function redPackageButtonEvent() {
        if (RSDKHelper.isInit) {
            RSDKHelper.redPackageButtonEvent();
        }
        else {
        }
    }
    PlatformManager.redPackageButtonEvent = redPackageButtonEvent;
    /**
     * 和悦检测服务器状态，通过pid登录不检测服务器状态
     */
    function heyueCheckServer(serverId) {
        if (RSDKHelper.isInit) {
            if (LoginManager.loginBySetPID) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
            }
            else {
                if (PlatformManager.checkIsWeiduan()) {
                    PlatformManager.client.checkServerState(serverId);
                }
                else {
                    RSDKHelper.heyueCheckServer(serverId);
                }
            }
        }
        else {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
        }
    }
    PlatformManager.heyueCheckServer = heyueCheckServer;
    var client;
    (function (client) {
        function checkServerState(serverId) {
            if (checkIsWeiduan()) {
                rsdkclientplugin.checkServerState(serverId);
            }
            else {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
            }
        }
        client.checkServerState = checkServerState;
        function checkPurchase(serverId) {
            if (App.DeviceUtil.isAndroid()) {
                rsdkclientplugin.checkPurchase(serverId);
            }
        }
        client.checkPurchase = checkPurchase;
        function checkPerson() {
            return PlatformManager.kkk_age > 0;
        }
        client.checkPerson = checkPerson;
        function showPersonView(callback) {
            if (rsdkclientplugin) {
                return rsdkclientplugin.showPersonView(callback);
            }
        }
        client.showPersonView = showPersonView;
        function getAndroidAPILevel() {
            try {
                if (App.DeviceUtil.isAndroid()) {
                    App.LogUtil.log("getAndroidAPILevel" + rsdkclientplugin.getAndroidAPILevel());
                    return Number(rsdkclientplugin.getAndroidAPILevel());
                }
            }
            catch (e) {
                return 0;
            }
            return 0;
        }
        client.getAndroidAPILevel = getAndroidAPILevel;
        function getGUID() {
            if (rsdkclientplugin) {
                return rsdkclientplugin.getGUID();
            }
            return null;
        }
        client.getGUID = getGUID;
        function openServiceCenter() {
            // if(rsdkclientplugin)
            // {
            // 	rsdkclientplugin.openServiceCenter();
            // }
            RSDK.customerService("");
        }
        client.openServiceCenter = openServiceCenter;
        function showBindPhoneView(callback, callbackThisObj) {
            if (rsdkclientplugin) {
                return rsdkclientplugin.showBindPhoneView(callback.bind(callbackThisObj));
            }
            // if(callback)
            // {
            // 	callback.apply(callbackThisObj);
            // }
        }
        client.showBindPhoneView = showBindPhoneView;
        function checkBindPhone() {
            if (rsdkclientplugin) {
                return rsdkclientplugin.checkBindPhone();
            }
            return false;
        }
        client.checkBindPhone = checkBindPhone;
        function setAppForegroundStatusChange() {
            // if(checkIsWeiduan() && rsdkclientplugin)
            // {	
            // 	try
            // 	{
            // 		console.log("QAZ setAppForeground ");
            // 		rsdkclientplugin.setAppForegroundStatusChangeCallback((msg:string)=>{
            // 			console.log("QAZ setAppForeground Callback "+msg);
            // 			if(Number(msg)==1)
            // 			{
            // 				SoundManager.resumeBg();
            // 			}
            // 			else 
            // 			{
            // 				SoundManager.pauseBg();
            // 			}
            // 		});
            // 	}
            // 	catch (e) 
            // 	{
            // 		App.LogUtil.log("setAppForegroundStatusChange error");
            // 	}
            // }
            console.log("QAZ setGameForeground callsdk ");
            RSDKHelper.setGameBackgroundChange(function (msg) {
                console.log("QAZ setGameForeground Callback " + msg);
                if (Number(msg) == 1) {
                    SoundManager.isInBackground = false;
                    SoundManager.resumeBg();
                }
                else {
                    SoundManager.isInBackground = true;
                    SoundManager.pauseBg();
                    // 微个小游戏，热启动时的更新处理
                    if (App.DeviceUtil.isWXgame()) {
                        if (typeof window["wx"].getUpdateManager === 'function') {
                            var updateManager_1 = window["wx"].getUpdateManager();
                            updateManager_1.onCheckForUpdate(function (res) {
                                // 请求完新版本信息的回调
                                console.log("检查新版本", res.hasUpdate);
                            });
                            updateManager_1.onUpdateReady(function () {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启");
                                // window["wxgameCleanCacheImage"]();
                                // window["wxgameCleanCacheText"]();
                                updateManager_1.applyUpdate();
                            });
                            updateManager_1.onUpdateFailed(function () {
                                // 新的版本下载失败
                                console.log("新的版本下载失败");
                            });
                        }
                    }
                }
            });
        }
        client.setAppForegroundStatusChange = setAppForegroundStatusChange;
        // export function getAppVersion():number
        // {
        // 	try
        // 	{
        // 		if(rsdkclientplugin)
        // 		{
        // 			return rsdkclientplugin.getVersion();
        // 		}
        // 	}
        // 	catch(e)
        // 	{
        // 		return 0;
        // 	}
        // 	return 0;
        // }
        function checkWeiduanUpgrade() {
            if (PlatformManager.checkIs3KSp() && App.DeviceUtil.IsHtml5()) {
                try {
                    var version = Number(rsdkclientplugin.getVersion());
                    var channelId = PlatformManager.getChannelId();
                    var appid = rsdkclientplugin.getSubAppId();
                    var phpurl = ServerCfg.baseUrl + "getversion.php";
                    var host = window.location.host;
                    if (host.indexOf("127.0.0.1") != -1 || host.indexOf("192.168.") != -1) {
                        phpurl = "http://192.168.8.82/gt_h5/getversion.php";
                    }
                    NetLoading.show();
                    NetManager.http.get(phpurl, { version: version, appid: channelId + "_" + appid }, function (data) {
                        NetLoading.hide();
                        if (data && data.gameurl) {
                            ViewController.getInstance().openView(ViewConst.POPUP.WEIDUANUPGRADEPOPUPVIEW, data.gameurl);
                        }
                    }, function () {
                        NetLoading.hide();
                    }, PlatformManager);
                }
                catch (e) {
                    NetLoading.hide();
                }
            }
        }
        client.checkWeiduanUpgrade = checkWeiduanUpgrade;
        function checkAppUpgrade() {
            if (App.DeviceUtil.isRuntime2()) {
                //获取版本号versioncode，versionname
                egret.ExternalInterface.addCallback("getPackageVersionCallback", function (data) {
                    //data为json字符串：{"versionName":"1.0","versionCode":"1"}
                    var versionCode = JSON.parse(data).versionCode;
                    getApkUrl(versionCode, function (url) {
                        egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "openUrl", data: {
                                "url": "http://client.dl.126.net/androidmail/dashi/79/mail.apk"
                            }
                        }));
                    });
                });
                egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "getPackageVersion" }));
            }
        }
        client.checkAppUpgrade = checkAppUpgrade;
    })(client = PlatformManager.client || (PlatformManager.client = {}));
    function getApkUrl(versionCode, callback) {
        NetManager.http.get("", {}, function (data) {
        }, function () { }, PlatformManager.client);
        return '';
    }
    // 是否是港台web
    function checkIsTwWeb() {
        return PlatformManager.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatformManager.getAppid() == "17004003");
    }
    PlatformManager.checkIsTwWeb = checkIsTwWeb;
    function checkDownloadApp() {
        try {
            if (RSDKHelper.isInit && PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd") {
                qqwanbaplugin.checkDownloadApp(function (isDownloadApp) {
                    App.DeviceUtil.wanbaIsDownloadApp = isDownloadApp;
                    if (isDownloadApp) {
                        // 玩吧，如果还没有用微端登录过，并且已经安装了微端
                        ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADVIEW, {});
                    }
                });
            }
        }
        catch (e) {
            console.log("checkDownloadApp error");
        }
    }
    PlatformManager.checkDownloadApp = checkDownloadApp;
    function checkIsShenHeYiWan() {
        var bigappid_arr = [17013000];
        var appid_arr = [17001263, 17014002, 17001274];
        var bigAppid = Number(PlatformManager.getBigAppid());
        var isBigApp = bigappid_arr.indexOf(bigAppid) > -1;
        var appId = Number(PlatformManager.getAppid());
        var isApp = appid_arr.indexOf(appId) > -1;
        // return true;
        return (PlatformManager.checkIsIOSShenheSp() && (isApp || isBigApp));
    }
    PlatformManager.checkIsShenHeYiWan = checkIsShenHeYiWan;
    function checkHideSwitchAccountBtn() {
        /**这个条件是如果1000服地址并且不使用sdk会显示切换账号按钮 */
        if (PlatformManager.checkIsTest() && PlatformManager.checkIsUseSDK() == false) {
            return false;
        }
        if (PlatformManager.checkIsPlatSp()) {
            return false;
        }
        if (PlatformManager.checkIsLocal() && PlatformManager.checkIsUseSDK() == false) {
            return false;
        }
        return (PlatformManager.checkIs11WanSp() ||
            PlatformManager.checkIs3kShenHaiSp() ||
            (PlatformCfg.closeSwitchAcount[PlatformManager.getSpid()] && !PlatformManager.checkIsTest()) ||
            String(PlatformManager.getAppid()) == "17001213") ||
            String(PlatformManager.getBigAppid()) == "17017000" ||
            (String(PlatformManager.getBigAppid()) == "17015000" && String(PlatformManager.getAppid()) != "17015009") ||
            ((PlatformManager.checkIsCpsSp() || String(PlatformManager.getBigAppid()) == "17018000") && String(PlatformManager.getAppid()) != "17018004" && String(PlatformManager.getAppid()) != "17018005" && String(PlatformManager.getAppid()) != "17018006" && String(PlatformManager.getAppid()) != "17018007" && String(PlatformManager.getAppid()) != "17018008" && String(PlatformManager.getAppid()) != "17018009") ||
            PlatformManager.checkIsTySp() || PlatformManager.checkIsXlSp() ||
            PlatformManager.checkIs49ySp() || PlatformManager.checkIsMmSp() ||
            App.DeviceUtil.isWXgame() || PlatformManager.checkIsIdnSp() ||
            App.DeviceUtil.isWyw() || checkIsFB();
        ;
    }
    PlatformManager.checkHideSwitchAccountBtn = checkHideSwitchAccountBtn;
    /** 是否有特殊关闭按钮（关闭按钮在左边，其实就是指的微信小游戏和qq玩一玩 */
    function hasSpcialCloseBtn() {
        return PlatformManager.checkIsFB() || App.DeviceUtil.isWXgame() || PlatformManager.checkIsLmSp() || App.DeviceUtil.isQQGame();
    }
    PlatformManager.hasSpcialCloseBtn = hasSpcialCloseBtn;
    function getLocalMultiLanguage() {
        if (PlatformManager.checkIsLocal()) {
            var tmpcnName = App.CommonUtil.getOption("language");
            if (tmpcnName && RES.hasRes(tmpcnName)) {
                return tmpcnName;
            }
        }
        return null;
    }
    PlatformManager.getLocalMultiLanguage = getLocalMultiLanguage;
    /**
     * 是否广点通用户
     */
    function checkIsGDTUser() {
        if (Api.switchVoApi.checkOpenGDTStatistics()) {
            if (PlatformManager.getFromQZonePet().indexOf("H5.APP.GDTML") > -1) {
                return true;
            }
        }
    }
    PlatformManager.checkIsGDTUser = checkIsGDTUser;
    function checkIsGDTAD1User() {
        if (Api.switchVoApi.checkOpenGDTStatistics()) {
            if (PlatformManager.getFromQZonePet().indexOf("H5.GDT.001") > -1) {
                return true;
            }
        }
    }
    PlatformManager.checkIsGDTAD1User = checkIsGDTAD1User;
    function checkIsGDTAD2User() {
        if (Api.switchVoApi.checkOpenGDTStatistics()) {
            if (PlatformManager.getFromQZonePet().indexOf("H5.GDT.002") > -1) {
                return true;
            }
        }
    }
    PlatformManager.checkIsGDTAD2User = checkIsGDTAD2User;
    /**
     * 是否是腾讯视频渠道
     */
    function checkIsWanbaFromWx() {
        if (PlatformManager.checkIsWanbaSp() && PlatformManager.checkIsUseSDK()) {
            if (window['OPEN_DATA'] && window['OPEN_DATA'].pf.indexOf("weixin.99") > -1) {
                return true;
            }
        }
        return false;
    }
    PlatformManager.checkIsWanbaFromWx = checkIsWanbaFromWx;
    function checkIsHeYue() {
        if (PlatformManager.checkIsUseSDK()) {
            return (checkIsFB() || PlatformManager.checkIsEnSp() == true || PlatformManager.checkIsIdnSp() == true || PlatformManager.checkIsTWBSp() == true || PlatformManager.checkIsTWShenheSp() == true || PlatformManager.getBigAppid() == "17004000") ||
                (PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp() || Number(PlatformManager.getBigAppid()) == 17027000);
        }
    }
    PlatformManager.checkIsHeYue = checkIsHeYue;
    //是否是fb平台
    function checkIsFB() {
        var fb = false;
        if (App.DeviceUtil.IsHtml5()) {
            if (window) {
                var checkFbUrl = false;
                var location_1 = window.location;
                if (location_1.host.indexOf("262644120947598") > -1 || location_1.host.indexOf("1523695954415165") > -1 || location_1.host.indexOf("apps.fbsbx.com") > -1) {
                    checkFbUrl = true;
                }
                fb = checkFbUrl || window['FBInstant'];
            }
        }
        return fb;
    }
    PlatformManager.checkIsFB = checkIsFB;
    function checkIsFBEnSp() {
        if (checkIsFB()) {
            var location_2 = window.location;
            if (location_2.host.indexOf("262644120947598") > -1) {
                return true;
            }
        }
        return false;
    }
    PlatformManager.checkIsFBEnSp = checkIsFBEnSp;
    function checkIsFBTwSp() {
        if (checkIsFB()) {
            var location_3 = window.location;
            if (location_3.host.indexOf("1523695954415165") > -1) {
                return true;
            }
        }
        return false;
    }
    PlatformManager.checkIsFBTwSp = checkIsFBTwSp;
    function showADS() {
        if (checkIsFB() && Api.switchVoApi.checkFBADSOpen()) {
            var t_1 = null;
            var e = window['FBInstant'];
            if (e) {
                var i = e.getSupportedAPIs();
                i.includes("getInterstitialAdAsync") && i.includes("getRewardedVideoAsync") && e.getInterstitialAdAsync("1693233550790460_1693235100790305").then(function (e) {
                    return t_1 = e,
                        t_1.loadAsync();
                }).then(function () {
                    t_1.showAsync().then(function () {
                        console.log("Interstitial ad finished successfully");
                    })["catch"](function (t) {
                        console.error(t.message);
                    });
                })["catch"](function (t) {
                    console.log("Interstitial failed to preload: " + t.message);
                });
            }
        }
    }
    PlatformManager.showADS = showADS;
    function checkIsShenHeShowCard() {
        if (PlatformManager.getAppid() == "17009011" || PlatformManager.getAppid() == "17009013" || PlatformManager.getAppid() == "17009014" || PlatformManager.getAppid() == "17004013"
            || PlatformManager.getSpName().indexOf("iosgnetop") > -1 || PlatformManager.checkIsEnSp() || PlatformManager.getAppid() == "17009018" || PlatformManager.getAppid() == "17001213") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsShenHeShowCard = checkIsShenHeShowCard;
    function checkIsShenHeTaskShowCard() {
        if (PlatformManager.getAppid() == "17009011" || PlatformManager.getAppid() == "17009013" || PlatformManager.getAppid() == "17009014"
            || PlatformManager.getSpName().indexOf("iosgnetop") > -1 || PlatformManager.getAppid() == "17009018" || PlatformManager.getAppid() == "17001213") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsShenHeTaskShowCard = checkIsShenHeTaskShowCard;
    function getWXMoreGameIcon(callback, callbackThisObj) {
        console.log("QAZ getWXMoreGameIcon callsdk ");
        RSDKHelper.getMoreGameIcon(callback.bind(callbackThisObj));
    }
    PlatformManager.getWXMoreGameIcon = getWXMoreGameIcon;
    function showWXMoreGame() {
        console.log("QAZ showMoreGame callsdk ");
        RSDKHelper.showMoreGame();
    }
    PlatformManager.showWXMoreGame = showWXMoreGame;
    // 悦粤语包状态
    function checkIsTWSoundType() {
        if (PlatformManager.checkIsTWBSp() && Api.switchVoApi.checkOpenVoice()) {
            //1 纯粤语 
            if (PlatformManager.getAppid() == "17004015" || PlatformManager.getAppid() == "17004014" || PlatformManager.checkIsTest()) {
                return 1;
            }
            else {
                return 2;
            }
        }
        return 3;
    }
    PlatformManager.checkIsTWSoundType = checkIsTWSoundType;
    function isShowWXLoading() {
        if (App.DeviceUtil.isWXgame()) {
            return true;
        }
        return false;
    }
    PlatformManager.isShowWXLoading = isShowWXLoading;
    /**
     * 联系客服
     */
    function getContackService() {
        var serviceType = PlatformManager.getCustomerServiceType();
        console.log("QAZ fkcw getCustomerServiceType " + serviceType);
        if (serviceType == 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, { type: 0 });
        }
        else if (serviceType == 1) {
            PlatformManager.client.openServiceCenter();
        }
        else {
            RSDKHelper.getCustomerService(function (data) {
                console.log("QAZ fkcw getCustomerService 结果" + data);
                if (data) {
                    ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, { type: 2, info: data });
                }
            });
        }
    }
    PlatformManager.getContackService = getContackService;
    function checkIsFromMicroEnd() {
        if (RSDKHelper.isInit) {
            return qqwanbaplugin.checkIsFromMicroEnd();
        }
        return false;
    }
    PlatformManager.checkIsFromMicroEnd = checkIsFromMicroEnd;
    /**
     * 是否是泰国的华为渠道
     */
    function checkIsThHw() {
        return PlatformManager.getAppid() == "17027004" && PlatformManager.checkIsThSp();
    }
    PlatformManager.checkIsThHw = checkIsThHw;
    /**
     * 是否是英文的华为渠道
     */
    function checkIsEnHw() {
        return PlatformManager.getAppid() == "1003005005" && PlatformManager.checkIsEnSp();
    }
    PlatformManager.checkIsEnHw = checkIsEnHw;
    /**
     * 是否是开启了货币国际化的渠道
     */
    function checkisLocalPrice() {
        return Boolean((GameData.platMoneyData || GameData.platMoneyData2) && (checkIsThHw() ||
            checkIsEnSp() ||
            checkIsRuSp() ||
            checkIsTWBSp()));
    }
    PlatformManager.checkisLocalPrice = checkisLocalPrice;
    /**
     * 检测是否显示返回大厅(App)按钮
     */
    function checkShowBackApp() {
        if (PlatformManager.getAppid() == "17021003") {
            return false;
        }
        return (PlatformManager.checkIsXySp() == true || PlatformManager.checkIsTySp() == true || PlatformManager.checkIsXlSp() == true || PlatformManager.getAppid() == "17018010") &&
            PlatformManager.checkIsUseSDK() == true;
    }
    PlatformManager.checkShowBackApp = checkShowBackApp;
    /**
     * 检测是否需要检测补单处理
     */
    function checkNeedCheckPurchase() {
        if (PlatformManager.checkIsUseSDK() && PlatformManager.checkIsWeiduan() == true && App.DeviceUtil.isAndroid() && checkIsHeYue()) {
            return true;
        }
        return false;
    }
    PlatformManager.checkNeedCheckPurchase = checkNeedCheckPurchase;
    /**
     * 初始化对象池参数
     */
    function initUseObjectPool() {
        // let useObjPool:boolean = (checkIsLocal()==false&&checkIsXlySp()==false);
        // App.DisplayUtil.useObjectPool=useObjPool;
        // if(App.DeviceUtil.isRuntime2())
        // {
        // 	App.DisplayUtil.useObjectPool=false;
        // }
        App.DisplayUtil.useObjectPool = false;
    }
    /**
     * 调用Appstore评分
     */
    function openAppStoreScore() {
        if (App.DeviceUtil.isIOS() && PlatformManager.checkIsWeiduan()) {
            if (RSDKHelper.isInit) {
                RSDKHelper.openAppStoreScore();
            }
        }
    }
    PlatformManager.openAppStoreScore = openAppStoreScore;
    /**
     * 检测是否有绑定功能
     */
    function hasBindFunc() {
        var result = false;
        if (RSDKHelper.isInit) {
            result = RSDKHelper.hasBindFunc();
        }
        return result;
    }
    PlatformManager.hasBindFunc = hasBindFunc;
    /**
     * 检测是否已经绑定
     * @param callback 检测结果，code==1 是绑定成功
     */
    function checkBindStatus(callback) {
        if (RSDKHelper.isInit) {
            RSDKHelper.checkBindStatus(callback);
        }
        else {
            App.LogUtil.log("sdk not init");
            if (PlatformManager.checkIsLocal()) {
                callback(0);
            }
        }
    }
    PlatformManager.checkBindStatus = checkBindStatus;
    /**
     * 绑定接口,回调同检测绑定接口
     */
    function callBind(callback) {
        var result = false;
        if (RSDKHelper.isInit) {
            RSDKHelper.callBind(callback);
            result = true;
        }
        else {
            App.LogUtil.log("sdk not init");
            if (PlatformManager.checkIsLocal()) {
                callback(1);
            }
        }
        return result;
    }
    PlatformManager.callBind = callBind;
    /**
     * 获取手机验证码
     * @param mobile
     * @param callback
     * @param callbackThisObj
     */
    function sendMobileCode(mobile, callback, callbackThisObj) {
        RSDKHelper.sendMobileCode(mobile, callback, callbackThisObj);
    }
    PlatformManager.sendMobileCode = sendMobileCode;
    /**
     * 使用手机号和验证码 验证
     * @param mobile
     * @param code
     * @param callback
     * @param callbackThisObj
     */
    function checkMobileCode(mobile, code, callback, callbackThisObj) {
        RSDKHelper.checkMobileCode(mobile, code, callback, callbackThisObj);
    }
    PlatformManager.checkMobileCode = checkMobileCode;
    function setAppOnBackHandler() {
        if (RSDKHelper.isInit) {
            RSDKHelper.setAppOnBackHandler(function () {
                if (ViewController.getInstance().hideTopView() == false) {
                    RSDKHelper.goAppExit();
                }
            }, PlatformManager);
        }
    }
    PlatformManager.setAppOnBackHandler = setAppOnBackHandler;
    /**
     * 获取翻译目标语言
     */
    function getTransTargetLang() {
        var key = GameData.getLanguageKey("cn");
        if (key == "cn" || key == "tw") {
            key = "zh-" + key.toUpperCase();
        }
        return key;
    }
    PlatformManager.getTransTargetLang = getTransTargetLang;
    /**
     * 获取游戏使用的语言
     */
    function getGameArea() {
        if (!GameData.curBigType) {
            GameData.curBigType = App.CommonUtil.getOption("gameArea");
        }
        return GameData.curBigType || "";
    }
    PlatformManager.getGameArea = getGameArea;
    /**
     * 获取游戏使用的语言
     */
    function getGameLanguage() {
        return App.CommonUtil.getOption("gameLanguage") || "";
    }
    PlatformManager.getGameLanguage = getGameLanguage;
    function getGameCountryCode() {
        return App.CommonUtil.getOption("contryCode") || "";
    }
    PlatformManager.getGameCountryCode = getGameCountryCode;
    /**
     * 是否是新的分区包
     */
    function checkIsAreaPkg() {
        return Boolean(getGameLanguage()) && Boolean(getGameArea());
    }
    PlatformManager.checkIsAreaPkg = checkIsAreaPkg;
    function switchAreaOrLanguage(area, language) {
        if (RSDKHelper.isInit) {
            RSDKHelper.switchAreaOrLanguage(area, language);
        }
    }
    PlatformManager.switchAreaOrLanguage = switchAreaOrLanguage;
    function checkIsViSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_vi") > -1 || pathname.indexOf("_testvi") > -1 || App.CommonUtil.getOption("language") == "vi";
            // return search.indexOf("_vi")>-1||search.indexOf("_testvi")>-1 || search.indexOf("=vi")>-1||
            // 	pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1 || pathname.indexOf("=vi")>-1;
        }
        return false;
    }
    PlatformManager.checkIsViSp = checkIsViSp;
    function analyticsByHyKey(key) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsByHyKey(key);
        }
    }
    PlatformManager.analyticsByHyKey = analyticsByHyKey;
    /**
     * iframe弹窗打开url页面
     * @param url 目标url地址
     * @param title 标题，可以无
     */
    function loadUrl(url, title) {
        if (RSDKHelper.isInit) {
            RSDKHelper.loadUrl(url, title);
        }
        else {
            console.log("调用 RSDK.loadUrl 失败 ，没有初始化RSDKHelper");
        }
    }
    PlatformManager.loadUrl = loadUrl;
})(PlatformManager || (PlatformManager = {}));
//# sourceMappingURL=PlatformManager.js.map