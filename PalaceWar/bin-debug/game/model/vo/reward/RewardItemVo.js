var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 奖励物品vo
 * author dmj
 * date 2017/9/26
 * @class RewardItemVo
 */
var RewardItemVo = /** @class */ (function (_super) {
    __extends(RewardItemVo, _super);
    function RewardItemVo() {
        var _this = _super.call(this) || this;
        /**
         * 后续纯前端用的type直接从1001开始，前后端约定好的才继续使用type+1规范，必须添加注释
         * 奖励物品类型：1 元宝  2 银两  3 粮食  4 士兵 5 政绩  6 道具  7 门客属性 8 门客  9亲密度 10红颜  11 称号  12红颜魅力 13 红颜经验值 14 门客书籍经验  15  门客技能经验
         * 				16 红颜皮肤 19 门客皮肤
         * 				20 场景 21 个人贡献  22 帮会经验 23神器 24表情
         * 				31 门客书籍等级 32 红颜亲密度 33 红颜魅力值 35列传本纪传记
         * 				41 阅历
         * 				103 红颜才艺值
         * 				1001 龙舟活动道具 1002 代金券 26 圣诞活动星星道具  1003 筛子 1004 幸运翻牌活动所需道具 30 修身经验 1005 劳动节活动水瓢
         * 				1006-投壶活动道具 1007母亲节活动 1008花魁活动道具 1009励精图治活动道具 1010 签到商店特权 1011 建造斗场砖块 1012 诸葛亮传道具
         * 				1013 粽叶飘香-粽子 1014 粽叶飘香-雄黄 1015 粽叶飘香-打糕 1016定军中原道具 1017 电玩大本营-月亮币 1018 电玩大本营-游戏币 1019 京城夜览-筛子
         * 				1020 绝地擂台-助威道具 1021 搜查魏府-搜查令道具 1022 蛮王积分 1023东郊狩猎道具 1024珍器坊经验 1025海外门客流放位置 1026红颜流放位置 1027投石破敌道具 1028国庆活动道具
         * 				1029 暗夜魅影道具 1030 天下至尊 军功 1031 德川时代 字体 1032年度狂欢抽奖券 1033携美同游好感度 1034 巾帼英雄军令 1035 周年庆字体 1036 二周年祈愿鞭炮道具
         * 				1037 周年庆典1-普通筛子 1038 周年庆典1-如意筛子 1039 元宵节活动 1040 三国红颜活动 1041 酒神诗仙 1042万物复苏 1043三国争霸神将经验 1044三国争霸密信 1045三国争霸粮草 1046三国争霸军资 1047三国争霸神将exp  1048群雄逐鹿 帮会财富  1049群雄逐鹿 战旗
         * 				1050 兔宝巧克力 1051 平定匈奴士气 1052 清风纸鸢 1053 开服庆典 1054 跨服权势 1055 神器迷宫 1056 粽夏连连看 1057 骑士选拔 1057 青莲茶香
         * 				1059 定军中原道具嘉奖令 1060 玉莲 1061木棰 1062音符1 1063音符2 1064音符3 1065 新服预约积分 1066风云擂台
         *
         */
        _this.type = 0;
        /**
         * 物品id
         */
        _this.id = 0;
        /**
         * 数量
         */
        _this.num = 0;
        _this._name = "";
        _this._tipName = "";
        _this._desc = "";
        _this._icon = "";
        _this._iconbg = "";
        // 品质
        _this._quality = 1;
        _this._code = "";
        _this._dropId = "";
        _this.target = 0;
        _this.targetId = 0;
        _this.getRewards = null;
        //奖励数组中原始排序，用于礼包领取
        _this.originalIdx = 0;
        return _this;
    }
    RewardItemVo.prototype.initData = function (data) {
        var itemArr = data.split("_");
        this.type = Number(itemArr[0]);
        this.id = Number(itemArr[1]);
        this.num = Number(itemArr[2]);
        this._code = (itemArr[3]);
        var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
        if (itemCfg && itemCfg.dropId) {
            this._dropId = itemCfg.dropId;
        }
        if (this.type == 6) {
            var cfg = Config.ItemCfg.getItemCfgById(this.id);
            this.target = cfg.target;
            this.targetId = cfg.targetId;
            this.getRewards = cfg.getRewards;
        }
        this._tipName = "";
        var code = this._code;
        if (this.type == 1) {
            this._name = LanguageManager.getlocal("gemName");
            this._icon = "itemicon1";
        }
        else if (this.type == 2) {
            this._name = LanguageManager.getlocal("playerview_gold").replace(":  ", "");
            this._icon = "itemicon2";
        }
        else if (this.type == 3) {
            this._name = LanguageManager.getlocal("playerview_food").replace(":  ", "");
            this._icon = "itemicon3";
        }
        else if (this.type == 4) {
            this._name = LanguageManager.getlocal("playerview_soldier").replace(":  ", "");
            this._icon = "itemicon4";
        }
        else if (this.type == 5) {
            this._name = LanguageManager.getlocal("playerview_exp").replace(":  ", "");
            this._icon = "itemicon5";
        }
        else if (this.type == 6) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
        }
        else if (this.type == 7) {
            if (this.id == 1) {
                this._name = LanguageManager.getlocal("playerview_forceAtt").replace(":  ", "");
            }
            else if (this.id == 2) {
                this._name = LanguageManager.getlocal("playerview_inteAtt").replace(":  ", "");
            }
            else if (this.id == 3) {
                this._name = LanguageManager.getlocal("playerview_policyAtt").replace(":  ", "");
            }
            else if (this.id == 4) {
                this._name = LanguageManager.getlocal("playerview_charmAtt").replace(":  ", "");
            }
            this._tipName = this._name;
        }
        else if (this.type == 8) {
            this._icon = "servant_half_" + this.id;
            this._name = LanguageManager.getlocal("servant_name" + this.id);
        }
        else if (this.type == 9) {
            this._name = LanguageManager.getlocal("wifeIntimacy").replace(" :", "");
            this._tipName = this._name;
        }
        else if (this.type == 10) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
                this._name = wifeCfg.name;
            }
        }
        else if (this.type == 11) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
            itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
        }
        else if (this.type == 12) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            this._name = LanguageManager.getlocal("wifeCharm").replace(" :", "");
            this._tipName = this._name;
            if (wifeCfg) {
                this._icon = wifeCfg.icon;
            }
        }
        else if (this.type == 13) {
            this._name = LanguageManager.getlocal("wifeExp").replace(" :", "");
            this._tipName = this._name;
        }
        else if (this.type == 14) {
            if (this.id > 10) {
                var itemCfg_1 = Config.ServantCfg.getServantItemById(this.id.toString());
                this._icon = itemCfg_1.halfIcon;
            }
            else {
                this._icon = "itemicon14";
            }
            this._name = LanguageManager.getlocal("itemName_" + this.type);
        }
        else if (this.type == 15) {
            if (this.id > 10) {
                var itemCfg_2 = Config.ServantCfg.getServantItemById(this.id.toString());
                this._icon = itemCfg_2.halfIcon;
            }
            else {
                this._icon = "itemicon15";
            }
            this._name = LanguageManager.getlocal("itemName_" + this.type);
        }
        else if (this.type == 16) {
            var itemCfg_3 = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
            this._icon = itemCfg_3.icon;
            this._name = itemCfg_3.name;
        }
        else if (this.type == 17) {
            this._icon = "itemicon17";
            this._name = LanguageManager.getlocal("itemName_17");
        }
        else if (this.type == 18) {
            this._icon = "itemicon17";
            this._name = LanguageManager.getlocal("itemName_18");
        }
        else if (this.type == 19) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.id);
            this._icon = skincfg.icon;
            this._name = skincfg.getSkinName();
        }
        else if (this.type == 1001) {
            var itemCfg_4 = Config.ServantskinCfg.getSkinIdByBid(this.id.toString());
            this._icon = "dragonboatitem" + this._code;
            this._name = LanguageManager.getlocal("DragonBoatZongziItem_" + this._code);
        }
        else if (this.type == 21) {
            this._icon = "itemicon21";
            this._name = LanguageManager.getlocal("itemName_21");
        }
        else if (this.type == 22) {
            this._icon = "itemicon22";
            this._name = LanguageManager.getlocal("itemName_22");
        }
        else if (this.type == 31) {
            this._icon = "itemicon1101";
            this._name = LanguageManager.getlocal("itemName_6");
        }
        else if (this.type == 1002) {
            //代金券
            this._icon = this.id == 0 ? "" : "acsingleday_coupon_itemIcon";
            this._name = LanguageManager.getlocal("AcSingleDayCouponViewTitle");
        }
        else if (this.type == 26) {
            this._icon = "acchristmasview_itemiconstar";
            this._name = LanguageManager.getlocal("acChristmasItemName");
            if (this._code != "1" && this._code != "2") {
                this._icon = "acchristmasview_itemiconstar_" + this._code;
                this._name = LanguageManager.getlocal("acChristmasItemName_" + this._code);
            }
        }
        else if (this.type == 20) {
            this._icon = "changebg_icon_" + this.id;
            this._name = LanguageManager.getlocal("changebg_name_" + this.id);
        }
        else if (this.type == 35) {
            this._icon = "biography_icon" + this.id;
            this._name = LanguageManager.getlocal("biography_name" + this.id);
        }
        else if (this.type == 1003) {
            this._icon = "treasureboxicon-" + this._code;
            this._name = LanguageManager.getlocal("acTreasureItem-" + this._code);
        }
        else if (this.type == 1004) {
            this._icon = "luckdrawluckyicon1-" + this._code;
            this._name = LanguageManager.getlocal("acLuckyDrawIcon-" + this._code);
        }
        else if (this.type == 1005) {
            this._icon = "labordayicon-" + this._code;
            this._name = LanguageManager.getlocal("acLaborDayIcon-" + this._code);
        }
        else if (this.type == 1006) {
            this._icon = "acthrowarrowview_icon-" + this._code;
            this._name = LanguageManager.getlocal("acThrowArrowViewIconName-" + this._code);
        }
        else if (this.type == 1007) {
            this._icon = "motherdayicon1-" + this._code;
            this._name = LanguageManager.getlocal("motherdayicon-" + this._code);
        }
        else if (this.type == 1008) {
            this._icon = "acbeautyvoteview_acitem-" + this._code;
            this._name = LanguageManager.getlocal("acBeautyVoteView_itemName-" + this._code);
        }
        else if (this.type == 1009) {
            this._icon = App.CommonUtil.getResByCode("battlepassicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassiconname", code));
        }
        else if (this.type == 1010) {
            this._name = LanguageManager.getlocal("itemName_" + this.id);
            this._icon = "itemicon" + this.id;
        }
        else if (this.type == 1011) {
            this._name = LanguageManager.getlocal("acArenaIcon-" + this._code);
            this._icon = "arenaIcon-" + this._code;
        }
        else if (this.type == 1012) {
            this._icon = "acliangbiographyview_item-" + this._code;
            this._name = LanguageManager.getlocal("acLiangBiographyView_itemName-" + this._code);
        }
        else if (this.type == 1013) {
            this._name = LanguageManager.getlocal("acDuanWuIcon1-" + this._code);
            this._icon = "duanwuicon1-" + this._code;
        }
        else if (this.type == 1014) {
            this._name = LanguageManager.getlocal("acDuanWuIcon2-" + this._code);
            this._icon = "duanwuicon2-" + this._code;
        }
        else if (this.type == 1015) {
            this._name = LanguageManager.getlocal("acDuanWuIcon3-" + this._code);
            this._icon = "duanwuicon3-" + this._code;
        }
        else if (this.type == 1016) {
            this._icon = "mainlangdicon-" + this._code;
            this._name = LanguageManager.getlocal("acmainlangdicon-" + this._code);
        }
        else if (this.type == 1017) {
            this._icon = "acarcadeview_item_mooncoin-" + this._code;
            this._name = LanguageManager.getlocal("acArcadeView_itemName_MoonCoin-" + this._code);
        }
        else if (this.type == 1018) {
            this._icon = "acarcadeview_item_gamecoin-" + this._code;
            this._name = LanguageManager.getlocal("acArcadeView_itemName_GameCoin-" + this._code);
        }
        else if (this.type == 1019) {
            this._icon = "treasureboxicon-1";
            this._name = LanguageManager.getlocal("acEnjoyNightItem-" + this._code);
        }
        else if (this.type == 1020) {
            this._icon = "battlegroundcheeritem-" + this._code;
            this._name = LanguageManager.getlocal("battlegroundcheeritem_name-" + this._code);
        }
        else if (this.type == 1021) {
            this._icon = "acsearchproofview_item_searchtoken-" + this._code;
            this._name = LanguageManager.getlocal("acSearchProofView_itemName_SearchToken-" + this._code);
        }
        else if (this.type == 1022) {
            this._icon = "dailybossnew_score_icon";
            this._name = LanguageManager.getlocal("dailybossnewScore");
        }
        else if (this.type == 1024) {
            this._icon = "zqfbuildexp";
            this._name = LanguageManager.getlocal("zhenqifangexp");
        }
        else if (this.type == 30) {
            this._icon = "itemicon30";
            this._name = LanguageManager.getlocal("itemName_30");
        }
        else if (this.type == 1023) {
            this._icon = "achuntingview_arrow_icon_" + this._code;
            this._name = LanguageManager.getlocal("achuntingArrowIcon_name-" + this._code);
        }
        else if (this.type == 1025) {
            this._icon = "servantboaticon";
            this._name = LanguageManager.getlocal("servantExileSeatTip");
        }
        else if (this.type == 1026) {
            this._icon = Api.switchVoApi.checkIsInBlueWife() ? "wifecaricon_blueType" : "wifecaricon";
            this._name = LanguageManager.getlocal("wifeExileSeatTip");
        }
        else if (this.type == 24) {
            this._icon = "emoticonicon_" + this.id;
            this._name = LanguageManager.getlocal("emoticonName_" + this.id);
        }
        else if (this.type == 1027) {
            if (this._code == "2") {
                code = "1";
            }
            this._icon = "acthrowstone_item_icon-" + code;
            this._name = LanguageManager.getlocal("acthrowstoneStoneName-" + code);
        }
        else if (this.type == 1028) {
            if (this._code == "2") {
                code = "1";
            }
            this._icon = "destroyitemicon1-" + code;
            this._name = LanguageManager.getlocal("acNationalDayTokenName-" + code);
        }
        else if (this.type == 1029) {
            this._icon = "destroyitemicon1-" + code;
            this._name = LanguageManager.getlocal("AcDestroySameItemIcon-" + code);
        }
        else if (this.type == 1030) {
            this._icon = "ladder_merit_icon";
            this._name = LanguageManager.getlocal("acLadder_merit");
        }
        else if (this.type == 1031) {
            this._icon = "dechuantype" + this.id + "-1";
            this._name = LanguageManager.getlocal("acDechuanshidaifont" + this.id + "-1");
        }
        else if (this.type == 1032) {
            this._icon = "newsingledayitemicon1-" + code;
            this._name = LanguageManager.getlocal("acSingleDay2019icon-" + code);
        }
        else if (this.type == 1033) {
            this._icon = "actravelwithbeauty_itemicon-" + code;
            this._name = LanguageManager.getlocal("acTravelwithbeautyFavorName-" + code);
        }
        else if (this.type == 1034) {
            this._icon = "acheroine_itemicon-" + code;
            this._name = LanguageManager.getlocal("acHeroineTokenName-" + code);
        }
        else if (this.type == 1035) {
            this._icon = "annualprayfont" + this.id + "-1";
            this._name = LanguageManager.getlocal("acAnnualPrayFont" + this.id + "-1");
        }
        else if (this.type == 1036) {
            this._icon = "annualpraycrackitemicon-" + code;
            this._name = LanguageManager.getlocal("acAnnualPrayItemname-" + code);
        }
        else if (this.type == 1037) {
            this._icon = "treasureboxicon-1";
            this._name = LanguageManager.getlocal("acAC2020_throw");
        }
        else if (this.type == 1038) {
            this._icon = "acannualcelebration_aidice3";
            this._name = LanguageManager.getlocal("acAC2020_ai_throw");
        }
        else if (this.type == 1039) {
            this._icon = "lanternicon-" + code;
            this._name = LanguageManager.getlocal("aclanternicon-" + code);
        }
        else if (this.type == 1040) {
            this._icon = "acthreekingofwife_itemicon-" + code;
            this._name = LanguageManager.getlocal("acThreekingdomsOfWife_toolItemName-" + code);
        }
        else if (this.type == 1041) {
            this._icon = "ac_skinoflibai_itemicon-" + code;
            this._name = LanguageManager.getlocal("acSkinoflibaiToolItemName-" + code);
        }
        else if (this.type == 1042) {
            this._icon = "acrecovery_itemicon-" + code;
            this._name = LanguageManager.getlocal("acRecoveryToolItemName-" + code);
        }
        else if (this.type == 1043) {
            this._icon = App.CommonUtil.getResByCode("threekingdomsheroexpicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroexpicon", code));
        }
        else if (this.type == 1044) {
            this._icon = App.CommonUtil.getResByCode("threekingdomschangeteamicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomschangeteamicon", code));
        }
        else if (this.type == 1045) {
            this._icon = App.CommonUtil.getResByCode("threekingdomswaricon1", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomswaricon1", code));
        }
        else if (this.type == 1046) {
            this._icon = App.CommonUtil.getResByCode("threekingdomswaricon2", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomswaricon2", code));
        }
        else if (this.type == 1047) {
            this._icon = App.CommonUtil.getResByCode("threekingdomsheroexpicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("threekingdomsheroexpicon", code));
        }
        else if (this.type == 1048) {
            this._icon = App.CommonUtil.getResByCode("accshegemony_allreward", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerHegemonyAllianceReward", code));
        }
        else if (this.type == 1049) {
            this._icon = App.CommonUtil.getResByCode("accshegemony_reward_item_icon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerHegemonyTokenReward", code));
        }
        else if (this.type == 1050) {
            this._icon = App.CommonUtil.getResByCode("rabitcomingicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingicon", code));
        }
        else if (this.type == 1051) {
            this._icon = App.CommonUtil.getResByCode("beatxiongnuicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acbeatxiongnuicon", code));
        }
        else if (this.type == 1052) {
            this._icon = App.CommonUtil.getResByCode("ackite_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKite_toolItemName", code));
        }
        else if (this.type == 1053) {
            this._icon = App.CommonUtil.getResByCode("acnewopen_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewOpen_specialitem", code));
        }
        else if (this.type == 1054) {
            this._icon = App.CommonUtil.getResByCode("accrosspower_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("accrosspower_specialitem", code));
        }
        else if (this.type == 1055) {
            this._icon = App.CommonUtil.getResByCode("acweaponmaze_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeSpecialItemName", code));
        }
        else if (this.type == 1056) {
            this._icon = App.CommonUtil.getResByCode("acfindsame_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFindSameItemName", code));
        }
        else if (this.type == 1057) {
            this._icon = App.CommonUtil.getResByCode("acknight_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKnightItemName", code));
        }
        else if (this.type == 1058) {
            this._icon = App.CommonUtil.getResByCode("acdrinktea_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acDrinkTeaItemName", code));
        }
        else if (this.type == 1059) {
            this._icon = App.CommonUtil.getResByCode("mainlangdiconjjl", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acmainlangdiconjjl", code));
        }
        else if (this.type == 1060) {
            this._icon = App.CommonUtil.getResByCode("accrossintimacy_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("accrossImacy_specialitem", code));
        }
        else if (this.type == 1061) {
            this._icon = App.CommonUtil.getResByCode("acskysound_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_specialitem", code));
        }
        else if (this.type == 1062) {
            this._icon = App.CommonUtil.getResByCode("acskysound_yf1", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf1name", code));
        }
        else if (this.type == 1063) {
            this._icon = App.CommonUtil.getResByCode("acskysound_yf2", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf2name", code));
        }
        else if (this.type == 1064) {
            this._icon = App.CommonUtil.getResByCode("acskysound_yf3", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf3name", code));
        }
        else if (this.type == 1065) {
            this._icon = App.CommonUtil.getResByCode("acnewappoint_scoreitemicon", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewppointScoreItemName", code));
        }
        else if (this.type == 1066) {
            this._icon = App.CommonUtil.getResByCode("accrossatkrace_specialitem", code);
            this._name = LanguageManager.getlocal(App.CommonUtil.getCnByCode("accrossAtkrace_specialitem", code));
        }
        else if (this.type == 103) {
            this._name = LanguageManager.getlocal("wifeArt").replace(" :", "");
            this._tipName = this._name;
        }
        this._quality = (itemCfg ? itemCfg.quality : 1);
        this._iconbg = "itembg_" + this._quality;
        if (this.type == 8 || this.type == 1) {
            this._iconbg = "itembg_" + 7;
            if (this.type == 8) {
                this._quality = 7;
            }
        }
        if (this.type == 35) {
            this._iconbg = "itembg_" + 7;
        }
        if (this.type == 14 || this.type == 15) {
            this._iconbg = "itembg_" + 1;
        }
        if (this.type == 1002) {
            // this._quality = this.id;
            var iconbg = '';
            switch (this.id) {
                case 1:
                case 2:
                case 3:
                case 4:
                    iconbg = 'itembg_4';
                    break;
                case 5:
                case 6:
                    iconbg = 'itembg_5';
                    break;
                case 7:
                case 8:
                    iconbg = 'itembg_6';
                    break;
                default:
                    iconbg = 'itembg_1';
                    break;
            }
            this._iconbg = iconbg;
        }
        var arr2 = [1014];
        var arr3 = [1015];
        if (arr2.indexOf(this.type) > -1) {
            this._iconbg = "itembg_4";
        }
        else if (arr3.indexOf(this.type) > -1) {
            this._iconbg = "itembg_3";
        }
        else if (this.type > 1000 && this.type != 1002) {
            this._iconbg = "itembg_7";
        }
        if (this.type == 30) {
            this._iconbg = "itembg_7";
        }
        else if (this.type == 20) {
            this._iconbg = "itembg_8";
        }
    };
    Object.defineProperty(RewardItemVo.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "nameColor", {
        /**根据品质取颜色 */
        get: function () {
            var color = GameConfig.getQualityColor(this._quality);
            return color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "iconBg", {
        get: function () {
            return this._iconbg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "message", {
        get: function () {
            return this.name + (this.num < 0 ? this.num : "+" + this.num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "tipMessage", {
        get: function () {
            return this._tipName + (this.num < 0 ? String(this.num) : "+" + this.num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "desc", {
        get: function () {
            var desc = "";
            var code = this._code;
            if (this.type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 8) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 10) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
                desc = wifeCfg.name + "*1";
            }
            else if (this.type == 11) {
                var itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
                if (itemCfg) {
                    desc = itemCfg.desc;
                }
            }
            else if (this.type == 12) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
                desc = LanguageManager.getlocal("itemDesc_12", [wifeCfg.name]);
            }
            else if (this.type == 14) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                desc = LanguageManager.getlocal("itemDesc_14", [itemCfg.name]);
            }
            else if (this.type == 15) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                desc = LanguageManager.getlocal("itemDesc_15", [itemCfg.name]);
            }
            else if (this.type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
                desc = itemCfg.desc2;
            }
            else if (this.type == 19) {
                desc = LanguageManager.getlocal("itemDropDesc_" + this.id);
            }
            else if (this.type == 1001) {
                desc = LanguageManager.getlocal("DragonBoatZongziItemDesc_" + this._code);
            }
            else if (this.type == 26) {
                desc = LanguageManager.getlocal("itemDesc_" + this.type);
                if (this._code != "1" && this._code != "2") {
                    desc = LanguageManager.getlocal("itemDesc_" + this.type + "_" + this._code);
                }
            }
            else if (this.type == 20) {
                desc = LanguageManager.getlocal("itemDesc_" + this.type + "_" + this.id);
            }
            else if (this.type == 35) {
                desc = LanguageManager.getlocal("biography_desc" + this.id);
            }
            else if (this.type == 1002) {
                desc = LanguageManager.getlocal("singledaydesc-1", [this._code]);
            }
            else if (this.type == 1003) {
                desc = LanguageManager.getlocal("acTreasureItemDesc-" + this._code);
            }
            else if (this.type == 1004) {
                desc = LanguageManager.getlocal("acLuckyDrawItemDesc-" + this._code);
            }
            else if (this.type == 1005) {
                desc = LanguageManager.getlocal("acLaborIconDesc-" + this._code);
            }
            else if (this.type == 1006) {
                desc = LanguageManager.getlocal("acThrowArrowItemDesc-" + this._code);
            }
            else if (this.type == 1007) {
                desc = LanguageManager.getlocal("motherdayItemDesc-" + this._code);
            }
            else if (this.type == 1008) {
                desc = LanguageManager.getlocal("acBeautyVoteView_itemDesc-" + this._code);
            }
            else if (this.type == 1009) {
                desc = LanguageManager.getlocal("acBattlePassicondesc-" + this._code);
            }
            else if (this.type == 1010) {
                desc = LanguageManager.getlocal("itemDesc_5025");
            }
            else if (this.type == 1011) {
                desc = LanguageManager.getlocal("acarenaIconDesc-" + this._code);
            }
            else if (this.type == 1012) {
                desc = LanguageManager.getlocal("acLiangBiographyView_itemDesc-" + this._code);
            }
            else if (this.type == 1013) {
                desc = LanguageManager.getlocal("acDuanWuIconDesc1-" + this._code);
            }
            else if (this.type == 1014) {
                desc = LanguageManager.getlocal("acDuanWuIconDesc2-" + this._code);
            }
            else if (this.type == 1015) {
                desc = LanguageManager.getlocal("acDuanWuIconDesc3-" + this._code);
            }
            else if (this.type == 1016) {
                desc = LanguageManager.getlocal("acmainlandiconDesc-" + this._code);
            }
            else if (this.type == 1017) {
                desc = LanguageManager.getlocal("acArcadeView_Desc_MoonCoin-" + this._code);
            }
            else if (this.type == 1018) {
                desc = LanguageManager.getlocal("acArcadeView_Desc_GameCoin-" + this._code);
            }
            else if (this.type == 1019) {
                desc = LanguageManager.getlocal("acEnjoyNightItemDesc-" + this._code);
            }
            else if (this.type == 1020) {
                desc = LanguageManager.getlocal("acbattlegroundcheerdesc-" + this._code);
            }
            else if (this.type == 1021) {
                desc = LanguageManager.getlocal("acSearchProofView_Desc_SearchToken-" + this._code);
            }
            else if (this.type == 1022) {
                desc = LanguageManager.getlocal("dailybossnewScoreDesc");
            }
            else if (this.type == 1023) {
                desc = LanguageManager.getlocal("acHuntingArrowDesc-" + this._code);
            }
            else if (this.type == 1025) {
                desc = LanguageManager.getlocal("servantExileSeatDesc");
            }
            else if (this.type == 1026) {
                desc = LanguageManager.getlocal("wifeExileSeatDesc");
            }
            else if (this.type == 1027) {
                if (this._code == "2") {
                    code = "1";
                }
                desc = LanguageManager.getlocal("acthrowstoneStoneDesc-" + code);
            }
            else if (this.type == 1024) {
                desc = LanguageManager.getlocal("zhenqifangexpDesc");
            }
            else if (this.type == 1028) {
                if (this._code == "2") {
                    code = "1";
                }
                desc = LanguageManager.getlocal("acNationalDayTokenDesc-" + code);
            }
            else if (this.type == 1029) {
                desc = LanguageManager.getlocal("AcDestroySameItemIconDesc-" + this._code);
            }
            else if (this.type == 1030) {
                desc = LanguageManager.getlocal("acLadder_merit_desc");
            }
            else if (this.type == 1031) {
                desc = LanguageManager.getlocal("acDechuanshidaifontDesc-1");
            }
            else if (this.type == 1032) {
                desc = LanguageManager.getlocal("acSingleDay2019iconDesc-" + code);
            }
            else if (this.type == 1033) {
                desc = LanguageManager.getlocal("acTravelwithbeautyFavorDesc-" + code);
            }
            else if (this.type == 1034) {
                desc = LanguageManager.getlocal("acHeroineTokenDesc-" + code);
            }
            else if (this.type == 1035) {
                desc = LanguageManager.getlocal("acAnnualPrayfontDesc" + (Number(this.id) + 2) + "-1");
            }
            else if (this.type == 1036) {
                desc = LanguageManager.getlocal("acAnnualPrayfontDesc2-" + code);
            }
            else if (this.type == 1037) {
                desc = LanguageManager.getlocal("acAC2020_throw_desc");
            }
            else if (this.type == 1038) {
                desc = LanguageManager.getlocal("acAC2020_ai_throw_desc");
            }
            else if (this.type == 1039) {
                desc = LanguageManager.getlocal("aclanterniconDesc-" + this._code);
            }
            else if (this.type == 1040) {
                desc = LanguageManager.getlocal("acThreekingdomsOfWife_toolItemDesc-" + this._code);
            }
            else if (this.type == 1041) {
                desc = LanguageManager.getlocal("acSkinoflibaiToolItemDesc-" + this._code);
            }
            else if (this.type == 1042) {
                desc = LanguageManager.getlocal("acRecoveryToolItemDesc-" + this._code);
            }
            else if (this.type == 1043) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroexpicondesc", code));
            }
            else if (this.type == 1044) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomschangeteamicondesc", code));
            }
            else if (this.type == 1045) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomswaricon1desc", code));
            }
            else if (this.type == 1046) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomswaricon2desc", code));
            }
            else if (this.type == 1047) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("threekingdomsheroexpicondesc", code));
            }
            else if (this.type == 1048) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerHegemonyAllianceRewardDesc", code));
            }
            else if (this.type == 1049) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerHegemonyTokenRewardDesc", code));
            }
            else if (this.type == 1050) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingiconDesc", code));
            }
            else if (this.type == 1051) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acbeatxiongnuDesc", code));
            }
            else if (this.type == 1052) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKite_toolItemDesc", code));
            }
            else if (this.type == 1053) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewOpen_specialitemDesc", code));
            }
            else if (this.type == 1054) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrosspower_specialitemDesc", code));
            }
            else if (this.type == 1055) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeSpecialItemDesc", code));
            }
            else if (this.type == 1056) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFindSameSpecialItemDesc", code));
            }
            else if (this.type == 1057) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKnightSpecialItemDesc", code));
            }
            else if (this.type == 1058) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acDrinkTeaSpecialItemDesc", code));
            }
            else if (this.type == 1059) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acmainlandiconjjlDesc", code));
            }
            else if (this.type == 1060) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossImacy_specialitemDesc", code));
            }
            else if (this.type == 1061) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_specialitemdesc", code));
            }
            else if (this.type == 1062) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf1desc", code));
            }
            else if (this.type == 1063) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf2desc", code));
            }
            else if (this.type == 1064) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf3desc", code));
            }
            else if (this.type == 1065) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointScoreItemDesc", code));
            }
            else if (this.type == 1066) {
                desc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkrace_specialitemDesc", code));
            }
            else {
                desc = LanguageManager.getlocal("itemDesc_" + this.type);
            }
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "dropDesc", {
        get: function () {
            var dropDesc = "";
            var code = this._code;
            if (this.type == 6) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.id);
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 8) {
                var itemCfg = Config.ServantCfg.getServantItemById(this.id.toString());
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 10) {
                dropDesc = LanguageManager.getlocal("wifeDropDesc_" + this.id);
            }
            else if (this.type == 11) {
                var itemCfg = Config.TitleCfg.getTitleCfgById(this.id);
                if (itemCfg) {
                    dropDesc = itemCfg.dropDesc;
                }
            }
            else if (this.type == 16) {
                var itemCfg = Config.WifeskinCfg.getWifeCfgById(this.id.toString());
                dropDesc = itemCfg.dropDesc;
            }
            else if (this.type == 1001) {
                dropDesc = LanguageManager.getlocal("DragonBoatZongziDropDesc_" + this._code);
            }
            else if (this.type == 19) {
                dropDesc = LanguageManager.getlocal("itemDropDesc_skin_" + this.id);
            }
            else if (this.type == 26) {
                dropDesc = LanguageManager.getlocal("itemDropDesc_" + this.type);
                if (this._code != "1" && this._code != "2") {
                    dropDesc = LanguageManager.getlocal("itemDropDesc_" + this.type + "_" + this._code);
                }
            }
            else if (this.type == 20) {
                dropDesc = LanguageManager.getlocal("changebgUnlockDesc_" + this.id);
            }
            else if (this.type == 35) {
                dropDesc = LanguageManager.getlocal("biography_DropDesc" + this.id);
            }
            else if (this.type == 1002) {
                dropDesc = LanguageManager.getlocal("singledaydrop");
            }
            else if (this.type == 1003) {
                dropDesc = LanguageManager.getlocal("acTreasureItemDropDesc-" + this._code);
            }
            else if (this.type == 1004) {
                dropDesc = LanguageManager.getlocal("acLuckyDrawItemDropDesc-" + this._code);
            }
            else if (this.type == 1005) {
                dropDesc = LanguageManager.getlocal("acLaborIconDropDesc-" + this._code);
            }
            else if (this.type == 1006) {
                dropDesc = LanguageManager.getlocal("acThrowArrowDropDesc-" + this._code);
            }
            else if (this.type == 1007) {
                dropDesc = LanguageManager.getlocal("motherdayItemDropDesc-" + this._code);
            }
            else if (this.type == 1008) {
                dropDesc = LanguageManager.getlocal("acBeautyVoteView_itemDropDesc-" + this._code);
            }
            else if (this.type == 1009) {
                dropDesc = LanguageManager.getlocal("acBattlePassicondropdesc-" + this._code);
            }
            else if (this.type == 1010) {
                dropDesc = LanguageManager.getlocal("itemDropDesc_5025");
            }
            else if (this.type == 1011) {
                dropDesc = LanguageManager.getlocal("acArenaIconDropDesc-" + this._code);
            }
            else if (this.type == 1012) {
                dropDesc = LanguageManager.getlocal("acLiangBiographyView_itemDropDesc-" + this._code);
            }
            else if (this.type == 1013) {
                dropDesc = LanguageManager.getlocal("acDuanWuIconDropDesc1-" + this._code);
            }
            else if (this.type == 1014) {
                dropDesc = LanguageManager.getlocal("acDuanWuIconDropDesc2-" + this._code);
            }
            else if (this.type == 1015) {
                dropDesc = LanguageManager.getlocal("acDuanWuIconDropDesc3-" + this._code);
            }
            else if (this.type == 1016) {
                dropDesc = LanguageManager.getlocal("acmainlandiconDropDesc-" + this._code);
            }
            else if (this.type == 1017) {
                dropDesc = LanguageManager.getlocal("acArcadeView_DropDesc_MoonCoin-" + this._code);
            }
            else if (this.type == 1018) {
                dropDesc = LanguageManager.getlocal("acArcadeView_DropDesc_GameCoin-" + this._code);
            }
            else if (this.type == 1019) {
                dropDesc = LanguageManager.getlocal("acEnjoyNightItemDropDesc-" + this._code);
            }
            else if (this.type == 1020) {
                dropDesc = LanguageManager.getlocal("acbattlegroundcheerDropDesc-" + this._code);
            }
            else if (this.type == 1021) {
                dropDesc = LanguageManager.getlocal("acSearchProofView_DropDesc_SearchToken-" + this._code);
            }
            else if (this.type == 1022) {
                dropDesc = LanguageManager.getlocal("dailybossnewScoreDropDesc");
            }
            else if (this.type == 1023) {
                dropDesc = LanguageManager.getlocal("acHuntingArrowDropDesc-" + this._code);
            }
            else if (this.type == 1025) {
                dropDesc = LanguageManager.getlocal("servantExileSeatDropDesc");
            }
            else if (this.type == 1026) {
                dropDesc = LanguageManager.getlocal("wifeExileSeatDropDesc");
            }
            else if (this.type == 1027) {
                if (this._code == "2") {
                    code = "1";
                }
                dropDesc = LanguageManager.getlocal("acthrowstoneStoneDropDesc-" + code);
            }
            else if (this.type == 1024) {
                dropDesc = LanguageManager.getlocal("zhenqifangexpDropDesc");
            }
            else if (this.type == 1028) {
                if (this._code == "2") {
                    code = "1";
                }
                dropDesc = LanguageManager.getlocal("acNationalDayTokenDropDesc-" + code);
            }
            else if (this.type == 1029) {
                dropDesc = LanguageManager.getlocal("AcDestroySameItemIconDropDesc-" + this._code);
            }
            else if (this.type == 1030) {
                dropDesc = LanguageManager.getlocal("acLadder_merit_dropdesc");
            }
            else if (this.type == 1031) {
                dropDesc = LanguageManager.getlocal("acDechuanshidaifontDropDesc-1");
            }
            else if (this.type == 1032) {
                dropDesc = LanguageManager.getlocal("acSingleDay2019iconDropDesc-" + code);
            }
            else if (this.type == 1033) {
                dropDesc = LanguageManager.getlocal("acTravelwithbeautyFavorDropDesc-" + code);
            }
            else if (this.type == 1034) {
                dropDesc = LanguageManager.getlocal("acHeroineTokenDropDesc-" + code);
            }
            else if (this.type == 1035) {
                dropDesc = LanguageManager.getlocal("acAnnualPrayfontDropDesc-1");
            }
            else if (this.type == 1036) {
                dropDesc = LanguageManager.getlocal("acAnnualPrayfontDropDesc-" + code);
            }
            else if (this.type == 1037) {
                dropDesc = LanguageManager.getlocal("acAC2020_throw_dropdesc");
            }
            else if (this.type == 1038) {
                dropDesc = LanguageManager.getlocal("acAC2020_ai_throw_dropdesc");
            }
            else if (this.type == 1039) {
                dropDesc = LanguageManager.getlocal("aclanterniconDropDesc-" + this._code);
            }
            else if (this.type == 1040) {
                dropDesc = LanguageManager.getlocal("acThreekingdomsOfWife_toolItemDropDesc-" + this._code);
            }
            else if (this.type == 1041) {
                dropDesc = LanguageManager.getlocal("acSkinoflibaiToolItemDropDesc-" + this._code);
            }
            else if (this.type == 1042) {
                dropDesc = LanguageManager.getlocal("acRecoveryToolItemDropDesc-" + this._code);
            }
            else if (this.type == 1043) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroexpicondrop", code));
            }
            else if (this.type == 1044) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomschangeteamicondrop", code));
            }
            else if (this.type == 1045) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomswaricon1drop", code));
            }
            else if (this.type == 1046) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomswaricon2drop", code));
            }
            else if (this.type == 1047) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("threekingdomsheroexpicondrop", code));
            }
            else if (this.type == 1048) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerHegemonyAllianceRewardDrop", code));
            }
            else if (this.type == 1049) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerHegemonyTokenRewardDrop", code));
            }
            else if (this.type == 1050) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingiconDrop", code));
            }
            else if (this.type == 1051) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acbeatxiongnuDrop", code));
            }
            else if (this.type == 1052) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKite_toolItmeDrop", code));
            }
            else if (this.type == 1053) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewOpen_specialDropDesc", code));
            }
            else if (this.type == 1054) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossPower_specialDropDesc", code));
            }
            else if (this.type == 1055) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeSpecialItemDrop", code));
            }
            else if (this.type == 1056) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFindSameSpecialItemDrop", code));
            }
            else if (this.type == 1057) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKnightSpecialItemDrop", code));
            }
            else if (this.type == 1058) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acDrinkTeaSpecialItemDrop", code));
            }
            else if (this.type == 1059) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acmainlandiconjjlDropDesc", code));
            }
            else if (this.type == 1060) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossImacy_specialDropDesc", code));
            }
            else if (this.type == 1061) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_specialitemdescdrop", code));
            }
            else if (this.type == 1062) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf1drop", code));
            }
            else if (this.type == 1063) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf2drop", code));
            }
            else if (this.type == 1064) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acskysound_yf3drop", code));
            }
            else if (this.type == 1065) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewAppointScoreItemDrop", code));
            }
            else if (this.type == 1066) {
                dropDesc = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossAtkracey_specialDropDesc", code));
            }
            else {
                dropDesc = LanguageManager.getlocal("itemDropDesc_" + this.type);
            }
            return dropDesc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardItemVo.prototype, "itemType", {
        get: function () {
            var itemtype = LanguageManager.getlocal("itemType" + this.type);
            if (this.type == 11) {
                var titlecfg = Config.TitleCfg.getTitleCfgById(this.id);
                if (titlecfg) {
                    itemtype = LanguageManager.getlocal("itemType" + this.type + "_" + titlecfg.isTitle);
                }
            }
            return itemtype;
        },
        enumerable: true,
        configurable: true
    });
    RewardItemVo.prototype.getDescTxt = function (showEffectStr) {
        var descStr;
        if (showEffectStr) {
            descStr = App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"), TextFieldConst.COLOR_BROWN) + this.desc;
        }
        else {
            descStr = this.desc;
        }
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTxt.lineSpacing = 2;
        return descTxt;
    };
    /**
     * 奖励完整的名字
     */
    RewardItemVo.prototype.getFullTip = function () {
        var tipstr = "";
        //红颜
        if (this.type == 9 || this.type == 12 || this.type == 13) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.id);
            tipstr = wifeCfg.name + this.tipMessage;
        }
        //门客
        else if (this.type == 14 || this.type == 15) {
            var servantCfg = Config.ServantCfg.getServantItemById(this.id);
            tipstr = servantCfg.name + this.message;
        }
        else {
            tipstr = this.message;
        }
        return tipstr;
    };
    RewardItemVo.prototype.dispose = function () {
        this.type = 0;
        this.id = 0;
        this.num = 0;
        this._name = "";
        this._tipName = "";
        this._desc = "";
        this._icon = "";
        this._iconbg = "";
        this._quality = 1;
        this.target = 0;
        this.targetId = 0;
        this.getRewards = null;
        this.originalIdx = 0;
    };
    return RewardItemVo;
}(BaseVo));
//# sourceMappingURL=RewardItemVo.js.map