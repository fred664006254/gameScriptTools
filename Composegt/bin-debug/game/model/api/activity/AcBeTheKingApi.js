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
 * 裁缝
 * author dmj
 * date 2018/03/01
 * @class AcTailorApi
 */
var AcBeTheKingApi = (function (_super) {
    __extends(AcBeTheKingApi, _super);
    function AcBeTheKingApi() {
        return _super.call(this) || this;
    }
    AcBeTheKingApi.prototype.setRankInfos = function (ranks) {
        this._rankList = ranks;
    };
    AcBeTheKingApi.prototype.getRankInfos = function () {
        return this._rankList;
    };
    AcBeTheKingApi.prototype.getCurActivityId = function () {
        return this.acBeTheKingVo.aidAndCode;
    };
    AcBeTheKingApi.prototype.dispose = function () {
        this.acBeTheKingVo = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeTheKingApi;
}(BaseVoApi));
__reflect(AcBeTheKingApi.prototype, "AcBeTheKingApi");
