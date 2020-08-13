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
  * 神器分解item
  * author weixiaozhe
  * date 2020.5.25
  * @class WeaponResolveItem
  */
var WeaponResolveItem = (function (_super) {
    __extends(WeaponResolveItem, _super);
    function WeaponResolveItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    WeaponResolveItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        var cfg = data.cfg;
        var servCfg = Config.ServantCfg.getServantItemById(cfg.servantID);
        var iteminfo = Api.itemVoApi.getItemInfoVoById(cfg.itemID);
        var str = "6_" + iteminfo.id + "_" + iteminfo.num;
        this.width = 530;
        var itemBg = BaseBitmap.create("public_popupscrollitembg");
        itemBg.x = 10;
        this.addChild(itemBg);
        var icon = GameData.getRewardItemIcons(str, true, false)[0];
        icon.setScale(0.9);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, icon, itemBg, [20, 0]);
        this.addChild(icon);
        var nameBg = BaseBitmap.create("public_titlebg");
        nameBg.width = 240;
        nameBg.x = icon.x + icon.width * icon.scaleX + 5;
        nameBg.y = icon.y;
        this.addChild(nameBg);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("weaponResolveItemDesc1", [iteminfo.name, servCfg.name]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, desc1, nameBg, [10, 0]);
        this.addChild(desc1);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("weaponResolveItemDesc2", [String(cfg.resolveNum)]), 18, TextFieldConst.COLOR_BROWN);
        desc2.setPosition(desc1.x, nameBg.y + nameBg.height + 10);
        this.addChild(desc2);
        var dealBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "weaponResolveBtnTxt", function () {
            if (iteminfo.num > 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.WEAPONRESOLVEITEMUSEPOPUPVIEW, { wid: data.id, itemId: iteminfo.id, maxNum: iteminfo.num, cost: cfg.resolveNum, callback: null, handler: _this });
            }
            else {
                var message = LanguageManager.getlocal("weaponResolveSureTxt", ["1", iteminfo.name, String(cfg.resolveNum)]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: message,
                    title: "itemUseConstPopupViewTitle",
                    touchMaskClose: true,
                    callback: function () {
                        NetManager.request(NetRequestConst.REQUEST_WEAPON_RESOLVE, { weaponId: Number(data.id), num: 1 });
                    },
                    handler: _this,
                    needClose: 1,
                    needCancel: true
                });
            }
        }, this);
        this.setLayoutPosition(LayoutConst.rightverticalCenter, dealBtn, itemBg, [10, 0]);
        this.addChild(dealBtn);
    };
    WeaponResolveItem.prototype.getSpaceY = function () {
        return 5;
    };
    WeaponResolveItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return WeaponResolveItem;
}(ScrollListItem));
__reflect(WeaponResolveItem.prototype, "WeaponResolveItem");
//# sourceMappingURL=WeaponResolveItem.js.map