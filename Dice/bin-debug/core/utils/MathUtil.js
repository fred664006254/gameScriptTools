/**
 * math常用方法工具类
 * author dmj
 * date 2017/9/5
 * @class MathUtil
 */
var App;
(function (App) {
    var MathUtil;
    (function (MathUtil) {
        /**
         * 对数值进行格式化，以“,”隔开
         * @param num 需要格式化的数值
         */
        function formatNumberByComma(num) {
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
        }
        MathUtil.formatNumberByComma = formatNumberByComma;
        /**
         * 格式化数字为K、M、G
         * @param num 被格式化的数字
         */
        function formatNumber(num) {
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
        }
        MathUtil.formatNumber = formatNumber;
        /**
         * 计算两点之间的直线距离
         * @param p1 点1
         * @param p2 点2
         */
        function getDistance(p1, p2) {
            return egret.Point.distance(p1, p2);
        }
        MathUtil.getDistance = getDistance;
        /**
         * 获取随机数，默认范围是（>=0 && <100）
         * @param min 最小范围（大于等于min）
         * @param max 最大范围(小于max)
         */
        function getRandom(min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 100; }
            return min + Math.floor(Math.random() * (max - min));
        }
        MathUtil.getRandom = getRandom;
        //js 精确乘法
        function accMul(arg1, arg2) {
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
        }
        MathUtil.accMul = accMul;
        /**
         * 弧度转换角度
         * @param radian 弧度
         */
        function getAngleByRadian(radian) {
            return radian * 180 / Math.PI;
        }
        MathUtil.getAngleByRadian = getAngleByRadian;
        /**
         * 角度转换弧度
         * @param angle 角度
         */
        function getRadianByAngle(angle) {
            return angle * Math.PI / 180;
        }
        MathUtil.getRadianByAngle = getRadianByAngle;
        /**
         * 检查两个值是否相等
         * @param value1
         * @param value2
         */
        function checkEqual(value1, value2) {
            if (isNaN(value1) == false && isNaN(value1) == false) {
                return value1 == value2;
            }
            return true;
        }
        MathUtil.checkEqual = checkEqual;
        /**
         * 浮点数精简
         * @param num
         * @param precision
         */
        function strip(num, precision) {
            if (precision === void 0) { precision = 12; }
            return +parseFloat(num.toPrecision(precision));
        }
        MathUtil.strip = strip;
        function toFixed(number, n) {
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
        }
        MathUtil.toFixed = toFixed;
        ;
        //十六进颜色数字转rgba
        function hexToRgb(hex) {
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
        }
        MathUtil.hexToRgb = hexToRgb;
        ;
        var seed = 6;
        /**
         * 返回min和max之前的随机值，取值范围 min<=value<max，不包含max值
         * @param min 最小值，默认0
         * @param max 最大值，默认1
         * @param tmpseed 随机种子
         */
        function seededRandom(min, max, tmpseed) {
            if (!isNaN(tmpseed)) {
                setSeed(tmpseed);
            }
            max = max || 1;
            min = min || 0; // 根据数值进行随机值计算    
            seed = (seed * 9301 + 49297) % 233280;
            var rnd = seed / 233280;
            return min + rnd * (max - min);
        }
        MathUtil.seededRandom = seededRandom;
        function setSeed(value) {
            seed = value;
        }
        MathUtil.setSeed = setSeed;
    })(MathUtil = App.MathUtil || (App.MathUtil = {}));
})(App || (App = {}));
//# sourceMappingURL=MathUtil.js.map