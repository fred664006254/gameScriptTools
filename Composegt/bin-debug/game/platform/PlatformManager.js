var PlatformManager;
(function (PlatformManager) {
    PlatformManager.isLogin = false;
    PlatformManager.kkk_age = 0;
    PlatformManager.ios_pay = false;
    PlatformManager.fk_realname = false;
    PlatformManager.fk_antiaddicted = false; //true代表不需要防沉迷
    PlatformManager.fk_vipds = false; //true代表显示vip大使
    PlatformManager.fk_cdk = false; //fk_显示cdk
    PlatformManager.fk_wife = false; //fk_显示脱衣
    PlatformManager.isShowCircle = false;
    // export let fromShareId:string;
    PlatformManager.isFromWxmypro = false;
    PlatformManager.isFromWxIcon = false; //从微信悬浮窗进入
    PlatformManager.isFromWxCard = false; //微信群聊进入
    PlatformManager.fromWxCardExt = null; //微信群聊ext
    function getAppVersion() {
        try {
            if (PlatformManager.checkIsWxmgSp()) {
                return "modifybywxgamescript_svnversion";
            }
            else if (PlatformManager.checkIsBaiduSp()) {
                return "modifybywxgamescript_svnversion";
            }
            else if (PlatformManager.checkIsQQXYXSp()) {
                return "modifybywxgamescript_svnversion";
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
    function getAppid() {
        try {
            if (RSDK && RSDK.getAppid && RSDKHelper.isInit) {
                var appId = RSDK.getAppid();
                if (RSDK.getAppid() == "1003011001" && App.DeviceUtil.isIOS()) {
                    appId = "1003011002";
                }
                return appId;
            }
        }
        catch (e) {
            try {
                if (SDK && SDK.CommonUtil && SDK.CommonUtil.appId) {
                    return SDK.CommonUtil.appId;
                }
            }
            catch (e) {
                return "";
            }
        }
    }
    PlatformManager.getAppid = getAppid;
    function getBigAppid() {
        if (App.DeviceUtil.isWyw()) {
            return "0";
        }
        if (GameData.isLocal()) {
            return "0";
        }
        var bigAppid = App.CommonUtil.getOption("r_bid");
        if (!bigAppid) {
            var appid = Number(getAppid());
            bigAppid = String(Math.floor(appid / 1000) * 1000);
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
    function getSpid() {
        var isClientRes = false;
        var spid;
        if (App.DeviceUtil.isWXgame() && checkIsWxAppSp()) {
            spid = "wxapp";
        }
        else if (App.DeviceUtil.isBaidugame()) {
            spid = "baidu";
        }
        else if (checkIsQQXYXSp()) {
            spid = "wanba";
        }
        else if (App.DeviceUtil.isWyw()) {
            spid = "wyw";
        }
        else if (checkIs37WdSp()) {
            spid = "37wd";
        }
        else if (checkIsLocal()) {
            spid = "local";
        }
        else if (checkIsIOSShenheSp()) {
            spid = "iosshenhe";
            if (checkIsTWBSp()) {
                spid = "tw";
            }
            else if (checkIsViSp()) {
                spid = "vi";
            }
            else if (checkIsKRNEWIOSShenheSp()) {
                spid = "krnewiosshenhe";
            }
        }
        else if (checkIsWanbaSp()) {
            spid = "wanba";
        }
        else if (checkIs3KSp()) {
            spid = "3k";
        }
        else if (checkIsYYBSp()) {
            spid = "yyb";
        }
        else if (checkIsTWBSp()) {
            spid = "tw";
        }
        else if (checkIsFkylcSp()) {
            spid = "fkylc";
        }
        else if (checkIsXlySp()) {
            spid = "xly";
        }
        else if (checkIsXzySp()) {
            spid = "xzy";
        }
        else if (checkIsZjlxSp()) {
            spid = "zjlx";
        }
        else if (checkIsEwanSp()) {
            spid = "ewan";
        }
        else if (checkIs49ySp()) {
            spid = "49y";
        }
        else if (checkIsSfSp()) {
            spid = "sf";
        }
        else if (checkIsKRSp()) {
            spid = "kr";
        }
        else if (checkIsKRNewSp()) {
            spid = "krnew";
        }
        else if (checkIsFkcwSp()) {
            spid = "fkcw";
        }
        else if (checkIsEnSp()) {
            spid = "en";
        }
        else if (checkIs9130Sp()) {
            spid = "9130";
        }
        else if (checkIsCpsSp()) {
            spid = "cps";
        }
        else if (checkIsTestSp()) {
            spid = "test";
        }
        else if (checkIsJPSp()) {
            spid = "jp";
        }
        else if (checkIsWxAppSp()) {
            spid = "wxapp";
        }
        else if (checkIsWxSp()) {
            spid = "wx";
        }
        else if (checkIsWxmgSp()) {
            spid = "wxmg";
        }
        else if (checkIsViSp()) {
            spid = "vi";
        }
        else if (checkIsMwSp()) {
            spid = "mw";
        }
        else if (checkIsH5lySp()) {
            spid = "h5ly";
        }
        else if (checkIsHwSp()) {
            spid = "hw";
        }
        else if (checkIsWdlySp()) {
            spid = "wdly";
        }
        else if (checkIsJxh5Sp()) {
            spid = "jxh5";
        }
        else if (checkIsWdSp()) {
            spid = "wd";
        }
        else if (checkIsNewWdSp()) {
            spid = "newwd";
        }
        else {
            if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
                var pathname = window.location.pathname;
                if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
                    var pathname_1 = window.location.pathname;
                    if (pathname_1.indexOf("gt_") && pathname_1.indexOf("/") > -1) {
                        var str = getPathRuleName();
                        if (isClientRes) {
                            spid = ServerCfg.getClientResKeyByPath(str);
                        }
                        else {
                            spid = ServerCfg.getHostIdByPath(str);
                        }
                    }
                    else {
                        spid = "wd";
                    }
                }
                else {
                    spid = "wd";
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
        return spid;
    }
    PlatformManager.getSpid = getSpid;
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
        if (PlatformManager.checkIsDisableSDK()) {
            return false;
        }
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
            return false;
        }
        if (App.CommonUtil.getOption("r_plat")) {
            return true;
        }
        if (PlatformCfg.useSDK[getBigAppid()] || PlatformCfg.useSDK[getAppid()]) {
            return true;
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
        else if (PlatformManager.checkIsIOSShenheSp()) {
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
    function checkIsIOSShenheSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("iosshenhe") > -1 || pathname.indexOf("shenhe") > -1;
        }
        return false;
    }
    PlatformManager.checkIsIOSShenheSp = checkIsIOSShenheSp;
    function checkIsKRNEWIOSShenheSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("kr-shenhe.") > -1 || pathname.indexOf("kr-shenhe.") > -1;
        }
        return false;
    }
    PlatformManager.checkIsKRNEWIOSShenheSp = checkIsKRNEWIOSShenheSp;
    function checkIsFkylcSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("fkylc") > -1;
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
    //判断是否是QQ会员
    function checkIsQQVip() {
        // if(PlatformManager.getAppid() == "1003012008"){
        // 	return true;
        // }
        // return false;
        if (PlatformManager.app == "QQVip") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsQQVip = checkIsQQVip;
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
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("xly") > -1;
        }
        return false;
    }
    PlatformManager.checkIsXlySp = checkIsXlySp;
    function checkIsXzySp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("xzy") > -1;
        }
        return false;
    }
    PlatformManager.checkIsXzySp = checkIsXzySp;
    function checkIsZjlxSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("zjly") > -1;
        }
        return false;
    }
    PlatformManager.checkIsZjlxSp = checkIsZjlxSp;
    function checkIsEwanSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("ewan") > -1;
        }
        return false;
    }
    PlatformManager.checkIsEwanSp = checkIsEwanSp;
    function checkIs49ySp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("49y") > -1;
        }
        return false;
    }
    PlatformManager.checkIs49ySp = checkIs49ySp;
    function checkIsSfSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_sf") > -1 || pathname.indexOf("_testsf") > -1;
        }
        return false;
    }
    PlatformManager.checkIsSfSp = checkIsSfSp;
    function checkIsFkcwSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_fkcw") > -1 || pathname.indexOf("_testfkcw") > -1;
        }
        return false;
    }
    PlatformManager.checkIsFkcwSp = checkIsFkcwSp;
    //检测文字显示是水平显示
    function checkIsTextHorizontal() {
        //检测是否是英文
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            return PlatformManager.checkIsViSp();
        }
        return false;
    }
    PlatformManager.checkIsTextHorizontal = checkIsTextHorizontal;
    function checkIsEnSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_en") > -1 || pathname.indexOf("_testen") > -1;
        }
        return false;
    }
    PlatformManager.checkIsEnSp = checkIsEnSp;
    function checkIs9130Sp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_9130") > -1 || pathname.indexOf("_test9130") > -1;
        }
        return false;
    }
    PlatformManager.checkIs9130Sp = checkIs9130Sp;
    function checkIsCpsSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_cps") > -1 || pathname.indexOf("_testcps") > -1;
        }
        return false;
    }
    PlatformManager.checkIsCpsSp = checkIsCpsSp;
    function checkIsMwSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_mw") > -1 || pathname.indexOf("_testmw") > -1;
        }
        return false;
    }
    PlatformManager.checkIsMwSp = checkIsMwSp;
    function checkIsH5lySp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_h5ly") > -1 || pathname.indexOf("_testh5ly") > -1;
        }
        return false;
    }
    PlatformManager.checkIsH5lySp = checkIsH5lySp;
    function checkIsWdSp() {
        if (PlatformManager.checkIsWdlySp()) {
            return false;
        }
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_wd") > -1 || pathname.indexOf("_testwd") > -1;
        }
        return false;
    }
    PlatformManager.checkIsWdSp = checkIsWdSp;
    function checkIsNewWdSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_newwd") > -1 || pathname.indexOf("_testnewwd") > -1;
        }
        return false;
    }
    PlatformManager.checkIsNewWdSp = checkIsNewWdSp;
    function checkIsNewHopeSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_newhope") > -1 || pathname.indexOf("_testnewhope") > -1;
        }
        return false;
    }
    PlatformManager.checkIsNewHopeSp = checkIsNewHopeSp;
    function checkIsHwSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_hw") > -1 || pathname.indexOf("_testhw") > -1;
        }
        return false;
    }
    PlatformManager.checkIsHwSp = checkIsHwSp;
    function checkIsWdlySp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_wdly") > -1 || pathname.indexOf("_testwdly") > -1;
        }
        return false;
    }
    PlatformManager.checkIsWdlySp = checkIsWdlySp;
    function checkIsMmSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_mm") > -1 || pathname.indexOf("_testmm") > -1;
        }
        return false;
    }
    PlatformManager.checkIsMmSp = checkIsMmSp;
    function checkIsJxh5Sp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_jxh5") > -1 || pathname.indexOf("_testjxh5") > -1;
        }
        return false;
    }
    PlatformManager.checkIsJxh5Sp = checkIsJxh5Sp;
    function checkIsWxAppSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_wxapp") > -1 || pathname.indexOf("_testwxapp") > -1;
        }
        else if (App.DeviceUtil.isWXgame()) {
            return window["WXAPP_ISWXAPP"] === true;
        }
        return false;
    }
    PlatformManager.checkIsWxAppSp = checkIsWxAppSp;
    function checkIs37WdSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_37wd") > -1 || pathname.indexOf("_test37wd") > -1;
        }
        return false;
    }
    PlatformManager.checkIs37WdSp = checkIs37WdSp;
    //37买量审核服
    function checkIs37WdShenheSp() {
        if (PlatformManager.checkIsIOSShenheSp() && PlatformManager.getAppid() == "1003017000") {
            return true;
        }
        return false;
    }
    PlatformManager.checkIs37WdShenheSp = checkIs37WdShenheSp;
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
        if (PlatformManager.getAppid() == "1003002001") {
            return false;
        }
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_test") > -1;
        }
        return false;
    }
    PlatformManager.checkIsTest = checkIsTest;
    function checkUseRSDKSocket() {
        var useRSDKSocket = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
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
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
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
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_tw") > -1 || pathname.indexOf("_testtw") > -1 || App.CommonUtil.getOption("language") == "tw";
        }
        return false;
    }
    PlatformManager.checkIsTWBSp = checkIsTWBSp;
    function checkIsKRSp() {
        if (PlatformManager.checkIsKRNewSp()) {
            return false;
        }
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_kr") > -1 || pathname.indexOf("_testkr") > -1 || App.CommonUtil.getOption("language") == "kr";
        }
        return false;
    }
    PlatformManager.checkIsKRSp = checkIsKRSp;
    function checkIsKRNewSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_krnew") > -1 || pathname.indexOf("_testkrnew") > -1 || App.CommonUtil.getOption("language") == "krnew";
        }
        return false;
    }
    PlatformManager.checkIsKRNewSp = checkIsKRNewSp;
    function checkIsJPSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_jp") > -1 || pathname.indexOf("_testjp") > -1 || App.CommonUtil.getOption("language") == "jp";
        }
        return false;
    }
    PlatformManager.checkIsJPSp = checkIsJPSp;
    function checkIsViSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_vi") > -1 || pathname.indexOf("_testvi") > -1 || App.CommonUtil.getOption("language") == "vi";
            // return search.indexOf("_vi")>-1||search.indexOf("_testvi")>-1 || search.indexOf("=vi")>-1||
            // 	pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1 || pathname.indexOf("=vi")>-1;
        }
        return false;
    }
    PlatformManager.checkIsViSp = checkIsViSp;
    // export function checkIsKrSp():boolean
    // {
    // 	if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
    // 	{
    // 		let pathname:string=window.location.pathname;
    // 		return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
    // 	}
    // 	return false;
    // }
    //港台官网包
    function checkIsTWMCSp() {
        if (PlatformManager.getAppid() == "17004004") {
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
            var host = window.location.host;
            return host.indexOf("compose-test") > -1;
        }
        return false;
    }
    PlatformManager.checkIsTestSp = checkIsTestSp;
    function checkIsWanbaSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            var host = window.location.host;
            var search = window.location.search;
            return pathname.indexOf("wanba") > -1 || host.indexOf("urlshare") > -1 || host.indexOf("qzone") > -1 || search.indexOf("=wanba") > -1;
        }
        return false;
    }
    PlatformManager.checkIsWanbaSp = checkIsWanbaSp;
    //qq小游戏
    function checkIsQQXYXSp() {
        return window["QQ_ISQQ"] === true;
        // if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
        // {
        // 	let pathname:string=window.location.pathname;
        // 	return pathname.indexOf("_wanba")>-1||pathname.indexOf("_testwanba")>-1;
        // }
        // return false;
    }
    PlatformManager.checkIsQQXYXSp = checkIsQQXYXSp;
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
            return window.location.pathname.indexOf("3k") > -1;
        }
        return false;
    }
    PlatformManager.checkIs3KSp = checkIs3KSp;
    function checkIs3KSubSp() {
        return getAppid() == "17001001" || getAppid() == "17001186" || getAppid() == "17001187" || getAppid() == "17001185" || getSpName() == "h5ios3kwan" || getSpName() == "h5iosshiyiwan" || getSpName() == "h5iosyinhu";
    }
    PlatformManager.checkIs3KSubSp = checkIs3KSubSp;
    function checkIsLocal() {
        return GameData.isLocal();
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
     * 获取玩吧渠道环境，QZ是QQ空间，SQ是结合版
     */
    function getWanbaQua() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            if (checkIsWanbaSp() && checkIsUseSDK()) {
                var data = window["OPEN_DATA"];
                var platform = data.platform;
                var app_1 = data.qua.app;
                return app_1;
            }
        }
        return "";
    }
    function getIsWanbaSQ() {
        return getWanbaQua() == "SQ";
        // return checkIsUseSDK();
    }
    PlatformManager.getIsWanbaSQ = getIsWanbaSQ;
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
        //微信H5不要分享
        // if(PlatformManager.checkIsWxH5Sp())
        // {
        // 	return false;
        // }
        console.log("QAZ fkcw checkShare" + PlatformManager.checkShare());
        return PlatformManager.checkShare() == 1 || PlatformManager.checkShare() == 2 || PlatformManager.checkShare() == 3 || PlatformManager.checkIsLocal();
        // return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
    }
    PlatformManager.isSupportShare = isSupportShare;
    function isSupportAttention() {
        // if(PlatformManager.checkIsWxH5Sp())
        // {
        // 	return false;
        // }
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
            // qqwanbaplugin.shortcut({title:"皇上快点"},callback.bind(callbackThisObj));
            PlatformManager.requestDesktop({ title: "皇上快点", desc: "" }, callback, callbackThisObj);
        }
        // callback.apply(callbackThisObj);
    }
    PlatformManager.sendToDesktop = sendToDesktop;
    function sendCandy(num, callback, callbackThisObj) {
        //signin
        qqwanbaplugin.sendCandy("signin", num, callback.bind(callbackThisObj));
    }
    PlatformManager.sendCandy = sendCandy;
    function share(shareType, callback, callbackThisObj) {
        // if(1==1){
        // 	callback.apply(callbackThisObj);
        // 	return;
        var _this = this;
        // }
        if (RSDKHelper.isInit) {
            var shareContent = { shareType: shareType };
            RSDKHelper.guideShare(shareContent, function (code, data) {
                //微信分享假失败
                console.log("分享code:" + code);
                if ((PlatformManager.checkIsWxmgSp() || PlatformManager.checkIsQQXYXSp()) && Api.switchVoApi.checkOpenWxShareFail()) {
                    var otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
                    if (otherinfo.firstshare != 1) {
                        //值发生改变
                        NetManager.request(NetRequestConst.REQUST_OTHERINFO_CHANGSHARE, { scene: "firstshare", changshare: 1 });
                        code = "1";
                    }
                    var ranIndex = App.MathUtil.getRandom(1, 5);
                    if (Number(code) == 0 && ranIndex == 1) {
                        code = "1";
                    }
                }
                if (Number(code) == 0) {
                    if (callback) {
                        callback.apply(callbackThisObj, [data]);
                    }
                }
                else {
                    //分享失败
                    egret.setTimeout(function () {
                        App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
                    }, _this, 500);
                }
            });
            // RSDKHelper.share((code:string,data:any)=>{
            // 	if(Number(code)==0)
            // 	{
            // 		if(callback)
            // 		{
            // 			callback.apply(callbackThisObj,[data]);
            // 		}
            // 	}
            // });
        }
        //废除的分享功能
        // if (checkIsTWBSp() == true) {
        // 	RSDKHelper.fbShare((code:string,data:any)=>{
        // 		if(Number(code)==16)
        // 		{
        // 			if(callback)
        // 			{
        // 				callback.apply(callbackThisObj);
        // 			}
        // 		}
        // 		else {
        // 			console.log("分享失败 "+code);
        // 		}
        // 	});
        // }
        // else if (checkIsKRSp() == true) {
        // 	RSDKHelper.krShare((code:string,data:any)=>{
        // 		if(Number(code)==16)
        // 		{
        // 			if(callback)
        // 			{
        // 				callback.apply(callbackThisObj);
        // 			}
        // 		}
        // 		else {
        // 			console.log("分享失败 "+code);
        // 		}
        // 	});
        // }
        // else {
        // 	RSDKHelper.share((code:string,data:any)=>{
        // 		// if(PlatformManager.checkIsWxSp()&&!data.groupId)
        // 		// {
        // 		// 	console.log("没有分享到群里 "+data);
        // 		// 	return;
        // 		// }
        // 		if(Number(code)==0)
        // 		{
        // 			if(callback)
        // 			{
        // 				callback.apply(callbackThisObj,[data]);
        // 			}
        // 		}
        // 	});
        // }
        // }
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
        if (RSDKHelper.isInit) {
            RSDKHelper.logout();
            if (PlatformManager.checkIsKRSp()) {
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
    function pay(productId) {
        if (Api.switchVoApi.checkClosePay() || PlatformManager.checkHideIconByIP()) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("closePaySysTip"));
            return;
        }
        if (PlatformManager.checkIsBaiduSp() && App.DeviceUtil.isIOS()) {
            App.CommonUtil.showTip("ios暂未开放支付，请前往安卓客户端支付");
            return;
        }
        if (!PlatformManager.checkIsWxH5Sp() && Api.switchVoApi.checkOpenRealnamerewards() && Api.switchVoApi.checkOpenTrueRealName() && Api.otherInfoVoApi.getRealnameRewards() == null && GameData.pidflag == false && GameData.regionflag == true) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        // 微信实名认证判断
        if (!PlatformManager.checkIsWxH5Sp() && Api.switchVoApi.checkOpenCertification3() && (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp()) && !PlatformManager.fk_realname && !Api.otherInfoVoApi.hasRealname3Ok() && !Api.switchVoApi.checkWxRealname3LevelCanPay()) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAME3INPUTVIEW);
            return;
        }
        else if (PlatformManager.checkIsUseSDK()) {
            // if(PlatformManager.checkIsJPSp())
            // {
            // 	var device = App.DeviceUtil.isIOS()?"IOS":"Android";
            // 	NetManager.request(NetRequestConst.REQUST_STATS_CLICKPAYEVENT, { chargetype:productId,system:device});
            // }
            if (PlatformManager.isShowNewAnalytics()) {
                PlatformManager.analyticsClickPayment();
            }
            if (RSDKHelper.isInit) {
                RSDKHelper.pay(productId);
            }
        }
        else {
            if (GameData.isLocal()) {
                testPay(productId);
            }
        }
    }
    PlatformManager.pay = pay;
    function checkIsIdnSp() {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            return pathname.indexOf("_idn") > -1 || pathname.indexOf("_testidn") > -1;
        }
        return false;
    }
    PlatformManager.checkIsIdnSp = checkIsIdnSp;
    function testPay(productId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (GameData.isLocal() || GameData.isTest()) {
            var order_id = String(new Date().getTime() + Math.random() * 99999999);
            NetManager.request(NetRequestConst.PAY_PROCESSPAYMENT, { order_id: order_id, gold_num: itemCfg.gemCost, platform: "h5", name: itemCfg.id });
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
    }
    PlatformManager.analyticsNewGuide = analyticsNewGuide;
    function analyticsPay(id, orderId, paymentData) {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsPay(id, orderId, paymentData);
        }
    }
    PlatformManager.analyticsPay = analyticsPay;
    function analyticsLevelup() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsLevelup();
        }
    }
    PlatformManager.analyticsLevelup = analyticsLevelup;
    function analyticsRegister() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsRegister();
        }
    }
    PlatformManager.analyticsRegister = analyticsRegister;
    function analyticsSelectServer() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsSelectServer();
        }
    }
    PlatformManager.analyticsSelectServer = analyticsSelectServer;
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
    function analyticsFirstChapter() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsFirstChapter();
        }
    }
    PlatformManager.analyticsFirstChapter = analyticsFirstChapter;
    function analyticsUnlockCell() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsUnlockCell();
        }
    }
    PlatformManager.analyticsUnlockCell = analyticsUnlockCell;
    function analyticsNineGrade() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsNineGrade();
        }
    }
    PlatformManager.analyticsNineGrade = analyticsNineGrade;
    function analyticsEightGrade() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsEightGrade();
        }
    }
    PlatformManager.analyticsEightGrade = analyticsEightGrade;
    function analyticsUnlockSearch() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsUnlockSearch();
        }
    }
    PlatformManager.analyticsUnlockSearch = analyticsUnlockSearch;
    function analyticsReachEight() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsReachEight();
        }
    }
    PlatformManager.analyticsReachEight = analyticsReachEight;
    function analyticsFirstPayment() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsFirstPayment();
        }
    }
    PlatformManager.analyticsFirstPayment = analyticsFirstPayment;
    function analyticsClickPayment() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsClickPayment();
        }
    }
    PlatformManager.analyticsClickPayment = analyticsClickPayment;
    function analyticsMainUi() {
        if (RSDKHelper.isInit) {
            RSDKHelper.analyticsMainUi();
        }
    }
    PlatformManager.analyticsMainUi = analyticsMainUi;
    //是否显示新统计 越南 -8 ~ -15
    function isShowNewAnalytics() {
        if (PlatformManager.checkIsViSp()) {
            return true;
        }
        return false;
    }
    PlatformManager.isShowNewAnalytics = isShowNewAnalytics;
    function pushMsg(data) {
        if (getIsWanbaSQ() == true) {
            var msg = LanguageManager.getlocal("wanbaPushMsg" + data.type);
            qqwanbaplugin.sendMessage(data.frd, "1", msg, null);
        }
    }
    PlatformManager.pushMsg = pushMsg;
    function getGiftId() {
        var gid = null;
        if (checkIsWanbaSp() == true && checkIsUseSDK() && qqwanbaplugin) {
            gid = qqwanbaplugin.getGiftId();
        }
        // return "502";
        return gid;
    }
    PlatformManager.getGiftId = getGiftId;
    function giftExchange(callback, callbackThisObj) {
        var gid = null;
        if (checkIsWanbaSp() == true && checkIsUseSDK() && qqwanbaplugin) {
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
    function checkHasCircleFunc(callback) {
        if (RSDKHelper.isInit) {
            RSDKHelper.checkHasCircleFunc(callback);
        }
        else {
        }
    }
    PlatformManager.checkHasCircleFunc = checkHasCircleFunc;
    function showCircle() {
        if (RSDKHelper.isInit) {
            return RSDKHelper.showCircle();
        }
    }
    PlatformManager.showCircle = showCircle;
    function isFollowingTxAccount(callback) {
        if (RSDKHelper.isInit) {
            RSDKHelper.isFollowingTxAccount(callback);
        }
        else {
        }
    }
    PlatformManager.isFollowingTxAccount = isFollowingTxAccount;
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
        if (rsdkclientplugin) {
            rsdkclientplugin.openUserCenter();
        }
    }
    PlatformManager.openUserCenter = openUserCenter;
    function getMoneySign() {
        if (checkIsTWBSp()) {
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
        if (checkIsTWBSp() || checkIsKRSp() || checkIsJPSp() || checkIsViSp() || checkIsKRNewSp()) {
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
    function wxchatgiftKeFu(data) {
        // RSDK.customerService(data);
        RSDK.callSdk("showGiftCustomerService", data, null);
    }
    PlatformManager.wxchatgiftKeFu = wxchatgiftKeFu;
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
            RSDK.customerService();
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
                        phpurl = "http://192.168.8.83/gt_h5/getversion.php";
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
    })(client = PlatformManager.client || (PlatformManager.client = {}));
    // 是否是港台web
    function checkIsTwWeb() {
        return PlatformManager.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatformManager.getAppid() == "17004003");
    }
    PlatformManager.checkIsTwWeb = checkIsTwWeb;
    function checkDownloadApp() {
        try {
            if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd") {
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
        if (PlatformManager.checkIsDisableSDK()) {
            return false;
        }
        return (PlatformManager.checkIsMmSp() && !PlatformManager.checkIsTest() || PlatformManager.checkIsH5lySp() && !PlatformManager.checkIsTest() || PlatformManager.checkIs11WanSp() || (PlatformManager.checkIsJPSp() && PlatformManager.checkIsUseSDK()) ||
            PlatformManager.checkIs3kShenHaiSp() || App.DeviceUtil.isWXgame() ||
            (PlatformCfg.closeSwitchAcount[PlatformManager.getSpid()] && !PlatformManager.checkIsTest()) ||
            String(PlatformManager.getAppid()) == "1003007003") ||
            String(PlatformManager.getBigAppid()) == "17017000" ||
            (String(PlatformManager.getBigAppid()) == "17015000" && String(PlatformManager.getAppid()) != "17015009")
            || PlatformManager.checkIsBaiduSp() && !PlatformManager.checkIsTest() || PlatformManager.checkIsWdlySp() && !PlatformManager.checkIsTest()
            || PlatformManager.checkIsWxAppSp() && !PlatformManager.checkIsTest() && !PlatformManager.checkIsLocal()
            || PlatformManager.checkIsWxH5Sp() && !PlatformManager.checkIsTest() && !PlatformManager.checkIsLocal()
            || PlatformManager.checkIsJxh5Sp() && !PlatformManager.checkIsTest() && !PlatformManager.checkIsLocal()
            || PlatformManager.checkIsIOSShenheSp() || PlatformManager.checkIs37WdSp() && !PlatformManager.checkIsTest() && !PlatformManager.checkIsLocal();
    }
    PlatformManager.checkHideSwitchAccountBtn = checkHideSwitchAccountBtn;
    function checkIsXlSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            return (pathname.indexOf("_xl") > -1 || pathname.indexOf("_testxl") > -1) && checkIsXlySp() == false;
        }
        return false;
    }
    PlatformManager.checkIsXlSp = checkIsXlSp;
    function checkIsPlatSp() {
        if (App.DeviceUtil.IsHtml5() && App.TestUtil.getTestPlat() && (window.location.hostname.indexOf("gt-test") > -1 || PlatformManager.checkIsLocal())) {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsPlatSp = checkIsPlatSp;
    /** 是否有特殊关闭按钮（其实就是指的微信小游戏和qq玩一玩 */
    function hasSpcialCloseBtn() {
        return App.DeviceUtil.isWXgame() || (App.DeviceUtil.isWXgame() && PlatformManager.checkIsWxAppSp()) || App.DeviceUtil.isWyw() || PlatformManager.checkIsBaiduSp() || PlatformManager.checkIsQQXYXSp();
        // return true;
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
    function isShowWXLoading() {
        if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp() || PlatformManager.checkIsQQXYXSp() || PlatformManager.checkIsBaiduSp() || PlatformManager.checkIsJPSp()) {
            return true;
        }
        return false;
    }
    PlatformManager.isShowWXLoading = isShowWXLoading;
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
    function showWXMoreGame() {
        console.log("QAZ showMoreGame callsdk ");
        RSDKHelper.showMoreGame();
    }
    PlatformManager.showWXMoreGame = showWXMoreGame;
    //检查通用分享  只有微信需要
    function checkCommonShare() {
        return App.DeviceUtil.isWXgame();
    }
    PlatformManager.checkCommonShare = checkCommonShare;
    //魔力游闪屏
    function isShowPreLoading() {
        // if (App.DeviceUtil.isWXgame()) 
        // {
        // 	return true;
        // }
        return false;
    }
    PlatformManager.isShowPreLoading = isShowPreLoading;
    /** 是否是微信小游戏平台 */
    function checkIsWxSp() {
        if (PlatformManager.checkIsWxAppSp()) {
            return false;
        }
        if (PlatformManager.checkIsWxmgSp()) {
            return false;
        }
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            var search = window.location.search;
            return pathname.indexOf("_wx") > -1 || pathname.indexOf("_testwx") > -1 || search.indexOf("=wx") > -1;
        }
        else if (App.DeviceUtil.isWXgame()) {
            return window["WX_ISWX"] === true;
        }
        return false;
    }
    PlatformManager.checkIsWxSp = checkIsWxSp;
    /** 是否是wxmg平台 */
    function checkIsWxmgSp() {
        if (App.DeviceUtil.IsHtml5()) {
            var pathname = window.location.pathname;
            var search = window.location.search;
            return pathname.indexOf("_wxmg") > -1 || pathname.indexOf("_testwxmg") > -1 || search.indexOf("=wxmg") > -1;
        }
        else if (App.DeviceUtil.isWXgame()) {
            return window["WXMG_ISWXMG"] === true;
        }
        return false;
    }
    PlatformManager.checkIsWxmgSp = checkIsWxmgSp;
    /** 是否是微信小游戏H5平台 */
    function checkIsWxH5Sp() {
        if (PlatformManager.checkIsWxSp() && !App.DeviceUtil.isWXgame()) {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsWxH5Sp = checkIsWxH5Sp;
    /** 是否是百度小游戏平台 */
    function checkIsBaiduSp() {
        return App.DeviceUtil.isBaidugame();
    }
    PlatformManager.checkIsBaiduSp = checkIsBaiduSp;
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
    /** 越南第三方支付 */
    function openViWebpay() {
        console.log("QAZ payInThird callsdk ");
        RSDKHelper.payInThird();
        if (PlatformManager.isShowNewAnalytics()) {
            PlatformManager.analyticsClickPayment();
        }
    }
    PlatformManager.openViWebpay = openViWebpay;
    /** 是否是微信小游戏平台SDK */
    function checkIsDisableSDK() {
        return false;
    }
    PlatformManager.checkIsDisableSDK = checkIsDisableSDK;
    function checkHideIconByIP() {
        if (Api.switchVoApi.checkShenheClosePay()) {
            return true;
        }
        else if (App.DeviceUtil.isWXgame()) {
            if (PlatformManager.ios_pay != null && PlatformManager.ios_pay == false) {
                return true;
            }
        }
        return false;
    }
    PlatformManager.checkHideIconByIP = checkHideIconByIP;
    /**
     * 检查获得红颜，门课 是否采用按钮分享
     */
    function checkGetShare() {
        // return App.DeviceUtil.isWXgame() && PlatformManager.isSupportShare();
        // return PlatformManager.checkIsWxSp() && PlatformManager.isSupportShare();  //线上使用
        // return true;
        return false;
    }
    PlatformManager.checkGetShare = checkGetShare;
    /**
     * 微信防沉迷
     */
    function checkRest() {
        console.log("QAZ checkRest callsdk ");
        RSDKHelper.checkRest(function (msg) {
            console.log("QAZ checkRest Callback ");
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETREST, {});
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                // msg:LanguageManager.getlocal("versionCompareInfo"),
                msg: "大人，您今日的游戏时间已经很长了，根据防沉迷规则，您在今晚0点前将无法再登陆游戏，请下线休息，欢迎明天再来~",
                callback: function (dlg) {
                    // window.location.reload();
                    LoginManager.changeServer();
                },
                clickNotAutoHide: true,
                inLayer: LayerManager.maskLayer
            });
        });
    }
    PlatformManager.checkRest = checkRest;
    function checkIsThSp() {
        return false;
    }
    PlatformManager.checkIsThSp = checkIsThSp;
    /**
     * 是否使用微信配置
     */
    function checkIsWxCfg() {
        if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxAppSp() || PlatformManager.checkIsQQXYXSp() || PlatformManager.checkIsWanbaSp()) {
            return true;
        }
        return false;
    }
    PlatformManager.checkIsWxCfg = checkIsWxCfg;
    function checkIsEnLang() {
        return false;
    }
    PlatformManager.checkIsEnLang = checkIsEnLang;
    /**
     * 豪门特权可以订阅的平台
     */
    function checkSpCardShow() {
        // return true;
        return PlatformManager.getAppid() == "1003002001" || PlatformManager.getAppid() == "1003001003" || PlatformManager.getAppid() == "1003004002" || PlatformManager.getAppid() == "1003018001";
    }
    PlatformManager.checkSpCardShow = checkSpCardShow;
    /**
     * 检测是否显示返回大厅(App)按钮
     */
    function checkShowBackApp() {
        return PlatformManager.getAppid() == "1003007028";
    }
    PlatformManager.checkShowBackApp = checkShowBackApp;
    /**
     * 检测是否是微信公众号_H5_传盛
     */
    function checkIsWxH5Chuansheng() {
        return PlatformManager.getAppid() == "1014002002";
        // return true;
        // return PlatformManager.app == "WX";
    }
    PlatformManager.checkIsWxH5Chuansheng = checkIsWxH5Chuansheng;
    function feedbackButtonToggle(state) {
        if (!App.DeviceUtil.isWXgame()) {
            return;
        }
        if (RSDKHelper.isInit) {
            RSDKHelper.feedbackButtonToggle(state);
        }
    }
    PlatformManager.feedbackButtonToggle = feedbackButtonToggle;
    function createFeedbackButton() {
        if (!App.DeviceUtil.isWXgame()) {
            return;
        }
        if (RSDKHelper.isInit) {
            var data = {};
            data.image = "https://gt-fkwx.leishenhuyu.com/wxgameOtherPic/tousuIcon.png";
            data.width = 40,
                data.height = 40,
                data.left = 10,
                data.top = window.screen.availHeight / GameConfig.stage.stageHeight * (130 + GameData.layerPosY),
                RSDKHelper.createFeedbackButton(data);
        }
    }
    PlatformManager.createFeedbackButton = createFeedbackButton;
    /*
     37韩国统计
    */
    function analytics37Point(eventName, eventKey, eventValue) {
        if (!PlatformManager.checkIsKRNewSp()) {
            return;
        }
        if (RSDKHelper.isInit) {
            RSDKHelper.analytics37Point(eventName, eventKey, eventValue);
        }
    }
    PlatformManager.analytics37Point = analytics37Point;
    /*
     37日本统计
    */
    function analytics37JPPoint(eventName, eventKey, eventValue) {
        if (!PlatformManager.checkIsJPSp()) {
            return;
        }
        if (RSDKHelper.isInit) {
            RSDKHelper.analytics37Point(eventName, eventKey, eventValue);
        }
    }
    PlatformManager.analytics37JPPoint = analytics37JPPoint;
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
})(PlatformManager || (PlatformManager = {}));
