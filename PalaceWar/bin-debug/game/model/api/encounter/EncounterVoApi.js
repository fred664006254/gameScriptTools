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
var EncounterVoApi = (function (_super) {
    __extends(EncounterVoApi, _super);
    function EncounterVoApi() {
        return _super.call(this) || this;
    }
    EncounterVoApi.prototype.formatData = function (data) {
        _super.prototype.formatData.call(this, data);
    };
    //获取对应系列已激活的缘分个数
    EncounterVoApi.prototype.getActiveBuffNum = function (type) {
        var num = 0;
        if (this.encounterVo.info && this.encounterVo.info[type] && this.encounterVo.info[type].lv) {
            num = this.encounterVo.info[type].lv;
        }
        return Number(num);
    };
    //获取对应系列位置是否已激活
    EncounterVoApi.prototype.getActiveBuffIndex = function (type, index) {
        var flag = false;
        if (this.encounterVo.info && this.encounterVo.info[type] && this.encounterVo.info[type].eIndex) {
            if (this.encounterVo.info[type].eIndex.indexOf(Number(index)) > -1) {
                flag = true;
            }
        }
        return flag;
    };
    //获取对应系列的门客情况
    EncounterVoApi.prototype.getNeedInfo = function (type, id) {
        var obj = null;
        for (var i in Config.EncounterCfg.encounterList) {
            var unit = Config.EncounterCfg.encounterList[i];
            var need = unit.need;
            if (type == unit.type) {
                for (var j in need) {
                    var rewardvo = GameData.formatRewardItem(need[j])[0];
                    var sid = rewardvo.id.toString();
                    if (sid == id.toString()) {
                        var iswife = false;
                        var isservant = false;
                        var iswifeskin = false;
                        var isservantskin = false;
                        var name_1 = "";
                        var isopen = false;
                        var have = false;
                        if (rewardvo.type == 8) {
                            //门客
                            if (Api.servantVoApi.getServantObj(rewardvo.id.toString())) {
                                have = true;
                            }
                            isservant = true;
                            name_1 = Config.ServantCfg.getServantItemById(sid).name;
                            isopen = !Config.ServantCfg.checkIsLockedByGM(sid);
                        }
                        else if (rewardvo.type == 10) {
                            //红颜
                            if (Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())) {
                                have = true;
                            }
                            iswife = true;
                            name_1 = Config.WifeCfg.getWifeCfgById(sid).name;
                            isopen = !Config.WifeCfg.checkIsLockedByGM(sid);
                        }
                        else if (rewardvo.type == 16) {
                            //红颜皮肤
                            if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                                have = true;
                            }
                            iswifeskin = true;
                            var wifeid = Config.WifeskinCfg.getWifeCfgById(sid).wifeId;
                            name_1 = Config.WifeCfg.getWifeCfgById(wifeid).name;
                            isopen = Config.WifeskinCfg.isSkinOPend(sid);
                        }
                        else if (rewardvo.type == 19) {
                            //门客皮肤
                            if (Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                                have = true;
                            }
                            isservantskin = true;
                            var servantid = Config.ServantskinCfg.getServantSkinItemById(sid).servantId;
                            name_1 = Config.ServantCfg.getServantItemById(servantid).name;
                            isopen = Api.switchVoApi.checkIsServantSkinState(sid);
                        }
                        obj = {
                            isopen: isopen,
                            have: have,
                            name: name_1,
                            iswife: iswife,
                            isservant: isservant,
                            iswifeskin: iswifeskin,
                            isservantskin: isservantskin,
                        };
                        break;
                    }
                }
                break;
            }
        }
        return obj;
    };
    EncounterVoApi.prototype.checkRed = function (type) {
        var cfg = Config.EncounterCfg.encounterList;
        var flag = false;
        for (var i in cfg) {
            if (cfg[i].type == type) {
                if (Api.switchVoApi.checkOpenQingYuan(type)) {
                    var need = cfg[i].need;
                    var have = 0;
                    for (var i_1 in need) {
                        var rewardvo = GameData.formatRewardItem(need[i_1])[0];
                        if (rewardvo.type == 8) {
                            //门客
                            if (Api.servantVoApi.getServantObj(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                        else if (rewardvo.type == 10) {
                            //红颜
                            if (Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                        else if (rewardvo.type == 16) {
                            //红颜皮肤
                            if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                        else if (rewardvo.type == 19) {
                            //门客皮肤
                            if (Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                    }
                    if (this.getActiveBuffNum(type) < have) {
                        flag = true;
                    }
                }
                break;
            }
        }
        return flag;
    };
    //进度档位排序
    EncounterVoApi.prototype.getSortProcessData = function (type, data) {
        var currHave = this.getActiveBuffNum(type);
        var maxNum = 999;
        var list = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].id <= currHave) {
                data[i].sortId = maxNum + data[i].id;
            }
            else if (data[i].id == currHave + 1) {
                data[i].sortId = data[i].id - maxNum;
            }
            else {
                data[i].sortId = data[i].id;
            }
            list.push(data[i]);
        }
        if (list.length > 1) {
            list.sort(function (a, b) { return a.sortId - b.sortId; });
        }
        return list;
    };
    //可解锁
    EncounterVoApi.prototype.getCurrCanGetIndex = function (type) {
        var cfg = Config.EncounterCfg.encounterList;
        for (var i in cfg) {
            if (cfg[i].type == type) {
                if (Api.switchVoApi.checkOpenQingYuan(type)) {
                    var need = cfg[i].need;
                    var have = 0;
                    for (var i_2 in need) {
                        if (!this.getActiveBuffIndex(type, Number(i_2) + 1)) {
                            var rewardvo = GameData.formatRewardItem(need[i_2])[0];
                            var info = Api.encounterVoApi.getNeedInfo(type, rewardvo.id.toString());
                            if (info.isopen && info.have) {
                                return Number(i_2) + 1;
                            }
                        }
                    }
                }
                break;
            }
        }
        return null;
    };
    //当前已拥有的数量
    EncounterVoApi.prototype.getCurrHaveNum = function (type) {
        var cfg = Config.EncounterCfg.encounterList;
        var flag = false;
        for (var i in cfg) {
            if (cfg[i].type == type) {
                if (Api.switchVoApi.checkOpenQingYuan(type)) {
                    var need = cfg[i].need;
                    var have = 0;
                    for (var i_3 in need) {
                        var rewardvo = GameData.formatRewardItem(need[i_3])[0];
                        if (rewardvo.type == 8) {
                            //门客
                            if (Api.servantVoApi.getServantObj(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                        else if (rewardvo.type == 10) {
                            //红颜
                            if (Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                        else if (rewardvo.type == 16) {
                            //红颜皮肤
                            if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                        else if (rewardvo.type == 19) {
                            //门客皮肤
                            if (Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                                ++have;
                            }
                        }
                    }
                    return have;
                }
                break;
            }
        }
        return 0;
    };
    //某一种类是否有红点
    EncounterVoApi.prototype.checkRedByKind = function (kind) {
        var kindData = this.getEncountCfgByKind(kind);
        for (var i = 0; i < kindData.length; i++) {
            if (this.checkRedByType(kindData[i].type)) {
                return true;
            }
        }
        return false;
    };
    //某一情缘类型是否有红点
    EncounterVoApi.prototype.checkRedByType = function (type) {
        var cfg = Config.EncounterCfg.encounterList;
        var data = null;
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].type == type) {
                data = cfg[i];
                break;
            }
        }
        if (data.kind == 1 || data.kind == 2) {
            if (Api.switchVoApi.checkOpenQingyuanServantAndWifePage()) {
                if (data.kind == 1) {
                    if (!this.checkShowServantFlag()) {
                        return false;
                    }
                }
                else if (data.kind == 2) {
                    if (!this.checkShowWifeFlag()) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        var getNum = this.getActiveBuffNum(type);
        if (data.collect.length > 0) {
            var currHaveNum = this.getCurrHaveNum(type);
            if (currHaveNum > getNum) {
                return true;
            }
        }
        if (data.task.length > 0) {
            var need = data.need;
            for (var i = 0; i < data.task.length; i++) {
                var tmpData = data.task[i];
                if (!this.getActiveBuffIndex(type, tmpData.id)) {
                    var flag = true;
                    for (var k = 0; k < need.length; k++) {
                        var attrNum = this.getAttrById(need[k], tmpData.type);
                        if (attrNum < tmpData.task_Value) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    //获取某一类型两种任务都有的情况
    EncounterVoApi.prototype.checkRedIndexByType = function (type) {
        var cfg = Config.EncounterCfg.encounterList;
        var data = null;
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].type == type) {
                data = cfg[i];
                break;
            }
        }
        var type1 = 0;
        var type2 = 0;
        var getNum = this.getActiveBuffNum(type);
        if (data.collect.length > 0) {
            var currHaveNum = this.getCurrHaveNum(type);
            if (currHaveNum > getNum) {
                type1 = 1;
            }
        }
        if (data.task.length > 0) {
            if (data.collect.length > 0) {
                if (getNum < data.collect[data.collect.length - 1].id) {
                    return { type1: type1, type2: 0 };
                }
            }
            var need = data.need;
            for (var i = 0; i < data.task.length; i++) {
                var tmpData = data.task[i];
                if (!this.getActiveBuffIndex(type, tmpData.id)) {
                    var flag = true;
                    for (var k = 0; k < need.length; k++) {
                        var attrNum = this.getAttrById(need[k], tmpData.type);
                        if (attrNum < tmpData.task_Value) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        type2 = 1;
                        break;
                    }
                }
            }
        }
        return { type1: type1, type2: type2 };
    };
    //情缘任务某一档位进度
    EncounterVoApi.prototype.getTaskProcessByType = function (type, taskType, taskId) {
        var cfg = Config.EncounterCfg.encounterList;
        var data = null;
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].type == type) {
                data = cfg[i];
                break;
            }
        }
        if (taskType > 0) {
            var needData = null;
            for (var i = 0; i < data.task.length; i++) {
                if (String(taskId) == String(data.task[i].id)) {
                    needData = data.task[i];
                    break;
                }
            }
            if (needData) {
                var count = 0;
                for (var i = 0; i < data.need.length; i++) {
                    var attrNum = this.getAttrById(data.need[i], needData.type);
                    if (attrNum >= needData.task_Value) {
                        count++;
                    }
                }
                return { need: data.need.length, have: count };
            }
        }
        return { need: data.need.length, have: 0 };
    };
    //情缘任务属性
    EncounterVoApi.prototype.getAttrById = function (rewards, type) {
        var rewardvo = GameData.formatRewardItem(rewards)[0];
        if (rewardvo.type == 8) {
            //门客
            var servantVo = Api.servantVoApi.getServantObj(rewardvo.id.toString());
            if (servantVo) {
                if (type == 1) {
                    return servantVo.total;
                }
                else if (type == 2) {
                    return servantVo.getTotalAttrValye(1);
                }
                else if (type == 3) {
                    return servantVo.getTotalAttrValye(2);
                }
                else if (type == 4) {
                    return servantVo.getTotalAttrValye(3);
                }
                else if (type == 5) {
                    return servantVo.getTotalAttrValye(4);
                }
            }
            return 0;
        }
        else if (rewardvo.type == 10) {
            //红颜
            var wifeVo = Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString());
            if (wifeVo) {
                if (type == 6) {
                    return wifeVo.intimacy;
                }
                else if (type == 7) {
                    return wifeVo.glamour;
                }
            }
            return 0;
        }
        else if (rewardvo.type == 16) {
            //红颜皮肤
            // let wifeSkinVo = Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString());
            // if(wifeSkinVo){
            // 	return 0;
            // }
            // return 0;
        }
        else if (rewardvo.type == 19) {
            //门客皮肤
            if (Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())) {
                return 0;
            }
        }
        return 0;
    };
    //是否显示小红点
    EncounterVoApi.prototype.isShowNpc = function () {
        var cfg = Config.EncounterCfg.encounterList;
        var flag = false;
        for (var k in cfg) {
            var type = cfg[k].type;
            if (Api.switchVoApi.checkOpenQingYuan(type)) {
                if (this.checkRedByType(type)) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    EncounterVoApi.prototype.getChildAdd = function (wifeid) {
        var num = 0;
        if (this.encounterVo && this.encounterVo.buff && this.encounterVo.buff.wife) {
            var obj = this.encounterVo.buff.wife;
            if (obj && obj[wifeid]) {
                num = Number(obj[wifeid].wife_Child) + this.encounterVo.buff.all_Child ? this.encounterVo.buff.all_Child : 0;
            }
        }
        return num;
    };
    //是否解锁门客或红颜情缘标签
    EncounterVoApi.prototype.checkShowServantFlag = function () {
        var playerLv = Api.playerVoApi.getPlayerLevel();
        var needLv = Config.EncounterCfg.needLv1;
        if (playerLv >= needLv) {
            return true;
        }
        return false;
    };
    //是否解锁门客或红颜情缘标签
    EncounterVoApi.prototype.checkShowWifeFlag = function () {
        var playerLv = Api.playerVoApi.getPlayerLevel();
        var needLv = Config.EncounterCfg.needLv2;
        if (playerLv >= needLv) {
            return true;
        }
        return false;
    };
    //获取某一kind的数据
    EncounterVoApi.prototype.getEncountCfgByKind = function (kind) {
        var cfg = Config.EncounterCfg.getEncountCfgByKind(kind);
        var data = [];
        for (var i = 0; i < cfg.length; i++) {
            if (Api.switchVoApi.checkOpenQingYuan(cfg[i].type)) {
                data.push(cfg[i]);
            }
        }
        return data;
    };
    EncounterVoApi.prototype.getShowKindList = function () {
        //3 4 1 2 
        // --1门客组
        // --2红颜组
        // --3门客皮肤组
        // --4红颜皮肤组
        var list = [];
        var data = this.getEncountCfgByKind(3);
        if (data.length > 0) {
            list.push(3);
        }
        data = this.getEncountCfgByKind(4);
        if (data.length > 0) {
            list.push(4);
        }
        if (Api.switchVoApi.checkOpenQingyuanServantAndWifePage()) {
            data = this.getEncountCfgByKind(1);
            if (data.length > 0 && this.checkShowServantFlag()) {
                list.push(1);
            }
            data = this.getEncountCfgByKind(2);
            if (data.length > 0 && this.checkShowWifeFlag()) {
                list.push(2);
            }
        }
        return list;
    };
    //获取门客特殊属性
    // --1帮会争霸攻击增加
    // --2雁门关攻击增加
    // --3本服擂台攻击增加
    // --4削藩平乱势力增加
    // --5跨服擂台攻击增加
    // --6绝地擂台攻击增加
    // --7定军中原兵力增加
    EncounterVoApi.prototype.getSpecialAddAttr = function (servantId, type) {
        if (servantId && this.encounterVo.buff && this.encounterVo.buff.servant && this.encounterVo.buff.servant[servantId]) {
            var info = this.encounterVo.buff.servant[servantId];
            if (info.special && info.special[type]) {
                return info.special[type];
            }
        }
        return 0;
    };
    EncounterVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EncounterVoApi;
}(BaseVoApi));
__reflect(EncounterVoApi.prototype, "EncounterVoApi");
//# sourceMappingURL=EncounterVoApi.js.map