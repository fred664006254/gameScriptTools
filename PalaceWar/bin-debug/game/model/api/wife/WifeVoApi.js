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
 * 红颜系统api
 * author dmj
 * date 2017/9/22
 * @class WifeVoApi
 */
var WifeVoApi = /** @class */ (function (_super) {
    __extends(WifeVoApi, _super);
    function WifeVoApi() {
        return _super.call(this) || this;
    }
    WifeVoApi.prototype.checkNpcMessage = function () {
        if (this.getEnergyNum() > 0 || Api.wifestatusVoApi.getIsConfer() || (Api.switchVoApi.checkOpenWifeBattle() && Api.wifebattleVoApi.checkNpcMessage())) {
            // return LanguageManager.getlocal("wifeTipMessage");
            return true;
        }
        return false;
    };
    WifeVoApi.prototype.setWaitShowWife = function (data) {
        this.waitShowWife = data;
    };
    WifeVoApi.prototype.getWaitShowWife = function () {
        var wafe = this.waitShowWife;
        this.waitShowWife = null;
        return wafe;
    };
    WifeVoApi.prototype.checkWaitShowWife = function () {
        var wafe = this.waitShowWife;
        if (wafe) {
            return true;
        }
        return false;
    };
    WifeVoApi.prototype.getWifes = function () {
        var obj = this.wifeVo.wifeInfoVoObj;
        return Object.keys(obj);
    };
    // 获取妻子数量
    WifeVoApi.prototype.getWifeNum = function () {
        var obj = this.wifeVo.wifeInfoVoObj;
        return Object.keys(obj).length;
    };
    // 获取孩子数量
    WifeVoApi.prototype.getChildrenNum = function () {
        var num = 0;
        for (var key in this.wifeVo.wifeInfoVoObj) {
            num += this.wifeVo.wifeInfoVoObj[key].child;
        }
        return num;
    };
    /**获取红颜列表 */
    WifeVoApi.prototype.getWifeInfoVoList = function (isSort) {
        if (isSort === void 0) { isSort = true; }
        var arr = new Array();
        var wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
        for (var key in wifeInfoVoObj) {
            arr.push(wifeInfoVoObj[key]);
        }
        arr.sort(function (a, b) {
            if (Api.switchVoApi.checkOpenBanish() && isSort && Api.wifebanishVoApi.getIsWifeBanishing(String(a.id)) != Api.wifebanishVoApi.getIsWifeBanishing(String(b.id))) {
                return Api.wifebanishVoApi.getIsWifeBanishing(String(a.id)) - Api.wifebanishVoApi.getIsWifeBanishing(String(b.id));
            }
            else {
                return a.cfg.sortId - b.cfg.sortId;
            }
        });
        return arr;
    };
    /**
     * 获取未解锁红颜列表
     */
    WifeVoApi.prototype.getUnlockWifeInfoVoList = function () {
        var arr = new Array();
        var wifeListCfg = Config.WifeCfg.getWifeCfgList();
        // let vipBoo = Api.switchVoApi.checkVip1Privilege();
        for (var key in wifeListCfg) {
            if (this.getWifeInfoVoById(Number(key)) == null) {
                var curr_wifeItemCfg = wifeListCfg[key];
                if (curr_wifeItemCfg.unlock && curr_wifeItemCfg.unlock["needVip"]) {
                    var needVip = curr_wifeItemCfg.unlock["needVip"];
                    var openVipNum = Api.vipVoApi.getMaxbtnNum();
                    if (openVipNum >= needVip) {
                        arr.push(curr_wifeItemCfg);
                    }
                }
                else {
                    arr.push(curr_wifeItemCfg);
                }
            }
        }
        arr.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return arr;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    WifeVoApi.prototype.isShowNpc = function () {
        // return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
        if (this.getWifeNum() <= 0) {
            return false;
        }
        return true;
    };
    /**
     * 检测是否有有骨骼
     */
    WifeVoApi.prototype.isHaveBone = function (boneName) {
        if (PlatformManager.checkIsKRSp()) {
            var krBones = {
                "wife_full_204_ske": 1,
                "wife_full2_204_ske": 1,
                "wife_full_209_ske": 1,
                "wife_full2_209_ske": 1,
                "wife_full_310_ske": 1,
                "wife_full2_310_ske": 1,
                "wife_full3_1011_ske": 1,
                "wife_full4_1011_ske": 1,
                "wife_full3_3101_ske": 1,
                "wife_full3_3041_ske": 1,
                "wife_full4_2071_ske": 1,
                "wife_full3_2071_ske": 1,
                "wife_full3_1012_ske": 1,
                "wife_full4_1012_ske": 1,
                "wife_full3_1071_ske": 1,
                "wife_full4_1071_ske": 1,
                "wife_full_218_ske": 1,
                "wife_full2_218_ske": 1,
                "wife_full3_3032_ske": 1,
                "wife_full4_3032_ske": 1,
                "wife_full3_2101_ske": 1,
                "wife_full4_2101_ske": 1,
                "wife_full3_1072_ske": 1,
                "wife_full4_1072_ske": 1,
                "wife_full3_2061_ske": 1,
                "wife_full4_2061_ske": 1,
                "wife_full_220_ske": 1,
                "wife_full2_220_ske": 1,
                "wife_full3_1081_ske": 1,
                "wife_full4_1081_ske": 1,
                "wife_full3_2081_ske": 1,
                "wife_full4_2081_ske": 1,
                "wife_full3_2211_ske": 1,
                "wife_full4_2211_ske": 1,
                "wife_full_221_ske": 1,
                "wife_full2_221_ske": 1,
                "wife_full_225_ske": 1,
                "wife_full2_225_ske": 1,
                "wife_full3_2091_ske": 1,
                "wife_full4_2091_ske": 1,
                "wife_full3_2121_ske": 1,
                "wife_full4_2121_ske": 1,
                "wife_full3_2161_ske": 1,
                "wife_full4_2161_ske": 1,
                "wife_full3_2111_ske": 1,
                "wife_full4_2111_ske": 1,
                "wife_full3_1091_ske": 1,
                "wife_full4_1091_ske": 1,
                "wife_full3_2122_ske": 1,
                "wife_full4_2122_ske": 1,
                "wife_full3_2031_ske": 1,
                "wife_full4_2031_ske": 1,
                "wife_full3_2181_ske": 1,
                "wife_full4_2181_ske": 1,
                "wife_full3_2171_ske": 1,
                "wife_full4_2171_ske": 1,
                "wife_full_233_ske": 1,
                "wife_full2_233_ske": 1,
                "wife_full_108_ske": 1,
                "wife_full2_108_ske": 1,
                "wife_full3_3035_ske": 1,
                "wife_full4_3035_ske": 1,
                "wife_full_202_ske": 1,
                "wife_full2_202_ske": 1,
                "wife_full_226_ske": 1,
                "wife_full2_226_ske": 1,
                "wife_full_227_ske": 1,
                "wife_full2_227_ske": 1,
                "wife_full_228_ske": 1,
                "wife_full2_228_ske": 1,
                "wife_full_229_ske": 1,
                "wife_full2_229_ske": 1,
                "wife_full_230_ske": 1,
                "wife_full2_230_ske": 1,
                "wife_full_224_ske": 1,
                "wife_full2_224_ske": 1,
                "wife_full3_3024_ske": 1,
                "wife_full4_3024_ske": 1,
                "wife_full_207_ske": 1,
                "wife_full2_207_ske": 1,
                "wife_full_205_ske": 1,
                "wife_full2_205_ske": 1,
                "wife_full_212_ske": 1,
                "wife_full2_212_ske": 1,
                "wife_full_236_1_ske": 1,
                "wife_full_236_2_ske": 1,
                "wife_full2_236_ske": 1,
                "wife_full3_2241_ske": 1,
                "wife_full4_2241_ske": 1,
                "wife_full_242_ske": 1,
                "wife_full2_242_ske": 1,
                "wife_full_313_ske": 1,
                "wife_full2_313_ske": 1,
                "wife_full3_3042_ske": 1,
                "wife_full4_3042_ske": 1,
                "wife_full_244_ske": 1,
                "wife_full2_244_ske": 1,
                "wife_full3_3104_ske": 1,
                "wife_full4_3104_ske": 1,
                "wife_full3_1051_ske": 1,
                "wife_full4_1051_ske": 1,
                "wife_full3_2151_ske": 1,
                "wife_full4_2151_ske": 1,
                "wife_full_240_ske": 1,
                "wife_full2_240_ske": 1,
                "wife_full3_3025_ske": 1,
                "wife_full4_3025_ske": 1,
                "wife_full3_2162_ske": 1,
                "wife_full4_2162_ske": 1,
                "wife_full3_2371_ske": 1,
                "wife_full4_2371_ske": 1,
                "wife_full3_2011_ske": 1,
                "wife_full4_2011_ske": 1,
                "wife_full_237_ske": 1,
                "wife_full2_237_ske": 1,
                "wife_full3_3038_ske": 1,
                "wife_full4_3038_ske": 1,
                "wife_full3_3061_ske": 1,
                "wife_full4_3061_ske": 1,
                "wife_full_246_ske": 1,
                "wife_full2_246_ske": 1,
                "wife_full3_3043_ske": 1,
                "wife_full4_3043_ske": 1,
                "wife_full3_2172_ske": 1,
                "wife_full4_2172_ske": 1
            };
            if (!krBones[boneName]) {
                return false;
            }
        }
        if (PlatformManager.checkIsThSp() && !PlatformManager.checkIsLocal()) {
            var thBones = {};
            if (thBones[boneName]) {
                return false;
            }
        }
        //英文印尼版需要屏蔽的骨骼
        if (PlatformManager.checkIsEnLang()) {
            var enLangBones = {
            // wife_full_302_ske:1,
            // wife_full2_302_ske:1,
            // wife_full_303_ske:1,
            // wife_full2_303_ske:1,
            };
            if (enLangBones[boneName]) {
                return false;
            }
        }
        if (RES.hasRes(boneName) && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone()) {
            return true;
        }
        return false;
    };
    /**
     * 根据红颜id获取红颜vo
     * @param id 红颜id
     */
    WifeVoApi.prototype.getWifeInfoVoById = function (id) {
        if (!id) {
            return null;
        }
        var wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
        if (wifeInfoVoObj && wifeInfoVoObj[id.toString()]) {
            return wifeInfoVoObj[id.toString()];
        }
        return null;
    };
    WifeVoApi.prototype.getWifeIsBlue = function (wifeId) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        return wifeCfg.isBule();
    };
    /**
     * 根据红颜id获取红颜列表位置
     * @param id 红颜id
     */
    WifeVoApi.prototype.getWifeIndexVoById = function (id) {
        var wifeVolist = this.getWifeInfoVoList();
        for (var i = 0; i < wifeVolist.length; i++) {
            if (id == wifeVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**获取剩余精力次数 */
    WifeVoApi.prototype.getEnergyNum = function () {
        var num = this.wifeVo.energy_num;
        var maxNum = this.getEnergyMaxNum();
        var serverTime = GameData.serverTime;
        var needTime = GameConfig.config.wifebaseCfg.needTime;
        if (num >= maxNum) {
            num = maxNum;
        }
        else {
            var count = Math.floor((serverTime - this.wifeVo.energy_st) / needTime);
            if ((num + count) >= maxNum) {
                num = maxNum;
            }
            else {
                num += count;
            }
        }
        return num;
    };
    /**获取精力最大次数 */
    WifeVoApi.prototype.getEnergyMaxNum = function () {
        var num = GameConfig.config.vipCfg[Api.playerVoApi.getPlayerVipLevel()].maxEnergy;
        return num;
    };
    /**获取恢复精力倒计时 */
    WifeVoApi.prototype.getRecoverEnergyTime = function () {
        var time = 0;
        var needTime = GameConfig.config.wifebaseCfg.needTime;
        var st = this.wifeVo.energy_st;
        if ((st + needTime) > GameData.serverTime) {
            time = st + needTime - GameData.serverTime;
        }
        return time;
    };
    /**
     * 宠幸消耗的元宝公式（跟亲密度相关）
     * 亲密度 * 10 最大值为1000元宝
     * @param intimacy 亲密度
     */
    WifeVoApi.prototype.getLoveNeedGem = function (intimacy) {
        var needGem = intimacy * 10;
        if (needGem > 1000) {
            needGem = 1000;
        }
        return needGem;
    };
    /**
     * 获取红颜赏赐红点

     */
    WifeVoApi.prototype.getGiveRed = function () {
        var cfg = Config.WifebaseCfg.wifeGift;
        for (var index = 1; index < 5; index++) {
            var key = index.toString();
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
            if (hasNum > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取红颜技能红点

     */
    WifeVoApi.prototype.getSkillRed = function (wifeId) {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var list = wifeVo.cfg.wifeSkill;
        //技能2
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        if (wifeCfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock()) {
            if (Api.switchVoApi.checkWifeExpExchangeOpen() && (this.hasTransformRed(wifeId) || this.hasTransformRed2(wifeId))) {
                return true;
            }
            if (!this.isAllSkill2LevelMax(wifeId)) {
                var list2 = wifeVo.cfg.wifeSkill2;
                for (var index = 0; index < list2.length; index++) {
                    var element = list2[index];
                    if (element.condition <= wifeVo.intimacy && wifeVo.skill2[index] < Config.WifebaseCfg.getWifeSkill2Max()) {
                        //解锁了
                        var needExp = Config.WifebaseCfg["wifeSkill" + (index + 1 + 6)][wifeVo.skill2[index] - 1];
                        var hasNum = wifeVo.exp;
                        if (needExp <= hasNum) {
                            return true;
                        }
                    }
                }
            }
        }
        //有对应门客的id
        if (wifeVo.cfg.servantId) {
            var servant = Api.servantVoApi.getServantObj(String(wifeVo.cfg.servantId));
            //本身没有这个门客 直接不显示红点
            if (!servant) {
                return false;
            }
        }
        if (!wifeCfg.wifeSkill2) {
            if (Api.switchVoApi.checkWifeExpExchangeOpen() && this.hasTransformRed(wifeId)) {
                return true;
            }
        }
        if (!this.isAllSkillLevelMax(wifeId)) {
            for (var index = 0; index < list.length; index++) {
                var element = list[index];
                if (element.condition <= wifeVo.intimacy && wifeVo.skill[index] < Config.WifebaseCfg.getWifeSkillMax()) {
                    //解锁了
                    var needExp = Config.WifebaseCfg["wifeSkill" + (index + 1)][wifeVo.skill[index] - 1];
                    var hasNum = wifeVo.exp;
                    if (needExp <= hasNum) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 红颜技能是否可升级
     */
    WifeVoApi.prototype.isSkillCanLevelUp = function (wifeId) {
        if (this.isAllSkillLevelMax(wifeId)) {
            return false;
        }
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var list = wifeVo.cfg.wifeSkill;
        for (var index = 0; index < list.length; index++) {
            var element = list[index];
            if (element.condition <= wifeVo.intimacy && wifeVo.skill[index] < Config.WifebaseCfg.getWifeSkillMax()) {
                //解锁了
                var needExp = Config.WifebaseCfg["wifeSkill" + (index + 1)][wifeVo.skill[index] - 1];
                var hasNum = wifeVo.exp;
                if (needExp <= hasNum) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 红颜技能是否可升级
     */
    WifeVoApi.prototype.isSkill2CanLevelUp = function (wifeId) {
        if (this.isAllSkill2LevelMax(wifeId)) {
            return false;
        }
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var list = wifeVo.cfg.wifeSkill2;
        for (var index = 0; index < list.length; index++) {
            var element = list[index];
            if (element.condition <= wifeVo.intimacy && wifeVo.skill2[index] < Config.WifebaseCfg.getWifeSkill2Max()) {
                //解锁了
                var needExp = Config.WifebaseCfg["wifeSkill" + (index + 1 + 6)][wifeVo.skill2[index] - 1];
                var hasNum = wifeVo.exp;
                if (needExp <= hasNum) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 红颜技能经验转换
     */
    WifeVoApi.prototype.hasTransformRed = function (wifeId) {
        var b = false;
        if (this.isAllSkillLevelMax(wifeId)) {
            var infoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
            if (infoVo.exp >= this.getTransformValue(wifeId)) {
                b = true;
            }
        }
        return b;
    };
    /**
     * 红颜技能2经验转换
     */
    WifeVoApi.prototype.hasTransformRed2 = function (wifeId) {
        var b = false;
        if (this.isAllSkill2LevelMax(wifeId)) {
            var infoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
            if (infoVo.exp >= this.getTransformValue(wifeId)) {
                b = true;
            }
        }
        return b;
    };
    /**
     * 红颜技能经验转换
     */
    WifeVoApi.prototype.getTransformValue = function (wifeId) {
        var infoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var i = infoVo.glamour;
        var v1 = Math.floor(i + i * i / 100);
        var v2 = Config.WifebaseCfg.skillExchange;
        return v1 * v2;
    };
    /**
     * 红颜技能都是满级，可以技能经验兑换道具
     */
    WifeVoApi.prototype.isAllSkillLevelMax = function (wifeId) {
        var maxlv = Config.WifebaseCfg.getWifeSkillMax();
        var b = true;
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var list = wifeVo.skill;
        for (var index = 0; index < list.length; index++) {
            if (list[index] < maxlv) {
                b = false;
                break;
            }
        }
        return b;
    };
    /**
     * 红颜技能2都是满级，可以技能经验兑换道具
     */
    WifeVoApi.prototype.isAllSkill2LevelMax = function (wifeId) {
        var maxlv = Config.WifebaseCfg.getWifeSkill2Max();
        var b = true;
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var list = wifeVo.skill2;
        if (list) {
            for (var index = 0; index < list.length; index++) {
                if (list[index] < maxlv) {
                    b = false;
                    break;
                }
            }
        }
        return b;
    };
    /**
     * 	是否有技能没满的红颜
     */
    WifeVoApi.prototype.hasNotSkillLevelMaxWife = function () {
        var wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
        for (var key in wifeInfoVoObj) {
            var wifeVo = wifeInfoVoObj[key];
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeVo.id);
            if (!this.isAllSkillLevelMax(wifeVo.id) || (wifeCfg.wifeSkill2 && !this.isAllSkill2LevelMax(wifeVo.id))) {
                return true;
            }
        }
        return false;
    };
    /**获取技能没满的红颜列表 */
    WifeVoApi.prototype.getWifeNotSkillLevelMaxList = function () {
        var arr = new Array();
        var wifeInfoVoObj = this.wifeVo.wifeInfoVoObj;
        for (var key in wifeInfoVoObj) {
            var wifeVo = wifeInfoVoObj[key];
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeVo.id);
            if (!this.isAllSkillLevelMax(wifeVo.id) || (wifeCfg.wifeSkill2 && !this.isAllSkill2LevelMax(wifeVo.id))) {
                arr.push(wifeInfoVoObj[key]);
            }
        }
        arr.sort(function (a, b) {
            if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(a.id)) != Api.wifebanishVoApi.getIsWifeBanishing(String(b.id))) {
                return Api.wifebanishVoApi.getIsWifeBanishing(String(a.id)) - Api.wifebanishVoApi.getIsWifeBanishing(String(b.id));
            }
            else {
                return a.cfg.sortId - b.cfg.sortId;
            }
        });
        return arr;
    };
    WifeVoApi.prototype.getWifeIcon = function (wifeId) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var icon = wifeCfg.icon;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeId)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                icon = skinCfg.icon;
            }
        }
        return icon;
    };
    WifeVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
    };
    WifeVoApi.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("wife", 7);
    };
    WifeVoApi.prototype.getDecreePolicyAddAttrInfo2 = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("", 7);
    };
    WifeVoApi.prototype.getDecreePolicyAddAttrInfo3 = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("wife", 0);
    };
    /** 得到亲密度最高的红颜id */
    WifeVoApi.prototype.getIdOfIntimacyMax = function () {
        var maxIntimacy = null;
        var maxId = null;
        for (var key in this.wifeVo.wifeInfoVoObj) {
            if (this.wifeVo.wifeInfoVoObj.hasOwnProperty(key)) {
                var element = this.wifeVo.wifeInfoVoObj[key];
                if (!maxIntimacy || maxIntimacy < element.intimacy || (maxIntimacy === element.intimacy && parseInt(maxId) > parseInt(key))) {
                    maxIntimacy = element.intimacy;
                    maxId = key;
                }
            }
        }
        return maxId;
    };
    /**主线佳人技能升级  条件为获得对应门客*/
    WifeVoApi.prototype.getMainTaskIntimacyMax = function () {
        var maxIntimacy = null;
        var maxId = null;
        for (var key in this.wifeVo.wifeInfoVoObj) {
            if (this.wifeVo.wifeInfoVoObj.hasOwnProperty(key)) {
                var cfg = Config.WifeCfg.getWifeCfgById(key);
                var element = this.wifeVo.wifeInfoVoObj[key];
                if (cfg && cfg.servantId && Api.servantVoApi.getServantObj(cfg.servantId)) {
                    if (!maxIntimacy || maxIntimacy < element.intimacy || (maxIntimacy === element.intimacy && parseInt(maxId) > parseInt(key))) {
                        maxIntimacy = element.intimacy;
                        maxId = key;
                    }
                }
            }
        }
        if (!maxId) {
            return this.getIdOfIntimacyMax();
        }
        return maxId;
    };
    //检测红颜是否可以性转
    WifeVoApi.prototype.checkWifeCanChangeSex = function (wifeId) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        if (wifeCfg.isBlueFunction) {
            return true;
        }
        return false;
    };
    WifeVoApi.prototype.isUnlockExSkill = function (wifeId) {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        if (wifeVo) {
            return wifeVo.isUnlockExSkill();
        }
        return false;
    };
    WifeVoApi.prototype.getExSkillLevel = function (wifeId) {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        if (wifeVo) {
            return wifeVo.getExSkillLevel();
        }
        return 0;
    };
    return WifeVoApi;
}(BaseVoApi));
//# sourceMappingURL=WifeVoApi.js.map