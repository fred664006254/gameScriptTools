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
var AcBeatXiongNuVo = (function (_super) {
    __extends(AcBeatXiongNuVo, _super);
    function AcBeatXiongNuVo() {
        var _this = _super.call(this) || this;
        //每日免费次数
        _this.isfree = 0;
        //累计投喂巧克力进度及领取信息
        _this.ainfo = null;
        //充值及领取信息
        _this.rinfo = null;
        _this.lastidx = -1;
        _this.lastpos = null;
        return _this;
    }
    AcBeatXiongNuVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcBeatXiongNuVo.prototype.getCheerNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    AcBeatXiongNuVo.prototype.getLuckyProgress = function () {
        var num = 0;
        if (this.ainfo && this.ainfo.v) {
            num = this.ainfo.v;
        }
        return num;
    };
    AcBeatXiongNuVo.prototype.isGetJinduAward = function (id) {
        var flag = false;
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            flag = this.ainfo.flags[id] == 1;
        }
        return flag;
    };
    AcBeatXiongNuVo.prototype.getFreeNum = function () {
        return this.isfree;
    };
    AcBeatXiongNuVo.prototype.isFree = function () {
        return this.getFreeNum() > 0;
    };
    //充值奖励
    AcBeatXiongNuVo.prototype.getpublicRedhot1 = function () {
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
    //免费
    AcBeatXiongNuVo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        if (!this.isInActivity()) {
            return flag;
        }
        if (this.isfree > 0 || this.getCheerNum() > 0) {
            flag = true;
        }
        return flag;
    };
    //是否有未领取进度奖励
    AcBeatXiongNuVo.prototype.getpublicRedhot3 = function () {
        if (this.isEnd) {
            return false;
        }
        //奖励进度宝箱
        for (var i in this.cfg.achievement) {
            var unit = this.cfg.achievement[i];
            var jindu = Number(i);
            if (this.getLuckyProgress() >= unit.specialnum && !this.isGetJinduAward(unit.id)) {
                return true;
            }
        }
        return false;
    };
    //获取累积充值数目
    AcBeatXiongNuVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    /*累积充值领取判断*/
    AcBeatXiongNuVo.prototype.isGetRecharge = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id] == 1) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcBeatXiongNuVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 3; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcBeatXiongNuVo.prototype.getCountDown = function () {
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
    AcBeatXiongNuVo.prototype.getMyPScore = function () {
        var score = this.v;
        return score;
    };
    AcBeatXiongNuVo.prototype.getArr = function (key) {
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
    AcBeatXiongNuVo.prototype.dispose = function () {
        //每日免费次数
        this.isfree = 0;
        //累计投喂巧克力进度及领取信息
        this.ainfo = null;
        //充值及领取信息
        this.rinfo = null;
        this.lastidx = -1;
        this.lastpos = null;
    };
    return AcBeatXiongNuVo;
}(AcBaseVo));
__reflect(AcBeatXiongNuVo.prototype, "AcBeatXiongNuVo");
//# sourceMappingURL=AcBeatXiongNuVo.js.map