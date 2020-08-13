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
 * 表情包Item
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonView
 */
var EmoticonItem = (function (_super) {
    __extends(EmoticonItem, _super);
    function EmoticonItem() {
        var _this = _super.call(this) || this;
        _this._iconBg = null;
        _this._iconLock = null;
        _this._selectBg = null;
        return _this;
    }
    EmoticonItem.prototype.initItem = function (index, data) {
        this.width = 110;
        this.height = 110;
        var selectBg = BaseBitmap.create("public_9_bg76");
        selectBg.width = this.width;
        selectBg.height = this.height;
        this.addChild(selectBg);
        this._selectBg = selectBg;
        selectBg.visible = false;
        var iconBg = BaseLoadBitmap.create("emoticonicon_" + data.id);
        iconBg.width = this.width;
        iconBg.height = this.width;
        this.addChild(iconBg);
        this._iconBg = iconBg;
        if (data.status == 0) {
            var iconLock = BaseBitmap.create("emoticon_lock");
            iconLock.setPosition(iconBg.x + this._iconBg.width - iconLock.width, iconBg.y);
            this.addChild(iconLock);
            this._iconLock = iconLock;
        }
    };
    EmoticonItem.prototype.refreshEmoticonItem = function (data) {
        this._iconBg.setload("emoticonicon_" + data.id);
        if (data.status == 0) {
            if (this._iconLock) {
                this._iconLock.visible = true;
            }
            else {
                var iconLock = BaseBitmap.create("emoticon_lock");
                iconLock.setPosition(this._iconBg.x + this._iconBg.width - iconLock.width, this._iconBg.y);
                this.addChild(iconLock);
                this._iconLock = iconLock;
            }
        }
        else {
            if (this._iconLock) {
                this._iconLock.visible = false;
            }
        }
    };
    EmoticonItem.prototype.setSelected = function (isSelect) {
        this._selectBg.visible = isSelect;
    };
    EmoticonItem.prototype.dispose = function () {
        this._iconBg = null;
        this._iconLock = null;
        this._selectBg = null;
    };
    return EmoticonItem;
}(BaseDisplayObjectContainer));
__reflect(EmoticonItem.prototype, "EmoticonItem");
//# sourceMappingURL=EmoticonItem.js.map