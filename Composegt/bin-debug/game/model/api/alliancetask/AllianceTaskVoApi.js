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
        // var date:Date = new Date(GameData.serverTime *1000);
        var year = App.DateUtil.getServerYear();
        var month = App.DateUtil.getServerMonth() + 1;
        var ymstr = year + "" + month;
        if (month < 10) {
            ymstr = year + "0" + month;
        }
        if (this.allianceTaskVo.tinfo[ymstr]) {
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
    AllianceTaskVoApi.prototype.getAllianceTaskServantList = function (taskId) {
        var myAlliance = Api.allianceVoApi.getMyAllianceVo();
        var taskservant = myAlliance.info.taskservant;
        if (!taskservant) {
            taskservant = [];
        }
        var taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(taskId);
        var serIdList = Api.servantVoApi.getServantInfoIdListByProperty(taskcfg.type);
        var list1 = [];
        var list2 = [];
        var list3 = [];
        for (var index = 0; index < serIdList.length; index++) {
            var serId = serIdList[index];
            var nums = Api.allianceVoApi.getAllianceTaskPKTimes(serId);
            if (nums == 0) {
                list1.push(serId);
            }
            else {
                if (nums == 1) {
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
    AllianceTaskVoApi.prototype.getAllianceMonTaskOverNum = function () {
        var overNum = this.allianceTaskVo.overNum;
        if (!overNum) {
            return 0;
        }
        return overNum;
    };
    AllianceTaskVoApi.prototype.dispose = function () {
        this.allianceTaskVo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskVoApi;
}(BaseVoApi));
__reflect(AllianceTaskVoApi.prototype, "AllianceTaskVoApi");
