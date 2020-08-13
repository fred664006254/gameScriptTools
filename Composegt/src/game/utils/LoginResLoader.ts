namespace App
{
	export namespace LoginResLoader 
	{
		export let isLoginBgLoaded:boolean=false;
		export let isLoginViewResLoaded:boolean=false;
		export let isLoginResLoaded:boolean=false;
		export let isNeedLoadGuideRes:boolean=false;
		export let isDefaultResLoaded:boolean=false;

		export function checkAndShowLoginView():void
		{
			if(isLoginBgLoaded&&isLoginViewResLoaded)
			{
				LoginLoading.showBg();
				ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
			}
		}

		function loadLoginBgItem():void
		{
			initPlatCfg();
		}


		/**
		 * 加载第0步，加载闪屏
		 */
		export function loadPreLoginBgRes():void
		{
			if(PlatformManager.isShowPreLoading())
			{
				ResourceManager.loadItem("mlybg",()=>{
					LoginLoading.showPreBg();
					App.LoginResLoader.loadLoginBgRes();
					// LoginLoading.show();
				},this);
			}
			else{
				App.LoginResLoader.loadLoginBgRes();
			}
		}

		/**
		 * 加载第一步，加载进度条
		 */
		export function loadLoginBgRes():void
		{
			App.LogUtil.log("startload loginBg");
			StatisticsHelper.reportLoadData(3);

			let resArr = ["loginBg"];
			if(PlatformManager.isShowWXLoading())
			{
				if (PlatformManager.checkIsBaiduSp()||PlatformManager.checkIsQQXYXSp()) {
					resArr.push("baiduloadingbg");
				} else {
					resArr.push("wxloadingbg");
				}
				resArr.push("loginbg_wxprogress1_light");
				resArr.push("loginbg_wxprogress1_bg");
				resArr.push("loginbg_wxprogress1");
			}

			ResourceManager.loadResources(resArr,[],()=>{
				//加载loading背景图完成
				StatisticsHelper.reportLoadData(4);
				App.LogUtil.log("loadcomplete loginBg");
				LoginLoading.show();
				if(PlatformManager.checkIsUseSDK()==false)
				{
					loadLoginBgItem();
				}
				StatisticsHelper.reportLoadData(5);
				loadLoginViewRes();
			},(event: RES.ResourceEvent)=>{
				//加载loading背景进度
				console.log("加载进度");
				if(event.resItem&&event.resItem.type==RES.ResourceItem.TYPE_IMAGE&&PlatformManager.checkCrossDomon()&&App.DeviceUtil.isAndroid()&&PlatformManager.checkIsWeiduan())
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
						if((!ResourceManager.getRes(event.resItem.name)))
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
									window.location.reload();
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
			},LoginResLoader);
		}
		function loadLoginViewRes():void
		{
			App.LogUtil.log("startload loginRes");
			let cnName:string;
			let languageResKey:string=PlatformManager.getSpid();
			if(PlatformManager.checkIsLocal()||PlatformManager.checkIsIOSShenheSp())
			{
				let tmpcnName:string=App.CommonUtil.getOption("language");
				if(tmpcnName&&RES.hasRes(tmpcnName))
				{
					languageResKey=tmpcnName;
				}
				else
				{
					if(PlatformManager.checkIsIOSShenheSp()&&PlatformManager.checkIsTWBSp())
					{
						languageResKey="tw";
					}
				}
			}
			if(RES.hasRes(languageResKey))
			{
				cnName=languageResKey;
			}
			else
			{
				cnName="cn";
			}
			let loadArray = ["loginRes",cnName];
			if(PlatformManager.checkIsKRSp())
			{
				let isShow = LocalStorageManager.get("isShowKRAgreement")
				if(!isShow)
				{
					loadArray.push("kragreement")
				}
			}

			if(App.DeviceUtil.checkIsFullscreen())
			{
				if(ResourceManager.hasRes("fill_screen_buttom"))
				{
					loadArray.push("fill_screen_buttom");
				}
				if(ResourceManager.hasRes("fill_screen_top"))
				{
					loadArray.push("fill_screen_top");
				}
			}
			ResourceManager.loadResources(loadArray,[],()=>{
				App.LogUtil.log("loadcomplete loginRes");
				LanguageManager.setData(ResourceManager.getRes(cnName));
				if(App.DeviceUtil.isIOS())
				{
					loadLoginViewSoundRes();
				}else{
					loginViewResLoadComplete();
				}
				
				// loginViewResLoadComplete();
			},(event: RES.ResourceEvent)=>{
				//加载loginview资源进度
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginResLoader,(e:RES.ResourceEvent)=>{
				loadLoginViewRes();
			});
		}

		function loadLoginViewSoundRes():void
		{
			ResourceManager.loadGroup("loginSound",()=>{
				loginViewResLoadComplete();
			},(event: RES.ResourceEvent)=>{
				//加载loginview资源进度
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginResLoader,(e:RES.ResourceEvent)=>{
				loginViewResLoadComplete();
			});
		}

		function loginViewResLoadComplete():void
		{
			StatisticsHelper.reportLoadData(6);
			if(!isLoginViewResLoaded)
			{
				isLoginViewResLoaded=true;
				checkAndShowLoginView();
			}
			//加载loginview资源完成
			GameConfig.loadConfig();
			// loadPublicRes();
		}

		export function loadPublicRes():void
		{
			if(isLoginResLoaded==true)
			{
				return;
			}
			StatisticsHelper.reportLoadData(11);
			let resArr:string[]=["preload","office_fnt","composeRes"];
			ResourceManager.loadResources(resArr,[],()=>{
				
				if(App.DeviceUtil.isIOS())
				{
					loadhHomeSoundRes();
				}else{
					loadExtraPreloadRes();
				}
			},(event: RES.ResourceEvent)=>{
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginResLoader,(e:RES.ResourceEvent)=>{
				loadPublicRes();
			});
		}

		function loadhHomeSoundRes():void
		{
			ResourceManager.loadGroup("homeSound",()=>{
				loadExtraPreloadRes();
			},(event: RES.ResourceEvent)=>{
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginResLoader,(e:RES.ResourceEvent)=>{
				loadExtraPreloadRes();
			});
		}

		function loadExtraPreloadRes():void
		{
			StatisticsHelper.reportLoadData(12);
			if(PlatformManager.checkIsTWBSp())
			{
				StatisticsHelper.reportLoadData(13);
				ResourceManager.loadResources(["preload_tw"],[],()=>{
					StatisticsHelper.reportLoadData(14);
					homeResLoadComplete();
				},(event: RES.ResourceEvent)=>{
					var per:number = event.itemsLoaded/event.itemsTotal;
					var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
					LoginLoading.setPercentage(per,progressStr);
				},LoginResLoader,(e:RES.ResourceEvent)=>{
					loadExtraPreloadRes();
				});
			}
			else
			{
				homeResLoadComplete();
			}
		}

		function homeResLoadComplete():void
		{
			isLoginResLoaded=true;
			if(isNeedLoadGuideRes)
			{
				loadGuideRes();
			}
			else
			{
				if(LoginManager.isLoginSuccess)
				{
					StatisticsHelper.reportLoadData(15);
					LoginManager.checkAndCreateScene();
				}
				else
				{
					LoginManager.waitToCheckLoadGuide=true;
				}
			}
		}

		function loadGuideRes():void
		{	
			PlatformManager.analyticsNewGuide(1);
			ResourceManager.loadGroup("rookieRes",()=>{
				//加载loginview资源完成
				isLoginResLoaded=true;
				LoginManager.startGuide();
				LoginManager.checkAndCreateScene();
			},(event: RES.ResourceEvent)=>{
				//加载loginview资源进度
				var per:number = event.itemsLoaded/event.itemsTotal;
				var progressStr:string = event.itemsLoaded + "/" + event.itemsTotal;
				LoginLoading.setPercentage(per,progressStr);
			},LoginManager);
		}

		export function setNeedLoadGuideRes():void
		{
			isNeedLoadGuideRes=true;
			if(LoginManager.waitToCheckLoadGuide)
			{
				LoginManager.waitToCheckLoadGuide=false;
				loadGuideRes();
			}
		}

		export function initPlatCfg():void
		{
			PlatCfg.initCfg(()=>{
				let loadRes = [];
				if (PlatCfg.loginBg) {
					loadRes.push(PlatCfg.loginBg);
				}
				if (PlatCfg.loginLogo) {
					loadRes.push(PlatCfg.loginLogo);
				}
				ResourceManager.loadResources(loadRes,[],()=>{
					if(!App.LoginResLoader.isLoginBgLoaded)
					{
						App.LoginResLoader.isLoginBgLoaded=true;
						App.LoginResLoader.checkAndShowLoginView();
					}
				},null,LoginResLoader,()=>{
				});
			},LoginResLoader);
		}

		export function dispose():void
		{
			isNeedLoadGuideRes=false;
		}



		let autoResCfg:string[]=[

			
            "servant_full2_1033_ske",
            "servant_full2_1033_tex_json",
			"servant_full2_1033_tex_png",
			"firstchargefg",
			"firstchargebg",
			"recharge_fnt",
			"common_left_bg",
			"common_9_bg",
			"achievement_state3",
			"servant_topresbg", 
			"progress_type1_yellow","progress_type1_bg", 
			"rechargevie_effects",
			"recharge2_fnt",
			"recharge_diban_01",
			"rechargevie_db_01",  
			"rechargevipview",
			"recharge_new_itemicon1",
			"recharge_new_itemicon2",
			"recharge_new_itemicon3",
			"recharge_new_itemicon4",
			"recharge_new_itemicon5",
			"recharge_new_itemicon6",
			"recharge_new_itemicon7",
			"recharge_new_itemicon8",

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
					ResourceManager.loadItem(resKey,autoLoadNextResItem,this);
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