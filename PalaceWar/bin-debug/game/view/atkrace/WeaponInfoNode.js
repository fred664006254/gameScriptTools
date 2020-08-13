/**
 * 战斗中神器信息，代替神器出场动画
 * shaolaing   2020.7.15
 */
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
var WeaponInfoNode = /** @class */ (function (_super) {
    __extends(WeaponInfoNode, _super);
    function WeaponInfoNode() {
        return _super.call(this) || this;
    }
    WeaponInfoNode.prototype.init = function (sid, value, atype) {
        var weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(sid);
        var weaponVo = null;
        if (weaponCfg) {
            weaponVo = Api.weaponVoApi.getWeaponInfoVoById(weaponCfg.id);
        }
        if (!value && weaponVo) {
            value = weaponVo.getSpecialityByType(atype);
        }
        var weaponbg = BaseLoadBitmap.create("weapon_info_bg");
        weaponbg.width = 109;
        weaponbg.height = 86;
        weaponbg.y = 14;
        this.addChild(weaponbg);
        var weaponImg = BaseLoadBitmap.create(weaponCfg.itemIcon);
        weaponImg.width = 80;
        weaponImg.height = 80;
        weaponImg.setPosition(weaponbg.x + weaponbg.width / 2 - weaponImg.width / 2, weaponbg.y + weaponbg.height / 2 - weaponImg.height / 2);
        this.addChild(weaponImg);
        var title = BaseBitmap.create("weapon_info_title");
        title.setPosition(weaponbg.width / 2 - title.width / 2, 0);
        this.addChild(title);
        var nameBg = BaseLoadBitmap.create("weapon_info_addbg");
        nameBg.width = 131;
        nameBg.height = 34;
        nameBg.setPosition(weaponbg.width / 2 - nameBg.width / 2, weaponbg.y + weaponbg.height - 16);
        this.addChild(nameBg);
        // let name = ComponentManager.getTextField(weaponCfg.name,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        // name.setPosition(nameBg.x+nameBg.width/2-name.width/2,nameBg.y+10);
        // this.addChild(name);
        var add = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attack", [String(value)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        add.setPosition(nameBg.x + nameBg.width / 2 - add.width / 2, nameBg.y + 7);
        this.addChild(add);
    };
    return WeaponInfoNode;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=WeaponInfoNode.js.map