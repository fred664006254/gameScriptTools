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
 * date 2017/9/4
 * @class BaseDisplayObject
 */
var BaseDisplayObject = (function (_super) {
    __extends(BaseDisplayObject, _super);
    function BaseDisplayObject() {
        var _this = _super.call(this) || this;
        _this.bindData = null;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        return _this;
    }
    /**
     * 添加触摸回调
     */
    BaseDisplayObject.prototype.addTouchTap = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (this._touchTapHelper == null) {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    BaseDisplayObject.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    };
    BaseDisplayObject.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel);
        }
    };
    BaseDisplayObject.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    /**
     * 设置坐标
     */
    BaseDisplayObject.prototype.setPosition = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    BaseDisplayObject.prototype.stopAllActions = function () {
        egret.Tween.removeTweens(this);
    };
    BaseDisplayObject.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    BaseDisplayObject.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    BaseDisplayObject.prototype.localToGlobal = function (localX, localY, resultPoint) {
        var point = _super.prototype.localToGlobal.call(this, localX, localY, resultPoint);
        if (this.parent && this.parent != GameConfig.stage) {
            point.y -= GameData.layerPosY;
        }
        return point;
    };
    Object.defineProperty(BaseDisplayObject.prototype, "cacheAsBitmap", {
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
    BaseDisplayObject.prototype.dispose = function () {
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        this.bindData = null;
    };
    return BaseDisplayObject;
}(egret.DisplayObject));
__reflect(BaseDisplayObject.prototype, "BaseDisplayObject", ["base.Iinteractive", "base.Ibase"]);
//# sourceMappingURL=BaseDisplayObject.js.map