var PlatMgr;
(function (PlatMgr) {
    PlatMgr.isLogin = false;
    PlatMgr.kkk_age = 0;
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
    PlatMgr.getAppVersion = getAppVersion;
    var _appid = "";
    function getAppid() {
        if (!LoginMgr.isCreateScene) {
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
    PlatMgr.getAppid = getAppid;
    function getTestAppid() {
        if (PlatMgr.checkIsLocal() && PlatMgr.checkIsPlatSp() == false) {
            return "1001";
        }
        else {
            return "";
        }
    }
    PlatMgr.getTestAppid = getTestAppid;
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
    PlatMgr.getBigAppid = getBigAppid;
    function getContact() {
        if (PlatformCfg.contactCfg[PlatMgr.getAppid()]) {
            return PlatformCfg.contactCfg[PlatMgr.getAppid()];
        }
        else if (PlatformCfg.contactCfg[PlatMgr.getBigAppid()]) {
            return PlatformCfg.contactCfg[PlatMgr.getBigAppid()];
        }
        else {
            for (var key in PlatformCfg.contactCfg) {
                if (key.indexOf("-") > -1) {
                    var keys = key.split("-");
                    var appid = Number(PlatMgr.getAppid());
                    var bigAppid = Number(PlatMgr.getBigAppid());
                    if (appid >= Number(keys[0]) && appid <= Number(keys[1])) {
                        return PlatformCfg.contactCfg[key];
                    }
                }
            }
        }
        return [];
    }
    PlatMgr.getContact = getContact;
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
    PlatMgr.getSpid = getSpid;
    /**
     * 获取前端使用的Spid，可以理解为纯前端资源和多语言cn相关处理时候使用
     */
    function getSpidKey(isClientRes) {
        if (isClientRes === void 0) { isClientRes = true; }
        var spid = null;
        if (checkIsLocal() && isClientRes == false) {
            spid = "local";
        }
        else if (checkIsWxSp()) {
            spid = "wx";
        }
        else if (checkIsTestSp()) {
            spid = "test";
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
                    spid = "ls";
                }
            }
            else {
                spid = "ls";
            }
        }
        var tmpName = getPlatName();
        if (tmpName && !checkIsIOSShenheSp()) {
            spid = tmpName;
        }
        return spid;
    }
    PlatMgr.getSpidKey = getSpidKey;
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
    PlatMgr.getPathRuleName = getPathRuleName;
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
    PlatMgr.checkIsUseSDK = checkIsUseSDK;
    function getPlatName() {
        var platName = PlatformCfg.platNameCfg[getBigAppid()];
        if (!platName) {
            platName = PlatformCfg.platNameCfg[getAppid()];
        }
        if (PlatMgr.checkIsLocal() && PlatMgr.checkIsPlatSp() == false) {
            platName = "";
        }
        return platName;
    }
    PlatMgr.getPlatName = getPlatName;
    function checkIsPlatSp() {
        if (App.DeviceUtil.IsHtml5() && App.TestUtil.getTestPlat() && (window.location.hostname.indexOf("gt-test") > -1 || PlatMgr.checkIsLocal())) {
            return true;
        }
        return false;
    }
    PlatMgr.checkIsPlatSp = checkIsPlatSp;
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
    PlatMgr.checkIsLocalSp = checkIsLocalSp;
    /**
     * 是否IOS审核服
     */
    function checkIsIOSShenheSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("iosshenhe") > -1;
        }
        return false;
    }
    PlatMgr.checkIsIOSShenheSp = checkIsIOSShenheSp;
    /** 是否审核其他语言版语版 */
    function checkIOSShenheOtherLanguage() {
        if (PlatMgr.checkIsIOSShenheSp()) {
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
    PlatMgr.checkIOSShenheOtherLanguage = checkIOSShenheOtherLanguage;
    /**检测文字显示是水平显示 */
    function checkIsTextHorizontal() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            //检测是否是英文  App.CommonUtil.getOption("language")=="en" url参数有language = en
            return checkIsEnLang() || checkIsThSp() || checkIsPtLang() || checkIsRuLang();
        }
        return false;
    }
    PlatMgr.checkIsTextHorizontal = checkIsTextHorizontal;
    function checkIsEnSp() {
        return getSpid() == "en";
    }
    PlatMgr.checkIsEnSp = checkIsEnSp;
    //检测是否是雷神渠道
    function checkIsLsSp() {
        return getSpid() == "ls";
    }
    PlatMgr.checkIsLsSp = checkIsLsSp;
    /**
     * 是葡语
     */
    function checkIsPtLang() {
        return getSpidKey(true) == "pt";
    }
    PlatMgr.checkIsPtLang = checkIsPtLang;
    /**
     * 是俄语
     */
    function checkIsRuLang() {
        return getSpidKey(true) == "ru" || checkIsRuSp();
    }
    PlatMgr.checkIsRuLang = checkIsRuLang;
    /**
     * 检查是不是英文语言
     */
    function checkIsEnLang() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            return getSpidKey(true) == "en" || checkIsIdnSp();
        }
        return false;
    }
    PlatMgr.checkIsEnLang = checkIsEnLang;
    function checkIsKr37Sp() {
        return getSpid() == "kr37";
    }
    PlatMgr.checkIsKr37Sp = checkIsKr37Sp;
    function checkIsThSp() {
        return getSpid() == "th" || App.CommonUtil.getOption("language") == "th";
    }
    PlatMgr.checkIsThSp = checkIsThSp;
    function checkIsRuSp() {
        return getSpid() == "ru" || App.CommonUtil.getOption("language") == "ru";
    }
    PlatMgr.checkIsRuSp = checkIsRuSp;
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
    PlatMgr.checkIsWxSp = checkIsWxSp;
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
    PlatMgr.checkIsQQGameSp = checkIsQQGameSp;
    function checkIsIdnSp() {
        return getSpid() == "idn";
    }
    PlatMgr.checkIsIdnSp = checkIsIdnSp;
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
    PlatMgr.getSpFile = getSpFile;
    function checkIsTest() {
        var result = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            result = pathname.indexOf("_test") > -1;
        }
        return result;
    }
    PlatMgr.checkIsTest = checkIsTest;
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
    PlatMgr.checkUseRSDKSocket = checkUseRSDKSocket;
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
    PlatMgr.checkIsWeiduan = checkIsWeiduan;
    function checkIsTWBSp() {
        return getSpid() == "tw";
    }
    PlatMgr.checkIsTWBSp = checkIsTWBSp;
    function checkIsTWCNSp() {
        return getSpid() == "twcn";
    }
    PlatMgr.checkIsTWCNSp = checkIsTWCNSp;
    function checkIsKRSp() {
        return getSpid() == "kr";
    }
    PlatMgr.checkIsKRSp = checkIsKRSp;
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
        if (PlatMgr.getAppid() == "17004004" || PlatMgr.getAppid() == "17004007") {
            return true;
        }
        return false;
    }
    PlatMgr.checkIsTWMCSp = checkIsTWMCSp;
    function checkIsTestSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.lastIndexOf("/gt_test/") == 0;
        }
        return false;
    }
    PlatMgr.checkIsTestSp = checkIsTestSp;
    function checkIsWanbaSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            var host = window.location.host;
            return pathname.indexOf("wanba") > -1 || host.indexOf("urlshare") > -1 || host.indexOf("qzone") > -1;
        }
        return false;
    }
    PlatMgr.checkIsWanbaSp = checkIsWanbaSp;
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
    PlatMgr.checkIsLocal = checkIsLocal;
    function isSupportDesktopIcon() {
        // if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
        // 	return true;
        // }
        // else {
        // 	return false;
        // }
        console.log("QAZ fkcw checkDesktop" + PlatMgr.checkDesktop());
        return PlatMgr.checkDesktop();
    }
    PlatMgr.isSupportDesktopIcon = isSupportDesktopIcon;
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
            if (checkIsUseSDK()) {
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
    PlatMgr.getIsWanbaSQ = getIsWanbaSQ;
    function getIsWanbaQQLive() {
        return getWanbaQua() == "QQLive";
    }
    PlatMgr.getIsWanbaQQLive = getIsWanbaQQLive;
    /**
     * 是不是来自 企鹅电竞
     */
    function getIsWanbaQQEGame() {
        return getWanbaPf() == "wanba_ts.111" || getWanbaPf() == "weixin.112";
    }
    PlatMgr.getIsWanbaQQEGame = getIsWanbaQQEGame;
    /**
     * 是不是来自 【玩一玩】电竞活动二期
     */
    function getIsWywEgame2() {
        return getWywSrc() == 314 || getWywSrc() == 314;
    }
    PlatMgr.getIsWywEgame2 = getIsWywEgame2;
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
    PlatMgr.getFromQZonePet = getFromQZonePet;
    function isSupportShare() {
        console.log("QAZ fkcw checkShare" + PlatMgr.checkShare());
        return PlatMgr.checkShare() == 1 || PlatMgr.checkShare() == 2 || PlatMgr.checkShare() == 3 || PlatMgr.checkIsLocal();
        // return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
    }
    PlatMgr.isSupportShare = isSupportShare;
    function isSupportAttention() {
        return PlatMgr.hasFollow();
    }
    PlatMgr.isSupportAttention = isSupportAttention;
    function isSupportBindPhone() {
        return PlatformCfg.bindPhone[getAppid()];
    }
    PlatMgr.isSupportBindPhone = isSupportBindPhone;
    function sendToDesktop(callback, callbackThisObj) {
        if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
            window.open("resource/other/一個官人七個妻.url");
        }
        else {
            // qqwanbaplugin.shortcut({title:"极品大官人"},callback.bind(callbackThisObj));
            PlatMgr.requestDesktop({ title: "江山美人", desc: "" }, callback, callbackThisObj);
        }
        // callback.apply(callbackThisObj);
    }
    PlatMgr.sendToDesktop = sendToDesktop;
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
    }
    PlatMgr.share = share;
    function checkIsLoginPlat() {
        var loginResult = false;
        if (checkIsUseSDK()) {
            loginResult = PlatMgr.isLogin;
        }
        else {
            loginResult = true;
        }
        return loginResult;
    }
    PlatMgr.checkIsLoginPlat = checkIsLoginPlat;
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
    PlatMgr.init = init;
    /**
     * SDK是否已经初始化
     */
    function isSdkInit() {
        return RSDKHelper.isInit;
    }
    PlatMgr.isSdkInit = isSdkInit;
    function login() {
        LoginMgr.setLog("start login rsdk");
        if (RSDKHelper.isInit) {
            RSDKHelper.login();
        }
    }
    PlatMgr.login = login;
    function logout() {
        PlatMgr.isLogin = false;
        LoginMgr.inSDKAccountSwitching = true;
        if (RSDKHelper.isInit) {
            RSDKHelper.logout();
            if (PlatMgr.checkIsKRSp() && !PlatMgr.checkIsWanbaSp()) {
                return true;
            }
            return false;
        }
        else {
            LoginMgr.changeAccount();
            return true;
        }
    }
    PlatMgr.logout = logout;
    function showClosePayTip() {
        if (GameData.closePay) {
            App.CommonUtil.showTip(LangMger.getlocal("closePaySysTip"));
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
        // NetManager.request(NetRequestConst.REQUEST_PAY_CHECKPAY,{gemType:productId});
        // App.MsgHelper.addEvt(NetRequestConst.REQUEST_PAY_CHECKPAY,PlatformManager.checkPayCallback,PlatformManager);
    }
    PlatMgr.checkPay = checkPay;
    function checkPayCallback(event) {
        // App.MsgHelper.removeEvt(NetRequestConst.REQUEST_PAY_CHECKPAY,PlatformManager.checkPayCallback,PlatformManager);
        if (event.data && event.data.ret == true && event.data.data.data.payflag) {
            pay(payType, payCallback, payCallbackThisObj);
        }
        else {
            App.CommonUtil.showTip(LangMger.getlocal("checkPayTip"));
            App.MsgHelper.dispEvt(MsgConst.MODEL_PAYMENT);
        }
        payCallback = payCallbackThisObj = null;
    }
    PlatMgr.checkPayCallback = checkPayCallback;
    function checkHasAd(obj, callbackThisObj) {
        if (RSDKHelper.isInit) {
            RSDKHelper.checkHasAd(obj, callbackThisObj);
        }
    }
    PlatMgr.checkHasAd = checkHasAd;
    function showAd(roleId, obj, callbackThisObj) {
        if (RSDKHelper.isInit) {
            RSDKHelper.showAd(roleId, obj, callbackThisObj);
        }
    }
    PlatMgr.showAd = showAd;
    function pay(productId, callback, callbackThisObj) {
        if (showClosePayTip()) {
            return;
        }
        /**
         * 现在没说微信的IOS不能支付，先干掉这里
         * 2020/05/18
         *
         * 为了微信审核，解开注释
         * 2020/05/22
         *
         * 再次注释
         * 2020/05/28
         */
        // if (App.DeviceUtil.isWXgame() && window["__WXGAME_OS__"] === "ios")
        // {
        // 	// 微信小游戏ios暂不开支付
        // 	App.CommonUtil.showTip(LangMger.getlocal("wxgameIOSNotPayTip"));
        // }
        // else 
        if (PlatMgr.checkIsUseSDK()) {
            if (RSDKHelper.isInit) {
                RSDKHelper.pay(productId, callback, callbackThisObj);
            }
        }
        else {
            if (PlatMgr.checkIsLocal()) {
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
    PlatMgr.pay = pay;
    function testPay(productId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (PlatMgr.checkIsLocal() || GameData.isTest()) {
            var order_id = String(new Date().getTime() + Math.random() * 99999999);
            NetManager.request(NetConst.PAY_PROCESSPAYMENT, { order_id: order_id, gold_num: itemCfg.gemCost, platform: "h5", name: itemCfg.id });
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
    PlatMgr.analyticsLogin = analyticsLogin;
    function analyticsNewGuide(step) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsNewGuide(step);
        }
        App.LogUtil.log("newguide:" + step);
    }
    PlatMgr.analyticsNewGuide = analyticsNewGuide;
    function analyticsPay(id, orderId) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsPay(id, orderId);
        }
    }
    PlatMgr.analyticsPay = analyticsPay;
    function analyticsLevelup() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLevelup();
        }
    }
    PlatMgr.analyticsLevelup = analyticsLevelup;
    function analyticsVipup() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsVipup();
        }
    }
    PlatMgr.analyticsVipup = analyticsVipup;
    function analyticsRegister() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsRegister();
        }
    }
    PlatMgr.analyticsRegister = analyticsRegister;
    function analyticsLoadEnd() {
        console.log("QAZ analyticsLoadEnd " + RSDKHelper.isInit);
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLoadEnd();
        }
    }
    PlatMgr.analyticsLoadEnd = analyticsLoadEnd;
    function analyticsCompleteNewGuide() {
        console.log("analyticsCompleteNewGuide");
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsCompleteNewGuide();
        }
    }
    PlatMgr.analyticsCompleteNewGuide = analyticsCompleteNewGuide;
    /**
     * 统计微信购买成功
     */
    function analyticsWxBuy(info) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsWxBuy(info);
        }
    }
    PlatMgr.analyticsWxBuy = analyticsWxBuy;
    function pushMsg(data) {
        if (RSDKHelper.isInit && getIsWanbaSQ() == true) {
            var msg = LangMger.getlocal("wanbaPushMsg" + data.type);
            qqwanbaplugin.sendMessage(data.frd, "1", msg, null);
        }
    }
    PlatMgr.pushMsg = pushMsg;
    function getGiftId() {
        var gid = null;
        if (RSDKHelper.isInit && checkIsWanbaSp() == true && checkIsUseSDK()) {
            gid = qqwanbaplugin.getGiftId();
        }
        // return "502";
        return gid;
    }
    PlatMgr.getGiftId = getGiftId;
    function giftExchange(callback, callbackThisObj) {
        var gid = null;
        if (RSDKHelper.isInit && checkIsWanbaSp() == true && checkIsUseSDK()) {
            qqwanbaplugin.giftExchange(callback.bind(callbackThisObj));
        }
        // return gid;
    }
    PlatMgr.giftExchange = giftExchange;
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
    PlatMgr.checkCrossDomon = checkCrossDomon;
    function getSpName() {
        var spName = "";
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            spName = App.CommonUtil.getOption("r_plat");
        }
        return spName;
    }
    PlatMgr.getSpName = getSpName;
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
    PlatMgr.attention = attention;
    function checkAttention() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkAttention();
        }
        else {
            return false;
        }
    }
    PlatMgr.checkAttention = checkAttention;
    function getChannelId() {
        try {
            return RSDK.getChannelId();
        }
        catch (e) {
            return "";
        }
    }
    PlatMgr.getChannelId = getChannelId;
    function openUserCenter() {
        if (RSDKHelper.isInit && rsdkclientplugin) {
            rsdkclientplugin.openUserCenter();
        }
    }
    PlatMgr.openUserCenter = openUserCenter;
    //充值档位花费
    function getMoneyTag(num) {
        var str = "";
        if (checkIsTWBSp() || checkIsEnLang() || checkIsThSp() || checkIsRuSp() || checkIsEnSp()) {
            str = "$";
        }
        else if (checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                str = "원";
            }
            else {
                str = "$";
            }
        }
        else {
            str = "RMB";
        }
        return "" + num + str;
    }
    PlatMgr.getMoneyTag = getMoneyTag;
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
            return "RMB";
        }
    }
    PlatMgr.getMoneySign = getMoneySign;
    function checkIsUseBigCfg() {
        // return getBigAppid()=="17001000";
        return checkIsTWBSp();
    }
    PlatMgr.checkIsUseBigCfg = checkIsUseBigCfg;
    function checkIsShowWarning() {
        if (checkIsTWBSp() || checkIsKRSp() || checkIsThSp() || checkIsRuSp() || checkIsEnLang() || checkIsEnSp()) {
            return false;
        }
        else {
            return true;
        }
    }
    PlatMgr.checkIsShowWarning = checkIsShowWarning;
    function getStatement() {
        var appid = PlatMgr.getAppid();
        var bigAppid = PlatMgr.getBigAppid();
        var spName = PlatMgr.getSpName();
        var spid = PlatMgr.getSpidKey();
        if (PlatformCfg.statementCfg[appid]) {
            return PlatformCfg.statementCfg[appid];
        }
        else if (PlatformCfg.statementCfg[bigAppid]) {
            return PlatformCfg.statementCfg[bigAppid];
        }
        else if (PlatformCfg.statementCfg[spName]) {
            return PlatformCfg.statementCfg[spName];
        }
        else if (PlatformCfg.statementCfg[spid]) {
            return PlatformCfg.statementCfg[spid];
        }
        return "";
    }
    PlatMgr.getStatement = getStatement;
    function checkShare() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkShare();
        }
        else {
            return 0;
        }
    }
    PlatMgr.checkShare = checkShare;
    //检查通用分享  只有微信需要
    function checkCommonShare() {
        return App.DeviceUtil.isWXgame();
    }
    PlatMgr.checkCommonShare = checkCommonShare;
    function checkDesktop() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.checkDesktop();
        }
        else {
            return false;
        }
    }
    PlatMgr.checkDesktop = checkDesktop;
    function hasFollow() {
        if (RSDKHelper.isInit) {
            console.log("QAZ hasFollow " + RSDKHelper.hasFollow());
            return RSDKHelper.hasFollow();
        }
        else {
            return false;
        }
    }
    PlatMgr.hasFollow = hasFollow;
    function getCustomerServiceType() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.getCustomerServiceType();
        }
        else {
            return 0;
        }
    }
    PlatMgr.getCustomerServiceType = getCustomerServiceType;
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
    PlatMgr.getCustomerServiceData = getCustomerServiceData;
    function requestDesktop(data, callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            return RSDKHelper.requestDesktop(data, callback, callbackThisObj);
        }
        else {
            return false;
        }
    }
    PlatMgr.requestDesktop = requestDesktop;
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
    PlatMgr.reportGameResult = reportGameResult;
    /**
     * 和悦检测服务器状态，通过pid登录不检测服务器状态
     */
    function heyueCheckServer(serverId) {
        if (RSDKHelper.isInit) {
            if (LoginMgr.loginBySetPID) {
                App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
            }
            else {
                if (PlatMgr.checkIsWeiduan()) {
                    PlatMgr.client.checkServerState(serverId);
                }
                else {
                    RSDKHelper.heyueCheckServer(serverId);
                }
            }
        }
        else {
            App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
        }
    }
    PlatMgr.heyueCheckServer = heyueCheckServer;
    var client;
    (function (client) {
        function checkServerState(serverId) {
            if (checkIsWeiduan()) {
                rsdkclientplugin.checkServerState(serverId);
            }
            else {
                App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
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
            return PlatMgr.kkk_age > 0;
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
                    SoundMgr.isInBackground = false;
                    SoundMgr.resumeBg();
                }
                else {
                    SoundMgr.isInBackground = true;
                    SoundMgr.pauseBg();
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
            if (App.DeviceUtil.IsHtml5()) {
                try {
                    var version = Number(rsdkclientplugin.getVersion());
                    var channelId = PlatMgr.getChannelId();
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
                            // ViewController.getInstance().openView(ViewConst.WEIDUANUPGRADEPOPUPVIEW,data.gameurl);
                        }
                    }, function () {
                        NetLoading.hide();
                    }, PlatMgr);
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
    })(client = PlatMgr.client || (PlatMgr.client = {}));
    function getApkUrl(versionCode, callback) {
        NetManager.http.get("", {}, function (data) {
        }, function () { }, PlatMgr.client);
        return '';
    }
    // 是否是港台web
    function checkIsTwWeb() {
        return PlatMgr.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatMgr.getAppid() == "17004003");
    }
    PlatMgr.checkIsTwWeb = checkIsTwWeb;
    function checkIsShenHeYiWan() {
        var bigappid_arr = [17013000];
        var appid_arr = [17001263, 17014002, 17001274];
        var bigAppid = Number(PlatMgr.getBigAppid());
        var isBigApp = bigappid_arr.indexOf(bigAppid) > -1;
        var appId = Number(PlatMgr.getAppid());
        var isApp = appid_arr.indexOf(appId) > -1;
        // return true;
        return (PlatMgr.checkIsIOSShenheSp() && (isApp || isBigApp));
    }
    PlatMgr.checkIsShenHeYiWan = checkIsShenHeYiWan;
    function checkHideSwitchAccountBtn() {
        /**这个条件是如果1000服地址并且不使用sdk会显示切换账号按钮 */
        if (PlatMgr.checkIsTest() && PlatMgr.checkIsUseSDK() == false) {
            return false;
        }
        if (PlatMgr.checkIsPlatSp()) {
            return false;
        }
        if (PlatMgr.checkIsLocal() && PlatMgr.checkIsUseSDK() == false) {
            return false;
        }
        return false;
    }
    PlatMgr.checkHideSwitchAccountBtn = checkHideSwitchAccountBtn;
    /** 是否有特殊关闭按钮（关闭按钮在左边，其实就是指的微信小游戏和qq玩一玩 */
    function hasSpcialCloseBtn() {
        // return App.DeviceUtil.isWXgame() || App.DeviceUtil.isQQGame();
        return false;
    }
    PlatMgr.hasSpcialCloseBtn = hasSpcialCloseBtn;
    function getLocalMultiLanguage() {
        if (PlatMgr.checkIsLocal()) {
            var tmpcnName = App.CommonUtil.getOption("language");
            if (tmpcnName && RES.hasRes(tmpcnName)) {
                return tmpcnName;
            }
        }
        return null;
    }
    PlatMgr.getLocalMultiLanguage = getLocalMultiLanguage;
    /**
     * 是否是腾讯视频渠道
     */
    function checkIsWanbaFromWx() {
        if (PlatMgr.checkIsWanbaSp() && PlatMgr.checkIsUseSDK()) {
            if (window['OPEN_DATA'] && window['OPEN_DATA'].pf.indexOf("weixin.99") > -1) {
                return true;
            }
        }
        return false;
    }
    PlatMgr.checkIsWanbaFromWx = checkIsWanbaFromWx;
    function checkIsHeYue() {
        if (PlatMgr.checkIsUseSDK()) {
            return false;
        }
    }
    PlatMgr.checkIsHeYue = checkIsHeYue;
    function getWXMoreGameIcon(callback, callbackThisObj) {
        console.log("QAZ getWXMoreGameIcon callsdk ");
        RSDKHelper.getMoreGameIcon(callback.bind(callbackThisObj));
    }
    PlatMgr.getWXMoreGameIcon = getWXMoreGameIcon;
    function showWXMoreGame() {
        console.log("QAZ showMoreGame callsdk ");
        RSDKHelper.showMoreGame();
    }
    PlatMgr.showWXMoreGame = showWXMoreGame;
    function isShowWXLoading() {
        if (App.DeviceUtil.isWXgame()) {
            return true;
        }
        return false;
    }
    PlatMgr.isShowWXLoading = isShowWXLoading;
    /**
     * 联系客服
     */
    function getContackService() {
        var serviceType = PlatMgr.getCustomerServiceType();
        console.log("QAZ fkcw getCustomerServiceType " + serviceType);
        if (serviceType == 0) {
            // ViewController.getInstance().openView(ViewConst.SETTINGCONTACTPOPUPVIEW, {type:0});
        }
        else if (serviceType == 1) {
            PlatMgr.client.openServiceCenter();
        }
        else {
            RSDKHelper.getCustomerService(function (data) {
                console.log("QAZ fkcw getCustomerService 结果" + data);
                // if(data) 
                // {
                // 	ViewController.getInstance().openView(ViewConst.SETTINGCONTACTPOPUPVIEW, {type:2,info:data});
                // } 
            });
        }
    }
    PlatMgr.getContackService = getContackService;
    function checkIsFromMicroEnd() {
        if (RSDKHelper.isInit) {
            return qqwanbaplugin.checkIsFromMicroEnd();
        }
        return false;
    }
    PlatMgr.checkIsFromMicroEnd = checkIsFromMicroEnd;
    /**
     * 是否是泰国的华为渠道
     */
    function checkIsThHw() {
        return PlatMgr.getAppid() == "17027004" && PlatMgr.checkIsThSp();
    }
    PlatMgr.checkIsThHw = checkIsThHw;
    /**
     * 是否是英文的华为渠道
     */
    function checkIsEnHw() {
        return PlatMgr.getAppid() == "1003005005" && PlatMgr.checkIsEnSp();
    }
    PlatMgr.checkIsEnHw = checkIsEnHw;
    /**
     * 是否是开启了货币国际化的渠道
     */
    function checkisLocalPrice() {
        return Boolean((GameData.platMoneyData || GameData.platMoneyData2) && (checkIsThHw() ||
            checkIsEnSp() ||
            checkIsRuSp() ||
            checkIsTWBSp()));
    }
    PlatMgr.checkisLocalPrice = checkisLocalPrice;
    /**
     * 检测是否显示返回大厅(App)按钮
     */
    function checkShowBackApp() {
        if (PlatMgr.getAppid() == "17021003") {
            return false;
        }
        return PlatMgr.getAppid() == "17018010" &&
            PlatMgr.checkIsUseSDK() == true;
    }
    PlatMgr.checkShowBackApp = checkShowBackApp;
    /**
     * 检测是否需要检测补单处理
     */
    function checkNeedCheckPurchase() {
        if (PlatMgr.checkIsUseSDK() && PlatMgr.checkIsWeiduan() == true && App.DeviceUtil.isAndroid() && checkIsHeYue()) {
            return true;
        }
        return false;
    }
    PlatMgr.checkNeedCheckPurchase = checkNeedCheckPurchase;
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
        if (App.DeviceUtil.isIOS() && PlatMgr.checkIsWeiduan()) {
            if (RSDKHelper.isInit) {
                RSDKHelper.openAppStoreScore();
            }
        }
    }
    PlatMgr.openAppStoreScore = openAppStoreScore;
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
    PlatMgr.hasBindFunc = hasBindFunc;
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
            if (PlatMgr.checkIsLocal()) {
                callback(0);
            }
        }
    }
    PlatMgr.checkBindStatus = checkBindStatus;
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
            if (PlatMgr.checkIsLocal()) {
                callback(1);
            }
        }
        return result;
    }
    PlatMgr.callBind = callBind;
    /**
     * 获取手机验证码
     * @param mobile
     * @param callback
     * @param callbackThisObj
     */
    function sendMobileCode(mobile, callback, callbackThisObj) {
        RSDKHelper.sendMobileCode(mobile, callback, callbackThisObj);
    }
    PlatMgr.sendMobileCode = sendMobileCode;
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
    PlatMgr.checkMobileCode = checkMobileCode;
    function setAppOnBackHandler() {
        if (RSDKHelper.isInit) {
            RSDKHelper.setAppOnBackHandler(function () {
                // if(ViewController.getInstance().hideTopView()==false)
                // {
                RSDKHelper.goAppExit();
                // }
            }, PlatMgr);
        }
    }
    PlatMgr.setAppOnBackHandler = setAppOnBackHandler;
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
    PlatMgr.getTransTargetLang = getTransTargetLang;
    /**
     * 获取游戏使用的语言
     */
    function getGameArea() {
        if (!GameData.curBigType) {
            GameData.curBigType = App.CommonUtil.getOption("gameArea");
        }
        return GameData.curBigType || "";
    }
    PlatMgr.getGameArea = getGameArea;
    /**
     * 获取游戏使用的语言
     */
    function getGameLanguage() {
        return App.CommonUtil.getOption("gameLanguage") || "";
    }
    PlatMgr.getGameLanguage = getGameLanguage;
    function getGameCountryCode() {
        return App.CommonUtil.getOption("contryCode") || "";
    }
    PlatMgr.getGameCountryCode = getGameCountryCode;
    /**
     * 是否是新的分区包
     */
    function checkIsAreaPkg() {
        return Boolean(getGameLanguage()) && Boolean(getGameArea());
    }
    PlatMgr.checkIsAreaPkg = checkIsAreaPkg;
    function switchAreaOrLanguage(area, language) {
        if (RSDKHelper.isInit) {
            RSDKHelper.switchAreaOrLanguage(area, language);
        }
    }
    PlatMgr.switchAreaOrLanguage = switchAreaOrLanguage;
    function checkIsViSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_vi") > -1 || pathname.indexOf("_testvi") > -1 || App.CommonUtil.getOption("language") == "vi";
            // return search.indexOf("_vi")>-1||search.indexOf("_testvi")>-1 || search.indexOf("=vi")>-1||
            // 	pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1 || pathname.indexOf("=vi")>-1;
        }
        return false;
    }
    PlatMgr.checkIsViSp = checkIsViSp;
    function analyticsByHyKey(key) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsByHyKey(key);
        }
    }
    PlatMgr.analyticsByHyKey = analyticsByHyKey;
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
    PlatMgr.loadUrl = loadUrl;
    /**退出应用，支持微信小游戏，微端，原生 */
    function forceAppExit() {
        if (RSDKHelper.isInit) {
            RSDKHelper.forceAppExit();
        }
    }
    PlatMgr.forceAppExit = forceAppExit;
})(PlatMgr || (PlatMgr = {}));
//# sourceMappingURL=PlatMgr.js.map