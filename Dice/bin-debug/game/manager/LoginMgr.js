/**
 * 游戏登陆管理
 * author dmj
 * date 2017/9/12
 * @namespace LoginMgr
 */
var LoginMgr;
(function (LoginMgr) {
    /**
     * 使用pid调用登录
     */
    LoginMgr.loginBySetPID = false;
    LoginMgr.isCreateScene = false;
    var isShowLoginLoading = false;
    // export let waitToCheckLoadGuide:boolean=false;
    LoginMgr.isLoginGameSuccess = false;
    /**
     * 是否是新用户，是对pid来说，所有服都没有账号的情况
     */
    LoginMgr.isNewUser = false;
    /**
     * 是否正在切换sdk账号，有效期：调用logout接口，到sdk登录成功，调用getcfg成功后结束
     */
    LoginMgr.inSDKAccountSwitching = false;
    var loginLogStr = '';
    /**设置登录log */
    function setLog(addStr) {
        if (addStr) {
            loginLogStr = loginLogStr + "\n" + addStr + ":" + egret.getTimer() + "ms";
        }
    }
    LoginMgr.setLog = setLog;
    function checkLoginLog() {
        loginLogStr && StatisticsHelper.reportOwnNameLog(loginLogStr, "loginLog");
    }
    LoginMgr.checkLoginLog = checkLoginLog;
    function showLog() {
        var logTxt = ComponentMgr.getTextField(loginLogStr, 16, NaN, false);
        logTxt.background = true;
        logTxt.backgroundColor = 0;
        logTxt.multiline = true;
        logTxt.addTouchTap(function (e) {
        }, LoginMgr, null);
        GameConfig.stage.addChild(logTxt);
    }
    LoginMgr.showLog = showLog;
    function showLoginLoading() {
        if (!isShowLoginLoading) {
            NetLoading.show();
            isShowLoginLoading = true;
        }
    }
    LoginMgr.showLoginLoading = showLoginLoading;
    function hideLoginLoading() {
        if (isShowLoginLoading) {
            NetLoading.hide();
            isShowLoginLoading = false;
        }
    }
    LoginMgr.hideLoginLoading = hideLoginLoading;
    function loginGame() {
        if (App.LoginResLoader.isLoginBaseResLoaded && PlatMgr.isLogin) {
            LoginMgr.inSDKAccountSwitching = false;
            showLoginLoading();
            startGetToken();
            App.LoginResLoader.loadGameBaseRes();
        }
    }
    LoginMgr.loginGame = loginGame;
    function getLocalUserName() {
        var localName = LocalStorageMgr.get(LocalStorageConst.LOCAL_USER_NAME);
        return PlatMgr.userId ? PlatMgr.userId : localName;
    }
    LoginMgr.getLocalUserName = getLocalUserName;
    function getUserPassword() {
        return GameData.tmpUserPassword;
    }
    LoginMgr.getUserPassword = getUserPassword;
    function startGetToken() {
        LoginMgr.setLog("start get token");
        //以下调用http获取uid和token
        var uname, upwd, gaccount;
        uname = PlatMgr.userId;
        upwd = GameData.tmpUserPassword;
        var urlStr = ServerCfg.baseUrl + ServerCfg.serverTokenUrl + "?pm=";
        var secretkey = "sljknBL0poj";
        var tmpTsStr = Date.now().toString();
        App.LogUtil.log(PlatMgr.userId, tmpTsStr, secretkey);
        var signStr = CryptoJS.MD5(PlatMgr.userId + tmpTsStr + secretkey).toString();
        var urlParm = "pid=" + uname + "&ts=" + tmpTsStr + "&sign=" + signStr;
        // if(GlobalData.isTest==true)
        // {
        //     urlParm = urlParm+"&local=1";
        // }
        var platform = GameData.getCurPlatName();
        var device = App.DeviceUtil.isIOS() ? "IOS" : "Android";
        var area = GameData.getCountry();
        if (gaccount != null && gaccount != "") {
            urlParm = urlParm + "&gaccount=" + gaccount;
        }
        if (PlatMgr.checkIsTest()) {
            urlParm = urlParm + "&test=" + PlatMgr.getSpid();
        }
        urlParm = urlParm + "&platform=" + platform + "&device=" + device + "&area=" + area + "&rayparms=1";
        // urlParm=  urlParm+"&platform="+platform+"&device="+device+"&area="+area+"&rayparms=1"+"&spid="+PlatformManager.getSpidStr(true);
        App.LogUtil.log("加密前 " + urlParm);
        urlParm = Base64.encode(urlParm);
        App.LogUtil.log("截取之前 " + urlParm);
        var qStr = urlParm.substr(0, 2);
        App.LogUtil.log("取到的qStr " + qStr);
        var hStr = urlParm.substr(2);
        App.LogUtil.log("截取后的hStr" + hStr);
        App.LogUtil.log("时间戳加密前 " + tmpTsStr);
        var timeStr = Base64.encode(tmpTsStr);
        App.LogUtil.log("时间戳加密后 " + timeStr);
        urlParm = qStr + timeStr.substr(0, 5) + hStr;
        App.LogUtil.log("组合之后", urlParm);
        App.LogUtil.log("组合的各个部分", qStr, timeStr.substr(0, 5), hStr);
        urlStr = urlStr + urlParm;
        App.LogUtil.log("getAccessToken:" + urlStr);
        // getAssessTokenFromHttp(urlStr, this.getTokenSuccess, this);
        // urlStr = ServerCfg.baseUrl+ServerCfg.serverTokenUrl+"?pid="+PlatMgr.userId;
        NetManager.http.post(urlStr, null, getTokenSuccessHandler, ioerrorHandler, null);
        // NetManager.http.post(urlStr,null,ioerrorHandler,getTokenSuccessHandler,null);
    }
    function loginFiailPopup(callback, callbackObj) {
        ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
            title: LangMger.getlocal("sysTip"),
            msg: LangMger.getlocal("loginFail"),
            callback: function (dlg) {
                if (callback) {
                    callback.call(callbackObj);
                }
            },
            closecallback: function () {
                if (callback) {
                    callback.call(callbackObj);
                }
            },
            handler: LoginMgr,
            inLayer: LayerMgr.panelLayer,
            notShowOpenAni: true
        });
    }
    function getTokenSuccessHandler(data) {
        var sData = NetManager.checkServerData(data);
        var ret = sData.ret;
        if (ret == false) {
            hideLoginLoading();
            loginFiailPopup(startGetToken, LoginMgr);
            // if(sData.data&&sData.data.ret==-131&&GameData.tmpUserPassword=="")
            // {
            //     startGetToken();
            // }
            // else
            // {
            //     let cnKey="requestFailCode"+sData.data.ret;
            //     App.CommonUtil.showTip(LangMger.getlocal(LangMger.checkHasKey(cnKey)?cnKey:"loginFail"));
            //     NetManager.socket.dispose();
            // }
            // todo弹错误面板
            // App.MessageCenter.dispatch(MessageConst.MESSAGE_SHOW_LOGIN_BTNS,{notice:true});
            return;
        }
        sData = sData.data;
        if (sData.access_token) {
            GameData.access_token = sData.access_token;
        }
        if (sData.server) {
            ServerCfg.selectServer.ip_server = sData.server.host;
            ServerCfg.selectServer.port_server = sData.server.port;
        }
        if (sData.shenhe) {
            GameData.isWxShenhe = true;
        }
        if (sData.logints) {
            GameData.logints = sData.logints;
            GameData.serverTimeMs = sData.logints * 1000;
            GameData.serverClientTimeDt = GameData.serverTimeMs - new Date().getTime();
            TickMgr.startTick();
        }
        if (sData.statisticsId) {
            GameData.statisticsId = sData.statisticsId;
        }
        GameData.uid = sData.uid;
        var isMaintain = false;
        if (sData.hasOwnProperty("gconfig") && sData.gconfig != null && sData.gconfig.hasOwnProperty("zoneid") && sData.gconfig.zoneid != null) {
            if (typeof sData.gconfig.zoneid == typeof {}) {
                var index = 0;
                var k;
                for (k in sData.gconfig.zoneid) {
                    index++;
                }
                if (index == 0) {
                    isMaintain = true;
                }
                else {
                    for (k in sData.gconfig.zoneid) {
                        if (sData.gconfig.zoneid[k] == ServerCfg.selectServer.zid) {
                            isMaintain = true;
                            break;
                        }
                    }
                }
            }
        }
        if (sData.client_ip != null) {
            GameData.client_ip = sData.client_ip;
        }
        if (sData.version) {
            if (!NetManager.checkCSVersion(sData.version)) {
                return;
            }
        }
        //以上调用http获取uid和token
        startConnectSocket();
    }
    function startConnectSocket() {
        if (NetManager.socket.isConnected()) {
        }
        else {
            // ServerCfg.selectServer.zid=Number(ServerCfg.selectServer.zid);
            // ServerCfg.baseUrl="//"+ServerCfg.selectServer.ip_server+"/gucenter/";
            App.LogUtil.log("loginmanager开始连接游戏socket");
            NetManager.socket.connect(ServerCfg.selectServer.ip_server, Number(ServerCfg.selectServer.port_server), function () {
                requestUseLogin();
            }, LoginMgr);
        }
    }
    function requestUseLogin() {
        if (GameConfig.isLoaded) {
            App.MsgHelper.addEvt(NetConst.USER_LOGIIN, userLoginRequestHandler, null);
            NetManager.request(NetConst.USER_LOGIIN, formatLoginData());
        }
    }
    function formatLoginData(retry) {
        var params = {};
        var plat = PlatMgr.getAppid();
        if (!plat) {
            plat = PlatMgr.getTestAppid() || "";
        }
        if (plat) {
            params.plat = plat;
        }
        params.enter = !retry;
        params.serverIp = ServerCfg.selectServer.ip_server;
        params.serverPort = String(ServerCfg.selectServer.port_server);
        params.client_ip = GameData.client_ip;
        if (App.DeviceUtil.IsHtml5()) {
            try {
                if (navigator.userAgent) {
                    params.deviceid = navigator.userAgent;
                }
            }
            catch (e) {
                console.log("navigator.userAgent error");
            }
        }
        return params;
    }
    function reLoginGame() {
        App.MsgHelper.addEvt(NetConst.USER_LOGIIN, reLoginGameSuccess, LoginMgr);
        NetManager.request(NetConst.USER_LOGIIN, formatLoginData(true));
    }
    LoginMgr.reLoginGame = reLoginGame;
    function reLoginGameSuccess(e) {
        // if(ViewController.getInstance().checkHasShowedView(false))
        // {
        //     ViewController.getInstance().openView(ViewConst.NETWARNPOPUPVIEW);
        // }
        NetLoading.hide();
        App.MsgHelper.removeEvt(NetConst.USER_LOGIIN, reLoginGameSuccess, LoginMgr);
        userLoginRequestHandler(e);
    }
    function userLoginRequestHandler(event) {
        //致劲老用户导入
        App.MsgHelper.removeEvt(NetConst.USER_LOGIIN, userLoginRequestHandler, null);
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret) {
            LoginMgr.isLoginGameSuccess = true;
            hideLoginLoading();
            // if(!Api.playerVoApi.getPlayerName())
            // {
            //     PlatformManager.analyticsRegister();
            // }
            if (data.data.newerFlag) {
                // 是个新号，统计注册
                PlatMgr.analyticsRegister();
            }
            PlatMgr.analyticsLogin();
            SoundMgr.stopBg();
            checkAndCreateScene();
            // App.LoginResLoader.loadHomeRes();
            if (App.DeviceUtil.isIOS()) {
                RSDKHelper.checkPushToken();
            }
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
            hideLoginLoading();
            // NetManager.socket.dispose();
            var msg = "";
            if (LangMger.checkHasKey("sysNetErrorCode" + String(data.ret))) {
                msg = LangMger.getlocal("sysNetErrorCode" + String(data.ret));
            }
            else {
                msg = LangMger.getlocal("loginFail") + LangMger.getlocal("failCode", [String(data.ret)]);
            }
            if (data.ret != ResponseEnums.socketError) {
                ViewController.getInstance().openView(ViewConst.ERRORPOPUPVIEW, { callback: requestUseLogin.bind(LoginMgr), msg: msg });
            }
        }
    }
    function ioerrorHandler(data) {
        // smallDialogManager.showTopSure(Global.getlocal("dialog_title_prompt"), Global.getlocal("netiswrong"), retry, Global);
        // function retry(): void
        // {
        //     Global.getAssessTokenFromHttp(url, callback, callbackObj, ioerrorCallback);
        // }
        LoginMgr.setLog("get token error");
        hideLoginLoading();
        // NetManager.socket.dispose();
        ViewController.getInstance().openView(ViewConst.ERRORPOPUPVIEW, { callback: startGetToken.bind(LoginMgr), msg: LangMger.getlocal("loginFail") });
        // startGetToken();
    }
    function checkAndCreateScene() {
        StatisticsHelper.reportLoadData("9_1");
        console.log("checkAndCreateScene" + App.LoginResLoader.isGameBaseResLoaded + LoginMgr.isLoginGameSuccess);
        if (App.LoginResLoader.isGameBaseResLoaded && LoginMgr.isLoginGameSuccess) {
            if (!LoginMgr.isCreateScene) {
                SceneController.getInstance().goReady();
                MainUI.getInstance().show();
            }
            LoginLoading.hide();
            LoginMgr.isCreateScene = true;
        }
    }
    LoginMgr.checkAndCreateScene = checkAndCreateScene;
    function setLoginByPID(pid) {
        // let loginView:LoginView=<LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
        // if(loginView)
        // {
        //     if(loginView["setLoginByPID"])
        //     {
        //         if(PlatformManager.checkIsUseSDK())
        //         {
        //             App.LoginResLoader.initPlatCfg();
        //             RSDKHelper.isInit=true;
        //             PlatformManager.isLogin=true;
        //         }
        //         LoginManager.loginBySetPID=true;
        //         loginView["setLoginByPID"](pid);
        //     }
        // }
    }
    LoginMgr.setLoginByPID = setLoginByPID;
    function changeServer() {
        // SceneController.getInstance().hideScene
        loginLogStr = "";
        App.LoginResLoader.dispose();
        Config.AcCfg.isGetAll = false;
        // waitToCheckLoadGuide=false;
        LoginMgr.isNewUser = false;
        LoginMgr.loginBySetPID = false;
        GameData.tmpUserPassword = "";
        App.CommonUtil.clear();
        // egret.Tween.removeAllTweens();
        SceneController.getInstance().dispose();
        MainUI.getInstance().hide();
        ViewController.getInstance().hideAllView();
        NetManager.socket.dispose();
        NetManager.http.dispose();
        TickMgr.stopTick();
        App.DragonBonesUtil.clear();
        Api.dispose();
        GameData.dispose();
        StatisticsHelper.clearReportData();
        LoginMgr.isLoginGameSuccess = false;
        NetLoading.hideForChangeAccount();
        // let loginView:LoginView=<LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
        // if(loginView)
        // {
        //     if(loginView.isInit())
        //     {
        //         // loadLoginViewRes();
        //     }
        //     else
        //     {
        //         if(!loginView.isShow())
        //         {
        //             ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
        //         }
        //     }
        // }
        // else
        // {
        //     ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
        // }
        LoginMgr.isCreateScene = false;
    }
    LoginMgr.changeServer = changeServer;
    function changeAccount() {
        PlatMgr.isLogin = false;
        GameData.kkkIsBindIos = "0";
        changeServer();
        // PlatformManager.login();
    }
    LoginMgr.changeAccount = changeAccount;
})(LoginMgr || (LoginMgr = {}));
//# sourceMappingURL=LoginMgr.js.map