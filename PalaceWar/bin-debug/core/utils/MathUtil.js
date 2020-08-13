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
        MathUtil.toFixed = function (number, n) {
            if (n > 20 || n < 0) {
                throw new RangeError('toFixed() digits argument must be between 0 and 20');
            }
            if (isNaN(number) || number >= Math.pow(10, 21)) {
                return number.toString();
            }
            if (typeof (n) == 'undefined' || n == 0) {
                return (Math.round(number)).toString();
            }
            var result = number.toString();
            var arr = result.split('.');
            // 整数的情况
            if (arr.length < 2) {
                result += '.';
                for (var i = 0; i < n; i += 1) {
                    result += '0';
                }
                return result;
            }
            var integer = arr[0];
            var decimal = arr[1];
            if (decimal.length == n) {
                return result;
            }
            if (decimal.length < n) {
                for (var i = 0; i < n - decimal.length; i += 1) {
                    result += '0';
                }
                return result;
            }
            result = integer + '.' + decimal.substr(0, n);
            var last = decimal.substr(n, 1);
            // 四舍五入，转换为整数再处理，避免浮点数精度的损失
            if (parseInt(last, 10) >= 5) {
                var x = Math.pow(10, n);
                var tmp = (Math.round((parseFloat(result) * x)) + 1) / x;
                result = tmp.toFixed(n);
            }
            return result;
        };
        ;
        //十六进颜色数字转rgba
        MathUtil.hexToRgb = function (hex) {
            // let _alpha = 1;
            // if(alpha){
            //     _alpha = alpha
            // }
            if (hex) {
                var num = hex;
                var red = (num >> 16) / 255;
                var green = ((num >> 8) & 255) / 255;
                var blue = (num & 255) / 255;
                return { x: red, y: green, z: blue }; //{red, green, blue, alpha};//, a:_alpha
            }
        };
        ;
        return MathUtil;
    }());
    App.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "App.MathUtil");
})(App || (App = {}));
//# sourceMappingURL=MathUtil.js.map