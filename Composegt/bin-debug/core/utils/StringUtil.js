/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App;
(function (App) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
        * 二进制解析为字符串
        * @param array
        */
        StringUtil.dump = function (array) {
            var s = "";
            var a = "";
            for (var i = 0; i < array.length; i++) {
                if (i % 16 == 0) {
                    s += ("0000" + i.toString(16)).substring(-4, 4) + " ";
                }
                if (i % 8 == 0) {
                    s += " ";
                }
                var v = array[i];
                s += ("0" + v.toString(16)).substring(-2, 2) + " ";
                if (((i + 1) % 16) == 0 || i == (array.length - 1)) {
                    s += " |" + a + "|\n";
                    a = "";
                }
            }
            return s;
        };
        /**
         * 强制转化为字符串
         * @param data 需要转换的数据，例如json，数字等
         */
        StringUtil.toString = function (data) {
            var dataStr = undefined;
            if (typeof (data) == "object") {
                try {
                    dataStr = JSON.stringify(data);
                }
                catch (e) {
                    if (true) {
                        dataStr = "StringUtil.toString():Error=" + String(data);
                    }
                }
            }
            else {
                dataStr = String(data);
            }
            return dataStr;
        };
        /**
        * 当数字超过100000000时，转化为“亿”的描述
        * @param value 数据
        * @return 目标字符串
        *
        */
        StringUtil.changeIntToText = function (value, fixed) {
            if (value === void 0) { value = 0; }
            var str = "";
            if (value >= 1000000000000) {
                str += (value / 1000000000000).toFixed(fixed == null ? 3 : fixed) + LanguageManager.getlocal("coinformat_4");
            }
            else if (value >= 100000000000) {
                str += (value / 100000000).toFixed(fixed == null ? 2 : fixed) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 10000000000) {
                str += (value / 100000000).toFixed(fixed == null ? 2 : fixed) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 100000000) {
                str += (value / 100000000).toFixed(fixed == null ? 3 : fixed) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 100000 && !PlatformManager.checkIsViSp()) {
                //越南不要万
                var num = (parseInt(value / 10000 * 100 + "") / 100).toFixed(fixed == null ? 3 : fixed);
                num = parseFloat(num) + "";
                str += num + LanguageManager.getlocal("num_10K");
            }
            else if (value < 0) {
                str += "0";
            }
            else {
                str += value.toFixed(0);
            }
            return str;
        };
        StringUtil.changeIntToText2 = function (value) {
            if (value === void 0) { value = 0; }
            var str = "";
            if (value >= 10000000) {
                str += (value / 10000).toFixed(0) + LanguageManager.getlocal("num_10K");
            }
            else if (value >= 1000000) {
                str += (value / 10000).toFixed(1) + LanguageManager.getlocal("num_10K");
            }
            else if (value >= 100000) {
                str += (value / 10000).toFixed(2) + LanguageManager.getlocal("num_10K");
            }
            else {
                str += value.toFixed(0);
            }
            return str;
        };
        //格式化数字 小数点后一位
        StringUtil.changeIntToText3 = function (value) {
            if (value === void 0) { value = 0; }
            var str = "";
            if (Math.abs(value) >= 1000000000000) {
                str += (value / 1000000000000).toFixed(1) + LanguageManager.getlocal("coinformat_4");
            }
            else if (Math.abs(value) >= 100000000) {
                str += (value / 100000000).toFixed(1) + LanguageManager.getlocal("coinformat_1");
            }
            else if (Math.abs(value) >= 100000 && !PlatformManager.checkIsViSp()) {
                str += (value / 10000).toFixed(1) + LanguageManager.getlocal("num_10K");
            }
            else {
                str += value.toFixed(0);
            }
            return str;
        };
        //格式化数字 小数点后一位直接截取
        StringUtil.changeIntToText4 = function (value) {
            if (value === void 0) { value = 0; }
            var str = "";
            if (Math.abs(value) >= 1000000000000) {
                var vv = value / 1000000000000;
                str += Math.floor(vv * 10) / 10 + LanguageManager.getlocal("coinformat_4");
            }
            else if (Math.abs(value) >= 100000000) {
                var vv = value / 100000000;
                str += Math.floor(vv * 10) / 10 + LanguageManager.getlocal("coinformat_1");
            }
            else if (Math.abs(value) >= 100000 && !PlatformManager.checkIsViSp()) {
                var vv = value / 10000;
                str += Math.floor(vv * 10) / 10 + LanguageManager.getlocal("num_10K");
            }
            else {
                str += value.toFixed(0);
            }
            return str;
        };
        /**
         * 把字符串分割成数组
         * @param fullString 原始字符串
         * @param separator 分割符号
         * @return 分割后的字符串数组
         *
         */
        StringUtil.splitString = function (fullString, separator) {
            var valueTb = null;
            if (fullString != null && separator != null) {
                valueTb = fullString.split(separator);
            }
            return valueTb;
        };
        /**
         * 把数字转带单位的字符串 (K:1000,M:1000000,G:1000000000)
         * @param value 数据
         * @return 目标字符串
         *
         */
        StringUtil.formatIntToString = function (num) {
            if (num === void 0) { num = 0; }
            var numLength = num.toString().length;
            var strNum = num.toString();
            if (numLength > 3 && numLength <= 6) {
                num = parseFloat((num / 1000).toFixed(3 - numLength % 3));
                if (numLength == 6) {
                    strNum = num.toString().substring(0, 3);
                }
                else {
                    strNum = num.toString().substring(0, 4);
                }
                strNum = strNum + "K";
            }
            else if (numLength > 6 && numLength <= 9) {
                num = parseFloat((num / 1000000).toFixed(3 - numLength % 3));
                if (numLength == 9) {
                    strNum = num.toString().substring(0, 3);
                }
                else {
                    strNum = num.toString().substring(0, 4);
                }
                strNum = strNum + "M";
            }
            else if (numLength > 9) {
                num = parseFloat((num / 1000000000).toFixed(3 - numLength % 3));
                strNum = num.toString().substring(0, 4);
                strNum = strNum + "G";
            }
            return strNum;
        };
        /**
         * 检查字符串是否含有非法字符符号
         * @param value 字符串
         * @return 是否含有 bool值
         *
         */
        StringUtil.checkCharacter = function (value) {
            var reCat = new RegExp(/[|%|'|%|.|,|:|;|_|*|?|~|`|!|@|#|$|%%|%|^|&|+|=|)|(|<|{|}| |%|]|%|[|/|\"|]/);
            // var reCat:RegExp = new RegExp(/_/);
            return reCat.test(value);
        };
        StringUtil.checkChar = function (value) {
            if (value.trim() == "") {
                return true;
            }
            if (value.indexOf("     ") != -1) {
                return true;
            }
            var reCat = new RegExp("/\s+/g|<", "g");
            return reCat.test(value);
        };
        /**
         * 字符串替换方法
         * @param value 原始字符串
         * @param targgetV 需要替换的内容
         * @param replaceV 替换成为的内容
         * @return 替换后的字符串
         *
         */
        StringUtil.replaceString = function (value, targgetV, replaceV) {
            var reg = new RegExp(targgetV, "g");
            var str = value.replace(reg, replaceV);
            return str;
        };
        /**
         * 字符串删除第一个字符
         * @param value 原始字符串
         * @return 删除第一个字符后的字符串
         *
         */
        StringUtil.removeFirstChar = function (value) {
            if (typeof value != "string") {
                value = value.toString();
            }
            return value.substring(1);
        };
        StringUtil.formatLocalLanuageValue = function (localValue, params) {
            if (params) {
                for (var i = 0; i < params.length; i++) {
                    var paramStr = params[i];
                    var needReplaceStr = "{" + (i + 1) + "}";
                    while (localValue.indexOf(needReplaceStr) > -1) {
                        localValue = localValue.replace(needReplaceStr, paramStr);
                    }
                }
            }
            return localValue;
        };
        /**
         * 将首字母转换为小写
         * @param value
         */
        StringUtil.firstCharToLower = function (value) {
            var firstChar = value.substr(0, 1);
            var otherChar = value.substr(1, value.length - 1);
            return firstChar.toLowerCase() + otherChar;
        };
        /**
         * 将首字母转换为大写
         * @param value
         */
        StringUtil.firstCharToUper = function (value) {
            var firstChar = value.substr(0, 1);
            var otherChar = value.substr(1, value.length - 1);
            return firstChar.toUpperCase() + otherChar;
        };
        /**
         * 名字检测(只能输入中文、数字和英文)
         * 越南文名字()
         * @param value
         */
        StringUtil.userNameCheck = function (value) {
            var reg = null;
            reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5\uF900-\uFA2D\uAC00-\uD7A3\u3040-\u309F\u30A0-\u30FF\u0000-\u024F]+$");
            if (PlatformManager.checkIsViSp()) {
                // reg = new RegExp("^[A-Za-z0-9\uaa80-\uaadf]+$");
                reg = new RegExp("^[A-Za-z0-9\u0000-\u007f\u0080-\u00ff\u0100-\u017f\u0180-\u024f\u1e00-\u1eff]+$");
                // reg = new RegExp("^[A-Za-z0-9\u0000-\u007f\u0080-\u00ff\u0100-\u017f\u0180-\u024f\u1e00-\u1eff]+$");
            }
            if (!reg.test(value)) {
                return false;
            }
            return true;
        };
        /**
         * 数字检测(只能输入中文、数字和英文)
         * @param value
         */
        StringUtil.numberCheck = function (value) {
            var reg = new RegExp("^[0-9]+$");
            if (!reg.test(value)) {
                return false;
            }
            return true;
        };
        StringUtil.formatStringColor = function (str, color) {
            return "<font color=" + String(color) + ">" + str + "</font>";
        };
        StringUtil.formatStringParms = function (stringTab) {
            var parms = [];
            if (stringTab) {
                for (var i = 0; i < stringTab.length; i++) {
                    var array = String(stringTab[i]).split("_");
                    if (array[0] == "wifeid") {
                        parms.push(LanguageManager.getlocal("wifeName_" + array[1]));
                    }
                    else if (array[0] == "servantid") {
                        parms.push(LanguageManager.getlocal("servant_name" + array[1]));
                    }
                    else if (array[0] == "playerlv") {
                        parms.push(LanguageManager.getlocal("officialTitle" + array[1]));
                    }
                    else if (array[0] == "time") {
                        parms.push(App.DateUtil.getFormatBySecond(Number(array[1]), 2));
                    }
                    else if (array[0] == "spid") {
                        parms.push(LanguageManager.getlocal("decreePolicy_Name" + array[1]));
                    }
                    else if (array[0] == "spdetail") {
                        // let policyCfg = Config.PolicyCfg.getPolicyById(array[1]);
                        // let addaddExtent = (policyCfg.addExtent*100).toFixed(0);
                        // parms.push(LanguageManager.getlocal("decreePolicy_Desc"+array[1],[""+policyCfg.addTimes,addaddExtent]));
                    }
                    else if (array[0] == "gdid") {
                        parms.push(LanguageManager.getlocal("decreePaper_Name" + array[1]));
                    }
                    else if (array[0] == "gddetail") {
                        parms.push(LanguageManager.getlocal("decreePaper_Desc" + array[1]));
                    }
                    else if (array[0] == "position") {
                        parms.push(LanguageManager.getlocal("promoteType" + array[1]));
                    }
                    else if (array[0] == "at") {
                        parms.push(LanguageManager.getlocal("allianceTaskName" + array[1]));
                    }
                    else if (array[0] == "countrywar") {
                        parms.push(App.DateUtil.getFormatBySecond(Number(stringTab[1]), 7));
                        parms.push(stringTab[2]);
                        if (typeof stringTab[3] !== "undefined") {
                            parms.push(stringTab[3]);
                        }
                        break;
                    }
                    else {
                        if (array[1] != null) {
                            parms.push(array[1]);
                        }
                        else {
                            parms.push(array[0]);
                        }
                    }
                }
            }
            return parms;
        };
        return StringUtil;
    }());
    App.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "App.StringUtil");
})(App || (App = {}));
