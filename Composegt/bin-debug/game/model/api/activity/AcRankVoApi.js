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
 * 活动排名通用api
 * author dmj
 * date 2017/11/9
 * @class AcRankVoApi
 */
var AcRankVoApi = (function (_super) {
    __extends(AcRankVoApi, _super);
    function AcRankVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 根据aid和code获取acrankinfovo
     * @param aid 活动id
     * @param code  活动版本
     */
    AcRankVoApi.prototype.getAcRankInfoVoByAidAndCode = function (aid, code) {
        var aidAndCode = aid + "-" + code;
        var acRankInfoVoObj = this.acRankVo.acRankInfoVoObj;
        if (acRankInfoVoObj && acRankInfoVoObj[aidAndCode]) {
            return acRankInfoVoObj[aidAndCode];
        }
        return null;
    };
    AcRankVoApi.prototype.dispose = function () {
        this.acRankVo = null;
        _super.prototype.dispose.call(this);
    };
    return AcRankVoApi;
}(BaseVoApi));
__reflect(AcRankVoApi.prototype, "AcRankVoApi");
