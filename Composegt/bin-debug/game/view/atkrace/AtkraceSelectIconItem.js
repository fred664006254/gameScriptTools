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
var AtkraceSelectIconItem = (function (_super) {
    __extends(AtkraceSelectIconItem, _super);
    function AtkraceSelectIconItem() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AtkraceSelectIconItem.prototype.initView = function () {
    };
    AtkraceSelectIconItem.prototype.refreshView = function (data) {
        this.data = data;
        this.x = this.data.index * 89;
        this.y = 0;
        this._bg && this._bg.dispose();
        this._icon && this._icon.dispose();
        if (this.data.servant) {
            this._bg = BaseLoadBitmap.create(this.data.servant.qualityBoxImgPath);
            this._bg.width = this._bg.height = 82;
            this.addChild(this._bg);
            this._icon = BaseLoadBitmap.create(this.data.servant.halfImgPath);
            this._icon.width = this._icon.height = 74;
            this.addChild(this._icon);
            this._icon.setPosition(4, 4);
        }
    };
    Object.defineProperty(AtkraceSelectIconItem.prototype, "isEmpty", {
        get: function () {
            return this.data.servant ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtkraceSelectIconItem.prototype, "servantId", {
        get: function () {
            return this.data.servant ? this.data.servant.servantId : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtkraceSelectIconItem.prototype, "Index", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    AtkraceSelectIconItem.prototype.moveToPos = function (dx, dy) {
        var _a = [this.data.index * 89, 0], _tx = _a[0], _ty = _a[1];
        this.x = _tx + dx;
        this.y = _ty + dy;
    };
    AtkraceSelectIconItem.prototype.dispose = function () {
        this.data = null;
        this._bg = null;
        this._icon = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceSelectIconItem;
}(BaseDisplayObjectContainer));
__reflect(AtkraceSelectIconItem.prototype, "AtkraceSelectIconItem");
