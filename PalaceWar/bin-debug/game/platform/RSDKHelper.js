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
        StatisticsHelper.reportLoadData("2_1");
        var content;
        if (App.DeviceUtil.IsHtml5()) {
            if (PlatformManager.checkIsFkylcSp()) {
                content = LanguageManager.getShareDesc();
            }
            window["shareTitle"] = (content && content.title) ? content.title : "想成就一番伟业么？";
            window["shareDesc"] = (content && content.desc) ? content.desc : "开服是个芝麻官，七天之后当王爷！";
            window["shareImgUrl"] = "http://gt-fkylc-cdn.raygame3.com/gt_fkylc/shareicon.png";
        }
        var initInfo = { privateKey: "8505ED51CF9A766254A39F5762030153", debug: false };
        if (PlatformManager.checkIsWxSp()) {
            initInfo.r_host = "https://gt-wanba-sdk.raygame3.com";
            initInfo.r_bid = "17003000";
            initInfo.r_plat = "h5qqgame-17003007";
            initInfo.game_version = "4.0.1";
        }
        else if (App.DeviceUtil.isWyw()) {
            initInfo.r_host = "https://gd-lm-sdk.raygame3.com";
            initInfo.r_bid = "17011000";
            initInfo.r_plat = "h5limi-17011001";
        }
        else if (PlatformManager.checkIsFBEnSp()) {
            initInfo.r_host = "gt-en-sdk.heyyogame.com";
            initInfo.r_bid = "1003005000";
            initInfo.r_plat = GameData.fbTradeType;
        }
        else if (PlatformManager.checkIsFBTwSp()) {
            initInfo.r_host = "gd-sdk.heyyogame.com";
            initInfo.r_bid = "17004000";
            initInfo.r_plat = GameData.fbTwTradeType;
        }
        else if (String(App.CommonUtil.getOption("r_bid")).indexOf("1003") == 0) {
            initInfo.privateKey = "E8F3736B99C08BF21744D3653B3F9320";
        }
        if (PlatformManager.checkIsWanbaSp() && (!window["OPEN_DATA"]) && App.CommonUtil.getOption("rsdk_param") == "{}") {
            if (window["SDK"] && window["SDK"].CommonUtil && !window["SDK"].CommonUtil._initParams) {
                window["SDK"].CommonUtil._initParams = { rsdk_param: "{}" };
            }
        }
        RSDK.init(initInfo, function (code, data) {
            StatisticsHelper.reportLoadData("2_2");
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
            PlatformManager.setAppOnBackHandler();
        }); //测试
    }
    RSDKHelper.init = init;
    function login() {
        RSDK.login("", function (code, data) {
            console.log("登录::" + code + "::");
            if (Number(code) == 0) {
                PlatformManager.userId = data.userId;
                PlatformManager.prefix = data.prefix;
                PlatformManager.userType = data.userType;
                PlatformManager.token = data.token;
                PlatformManager.isLogin = true;
                PlatformManager.nickname = data.nickname;
                PlatformManager.avatar = data.avatar;
                PlatformManager.inviter_pid = data.inviter_pid;
                if (data.inviter_uid) {
                    var customData = data.inviter_uid.split("_");
                    PlatformManager.inviter_uid = customData[0];
                    PlatformManager.fromShareId = customData[1];
                }
                // alert("头像::"+data.avatar + "登录::"+code+"::"+App.StringUtil.toString(data));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS);
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
                    StatisticsHelper.reportLoadData("5_2");
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
                }
                else {
                    if (data.info) {
                        ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, { msg: data.info, title: LanguageManager.getlocal("itemUseConstPopupViewTitle") });
                    }
                }
            }
            else if (Number(code) == 1004) {
                console.log("检查账号绑定:" + code + "  " + data.msg);
                // if (Number(data.msg) == 1) {
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_BIND, data.msg);
                // }
            }
            else if (Number(code) == 1006) {
                var infoTab = JSON.parse(data.msg);
                console.log("登录 谷歌推送:" + infoTab.googlePushToken);
                GameData.pushToken = infoTab.googlePushToken;
                // if ( GameData.pushToken && !PlatformManager.checkIsIOSShenheSp())
                // {
                //     NetManager.request(NetRequestConst.REQUST_USER_SETPUSHTOKEN,{pushToken:GameData.pushToken});
                // }
            }
            else if (Number(code) == 1007) {
                console.log("money:" + data.msg);
                if (data.msg) {
                    var platMoney = JSON.parse(data.msg);
                    var l = platMoney.length;
                    for (var i = 0; i < l; i++) {
                        GameData.platMoney = platMoney[i] ? platMoney[i].currency : GameData.platMoney;
                        if (platMoney[i] && platMoney[i].productNo) {
                            if (!GameData.platMoneyData) {
                                GameData.platMoneyData = {};
                            }
                            GameData.platMoneyData[platMoney[i].productNo] = platMoney[i];
                        }
                    }
                    if (PlatformManager.checkisLocalPrice()) {
                        Config.RechargeCfg.formatLocalPriceCfg();
                    }
                }
            }
            else if (Number(code) == 1010) {
                console.log("money 1010  : " + data.msg);
                if (data.msg) {
                    var msgObj = JSON.parse(data.msg);
                    GameData.platMoneyData2 = msgObj;
                    if (PlatformManager.checkisLocalPrice()) {
                        Config.RechargeCfg.formatLocalPriceCfg();
                    }
                }
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
    function pay(productId, callback, callbackThisObj) {
        var pdid = productId; //g1,g2
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(productId);
        if (PlatformManager.checkIsWanbaSp()) {
            var data_1 = window["OPEN_DATA"];
            var platform = data_1.platform;
            var app = data_1.qua.app;
            productId = Config.RechargeCfg.wanbaCfg[productId]["pid" + platform];
            window["__payError"] = function () {
                //支付失败执行
                App.CommonUtil.showTip(LanguageManager.getlocal("payFailTip"));
            };
            window["__payClose"] = function () {
                //关闭对话框执行,IOS下无效
                App.CommonUtil.showTip(LanguageManager.getlocal("payCancelTip"));
            };
        }
        else {
            if (itemCfg.orderid) {
                productId = itemCfg.orderid;
            }
        }
        var payInfo = new productInfo();
        payInfo.coinNum = itemCfg.gemCost.toString();
        payInfo.currency = RSDKHelper.currency();
        payInfo.gameUserId = GameData.userId.toString();
        payInfo.gameUserName = Api.playerVoApi.getPlayerName();
        payInfo.price = itemCfg.cost.toString();
        var data = { productId: itemCfg.id };
        if (PlatformManager.checkIs3KSp()) {
            data.allProductId = Config.RechargeCfg.getAllProductid().join(",");
        }
        if (checkWifeABTest()) {
            data.channelId = "17003002";
        }
        else {
            formatChannelId(data);
        }
        payInfo.privateData = JSON.stringify(data);
        payInfo.productCount = "1";
        payInfo.productId = productId;
        payInfo.productName = itemCfg.gemCost + LanguageManager.getlocal("gemName");
        payInfo.productType = "1";
        payInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        payInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        payInfo.serverId = ServerCfg.selectServer.zid;
        payInfo.serverName = ServerCfg.selectServer.sname ? ServerCfg.selectServer.sname : ServerCfg.selectServer.zid;
        console.log("gamepay:" + PlatformManager.getAppid() + "::" + pdid);
        if (PlatformManager.getAppid() == "17027001" || PlatformManager.getAppid() == "17027006") {
            if (PlatformCfg.th3RechargeCfg.indexOf(pdid) > -1) {
                payInfo["other"] = "google";
                console.log("gamepay::" + payInfo["other"]);
            }
        }
        if (PlatformManager.checkIsXlSp() || PlatformManager.checkIsXySp()) {
            var monthCardId = ["g14", "g15"];
            var msg = LanguageManager.getlocal("userPayConfirmDesc", [String(itemCfg.gemCost), LanguageManager.getlocal("elementStr"), String(itemCfg.gemCost) + LanguageManager.getlocal("itemName_1")]);
            if (monthCardId.indexOf(itemCfg.id) > -1) {
                var reward = GameData.formatRewardItem(itemCfg.getReward)[0];
                msg = LanguageManager.getlocal("userPayConfirmDesc", [String(itemCfg.cost), LanguageManager.getlocal("elementStr"), reward.name + "x" + reward.num]);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: function () {
                    realPay(payInfo, itemCfg, callback, callbackThisObj);
                },
                handler: RSDKHelper,
                needCancel: true
            });
            return;
        }
        realPay(payInfo, itemCfg, callback, callbackThisObj);
    }
    RSDKHelper.pay = pay;
    function realPay(payInfo, itemCfg, callback, callbackThisObj) {
        if (GameData.payWaitSendDic[itemCfg.id] && (egret.getTimer() - Number(GameData.payWaitSendDic[itemCfg.id]) < GameData.payWaitSendCD)) {
            StatisticsHelper.reportGameLog("payWaitSend:" + itemCfg.id);
            return;
        }
        RSDK.pay(payInfo, function (code, data) {
            console.log("pay result:" + code);
            if (String(code) == "0") {
                if (!GameData.payWaitSendDic[itemCfg.id]) {
                    GameData.payWaitSendDic[itemCfg.id] = egret.getTimer();
                }
            }
            if (callback) {
                callback.call(callbackThisObj, { code: code });
            }
            if (String(code) == "-3") {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: LanguageManager.getlocal("userisInPayingTip"),
                    handler: RSDKHelper,
                    needCancel: false
                });
                return;
            }
            if (PlatformManager.checkIsWanbaSp()) {
                if (data && data.balance != null) {
                    var balance = Number(data.balance);
                    if (isNaN(balance) == false) {
                        if (Config.RechargeCfg.getMoneyName()) {
                            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, { msg: LanguageManager.getlocal("paySuccessLeftMoneyTip", [String(itemCfg.cost * 10), String(itemCfg.gemCost), String(balance), Config.RechargeCfg.getMoneyName()]), title: "itemUseConstPopupViewTitle", touchMaskClose: true });
                        }
                    }
                }
            }
        });
    }
    function share(callback) {
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "想成就一番伟业么？", desc: desc.desc || "开服是个芝麻官，七天之后当王爷！", imageurl: desc.imageurl };
        var shareId = "000";
        if (desc.shareId) {
            shareId = desc.shareId;
        }
        App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(content, GameData.userId.toString() + "_" + shareId);
        RSDK.share(content, callback);
    }
    RSDKHelper.share = share;
    // 设置分享信息
    function setShareInfo(shareInfo) {
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "想成就一番伟业么？", desc: desc.desc || "开服是个芝麻官，七天之后当王爷！", imageurl: desc.imageurl };
        var shareId = "000";
        if (desc.shareId) {
            shareId = desc.shareId;
        }
        App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(content, shareInfo + "_" + shareId);
    }
    RSDKHelper.setShareInfo = setShareInfo;
    function fbShare(callback) {
        console.log("QAZ fbShare");
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "一個官人七個妻 真實體驗古風官場生活",
            desc: desc.desc || "好男兒生當作人傑，三妻四妾，封王拜侯，爭雄稱霸!\n春風得意馬蹄疾，一日看盡長安花！快意一生！",
            imageurl: "http://pic.heyyogame.com/panwuxi/picture/201711220fa85dce39574e4e3640ad85370e16ed.jpg",
            link: "https://adv.heyyogame.com/adv.jsp?gamecode=GD&partnerName=share&advcode=GD_yypV_414" };
        RSDK.share(content, callback);
    }
    RSDKHelper.fbShare = fbShare;
    function krShare(callback) {
        console.log("QAZ krShare");
        var desc = LanguageManager.getShareDesc();
        var content = { title: desc.title || "역천인 - 이제까지 없던 정통 사극 RPG!",
            desc: desc.desc || "역사 속 위대한 위인, 경국지색의 미녀들과 함께 써나가는 당신만의 장대한 서사시. 신분의 한계를 뛰어넘어 왕이 되어라!",
            imageurl: "https://yccs.mayngames.co.kr/img/fbshare1.jpg",
            link: "https://yccs.mayngames.co.kr/fbshare" };
        RSDK.share(content, callback);
    }
    RSDKHelper.krShare = krShare;
    /**
     * 门客获得等专用的分享方法
     */
    function guideShare(shareContent, callback, shareId) {
        if (!shareId) {
            shareId = "000";
        }
        App.ShareGuideUtil.sharingId = shareId;
        RSDK.setShareInfo(shareContent, GameData.userId.toString() + "_" + shareId);
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
     *
     * @param code -1 登录统计  -2新手引导步数 -3 注册统计 -4 支付统计 -5 升级统计 -6 loading完成统计
     * @param info
     */
    function trackEvent(code, info) {
        if (PlatformManager.checkIsKRShenhe() || PlatformManager.checkIsTestSp()) {
            console.log("注意韩国审核服和test地址不统计");
            return;
        }
        try {
            var isABTest = checkWifeABTest();
            if (isABTest) {
                switch (code) {
                    case TRACK_LOGIN:
                    case TRACK_NEW_GUIDE:
                    case TRACK_REGISTER:
                    case LEVEL_UP:
                        info.channelId = "17003002";
                    default:
                }
            }
            formatChannelId(info);
            RSDK.trackEvent(code, info);
            if (checkApenAutoLoginABtest()) {
                switch (code) {
                    case TRACK_LOGIN:
                    case TRACK_NEW_GUIDE:
                    case TRACK_REGISTER:
                    case LEVEL_UP:
                        info.channelId = "17999001";
                    default:
                }
                RSDK.trackEvent(code, info);
            }
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
        eventInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        eventInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        eventInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        eventInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        eventInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        eventInfo.loginType = 0;
        trackEvent(TRACK_LOGIN, eventInfo);
        console.log("QAZ analyticsLogin" + TRACK_LOGIN);
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
        eventInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
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
        console.log("QAZ analyticsRegister" + TRACK_REGISTER);
        if (PlatformManager.checkIsTWBSp() && !PlatformManager.checkIsTest()) {
            StatisticsHelper.report_register_tw();
        }
    }
    RSDKHelper.analyticsRegister = analyticsRegister;
    function analyticsPay(id, orderId) {
        var itemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(id);
        var eventInfo = {};
        eventInfo.gameUserId = GameData.userId.toString();
        eventInfo.gameUserName = Api.playerVoApi.getPlayerName();
        eventInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        eventInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        eventInfo.serverId = ServerCfg.selectServer.zid;
        eventInfo.serverName = ServerCfg.selectServer.sname;
        eventInfo.orderId = orderId;
        eventInfo.price = itemCfg.cost;
        eventInfo.coinNum = itemCfg.gemCost;
        eventInfo.productCount = "1";
        eventInfo.productType = "1";
        eventInfo.currency = RSDKHelper.currency();
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
        gameuserInfo.roleLevel = Api.playerVoApi.getPlayerLevel().toString();
        gameuserInfo.roleVipLevel = Api.playerVoApi.getPlayerVipLevel().toString();
        gameuserInfo.registerTime = Api.gameinfoVoApi.getRegdt().toString();
        gameuserInfo.balance = Api.playerVoApi.getPlayerGem().toString();
        gameuserInfo.guild_name = Api.playerVoApi.getPlayerAllianceName();
        gameuserInfo.guild_id = Api.playerVoApi.getPlayerAllianceId().toString() == "0" ? "" : Api.playerVoApi.getPlayerAllianceId().toString();
        gameuserInfo.fighting = Api.playerVoApi.getPlayerPower().toString();
        gameuserInfo.loginType = 2;
        trackEvent(LEVEL_UP, gameuserInfo);
        if (PlatformManager.checkIsTWBSp() && PlatformManager.checkIsTest() == false && Api.playerVoApi.getPlayerLevel() == 4) {
            StatisticsHelper.report_uplevel4_tw();
        }
    }
    RSDKHelper.analyticsLevelup = analyticsLevelup;
    function analyticsVipup() {
        var key = "achieved_VIP" + Api.playerVoApi.getPlayerVipLevel();
        analyticsByHyKey(key);
    }
    RSDKHelper.analyticsVipup = analyticsVipup;
    /**
     * 港台cost2000统计
     */
    function analyticsCost2000() {
        analyticsByHyKey("cost_2000");
    }
    RSDKHelper.analyticsCost2000 = analyticsCost2000;
    function analyticsByHyKey(key) {
        console.log("调用analyticsByHyKey " + key);
        try {
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
            gameuserInfo.customEventName = key;
            trackEvent(TRACK_TW_COST_2000, gameuserInfo);
            console.log("QAZ analyticsRegister" + TRACK_TW_COST_2000);
        }
        catch (e) {
            console.log(key + " error");
        }
    }
    RSDKHelper.analyticsByHyKey = analyticsByHyKey;
    function analyticsLoadEnd() {
        var eventInfo = {};
        // eventInfo.gameUserId=GameData.userId.toString();
        // eventInfo.gameUserName=Api.playerVoApi.getPlayerName()?Api.playerVoApi.getPlayerName():GameData.userId.toString();
        // eventInfo.roleLevel=Api.playerVoApi.getPlayerLevel().toString();
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
        if (PlatformManager.checkIsKRSp() && (Number(PlatformManager.getAppVersion()) > 1 || Number(PlatformManager.getAppVersion()) == 0)) {
            var eventInfo = {};
            eventInfo.gameUserId = GameData.userId.toString();
            eventInfo.serverId = ServerCfg.selectServer.zid;
            try {
                trackEvent(TRACK_TUTORIAL_END, eventInfo);
            }
            catch (e) {
                console.log("analyticsCompleteNewGuide error");
            }
        }
    }
    RSDKHelper.analyticsCompleteNewGuide = analyticsCompleteNewGuide;
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
     * 港台cost2000统计
     */
    var TRACK_TW_COST_2000 = "-8";
    function checkAttention() {
        try {
            return RSDK.checkFollow();
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.checkAttention = checkAttention;
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
    /** 绑定手机号开关 */
    function checkHasBindPhoneFunc(callback) {
        try {
            RSDK.callSdk("checkHasBindPhoneFunc", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/checkHasBindPhoneFunc error");
        }
    }
    RSDKHelper.checkHasBindPhoneFunc = checkHasBindPhoneFunc;
    /** 绑定手机号  是否绑定过 */
    function ifBindPhone(callback) {
        try {
            RSDK.callSdk("ifBindPhone", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/ifBindPhone error");
        }
    }
    RSDKHelper.ifBindPhone = ifBindPhone;
    /** 绑定手机号调起绑定界面 */
    function doBindPhone(callback) {
        try {
            RSDK.callSdk("doBindPhone", null, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/doBindPhone error");
        }
    }
    RSDKHelper.doBindPhone = doBindPhone;
    /**
     * 闲徕/闲逸 渠道获取钻石数
    */
    function getXlSpDiamondNum(callback) {
        try {
            RSDK.callSdk("diamondNum", "", callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/diamondNum error");
        }
    }
    RSDKHelper.getXlSpDiamondNum = getXlSpDiamondNum;
    /**
     *  闲逸 调用钻石商城方法
    */
    function getXySpShowDiamondStore(callback) {
        try {
            RSDK.callSdk("h5xyshowDiamondStore", "", callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/diamondNum error");
        }
    }
    RSDKHelper.getXySpShowDiamondStore = getXySpShowDiamondStore;
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
    /** 微信获取更多游戏路径 */
    function getMoreGameIcon(callback) {
        try {
            RSDK.callSdk("getMoreGameIcon", {}, callback);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/getMoreGameIcon error" + e);
        }
    }
    RSDKHelper.getMoreGameIcon = getMoreGameIcon;
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
    function callSdk(action, data, callback) {
        RSDK.callSdk(action, data, callback);
    }
    RSDKHelper.callSdk = callSdk;
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
     * 调用Appstore评分
     */
    function openAppStoreScore() {
        try {
            if (PlatformManager.checkIsRuSp() == true) {
                RSDK.callSdk("onAppStoreScore", { title: "Если Вам понравились наша игра", message: "Оставьте нам отзыв." }, function () { });
            }
            else {
                RSDK.callSdk("onAppStoreScore", { title: "喜歡妾身的服務嗎？", message: "您也可以撰寫評論" }, function () { });
            }
        }
        catch (e) {
            console.log("调用RSDK.callSdk onAppStoreScore error");
        }
    }
    RSDKHelper.openAppStoreScore = openAppStoreScore;
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
    function openUrl(url, callback, callbackThisObj) {
        try {
            RSDK.callSdk("openlink", { url: url }, null);
            // return RSDK.requestDesktop(data,callback.bind(callbackThisObj));
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.openUrl = openUrl;
    /** 微信小游戏客服 */
    function showWxCustomerService() {
        try {
            RSDK.callSdk("showWxCustomerService", {}, function () { });
        }
        catch (e) {
            return;
        }
    }
    RSDKHelper.showWxCustomerService = showWxCustomerService;
    function formatChannelId(data) {
        if (PlatformManager.checkIsGDTAD1User()) {
            data.channelId = "17003005";
        }
        else if (PlatformManager.checkIsGDTAD2User()) {
            data.channelId = "17003006";
        }
        else if (PlatformManager.checkIsGDTUser()) {
            data.channelId = "17003004";
        }
        else if (PlatformManager.getIsWanbaQQLive() || PlatformManager.checkIsWanbaFromWx()) {
            data.channelId = "17003003";
        }
        else if (PlatformManager.checkIsMmSp() && App.DeviceUtil.isIOS()) {
            data.channelId = "17026002";
        }
    }
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
                RSDK.callSdk("showFkVipIcon", { mainClass: LayerManager.mainIns }, function () { });
                showedWxVipIcon = true;
            }
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.showFkVipIcon = showFkVipIcon;
    /**
     * 统计权势
     */
    function reportGameResult() {
        try {
            var reportData = {
                "playerAttr": {
                    "level": Api.playerVoApi.getPlayerLevel(),
                    "danLevel": Api.playerVoApi.getPlayerLevel(),
                    "power": Api.playerVoApi.getPlayerPower()
                }
            };
            RSDK.callSdk("reportGameResult", reportData, function () { });
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.reportGameResult = reportGameResult;
    /**
     * 玩一玩检测是否显示红包按钮
     * 成功会回调
     */
    function isUserInRedPackageActivity(checkResoultCallback, callbackThisObj) {
        try {
            RSDK.callSdk("isUserInRedPackageActivity", {}, function (isUserInRed) {
                if (isUserInRed) {
                    if (checkResoultCallback) {
                        checkResoultCallback.call(callbackThisObj);
                    }
                }
            }.bind(RSDKHelper));
        }
        catch (e) {
        }
    }
    RSDKHelper.isUserInRedPackageActivity = isUserInRedPackageActivity;
    /**
     * 玩一玩点红包
     */
    function redPackageButtonEvent() {
        try {
            RSDK.callSdk("redPackageButtonEvent", {}, function () { });
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.redPackageButtonEvent = redPackageButtonEvent;
    /**
     * 和悦检测服务器状态
     */
    function heyueCheckServer(serverId) {
        try {
            console.log("heyueCheckServer start");
            RSDK.callSdk("heyueCheckServer", { server_id: serverId }, function () { });
        }
        catch (e) {
            return false;
        }
    }
    RSDKHelper.heyueCheckServer = heyueCheckServer;
    /** 谷歌游戏外支付检测 */
    function checkReceiveGooglePlayPoint() {
        try {
            console.log("调用RSDK.callSdk/receiveGooglePlayPoint");
            RSDK.callSdk("receiveGooglePlayPoint", "", null);
        }
        catch (e) {
            console.log("调用RSDK.callSdk/receiveGooglePlayPoint error");
        }
    }
    RSDKHelper.checkReceiveGooglePlayPoint = checkReceiveGooglePlayPoint;
    /**
     * 统计的货币单位
     */
    function currency() {
        if (PlatformManager.checkIsKRSp()) {
            if (App.DeviceUtil.isAndroid()) {
                return "KRW";
            }
            else if (App.DeviceUtil.isIOS()) {
                return "USD";
            }
        }
        else if (PlatformManager.checkIsThSp()) {
            if (PlatformManager.checkIsThHw()) {
                return "THB";
            }
            else {
                return "USD";
            }
        }
        if (PlatformManager.checkIsFB()) {
            return "USD";
        }
        return "CNY";
    }
    RSDKHelper.currency = currency;
    /**
     * 检测是否有绑定功能
     */
    function hasBindFunc() {
        if (RSDK.hasBindFunc) {
            return RSDK.hasBindFunc();
        }
        return false;
    }
    RSDKHelper.hasBindFunc = hasBindFunc;
    /**
     * 检测是否已经绑定
     * @param callback 检测结果，code==1 是绑定成功
     */
    function checkBindStatus(callback) {
        RSDK.checkBindStatus(callback);
    }
    RSDKHelper.checkBindStatus = checkBindStatus;
    function checkPushToken() {
        try {
            RSDK.callSdk("getJPregistrationID", null, function (pushToken) {
                if (pushToken && !PlatformManager.checkIsIOSShenheSp()) {
                    GameData.pushToken = pushToken;
                    NetManager.request(NetRequestConst.REQUST_USER_SETPUSHTOKEN, { pushToken: GameData.pushToken });
                }
            });
        }
        catch (e) {
            console.log("调用RSDK.callSdk checkPushToken error");
        }
    }
    RSDKHelper.checkPushToken = checkPushToken;
    /**
     * 绑定接口,回调同检测绑定接口
     */
    function callBind(callback) {
        RSDK.callBind(callback);
    }
    RSDKHelper.callBind = callBind;
    function sendMobileCode(mobile, callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            RSDK.callSdk('sendMobileCode', { mobile: mobile }, function (code) {
                //code == 0 为发送成功
                if (code == 0) {
                    if (callback) {
                        callback.call(callbackThisObj);
                    }
                }
            });
        }
    }
    RSDKHelper.sendMobileCode = sendMobileCode;
    function checkMobileCode(mobile, code, callback, callbackThisObj) {
        if (RSDKHelper.isInit) {
            RSDK.callSdk('checkMobileCode', { mobile: mobile, code: code }, function (code) {
                //code == 0 为发送成功
                if (code == 0) {
                    if (callback) {
                        callback.call(callbackThisObj);
                    }
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_code_error"));
                }
            });
        }
    }
    RSDKHelper.checkMobileCode = checkMobileCode;
    function setAppOnBackHandler(callback, callbackThisObj) {
        RSDK.callSdk("setAppOnBackPressedListener", {}, function () {
            console.log("setAppOnBack");
            if (callback) {
                callback.apply(callbackThisObj);
            }
        });
    }
    RSDKHelper.setAppOnBackHandler = setAppOnBackHandler;
    function goAppExit() {
        console.log("goAppExit");
        RSDK.callSdk("goAppExit", {}, function () { });
    }
    RSDKHelper.goAppExit = goAppExit;
    function switchAreaOrLanguage(area, language) {
        RSDK.callSdk("callClientFunction", { functionName: "reciveCommonSubAppId", data: { commonSubAppId: area, gameLanguage: language } }, function () { });
    }
    RSDKHelper.switchAreaOrLanguage = switchAreaOrLanguage;
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
    /**
     * iframe弹窗打开url页面
     * @param url 目标url地址
     * @param title 标题，可以无
     */
    function loadUrl(url, title) {
        console.log("调用 RSDK.loadUrl " + url);
        RSDK.loadUrl(url, title);
    }
    RSDKHelper.loadUrl = loadUrl;
})(RSDKHelper || (RSDKHelper = {}));
//# sourceMappingURL=RSDKHelper.js.map