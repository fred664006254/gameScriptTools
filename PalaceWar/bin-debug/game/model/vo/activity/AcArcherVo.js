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
var AcArcherVo = (function (_super) {
    __extends(AcArcherVo, _super);
    function AcArcherVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.binfo = null;
        _this.isfree = 0;
        return _this;
    }
    AcArcherVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**
     * 获取抽奖的次数
     */
    AcArcherVo.prototype.getArcherNum = function () {
        return this.ainfo.v;
    };
    /**
     * 获取累积充值数目
     */
    AcArcherVo.prototype.getChargeNum = function () {
        return this.binfo.v;
    };
    Object.defineProperty(AcArcherVo.prototype, "acTimeAndHour", {
        /**
         * 活动时间
         */
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArcherVo.prototype, "isFree", {
        /**
         * 是否免费
         */
        get: function () {
            var deltaT = this.et - GameData.serverTime - 86400 * 1;
            if (deltaT < 0) {
                return false;
            }
            if (this.isfree == 0) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 充值档位是否已经领取
    */
    AcArcherVo.prototype.isReceive = function (id) {
        if (this.binfo.flags[id] == null || this.binfo.flags[id] == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * 宝箱是否已经领取
    */
    AcArcherVo.prototype.isBoxReceive = function (id) {
        if (this.ainfo.flags[id] == null || this.ainfo.flags[id] == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Object.defineProperty(AcArcherVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            return this.isFree || this.isHaveRedDot() || this.isHaveRedDot2();
        },
        enumerable: true,
        configurable: true
    });
    AcArcherVo.prototype.isHaveRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.recharge.length; i++) {
            if (this.getChargeNum() >= cfg.recharge[i].needGem) {
                if (!this.isReceive(i + 1)) {
                    return true;
                }
            }
        }
        return false;
    };
    AcArcherVo.prototype.isHaveRedDot2 = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.lotteryNum.length; i++) {
            if (this.getArcherNum() >= cfg.lotteryNum[i].needNum) {
                if (!this.isBoxReceive(i + 1)) {
                    return true;
                }
            }
        }
        return false;
    };
    AcArcherVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
    };
    return AcArcherVo;
}(AcBaseVo));
__reflect(AcArcherVo.prototype, "AcArcherVo");
//# sourceMappingURL=AcArcherVo.js.map