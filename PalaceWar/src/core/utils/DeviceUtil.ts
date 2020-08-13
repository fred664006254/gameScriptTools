/**
 * 设备信息工具
 * author 陈可
 * date 2017/9/8
 * @class DeviceUtil
 */
namespace App
{
	export class DeviceUtil
	{
		// 玩吧是否已下载微端
		public static wanbaIsDownloadApp = false;
		public constructor()
		{
		}

		/**
		 * 当前是否Html5版本
		 * @returns {boolean}
		 * @constructor
		 */
		public static IsHtml5():boolean 
		{
			return !this.isWXgame() && egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
		}

		/**
		 * 当前是否是Native版本
		 * @returns {boolean}
		 * @constructor
		 */
		public static IsNative():boolean 
		{
			return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
		}

		/**
		 * 当前是否是微信小游戏版本
		 */
		public static isWXgame():boolean
		{
			return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
		}
		/**
		 * 当前是否是qq玩一玩
		 */
		public static isWyw():boolean
		{
			return window&&window["WYW_ISWYW"] === true;
		}
		/**
		 * 当前是否是qq小游戏
		 */
		public static isQQGame():boolean
		{
			return window&&window["QQ_ISQQ"] === true;
		}

		/**
		 * 是否是runtime2微端环境
		 */
		public static isRuntime2():boolean
		{
			return egret.Capabilities.runtimeType==egret.RuntimeType.RUNTIME2;
		}

		/**
		 * 是否是在手机上
		 * @returns {boolean}
		 * @constructor
		 */
		public static IsMobile():boolean 
		{
			return egret.Capabilities.isMobile;
		}
		
		public static isAndroid():boolean
		{
			if (this.isWXgame()) {
				//console.log("判断为微信小游戏a");
				return window["__WXGAME_OS__"] == "android"; //android终端
			} else {
				return egret.Capabilities.os=="Android";
			}
		}

		public static isIOS():boolean
		{
			if (this.isWXgame()) {
				//console.log("判断为微信小游戏b");
				return window["__WXGAME_OS__"] == "ios"; //ios终端
			} else {
				return egret.Capabilities.os=="iOS";
			}
		}

		public static CheckWebglRenderMode():boolean
		{
			return egret.Capabilities.renderMode=="webgl";
		}

		/**获取设备当前语言 */
		public static getOSCurrentLanguage():string
		{
			return "cn";
		}

		/**
		 * 检测是否是全面屏手机
		 */
		public static checkIsFullscreen():boolean
		{
			return DeviceUtil.getScreenRatio()>(16/9+0.005)||GameConfig.stage.stageHeight>(1136+3.2);
		}

		public static checkIsSeascreen():boolean
		{
			return DeviceUtil.getScreenRatio()>2;
		}

		/**
		 * 获取屏幕高度除以宽度的值
		 */
		public static getScreenRatio():number
		{
			let value:number=0;
			let window_width:number;
			let window_height:number;
			if(App.DeviceUtil.IsHtml5())
			{
				window_width = document.documentElement.clientWidth;
				window_height = document.documentElement.clientHeight;
			}
			else if (this.isWXgame()) 
			{

				window_width = window.screen.availWidth;
				window_height = window.screen.availHeight;
			}
			value=window_height/window_width;
			return value;
		}

		/**
		 * 检测是否是iPhone X
		 */
		public static checkIsIphoneX():boolean
		{
			var width = 0;
			var height = 0;
			if (this.isWXgame()) {
				width = window.screen.availWidth;
				height = window.screen.availHeight;
			} else {
				width = window.screen.width;
				height = window.screen.height;
			}
			var ratio = window.devicePixelRatio
			var isIphoneX = width * ratio === 1125 && height * ratio === 2436
			return isIphoneX;
		}

		/**
		 * 检测是否有ios清理缓存接口
		 */
		public static checkHasIOSClearCacheApi():boolean
		{
			let result:boolean=false;
			if(DeviceUtil.IsHtml5()&&DeviceUtil.isIOS())
			{
				if(window["webkit"]&&window["webkit"].messageHandlers&&window["webkit"].messageHandlers.RSDKClearCache)
				{
					result=true;
				}
			}
			return result;
		}

	}
}