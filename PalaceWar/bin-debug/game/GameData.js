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
    // 服务器id
    // export let curZoneID:number = 1;
    // 合服前服务器id
    // export let curOldZoneID:number = null;
    // 登录时临时存放的用户填写的绑定过的用户名
    // export let tmpUserName:string = "";
    // 登录时临时存放的用户填写的绑定过的用户密码
    GameData.tmpUserPassword = "";
    // 统计id
    GameData.statisticsId = 0;
    // 当前服务器名称
    GameData.curArea = "CN-15001";
    // 用户客户端ip
    GameData.client_ip = "127.0.0.1";
    // 用户平台id
    GameData.platId = "";
    // 用户uid
    GameData.userId = null;
    GameData.access_token = "0";
    GameData.logints = 0;
    GameData.localCfg = ["192.168", "localhost", "127.0.0.1", "gt-local-web01.raygame3.com"];
    GameData.testCfg = ["gt_test"];
    /**暂停心跳同步 默认false */
    GameData.pauseSync = false;
    /**心跳同步数据时间戳 */
    GameData.lastAutoSyncTime = 0;
    /**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
    GameData.serverClientTimeDt = 0;
    /**公告数据 */
    GameData.announcementData = {};
    GameData.announcementLastestT = null;
    /**进服之前公告数据 */
    GameData.announcementLoginLastTime = 0;
    /**玩吧礼包 */
    GameData.wbrewards = null;
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
     * 是不是已经显示过府邸
     */
    GameData.isShowedHomeScene = false;
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
     *
     */
    GameData.fbTradeType = "h5heyuefb-1003005004";
    GameData.fbTwTradeType = "h5heyuefb-17004008";
    /**
     * 是否支持像素碰撞
     */
    GameData.isSupportHitTestPoint = true;
    /**是否开始发生统计圣诞次数的消息 */
    GameData.isSendAcChristmasMessage = true;
    /**除夕签到活动的时间 */
    GameData.acNewYearSignUpTime = 0;
    /**除夕签到活动的时间 */
    GameData.isOpenNewYearSignUpView = true;
    /**
     * 命令强制使用壳子socket
     */
    GameData.testUseClientSocket = false;
    GameData.acPopTime = 0;
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
    /** 需要隐藏的道具奖励数组 */
    GameData.hideReward = [];
    /**
     * 当前用到的资源控制文件名，做统计用
     */
    GameData.curDefaultName = "resource/default.res.json";
    /**
     * 聊天发表情字符串前缀 用于区分表情和文字信息
     */
    GameData.emoticonMsgStr = "EmoticonJsmr";
    /**
     * 调试命令输入的内容
     */
    GameData.tstInputStr = "";
    /**
     * 新ui popupview x 偏差
     */
    GameData.popupviewOffsetX = 26.5;
    /**
     * 当前使用的大区默认统计ID，对游戏来说是大区标识，游戏过程中不能被清除
     */
    GameData.curBigType = "";
    /**
     * wbisshow 登录请求返回，表示需要弹出游戏内输入迁服验证码
     */
    GameData.wbisshow = false;
    /**
     * bioHave 是否有列传本纪获得着，用于列传本纪排行榜红点
     */
    GameData.bioHave = false;
    /**
     * 默认启用新的websocket链接处理低优先级请求，比如user.sync
     */
    GameData.useNewWS = false;
    /**
     * 是否已经获取最近登录服，不用清理
     */
    GameData.isGetLastLogin = false;
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
    // 获取国家，
    function getCountry() {
        if (PlatformManager.checkIsTWBSp() == true) {
            return "tw";
        }
        else if (PlatformManager.checkIsKRSp() == true) {
            return "kr";
        }
        else if (PlatformManager.checkIsThSp() == true) {
            return "th";
        }
        else if (PlatformManager.checkIsEnLang() == true) {
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
        var key = PlatformManager.getSpid();
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
                key = PlatformManager.getSpidKey();
                break;
            case "names":
            case "shield":
            case "shieldname":
                key = PlatformManager.getSpidKey();
                break;
            case "agreement":
                key = PlatformManager.getSpidKey();
                addEnd = false;
                break;
            case "gameconfig":
                key = key;
                break;
            default:
                break;
        }
        if (PlatformManager.checkIsLocal() || PlatformManager.checkIsIOSShenheSp()) {
            var tmpcnName = PlatformManager.checkIsAreaPkg() ? key : App.CommonUtil.getOption("language");
            var tmpStr = addEnd ? (prefix + tmpcnName) : (tmpcnName + prefix);
            if (tmpcnName && RES.hasRes(tmpStr)) {
                key = tmpcnName;
            }
            else {
                if (PlatformManager.checkIOSShenheOtherLanguage()) {
                    key = PlatformManager.checkIOSShenheOtherLanguage();
                }
                else if (PlatformManager.checkIsAreaPkg()) {
                    key = "en";
                }
                else {
                    key = "cn";
                }
            }
        }
        else {
            if (PlatformManager.checkIsAreaPkg()) {
                var tmpStr = addEnd ? (prefix + key) : (key + prefix);
                if (!ResourceManager.hasRes(tmpStr)) {
                    key = GameConfig.getAreaLangKey();
                    var tmpStr_1 = addEnd ? (prefix + key) : (key + prefix);
                    if (!ResourceManager.hasRes(tmpStr_1)) {
                        key = "en";
                    }
                }
            }
            else {
                var tmpStr = addEnd ? (prefix + key) : (key + prefix);
                if (!ResourceManager.hasRes(tmpStr)) {
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
            return ResourceManager.getRes(key);
        }
        else {
            return ResourceManager.getRes(prefix + "cn");
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
     * 解析奖励物品格式
     * @param rewards 奖励原始数据
     * @param sameAdd 去重
     */
    function formatRewardItem(rewards, sameAdd) {
        if (sameAdd === void 0) { sameAdd = false; }
        var arr = new Array();
        // 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
        if (rewards) {
            var rewardsArr = rewards.split("|");
            for (var i = 0; i < rewardsArr.length; i++) {
                if (GameData.hideReward && GameData.hideReward.length > 0) {
                    var str = rewardsArr[i];
                    var strArr = rewardsArr[i].split("_");
                    var checkNewStr = strArr[0] + "_" + strArr[1] + "_1";
                    if (GameData.hideReward.indexOf(checkNewStr) > -1) {
                        continue;
                    }
                }
                var rewardItemVo = new RewardItemVo();
                rewardItemVo.initData(rewardsArr[i]);
                rewardItemVo.originalIdx = i;
                //如果不开称帝，前端屏蔽人望奖励
                if (!Api.switchVoApi.checkOpenPrestige()) {
                    if (rewardItemVo.type == 17) {
                        continue;
                    }
                }
                if (sameAdd) {
                    var noSame = true;
                    for (var i_1 = 0; i_1 < arr.length; i_1++) {
                        var oneVo = arr[i_1];
                        if (oneVo.type == rewardItemVo.type && (oneVo.id == rewardItemVo.id || oneVo.type == 2 || oneVo.type == 3 || oneVo.type == 4)) {
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
        return arr;
    }
    GameData.formatRewardItem = formatRewardItem;
    /**
     * 解析奖励物品格式 返回奖励文本 金币+100 粮食+100 士兵 +100
     * @param rewards 奖励原始数据
     */
    function getRewardsStr(rewards) {
        var rewardsStr = "";
        // 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
        if (rewards) {
            var rewardsArr = rewards.split("|");
            for (var i = 0; i < rewardsArr.length; i++) {
                if (GameData.hideReward && GameData.hideReward.length > 0) {
                    var str = rewardsArr[i];
                    var strArr = rewardsArr[i].split("_");
                    var checkNewStr = strArr[0] + "_" + strArr[1] + "_1";
                    if (GameData.hideReward.indexOf(checkNewStr) > -1) {
                        continue;
                    }
                }
                var rewardItemVo = new RewardItemVo();
                rewardItemVo.initData(rewardsArr[i]);
                if (rewardsStr == "") {
                    rewardsStr = rewardItemVo.message;
                }
                else {
                    rewardsStr = rewardsStr + " " + rewardItemVo.message;
                }
            }
        }
        return rewardsStr;
    }
    GameData.getRewardsStr = getRewardsStr;
    /**
     * 获取物品Icon
     * @param itemVo 物品模型
     * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
     * @param isShowEffect 是否显示特效，true显示，注意，需要显示时，对面的界面需要提前添加资源文件  itemeffect.png
     * @param isshowMagnifier 是否显示放大镜，true
     *
     */
    function getItemIcon(itemVo, isTouchShowInfo, isShowEffect, isshowMagnifier, num) {
        if (isShowEffect === void 0) { isShowEffect = false; }
        if (isshowMagnifier === void 0) { isshowMagnifier = true; }
        if (num === void 0) { num = null; }
        var container = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create(itemVo.iconBg);
        container.addChild(iconBg);
        iconBg.name = "iconBg";
        container.width = iconBg.width;
        container.height = iconBg.height;
        var icon = BaseLoadBitmap.create(itemVo.icon);
        icon.name = "icon";
        var firstChar = itemVo.icon.substr(0, 13);
        if (firstChar == "servant_half_" || firstChar.indexOf("skin_half_") > -1) {
            icon.setScale(100 / 180);
        }
        if (itemVo.type == 10) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            icon.setScale(0.5);
        }
        if (itemVo.type == 12) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            icon.setScale(0.5);
        }
        if (itemVo.type == 16) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            icon.setScale(0.5);
        }
        if (itemVo.type == 24) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
            // icon.setScale(100/110);
        }
        else if (itemVo.type == 19) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
        }
        container.addChild(icon);
        container.bindData = itemVo;
        icon.setPosition(4, 5);
        if (itemVo.type == 12) {
            icon.x = 0;
        }
        // if(itemVo instanceof Config.ItemItemCfg )
        // {
        if (itemVo.target == 7) {
            var picstr = "servant_half_" + itemVo.targetId;
            icon.setload(picstr);
            icon.setScale(100 / 180);
            icon.y = 5;
            var arry = itemVo.getRewards.split("_");
            var abcfg = GameConfig.config.abilityCfg[arry[1]];
            var framepic = "itemframe" + arry[0] + "_" + abcfg.type;
            var framebg = BaseLoadBitmap.create(framepic);
            framebg.y = 0;
            framebg.x = 1;
            container.addChild(framebg);
            var star = BaseLoadBitmap.create("servant_star");
            star.setPosition(3, 77);
            container.addChild(star);
            var starnum = ComponentManager.getBitmapText(String(abcfg.num), "tip_fnt");
            starnum.setPosition(star.x + 27, star.y);
            container.addChild(starnum);
        }
        else if (itemVo.target == 8) {
            var arry = itemVo.getRewards.split("_");
            var picstr = "wife_half_" + arry[1];
            icon.setScale(100 / 205);
            icon.setload(picstr);
            // icon.x = 5;
            icon.y = 8;
            var framepic = "itemframe" + arry[0];
            var framebg = BaseLoadBitmap.create(framepic);
            framebg.y = 0;
            framebg.x = 1;
            container.addChild(framebg);
        }
        // }
        if (itemVo.type == 1002) {
            if (itemVo.id == 0) {
                var noTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayNoRed'), 18);
                noTxt.lineSpacing = 5;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noTxt, iconBg);
                container.addChild(noTxt);
            }
            else {
                var item = itemVo;
                var txt1 = ComponentManager.getTextField(item._code, 18);
                txt1.y = 60;
                var txt2 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetRed3'), 12);
                txt2.y = 62;
                txt1.x = (container.width - (txt1.textWidth + txt2.textWidth + 3)) / 2;
                txt2.x = txt1.x + txt1.textWidth + 3;
                container.addChild(txt1);
                container.addChild(txt2);
            }
        }
        if ((itemVo instanceof RewardItemVo) && itemVo.num) {
            if (itemVo.type == 15 || itemVo.type == 14) {
                var numbg = BaseBitmap.create("public_itemtipbg2");
                numbg.width = 100;
                numbg.scaleY = 22 / numbg.height;
                numbg.setPosition(container.width / 2 - numbg.width / 2, container.height - 22);
                container.addChild(numbg);
                var numberstr = LanguageManager.getlocal("itemName_" + itemVo.type) + itemVo.num;
                if (itemVo.id > 10) {
                    numberstr = itemVo.num.toString();
                    numbg.visible = false;
                }
                var numLb = ComponentManager.getTextField(numberstr, 18);
                numLb.name = "numLb";
                container.addChild(numLb);
                if (itemVo.id > 10) {
                    numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height);
                }
                else {
                    numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height);
                }
            }
            else {
                var numLb = ComponentManager.getTextField(itemVo.num.toString(), 16, TextFieldConst.COLOR_WHITE);
                numLb.name = "numLb";
                var numbg = BaseBitmap.create("public_9_itemnumbg");
                if (itemVo.num > 99) {
                    numbg.width = numLb.width + 18;
                }
                numbg.name = "numbg";
                numbg.setPosition(iconBg.width - numbg.width - 4, iconBg.height - numbg.height - 4);
                numLb.setPosition(iconBg.width - numLb.width - 12, numbg.y + numbg.height / 2 - numLb.height / 2);
                container.addChild(numbg);
                container.addChild(numLb);
                // numbg.visible = false;
            }
        }
        else if (num != null) {
            var numLb = ComponentManager.getTextField(String(num), 16, TextFieldConst.COLOR_WHITE);
            numLb.name = "numLb";
            var numbg = BaseBitmap.create("public_9_itemnumbg");
            if (num > 99) {
                numbg.width = numLb.width + 18;
            }
            numbg.name = "numbg";
            numbg.setPosition(iconBg.width - numbg.width - 4, iconBg.height - numbg.height - 4);
            numLb.setPosition(iconBg.width - numLb.width - 12, numbg.y + numbg.height / 2 - numLb.height / 2);
            container.addChild(numbg);
            container.addChild(numLb);
        }
        if (isTouchShowInfo) {
            iconBg.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            }, GameData, [(itemVo instanceof RewardItemVo) ? itemVo : itemVo.id]);
            icon.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            }, GameData, [(itemVo instanceof RewardItemVo) ? itemVo : itemVo.id]);
        }
        if (isShowEffect) {
            var temScale = 1 / 0.74;
            var effectClip = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            effectClip.x = icon.x + 50 - 198 * temScale / 2;
            effectClip.y = icon.y + 52 - 197 * temScale / 2;
            container.addChild(effectClip);
            effectClip.scaleX = effectClip.scaleY = temScale;
            effectClip.playWithTime(-1);
        }
        if (itemVo instanceof Config.ItemItemCfg || itemVo.type == 6) {
            var cfg = Config.ItemCfg.getItemCfgById(itemVo.id);
            if (cfg && cfg.showContent && cfg.showContent == 1 && isshowMagnifier == true) {
                var magnifierIcon = BaseBitmap.create("public_magnifier");
                magnifierIcon.width = 38;
                magnifierIcon.height = 38;
                magnifierIcon.x = 70;
                magnifierIcon.y = 2;
                magnifierIcon.name = "magnifierIcon";
                container.addChild(magnifierIcon);
                magnifierIcon.addTouchTap(function (event, item) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOEXTENDPOPUPVIEW, item);
                }, GameData, [(itemVo instanceof RewardItemVo) ? itemVo : itemVo.id]);
            }
        }
        return container;
    }
    GameData.getItemIcon = getItemIcon;
    /**
     * 获取奖励物品Icon
     * @param rewards 奖励原始数据
     * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
     * @param isShowEffect 是否显示特效
     */
    function getRewardItemIcons(rewards, isTouchShowInfo, isShowEffect, isSame) {
        if (isShowEffect === void 0) { isShowEffect = false; }
        if (isSame === void 0) { isSame = false; }
        var arr = new Array();
        var rewardsArr = GameData.formatRewardItem(rewards, isSame);
        for (var i = 0; i < rewardsArr.length; i++) {
            var rewardItemIcon = GameData.getItemIcon(rewardsArr[i], isTouchShowInfo, isShowEffect);
            arr.push(rewardItemIcon);
        }
        return arr;
    }
    GameData.getRewardItemIcons = getRewardItemIcons;
    function getRewardItemVoByIdAndType(type, id) {
        if (type) {
            return formatRewardItem(type + "_" + id + "_0")[0];
        }
        return null;
    }
    GameData.getRewardItemVoByIdAndType = getRewardItemVoByIdAndType;
    function getRewardItemIconByIdAndType(type, id, isTouchShowInfo, num) {
        if (type) {
            return getRewardItemIcons(type + "_" + id + "_" + String(num ? num : 0), isTouchShowInfo)[0];
        }
        return null;
    }
    GameData.getRewardItemIconByIdAndType = getRewardItemIconByIdAndType;
    /**
     * 根据icon名字和背景名字获取icon图标
     * @param iconName
     * @param iconBgName
     */
    function getIconContainer(iconName, iconBgName, num) {
        if (num === void 0) { num = null; }
        var container = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create(iconBgName);
        container.addChild(bg);
        bg.name = "iconBg";
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 100, 100);
        var icon = BaseLoadBitmap.create(iconName, rect, { callback: function (container) {
                if (container) {
                    var bg_1 = container.getChildByName("iconBg");
                    var icon_1 = container.getChildByName("icon");
                    if (bg_1 && icon_1) {
                        icon_1.setPosition((bg_1.width - icon_1.width) / 2, (bg_1.height - icon_1.height) / 2);
                    }
                }
            }, callbackThisObj: GameData, callbackParams: [container] });
        container.addChild(icon);
        icon.name = "icon";
        if (num != null) {
            var numLb = ComponentManager.getTextField(num.toString(), 16, TextFieldConst.COLOR_WHITE);
            numLb.name = "numLb";
            var numbg = BaseBitmap.create("public_9_itemnumbg");
            if (num > 99) {
                numbg.width = numLb.width + 18;
            }
            numbg.name = "numbg";
            numbg.setPosition(bg.width - numbg.width - 4, bg.height - numbg.height - 4);
            numLb.setPosition(bg.width - numLb.width - 12, numbg.y + numbg.height / 2 - numLb.height / 2);
            container.addChild(numbg);
            container.addChild(numLb);
        }
        return container;
    }
    GameData.getIconContainer = getIconContainer;
    /**
     * 检测限时红颜会不会显示
     */
    function checkTimeLimitWife() {
        var vo = Api.shopVoApi.getPayInfoById2("g16");
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        if (cfg && vo && Number(vo.isbuy) == 0) {
            var wifeEt = vo.st + cfg.lastTime;
            var wifevo = GameData.formatRewardItem(cfg.getReward)[0];
            var iswife = Api.wifeVoApi.getWifeInfoVoById(wifevo.id);
            if (wifeEt > GameData.serverTime && Api.switchVoApi.checkOpenTimeLimitWife() && (!iswife)) {
                return true;
            }
        }
        return false;
    }
    GameData.checkTimeLimitWife = checkTimeLimitWife;
    /**
     * 皇帝说话的字数限制
     */
    function emperortalkMaxNumber() {
        if (PlatformManager.checkIsThSp()) {
            return PlatformCfg.emperortalkMaxNumberCfg["th"];
        }
        else if (PlatformManager.checkIsEnLang()) {
            return PlatformCfg.emperortalkMaxNumberCfg["en"];
        }
        return PlatformCfg.emperortalkMaxNumberCfg["other"];
    }
    GameData.emperortalkMaxNumber = emperortalkMaxNumber;
    /**聊天最大长度 */
    function chatMaxNumber() {
        if (PlatformManager.checkIsEnLang()) {
            return PlatformCfg.chatMaxNumberCfg["en"];
        }
        if (PlatformManager.checkIsRuLang()) {
            return PlatformCfg.chatMaxNumberCfg["ru"];
        }
        return PlatformCfg.chatMaxNumberCfg["other"];
    }
    GameData.chatMaxNumber = chatMaxNumber;
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
                break;
            }
        }
    }
    GameData.arrayPutItemLast = arrayPutItemLast;
    function arrayDelItem(obj, array) {
        for (var i = 0; i < array.length; i++) {
            if (obj == array[i]) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    GameData.arrayDelItem = arrayDelItem;
    /**
     * 检测是否可以弹出公告
     */
    function checkShowNoticeInGame() {
        var localStr = LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID());
        var localT = 0;
        var localId = 0;
        var localserverT = 0;
        if (localStr && localStr.indexOf("-") > -1) {
            var tmpArr = localStr.split("-");
            var localTStr = tmpArr[0];
            localT = Number(localTStr.split("_")[0]);
            localId = Number(localTStr.split("_")[1]);
            var uid = tmpArr[2];
            localserverT = Number(tmpArr[1]);
            if (localserverT && App.DateUtil.checkIsToday(localserverT) == false) {
                LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID());
            }
            else if (localT && GameData.announcementLastestT) {
                var tmpLocalT = Number(GameData.announcementLastestT.split("-")[0].split("_")[0]);
                var tmpLocalId = Number(GameData.announcementLastestT.split("-")[0].split("_")[1]);
                if (tmpLocalT == localT && tmpLocalId == localId) {
                    return false;
                }
            }
        }
        else {
            LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW + Api.playerVoApi.getPlayerID());
        }
        return true;
    }
    GameData.checkShowNoticeInGame = checkShowNoticeInGame;
    /**
     * 检测是否可以弹出公告进服之前
     */
    function checkShowNoticeInLogin(noticeData) {
        var localStr = LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginManager.getLocalUserName());
        if (localStr) {
            var localT = Number(localStr);
            var currT = GameData.announcementLoginLastTime;
            var local0T = localT - localT % 86400;
            var curr0T = currT - currT % 86400;
            if (local0T != curr0T) {
                LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginManager.getLocalUserName());
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
        var localStr = LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW + LoginManager.getLocalUserName());
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
        return LanguageManager.getlocal("rechargeName_" + id);
    }
    GameData.getRechargeItemName = getRechargeItemName;
    function getRechargeItemDesc(id) {
        return LanguageManager.getlocal("rechargeDesc_" + id);
    }
    GameData.getRechargeItemDesc = getRechargeItemDesc;
    function dispose() {
        GameData.limitVipLv = null;
        GameData.closeSource = NaN;
        GameData.customerServiceData = null;
        GameData.isShowedHomeScene = false;
        GameData.fqGameStrategyData == { "intro": "", "rcontent": [], "faqcontent": [], "index": 0 };
        GameData.isSendAcChristmasMessage = true;
        GameData.acNewYearSignUpTime = 0;
        GameData.isOpenNewYearSignUpView = true;
        GameData.acPopTime = 0;
        GameData.payWaitSendDic = {};
        GameData.statUrl = null;
        GameData.announcementLastestT = null;
        GameData.lastAutoSyncTime = 0;
        GameData.hideReward.length = 0;
        GameData.wbisshow = false;
        GameData.bioHave = false;
    }
    GameData.dispose = dispose;
    /**
     * 特殊奖励viewName，type
     */
    function getViewNameForType(specialReward) {
        var viewName = "Special" + specialReward.type + "GetView";
        if (specialReward.type == "11") {
            var titlecfg = Config.TitleCfg.getTitleCfgById(specialReward.id);
            if (titlecfg.isTitle == 1) {
                if (titlecfg.titleType) {
                    viewName = "SpecialTitleGetView";
                }
                else {
                    viewName = "SpecialSkinGetView"; // 角色皮肤
                }
            }
            else if (titlecfg.isTitle == 2) {
                viewName = "SpecialHeadPortraitGetView"; //头像框
            }
            else if (titlecfg.isTitle == 3) {
                viewName = "SpecialSkinGetView"; // 角色皮肤
            }
            else if (titlecfg.isTitle == 4) {
                viewName = "SpecialTitle4GetView"; // 头衔
            }
            else if (titlecfg.isTitle == 5) {
                viewName = "SpecialHeadGetView"; // 头像
            }
            else if (titlecfg.isTitle == 6) {
                viewName = "SpecialChatBoxGetView"; // 聊天框
            }
        }
        if (specialReward.type == "Fame") {
            viewName = "AtkraceFameServantUpFameView";
        }
        return viewName;
    }
    GameData.getViewNameForType = getViewNameForType;
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
})(GameData || (GameData = {}));
//# sourceMappingURL=GameData.js.map