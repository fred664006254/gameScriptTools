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
var WeaponAttrItem = (function (_super) {
    __extends(WeaponAttrItem, _super);
    function WeaponAttrItem() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        _this._power = null;
        _this._weaponId = null;
        return _this;
    }
    WeaponAttrItem.prototype.init = function (type, weaponid) {
        this._type = type;
        this._weaponId = weaponid;
        var picstr = type > 4 ? "servant_season_bg2" : "weapon_attribute_bg1";
        var bg = BaseLoadBitmap.create(picstr);
        bg.width = 241;
        bg.height = 84;
        this.addChild(bg);
        var name = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name_" + type), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(bg.width / 2 - name.width / 2, 7);
        this.addChild(name);
        var powername = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        powername.setPosition(40, 40);
        this.addChild(powername);
        if (type == 5) {
            powername.text = LanguageManager.getlocal("weapon_speciality_power_2");
        }
        else if (type == 8) {
            powername.text = LanguageManager.getlocal("weapon_speciality_power_3");
        }
        else {
            powername.text = LanguageManager.getlocal("weapon_speciality_power_1");
        }
        this._power = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._power.width = 110;
        this._power.textAlign = egret.HorizontalAlign.RIGHT;
        this._power.setPosition(90, 40);
        this.addChild(this._power);
    };
    WeaponAttrItem.prototype.setPower = function () {
        var weaponVo = Api.weaponVoApi.getWeaponInfoVoById(this._weaponId);
        this._power.text = "+" + weaponVo.getSpecialityByType(this._type);
    };
    WeaponAttrItem.prototype.dispose = function () {
        this._type = 0;
        this._power = null;
        this._weaponId = null;
        _super.prototype.dispose.call(this);
    };
    return WeaponAttrItem;
}(BaseDisplayObjectContainer));
__reflect(WeaponAttrItem.prototype, "WeaponAttrItem");
//# sourceMappingURL=WeaponAttrItem.js.map