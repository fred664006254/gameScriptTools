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
 * 好礼相送VO
 */
var AcGiftReturnVo = (function (_super) {
    __extends(AcGiftReturnVo, _super);
    function AcGiftReturnVo() {
        var _this = _super.call(this) || this;
        _this.task = null;
        return _this;
    }
    AcGiftReturnVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcGiftReturnVo.prototype.getChargeValue = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        return this.task && this.task.v && this.task.v[cfg.task.questType] ? this.task.v[cfg.task.questType] - this.getReceiveNum() * cfg.task.value : 0;
    };
    /**领取次数 */
    AcGiftReturnVo.prototype.getReceiveNum = function () {
        return this.task && this.task.flags && this.task.flags["1"] ? this.task.flags["1"] : 0;
    };
    AcGiftReturnVo.prototype.checkReceiveReward = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.getReceiveNum() < cfg.task.times) {
            if (this.getChargeValue() >= cfg.task.value) {
                return true;
            }
        }
        return false;
    };
    AcGiftReturnVo.prototype.checkReceiveEndReward = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.getReceiveNum() >= cfg.task.times) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcGiftReturnVo.prototype, "isShowRedDot", {
        /**
        * 红点显示
        */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            return this.checkReceiveReward();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGiftReturnVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    AcGiftReturnVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcGiftReturnVo;
}(AcBaseVo));
__reflect(AcGiftReturnVo.prototype, "AcGiftReturnVo");
//# sourceMappingURL=AcGiftReturnVo.js.map