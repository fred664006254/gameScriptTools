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
 * date 2017/9/11
 * @class BaseBitmap
 */
var BaseBitmap = (function (_super) {
    __extends(BaseBitmap, _super);
    function BaseBitmap(value) {
        var _this = _super.call(this, value) || this;
        _this.bindData = null;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        if (!BaseBitmap.isCanNew && _this.getClassName() == "BaseBitmap") {
            var errorStr = "请使用BaseBitmap.create创建";
            App.LogUtil.error(errorStr);
            throw new Error(errorStr);
        }
        return _this;
    }
    /**
     * 添加触摸回调
     */
    BaseBitmap.prototype.addTouchTap = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (this._touchTapHelper == null) {
            this.touchEnabled = true;
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    BaseBitmap.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    };
    Object.defineProperty(BaseBitmap.prototype, "width", {
        get: function () {
            return egret.superGetter(BaseBitmap, this, "width");
        },
        set: function (value) {
            if (this.texture) {
                if (this.texture["scale9Grid"]) {
                    if (value < this.texture.textureWidth) {
                        var tv = value;
                        value = this.texture.textureWidth;
                        // if(DEBUG)
                        // {
                        // 	App.LogUtil.error("九宫格设置宽度 "+tv+" 不能小于原始图片宽度 "+value+" ，已重置为原始宽度，请修改");
                        // }
                    }
                }
            }
            egret.superSetter(BaseBitmap, this, "width", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseBitmap.prototype, "height", {
        get: function () {
            return egret.superGetter(BaseBitmap, this, "height");
        },
        set: function (value) {
            if (this.texture) {
                if (this.texture["scale9Grid"]) {
                    if (value < this.texture.textureHeight) {
                        var tv = value;
                        value = this.texture.textureHeight;
                        // if(DEBUG)
                        // {
                        // 	App.LogUtil.error("九宫格设置的高度 "+tv+" 不能小于原始图片高度 "+value+" ，已重置为原始高度，请修改");
                        // }
                    }
                }
            }
            egret.superSetter(BaseBitmap, this, "height", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseBitmap.prototype, "scale9Grid", {
        get: function () {
            return egret.superGetter(BaseBitmap, this, "scale9Grid");
        },
        set: function (value) {
            egret.superSetter(BaseBitmap, this, "scale9Grid", value);
            if (true) {
                throw new Error("请通过default.res.json来设置九宫格，不允许在游戏内使用九宫格");
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseBitmap.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel);
        }
    };
    BaseBitmap.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    /**
     * 设置坐标
     */
    BaseBitmap.prototype.setPosition = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    BaseBitmap.prototype.stopAllActions = function () {
        egret.Tween.removeTweens(this);
    };
    BaseBitmap.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    BaseBitmap.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    BaseBitmap.prototype.getClassName = function () {
        return egret.getQualifiedClassName(this);
    };
    BaseBitmap.prototype.localToGlobal = function (localX, localY, resultPoint) {
        var point = _super.prototype.localToGlobal.call(this, localX, localY, resultPoint);
        if (this.parent && this.parent != GameConfig.stage) {
            point.y -= GameData.layerPosY;
            point.x -= GameData.layerPosX;
        }
        return point;
    };
    /**
     * 换图
     */
    BaseBitmap.prototype.setRes = function (resKey) {
        this.texture = ResMgr.getRes(App.ResourceUtil.getReskey(resKey));
    };
    Object.defineProperty(BaseBitmap.prototype, "cacheAsBitmap", {
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
    BaseBitmap.prototype.dispose = function () {
        if (this.cacheAsBitmap) {
            this.cacheAsBitmap = false;
        }
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        this.bindData = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 对象池取
     * @param value 支持传输BitmapData，Texture或者资源名
     */
    BaseBitmap.create = function (value) {
        var baseBitmap = App.DisplayUtil.useObjectPool ? BaseBitmap.baseBitmapPool.pop() : null;
        var showValue = undefined;
        if (typeof (value) == "string") {
            showValue = ResMgr.getRes(App.ResourceUtil.getReskey(value));
        }
        else {
            showValue = value;
        }
        if (!baseBitmap) {
            BaseBitmap.isCanNew = true;
            baseBitmap = new BaseBitmap(showValue);
            BaseBitmap.isCanNew = false;
        }
        else {
            if (egret.is(showValue, "egret.Texture")) {
                baseBitmap.texture = showValue;
            }
        }
        return baseBitmap;
    };
    /**
     * 对象池存
     * @param value
     */
    BaseBitmap.release = function (baseBitmap) {
        if (!baseBitmap) {
            return;
        }
        if (baseBitmap instanceof BaseLoadBitmap) {
            BaseLoadBitmap.release(baseBitmap);
            return;
        }
        baseBitmap.dispose();
        if (baseBitmap.texture) {
            baseBitmap.texture = null;
        }
        egret.Tween.removeTweens(baseBitmap);
        baseBitmap.setPosition(0, 0);
        baseBitmap.setScale(1);
        baseBitmap.rotation = 0;
        baseBitmap.alpha = 1;
        baseBitmap.width = NaN;
        baseBitmap.height = NaN;
        baseBitmap.mask = null;
        baseBitmap.scrollRect = null;
        baseBitmap.filters = null;
        baseBitmap.anchorOffsetX = 0;
        baseBitmap.anchorOffsetY = 0;
        baseBitmap.visible = true;
        baseBitmap.name = null;
        baseBitmap.touchEnabled = false;
        baseBitmap.skewX = baseBitmap.skewY = 0;
        baseBitmap.blendMode = egret.BlendMode.NORMAL;
        baseBitmap.fillMode = egret.BitmapFillMode.SCALE;
        // baseBitmap.scale9Grid=null;
        if (App.DisplayUtil.useObjectPool) {
            if (BaseBitmap.baseBitmapPool.indexOf(baseBitmap) < 0) {
                BaseBitmap.baseBitmapPool.push(baseBitmap);
            }
        }
    };
    BaseBitmap.baseBitmapPool = [];
    BaseBitmap.isCanNew = false;
    return BaseBitmap;
}(egret.Bitmap));
__reflect(BaseBitmap.prototype, "BaseBitmap", ["base.Iinteractive", "base.Ibase"]);
//# sourceMappingURL=BaseBitmap.js.map