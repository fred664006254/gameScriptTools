/**
 * 游戏登陆管理
 * author dmj
 * date 2017/9/12
 * @namespace LoginMgr
 */
namespace LoginMgr 
{
    /**
     * 使用pid调用登录
     */
    export let loginBySetPID:boolean=false;

    export let isCreateScene:boolean=false;
    let isShowLoginLoading:boolean=false;
    // export let waitToCheckLoadGuide:boolean=false;
    export let isLoginGameSuccess:boolean=false;

    /**
     * 是否是新用户，是对pid来说，所有服都没有账号的情况
     */
    export let isNewUser:boolean=false;

    /**
     * 是否正在切换sdk账号，有效期：调用logout接口，到sdk登录成功，调用getcfg成功后结束
     */
    export let inSDKAccountSwitching:boolean=false;

    let loginLogStr:string='';

    /**设置登录log */
    export function setLog(addStr:string):void
    {
        if(addStr)
        {
            loginLogStr=loginLogStr+"\n"+addStr+":"+egret.getTimer()+"ms";
        }
    }

    export function checkLoginLog():void
    {
        loginLogStr&&StatisticsHelper.reportOwnNameLog(loginLogStr,"loginLog");
    }

    export function showLog():void
    {
        let logTxt=ComponentMgr.getTextField(loginLogStr,16,NaN,false);
        logTxt.background=true;
        logTxt.backgroundColor=0;
        logTxt.multiline=true;
        logTxt.addTouchTap((e:egret.TouchEvent)=>{

        },LoginMgr,null);
        GameConfig.stage.addChild(logTxt);
    }

    export function showLoginLoading():void
    {
        if(!isShowLoginLoading)
        {
            NetLoading.show();
            isShowLoginLoading=true;
        }
    }

    export function hideLoginLoading():void
    {
        if(isShowLoginLoading)
        {
            NetLoading.hide();
            isShowLoginLoading=false;
        }
    }

	export function loginGame()
	{
        if(App.LoginResLoader.isLoginBaseResLoaded&&PlatMgr.isLogin)
        {
            LoginMgr.inSDKAccountSwitching=false;
            showLoginLoading();
            startGetToken();
            App.LoginResLoader.loadGameBaseRes();
        }
       }

    export function getLocalUserName():string
    {
        let localName:string=LocalStorageMgr.get(LocalStorageConst.LOCAL_USER_NAME);
        return PlatMgr.userId?PlatMgr.userId:localName;
    }

    export function getUserPassword():string
    {
        return GameData.tmpUserPassword;
    }

	function startGetToken():void
	{
		LoginMgr.setLog("start get token");
        //以下调用http获取uid和token
        var uname:string,upwd:string,gaccount;
        uname = PlatMgr.userId;
        upwd = GameData.tmpUserPassword;
        var urlStr:string = ServerCfg.baseUrl+ServerCfg.serverTokenUrl+"?pm=";
        let secretkey="sljknBL0poj";
        var tmpTsStr: string = Date.now().toString();
        App.LogUtil.log(PlatMgr.userId,tmpTsStr,secretkey);

        let signStr=CryptoJS.MD5(PlatMgr.userId+tmpTsStr+secretkey).toString();
        
        var urlParm = "pid=" + uname + "&ts="+tmpTsStr+"&sign="+signStr;
        // if(GlobalData.isTest==true)
        // {
        //     urlParm = urlParm+"&local=1";
        // }
        var platform = GameData.getCurPlatName();
        var device = App.DeviceUtil.isIOS()?"IOS":"Android";
        var area = GameData.getCountry();
        if(gaccount!=null&&gaccount!="")
        {
            urlParm = urlParm+"&gaccount="+gaccount;
        }
        if(PlatMgr.checkIsTest())
        {
            urlParm=urlParm+"&test="+PlatMgr.getSpid();
        }
        urlParm=  urlParm+"&platform="+platform+"&device="+device+"&area="+area+"&rayparms=1";
		// urlParm=  urlParm+"&platform="+platform+"&device="+device+"&area="+area+"&rayparms=1"+"&spid="+PlatformManager.getSpidStr(true);
        App.LogUtil.log("加密前 "+urlParm);
        urlParm = Base64.encode(urlParm);

        App.LogUtil.log("截取之前 "+urlParm);
        var qStr:string = urlParm.substr(0,2);

        App.LogUtil.log("取到的qStr "+qStr);
        var hStr:string = urlParm.substr(2);

        App.LogUtil.log("截取后的hStr" +hStr);
        App.LogUtil.log("时间戳加密前 "+tmpTsStr);
        var timeStr = Base64.encode(tmpTsStr);

        App.LogUtil.log("时间戳加密后 "+timeStr);
        urlParm = qStr+timeStr.substr(0,5)+hStr;

        App.LogUtil.log("组合之后",urlParm);
        App.LogUtil.log("组合的各个部分",qStr,timeStr.substr(0,5),hStr);

        urlStr = urlStr+urlParm;
        App.LogUtil.log("getAccessToken:"+urlStr);
        // getAssessTokenFromHttp(urlStr, this.getTokenSuccess, this);

        // urlStr = ServerCfg.baseUrl+ServerCfg.serverTokenUrl+"?pid="+PlatMgr.userId;

		NetManager.http.post(urlStr,null,getTokenSuccessHandler,ioerrorHandler,null);
        // NetManager.http.post(urlStr,null,ioerrorHandler,getTokenSuccessHandler,null);
    }
    
    function loginFiailPopup(callback:()=>void,callbackObj:any):void
    {
        ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW,{
            title:LangMger.getlocal("sysTip"),
            msg:LangMger.getlocal("loginFail"),
            callback:(dlg)=>{
                if(callback)
                {
                    callback.call(callbackObj);
                }
            },
            closecallback:()=>{
                if(callback)
                {
                    callback.call(callbackObj);
                }
            },
            handler:LoginMgr,
            inLayer:LayerMgr.panelLayer,
            notShowOpenAni:true
        });
    }

	function getTokenSuccessHandler(data?:any)
    {
        var sData:any = NetManager.checkServerData(data);
        var ret:boolean = sData.ret;
        if(ret==false)
        {
            hideLoginLoading();
            loginFiailPopup(startGetToken,LoginMgr);
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
        if (sData.access_token)
        {
            GameData.access_token=sData.access_token;
        }

        if(sData.server)
        {
            ServerCfg.selectServer.ip_server=sData.server.host;
            ServerCfg.selectServer.port_server=sData.server.port;
        }
        if(sData.shenhe)
        {
            GameData.isWxShenhe=true;
        }

        if(sData.logints)
        {
            GameData.logints = sData.logints;
            GameData.serverTimeMs = sData.logints*1000;
            GameData.serverClientTimeDt = GameData.serverTimeMs - new Date().getTime();
            TickMgr.startTick();
        }
        if(sData.statisticsId)
        {
            GameData.statisticsId = sData.statisticsId;
        }
        GameData.uid = <number>sData.uid;
        var isMaintain:boolean=false;
        if(sData.hasOwnProperty("gconfig")&&sData.gconfig!=null&&sData.gconfig.hasOwnProperty("zoneid")&&sData.gconfig.zoneid!=null)
        {
            if(typeof sData.gconfig.zoneid==typeof {})
            {
                var index:number=0;
                var k;
                for(k in sData.gconfig.zoneid)
                {
                    index++;
                }
                if(index==0)
                {
                    isMaintain = true;
                }
                else
                {
                    for(k in sData.gconfig.zoneid)
                    {
                        if(sData.gconfig.zoneid[k]==ServerCfg.selectServer.zid)
                        {
                            isMaintain = true;
                            break;
                        }
                    }
                }
            }
        }
        if(sData.client_ip!=null)
        {
            GameData.client_ip = sData.client_ip;
        }
        if(sData.version)
        {
            if(!NetManager.checkCSVersion(sData.version))
            {
                return;
            }
        }
        //以上调用http获取uid和token
        startConnectSocket();
    }
    
    function startConnectSocket():void
    {
        if(NetManager.socket.isConnected())
        {
        }
        else
        {
            // ServerCfg.selectServer.zid=Number(ServerCfg.selectServer.zid);
            // ServerCfg.baseUrl="//"+ServerCfg.selectServer.ip_server+"/gucenter/";
            App.LogUtil.log("loginmanager开始连接游戏socket");
		    NetManager.socket.connect(ServerCfg.selectServer.ip_server,Number(ServerCfg.selectServer.port_server),()=>{
                requestUseLogin();

            },LoginMgr);

        }
    }

    function requestUseLogin():void
    {
        if(GameConfig.isLoaded)
        {
            App.MsgHelper.addEvt(NetConst.USER_LOGIIN,userLoginRequestHandler,null);
            NetManager.request(NetConst.USER_LOGIIN,formatLoginData());
        }
    }

    function formatLoginData(retry?:boolean):dice.Ics_user_login
    {
        let params:dice.Ics_user_login = {};
        let plat=PlatMgr.getAppid();
        if(!plat)
        {
            plat=PlatMgr.getTestAppid()||"";
        }
        if(plat)
        {
            params.plat=plat;
        }
        params.enter=!retry;
        params.serverIp=ServerCfg.selectServer.ip_server;
        params.serverPort=String(ServerCfg.selectServer.port_server);
        params.client_ip=GameData.client_ip;

        if(App.DeviceUtil.IsHtml5())
        {
            try {
                if (navigator.userAgent)
                {
                    params.deviceid = navigator.userAgent;
                }
            }
            catch (e) {
                console.log("navigator.userAgent error");
            }
        }
        
        return params;
    }

    export function reLoginGame():void
    {
        App.MsgHelper.addEvt(NetConst.USER_LOGIIN,reLoginGameSuccess,LoginMgr);
        NetManager.request(NetConst.USER_LOGIIN,formatLoginData(true));
    }
    function reLoginGameSuccess(e:egret.Event):void
    {
        // if(ViewController.getInstance().checkHasShowedView(false))
        // {
        //     ViewController.getInstance().openView(ViewConst.NETWARNPOPUPVIEW);
        // }
        NetLoading.hide();
        App.MsgHelper.removeEvt(NetConst.USER_LOGIIN,reLoginGameSuccess,LoginMgr);
        userLoginRequestHandler(e);
    }

	function userLoginRequestHandler(event:egret.Event):void
	{   
        //致劲老用户导入
       App.MsgHelper.removeEvt(NetConst.USER_LOGIIN,userLoginRequestHandler,null);
        let {ret,data}=<{ret:boolean,data:any}>event.data;
        if(ret)
        {
            isLoginGameSuccess=true;
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

            if (App.DeviceUtil.isIOS())
            {
                RSDKHelper.checkPushToken();
            }
        }
        else
        {
            // App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
            hideLoginLoading();
            // NetManager.socket.dispose();

            let msg:string="";
            if(LangMger.checkHasKey("sysNetErrorCode"+String(data.ret)))
            {
                msg=LangMger.getlocal("sysNetErrorCode"+String(data.ret));
            }
            else
            {
                msg=LangMger.getlocal("loginFail")+LangMger.getlocal("failCode",[String(data.ret)]);
            }

            if (data.ret != ResponseEnums.socketError)
            {
                ViewController.getInstance().openView(ViewConst.ERRORPOPUPVIEW,{callback:requestUseLogin.bind(LoginMgr),msg:msg});
            }

        }
	}

     

    function ioerrorHandler(data?:any):void
    {
        // smallDialogManager.showTopSure(Global.getlocal("dialog_title_prompt"), Global.getlocal("netiswrong"), retry, Global);
        // function retry(): void
        // {
        //     Global.getAssessTokenFromHttp(url, callback, callbackObj, ioerrorCallback);
        // }
        LoginMgr.setLog("get token error");
        hideLoginLoading();
        // NetManager.socket.dispose();
        ViewController.getInstance().openView(ViewConst.ERRORPOPUPVIEW,{callback:startGetToken.bind(LoginMgr),msg:LangMger.getlocal("loginFail")});

        // startGetToken();
    }

    export function checkAndCreateScene():void
    {
        StatisticsHelper.reportLoadData("9_1");
        console.log("checkAndCreateScene"+App.LoginResLoader.isGameBaseResLoaded+isLoginGameSuccess);
        if(App.LoginResLoader.isGameBaseResLoaded&&isLoginGameSuccess)
        {
            if(!isCreateScene)
            {
                SceneController.getInstance().goReady();
                MainUI.getInstance().show();
            }
            LoginLoading.hide();
            isCreateScene=true;
        }
    }

    export function setLoginByPID(pid:string):void
	{
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

    export function changeServer():void
    {
        // SceneController.getInstance().hideScene
        loginLogStr="";
        App.LoginResLoader.dispose();
        Config.AcCfg.isGetAll=false;
        // waitToCheckLoadGuide=false;
        isNewUser=false;
        LoginMgr.loginBySetPID=false;
        GameData.tmpUserPassword="";
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
        isLoginGameSuccess=false;
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
        isCreateScene=false;
    }

    export function changeAccount():void
    {
        PlatMgr.isLogin=false;
        GameData.kkkIsBindIos="0";
        changeServer();
        // PlatformManager.login();
    }

}