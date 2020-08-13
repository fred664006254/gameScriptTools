/**
 * 游戏登陆管理
 * author dmj
 * date 2017/9/12
 * @namespace LoginManager
 */
namespace LoginManager 
{
    /**
     * 使用pid调用登录
     */
    export let loginBySetPID:boolean=false;

    export let isCreateScene:boolean=false;
    let isNewGuideComplete:boolean=false;
    let isShowLoginLoading:boolean=false;
    export let waitToCheckLoadGuide:boolean=false;
    export let isLoginSuccess:boolean=false;
    let userNameCount=0;
    let userNameStr:string;

    /**
     * 是否是新用户，是对pid来说，所有服都没有账号的情况
     */
    export let isNewUser:boolean=false;

    export function showLoginLoading():void
    {
        if(!isShowLoginLoading)
        {
            if(PlatformManager.checkIs37WdShenheSp())
            {
                 NetSHLoading.show();
            }
            else{
                 NetLoading.show();
            }
           
            isShowLoginLoading=true;
        }
    }

    export function hideLoginLoading():void
    {
        if(isShowLoginLoading)
        {
            if(PlatformManager.checkIs37WdShenheSp())
            {
                 NetSHLoading.hide();
            }
            else{
                 NetLoading.hide();
            }
           
            isShowLoginLoading=false;
        }
    }

	export function login()
	{
        if(App.LoginResLoader.isLoginResLoaded)
        {
            showLoginLoading();
        }
        else
        {
            showLoginLoading();
            ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
        }
        if(NetManager.socket.isConnected())
        {
            gameSocketConnectSuccessHandler();
        }
        else
        {
            // GameData.curZoneID=Number(ServerCfg.selectServer.zid);
            // ServerCfg.baseUrl="//"+ServerCfg.selectServer.ip_server+"/gucenter/";
            App.LogUtil.log("loginmanager开始连接游戏socket");
		    NetManager.socket.connect(ServerCfg.selectServer.ip_server,Number(ServerCfg.selectServer.port_server),gameSocketConnectSuccessHandler,LoginManager);

        }
        App.LoginResLoader.loadPublicRes();
   	}

    export function getLocalUserName():string
    {
        let localName:string=LocalStorageManager.get(LocalStorageConst.LOCAL_USER_NAME);
        return PlatformManager.userId?PlatformManager.userId:localName;
    }

    export function getUserPassword():string
    {
        return GameData.tmpUserPassword;
    }

	function gameSocketConnectSuccessHandler():void
	{
		App.LogUtil.log("游戏Socket连接成功");
        //以下调用http获取uid和token
        var uname,upwd,gaccount;
        uname = PlatformManager.userId;
        upwd = GameData.tmpUserPassword;
        var urlStr:string = ServerCfg.baseUrl+ServerCfg.serverTokenUrl+"?pm=";
        var accessZoneid=ServerCfg.selectServer.zid;
        if(ServerCfg.selectServer.old_zid)
        {
            accessZoneid = ServerCfg.selectServer.old_zid;
        }
        var tmpTsStr: string = Date.now().toString();
        var urlParm = "username=" + uname + "&zoneid=" + accessZoneid + "&newzoneid=" + ServerCfg.selectServer.zid + "&password=" + upwd + "&ts="+tmpTsStr;//+Date.now();//os.time()
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

		NetManager.http.post(urlStr,null,getTokenSuccessHandler,ioerrorHandler,null);
        // NetManager.http.post(urlStr,null,ioerrorHandler,getTokenSuccessHandler,null);
	}

	function getTokenSuccessHandler(data?:any)
    {
        var sData:any = NetManager.checkServerData(data);
        var ret:boolean = sData.ret;
        if(ret==false)
        {
            hideLoginLoading();
             if(sData.data&&sData.data.ret==-131&&GameData.tmpUserPassword=="")
            {
                GameData.tmpUserPassword="123456";
                gameSocketConnectSuccessHandler();
            }
            else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
                ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
            }
			// todo弹错误面板
            // App.MessageCenter.dispatch(MessageConst.MESSAGE_SHOW_LOGIN_BTNS,{notice:true});
            return;
        }
        sData = sData.data;
        if (sData.access_token)
        {
            GameData.access_token=sData.access_token;
        }
        if(sData.logints)
        {
            GameData.logints = sData.logints;
            GameData.setServerTime(sData.logints*1000,true);
        }
        if(sData.statisticsId)
        {
            GameData.statisticsId = sData.statisticsId;
        }
        var cuid:number = <number>sData.uid;
        GameData.userId = cuid;
        if(App.DeviceUtil.IsHtml5())
        {
            let wbgameidArr:number[]=window["wbgameidArr"];
            if(wbgameidArr&&wbgameidArr.indexOf(GameData.userId)>-1)
            {
                App.DisplayUtil.useObjectPool=false;
            }
        }
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
                if(isMaintain==true&&sData.gconfig&&sData.gconfig.status==-9999)
                {
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
                if(isMaintain==true&&sData.gconfig&&sData.gconfig.status==-9998)
                {
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
        if(sData.gconfig!=null && sData.gconfig.status==-9999)
        {
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
        if(ret==true)
        {
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
        if(sData.client_ip!=null)
        {
            GameData.client_ip = sData.client_ip;
        }
        //以上调用http获取uid和token
        requestUseLogin();
    }

    function requestUseLogin():void
    {
        if(ViewController.getInstance().getView(ViewConst.POPUP.SERVERLISTPOPUPVIEW))
		{
			ViewController.getInstance().hideView(ViewConst.POPUP.SERVERLISTPOPUPVIEW);
		}
        if(GameConfig.isLoaded)
        {
            if(App.MessageHelper.hasEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED))
            {
                App.MessageHelper.removeEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED,requestUseLogin,LoginManager);
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN),userLoginRequestHandler,null);

            let parms:any = {plat:PlatformManager.getAppid(),enter:true};
            let giftId:string = PlatformManager.getGiftId();
            if (giftId)
            {   
               parms["giftid"] = giftId;
            }
            //test code
            // parms["giftid"] = "101";
            if(PlatformManager.getCandyFlag()){
                parms["candyflag"] = PlatformManager.getCandyFlag();
            }

            if(PlatformManager.checkIsWanbaSp()){
                parms["source"] = PlatformManager.getFromQZonePet();
            }

            if(PlatformManager.checkUseRSDKSocket())
            {
                if(window["RSDKPlatform"]&&window["RSDKPlatform"].isEscapeJavaScript)
                {}
                else
                {
                    parms.clientSocket="1";
                }
            }
            if(LoginManager.isNewUser)
            {
                parms.isnewuser=1;
            }

            if(PlatformManager.checkIsViSp())
            {
                var appsflyer_id = PlatformManager.custom_data;
                if(appsflyer_id!=null&&appsflyer_id!="")
                {
                    parms.appsflyer_id=appsflyer_id;
                    console.log("appsflyer_id::"+appsflyer_id);
                }
          }

            let spName:string=PlatformManager.getSpName();
            if(spName)
            {
                parms.platName=spName;
            }
            if(PlatformManager.checkIs3KSp())
            {
                let channelId:string = PlatformManager.getChannelId();
                if(channelId)
                {
                    parms.channel_id=channelId;
                }
                console.log("channelid:"+channelId);
            }
            // 微端的一些验证，由于历史原因，微端叫app，其它均叫pc
            if (PlatformManager.checkIsTWBSp()) {
                if (PlatformManager.checkIsTwWeb()) {
                    parms.downType = "pc";
                } else {
                    parms.downType = "app";
                }
            }
            if (PlatformManager.checkIsWanbaSp() && RSDKHelper.isInit && App.DeviceUtil.isAndroid()) {
                if (qqwanbaplugin&&!qqwanbaplugin.checkIsFromMicroEnd()) {
                    parms.downType = "nwd";
                } else {
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
            // // 分享方案信息
            // if (PlatformManager.fromShareType) {
            //     parms.copytype = PlatformManager.fromShareType;
            // }
            // 设备推送
            if (PlatformManager.devicePushToken) {
                parms.pushToken = PlatformManager.devicePushToken;
            }
            // 是否需要防沉迷
            parms.idcardinfo = {
                switch:GameData.idcardSwitch?1:0,
                normal:GameData.idcardNormal,
                usertype:GameData.idcardType,
                enternormal:GameData.idcardEnterNormal
            };
            // 微信小游戏，防止刷小号
            if (PlatformManager.prefix && PlatformManager.rsdk_sign && PlatformManager.rsdk_login_time) {
                parms.prefix = PlatformManager.prefix;
                parms.rsdk_sign = PlatformManager.rsdk_sign;
                parms.rsdk_login_time = PlatformManager.rsdk_login_time;
            }
            // 统计微信基础库版本号
            if (App.DeviceUtil.isWXgame() && window["wx"] && window["wx"].version && window["wx"].version.version) {
                parms.wxlibversion = window["wx"].version.version;
            }
            // 微信小userid
            if ((PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp())&& PlatformManager.fk_userid)
            {
                parms.fk_userid = PlatformManager.fk_userid;
            }
            // parms.fk_userid = "f6c8f419cc78e6f2efb255a255d62672";
            // 是否从微信我的小程序里进来的
            if (PlatformManager.checkIsWxmgSp()) {
                parms.wxaddmypro = PlatformManager.isFromWxmypro;
                parms.wxaddicon = PlatformManager.isFromWxIcon;
            }
            var bindtype = App.DeviceUtil.isIOS()?"IOS":"Android";

            parms.bindtype = bindtype;
            parms.serverip = ServerCfg.selectServer.ip_server;

            let port = ServerCfg.selectServer.port_server;
            parms.serverport = port;
            NetManager.request(NetRequestConst.REQUEST_USER_LOGIIN,parms);
        }
        else
        {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_GAMECONFIG_LOADED,requestUseLogin,LoginManager);
        }
    }

    export function reLoginGame():void
    {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_LOGIIN,reLoginGameSuccess,LoginManager);
        let parms:any={};
        var bindtype = App.DeviceUtil.isIOS()?"IOS":"Android";
        parms.bindtype = bindtype;
        let spName:string=PlatformManager.getSpName();
        if(spName)
        {
            parms.platName=spName;
        }
        if(PlatformManager.getCandyFlag()){
            parms["candyflag"] = PlatformManager.getCandyFlag();
        }
        if(PlatformManager.checkIs3KSp())
        {
            let channelId:string = PlatformManager.getChannelId();
            if(channelId)
            {
                parms.channel_id=channelId;
            }
        }
        if(PlatformManager.checkUseRSDKSocket())
        {
            if(window["RSDKPlatform"]&&window["RSDKPlatform"].isEscapeJavaScript)
            {}
            else
            {
                parms.clientSocket="1";
            }
        }

        // 微信小游戏，防止刷小号
        if (PlatformManager.prefix && PlatformManager.rsdk_sign && PlatformManager.rsdk_login_time) {
            parms.prefix = PlatformManager.prefix;
            parms.rsdk_sign = PlatformManager.rsdk_sign;
            parms.rsdk_login_time = PlatformManager.rsdk_login_time;
        }

        // 是否从微信我的小程序里进来的
        if (PlatformManager.checkIsWxmgSp()) {
            parms.wxaddmypro = PlatformManager.isFromWxmypro;
            parms.wxaddicon = PlatformManager.isFromWxIcon;
        }

        // 是否需要防沉迷
        parms.idcardinfo = {
            switch:GameData.idcardSwitch?1:0,
            normal:GameData.idcardNormal,
            usertype:GameData.idcardType,
            enternormal:GameData.idcardEnterNormal
        };
        NetManager.request(NetRequestConst.REQUEST_USER_LOGIIN,parms);
    }
    function reLoginGameSuccess(e:egret.Event):void
    {
        NetLoading.hide();
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_LOGIIN,reLoginGameSuccess,LoginManager);
        userLoginRequestHandler(e,true);
    }

	function userLoginRequestHandler(event:egret.Event,isReLogin?:boolean):void
	{   
        //致劲老用户导入
       App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN),userLoginRequestHandler,null);

        if (PlatformManager.checkIs3kQianYiSp() && Api.switchVoApi.checkOpen3kQianYi()) 
        {   
            hideLoginLoading();
            ViewController.getInstance().openView(ViewConst.POPUP.SETPASSWORDPOPUPVIEW);
            return;
        }
        
        let {ret,data}=<{ret:boolean,data:any}>event.data;
        //某服维护中
        if(data.ret == 2333){
            LoginManager.hideLoginLoading();
            ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW,{  
                callback : ()=>{
                    LoginManager.changeServer();
                },
                msg : `${data.data.content}`,
                title : `${data.data.title}`
            });//LanguageManager.getlocal('errorWeihuTip',[data.zoneid])});
            return;
        }
        if(ret)
        {

            if((PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp())&&PlatformManager.fk_antiaddicted ==false)
		    // if(PlatformManager.checkIsWxSp())
		    {
			     PlatformManager.checkRest();
                //  NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETREST, {});
		    }
           
            //放沉迷
            // if(PlatformManager.checkIsViSp()&&PlatformManager.fk_antiaddicted)
            
             if(event.data.data.data.needrestflag == 1&&(PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp())&&PlatformManager.fk_antiaddicted ==false)
            {
                 hideLoginLoading();
                  NetManager.socket.dispose();
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"itemUseConstPopupViewTitle",
					// msg:LanguageManager.getlocal("versionCompareInfo"),
					msg:"大人，您今日的游戏时间已经很长了，根据防沉迷规则，您在今晚0点前将无法再登陆游戏，请下线休息，欢迎明天再来~",
					callback:(dlg)=>{
						// window.location.reload();
						LoginManager.changeServer();
					},
					handler:null,
					clickNotAutoHide:true,
					inLayer:LayerManager.maskLayer
				});
                return;
            }

            hideLoginLoading();
            ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
            if(!Api.playerVoApi.getPlayerName())
            {
                PlatformManager.analyticsRegister();
            }
            if(!isReLogin)
            {
                PlatformManager.analyticsLogin();
            }
            isLoginSuccess=true;
            console.log("login success "+Api.playerVoApi.getPlayerName());
            if(Api.playerVoApi.getPlayerName() == "")
            {
                GameData.isNewUser=true;
                StatisticsHelper.reportLoadData(15);
                App.LoginResLoader.setNeedLoadGuideRes();
                if(Api.switchVoApi.checkOpenJumpCreateUser())
                {
                    jumpGuide();
                }else{
                    // ViewController.getInstance().openView(ViewConst.COMMON.GUIDECREATEUSERVIEW);
                    ViewController.getInstance().openView(ViewConst.COMMON.CREATEUSERVIEW);
                }
                
            }
            else
            {   
                //中断新手引导的
                if(Api.gameinfoVoApi.getGuideStep() != 9999 && !Api.rookieVoApi.isInGuiding){

                     PlatformManager.analyticsNewGuide(RookieCfg.getRookieCfg("guideSteps"));
                     NetManager.request(NetRequestConst.REQUEST_USER_NEWERGUILD, {step:9999});
                }

                if(waitToCheckLoadGuide)
                {
                    waitToCheckLoadGuide=false;
                    App.LoginResLoader.isLoginResLoaded=true;
                }
                if(App.LoginResLoader.isLoginResLoaded)
                {
                    StatisticsHelper.reportLoadData(15);
                }
                 completeGuideForLogin();
            }
            // completeGuideForLogin();
            // checkAndCreateScene();
            connectChat()
        }
        else
        {
            
            // App.CommonUtil.showTip(LanguageManager.getlocal("loginFail"));
            hideLoginLoading();
            NetManager.socket.dispose();
           ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW,{callback:requestUseLogin.bind(LoginManager),msg:LanguageManager.getlocal("loginFailDesc")+LanguageManager.getlocal("failCode",[String(event.data.data.ret)])});
            // let loginView =  <LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
            //  App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,loginView.refresh,loginView);
            // loginView.showLogoAndLoginBtn();
        }
	}

     function jumpGuide():void
    {
        console.log("jumpGuide");
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_CHECKNAME,checkName,LoginManager);
        randName()
        

       
    }
    function randName():void
    {
        let firstName = "";
		firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1,603));
		let sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1,3761)) ;

		let userName = firstName + sercondName;
        userNameStr = userName;
        userNameCount ++;
        console.log("start randName "+userNameCount);
		if(userNameCount >= 5){
			userName = "user"+Api.playerVoApi.getPlayerID();
            let pic = App.MathUtil.getRandom(1,6)
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_CHECKNAME,checkName,LoginManager);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_CREATEUSER,startGuide,LoginManager);
            NetManager.request(NetRequestConst.REQUEST_USER_CREATEUSER,{name:userName,pic:pic});
		}
		else{
			NetManager.request(NetRequestConst.REQUEST_USER_CHECKNAME,{name:userName});
		}
    }
    function checkName(e:egret.Event):void
    {
        let rData = e.data.data.data;
        let ret = e.data.data.ret;
        if(rData.nameflag == 0)
        {
            console.log("randName success and creater");
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_CHECKNAME,checkName,LoginManager);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_CREATEUSER,startGuide,LoginManager);
            let pic = App.MathUtil.getRandom(1,7)
            NetManager.request(NetRequestConst.REQUEST_USER_CREATEUSER,{name:userNameStr,pic:pic});

        }
        else{
            console.log("randName fail");
            randName();
        }	
    }

    

    export let isGuideNamed = false;
    export function startGuide(e?:egret.Event):void
    {
        if(e)
        {
            isGuideNamed = true;
        }
        if(isGuideNamed==true&&App.LoginResLoader.isLoginResLoaded)
        {
             console.log("creater success and guide");
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_CREATEUSER,startGuide,LoginManager);
            LoginManager.completeGuideForLogin();
            Api.rookieVoApi.isInGuiding = true;
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:function(){null;},o:LanguageManager});
        }
        // if(PlatformManager.checkIs37WdShenheSp())
        // {
        //    LoginManager.completeGuideForLogin(); 
        //    return ;
        // }
       
    }


    export function reLoginChat():void
    {
        Api.chatVoApi.clearChat();
        connectChatSuccess();
    }

    //连接聊天服务器
    function connectChat()
    {
        if(ServerCfg.selectServer)
        {
            // if(ServerCfg.selectServer.port_chat.toString()=="3001")
            // {
            //     ServerCfg.selectServer.port_chat="3002";
            // }
            if(!NetManager.chat.isConnected())
            {
                NetManager.chat.connect(ServerCfg.selectServer.ip_chat,Number(ServerCfg.selectServer.port_chat),connectChatSuccess,LoginManager);
            }
        }
        else
        {
            return;
        }
    }
    //连接聊天服务器成功
    function connectChatSuccess()
    {
        NetManager.chatServerLogin(null,null);
    }
     

    function ioerrorHandler(data?:any):void
    {
        // smallDialogManager.showTopSure(Global.getlocal("dialog_title_prompt"), Global.getlocal("netiswrong"), retry, Global);
        // function retry(): void
        // {
        //     Global.getAssessTokenFromHttp(url, callback, callbackObj, ioerrorCallback);
        // }
        hideLoginLoading();
        NetManager.socket.dispose();
        ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW,{msg:LanguageManager.getlocal("loginFailDesc"),callback:gameSocketConnectSuccessHandler});

        // gameSocketConnectSuccessHandler();
    }

    export function checkAndCreateScene():void
    {
        console.log("checkAndCreateScene"+App.LoginResLoader.isLoginResLoaded+isLoginSuccess+isNewGuideComplete+isCreateScene);
        if(App.LoginResLoader.isLoginResLoaded&&isLoginSuccess&&isNewGuideComplete)
        {
            if(!isCreateScene)
            {
                // console.log("11111")
                console.log("gocompose");
                SceneController.getInstance().goCompose();
                MainUI.getInstance().show();
            }
            //  console.log("22222")
            LoginLoading.hide();
            isCreateScene=true;
        }
    }

    export function completeGuideForLogin():void
    {
        console.log("isNewGuideComplete "+isNewGuideComplete);
        if(!isNewGuideComplete)
        {
            isNewGuideComplete=true;
        }
        if(isNewGuideComplete)
        {
            checkAndCreateScene();
        }
    }

    export function setLoginByPID(pid:string):void
	{
		let loginView:LoginView=<LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
		if(loginView)
		{
            if(loginView["setLoginByPID"])
            {
                if(PlatformManager.checkIsUseSDK())
                {
                    App.LoginResLoader.initPlatCfg();
                    RSDKHelper.isInit=true;
                    PlatformManager.isLogin=true;
                }
                LoginManager.loginBySetPID=true;
                loginView["setLoginByPID"](pid);
            }
		}
	}

    export function changeServer():void
    {
        // SceneController.getInstance().hideScene
        App.LoginResLoader.dispose();
        Config.AcCfg.isGetAll=false;
        waitToCheckLoadGuide=false;
        isNewUser=false;
        // egret.Tween.removeAllTweens();
        SceneController.getInstance().dispose();
        GameData.tmpUserPassword="";
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
        isLoginSuccess=false;
        isGuideNamed = false;
        userNameCount = 0;
        NetLoading.hideForChangeAccount();
        let loginView:LoginView=<LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
        if(loginView)
        {
            if(loginView.isInit())
            {
                // loadLoginViewRes();
            }
            else
            {
                if(!loginView.isShow())
                {
                    ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
                }
            }
        }
        else
        {
            ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
        }
        isCreateScene=false;
    }

    export function changeAccount():void
    {
        PlatformManager.isLogin=false;
        GameData.kkkIsBindIos="0";
        changeServer();
        // PlatformManager.login();
    }

}