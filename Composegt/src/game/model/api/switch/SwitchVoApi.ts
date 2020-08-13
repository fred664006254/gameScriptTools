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
	public checkCommonSwitch(key:string):boolean
	{
		return this.checkSwitchByName(key);
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
		// return this.checkSwitchByName("openPunishVip");
		return true;
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
		// return true;
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
		// return this.checkSwitchByName("openJumpBattle");
		return true;
	}

	/**
	 * 一键扫荡关卡
	 */
	public checkAutoMopup():boolean
	{
		// return this.checkSwitchByName("openAutoMopup");
		return true;
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
		// return this.checkSwitchByName("newRecharge");
		return true;
	}

	/**
	 * q群福利 开关  true新版本 
	 */
	public checkopenQQqun():boolean
	{
		return this.checkSwitchByName("openQQqun");
	}


	/**
	 * 是否关闭骨骼 只关系红颜骨骼
	 */
	public checkCloseBone():boolean
	{
		return this.checkSwitchByName("closeBone");
		// return true;
	}

	/**
	 * 是否关闭某个红颜的骨骼
	 */
	public checkWifeBone(wifeid:string|number):boolean
	{
		return this.checkSwitchByName("closeBone_wife"+wifeid);
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
	/**
	 * 红颜视频开关
	 */
	public checkOpenWifeVideo():boolean
	{
		return this.checkSwitchByName("openWifeVideo");
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
		// return this.checkSwitchByName("openPrestige");
		return true;
	}

	/** 微信小程序iOS付费审核开关 */
	public checkClosePay():boolean
	{
		// if((App.DeviceUtil.isWXgame()|| PlatformManager.checkIsQQXYXSp())&& App.DeviceUtil.isIOS() && this.checkSwitchByName("wxgameiosclosepay"))
		if((App.DeviceUtil.isWXgame()|| PlatformManager.checkIsQQXYXSp())&& this.checkSwitchByName("wxgameiosclosepay"))
		{
			return true;
		}
		let level = GameData.ioslevellimit;
		if(!level)
		{
			level = 3;
		}
		// if((App.DeviceUtil.isWXgame()|| PlatformManager.checkIsQQXYXSp()) && App.DeviceUtil.isIOS() &&Api.playerVoApi.getPlayerLevel()<=level)
		if((App.DeviceUtil.isWXgame()|| PlatformManager.checkIsQQXYXSp()) && Api.playerVoApi.getPlayerLevel()<=level)
		{
			return true;
		}
		return false;
	}




	/**是否开启  关闭充值系统  */
	public checkClosePaySys():boolean
	{
		return this.checkSwitchByName("closePaySys");
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
	// 实名认证开关
	public checkOpenCertification():boolean
	{
		return this.checkSwitchByName("openCertification");
	}

	// 实名认证开关3（目前再用的）
	public checkOpenCertification3():boolean
	{
		return this.checkSwitchByName("openCertification3");
	}

	// 调查问卷
	public checkOpenQuestionnaire():boolean
	{
		return this.checkSwitchByName("openQuestionnaire");
	}
	// 绑定有礼开关
	public checkOpenFbBind():boolean
	{
		return this.checkSwitchByName("openFbBind");
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
		// return this.checkSwitchByName("openWifestatus");
		return true;
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
		// return true;
	}

	/**
	 * 牢狱开关
	 */
	public checkOpenPrison():boolean
	{
		if(!PlatformManager.checkIsWxmgSp()&&!PlatformManager.checkIsQQXYXSp())
		{
			return true;
		}
		return this.checkSwitchByName("openPrison");
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
		// return true;
	}
	// 新首充值界面开关，单独页面基于小程序开发 不在福利页面内。
	public checkWeChatFirstcharge():boolean
	{
		// return this.checkSwitchByName("weChatFirstcharge"); 
		return true;
	} 

	//获得门客，红颜等分享开关
	public checkOpenShareGate():boolean
	{
		return true;
		// return this.checkSwitchByName("openShareGate");
	}
	//获得门客，红颜等分享是否能获得奖励开关
	public checkOpenShareReward():boolean
	{
		return true;
		// return this.checkSwitchByName("openShareReward");
	}
	//新经营和关卡boss分享开关
	public checkOpenShareFinanceAndRecover():boolean
	{
		return this.checkSwitchByName("openShareFinanceAndRecover")&&PlatformManager.isSupportShare();
	}
	//根据名字检查是否打开开关
	public checkOpenByName(funcName: string):boolean
	{
		return this.checkSwitchByName(funcName);
	}

	/**
	 * 开启新版的月卡和终身卡界面
	 * 这个开关作废，由于涉及太多直接写死打开
	 */
	public checkOpenNewMonthCardAndYearCard():boolean
	{
		return  true;//this.checkSwitchByName("openNewMonthCardAndYearCard");
	} 

	/**
	 * 是否开启强制分享
	 */
	public checkOpenForcedShare():boolean
	{
		return this.checkSwitchByName("openForcedShare");
	}

	/**
	 * 新群组分享
	 */
	public checkOpenWxShareToGroup():boolean
	{
		return this.checkSwitchByName("openWxShareToGroup");
	}
	/**
	 * 开关_微信分享_旧的
	 */
	public checkOpenWxShareToGroupOld():boolean
	{
		return this.checkSwitchByName("openWxShareToGroupOld");
	}

	/**是否开启  气泡  */
	public checkopenBubble():boolean
	{
		return this.checkSwitchByName("openBubble");
		// return true; 
	} 

	/**vipicon */
	public checkopenFkVipIcon():boolean
	{
		// return this.checkSwitchByName("openFkVipIcon"); 
		return true;
	} 

	/**
	 *  限时红颜的开关
	 * */
	public checkOpenTimeLimitWife():boolean
	{
		// return this.checkSwitchByName("openTimeLimitWife") ||PlatformManager.checkIsWxSp() ||PlatformManager.checkIsViSp() || PlatformManager.checkIsH5lySp();
		return this.checkSwitchByName("openTimeLimitWife");
	} 
	/**
	 *  越南第三方支付 fb红颜开关
	 * */
	public checkOpenTimeLimitWifeFb():boolean
	{
	
		return this.checkSwitchByName("openTimeLimitWifeFb");
	} 


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
	public checkLimitedGift():boolean
	{
		return this.checkSwitchByName("open1CostSceneGift") && !Api.switchVoApi.checkClosePay()&&!PlatformManager.checkHideIconByIP();
		// return false;
	}

	/**
	 * 限时礼包 进阶礼包开关
	 */
	public checkLimitedGift2():boolean
	{
		return this.checkSwitchByName("open1CostSceneGift_2");
	}

	/**
	 * 新七日签到开关
	 */
	public checkSignUp():boolean
	{
		return this.checkSwitchByName("openArrivalNew");
	}

	/**
	 * 新七日签到开关
	 */
	public checkOpenShowSignUp():boolean
	{
		// return this.checkSwitchByName("openShowArrivalNew");
		return true;
	}
	/**
	 * 检测是否使用艺术字
	 */
	public checkOpenBMFont():boolean
	{
		// if(PlatformManager.checkIsThSp())
		// {
			return true;
		// }
		// return true;
	}

	/**
	 * 检测 是否关闭越南安卓第三方支付
	 */
	public closeViWebPay():boolean
	{
		return this.checkSwitchByName("closeViWebPay");
	}

	/**
	 * 检测 是否开启越南安卓第三方支付
	 */
	public openViWebPay():boolean
	{

		if(this.checkSwitchByName("openViWebPay"))
		{
			let level = GameData.ioslevellimit;
			if(!level)
			{
				level = 6;
			}
			if(Api.playerVoApi.getPlayerLevel() >= level || Api.shopVoApi.isWebPay()){
				return true;
			}

		} else {
			if(Api.shopVoApi.isWebPay())
			{
				return true
			}
		}

		return false;


	}

	/**
	 * 检测 是否开启越南ios第三方支付
	 */
	public openViIOSWebPay():boolean
	{
		return this.checkSwitchByName("openViIOSWebPay");
	}

	/**
	 * 检测 是否开启越南facebook
	 */
	public openViFacebook():boolean
	{
		return this.checkSwitchByName("openFacebook");
	}
	/**
	 * 日本Ios审核98元档位开关
	 */
	public checkOpenAuditFile():boolean
	{
		return this.checkSwitchByName("openAuditFile");
	}
	// 特殊礼包 (显示在特惠礼包当中，需要开关打开  openSpecialGift = true)
	public checkOpenSpecialGift():boolean
	{
		return this.checkSwitchByName("openSpecialGift");
		// return true;
	}
	//概率展示显示开关  true  打开
	public checkOpenProbInfo():boolean
	{
		return this.checkSwitchByName("openProbInfo");
		// return true;
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
	//检测红颜皮肤是否通过GM开启，true为已开启
	public checkIsSkinState(skinId:string)
	{
		return this.checkSwitchByName("wifeSkin_name"+skinId );
	}

	//检测是否开启，元宝寻访开关
	public checkOpenSearchGem()
	{
		return this.checkSwitchByName("openSearchGem" );
	}
	//检测是否开启，太学强化开关
	public checkOpenBookRoomStrenthen()
	{
		return this.checkSwitchByName("openBookRoomStrenthen" );
	}
	//检测是否开启 首冲 ，1元红颜抢弹开关
	public checkOpenShowPopupWin()
	{
		return this.checkSwitchByName("openShowPopupWin");
	}
	//首充气泡
	public checkOpenFirstChargeBubble()
	{
		return this.checkSwitchByName("openFirstChargeBubble");
	}
	//检测是否开启经营商人
	public checkOpenManageTrader()
	{
		return this.checkSwitchByName("openManageTrader");
	}
	
	/** 是否开启擂台一键挑战 */
	public checkAutoAtkrace():boolean
	{
		// return this.checkSwitchByName("openAtkraceAuto");
		return true;
	}
	/** 是否开启跨服擂台一键挑战 */
	public checkAutoAtkracecross():boolean
	{
		// return this.checkSwitchByName("openAtkracecrossAuto");
		return true;
	}
	/** 是否开启商城VIP页签 */
	public checkOpenShopVipTab():boolean
	{
		return this.checkSwitchByName("openShopVipTab");
	}
	/** 是否开启商城VIP 低v看不到高v档位 */
	public checkOpenShopVipTab2():boolean
	{
		return this.checkSwitchByName("openShopVipTab_2");
	}
	/** 微信红颜技能3开关-openNewWifeskillFixup
		此开关只能开不能关 */
	public checkopenNewWifeskillFixup():boolean
	{
		return this.checkSwitchByName("openNewWifeskillFixup");
	}
	
	public checkOpenFriendsSend()
	{
		return this.checkSwitchByName("openFriensSend"); 
	}
		/**是否开启  亲家系统  */
	public checkopenSadun():boolean
	{
		// return this.checkSwitchByName("openSadun");
		return true;
	}
	/**
	 * 是否开启活动图标收起 
	 */
	public checkOpenMainUIIconExtend():boolean
	{
		return true;
	}

	/**
	 * 是否开启称号升级 
	 */
	public checkOpenTitleLv(){
		// return this.checkSwitchByName("openTitleLv");
		return true;
	}
	/**
	 * 是否开启红颜皮肤升级 
	 */
	public checkOpenWifeskinLvup(){
		// return this.checkSwitchByName("openWifeskinLvup");
		return true;
	}

	/**
	 * 是否开启全服提亲分享聊天
	 */
	public checkOpenAdultShare():boolean
	{
		return this.checkSwitchByName("openAdultShare");
	}
	/**青年子嗣开关 */
	public checkOpenAdultImage()
	{
		// return this.checkSwitchByName("openAdultImage");
		return true;
	}
	/**创建角色界面 皇帝骨骼开关 */
	public checkOpenCreateUserBones():boolean
	{
		// return true;
		return this.checkSwitchByName("openCreateUserBones");

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
		// return true;
		return this.checkSwitchByName("openCrossRank");
	}

	/*
	* 私聊发送消息开关
	*/
	public checkOpenPrichatSendMsg():boolean{
		return this.checkSwitchByName("openPrichatSendMsg");
	}

	/**
	 * 微信圈子开关
	 */
	public checkOpenCircle():boolean
	{
		// if(!App.DeviceUtil.isIOS())
		// {
		// 	return true;
		// }
		// return this.checkSwitchByName("checkOpenCircle");
		return false;
	}

	/*
	* 私聊发送消息开关
	*/
	public checkOpenTwitter():boolean{
		return this.checkSwitchByName("checkOpenTwitter");
	}

	/*
	* 微信客服礼包开关
	*/
	public checkOpenWxchatgift():boolean{
		return this.checkSwitchByName("checkOpenWxchatgift");
	}
	/*
	* 微信添加到我的小程序开关
	*/
	public checkOpenWxaddmypro():boolean{
		return this.checkSwitchByName("checkOpenWxaddmypro");
	}

	/*
	* 浮窗指引，绑死微信
	*/
	public checkOpenWxIcon():boolean{
		return this.checkSwitchByName("checkOpenWxIcon");
	}

	/** 是否开启门客皮肤开关 */
	public checkOpenServantSkin():boolean
	{
		return this.checkSwitchByName("openServantSkin");
	}

	/**
	 * 检测门客皮肤否通过GM开启，true为已开启
	 */
	public checkIsServantSkinState(skinId:string)
	{
		return this.checkSwitchByName("servantSkin_name"+skinId ) ;
	}

	/**
	 * 是否开启语音功能
	 */
	public checkOpenNewSound(){
		return this.checkSwitchByName("openNewSound");
	}
	public checkOpenNewAura(id:string | number):boolean
	{
		return this.checkSwitchByName("openAura"+id);
	}

	/**
	 * 检测是否打开了宴会功能
	 */
	public checkOpenCrossDinner():boolean
	{
		// return false;
		return this.checkSwitchByName("openCrossDinner");
	}
	/**
	 * 检测是否是跨服宴会（千万注意与checkOpenCrossDinner的区别）
	 */
	public checkIsCrossDinner():boolean
	{
		// return false;
		return this.checkSwitchByName("isCrossDinner");
	}
	/**
	 * 检测是否微信实名支付官品判断(仅判断官品，不判断平台等其它杂项)
	 */
	public checkWxRealname3LevelCanPay():boolean
	{
		return Api.playerVoApi.getPlayerLevel() > 8;
	}
	
	/**
	 * 是否开启一键公务开关
	 */
	public checkOpenOfficialbusiness()
	{
		// return this.checkSwitchByName("openOfficialbusiness");
		return true;
	}

	/**
	 * 是否关闭骨骼
	 */
	public checkServantCloseBone():boolean
	{
		// return this.checkSwitchByName("closeServantBone");
		return false;
		// return false;
	}
	/**
	 * 审核关闭支付
	 */
	public checkShenheClosePay():boolean
	{
		return this.checkSwitchByName("checkShenheClosePay");
	}
	/**
	 * 演武场经验加成开关
	 */
	public checkOpenStudyatkExp():boolean
	{
		// return this.checkSwitchByName("openStudyatkExp");
		return true;
	}
	/**
	 * 关注公众号开关
	 */
	public checkOpenWxaddoffacct():boolean
	{
		return this.checkSwitchByName("checkOpenWxaddoffacct");
	}

	/**
	 * 微信参加跨服宴会条件限制开关
	 */
	public checkCrossDinner():boolean
	{
		return this.checkSwitchByName("wx_joindinner");
	}


	/**
	 * 是否开启微信分享假失败
	 */
	public checkOpenWxShareFail():boolean
	{
		return this.checkSwitchByName("checkOpenWxShareFail");
	}


	/**议事院开关 */
	public checkOpenCouncil()
	{
		return this.checkSwitchByName("openCouncil");
	}
	/**
	 * 夺帝战宣传开关
	 */
	public checkOpenPrestigeShow():boolean
	{
		// return this.checkSwitchByName("openPrestigeShow");
		return true;
	}


	/**
	 * 检测 是否开启帮会战
	 */
	public checkOpenAllianceWar():boolean
	{
		return this.checkSwitchByName("openAllianceWar")&&this.checkOpenCrossRank();
	}
	/**府邸伸缩是否开启 */
	public checkOpenUnfold():boolean
	{
		return this.checkSwitchByName("checkOpenUnfold");
		// return true;
	}

	//是否开启了帮会任务
	public checkOpenAllianceTask():boolean
	{
		// return this.checkSwitchByName("openAllianceTask");
		return true;
	}
	//是否开启新每日礼包高额档位 
	public checkOpenDailyActivityHeightTap():boolean
	{
		return this.checkSwitchByName("checkOpenDailyActivityHeightTap");
	}


	//检测充值奖励特殊档，true为已开启  没有1 默认为 openSpecialChargeReward
	public checkSpecialState(specialId:string)
	{
		return this.checkSwitchByName("openSpecialChargeReward"+specialId);
	} 

	public checkMainTaskGuide()
	{
		// return this.checkSwitchByName("openMainTaskGuide");
		return false;
	} 

	//开启微信帐号转移
	public checkOpenAccountmove()
	{
		return this.checkSwitchByName("checkOpenAccountmove");
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
	//揽月亭开关
	public checkOpenSkinBuilding()
	{
		return this.checkSwitchByName("openSkinBuilding");
	} 
	/** 府外大地图滚动 */
	public checkScrollCityScene()
	{
		return true;
		// return this.checkSwitchByName("openScrollCityScene");
	} 

		/** 微信审核换图 */
	public checkOpenWxHexiePic()
	{
		// return true;  
		return this.checkSwitchByName("openWxHexiePic");
	} 

		/**
	 * 是否开启一键学习功能
	 */
	public checkOpenAutoStudy(){
		// return this.checkSwitchByName("openAutoStudy");
		return true;
	}

	/*
	* lobi
	*/
	public checkOpenLobi():boolean{
		return this.checkSwitchByName("checkOpenLobi");
	}
	/**
	 * 跨服擂台-2000分开关
	 */
	public checkOpenAtkracegChangegpoint():boolean
	{
		return this.checkSwitchByName("atkracegChangegpoint")
	}

		/**
	 * 擂台/跨服擂台 复仇是否从列表删除开关
	 */
	public checkOpenRevengeList():boolean
	{
		// return this.checkSwitchByName("revengeList")
		return true;
	}


	/**
	 * 是否开启开关，在帮会擂台冲榜期间不可踢人，不可退帮
	 */
	public checkOpenRankActive():boolean
	{
		return this.checkSwitchByName("rankActive20");
	}

	/**
	 * 是否开启场景宠幸功能
	 */
	public checkOpenWifeBathScene():boolean
	{
		return this.checkSwitchByName("openWifeBathScene");
	}

	/**
	 * 是否开启帮会冲榜新规则
	 */
	public checkOpenAllianceRankNewRule():boolean
	{
		return this.checkSwitchByName("openAllianceRankNewRule");
	}

	/**
	 * 是否开启我要变强
	 */
	public checkOpenStrengthen():boolean
	{
		// return this.checkSwitchByName("openStrengthen");
		return false;
	}
	
	/**
	 * 是否开启3个开关的我要变强的第一个开关
	 */
	public checkOpenRealnamerewards():boolean
	{
		return this.checkSwitchByName("openRealnamerewards");
	}

	/**
	 * 是否开启3个开关的我要变强的第二个开关
	 */
	public checkProtectInDrink():boolean
	{
		return this.checkSwitchByName("protectInDrink");
	}

	/**
	 * 是否开启3个开关的我要变强的第三个开关
	 */
	public checkOpenTrueRealName():boolean
	{
		return this.checkSwitchByName("openTrueRealName");
	}
	/**
	 * 是否开启玩吧，vip特权礼包
	 */
	public checkOpenWanbaviptequan():boolean
	{
		return this.checkSwitchByName("openWanbaviptequan");
	}

	/**
	 * 是否开启20秒自动进游戏
	 */
	public checkOpenAutoEnterGame():boolean
	{
		return this.checkSwitchByName("openAutoEnterGame");
	}


	/**
	 * 红颜对战系统开关
	 */
	public checkOpenWifeBattle():boolean
	{
		return this.checkSwitchByName("openWifeBattle");
	}



	/**
	 * 是否开启设置里面的红颜和谐开关
	 */
	public checkOpenSettingWife():boolean
	{
		return this.checkSwitchByName("openSettingWife");
	}

	/**
	 * 是否开启低V不能私聊高V开关
	 */
	public checkOpenchatvsvip():boolean
	{
		if(Api.playerVoApi.getPlayerVipLevel()>=12)
		{
			return false;
		}
		return this.checkSwitchByName("chatvsvip");
	}

	/**
	 * 防诈骗开关 
	 */
	public checkopenAntiDeception():boolean
	{
		return this.checkSwitchByName("antideception");
	}
	/**
	 * 关闭红颜语音
	 */
	public checkCloseWifeSound():boolean
	{
		return this.checkSwitchByName("closeWifeSound");
	}

		/**
	 * 是否开启回归系统
	 */
	public checkOpenReback(){
		return this.checkSwitchByName("openReback");
	}

	/**
	 * 检测 是否开启Android更新提示
	 */
	public checkOpenNewAndroidVersion():boolean
	{
		return this.checkSwitchByName("openNewAndroidVersion");
	}

	/**
	 * 跳过创建角色
	 */
	public checkOpenJumpCreateUser():boolean
	{
		// return this.checkSwitchByName("openJumpCreateUser");
		return true;
	}
	/**
	 * 是否开启红颜AR合照
	 */
	public checkOpenWifeArCamera():boolean
	{
		return this.checkSwitchByName("openArCamera");
	}
	/**
	 * 是否开启twitter每日分享
	 */
	public checkOpenTwitterDailyShare():boolean
	{
		return this.checkSwitchByName("openTwitterDailyShare");
	}
	/**
	 * 是否禁用列表飞入效果
	 */
	public checkOpenListFly():boolean
	{
		return this.checkSwitchByName("openListFly");
	}

	/**
	 * 是否开启页面出现效果
	 */
	public checkOpenViewOpenAni():boolean
	{
		return this.checkSwitchByName("openShowViewAni");
		// return this.checkSwitchByName("openViewOpenAni");
	}
	/**
	 * 是否开启微信投诉
	 */
	public checkOpenFeedBack():boolean
	{
		return this.checkSwitchByName("openFeedBack");
		// return this.checkSwitchByName("openViewOpenAni");
	}

	/**
	 * 出府动效开关
	 */
	public checkOpenGooutAni():boolean
	{
		return this.checkSwitchByName("openGooutAni");
	}
	/**
	 * 帮会演武场开关
	 */
	public checkOpenStudyatkAlliance():boolean
	{
		return this.checkSwitchByName("openstudyatkalliance");
	}

	/**
	 * 37调查问卷
	 */
	public checkOpen37Question():boolean
	{
		return this.checkSwitchByName("open37Question");
	}
	/**
	 * 新官上任
	 */
	public checkOpenLoginWeek():boolean
	{
		return this.checkSwitchByName("openLoginWeek");
	}


	public checkOpenSecondCharge():boolean
	{
		return this.checkSwitchByName("openSecondCharge");
	}
	

	/**
	 * 零元礼包
	 */
	public checkOpenZeroGift():boolean
	{
		return this.checkSwitchByName("openZeroGift");
	}
	
	/**
	 * 寻访剧情开关
	 */
	public checkOpenNewStory():boolean
	{
		return this.checkSwitchByName("openNewStory");
	}

	/**
	 * 是否开启蓝颜
	 */
	public checkOpenBuleWife():boolean
	{
		return this.checkSwitchByName("openBuleWife");
		// return true;
	}

	/**
	 * 是否处在蓝颜开启状态（GM开关+玩家自己开关）
	 */
	public checkIsInBlueWife():boolean
	{
		if(Api.switchVoApi.checkOpenBuleWife()&&Api.gameinfoVoApi.getSexswitch()==1)
		{
			return true;
		}
		return false;
	}

	/**
	 * 1524道具参加宴会开关
	 */
	public checkOpen1524JoinDinner():boolean
	{
		return this.checkSwitchByName("openDinnerUseItem1524");
	}

	/**
	 * 月卡百年陈酿
	 */
	public checkOpenMouthCardAddItem1524():boolean
	{
		return this.checkSwitchByName("openMouthCardAddItem1524");
	}


	/**
	 * 是否关闭i聊天
	 */
	public checkCloseChat():boolean
	{
		return this.checkSwitchByName("closeChat");

	}


	/**
	 * 擂台扣分优化
	 */
	public checkOpenAtkraceScoreFix():boolean
	{
		return this.checkSwitchByName("openAtkraceScoreFix");

	}
	/**
	 * 豪门订阅开关
	 */
	public checkOpenSpCard():boolean
	{
		return this.checkSwitchByName("openSpCard");
	}

	/**
	 * 资源加载优化（解决新手引导卡死）
	 */
	public checkOpenResNeedLoading():boolean
	{
		return this.checkSwitchByName("openResNeedLoading");
	}
	/**
	 * 微信 新每日礼包-中第一个档位的1元礼包，做成开关
	 */
	public checkOpenDailyActivity1RmbTap():boolean
	{
		return this.checkSwitchByName("openDailyActivity1RmbTap");
		// return true;
	}
	/**
	 * 
	 * 开启：首冲变为6倍
	 * 关闭：首冲4倍
	 * 
	 */
	public checkOpenFirstCharge6Times():boolean
	{

		return this.checkSwitchByName("firstCharge6times");
	}


	public checkOpenAllCharge():boolean
	{
		return this.checkSwitchByName("thirdAndAllChargeGift");
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
	/*
		屏幕点击特效
	*/
	
	public checkOpenClickEffect():boolean
	{
		return this.checkSwitchByName("openClickEffect");
	}

	/**
	 * 日本H5调查问卷
	 */
	public checkOpenH5Questionnaire():boolean
	{
		return this.checkSwitchByName("openH5Questionnaire");
	}

	/**
	 * 玩家5秒未操作主线任务按钮出现小手开关
	 */
	public checkOpenMainQuestFinger():boolean
	{
		return this.checkSwitchByName("openMainQuestFinger");
	}

	/**
	 * 合成隐藏充值icon开关
	 * 开启时，如玩家未充值过，隐藏月卡，年卡，充值奖励icon
	 */
	public checkOpenHideRechargeIcon():boolean
	{
		return this.checkSwitchByName("openHideRechargeIcon");
		// return true;
	}

	/**
	 * 门客等级上限250级
	 */
	public checkOpenLimitS250Lv():boolean
	{
		return this.checkSwitchByName("openLimitS250Lv");
		// return true;
	}


	/**
	 * 关卡上限100章
	 */
	public checkOpenLimitC100Chapter():boolean
	{
		return this.checkSwitchByName("openLimitC100Chapter");
		// return true;
	}

	/**
	 * 府外功能解锁前隐藏入口功能
	 * 开启时：府外未解锁功能入口隐藏
		关闭时：府外未解锁功能入口展示出来，玩家可点击交互
	 */
	public checkOpenHideNPC():boolean
	{
		return this.checkSwitchByName("openHideNPC");
		// return true;
	}
}