class SwitchVoApi extends BaseVoApi
{
	private switchVo:SwitchVo;
	public constructor()
	{
		super();
	}

	/**
	 * 检测功能开关
	 * @param functionName 
	 */
	private checkSwitchByName(functionName:string):boolean
	{
		return Boolean(this.switchVo&&this.switchVo.switchList[functionName]);
	}

	/**
	 * 检测是否打开了媒婆功能
	 */
	public checkAudlt():boolean
	{
		return this.checkSwitchByName("funAdult");
	}

	/**
	 * 检测是否打开了惩戒女囚
	 */
	public checkPunishAllianceRank():boolean
	{
		return this.checkSwitchByName("closePunish");
	}

	/**
	 * 惩戒女囚的元宝购买次数随VIP等级增多的开关
	 */
	public checkPunishVip():boolean
	{
		return this.checkSwitchByName("openPunishVip");
	}

	/**
	 * 检测是否关闭了宠幸拖衣服
	 */
	public checkWifeAni():boolean
	{
		return this.checkSwitchByName("closeWifeAni");
	}

	/**
	 * 检测是否关闭被和谐文字
	 */
	public checkCloseText():boolean
	{
		return this.checkSwitchByName("closeText");
	}

	/**
	 * 检测是否关闭被和谐文字2 。
	 * 为true 开启和谐版2 开关 
	 * 为false 。为关闭 和谐版2 开关
	 */
	public checkCloseText2():boolean
	{
		return this.checkSwitchByName("closeText2");
	}
	/**
	 * 检测是否挂机收取资源
	 */
	public checkAutoResManage():boolean
	{
		return this.checkSwitchByName("funAutoResManage");
	}
 
	/**
	 * 检测 是否开启审核 true:开启审核、屏蔽排行榜  false:打开排行榜关闭审核
	 */
	public checkOpenShenhe():boolean
	{
		return this.checkSwitchByName("openShenhe");
	}
 
	/**
	 * 检测是否挂机收取资源
	 */
	public checkTWShenhe():boolean
	{
		return this.checkSwitchByName("twShenhe");
	}

	public checkOpenTalkDialog():boolean
	{
		return this.checkSwitchByName("openTalkDialog");
	}


	/**
	 * 关卡跳过开关
	 */
	public checkJumpBattle():boolean
	{
		return this.checkSwitchByName("openJumpBattle");
	}

	/**
	 * 一键扫荡关卡
	 */
	public checkAutoMopup():boolean
	{
		return this.checkSwitchByName("openAutoMopup");
	}

	/**
	 * 疯狂游乐场 检测VIP 根据渠道做限制
	 */
	public checkVip1Privilege():boolean
	{
		// return this.checkSwitchByName("openVip1Privilege");
		// 这个开关不用了，以后永远开
		return true;
	}

	/**
	 * 首冲后礼包开关
	 */
	public checkOpenNewCharge():boolean
	{
		return this.checkSwitchByName("openNewCharge");
	}
	
	/**
	 * 充值奖励特殊档 是否开启
	 */
	public checkSpecialChargeReward():boolean
	{
		return this.checkSwitchByName("openSpecialChargeReward");
	}

	//检测充值奖励特殊档，true为已开启  没有1 默认为 openSpecialChargeReward
	public checkSpecialState(specialId:string)
	{
		return this.checkSwitchByName("openSpecialChargeReward"+specialId);
	} 
	

	/**
	 * 玩吧脱衣AB测试
	 */
	public checkOpenWifeAbTest():boolean
	{
		return this.checkSwitchByName("openWifeAbTest");
	}
	/**
	 * 新版牢房开关
	 */
	public checkOpenNewPrison():boolean
	{
		return this.checkSwitchByName("openNewPrison");
	}
	/**
	 * 邀请有礼开关
	 */
	public checkOpenInvite():boolean
	{
		return this.checkSwitchByName("openInvite");
	}
	/**
	 * 新首次充值开关 true=新版本 
	 */
	public checknewRecharge():boolean
	{
		return this.checkSwitchByName("newRecharge");
	}

	/**
	 * q群福利 开关  true新版本 
	 */
	public checkopenQQqun():boolean
	{
		return this.checkSwitchByName("openQQqun");
	}


	/**
	 * 是否关闭骨骼
	 */
	public checkCloseBone():boolean
	{
		return this.checkSwitchByName("closeBone");
		// return true;
	}
	/**
	 * 是否关闭红颜皮肤
	 */
	public checkCloseWifeskin():boolean
	{
		return this.checkSwitchByName("closeWifeskin");
		// return false;
	}
	
	/**
	 * 是否关闭宴会新功能
	 */
	public checkCloseDinnerNewFunc():boolean
	{
		return this.checkSwitchByName("closeDinnerNewFunc");
	}

	/**
	 * 3k迁移面板的开关
	 */
	public checkOpen3kQianYi():boolean
	{
		return this.checkSwitchByName("open3kqianyi");
	}

	public isCrossOpen()
	{
		return this.checkSwitchByName("openCrossPalace");
	}

	/**
	 * 名望开关 本服称帝
	 */
	public checkOpenPrestige():boolean
	{
		return this.checkSwitchByName("openPrestige");
	}

	/** 关闭充值 */
	public checkClosePay():boolean
	{
		if(PlatformManager.checkIsWxSp() && App.DeviceUtil.isIOS() && this.checkSwitchByName("wxgameiosclosepay"))
		{
			return true;
		}
		return false;
	}

	public checkAutoLoadDefaultRes():boolean
	{
		return this.checkSwitchByName("autoloadres");
	}
	/**
	 * cover
	 */
	public checkOpenCover():boolean
	{
		return this.checkSwitchByName("openCover");
	}
	// 至劲测试充值返利 
	public checkOpenRechargeRebate():boolean
	{
		return this.checkSwitchByName("openRechargeRebate");
	}

	// 至劲测试充值返利 2倍
	public checkOpenRechargeRebate2():boolean
	{
		return this.checkSwitchByName("openRechargeRebate2");
	}
	// 实名认证开关
	public checkOpenCertification():boolean
	{
		return this.checkSwitchByName("openCertification");
	}
	// 绑定有礼开关
	public checkOpenFbBind():boolean
	{
		let checkPlatResult:boolean=false;
		if(PlatformManager.checkIsWeiduan())
		{
			if(PlatformManager.checkIsTWBSp()&&  (
			(App.CommonUtil.compareVersion("3.0", PlatformManager.getAppVersion()) !== 1 && App.DeviceUtil.isIOS()) 
			||
			(App.CommonUtil.compareVersion("1.6", PlatformManager.getAppVersion()) !== 1 && App.DeviceUtil.isAndroid())
			))
			{
				checkPlatResult=true;
			}
			else if(PlatformManager.checkIsThSp()&&PlatformManager.checkIsThHw()==false)
			{
				checkPlatResult=true;
			}
			else
			{
				checkPlatResult = PlatformManager.hasBindFunc();
			}
		}
		else
		{
			checkPlatResult=PlatformManager.hasBindFunc();
		}
		if(checkPlatResult==false&&PlatformManager.checkIsLocal())
		{
			checkPlatResult=true;
		}
		return this.checkSwitchByName("openFbBind")&& Api.otherInfoVoApi.getFBBindFlag() != 1&&checkPlatResult;
	}

	// 粤语 开关
	public checkOpenVoice():boolean
	{
		return this.checkSwitchByName("openVoice");
	}

	//修身是否开启
	public isPracticeOPen():boolean
	{
		return this.checkSwitchByName("openPractice")
	}

	/**
	 * 册封是否开启
	 */
	public checkOpenWifeStatus():boolean
	{
		return this.checkSwitchByName("openWifestatus");
	}

	/**
	 * 自动登录AB测试开关
	 */
	public checkApenAutoLoginABtest():boolean
	{
		return this.checkSwitchByName("openAutoLoginABtest");
	}
	/**
	 * 八王夺帝开关
	 */
	public checkEmperorOpen():boolean
	{
		return this.checkSwitchByName("emperorOpen");
	}
	
	/**
	 * 500元宝赴宴，vip限制开关
	 */
	public checkOpenDinnerLimit():boolean
	{
		return this.checkSwitchByName("openDinnerLimit");
		// return true;
	}

	public checkOpenGDTStatistics():boolean
	{
		return this.checkSwitchByName("openGDTStatistics");
	}
	/**
	 * 贸易开关
	 */
	public checkOpenTrade():boolean
	{
		return this.checkSwitchByName("openTrade");
	}
	/**
	 * 帮会踢人限制和退帮会限制
	 */
	public checkOpenKickLimit():boolean
	{
		return this.checkSwitchByName("openKickLimit");
	}
	//征伐按钮
	public checkOpenConquest():boolean
	{
		return this.checkSwitchByName("openConquest");
	}

	/**
	 * 检测是否使用艺术字
	 */
	public checkOpenBMFont():boolean
	{
		if(PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang())
		{
			return false;
		}
		return true;
	}
	

	//新手引导去掉任务引导
	public checkRookieDelTask():boolean
	{
		return this.checkSwitchByName("delTask");
	}
	//获得门客，红颜等分享开关
	public checkOpenShareGate():boolean
	{
		if (PlatformManager.checkIsThHw()) {
			return false;
		} else {
			return this.checkSwitchByName("openShareGate");
		}
	}
	//获得门客，红颜等分享是否能获得奖励开关
	public checkOpenShareReward():boolean
	{
		return this.checkSwitchByName("openShareReward");
	}

	//检测红颜是否通过GM开启，true为已开启
	public checkIsWifeLocked(wifeId:string)
	{
		return this.checkSwitchByName("wifeName_"+wifeId ) ;
	}
	//检测门客是否通过GM开启，true为已开启
	public checkIsServantLocked(servantId:string)
	{
		return this.checkSwitchByName( "servant_name"+servantId);
	}
	//检测建筑是否通过GM开启，true为已开启
	public checkIsBuildingState(buildingId:string)
	{
		 return this.checkSwitchByName("building_name"+buildingId ) ;

	}
	//检测称号是否通过GM开启，true为已开启
	public checkIsTitleState(titleId:string)
	{
		return this.checkSwitchByName("title_name"+titleId );
	}

	public checkOpenFriendsSend()
	{
		return this.checkSwitchByName("openFriensSend"); 
	}

	/**
	 * 检测是否打开了私聊功能
	 */
	public openChatType3():boolean
	{
		return this.checkSwitchByName("openChatType3");
	}

	/**
	 * 检测是否打开了跨服聊天功能
	 */
	public openCrossChat():boolean
	{
		return this.checkSwitchByName("openCrossChat");
	}
	/**
	 * 是否开启跨服排行榜
	 */
	public checkOpenCrossRank()
	{
		return this.checkSwitchByName("openCrossRank");
	}
	/**是否开启  关闭充值系统  */
	public checkClosePaySys():boolean
	{
		return this.checkSwitchByName("closePaySys");
	}

	//是否开启了帮会建设
	public checkOpenAllianceTask():boolean
	{
		return this.checkSwitchByName("openAllianceTask");
	}

	/**是否开启  亲家系统  */
	public checkopenSadun():boolean
	{
		return this.checkSwitchByName("openSadun");
	}
	/**
	 * 是否开启强制分享
	 */
	public checkOpenForcedShare():boolean
	{
		return this.checkSwitchByName("openForcedShare");
	}
	/**是否开启  玩吧八月签到  */
	public checkOpenAugustsign():boolean
	{
		return this.checkSwitchByName("openAugustsign");
		// return true;
	} 
	
	// 新首充值界面开关，单独页面基于小程序开发 不在福利页面内。
	public checkWeChatFirstcharge():boolean
	{
		return this.checkSwitchByName("weChatFirstcharge"); 
	} 
	/**
	 * 开启新版的月卡和终身卡界面
	 */
	public checkOpenNewMonthCardAndYearCard():boolean
	{
		return this.checkSwitchByName("openNewMonthCardAndYearCard");
	} 
	
	/**
	 * 开启新版的月卡界面
	 */
	public checkOpenNewMonthCard():boolean
	{
		return this.checkSwitchByName("openNewMonthCard");
	} 
	/**是否开启 新光环
	 * id: 1:四大谋士  2:巾帼五虎 3:四答奸臣 4:蛮王 5:五虎上将
	 */
	public checkOpenNewAura(id:string | number):boolean
	{
		return this.checkSwitchByName("openAura"+id);
	}
	
	/**是否开启  气泡  */
	public checkopenBubble():boolean
	{
		return this.checkSwitchByName("openBubble");
	} 

	/**春节的二次弹框开关 */
	public checkOpenNewYearActiveTwoConfirm()
	{
		return this.checkSwitchByName("openNewYearActiveTwoConfirm");
	}

	//根据名字检查是否打开开关
	public checkOpenByName(funcName: string):boolean
	{
		return this.checkSwitchByName(funcName);
	}

	/** 是否开启擂台一键挑战 */
	public checkAutoAtkrace():boolean
	{
		return this.checkSwitchByName("openAtkraceAuto");
	}
	/** 是否开启跨服擂台一键挑战 */
	public checkAutoAtkracecross():boolean
	{
		return this.checkSwitchByName("openAtkracecrossAuto");
	}

	/** 是否开启新版的签到开关 */
	public checkOpenNewSignIn():boolean
	{
		return this.checkSwitchByName("openNewSignIn");
	}
	/**议事院开关 */
	public checkOpenCouncil()
	{
		return this.checkSwitchByName("openCouncil");
	}
	/**青年子嗣开关 */
	public checkOpenAdultImage()
	{
		return this.checkSwitchByName("openAdultImage");
	}
	/**
	 * 开启折扣活动 天数循环
	 */
	public checkOpenDiscountLoopTime()
	{
		return this.checkSwitchByName("openDiscountLoopTime")|| PlatformManager.checkIsThSp();
	}
	/** 是否开启红颜皮肤开关 */
	//用 checkCloseWifeskin 开关替代
	// public checkOpenWifeSkin():boolean
	// {
	// 	return this.checkSwitchByName("openWifeSkin");
	// }
	/** 是否开启门客皮肤开关 */
	public checkOpenServantSkin():boolean
	{
		return this.checkSwitchByName("openServantSkin");
	}
	/** 是否开启门客皮肤骨骼开关 */
	public checkOpenServantBone()
	{
		return this.checkSwitchByName("openServantBone");
	}
	/**
	 * 是否开启皮肤升级开关
	 */
	public checkOpenSkinLvup()
	{
		return this.checkSwitchByName("openSkinLvup");
	}

	/**
	 * 是否开启一键公务开关
	 */
	public checkOpenOfficialbusiness()
	{
		return this.checkSwitchByName("openOfficialbusiness");
	}

	/**
	 * 是否开启语音功能
	 */
	public checkOpenNewSound(){
		return this.checkSwitchByName("openNewSound");
	}

	/**
	 * 是否开启一键学习功能
	 */
	public checkOpenAutoStudy(){
		return this.checkSwitchByName("openAutoStudy");
	}

	/**
	 * 是否开启称号升级 
	 */
	public checkOpenTitleLv(){
		return this.checkSwitchByName("openTitleLv");
	}
	/**
	 * 是否关闭玩一玩红包
	 */
	public checkCloseWywRedMoney(){
		return this.checkSwitchByName("closeWywRedMoney");
	}
	/**
	 * 是否开启回归系统
	 */
	public checkOpenReback(){
		return this.checkSwitchByName("openReback");
	}

	//检测红颜皮肤是否通过GM开启，true为已开启
	public checkIsSkinState(skinId:string)
	{
		return this.checkSwitchByName("wifeSkin_name"+skinId );
	}
	/**
	 * 检测门客皮肤否通过GM开启，true为已开启
	 */
	public checkIsServantSkinState(skinId:string)
	{
		return this.checkSwitchByName("servantSkin_name"+skinId ) ;
	}
	/**
	 *  限时红颜的开关   绑死 泰国 和 玩一玩
	 * */
	public checkOpenTimeLimitWife():boolean
	{
		return this.checkSwitchByName("openTimeLimitWife")|| PlatformManager.checkIsRuSp() || PlatformManager.checkIsThSp()||PlatformManager.checkIsLmSp()||PlatformManager.checkIsEnLang()||PlatformManager.checkIsWanbaSp()||PlatformManager.checkIsFkcwSp()||PlatformManager.checkIsCpsSp()||PlatformManager.checkIsLocal();
	} 
	/**
	 * 1元限时礼包开关
	 */
	public checkLimitedGift():boolean
	{
		return this.checkSwitchByName("open1CostSceneGift") && Api.switchVoApi.checkClosePay()==false&&PlatformManager.getAppid()!="17027003";
		// return false;
	}
	/**
	 *  打开  帮会排行榜新规则	
	 */
	public checkOpenAllianceRankNewRule():boolean
	{
		return this.checkSwitchByName("openAllianceRankNewRule");
	}
	/*
	*黄金假期称号开关
	*/
	public checkOpenAcNewYear5Title():boolean{
		return this.checkSwitchByName("openAcNewYear5Title");
	}

	/*
	* 概率开关
	*/
	public checkOpenProbably():boolean{
		return this.checkSwitchByName("openProbably");
	}

	/*
	* 私聊发送消息开关
	*/
	public checkOpenPrichatSendMsg():boolean{
		return this.checkSwitchByName("openPrichatSendMsg");
	}

	/**
	 * 是否开启开关，在帮会擂台冲榜期间不可踢人，不可退帮
	 */
	public checkOpenRankActive():boolean
	{
		return this.checkSwitchByName("rankActive20");
	}

	/**
	 * 是否开启我要变强
	 */
	public checkOpenStrengthen():boolean
	{
		return this.checkSwitchByName("openStrengthen");
	}
	
	/**
	 * 是否开启演武场分享聊天
	 */
	public checkOpenStudyatkShare():boolean
	{
		return this.checkSwitchByName("openStudyatkShare");
	}

	/**
	 * 是否开启全服提亲分享聊天
	 */
	public checkOpenAdultShare():boolean
	{
		return this.checkSwitchByName("openAdultShare");
	}

	/**
	 * 是否开启场景更换 
	 */
	public checkOpenChangeBg():boolean
	{
		return this.checkSwitchByName("openChangeBg");
	}

	//检测场景皮肤是否通过GM开启，true为已开启
	public checkIsSceneState(skinId:string)
	{
		return this.checkSwitchByName("scene_name"+skinId );
	}

	/**
	 * 是否开启活动图标收起 
	 */
	public checkOpenMainUIIconExtend():boolean
	{
		return true;
	}

	/**
	 * 是否开启第二行图标收起 
	 */
	public checkOpenMainUIIconSingleLine():boolean
	{
		return this.checkSwitchByName("openMainUISingleLine");
	}

	/**
	 * 检测 是否开启帮会战
	 */
	public checkOpenAllianceWar():boolean
	{
		return this.checkSwitchByName("openAllianceWar")&&this.checkOpenCrossRank();
	}
	/**
	 * 演武场 新规则开关
	 */
	public checkOpenStudyatkNewRule():boolean
	{
		return this.checkSwitchByName("openStudyatkNewRule");
	}
	/**
	 * 演武场 保护规则开关
	 */
	public checkOpenStudyAtkProtectNewRule():boolean{
		return this.checkSwitchByName("openStudyAtkProtectNewRule");
	}
	/**
	 * 泰国4倍首冲
	 */
	public checkOpenMultiple():boolean
	{
		return this.checkSwitchByName("openMultiple");
	}


	public checkOpenIOSLoadErrorView():boolean
	{
		return this.checkSwitchByName("openIOSLoadErrorView");
	}
	/**
	 * 演武场经验加成开关
	 */
	public checkOpenStudyatkExp():boolean
	{
		return this.checkSwitchByName("openStudyatkExp");
	}
	/**
	 * 升级官品增加属性开关
	 */
	public checkOpenUpgradeAddAttribute():boolean
	{
		return this.checkSwitchByName("openUpgradeAddAttribute");
	}

	/**
	 * 检测fb广告开关
	 */
	public checkFBADSOpen():boolean
	{
		return this.checkSwitchByName("openFBADS")
	}

	/**
	 * 雁门关集合开关
	 */
	public checkOpenDailybossTogather():boolean
	{
		return this.checkSwitchByName("openDailybossTogather")
	}

	/**
	 * 门客战开关
	 */
	public checkOpenCountryWar():boolean
	{
		return this.checkSwitchByName("openCountryWar")
	}

	/**
	 * 智力 魅力 政治 一起影响经营的cd时间
	 */
	public checkOpenNewManageTime():boolean
	{
		return this.checkSwitchByName("openNewManageTime")
	}

	/**
	 * 门客皮肤光环开关
	 */
	public checkOpenServantSkinAura():boolean
	{
		let flag = false;
		if(this.checkOpenServantSkin() && this.checkSwitchByName("openServantSkinAura")){
			flag = true;
		}
		return flag;
	}

	/**
	 * 门客突破至450级
	 */
	public checkOpenServantLevel450():boolean
	{
		return this.checkSwitchByName("OpenServantLevel450");
	}

	/**
	 * 检测新手引导音效是否开启
	 */
	public checkOpenRookTalkEffect():boolean
	{
		return this.checkSwitchByName("openRookTalkEffect")
	}

	/**
	 * vip界面详情弹窗开关
	 */
	public checkOpenVipTxtpop():boolean
	{
		return this.checkSwitchByName("openVipTxtpop")
	}

	/**
	 * 擂台/跨服擂台 复仇是否从列表删除开关
	 */
	public checkOpenRevengeList():boolean
	{
		return this.checkSwitchByName("revengeList")
	}

	/**
	 * 跨服擂台-2000分开关
	 */
	public checkOpenAtkracegChangegpoint():boolean
	{
		return this.checkSwitchByName("atkracegChangegpoint")
	}

	/**
	 * 活动公告开关
	 */
	public checkOpenActivityPop():boolean
	{
		return this.checkSwitchByName("activityPop");
	}

	/**
	 * 是否开启红颜技能200以后的等级
	 */
	public checkOpenWifeSkillLv():boolean
	{
		return this.checkSwitchByName("wifeskillLv")
	}


	/**
	 * 检测是否开启审核服游戏功能，（走完新手引导直接跳到对应功能）
	 */
	public checkOpenShenheGame():boolean
	{
		let shenhe3k:boolean=false;
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			shenhe3k = pathname.indexOf("iosshenhe_3ksh")>-1||pathname.indexOf("iosshenhe_xy1")>-1||pathname.indexOf("iosshenhe_en_xy")>-1;
		}
		return (PlatformCfg.shenheFunctionName&&PlatformManager.checkIsIOSShenheSp()&&shenhe3k);
	}
	/**
	 * 是否关闭 终身卡界面的不能直升VIP3的提示，海外平台全部关闭，国内全部打开
	 */
	public checkCloseYearCardTip():boolean
	{
		return PlatformManager.checkIsEnLang()||PlatformManager.checkIsThSp()||PlatformManager.checkIsKRSp()||PlatformManager.checkIsTWBSp();
	}


	/**
	 * 是否开启聊天 Google翻译
	 */
	public checkOpenTranslate():boolean
	{
		return this.checkSwitchByName("openTranslate");
	}
	

	/**
	 * 是否开启红颜省亲
	 */
	public checkOpenBanish():boolean
	{
		return this.checkSwitchByName("openBanish");
	}

	/**
	 * 是否开启门客出海
	 */
	public checkOpenExile():boolean
	{
		return this.checkSwitchByName("openExile");
	} 

	/**
	 * 是否开启门客出海buff
	 */
	public checkOpenExileBuff():boolean
	{
		return this.checkSwitchByName("openExileBuff");
	} 

	/**
	 * 是否开启门客限时流放卡
	 */
	public checkOpenExileLimitTimeCard():boolean
	{
		return this.checkSwitchByName("openExileLimitTimeCard");
	} 

	/**
	 * 是否开启流放免费撤回
	 */
	public checkOpenBanishFreeTime():boolean
	{
		return this.checkSwitchByName("openBanishFreeTime");
	} 
	/**
	 * 是否开启月卡解锁席位  解锁修身技能开关
	 */
	public checkOpenSeat():boolean
	{
		return this.checkSwitchByName("openNewMonthAndYearCardBouns");
	} 

	/**
	 * 是否开启合服开关
	 */
	public checkOpenServerMaintain():boolean
	{
		return this.checkSwitchByName("openServerMaintain");
	} 

	/**
	 * 是否开启听雨轩开启碎片兑换
	 */
	public checkOpenExchangeSkin():boolean
	{
		return this.checkSwitchByName("checkOpenExchangeSkin");
	}
	/**
	 * 是否开启七日好礼开关
	 */
	public checkOpenSevenDay():boolean
	{
		return this.checkSwitchByName("OpenSevenDay");
	}

	/**
	 * 门客详情，新老界面开关（人物传记）
	 */
	public checkBiography():boolean
	{
		return this.checkSwitchByName("Biography");
	}

	/**
	 * 推送开关
	 */
	public checkOpenPushSetting():boolean
	{
		return this.checkSwitchByName("Push");
	}

	/**
	 * 仕途记录
	 */
	public checkOpenOfficialCareer():boolean
	{
		return this.checkSwitchByName("openOfficialCareer");
	}

	/**
	 * 剧情回忆
	 */
	public checkOpenStoryRecall():boolean
	{
		return this.checkSwitchByName("openStoryRecall");
	}

	/**
	 * 情缘绘卷
	 */
	public checkOpenQingYuanHuiJuan():boolean
	{
		return this.checkSwitchByName("openQingYuanHuiJuan");
	}

	public checkOpenQingYuan(type : string):boolean
	{
		return this.checkSwitchByName(`openQingYuan${type}`);
	}
	

	/**
	 * 开启称号分类
	 */
	public checkOpenTitleList():boolean
	{
		return this.checkSwitchByName("openTitleList");
	}

	/**
	 * 帮会周末活动开关
	 */
	public checkAllianceweekend():boolean
	{
		return this.checkSwitchByName("openAllianceweekend");
	}
	/**
	 * 新版皇宫开关
	 */
	public checkNewPalace():boolean
	{
		return this.checkSwitchByName("openNewPalace");
	}
	/**
	 * 帝王霸业
	 */
	public checkTitleUpgrade():boolean
	{
		return this.checkSwitchByName("openTitleUpgradeCfg");
	}

	/**
	 * 新蛮王功能
	 */
	public checkNewDailyBoss():boolean
	{
		return this.checkSwitchByName("openNewDailyBoss");
	}

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
	public checkWeaponFunction():boolean
	{
		return this.switchVo && this.switchVo.openWeapon && Api.otherInfoVoApi.getServerOpenDay() >= Config.GamepaceCfg.getWeaponPace();
	}

	public checkWeaponFunctionOnly():boolean
	{
		return this.switchVo && this.switchVo.openWeapon;
	}

	public checkOpenServantWeapon():boolean
	{
		return this.checkWeaponFunctionOnly();
	}

	/**
	 * 红颜皮肤升级总开关
	 */
	public checkWifeSkinLevelUp():boolean
	{
		return true;
	}
	/**
	 * 红颜皮肤升级配音
	 */
	public checkWifeSkinSoundOpen(wifeskinId:string):boolean
	{
		return this.checkSwitchByName(`wifeSkinSound_${wifeskinId}`);
	}
	/**
	 * 关闭红颜拉窗帘亲亲
	 */
	public checkCloseWifeKiss(): boolean {
		return this.checkSwitchByName("closeWifeKiss");
	}
	/**科举答题 */
	public checkExamOpen():boolean{
		return this.checkSwitchByName("openexamview");
	}
	/**府邸左侧活动icon */
	public checkLeftActIconOpen():boolean{
		return this.checkSwitchByName("openLeftActIcon");
	}
	/**
	 * 结识红颜开关
	 */
	public checkMeetBeautyOpen():boolean
	{
		return this.checkSwitchByName("openMeetBeauty");
		// return false;
	}
	/**
	 * 门客免战开关
	 */
	public checkServantRefuseBattle():boolean
	{
		return this.checkSwitchByName("OpenServantRefuseBattle");
	}
	/**
	 * 门客名望/功勋开关
	 */
	public checkServantFame():boolean
	{
		return this.checkSwitchByName("openServantFame");
	}

	/**
	 * 关卡关数开关
	 */
	public getChallengeOpen():number
	{	
		let idx = GameConfig.isNewDiffCfg ? 1 : 0;
		return this.switchVo.changeOpen[idx];
	}
	/**
	 * 聊天表情开关
	 */
	public checkEmoticonOpen():boolean{
		return this.checkSwitchByName("OpenChatStamp");
	}
	/**
	 * 红颜技能满级后经验转道具开关
	 */
	public checkWifeExpExchangeOpen():boolean{
		return this.checkSwitchByName("OpenWifeExpExchange");
	}
	/**
	 * 红颜对战系统开关
	 */
	public checkOpenWifeBattle():boolean
	{
		return this.checkSwitchByName("openWifeBattle");
	}
	/**
	 * 珍奇坊
	 */
	public checkZhenQiFangOpen():boolean
	{
		return this.checkWeaponFunction();
	}
	/**
	 * 门客皮肤展示
	 */
	public checkServantShowSkin():boolean
	{
		return false;
	}
	// public checkZhenQiFangOpen():boolean
	// {
	// 	// return this.checkSwitchByName(`openZhenQiFang`);
	// }
	/**
	 * 马可波罗新手引导剧情
	 */
	public checkRookieEnStory():boolean
	{
		return this.checkSwitchByName(`RookieEnStory`);
	}

	/**
	 * 出入府动效开关
	 */
	public checkOpenGooutAni():boolean
	{
		return this.checkSwitchByName("openGooutAni");
	}

	/**
	 * 打开面板动效
	 */
	public checkShowOpenViewAni():boolean
	{
		return this.checkSwitchByName("openShowViewAni");
	}
	/**
	 * 是否开启蓝颜
	 */
	public checkOpenBlueWife():boolean
	{
		return this.checkSwitchByName("openBlueWife");
		// return true;
	}
	/**
	 * 英文vip阶段礼包
	 */
	public checkOpenWelcomeVipGift():boolean
	{
		return this.checkSwitchByName("openWelcomeVipGift");
	}
	/**
	 * 英文vip阶段周礼包
	 */
	public checkOpenweeklyVipGift():boolean
	{
		return this.checkSwitchByName("openweeklyVipGift");
	}
	/**
	 * 是否屏蔽聊天，true的话是屏蔽
	 */
	public checkCloseChat():boolean
	{
		return this.checkSwitchByName("closeAllChat");
	}
	/**
	 * 是否屏蔽平乱公告按钮
	 */
	public checkCloseCountryWarEditBtn():boolean
	{
		return this.checkSwitchByName("closeCountryWarEditBtn");
	}
	/**
	 * 是否显示隐藏vip设置
	 */
	public checkOpenHideVip():boolean
	{
		return this.checkSwitchByName("openHideVip");
	}

	/**
	 * 检测是否只是shenhe目录
	 */
	public checkIsOlyShenheFile():boolean
	{
		if(PlatformManager.checkIsIOSShenheSp())
		{
			if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
			{
				let pathname:string=window.location.pathname;
				let tmpstr = pathname.substring(pathname.length-9);
				if(tmpstr=="iosshenhe"||tmpstr=="osshenhe/")
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 1元限时礼包开关 第二期
	 */
	public checkLimitedGift2():boolean
	{
		return this.checkSwitchByName("open1CostSceneGift2") && Api.switchVoApi.checkClosePay()==false&&PlatformManager.getAppid()!="17027003";
		// return false;
	}

	/**
	 * 是否处在蓝颜开启状态（GM开关+玩家自己开关）
	 */
	public checkIsInBlueWife():boolean
	{
		if(Api.switchVoApi.checkOpenBlueWife()&&Api.gameinfoVoApi.getSexswitch()==1)
		{
			return true;
		}
		return false;
	}

	/*
		蓝颜出府剧情
		开启：特定次数出府时会触发蓝颜剧情
		关闭：不触发
	*/
	public checkOpenBlueWifeOutHomeStory():boolean
	{
		return this.checkSwitchByName("openBlueWifeOutHomeStory");
	}
	
	/**
	 * 寻访剧情开关
	 */
	public checkOpenNewStory():boolean
	{
		return this.checkSwitchByName("openNewStory");
	}

	/**
	 * ar 拍照
	 */
	public checkOpenWifeArCamera():boolean
	{
		return this.checkSwitchByName("openWifeArCamera");
	}

	/**
	 * 头像框头衔等级切换
	 */
	public checkOpenChangeTitle():boolean{
		return this.checkSwitchByName("openChangeTitle");
	}

	/**
	 * 跨服皇陵不死天官开关
	 */
	public checkOpenTombEndLess():boolean{
		return this.checkSwitchByName("openTombEndlessBoss");
	}

	/**新ui
	 */
	public chekcOpenNewUi():boolean{
		return false;
	}
	
	/**
	 * 表情包系列开关 group 1,2 默认全平台开启
	 */
	public checkEmoticonGroupOpen(groupId:number):boolean{
		if (groupId == 1 || groupId == 2){
			return true;
		}
		return this.checkSwitchByName("openEmoticonGroup_"+groupId);
	}

	/**
	 * 帝王成就
	 */
	public checkOpenEmperorsAchievement():boolean{
		return this.checkSwitchByName("openEmperorsAchievement");
	}

	/**
	 * 列传本纪
	 */
	public checkOpenBiography():boolean{
		return this.checkSwitchByName("openBiography");
	}

	/**
	 * 重新唤起分阶段引导
	 */
	public checkOpenGuideAgain():boolean{
		return this.checkSwitchByName("openGuideAgain");
	}

	/**
	 * 开启门客等级标签
	 */
	public checkOpenServantLvLabel():boolean{
		return this.checkSwitchByName("openServantLvLabel");
	}

	/**
	 * 一键收宴
	 */
	public checkOpenFinishDinner():boolean{
		return this.checkSwitchByName("openFinishDinner");
	}

	/**
	 * 帮助按钮开关
	 */
	public checkOpenMainUIHelpBtn():boolean{
		return this.checkSwitchByName("openMainUIHelpBtn");
	}

	/**
	 * 新邀请好友开关
	 */
	public checkOpenNewInvite():boolean{
		return this.checkSwitchByName("openNewInvite");
	}

	/**
	 * 月卡持续期间免费高建
	 */
	public checkOpenMonthcardDonate():boolean{
		return this.checkSwitchByName("openMonthcardDonate");
	}

	/**
	 * 红颜特计
	 */
	public checkOpenWifeExSkill():boolean{
		return this.checkSwitchByName("openWifeExSkill");
	}
	
	/**
	 * 召回玩家开关
	 */
	public checkOpenPlayerComeBack():boolean{
		return this.checkSwitchByName("openPlayerComeBack");
	}

	/**
	 * 管家一键收取开关
	 */
	public checkOpenHousekeeper():boolean{
		return this.checkSwitchByName("openHousekeeper");
	}

	/**
	 * 管家一键收取开关
	 */
	public checkOpenGrowGold():boolean{
		return this.checkSwitchByName("openGrowGold");
	}


	/**
	 * 情缘绘卷 佳人、门客页签开关
	 */
	public checkOpenQingyuanServantAndWifePage():boolean{
		return this.checkSwitchByName("openQingyuanServantAndWifePage");
	}

	/**
	 * 皇城六部开关
	 */
	public checkOpenSixSection():boolean{
		return this.checkSwitchByName("openSixSection");
	}

	//皇城六部 建筑是否通过GM开启，true为已开启
	public checkOpenSixSectionBuilding(buildingId:string|number)
	{
		return this.checkSwitchByName("sixSection_bulid"+buildingId);
	}
	/**
	 * 府内按钮收起显示
	 */
	public checkOpenHouseBtnUp():boolean{
		return this.checkSwitchByName("openHouseBtnUp");
	}

	/**
	 * 快速战斗和试用
	 */
	public checkOpenFastFight():boolean{
		return this.checkSwitchByName("openFastFight");
	}	

	/**
	 * 功能解锁特效
	 */
	public checkOpenUnlockFuncEffect():boolean{
		return this.checkSwitchByName("openUnlockFunctionEffect");
	}

	/**
	 * 跨服权势--点兵遣将
	 */
	public checkOpenCrossPowerSolider():boolean{
		return this.checkSwitchByName("openCrossPowerSolider");
	}	

	/**
	 * 跨服权势--权势赏金
	 */
	public checkOpenCrossPowerGold():boolean{
		return this.checkSwitchByName("openCrossPowerGold");
	}	
}
