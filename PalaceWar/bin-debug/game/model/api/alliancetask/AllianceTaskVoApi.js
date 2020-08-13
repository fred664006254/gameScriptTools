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
 * 军团建设系统vo
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskVo
 */
var AllianceTaskVoApi = (function (_super) {
    __extends(AllianceTaskVoApi, _super);
    function AllianceTaskVoApi() {
        var _this = _super.call(this) || this;
        _this._curSelectedTaskSerId = "";
        return _this;
    }
    AllianceTaskVoApi.prototype.getCurrentBuffId = function () {
        if (this.allianceTaskVo.buff) {
            return this.allianceTaskVo.buff.id;
        }
        return null;
    };
    AllianceTaskVoApi.prototype.getBuffBuyTimes = function (buffid) {
        if (this.allianceTaskVo.buff && this.allianceTaskVo.buff.id == buffid) {
            return this.allianceTaskVo.buff.bnum;
        }
        return 0;
    };
    AllianceTaskVoApi.prototype.getAllianceTaskInfo = function (taskId) {
        var date = App.DateUtil.getServerDate();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var ymstr = year + "" + month;
        if (month < 10) {
            ymstr = year + "0" + month;
        }
        // App.LogUtil.log("getAllianceTaskInfo "+ymstr);
        if (this.allianceTaskVo && this.allianceTaskVo.tinfo && this.allianceTaskVo.tinfo[ymstr]) {
            return this.allianceTaskVo.tinfo[ymstr][taskId];
        }
        return null;
    };
    AllianceTaskVoApi.prototype.setAllianceTaskSelectedServantId = function (id) {
        this._curSelectedTaskSerId = id;
    };
    AllianceTaskVoApi.prototype.getAllianceTaskSelectedServantId = function () {
        return this._curSelectedTaskSerId;
    };
    AllianceTaskVoApi.prototype.isAllianceTaskLVEnable = function () {
        if (Api.allianceVoApi.getAllianceVo().level < Config.AlliancetaskCfg.getAllianceTaskNeedLv()) {
            return false;
        }
        return true;
    };
    AllianceTaskVoApi.prototype.isShowRedForEntrance = function () {
        if (!Api.switchVoApi.checkOpenAllianceTask()) {
            return false;
        }
        if (!this.isAllianceTaskLVEnable()) {
            return false;
        }
        if (this.getAllTaskFinished()) {
            return false;
        }
        if (this.isInLastTime()) {
            return false;
        }
        var myAlliance = Api.allianceVoApi.getMyAllianceVo();
        var taskservant = myAlliance.info.taskservant;
        if (!taskservant) {
            return true;
        }
        var servantIdList = Object.keys(Api.servantVoApi.getServantInfoList());
        for (var index = 0; index < servantIdList.length; index++) {
            var tmpSerid = servantIdList[index];
            if (tmpSerid && !taskservant[tmpSerid]) {
                return true;
            }
        }
        return false;
    };
    AllianceTaskVoApi.prototype.isShowRewardRed = function () {
        if (!Api.switchVoApi.checkOpenAllianceTask()) {
            return false;
        }
        if (!this.isAllianceTaskLVEnable()) {
            return false;
        }
        if (this.getAllTaskFinished()) {
            return false;
        }
        if (!(Api.allianceVoApi.getMyAllianceVo().po < 3)) {
            return false;
        }
        if (this.isInNotGetTime()) {
            return false;
        }
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        for (var k in list) {
            var taskId = list[k];
            var cfgData = Config.AlliancetaskCfg.getAllianceTaskById(taskId);
            var taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(taskId);
            if (taskinfo) {
                var flag = taskinfo.flag;
                if (flag == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    AllianceTaskVoApi.prototype.getAllianceTaskServantList = function (taskId) {
        var myAlliance = Api.allianceVoApi.getMyAllianceVo();
        var taskservant = myAlliance.info.taskservant;
        if (!taskservant) {
            taskservant = [];
        }
        var taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(taskId);
        var serIdList = Api.servantVoApi.getServantInfoIdListByProperty(taskcfg.type);
        var limitlessTaskId = this.getLimitlessTaskId();
        if (limitlessTaskId && taskId == limitlessTaskId) {
            serIdList = Api.servantVoApi.getServantInfoIdListByProperty(0);
        }
        var list1 = [];
        var list2 = [];
        var list3 = [];
        for (var index = 0; index < serIdList.length; index++) {
            var serId = serIdList[index];
            if (!taskservant[serId]) {
                list1.push(serId);
            }
            else {
                if (taskservant[serId] == 1) {
                    list2.push(serId);
                }
                else {
                    list3.push(serId);
                }
            }
        }
        var resultList = list1.concat(list2).concat(list3);
        return resultList;
    };
    AllianceTaskVoApi.prototype.getAllianceTaskFlag = function (taskid) {
        var taskvo = this.getAllianceTaskInfo(taskid);
        if (!taskvo) {
            return 0;
        }
        return taskvo.flag;
    };
    AllianceTaskVoApi.prototype.getAllTaskFinished = function () {
        var flag = true;
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        for (var i in list) {
            if (!this.getAllianceTaskFlag(list[i])) {
                flag = false;
                break;
            }
        }
        return flag;
    };
    //无限任务id
    AllianceTaskVoApi.prototype.getLimitlessTaskId = function () {
        var cfg = Config.AlliancetaskCfg.getAllianceTaskIdList();
        for (var i in cfg) {
            var data = Config.AlliancetaskCfg.getAllianceTaskById(cfg[i]);
            if (data.infinite) {
                return cfg[i];
            }
        }
        return null;
    };
    /**是否开启无限任务 */
    AllianceTaskVoApi.prototype.isOpenLimitlessTask = function () {
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        var limitlessId = this.getLimitlessTaskId();
        for (var i in list) {
            if (limitlessId != list[i]) {
                if (!this.getAllianceTaskFlag(list[i])) {
                    return false;
                }
            }
        }
        return true;
    };
    /**获取任务列表 开启无限任务放首位 */
    AllianceTaskVoApi.prototype.getAllTaskList = function () {
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        var limitlessId = this.getLimitlessTaskId();
        App.LogUtil.log("getAllTaskList: " + limitlessId);
        var data = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] == limitlessId) {
                if (this.isOpenLimitlessTask()) {
                    data.unshift(list[i]);
                }
            }
            else {
                data.push(list[i]);
            }
        }
        return data;
    };
    /**获取任务列表 不包括无限任务 */
    AllianceTaskVoApi.prototype.getNormalTaskList = function () {
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        var limitlessId = this.getLimitlessTaskId();
        var data = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != limitlessId) {
                data.push(list[i]);
            }
        }
        return data;
    };
    /**是否参加过本月任务 */
    AllianceTaskVoApi.prototype.isJoinedAllianceTask = function () {
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        for (var key in list) {
            var taskInfo = this.getAllianceTaskInfo(list[key]);
            if (taskInfo && taskInfo.uids && taskInfo.uids[Api.playerVoApi.getPlayerID()]) {
                return true;
            }
        }
        return false;
    };
    /**本月前3天时间 */
    AllianceTaskVoApi.prototype.isInNotGetTime = function () {
        var date = new Date(GameData.serverTime * 1000);
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        if (day < 4) {
            var mon0time = GameData.serverTime - ((day - 1) * 86400 + hour * 3600 + min * 60 + sec);
            if (mon0time + 3 * 86400 > GameData.serverTime) {
                return true;
            }
        }
        return false;
    };
    //11：30之后
    AllianceTaskVoApi.prototype.isInLastTime = function () {
        var tws = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime + 1800 >= tws + 86400) {
            return true;
        }
        return false;
    };
    AllianceTaskVoApi.prototype.dispose = function () {
        this.allianceTaskVo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskVoApi;
}(BaseVoApi));
__reflect(AllianceTaskVoApi.prototype, "AllianceTaskVoApi");
//# sourceMappingURL=AllianceTaskVoApi.js.map