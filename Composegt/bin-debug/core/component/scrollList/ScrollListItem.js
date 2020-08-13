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
 * 滑动列表元素类
 * author 陈可
 * date 2017/9/22
 * @class ScrollListItem
 */
var ScrollListItem = (function (_super) {
    __extends(ScrollListItem, _super);
    function ScrollListItem() {
        var _this = _super.call(this) || this;
        _this._index = NaN;
        _this.__data = null;
        return _this;
    }
    ScrollListItem.prototype.init = function (index, data, itemParam) {
        this._index = index;
        this.__data = data;
        this.initItem(index, data, itemParam);
        this.initBg();
    };
    ScrollListItem.prototype.initBg = function () {
        var bg = BaseBitmap.create("public_alphabg");
        var rect = this.getBounds();
        bg.width = this.width + this.getSpaceX();
        bg.height = this.height + this.getSpaceY();
        this.addChildAt(bg, 0);
    };
    ScrollListItem.prototype.initItem = function (index, data, itemParam) {
    };
    /**
     * 不同格子X间距
     */
    ScrollListItem.prototype.getSpaceX = function () {
        return 5;
    };
    /**
     * 不同格子Y间距
     */
    ScrollListItem.prototype.getSpaceY = function () {
        return 5;
    };
    ScrollListItem.prototype.dispose = function () {
        this.__data = null;
        this._index = NaN;
        _super.prototype.dispose.call(this);
    };
    /**
     * 对象池取
     * @param index 索引
     * @param data 数据
     */
    ScrollListItem.create = function (classDomin, index, data, itemParam) {
        var targetClassName = egret.getQualifiedClassName(classDomin);
        if (ScrollListItem.scrollListItemPool[targetClassName] == null) {
            ScrollListItem.scrollListItemPool[targetClassName] = [];
        }
        var scrollListItem = App.DisplayUtil.useObjectPool ? ScrollListItem.scrollListItemPool[targetClassName].pop() : null;
        if (!scrollListItem) {
            ScrollListItem.isCanNew = true;
            scrollListItem = new classDomin();
            ScrollListItem.isCanNew = false;
        }
        scrollListItem.init(index, data, itemParam);
        return scrollListItem;
    };
    /**
     * 对象池存
     * @param scrollListItem
     */
    ScrollListItem.release = function (scrollListItem) {
        if (!scrollListItem) {
            return;
        }
        scrollListItem.dispose();
        scrollListItem.setPosition(0, 0);
        scrollListItem.setScale(1);
        scrollListItem.rotation = 0;
        scrollListItem.alpha = 1;
        scrollListItem.width = NaN;
        scrollListItem.height = NaN;
        scrollListItem.mask = null;
        scrollListItem.scrollRect = null;
        scrollListItem.filters = null;
        if (App.DisplayUtil.useObjectPool) {
            var targetClassName = egret.getQualifiedClassName(scrollListItem);
            if (ScrollListItem.scrollListItemPool[targetClassName] == null) {
                ScrollListItem.scrollListItemPool[targetClassName] = [];
            }
            var targetPool = ScrollListItem.scrollListItemPool[targetClassName];
            if (targetPool.indexOf(scrollListItem) < 0) {
                targetPool.push(scrollListItem);
            }
        }
    };
    ScrollListItem.scrollListItemPool = {};
    ScrollListItem.isCanNew = false;
    return ScrollListItem;
}(BaseDisplayObjectContainer));
__reflect(ScrollListItem.prototype, "ScrollListItem");
