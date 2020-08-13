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
var AcDiscountVo = (function (_super) {
    __extends(AcDiscountVo, _super);
    function AcDiscountVo() {
        var _this = _super.call(this) || this;
        /**买了几次 只有 月卡有 */
        _this.hasBuy = 0;
        return _this;
    }
    AcDiscountVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**月卡买了几次 */
    AcDiscountVo.prototype.getHasBuy = function () {
        return this.hasBuy;
    };
    AcDiscountVo.prototype.getMouthLimitNum = function () {
        var num = 0;
        var mouthCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (mouthCfg && mouthCfg.limit) {
            return mouthCfg.limit - this.hasBuy;
        }
        return num;
    };
    AcDiscountVo.prototype.checkBuyMouth = function () {
        var mouthCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (mouthCfg && mouthCfg.limit > this.hasBuy) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcDiscountVo.prototype, "isShowRedDot", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDiscountVo.prototype, "acTime", {
        /**
         * 活动开始结束时间，格式：x月x日-x月x日
         */
        get: function () {
            var loopTime = Number(Config.GameprojectCfg.cycle[this.aid + "_" + this.code]);
            if (Api.switchVoApi.checkOpenDiscountLoopTime() && loopTime) {
                var newSt = GameData.serverTime - (GameData.serverTime - this.st) % (loopTime);
                var newEt = (newSt + loopTime) < this.et ? (newSt + loopTime) : this.et;
                return App.DateUtil.getOpenLocalTime(newSt, newEt, false);
            }
            else {
                return egret.superGetter(AcDiscountVo, this, "acTime");
            }
        },
        enumerable: true,
        configurable: true
    });
    AcDiscountVo.prototype.dispose = function () {
        this.v = 0;
        this.hasBuy = 0;
        _super.prototype.dispose.call(this);
    };
    return AcDiscountVo;
}(AcBaseVo));
__reflect(AcDiscountVo.prototype, "AcDiscountVo");
//# sourceMappingURL=AcDiscountVo.js.map