/**
 * 游戏全局的数据或者方法，能归类的按类放入不同的文件，不能归类的放这里，如:
 * DeviceUtil.ts     设备相关的数据
 * DisplayUtil.ts    显示相关的方法等
 * GameConfig.ts     全局的游戏配置
 * author dmj
 * date 2017/9/15
 * @namespace GameData
 */
var GameData;
(function (GameData) {
    /**上次咵天刷新的0点过2秒的时间戳 */
    GameData.lastFreshDayInfoTime = 0;
    /**
     * 时区
     */
    GameData.timeZone = 0;
    // 服务器id
    GameData.curZoneID = 1;
    // 合服前服务器id
    // export let curOldZoneID:number = null;
    // 登录时临时存放的用户填写的绑定过的用户名
    // export let tmpUserName:string = "";
    // 登录时临时存放的用户填写的绑定过的用户密码
    GameData.tmpUserPassword = "";
    // 统计id
    GameData.statisticsId = 0;
    // 用户客户端ip
    GameData.client_ip = "127.0.0.1";
    // 用户平台id
    GameData.platId = "";
    // 用户uid
    GameData.uid = 0;
    GameData.access_token = "0";
    GameData.logints = 0;
    GameData.localCfg = ["192.168", "localhost", "127.0.0.1"];
    GameData.testCfg = ["gt_test"];
    /**暂停心跳同步 默认false */
    GameData.pauseSync = false;
    /**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
    GameData.serverClientTimeDt = 0;
    /**公告数据 */
    GameData.announcementData = {};
    GameData.announcementLastestT = null;
    /**进服之前公告数据 */
    GameData.announcementLoginLastTime = 0;
    /**
     * 玩吧数据上报每多少个人上报一次
     */
    GameData.wanbaEvenyNumReport = 3;
    /**
     * 3kios 是否绑定手机
     */
    GameData.kkkIsBindIos = "0";
    /**
     * 聊天等级限制
     */
    GameData.chatlevel = 4;
    /**
     * 英文限制名字长度
     */
    GameData.nameLength = 18;
    /**
     * 泰文限制名字长度
     */
    GameData.nameThLength = 12;
    /**
     * 	英文玩家名字长度
     */
    GameData.usernameEnLength = 8;
    /**
     * 英文限制名字长度
     */
    GameData.nameEnLength = 6;
    /**
     * 英文限制帮会名字长度
     */
    GameData.allianceNameEnLength = 8;
    /**
     * 	俄文玩家名字长度
     */
    GameData.usernameRuLength = 12;
    /**
     * 俄罗斯文限制名字长度
     */
    GameData.nameRuLength = 9;
    /**
     * 俄罗斯文限制帮会名字长度
     */
    GameData.allianceNameRuLength = 12;
    /**
     * 俄罗斯跨服聊天免费次数
     */
    GameData.crossChatFreeTimes = 3;
    /**
     * 	英文玩家名字长度
     */
    GameData.usernamePtLength = 8;
    /**
     * 英文限制名字长度
     */
    GameData.namePtLength = 6;
    /**
     * 英文限制帮会名字长度
     */
    GameData.allianceNamePtLength = 8;
    /**
     * 客服信息
     */
    GameData.customerServiceData = null;
    /**
     * 是否加载跨域图片报错
     */
    GameData.isLoadCrossImageError = false;
    /**
     * 已经加载完成过图片
     */
    GameData.isLoadedSuccessImage = false;
    /** 谷歌推送 */
    GameData.pushToken = null;
    /**
     * 图层的y坐标
     */
    GameData.layerPosY = 0;
    /**
     * 图层的X偏移坐标
     */
    GameData.layerPosX = 0;
    /**
     * 实名认证防沉迷（一会儿就删）
     */
    GameData.isAntiaddiction = false;
    /**
     * 实名认证防沉迷开关
     */
    GameData.idcardSwitch = false;
    /**
     * 实名认证防沉迷是否去调收费接口的开关，三个状态，0去调收费接口，1只能游客登录，2仅验证身份证号码的有效性
     */
    GameData.idcardNoFreeApiSwitch = 0;
    /**
     * 实名认证防沉迷模式（0简易模式，1正常模式，）
     */
    GameData.idcardNormal = 0;
    /**
     * 实名认证防 是否强制认证
     */
    GameData.idcardConstraint = false;
    /**
     * 是否需要协议
     */
    GameData.showAgreement = false;
    /**
     * 为创建用户
     */
    GameData.notCreated = false;
    /**
     * 特殊的那个用户  需要让他协议重新弹
     */
    GameData.specialUser = 0;
    /**
     * 是否需要协议
     */
    GameData.phoneBindSwitch = 0;
    /**
     * 手机绑定开关
     */
    GameData.hasPhone = 0;
    /**
     * 实名认证是否进入过正常模式
     */
    GameData.idcardEnterNormal = 0;
    /**
     * 实名认证防沉迷用户类型0，1，2，3的类用户，详见文档
     */
    GameData.idcardType = "0";
    /**
     * Fq游戏攻略data
     */
    GameData.fqGameStrategyData = { "intro": "", "rcontent": [], "faqcontent": [], "index": 0 };
    /**
     * 分享聊天
     */
    GameData.sharechatcd = 1800;
    /**
     * 平台货币配置
     */
    GameData.platMoneyData = null; /*{"gdth.hw.20_h1800":{"microsPrice":"120000000","productDesc":"1800元宝","country":"CN","price":"CNY 120.00","currency":"CNY","productNo":"gdth.hw.20_h1800","productName":"1800元宝"},
    "gdth.hw.1_h90":{"microsPrice":"6000000","productDesc":"90元宝","country":"CN","price":"CNY 6.00","currency":"CNY","productNo":"gdth.hw.1_h90","productName":"90元宝"},
    "gdth.hw.16_y1440":{"microsPrice":"96000000","productDesc":"终身卡","country":"CN","price":"CNY 96.00","currency":"CNY","productNo":"gdth.hw.16_y1440","productName":"终身卡"},
    "gdth.hw.4_h360":{"microsPrice":"24000000","productDesc":"360元宝","country":"CN","price":"CNY 24.00","currency":"CNY","productNo":"gdth.hw.4_h360","productName":"360元宝"},
    "gdth.hw.4_y360":{"microsPrice":"24000000","productDesc":"月卡","country":"CN","price":"CNY 24.00","currency":"CNY","productNo":"gdth.hw.4_y360","productName":"月卡"},
    "gdth.hw.50_h4500":{"microsPrice":"300000000","productDesc":"4500元宝","country":"CN","price":"CNY 300.00","currency":"CNY","productNo":"gdth.hw.50_h4500","productName":"4500元宝"},
    "gdth.hw.100_h9000":{"microsPrice":"600000000","productDesc":"9000元宝","country":"CN","price":"CNY 600.00","currency":"CNY","productNo":"gdth.hw.100_h9000","productName":"9000元宝"}};*/
    /**
     * 平台货币配置2 对应登录 1010
     */
    GameData.platMoneyData2 = null;
    /**
     * 平台货币单位，只适用于通过sdk获取货币单位的情况
     */
    GameData.platMoney = ""; //CNY";
    /**
     * 是否支持像素碰撞
     */
    GameData.isSupportHitTestPoint = true;
    /**
     * 命令强制使用壳子socket
     */
    GameData.testUseClientSocket = false;
    /**
     * 支付成功等待发货的充值档
     */
    GameData.payWaitSendDic = {};
    GameData.payWaitSendCD = 20 * 1000;
    /**
     * 等待loading时间，超时统计
     */
    GameData.waitLdRpt = 5000;
    /**
     * 活动统计地址
     */
    GameData.statUrl = null;
    /**
     * 使用的语言版本
     */
    GameData.languageUsing = null;
    /**
     * 充值开关
     */
    GameData.closePay = false;
    /**
     * 当前用到的资源控制文件名，做统计用
     */
    GameData.curDefaultName = "resource/default.res.json";
    /**
     * 调试命令输入的内容
     */
    GameData.tstInputStr = "";
    /**
     * 当前使用的大区默认统计ID，对游戏来说是大区标识，游戏过程中不能被清除
     */
    GameData.curBigType = "";
    /**
     * 默认启用新的websocket链接处理低优先级请求，比如user.sync
     */
    GameData.useNewWS = false;
    /**
     * 是否已经获取最近登录服，不用清理
     */
    GameData.isGetLastLogin = false;
    /**
     * 是否是微信审核
     */
    GameData.isWxShenhe = false;
    ///////////////////////////////////////分割线|上面是变量|下面是方法///////////////////////////////////// 
    // 解析model.gameinfo
    function formatGameInfo(data) {
        if (data.statisticsId) {
            GameData.statisticsId = Number(data.statisticsId);
        }
        if (data.pid) {
            GameData.platId = data.pid;
        }
    }
    GameData.formatGameInfo = formatGameInfo;
    function getServerTime() {
        return Math.floor(GameData.serverTimeMs / 1000);
    }
    GameData.getServerTime = getServerTime;
    // 获取国家，
    function getCountry() {
        if (PlatMgr.checkIsTWBSp() == true) {
            return "tw";
        }
        else if (PlatMgr.checkIsKRSp() == true) {
            return "kr";
        }
        else if (PlatMgr.checkIsThSp() == true) {
            return "th";
        }
        else if (PlatMgr.checkIsEnLang() == true) {
            return "en";
        }
        else {
            return "cn";
        }
    }
    GameData.getCountry = getCountry;
    /**
     * 根据资源名获取对应渠道的资源名+标识，比如cn，gameconfig_tw，names_en，shield_th这种情况
     * @param prefix 不带标识的资源名，需要带上下划线，加前缀或者后缀会根据下划线来区分
     */
    function getLanguageKey(prefix) {
        var key = PlatMgr.getSpid();
        var addEnd = ((prefix.substr(0, 1) == "_") ? false : true);
        var tmpfix = prefix;
        if (!addEnd) {
            tmpfix = tmpfix.substr(1);
        }
        else if (tmpfix.substr(tmpfix.length - 1) == "_") {
            tmpfix = tmpfix.substr(0, tmpfix.length - 1);
        }
        switch (tmpfix) {
            case "sceneCfg":
            case "cn":
                prefix = "";
                key = PlatMgr.getSpidKey();
                break;
            case "names":
            case "shield":
            case "shieldname":
                key = PlatMgr.getSpidKey();
                break;
            case "agreement":
                key = PlatMgr.getSpidKey();
                addEnd = false;
                break;
            case "gameconfig":
                key = key;
                break;
            default:
                break;
        }
        if (PlatMgr.checkIsLocal() || PlatMgr.checkIsIOSShenheSp()) {
            var tmpcnName = PlatMgr.checkIsAreaPkg() ? key : App.CommonUtil.getOption("language");
            var tmpStr = addEnd ? (prefix + tmpcnName) : (tmpcnName + prefix);
            if (tmpcnName && RES.hasRes(tmpStr)) {
                key = tmpcnName;
            }
            else {
                if (PlatMgr.checkIOSShenheOtherLanguage()) {
                    key = PlatMgr.checkIOSShenheOtherLanguage();
                    if (!RES.hasRes(tmpStr)) {
                        key = "cn";
                    }
                }
                else if (PlatMgr.checkIsAreaPkg()) {
                    key = "en";
                }
                else {
                    key = "cn";
                }
            }
        }
        else {
            if (PlatMgr.checkIsAreaPkg()) {
                var tmpStr = addEnd ? (prefix + key) : (key + prefix);
                if (!ResMgr.hasRes(tmpStr)) {
                    key = GameConfig.getAreaLangKey();
                    var tmpStr_1 = addEnd ? (prefix + key) : (key + prefix);
                    if (!ResMgr.hasRes(tmpStr_1)) {
                        key = "en";
                    }
                }
            }
            else {
                var tmpStr = addEnd ? (prefix + key) : (key + prefix);
                if (!ResMgr.hasRes(tmpStr)) {
                    key = "cn";
                }
            }
        }
        return addEnd ? (prefix + key) : (key + prefix);
    }
    GameData.getLanguageKey = getLanguageKey;
    function getLanguageRes(prefix) {
        var key = getLanguageKey(prefix);
        if (RES.hasRes(key)) {
            return ResMgr.getRes(key);
        }
        else {
            return ResMgr.getRes(prefix + "cn");
        }
    }
    GameData.getLanguageRes = getLanguageRes;
    // 当前的渠道id
    function getCurPlatName() {
        return "0";
    }
    GameData.getCurPlatName = getCurPlatName;
    function isTest() {
        var result = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var url = window.location.href;
            for (var i = 0; i < GameData.testCfg.length; i++) {
                var str = GameData.testCfg[i];
                if (url.indexOf(str) > -1) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
    GameData.isTest = isTest;
    /**
     * 数组中是否包含某个元素
     */
    function isInArray(obj, array) {
        for (var i = 0; i < array.length; i++) {
            if (obj == array[i]) {
                return true;
            }
        }
        return false;
    }
    GameData.isInArray = isInArray;
    /**
     * 数组中包含某个元素 idx
     */
    function arrayIndexByItem(obj, array) {
        for (var i = 0; i < array.length; i++) {
            if (obj == array[i]) {
                return i;
            }
        }
        return -1;
    }
    GameData.arrayIndexByItem = arrayIndexByItem;
    /**
     * 数组中包含某个元素 放到最后
     */
    function arrayPutItemLast(obj, array) {
        for (var i = 0; i < array.length; i++) {
            if (obj == array[i]) {
                var item = array.splice(i, 1);
                array.push(item);
            }
        }
    }
    GameData.arrayPutItemLast = arrayPutItemLast;
    /**
     * 检测是否可以弹出公告进服之前
     */
    function checkShowNoticeInLogin(noticeData) {
        var localStr = LocalStorageMgr.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginMgr.getLocalUserName());
        if (localStr) {
            var localT = Number(localStr);
            var currT = GameData.announcementLoginLastTime;
            var local0T = localT - localT % 86400;
            var curr0T = currT - currT % 86400;
            if (local0T != curr0T) {
                LocalStorageMgr.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginMgr.getLocalUserName());
                return true;
            }
            if (noticeData && noticeData.length > 0) {
                for (var i = 0; i < noticeData.length; i++) {
                    if (noticeData[i].st > localT && noticeData[i].st <= currT) {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    }
    GameData.checkShowNoticeInLogin = checkShowNoticeInLogin;
    /**
     * 检测是否可以弹出公告进服之前 是否同一天
     */
    function checkShowNoticeIsTodayInLogin() {
        var localStr = LocalStorageMgr.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginMgr.getLocalUserName());
        if (localStr) {
            var localT = Number(localStr);
            var currT = GameData.announcementLoginLastTime;
            App.LogUtil.log("checkIsTodayInLogin: " + localT + " currT: " + currT);
            var local0T = localT - localT % 86400;
            var curr0T = currT - currT % 86400;
            if (local0T == curr0T) {
                return true;
            }
        }
        return false;
    }
    GameData.checkShowNoticeIsTodayInLogin = checkShowNoticeIsTodayInLogin;
    function getRechargeItemName(id) {
        return LangMger.getlocal("rechargeName_" + id);
    }
    GameData.getRechargeItemName = getRechargeItemName;
    function getRechargeItemDesc(id) {
        return LangMger.getlocal("rechargeDesc_" + id);
    }
    GameData.getRechargeItemDesc = getRechargeItemDesc;
    function dispose() {
        GameData.limitVipLv = null;
        GameData.closeSource = NaN;
        GameData.customerServiceData = null;
        GameData.fqGameStrategyData == { "intro": "", "rcontent": [], "faqcontent": [], "index": 0 };
        GameData.payWaitSendDic = {};
        GameData.statUrl = null;
        GameData.announcementLastestT = null;
        GameData.timeZone = 0;
        GameData.uid = 0;
        GameData.isWxShenhe = false;
        GameData.lastFreshDayInfoTime = 0;
    }
    GameData.dispose = dispose;
    function getMonthDayByYearAndMonth(year, month) {
        var day = 31;
        if (month == 2) {
            if (year % 4 == 0 && year != 1900) {
                day = 29;
            }
            else {
                day = 28;
            }
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            day = 30;
        }
        return day;
    }
    GameData.getMonthDayByYearAndMonth = getMonthDayByYearAndMonth;
    /**
     * 时间段 上午(5:00 – 11:00)，正午(11:00-17:00)，傍晚(17:00-23:00)和深夜(23:00-5:00)
     *   对应 1234
     */
    function getTimeIsnterval() {
        var d = Math.floor(Date.now() / 1000) + 28800;
        var t = Math.floor(d % 86400 / 3600);
        var f = 1;
        if (t < 5 || t >= 23) {
            f = 4;
        }
        else if (t < 11) {
            f = 1;
        }
        else if (t < 17) {
            f = 2;
        }
        else {
            f = 3;
        }
        return f;
    }
    GameData.getTimeIsnterval = getTimeIsnterval;
    /**
     * 解析奖励物品格式
     * @param rewards 奖励原始数据
     * @param sameAdd 去重
     */
    function formatRewardItem(rewards, sameAdd) {
        if (sameAdd === void 0) { sameAdd = false; }
        var arr = new Array();
        if (rewards) {
            var rewardsArr = rewards.split("|");
            for (var i = 0; i < rewardsArr.length; i++) {
                var rewardItemVo = new RewardItemVo();
                rewardItemVo.initData(rewardsArr[i]);
                rewardItemVo.originalIdx = i;
                if (sameAdd) {
                    var noSame = true;
                    for (var i_1 = 0; i_1 < arr.length; i_1++) {
                        var oneVo = arr[i_1];
                        if (oneVo.type == rewardItemVo.type && oneVo.id == rewardItemVo.id) {
                            oneVo.num += rewardItemVo.num;
                            noSame = false;
                            break;
                        }
                    }
                    if (noSame) {
                        arr.push(rewardItemVo);
                    }
                }
                else {
                    arr.push(rewardItemVo);
                }
            }
        }
        arr.sort(function (a, b) {
            return a.id - b.id;
        });
        return arr;
    }
    GameData.formatRewardItem = formatRewardItem;
    /**
     * 获取物品Icon
     * @param itemVo 物品模型
     * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
     * @param isShowEffect 是否显示特效，true显示，注意，需要显示时，对面的界面需要提前添加资源文件  itemeffect.png
     * @param isshowMagnifier 是否显示放大镜，true
     *
     */
    function getItemIcon(itemVo, num, isTouchShowInfo, isNewstatus) {
        if (num === void 0) { num = 0; }
        var container = new BaseDisplayObjectContainer();
        var mask = BaseBitmap.create("public_alphabg"); //
        mask.width = 108;
        mask.height = num ? 132 : 108;
        container.width = mask.width;
        container.height = mask.height;
        container.addChild(mask);
        mask.alpha = 0;
        if (itemVo.type == 100) {
            var diceicon = App.CommonUtil.getDiceIconById(itemVo.id.toString(), 1);
            container.addChild(diceicon);
            if (num) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceicon, mask, [0, -5]);
                var numTxt = ComponentMgr.getTextField("x" + num, TextFieldConst.SIZE_CONTENT_COMMON);
                container.addChild(numTxt);
                numTxt.name = "numTxt";
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, mask, [0, 0]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, diceicon, mask);
            }
            if (isTouchShowInfo) {
                var dicecfg_1 = Config.DiceCfg.getCfgById(itemVo.id);
                diceicon.addTouchTap(function () {
                    ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
                        title: dicecfg_1.name,
                        handler: null,
                        needCancel: false,
                        needClose: 1,
                        id: "100_" + dicecfg_1.id + "_" + num,
                        costnum: LangMger.getlocal("sysconfirm"),
                        // costIcon : `ab_mainui_gem`,
                        touchMaskClose: true
                    });
                }, diceicon);
            }
            if (isNewstatus) {
                //是新获得的
                var newState = BaseBitmap.create("dicenewget");
                // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, newState, container, [0,0]);
                newState.setScale(0.6);
                container.addChild(newState);
            }
        }
        else {
            var iconBg = BaseBitmap.create(itemVo.iconBg); //
            container.addChild(iconBg);
            iconBg.name = "iconBg";
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconBg, mask);
            var iconstr_1 = itemVo.icon;
            var icon_1 = BaseLoadBitmap.create(iconstr_1, null, {
                callback: function () {
                    icon_1.setScale(100 / icon_1.width);
                    if (iconstr_1 == "item1" || iconstr_1 == "item2") {
                        icon_1.setScale(0.7);
                        icon_1.y = 20;
                    }
                    if (num) {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, icon_1, mask);
                        // if(RES.hasRes(itemVo.iconBg)){
                        // 	iconBg.setScale(108/iconBg.width);
                        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, iconBg, [0,iconBg.height*iconBg.scaleY + 10]);
                        // }
                        // else{
                        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, icon, [0,icon.height*icon.scaleY + 10]);
                        // }
                    }
                    else {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon_1, mask);
                    }
                },
                callbackThisObj: this
            });
            icon_1.name = "icon";
            container.addChild(icon_1);
            if (num) {
                var numTxt = ComponentMgr.getTextField("x" + num, TextFieldConst.SIZE_CONTENT_COMMON);
                container.addChild(numTxt);
                numTxt.name = "numTxt";
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, mask, [0, 0]);
            }
            if (isTouchShowInfo) {
                if (itemVo.type == 50) {
                    icon_1.addTouchTap(function (event, item) {
                        ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                            title: itemVo.name,
                            needCancel: false,
                            needClose: 1,
                            boxId: itemVo.id,
                        });
                    }, this);
                    iconBg.addTouchTap(function (event, item) {
                        ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                            title: itemVo.name,
                            needCancel: false,
                            needClose: 1,
                            boxId: itemVo.id,
                        });
                    }, this);
                }
                else if (itemVo.type == 1 || itemVo.type == 2) {
                    icon_1.addTouchTap(function () {
                        ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                            title: itemVo.name,
                            handler: null,
                            needCancel: false,
                            needClose: 1,
                            param: itemVo,
                            costnum: LangMger.getlocal("sysconfirm"),
                        });
                    }, this);
                    iconBg.addTouchTap(function () {
                        ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                            title: itemVo.name,
                            handler: null,
                            needCancel: false,
                            needClose: 1,
                            param: itemVo,
                            costnum: LangMger.getlocal("sysconfirm"),
                        });
                    }, this);
                }
            }
        }
        container.bindData = itemVo;
        // if(isShowEffect)
        // {
        // 	let temScale = 1/0.74;
        // 	let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
        // 	effectClip.x = icon.x + 50 - 198*temScale/2;
        // 	effectClip.y = icon.y + 52 - 197*temScale/2;
        // 	container.addChild(effectClip);
        // 	effectClip.scaleX = effectClip.scaleY = temScale;
        // 	effectClip.playWithTime(-1);
        // }
        // if(itemVo instanceof Config.ItemItemCfg ||itemVo.type==6)
        // {
        // 	var cfg =Config.ItemCfg.getItemCfgById(itemVo.id);
        // 	if(cfg&&cfg.showContent&&cfg.showContent==1&&isshowMagnifier==true)
        // 	{ 
        // 		let magnifierIcon:BaseBitmap = BaseBitmap.create("public_magnifier");  
        // 		magnifierIcon.width = 38;
        // 		magnifierIcon.height = 38;
        // 		magnifierIcon.x =70;
        // 		magnifierIcon.y =2;
        // 		magnifierIcon.name = "magnifierIcon";
        // 		container.addChild(magnifierIcon);
        // 		magnifierIcon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>
        // 		{
        // 			ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOEXTENDPOPUPVIEW,item);
        // 		},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);
        // 	} 
        // } 
        return container;
    }
    GameData.getItemIcon = getItemIcon;
})(GameData || (GameData = {}));
//# sourceMappingURL=GameData.js.map