var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * math常用方法工具类
 * author dmj
 * date 2017/9/5
 * @class MathUtil
 */
var App;
(function (App) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
         * 对数值进行格式化，以“,”隔开
         * @param num 需要格式化的数值
         */
        MathUtil.formatNumberByComma = function (num) {
            var numStr = "";
            num = Math.floor(num);
            var numLength = num.toString().length;
            var originalNumStr = num.toString();
            var commaNum = Math.ceil(numLength / 3) - 1;
            App.LogUtil.log("commaNum = " + commaNum);
            if (commaNum < 0) {
                commaNum = 0;
            }
            if (commaNum > 0) {
                var str = "";
                for (var i = 1; i <= commaNum + 1; i++) {
                    var startIndex = numLength - i * 3;
                    var endIndex = numLength - (i - 1) * 3;
                    if (i == (commaNum + 1)) {
                        startIndex = 0;
                        str = originalNumStr.substring(startIndex, endIndex);
                    }
                    else {
                        str = "," + originalNumStr.substring(startIndex, endIndex);
                    }
                    numStr = str + numStr;
                }
            }
            else {
                numStr = originalNumStr;
            }
            return numStr;
        };
        //js 精确乘法
        MathUtil.accMul = function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) { }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        };
        /**
         * 格式化数字为K、M、G
         * @param num 被格式化的数字
         */
        MathUtil.formatNumber = function (num) {
            var numStr = "";
            num = Math.floor(num);
            var numLength = num.toString().length;
            var originalNumStr = num.toString();
            var temNum = 0;
            if (numLength > 3 && numLength <= 6) {
                temNum = num / 1000;
                numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "K";
            }
            else if (numLength > 6 && numLength <= 9) {
                temNum = num / 1000000;
                numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "M";
            }
            else if (numLength > 9 && numLength <= 12) {
                temNum = num / 1000000000;
                numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "G";
            }
            else if (numLength > 12) {
                temNum = num / 1000000000;
                numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "G";
            }
            else {
                numStr = originalNumStr;
            }
            return numStr;
        };
        /**
         * 计算两点之间的直线距离
         * @param p1 点1
         * @param p2 点2
         */
        MathUtil.getDistance = function (p1, p2) {
            return egret.Point.distance(p1, p2);
        };
        MathUtil.distance = function (ox, oy, nx, ny) {
            var p1 = egret.Point.create(ox, oy);
            var p2 = egret.Point.create(nx, ny);
            return MathUtil.getDistance(p1, p2);
        };
        /**
         * 获取随机数，默认范围是（>=0 && <100）
         * @param min 最小范围（大于等于min）
         * @param max 最大范围(小于max)
         */
        MathUtil.getRandom = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 100; }
            return min + Math.floor(Math.random() * (max - min));
        };
        /**
         * 弧度转换角度
         * @param radian 弧度
         */
        MathUtil.getAngleByRadian = function (radian) {
            return radian * 180 / Math.PI;
        };
        /**
         * 角度转换弧度
         * @param angle 角度
         */
        MathUtil.getRadianByAngle = function (angle) {
            return angle * Math.PI / 180;
        };
        /**
         * 检查两个值是否相等
         * @param value1
         * @param value2
         */
        MathUtil.checkEqual = function (value1, value2) {
            if (isNaN(value1) == false && isNaN(value1) == false) {
                return value1 == value2;
            }
            return true;
        };
        /**
         * 浮点数精简
         * @param num
         * @param precision
         */
        MathUtil.strip = function (num, precision) {
            if (precision === void 0) { precision = 12; }
            return +parseFloat(num.toPrecision(precision));
        };
        return MathUtil;
    }());
    App.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "App.MathUtil");
})(App || (App = {}));
