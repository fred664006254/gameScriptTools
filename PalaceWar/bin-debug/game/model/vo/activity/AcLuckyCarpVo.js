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
/**
 * 锦鲤Vo
 * @author 张朝阳
 * data 2019/2/11
 * @class AcLuckyCarpVo
 */
var AcLuckyCarpVo = (function (_super) {
    __extends(AcLuckyCarpVo, _super);
    function AcLuckyCarpVo() {
        var _this = _super.call(this) || this;
        _this.chargeNum = 0;
        _this.getFlag = null;
        return _this;
    }
    AcLuckyCarpVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**个人充值进度 */
    AcLuckyCarpVo.prototype.getChargeNum = function () {
        return this.chargeNum;
    };
    /**是否领取 */
    AcLuckyCarpVo.prototype.isReceive = function () {
        if (this.getFlag["1"]) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcLuckyCarpVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (this.chargeNum >= this.config.rechargeReward.needGem) {
                return !this.isReceive();
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyCarpVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            return App.DateUtil.getFormatBySecond((this.et - GameData.serverTime - 86400 * this.config.extraTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyCarpVo.prototype.dispose = function () {
        this.chargeNum = 0;
        this.getFlag = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyCarpVo;
}(AcBaseVo));
__reflect(AcLuckyCarpVo.prototype, "AcLuckyCarpVo");
//# sourceMappingURL=AcLuckyCarpVo.js.map