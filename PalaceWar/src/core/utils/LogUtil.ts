/**
 * author 陈可
 * date 2017/9/5
 * @class LogUtil
 */
namespace App
{
	export class LogUtil
	{
		private static _txt:BaseTextField;

		/**
		 * 命令打开log输出
		 */
		public static isTestShowLog:boolean=false;
		public constructor()
		{
		}

		/**
		 * 输出log，debug模式会输出
		 * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
		 */
		public static log(...logParams:any[]):void
		{
			if(PlatformManager.checkIsLocal()||GameData.isTest()||LogUtil.isTestShowLog)
			{
				let {firstParam,otherParams} = LogUtil.formatLogParams(logParams);
				console.log(firstParam,otherParams);
			}
		}

		/**
		 * 输出log到屏幕和log，debug模式会输出
		 * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
		 */
		public static show(...logParams:any[]):void
		{
			if(DEBUG)
			{
				let {firstParam,otherParams} = LogUtil.formatLogParams(logParams);
				egret.log(firstParam,otherParams);
			}
		}

		/**
		 * 输出警告log，debug模式会输出
		 * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
		 */
		public static warn(...logParams:any[]):void
		{
			if(PlatformManager.checkIsLocal()||LogUtil.isTestShowLog)
			{
				let {firstParam,otherParams} = LogUtil.formatLogParams(logParams);
				egret.warn.call(egret,firstParam,otherParams);
			}
		}

		/**
		 * 输出错误log，debug模式会输出
		 * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
		 */
		public static error(...logParams:any[]):void
		{
			if(DEBUG)
			{
				let {firstParam,otherParams} = LogUtil.formatLogParams(logParams);
				egret.error.call(egret,firstParam,otherParams);
			}
		}

		
		public static alert(...logParams:any[]):void
		{
			if(App.CommonUtil.getOption("testck")=="alert")
			{
				let {firstParam,otherParams} = LogUtil.formatLogParams(logParams);
				alert(firstParam+" "+otherParams);
			}
		}

		public static showTxt(...logParams:any[]):void
		{
			let {firstParam,otherParams} = LogUtil.formatLogParams(logParams);
			if(!LogUtil._txt)
			{
				LogUtil._txt=ComponentManager.getTextField(firstParam+" "+ otherParams,15);
				GameConfig.stage.addChild(LogUtil._txt);
			}
			else
			{
				LogUtil._txt.appendText(firstParam+" "+otherParams);
			}
		}
		


		/**
		 * 解析参数为字符串
		 * @param logParams 
		 */
		private static formatLogParams(logParams:any[]):{firstParam:string,otherParams:string}
		{
			let params:{firstParam:string,otherParams:string}={firstParam:undefined,otherParams:""};
			if(logParams&&logParams.length>0)
			{
				let firstParam:string=undefined;
				let otherParams:string="";
				for(var i:number=0;i<logParams.length;i++)
				{
					let paramStr:string=undefined;
					let param:any=logParams[i];
					paramStr=App.StringUtil.toString(param);
					if(i==0)
					{
						params.firstParam=paramStr;
					}
					else
					{
						if(!otherParams)
						{
							otherParams+=paramStr;
						}
						else
						{
							otherParams+=" "+paramStr;
						}
						params.otherParams=otherParams;
					}
				}
			}
			return params;
		}
	}
}