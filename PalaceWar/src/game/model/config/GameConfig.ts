namespace GameConfig 
{
	export let stageWidth:number = NaN;
	export let stageHeigth:number = NaN;
	export let stageFullHeigth:number = NaN;
	export let stage:egret.Stage = null;
	export let isLoaded:boolean=false;
	export let refreshUIResArr:string[]=["gold","food","soldier","gem","level","power","exp"];

	export let platCfg:any={};
	export let serverCfg:any={};
	export let rookieCfg:any={};

	export let version:string = "1.3.16";
	let wywreportData={
		power:[2000,5000,10000,50000,100000,200000,500000,1000000,2000000]
	};

	/** 格式：数组第一位是安卓，第二位是IOS */
	export let areaCfg={
		"asia":["1003005045","1003005047"],
		"euro":["1003005046","1003005048"]
	};
	export let areaSvrCfg={
		"asia":"en",
		"euro":"en",
	};

	export let langList=[
		"en",
		// "pt"
	];
	export let localLangCfg={
		"tw":"繁體中文",
		"en":"English",
		"pt":"Português",
	};

	export let noTipCmd=[
		"newboss.attack",
		"dailyboss.attack",
		"challenge.attack",
		// "atkrace.fight",
		"dinner.getdinnerdetail",
		// "laddertournament.fight",
		"policy.setread"
	];

	/**
	 * 根据统计ID获取大渠道标识
	 * @param subAppId 默认统计ID，可不传，不传情况默认使用切区sdk传参的id
	 */
	export function getAreaBysubId(subAppId?:string):string
	{
		if(!subAppId)
		{
			subAppId=PlatformManager.getGameArea();
		}
		for (const key in areaCfg) 
		{
			if (areaCfg.hasOwnProperty(key)) 
			{
				const areaItem:string[] = areaCfg[key];
				if(areaItem.indexOf(subAppId)>-1)
				{
					return key;
				}
				
			}
		}
		return "";
	}

	export function getAreaTab():{area:string[],tab:string[]}
	{
		let area = GameConfig.getAreaBysubId();
		let areaArr = Object.keys(GameConfig.areaCfg);
		let idx=areaArr.indexOf(area);
		areaArr.splice(idx,1);
		areaArr.unshift(area);
		let tabStrArr:string[]=[];
		areaArr.forEach(element => {
			tabStrArr.push("areaTab_"+element)
		});
		return {area:areaArr,tab:tabStrArr};
	}

	export function getSubAppIdByArea(area:string):string
	{
		let id:string="";
		if(areaCfg[area])
		{
			if(App.DeviceUtil.isIOS())
			{
				id = areaCfg[area][1];
			}
			else
			{
				id = areaCfg[area][0];
			}
		}
		return id;
	}
	
	/**
	 * 资源配置
	 */
	export let resCfg:{keyMap:any,groupDic:any};

	/**
	 * 差异化配置
	 */
	let diffCfg:any={};

	/**
	 * 是否是新的差异化配置
	 */
	export let isNewDiffCfg:boolean=false;

	/**
	 * 差异化配置是否已经加载
	 */
	export let isNewDiffCfgLoaded:boolean=false;

	/**
	 * 流海屏流海高度
	 */
	export let seaScreenTopH:number=50;

	/**
	 * iPhone X 底部横条
	 */
	export let iphoneXButtomH:number=30;

	/**
	 * json配置文件
	 */
	export namespace config
	{
		// export let levelCfg:any={}; //已经解析，以后使用解析后的配置 Config.levelCfg
		export let searchbaseCfg:any={};

		export let abilityCfg:any={};
		export let abilitybaseCfg:any={};
		export let challengeCfg:any={};
		export let initCfg:any={};
		export let interfaceCfg:any={};
		export let itemCfg:any={};
		export let modelCfg:any={};
		export let servantbaseCfg:any={};
		export let servantCfg:any={};
		export let shopCfg:any={}; 
		export let vipCfg:any={};
		export let wifebaseCfg:any={};
		export let wifeCfg:any={};
		export let affairCfg:any={};
		export let childCfg:any={};
		export let childbaseCfg:any={};
		export let challengestoryCfg:any={};
		export let titleCfg:any={};
		export let adultCfg:any={};
		export let alliancebaseCfg:any={};
		export let allianceCfg:any={};
		export let bookroomCfg:any={};
		export let studyatkbaseCfg:any={};
		export let prisonbaseCfg:any={};
		export let limitedrewardbaseCfg:any={};
		export let conquestCfg:any={};
		export let tradebaseCfg:any={};
		export let wifeskinCfg:any={};
		export let invitefriendCfg:any={};
		export let shopnewCfg:any={};
		export let buildingCfg:any={};
		export let practicebaseCfg:any={};
		export let wifestatusCfg:any={};
		export let wifestatusbaseCfg:any={};
		export let friendCfg:any={};
		export let examCfg:any={};
		export let emoticonCfg:any={};
		/**
		 * 场景配置
		 */
		export let sceneCfg:any={};
	}


	export function loadConfig():void
	{
		let loadBigCfg:boolean=true;//PlatformManager.checkIsUseBigCfg();
		//test code 
		// loadBigCfg=true;
		// if(loadBigCfg)
		// {
			RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,loadOneCfgError,GameConfig);
			ResourceManager.loadItem(getConfigName(),loadOneCfgComplete,GameConfig);
		// }
		// else
		// {
		// 	ResourceManager.loadGroup("config",()=>
		// 	{
		// 		GameConfig.isLoaded=true;
		// 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
		// 	},
		// 	loadOneCfgComplete,GameConfig);
		// }
	}

	function loadOneCfgError(e:RES.ResourceEvent):void
	{
		if(e.resItem.name==getConfigName())
		{
			App.ResourceUtil.retrySwithCDN(e.resItem.name,()=>{
				ResourceManager.loadItem(getConfigName(),loadOneCfgComplete,GameConfig);
			},GameConfig);
		}
	}

	function loadOneCfgComplete(e:RES.ResourceEvent|any):void
	{	
		RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,loadOneCfgError,GameConfig);
		if(e instanceof RES.ResourceEvent)
		{
			let resName:string=e.resItem.name;
			let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
			let cfgData:any=ResourceManager.getRes(resName);
			config[name]=cfgData;
		
			
			let configName:string=App.StringUtil.firstCharToUper(name);
			if(Config[configName]&&Config[configName].formatData)
			{
				Config[configName].formatData(config[name]);
			}
		
		}
		else
		{
			if(typeof(e)=="object")
			{	
				// for(let resName in e)
				// {
				// 	let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
				// 	config[name]=e[resName];
				// 	let configName:string=App.StringUtil.firstCharToUper(name);
				// 	// console.log(configName+"configName");
				// 	if(Config[configName]&&Config[configName].formatData)
				// 	{
				// 		Config[configName].formatData(config[name]);
				// 	}
				// }
				// GameConfig.isLoaded=true;
				// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);

				let keysArray:string[] = Object.keys(e);
				// let indx = 0;
				function runCachedFun(f:any):boolean
				{	
					if(!keysArray.length)
					{
						// alert("QAZ frame count "+indx);
						egret.stopTick(runCachedFun, GameConfig);
						GameConfig.isLoaded=true;
						App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
					}
					// indx++;
					let timeFlag = egret.getTimer();
					while(keysArray.length)
					{	
						let resName:string = keysArray.shift();
						
						let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
						config[name]=e[resName];
						let configName:string=App.StringUtil.firstCharToUper(name);
						// console.log(configName+"configName");
						if(Config[configName]&&Config[configName].formatData)
						{
							Config[configName].formatData(config[name]);
						}

						if(egret.getTimer() - timeFlag > 30)
						{
							break;
						}
					}
					return false;
				}
				egret.startTick(runCachedFun, GameConfig);
			}
		}
	}

	function formatCfg2ByData(data:any,isNew:boolean):void
	{
		for(let resName in data)
		{
			let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
			if(isNew)
			{
				if(!diffCfg.old)
				{
					diffCfg.old={};
				}
				diffCfg.old[name]=config[name];
			}
			else
			{
				if(!diffCfg.new)
				{
					diffCfg.new={};
				}
				diffCfg.new[name]=config[name];
			}
			config[name]=data[resName];
			let configName:string=App.StringUtil.firstCharToUper(name);
			if(Config[configName]&&Config[configName].formatData)
			{
				Config[configName].formatData(config[name]);
			}
		}
		isNewDiffCfg=isNew;
	}

	function loadNewConfig(callback:()=>void):void
	{
		let newCfgName:string=getConfigName()+"_new";
		if(RES.hasRes(newCfgName))
		{
			return ResourceManager.loadItem(newCfgName,(data:any)=>{
				formatCfg2ByData(data,true);
				isNewDiffCfgLoaded=true;
				if(callback)
				{
					callback();
				}
			},GameConfig);
		}
		if(callback)
		{
			callback();
		}
	}

	export function switchNewOrOldCfg(useNew:boolean,successCallback:()=>void,successCallbackThisObj:any,successCallbackParams?:any[]):void
	{
		if(isNewDiffCfg==!useNew)
		{
			if(useNew)
			{
				if(diffCfg.new)
				{
					formatCfg2ByData(diffCfg.new,true);
					if(successCallback)
					{
						return successCallback.apply(successCallbackThisObj,successCallbackParams);
					}
				}
				else
				{
					return loadNewConfig(()=>{
						successCallback.apply(successCallbackThisObj,successCallbackParams);
					});
				}
			}
			else
			{
				if(diffCfg.old)
				{
					formatCfg2ByData(diffCfg.old,false);
					if(successCallback)
					{
						return successCallback.apply(successCallbackThisObj,successCallbackParams);
					}
				}
			}
		}
		return successCallback.apply(successCallbackThisObj,successCallbackParams);
	}

	function getConfigName():string
	{
		let configResName:string;
		let languageResKey:string=GameData.getLanguageKey("gameconfig_");//App.CommonUtil.getLanguageResKey();

		if(RES.hasRes(languageResKey))
		{
			configResName=languageResKey;
		}
		else
		{
			configResName="gameconfig_cn";
		}
		return configResName;
	}

	export function preloadOneCfgComplete(e:RES.ResourceEvent|any):void
	{	
		console.log("preloadOneCfgComplete ", e);
		if(e instanceof RES.ResourceEvent)
		{
			let resName:string=e.resItem.name;
			let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
			let cfgData:any=ResourceManager.getRes(resName);
			// config[name]=cfgData;
			let configName:string=App.StringUtil.firstCharToUper(name);
			if(Config.AcCfg[configName]&&Config.AcCfg[configName].formatPreloadCfg)
			{
				Config.AcCfg[configName].formatPreloadCfg(config[name]);
			}
		
		}
		else
		{
			if(typeof(e)=="object")
			{	
				let keysArray:string[] = Object.keys(e);
				// let indx = 0;
				console.log("preloadOneCfgComplete aaaa ", keysArray);
				for (let i=0; i < keysArray.length; i++){
					let resName = keysArray[i];
					if (resName != "v"){
						let cfgData = e[resName];
						let name = resName.substr(0,resName.length-3);
						// config[name]=e[resName];
						// let configName:string=App.StringUtil.firstCharToUper(name);
						if(Config.AcCfg&&Config.AcCfg.formatPreloadCfg)
						{
							Config.AcCfg.formatPreloadCfg(name, cfgData);
						}
					}
				}
			}
		}
	}

	//预加载配置
	export function getPreloadConfigName():string{
		let configResName:string;
		let languageResKey:string=GameData.getLanguageKey("preloadconfig_");//App.CommonUtil.getLanguageResKey();

		if(RES.hasRes(languageResKey))
		{
			configResName=languageResKey;
		}
		else
		{
			configResName="preloadconfig_cn";
		}
		return configResName;
	}

	/**
	 * 获取品质颜色
	 */
	export function getQualityColor(quality:number|string):number
	{
		let color:number=TextFieldConst.COLOR_QUALITY_WHITE;
		switch(Number(quality))
		{
			case 1:
				color=TextFieldConst.COLOR_QUALITY_WHITE;
				break;
			case 2:
				color=TextFieldConst.COLOR_QUALITY_GREEN;
				break;
			case 3:
				color=TextFieldConst.COLOR_QUALITY_BLUE;
				break;
			case 4:
				color=TextFieldConst.COLOR_QUALITY_PURPLE;
				break;
			case 5:
				color=TextFieldConst.COLOR_QUALITY_RED;
				break;
			case 6:
				color=TextFieldConst.COLOR_RED_ORANGE;
				break;
			case 7:
				color=TextFieldConst.COLOR_QUALITY_ORANGE;
				break;
			case 8:
				color=TextFieldConst.COLOR_QUALITY_YELLOW2;
				break;
		}
		return color;
	}


	/**
	 * 检测是否统计玩一玩权势
	 */
	export function checkWywReportPower(lastPower:number,power:number):boolean
	{
		if(lastPower>=power)
		{
			return false;
		}
		let l:number=wywreportData.power.length;
		let findLast:boolean=false;
		let findNow:boolean=false;
		for(let i=0;i<l;i++)
		{
			let value:number=wywreportData.power[i];
			if(lastPower<value&&findLast==false)
			{
				findLast=true;
			}
			if(findLast)
			{
				if(power>=value)
				{
					findNow=true;
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 特殊处理，港澳台，新加坡使用繁体
	 */
	export function getAreaLangKey():string
	{
		let countryCode:string = PlatformManager.getGameCountryCode().toLowerCase();
		let gameLang:string=PlatformManager.getGameLanguage().toLowerCase();
		let cnKey:string=gameLang;
		if(langList.indexOf(gameLang)<0)
		{
			if(gameLang=="zh"&&langList.indexOf("tw")>-1)
			{
				cnKey="tw";
			}
		}
		if(!langList[cnKey])
		{
			cnKey="en";
		}
		return cnKey;
	}
	
}