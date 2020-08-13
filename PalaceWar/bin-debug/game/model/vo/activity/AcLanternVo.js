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
var AcLanternVo = (function (_super) {
    __extends(AcLanternVo, _super);
    function AcLanternVo() {
        var _this = _super.call(this) || this;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.isfree = 0;
        _this.process = {};
        _this.rinfo = {};
        return _this;
    }
    AcLanternVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.isfree = data.isfree;
        this.process = data.process;
        this.rinfo = data.rinfo;
    };
    //倒计时
    AcLanternVo.prototype.getCountDown = function () {
        return this.et - 86400 * this.config.extraTime - GameData.serverTime;
    };
    //获取累积充值数目
    AcLanternVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    /**
     * 累积充值领取判断
     * */
    AcLanternVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            flag = true;
        }
        return flag;
    };
    //获取进度数
    AcLanternVo.prototype.getProcessNum = function () {
        var num = 0;
        if (this.process && this.process.v) {
            num = this.process.v;
        }
        return num;
    };
    /**
     * 进度领取判断
     * */
    AcLanternVo.prototype.isGetprocessReward = function (id) {
        var flag = false;
        if (this.process && this.process.flags && this.process.flags[id]) {
            flag = true;
        }
        return flag;
    };
    //可以献花
    AcLanternVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        if (this.isInActivity() && this.getFreeNum()) {
            flag = true;
        }
        return flag;
    };
    //是否有未领取进度奖励
    AcLanternVo.prototype.getpublicRedhot3 = function () {
        var flag = false;
        if (!this.config) {
            return flag;
        }
        if (this.isActyEnd()) {
            return false;
        }
        var process = this.getProcessNum();
        for (var i in this.config.answerList) {
            var unit = this.config.answerList[i];
            if (process >= unit.answerfrequency && !this.isGetprocessReward(unit.id)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //是否有未领取充值奖励
    AcLanternVo.prototype.getpublicRedhot2 = function () {
        if (this.isActyEnd()) {
            return false;
        }
        //充值
        var cfg = this.config;
        if (!cfg) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && !this.isGetRecharge(Number(i))) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcLanternVo.prototype, "isShowRedDot", {
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
    Object.defineProperty(AcLanternVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.config.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcLanternVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcLanternVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcLanternVo.prototype.getFreeNum = function () {
        var num = 0;
        if (this.isfree) {
            num = this.isfree;
        }
        return num;
    };
    AcLanternVo.prototype.getItemNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    AcLanternVo.prototype.getArr = function (key) {
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
                        if (currObj) {
                            list[i][key2].key = Number(key2);
                            if (list[i][key2].id) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    AcLanternVo.prototype.dispose = function () {
        this.lastpos = null;
        this.lastidx = -1;
        this.isfree = 0;
        this.rinfo = null;
        this.process = null;
        _super.prototype.dispose.call(this);
    };
    return AcLanternVo;
}(AcBaseVo));
__reflect(AcLanternVo.prototype, "AcLanternVo");
//# sourceMappingURL=AcLanternVo.js.map