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
        * type ,0 默认原来的 1，向下去整 ，2 向上取整 3四舍五入 4返回两位
        *
        */
        StringUtil.changeIntToText = function (value, type) {
            if (value === void 0) { value = 0; }
            if (type === void 0) { type = 0; }
            //如果是英文 则转化为 million billion trillion等
            if (PlatformManager.checkIsTextHorizontal()) {
                var enStr = "";
                if (value >= 1000000000000) {
                    enStr += (App.MathUtil.toFixed(value / 1000000000000, 3).slice(0, -1) + LanguageManager.getlocal("coinformat_4"));
                    var arr = enStr.split(".");
                    var newstr = "";
                    var newarr = [];
                    var indexNum = 0;
                    if (arr[0].length >= 4) {
                        for (var i = arr[0].length - 1; i >= 0; i--) {
                            newarr.unshift(arr[0][i]);
                            indexNum += 1;
                            if (indexNum >= 3 && i > 0) {
                                newarr.unshift(',');
                                indexNum = 0;
                            }
                        }
                        for (var j = 0; j < newarr.length; j++) {
                            newstr += newarr[j];
                        }
                        enStr = (newstr + LanguageManager.getlocal("coinformat_4"));
                    }
                }
                else if (value >= 1000000000) {
                    enStr += (App.MathUtil.toFixed(value / 1000000000, 3).slice(0, -1) + LanguageManager.getlocal("coinformat_2"));
                }
                else if (value >= 1000000) {
                    enStr += (App.MathUtil.toFixed(value / 1000000, 3).slice(0, -1) + LanguageManager.getlocal("coinformat_1"));
                }
                else if (value >= 1000) {
                    enStr += App.MathUtil.toFixed(value / 1000, 3);
                    var arr = enStr.split(".");
                    enStr = arr[0] + "," + arr[1];
                }
                else if (value < 0) {
                    enStr += "0";
                }
                else {
                    enStr += value.toFixed(0);
                }
                return enStr;
            }
            var str = "";
            var baseNum = 100000000;
            if (value >= 100000 * baseNum) {
                if (type == 0 || type == 4) {
                    str += (value / 10000 / baseNum).toFixed(3) + LanguageManager.getlocal("coinformat_4");
                }
                else if (type == 1) {
                    var v = Math.floor(value / baseNum * 1000) / 1000;
                    str += v.toFixed(3) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 2) {
                    var v = Math.ceil(value / baseNum * 1000) / 1000;
                    str += v.toFixed(3) + LanguageManager.getlocal("coinformat_1");
                }
            }
            else if (value >= 1000 * baseNum) {
                if (type == 0 || type == 4) {
                    str += (value / baseNum).toFixed(0) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 1) {
                    var v = Math.floor(value / baseNum * 1) / 1;
                    str += v.toFixed(0) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 2) {
                    var v = Math.ceil(value / baseNum * 1) / 1;
                    str += v.toFixed(0) + LanguageManager.getlocal("coinformat_1");
                }
            }
            else if (value >= 100 * baseNum) {
                if (type == 0 || type == 4) {
                    str += (value / baseNum).toFixed(1) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 1) {
                    var v = Math.floor(value / baseNum * 10) / 10;
                    str += v.toFixed(1) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 2) {
                    var v = Math.ceil(value / baseNum * 10) / 10;
                    str += v.toFixed(1) + LanguageManager.getlocal("coinformat_1");
                }
            }
            else if (value >= 10 * baseNum) {
                if (type == 0 || type == 4) {
                    str += (value / baseNum).toFixed(2) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 1) {
                    var v = Math.floor(value / baseNum * 100) / 100;
                    str += v.toFixed(2) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 2) {
                    var v = Math.ceil(value / baseNum * 100) / 100;
                    str += v.toFixed(2) + LanguageManager.getlocal("coinformat_1");
                }
            }
            else if (value >= baseNum) {
                if (type == 0 || type == 4) {
                    str += (value / baseNum).toFixed(3) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 1) {
                    var v = Math.floor(value / baseNum * 1000) / 1000;
                    str += v.toFixed(3) + LanguageManager.getlocal("coinformat_1");
                }
                else if (type == 2) {
                    var v = Math.ceil(value / baseNum * 1000) / 1000;
                    str += v.toFixed(3) + LanguageManager.getlocal("coinformat_1");
                }
            }
            else if (value < 0) {
                str += "0";
            }
            else {
                if (type == 4) {
                    str += (value.toFixed(0));
                }
                else {
                    str += value.toFixed(0);
                }
            }
            return str;
        };
        /**
         * 数字转中文字符串 支持 1～9999
         */
        StringUtil.changeIntToCharText = function (value) {
            if (value === void 0) { value = 1; }
            // return String(value);
            if (GameData.languageUsing == "cn" || GameData.languageUsing == "tw") {
                var str = "";
                if (value >= 1000) {
                    str += LanguageManager.getlocal("baseNum" + Math.floor(value / 1000)) + LanguageManager.getlocal("baseNum1000");
                    value = value % 1000;
                }
                if (value >= 100) {
                    str += LanguageManager.getlocal("baseNum" + Math.floor(value / 100)) + LanguageManager.getlocal("baseNum100");
                    value = value % 100;
                }
                if (value >= 10) {
                    if (value < 20) {
                        str += LanguageManager.getlocal("baseNum10");
                    }
                    else {
                        str += LanguageManager.getlocal("baseNum" + Math.floor(value / 10)) + LanguageManager.getlocal("baseNum10");
                    }
                    value = value % 10;
                }
                if (value > 0) {
                    str += LanguageManager.getlocal("baseNum" + value);
                }
                return str;
            }
            else {
                return String(value);
            }
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
        StringUtil.changeIntToText3 = function (value) {
            if (value === void 0) { value = 0; }
            var str = "";
            var baseNum = 100000000;
            if (value >= 100000 * baseNum) {
                str += parseFloat((value / 10000 / baseNum).toFixed(3)) + LanguageManager.getlocal("coinformat_4");
            }
            else if (value >= 1000 * baseNum) {
                str += parseFloat((value / baseNum).toFixed(0)) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 100 * baseNum) {
                str += parseFloat((value / baseNum).toFixed(1)) + LanguageManager.getlocal("coinformat_1");
            }
            else if (value >= 10 * baseNum) {
                str += parseFloat((value / baseNum).toFixed(2)) + LanguageManager.getlocal("coinformat_1");
            }
            else {
                str += parseFloat(Math.max(0.01, (value / baseNum)).toFixed(3)) + LanguageManager.getlocal("coinformat_1");
            }
            // else{
            // 	str+=(value/baseNum).toFixed(3)+LanguageManager.getlocal("coinformat_1");
            // }
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
            var reCat = new RegExp("/[|%|'|%|.|,|:|;|*|?|~|`|!|@|#|$|%%|%|^|&|+|=|)|(|<|{|}| |%|]|%|[|/|\"|]/");
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
         * @param value
         */
        StringUtil.userNameCheck = function (value) {
            var reg;
            if (PlatformManager.checkIsThSp()) {
                //泰语支持泰中英数
                reg = new RegExp("^[A-Za-z0-9\u0e00-\u0e7f\u4e00-\u9fa5\uF900-\uFA2D\uAC00-\uD7A3]+$");
            }
            else if (PlatformManager.checkIsRuSp()) {
                //俄语支持 中英数 俄罗斯语 白俄罗斯语
                reg = new RegExp("^[A-Za-z0-9\u0400-\u052f\u2DE0—\u2DFF\uA640—\uA69F\u4e00-\u9fa5\uF900-\uFA2D\uAC00-\uD7A3]+$");
            }
            else {
                reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5\uF900-\uFA2D\uAC00-\uD7A3]+$");
            }
            if (!reg.test(value)) {
                return false;
            }
            return true;
        };
        /**
         * 处理字符串到指定长度，超出的部分截断，返回结果
         * @param str 原始字符串
         * @param l 指定长度
         */
        StringUtil.formatStrToLength = function (str, l) {
            var resultStr = str;
            if (PlatformManager.checkIsEnLang()) {
                if (StringUtil.getEnLength(str) > l) {
                    var tmpStr = str.substr(0, l);
                    while (StringUtil.getEnLength(tmpStr) > l) {
                        tmpStr = str.substr(0, tmpStr.length - 1);
                    }
                    resultStr = tmpStr;
                }
            }
            else if (PlatformManager.checkIsThSp()) {
                var tmpStr = str;
                if (StringUtil.getStrLength(tmpStr) > l) {
                    //泰文鞋子编码范围
                    var thai1RegExp = new RegExp("[\u0E38-\u0E39]");
                    while (StringUtil.getStrLength(tmpStr) > l) {
                        var diffValue = StringUtil.getStrLength(tmpStr) - l;
                        tmpStr = tmpStr.substr(0, tmpStr.length - diffValue);
                    }
                    if (thai1RegExp.test(tmpStr[tmpStr.length - 1])) {
                        tmpStr = tmpStr.substr(0, tmpStr.length - 1);
                    }
                    resultStr = tmpStr;
                }
            }
            else if (StringUtil.getEnLength(str) > l) {
                resultStr = str.substr(0, l);
            }
            return resultStr;
        };
        /**
         * 检测字符串的方法
         * 遇到泰文字符时,先匹配泰文全集,然后匹配泰文主体字符,长度++
         * 其他字符直接++
         */
        StringUtil.getStrLength = function (value) {
            var length = 0;
            var thaiAllRegExp = new RegExp("[\u0e00-\u0e7f]");
            var thaiMainRegExp = new RegExp("[\u0E01-\u0E10\u0E11-\u0E1F\u0E20-\u0E2E\u0E32\u0E2F\u0E30\u0E3A\u0E40-\u0E46\u0E5A-\u0E5B\u0E00\u0E3F\u0E4F-\u0E59]");
            for (var i = 0; i < value.length; i++) {
                if (thaiAllRegExp.test(value[i])) {
                    if (thaiMainRegExp.test(value[i])) {
                        length++;
                    }
                }
                else {
                    length++;
                }
            }
            return length;
        };
        /**
         * 检测英文字符串的方法--中文占两个
         */
        StringUtil.getEnLength = function (value) {
            return this.getEnStrlength(value);
        };
        /**
         * 对泰文的字符串的长度的处理
         */
        // private static getThStrlength(value:string):number
        // {
        // 	let length:number = 0;
        // 	let reg =new RegExp("^[A-Za-z0-9\u0E01-\u0E10\u0E11-\u0E1F\u0E20-\u0E2E\u0E32\u0E2F\u0E30\u0E3A\u0E40-\u0E46\u0E5A-\u0E5B\u0E00\u0E3F\u0E4F-\u0E59]+$")
        // 	for(var i:number = 0;i < value.length;i++)
        // 	{
        // 		if(reg.test(value[i]))
        // 		{
        // 			length ++;
        // 		}
        // 	}
        // 	return length ;
        // }
        /**
         * 对英文的字符串的长度的处理
         */
        StringUtil.getEnStrlength = function (value) {
            var length = 0;
            var reg = new RegExp("^[\u4e00-\u9fa5]+$");
            for (var i = 0; i < value.length; i++) {
                if (reg.test(value[i])) {
                    length = length + 2;
                }
                else {
                    length++;
                }
            }
            return length;
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
        /**
         * 数字/符号检测
         * @param value
         */
        StringUtil.numberOrSymbolCheck = function (value) {
            var reg = new RegExp("^[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？0-9]+$");
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
                    else if (array[0] == "time2") {
                        parms.push(App.DateUtil.getFormatBySecond(Number(array[1]), 6));
                    }
                    else if (array[0] == "spid") {
                        parms.push(LanguageManager.getlocal("decreePolicy_Name" + array[1]));
                    }
                    else if (array[0] == "spdetail") {
                        var policyCfg = Config.PolicyCfg.getPolicyById(array[1]);
                        var addaddExtent = String(policyCfg.addExtent * 100);
                        var addaddExtent2 = policyCfg.emAddExtent * 100;
                        if (policyCfg.id == "2") {
                            parms.push(LanguageManager.getlocal("decreePolicy_Desc" + array[1], ["" + policyCfg.addTimes, "" + policyCfg.emAddTimes]));
                        }
                        else {
                            parms.push(LanguageManager.getlocal("decreePolicy_Desc" + array[1], ["" + policyCfg.addTimes, addaddExtent, "" + addaddExtent2]));
                        }
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
                    else if (array[0] == "aname") {
                        var aidAndCode = array[1];
                        if (aidAndCode) {
                            var aid = aidAndCode.split("-")[0];
                            var code = aidAndCode.split("-")[1];
                            if (aid) {
                                parms.push(Api.acVoApi.getAcLocalName(aid, code));
                            }
                        }
                    }
                    else if (array[0] == "win") {
                        if (Number(array[1]) > 0) {
                            parms.push(LanguageManager.getlocal("allianceWarHistoryWin"));
                        }
                        else {
                            parms.push(LanguageManager.getlocal("allianceWarHistoryFail"));
                        }
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
        /**
         * 传入仅有数字的区、服数组 最后整合输出
         * 如 传入 区 [1,3,4,5,7] 传入服[1，5，4，9，7，6，3]
         * 最后输出为 1区、3-5区、7区、1服、3-7服、9服
        */
        StringUtil.formatMultiServerServerAndZid = function (qu, zid) {
            var str = "";
            str = "" + App.StringUtil.formatMultiServerString(qu, "serverListServer3") + (zid.length ? (qu.length ? "、" : "") : "") + App.StringUtil.formatMultiServerString(zid);
            return str;
        };
        /**
         * 传入仅有数字的数组 number[]（需自己整理好传入，无序有序都可以 函数中处理最后都是有序输出）
         * 多区服字符串处理 连一起的省略 如 1，5，4，9，7，6，3 最后输出为 1服、3-7服、9服
         * langkey 默认是服 可以是其他字符，比如区
        */
        StringUtil.formatMultiServerString = function (tmp, langkey) {
            if (langkey === void 0) { langkey = "serverListServer"; }
            var str = "";
            var len = tmp.length;
            if (len) {
                tmp.sort(function (a, b) {
                    return a - b;
                });
                var start = 0;
                while (start < len) {
                    var end = App.StringUtil.findEnd(start, tmp);
                    if (start == end) {
                        str += "" + tmp[start] + LanguageManager.getlocal(langkey) + "\u3001";
                    }
                    else {
                        str += tmp[start] + "-" + tmp[end] + LanguageManager.getlocal(langkey) + "\u3001";
                    }
                    start = end + 1;
                }
            }
            return str.substring(0, str.length - 1);
        };
        StringUtil.findEnd = function (index, tmp) {
            var start = index;
            var next = start + 1;
            var end = start;
            while (tmp[next] && (tmp[start] + (next - start)) == tmp[next]) {
                end = next;
                ++next;
            }
            return end;
        };
        return StringUtil;
    }());
    App.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "App.StringUtil");
})(App || (App = {}));
//# sourceMappingURL=StringUtil.js.map