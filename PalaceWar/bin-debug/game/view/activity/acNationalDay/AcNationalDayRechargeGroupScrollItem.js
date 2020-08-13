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
  * 国庆活动充值奖励Groupitem
  * author yangchengguo
  * date 2019.9.9
  * @class AcNationalDayRechargeGroupScrollItem
  */
var AcNationalDayRechargeGroupScrollItem = (function (_super) {
    __extends(AcNationalDayRechargeGroupScrollItem, _super);
    function AcNationalDayRechargeGroupScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = [];
        _this._aid = null;
        _this._code = null;
        _this._chargeItems = [];
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcNationalDayRechargeGroupScrollItem.prototype.initItem = function (index, itemData, itemParam) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = itemData;
        this._chargeItems = [];
        var topBgStr = ResourceManager.hasRes("acnationalday_charge_item_flag-" + this.getTypeCode() + "_" + itemData.id) ? "acnationalday_charge_item_flag-" + this.getTypeCode() + "_" + itemData.id : "acnationalday_charge_item_flag-1_" + itemData.id;
        var topBg = BaseBitmap.create(topBgStr);
        this.addChild(topBg);
        if (index > 0) {
            topBg.y = 20;
        }
        var topTf = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayChargeItemTitle-" + this.getTypeCode() + "_" + itemData.id), 42, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTf.setPosition(topBg.x + 15, topBg.y + topBg.height / 2 - topTf.height / 2);
        this.addChild(topTf);
        var itemY = topBg.y + topBg.height + 10;
        for (var i = 0; i < itemData.data.length; i++) {
            var item = new AcNationalDayRechargeScrollItem();
            item.initItem(i, itemData.data[i], { aid: this._aid, code: this._code });
            if (i > 0) {
                itemY = this._chargeItems[i - 1].y + this._chargeItems[i - 1].height + 8;
            }
            else {
                itemY = topBg.y + topBg.height + 10;
            }
            item.setPosition(topBg.x, itemY);
            this.addChild(item);
            this._chargeItems[i] = item;
        }
    };
    AcNationalDayRechargeGroupScrollItem.prototype.getChargeItems = function () {
        return this._chargeItems;
    };
    AcNationalDayRechargeGroupScrollItem.prototype.getTypeCode = function () {
        if (this._code == "2") {
            return "1";
        }
        return this._code;
    };
    AcNationalDayRechargeGroupScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._chargeItems = [];
        this._data = [];
        _super.prototype.dispose.call(this);
    };
    return AcNationalDayRechargeGroupScrollItem;
}(ScrollListItem));
__reflect(AcNationalDayRechargeGroupScrollItem.prototype, "AcNationalDayRechargeGroupScrollItem");
//# sourceMappingURL=AcNationalDayRechargeGroupScrollItem.js.map