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
 * 2048 item
 * author yangtao
 * date 2020.6.10
 * @class AcWeaponHouseItem
 */
var AcWeaponHouseItem = (function (_super) {
    __extends(AcWeaponHouseItem, _super);
    function AcWeaponHouseItem(param) {
        var _this = _super.call(this) || this;
        _this._itemNode = null;
        _this.iconWidth = 108;
        if (param && param.aid) {
            _this._aid = param.aid;
            _this._code = param.code;
            if (_this._aid < String(1)) {
                _this._aid = String(1);
            }
        }
        _this.createItem();
        return _this;
    }
    AcWeaponHouseItem.prototype.getTypeCode = function () {
        if (this._code == "2") {
            return "1";
        }
        return this._code;
    };
    AcWeaponHouseItem.prototype.createItem = function () {
        this._itemNode = new BaseDisplayObjectContainer();
        this._itemNode.width = this._itemNode.height = this.iconWidth;
        this.addChild(this._itemNode);
        this._bg = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_" + this._aid, this.getTypeCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._bg, this._itemNode);
        this.width = this._itemNode.width;
        this.height = this._itemNode.height;
        this._itemNode.anchorOffsetX = this.iconWidth / 2;
        this._itemNode.anchorOffsetY = this.iconWidth / 2;
        this._icon0 = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_icon" + this._aid, this.getTypeCode()));
        this._itemNode.addChild(this._icon0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._icon0, this._bg);
        this._levelField = ComponentManager.getTextField(this._aid, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._levelField, this._bg);
        this._levelbg = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_level_" + this._aid, this.getTypeCode()));
        this._itemNode.addChild(this._levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._levelbg, this._bg, [5, 10]);
    };
    AcWeaponHouseItem.prototype.resetItem = function (aid) {
        this._bg.setRes(App.CommonUtil.getResByCode("ac_weaponhouse_" + aid, this.getTypeCode()));
        this._icon0.setRes(App.CommonUtil.getResByCode("ac_weaponhouse_icon" + aid, this.getTypeCode()));
        this._levelbg.setRes(App.CommonUtil.getResByCode("ac_weaponhouse_level_" + aid, this.getTypeCode()));
        this._levelField.text = aid;
    };
    AcWeaponHouseItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._icon0 = null;
        this._levelbg = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseItem;
}(BaseDisplayObjectContainer));
__reflect(AcWeaponHouseItem.prototype, "AcWeaponHouseItem");
//# sourceMappingURL=AcWeaponHouseItem.js.map