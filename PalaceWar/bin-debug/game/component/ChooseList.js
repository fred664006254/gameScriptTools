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
 * 选择列表
 * author shaoliang
 */
var ChooseList = (function (_super) {
    __extends(ChooseList, _super);
    function ChooseList() {
        return _super.call(this) || this;
    }
    ChooseList.prototype.init = function (strings, w, f, o) {
        var max = 8;
        var h = 32 * max;
        if (strings.length < max) {
            h = 32 * strings.length;
        }
        var bg = BaseBitmap.create("public_9_bg8");
        bg.width = w + 3;
        bg.height = h + 2;
        bg.setPosition(-1, -1);
        this.addChild(bg);
        var rect = new egret.Rectangle(0, 0, w + 1, h);
        var list = ComponentManager.getScrollList(ChooseListItem, strings, rect, { w: w, o: o, f: f });
        list.bounces = false;
        this.addChild(list);
    };
    ChooseList.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChooseList;
}(BaseDisplayObjectContainer));
__reflect(ChooseList.prototype, "ChooseList");
//# sourceMappingURL=ChooseList.js.map