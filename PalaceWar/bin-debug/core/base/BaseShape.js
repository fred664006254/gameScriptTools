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
 * author 陈可
 * date 2017/12/17
 * @class BaseShape
 */
var BaseShape = (function (_super) {
    __extends(BaseShape, _super);
    function BaseShape() {
        var _this = _super.call(this) || this;
        _this.bindData = null;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        return _this;
    }
    /**
     * 添加触摸回调
     */
    BaseShape.prototype.addTouchTap = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (this._touchTapHelper == null) {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    BaseShape.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    };
    BaseShape.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel);
        }
    };
    BaseShape.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    /**
     * 设置坐标
     */
    BaseShape.prototype.setPosition = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    BaseShape.prototype.stopAllActions = function () {
        egret.Tween.removeTweens(this);
    };
    BaseShape.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    BaseShape.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    BaseShape.prototype.localToGlobal = function (localX, localY, resultPoint) {
        var point = _super.prototype.localToGlobal.call(this, localX, localY, resultPoint);
        if (this.parent && this.parent != GameConfig.stage) {
            point.y -= GameData.layerPosY;
        }
        return point;
    };
    Object.defineProperty(BaseShape.prototype, "cacheAsBitmap", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "cacheAsBitmap");
        },
        set: function (value) {
            if (App.DeviceUtil.isRuntime2()) {
                return;
            }
            egret.superSetter(BaseTextField, this, "cacheAsBitmap", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 销毁对象
     */
    BaseShape.prototype.dispose = function () {
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        this.bindData = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BaseShape;
}(egret.Shape));
__reflect(BaseShape.prototype, "BaseShape");
//# sourceMappingURL=BaseShape.js.map