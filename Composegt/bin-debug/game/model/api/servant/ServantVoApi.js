var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 门客系统api
 * author dmj
 * date 2017/9/22
 * @class ServantVoApi
 */
var ServantVoApi = (function (_super) {
    __extends(ServantVoApi, _super);
    function ServantVoApi() {
        var _this = _super.call(this) || this;
        _this.isShowAtkraceGuide = false;
        _this.isCheckGuide = false;
        return _this;
    }
    ServantVoApi.prototype.setWaitShowData = function (data) {
        this.waitShowData = data;
    };
    ServantVoApi.prototype.getWaitShowData = function () {
        var data = this.waitShowData;
        this.waitShowData = null;
        return data;
    };
    // todo 
    ServantVoApi.prototype.getServantCount = function () {
        return Object.keys(this.servantVo.servantInfoVoObj).length;
    };
    ServantVoApi.prototype.getServantInfoList = function () {
        return this.servantVo.servantInfoVoObj;
    };
    ServantVoApi.prototype.getServantObj = function (servantId) {
        return this.servantVo.servantInfoVoObj[servantId];
    };
    //返回排序后的servantInfo 列表，结构为数组
    ServantVoApi.prototype.getServantInfoListWithSort = function (sortType) {
        sortType = sortType ? sortType : 1;
        var idList = this.getServantInfoIdListWithSort(sortType);
        var result = [];
        for (var index = 0; index < idList.length; index++) {
            result.push(this.servantVo.servantInfoVoObj[idList[index]]);
        }
        return result;
    };
    /** 得到总属性最大的门客id */
    ServantVoApi.prototype.getIdOfTotalMax = function () {
        var maxTotal = null;
        var maxId = null;
        for (var key in this.servantVo.servantInfoVoObj) {
            if (this.servantVo.servantInfoVoObj.hasOwnProperty(key)) {
                var element = this.servantVo.servantInfoVoObj[key];
                if (!maxTotal || maxTotal < element.total || (maxTotal === element.total && parseInt(maxId) < parseInt(key))) {
                    maxTotal = element.total;
                    maxId = key;
                }
            }
        }
        return maxId;
    };
    //返回经过排序后的id
    ServantVoApi.prototype.getServantInfoIdListWithSort = function (sortType) {
        var _this = this;
        //排序数据，刷新列表
        var servantListObj = this.servantVo.servantInfoVoObj;
        var keys = Object.keys(servantListObj);
        //默认排序
        if (sortType == 1) {
            // keys.sort((a:string,b:string)=>{
            // 	return Number(a) - Number(b) ;
            // });
        }
        //总属性排序
        if (sortType == 2) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (servantA.total == servantB.total) {
                    return Number(b) - Number(a);
                }
                else {
                    if (Number(servantB.total) == Number(servantA.total)) {
                        return Number(b) - Number(a);
                    }
                    return Number(servantB.total) - Number(servantA.total);
                }
                // return 0;
            });
        }
        //资质排序, 第一版不做
        if (sortType == 4) {
            // 
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                var bookAv = servantA.getTotalBookValue();
                var bookBv = servantB.getTotalBookValue();
                if (bookAv == bookBv) {
                    return Number(b) - Number(a);
                }
                else {
                    if (bookBv == bookAv) {
                        return Number(b) - Number(a);
                    }
                    return bookBv - bookAv;
                }
                // return 0;
            });
        }
        //等级排序
        if (sortType == 3) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (servantA.level == servantB.level) {
                    return Number(b) - Number(a);
                }
                else {
                    if (Number(servantB.level) == Number(servantA.level)) {
                        return Number(b) - Number(a);
                    }
                    return Number(servantB.level) - Number(servantA.level);
                }
                // return 0;
            });
        }
        return keys;
    };
    /**
     * 属性排序后的id
     * @param sortType 1武力 2智力 ，3政治  4魅力 0总属性
     */
    ServantVoApi.prototype.getServantInfoIdListByProperty = function (sortType) {
        var _this = this;
        //排序数据，刷新列表
        var servantListObj = this.servantVo.servantInfoVoObj;
        var keys = Object.keys(servantListObj);
        keys.sort(function (a, b) {
            var servantA = _this.servantVo.servantInfoVoObj[a];
            var servantB = _this.servantVo.servantInfoVoObj[b];
            var valueA;
            var valueB;
            switch (sortType) {
                case 1:
                    valueA = servantA.attrVo.forceTotal;
                    valueB = servantB.attrVo.forceTotal;
                    break;
                case 2:
                    valueA = servantA.attrVo.brainsTotal;
                    valueB = servantB.attrVo.brainsTotal;
                    break;
                case 4:
                    valueA = servantA.attrVo.charmTotal;
                    valueB = servantB.attrVo.charmTotal;
                    break;
                case 3:
                    valueA = servantA.attrVo.politicsTotal;
                    valueB = servantB.attrVo.politicsTotal;
                    break;
                case 0:
                    valueA = servantA.total;
                    valueB = servantB.total;
                    break;
            }
            if (valueA == valueB) {
                return Number(Number(b) - Number(a));
            }
            else {
                return Number(valueB - valueA);
            }
        });
        return keys;
    };
    ServantVoApi.prototype.getServantProByType = function (servnatId, proType) {
        var servantA = this.servantVo.servantInfoVoObj[servnatId];
        var valuePro;
        switch (proType) {
            case 1:
                valuePro = servantA.attrVo.forceTotal;
                break;
            case 2:
                valuePro = servantA.attrVo.brainsTotal;
                break;
            case 4:
                valuePro = servantA.attrVo.charmTotal;
                break;
            case 3:
                valuePro = servantA.attrVo.politicsTotal;
                break;
            case 0:
                valuePro = servantA.total;
                break;
        }
        return valuePro;
    };
    /**
     * 获取门客战斗力
     *  门客武力资质 * 5000 * 门客等级 + 门客的武力属性
     */
    ServantVoApi.prototype.getServantCombatWithId = function (servantId) {
        var infoVo = this.servantVo.servantInfoVoObj[servantId];
        var value = infoVo.attrVo.forceTotal + infoVo.level * 5000 * this.getServantForceTotalById(servantId);
        return value;
    };
    /**
     * 获取门客武力资质
     * @param servantId
     */
    ServantVoApi.prototype.getServantForceTotalById = function (servantId) {
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var ability = servantcfg.ability;
        var infoVo = this.servantVo.servantInfoVoObj[servantId];
        var abilityCfg = GameConfig.config.abilityCfg;
        var value = 0;
        for (var index = 0; index < ability.length; index++) {
            var abilityItem = abilityCfg[String(ability[index])];
            if (abilityItem.type == 1) {
                value += abilityItem.num * infoVo.ability[index];
            }
        }
        var tmpValue = infoVo.getAllSkinProAdd();
        if (tmpValue && tmpValue[0] > 0) {
            value += tmpValue[0];
        }
        return value;
    };
    ServantVoApi.prototype.getServantStarsNumWithId = function (servantId) {
        var servantCfg = GameConfig.config.servantCfg[servantId];
        var ability = servantCfg.ability;
        var starNum = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var tmpAcfg = GameConfig.config.abilityCfg[ability[index2]];
            starNum += tmpAcfg.num;
        }
        var Obj = this.getServantObj(servantId);
        if (Obj && Obj.skin) {
            for (var key in Obj.skin) {
                var skinVo = Obj.skin[key];
                starNum += skinVo.getSkinStarNum();
            }
        }
        return starNum;
    };
    ServantVoApi.prototype.getFullImgPathWithId = function (servantId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            return servant.fullImgPath;
        }
        return "servant_full_" + servantId;
    };
    /**
 * 检测是否有有骨骼
 */
    ServantVoApi.prototype.isHaveBone = function (boneName) {
        if (!PlatformManager.checkIsKRNewSp()) {
            var krBones = {
                "servant_full2_1050_ske": 1,
            };
            if (krBones[boneName]) {
                return false;
            }
        }
        return true;
    };
    /**
     * 门客的骨骼动画
     */
    ServantVoApi.prototype.getServantBoneId = function (servantId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            return servant.servantBone;
        }
        return null;
    };
    /**
     * 大于60级门客数量
     */
    ServantVoApi.prototype.getServantCountLevel60Plus = function () {
        var count = 0;
        var needLv = Config.AtkraceCfg.getServantLv();
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.level >= needLv) {
                count++;
            }
        }
        return count;
    };
    /**
     * 获取大于60级的门客 属性最高在上
     */
    ServantVoApi.prototype.getServantCountLevel60PlusList = function () {
        var keyArr = [];
        var needLv = Config.AtkraceCfg.getServantLv();
        var arr = this.getServantInfoIdListWithSort(2);
        for (var key in arr) {
            var servant = this.servantVo.servantInfoVoObj[arr[key]];
            if (servant.level >= needLv) {
                keyArr.push(arr[key]);
            }
        }
        return keyArr;
    };
    ServantVoApi.prototype.checkRedPoint = function () {
        if (this.isShowRedForItem())
            return true;
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.isShowRedInServantList()) {
                return true;
            }
        }
        return false;
    };
    ServantVoApi.prototype.isShowRedForItem = function () {
        var attItem = GameConfig.config.servantbaseCfg.attItem;
        for (var index = 0; index < attItem.length; index++) {
            var id = attItem[index];
            var itemVO = Api.itemVoApi.getItemInfoVoById(id);
            if (itemVO && itemVO.num > 0) {
                return true;
            }
        }
        return false;
    };
    ServantVoApi.prototype.isOwnServantDailyBoss = function () {
        if (this.getServantObj("1051")) {
            return true;
        }
        return false;
    };
    // public getDecreePolicyAddAttrInfo(){
    // 	return Api.promoteVoApi.getDecreePolicyAddAttrInfo("servant",0);
    // }
    ServantVoApi.prototype.getAllServantSkinAbilityAdd = function () {
        var result = [0, 0, 0, 0];
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            var tmpValue = servant.getAllSkinProAdd();
            result[0] += tmpValue[0];
            result[1] += tmpValue[1];
            result[2] += tmpValue[2];
            result[3] += tmpValue[3];
        }
        return result;
    };
    ServantVoApi.prototype.getAllServantSkinNums = function () {
        var result = 0;
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            result += servant.getSkinNums();
        }
        return result;
    };
    ServantVoApi.prototype.getAllServantSkinList = function () {
        var resultList = [];
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            resultList = resultList.concat(servant.getAllSkinList());
        }
        return resultList;
    };
    ServantVoApi.prototype.getServantSkinLV = function (skinId) {
        var servantId = Config.ServantskinCfg.getServantSkinItemById("" + skinId).servantId;
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            return servant.getSkinLv(skinId);
        }
        return null;
    };
    ServantVoApi.prototype.getSerSkinBookId = function (skinId, bookId) {
        var servantId = Config.ServantskinCfg.getServantSkinItemById("" + skinId).servantId;
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            return servant.getSkinBookLv(skinId, bookId);
        }
        return 1;
    };
    ServantVoApi.prototype.getSkinOneRed = function (servantId, _skinId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant && servant.skinred && servant.skinred[_skinId]) {
            return servant.skinred[_skinId];
        }
        return false;
    };
    ServantVoApi.prototype.isShowSkinRedForEnter = function (servantId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant && servant.skinred) {
            for (var key in servant.skinred) {
                if (servant.skinred.hasOwnProperty(key)) {
                    if (servant.skinred[key] == 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 检测是否又这个皮肤
     */
    ServantVoApi.prototype.isOwnSkinOfSkinId = function (skinId) {
        var cfg = Config.ServantskinCfg.getServantSkinItemById("" + skinId);
        if (!cfg || !cfg.servantId) {
            return false;
        }
        var servant = this.servantVo.servantInfoVoObj[cfg.servantId];
        if (!servant || !servant.skin || !servant.skin[skinId]) {
            return false;
        }
        return true;
    };
    //获取指定门客穿戴的皮肤id
    ServantVoApi.prototype.getservantSkinIdInWear = function (servantId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (!servant || !servant.equip || servant.equip == "") {
            return null;
        }
        return servant.equip;
    };
    ServantVoApi.prototype.isServantSkinInWear = function (skinId) {
        var skcfg = Config.ServantskinCfg.getServantSkinItemById("" + skinId);
        if (!skcfg) {
            return false;
        }
        var servantId = skcfg.servantId;
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (!servant || !servant.equip || servant.equip != skinId) {
            return false;
        }
        return true;
    };
    /**
     * 检测奖励是否包含门客，且发生门客转换
     * cfgRewards://原本应该获取的奖励
     * realRewards:实际获得的奖励，如果发生了转换，则和cfgRewards不一致，否则一致
     * isHideRewardWin: 是否隐藏兑换后的获得奖励面板
     */
    ServantVoApi.prototype.checkServantChangeRewards = function (cfgRewards, realRewards, otherrewards, isHideRewardWin) {
        if (!cfgRewards || cfgRewards == realRewards) {
            if (!isHideRewardWin) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": realRewards, "otherRewards": otherrewards, "isPlayAni": true });
            }
            return;
        }
        var rewardItemvo = GameData.formatRewardItem(cfgRewards);
        for (var index = 0; index < rewardItemvo.length; index++) {
            var element = rewardItemvo[index];
            if (element.type == 8) {
                var sercfg = Config.ServantCfg.getServantItemById(element.id);
                if (sercfg.exchange) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": sercfg.name, "touch": sercfg.exchange, "message": "changeOtherRewardTip", "callback": function () {
                            if (!isHideRewardWin) {
                                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": realRewards, "otherRewards": otherrewards, "isPlayAni": true });
                            }
                        }, "handler": this });
                    break;
                }
            }
            if (element.type == 19) {
                var sercfg = Config.ServantskinCfg.getServantSkinItemById("" + element.id);
                if (sercfg.exchange) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": sercfg.getSkinName(), "touch": sercfg.exchange, "message": "changeOtherRewardTip", "callback": function () {
                            if (!isHideRewardWin) {
                                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": realRewards, "otherRewards": otherrewards, "isPlayAni": true });
                            }
                        }, "handler": this });
                    break;
                }
            }
        }
    };
    /**
     * 返回对应特长的门客信息列表
     * 1：武力 2：智力 3：政治 4：魅力 5：均衡 6：全能
     */
    ServantVoApi.prototype.getServantInfoListBySpeciality = function (specialityId) {
        var servantListObj = this.servantVo.servantInfoVoObj;
        var servantInfoList = [];
        if (specialityId >= 5) {
            servantInfoList = this.getServantInfoListWithSort(1);
        }
        else {
            for (var key in servantListObj) {
                if (servantListObj.hasOwnProperty(key)) {
                    var servantId = servantListObj[key].servantId;
                    var servantCfg = Config.ServantCfg.getServantItemById(servantId);
                    var servantSp = servantCfg.speciality;
                    if (servantSp.indexOf(specialityId) != -1 || servantSp.indexOf(5) != -1 || servantSp.indexOf(6) != -1) {
                        servantInfoList.push(servantListObj[key]);
                    }
                }
            }
        }
        return servantInfoList;
    };
    //1234武智政魅
    ServantVoApi.prototype.getEquipAddAttr = function (idx, quality, lv) {
        var num = Config.ServantequiplCfg.getEquipAddvalue(idx, quality, lv, true);
        return num;
    };
    ////{{1,0,0},{1,0,0},{1,0,0},{1,0,0}}装备品阶 装备等级 装备经验
    ServantVoApi.prototype.getEquipQuality = function (sid, idx) {
        var num = 1;
        var obj = this.getServantObj(sid);
        if (obj && obj.equipment) {
            var unit = obj.equipment[idx - 1];
            num = unit[0];
        }
        return num;
    };
    ServantVoApi.prototype.getEquipAddLv = function (sid, idx) {
        var num = 0;
        var obj = this.getServantObj(sid);
        if (obj && obj.equipment) {
            var unit = obj.equipment[idx - 1];
            num = unit[1];
        }
        return num;
    };
    ServantVoApi.prototype.getEquipCurExp = function (sid, idx) {
        var num = 0;
        var obj = this.getServantObj(sid);
        if (obj && obj.equipment) {
            var unit = obj.equipment[idx - 1];
            num = unit[2];
        }
        return num;
    };
    ServantVoApi.prototype.getServantActiveJiban = function (sid) {
        return {
            active: this.getActiveBuffNums(sid),
            total: Config.ServentcombinationCfg.getCombineNums(sid)
        };
    };
    ServantVoApi.prototype.getServantActiveBufflv = function (sid, id) {
        var num = 0;
        var obj = this.getServantObj(sid);
        if (obj && obj.combination && obj.combination[sid + id]) {
            num = obj.combination[sid + id];
        }
        return num;
    };
    ServantVoApi.prototype.isBuffActive = function (sid, id) {
        var bool = false;
        var obj = this.getServantObj(sid);
        if (obj && obj.combination && obj.combination[sid + id]) {
            bool = true;
        }
        // let curActiveLv = this.getServantActiveBufflv(sid, id);
        // let cfg = Config.ServentcombinationCfg.getCombineInfoById(sid, id);
        // for(let i = 0; i < cfg.combinationDetail.length; ++ i){
        // 	let sid = cfg.combinationDetail[i];
        // 	let obj = this.getServantObj(sid);
        // 	if(!obj || obj.level < cfg.needAbility[curActiveLv]){
        // 		bool = false;
        // 		break;
        // 	}
        // }
        return bool;
    };
    ServantVoApi.prototype.checkHaveBuffActive = function (sid) {
        var bool = false;
        var nums = Config.ServentcombinationCfg.getCombineNums(sid);
        for (var i = 1; i <= nums; ++i) {
            if (this.canBuffActive(sid, i)) {
                return true;
            }
        }
        return false;
    };
    ServantVoApi.prototype.canBuffActive = function (sid, id) {
        var bool = true;
        var curActiveLv = this.getServantActiveBufflv(sid, id);
        var cfg = Config.ServentcombinationCfg.getCombineInfoById(sid, id);
        for (var i = 0; i < cfg.combinationDetail.length; ++i) {
            var sid_1 = cfg.combinationDetail[i];
            var obj = this.getServantObj(sid_1);
            if (!obj || obj.getTotalBookValue() < cfg.needAbility[curActiveLv]) {
                bool = false;
                break;
            }
        }
        return bool;
    };
    ServantVoApi.prototype.getActiveBuffNums = function (sid) {
        var num = 0;
        var nums = Config.ServentcombinationCfg.getCombineNums(sid);
        for (var i = 1; i <= nums; ++i) {
            if (this.isBuffActive(sid, i)) {
                ++num;
            }
        }
        return num;
    };
    ServantVoApi.prototype.getServantSkillLv = function (sid, skillid) {
        var num = 0;
        if (Number(skillid) == 1 || Number(skillid) == 0) {
            var skill = Api.servantVoApi.getServantObj(sid).skill;
            num = skill[skillid];
        }
        else {
            num = 1;
        }
        return num;
    };
    // /**
    //  * 获取门客已激活的经营技能
    //  */
    // public getActiveSkillLevyById(servantId: string): Config.SkillLevyCfgItem {
    // 	let _skill = Config.SkilllevyCfg.getSkillLevyByServantId(servantId);
    // 	if (!_skill) return null;
    // 	let _servant = this.getServantObj(servantId);
    // 	if (_skill.unlockLevel <= _servant.level) {
    // 		return _skill;
    // 	} else {
    // 		return null;
    // 	}
    // }
    ServantVoApi.prototype.dispose = function () {
        this.isShowAtkraceGuide = false;
        this.isCheckGuide = false;
        this.waitShowData = null;
        _super.prototype.dispose.call(this);
    };
    return ServantVoApi;
}(BaseVoApi));
__reflect(ServantVoApi.prototype, "ServantVoApi");
