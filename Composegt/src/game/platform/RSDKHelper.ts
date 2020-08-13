namespace RSDKHelper 
{
    export let isInit:boolean=false;
     /** 是否已经显示了疯狂vip的图标 */
    let showedWxVipIcon = false;
	export function init():void
	{
		// if(window.location.search=="")
        // {
        //     let searchParam = {
        //         "appid":"20120011",
        //         "appkey":"9fc114c245a6c4f8d6c244d861738ed3",
        //         "login_plugin":["rsdkclient"],//["rgame"],
        //         // "login_trade_type":""
        //         "pay_plugin":["rsdkclient"],//["rgame"],
        //         "analytics_plugin":["pttracker"],
        //         "resbaseurl":"//192.168.101.67/rsdk/",
        //         "baseserverurl":"//123.207.90.81/gamesdk-server",
        //         "order_url":"//devsdk.raysns.com/cuiwenjian/rsdk-base-server/src/pay/create_order/devsdk/h5test/v1",
        //         "token_url":"http://devsdk.raysns.com/cuiwenjian/rsdk-base-server/src/user/login"
        //     };
        //     searchParam.appid="9991001001";
        //     searchParam.appkey="axw8o51698e3f208czd8d26cw0fdyb57";
        //     window.location.search="?rsdk_param="+JSON.stringify(searchParam);
        // }

        if(App.DeviceUtil.IsHtml5()&&PlatformManager.checkIsFkylcSp())
        {
            let content = LanguageManager.getShareDesc();
			window["shareTitle"]= content.title || "皇上快点";
            window["shareDesc"]= content.desc || "让好友看看你的女人有多美！";
            window["shareImgUrl"]="http://gt-fkylc-cdn.raygame3.com/gt_fkylc/shareicon.png";
        }
        if(App.DeviceUtil.IsHtml5())
        {
            window["shareTitle"]= "皇上快点";
            window["shareDesc"]= "开局是个小村长，如何逆袭当皇上！";
            window["shareImgUrl"]="http://gdhc-wx-cdn.leishenhuyu.com/gt_wx/shareicon1.png";
        }
        let initInfo:any = {privateKey:"8769C5721C903F029C10DCE9CA35FE13",debug:false};
        if (App.DeviceUtil.isWXgame() && PlatformManager.checkIsWxmgSp()) {        
            initInfo.r_host = "https://gdhc-cn-sdk01.leishenhuyu.com";
            initInfo.r_bid = "1014003000";
            initInfo.r_plat = "h5fkwx-1014003001";
            initInfo.game_version = "modifybywxgamescript_svnversion";
        } else if (App.DeviceUtil.isWXgame() && PlatformManager.checkIsWxAppSp()) {        
            initInfo.r_host = "https://gd-weixin-sdk02.leishenhuyu.com";
            initInfo.r_bid = "1003016000";
            initInfo.r_plat = "h5wxgame-1003016003";
            initInfo.game_version = "modifybywxgamescript_svnversion";
        } else if (App.DeviceUtil.isBaidugame()) {        
            initInfo.r_host = "https://hskd-h5lianyun-sdk.leishenhuyu.com";
            initInfo.r_bid = "1003007000";
            initInfo.r_plat = "h5baiduxyx-1003007033";
            initInfo.game_version = "modifybywxgamescript_svnversion";
        }
         else if (PlatformManager.checkIsQQXYXSp()) {        
            initInfo.r_host = "https://gd-cn-sdk02.leishenhuyu.com";
            initInfo.r_bid = "1003012000";
            initInfo.r_plat = "h5qqgame-1003012006";
            initInfo.game_version = "modifybywxgamescript_svnversion";
        }  else if (App.DeviceUtil.isWyw()) {        
            initInfo.r_host = "https://gd-lm-sdk.raygame3.com";
            initInfo.r_bid = "17011000";
            initInfo.r_plat = "h5limi-17011001";
        }
		RSDK.init(initInfo,function(code,data)
        {
            isInit=true;
            console.log("初始化结果"+code);
            // login();
            if(App.LoginResLoader.isDefaultResLoaded)
            {
                App.LoginResLoader.initPlatCfg();
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS);
            PlatformManager.client.setAppForegroundStatusChange();
            PlatformManager.analyticsLoadEnd();
            //微信平台，提前调登录
            if (App.DeviceUtil.isWXgame())
            {
                PlatformManager.login();
            }
            console.log("checkIsJPSp", PlatformManager.checkIsJPSp());
            if (PlatformManager.checkIsJPSp()) {
                console.log("RSDKHelper.startPush");
                RSDKHelper.startPush((data:any)=>{
                    console.log("RSDKHelper.startPush callback " + typeof(data) + " " + App.StringUtil.toString(data));
                    PlatformManager.devicePushToken = data;
                });
            }
        });  //测试
	}

    export function login():void
    {
        RSDK.login("",function(code,data)
        {
            console.log(data);

            //设置群分享卡片

            
            if(Number(code)==0)
            {
                if(window["wx"] && window["wx"].getLaunchOptionsSync){
                    let scene = window["wx"].getLaunchOptionsSync().scene;
                    if(scene==1044){
                        PlatformManager.isFromWxCard = true;       
                    }
                    if(data.share_ext){
                        PlatformManager.fromWxCardExt = data.share_ext;
                    } else if(data.share_set_ext){
                        PlatformManager.fromWxCardExt = data.share_set_ext;
                    }
                }



                PlatformManager.all_ab_subs=data.all_ab_subs||[];
                PlatformManager.userId=data.userId;
                PlatformManager.prefix=data.prefix;
                PlatformManager.userType=data.userType;
                PlatformManager.token=data.token;
                PlatformManager.isLogin=true;
                PlatformManager.nickname = data.nickname;
                PlatformManager.avatar = data.avatar;
                PlatformManager.inviter_pid = data.inviter_pid;
                PlatformManager.inviter_uid = data.inviter_uid;
                // if (data.inviter_uid) {
                //     let customData = data.inviter_uid.split("_");                
                //     PlatformManager.inviter_uid = customData[0];
                //     PlatformManager.fromShareType = customData[1];
                // }

                PlatformManager.custom_data = data.custom_data;
                PlatformManager.ios_pay = data.ios_pay;
                PlatformManager.fk_realname = data.fk_realname;
                PlatformManager.fk_antiaddicted = data.fk_antiaddicted;
                PlatformManager.fk_userid = data.fk_userid;
                PlatformManager.fk_vipds = data.fk_vipds;
                PlatformManager.fk_cdk = data.fk_cdk;
                PlatformManager.fk_wife = data.fk_wife;
                PlatformManager.app = data.app;

                //
                PlatformManager.rsdk_sign = data.rsdk_sign;
                PlatformManager.rsdk_login_time = data.rsdk_login_time;

                // alert("头像::"+data.avatar + "登录::"+code+"::"+App.StringUtil.toString(data));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS);
                if(PlatformManager.checkIsQQXYXSp())
                {
                     let content:{shareType:string,title:string,desc:string,imageurl?:string}={
                        shareType:App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title : "快来测试一下你的桃花运", 
                        desc : "让好友看看你的女人有多美！", 
                        imageurl:" https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                   
                }
                // else if (App.DeviceUtil.isWXgame()) {
                else if (PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp()) {
                    let content:{shareType:string,title:string,desc:string,imageurl?:string}={
                        shareType:App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title : "皇上快点", 
                        desc : "让好友看看你的女人有多美！", 
                        imageurl:"https://gt-fkwx.leishenhuyu.com/wxgameOtherPic/share0.jpg"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                }else if(PlatformManager.checkIsBaiduSp()){
                    let content:{shareType:string,title:string,desc:string,imageurl?:string}={
                        shareType:App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title : "皇上快点", 
                        desc : "这游戏真的省钱 玩了1个月都没充值 原来当官的游戏都这么爽！ 3天就当王爷了！", 
                        imageurl:"https://gd-h5ly-web01.leishenhuyu.com/share/baidushareicon.png"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);

                } 
                else if(PlatformManager.checkIsH5lySp()){
                    let content:{shareType:string,title:string,desc:string,imageurl?:string}={
                        shareType:App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title : "快来测试一下你的桃花运", 
                        desc : "让好友看看你的女人有多美！", 
                        imageurl:"https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);

                } 
                if(PlatformManager.checkIsWxH5Chuansheng()){

                    let key = Math.floor(Math.random() * 2) + 1;
                    let map = 
                    {
                        desc1:"3天就当王爷了！这游戏真的省钱 玩了1个月都没充值 原来当官的游戏都这么爽！",
                        desc2:"有两个格格都想嫁给你 你是娶一个？还是都娶了？ 快来娶回家吧！",
                    }
                    
                    let lastGang = document.baseURI.lastIndexOf("/");
				    let imageurl = document.baseURI.substr(0, lastGang + 1) + "resource/other/share_guide_image/" + "shareWxH5chuansheng"+key+".jpg";

                    let content:{shareType:string,title:string,desc:string,imageurl?:string}={
                        shareType:App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title : "皇上快点", 
                        desc : map["desc"+key], 
                        imageurl:imageurl
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);

                }
            }
            else if(Number(code)==-1)
            {
            }
            else if(Number(code)==-2)
            {
            }
            else if(Number(code)==1001)
            {
                if(PlatformManager.isSupportBindPhone())
                {
                    GameData.kkkIsBindIos = String(data.msg);
                    //是否绑定过手机 1已绑定,0未绑定
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_IOS_BINDPHONE,{"result":String(data.msg)});
                }
               
            } 
            else if(Number(code)==1002)
            {
                PlatformManager.kkk_age=Number(data.msg);
            }
            else if(Number(code)==1003)
            {
                console.log("检查服务器:"+code+"  "+data.msg);
                if (Number(data.msg) == 1) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
                }
            }
            else if(Number(code)==1004)
            {
                console.log("检查账号绑定:"+code+"  "+data.msg);
                // if (Number(data.msg) == 1) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_BIND, data.msg);
                // }
            }
            else if(Number(code)==1006)
            {
                console.log("推送获取设备id:"+code+"  "+typeof(data) + data.msg);
                PlatformManager.devicePushToken = data.msg;
            }

        },function(code,data){
            console.log("登出::"+code);
            if(Number(code)==0)
            {
                PlatformManager.isLogin=false;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_LOGOUT);
                // if(!LoginView.isShowed)
                // {
                    LoginManager.changeAccount();
                // }
            }
        });
    }

    export function logout():void
    {
        RSDK.logout();
    }

    export function pay(productId:string):void
    {
        let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if(PlatformManager.checkIsWanbaSp())
        {
            window["__payError"] = function(){
                //支付失败执行
                App.CommonUtil.showTip(LanguageManager.getlocal("payFailTip"));
            }

            window["__payClose"] = function(){
                //关闭对话框执行,IOS下无效
                App.CommonUtil.showTip(LanguageManager.getlocal("payCancelTip"));
            }
        }
        if(itemCfg.orderid)
        {
            productId=itemCfg.orderid;
        }
        
        let payInfo=new productInfo();
        payInfo.coinNum=itemCfg.gemCost.toString();
        payInfo.currency="CNY";
        if(PlatformManager.checkIsKRSp())
        {
            if(App.DeviceUtil.isAndroid()){
                payInfo.currency="KRW";
            }else if(App.DeviceUtil.isIOS())
            {
                payInfo.currency="USD";
            }
        }
        payInfo.gameUserId=GameData.userId.toString();
        payInfo.gameUserName=Api.playerVoApi.getPlayerName();
        payInfo.price=itemCfg.cost.toString();
        let data:any={allProductId:Config.RechargeCfg.getAllProductid().join(","),productId:itemCfg.id};
        // if(checkWifeABTest())
        // {
        //     // let data={channelId:"17003002",allProductId:Config.RechargeCfg.getAllProductid().join(",")};
        //     payInfo.privateData=JSON.stringify(data);;
        // }
        // else
        // {
            // payInfo.privateData=JSON.stringify({allProductId:Config.RechargeCfg.getAllProductid().join(",")});
            formatChannelId(data);
        // }
        payInfo.productCount="1";
        payInfo.productId=productId;
        payInfo.productName=itemCfg.gemCost+LanguageManager.getlocal("gemName");
        payInfo.productType="1";
        payInfo.userId=PlatformManager.userId;
        payInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
        payInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        payInfo.serverId=ServerCfg.selectServer.zid;
        payInfo.serverName=ServerCfg.selectServer.sname?ServerCfg.selectServer.sname:ServerCfg.selectServer.zid;
        RSDK.pay(payInfo,(code:string,data:any)=>{
            if(PlatformManager.checkIsWanbaSp())
            {
                if(data&&data.balance!=null)
                {
                    let balance:number=Number(data.balance);
                    if(isNaN(balance)==false)
                    {
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{msg:LanguageManager.getlocal("paySuccessLeftMoneyTip",[String(itemCfg.cost*10),String(itemCfg.gemCost),String(balance),Config.RechargeCfg.getMoneyName()]),title:"itemUseConstPopupViewTitle",touchMaskClose:true});
                    }
                }
            }
        });
    }
   
    export function share(callback:(code:string,data:any)=>void):void
    {
        let desc = LanguageManager.getShareDesc();
        let content:{shareType:string,title:string,desc:string,imageurl?:string}={shareType:"",title : desc.title ||"皇上快点", desc : desc.desc || "体验真实古代官场生活，权倾朝野，坐拥江山美人！", imageurl:desc.imageurl};
        // let shareId = "000";
        // if (desc.shareId) {
        //     shareId = desc.shareId;
        // }
        // App.ShareGuideUtil.sharingId = shareId;
        // RSDK.setShareInfo(content, GameData.userId.toString() + "#" + shareId);
        // egret.log("content1" + desc)
        // egret.log("content2" + desc.desc)
        // egret.log("content3" + desc.imageurl)
        PlatformManager.analytics37Point("custom_social","share_behavior",1);
        RSDK.share(content,callback);
    }
    // 设置分享信息
    export function setShareInfo(shareInfo:string): void
    {
        let content:{shareType:string,title:string,desc:string,imageurl?:string}={shareType:App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,title : "皇上快点", desc : "体验真实古代官场生活，权倾朝野，坐拥江山美人！"};
        if(PlatformManager.getAppid()=="1003007035")
        {
            content.imageurl = "https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg";
        }
        RSDK.setShareInfo(content, shareInfo);
    }
    export function fbShare(callback:(code:string,data:any)=>void):void
    {
        // console.log("QAZ fbShare");
        // let desc = LanguageManager.getShareDesc();
        // let content:{title:string,desc:string,imageurl:string,link:string}={title : desc.title || "一個官人七個妻 真實體驗古風官場生活",
        // desc : desc.desc || "好男兒生當作人傑，三妻四妾，封王拜侯，爭雄稱霸!\n春風得意馬蹄疾，一日看盡長安花！快意一生！",
        // imageurl:"http://pic.heyyogame.com/panwuxi/picture/201711220fa85dce39574e4e3640ad85370e16ed.jpg",
        // link:"https://adv.heyyogame.com/adv.jsp?gamecode=GD&partnerName=share&advcode=GD_yypV_414"};
        // RSDK.share(content,callback);
    }
    export function krShare(callback:(code:string,data:any)=>void):void
    {
        // console.log("QAZ krShare");
        // let desc = LanguageManager.getShareDesc();
        // let content:{title:string,desc:string,imageurl:string,link:string}={title : desc.title || "역천인 - 이제까지 없던 정통 사극 RPG!",
        // desc: desc.desc || "역사 속 위대한 위인, 경국지색의 미녀들과 함께 써나가는 당신만의 장대한 서사시. 신분의 한계를 뛰어넘어 왕이 되어라!",
        // imageurl:"https://yccs.mayngames.co.kr/img/fbshare1.jpg",
        // link:"https://yccs.mayngames.co.kr/fbshare"};
        // RSDK.share(content,callback);
    }

    /**
     * 
     * @param code -1 登录统计  -2新手引导步数 -3 注册统计 -4 支付统计 -5 升级统计 -6 loading完成统计
     * @param info 
     */
    function trackEvent(code:string,info:any):void
    {
        if(PlatformManager.checkIsKRShenhe())
        {
            return;
        }
        try
        {
            // let isABTest:boolean=checkWifeABTest();
            // if(isABTest)
            // {
            //     switch(code)
            //     {
            //         case TRACK_LOGIN:
            //         case TRACK_NEW_GUIDE:
            //         case TRACK_REGISTER:
            //         case LEVEL_UP:
            //             info.channelId="17003002";
            //         default:
            //     }
            // }
            formatChannelId(info);
            RSDK.trackEvent(code,info);
            // if(checkApenAutoLoginABtest())
            // {
            //     switch(code)
            //     {
            //         case TRACK_LOGIN:
            //         case TRACK_NEW_GUIDE:
            //         case TRACK_REGISTER:
            //         case LEVEL_UP:
            //             info.channelId="17999001";
            //         default:
            //     }
            //     RSDK.trackEvent(code,info);
            // }
        }
        catch(e)
        {
            App.LogUtil.log("前端统计报错:"+code);
        }
    }

    function checkWifeABTest():boolean
    {
        return Api.switchVoApi.checkWifeAni()&&Api.switchVoApi.checkOpenWifeAbTest();
    }

    function checkApenAutoLoginABtest():boolean
    {
        return Api.switchVoApi.checkApenAutoLoginABtest()&&Api.otherInfoVoApi.isnewuser();
    }

    export function analyticsLogin():void
    {
        try
        {
            if(PlatformManager.checkIsWanbaSp())
            {
                let isReport:boolean=true;
                // if(GameData.wanbaEvenyNumReport)
                // {
                //     if(GameData.userId%GameData.wanbaEvenyNumReport==0)
                //     {
                //         isReport=true;
                //     }
                // }
                // else
                // {
                //     isReport=true;
                // }
                if(GameData.closeSource == 1)
                {
                    isReport = false;
                }
              
                if(isReport&&window&&window["reportLogin"])
                {
                    window["reportLogin"]();
                }
            }
        }
        catch(e)
        {

        }
        var eventInfo:any = {};
        eventInfo.userId=PlatformManager.userId;
        eventInfo.gameUserId=GameData.userId.toString();
        eventInfo.gameUserName=Api.playerVoApi.getPlayerName()?Api.playerVoApi.getPlayerName():GameData.userId.toString();
        eventInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
        eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId=ServerCfg.selectServer.zid;
        eventInfo.serverName=ServerCfg.selectServer.sname;
        eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        eventInfo.coinNum=Api.playerVoApi.getPlayerGem().toString();
        eventInfo.loginType=0;
        eventInfo.loginTime=GameData.logints;
        eventInfo.rank=Api.challengeVoApi.getCurChannelId()+"";
        eventInfo.diamond=Api.playerVoApi.getPlayerGem();
        if(PlatformManager.checkIsWxmgSp())
        {
            eventInfo.allmoney=Api.playerVoApi.getPlayerVipExp();
            eventInfo.energy=Api.playerVoApi.getPlayerPower();
            eventInfo.money1Consume=Api.playerVoApi.getUsegems();
            if(Api.playerVoApi.getPlayerAllianceId() != 0)
            {
                eventInfo.teamName = Api.playerVoApi.getPlayerAllianceName();
                eventInfo.teamJob = LanguageManager.getlocal("allianceMemberPo" + Api.allianceVoApi.getMyAllianceVo().po);
            }
            
        }
        trackEvent(TRACK_LOGIN,eventInfo);
    }

    export function analyticsNewGuide(step:number|string):void
    {
        var eventInfo:any = {};
        eventInfo.gameUserId=GameData.userId.toString();
        eventInfo.serverId=ServerCfg.selectServer.zid;
        eventInfo.step=String(step);
        trackEvent(TRACK_NEW_GUIDE,eventInfo);
    }

       export function analyticsSelectServer():void
    {
        var eventInfo:any = {};
        eventInfo.serverName=ServerCfg.selectServer.sname;
        eventInfo.serverId=ServerCfg.selectServer.zid;
        eventInfo.customEventName="selectServerLoginEvent";
        trackEvent(TRACK_UNLOCK_FIRST_CHAPTER,eventInfo);
    }

    export function analyticsRegister():void
    {
        if(PlatformManager.checkIsWanbaSp())
        {
            let isReport:boolean=true;
            // if(GameData.wanbaEvenyNumReport)
            // {
            //     if(GameData.userId%GameData.wanbaEvenyNumReport==0)
            //     {
            //         isReport=true;
            //     }
            // }
            // else
            // {
            //     isReport=true;
            // }
            if(GameData.closeSource == 1)
            {
                isReport = false;
            }
            console.log('report'+(isReport?1:0));
            if(isReport&&window&&window["reportRegister"])
            {
                window["reportRegister"]();
            }
        }
        var eventInfo:any = {};
        eventInfo.userId=PlatformManager.userId;
        eventInfo.gameUserId=GameData.userId.toString();
        eventInfo.gameUserName=Api.playerVoApi.getPlayerName()?Api.playerVoApi.getPlayerName():GameData.userId.toString();
        eventInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
        eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId=ServerCfg.selectServer.zid;
        eventInfo.serverName=ServerCfg.selectServer.sname;
        eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType=1;
        trackEvent(TRACK_REGISTER,eventInfo);
        console.log("QAZ analyticsRegister TRACK_REGISTER "+TRACK_REGISTER);
        if(PlatformManager.checkIsTWBSp()&&!PlatformManager.checkIsTest())
        {
            StatisticsHelper.report_register_tw();
        }
    }

    export function analyticsPay(id:string,orderId:string,paymentData:any):void
    {
        let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(id);
        var eventInfo:any={};
        eventInfo.gameUserId=GameData.userId.toString();
        eventInfo.gameUserName=Api.playerVoApi.getPlayerName();
        eventInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
        eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId=ServerCfg.selectServer.zid;
        eventInfo.serverName=ServerCfg.selectServer.sname;
        eventInfo.orderId=orderId;
        if(!itemCfg)
        {   
            if(PlatformManager.checkIsViSp()&&id.indexOf("klwebpay")>-1)
            {
                //  eventInfo.price=(paymentData.amount/3).toFixed(2);
                //  eventInfo.coinNum=paymentData.num;
                return;
            }else
            {
                eventInfo.price=(paymentData.amount).toFixed(2);
                eventInfo.coinNum=paymentData.num;
            }
            
        }
        else
        {
            eventInfo.price=(itemCfg.cost).toFixed(2);
            eventInfo.coinNum=itemCfg.gemCost
        }
        
        eventInfo.productCount="1";
        eventInfo.productType="1";
        eventInfo.currency="CNY";
        if(PlatformManager.checkIsKRSp())
        {
            if(App.DeviceUtil.isAndroid()){
                eventInfo.currency="KRW";
            }else if(App.DeviceUtil.isIOS())
            {
                eventInfo.currency="USD";
            }
        }
        trackEvent(TRACK_PAY,eventInfo);
        if(PlatformManager.checkIsTWBSp()&&!PlatformManager.checkIsTest())
        {
            StatisticsHelper.report_pay_tw(itemCfg.cost);
        }
    }

     export function analyticsLevelup(){
        App.LogUtil.log("__levelup_event__");
        let gameuserInfo:any={};
        gameuserInfo.userName="";
        gameuserInfo.userId=PlatformManager.userId;
        gameuserInfo.serverId=ServerCfg.selectServer.zid;
        gameuserInfo.serverName=ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName=Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId=GameData.userId.toString();
        gameuserInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
        gameuserInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        gameuserInfo.loginType=2;

        trackEvent(LEVEL_UP,gameuserInfo);

        if(PlatformManager.checkIsTWBSp()&&PlatformManager.checkIsTest()==false&&Api.playerVoApi.getSdkLevel()==4)
        {
            StatisticsHelper.report_uplevel4_tw();
        }
    }

    export function analyticsLoadEnd():void
    {
       
        var eventInfo:any = {};
        // eventInfo.gameUserId=GameData.userId.toString();
        // eventInfo.gameUserName=Api.playerVoApi.getPlayerName()?Api.playerVoApi.getPlayerName():GameData.userId.toString();
        // eventInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
        // eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        // eventInfo.serverId=ServerCfg.selectServer.zid;
        // eventInfo.serverName=ServerCfg.selectServer.sname;
        // eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        // eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        // eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        // eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        // eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        // eventInfo.loginType=0;
        trackEvent(TRACK_LOAD_END,eventInfo);
    }

    export function analyticsCompleteNewGuide():void
    {
        // if(PlatformManager.checkIsKRSp()&&Number(PlatformManager.getAppVersion())>14)
        // if(PlatformManager.checkIsKRSp()&&Number(PlatformManager.getAppVersion())>14)
        // {
            var eventInfo:any = {};
            eventInfo.gameUserId=GameData.userId.toString();
            eventInfo.serverId=ServerCfg.selectServer.zid;
            try
            {
                trackEvent(TRACK_TUTORIAL_END,eventInfo);
            }
            catch(e)
            {
                console.log("analyticsCompleteNewGuide error");
            }
        // }
    }

    /**
     * 37打点统计
     */
    export function analytics37Point(eventName:string,eventKey:string,eventValue:number){
        App.LogUtil.log("track analytics37Point");
        try
        {
            let gameuserInfo:any={};
            gameuserInfo.userName="";
            gameuserInfo.userId=PlatformManager.userId;
            gameuserInfo.serverId=ServerCfg.selectServer.zid;
            gameuserInfo.serverName=ServerCfg.selectServer.sname;
            gameuserInfo.gameUserName=Api.playerVoApi.getPlayerName();
            gameuserInfo.gameUserId=GameData.userId.toString();
            gameuserInfo.roleLevel=Api.playerVoApi.getSdkLevel().toString();
            gameuserInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
            gameuserInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
            gameuserInfo.balance=Api.playerVoApi.getPlayerGem().toString();
            gameuserInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
            gameuserInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
            gameuserInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
            let customEventName = {eventName:eventName,eventKey:eventKey,eventValue:eventValue}
            gameuserInfo.customEventName=customEventName;
            trackEvent("-8",gameuserInfo);
        }
        catch(e)
        {
            console.log("analytics37Point error");
        }

    }
    /**
     * 解锁第一章
     */
      export function analyticsFirstChapter():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_UNLOCK_FIRST_CHAPTER,eventInfo);
    }
    /**
     * 解锁牢房
     */
      export function analyticsUnlockCell():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_UNLOCK_CELL,eventInfo);
    }
    /**
     * 达到正九品
     */
      export function analyticsNineGrade():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_REACH_NINE_GRADE,eventInfo);
    }
    /**
     * 达到从八品
     */
      export function analyticsEightGrade():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_REACH_VICE_EIGHT_GRADE,eventInfo);
    }
    /**
     * 解锁寻访
     */
      export function analyticsUnlockSearch():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_UNLOCK_SEARCH,eventInfo);
    }
    /**
     * 达到正八品
     */
      export function analyticsReachEight():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_REACH_EIGHT,eventInfo);
    }
    /**
     * 首次充值
     */
      export function analyticsFirstPayment():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_FIRST_PAYMENT,eventInfo);
    }
    /**
     * /点击储值按钮
     */
      export function analyticsClickPayment():void
    {
       
        var eventInfo:any = {};
        trackEvent(TRACK_CLICK_PAYMENT,eventInfo);
    }

    /**
     * /点击储值按钮
     */
      export function analyticsMainUi():void
    {
       
        var eventInfo:any = {};
        trackEvent(EVENT_NAME_GAME_MAIN_INTERFACE,eventInfo);
    }


    /**
     * /点击创建角色按钮
     */
      export function analyticsClickCreateBtn():void
    {
       
        var eventInfo:any = {};
        let gameuserInfo:any={};
        gameuserInfo.userName="";
        gameuserInfo.userId=PlatformManager.userId;
        gameuserInfo.serverId=ServerCfg.selectServer.zid;
        gameuserInfo.serverName=ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName=Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId=GameData.userId.toString();
        gameuserInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        gameuserInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        // let customEventName = {eventName:eventName,eventKey:eventKey,eventValue:eventValue}
        // gameuserInfo.customEventName=customEventName;
        trackEvent(TRACK_CLICK_CREATEBTN,gameuserInfo);
    }

     /**
     * /微信充值统计
     */
      export function analyticsWXPay(proid:string):void
    {
       
        var eventInfo:any = {};
        let gameuserInfo:any={};
        gameuserInfo.userName="";
        gameuserInfo.userId=PlatformManager.userId;
        gameuserInfo.serverId=ServerCfg.selectServer.zid;
        gameuserInfo.serverName=ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName=Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId=GameData.userId.toString();
        gameuserInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        gameuserInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        // let customEventName = {eventName:eventName,eventKey:eventKey,eventValue:eventValue}
        // gameuserInfo.customEventName=customEventName;
        gameuserInfo.payWhat=proid;
        gameuserInfo.RemainingIngot=Api.playerVoApi.getPlayerGem();
        trackEvent(TRACK_WX_PAY,gameuserInfo);
    }

    /**
     * 登录统计
     */
    const TRACK_LOGIN:string="-1";
    /**
     * 新手引导步数统计
     */
    const TRACK_NEW_GUIDE:string="-2";
    /**
     * 注册统计
     */
    const TRACK_REGISTER:string="-3";
    /**
     * 支付统计
     */
    const TRACK_PAY:string="-4";
    /**
     * 升级统计
     */
    const LEVEL_UP:string="-5";
    /**
     * 游戏loading完成统计
     */
    const TRACK_LOAD_END:string="-6";

    /**
     * 新手引导完成
     */
    const TRACK_TUTORIAL_END = "-7";
     /**
     * 解锁第一章（还有其他自定义））
     */
    const TRACK_UNLOCK_FIRST_CHAPTER = "-8";
     /**
     * /解锁牢房
     */
    const TRACK_UNLOCK_CELL = "-9";
     /**
     * 达到正九品
     */
    const TRACK_REACH_NINE_GRADE = "-10";
     /**
     * 达到从八品
     */
    const TRACK_REACH_VICE_EIGHT_GRADE = "-11";
     /**
     * 解锁寻访
     */
    const TRACK_UNLOCK_SEARCH = "-12";
     /**
     * 达到正八品
     */
    const TRACK_REACH_EIGHT = "-13";
     /**
     * 首次充值
     */
    const TRACK_FIRST_PAYMENT = "-14";
     /**
     * 点击储值按钮
     */
    const TRACK_CLICK_PAYMENT = "-15";
     /**
     * 点击储值按钮
     */
    const EVENT_NAME_GAME_MAIN_INTERFACE = "-16";
    // /**
    //  * 选服统计 （点登录按钮直接发）
    //  */
    // const TRACK_SELECT_SERVER = "-16";
     /**
     * 点击创建角色按钮
     */
    const TRACK_CLICK_CREATEBTN = "-17";

    /**
     * 微信支付统计
     */
    const TRACK_WX_PAY = "-18";

    export function checkAttention():boolean
    {
        try
        {   
            return RSDK.checkFollow();
        }
        catch(e)
        {
            return false;
        }
    }

    export function checkHasCircleFunc(callback):void
    {
        try
        {   
            RSDK.callSdk("hasCircleFunc", {}, callback);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    export function showCircle():void
    {
        try
        {
           RSDK.callSdk("showCircle", {}, function (code) {
                    console.log(code)
                });  
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/showCircle error");
        }
    }

    //qq玩吧 微信公众号
    export function isFollowingTxAccount(callback):void
    {
        try
        {   
            RSDK.callSdk("isFollowingTxAccount", {}, callback);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    export function showTxQRDialog():void
    {
        try
        {
           RSDK.callSdk("showTxQRDialog", {}, function (code) {
                    console.log(code)
                });  
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/showTxQRDialog error");
        }
    }



    export function attention(callback:(data:any)=>void):void
    {
        try
        {
            RSDK.requestFollow(callback);
        }
        catch(e)
        {
            console.log("调用RSDK.requestFollow");
        }
    }



    /** 实名认证开关 */
    export function checkRealname(callback:(result:boolean)=>void):void
    {
        try
        {
            RSDK.callSdk("checkRealNameAuth", null, callback)  
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/checkRealNameAuth error");
        }
    }

    /** 实名认证  是否认证过 */
    export function ifRealNameAuth(callback:(result:boolean)=>void):void
    {
        try
        {
            RSDK.callSdk("ifRealNameAuth", null, callback)  
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/ifRealNameAuth error");
        }
    }
    /** 实名认证调起注册界面 */
    export function getRealNameAuth(callback:(data:string)=>void):void
    {    
        try
        {
            RSDK.callSdk("getRealNameAuth",null, callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/getRealNameAuth error"); 
        } 
    } 

    export function callSdk(action:string, data:any, callback:Function):void
    {
        RSDK.callSdk(action, data, callback);
    }
    /** 查询账号绑定状态 */
    export function bindAccountStatus():void
    {
        rsdkclientplugin.bindAccountStatus();
    }

    /** 调用cover的设置背景 */
    export function callBackDrop():void
    {
        try
        {
            RSDK.callSdk("callBackDrop", {url:"https://h5.qzone.qq.com/bgstore/detail/130859?_wv=2098179&from=adv&page=1&router=detail&coverid=130859&_proxy=1"}, null);
        }
        catch(e)
        {
            console.log("调用RSDK.callSdk callBackDrop error");
        }
    }
    /**
     * 检测是否已设置了cover背景
     */
    export function checkBackDrop(callback:(result:boolean)=>void):void
    {
        try
        {
            RSDK.callSdk("checkBackDrop", {cover_id:"130859"}, callback);
        }
        catch(e)
        {
            console.log("调用RSDK.callSdk checkBackDrop error");
        }

    }

    /**
     * 返回值：0：不显示分享按钮，1：显示分享按钮；2，显示分享按钮,游戏内指向右上角；3，显示分享按钮，点击分享按钮调用cp的默认提示分享方法；
     */
    export function checkShare():number
    {
        try
        {
            return RSDK.checkShare();
        }
        catch(e)
        {
            return 0;
        }
    }

    /**
     *  获取渠道客服类型：0：游戏自己处理；1：sdk客服页面（游戏调用 customerService）；2：返回qq客服信息，（游戏调用 getCustomerServiceData）
     */
    export function getCustomerServiceType():number
    {
        try
        {
            return RSDK.getCustomerServiceType();
        }
        catch(e)
        {
            return 0;
        }
    }

    /**
     * 是否能创建应用桌面快捷方式，true：显示发送桌面按钮，false：不显示按钮
     */
    export function checkDesktop():boolean
    {
        try
        {
            return RSDK.checkDesktop();
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     * * 是否已经关注过，true：有关注功能；false：无关注功能
     */
    export function hasFollow():boolean
    {
        try
        {
            console.log("QAZ hasFollow "+RSDK.hasFollow());
            return RSDK.hasFollow();
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     *  callback 返回 data 格式{gameName:"游戏名称",tel:"客服电话",qq:"qq群号"}
     */
    export function getCustomerService(callback:(data:any)=>void):void
    {
        try
        {
            RSDK.getCustomerServiceData(callback);
        }
        catch(e)
        {
            console.log("调用RSDK.getCustomerServiceData error");
        }
    }

    export function requestDesktop(data:any,callback:Function,callbackThisObj:any):boolean
    {   
        try
        {
            return RSDK.requestDesktop(data,callback.bind(callbackThisObj));
        }
        catch(e)
        {
            return false;
        }
        
    }
    export function sqSDKPresentUserCenterView()
    {   
        try
        {
            if(PlatformManager.checkIsKRSp()&&PlatformManager.checkIsWeiduan())
            {
                rsdkclientplugin.sqSDKPresentUserCenterView();
            }
             
        }
        catch(e)
        {
           
        }
        
    }

      /**
     * 调用Naver
     */
    export function callNaver():void
    {
        try
        {
            RSDK.callSdk("sqSDKPresentNaverSDKMainView", {}, (result:boolean)=>void{});
        }
        catch(e)
        {
            console.log("调用RSDK.callSdk 调用Naver error");
        }

    }

     /**
     * 调用日本用户中心
     */
    export function callUserCenter():void
    {
        try
        {
            RSDK.callSdk("sqSDKPresentUserCenterView", {}, (result:boolean)=>void{});
        }
        catch(e)
        {
            console.log("调用RSDK.callSdk 调用callUserCenter error");
        }

    }

     /** 微信打开更多游戏路径 */
    export function showMoreGame():void
    {    
        try
        {
            RSDK.callSdk("showMoreGame",{}, null)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/showMoreGame error"); 
        } 
    } 

      /** 越南第三方支付 */
    export function payInThird():void
    {
        
        try
        {
            let serverId  = ServerCfg.selectServer.zid
            RSDK.callSdk("payInThird",{serverId}, null)
            console.log("QAZ payInThird callsdk22 ");
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/payInThird error"); 
        } 
    } 

    function formatChannelId(data:any):void
    {   
    
        if(PlatformManager.checkIsMmSp()&&App.DeviceUtil.isIOS())
        {
            data.channelId="1003011002";
        }
    }
    /**
     * 门客获得等专用的分享方法
     */
    export function guideShare(shareContent, callback) {        
        // if (!shareId) {
        //     shareId = "000";
        // }

        // App.ShareGuideUtil.sharingId = shareId;
        // RSDK.setShareInfo(shareContent, GameData.userId.toString());
        if (PlatformManager.checkIsWanbaSp()) {
            shareContent.title = "皇上快点";
            shareContent.desc = "让好友看看你的女人有多美！";
        }
        if (PlatformManager.checkIsBaiduSp()) {
            shareContent.title = "皇上快点";
            shareContent.desc = "这游戏真的省钱 玩了1个月都没充值 原来当官的游戏都这么爽！ 3天就当王爷了！";
            shareContent.imageurl = "https://gd-h5ly-web01.leishenhuyu.com/share/baidushareicon.png";
        }
        if (PlatformManager.checkIsQQXYXSp()) {
            shareContent.title = "快来测试一下你的桃花运";
            // shareContent.desc = "有两个格格都想嫁给你 ";
            shareContent.imageurl = "https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg";
        }
        if (shareContent.shareType == App.ShareGuideUtil.SHARETYPE_SHARE_TWITTERDAILY) {
            // 日本twitter每日分享
            // shareContent.title = "100万ダウンロード突破！人気RPGゲーム『日替わり内室』貴方だけの皇帝ライフを始めよう";
            let picid = App.MathUtil.getRandom(1,10);
            shareContent.link = "https://go.onelink.me/Sslt/gameshare";
            shareContent.title = "人気RPGゲーム『日替わり内室』貴方だけの皇帝ライフを始めよう！門客名将を招き、帝王争奪に参加し、天下を治める王を目指せ！性格・容姿思いのまま、美女達とのハーレム生活！";
            shareContent.imageurl = "https://jpgdweb01.37games.com/image/shareimage"+picid+".jpg";
        }
        PlatformManager.analytics37Point("custom_social","share_behavior",1);
        RSDK.share(shareContent,callback);
    }

    // 设置分享信息 门客获得等专用的方法
    export function setShareInfoGuide(shareContent, shareInfo:string, shareId:string): void
    {
        if (!shareId) {
            shareId = "000";
        }
        App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(shareContent, shareInfo + "_" + shareId);
    }
    /**
     * 实名认证
     * 为什么方法名有下划线：因为这个类里关于实名认证的方法太多了，所以直接用了action的名字
     * 这是那个好像每认证一次都要交钱的，真认证。
     */
    export function realname_auth(idcard, name, cb)
    {
        try
        {
            RSDK.callSdk("realname_auth",{idcard:idcard,name:name},cb);
        }
        catch(e)
        {
            return ;
        }
    }
     /** 疯狂显示vip图标 */
    export function showFkVipIcon() {
        try
        {
            if (!showedWxVipIcon) {
                RSDK.callSdk("showFkVipIcon", {mainClass:GameConfig.stage}, ()=>{});
                showedWxVipIcon = true;
            }
        }
        catch(e)
        {
            return false;
        }
    }

      /** 设置大区ID */
    export function initKunlunServer(serverId:number) {
        try
        {
             RSDK.callSdk("initKunlunServer", serverId, ()=>{});
        }
        catch(e)
        {
            return false;
        }
    }
    /**
     * 设置原生包测试api
     * @param param {game_mark: test 其他;;; show_fps:yes/no;;;disable_native_render: yes/no  }key可以没有，没有时候壳子不处理，有key就覆盖值
     */
    export function setRuntime2State(param:{"game_mark"?:string,"show_fps"?:string,"disable_native_render"?:string}):void
    {
        if(App.DeviceUtil.isRuntime2())
        {
            let appParam={"func":"setGameMark","data":param};
            egret.ExternalInterface.call("sendToNative", JSON.stringify(appParam));
        }
    }
     /** 途游进入后台 or 返回前台 回调, 处理声音播放或暂停 */
    export function setGameBackgroundChange(callback:(data:string)=>void):void
    {    
        try
        {
            RSDK.callSdk("setAppBackgroundChangeCallback",{}, callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/setAppBackgroundChangeCallback error"); 
        } 
    } 
    /** 日本开启推送并获取token */
    export function startPush(callback:(data:any)=>void):void
    {
        try {
            RSDK.startPush(callback);
        } catch (e) {
            console.log("调用RSDK.startPush error"); 
        }
    }


    /**
	 * 微信防沉迷
	 */
    export function checkRest(callback:(data:string)=>void):void
    {    
        try
        {
            RSDK.callSdk("checkRest",{space: 5*60, maxGameTime: 60*60}, callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/checkRest error"); 
        } 
    } 
    /**
	 * 玩吧获取当前vip等级
	 */
    export function getWanbaviptequanLevel(callback:(data:string)=>void):void
    {    
        // setTimeout(()=>{
        //     callback("5");
        // }, 1000);
        try
        {
            RSDK.callSdk("qqwbGetVipLevel", {}, function(code,result){
                if(code == 0){
                    //获取当前vip等级
                    let viplevel = result.viplevel;
                    callback(viplevel);
                }else{
                    //获取当前vip等级失败
                    console.log("调用RSDK.callSdk/qqwbGetVipLevel error", code, result); 
                }
            });
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/qqwbGetVipLevel error"); 
        } 
    } 
    /**
	 * 调用ar照相
	 */
    export function openARCamera(cb)
    {
        try
        {
            console.log("openARCamera begin");

            RSDK.callSdk("callClientFunction",{functionName:"openARCamera"},function(data,data1){
                console.log("openARCamera callback");
                cb(data,data1);
            });
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/openARCamera error"); 
        } 
    } 
    /**
	 * 检查是否有ar照相功能
	 */
    export function checkClientHasARCameraFunction():void
    {
        try
        {
            console.log("checkClientHasFunction openARCamera begin");
            let hasAR = RSDK.callSdk("checkClientHasFunction", {functionName:"checkClientHasFunction"}, function(code,result){
                console.log("checkClientHasFunction callback", code, result);
            });
            console.log("hasAR", hasAR);
            return hasAR;
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/checkClientHasFunction openARCamera error"); 
        } 
    } 

        /**
	 * 调用ar照相
	 */
    export function takePhoto(data,cb)
    {
        try
        {
            console.log("takePhoto begin");

            RSDK.callSdk("callClientFunction",{functionName:"takePhoto",data:{imgData:data} },function(){
                console.log("takePhoto callback");
                cb();
            });
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/takePhoto error"); 
        } 
    } 
    export function switchCamera(cb)
    {
        try
        {
            console.log("switchCamera begin");

            RSDK.callSdk("callClientFunction",{functionName:"switchCamera"},function(){
                console.log("switchCamera callback");
                cb();
            });
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/switchCamera error"); 
        } 
    } 
    export function closeARCamera(cb)
    {
        try
        {
            console.log("closeARCamera begin");

            RSDK.callSdk("callClientFunction",{functionName:"closeARCamera"},function(){
                console.log("closeARCamera callback");
                cb();
            });
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/closeARCamera error"); 
        } 
    } 

    /** 玩吧 判断某一功能在当前运行的平台上是否可用。 */

    export function qqwbCanIShow(funcName:string):boolean
    {
        try
        {   
            let qqwbCanIShow ;
            qqwbCanIShow = RSDK.callSdk("qqwbCanIShow", funcName, function(code,result){
                console.log("qqwbCanIShow callback", code, result);
            });
            console.log("qqwbCanIShow"+qqwbCanIShow)
            return qqwbCanIShow;
        }
        catch(e)
        {
            console.log(e);
        }
    }

     /** 微信疯狂 ### 1 投诉入口 */
    export function createFeedbackButton(data:any) {
        try
        {
             RSDK.callSdk("createFeedbackButton", data, ()=>{});
        }
        catch(e)
        {
            return false;
        }
    }
    /** 微信疯狂 ### 1 投诉入口 说明：切换投诉按钮的状态，可以将按钮显示或隐藏起来 { status: "hide" }, { status: "show" }*/
    export function feedbackButtonToggle(status:string) {
        try
        {
             RSDK.callSdk("toggle", { status: status}, ()=>{});
        }
        catch(e)
        {
            return false;
        }
    }

    export function jumpToQQApp():void
    {
        try
        {
            RSDK.callSdk("jumpToQQApp",{}, null)
        }
        catch(e)
        {
            console.log("调用RSDK.jumpToQQApp");
        }
    }

    /**
     * 融合包切渠道
     * @param subappId 目标渠道统计ID
     */
    export function setABTestFlag(subappId:string):void
    {
        RSDK.callSdk("callClientFunction",{functionName:"setABTestFlag",data:{sub_app_id:subappId}},()=>{});
    }
}