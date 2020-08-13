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
var AcArenaVo = (function (_super) {
    __extends(AcArenaVo, _super);
    function AcArenaVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.binfo = null;
        _this.cinfo = null;
        _this.shop = null;
        _this.riceNumber = 0;
        _this.rankinfo = {};
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.idx = 1;
        return _this;
    }
    AcArenaVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        if (data.binfo) {
            this.binfo = data.binfo;
        }
        if (data.cinfo) {
            this.cinfo = data.cinfo;
        }
        if (data.shop) {
            this.shop = data.shop;
        }
    };
    AcArenaVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //获取自己粽子数
    AcArenaVo.prototype.getZongzi = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    //获取前进米数
    AcArenaVo.prototype.getTotalRiceNum = function () {
        return Math.round(this.riceNumber);
    };
    //获取前进米数对应的奖励数据
    AcArenaVo.prototype.gerCurRiceAward = function (curJindu) {
        if (curJindu == 0) {
            curJindu = 1;
        }
        var item = this.cfg.teamReward[curJindu].getReward;
        var arr = new Array();
        var str_arr = item.split('|');
        for (var i in str_arr) {
            var unit = str_arr[i].split('_');
            var type = unit[0];
            var id = unit[1];
            var num = unit[2];
            var itemInfoVo = new ItemInfoVo();
            itemInfoVo.initData({ id: Number(id), num: num });
            arr.push(itemInfoVo);
        }
        return arr;
    };
    //获取前进米数对应的进度id
    AcArenaVo.prototype.getCurJindu = function () {
        var curJindu = 0;
        var curRice = this.getTotalRiceNum();
        for (var i in this.cfg.teamReward) {
            if (curRice >= this.cfg.teamReward[i].needMeter) {
                curJindu = Number(i);
            }
        }
        return curJindu;
    };
    //获取累积充值数目
    AcArenaVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.binfo && this.binfo.v) {
            num = this.binfo.v;
        }
        return num;
    };
    //获取任务完成次数
    AcArenaVo.prototype.getTask = function (type) {
        var num = 0;
        if (this.cinfo && this.cinfo.task && this.cinfo.task[type]) {
            num = this.cinfo.task[type];
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcArenaVo.prototype.isGetTaskReward = function (key) {
        var flag = false;
        if (this.cinfo && this.cinfo.task && this.cinfo.flags[key]) {
            flag = true;
        }
        return flag;
    };
    /*累积充值领取判断*/
    AcArenaVo.prototype.isGetRecharge = function (id) {
        if (this.binfo && this.binfo.flags) {
            for (var key in this.binfo.flags) {
                if (this.binfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcArenaVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //奖励进度奖励
    AcArenaVo.prototype.getpublicRedhot1 = function () {
        if (!this.cfg) {
            return false;
        }
        //奖励进度宝箱
        for (var i in this.cfg.teamReward) {
            var unit = this.cfg.teamReward[i];
            var jindu = Number(i);
            if (this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)) {
                return true;
            }
        }
        return false;
    };
    AcArenaVo.prototype.isCanLqAwardJindu = function (curjindu, flag) {
        if (flag === void 0) { flag = false; }
        //奖励进度宝箱
        for (var i in this.cfg.teamReward) {
            var unit = this.cfg.teamReward[i];
            var jindu = Number(i);
            var condition = flag ? (jindu >= curjindu) : (jindu <= curjindu);
            if (condition) {
                if (this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)) {
                    return true;
                }
            }
        }
        return false;
    };
    //充值奖励
    AcArenaVo.prototype.getpublicRedhot2 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
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
    AcArenaVo.prototype.getpublicRedhot3 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        for (var i in cfg.task) {
            var unit = cfg.task[i];
            var taskNum = this.getTask(unit.questType);
            var taskBoo = this.isGetTaskReward(Number(i));
            if (taskNum >= unit.value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcArenaVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i < 4; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcArenaVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcArenaVo.prototype.getteamRewardDataById = function (id) {
        return this.cfg.teamReward[id];
    };
    AcArenaVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.needMeter || currObj.rank || currObj.needGem || currObj.questType || currObj.limit) {
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
    //获取限购物品次数
    AcArenaVo.prototype.getBuyLimitnum = function (id) {
        var info = this.shop;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    //
    AcArenaVo.prototype.isGetJinduAward = function (id) {
        var info = this.ainfo;
        if (info && info.flags[id]) {
            return true;
        }
        return false;
    };
    AcArenaVo.prototype.getEndMeter = function () {
        var arr = this.getArr('teamReward');
        return arr[arr.length - 1].needMeter;
    };
    AcArenaVo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank) {
            rank = this.rankinfo.myrankArr.myrank;
        }
        return rank;
    };
    AcArenaVo.prototype.getMyPScore = function () {
        var score = 0;
        if (this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value) {
            score = this.rankinfo.myrankArr.value;
        }
        return score;
    };
    AcArenaVo.prototype.setRankInfo = function (data) {
        if (data.rankArr) {
            this.rankinfo.rankArr = data.rankArr;
        }
        if (data.myrankArr) {
            this.rankinfo.myrankArr = data.myrankArr;
        }
    };
    AcArenaVo.prototype.getRankInfo = function () {
        var arr = [];
        if (this.rankinfo.rankArr) {
            arr = this.rankinfo.rankArr;
        }
        return arr;
    };
    AcArenaVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.shop = null;
        this.rankinfo = {};
        this.lastidx = -1;
        this.lastpos = null;
    };
    return AcArenaVo;
}(AcBaseVo));
__reflect(AcArenaVo.prototype, "AcArenaVo");
//# sourceMappingURL=AcArenaVo.js.map