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
var AcAnnualCelebration2020Vo = (function (_super) {
    __extends(AcAnnualCelebration2020Vo, _super);
    function AcAnnualCelebration2020Vo() {
        var _this = _super.call(this) || this;
        //当前位置
        _this.pos = 0;
        _this.task = {};
        _this.circle = {};
        _this.v2 = 0;
        _this.buildingTimes = {};
        _this.tmpReward = null;
        return _this;
    }
    AcAnnualCelebration2020Vo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcAnnualCelebration2020Vo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcAnnualCelebration2020Vo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcAnnualCelebration2020Vo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020Vo.prototype.getCurMapId = function () {
        return this.pos;
    };
    AcAnnualCelebration2020Vo.prototype.getBoxNum = function () {
        return this.v;
    };
    AcAnnualCelebration2020Vo.prototype.getAIDiceNum = function () {
        return this.v2;
    };
    //ture 美菱  false 领了
    AcAnnualCelebration2020Vo.prototype.getTaskFlag = function (idx, type) {
        var flag = true;
        var taskTab = this.task[type];
        if (taskTab && taskTab[idx] && taskTab[idx].f) {
            flag = false;
        }
        return flag;
    };
    AcAnnualCelebration2020Vo.prototype.getCircleNum = function () {
        var cv = 0;
        if (this.circle && this.circle.v) {
            cv = this.circle.v;
        }
        return cv;
    };
    AcAnnualCelebration2020Vo.prototype.getCircleFlag = function (idx) {
        var flag = true;
        if (this.circle && this.circle.flags && this.circle.flags[idx]) {
            flag = false;
        }
        return flag;
    };
    //无限奖励当前是第几圈
    AcAnnualCelebration2020Vo.prototype.getMaxGetIndex = function () {
        var maxNum = this.cfg.getMaxCircle();
        if (this.getCircleFlag(maxNum)) {
            return maxNum;
        }
        else {
            while (!this.getCircleFlag(maxNum)) {
                maxNum++;
            }
            return maxNum;
        }
    };
    AcAnnualCelebration2020Vo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcAnnualCelebration2020Vo.prototype.getMapTimes = function () {
        var t = 0;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var map = cfg.map[this.pos];
        if (map.buildingType && this.buildingTimes[map.buildingType]) {
            t = this.buildingTimes[map.buildingType];
        }
        return t % 4 + 1;
    };
    Object.defineProperty(AcAnnualCelebration2020Vo.prototype, "isShowRedDot", {
        get: function () {
            return this.checkCircleRedDot() || this.checkTaskRedDot();
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020Vo.prototype.checkTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        for (var k in cfg.task) {
            var keys = Object.keys(cfg.task[k]);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var onecfg = cfg.task[k][key];
                if ((this.getTaskFlag(onecfg.id, onecfg.type)) && this.getTaskNum(onecfg.id, (Number(k) + 1)) >= onecfg.value) {
                    return true;
                }
            }
        }
        return false;
    };
    AcAnnualCelebration2020Vo.prototype.checkCircleRedDot = function () {
        for (var i = 1; i <= this.getCircleNum(); i++) {
            if (this.getCircleFlag(i)) {
                return true;
            }
        }
        return false;
    };
    AcAnnualCelebration2020Vo.prototype.getTaskNum = function (id, type) {
        var num = 0;
        var taskTab = this.task[type];
        if (taskTab && taskTab[id] && taskTab[id].v) {
            num = taskTab[id].v;
        }
        return num;
    };
    /**
     * 活动持续天数 用于限定登录任务
     */
    AcAnnualCelebration2020Vo.prototype.getAcContinueDays = function () {
        var days = Math.ceil((this.et - this.st) / 86400);
        return days - 1;
    };
    AcAnnualCelebration2020Vo.prototype.getCurRoundReward = function () {
        var reward = '';
        var curRound = Math.min((this.getCircleNum() + 1), this.cfg.getMaxCircle());
        var unit = this.cfg.achievement[curRound];
        if (unit) {
            reward = unit.getReward;
        }
        if (reward === '') {
            reward = this.cfg.achievement[Object.keys(this.cfg.achievement).length].getReward;
        }
        return reward;
    };
    Object.defineProperty(AcAnnualCelebration2020Vo.prototype, "acCountDownNoExtra", {
        get: function () {
            var et = this.et;
            if (Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code)) {
                et = this.et - Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code) * 86400;
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020Vo.prototype.dispose = function () {
        this.pos = 0;
        this.v2 = 0;
        this.task = null;
        this.circle = null;
        this.tmpReward = null;
        this.buildingTimes = null;
    };
    return AcAnnualCelebration2020Vo;
}(AcBaseVo));
__reflect(AcAnnualCelebration2020Vo.prototype, "AcAnnualCelebration2020Vo");
//# sourceMappingURL=AcAnnualCelebration2020Vo.js.map