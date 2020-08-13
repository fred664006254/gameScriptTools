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
		 * @param type 
		 * 1:00:00:00   
		 * 2:yyyy-mm-dd h:m:s    
		 * 3:00:00   
		 * 4:xx天前，xx小时前，xx分钟前,
		 * 6:xx年x月x日,
		 * 7:x月x日
		 * 8: xx小时x分x秒
		 * 20: year-month-day
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
				case 22:
					str = getFormatBySecond22(second);
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + "/" + year + " " + hours + ":" + mins +  ":" + sens;
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + "/" + year;
			}
			else if(PlatformManager.checkIsTextHorizontal() )
			{
				return year + "." + month + "." + day;
			}
				
			return year + LanguageManager.getlocal("yearTitle") + month + LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle");
		}

		//7:x月x日
		function getFormatBySecond7(time:number):string {
			var date:Date = new Date(time *1000);
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			//泰国时间的特殊处理   xxxx.xx.xx
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return  day + "/" + month;
			}
			else if(PlatformManager.checkIsTextHorizontal() )
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + " "+ hours + ":" + mins;
			}
			return month +  "." + day +" " + hours + ":" + mins;
			// return new Date(time * 1000).toLocaleString();
		}

		//10:x月x日
		function getFormatBySecond10(time:number):string {
			var date:Date = new Date(time *1000);
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();

			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + " " + hours + ":00";
			}
			else if(PlatformManager.checkIsTextHorizontal() )
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + "/" + year + " " + hours + ":" + mins;
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

		//13 xx月xx日 0:00:00
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + " " + hours + ":" + mins + ":" + sens;
			}
			return month +  LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle") + hours + ":" + mins + ":" + sens;
		}	
		//15 xx月xx日 0:00
		function getFormatBySecond15(time:number):string {
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + " " + hours + ":" + mins;
			}
			return month +  LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle") + hours + ":" + mins;
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

		//:把时间转化为 xx小时x分x秒不含0
		function getFormatBySecond16(secondNums:number):string {
			
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
				 if(h > 0){
					resStr = resStr + h +  LanguageManager.getlocal("date_hour2");
				 }
				 secondNums = secondNums%hSce
			}
			if( secondNums >= 60)
			 {
				 let min =  Math.floor(secondNums / 60);
				 if(min > 0){
					resStr = resStr + min +  LanguageManager.getlocal("date_minute");
				 }
				 secondNums = secondNums%60
			}
			// if (secondNums >= 0)
			// {
			if(secondNums > 0)
			{
				resStr = resStr + secondNums +  LanguageManager.getlocal("date_second");
			}
			// }
			return resStr;
		}

		//8:把时间转化为 x天 00:00:00
		function getFormatBySecond17(secondNums:number):string {
			
			let resStr = "";
			if (secondNums >= 60*60*24) {
				let dSce = 60*60*24
				let t = Math.floor(secondNums / dSce);
				resStr = resStr +  t + LanguageManager.getlocal("date_day2");
				secondNums = secondNums % dSce;
			}

			var hourst:number = Math.floor(secondNums / 3600);
			var hours:string;
			if (hourst == 0) {
				hours = "00";
			} else {
				if (hourst < 10)
					hours = "0" + hourst;
				else
					hours = "" + hourst;
			}
			var minst:number = Math.floor((secondNums - hourst * 3600) / 60);
			var secondt:number = Math.floor((secondNums - hourst * 3600) % 60);
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
			return resStr + hours + ":" + mins + ":" + sens;
		}

		//18:把时间转化为 xx天xx小时x分x秒
		function getFormatBySecond18(secondNums:number):string {
			
			let resStr = "";
			if (secondNums >= 60*60*24) {
				let dSce = 60*60*24
				let t = Math.floor(secondNums / dSce);
				resStr = resStr +  t + LanguageManager.getlocal("date_day2");
				secondNums = secondNums % dSce;
			}
			if( secondNums >= 60*60)
			 {
				 let hSce = 60*60
				 let h =  Math.floor(secondNums / hSce);
				 resStr = resStr + h +  LanguageManager.getlocal("date_hour2");
				 secondNums = secondNums%hSce
			}
			else{
				resStr = resStr + "0" +  LanguageManager.getlocal("date_hour2");
			}

			if( secondNums >= 60)
			 {
				 let min =  Math.floor(secondNums / 60);
				 resStr = resStr + min +  LanguageManager.getlocal("date_minute");
				 secondNums = secondNums%60;
			}
			else{
				resStr = resStr + "0" +  LanguageManager.getlocal("date_minute");
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

		//11 xx-xx-xx \n 0:00:00
		function getFormatBySecond19(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear() %100;
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + "/" + year + "\n" + hours + ":" + mins + ":"+sens;
			}
			return year + "-" + month +  "-" + day + "\n" + hours + ":" + mins + ":"+sens;
		}	

		//20 xxxx-xx-xx 
		function getFormatBySecond20(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + "/" + year ;
			}
			return year + "-" + month +  "-" + day ;
		}	

		//21 xx月xx日 00:00
		function getFormatBySecond21(time:number):string {
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
			var hour:string;
			if (hours == 0){
				hour = "00";
			} else if (hours < 10){
				hour = "0" + hours;
			}
			else{
				hour = "" + hours;
			}
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + " " + hours + ":" + mins + ":" + sens;
			}
			return month +  LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle") + hour + ":" + mins + ":" + sens;
		}

		//22 xx年xx月xx日 00:00:00
		function getFormatBySecond22(time:number):string {
			var date:Date = new Date(time *1000);
			// date.setDate(time);
			
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1; 	//返回的月份从0-11；
			var day:number = date.getDate();
			var hours:number = date.getHours();
			var minst:number = date.getMinutes();
			var secondt:number = date.getSeconds();
			var hourstr:string;
			var mins:string;
			var sens:string;
			if (hours < 10){
				hourstr = "0" + hours;
			}
			else{
				hourstr = "" + hours;
			}
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
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang())
			{
				return day + "/" + month + "/" + year + " " + hourstr + ":" + mins + ":" + sens;
			}
			return year + LanguageManager.getlocal("yearTitle") + month +  LanguageManager.getlocal("monthTitle") + day + LanguageManager.getlocal("dayTitle") + hourstr + ":" + mins + ":" + sens;
		}
		
		export function isSameDay(t1:number,t2:number):boolean
		{
			let d1:Date = new Date(t1 *1000);
			let d2:Date = new Date(t2 *1000);
			if (d1.getDate()==d2.getDate() &&  d1.getMonth()==d2.getMonth() && d1.getFullYear()==d2.getFullYear())
			{
				return true;
			}

			return false;
		}

		/**
		 * 计算剩余的时间，天数 和小时，当大于一天的时候显示天数，小于一天的时候显示时间
		 */
		export function getFormatBySecondIntoTime(time:number):string {
			let dayValue: number = 0;
			let hourValue: number = 0;
			let timeStr: string = null;
			if ((time / 86400) > 1) {
				if (time % 86400 == 0) {
					dayValue = time / 86400;
				}
				else {
					dayValue = Math.floor(time / 86400) + 1;
				}
				timeStr = LanguageManager.getlocal("dateDayTitle",[String(dayValue)])
			}
			else {
				if (time % 3600 == 0) {
					hourValue = time / 3600;
				}
				else {
					hourValue = Math.floor(time / 3600) + 1;
				}
				timeStr = LanguageManager.getlocal("dateHourTitle",[String(hourValue)])
			}
			return timeStr
			 
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
		let localTimeZone:number=0;
		/**
		 * 获取本地时区和服务器时区差值，正数标识本地时区比服务器时区较早
		 */
		export function getDiffLocalAndSvrTimeZone():number
		{
			if(localTimeZone==0)
			{
				let date=new Date();
				localTimeZone=(date.getTimezoneOffset()/60)*-1;
			}
			return localTimeZone-GameData.timeZone;
		}

		/**
		 * 把服务器小时转换成本地小时显示
		 */
		export function formatSvrHourByLocalTimeZone(hour:number):{hour:number,day:number}
		{
			let day:number=0;
			let diff=getDiffLocalAndSvrTimeZone();
			hour=hour+diff;
			if(hour<0)
			{
				day=-1;
				hour=24+hour;
			}
			else if(hour>=24)
			{
				day=1;
				hour=hour-24;
			}
			return {hour:Number(hour),day:Number(day)};
		}

		/**
		 * 拿配置时间 单位是小时换算成设备时区小时
		 */
		export function getLocalTimeZoneTime(st:number,et:number):string[]
		{
			let result:string[]=[];
			let stData=formatSvrHourByLocalTimeZone(st);
			let etData=formatSvrHourByLocalTimeZone(et);
			if(stData.day==etData.day)
			{
				result=[String(stData.hour),String(etData.hour)];
			}
			else
			{
				result=[String(stData.hour),String(etData.hour)];
			}
			return result;
		}

		/**
		 * 慎用，只有在根据服务器时间戳转换跨天/跨月等需求时候使用
		 * 获取转换过的服务器Date数据，不能用时区，只能使用年，月，日，时，分，秒这几个属性
		 */
		export function getServerDate(time : number = GameData.serverTime):Date
		{
			let diffH: number = GameData.timeZone + (new Date()).getTimezoneOffset() / 60;
			var date: Date = new Date(time * 1000 + diffH * 3600 * 1000);
			return date;
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
	}
}