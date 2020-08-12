namespace App
{
	export namespace LoginResLoader 
	{
		/**游戏内资源加载分多个阶段，第一阶段加载default.res.json资源无进度展示；第二阶段加载背景图和进度条无进度展示，加载完后直接显示；第三阶段加载cn，config游戏初始化必要资源有进度展示，第四阶段为加载preload和首个场景资源，请求服务器和第四阶段并行 */
		
		/** default文件是否已经下载，第一阶段完成后置为true */
		export let isDefaultResLoaded:boolean=false;
		
		/**第二阶段加载完成后isLoginBgLoaded置为true */
		export let isLoginBgLoaded:boolean=false;

		/**第三阶段必要资源加载完成后置为true */
		export let isLoginBaseResLoaded:boolean=false;
		
		/**
		 * 游戏基本资源是否已经加载,preload,homeRes
		 */
		export let isGameBaseResLoaded:boolean = false;
		
		// export let isHomesceneResLoaded:boolean=false;
		export function checkAndShowLogin():void
		{
			if(isLoginBgLoaded&&isLoginBaseResLoaded)
			{
				if(!PlatMgr.checkIsUseSDK())
				{
					App.CommonUtil.showAccountPanel();
				}
				else
				{
					LoginMgr.loginGame();
				}
				
			}
		}

		/**
		 * 加载第一步，加载进度条和背景
		 */
		export function loadLoginBgRes():void
		{
			let logStr="start load loginLoadBg";
			LoginMgr.setLog(logStr);
			App.LogUtil.log(logStr);
			StatisticsHelper.reportLoadData("3_1");

			let resArr = ["loginLoadBg"];

			let groupName:string = ResMgr.loadResources(resArr,[],()=>{
				//加载loading背景图完成
				logStr="loginLoadBg load success";
				LoginMgr.setLog(logStr);
				StatisticsHelper.reportLoadData("3_2");
				App.LogUtil.log(logStr);
				LoginLoading.show();
				if(App.DeviceUtil.isRuntime2())
				{
					if(window["setIndexProgress"])
					{
						window["setIndexProgress"](90);
					}
				}
				isLoginBgLoaded=true;
				loadLoginBaseRes();
				StatisticsHelper.reportLoadData("3_3");
			},(event: RES.ResourceEvent)=>{
				//加载loading背景进度
				console.log("加载进度");
				if(event.resItem&&event.resItem.type==RES.ResourceItem.TYPE_IMAGE&&PlatMgr.checkCrossDomon()&&App.DeviceUtil.isAndroid()&&PlatMgr.checkIsWeiduan())
				{
					if(GameData.isLoadedSuccessImage||GameData.isLoadCrossImageError)
					{
						if(GameData.isLoadedSuccessImage)
						{
							console.log("已经有加载图片成功，不再处理跨域");
						}
						if(GameData.isLoadCrossImageError)
						{
							console.log("有加载报错，之前已经切换为非缓存，不再处理");
						}
					}
					else if(!GameData.isLoadedSuccessImage)
					{
						if((!ResMgr.getRes(event.resItem.name)))
						{
							NetManager.checkIsOnline((isOnline:boolean)=>{
								if(isOnline)
								{
									GameData.isLoadCrossImageError=true;
									console.log("跨域报错了，尝试reload");
									if(window["RSDKPlatform"]&&window["RSDKPlatform"].setDisableCache)
									{
										window["RSDKPlatform"].setDisableCache("1");
									}
									if(window.location.search)
									{
										window.location.href=window.location.href+"&gamediscache=0";
									}
									else
									{
										window.location.href=window.location.href+"?gamediscache=0";
									}
								}
							});
						}
						else
						{
							GameData.isLoadedSuccessImage=true;
							console.log("跨域加载成功");
							if(window["RSDKPlatform"]&&window["RSDKPlatform"].setEnableCacheForver)
							{
								window["RSDKPlatform"].setEnableCacheForver("1");
							}
						}
					}
				}
			},LoginResLoader,(e)=>{
				LoginMgr.setLog("oginLoadBg load fail");
				if(groupName)
				{
					ResMgr.destroyRes(groupName);
					ResMgr.deleteDiskCacheByKeyOrUrl(groupName);
				}
				App.ResourceUtil.retrySwithCDN("loadLoginBgRes",()=>{
					loadLoginBgRes();
				},LoginResLoader);
			});
		}
		function loadLoginBaseRes():void
		{
			let logStr="start load loginRes"
			LoginMgr.setLog(logStr);
			App.LogUtil.log(logStr);
			let cnName:string=GameData.getLanguageKey("cn");
			GameData.languageUsing = cnName;
			let loadArray = ["loginRes",cnName,GameConfig.getConfigName()];
			if (RES.hasRes(cnName+"_type"))
			{
				loadArray.push(cnName+"_type");
			}

			if(App.DeviceUtil.checkIsFullscreen())
			{
				if(ResMgr.hasRes("fill_screen_buttom"))
				{
					loadArray.push("fill_screen_buttom");
				}
				if(ResMgr.hasRes("fill_screen_top"))
				{
					loadArray.push("fill_screen_top");
				}
			}
			let groupName:string = ResMgr.loadResources(loadArray,[],()=>{
				logStr="loginRes load success";
				LoginMgr.setLog(logStr);
				App.LogUtil.log(logStr);
				LangMger.setData(ResMgr.getRes(cnName));
				if (RES.hasRes(cnName+"_type"))
				{
					LangMger.setTypeData(ResMgr.getRes(cnName+"_type"));
				}
				GameConfig.formatCfg();
				if(App.DeviceUtil.isRuntime2())
				{
					if(window["setIndexProgress"])
					{
						window["setIndexProgress"](95);
					}
				}
				loadLoginBaseResLoadComplete();
			},(event: RES.ResourceEvent)=>{
				//加载loginview资源进度
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginResLoader,(e:RES.ResourceEvent)=>{
				logStr="loginRes load fail";
				LoginMgr.setLog(logStr);
				if(groupName)
				{
					ResMgr.destroyRes(groupName);
					ResMgr.deleteDiskCacheByKeyOrUrl(groupName);
				}
				App.ResourceUtil.retrySwithCDN("loadLoginBaseRes",()=>{
					loadLoginBaseRes();
				},LoginResLoader);
			});
		}

		function loadLoginBaseResLoadComplete():void
		{
			StatisticsHelper.reportLoadData("3_4");
			if(!isLoginBaseResLoaded)
			{
				isLoginBaseResLoaded=true;
				checkAndShowLogin();
			}
		}

		export function loadGameBaseRes():void
		{
			StatisticsHelper.reportLoadData("6_2");

			let resArr:string[]=["preload","homeRes"];
			let groupName:string = ResMgr.loadResources(resArr,[],()=>{
				isGameBaseResLoaded = true;
				// loadHomeRes();
				LoginMgr.checkAndCreateScene();
			},(event: RES.ResourceEvent)=>{
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginResLoader,(e:RES.ResourceEvent)=>{
				if(groupName)
				{
					ResMgr.destroyRes(groupName);
					ResMgr.deleteDiskCacheByKeyOrUrl(groupName);
				}
				App.ResourceUtil.retrySwithCDN("loadGameBaseRes",()=>{
					loadGameBaseRes();
				},LoginResLoader);
			});
		}

		/**
		 * 登录完成后调用，加载主场景资源
		 */
		// export function loadHomeRes():void
		// {

		// 	if (LoginMgr.isLoginGameSuccess==false||isGameBaseResLoaded==false)
		// 	{
		// 		return;
		// 	}
			
		// 	let resArr:string[]=["homeRes"];
		// 	let groupName:string = ResMgr.loadResources(resArr,[],()=>{

		// 		isHomesceneResLoaded = true;
		// 		homeResLoadComplete();
				
		// 	},(event: RES.ResourceEvent)=>{
		// 		var per:number = event.itemsLoaded/event.itemsTotal;
		// 		var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
		// 		LoginLoading.setPercentage(per,progressStr);
		// 	},LoginResLoader,(e:RES.ResourceEvent)=>{
		// 		if(groupName)
		// 		{
		// 			ResMgr.destroyRes(groupName);
		// 			ResMgr.deleteDiskCacheByKeyOrUrl(groupName);
		// 		}
		// 		App.ResourceUtil.retrySwithCDN("loadHomeRes",()=>{
		// 			loadHomeRes();
		// 		},LoginResLoader);
		// 	});
		// }

		// function homeResLoadComplete():void
		// {	
		// 	if(LoginMgr.isLoginGameSuccess)
		// 	{
		// 		LoginMgr.checkAndCreateScene();
		// 	}
		// }

		export function dispose():void
		{
			// isHomesceneResLoaded=false;
		}

		let autoResCfg:string[]=[

		];
		let loadItemIndex:number=-1;
		let maxResNum:number=autoResCfg.length;
		/**
		 * 单线程静默加载文件
		 */
		export function autoLoadNextResItem():void
		{
			loadItemIndex++;
			if(loadItemIndex<maxResNum)
			{
				if(autoResCfg[loadItemIndex])
				{
					let resKey:string=autoResCfg[loadItemIndex];
					ResMgr.loadItem(resKey,autoLoadNextResItem,this);
				}
				else
				{
					App.LogUtil.log("缺少"+autoResCfg[loadItemIndex]);
					autoLoadNextResItem();
				}
			}
		}
	}
}