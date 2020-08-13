namespace GameConfig 
{
	export let stageWidth:number = NaN;
	export let stageHeigth:number = NaN;
	export let stage:egret.Stage = null;
	export let isLoaded:boolean=false;
	export let refreshUIResArr:string[]=["gold","food","soldier","gem","level","power","exp"];

	export let platCfg:any={};
	export let serverCfg:any={};
	export let rookieCfg:any={};

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
	let isNewDiffCfg:boolean=false;

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
		export let signupCfg:any={};
		/**
		 * 场景配置
		 */
		export let sceneCfg:any={};
		export let wanbagamegiftCfg:any={};
		export let loginweekCfg:any={};
		export let challengelvCfg:any={};
	}


	export function loadConfig():void
	{
		let loadBigCfg:boolean=true;//PlatformManager.checkIsUseBigCfg();
		//test code 
		// loadBigCfg=true;
		if(loadBigCfg)
		{
			ResourceManager.loadItem(getConfigName(),loadOneCfgComplete,GameConfig);
		}
		else
		{
			ResourceManager.loadGroup("config",()=>
			{
				GameConfig.isLoaded=true;
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
			},
			loadOneCfgComplete,GameConfig);
		}
	}
	function loadOneCfgComplete(e:RES.ResourceEvent|any):void
	{
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
				for(let resName in e)
				{
					let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
					config[name]=decoderCfg(resName,e[resName]);//e[resName];
					let configName:string=App.StringUtil.firstCharToUper(name);
					if(Config[configName]&&Config[configName].formatData)
					{
						Config[configName].formatData(config[name]);
					}
					else
					{
						if(configName=="ChallengeCfg")
						{
							ChallengeCfg.formatData(config[name]);
						}
					}
				}
				GameConfig.isLoaded=true;
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
			}
		}
	}
	let decodeCfg={
		"servantbasecfg":["upLv","needItem","reward","abilityLv","upgradeNeed","skillUpgradeExp","attItem","skill","servantLvList"],
		"challengecfg":["big","middle","middleNum","small","smallNum","type","show","atk","soldier","reward","dialogue","unlockPrison","unlockMapGroup","minLevelLimit","showBoss","dropRatio","drop"],
		"maintaskcfg":["unlockId","questType","openType","openNeed","need","reward","value"],
		"lerycfg":["launch","interval","gold","food","soldier","buffCount","buffGroup","progress","condType","condNum","levyBuffID","attType","resType","rate"],
		"personinfocfg":["levyID","goldCost","weight","exp","firstReward","rewards","gold"]
	};
	let words=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	function decoderCfg(name:string,cfg:any):void
	{
		let keycfg:string[] = decodeCfg[name];
		if(keycfg)
		{
			let str = JSON.stringify(cfg);
			let isreplace=false;
			for(let key in keycfg)
			{
				if(keycfg.hasOwnProperty(key))
				{
					let v=keycfg[key];
					let needRep=words[key];
					str=str.replace(new RegExp("#"+needRep,"g"),keycfg[key]);
					// console.log("#"+needRep,keycfg[key]);
					isreplace=true;
				}
			}
			isreplace&&(cfg=JSON.parse(str));
		}
		return cfg;
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
		if(GameData.isNewCfgFlag==1)
		{

		}else{
			newCfgName = getConfigName()+"_new_"+GameData.isNewCfgFlag;
		}
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
		let languageResKey:string=PlatformManager.getSpid();
		if(PlatformManager.checkIsLocal()||PlatformManager.checkIsIOSShenheSp())
		{
			let tmpcnName:string=App.CommonUtil.getOption("language");
			if(tmpcnName&&RES.hasRes("gameconfig_"+tmpcnName))
			{
				languageResKey=tmpcnName;
			}
			else
			{
				if(PlatformManager.checkIsIOSShenheSp()&&PlatformManager.checkIsTWBSp())
				{
					languageResKey="tw";
				}
				if(PlatformManager.checkIsQQXYXSp())
				{
					languageResKey="wanba";
				}
			}
		}
		// else if (PlatformManager.checkIsZjlySp())
		// {
		// 	languageResKey="zjly";
		// }

		if(RES.hasRes("gameconfig_"+languageResKey))
		{
			configResName="gameconfig_"+languageResKey;
		}
		else
		{
			configResName="gameconfig_cn";
		}
		if(App.CommonUtil.getOption("configKey"))
		{
			configResName = "gameconfig_" + App.CommonUtil.getOption("configKey");
		}
		return configResName;
	}
	
}