/**
 * 八王称帝api
 * author shaoliang
 * date 2018/5/9
 * @class EmperorwarVoApi
 */
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
var EmperorwarVoApi = (function (_super) {
    __extends(EmperorwarVoApi, _super);
    function EmperorwarVoApi() {
        var _this = _super.call(this) || this;
        _this.emperorwarVo = null;
        _this.emperorwarActiveVo = null;
        return _this;
    }
    EmperorwarVoApi.prototype.setActiveInfo = function (info) {
        if (!this.emperorwarActiveVo) {
            this.emperorwarActiveVo = new EmperorwarActiveVo();
        }
        this.emperorwarActiveVo.initData(info);
    };
    EmperorwarVoApi.prototype.dispose = function () {
        if (this.emperorwarVo) {
            this.emperorwarVo.dispose();
            this.emperorwarVo = null;
        }
        if (this.emperorwarActiveVo) {
            this.emperorwarActiveVo.dispose();
            this.emperorwarActiveVo = null;
        }
        _super.prototype.dispose.call(this);
    };
    return EmperorwarVoApi;
}(BaseVoApi));
__reflect(EmperorwarVoApi.prototype, "EmperorwarVoApi");
