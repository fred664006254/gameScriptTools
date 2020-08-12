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
var CommonExtend = (function (_super) {
    __extends(CommonExtend, _super);
    function CommonExtend() {
        var _this = _super.call(this) || this;
        _this._status = 0; // 0 合起  1 展开
        _this._arrow = null;
        _this._textIcon = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._isInCDTime = false;
        return _this;
    }
    CommonExtend.prototype.init = function (f, o, isExtend) {
        var _this = this;
        if (isExtend === void 0) { isExtend = false; }
        this._obj = o;
        this._callbackF = f;
        this._arrow = BaseLoadBitmap.create("common_extend1");
        this.addChild(this._arrow);
        this._textIcon = BaseLoadBitmap.create("common_extend_text1");
        this._textIcon.setPosition(-9, 58);
        this.addChild(this._textIcon);
        if (isExtend) {
            this._arrow.setload("common_extend2");
            this._textIcon.setload("common_extend_text2");
            this._status = 1;
        }
        this.anchorOffsetX = 35;
        this.anchorOffsetY = 35;
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
    CommonExtend.prototype.pickup = function () {
        if (this._isInCDTime) {
            return;
        }
        this._status = this._status ? 0 : 1;
        this._textIcon.setload("common_extend_text" + String(this._status + 1));
        this._arrow.setload("common_extend" + String(this._status + 1));
        this._callbackF.apply(this._obj);
    };
    CommonExtend.prototype.packUp = function () {
        this._status = 0;
        this._textIcon.setload("common_extend_text" + String(this._status + 1));
        this._arrow.setload("common_extend" + String(this._status + 1));
    };
    CommonExtend.prototype.dispose = function () {
        this._isInCDTime = false;
        this._status = 0;
        this._arrow = null;
        this._textIcon = null;
        this._obj = null;
        this._callbackF = null;
        _super.prototype.dispose.call(this);
    };
    return CommonExtend;
}(BaseDisplayObjectContainer));
__reflect(CommonExtend.prototype, "CommonExtend");
//# sourceMappingURL=CommonExtend.js.map