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
 * author ck
 * date 2017/8/9
 * @class BaseTextField
 */
var BaseTextField = (function (_super) {
    __extends(BaseTextField, _super);
    function BaseTextField() {
        var _this = _super.call(this) || this;
        _this.bindData = null;
        _this._touchTapHelper = null;
        return _this;
    }
    /**
     * 添加触摸回调
     */
    BaseTextField.prototype.addTouchTap = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (this._touchTapHelper == null) {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    /**
     * 移除触摸
     */
    BaseTextField.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    };
    BaseTextField.prototype.removeStageHandler = function (event) {
        this.dispose();
    };
    /**
     * 设置坐标
     */
    BaseTextField.prototype.setPosition = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    BaseTextField.prototype.setColor = function (color) {
        this.textColor = color;
    };
    BaseTextField.prototype.setVisible = function (v) {
        this.visible = v;
    };
    BaseTextField.prototype.setString = function (str) {
        this.text = str;
    };
    BaseTextField.prototype.stopAllActions = function () {
        egret.Tween.removeTweens(this);
    };
    BaseTextField.prototype.setScale = function (scale) {
        this.scaleX = this.scaleY = scale;
    };
    Object.defineProperty(BaseTextField.prototype, "text", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "text");
        },
        set: function (value) {
            value = String(value);
            var reg = new RegExp("\\s", "g");
            var tmpvalue = value.replace(reg, "");
            if (value && tmpvalue.indexOf("<") > -1 && tmpvalue.indexOf(">") > -1) {
                try {
                    this.textFlow = (new egret.HtmlTextParser).parser(value);
                }
                catch (e) {
                    this.textFlow = [];
                    egret.superSetter(BaseTextField, this, "text", value);
                }
            }
            else {
                this.textFlow = [];
                egret.superSetter(BaseTextField, this, "text", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseTextField.prototype.localToGlobal = function (localX, localY, resultPoint) {
        var point = _super.prototype.localToGlobal.call(this, localX, localY, resultPoint);
        if (this.type == egret.TextFieldType.INPUT && localX == 0 && localY == 0) { }
        else {
            if (this.parent && this.parent != GameConfig.stage) {
                point.y -= GameData.layerPosY;
            }
        }
        return point;
    };
    /**
     * 销毁对象
     */
    BaseTextField.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.stopAllActions();
        this.removeTouchTap();
        this.bindData = null;
        if (this.cacheAsBitmap) {
            this.cacheAsBitmap = false;
        }
    };
    return BaseTextField;
}(egret.TextField));
__reflect(BaseTextField.prototype, "BaseTextField", ["base.Iinteractive", "base.Ibase"]);
