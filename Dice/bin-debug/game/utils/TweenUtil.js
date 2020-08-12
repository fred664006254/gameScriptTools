var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App;
(function (App) {
    var TweenUtil = (function () {
        function TweenUtil() {
        }
        /**
         * 数字变化缓动动画
         * @param textFiled 文本
         * @param startNum 起始数字
         * @param endNum 终点数字
         * @param time 时间
         */
        TweenUtil.numTween = function (textFiled, startNum, endNum, time) {
            var obj = { num: startNum };
            if (!time) {
                time = 500;
            }
            egret.Tween.get(obj, { onChange: function () {
                    if (textFiled && obj && obj.num) {
                        if (textFiled instanceof BaseTextField) {
                            textFiled.text = "+" + obj.num.toFixed(0);
                        }
                        else if (textFiled instanceof TextureText) {
                            textFiled.setString(obj.num.toFixed(0));
                            textFiled.anchorOffsetX = textFiled.width * 0.5 + 0.5;
                        }
                    }
                    if (obj.num == endNum) {
                        egret.Tween.removeTweens(obj);
                        obj = null;
                    }
                }, onChangeObj: this }).to({ num: endNum }, 500);
        };
        return TweenUtil;
    }());
    App.TweenUtil = TweenUtil;
    __reflect(TweenUtil.prototype, "App.TweenUtil");
})(App || (App = {}));
//# sourceMappingURL=TweenUtil.js.map