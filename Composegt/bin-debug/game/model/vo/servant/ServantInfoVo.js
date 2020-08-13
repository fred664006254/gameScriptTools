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
 * 门客vo
 * author dmj
 * date 2017/9/22
 * @class ServantInfoVo
 */
var ServantInfoVo = (function (_super) {
    __extends(ServantInfoVo, _super);
    function ServantInfoVo() {
        var _this = _super.call(this) || this;
        // 等级
        _this.level = 0;
        // 已升级经验
        _this.hasexp = 0;
        // 总属性
        _this.total = 0;
        // 资质todo，第一版不升级，等级默认为1
        _this.servantId = "";
        _this.skillExp = 0;
        _this.clv = 0;
        _this.skill = [];
        _this.abilityExp = 0;
        /**
         * 特殊门客的光环信息
         */
        _this.aura = 0;
        /**
         * 门客皮肤
         */
        _this.equip = "";
        _this.skin = [];
        _this.skinred = undefined;
        //{{1,0,0},{1,0,0},{1,0,0},{1,0,0}}装备品阶 装备等级 装备经验
        _this.equipment = [];
        _this.combination = {};
        return _this;
    }
    ServantInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.lv != null) {
                this.level = Number(data.lv);
            }
            if (data.hasexp != null) {
                this.hasexp = Number(data.hasexp);
            }
            if (data.total != null) {
                var curTotal = this.total;
                this.total = Number(data.total);
                // if(curTotal!=0 && this.total - curTotal >0){
                // 	let dis = this.total - curTotal;
                // 	let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
                // 	// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
                // 	let powerFly = new PowerFly();
                // 	powerFly.init(dis);
                // 	LayerManager.msgLayer.addChild(powerFly);	
                // }
            }
            if (this.attrVo == null) {
                this.attrVo = new ServantAttrVo();
            }
            if (data.skillExp != null) {
                this.skillExp = data.skillExp;
            }
            if (data.clv != null) {
                this.clv = data.clv;
            }
            if (data.ability != null) {
                this.ability = data.ability;
            }
            if (data.skill != null) {
                this.skill = data.skill;
            }
            if (data.abilityExp != null) {
                this.abilityExp = data.abilityExp;
            }
            if (data.aura != null) {
                this.aura = data.aura;
            }
            this.attrVo.initData(data);
            if (data.equip != null) {
                this.equip = data.equip;
            }
            if (data.skin != null) {
                for (var key in data.skin) {
                    var skinvo = this.skin[key];
                    if (!skinvo) {
                        skinvo = new ServantSkinVo();
                        this.skin[key] = skinvo;
                    }
                    skinvo.skinid = key;
                    skinvo.initData(data.skin[key]);
                }
            }
            if (data.skinred != null) {
                this.skinred = data.skinred;
            }
            if (data.equipment) {
                this.equipment = data.equipment;
            }
            if (data.combination) {
                this.combination = data.combination;
            }
        }
    };
    Object.defineProperty(ServantInfoVo.prototype, "halfImgPath", {
        //获取头像资源
        get: function () {
            if (!this.equip || this.equip == "") {
                return "servant_half_" + this.servantId;
            }
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
            return skincfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "fullImgPath", {
        //获取全身像资源
        get: function () {
            if (!this.equip || this.equip == "") {
                return "servant_full_" + this.servantId;
            }
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
            return skincfg.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "servantBone", {
        get: function () {
            // if(!this.equip || this.equip == ""){
            return "servant_full2_" + this.servantId;
            // }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "qualityBoxImgPath", {
        // //获取名字资源
        // public get nameImgPath():string{
        // 	return "name_" + this.servantId;
        // }
        //获取品质框资源
        get: function () {
            return "servant_cardbg_" + this.clv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "qualityBg", {
        get: function () {
            return "servant_qualityBg_" + this.clv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "servantName", {
        //获取门客名字
        get: function () {
            return LanguageManager.getlocal("servant_name" + this.servantId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "sound", {
        //获取声音
        get: function () {
            if (Api.switchVoApi.checkOpenNewSound()) {
                var arr = ["effect_servant_" + this.servantId, "effect_servant_" + this.servantId + "_2"];
                return arr[App.MathUtil.getRandom(0, arr.length)];
            }
            else {
                return "effect_servant_" + this.servantId;
            }
        },
        enumerable: true,
        configurable: true
    });
    ServantInfoVo.prototype.isAtMaxLv = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level == topLV && !servantLvList[String(this.clv + 1)]) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isAtTopLv = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isLvEnableForAdvance = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV && servantLvList[String(this.clv + 1)]) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isAdvanceEnable = function () {
        var servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV && servantLvList[String(this.clv + 1)]) {
            var needItem = servantLvList[String(this.clv + 1)].needItem;
            for (var key in needItem) {
                var ownNum = Api.itemVoApi.getItemNumInfoVoById(Number(key));
                if (ownNum < needItem[key])
                    return false;
            }
            //判断道具
            return true;
        }
        return false;
    };
    /**
     * 技能是否可升级
     */
    ServantInfoVo.prototype.isSkillLvUpEnable = function () {
        var baseCfg = GameConfig.config.servantbaseCfg;
        if (!baseCfg) {
            return false;
        }
        var skillUpgradeExp = baseCfg.skillUpgradeExp;
        var maxLv = baseCfg.skillLvLimit;
        // baseCfg.servantLvList[String(this.clv)].upLv
        if (!skillUpgradeExp) {
            return false;
        }
        for (var index = 0; index < this.skill.length; index++) {
            var skillLv = this.skill[index];
            if (skillLv < maxLv && this.skillExp >= skillUpgradeExp[skillLv - 1]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 红颜技能是否可升级，可以则返回aid
     */
    ServantInfoVo.prototype.isBookLvUpEnable = function () {
        var abilitybaseCfg = GameConfig.config.abilitybaseCfg;
        var typeList = abilitybaseCfg.typeList;
        var numList = abilitybaseCfg.numList;
        var idxList = {};
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var tmpability = servantCfg.ability;
        // let ability = servantCfg.ability
        var ability = this.getAbilityIdList();
        var curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this.clv)];
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var aLv = 1;
            //  this.ability[String(index2)];
            var abilityExp = numList[String(tmpAcfg.num)].abilityExp;
            var oriidx = tmpability.indexOf(aid);
            if (oriidx > -1) {
                aLv = this.ability[String(oriidx)];
            }
            else {
                aLv = this.getSkinBookLv2(aid);
            }
            if (aLv < curClvCfg.abilityLv) {
                var ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
                var ownNum2 = Api.itemVoApi.getItemNumInfoVoById("159" + tmpAcfg.num);
                if (abilityExp <= this.abilityExp || ownNum1 >= 1 || ownNum2 >= 1) {
                    idxList[String(index2)] = index2;
                }
            }
        }
        if (Object.keys(idxList).length > 0) {
            return idxList;
        }
        else {
            return false;
        }
    };
    ServantInfoVo.prototype.isBookLvUpEnableById = function (bookid) {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            if (aid == bookid) {
                var abilitybaseCfg = GameConfig.config.abilitybaseCfg;
                var typeList = abilitybaseCfg.typeList;
                var numList = abilitybaseCfg.numList;
                var tmpAcfg = GameConfig.config.abilityCfg[aid];
                var aLv = this.ability[aid];
                var curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this.clv)];
                var abilityExp = numList[String(tmpAcfg.num)].abilityExp;
                if (aLv < curClvCfg.abilityLv) {
                    var ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
                    if (abilityExp <= this.abilityExp || ownNum1 >= 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 是否在门客列表中显示红点
     */
    ServantInfoVo.prototype.isShowRedInServantList = function () {
        if (Api.servantVoApi.isShowRedForItem() || this.isAdvanceEnable() || this.isSkillLvUpEnable() || this.isBookLvUpEnable() || this.isShowRedForaura() || this.isShowRedForAmuletAura() || Api.servantVoApi.checkHaveBuffActive(this.servantId)) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.getTotalBookValue = function (type) {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        var totalBookV = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            if (type) {
                if (tmpAcfg.type == type) {
                    var aLv = this.ability[String(index2)];
                    var txtIdx = index2 * 2;
                    totalBookV += aLv * tmpAcfg.num;
                }
            }
            else {
                var aLv = this.ability[String(index2)];
                var txtIdx = index2 * 2;
                totalBookV += aLv * tmpAcfg.num;
            }
        }
        //皮肤的书籍加成
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                totalBookV += this.skin[key].getSkinBookValue();
            }
        }
        return totalBookV;
    };
    ServantInfoVo.prototype.isShowRedForaura = function () {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var saura = this.getAllSkinAuraList();
        if (servantCfg.aura) {
            var keysList = Object.keys(servantCfg.aura);
            for (var index = 1; index < keysList.length; index++) {
                var auraId = keysList[index];
                var cfg = servantCfg.aura[auraId];
                if (Number(auraId) >= 3) {
                    var aura3Data = servantCfg.aura[auraId];
                    var curLv = this.aura[auraId];
                    if (curLv == null) {
                        curLv = aura3Data.maxLv;
                    }
                    var lvUpDemand = aura3Data.lvUpDemand;
                    if (lvUpDemand) {
                        if (aura3Data.maxLv <= curLv) {
                            if (aura3Data.breakSwitch && Api.switchVoApi.checkCommonSwitch(aura3Data.breakSwitch)) {
                                if (curLv >= aura3Data.breakMaxlv) {
                                    return false;
                                }
                                else {
                                    var bLvUpDemandList = aura3Data.breaklvUpDemand;
                                    var unLock = true;
                                    var needV = "1";
                                    if (bLvUpDemandList && bLvUpDemandList.length > 0) {
                                        for (var i = 0; i < bLvUpDemandList.length; i++) {
                                            var bLvUpDemand = bLvUpDemandList[i];
                                            var bLvUpDemandData = bLvUpDemand.split("_");
                                            if (bLvUpDemandData.length > 0) {
                                                var serObj = Api.servantVoApi.getServantObj(bLvUpDemandData[0]);
                                                if (!serObj) {
                                                    unLock = false;
                                                    break;
                                                }
                                                var servantcfg = Config.ServantCfg.getServantItemById(bLvUpDemandData[0]);
                                                var auraList = servantcfg.aura || [];
                                                var skin_auraList = serObj.getAllSkinAuraList();
                                                var auraVV = 1;
                                                if (auraList[bLvUpDemandData[1]]) {
                                                    auraVV = serObj.aura[bLvUpDemandData[1]];
                                                }
                                                else if (skin_auraList[bLvUpDemandData[1]]) {
                                                    auraVV = serObj.getSkinAuraLevel(bLvUpDemandData[1]);
                                                }
                                                auraVV = auraVV ? auraVV : 0;
                                                needV = bLvUpDemandData[2];
                                                if (auraVV < Number(bLvUpDemandData[2])) {
                                                    unLock = false;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (!unLock) {
                                        return false;
                                    }
                                    else {
                                        var breakGrowNeedList = aura3Data.breakGrowNeed;
                                        var itemList = GameData.formatRewardItem(breakGrowNeedList[curLv - 10]);
                                        var item = itemList[0];
                                        // for (var index = 0; index < itemList.length; index++) {
                                        // let item:RewardItemVo = itemList[index];
                                        var ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
                                        if (ownNum < item.num) {
                                            return false;
                                        }
                                        else {
                                            return true;
                                        }
                                    }
                                }
                            }
                            else {
                                return false;
                            }
                        }
                        for (var index_1 = 0; index_1 < lvUpDemand.length; index_1++) {
                            var element = lvUpDemand[index_1];
                            var elementInfo = element.split("_");
                            var preAura = keysList[elementInfo[0]]; // 
                            var growNeed2 = aura3Data.growNeed2;
                            var resTab = App.StringUtil.splitString(growNeed2, "_");
                            if (this.aura[elementInfo[0]] < elementInfo[1] || Api.itemVoApi.getItemNumInfoVoById(resTab[1]) < Number(resTab[2])) {
                                return false;
                            }
                        }
                        return true;
                    }
                    else {
                        if (aura3Data && Api.switchVoApi.checkOpenNewAura(aura3Data.auraIcon)) {
                            if (aura3Data.maxLv > curLv) {
                                var growNeed2 = aura3Data.growNeed2;
                                var resTab = App.StringUtil.splitString(growNeed2, "_");
                                if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                }
                else {
                    if (cfg.maxLv > this.aura[auraId]) {
                        var growNeed2 = cfg.growNeed2;
                        var resTab = App.StringUtil.splitString(growNeed2, "_");
                        if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                            return true;
                        }
                    }
                    else {
                        if (cfg.breakSwitch && Api.switchVoApi.checkCommonSwitch(cfg.breakSwitch)) {
                            if (cfg.breakMaxlv > this.aura[auraId]) {
                                var breakGrowNeedList = cfg.breakGrowNeed;
                                var itemList = GameData.formatRewardItem(breakGrowNeedList[this.aura[auraId] - 10]);
                                var item = itemList[0];
                                // for (var index = 0; index < itemList.length; index++) {
                                // let item:RewardItemVo = itemList[index];
                                var ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
                                if (ownNum < item.num) {
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        var keysList2 = Object.keys(saura);
        if (keysList2.length > 0) {
            for (var index = 0; index < keysList2.length; index++) {
                var auraId = keysList2[index];
                var aurr = auraId.split("_");
                var cfg = Config.ServantskinCfg.getServantSkinItemById(aurr[0]).aura[auraId]; // servantCfg.aura[auraId];
                {
                    var arlv = this.getSkinAuraLevel(auraId);
                    if (cfg.maxLv > arlv) {
                        var growNeed2 = cfg.growNeed2;
                        var resTab = App.StringUtil.splitString(growNeed2, "_");
                        if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    ServantInfoVo.prototype.getSkinLv = function (skinid) {
        var skinVo = this.skin[skinid];
        if (skinVo) {
            return skinVo.slv;
        }
    };
    ServantInfoVo.prototype.getSkinBookLv = function (skinid, bid) {
        var skinVo = this.skin[skinid];
        if (skinVo) {
            return skinVo.getbookLv(bid);
        }
        return 1;
    };
    ServantInfoVo.prototype.getSkinBookLv2 = function (bid) {
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var skinVo = this.skin[key];
                if (skinVo) {
                    return skinVo.getbookLv(bid);
                }
            }
        }
        return 0;
    };
    /**
     * 获取所有皮肤增加的资质信息
     */
    ServantInfoVo.prototype.getAllSkinProAdd = function () {
        var result = [0, 0, 0, 0];
        for (var key in this.skin) {
            var perSkin = this.getSkinProAdd(key);
            result[0] += perSkin[0];
            result[1] += perSkin[1];
            result[2] += perSkin[2];
            result[3] += perSkin[3];
        }
        return result;
    };
    /**
     * 获取指定皮肤增加的资质信息
     */
    ServantInfoVo.prototype.getSkinProAdd = function (skinId) {
        var result = [0, 0, 0, 0];
        var skinVo = this.skin[skinId];
        if (skinVo) {
            var ability = skinVo.ability;
            for (var key2 in ability) {
                var bookcfg = GameConfig.config.abilityCfg[key2];
                var type = bookcfg.type;
                var num = bookcfg.num;
                var alv = ability[key2]["alv"];
                result[type - 1] += alv * num;
            }
        }
        return result;
    };
    ServantInfoVo.prototype.getSkinNums = function () {
        return Object.keys(this.skin).length;
    };
    ServantInfoVo.prototype.getOwnSkinIdList = function () {
        return Object.keys(this.skin);
    };
    ServantInfoVo.prototype.getSkinInfobyId = function (sid) {
        return this.skin[sid];
    };
    ServantInfoVo.prototype.getAllSkinList = function () {
        var list = [];
        for (var key in this.skin) {
            list.push(this.skin[key]);
        }
        return list;
    };
    ServantInfoVo.prototype.getEquipedSkinBidList = function () {
        if (!this.equip || this.equip == "" || !this.skin[this.equip]) {
            return [];
        }
        var bvo = this.skin[this.equip];
        return bvo.getbookIdList();
    };
    ServantInfoVo.prototype.getAllSkinBidList = function () {
        var list = [];
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var bvo = this.skin[key];
                if (bvo) {
                    list = list.concat(bvo.getbookIdList());
                }
            }
        }
        return list;
    };
    ServantInfoVo.prototype.getSkinAuraLevel = function (aid) {
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var bvo = this.skin[key];
                if (bvo && bvo.aura && bvo.aura["" + aid]) {
                    return bvo.aura["" + aid];
                }
            }
        }
        return 1; //默认1级
    };
    ServantInfoVo.prototype.getAllSkinAuraList = function () {
        var list = {};
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var bvo = this.skin[key];
                if (bvo) {
                    var aidList = bvo.getSkinAuraIdList();
                    for (var key2 in aidList) {
                        if (aidList.hasOwnProperty(key2)) {
                            // var element = aidList[key2];
                            list[key2] = aidList[key2];
                            // list.push(element)
                        }
                    }
                }
            }
        }
        return list;
    };
    ServantInfoVo.prototype.getAbilityIdList = function () {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        var skidList = this.getAllSkinBidList();
        ability = ability.concat(skidList);
        ability.sort(function (dataA, dataB) {
            var tmpAcfgA = GameConfig.config.abilityCfg[dataA];
            var tmpAcfgB = GameConfig.config.abilityCfg[dataB];
            if (tmpAcfgA.type == tmpAcfgB.type) {
                if (tmpAcfgB.num == tmpAcfgA.num) {
                    return Number(dataA) - Number(dataB);
                }
                return tmpAcfgB.num - tmpAcfgA.num;
            }
            return tmpAcfgA.type - tmpAcfgB.type;
        });
        return ability;
    };
    ServantInfoVo.prototype.getAmuletAuraList = function () {
        var list = {};
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var bvo = this.skin[key];
                if (bvo) {
                    var amuletAura = bvo.amuletAura;
                    for (var key2 in amuletAura) {
                        if (amuletAura.hasOwnProperty(key2)) {
                            list[key2] = amuletAura[key2];
                        }
                    }
                }
            }
        }
        return list;
    };
    ServantInfoVo.prototype.isShowRedForAmuletAura = function () {
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var bvo = this.skin[key];
                if (bvo) {
                    var amuletAura = bvo.amuletAura;
                    for (var key2 in amuletAura) {
                        if (amuletAura.hasOwnProperty(key2)) {
                            var lv = amuletAura[key2];
                            var amuBasecfg = Config.AmuletaruaCfg.getAmuletAuraItemById(key2);
                            var lvcfg = amuBasecfg.attrLvList[lv];
                            if (lvcfg && lvcfg.update <= Api.amuletVoApi.getAmuletNum(this.servantId, key2)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    Object.defineProperty(ServantInfoVo.prototype, "AttackNum", {
        /**
         * 门客攻击力
         * 总资质*(lv+100)
         **/
        get: function () {
            return this.getTotalBookValue() * (this.level + 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "HPNum", {
        /**
         * 门客血量
         * 总属性
         */
        get: function () {
            return this.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "activeSkillLevy", {
        /**
         * 已激活经营技能
         */
        get: function () {
            var _skill = Config.SkilllevyCfg.getSkillLevyByServantId(this.servantId);
            if (!_skill)
                return null;
            if (_skill.unlockLevel <= this.level) {
                return _skill;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ServantInfoVo.prototype.dispose = function () {
        this.level = 0;
        this.hasexp = 0;
        this.total = 0;
        this.skillExp = 0;
        this.clv = 0;
        this.ability = {};
        this.skill = [];
        this.abilityExp = 0;
        this.aura = {};
        this.equip = null;
        this.skin = null;
        this.skinred = null;
        if (this.attrVo) {
            this.attrVo.dispose();
            this.attrVo = null;
        }
    };
    return ServantInfoVo;
}(BaseVo));
__reflect(ServantInfoVo.prototype, "ServantInfoVo");
