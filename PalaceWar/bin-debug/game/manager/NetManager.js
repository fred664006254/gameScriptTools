/**
 * 网络通信管理
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
var NetManager;
(function (NetManager) {
    NetManager.curReceiveCmd = "";
    var requestNum = 0;
    /**
     * 发送socket请求
     * @param cmd 请求key
     * @param data 数据
     * @param addQueue 是否添加到请求队列，默认true 添加到队列，如设置false则不走请求队列另起ws，需注意非队列的ws没有login，如要设置false请先和后端确认此请求是否可行
     */
    function request(cmd, data, addQueue) {
        if (addQueue === void 0) { addQueue = true; }
        switch (cmd) {
            case NetRequestConst.REQUEST_PRICHAT_SENDMSG:
            case NetRequestConst.REQUEST_CROSSCHAT_SENDMSG:
                if (data && data.content) {
                    Api.chatVoApi.checkShieldAndReportChat(data.content);
                }
                break;
            case NetRequestConst.REQUEST_USER_LOGIIN:
                data.clientVersion = GameConfig.version;
                break;
        }
        requestNum++;
        data = formatRequest(cmd, data);
        socket.send(data, formatReceive, NetManager, addQueue);
    }
    NetManager.request = request;
    /**
     * 事件打点追踪 类型要和服务端商量好后定义
     * @param kid 事件整体类型 如 女性玩家追踪
     * @param id 具体事件打点 如 点击哪个红颜事件
     */
    function trackEvent(kid, id) {
        this.request(NetRequestConst.REQUEST_STATS_TRACKEVENT, {
            kid: kid,
            id: id
        });
    }
    NetManager.trackEvent = trackEvent;
    var chatSendData = null;
    var requestChatCallback = null;
    var requestChatCallbackThisObj = null;
    function requestChat(chatData, requestCallback, requestCallbackThisObj) {
        var channel = chatData.channel;
        var senderName = Api.playerVoApi.getPlayerName();
        var reciverName = "";
        var message = chatData.message;
        Api.chatVoApi.checkShieldAndReportChat(message);
        var sendTime = GameData.serverTime;
        var data = {};
        data.type = "chat";
        data.channel = channel;
        data.sender = Api.playerVoApi.getPlayerID();
        data.sendername = senderName;
        // data.reciver = reciver;
        data.recivername = reciverName;
        var kinget = 0;
        if (Api.promoteVoApi.isKing()) {
            kinget = Api.promoteVoApi.getKingEndtime();
        }
        // kinget = GameData.serverTime + 5000;
        data.content =
            {
                "message": message,
                "pic": Api.playerVoApi.getPlayePicId(),
                "vip": Api.playerVoApi.getPlayerVipLevel(),
                "title": Api.playerVoApi.getTitleInfo(),
                "headBg": Api.playerVoApi.getPlayerPtitle(),
                "sign": Api.chatVoApi.getChatSign(),
                "ket": kinget,
                hideVip: Api.otherInfoVoApi.getOpenHideVip()
            };
        data.ts = GameData.serverTime;
        data.zoneid = ServerCfg.selectServer.zid;
        chatSendData = data;
        requestChatCallback = requestCallback;
        requestChatCallbackThisObj = requestCallbackThisObj;
        var callback = function (e) {
            var sData = e.data;
            if (sData.ret == false) {
                return App.CommonUtil.showTip(LanguageManager.getlocal("searchPersonTalk73"));
            }
            chatSendData.mkey = (sData.data && sData.data.data) ? sData.data.data.mkey : "";
            // data.ts = sendTime;
            chat.send(chatSendData, requestChatCallback, requestChatCallbackThisObj);
            requestChatCallback = requestChatCallbackThisObj = null;
            App.LogUtil.log("发送聊天数据", chatSendData);
        };
        var typeKey = getMessageName(NetRequestConst.REQUEST_CHAT_ENCRYPT);
        if (!App.MessageHelper.hasEventListener(typeKey)) {
            App.MessageHelper.addEventListener(typeKey, callback, NetManager);
        }
        request(NetRequestConst.REQUEST_CHAT_ENCRYPT, {});
        //  App.LogUtil.log("发送聊天数据",data);
        // chat.send(data);
    }
    NetManager.requestChat = requestChat;
    function chatServerLogout(callback, callbackThisObj) {
        var tb = {};
        tb["type"] = "quit";
        tb["uid"] = Api.playerVoApi.getPlayerID();
        tb["nickname"] = Api.playerVoApi.getPlayerName();
        tb["access_token"] = GameData.access_token;
        tb["ts"] = GameData.logints;
        // var aid = Api.playerVoApi.getPlayerAllianceId();
        // var aid = LocalStorageManager.get("lastAllianceId")
        var aid = Api.chatVoApi._lastAllianceId;
        if (aid != 0) {
            tb["channel"] = Number(aid);
        }
        App.LogUtil.log("登出聊天服务器", tb);
        chat.send(tb, callback, callbackThisObj);
    }
    NetManager.chatServerLogout = chatServerLogout;
    function chatServerLogin(callback, callbackThisObj) {
        var tb = {};
        tb["type"] = "login";
        tb["uid"] = (Api.playerVoApi.getPlayerID() ? Api.playerVoApi.getPlayerID() : 0); //Base.curUid;//uid;
        tb["nickname"] = Api.playerVoApi.getPlayerName();
        tb["access_token"] = GameData.access_token; //token;
        tb["ts"] = GameData.logints; //ts;
        var aid = Api.playerVoApi.getPlayerAllianceId();
        if (aid != 0) {
            tb["channel"] = aid;
        }
        var timeStr = Base64.encode(App.MathUtil.getRandom(10, 99) + GameData.logints.toString());
        var qStr = timeStr.substr(0, 2);
        var hStr = timeStr.substr(2);
        var keyStrs = Base64.encode((App.MathUtil.getRandom(5, 1000000) * 2.3).toString());
        var urlParm = qStr + keyStrs.substr(0, 5) + hStr;
        tb["pstr"] = urlParm;
        App.LogUtil.log("登陆聊天服务器", tb);
        chat.send(tb, function (data) {
            if (callback && data && data.status == 'success') {
                callback.apply(callbackThisObj);
            }
        }, NetManager);
        // LocalStorageManager.set("lastAllianceId", String(aid));
        Api.chatVoApi._lastAllianceId = aid;
    }
    NetManager.chatServerLogin = chatServerLogin;
    /**
     * 处理发送数据
     * @param data json对象
     */
    function formatRequest(cmd, data) {
        var result = {};
        var params = data ? data : {};
        if (cmd != NetRequestConst.REQUEST_CLIENT_CHAT) {
            switch (cmd) {
                case NetRequestConst.REQUEST_USER_LOGIIN:
                    params["client_ip"] = GameData.client_ip;
                    params["pid"] = PlatformManager.userId;
                    if (GameData.pushToken) {
                        params["pushToken"] = GameData.pushToken;
                    }
                    params["serverip"] = ServerCfg.lastServer.ip_server;
                    params["serverport"] = ServerCfg.lastServer.port_server;
                    // params["bindid"] = 
                    // params["buidtype"] = 
                    // params["deviceid"] = 
                    break;
                // default:
                // 	params = data;
                // 	break;	
            }
            result["cmd"] = cmd;
            result["params"] = params;
            // 添加公共数据start
            result["uid"] = GameData.userId;
            result["ts"] = GameData.serverTime;
            result["logints"] = GameData.logints;
            result["rnum"] = requestNum;
            result["zoneid"] = ServerCfg.selectServer.zid;
            if (GameData.tstInputStr) {
                result["whitebi"] = GameData.tstInputStr;
            }
            // 
            if ((PlatformManager.checkIsLocal() && !App.TestUtil.getTestPlat()) || PlatformManager.checkIs3KSp() || PlatformManager.checkIsFkylcSp()) {
                result["access_token"] = diffRequest(GameData.access_token, GameData.serverTime, cmd);
            }
            else {
                result["access_token"] = GameData.access_token;
            }
            // 添加公共数据end	
        }
        else {
            // todo聊天数据
        }
        return result;
    }
    function diffRequest(a, t, c) {
        if (a && a.length > 0) {
            var s1 = a.substring(0, 5);
            var s2 = a.substring(5, 10);
            var s3 = a.substring(10, a.length);
            var nc = Base64.encode(s2 + t + s1 + c + s3);
            if (nc.length > 60) {
                nc = nc.substring(9, 59);
            }
            else {
                nc = nc.substring(1, nc.length);
            }
            var reg = new RegExp(String(t % 9), "g");
            nc = nc.replace(reg, "");
            return nc;
        }
    }
    /**
     * 处理接收数据
     * @param data json对象
     */
    function formatReceive(rpdata, callbackAction) {
        var status = rpdata.status;
        var data = rpdata.data;
        var checkData = null;
        if (status == "timeout" || status == "fail") {
            console.log("game socket" + status);
            checkData = checkServerData(data);
            // return;
        }
        else if (data) {
            if (data.ts) {
                GameData.serverTime = data.ts;
                // 计算服务器和客户端时间差
                GameData.serverClientTimeDt = data.ts - new Date().getTime() / 1000;
            }
            if (data.timezone != null) {
                GameData.timeZone = data.timezone;
            }
            if (data.cmd) {
                NetManager.curReceiveCmd = data.cmd;
            }
            var rData = data.data;
            var isLogin = false;
            if (data.cmd && data.cmd == NetRequestConst.REQUEST_USER_LOGIIN) {
                //todo
                LocalStorageManager.set(LocalStorageConst.LOCAL_USER_NAME, PlatformManager.userId);
                if (!callbackAction) {
                    return GameConfig.switchNewOrOldCfg(rData && rData.newCfgFlag != null, function () {
                        formatReceive(rpdata, true);
                    }, NetManager);
                }
                if (rData && rData.notices) {
                    GameData.announcementData = data.data.notices;
                    var tmpIdDic = {};
                    var operaIdDic = {};
                    var tmpOperaMaxT = 0;
                    var tmpMaxT = 0;
                    for (var key in GameData.announcementData) {
                        if (GameData.announcementData.hasOwnProperty(key)) {
                            var noticeData = GameData.announcementData[key];
                            if (noticeData.time_st && noticeData.time_st > tmpMaxT) {
                                tmpMaxT = Number(noticeData.time_st);
                                if ((!tmpIdDic[String(tmpMaxT)]) || tmpIdDic[String(tmpMaxT)] < noticeData.id) {
                                    tmpIdDic[String(tmpMaxT)] = noticeData.id;
                                }
                            }
                            if (noticeData.pub_t && noticeData.pub_t > tmpOperaMaxT) {
                                tmpOperaMaxT = Number(noticeData.pub_t);
                                if ((!operaIdDic[String(tmpOperaMaxT)]) || operaIdDic[String(tmpOperaMaxT)] < noticeData.id) {
                                    operaIdDic[String(tmpOperaMaxT)] = noticeData.id;
                                }
                            }
                        }
                    }
                    if (tmpOperaMaxT > tmpMaxT) {
                        GameData.announcementLastestT = tmpOperaMaxT + "_" + operaIdDic[tmpOperaMaxT];
                    }
                    else {
                        GameData.announcementLastestT = tmpMaxT + "_" + tmpIdDic[tmpMaxT];
                    }
                }
                // rData.wbrewards = "6_1004_4|6_1302_4|6_1301_4|6_1303_4";
                // rData.wbrewardsFlag = true;
                //玩吧礼包
                if (rData && rData.wbrewards != null) {
                    GameData.wbrewards = rData.wbrewards;
                }
                if (rData && rData.hideReward) {
                    GameData.hideReward = rData.hideReward;
                }
                /**
                 * 玩吧礼包
                 */
                if (rData && rData.wbrewardsFlag != null) {
                    GameData.wbrewardsFlag = rData.wbrewardsFlag;
                }
                /**
                 *openShenhe 是否开启审核 1:开启审核、屏蔽排行榜  0:打开排行榜关闭审核
                 */
                // if(rData&&rData.switch&&rData.switch.openShenhe)
                // {
                // 	GameData.openShenhe =rData.switch.openShenhe;
                // }
                /**
                 * 糖果屋登录
                 */
                if (rData && rData.candyflag != null) {
                    GameData.candyflag = rData.candyflag;
                }
                /**
                 * 玩吧数据上报
                 */
                if (rData && rData.closeSource != null) {
                    GameData.closeSource = rData.closeSource;
                }
                /**
                 * 游戏内输入迁服验证码
                 */
                if (rData && rData.wbisshow != null) {
                    GameData.wbisshow = rData.wbisshow;
                }
                if (rData && rData.bioHave != null) {
                    GameData.bioHave = rData.bioHave;
                }
                /**
                 * 玩吧，设置分享信息
                 */
                // alert("checkIsFkylcSp:" + PlatformManager.checkIsFkylcSp());
                // if (RSDKHelper.isInit && (PlatformManager.checkIsWanbaSp() || PlatformManager.checkIs4399Sp() || PlatformManager.checkIsAiweiyouSp() || PlatformManager.checkIsFkylcSp())) {
                if (RSDKHelper.isInit) {
                    var tmpUid_1 = data.uid;
                    egret.callLater(function () {
                        // alert("RSDKHelper.setShareInfo:"+ tmpUid);
                        RSDKHelper.setShareInfo(tmpUid_1);
                    }, null, data.uid);
                }
                isLogin = true;
            }
            if (rData && rData.statUrl) {
                GameData.statUrl = rData.statUrl;
            }
            if (rData && rData.limitVipLv) {
                GameData.limitVipLv = rData.limitVipLv;
                GameData.limitVipLv.sort(function (a, b) {
                    return a - b;
                });
            }
            /**
             * 聊天等级
             */
            if (rData && rData.chatlevel != null) {
                GameData.chatlevel = rData.chatlevel;
            }
            //推送消息
            if (rData && rData.gamebarmsg != null) {
                PlatformManager.pushMsg(rData.gamebarmsg);
            }
            //红点 2020.6.29
            if (rData && rData.redpoint != null && data.cmd == NetRequestConst.REQUEST_USER_SYNC) {
                Api.redpointVoApi.formatData(rData.redpoint);
                Api.acVoApi.isHandled_LRP = false;
            }
            if (data.timezone != null) {
                GameData.timeZone = data.timezone;
            }
            checkData = checkServerData(data);
            if (checkData.ret == false) {
                if (checkData.data.ret == -125) {
                    ViewController.getInstance().openView(ViewConst.POPUP.OFFLINEVIEW, {
                        title: "itemUseConstPopupViewTitle",
                        msg: LanguageManager.getlocal("accountprompting"),
                        callback: this.refreshHandler,
                        handler: this,
                        needCancel: false
                    });
                }
                if (checkData.data.ret == -999) {
                    var rewardStr = LanguageManager.getlocal("accountLock");
                    // let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        title: "itemUseConstPopupViewTitle",
                        msg: rewardStr,
                        callback: this.doDis,
                        handler: this,
                        needCancel: false
                    });
                    NetLoading.hide();
                    return;
                }
            }
            else {
                Api.formatData(rData, data.cmd);
                if (rData.rewards) {
                    Api.formatRewardData(rData.rewards);
                }
                if (rData.unlockServant && !rData.unlockWife) {
                    if (data.cmd == NetRequestConst.REQUEST_USER_UPGRADE) {
                        var data_1 = { unlockServant: rData.unlockServant };
                        Api.servantVoApi.setWaitShowData(data_1);
                    }
                    else {
                        // ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,rData.unlockServant); 
                        Api.verifySpecialReward(rData.unlockServant, true);
                    }
                }
                if (rData.unlockWife && data.cmd != NetRequestConst.REQUEST_USER_LOGIIN) {
                    if (data.cmd == NetRequestConst.REQUEST_USER_UPGRADE || data.cmd == NetRequestConst.REQUEST_SEARCH_PLAY) {
                        var data_2 = { unlockWife: rData.unlockWife, unlockServant: rData.unlockServant };
                        Api.wifeVoApi.setWaitShowWife(data_2);
                    }
                    else {
                        Api.verifySpecialReward(rData.unlockWife, false);
                        // ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
                    }
                }
                Api.openSpecialView();
                if (rData.unlockServantSkin) {
                    if (data.cmd == NetRequestConst.REQUEST_USER_UPGRADE) {
                        var data2 = { unlockServantSkin: rData.unlockServantSkin };
                        Api.servantVoApi.setWaitShowData2(data2);
                    }
                    //App.CommonUtil.showTip(LanguageManager.getlocal("unLockServantSkinTip"));
                }
                if (isLogin && Config.AcCfg.isGetAll == false) {
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG, {});
                }
            }
            // 解析公共数据start
            if (data.ts && checkData.ret == true) {
                TickManager.startTick();
            }
            // 版本踢人
            if (data.data && data.data.verinfo && data.data.verinfo.ver && window["VERINFO_VER"] && data.data.verinfo.ver > window["VERINFO_VER"]) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: data.data && data.data.verinfo && data.data.verinfo.msg ? data.data.verinfo.msg : LanguageManager.getlocal("versionCompareInfo"),
                    callback: function (dlg) {
                        window.location.reload();
                    },
                    handler: null,
                    clickNotAutoHide: true,
                    inLayer: LayerManager.maskLayer
                });
            }
        }
        // 解析公共数据end
        //上面填解析data代码
        var requestType = (data && data.cmd) ? data.cmd : NetRequestConst.REQUEST_CLIENT_CHAT;
        App.MessageHelper.dispatchNetMessage(requestType, checkData);
    }
    function refreshHandler() {
        LoginManager.changeAccount();
    }
    NetManager.refreshHandler = refreshHandler;
    function formatPushData(data) {
        formatReceive(data);
        if (data && data.data && data.data.cmd == NetPushConst.PUSH_PAY) {
            var tmpData = data.data;
            if (tmpData && tmpData.payment && tmpData.payment.itemId) {
                delete GameData.payWaitSendDic[tmpData.payment.itemId];
            }
        }
    }
    NetManager.formatPushData = formatPushData;
    /**
     * 处理聊天数据
     * @param data
     */
    function formatReceiveChat(data) {
        if (data.type != "chat") {
            return;
        }
        Api.formatChatData(data);
    }
    NetManager.formatReceiveChat = formatReceiveChat;
    /**
     * 检查数据是否有报错
     * @param data
     */
    function checkServerData(data) {
        var ret = true;
        if (data.ret < 0) {
            var cmd = data.cmd;
            if (cmd && GameConfig.noTipCmd.indexOf(cmd) < 0) {
                var tipKey = "";
                tipKey = cmd.replace(".", "") + "FailCode" + data.ret;
                if (data.ret == ResponseEnums.socketError) {
                    tipKey = "netWarnDesc";
                }
                else {
                    if (LanguageManager.checkHasKey(tipKey) == false) {
                        tipKey = "requestFailCode" + data.ret;
                    }
                    if (LanguageManager.checkHasKey(tipKey) == false) {
                        tipKey = "requestLoadErrorTip";
                    }
                }
                App.CommonUtil.showTip(LanguageManager.getlocal(tipKey));
            }
            ret = false;
        }
        return { data: data, ret: ret };
    }
    NetManager.checkServerData = checkServerData;
    /**
     * 根据请求cmd
     * @param requestType
     */
    function getMessageName(requestType) {
        return "socket_receivedata_" + requestType;
    }
    NetManager.getMessageName = getMessageName;
    /**
     * 检测是否是https连接
     */
    function checkHttps() {
        return Http.getProtocol() == "https:";
    }
    NetManager.checkHttps = checkHttps;
})(NetManager || (NetManager = {}));
//# sourceMappingURL=NetManager.js.map