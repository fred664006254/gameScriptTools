/**
 * 游戏登陆管理
 * author dmj
 * date 2017/9/12
 * @namespace LoginManager
 */
var LoginManager;
(function (LoginManager) {
    /**
     * 使用pid调用登录
     */
    LoginManager.loginBySetPID = false;
    LoginManager.isCreateScene = false;
    LoginManager.isNewGuideComplete = false;
    var isShowLoginLoading = false;
    // export let waitToCheckLoadGuide:boolean=false;
    LoginManager.isLoginSuccess = false;
    /**
     * 是否是新用户，是对pid来说，所有服都没有账号的情况
     */
    LoginManager.isNewUser = false;
    /**
     * 是否正在切换sdk账号，有效期：调用logout接口，到sdk登录成功，调用getcfg成功后结束
     */
    LoginManager.inSDKAccountSwitching = false;
    function showLoginLoading() {
        if (!isShowLoginLoading) {
            NetLoading.show();
            isShowLoginLoading = true;
        }
    }
    LoginManager.showLoginLoading = showLoginLoading;
    function hideLoginLoading() {
        if (isShowLoginLoading) {
            NetLoading.hide();
            isShowLoginLoading = false;
        }
    }
    LoginManager.hideLoginLoading = hideLoginLoading;
    function login() {
        LoginManager.inSDKAccountSwitching = false;
        if (App.LoginResLoader.isLoginResLoaded) {
            showLoginLoading();
        }
        else {
            showLoginLoading();
            ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
        }
        if (NetManager.socket.isConnected()) {
            gameSocketConnectSuccessHandler();
        }
        else {
            // ServerCfg.selectServer.zid=Number(ServerCfg.selectServer.zid);
            // ServerCfg.baseUrl="//"+ServerCfg.selectServer.ip_server+"/gucenter/";
            App.LogUtil.log("loginmanager开始连接游戏socket");
            NetManager.socket.connect(ServerCfg.selectServer.ip_server, Number(ServerCfg.selectServer.port_server), gameSocketConnectSuccessHandler, LoginManager);
        }
        App.LoginResLoader.loadPublicRes();
    }
    LoginManager.login = login;
    function getLocalUserName() {
        var localName = LocalStorageManager.get(LocalStorageConst.LOCAL_USER_NAME);
        return PlatformManager.userId ? PlatformManager.userId : localName;
    }
    LoginManager.getLocalUserName = getLocalUserName;
    function getUserPassword() {
        return GameData.tmpUserPassword;
    }
    LoginManager.getUserPassword = getUserPassword;
    function gameSocketConnectSuccessHandler() {
        App.LogUtil.log("游戏Socket连接成功");
        //以下调用http获取uid和token
        var uname, upwd, gaccount;
        uname = PlatformManager.userId;
        upwd = GameData.tmpUserPassword;
        var urlStr = ServerCfg.baseUrl + ServerCfg.serverTokenUrl + "?pm=";
        var accessZoneid = ServerCfg.selectServer.zid;
        if (ServerCfg.selectServer.old_zid) {
            accessZoneid = ServerCfg.selectServer.old_zid;
        }
        var apkey = "8619EBC7EB8B87F34D1DD8EB563F0F64";
        var tmpTsStr = Date.now().toString();
        var sign = App.MD5.md5(apkey + uname + tmpTsStr);
        var urlParm = "username=" + uname + "&zoneid=" + accessZoneid + "&newzoneid=" + ServerCfg.selectServer.zid + "&password=" + upwd + "&ts=" + tmpTsStr + "&sign=" + sign;
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
        NetManager.http.post(urlStr, null, getTokenSuccessHandler, ioerrorHandler, null);
        // NetManager.http.post(urlStr,null,ioerrorHandler,getTokenSuccessHandler,null);
    }
    function getTokenSuccessHandler(data) {
        var sData = NetManager.checkServerData(data);
        var ret = sData.ret;
        if (ret == false) {
            hideLoginLoading();
            if (sData.data && sData.data.ret == -131 && GameData.tmpUserPassword == "") {
                GameData.tmpUserPassword = "123456";
                gameSocketConnectSuccessHandler();
            }
            else {
                var cnKey = "requestFailCode" + sData.data.ret;
                App.CommonUtil.showTip(LanguageManager.getlocal(LanguageManager.checkHasKey(cnKey) ? cnKey : "loginFail"));
                NetManager.socket.dispose();
                ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
            }
            // todo弹错误面板
            // App.MessageCenter.dispatch(MessageConst.MESSAGE_SHOW_LOGIN_BTNS,{notice:true});
            return;
        }
        sData = sData.data;
        if (sData.access_token) {
            GameData.access_token = sData.access_token;
        }
        if (sData.logints) {
            GameData.logints = sData.logints;
            GameData.serverTime = sData.logints;
            GameData.serverClientTimeDt = sData.logints - new Date().getTime() / 1000;
            TickManager.startTick();
        }
        if (sData.statisticsId) {
            GameData.statisticsId = sData.statisticsId;
        }
        var cuid = sData.uid;
        GameData.userId = cuid;
        if (App.DeviceUtil.IsHtml5()) {
            var wbgameidArr = window["wbgameidArr"];
            if (wbgameidArr && wbgameidArr.indexOf(GameData.userId) > -1) {
                App.DisplayUtil.useObjectPool = false;
            }
        }
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
                if (isMaintain == true && sData.gconfig && sData.gconfig.status == -9999) {
                    // Global.G_cancleLoginLoading();
                    // if(sData.gconfig.content&&sData.gconfig.content!="")
                    // {
                    //     smallDialog.showSure(this,GlobalData.G_UI_SmallDialogBg,new CCSize(550,400),new egret.Rectangle(0, 0, 400, 350),new egret.Rectangle(168, 86, 10, 10),Global.getlocal("dialog_title_prompt"),sData.gconfig.content,null,200);
                    //     return;
                    // }
                    // if(sData.gconfig.st==0&&sData.gconfig.et==0)
                    // {
                    //     smallDialog.showSure(this,GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain1"), null, 200);
                    // }
                    // else
                    // {
                    //     var str:string = activityVoApi.getInstance().getActivityTimeStr(sData.gconfig.st, sData.gconfig.et);
                    //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain2", [str]), null, 200);
                    // }
                    return;
                }
                if (isMaintain == true && sData.gconfig && sData.gconfig.status == -9998) {
                    // Global.G_cancleLoginLoading();
                    // if(sData.gconfig.content&&sData.gconfig.content!="")
                    // {
                    //     let reloadserverlist = function()
                    //     {
                    //         Base.getSvrConfigFromHttpSuccess = false;
                    //         //Global.getServerListCfgFromHttp();
                    //         Global.G_getServerCfgFromHttp(false,null,null);
                    //     }
                    //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), sData.gconfig.content, false, 0, null, reloadserverlist);
                    // }
                }
            }
        }
        if (sData.gconfig != null && sData.gconfig.status == -9999) {
            // if(sData.gconfig.st==0&&sData.gconfig.et==0)
            // {
            //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain1"), null, 200);
            // }
            // else
            // {
            //     var str:string = activityVoApi.getInstance().getActivityTimeStr(sData.gconfig.st, sData.gconfig.et);
            //     smallDialog.showSure(this, GlobalData.G_UI_SmallDialogBg, new CCSize(550, 400), new egret.Rectangle(0, 0, 400, 350), new egret.Rectangle(168, 86, 10, 10), Global.getlocal("dialog_title_prompt"), Global.getlocal("sys_maintain2", [str]), null, 200);
            // }
            return;
        }
        if (ret == true) {
            // var chatSvrTb:any=null;
            // if(ServerCfg.allChatServer[GameData.getCountry()])
            // {
            //     for(var k1 in ServerCfg.allChatServer[GameData.getCountry()])
            //     {
            //         if(ServerCfg.allChatServer[GameData.getCountry()][k1].name==GameData.curArea)
            //         {
            //             chatSvrTb=ServerCfg.allChatServer[GameData.getCountry()][k1];
            //             break;
            //         }
            //     }
            // }
            // if(chatSvrTb!=null)
            // {
            // 	NetManager.chat.connect(chatSvrTb.ip,chatSvrTb.port,null,null);
            // }
            // else
            // {
            //     return;
            // }
        }
        if (sData.client_ip != null) {
            GameData.client_ip = sData.client_ip;
        }
        //以上调用http获取uid和token
        requestUseLogin();
    }
    function requestUseLogin() {
        if (GameConfig.isLoaded) {
            if (App.MessageHelper.hasEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED)) {
                App.MessageHelper.removeEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED, requestUseLogin, LoginManager);
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN), userLoginRequestHandler, null);
            var channel = PlatformManager.getAppid();
            if (!channel) {
                channel = PlatformManager.getTestAppid() || "";
            }
            var parms = { plat: channel, enter: true };
            if (PlatformManager.checkIsAreaPkg()) {
                parms["areachannel"] = PlatformManager.getGameArea();
            }
            var giftId = PlatformManager.getGiftId();
            if (giftId) {
                parms["giftid"] = giftId;
            }
            //test code
            // parms["giftid"] = "101";
            if (PlatformManager.getCandyFlag()) {
                parms["candyflag"] = PlatformManager.getCandyFlag();
            }
            if (PlatformManager.checkIsWanbaSp()) {
                parms["source"] = PlatformManager.getFromQZonePet();
            }
            if (PlatformManager.checkUseRSDKSocket()) {
                if (window["RSDKPlatform"] && window["RSDKPlatform"].isEscapeJavaScript) { }
                else {
                    parms.clientSocket = "1";
                }
            }
            if (LoginManager.isNewUser) {
                parms.isnewuser = 1;
            }
            var spName = PlatformManager.getSpName();
            if (spName) {
                parms.platName = spName;
            }
            if (PlatformManager.checkIs3KSp()) {
                var channelId = PlatformManager.getChannelId();
                if (channelId) {
                    parms.channel_id = channelId;
                }
                console.log("channelid:" + channelId);
            }
            // 微端的一些验证，由于历史原因，微端叫app，其它均叫pc
            if (PlatformManager.checkIsTWBSp()) {
                if (PlatformManager.checkIsTwWeb()) {
                    parms.downType = "pc";
                }
                else {
                    parms.downType = "app";
                }
            }
            if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid()) {
                if (!PlatformManager.checkIsFromMicroEnd()) {
                    parms.downType = "nwd";
                }
                else {
                    parms.downType = "wd";
                }
            }
            // 邀请者信息
            if (PlatformManager.inviter_uid) {
                parms.inviteUid = PlatformManager.inviter_uid;
                if (!PlatformManager.checkIsFkylcSp()) {
                    parms.platUrl = PlatformManager.avatar;
                }
                parms.inviter_pid = PlatformManager.inviter_pid;
            }
            // 分享方案信息
            if (PlatformManager.fromShareId) {
                parms.copytype = PlatformManager.fromShareId;
            }
            // 是否需要防沉迷
            parms.idcardinfo = {
                "switch": GameData.idcardSwitch ? 1 : 0,
                normal: GameData.idcardNormal,
                usertype: GameData.idcardType,
                enternormal: GameData.idcardEnterNormal
            };
            parms.language = GameData.getLanguageKey("cn");
            parms.idx = "1";
            //机型 统计
            if (App.DeviceUtil.IsHtml5()) {
                try {
                    if (navigator.userAgent) {
                        parms.deviceid = navigator.userAgent;
                    }
                }
                catch (e) {
                    console.log("navigator.userAgent error");
                }
                // bindtype 
                if (PlatformManager.checkIsWeiduan()) {
                    if (App.DeviceUtil.isIOS()) {
                        parms.bindtype = "h5_iOS";
                    }
                    else {
                        parms.bindtype = "h5_Android";
                    }
                }
                else {
                    parms.bindtype = "h5";
                }
            }
            NetManager.request(NetRequestConst.REQUEST_USER_LOGIIN, parms);
        }
        else {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED, requestUseLogin, LoginManager);
        }
    }
    function reLoginGame() {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_LOGIIN, reLoginGameSuccess, LoginManager);
        var parms = {};
        var spName = PlatformManager.getSpName();
        if (spName) {
            parms.platName = spName;
        }
        if (PlatformManager.getCandyFlag()) {
            parms["candyflag"] = PlatformManager.getCandyFlag();
        }
        if (PlatformManager.checkIs3KSp()) {
            var channelId = PlatformManager.getChannelId();
            if (channelId) {
                parms.channel_id = channelId;
            }
        }
        if (PlatformManager.checkUseRSDKSocket()) {
            if (window["RSDKPlatform"] && window["RSDKPlatform"].isEscapeJavaScript) { }
            else {
                parms.clientSocket = "1";
            }
        }
        // 是否需要防沉迷
        parms.idcardinfo = {
            "switch": GameData.idcardSwitch ? 1 : 0,
            normal: GameData.idcardNormal,
            usertype: GameData.idcardType,
            enternormal: GameData.idcardEnterNormal
        };
        parms.language = GameData.getLanguageKey("cn");
        parms.idx = "1";
        if (PlatformManager.checkIsAreaPkg()) {
            parms["areachannel"] = PlatformManager.getGameArea();
        }
        NetManager.request(NetRequestConst.REQUEST_USER_LOGIIN, parms);
    }
    LoginManager.reLoginGame = reLoginGame;
    function reLoginGameSuccess(e) {
        // if(ViewController.getInstance().checkHasShowedView(false))
        // {
        //     ViewController.getInstance().openView(ViewConst.POPUP.NETWARNPOPUPVIEW);
        // }
        NetLoading.hide();
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_LOGIIN, reLoginGameSuccess, LoginManager);
        userLoginRequestHandler(e);
    }
    function userLoginRequestHandler(event) {
        //致劲老用户导入
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN), userLoginRequestHandler, null);
        if (PlatformManager.checkIs3kQianYiSp() && Api.switchVoApi.checkOpen3kQianYi()) {
            hideLoginLoading();
            ViewController.getInstance().openView(ViewConst.POPUP.SETPASSWORDPOPUPVIEW);
            return;
        }
        var _a = event.data, ret = _a.ret, data = _a.data;
        //某服维护中
        if (data.ret == 2333) {
            LoginManager.hideLoginLoading();
            ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, {
                callback: function () {
                    LoginManager.changeServer();
                },
                msg: "" + data.data.content,
                title: "" + data.data.title
            }); //LanguageManager.getlocal('errorWeihuTip',[data.zoneid])});
            return;
        }
        if (ret) {
            if (data && data.data && data.data.cost2000) {
                //调用sdk统计
                PlatformManager.analyticsCost2000();
            }
            hideLoginLoading();
            ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
            if (!Api.playerVoApi.getPlayerName()) {
                PlatformManager.analyticsRegister();
            }
            PlatformManager.analyticsLogin();
            LoginManager.isLoginSuccess = true;
            if (Api.playerVoApi.getPlayerName() == "") {
                StatisticsHelper.reportLoadData("8_1");
                App.LoginResLoader.setNeedLoadGuideRes();
                ViewController.getInstance().openView(ViewConst.COMMON.CHOOSEROLEVIEW);
            }
            else {
                SoundManager.stopBg();
                //中断新手引导的
                if (Api.gameinfoVoApi.getGuideStep() != 9999 && !Api.rookieVoApi.isInGuiding) {
                    PlatformManager.analyticsNewGuide(RookieCfg.getRookieCfg("guideSteps"));
                    NetManager.request(NetRequestConst.REQUEST_USER_NEWERGUILD, { step: 9999 });
                }
                // if(waitToCheckLoadGuide)
                // {
                //     waitToCheckLoadGuide=false;
                //     App.LoginResLoader.isLoginResLoaded=true;
                // }
                if (App.LoginResLoader.isLoginResLoaded) {
                    StatisticsHelper.reportLoadData(15);
                }
                completeGuideForLogin();
            }
            App.LoginResLoader.loadHomeRes();
            // completeGuideForLogin();
            // checkAndCreateScene();
            connectChat();
            if (App.DeviceUtil.isIOS()) {
                RSDKHelper.checkPushToken();
            }
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
            hideLoginLoading();
            // NetManager.socket.dispose();
            if (data && data.ret == -998) {
                App.CommonUtil.showTip(LanguageManager.getlocal("loginMaxNewer"));
                LoginManager.changeServer();
                return;
            }
            var msg = "";
            if (LanguageManager.checkHasKey("sysNetErrorCode" + String(data.ret))) {
                msg = LanguageManager.getlocal("sysNetErrorCode" + String(data.ret));
            }
            else {
                msg = LanguageManager.getlocal("loginFailDesc") + LanguageManager.getlocal("failCode", [String(data.ret)]);
            }
            if (data.ret != ResponseEnums.socketError) {
                ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, { callback: requestUseLogin.bind(LoginManager), msg: msg });
            }
            // let loginView =  <LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
            //  App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,loginView.refresh,loginView);
            // loginView.showLogoAndLoginBtn();
        }
    }
    function reLoginChat() {
        Api.chatVoApi.clearChat();
        connectChatSuccess();
    }
    LoginManager.reLoginChat = reLoginChat;
    //连接聊天服务器
    function connectChat() {
        if (ServerCfg.selectServer) {
            // if(ServerCfg.selectServer.port_chat.toString()=="3001")
            // {
            //     ServerCfg.selectServer.port_chat="3002";
            // }
            if (!NetManager.chat.isConnected()) {
                NetManager.chat.connect(ServerCfg.selectServer.ip_chat, Number(ServerCfg.selectServer.port_chat), connectChatSuccess, LoginManager);
            }
        }
        else {
            return;
        }
    }
    //连接聊天服务器成功
    function connectChatSuccess() {
        NetManager.chatServerLogin(null, null);
    }
    function ioerrorHandler(data) {
        // smallDialogManager.showTopSure(Global.getlocal("dialog_title_prompt"), Global.getlocal("netiswrong"), retry, Global);
        // function retry(): void
        // {
        //     Global.getAssessTokenFromHttp(url, callback, callbackObj, ioerrorCallback);
        // }
        hideLoginLoading();
        // NetManager.socket.dispose();
        ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, { callback: gameSocketConnectSuccessHandler.bind(LoginManager), msg: LanguageManager.getlocal("loginFailDesc") });
        // gameSocketConnectSuccessHandler();
    }
    function checkAndCreateScene() {
        StatisticsHelper.reportLoadData("9_1");
        console.log("checkAndCreateScene" + App.LoginResLoader.isLoginResLoaded + LoginManager.isLoginSuccess + LoginManager.isNewGuideComplete + App.LoginResLoader.isHomesceneResLoaded);
        if (App.LoginResLoader.isLoginResLoaded && LoginManager.isLoginSuccess && LoginManager.isNewGuideComplete && App.LoginResLoader.isHomesceneResLoaded) {
            if (!LoginManager.isCreateScene) {
                if (Api.switchVoApi.checkOpenShenheGame()) {
                    ViewController.getInstance().openViewByFunName(PlatformCfg.shenheFunctionName);
                }
                else {
                    SceneController.getInstance().goHome();
                    MainUI.getInstance().show();
                }
            }
            LoginLoading.hide();
            LoginManager.isCreateScene = true;
        }
    }
    LoginManager.checkAndCreateScene = checkAndCreateScene;
    function completeGuideForLogin() {
        if (!LoginManager.isNewGuideComplete) {
            LoginManager.isNewGuideComplete = true;
        }
        if (LoginManager.isNewGuideComplete) {
            checkAndCreateScene();
        }
    }
    LoginManager.completeGuideForLogin = completeGuideForLogin;
    function setLoginByPID(pid) {
        var loginView = ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
        if (loginView) {
            if (loginView["setLoginByPID"]) {
                if (PlatformManager.checkIsUseSDK()) {
                    App.LoginResLoader.initPlatCfg();
                    RSDKHelper.isInit = true;
                    PlatformManager.isLogin = true;
                }
                LoginManager.loginBySetPID = true;
                loginView["setLoginByPID"](pid);
            }
        }
    }
    LoginManager.setLoginByPID = setLoginByPID;
    function changeServer() {
        if (PlayerBottomUI.checkInstance()) {
            PlayerBottomUI.getInstance().hide(true);
        }
        // SceneController.getInstance().hideScene
        App.LoginResLoader.dispose();
        Config.AcCfg.isGetAll = false;
        // waitToCheckLoadGuide=false;
        LoginManager.isNewUser = false;
        LoginManager.isNewGuideComplete = false;
        LoginManager.loginBySetPID = false;
        GameData.tmpUserPassword = "";
        App.CommonUtil.clear();
        // egret.Tween.removeAllTweens();
        SceneController.getInstance().dispose();
        MainUI.getInstance().hide();
        ViewController.getInstance().hideAllView();
        NetManager.socket.dispose();
        NetManager.chat.dispose();
        NetManager.http.dispose();
        TickManager.stopTick();
        App.DragonBonesUtil.clear();
        Api.dispose();
        GameData.dispose();
        StatisticsHelper.clearReportData();
        LoginManager.isLoginSuccess = false;
        NetLoading.hideForChangeAccount();
        var loginView = ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
        if (loginView) {
            if (loginView.isInit()) {
                // loadLoginViewRes();
            }
            else {
                if (!loginView.isShow()) {
                    ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
                }
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
        }
        LoginManager.isCreateScene = false;
    }
    LoginManager.changeServer = changeServer;
    function changeAccount() {
        PlatformManager.isLogin = false;
        GameData.kkkIsBindIos = "0";
        changeServer();
        // PlatformManager.login();
    }
    LoginManager.changeAccount = changeAccount;
})(LoginManager || (LoginManager = {}));
//# sourceMappingURL=LoginManager.js.map