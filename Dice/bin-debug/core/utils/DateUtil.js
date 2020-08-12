/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */
var App;
(function (App) {
    var DateUtil;
    (function (DateUtil) {
        /**
         * 一小时的秒数
         */
        DateUtil.hourSeconds = 3600;
        DateUtil.dayHours = 24;
        var _year = "date_year";
        var _month = "date_month";
        var _day = "date_day";
        var _hour = "date_hour";
        var _minute = "date_minute";
        var _second = "date_second";
        /**
         * 根据秒数格式化字符串
         * @param second 秒数
         * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前,6:xx年x月x日,7:x月x日
         * 			20: year-month-day
         * @return
         *
         */
        function getFormatBySecond(second, type) {
            if (type === void 0) { type = 1; }
            var str = "";
            switch (type) {
                case 1:
                    str = getFormatBySecond1(second);
                    break;
                case 2:
                    str = getFormatBySecond2(second);
                    break;
                case 3:
                    str = getFormatBySecond3(second);
                    break;
                case 4:
                    str = getFormatBySecond4(second);
                    break;
                case 5:
                    str = getFormatBySecond5(second);
                    break;
                case 6:
                    str = getFormatBySecond6(second);
                    break;
                case 7:
                    str = getFormatBySecond7(second);
                    break;
                case 8:
                    str = getFormatBySecond8(second);
                    break;
                case 9:
                    str = getFormatBySecond9(second);
                    break;
                case 10:
                    str = getFormatBySecond10(second);
                    break;
                case 11:
                    str = getFormatBySecond11(second);
                    break;
                case 12:
                    str = getFormatBySecond12(second);
                    break;
                case 13:
                    str = getFormatBySecond13(second);
                    break;
                case 14:
                    str = getFormatBySecond14(second);
                    break;
                case 15:
                    str = getFormatBySecond15(second);
                    break;
                case 16:
                    str = getFormatBySecond16(second);
                    break;
                case 17:
                    str = getFormatBySecond17(second);
                    break;
                case 18:
                    str = getFormatBySecond18(second);
                    break;
                case 19:
                    str = getFormatBySecond19(second);
                    break;
                case 20:
                    str = getFormatBySecond20(second);
                    break;
                case 21:
                    str = getFormatBySecond21(second);
                    break;
            }
            return str;
        }
        DateUtil.getFormatBySecond = getFormatBySecond;
        //1: 00:00:00
        function getFormatBySecond1(t) {
            if (t === void 0) { t = 0; }
            var hourst = Math.floor(t / 3600);
            var hours;
            if (hourst == 0) {
                hours = "00";
            }
            else {
                if (hourst < 10)
                    hours = "0" + hourst;
                else
                    hours = "" + hourst;
            }
            var minst = Math.floor((t - hourst * 3600) / 60);
            var secondt = Math.floor((t - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return hours + ":" + mins + ":" + sens;
        }
        //3: 00:00
        function getFormatBySecond3(t) {
            if (t === void 0) { t = 0; }
            var hourst = Math.floor(t / 3600);
            var minst = Math.floor((t - hourst * 3600) / 60);
            var secondt = Math.floor((t - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return hourst + ":" + mins + ":" + sens;
        }
        //2:yyyy-mm-dd h:m:s
        function getFormatBySecond2(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return year + "-" + month + "-" + day + " " + hours + ":" + mins + ":" + sens;
            // return new Date(time * 1000).toLocaleString();
        }
        //4:xx天前，xx小时前，xx分钟前 刚刚
        function getFormatBySecond4(time) {
            var t = Math.floor(time / 3600);
            if (t > 0) {
                if (t > 24) {
                    return LangMger.getlocal("chat_time1", [String(Math.floor(t / 24))]);
                }
                else {
                    return LangMger.getlocal("chat_time2", [String(t)]);
                }
            }
            else {
                if (Math.floor(time / 60) > 0) {
                    return LangMger.getlocal("chat_time3", [String(Math.floor(time / 60))]);
                }
                else {
                    return LangMger.getlocal("chat_time4");
                }
            }
        }
        function getFormatBySecond5(time) {
            //每个时间单位所对应的秒数
            var oneDay = 3600 * 24;
            var oneHourst = 3600;
            var oneMinst = 60;
            var days = Math.floor(time / oneDay);
            var hourst = Math.floor(time % oneDay / oneHourst);
            var minst = Math.floor((time - hourst * oneHourst) / oneMinst); //Math.floor(time % oneDay % oneHourst / oneMinst);
            var secondt = Math.floor((time - hourst * oneHourst) % oneMinst); //time;
            var dayss = "";
            var hourss = "";
            var minss = "";
            var secss = "";
            if (time > 0) {
                //天
                if (days == 0) {
                    dayss = "";
                    //小时
                    if (hourst == 0) {
                        hourss = "";
                        //分
                        if (minst == 0) {
                            minss = "";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + LangMger.getlocal("date_second");
                            }
                            else {
                                secss = "" + secondt + LangMger.getlocal("date_second");
                            }
                            return secss;
                        }
                        else {
                            minss = "" + minst + LangMger.getlocal("date_minute");
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + LangMger.getlocal("date_second");
                            }
                            else {
                                secss = "" + secondt + LangMger.getlocal("date_second");
                            }
                        }
                        return minss + secss;
                    }
                    else {
                        hourss = hourst + LangMger.getlocal("date_hour2");
                        if (minst == 0) {
                            minss = "";
                            if (secondt == 0) {
                                secss = "";
                            }
                            else if (secondt < 10) {
                                secss = "0" + secondt + LangMger.getlocal("date_second");
                            }
                            else {
                                secss = "" + secondt + LangMger.getlocal("date_second");
                            }
                            return secss;
                        }
                        else if (minst < 10) {
                            minss = "0" + minst + LangMger.getlocal("date_minute");
                        }
                        else {
                            minss = "" + minst + LangMger.getlocal("date_minute");
                        }
                        return hourss + minss;
                    }
                }
                else {
                    dayss = days + LangMger.getlocal("date_day2");
                    if (hourst == 0) {
                        hourss = "";
                    }
                    else {
                        if (hourst < 10)
                            hourss = "0" + hourst + LangMger.getlocal("date_hour2");
                        else
                            hourss = "" + hourst + LangMger.getlocal("date_hour2");
                        ;
                    }
                    return dayss + hourss;
                }
            }
            return "";
        }
        //6:xx年x月x日
        function getFormatBySecond6(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            //泰国时间的特殊处理   xxxx.xx.xx
            if (PlatMgr.checkIsTextHorizontal()) {
                return year + "." + month + "." + day;
            }
            return year + LangMger.getlocal("date_year") + month + LangMger.getlocal("date_month") + day + LangMger.getlocal("date_day");
        }
        //7:x月x日
        function getFormatBySecond7(time) {
            var date = new Date(time * 1000);
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            //泰国时间的特殊处理   xxxx.xx.xx
            if (PlatMgr.checkIsTextHorizontal()) {
                return month + "." + day;
            }
            return month + LangMger.getlocal("monthTitle") + day + LangMger.getlocal("dayTitle");
        }
        //8:把时间转化为 xx小时x分x秒
        function getFormatBySecond8(secondNums) {
            var resStr = "";
            if (secondNums >= 60 * 60 * 24) {
                var dSce = 60 * 60 * 24;
                var t = Math.floor(secondNums / dSce);
                resStr = resStr + t + LangMger.getlocal("date_day");
                secondNums = secondNums % dSce;
            }
            if (secondNums >= 60 * 60) {
                var hSce = 60 * 60;
                var h = Math.floor(secondNums / hSce);
                resStr = resStr + h + LangMger.getlocal("date_hour2");
                secondNums = secondNums % hSce;
            }
            if (secondNums >= 60) {
                var min = Math.floor(secondNums / 60);
                resStr = resStr + min + LangMger.getlocal("date_minute");
                secondNums = secondNums % 60;
            }
            // if (secondNums >= 0)
            // {
            if (secondNums < 10) {
                resStr = resStr + "0" + secondNums + LangMger.getlocal("date_second");
            }
            else {
                resStr = resStr + secondNums + LangMger.getlocal("date_second");
            }
            // }
            return resStr;
        }
        //9:mm-dd h:m
        function getFormatBySecond9(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return month + "." + day + " " + hours + ":" + mins;
            // return new Date(time * 1000).toLocaleString();
        }
        //10:xx年x月x日
        function getFormatBySecond10(time) {
            var date = new Date(time * 1000);
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            if (PlatMgr.checkIsTextHorizontal()) {
                return month + "." + day + " " + hours + ":00";
            }
            return month + LangMger.getlocal("monthTitle") + day + LangMger.getlocal("dayTitle") + hours + LangMger.getlocal("date_hour");
        }
        //11 xx年xx月xx日 0:00:00
        function getFormatBySecond11(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return year + LangMger.getlocal("yearTitle") + month + LangMger.getlocal("monthTitle") + day + LangMger.getlocal("dayTitle") + hours + ":" + mins;
        }
        //12 h : m
        function getFormatBySecond12(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);;
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            return hours + ":" + mins;
        }
        //13 xx月xx日 0:00:00
        function getFormatBySecond13(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return month + LangMger.getlocal("monthTitle") + day + LangMger.getlocal("dayTitle") + hours + ":" + mins + ":" + sens;
        }
        //15 xx月xx日 0:00
        function getFormatBySecond15(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return month + LangMger.getlocal("monthTitle") + day + LangMger.getlocal("dayTitle") + hours + ":" + mins;
        }
        //:把时间转化为 xx小时x分x秒
        function getFormatBySecond14(secondNums) {
            var resStr = "";
            if (secondNums >= 60 * 60 * 24) {
                var dSce = 60 * 60 * 24;
                var t = Math.floor(secondNums / dSce);
                resStr = resStr + t + LangMger.getlocal("date_day");
                secondNums = secondNums % dSce;
            }
            if (secondNums >= 60 * 60) {
                var hSce = 60 * 60;
                var h = Math.floor(secondNums / hSce);
                resStr = resStr + h + LangMger.getlocal("date_hour2");
                secondNums = secondNums % hSce;
            }
            if (secondNums >= 60) {
                var min = Math.floor(secondNums / 60);
                resStr = resStr + min + LangMger.getlocal("date_minute");
                secondNums = secondNums % 60;
            }
            // if (secondNums >= 0)
            // {
            if (secondNums < 10) {
                resStr = resStr + secondNums + LangMger.getlocal("date_second");
            }
            else {
                resStr = resStr + secondNums + LangMger.getlocal("date_second");
            }
            // }
            return resStr;
        }
        //:把时间转化为 xx小时x分x秒不含0
        function getFormatBySecond16(secondNums) {
            var resStr = "";
            if (secondNums >= 60 * 60 * 24) {
                var dSce = 60 * 60 * 24;
                var t = Math.floor(secondNums / dSce);
                resStr = resStr + t + LangMger.getlocal("date_day");
                secondNums = secondNums % dSce;
            }
            if (secondNums >= 60 * 60) {
                var hSce = 60 * 60;
                var h = Math.floor(secondNums / hSce);
                if (h > 0) {
                    resStr = resStr + h + LangMger.getlocal("date_hour2");
                }
                secondNums = secondNums % hSce;
            }
            if (secondNums >= 60) {
                var min = Math.floor(secondNums / 60);
                if (min > 0) {
                    resStr = resStr + min + LangMger.getlocal("date_minute");
                }
                secondNums = secondNums % 60;
            }
            // if (secondNums >= 0)
            // {
            if (secondNums > 0) {
                resStr = resStr + secondNums + LangMger.getlocal("date_second");
            }
            // }
            return resStr;
        }
        //8:把时间转化为 x天 00:00:00
        function getFormatBySecond17(secondNums) {
            var resStr = "";
            if (secondNums >= 60 * 60 * 24) {
                var dSce = 60 * 60 * 24;
                var t = Math.floor(secondNums / dSce);
                resStr = resStr + t + LangMger.getlocal("date_day");
                secondNums = secondNums % dSce;
            }
            var hourst = Math.floor(secondNums / 3600);
            var hours;
            if (hourst == 0) {
                hours = "00";
            }
            else {
                if (hourst < 10)
                    hours = "0" + hourst;
                else
                    hours = "" + hourst;
            }
            var minst = Math.floor((secondNums - hourst * 3600) / 60);
            var secondt = Math.floor((secondNums - hourst * 3600) % 60);
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return resStr + hours + ":" + mins + ":" + sens;
        }
        //18:把时间转化为 xx天xx小时x分x秒
        function getFormatBySecond18(secondNums) {
            var resStr = "";
            if (secondNums >= 60 * 60 * 24) {
                var dSce = 60 * 60 * 24;
                var t = Math.floor(secondNums / dSce);
                resStr = resStr + t + LangMger.getlocal("date_day2");
                secondNums = secondNums % dSce;
            }
            if (secondNums >= 60 * 60) {
                var hSce = 60 * 60;
                var h = Math.floor(secondNums / hSce);
                resStr = resStr + h + LangMger.getlocal("date_hour2");
                secondNums = secondNums % hSce;
            }
            else {
                resStr = resStr + "0" + LangMger.getlocal("date_hour2");
            }
            if (secondNums >= 60) {
                var min = Math.floor(secondNums / 60);
                resStr = resStr + min + LangMger.getlocal("date_minute");
                secondNums = secondNums % 60;
            }
            else {
                resStr = resStr + "0" + LangMger.getlocal("date_minute");
            }
            // if (secondNums >= 0)
            // {
            if (secondNums < 10) {
                resStr = resStr + "0" + secondNums + LangMger.getlocal("date_second");
            }
            else {
                resStr = resStr + secondNums + LangMger.getlocal("date_second");
            }
            // }
            return resStr;
        }
        //11 xx-xx-xx \n 0:00:00
        function getFormatBySecond19(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear() % 100;
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return year + "-" + month + "-" + day + "\n" + hours + ":" + mins + ":" + sens;
        }
        //20 xxxx-xx-xx 
        function getFormatBySecond20(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            return year + "-" + month + "-" + day;
        }
        //21 xx月xx日 00:00
        function getFormatBySecond21(time) {
            var date = new Date(time * 1000);
            // date.setDate(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minst = date.getMinutes();
            var secondt = date.getSeconds();
            var mins;
            var sens;
            var hour;
            if (hours == 0) {
                hour = "00";
            }
            else if (hours < 10) {
                hour = "0" + hours;
            }
            else {
                hour = "" + hours;
            }
            if (minst == 0) {
                mins = "00";
            }
            else if (minst < 10) {
                mins = "0" + minst;
            }
            else {
                mins = "" + minst;
            }
            if (secondt == 0) {
                sens = "00";
            }
            else if (secondt < 10) {
                sens = "0" + secondt;
            }
            else {
                sens = "" + secondt;
            }
            return month + LangMger.getlocal("monthTitle") + day + LangMger.getlocal("dayTitle") + hour + ":" + mins + ":" + sens;
        }
        function isSameDay(t1, t2) {
            var d1 = new Date(t1 * 1000);
            var d2 = new Date(t2 * 1000);
            if (d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()) {
                return true;
            }
            return false;
        }
        DateUtil.isSameDay = isSameDay;
        /**
         * 计算剩余的时间，天数 和小时，当大于一天的时候显示天数，小于一天的时候显示时间
         */
        function getFormatBySecondIntoTime(time) {
            var dayValue = 0;
            var hourValue = 0;
            var timeStr = null;
            if ((time / 86400) > 1) {
                if (time % 86400 == 0) {
                    dayValue = time / 86400;
                }
                else {
                    dayValue = Math.floor(time / 86400) + 1;
                }
                timeStr = LangMger.getlocal("dateDayTitle", [String(dayValue)]);
            }
            else {
                if (time % 3600 == 0) {
                    hourValue = time / 3600;
                }
                else {
                    hourValue = Math.floor(time / 3600) + 1;
                }
                timeStr = LangMger.getlocal("dateHourTitle", [String(hourValue)]);
            }
            return timeStr;
        }
        DateUtil.getFormatBySecondIntoTime = getFormatBySecondIntoTime;
        /**
         * 当天零点的时间戳
         * @param ts 时间戳
         */
        function getWeeTs(ts) {
            return ts - ((ts + GameData.timeZone * 3600) % 86400);
        }
        DateUtil.getWeeTs = getWeeTs;
        /**
         * 判断时间戳是否是跟服务器时间为同一天，true：是
         * @param ts 时间戳
         */
        function checkIsToday(ts) {
            return (GameData.getServerTime() - (getWeeTs(ts) + 24 * 60 * 60)) < 0;
        }
        DateUtil.checkIsToday = checkIsToday;
        function getLeftDaySecondByTime(time) {
            var daySecond = DateUtil.hourSeconds * DateUtil.dayHours;
            var zoneSecond = GameData.timeZone * DateUtil.hourSeconds;
            var leftSecond = (time + zoneSecond) % daySecond;
            return leftSecond;
        }
        DateUtil.getLeftDaySecondByTime = getLeftDaySecondByTime;
        /**
         * 获取功能开始结束时间
         * @param st
         * @param et
         * @param showHour 是否精确到小时
         */
        function getOpenLocalTime(st, et, showHour) {
            var type = showHour ? 10 : 7;
            return App.DateUtil.getFormatBySecond(st, type) + "-" + App.DateUtil.getFormatBySecond(et, type);
        }
        DateUtil.getOpenLocalTime = getOpenLocalTime;
        var localTimeZone = 0;
        /**
         * 获取本地时区和服务器时区差值，正数标识本地时区比服务器时区较早
         */
        function getDiffLocalAndSvrTimeZone() {
            if (localTimeZone == 0) {
                var date = new Date();
                localTimeZone = (date.getTimezoneOffset() / 60) * -1;
            }
            return localTimeZone - GameData.timeZone;
        }
        DateUtil.getDiffLocalAndSvrTimeZone = getDiffLocalAndSvrTimeZone;
        /**
         * 把服务器小时转换成本地小时显示
         */
        function formatSvrHourByLocalTimeZone(hour) {
            var day = 0;
            var diff = getDiffLocalAndSvrTimeZone();
            hour = hour + diff;
            if (hour < 0) {
                day = -1;
                hour = 24 + hour;
            }
            else if (hour >= 24) {
                day = 1;
                hour = hour - 24;
            }
            return { hour: Number(hour), day: Number(day) };
        }
        DateUtil.formatSvrHourByLocalTimeZone = formatSvrHourByLocalTimeZone;
        /**
         * 拿配置时间 单位是小时换算成设备时区小时
         */
        function getLocalTimeZoneTime(st, et) {
            var result = [];
            var stData = formatSvrHourByLocalTimeZone(st);
            var etData = formatSvrHourByLocalTimeZone(et);
            if (stData.day == etData.day) {
                result = [String(stData.hour), String(etData.hour)];
            }
            else {
                result = [String(stData.hour), String(etData.hour)];
            }
            return result;
        }
        DateUtil.getLocalTimeZoneTime = getLocalTimeZoneTime;
        /**
         * 慎用，只有在根据服务器时间戳转换跨天/跨月等需求时候使用
         * 获取转换过的服务器Date数据，不能用时区，只能使用年，月，日，时，分，秒这几个属性
         */
        function getServerDate(time) {
            if (time === void 0) { time = GameData.getServerTime(); }
            var diffH = GameData.timeZone + (new Date()).getTimezoneOffset() / 60;
            var date = new Date(time * 1000 + diffH * 3600 * 1000);
            return date;
        }
        DateUtil.getServerDate = getServerDate;
        /**
         *获取活动开了几天
         * @param et st
         */
        function getActivityDay(et, st) {
            var dt = Math.ceil(((App.DateUtil.getWeeTs(et) - App.DateUtil.getWeeTs(st)) / 86400)) + 1;
            return dt;
        }
        DateUtil.getActivityDay = getActivityDay;
    })(DateUtil = App.DateUtil || (App.DateUtil = {}));
})(App || (App = {}));
//# sourceMappingURL=DateUtil.js.map