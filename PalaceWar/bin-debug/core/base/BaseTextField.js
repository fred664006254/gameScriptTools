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
        _this._beginColor = 0x000000;
        _this._endColor = 0x000000;
        _this._isUseGradient = false;
        _this._maxChars = 0;
        _this._originalTxt = '';
        /** 正在format 俄语换行 */
        _this._inFormatWordWarp = false;
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
            this.textFlow = [];
            if (value && tmpvalue.indexOf("<") > -1 && tmpvalue.indexOf(">") > -1) {
                try {
                    this.textFlow = (new egret.HtmlTextParser).parser(value);
                }
                catch (e) {
                    egret.superSetter(BaseTextField, this, "text", value);
                }
            }
            else {
                egret.superSetter(BaseTextField, this, "text", value);
            }
            this._originalTxt = value;
            this.formatWordWrap();
            this._refreshGradient();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTextField.prototype, "lineSpacing", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "lineSpacing");
        },
        set: function (value) {
            if (value === this.lineSpacing)
                return;
            egret.superSetter(BaseTextField, this, "lineSpacing", value);
            this._refreshGradient();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTextField.prototype, "verticalAlign", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "verticalAlign");
        },
        set: function (value) {
            if (value === this.verticalAlign)
                return;
            egret.superSetter(BaseTextField, this, "verticalAlign", value);
            this._refreshGradient();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTextField.prototype, "maxChars", {
        /**
         * 文本字段中最多可包含的字符数（即用户输入的字符数）。
         * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
         * @default 0
         * @language zh_CN
         */
        get: function () {
            var chars = egret.superGetter(BaseTextField, this, "maxChars");
            if (App.DeviceUtil.isRuntime2()) {
                chars = this._maxChars;
            }
            return chars;
        },
        set: function (value) {
            egret.superSetter(BaseTextField, this, "maxChars", value);
            if (App.DeviceUtil.isRuntime2()) {
                this._maxChars = value;
                // this.addEventListener(egret.Event.CHANGE,this._textChangeHandler,this);
                this.addEventListener(egret.Event.FOCUS_OUT, this._textChangeHandler, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTextField.prototype, "cacheAsBitmap", {
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
    Object.defineProperty(BaseTextField.prototype, "wordWrap", {
        /**
         * 一个布尔值，表示文本字段是否按单词换行。如果值为 true，则该文本字段按单词换行；俄语为单词加中划线换行
         * 如果值为 false，则该文本字段按字符换行。
         * @default false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        get: function () {
            return egret.superGetter(BaseTextField, this, "wordWrap");
        },
        set: function (value) {
            egret.superSetter(BaseTextField, this, "wordWrap", value);
            if (value) {
                this.formatWordWrap();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTextField.prototype, "size", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "size");
        },
        set: function (value) {
            egret.superSetter(BaseTextField, this, "size", value);
            this.formatWordWrap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTextField.prototype, "width", {
        get: function () {
            return egret.superGetter(BaseTextField, this, "width");
        },
        set: function (value) {
            egret.superSetter(BaseTextField, this, "width", value);
            this.formatWordWrap();
        },
        enumerable: true,
        configurable: true
    });
    BaseTextField.prototype._textChangeHandler = function (e) {
        this.text = App.StringUtil.formatStrToLength(this.text, this._maxChars);
    };
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
     *
     * 设置文字渐变,shader实现,文字本来的颜色会被置为白色
     * @param {number} beginColor 渐变初始颜色 16进制颜色值
     * @param {number} endColor 渐变结束颜色 16进制颜色值
     * @memberof BaseTextField
     */
    BaseTextField.prototype.setGradient = function (beginColor, endColor) {
        this.textColor = TextFieldConst.COLOR_WHITE;
        this._beginColor = beginColor;
        this._endColor = endColor;
        this._isUseGradient = true;
        this._refreshGradient();
    };
    //移除文字渐变
    BaseTextField.prototype.removeGradient = function () {
        if (this._isUseGradient) {
            this._removeGradient();
        }
    };
    BaseTextField.prototype._refreshGradient = function () {
        if (!this._isUseGradient)
            return;
        App.ShaderUtil.setGradientColor(this, this._beginColor, this._endColor);
    };
    BaseTextField.prototype._removeGradient = function () {
        this._beginColor = 0x000000;
        this._endColor = 0x000000;
        this._isUseGradient = false;
        App.ShaderUtil.removeGradientColor(this);
    };
    /**
     * 文字换行处理，俄语添加-
     * @param textStr 赋值的字符
     */
    BaseTextField.prototype.formatWordWrap = function (textStr) {
        if (this._inFormatWordWarp) {
            return;
        }
        if (PlatformManager.checkIsRuLang()) {
            if (textStr == null) {
                textStr = this._originalTxt;
            }
            if (this.wordWrap) {
                this._inFormatWordWarp = true;
                App.DisplayUtil.formatWordWrap(this, textStr);
                this._inFormatWordWarp = false;
            }
        }
    };
    /**
     * 销毁对象
     */
    BaseTextField.prototype.dispose = function () {
        // this.removeEventListener(egret.Event.CHANGE,this._textChangeHandler,this);
        this.removeEventListener(egret.Event.FOCUS_OUT, this._textChangeHandler, this);
        this._maxChars = 0;
        this.stopAllActions();
        this.removeTouchTap();
        this.bindData = null;
        this._originalTxt = '';
        if (this.cacheAsBitmap) {
            this.cacheAsBitmap = false;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BaseTextField;
}(egret.TextField));
__reflect(BaseTextField.prototype, "BaseTextField", ["base.Iinteractive", "base.Ibase"]);
//# sourceMappingURL=BaseTextField.js.map