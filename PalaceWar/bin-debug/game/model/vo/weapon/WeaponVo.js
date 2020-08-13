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
var WeaponVo = (function (_super) {
    __extends(WeaponVo, _super);
    function WeaponVo() {
        var _this = _super.call(this) || this;
        _this.weaponInfoVoObj = null;
        _this.discuss = {};
        return _this;
    }
    WeaponVo.prototype.initData = function (data) {
        if (data) {
            if (data.info) {
                if (this.weaponInfoVoObj == null) {
                    this.weaponInfoVoObj = {};
                }
                for (var key in data.info) {
                    if (this.weaponInfoVoObj[key]) {
                        this.weaponInfoVoObj[key].initData(data.info[key]);
                    }
                    else {
                        var weaponInfoVo = new WeaponInfoVo();
                        weaponInfoVo.id = key;
                        weaponInfoVo.initData(data.info[key]);
                        this.weaponInfoVoObj[key] = weaponInfoVo;
                    }
                }
            }
            if (data.discuss) {
                this.discuss = data.discuss;
            }
        }
    };
    WeaponVo.prototype.haveWeaponById = function (id) {
        if (this.getWeaponInfoVoById(id)) {
            return true;
        }
        return false;
    };
    WeaponVo.prototype.getWeaponInfoVoById = function (id) {
        return this.weaponInfoVoObj[id];
    };
    WeaponVo.prototype.getWeaponInfoVo = function () {
        return this.weaponInfoVoObj;
    };
    WeaponVo.prototype.getWeaponInfoVoByServantId = function (sid) {
        for (var key in this.weaponInfoVoObj) {
            var cfg = Config.ServantweaponCfg.getWeaponItemById(key);
            if (cfg.servantID == Number(sid)) {
                return this.weaponInfoVoObj[key];
            }
        }
        return null;
    };
    WeaponVo.prototype.dispose = function () {
        this.weaponInfoVoObj = null;
        this.discuss = null;
    };
    return WeaponVo;
}(BaseVo));
__reflect(WeaponVo.prototype, "WeaponVo");
//# sourceMappingURL=WeaponVo.js.map