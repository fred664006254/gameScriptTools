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
var AcDechuanshidaiVo = (function (_super) {
    __extends(AcDechuanshidaiVo, _super);
    function AcDechuanshidaiVo() {
        var _this = _super.call(this) || this;
        //道具数量 v1德 v2川 v3时 v4代
        _this.ainfo = null;
        //每日免费次数
        _this.isfree = 0;
        //累计充值 v充值的元宝 flags领取标记
        _this.binfo = null;
        //任务完成 
        _this.taskinfo = null;
        //当前第几天 
        _this.diffday = 0;
        //兑换信息 同商店
        _this.claim = null;
        //抽取次数
        _this.num = 0;
        //每日任务领取奖励
        _this.totaltask = null;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.lastday = -1;
        _this.idx = 1;
        return _this;
    }
    AcDechuanshidaiVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcDechuanshidaiVo.prototype.getFreeNum = function () {
        return this.isfree;
    };
    AcDechuanshidaiVo.prototype.dayNumById = function (id) {
        var num = 0;
        if (this.ainfo && this.ainfo["v" + id]) {
            num = this.ainfo["v" + id];
        }
        return num;
    };
    AcDechuanshidaiVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //充值奖励
    AcDechuanshidaiVo.prototype.getpublicRedhot1 = function () {
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
    AcDechuanshidaiVo.prototype.getCurDays = function () {
        return Math.min(4, this.diffday);
    };
    //任务奖励
    AcDechuanshidaiVo.prototype.getpublicRedhot2 = function () {
        //任务
        var flag = false;
        if (this.isEnd) {
            return flag;
        }
        for (var i = 1; i <= this.diffday; ++i) {
            if (this.getDayTaskReward(i)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //获取限购物品次数
    AcDechuanshidaiVo.prototype.getBuyLimitnum = function (id) {
        var info = this.claim;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    AcDechuanshidaiVo.prototype.getDayTaskReward = function (day) {
        var cfg = this.cfg;
        var flag = false;
        if (this.isEnd) {
            return flag;
        }
        if (day > 4) {
            day = 4;
        }
        var task = cfg.dailyTask[day - 1];
        var finish = this.getDayTaskFinish(day);
        for (var k in task) {
            var unit = task[k];
            var tasknum = this.getTask(unit.questType, day);
            var isget = this.isGetTaskReward(unit.questType, day);
            if (!isget && tasknum >= unit.value) {
                flag = true;
                break;
            }
        }
        if (finish >= Object.keys(task).length && !this.getDayTaskFinishReward(day)) {
            flag = true;
        }
        return flag;
    };
    AcDechuanshidaiVo.prototype.getDayTaskFinishReward = function (day) {
        var cfg = this.cfg;
        var flag = false;
        if (day > 4) {
            day = 4;
        }
        if (this.totaltask && this.totaltask[day]) {
            flag = true;
        }
        return flag;
    };
    AcDechuanshidaiVo.prototype.getDayTaskFinish = function (day) {
        var cfg = this.cfg;
        var num = 0;
        if (day > 4) {
            day = 4;
        }
        var task = cfg.dailyTask[day - 1];
        for (var k in task) {
            var unit = task[k];
            var tasknum = this.getTask(unit.questType, day);
            if (tasknum >= unit.value) {
                ++num;
            }
        }
        return num;
    };
    //免费
    AcDechuanshidaiVo.prototype.getpublicRedhot3 = function () {
        //任务
        var flag = false;
        if (!this.isInActivity()) {
            return flag;
        }
        if (this.isfree > 0) {
            flag = true;
        }
        return flag;
    };
    //可兑换
    AcDechuanshidaiVo.prototype.getpublicRedhot4 = function () {
        var flag = false;
        if (this.isEnd) {
            return flag;
        }
        for (var i in this.config.claim) {
            var unit = this.config.claim[i];
            var need1 = 0, need2 = 0, need3 = 0, need4 = 0;
            if (unit.costdeZi) {
                need1 = unit.costdeZi;
            }
            if (unit.costchuanZi) {
                need2 = unit.costchuanZi;
            }
            if (unit.costshiZi) {
                need3 = unit.costshiZi;
            }
            if (unit.costdaiZi) {
                need4 = unit.costdaiZi;
            }
            if (this.dayNumById(1) >= need1 && this.dayNumById(2) >= need2 && this.dayNumById(3) >= need3 && this.dayNumById(4) >= need4) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //获取累积充值数目
    AcDechuanshidaiVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.binfo && this.binfo.v) {
            num = this.binfo.v;
        }
        return num;
    };
    //获取任务完成次数
    AcDechuanshidaiVo.prototype.getTask = function (questType, day) {
        var num = 0;
        if (this.taskinfo[day] && this.taskinfo[day][questType] && this.taskinfo[day][questType].v) {
            num = this.taskinfo[day][questType].v;
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcDechuanshidaiVo.prototype.isGetTaskReward = function (questType, day) {
        var flag = false;
        if (this.taskinfo[day] && this.taskinfo[day][questType] && this.taskinfo[day][questType].flag) {
            flag = this.taskinfo[day][questType].flag == 2;
        }
        return flag;
    };
    /*累积充值领取判断*/
    AcDechuanshidaiVo.prototype.isGetRecharge = function (id) {
        if (this.binfo && this.binfo.flags && this.binfo.flags[id] == 1) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcDechuanshidaiVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiVo.prototype, "isShowRedDot", {
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
    Object.defineProperty(AcDechuanshidaiVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcDechuanshidaiVo.prototype.getArr = function (key) {
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
                        if (currObj.needMeter || currObj.item || currObj.needGem || currObj.questType || currObj.limit) {
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
    // public getMyPrank():number{
    // 	let rank = 0;
    // 	if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
    // 		rank = this.rankinfo.myrankArr.myrank;
    // 	}
    // 	return rank;
    // }
    // public getMyPScore():number{
    // 	let score = 0;
    // 	if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value){
    // 		score = this.rankinfo.myrankArr.value;
    // 	}
    // 	return score;
    // }
    // public setRankInfo(data : any):void{
    // 	if(data.rankArr){
    // 		this.rankinfo.rankArr = data.rankArr;
    // 	}
    // 	if(data.myrankArr){
    // 		this.rankinfo.myrankArr = data.myrankArr;
    // 	}
    // }
    // public getRankInfo():any[]{
    // 	let arr = [];
    // 	if(this.rankinfo.rankArr){
    // 		arr = this.rankinfo.rankArr;
    // 	}
    // 	return arr;
    // }
    AcDechuanshidaiVo.prototype.dispose = function () {
        //道具数量 v1德 v2川 v3时 v4代
        this.ainfo = null;
        //每日免费次数
        this.isfree = 0;
        //累计充值 v充值的元宝 flags领取标记
        this.binfo = null;
        //任务完成 
        this.taskinfo = null;
        //当前第几天 
        this.diffday = 0;
        //兑换信息 同商店
        this.claim = null;
        //抽取次数
        this.num = 0;
        this.lastidx = -1;
        this.lastpos = null;
        this.lastday = -1;
        this.idx = 1;
    };
    return AcDechuanshidaiVo;
}(AcBaseVo));
__reflect(AcDechuanshidaiVo.prototype, "AcDechuanshidaiVo");
//# sourceMappingURL=AcDechuanshidaiVo.js.map