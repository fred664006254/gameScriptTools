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
var AcGemLotteryVo = (function (_super) {
    __extends(AcGemLotteryVo, _super);
    function AcGemLotteryVo() {
        var _this = _super.call(this) || this;
        _this.num = 0;
        return _this;
    }
    AcGemLotteryVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM);
    };
    Object.defineProperty(AcGemLotteryVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGemLotteryVo.prototype, "havenum", {
        get: function () {
            return this.num || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGemLotteryVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isInActivity() && this.num && this.num > 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcGemLotteryVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcGemLotteryVo.prototype.isInExtra = function () {
        if (this.isInActivity() && this.config) {
            var extraTime = this.config.extraTime;
            if (extraTime) {
                return GameData.serverTime > this.et - 86400 * extraTime;
            }
        }
        return false;
    };
    AcGemLotteryVo.prototype.dispose = function () {
        this.num = 0;
    };
    return AcGemLotteryVo;
}(AcBaseVo));
__reflect(AcGemLotteryVo.prototype, "AcGemLotteryVo");
