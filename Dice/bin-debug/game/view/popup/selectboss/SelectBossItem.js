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
var SelectBossItem = (function (_super) {
    __extends(SelectBossItem, _super);
    function SelectBossItem() {
        var _this = _super.call(this) || this;
        _this._group = null;
        return _this;
    }
    SelectBossItem.prototype.initItem = function (index, data) {
        var view = this;
        view.touchEnabled = false;
        view.width = 213;
        view.height = 168;
        var boss = data;
        var group = new BaseDisplayObjectContainer();
        group.width = 204;
        view.addChild(group);
        var shadow = BaseBitmap.create("selectbossshadow");
        group.addChild(shadow);
        var img = BaseLoadBitmap.create("boss_icon_" + boss);
        group.addChild(img);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, img, shadow, [0, 0]);
        shadow.x = 27;
        img.x = 10;
        group.anchorOffsetX = group.width / 2;
        group.anchorOffsetY = group.height / 2;
        group.setScale(0.75);
        view._group = group;
        group.setPosition(view.width / 2, view.height / 2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, view);
    };
    SelectBossItem.prototype.showSelect = function () {
        var view = this;
        egret.Tween.get(view._group).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            egret.Tween.removeTweens(view._group);
        }, view);
    };
    SelectBossItem.prototype.getSpaceY = function () {
        return 0;
    };
    SelectBossItem.prototype.getSpaceX = function () {
        return 0;
    };
    SelectBossItem.prototype.dispose = function () {
        var view = this;
        view._group.dispose();
        view._group = null;
        _super.prototype.dispose.call(this);
    };
    return SelectBossItem;
}(ScrollListItem));
__reflect(SelectBossItem.prototype, "SelectBossItem");
//# sourceMappingURL=SelectBossItem.js.map