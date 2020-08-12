var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Shader常用方法工具类
 * author hyd
 * date 2019/8/9
 * @class ShaderUtil
 */
var App;
(function (App) {
    var ShaderUtil = (function () {
        function ShaderUtil() {
        }
        /**
         * @static
         * @param {egret.DisplayObject} 设置渐变的DisplayObject
         * @param {number} beginColor 顶端颜色
         * @param {number} endColor 底端颜色
         * @param {number} [angle] 角度值 0 ~ 360
         * @param {number} [offset] 偏移值 -1 ~ 1
         * @param {number} [uvRatio] UV比例，默认为0。如果是textfield则会自动设置为1，如果是bitmap则自动设置为10。如果非0则使用该值
         * @memberof ShaderUtil
         */
        ShaderUtil.setGradientColor = function (displayObject, beginColor, endColor, angle, offset, uvRatio) {
            if (App.DeviceUtil.CheckWebglRenderMode()) {
                var beginColorRgb = App.MathUtil.hexToRgb(beginColor);
                var endColorRgb = App.MathUtil.hexToRgb(endColor);
                var lineCount = void 0;
                var lineSpaceRate = void 0;
                var topRate = void 0;
                var bottomRate = void 0;
                var _offset = 0;
                if (offset != 0)
                    _offset = offset;
                var _angle = 0;
                if (angle != 0)
                    _angle = angle;
                var _uvRatio = 0;
                if (uvRatio != 0)
                    _uvRatio = uvRatio;
                var uniform = {};
                if (displayObject instanceof BaseTextField) {
                    if (!_uvRatio)
                        _uvRatio = 1;
                    var text = displayObject;
                    var realTextHeight = text.textHeight - 6;
                    lineCount = text.numLines;
                    lineSpaceRate = (text.lineSpacing) / text.height;
                    //text.lineSpacing>2 ? (text.lineSpacing+2)/text.height :2;
                    if (text.verticalAlign === egret.VerticalAlign.MIDDLE) {
                        topRate = (text.height - realTextHeight) / 2 / text.height;
                        bottomRate = topRate;
                    }
                    else if (text.verticalAlign === egret.VerticalAlign.BOTTOM) {
                        topRate = (text.height - realTextHeight + 2) / text.height;
                        bottomRate = 4 / text.height;
                    }
                    else {
                        topRate = 4 / text.height;
                        bottomRate = (text.height - text.textHeight + 2) / text.height;
                    }
                    console.log(topRate, bottomRate, text.textHeight / text.height, lineSpaceRate * (lineCount - 1));
                    uniform = {
                        beginColor: beginColorRgb,
                        endColor: endColorRgb,
                        uvRatio: _uvRatio,
                        angle: _angle,
                        offset: _offset,
                        lineCount: lineCount,
                        lineSpaceRate: lineSpaceRate,
                        topRate: topRate,
                        bottomRate: bottomRate
                    };
                }
                else if (displayObject instanceof BaseBitmap || displayObject instanceof BaseLoadBitmap) {
                    if (!_uvRatio)
                        _uvRatio = 10;
                    uniform = {
                        beginColor: beginColorRgb,
                        endColor: endColorRgb,
                        uvRatio: _uvRatio,
                        angle: _angle,
                        offset: _offset,
                        lineCount: 0,
                        lineSpaceRate: 0,
                        topRate: 0,
                        bottomRate: 0
                    };
                }
                var customFilter = new egret.CustomFilter(ShaderConst.TEXT_GRADIENT_VERT, ShaderConst.TEXT_GRADIENT_FRAG, uniform);
                displayObject.filters = [customFilter];
            }
        };
        ShaderUtil.removeGradientColor = function (displayObject) {
            if (App.DeviceUtil.CheckWebglRenderMode()) {
                displayObject.filters = null;
            }
        };
        return ShaderUtil;
    }());
    App.ShaderUtil = ShaderUtil;
    __reflect(ShaderUtil.prototype, "App.ShaderUtil");
})(App || (App = {}));
//# sourceMappingURL=ShaderUtil.js.map