var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Api管理类，统一通过这里调取Api,每次新增Api时，需要在init方法中new
 * author dmj
 * date 2017/9/16
 * @class PlayerVoApi
 */
var Api = (function () {
    function Api() {
    }
    Api.init = function () {
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
        Api.searchVoApi = new SearchVoApi();
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
        Api.dailybossVoApi = new DailybossVoApi();
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
    };
    Api.formatData = function (rData, cmd) {
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
        var notDispatcher = {};
        ;
        if (rData.userinfo) {
            // 用户数据
            Api.playerVoApi.formatData(rData.userinfo);
        }
        if (rData.item) {
            // 道具信息
            Api.itemVoApi.formatData(rData.item);
        }
        if (rData.servant) {
            // 门客系统
            Api.servantVoApi.formatData(rData.servant);
        }
        if (rData.wife) {
            // 红颜系统
            Api.wifeVoApi.formatData(rData.wife);
        }
        if (rData.wifebattle) {
            // 红颜对战系统
            Api.wifebattleVoApi.formatData(rData.wifebattle);
        }
        if (rData.child) {
            // 子嗣系统
            Api.childVoApi.formatData(rData.child);
        }
        if (rData.adult) {
            // 媒婆系统
            Api.adultVoApi.formatData(rData.adult);
        }
        if (rData.sadun) {
            Api.adultVoApi.init_sadun_data(rData);
        }
        if (rData.prison) {
            // 牢房系统
            Api.prisonVoApi.formatData(rData.prison);
        }
        if (rData.autoRes) {
            Api.manageVoApi.formatAutoRes(rData.autoRes);
        }
        if (rData.manage) {
            Api.manageVoApi.formatData(rData.manage);
        }
        if (rData.challenge) {
            // 关卡系统
            Api.challengeVoApi.formatData(rData.challenge);
        }
        if (rData.search) {
            Api.searchVoApi.formatData(rData.search);
        }
        if (rData.maintask) {
            Api.mainTaskVoApi.formatData(rData.maintask);
        }
        if (rData.minfo || rData.apnum) {
            Api.rankVoApi.formatData(rData);
        }
        if (rData.otherinfo) {
            Api.otherInfoVoApi.formatData(rData.otherinfo);
        }
        if (rData.shop) {
            Api.shopVoApi.formatData(rData);
        }
        if (rData.switch) {
            Api.switchVoApi.formatData(rData.switch);
        }
        if (rData.dailytask) {
            Api.dailytaskVoApi.formatData(rData.dailytask);
        }
        if (rData.mymail) {
            Api.mailVoApi.formatData(rData.mymail);
        }
        if (rData.palace) {
            Api.palaceVoApi.formatData(rData);
        }
        if (rData.dinner) {
            Api.dinnerVoApi.formatData(rData.dinner);
        }
        if (rData.maildetail) {
            Api.mailVoApi.formatDetailData(rData.maildetail);
        }
        if (rData.achievement) {
            Api.achievementVoApi.formatData(rData.achievement);
        }
        if (rData.arrival) {
            Api.arrivalVoApi.formatData(rData.arrival);
        }
        if (rData.activity) {
            notDispatcher.activity = Api.acVoApi.formatData(rData.activity, cmd == NetRequestConst.REQUEST_USER_LOGIIN);
        }
        if (rData.acrank) {
            Api.acRankVoApi.formatData(rData.acrank);
        }
        if (rData.lamp) {
            Api.lampVoApi.formatData(rData.lamp);
        }
        if (rData.activecfg) {
            Config.AcCfg.formatAllCfg(rData.activecfg);
        }
        if (rData.gameinfo) {
            Api.gameinfoVoApi.formatData(rData.gameinfo);
        }
        if (rData.atkrace) {
            Api.atkraceVoApi.formatData(rData.atkrace);
        }
        if (rData.atkracecross) {
            Api.atkracecrossVoApi.formatData(rData.atkracecross);
        }
        if (rData.bookroom) {
            Api.bookroomVoApi.formatData(rData.bookroom);
        }
        if (rData.studyatk) {
            Api.studyatkVoApi.formatData(rData);
        }
        if (rData.dailyBossCfg) {
            Config.DailybossCfg.formatDataByServer(rData.dailyBossCfg);
        }
        if (rData.dailyboss) {
            Api.dailybossVoApi.formatData(rData.dailyboss);
        }
        if (rData.alliance) {
            Api.allianceVoApi.formatData(rData.alliance);
        }
        if (rData.myalliance) {
            Api.allianceVoApi.formatData2(rData.myalliance);
        }
        if (rData.alliancemember) {
            Api.allianceVoApi.formatData3(rData.alliancemember);
        }
        if (rData.conquest) {
            Api.conquestVoApi.formatData(rData.conquest);
        }
        if (rData.trade) {
            Api.tradeVoApi.formatData(rData.trade);
        }
        if (rData.rechargeCfg) {
            Config.RechargeCfg.formatData(rData.rechargeCfg);
        }
        if (rData.wifeskin) {
            Api.wifeSkinVoApi.formatData(rData.wifeskin);
        }
        if (rData.invite) {
            Api.inviteVoApi.formatData(rData.invite);
        }
        if (rData.prestige) {
            Api.prestigeVoApi.formatData(rData.prestige);
        }
        if (rData.chatblock) {
            Api.chatVoApi.formatData2(rData.chatblock);
        }
        if (rData.sharetext) {
            LanguageManager.setShareText(typeof (rData.sharetext) === "string" ? JSON.parse(rData.sharetext) : rData.sharetext);
        }
        if (rData.practice) {
            Api.practiceVoApi.formatData(rData.practice);
        }
        if (rData.pnum) {
            Api.practiceVoApi.showPracticeGet(rData.pnum);
        }
        if (rData.wifestatus) {
            Api.wifestatusVoApi.formatData(rData.wifestatus);
        }
        if (rData.emperorwar) {
            Api.emperorwarVoApi.formatData(rData.emperorwar);
        }
        if (rData.alliancetask) {
            Api.allianceTaskVoApi.formatData(rData.alliancetask);
        }
        //好友
        if (rData.friend) {
            Api.friendVoApi.formatData(rData.friend);
        }
        if (rData.eventlist) {
            Api.councilVoApi.formatEventData(rData.eventlist);
        }
        if (rData.council) {
            Api.councilVoApi.formatData(rData.council);
        }
        if (rData.amulet) {
            Api.amuletVoApi.formatData(rData.amulet);
        }
        if (rData.mergezidcfg) {
            Api.mergeServerVoApi.formatData(rData.mergezidcfg);
        }
        if (rData.alliancewar) {
            Api.allianceWarVoApi.initAllianceWarData(rData.alliancewar);
        }
        if (rData.myalliancewar) {
            Api.allianceWarVoApi.initMyAllianceWarData(rData.myalliancewar);
        }
        if (rData.composemap) {
            Api.composemapVoApi.formatData(rData.composemap);
        }
        if (rData.sinfo && rData.winfo) {
            Api.skinVoApi.formatData(rData);
        }
        if (rData.reback) {
            Api.playerReturnVoApi.formatData(rData.reback);
            if (rData.rebackrewards) {
                Api.playerReturnVoApi.setRebackRewards(rData.rebackrewards);
            }
        }
        if (rData.levy) {
            Api.levyVoApi.formatData(rData.levy);
        }
        //刷新征收红点状态
        if (rData.servant || cmd == "levy.selectsid" || rData.unlockPersonLv) {
            Api.levyVoApi.updateLevyRedState();
        }
        if (cmd == NetPushConst.PUSH_PAY) {
            if (rData && rData.payment && rData.payment.itemId) {
                if (PlatformManager.checkIsWxmgSp()) {
                    RSDKHelper.analyticsWXPay(rData.payment.itemId);
                }
            }
        }
        for (var model in rData) {
            if (notDispatcher[model] != null && notDispatcher[model] == false) {
            }
            else {
                if (model == "activecfg") {
                    App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE, MessageConst.MESSAGE_MODEL_ACTIVITY);
                    App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, MessageConst.MESSAGE_MODEL_ACTIVITY);
                }
                else if (cmd == "challenge.attack" && (model == "userinfo" || model == "challenge" || model == "rewards" || model == "battleReport")) {
                }
                else if (cmd == NetRequestConst.REQUEST_ATKRACE_CHOOSE || cmd == NetRequestConst.REQUEST_ATKRACE_FIGHT) { }
                else {
                    App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE, model);
                    App.MessageHelper.dispatchNetMessage(model, model);
                }
            }
        }
    };
    Api.dispose = function () {
        for (var key in Api) {
            if (Api[key] && (Api[key] instanceof BaseVoApi)) {
                Api[key].dispose();
            }
        }
    };
    Api.formatChatData = function (rData) {
        Api.chatVoApi.formatData(rData);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHAT_COME);
    };
    return Api;
}());
__reflect(Api.prototype, "Api");
