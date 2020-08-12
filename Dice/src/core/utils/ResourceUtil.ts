/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceUtil
 */
namespace App
{
	export class ResourceUtil
	{

		/*****资源组加载相关开始*****/
		private static _groupList:any={};
		private static _isGroupInit:boolean=false;

		/**
		 * sheet和对应资源对应关系存储，自动清理缓存会使用
		 */
		private static _sheetDic:any={};

		/**
		 * 资源组配置，引用计数用
		 */
		private static _groupResCacheDic:any={};

		/**
		 * 资源引用计数缓存
		 */
		private static _resCacheCountDic:any={};


		private static initGroup():void
		{
			if(ResourceUtil._isGroupInit==false)
			{
				RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,ResourceUtil.onGroupLoadProgress,ResourceUtil);
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,ResourceUtil.onGroupLoadComplete,ResourceUtil);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,ResourceUtil.onGroupLoadError,ResourceUtil);
				ResourceUtil._isGroupInit=true;
			}
		}

		/**
		 * 加载资源组
		 * @param groupName 资源组名称
		 * @param onLoadComplete 资源加载完成回调
		 * @param onLoadProgress 资源加载进度回调
		 * @param onLoadThisObj 资源加载回调所属对象 
		 */
		public static loadGroup(groupName:string,onLoadComplete:Function,onLoadProgress:(e:RES.ResourceEvent)=>void,onLoadThisObj:Function,onLoadError:(e:RES.ResourceEvent)=>void):void
		{
			ResourceUtil.initGroup();
			ResourceUtil._groupList[groupName]=[onLoadComplete,onLoadProgress,onLoadThisObj,onLoadError];
			RES.loadGroup(groupName);
		}

		public static onGroupLoadProgress(e:RES.ResourceEvent):void
		{
			let groupName:string=e.groupName;
			if(ResourceUtil._groupList[groupName])
			{
				let loadProgress:Function=ResourceUtil._groupList[groupName][1];
				let loadProgressTarget:any = ResourceUtil._groupList[groupName][2];
				if(loadProgress)
				{
					loadProgress.call(loadProgressTarget,e);
				}
			}
		}
		public static onGroupLoadComplete(e:RES.ResourceEvent):void
		{
			let groupName:string=e.groupName;
			if(ResourceUtil._groupList[groupName])
			{
				let loadComplete:Function=ResourceUtil._groupList[groupName][0];
				let loadCompleteTarget:any = ResourceUtil._groupList[groupName][2];
				if(loadComplete)
				{
					loadComplete.call(loadCompleteTarget);
				}
				ResourceUtil._groupList[groupName]=null;
				delete ResourceUtil._groupList[groupName];
			}
		}
		public static onGroupLoadError(e:RES.ResourceEvent):void
		{
			console.log("res loaderror",e.groupName);
			let groupName:string=e.groupName;
			if(ResourceUtil._groupList[groupName])
			{
				let loadErrorTarget:any = ResourceUtil._groupList[groupName][2];
				let loadError:Function=ResourceUtil._groupList[groupName][3];
				if(loadError)
				{
					loadError.call(loadErrorTarget);
				}
				ResourceUtil._groupList[groupName]=null;
				delete ResourceUtil._groupList[groupName];
			}
		}

		private static _groupIndex:number=0;

		/** 创建资源组，不自动加载
		 * @param  resources 资源组
		 */ 
		public static createGroup(resources:any[] = []):string
		{
			var groupName:string = "loadGroup" + ResourceUtil._groupIndex++;
			RES.createGroup(groupName, resources, true);
			return groupName;
		}

		/*****资源组加载相关结束*****/

		/*****单资源加载相关开始*****/
		private static _isItemLoadInit:boolean=false;

		private static initItemLoad():void
		{
			if(ResourceUtil._isItemLoadInit==false)
			{
				ResourceUtil._isItemLoadInit=true;
				RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,ResourceUtil.onItemLoadError,ResourceUtil);
			}
		}

		public static loadItem(key:string,onLoadComplete:(value?: any, key?: string)=>any,thisObj:any):void
		{
			ResourceUtil.initItemLoad();
			RES.getResAsync(key,onLoadComplete,thisObj);
		}

		public static loadItemByUrl(url:string,onLoadComplete:Function,thisObj:any,type?:string):void
		{
			ResourceUtil.initItemLoad();
			RES.getResByUrl(url,onLoadComplete,thisObj,type);
		}

		private static onItemLoadError(e:RES.ResourceEvent):void
		{
			let resName:string=e.resItem.name;
			// if(resName.indexOf("gameconfig_")>-1&&!GameConfig.isLoaded)
			// {
			// 	GameConfig.loadConfig();
			// }
			App.LogUtil.show("缺资源or断网",resName);
			let url:string=resName;
			if(RES.hasRes(resName))
			{
				url = ResourceUtil.getResCfgByKey(resName).url;
			}
			StatisticsHelper.reportGameResLoadFail(url);
		}
		/*****单资源加载相关结束*****/

		/**
		 * 加载混合资源
		 * @param resources 资源数组
		 * @param groups 资源组数组
		 * @param onResourceLoadComplete 资源加载完成执行函数
		 * @param onResourceLoadProgress 资源加载进度监听函数
		 * @param onResourceLoadTarget 资源加载监听函数所属对象
		 */
		public static loadResource(resources = [], groups = [], onResourceLoadComplete:Function, onResourceLoadProgress:(e:RES.ResourceEvent)=>void, onResourceLoadTarget:any,onLoadError:(e:RES.ResourceEvent)=>void):string
		{
			let needLoadArr:string[] = groups?resources.concat(groups):resources;
			let logtraceArr=needLoadArr.concat();
			let realLoadArr:string[]=ResourceUtil.screeningNeedLoadRes(needLoadArr);
			let l:number=realLoadArr.length;
			let isAllLoaded:boolean=true;
			if(l<=0)
			{
				App.CommonUtil.showTip("no res load");
				StatisticsHelper.reportOwnNameLog(logtraceArr,"noresload");
				return "";
			}
			// if(l>0)
			// {
			// 	for(let i:number=0;i<l;i++)
			// 	{
			// 		if((!RES.getRes(realLoadArr[i])||ResourceUtil.getCacheCount(realLoadArr[i])<2))
			// 		{
			// 			isAllLoaded=false;
			// 		}
			// 	}
			// }
			let groupName:string = ResourceUtil.createGroup(realLoadArr);
			ResourceUtil._groupResCacheDic[groupName]=realLoadArr;
			// if(isAllLoaded)
			// {
			// 	if(onResourceLoadComplete)
			// 	{
			// 		egret.callLater(onResourceLoadComplete,onResourceLoadTarget);
			// 	}
			// }
			// else
			// {
				ResourceUtil.loadGroup(groupName,onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget,onLoadError);
			// }
			return groupName;
		}

		public static loadSingleScript(jsSrc:string,callback?:()=>void,callbackObj?:any)
		{
			var s = document.createElement('script');
			s.async = false;
			s.src = jsSrc;
			s.addEventListener('load', function loadcomplete () {
				s.parentNode.removeChild(s);
				s.removeEventListener('load', loadcomplete, false);
				if(callback)
				{
					callback.apply(callbackObj);
				}
			}, false);
			document.body.appendChild(s);
		};

		/**
		 * 根据key检测要加载的资源
		 */
		private static checkAndPushRes(key:string,resArr:string[]):void
		{
			if(RES.hasRes(key))
			{
				let realRes:string = ResourceUtil.getAtlasByResName(key);
				if(realRes)
				{
					if(resArr.indexOf(realRes)<0)
					{
						ResourceUtil.addCacheCount(realRes);
						resArr.push(realRes);
					}
				}
				else
				{
					if(resArr.indexOf(key)<0)
					{
						resArr.push(key);
						ResourceUtil.addCacheCount(key);
					}
				}
			}
		}
				
		/**
		 * 资源key添加引用计数
		 */
		private static addCacheCount(key:string):void
		{
			if(!ResourceUtil._resCacheCountDic[key])
			{
				ResourceUtil._resCacheCountDic[key]=1;
			}
			else
			{
				ResourceUtil._resCacheCountDic[key]++;
			}
		}

		/**
		 * 获取资源key的引用计数
		 */
		private static getCacheCount(key:string):number
		{
			if(!ResourceUtil._resCacheCountDic[key])
			{
				return 0;
			}
			else
			{
				return ResourceUtil._resCacheCountDic[key];
			}
		}

		/**
		 * 资源key引用计数减一
		 */
		private static removeCacheCount(key:string,destory:boolean=false):void
		{
			if(ResourceUtil._resCacheCountDic[key])
			{
				ResourceUtil._resCacheCountDic[key]--;
			}
			if(destory&&!ResourceUtil._resCacheCountDic[key])
			{
				RES.destroyRes(key,false);
			}
		}


		/**
		 * 获取加载key，处理下可以支持游戏内定制化需求，按渠道来区分
		 */
		public static getReskey(key:string):string
		{
			let osStr:string=App.DeviceUtil.isIOS()?"ios":(App.DeviceUtil.isAndroid()?"and":"h5");
			let spid:string=PlatMgr.getSpid();
			if(RES.hasRes(key+"_"+spid+"type"))
			{
				key=key+"_"+spid+"type";
			}
			else
			{
				if(RES.hasRes(key+"_"+spid+osStr+"type"))
				{
					key=key+"_"+spid+osStr+"type";
				}
			}
			return key;
		}

		/**
		 * 检查资源key是否在对应组里面
		 */
		public static checkResInGroupByKey(resKey:string,groupName:string):boolean
		{
			let resCfg:RES.ResourceConfig;
			if(RES["configInstance"])
			{
				resCfg = RES["configInstance"];
				let resArr:{name:string}[]=resCfg.getRawGroupByName(groupName);
				if(resArr)
				{
					let l:number=resArr.length;
					for(let i:number=l-1;i>=0;i--)
					{
						if(resArr[i]&&resArr[i].name&&resArr[i].name==resKey)
						{
							return true;
						}
					}
				}
			}
			else
			{
				return false;
			}
		}

		/**
		 * 根据资源key获取配置
		 */
		public static getResCfgByKey(key:string):{name:string,type:string,url:string}
		{
			return GameConfig.resCfg.keyMap[key];
		}

		/**
		 * 检测资源key是否是资源组
		 */
		public static checkKeyIsGroup(key:string):boolean
		{
			let isgroup:boolean=false;
			if(RES["config"]&&RES["config"].config&&RES["config"].config.groups)
			{
				if(RES["config"].config.groups[key])
				{
					isgroup=true;
				}
			}
			else
			{
				let group=RES.getGroupByName(key)
				if(group&&group.length>0)
				{
					isgroup=true;
				}
			}
			return isgroup;
		}

		/**
		 * 清理apk新包缓存
		 * @param isReload 清理完缓存后是否直接reload，默认直接reolad，否则传false
		 */
		public static clearDiskCache(isReload:boolean=true):void
		{
			if(App.DeviceUtil.IsHtml5())
			{
				let refresh:string=(isReload?"1":"0");
				if(window["RSDKPlatform"]&&window["RSDKPlatform"].clearCache)
				{
					window["RSDKPlatform"].clearCache(refresh);
				}
				else if(window["webkit"]&&window["webkit"].messageHandlers&&window["webkit"].messageHandlers.RSDKClearCache)
				{
					window["webkit"].messageHandlers.RSDKClearCache.postMessage([refresh]);
				}
			}
		}

		/**
		 * 根据资源url删除资源的缓存，仅仅支持url
		 */
		public static deleteDiskCacheByUrl(res:string):void
		{
			if(!res)
			{
				return;
			}
			if(res.substr(res.length-4)=="json")
			{
				console.log(res.substr(0,res.length-4)+"png");
			}
			else if(res.substr(res.length-3)=="fnt")
			{
				console.log(res.substr(0,res.length-3)+"png");
			}
			if(App.DeviceUtil.IsHtml5())
			{
				if(window["RSDKPlatform"]&&window["RSDKPlatform"].deleteCacheByUrl)
				{
					if(res.indexOf("http://")==0||res.indexOf("https://")==0)
					{
						if(res.substr(res.length-4)=="json")
						{
							window["RSDKPlatform"].deleteCacheByUrl(res.substr(0,res.length-4)+"png");
						}
						else if(res.substr(res.length-3)=="fnt")
						{
							window["RSDKPlatform"].deleteCacheByUrl(res.substr(0,res.length-3)+"png");
						}
						window["RSDKPlatform"].deleteCacheByUrl(res);
					}
				}
			}
		}

		private static _resBaseUrl:string=null;
		public static getResFullUrlByKey(res:string):string
		{
			return ResourceUtil.getResBaseUrl()+ResourceUtil.getResCfgByKey(res).url;
		}

		public static getSheetResFullUrl(resKey:string):string
		{
			if(App.ResourceUtil._sheetDic&&App.ResourceUtil._sheetDic[resKey])
			{
				return ResourceUtil.getResBaseUrl()+App.ResourceUtil._sheetDic[resKey];
			}
			return "";
		}

		public static getResBaseUrl():string
		{
			if(App.DeviceUtil.IsHtml5())
			{
				if(!ResourceUtil._resBaseUrl)
				{
					let baseUrl:string=document.baseURI;
					if(!baseUrl)
					{
						baseUrl = window.location.host+window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/")+1);
					}
					else
					{
						baseUrl=baseUrl.substr(0,baseUrl.lastIndexOf("/")+1);
					}
					if(baseUrl.indexOf("//")<0)
					{
						baseUrl="//"+baseUrl;
					}
					if(baseUrl.indexOf("http")<0)
					{
						baseUrl=Http.getProtocol()+baseUrl;
					}
					ResourceUtil._resBaseUrl=baseUrl;
				}
				return ResourceUtil._resBaseUrl;
			}
			return "";
		}

		public static formatSheetLoad():void
		{
			RES.SheetAnalyzer.prototype.onLoadFinish = function (event) {
				var request = event.target;
				var data = this.resItemDic[request.$hashCode];
				delete this.resItemDic[request.hashCode];
				var resItem = data.item;
				var compFunc = data.func;
				resItem.loaded = (event.type == egret.Event.COMPLETE);
				if (resItem.loaded) {
					if (request instanceof egret.HttpRequest) {
						resItem.loaded = false;
						var imageUrl = this.analyzeConfig(resItem, request.response);
						if (imageUrl) {
							App.ResourceUtil._sheetDic[resItem.name]=imageUrl;
							this.loadImage(imageUrl, data);
							this.recycler.push(request);
							return;
						}
					}
					else {
						var texture = new egret.Texture();
						texture._setBitmapData(request.data);
						this.analyzeBitmap(resItem, texture);
					}
				}
				if (request instanceof egret.HttpRequest) {
					this.recycler.push(request);
				}
				else {
					this.recyclerIamge.push(request);
				}
				compFunc.call(data.thisObject, resItem);
			};
		}

		
		/**
		 * 根据图片key名获取图集名称
		 */
		public static getAtlasByResName(resKey:string):string
		{
			if(GameConfig.resCfg&&GameConfig.resCfg.keyMap)
			{
				if(GameConfig.resCfg.keyMap[resKey])
				{
					if(GameConfig.resCfg.keyMap[resKey].subkeys)
					{
						//是图集
						return GameConfig.resCfg.keyMap[resKey].name;
					}
					else
					{
						return null;
					}
				}
			}
		}

		/**
		 * 根据key获取资源尺寸，资源必现包含在default.res.json
		 * @param resKey 资源key
		 */
		public static getImgSize(resKey:string):{w:number,h:number}
		{
			let result:{w:number,h:number}=null;
			if(GameConfig.resCfg&&GameConfig.resCfg.keyMap)
			{
				let resCfg=GameConfig.resCfg.keyMap[resKey];
				if(resCfg&&resCfg.sz)
				{
					let sz:string=resCfg.sz;
					let szArr=sz.split(",");
					result = {w:Number(szArr[0]),h:Number(szArr[1])};
				}
			}
			return result;
		}


		/**
		 * 根据组名来返回具体资源
		 */
		public static getGroupResKeysByGroupName(groupName:string):{name:string}[]
		{
			let resKeys:{name:string}[]=[];
			if(GameConfig.resCfg&&GameConfig.resCfg.groupDic&&GameConfig.resCfg.groupDic[groupName])
			{
				resKeys = GameConfig.resCfg.groupDic[groupName];
			}
			return resKeys;
		}

		/**
		 * 筛选真实加载的资源
		 */
		public static screeningNeedLoadRes(needLoadArr:string[]):string[]
		{
			let realLoadArr:string[]=[];
			for(let i:number=needLoadArr.length-1;i>=0;i--)
			{
				let key:string=needLoadArr[i];
				key=App.ResourceUtil.getReskey(key);
				needLoadArr[i]=key;
				let isGroup:boolean=ResourceUtil.checkKeyIsGroup(key);
				if((!key)||(RES.hasRes(key)==false&&!isGroup))
				{
					App.LogUtil.warn("资源配置缺少",key,"跳过加载此文件");
					needLoadArr.splice(i,1);
				}
				else
				{
					if(isGroup)
					{
						let groupKeysArr:{name:string}[] = ResourceUtil.getGroupResKeysByGroupName(key);
						for(let i:number=groupKeysArr.length-1;i>=0;i--)
						{
							if(groupKeysArr[i]&&groupKeysArr[i].name)
							{
								ResourceUtil.checkAndPushRes(groupKeysArr[i].name,realLoadArr);
							}
						}
						// realLoadArr.push(key);
					}
					else
					{
						if(key.indexOf("btn")>-1)
						{
							let btnDownName:string=key+"_down";
							ResourceUtil.checkAndPushRes(key,realLoadArr);
							ResourceUtil.checkAndPushRes(btnDownName,realLoadArr);
						}
						else if(key.indexOf("progress")>-1)
						{
							let progressBgName:string=key+"_bg";
							ResourceUtil.checkAndPushRes(key,realLoadArr);
							ResourceUtil.checkAndPushRes(progressBgName,realLoadArr);
						}
						else if(key.indexOf("shield")>-1)
						{
							let shieldName:string=GameData.getLanguageKey("shield_");
							let shieldNameJson:string="shieldname_cn";
							if (RES.hasRes(shieldName)==false)
							{
								shieldName ="shield_cn";
							}
							if(RES.hasRes(shieldName))
							{
								needLoadArr[i] = shieldName;
								ResourceUtil.checkAndPushRes(shieldName,realLoadArr);
								shieldNameJson=shieldName.replace("shield_","shieldname_");
							}
							if(RES.hasRes(shieldNameJson))
							{
								ResourceUtil.checkAndPushRes(shieldNameJson,realLoadArr);
							}
						}
						else if(key.indexOf("names")>-1)
						{
							let shieldName:string=GameData.getLanguageKey("names_");
							if(RES.hasRes(shieldName))
							{
								needLoadArr[i] = shieldName;
							}
							else
							{
								shieldName="names_cn";
							}
							ResourceUtil.checkAndPushRes(shieldName,realLoadArr);
						}
						else if(key.indexOf("update_")>-1)
						{
							let shieldName:string=GameData.getLanguageKey("update_");
							if(RES.hasRes(shieldName))
							{
								needLoadArr[i] = shieldName;
							}
							else
							{
								shieldName="update_cn";
							}
							ResourceUtil.checkAndPushRes(shieldName,realLoadArr);
						}
						else
						{
							ResourceUtil.checkAndPushRes(key,realLoadArr);
						}
					}
				}
			}
			return realLoadArr;
		}

		public static retrySwithCDN(res:string,callback:(count?:number)=>void,callbackThisObj:any,isShowErrorTip:boolean=true,errorCallback?:()=>void):void
		{
			if(App.DeviceUtil.IsHtml5())
			{
				NetManager.checkIsOnline((isOnline:boolean)=>{
					if(isOnline)
					{
						let trySwitchCDNCount:number=0;
						if(window["trySwitchCDN"])
						{
							let resName:string=res;
							let url:string=resName;
							if(RES.hasRes(resName))
							{
								url = App.ResourceUtil.getResCfgByKey(resName).url;
							}
							trySwitchCDNCount=window["trySwitchCDN"](url,null,null,4);
						}
						if(callback)
						{
							callback.apply(callbackThisObj,[trySwitchCDNCount]);
						}
						//在线
					}
					else
					{
						console.log("offline res error");
						if(isShowErrorTip)
						{
							App.DocumentUtil.showLoadResFailDiv(callback,callbackThisObj);
						}
						else
						{
							if(errorCallback)
							{
								errorCallback.call(callbackThisObj);
							}
						}
						//离线
					}
				});
			}
			else
			{
				if(isShowErrorTip)
				{
					if(callback)
					{
						callback.call(callbackThisObj);
					}
				}
				else
				{
					if(errorCallback)
					{
						errorCallback.call(callbackThisObj);
					}
				}
			}
		}

		/**
		 * 释放对象
		 * @param name 配置文件中加载项的name属性或资源组名。
		 */
		public static destroyRes(name:string):void
		{
			if(ResourceUtil._groupResCacheDic[name])
			{
				let resArr:string[]=ResourceUtil._groupResCacheDic[name];
				for(let key in resArr)
				{
					ResourceUtil.removeCacheCount(resArr[key],!ResourceUtil.checkKeyIsGroup(name));
				}
				delete ResourceUtil._groupResCacheDic[name];
				if(ResourceUtil.checkKeyIsGroup(name))
				{
					RES.destroyRes(name,false);
				}
			}
			else if(ResourceUtil.checkKeyIsGroup(name))
			{
				RES.destroyRes(name,false);
			}
			else
			{
				RES.destroyRes(name,false);
			}
		}
	}

}