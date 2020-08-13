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
    // 服务器时间
    GameData.serverTime = 0;
    GameData.serverTimeMs = 0;
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
    GameData.localCfg = ["192.168", "localhost", "127.0.0.1", "king-test.leishenhuyu.com", "local-test-82.raygame3.com"];
    GameData.testCfg = ["gt_test"];
    /**暂停心跳同步 默认false */
    GameData.pauseSync = false;
    /**心跳同步数据时间戳 */
    GameData.lastAutoSyncTime = 0;
    /**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
    GameData.serverClientTimeDt = 0;
    /**服务器开服时间（只有调用了otherinfo.getserverinfo赋值后才有值） */
    GameData.serverOpenTime = 0;
    /**公告数据 */
    GameData.announcementData = {};
    /**玩吧礼包 */
    GameData.wbrewards = null;
    /**
     * 是否支持像素碰撞
     */
    GameData.isSupportHitTestPoint = true;
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
     * 红颜脱衣服Vip等级
     */
    GameData.striplevel = 0;
    /**
     * 英文限制名字长度
     */
    GameData.nameLength = 10;
    /**
     * 昆仑大区ID
     */
    GameData.bigPayId = 0;
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
     * 微信IOS支付等级限制
     */
    GameData.ioslevellimit = null;
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
     * 是否使用新的UI
     */
    GameData.isUseNewUI = true;
    /**
     * 实名认证是否进入过正常模式
     */
    GameData.idcardEnterNormal = 0;
    /**
     * 实名认证防沉迷用户类型0，1，2，3的类用户，详见文档
     */
    GameData.idcardType = "0";
    /**
     * pid白名单
     */
    GameData.pidflag = false;
    /**
     * ip白名单
     */
    GameData.regionflag = true;
    /**
     * 分享聊天
     */
    GameData.sharechatcd = 1800;
    /**
     * 聊天的最大字数限制
     */
    GameData.chatMaxChars = 60;
    /**
     * 是否内部测试
     */
    GameData.isTestUser = false;
    /**
     * 是不是已经显示过府邸
     */
    GameData.isShowedHomeScene = false;
    /**
     * 是不是在府邸中
     */
    GameData.isHomeScene = false;
    /**
     * 是不是在合成中
     */
    GameData.isComposeScene = true;
    /**
     * 红颜脱衣和谐开关
     */
    GameData.wifeSwitch = false;
    /**
     * 命令强制使用壳子socket
     */
    GameData.testUseClientSocket = false;
    /**是否是新创建账号首次登陆的用户 */
    GameData.isNewUser = false;
    ///////////////////////////////////////分割线|上面是变量|下面是方法///////////////////////////////////// 
    //左侧气泡
    GameData.leftBubble = {
        isFirstChargeBubble: false //首充气泡
    };
    //离线时间
    GameData.leavetime = 0;
    //离线收益资源
    GameData.autoRes = [0, 0, 0];
    //是不是足额招募
    GameData.islvminCon = false;
    //是不是新配置
    GameData.isNewCfgFlag = null;
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
    function setServerTime(tms, init) {
        GameData.serverTimeMs = tms;
        GameData.serverTime = Math.floor(tms / 1000);
        if (init) {
            // 计算服务器和客户端时间差
            GameData.serverClientTimeDt = tms - new Date().getTime();
        }
    }
    GameData.setServerTime = setServerTime;
    // 获取国家，
    function getCountry() {
        if (PlatformManager.checkIsTWBSp() == true) {
            return "tw";
        }
        else if (PlatformManager.checkIsKRSp() == true) {
            return "kr";
        }
        else if (PlatformManager.checkIsKRNewSp() == true) {
            return "krnew";
        }
        else if (PlatformManager.checkIsJPSp() == true) {
            return "jp";
        }
        else if (PlatformManager.checkIsViSp() == true) {
            return "vi";
        }
        else {
            return "cn";
        }
    }
    GameData.getCountry = getCountry;
    // 当前的渠道id
    function getCurPlatName() {
        return "0";
    }
    GameData.getCurPlatName = getCurPlatName;
    /**判断是否为本地地址 */
    function isLocal() {
        var result = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var url = window.location.href;
            for (var i = 0; i < GameData.localCfg.length; i++) {
                var str = GameData.localCfg[i];
                if (url.indexOf(str) > -1) {
                    result = true;
                    break;
                }
            }
        }
        // else if (App.DeviceUtil.isWXgame()) {
        // 	result = true;
        // } else if (App.DeviceUtil.isWyw()) {
        // 	result = true;
        // }
        return result;
    }
    GameData.isLocal = isLocal;
    function isTest() {
        if (PlatformManager.checkIsDisableSDK()) {
            return true;
        }
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
     * 奖励字符串整合
     */
    function rewardsStrComp(rewards1, rewards2) {
        var arr1 = GameData.formatRewardItem(rewards1);
        var arr2 = GameData.formatRewardItem(rewards2);
        var rewardObj = new Object();
        for (var i = 0; i < arr1.length; i++) {
            var riVo1 = arr1[i];
            var checkKey = riVo1.type + "_" + riVo1.id;
            if (rewardObj.hasOwnProperty(checkKey)) {
                rewardObj[checkKey] += riVo1.num;
            }
            else {
                rewardObj[checkKey] = riVo1.num;
            }
        }
        for (var j = 0; j < arr2.length; j++) {
            var riVo2 = arr2[j];
            var checkKey = riVo2.type + "_" + riVo2.id;
            if (rewardObj.hasOwnProperty(checkKey)) {
                rewardObj[checkKey] += riVo2.num;
            }
            else {
                rewardObj[checkKey] = riVo2.num;
            }
        }
        var rewardStr = "";
        var isFirst = true;
        for (var key in rewardObj) {
            if (isFirst) {
                rewardStr += (key + "_" + rewardObj[key]);
                isFirst = false;
            }
            else {
                rewardStr += "|" + (key + "_" + rewardObj[key]);
            }
        }
        return rewardStr;
    }
    GameData.rewardsStrComp = rewardsStrComp;
    /**
     * 解析奖励物品格式
     * @param rewards 奖励原始数据
     */
    function formatRewardItem(rewards) {
        var arr = new Array();
        // 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
        if (rewards) {
            var rewardsArr = rewards.split("|");
            for (var i = 0; i < rewardsArr.length; i++) {
                var rewardItemVo = new RewardItemVo();
                rewardItemVo.initData(rewardsArr[i]);
                //如果不开称帝，前端屏蔽人望奖励
                if (!Api.switchVoApi.checkOpenPrestige()) {
                    if (rewardItemVo.type == 17) {
                        continue;
                    }
                }
                arr.push(rewardItemVo);
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
     * @param touchCb 如果触摸会显示道具，这里可以另外支持一个回调，一般可以用于统计
     * @param touchCbTarget 触摸回调的this
     */
    function getItemIcon(itemVo, isTouchShowInfo, isShowEffect, touchCb, touchCbTarget) {
        if (isShowEffect === void 0) { isShowEffect = false; }
        var container = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create(itemVo.iconBg);
        iconBg.name = "iconBg";
        container.addChild(iconBg);
        container.width = iconBg.width;
        container.height = iconBg.height;
        var icon = BaseLoadBitmap.create(itemVo.icon);
        var iconName = itemVo.icon;
        var firstChar = itemVo.icon.substr(0, 13);
        if (firstChar == "servant_half_" || iconName.indexOf("skin_half_") > -1) {
            icon.setScale(100 / 180);
        }
        if (itemVo.id == 1) {
            iconBg.texture = ResourceManager.getRes("itembg_7");
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
        container.addChild(icon);
        container.bindData = itemVo;
        icon.setPosition(4, 3);
        if (itemVo.type == 12) {
            icon.x = 0;
        }
        if (itemVo.type == 25) {
            var item = itemVo;
            if (itemVo.id == 0) {
                var noTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayNoRed'), 18);
                noTxt.lineSpacing = 5;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noTxt, iconBg);
                container.addChild(noTxt);
            }
            else {
                var ybaonum = ComponentManager.getBitmapText(String(item._code), TextFieldConst.FONTNAME_ITEMTIP);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ybaonum, icon);
                if (Number(item._code) >= 1000) {
                    ybaonum.x = 17;
                }
                else if (Number(item._code) >= 100) {
                    ybaonum.x = 27;
                }
                else {
                    ybaonum.x = 35;
                }
                ybaonum.y = 35;
                container.addChild(ybaonum);
            }
        }
        if ((itemVo instanceof RewardItemVo) && itemVo.num) {
            if (itemVo.type == 15 || itemVo.type == 14 || itemVo.type == 16) {
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
                var numLb = ComponentManager.getTextField(numberstr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                numLb.name = "numLb";
                numLb.setPosition(iconBg.width / 2 - numLb.width / 2, iconBg.height - 3 - numLb.height);
                container.addChild(numLb);
                if (itemVo.id > 10) {
                    numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height);
                }
            }
            else {
                var nn = String(itemVo.num);
                if (itemVo.type == 2 || itemVo.type == 3 || itemVo.type == 4) {
                    nn = App.StringUtil.changeIntToText(itemVo.num);
                }
                var numLb = ComponentManager.getTextField(nn, TextFieldConst.FONTSIZE_CONTENT_SMALL);
                numLb.name = "numLb";
                numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height);
                container.addChild(numLb);
            }
        }
        if (isTouchShowInfo) {
            iconBg.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
                if (touchCb) {
                    touchCb.call(touchCbTarget);
                }
            }, GameData, [(itemVo instanceof RewardItemVo) ? itemVo : itemVo.id]);
        }
        if (isShowEffect) {
            var temScale = 1 / 0.82;
            // let temScale = 1/0.74;
            var effectClip = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            // effectClip.x = icon.x + 50 - 125*temScale/2;
            // effectClip.y = icon.y + 50 - 125*temScale/2;
            effectClip.x = iconBg.x + iconBg.width / 2 - 125 * temScale / 2;
            effectClip.y = iconBg.y + iconBg.height / 2 - 125 * temScale / 2;
            container.addChild(effectClip);
            effectClip.scaleX = effectClip.scaleY = temScale;
            effectClip.playWithTime(-1);
        }
        if (itemVo.type == 11 && itemVo.id == "4111") {
            var headEffect = ComponentManager.getCustomMovieClip("ryeharvestheadeffect1-", 14, 70);
            headEffect.width = 150;
            headEffect.height = 145;
            headEffect.playWithTime(0);
            headEffect.x = icon.x + 100 / 2 - headEffect.width / 2 + 2;
            headEffect.y = icon.y + 100 / 2 - headEffect.height / 2 - 2;
            container.addChild(headEffect);
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
    function getRewardItemIcons(rewards, isTouchShowInfo, isShowEffect) {
        if (isShowEffect === void 0) { isShowEffect = false; }
        var arr = new Array();
        var rewardsArr = GameData.formatRewardItem(rewards);
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
    function getIconContainer(iconName, iconBgName) {
        var container = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create(iconBgName);
        container.addChild(bg);
        bg.name = "iconBg";
        var icon = BaseLoadBitmap.create(iconName, null, { callback: function (container) {
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
        return container;
    }
    GameData.getIconContainer = getIconContainer;
    /**
     * 获取门客品质ICON
     * @param sid 门客ID
     * @param effect 是否添加帧动画（若有），默认true
     * @return BaseDisplayObjectContainer
     */
    function getServantQualityIconBySid(sid, effect) {
        if (effect === void 0) { effect = true; }
        var _icon = null;
        var _servant = Config.ServantCfg.getServantItemById(sid);
        if (_servant.quality > 1) {
            _icon = new BaseDisplayObjectContainer();
            _icon.width = 209;
            _icon.height = 312;
            _icon.addChild(BaseLoadBitmap.create(Config.ServantCfg.getQualityIconKeyBySid(sid)));
        }
        if (_servant.quality > 2 && effect) {
            var _icon_mv = ComponentManager.getCustomMovieClip(Config.ServantCfg.getQualityMvKeyBySid(sid), 10, 120);
            _icon_mv.blendMode = egret.BlendMode.ADD;
            _icon_mv.playWithTime(0);
            _icon.addChild(_icon_mv);
        }
        return _icon;
    }
    GameData.getServantQualityIconBySid = getServantQualityIconBySid;
    function init() {
        // if(GameData.isUseNewUI)
        // {
        /**
         * 提示黄
         */
        TextFieldConst.COLOR_WARN_YELLOW = 0xfdf3b5;
        /**
         * 提示黄2，颜色更深，适合放到亮色底板
         */
        TextFieldConst.COLOR_WARN_YELLOW2 = 0xfedb38;
        /**
         * 提示红
         */
        TextFieldConst.COLOR_WARN_RED = 0xac0101;
        /**
         * 提示绿
         */
        TextFieldConst.COLOR_WARN_GREEN = 0x13851e;
        /**
         * 品质灰
         */
        TextFieldConst.COLOR_QUALITY_GRAY = 0xdfdfdf;
        /**
         * 品质白
         */
        TextFieldConst.COLOR_QUALITY_WHITE = 0x7e7e7e;
        /**
         * 品质绿
         */
        TextFieldConst.COLOR_QUALITY_GREEN = 0x619c6c;
        /**
         * 品质蓝
         */
        TextFieldConst.COLOR_QUALITY_BLUE = 0x617b9c;
        /**
         * 品质紫
         */
        TextFieldConst.COLOR_QUALITY_PURPLE = 0x97659f;
        /**
         * 品质橙
         */
        TextFieldConst.COLOR_QUALITY_ORANGE = 0xdc9740;
        /**
         * 品质红
         */
        TextFieldConst.COLOR_QUALITY_RED = 0xce1515;
        /**
         * 品质黄
         */
        TextFieldConst.COLOR_QUALITY_YELLOW = 0xfedb38;
        // }
    }
    GameData.init = init;
    /**
     * 检测限时红颜会不会显示
     */
    function checkTimeLimitWife() {
        var vo = Api.shopVoApi.getPayInfoById2("g16");
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        if (cfg && vo && Number(vo.isbuy) == 0 && Api.switchVoApi.checkOpenTimeLimitWife()) {
            var wifeEt = vo.st + cfg.lastTime;
            var wifevo = GameData.formatRewardItem(cfg.getReward)[0];
            var iswife = Api.wifeVoApi.getWifeInfoVoById(wifevo.id);
            //只有微信小程序永久显示
            // if(PlatformManager.checkIsWxSp()){
            // 	return true;
            // } else {
            if (wifeEt > GameData.serverTime && (!iswife)) {
                return true;
            }
            // }
        }
        return false;
    }
    GameData.checkTimeLimitWife = checkTimeLimitWife;
    //越南 fb第三方支付 红颜售卖
    function checkTimeLimitWifeFb() {
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        if (cfg && PlatformManager.checkIsViSp() && Api.switchVoApi.checkOpenTimeLimitWifeFb() && !Api.shopVoApi.isWebPay()) {
            var wifeEt = Api.gameinfoVoApi.getRegdt() + cfg.lastTime;
            var wifevo = GameData.formatRewardItem(cfg.getReward)[0];
            var iswife = Api.wifeVoApi.getWifeInfoVoById(wifevo.id);
            if (wifeEt > GameData.serverTime && (!iswife)) {
                return true;
            }
        }
        return false;
    }
    GameData.checkTimeLimitWifeFb = checkTimeLimitWifeFb;
    //合成按钮红点
    function checkCityRed() {
        if (Api.dailytaskVoApi.checkRedPoint() || Api.achievementVoApi.checkRedPoint()
            || Api.wifeVoApi.checkNpcMessage() || Api.searchVoApi.checkNpcMessage() || Api.childVoApi.checkNpcMessage()
            || Api.studyatkVoApi.checkNpcMessage() || Api.atkraceVoApi.checkNpcMessage()
            || Api.prisonVoApi.checkNpcMessage() || Api.mailVoApi.getUnreadNum() > 0
            || Api.adultVoApi.checkNpcMessage() || Api.palaceVoApi.checkNpcMessage() || Api.rankVoApi.checkNpcMessage()) {
            return true;
        }
        return false;
    }
    GameData.checkCityRed = checkCityRed;
    function dispose() {
        GameData.limitVipLv = null;
        GameData.closeSource = NaN;
        GameData.customerServiceData = null;
        GameData.isShowedHomeScene = false;
        GameData.ioslevellimit = null;
        GameData.pidflag = false;
        GameData.regionflag = true;
        GameData.isHomeScene = false;
        GameData.isComposeScene = false;
        GameData.leftBubble = {
            isFirstChargeBubble: false //首充气泡
        };
        GameData.autoRes = [0, 0, 0];
        GameData.leavetime = 0;
        GameData.islvminCon = false;
        GameData.isNewUser = false;
        GameData.isNewCfgFlag = null;
        GameData.serverTime = GameData.serverTimeMs = 0;
    }
    GameData.dispose = dispose;
})(GameData || (GameData = {}));
