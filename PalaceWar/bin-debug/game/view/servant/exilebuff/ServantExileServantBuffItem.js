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
var ServantExileServantBuffItem = (function (_super) {
    __extends(ServantExileServantBuffItem, _super);
    function ServantExileServantBuffItem() {
        return _super.call(this) || this;
    }
    ServantExileServantBuffItem.prototype.initItem = function (index, data, itemparam) {
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = 510;
        bg.height = 126;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 510;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var desc1 = ComponentManager.getTextField(data[0], 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, desc1, titleBg);
        this.addChild(desc1);
        var desc2 = ComponentManager.getTextField(data[1], 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, desc2, titleBg, [0, 58]);
        this.addChild(desc2);
        // let desc3 = ComponentManager.getTextField(data[2],20,TextFieldConst.COLOR_BROWN);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,desc3,titleBg,[0,65]);
        // this.addChild(desc3);
    };
    return ServantExileServantBuffItem;
}(ScrollListItem));
__reflect(ServantExileServantBuffItem.prototype, "ServantExileServantBuffItem");
//# sourceMappingURL=ServantExileServantBuffItem.js.map