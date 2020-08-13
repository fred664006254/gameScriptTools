var RSDKHelper;
(function (RSDKHelper) {
    RSDKHelper.isInit = false;
    /** 是否已经显示了疯狂vip的图标 */
    var showedWxVipIcon = false;
    function init() {
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
        if (App.DeviceUtil.IsHtml5() && PlatformManager.checkIsFkylcSp()) {
            var content = LanguageManager.getShareDesc();
            window["shareTitle"] = content.title || "皇上快点";
            window["shareDesc"] = content.desc || "让好友看看你的女人有多美！";
            window["shareImgUrl"] = "http://gt-fkylc-cdn.raygame3.com/gt_fkylc/shareicon.png";
        }
        if (App.DeviceUtil.IsHtml5()) {
            window["shareTitle"] = "皇上快点";
            window["shareDesc"] = "开局是个小村长，如何逆袭当皇上！";
            window["shareImgUrl"] = "http://gdhc-wx-cdn.leishenhuyu.com/gt_wx/shareicon1.png";
        }
        var initInfo = { privateKey: "8769C5721C903F029C10DCE9CA35FE13", debug: false };
        if (App.DeviceUtil.isWXgame() && PlatformManager.checkIsWxmgSp()) {
            initInfo.r_host = "https://gdhc-cn-sdk01.leishenhuyu.com";
            initInfo.r_bid = "1014003000";
            initInfo.r_plat = "h5fkwx-1014003001";
            initInfo.game_version = "modifybywxgamescript_svnversion";
        }
        else if (App.DeviceUtil.isWXgame() && PlatformManager.checkIsWxAppSp()) {
            initInfo.r_host = "https://gd-weixin-sdk02.leishenhuyu.com";
            initInfo.r_bid = "1003016000";
            initInfo.r_plat = "h5wxgame-1003016003";
            initInfo.game_version = "modifybywxgamescript_svnversion";
        }
        else if (App.DeviceUtil.isBaidugame()) {
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
        }
        else if (App.DeviceUtil.isWyw()) {
            initInfo.r_host = "https://gd-lm-sdk.raygame3.com";
            initInfo.r_bid = "17011000";
            initInfo.r_plat = "h5limi-17011001";
        }
        RSDK.init(initInfo, function (code, data) {
            RSDKHelper.isInit = true;
            console.log("初始化结果" + code);
            // login();
            if (App.LoginResLoader.isDefaultResLoaded) {
                App.LoginResLoader.initPlatCfg();
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS);
            PlatformManager.client.setAppForegroundStatusChange();
            PlatformManager.analyticsLoadEnd();
            //微信平台，提前调登录
            if (App.DeviceUtil.isWXgame()) {
                PlatformManager.login();
            }
            console.log("checkIsJPSp", PlatformManager.checkIsJPSp());
            if (PlatformManager.checkIsJPSp()) {
                console.log("RSDKHelper.startPush");
                RSDKHelper.startPush(function (data) {
                    console.log("RSDKHelper.startPush callback " + typeof (data) + " " + App.StringUtil.toString(data));
                    PlatformManager.devicePushToken = data;
                });
            }
        }); //测试
    }
    RSDKHelper.init = init;
    function login() {
        RSDK.login("", function (code, data) {
            console.log(data);
            //设置群分享卡片
            if (Number(code) == 0) {
                if (window["wx"] && window["wx"].getLaunchOptionsSync) {
                    var scene = window["wx"].getLaunchOptionsSync().scene;
                    if (scene == 1044) {
                        PlatformManager.isFromWxCard = true;
                    }
                    if (data.share_ext) {
                        PlatformManager.fromWxCardExt = data.share_ext;
                    }
                    else if (data.share_set_ext) {
                        PlatformManager.fromWxCardExt = data.share_set_ext;
                    }
                }
                PlatformManager.userId = data.userId;
                PlatformManager.prefix = data.prefix;
                PlatformManager.userType = data.userType;
                PlatformManager.token = data.token;
                PlatformManager.isLogin = true;
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
                if (PlatformManager.checkIsQQXYXSp()) {
                    var content = {
                        shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title: "快来测试一下你的桃花运",
                        desc: "让好友看看你的女人有多美！",
                        imageurl: " https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                }
                else if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp()) {
                    var content = {
                        shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title: "皇上快点",
                        desc: "让好友看看你的女人有多美！",
                        imageurl: "https://gt-fkwx.leishenhuyu.com/wxgameOtherPic/share0.jpg"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                }
                else if (PlatformManager.checkIsBaiduSp()) {
                    var content = {
                        shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title: "皇上快点",
                        desc: "这游戏真的省钱 玩了1个月都没充值 原来当官的游戏都这么爽！ 3天就当王爷了！",
                        imageurl: "https://gd-h5ly-web01.leishenhuyu.com/share/baidushareicon.png"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                }
                else if (PlatformManager.checkIsH5lySp()) {
                    var content = {
                        shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title: "快来测试一下你的桃花运",
                        desc: "让好友看看你的女人有多美！",
                        imageurl: "https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg"
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                }
                if (PlatformManager.checkIsWxH5Chuansheng()) {
                    var key = Math.floor(Math.random() * 2) + 1;
                    var map = {
                        desc1: "3天就当王爷了！这游戏真的省钱 玩了1个月都没充值 原来当官的游戏都这么爽！",
                        desc2: "有两个格格都想嫁给你 你是娶一个？还是都娶了？ 快来娶回家吧！",
                    };
                    var lastGang = document.baseURI.lastIndexOf("/");
                    var imageurl = document.baseURI.substr(0, lastGang + 1) + "resource/other/share_guide_image/" + "shareWxH5chuansheng" + key + ".jpg";
                    var content = {
                        shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG,
                        title: "皇上快点",
                        desc: map["desc" + key],
                        imageurl: imageurl
                    };
                    RSDK.setShareInfo(content, PlatformManager.userId);
                }
            }
            else if (Number(code) == -1) {
            }
            else if (Number(code) == -2) {
            }
            else if (Number(code) == 1001) {
                if (PlatformManager.isSupportBindPhone()) {
                    GameData.kkkIsBindIos = String(data.msg);
                    //是否绑定过手机 1已绑定,0未绑定
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_IOS_BINDPHONE, { "result": String(data.msg) });
                }
            }
            else if (Number(code) == 1002) {
                PlatformManager.kkk_age = Number(data.msg);
            }
            else if (Number(code) == 1003) {
                console.log("检查服务器:" + code + "  " + data.msg);
                if (Number(data.msg) == 1) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
                }
            }
            else if (Number(code) == 1004) {
                console.log("检查账号绑定:" + code + "  " + data.msg);
                // if (Number(data.msg) == 1) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_BIND, data.msg);
                // }
            }
            else if (Number(code) == 1006) {
                console.log("推送获取设备id:" + code + "  " + typeof (data) + data.msg);
                PlatformManager.devicePushToken = data.msg;
            }
        }, function (code, data) {
            console.log("登出::" + code);
            if (Number(code) == 0) {
                PlatformManager.isLogin = false;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_LOGOUT);
                // if(!LoginView.isShowed)
                // {
                LoginManager.changeAccount();
                // }
            }
        });
    }
    RSDKHelper.login = login;
    function logout() {
        RSDK.logout();
    }
    RSDKHelper.logout = logout;
    function pay(productId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (PlatformManager.checkIsWanbaSp()) {
            window["__payError"] = function () {
                //支付失败执行
                App.CommonUtil.showTip(LanguageManager.getlocal("payFailTip"));
            };
            window["__payClose"] = function () {
                //关闭对话框执行,IOS下无效
                App.CommonUtil.showTip(LanguageManager.getlocal("payCancelTip"));
            };
        }
        if (itemCfg.orderid) {
            productId = itemCfg.orderid;
        }
        var payInfo = new productInfo();
        payInfo.coinNum = itemCfg.gemCost.toString();
        payInfo.currency = "CNY";
        if (PlatformManager.checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                payInfo.currency = "KRW";
            }
            else if (App.DeviceUtil.isIOS()) {
                payInfo.currency = "USD";
            }
        }
        payInfo.gameUserId = GameData.userId.toString();
        payInfo.gameUserName = Api.playerVoApi.getPlayerName();
        payInfo.price = itemCfg.cost.toString();
        var data = { allProductId: Config.RechargeCfg.getAllProductid().join(","), productId: itemCfg.id };
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
        payInfo.productCount = "1";
        payInfo.productId = productId;
        payInfo.productName = itemCfg.gemCost + LanguageManager.getlocal("gemName");
        payInfo.productType = "1";
        payInfo.userId = PlatformManager.userId;
        payInfo.roleLevel = Api.playerVoApi.getSdkLevel().toString();
        payInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        payInfo.serverId = ServerCfg.selectServer.zid;
        payInfo.serverName = ServerCfg.selectServer.sname ? ServerCfg.selectServer.sname : ServerCfg.selectServer.zid;
        RSDK.pay(payInfo, function (code, data) {
            if (PlatformManager.checkIsWanbaSp()) {
                if (data && data.balance != null) {
                    var balance = Number(data.balance);
                    if (isNaN(balance) == false) {
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, { msg: LanguageManager.getlocal("paySuccessLeftMoneyTip", [String(itemCfg.cost * 10), String(itemCfg.gemCost), String(balance), Config.RechargeCfg.getMoneyName()]), title: "itemUseConstPopupViewTitle", touchMaskClose: true });
                    }
                }
            }
        });
    }
    RSDKHelper.pay = pay;
    function share(callback) {
        var desc = LanguageManager.getShareDesc();
        var content = { shareType: "", title: desc.title || "皇上快点", desc: desc.desc || "体验真实古代官场生活，权倾朝野，坐拥江山美人！", imageurl: desc.imageurl };
        // let shareId = "000";
        // if (desc.shareId) {
        //     shareId = desc.shareId;
        // }
        // App.ShareGuideUtil.sharingId = shareId;
        // RSDK.setShareInfo(content, GameData.userId.toString() + "#" + shareId);
        // egret.log("content1" + desc)
        // egret.log("content2" + desc.desc)
        // egret.log("content3" + desc.imageurl)
        PlatformManager.analytics37Point("custom_social", "share_behavior", 1);
        RSDK.share(content, callback);
    }
    RSDKHelper.share = share;
    // 设置分享信息
    function setShareInfo(shareInfo) {
        var content = { shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG, title: "皇上快点", desc: "体验真实古代官场生活，权倾朝野，坐拥江山美人！" };
        if (PlatformManager.getAppid() == "1003007035") {
            content.imageurl = "https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg";
        }
        RSDK.setShareInfo(content, shareInfo);
    }
    RSDKHelper.setShareInfo = setShareInfo;
    function fbShare(callback) {
        // console.log("QAZ fbShare");
        // let desc = LanguageManager.getShareDesc();
        // let content:{title:string,desc:string,imageurl:string,link:string}={title : desc.title || "一個官人七個妻 真實體驗古風官場生活",
        // desc : desc.desc || "好男兒生當作人傑，三妻四妾，封王拜侯，爭雄稱霸!\n春風得意馬蹄疾，一日看盡長安花！快意一生！",
        // imageurl:"http://pic.heyyogame.com/panwuxi/picture/201711220fa85dce39574e4e3640ad85370e16ed.jpg",
        // link:"https://adv.heyyogame.com/adv.jsp?gamecode=GD&partnerName=share&advcode=GD_yypV_414"};
        // RSDK.share(content,callback);
    }
    RSDKHelper.fbShare = fbShare;
    function krShare(callback) {
        // console.log("QAZ krShare");
        // let desc = LanguageManager.getShareDesc();
        // let content:{title:string,desc:string,imageurl:string,link:string}={title : desc.title || "역천인 - 이제까지 없던 정통 사극 RPG!",
        // desc: desc.desc || "역사 속 위대한 위인, 경국지색의 미녀들과 함께 써나가는 당신만의 장대한 서사시. 신분의 한계를 뛰어넘어 왕이 되어라!",
        // imageurl:"https://yccs.mayngames.co.kr/img/fbshare1.jpg",
        // link:"https://yccs.mayngames.co.kr/fbshare"};
        // RSDK.share(content,callback);
    }
    RSDKHelper.krShare = krShare;
    /**
     *
     * @param code -1 登录统计  -2新手引导步数 -3 注册统计 -4 支付统计 -5 升级统计 -6 loading完成统计
     * @param info
     */
    function trackEvent(code, info) {
        if (PlatformManager.checkIsKRShenhe()) {
            return;
        }
        try {
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
            RSDK.trackEvent(code, info);
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
        catch (e) {
            App.LogUtil.log("前端统计报错:" + code);
        }
    }
    function checkWifeABTest() {
        return Api.switchVoApi.checkWifeAni() && Api.switchVoApi.checkOpenWifeAbTest();
    }
    function checkApenAutoLoginABtest() {
        return Api.switchVoApi.checkApenAutoLoginABtest() && Api.otherInfoVoApi.isnewuser();
    }
    function analyticsLogin() {
        try {
            if (PlatformManager.checkIsWanbaSp()) {
                var isReport = true;
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
                if (GameData.closeSource == 1) {
                    isReport = false;
                }
                if (isReport && window && window["reportLogin"]) {
                    window["reportLogin"]();
                }
            }
        }
        catch (e) {
        }
        var eventInfo = {};
        eventInfo.userId = PlatformManager.userId;
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName() ? Api.playerVoApi.getPlayerName() : GameData.userId.toString();
        eventInfo.roleLevel = Api.playerVoApi.getSdkLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        eventInfo.coinNum = Api.playerVoApi.getPlayerGem().toString();
        eventInfo.loginType = 0;
        eventInfo.loginTime = GameData.logints;
        eventInfo.rank = Api.challengeVoApi.getCurChannelId() + "";
        eventInfo.diamond = Api.playerVoApi.getPlayerGem();
        if (PlatformManager.checkIsWxmgSp()) {
            eventInfo.allmoney = Api.playerVoApi.getPlayerVipExp();
            eventInfo.energy = Api.playerVoApi.getPlayerPower();
            eventInfo.money1Consume = Api.playerVoApi.getUsegems();
            if (Api.playerVoApi.getPlayerAllianceId() != 0) {
                eventInfo.teamName = Api.playerVoApi.getPlayerAllianceName();
                eventInfo.teamJob = LanguageManager.getlocal("allianceMemberPo" + Api.allianceVoApi.getMyAllianceVo().po);
            }
        }
        trackEvent(TRACK_LOGIN, eventInfo);
    }
    RSDKHelper.analyticsLogin = analyticsLogin;
    function analyticsNewGuide(step) {
        var eventInfo = {};
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.step = String(step);
        trackEvent(TRACK_NEW_GUIDE, eventInfo);
    }
    RSDKHelper.analyticsNewGuide = analyticsNewGuide;
    function analyticsSelectServer() {
        var eventInfo = {};
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.customEventName = "selectServerLoginEvent";
        trackEvent(TRACK_UNLOCK_FIRST_CHAPTER, eventInfo);
    }
    RSDKHelper.analyticsSelectServer = analyticsSelectServer;
    function analyticsRegister() {
        if (PlatformManager.checkIsWanbaSp()) {
            var isReport = true;
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
            if (GameData.closeSource == 1) {
                isReport = false;
            }
            console.log('report' + (isReport ? 1 : 0));
            if (isReport && window && window["reportRegister"]) {
                window["reportRegister"]();
            }
        }
        var eventInfo = {};
        eventInfo.userId = PlatformManager.userId;
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName() ? Api.playerVoApi.getPlayerName() : GameData.userId.toString();
        eventInfo.roleLevel = Api.playerVoApi.getSdkLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType = 1;
        trackEvent(TRACK_REGISTER, eventInfo);
        console.log("QAZ analyticsRegister TRACK_REGISTER " + TRACK_REGISTER);
        if (PlatformManager.checkIsTWBSp() && !PlatformManager.checkIsTest()) {
            StatisticsHelper.report_register_tw();
        }
    }
    RSDKHelper.analyticsRegister = analyticsRegister;
    function analyticsPay(id, orderId, paymentData) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(id);
        var eventInfo = {};
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName();
        eventInfo.roleLevel = Api.playerVoApi.getSdkLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.orderId = orderId;
        if (!itemCfg) {
            if (PlatformManager.checkIsViSp() && id.indexOf("klwebpay") > -1) {
                //  eventInfo.price=(paymentData.amount/3).toFixed(2);
                //  eventInfo.coinNum=paymentData.num;
                return;
            }
            else {
                eventInfo.price = (paymentData.amount).toFixed(2);
                eventInfo.coinNum = paymentData.num;
            }
        }
        else {
            eventInfo.price = (itemCfg.cost).toFixed(2);
            eventInfo.coinNum = itemCfg.gemCost;
        }
        eventInfo.productCount = "1";
        eventInfo.productType = "1";
        eventInfo.currency = "CNY";
        if (PlatformManager.checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                eventInfo.currency = "KRW";
            }
            else if (App.DeviceUtil.isIOS()) {
                eventInfo.currency = "USD";
            }
        }
        trackEvent(TRACK_PAY, eventInfo);
        if (PlatformManager.checkIsTWBSp() && !PlatformManager.checkIsTest()) {
            StatisticsHelper.report_pay_tw(itemCfg.cost);
        }
    }
    RSDKHelper.analyticsPay = analyticsPay;
    function analyticsLevelup() {
        App.LogUtil.log("__levelup_event__");
        var gameuserInfo = {};
        gameuserInfo.userName = "";
        gameuserInfo.userId = PlatformManager.userId;
        gameuserInfo.serverId = ServerCfg.selectServer.zid;
        gameuserInfo.serverName = ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName = Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId = GameData.userId.toString();
        gameuserInfo.roleLevel = Api.playerVoApi.getSdkLevel().toString();
        gameuserInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        gameuserInfo.loginType = 2;
        trackEvent(LEVEL_UP, gameuserInfo);
        if (PlatformManager.checkIsTWBSp() && PlatformManager.checkIsTest() == false && Api.playerVoApi.getSdkLevel() == 4) {
            StatisticsHelper.report_uplevel4_tw();
        }
    }
    RSDKHelper.analyticsLevelup = analyticsLevelup;
    function analyticsLoadEnd() {
        var eventInfo = {};
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
        trackEvent(TRACK_LOAD_END, eventInfo);
    }
    RSDKHelper.analyticsLoadEnd = analyticsLoadEnd;
    function analyticsCompleteNewGuide() {
        // if(PlatformManager.checkIsKRSp()&&Number(PlatformManager.getAppVersion())>14)
        // if(PlatformManager.checkIsKRSp()&&Number(PlatformManager.getAppVersion())>14)
        // {
        var eventInfo = {};
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        try {
            trackEvent(TRACK_TUTORIAL_END, eventInfo);
        }
        catch (e) {
            console.log("analyticsCompleteNewGuide error");
        }
        // }
    }
    RSDKHelper.analyticsCompleteNewGuide = analyticsCompleteNewGuide;
    /**
     * 37打点统计
     */
    function analytics37Point(eventName, eventKey, eventValue) {
        App.LogUtil.log("track analytics37Point");
        try {
            var gameuserInfo = {};
            gameuserInfo.userName = "";
            gameuserInfo.userId = PlatformManager.userId;
            gameuserInfo.serverId = ServerCfg.selectServer.zid;
            gameuserInfo.serverName = ServerCfg.selectServer.sname;
            gameuserInfo.gameUserName = Api.playerVoApi.getPlayerName();
            gameuserInfo.gameUserId = GameData.userId.toString();
            gameuserInfo.roleLevel = Api.playerVoApi.getSdkLevel().toString();
            gameuserInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
            gameuserInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
            gameuserInfo.balance = Api.playerVoApi.getPlayerGem().toString();
            gameuserInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
            gameuserInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
            gameuserInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
            var customEventName = { eventName: eventName, eventKey: eventKey, eventValue: eventValue };
            gameuserInfo.customEventName = customEventName;
            trackEvent("-8", gameuserInfo);
        }
        catch (e) {
            console.log("analytics37Point error");
        }
    }
    RSDKHelper.analytics37Point = analytics37Point;
    /**
     * 解锁第一章
     */
    function analyticsFirstChapter() {
        var eventInfo = {};
        trackEvent(TRACK_UNLOCK_FIRST_CHAPTER, eventInfo);
    }
    RSDKHelper.analyticsFirstChapter = analyticsFirstChapter;
    /**
     * 解锁牢房
     */
    function analyticsUnlockCell() {
        var eventInfo = {};
        trackEvent(TRACK_UNLOCK_CELL, eventInfo);
    }
    RSDKHelper.analyticsUnlockCell = analyticsUnlockCell;
    /**
     * 达到正九品
     */
    function analyticsNineGrade() {
        var eventInfo = {};
        trackEvent(TRACK_REACH_NINE_GRADE, eventInfo);
    }
    RSDKHelper.analyticsNineGrade = analyticsNineGrade;
    /**
     * 达到从八品
     */
    function analyticsEightGrade() {
        var eventInfo = {};
        trackEvent(TRACK_REACH_VICE_EIGHT_GRADE, eventInfo);
    }
    RSDKHelper.analyticsEightGrade = analyticsEightGrade;
    /**
     * 解锁寻访
     */
    function analyticsUnlockSearch() {
        var eventInfo = {};
        trackEvent(TRACK_UNLOCK_SEARCH, eventInfo);
    }
    RSDKHelper.analyticsUnlockSearch = analyticsUnlockSearch;
    /**
     * 达到正八品
     */
    function analyticsReachEight() {
        var eventInfo = {};
        trackEvent(TRACK_REACH_EIGHT, eventInfo);
    }
    RSDKHelper.analyticsReachEight = analyticsReachEight;
    /**
     * 首次充值
     */
    function analyticsFirstPayment() {
        var eventInfo = {};
        trackEvent(TRACK_FIRST_PAYMENT, eventInfo);
    }
    RSDKHelper.analyticsFirstPayment = analyticsFirstPayment;
    /**
     * /点击储值按钮
     */
    function analyticsClickPayment() {
        var eventInfo = {};
        trackEvent(TRACK_CLICK_PAYMENT, eventInfo);
    }
    RSDKHelper.analyticsClickPayment = analyticsClickPayment;
    /**
     * /点击储值按钮
     */
    function analyticsMainUi() {
        var eventInfo = {};
        trackEvent(EVENT_NAME_GAME_MAIN_INTERFACE, eventInfo);
    }
    RSDKHelper.analyticsMainUi = analyticsMainUi;
    /**
     * /点击创建角色按钮
     */
    function analyticsClickCreateBtn() {
        var eventInfo = {};
        var gameuserInfo = {};
        gameuserInfo.userName = "";
        gameuserInfo.userId = PlatformManager.userId;
        gameuserInfo.serverId = ServerCfg.selectServer.zid;
        gameuserInfo.serverName = ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName = Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId = GameData.userId.toString();
        gameuserInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        gameuserInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        // let customEventName = {eventName:eventName,eventKey:eventKey,eventValue:eventValue}
        // gameuserInfo.customEventName=customEventName;
        trackEvent(TRACK_CLICK_CREATEBTN, gameuserInfo);
    }
    RSDKHelper.analyticsClickCreateBtn = analyticsClickCreateBtn;
    /**
    * /微信充值统计
    */
    function analyticsWXPay(proid) {
        var eventInfo = {};
        var gameuserInfo = {};
        gameuserInfo.userName = "";
        gameuserInfo.userId = PlatformManager.userId;
        gameuserInfo.serverId = ServerCfg.selectServer.zid;
        gameuserInfo.serverName = ServerCfg.selectServer.sname;
        gameuserInfo.gameUserName = Api.playerVoApi.getPlayerName();
        gameuserInfo.gameUserId = GameData.userId.toString();
        gameuserInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        gameuserInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        // let customEventName = {eventName:eventName,eventKey:eventKey,eventValue:eventValue}
        // gameuserInfo.customEventName=customEventName;
        gameuserInfo.payWhat = proid;
        gameuserInfo.RemainingIngot = Api.playerVoApi.getPlayerGem();
        trackEvent(TRACK_WX_PAY, gameuserInfo);
    }
    RSDKHelper.analyticsWXPay = analyticsWXPay;
    /**
     * 登录统计
     */
    var TRACK_LOGIN = "-1";
    /**
     * 新手引导步数统计
     */
    var TRACK_NEW_GUIDE = "-2";
    /**
     * 注册统计
     */
    var TRACK_REGISTER = "-3";
    /**
     * 支付统计
     */
    var TRACK_PAY = "-4";
    /**
     * 升级统计
     */
    var LEVEL_UP = "-5";
    /**
     * 游戏loading完成统计
     */
    var TRACK_LOAD_END = "-6";
    /**
     * 新手引导完成
     */
    var TRACK_TUTORIAL_END = "-7";
    /**
    * 解锁第一章（还有其他自定义））
    */
    var TRACK_UNLOCK_FIRST_CHAPTER = "-8";
    /**
    * /解锁牢房
    */
    var TRACK_UNLOCK_CELL = "-9";
    /**
    * 达到正九品
    */
    var TRACK_REACH_NINE_GRADE = "-10";
    /**
    * 达到从八品
    */
    var TRACK_REACH_VICE_EIGHT_GRADE = "-11";
    /**
    * 解锁寻访
    */
    var TRACK_UNLOCK_SEARCH = "-12";
    /**
    * 达到正八品
    */
    var TRACK_REACH_EIGHT = "-13";
    /**
    * 首次充值
    */
    var TRACK_FIRST_PAYMENT = "-14";
    /**
    * 点击储值按钮
    */
    var TRACK_CLICK_PAYMENT = "-15";
    /**
    * 点击储值按钮
    */
    var EVENT_NAME_GAME_MAIN_INTERFACE = "-16";
    // /**
    //  * 选服统计 （点登录按钮直接发）
    //  */
    // const TRACK_SELECT_SERVER = "-16";
    /**
    * 点击创建角色按钮
    */
    var TRACK_CLICK_CREATEBTN = "-17";
    /**
     * 微信支付统计
     */
    var TRACK_WX_PAY = "-18";
    function checkAttention() {
        try {
            return RSDK.checkFollow();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.checkAttention = checkAttention;
    function checkHasCircleFunc(callback) {
        try {
            RSDK.callSdk("hasCircleFunc", {}, callback);
        }
        catch (e) {
            console.log(e);
        }
    }
    RSDKHelper.checkHasCircleFunc = checkHasCircleFunc;
    function showCircle() {
        try {
            RSDK.callSdk("showCircle", {}, function (code) {
                console.log(code);
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/showCircle error");
        }
    }
    RSDKHelper.showCircle = showCircle;
    //qq玩吧 微信公众号
    function isFollowingTxAccount(callback) {
        try {
            RSDK.callSdk("isFollowingTxAccount", {}, callback);
        }
        catch (e) {
            console.log(e);
        }
    }
    RSDKHelper.isFollowingTxAccount = isFollowingTxAccount;
    function showTxQRDialog() {
        try {
            RSDK.callSdk("showTxQRDialog", {}, function (code) {
                console.log(code);
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/showTxQRDialog error");
        }
    }
    RSDKHelper.showTxQRDialog = showTxQRDialog;
    function attention(callback) {
        try {
            RSDK.requestFollow(callback);
        }
        catch (e) {
            console.log("调用RSDK.requestFollow");
        }
    }
    RSDKHelper.attention = attention;
    /** 实名认证开关 */
    function checkRealname(callback) {
        try {
            RSDK.callSdk("checkRealNameAuth", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/checkRealNameAuth error");
        }
    }
    RSDKHelper.checkRealname = checkRealname;
    /** 实名认证  是否认证过 */
    function ifRealNameAuth(callback) {
        try {
            RSDK.callSdk("ifRealNameAuth", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/ifRealNameAuth error");
        }
    }
    RSDKHelper.ifRealNameAuth = ifRealNameAuth;
    /** 实名认证调起注册界面 */
    function getRealNameAuth(callback) {
        try {
            RSDK.callSdk("getRealNameAuth", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/getRealNameAuth error");
        }
    }
    RSDKHelper.getRealNameAuth = getRealNameAuth;
    function callSdk(action, data, callback) {
        RSDK.callSdk(action, data, callback);
    }
    RSDKHelper.callSdk = callSdk;
    /** 查询账号绑定状态 */
    function bindAccountStatus() {
        rsdkclientplugin.bindAccountStatus();
    }
    RSDKHelper.bindAccountStatus = bindAccountStatus;
    /** 调用cover的设置背景 */
    function callBackDrop() {
        try {
            RSDK.callSdk("callBackDrop", { url: "https://h5.qzone.qq.com/bgstore/detail/130859?_wv=2098179&from=adv&page=1&router=detail&coverid=130859&_proxy=1" }, null);
        }
        catch (e) {
            console.log("调用RSDK.callSdk callBackDrop error");
        }
    }
    RSDKHelper.callBackDrop = callBackDrop;
    /**
     * 检测是否已设置了cover背景
     */
    function checkBackDrop(callback) {
        try {
            RSDK.callSdk("checkBackDrop", { cover_id: "130859" }, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk checkBackDrop error");
        }
    }
    RSDKHelper.checkBackDrop = checkBackDrop;
    /**
     * 返回值：0：不显示分享按钮，1：显示分享按钮；2，显示分享按钮,游戏内指向右上角；3，显示分享按钮，点击分享按钮调用cp的默认提示分享方法；
     */
    function checkShare() {
        try {
            return RSDK.checkShare();
        }
        catch (e) {
            return 0;
        }
    }
    RSDKHelper.checkShare = checkShare;
    /**
     *  获取渠道客服类型：0：游戏自己处理；1：sdk客服页面（游戏调用 customerService）；2：返回qq客服信息，（游戏调用 getCustomerServiceData）
     */
    function getCustomerServiceType() {
        try {
            return RSDK.getCustomerServiceType();
        }
        catch (e) {
            return 0;
        }
    }
    RSDKHelper.getCustomerServiceType = getCustomerServiceType;
    /**
     * 是否能创建应用桌面快捷方式，true：显示发送桌面按钮，false：不显示按钮
     */
    function checkDesktop() {
        try {
            return RSDK.checkDesktop();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.checkDesktop = checkDesktop;
    /**
     * * 是否已经关注过，true：有关注功能；false：无关注功能
     */
    function hasFollow() {
        try {
            console.log("QAZ hasFollow " + RSDK.hasFollow());
            return RSDK.hasFollow();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.hasFollow = hasFollow;
    /**
     *  callback 返回 data 格式{gameName:"游戏名称",tel:"客服电话",qq:"qq群号"}
     */
    function getCustomerService(callback) {
        try {
            RSDK.getCustomerServiceData(callback);
        }
        catch (e) {
            console.log("调用RSDK.getCustomerServiceData error");
        }
    }
    RSDKHelper.getCustomerService = getCustomerService;
    function requestDesktop(data, callback, callbackThisObj) {
        try {
            return RSDK.requestDesktop(data, callback.bind(callbackThisObj));
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.requestDesktop = requestDesktop;
    function sqSDKPresentUserCenterView() {
        try {
            if (PlatformManager.checkIsKRSp() && PlatformManager.checkIsWeiduan()) {
                rsdkclientplugin.sqSDKPresentUserCenterView();
            }
        }
        catch (e) {
        }
    }
    RSDKHelper.sqSDKPresentUserCenterView = sqSDKPresentUserCenterView;
    /**
   * 调用Naver
   */
    function callNaver() {
        try {
            RSDK.callSdk("sqSDKPresentNaverSDKMainView", {}, function (result) { return void {}; });
        }
        catch (e) {
            console.log("调用RSDK.callSdk 调用Naver error");
        }
    }
    RSDKHelper.callNaver = callNaver;
    /**
    * 调用日本用户中心
    */
    function callUserCenter() {
        try {
            RSDK.callSdk("sqSDKPresentUserCenterView", {}, function (result) { return void {}; });
        }
        catch (e) {
            console.log("调用RSDK.callSdk 调用callUserCenter error");
        }
    }
    RSDKHelper.callUserCenter = callUserCenter;
    /** 微信打开更多游戏路径 */
    function showMoreGame() {
        try {
            RSDK.callSdk("showMoreGame", {}, null);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/showMoreGame error");
        }
    }
    RSDKHelper.showMoreGame = showMoreGame;
    /** 越南第三方支付 */
    function payInThird() {
        try {
            var serverId = ServerCfg.selectServer.zid;
            RSDK.callSdk("payInThird", { serverId: serverId }, null);
            console.log("QAZ payInThird callsdk22 ");
        }
        catch (e) {
            console.log("调用RSDK.callSdk/payInThird error");
        }
    }
    RSDKHelper.payInThird = payInThird;
    function formatChannelId(data) {
        if (PlatformManager.checkIsMmSp() && App.DeviceUtil.isIOS()) {
            data.channelId = "1003011002";
        }
    }
    /**
     * 门客获得等专用的分享方法
     */
    function guideShare(shareContent, callback) {
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
            var picid = App.MathUtil.getRandom(1, 10);
            shareContent.link = "https://go.onelink.me/Sslt/gameshare";
            shareContent.title = "人気RPGゲーム『日替わり内室』貴方だけの皇帝ライフを始めよう！門客名将を招き、帝王争奪に参加し、天下を治める王を目指せ！性格・容姿思いのまま、美女達とのハーレム生活！";
            shareContent.imageurl = "https://jpgdweb01.37games.com/image/shareimage" + picid + ".jpg";
        }
        PlatformManager.analytics37Point("custom_social", "share_behavior", 1);
        RSDK.share(shareContent, callback);
    }
    RSDKHelper.guideShare = guideShare;
    // 设置分享信息 门客获得等专用的方法
    function setShareInfoGuide(shareContent, shareInfo, shareId) {
        if (!shareId) {
            shareId = "000";
        }
        App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(shareContent, shareInfo + "_" + shareId);
    }
    RSDKHelper.setShareInfoGuide = setShareInfoGuide;
    /**
     * 实名认证
     * 为什么方法名有下划线：因为这个类里关于实名认证的方法太多了，所以直接用了action的名字
     * 这是那个好像每认证一次都要交钱的，真认证。
     */
    function realname_auth(idcard, name, cb) {
        try {
            RSDK.callSdk("realname_auth", { idcard: idcard, name: name }, cb);
        }
        catch (e) {
            return;
        }
    }
    RSDKHelper.realname_auth = realname_auth;
    /** 疯狂显示vip图标 */
    function showFkVipIcon() {
        try {
            if (!showedWxVipIcon) {
                RSDK.callSdk("showFkVipIcon", { mainClass: GameConfig.stage }, function () { });
                showedWxVipIcon = true;
            }
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.showFkVipIcon = showFkVipIcon;
    /** 设置大区ID */
    function initKunlunServer(serverId) {
        try {
            RSDK.callSdk("initKunlunServer", serverId, function () { });
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.initKunlunServer = initKunlunServer;
    /**
     * 设置原生包测试api
     * @param param {game_mark: test 其他;;; show_fps:yes/no;;;disable_native_render: yes/no  }key可以没有，没有时候壳子不处理，有key就覆盖值
     */
    function setRuntime2State(param) {
        if (App.DeviceUtil.isRuntime2()) {
            var appParam = { "func": "setGameMark", "data": param };
            egret.ExternalInterface.call("sendToNative", JSON.stringify(appParam));
        }
    }
    RSDKHelper.setRuntime2State = setRuntime2State;
    /** 途游进入后台 or 返回前台 回调, 处理声音播放或暂停 */
    function setGameBackgroundChange(callback) {
        try {
            RSDK.callSdk("setAppBackgroundChangeCallback", {}, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/setAppBackgroundChangeCallback error");
        }
    }
    RSDKHelper.setGameBackgroundChange = setGameBackgroundChange;
    /** 日本开启推送并获取token */
    function startPush(callback) {
        try {
            RSDK.startPush(callback);
        }
        catch (e) {
            console.log("调用RSDK.startPush error");
        }
    }
    RSDKHelper.startPush = startPush;
    /**
     * 微信防沉迷
     */
    function checkRest(callback) {
        try {
            RSDK.callSdk("checkRest", { space: 5 * 60, maxGameTime: 60 * 60 }, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/checkRest error");
        }
    }
    RSDKHelper.checkRest = checkRest;
    /**
     * 玩吧获取当前vip等级
     */
    function getWanbaviptequanLevel(callback) {
        // setTimeout(()=>{
        //     callback("5");
        // }, 1000);
        try {
            RSDK.callSdk("qqwbGetVipLevel", {}, function (code, result) {
                if (code == 0) {
                    //获取当前vip等级
                    var viplevel = result.viplevel;
                    callback(viplevel);
                }
                else {
                    //获取当前vip等级失败
                    console.log("调用RSDK.callSdk/qqwbGetVipLevel error", code, result);
                }
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/qqwbGetVipLevel error");
        }
    }
    RSDKHelper.getWanbaviptequanLevel = getWanbaviptequanLevel;
    /**
     * 调用ar照相
     */
    function openARCamera(cb) {
        try {
            console.log("openARCamera begin");
            RSDK.callSdk("callClientFunction", { functionName: "openARCamera" }, function (data, data1) {
                console.log("openARCamera callback");
                cb(data, data1);
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/openARCamera error");
        }
    }
    RSDKHelper.openARCamera = openARCamera;
    /**
     * 检查是否有ar照相功能
     */
    function checkClientHasARCameraFunction() {
        try {
            console.log("checkClientHasFunction openARCamera begin");
            var hasAR = RSDK.callSdk("checkClientHasFunction", { functionName: "checkClientHasFunction" }, function (code, result) {
                console.log("checkClientHasFunction callback", code, result);
            });
            console.log("hasAR", hasAR);
            return hasAR;
        }
        catch (e) {
            console.log("调用RSDK.callSdk/checkClientHasFunction openARCamera error");
        }
    }
    RSDKHelper.checkClientHasARCameraFunction = checkClientHasARCameraFunction;
    /**
 * 调用ar照相
 */
    function takePhoto(data, cb) {
        try {
            console.log("takePhoto begin");
            RSDK.callSdk("callClientFunction", { functionName: "takePhoto", data: { imgData: data } }, function () {
                console.log("takePhoto callback");
                cb();
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/takePhoto error");
        }
    }
    RSDKHelper.takePhoto = takePhoto;
    function switchCamera(cb) {
        try {
            console.log("switchCamera begin");
            RSDK.callSdk("callClientFunction", { functionName: "switchCamera" }, function () {
                console.log("switchCamera callback");
                cb();
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/switchCamera error");
        }
    }
    RSDKHelper.switchCamera = switchCamera;
    function closeARCamera(cb) {
        try {
            console.log("closeARCamera begin");
            RSDK.callSdk("callClientFunction", { functionName: "closeARCamera" }, function () {
                console.log("closeARCamera callback");
                cb();
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk/closeARCamera error");
        }
    }
    RSDKHelper.closeARCamera = closeARCamera;
    /** 玩吧 判断某一功能在当前运行的平台上是否可用。 */
    function qqwbCanIShow(funcName) {
        try {
            var qqwbCanIShow_1;
            qqwbCanIShow_1 = RSDK.callSdk("qqwbCanIShow", funcName, function (code, result) {
                console.log("qqwbCanIShow callback", code, result);
            });
            console.log("qqwbCanIShow" + qqwbCanIShow_1);
            return qqwbCanIShow_1;
        }
        catch (e) {
            console.log(e);
        }
    }
    RSDKHelper.qqwbCanIShow = qqwbCanIShow;
    /** 微信疯狂 ### 1 投诉入口 */
    function createFeedbackButton(data) {
        try {
            RSDK.callSdk("createFeedbackButton", data, function () { });
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.createFeedbackButton = createFeedbackButton;
    /** 微信疯狂 ### 1 投诉入口 说明：切换投诉按钮的状态，可以将按钮显示或隐藏起来 { status: "hide" }, { status: "show" }*/
    function feedbackButtonToggle(status) {
        try {
            RSDK.callSdk("toggle", { status: status }, function () { });
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.feedbackButtonToggle = feedbackButtonToggle;
    function jumpToQQApp() {
        try {
            RSDK.callSdk("jumpToQQApp", {}, null);
        }
        catch (e) {
            console.log("调用RSDK.jumpToQQApp");
        }
    }
    RSDKHelper.jumpToQQApp = jumpToQQApp;
})(RSDKHelper || (RSDKHelper = {}));
