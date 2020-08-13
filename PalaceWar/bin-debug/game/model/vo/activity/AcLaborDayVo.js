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
var AcLaborDayVo = (function (_super) {
    __extends(AcLaborDayVo, _super);
    function AcLaborDayVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.binfo = null;
        _this.cinfo = null;
        _this.shop = null;
        _this.riceNumber = 0;
        _this.lastidx = null;
        _this.lastpos = null;
        _this.rankinfo = {};
        return _this;
    }
    AcLaborDayVo.prototype.initData = function (data) {
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
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LABOR_FRESH);
    };
    AcLaborDayVo.prototype.setRiceNumber = function (num) {
        this.riceNumber = num;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LABOR_FRESH);
    };
    //获取累积充值数目
    AcLaborDayVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //获取自己粽子数
    AcLaborDayVo.prototype.getZongzi = function () {
        return this.v;
    };
    //获取前进米数
    AcLaborDayVo.prototype.getTotalRiceNum = function () {
        return Math.round(this.riceNumber);
    };
    //获取前进米数对应的奖励数据
    AcLaborDayVo.prototype.gerCurRiceAward = function (curJindu) {
        if (curJindu == 0) {
            curJindu = 1;
        }
        var item = this.cfg.teamReward[curJindu - 1].getReward;
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
    //获取前进米数对应的进度id 1-8
    AcLaborDayVo.prototype.getCurJindu = function () {
        var curJindu = 1;
        var curRice = this.getTotalRiceNum();
        for (var i in this.cfg.teamReward) {
            if (curRice < this.cfg.teamReward[i].needMeter) {
                curJindu = Number(this.cfg.teamReward[i].id) + 1;
                break;
            }
            else {
                if (Number(i) == (this.getArr('teamReward').length - 1)) {
                    curJindu = this.getArr('teamReward').length;
                    break;
                }
            }
        }
        return curJindu;
    };
    //获取累积充值数目
    AcLaborDayVo.prototype.getChargeNum = function () {
        return Number(this.binfo.v);
    };
    //获取任务完成次数
    AcLaborDayVo.prototype.getTask = function (type) {
        if (this.cinfo.task[type]) {
            return this.cinfo.task[type];
        }
        return 0;
    };
    /*任务奖励是否领取*/
    AcLaborDayVo.prototype.isGetTaskReward = function (key) {
        if (this.cinfo.flags[key] && this.cinfo.flags[key] == 1) {
            return true;
        }
        return false;
    };
    /*累积充值领取判断*/
    AcLaborDayVo.prototype.isGetRecharge = function (id) {
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
    Object.defineProperty(AcLaborDayVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLaborDayVo.prototype.getpublicRedhot1 = function () {
        if (!this.cfg) {
            return false;
        }
        //奖励进度宝箱
        for (var i in this.cfg.teamReward) {
            var unit = this.cfg.teamReward[i];
            var jindu = Number(i) + 1;
            if (this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)) {
                return true;
            }
        }
        return false;
    };
    AcLaborDayVo.prototype.isCanLqAwardJindu = function (curjindu, flag) {
        if (flag === void 0) { flag = false; }
        //奖励进度宝箱
        for (var i in this.cfg.teamReward) {
            var unit = this.cfg.teamReward[i];
            var jindu = Number(i) + 1;
            var condition = flag ? (jindu >= curjindu) : (jindu <= curjindu);
            if (condition) {
                if (this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)) {
                    return true;
                }
            }
        }
        return false;
    };
    AcLaborDayVo.prototype.getpublicRedhot2 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false) {
                return true;
            }
        }
        return false;
    };
    AcLaborDayVo.prototype.getpublicRedhot3 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        for (var i in cfg.task) {
            var unit = cfg.task[i];
            var taskNum = this.getTask(unit.questType);
            var taskBoo = this.isGetTaskReward(Number(i) + 1);
            if (taskNum >= unit.value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcLaborDayVo.prototype, "isShowRedDot", {
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
    Object.defineProperty(AcLaborDayVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcLaborDayVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcLaborDayVo.prototype.getteamRewardDataById = function (id) {
        return this.cfg.teamReward[id - 1];
    };
    AcLaborDayVo.prototype.getArr = function (key) {
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
    AcLaborDayVo.prototype.getBuyLimitnum = function (id) {
        var info = this.shop;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    //
    AcLaborDayVo.prototype.isGetJinduAward = function (id) {
        var info = this.ainfo;
        if (info && info.flags[id]) {
            return true;
        }
        return false;
    };
    AcLaborDayVo.prototype.getEndMeter = function () {
        var arr = this.getArr('teamReward');
        return arr[arr.length - 1].needMeter;
    };
    AcLaborDayVo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank) {
            rank = this.rankinfo.myrankArr.myrank;
        }
        return rank;
    };
    AcLaborDayVo.prototype.getMyPScore = function () {
        var score = 0;
        if (this.rankinfo.myrankArr && this.rankinfo.myrankArr.value) {
            score = this.rankinfo.myrankArr.value;
        }
        return score;
    };
    AcLaborDayVo.prototype.setRankInfo = function (data) {
        if (data.rankArr) {
            this.rankinfo.rankArr = data.rankArr;
        }
        if (data.myrankArr) {
            this.rankinfo.myrankArr = data.myrankArr;
        }
    };
    AcLaborDayVo.prototype.getRankInfo = function () {
        var arr = [];
        if (this.rankinfo.rankArr) {
            arr = this.rankinfo.rankArr;
        }
        return arr;
    };
    /*
    *1幼苗 2完成大半 3丰收可领取 4已收获
    */
    AcLaborDayVo.prototype.getLandStatusById = function (id) {
        var totalrice = this.getTotalRiceNum();
        var statearr = this.cfg.teamReward[id - 1].state;
        var status = 1;
        if (statearr) {
            if (this.isGetJinduAward(id)) {
                status = 4;
            }
            else {
                if (totalrice < statearr[0]) {
                    status = 1;
                }
                else if (totalrice >= statearr[0] && totalrice < statearr[2]) {
                    status = 2;
                }
                else if (totalrice >= statearr[2]) {
                    status = 3;
                }
            }
        }
        return status;
    };
    AcLaborDayVo.prototype.getJinduPercent = function (id) {
        var percent = 0;
        var totalrice = this.getTotalRiceNum();
        // let statearr = this.cfg.teamReward[id - 1].state;
        var status = this.getLandStatusById(id);
        if (status < 3) {
            percent = totalrice / this.cfg.teamReward[id - 1].needMeter;
        }
        else {
            percent = 1;
        }
        return percent;
    };
    AcLaborDayVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.shop = null;
        this.lastidx = null;
        this.lastpos = null;
        this.rankinfo = {};
    };
    return AcLaborDayVo;
}(AcBaseVo));
__reflect(AcLaborDayVo.prototype, "AcLaborDayVo");
//# sourceMappingURL=AcLaborDayVo.js.map