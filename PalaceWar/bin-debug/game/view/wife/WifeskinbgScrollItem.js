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
 *
 * author qianjun
 * @class WifeskinNewScrollItem
 */
var WifeskinbgScrollItem = (function (_super) {
    __extends(WifeskinbgScrollItem, _super);
    function WifeskinbgScrollItem() {
        var _this = _super.call(this) || this;
        _this._group = null;
        return _this;
    }
    WifeskinbgScrollItem.prototype.initItem = function (index, wifeSkinItemCfg) {
        this.width = 266;
        this.height = 190;
        var group = new BaseDisplayObjectContainer();
        group.width = this.width;
        group.height = this.height;
        this.addChild(group);
        this._group = group;
        var bgitem = BaseBitmap.create("wifebgitem");
        group.addChild(bgitem);
        var nameTxt = ComponentManager.getTextField("\u573A\u666F" + (index + 1), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, bgitem, [0, 8]);
        group.addChild(nameTxt);
    };
    WifeskinbgScrollItem.prototype.setSelect = function (index) {
        var view = this;
        view._group.setScale(view._index == index ? 1 : 0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._group, view, [0, 0], true);
    };
    WifeskinbgScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    WifeskinbgScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    WifeskinbgScrollItem.prototype.dispose = function () {
        this._group = null;
        _super.prototype.dispose.call(this);
    };
    return WifeskinbgScrollItem;
}(ScrollListItem));
__reflect(WifeskinbgScrollItem.prototype, "WifeskinbgScrollItem");
//# sourceMappingURL=WifeskinbgScrollItem.js.map