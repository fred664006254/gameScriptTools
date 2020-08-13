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
var AcNewYearRedVo = (function (_super) {
    __extends(AcNewYearRedVo, _super);
    function AcNewYearRedVo() {
        var _this = _super.call(this) || this;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.flags = {};
        return _this;
    }
    AcNewYearRedVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.flags = data.flags;
    };
    //获取累积充值数目
    AcNewYearRedVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    //倒计时
    AcNewYearRedVo.prototype.getCountDown = function () {
        return this.et - 86400 * this.config.extraTime - GameData.serverTime;
    };
    /**
     * 累积充值领取判断
     * */
    AcNewYearRedVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.flags && this.flags[id]) {
            flag = true;
        }
        return flag;
    };
    //可以献花
    AcNewYearRedVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        return flag;
    };
    //是否有未领取宝箱奖励
    AcNewYearRedVo.prototype.getpublicRedhot3 = function () {
        return false;
    };
    //是否有未领取充值奖励
    AcNewYearRedVo.prototype.getpublicRedhot2 = function () {
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
    Object.defineProperty(AcNewYearRedVo.prototype, "isShowRedDot", {
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
    Object.defineProperty(AcNewYearRedVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.config.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearRedVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcNewYearRedVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcNewYearRedVo.prototype.getSpecailShowData = function () {
        var cfg = this.config;
        for (var k in cfg.recharge) {
            var rewardArr = cfg.recharge[k].getReward.split("|");
            for (var i = 0; i < rewardArr.length; i++) {
                var strArr = rewardArr[i].split("_");
                if (strArr[1] == String(cfg.coreReward)) {
                    return { needNum: cfg.recharge[k].needGem, index: Number(k) };
                }
            }
        }
        return { needNum: null, index: null };
    };
    AcNewYearRedVo.prototype.dispose = function () {
        this.lastpos = null;
        this.lastidx = -1;
        this.flags = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearRedVo;
}(AcBaseVo));
__reflect(AcNewYearRedVo.prototype, "AcNewYearRedVo");
//# sourceMappingURL=AcNewYearRedVo.js.map