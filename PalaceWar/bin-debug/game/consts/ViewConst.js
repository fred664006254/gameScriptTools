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
        /** 用户信息界面 */
        COMMON.PLAYERVIEW = "PlayerView";
        /** 打开道具 */
        COMMON.ITEMVIEW_TAB1 = "ItemView";
        COMMON.ITEMVIEW_TAB2 = "ItemView|1";
        COMMON.ITEMVIEW_TAB3 = "ItemView|2";
        COMMON.ITEMVIEW_TAB4 = "ItemView|3";
        /**打开红颜已迎娶 */
        COMMON.WIFEVIEW_TAB1 = "WifeView|1";
        /**打开红颜未迎娶 */
        COMMON.WIFEVIEW_TAB2 = "WifeView|2";
        COMMON.WIFEUNLOCKVIEW = "WifeUnLockView";
        COMMON.WIFESTATUSVIEW = "WifestatusView";
        COMMON.WIFEALLTALENTVIEW = "WifeTalentView|2";
        COMMON.WIFETALENTVIEW3 = "WifeTalentView|3";
        COMMON.RANKACTIVEVIEW = "RankActiveView";
        /**
         * 称帝界面 纪录
         */
        // export const MONARCHRECORDdVIEW:string="MonarchRecordView";
        // /**
        //  * 称帝界面
        //  */
        // export const MONARCHVIEW:string="MonarchView";
        /** 管家 */
        COMMON.HOUSEKEEPERVIEW = "HousekeeperView";
        COMMON.HOUSEKEEPERSERVANTPOPUPVIEW = "HousekeeperServantPopupView";
        COMMON.HOUSEKEEPERLOADVIEW = "HousekeeperLoadView";
        COMMON.HOUSEKEEPERREPORTVIEW = "HousekeeperReportView";
        COMMON.PLAYPOINTSREWARDSPOPUPVIEW = "PlayPointsRewardsPopupView";
        /**
         * 经营界面
         */
        COMMON.MANAGEVIEW = "ManageView";
        /**
         * 关卡界面
         */
        COMMON.CHALLENGEVIEW = "ChallengeView";
        //门客
        COMMON.SERVANTVIEW = "ServantView";
        COMMON.SERVANTINFOVIEW = "ServantNewUIView";
        COMMON.SERVANTINFOVIEW_TAB2 = "ServantNewUIView|2";
        COMMON.SERVANTSKINCHANGEVIEW = "ServantSkinChangeView";
        //升官
        COMMON.PROMOTIONVIEW = "PromotionView";
        /**升官成功 */
        COMMON.PROMOTIONSUCCESSVIEW = "PromotionSuccessView";
        //政务
        COMMON.AFFAIRVIEW = "AffairView";
        //红颜操作
        COMMON.WIFEOPTVIEW = "WifeOptView";
        /*
        神器
        */
        COMMON.SERVANTNEWUIVIEW = "ServantNewUIView";
        /**
         * 子嗣
         */
        COMMON.CHILDVIEW = "ChildView";
        /**
         * 创建角色
         */
        COMMON.CHOOSEROLEVIEW = "ChooseroleView";
        /**
         * 排行
         */
        COMMON.RANKVIEW = "RankView";
        COMMON.RANKCROSSVIEW = "RankCrossView";
        COMMON.RANKSINGLEVIEW = "RankSingleView";
        COMMON.RANKBIOGRAPHYVIEW = "RankBiographyView";
        COMMON.BIOGRAPHYSHOWVIEW = "BiographyShowView";
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
        COMMON.SHOPVIEW_TAB3 = "ShopView|1";
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
         * 福利界面--2倍返利
         */
        COMMON.WELFAREVIEWREBATE2 = "WelfareView|Rebate2";
        /**
         * 福利界面--好友邀请
         */
        COMMON.WELFAREVIEWNEWINVITE = "WelfareView|NewInvite";
        /**
         * 福利界面--召回玩家
         */
        COMMON.WELFAREVIEWPLAYERCOMEBACK = "WelfareView|PlayerComeBack";
        /**
         *
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
         * 充值＋特权
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
         * 管家
         */
        COMMON.WELFAREVIEWHOUSEKEEPER = "WelfareView|Housekeeper";
        COMMON.WELFAREVIEWGROWGOLD = "WelfareView|GrowGold";
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
         *首冲4倍（泰国）
         */
        COMMON.FIRSTCHARGEMULTIPLEVIEW = "FirstchargeMultipleView";
        /**
         * 牢房
         */
        COMMON.PRISONVIEW = "PrisonView";
        /**
         * 帮会充值
         */
        COMMON.ACALLIANCERECHARFWCOUNTVIEW = "AcAllianceRechargeCountView";
        /**
         * 帮会累计充值
         */
        COMMON.ACALLIANCERECHARFWCOUNTTOTALVIEW = "AcAllianceRechargeTotalView";
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
        /**
        * 春节七天乐
        */
        COMMON.ACNEWYEARSEVENDAYSVIEW = "AcNewYearSevenDaysView";
        COMMON.ACNEWYEARSEVENDAYSVIEWTAB1 = "AcNewYearSevenDaysView|1";
        COMMON.ACNEWYEARSEVENDAYSVIEWTAB2 = "AcNewYearSevenDaysView|2";
        /**
        * 每日礼包
        */
        COMMON.ACNEWYEARDAILYPACKAGEVIEW = "AcNewYearDailyPackageView";
        COMMON.ACNEWYEARDAILYPACKAGEVIEW_TAB1 = "AcNewYearDailyPackageView|1";
        COMMON.ACNEWYEARDAILYPACKAGEVIEW_TAB2 = "AcNewYearDailyPackageView|2";
        COMMON.ACNEWYEARSIGNUPVIEW = "AcNewYearSignUpView";
        COMMON.ACSMASHEGGVIEW = "AcSmashEggView";
        COMMON.ACCOSTGEMRANKVIEW = "AcCostGemRankView";
        COMMON.ACNEWYEARREDVIEW = "AcNewYearRedView";
        COMMON.ACNEWYEARREDRECHARGEVIEW = "AcNewYearRedRechargeView";
        COMMON.ACRECHARGEBOXSPVIEW = "AcRechargeBoxSPView";
        // export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
        COMMON.ACBLESSINGOFMAMMONVIEW = "AcBlessingOfMammonView";
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
        COMMON.NEWATKRACECROSSVISITVIEW = "NewAtkraceCrossVisitView";
        /**
         *  擂台/排行榜
         */
        COMMON.ATKRACERANKLISTVIEW = "AtkraceRankListView";
        /**
         *  擂台/门客名望
         */
        COMMON.ATKRACEFAMEVIEW = "AtkraceFameView";
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
        COMMON.ATKRACECROSSFENGYUNRANKLISTVIEW = "AtkraceCrossFengyunRankListView";
        /**
         * 	群雄跨服擂台
         */
        COMMON.NEWATKRACECROSSVIEW = "NewAtkracecrossView";
        COMMON.NEWATKRACECROSSCHALLENGEVIEW = "NewAtkraceCrossChallengeView";
        COMMON.NEWATKRACECROSSRANKLISTVIEW = "NewAtkraceCrossRankListView";
        COMMON.NEWATKRACECROSSARRESTVIEW = "NewAtkracecrossArrestView";
        COMMON.NEWATKRACECROSSACTIVITYREWARDVIEW = "NewAtkracecrossActivityRewardView";
        COMMON.ATKRACECROSSNEWDISPACHVIEW = "AtkracecrossnewDispachView";
        COMMON.NEWATKRACECROSSBUFFVIEW = "NewAtkracecrossBuffListView";
        COMMON.NEWATKRACECROSSBUFFDETAILVIEW = "NewAtkracecrossBuffDetailView";
        COMMON.NEWATKRACECROSSFAMEBATTLEVIEW = "NewAtkraceCrossFameBattleView";
        COMMON.NEWATKRACECROSSFAMEBATTLERESULTVIEW = "NewAtkraceCrossFameBattleResultView";
        /**
         * 贸易战斗
         */
        COMMON.TRADEFIGHTVIEW = "TradeFightView";
        /**
         * 贸易胜利
         */
        COMMON.TRADEINFOPOPUPVIEW = "TradeInfoPopupView";
        COMMON.BUYMONTHCARDPOPUPVIEW = "BuyMonthCardPopupView";
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
        COMMON.PALACEHOUSEGROUPVIEW = "PalaceHouseGroupView";
        COMMON.PALACEKINGSHOUSEGROUPVIEW = "PalaceKingsHouseView";
        /**新皇宫界面 */
        COMMON.PALACENEWVIEW = "PalaceNewView";
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
        COMMON.EMPERORWARVSVIEW = "EmperorWarVsView";
        COMMON.EMPERORWARENDSHOWVIEW = "EmperorWarEndShowView";
        /**
         * 分封
        */
        COMMON.PROMOTEVIEW = "PromoteView";
        /**
         *  端午活动
         */
        COMMON.ACDGRAGONBOATDAYVIEW = "AcDragonBoatDayView";
        /**
         * 好友系统
         */
        COMMON.FRIENDVIEW = "FriendView";
        /*
        *跨服权势活动主界面
        */
        COMMON.ACCROSSSERVERCROSSENTERVIEW = "AcCrossServerPowerEnterView";
        /**
         *  美女冲榜活动
         */
        COMMON.ACDRAFTVIEW = "AcDraftView";
        COMMON.ACDRAFTVOTEVIEW = "AcDraftVoteView";
        //好友
        COMMON.FRIENDSVIEW = "FriendView";
        //好友
        COMMON.QQVIDEOGUIDEVIEW = "QqvideoguideView";
        COMMON.FQSTRATEGYVIEW = "FqStrategyView";
        COMMON.FQSTRATEGYVIEWTAB3 = "FqStrategyView|2";
        COMMON.COUNCILEVENTVIEW = "CouncilEventView";
        COMMON.TITLELEVELUPVIEW = "TitleLevelUpView";
        //皮肤
        COMMON.SKINVIEW = "SkinView";
        COMMON.SKINDETAILVIEW = "SkinDetailView";
        COMMON.SKINLEVELUPVIEW = "SkinLevelupView";
        //玩家回归
        COMMON.PLAYERRETURNVIEW = "PlayerReturnView";
        //围剿鳌拜
        COMMON.ACWIPEBOSSENTERVIEW = "AcWipeBossEnterView";
        COMMON.ACWIPEBOSSSEARCHRESULTVIEW = "AcWipeBossSearchResultView";
        COMMON.ACWIPEBOSSBATTLEVIEW = "AcWipeBossBattleView";
        //帮会战首页
        COMMON.ALLIANCEWARVIEW = "AllianceWarView";
        COMMON.ALLIANCEWARVSVIEW = "AllianceWarVsView";
        COMMON.ALLIANCEWARSHOWANTIVIEW = "AllianceWarShowAntiView";
        //勤王除恶
        /**勤王除恶主界面 */
        COMMON.ALLIANCEWEEKENDVIEW = "AllianceWeekEndView";
        // 场景更换
        COMMON.CHANGEBGVIEW = "ChangebgView";
        //查看双十一代金券
        COMMON.ACSINGLEDAYCOUPONVIEW = "AcSingleDayCouponView";
        //仙人馈赠楼层
        COMMON.ACSINGLEDAYBUILD1VIEW = "AcSingleDayBuild1View";
        COMMON.ACSINGLEDAYSKINVIEW = "AcSingleDaySkinView";
        COMMON.ACSINGLEDAYBUILD3VIEW = "AcSingleDayBuild3View";
        //门客战
        COMMON.COUNTRYWARENTERVIEW = 'CountryWarEnterView';
        COMMON.COUNTRYWARVIEW = 'CountryWarView';
        COMMON.COUNTRYWARVSVIEW = 'CountryWarVsView';
        COMMON.COUNTRYWARSHOWVIEW = 'CountryWarShowView';
        /**
         * 副本 界面
         */
        COMMON.DAILYBOSSDETILVIEW = "DailybossDetailView";
        COMMON.DAILYBOSSNEWVIEW = "DailybossnewView";
        COMMON.DAILYBOSSVIEW = "DailybossView";
        /**
         * 圣诞任务view
         */
        COMMON.ACCHRISTMASTASKVIEW = "AcChristmasTaskView";
        /**
         * 元旦剧情战斗界面
         */
        COMMON.ACTREASUREHUNTFIGHTVIEW = "AcTreasureHuntFightView";
        /**
         * 京城夜赏 战斗界面
         */
        COMMON.ACENJOYNIGHTFIGHTVIEW = "AcEnjoyNightFightView";
        COMMON.ACENJOYNIGHTGAMEVIEW = "AcEnjoyNightGameView";
        COMMON.ACENJOYNIGHTITEMVIEW = "AcEnjoyNightItemView";
        COMMON.ACAC2020GAMEVIEW = "AcAC2020GameView";
        COMMON.ACAC2020DRINKVIEW = "AcAC2020DrinkView";
        /**
         * 奖励界面
         */
        COMMON.ACTREASUREREWARDVIEW = "AcTreasureRewardView";
        /**
         * 奖励界面1
         */
        COMMON.ACTREASUREREWARDVIEW_TAB1 = "AcTreasureRewardView|1";
        /**
         * 奖励界面2
         */
        COMMON.ACTREASUREREWARDVIEW_TAB2 = "AcTreasureRewardView|2";
        /**除夕动画 */
        COMMON.ACNEWYEARSIGNUPSHARKVIEW = "AcNewYearSignUpSharkView";
        /**帮会争顶 */
        COMMON.ACBATTLEGROUNDMAPVIEW = "AcBattleGroundMapView";
        COMMON.ACBATTLEGROUNDARRESTVIEW = "AcBattleGroundArrestView";
        /**绝地擂台详情 */
        COMMON.ACBATTLEDETAILSVIEW = "AcBattleDetailsView";
        COMMON.ACBATTLEHISTORYRANKVIEW = "AcBattleHistoryRankVIew";
        COMMON.ACBATTLEGROUNDCHEERVIEW = "AcBattleGroundCheerView";
        /**风华群芳 */
        COMMON.ACGROUPWIFEBATTLEMAPVIEW = "AcGroupWifeBattleMapView";
        COMMON.ACGROUPWIFEBATTLEDETAILSVIEW = "AcGroupWifeBattleDetailsView";
        COMMON.ACGROUPWIFEBATTLEHISTORYRANKVIEW = "AcGroupWifeBattleHistoryRankView";
        COMMON.ACGROUPWIFEBATTLEGUESSVIEW = "AcGroupWifeBattleGuessView";
        /**锦鲤奖励 */
        COMMON.ACLUCKYCARPREWARDVIEW = "AcLuckyCarpRewardView";
        /**彩蛋奖励 */
        COMMON.ACWEALTHCARPREWARDVIEW = "AcWealthCarpRewardView";
        /**七日好礼 */
        COMMON.SEVENDAYSSIGNUPVIEW = "SevenDaysSignUpView";
        /**七日好礼--英文-前佳人展示面板 */
        COMMON.SEVENDAYSSIGNUPFIRSHOWVIEW = "SevenDaysSignUpFirShowView";
        /**七日好礼--英文-后佳人展示面板 */
        COMMON.SEVENDAYSSIGNUPLASSHOWVIEW = "SevenDaysSignUpLasShowView";
        /**幸运翻牌*/
        COMMON.ACLUCKYDRAWCHARGEVIEW = "AcLuckyDrawChargeView";
        /**东海皇陵*/
        COMMON.ACTOMBSEAVIEW = "AcTombSeaView";
        COMMON.ACTOMBSEARCHRESULTVIEW = "AcTombSearchResultView";
        COMMON.ACTOMBBATTLEVIEW = "AcTombBattleView";
        COMMON.ACLOCTOMBSEAVIEW = "AcLocTombSeaView";
        COMMON.ACLOCTOMBSEARCHRESULTVIEW = "AcLocTombSearchResultView";
        COMMON.ACLOCTOMBBATTLEVIEW = "AcLocTombBattleView";
        /**仕途回忆*/
        COMMON.OFFICIALCAREERVIEW = "OfficialcareerView";
        /**剧情回忆*/
        COMMON.STORYRECALLVIEW = "StoryrecallView";
        /**剧情关卡*/
        COMMON.STORYCHALLENGEVIEW = "StorychallengeView";
        /**母亲节活动**/
        COMMON.ACMOTHERDAYCHARGEVIEW = "AcMotherDayChargeView";
        /**
         * 京城夜览
         */
        COMMON.ACENJOYNIGHTREWARDVIEW = "AcEnjoyNightRewardView";
        COMMON.ACANNUALCELEBRATION2020REWARDVIEW = "AcAnnualCelebration2020RewardView";
        /**
         * 励精图治
         */
        COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW = "AcBattlePassUnlockRewardView";
        COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW = "AcBattlePassUnlockNewRewardView";
        /**
         * 定军中原
        */
        COMMON.ACCONQUERMAINLANDWARVIEW = "AcConquerMainLandWarView";
        COMMON.ACCONQUERMAINLANDSENDFIGHTVIEW = "AcConquerMainLandSendFightView";
        COMMON.ACCONQUERMAINLANDDETAILVIEW = "AcConquerMainLandDetailView";
        COMMON.ACCONQUERMAINLANDDETAILRANKVIEW = "AcConquerMainLandDetailView|2";
        COMMON.ACCONQUERMAINLANDDETAILARMYVIEW = "AcConquerMainLandDetailView|3";
        COMMON.ACCONQUERMAINLANDDETAILTASKVIEW = "AcConquerMainLandDetailView|4";
        COMMON.ACCONQUERMAINLANDWARSHOWVIEW = "AcConquerMainLandWarShowView";
        //电玩大本营
        /**电玩大本营--任务 */
        COMMON.ACARCADETASKVIEW = "AcArcadeTaskView";
        /**电玩大本营--充值 */
        COMMON.ACARCADERECHARGEVIEW = "AcArcadeRechargeView";
        /**电玩大本营--兑换 */
        COMMON.ACARCADECLAIMVIEW = "AcArcadeClaimView";
        /**电玩大本营--游戏 */
        COMMON.ACARCADEGAMEVIEW = "AcArcadeGameView";
        COMMON.TITLEUPGRADELLEVELUPVIEW = "TitleUpgradeLevelUpView";
        /*红颜皮肤升级*/
        COMMON.WIFESKINLEVELUPVIEW = "WifeskinLevelUpView";
        /*红颜皮肤剧情*/
        COMMON.WIFECHATAVGVIEW = "WifeChatAvgView";
        /*科举答题*/
        COMMON.EXAMVIEW = "ExamView";
        /*结识佳人*/
        COMMON.MEETBEAUTYVIEW = "MeetBeautyView";
        /*聊天表情*/
        COMMON.EMOTICONVIEW = "EmoticonView";
        /**收藏游戏、官路巅峰引导 */
        COMMON.BUREAUCRATGUIDE = "BureaucratGuideView";
        //红颜对战 搜索结果
        COMMON.WIFEBATTLESEARCHRESULTVIEW = "WifebattleSearchResultView";
        ////红颜对战  对战结果
        COMMON.WIFEBATTLERESULTVIEW = "WifebattleResultView";
        ////红颜对战  对战
        COMMON.WIFEBATTLEBATTLEVIEW = "WifebattleBattleView";
        ////红颜对战 
        COMMON.WIFEBATTLEVIEW = "WifebattleView";
        //红颜对战 搜索结果
        COMMON.ACCROSSSERVERWIFEBATTLESEARCHRESULTVIEW = "AcCrossServerWifeBattleSearchResultView";
        ////红颜对战  对战结果
        COMMON.ACCROSSSERVERWIFEBATTLERESULTVIEW = "AcCrossServerWifeBattleResultView";
        ////红颜对战  对战
        COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW = "AcCrossServerWifeBattleBattleView";
        ////红颜对战  对战
        COMMON.ACCROSSSERVERWIFEBATTLEVIEW = "AcCrossServerWifeBattleView";
        //风华群芳--对战搜索结果
        COMMON.ACGROUPWIFEBATTLESEARCHRESULTVIEW = "AcGroupWifeBattleSearchResultView";
        /**珍器坊*/
        // 场景更换
        COMMON.ZHENQIFANGVIEW = "ZhenqifangView";
        COMMON.ZHENQIFANGSHOPVIEW = "ZhenqifangShopView";
        /**国庆节活动 */
        //国庆节任务
        COMMON.ACNATIONALDAYTASKVIEW = "AcNationalDayTaskView";
        //国庆节充值
        COMMON.ACNATIONALDAYTRECHARGEVIEW = "AcNationalDayRechargeView";
        //国庆节衣装奖励
        COMMON.ACNATIONALDAYCLOTHERVIEW = "AcNationalDayClothesView";
        //转生界面
        COMMON.WIFECHANGESEXVIEW = "WifeChangeSexView";
        COMMON.WIFECHANGESEXSUCCESSVIEW = "WifeChangeSexSuccessView";
        //天梯
        COMMON.LADDERLOGVIEW = "LadderLogView";
        COMMON.LADDERRANKVIEW = "LadderRankView";
        COMMON.LADDERREWARDVIEW = "LadderRankView|3";
        COMMON.LADDERGOODSVIEW = "LadderTaskView";
        COMMON.LADDEROPPONENTVIEW = "LadderOpponentView";
        COMMON.LADDEROPPONENAPPEARTVIEW = "LadderOpponentAppearView";
        COMMON.LADDERFORMTIONVIEW = "LadderFormationView";
        COMMON.LADDERBATTLEVIEW = "LadderBattleView";
        COMMON.LADDERBATTLRESULTEVIEW = "LadderBattleResultView";
        COMMON.ACCROSSSERVERWIFEALLTALENTVIEW = "AcCrossServerWifeTalentView";
        /**
         * 圣诞奖励
         */
        COMMON.ACCHRISTMASNEWREWARDVIEW = "AcChristmasNewRewardView";
        //帝王成就
        COMMON.EMPERORACHIEVEVIEW = "EmperorAchieveView";
        //明君出巡
        COMMON.EMPEROROUTVIEW = "EmperorOutView";
        COMMON.EMPEROROUTFIRSTANIVIEW = "EmperorOutFirstAniView";
        //套环姻缘奖励弹窗
        COMMON.ACTRAVELWITHBEAUTYPLAYREWARDVIEW = "AcTravelWithBeautyPlayRewardView";
        //三国争霸
        COMMON.ACTHREEKINGDOMSMAPVIEW = "AcThreeKingdomsMapView";
        COMMON.ACTHREEKINGDOMSBATTLEVIEW = "AcThreeKingdomsBattleView";
        COMMON.ACTHREEKINGDOMSRANKVIEW = "AcThreeKingdomsRankView";
        COMMON.ACTHREEKINGDOMSRANKVIEW4 = "AcThreeKingdomsRankView|4";
        COMMON.ACTHREEKINGDOMSREWARDVIEW = "AcThreeKingdomsRewardView";
        COMMON.ACTHREEKINGDOMSREWARDVIEW2 = "AcThreeKingdomsRewardView|2";
        COMMON.ACTHREEKINGDOMSREWARDVIEW3 = "AcThreeKingdomsRewardView|3";
        COMMON.ACTHREEKINGDOMSREWARDVIEW4 = "AcThreeKingdomsRewardView|4";
        COMMON.ACTHREEKINGDOMSMEETINGVIEW = "AcThreeKingdomsMeetingView";
        COMMON.ACTHREEKINGDOMSLIMITCHARGEVIEW = "AcThreeKingdomsLimitChargeView";
        COMMON.ACTHREEKINGDOMSLASTROUNDPRANKVIEW = "AcThreeKingdomsLastRoundPRankView";
        COMMON.ACTHREEKINGDOMSLASTROUNDZRANKVIEW = "AcThreeKingdomsLastRoundZRankView";
        COMMON.ACTHREEKINGDOMSCITYWARPRANKVIEW = "AcThreeKingdomsCityWarPrankView";
        COMMON.ACTHREEKINGDOMSCITYWARREWARDVIEW = "AcThreeKingdomsCityWarRewardView";
        COMMON.ACTHREEKINGDOMSWARRESULTVIEW = "AcThreeKingdomsWarResultView";
        COMMON.ACCROSSSERVERPOWERCHEERVIEW = "AcCrossServerPowerCheerView";
        COMMON.ACCROSSSERVERPOWERCHEERVIEW2 = "AcCrossServerPowerCheerView|2";
        COMMON.ACCROSSSERVERINTIMACYCHEERVIEW = "AcCrossServerIntimacyCheerView";
        COMMON.ACCROSSSERVERINITMACYCHEERVIEW2 = "AcCrossServerIntimacyCheerView|2";
        COMMON.ACCROSSATKRACECHEERVIEW = "AcCrossAtkraceCheerView";
        COMMON.ACCROSSATKRACECHEERVIEWTAB2 = "AcCrossAtkraceCheerView|2";
        /** 端午节活动【粽夏连连看】*/
        COMMON.ACFINDSAMEVIEW = "AcFindSameView";
        COMMON.ACFINDSAMEGAMEVIEW = "AcFindSameGameView";
        /** 【英文】骑士对决】*/
        COMMON.ACKNIGHT = "AcKnightView";
        /**皇城六部 */
        COMMON.SIXSECTIONVIEW = "SixSectionView";
        COMMON.SIXSECTION1VIEW = "SixSection1View"; //兵部
        COMMON.SIXSECTION1LOOKENEMYVIEW = "SixSection1LookEnemyView"; //侦查
        COMMON.SIXSECTION1HOLDRESULTVIEW = "SixSection1HoldResultView"; //据点结算
        COMMON.SIXSECTION1SEATBATTLEVIEW = "SixSection1SeatBattleView";
        COMMON.SIXSECTION1SEATBATTLERESULTVIEW = "SixSection1SeatBattleResultView";
        COMMON.SIXSECTION1TITLEBATTLEVIEW = "SixSection1TitleBattleView";
        COMMON.SIXSECTION1TITLEBATTLERESULTVIEW = "SixSection1TitleBattleResultView";
        COMMON.SIXSECTION1RECHARGEVIEW = "SixSection1RechargeView";
        COMMON.SIXSECTION1BATTLEFORMATIONVIEW = "SixSection1BattleFormationView"; //门客阵容
        COMMON.SIXSECTION1BATTLEADDVIEW = "SixSection1BattleAddView"; //门客加成
        COMMON.SIXSECTION1TITLEPRACTICEBATTLEVIEW = "SixSection1TitlePracticeBattleView"; //修身战斗
        /**夜观天象 */
        COMMON.ACNIGHTSKYSTORYVIEW = "AcNightSkyStoryView";
        /**闲置兑换 */
        COMMON.ACACTIVITYEXCHANGEVIEW = "AcActivityExchangeView";
        /**功能解锁特效 */
        COMMON.UNLOCKFUNCTIONVIEW = "UnlockFunctionView";
        /**天魔铠甲 */
        COMMON.ACSKYARMORSTORYVIEW = "AcSkyArmorStoryView";
        /**跨服门客冲榜 */
        COMMON.ACCROSSONESERVERVIEW = "AcCrossOneServerView";
        /**限时福利 */
        COMMON.ACLIMITGIFTVIEW = "AcLimitGiftView";
        /**新服预约 */
        COMMON.ACNEWAPPOINTPREVIEWVIEW = "AcNewappointPreviewView";
    })(COMMON = ViewConst.COMMON || (ViewConst.COMMON = {}));
    /**
     * 小弹窗，继承popupview的界面
     */
    var POPUP;
    (function (POPUP) {
        /**
         * 迁服
         */
        POPUP.QINAFUPOPUPVIEW = "QinafuPopupView";
        /**衣装预览 */
        POPUP.CLOSHESPREVIEWWIFEINFOPOPUPVIEW = "ChoshespreviewWifeInfoPopupView";
        POPUP.CLOSHESPREVIEWSKINPOPUPVIEW = "CloshespreviewSkinPopupView";
        POPUP.CLOSHESPREVIEWSEVRVANTSKINPOPUPVIEW = "CloshespreviewSevrvantSkinPopupView";
        /**分享界面 */
        POPUP.SHARECOMMONPOPUPVIEW = "ShareCommonPopupView";
        /**
         * 奖励的详情列表
         */
        POPUP.MAILREWARDDETAILPOPUPVIEW = "MailRewardDetailPopupView";
        /** 皮肤开启光环icon详情面板 */
        POPUP.SKINAURAINFOPOPUPVIEW = "SkinAuraInfoPopupView";
        /** 分享奖励面板 */
        POPUP.SHAREPOPUPVIEW = "SharePopupView";
        /** 公共奖励面板 */
        POPUP.COMMONREWARDPOPUPVIEW = "CommonRewardPopupView";
        /** 道具、物品详情弹板 */
        POPUP.ITEMINFOPOPUPVIEW = "ItemInfoPopupView";
        /** 道具详情列表 */
        POPUP.ITEMINFOEXTENDPOPUPVIEW = "ItemInfoExtendPopupView";
        /** 使用道具弹板 */
        POPUP.ITEMUSEPOPUPVIEW = "ItemUsePopupView";
        POPUP.ITEMHECHENGPOPUPVIEW = "ItemHechengPopupView";
        /** 道具跳转弹板 */
        POPUP.ITEMJUMPPOPUPVIEW = "ItemJumpPopupView";
        /**错误弹板 *
        export const ERRORPOPUPVIEW:string = "ErrorPopupView";
        /**规则说明弹板 */
        POPUP.RULEINFOPOPUPVIEW = "RuleInfoPopupView";
        POPUP.PROBABLYINFOPOPUPVIEW = "ProbablyInfoPopupView";
        //门客详情
        POPUP.SERVANTATTRDETAILPOPUPVIEW = "ServantAttrDetailPopupView";
        //门客详情2新版
        POPUP.SERVANTATTRDETAILSPOPUPVIEW = "ServantAttrDetailsPopupView";
        //神器详情
        POPUP.WEAPONATTRDETAILSPOPUPVIEW = "WeaponAttrDetailsPopupView";
        POPUP.WEAPONPROMATIONLISTPOPUPVIEW = "WeaponPromationListPopupView";
        // 查看中奖名单
        POPUP.ACLOTTERYPOPUPVIEW = "AcLotteryPopupView";
        /**
         * 众筹宝箱奖励
         */
        POPUP.ACLOTTERYBOXREWARDPOPUPVIEW = "AcLotteryBoxRewardPopupView";
        /**
         * 众筹充值奖励
         */
        POPUP.ACLOTTERYREWARDPOPUPVIEW = "AcLotteryRewardPopupView";
        /**
         * 活动冲榜列表
         */
        POPUP.ACALLIACERANKLISTPOPUPVIEW = "AcAlliaceRankListPopupView";
        /**
         * 累计活动冲榜列表
         */
        POPUP.ACALLIACEToTalRANKLISTPOPUPVIEW = "AcAlliaceToTalRankListPopupView";
        /**
         * 离线自动获得资源弹窗
         */
        POPUP.AUTORESPOPUPVIEW = "AutoResPopupView";
        /**选择门客界面 */
        POPUP.SERVANTSELECTEDPOPUPVIEW = "ServantSelectedPopupView";
        /**选择门客界面 */
        POPUP.WIFESELECTEDPOPUPVIEW = "WifeSelectedPopupView";
        /**西域商店VIP不足弹窗 */
        POPUP.ACVIPSHOPPOPUPVIEW = "AcVipShopPopupView";
        /**
         *  擂台挑战
         */
        POPUP.ATKRACECHALLENGEVIEW = "AtkraceChallengeView";
        /**
         *  跨服擂台挑战
         */
        POPUP.ATKRACECROSSCHALLENGEVIEW = "AtkraceCrossChallengeView";
        POPUP.NEWATKRACECROSSCHALLENGEVIEW = "NewAtkraceCrossChallengeView";
        /**使用道具确认取消弹板 */
        POPUP.ITEMUSECONSTPOPUPVIEW = "ItemUseConstPopupView";
        /**派遣门客取消弹板 */
        POPUP.SERVANTSENDCONSTPOPUPVIEW = "ServantSendConstPopupView";
        /**
         * 确认是否消耗元宝购买物品提示弹出框
         */
        POPUP.COSTGEMBUYITEMPOPUPVIEW = "CostGemBuyItemPopupView";
        /**
         * 查看寻访建筑信息弹窗
         */
        POPUP.SEARCHBUILDPOPUPVIEW = "SearchBuildPopupView";
        /**
         * 查看寻访建筑帝君阁
         */
        POPUP.SEARCHBIOGRAPHYPOPUPVIEW = "SearchBiographyPopupView";
        /**
         * vip 文字详情
         */
        POPUP.VIPTXTPOPUPVIEW = "VipTxtPopupView";
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
        /**声音选择 */
        POPUP.VOICEPOPUPVIEW = "VoicePopupView";
        /**
         * 排行榜玩家信息弹窗
         */
        POPUP.RANKUSERINGOPOPUPVIEW = "RankUserinfoPopupView";
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
         * 搜索玩家
         */
        POPUP.ADULTSEARCHVIEW = "AdultSearchView";
        /**
         * 选择接待
         */
        POPUP.ADULTCHOOSERECEICEVIEW = "AdultChooseReceiveView";
        /**
         * 选择孩子
         */
        POPUP.ADULTCHOOSECHILDVIEW = "AdultChooseChildView";
        POPUP.CHANGEBGDETAILPOPUPVIEW = "ChangebgDetailPopupView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW = "DailyTaskRewardPreviewPopuiView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.ACNEWYEARPOPUPVIEW = "AcNewYearPopupView";
        POPUP.ACNEWYEARSEVENDAYSPOPUPVIEW = "AcNewYearSevenDaysPopupView";
        /**
         * 每日任务宝箱奖励预览
         */
        POPUP.ACNEWYEARDAILYPOPUPVIEW = "AcNewYearDailyPopupView";
        /**
         * 驿站任务宝箱预览
         */
        POPUP.ACCOURIERPOPUPVIEW = "AcCourierPopupView";
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
         * 宴会记录详情
         */
        POPUP.DINNERDETAILPOPUPVIEW = "DinnerdetailPopupView";
        /**
         * 协议
         */
        POPUP.AGREEMENTPOPUPVIEW = "AgreementPopupView";
        /**
         * 绑定手机
         */
        POPUP.BINDINGPHONEPOPUPVIEW = "BindingPhonePopupview";
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
        /**
         * 成就详情列表
         */
        POPUP.ACHIEVEMENTDETAILPOPUPVIEW = "AchievementDetailPopupView";
        /**
         * 限时活动详情列表
         */
        POPUP.ACLIMITEDREWARDDETAILPOPUPVIEW = "AcLimitedRewardDetailPopupView";
        /**
         * 设置页面
         */
        POPUP.SettingPopopView = "SettingPopopView";
        /**
         * 活动公告
         */
        POPUP.ACTIVITYPOPVIEW = "ActivityPopView";
        /**
         * 联系我们
         */
        POPUP.SETTINGCONTACTPOPUPVIEW = "SettingContactPopupView";
        /**
         * 兑换码
         */
        POPUP.SettingCDKPopupView = "SettingCDKPopupView";
        /**
         * 推送设置
         */
        POPUP.SETTINGPUSHPOPUPVIEW = "SettingPushPopupView";
        /**
         * 帮助
         */
        POPUP.SETTINGHELPPOPUPVIEW = "SettingHelpPopupView";
        /**
         * 登录失败弹板
         */
        POPUP.ERRORPOPUPVIEW = "ErrorPopupView";
        POPUP.SERVANTBOOKLEVELUPPOPUPVIEW = "ServantBookLevelupPopupView";
        POPUP.SERVANTWIFEEXSKILLPOPUPVIEW = "ServantWifeExSkillPopupView";
        POPUP.WIFEEXSKILLUNLOCKVIEW = "WifeExSkillUnlockView";
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
         * 红颜技能2
         */
        POPUP.WIFEMULTISKILLPOPUPVIEW = "WifeMultiSkillPopupView";
        /**
         * 红颜皮肤
         */
        POPUP.WIFESKINVIEW = "WifeskinView";
        POPUP.WIFESKINNEWVIEW = "WifeskinNewView";
        /**
         * 红颜省亲 选择红颜
         */
        POPUP.BANISHCHOOSEPOPUPVIEW = "BanishChoosePopupView";
        /**
         * 红颜 选择当家
         */
        POPUP.WIFEDANGJIACHOOSEPOPUPVIEW = "WifeDangjiaChoosePopupView";
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
        POPUP.BOOKROOMAUTOSELECTSERVANTPOPUPVIEW = "BookroomAutoSelectServantPopupView";
        /**
         * 女囚（泰拳天下）商店兑换
         */
        POPUP.ACPUNISHSHOPPOPUPVIEW = "AcPunishShopPopupView";
        /**
         * 通用确认面板
         */
        POPUP.CONFIRMPOPUPVIEW = "ConfirmPopupView";
        /**
         * 下线面板
         */
        POPUP.OFFLINEVIEW = "OfflineView";
        /**
         * 合成道具详情界面
         */
        POPUP.COMPOSEPOPUPVIEW = "ComposePopupView";
        POPUP.COMPOSEMULTIPOPUPVIEW = "ComposeMultiPopupView";
        POPUP.ITEMUSECHOOSEBOOKPOPUPVIEW = "ItemUseChooseBookPopupView";
        /**
         * 创建军团界面
         */
        POPUP.ALLIANCECREATEPOPUPVIEW = "AllianceCreatePopupView";
        POPUP.ALLIANCETASKBUFFLISTPOPUPVIEW = "AllianceTaskBuffListPopupView";
        POPUP.ALLIANCETASKRANKPOPUPVIEW = "AllianceTaskRankPopupView";
        /**
         * 副本攻击奖励
         */
        POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW = "AllianceBossAttackedPopupView";
        POPUP.ALLIANCELOGPOPUPVIEW = "AllianceLogPopupView";
        /**
         * 擂台通用小弹版
         */
        POPUP.ATKRACEAGREEPOPUPVIEW = "AtkraceAgreePopupDialog";
        POPUP.ATKRACECROSSAGREEPOPUPDIALOG = "AtkracecrossAgreePopupDialog";
        POPUP.NEWATKRACECROSSAGREEPOPUPDIALOG = "NewAtkracecrossAgreePopupDialog";
        POPUP.ATKRACEFIGHTINFOPOPUPVIEW = "AtkraceFightInfoPopupView";
        POPUP.ATKRACEAUTOFIGHTPOPUPVIEW = "AtkraceAutoFightPopupView";
        POPUP.ATKRACECROSSAUTOFIGHTPOPUPVIEW = "AtkracecrossAutoFightPopupView";
        POPUP.NEWATKRACECROSSAUTOFIGHTPOPUPVIEW = "NewAtkracecrossAutoFightPopupView";
        POPUP.ATKRACEFAMESERVANTPOPUPVIEW = "AtkraceFameServantPopupView";
        POPUP.ATKRACEFAMEADDINFOPOPUPVIEW = "AtkraceFameAddInfoPopupView";
        /**
         * 擂台购买属性小弹版
         */
        POPUP.ATKRACEBUYPOPUPVIEW = "AtkraceBuyPopupView";
        POPUP.ATKRACECROSSBUYPOPUPVIEW = "AtkracecrossBuyPopupView";
        POPUP.NEWATKRACECROSSBUYPOPUPVIEW = "NewAtkracecrossBuyPopupView";
        POPUP.STUDYATKFINDPOPUPVIEW = "StudyatkFindPopupView";
        POPUP.STUDYATKCREATEPOPUPVIEW = "StudyatkCreatePopupView";
        POPUP.STUDYATKBOOKPOPUPVIEW = "StudyatkBookPopupView";
        POPUP.STUDYATKFAILEDPOPUPVIEW = "StudyatkFailedPopupView";
        POPUP.ACBATTLEGROUNDBUYPOPUPVIEW = "AcBattleGroundBuyPopupView";
        POPUP.ACBATTLEGROUNDAUTOFIGHTVIEW = "AcBattleGroundAutoFightView";
        /**
         * 擂台抽奖
         */
        POPUP.ATKRACEREWARDPOPUPVIEW = "AtkraceRewardPopupView";
        POPUP.ATKRACECROSSREWARDPOPUPVIEW = "AtkracecrossRewardPopupView";
        POPUP.ATKRACECROSSDETAILPOPUPVIEW = "AtkracecrossDetailPopupView";
        POPUP.NEWATKRACECROSSREWARDPOPUPVIEW = "NewAtkracecrossRewardPopupView";
        POPUP.NewATKRACECROSSDETAILPOPUPVIEW = "NewAtkracecrossDetailPopupView";
        /*** 群雄跨服 江湖名望*/
        POPUP.NEWATKRACECROSSFAMEPOPUPVIEW = "NewAtkraceCrossFamePopupView";
        POPUP.NEWATKRACECROSSFAMEHOLDPOPUPVIEW = "NewAtkraceCrossFameHoldPopupView";
        POPUP.NEWATKRACECROSSFAMEDETAILPOPUPVIEW = "NewAtkraceCrossFameDetailPopupView";
        /** 擂台/门客免战界面 */
        POPUP.ATKRACESERVANTAVOIDPOPUPVIEW = "AtkraceServantAvoidPopupView";
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
        POPUP.DAILYBOSSNEWSCROEPOPUPVIEW = "DailybossnewScroePopupView";
        /**
         * 副本排行榜
         */
        POPUP.DAILYBOSSRANKPOPUPVIEW = "DailybossRankPopupView";
        POPUP.DAILYBOSSNEWRANKPOPUPVIEW = "DailybossnewRankPopupView";
        /**
         * 副本奖励
         */
        POPUP.DAILYBOSSATTACKEDPOPUPVIEW = "DailybossAttackedPopupView";
        POPUP.DAILYBOSSNEWAWARDPOPUPVIEW = "DailybossnewRewardPopupView";
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
         * 帮会公告详情
         */
        POPUP.ALLIANCEDETAILSPOPUPVIEW = "AllianceDetailsPopupView";
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
         * 玩吧回归礼包
         */
        POPUP.RETURNREWARDPOPUPVIEW = "ReturnRewardPopupView";
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
         * 实名认证奖励面板
         */
        POPUP.REAlNAMEPOPUPVIEW = "RealnamePopupView";
        /**
         * 实名认证2面板
         */
        POPUP.REAlNAME2POPUPVIEW = "Realname2PopupView";
        POPUP.REALNAMECONSTRAINTPOPUPVIEW = "RealnameconstraintPopupView";
        /**
         * 实名认证3面板
         */
        POPUP.REAlNAME3POPUPVIEW = "Realname3PopupView";
        /**
         * 实名认证领取奖励面板
         */
        POPUP.REALNAMEREWARDSPOPUPVIEW = "RealnamerewardsPopupView";
        /**
         * 册封选择位分面板
         */
        POPUP.WIFESTATUSPOPUPVIEW = "WifestatusPopupView";
        /**
         * 册封红颜属性面板
         */
        POPUP.WIFESTATUSWIFEPOPUPVIEW = "WifestatusWifePopupView";
        /**
         * 红颜技能经验转换道具弹板
         */
        POPUP.WIFEEXPEXCHANGEPOPUPVIEW = "WifeExpExchangePopupView";
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
        POPUP.EMPERORWARBUZHENVIEW = "EmperorWarBuzhenView";
        POPUP.EMPERORWARCHEERVIEW = "EmperorWarCheerView";
        POPUP.EMPERORWARREPLAYPOPUPVIEW = "EmperorwarReplayPopupView";
        POPUP.EMPERORWARSHOPVIEW = "EmperorWarShopView";
        POPUP.EMPERORWARDETAILPOPUPVIEW = "EmperorWarDetailPopupView";
        /**
         * 分封弹窗
        */
        POPUP.PROMOTEPLAYERPOPVIEW = "PromotePlayerPopView";
        POPUP.PROMOTENOTICEVIEW = "PromoteNoticeView";
        /**
         * 金銮殿相关
         */
        POPUP.DECREEPOLICYLISTPOPUPVIEW = "DecreePolicyListPopupView";
        POPUP.DECREEPOLICYDETAILPOPUPVIEW = "DecreePolicyDetailPopupView";
        POPUP.DECREEPOLICYCHANGEPOPUPVIEW = "DecreePolicyChangePopupView";
        POPUP.DECREERESCRIPTDISPLAYPOPUPVIEW = "DecreeRescriptDisplayPopupView";
        POPUP.DECREEPAPERCHOOSEPOPUPVIEW = "DecreePaperChoosePopupView";
        POPUP.DECREEPOLICYCHOOSEPOPUPVIEW = "DecreePolicyChoosePopupView";
        POPUP.DECREEPAPERDETAILPOPUPVIEW = "DecreePaperDetailPopupView";
        /**
         * 端午排行榜
         */
        POPUP.DRAGONBOATRANKVIEW = "AcDragonBoatDayRankView";
        /**
         *  跨服权势奖励一览弹窗
         */
        POPUP.ACCROSSSERVERPOWERREWARDVIEW = "AcCrossServerPowerRewardView";
        POPUP.ACCROSSSERVERPOWERRANKLISTVIEW = "AcCrossServerPowerRankListView";
        POPUP.ACCROSSPOWERDETAILPOPUPVIEW = "AcCrossPowerDetailPopupView";
        POPUP.ACCROSSSERVERWIFEBATTLEDETAILPOPUPVIEW = "AcCrossServerWifeBattleDetailPopupView";
        /**
         * 黄忠活动
         */
        POPUP.ACARCHERRECHARGEPOPUPVIEW = "AcArcherRechargePopupView";
        POPUP.ACARCHERRANKPOPUPVIEW = "AcArcherRankPopupView";
        POPUP.ACARCHERINFOPOPUPVIEW = "AcArcherInfoPopupView";
        //好友相关
        POPUP.FRIENDSAPPLYPOPUPVIEW = "FriendApplyPopupView";
        POPUP.FRIENDSGIFTPOPUPVIEW = "FriendGiftPopupView";
        /**
         * 私聊
         */
        POPUP.PRICHATVIEW = "PriChatView";
        /**
         * 世界杯活动
         */
        POPUP.ACWORLDCUPVOTEVIEW = "AcWorldCupVoteView";
        POPUP.ACWORLDCUPBUYVIEW = "AcWorldCupBuyView";
        POPUP.ACWORLDCUPRATIOVIEW = "AcWorldCupRatioView";
        /**
         * 新的购买 弹板
         */
        POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW = "CostGemBuyItemSliderPopupView";
        /**
         * 赵云活动
         */
        POPUP.ACMAZEINFOPOPUPVIEW = "AcMazeInfoPopupView";
        POPUP.ACMAZERANKPOPUPVIEW = "AcMazeRankPopupView";
        POPUP.ACMAZEREWARDPOPUPVIEW = "AcMazeRewardPopupView";
        /**
         * 跨服活动区服详细弹窗
        */
        POPUP.ACCROSSRANKLISTVIEW = "AcCrossRankListView";
        /**
         * 防沉迷
         */
        POPUP.ANTIADDICTIONPOPUPVIEW = "AntiaddictionPopupView";
        /**
         * 七夕灯会奖励
         */
        POPUP.ACDOUBLESEVENTHAWARDVIEW = "AcDoubleSeventhAwardView";
        POPUP.ACDOUBLESEVENTHEXCHANGEVIEW = "AcDoubleSeventhExchangeView";
        /**
         * 小程序 首充界面
         */
        POPUP.FIRSTRECHARGEVIEW = "FirstRechargeView";
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
        /**
         * 百服活动-储值宝箱物品展示
         */
        POPUP.ACRECHARGEBOXPOPUPVIEW = "AcRechargeBoxPopupView";
        /**
         * 门客擂台规则说明
         */
        POPUP.CROSSSERVERSERVANTDETAILVIEW = "AcCrossServerServantDetailView";
        /**
         * 公务奖励
         */
        POPUP.AFFAIRVIEWWORDREWARDPOPUPVIEW = "AffairWordRewardPopupView";
        /**
         * 一键公务
         */
        POPUP.AFFAIRVIEWCHOICEPOPUPVIEW = "AffairViewChoicePopupView";
        /**
         * 书院文本提示
         */
        POPUP.BOOKROOMTIPPOPUPVIEW = "BookroomTipPopupView";
        /**
         * 门客擂台奖励弹窗
         */
        POPUP.CROSSSERVERSERVANTREWARDVIEW = "AcCrossServerServantRewardView";
        /**
         * 门客擂台排行榜奖励弹窗
         */
        POPUP.CROSSSERVERSERVANTRANKVIEW = "AcCrossServerServantRankListView";
        /**
         * 港台一周年活动
         */
        //钱庄
        POPUP.BANKBOXPOPUPVIEW = "BankBoxPopupView";
        POPUP.BANKBOXDEPOPUPVIEW = "BankBoxDePopupView";
        //黑市
        POPUP.BLACKMARKEtVIEW = "BlackMarketView";
        POPUP.TITLELEVELDETAILPOPUPVIEW = "TitleLevelDetailPopupView";
        //皮肤相关
        POPUP.ITEMPROPOPUPVIEW = "ItemProPopupView";
        POPUP.SKINRANKPOPUPVIEW = "SkinRankPopupView";
        POPUP.SKINLEVELDETAILPOPUPVIEW = "SkinLevelDetailPopupView";
        /**
         * 中秋活动查看奖励
         */
        POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW = "AcMidAutumnRewardInfoPopupView";
        POPUP.ACMIDAUTUMNREWARDPOPUPVIEW = "AcMidAutumnRewardPopupView";
        POPUP.ACMIDAUTUMNPREVIEWPOPUPVIEW = "AcMidAutumnPreviewPopupView";
        /**
         * 中秋活动详情
         */
        POPUP.ACMIDAUTUMNACINFOPOPUPVIEW = "AcMidAutumnAcInfoPopupView";
        /**
         * 首页回归弹板
         */
        POPUP.REBACKPOPUPVIEW = "PlayerReturnPopupView";
        POPUP.EGAMEQQPOPUPVIEW = "EgameqqPopupView";
        /**
         * 限时红颜
         */
        POPUP.TIMELIMITWIFEVIEW = "TimeLimitWifeView";
        /**
         * 限时礼包
         */
        POPUP.LIMITEDGIFTVIEW = "LimitedGiftView";
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
        //皇帝摆驾通知
        POPUP.DECREEONLINESETTINGPOPUPVIEW = "DecreeOnlineSettingPopupView";
        POPUP.ACWIFECOMECOLLECTPOPUPVIEW = "AcWifeComeCollectPopupView";
        /**
         * 我要变强
         */
        POPUP.STRENGTHENPOPUPVIEW = "StrengthenPopupView";
        /**
         * 帮会跨服战斗结果弹窗
         */
        POPUP.ALLIANCEWARRESULTVIEW = "AllianceWarResultView";
        POPUP.ALLIANCEWARDAMAGERANKVIEW = "AllianceWarDamageRankView";
        /**
         * 门客（红颜）转换的界面
         */
        POPUP.COMMONCHANGEOTHERREWARD = "CommonChangeOtherReward";
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
        POPUP.ACSINGLEDAYGETREDPTPOPUPVIEW = "AcSingleDayGetRedptPopupView";
        /**皮肤碎皮 */
        POPUP.SKINCOMPOSEPOPUPVIEW = "SkinComposePopupView";
        /**门客战城市详情 */
        POPUP.COUNTRYWARCITYPOPUPVIEW = "CountryWarCityPopupView";
        POPUP.COUNTRYWARRESULTVIEW = "CountryWarResultView";
        //国战相关
        /**国战奖励相关 */
        POPUP.COUNTRYWARREWARDPOPUPVIEW = 'CountryWarRewardPopupView';
        /**国战计策 */
        POPUP.COUNTRYWARPLANPOPUPVIEW = 'CountryWarPlanPopupView';
        /**国战选择门客界面 */
        POPUP.COUNTRYWARSELECTSERVANTPOPUPVIEW = 'CountryWarSelectServantPopupView';
        /**国战二级选择界面 */
        POPUP.COUNTRYWARCONFIRMPOPUPVIEW = 'CountryWarConfirmPopupView';
        /**国战编辑公告界面 */
        POPUP.COUNTRYWAREDITNOTICEPOPUPVIEW = 'CountryWarEditNoticePopupView';
        /**门客皮肤详情界面 */
        POPUP.SERVANTSKINAURAPOPUPVIEW = 'ServantSkinAuraPopupView';
        /**圣诞奖励 */
        POPUP.ACCHRISTMASREWARDPOPUPVIEW = "AcChristmasRewardPopupView";
        /**圣诞奖励池子 */
        POPUP.ACCHRISTMASREWARDPOOLPOPUPVIEW = "AcChristmasRewardPoolPopupView";
        /**圣诞大奖励 */
        POPUP.ACCHRISTMASBIGREWARDPOOLPOPUPVIEW = "AcChristmasBigRewardPopupView";
        /**圣诞大奖励--头像框 */
        POPUP.ACCHRISTMASTITLEREWARDPOPUPVIEW = "AcChristmasTitleRewardPopupView";
        /**圣诞大奖励--红颜皮肤 */
        POPUP.ACCHRISTMASWIFESKINREWARDPOPUPVIEW = "AcChristmasWifeSkinRewardPopupView";
        /**圣诞大奖励--门客 */
        POPUP.ACCHRISTMASSERVANTREWARDPOPUPVIEW = "AcChristmasServantRewardPopupView";
        /**圣诞活动奖励--牛郎织女 */
        POPUP.ACCHRISTMASMAGPIESBRIDGEREWARDPOPUPVIEW = "AcChristmasMagpiesBridgeRewardPopupView";
        /**圣诞二级弹框 */
        POPUP.ACCHRISTMASCONFIRMPOPUPVIEW = "AcChristmasConfirmPopupView";
        /**赌坊下注弹窗 */
        POPUP.ACGAMBLEGEMPOPUPVIEW = "AcGambleGemPopupView";
        /**赌坊结果弹窗 */
        POPUP.ACGAMBLERESULTVIEW = "AcGambleResultView";
        /**领取奖励弹窗 */
        POPUP.ACGAMBLEGETREWARDPOPUPVIEW = "AcGambleGetRewardPopupView";
        /**领取奖励弹窗 */
        POPUP.ACGAMBLERECORDPOPUPVIEW = "AcGambleRecordPopupView";
        /**客栈信息弹窗 */
        POPUP.ACHOTELACINFOPOPUPVIEW = "AcHotelAcInfoPopupView";
        /**比武招亲宝箱弹窗 */
        POPUP.ACMARRYBOXINFOPOPUPVIEW = "AcMarryBoxInfoPopupView";
        /**比武招亲额外奖励弹窗 */
        POPUP.ACMARRYREWARDPOPUPVIEW = "AcMarryRewardPopupView";
        /**元旦活动获得奖励弹窗 */
        POPUP.ACTREASUREHUNTGETREWARDVIEW = "AcTreasureHuntGetRewardView";
        POPUP.ACTREASUREHUNTROUNDREWARDVIEW = "AcTreasureHuntRoundRewardView";
        POPUP.ACTREASUREHUNTWEALTHVIEW = "AcTreasureHuntWealthView";
        POPUP.ACTREASUREHUNTMARKETVIEW = "AcTreasureHuntMarketView";
        POPUP.ACTREASUREHUNTOFFICEVIEW = "AcTreasureHuntOfficeView";
        POPUP.ACTREASUREHUNTCARCLIPVIEW = "AcTreasureHuntCarClipView";
        /**京城夜赏获得奖励弹窗 */
        POPUP.ACENJOYNIGHTGETREWARDVIEW = "AcEnjoyNightGetRewardView";
        POPUP.ACENJOYNIGHTEXCHANGEVIEW = "AcEnjoyNightExchangeView";
        POPUP.ACENJOYNIGHTTENPOPUPVIEW = "AcEnjoyNightTenPopupView";
        POPUP.ACAC2020AIDICEPOPUPVIEW = "AcAC2020AIDicePopupView";
        POPUP.ACAC2020GETREWARDVIEW = "AcAC2020GetRewardView";
        POPUP.ACAC2020SEARCHPOPUPVIEW = "AcAC2020SearchPopupView";
        POPUP.ACAC2020TENPOPUPVIEW = "AcAC2020TenPopupView";
        /**除夕奖励弹窗 */
        POPUP.ACNEWYEARSIGNUPPOPUPVIEW = "AcNewYearSignUpPopupView";
        /**除夕补签弹窗 */
        POPUP.ACNEWYEARSIGNUPConfirmPOPUPVIEW = "AcNewYearSignUpConfirmPopupView";
        /**财神驾到--财神祝福 */
        POPUP.ACWEALTHCOMINGBLESSPOPUPVIEW = "AcWealthComingBlessPopupView";
        /**财神驾到--财神奖励 */
        POPUP.ACWEALTHCOMINGREWARDPOPUPVIEW = "AcWealthComingRewardPopupView";
        /**财神驾到--金童玉女 */
        POPUP.ACWEALTHCOMINGSKINREWARDPOPUPVIEW = "AcWealthComingSkinRewardPopupView";
        /**财神驾到--财运奖励 */
        POPUP.ACWEALTHCOMINGLUCKREWARDPOPUPVIEW = "AcWealthComingLuckRewardPopupView";
        /**财神驾到--活动奖励弹框 */
        POPUP.ACWEALTHCOMINGGETREWARDPOPUPVIEW = "AcWealthComingGetRewardPopupView";
        /**绝地擂台来访消息 */
        POPUP.ACBATTLEGROUNDVISITVIEW = "AcBattileGroundVisitView";
        POPUP.ACBATTLEGROUNDALLIINFOVIEW = "AcBattleGroundAlliInfoView";
        POPUP.ACBATTLEGROUNDSELECTVIEW = "AcBattleGroundSelectView";
        POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG = "AcBattleGroundAgreePopupDialog";
        POPUP.ACBATTLEGROUNDCHEERSELECTVIEW = "AcBattleGroundCheerSelectView";
        POPUP.ACBATTLEGROUNDCHALLENGEVIEW = "AcBattleGroundChallengeView";
        /**风华群芳  popup */
        POPUP.ACGROUPWIFEBATTLEVISITVIEW = "AcGroupWifeBattleVisitView";
        POPUP.ACGROUPWIFEBATTLEALLIINFOVIEW = "AcGroupWifeBattleAlliInfoView";
        POPUP.ACGROUPWIFEBATTLESELECTVIEW = "AcGroupWifeBattleSelectView";
        // export const ACBATTLEGROUNDAGREEPOPUPDIALOG:string="AcBattleGroundAgreePopupDialog";
        POPUP.ACGROUPWIFEBATTLEGUESSSELECTVIEW = "AcGroupWifeBattleGuessSelectView";
        // export const ACBATTLEGROUNDCHALLENGEVIEW:string="AcBattleGroundChallengeView";
        POPUP.ACGROUPWIFEBATTLEPROTECTVIEW = "AcGroupWifeBattleProtectView";
        POPUP.ACGROUPWIFEBATTLETALENTVIEW = "AcGroupWifeBattleTalentView";
        //马超活动
        /**排行榜 */
        POPUP.ACMACHAORANKPOPUPVIEW = "AcMaChaoRankPopupView";
        /**奖池 */
        POPUP.ACMACHAOREWARDPOOLPOPUPVIEW = "AcMaChaoRewardPoolPopupView";
        /**爆竹迎新 */
        POPUP.ACNEWYEARCRACKERSCENEPOPUPVIEW = "AcNewYearCrackerScenePopupView";
        POPUP.ACNEWYEARCRACKERDETAILPOPUPVIEW = "AcNewYearCrackerDetailPopupView";
        POPUP.ACNEWYEARCRACKERREWARDPOPUPVIEW = "AcNewYearCrackerRewardPopupView";
        /**锦鲤活动奖励 */
        POPUP.ACLUCKYCARPREWARDPOPUPVIEW = "AcLuckyCarpRewardPopupView";
        /**七日好礼红颜奖励 */
        POPUP.SEVENDAYSSINGNUPWIFEINFOPOPUPVIEW = "SevenDaysSignUpWifeInfoPopupView";
        /**七日好礼门客奖励 */
        POPUP.SEVENDAYSSINGNUPSERVANTINFOPOPUPVIEW = "SevenDaysSignUpServantInfoPopupView";
        POPUP.SEVENDAYSSINGNUPWIFESKINPOPUPVIEW = "SevenDaysSignUpWifeSkinPopupView";
        /**门客出海--选择门客 */
        POPUP.SERVANTEXILESELECTSERVANTPOPUPVIEW = "ServantExileSelectServantPopupView";
        /**门客出海--门客回归 */
        POPUP.SERVANTEXILESERVANTBACKPOPUPVIEW = "ServantExileServantBackPopupView";
        /**门客出海--门客出海和提前回归 */
        POPUP.SERVANTEXILESERVANTGOOUTPOPUPVIEW = "ServantExileServantGoOutPopupView";
        POPUP.SERVANTEXILESERVANTBUFFVIEW = "ServantExileServantBuffView";
        POPUP.SERVANTEXILEBUFFCHOOSEVIEW = "ServantExileBuffChooseView";
        POPUP.SERVANTEXILEFLEETBUFFVIEW = "ServantExileFleetBuffView";
        /**彩蛋活动rank */
        POPUP.ACWEALTHCARPRANKPOPUPVIEW = "AcWealthCarpRankPopupView";
        /**彩蛋活动抽奖奖励 */
        POPUP.ACWEALTHCARPLOTTERYREWARDSPOPUPVIEW = "AcWealthCarpLotteryRewardsPopupView";
        /**彩蛋活动奖励 */
        POPUP.ACWEALTHCARPSERVANTSKINREWARDPOPUPVIEW = "AcWealthCarpServantSkinRewardPopupView";
        /**彩蛋活动红颜奖励 */
        POPUP.ACWEALTHCARPWIFESKINREWARDPOPUPVIEW = "AcWealthCarpWifeSkinRewardPopupView";
        /**通用门客奖励 */
        POPUP.ACCOMMONSERVANTSKINPOPUPVIEW = "AcCommonServantSkinPopupView";
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
        /**投壶活动奖励弹板*/
        POPUP.ACTHROWARROWREWARDPOPUPVIEW = "AcThrowArrowRewardPopupView";
        POPUP.ACTHROWARROWREWARDPOPUPVIEW2 = "AcThrowArrowRewardPopupView|2";
        POPUP.ACTHROWARROWREWARDPOPUPVIEW3 = "AcThrowArrowRewardPopupView|3";
        POPUP.ACTHROWARROWREWARDPOPUPVIEW4 = "AcThrowArrowRewardPopupView|4";
        /**幸运翻牌皮肤奖励预览*/
        POPUP.ACLUCKYDRAWSKINPOPUPVIEW = "AcLuckyDrawSkinPopupView";
        POPUP.ACLUCKYDRAWREWARDPOPUPVIEW = "AcLuckyDrawRewardPopupView";
        POPUP.ACLUCKYDRAWREWARDSHOWVIEW = "AcLuckDrawRewardShowView";
        POPUP.ACLUCKYDRAWCARDPOOLVIEW = "AcLuckyDrawCardPoolView";
        POPUP.ACLUCKYDRAWRESULTVIEW = "AcLuckyDrawResultView";
        POPUP.SKINGETVIEW = "SkinGetView";
        /**
         * 东海皇陵活动商店
         */
        POPUP.ACTOMBSHOPVIEW = "AcTombShopView";
        POPUP.ACTOMBREWARDVIEW = "AcTombRewardView";
        POPUP.ACTOMBRANKIEW = "AcTombRankView";
        POPUP.ACTOMBRANKIEWTAB2 = "AcTombRankView|2";
        POPUP.ACTOMBGETREWARDVIEW = "AcTombGetRewardView";
        POPUP.ACTOMBATTACKPOPUPVIEW = "AcTombAttackPopupView";
        POPUP.ACTOMBJUMPVIEW = "AcTombJumpView";
        POPUP.ACTOMBALLIANCEINFOVIEW = "AcTombAllianceInfoView";
        POPUP.ACLOCTOMBSHOPVIEW = "AcLocTombShopView";
        POPUP.ACLOCTOMBREWARDVIEW = "AcLocTombRewardView";
        POPUP.ACLOCTOMBRANKIEW = "AcLocTombRankView";
        POPUP.ACLOCTOMBRANKIEWTAB2 = "AcLocTombRankView|2";
        POPUP.ACLOCTOMBGETREWARDVIEW = "AcLocTombGetRewardView";
        POPUP.ACLOCTOMBATTACKPOPUPVIEW = "AcLocTombAttackPopupView";
        POPUP.ACLOCTOMBJUMPVIEW = "AcLocTombJumpView";
        POPUP.ACLOCTOMBALLIANCEINFOVIEW = "AcLocTombAllianceInfoView";
        //勤王除恶
        /**宝箱奖励 */
        POPUP.ALLIANCEWEEKENDREWARDINFOPOPUPVIEW = "AllianceWeekEndRewardInfoPopupView";
        /**npc奖励 */
        POPUP.ALLIANCEWEEKENDNPCINFOPOPUPVIEW = "AllianceWeekEndNpcInfoPopupView";
        /**选择门客 */
        POPUP.ALLIANCEWEEKENDSELECTSERVANTPOPUPVIEW = "AllianceWeekEndSelectServantPopupView";
        /**buff 加成 */
        POPUP.ALLIANCEWEEKENDADDITIONPOPUPVIEW = "AllianceWeekEndAdditionPopupView";
        /**贡献排行榜 */
        POPUP.ALLIANCEWEEKENDRANKPOPUPVIEW = "AllianceWeekEndRankPopupView";
        /**积分奖励 */
        POPUP.ALLIANCEWEEKENDSCOREPOPUPVIEW = "AllianceWeekEndScorePopupView";
        /**
         * 劳碌丰收活动弹窗
         */
        POPUP.ACLABORDAYPOPUPVIEW = "AcLaborDayPopupView";
        POPUP.ACLABORDAYRANKVIEW = "AcLaborDayRankView";
        POPUP.ACLABORDAYSKINPOPUPVIEW = "AcLaborDaySkinPopupView";
        /**
         * 京城夜赏- 弹窗
         */
        POPUP.ACENJOYNIGHTACHIEVEMENTPOPUPVIEW = "AcEnjoyNightAchievementPopupView";
        /**
         * 粽叶飘香-端午节活动 弹窗
         */
        POPUP.ACDUANWUPOPUPVIEW = "AcDuanWuPopupView";
        POPUP.ACDUANWUPOPUPVIEW2 = "AcDuanWuPopupView|2";
        POPUP.ACDUANWUPOPUPVIEW3 = "AcDuanWuPopupView|3";
        POPUP.ACDUANWUPOPUPVIEW4 = "AcDuanWuPopupView|4";
        /**
         * 翻牌活动 弹窗
         */
        POPUP.ACLUCKYDRAWPOPUPVIEW = "AcLuckyDrawPopupView";
        POPUP.ACLUCKYDRAWPOPUPVIEW2 = "AcLuckyDrawPopupView|2";
        /**
         * 建造斗场活动弹窗
         */
        POPUP.ACARENAPOPUPVIEW = "AcArenaPopupView";
        POPUP.ACARENARANKVIEW = "AcArenaRankView";
        POPUP.ACARENAPOPUPVIEW2 = "AcArenaPopupView|2";
        POPUP.ACARENAPOPUPVIEW3 = "AcArenaPopupView|3";
        POPUP.ACARENAPOPUPVIEW4 = "AcArenaPopupView|4";
        //花魁
        /**花魁活动--选手信息 */
        POPUP.ACBEAUTYVOTEPLAYERINFOPOPUPVIEW = "AcBeautyVotePlayerInfoPopupView";
        /**花魁活动--购买鲜花 */
        POPUP.ACBEAUTYVOTEBUYITEMSLIDERPOPUPVIEW = "AcBeautyVoteBuyItemSliderPopupView";
        /**花魁活动--使用
         * 鲜花 */
        POPUP.ACBEAUTYVOTEUSEITEMSLIDERPOPUPVIEW = "AcBeautyVoteUseItemSliderPopupView";
        /**花魁活动--粉丝排行 */
        POPUP.ACBEAUTYVOTEFANRANKPOPUPVIEW = "AcBeautyVoteFanRankPopupView";
        /**花魁活动--对战排行 */
        POPUP.ACBEAUTYVOTEPLAYERBATTLEINFOPOPUPVIEW = "AcBeautyVotePlayerBattleInfoPopupView";
        /**
         * 储值宝箱弹窗
         */
        POPUP.ACRECHARGEBOXSKINPOPUPVIEW = "AcRechargeBoxSkinPopupView";
        /**母亲节*/
        POPUP.ACMOTHERDAYSKINPOPUPVIEW = "AcMotherDaySkinPopupView";
        POPUP.ACMOTHERDAYCARDPOOLVIEW = "AcMotherDayCardPoolView";
        POPUP.ACMOTHERDAYREWARDPOPUPVIEW = "AcMotherDayRewardPopupView";
        POPUP.ACMOTHERDAYREWARDSHOWVIEW = "AcMotherDayRewardShowView";
        /**母亲节--场景view */
        POPUP.ACMOTHERDAYSCENEREWARDPOPUPVIEW = "AcMotherDaySceneRewardPopupView";
        /**母亲节--活动奖励 */
        POPUP.ACMOTHERDAYACTIVITYREWARDPOPUPVIEW = "AcMotherDayActivityRewardPopupView";
        //诸葛亮传
        /** 诸葛亮传-充值任务 */
        POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW = "AcLiangBiographyChargePopupView";
        /** 诸葛亮传-奖池 */
        POPUP.ACLIANGBIOGRAPHYREWARDPOPUPVIEW = "AcLiangBiographyRewardPopupView";
        /** 诸葛亮传-皮肤展示*/
        POPUP.ACLIANGBIOGRAPHYSERVANTSKINPOPUPVIEW = "AcLiangBiographyServantSkinPopupView";
        /** 诸葛亮传-进度奖励*/
        POPUP.ACLIANGBIOGRAPHYPROCESSPOPUPVIEW = "AcLiangBiographyProcessPopupView";
        /** 诸葛亮传-卷轴*/
        POPUP.ACLIANGBIOGRAPHYSCROLLPOPUPVIEW = "AcLiangBiographyScrollPopupView";
        /** 诸葛亮传-抽奖*/
        POPUP.ACLIANGBIOGRAPHYREWARDSHOWVIEW = "AcLiangBiographyRewardShowView";
        //筑阁祭天
        /** 筑阁祭天-充值任务 */
        POPUP.ACWORSHIPCHARGEPOPUPVIEW = "AcWorshipChargePopupView";
        /** 筑阁祭天-奖池 */
        POPUP.ACWORSHIPREWARDPOPUPVIEW = "AcWorshipRewardPopupView";
        /** 筑阁祭天-进度奖励 */
        POPUP.ACWORSHIPACHIEVEMENTPOPUPVIEW = "AcWorshipAchievementPopupView";
        /** 筑阁祭天-衣装预览 */
        POPUP.ACWORSHIPSKINREWARDPOPUPVIEW = "AcWorshipSkinRewardPopupView";
        /** 筑阁祭天-奖励弹板 */
        POPUP.ACWORSHIPGETREWARDPOPUPVIEW = "AcWorshipGetRewardPopupView";
        //云顶龙窟
        /** 云顶龙窟-奖励弹板 */
        POPUP.ACYUNDINGLONGKUREWARDPOPUPVIEW = "AcYunDingLongKuRewardPopupView";
        /** 云顶龙窟-奖励弹板 */
        POPUP.ACYUNDINGLONGKUBOXINFOPOPUPVIEW = "AcYunDingLongKuBoxInfoPopupView";
        //电玩大本营
        /** 电玩大本营-奖励展示 */
        POPUP.ACARCADEGAMEREWARDVIEW = "AcArcadeGameRewardView";
        /** 电玩大本营-抽奖 */
        POPUP.ACARCADEGAMEGETREWARDPOPUPVIEW = "AcArcadeGameGetRewardPopupView";
        /** 电玩大本营-日志 */
        POPUP.ACARCADEGAMELOGVIEW = "AcArcadeGameLogView";
        /**门客书籍详情 */
        POPUP.SERVANTBOOKMAXRULEPOPUPVIEW = "ServantBookMaxRulePopupView";
        /** 通用红颜皮肤弹框 */
        POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW = "AcCommonWifeSkinRewardPopupView";
        /** 通用红颜弹框 */
        POPUP.ACCOMMONWIFEPOPUPVIEW = "AcCommonWifePopupView";
        /** 通用门客弹框 */
        POPUP.ACCOMMONSERVANTPOPUPVIEW = "AcCommonServantPopupView";
        /** 通用头像框弹框 */
        POPUP.ACCOMMONTITLEPOPUPVIEW = "AcCommonTitlePopupView";
        /**
         * 剧情回忆选择章节
         */
        POPUP.STORYRECALLCHOOOSEPOPUPVIEW = "StoryrecallChooosePopupView";
        /**
         * 调查问卷
         */
        POPUP.ACQUESTIONNAIREREWARDVIEW = "AcQuestionnaireRewardPopupView";
        /**
         * 衣装预览
         */
        POPUP.ACCOMMONSKINVIEW = "AcCommonSkinView";
        /**
         * 励精图治
         */
        POPUP.ACBATTLEPASSBUYLEVELVIEW = "AcBattlePassBuyLevelView";
        POPUP.ACBATTLEPASSREWARDPOPUPVIEW = "AcBattlePassRewardPopupView";
        /**
         * 定军中原弹窗类
         */
        POPUP.ACCONQUERMAINLANDPRANKVIEW = "AcConquerMainLandPRankView";
        POPUP.ACCONQUERMAINLANDZRANKVIEW = "AcConquerMainLandZRankView";
        POPUP.ACCONQUERMAINLANDCITYINFOVIEW = "AcConquerMainLandCityInfoView";
        POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW = "AcConquerMainLandItemUsePopupView";
        POPUP.ACCONQUERMAINLANDWARRESULTVIEW = "AcConquerManLandWarResultView";
        /**
         * 魏征活动
         */
        POPUP.ACWEIZHENGRECHARGEVIEW = "AcWeiZhengRechargeView";
        POPUP.ACWEIZHENGTASKVIEW = "AcWeiZhengTaskView";
        POPUP.ACWEISIGNREWARDVIEW = "AcWeiZhengSignRewardView";
        /**
         * 情缘弹窗详细加成
         */
        POPUP.QINGYUANDETAILVIEW = "QingyuanDetailView";
        //搜查魏府
        /**搜查魏府--奖池 */
        POPUP.ACSEARCHPROOFREWARDSPOOLPOPUPVIEW = "AcSearchProofRewardsPoolPopupView";
        /**搜查魏府--充值奖励 */
        POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW = "AcSearchProofRechargePopupView";
        /**搜查魏府--衣装兑换 */
        POPUP.ACSEARCHPROOFSKINPOPUPVIEW = "AcSearchProofSkinPopupView";
        /**搜查魏府--进度 */
        POPUP.ACSEARCHPROOFACHIEVEMENTPOPUPVIEW = "AcSearchProofAchievementPopupView";
        /**搜查魏府--搜查令 */
        POPUP.ACSEARCHPROOFSEARCHVIEW = "AcSearchProofSearchView";
        POPUP.CHILDADDVIEW = "ChildAddView";
        POPUP.CHILDDETAILVIEW = "ChildDetailView";
        /**
        * 巾帼活动道具组选择门客
        */
        POPUP.CHOOSESERVANTVIEW = "ChooseServantView";
        /**
         * 红颜皮肤升级剧情选择
        */
        POPUP.WIFECHATSELECTVIEW = "WifeChatSelectView";
        POPUP.WIFECHATUNLOCKSUCVIEW = "WifeChatUnlockSucView";
        POPUP.WIFESKINLEVELUPDETAILPOPUPVIEW = "WifeSkinlevelupDetailPopupView";
        /**
         * 科举答题
        */
        POPUP.EXAMRANKPOPUPVIEW = "ExamRankPopupView";
        POPUP.EXAMPROBLEMPOPUPVIEW = "ExamProblemPopupView";
        /**
         * 通用头衔衣装预览奖励
         */
        POPUP.ACCOMMONTITLEREWARDPOPUPVIEW = "AcCommonTitleRewardPopupView";
        /**
         * 东郊狩猎 奖励预览
         */
        POPUP.ACHUNTINGREWARDPOOLVIEW = "AcHuntingRewardPoolView";
        POPUP.ACHUNTINGREWARDPOPUPVIEW = "AcHuntingRewardPopupView";
        /** 设置语言 */
        POPUP.SETTINGLANGPOPUPVIEW = "SettingLangPopupView";
        /**
         * 月夜仙缘 奖励
         */
        POPUP.ACSWEETGIFTREWARDPOPVIEW = "AcSweetGiftRewardPopView";
        POPUP.ACSWEETGIFTVISITREWARDPOPVIEW = "AcSweetGiftVisitRewardPopView";
        POPUP.ACSWEETGIFTMAKECAKEPOPVIEW = "AcSweetGiftMakeCakePopView";
        POPUP.ACSWEETGIFTSKINPOPUPVIEW = "AcSweetGiftSkinPopupView";
        POPUP.ACSWEETGIFTAVGVIEW = "AcSweetGiftAVGView";
        /**
         * 投石破敌
         */
        POPUP.ACTHROWSTONELAUNCHPOPUPVIEW = "AcThrowStoneLaunchPopupView";
        POPUP.ACTHROWSTONEREWARDPOPVIEW = "AcThrowStoneRewardPopView";
        POPUP.ACTHROWSTONEREWARDPOPVIEW3 = "AcThrowStoneRewardPopView|2";
        POPUP.ACTHROWSTONEREWARDPOPVIEW4 = "AcThrowStoneRewardPopView|3";
        POPUP.ACTHROWSTONEACHIEVEREWARDPOPUPVIEW = "AcThrowStoneAchieveRewardPopupView";
        /**
         * 门客皮肤展示
        */
        POPUP.ATKRACESHOWSKINVIEW = "AtkraceshowskinView";
        POPUP.SERVANTNEWCHANGESKIN = "ServantNewChangeSkin";
        /**
         * 金蛋赠礼
         */
        POPUP.ACSMASHEGGDETAILPOPUPVIEW = "AcSmashEggDetailPopupView";
        POPUP.ACSMASHEGGDETAILPOPUPVIEW1 = "AcSmashEggDetailPopupView|1";
        //红颜对战 排行榜
        POPUP.WIFEBATTLERANKPOPUPVIEW = "WifebattleRankPopupView";
        //红颜对战 商城
        POPUP.WIFEBATTLESHOPPOPUPVIEW = "WifebattleShopPopupView";
        POPUP.WIFEBATTLESTUDYPOPUPVIEW = "WifebattleStudyPopupView";
        POPUP.ITEMEXCHANGEPOPUPVIEW = "ItemExchangePopupView";
        POPUP.WIFETALENTPLUSPOPUPVIEW = "WifeTalentView|1";
        POPUP.WIFETALENTBUFFPOPUPVIEW = "WifeTalentBuffPopupView";
        POPUP.WIFEBATTLEYONGLESUCCESSVIEW = "WiifeBattleYongleSuccessView";
        //提升才情
        POPUP.WIFETALENTUPPOPUPVIEW = "WifeTalentUpPopupView";
        //提升才情
        POPUP.ACCROSSSERVERWIFEBATTLEREWARDVIEW = "AcCrossServerWifeBattleRewardView";
        //跨服红颜对战 排行榜
        POPUP.ACCROSSSERVERWIFEBATTLERANKPOPUPVIEW = "AcCrossServerWifeBattleRankPopupView";
        //提升才情
        POPUP.ACCROSSSERVERWIFETALENTUPPOPUPVIEW = "AcCrossServerWifeTalentUpPopupView";
        POPUP.ACCROSSSERVERWIFETALENTPLUSPOPUPVIEW = "AcCrossServerWifeTalentPlusPopupView";
        /**
         * 珍器坊
        */
        POPUP.ZHENQIFANGSELECTSERVANTVIEW = "ZhenqifangSelectServantView";
        POPUP.ZHENQIFANGBUILDLEVELDETAILVIEW = "ZhenqifangBuildLevelDetailView";
        POPUP.ZHENQIFANGSELECTFRIENDVIEW = "ZhenqifangSelectFriendView";
        //国庆活动奖励预览
        POPUP.ACNATIONALDAYREWARDPOPUPVIEW = "AcNationalDayRewardPopupView";
        /**
         * 通用衣装预览 门客佳人预览
         */
        POPUP.ACCOMMONCLOTHESPOPUPVIEW = "AcCommonClothesPopupView";
        POPUP.ACCOMMONREWARDPOPUPVEW = "AcCommonRewardPopupView";
        /*
        * 子嗣事件
        */
        POPUP.CHILDEVENTVIEW = "ChildEventView";
        /*
        * 子嗣送活力丹
        */
        POPUP.GIVEREWARDSPOPUPVIEW = "GiveRewardsPopupView";
        /**
         **/
        POPUP.SERVANTWEAPONSHOWVIEW = "ServantWeaponShowView";
        /*
        * 暗夜魅影
        **/
        POPUP.ACDESTROYSAMEPOPUPVIEW = "AcDestroySamePopupView";
        POPUP.ACDESTROYSAMEPOPUPVIEW2 = "AcDestroySamePopupView|2";
        POPUP.ACDESTROYSAMEPOPUPVIEW3 = "AcDestroySamePopupView|3";
        POPUP.ACDESTROYSAMEPOPUPVIEW4 = "AcDestroySamePopupView|4";
        POPUP.ACDESTROYSAMEREWARDPOPUPVIEW = "AcDestroySameRewardPopupView";
        POPUP.ACDESTROYSAMESHOWREWARDVIEW = "AcDestroySameShowRewardView";
        /*
        * 女优活动2
        **/
        POPUP.ACRECHARGEBOXSPPOPUPVIEW = "AcRechargeBoxSPPopupView";
        POPUP.ACRECHARGEBOXSPREWARDVIEW = "AcRechargeBoxSPRewardView";
        POPUP.ACRECHARGEBOXSPAVGVIEW = "AcRechargeBoxSPAVGView";
        /**
         * 女优活动3
         */
        POPUP.ACYIYIBUSHEACHIEVEMENTPOPUPVIEW = "AcYiyibusheAchievementPopupView";
        POPUP.ACYIYIBUSHEAVGVIEW = "AcYiyibusheAVGView";
        POPUP.ACYIYIBUSHEREWARDPOOL = "AcYiyibusheRewardPool";
        /**
         * 女优活动1
         */
        POPUP.ACFIRSTSIGHTLOVERANKPOPUPVIEW = "AcFirstSightLoveRankPopupView";
        POPUP.ACFIRSTSIGHTLOVEUSERMSGPOPUPVIEW = "AcFirstSightLoveUserMsgPopupView";
        /*
        * 德川时代
        **/
        POPUP.ACDECHUANSHIDAIPOPUPVIEW = "AcDechuanshidaiPopupView";
        POPUP.ACDECHUANSHIDAIPOPUPVIEW2 = "AcDechuanshidaiPopupView|2";
        POPUP.ACDECHUANSHIDAIPOPUPVIEW3 = "AcDechuanshidaiPopupView|3";
        POPUP.ACDECHUANSHIDAIPOPUPVIEW4 = "AcDechuanshidaiPopupView|4";
        POPUP.ACDECHUANSHIDAIREWARDPOOLVIEW = "AcDechuanshidaiRewardPoolView";
        POPUP.ACDECHUANSHIDAITASKVIEW1 = "AcDechuanshidaiTaskView";
        POPUP.ACDECHUANSHIDAITASKVIEW2 = "AcDechuanshidaiTaskView|2";
        POPUP.ACDECHUANSHIDAITASKVIEW3 = "AcDechuanshidaiTaskView|3";
        POPUP.ACDECHUANSHIDAITASKVIEW4 = "AcDechuanshidaiTaskView|4";
        /**
         * 天梯
         */
        POPUP.LADDERCHOOSETEAMPOPUPVIEW = "LadderChooseTeamPopupView";
        POPUP.LADDERITEMUSEPOPUPVIEW = "LadderItemUsePopupView";
        /**
         * 年度狂欢双十一
         */
        POPUP.ACSINGLEDAY2019DETAILVIEW1 = "AcSingleDay2019DetailView";
        POPUP.ACSINGLEDAY2019DETAILVIEW2 = "AcSingleDay2019DetailView|2";
        POPUP.ACSINGLEDAY2019DETAILVIEW3 = "AcSingleDay2019DetailView|3";
        POPUP.ACSINGLEDAY2019DETAILVIEW4 = "AcSingleDay2019DetailView|4";
        POPUP.ACSINGLEDAY2019DETAILVIEW5 = "AcSingleDay2019DetailView|5";
        POPUP.ACSINGLEDAY2019RANKPOPUPVIEW = "AcSingleDay2019RankPopupView";
        POPUP.ACSINGLEDAY2019ITEMSPOPUPVIEW = "AcSingleDay2019GiftItemsPopupView";
        /**
         * 携美同游
         */
        POPUP.ACTRAVELWITHBEAUTYACHIEVEREWARDPOPUPVIEW = "AcTravelWithBeautyAchieveRewardPopupView";
        POPUP.ACTRAVELWITHBEAUTYRECHARGEPOPUPVIEW = "AcTravelWithBeautyRechargePopupView";
        POPUP.ACTRAVELWITHBEAUTYSCENEPOPUPVIEW = "AcTravelWithBeautyScenePopupView";
        POPUP.ACTRAVELWITHBEAUTYPOOLREWARDPOPUPVIEW = "AcTravelWithBeautyPoolRewardPopupView";
        /**
         * 米莎来了
         */
        POPUP.ACWIFECOMESCENEPOPUPVIEW = "AcWifeComeScenePopupView";
        /**
         * 网络异常警告
         */
        POPUP.NETWARNPOPUPVIEW = "NetWarnPopupView";
        POPUP.ACCROSSSERVERWIFETALENTBUFFPOPUPVIEW = "AcCrossServerWifeTalentBuffPopupView";
        /**
         * 巾帼英雄
         */
        POPUP.ACHEROINEACHIEVEMENTPOPUPVIEW = "AcHeroineAchievementPopupView";
        POPUP.ACHEROINEREWARDPOPUPVIEW = "AcHeroineRewardPopupView";
        POPUP.ACHEROINEREWARDPOPUPVIEWTAB3 = "AcHeroineRewardPopupView|2";
        POPUP.ACHEROINEREWARDPOPUPVIEWTAB2 = "AcHeroineRewardPopupView|1";
        /**
         * 头像框切换
         */
        POPUP.TITLECHANGEPOPUPVIEW = "TitleChangePopupView";
        /**
         * 折扣商店
         */
        POPUP.ACANNIVERSARYSHOP2020GIFTPOPUPVIEW = "AcAnniversaryShop2020GiftPopupView";
        POPUP.ACANNIVERSARYSHOP2020BUYITEMPOPUPVIEW = "AcAnniversaryShop2020BuyItemPopupView";
        /*
        * 周年祈愿
        **/
        POPUP.ACANNUALPRAYPOPUPVIEW = "AcAnnualPrayPopupView";
        POPUP.ACANNUALPRAYPOPUPVIEW2 = "AcAnnualPrayPopupView|2";
        POPUP.ACANNUALPRAYPOPUPVIEW3 = "AcAnnualPrayPopupView|3";
        POPUP.ACANNUALPRAYREWARDPOOLVIEW = "AcAnnualPrayRewardPoolView";
        POPUP.ACANNUALPRAYGETREWARDPOPUPVIEW = "AcAnnualPrayGetRewardPopupView";
        /**
         * 明君出巡
         */
        POPUP.EMPEROROUTSTARTPOPUPVIEW = "EmperorOutStartPopupView";
        POPUP.EMPEROROUTWISHPOPUPVIEW = "EmperorOutWishPopupView";
        POPUP.EMPEROROUTLISTPOPUPVIEW = "EmperorOutListPopupView";
        POPUP.EMPEROROUTACHIEVEPOPUPVIEW = "EmperorOutAchievePopupView";
        /**
         * 元宵猜猜乐
        */
        POPUP.ACLANTERNPOOLVIEW = "AcLanternPoolView";
        POPUP.ACLANTERNPOPUPVIEW = "AcLanternPopupView";
        POPUP.ACLANTERNPOPUPVIEW2 = "AcLanternPopupView|2";
        POPUP.ACLANTERNPOPUPVIEW3 = "AcLanternPopupView|3";
        POPUP.ACLANTERNPROBLEMPOPUPVIEW = "AcLanaternProblemPopupView";
        //三国争霸
        POPUP.ACTHREEKINGDOMSSELECTTEAMVIEW = "AcThreeKingdomsSelcetTeamView";
        POPUP.ACTHREEKINGDOMSCONFIRMVIEW = "AcThreeKingdomsConfirmView";
        POPUP.ACTHREEKINGDOMSSELECTSUCCESSVIEW = "AcThreeKingdomsSelectSuccessView";
        POPUP.ACTHREEKINGDOMSTIMEVIEW = "AcThreeKingdomsTimeView";
        POPUP.ACTHREEKINGDOMSCITYWARPOPUPVIEW = "AcThreeKingdomsCityWarPopupView";
        POPUP.ACTHREEKINGDOMSYUANBINGDETAILVIEW = "AcThreeKingdomsYuanbingDetailView";
        POPUP.ACTHREEKINGDOMSYUANBBUFFPOPUPVIEW = "AcThreeKingdomsBuffPopupView";
        POPUP.ACTHREEKINGDOMSPREPAREVIEW = "AcThreeKingdomsPrepareView";
        POPUP.ACTHREEKINGDOMSTASKVIEW = "AcThreeKingdomsTaskView";
        POPUP.ACTHREEKINGDOMSUPGRADEREWARDVIEW = "AcThreeKingdomsUpgradeRewardView";
        POPUP.ACTHREEKINGDOMSORDERVIEW = "AcThreeKingdomsOrderView";
        POPUP.ACTHREEKINGDOMSORDERSETTINGVIEW = "AcThreeKingdomsOrderSettingView";
        POPUP.ACTHREEKINGDOMSORDERCITYSELECTVIEW = "AcThreeKingdomsOrderCitySelectView";
        POPUP.ACTHREEKINGDOMSHEROCHEERVIEW = "AcThreeKingdomsHeroCheerView";
        POPUP.ACTHREEKINGDOMSCHANGETEAMVIEW = "AcThreeKingdomsChangeTeamView";
        POPUP.ACTHREEKINGDOMSHEROATTACKJOINREWARDVIEW = "AcThreeKingdomsHeroAttackJoinRewardView";
        POPUP.ACTHREEKINGDOMSHEROATTACKRESULTVIEW = "AcThreeKingdomsHeroAttackResultView";
        POPUP.ACTHREEKINGDOMSRANKFOODREWARDVIEW = "AcThreeKingdomsRankFoodRewardView";
        POPUP.ACTHREEKINGDOMSMYLOGVIEW = "AcThreeKingdomsMyLogView";
        /**
         * 武圣天威
         */
        POPUP.ACTHREEKINGDOMSRECHARGEPOOLVIEW = "AcThreekingdomsRechargePoolView";
        POPUP.ACTHREEKINGDOMSRECHARGEACHIEVEPOPUPVIEW = "AcThreekingdomsRechargeAchievePopupView";
        /**
         * 三国红颜
         */
        POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW = "AcThreekingdomsOfWifeDetailPopupView";
        POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW2 = "AcThreekingdomsOfWifeDetailPopupView|2";
        POPUP.ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW4 = "AcThreekingdomsOfWifeDetailPopupView|4";
        /**
         * 财神祝福
         */
        POPUP.ACBLESSINGOFMAMMONREWARDPOPUPVEW = "AcBlessingOfMammonRewardPopupView";
        /**
         * 大icon扩展弹窗
         */
        POPUP.BIGICONLEFTMOREPOPUPVEW = "BigIconLeftMorePopupView";
        /**
         * 酒神诗仙
         */
        POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW = "AcSkinOfLibaiDetailPopupView";
        POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW2 = "AcSkinOfLibaiDetailPopupView|2";
        POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW4 = "AcSkinOfLibaiDetailPopupView|4";
        /**
         * 万物复苏
         */
        POPUP.ACRECOVERYDETAILPOPUPVIEW = "AcRecoveryDetailPopupView";
        POPUP.ACRECOVERYDETAILPOPUPVIEW2 = "AcRecoveryDetailPopupView|2";
        POPUP.ACRECOVERYDETAILPOPUPVIEW4 = "AcRecoveryDetailPopupView|4";
        /**
         * 新好友邀请
         */
        POPUP.NEWINVITEREWARDPOPUPVIEW = "NewInviteRewardPopupView";
        POPUP.NEWINVITEUSERINFOPOPUPVIEW = "NewInviteUserinfoPopupView";
        /**
         * 召回玩家
         */
        POPUP.PLAYERCOMEBACKREWARDPOPUPVIEW = "PlayerComeBackRewardPopupView";
        POPUP.PLAYERCOMEBACKUSERINFOPOPUPVIEW = "PlayerComeBackUserinfoPopupView";
        /**
         * 群雄逐鹿
         */
        //奖励界面
        POPUP.ACCROSSSERVERHEGEMONYREWARDVIEW = "AcCrossServerHegemonyRewardView";
        //群雄争霸 对战详情界面
        POPUP.ACCROSSSERVERHEGEMONYMATCHVIEW = "AcCrossServerHegemonyMatchView";
        POPUP.ACCROSSSERVERHEGEMONYMATCHVIEWTAB2 = "AcCrossServerHegemonyMatchView|2";
        POPUP.ACCROSSSERVERHEGEMONYMATCHVIEWTAB3 = "AcCrossServerHegemonyMatchView|3";
        POPUP.ACCROSSSERVERHEGEMONYMATCHVIEWTAB4 = "AcCrossServerHegemonyMatchView|4";
        //群雄争霸 人气排行
        POPUP.ACCROSSSERVERHEGEMONYFLAGVIEW = "AcCrossServerHegemonyFlagView";
        //群雄争霸 人气排行规则说明
        POPUP.ACCROSSSERVERHEGEMONYFLAGRULEPOPUPVIEW = "AcCrossServerHegemonyFlagRulePopupView";
        //群雄争霸  榜单
        POPUP.ACCROSSSERVERHEGEMONYRANKLISTPOPUPVIEW = "AcCrossServerHegemonyRankListPopupView";
        //群雄争霸  派遣门客
        POPUP.ACCROSSSERVERHEGEMONYBATTLEVIEW = "AcCrossServerHegemonyBattleView";
        //群雄争霸  联盟对战信息
        POPUP.ACCROSSSERVERHEGEMONYDETAILPOPUPVIEW = "AcCrossServerHegemonyDetailPopupView";
        //群雄争霸  帮派阵容
        POPUP.ACCROSSSERVERHEGEMONYWARJOINPOPUPVIEW = "AcCrossServerHegemonyWarJoinPopupView";
        //群雄争霸  门客选择
        POPUP.ACCROSSSERVERHEGEMONYSELECTSERVANTPOPUPVIEW = "AcCrossServerHegemonySelectServantPopupView";
        //群雄争霸  战斗回放
        POPUP.ACCROSSSERVERHEGEMONYBATTLESHOWVIEW = "AcCrossServerHegemonyBattleShowView";
        //群雄争霸  战斗结果
        POPUP.ACCROSSSERVERHEGEMONYBATTLERESULTVIEW = "AcCrossServerHegemonyBattleResultVIew";
        /** 帮会战 -- 计策选择界面 */
        POPUP.ACCROSSSERVERHEGEMONYSELECTPLANPOPUPVIEW = "AcCrossServerHegemonySelectPlanPopupView";
        /** 帮会战 -- 计策使用界面 */
        POPUP.ACCROSSSERVERHEGEMONYUSEPLANPOPUPVIEW = "AcCrossServerHegemonyUsePlanPopupView";
        // 使用战旗
        POPUP.ACCROSSSERVERHEGEMONYUSEFLAGPOPUPVIEW = "AcCrossServerHegemonyUseFlagPopupView";
        //兔宝弹窗
        POPUP.ACRABBITCOMINGSHOPVIEW = "AcRabbitComingShopView";
        POPUP.ACRABBITCOMINGREWARDPOPUPVIEW = "AcRabbitComingRewardPopupView";
        POPUP.ACRABBITCOMINGREWARDPOPUPVIEW3 = "AcRabbitComingRewardPopupView|3";
        POPUP.ACRABBITCOMINGRANKVIEW = "AcRabbitComingRankView";
        POPUP.ACRABBITCOMINGRANKVIEW2 = "AcRabbitComingRankView|2";
        POPUP.ACRABBITCOMINGRANKVIEW3 = "AcRabbitComingRankView|3";
        //朝廷诏令排行榜
        POPUP.ACCHAOTINGRANKLISTPOPUPVIEW = "AcChaoTingRankListPopupView";
        //评定匈奴
        POPUP.ACBEATXIONGNUREWARDVIEW = "AcBeatXiongNuRewardView";
        POPUP.ACBEATXIONGNUREWARDVIEW2 = "AcBeatXiongNuRewardView|2";
        POPUP.ACBEATXIONGNUREWARDVIEW4 = "AcBeatXiongNuRewardView|4";
        /**
         * 清风纸鸢
         */
        POPUP.ACKITEDETAILPOPUPVIEW = "AcKiteDetailPopupView";
        POPUP.ACKITEDETAILPOPUPVIEWTAB2 = "AcKiteDetailPopupView|2";
        POPUP.ACKITERANKDETAILPOPUPVIEW = "AcKiteRankDetailPopupView";
        /**
         * 兰亭荷花
         */
        POPUP.ACLOTUSDETAILPOPUPVIEW = "AcLotusDetailPopupView";
        POPUP.ACLOTUSDETAILPOPUPVIEW2 = "AcLotusDetailPopupView|2";
        POPUP.ACLOTUSDETAILPOPUPVIEW4 = "AcLotusDetailPopupView|4";
        POPUP.ACLOTUSRANKDETAILPOPUPVIEW = "AcLotusRankDetailPopupView";
        /**切换线路 */
        POPUP.SELECTLINEPOPUPVIEW = "SelectLinePopupView";
        /**跨服权势 */
        POPUP.ACCROSSSERVERPOWERUSEFLAGPOPUPVIEW = "AcCrossServerPowerCheerUseFlagPopupView";
        POPUP.ACCROSSSERVERPOWERCHEERRULEPOPUPVIEW = "AcCrossServerPowerRulePopupView";
        /**跨服亲密 */
        POPUP.ACCROSSSERVERIMACYUSEFLAGPOPUPVIEW = "AcCrossServerIntimacyCheerUseFlagPopupView";
        POPUP.ACCROSSSERVERIMACYCHEERRULEPOPUPVIEW = "AcCrossServerIntimacyRulePopupView";
        /**风云擂台 */
        POPUP.ACCROSSATKRACECHEERUSEFLAGPOPUPVIEW = "AcCrossAtkraceCheerUseFlagPopupView";
        POPUP.ACCROSSATKRACECHEERRULEPOPUPVIEW = "AcCrossAtkraceCheerRulePopupView";
        /**
         * 神器迷宫
         */
        POPUP.ACWEAPONMAZEDETAILPOPUPVIEW = "AcWeaponMazeDetailPopupView";
        POPUP.ACWEAPONMAZEDETAILPOPUPVIEW2 = "AcWeaponMazeDetailPopupView|2";
        POPUP.ACWEAPONMAZEDETAILPOPUPVIEW4 = "AcWeaponMazeDetailPopupView|4";
        /**
         * 端午节活动【粽夏连连看】
         */
        POPUP.ACFINDSAMEREWARDPOPVIEW = "AcFindSameRewardPopView";
        POPUP.ACFINDSAMEREWARDPOPVIEWTab3 = "AcFindSameRewardPopView|3";
        POPUP.ACFINDSAMEREWARDPOPVIEWTab4 = "AcFindSameRewardPopView|4";
        POPUP.ACFINDSAMESKINPOPUPVIEW = "AcFindSameSkinPopupView";
        //红包来了
        POPUP.ACREDPACKRESULTVIEW = "AcRedPackResultView";
        //棋社对弈
        POPUP.ACCHESSREWARDPOPVIEW = "AcChessRewardPopView";
        POPUP.ACCHESSREWARDPOPVIEWTAB2 = "AcChessRewardPopView|1";
        POPUP.ACCHESSSHOWVIEW = "AcChessShowView";
        POPUP.ACCHESSSKINPOPUPVIEW = "AcChessSkinPopupView";
        //骑士选拔
        POPUP.ACKNIGHTREWARDPOPVIEW = "AcKnightRewardPopView";
        POPUP.ACKNIGHTREWARDPOPVIEWTAB2 = "AcKnightRewardPopView|1";
        POPUP.ACKNIGHTREWARDPOPVIEWTAB4 = "AcKnightRewardPopView|3";
        /**
         * 皇城六部
         */
        POPUP.SIXSECTION1TITLEPOPUPVIEW = "SixSection1TitlePopupView";
        POPUP.SIXSECTION1HOLDSEATPOPUPVIEW = "SixSection1HoldSeatPopupView";
        POPUP.SIXSECTION1TITLEHOLDPOPUPVIEW = "SixSection1TitleHoldPopupView";
        POPUP.SIXSECTION1SELECTSERVANTPOPUPVIEW = "SixSection1SelectServantPopupView";
        POPUP.SIXSECTION1SEATINFOPOPUPVIEW = "SixSection1SeatInfoPopupView";
        POPUP.SIXSECTION1BATTLEADDDETAILPOPUPVIEW = "SixSection1BattleAddDetailPopupView";
        //青莲茶香
        POPUP.ACDRINKTEAREWARDPOPVIEW = "AcDrinkTeaRewardPopView";
        POPUP.ACDRINKTEAREWARDPOPVIEWTAB2 = "AcDrinkTeaRewardPopView|1";
        POPUP.ACDRINKTEAREWARDPOPVIEWTAB4 = "AcDrinkTeaRewardPopView|3";
        /** 神器分解*/
        POPUP.WEAPONRESOLVEPOPVIEW = "WeaponResolvePopView";
        POPUP.WEAPONRESOLVEITEMUSEPOPUPVIEW = "WeaponResolveItemUsePopView";
        /**
         * 鼠来如意
         */
        POPUP.ACMOUSECOMEDETAILPOPUPVIEW = "AcMouseComeDetailPopupView";
        POPUP.ACMOUSECOMEDETAILPOPUPVIEWTAB2 = "AcMouseComeDetailPopupView|2";
        POPUP.ACMOUSECOMEDETAILPOPUPVIEWTAB4 = "AcMouseComeDetailPopupView|4";
        POPUP.ACMOUSECOMEREWARDPOPUPVIEW = "AcMouseComeRewardPopupView";
        POPUP.ACMOUSECOMERANKDETAILPOPUPVIEW = "AcMouseComeRankDetailPopupView";
        /**
         * 神兵宝库
         */
        POPUP.ACWEAPONHOUSEPOPUPVIEW = "AcWeaponHousePopupView";
        POPUP.ACWEAPONHOUSERANKPOPUPVIEW = "AcWeaponHouseRankPopupView";
        POPUP.ACWEAPONHOUSERANKSHOWPOPUPVIEW = "AcWeaponHouseRankShowPopupView";
        POPUP.ACWEAPONHOUSERANKPOPUPVIEWTAP2 = "AcWeaponHouseRankPopupView|1";
        /**
         * 夜观天象
         */
        POPUP.ACNIGHTSKYDETAILPOPUPVIEW = "AcNightSkyDetailPopupView";
        POPUP.ACNIGHTSKYDETAILPOPUPVIEWTAB3 = "AcNightSkyDetailPopupView|3";
        /**
         * 滨海伊人
         */
        POPUP.ACSEAWOMANPOPVIEW = "AcSeaWomanPopView";
        POPUP.ACSEAWOMANPOPVIEWTAB3 = "AcSeaWomanPopView|3";
        /**
         * 	情定鹊桥
         */
        POPUP.ACBIRDBRIDGEPOPVIEW = "AcBirdBridgePopView";
        POPUP.ACBIRDBRIDGEPOPVIEWTAB2 = "AcBirdBridgePopView|2";
        POPUP.ACBIRDBRIDGEPOPVIEWTAB3 = "AcBirdBridgePopView|3";
        /**
         * 情定鹊桥
         */
        POPUP.BIRDBRIDGECHOOSEVIEW = "BirdBridgeChooseView";
        //天籁之音
        POPUP.ACSKYSOUNDREWARDPOPVIEW = "AcSkySoundRewardPopView";
        POPUP.ACSKYSOUNDREWARDPOPVIEWTAB2 = "AcSkySoundRewardPopView|1";
        POPUP.ACSKYSOUNDREWARDPOPVIEWTAB4 = "AcSkySoundRewardPopView|3";
        //天魔铠甲
        POPUP.ACSKYARMORREWARDPOPVIEW = "AcSkyArmorRewardPopView";
        POPUP.ACSKYARMORREWARDPOPVIEWTAB2 = "AcSkyArmorRewardPopView|1";
        POPUP.ACSKYARMORREWARDPOPVIEWTAB4 = "AcSkyArmorRewardPopView|3";
        POPUP.ACSKYARMORRANKDETAILPOPUPVIEW = "AcSkyArmorRankDetailPopupView";
        //求签问卜
        POPUP.ACASKGODACHREWARDPOPVIEW = "AcAskGodAchRewardPopView";
        POPUP.ACASKGODPREREWARDPOPVIEW = "AcAskGodPreRewardPopView";
        POPUP.ACASKGODSKINREWARDPOPVIEW = "AcAskGodSkinRewardPopView";
        POPUP.ACASKGODREWARDPOPUPVIEW = "AcAskGodRewardPopupView";
        /**
         * 跨服门客冲榜排行奖励
         */
        POPUP.ACCROSSRANKREWPOPUPVIEW = "AcCrossRankRewPopupView";
        /**
         * 跨服门客排行榜
         */
        POPUP.ACCROSSRANKPOPUPVIEW = "AcCrossRankPopupView";
        /**
         * 跨服门客任务
         */
        POPUP.ACCROSSTASKPOPUPVIEW = "AcCrossTaskPopupView";
        /**新服预约 */
        POPUP.ACNEWAPPOINTPREVIEWGIFTDETAILPOPUPVIEW = "AcNewappointPreviewGiftDetailPopupView";
        /**
         * 鼠来招财
         */
        POPUP.ACMOUSEGOLDREWARDPOPVIEW = "AcMouseGoldRewardPopView";
        POPUP.ACMOUSEGOLDREWARDPOPVIEWTAB2 = "AcMouseGoldRewardPopView|1";
        POPUP.ACMOUSEGOLDREWARDPOPVIEWTAB4 = "AcMouseGoldRewardPopView|3";
        POPUP.ACMOUSEGOLDRANKDETAILPOPUPVIEW = "AcMouseGoldRankDetailPopupView";
        /**
         * 权倾天下
         */
        POPUP.ACPOWERFULLDETAILVIEW = "AcPowerFullDetailView";
        POPUP.ACPOWERFULLDETAILVIEWTAB2 = "AcPowerFullDetailView|2";
        POPUP.ACPOWERFULLDETAILVIEWTAB4 = "AcPowerFullDetailView|4";
        /**
         * 情系良缘
         */
        POPUP.ACGOODMATCHDETAILPOPUPVIEW = "AcGoodMatchDetailPopupView";
        POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3 = "AcGoodMatchDetailPopupView|3";
        POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB4 = "AcGoodMatchDetailPopupView|4";
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
         *  天梯战斗
         */
        BASE.LADDERBATTLEWIN = "LadderBattleWin";
        /**
         *  宠幸得到孩子
         */
        BASE.WIFEGETCHILDVIEW = "WifeGetChildView";
        /**
         *  宠幸红颜动画
         */
        BASE.WIFELOVEANIVIEW = "WifeLoveAniView";
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
        BASE.ROOKIEENSTORYVIEW = "RookieEnStoryView";
        BASE.CHOOSESEXVIEW = "ChooseSexView";
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
         *  接受拜访成功界面
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
        BASE.ACCOMMONREPORTVIEW = "AcCommonReportView";
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
        BASE.NEWITEMUSESUCCESSVIEW = "NewItemUseSuccessView";
        /**
         *  韩国条款界面
         */
        BASE.KRAGREEMENTVIEW = "KRAgreementView";
        /**
         *  册封成功界面
         */
        BASE.WIFESTATUSSHOWVIEW = "WifestatusShowView";
        /**
         *  八王夺帝
         */
        BASE.EMPERORWARBATTLERESULTVIEW = "EmperorwarBattleResultView";
        BASE.EMPERORWARROUNDRESULTVIEW = "EmperorwarRoundResultView";
        BASE.PRESTIGEDISPLAYVIEW = "PrestigeDisplayView";
        BASE.ACJD618VIEW = "AcJD618View";
        /**
         * 金銮殿
         */
        BASE.DECREEPAPERINFOVIEW = "DecreePapeInfoView";
        BASE.DECREEPAPERVIEW = "DecreePaperView";
        /**
         * 七夕灯会
         */
        BASE.ACDOUBLESEVENTHAVGVIEW = "AcDoubleSeventhAVGView";
        /**
         * 议事院/内阁
         */
        BASE.COUNCILVIEW = "CouncilView";
        //双11红包
        BASE.ACSINGLEDAYENVELOPEVIEW = "AcSingleDayEnvelopeView";
        BASE.ACSINGLEDAYROOKIEVIEW = "AcSingleDayRookieView";
        //门客战引导
        BASE.COUNTRYWAYAVGVIEW = "CountryWarAVGView";
        //财神降临
        BASE.ACTREASUREHUNTWEALTHSUCVIEW = "AcTreasureHuntWealthSucView";
        /**
         * 元旦剧情
         */
        BASE.ACTREASUREHUNTAVGVIEW = "AcTreasureHuntAVGView";
        /**
         * 京城夜赏 剧情
         */
        BASE.ACENJOYNIGHTAVGVIEW = "AcEnjoyNightAVGView";
        BASE.ACAC2020AVGVIEW = "AcAC2020AVGView";
        /**
         * 元旦活动骰子结果
         */
        BASE.ACTREASUREHUNTBOXRESULTVIEW = "AcTreasureHuntBoxResultView";
        BASE.ACENJOYNIGHTBOXRESULTVIEW = "AcEnjoyNightBoxResultView";
        BASE.ACAC2020BOXRESULTVIEW = "AcAC2020BoxResultView";
        /**
         * 爆竹迎新avg
         */
        BASE.ACNEWYEARCRACKERAVGVIEW = "AcNewYearCrackerAVGView";
        /**
         * 转世剧情avg
         */
        BASE.WIFECHANGESEXAVGVIEW = "WifeChangeSexAvgView";
        /**
         * 特殊奖励--获得子嗣
         */
        BASE.SPECIALCHILDGETVIEW = "SpecialChildGetView";
        /**
         * 特殊奖励--获得金榜提名
         */
        BASE.SPECIALCHILDUPGETVIEW = "SpecialChildUpGetView";
        /**
         * 勤王除恶官报板子
         */
        BASE.ALLIANCEWEEKENDREPORTVIEW = "AllianceWeekEndReportView";
        /**
         * 勤王除恶战斗结果板子
         */
        BASE.ALLIANCEWEEKENDBATTLEREPORTVIEW = "AllianceWeekEndBattleReportView";
        /**
         * 勤王除恶战前提示
         */
        BASE.ALLIANCEWEEKENDBATTLETIPBASEVIEW = "AllianceWeekEndBattleTipBaseView";
        /**
         * 神器展示
         */
        BASE.WEAPONCOMEONVIEW = "WeaponComeOnView";
        /**
         * 翻盘奖励提示
         */
        BASE.ACLUCKYDRAWPREVIEW = "AcLuckyDrawPreView";
        /**
         * 暗夜魅影奖励提示
         */
        BASE.ACDESTROYSAMEPREVVIEW = "AcDestroySamePrevView";
        /**
         * 红颜宠幸剪影
         */
        BASE.WIFELOVECUCOLORISVIEW = "WifeLoveCucolorisView";
        /**
         * 周年祈愿皮肤预览弹板
         */
        BASE.ACANNUALPRAYPREVVIEW = "AcAnnualPrayPreView";
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
        BATTLE.NEWATKRACECROSSBATTLEVIEW = "NewAtkracecrossBattleView";
        /**
         * 关卡boss
         */
        BATTLE.BOSSBATTLEVIEW = "BossBattleView";
        /**
         * 副本 战斗界面
         */
        BATTLE.DAILYBOSSBATTLEVIEW = "DailybossBattleView";
        BATTLE.DAILYBOSSNEWBATTLEVIEW = "DailybossnewBattleView";
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
         * 黑市
         */
        BATTLE.ACBLACKMARKETVIEW = "AcBlackMarketView";
        /**
         * 钱庄
         */
        BATTLE.ACBANKBOXVIEW = "AcBankBoxView";
        /**
         * 绝地擂台战斗
         */
        BATTLE.ACBATTLEGROUNDFIGHTVIEW = "AcBattleGroundFightView";
        /**
         * 三国争霸神将突袭战斗
         */
        BATTLE.ACTHREEKINGDOMSHEROATTACKVIEW = "AcThreeKingdomsHeroAttackView";
    })(BATTLE = ViewConst.BATTLE || (ViewConst.BATTLE = {}));
})(ViewConst || (ViewConst = {}));
//# sourceMappingURL=ViewConst.js.map