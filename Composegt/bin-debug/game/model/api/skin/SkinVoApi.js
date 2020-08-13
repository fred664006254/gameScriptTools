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
 * 皮肤vo
 * author yanyuling
 * date 2018/08/13
 * @class SkinVo
 */
var SkinVoApi = (function (_super) {
    __extends(SkinVoApi, _super);
    function SkinVoApi() {
        return _super.call(this) || this;
    }
    SkinVoApi.prototype.checkNpcMessage = function () {
        return false;
    };
    SkinVoApi.prototype.isShowNpc = function () {
        // return true;
        return Api.switchVoApi.checkOpenSkinBuilding();
    };
    SkinVoApi.prototype.getServantSkinFirstInfo = function (skinId) {
        if (!this.skinVo || !this.skinVo.sinfo || !this.skinVo.sinfo[skinId]) {
            return null;
        }
        return this.skinVo.sinfo[skinId];
    };
    SkinVoApi.prototype.getWifeSkinFirstInfo = function (skinId) {
        if (!this.skinVo || !this.skinVo.winfo || !this.skinVo.winfo[skinId]) {
            return null;
        }
        return this.skinVo.winfo[skinId];
    };
    SkinVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SkinVoApi;
}(BaseVoApi));
__reflect(SkinVoApi.prototype, "SkinVoApi");
