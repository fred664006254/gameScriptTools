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
var AcRabbitComingVo = (function (_super) {
    __extends(AcRabbitComingVo, _super);
    function AcRabbitComingVo() {
        var _this = _super.call(this) || this;
        //当前巧克力数量
        _this.num = 0;
        //每日免费次数
        _this.isfree = 0;
        //累计投喂巧克力进度及领取信息
        _this.process = null;
        //充值及领取信息
        _this.rinfo = null;
        //任务情况
        _this.task = null;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this._rankInfo = {};
        return _this;
    }
    AcRabbitComingVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcRabbitComingVo.prototype.getChoclateNum = function () {
        return this.num;
    };
    AcRabbitComingVo.prototype.getLuckyProgress = function () {
        var num = 0;
        if (this.process && this.process.v) {
            num = this.process.v;
        }
        return num;
    };
    AcRabbitComingVo.prototype.isGetJinduAward = function (id) {
        var flag = false;
        if (this.process && this.process.flags && this.process.flags[id]) {
            flag = this.process.flags[id] == 1;
        }
        return flag;
    };
    AcRabbitComingVo.prototype.getFreeNum = function () {
        return this.isfree;
    };
    AcRabbitComingVo.prototype.isFree = function () {
        return this.getFreeNum() > 0;
    };
    //充值奖励
    AcRabbitComingVo.prototype.getpublicRedhot1 = function () {
        //充值
        var cfg = this.cfg;
        if (this.isEnd) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(Number(i)) == false) {
                return true;
            }
        }
        return false;
    };
    //任务奖励
    AcRabbitComingVo.prototype.getpublicRedhot2 = function () {
        //任务
        var flag = false;
        var cfg = this.cfg;
        if (this.isEnd) {
            return flag;
        }
        var task = cfg.task;
        for (var k in task) {
            var unit = task[k];
            var tasknum = this.getTask(unit.id);
            var isget = this.isGetTaskReward(unit.id);
            if (!isget && tasknum >= unit.value) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //免费
    AcRabbitComingVo.prototype.getpublicRedhot4 = function () {
        var flag = false;
        if (!this.isInActivity()) {
            return flag;
        }
        if (this.isfree > 0) {
            flag = true;
        }
        return flag;
    };
    //是否有未领取进度奖励
    AcRabbitComingVo.prototype.getpublicRedhot3 = function () {
        if (this.isEnd) {
            return false;
        }
        //奖励进度宝箱
        for (var i in this.cfg.achievement) {
            var unit = this.cfg.achievement[i];
            var jindu = Number(i);
            if (this.getLuckyProgress() >= unit.needNum && !this.isGetJinduAward(unit.id)) {
                return true;
            }
        }
        return false;
    };
    //获取累积充值数目
    AcRabbitComingVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    //获取任务完成次数
    AcRabbitComingVo.prototype.getTask = function (taskid) {
        var num = 0;
        var type = this.config.task[taskid].questType == 1 ? 113 : this.config.task[taskid].questType;
        if (this.task && this.task.v && this.task.v[type]) {
            num = this.task.v[type];
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcRabbitComingVo.prototype.isGetTaskReward = function (taskid) {
        var flag = false;
        if (this.task && this.task.flags && this.task.flags[taskid]) {
            flag = this.task.flags[taskid] == 1;
        }
        return flag;
    };
    /*累积充值领取判断*/
    AcRabbitComingVo.prototype.isGetRecharge = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id] == 1) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcRabbitComingVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 4; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcRabbitComingVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.config.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    // public getMyPrank():number{
    // 	let rank = 0;
    // 	if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
    // 		rank = this.rankinfo.myrankArr.myrank;
    // 	}
    // 	return rank;
    // }
    AcRabbitComingVo.prototype.getMyPScore = function () {
        var score = this.v;
        return score;
    };
    AcRabbitComingVo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.myrank && this._rankInfo.rabbitRank.myrank.myrank) {
            rank = this._rankInfo.rabbitRank.myrank.myrank;
        }
        return rank;
    };
    AcRabbitComingVo.prototype.getMyPrankInfo = function () {
        var rank = [];
        if (this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.rankList) {
            rank = this._rankInfo.rabbitRank.rankList;
        }
        return rank;
    };
    AcRabbitComingVo.prototype.getMyAllPrank = function () {
        var rank = 0;
        if (this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.amyrank && this._rankInfo.rabbitRank.amyrank.myrank) {
            rank = this._rankInfo.rabbitRank.amyrank.myrank;
        }
        return rank;
    };
    AcRabbitComingVo.prototype.getMyAScore = function () {
        var value = 0;
        if (this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.amyrank && this._rankInfo.rabbitRank.amyrank.value) {
            value = this._rankInfo.rabbitRank.amyrank.value;
        }
        return value;
    };
    AcRabbitComingVo.prototype.getMyAlliInfo = function () {
        var tmp = [];
        if (this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.arankList) {
            tmp = this._rankInfo.rabbitRank.arankList;
        }
        return tmp;
    };
    AcRabbitComingVo.prototype.setRankInfo = function (info) {
        this._rankInfo.rabbitRank = info.rabbitRank;
        this._rankInfo.allirank = info.allirank;
    };
    AcRabbitComingVo.prototype.getRankInfo = function () {
        return this._rankInfo;
    };
    AcRabbitComingVo.prototype.getAlliMemInfo = function () {
        var tmp = [];
        if (this._rankInfo.allirank && this._rankInfo.allirank.rankList) {
            tmp = this._rankInfo.allirank.rankList;
        }
        return tmp;
    };
    AcRabbitComingVo.prototype.getMyAlliMemPrank = function () {
        var rank = 0;
        if (this._rankInfo.allirank && this._rankInfo.allirank.myrank && this._rankInfo.allirank.myrank.myrank) {
            rank = this._rankInfo.allirank.myrank.myrank;
        }
        return rank;
    };
    AcRabbitComingVo.prototype.getMyAlliMemScore = function () {
        var value = 0;
        if (this._rankInfo.allirank && this._rankInfo.allirank.myrank && this._rankInfo.allirank.myrank.value) {
            value = this._rankInfo.allirank.myrank.value;
        }
        return value;
    };
    AcRabbitComingVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = this.config;
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.id) {
                            list[i][key2].key = Number(key2) + 1;
                            if (list[i][key2].key) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    AcRabbitComingVo.prototype.dispose = function () {
        this.num = 0;
        //每日免费次数
        this.isfree = 0;
        //累计投喂巧克力进度及领取信息
        this.process = null;
        //充值及领取信息
        this.rinfo = null;
        //任务情况
        this.task = null;
        this.lastidx = -1;
        this.lastpos = null;
        this._rankInfo = {};
    };
    return AcRabbitComingVo;
}(AcBaseVo));
__reflect(AcRabbitComingVo.prototype, "AcRabbitComingVo");
//# sourceMappingURL=AcRabbitComingVo.js.map