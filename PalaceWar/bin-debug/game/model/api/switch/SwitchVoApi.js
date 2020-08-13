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
        return this.checkSwitchByName("openPunishVip");
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
    };
    SwitchVoApi.prototype.checkOpenTalkDialog = function () {
        return this.checkSwitchByName("openTalkDialog");
    };
    /**
     * 关卡跳过开关
     */
    SwitchVoApi.prototype.checkJumpBattle = function () {
        return this.checkSwitchByName("openJumpBattle");
    };
    /**
     * 一键扫荡关卡
     */
    SwitchVoApi.prototype.checkAutoMopup = function () {
        return this.checkSwitchByName("openAutoMopup");
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
    //检测充值奖励特殊档，true为已开启  没有1 默认为 openSpecialChargeReward
    SwitchVoApi.prototype.checkSpecialState = function (specialId) {
        return this.checkSwitchByName("openSpecialChargeReward" + specialId);
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
        return this.checkSwitchByName("newRecharge");
    };
    /**
     * q群福利 开关  true新版本
     */
    SwitchVoApi.prototype.checkopenQQqun = function () {
        return this.checkSwitchByName("openQQqun");
    };
    /**
     * 是否关闭骨骼
     */
    SwitchVoApi.prototype.checkCloseBone = function () {
        return this.checkSwitchByName("closeBone");
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
    SwitchVoApi.prototype.isCrossOpen = function () {
        return this.checkSwitchByName("openCrossPalace");
    };
    /**
     * 名望开关 本服称帝
     */
    SwitchVoApi.prototype.checkOpenPrestige = function () {
        return this.checkSwitchByName("openPrestige");
    };
    /** 关闭充值 */
    SwitchVoApi.prototype.checkClosePay = function () {
        if (PlatformManager.checkIsWxSp() && App.DeviceUtil.isIOS() && this.checkSwitchByName("wxgameiosclosepay")) {
            return true;
        }
        return false;
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
    // 至劲测试充值返利 2倍
    SwitchVoApi.prototype.checkOpenRechargeRebate2 = function () {
        return this.checkSwitchByName("openRechargeRebate2");
    };
    // 实名认证开关
    SwitchVoApi.prototype.checkOpenCertification = function () {
        return this.checkSwitchByName("openCertification");
    };
    // 绑定有礼开关
    SwitchVoApi.prototype.checkOpenFbBind = function () {
        var checkPlatResult = false;
        if (PlatformManager.checkIsWeiduan()) {
            if (PlatformManager.checkIsTWBSp() && ((App.CommonUtil.compareVersion("3.0", PlatformManager.getAppVersion()) !== 1 && App.DeviceUtil.isIOS())
                ||
                    (App.CommonUtil.compareVersion("1.6", PlatformManager.getAppVersion()) !== 1 && App.DeviceUtil.isAndroid()))) {
                checkPlatResult = true;
            }
            else if (PlatformManager.checkIsThSp() && PlatformManager.checkIsThHw() == false) {
                checkPlatResult = true;
            }
            else {
                checkPlatResult = PlatformManager.hasBindFunc();
            }
        }
        else {
            checkPlatResult = PlatformManager.hasBindFunc();
        }
        if (checkPlatResult == false && PlatformManager.checkIsLocal()) {
            checkPlatResult = true;
        }
        return this.checkSwitchByName("openFbBind") && Api.otherInfoVoApi.getFBBindFlag() != 1 && checkPlatResult;
    };
    // 粤语 开关
    SwitchVoApi.prototype.checkOpenVoice = function () {
        return this.checkSwitchByName("openVoice");
    };
    //修身是否开启
    SwitchVoApi.prototype.isPracticeOPen = function () {
        return this.checkSwitchByName("openPractice");
    };
    /**
     * 册封是否开启
     */
    SwitchVoApi.prototype.checkOpenWifeStatus = function () {
        return this.checkSwitchByName("openWifestatus");
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
    };
    /**
     * 检测是否使用艺术字
     */
    SwitchVoApi.prototype.checkOpenBMFont = function () {
        if (PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang()) {
            return false;
        }
        return true;
    };
    //新手引导去掉任务引导
    SwitchVoApi.prototype.checkRookieDelTask = function () {
        return this.checkSwitchByName("delTask");
    };
    //获得门客，红颜等分享开关
    SwitchVoApi.prototype.checkOpenShareGate = function () {
        if (PlatformManager.checkIsThHw()) {
            return false;
        }
        else {
            return this.checkSwitchByName("openShareGate");
        }
    };
    //获得门客，红颜等分享是否能获得奖励开关
    SwitchVoApi.prototype.checkOpenShareReward = function () {
        return this.checkSwitchByName("openShareReward");
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
    SwitchVoApi.prototype.checkOpenFriendsSend = function () {
        return this.checkSwitchByName("openFriensSend");
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
        return this.checkSwitchByName("openCrossRank");
    };
    /**是否开启  关闭充值系统  */
    SwitchVoApi.prototype.checkClosePaySys = function () {
        return this.checkSwitchByName("closePaySys");
    };
    //是否开启了帮会建设
    SwitchVoApi.prototype.checkOpenAllianceTask = function () {
        return this.checkSwitchByName("openAllianceTask");
    };
    /**是否开启  亲家系统  */
    SwitchVoApi.prototype.checkopenSadun = function () {
        return this.checkSwitchByName("openSadun");
    };
    /**
     * 是否开启强制分享
     */
    SwitchVoApi.prototype.checkOpenForcedShare = function () {
        return this.checkSwitchByName("openForcedShare");
    };
    /**是否开启  玩吧八月签到  */
    SwitchVoApi.prototype.checkOpenAugustsign = function () {
        return this.checkSwitchByName("openAugustsign");
        // return true;
    };
    // 新首充值界面开关，单独页面基于小程序开发 不在福利页面内。
    SwitchVoApi.prototype.checkWeChatFirstcharge = function () {
        return this.checkSwitchByName("weChatFirstcharge");
    };
    /**
     * 开启新版的月卡和终身卡界面
     */
    SwitchVoApi.prototype.checkOpenNewMonthCardAndYearCard = function () {
        return this.checkSwitchByName("openNewMonthCardAndYearCard");
    };
    /**
     * 开启新版的月卡界面
     */
    SwitchVoApi.prototype.checkOpenNewMonthCard = function () {
        return this.checkSwitchByName("openNewMonthCard");
    };
    /**是否开启 新光环
     * id: 1:四大谋士  2:巾帼五虎 3:四答奸臣 4:蛮王 5:五虎上将
     */
    SwitchVoApi.prototype.checkOpenNewAura = function (id) {
        return this.checkSwitchByName("openAura" + id);
    };
    /**是否开启  气泡  */
    SwitchVoApi.prototype.checkopenBubble = function () {
        return this.checkSwitchByName("openBubble");
    };
    /**春节的二次弹框开关 */
    SwitchVoApi.prototype.checkOpenNewYearActiveTwoConfirm = function () {
        return this.checkSwitchByName("openNewYearActiveTwoConfirm");
    };
    //根据名字检查是否打开开关
    SwitchVoApi.prototype.checkOpenByName = function (funcName) {
        return this.checkSwitchByName(funcName);
    };
    /** 是否开启擂台一键挑战 */
    SwitchVoApi.prototype.checkAutoAtkrace = function () {
        return this.checkSwitchByName("openAtkraceAuto");
    };
    /** 是否开启跨服擂台一键挑战 */
    SwitchVoApi.prototype.checkAutoAtkracecross = function () {
        return this.checkSwitchByName("openAtkracecrossAuto");
    };
    /** 是否开启新版的签到开关 */
    SwitchVoApi.prototype.checkOpenNewSignIn = function () {
        return this.checkSwitchByName("openNewSignIn");
    };
    /**议事院开关 */
    SwitchVoApi.prototype.checkOpenCouncil = function () {
        return this.checkSwitchByName("openCouncil");
    };
    /**青年子嗣开关 */
    SwitchVoApi.prototype.checkOpenAdultImage = function () {
        return this.checkSwitchByName("openAdultImage");
    };
    /**
     * 开启折扣活动 天数循环
     */
    SwitchVoApi.prototype.checkOpenDiscountLoopTime = function () {
        return this.checkSwitchByName("openDiscountLoopTime") || PlatformManager.checkIsThSp();
    };
    /** 是否开启红颜皮肤开关 */
    //用 checkCloseWifeskin 开关替代
    // public checkOpenWifeSkin():boolean
    // {
    // 	return this.checkSwitchByName("openWifeSkin");
    // }
    /** 是否开启门客皮肤开关 */
    SwitchVoApi.prototype.checkOpenServantSkin = function () {
        return this.checkSwitchByName("openServantSkin");
    };
    /** 是否开启门客皮肤骨骼开关 */
    SwitchVoApi.prototype.checkOpenServantBone = function () {
        return this.checkSwitchByName("openServantBone");
    };
    /**
     * 是否开启皮肤升级开关
     */
    SwitchVoApi.prototype.checkOpenSkinLvup = function () {
        return this.checkSwitchByName("openSkinLvup");
    };
    /**
     * 是否开启一键公务开关
     */
    SwitchVoApi.prototype.checkOpenOfficialbusiness = function () {
        return this.checkSwitchByName("openOfficialbusiness");
    };
    /**
     * 是否开启语音功能
     */
    SwitchVoApi.prototype.checkOpenNewSound = function () {
        return this.checkSwitchByName("openNewSound");
    };
    /**
     * 是否开启一键学习功能
     */
    SwitchVoApi.prototype.checkOpenAutoStudy = function () {
        return this.checkSwitchByName("openAutoStudy");
    };
    /**
     * 是否开启称号升级
     */
    SwitchVoApi.prototype.checkOpenTitleLv = function () {
        return this.checkSwitchByName("openTitleLv");
    };
    /**
     * 是否关闭玩一玩红包
     */
    SwitchVoApi.prototype.checkCloseWywRedMoney = function () {
        return this.checkSwitchByName("closeWywRedMoney");
    };
    /**
     * 是否开启回归系统
     */
    SwitchVoApi.prototype.checkOpenReback = function () {
        return this.checkSwitchByName("openReback");
    };
    //检测红颜皮肤是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsSkinState = function (skinId) {
        return this.checkSwitchByName("wifeSkin_name" + skinId);
    };
    /**
     * 检测门客皮肤否通过GM开启，true为已开启
     */
    SwitchVoApi.prototype.checkIsServantSkinState = function (skinId) {
        return this.checkSwitchByName("servantSkin_name" + skinId);
    };
    /**
     *  限时红颜的开关   绑死 泰国 和 玩一玩
     * */
    SwitchVoApi.prototype.checkOpenTimeLimitWife = function () {
        return this.checkSwitchByName("openTimeLimitWife") || PlatformManager.checkIsRuSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsLmSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsWanbaSp() || PlatformManager.checkIsFkcwSp() || PlatformManager.checkIsCpsSp() || PlatformManager.checkIsLocal();
    };
    /**
     * 1元限时礼包开关
     */
    SwitchVoApi.prototype.checkLimitedGift = function () {
        return this.checkSwitchByName("open1CostSceneGift") && Api.switchVoApi.checkClosePay() == false && PlatformManager.getAppid() != "17027003";
        // return false;
    };
    /**
     *  打开  帮会排行榜新规则
     */
    SwitchVoApi.prototype.checkOpenAllianceRankNewRule = function () {
        return this.checkSwitchByName("openAllianceRankNewRule");
    };
    /*
    *黄金假期称号开关
    */
    SwitchVoApi.prototype.checkOpenAcNewYear5Title = function () {
        return this.checkSwitchByName("openAcNewYear5Title");
    };
    /*
    * 概率开关
    */
    SwitchVoApi.prototype.checkOpenProbably = function () {
        return this.checkSwitchByName("openProbably");
    };
    /*
    * 私聊发送消息开关
    */
    SwitchVoApi.prototype.checkOpenPrichatSendMsg = function () {
        return this.checkSwitchByName("openPrichatSendMsg");
    };
    /**
     * 是否开启开关，在帮会擂台冲榜期间不可踢人，不可退帮
     */
    SwitchVoApi.prototype.checkOpenRankActive = function () {
        return this.checkSwitchByName("rankActive20");
    };
    /**
     * 是否开启我要变强
     */
    SwitchVoApi.prototype.checkOpenStrengthen = function () {
        return this.checkSwitchByName("openStrengthen");
    };
    /**
     * 是否开启演武场分享聊天
     */
    SwitchVoApi.prototype.checkOpenStudyatkShare = function () {
        return this.checkSwitchByName("openStudyatkShare");
    };
    /**
     * 是否开启全服提亲分享聊天
     */
    SwitchVoApi.prototype.checkOpenAdultShare = function () {
        return this.checkSwitchByName("openAdultShare");
    };
    /**
     * 是否开启场景更换
     */
    SwitchVoApi.prototype.checkOpenChangeBg = function () {
        return this.checkSwitchByName("openChangeBg");
    };
    //检测场景皮肤是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkIsSceneState = function (skinId) {
        return this.checkSwitchByName("scene_name" + skinId);
    };
    /**
     * 是否开启活动图标收起
     */
    SwitchVoApi.prototype.checkOpenMainUIIconExtend = function () {
        return true;
    };
    /**
     * 是否开启第二行图标收起
     */
    SwitchVoApi.prototype.checkOpenMainUIIconSingleLine = function () {
        return this.checkSwitchByName("openMainUISingleLine");
    };
    /**
     * 检测 是否开启帮会战
     */
    SwitchVoApi.prototype.checkOpenAllianceWar = function () {
        return this.checkSwitchByName("openAllianceWar") && this.checkOpenCrossRank();
    };
    /**
     * 演武场 新规则开关
     */
    SwitchVoApi.prototype.checkOpenStudyatkNewRule = function () {
        return this.checkSwitchByName("openStudyatkNewRule");
    };
    /**
     * 演武场 保护规则开关
     */
    SwitchVoApi.prototype.checkOpenStudyAtkProtectNewRule = function () {
        return this.checkSwitchByName("openStudyAtkProtectNewRule");
    };
    /**
     * 泰国4倍首冲
     */
    SwitchVoApi.prototype.checkOpenMultiple = function () {
        return this.checkSwitchByName("openMultiple");
    };
    SwitchVoApi.prototype.checkOpenIOSLoadErrorView = function () {
        return this.checkSwitchByName("openIOSLoadErrorView");
    };
    /**
     * 演武场经验加成开关
     */
    SwitchVoApi.prototype.checkOpenStudyatkExp = function () {
        return this.checkSwitchByName("openStudyatkExp");
    };
    /**
     * 升级官品增加属性开关
     */
    SwitchVoApi.prototype.checkOpenUpgradeAddAttribute = function () {
        return this.checkSwitchByName("openUpgradeAddAttribute");
    };
    /**
     * 检测fb广告开关
     */
    SwitchVoApi.prototype.checkFBADSOpen = function () {
        return this.checkSwitchByName("openFBADS");
    };
    /**
     * 雁门关集合开关
     */
    SwitchVoApi.prototype.checkOpenDailybossTogather = function () {
        return this.checkSwitchByName("openDailybossTogather");
    };
    /**
     * 门客战开关
     */
    SwitchVoApi.prototype.checkOpenCountryWar = function () {
        return this.checkSwitchByName("openCountryWar");
    };
    /**
     * 智力 魅力 政治 一起影响经营的cd时间
     */
    SwitchVoApi.prototype.checkOpenNewManageTime = function () {
        return this.checkSwitchByName("openNewManageTime");
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
    /**
     * 门客突破至450级
     */
    SwitchVoApi.prototype.checkOpenServantLevel450 = function () {
        return this.checkSwitchByName("OpenServantLevel450");
    };
    /**
     * 检测新手引导音效是否开启
     */
    SwitchVoApi.prototype.checkOpenRookTalkEffect = function () {
        return this.checkSwitchByName("openRookTalkEffect");
    };
    /**
     * vip界面详情弹窗开关
     */
    SwitchVoApi.prototype.checkOpenVipTxtpop = function () {
        return this.checkSwitchByName("openVipTxtpop");
    };
    /**
     * 擂台/跨服擂台 复仇是否从列表删除开关
     */
    SwitchVoApi.prototype.checkOpenRevengeList = function () {
        return this.checkSwitchByName("revengeList");
    };
    /**
     * 跨服擂台-2000分开关
     */
    SwitchVoApi.prototype.checkOpenAtkracegChangegpoint = function () {
        return this.checkSwitchByName("atkracegChangegpoint");
    };
    /**
     * 活动公告开关
     */
    SwitchVoApi.prototype.checkOpenActivityPop = function () {
        return this.checkSwitchByName("activityPop");
    };
    /**
     * 是否开启红颜技能200以后的等级
     */
    SwitchVoApi.prototype.checkOpenWifeSkillLv = function () {
        return this.checkSwitchByName("wifeskillLv");
    };
    /**
     * 检测是否开启审核服游戏功能，（走完新手引导直接跳到对应功能）
     */
    SwitchVoApi.prototype.checkOpenShenheGame = function () {
        var shenhe3k = false;
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            var pathname = window.location.pathname;
            shenhe3k = pathname.indexOf("iosshenhe_3ksh") > -1 || pathname.indexOf("iosshenhe_xy1") > -1 || pathname.indexOf("iosshenhe_en_xy") > -1;
        }
        return (PlatformCfg.shenheFunctionName && PlatformManager.checkIsIOSShenheSp() && shenhe3k);
    };
    /**
     * 是否关闭 终身卡界面的不能直升VIP3的提示，海外平台全部关闭，国内全部打开
     */
    SwitchVoApi.prototype.checkCloseYearCardTip = function () {
        return PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsTWBSp();
    };
    /**
     * 是否开启聊天 Google翻译
     */
    SwitchVoApi.prototype.checkOpenTranslate = function () {
        return this.checkSwitchByName("openTranslate");
    };
    /**
     * 是否开启红颜省亲
     */
    SwitchVoApi.prototype.checkOpenBanish = function () {
        return this.checkSwitchByName("openBanish");
    };
    /**
     * 是否开启门客出海
     */
    SwitchVoApi.prototype.checkOpenExile = function () {
        return this.checkSwitchByName("openExile");
    };
    /**
     * 是否开启门客出海buff
     */
    SwitchVoApi.prototype.checkOpenExileBuff = function () {
        return this.checkSwitchByName("openExileBuff");
    };
    /**
     * 是否开启门客限时流放卡
     */
    SwitchVoApi.prototype.checkOpenExileLimitTimeCard = function () {
        return this.checkSwitchByName("openExileLimitTimeCard");
    };
    /**
     * 是否开启流放免费撤回
     */
    SwitchVoApi.prototype.checkOpenBanishFreeTime = function () {
        return this.checkSwitchByName("openBanishFreeTime");
    };
    /**
     * 是否开启月卡解锁席位  解锁修身技能开关
     */
    SwitchVoApi.prototype.checkOpenSeat = function () {
        return this.checkSwitchByName("openNewMonthAndYearCardBouns");
    };
    /**
     * 是否开启合服开关
     */
    SwitchVoApi.prototype.checkOpenServerMaintain = function () {
        return this.checkSwitchByName("openServerMaintain");
    };
    /**
     * 是否开启听雨轩开启碎片兑换
     */
    SwitchVoApi.prototype.checkOpenExchangeSkin = function () {
        return this.checkSwitchByName("checkOpenExchangeSkin");
    };
    /**
     * 是否开启七日好礼开关
     */
    SwitchVoApi.prototype.checkOpenSevenDay = function () {
        return this.checkSwitchByName("OpenSevenDay");
    };
    /**
     * 门客详情，新老界面开关（人物传记）
     */
    SwitchVoApi.prototype.checkBiography = function () {
        return this.checkSwitchByName("Biography");
    };
    /**
     * 推送开关
     */
    SwitchVoApi.prototype.checkOpenPushSetting = function () {
        return this.checkSwitchByName("Push");
    };
    /**
     * 仕途记录
     */
    SwitchVoApi.prototype.checkOpenOfficialCareer = function () {
        return this.checkSwitchByName("openOfficialCareer");
    };
    /**
     * 剧情回忆
     */
    SwitchVoApi.prototype.checkOpenStoryRecall = function () {
        return this.checkSwitchByName("openStoryRecall");
    };
    /**
     * 情缘绘卷
     */
    SwitchVoApi.prototype.checkOpenQingYuanHuiJuan = function () {
        return this.checkSwitchByName("openQingYuanHuiJuan");
    };
    SwitchVoApi.prototype.checkOpenQingYuan = function (type) {
        return this.checkSwitchByName("openQingYuan" + type);
    };
    /**
     * 开启称号分类
     */
    SwitchVoApi.prototype.checkOpenTitleList = function () {
        return this.checkSwitchByName("openTitleList");
    };
    /**
     * 帮会周末活动开关
     */
    SwitchVoApi.prototype.checkAllianceweekend = function () {
        return this.checkSwitchByName("openAllianceweekend");
    };
    /**
     * 新版皇宫开关
     */
    SwitchVoApi.prototype.checkNewPalace = function () {
        return this.checkSwitchByName("openNewPalace");
    };
    /**
     * 帝王霸业
     */
    SwitchVoApi.prototype.checkTitleUpgrade = function () {
        return this.checkSwitchByName("openTitleUpgradeCfg");
    };
    /**
     * 新蛮王功能
     */
    SwitchVoApi.prototype.checkNewDailyBoss = function () {
        return this.checkSwitchByName("openNewDailyBoss");
    };
    /**
     * 单个神器开关
     */
    // public checkWeaponById(weaponId:string):boolean
    // {
    // 	return this.checkSwitchByName(`weapon_name_${weaponId}`) && Api.otherInfoVoApi.getServerOpenDay() >= Config.GamepaceCfg.getWeaponPace();
    // }
    /**
     * 整个神器功能开关
     */
    SwitchVoApi.prototype.checkWeaponFunction = function () {
        return this.switchVo && this.switchVo.openWeapon && Api.otherInfoVoApi.getServerOpenDay() >= Config.GamepaceCfg.getWeaponPace();
    };
    SwitchVoApi.prototype.checkWeaponFunctionOnly = function () {
        return this.switchVo && this.switchVo.openWeapon;
    };
    SwitchVoApi.prototype.checkOpenServantWeapon = function () {
        return this.checkWeaponFunctionOnly();
    };
    /**
     * 红颜皮肤升级总开关
     */
    SwitchVoApi.prototype.checkWifeSkinLevelUp = function () {
        return true;
    };
    /**
     * 红颜皮肤升级配音
     */
    SwitchVoApi.prototype.checkWifeSkinSoundOpen = function (wifeskinId) {
        return this.checkSwitchByName("wifeSkinSound_" + wifeskinId);
    };
    /**
     * 关闭红颜拉窗帘亲亲
     */
    SwitchVoApi.prototype.checkCloseWifeKiss = function () {
        return this.checkSwitchByName("closeWifeKiss");
    };
    /**科举答题 */
    SwitchVoApi.prototype.checkExamOpen = function () {
        return this.checkSwitchByName("openexamview");
    };
    /**府邸左侧活动icon */
    SwitchVoApi.prototype.checkLeftActIconOpen = function () {
        return this.checkSwitchByName("openLeftActIcon");
    };
    /**
     * 结识红颜开关
     */
    SwitchVoApi.prototype.checkMeetBeautyOpen = function () {
        return this.checkSwitchByName("openMeetBeauty");
        // return false;
    };
    /**
     * 门客免战开关
     */
    SwitchVoApi.prototype.checkServantRefuseBattle = function () {
        return this.checkSwitchByName("OpenServantRefuseBattle");
    };
    /**
     * 门客名望/功勋开关
     */
    SwitchVoApi.prototype.checkServantFame = function () {
        return this.checkSwitchByName("openServantFame");
    };
    /**
     * 关卡关数开关
     */
    SwitchVoApi.prototype.getChallengeOpen = function () {
        var idx = GameConfig.isNewDiffCfg ? 1 : 0;
        return this.switchVo.changeOpen[idx];
    };
    /**
     * 聊天表情开关
     */
    SwitchVoApi.prototype.checkEmoticonOpen = function () {
        return this.checkSwitchByName("OpenChatStamp");
    };
    /**
     * 红颜技能满级后经验转道具开关
     */
    SwitchVoApi.prototype.checkWifeExpExchangeOpen = function () {
        return this.checkSwitchByName("OpenWifeExpExchange");
    };
    /**
     * 红颜对战系统开关
     */
    SwitchVoApi.prototype.checkOpenWifeBattle = function () {
        return this.checkSwitchByName("openWifeBattle");
    };
    /**
     * 珍奇坊
     */
    SwitchVoApi.prototype.checkZhenQiFangOpen = function () {
        return this.checkWeaponFunction();
    };
    /**
     * 门客皮肤展示
     */
    SwitchVoApi.prototype.checkServantShowSkin = function () {
        return false;
    };
    // public checkZhenQiFangOpen():boolean
    // {
    // 	// return this.checkSwitchByName(`openZhenQiFang`);
    // }
    /**
     * 马可波罗新手引导剧情
     */
    SwitchVoApi.prototype.checkRookieEnStory = function () {
        return this.checkSwitchByName("RookieEnStory");
    };
    /**
     * 出入府动效开关
     */
    SwitchVoApi.prototype.checkOpenGooutAni = function () {
        return this.checkSwitchByName("openGooutAni");
    };
    /**
     * 打开面板动效
     */
    SwitchVoApi.prototype.checkShowOpenViewAni = function () {
        return this.checkSwitchByName("openShowViewAni");
    };
    /**
     * 是否开启蓝颜
     */
    SwitchVoApi.prototype.checkOpenBlueWife = function () {
        return this.checkSwitchByName("openBlueWife");
        // return true;
    };
    /**
     * 英文vip阶段礼包
     */
    SwitchVoApi.prototype.checkOpenWelcomeVipGift = function () {
        return this.checkSwitchByName("openWelcomeVipGift");
    };
    /**
     * 英文vip阶段周礼包
     */
    SwitchVoApi.prototype.checkOpenweeklyVipGift = function () {
        return this.checkSwitchByName("openweeklyVipGift");
    };
    /**
     * 是否屏蔽聊天，true的话是屏蔽
     */
    SwitchVoApi.prototype.checkCloseChat = function () {
        return this.checkSwitchByName("closeAllChat");
    };
    /**
     * 是否屏蔽平乱公告按钮
     */
    SwitchVoApi.prototype.checkCloseCountryWarEditBtn = function () {
        return this.checkSwitchByName("closeCountryWarEditBtn");
    };
    /**
     * 是否显示隐藏vip设置
     */
    SwitchVoApi.prototype.checkOpenHideVip = function () {
        return this.checkSwitchByName("openHideVip");
    };
    /**
     * 检测是否只是shenhe目录
     */
    SwitchVoApi.prototype.checkIsOlyShenheFile = function () {
        if (PlatformManager.checkIsIOSShenheSp()) {
            if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
                var pathname = window.location.pathname;
                var tmpstr = pathname.substring(pathname.length - 9);
                if (tmpstr == "iosshenhe" || tmpstr == "osshenhe/") {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 1元限时礼包开关 第二期
     */
    SwitchVoApi.prototype.checkLimitedGift2 = function () {
        return this.checkSwitchByName("open1CostSceneGift2") && Api.switchVoApi.checkClosePay() == false && PlatformManager.getAppid() != "17027003";
        // return false;
    };
    /**
     * 是否处在蓝颜开启状态（GM开关+玩家自己开关）
     */
    SwitchVoApi.prototype.checkIsInBlueWife = function () {
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() == 1) {
            return true;
        }
        return false;
    };
    /*
        蓝颜出府剧情
        开启：特定次数出府时会触发蓝颜剧情
        关闭：不触发
    */
    SwitchVoApi.prototype.checkOpenBlueWifeOutHomeStory = function () {
        return this.checkSwitchByName("openBlueWifeOutHomeStory");
    };
    /**
     * 寻访剧情开关
     */
    SwitchVoApi.prototype.checkOpenNewStory = function () {
        return this.checkSwitchByName("openNewStory");
    };
    /**
     * ar 拍照
     */
    SwitchVoApi.prototype.checkOpenWifeArCamera = function () {
        return this.checkSwitchByName("openWifeArCamera");
    };
    /**
     * 头像框头衔等级切换
     */
    SwitchVoApi.prototype.checkOpenChangeTitle = function () {
        return this.checkSwitchByName("openChangeTitle");
    };
    /**
     * 跨服皇陵不死天官开关
     */
    SwitchVoApi.prototype.checkOpenTombEndLess = function () {
        return this.checkSwitchByName("openTombEndlessBoss");
    };
    /**新ui
     */
    SwitchVoApi.prototype.chekcOpenNewUi = function () {
        return false;
    };
    /**
     * 表情包系列开关 group 1,2 默认全平台开启
     */
    SwitchVoApi.prototype.checkEmoticonGroupOpen = function (groupId) {
        if (groupId == 1 || groupId == 2) {
            return true;
        }
        return this.checkSwitchByName("openEmoticonGroup_" + groupId);
    };
    /**
     * 帝王成就
     */
    SwitchVoApi.prototype.checkOpenEmperorsAchievement = function () {
        return this.checkSwitchByName("openEmperorsAchievement");
    };
    /**
     * 列传本纪
     */
    SwitchVoApi.prototype.checkOpenBiography = function () {
        return this.checkSwitchByName("openBiography");
    };
    /**
     * 重新唤起分阶段引导
     */
    SwitchVoApi.prototype.checkOpenGuideAgain = function () {
        return this.checkSwitchByName("openGuideAgain");
    };
    /**
     * 开启门客等级标签
     */
    SwitchVoApi.prototype.checkOpenServantLvLabel = function () {
        return this.checkSwitchByName("openServantLvLabel");
    };
    /**
     * 一键收宴
     */
    SwitchVoApi.prototype.checkOpenFinishDinner = function () {
        return this.checkSwitchByName("openFinishDinner");
    };
    /**
     * 帮助按钮开关
     */
    SwitchVoApi.prototype.checkOpenMainUIHelpBtn = function () {
        return this.checkSwitchByName("openMainUIHelpBtn");
    };
    /**
     * 新邀请好友开关
     */
    SwitchVoApi.prototype.checkOpenNewInvite = function () {
        return this.checkSwitchByName("openNewInvite");
    };
    /**
     * 月卡持续期间免费高建
     */
    SwitchVoApi.prototype.checkOpenMonthcardDonate = function () {
        return this.checkSwitchByName("openMonthcardDonate");
    };
    /**
     * 红颜特计
     */
    SwitchVoApi.prototype.checkOpenWifeExSkill = function () {
        return this.checkSwitchByName("openWifeExSkill");
    };
    /**
     * 召回玩家开关
     */
    SwitchVoApi.prototype.checkOpenPlayerComeBack = function () {
        return this.checkSwitchByName("openPlayerComeBack");
    };
    /**
     * 管家一键收取开关
     */
    SwitchVoApi.prototype.checkOpenHousekeeper = function () {
        return this.checkSwitchByName("openHousekeeper");
    };
    /**
     * 管家一键收取开关
     */
    SwitchVoApi.prototype.checkOpenGrowGold = function () {
        return this.checkSwitchByName("openGrowGold");
    };
    /**
     * 情缘绘卷 佳人、门客页签开关
     */
    SwitchVoApi.prototype.checkOpenQingyuanServantAndWifePage = function () {
        return this.checkSwitchByName("openQingyuanServantAndWifePage");
    };
    /**
     * 皇城六部开关
     */
    SwitchVoApi.prototype.checkOpenSixSection = function () {
        return this.checkSwitchByName("openSixSection");
    };
    //皇城六部 建筑是否通过GM开启，true为已开启
    SwitchVoApi.prototype.checkOpenSixSectionBuilding = function (buildingId) {
        return this.checkSwitchByName("sixSection_bulid" + buildingId);
    };
    /**
     * 府内按钮收起显示
     */
    SwitchVoApi.prototype.checkOpenHouseBtnUp = function () {
        return this.checkSwitchByName("openHouseBtnUp");
    };
    /**
     * 快速战斗和试用
     */
    SwitchVoApi.prototype.checkOpenFastFight = function () {
        return this.checkSwitchByName("openFastFight");
    };
    /**
     * 功能解锁特效
     */
    SwitchVoApi.prototype.checkOpenUnlockFuncEffect = function () {
        return this.checkSwitchByName("openUnlockFunctionEffect");
    };
    return SwitchVoApi;
}(BaseVoApi));
__reflect(SwitchVoApi.prototype, "SwitchVoApi");
//# sourceMappingURL=SwitchVoApi.js.map