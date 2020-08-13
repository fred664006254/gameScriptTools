/**
 * 收缩mainUI活动图标
 * author shaoliang
 * date 2018/10/27
 * @class ExtendIcon
 */
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
var ExtendIcon = (function (_super) {
    __extends(ExtendIcon, _super);
    function ExtendIcon() {
        var _this = _super.call(this) || this;
        _this._status = 0; // 0 合起  1 展开
        _this._arrow = null;
        _this._textIcon = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._isInCDTime = false;
        return _this;
    }
    ExtendIcon.prototype.init = function (f, o) {
        var _this = this;
        this.width = 80;
        this.height = 80;
        this._obj = o;
        this._callbackF = f;
        var iconBg = BaseBitmap.create("public_alphabg");
        iconBg.width = 80;
        iconBg.height = 80;
        this.addChild(iconBg);
        this._arrow = BaseBitmap.create("mainui_packup_arrow");
        this._arrow.rotation = -180;
        this._arrow.x = this._arrow.width;
        this._arrow.y = this._arrow.height - 7;
        this.addChild(this._arrow);
        this._textIcon = BaseBitmap.create("mainui_packup_text1");
        this._textIcon.setPosition(iconBg.width / 2 - this._textIcon.width / 2, iconBg.height - this._textIcon.height / 2 - 20);
        this.addChild(this._textIcon);
        this.anchorOffsetX = this._arrow.width / 2;
        this.anchorOffsetY = this._arrow.height / 2;
        this.addTouch(function (event, iconContainer) {
            if (_this._isInCDTime) {
                return;
            }
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    iconContainer.setScale(0.95);
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                    iconContainer.setScale(1);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    iconContainer.setScale(1);
                    break;
            }
        }, this, [this]);
        this.addTouchTap(this.pickup, this);
    };
    ExtendIcon.prototype.pickup = function () {
        if (this._isInCDTime) {
            return;
        }
        this._status = this._status ? 0 : 1;
        this._textIcon.texture = ResourceManager.getRes("mainui_packup_text" + String(this._status + 1));
        if (this._status) {
            this._arrow.rotation = 0;
            this._arrow.x = 0;
            this._arrow.y = -7;
        }
        else {
            this._arrow.rotation = -180;
            this._arrow.x = this._arrow.width;
            this._arrow.y = this._arrow.height - 7;
        }
        this._callbackF.apply(this._obj);
    };
    ExtendIcon.prototype.packUp = function () {
        this._status = 0;
        this._textIcon.texture = ResourceManager.getRes("mainui_packup_text" + String(this._status + 1));
        this._arrow.rotation = -180;
        this._arrow.x = this._arrow.width;
        this._arrow.y = this._arrow.height - 7;
    };
    ExtendIcon.prototype.dispose = function () {
        this._isInCDTime = false;
        this._status = 0;
        this._arrow = null;
        this._textIcon = null;
        this._obj = null;
        this._callbackF = null;
        _super.prototype.dispose.call(this);
    };
    return ExtendIcon;
}(BaseDisplayObjectContainer));
__reflect(ExtendIcon.prototype, "ExtendIcon");
