var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WeaponAttr2Item = /** @class */ (function (_super) {
    __extends(WeaponAttr2Item, _super);
    function WeaponAttr2Item() {
        return _super.call(this) || this;
    }
    WeaponAttr2Item.prototype.init = function (type, weaponid) {
        this._type = type;
        this._weaponId = weaponid;
        var picstr = "servant_season_bg3";
        var bg = BaseLoadBitmap.create(picstr);
        bg.width = 241;
        bg.height = 84;
        this.addChild(bg);
        var cfg = Config.ServantweaponCfg.getWeaponItemById(weaponid);
        var name = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute_type" + type), 20, TextFieldConst.COLOR_QUALITY_RED);
        name.setPosition(bg.width / 2 - name.width / 2, 7);
        this.addChild(name);
        var powername = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        powername.width = 90;
        powername.lineSpacing = 3;
        powername.setPosition(30, 40);
        this.addChild(powername);
        powername.text = LanguageManager.getlocal("weapon_attribute_type" + type + "_name" + cfg.attributeType1);
        this._power = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._power.width = 110;
        this._power.textAlign = egret.HorizontalAlign.RIGHT;
        this._power.setPosition(110, 40);
        this.addChild(this._power);
        // let vo = <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS);
        // let corner = BaseLoadBitmap.create(vo?"servant_season_flag1":"servant_season_flag2");
        // corner.width = 74;
        // corner.height = 65;
        // this.addChild(corner);
    };
    WeaponAttr2Item.prototype.setPower = function () {
        var weaponVo = Api.weaponVoApi.getWeaponInfoVoById(this._weaponId);
        this._power.text = "+" + weaponVo.getAttributeValueByType(this._type);
    };
    return WeaponAttr2Item;
}(WeaponAttrItem));
//# sourceMappingURL=WeaponAttr2Item.js.map