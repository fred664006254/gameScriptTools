/**
 * Api管理类，统一通过这里调取Api,每次新增Api时，需要在init方法中new
 * author dmj
 * date 2017/9/16
 * @class PlayerVoApi
 */
class Api 
{
	// 用户信息api
	public static playerVoApi:PlayerVoApi;
	// 道具信息api
	public static itemVoApi:ItemVoApi;
	// 门客系统api
	public static servantVoApi:ServantVoApi;
	// 红颜系统api
	public static wifeVoApi:WifeVoApi;
	// 红颜对战系统api
	public static wifebattleVoApi:WifebattleVoApi;
	// 子嗣系统api
	public static childVoApi:ChildVoApi;
	// 媒婆系统api
	public static adultVoApi:AdultVoApi;
	// 牢房系统api
	public static prisonVoApi:PrisonVoApi;
	/**
	 * 经营，政务
	 */
	public static manageVoApi:ManageVoApi;
	// 关卡系统
	public static challengeVoApi:ChallengeVoApi;
	/**
	 * 新手引导
	 */
	public static rookieVoApi:RookieVoApi;
	/**
	 * 寻访
	 */
	public static searchVoApi:SearchVoApi;
	/*主线任务*/
	public static mainTaskVoApi:MainTaskVoApi;

	/*聊天*/
	public static chatVoApi:ChatVoApi;

	/**
	 * 排行榜
	 */
	public static rankVoApi:RankVoApi;

	/**
	 * 其他杂项
	 */
	public static otherInfoVoApi:OtherInfoVoApi;
	/**商品 */
	public static shopVoApi:ShopVoApi;

	/**
	 * 跑马灯
	 */
	public static lampVoApi:LampVoApi;

	/**
	 * 功能开关
	 */
	public static switchVoApi:SwitchVoApi;

	/**
	 * 每日任务
	 */
	public static dailytaskVoApi:DailytaskVoApi;

	/**
	 * 邮件
	 */
	public static mailVoApi:MailVoApi;
	/**
	 * 充值
	 */
	public static rechargeVoApi:RechargeVoApi;

	/**
	 * vip
	 */
	public static vipVoApi:VipVoApi;

	/**
	 * 皇宫
	 */
	public static palaceVoApi:PalaceVoApi;


	/**
	 * 宴会
	 */
	public static dinnerVoApi:DinnerVoApi;

	/**
	 * 成就
	 */
	public static achievementVoApi:AchievementVoApi;

	/**
	 * 签到
	 */
	public static arrivalVoApi:ArrivalVoApi;

	/**
	 * 活动Api
	 */
	public static acVoApi:AcVoApi;
	
	/**
	 * 衙门Api
	 */
	public static atkraceVoApi:AtkraceVoApi;
	
	/**
	 * 跨服衙门Api
	 */
	public static atkracecrossVoApi:AtkracecrossVoApi;

	/**
	 * 活动通用排名api
	 * 接口：["activity.getrankactive"] = "获取冲榜活动排行榜",
	 */
	public static acRankVoApi:AcRankVoApi;

	/**
	 * 
	 */
	public static gameinfoVoApi:GameinfoVoApi;

	public static bookroomVoApi:BookroomVoApi;

	public static studyatkVoApi:StudyatkVoApi;

	/**
	 * 帮会Api
	 */
	public static allianceVoApi:AllianceVoApi;

	/**
	 * 
	 */
	public static dailybossVoApi:DailybossVoApi;

	/**
	 * 征伐Api
	 */
	public static conquestVoApi:ConquestVoApi;

	public static tradeVoApi:TradeVoApi;

	public static wifeSkinVoApi:WifeskinVoApi;
	/**
	 * 邀请有礼api
	 */
	public static inviteVoApi:InviteVoApi;

	/**
	 * 称帝api
	 */
	public static prestigeVoApi:PrestigeVoApi;
	/**
	 * 跨服亲密api
	 */
	public static crossImacyVoApi:CrossImacyVoApi;
	

	public static practiceVoApi:PracticeVoApi;

	/**
	 * 册封api
	 */
	public static wifestatusVoApi:WifestatusVoApi

	/**
	 * 8王夺帝
	 */
	public static emperorwarVoApi:EmperorwarVoApi;

	/**
	 * 公共分享wx  强制弹出分享界面
	 */
	public static shareVoApi: ShareVoApi;

	public static allianceTaskVoApi:AllianceTaskVoApi;
	/**
	 * 限时礼包
	 */
	public static limitedGiftVoApi: LimitedGiftVoApi;

	/**
	 * 内阁/议事院
	 */
	public static councilVoApi:CouncilVoApi;
	// 红颜系统我要变强
	public static strengthenVoApi:StrengthenVoApi;

 
	public static crossPowerVoApi:CrossPowerVoApi;

	public static mergeServerVoApi:MergeServerVoApi;
	public static friendVoApi:FriendVoApi;
	
	public static amuletVoApi:AmuletVoApi;

	//帮会战
	public static allianceWarVoApi:AllianceWarVoApi;

	/**
	 * 围剿鳌拜
	 */
	public static wipeBossVoApi:WipeBossVoApi;
	public static crossServerWipeBossVoApi:CrossServerWipeBossVoApi;
	public static skinVoApi:SkinVoApi;
	/** 实名认证api */
	public static realnameVoApi:RealnameVoApi;

	/**
	 * 回归活动
	 */
	public static playerReturnVoApi:PlayerReturnVoApi;
	/** 
	 *合成版征收
	*/
	public static levyVoApi:LevyVoApi;

	public static composemapVoApi:ComposemapVoApi;


	public constructor() 
	{
	}

	public static init():void
	{
		Api.playerVoApi = new PlayerVoApi();
		Api.itemVoApi = new ItemVoApi();
		Api.servantVoApi = new ServantVoApi();
		Api.wifeVoApi = new WifeVoApi();
		Api.wifebattleVoApi = new WifebattleVoApi();
		Api.childVoApi = new ChildVoApi();
		Api.adultVoApi = new AdultVoApi();
		Api.manageVoApi = new ManageVoApi();
		Api.challengeVoApi = new ChallengeVoApi();
		Api.rookieVoApi = new RookieVoApi();
		Api.searchVoApi=new SearchVoApi();
		Api.mainTaskVoApi = new MainTaskVoApi();
		Api.chatVoApi = new ChatVoApi();
		Api.rankVoApi = new RankVoApi();
		Api.otherInfoVoApi = new OtherInfoVoApi();
		Api.shopVoApi = new ShopVoApi();
		Api.lampVoApi = new LampVoApi();
		Api.switchVoApi = new SwitchVoApi();
		Api.dailytaskVoApi = new DailytaskVoApi();
		Api.mailVoApi = new MailVoApi();
		Api.rechargeVoApi = new RechargeVoApi();
		Api.vipVoApi = new VipVoApi();
		Api.palaceVoApi = new PalaceVoApi();
		Api.dinnerVoApi = new DinnerVoApi();
		Api.achievementVoApi = new AchievementVoApi();
		Api.arrivalVoApi = new ArrivalVoApi();
		Api.acVoApi = new AcVoApi();
		Api.acRankVoApi = new AcRankVoApi();
		Api.gameinfoVoApi = new GameinfoVoApi();
		Api.prisonVoApi = new PrisonVoApi();
		Api.atkraceVoApi = new AtkraceVoApi();
		Api.atkracecrossVoApi = new AtkracecrossVoApi();
		Api.bookroomVoApi = new BookroomVoApi();
		Api.studyatkVoApi = new StudyatkVoApi();
		Api.allianceVoApi = new AllianceVoApi();
		Api.dailybossVoApi=new DailybossVoApi();
		Api.conquestVoApi = new ConquestVoApi();
		Api.tradeVoApi = new TradeVoApi();
		Api.wifeSkinVoApi = new WifeskinVoApi();
		Api.inviteVoApi = new InviteVoApi();
		Api.prestigeVoApi = new PrestigeVoApi();
		Api.practiceVoApi = new PracticeVoApi();
		Api.wifestatusVoApi = new WifestatusVoApi();
		Api.crossImacyVoApi = new CrossImacyVoApi();
		Api.emperorwarVoApi = new EmperorwarVoApi();
		Api.shareVoApi = new ShareVoApi();
		Api.councilVoApi = new CouncilVoApi();
		Api.limitedGiftVoApi = new LimitedGiftVoApi();
		Api.strengthenVoApi = new StrengthenVoApi();
		Api.crossPowerVoApi = new CrossPowerVoApi();
		Api.mergeServerVoApi = new MergeServerVoApi();
		Api.friendVoApi = new FriendVoApi();
		Api.allianceTaskVoApi = new AllianceTaskVoApi();
		Api.amuletVoApi = new AmuletVoApi();
		Api.allianceWarVoApi = new AllianceWarVoApi();
		Api.wipeBossVoApi = new WipeBossVoApi();
		Api.crossServerWipeBossVoApi = new CrossServerWipeBossVoApi();
		Api.skinVoApi = new SkinVoApi();
		Api.realnameVoApi = new RealnameVoApi();
		Api.playerReturnVoApi = new PlayerReturnVoApi();
		Api.composemapVoApi = new ComposemapVoApi();
		Api.levyVoApi = new LevyVoApi();
	}

	public static formatData(rData:any,cmd:string):void
	{
		// if(rData)
		// {
		// 	for(let model in rData)
		// 	{
		// 		if(model=="userinfo")
		// 		{
		// 			// 用户数据
		// 			Api.playerVoApi.formatData(rData.userinfo);
		// 		}
		// 		else
		// 		{
		// 			if(Api[model]&&Api[model].formatData)
		// 			{
		// 			}
		// 		}
		// 	}
		// }
		let notDispatcher:any={};;
		if(rData.userinfo)
		{
			// 用户数据
			Api.playerVoApi.formatData(rData.userinfo);
		}
		if(rData.item)
		{
			// 道具信息
			Api.itemVoApi.formatData(rData.item);
		}
		if(rData.servant)
		{
			// 门客系统
			Api.servantVoApi.formatData(rData.servant);
		}
		if(rData.wife)
		{
			// 红颜系统
			Api.wifeVoApi.formatData(rData.wife);
		}
		if(rData.wifebattle)
		{
			// 红颜对战系统
			Api.wifebattleVoApi.formatData(rData.wifebattle);
		}
		if(rData.child)
		{
			// 子嗣系统
			Api.childVoApi.formatData(rData.child);
		}
		if(rData.adult)
		{
			// 媒婆系统
			Api.adultVoApi.formatData(rData.adult);
		}
		if(rData.sadun){
			Api.adultVoApi.init_sadun_data(rData);
		}
		
		if(rData.prison)
		{	
			
			 // 牢房系统
			Api.prisonVoApi.formatData(rData.prison);
		}
		if(rData.autoRes)
		{
			Api.manageVoApi.formatAutoRes(rData.autoRes);
		}
		if(rData.manage)
		{
			Api.manageVoApi.formatData(rData.manage);
		}
		if(rData.challenge)
		{
			// 关卡系统
			Api.challengeVoApi.formatData(rData.challenge);
		}
		if(rData.search)
		{
			Api.searchVoApi.formatData(rData.search);
		}
		if(rData.maintask)
		{
			Api.mainTaskVoApi.formatData(rData.maintask);
		}
		if(rData.minfo || rData.apnum)
		{
			Api.rankVoApi.formatData(rData);
		}
		if(rData.otherinfo)
		{
			Api.otherInfoVoApi.formatData(rData.otherinfo);
		}
		if(rData.shop)
		{
			Api.shopVoApi.formatData(rData);
		}
		if(rData.switch)
		{
			Api.switchVoApi.formatData(rData.switch);
		}
		if(rData.dailytask)
		{
			Api.dailytaskVoApi.formatData(rData.dailytask);
		}
		if(rData.mymail)
		{
			Api.mailVoApi.formatData(rData.mymail);
		}
		if(rData.palace)
		{
			Api.palaceVoApi.formatData(rData);
		}
		if(rData.dinner)
		{
			Api.dinnerVoApi.formatData(rData.dinner);
		}
		if(rData.maildetail)
		{
			Api.mailVoApi.formatDetailData(rData.maildetail);
		}
		if(rData.achievement)
		{
			Api.achievementVoApi.formatData(rData.achievement);
		}
		if(rData.arrival)
		{
			Api.arrivalVoApi.formatData(rData.arrival);
		}
		if(rData.activity)
		{
			notDispatcher.activity=Api.acVoApi.formatData(rData.activity,cmd==NetRequestConst.REQUEST_USER_LOGIIN);
		}
		if(rData.acrank)
		{
			Api.acRankVoApi.formatData(rData.acrank);
		}
		if(rData.lamp)
		{
			Api.lampVoApi.formatData(rData.lamp);
		}

		if(rData.activecfg)
		{
			Config.AcCfg.formatAllCfg(rData.activecfg);
		}
		if(rData.gameinfo)
		{
			Api.gameinfoVoApi.formatData(rData.gameinfo);
		}
		if(rData.atkrace)
		{
			Api.atkraceVoApi.formatData(rData.atkrace);
		}
		if(rData.atkracecross)
		{
			Api.atkracecrossVoApi.formatData(rData.atkracecross);
		}
		if(rData.bookroom)
		{
			Api.bookroomVoApi.formatData(rData.bookroom);
		}

		if(rData.studyatk)
		{
			Api.studyatkVoApi.formatData(rData);
		}
		
		if(rData.dailyBossCfg)
		{
			Config.DailybossCfg.formatDataByServer(rData.dailyBossCfg);
		}

		if(rData.dailyboss)
		{
			Api.dailybossVoApi.formatData(rData.dailyboss);
		}
		if(rData.alliance)
		{
			Api.allianceVoApi.formatData(rData.alliance);
		}
		if(rData.myalliance)
		{
			Api.allianceVoApi.formatData2(rData.myalliance);
		}
		if(rData.alliancemember)
		{
			Api.allianceVoApi.formatData3(rData.alliancemember);
		}
		if(rData.conquest)
		{
			Api.conquestVoApi.formatData(rData.conquest);
		}
		if(rData.trade)
		{
			Api.tradeVoApi.formatData(rData.trade);
		}
		if(rData.rechargeCfg)
		{
			Config.RechargeCfg.formatData(rData.rechargeCfg);
		}
		if(rData.wifeskin)
		{
			Api.wifeSkinVoApi.formatData(rData.wifeskin);
		}
		if(rData.invite) 
		{
			Api.inviteVoApi.formatData(rData.invite);
		}
		if(rData.prestige) 
		{
			Api.prestigeVoApi.formatData(rData.prestige);
		}
		if(rData.chatblock) 
		{
			Api.chatVoApi.formatData2(rData.chatblock);
		}
		if(rData.sharetext){
			LanguageManager.setShareText(typeof(rData.sharetext) === "string"? JSON.parse(rData.sharetext) : rData.sharetext);
		}

		if(rData.practice)
		{
			Api.practiceVoApi.formatData(rData.practice);
		}
		if(rData.pnum)
		{
			Api.practiceVoApi.showPracticeGet(rData.pnum);
		}
		if(rData.wifestatus){
			Api.wifestatusVoApi.formatData(rData.wifestatus);
		}
		if(rData.emperorwar)
		{
			Api.emperorwarVoApi.formatData(rData.emperorwar);
		}

		if(rData.alliancetask)
		{
			Api.allianceTaskVoApi.formatData(rData.alliancetask);
		}
		//好友
		if(rData.friend){
			Api.friendVoApi.formatData(rData.friend);
		}
		if(rData.eventlist){
			Api.councilVoApi.formatEventData(rData.eventlist);
		}
		if(rData.council){
			Api.councilVoApi.formatData(rData.council);
		}

		if(rData.amulet){
			Api.amuletVoApi.formatData(rData.amulet);
		}
		if(rData.mergezidcfg){
			Api.mergeServerVoApi.formatData(rData.mergezidcfg);
		}
		if(rData.alliancewar){
			Api.allianceWarVoApi.initAllianceWarData(rData.alliancewar);
		}
		if(rData.myalliancewar){
			Api.allianceWarVoApi.initMyAllianceWarData(rData.myalliancewar);
		}
		if(rData.composemap)
		{
			Api.composemapVoApi.formatData(rData.composemap);
		}

		if(rData.sinfo && rData.winfo)
		{
			Api.skinVoApi.formatData(rData);
		}
		if(rData.reback)
		{
			Api.playerReturnVoApi.formatData(rData.reback);
			if(rData.rebackrewards){
				Api.playerReturnVoApi.setRebackRewards(rData.rebackrewards);
			}
		}
		if(rData.levy)
		{
			Api.levyVoApi.formatData(rData.levy);	
		}
		//刷新征收红点状态
		if(rData.servant || cmd == "levy.selectsid" || rData.unlockPersonLv){
			Api.levyVoApi.updateLevyRedState();
		}

		if(cmd == NetPushConst.PUSH_PAY)
		{
			if(rData&&rData.payment&&rData.payment.itemId)
			{
				if(PlatformManager.checkIsWxmgSp())
				{
					RSDKHelper.analyticsWXPay(rData.payment.itemId);
				}
			}
		}
		for(let model in rData)
		{
			if(notDispatcher[model]!=null&&notDispatcher[model]==false)
			{

			}
			else
			{
				if(model=="activecfg")
				{
					App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE,MessageConst.MESSAGE_MODEL_ACTIVITY);
					App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,MessageConst.MESSAGE_MODEL_ACTIVITY);
				}
				//(model=="userinfo" || model=="activity" || model=="achievement" || model=="dailytask" || model=="prison"  || model=="challenge"  || model=="rewards"  || model=="battleReport")
				else if( cmd=="challenge.attack"  && (model=="userinfo" || model=="challenge"  || model=="rewards"  || model=="battleReport"))
				{

				}
				else if(cmd==NetRequestConst.REQUEST_ATKRACE_REVENGE
					||cmd==NetRequestConst.REQUEST_ATKRACE_CHALLENGE
					||cmd==NetRequestConst.REQUEST_ATKRACE_KILL
					||cmd==NetRequestConst.REQUEST_ATKRACE_CHOOSE
					||cmd==NetRequestConst.REQUEST_ATKRACE_FIGHT){

				} else {
					App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE,model);
					App.MessageHelper.dispatchNetMessage(model,model);
				}
			}
		}
	}

	public static dispose():void
	{
		for(let key in Api)
		{
			if(Api[key]&&(Api[key] instanceof BaseVoApi))
			{
				Api[key].dispose();
			}
		}
	}

	public static formatChatData(rData:any):void
	{
		Api.chatVoApi.formatData(rData);
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHAT_COME);
	}
}