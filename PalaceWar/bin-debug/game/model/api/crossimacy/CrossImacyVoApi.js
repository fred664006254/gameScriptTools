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
var CrossImacyVoApi = (function (_super) {
    __extends(CrossImacyVoApi, _super);
    function CrossImacyVoApi() {
        var _this = _super.call(this) || this;
        _this._zonerankinfos = null;
        _this._prankinfos = null;
        _this._iszonewin = 0;
        _this._merank = 0;
        _this._mepoint = 0;
        _this._countDownTime = 0;
        _this._flagRankInfo = null;
        return _this;
    }
    CrossImacyVoApi.prototype.getCountDownTime = function () {
        return this._countDownTime;
    };
    CrossImacyVoApi.prototype.setCountDownTime = function (time) {
        this._countDownTime = time;
    };
    CrossImacyVoApi.prototype.setZoneRankInfo = function (data) {
        this._zonerankinfos = data.atkranks;
        this._iszonewin = data.iszonewin;
    };
    CrossImacyVoApi.prototype.setPRankInfo = function (data) {
        this._prankinfos = data.atkranks;
        this._merank = data.merank;
        this._mepoint = data.mepoint;
    };
    CrossImacyVoApi.prototype.setFlagRankInfo = function (data) {
        this._flagRankInfo = data;
    };
    Object.defineProperty(CrossImacyVoApi.prototype, "flagRankInfo", {
        get: function () {
            return this._flagRankInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossImacyVoApi.prototype, "zonerankinfos", {
        get: function () {
            return this._zonerankinfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossImacyVoApi.prototype, "prankinfos", {
        get: function () {
            return this._prankinfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossImacyVoApi.prototype, "iszonewin", {
        get: function () {
            return this._iszonewin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossImacyVoApi.prototype, "merank", {
        get: function () {
            return this._merank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossImacyVoApi.prototype, "mepoint", {
        get: function () {
            return this._mepoint;
        },
        enumerable: true,
        configurable: true
    });
    CrossImacyVoApi.prototype.dispose = function () {
        this._zonerankinfos = null;
        this._prankinfos = null;
        this._crossImacyVo = null;
        this._flagRankInfo = null;
        _super.prototype.dispose.call(this);
    };
    return CrossImacyVoApi;
}(BaseVoApi));
__reflect(CrossImacyVoApi.prototype, "CrossImacyVoApi");
//# sourceMappingURL=CrossImacyVoApi.js.map