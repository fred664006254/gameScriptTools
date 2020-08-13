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
 * 红颜皮肤系统api
 * author dky
 * date 2018/3/2
 * @class WifeSkinVoApi
 */
var WifeskinVoApi = (function (_super) {
    __extends(WifeskinVoApi, _super);
    function WifeskinVoApi() {
        return _super.call(this) || this;
    }
    // 获取皮肤数量
    WifeskinVoApi.prototype.getWifeNum = function () {
        var obj = this.wifeskinVo.wifeSkinInfoVoObj;
        return Object.keys(obj).length;
    };
    /**
     * 获取红颜对应的皮肤列表
     */
    WifeskinVoApi.prototype.getWifeSkinListById = function (id) {
        var arr = new Array();
        var wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
        for (var key in wifeListCfg) {
            var curr_wifeItemCfg = wifeListCfg[key];
            if (id == curr_wifeItemCfg.wifeId) {
                if (curr_wifeItemCfg.id == "1012") {
                    if (Api.switchVoApi.checkOpenPrestige() == true) {
                        arr.push(curr_wifeItemCfg);
                    }
                }
                else {
                    arr.push(curr_wifeItemCfg);
                }
            }
        }
        return arr;
    };
    /**获取红颜是不是有皮肤(配置里是否有) */
    WifeskinVoApi.prototype.isHaveSkin = function (wifeId) {
        var wifevo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
        for (var key in wifeListCfg) {
            var curr_wifeItemCfg = wifeListCfg[key];
            if (wifeId == curr_wifeItemCfg.wifeId && Config.WifeskinCfg.isSkinOPend(curr_wifeItemCfg.id) && (curr_wifeItemCfg.isBlue == 1 && wifeCfg.isBule() || curr_wifeItemCfg.isBlue == 0 && !wifeCfg.isBule())) {
                return true;
            }
        }
        return false;
    };
    /**获取红颜列表 */
    WifeskinVoApi.prototype.getWifeInfoVoList = function () {
        var arr = new Array();
        var wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
        for (var key in wifeSkinInfoVoObj) {
            arr.push(wifeSkinInfoVoObj[key]);
        }
        return arr;
    };
    /**
     * 检测是否显示子嗣Npc
     */
    WifeskinVoApi.prototype.isShowNpc = function () {
        return Api.playerVoApi.getPlayerLevel() >= Config.WifebaseCfg.unlockLv;
    };
    /**
     * 根据红颜id获取皮肤vo
     * @param id 红颜id
     */
    WifeskinVoApi.prototype.getWifeskinInfoVoById = function (id) {
        var wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
        if (wifeSkinInfoVoObj && wifeSkinInfoVoObj[id.toString()]) {
            return wifeSkinInfoVoObj[id.toString()];
        }
        return null;
    };
    /**
     * 根据皮肤id获取红颜列表位置
     * @param id 红颜id
     */
    WifeskinVoApi.prototype.getWifeSkinIndexVoById = function (skinId) {
        var wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        var skinCfgList = this.getWifeSkinListById(wifeId);
        for (var i = 0; i < skinCfgList.length; i++) {
            if (skinId == skinCfgList[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 获取所有红颜是否换肤红点

     */
    WifeskinVoApi.prototype.getSkinRedAll = function () {
        var skinList = this.getWifeInfoVoList();
        for (var index = 0; index < skinList.length; index++) {
            var element = skinList[index];
            if (element) {
                for (var key in element.skin) {
                    // arr.push(elementObj[key]);
                    if (element.skin[key].red == 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 获取某个红颜是否换肤红点

     */
    WifeskinVoApi.prototype.getSkinRed = function (wifeId) {
        var wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
        if (wifeSkinInfoVo) {
            var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
            for (var key in wifeSkinInfoVo.skin) {
                // arr.push(wifeSkinInfoVoObj[key]);
                var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(key);
                if ((wifecfg.isBule() && !wifeskincfg.isBlueSkin) || (!wifecfg.isBule() && wifeskincfg.isBlueSkin)) {
                    continue;
                }
                if (wifeSkinInfoVo.skin[key].red == 1) {
                    return true;
                }
                var skinId = key;
                if (Api.switchVoApi.checkWifeSkinLevelUp()) {
                    var wifeskincfg_1 = Config.WifeskinCfg.getWifeCfgById(skinId);
                    if (wifeskincfg_1 && wifeskincfg_1.levelUp) {
                        var lv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
                        var levelup = wifeskincfg_1.levelUp[lv];
                        if (levelup) {
                            var levelUpCost = levelup.levelUpCost;
                            if (levelUpCost && levelUpCost != "") {
                                var rewardvo = GameData.formatRewardItem(levelUpCost)[0];
                                var have = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
                                var need = rewardvo.num;
                                if (have >= need) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * 获取某个皮肤是否换肤红点、升级红点

     */
    WifeskinVoApi.prototype.getSkinOneRed = function (wifeId, skinId) {
        if (!skinId) {
            return false;
        }
        var wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
        if (wifeSkinInfoVo) {
            var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
            var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            if (wifeskincfg && (wifecfg.isBule() && wifeskincfg.isBlueSkin) || (!wifecfg.isBule() && !wifeskincfg.isBlueSkin)) {
                if (wifeSkinInfoVo.skin[skinId] && wifeSkinInfoVo.skin[skinId].red == 1) {
                    return true;
                }
            }
        }
        if (Api.switchVoApi.checkWifeSkinLevelUp() && wifeSkinInfoVo && wifeSkinInfoVo.skin[skinId]) {
            var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            if (wifeskincfg && wifeskincfg.levelUp) {
                var lv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
                var levelup = wifeskincfg.levelUp[lv];
                if (levelup) {
                    var levelUpCost = levelup.levelUpCost;
                    if (levelUpCost && levelUpCost != "") {
                        var rewardvo = GameData.formatRewardItem(levelUpCost)[0];
                        var have = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
                        var need = rewardvo.num;
                        if (have >= need) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    WifeskinVoApi.prototype.isOwnSkinOfSkinId = function (skinId) {
        var wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        if (wifeskincfg) {
            if (this.wifeskinVo && this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId]) {
                return true;
            }
        }
        return false;
    };
    WifeskinVoApi.prototype.getWifeSkinLV = function (skinId) {
        var lv = 1;
        var cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        if (cfg) {
            var wifeId = cfg.wifeId;
            if (this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv) {
                lv = this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv;
            }
        }
        return lv;
    };
    WifeskinVoApi.prototype.getAllWifeSkinIdList = function () {
        var wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
        var idList = [];
        for (var key in wifeSkinInfoVoObj) {
            // if(Api.wifeVoApi.getWifeInfoVoById(key)){
            var skin = wifeSkinInfoVoObj[key].skin;
            for (var key2 in skin) {
                var tmp = skin[key2];
                tmp["wid"] = key2;
                idList.push(tmp);
            }
            // }
        }
        return idList;
    };
    WifeskinVoApi.prototype.getAllWifeSkinProAdd = function () {
        var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var idList = this.getAllWifeSkinIdList();
        for (var index = 0; index < idList.length; index++) {
            var skinId = idList[index].wid;
            var tmpV = this.getWifeSkinProAdd(skinId);
            for (var index2 = 0; index2 < tmpV.length; index2++) {
                res[index2] += tmpV[index2];
            }
        }
        return res;
    };
    /**
     * 获取单个红颜皮肤的属性加成信息,如果没获取，则返回皮肤基础配置
     */
    WifeskinVoApi.prototype.getWifeSkinProAdd = function (skinId, onlyCfg) {
        if (onlyCfg === void 0) { onlyCfg = false; }
        var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        var wlv = 0;
        if (!onlyCfg && this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId]) {
            wlv = this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv;
            if (!wlv) {
                wlv = 1; //默认1级
            }
        }
        else {
            if (!onlyCfg) {
                return res;
            }
            else {
                wlv = 1;
            }
        }
        var skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        if (skincfg.atkAdd) {
            if (skincfg.atkAdd[0] == 1) {
                res[0] += skincfg.atkAdd[1];
            }
            else {
                res[6] += skincfg.atkAdd[1];
            }
        }
        if (skincfg.inteAdd) {
            if (skincfg.inteAdd[0] == 1) {
                res[1] += skincfg.inteAdd[1];
            }
            else {
                res[7] += skincfg.inteAdd[1];
            }
        }
        if (skincfg.politicsAdd) {
            if (skincfg.politicsAdd[0] == 1) {
                res[2] += skincfg.politicsAdd[1];
            }
            else {
                res[8] += skincfg.politicsAdd[1];
            }
        }
        if (skincfg.charmAdd) {
            if (skincfg.charmAdd[0] == 1) {
                res[3] += skincfg.charmAdd[1];
            }
            else {
                res[9] += skincfg.charmAdd[1];
            }
        }
        if (skincfg.atkAdd2) {
            if (skincfg.atkAdd2[0] == 1) {
                res[0] += skincfg.atkAdd2[1];
            }
            else {
                res[6] += skincfg.atkAdd2[1];
            }
            res[10] = 1;
        }
        if (skincfg.inteAdd2) {
            if (skincfg.inteAdd2[0] == 1) {
                res[1] += skincfg.inteAdd2[1];
            }
            else {
                res[7] += skincfg.inteAdd2[1];
            }
            res[10] = 1;
        }
        if (skincfg.politicsAdd2) {
            if (skincfg.politicsAdd2[0] == 1) {
                res[2] += skincfg.politicsAdd2[1];
            }
            else {
                res[8] += skincfg.politicsAdd2[1];
            }
            res[10] = 1;
        }
        if (skincfg.charmAdd2) {
            if (skincfg.charmAdd2[0] == 1) {
                res[3] += skincfg.charmAdd2[1];
            }
            else {
                res[9] += skincfg.charmAdd2[1];
            }
            res[10] = 1;
        }
        res[4] += skincfg.wifeIntimacy;
        res[5] += skincfg.wifeGlamour;
        res[4] += skincfg.wifeLvUpIntimacy * (wlv - 1);
        res[5] += skincfg.wifeLvUpGlamour * (wlv - 1);
        if (skincfg.atkLvUpAdd[0] == 1) {
            res[0] += skincfg.atkLvUpAdd[1] * (wlv - 1);
        }
        else {
            res[6] += skincfg.atkLvUpAdd[1] * (wlv - 1);
        }
        if (skincfg.inteLvUpAdd[0] == 1) {
            res[1] += skincfg.inteLvUpAdd[1] * (wlv - 1);
        }
        else {
            res[7] += skincfg.inteLvUpAdd[1] * (wlv - 1);
        }
        if (skincfg.politicsLvUpAdd[0] == 1) {
            res[2] += skincfg.politicsLvUpAdd[1] * (wlv - 1);
        }
        else {
            res[8] += skincfg.politicsLvUpAdd[1] * (wlv - 1);
        }
        if (skincfg.charmLvUpAdd[0] == 1) {
            res[3] += skincfg.charmLvUpAdd[1] * (wlv - 1);
        }
        else {
            res[9] += skincfg.charmLvUpAdd[1] * (wlv - 1);
        }
        return res;
    };
    /**
     * 获取单个红颜皮肤的属性加成信息,返回皮肤基础配置
     */
    // kind 1 皮肤 2 门客  attr属性  type: 1 固定值 2 百分比 3 修身固定值 4 修身百分比 valu 值
    WifeskinVoApi.prototype.getNewWifeSkinProAdd = function (skinId, onlyCfg) {
        // let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        // let wlv = 1;
        // if(!onlyCfg && this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
        // {
        // 	wlv = this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv ;
        // 	if(!wlv)
        // 	{
        // 		wlv = 1;//默认1级
        // 	}
        // }else{
        // 	if(!onlyCfg){
        // 		return null;
        // 	}else{
        // 		wlv = 1;
        // 	}
        // }
        if (onlyCfg === void 0) { onlyCfg = false; }
        var dataList = [];
        var skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        if (skincfg.atkAdd) {
            var value = skincfg.atkAdd[1];
            var atkData = { attr: "atkAdd", type: skincfg.atkAdd[0], value: value, kind: 1 };
            dataList.push(atkData);
        }
        if (skincfg.inteAdd) {
            var value = skincfg.inteAdd[1];
            var data = { attr: "inteAdd", type: skincfg.inteAdd[0], value: value, kind: 1 };
            dataList.push(data);
        }
        if (skincfg.politicsAdd) {
            var data = { attr: "politicsAdd", type: skincfg.politicsAdd[0], value: skincfg.politicsAdd[1], kind: 1 };
            dataList.push(data);
        }
        if (skincfg.charmAdd) {
            var data = { attr: "charmAdd", type: skincfg.charmAdd[0], value: skincfg.charmAdd[1], kind: 1 };
            dataList.push(data);
        }
        if (skincfg.atkAdd2) {
            var data = { attr: "atkAdd2", type: skincfg.atkAdd2[0], value: skincfg.atkAdd2[1], kind: 2 };
            dataList.push(data);
        }
        if (skincfg.inteAdd2) {
            var data = { attr: "inteAdd2", type: skincfg.inteAdd2[0], value: skincfg.inteAdd2[1], kind: 2 };
            dataList.push(data);
        }
        if (skincfg.politicsAdd2) {
            var data = { attr: "politicsAdd2", type: skincfg.politicsAdd2[0], value: skincfg.politicsAdd2[1], kind: 2 };
            dataList.push(data);
        }
        if (skincfg.charmAdd2) {
            var data = { attr: "charmAdd2", type: skincfg.charmAdd2[0], value: skincfg.charmAdd2[1], kind: 2 };
            dataList.push(data);
        }
        if (skincfg.wifeIntimacy) {
            var value = skincfg.wifeIntimacy;
            var data = { attr: "wifeIntimacy", type: 0, value: value, kind: 1 };
            dataList.push(data);
        }
        if (skincfg.wifeGlamour) {
            var value = skincfg.wifeGlamour;
            var data = { attr: "wifeGlamour", type: 0, value: value, kind: 1 };
            dataList.push(data);
        }
        return dataList;
    };
    /**获取红颜列表 */
    WifeskinVoApi.prototype.getWifeSkinNums = function () {
        var num = 0;
        var wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
        for (var key in wifeSkinInfoVoObj) {
            var obj = wifeSkinInfoVoObj[key];
            num += Object.keys(obj.skin).length;
        }
        return num;
    };
    WifeskinVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
    };
    WifeskinVoApi.prototype.dispose = function () {
        this.wifeskinVo = null;
        _super.prototype.dispose.call(this);
    };
    return WifeskinVoApi;
}(BaseVoApi));
__reflect(WifeskinVoApi.prototype, "WifeskinVoApi");
//# sourceMappingURL=WifeskinVoApi.js.map