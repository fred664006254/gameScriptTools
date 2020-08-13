/**
 * 门客信息 消耗道具升级部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
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
var ServantEquipCostItem = (function (_super) {
    __extends(ServantEquipCostItem, _super);
    function ServantEquipCostItem() {
        return _super.call(this) || this;
    }
    ServantEquipCostItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view.width = 84 + 12;
        view.height = 86 + 10;
        var itemid = data.item;
        var itemcfg = Config.ItemCfg.getItemCfgById(itemid);
        var quality = param;
        var qualitybg = "itembg_" + itemcfg.quality; //quality == -1 ? `itembg_${itemcfg.quality}` : `itembg_${quality+1}`
        var itembg = BaseBitmap.create(qualitybg);
        itembg.setScale(82 / 106);
        itembg.setPosition(0, 2);
        view.addChild(itembg);
        var icon = BaseLoadBitmap.create("itemicon" + itemid);
        icon.width = icon.height = 100;
        icon.setScale(69 / 100);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, itembg);
        view.addChild(icon);
        var total = Api.itemVoApi.getItemNumInfoVoById(itemid);
        var cur = quality != -1 ? total : 0;
        var numTxt = ComponentManager.getTextField(total + "/" + total, 16);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numTxt, itembg, [0, 5]);
        view.addChild(numTxt);
        numTxt.visible = quality != -1;
        var subbtn = ComponentManager.getButton("servantequip_sub", "", function () {
            cur = Math.max(--cur, 0);
            if (cur == 0) {
                subbtn.visible = false;
                numTxt.visible = false;
            }
            numTxt.text = cur + "/" + total;
            App.MessageHelper.dispatchEvent(MessageConst.EQUIP_REVOLUTION_CHOOSE, {
                id: itemid,
                num: cur
            });
        }, view);
        view.addChild(subbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, subbtn, itembg, [-4, -2]);
        subbtn.visible = quality != -1;
        icon.addTouchTap(function () {
            total = Api.itemVoApi.getItemNumInfoVoById(itemid);
            cur = Math.min(++cur, total);
            numTxt.text = cur + "/" + total;
            if (!subbtn.visible) {
                subbtn.visible = true;
                numTxt.visible = true;
            }
            App.MessageHelper.dispatchEvent(MessageConst.EQUIP_REVOLUTION_CHOOSE, {
                id: itemid,
                num: cur
            });
        }, view);
    };
    ServantEquipCostItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        _super.prototype.dispose.call(this);
    };
    return ServantEquipCostItem;
}(ScrollListItem));
__reflect(ServantEquipCostItem.prototype, "ServantEquipCostItem");
