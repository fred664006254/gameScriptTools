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
var AcDailyRechargeVo = (function (_super) {
    __extends(AcDailyRechargeVo, _super);
    function AcDailyRechargeVo() {
        var _this = _super.call(this) || this;
        _this.lastpos = null;
        _this.lastidx = -1;
        _this.day = 0;
        _this.flag = 0;
        _this.rewards = {};
        return _this;
    }
    AcDailyRechargeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcDailyRechargeVo.prototype, "isShowRedDot", {
        //外部红点
        get: function () {
            var flag = false;
            var curday = this.getNowDay();
            if (this.isInActivity() && this.config) {
                for (var i in this.config.recharge) {
                    var unit = this.config.recharge[i];
                    var bool = false;
                    if (this.getNowFlag()) {
                        bool = unit.id > curday;
                    }
                    else {
                        bool = unit.id > (curday + 1);
                    }
                    var chargenum = 0;
                    if (this.getNowDay() >= unit.id) {
                        chargenum = unit.needGem;
                    }
                    else {
                        chargenum = bool ? 0 : this.getChargeNum();
                    }
                    if (chargenum >= unit.needGem && !this.isGetRecharge(unit.id)) {
                        flag = true;
                        break;
                    }
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    //活动期间 不含展示期
    AcDailyRechargeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.config.extraTime;
    };
    //倒计时
    AcDailyRechargeVo.prototype.getCountDown = function () {
        return this.et - 86400 * this.config.extraTime - GameData.serverTime;
    };
    //当日充值数目
    AcDailyRechargeVo.prototype.getChargeNum = function () {
        return this.v;
    };
    //当前多少天了
    AcDailyRechargeVo.prototype.getNowDay = function () {
        return this.day;
    };
    //今日是否标记
    AcDailyRechargeVo.prototype.getNowFlag = function () {
        return this.flag;
    };
    //领取记录
    AcDailyRechargeVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.rewards && this.rewards[id]) {
            flag = true;
        }
        return flag;
    };
    AcDailyRechargeVo.prototype.dispose = function () {
        this.v = 0;
        this.day = 0;
        this.flag = 0;
        this.rewards = null;
        this.lastpos = null;
        this.lastidx = -1;
    };
    return AcDailyRechargeVo;
}(AcBaseVo));
__reflect(AcDailyRechargeVo.prototype, "AcDailyRechargeVo");
//# sourceMappingURL=AcDailyRechargeVo.js.map