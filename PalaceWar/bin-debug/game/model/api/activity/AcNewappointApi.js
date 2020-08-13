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
 * 新服预约
 * author ycg
 * date 202i=0.6.29
 * @class AcNewappointApi
 */
var AcNewappointApi = /** @class */ (function (_super) {
    __extends(AcNewappointApi, _super);
    function AcNewappointApi() {
        var _this = _super.call(this) || this;
        _this._acData = null;
        _this._intervalZinfo = null;
        _this._et = 0;
        return _this;
    }
    //活动数据
    AcNewappointApi.prototype.setAcData = function (data) {
        if (data && data.aid) {
            this._acData = data;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH);
        }
    };
    AcNewappointApi.prototype.getAcData = function () {
        return this._acData;
    };
    //服务器区间数据
    AcNewappointApi.prototype.setZidInfo = function (data) {
        this._intervalZinfo = data;
    };
    AcNewappointApi.prototype.getZidInfo = function () {
        return this._intervalZinfo;
    };
    //是否有数据
    AcNewappointApi.prototype.isHasData = function () {
        if (this._acData && this._acData.aid) {
            return true;
        }
        return false;
    };
    //是否是活动服务器
    AcNewappointApi.prototype.isInAcServer = function () {
        var zid = ServerCfg.selectServer && ServerCfg.selectServer.zid ? ServerCfg.selectServer.zid : "";
        if (!zid) {
            return true;
        }
        var zidArr = this.getZidInfo();
        var selZid = Number(zid);
        if (zidArr && zidArr.length > 0) {
            for (var i = 0; i < zidArr.length; i++) {
                var data = zidArr[i];
                if (Number(data[0]) <= selZid && Number(data[1]) >= selZid) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(AcNewappointApi.prototype, "aid", {
        get: function () {
            if (this.isHasData()) {
                return this._acData.aid;
            }
            return "newappoint";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointApi.prototype, "code", {
        get: function () {
            if (this.isHasData()) {
                return this._acData.code;
            }
            return "1";
        },
        enumerable: true,
        configurable: true
    });
    //是否已预约
    AcNewappointApi.prototype.isJoin = function () {
        if (this.isHasData()) {
            if (this._acData.isjoin) {
                return true;
            }
        }
        return false;
    };
    //新服
    AcNewappointApi.prototype.getNewServer = function () {
        if (this.isHasData()) {
            return this._acData.newzid;
        }
        return "";
    };
    //新服数据
    AcNewappointApi.prototype.getNewServerInfo = function () {
        if (this.isHasData && this._acData.newServerinfo) {
            return this._acData.newServerinfo;
        }
        return null;
    };
    //任务进度
    AcNewappointApi.prototype.getTaskNum = function () {
        if (this.isHasData()) {
            return this._acData.diff;
        }
        return 0;
    };
    AcNewappointApi.prototype.getMaxTaskNum = function () {
        if (this.cfg) {
            var cfgList = this.cfg.getTaskListCfg();
            return cfgList[cfgList.length - 1].taskValue;
        }
        return 0;
    };
    //是否领取任务奖励
    AcNewappointApi.prototype.isGetTaskReward = function (id) {
        if (this.isHasData()) {
            if (this._acData.taskinfo && this._acData.taskinfo[id]) {
                return true;
            }
        }
        return false;
    };
    AcNewappointApi.prototype.getSortTaskCfg = function () {
        if (!this.cfg) {
            return null;
        }
        var cfgList = this.cfg.getTaskListCfg();
        var data = [];
        var taskNum = this.getTaskNum();
        for (var i = 0; i < cfgList.length; i++) {
            if (this.isGetTaskReward(cfgList[i].id)) {
                cfgList[i].sortId = cfgList.length + cfgList[i].id;
            }
            else {
                if (cfgList[i].taskType == 1) {
                    if (this.isJoin()) {
                        cfgList[i].sortId = cfgList[i].id - cfgList.length - 1;
                    }
                    else {
                        cfgList[i].sortId = cfgList[i].id;
                    }
                }
                else {
                    if (taskNum >= cfgList[i].taskValue) {
                        cfgList[i].sortId = cfgList[i].id - cfgList.length - 1;
                    }
                    else {
                        cfgList[i].sortId = cfgList[i].id;
                    }
                }
            }
            data.push(cfgList[i]);
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    //积分
    AcNewappointApi.prototype.getScore = function () {
        if (this.isHasData()) {
            return this._acData.score;
        }
        return 0;
    };
    Object.defineProperty(AcNewappointApi.prototype, "et", {
        //结束时间
        get: function () {
            if (this.isHasData()) {
                if (this.cfg && this.cfg.extraTime) {
                    return Number(this._acData.aet) - this.cfg.extraTime * 86400;
                }
                return Number(this._acData.aet);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    //是否显示icon
    AcNewappointApi.prototype.isShowNpc = function () {
        if (this.isHasData() && this.isInAcServer()) {
            if (Number(this._acData.ast) == 0) {
                return true;
            }
            var svTime = GameData.serverTime;
            if (this.isJoin()) {
                if (Number(this._acData.yrst) < svTime && this.et > svTime) {
                    return true;
                }
            }
            else {
                if (Number(this._acData.yrst) < svTime && Number(this._acData.ast) > svTime) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否在活动期间内
    AcNewappointApi.prototype.isInActivity = function () {
        if (this.isShowNpc()) {
            if (Number(this._acData.ast) == 0) {
                return true;
            }
            var svTime = GameData.serverTime;
            if (Number(this._acData.yrst) < svTime && Number(this._acData.ast) > svTime) {
                return true;
            }
        }
        return false;
    };
    //是否在展示期
    AcNewappointApi.prototype.isStart = function () {
        if (this.isShowNpc()) {
            if (Number(this._acData.ast) == 0) {
                return true;
            }
            var svTime = GameData.serverTime;
            if (Number(this._acData.yrst) <= svTime && this.et > svTime) {
                return true;
            }
        }
        return false;
    };
    //活动开始时间
    AcNewappointApi.prototype.getStartTime = function () {
        if (this.isHasData()) {
            return App.DateUtil.getFormatBySecond(Number(this._acData.yrst), 10);
        }
    };
    Object.defineProperty(AcNewappointApi.prototype, "cfg", {
        get: function () {
            if (this.isHasData()) {
                return Config.AcCfg.getCfgByActivityIdAndCode(this._acData.aid, this._acData.code);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    //任务红点
    AcNewappointApi.prototype.checkTaskRed = function () {
        if (!this.cfg) {
            return false;
        }
        var cfgList = this.cfg.getTaskListCfg();
        var taskNum = this.getTaskNum();
        for (var i = 0; i < cfgList.length; i++) {
            if (!this.isGetTaskReward(cfgList[i].id)) {
                if (cfgList[i].taskType == 1) {
                    if (this.isJoin()) {
                        return true;
                    }
                }
                else {
                    if (taskNum >= cfgList[i].taskValue) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    AcNewappointApi.prototype.checkRedPoint = function () {
        if (this.isShowNpc()) {
            if (this.isInActivity() && (!this.isJoin() || (this.checkTaskRed() && this.isJoin()))) {
                return true;
            }
        }
        return false;
    };
    AcNewappointApi.prototype.dispose = function () {
        this._acData = null;
        this._intervalZinfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointApi;
}(BaseVoApi));
//# sourceMappingURL=AcNewappointApi.js.map