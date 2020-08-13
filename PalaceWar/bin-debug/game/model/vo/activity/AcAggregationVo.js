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
var AcAggregationVo = (function (_super) {
    __extends(AcAggregationVo, _super);
    function AcAggregationVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.extraTimeAllianceMn = 0;
        return _this;
    }
    AcAggregationVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcAggregationVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationVo.prototype, "isShowRedDot", {
        get: function () {
            // if (this.checkIsInEndShowTime()) {
            // 	return false; // 到展示期了
            // } else if (this.firstOpen != 1) { // 今日还没有打开过活动
            // 	return true;
            // } else if (this.inGaming()) { // 正在进行游戏中
            // 	return true;
            // } else if (this.anum < this.cfg.playtime && this.point >= this.getCurGameIndex() * this.cfg.livenessNeed){ // 有次数且活跃够
            // 	return true;
            // }
            // return false;
            return this.isShowTaskRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - (this.config.extraTime || 0) * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acAggregation_timeEnd");
            }
            return LanguageManager.getlocal("acAggregation_timeCount", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            if (this.config && this.config.extraTime) {
                et = this.et - this.config.extraTime * 86400;
            }
            return LanguageManager.getlocal("acAggregation_time", [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
        },
        enumerable: true,
        configurable: true
    });
    AcAggregationVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    //任务
    AcAggregationVo.prototype.getSortTaskCfg = function () {
        var datas = this.cfg.getTaskCfg();
        for (var i = 0; i < datas.length; i++) {
            if (this.isRewardTaskById(datas[i].id)) {
                datas[i].sortId = 100 + parseInt(datas[i].id);
            }
            else {
                datas[i].sortId = parseInt(datas[i].id);
            }
        }
        datas.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return datas;
    };
    AcAggregationVo.prototype.isRewardTaskById = function (id) {
        if (this.task && this.task.flags && this.task.flags[id]) {
            return this.task.flags[id];
        }
        return 0;
    };
    AcAggregationVo.prototype.getNumById = function (id) {
        if (this.getNumArr && this.getNumArr[id]) {
            return this.getNumArr[id];
        }
        return 0;
    };
    AcAggregationVo.prototype.isCanGetRewardById = function (id) {
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            return false;
        }
        if (this.isRewardTaskById(id) == 0) {
            if (this.cfg.getNeedById(id) <= this.getAllianceNum()) {
                if (this.getNumById(id) < this.getAllianceMaxNum() + this.cfg.maxGet) {
                    return true;
                }
            }
        }
        return false;
    };
    AcAggregationVo.prototype.isGetBzReward = function (id) {
        return false;
    };
    //帮会名字
    AcAggregationVo.prototype.getAllianceName = function () {
        if (Api.allianceVoApi.getAllianceVo()) {
            return Api.allianceVoApi.getAllianceVo().name;
        }
        return "";
    };
    //帮会人数
    AcAggregationVo.prototype.getAllianceNum = function () {
        // if(this.checkIsInEndShowTime())
        // {
        // 	return this.extraTimeAllianceMn ? this.extraTimeAllianceMn : 0;
        // }
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            return 0;
        }
        if (Api.allianceVoApi.getAllianceVo()) {
            return Api.allianceVoApi.getAllianceVo().mn;
        }
        return 0;
    };
    //帮会最大人数
    AcAggregationVo.prototype.getAllianceMaxNum = function () {
        if (Api.allianceVoApi.getAllianceVo()) {
            var level = Api.allianceVoApi.getAllianceVo().level;
            if (Config.AllianceCfg.getAllianceCfgByLv(String(level))) {
                return Config.AllianceCfg.getAllianceCfgByLv(String(level)).count;
            }
            return 0;
        }
        return 0;
    };
    //是否显示任务奖励红点
    AcAggregationVo.prototype.isShowTaskRewardRedDot = function () {
        var data = this.cfg.getTaskCfg();
        for (var i = 0; i < data.length; i++) {
            if (this.isCanGetRewardById(data[i].id)) {
                return true;
            }
        }
        return false;
    };
    AcAggregationVo.prototype.getTimes = function () {
        return this.v;
    };
    AcAggregationVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcAggregationVo;
}(AcBaseVo));
__reflect(AcAggregationVo.prototype, "AcAggregationVo");
//# sourceMappingURL=AcAggregationVo.js.map