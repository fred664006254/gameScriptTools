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
 * 门客vo
 * author dmj
 * date 2017/9/22
 * @class ServantInfoVo
 */
var ServantInfoVo = /** @class */ (function (_super) {
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
        _this.skin = {}; //ServantSkinVo[]
        _this.skinred = undefined;
        /**出海时间 */
        _this.banishSt = null;
        //免战状态
        _this.avoid = 0;
        //门客名望
        _this.fame = 0;
        _this.fameLv = 0;
        _this.abilityArr = null;
        return _this;
    }
    ServantInfoVo.prototype.banishEnd = function () {
        App.MessageHelper.dispatchNetMessage("servantbanish");
    };
    ServantInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.banishEt) {
                TimerManager.remove(this.banishEnd, this);
                if (data.banishEt > GameData.serverTime && (data.banishEt - GameData.serverTime) < 86400) {
                    TimerManager.doTimer((data.banishEt - GameData.serverTime) * 1000, 1, this.banishEnd, this);
                }
            }
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
            this.banishSt = null;
            if (data.banishSt != null) {
                if ((data.banishSt + Config.ExileCfg.exileTime * 86400) > GameData.serverTime) {
                    this.banishSt = data.banishSt;
                }
            }
            if (data.avoid != null) {
                this.avoid = data.avoid;
            }
            else {
                this.avoid = 0;
            }
            if (data.fame != null) {
                this.fame = Number(data.fame);
            }
            if (data.fameLv != null) {
                this.fameLv = Number(data.fameLv);
            }
            if (data.abilityArr != null) {
                this.abilityArr = data.abilityArr;
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
    Object.defineProperty(ServantInfoVo.prototype, "cellImgPath", {
        //获取缩小版全身像资源
        get: function () {
            if (!this.equip || this.equip == "") {
                return "servant_cell_" + this.servantId;
            }
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
            return skincfg.cell;
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
    Object.defineProperty(ServantInfoVo.prototype, "qualityCardBg", {
        //获取新版品质框资源
        get: function () {
            return "servanticonbg_" + this.clv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "levelBg", {
        //获取新版等级背景
        get: function () {
            return "servanticon_lvbg_" + this.clv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "cardDecorateBg", {
        //获取新版装饰背景
        get: function () {
            return "servanticonbg_decorate_" + this.clv;
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
                if (this.equip && this.equip != "") {
                    var skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
                    return skinCfg.sound;
                }
                else {
                    var arr = ["effect_servant_" + this.servantId, "effect_servant_" + this.servantId + "_2"];
                    return arr[App.MathUtil.getRandom(0, arr.length)];
                }
            }
            else {
                return "effect_servant_" + this.servantId;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "sound2", {
        get: function () {
            if (Api.switchVoApi.checkOpenNewSound()) {
                if (this.equip && this.equip != "") {
                    var skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
                    return skinCfg.sound2;
                }
                else {
                    return "effect_servant_" + this.servantId;
                }
            }
            else {
                return "effect_servant_" + this.servantId;
            }
        },
        enumerable: true,
        configurable: true
    });
    ServantInfoVo.prototype.isAtMaxLv = function () {
        var servantLvList = Config.ServantBaseCfg.getServantLvList();
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level == topLV && !servantLvList[String(this.clv + 1)]) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isAtTopLv = function () {
        var servantLvList = Config.ServantBaseCfg.getServantLvList();
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isLvEnableForAdvance = function () {
        var servantLvList = Config.ServantBaseCfg.getServantLvList();
        var topLV = servantLvList[String(this.clv)].upLv;
        if (this.level >= topLV && servantLvList[String(this.clv + 1)]) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.isAdvanceEnable = function () {
        if (this.isServantExile()) {
            return false;
        }
        var servantLvList = Config.ServantBaseCfg.getServantLvList();
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
        if (this.isServantExile()) {
            return false;
        }
        var baseCfg = GameConfig.config.servantbaseCfg;
        var skillUpgradeExp = baseCfg.skillUpgradeExp;
        var maxLv = baseCfg.skillLvLimit;
        // baseCfg.servantLvList[String(this.clv)].upLv
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
        if (this.isServantExile()) {
            return false;
        }
        var abilitybaseCfg = GameConfig.config.abilitybaseCfg;
        var typeList = abilitybaseCfg.typeList;
        var numList = abilitybaseCfg.numList;
        var idxList = {};
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var tmpability = servantCfg.ability;
        // let ability = servantCfg.ability
        var ability = this.getAbilityIdList();
        var curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this.clv)];
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var aLv = 1;
            //  this.ability[String(index2)];
            var abilityExp = numList[String(tmpAcfg.num)].abilityExp;
            var needItem = numList[String(tmpAcfg.num)].needItem;
            var oriidx = tmpability.indexOf(aid);
            if (oriidx > -1) {
                aLv = this.ability[String(oriidx)];
            }
            else {
                aLv = this.getSkinBookLv2(aid);
            }
            if (aLv < curClvCfg.abilityLv) {
                var ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
                var ownNum2 = Api.itemVoApi.getItemNumInfoVoById(needItem);
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
        if (this.isServantExile()) {
            return false;
        }
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
                var curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this.clv)];
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
     * 获取该书籍还可以升多少级
     * @param bookid
     */
    ServantInfoVo.prototype.getBookCanLevelUpNum = function (bookid) {
        var servantcfg = GameConfig.config.servantCfg[this.servantId];
        var curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this.clv)];
        var extraLevelMax = 0;
        var dataList = Config.StudyatkCfg.getStudyatkList();
        var studylevel = Api.studyatkVoApi.getStudySkillInfoLv();
        for (var i in dataList) {
            var unit = dataList[i];
            if (Number(i) <= studylevel && Number(unit.ability) == Number(bookid)) {
                extraLevelMax += unit.upLv;
            }
            if (studylevel < Number(i)) {
                break;
            }
        }
        var maxLv = curClvCfg.abilityLv + extraLevelMax;
        if (this.clv > Config.ServantBaseCfg.commonMaxClv()) {
            maxLv = this.level + extraLevelMax;
        }
        var bookextraLevelMax2 = 0;
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            var dataList_1 = Config.WifebattleCfg.getWifeStudyCfgList();
            var statusNum = Api.wifestatusVoApi.getStatusWifeNum();
            var itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
            ; //
            var curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv : 0;
            for (var i in dataList_1) {
                var unit = dataList_1[i];
                var needStatusNum = unit.unlock;
                if (statusNum >= needStatusNum && curLv >= (Number(unit.id) + 1)) {
                    if (Number(bookid) == Number(unit.abilityID) && Number(bookid) == Number(unit.servantID)) {
                        bookextraLevelMax2 += 1;
                    }
                }
            }
            maxLv += bookextraLevelMax2;
        }
        var ability = servantcfg.ability;
        var alv = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            if (aid == bookid) {
                alv = this.ability[index2];
            }
        }
        return maxLv - alv;
    };
    /**
     * 是否在门客列表中显示红点
     */
    ServantInfoVo.prototype.isShowRedInServantList = function () {
        if (this.isServantExile()) {
            return false;
        }
        if ( //Api.servantVoApi.isShowAuralevelUpRedForEnter(this.servantId) ||
        Api.servantVoApi.isShowRedForItem() ||
            this.isAdvanceEnable() || this.isSkillLvUpEnable() ||
            this.isBookLvUpEnable() || this.checkWeaponReddot() ||
            Api.servantVoApi.isShowSkinRedForEnter(this.servantId) || this.isShowRedForaura()) //
         {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.checkWeaponReddot = function () {
        var weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(this.servantId);
        if (weaponvo) {
            return weaponvo.checkCanMakeUp();
        }
        return false;
    };
    ServantInfoVo.prototype.getTotalAttrValye = function (type) {
        if (type == 1) {
            return this.attrVo.forceTotal;
        }
        if (type == 2) {
            return this.attrVo.brainsTotal;
        }
        if (type == 3) {
            return this.attrVo.politicsTotal;
        }
        return this.attrVo.charmTotal;
    };
    ServantInfoVo.prototype.getTotalBookValue = function (type) {
        if (this.abilityArr) {
            if (type) {
                return this.abilityArr[type - 1];
            }
            else {
                var v = 0;
                for (var i = 0; i < this.abilityArr.length; i++) {
                    v += this.abilityArr[i];
                }
                return v;
            }
        }
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        // let ability = this.getAbilityIdList();
        var totalBookV = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            if (type) {
                if (tmpAcfg.type == type) {
                    var aLv = this.ability[String(index2)];
                    totalBookV += aLv * tmpAcfg.num;
                }
            }
            else {
                var aLv = this.ability[String(index2)];
                totalBookV += aLv * tmpAcfg.num;
            }
        }
        var skidList = this.getAllSkinBidList();
        for (var i_1 = 0; i_1 < skidList.length; i_1++) {
            var aid = skidList[i_1];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            if (type) {
                if (tmpAcfg.type == type) {
                    var aLv = this.getSkinBookLv2(aid);
                    if (aLv) {
                        totalBookV += aLv * tmpAcfg.num;
                    }
                }
            }
            else {
                var aLv = this.getSkinBookLv2(aid);
                if (aLv) {
                    totalBookV += aLv * tmpAcfg.num;
                }
            }
        }
        return totalBookV;
    };
    ServantInfoVo.prototype.getAllBookValue = function () {
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        var ability = servantCfg.ability;
        var totalBookV = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var aLv = this.ability[String(index2)];
            totalBookV += aLv * tmpAcfg.num;
        }
        var skidList = this.getAllSkinBidList();
        for (var i = 0; i < skidList.length; i++) {
            var aid = skidList[i];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var aLv = this.getSkinBookLv2(aid);
            if (aLv) {
                totalBookV += aLv * tmpAcfg.num;
            }
        }
        return totalBookV;
    };
    ServantInfoVo.prototype.isShowRedForaura = function () {
        if (this.isServantExile()) {
            return false;
        }
        if (!Api.switchVoApi.checkOpenServantSkinAura()) {
            if (this.checkRedSkinOpenAura()) {
                return true;
            }
            return false;
        }
        var servantCfg = GameConfig.config.servantCfg[this.servantId];
        if (servantCfg.aura) {
            var keysList = Object.keys(servantCfg.aura);
            for (var index = 1; index < keysList.length; index++) {
                var auraId = keysList[index];
                var cfg = servantCfg.aura[auraId];
                if (auraId == "3") {
                    var aura3Data = servantCfg.aura[auraId];
                    var isAura1LvMax = (this.aura['1'] || 0) >= servantCfg.aura['1'].maxLv;
                    var isAura2LvMax = (this.aura['2'] || 0) >= servantCfg.aura['2'].maxLv;
                    var isAura3CanUp = isAura1LvMax && isAura2LvMax;
                    if (aura3Data && Api.switchVoApi.checkOpenNewAura(aura3Data.auraIcon) && isAura3CanUp) {
                        var curLv = this.aura[auraId];
                        if (!curLv) {
                            curLv = 0;
                        }
                        if (aura3Data.maxLv > curLv) {
                            var growNeed2 = aura3Data.growNeed2;
                            var resTab = App.StringUtil.splitString(growNeed2, "_");
                            if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                                return true;
                            }
                        }
                    }
                }
                else if (auraId == "4") {
                    var aura4Data = servantCfg.aura[auraId];
                    if (aura4Data && (Api.switchVoApi.checkOpenNewAura(aura4Data.auraIcon) || Number(this.servantId) > 2018 || Number(this.servantId) < 2001) && Api.servantVoApi.checkAura4CanLevelUp(this.servantId)) {
                        var curLv = this.aura[auraId];
                        if (!curLv) {
                            curLv = 0;
                        }
                        if (aura4Data.maxLv > curLv) {
                            var growNeed2 = aura4Data.growNeed2;
                            var resTab = App.StringUtil.splitString(growNeed2, "_");
                            if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                                return true;
                            }
                        }
                    }
                }
                else {
                    if (cfg.maxLv > this.aura[auraId]) {
                        var growNeed2 = cfg.growNeed2;
                        var resTab = App.StringUtil.splitString(growNeed2, "_");
                        if (Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2])) {
                            return true;
                        }
                    }
                }
            }
            // return false;
        }
        if (this.checkRedSkinOpenAura()) {
            return true;
        }
        return false;
    };
    ServantInfoVo.prototype.checkRedSkinOpenAura = function () {
        var servantcfg = Config.ServantCfg.getServantItemById(this.servantId);
        if (servantcfg.isOpenAuraBySkin()) {
            var skinList = Config.ServantskinCfg.getIdListBySerVantId(this.servantId);
            for (var i = 0; i < skinList.length; i++) {
                if (Api.servantVoApi.isOwnSkinOfSkinId(skinList[i])) {
                    var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                    if (servantSkinCfg.specialAura) {
                        var servantskinAuraCfg = servantSkinCfg.specialAuraCfg;
                        var servant = Api.servantVoApi.getServantObj(this.servantId);
                        var skinvo = servant.skin[Number(servantSkinCfg.id)];
                        var auarV = 0;
                        if (skinvo) {
                            auarV = skinvo.specialAura;
                        }
                        if (!auarV) {
                            auarV = 1;
                        }
                        if (auarV < servantskinAuraCfg.specialAuraLvMax) {
                            var ownNum = Api.itemVoApi.getItemNumInfoVoById(servantskinAuraCfg.specialAuraLvNeed);
                            var need = servantskinAuraCfg.specialAuraLvNeedNum[auarV - 1];
                            if (ownNum >= need) {
                                return true;
                            }
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
        var level = 0;
        for (var key in this.skin) {
            if (this.skin.hasOwnProperty(key)) {
                var skinVo = this.skin[key];
                if (skinVo && skinVo.getbookLv(bid) > 0) {
                    level = skinVo.getbookLv(bid);
                }
            }
        }
        return level;
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
    ServantInfoVo.prototype.getskinBookLv = function (skinId, bookLv) {
        var skinVo = this.skin[skinId];
        if (skinVo) {
            return skinVo.getbookLv(bookLv);
        }
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
    ServantInfoVo.prototype.isSkinAbility = function (bid) {
        if (GameData.isInArray(bid, this.getAllSkinBidList())) {
            return true;
        }
        return false;
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
    /**门客是否出海中 */
    ServantInfoVo.prototype.isServantExile = function () {
        if (Api.switchVoApi.checkOpenExile()) {
            if (this.banishSt && (this.banishSt + Config.ExileCfg.exileTime * 86400) > GameData.serverTime) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(ServantInfoVo.prototype, "book0", {
        get: function () {
            return this.getTotalBookValue(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "book1", {
        get: function () {
            return this.getTotalBookValue(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "book2", {
        get: function () {
            return this.getTotalBookValue(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "book3", {
        get: function () {
            return this.getTotalBookValue(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServantInfoVo.prototype, "book4", {
        get: function () {
            return this.getTotalBookValue(0);
        },
        enumerable: true,
        configurable: true
    });
    ServantInfoVo.prototype.getTotalByWeaponSpecial = function (s) {
        var v = this.total;
        var weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(this.servantId);
        if (weaponvo) {
            v += weaponvo.getSpecialityByType(s);
        }
        return v;
    };
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
        this.abilityArr = null;
        if (this.attrVo) {
            this.attrVo.dispose();
            this.attrVo = null;
        }
        TimerManager.remove(this.banishEnd, this);
    };
    return ServantInfoVo;
}(BaseVo));
//# sourceMappingURL=ServantInfoVo.js.map