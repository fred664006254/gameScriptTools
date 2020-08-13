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
var HousekeeperVoApi = (function (_super) {
    __extends(HousekeeperVoApi, _super);
    function HousekeeperVoApi() {
        var _this = _super.call(this) || this;
        _this.rechargeId = "g165";
        return _this;
    }
    HousekeeperVoApi.prototype.getList = function () {
        var list = [];
        list.push("manage");
        if (Api.switchVoApi.checkOpenOfficialbusiness()) {
            list.push("affair");
        }
        list.push("wife");
        list.push("child");
        list.push("search");
        list.push("bookroom");
        list.push("prison");
        if (Api.switchVoApi.checkOpenConquest()) {
            list.push("conquest");
        }
        if (Api.switchVoApi.checkOpenTrade()) {
            list.push("trade");
        }
        if (Api.switchVoApi.checkZhenQiFangOpen()) {
            list.push("zhenqifang");
        }
        return list;
    };
    /**
     * 是否勾选了自动打理
     */
    HousekeeperVoApi.prototype.getIsCheckByType = function (type) {
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER + Api.playerVoApi.getPlayerID() + type;
        var storage = LocalStorageManager.get(key);
        if (storage == "0" || Api.housekeeperVoApi.getIsLocked(type) > 0) {
            return false;
        }
        return true;
    };
    /**
     * 保存勾选信息
     */
    HousekeeperVoApi.prototype.setCheckType = function (type, value) {
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER + Api.playerVoApi.getPlayerID() + type;
        LocalStorageManager.set(key, value);
    };
    /**
     * 保存勾选信息参数
     */
    HousekeeperVoApi.prototype.setCheckParms = function (type, value) {
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER_PARMS + Api.playerVoApi.getPlayerID() + type;
        LocalStorageManager.set(key, value);
    };
    /**
     * 获取勾选信息参数
     */
    HousekeeperVoApi.prototype.getCheckParms = function (type, resetData) {
        if (resetData === void 0) { resetData = false; }
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER_PARMS + Api.playerVoApi.getPlayerID() + type;
        var value = LocalStorageManager.get(key);
        if (resetData) {
            value = "";
        }
        if (!value || value == "") {
            if (type == "affair") {
                value = "1";
            }
            else if (type == "wife") {
                value = "1";
            }
            else if (type == "child") {
                value = "1|1|1";
            }
            else if (type == "bookroom") {
                var idList = Api.servantVoApi.getServantInfoIdListWithSort(2);
                var lastData = Api.bookroomVoApi.getLastSelectServant2(idList);
                var value2 = "";
                var seatNum = Api.bookroomVoApi.getMaxleng();
                var l = Math.min(lastData.length, seatNum);
                for (var i = 0; i < l; i++) {
                    if (value2 != "") {
                        value2 += "|";
                    }
                    value2 += lastData[i];
                }
                Api.housekeeperVoApi.setCheckParms(type, value2);
                value = value2;
            }
            else if (type == "conquest") {
                value = "1";
            }
            else if (type == "trade") {
                value = "1";
            }
            else if (type == "zhenqifang") {
                value = "1|1";
            }
        }
        return value;
    };
    /**
     * 获取书院可派遣门客id
     */
    HousekeeperVoApi.prototype.getBookroomServantIds = function () {
        var sids = [];
        var maxNum = Api.bookroomVoApi.getMaxleng();
        var studyNum = Api.bookroomVoApi.getInStudyServantNum();
        var canuseNum = maxNum - studyNum;
        var parmsstr = Api.housekeeperVoApi.getCheckParms("bookroom");
        var localIds = parmsstr.split("|");
        for (var i = 0; i < localIds.length; i++) {
            if (sids.length >= canuseNum) {
                break;
            }
            var oneid = localIds[i];
            if (Api.bookroomVoApi.isStudying(oneid) || !oneid || oneid == "") {
                continue;
            }
            else {
                sids.push(oneid);
            }
        }
        return sids;
    };
    //跨周小红点 
    HousekeeperVoApi.prototype.isHasRedot = function () {
        var has = false;
        var week1 = Math.ceil((GameData.serverTime - 316800) / (7 * 86400));
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER + Api.playerVoApi.getPlayerID() + "Red";
        var week2 = 0;
        var storage = LocalStorageManager.get(key);
        if (storage && storage != "") {
            week2 = Number(storage);
        }
        return week1 > week2;
    };
    /**
     * 保存勾选信息参数
     */
    HousekeeperVoApi.prototype.setSaveWeekTime = function () {
        var week = Math.ceil((GameData.serverTime - 316800) / (7 * 86400));
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER + Api.playerVoApi.getPlayerID() + "Red";
        LocalStorageManager.set(key, String(week));
    };
    HousekeeperVoApi.prototype.setSaveCDTime = function () {
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER + Api.playerVoApi.getPlayerID() + "CDTime";
        LocalStorageManager.set(key, String(GameData.serverTime));
    };
    HousekeeperVoApi.prototype.getCdTime = function () {
        var cdtime = 0;
        var key = LocalStorageConst.LOCAL_HOUSEKEEPER + Api.playerVoApi.getPlayerID() + "CDTime";
        var oldtime = 0;
        var storage = LocalStorageManager.get(key);
        if (storage && storage != "") {
            oldtime = Number(storage);
            cdtime = Config.MasterCfg.turnTime + oldtime - GameData.serverTime;
        }
        return cdtime;
    };
    HousekeeperVoApi.prototype.getIsLocked = function (type) {
        var b = 0;
        if (type == "manage") {
            if (Api.playerVoApi.getPlayerLevel() < Config.ManageCfg.autoNeedLv) {
                b = 1;
            }
        }
        else if (type == "search") {
            if (!Api.searchVoApi.isShowNpc()) {
                b = 1;
            }
        }
        else if (type == "prison") {
            if (!Api.prisonVoApi.isShowNpc()) {
                b = 1;
            }
        }
        else if (type == "conquest") {
            if (!Api.conquestVoApi.isShowNpc()) {
                b = 1;
            }
            else {
                var data = Api.conquestVoApi.getConquestVo();
                if (data.tnum < 50) {
                    b = 2;
                }
            }
        }
        else if (type == "trade") {
            if (!Api.tradeVoApi.isShowNpc()) {
                b = 1;
            }
            else {
                if (!Api.tradeVoApi.isBatchEnable()) {
                    b = 2;
                }
            }
        }
        else if (type == "zhenqifang") {
            if (!Api.zhenqifangVoApi.isShowNpc()) {
                b = 1;
            }
        }
        else if (type == "child") {
            if (!Api.childVoApi.isShowNpc()) {
                b = 1;
            }
        }
        return b;
    };
    HousekeeperVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return HousekeeperVoApi;
}(BaseVoApi));
__reflect(HousekeeperVoApi.prototype, "HousekeeperVoApi");
//# sourceMappingURL=HousekeeperVoApi.js.map