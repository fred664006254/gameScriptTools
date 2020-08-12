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
// TypeScript file
var NoticeItemType;
(function (NoticeItemType) {
    NoticeItemType["Arean"] = "arean";
    NoticeItemType["Shop"] = "shop";
})(NoticeItemType || (NoticeItemType = {}));
var NoticeViewItem = (function (_super) {
    __extends(NoticeViewItem, _super);
    function NoticeViewItem() {
        return _super.call(this) || this;
    }
    NoticeViewItem.prototype.initItem = function (index, data, param) {
        this.width = 510;
        this.height = 204;
        switch (data.type) {
            case NoticeItemType.Arean:
                this._body = new NoticeItemArean();
                this._body.initView();
                this.addChild(this._body);
                break;
            case NoticeItemType.Shop:
                this._body = new NoticeItemShop();
                this._body.initView(data.params);
                this.addChild(this._body);
                break;
            default:
                break;
        }
    };
    NoticeViewItem.prototype.getSpaceX = function () {
        return 0;
    };
    NoticeViewItem.prototype.getSpaceY = function () {
        return 6;
    };
    Object.defineProperty(NoticeViewItem.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    NoticeViewItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return NoticeViewItem;
}(ScrollListItem));
__reflect(NoticeViewItem.prototype, "NoticeViewItem");
//# sourceMappingURL=NoticeViewItem.js.map