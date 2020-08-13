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
 * 门客系统api
 * author dmj
 * date 2017/9/22
 * @class ServantVoApi
 */
var ServantVoApi = /** @class */ (function (_super) {
    __extends(ServantVoApi, _super);
    function ServantVoApi() {
        var _this = _super.call(this) || this;
        _this.isShowAtkraceGuide = false;
        _this.isCheckGuide = false;
        _this.showSkinId = null;
        _this.showSkinId2 = null;
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
    ServantVoApi.prototype.setWaitShowData2 = function (data) {
        this.waitShowData2 = data;
    };
    ServantVoApi.prototype.getWaitShowDat2 = function () {
        var data = this.waitShowData2;
        this.waitShowData2 = null;
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
    /**
     * 门客排序
     * sortType  1 默认排序  2 总属性排序 3 等级排序 4 资质排序 5 总属性倒序排序
     */
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
    /**
     * 主线任务
     */
    ServantVoApi.prototype.getMainTaskNeedServant = function (type) {
        var taskId = Api.mainTaskVoApi.getCurMainTaskId();
        if (!taskId) {
            return null;
        }
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (taskCfg && taskCfg.questType && taskCfg.questType == type) {
            var servantListObj = this.servantVo.servantInfoVoObj;
            if (type == 202) {
                //至少x名门客等级达到x级 获取最接近所需等级的门客
                var lv = 0;
                var id = 0;
                for (var key in servantListObj) {
                    var servantLv = Number(servantListObj[key].level);
                    if (servantLv < taskCfg.need) {
                        if (id == 0) {
                            id = Number(key);
                            lv = servantLv;
                        }
                        else {
                            if (servantLv > lv) {
                                id = Number(key);
                                lv = servantLv;
                            }
                            else if (servantLv == lv) {
                                if (Number(key) > id) {
                                    id = Number(key);
                                    lv = servantLv;
                                }
                            }
                        }
                    }
                }
                if (id) {
                    return String(id);
                }
            }
            else if (type == 205) {
                var maxAttrId = this.getIdOfTotalMax();
                var baseCfg = GameConfig.config.servantbaseCfg;
                var maxLv = baseCfg.skillLvLimit;
                var skill = this.getServantObj(maxAttrId).skill;
                if (skill && skill.length > 1 && (skill[0] < maxLv || skill[1] < maxLv)) {
                    return maxAttrId;
                }
                return null;
            }
            else if (type == 206) {
                //爵位提升
                var needClv = taskCfg.need;
                // let servantLvList = Config.ServantBaseCfg.getServantLvList();
                // let topLV = servantLvList[String(needClv-1)].upLv;
                var lv = 0;
                var id = 0;
                for (var key in servantListObj) {
                    if (servantListObj[key].clv < needClv) {
                        var servantLv = Number(servantListObj[key].level);
                        if (id == 0) {
                            id = Number(key);
                            lv = servantLv;
                        }
                        else {
                            if (servantLv > lv) {
                                id = Number(key);
                                lv = servantLv;
                            }
                            else if (servantLv == lv) {
                                if (Number(key) > id) {
                                    id = Number(key);
                                    lv = servantLv;
                                }
                            }
                        }
                    }
                }
                if (id) {
                    return String(id);
                }
            }
        }
        return null;
    };
    /**获取id最靠前的门客 */
    ServantVoApi.prototype.getServantMinId = function () {
        var servantListObj = this.servantVo.servantInfoVoObj;
        var id = 0;
        for (var key in servantListObj) {
            if (id == 0) {
                id = Number(key);
            }
            else {
                if (Number(key) > id) {
                    id = Number(key);
                }
            }
        }
        return String(id);
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
            if (Api.switchVoApi.checkOpenExile()) {
                keys.sort(function (a, b) {
                    var servantA = _this.servantVo.servantInfoVoObj[a];
                    var servantB = _this.servantVo.servantInfoVoObj[b];
                    if (servantA.banishSt && (!servantB.banishSt)) {
                        return 1;
                    }
                    else if (servantA.banishSt && servantB.banishSt) {
                        return Number(servantA.servantId) - Number(servantB.servantId);
                    }
                    else if ((!servantA.banishSt) && servantB.banishSt) {
                        return -1;
                    }
                    else if ((!servantA.banishSt) && (!servantB.banishSt)) {
                        return Number(servantA.servantId) - Number(servantB.servantId);
                    }
                });
            }
        }
        //总属性排序
        else if (sortType == 2) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (Api.switchVoApi.checkOpenExile()) {
                    if (servantA.banishSt && (!servantB.banishSt)) {
                        return 1;
                    }
                    else if (servantA.banishSt && servantB.banishSt) {
                        if (servantA.total == servantB.total) {
                            return Number(b) - Number(a);
                        }
                        else {
                            if (Number(servantB.total) == Number(servantA.total)) {
                                return Number(b) - Number(a);
                            }
                            return Number(servantB.total) - Number(servantA.total);
                        }
                    }
                    else if ((!servantA.banishSt) && servantB.banishSt) {
                        return -1;
                    }
                    else if ((!servantA.banishSt) && (!servantB.banishSt)) {
                        if (servantA.total == servantB.total) {
                            return Number(b) - Number(a);
                        }
                        else {
                            if (Number(servantB.total) == Number(servantA.total)) {
                                return Number(b) - Number(a);
                            }
                            return Number(servantB.total) - Number(servantA.total);
                        }
                    }
                }
                else {
                    if (servantA.total == servantB.total) {
                        return Number(b) - Number(a);
                    }
                    else {
                        if (Number(servantB.total) == Number(servantA.total)) {
                            return Number(b) - Number(a);
                        }
                        return Number(servantB.total) - Number(servantA.total);
                    }
                }
                // return 0;
            });
        }
        //资质排序, 第一版不做
        else if (sortType == 4) {
            // 
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                var bookAv = servantA.getTotalBookValue();
                var bookBv = servantB.getTotalBookValue();
                // if(servantA.servantId&&servantA.skinred)
                // {
                // 	let numZ =this.getSkNum(servantA.servantId);
                // 	bookAv+=numZ;
                // }
                // if(servantB.servantId&&servantB.skinred)
                // { 
                // 	let numZ =this.getSkNum(servantB.servantId);
                // 	bookBv+=numZ;
                // } 
                if (Api.switchVoApi.checkOpenExile()) {
                    if (servantA.banishSt && (!servantB.banishSt)) {
                        return 1;
                    }
                    else if (servantA.banishSt && servantB.banishSt) {
                        if (bookAv == bookBv) {
                            return Number(b) - Number(a);
                        }
                        else {
                            if (bookBv == bookAv) {
                                return Number(b) - Number(a);
                            }
                            return bookBv - bookAv;
                        }
                    }
                    else if ((!servantA.banishSt) && servantB.banishSt) {
                        return -1;
                    }
                    else if ((!servantA.banishSt) && (!servantB.banishSt)) {
                        if (bookAv == bookBv) {
                            return Number(b) - Number(a);
                        }
                        else {
                            if (bookBv == bookAv) {
                                return Number(b) - Number(a);
                            }
                            return bookBv - bookAv;
                        }
                    }
                }
                else {
                    if (bookAv == bookBv) {
                        return Number(b) - Number(a);
                    }
                    else {
                        if (bookBv == bookAv) {
                            return Number(b) - Number(a);
                        }
                        return bookBv - bookAv;
                    }
                }
                // return 0;
            });
        }
        //资质排序，无视出海
        else if (sortType == 6) {
            // 
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                var bookAv = servantA.getTotalBookValue();
                var bookBv = servantB.getTotalBookValue();
                if (bookAv == bookBv) {
                    return Number(a) - Number(b);
                }
                else {
                    if (bookBv == bookAv) {
                        return Number(b) - Number(a);
                    }
                    return bookBv - bookAv;
                }
            });
        }
        //等级排序
        else if (sortType == 3) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (Api.switchVoApi.checkOpenExile()) {
                    if (servantA.banishSt && (!servantB.banishSt)) {
                        return 1;
                    }
                    else if (servantA.banishSt && servantB.banishSt) {
                        if (servantA.level == servantB.level) {
                            return Number(b) - Number(a);
                        }
                        else {
                            if (Number(servantB.level) == Number(servantA.level)) {
                                return Number(b) - Number(a);
                            }
                            return Number(servantB.level) - Number(servantA.level);
                        }
                    }
                    else if ((!servantA.banishSt) && servantB.banishSt) {
                        return -1;
                    }
                    else if ((!servantA.banishSt) && (!servantB.banishSt)) {
                        if (servantA.level == servantB.level) {
                            return Number(b) - Number(a);
                        }
                        else {
                            if (Number(servantB.level) == Number(servantA.level)) {
                                return Number(b) - Number(a);
                            }
                            return Number(servantB.level) - Number(servantA.level);
                        }
                    }
                }
                else {
                    if (servantA.level == servantB.level) {
                        return Number(b) - Number(a);
                    }
                    else {
                        if (Number(servantB.level) == Number(servantA.level)) {
                            return Number(b) - Number(a);
                        }
                        return Number(servantB.level) - Number(servantA.level);
                    }
                }
                // return 0;
            });
        }
        //	总属性倒序排序
        else if (sortType == 5) {
            keys.sort(function (a, b) {
                var servantA = _this.servantVo.servantInfoVoObj[a];
                var servantB = _this.servantVo.servantInfoVoObj[b];
                if (Api.switchVoApi.checkOpenExile()) {
                    if (servantA.banishSt && (!servantB.banishSt)) {
                        return 1;
                    }
                    else if (servantA.banishSt && servantB.banishSt) {
                        if (servantA.total == servantB.total) {
                            return Number(a) - Number(b);
                        }
                        else {
                            if (Number(servantB.total) == Number(servantA.total)) {
                                return Number(a) - Number(b);
                            }
                            return Number(servantA.total) - Number(servantB.total);
                        }
                    }
                    else if ((!servantA.banishSt) && servantB.banishSt) {
                        return -1;
                    }
                    else if ((!servantA.banishSt) && (!servantB.banishSt)) {
                        if (servantA.total == servantB.total) {
                            return Number(a) - Number(b);
                        }
                        else {
                            if (Number(servantB.total) == Number(servantA.total)) {
                                return Number(a) - Number(b);
                            }
                            return Number(servantA.total) - Number(servantB.total);
                        }
                    }
                }
                else {
                    if (servantA.total == servantB.total) {
                        return Number(a) - Number(b);
                    }
                    else {
                        if (Number(servantB.total) == Number(servantA.total)) {
                            return Number(a) - Number(b);
                        }
                        return Number(servantA.total) - Number(servantB.total);
                    }
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
            if (Api.switchVoApi.checkOpenExile()) {
                if (servantA.banishSt && (!servantB.banishSt)) {
                    return 1;
                }
                else if (servantA.banishSt && servantB.banishSt) {
                    if (valueA == valueB) {
                        return Number(Number(b) - Number(a));
                    }
                    else {
                        return Number(valueB - valueA);
                    }
                }
                else if ((!servantA.banishSt) && servantB.banishSt) {
                    return -1;
                }
                else if ((!servantA.banishSt) && (!servantB.banishSt)) {
                    if (valueA == valueB) {
                        return Number(Number(b) - Number(a));
                    }
                    else {
                        return Number(valueB - valueA);
                    }
                }
            }
            else {
                if (valueA == valueB) {
                    return Number(Number(b) - Number(a));
                }
                else {
                    return Number(valueB - valueA);
                }
            }
        });
        return keys;
    };
    //皮肤加成
    ServantVoApi.prototype.getSkNum = function (servantId) {
        var Obj = this.getServantObj(servantId);
        var numZ = 0;
        if (Obj && Obj.skin) {
            for (var key in Obj.skin) {
                var skinVo = Obj.skin[key];
                numZ += skinVo.getSkinBookNum(servantId);
            }
        }
        return numZ;
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
        //  Api.servantVoApi.getServantForceTotalById(servantId)
        var value = infoVo.attrVo.forceTotal + infoVo.level * 5000 * this.getServantForceTotalById(servantId);
        return value;
    };
    /**
     * 获取门客战斗力
     *  	包含神器特殊加成
     */
    ServantVoApi.prototype.getServantCombatWithIdContentsWeapon = function (servantId, weapontype) {
        var value = this.getServantCombatWithId(servantId);
        var weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        if (weaponvo) {
            value += weaponvo.getSpecialityByType(weapontype);
        }
        return value;
    };
    /**
     * 获取门客武力资质
     * @param servantId
     */
    ServantVoApi.prototype.getServantForceTotalById = function (servantId) {
        var vo = this.servantVo.servantInfoVoObj[servantId];
        if (vo) {
            return vo.getTotalBookValue(1);
        }
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
        // let weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        // if (weaponVo && weaponVo.attr[0])
        // {
        // 	value +=weaponVo.attr[0];
        // }
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
    /**门客的综合资质不包含皮肤 */
    ServantVoApi.prototype.getServantAptitude = function (servantId) {
        var servantCfg = GameConfig.config.servantCfg[servantId];
        var ability = servantCfg.ability;
        var starNum = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var tmpAcfg = GameConfig.config.abilityCfg[ability[index2]];
            starNum += tmpAcfg.num;
        }
        return starNum;
    };
    ServantVoApi.prototype.getFullImgPathWithId = function (servantId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            return servant.fullImgPath;
        }
        return null;
    };
    /**
     * 门客的骨骼动画
     */
    ServantVoApi.prototype.getServantBoneId = function (servantId) {
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            if ("1034" == String(servantId) && PlatformManager.checkIsRuLang() == false) {
                return null;
            }
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
     * 大于60级尚未出海门客数量
     */
    ServantVoApi.prototype.getServantCountLevel60PlusNotExile = function () {
        var count = 0;
        var needLv = Config.AtkraceCfg.getServantLv();
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.level >= needLv && !servant.isServantExile()) {
                count++;
            }
        }
        return count;
    };
    ServantVoApi.prototype.getServantCountExiled = function () {
        var count = 0;
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.isServantExile()) {
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
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
            if (Api.encounterVoApi.isShowNpc()) {
                return true;
            }
        }
        if (Api.servantExileVoApi.getExileBuffRed()) {
            return true;
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
    ServantVoApi.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("servant", 0);
    };
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
    ServantVoApi.prototype.getSerSkinBookId2 = function (skinId, bookId) {
        var servantId = Config.ServantskinCfg.getServantSkinItemById("" + skinId).servantId;
        var servant = this.servantVo.servantInfoVoObj[servantId];
        if (servant) {
            return servant.getSkinBookLv2(bookId);
        }
        return 0;
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
    ServantVoApi.prototype.isShowAuralevelUpRedForEnter = function (servantId) {
        if (Api.switchVoApi.checkOpenExile()) {
            if (Api.servantExileVoApi.getServantExileInfoForServantId(servantId)) {
                return false;
            }
        }
        if (!Api.switchVoApi.checkOpenServantSkinAura()) {
            return false;
        }
        var servant = this.servantVo.servantInfoVoObj[servantId];
        var skinList = servant.getOwnSkinIdList();
        if (skinList && skinList.length) {
            for (var i in skinList) {
                var unit = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                for (var j in unit.aura) {
                    var skinvo = servant.getSkinInfobyId(skinList[i]);
                    var level = skinvo.getSkinAuraLv(Number(j) - 1);
                    var temp = unit.aura[j];
                    var havenum = Api.itemVoApi.getItemNumInfoVoById(temp.growNeed);
                    if (havenum >= temp.growNumNeed[level]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ServantVoApi.prototype.isShowAuralevelUpRed = function (servantId, skinId) {
        if (Api.switchVoApi.checkOpenExile()) {
            if (Api.servantExileVoApi.getServantExileInfoForServantId(servantId)) {
                return false;
            }
        }
        if (!Api.switchVoApi.checkOpenServantSkinAura()) {
            return false;
        }
        var servant = this.servantVo.servantInfoVoObj[servantId];
        var unit = Config.ServantskinCfg.getServantSkinItemById(skinId);
        if (unit) {
            for (var j in unit.aura) {
                var skinvo = servant.getSkinInfobyId(skinId);
                if (skinvo) {
                    var level = skinvo.getSkinAuraLv(Number(j) - 1);
                    var temp = unit.aura[j];
                    var havenum = Api.itemVoApi.getItemNumInfoVoById(temp.growNeed);
                    if (havenum >= temp.growNumNeed[level]) {
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
     * 通过皮肤来找门客信息
     */
    ServantVoApi.prototype.getHaveServantForSerVantSkinId = function (skinId) {
        var skcfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var servanInfo = this.getServantObj(skcfg.servantId);
        return servanInfo;
    };
    /**
     * 第四级光环需要4位门客的3级光环全部满级
     */
    ServantVoApi.prototype.checkAura4CanLevelUp = function (servantId) {
        var lv4Aura = 4;
        var servantNum = 0;
        // let needLv = 0
        var lv3MaxLv = 0;
        var serIdList = [];
        var haveSerNum = 0;
        var cfg = Config.ServantCfg.servantListCfg;
        var servantCfg = Config.ServantCfg.getServantItemById(servantId);
        var lastAuraIcon = servantCfg.aura[lv4Aura - 1].auraIcon;
        for (var key in cfg) {
            if (cfg.hasOwnProperty(key)) {
                var element = cfg[key];
                if (element.aura && element.aura[String(lv4Aura - 1)] && element.aura[String(lv4Aura - 1)].auraIcon == lastAuraIcon) {
                    servantNum += 1;
                    // needLv += element.aura[2].maxLv;
                    lv3MaxLv = element.aura[String(lv4Aura - 1)].maxLv;
                    serIdList.push(element.id);
                }
            }
        }
        for (var i = 0; i < serIdList.length; i++) {
            var serId = serIdList[i];
            var serObj = this.getServantObj(serId);
            if (serObj && serObj.aura[String(lv4Aura - 1)] && serObj.aura[String(lv4Aura - 1)] == lv3MaxLv) {
                haveSerNum += 1;
            }
            else {
                return false;
            }
        }
        if (haveSerNum == servantNum) {
            return true;
        }
        return false;
    };
    /**
     * 第四级光环需要开启3光环,并且至少有一位3级光环满级
     */
    ServantVoApi.prototype.checkAura4CanShow = function (servantId) {
        var lv4Aura = 4;
        var serIdList = [];
        var cfg = Config.ServantCfg.servantListCfg;
        var servantCfg = Config.ServantCfg.getServantItemById(servantId);
        var lastAuraIcon = servantCfg.aura[lv4Aura - 1].auraIcon;
        var lv3MaxLv = servantCfg.aura[lv4Aura - 1].maxLv;
        for (var key in cfg) {
            if (cfg.hasOwnProperty(key)) {
                var element = cfg[key];
                if (element.aura && element.aura[String(lv4Aura - 1)] && element.aura[String(lv4Aura - 1)].auraIcon == lastAuraIcon) {
                    serIdList.push(element.id);
                }
            }
        }
        for (var i = 0; i < serIdList.length; i++) {
            var serId = serIdList[i];
            var serObj = this.getServantObj(serId);
            if (serObj && serObj.aura[String(lv4Aura - 1)] && serObj.aura[String(lv4Aura - 1)] == lv3MaxLv) {
                return true;
            }
        }
        return false;
    };
    /**
     * 门客角标特效
     */
    ServantVoApi.prototype.getCornerMarkerContainer = function (q) {
        var container = new BaseDisplayObjectContainer();
        var cornerImg = BaseLoadBitmap.create("servanticon_corner" + q);
        cornerImg.width = 52;
        cornerImg.height = 52;
        container.addChild(cornerImg);
        if (q >= 3) {
            var fameCount = 12;
            var cornerEffect = ComponentManager.getCustomMovieClip('servant_rankeffect' + q + '_', fameCount);
            cornerEffect.setPosition(cornerImg.x - 24, cornerImg.y - 24);
            cornerEffect.blendMode = egret.BlendMode.ADD;
            container.addChild(cornerEffect);
            cornerEffect.playWithTime(0);
        }
        return container;
    };
    //门客出海 总资质 总属性
    ServantVoApi.prototype.getServantExiledAttr = function () {
        var attr = [0, 0];
        for (var key in this.servantVo.servantInfoVoObj) {
            var servant = this.servantVo.servantInfoVoObj[key];
            if (servant.isServantExile()) {
                attr[0] += servant.getTotalBookValue();
                attr[1] += servant.total;
            }
        }
        return attr;
    };
    //门客出海buff string
    ServantVoApi.prototype.getExileBuffStrings = function () {
        var strings = [];
        var attr = this.getServantExiledAttr();
        var cfg = Config.ExileCfg.buff2;
        var mycfg = null;
        var exileNum = Api.servantExileVoApi.getUseSeatNumber();
        for (var i = 0; i < cfg.length; i++) {
            var onecfg = cfg[i];
            if (exileNum >= onecfg.exileNum) {
                mycfg = onecfg;
            }
            else {
                break;
            }
        }
        // mycfg = cfg[6];
        if (mycfg) {
            var bufftypes = mycfg.playType;
            for (var k in bufftypes) {
                var onetype = bufftypes[k];
                var name_1 = LanguageManager.getlocal("exileBuff_type" + onetype);
                var value1 = 0;
                if (mycfg.atkAdd1) {
                    value1 = mycfg.atkAdd1;
                }
                var value2 = 0;
                if (mycfg.atkAdd2) {
                    value2 = Math.floor(100 * mycfg.atkAdd2 + 0.5);
                }
                if (value1 > 0) {
                    var str1 = LanguageManager.getlocal("exileBuff_fleet_add1", [name_1, String(value1)]);
                    strings.push(str1);
                }
                if (value2 > 0) {
                    var str1 = LanguageManager.getlocal("exileBuff_fleet_add2", [name_1, String(value2)]);
                    strings.push(str1);
                }
            }
        }
        return strings;
    };
    //单个门客出海buff string
    ServantVoApi.prototype.getOneExileBuffStrings = function (sid) {
        var strings = [];
        var attr = [0, 0];
        if (sid && this.servantVo.servantInfoVoObj[sid]) {
            var oneVo = this.servantVo.servantInfoVoObj[sid];
            attr = [oneVo.getTotalBookValue(), oneVo.total];
        }
        var cfg = Config.ExileCfg.buff1;
        for (var i = 0; i < cfg.length; i++) {
            var onecfg = cfg[i];
            var value1 = onecfg.atkBase + attr[0] * 100 * onecfg.atkRatio;
            // let value2 = onecfg.hpBase + attr[1] * 100 * onecfg.hpRatio;
            var name_2 = LanguageManager.getlocal("exileBuff_type" + onecfg.playType);
            var str0 = LanguageManager.getlocal("exileBuff_choose_itemtitle", [name_2]);
            var str1 = LanguageManager.getlocal("exileBuff_fleet_add1", [name_2, String(value1)]);
            // let str2 = LanguageManager.getlocal("exileBuff_fleet_add2",[name,String(value2)]);
            strings.push([str0, str1]);
        }
        return strings;
    };
    ServantVoApi.prototype.getAvoidNum = function () {
        var list = this.getServantInfoListWithSort(0);
        var servantId;
        var count = 0;
        for (var i = 0; i < list.length; i++) {
            servantId = list[i].servantId;
            if (Api.servantVoApi.getServantObj(servantId) && Api.servantVoApi.getServantObj(list[i].servantId).avoid == 2) {
                count++;
            }
        }
        return count;
    };
    ServantVoApi.prototype.dispose = function () {
        this.isShowAtkraceGuide = false;
        this.isCheckGuide = false;
        this.waitShowData = null;
        this.waitShowData2 = null;
        this.showSkinId = null;
        this.showSkinId2 = null;
        _super.prototype.dispose.call(this);
    };
    return ServantVoApi;
}(BaseVoApi));
//# sourceMappingURL=ServantVoApi.js.map