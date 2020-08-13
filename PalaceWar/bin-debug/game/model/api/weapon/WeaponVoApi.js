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
 * 门客神器系统api
 * author shaoliang & qianjun
 * date 2019/7/22
 * @class WeaponVoApi
 */
var WeaponVoApi = (function (_super) {
    __extends(WeaponVoApi, _super);
    function WeaponVoApi() {
        var _this = _super.call(this) || this;
        //最近一次升级的类型，飘字用
        _this.recentUpType = 0;
        return _this;
    }
    WeaponVoApi.prototype.haveWeaponById = function (id) {
        if (this.weaponVo && this.weaponVo.haveWeaponById(String(id))) {
            return true;
        }
        return false;
    };
    WeaponVoApi.prototype.getWeaponInfoVoById = function (id) {
        return this.weaponVo.getWeaponInfoVoById(id);
    };
    WeaponVoApi.prototype.getWeaponInfoVoByServantId = function (sid) {
        return this.weaponVo.getWeaponInfoVoByServantId(sid);
    };
    WeaponVoApi.prototype.getWeaponVo = function () {
        return this.weaponVo;
    };
    WeaponVoApi.prototype.isShowNpc = function () {
        if (Config.ServantweaponCfg.lvNeed <= Api.playerVoApi.getPlayerLevel() && Api.switchVoApi.checkWeaponFunction()) {
            return true;
        }
        return false;
    };
    WeaponVoApi.prototype.dispose = function () {
        this.weaponVo = null;
        this.recentUpType = 0;
        _super.prototype.dispose.call(this);
    };
    return WeaponVoApi;
}(BaseVoApi));
__reflect(WeaponVoApi.prototype, "WeaponVoApi");
//# sourceMappingURL=WeaponVoApi.js.map