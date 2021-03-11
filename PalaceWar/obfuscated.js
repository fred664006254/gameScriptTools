
var fs = require('fs');
 
var arguments = process.argv.splice(2);
var filename = arguments[0];


/**
 * 规则
 */
var role = [
    [/BaseLoadDisplayObjectContiner/g],
    [/BaseDisplayObjectContainer/g],
    [/getCfgByActivityIdAndCode/g],
    [/getActivityVoByAidAndCode/g],
    [/FONTSIZE_ACTIVITY_COMMON/g],
    [/FONTSIZE_CONTENT_COMMON/g],
    [/FONTSIZE_CONTENT_SMALL/g],
    [/FONTSIZE_BUTTON_COMMON/g],
    [/FONTSIZE_TITLE_COMMON/g],
    [/FONTSIZE_TITLE_SMALL/g],
    [/COLOR_QUALITY_ORANGE/g],
    [/COLOR_QUALITY_PURPLE/g],
    [/COLOR_QUALITY_YELLOW/g],
    [/_bottomnodeContainer/g],
    [/addChildToContainer/g],
    [/COLOR_QUALITY_WHITE/g],
    [/LocalStorageManager/g],
    [/_selectedItemInfoVo/g],
    [/BaseLoadDragonBones/g],
    [/COLOR_QUALITY_GREEN/g],
    [/COLOR_QUALITY_BLUE/g],
    [/COLOR_WARN_YELLOW2/g],
    [/FONTSIZE_TITLE_BIG/g],
    [/COLOR_LIGHT_YELLOW/g],
    [/BaseViewController/g],
    [/COLOR_QUALITY_GRAY/g],
    [/COLOR_WARN_YELLOW/g],
    [/COLOR_WARN_GREEN2/g],
    [/COLOR_QUALITY_RED/g],
    [/setLayoutPosition/g],
    [/BaseDisplayObject/g],
    [/CircleProgressBar/g],
    [/LocalStorageConst/g],
    [/removeNetMessage/g],
    [/ComponentManager/g],
    [/formatRewardItem/g],
    [/ProgressBarConst/g],
    [/SocketStateConst/g],
    [/COLOR_WARN_GREEN/g],
    [/StatisticsHelper/g],
    [/DragonBonesUtil/g],
    [/COLOR_LIGHT_RED/g],
    [/ResourceManager/g],
    [/_scrollContiner/g],
    [/_inputTextField/g],
    [/LanguageManager/g],
    [/COLOR_WARN_RED2/g],
    [/SocketStateEnum/g],
    [/CustomMovieClip/g],
    [/DragProgressBar/g],
    [/_itemInfoVoList/g],
    [/PlatformManager/g],
    [/getResourceList/g],
    [/SceneController/g],
    [/COLOR_WARN_RED3/g],
    [/RewardItemConst/g],
    [/NetRequestConst/g],
    [/ScrollListItem/g],
    [/_countDownTime/g],
    [/_selectedIndex/g],
    [/BaseBitmapText/g],
    [/LoginResLoader/g],
    [/_countDownText/g],
    [/BaseLoadBitmap/g],
    [/BaseController/g],
    [/COLOR_WARN_RED/g],
    [/ViewController/g],
    [/TextFieldConst/g],
    [/getMessageName/g],
    [/CollectEffect/g],
    [/BaseTextField/g],
    [/MessageHelper/g],
    [/getScrollList/g],
    [/WxGameInclude/g],
    [/_adultInfoVo/g],
    [/_progressBar/g],
    [/LoginLoading/g],
    [/MainUINewTop/g],
    [/_collectFlag/g],
    [/NetPushConst/g],
    [/TimerManager/g],
    [/LoginManager/g],
    [/SoundEffects/g],
    [/ResourceUtil/g],
    [/LayerManager/g],
    [/MessageConst/g],
    [/ClientSocket/g],
    [/ParticleUtil/g],
    [/SoundManager/g],
    [/getTextField/g],
    [/_droWifeIcon/g],
    [/ButtonConst/g],
    [/addTouchTap/g],
    [/COLOR_BLACK/g],
    [/TabBarGroup/g],
    [/COLOR_WHITE/g],
    [/COLOR_BROWN/g],
    [/ProgressBar/g],
    [/TouchHelper/g],
    [/_scrollView/g],
    [/DisplayUtil/g],
    [/_wifeInfoVo/g],
    [/LayoutConst/g],
    [/_collectBtn/g],
    [/TickManager/g],
    [/switchVoApi/g],
    [/_scrollList/g],
    [/refreshData/g],
    [/getTitleStr/g],
    [/PlatformCfg/g],
    [/CommonUtil/g],
    [/_curConfig/g],
    [/StringUtil/g],
    [/_callbackF/g],
    [/BaseButton/g],
    [/NetManager/g],
    [/_servantId/g],
    [/GameConfig/g],
    [/DeviceUtil/g],
    [/SceneConst/g],
    [/RSDKHelper/g],
    [/formatData/g],
    [/SoundConst/g],
    [/serverTime/g],
    [/NetLoading/g],
    [/BaseBitmap/g],
    [/__extends/g],
    [/BaseVoApi/g],
    [/BaseSound/g],
    [/getButton/g],
    [/RewardFly/g],
    [/BaseShape/g],
    [/VideoUtil/g],
    [/MainUITop/g],
    [/_itemData/g],
    [/_downHero/g],
    [/BaseScene/g],
    [/ViewConst/g],
    [/BaseClass/g],
    [/ItemEnums/g],
    [/openView/g],
    [/_nameTxt/g],
    [/initView/g],
    [/DateUtil/g],
    [/getlocal/g],
    [/LampRoll/g],
    [/BaseView/g],
    [/MathUtil/g],
    [/CheckBox/g],
    [/GameData/g],
    [/LoopLamp/g],
    [/PowerFly/g],
    [/SoundBg/g],
    [/_curIdx/g],
    [/_uiData/g],
    [/_goBtn3/g],
    [/LogUtil/g],
    [/ResBar/g],
    [/BaseVo/g],
    [/TabBar/g],
    [/Base64/g],
    [/_numTF/g],
    [/MainUI/g],
    [/_myBg/g],
    [/SkinScrollItem/g],
    [/SkinRankScrollItem/g],
    [/WelfareViewRebateScrollItem/g],
    [/WelfareViewSignScrollItem/g],
    [/WelfareViewGoldblessScrollItem/g],
    [/FriendScrollItem/g],
    [/ConquestRankScrollItem/g],
    [/StrengthenScrollItem/g],
    [/AchievementDetailScrollItem/g],
    [/AchievementScrollItem/g],
    [/WifestatusPopupScrollItem/g],
    [/WifeTalentPlusPopupScrollItem/g],
    [/WifeAllTalentScrollItem/g],
    [/WifeTalentBuffScrollItem/g],
    [/WifestatusScrollItem/g],
    [/AllianceWarLogScrollItem/g],
    [/AllianceWarSelectServantScrollItem/g],
    [/AllianceWarSelectPlanScrollItem/g],
    [/AllianceWarJoinBattleInfoScrollItem/g],
    [/AllianceWarRankScrollItem/g],
    [/PriChatScrollItem/g],
    [/ChatScrollItem/g],
    [/ChatblockScrollItem/g],
    [/BetheKingRewardScrollItem/g],
    [/BetheKingTaskScrollItem/g],
    [/BetheKingVoteScrollItem/g],
    [/BetheKingExScrollItem/g],
    [/BetheKingRankScrollItem/g],
    [/AcMergeActiveShopScrollItem/g],
    [/AcMergeActiveTaskScrollItem/g],
    [/AcMergeActiveRechargeScrollItem/g],
    [/AcSingleDayBuild1ViewTab2ScrollItem/g],
    [/AcSingleDayBuild1ViewTab4ScrollItem/g],
    [/AcSingleDayBuild1ViewTab3ScrollItem/g],
    [/AcSingleDaySkinScrollItem/g],
    [/AcMonopolyTaskScrollItem/g],
    [/AcMonopolyTurnRewardScrollItem/g],
    [/AcCrossServantPowerScrollItem/g],
    [/AcCrossServantPowerRankScrollItem/g],
    [/AcCrossServantPowerTaskScrollItem/g],
    [/AcWipeBossKillInfoScrollItem/g],
    [/AcWipeBossShopTab2ScrollItem/g],
    [/AcWipeBossSelectScrollItem/g],
    [/AcWipeBossAllianceInfoScrollItem/g],
    [/AcWipeBossShopTab1ScrollItem/g],
    [/AcSeasideGameTaskScrollItem/g],
    [/AcRescueBuyItemCangkuScrollItem/g],
    [/AcRescueBuyItemScrollItem/g],
    [/AcRescueExScrollItem/g],
    [/AcLanternTaskScrollItem/g],
    [/AcLimitedRewardScrollItem/g],
    [/AcLimitedRewardDetailScrollItem/g],
    [/AcTotalDayRechargeScrollItem/g],
    [/AcTotalRechargeScrollItem/g],
    [/AcRechargeRebateScrollItem/g],
    [/AcDailyChargeScrollItem/g],
    [/AcOneYearoackSkinScrollItem/g],
    [/AcRansackTraitorScrollItem/g],
    [/AcRansackTraitorBookScrollItem/g],
    [/AcChristmasTaskScrollItem/g],
    [/AcChristmasResultScrollItem/g],
    [/AcThrowArrowLogScrollItem/g],
    [/AcThrowArrowAchievementScrollItem/g],
    [/AcThrowArrowRechargeScrollItem/g],
    [/AcThrowArrowRewardScrollItem/g],
    [/NewYear2ScrollItem/g],
    [/NewYear1ScrollItem/g],
    [/AcCrossServerWipeBossAllianceInfoScrollItem/g],
    [/AcCrossServerWipeBossShopTab2ScrollItem/g],
    [/AcCrossServerWipeBossKillInfoScrollItem/g],
    [/AcCrossServerWipeBossSelectScrollItem/g],
    [/AcCrossServerWipeBossShopTab1ScrollItem/g],
    [/AcArcadeGameLogsScrollItem/g],
    [/AcArcadeGameRewardScrollItem/g],
    [/AcDoubleSeventhAwardScrollItem/g],
    [/AcDragonBoatDayTab2ScrollItem/g],
    [/AcDragonBoatDayTab4ScrollItem/g],
    [/AcDragonBoatDayTab3ScrollItem/g],
    [/AcFourPeopleScrollItem/g],
    [/AcDiscountViewScrollItem/g],
    [/AcRechargeBoxSPPopupScrollItem/g],
    [/AcRechargeBoxSPRewardScrollItem/g],
    [/AcXingcunTaskScrollItem/g],
    [/AcTigertrappassListScrollItem/g],
    [/AcRansackTraitorSPBookScrollItem/g],
    [/AcRansackTraitorSPScrollItem/g],
    [/AcMoonNightTaskScrollItem/g],
    [/AcJadeViewTaskScrollItem/g],
    [/AcJadeRankListScrollItem/g],
    [/AcJadeViewTotalScrollItem/g],
    [/AcJadeViewRankScrollItem/g],
    [/AcSpringOutingTaskScrollItem/g],
    [/AcMoonlightTaskScrollItem/g],
    [/AcRankListScrollItem/g],
    [/AcRankActiveScrollItem/g],
    [/RankActiveScrollItem/g],
    [/AcHuLaoListScrollItem/g],
    [/AcHuLaoGiftListScrollItem/g],
    [/AcRyeHarvestActivityRewardTaskScrollItem/g],
    [/AcRyeHarvestActivityRewardShopScrollItem/g],
    [/AcRyeHarvestActivityRewardChargeScrollItem/g],
    [/AcArrowRankListScrollItem/g],
    [/AcCarnivalChargeScrollItem/g],
    [/AcCarnivalCostScrollItem/g],
    [/AcBattleRankScrollItem/g],
    [/AcBattleGroundDetailsAlliScrollItem/g],
    [/AcBattleTimerScrollItem/g],
    [/AcBattleRank2ScrollItem/g],
    [/AcBattleRewardScrollItem/g],
    [/AcBattleGroundDetailsTimeScrollItem/g],
    [/AcBuildingWorshipTaskScrollItem/g],
    [/AcVipShopViewScrollItem/g],
    [/AcExamAnswerScrollItem/g],
    [/Celebration1ScrollItem/g],
    [/Celebration3ScrollItem/g],
    [/Celebration4ScrollItem/g],
    [/Celebration2ScrollItem/g],
    [/AcPunishExScrollItem/g],
    [/AcPunishRankAllianceRewardScrollItem/g],
    [/AcPunishRankScrollItem/g],
    [/AcPunishBuyItemScrollItem/g],
    [/AcPunishRankRewardScrollItem/g],
    [/AcReignTitleChangeScrollItem/g],
    [/AcReignTitleTaskScrollItem/g],
    [/AcFlipCardTaskScrollItem/g],
    [/AcDailyActivityScrollItem/g],
    [/AcCrossServerWifeBattleStudyScrollItem/g],
    [/AcCrossServerWifeAllTalentScrollItem/g],
    [/AcDailyGiftScrollItem/g],
    [/AcMidAutumnTaskScrollItem/g],
    [/AcMidAutumnRechargeScrollItem/g],
    [/AcAllianceRechargeRankScrollItem/g],
    [/AcAllianceRechargeScrollItem/g],
    [/AcMayDay2ScrollItem/g],
    [/AcMayDayRankScrollItem/g],
    [/AcMayDayRankRewardScrollItem/g],
    [/AcMayDay3ScrollItem/g],
    [/AcStargazerScrollItem/g],
    [/AcStargazerBookScrollItem/g],
    [/MailScrollItem/g],
    [/MailRewardScrollItem/g],
    [/RankScrollItem/g],
    [/RankCrossScrollItem/g],
    [/AllianceTaskBuffScrollItem/g],
    [/AllianceTaskRewardScrollItem/g],
    [/AllianceTaskRankScrollItem/g],
    [/AllianceTaskScrollItem/g],
    [/AllianceTaskDetailScrollItem/g],
    [/Shop3ScrollItem/g],
    [/ShopScrollItem/g],
    [/AllianceTurnScrollItem/g],
    [/AllianceRankScrollItem/g],
    [/AllianceBossScrollItem/g],
    [/AllianceBossRankScrollItem/g],
    [/AllianceBossSelectScrollItem/g],
    [/AllianceBuildScrollItem/g],
    [/AllianceMemberScrollItem/g],
    [/AllianceExScrollItem/g],
    [/AllianceApplyScrollItem/g],
    [/WifebattleStudyScrollItem/g],
    [/BookroomServantScrollItem/g],
    [/LimitedGiftScrollItem/g],
    [/BossSelectedScrollItem/g],
    [/BossRecSelectedScrollItem/g],
    [/InviteViewTab1ScrollItem/g],
    [/InviteViewTab4ScrollItem/g],
    [/InviteViewTab3ScrollItem/g],
    [/InviteViewTab2ScrollItem/g],
    [/AnnouncementScrollItem/g],
    [/WifeSkillScrollItem/g],
    [/WifeskinScrollItem/g],
    [/WifeGiveScrollItem/g],
    [/ItemScrollItem/g],
    [/TitleScrollItem/g],
    [/VipBtnScrollItem/g],
    [/ServantInfoFourItemScrollItem/g],
    [/ServantSkinBookScrollItem/g],
    [/ServantInfoItemsScrollItem/g],
    [/ServantSelectedScrollItem/g],
    [/ServantInfoWifeItemScrollItem/g],
    [/ServantScrollItem/g],
    [/ServantSkinAmuletScrollItem/g],
    [/ServantSkinauraScrollItem/g],
    [/ServantSkinScrollItem/g],
    [/ServantInfoAmuletScrollItem/g],
    [/DailyTaskScrollItem/g],
    [/StudyatkBookScrollItem/g],
    [/ServerListMyScrollItem/g],
    [/ServerListServerScrollItem/g],
    [/ServerListTabScrollItem/g],
    [/EmperorWarBmceScrollItem/g],
    [/AdultPlayerInfoScrollItem/g],
    [/Adult2ScrollItem/g],
    [/AdultScrollItem/g],
    [/AdultMarryRequestScrollItem/g],
    [/AdultMarryScrollItem/g],
    [/AdultReceiveScrollItem/g],
    [/AdultYinYuanRecordScrollItem/g],
    [/AdultChooseChildScrollItem/g],
    [/PlayerReturnViewTab3ScrollItem/g],
    [/PlayerReturnViewTab2ScrollItem/g],
    [/PlayerReturnViewTab1ScrollItem/g],
    [/ChildScrollItem/g],
];
// 随机时要用到的字符
var allChar = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
// 随机库
var toNames = [];
for (var i = 0; i < allChar.length*allChar.length; i++) {
    var tmp = (Math.floor(i/allChar.length) + 1) % allChar.length;
    toNames.push((tmp === 0? "" : allChar[tmp-1]) +allChar[i%allChar.length])
}
// console.log(toNames);
for (var i = 0; i < toNames.length; i++) {
    var rndIndex = Math.floor(Math.random() * toNames.length);
    var tmpChangeVar = toNames[rndIndex];
    toNames[rndIndex] = toNames[i];
    toNames[i] = tmpChangeVar;
}

for (var i = 0; i < role.length; i++) {
    role[i].push("_C" + toNames[i]);
}
// console.log(role);
var Main = {
    main:function() {
        var fileStr = fs.readFileSync(filename, "utf-8");
        // console.log(fileStr);
        for (var i = 0; i < role.length; i++) {
            if (typeof(role[i][1]) === "string") {
                fileStr = fileStr.replace(role[i][0], role[i][1]);
            }
        }
        fs.writeFileSync(filename, fileStr);
    }
}
Main.main();