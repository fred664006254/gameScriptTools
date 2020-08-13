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
var CrossPowerVoApi = (function (_super) {
    __extends(CrossPowerVoApi, _super);
    function CrossPowerVoApi() {
        var _this = _super.call(this) || this;
        _this._zonerankinfos = null;
        _this._prankinfos = null;
        _this._iszonewin = 0;
        _this._merank = 0;
        _this._mepoint = 0;
        _this._countDownTime = 0;
        _this._zidgroups = 0;
        return _this;
    }
    CrossPowerVoApi.prototype.getCountDownTime = function () {
        return this._countDownTime;
    };
    CrossPowerVoApi.prototype.setCountDownTime = function (time) {
        this._countDownTime = time;
    };
    CrossPowerVoApi.prototype.setZoneRankInfo = function (data) {
        this._zonerankinfos = data.atkranks;
        this._iszonewin = data.iszonewin;
        this._zidgroups = data.zidgroups;
    };
    CrossPowerVoApi.prototype.setPRankInfo = function (data) {
        this._prankinfos = data.atkranks;
        this._merank = data.merank;
        this._mepoint = data.mepoint;
    };
    Object.defineProperty(CrossPowerVoApi.prototype, "zidLength", {
        get: function () {
            return this._zidgroups ? this._zidgroups.length : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossPowerVoApi.prototype, "zonerankinfos", {
        get: function () {
            return this._zonerankinfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossPowerVoApi.prototype, "prankinfos", {
        get: function () {
            return this._prankinfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossPowerVoApi.prototype, "iszonewin", {
        get: function () {
            return this._iszonewin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossPowerVoApi.prototype, "merank", {
        get: function () {
            return this._merank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrossPowerVoApi.prototype, "mepoint", {
        get: function () {
            return this._mepoint;
        },
        enumerable: true,
        configurable: true
    });
    CrossPowerVoApi.prototype.dispose = function () {
        this._zonerankinfos = null;
        this._prankinfos = null;
        this._crossPowerVo = null;
        _super.prototype.dispose.call(this);
    };
    return CrossPowerVoApi;
}(BaseVoApi));
__reflect(CrossPowerVoApi.prototype, "CrossPowerVoApi");
