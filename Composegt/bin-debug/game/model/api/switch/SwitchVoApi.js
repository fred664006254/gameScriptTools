var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SwitchVoApi = (function (_super) {
    __extends(SwitchVoApi, _super);
    function SwitchVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测功能开关
     * @param functionName
     */
    SwitchVoApi.prototype.checkSwitchByName = function (functionName) {
        return Boolean(this.switchVo && this.switchVo.switchList[functionName]);
    };
    SwitchVoApi.prototype.checkCommonSwitch = function (key) {
        return this.checkSwitchByName(key);
    };
    /**
     * 检测是否打开了媒婆功能
     */
    SwitchVoApi.prototype.checkAudlt = function () {
        return this.checkSwitchByName("funAdult");
    };
    /**
     * 检测是否打开了惩戒女囚
     */
    SwitchVoApi.prototype.checkPunishAllianceRank = function () {
        return this.checkSwitchByName("closePunish");
    };
    /**
     * 惩戒女囚的元宝购买次数随VIP等级增多的开关
     */
    SwitchVoApi.prototype.checkPunishVip = function () {
        // return this.checkSwitchByName("openPunishVip");
        return true;
    };
    /**
     * 检测是否关闭了宠幸拖衣服
     */
    SwitchVoApi.prototype.checkWifeAni = function () {
        return this.checkSwitchByName("closeWifeAni");
    };
    /**
     * 检测是否关闭被和谐文字
     */
    SwitchVoApi.prototype.checkCloseText = function () {
        return this.checkSwitchByName("closeText");
    };
    /**
     * 检测是否关闭被和谐文字2 。
     * 为true 开启和谐版2 开关
     * 为false 。为关闭 和谐版2 开关
     */
    SwitchVoApi.prototype.checkCloseText2 = function () {
        return this.checkSwitchByName("closeText2");
    };
    /**
     * 检测是否挂机收取资源
     */
    SwitchVoApi.prototype.checkAutoResManage = function () {
        return this.checkSwitchByName("funAutoResManage");
    };
    /**
     * 检测 是否开启审核 true:开启审核、屏蔽排行榜  false:打开排行榜关闭审核
     */
    SwitchVoApi.prototype.checkOpenShenhe = function () {
        return this.checkSwitchByName("openShenhe");
    };
    /**
     * 检测是否挂机收取资源
     */
    SwitchVoApi.prototype.checkTWShenhe = function () {
        return this.checkSwitchByName("twShenhe");
        // return true;
    };
    SwitchVoApi.prototype.checkOpenTalkDialog = function () {
        return this.checkSwitchByName("openTalkDialog");
    };
    /**
     * 关卡跳过开关
     */
    SwitchVoApi.prototype.checkJumpBattle = function () {
        // return this.checkSwitchByName("openJumpBattle");
        return true;
    };
    /**
     * 一键扫荡关卡
     */
    SwitchVoApi.prototype.checkAutoMopup = function () {
        // return this.checkSwitchByName("openAutoMopup");
        return true;
    };
    /**
     * 疯狂游乐场 检测VIP 根据渠道做限制
     */
    SwitchVoApi.prototype.checkVip1Privilege = function () {
        // return this.checkSwitchByName("openVip1Privilege");
        // 这个开关不用了，以后永远开
        return true;
    };
    /**
     * 首冲后礼包开关
     */
    SwitchVoApi.prototype.checkOpenNewCharge = function () {
        return this.checkSwitchByName("openNewCharge");
    };
    /**
     * 充值奖励特殊档 是否开启
     */
    SwitchVoApi.prototype.checkSpecialChargeReward = function () {
        return this.checkSwitchByName("openSpecialChargeReward");
    };
    /**
     * 玩吧脱衣AB测试
     */
    SwitchVoApi.prototype.checkOpenWifeAbTest = function () {
        return this.checkSwitchByName("openWifeAbTest");
    };
    /**
     * 新版牢房开关
     */
    SwitchVoApi.prototype.checkOpenNewPrison = function () {
        return this.checkSwitchByName("openNewPrison");
    };
    /**
     * 邀请有礼开关
     */
    SwitchVoApi.prototype.checkOpenInvite = function () {
        return this.checkSwitchByName("openInvite");
    };
    /**
     * 新首次充值开关 true=新版本
     */
    SwitchVoApi.prototype.checknewRecharge = function () {
        // return this.checkSwitchByName("newRecharge");
        return true;
    };
    /**
     * q群福利 开关  true新版本
     */
    SwitchVoApi.prototype.checkopenQQqun = function () {
        return this.checkSwitchByName("openQQqun");
    };
    /**
     * 是否关闭骨骼 只关系红颜骨骼
     */
    SwitchVoApi.prototype.checkCloseBone = function () {
        return this.checkSwitchByName("closeBone");
        // return true;
    };
    /**
     * 是否关闭某个红颜的骨骼
     */
    SwitchVoApi.prototype.checkWifeBone = function (wifeid) {
        return this.checkSwitchByName("closeBone_wife" + wifeid);
        // return true;
    };
    /**
     * 是否关闭红颜皮肤
     */
    SwitchVoApi.prototype.checkCloseWifeskin = function () {
        return this.checkSwitchByName("closeWifeskin");
        // return false;
    };
    /**
     * 是否关闭宴会新功能
     */
    SwitchVoApi.prototype.checkCloseDinnerNewFunc = function () {
        return this.checkSwitchByName("closeDinnerNewFunc");
    };
    /**
     * 3k迁移面板的开关
     */
    SwitchVoApi.prototype.checkOpen3kQianYi = function () {
        return this.checkSwitchByName("open3kqianyi");
    };
    /**
     * 红颜视频开关
     */
    SwitchVoApi.prototype.checkOpenWifeVideo = function () {
        return this.checkSwitchByName("openWifeVideo");
    };
    SwitchVoApi.prototype.isCrossOpen = function () {
        return this.checkSwitchByName("openCrossPalace");
    };
    /**
     * 名望开关 本服称帝
     */
    SwitchVoApi.prototype.checkOpenPrestige = function () {
        // return this.checkSwitchByName("openPrestige");
        return true;
    };
    /** 微信小程序iOS付费审核开关 */
    SwitchVoApi.prototype.checkClosePay = function () {
        // if((App.DeviceUtil.isWXgame()|| PlatformManager.checkIsQQXYXSp())&& App.DeviceUtil.isIOS() && this.checkSwitchByName("wxgameiosclosepay"))
        if ((App.DeviceUtil.isWXgame() || PlatformManager.checkIsQQXYXSp()) && this.checkSwitchByName("wxgameiosclosepay")) {
            return true;
        }
        var level = GameData.ioslevellimit;
        if (!level) {
            level = 3;
        }
        // if((App.DeviceUtil.isWXgame()|| PlatformManager.checkIsQQXYXSp()) && App.DeviceUtil.isIOS() &&Api.playerVoApi.getPlayerLevel()<=level)
        if ((App.DeviceUtil.isWXgame() || PlatformManager.checkIsQQXYXSp()) && Api.playerVoApi.getPlayerLevel() <= level) {
            return true;
        }
        return false;
    };
    /**是否开启  关闭充值系统  */
    SwitchVoApi.prototype.checkClosePaySys = function () {
        return this.checkSwitchByName("closePaySys");
    };
    SwitchVoApi.prototype.checkAutoLoadDefaultRes = function () {
        return this.checkSwitchByName("autoloadres");
    };
    /**
     * cover
     */
    SwitchVoApi.prototype.checkOpenCover = function () {
        return this.checkSwitchByName("openCover");
    };
    // 至劲测试充值返利 
    SwitchVoApi.prototype.checkOpenRechargeRebate = function () {
        return this.checkSwitchByName("openRechargeRebate");
    };
    // 实名认证开关
    SwitchVoApi.prototype.checkOpenCertification = function () {
        return this.checkSwitchByName("openCertification");
    };
    // 实名认证开关3（目前再用的）
    SwitchVoApi.prototype.checkOpenCertification3 = function () {
        return this.checkSwitchByName("openCertification3");
    };
    // 调查问卷
    SwitchVoApi.prototype.checkOpenQuestionnaire = function () {
        return this.checkSwitchByName("openQuestionnaire");
    };
    // 绑定有礼开关
    SwitchVoApi.prototype.checkOpenFbBind = function () {
        return this.checkSwitchByName("openFbBind");
    };
    //修身是否开启
    SwitchVoApi.prototype.isPracticeOPen = function () {
        return this.checkSwitchByName("openPractice");
    };
    /**
     * 册封是否开启
     */
    SwitchVoApi.prototype.checkOpenWifeStatus = function () {
        // return this.checkSwitchByName("openWifestatus");
        return true;
    };
    /**
     * 自动登录AB测试开关
     */
    SwitchVoApi.prototype.checkApenAutoLoginABtest = function () {
        return this.checkSwitchByName("openAutoLoginABtest");
    };
    /**
     * 八王夺帝开关
     */
    SwitchVoApi.prototype.checkEmperorOpen = function () {
        return this.checkSwitchByName("emperorOpen");
    };
    /**
     * 500元宝赴宴，vip限制开关
     */
    SwitchVoApi.prototype.checkOpenDinnerLimit = function () {
        return this.checkSwitchByName("openDinnerLimit");
        // return true;
    };
    SwitchVoApi.prototype.checkOpenGDTStatistics = function () {
        return this.checkSwitchByName("openGDTStatistics");
    };
    /**
     * 贸易开关
     */
    SwitchVoApi.prototype.checkOpenTrade = function () {
        return this.checkSwitchByName("openTrade");
        // return true;
    };
    /**
     * 牢狱开关
     */
    SwitchVoApi.prototype.checkOpenPrison = function () {
        if (!PlatformManager.checkIsWxmgSp() && !PlatformManager.checkIsQQXYXSp()) {
            return true;
        }
        return this.checkSwitchByName("openPrison");
    };
    /**
     * 帮会踢人限制和退帮会限制
     */
    SwitchVoApi.prototype.checkOpenKickLimit = function () {
        return this.checkSwitchByName("openKickLimit");
    };
    //征伐按钮
    SwitchVoApi.prototype.checkOpenConquest = function () {
        return this.checkSwitchByName("openConquest");
        // return true;
    };
    // 新首充值界面开关，单独页面基于小程序开发 不在福利页面内。
    SwitchVoApi.prototype.checkWeChatFirstcharge = function () {
        // return this.checkSwitchByName("weChatFirstcharge"); 
        return true;
    };
    //获得门客，红颜等分享开关
    SwitchVoApi.prototype.checkOpenShareGate = function () {
        return true;
        // return this.checkSwitchByName("openShareGate");
    };
    //获得门客，红颜等分享是否能获得奖励开关
    SwitchVoApi.prototype.checkOpenShareReward = function () {
        return true;
        // return this.checkSwitchByName("openShareReward");
    };
    //新经营和关卡boss分享开关
    SwitchVoApi.prototype.checkOpenShareFinanceAndRecover = function () {
        return this.checkSwitchByName("openShareFinanceAndRecover") && PlatformManager.isSupportShare();
    };
    //根据名字检查是否打开开关
    SwitchVoApi.prototype.checkOpenByName = function (funcName) {
        return this.checkSwitchByName(funcName);
    };
    /**
     * 开启新版的月卡和终身卡界面
     * 这个开关作废，由于涉及太多直接写死打开
     */
    SwitchVoApi.prototype.checkOpenNewMonthCardAndYearCard = function () {
        return true; //this.checkSwitchByName("openNewMonthCardAndYearCard");
    };
    /**
     * 是否开启强制分享
     */
    SwitchVoApi.prototype.checkOpenForcedShare = function () {
        return this.checkSwitchByName("openForcedShare");
    };
    /**
     * 新群组分享
     */
    SwitchVoApi.prototype.checkOpenWxShareToGroup = function () {
        return this.checkSwitchByName("openWxShareToGroup");
    };
    /**
     * 开关_微信分享_旧的
     */
    SwitchVoApi.prototype.checkOpenWxShareToGroupOld = function () {
        return this.checkSwitchByName("openWxShareToGroupOld");
    };
    /**是否开启  气泡  */
    SwitchVoApi.prototype.checkopenBubble = function () {
        return this.checkSwitchByName("openBubble");
        // return true; 
    };
    /**vipicon */
    SwitchVoApi.prototype.checkopenFkVipIcon = function () {
        // return this.checkSwitchByName("openFkVipIcon"); 
        return true;
    };
    /**
     *  限时红颜的开关
     * */
    SwitchVoApi.prototype.checkOpenTimeLimitWife = function () {
        // return this.checkSwitchByName("openTimeLimitWife") ||PlatformManager.checkIsWxSp() ||PlatformManager.checkIsViSp() || PlatformManager.checkIsH5lySp();
        return this.checkSwitchByName("openTimeLimitWife");
    };
    /**
     *  越南第三方支付 fb红颜开关
     * */
    SwitchVoApi.prototype.checkOpenTimeLimitWifeFb = function () {
        return this.checkSwitchByName("openTimeLimitWifeFb");
    };
    /**
     * vip 增加充值档位 ＋分享增加直升vip3 开关
     */
    // public checkOpenVipGear():boolean
    // {
    // 	return this.checkSwitchByName("openVipGear");
    // }
    /**
     * 1元限时礼包开关
     */
    SwitchVoApi.prototype.checkLimitedGift = function () {
        return this.checkSwitchByName("open1CostSceneGift") && !Api.switchVoApi.checkClosePay() && !PlatformManager.checkHideIconByIP();
        // return false;
    };
    /**
     * 限时礼包 进阶礼包开关
     */
    SwitchVoApi.prototype.checkLimitedGift2 = function () {
        return this.checkSwitchByName("open1CostSceneGift_2");
    };
    /**
     * 新七日签到开关
     */
    SwitchVoApi.prototype.checkSignUp = function () {
        return this.checkSwitchByName("openArrivalNew");
    };
    /**
     * 新七日签到开关
     */
    SwitchVoApi.prototype.checkOpenShowSignUp = function () {
        // return this.checkSwitchByName("openShowArrivalNew");
        return true;
    };
    /**
     * 检测是否使用艺术字
     */
    SwitchVoApi.prototype.checkOpenBMFont = function () {
        // if(PlatformManager.checkIsThSp())
        // {
        return true;
        // }
        // return true;
    };
    /**
     * 检测 是否关闭越南安卓第三方支付
     */
    SwitchVoApi.prototype.closeViWebPay = function () {
        return this.checkSwitchByName("closeViWebPay");
    };
    /**
     * 检测 是否开启越南安卓第三方支付
     */
    SwitchVoApi.prototype.openViWebPay = function () {
        if (this.checkSwitchByName("openViWebPay")) {
            var level = GameData.ioslevellimit;
            if (!level) {
                level = 6;
            }
            if (Api.playerVoApi.getPlayerLevel() >= level || Api.shopVoApi.isWebPay()) {
                return true;
            }
        }
        else {
            if (Api.shopVoApi.isWebPay()) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检测 是否开启越南ios第三方支付
     */
    SwitchVoApi.prototype.openViIOSWebPay = function () {
        return this.checkSwitchByName("openViIOSWebPay");
    };
    /**
     * 检测 是否开启越南facebook
     */
    SwitchVoApi.prototype.openViFacebook = function () {
        return this.checkSwitchByName("openFacebook");
    };
    /**
     * 日本Ios审核98元档位开关
     */
    SwitchVoApi.prototype.checkOpenAuditFile = function () {
        return this.checkSwitchByName("openAuditFile");
    };
    // 特殊礼包 (显示在特惠礼包当中，需要开关打开  openSpecialGift = true)
    SwitchVoApi.prototype.checkOpenSpecialGift = function () {
        return this.checkSwitchByName("openSpecialGift");
        // return true;
    };
    //概率展示显示开关  true  打开
    SwitchVoApi.prototype.checkOpenProbInfo = function () {
        return this.checkSwitchByName("openProbInfo");
        // return true;
    };
    //检测红颜是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsWifeLocked = function (wifeId) {
        return this.checkSwitchByName("wifeName_" + wifeId);
    };
    //检测门客是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsServantLocked = function (servantId) {
        return this.checkSwitchByName("servant_name" + servantId);
    };
    //检测建筑是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsBuildingState = function (buildingId) {
        return this.checkSwitchByName("building_name" + buildingId);
    };
    //检测称号是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsTitleState = function (titleId) {
        return this.checkSwitchByName("title_name" + titleId);
    };
    //检测红颜皮肤是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsSkinState = function (skinId) {
        return this.checkSwitchByName("wifeSkin_name" + skinId);
    };
    //检测是否开启，元宝寻访开关
    SwitchVoApi.prototype.checkOpenSearchGem = function () {
        return this.checkSwitchByName("openSearchGem");
    };
    //检测是否开启，太学强化开关
    SwitchVoApi.prototype.checkOpenBookRoomStrenthen = function () {
        return this.checkSwitchByName("openBookRoomStrenthen");
    };
    //检测是否开启 首冲 ，1元红颜抢弹开关
    SwitchVoApi.prototype.checkOpenShowPopupWin = function () {
        return this.checkSwitchByName("openShowPopupWin");
    };
    //首充气泡
    SwitchVoApi.prototype.checkOpenFirstChargeBubble = function () {
        return this.checkSwitchByName("openFirstChargeBubble");
    };
    //检测是否开启经营商人
    SwitchVoApi.prototype.checkOpenManageTrader = function () {
        return this.checkSwitchByName("openManageTrader");
    };
    /** 是否开启擂台一键挑战 */
    SwitchVoApi.prototype.checkAutoAtkrace = function () {
        // return this.checkSwitchByName("openAtkraceAuto");
        return true;
    };
    /** 是否开启跨服擂台一键挑战 */
    SwitchVoApi.prototype.checkAutoAtkracecross = function () {
        // return this.checkSwitchByName("openAtkracecrossAuto");
        return true;
    };
    /** 是否开启商城VIP页签 */
    SwitchVoApi.prototype.checkOpenShopVipTab = function () {
        return this.checkSwitchByName("openShopVipTab");
    };
    /** 是否开启商城VIP 低v看不到高v档位 */
    SwitchVoApi.prototype.checkOpenShopVipTab2 = function () {
        return this.checkSwitchByName("openShopVipTab_2");
    };
    /** 微信红颜技能3开关-openNewWifeskillFixup
        此开关只能开不能关 */
    SwitchVoApi.prototype.checkopenNewWifeskillFixup = function () {
        return this.checkSwitchByName("openNewWifeskillFixup");
    };
    SwitchVoApi.prototype.checkOpenFriendsSend = function () {
        return this.checkSwitchByName("openFriensSend");
    };
    /**是否开启  亲家系统  */
    SwitchVoApi.prototype.checkopenSadun = function () {
        // return this.checkSwitchByName("openSadun");
        return true;
    };
    /**
     * 是否开启活动图标收起
     */
    SwitchVoApi.prototype.checkOpenMainUIIconExtend = function () {
        return true;
    };
    /**
     * 是否开启称号升级
     */
    SwitchVoApi.prototype.checkOpenTitleLv = function () {
        // return this.checkSwitchByName("openTitleLv");
        return true;
    };
    /**
     * 是否开启红颜皮肤升级
     */
    SwitchVoApi.prototype.checkOpenWifeskinLvup = function () {
        // return this.checkSwitchByName("openWifeskinLvup");
        return true;
    };
    /**
     * 是否开启全服提亲分享聊天
     */
    SwitchVoApi.prototype.checkOpenAdultShare = function () {
        return this.checkSwitchByName("openAdultShare");
    };
    /**青年子嗣开关 */
    SwitchVoApi.prototype.checkOpenAdultImage = function () {
        // return this.checkSwitchByName("openAdultImage");
        return true;
    };
    /**创建角色界面 皇帝骨骼开关 */
    SwitchVoApi.prototype.checkOpenCreateUserBones = function () {
        // return true;
        return this.checkSwitchByName("openCreateUserBones");
    };
    /**
     * 检测是否打开了私聊功能
     */
    SwitchVoApi.prototype.openChatType3 = function () {
        return this.checkSwitchByName("openChatType3");
    };
    /**
     * 检测是否打开了跨服聊天功能
     */
    SwitchVoApi.prototype.openCrossChat = function () {
        return this.checkSwitchByName("openCrossChat");
    };
    /**
     * 是否开启跨服排行榜
     */
    SwitchVoApi.prototype.checkOpenCrossRank = function () {
        // return true;
        return this.checkSwitchByName("openCrossRank");
    };
    /*
    * 私聊发送消息开关
    */
    SwitchVoApi.prototype.checkOpenPrichatSendMsg = function () {
        return this.checkSwitchByName("openPrichatSendMsg");
    };
    /**
     * 微信圈子开关
     */
    SwitchVoApi.prototype.checkOpenCircle = function () {
        // if(!App.DeviceUtil.isIOS())
        // {
        // 	return true;
        // }
        // return this.checkSwitchByName("checkOpenCircle");
        return false;
    };
    /*
    * 私聊发送消息开关
    */
    SwitchVoApi.prototype.checkOpenTwitter = function () {
        return this.checkSwitchByName("checkOpenTwitter");
    };
    /*
    * 微信客服礼包开关
    */
    SwitchVoApi.prototype.checkOpenWxchatgift = function () {
        return this.checkSwitchByName("checkOpenWxchatgift");
    };
    /*
    * 微信添加到我的小程序开关
    */
    SwitchVoApi.prototype.checkOpenWxaddmypro = function () {
        return this.checkSwitchByName("checkOpenWxaddmypro");
    };
    /*
    * 浮窗指引，绑死微信
    */
    SwitchVoApi.prototype.checkOpenWxIcon = function () {
        return this.checkSwitchByName("checkOpenWxIcon");
    };
    /** 是否开启门客皮肤开关 */
    SwitchVoApi.prototype.checkOpenServantSkin = function () {
        return this.checkSwitchByName("openServantSkin");
    };
    /**
     * 检测门客皮肤否通过GM开启，true为已开启
     */
    SwitchVoApi.prototype.checkIsServantSkinState = function (skinId) {
        return this.checkSwitchByName("servantSkin_name" + skinId);
    };
    /**
     * 是否开启语音功能
     */
    SwitchVoApi.prototype.checkOpenNewSound = function () {
        return this.checkSwitchByName("openNewSound");
    };
    SwitchVoApi.prototype.checkOpenNewAura = function (id) {
        return this.checkSwitchByName("openAura" + id);
    };
    /**
     * 检测是否打开了宴会功能
     */
    SwitchVoApi.prototype.checkOpenCrossDinner = function () {
        // return false;
        return this.checkSwitchByName("openCrossDinner");
    };
    /**
     * 检测是否是跨服宴会（千万注意与checkOpenCrossDinner的区别）
     */
    SwitchVoApi.prototype.checkIsCrossDinner = function () {
        // return false;
        return this.checkSwitchByName("isCrossDinner");
    };
    /**
     * 检测是否微信实名支付官品判断(仅判断官品，不判断平台等其它杂项)
     */
    SwitchVoApi.prototype.checkWxRealname3LevelCanPay = function () {
        return Api.playerVoApi.getPlayerLevel() > 8;
    };
    /**
     * 是否开启一键公务开关
     */
    SwitchVoApi.prototype.checkOpenOfficialbusiness = function () {
        // return this.checkSwitchByName("openOfficialbusiness");
        return true;
    };
    /**
     * 是否关闭骨骼
     */
    SwitchVoApi.prototype.checkServantCloseBone = function () {
        // return this.checkSwitchByName("closeServantBone");
        return false;
        // return false;
    };
    /**
     * 审核关闭支付
     */
    SwitchVoApi.prototype.checkShenheClosePay = function () {
        return this.checkSwitchByName("checkShenheClosePay");
    };
    /**
     * 演武场经验加成开关
     */
    SwitchVoApi.prototype.checkOpenStudyatkExp = function () {
        // return this.checkSwitchByName("openStudyatkExp");
        return true;
    };
    /**
     * 关注公众号开关
     */
    SwitchVoApi.prototype.checkOpenWxaddoffacct = function () {
        return this.checkSwitchByName("checkOpenWxaddoffacct");
    };
    /**
     * 微信参加跨服宴会条件限制开关
     */
    SwitchVoApi.prototype.checkCrossDinner = function () {
        return this.checkSwitchByName("wx_joindinner");
    };
    /**
     * 是否开启微信分享假失败
     */
    SwitchVoApi.prototype.checkOpenWxShareFail = function () {
        return this.checkSwitchByName("checkOpenWxShareFail");
    };
    /**议事院开关 */
    SwitchVoApi.prototype.checkOpenCouncil = function () {
        return this.checkSwitchByName("openCouncil");
    };
    /**
     * 夺帝战宣传开关
     */
    SwitchVoApi.prototype.checkOpenPrestigeShow = function () {
        // return this.checkSwitchByName("openPrestigeShow");
        return true;
    };
    /**
     * 检测 是否开启帮会战
     */
    SwitchVoApi.prototype.checkOpenAllianceWar = function () {
        return this.checkSwitchByName("openAllianceWar") && this.checkOpenCrossRank();
    };
    /**府邸伸缩是否开启 */
    SwitchVoApi.prototype.checkOpenUnfold = function () {
        return this.checkSwitchByName("checkOpenUnfold");
        // return true;
    };
    //是否开启了帮会任务
    SwitchVoApi.prototype.checkOpenAllianceTask = function () {
        // return this.checkSwitchByName("openAllianceTask");
        return true;
    };
    //是否开启新每日礼包高额档位 
    SwitchVoApi.prototype.checkOpenDailyActivityHeightTap = function () {
        return this.checkSwitchByName("checkOpenDailyActivityHeightTap");
    };
    //检测充值奖励特殊档，true为已开启  没有1 默认为 openSpecialChargeReward
    SwitchVoApi.prototype.checkSpecialState = function (specialId) {
        return this.checkSwitchByName("openSpecialChargeReward" + specialId);
    };
    SwitchVoApi.prototype.checkMainTaskGuide = function () {
        // return this.checkSwitchByName("openMainTaskGuide");
        return false;
    };
    //开启微信帐号转移
    SwitchVoApi.prototype.checkOpenAccountmove = function () {
        return this.checkSwitchByName("checkOpenAccountmove");
    };
    /**
 * 门客皮肤光环开关
 */
    SwitchVoApi.prototype.checkOpenServantSkinAura = function () {
        var flag = false;
        if (this.checkOpenServantSkin() && this.checkSwitchByName("openServantSkinAura")) {
            flag = true;
        }
        return flag;
    };
    //揽月亭开关
    SwitchVoApi.prototype.checkOpenSkinBuilding = function () {
        return this.checkSwitchByName("openSkinBuilding");
    };
    /** 府外大地图滚动 */
    SwitchVoApi.prototype.checkScrollCityScene = function () {
        return true;
        // return this.checkSwitchByName("openScrollCityScene");
    };
    /** 微信审核换图 */
    SwitchVoApi.prototype.checkOpenWxHexiePic = function () {
        // return true;  
        return this.checkSwitchByName("openWxHexiePic");
    };
    /**
 * 是否开启一键学习功能
 */
    SwitchVoApi.prototype.checkOpenAutoStudy = function () {
        // return this.checkSwitchByName("openAutoStudy");
        return true;
    };
    /*
    * lobi
    */
    SwitchVoApi.prototype.checkOpenLobi = function () {
        return this.checkSwitchByName("checkOpenLobi");
    };
    /**
     * 跨服擂台-2000分开关
     */
    SwitchVoApi.prototype.checkOpenAtkracegChangegpoint = function () {
        return this.checkSwitchByName("atkracegChangegpoint");
    };
    /**
 * 擂台/跨服擂台 复仇是否从列表删除开关
 */
    SwitchVoApi.prototype.checkOpenRevengeList = function () {
        // return this.checkSwitchByName("revengeList")
        return true;
    };
    /**
     * 是否开启开关，在帮会擂台冲榜期间不可踢人，不可退帮
     */
    SwitchVoApi.prototype.checkOpenRankActive = function () {
        return this.checkSwitchByName("rankActive20");
    };
    /**
     * 是否开启场景宠幸功能
     */
    SwitchVoApi.prototype.checkOpenWifeBathScene = function () {
        return this.checkSwitchByName("openWifeBathScene");
    };
    /**
     * 是否开启帮会冲榜新规则
     */
    SwitchVoApi.prototype.checkOpenAllianceRankNewRule = function () {
        return this.checkSwitchByName("openAllianceRankNewRule");
    };
    /**
     * 是否开启我要变强
     */
    SwitchVoApi.prototype.checkOpenStrengthen = function () {
        // return this.checkSwitchByName("openStrengthen");
        return false;
    };
    /**
     * 是否开启3个开关的我要变强的第一个开关
     */
    SwitchVoApi.prototype.checkOpenRealnamerewards = function () {
        return this.checkSwitchByName("openRealnamerewards");
    };
    /**
     * 是否开启3个开关的我要变强的第二个开关
     */
    SwitchVoApi.prototype.checkProtectInDrink = function () {
        return this.checkSwitchByName("protectInDrink");
    };
    /**
     * 是否开启3个开关的我要变强的第三个开关
     */
    SwitchVoApi.prototype.checkOpenTrueRealName = function () {
        return this.checkSwitchByName("openTrueRealName");
    };
    /**
     * 是否开启玩吧，vip特权礼包
     */
    SwitchVoApi.prototype.checkOpenWanbaviptequan = function () {
        return this.checkSwitchByName("openWanbaviptequan");
    };
    /**
     * 是否开启20秒自动进游戏
     */
    SwitchVoApi.prototype.checkOpenAutoEnterGame = function () {
        return this.checkSwitchByName("openAutoEnterGame");
    };
    /**
     * 红颜对战系统开关
     */
    SwitchVoApi.prototype.checkOpenWifeBattle = function () {
        return this.checkSwitchByName("openWifeBattle");
    };
    /**
     * 是否开启设置里面的红颜和谐开关
     */
    SwitchVoApi.prototype.checkOpenSettingWife = function () {
        return this.checkSwitchByName("openSettingWife");
    };
    /**
     * 是否开启低V不能私聊高V开关
     */
    SwitchVoApi.prototype.checkOpenchatvsvip = function () {
        if (Api.playerVoApi.getPlayerVipLevel() >= 12) {
            return false;
        }
        return this.checkSwitchByName("chatvsvip");
    };
    /**
     * 防诈骗开关
     */
    SwitchVoApi.prototype.checkopenAntiDeception = function () {
        return this.checkSwitchByName("antideception");
    };
    /**
     * 关闭红颜语音
     */
    SwitchVoApi.prototype.checkCloseWifeSound = function () {
        return this.checkSwitchByName("closeWifeSound");
    };
    /**
 * 是否开启回归系统
 */
    SwitchVoApi.prototype.checkOpenReback = function () {
        return this.checkSwitchByName("openReback");
    };
    /**
     * 检测 是否开启Android更新提示
     */
    SwitchVoApi.prototype.checkOpenNewAndroidVersion = function () {
        return this.checkSwitchByName("openNewAndroidVersion");
    };
    /**
     * 跳过创建角色
     */
    SwitchVoApi.prototype.checkOpenJumpCreateUser = function () {
        // return this.checkSwitchByName("openJumpCreateUser");
        return true;
    };
    /**
     * 是否开启红颜AR合照
     */
    SwitchVoApi.prototype.checkOpenWifeArCamera = function () {
        return this.checkSwitchByName("openArCamera");
    };
    /**
     * 是否开启twitter每日分享
     */
    SwitchVoApi.prototype.checkOpenTwitterDailyShare = function () {
        return this.checkSwitchByName("openTwitterDailyShare");
    };
    /**
     * 是否禁用列表飞入效果
     */
    SwitchVoApi.prototype.checkOpenListFly = function () {
        return this.checkSwitchByName("openListFly");
    };
    /**
     * 是否开启页面出现效果
     */
    SwitchVoApi.prototype.checkOpenViewOpenAni = function () {
        return this.checkSwitchByName("openShowViewAni");
        // return this.checkSwitchByName("openViewOpenAni");
    };
    /**
     * 是否开启微信投诉
     */
    SwitchVoApi.prototype.checkOpenFeedBack = function () {
        return this.checkSwitchByName("openFeedBack");
        // return this.checkSwitchByName("openViewOpenAni");
    };
    /**
     * 出府动效开关
     */
    SwitchVoApi.prototype.checkOpenGooutAni = function () {
        return this.checkSwitchByName("openGooutAni");
    };
    /**
     * 帮会演武场开关
     */
    SwitchVoApi.prototype.checkOpenStudyatkAlliance = function () {
        return this.checkSwitchByName("openstudyatkalliance");
    };
    /**
     * 37调查问卷
     */
    SwitchVoApi.prototype.checkOpen37Question = function () {
        return this.checkSwitchByName("open37Question");
    };
    /**
     * 新官上任
     */
    SwitchVoApi.prototype.checkOpenLoginWeek = function () {
        return this.checkSwitchByName("openLoginWeek");
    };
    SwitchVoApi.prototype.checkOpenSecondCharge = function () {
        return this.checkSwitchByName("openSecondCharge");
    };
    /**
     * 零元礼包
     */
    SwitchVoApi.prototype.checkOpenZeroGift = function () {
        return this.checkSwitchByName("openZeroGift");
    };
    /**
     * 寻访剧情开关
     */
    SwitchVoApi.prototype.checkOpenNewStory = function () {
        return this.checkSwitchByName("openNewStory");
    };
    /**
     * 是否开启蓝颜
     */
    SwitchVoApi.prototype.checkOpenBuleWife = function () {
        return this.checkSwitchByName("openBuleWife");
        // return true;
    };
    /**
     * 是否处在蓝颜开启状态（GM开关+玩家自己开关）
     */
    SwitchVoApi.prototype.checkIsInBlueWife = function () {
        if (Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch() == 1) {
            return true;
        }
        return false;
    };
    /**
     * 1524道具参加宴会开关
     */
    SwitchVoApi.prototype.checkOpen1524JoinDinner = function () {
        return this.checkSwitchByName("openDinnerUseItem1524");
    };
    /**
     * 月卡百年陈酿
     */
    SwitchVoApi.prototype.checkOpenMouthCardAddItem1524 = function () {
        return this.checkSwitchByName("openMouthCardAddItem1524");
    };
    /**
     * 是否关闭i聊天
     */
    SwitchVoApi.prototype.checkCloseChat = function () {
        return this.checkSwitchByName("closeChat");
    };
    /**
     * 擂台扣分优化
     */
    SwitchVoApi.prototype.checkOpenAtkraceScoreFix = function () {
        return this.checkSwitchByName("openAtkraceScoreFix");
    };
    /**
     * 豪门订阅开关
     */
    SwitchVoApi.prototype.checkOpenSpCard = function () {
        return this.checkSwitchByName("openSpCard");
    };
    /**
     * 资源加载优化（解决新手引导卡死）
     */
    SwitchVoApi.prototype.checkOpenResNeedLoading = function () {
        return this.checkSwitchByName("openResNeedLoading");
    };
    /**
     * 微信 新每日礼包-中第一个档位的1元礼包，做成开关
     */
    SwitchVoApi.prototype.checkOpenDailyActivity1RmbTap = function () {
        return this.checkSwitchByName("openDailyActivity1RmbTap");
        // return true;
    };
    /**
     *
     * 开启：首冲变为6倍
     * 关闭：首冲4倍
     *
     */
    SwitchVoApi.prototype.checkOpenFirstCharge6Times = function () {
        return this.checkSwitchByName("firstCharge6times");
    };
    SwitchVoApi.prototype.checkOpenAllCharge = function () {
        return this.checkSwitchByName("thirdAndAllChargeGift");
    };
    /*
        蓝颜出府剧情
        开启：特定次数出府时会触发蓝颜剧情
        关闭：不触发
    */
    SwitchVoApi.prototype.checkOpenBlueWifeOutHomeStory = function () {
        return this.checkSwitchByName("openBlueWifeOutHomeStory");
    };
    /*
        屏幕点击特效
    */
    SwitchVoApi.prototype.checkOpenClickEffect = function () {
        return this.checkSwitchByName("openClickEffect");
    };
    /**
     * 日本H5调查问卷
     */
    SwitchVoApi.prototype.checkOpenH5Questionnaire = function () {
        return this.checkSwitchByName("openH5Questionnaire");
    };
    /**
     * 玩家5秒未操作主线任务按钮出现小手开关
     */
    SwitchVoApi.prototype.checkOpenMainQuestFinger = function () {
        return this.checkSwitchByName("openMainQuestFinger");
    };
    /**
     * 合成隐藏充值icon开关
     * 开启时，如玩家未充值过，隐藏月卡，年卡，充值奖励icon
     */
    SwitchVoApi.prototype.checkOpenHideRechargeIcon = function () {
        return this.checkSwitchByName("openHideRechargeIcon");
        // return true;
    };
    /**
     * 门客等级上限250级
     */
    SwitchVoApi.prototype.checkOpenLimitS250Lv = function () {
        return this.checkSwitchByName("openLimitS250Lv");
        // return true;
    };
    /**
     * 关卡上限100章
     */
    SwitchVoApi.prototype.checkOpenLimitC100Chapter = function () {
        return this.checkSwitchByName("openLimitC100Chapter");
        // return true;
    };
    /**
     * 府外功能解锁前隐藏入口功能
     * 开启时：府外未解锁功能入口隐藏
        关闭时：府外未解锁功能入口展示出来，玩家可点击交互
     */
    SwitchVoApi.prototype.checkOpenHideNPC = function () {
        return this.checkSwitchByName("openHideNPC");
        // return true;
    };
    return SwitchVoApi;
}(BaseVoApi));
__reflect(SwitchVoApi.prototype, "SwitchVoApi");
