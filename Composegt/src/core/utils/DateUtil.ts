/**
 * author shaoliang
 * date 2017/9/5
 * @class DateUtil
 */

namespace App 
{
	export namespace DateUtil 
	{
		/**
		 * 一小时的秒数
		 */
		export let hourSeconds:number=3600;
		export let dayHours:number=24;
		let _year:string = "date_year";
		let _month:string = "date_month";
		let _day:string = "date_day";
		let _hour:string = "date_hour";
		let _minute:string = "date_minute";
		let _second:string = "date_second";
		/**
		 * 根据秒数格式化字符串
		 * @param second 秒数
		 * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前,6:xx年x月x日,7:x月x日
		 * @return
		 *
		 */
		export function getFormatBySecond(second:number, type:number = 1):string {
			var str:string = "";
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
			}
			return str;
		}

		//1: 00:00:00
		function getFormatBySecond1(t:number = 0):string {
			var hourst:number = Math.floor(t / 3600);
			var hours:string;
			if (hourst == 0) {
				hours = "00";
			} else {
				if (hourst < 10)
					hours = "0" + hourst;
				else
					hours = "" + hourst;
			}
			var minst:number = Math.floor((t - hourst * 3600) / 60);
			var secondt:number = Math.floor((t - hourst * 3600) % 60);
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return hours + ":" + mins + ":" + sens;
		}

		//3: 00:00
		function getFormatBySecond3(t:number = 0):string {
			var hourst:number = Math.floor(t / 3600);
			var minst:number = Math.floor((t - hourst * 3600) / 60);
			var secondt:number = Math.floor((t - hourst * 3600) % 60);
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return hourst  + ":" +  mins + ":" + sens;
		}

		//2:yyyy-mm-dd h:m:s
		function getFormatBySecond2(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return year + "-" + month +  "-" + day +" " + hours + ":" + mins +  ":" + sens;
			// return new Date(time * 1000).toLocaleString();
		}

		//4:xx天前，xx小时前，xx分钟前 刚刚
		function getFormatBySecond4(time:number):string {
			var t = Math.floor(time / 3600);
			if (t > 0) {
				if (t > 24) {
					return LanguageManager.getlocal("chat_time1",[String(Math.floor(t / 24))]);
				}
				else {
					return  LanguageManager.getlocal("chat_time2",[String(t)]);
				}
			}
			else {
				if(Math.floor(time / 60) >0)
				{
					return LanguageManager.getlocal("chat_time3",[String(Math.floor(time / 60))]);
				}else{
					return  LanguageManager.getlocal("chat_time4");
				}
				
			}
		}

		function getFormatBySecond5(time:number):string {
			//每个时间单位所对应的秒数
			var oneDay:number = 3600 * 24;
			var oneHourst:number = 3600;
			var oneMinst:number = 60;

			var days = Math.floor(time / oneDay);
			var hourst:number = Math.floor(time % oneDay / oneHourst)
			var minst:number = Math.floor((time - hourst * oneHourst) / oneMinst)  //Math.floor(time % oneDay % oneHourst / oneMinst);
			var secondt:number = Math.floor((time - hourst * oneHourst) % oneMinst) //time;

			var dayss:string = "";
			var hourss:string = ""
			var minss:string = "";
			var secss:string = ""
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
							} else if (secondt < 10) {
								secss = "0" + secondt + LanguageManager.getlocal("date_second");
							} else {
								secss = "" + secondt + LanguageManager.getlocal("date_second");
							}

							return secss;
						}
						else {
							minss = "" + minst + LanguageManager.getlocal("date_minute");
							if (secondt == 0) {
								secss = "";
							} else if (secondt < 10) {
								secss = "0" + secondt + LanguageManager.getlocal("date_second");
							} else {
								secss = "" + secondt + LanguageManager.getlocal("date_second");
							}

						}

						return minss + secss;
					}
					else {
						hourss = hourst + LanguageManager.getlocal("date_hour2");
						if (minst == 0) {
							minss = "";
							if (secondt == 0) {
								secss = "";
							} else if (secondt < 10) {
								secss = "0" + secondt + LanguageManager.getlocal("date_second");
							} else {
								secss = "" + secondt + LanguageManager.getlocal("date_second");
							}

							return secss

						} else if (minst < 10) {
							minss = "0" + minst + LanguageManager.getlocal("date_minute");
						} else {
							minss = "" + minst + LanguageManager.getlocal("date_minute");
						}

						return hourss + minss;

					}
				}
				else {
					dayss = days + LanguageManager.getlocal("date_day2");
					if (hourst == 0) {
						hourss = "";
					} else {
						if (hourst < 10)
							hourss = "0" + hourst + LanguageManager.getlocal("date_hour2");
						else
							hourss = "" + hourst + LanguageManager.getlocal("date_hour2");
						;
					}
					return dayss + hourss;
				}
			}
			return "";
		}

		//6:xx年x月x日
		function getFormatBySecond6(time:number):string {
			var date:Date = new Date(time *1000);
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			//泰国时间的特殊处理   xxxx.xx.xx
			if(PlatformManager.checkIsTextHorizontal() )
			{
				return year + "." + month + "." + day;
			}
				
			return year + LanguageManager.getlocal("yearTitle") + month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
		}

		//7:xx年x月x日
		function getFormatBySecond7(time:number):string {
			var date:Date = new Date(time *1000);
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			//泰国时间的特殊处理   xxxx.xx.xx
			if(PlatformManager.checkIsTextHorizontal() )
			{
				return month + "." + day;
			}
			return month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
		}

		//8:把时间转化为 xx小时x分x秒
		function getFormatBySecond8(secondNums:number):string {
			
			let resStr = "";
			if (secondNums >= 60*60*24) {
				let dSce = 60*60*24
				let t = Math.floor(secondNums / dSce);
				resStr = resStr +  t + LanguageManager.getlocal("date_day");
				secondNums = secondNums % dSce;
			}
			if( secondNums >= 60*60)
			 {
				 let hSce = 60*60
				 let h =  Math.floor(secondNums / hSce);
				 resStr = resStr + h +  LanguageManager.getlocal("date_hour2");
				 secondNums = secondNums%hSce
			}
			if( secondNums >= 60)
			 {
				 let min =  Math.floor(secondNums / 60);
				 resStr = resStr + min +  LanguageManager.getlocal("date_minute");
				 secondNums = secondNums%60
			}
			// if (secondNums >= 0)
			// {
				if(secondNums < 10)
				{
					resStr = resStr +"0"+ secondNums +  LanguageManager.getlocal("date_second");
				}else{
					resStr = resStr + secondNums +  LanguageManager.getlocal("date_second");
				}
			// }
			return resStr;
		}
		//9:mm-dd h:m
		function getFormatBySecond9(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return month +  "." + day +" " + hours + ":" + mins;
			// return new Date(time * 1000).toLocaleString();
		}

		//7:xx年x月x日
		function getFormatBySecond10(time:number):string {
			var date:Date = new Date(time *1000);
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			if(PlatformManager.checkIsTextHorizontal() )
			{
				return month + "." + day + " " + hours + ":00";
			}
			return month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle")+hours+LanguageManager.getlocal("date_hour");
		}

		//11 xx年xx月xx日 0:00:00
		function getFormatBySecond11(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return year + LanguageManager.getlocal("yearTitle") + month +  LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle") + hours + ":" + mins;
		}	
		//12 h : m
		function getFormatBySecond12(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);;
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			return hours + ":" + mins;
		}
		//13:mm月dd日 h:m
		function getFormatBySecond13(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var mins:string;
			var sens:string;
			if (minst == 0) {
				mins = "00";
			} else if (minst < 10) {
				mins = "0" + minst;
			} else {
				mins = "" + minst;
			}
			if (secondt == 0) {
				sens = "00";
			} else if (secondt < 10) {
				sens = "0" + secondt;
			} else {
				sens = "" + secondt;
			}
			return month + LanguageManager.getlocal("monthTitle") + day +LanguageManager.getlocal("dayTitle") + hours + ':' + mins;
		}

		//:把时间转化为 xx小时x分x秒
		function getFormatBySecond14(secondNums:number):string {
	
			let resStr = "";
			if (secondNums >= 60*60*24) {
				let dSce = 60*60*24
				let t = Math.floor(secondNums / dSce);
				resStr = resStr +  t + LanguageManager.getlocal("date_day");
				secondNums = secondNums % dSce;
			}
			if( secondNums >= 60*60)
			 {
				 let hSce = 60*60
				 let h =  Math.floor(secondNums / hSce);
				 resStr = resStr + h +  LanguageManager.getlocal("date_hour2");
				 secondNums = secondNums%hSce
			}
			if( secondNums >= 60)
			 {
				 let min =  Math.floor(secondNums / 60);
				 resStr = resStr + min +  LanguageManager.getlocal("date_minute");
				 secondNums = secondNums%60
			}
			// if (secondNums >= 0)
			// {
				if(secondNums < 10)
				{
					resStr = resStr + secondNums +  LanguageManager.getlocal("date_second");
				}else{
					resStr = resStr + secondNums +  LanguageManager.getlocal("date_second");
				}
			// }
			return resStr;
		}
		/**
		 * 当天零点的时间戳
		 * @param ts 时间戳
		 */
		export function getWeeTs(ts:number):number 
		{
			return ts-((ts+GameData.timeZone*3600)%86400)
		}

		/**
		 * 判断时间戳是否是跟服务器时间为同一天，true：是
		 * @param ts 时间戳
		 */
		export function checkIsToday(ts:number):boolean
		{
			return (GameData.serverTime-(getWeeTs(ts)+24*60*60))<0
		}

		/**
		 *获取活动开了几天
		 * @param et st 
		 */
		export function getActivityDay(et:number,st:number):number
		{
			let dt = Math.ceil(((App.DateUtil.getWeeTs(et)- App.DateUtil.getWeeTs(st))/86400))+1;

			return dt;
		}

		export function getLeftDaySecondByTime(time:number):number
		{
			let daySecond:number=hourSeconds*dayHours;
			let zoneSecond:number = GameData.timeZone*hourSeconds;
			let leftSecond:number=(time+zoneSecond)%daySecond;
			return leftSecond;
		}

		/**
		 * 获取功能开始结束时间
		 * @param st 
		 * @param et 
		 * @param showHour 是否精确到小时
		 */
		export function getOpenLocalTime(st:number,et:number,showHour:boolean):string
		{
			let type:number=showHour?10:7;
			return App.DateUtil.getFormatBySecond(st,type) + "-" + App.DateUtil.getFormatBySecond(et,type);
		}
		/** 获取服务器当前年份 */
		export function getServerYear() {
			var date:Date = new Date(GameData.serverTime *1000 + (GameData.timeZone + new Date().getTimezoneOffset() / 60 )*60*60*1000);
			return date.getFullYear();
		}
		/** 获取服务器当前月份 0-11 */
		export function getServerMonth() {
			var date:Date = new Date(GameData.serverTime *1000 + (GameData.timeZone + new Date().getTimezoneOffset() / 60 )*60*60*1000);
			return date.getMonth();
		}
	}
}