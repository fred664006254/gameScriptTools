/**
 * math常用方法工具类
 * author dmj
 * date 2017/9/5
 * @class MathUtil
 */
namespace App
{
	export namespace MathUtil 
	{

		/**
		 * 对数值进行格式化，以“,”隔开
		 * @param num 需要格式化的数值
		 */
		export function formatNumberByComma(num:number):string
		{
			var numStr:string = "";
			num = Math.floor(num);
			var numLength:number = num.toString().length;
			var originalNumStr:string = num.toString();
			var commaNum:number = Math.ceil(numLength / 3) - 1;
			App.LogUtil.log("commaNum = " + commaNum );
			if(commaNum < 0)
			{
				commaNum = 0;
			}
			if(commaNum > 0)
			{
				var str:string = "";
				for(var i = 1;i <= commaNum + 1;i++)
				{
					var startIndex:number = numLength - i * 3;
					var endIndex:number = numLength - (i - 1) * 3;
					if(i == (commaNum + 1))
					{
						startIndex = 0;
						str = originalNumStr.substring(startIndex,endIndex);
					}
					else
					{
						str = "," + originalNumStr.substring(startIndex,endIndex);
					}
					numStr = str + numStr;
				}
			}
			else
			{
				numStr = originalNumStr;
			}
			return numStr;
		}

		/**
		 * 格式化数字为K、M、G
		 * @param num 被格式化的数字
		 */
		export function formatNumber(num:number):string
		{
			var numStr:string = "";
			num = Math.floor(num);
			var numLength:number = num.toString().length;
			var originalNumStr:string = num.toString();
			var temNum:number = 0;
			if(numLength > 3 && numLength <= 6)
			{
				temNum = num / 1000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "K";
			}
			else if(numLength > 6 && numLength <= 9)
			{
				temNum = num / 1000000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "M";
			}
			else if(numLength > 9 && numLength <= 12)
			{
				temNum = num / 1000000000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "G";
			}
			else if(numLength > 12 )
			{
				temNum = num / 1000000000;
				numStr = temNum.toFixed(3 - Math.floor(temNum).toString().length) + "G";
			}
			else
			{
				numStr = originalNumStr;
			}
			return numStr;
		}

		/**
		 * 计算两点之间的直线距离
		 * @param p1 点1
		 * @param p2 点2
		 */
		export function getDistance(p1:egret.Point,p2:egret.Point):number
		{
			return egret.Point.distance(p1,p2);
		}
		/**
		 * 获取随机数，默认范围是（>=0 && <100）
		 * @param min 最小范围（大于等于min）
		 * @param max 最大范围(小于max)
		 */
		export function getRandom(min:number = 0,max:number = 100):number
		{
			return min + Math.floor(Math.random() * (max - min));
		}

		//js 精确乘法
		export function accMul(arg1,arg2)
		{
			var m=0,s1=arg1.toString(),s2=arg2.toString();
			try{m+=s1.split(".")[1].length}catch(e){}
			try{m+=s2.split(".")[1].length}catch(e){}
			return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
		}

		/**
		 * 弧度转换角度
		 * @param radian 弧度
		 */
		export function getAngleByRadian(radian:number):number
		{
			return  radian * 180 / Math.PI;
		}

		/**
		 * 角度转换弧度
		 * @param angle 角度
		 */
		export function getRadianByAngle(angle:number):number
		{
			return angle * Math.PI / 180;
		}

		/**
		 * 检查两个值是否相等
		 * @param value1 
		 * @param value2 
		 */
		export function checkEqual(value1:number,value2:number):boolean
		{
			if(isNaN(value1)==false&&isNaN(value1)==false)
			{
				return value1==value2;
			}
			return true;
		}
		/**
		 * 浮点数精简
		 * @param num 
		 * @param precision 
		 */
		export function strip(num, precision = 12) {
			return +parseFloat(num.toPrecision(precision));
		}

		export function toFixed(number : number, n : number) {
			if (n > 20 || n < 0) {
				throw new RangeError('toFixed() digits argument must be between 0 and 20');
			}
			if (isNaN(number) || number >= Math.pow(10, 21)) {
				return number.toString();
			}
			if (typeof (n) == 'undefined' || n == 0) {
				return (Math.round(number)).toString();
			}
		
			let result = number.toString();
			const arr = result.split('.');
		
			// 整数的情况
			if (arr.length < 2) {
				result += '.';
				for (let i = 0; i < n; i += 1) {
					result += '0';
				}
				return result;
			}
		
			const integer = arr[0];
			const decimal = arr[1];
			if (decimal.length == n) {
				return result;
			}
			if (decimal.length < n) {
				for (let i = 0; i < n - decimal.length; i += 1) {
					result += '0';
				}
				return result;
			}
			result = integer + '.' + decimal.substr(0, n);
			const last = decimal.substr(n, 1);
		
			// 四舍五入，转换为整数再处理，避免浮点数精度的损失
			if (parseInt(last, 10) >= 5) {
				const x = Math.pow(10, n);
				let tmp = (Math.round((parseFloat(result) * x)) + 1) / x;
				result = tmp.toFixed(n);
			}
			return result;
		};

		//十六进颜色数字转rgba
		export function  hexToRgb(hex:number):{x:number,y:number,z:number,a?:number} {
            // let _alpha = 1;
            // if(alpha){
            //     _alpha = alpha
            // }
            if( hex){
                let num = hex;
                let red = (num >> 16) / 255;
                let green = ((num >> 8) & 255) / 255;
                let blue = (num & 255) / 255;
                return {x:red, y:green, z:blue} //{red, green, blue, alpha};//, a:_alpha
            }
		};

		let seed:number=6;
		/**
		 * 返回min和max之前的随机值，取值范围 min<=value<max，不包含max值
		 * @param min 最小值，默认0
		 * @param max 最大值，默认1
		 * @param tmpseed 随机种子
		 */
		export function seededRandom(min?:number,max?:number,tmpseed?:number):number
		{
			if(!isNaN(tmpseed))
			{
				setSeed(tmpseed);
			}
			max = max || 1;
			min = min || 0;  // 根据数值进行随机值计算    
			seed = (seed * 9301 + 49297) % 233280;
			let rnd = seed / 233280;
			return min + rnd * (max - min);
		}

		export function setSeed(value:number):void
		{
			seed=value;
		}
	}
}