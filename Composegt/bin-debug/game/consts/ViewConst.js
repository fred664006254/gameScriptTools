/**
 * author 陈可
 * date 2017/9/11
 * @class ViewConst
 */
var ViewConst;
(function (ViewConst) {
    /**
     * 全屏界面，继承commView的界面
     */
    var COMMON;
    (function (COMMON) {
        /**
         * 排行榜玩家信息弹窗 新
         */
        COMMON.RANKUSERINFOVIEW = "RankUserInfoView";
        /**
         * 寻访故事播放
         */
        COMMON.SEARCHSTORYVIEW = "SearchStoryView";
        COMMON.ACONEYEAROVERVIEW = "AcOneYearOverviewView";
        COMMON.ACONEYEARPACKSKINVIEW = "AcOneYearPackSkinView";
        COMMON.ACONEYEARPACKSKINDETAILVIEW = "AcOneYearPackSkinDetailView";
        //电玩大本营
        /** 电玩大本营-奖励展示 */
        COMMON.ACARCADEGAMEREWARDVIEW = "AcArcadeGameRewardView";
        /** 电玩大本营-抽奖 */
        COMMON.ACARCADEGAMEGETREWARDPOPUPVIEW = "AcArcadeGameGetRewardPopupView";
        /** 电玩大本营-日志 */
        COMMON.ACARCADEGAMELOGVIEW = "AcArcadeGameLogView";
        COMMON.ACARCADEGAMELISTVIEW = "AcArcadeListPopupView";
        COMMON.ACARCADEGAMEBATCHPOPUPVIEW = "AcArcadeBatchPopupView";
        //电玩大本营 AcArcadeBatchPopupView
        /**电玩大本营--游戏 */
        COMMON.ACARCADEGAMEVIEW = "AcArcadeGameView";
        COMMON.TITLEUPGRADELLEVELUPVIEW = "TitleUpgradeLevelUpView";
        COMMON.ACEXAMANSWERRANKPOPUPVIEW = "AcExamAnswerRankPopupView";
        //玩家回归
        COMMON.PLAYERRETURNVIEW = "PlayerReturnView";
        //皮肤
        COMMON.SKINVIEW = "SkinView";
        COMMON.SKINDETAILVIEW = "SkinDetailView";
        COMMON.SKINLEVELUPVIEW = "SkinLevelUpView";
        /** 用户信息界面 */
        COMMON.PLAYERVIEW = "PlayerView";
        /** 打开道具 */
        COMMON.ITEMVIEW_TAB1 = "ItemView";
        COMMON.ITEMVIEW_TAB2 = "ItemView|1";
        COMMON.ITEMVIEW_TAB3 = "ItemView|2";
        /**打开红颜已迎娶 */
        COMMON.WIFEVIEW_TAB1 = "WifeView|1";
        /**打开红颜未迎娶 */
        COMMON.WIFEVIEW_TAB2 = "WifeView|2";
        COMMON.WIFEUNLOCKVIEW = "WifeUnLockView";
        COMMON.WIFESTATUSVIEW = "WifestatusView";
        COMMON.WIFEALLTALENTVIEW = "WifeAllTalentView";
        COMMON.ACCROSSSERVERWIFEALLTALENTVIEW = "AcCrossServerWifeAllTalentView";
        /**
         * 称帝界面 纪录
         */
        // export const MONARCHRECORDdVIEW:string="MonarchRecordView";
        // /**
        //  * 称帝界面
        //  */
        // export const MONARCHVIEW:string="MonarchView";
        /**
         * 经营界面
         */
        COMMON.MANAGEVIEW = "ManageView";
        /**
         * 征收界面
         */
        COMMON.LEVYVIEW = "LevyView";
        /**
         * 关卡界面
         */
        COMMON.CHALLENGEVIEW = "ChallengeView";
        //门客
        COMMON.SERVANTVIEW = "ServantView";
        COMMON.SERVANTINFOVIEW = "ServantInfoView";
        COMMON.SERVANTINFOVIEW_TAB2 = "ServantInfoView|2";
        COMMON.SERVANTSKINCHANGEVIEW = "ServantSkinChangeView";
        //升官
        COMMON.PROMOTIONVIEW = "PromotionView";
        /**升官成功 */
        COMMON.PROMOTIONSUCCESSVIEW = "PromotionSuccessView";
        COMMON.PROMOTIONSUCCESSDRAGONVIEW = "PromotionSuccessDBDragonView";
        //政务
        COMMON.AFFAIRVIEW = "AffairView";
        //红颜操作
        COMMON.WIFEOPTVIEW = "WifeOptView";
        //红颜转生
        COMMON.WIFECHANGESEXVIEW = "WifeChangeSexView";
        //红颜转生成功
        COMMON.WIFECHANGESEXSUCCESSVIEW = "WifeChangeSexSuccessView";
        /**
         * 子嗣
         */
        COMMON.CHILDVIEW = "ChildView";
        /**
         * 创建角色
         */
        COMMON.GUIDECREATEUSERVIEW = "GuideCreateUserView";
        /**
         * 新创建角色界面
         */
        COMMON.CREATEUSERVIEW = "CreateUserView";
        /**
         * 排行
         */
        COMMON.RANKVIEW = "RankView";
        COMMON.RANKCROSSVIEW = "RankCrossView";
        COMMON.RANKSINGLEVIEW = "RankSingleView";
        /**
         * 聊天
         */
        COMMON.CHATVIEW = "ChatView";
        /**
         * 帮会聊天
         */
        COMMON.CHATVIEWTAB1 = "ChatView|1";
        /**
     * 跨服聊天
     */
        COMMON.CHATVIEWTAB3 = "ChatView|3";
        COMMON.CHATACTIVITYCROSSVIEW = "ChatActivityCrossView";
        COMMON.ACCROSSSERVERWIPEBOSSCHATVIEW = "AcCrossServerWipeBossChatView";
        COMMON.ACCROSSSERVERWIFEBATTLECHATVIEW = "AcCrossServerWifeBattleChatView";
        /**
         * 媒婆界面
         */
        COMMON.ADULTVIEW = "AdultView";
        /**商店热卖页签 */
        COMMON.SHOPVIEW_TAB1 = "ShopView";
        /**商店特惠礼包页签 */
        COMMON.SHOPVIEW_TAB2 = "ShopView|1";
        /**商店道具页签 */
        COMMON.SHOPVIEW_TAB3 = "ShopView|2";
        /**
         * 提亲列表界面
         */
        COMMON.ADULTMARRYVIEW = "AdultMarryView";
        /**
         * 拜访列表界面
         */
        COMMON.ADULTCHOOSEVISITVIEW = "AdultChooseVisitView";
        /**
         * 每日任务
         */
        COMMON.DAILYTASKVIEW = "DailyTaskView";
        /**
         * 充值界面
         */
        // export const RECHARGEVIEW:string="RechargeView";
        /**
         * vip界面
         */
        COMMON.VIPVIEW = "VipView";
        /**
         * 福利界面--首冲
         */
        COMMON.WELFAREVIEWFIRSTRECHARGE = "WelfareView|FirstRecharge";
        /**
         * 福利界面--微信关注
         */
        COMMON.WELFAREVIEWOFFICIALWECHAT = "WelfareView|OfficialWeChat";
        /**
         * 福利界面--签到
         */
        COMMON.WELFAREVIEWSIGNIN = "WelfareView|Signin";
        /**
         * 福利界面--实名
         */
        COMMON.WELFAREVIEWREALNAME = "WelfareView|Realname";
        /**
         * 福利界面--功能介绍
         */
        COMMON.WELFAREVIEWFUNCTIONPREVIEW = "WelfareView|FunctionPreview";
        /**
         * 福利界面--q群福利
         */
        COMMON.WELFAREVIEWQGROUP = "WelfareView|Qgroup";
        /**
         * 福利界面--1.5倍返利
         */
        COMMON.WELFAREVIEWREBATE = "WelfareView|Rebate";
        /**
         * 四大谋士
         */
        COMMON.ACFOURPEOPLEVIEW = "AcFourPeopleView";
        /**
         * 春季庆典
         */
        COMMON.ACSPRINGCELEBRATE = "AcSpringCelebrateView";
        COMMON.ACSPRINGCELEBRATE_TAB1 = "AcSpringCelebrateView|1";
        COMMON.ACSPRINGCELEBRATE_TAB2 = "AcSpringCelebrateView|2";
        COMMON.ACSPRINGCELEBRATE_TAB3 = "AcSpringCelebrateView|3";
        COMMON.ACSPRINGCELEBRATE_TAB4 = "AcSpringCelebrateView|4";
        /**
         * 充值＋特权WifeTalentBuffPopupView
         */
        COMMON.RECHARGEVIPVIEW = "RechargeVipView";
        COMMON.RECHARGEVIPVIEWTAB2 = "RechargeVipView|1";
        /**
         * 福利界面--月卡
         */
        COMMON.WELFAREVIEWMONTHCARD = "WelfareView|MonthCard";
        /**
         * 福利界面--终身卡
         */
        COMMON.WELFAREVIEWYEARCARD = "WelfareView|YearCard";
        /**
         * 福利界面--天恩赐福
         */
        COMMON.WELFAREVIEWGODBLESS = "WelfareView|GodBless";
        /**
         * 福利界面--12
         */
        COMMON.WELFAREVIEWRECHARGEBOX = "WelfareView|RechargeBox";
        /**
         * 成就界面
         */
        COMMON.ACHIEVEMENTVIEW = "AchievementView";
        /**
         * 公告
         */
        COMMON.GAMEANNOUNCEMENtVIEW = "GameAnnouncementView";
        /**
         * 感恩回馈
         */
        COMMON.THANKSGIVINGVIEW = "ThanksgivingView";
        /**
         * 牢房
         */
        COMMON.PRISONVIEW = "PrisonView";
        COMMON.ACRANKACTIVEVIEW = "AcRankActiveView";
        /**
         *  宴会详情界面
         */
        COMMON.DINNERDETAILVIEW = "DinnerDetailView";
        /**
         *  宴会奖励界面
         */
        COMMON.DINNERREWARDVIEW = "DinnerRewardView";
        /**
         * 充值奖励
         */
        COMMON.ACRECHARGEVIEW = "AcRechargeView";
        /**
         * 神秘商店
         */
        COMMON.ACVIPSHOPVIEW = "AcVipShopView";
        /**
         * 春节攀升
         */
        COMMON.ACNEWYEARVIEW = "AcNewYearView";
        COMMON.ACNEWYEARVIEW_TAB1 = "AcNewYearView|1";
        COMMON.ACNEWYEARVIEW_TAB2 = "AcNewYearView|2";
        // export const ACNEWYEARVIEWTAB2:string="AcNewYearViewTab2";
        // export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
        /**
         *  惩戒女囚界面
         */
        COMMON.ACPUNISHVIEW = "AcPunishView";
        /**
         *  擂台主界面
         */
        COMMON.ATKRACEVIEW = "AtkraceView";
        COMMON.ATKRACEARRESTVIEW = "AtkraceArrestView";
        /**
         *  擂台/来访消息
         */
        COMMON.ATKRACEVISITVIEW = "AtkraceVisitView";
        /**
         *  跨服擂台/来访消息
         */
        COMMON.ATKRACECROSSVISITVIEW = "AtkraceCrossVisitView";
        /**
         *  擂台/排行榜
         */
        COMMON.ATKRACERANKLISTVIEW = "AtkraceRankListView";
        /**擂台选人 */
        COMMON.ATKRACESELECTVIEW = "AtkraceSelectView";
        /**
         *  军团主界面
         */
        COMMON.ALLIANCEVIEW = "AllianceView";
        COMMON.ALLIANCETASKVIEW = "AllianceTaskView";
        COMMON.ALLIANCETASKREWARDVIEW = "AllianceTaskRewardView";
        COMMON.ALLIANCETASKDETAILVIEW = "AllianceTaskDetailView";
        /**
         *  没有军团界面
         */
        COMMON.ALLIANCECREATEVIEW = "AllianceCreateView";
        COMMON.BOOKROOMVIEW = "BookroomView";
        /**
         * 练武场
         */
        COMMON.STUDYATKDETAILVIEW = "StudyatkDetailView";
        /**
         * 练武场战斗
         */
        COMMON.STUDYBATTLEVIEW = "StudyatkBattleView";
        COMMON.STUDYATKVIEW = "StudyatkView";
        /**
         * 征伐
         */
        COMMON.CONQUESTVIEW = "ConquestView";
        COMMON.TRADEVIEW = "TradeView";
        COMMON.TRADERANKLISTVIEW = "TradeRankListView";
        /**
         * 跨服擂台
         */
        COMMON.ATKRACECROSSSUMMARYVIEW = "AtkracecrossSummaryView";
        COMMON.ATKRACECROSSVIEW = "AtkracecrossView";
        COMMON.ATKRACECROSSCHALLENGEVIEW = "AtkraceCrossChallengeView";
        COMMON.ATKRACECROSSRANKLISTVIEW = "AtkraceCrossRankListView";
        COMMON.ATKRACECROSSARRESTVIEW = "AtkracecrossArrestView";
        COMMON.ATKRACECROSSACTIVITYREWARDVIEW = "AtkracecrossActivityRewardView";
        /**
         * 红颜门客详情界面
         */
        COMMON.SERVANTWIFEDETAILVIEW = "ServantWifeDetailView";
        /**
         * 贸易战斗
         */
        COMMON.TRADEFIGHTVIEW = "TradeFightView";
        /**
         * 贸易胜利
         */
        COMMON.TRADEINFOPOPUPVIEW = "TradeInfoPopupView";
        /**
         * 宫廷皮肤兑换
         */
        COMMON.ACTAILOREXCHANGEVIEW = "AcTailorExchangeView";
        COMMON.CHATBLOCKVIEW = "ChatblockView";
        COMMON.ACWISHTREEEXCHANGEVIEW = "AcWishTreeExchangeView";
        /**
         * 寻访
         */
        COMMON.SEARCHVIEW = "SearchView";
        /**
         * 称帝
         */
        COMMON.PRESTIGEVIEW = "PrestigeView";
        COMMON.PALACEHOUSEVIEW = "PalaceHouseView";
        COMMON.PALACECROSSVIEW = "PalaceCrossView";
        COMMON.PALACEVIEW = "PalaceView";
        COMMON.PALACEHOUSEGROUPVIEW = "PalaceHouseGroupView";
        COMMON.PALACEEMPERORMOREVIEW = "PalaceEmperorMoreInfoView";
        COMMON.PALACEEMPERORLVUPVIEW = "PalaceEmperorLvupView";
        /**
         * 修身
         */
        COMMON.PRACTICEVIEW = "PracticeView";
        COMMON.PRACTICEABILITYVIEW = "PracticeAbilityView";
        /*
        *跨服亲密活动主界面
        */
        COMMON.ACCROSSSERVERINTIMACYENTERVIEW = "AcCrossServerIntimacyEnterView";
        /**
         * 称帝战
        */
        COMMON.EMPERORWARENTERVIEW = "EmperorWarEnterView";
        /**
         * 每日小额礼包
         */
        COMMON.ACDAILYGIFTVIEW = "AcDailyGiftView";
        /**
         *  端午活动
         */
        COMMON.ACDGRAGONBOATDAYVIEW = "AcDragonBoatDayView";
        /*
        *跨服权势活动主界面
        */
        COMMON.ACCROSSSERVERCROSSENTERVIEW = "AcCrossServerPowerEnterView";
        //帮会战首页
        COMMON.ALLIANCEWARVIEW = "AllianceWarView";
        COMMON.ALLIANCEWARVSVIEW = "AllianceWarVsView";
        COMMON.ALLIANCEWARSHOWANTIVIEW = "AllianceWarShowAntiView";
        //查看双十一代金券
        COMMON.ACSINGLEDAYCOUPONVIEW = "AcSingleDayCouponView";
        //仙人馈赠楼层
        COMMON.ACSINGLEDAYBUILD1VIEW = "AcSingleDayBuild1View";
        COMMON.ACSINGLEDAYSKINVIEW = "AcSingleDaySkinView";
        COMMON.ACSINGLEDAYBUILD3VIEW = "AcSingleDayBuild3View";
        //好友
        COMMON.FRIENDSVIEW = "FriendView";
        /**
         * 选择接待
         */
        COMMON.ADULTCHOOSERECEICEVIEW = "AdultChooseReceiveView";
        /**
         *  圣诞节活动
         */
        COMMON.ACCHRISTMASTASKVIEW = "AcChristmasTaskView";
        COMMON.ACCHRISTMASRESULTVIEW = "AcChristmasResultView";
        /**
         *  2019圣诞节活动
         */
        COMMON.ACMERRYXMASTASKPOPUPVIEW = "AcMerryXmasTaskPopupView";
        COMMON.ACMERRYXMASTASKPOPUPVIEW_TAB3 = "AcMerryXmasTaskPopupView|2";
        COMMON.ACMERRYXMASRESULTVIEW = "AcMerryXmasResultView";
        /**
         * 升级窗口
         */
        COMMON.TITLELEVELUPVIEW = "TitleLevelUpView";
        /**
         * 夺帝战宣传
         */
        COMMON.BETHEKINGVIEW = "AcBeTheKingView";
        COMMON.COUNCILEVENTVIEW = "CouncilEventView";
        COMMON.BETHEKINGVENTERVIEW = "BetheKingEnterView";
        COMMON.BETHEKINGREWARDVIEW = "BetheKingRewardVIew";
        // 筑阁祭天
        COMMON.ACBUILDINGWORSHIPTASKVIEW = "AcBuildingWorshipTaskView";
        // 携美同游
        COMMON.ACSPRINGOUTINGTASKVIEW = "AcSpringOutingTaskView";
        // 月夜活动 任务界面
        COMMON.ACMOONNIGHTTASKVIEW = "AcMoonNightTaskView";
        // 月夜活动 衣装预览
        COMMON.ACMOONNIGHTSHOWVIEW = "AcMoonNightShowView";
        // 月夜活动 衣装预览
        COMMON.FOURERECHARGESHOWVIEW = "FourRechargeShowView";
        //围剿鳌拜
        COMMON.ACWIPEBOSSENTERVIEW = "AcWipeBossEnterView";
        COMMON.ACWIPEBOSSSEARCHRESULTVIEW = "AcWipeBossSearchResultView";
        COMMON.ACWIPEBOSSBATTLEVIEW = "AcWipeBossBattleView";
        COMMON.ACCROSSSERVERWIPEBOSSENTERVIEW = "AcCrossServerWipeBossEnterView";
        COMMON.ACCROSSSERVERWIPEBOSSSEARCHRESULTVIEW = "AcCrossServerWipeBossSearchResultView";
        COMMON.ACCROSSSERVERWIPEBOSSBATTLEVIEW = "AcCrossServerWipeBossBattleView";
        /**绝地擂台详情 */
        COMMON.ACBATTLEDETAILSVIEW = "AcBattleDetailsView";
        COMMON.ACBATTLEGROUNDDETAILSVIEW = "AcBattleGroundDetailsView";
        /** 风云擂台排行 */
        COMMON.ACBATTLERANKPOPUPVIEW = "AcBattleRankPopupView";
        /**帮会争顶 */
        COMMON.ACBATTLEGROUNDMAPVIEW = "AcBattleGroundMapView";
        COMMON.ACBATTLEGROUNDARRESTVIEW = "AcBattleGroundArrestView";
        //红颜对战 搜索结果
        COMMON.WIFEBATTLESEARCHRESULTVIEW = "WifebattleSearchResultView";
        ////红颜对战  对战结果
        COMMON.WIFEBATTLERESULTVIEW = "WifebattleResultView";
        ////红颜对战  对战
        COMMON.WIFEBATTLEBATTLEVIEW = "WifebattleBattleView";
        //红颜对战 搜索结果
        COMMON.ACCROSSSERVERWIFEBATTLESEARCHRESULTVIEW = "AcCrossServerWifeBattleSearchResultView";
        ////红颜对战  对战结果
        COMMON.ACCROSSSERVERWIFEBATTLERESULTVIEW = "AcCrossServerWifeBattleResultView";
        ////红颜对战  对战
        COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW = "AcCrossServerWifeBattleBattleView";
        ////红颜对战  对战
        COMMON.ACCROSSSERVERWIFEBATTLEVIEW = "AcCrossServerWifeBattleView";
        // 新官上任
        COMMON.LOGINWEEKVIEW = "LoginWeekView";
        /** 麦田飘香 **/
        COMMON.ACRYEHARVESTCHARGEVIEW = "AcRyeHarvestChargeView";
        // 箭无虚发
        COMMON.ACARROWVIEW = "AcArrowView";
        COMMON.ACARROWLWVWLVIEW = "AcArrowLevelView";
        COMMON.ACARROWRANKVIEW = "AcArrowRankView";
        //狂欢之夜官报
        COMMON.ACCARNIVALNIGHTREPORTVIEW = "AcCarnivalNightReportView";
        // 月夜活动 衣装预览
        COMMON.ACRECHARGEBOXSPSHOWVIEW = "AcRechargeBoxSpShowView";
        //双十一活动入口
        COMMON.ACSINGLEDAYOVERVIEW = "AcSingleDayOverviewView";
        // 跨服元宝消耗冲榜
        COMMON.ACCROSSSERVERGEMEXPENDVIEW = "AcCrossServerGemExpendView";
        /**
         * 定军中原
         */
        COMMON.ACCONQUERMAINLANDVIEW = "AcConquerMainLandView";
        COMMON.ACCONQUERMAINLANDWARVIEW = "AcConquerMainLandWarView";
        COMMON.ACCONQUERMAINLANDSENDFIGHTVIEW = "AcConquerMainLandSendFightView";
        COMMON.ACCONQUERMAINLANDDETAILVIEW = "AcConquerMainLandDetailView";
        COMMON.ACCONQUERMAINLANDDETAILRANKVIEW = "AcConquerMainLandDetailView|2";
        COMMON.ACCONQUERMAINLANDDETAILARMYVIEW = "AcConquerMainLandDetailView|3";
        COMMON.ACCONQUERMAINLANDDETAILTASKVIEW = "AcConquerMainLandDetailView|4";
        COMMON.ACCONQUERMAINLANDWARSHOWVIEW = "AcConquerMainLandWarShowView";
        /**擂台战斗 */
        COMMON.ATKRACEBATTLEVIEW = "AtkraceBattleView";
    })(COMMON = ViewConst.COMMON || (ViewConst.COMMON = {}));
    /**
     * 小弹窗，继承popupview的界面
     */
    var POPUP;
    (function (POPUP) {
        /**
         * 通用任务弹窗,请前往AcCommonTaskPopupView查看参数和用法
         */
        POPUP.ACCOMMONTASKPOPUPVIEW = "AcCommonTaskPopupView";
        POPUP.ACCROSSSERVERWIFETALENTBUFFPOPUPVIEW = "AcCrossServerWifeTalentBuffPopupView";
        /** 跨服活动区服内排行榜*/
        POPUP.ACCROSSRANKLISTVIEW = "AcCrossRankListView";
        POPUP.WIFETALENTBUFFPOPUPVIEW = "WifeTalentBuffPopupView";
        POPUP.ACONEYEARPACKBOXPREVIEWPOPUPVIEW = "AcOneYearPackBoxPreviewPopupView";
        /** 通用红颜皮肤弹框 */
        POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW = "AcCommonWifeSkinRewardPopupView";
        /**
         * 首页回归弹板
         */
        POPUP.REBACKPOPUPVIEW = "PlayerReturnPopupView";
        //红颜对战 排行榜
        POPUP.WIFEBATTLERANKPOPUPVIEW = "WifebattleRankPopupView";
        //红颜对战 商城
        POPUP.WIFEBATTLESHOPPOPUPVIEW = "WifebattleShopPopupView";
        //提升才情
        POPUP.WIFETALENTUPPOPUPVIEW = "WifeTalentUpPopupView";
        //提升才情
        POPUP.ACCROSSSERVERWIFEBATTLEREWARDVIEW = "AcCrossServerWifeBattleRewardView";
        //跨服红颜对战 排行榜
        POPUP.ACCROSSSERVERWIFEBATTLERANKPOPUPVIEW = "AcCrossServerWifeBattleRankPopupView";
        //提升才情
        POPUP.ACCROSSSERVERWIFETALENTUPPOPUPVIEW = "AcCrossServerWifeTalentUpPopupView";
        /**
         * 私聊
         */
        POPUP.PRICHATVIEW = "PriChatView";
        /**微信强制分享界面 */
        POPUP.SHARECOMMONPOPUPVIEW = "ShareCommonPopupView";
        /**微信征收分享界面 */
        POPUP.SHARERECOVERPOPUPVIEW = "ShareRecoverPopupView";
        /** 分享奖励面板 */
        POPUP.SHAREPOPUPVIEW = "SharePopupView";
        /**
         * 群组分享奖励面板
         */
        POPUP.SHAREGROUPPOPUPVIEW = "SharegroupPopupView";
        /** 公共奖励面板 */
        POPUP.COMMONREWARDPOPUPVIEW = "CommonRewardPopupView";
        /** 道具、物品详情弹板 */
        POPUP.ITEMINFOPOPUPVIEW = "ItemInfoPopupView";
        /** 使用道具弹板 */
        POPUP.ITEMUSEPOPUPVIEW = "ItemUsePopupView";
        /** 道具兑换弹板 */
        POPUP.ITEMEXCHANGEPOPUPVIEW = "ItemExchangePopupView";
        /** 道具跳转弹板 */
        POPUP.ITEMJUMPPOPUPVIEW = "ItemJumpPopupView";
        /**错误弹板 *
        export const ERRORPOPUPVIEW:string = "ErrorPopupView";
        /**规则说明弹板 */
        POPUP.RULEINFOPOPUPVIEW = "RuleInfoPopupView";
        /**概率说明弹板 */
        POPUP.PROBINFOPOPUPVIEW = "ProbInfoPopupView";
        //门客详情
        POPUP.SERVANTATTRDETAILPOPUPVIEW = "ServantAttrDetailPopupView";
        /**
         * 离线自动获得资源弹窗
         */
        POPUP.AUTORESPOPUPVIEW = "AutoResPopupView";
        /**选择门客界面 */
        POPUP.SERVANTSELECTEDPOPUPVIEW = "ServantSelectedPopupView";
        /**西域商店VIP不足弹窗 */
        POPUP.ACVIPSHOPPOPUPVIEW = "AcVipShopPopupView";
        /**携美同游 好感度 */
        POPUP.ACSPRINGOUTINGLUCKUPPOPUPVIEW = "AcSpringOutingLuckUpPopupView";
        /**
         * 公务奖励
         */
        POPUP.AFFAIRVIEWWORDREWARDPOPUPVIEW = "AffairWordRewardPopupView";
        /**
         * 一键公务
         */
        POPUP.AFFAIRVIEWCHOICEPOPUPVIEW = "AffairViewChoicePopupView";
        /**
         *  擂台挑战
         */
        POPUP.ATKRACECHALLENGEVIEW = "AtkraceChallengeView";
        /**
         *  跨服擂台挑战
         */
        POPUP.ATKRACECROSSCHALLENGEVIEW = "AtkraceCrossChallengeView";
        POPUP.ATKRACEAUTOFIGHTPOPUPVIEW = "AtkraceAutoFightPopupView";
        POPUP.ATKRACEFIGHTINFOPOPUPVIEW = "AtkraceFightInfoPopupView";
        POPUP.ATKRACECROSSAUTOFIGHTPOPUPVIEW = "AtkracecrossAutoFightPopupView";
        /**使用道具确认取消弹板 */
        POPUP.ITEMUSECONSTPOPUPVIEW = "ItemUseConstPopupView";
        /**场景宠幸选择确认界面 */
        POPUP.WIFEBATHSCENECONFIRMPOPUPVIEW = "WifeBathSceneConfirmPopupView";
        /**
         * 帮会充值排行榜弹出界面
         */
        POPUP.ACALLIANCERECHARGERANKPOPUPVIEW = "AcAllianceRechargeRankPopupView";
        /**
         * 确认是否消耗元宝购买物品提示弹出框
         */
        POPUP.COSTGEMBUYITEMPOPUPVIEW = "CostGemBuyItemPopupView";
        /**
         * 查看寻访建筑信息弹窗
         */
        POPUP.SEARCHBUILDPOPUPVIEW = "SearchBuildPopupView";
        /**
         * 寻访结果弹窗
         */
        POPUP.SEARCHRESULTPOPUPVIEW = "SearchResultPopupView";
        /**
         *主线任务详情弹窗
         */
        POPUP.MainTASKPOPUPVIEW = "MainTaskPopupView";
        /** 起名字面板 */
        POPUP.NAMEPOPUPVIEW = "NamePopupView";
        /** 玩家改名 */
        POPUP.USERNAMEPOPUPVIEW = "UserNamePopupView";
        /**
         * 排行榜玩家信息弹窗
         */
        POPUP.RANKUSERINGOPOPUPVIEW = "RankUserinfoPopupView";
        /**
         * 实名认证领取奖励面板
         */
        POPUP.REALNAMEREWARDSPOPUPVIEW = "RealnamerewardsPopupView";
        /**
         * 子嗣联姻选择道具
         */
        POPUP.ADULTCHOOSETYPEVIEW = "AdultChooseTypeView";
        /**
         * 提亲请求列表
         */
        POPUP.ADULTMARRYREQUESTVIEW = "AdultMarryRequestView";
        /**
         * 拜访请求列表
         */
        POPUP.ADULTVISITREQUESTVIEW = "AdultVisitRequestView";
        /**
         * 姻缘录
         */
        POPUP.ADULTYINYUANRECORDVIEW = "AdultYinYuanRecordView";
        /**
         * 选择孩子
         */
        POPUP.ADULTCHOOSECHILDVIEW = "AdultChooseChildView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW = "DailyTaskRewardPreviewPopuiView";
        /**
         * 奖励页面
         */
        POPUP.ACMOONNIGHT_REWARDPOPUPVIEW = "AcMoonNightRewardPopupView";
        /**
         * 奖励页面
         */
        POPUP.ACTHXGIVING_REWARDPOPUPVIEW = "AcThxgivingRewardPopupView";
        /**
         * 携美通行道具不足
         */
        POPUP.ACSPRINGOUTING_BUYITEMPOPUPVIEW = "AcSpringOutingBuyItemPopupView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.ACNEWYEARPOPUPVIEW = "AcNewYearPopupView";
        /**
         * 邮件列表弹板
         */
        POPUP.MAILPOPUPVIEW = "MailPopupView";
        /**
         * 邮件详情弹板
         */
        POPUP.MAILDETAILPOPUPVIEW = "MailDetailPopupView";
        /**
         * 举办宴会
         */
        POPUP.HOLDDINNERPOPUPVIEW = "HoldDinnerPopupView";
        /**
         * 查找宴会
         */
        POPUP.DINNERFINDPOPUPVIEW = "DinnerFindPopupView";
        /**
         * 宴会积分兑换
         */
        POPUP.DINNEREXCHANGEPOPUPVIEW = "DinnerExchangePopupView";
        /**
         * 宴会排行榜
         */
        POPUP.DINNERRANKPOPUPVIEW = "DinnerRankPopupView";
        /**
         * 选宴会type
         */
        POPUP.DINNERTYPEPOPUPVIEW = "DinnerTypePopupView";
        /**
         * 宴会离线消息
         */
        POPUP.DINNERMESSAGEPOPUPVIEW = "DinnerMessagePopupView";
        /**
         * 宴会消息
         */
        POPUP.DINNERMSGPOPUPVIEW = "DinnerMsgPopupView";
        /**
         * 宴会分享
         */
        POPUP.DINNERSHAREPOPUPVIEW = "DinnerSharePopupView";
        /**
         * 皇宫历史
         */
        POPUP.PALACEHISTORYPOPUPVIEW = "PalaceHistoryPopupView";
        POPUP.PALACEEDITSIGNPOPUPVIEW = "PalaceEditSignPopupView";
        /**
         * 选服列表
         */
        POPUP.SERVERLISTPOPUPVIEW = "ServerListPopupView";
        POPUP.ACRANKLISTPOPUPVIEW = "AcRankListPopupView";
        POPUP.ACCROSSSERVERGEMWXPENDPOPUPVIEW = "AcCrossServerGemExpendPopupView";
        POPUP.ACTIGERTRAPPASSLISTPOPUPVIEW = "AcTigertrappassListPopupView";
        POPUP.ACHULAOLISTPOPUPVIEW = "AcHuLaoListPopupView";
        POPUP.ACHULAOGIFTLISTPOPUPVIEW = "AcHuLaoGiftListPopupView";
        /**
         * 成就详情列表
         */
        POPUP.ACHIEVEMENTDETAILPOPUPVIEW = "AchievementDetailPopupView";
        /**
         * 限时活动详情列表
         */
        POPUP.ACLIMITEDREWARDDETAILPOPUPVIEW = "AcLimitedRewardDetailPopupView";
        /**
         * 平成记忆任务窗口
         */
        POPUP.ACREIGNTITLETASKPOPUPVIEW = "AcReignTitleTaskPopupView";
        /**
         * 平成记忆弹出窗口
         */
        POPUP.ACREIGNTITLEREWARDPOPUPVIEW = "AcReignTitleRewardPopupView";
        /** 平成记忆奖励面板 */
        POPUP.AcREIGNTITLEGETREWARDPOPUPVIEW = "AcReignTitleGetRewardPopupView";
        /**
         * 设置页面
         */
        POPUP.SettingPopopView = "SettingPopopView";
        /**
         * 联系我们
         */
        POPUP.SETTINGCONTACTPOPUPVIEW = "SettingContactPopupView";
        /**
         * 兑换码
         */
        POPUP.SettingCDKPopupView = "SettingCDKPopupView";
        /**
         * 登录失败弹板
         */
        POPUP.ERRORPOPUPVIEW = "ErrorPopupView";
        POPUP.SERVANTBOOKLEVELUPPOPUPVIEW = "ServantBookLevelupPopupView";
        /**
         * 红颜赏赐
         */
        POPUP.WIFEGIVEPOPUPVIEW = "WifeGivePopupView";
        /**
         * 寻访运势
         */
        POPUP.SEARCHLUCKPOPUPVIEW = "SearchLuckPopupView";
        /**
         * 红颜技能
         */
        POPUP.WIFESKILLPOPUPVIEW = "WifeSkillPopupView";
        /**
         * 红颜皮肤
         */
        POPUP.WIFESKINVIEW = "WifeskinView";
        /**
         * 牢房犯人详情
         */
        POPUP.PRISONDETAILSPOPUPVIEW = "PrisonDetailsPopupView";
        /**
         * 囚犯主图
         */
        POPUP.PRISONPOPVIEW = "PrisonPopView";
        /**
         * 惩戒女囚买道具
         */
        POPUP.ACPUNISHBUYITEMPOPUPVIEW = "AcPunishBuyItemPopupView";
        /**
         * 惩戒女囚排名奖励
         */
        POPUP.ACPUNISHRANKREWARDPOPUPVIEW = "AcPunishRankRewardPopupView";
        POPUP.SERVANTADVANCEPOPUPVIEW = "ServantAdvancePopupView";
        /**
         * 惩戒女囚排行榜
         */
        POPUP.ACPUNISHRANKPOPUPVIEW = "AcPunishRankPopupView";
        /**
         * 惩戒女囚兑换奖励
         */
        POPUP.ACPUNISHEXPOPUPVIEW = "AcPunishExPopupView";
        POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW = "BookroomServantSelectPopupView";
        POPUP.BOOKROOMSTRENTHENPOPUPVIEW = "BookroomStrenthenPopupView";
        /**
         * 通用确认面板
         */
        POPUP.CONFIRMPOPUPVIEW = "ConfirmPopupView";
        /**
         * 通用文字展示面板
         */
        POPUP.COMMONTEXTPOPUPVIEW = "CommonTextPopupView";
        /**
         * 豪门特权
         */
        POPUP.WELFAREVIEWSPCARDDETAILPOPUP = "WelfareViewSpCardDetailPopup";
        /**
         * 下线面板
         */
        POPUP.OFFLINEVIEW = "OfflineView";
        /**
         * 合成道具详情界面
         */
        POPUP.COMPOSEPOPUPVIEW = "ComposePopupView";
        /**
         * 创建军团界面
         */
        POPUP.ALLIANCECREATEPOPUPVIEW = "AllianceCreatePopupView";
        POPUP.ALLIANCETASKBUFFLISTPOPUPVIEW = "AllianceTaskBuffListPopupView";
        POPUP.ALLIANCETASKRANKPOPUPVIEW = "AllianceTaskRankPopupView";
        POPUP.ALLIANCETASKOPENVIEW = "AllianceTaskOpenView";
        /**
         * 荷塘月色任务窗口
         */
        POPUP.ACMOONLIGHTTASKPOPUPVIEW = "AcMoonlightTaskPopupView";
        /**
         * 许愿天灯任务窗口
         */
        POPUP.ACLANTERNTASKPOPUPVIEW = "AcLanternTaskPopupView";
        /**
         * 许愿天灯写信
         */
        POPUP.ACLANTERNMAILPOPUPVIEW = "AcLanternMailPopupView";
        /**
        * 欢心夏日任务窗口
         */
        POPUP.ACSEASIDEGAMETASKPOPUPVIEW = "AcSeasideGameTaskPopupView";
        /**
         * 副本攻击奖励
         */
        POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW = "AllianceBossAttackedPopupView";
        /**
         * 擂台通用小弹版
         */
        POPUP.ATKRACEAGREEPOPUPVIEW = "AtkraceAgreePopupDialog";
        POPUP.ATKRACECROSSAGREEPOPUPDIALOG = "AtkracecrossAgreePopupDialog";
        /**
         * 擂台购买属性小弹版
         */
        POPUP.ATKRACEBUYPOPUPVIEW = "AtkraceBuyPopupView";
        POPUP.ATKRACECROSSBUYPOPUPVIEW = "AtkracecrossBuyPopupView";
        POPUP.STUDYATKFINDPOPUPVIEW = "StudyatkFindPopupView";
        POPUP.STUDYATKCREATEPOPUPVIEW = "StudyatkCreatePopupView";
        POPUP.STUDYATKALLCREATEPOPUPVIEW = "StudyatkAllCreatePopupView";
        POPUP.STUDYATKBOOKPOPUPVIEW = "StudyatkBookPopupView";
        POPUP.STUDYATKFAILEDPOPUPVIEW = "StudyatkFailedPopupView";
        /**
         * 擂台抽奖
         */
        POPUP.ATKRACEREWARDPOPUPVIEW = "AtkraceRewardPopupView";
        POPUP.ATKRACECROSSREWARDPOPUPVIEW = "AtkracecrossRewardPopupView";
        POPUP.ATKRACECROSSDETAILPOPUPVIEW = "AtkracecrossDetailPopupView";
        /**
         * 帮会榜单
         */
        POPUP.ALLIANCERANKPOPUPVIEW = "AllianceRankPopupView";
        POPUP.ALLIANCERANKPOPUPVIEW2 = "AllianceRankPopupView|1";
        /**
         * 帮会管理
         */
        POPUP.ALLIANCEMANAGEPOPUPVIEW = "AllianceManagePopupView";
        /**
         * 帮会申请
         */
        POPUP.ALLIANCEAPPLYPOPUPVIEW = "AllianceApplyPopupView";
        /**
         * 副本积分兑换
         */
        POPUP.DAILYBOSSSCROEPOPUPVIEW = "DailybossScroePopupView";
        /**
         * 副本排行榜
         */
        POPUP.DAILYBOSSRANKPOPUPVIEW = "DailybossRankPopupView";
        /**
         * 副本奖励
         */
        POPUP.DAILYBOSSATTACKEDPOPUPVIEW = "DailybossAttackedPopupView";
        /**
         * 副本伤害排行
         */
        POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW = "DailybossDamageRankPopupView";
        /**
         * 帮会成员
         */
        POPUP.ALLIANCEMEMBERPOPUPVIEW = "AllianceMemberPopupView";
        /**
         * 帮会查询
         */
        POPUP.ALLIANCEFINDPOPUPVIEW = "AllianceFindPopupView";
        /**
         * 帮会信息
         */
        POPUP.ALLIANCEINFOPOPUPVIEW = "AllianceInfoPopupView";
        /**
         * 设置职位
         */
        POPUP.ALLIANCESETPOPOPUPVIEW = "AllianceSetPoPopupView";
        /**
         * 其他帮会信息
         */
        POPUP.ALLIANCESHOWINFOPOPUPVIEW = "AllianceShowInfoPopupView";
        /**
         * 转移帮主
         */
        POPUP.ALLIANCETURNPOPUPVIEW = "AllianceTurnPopupView";
        /**
         * 帮会倒计时
         */
        POPUP.ALLIANCETIMEPOPUPVIEW = "AllianceTimePopupView";
        /**
         * 中午副本战斗结算界面
         */
        POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW = "DailybossType1BattleResultPopupView";
        /**
         * 副本排名奖励
         */
        POPUP.DAILYBOSSRANKREWARDPOPUPVIEW = "DailybossRankRewardPopupView";
        /**
         * 帮会密码
         */
        POPUP.ALLIANCEPSWDPOPUPVIEW = "AlliancePswdPopupView";
        /**
         * 帮会建设
         */
        POPUP.ALLIANCEBUILDPOPUPVIEW = "AllianceBuildPopupView";
        /**
         * 帮会兑换
         */
        POPUP.ALLIANCEEXPOPUPVIEW = "AllianceExPopupView";
        POPUP.ALLIANCEBOSSPOPUPVIEW = "AllianceBossPopupView";
        POPUP.ALLIANCEBOSSOPENPOPUPVIEW = "AllianceBossOpenPopupView";
        POPUP.ALLIANCEBOSSRANKOPUPVIEW = "AllianceBossRankPopupView";
        POPUP.ALLIANCEINFINITYOPENPOPUPVIEW = "AllianceInfinityOpenPopupView";
        /**
         * 抓住囚犯
         */
        POPUP.CATCHPRISONPUPUPVIEW = "CatchPrisonPopupView";
        /**
         * 副本 最后一击奖励
         */
        POPUP.DAILYBOSSLASTATTACKPOPUPVIEW = "DailybossLastAttackPopupView";
        /**
         * 网络报错界面
         */
        POPUP.NETERRORPOPUPVIEW = "NetErrorPopupView";
        /**
         * 强制升级界面
         */
        POPUP.WEIDUANUPGRADEPOPUPVIEW = "WeiduanUpgradePopupView";
        /**
         * 玩吧领奖
         */
        POPUP.GETGIFTPOPUPVIEW = "GetGiftPopupView";
        /**
         * 玩吧兑换奖
         */
        POPUP.BUYGIFTPOPUPVIEW = "BuyGiftPopupView";
        /**
         * 征伐排行
         */
        POPUP.CONQUESTRANKPOPUPVIEW = "ConquestRankPopupView";
        /**
         * 一键征伐
         */
        POPUP.CONQUESTBATCHPOPUPVIEW = "ConquestBatchPopupView";
        /**
         * 征伐胜利
         */
        POPUP.CONQUESTWINPOPUPVIEW = "ConquestWinPopupView";
        /**
         * 一键征伐奖励纪录
         */
        POPUP.CONQUESTINFOPOPUPVIEW = "ConquestInfoPopupView";
        /**
         * 一键贸易
         */
        POPUP.TRADEONEKEYPOPUPVIEW = "TradeOneKeyPopupView";
        /**
         * 领取糖果
         */
        POPUP.CANDYGETPOPUPVIEW = "CandyGetPopupView";
        /**
         * 关注界面
         */
        POPUP.ATTENTIONPOPUPVIEW = "AttentionPopupView";
        /**
         * 一键推关
         */
        POPUP.CHALLENGEAUTOPOPUPVIEW = "ChallengeAutoPopupView";
        /**
         * 一键推关奖励
         */
        POPUP.CHALLENGEAUTOREWARDSPOPUOVIEW = "ChallengeAutoRewardsPopupView";
        POPUP.ACTAILORREWARDPOPUPVIEW = "AcTailorRewardPopupView";
        /**
         * 至劲重置密码
         */
        POPUP.SETPASSWORDPOPUPVIEW = "SetPasswordPopupView";
        /**
         * 至劲重置密码
         */
        POPUP.DOWNLOADPACKAGEPOPUPVIEW = "DownloadPackagePopupView";
        /**
         * 下载微端
         */
        POPUP.DOWNLOADVIEW = "DownloadView";
        /**
         * 称帝详情
         */
        POPUP.PRESTIGEINFOPOPUPVIEW = "PrestigeInfoPopupView";
        /**
         * 声望日志
         */
        POPUP.PRESTIGELOFPOPUPVIEW = "PrestigeLogPopupView";
        /**
         * 特权详情
         */
        POPUP.PRESTIGEITEMPOPUPVIEW = "PrestigeItemPopupView";
        POPUP.PRACTICEABILITYDETAILSPOPUPVIEW = "PracticeAbilityDetailsPopupView";
        POPUP.PRACTICESTORAGEPOPIPVIEW = "PracticeStoragePopupView";
        POPUP.PRACTICEGETPOPUPVIEW = "PracticeGetPopupView";
        /**
         *  五一转盘排行榜
         */
        POPUP.ACTMAYDAYRANKPOPUPVIEW = "AcMayDayRankPopupView";
        /**
         * 转盘奖励物品
         */
        POPUP.ACMAYDAYREWARDPOPUPVIEW = "AcMayDayRewardPopupView";
        /**
         * 充值转盘，转盘奖励物品
         */
        POPUP.ACMAYDAYRECHARGEREWARDPOPUPVIEW = "AcMayDayRechargeRewardPopupView";
        /**
         * 福袋奖励物品
         */
        POPUP.ACLUCKBAGREWARDPOPUPVIEW = "AcLuckBagRewardPopupView";
        POPUP.ACLUCKBAGJUMPPOPUPVIEW = "AcLuckBagJumpPopupView";
        /**
         * 福袋宝箱奖励
         */
        POPUP.ACLUCKBAGBOXREWARDPOPUPVIEW = "AcLuckBagBoxRewardPopupView";
        /**
         * 众筹宝箱奖励
         */
        POPUP.ACLOTTERYBOXREWARDPOPUPVIEW = "AcLotteryBoxRewardPopupView";
        /**
         * 实名认证奖励面板
         */
        POPUP.REAlNAMEPOPUPVIEW = "RealnamePopupView";
        /**
         * 册封选择位分面板
         */
        POPUP.WIFESTATUSPOPUPVIEW = "WifestatusPopupView";
        /**
         * 册封红颜属性面板
         */
        POPUP.WIFESTATUSWIFEPOPUPVIEW = "WifestatusWifePopupView";
        /**
         *  跨服亲密奖励一览弹窗
         */
        POPUP.ACCROSSSERVERINTIMACYREWARDVIEW = "AcCrossServerIntimacyRewardView";
        POPUP.ACCROSSSERVERINTIMACYRANKLISTVIEW = "AcCrossServerIntimacyRankListView";
        POPUP.ACCROSSSERVERDETAILPOPUPVIEW = "AcCrossServerDetailPopupView";
        POPUP.WIFEORSERVANTINFOPOPUPVIEW = "WifeORServantInfoPopupView";
        POPUP.PRACTICEBATCHBUYPOPUPVIEW = "PracticeBatchBuyPopupView";
        POPUP.PRACTICEBUYPOPUPVIEW = "PracticeBuyPopupView";
        POPUP.PRACTICEEXPANDPOPUPVIEW = "PracticeExpandPopupView";
        /**
         * 八王争帝报名弹窗
        */
        POPUP.EMPERORWARSIGNPOPVIEW = "EmperorWarSignPopView";
        POPUP.EMPERORWARBMCEVIEW = "EmperorWarBmceView";
        POPUP.EMPERORWARREWARDVIEW = "EmperorWarRewardView";
        POPUP.EMPERORWARREPLAYPOPUPVIEW = "EmperorwarReplayPopupView";
        /**
         * 七夕灯会奖励
         */
        POPUP.ACDOUBLESEVENTHAWARDVIEW = "AcDoubleSeventhAwardView";
        /**
         * 小程序 首充界面
         */
        POPUP.FIRSTRECHARGEVIEW = "FirstRechargeView";
        POPUP.SECONDRECHARGEVIEW = "SecondRechargeView";
        POPUP.THREERECHARGEVIEW = "ThreeRechargeView";
        POPUP.FOURRECHARGEVIEW = "FourRechargeView";
        /**
         * 限时红颜
         */
        POPUP.TIMELIMITWIFEVIEW = "TimeLimitWifeView";
        /**
         * 限时红颜 越南fb
         */
        POPUP.TIMELIMITWIFEFBVIEW = "TimeLimitWifeFbView";
        /**
         * 限时礼包
         */
        POPUP.LIMITEDGIFTVIEW = "LimitedGiftView";
        /**
         * 中秋活动查看奖励
         */
        POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW = "AcMidAutumnRewardInfoPopupView";
        /**
         * 中秋活动查看奖励
         */
        POPUP.ACREDLOTUSWARRIORREWARDINFOPOPUPVIEW = "AcRedLotusWarriorRewardInfoPopupView";
        /**
         * 中秋活动详情
         */
        POPUP.ACMIDAUTUMNACINFOPOPUPVIEW = "AcMidAutumnAcInfoPopupView";
        /**
         * 秋日美食
         */
        POPUP.ACBUILDINGWORSHIPACINFOPOPUPVIEW = "AcBuildingWorshipAcInfoPopupView";
        /**
         * 荷塘月色详情
         */
        POPUP.ACMOONLIGHTACINFOPOPUPVIEW = "AcMoonlightAcInfoPopupView";
        /**
         * 洗澡场景弹出窗口
         */
        POPUP.ACWIFEBATHINGDETAILPOPUPVIEW = "AcWifeBathingDetailPopupView";
        /**
         * 洗澡场景弹出窗口
         */
        POPUP.ACTHXGIVINGDETAILPOPUPVIEW = "AcThxgivingDetailPopupView";
        /**
         * 洗澡场景弹出窗口
         */
        POPUP.ACLANTERNDETAILPOPUPVIEW = "AcLanternDetailPopupView";
        /**
         * 洗澡场景弹场景说明
         */
        POPUP.WIFEBATHSCENEDETAILPOPUPVIEW = "WifeBathSceneDetailPopupView";
        /**
         * 我要变强
         *
         */
        POPUP.STRENGTHENPOPUPVIEW = "StrengthenPopupView";
        /**
         * 帮会跨服战斗结果弹窗
         */
        POPUP.ALLIANCEWARRESULTVIEW = "AllianceWarResultView";
        POPUP.ALLIANCEWARDAMAGERANKVIEW = "AllianceWarDamageRankView";
        /**
         * 新七日签到
         */
        POPUP.SIGNUPVIEW = "SignUpView";
        /**
         * QQ会员礼包
         */
        POPUP.QQVIPGIFTPOPUPVIEW = "QQVipGiftPopupView";
        /**
         * 百服活动-储值宝箱物品展示
         */
        POPUP.ACRECHARGEBOXPOPUPVIEW = "AcRechargeBoxPopupView";
        /**
         * 特别宝箱 宝箱物品展示
         */
        POPUP.ACRECHARGEBOXSPPOPUPVIEW = "AcRechargeBoxSPPopupView";
        /**
         * 特别宝箱 宝箱物品展示
         */
        POPUP.ACRECHARGEBOXSPREWARDVIEW = "AcRechargeBoxSPRewardView";
        /** 		 * 端午排行榜 		 */
        POPUP.DRAGONBOATRANKVIEW = "AcDragonBoatDayRankView";
        /**
         *  跨服权势奖励一览弹窗
         */
        POPUP.ACCROSSSERVERPOWERREWARDVIEW = "AcCrossServerPowerRewardView";
        POPUP.ACCROSSSERVERPOWERRANKLISTVIEW = "AcCrossServerPowerRankListView";
        POPUP.ACCROSSPOWERDETAILPOPUPVIEW = "AcCrossPowerDetailPopupView";
        POPUP.ACCROSSSERVERWIFEBATTLEDETAILPOPUPVIEW = "AcCrossServerWifeBattleDetailPopupView";
        POPUP.ACCROSSSERVERWIFETALENTPLUSPOPUPVIEW = "AcCrossServerWifeTalentPlusPopupView";
        POPUP.WIFETALENTPLUSPOPUPVIEW = "WifeTalentPlusPopupView";
        POPUP.WIFEBATTLESTUDYPOPUPVIEW = "WifebattleStudyPopupView";
        /**
         * 门客（红颜）转换的界面
         */
        POPUP.COMMONCHANGEOTHERREWARD = "CommonChangeOtherReward";
        POPUP.MANAGETRADEPOPUPVIEW = "ManageTraderPopupView";
        // 查看中奖名单
        POPUP.ACLOTTERYPOPUPVIEW = "AcLotteryPopupView";
        POPUP.ACLOTTERYREWARDVIEW = "AcLotteryRewardView";
        POPUP.ACLOTTERYRANDBOXPOPUPVIEW = "AcLotteryRandBoxPopupView";
        /** 帮会战 -- 帮派阵容 */
        POPUP.ALLIANCEWARJOINBATTLEINFOPOPUPVIEW = "AllianceWarJoinBattleInfoPopupView";
        /** 帮会战 -- 门客选择界面 */
        POPUP.ALLIANCEWARSELECTSERVANTPOPUPVIEW = "AllianceWarSelectServantPopupView";
        /** 帮会战 -- 计策选择界面 */
        POPUP.ALLIANCEWARSELECTPLANPOPUPVIEW = "AllianceWarSelectPlanPopupView";
        /** 帮会战 -- 计策使用界面 */
        POPUP.ALLIANCEWARUSEPLANPOPUPVIEW = "AllianceWarUsePlanPopupView";
        /** 帮会战 -- 奖励领取界面 */
        POPUP.ALLIANCEWARREWARDPOPUPVIEW = "AllianceWarRewardPopupView";
        /**双11排行榜*/
        POPUP.ACSINGLEDAYRECHARGEPOPUPVIEW = "AcSingleDayRechargeRankPopupView";
        //双11皮肤，头像详情UI
        POPUP.ACSINGLEDAYSKINPROPERTYPOPUPVIEW = "AcSingleDaySkinPropertyPopupView";
        POPUP.ACSINGLEDAYBUYCONFIRMPOPUPVIEW = "AcSingleDayBuyConfirmPopupView";
        //好友相关
        POPUP.FRIENDSAPPLYPOPUPVIEW = "FriendApplyPopupView";
        POPUP.FRIENDSGIFTPOPUPVIEW = "FriendGiftPopupView";
        POPUP.ACSINGLEDAYGETREDPTPOPUPVIEW = "AcSingleDayGetRedptPopupView";
        POPUP.ADULTSEARCHVIEW = "AdultSearchView";
        /**
         *  翠玉生辉排行榜
         */
        POPUP.ACJADERANKLISTVIEW = "AcJadeRankListView";
        /**
         *  圣诞节活动
         */
        POPUP.ACCHRISTMASREWARDVIEW = "AcChristmasRewardView";
        /**
         * 实名认证，输入界面
         */
        POPUP.REALNAME3INPUTVIEW = "Realname3InputView";
        /**
         * 防沉迷
         */
        POPUP.ANTIADDICTIONPOPUPVIEW = "AntiaddictionPopupView";
        /**
         * 议事阁选择门课界面
         */
        POPUP.COUNCILSELECTSERVANTVIEW = "CouncilSelectServantView";
        /**
         * 议事阁奖励弹窗
         */
        POPUP.COUNCILREWARDPOPUPVIEW = "CouncilRewardPopupView";
        /**
         * 议事阁查看排行奖励
         */
        POPUP.COUNCILRANKLISTVIEW = "CouncilRankListView";
        POPUP.SERVANTINFOAMULETLVPOPUPVIEW = "ServantInfoAmuletLvPopupView";
        /**
         * 破冰
         */
        POPUP.ACICEBREAKINGGIFTRESULTVIEW = "AcIcebreakingGiftResultView";
        POPUP.TITLELEVELDETAILPOPUPVIEW = "TitleLevelDetailPopupView";
        POPUP.BETHEKINGVOTEPOPUPVIEW = "BetheKingVotePopupView";
        POPUP.BETHEKINGTASKPOPUPVIEW = "BetheKingTaskPopupView";
        POPUP.BETHEKINGEXPOPUPVIEW = "BetheKingExPopupView";
        POPUP.BETHEKINGGETKINGPOPUPVIEW = "BetheKingGetKingPopupView";
        //皮肤相关
        POPUP.ITEMPROPOPUPVIEW = "ItemProPopupView";
        POPUP.SKINRANKPOPUPVIEW = "SkinRankPopupView";
        POPUP.SKINLEVELDETAILPOPUPVIEW = "SkinLevelDetailPopupView";
        //服务器列表探班
        POPUP.SERVERSHOWPOPUPVIEW = "ServerShowPopupView";
        /**
         * 营救红颜
         */
        POPUP.ACRESCUEBUYITEMPOPUPVIEW = "AcRescueBuyItemPopupView";
        POPUP.ACRESCUEBUYITEMPOPUPVIEW_TAB1 = "AcRescueBuyItemPopupViewTab1|1";
        POPUP.ACRESCUEBUYITEMPOPUPVIEW_TAB2 = "AcRescueBuyItemPopupViewTab1|2";
        POPUP.ACRESCUEBUYITEMPOPUPVIEW_TAB3 = "AcRescueBuyItemPopupViewTab1|3";
        POPUP.ACRESCUERANKREWARDPOPUPVIEW = "AcRescueRankRewardPopupView";
        POPUP.ACRESCUERANKPOPUPVIEW = "AcRescueRankPopupView";
        POPUP.ACRESCUERANKPOPUPVIEW_TAB1 = "AcRescueRankPopupView|1";
        POPUP.ACRESCUERANKPOPUPVIEW_TAB2 = "AcRescueRankPopupView|2";
        POPUP.ACCROSSSERVANTPOWERRANKLISTPOPUPVIEW = "AcCrossServantPowerRankListPopupView";
        POPUP.ACCROSSSERVANTPOWERTASKPOPUPVIEW = "AcCrossServantPowerTaskPopupView";
        POPUP.QUESTIONNAIREPOPUPVIEW = "QuestionnairePopupView";
        /**
         * 围剿鳌拜活动商店
         */
        POPUP.ACWIPEBOSSSHOPVIEW = "AcWipeBossShopView";
        /**
         * 围剿鳌拜排行奖励
         */
        POPUP.ACWIPEBOSSREWARDVIEW = "AcWipeBossRewardView";
        /**
         * 围剿鳌拜榜单
         */
        POPUP.ACWIPEBOSSRANKIEW = "AcWipeBossRankView";
        POPUP.ACWIPEBOSSRANKIEWTAB2 = "AcWipeBossRankView|2";
        POPUP.ACWIPEBOSSALLIANCEINFOVIEW = "AcWipeBossAllianceInfoView";
        POPUP.ACWIPEBOSSKILLINFOIEW = "AcWipeBossKillInfoView";
        POPUP.ACWIPEBOSSGETREWARDVIEW = "AcWipeBossGetRewardView";
        POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW = "AcWipeBossAttackedPopupView";
        /**
         * 围剿鳌拜活动商店
         */
        POPUP.ACCROSSSERVERWIPEBOSSSHOPVIEW = "AcCrossServerWipeBossShopView";
        /**
         * 围剿鳌拜排行奖励
         */
        POPUP.ACCROSSSERVERWIPEBOSSREWARDVIEW = "AcCrossServerWipeBossRewardView";
        /**
         * 围剿鳌拜榜单
         */
        POPUP.ACCROSSSERVERWIPEBOSSRANKIEW = "AcCrossServerWipeBossRankView";
        POPUP.ACCROSSSERVERWIPEBOSSRANKIEWTAB2 = "AcCrossServerWipeBossRankView|1";
        POPUP.ACCROSSSERVERWIPEBOSSALLIANCEINFOVIEW = "AcCrossServerWipeBossAllianceInfoView";
        POPUP.ACCROSSSERVERWIPEBOSSKILLINFOIEW = "AcCrossServerWipeBossKillInfoView";
        POPUP.ACCROSSSERVERWIPEBOSSGETREWARDVIEW = "AcCrossServerWipeBossGetRewardView";
        POPUP.ACCROSSSERVERWIPEBOSSATTACKEDPOPUPVIEW = "AcCrossServerWipeBossAttackedPopupView";
        /**
         * 门客擂台排行榜奖励弹窗
         */
        POPUP.CROSSSERVERSERVANTRANKVIEW = "AcCrossServerServantRankListView";
        POPUP.ALLIANCETASKBATCHSENDPOPUPVIEW = "AllianceTaskBatchSendPopupView";
        POPUP.ALLIANCETASKBATCHRESULTPOPUPVIEW = "AllianceTaskBatchResultPopupView";
        /**绝地擂台来访消息 */
        POPUP.ACBATTLEGROUNDVISITVIEW = "AcBattileGroundVisitView";
        POPUP.ACBATTLEGROUNDALLIINFOVIEW = "AcBattleGroundAlliInfoView";
        POPUP.ACBATTLEGROUNDSELECTVIEW = "AcBattleGroundSelectView";
        POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG = "AcBattleGroundAgreePopupDialog";
        POPUP.ACBATTLEGROUNDBUYPOPUPVIEW = "AcBattleGroundBuyPopupView";
        POPUP.ACBATTLEGROUNDAUTOFIGHTVIEW = "AcBattleGroundAutoFightView";
        POPUP.ACFANLIREVIEWSTORYVIEW = "AcFanliReviewStoryView";
        POPUP.ACFANLIREVIEWPOPUPVIEW = "AcFanliReviewRewardPopupView";
        POPUP.ACFANLIREVIEGUIDSTORY = "AcFanliGuidStory";
        POPUP.ACFANLIREVIEWRECALLVIEW = "AcFanliRecallView";
        POPUP.ACFANLIREVIEWMAINVIEW = "AcFanliReviewMainView";
        POPUP.ACMOONLIGHTREWARDPOPUPVIEW = "AcMoonlightRewardPopupView";
        POPUP.ACSEASIDEGAMEREWARDPOPUPVIEW = "AcSeasideGameRewardPopupView";
        POPUP.ACLANTERNREWARDPOPUPVIEW = "AcLanternRewardPopupView";
        POPUP.ACWIFESKININHERITSTORYVIEW = "AcWifeSkinInheritStoryView";
        POPUP.ACWIFESKININHERITREWARDPOPUPVIEW = "AcWifeSkinInheritRewardPopupView";
        POPUP.ACWIFESKININHERITGUIDSTORY = "AcWifeSkinInheritGuidStory";
        POPUP.ACWIFESKININHERITRECALLVIEW = "AcWifeSkinInheritRecallView";
        POPUP.ACWIFESKININHERITMAINVIEW = "AcWifeSkinInheritMainView";
        POPUP.ACXINGCUNTASKPOPUPVIEW = "AcXingcunTaskPopupView";
        POPUP.ACRANKSACKTRAITORPOPUPVIEW = "AcRansackTraitorPopupView";
        POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW = "AcRansackTraitorExchangePopupView";
        POPUP.ACRANKSACKTRAITORGUIDSTORYVIEW = "AcFanliGuidStoryView";
        POPUP.ACRANKSACKTRAITORSTORYVIEW = "AcRansackTraitorStoryView";
        POPUP.ACRANSACKTRAITORGUIDSTORYVIEW = "AcRansackTraitorGuidStoryView";
        POPUP.ACRANSACKTRAITORSPPOPUPVIEW = "AcRansackTraitorSPPopupView";
        POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW = "AcRansackTraitorSPExchangePopupView";
        POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW = "AcRansackTraitorSPGuidStoryView";
        POPUP.ACRANSACKTRAITORSPSTORYVIEW = "AcRansackTraitorSPStoryView";
        POPUP.ACSTARGAZERPOPUPVIEW = "AcStargazerPopupView";
        POPUP.ACSTARGAZEREXCHANGEPOPUPVIEW = "AcStargazerExchangePopupView";
        POPUP.ACSTARGAZERGUIDSTORYVIEW = "AcStargazerGuidStoryView";
        POPUP.ACSTARGAZERSTORYVIEW = "AcStargazerStoryView";
        POPUP.ACSTARGAZERSINGLEPOPUPVIEW = "AcStargazerSinglePopupView";
        POPUP.ACSTARGAZERSINGLEEXCHANGEPOPUPVIEW = "AcStargazerSingleExchangePopupView";
        POPUP.ACSTARGAZERSINGLEGUIDSTORYVIEW = "AcStargazerSingleGuidStoryView";
        POPUP.ACSTARGAZERSINGLESTORYVIEW = "AcStargazerSingleStoryView";
        POPUP.ACMONOPOLYTASKPOPUPVIEW = "AcMonopolyTaskPopupView";
        POPUP.ACMONOPOLYREWARDPOPUPVIEW = "AcMonopolyRewardPopupView";
        POPUP.ACMONOPOLYTASKANDREWARDVIEW = "AcMonopolyTaskAndRewardView";
        //投壶活动
        /**投壶活动奖励玩法 */
        POPUP.ACTHROWARROWPOPUPVIEW = "AcThrowArrowPopupView";
        /**投壶活动送的奖励 */
        POPUP.ACTHROWARROWINFOREWARDPOPUPVIEW = "AcThrowArrowInfoRewardPopupView";
        /**投壶活动宝箱奖励 */
        POPUP.ACTHROWARROWACHIEVEMENTPOPUPVIEW = "AcThrowArrowAchievementPopupView";
        /**投壶活动获得奖励弹板 */
        POPUP.ACTHROWARROWGETREWARDPOPUPVIEW = "AcThrowArrowGetRewardPopupView";
        /**投壶活动获得一件投壶*/
        POPUP.ACTHROWARROWRESULTPOPUPVIEW = "AcThrowArrowResultPopupView";
        POPUP.NEWQUESTIONNAIREPOPUPVIEW = "NewQuestionnairePopupView";
        /**新官上任阶段奖励预览*/
        POPUP.LOGINWEEKBOXDETAILVIEW = "LoginWeekBoxDetailView";
        /** 麦田飘香*/
        POPUP.ACRYEHARVESTSKINPOPUPVIEW = "AcRyeHarvestSkinPopupView";
        POPUP.ACRYEHARVESTCARDPOOLVIEW = "AcRyeHarvestCardPoolView";
        POPUP.ACRYEHARVESTREWARDPOPUPVIEW = "AcRyeHarvestRewardPopupView";
        POPUP.ACRYEHARVESTBIGBOXPOPUPVIEW = "AcRyeHarvestBigBoxPopupView";
        POPUP.ACRYEHARVESTREWARDSHOWVIEW = "AcRyeHarvestRewardShowView";
        /** 麦田飘香--场景view */
        POPUP.ACRYEHARVESTSCENEREWARDPOPUPVIEW = "AcRyeHarvestSceneRewardPopupView";
        /** 麦田飘香--活动奖励 */
        POPUP.ACRYEHARVESTACTIVITYREWARDPOPUPVIEW = "AcRyeHarvestActivityRewardPopupView";
        /** 追缴敌寇*/
        POPUP.ACCHASEBANDITREWARDPOPUPVIEW = "AcChaseBanditRewardPopupView";
        POPUP.ACCHASEBANDITCHARGEPOPUPVIEW = "AcChaseBanditChargePopupView";
        //联姻到期返还道具弹窗
        POPUP.ADULTMARRYENDFAILRETURNPOPUPVIEW = "AdultMarryEndFailReturnPopupView";
        //新科举全屏活动排行榜
        POPUP.ACANSWERRANKPOPUPVIEW = "AcAnswerRankPopupView";
        //新科举全屏活动排行榜
        POPUP.ACANSWERRANKREWARDPOPUPVIEW = "AcAnswerRankRewardPopupView";
        //狂欢之夜任务
        POPUP.ACCARNIVALNIGHTTASKPOPUPVIEW = "AcCarnivalNightTaskPopupView";
        //狂欢之夜任务tab3
        POPUP.ACCARNIVALNIGHTTASKTAB3 = "AcCarnivalNightTaskPopupView|2";
        /**
         * 定军中原弹窗类
         */
        POPUP.ACCONQUERMAINLANDPRANKVIEW = "AcConquerMainLandPRankView";
        POPUP.ACCONQUERMAINLANDZRANKVIEW = "AcConquerMainLandZRankView";
        POPUP.ACCONQUERMAINLANDCITYINFOVIEW = "AcConquerMainLandCityInfoView";
        POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW = "AcConquerMainLandItemUsePopupView";
        POPUP.ACCONQUERMAINLANDWARRESULTVIEW = "AcConquerManLandWarResultView";
        /**
         * 五虎活动查看奖励
         */
        POPUP.ACFIVETIGERSREWARDINFOPOPUPVIEW = "AcFiveTigersRewardInfoPopupView";
        POPUP.ACFIVETIGERSREPORTVIEW = "AcFiveTigersReportView";
        /**合成官品不足界面 */
        POPUP.COMPOSENEEDLVUPVIEW = "ComposeNeedLvupView";
        /**合成官品不足新配置界面 */
        POPUP.COMPOSENEEDLVUPNEWVIEW = "ComposeNeedLvupNewView";
        /**合成银两不足界面 */
        POPUP.COMPOSENEEDGOLDPOPUPVIEW = "ComposeNeedGoldPopupView";
        /**玩家升级政绩不足提示 */
        POPUP.PLAYERUPLIMITPOPUPVIEW = "PlayerUpLimitPopupView";
        POPUP.SERVANTSKILLLEVELUPPOPUPVUEW = "ServantSkillLevelupPopupView";
        POPUP.SERVANTJIBANBUFFPOPUPVUEW = "ServantJibanBuffPopView";
        POPUP.SERVANTEQUIPLEVELUPOPVIEW = "ServantEquipLevelUpPopView";
        /**擂台-结算 */
        POPUP.ATKRACESETTLEPOPUPVIEW = "AtkraceSettlePopupView";
        POPUP.ACJARUKAICHARGEVIEW = "AcJarukaiChargeView";
        POPUP.ACJARUKAITASKVIEW = "AcJarukaiTaskView";
        POPUP.ACJARUKAIDETAILINFOVIEW = "AcJarukaiDetailInfoView";
    })(POPUP = ViewConst.POPUP || (ViewConst.POPUP = {}));
    /**
     * 直接继承BaseView的界面
     */
    var BASE;
    (function (BASE) {
        /**
         * 登陆界面
         **/
        BASE.LOGINVIEW = "LoginView";
        /**
         *  战斗结算 胜利
         */
        BASE.BATTLEWIN = "BattleWin";
        /**
         *  温馨提示 1，战斗失败， 2，没钱了
         */
        BASE.PROMPTVIEW = "PromptView";
        /**
         *  宠幸得到孩子
         */
        BASE.WIFEGETCHILDVIEW = "WifeGetChildView";
        /**
         *  宠幸红颜动画
         */
        BASE.WIFELOVEANIVIEW = "WifeLoveAniView";
        /**
         *  场景宠幸红颜动画
         */
        BASE.WIFEBATHSCENEVIEW = "WifeBathSceneView";
        /**
         * 获得红颜
         */
        BASE.WIFEGETVIEW = "WifeGetView";
        /**
         * 关卡剧情
         */
        BASE.CHALLENGESTORY = "ChallengeStory";
        /**
         * 新手引导
         */
        BASE.ROOKIEVIEW = "RookieView";
        /**
         * 获得门客
         */
        BASE.SERVANTGETVIEW = "ServantGetView";
        /**
         * 膜拜弹出UI
         */
        BASE.RANKWORSHIPVIEW = "RankWorshipView";
        /**
         *  孩子金榜题名界面
         */
        BASE.CHILDUPDVIEW = "ChildUpdView";
        /**
         *  结婚成功界面
         */
        BASE.ADULTMARRYSUCCESSVIEW = "AdultMarrySuccessView";
        /**
         *  结婚成功界面
         */
        BASE.ADULTVISITSUCCESSVIEW = "AdultReceiveSuccessView";
        /**
         *  宴会成功界面
         */
        BASE.DINNEROPENEDVIEW = "DinnerOpenedView";
        /**
         *  宴会结束界面
         */
        BASE.DINNERFINISHVIEW = "DinnerFinishView";
        /**
         *  前往宴会界面
         */
        BASE.GOTODINNEREDVIEW = "GotoDinnerView";
        /**
         *  惩戒女囚官报界面
         */
        BASE.ACPUNISHREPORTVIEW = "AcPunishReportView";
        BASE.ACRESCUEREPORTVIEW = "AcRescueReportView";
        /**
         * 门客升爵
         */
        BASE.SERVANTADVANCEVIEW = "ServantAdvanceView";
        BASE.STUDYATKSUCCESSVIEW = "StudyatkSuccessView";
        BASE.STUDYATKBOOLLVUPSUCCESSVIEW = "StudyAtkBookLvupSuccessView";
        BASE.WIFECALLBATCHSUCCESSVIEW = "WifeCallBatchSuccessView";
        BASE.STUDYATKBATTLERESULEVIEW = "StudyatkBattleResultView";
        /**
         * 加入帮会动画
         */
        BASE.ALLIANCECREATEANIVIEW = "AllianceCreateAniView";
        BASE.ITEMUSESUCCESSVIEW = "ItemUseSuccessView";
        /**
         *  韩国条款界面
         */
        BASE.KRAGREEMENTVIEW = "KRAgreementView";
        /**
         *  册封成功界面
         */
        BASE.WIFESTATUSSHOWVIEW = "WifestatusShowView";
        /**
         * 七夕活动
         */
        BASE.ACDOUBLESEVENTHAVGVIEW = "AcDoubleSeventhAVGView";
        /**
         * 剧情播放
         */
        BASE.ACSPRINGOUTINGAVGVIEW = "AcSpringOutingAVGView";
        BASE.ACWIFESKININHERITAVGVIEW = "AcWifeSkininheritAVGView";
        BASE.ACSEASIDEGAMEAVGVIEW = "AcSeasideGameAVGView";
        BASE.ACRECHARGEBOXSPAVGVIEW = "AcRechargeBoxSPAVGView";
        BASE.ACBUILDINGWORSHIPAVGVIEW = "AcBuildingWorshipAVGView";
        /**
         * 剧情播放
         */
        BASE.ACWIFEBATHINGAVGVIEW = "AcWifeBathingAVGView";
        //双11红包
        BASE.ACSINGLEDAYENVELOPEVIEW = "AcSingleDayEnvelopeView";
        BASE.ACSINGLEDAYROOKIEVIEW = "AcSingleDayRookieView";
        /** 筑阁祭天，官报界面 */
        BASE.ACBUILDINGWORSHIPREPORTVIEW = "AcBuildingWorshipReportView";
        /** 前天，官报界面 */
        BASE.ACREDLOTUSWARRIORREPORTVIEW = "AcRedLotusWarriorReportView";
        /** 合成小人解锁新等级弹板 */
        BASE.COMPOSELVUPVIEW = "ComposeLvupView";
    })(BASE = ViewConst.BASE || (ViewConst.BASE = {}));
    /**
     * 直接继承BaseBattleView的界面
     */
    var BATTLE;
    (function (BATTLE) {
        /**
         * 擂台战斗
         */
        BATTLE.ATKRACEBATTLEVIEW = "AtkraceBattleView";
        /**
         * 跨服擂台战斗
         */
        BATTLE.ATKRACECROSSBATTLEVIEW = "AtkracecrossBattleView";
        /**
         * 关卡boss
         */
        BATTLE.BOSSBATTLEVIEW = "BossBattleView";
        /**
         * 副本 战斗界面
         */
        BATTLE.DAILYBOSSBATTLEVIEW = "DailybossBattleView";
        /**
         * 军团副本 战斗界面
         */
        BATTLE.ALLIANCEBOSSBATTLEVIEW = "AllianceBossBattleView";
        /**
         * 战斗视图
         */
        BATTLE.BATTLEVIEW = "BattleView";
        /**
         * 关卡战斗视图
         */
        BATTLE.FIGHTVIEW = "FightView";
        /**
         * 关卡战斗视图
         */
        BATTLE.CONQUESTFIGHTVIEW = "ConquestFightView";
        /**
         * 称帝战斗视图
         */
        BATTLE.EMPERORWARBATTLEVIEW = "EmperorwarBattleView";
        /**
         * 绝地擂台战斗
         */
        BATTLE.ACBATTLEGROUNDFIGHTVIEW = "AcBattleGroundFightView";
        /**
         * 玩吧vip特权礼包
         */
        BATTLE.WANBAVIPTEQUANVIEW = "WanbaviptequanView";
    })(BATTLE = ViewConst.BATTLE || (ViewConst.BATTLE = {}));
    /**
     * 合成版界面
     */
    var COMPOSE;
    (function (COMPOSE) {
        /**  合成-征收-条目弹窗*/
        COMPOSE.LEVYSCROLLITEMDETAILPOPUPVIEW = "LevyScrollItemDetailPopupView";
        /**  合成-征收-家丁纳贡弹窗*/
        COMPOSE.LEVYSCROLLITEM1DETAILPOPUPVIEW = "LevyScrollItem1DetailPopupView";
        /** 合成-征收-选择门客弹窗*/
        COMPOSE.LEVYSELECTSERVANTPOPUPVIEW = "LevySelectServantPopupView";
        /** 合成-征收-离线收益*/
        COMPOSE.LEVYAUTORESPOPUPVIEW = "LevyAutoResPopupView";
    })(COMPOSE = ViewConst.COMPOSE || (ViewConst.COMPOSE = {}));
})(ViewConst || (ViewConst = {}));
