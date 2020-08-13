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
 * 红点api
 */
var RedpointVoApi = (function (_super) {
    __extends(RedpointVoApi, _super);
    function RedpointVoApi() {
        var _this = _super.call(this) || this;
        _this.initRedpoint = null;
        return _this;
    }
    RedpointVoApi.prototype.checkHaveRedPointByAid = function (aid, type) {
        var flag = false;
        if (this.redpointVo) {
            flag = this.redpointVo.checkHavePointByAid(aid, type);
        }
        return flag;
    };
    RedpointVoApi.prototype.formatInitRedpoint = function (data) {
        this.initRedpoint = data;
    };
    /**
     * 检测红点,暂时只支持initRedpoint字段，后续功能统一红点需扩展
     * @param model
     */
    RedpointVoApi.prototype.checkRedPoint = function (model) {
        return !!this.initRedpoint[model];
    };
    RedpointVoApi.prototype.dispose = function () {
        this.initRedpoint = null;
        this.redpointVo = null;
        _super.prototype.dispose.call(this);
    };
    return RedpointVoApi;
}(BaseVoApi));
__reflect(RedpointVoApi.prototype, "RedpointVoApi");
//# sourceMappingURL=RedpointVoApi.js.map