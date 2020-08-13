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
 * 首冲重置VO
 */
var AcRechargeResetVo = (function (_super) {
    __extends(AcRechargeResetVo, _super);
    function AcRechargeResetVo() {
        var _this = _super.call(this) || this;
        _this._lastOpenTime = -1;
        return _this;
    }
    AcRechargeResetVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcRechargeResetVo.prototype.setOpenTime = function () {
        this._lastOpenTime = GameData.serverTime;
        var localkey = "AcOpenTime_" + this.aidAndCode + Api.playerVoApi.getPlayerID();
        LocalStorageManager.set(localkey, String(this._lastOpenTime));
    };
    Object.defineProperty(AcRechargeResetVo.prototype, "isShowRedDot", {
        /**
        * 红点显示
        */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            if (this._lastOpenTime == -1) {
                var localkey = "AcOpenTime_" + this.aidAndCode + Api.playerVoApi.getPlayerID();
                var timeStr = LocalStorageManager.get(localkey);
                if (timeStr && timeStr != "") {
                    this._lastOpenTime = Number(timeStr);
                }
                else {
                    this._lastOpenTime = 0;
                }
            }
            if (App.DateUtil.checkIsToday(this._lastOpenTime)) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeResetVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeResetVo.prototype.dispose = function () {
        this._lastOpenTime = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeResetVo;
}(AcBaseVo));
__reflect(AcRechargeResetVo.prototype, "AcRechargeResetVo");
//# sourceMappingURL=AcRechargeResetVo.js.map