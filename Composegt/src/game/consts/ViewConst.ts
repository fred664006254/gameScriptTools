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
		/**
		 * 排行榜玩家信息弹窗 新
		 */
		export const RANKUSERINFOVIEW:string = "RankUserInfoView";
		/**
		 * 寻访故事播放
		 */
		export const SEARCHSTORYVIEW:string = "SearchStoryView";
	
		export const ACONEYEAROVERVIEW:string = "AcOneYearOverviewView";
		export const ACONEYEARPACKSKINVIEW:string = "AcOneYearPackSkinView";
		export const ACONEYEARPACKSKINDETAILVIEW:string = "AcOneYearPackSkinDetailView";
		
		//电玩大本营
		/** 电玩大本营-奖励展示 */
		export const ACARCADEGAMEREWARDVIEW:string = "AcArcadeGameRewardView";

		/** 电玩大本营-抽奖 */
		export const ACARCADEGAMEGETREWARDPOPUPVIEW:string = "AcArcadeGameGetRewardPopupView";

		/** 电玩大本营-日志 */
		export const ACARCADEGAMELOGVIEW:string = "AcArcadeGameLogView";
		export const ACARCADEGAMELISTVIEW:string = "AcArcadeListPopupView";
		export const ACARCADEGAMEBATCHPOPUPVIEW:string=`AcArcadeBatchPopupView`;
		//电玩大本营 AcArcadeBatchPopupView
		/**电玩大本营--游戏 */
		export const ACARCADEGAMEVIEW:string = "AcArcadeGameView";
		export const TITLEUPGRADELLEVELUPVIEW:string=`TitleUpgradeLevelUpView`;
		
		
		
		export const ACEXAMANSWERRANKPOPUPVIEW:string="AcExamAnswerRankPopupView";
		//玩家回归
		export const PLAYERRETURNVIEW:string="PlayerReturnView";
		
		//皮肤
		export const SKINVIEW:string="SkinView";
		export const SKINDETAILVIEW:string="SkinDetailView";
		export const SKINLEVELUPVIEW:string="SkinLevelUpView";

		/** 用户信息界面 */
		export const PLAYERVIEW:string = "PlayerView";
		/** 打开道具 */
		export const ITEMVIEW_TAB1:string = "ItemView";
		export const ITEMVIEW_TAB2:string = "ItemView|1";
		export const ITEMVIEW_TAB3:string = "ItemView|2";
		/**打开红颜已迎娶 */
		export const WIFEVIEW_TAB1:string = "WifeView|1";
		/**打开红颜未迎娶 */
		export const WIFEVIEW_TAB2:string = "WifeView|2";
		export const WIFEUNLOCKVIEW:string = "WifeUnLockView";
		export const WIFESTATUSVIEW:string = "WifestatusView";
		export const WIFEALLTALENTVIEW:string = "WifeAllTalentView";
		export const ACCROSSSERVERWIFEALLTALENTVIEW:string = "AcCrossServerWifeAllTalentView";
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
		export const MANAGEVIEW:string="ManageView";

		/**
		 * 征收界面
		 */
		export const LEVYVIEW:string="LevyView";

		/**
		 * 关卡界面
		 */
		export const CHALLENGEVIEW:string="ChallengeView";

		//门客
		export const SERVANTVIEW:string="ServantView";
		export const SERVANTINFOVIEW:string="ServantInfoView";
		export const SERVANTINFOVIEW_TAB2:string="ServantInfoView|2";
		export const SERVANTSKINCHANGEVIEW:string="ServantSkinChangeView";
		
		//升官
		export const PROMOTIONVIEW:string="PromotionView";
		/**升官成功 */
		export const PROMOTIONSUCCESSVIEW:string="PromotionSuccessView";
		export const PROMOTIONSUCCESSDRAGONVIEW:string="PromotionSuccessDBDragonView";
		//政务
		export const AFFAIRVIEW:string="AffairView";
		
		//红颜操作
		export const WIFEOPTVIEW:string="WifeOptView";
		//红颜转生
		export const WIFECHANGESEXVIEW:string="WifeChangeSexView";
		//红颜转生成功
		export const WIFECHANGESEXSUCCESSVIEW:string="WifeChangeSexSuccessView";

		/**
		 * 子嗣
		 */
		export const CHILDVIEW:string="ChildView";

		/**
		 * 创建角色
		 */
		export const GUIDECREATEUSERVIEW:string="GuideCreateUserView";

		/**
		 * 新创建角色界面
		 */
		export const CREATEUSERVIEW:string = "CreateUserView";

		/**
		 * 排行
		 */
		export const RANKVIEW:string="RankView";
		export const RANKCROSSVIEW:string="RankCrossView";
		export const RANKSINGLEVIEW:string="RankSingleView";
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
		
		export const ACCROSSSERVERWIPEBOSSCHATVIEW:string="AcCrossServerWipeBossChatView";

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
		export const SHOPVIEW_TAB3:string="ShopView|2";
		
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
		 * 充值＋特权WifeTalentBuffPopupView
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
		 * 牢房
		 */
		export const PRISONVIEW:string="PrisonView";
		
		 
 

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
		// export const ACNEWYEARVIEWTAB2:string="AcNewYearViewTab2";

		


		// export const RECHARGEVIPVIEWTAB2:string = "RechargeVipView|1";
	
		

		

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
		
		/**
		 *  擂台/排行榜
		 */
		export const ATKRACERANKLISTVIEW:string="AtkraceRankListView";

		/**擂台选人 */
		export const ATKRACESELECTVIEW: string = "AtkraceSelectView";
			


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

		/**
		 * 红颜门客详情界面
		 */
		export const SERVANTWIFEDETAILVIEW:string="ServantWifeDetailView";
		/**
		 * 贸易战斗
		 */
		export const TRADEFIGHTVIEW:string = "TradeFightView";
		/**
		 * 贸易胜利
		 */
		export const TRADEINFOPOPUPVIEW:string = "TradeInfoPopupView";
	
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
		export const PALACECROSSVIEW:string = "PalaceCrossView";
		export const PALACEVIEW:string = "PalaceView";
		export const PALACEHOUSEGROUPVIEW:string = "PalaceHouseGroupView";
		export const PALACEEMPERORMOREVIEW:string = "PalaceEmperorMoreInfoView";
		export const PALACEEMPERORLVUPVIEW:string = "PalaceEmperorLvupView";
		
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
		/**
		 * 每日小额礼包
		 */
		export const ACDAILYGIFTVIEW: string = "AcDailyGiftView";

		/**
		 *  端午活动
		 */
		export const ACDGRAGONBOATDAYVIEW:string="AcDragonBoatDayView";

		/*
		*跨服权势活动主界面
		*/
		export const ACCROSSSERVERCROSSENTERVIEW:string="AcCrossServerPowerEnterView";
		//帮会战首页
		export const ALLIANCEWARVIEW="AllianceWarView";	
		export const ALLIANCEWARVSVIEW="AllianceWarVsView";	
		export const ALLIANCEWARSHOWANTIVIEW="AllianceWarShowAntiView";	
		//查看双十一代金券
		export const ACSINGLEDAYCOUPONVIEW:string = "AcSingleDayCouponView";
		//仙人馈赠楼层
		export const ACSINGLEDAYBUILD1VIEW:string = "AcSingleDayBuild1View";
		export const ACSINGLEDAYSKINVIEW:string="AcSingleDaySkinView";
		export const ACSINGLEDAYBUILD3VIEW:string = "AcSingleDayBuild3View";

		//好友
		export const FRIENDSVIEW:string ="FriendView";

		/**
		 * 选择接待
		 */
		export const ADULTCHOOSERECEICEVIEW:string = "AdultChooseReceiveView";
		/**
		 *  圣诞节活动
		 */
		export const ACCHRISTMASTASKVIEW:string="AcChristmasTaskView";
		export const ACCHRISTMASRESULTVIEW:string="AcChristmasResultView";
		/**
		 *  2019圣诞节活动
		 */
		export const ACMERRYXMASTASKPOPUPVIEW:string="AcMerryXmasTaskPopupView";
		export const ACMERRYXMASTASKPOPUPVIEW_TAB3:string="AcMerryXmasTaskPopupView|2";
		export const ACMERRYXMASRESULTVIEW:string="AcMerryXmasResultView";

		
		/**
		 * 升级窗口
		 */
		export const TITLELEVELUPVIEW:string="TitleLevelUpView";
		/**
		 * 夺帝战宣传
		 */
		export const BETHEKINGVIEW:string="AcBeTheKingView";


		export const COUNCILEVENTVIEW:string = "CouncilEventView";

		export const BETHEKINGVENTERVIEW:string = "BetheKingEnterView";
		export const BETHEKINGREWARDVIEW:string = "BetheKingRewardVIew";
		
		// 筑阁祭天
		export const ACBUILDINGWORSHIPTASKVIEW:string = "AcBuildingWorshipTaskView";
		// 携美同游
		export const ACSPRINGOUTINGTASKVIEW:string = "AcSpringOutingTaskView";

		// 月夜活动 任务界面
		export const ACMOONNIGHTTASKVIEW:string = "AcMoonNightTaskView";
		// 月夜活动 衣装预览
		export const ACMOONNIGHTSHOWVIEW:string = "AcMoonNightShowView";	
		// 月夜活动 衣装预览
		export const FOURERECHARGESHOWVIEW:string = "FourRechargeShowView";	

		//围剿鳌拜
		export const ACWIPEBOSSENTERVIEW="AcWipeBossEnterView";	
		export const ACWIPEBOSSSEARCHRESULTVIEW="AcWipeBossSearchResultView";	
		export const ACWIPEBOSSBATTLEVIEW="AcWipeBossBattleView";

		export const ACCROSSSERVERWIPEBOSSENTERVIEW="AcCrossServerWipeBossEnterView";	
		export const ACCROSSSERVERWIPEBOSSSEARCHRESULTVIEW="AcCrossServerWipeBossSearchResultView";	
		export const ACCROSSSERVERWIPEBOSSBATTLEVIEW="AcCrossServerWipeBossBattleView";

		/**绝地擂台详情 */
		export const ACBATTLEDETAILSVIEW:string="AcBattleDetailsView";
		export const ACBATTLEGROUNDDETAILSVIEW:string="AcBattleGroundDetailsView";
		/** 风云擂台排行 */
		export const ACBATTLERANKPOPUPVIEW:string="AcBattleRankPopupView";
		/**帮会争顶 */
		export const ACBATTLEGROUNDMAPVIEW:string="AcBattleGroundMapView";
		export const ACBATTLEGROUNDARRESTVIEW:string="AcBattleGroundArrestView";
		//红颜对战 搜索结果
		export const WIFEBATTLESEARCHRESULTVIEW:string="WifebattleSearchResultView";
		////红颜对战  对战结果
		export const WIFEBATTLERESULTVIEW:string="WifebattleResultView";
		////红颜对战  对战
		export const WIFEBATTLEBATTLEVIEW:string="WifebattleBattleView";

		//红颜对战 搜索结果
		export const ACCROSSSERVERWIFEBATTLESEARCHRESULTVIEW:string="AcCrossServerWifeBattleSearchResultView";
		////红颜对战  对战结果
		export const ACCROSSSERVERWIFEBATTLERESULTVIEW:string="AcCrossServerWifeBattleResultView";
		////红颜对战  对战
		export const ACCROSSSERVERWIFEBATTLEBATTLEVIEW:string="AcCrossServerWifeBattleBattleView";
		////红颜对战  对战
		export const ACCROSSSERVERWIFEBATTLEVIEW:string="AcCrossServerWifeBattleView";
		// 新官上任
		export const LOGINWEEKVIEW:string="LoginWeekView";

		/** 麦田飘香 **/
		export const ACRYEHARVESTCHARGEVIEW:string = "AcRyeHarvestChargeView";

		// 箭无虚发
		export const ACARROWVIEW:string = "AcArrowView";
		export const ACARROWLWVWLVIEW:string = "AcArrowLevelView";
		export const ACARROWRANKVIEW:string = "AcArrowRankView";

		//狂欢之夜官报
		export const ACCARNIVALNIGHTREPORTVIEW:string="AcCarnivalNightReportView";
		
		// 月夜活动 衣装预览
		export const ACRECHARGEBOXSPSHOWVIEW:string = "AcRechargeBoxSpShowView";

		//双十一活动入口
		export const ACSINGLEDAYOVERVIEW:string = "AcSingleDayOverviewView";

		// 跨服元宝消耗冲榜
		export const ACCROSSSERVERGEMEXPENDVIEW:string = "AcCrossServerGemExpendView";

		/** 
		 * 定军中原
		 */
		export const ACCONQUERMAINLANDVIEW:string = "AcConquerMainLandView";
		export const ACCONQUERMAINLANDWARVIEW:string = "AcConquerMainLandWarView";
		export const ACCONQUERMAINLANDSENDFIGHTVIEW:string = "AcConquerMainLandSendFightView";
		export const ACCONQUERMAINLANDDETAILVIEW:string = "AcConquerMainLandDetailView";
		export const ACCONQUERMAINLANDDETAILRANKVIEW:string = "AcConquerMainLandDetailView|2";
		export const ACCONQUERMAINLANDDETAILARMYVIEW:string = "AcConquerMainLandDetailView|3";
		export const ACCONQUERMAINLANDDETAILTASKVIEW:string = "AcConquerMainLandDetailView|4";
		export const ACCONQUERMAINLANDWARSHOWVIEW:string = "AcConquerMainLandWarShowView";

		/**擂台战斗 */
		export const ATKRACEBATTLEVIEW:string="AtkraceBattleView";

	}

	/**
	 * 小弹窗，继承popupview的界面
	 */
	export namespace POPUP
	{

		/**
		 * 通用任务弹窗,请前往AcCommonTaskPopupView查看参数和用法
		 */
		export const ACCOMMONTASKPOPUPVIEW:string = "AcCommonTaskPopupView";
		
		export const ACCROSSSERVERWIFETALENTBUFFPOPUPVIEW:string = "AcCrossServerWifeTalentBuffPopupView";
		/** 跨服活动区服内排行榜*/
		export const ACCROSSRANKLISTVIEW:string = "AcCrossRankListView";
		
		export const WIFETALENTBUFFPOPUPVIEW:string = "WifeTalentBuffPopupView";
		export const ACONEYEARPACKBOXPREVIEWPOPUPVIEW:string = "AcOneYearPackBoxPreviewPopupView";
		/** 通用红颜皮肤弹框 */
		export const ACCOMMONWIFESKINREWARDPOPUPVIEW:string = "AcCommonWifeSkinRewardPopupView";
		/**
		 * 首页回归弹板
		 */
		export const REBACKPOPUPVIEW:string = "PlayerReturnPopupView";
		//红颜对战 排行榜
		export const WIFEBATTLERANKPOPUPVIEW:string="WifebattleRankPopupView";
		//红颜对战 商城
		export const WIFEBATTLESHOPPOPUPVIEW:string="WifebattleShopPopupView";
		//提升才情
		export const WIFETALENTUPPOPUPVIEW:string = "WifeTalentUpPopupView";
		//提升才情
		export const ACCROSSSERVERWIFEBATTLEREWARDVIEW:string = "AcCrossServerWifeBattleRewardView";
		//跨服红颜对战 排行榜
		export const ACCROSSSERVERWIFEBATTLERANKPOPUPVIEW:string="AcCrossServerWifeBattleRankPopupView";
				//提升才情
		export const ACCROSSSERVERWIFETALENTUPPOPUPVIEW:string = "AcCrossServerWifeTalentUpPopupView";
		/**
		 * 私聊
		 */
		export const PRICHATVIEW:string="PriChatView";
		
		/**微信强制分享界面 */
		export const SHARECOMMONPOPUPVIEW:string = "ShareCommonPopupView";
		/**微信征收分享界面 */
		export const SHARERECOVERPOPUPVIEW:string = "ShareRecoverPopupView";
		/** 分享奖励面板 */
		export const SHAREPOPUPVIEW:string = "SharePopupView";
		/**
		 * 群组分享奖励面板
		 */
		export const SHAREGROUPPOPUPVIEW:string = "SharegroupPopupView";
		/** 公共奖励面板 */
		export const COMMONREWARDPOPUPVIEW:string = "CommonRewardPopupView";
		/** 道具、物品详情弹板 */
		export const ITEMINFOPOPUPVIEW:string = "ItemInfoPopupView";
		/** 使用道具弹板 */
		export const ITEMUSEPOPUPVIEW:string = "ItemUsePopupView";
		/** 道具兑换弹板 */
		export const ITEMEXCHANGEPOPUPVIEW:string = "ItemExchangePopupView";
		/** 道具跳转弹板 */
		export const ITEMJUMPPOPUPVIEW:string = "ItemJumpPopupView";
		/**错误弹板 *
		export const ERRORPOPUPVIEW:string = "ErrorPopupView";
		/**规则说明弹板 */
		export const RULEINFOPOPUPVIEW:string = "RuleInfoPopupView";
		/**概率说明弹板 */
		export const PROBINFOPOPUPVIEW:string = "ProbInfoPopupView";
		//门客详情
		export const SERVANTATTRDETAILPOPUPVIEW:string="ServantAttrDetailPopupView";

		/**
		 * 离线自动获得资源弹窗
		 */
		export const AUTORESPOPUPVIEW:string="AutoResPopupView";
		/**选择门客界面 */
		export const SERVANTSELECTEDPOPUPVIEW:string = "ServantSelectedPopupView";
		/**西域商店VIP不足弹窗 */
		export const ACVIPSHOPPOPUPVIEW:string = "AcVipShopPopupView";
		/**携美同游 好感度 */
		export const ACSPRINGOUTINGLUCKUPPOPUPVIEW:string ="AcSpringOutingLuckUpPopupView";

		/**
		 * 公务奖励
		 */
		export const AFFAIRVIEWWORDREWARDPOPUPVIEW:string = "AffairWordRewardPopupView";
		/**
		 * 一键公务
		 */
		export const AFFAIRVIEWCHOICEPOPUPVIEW:string = "AffairViewChoicePopupView";
		/**
		 *  擂台挑战
		 */
		export const ATKRACECHALLENGEVIEW:string="AtkraceChallengeView";
		/**
		 *  跨服擂台挑战
		 */
		export const ATKRACECROSSCHALLENGEVIEW:string="AtkraceCrossChallengeView";
		export const ATKRACEAUTOFIGHTPOPUPVIEW:string="AtkraceAutoFightPopupView";
		export const ATKRACEFIGHTINFOPOPUPVIEW:string="AtkraceFightInfoPopupView";
		export const ATKRACECROSSAUTOFIGHTPOPUPVIEW:string="AtkracecrossAutoFightPopupView";
		/**使用道具确认取消弹板 */
		export const ITEMUSECONSTPOPUPVIEW:string = "ItemUseConstPopupView";

		/**场景宠幸选择确认界面 */
		export const WIFEBATHSCENECONFIRMPOPUPVIEW:string = "WifeBathSceneConfirmPopupView";
		/**
		 * 帮会充值排行榜弹出界面
		 */
		export const ACALLIANCERECHARGERANKPOPUPVIEW:string = "AcAllianceRechargeRankPopupView";
		/**
		 * 确认是否消耗元宝购买物品提示弹出框
		 */
		export const COSTGEMBUYITEMPOPUPVIEW:string = "CostGemBuyItemPopupView";
		/**
		 * 查看寻访建筑信息弹窗
		 */
		export const SEARCHBUILDPOPUPVIEW:string="SearchBuildPopupView";

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

		/**
		 * 排行榜玩家信息弹窗
		 */
		export const RANKUSERINGOPOPUPVIEW:string = "RankUserinfoPopupView";

		/**
		 * 实名认证领取奖励面板
		 */
		export const REALNAMEREWARDSPOPUPVIEW:string="RealnamerewardsPopupView";
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
		 * 选择孩子
		 */
		export const ADULTCHOOSECHILDVIEW:string = "AdultChooseChildView";


		/**
		 * 每日任务宝箱奖励预览
		 */
		export const DAILYTASK_REWARDPREVIEWPOPUPVIEW:string = "DailyTaskRewardPreviewPopuiView";
		/**
		 * 奖励页面
		 */
		export const ACMOONNIGHT_REWARDPOPUPVIEW:string = "AcMoonNightRewardPopupView";
		/**
		 * 奖励页面
		 */
		export const ACTHXGIVING_REWARDPOPUPVIEW:string = "AcThxgivingRewardPopupView";
		/**
		 * 携美通行道具不足
		 */
		export const ACSPRINGOUTING_BUYITEMPOPUPVIEW:string = "AcSpringOutingBuyItemPopupView";
		/**
		 * 每日任务宝箱奖励预览
		 */
		export const ACNEWYEARPOPUPVIEW:string = "AcNewYearPopupView";

		
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
		 * 皇宫历史
		 */
		export const PALACEHISTORYPOPUPVIEW:string = "PalaceHistoryPopupView";
		export const PALACEEDITSIGNPOPUPVIEW:string = "PalaceEditSignPopupView";

		/**
		 * 选服列表
		 */
		export const SERVERLISTPOPUPVIEW:string="ServerListPopupView";

		export const ACRANKLISTPOPUPVIEW:string="AcRankListPopupView";
		export const ACCROSSSERVERGEMWXPENDPOPUPVIEW:string="AcCrossServerGemExpendPopupView";
		
		export const ACTIGERTRAPPASSLISTPOPUPVIEW:string="AcTigertrappassListPopupView";
		export const ACHULAOLISTPOPUPVIEW:string="AcHuLaoListPopupView";
		export const ACHULAOGIFTLISTPOPUPVIEW:string="AcHuLaoGiftListPopupView";
		/**
		 * 成就详情列表
		 */
		export const ACHIEVEMENTDETAILPOPUPVIEW:string="AchievementDetailPopupView";

		/**
		 * 限时活动详情列表
		 */
		export const ACLIMITEDREWARDDETAILPOPUPVIEW:string="AcLimitedRewardDetailPopupView";
		/**
		 * 平成记忆任务窗口
		 */
		export const ACREIGNTITLETASKPOPUPVIEW:string="AcReignTitleTaskPopupView";

		/**
		 * 平成记忆弹出窗口
		 */
		export const ACREIGNTITLEREWARDPOPUPVIEW:string="AcReignTitleRewardPopupView";
		/** 平成记忆奖励面板 */
		export const AcREIGNTITLEGETREWARDPOPUPVIEW:string = "AcReignTitleGetRewardPopupView";
		/**
		 * 设置页面
		 */
		export const SettingPopopView:string="SettingPopopView";

		/**
		 * 联系我们
		 */
		export const SETTINGCONTACTPOPUPVIEW:string="SettingContactPopupView";
		/**
		 * 兑换码
		 */
		export const SettingCDKPopupView:string="SettingCDKPopupView";

		/**
		 * 登录失败弹板
		 */
		export const ERRORPOPUPVIEW:string="ErrorPopupView";

		export const SERVANTBOOKLEVELUPPOPUPVIEW:string="ServantBookLevelupPopupView";
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
		 * 红颜皮肤
		 */
		export const WIFESKINVIEW:string="WifeskinView";
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
		export const BOOKROOMSTRENTHENPOPUPVIEW:string="BookroomStrenthenPopupView";
		

		/**
		 * 通用确认面板
		 */
		export const CONFIRMPOPUPVIEW:string="ConfirmPopupView";

		/**
		 * 通用文字展示面板
		 */
		export const COMMONTEXTPOPUPVIEW:string="CommonTextPopupView";		
		/**
		 * 豪门特权
		 */
		export const WELFAREVIEWSPCARDDETAILPOPUP:string="WelfareViewSpCardDetailPopup";
		/**
		 * 下线面板
		 */
		export const OFFLINEVIEW:string="OfflineView";
		

		/**
		 * 合成道具详情界面
		 */
		export const COMPOSEPOPUPVIEW:string="ComposePopupView";
		/**
		 * 创建军团界面
		 */
		export const ALLIANCECREATEPOPUPVIEW:string="AllianceCreatePopupView";
		export const ALLIANCETASKBUFFLISTPOPUPVIEW:string="AllianceTaskBuffListPopupView";
		export const ALLIANCETASKRANKPOPUPVIEW:string="AllianceTaskRankPopupView";
		export const ALLIANCETASKOPENVIEW:string="AllianceTaskOpenView";

		/**
		 * 荷塘月色任务窗口
		 */
		export const ACMOONLIGHTTASKPOPUPVIEW:string="AcMoonlightTaskPopupView";
		/**
		 * 许愿天灯任务窗口
		 */
		export const ACLANTERNTASKPOPUPVIEW:string="AcLanternTaskPopupView";
		/**
		 * 许愿天灯写信
		 */
		export const ACLANTERNMAILPOPUPVIEW:string="AcLanternMailPopupView";
		/**
 		* 欢心夏日任务窗口
		 */
		export const ACSEASIDEGAMETASKPOPUPVIEW:string="AcSeasideGameTaskPopupView";
		/**
		 * 副本攻击奖励
		 */
		export const ALLIANCEBOSSATTACKEDPOPUPVIEW:string="AllianceBossAttackedPopupView";
		
		/**
		 * 擂台通用小弹版
		 */
		export const ATKRACEAGREEPOPUPVIEW:string="AtkraceAgreePopupDialog";
		export const ATKRACECROSSAGREEPOPUPDIALOG:string="AtkracecrossAgreePopupDialog";

		/**
		 * 擂台购买属性小弹版
		 */
		export const ATKRACEBUYPOPUPVIEW:string="AtkraceBuyPopupView";
		export const ATKRACECROSSBUYPOPUPVIEW:string="AtkracecrossBuyPopupView";
		
		export const STUDYATKFINDPOPUPVIEW:string="StudyatkFindPopupView";

		export const STUDYATKCREATEPOPUPVIEW:string="StudyatkCreatePopupView";

		export const STUDYATKALLCREATEPOPUPVIEW:string="StudyatkAllCreatePopupView";

		export const STUDYATKBOOKPOPUPVIEW:string="StudyatkBookPopupView";
		export const STUDYATKFAILEDPOPUPVIEW:string="StudyatkFailedPopupView";

		/**
		 * 擂台抽奖
		 */
		export const ATKRACEREWARDPOPUPVIEW:string="AtkraceRewardPopupView";
		export const ATKRACECROSSREWARDPOPUPVIEW:string="AtkracecrossRewardPopupView";
		export const ATKRACECROSSDETAILPOPUPVIEW:string="AtkracecrossDetailPopupView";

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

		/**
		 * 副本排行榜
		 */
		export let DAILYBOSSRANKPOPUPVIEW:string="DailybossRankPopupView";

		/**
		 * 副本奖励
		 */
		export let DAILYBOSSATTACKEDPOPUPVIEW:string="DailybossAttackedPopupView";

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
		export const ALLIANCEINFINITYOPENPOPUPVIEW:string = "AllianceInfinityOpenPopupView";

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
		 * 充值转盘，转盘奖励物品
		 */
		export const ACMAYDAYRECHARGEREWARDPOPUPVIEW:string="AcMayDayRechargeRewardPopupView";
		/**
		 * 福袋奖励物品
		 */
		export const ACLUCKBAGREWARDPOPUPVIEW:string = "AcLuckBagRewardPopupView";
		export const ACLUCKBAGJUMPPOPUPVIEW:string = "AcLuckBagJumpPopupView";
		/**
		 * 福袋宝箱奖励
		 */
		export const ACLUCKBAGBOXREWARDPOPUPVIEW: string =  "AcLuckBagBoxRewardPopupView";
		/**
		 * 众筹宝箱奖励
		 */
		export const ACLOTTERYBOXREWARDPOPUPVIEW: string =  "AcLotteryBoxRewardPopupView";
		/**
		 * 实名认证奖励面板
		 */
		export const REAlNAMEPOPUPVIEW:string="RealnamePopupView";


		/**
		 * 册封选择位分面板
		 */
		export const WIFESTATUSPOPUPVIEW:string="WifestatusPopupView";
		/**
		 * 册封红颜属性面板
		 */
		export const WIFESTATUSWIFEPOPUPVIEW:string="WifestatusWifePopupView";
		

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
		export const EMPERORWARREPLAYPOPUPVIEW:string="EmperorwarReplayPopupView";	

		/**
		 * 七夕灯会奖励
		 */
		export const ACDOUBLESEVENTHAWARDVIEW:string="AcDoubleSeventhAwardView";

		/**
		 * 小程序 首充界面
		 */
		export const FIRSTRECHARGEVIEW:string = "FirstRechargeView";

		export const SECONDRECHARGEVIEW:string = "SecondRechargeView";

		export const THREERECHARGEVIEW:string = "ThreeRechargeView";

		export const FOURRECHARGEVIEW:string = "FourRechargeView";

		/**
		 * 限时红颜
		 */
		export const TIMELIMITWIFEVIEW:string = "TimeLimitWifeView";

		/**
		 * 限时红颜 越南fb
		 */
		export const TIMELIMITWIFEFBVIEW:string = "TimeLimitWifeFbView";

		/**
		 * 限时礼包
		 */
		export const LIMITEDGIFTVIEW:string = "LimitedGiftView";

		/**
		 * 中秋活动查看奖励
		 */
		export const ACMIDAUTUMNREWARDINFOPOPUPVIEW:string = "AcMidAutumnRewardInfoPopupView"; 

		/**
		 * 中秋活动查看奖励
		 */
		export const ACREDLOTUSWARRIORREWARDINFOPOPUPVIEW:string = "AcRedLotusWarriorRewardInfoPopupView"; 
		/**
		 * 中秋活动详情
		 */
		export const ACMIDAUTUMNACINFOPOPUPVIEW:string = "AcMidAutumnAcInfoPopupView";

		/**
		 * 秋日美食
		 */
		export const ACBUILDINGWORSHIPACINFOPOPUPVIEW:string = "AcBuildingWorshipAcInfoPopupView";
		/**
		 * 荷塘月色详情
		 */
		export const ACMOONLIGHTACINFOPOPUPVIEW:string = "AcMoonlightAcInfoPopupView";
		/**
		 * 洗澡场景弹出窗口
		 */
		export const ACWIFEBATHINGDETAILPOPUPVIEW:string = "AcWifeBathingDetailPopupView";
		/**
		 * 洗澡场景弹出窗口
		 */
		export const ACTHXGIVINGDETAILPOPUPVIEW:string = "AcThxgivingDetailPopupView";
		/**
		 * 洗澡场景弹出窗口
		 */
		export const ACLANTERNDETAILPOPUPVIEW:string = "AcLanternDetailPopupView";
		/**
		 * 洗澡场景弹场景说明
		 */
		export const WIFEBATHSCENEDETAILPOPUPVIEW:string = "WifeBathSceneDetailPopupView";
		/**
		 * 我要变强
		 * 
		 */
		export const STRENGTHENPOPUPVIEW:string="StrengthenPopupView";

		/**
		 * 帮会跨服战斗结果弹窗
		 */
		export const ALLIANCEWARRESULTVIEW:string="AllianceWarResultView";
		export const ALLIANCEWARDAMAGERANKVIEW:string="AllianceWarDamageRankView";
		

		/**
		 * 新七日签到
		 */
		export const SIGNUPVIEW: string = "SignUpView";

		/**
		 * QQ会员礼包
		 */
		export const QQVIPGIFTPOPUPVIEW: string = "QQVipGiftPopupView";
		/**
		 * 百服活动-储值宝箱物品展示
		 */
		export const ACRECHARGEBOXPOPUPVIEW:string = "AcRechargeBoxPopupView";

		/**
		 * 特别宝箱 宝箱物品展示
		 */
		export const ACRECHARGEBOXSPPOPUPVIEW:string = "AcRechargeBoxSPPopupView";
		/**
		 * 特别宝箱 宝箱物品展示
		 */
		export const ACRECHARGEBOXSPREWARDVIEW:string = "AcRechargeBoxSPRewardView";

		/** 		 * 端午排行榜 		 */  
		export const DRAGONBOATRANKVIEW:string="AcDragonBoatDayRankView";
		
		
		/**
		 *  跨服权势奖励一览弹窗
		 */
		export const ACCROSSSERVERPOWERREWARDVIEW:string="AcCrossServerPowerRewardView";
		export const ACCROSSSERVERPOWERRANKLISTVIEW:string="AcCrossServerPowerRankListView";
		export const ACCROSSPOWERDETAILPOPUPVIEW:string="AcCrossPowerDetailPopupView";

		export const ACCROSSSERVERWIFEBATTLEDETAILPOPUPVIEW:string="AcCrossServerWifeBattleDetailPopupView";
		export const ACCROSSSERVERWIFETALENTPLUSPOPUPVIEW:string="AcCrossServerWifeTalentPlusPopupView";
		export const WIFETALENTPLUSPOPUPVIEW:string="WifeTalentPlusPopupView";
		export const WIFEBATTLESTUDYPOPUPVIEW:string="WifebattleStudyPopupView";

		/**
		 * 门客（红颜）转换的界面
		 */
		export const COMMONCHANGEOTHERREWARD= "CommonChangeOtherReward";

		export const MANAGETRADEPOPUPVIEW:string="ManageTraderPopupView";
		// 查看中奖名单
		export const ACLOTTERYPOPUPVIEW:string = "AcLotteryPopupView";
		export const ACLOTTERYREWARDVIEW:string = "AcLotteryRewardView";
		export const ACLOTTERYRANDBOXPOPUPVIEW:string = "AcLotteryRandBoxPopupView";
		
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

		//好友相关
		export const FRIENDSAPPLYPOPUPVIEW:string = "FriendApplyPopupView";
		export const FRIENDSGIFTPOPUPVIEW:string = "FriendGiftPopupView";

		export const ACSINGLEDAYGETREDPTPOPUPVIEW:string = "AcSingleDayGetRedptPopupView";
		
		export const ADULTSEARCHVIEW:string = "AdultSearchView";

		/**
		 *  翠玉生辉排行榜
		 */
		export const ACJADERANKLISTVIEW:string="AcJadeRankListView";
		/**
		 *  圣诞节活动
		 */

		export const ACCHRISTMASREWARDVIEW:string="AcChristmasRewardView";
		/**
		 * 实名认证，输入界面
		 */
		export const REALNAME3INPUTVIEW:string="Realname3InputView";

		/**
		 * 防沉迷
		 */
		export const ANTIADDICTIONPOPUPVIEW:string="AntiaddictionPopupView";

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

		export const SERVANTINFOAMULETLVPOPUPVIEW:string = "ServantInfoAmuletLvPopupView";
		/**
		 * 破冰
		 */
		export const ACICEBREAKINGGIFTRESULTVIEW:string = "AcIcebreakingGiftResultView";
		export const TITLELEVELDETAILPOPUPVIEW:string="TitleLevelDetailPopupView";


		export const BETHEKINGVOTEPOPUPVIEW:string = "BetheKingVotePopupView";
		export const BETHEKINGTASKPOPUPVIEW:string = "BetheKingTaskPopupView";
		export const BETHEKINGEXPOPUPVIEW:string = "BetheKingExPopupView";
		export const BETHEKINGGETKINGPOPUPVIEW:string = "BetheKingGetKingPopupView";

		//皮肤相关
		export const ITEMPROPOPUPVIEW:string="ItemProPopupView";
		export const SKINRANKPOPUPVIEW:string="SkinRankPopupView";
		export const SKINLEVELDETAILPOPUPVIEW:string="SkinLevelDetailPopupView";

		//服务器列表探班
		export const SERVERSHOWPOPUPVIEW:string="ServerShowPopupView";
		/**
		 * 营救红颜
		 */
		export const ACRESCUEBUYITEMPOPUPVIEW:string = "AcRescueBuyItemPopupView";
		export const ACRESCUEBUYITEMPOPUPVIEW_TAB1:string = "AcRescueBuyItemPopupViewTab1|1";
		export const ACRESCUEBUYITEMPOPUPVIEW_TAB2:string = "AcRescueBuyItemPopupViewTab1|2";
		export const ACRESCUEBUYITEMPOPUPVIEW_TAB3:string = "AcRescueBuyItemPopupViewTab1|3";
		export const ACRESCUERANKREWARDPOPUPVIEW:string = "AcRescueRankRewardPopupView";
		export const ACRESCUERANKPOPUPVIEW:string = "AcRescueRankPopupView";
		export const ACRESCUERANKPOPUPVIEW_TAB1:string = "AcRescueRankPopupView|1";
		export const ACRESCUERANKPOPUPVIEW_TAB2:string = "AcRescueRankPopupView|2";
		
		export const ACCROSSSERVANTPOWERRANKLISTPOPUPVIEW:string = "AcCrossServantPowerRankListPopupView";
		export const  ACCROSSSERVANTPOWERTASKPOPUPVIEW:string = "AcCrossServantPowerTaskPopupView";

		export const  QUESTIONNAIREPOPUPVIEW:string = "QuestionnairePopupView";
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
		/**
		 * 围剿鳌拜活动商店
		 */
		export const ACCROSSSERVERWIPEBOSSSHOPVIEW:string = "AcCrossServerWipeBossShopView";
		/**
		 * 围剿鳌拜排行奖励
		 */
		export const ACCROSSSERVERWIPEBOSSREWARDVIEW:string = "AcCrossServerWipeBossRewardView";
		/**
		 * 围剿鳌拜榜单
		 */
		export const ACCROSSSERVERWIPEBOSSRANKIEW:string = "AcCrossServerWipeBossRankView";
		export const ACCROSSSERVERWIPEBOSSRANKIEWTAB2:string = "AcCrossServerWipeBossRankView|1";
		export const ACCROSSSERVERWIPEBOSSALLIANCEINFOVIEW:string = "AcCrossServerWipeBossAllianceInfoView";
		export const ACCROSSSERVERWIPEBOSSKILLINFOIEW:string = "AcCrossServerWipeBossKillInfoView";
		export const ACCROSSSERVERWIPEBOSSGETREWARDVIEW:string = "AcCrossServerWipeBossGetRewardView";
		export const ACCROSSSERVERWIPEBOSSATTACKEDPOPUPVIEW:string = "AcCrossServerWipeBossAttackedPopupView";
		/**
		 * 门客擂台排行榜奖励弹窗
		 */
		export const CROSSSERVERSERVANTRANKVIEW:string = "AcCrossServerServantRankListView";
		export const ALLIANCETASKBATCHSENDPOPUPVIEW:string = "AllianceTaskBatchSendPopupView";
		export const ALLIANCETASKBATCHRESULTPOPUPVIEW:string = "AllianceTaskBatchResultPopupView";
		/**绝地擂台来访消息 */
		export const ACBATTLEGROUNDVISITVIEW:string="AcBattileGroundVisitView";
		export const ACBATTLEGROUNDALLIINFOVIEW:string="AcBattleGroundAlliInfoView";
		export const ACBATTLEGROUNDSELECTVIEW:string="AcBattleGroundSelectView";
		export const ACBATTLEGROUNDAGREEPOPUPDIALOG:string="AcBattleGroundAgreePopupDialog";

		export const ACBATTLEGROUNDBUYPOPUPVIEW:string="AcBattleGroundBuyPopupView";
		export const ACBATTLEGROUNDAUTOFIGHTVIEW:string="AcBattleGroundAutoFightView";


		export const ACFANLIREVIEWSTORYVIEW:string="AcFanliReviewStoryView";
		export const ACFANLIREVIEWPOPUPVIEW:string="AcFanliReviewRewardPopupView";
		
		export const ACFANLIREVIEGUIDSTORY:string="AcFanliGuidStory";
		export const ACFANLIREVIEWRECALLVIEW:string="AcFanliRecallView";
		export const ACFANLIREVIEWMAINVIEW:string="AcFanliReviewMainView";
		export const ACMOONLIGHTREWARDPOPUPVIEW:string="AcMoonlightRewardPopupView";
		export const ACSEASIDEGAMEREWARDPOPUPVIEW:string="AcSeasideGameRewardPopupView";

		export const ACLANTERNREWARDPOPUPVIEW:string="AcLanternRewardPopupView";

		export const ACWIFESKININHERITSTORYVIEW:string="AcWifeSkinInheritStoryView";
		export const ACWIFESKININHERITREWARDPOPUPVIEW:string="AcWifeSkinInheritRewardPopupView";
		
		export const ACWIFESKININHERITGUIDSTORY:string="AcWifeSkinInheritGuidStory";
		export const ACWIFESKININHERITRECALLVIEW:string="AcWifeSkinInheritRecallView";
		export const ACWIFESKININHERITMAINVIEW:string="AcWifeSkinInheritMainView";

		export const ACXINGCUNTASKPOPUPVIEW:string="AcXingcunTaskPopupView";

		export const ACRANKSACKTRAITORPOPUPVIEW:string="AcRansackTraitorPopupView";
		export const ACRANKSACKTRAITOREXCHANGEPOPUPVIEW:string="AcRansackTraitorExchangePopupView";
		export const ACRANKSACKTRAITORGUIDSTORYVIEW:string="AcFanliGuidStoryView";
		export const ACRANKSACKTRAITORSTORYVIEW:string="AcRansackTraitorStoryView";
		
		export const ACRANSACKTRAITORGUIDSTORYVIEW:string="AcRansackTraitorGuidStoryView";
		export const ACRANSACKTRAITORSPPOPUPVIEW:string="AcRansackTraitorSPPopupView";
		export const ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW:string="AcRansackTraitorSPExchangePopupView";
		export const ACRANSACKTRAITORSPGUIDSTORYVIEW:string="AcRansackTraitorSPGuidStoryView";
		export const ACRANSACKTRAITORSPSTORYVIEW:string="AcRansackTraitorSPStoryView";

		export const ACSTARGAZERPOPUPVIEW:string="AcStargazerPopupView";
		export const ACSTARGAZEREXCHANGEPOPUPVIEW:string="AcStargazerExchangePopupView";
		export const ACSTARGAZERGUIDSTORYVIEW:string="AcStargazerGuidStoryView";
		export const ACSTARGAZERSTORYVIEW:string="AcStargazerStoryView";

		export const ACSTARGAZERSINGLEPOPUPVIEW:string="AcStargazerSinglePopupView";
		export const ACSTARGAZERSINGLEEXCHANGEPOPUPVIEW:string="AcStargazerSingleExchangePopupView";
		export const ACSTARGAZERSINGLEGUIDSTORYVIEW:string="AcStargazerSingleGuidStoryView";
		export const ACSTARGAZERSINGLESTORYVIEW:string="AcStargazerSingleStoryView";

		export const ACMONOPOLYTASKPOPUPVIEW:string="AcMonopolyTaskPopupView";
		export const ACMONOPOLYREWARDPOPUPVIEW:string="AcMonopolyRewardPopupView";
		export const ACMONOPOLYTASKANDREWARDVIEW:string="AcMonopolyTaskAndRewardView";
		
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

		export const  NEWQUESTIONNAIREPOPUPVIEW:string = "NewQuestionnairePopupView";

		/**新官上任阶段奖励预览*/
		export const LOGINWEEKBOXDETAILVIEW:string="LoginWeekBoxDetailView";


		/** 麦田飘香*/
		export const ACRYEHARVESTSKINPOPUPVIEW:string = "AcRyeHarvestSkinPopupView";
		export const ACRYEHARVESTCARDPOOLVIEW:string = "AcRyeHarvestCardPoolView";
		export const ACRYEHARVESTREWARDPOPUPVIEW:string = "AcRyeHarvestRewardPopupView";
		export const ACRYEHARVESTBIGBOXPOPUPVIEW:string = "AcRyeHarvestBigBoxPopupView";
		export const ACRYEHARVESTREWARDSHOWVIEW:string = "AcRyeHarvestRewardShowView";
		/** 麦田飘香--场景view */
		export const ACRYEHARVESTSCENEREWARDPOPUPVIEW:string = "AcRyeHarvestSceneRewardPopupView";
		/** 麦田飘香--活动奖励 */
		export const ACRYEHARVESTACTIVITYREWARDPOPUPVIEW:string = "AcRyeHarvestActivityRewardPopupView";


		/** 追缴敌寇*/
		export const ACCHASEBANDITREWARDPOPUPVIEW:string = "AcChaseBanditRewardPopupView";
		export const ACCHASEBANDITCHARGEPOPUPVIEW:string = "AcChaseBanditChargePopupView";

		//联姻到期返还道具弹窗
		export const ADULTMARRYENDFAILRETURNPOPUPVIEW:string = "AdultMarryEndFailReturnPopupView";

		//新科举全屏活动排行榜
		export const ACANSWERRANKPOPUPVIEW:string = "AcAnswerRankPopupView"
		//新科举全屏活动排行榜
		export const ACANSWERRANKREWARDPOPUPVIEW:string = "AcAnswerRankRewardPopupView"

		//狂欢之夜任务
		export const ACCARNIVALNIGHTTASKPOPUPVIEW:string="AcCarnivalNightTaskPopupView";
		//狂欢之夜任务tab3
		export const ACCARNIVALNIGHTTASKTAB3:string="AcCarnivalNightTaskPopupView|2";
		/**
		 * 定军中原弹窗类
		 */
		export const ACCONQUERMAINLANDPRANKVIEW:string = "AcConquerMainLandPRankView";
		export const ACCONQUERMAINLANDZRANKVIEW:string = "AcConquerMainLandZRankView";
		export const ACCONQUERMAINLANDCITYINFOVIEW:string = "AcConquerMainLandCityInfoView";
		export const ACCONQUERMAINLANDITEMUSEPOPUPVIEW:string = "AcConquerMainLandItemUsePopupView";
		export const ACCONQUERMAINLANDWARRESULTVIEW:string = "AcConquerManLandWarResultView";
		/**
		 * 五虎活动查看奖励
		 */
		export const ACFIVETIGERSREWARDINFOPOPUPVIEW:string = "AcFiveTigersRewardInfoPopupView"; 
		export const ACFIVETIGERSREPORTVIEW:string = "AcFiveTigersReportView"; 

		/**合成官品不足界面 */
		export const COMPOSENEEDLVUPVIEW:string="ComposeNeedLvupView";
		/**合成官品不足新配置界面 */
		export const COMPOSENEEDLVUPNEWVIEW:string="ComposeNeedLvupNewView";
		/**合成银两不足界面 */
		export const COMPOSENEEDGOLDPOPUPVIEW:string="ComposeNeedGoldPopupView";
		/**玩家升级政绩不足提示 */
		export const PLAYERUPLIMITPOPUPVIEW:string="PlayerUpLimitPopupView";

		export const SERVANTSKILLLEVELUPPOPUPVUEW:string="ServantSkillLevelupPopupView";
		export const SERVANTJIBANBUFFPOPUPVUEW:string="ServantJibanBuffPopView";
		export const SERVANTEQUIPLEVELUPOPVIEW:string="ServantEquipLevelUpPopView";
		
		/**擂台-结算 */
		export const ATKRACESETTLEPOPUPVIEW: string = "AtkraceSettlePopupView";
		
		/**大宴乡勇-每日充值 */
		export const ACJURAKUDAICHARGEVIEW : string = "AcJurakudaiChargeView";
		/**大宴乡勇-任务 */
		export const ACJURAKUDAITASKVIEW : string = "AcJurakudaiTaskView";
		/**大宴乡勇-门客详情 */
		export const ACJURAKUDAIDETAILINFOVIEW : string = "AcJurakudaiDetailInfoView";
		
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
		 *  宠幸得到孩子
		 */
		export const WIFEGETCHILDVIEW:string="WifeGetChildView";

		/**
		 *  宠幸红颜动画
		 */
		export const WIFELOVEANIVIEW:string="WifeLoveAniView";
		/**
		 *  场景宠幸红颜动画
		 */
		export const WIFEBATHSCENEVIEW:string="WifeBathSceneView";
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
		 *  结婚成功界面
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
		export const ACRESCUEREPORTVIEW:string="AcRescueReportView"
		
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

		/**
		 *  韩国条款界面
		 */
		export const KRAGREEMENTVIEW:string="KRAgreementView";
		

		/**
		 *  册封成功界面
		 */
		export const WIFESTATUSSHOWVIEW:string="WifestatusShowView";

		/**
		 * 七夕活动
		 */
		export const ACDOUBLESEVENTHAVGVIEW:string="AcDoubleSeventhAVGView";
		/**
		 * 剧情播放
		 */
		export const ACSPRINGOUTINGAVGVIEW:string="AcSpringOutingAVGView";
		export const ACWIFESKININHERITAVGVIEW:string="AcWifeSkininheritAVGView";
		export const ACSEASIDEGAMEAVGVIEW:string="AcSeasideGameAVGView";
		export const ACRECHARGEBOXSPAVGVIEW:string="AcRechargeBoxSPAVGView";
		export const ACBUILDINGWORSHIPAVGVIEW:string="AcBuildingWorshipAVGView";
		/**
		 * 剧情播放
		 */
		export const ACWIFEBATHINGAVGVIEW:string="AcWifeBathingAVGView";
		//双11红包
		export const ACSINGLEDAYENVELOPEVIEW:string="AcSingleDayEnvelopeView";
		export const ACSINGLEDAYROOKIEVIEW:string="AcSingleDayRookieView";
		/** 筑阁祭天，官报界面 */
		export const ACBUILDINGWORSHIPREPORTVIEW:string = "AcBuildingWorshipReportView";
		/** 前天，官报界面 */
		export const ACREDLOTUSWARRIORREPORTVIEW:string = "AcRedLotusWarriorReportView";
		/** 合成小人解锁新等级弹板 */
		export const COMPOSELVUPVIEW:string="ComposeLvupView";

	
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
		

		/**
		 * 关卡boss
		 */
		export const BOSSBATTLEVIEW:string="BossBattleView";

		/**
		 * 副本 战斗界面
		 */
		export const DAILYBOSSBATTLEVIEW:string="DailybossBattleView";

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
		 * 绝地擂台战斗
		 */
		export const ACBATTLEGROUNDFIGHTVIEW:string="AcBattleGroundFightView";
		/**
		 * 玩吧vip特权礼包
		 */
		export const WANBAVIPTEQUANVIEW:string="WanbaviptequanView";


	}

	/** 
	 * 合成版界面
	 */
    export namespace COMPOSE
    {
		/**  合成-征收-条目弹窗*/
		export const LEVYSCROLLITEMDETAILPOPUPVIEW:string = "LevyScrollItemDetailPopupView"; 
		/**  合成-征收-家丁纳贡弹窗*/
		export const LEVYSCROLLITEM1DETAILPOPUPVIEW:string = "LevyScrollItem1DetailPopupView"; 
		/** 合成-征收-选择门客弹窗*/
		export const LEVYSELECTSERVANTPOPUPVIEW:string = "LevySelectServantPopupView"; 
		/** 合成-征收-离线收益*/
		export const LEVYAUTORESPOPUPVIEW:string = "LevyAutoResPopupView"; 
		
		
    }
}