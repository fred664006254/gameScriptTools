/**
 * author 陈可
 * date 2017/9/11
 * @class ViewConst
 */
namespace ViewConst
{
	/**
	 * 全屏界面，继承commView的界面
	 */
	export namespace COMMON
	{
		/** 用户信息界面 */
		export const PLAYERVIEW:string = "PlayerView";
		/** 打开道具 */
		export const ITEMVIEW_TAB1:string = "ItemView";
		export const ITEMVIEW_TAB2:string = "ItemView|1";
		export const ITEMVIEW_TAB3:string = "ItemView|2";
		export const ITEMVIEW_TAB4:string = "ItemView|3";
		/**打开红颜已迎娶 */
		export const WIFEVIEW_TAB1:string = "WifeView|1";
		/**打开红颜未迎娶 */
		export const WIFEVIEW_TAB2:string = "WifeView|2";
		export const WIFEUNLOCKVIEW:string = "WifeUnLockView";
		export const WIFESTATUSVIEW:string = "WifestatusView";
		export const WIFEALLTALENTVIEW:string = "WifeTalentView|2";
		export const WIFETALENTVIEW3:string = "WifeTalentView|3";
		export const RANKACTIVEVIEW:string = "RankActiveView";
		
		/**
		 * 称帝界面 纪录
		 */
		// export const MONARCHRECORDdVIEW:string="MonarchRecordView";
		
		// /**
		//  * 称帝界面
		//  */
		// export const MONARCHVIEW:string="MonarchView";

		/** 管家 */
		export const HOUSEKEEPERVIEW:string = "HousekeeperView";
		export const HOUSEKEEPERSERVANTPOPUPVIEW:string = "HousekeeperServantPopupView";
		export const HOUSEKEEPERLOADVIEW:string = "HousekeeperLoadView";
		export const HOUSEKEEPERREPORTVIEW:string = "HousekeeperReportView";
		export const PLAYPOINTSREWARDSPOPUPVIEW:string = "PlayPointsRewardsPopupView";
		
		/**
		 * 经营界面
		 */
		export const MANAGEVIEW:string="ManageView";

		/**
		 * 关卡界面
		 */
		export const CHALLENGEVIEW:string="ChallengeView";

		//门客
		export const SERVANTVIEW:string="ServantView";
		export const SERVANTINFOVIEW:string="ServantNewUIView";
		export const SERVANTINFOVIEW_TAB2:string="ServantNewUIView|2";
		export const SERVANTSKINCHANGEVIEW:string="ServantSkinChangeView";
		
		//升官
		export const PROMOTIONVIEW:string="PromotionView";
		/**升官成功 */
		export const PROMOTIONSUCCESSVIEW:string="PromotionSuccessView";

		//政务
		export const AFFAIRVIEW:string="AffairView";
		
		//红颜操作
		export const WIFEOPTVIEW:string="WifeOptView";

		/*
		神器
		*/
		export const SERVANTNEWUIVIEW:string="ServantNewUIView";

		/**
		 * 子嗣
		 */
		export const CHILDVIEW:string="ChildView";

		/**
		 * 创建角色
		 */
		export const CHOOSEROLEVIEW:string="ChooseroleView";

		/**
		 * 排行
		 */
		export const RANKVIEW:string="RankView";
		export const RANKCROSSVIEW:string="RankCrossView";
		export const RANKSINGLEVIEW:string="RankSingleView";
		export const RANKBIOGRAPHYVIEW:string="RankBiographyView";

		export const BIOGRAPHYSHOWVIEW:string="BiographyShowView";
		/**
		 * 聊天
		 */
		export const CHATVIEW:string="ChatView";
		/**
		 * 帮会聊天
		 */
		export const CHATVIEWTAB1:string="ChatView|1";
		/**
		 * 跨服聊天
		 */
		export const CHATVIEWTAB3:string="ChatView|3";
		export const CHATACTIVITYCROSSVIEW:string="ChatActivityCrossView";
		export const ACCROSSSERVERWIFEBATTLECHATVIEW:string="AcCrossServerWifeBattleChatView";
		/**
		 * 媒婆界面
		 */
		export const ADULTVIEW:string="AdultView";
		/**商店热卖页签 */
		export const SHOPVIEW_TAB1:string="ShopView";
		
		/**商店特惠礼包页签 */
		export const SHOPVIEW_TAB2:string="ShopView|1";
		/**商店道具页签 */
		export const SHOPVIEW_TAB3:string="ShopView|1";
		
		/**
		 * 提亲列表界面
		 */
		export const ADULTMARRYVIEW:string="AdultMarryView";
		/**
		 * 拜访列表界面
		 */
		export const ADULTCHOOSEVISITVIEW:string="AdultChooseVisitView";
		/**
		 * 每日任务
		 */
		export const DAILYTASKVIEW:string="DailyTaskView";
		/**
		 * 充值界面
		 */
		// export const RECHARGEVIEW:string="RechargeView";

		/**
		 * vip界面
		 */
		export const VIPVIEW:string="VipView";
		/**
		 * 福利界面--首冲
		 */
		export const WELFAREVIEWFIRSTRECHARGE:string = "WelfareView|FirstRecharge";
		/**
		 * 福利界面--微信关注
		 */
		export const WELFAREVIEWOFFICIALWECHAT:string = "WelfareView|OfficialWeChat";
		/**
		 * 福利界面--签到
		 */
		export const WELFAREVIEWSIGNIN:string = "WelfareView|Signin";
		/**
		 * 福利界面--实名
		 */
		export const WELFAREVIEWREALNAME:string = "WelfareView|Realname";
		/**
		 * 福利界面--功能介绍
		 */
		export const WELFAREVIEWFUNCTIONPREVIEW :string = "WelfareView|FunctionPreview";
		/**
		 * 福利界面--q群福利
		 */
		export const WELFAREVIEWQGROUP :string = "WelfareView|Qgroup";
		/**
		 * 福利界面--1.5倍返利
		 */
		export const WELFAREVIEWREBATE :string = "WelfareView|Rebate";
		/**
		 * 福利界面--2倍返利
		 */
		export const WELFAREVIEWREBATE2 :string = "WelfareView|Rebate2";
		/**
		 * 福利界面--好友邀请
		 */
		export const WELFAREVIEWNEWINVITE :string = "WelfareView|NewInvite";
		/**
		 * 福利界面--召回玩家
		 */
		export const WELFAREVIEWPLAYERCOMEBACK:string = "WelfareView|PlayerComeBack";
		/**
		 * 
		 * 四大谋士
		 */
		export const ACFOURPEOPLEVIEW:string = "AcFourPeopleView";

		/**
		 * 春季庆典
		 */
		export const ACSPRINGCELEBRATE:string = "AcSpringCelebrateView";
		export const ACSPRINGCELEBRATE_TAB1:string = "AcSpringCelebrateView|1";
		export const ACSPRINGCELEBRATE_TAB2:string = "AcSpringCelebrateView|2";
		export const ACSPRINGCELEBRATE_TAB3:string = "AcSpringCelebrateView|3";
		export const ACSPRINGCELEBRATE_TAB4:string = "AcSpringCelebrateView|4";
		/**
		 * 充值＋特权
		 */
		export const RECHARGEVIPVIEW:string = "RechargeVipView";
		export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
		/**
		 * 福利界面--月卡
		 */
		export const WELFAREVIEWMONTHCARD:string = "WelfareView|MonthCard";
		/**
		 * 福利界面--终身卡
		 */
		export const WELFAREVIEWYEARCARD:string = "WelfareView|YearCard";
		/**
		 * 福利界面--天恩赐福
		 */
		export const WELFAREVIEWGODBLESS:string = "WelfareView|GodBless";

		/**
		 * 福利界面--12
		 */
		export const WELFAREVIEWRECHARGEBOX:string = "WelfareView|RechargeBox";
		/**
		 * 管家 
		 */
		export const WELFAREVIEWHOUSEKEEPER:string = "WelfareView|Housekeeper";
		export const WELFAREVIEWGROWGOLD:string = "WelfareView|GrowGold";
		/**
		 * 成就界面
		 */
		export const ACHIEVEMENTVIEW:string="AchievementView";
		/**
		 * 公告
		 */
		export const GAMEANNOUNCEMENtVIEW:string="GameAnnouncementView";
		/**
		 * 感恩回馈
		 */
		export const THANKSGIVINGVIEW:string="ThanksgivingView";

		/**
		 *首冲4倍（泰国）
		 */
		export const FIRSTCHARGEMULTIPLEVIEW:string="FirstchargeMultipleView";
		
		/**
		 * 牢房
		 */
		export const PRISONVIEW:string="PrisonView";

		/**
		 * 帮会充值
		 */
		export const ACALLIANCERECHARFWCOUNTVIEW:string="AcAllianceRechargeCountView";

		/**
		 * 帮会累计充值
		 */
		export const ACALLIANCERECHARFWCOUNTTOTALVIEW:string="AcAllianceRechargeTotalView";


		
		 
 

		export const ACRANKACTIVEVIEW:string="AcRankActiveView";

	
		/**
		 *  宴会详情界面
		 */
		export const DINNERDETAILVIEW:string="DinnerDetailView";

		/**
		 *  宴会奖励界面
		 */
		export const DINNERREWARDVIEW:string="DinnerRewardView";

		/**
		 * 充值奖励
		 */
		export const ACRECHARGEVIEW:string="AcRechargeView";

		/**
		 * 神秘商店
		 */
		export const ACVIPSHOPVIEW:string="AcVipShopView";

		/**
		 * 春节攀升
		 */
		export const ACNEWYEARVIEW:string="AcNewYearView";
		export const ACNEWYEARVIEW_TAB1:string="AcNewYearView|1";
		export const ACNEWYEARVIEW_TAB2:string="AcNewYearView|2";
		 /**
		 * 春节七天乐
		 */
		export const ACNEWYEARSEVENDAYSVIEW:string="AcNewYearSevenDaysView";
		export const ACNEWYEARSEVENDAYSVIEWTAB1:string="AcNewYearSevenDaysView|1";
		export const ACNEWYEARSEVENDAYSVIEWTAB2:string="AcNewYearSevenDaysView|2";

		 /**
		 * 每日礼包
		 */
		export const ACNEWYEARDAILYPACKAGEVIEW:string="AcNewYearDailyPackageView";
		export const ACNEWYEARDAILYPACKAGEVIEW_TAB1:string="AcNewYearDailyPackageView|1";
		export const ACNEWYEARDAILYPACKAGEVIEW_TAB2:string="AcNewYearDailyPackageView|2";

		export const ACNEWYEARSIGNUPVIEW:string="AcNewYearSignUpView";
		export const ACSMASHEGGVIEW:string="AcSmashEggView";
		export const ACCOSTGEMRANKVIEW:string="AcCostGemRankView";

		export const ACNEWYEARREDVIEW:string="AcNewYearRedView";
		export const ACNEWYEARREDRECHARGEVIEW:string="AcNewYearRedRechargeView";
		
		export const ACRECHARGEBOXSPVIEW:string="AcRechargeBoxSPView";

		// export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
		export const ACBLESSINGOFMAMMONVIEW:string="AcBlessingOfMammonView";
		

		

		/**
		 *  惩戒女囚界面
		 */
		export const ACPUNISHVIEW:string="AcPunishView";

		/**
		 *  擂台主界面
		 */
		export const ATKRACEVIEW:string="AtkraceView";

		export const ATKRACEARRESTVIEW:string="AtkraceArrestView";

		/**
		 *  擂台/来访消息
		 */
		export const ATKRACEVISITVIEW:string="AtkraceVisitView";
		/**
		 *  跨服擂台/来访消息
		 */
		export const ATKRACECROSSVISITVIEW:string="AtkraceCrossVisitView";
		export const NEWATKRACECROSSVISITVIEW:string="NewAtkraceCrossVisitView";
		
		/**
		 *  擂台/排行榜
		 */
		export const ATKRACERANKLISTVIEW:string="AtkraceRankListView";
		/**
		 *  擂台/门客名望
		 */
		export const ATKRACEFAMEVIEW:string="AtkraceFameView";
		

		/**
		 *  军团主界面
		 */
		export const ALLIANCEVIEW:string="AllianceView";
		export const ALLIANCETASKVIEW:string="AllianceTaskView";
		export const ALLIANCETASKREWARDVIEW:string="AllianceTaskRewardView";
		export const ALLIANCETASKDETAILVIEW:string="AllianceTaskDetailView";
		/**
		 *  没有军团界面
		 */
		export const ALLIANCECREATEVIEW:string="AllianceCreateView";
		export const BOOKROOMVIEW:string = "BookroomView";

		/**
		 * 练武场
		 */
		export const STUDYATKDETAILVIEW:string = "StudyatkDetailView";

		/**
		 * 练武场战斗
		 */
		export const STUDYBATTLEVIEW:string="StudyatkBattleView";
		export const STUDYATKVIEW:string = "StudyatkView"

		/**
		 * 征伐
		 */
		export const CONQUESTVIEW:string = "ConquestView";

		export const TRADEVIEW:string = "TradeView";
		export const TRADERANKLISTVIEW:string = "TradeRankListView";

		/**
		 * 跨服擂台 
		 */
		
		export const ATKRACECROSSSUMMARYVIEW:string = "AtkracecrossSummaryView";
		export const ATKRACECROSSVIEW:string = "AtkracecrossView";
		export const ATKRACECROSSCHALLENGEVIEW:string="AtkraceCrossChallengeView";
		export const ATKRACECROSSRANKLISTVIEW:string="AtkraceCrossRankListView";
		export const ATKRACECROSSARRESTVIEW:string="AtkracecrossArrestView";
		export const ATKRACECROSSACTIVITYREWARDVIEW:string="AtkracecrossActivityRewardView";

		export const ATKRACECROSSFENGYUNRANKLISTVIEW:string="AtkraceCrossFengyunRankListView";

		/**
		 * 	群雄跨服擂台 
		 */
		
		export const NEWATKRACECROSSVIEW:string = "NewAtkracecrossView";
		export const NEWATKRACECROSSCHALLENGEVIEW:string="NewAtkraceCrossChallengeView";
		export const NEWATKRACECROSSRANKLISTVIEW:string="NewAtkraceCrossRankListView";
		export const NEWATKRACECROSSARRESTVIEW:string="NewAtkracecrossArrestView";
		export const NEWATKRACECROSSACTIVITYREWARDVIEW:string="NewAtkracecrossActivityRewardView";
		export const ATKRACECROSSNEWDISPACHVIEW:string = "AtkracecrossnewDispachView";
		export const NEWATKRACECROSSBUFFVIEW:string = "NewAtkracecrossBuffListView";
		export const NEWATKRACECROSSBUFFDETAILVIEW:string = "NewAtkracecrossBuffDetailView";
		export const NEWATKRACECROSSFAMEBATTLEVIEW:string="NewAtkraceCrossFameBattleView";
		export const NEWATKRACECROSSFAMEBATTLERESULTVIEW:string="NewAtkraceCrossFameBattleResultView";
		
		/**
		 * 贸易战斗
		 */
		export const TRADEFIGHTVIEW:string = "TradeFightView";
		/**
		 * 贸易胜利
		 */
		export const TRADEINFOPOPUPVIEW:string = "TradeInfoPopupView";
	
	
		export const BUYMONTHCARDPOPUPVIEW:string = "BuyMonthCardPopupView";
		
		
		/**
		 * 宫廷皮肤兑换
		 */
		export const ACTAILOREXCHANGEVIEW:string="AcTailorExchangeView";

		export const CHATBLOCKVIEW:string="ChatblockView";
		
		export const ACWISHTREEEXCHANGEVIEW:string = "AcWishTreeExchangeView";
		/**
		 * 寻访
		 */
		export const SEARCHVIEW:string = "SearchView";
		/**
		 * 称帝
		 */
		export const PRESTIGEVIEW:string = "PrestigeView";
		export const PALACEHOUSEVIEW:string = "PalaceHouseView";
		export const PALACEHOUSEGROUPVIEW:string = "PalaceHouseGroupView";
		export const PALACEKINGSHOUSEGROUPVIEW:string = "PalaceKingsHouseView";
		/**新皇宫界面 */
		export const PALACENEWVIEW:string = "PalaceNewView";
		
		/**
		 * 修身
		 */
		export const PRACTICEVIEW:string="PracticeView";
		export const PRACTICEABILITYVIEW:string="PracticeAbilityView";
		/*
		*跨服亲密活动主界面
		*/
		export const ACCROSSSERVERINTIMACYENTERVIEW:string="AcCrossServerIntimacyEnterView";
		/**
		 * 称帝战
		*/
		export const EMPERORWARENTERVIEW:string="EmperorWarEnterView";	
		export const EMPERORWARVSVIEW:string="EmperorWarVsView";
		export const EMPERORWARENDSHOWVIEW:string="EmperorWarEndShowView";
		/**
		 * 分封
		*/
		export const PROMOTEVIEW:string="PromoteView";	
		/**
		 *  端午活动
		 */
		export const ACDGRAGONBOATDAYVIEW:string="AcDragonBoatDayView";

		/**
		 * 好友系统
		 */
		export const FRIENDVIEW:string = "FriendView";

		/*
		*跨服权势活动主界面
		*/
		export const ACCROSSSERVERCROSSENTERVIEW:string="AcCrossServerPowerEnterView";
		export const ACCROSSSERVERSJVIEW:string="AcCrossPowerSjView";
		/**
		 *  美女冲榜活动
		 */
		export const ACDRAFTVIEW:string="AcDraftView";
		export const ACDRAFTVOTEVIEW:string="AcDraftVoteView";


		//好友
		export const FRIENDSVIEW:string ="FriendView";
		//好友
		export const QQVIDEOGUIDEVIEW:string ="QqvideoguideView";

		export const FQSTRATEGYVIEW:string = "FqStrategyView"; 
		export const FQSTRATEGYVIEWTAB3:string = "FqStrategyView|2";
		export const COUNCILEVENTVIEW:string = "CouncilEventView";

		export const TITLELEVELUPVIEW:string="TitleLevelUpView";
		//皮肤
		export const SKINVIEW:string="SkinView";
		export const SKINDETAILVIEW:string="SkinDetailView";
		export const SKINLEVELUPVIEW:string="SkinLevelupView";
		//玩家回归
		export const PLAYERRETURNVIEW:string="PlayerReturnView";	
		//围剿鳌拜
		export const ACWIPEBOSSENTERVIEW="AcWipeBossEnterView";	
		export const ACWIPEBOSSSEARCHRESULTVIEW="AcWipeBossSearchResultView";	
		export const ACWIPEBOSSBATTLEVIEW="AcWipeBossBattleView";	
		//帮会战首页
		export const ALLIANCEWARVIEW="AllianceWarView";	
		export const ALLIANCEWARVSVIEW="AllianceWarVsView";	
		export const ALLIANCEWARSHOWANTIVIEW="AllianceWarShowAntiView";	

		//勤王除恶
		/**勤王除恶主界面 */
		export const ALLIANCEWEEKENDVIEW="AllianceWeekEndView";	

		// 场景更换
		export const CHANGEBGVIEW="ChangebgView";	
		//查看双十一代金券
		export const ACSINGLEDAYCOUPONVIEW:string = "AcSingleDayCouponView";
		//仙人馈赠楼层
		export const ACSINGLEDAYBUILD1VIEW:string = "AcSingleDayBuild1View";
		export const ACSINGLEDAYSKINVIEW:string="AcSingleDaySkinView";
		export const ACSINGLEDAYBUILD3VIEW:string = "AcSingleDayBuild3View"; 
		

		//门客战
		export const COUNTRYWARENTERVIEW : string = 'CountryWarEnterView';
		export const COUNTRYWARVIEW : string = 'CountryWarView';
		export const COUNTRYWARVSVIEW : string = 'CountryWarVsView';
		export const COUNTRYWARSHOWVIEW : string= 'CountryWarShowView';

		/**
		 * 副本 界面
		 */
		export const DAILYBOSSDETILVIEW:string="DailybossDetailView";
		export const DAILYBOSSNEWVIEW:string="DailybossnewView";
		export const DAILYBOSSVIEW:string="DailybossView";

		/**
		 * 圣诞任务view
		 */
		export const ACCHRISTMASTASKVIEW:string="AcChristmasTaskView";
		/**
		 * 元旦剧情战斗界面
		 */
		export const ACTREASUREHUNTFIGHTVIEW="AcTreasureHuntFightView";	
		/**
		 * 京城夜赏 战斗界面
		 */
		export const ACENJOYNIGHTFIGHTVIEW="AcEnjoyNightFightView";	
		export const ACENJOYNIGHTGAMEVIEW="AcEnjoyNightGameView";	
		export const ACENJOYNIGHTITEMVIEW="AcEnjoyNightItemView";	


		export const ACAC2020GAMEVIEW="AcAC2020GameView";	
		export const ACAC2020DRINKVIEW="AcAC2020DrinkView";	
		
		/**
		 * 奖励界面
		 */
		export const ACTREASUREREWARDVIEW="AcTreasureRewardView";	

		/**
		 * 奖励界面1
		 */
		export const ACTREASUREREWARDVIEW_TAB1="AcTreasureRewardView|1";

		/**
		 * 奖励界面2
		 */
		export const ACTREASUREREWARDVIEW_TAB2="AcTreasureRewardView|2";		

		/**除夕动画 */
		export const ACNEWYEARSIGNUPSHARKVIEW:string="AcNewYearSignUpSharkView";

		/**帮会争顶 */
		export const ACBATTLEGROUNDMAPVIEW:string="AcBattleGroundMapView";
		export const ACBATTLEGROUNDARRESTVIEW:string="AcBattleGroundArrestView";
		
		/**绝地擂台详情 */
		export const ACBATTLEDETAILSVIEW:string="AcBattleDetailsView";
		export const ACBATTLEHISTORYRANKVIEW:string="AcBattleHistoryRankVIew";
		export const ACBATTLEGROUNDCHEERVIEW:string="AcBattleGroundCheerView";

		/**风华群芳 */
		export const ACGROUPWIFEBATTLEMAPVIEW:string="AcGroupWifeBattleMapView";
		export const ACGROUPWIFEBATTLEDETAILSVIEW:string="AcGroupWifeBattleDetailsView";
		export const ACGROUPWIFEBATTLEHISTORYRANKVIEW:string="AcGroupWifeBattleHistoryRankView";
		export const ACGROUPWIFEBATTLEGUESSVIEW:string="AcGroupWifeBattleGuessView";		

		/**锦鲤奖励 */
		export const ACLUCKYCARPREWARDVIEW:string="AcLuckyCarpRewardView";
		/**彩蛋奖励 */
		export const ACWEALTHCARPREWARDVIEW:string="AcWealthCarpRewardView";
		/**七日好礼 */
		export const SEVENDAYSSIGNUPVIEW:string="SevenDaysSignUpView";
		/**七日好礼--英文-前佳人展示面板 */
		export const SEVENDAYSSIGNUPFIRSHOWVIEW:string="SevenDaysSignUpFirShowView";
		/**七日好礼--英文-后佳人展示面板 */
		export const SEVENDAYSSIGNUPLASSHOWVIEW:string="SevenDaysSignUpLasShowView";
		/**幸运翻牌*/
		export const ACLUCKYDRAWCHARGEVIEW:string="AcLuckyDrawChargeView";
		/**东海皇陵*/
		export const ACTOMBSEAVIEW:string="AcTombSeaView";
		export const ACTOMBSEARCHRESULTVIEW:string="AcTombSearchResultView";
		export const ACTOMBBATTLEVIEW:string = "AcTombBattleView";

		export const ACLOCTOMBSEAVIEW:string="AcLocTombSeaView";
		export const ACLOCTOMBSEARCHRESULTVIEW:string="AcLocTombSearchResultView";
		export const ACLOCTOMBBATTLEVIEW:string = "AcLocTombBattleView";
		/**仕途回忆*/
		export const OFFICIALCAREERVIEW:string = "OfficialcareerView";
		/**剧情回忆*/
		export const STORYRECALLVIEW:string = "StoryrecallView";
		/**剧情关卡*/
		export const STORYCHALLENGEVIEW:string = "StorychallengeView";
		/**母亲节活动**/
		export const ACMOTHERDAYCHARGEVIEW:string = "AcMotherDayChargeView";
		/**
		 * 京城夜览
		 */
		export const ACENJOYNIGHTREWARDVIEW:string = "AcEnjoyNightRewardView";
		export const ACANNUALCELEBRATION2020REWARDVIEW:string = "AcAnnualCelebration2020RewardView";
				

		/**
		 * 励精图治
		 */
		export const ACBATTLEPASSUNLOCKREWWARDVIEW:string = "AcBattlePassUnlockRewardView";
		export const ACBATTLEPASSUNLOCKNEWREWWARDVIEW:string = "AcBattlePassUnlockNewRewardView";
		/** 
		 * 定军中原
		*/
		export const ACCONQUERMAINLANDWARVIEW:string = "AcConquerMainLandWarView";
		export const ACCONQUERMAINLANDSENDFIGHTVIEW:string = "AcConquerMainLandSendFightView";
		export const ACCONQUERMAINLANDDETAILVIEW:string = "AcConquerMainLandDetailView";
		export const ACCONQUERMAINLANDDETAILRANKVIEW:string = "AcConquerMainLandDetailView|2";
		export const ACCONQUERMAINLANDDETAILARMYVIEW:string = "AcConquerMainLandDetailView|3";
		export const ACCONQUERMAINLANDDETAILTASKVIEW:string = "AcConquerMainLandDetailView|4";
		export const ACCONQUERMAINLANDWARSHOWVIEW:string = "AcConquerMainLandWarShowView";

		//电玩大本营
		/**电玩大本营--任务 */
		export const ACARCADETASKVIEW:string = "AcArcadeTaskView";
		/**电玩大本营--充值 */
		export const ACARCADERECHARGEVIEW:string = "AcArcadeRechargeView";
		/**电玩大本营--兑换 */
		export const ACARCADECLAIMVIEW:string = "AcArcadeClaimView";
		/**电玩大本营--游戏 */
		export const ACARCADEGAMEVIEW:string = "AcArcadeGameView";
		export const TITLEUPGRADELLEVELUPVIEW:string=`TitleUpgradeLevelUpView`;
		/*红颜皮肤升级*/
		export const WIFESKINLEVELUPVIEW:string = `WifeskinLevelUpView`;
		/*红颜皮肤剧情*/
		export const WIFECHATAVGVIEW:string = `WifeChatAvgView`;
		/*科举答题*/
		export const EXAMVIEW:string="ExamView";
		/*结识佳人*/
		export const MEETBEAUTYVIEW:string="MeetBeautyView";
		/*聊天表情*/
		export const EMOTICONVIEW:string = "EmoticonView";
		/**收藏游戏、官路巅峰引导 */
		export const BUREAUCRATGUIDE:string = "BureaucratGuideView";
			//红颜对战 搜索结果
		export const WIFEBATTLESEARCHRESULTVIEW:string="WifebattleSearchResultView";
		////红颜对战  对战结果
		export const WIFEBATTLERESULTVIEW:string="WifebattleResultView";
		////红颜对战  对战
		export const WIFEBATTLEBATTLEVIEW:string="WifebattleBattleView";
		////红颜对战 
		export const WIFEBATTLEVIEW:string="WifebattleView";
		//红颜对战 搜索结果
		export const ACCROSSSERVERWIFEBATTLESEARCHRESULTVIEW:string="AcCrossServerWifeBattleSearchResultView";
		////红颜对战  对战结果
		export const ACCROSSSERVERWIFEBATTLERESULTVIEW:string="AcCrossServerWifeBattleResultView";
		////红颜对战  对战
		export const ACCROSSSERVERWIFEBATTLEBATTLEVIEW:string="AcCrossServerWifeBattleBattleView";
		////红颜对战  对战
		export const ACCROSSSERVERWIFEBATTLEVIEW:string="AcCrossServerWifeBattleView";

		//风华群芳--对战搜索结果
		export const ACGROUPWIFEBATTLESEARCHRESULTVIEW:string="AcGroupWifeBattleSearchResultView";

		/**珍器坊*/
		// 场景更换
		export const ZHENQIFANGVIEW="ZhenqifangView";	
		export const ZHENQIFANGSHOPVIEW:string="ZhenqifangShopView";
		/**国庆节活动 */
		//国庆节任务
		export const ACNATIONALDAYTASKVIEW:string="AcNationalDayTaskView";
		//国庆节充值
		export const ACNATIONALDAYTRECHARGEVIEW:string="AcNationalDayRechargeView";
		//国庆节衣装奖励
		export const ACNATIONALDAYCLOTHERVIEW:string="AcNationalDayClothesView";
		//转生界面
		export const WIFECHANGESEXVIEW:string="WifeChangeSexView";
		export const WIFECHANGESEXSUCCESSVIEW:string="WifeChangeSexSuccessView";
		//天梯
		export const LADDERLOGVIEW:string="LadderLogView";
		export const LADDERRANKVIEW:string="LadderRankView";
		export const LADDERREWARDVIEW:string="LadderRankView|3";
		export const LADDERGOODSVIEW:string="LadderTaskView";
		export const LADDEROPPONENTVIEW:string="LadderOpponentView";
		export const LADDEROPPONENAPPEARTVIEW:string="LadderOpponentAppearView";
		export const LADDERFORMTIONVIEW:string="LadderFormationView";
		export const LADDERBATTLEVIEW:string="LadderBattleView";
		export const LADDERBATTLRESULTEVIEW:string="LadderBattleResultView";

		export const ACCROSSSERVERWIFEALLTALENTVIEW:string = "AcCrossServerWifeTalentView";
		/**
		 * 圣诞奖励
		 */
		export const ACCHRISTMASNEWREWARDVIEW:string="AcChristmasNewRewardView";
		//帝王成就
		export const EMPERORACHIEVEVIEW:string="EmperorAchieveView";
		//明君出巡
		export const EMPEROROUTVIEW:string="EmperorOutView";
		export const EMPEROROUTFIRSTANIVIEW:string="EmperorOutFirstAniView";
		//套环姻缘奖励弹窗
		export const ACTRAVELWITHBEAUTYPLAYREWARDVIEW:string="AcTravelWithBeautyPlayRewardView";
		//三国争霸
		export const ACTHREEKINGDOMSMAPVIEW:string="AcThreeKingdomsMapView";
		export const ACTHREEKINGDOMSBATTLEVIEW:string="AcThreeKingdomsBattleView";
		export const ACTHREEKINGDOMSRANKVIEW:string="AcThreeKingdomsRankView";
		export const ACTHREEKINGDOMSRANKVIEW4:string="AcThreeKingdomsRankView|4";
		export const ACTHREEKINGDOMSREWARDVIEW:string="AcThreeKingdomsRewardView";
		export const ACTHREEKINGDOMSREWARDVIEW2:string="AcThreeKingdomsRewardView|2";
		export const ACTHREEKINGDOMSREWARDVIEW3:string="AcThreeKingdomsRewardView|3";
		export const ACTHREEKINGDOMSREWARDVIEW4:string="AcThreeKingdomsRewardView|4";
		export const ACTHREEKINGDOMSMEETINGVIEW:string="AcThreeKingdomsMeetingView";
		export const ACTHREEKINGDOMSLIMITCHARGEVIEW:string="AcThreeKingdomsLimitChargeView";
		export const ACTHREEKINGDOMSLASTROUNDPRANKVIEW:string="AcThreeKingdomsLastRoundPRankView";
		export const ACTHREEKINGDOMSLASTROUNDZRANKVIEW:string="AcThreeKingdomsLastRoundZRankView";
		export const ACTHREEKINGDOMSCITYWARPRANKVIEW:string="AcThreeKingdomsCityWarPrankView";
		export const ACTHREEKINGDOMSCITYWARREWARDVIEW:string="AcThreeKingdomsCityWarRewardView";
		export const ACTHREEKINGDOMSWARRESULTVIEW:string="AcThreeKingdomsWarResultView";

		export const ACCROSSSERVERPOWERCHEERVIEW:string="AcCrossServerPowerCheerView";
		export const ACCROSSSERVERPOWERCHEERVIEW2:string="AcCrossServerPowerCheerView|2";

		export const ACCROSSSERVERINTIMACYCHEERVIEW:string="AcCrossServerIntimacyCheerView";
		export const ACCROSSSERVERINITMACYCHEERVIEW2:string="AcCrossServerIntimacyCheerView|2";

		export const ACCROSSSERVERWIFEBATTLECHEERVIEW:string="AcCrossServerWifeBattleCheerView";

		export const ACCROSSATKRACECHEERVIEW:string="AcCrossAtkraceCheerView";
		export const ACCROSSATKRACECHEERVIEWTAB2:string="AcCrossAtkraceCheerView|2";
				
		/** 端午节活动【粽夏连连看】*/
		export const ACFINDSAMEVIEW:string = "AcFindSameView";
		export const ACFINDSAMEGAMEVIEW:string = "AcFindSameGameView";

		export const ACMOUSETREASUREGAMEVIEW:string = "AcMouseTreasureGameView";

		/** 【英文】骑士对决】*/
		export const ACKNIGHT:string = "AcKnightView";
		
		/**皇城六部 */
		export const SIXSECTIONVIEW:string="SixSectionView";
		export const SIXSECTION1VIEW:string="SixSection1View";//兵部
		export const SIXSECTION1LOOKENEMYVIEW:string="SixSection1LookEnemyView";//侦查
		export const SIXSECTION1HOLDRESULTVIEW:string="SixSection1HoldResultView";//据点结算
		export const SIXSECTION1SEATBATTLEVIEW:string="SixSection1SeatBattleView";
		export const SIXSECTION1SEATBATTLERESULTVIEW:string="SixSection1SeatBattleResultView";
		export const SIXSECTION1TITLEBATTLEVIEW:string="SixSection1TitleBattleView";	
		export const SIXSECTION1TITLEBATTLERESULTVIEW:string="SixSection1TitleBattleResultView";
		export const SIXSECTION1RECHARGEVIEW:string="SixSection1RechargeView";
		export const SIXSECTION1BATTLEFORMATIONVIEW:string="SixSection1BattleFormationView";//门客阵容
		export const SIXSECTION1BATTLEADDVIEW:string="SixSection1BattleAddView";//门客加成
		export const SIXSECTION1TITLEPRACTICEBATTLEVIEW:string="SixSection1TitlePracticeBattleView";//修身战斗

		/**夜观天象 */
		export const ACNIGHTSKYSTORYVIEW:string="AcNightSkyStoryView";

		/**闲置兑换 */
		export const ACACTIVITYEXCHANGEVIEW: string = "AcActivityExchangeView";
		/**功能解锁特效 */
		export const UNLOCKFUNCTIONVIEW:string="UnlockFunctionView";
		/**天魔铠甲 */
		export const ACSKYARMORSTORYVIEW:string="AcSkyArmorStoryView";		
		/**跨服门客冲榜 */
		export const ACCROSSONESERVERVIEW: string = "AcCrossOneServerView";
		
		/**限时福利 */
		export const ACLIMITGIFTVIEW: string = "AcLimitGiftView";
		
		/**新服预约 */
		export const ACNEWAPPOINTPREVIEWVIEW:string="AcNewappointPreviewView";

		/**新版三国争霸 */
		export const ACNEWTHREEKINGDOMSBUFFVIEW:string="AcNewThreeKingdomsBuffView";//门客buff
		export const ACNEWTHREEKINGDOMSDISPATCHSERVANTVIEW:string="AcNewThreeKingdomsDispatchServantView";//门客派遣
		export const ACNEWTHREEKINGDOMSBATTLEREWARDVIEW:string="AcNewThreeKingdomsBattleRewardView";//战场奖励
		export const ACNEWTHREEKINGDOMSTOKENVIEW:string="AcNewThreeKingdomsTokenView";//战令
		export const ACNEWTHREEKINGDOMSMAPVIEW:string="AcNewThreeKingdomsMapView";//三国争霸
		export const ACNEWTHREEKINGDOMSBATTLEREWARDGUESSREWARDVIEW:string="AcNewThreeKingdomsBattleRewardGuessRewardView";//竞猜奖励
		export const ACNEWTHREEKINGDOMSBTTLEVIEW:string="AcNewThreeKingdomsBattleView";//战斗
		export const ACNEWTHREEKINGDOMSBTTLERESULTVIEW:string="AcNewThreeKingdomsBattleResultView";//战斗
	}
 
	/**
	 * 小弹窗，继承popupview的界面
	 */
	export namespace POPUP
	{	
		/**
		 * 迁服
		 */
		export const QINAFUPOPUPVIEW:string = "QinafuPopupView";
		/**衣装预览 */
		export const CLOSHESPREVIEWWIFEINFOPOPUPVIEW:string = "ChoshespreviewWifeInfoPopupView";
		export const CLOSHESPREVIEWSKINPOPUPVIEW:string = "CloshespreviewSkinPopupView";
		export const CLOSHESPREVIEWSEVRVANTSKINPOPUPVIEW:string = "CloshespreviewSevrvantSkinPopupView";
		/**分享界面 */
		export const SHARECOMMONPOPUPVIEW:string = "ShareCommonPopupView";
		/**
		 * 奖励的详情列表
		 */
		export const MAILREWARDDETAILPOPUPVIEW:string = "MailRewardDetailPopupView";

		/** 皮肤开启光环icon详情面板 */
		export const SKINAURAINFOPOPUPVIEW:string = "SkinAuraInfoPopupView";

		/** 分享奖励面板 */
		export const SHAREPOPUPVIEW:string = "SharePopupView";
		/** 公共奖励面板 */
		export const COMMONREWARDPOPUPVIEW:string = "CommonRewardPopupView";
		/** 道具、物品详情弹板 */
		export const ITEMINFOPOPUPVIEW:string = "ItemInfoPopupView";
		/** 道具详情列表 */
		export const ITEMINFOEXTENDPOPUPVIEW:string = "ItemInfoExtendPopupView";
		/** 使用道具弹板 */
		export const ITEMUSEPOPUPVIEW:string = "ItemUsePopupView";
		export const ITEMHECHENGPOPUPVIEW:string = "ItemHechengPopupView";
		/** 道具跳转弹板 */
		export const ITEMJUMPPOPUPVIEW:string = "ItemJumpPopupView";
		/**错误弹板 *
		export const ERRORPOPUPVIEW:string = "ErrorPopupView";
		/**规则说明弹板 */
		export const RULEINFOPOPUPVIEW:string = "RuleInfoPopupView";
		export const PROBABLYINFOPOPUPVIEW:string = "ProbablyInfoPopupView";
		//门客详情
		export const SERVANTATTRDETAILPOPUPVIEW:string="ServantAttrDetailPopupView";
		//门客详情2新版
		export const SERVANTATTRDETAILSPOPUPVIEW:string="ServantAttrDetailsPopupView";
		//神器详情
		export const WEAPONATTRDETAILSPOPUPVIEW:string="WeaponAttrDetailsPopupView";
		export const WEAPONPROMATIONLISTPOPUPVIEW:string="WeaponPromationListPopupView";
		
		// 查看中奖名单
		export const ACLOTTERYPOPUPVIEW:string = "AcLotteryPopupView";
		/**
		 * 众筹宝箱奖励
		 */
		export const ACLOTTERYBOXREWARDPOPUPVIEW: string =  "AcLotteryBoxRewardPopupView";
		/**
		 * 众筹充值奖励
		 */
		export const ACLOTTERYREWARDPOPUPVIEW: string =  "AcLotteryRewardPopupView";

		/**
		 * 活动冲榜列表
		 */
		export const ACALLIACERANKLISTPOPUPVIEW:string = "AcAlliaceRankListPopupView";


		/**
		 * 累计活动冲榜列表
		 */
		export const ACALLIACEToTalRANKLISTPOPUPVIEW:string = "AcAlliaceToTalRankListPopupView";
		
 
		/**
		 * 离线自动获得资源弹窗
		 */
		export const AUTORESPOPUPVIEW:string="AutoResPopupView";
		/**选择门客界面 */
		export const SERVANTSELECTEDPOPUPVIEW:string = "ServantSelectedPopupView";
		/**选择门客界面 */
		export const WIFESELECTEDPOPUPVIEW:string = "WifeSelectedPopupView";
		
		/**西域商店VIP不足弹窗 */
		export const ACVIPSHOPPOPUPVIEW:string = "AcVipShopPopupView";
		
		/**
		 *  擂台挑战
		 */
		export const ATKRACECHALLENGEVIEW:string="AtkraceChallengeView";
		/**
		 *  跨服擂台挑战
		 */
		export const ATKRACECROSSCHALLENGEVIEW:string="AtkraceCrossChallengeView";
		export const NEWATKRACECROSSCHALLENGEVIEW:string="NewAtkraceCrossChallengeView";
		
		/**使用道具确认取消弹板 */
		export const ITEMUSECONSTPOPUPVIEW:string = "ItemUseConstPopupView";

		/**派遣门客取消弹板 */
		export const SERVANTSENDCONSTPOPUPVIEW:string = "ServantSendConstPopupView";
		
		/**
		 * 确认是否消耗元宝购买物品提示弹出框
		 */
		export const COSTGEMBUYITEMPOPUPVIEW:string = "CostGemBuyItemPopupView";
		/**
		 * 查看寻访建筑信息弹窗
		 */
		export const SEARCHBUILDPOPUPVIEW:string="SearchBuildPopupView";

		/**
		 * 查看寻访建筑帝君阁
		 */
		export const SEARCHBIOGRAPHYPOPUPVIEW:string="SearchBiographyPopupView";

		/**
		 * vip 文字详情
		 */
		export const VIPTXTPOPUPVIEW:string="VipTxtPopupView"; 
		

		/**
		 * 寻访结果弹窗
		 */
		export const SEARCHRESULTPOPUPVIEW:string="SearchResultPopupView";

		/**
		 *主线任务详情弹窗
		 */
		export const MainTASKPOPUPVIEW:string="MainTaskPopupView";

		/** 起名字面板 */
		export const NAMEPOPUPVIEW:string = "NamePopupView";

		/** 玩家改名 */
		export const USERNAMEPOPUPVIEW:string = "UserNamePopupView";

		/**声音选择 */
		export const VOICEPOPUPVIEW:string = "VoicePopupView";

		/**
		 * 排行榜玩家信息弹窗
		 */
		export const RANKUSERINGOPOPUPVIEW:string = "RankUserinfoPopupView";


		/**
		 * 子嗣联姻选择道具
		 */
		export const ADULTCHOOSETYPEVIEW:string = "AdultChooseTypeView";

		/**
		 * 提亲请求列表
		 */
		export const ADULTMARRYREQUESTVIEW:string = "AdultMarryRequestView";
		/**
		 * 拜访请求列表
		 */
		export const ADULTVISITREQUESTVIEW:string = "AdultVisitRequestView";
		/**
		 * 姻缘录
		 */
		export const ADULTYINYUANRECORDVIEW:string = "AdultYinYuanRecordView";
		/**
		 * 搜索玩家
		 */
		export const ADULTSEARCHVIEW:string = "AdultSearchView";
		/**
		 * 选择接待
		 */
		export const ADULTCHOOSERECEICEVIEW:string = "AdultChooseReceiveView";
		
		
		/**
		 * 选择孩子
		 */
		export const ADULTCHOOSECHILDVIEW:string = "AdultChooseChildView";

		export const CHANGEBGDETAILPOPUPVIEW:string = "ChangebgDetailPopupView";
		/**
		 * 每日任务宝箱奖励预览
		 */
		export const DAILYTASK_REWARDPREVIEWPOPUPVIEW:string = "DailyTaskRewardPreviewPopuiView";
		/**
		 * 每日任务宝箱奖励预览
		 */
		export const ACNEWYEARPOPUPVIEW:string = "AcNewYearPopupView";
		export const ACNEWYEARSEVENDAYSPOPUPVIEW:string = "AcNewYearSevenDaysPopupView";
		
		/**
		 * 每日任务宝箱奖励预览
		 */
		export const ACNEWYEARDAILYPOPUPVIEW:string = "AcNewYearDailyPopupView";

		
		/**
		 * 驿站任务宝箱预览
		 */
		export const ACCOURIERPOPUPVIEW:string = "AcCourierPopupView";
		
		
		/**
		 * 邮件列表弹板
		 */
		export const MAILPOPUPVIEW:string = "MailPopupView";
		/**
		 * 邮件详情弹板
		 */
		export const MAILDETAILPOPUPVIEW:string = "MailDetailPopupView";
		/**
		 * 举办宴会
		 */
		export const HOLDDINNERPOPUPVIEW:string = "HoldDinnerPopupView";

		/**
		 * 查找宴会
		 */
		export const DINNERFINDPOPUPVIEW:string = "DinnerFindPopupView";

		/**
		 * 宴会积分兑换
		 */
		export const DINNEREXCHANGEPOPUPVIEW:string = "DinnerExchangePopupView";
		/**
		 * 宴会排行榜
		 */
		export const DINNERRANKPOPUPVIEW:string = "DinnerRankPopupView";

		/**
		 * 选宴会type
		 */
		export const DINNERTYPEPOPUPVIEW:string="DinnerTypePopupView";

		/**
		 * 宴会离线消息
		 */
		export const DINNERMESSAGEPOPUPVIEW:string="DinnerMessagePopupView";

		/**
		 * 宴会消息
		 */
		export const DINNERMSGPOPUPVIEW:string = "DinnerMsgPopupView";

		/**
		 * 宴会分享
		 */
		export const DINNERSHAREPOPUPVIEW:string = "DinnerSharePopupView";

		/**
		 * 宴会记录详情
		 */
		export const DINNERDETAILPOPUPVIEW:string = "DinnerdetailPopupView";
		
		/**
		 * 协议
		 */
		export const AGREEMENTPOPUPVIEW:string = "AgreementPopupView";

		/**
		 * 绑定手机
		 */
		export const BINDINGPHONEPOPUPVIEW:string = "BindingPhonePopupview";
		
		
		/**
		 * 皇宫历史
		 */
		export const PALACEHISTORYPOPUPVIEW:string = "PalaceHistoryPopupView";
		export const PALACEEDITSIGNPOPUPVIEW:string = "PalaceEditSignPopupView";

		/**
		 * 选服列表
		 */
		export const SERVERLISTPOPUPVIEW:string="ServerListPopupView";

		export const ACRANKLISTPOPUPVIEW:string="AcRankListPopupView";
		/**
		 * 成就详情列表
		 */
		export const ACHIEVEMENTDETAILPOPUPVIEW:string="AchievementDetailPopupView";

		/**
		 * 限时活动详情列表
		 */
		export const ACLIMITEDREWARDDETAILPOPUPVIEW:string="AcLimitedRewardDetailPopupView";

		/**
		 * 设置页面
		 */
		export const SettingPopopView:string="SettingPopopView";

		/**
		 * 活动公告
		 */
		export const ACTIVITYPOPVIEW:string="ActivityPopView";

		/**
		 * 联系我们
		 */
		export const SETTINGCONTACTPOPUPVIEW:string="SettingContactPopupView";
		/**
		 * 兑换码
		 */
		export const SettingCDKPopupView:string="SettingCDKPopupView";

		/**
		 * 推送设置
		 */
		export const SETTINGPUSHPOPUPVIEW:string="SettingPushPopupView";

		/**
		 * 帮助
		 */
		export const SETTINGHELPPOPUPVIEW:string="SettingHelpPopupView";

		

		/**
		 * 登录失败弹板
		 */
		
		export const ERRORPOPUPVIEW:string="ErrorPopupView";

		export const SERVANTBOOKLEVELUPPOPUPVIEW:string="ServantBookLevelupPopupView";
		export const SERVANTWIFEEXSKILLPOPUPVIEW:string="ServantWifeExSkillPopupView";
		export const WIFEEXSKILLUNLOCKVIEW:string="WifeExSkillUnlockView";
		
		/**
		 * 红颜赏赐
		 */
		export const WIFEGIVEPOPUPVIEW:string="WifeGivePopupView";

		/**
		 * 寻访运势
		 */
		export const SEARCHLUCKPOPUPVIEW:string="SearchLuckPopupView";

		/**
		 * 红颜技能
		 */
		export const WIFESKILLPOPUPVIEW:string="WifeSkillPopupView";
		/**
		 * 红颜技能2
		 */
		export const WIFEMULTISKILLPOPUPVIEW:string="WifeMultiSkillPopupView";
		/**
		 * 红颜皮肤
		 */
		export const WIFESKINVIEW:string="WifeskinView";
		export const WIFESKINNEWVIEW:string="WifeskinNewView";
		/**
		 * 红颜省亲 选择红颜
		 */
		export const BANISHCHOOSEPOPUPVIEW:string="BanishChoosePopupView";

		/**
		 * 红颜 选择当家
		 */
		export const WIFEDANGJIACHOOSEPOPUPVIEW:string="WifeDangjiaChoosePopupView";
		
		/**
		 * 牢房犯人详情
		 */
		export const PRISONDETAILSPOPUPVIEW:string="PrisonDetailsPopupView";
		/**
		 * 囚犯主图
		 */
		export const PRISONPOPVIEW:string = "PrisonPopView";

		/**
		 * 惩戒女囚买道具
		 */
		export const ACPUNISHBUYITEMPOPUPVIEW:string="AcPunishBuyItemPopupView";

		/**
		 * 惩戒女囚排名奖励
		 */
		export const ACPUNISHRANKREWARDPOPUPVIEW:string="AcPunishRankRewardPopupView";

		export const SERVANTADVANCEPOPUPVIEW:string = "ServantAdvancePopupView";
		/**
		 * 惩戒女囚排行榜
		 */
		export const ACPUNISHRANKPOPUPVIEW:string="AcPunishRankPopupView";

		/**
		 * 惩戒女囚兑换奖励
		 */
		export const ACPUNISHEXPOPUPVIEW:string="AcPunishExPopupView";

		export const BOOKROOMSERVANTSELECTPOPUPVIEW:string="BookroomServantSelectPopupView";
		export const BOOKROOMAUTOSELECTSERVANTPOPUPVIEW:string="BookroomAutoSelectServantPopupView";
		/**
		 * 女囚（泰拳天下）商店兑换
		 */
		export const ACPUNISHSHOPPOPUPVIEW:string="AcPunishShopPopupView";

		/**
		 * 通用确认面板
		 */
		export const CONFIRMPOPUPVIEW:string="ConfirmPopupView";

		/**
		 * 下线面板
		 */
		export const OFFLINEVIEW:string="OfflineView";
		

		/**
		 * 合成道具详情界面
		 */
		export const COMPOSEPOPUPVIEW:string="ComposePopupView";
		export const COMPOSEMULTIPOPUPVIEW:string="ComposeMultiPopupView";
		export const ITEMUSECHOOSEBOOKPOPUPVIEW:string="ItemUseChooseBookPopupView";
		
		
		/**
		 * 创建军团界面
		 */
		export const ALLIANCECREATEPOPUPVIEW:string="AllianceCreatePopupView";
		export const ALLIANCETASKBUFFLISTPOPUPVIEW:string="AllianceTaskBuffListPopupView";
		export const ALLIANCETASKRANKPOPUPVIEW:string="AllianceTaskRankPopupView";
		/**
		 * 副本攻击奖励
		 */
		export const ALLIANCEBOSSATTACKEDPOPUPVIEW:string="AllianceBossAttackedPopupView";
		export const ALLIANCELOGPOPUPVIEW:string="AllianceLogPopupView";
		
		/**
		 * 擂台通用小弹版
		 */
		export const ATKRACEAGREEPOPUPVIEW:string="AtkraceAgreePopupDialog";
		export const ATKRACECROSSAGREEPOPUPDIALOG:string="AtkracecrossAgreePopupDialog";
		export const NEWATKRACECROSSAGREEPOPUPDIALOG:string="NewAtkracecrossAgreePopupDialog";
		export const ATKRACEFIGHTINFOPOPUPVIEW:string="AtkraceFightInfoPopupView";
		export const ATKRACEAUTOFIGHTPOPUPVIEW:string="AtkraceAutoFightPopupView";
		export const ATKRACECROSSAUTOFIGHTPOPUPVIEW:string="AtkracecrossAutoFightPopupView";
		export const NEWATKRACECROSSAUTOFIGHTPOPUPVIEW:string="NewAtkracecrossAutoFightPopupView";
		export const ATKRACEFAMESERVANTPOPUPVIEW:string="AtkraceFameServantPopupView";
		export const ATKRACEFAMEADDINFOPOPUPVIEW:string="AtkraceFameAddInfoPopupView";
		
		/**
		 * 擂台购买属性小弹版
		 */
		export const ATKRACEBUYPOPUPVIEW:string="AtkraceBuyPopupView";
		export const ATKRACECROSSBUYPOPUPVIEW:string="AtkracecrossBuyPopupView";
		export const NEWATKRACECROSSBUYPOPUPVIEW:string="NewAtkracecrossBuyPopupView";
		
		export const STUDYATKFINDPOPUPVIEW:string="StudyatkFindPopupView";

		export const STUDYATKCREATEPOPUPVIEW:string="StudyatkCreatePopupView";

		export const STUDYATKBOOKPOPUPVIEW:string="StudyatkBookPopupView";
		export const STUDYATKFAILEDPOPUPVIEW:string="StudyatkFailedPopupView";
		export const ACBATTLEGROUNDBUYPOPUPVIEW:string="AcBattleGroundBuyPopupView";
		export const ACBATTLEGROUNDAUTOFIGHTVIEW:string="AcBattleGroundAutoFightView";
		/**
		 * 擂台抽奖
		 */
		export const ATKRACEREWARDPOPUPVIEW:string="AtkraceRewardPopupView";
		export const ATKRACECROSSREWARDPOPUPVIEW:string="AtkracecrossRewardPopupView";
		export const ATKRACECROSSDETAILPOPUPVIEW:string="AtkracecrossDetailPopupView";
		export const NEWATKRACECROSSREWARDPOPUPVIEW:string="NewAtkracecrossRewardPopupView";
		export const NewATKRACECROSSDETAILPOPUPVIEW:string="NewAtkracecrossDetailPopupView";
		/*** 群雄跨服 江湖名望*/
		export const NEWATKRACECROSSFAMEPOPUPVIEW:string="NewAtkraceCrossFamePopupView";
		export const NEWATKRACECROSSFAMEHOLDPOPUPVIEW:string="NewAtkraceCrossFameHoldPopupView";
		export const NEWATKRACECROSSFAMEDETAILPOPUPVIEW:string="NewAtkraceCrossFameDetailPopupView";
		/** 擂台/门客免战界面 */
		export const ATKRACESERVANTAVOIDPOPUPVIEW  = "AtkraceServantAvoidPopupView";
		
		/**
		 * 帮会榜单
		 */
		export const ALLIANCERANKPOPUPVIEW:string="AllianceRankPopupView";
		export const ALLIANCERANKPOPUPVIEW2:string="AllianceRankPopupView|1";

		/**
		 * 帮会管理
		 */
		export const ALLIANCEMANAGEPOPUPVIEW:string="AllianceManagePopupView";

		/**
		 * 帮会申请
		 */
		export const ALLIANCEAPPLYPOPUPVIEW:string="AllianceApplyPopupView";
		/**
		 * 副本积分兑换
		 */
		export const DAILYBOSSSCROEPOPUPVIEW:string="DailybossScroePopupView";
		export const DAILYBOSSNEWSCROEPOPUPVIEW:string="DailybossnewScroePopupView";
		

		/**
		 * 副本排行榜
		 */
		export let DAILYBOSSRANKPOPUPVIEW:string="DailybossRankPopupView";
		export let DAILYBOSSNEWRANKPOPUPVIEW:string="DailybossnewRankPopupView";
		

		/**
		 * 副本奖励
		 */
		export let DAILYBOSSATTACKEDPOPUPVIEW:string="DailybossAttackedPopupView";
		export let DAILYBOSSNEWAWARDPOPUPVIEW:string="DailybossnewRewardPopupView";

		/**
		 * 副本伤害排行
		 */
		export let DAILYBOSSDAMAGERANKPOPUPVIEW:string="DailybossDamageRankPopupView";

			
		/**
		 * 帮会成员
		 */
		export const ALLIANCEMEMBERPOPUPVIEW:string="AllianceMemberPopupView";
		/**
		 * 帮会查询
		 */
		export const ALLIANCEFINDPOPUPVIEW:string="AllianceFindPopupView";
		/**
		 * 帮会信息
		 */
		export const ALLIANCEINFOPOPUPVIEW:string="AllianceInfoPopupView";
		/**
		 * 设置职位
		 */
		export const ALLIANCESETPOPOPUPVIEW:string="AllianceSetPoPopupView";
		/**
		 * 其他帮会信息
		 */
		export const ALLIANCESHOWINFOPOPUPVIEW:string="AllianceShowInfoPopupView";
		/**
		 * 转移帮主
		 */
		export const ALLIANCETURNPOPUPVIEW:string="AllianceTurnPopupView";
		/**
		 * 帮会倒计时
		 */
		export const ALLIANCETIMEPOPUPVIEW:string="AllianceTimePopupView";

		/**
		 * 帮会公告详情
		 */
		export const ALLIANCEDETAILSPOPUPVIEW:string="AllianceDetailsPopupView";
		

		/**
		 * 中午副本战斗结算界面
		 */
		export const DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW:string="DailybossType1BattleResultPopupView";

		/**
		 * 副本排名奖励
		 */
		export const DAILYBOSSRANKREWARDPOPUPVIEW:string="DailybossRankRewardPopupView";
		/**
		 * 帮会密码
		 */
		export const ALLIANCEPSWDPOPUPVIEW:string="AlliancePswdPopupView";
		/**
		 * 帮会建设
		 */
		export const ALLIANCEBUILDPOPUPVIEW:string="AllianceBuildPopupView";
		/**
		 * 帮会兑换
		 */
		export const ALLIANCEEXPOPUPVIEW:string="AllianceExPopupView";

		export const ALLIANCEBOSSPOPUPVIEW:string = "AllianceBossPopupView";
		export const ALLIANCEBOSSOPENPOPUPVIEW:string = "AllianceBossOpenPopupView";
		export const ALLIANCEBOSSRANKOPUPVIEW:string="AllianceBossRankPopupView";

		/**
		 * 抓住囚犯
		 */
		export const CATCHPRISONPUPUPVIEW:string="CatchPrisonPopupView";
		
		/**
		 * 副本 最后一击奖励
		 */
		export const DAILYBOSSLASTATTACKPOPUPVIEW:string="DailybossLastAttackPopupView";

		/**
		 * 网络报错界面
		 */
		export const NETERRORPOPUPVIEW:string="NetErrorPopupView";

		/**
		 * 强制升级界面
		 */
		export const WEIDUANUPGRADEPOPUPVIEW:string="WeiduanUpgradePopupView";
		
		/**
		 * 玩吧领奖
		 */
		export const GETGIFTPOPUPVIEW:string="GetGiftPopupView";

		/**
		 * 玩吧回归礼包
		 */
		export const RETURNREWARDPOPUPVIEW:string="ReturnRewardPopupView";
		/**
		 * 玩吧兑换奖
		 */
		export const BUYGIFTPOPUPVIEW:string="BuyGiftPopupView";
		/**
		 * 征伐排行
		 */
		export const CONQUESTRANKPOPUPVIEW:string="ConquestRankPopupView";
		/**
		 * 一键征伐
		 */
		export const CONQUESTBATCHPOPUPVIEW:string="ConquestBatchPopupView";

		/**
		 * 征伐胜利
		 */
		export const CONQUESTWINPOPUPVIEW:string="ConquestWinPopupView";
		/**
		 * 一键征伐奖励纪录
		 */
		export const CONQUESTINFOPOPUPVIEW:string="ConquestInfoPopupView";
		/**
		 * 一键贸易
		 */
		export const TRADEONEKEYPOPUPVIEW:string="TradeOneKeyPopupView";

		/**
		 * 领取糖果
		 */
		export const CANDYGETPOPUPVIEW:string="CandyGetPopupView";

		/**
		 * 关注界面
		 */
		export const ATTENTIONPOPUPVIEW:string="AttentionPopupView";
		
		/**
		 * 一键推关
		 */
		export const CHALLENGEAUTOPOPUPVIEW:string="ChallengeAutoPopupView";

		/**
		 * 一键推关奖励
		 */
		export const CHALLENGEAUTOREWARDSPOPUOVIEW:string="ChallengeAutoRewardsPopupView";
		
		export const ACTAILORREWARDPOPUPVIEW:string="AcTailorRewardPopupView";

		/**
		 * 至劲重置密码
		 */
		export const SETPASSWORDPOPUPVIEW:string="SetPasswordPopupView";
		/**
		 * 至劲重置密码
		 */
		export const DOWNLOADPACKAGEPOPUPVIEW:string="DownloadPackagePopupView";

		/**
		 * 下载微端
		 */
		export const DOWNLOADVIEW:string="DownloadView";

		/**
		 * 称帝详情
		 */
		export const PRESTIGEINFOPOPUPVIEW:string="PrestigeInfoPopupView";

		/**
		 * 声望日志
		 */
		export const PRESTIGELOFPOPUPVIEW:string="PrestigeLogPopupView";

		/**
		 * 特权详情
		 */
		export const PRESTIGEITEMPOPUPVIEW:string="PrestigeItemPopupView";

		export const PRACTICEABILITYDETAILSPOPUPVIEW:string="PracticeAbilityDetailsPopupView";
		export const PRACTICESTORAGEPOPIPVIEW:string="PracticeStoragePopupView";
		export const PRACTICEGETPOPUPVIEW:string="PracticeGetPopupView";
		/**
		 *  五一转盘排行榜
		 */
		export const ACTMAYDAYRANKPOPUPVIEW:string="AcMayDayRankPopupView";
		/**
		 * 转盘奖励物品
		 */
		export const ACMAYDAYREWARDPOPUPVIEW:string="AcMayDayRewardPopupView";

		/**
		 * 实名认证奖励面板
		 */
		export const REAlNAMEPOPUPVIEW:string="RealnamePopupView";
		/**
		 * 实名认证2面板
		 */
		export const REAlNAME2POPUPVIEW:string="Realname2PopupView";

		export const REALNAMECONSTRAINTPOPUPVIEW:string="RealnameconstraintPopupView";

		/**
		 * 实名认证3面板
		 */
		export const REAlNAME3POPUPVIEW:string="Realname3PopupView";
		/**
		 * 实名认证领取奖励面板
		 */
		export const REALNAMEREWARDSPOPUPVIEW:string="RealnamerewardsPopupView";
		/**
		 * 册封选择位分面板
		 */
		export const WIFESTATUSPOPUPVIEW:string="WifestatusPopupView";
		/**
		 * 册封红颜属性面板
		 */
		export const WIFESTATUSWIFEPOPUPVIEW:string="WifestatusWifePopupView";
		/**
		 * 红颜技能经验转换道具弹板
		 */
		export const WIFEEXPEXCHANGEPOPUPVIEW:string="WifeExpExchangePopupView";
		

		/**
		 *  跨服亲密奖励一览弹窗
		 */
		export const ACCROSSSERVERINTIMACYREWARDVIEW:string="AcCrossServerIntimacyRewardView";
		export const ACCROSSSERVERINTIMACYRANKLISTVIEW:string="AcCrossServerIntimacyRankListView";
		export const ACCROSSSERVERDETAILPOPUPVIEW:string="AcCrossServerDetailPopupView";

		export const WIFEORSERVANTINFOPOPUPVIEW:string="WifeORServantInfoPopupView";

		export const PRACTICEBATCHBUYPOPUPVIEW:string="PracticeBatchBuyPopupView";
		export const PRACTICEBUYPOPUPVIEW:string="PracticeBuyPopupView";
		export const PRACTICEEXPANDPOPUPVIEW:string="PracticeExpandPopupView";

		/**
		 * 八王争帝报名弹窗
		*/
		export const EMPERORWARSIGNPOPVIEW:string="EmperorWarSignPopView";
		export const EMPERORWARBMCEVIEW:string="EmperorWarBmceView";
		export const EMPERORWARREWARDVIEW:string="EmperorWarRewardView";
		export const EMPERORWARBUZHENVIEW:string="EmperorWarBuzhenView";
		export const EMPERORWARCHEERVIEW:string="EmperorWarCheerView";
		export const EMPERORWARREPLAYPOPUPVIEW:string="EmperorwarReplayPopupView";
		export const EMPERORWARSHOPVIEW:string="EmperorWarShopView";
		export const EMPERORWARDETAILPOPUPVIEW:string="EmperorWarDetailPopupView";
		/** 
		 * 分封弹窗
		*/
		export const PROMOTEPLAYERPOPVIEW:string="PromotePlayerPopView";
		export const PROMOTENOTICEVIEW:string="PromoteNoticeView";
		
		/**
		 * 金銮殿相关
		 */
		export const DECREEPOLICYLISTPOPUPVIEW:string="DecreePolicyListPopupView";
		export const DECREEPOLICYDETAILPOPUPVIEW:string="DecreePolicyDetailPopupView";
		export const DECREEPOLICYCHANGEPOPUPVIEW:string="DecreePolicyChangePopupView";
		export const DECREERESCRIPTDISPLAYPOPUPVIEW:string="DecreeRescriptDisplayPopupView";
		export const DECREEPAPERCHOOSEPOPUPVIEW:string="DecreePaperChoosePopupView";
		export const DECREEPOLICYCHOOSEPOPUPVIEW:string="DecreePolicyChoosePopupView";
		export const DECREEPAPERDETAILPOPUPVIEW:string="DecreePaperDetailPopupView";
		/**
		 * 端午排行榜
		 */
		export const DRAGONBOATRANKVIEW:string="AcDragonBoatDayRankView";
		/**
		 *  跨服权势奖励一览弹窗
		 */
		export const ACCROSSSERVERPOWERREWARDVIEW:string="AcCrossServerPowerRewardView";
		export const ACCROSSSERVERPOWERRANKLISTVIEW:string="AcCrossServerPowerRankListView";
		export const ACCROSSPOWERDETAILPOPUPVIEW:string="AcCrossPowerDetailPopupView";
		export const ACCROSSSERVERWIFEBATTLEDETAILPOPUPVIEW:string="AcCrossServerWifeBattleDetailPopupView";
		export const ACCROSSPOWERDBPOPUPVIEW:string="AcCrossPowerDbPopupView";
		export const ACCROSSPOWERDBSUB1POPUPVIEW:string="AcCrossPowerDbSub1PopupView";
		export const ACCROSSPOWERDBSUB2POPUPVIEW:string="AcCrossPowerDbSub2PopupView";
		export const ACCROSSPOWERSJREWARDPOPUPVIEW:string="AcCrossPowerSjRewardPopupView";
		export const ACCROSSPOWERPREREWARDPOPUPVIEW:string="AcCrossPowerPreRewardPopView";
		/**
		 * 黄忠活动
		 */
		export const ACARCHERRECHARGEPOPUPVIEW:string="AcArcherRechargePopupView";
		export const ACARCHERRANKPOPUPVIEW:string="AcArcherRankPopupView";
		export const ACARCHERINFOPOPUPVIEW:string="AcArcherInfoPopupView";


		//好友相关
		export const FRIENDSAPPLYPOPUPVIEW:string = "FriendApplyPopupView";
		export const FRIENDSGIFTPOPUPVIEW:string = "FriendGiftPopupView";



		/**
		 * 私聊
		 */
		export const PRICHATVIEW:string="PriChatView";
		/**
		 * 世界杯活动
		 */
		export const ACWORLDCUPVOTEVIEW:string="AcWorldCupVoteView";
		export const ACWORLDCUPBUYVIEW:string="AcWorldCupBuyView";
		export const ACWORLDCUPRATIOVIEW:string="AcWorldCupRatioView";

		/**
		 * 新的购买 弹板
		 */
		export const COSTGEMBUYITEMSLIDERPOPUPVIEW:string="CostGemBuyItemSliderPopupView";
		
		/**
		 * 赵云活动
		 */
		export const ACMAZEINFOPOPUPVIEW:string = "AcMazeInfoPopupView";
		export const ACMAZERANKPOPUPVIEW:string = "AcMazeRankPopupView";
		export const ACMAZEREWARDPOPUPVIEW:string = "AcMazeRewardPopupView";

		/**
		 * 跨服活动区服详细弹窗
		*/
		export const ACCROSSRANKLISTVIEW:string="AcCrossRankListView";

		/**
		 * 防沉迷
		 */
		export const ANTIADDICTIONPOPUPVIEW:string="AntiaddictionPopupView";

		/**
		 * 七夕灯会奖励
		 */
		export const ACDOUBLESEVENTHAWARDVIEW:string="AcDoubleSeventhAwardView";
		export const ACDOUBLESEVENTHEXCHANGEVIEW:string="AcDoubleSeventhExchangeView";
		/**
		 * 小程序 首充界面
		 */
		export const FIRSTRECHARGEVIEW:string = "FirstRechargeView";
		/**
		 * 议事阁选择门课界面
		 */
		export const COUNCILSELECTSERVANTVIEW:string = "CouncilSelectServantView";
		/**
		 * 议事阁奖励弹窗
		 */
		export const COUNCILREWARDPOPUPVIEW:string = "CouncilRewardPopupView";
		/**
		 * 议事阁查看排行奖励
		 */
		export const COUNCILRANKLISTVIEW:string = "CouncilRankListView";

		/**
		 * 百服活动-储值宝箱物品展示
		 */
		export const ACRECHARGEBOXPOPUPVIEW:string = "AcRechargeBoxPopupView";
		/**
		 * 门客擂台规则说明
		 */
		export const CROSSSERVERSERVANTDETAILVIEW:string = "AcCrossServerServantDetailView";
		
		/**
		 * 公务奖励
		 */
		export const AFFAIRVIEWWORDREWARDPOPUPVIEW:string = "AffairWordRewardPopupView";

		/**
		 * 一键公务
		 */
		export const AFFAIRVIEWCHOICEPOPUPVIEW:string = "AffairViewChoicePopupView";
		/**
		 * 书院文本提示
		 */
		export const BOOKROOMTIPPOPUPVIEW:string = "BookroomTipPopupView";
		
		/**
		 * 门客擂台奖励弹窗
		 */
		export const CROSSSERVERSERVANTREWARDVIEW:string = "AcCrossServerServantRewardView";
		/**
		 * 门客擂台排行榜奖励弹窗
		 */
		export const CROSSSERVERSERVANTRANKVIEW:string = "AcCrossServerServantRankListView";

		/**
		 * 港台一周年活动
		 */
		//钱庄
		export const BANKBOXPOPUPVIEW:string = "BankBoxPopupView";
		export const BANKBOXDEPOPUPVIEW:string = "BankBoxDePopupView";
		//黑市
		export const BLACKMARKEtVIEW:string = "BlackMarketView";

		
		

		
		

		export const TITLELEVELDETAILPOPUPVIEW:string="TitleLevelDetailPopupView";
		//皮肤相关
		export const ITEMPROPOPUPVIEW:string="ItemProPopupView";
		export const SKINRANKPOPUPVIEW:string="SkinRankPopupView";
		export const SKINLEVELDETAILPOPUPVIEW:string="SkinLevelDetailPopupView";
		
		/**
		 * 中秋活动查看奖励
		 */
		export const ACMIDAUTUMNREWARDINFOPOPUPVIEW:string = "AcMidAutumnRewardInfoPopupView";
		export const ACMIDAUTUMNREWARDPOPUPVIEW:string = "AcMidAutumnRewardPopupView";
		export const ACMIDAUTUMNPREVIEWPOPUPVIEW:string = "AcMidAutumnPreviewPopupView";
		
		/**
		 * 中秋活动详情
		 */
		export const ACMIDAUTUMNACINFOPOPUPVIEW:string = "AcMidAutumnAcInfoPopupView";
		/**
		 * 首页回归弹板
		 */
		export const REBACKPOPUPVIEW:string = "PlayerReturnPopupView";
		
		export const EGAMEQQPOPUPVIEW:string = "EgameqqPopupView";
		/**
		 * 限时红颜
		 */
		export const TIMELIMITWIFEVIEW:string = "TimeLimitWifeView";
		/**
		 * 限时礼包
		 */
		export const LIMITEDGIFTVIEW:string = "LimitedGiftView";
		
		/**
		 * 围剿鳌拜活动商店
		 */
		export const ACWIPEBOSSSHOPVIEW:string = "AcWipeBossShopView";
		/**
		 * 围剿鳌拜排行奖励
		 */
		export const ACWIPEBOSSREWARDVIEW:string = "AcWipeBossRewardView";
		/**
		 * 围剿鳌拜榜单
		 */
		export const ACWIPEBOSSRANKIEW:string = "AcWipeBossRankView";
		export const ACWIPEBOSSRANKIEWTAB2:string = "AcWipeBossRankView|2";
		export const ACWIPEBOSSALLIANCEINFOVIEW:string = "AcWipeBossAllianceInfoView";
		export const ACWIPEBOSSKILLINFOIEW:string = "AcWipeBossKillInfoView";
		export const ACWIPEBOSSGETREWARDVIEW:string = "AcWipeBossGetRewardView";
		export const ACWIPEBOSSATTACKEDPOPUPVIEW:string = "AcWipeBossAttackedPopupView";

		//皇帝摆驾通知
		export const DECREEONLINESETTINGPOPUPVIEW:string="DecreeOnlineSettingPopupView";
		export const ACWIFECOMECOLLECTPOPUPVIEW:string="AcWifeComeCollectPopupView";
		
		/**
		 * 我要变强
		 */
		export const STRENGTHENPOPUPVIEW:string="StrengthenPopupView";

		/**
		 * 帮会跨服战斗结果弹窗
		 */
		export const ALLIANCEWARRESULTVIEW:string="AllianceWarResultView";
		export const ALLIANCEWARDAMAGERANKVIEW:string="AllianceWarDamageRankView";
		

		/**
		 * 门客（红颜）转换的界面
		 */
		export const COMMONCHANGEOTHERREWARD= "CommonChangeOtherReward";

		/** 帮会战 -- 帮派阵容 */
		export const ALLIANCEWARJOINBATTLEINFOPOPUPVIEW  = "AllianceWarJoinBattleInfoPopupView";

		/** 帮会战 -- 门客选择界面 */
		export const ALLIANCEWARSELECTSERVANTPOPUPVIEW  = "AllianceWarSelectServantPopupView";

		/** 帮会战 -- 计策选择界面 */
		export const ALLIANCEWARSELECTPLANPOPUPVIEW  = "AllianceWarSelectPlanPopupView";

		/** 帮会战 -- 计策使用界面 */
		export const ALLIANCEWARUSEPLANPOPUPVIEW  = "AllianceWarUsePlanPopupView";

		/** 帮会战 -- 奖励领取界面 */
		export const ALLIANCEWARREWARDPOPUPVIEW  = "AllianceWarRewardPopupView";
		/**双11排行榜*/ 
		export const ACSINGLEDAYRECHARGEPOPUPVIEW:string="AcSingleDayRechargeRankPopupView";
		//双11皮肤，头像详情UI
		export const ACSINGLEDAYSKINPROPERTYPOPUPVIEW:string="AcSingleDaySkinPropertyPopupView";
		export const ACSINGLEDAYBUYCONFIRMPOPUPVIEW:string = "AcSingleDayBuyConfirmPopupView";
		export const ACSINGLEDAYGETREDPTPOPUPVIEW:string = "AcSingleDayGetRedptPopupView";
		/**皮肤碎皮 */
		export const SKINCOMPOSEPOPUPVIEW:string = "SkinComposePopupView";
		/**门客战城市详情 */
		export const COUNTRYWARCITYPOPUPVIEW:string = "CountryWarCityPopupView";
		export const COUNTRYWARRESULTVIEW:string = "CountryWarResultView";
		
		
		//国战相关
		/**国战奖励相关 */
		export const COUNTRYWARREWARDPOPUPVIEW : string = 'CountryWarRewardPopupView';
		/**国战计策 */
		export const COUNTRYWARPLANPOPUPVIEW : string = 'CountryWarPlanPopupView';
		/**国战选择门客界面 */
		export const COUNTRYWARSELECTSERVANTPOPUPVIEW : string = 'CountryWarSelectServantPopupView';
		/**国战二级选择界面 */
		export const COUNTRYWARCONFIRMPOPUPVIEW : string = 'CountryWarConfirmPopupView';
		/**国战编辑公告界面 */
		export const COUNTRYWAREDITNOTICEPOPUPVIEW : string = 'CountryWarEditNoticePopupView';
		/**门客皮肤详情界面 */
		export const SERVANTSKINAURAPOPUPVIEW : string = 'ServantSkinAuraPopupView';
		
		/**圣诞奖励 */
		export const ACCHRISTMASREWARDPOPUPVIEW:string="AcChristmasRewardPopupView";
		/**圣诞奖励池子 */
		export const ACCHRISTMASREWARDPOOLPOPUPVIEW:string="AcChristmasRewardPoolPopupView";
		/**圣诞大奖励 */
		export const ACCHRISTMASBIGREWARDPOOLPOPUPVIEW:string="AcChristmasBigRewardPopupView";
		/**圣诞大奖励--头像框 */
		export const ACCHRISTMASTITLEREWARDPOPUPVIEW:string="AcChristmasTitleRewardPopupView";
		/**圣诞大奖励--红颜皮肤 */
		export const ACCHRISTMASWIFESKINREWARDPOPUPVIEW:string="AcChristmasWifeSkinRewardPopupView";
		/**圣诞大奖励--门客 */
		export const ACCHRISTMASSERVANTREWARDPOPUPVIEW:string="AcChristmasServantRewardPopupView";
		/**圣诞活动奖励--牛郎织女 */
		export const ACCHRISTMASMAGPIESBRIDGEREWARDPOPUPVIEW:string="AcChristmasMagpiesBridgeRewardPopupView";
		/**圣诞二级弹框 */
		export const ACCHRISTMASCONFIRMPOPUPVIEW:string="AcChristmasConfirmPopupView";
		/**赌坊下注弹窗 */
		export const ACGAMBLEGEMPOPUPVIEW:string="AcGambleGemPopupView";
		/**赌坊结果弹窗 */
		export const ACGAMBLERESULTVIEW:string="AcGambleResultView";
		/**领取奖励弹窗 */
		export const ACGAMBLEGETREWARDPOPUPVIEW:string="AcGambleGetRewardPopupView";
		/**领取奖励弹窗 */
		export const ACGAMBLERECORDPOPUPVIEW:string="AcGambleRecordPopupView";
		/**客栈信息弹窗 */
		export const ACHOTELACINFOPOPUPVIEW:string="AcHotelAcInfoPopupView";
		/**比武招亲宝箱弹窗 */
		export const ACMARRYBOXINFOPOPUPVIEW:string="AcMarryBoxInfoPopupView";
		/**比武招亲额外奖励弹窗 */
		export const ACMARRYREWARDPOPUPVIEW:string="AcMarryRewardPopupView";
		/**元旦活动获得奖励弹窗 */
		export const ACTREASUREHUNTGETREWARDVIEW:string="AcTreasureHuntGetRewardView";
		export const ACTREASUREHUNTROUNDREWARDVIEW:string="AcTreasureHuntRoundRewardView";
		export const ACTREASUREHUNTWEALTHVIEW:string="AcTreasureHuntWealthView";
		export const ACTREASUREHUNTMARKETVIEW:string="AcTreasureHuntMarketView";
		export const ACTREASUREHUNTOFFICEVIEW:string="AcTreasureHuntOfficeView";
		export const ACTREASUREHUNTCARCLIPVIEW:string="AcTreasureHuntCarClipView";
		/**京城夜赏获得奖励弹窗 */
		export const ACENJOYNIGHTGETREWARDVIEW:string="AcEnjoyNightGetRewardView";
		export const ACENJOYNIGHTEXCHANGEVIEW:string="AcEnjoyNightExchangeView";
		export const ACENJOYNIGHTTENPOPUPVIEW:string="AcEnjoyNightTenPopupView";

		export const ACAC2020AIDICEPOPUPVIEW:string="AcAC2020AIDicePopupView";
		export const ACAC2020GETREWARDVIEW:string="AcAC2020GetRewardView";
		export const ACAC2020SEARCHPOPUPVIEW:string="AcAC2020SearchPopupView";
		export const ACAC2020TENPOPUPVIEW:string="AcAC2020TenPopupView";
		
		
		/**除夕奖励弹窗 */
		export const ACNEWYEARSIGNUPPOPUPVIEW:string="AcNewYearSignUpPopupView";
		/**除夕补签弹窗 */
		export const ACNEWYEARSIGNUPConfirmPOPUPVIEW:string="AcNewYearSignUpConfirmPopupView";
		/**财神驾到--财神祝福 */
		export const ACWEALTHCOMINGBLESSPOPUPVIEW:string="AcWealthComingBlessPopupView";
		/**财神驾到--财神奖励 */
		export const ACWEALTHCOMINGREWARDPOPUPVIEW:string="AcWealthComingRewardPopupView";
		/**财神驾到--金童玉女 */
		export const ACWEALTHCOMINGSKINREWARDPOPUPVIEW:string="AcWealthComingSkinRewardPopupView";
		/**财神驾到--财运奖励 */
		export const ACWEALTHCOMINGLUCKREWARDPOPUPVIEW:string="AcWealthComingLuckRewardPopupView";
		/**财神驾到--活动奖励弹框 */
		export const ACWEALTHCOMINGGETREWARDPOPUPVIEW:string="AcWealthComingGetRewardPopupView";
		/**绝地擂台来访消息 */
		export const ACBATTLEGROUNDVISITVIEW:string="AcBattileGroundVisitView";
		export const ACBATTLEGROUNDALLIINFOVIEW:string="AcBattleGroundAlliInfoView";
		export const ACBATTLEGROUNDSELECTVIEW:string="AcBattleGroundSelectView";
		export const ACBATTLEGROUNDAGREEPOPUPDIALOG:string="AcBattleGroundAgreePopupDialog";
		export const ACBATTLEGROUNDCHEERSELECTVIEW:string="AcBattleGroundCheerSelectView";
		export const ACBATTLEGROUNDCHALLENGEVIEW:string="AcBattleGroundChallengeView";
		/**风华群芳  popup */
		export const ACGROUPWIFEBATTLEVISITVIEW:string="AcGroupWifeBattleVisitView";
		export const ACGROUPWIFEBATTLEALLIINFOVIEW:string="AcGroupWifeBattleAlliInfoView";
		export const ACGROUPWIFEBATTLESELECTVIEW:string="AcGroupWifeBattleSelectView";
		// export const ACBATTLEGROUNDAGREEPOPUPDIALOG:string="AcBattleGroundAgreePopupDialog";
		export const ACGROUPWIFEBATTLEGUESSSELECTVIEW:string="AcGroupWifeBattleGuessSelectView";
		// export const ACBATTLEGROUNDCHALLENGEVIEW:string="AcBattleGroundChallengeView";
		export const ACGROUPWIFEBATTLEPROTECTVIEW:string="AcGroupWifeBattleProtectView";
		export const ACGROUPWIFEBATTLETALENTVIEW:string="AcGroupWifeBattleTalentView";
		export const ACGROUPWIFEBATTLETALENTUPPOPUPVIEW:string="AcGroupWifeBattleTalentUpPopupView";
		
		//马超活动
		/**排行榜 */
		export const ACMACHAORANKPOPUPVIEW:string="AcMaChaoRankPopupView";
		/**奖池 */
		export const ACMACHAOREWARDPOOLPOPUPVIEW:string="AcMaChaoRewardPoolPopupView";
		/**爆竹迎新 */
		export const ACNEWYEARCRACKERSCENEPOPUPVIEW:string="AcNewYearCrackerScenePopupView";
		export const ACNEWYEARCRACKERDETAILPOPUPVIEW:string="AcNewYearCrackerDetailPopupView";
		export const ACNEWYEARCRACKERREWARDPOPUPVIEW:string="AcNewYearCrackerRewardPopupView";
		/**锦鲤活动奖励 */
		export const ACLUCKYCARPREWARDPOPUPVIEW:string="AcLuckyCarpRewardPopupView";
		/**七日好礼红颜奖励 */
		export const SEVENDAYSSINGNUPWIFEINFOPOPUPVIEW:string="SevenDaysSignUpWifeInfoPopupView";
		/**七日好礼门客奖励 */
		export const SEVENDAYSSINGNUPSERVANTINFOPOPUPVIEW:string="SevenDaysSignUpServantInfoPopupView";
		export const SEVENDAYSSINGNUPWIFESKINPOPUPVIEW:string="SevenDaysSignUpWifeSkinPopupView";

		/**门客出海--选择门客 */
		export const SERVANTEXILESELECTSERVANTPOPUPVIEW:string="ServantExileSelectServantPopupView";
		/**门客出海--门客回归 */
		export const SERVANTEXILESERVANTBACKPOPUPVIEW:string="ServantExileServantBackPopupView";
		/**门客出海--门客出海和提前回归 */
		export const SERVANTEXILESERVANTGOOUTPOPUPVIEW:string="ServantExileServantGoOutPopupView";
		export const SERVANTEXILESERVANTBUFFVIEW:string="ServantExileServantBuffView";
		export const SERVANTEXILEBUFFCHOOSEVIEW:string="ServantExileBuffChooseView";
		export const SERVANTEXILEFLEETBUFFVIEW:string="ServantExileFleetBuffView";
		export const SERVANTEXILEBUFFLISTVIEW:string = "ServantExileBuffListView";
		export const SERVANTEXILEBUFFDETAILVIEW:string = "ServantExileBuffDetailView";
		export const SERVANTEXILEBUFFSERVANTVIEW:string = "ServantExileBuffServantView";
		/**彩蛋活动rank */
		export const ACWEALTHCARPRANKPOPUPVIEW:string="AcWealthCarpRankPopupView";
		/**彩蛋活动抽奖奖励 */
		export const ACWEALTHCARPLOTTERYREWARDSPOPUPVIEW:string="AcWealthCarpLotteryRewardsPopupView";
		/**彩蛋活动奖励 */
		export const ACWEALTHCARPSERVANTSKINREWARDPOPUPVIEW:string="AcWealthCarpServantSkinRewardPopupView";
		/**彩蛋活动红颜奖励 */
		export const ACWEALTHCARPWIFESKINREWARDPOPUPVIEW:string="AcWealthCarpWifeSkinRewardPopupView";
		/**通用门客奖励 */
		export const ACCOMMONSERVANTSKINPOPUPVIEW:string="AcCommonServantSkinPopupView";
		//投壶活动
		/**投壶活动奖励玩法 */
		export const ACTHROWARROWPOPUPVIEW:string="AcThrowArrowPopupView";
		/**投壶活动送的奖励 */
		export const ACTHROWARROWINFOREWARDPOPUPVIEW:string="AcThrowArrowInfoRewardPopupView";
		/**投壶活动宝箱奖励 */
		export const ACTHROWARROWACHIEVEMENTPOPUPVIEW:string="AcThrowArrowAchievementPopupView";
		/**投壶活动获得奖励弹板 */
		export const ACTHROWARROWGETREWARDPOPUPVIEW:string="AcThrowArrowGetRewardPopupView";
		/**投壶活动获得一件投壶*/
		export const ACTHROWARROWRESULTPOPUPVIEW:string="AcThrowArrowResultPopupView";
		/**投壶活动奖励弹板*/
		export const ACTHROWARROWREWARDPOPUPVIEW:string="AcThrowArrowRewardPopupView";
		export const ACTHROWARROWREWARDPOPUPVIEW2:string="AcThrowArrowRewardPopupView|2";
		export const ACTHROWARROWREWARDPOPUPVIEW3:string="AcThrowArrowRewardPopupView|3";
		export const ACTHROWARROWREWARDPOPUPVIEW4:string="AcThrowArrowRewardPopupView|4";
		
		/**幸运翻牌皮肤奖励预览*/
		export const ACLUCKYDRAWSKINPOPUPVIEW:string="AcLuckyDrawSkinPopupView";
		export const ACLUCKYDRAWREWARDPOPUPVIEW:string="AcLuckyDrawRewardPopupView";
		export const ACLUCKYDRAWREWARDSHOWVIEW:string="AcLuckDrawRewardShowView";
		export const ACLUCKYDRAWCARDPOOLVIEW:string="AcLuckyDrawCardPoolView";
		export const ACLUCKYDRAWRESULTVIEW:string="AcLuckyDrawResultView";
		export const SKINGETVIEW:string="SkinGetView";
		/**
		 * 东海皇陵活动商店
		 */
		export const ACTOMBSHOPVIEW:string = "AcTombShopView";
		export const ACTOMBREWARDVIEW:string = "AcTombRewardView";
		export const ACTOMBRANKIEW:string = "AcTombRankView";
		export const ACTOMBRANKIEWTAB2:string = "AcTombRankView|2";
		export const ACTOMBGETREWARDVIEW:string = "AcTombGetRewardView";
		export const ACTOMBATTACKPOPUPVIEW:string = "AcTombAttackPopupView";
		export const ACTOMBJUMPVIEW:string = "AcTombJumpView";
		export const ACTOMBALLIANCEINFOVIEW:string=`AcTombAllianceInfoView`;

		export const ACLOCTOMBSHOPVIEW:string = "AcLocTombShopView";
		export const ACLOCTOMBREWARDVIEW:string = "AcLocTombRewardView";
		export const ACLOCTOMBRANKIEW:string = "AcLocTombRankView";
		export const ACLOCTOMBRANKIEWTAB2:string = "AcLocTombRankView|2";
		export const ACLOCTOMBGETREWARDVIEW:string = "AcLocTombGetRewardView";
		export const ACLOCTOMBATTACKPOPUPVIEW:string = "AcLocTombAttackPopupView";
		export const ACLOCTOMBJUMPVIEW:string = "AcLocTombJumpView";
		export const ACLOCTOMBALLIANCEINFOVIEW:string=`AcLocTombAllianceInfoView`;

		//勤王除恶
		/**宝箱奖励 */
		export const ALLIANCEWEEKENDREWARDINFOPOPUPVIEW:string = "AllianceWeekEndRewardInfoPopupView";
		/**npc奖励 */
		export const ALLIANCEWEEKENDNPCINFOPOPUPVIEW:string = "AllianceWeekEndNpcInfoPopupView";
		/**选择门客 */
		export const ALLIANCEWEEKENDSELECTSERVANTPOPUPVIEW:string = "AllianceWeekEndSelectServantPopupView";
		/**buff 加成 */
		export const ALLIANCEWEEKENDADDITIONPOPUPVIEW:string = "AllianceWeekEndAdditionPopupView";
		/**贡献排行榜 */
		export const ALLIANCEWEEKENDRANKPOPUPVIEW:string = "AllianceWeekEndRankPopupView";
		/**积分奖励 */
		export const ALLIANCEWEEKENDSCOREPOPUPVIEW:string = "AllianceWeekEndScorePopupView";
		/**
		 * 劳碌丰收活动弹窗
		 */
		export const ACLABORDAYPOPUPVIEW:string = "AcLaborDayPopupView";
		export const ACLABORDAYRANKVIEW:string = "AcLaborDayRankView";
		export const ACLABORDAYSKINPOPUPVIEW:string = "AcLaborDaySkinPopupView";


		/**
		 * 京城夜赏- 弹窗
		 */
		export const ACENJOYNIGHTACHIEVEMENTPOPUPVIEW:string = "AcEnjoyNightAchievementPopupView";

		 
		/**
		 * 粽叶飘香-端午节活动 弹窗
		 */
		export const ACDUANWUPOPUPVIEW:string = "AcDuanWuPopupView";
		export const ACDUANWUPOPUPVIEW2:string = "AcDuanWuPopupView|2";
		export const ACDUANWUPOPUPVIEW3:string = "AcDuanWuPopupView|3";
		export const ACDUANWUPOPUPVIEW4:string = "AcDuanWuPopupView|4";
		
		/**
		 * 翻牌活动 弹窗
		 */
		export const ACLUCKYDRAWPOPUPVIEW:string = "AcLuckyDrawPopupView";
		export const ACLUCKYDRAWPOPUPVIEW2:string = "AcLuckyDrawPopupView|2";

		/**
		 * 建造斗场活动弹窗
		 */
		export const ACARENAPOPUPVIEW:string = "AcArenaPopupView";
		export const ACARENARANKVIEW:string = "AcArenaRankView";
		export const ACARENAPOPUPVIEW2:string = "AcArenaPopupView|2";
		export const ACARENAPOPUPVIEW3:string = "AcArenaPopupView|3";
		export const ACARENAPOPUPVIEW4:string = "AcArenaPopupView|4";
		//花魁
		/**花魁活动--选手信息 */
		export const ACBEAUTYVOTEPLAYERINFOPOPUPVIEW:string = "AcBeautyVotePlayerInfoPopupView";
		/**花魁活动--购买鲜花 */
		export const ACBEAUTYVOTEBUYITEMSLIDERPOPUPVIEW:string = "AcBeautyVoteBuyItemSliderPopupView";
		/**花魁活动--使用
		 * 鲜花 */
		export const ACBEAUTYVOTEUSEITEMSLIDERPOPUPVIEW:string = "AcBeautyVoteUseItemSliderPopupView";
		/**花魁活动--粉丝排行 */
		export const ACBEAUTYVOTEFANRANKPOPUPVIEW:string = "AcBeautyVoteFanRankPopupView";
		/**花魁活动--对战排行 */
		export const ACBEAUTYVOTEPLAYERBATTLEINFOPOPUPVIEW:string = "AcBeautyVotePlayerBattleInfoPopupView";
		/**
		 * 储值宝箱弹窗
		 */
		export const ACRECHARGEBOXSKINPOPUPVIEW:string = "AcRechargeBoxSkinPopupView";
		/**母亲节*/
		export const ACMOTHERDAYSKINPOPUPVIEW:string = "AcMotherDaySkinPopupView";
		export const ACMOTHERDAYCARDPOOLVIEW:string = "AcMotherDayCardPoolView";
		export const ACMOTHERDAYREWARDPOPUPVIEW:string = "AcMotherDayRewardPopupView";
		export const ACMOTHERDAYREWARDSHOWVIEW:string = "AcMotherDayRewardShowView";
		/**母亲节--场景view */
		export const ACMOTHERDAYSCENEREWARDPOPUPVIEW:string = "AcMotherDaySceneRewardPopupView";
		/**母亲节--活动奖励 */
		export const ACMOTHERDAYACTIVITYREWARDPOPUPVIEW:string = "AcMotherDayActivityRewardPopupView";

		//诸葛亮传
		/** 诸葛亮传-充值任务 */
		export const ACLIANGBIOGRAPHYCHARGEPOPUPVIEW:string = "AcLiangBiographyChargePopupView";
		/** 诸葛亮传-奖池 */
		export const ACLIANGBIOGRAPHYREWARDPOPUPVIEW:string = "AcLiangBiographyRewardPopupView";
		/** 诸葛亮传-皮肤展示*/
		export const ACLIANGBIOGRAPHYSERVANTSKINPOPUPVIEW:string = "AcLiangBiographyServantSkinPopupView";
		/** 诸葛亮传-进度奖励*/
		export const ACLIANGBIOGRAPHYPROCESSPOPUPVIEW:string = "AcLiangBiographyProcessPopupView";
		/** 诸葛亮传-卷轴*/
		export const ACLIANGBIOGRAPHYSCROLLPOPUPVIEW:string = "AcLiangBiographyScrollPopupView";
		/** 诸葛亮传-抽奖*/
		export const ACLIANGBIOGRAPHYREWARDSHOWVIEW:string = "AcLiangBiographyRewardShowView";
		
		//筑阁祭天
		/** 筑阁祭天-充值任务 */
		export const ACWORSHIPCHARGEPOPUPVIEW:string = "AcWorshipChargePopupView";
		/** 筑阁祭天-奖池 */
		export const ACWORSHIPREWARDPOPUPVIEW:string = "AcWorshipRewardPopupView";
		/** 筑阁祭天-进度奖励 */
		export const ACWORSHIPACHIEVEMENTPOPUPVIEW:string = "AcWorshipAchievementPopupView";
		/** 筑阁祭天-衣装预览 */
		export const ACWORSHIPSKINREWARDPOPUPVIEW:string = "AcWorshipSkinRewardPopupView";
		/** 筑阁祭天-奖励弹板 */
		export const ACWORSHIPGETREWARDPOPUPVIEW:string = "AcWorshipGetRewardPopupView";

		//云顶龙窟
		/** 云顶龙窟-奖励弹板 */
		export const ACYUNDINGLONGKUREWARDPOPUPVIEW:string = "AcYunDingLongKuRewardPopupView";
		/** 云顶龙窟-奖励弹板 */
		export const ACYUNDINGLONGKUBOXINFOPOPUPVIEW:string = "AcYunDingLongKuBoxInfoPopupView";

		//电玩大本营
		/** 电玩大本营-奖励展示 */
		export const ACARCADEGAMEREWARDVIEW:string = "AcArcadeGameRewardView";

		/** 电玩大本营-抽奖 */
		export const ACARCADEGAMEGETREWARDPOPUPVIEW:string = "AcArcadeGameGetRewardPopupView";

		/** 电玩大本营-日志 */
		export const ACARCADEGAMELOGVIEW:string = "AcArcadeGameLogView";

		/**门客书籍详情 */
		export const SERVANTBOOKMAXRULEPOPUPVIEW:string = "ServantBookMaxRulePopupView";
		
		/** 通用红颜皮肤弹框 */
		export const ACCOMMONWIFESKINREWARDPOPUPVIEW:string = "AcCommonWifeSkinRewardPopupView";

		/** 通用红颜弹框 */
		export const ACCOMMONWIFEPOPUPVIEW:string = "AcCommonWifePopupView";

		/** 通用门客弹框 */
		export const ACCOMMONSERVANTPOPUPVIEW:string = "AcCommonServantPopupView";

		/** 通用头像框弹框 */
		export const ACCOMMONTITLEPOPUPVIEW:string = "AcCommonTitlePopupView";


		/**
		 * 剧情回忆选择章节
		 */
		export const STORYRECALLCHOOOSEPOPUPVIEW:string = "StoryrecallChooosePopupView";

		/**
		 * 调查问卷
		 */
		export const ACQUESTIONNAIREREWARDVIEW:string = "AcQuestionnaireRewardPopupView";
		/**
		 * 衣装预览
		 */
		export const ACCOMMONSKINVIEW:string = "AcCommonSkinView";
		/**
		 * 励精图治
		 */
		export const ACBATTLEPASSBUYLEVELVIEW:string = "AcBattlePassBuyLevelView";
		export const ACBATTLEPASSREWARDPOPUPVIEW:string = "AcBattlePassRewardPopupView";
		/**
		 * 定军中原弹窗类
		 */
		export const ACCONQUERMAINLANDPRANKVIEW:string = "AcConquerMainLandPRankView";
		export const ACCONQUERMAINLANDZRANKVIEW:string = "AcConquerMainLandZRankView";
		export const ACCONQUERMAINLANDCITYINFOVIEW:string = "AcConquerMainLandCityInfoView";
		export const ACCONQUERMAINLANDITEMUSEPOPUPVIEW:string = "AcConquerMainLandItemUsePopupView";
		export const ACCONQUERMAINLANDWARRESULTVIEW:string = "AcConquerManLandWarResultView";
		/**
		 * 魏征活动
		 */	
		export const ACWEIZHENGRECHARGEVIEW:string = "AcWeiZhengRechargeView";
		export const ACWEIZHENGTASKVIEW:string = "AcWeiZhengTaskView";
		export const ACWEISIGNREWARDVIEW:string = "AcWeiZhengSignRewardView";
		/**
		 * 情缘弹窗详细加成
		 */
		export const QINGYUANDETAILVIEW:string="QingyuanDetailView";
		
		//搜查魏府
		/**搜查魏府--奖池 */
		export const ACSEARCHPROOFREWARDSPOOLPOPUPVIEW:string="AcSearchProofRewardsPoolPopupView";
		/**搜查魏府--充值奖励 */
		export const ACSEARCHPROOFRECHARGEPOPUPVIEW:string="AcSearchProofRechargePopupView";
		/**搜查魏府--衣装兑换 */
		export const ACSEARCHPROOFSKINPOPUPVIEW:string="AcSearchProofSkinPopupView"
		/**搜查魏府--进度 */
		export const ACSEARCHPROOFACHIEVEMENTPOPUPVIEW:string="AcSearchProofAchievementPopupView";
		/**搜查魏府--搜查令 */
		export const ACSEARCHPROOFSEARCHVIEW:string="AcSearchProofSearchView";
		export const CHILDADDVIEW : string = `ChildAddView`;
		export const CHILDDETAILVIEW : string = `ChildDetailView`;
		/**
		* 巾帼活动道具组选择门客
		*/
		export const CHOOSESERVANTVIEW:string="ChooseServantView";
		/** 
		 * 红颜皮肤升级剧情选择
		*/
		export const WIFECHATSELECTVIEW:string="WifeChatSelectView";
		export const WIFECHATUNLOCKSUCVIEW:string="WifeChatUnlockSucView";

		export const WIFESKINLEVELUPDETAILPOPUPVIEW:string="WifeSkinlevelupDetailPopupView";
		/** 
		 * 科举答题
		*/
		export const EXAMRANKPOPUPVIEW:string="ExamRankPopupView";
		export const EXAMPROBLEMPOPUPVIEW:string="ExamProblemPopupView";
		/**
		 * 通用头衔衣装预览奖励
		 */
		export const ACCOMMONTITLEREWARDPOPUPVIEW:string="AcCommonTitleRewardPopupView";
		/**
		 * 东郊狩猎 奖励预览
		 */
		export const ACHUNTINGREWARDPOOLVIEW:string="AcHuntingRewardPoolView";
		export const ACHUNTINGREWARDPOPUPVIEW:string="AcHuntingRewardPopupView";

		/** 设置语言 */
		export const SETTINGLANGPOPUPVIEW:string="SettingLangPopupView";
		/**
		 * 月夜仙缘 奖励
		 */
		export const ACSWEETGIFTREWARDPOPVIEW:string="AcSweetGiftRewardPopView";
		export const ACSWEETGIFTVISITREWARDPOPVIEW:string="AcSweetGiftVisitRewardPopView";
		export const ACSWEETGIFTMAKECAKEPOPVIEW:string="AcSweetGiftMakeCakePopView";
		export const ACSWEETGIFTSKINPOPUPVIEW:string="AcSweetGiftSkinPopupView";
		export const ACSWEETGIFTAVGVIEW:string="AcSweetGiftAVGView";
		/**
		 * 投石破敌
		 */
		export const ACTHROWSTONELAUNCHPOPUPVIEW:string="AcThrowStoneLaunchPopupView";
		export const ACTHROWSTONEREWARDPOPVIEW:string="AcThrowStoneRewardPopView";
		export const ACTHROWSTONEREWARDPOPVIEW3:string = "AcThrowStoneRewardPopView|2";
		export const ACTHROWSTONEREWARDPOPVIEW4:string = "AcThrowStoneRewardPopView|3";
		export const ACTHROWSTONEACHIEVEREWARDPOPUPVIEW:string="AcThrowStoneAchieveRewardPopupView";
		/** 
		 * 门客皮肤展示
		*/
		export const ATKRACESHOWSKINVIEW:string="AtkraceshowskinView";
		export const SERVANTNEWCHANGESKIN:string="ServantNewChangeSkin";
		
		/**
		 * 金蛋赠礼
		 */
		export const ACSMASHEGGDETAILPOPUPVIEW:string="AcSmashEggDetailPopupView";
		export const ACSMASHEGGDETAILPOPUPVIEW1:string="AcSmashEggDetailPopupView|1";
		//红颜对战 排行榜
		export const WIFEBATTLERANKPOPUPVIEW:string="WifebattleRankPopupView";
		//红颜对战 商城
		export const WIFEBATTLESHOPPOPUPVIEW:string="WifebattleShopPopupView";
		export const WIFEBATTLESTUDYPOPUPVIEW:string="WifebattleStudyPopupView";
		export const ITEMEXCHANGEPOPUPVIEW:string="ItemExchangePopupView";
		export const WIFETALENTPLUSPOPUPVIEW:string="WifeTalentView|1";
		export const WIFETALENTBUFFPOPUPVIEW:string = "WifeTalentBuffPopupView";
		export const WIFEBATTLEYONGLESUCCESSVIEW:string = "WiifeBattleYongleSuccessView";
		
		//提升才情
		export const WIFETALENTUPPOPUPVIEW:string = "WifeTalentUpPopupView";
		//提升才情
		export const ACCROSSSERVERWIFEBATTLEREWARDVIEW:string = "AcCrossServerWifeBattleRewardView";
		//跨服红颜对战 排行榜
		export const ACCROSSSERVERWIFEBATTLERANKPOPUPVIEW:string="AcCrossServerWifeBattleRankPopupView";
				//提升才情
		export const ACCROSSSERVERWIFETALENTUPPOPUPVIEW:string = "AcCrossServerWifeTalentUpPopupView";
		export const ACCROSSSERVERWIFETALENTPLUSPOPUPVIEW:string="AcCrossServerWifeTalentPlusPopupView";
		/** 
		 * 珍器坊
		*/
		export const ZHENQIFANGSELECTSERVANTVIEW:string="ZhenqifangSelectServantView";
		export const ZHENQIFANGBUILDLEVELDETAILVIEW:string="ZhenqifangBuildLevelDetailView";
		export const ZHENQIFANGSELECTFRIENDVIEW:string="ZhenqifangSelectFriendView";
		//国庆活动奖励预览
		export const ACNATIONALDAYREWARDPOPUPVIEW:string="AcNationalDayRewardPopupView";
		/**
		 * 通用衣装预览 门客佳人预览
		 */
		export const ACCOMMONCLOTHESPOPUPVIEW:string="AcCommonClothesPopupView";
		export const ACCOMMONREWARDPOPUPVEW:string="AcCommonRewardPopupView";
		/*
		* 子嗣事件
		*/
		export const CHILDEVENTVIEW:string="ChildEventView";
		/*
		* 子嗣送活力丹
		*/
		export const GIVEREWARDSPOPUPVIEW:string="GiveRewardsPopupView";
		/**
		 **/
		export const SERVANTWEAPONSHOWVIEW:string="ServantWeaponShowView";
		
		/*
		* 暗夜魅影
		**/
		export const ACDESTROYSAMEPOPUPVIEW:string=`AcDestroySamePopupView`;
		export const ACDESTROYSAMEPOPUPVIEW2:string=`AcDestroySamePopupView|2`;
		export const ACDESTROYSAMEPOPUPVIEW3:string=`AcDestroySamePopupView|3`;
		export const ACDESTROYSAMEPOPUPVIEW4:string=`AcDestroySamePopupView|4`;
		export const ACDESTROYSAMEREWARDPOPUPVIEW:string=`AcDestroySameRewardPopupView`;
		export const ACDESTROYSAMESHOWREWARDVIEW:string = "AcDestroySameShowRewardView";
		/*
		* 女优活动2
		**/
		export const ACRECHARGEBOXSPPOPUPVIEW:string="AcRechargeBoxSPPopupView";
		export const ACRECHARGEBOXSPREWARDVIEW:string="AcRechargeBoxSPRewardView";
		export const ACRECHARGEBOXSPAVGVIEW:string="AcRechargeBoxSPAVGView";
		/**
		 * 女优活动3 
		 */
		export const ACYIYIBUSHEACHIEVEMENTPOPUPVIEW:string="AcYiyibusheAchievementPopupView";
		export const ACYIYIBUSHEAVGVIEW:string="AcYiyibusheAVGView";
		export const ACYIYIBUSHEREWARDPOOL:string="AcYiyibusheRewardPool";
		/**
		 * 女优活动1
		 */
		export const ACFIRSTSIGHTLOVERANKPOPUPVIEW:string="AcFirstSightLoveRankPopupView";
		export const ACFIRSTSIGHTLOVEUSERMSGPOPUPVIEW:string="AcFirstSightLoveUserMsgPopupView";
		/*
		* 德川时代
		**/
		export const ACDECHUANSHIDAIPOPUPVIEW:string=`AcDechuanshidaiPopupView`;
		export const ACDECHUANSHIDAIPOPUPVIEW2:string=`AcDechuanshidaiPopupView|2`;
		export const ACDECHUANSHIDAIPOPUPVIEW3:string=`AcDechuanshidaiPopupView|3`;
		export const ACDECHUANSHIDAIPOPUPVIEW4:string=`AcDechuanshidaiPopupView|4`;
		export const ACDECHUANSHIDAIREWARDPOOLVIEW:string=`AcDechuanshidaiRewardPoolView`;
		export const ACDECHUANSHIDAITASKVIEW1:string=`AcDechuanshidaiTaskView`;
		export const ACDECHUANSHIDAITASKVIEW2:string=`AcDechuanshidaiTaskView|2`;
		export const ACDECHUANSHIDAITASKVIEW3:string=`AcDechuanshidaiTaskView|3`;
		export const ACDECHUANSHIDAITASKVIEW4:string=`AcDechuanshidaiTaskView|4`;
		/**
		 * 天梯
		 */
		export const LADDERCHOOSETEAMPOPUPVIEW:string="LadderChooseTeamPopupView";
		export const LADDERITEMUSEPOPUPVIEW:string="LadderItemUsePopupView";
		/**
		 * 年度狂欢双十一
		 */
		export const ACSINGLEDAY2019DETAILVIEW1:string="AcSingleDay2019DetailView";
		export const ACSINGLEDAY2019DETAILVIEW2:string="AcSingleDay2019DetailView|2";
		export const ACSINGLEDAY2019DETAILVIEW3:string="AcSingleDay2019DetailView|3";
		export const ACSINGLEDAY2019DETAILVIEW4:string="AcSingleDay2019DetailView|4";
		export const ACSINGLEDAY2019DETAILVIEW5:string="AcSingleDay2019DetailView|5";
		export const ACSINGLEDAY2019RANKPOPUPVIEW:string="AcSingleDay2019RankPopupView";
		export const ACSINGLEDAY2019ITEMSPOPUPVIEW:string="AcSingleDay2019GiftItemsPopupView";
		/**
		 * 携美同游
		 */
		export const ACTRAVELWITHBEAUTYACHIEVEREWARDPOPUPVIEW:string="AcTravelWithBeautyAchieveRewardPopupView";
		export const ACTRAVELWITHBEAUTYRECHARGEPOPUPVIEW:string="AcTravelWithBeautyRechargePopupView";
		export const ACTRAVELWITHBEAUTYSCENEPOPUPVIEW:string="AcTravelWithBeautyScenePopupView";
		export const ACTRAVELWITHBEAUTYPOOLREWARDPOPUPVIEW:string="AcTravelWithBeautyPoolRewardPopupView";
		/**
		 * 米莎来了
		 */
		export const ACWIFECOMESCENEPOPUPVIEW:string="AcWifeComeScenePopupView";

		/**
		 * 网络异常警告
		 */
		export const NETWARNPOPUPVIEW:string="NetWarnPopupView";
		export const ACCROSSSERVERWIFETALENTBUFFPOPUPVIEW:string = "AcCrossServerWifeTalentBuffPopupView";
		/**
		 * 巾帼英雄
		 */
		export const ACHEROINEACHIEVEMENTPOPUPVIEW:string="AcHeroineAchievementPopupView";
		export const ACHEROINEREWARDPOPUPVIEW:string="AcHeroineRewardPopupView";
		export const ACHEROINEREWARDPOPUPVIEWTAB3:string="AcHeroineRewardPopupView|2";
		export const ACHEROINEREWARDPOPUPVIEWTAB2:string="AcHeroineRewardPopupView|1";
		/**
		 * 头像框切换
		 */
		export const TITLECHANGEPOPUPVIEW:string="TitleChangePopupView";
		/**
		 * 折扣商店
		 */
		export const ACANNIVERSARYSHOP2020GIFTPOPUPVIEW="AcAnniversaryShop2020GiftPopupView";
		export const ACANNIVERSARYSHOP2020BUYITEMPOPUPVIEW="AcAnniversaryShop2020BuyItemPopupView";
		/*
		* 周年祈愿
		**/
		export const ACANNUALPRAYPOPUPVIEW:string=`AcAnnualPrayPopupView`;
		export const ACANNUALPRAYPOPUPVIEW2:string=`AcAnnualPrayPopupView|2`;
		export const ACANNUALPRAYPOPUPVIEW3:string=`AcAnnualPrayPopupView|3`;
		export const ACANNUALPRAYREWARDPOOLVIEW:string=`AcAnnualPrayRewardPoolView`;
		export const ACANNUALPRAYGETREWARDPOPUPVIEW:string=`AcAnnualPrayGetRewardPopupView`;
		/**
		 * 明君出巡
		 */
		export const EMPEROROUTSTARTPOPUPVIEW:string="EmperorOutStartPopupView";
		export const EMPEROROUTWISHPOPUPVIEW:string="EmperorOutWishPopupView";
		export const EMPEROROUTLISTPOPUPVIEW:string="EmperorOutListPopupView";
		export const EMPEROROUTACHIEVEPOPUPVIEW:string="EmperorOutAchievePopupView";
		/**
		 * 元宵猜猜乐
		*/
		export const ACLANTERNPOOLVIEW:string="AcLanternPoolView";
		export const ACLANTERNPOPUPVIEW:string="AcLanternPopupView";
		export const ACLANTERNPOPUPVIEW2:string="AcLanternPopupView|2";
		export const ACLANTERNPOPUPVIEW3:string="AcLanternPopupView|3";
		export const ACLANTERNPROBLEMPOPUPVIEW:string="AcLanaternProblemPopupView";
		//三国争霸
		export const ACTHREEKINGDOMSSELECTTEAMVIEW:string="AcThreeKingdomsSelcetTeamView";
		export const ACTHREEKINGDOMSCONFIRMVIEW:string="AcThreeKingdomsConfirmView";
		export const ACTHREEKINGDOMSSELECTSUCCESSVIEW:string="AcThreeKingdomsSelectSuccessView";
		export const ACTHREEKINGDOMSTIMEVIEW:string="AcThreeKingdomsTimeView";
		export const ACTHREEKINGDOMSCITYWARPOPUPVIEW:string="AcThreeKingdomsCityWarPopupView";
		export const ACTHREEKINGDOMSYUANBINGDETAILVIEW:string="AcThreeKingdomsYuanbingDetailView";
		export const ACTHREEKINGDOMSYUANBBUFFPOPUPVIEW:string="AcThreeKingdomsBuffPopupView";
		export const ACTHREEKINGDOMSPREPAREVIEW:string="AcThreeKingdomsPrepareView";
		export const ACTHREEKINGDOMSTASKVIEW:string="AcThreeKingdomsTaskView";
		export const ACTHREEKINGDOMSUPGRADEREWARDVIEW:string="AcThreeKingdomsUpgradeRewardView";
		export const ACTHREEKINGDOMSORDERVIEW:string="AcThreeKingdomsOrderView";
		export const ACTHREEKINGDOMSORDERSETTINGVIEW:string="AcThreeKingdomsOrderSettingView";
		export const ACTHREEKINGDOMSORDERCITYSELECTVIEW:string="AcThreeKingdomsOrderCitySelectView";
		export const ACTHREEKINGDOMSHEROCHEERVIEW:string="AcThreeKingdomsHeroCheerView";
		export const ACTHREEKINGDOMSCHANGETEAMVIEW:string="AcThreeKingdomsChangeTeamView";
		export const ACTHREEKINGDOMSHEROATTACKJOINREWARDVIEW:string="AcThreeKingdomsHeroAttackJoinRewardView";
		export const ACTHREEKINGDOMSHEROATTACKRESULTVIEW:string="AcThreeKingdomsHeroAttackResultView";
		export const ACTHREEKINGDOMSRANKFOODREWARDVIEW:string="AcThreeKingdomsRankFoodRewardView";
		export const ACTHREEKINGDOMSMYLOGVIEW:string="AcThreeKingdomsMyLogView";
		
		/**
		 * 武圣天威
		 */
		export const ACTHREEKINGDOMSRECHARGEPOOLVIEW:string="AcThreekingdomsRechargePoolView";
		export const ACTHREEKINGDOMSRECHARGEACHIEVEPOPUPVIEW:string="AcThreekingdomsRechargeAchievePopupView";
		/**
		 * 三国红颜
		 */
		export const ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW:string="AcThreekingdomsOfWifeDetailPopupView";
		export const ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW2:string="AcThreekingdomsOfWifeDetailPopupView|2";
		export const ACTHREEKINGDOMSOFWIFEDETAILPOPUPVIEW4:string="AcThreekingdomsOfWifeDetailPopupView|4";
		/**
		 * 财神祝福
		 */	
		export const ACBLESSINGOFMAMMONREWARDPOPUPVEW:string="AcBlessingOfMammonRewardPopupView";
		/**
		 * 大icon扩展弹窗
		 */	
		export const BIGICONLEFTMOREPOPUPVEW:string="BigIconLeftMorePopupView";
		/**
		 * 酒神诗仙
		 */
		export const ACSKINOFLIBAIDETAILPOPUPVIEW:string="AcSkinOfLibaiDetailPopupView";
		export const ACSKINOFLIBAIDETAILPOPUPVIEW2:string="AcSkinOfLibaiDetailPopupView|2";
		export const ACSKINOFLIBAIDETAILPOPUPVIEW4:string="AcSkinOfLibaiDetailPopupView|4";
		/**
		 * 万物复苏
		 */
		export const ACRECOVERYDETAILPOPUPVIEW:string="AcRecoveryDetailPopupView";
		export const ACRECOVERYDETAILPOPUPVIEW2:string="AcRecoveryDetailPopupView|2";
		export const ACRECOVERYDETAILPOPUPVIEW4:string="AcRecoveryDetailPopupView|4";
		/**
		 * 新好友邀请
		 */
		export const NEWINVITEREWARDPOPUPVIEW :string = "NewInviteRewardPopupView";

		export const NEWINVITEUSERINFOPOPUPVIEW :string = "NewInviteUserinfoPopupView";
		/**
		 * 召回玩家
		 */
		export const PLAYERCOMEBACKREWARDPOPUPVIEW :string = "PlayerComeBackRewardPopupView";

		export const PLAYERCOMEBACKUSERINFOPOPUPVIEW :string = "PlayerComeBackUserinfoPopupView";

		/**
		 * 群雄逐鹿
		 */
		//奖励界面
		export const ACCROSSSERVERHEGEMONYREWARDVIEW:string = "AcCrossServerHegemonyRewardView";
		//群雄争霸 对战详情界面
		export const ACCROSSSERVERHEGEMONYMATCHVIEW:string = "AcCrossServerHegemonyMatchView";
		export const ACCROSSSERVERHEGEMONYMATCHVIEWTAB2:string="AcCrossServerHegemonyMatchView|2";
		export const ACCROSSSERVERHEGEMONYMATCHVIEWTAB3:string="AcCrossServerHegemonyMatchView|3";
		export const ACCROSSSERVERHEGEMONYMATCHVIEWTAB4:string="AcCrossServerHegemonyMatchView|4";

		//群雄争霸 人气排行
		export const ACCROSSSERVERHEGEMONYFLAGVIEW:string = "AcCrossServerHegemonyFlagView";
		//群雄争霸 人气排行规则说明
		export const ACCROSSSERVERHEGEMONYFLAGRULEPOPUPVIEW:string = "AcCrossServerHegemonyFlagRulePopupView";

		//群雄争霸  榜单
		export const ACCROSSSERVERHEGEMONYRANKLISTPOPUPVIEW:string = "AcCrossServerHegemonyRankListPopupView";

		//群雄争霸  派遣门客
		export const ACCROSSSERVERHEGEMONYBATTLEVIEW:string = "AcCrossServerHegemonyBattleView";
		//群雄争霸  联盟对战信息
		export const ACCROSSSERVERHEGEMONYDETAILPOPUPVIEW:string = "AcCrossServerHegemonyDetailPopupView";	
		//群雄争霸  帮派阵容
		export const ACCROSSSERVERHEGEMONYWARJOINPOPUPVIEW:string = "AcCrossServerHegemonyWarJoinPopupView";	
		//群雄争霸  门客选择
		export const ACCROSSSERVERHEGEMONYSELECTSERVANTPOPUPVIEW  = "AcCrossServerHegemonySelectServantPopupView";
		//群雄争霸  战斗回放
		export const ACCROSSSERVERHEGEMONYBATTLESHOWVIEW  = "AcCrossServerHegemonyBattleShowView";
		//群雄争霸  战斗结果
		export const ACCROSSSERVERHEGEMONYBATTLERESULTVIEW  = "AcCrossServerHegemonyBattleResultVIew";
		/** 帮会战 -- 计策选择界面 */
		export const ACCROSSSERVERHEGEMONYSELECTPLANPOPUPVIEW  = "AcCrossServerHegemonySelectPlanPopupView";
		/** 帮会战 -- 计策使用界面 */
		export const ACCROSSSERVERHEGEMONYUSEPLANPOPUPVIEW  = "AcCrossServerHegemonyUsePlanPopupView";
		// 使用战旗
		export const ACCROSSSERVERHEGEMONYUSEFLAGPOPUPVIEW:string = "AcCrossServerHegemonyUseFlagPopupView";

		//兔宝弹窗
		export const ACRABBITCOMINGSHOPVIEW:string = "AcRabbitComingShopView";
		export const ACRABBITCOMINGREWARDPOPUPVIEW:string = "AcRabbitComingRewardPopupView";
		export const ACRABBITCOMINGREWARDPOPUPVIEW3:string = "AcRabbitComingRewardPopupView|3";
		export const ACRABBITCOMINGRANKVIEW:string = "AcRabbitComingRankView";
		export const ACRABBITCOMINGRANKVIEW2:string = "AcRabbitComingRankView|2";
		export const ACRABBITCOMINGRANKVIEW3:string = "AcRabbitComingRankView|3";

		//朝廷诏令排行榜
		export const ACCHAOTINGRANKLISTPOPUPVIEW:string = "AcChaoTingRankListPopupView";

		//评定匈奴
		export const ACBEATXIONGNUREWARDVIEW:string = "AcBeatXiongNuRewardView";
		export const ACBEATXIONGNUREWARDVIEW2:string = "AcBeatXiongNuRewardView|2";
		export const ACBEATXIONGNUREWARDVIEW4:string = "AcBeatXiongNuRewardView|4";
		/**
		 * 清风纸鸢
		 */
		export const ACKITEDETAILPOPUPVIEW:string="AcKiteDetailPopupView";
		export const ACKITEDETAILPOPUPVIEWTAB2:string="AcKiteDetailPopupView|2";
		export const ACKITERANKDETAILPOPUPVIEW:string="AcKiteRankDetailPopupView";

		/**
		 * 兰亭荷花
		 */
		export const ACLOTUSDETAILPOPUPVIEW:string="AcLotusDetailPopupView";
		export const ACLOTUSDETAILPOPUPVIEW2:string="AcLotusDetailPopupView|2";
		export const ACLOTUSDETAILPOPUPVIEW4:string="AcLotusDetailPopupView|4";
		export const ACLOTUSRANKDETAILPOPUPVIEW:string="AcLotusRankDetailPopupView";

		/**切换线路 */
		export const SELECTLINEPOPUPVIEW:string="SelectLinePopupView";

		/**跨服权势 */
		export const ACCROSSSERVERPOWERUSEFLAGPOPUPVIEW:string="AcCrossServerPowerCheerUseFlagPopupView";
		export const ACCROSSSERVERPOWERCHEERRULEPOPUPVIEW:string="AcCrossServerPowerRulePopupView";

		/**跨服亲密 */
		export const ACCROSSSERVERIMACYUSEFLAGPOPUPVIEW:string="AcCrossServerIntimacyCheerUseFlagPopupView";
		export const ACCROSSSERVERIMACYCHEERRULEPOPUPVIEW:string="AcCrossServerIntimacyRulePopupView";

		/**天骄群芳 */
		export const ACCROSSSERVERWIFEBATTLEUSEFLAGPOPUPVIEW:string="AcCrossServerWifeBattleCheerUseFlagPopupView";
		export const ACCROSSSERVERWIFEBATTLECHEERRULEPOPUPVIEW:string="AcCrossServerWifeBattleCheerRulePopupView";		

		/**风云擂台 */
		export const ACCROSSATKRACECHEERUSEFLAGPOPUPVIEW:string="AcCrossAtkraceCheerUseFlagPopupView";
		export const ACCROSSATKRACECHEERRULEPOPUPVIEW:string="AcCrossAtkraceCheerRulePopupView";
		/**
		 * 神器迷宫
		 */
		export const ACWEAPONMAZEDETAILPOPUPVIEW:string="AcWeaponMazeDetailPopupView";
		export const ACWEAPONMAZEDETAILPOPUPVIEW2:string="AcWeaponMazeDetailPopupView|2";
		export const ACWEAPONMAZEDETAILPOPUPVIEW4:string="AcWeaponMazeDetailPopupView|4";

		/**
		 * 端午节活动【粽夏连连看】
		 */
		export const ACFINDSAMEREWARDPOPVIEW:string = "AcFindSameRewardPopView";
		export const ACFINDSAMEREWARDPOPVIEWTab3:string = "AcFindSameRewardPopView|3";
		export const ACFINDSAMEREWARDPOPVIEWTab4:string = "AcFindSameRewardPopView|4";
		export const ACFINDSAMESKINPOPUPVIEW:string="AcFindSameSkinPopupView";

		//红包来了
		export const ACREDPACKRESULTVIEW:string = "AcRedPackResultView";

		//棋社对弈
		export const ACCHESSREWARDPOPVIEW:string = "AcChessRewardPopView";
		export const ACCHESSREWARDPOPVIEWTAB2:string = "AcChessRewardPopView|1";
		export const ACCHESSSHOWVIEW:string = "AcChessShowView";
		export const ACCHESSSKINPOPUPVIEW:string = "AcChessSkinPopupView";

		//骑士选拔
		export const ACKNIGHTREWARDPOPVIEW:string = "AcKnightRewardPopView";
		export const ACKNIGHTREWARDPOPVIEWTAB2:string = "AcKnightRewardPopView|1";	
		export const ACKNIGHTREWARDPOPVIEWTAB4:string = "AcKnightRewardPopView|3";	

		/**
		 * 皇城六部
		 */
		export const SIXSECTION1TITLEPOPUPVIEW:string="SixSection1TitlePopupView";
		export const SIXSECTION1HOLDSEATPOPUPVIEW:string="SixSection1HoldSeatPopupView";
		export const SIXSECTION1TITLEHOLDPOPUPVIEW:string="SixSection1TitleHoldPopupView";
		export const SIXSECTION1SELECTSERVANTPOPUPVIEW:string="SixSection1SelectServantPopupView";
		export const SIXSECTION1SEATINFOPOPUPVIEW:string="SixSection1SeatInfoPopupView";
		export const SIXSECTION1BATTLEADDDETAILPOPUPVIEW:string="SixSection1BattleAddDetailPopupView";

		//青莲茶香
		export const ACDRINKTEAREWARDPOPVIEW:string = "AcDrinkTeaRewardPopView";
		export const ACDRINKTEAREWARDPOPVIEWTAB2:string = "AcDrinkTeaRewardPopView|1";	
		export const ACDRINKTEAREWARDPOPVIEWTAB4:string = "AcDrinkTeaRewardPopView|3";		

		/** 神器分解*/
		export const WEAPONRESOLVEPOPVIEW:string = "WeaponResolvePopView";
		export const WEAPONRESOLVEITEMUSEPOPUPVIEW:string = "WeaponResolveItemUsePopView";

		/**
		 * 鼠来如意
		 */
		export const ACMOUSECOMEDETAILPOPUPVIEW:string="AcMouseComeDetailPopupView";
		export const ACMOUSECOMEDETAILPOPUPVIEWTAB2:string="AcMouseComeDetailPopupView|2";
		export const ACMOUSECOMEDETAILPOPUPVIEWTAB4:string="AcMouseComeDetailPopupView|4";
		export const ACMOUSECOMEREWARDPOPUPVIEW:string="AcMouseComeRewardPopupView";
		export const ACMOUSECOMERANKDETAILPOPUPVIEW:string="AcMouseComeRankDetailPopupView";

		/**
		 * 神兵宝库
		 */
		export const ACWEAPONHOUSEPOPUPVIEW:string="AcWeaponHousePopupView";
		export const ACWEAPONHOUSERANKPOPUPVIEW:string="AcWeaponHouseRankPopupView";
		export const ACWEAPONHOUSERANKSHOWPOPUPVIEW:string="AcWeaponHouseRankShowPopupView";
		export const ACWEAPONHOUSERANKPOPUPVIEWTAP2:string="AcWeaponHouseRankPopupView|1";

		/**
		 * 夜观天象
		 */
		export const ACNIGHTSKYDETAILPOPUPVIEW:string="AcNightSkyDetailPopupView";
		export const ACNIGHTSKYDETAILPOPUPVIEWTAB2:string="AcNightSkyDetailPopupView|2";
		export const ACNIGHTSKYDETAILPOPUPVIEWTAB3:string="AcNightSkyDetailPopupView|3";

		/**
		 * 滨海伊人
		 */
		export const ACSEAWOMANPOPVIEW:string="AcSeaWomanPopView";
		export const ACSEAWOMANPOPVIEWTAB3:string="AcSeaWomanPopView|3";

		/**
		 * 	情定鹊桥
		 */
		export const ACBIRDBRIDGEPOPVIEW:string="AcBirdBridgePopView";
		export const ACBIRDBRIDGEPOPVIEWTAB2:string="AcBirdBridgePopView|2";
		export const ACBIRDBRIDGEPOPVIEWTAB3:string="AcBirdBridgePopView|3";

		/**
		 * 	神器地牢
		 */
		export const ACWEAPONPRISONPOPUPVIEW:string="AcWeaponPrisonPopupView";
		export const ACWEAPONPRISONPOPUPVIEWTAB2:string="AcWeaponPrisonPopupView|2";
		export const ACWEAPONPRISONPOPUPVIEWTAB4:string="AcWeaponPrisonPopupView|4";
		export const ACWEAPONPRISONRANKDETAILPOPUPVIEW:string="AcWeaponPrisonRankDetailPopupView";
		

		/**
		 * 情定鹊桥
		 */
		export const BIRDBRIDGECHOOSEVIEW:string="BirdBridgeChooseView";
		

		//天籁之音
		export const ACSKYSOUNDREWARDPOPVIEW:string = "AcSkySoundRewardPopView";
		export const ACSKYSOUNDREWARDPOPVIEWTAB2:string = "AcSkySoundRewardPopView|1";	
		export const ACSKYSOUNDREWARDPOPVIEWTAB4:string = "AcSkySoundRewardPopView|3";	

		//天魔铠甲
		export const ACSKYARMORREWARDPOPVIEW:string = "AcSkyArmorRewardPopView";
		export const ACSKYARMORREWARDPOPVIEWTAB2:string = "AcSkyArmorRewardPopView|1";	
		export const ACSKYARMORREWARDPOPVIEWTAB4:string = "AcSkyArmorRewardPopView|3";	
		export const ACSKYARMORRANKDETAILPOPUPVIEW:string="AcSkyArmorRankDetailPopupView";	

		//求签问卜
		export const ACASKGODACHREWARDPOPVIEW:string = "AcAskGodAchRewardPopView";
		export const ACASKGODPREREWARDPOPVIEW:string = "AcAskGodPreRewardPopView";	
		export const ACASKGODSKINREWARDPOPVIEW:string = "AcAskGodSkinRewardPopView";
		export const ACASKGODREWARDPOPUPVIEW:string = "AcAskGodRewardPopupView";				

		/**
		 * 跨服门客冲榜排行奖励
		 */
		export const ACCROSSRANKREWPOPUPVIEW: string = "AcCrossRankRewPopupView";
		/**
		 * 跨服门客排行榜
		 */
		export const ACCROSSRANKPOPUPVIEW: string = "AcCrossRankPopupView";
		/**
		 * 跨服门客任务
		 */
		export const ACCROSSTASKPOPUPVIEW: string = "AcCrossTaskPopupView";

		/**新服预约 */
		export const ACNEWAPPOINTPREVIEWGIFTDETAILPOPUPVIEW:string="AcNewappointPreviewGiftDetailPopupView";

		/**
		 * 鼠来招财
		 */
		export const ACMOUSEGOLDREWARDPOPVIEW:string="AcMouseGoldRewardPopView";
		export const ACMOUSEGOLDREWARDPOPVIEWTAB2:string="AcMouseGoldRewardPopView|1";
		export const ACMOUSEGOLDREWARDPOPVIEWTAB4:string="AcMouseGoldRewardPopView|3";
		export const ACMOUSEGOLDRANKDETAILPOPUPVIEW:string="AcMouseGoldRankDetailPopupView";

		/**
		 * 鼠来进宝
		 */
		export const ACMOUSETREASUREREWARDPOPVIEW:string="AcMouseTreasurePopupView";
		export const ACMOUSETREASUREREREWARDPOPVIEWTAB2:string="AcMouseTreasurePopupView|1";
		export const ACMOUSETREASUREREREWARDPOPVIEWTAB4:string="AcMouseTreasurePopupView|3";
		export const ACMOUSETREASURERERANKDETAILPOPUPVIEW:string="AcMouseTreasureRankDetailPopupView";
		export const ACMOUSETREASUREREAWARDVIEW:string="AcMouseTreasureAwardView";
		export const ACMOUSETREASUREREBUYITEMVIEW:string="MouseTreasureBuyItemView";
		export const ACMOUSETREASUREREUSEITEMVIEW:string="MouseTreasureUseItemView";

		/**
		 * 权倾天下
		 */
		export const ACPOWERFULLDETAILVIEW:string="AcPowerFullDetailView";
		export const ACPOWERFULLDETAILVIEWTAB2:string="AcPowerFullDetailView|2";
		export const ACPOWERFULLDETAILVIEWTAB4:string="AcPowerFullDetailView|4";

		/**
		 * 情系良缘
		 */
		export const ACGOODMATCHDETAILPOPUPVIEW:string="AcGoodMatchDetailPopupView";
		export const ACGOODMATCHDETAILPOPUPVIEWTAB3:string="AcGoodMatchDetailPopupView|3";
		export const ACGOODMATCHDETAILPOPUPVIEWTAB4:string="AcGoodMatchDetailPopupView|4";

		/**新版三国争霸 */
		export const ACNEWTHREEKINGDOMSBUFFDETAILVIEW:string="AcNewThreeKingdomsBuffDetailView";//buff详情
		export const ACNEWTHREEKINGDOMSJOINRANKPOPUPVIEW:string="AcNewThreeKingdomsJoinRankPopupView";//资格排名
		export const ACNEWTHREEKINGDOMSTOKENPREPOPUPVIEW:string="AcNewThreeKingdomsTokenPrePopupView";//战令奖励预览
		export const ACNEWTHREEKINGDOMSBATTLEBUFFPOPUPVIEW:string="AcNewThreeKingdomsBattleBuffPopupView";//战斗筹备
		export const ACNEWTHREEKINGDOMSCITYDETAILPOPUPVIEW:string="AcNewThreeKingdomsCityDetailPopupView";//城池详情

		/**
		 * 花好月圆
		 */
		export const ACFLOWERMOONREWARDPOPVIEW:string="AcFlowerMoonRewardPopView";
		export const ACFLOWERMOONREWARDPOPVIEWTAB2:string="AcFlowerMoonRewardPopView|1";
		export const ACFLOWERMOONREWARDPOPVIEWTAB3:string="AcFlowerMoonRewardPopView|2";
		export const ACFLOWERMOONREWARDPOPVIEWTAB4:string="AcFlowerMoonRewardPopView|3";
		export const ACFLOWERMOONRANKREWARDPOPVIEW:string="AcFlowerMoonRankRewardPopView";
		export const ACFLOWERMOONRANKPERSONPOPVIEW:string="AcFlowerMoonRankPersonPopView";		
		export const ACFLOWERMOONRANKZONEPOPVIEW:string="AcFlowerMoonRankZonePopView";	
	}	


	/**
	 * 直接继承BaseView的界面
	 */
	export namespace BASE
	{

		/** 
		 * 登陆界面
		 **/
		export const LOGINVIEW:string="LoginView";

		/**
		 *  战斗结算 胜利
		 */
		export const BATTLEWIN:string="BattleWin";

		/**
		 *  温馨提示 1，战斗失败， 2，没钱了
		 */
		export const PROMPTVIEW:string="PromptView";
		/**
		 *  天梯战斗
		 */
		export const LADDERBATTLEWIN:string="LadderBattleWin";
		/**
		 *  宠幸得到孩子
		 */
		export const WIFEGETCHILDVIEW:string="WifeGetChildView";

		/**
		 *  宠幸红颜动画
		 */
		export const WIFELOVEANIVIEW:string="WifeLoveAniView";

		/**
		 * 获得红颜
		 */
		export const WIFEGETVIEW:string="WifeGetView";


		/**
		 * 关卡剧情
		 */
		export const CHALLENGESTORY:string="ChallengeStory";
		/**
		 * 新手引导
		 */
		export const ROOKIEVIEW:string="RookieView";
		export const ROOKIEENSTORYVIEW:string="RookieEnStoryView";
		export const CHOOSESEXVIEW:string="ChooseSexView";

		/**
		 * 获得门客
		 */
		export const SERVANTGETVIEW:string="ServantGetView";

		/**
		 * 膜拜弹出UI
		 */
		export const RANKWORSHIPVIEW:string="RankWorshipView";

		/**
		 *  孩子金榜题名界面
		 */
		export const CHILDUPDVIEW:string="ChildUpdView";

		/**
		 *  结婚成功界面
		 */
		export const ADULTMARRYSUCCESSVIEW:string="AdultMarrySuccessView";

		/**
		 *  接受拜访成功界面
		 */
		export const ADULTVISITSUCCESSVIEW:string="AdultReceiveSuccessView";
		
		/**
		 *  宴会成功界面
		 */
		export const DINNEROPENEDVIEW:string="DinnerOpenedView";

		/**
		 *  宴会结束界面
		 */
		export const DINNERFINISHVIEW:string="DinnerFinishView";

		/**
		 *  前往宴会界面
		 */
		export const GOTODINNEREDVIEW:string="GotoDinnerView";

		/**
		 *  惩戒女囚官报界面
		 */
		export const ACPUNISHREPORTVIEW:string="AcPunishReportView";
		export const ACCOMMONREPORTVIEW:string="AcCommonReportView";
		/**
		 * 门客升爵
		 */
		export const SERVANTADVANCEVIEW:string="ServantAdvanceView";
		export const STUDYATKSUCCESSVIEW:string="StudyatkSuccessView";
		export const STUDYATKBOOLLVUPSUCCESSVIEW:string="StudyAtkBookLvupSuccessView";
		export const WIFECALLBATCHSUCCESSVIEW:string="WifeCallBatchSuccessView";

		export const STUDYATKBATTLERESULEVIEW:string="StudyatkBattleResultView";
		/**
		 * 加入帮会动画
		 */
		export const ALLIANCECREATEANIVIEW:string="AllianceCreateAniView";

		export const ITEMUSESUCCESSVIEW:string="ItemUseSuccessView";
		export const NEWITEMUSESUCCESSVIEW:string="NewItemUseSuccessView";

		/**
		 *  韩国条款界面
		 */
		export const KRAGREEMENTVIEW:string="KRAgreementView";
		

		/**
		 *  册封成功界面
		 */
		export const WIFESTATUSSHOWVIEW:string="WifestatusShowView";

		/**
		 *  八王夺帝
		 */
		export const EMPERORWARBATTLERESULTVIEW:string="EmperorwarBattleResultView";
		export const EMPERORWARROUNDRESULTVIEW:string="EmperorwarRoundResultView";

		export const PRESTIGEDISPLAYVIEW:string = "PrestigeDisplayView";

		export const ACJD618VIEW:string = "AcJD618View";

		/**
		 * 金銮殿
		 */
		export const DECREEPAPERINFOVIEW:string="DecreePapeInfoView";
		export const DECREEPAPERVIEW:string="DecreePaperView";

		/**
		 * 七夕灯会
		 */
		export const ACDOUBLESEVENTHAVGVIEW:string="AcDoubleSeventhAVGView";
		/**
		 * 议事院/内阁
		 */
		export const COUNCILVIEW:string="CouncilView";
		//双11红包
		export const ACSINGLEDAYENVELOPEVIEW:string="AcSingleDayEnvelopeView";
		export const ACSINGLEDAYROOKIEVIEW:string="AcSingleDayRookieView";
		//门客战引导
		export const COUNTRYWAYAVGVIEW:string="CountryWarAVGView";
		//财神降临
		export const ACTREASUREHUNTWEALTHSUCVIEW:string="AcTreasureHuntWealthSucView";
		/**
		 * 元旦剧情
		 */
		export const ACTREASUREHUNTAVGVIEW:string="AcTreasureHuntAVGView";

		/**
		 * 京城夜赏 剧情
		 */
		export const ACENJOYNIGHTAVGVIEW:string="AcEnjoyNightAVGView";
		export const ACAC2020AVGVIEW:string="AcAC2020AVGView";
		
		/**
		 * 元旦活动骰子结果
		 */
		export const ACTREASUREHUNTBOXRESULTVIEW:string="AcTreasureHuntBoxResultView";
		export const ACENJOYNIGHTBOXRESULTVIEW:string="AcEnjoyNightBoxResultView";

		export const ACAC2020BOXRESULTVIEW:string="AcAC2020BoxResultView";
		
		/**
		 * 爆竹迎新avg
		 */
		export const ACNEWYEARCRACKERAVGVIEW:string="AcNewYearCrackerAVGView";
		/**
		 * 转世剧情avg
		 */
		export const WIFECHANGESEXAVGVIEW:string="WifeChangeSexAvgView";
		
		/**
		 * 特殊奖励--获得子嗣
		 */
		export const SPECIALCHILDGETVIEW:string="SpecialChildGetView";
		/**
		 * 特殊奖励--获得金榜提名
		 */
		export const SPECIALCHILDUPGETVIEW:string="SpecialChildUpGetView";
		/**
		 * 勤王除恶官报板子
		 */
		export const ALLIANCEWEEKENDREPORTVIEW:string="AllianceWeekEndReportView";
		/**
		 * 勤王除恶战斗结果板子
		 */
		export const ALLIANCEWEEKENDBATTLEREPORTVIEW:string="AllianceWeekEndBattleReportView";
		/**
		 * 勤王除恶战前提示
		 */
		export const ALLIANCEWEEKENDBATTLETIPBASEVIEW:string="AllianceWeekEndBattleTipBaseView";
		/**
		 * 神器展示
		 */
		export const WEAPONCOMEONVIEW:string="WeaponComeOnView";
		/**
		 * 翻盘奖励提示
		 */
		export const ACLUCKYDRAWPREVIEW:string="AcLuckyDrawPreView";
		/**
		 * 暗夜魅影奖励提示
		 */
		export const ACDESTROYSAMEPREVVIEW:string="AcDestroySamePrevView";
		
		/**
		 * 红颜宠幸剪影
		 */
		export const WIFELOVECUCOLORISVIEW:string="WifeLoveCucolorisView";
		/**
		 * 周年祈愿皮肤预览弹板
		 */
		export const ACANNUALPRAYPREVVIEW:string="AcAnnualPrayPreView";
	}

	/**
	 * 直接继承BaseBattleView的界面
	 */
	export namespace BATTLE
	{
		/**
		 * 擂台战斗
		 */
		export const ATKRACEBATTLEVIEW:string="AtkraceBattleView";

		/**
		 * 跨服擂台战斗
		 */
		export const ATKRACECROSSBATTLEVIEW:string="AtkracecrossBattleView";
		export const NEWATKRACECROSSBATTLEVIEW:string="NewAtkracecrossBattleView";

		/**
		 * 关卡boss
		 */
		export const BOSSBATTLEVIEW:string="BossBattleView";

		/**
		 * 副本 战斗界面
		 */
		export const DAILYBOSSBATTLEVIEW:string="DailybossBattleView";
		export const DAILYBOSSNEWBATTLEVIEW:string="DailybossnewBattleView";


		/**
		 * 军团副本 战斗界面
		 */
		export const ALLIANCEBOSSBATTLEVIEW:string="AllianceBossBattleView";

		/**
		 * 战斗视图
		 */
		export const BATTLEVIEW:string="BattleView";

		/**
		 * 关卡战斗视图
		 */
		export const FIGHTVIEW:string="FightView";

		/**
		 * 关卡战斗视图
		 */
		export const CONQUESTFIGHTVIEW:string="ConquestFightView";
		/**
		 * 称帝战斗视图
		 */
		export const EMPERORWARBATTLEVIEW:string="EmperorwarBattleView";	

		/**
		 * 黑市
		 */
		export const ACBLACKMARKETVIEW:string="AcBlackMarketView";	

		/**
		 * 钱庄
		 */
		export const ACBANKBOXVIEW:string="AcBankBoxView";	

		/**
		 * 绝地擂台战斗
		 */
		export const ACBATTLEGROUNDFIGHTVIEW:string="AcBattleGroundFightView";

		/**
		 * 三国争霸神将突袭战斗
		 */
		export const ACTHREEKINGDOMSHEROATTACKVIEW:string="AcThreeKingdomsHeroAttackView";
	}
}