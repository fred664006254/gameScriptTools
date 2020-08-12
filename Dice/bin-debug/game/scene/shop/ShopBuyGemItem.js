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
var ShopBuyGemItem = (function (_super) {
    __extends(ShopBuyGemItem, _super);
    function ShopBuyGemItem() {
        return _super.call(this) || this;
    }
    ShopBuyGemItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 196 + 10;
        view.height = 235 + 10;
        var bg = BaseBitmap.create("shop_gem_bg");
        // bg.width = 196;
        // bg.height = 235;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0, 0], true);
        view.addChild(bg);
        var txtbg = BaseBitmap.create("shop_name_bg");
        view.addChild(txtbg);
        txtbg.x = 0;
        txtbg.y = 0;
        var getGemTxt = ComponentMgr.getTextField(LangMger.getlocal("shopbuygemget", [data.gemCost.toString()]), TextFieldConst.SIZE_CONTENT_NORMAL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getGemTxt, txtbg, [0, 8]);
        view.addChild(getGemTxt);
        getGemTxt.strokeColor = ColorEnums.strokeBlue;
        getGemTxt.stroke = 1.5;
        var itemGroup = new BaseDisplayObjectContainer();
        itemGroup.width = 120;
        itemGroup.height = 120;
        view.addChild(itemGroup);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, getGemTxt, [0,getGemTxt.height+10]);
        // let iconbg = BaseBitmap.create(`shopgemiconbg`);
        // iconbg.width = 120;
        // iconbg.height = 120;
        // itemGroup.addChild(iconbg);
        var icon = BaseBitmap.create("shopbuygem" + data.sortId);
        itemGroup.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        var costTxt = ComponentMgr.getTextField(data.cost + " <font size=20>" + PlatMgr.getMoneySign() + "</font>", TextFieldConst.SIZE_24);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, costTxt, bg, [0, 20]);
        view.addChild(costTxt);
        App.CommonUtil.addTouchScaleEffect(view, function () {
            Api.ShopVoApi.setTouchType(ShopConst.SHOP_GEM);
            Api.ShopVoApi.setTouchId(data.id);
            Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(icon.localToGlobal().x + icon.width / 2, icon.localToGlobal().y + icon.height / 2));
            PlatMgr.pay(data.id);
        }, view);
    };
    ShopBuyGemItem.prototype.getSpaceY = function () {
        return 0;
    };
    ShopBuyGemItem.prototype.getSpaceX = function () {
        return 0;
    };
    ShopBuyGemItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return ShopBuyGemItem;
}(ScrollListItem));
__reflect(ShopBuyGemItem.prototype, "ShopBuyGemItem");
//# sourceMappingURL=ShopBuyGemItem.js.map