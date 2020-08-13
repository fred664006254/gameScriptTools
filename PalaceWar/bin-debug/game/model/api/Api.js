/**
 * Api管理类，统一通过这里调取Api,每次新增Api时，需要在init方法中new
 * author dmj
 * date 2017/9/16
 * @class PlayerVoApi
 */
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.init = function () {
        Api.playerVoApi = new PlayerVoApi();
        Api.itemVoApi = new ItemVoApi();
        Api.servantVoApi = new ServantVoApi();
        Api.wifeVoApi = new WifeVoApi();
        Api.childVoApi = new ChildVoApi();
        Api.adultVoApi = new AdultVoApi();
        Api.manageVoApi = new ManageVoApi();
        Api.challengeVoApi = new ChallengeVoApi();
        Api.rookieVoApi = new RookieVoApi();
        Api.viewqueueVoApi = new ViewqueueVoApi();
        Api.searchVoApi = new SearchVoApi();
        Api.mainTaskVoApi = new MainTaskVoApi();
        Api.chatVoApi = new ChatVoApi();
        Api.rankVoApi = new RankVoApi();
        Api.otherInfoVoApi = new OtherInfoVoApi();
        Api.unlocklist2VoApi = new Unlocklist2VoApi();
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
        Api.sadunVoApi = new SadunVoApi();
        Api.atkraceVoApi = new AtkraceVoApi();
        Api.atkracecrossVoApi = new AtkracecrossVoApi();
        Api.newatkracecrossVoApi = new NewAtkracecrossVoApi();
        Api.bookroomVoApi = new BookroomVoApi();
        Api.studyatkVoApi = new StudyatkVoApi();
        Api.allianceVoApi = new AllianceVoApi();
        Api.dailybossVoApi = new DailybossVoApi();
        Api.dailybossnewVoApi = new DailybossnewVoApi();
        Api.conquestVoApi = new ConquestVoApi();
        Api.tradeVoApi = new TradeVoApi();
        Api.wifeSkinVoApi = new WifeskinVoApi();
        Api.wifebanishVoApi = new WifebanishVoApi();
        Api.inviteVoApi = new InviteVoApi();
        Api.prestigeVoApi = new PrestigeVoApi();
        Api.practiceVoApi = new PracticeVoApi();
        Api.wifestatusVoApi = new WifestatusVoApi();
        Api.crossImacyVoApi = new CrossImacyVoApi();
        Api.emperorwarVoApi = new EmperorwarVoApi();
        Api.promoteVoApi = new PromoteVoApi();
        Api.crossPowerVoApi = new CrossPowerVoApi();
        Api.friendVoApi = new FriendVoApi();
        Api.allianceTaskVoApi = new AllianceTaskVoApi();
        Api.mergeServerVoApi = new MergeServerVoApi();
        Api.shareVoApi = new ShareVoApi();
        Api.realnameVoApi = new RealnameVoApi();
        Api.councilVoApi = new CouncilVoApi();
        Api.crossServerServantVoApi = new AcCrossServerServantVoApi();
        Api.skinVoApi = new SkinVoApi();
        Api.playerReturnVoApi = new PlayerReturnVoApi();
        Api.wipeBossVoApi = new WipeBossVoApi();
        Api.limitedGiftVoApi = new LimitedGiftVoApi();
        Api.strengthenVoApi = new StrengthenVoApi();
        Api.allianceWarVoApi = new AllianceWarVoApi();
        Api.countryWarVoApi = new CountryWarVoApi();
        Api.servantExileVoApi = new ServantExileVoApi();
        Api.allianceWeekVoApi = new AllianceWeekVoApi();
        Api.myAllianceWeekVoApi = new MyAllianceWeekVoApi();
        Api.sevenDaysSignupLoginVoApi = new SevenDaysSignupLoginVoApi();
        Api.encounterVoApi = new EncounterVoApi();
        Api.weaponVoApi = new WeaponVoApi();
        Api.servantWeaponVoApi = Api.weaponVoApi;
        Api.titleupgradeVoApi = new TitleupgradeVoApi();
        Api.examVoApi = new ExamVoApi();
        Api.emoticonVoApi = new EmoticonVoApi();
        Api.wifebattleVoApi = new WifebattleVoApi();
        Api.zhenqifangVoApi = new ZhenqifangVoApi();
        Api.laddertournamentVoApi = new LaddertournamentVoApi();
        Api.redpointVoApi = new RedpointVoApi();
        Api.emperorAchieveVoApi = new EmperorAchieveVoApi();
        Api.biographyVoApi = new BiographyVoApi();
        Api.newinviteVoApi = new NewInviteVoApi();
        Api.crossServerHegemonyVoApi = new CrossServerHegemonyVoApi();
        Api.newrebackVoApi = new NewRebackVoApi();
        Api.housekeeperVoApi = new HousekeeperVoApi();
        Api.sixsection1VoApi = new SixSection1VoApi();
        Api.acnewappointApi = new AcNewappointApi();
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
        if (rData["switch"]) {
            Api.switchVoApi.formatData(rData["switch"]);
        }
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
        if (rData.child) {
            // 子嗣系统
            Api.childVoApi.formatData(rData.child);
        }
        if (rData.adult) {
            // 媒婆系统
            Api.adultVoApi.formatData(rData.adult);
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
            Api.shopVoApi.formatData(rData.shop);
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
        if (rData.newatkracecross) {
            Api.newatkracecrossVoApi.formatData(rData.newatkracecross);
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
        if (rData.newboss) {
            Api.dailybossnewVoApi.formatData(rData.newboss);
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
        if (rData.extraRechargeCfg) {
            Config.ExtraRechargeCfg.formatData(rData.extraRechargeCfg);
        }
        if (rData.wifeskin) {
            Api.wifeSkinVoApi.formatData(rData.wifeskin);
        }
        if (rData.wifebanish) {
            Api.wifebanishVoApi.formatData(rData.wifebanish);
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
        if (rData.promote) {
            Api.promoteVoApi.formatData(rData.promote);
        }
        if (rData.promoteFlag) {
            Api.promoteVoApi._showNotice = true;
        }
        //好友
        if (rData.friend) {
            Api.friendVoApi.formatData(rData.friend);
        }
        if (rData.sadun) {
            Api.adultVoApi.init_sadun_data(rData);
        }
        if (rData.alliancetask) {
            Api.allianceTaskVoApi.formatData(rData.alliancetask);
        }
        if (rData.mergezidcfg) {
            Api.mergeServerVoApi.formatData(rData.mergezidcfg);
        }
        if (rData.council) {
            Api.councilVoApi.formatData(rData.council);
        }
        if (rData.eventlist) {
            Api.councilVoApi.formatEventData(rData.eventlist);
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
        if (rData.alliancewar) {
            Api.allianceWarVoApi.initAllianceWarData(rData.alliancewar);
        }
        if (rData.myalliancewar) {
            Api.allianceWarVoApi.initMyAllianceWarData(rData.myalliancewar);
        }
        if (rData.countrywar) {
            Api.countryWarVoApi.formatData(rData.countrywar);
        }
        if (rData.servantbanish) {
            Api.servantExileVoApi.formatData(rData.servantbanish);
        }
        if (rData.myallianceweek) {
            Api.myAllianceWeekVoApi.formatData(rData.myallianceweek);
        }
        if (rData.allianceweek) {
            Api.allianceWeekVoApi.formatData(rData.allianceweek);
        }
        if (rData.weekActiveTime) {
            Api.allianceWeekVoApi.formatDataWeekActiveTime(rData.weekActiveTime);
        }
        if (rData.sevendaysign) {
            Api.sevenDaysSignupLoginVoApi.formatData(rData.sevendaysign);
        }
        if (rData.encounter) {
            Api.encounterVoApi.formatData(rData.encounter);
        }
        if (rData.exam) {
            Api.examVoApi.formatData(rData.exam);
        }
        if (rData.emoticon) {
            Api.emoticonVoApi.formatData(rData.emoticon);
        }
        if (rData.weapon) {
            Api.weaponVoApi.formatData(rData.weapon);
        }
        if (rData.zhenqifang) {
            Api.zhenqifangVoApi.formatData(rData.zhenqifang);
        }
        if (rData.laddertournament) {
            Api.laddertournamentVoApi.formatData(rData.laddertournament);
        }
        if (rData.wifebattle) {
            // 红颜对战系统
            Api.wifebattleVoApi.formatData(rData.wifebattle);
        }
        if (rData.redpoint) {
            // 红颜对战系统
            Api.redpointVoApi.formatData(rData.redpoint);
        }
        if (rData.emperorachieve) {
            Api.emperorAchieveVoApi.formatData(rData.emperorachieve);
        }
        if (rData.outingArr) {
            Api.emperorAchieveVoApi.formatData(rData.outingArr);
        }
        if (rData.biography) {
            Api.biographyVoApi.formatData(rData.biography);
        }
        if (rData.newinvite) {
            Api.newinviteVoApi.formatData(rData.newinvite);
        }
        if (rData.newreback) {
            Api.newrebackVoApi.formatData(rData.newreback);
        }
        if (rData.initRedpoint) {
            Api.redpointVoApi.formatInitRedpoint(rData.initRedpoint);
        }
        if (rData.sixsection1) {
            Api.sixsection1VoApi.formatData(rData.sixsection1);
        }
        //统计
        if (rData.eventData) {
            for (var k in rData.eventData) {
                var key = rData.eventData[k];
                PlatformManager.analyticsByHyKey(key);
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
                //(model=="userinfo" || model=="activity" || model=="achievement" || model=="dailytask" || model=="prison"  || model=="challenge"  || model=="rewards"  || model=="battleReport")
                else if (cmd == "challenge.attack" && (model == "userinfo" || model == "challenge" || model == "rewards" || model == "battleReport")) {
                }
                else {
                    App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE, model);
                    App.MessageHelper.dispatchNetMessage(model, model);
                }
            }
        }
        if (cmd == NetRequestConst.REQUEST_USER_LOGIIN) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SCOKET_RECONNECT_LOGIN);
        }
    };
    /**奖励处理 */
    Api.formatRewardData = function (rewards) {
        Api.specialRewardList.length = 0;
        var rewardsVoList = GameData.formatRewardItem(rewards);
        for (var key in rewardsVoList) {
            var rewardVo = rewardsVoList[key];
            if (rewardVo.type == 8 || rewardVo.type == 10 || rewardVo.type == 11 || rewardVo.type == 16 || rewardVo.type == 19 || rewardVo.type == 20 || rewardVo.type == 23) {
                Api.specialRewardList.push({ id: String(rewardVo.id), type: String(rewardVo.type) });
            }
        }
    };
    /**
     * 打开特殊奖励板子
     */
    Api.openSpecialView = function () {
        var data = Api.specialRewardList[0];
        if (data) {
            Api.lastSpecialRewardType = data.type;
            Api.lastSpecialRewardId = data.id;
            var viewName = GameData.getViewNameForType(data);
            ViewController.getInstance().openView(viewName, data);
        }
    };
    /**校验特殊奖励--处理门客和红颜 */
    Api.verifySpecialReward = function (rewards, isServant) {
        if (!rewards) {
            return;
        }
        var tmpList = [];
        for (var i = 0; i < rewards.length; i++) {
            var id = String(rewards[i]);
            var type = null;
            ;
            var isPush = true;
            if (isServant) {
                type = "8";
            }
            else {
                type = "10";
            }
            for (var j = 0; j < Api.specialRewardList.length; j++) {
                var item = Api.specialRewardList[j];
                if (item.id == id && item.type == type) {
                    isPush = false;
                }
            }
            if (isPush) {
                tmpList.push({ id: id, type: type });
            }
        }
        for (var i = 0; i < tmpList.length; i++) {
            var tmpItem = tmpList[i];
            Api.specialRewardList.push({ id: tmpItem.id, type: tmpItem.type });
        }
    };
    /**校验特殊奖励--处理门客皮肤和红颜皮肤 */
    Api.verifySpecialSkinReward = function (rewards, isServant) {
        if (!rewards) {
            return;
        }
        var tmpList = [];
        for (var i = 0; i < rewards.length; i++) {
            var id = String(rewards[i]);
            var type = null;
            ;
            var isPush = true;
            if (isServant) {
                type = "19";
            }
            else {
                type = "16";
            }
            for (var j = 0; j < Api.specialRewardList.length; j++) {
                var item = Api.specialRewardList[j];
                if (item.id == id && item.type == type) {
                    isPush = false;
                }
            }
            if (isPush) {
                tmpList.push({ id: id, type: type });
            }
        }
        for (var i = 0; i < tmpList.length; i++) {
            var tmpItem = tmpList[i];
            Api.specialRewardList.push({ id: tmpItem.id, type: tmpItem.type });
        }
    };
    Api.dispose = function () {
        for (var key in Api) {
            if (key != "acnewappointApi" && Api[key] && (Api[key] instanceof BaseVoApi)) {
                Api[key].dispose();
            }
        }
        Api.specialRewardList = [];
        Api.lastSpecialRewardType = null;
        Api.lastSpecialRewardId = null;
    };
    Api.formatChatData = function (rData) {
        Api.chatVoApi.formatData(rData);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHAT_COME);
    };
    /**特殊奖励 集合 */
    Api.specialRewardList = [];
    /**存储上一个type */
    Api.lastSpecialRewardType = null;
    /**存储上一个Id */
    Api.lastSpecialRewardId = null;
    return Api;
}());
//# sourceMappingURL=Api.js.map