namespace RSDKHelper 
{
    export let isInit:boolean=false;
    /** 是否已经显示了疯狂vip的图标 */
    let showedWxVipIcon = false;
	export function init():void
	{
        LoginMgr.setLog("start init rsdk");
        StatisticsHelper.reportLoadData("2_1");
        let content:{title : string, desc : string};
        if(App.DeviceUtil.IsHtml5())
        {
            window["shareTitle"]= (content&&content.title)?content.title:"想成就一番伟业么？";
            window["shareDesc"]= (content&&content.desc)?content.desc:"开服是个芝麻官，七天之后当王爷！";
            window["shareImgUrl"]="http://gt-fkylc-cdn.raygame3.com/gt_fkylc/shareicon.png";
        }
        let initInfo:any = {privateKey:"CC6EC77846BA604D8A32F15332A5F3D9",debug:false};
        if (PlatMgr.checkIsWxSp()) {        
            initInfo.r_host = "https://lz-weixin-sdk02.leishenhuyu.com";
            initInfo.r_bid = "533002000";
            initInfo.r_plat = "h5fkwx-533002001";
            initInfo.game_version = "1.0.5";
            // initInfo.privateKey = "CC6EC77846BA604D8A32F15332A5F3D9";
            // initInfo.appid = "wx85e2e8cd59d80fec"
        } 
        else if (App.DeviceUtil.isWyw()) {        
            initInfo.r_host = "https://gd-lm-sdk.raygame3.com";
            initInfo.r_bid = "17011000";
            initInfo.r_plat = "h5limi-17011001";
        }
        else if(String(App.CommonUtil.getOption("r_bid")).indexOf("1003")==0)
        {
            initInfo.privateKey="E8F3736B99C08BF21744D3653B3F9320";
        }

        if(PlatMgr.checkIsWanbaSp()&&(!window["OPEN_DATA"])&&App.CommonUtil.getOption("rsdk_param")=="{}")
        {
            if(window["SDK"]&&window["SDK"].CommonUtil&&!window["SDK"].CommonUtil._initParams)
            {
                window["SDK"].CommonUtil._initParams={rsdk_param: "{}"};
            }
        }
		RSDK.init(initInfo,function(code,data)
        {   
            StatisticsHelper.reportLoadData("2_2");
            isInit=true;
            let logStr="rsdk init result"+code;
            LoginMgr.setLog(logStr);
            console.log(logStr);
            // login();
            App.MsgHelper.dispEvt(MsgConst.RSDK_INIT_SUCCESS);
            PlatMgr.client.setAppForegroundStatusChange();
            PlatMgr.analyticsLoadEnd();
            //LZ初始化成功直接调登录
            PlatMgr.login();
            PlatMgr.setAppOnBackHandler();
            
        }); //测试

	}

    export function login():void
    {
        RSDK.login("",function(code,data)
        {
            let logStr="rsdk login result:"+code;
            LoginMgr.setLog(logStr);
            console.log(logStr+"::"+App.StringUtil.toString(data));
            if(Number(code)==0)
            {
                PlatMgr.userId=data.userId;
                PlatMgr.prefix=data.prefix;
                PlatMgr.userType=data.userType;
                PlatMgr.token=data.token;
                PlatMgr.isLogin=true;
                PlatMgr.nickname = data.nickname;
                PlatMgr.avatar = data.avatar;
                PlatMgr.inviter_pid = data.inviter_pid;
                if (data.inviter_uid) {
                    let customData = data.inviter_uid.split("_");                
                    PlatMgr.inviter_uid = customData[0];
                    PlatMgr.fromShareId = customData[1];
                }
                // alert("头像::"+data.avatar + "登录::"+code+"::"+App.StringUtil.toString(data));
                // App.MsgHelper.dispEvt(MsgConst.PLAT_LOGIN_SUCCESS);
                LoginMgr.loginGame();

            }
            else if(Number(code)==-1)
            {
            }
            else if(Number(code)==-2)
            {
            }
            else if(Number(code)==1001)
            {
                if(PlatMgr.isSupportBindPhone())
                {
                    GameData.kkkIsBindIos = String(data.msg);
                    //是否绑定过手机 1已绑定,0未绑定
                    App.MsgHelper.dispEvt(MsgConst.IOS_BINDPHONE,{"result":String(data.msg)});
                }
               
            } 
            else if(Number(code)==1002)
            {
                PlatMgr.kkk_age=Number(data.msg);
            }
            else if(Number(code)==1003)
            {
                console.log("checkserver:"+code+"  "+data.msg);
                if (Number(data.msg) == 1) {
                    StatisticsHelper.reportLoadData("5_2");
                    App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
                }
                else
                {
                    if(data.info)
                    {
                        ViewController.getInstance().openView(ViewConst.ERRORPOPUPVIEW,{msg:data.info,title:LangMger.getlocal("sysTip")});
                    }
                }
            }
            else if(Number(code)==1004)
            {
                console.log("check account bind:"+code+"  "+data.msg);
                // if (Number(data.msg) == 1) {
                // App.MsgHelper.dispEvt(MessageConst.MESSAGE_NOTICE_BIND, data.msg);
                // }
            }
            else if(Number(code)==1006)
            {
                let infoTab:any = JSON.parse(data.msg);
                console.log("google push:"+infoTab.googlePushToken);   
                GameData.pushToken = infoTab.googlePushToken;
                // if ( GameData.pushToken && !PlatformManager.checkIsIOSShenheSp())
                // {
                //     NetManager.request(NetRequestConst.REQUST_USER_SETPUSHTOKEN,{pushToken:GameData.pushToken});
                // }
            }
            else if(Number(code)==1007)
            {
                console.log("money:"+data.msg);
                if(data.msg)
                {
                    let platMoney:{"productNo":string,"price":string,"currency":string}[]=JSON.parse(data.msg);
                    let l:number=platMoney.length;
                    for(let i:number=0;i<l;i++)
                    {
                        GameData.platMoney=platMoney[i]?platMoney[i].currency:GameData.platMoney;
                        if(platMoney[i]&&platMoney[i].productNo)
                        {
                            if(!GameData.platMoneyData)
                            {
                                GameData.platMoneyData={};
                            }
                            GameData.platMoneyData[platMoney[i].productNo]=platMoney[i];
                        }
                    }
                    if(PlatMgr.checkisLocalPrice())
                    {
                        Config.RechargeCfg.formatLocalPriceCfg();
                    }
                }
            }
            else if(Number(code)==1010)
            {
                console.log("money 1010  : "+data.msg);
                if(data.msg)
                {   
                    let msgObj = JSON.parse(data.msg);
                    GameData.platMoneyData2=msgObj;

                    if(PlatMgr.checkisLocalPrice())
                    {
                        Config.RechargeCfg.formatLocalPriceCfg();
                    }
                }
            }

        },function(code,data){
            console.log("logout::"+code);
            if(Number(code)==0)
            {
                PlatMgr.isLogin=false;
                App.MsgHelper.dispEvt(MsgConst.LOGOUT);
                // if(!LoginView.isShowed)
                // {
                    LoginMgr.changeAccount();
                // }
            }
        });
    }

    export function logout():void
    {
        RSDK.logout();
    }

    function getProductNameById(pid: string, gemCost: number): string {
        let p_name: string = "";
        p_name = LangMger.getlocal("shopbuyspecial" + pid);
        if (!p_name || p_name == "" || p_name == "**") {
            p_name = Config.ShopCfg.getDiscountNameByCost(pid);
        }
        if (!p_name || p_name == "" || p_name == "**") {
            p_name = gemCost + LangMger.getlocal("gemName");
        }
        return p_name;
    }

    export function pay(productId: string, callback: Function, callbackThisObj: any):void
    {

        let pdid:string=productId;//g1,g2
        let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        // if(PlatMgr.checkIsWanbaSp())
        // {
        //     let data=window["OPEN_DATA"];
        //     let platform:string=data.platform;
        //     let app:string=data.qua.app;
        //     productId=Config.RechargeCfg.wanbaCfg[productId]["pid"+platform];
        //     window["__payError"] = function(){
        //         //支付失败执行
        //         App.CommonUtil.showTip(LangMger.getlocal("payFailTip"));
        //     }

        //     window["__payClose"] = function(){
        //         //关闭对话框执行,IOS下无效
        //         App.CommonUtil.showTip(LangMger.getlocal("payCancelTip"));
        //     }
        // }
        // else
        // {
            if(itemCfg.orderid)
            {
                productId=itemCfg.orderid;
            }
        // }
        let payInfo=new productInfo();
        if(itemCfg.gemCost)
        {
            payInfo.coinNum=itemCfg.gemCost.toString();
        }
        payInfo.currency = RSDKHelper.currency();
        payInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        // payInfo.gameUserName=Api.playerVoApi.getPlayerName();
        payInfo.price=itemCfg.cost.toString();
        let data:any={gid:itemCfg.id};
        payInfo.privateData=JSON.stringify(data);
        payInfo.productCount="1";
        payInfo.productId=itemCfg.orderid||productId;
        // payInfo.productName=itemCfg.gemCost+LangMger.getlocal("gemName");
        payInfo.productName = getProductNameById(pdid, itemCfg.gemCost);
        payInfo.productType="1";
        // payInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        // payInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        payInfo.serverId=GameData.curZoneID+"";
        payInfo.serverName=ServerCfg.selectServer.sname?ServerCfg.selectServer.sname:ServerCfg.selectServer.zid;
        console.log("gamepay:"+PlatMgr.getAppid()+"::"+pdid);
        if(PlatMgr.getAppid()=="17027001" || PlatMgr.getAppid()=="17027006")
        {
            if(PlatformCfg.th3RechargeCfg.indexOf(pdid)>-1)
            {
                payInfo["other"]="google";
                console.log("gamepay::"+payInfo["other"]);
            }
        }
        realPay(payInfo, itemCfg, callback, callbackThisObj);
    }
    function realPay(payInfo: productInfo, itemCfg: Config.RechargeItemCfg, callback: Function, callbackThisObj: any):void
    {
        if (GameData.payWaitSendDic[itemCfg.id] && (egret.getTimer() - Number(GameData.payWaitSendDic[itemCfg.id])< GameData.payWaitSendCD))
        {
            StatisticsHelper.reportGameLog("payWaitSend:" + itemCfg.id);
            return;
        }
        // console.log('****** 充值信息 ******')
        // console.log(payInfo)
        // payInfo.price = '0.01'
        if (!GameData.payWaitSendDic[itemCfg.id] || (egret.getTimer() - Number(GameData.payWaitSendDic[itemCfg.id])>=GameData.payWaitSendCD)) 
        {
            GameData.payWaitSendDic[itemCfg.id] = egret.getTimer();
        }
        RSDK.pay(payInfo,(code:string,data:any)=>{
            console.log("pay result:"+code);
            // if (String(code) == "0")
            // {
            //     if (!GameData.payWaitSendDic[itemCfg.id] || (egret.getTimer() - Number(GameData.payWaitSendDic[itemCfg.id])>=GameData.payWaitSendCD)) 
            //     {
            //         GameData.payWaitSendDic[itemCfg.id] = egret.getTimer();
            //     }
            // }
            if(callback)
            {
                callback.call(callbackThisObj,{code:code});
            }
            if(String(code)=="-3")
            {
                ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW,{
                    title:LangMger.getlocal("sysTip"),
                    msg:LangMger.getlocal("userisInPayingTip"),
                    handler:RSDKHelper,
                    needCancel:false
                });
                return;
            }
            if(PlatMgr.checkIsWanbaSp())
            {
                if(data&&data.balance!=null)
                {
                    let balance:number=Number(data.balance);
                    if(isNaN(balance)==false)
                    {
                        if(Config.RechargeCfg.getMoneyName())
                        {
                            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW,{msg:LangMger.getlocal("paySuccessLeftMoneyTip",[String(itemCfg.cost*10),String(itemCfg.gemCost),String(balance),Config.RechargeCfg.getMoneyName()]),title:LangMger.getlocal("sysTip"),touchMaskClose:true});
                        }
                    }
                }
            }
        });
    }
    //检测sdk是否有广告功能；
    export function checkHasAd(obj:{callbackSucceed: Function,callbackFailure: Function},callbackThisObj: any)
    {
        RSDK.checkHasAd({
            type:"video",
            onCheckEnd :(data)=>{
                if(data == "0"){
                    obj.callbackSucceed.call(callbackThisObj);
                }else{
                    obj.callbackFailure.call(callbackThisObj);
                }
            }
        });
    }

    export function showAd(roleId : string = "", obj:{callbackSucceed: Function,callbackFailure: Function,callbackError: Function},callbackThisObj: any):void
    {
        console.log("game:showAd:"+egret.getTimer());
        roleId = PlatMgr.userId;
        RSDK.showAd({
            roleId:roleId,
            type: "video",
            onSuccess: function () {
                console.log("game:showAd succ");
                //广告播放成功并看完了
                console.log("game:showAd succ:"+egret.getTimer());
                obj.callbackSucceed.call(callbackThisObj)
            },
            onFail: function () {
                console.log("game:showAd fail");
                //广告未看完就关闭了
                console.log("game:showAd fail:"+egret.getTimer());
                obj.callbackFailure.call(callbackThisObj)
            },
            onError: function () {
                console.log("game:showAd error");
                //广告播放失败了
                console.log("game:showAd error:"+egret.getTimer());
                obj.callbackError.call(callbackThisObj)
            },
        });
    }
    export function share(callback:(code:string,data:any)=>void):void
    {
        let desc = LangMger.getShareDesc();
        let content:{title:string,desc:string,imageurl?:string,shareType?:string}={title : desc.title ||"快来打爆他的鸟", desc : desc.desc || "愤怒小鸟，魔性对战，谁的鸟更硬？", imageurl:desc.imageurl};
        if(PlatMgr.checkIsWxSp())
        {
            content.shareType="share_invite";
        }
        content.imageurl = `http://wxmini-resource.hortorgames.com/background-image/3695c671-7c0a-4769-885f-012005668ff3-1590397706.jpg`;
        let shareId = "000";
        if(desc.shareId){
            shareId = desc.shareId;
        }
        // App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(content, Api.UserinfoVoApi.getUid().toString() + "_" + shareId);
        RSDK.share(content,callback);
    }
    // 设置分享信息
    export function setShareInfo(shareInfo:string): void
    {
        let desc = LangMger.getShareDesc();
        let content:{title:string,desc:string,imageurl?:string,shareType?:string}={title : desc.title || "快来打爆他的鸟", desc : desc.desc || "愤怒小鸟，魔性对战，谁的鸟更硬？", imageurl:desc.imageurl};
        if(PlatMgr.checkIsWxSp())
        {
            content.shareType="share_invite";
        }
        let shareId = "000";
        content.imageurl = `http://wxmini-resource.hortorgames.com/background-image/3695c671-7c0a-4769-885f-012005668ff3-1590397706.jpg`;
        if (desc.shareId) {
            shareId = desc.shareId;
        }
        // App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(content, shareInfo + "_" + shareId);
    }
    export function fbShare(callback:(code:string,data:any)=>void):void
    {
        console.log("QAZ fbShare");
        let desc = LangMger.getShareDesc();
        let content:{title:string,desc:string,imageurl:string,link:string}={title : desc.title || "一個官人七個妻 真實體驗古風官場生活",
        desc : desc.desc || "好男兒生當作人傑，三妻四妾，封王拜侯，爭雄稱霸!\n春風得意馬蹄疾，一日看盡長安花！快意一生！",
        imageurl:"http://pic.heyyogame.com/panwuxi/picture/201711220fa85dce39574e4e3640ad85370e16ed.jpg",
        link:"https://adv.heyyogame.com/adv.jsp?gamecode=GD&partnerName=share&advcode=GD_yypV_414"};
        RSDK.share(content,callback);
    }
    export function krShare(callback:(code:string,data:any)=>void):void
    {
        console.log("QAZ krShare");
        let desc = LangMger.getShareDesc();
        let content:{title:string,desc:string,imageurl:string,link:string}={title : desc.title || "역천인 - 이제까지 없던 정통 사극 RPG!",
        desc: desc.desc || "역사 속 위대한 위인, 경국지색의 미녀들과 함께 써나가는 당신만의 장대한 서사시. 신분의 한계를 뛰어넘어 왕이 되어라!",
        imageurl:"https://yccs.mayngames.co.kr/img/fbshare1.jpg",
        link:"https://yccs.mayngames.co.kr/fbshare"};
        RSDK.share(content,callback);
    }
    /**
     * 门客获得等专用的分享方法
     */
    export function guideShare(shareContent, callback, shareId) {        
        if (!shareId) {
            shareId = "000";
        }
        // App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(shareContent, Api.UserinfoVoApi.getUid().toString() + "_" + shareId);
        RSDK.share(shareContent,callback);
    }
    // 设置分享信息 门客获得等专用的方法
    export function setShareInfoGuide(shareContent, shareInfo:string, shareId:string): void
    {
        if (!shareId) {
            shareId = "000";
        }
        // App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(shareContent, shareInfo + "_" + shareId);
    }
    /**
     * 
     * @param code -1 登录统计  -2新手引导步数 -3 注册统计 -4 支付统计 -5 升级统计 -6 loading完成统计
     * @param info 
     */
    function trackEvent(code:string,info:any):void
    {
        if(PlatMgr.checkIsTestSp())
        {
            console.log("注意test地址不统计");
            return;
        }
        try
        {
            RSDK.trackEvent(code,info);
            // console.log('%c ****** 发送统计数据 ******', 'color:#00ff00');
            // console.log(code, info);
            // console.log('%c ********************', 'color:#00ff00');
        }
        catch(e)
        {
            App.LogUtil.log("前端统计报错:"+code);
        }
    }

    /**登陆统计 */
    export function analyticsLogin():void
    {
        try
        {
            if(PlatMgr.checkIsWanbaSp())
            {
                let isReport:boolean=true;
                // if(GameData.wanbaEvenyNumReport)
                // {
                //     if(Api.UserinfoVoApi.getUid()%GameData.wanbaEvenyNumReport==0)
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
        var eventInfo: ana_login_params = {
            userId: '',
            gameUserId: '',
            gameUserName:'',
            loginType: 0,
            serverId: 0,
            registerTime: 0
        };
        eventInfo.userId=PlatMgr.userId;
        eventInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        eventInfo.gameUserName=Api.UserinfoVoApi.getName()?Api.UserinfoVoApi.getName():Api.UserinfoVoApi.getUid().toString();
        // eventInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        // eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        // eventInfo.serverName=ServerCfg.selectServer.sname;
        // eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        // eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        // eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        // eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        // eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType=0;
        eventInfo.serverId = GameData.curZoneID;
        eventInfo.registerTime = GameData.regdt;

        if (PlatMgr.checkIsWxSp()) {
            // 微信平台需要附加一些参数
            eventInfo.loginTime = GameData.logints;
            eventInfo.rank = "";
            eventInfo.diamond = 0;
            eventInfo.allmoney = 0;
            eventInfo.energy = Api.UserinfoVoApi.getScore();
            eventInfo.money1Consume = 0
        }

        trackEvent(TRACK_LOGIN,eventInfo);
        console.log("QAZ analyticsLogin"+TRACK_LOGIN);
    }

    /**新手引导统计 第几步 */
    export function analyticsNewGuide(step:number|string):void
    {
        var eventInfo:any = {};
        eventInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        eventInfo.gameUserName=Api.UserinfoVoApi.getName()?Api.UserinfoVoApi.getName():Api.UserinfoVoApi.getUid().toString();
        eventInfo.serverId = GameData.curZoneID;
        eventInfo.registerTime = GameData.regdt;
        eventInfo.step=String(step);
        trackEvent(TRACK_NEW_GUIDE,eventInfo);
    }

    /**注册统计 */
    export function analyticsRegister():void
    {
        if(PlatMgr.checkIsWanbaSp())
        {
            let isReport:boolean=true;
            // if(GameData.wanbaEvenyNumReport)
            // {
            //     if(Api.UserinfoVoApi.getUid()%GameData.wanbaEvenyNumReport==0)
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
        eventInfo.userId=PlatMgr.userId;
        eventInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        eventInfo.gameUserName=Api.UserinfoVoApi.getName()?Api.UserinfoVoApi.getName():Api.UserinfoVoApi.getUid().toString();
        // eventInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        // eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        // eventInfo.serverName=ServerCfg.selectServer.sname;
        // eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        // eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        // eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        // eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        // eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType=1;
        eventInfo.serverId = GameData.curZoneID;
        eventInfo.registerTime = GameData.regdt;
        trackEvent(TRACK_REGISTER,eventInfo);
        console.log("QAZ analyticsRegister"+TRACK_REGISTER);
        if(PlatMgr.checkIsTWBSp()&&!PlatMgr.checkIsTest())
        {
            StatisticsHelper.report_register_tw();
        }
    }

    /**支付统计 */
    export function analyticsPay(id:string,orderId:string):void
    {
        let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(id);
        var eventInfo:any={};
        eventInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        eventInfo.serverId = GameData.curZoneID;
        eventInfo.registerTime = GameData.regdt;
        eventInfo.gameUserName=Api.UserinfoVoApi.getName();
        // eventInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        // eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverName=ServerCfg.selectServer.sname;
        eventInfo.orderId=orderId;
        eventInfo.price=itemCfg.cost;
        eventInfo.coinNum=itemCfg.gemCost
        eventInfo.productCount="1";
        eventInfo.productType="1";
        eventInfo.currency = RSDKHelper.currency();
        trackEvent(TRACK_PAY,eventInfo);
        if(PlatMgr.checkIsTWBSp()&&!PlatMgr.checkIsTest())
        {
            StatisticsHelper.report_pay_tw(itemCfg.cost);
        }
    }

    /**升级统计 */
    export function analyticsLevelup(){
        App.LogUtil.log("__levelup_event__");
        let gameuserInfo:any={};
        gameuserInfo.gameUserName=Api.UserinfoVoApi.getName()?Api.UserinfoVoApi.getName():Api.UserinfoVoApi.getUid().toString();
        gameuserInfo.userId=PlatMgr.userId;
        gameuserInfo.serverName=ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName="";
        gameuserInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        gameuserInfo.roleLevel="";
        gameuserInfo.roleVipLevel="";
        // gameuserInfo.registerTime=Api.GameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance="";
        gameuserInfo.guild_name="";
        gameuserInfo.guild_id="";
        gameuserInfo.fighting="";
        gameuserInfo.loginType=2;
        gameuserInfo.serverId = GameData.curZoneID;
        gameuserInfo.registerTime = GameData.regdt;
        trackEvent(LEVEL_UP,gameuserInfo);

        // if(PlatformManager.checkIsTWBSp()&&PlatformManager.checkIsTest()==false&&Api.playerVoApi.getPlayerLevel()==4)
        // {
        //     StatisticsHelper.report_uplevel4_tw();
        // }
    }
    export function analyticsVipup(){

        // let key = "achieved_VIP"+Api.playerVoApi.getPlayerVipLevel();
        // analyticsByHyKey(key);
    }
    

    /**
     * 港台cost2000统计
     */
    export function analyticsCost2000(){
        analyticsByHyKey("cost_2000")
    }

    export function analyticsByHyKey(key:string)
    {
        console.log("调用analyticsByHyKey "+key); 
        try
        {
            let gameuserInfo:any={};
            gameuserInfo.userName="";
            gameuserInfo.userId=PlatMgr.userId;
            gameuserInfo.serverName=ServerCfg.selectServer.sname;
            gameuserInfo.gameUserName=Api.UserinfoVoApi.getName()?Api.UserinfoVoApi.getName():Api.UserinfoVoApi.getUid().toString();
            // gameuserInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
            // gameuserInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
            // gameuserInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
            // gameuserInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
            // gameuserInfo.balance=Api.playerVoApi.getPlayerGem().toString();
            // gameuserInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
            // gameuserInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
            // gameuserInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
            gameuserInfo.customEventName=key;
            gameuserInfo.serverId = GameData.curZoneID;
            gameuserInfo.registerTime = GameData.regdt;
            trackEvent(TRACK_TW_COST_2000,gameuserInfo);

            console.log("QAZ analyticsRegister"+TRACK_TW_COST_2000);
        }
        catch(e)
        {
            console.log(key+" error");
        }
    }

    export function analyticsLoadEnd():void
    {
       
        var eventInfo:any = {};
        // eventInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        // eventInfo.gameUserName=Api.playerVoApi.getPlayerName()?Api.playerVoApi.getPlayerName():Api.UserinfoVoApi.getUid().toString();
        // eventInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
        // eventInfo.roleVipLevel=Api.playerVoApi.getPlayerVipLevel().toString();
        // eventInfo.serverName=ServerCfg.selectServer.sname;
        // eventInfo.registerTime=Api.gameinfoVoApi.getRegdt().toString();
        // eventInfo.balance=Api.playerVoApi.getPlayerGem().toString();
        // eventInfo.guild_name=Api.playerVoApi.getPlayerAllianceName();
        // eventInfo.guild_id=Api.playerVoApi.getPlayerAllianceId().toString()=="0"?"":Api.playerVoApi.getPlayerAllianceId().toString();
        // eventInfo.fighting=Api.playerVoApi.getPlayerPower().toString();
        // eventInfo.loginType=0;
        eventInfo.serverId = GameData.curZoneID;
        eventInfo.registerTime = GameData.regdt;
        trackEvent(TRACK_LOAD_END,eventInfo);
    }

    export function analyticsCompleteNewGuide():void
    {
        var eventInfo:any = {};
        eventInfo.gameUserId=Api.UserinfoVoApi.getUid().toString();
        eventInfo.gameUserName = Api.UserinfoVoApi.getName()?Api.UserinfoVoApi.getName():Api.UserinfoVoApi.getUid().toString();
        eventInfo.step=String(9999);
        eventInfo.serverId=GameData.curZoneID;
        eventInfo.registerTime = GameData.regdt;
        try
        {
            trackEvent(TRACK_NEW_GUIDE,eventInfo);
            trackEvent(TRACK_TUTORIAL_END,eventInfo);
        }
        catch(e)
        {
            console.log("analyticsCompleteNewGuide error");
        }
    }

    /**
     * 微信中购买完毕
     */
    export function analyticsWxBuy(info: any) {
        if (PlatMgr.checkIsWxSp()) {
            let __params: ana_WxBuy_params = {
				payWhat: info.payment.itemId,
				Remaininglngot: "0"
			}

            try {
                trackEvent(TRACK_WX_BUY, __params)
            } catch (error) {
                console.log('analyticsWxBuy error')
            }
        }
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
     * 港台cost2000统计
     */
    const TRACK_TW_COST_2000:string="-8";

    /**
     * 微信充值成功
     */
    const TRACK_WX_BUY: string = "-18";

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

    /** 绑定手机号开关 */
    export function checkHasBindPhoneFunc(callback:(result:boolean)=>void):void
    {
        try
        {
            RSDK.callSdk("checkHasBindPhoneFunc", null, callback)  
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/checkHasBindPhoneFunc error");
        }
    }

    /** 绑定手机号  是否绑定过 */
    export function ifBindPhone(callback:(result:boolean)=>void):void
    {
        try
        {
            RSDK.callSdk("ifBindPhone", null, callback)  
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/ifBindPhone error");
        }
    }
    /** 绑定手机号调起绑定界面 */
    export function doBindPhone(callback:(data:string)=>void):void
    {    
        try
        {
            RSDK.callSdk("doBindPhone",null, callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/doBindPhone error"); 
        } 
    } 

    /**
     * 闲徕/闲逸 渠道获取钻石数
    */
    export function getXlSpDiamondNum(callback:(diamondNum:number)=>void):void
    {    
        try
        {
            RSDK.callSdk("diamondNum","", callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/diamondNum error"); 
        } 
    }

    /**
     *  闲逸 调用钻石商城方法
    */
    export function getXySpShowDiamondStore(callback:()=>void):void
    {    
        try
        {
            RSDK.callSdk("h5xyshowDiamondStore","", callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/diamondNum error"); 
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

     /** 微信获取更多游戏路径 */
    export function getMoreGameIcon(callback:(data:string)=>void):void
    {    
        try
        {
            RSDK.callSdk("getMoreGameIcon",{}, callback)
        }
        catch(e)
        {
           console.log("调用RSDK.callSdk/getMoreGameIcon error"+e); 
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
    export function callSdk(action:string, data:any, callback:Function):void
    {
        RSDK.callSdk(action, data, callback);
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
     * 调用Appstore评分
     */
    export function openAppStoreScore():void
    {
        try
        {   
            if (PlatMgr.checkIsRuSp() == true)
            {
                RSDK.callSdk("onAppStoreScore", {title:"Если Вам понравились наша игра",message:"Оставьте нам отзыв."}, ()=>{});
            }
            else
            {
                RSDK.callSdk("onAppStoreScore", {title:"喜歡妾身的服務嗎？",message:"您也可以撰寫評論"}, ()=>{});
            }
        }
        catch(e)
        {
            console.log("调用RSDK.callSdk onAppStoreScore error");
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
     export function openUrl(url:any,callback:Function,callbackThisObj:any):boolean
    {   
        try
        {
            RSDK.callSdk("openlink", {url:url}, null);
            // return RSDK.requestDesktop(data,callback.bind(callbackThisObj));
        }
        catch(e)
        {
            return false;
        }
        
    }
    /** 微信小游戏客服 */
    export function showWxCustomerService()
    {   
        try
        {
            RSDK.callSdk("showWxCustomerService",{},()=>{})
        }
        catch(e)
        {
            return ;
        }
        
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
                RSDK.callSdk("showFkVipIcon", {mainClass:LayerMgr.mainIns}, ()=>{});
                showedWxVipIcon = true;
            }
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     * 统计权势
     */
    export function reportGameResult()
    {
        try
        {
            let reportData={
                "playerAttr":{
                    // "level": Api.playerVoApi.getPlayerLevel(),
                    // "danLevel": Api.playerVoApi.getPlayerLevel(),
                    // "power": Api.playerVoApi.getPlayerPower()
                }
            };
            RSDK.callSdk("reportGameResult", reportData, ()=>{});
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     * 玩一玩检测是否显示红包按钮
     * 成功会回调
     */
    export function isUserInRedPackageActivity(checkResoultCallback:()=>void,callbackThisObj:any):void
    {
        try
        {
            RSDK.callSdk("isUserInRedPackageActivity",{},function(isUserInRed){
                if(isUserInRed)
                {
                    if(checkResoultCallback)
                    {
                        checkResoultCallback.call(callbackThisObj);
                    }
                }
            }.bind(RSDKHelper));
        }
        catch(e)
        {
        }
    }

    /**
     * 玩一玩点红包
     */
    export function redPackageButtonEvent()
    {
        try
        {
            RSDK.callSdk("redPackageButtonEvent",{},function(){})
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     * 和悦检测服务器状态
     */
    export function heyueCheckServer(serverId:string)
    {
        try
        {
            console.log("heyueCheckServer start")
            RSDK.callSdk("heyueCheckServer",{server_id:serverId},()=>{});
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     * 统计的货币单位
     */
    export function currency():string
    {
        if(PlatMgr.checkIsKRSp())
        {
            if(App.DeviceUtil.isAndroid()){
                return "KRW";
            }else if(App.DeviceUtil.isIOS())
            {
                return "USD";
            }
        }
        else if(PlatMgr.checkIsThSp())
        {
            if(PlatMgr.checkIsThHw())
            {
                 return "THB";
            }else 
            {
              return "USD";
            }
        }
        return "CNY";
    }

    /**
     * 检测是否有绑定功能
     */
    export function hasBindFunc():boolean
    {
        if(RSDK.hasBindFunc){
            return RSDK.hasBindFunc();
        }
        return false;
    }

    /**
     * 检测是否已经绑定
     * @param callback 检测结果，code==1 是绑定成功 
     */
    export function checkBindStatus(callback:(code:number|string)=>void):void
    {
        RSDK.checkBindStatus(callback);
    }

    export function checkPushToken():void
    {   
        try
        {
            RSDK.callSdk("getJPregistrationID", null, function(pushToken){

                if ( pushToken && !PlatMgr.checkIsIOSShenheSp())
                {   
                    GameData.pushToken = pushToken;
                    // NetManager.request(NetRequestConst.REQUST_USER_SETPUSHTOKEN,{pushToken:GameData.pushToken});
                }
            });
        }
        catch(e)
        {
            console.log("调用RSDK.callSdk checkPushToken error");
        }
    }

    /**
     * 绑定接口,回调同检测绑定接口
     */
    export function callBind(callback:(code:number|string)=>void):void
    {
        RSDK.callBind(callback);
    }

    export function sendMobileCode(mobile:number,callback:()=>void,callbackThisObj:any):void
    {
        if(RSDKHelper.isInit)
        {
            RSDK.callSdk('sendMobileCode',{mobile:mobile},function(code){
                //code == 0 为发送成功
                if(code==0)
                {
                    if(callback)
                    {
                        callback.call(callbackThisObj);
                    }
                }
            });
        }
    }

    export function checkMobileCode(mobile:number,code:number,callback:()=>void,callbackThisObj:any):void
    {
        if(RSDKHelper.isInit)
        {
            RSDK.callSdk('checkMobileCode',{mobile:mobile,code:code},function(code){
                //code == 0 为发送成功
                if(code==0)
                {
                    if(callback)
                    {
                        callback.call(callbackThisObj);
                    }
                }
                else
                {
                    App.CommonUtil.showTip(LangMger.getlocal("bindingPhone_code_error"));
                }
            });
        }
    }

    export function setAppOnBackHandler(callback:()=>void,callbackThisObj:any):void
    {
        RSDK.callSdk("setAppOnBackPressedListener", {}, () => {
            console.log("setAppOnBack");
            if(callback)
            {
                callback.apply(callbackThisObj);
            }
        });
    }

    export function goAppExit():void
    {
        console.log("goAppExit");
        RSDK.callSdk("goAppExit",{},()=>{});
    }

    export function switchAreaOrLanguage(area:string,language:string):void
    {
        RSDK.callSdk("callClientFunction",{functionName:"reciveCommonSubAppId",data:{commonSubAppId:area,gameLanguage:language}},()=>{});
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

    /**
     * iframe弹窗打开url页面
     * @param url 目标url地址
     * @param title 标题，可以无
     */
    export function loadUrl(url:string,title?:string):void
    {   
        console.log("调用 RSDK.loadUrl "+url);
        RSDK.loadUrl(url,title);
    }

    /**退出应用，支持微信小游戏，微端，原生 */
    export function forceAppExit():void
    {
        RSDK.forceAppExit();
    }
}

/**登陆统计的参数 */
interface ana_login_params {
    /** */
    gameUserId: string,
    /** */
    userId: string,
    /** */
    gameUserName:string,
    /** */
    loginType: number,
    /** */
    serverId: number,
    /** */
    registerTime: number,

    // 以下参数为微信附加
    /**登陆时间 */
    loginTime?: number,
    /**当前关卡（传""） */
    rank?: string,
    /**当前钻石（传0）*/
    diamond?: number,
    /**累冲金额（传0）*/
    allmoney?: number,
    /**战力（荣誉奖杯） */
    energy?: number,
    /**货币总消耗（传0） */
    money1Consume?: number
}

/**统计微信购买完毕的参数 */
interface ana_WxBuy_params {
    // /**登陆时间 */
    // logintime: number,
    // /**当前关卡（传""） */
    // rank: string,
    // /**当前钻石（传0）*/
    // diamond: number,
    // /**累冲金额（传0）*/
    // allmoney: number,
    // /**战力（荣誉奖杯） */
    // energy: number,
    // /**货币总消耗（传0） */
    // money1Consume: number,
    /**购买内容 */
    payWhat: string,
    /**剩余钻石（传0） */
    Remaininglngot: string
}