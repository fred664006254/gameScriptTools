namespace GameConfig 
{
	export let stageWidth:number = NaN;
	export let stageHeigth:number = NaN;
	export let stageFullHeigth:number = NaN;
	export let stageMaxHeight:number=1280;
	export let stageMinHeight: number = 1136;
	export let stageMinWidth: number = 640;
	export let stage:egret.Stage = null;
	export let isLoaded:boolean=false;
	let gameConfigName:string=null;

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

	/**
	 * 怪物检测区域，按类型配置
	 */
	export let monsterSize={
		"1":{w:60,h:56},
		"2":{w:36,h:32},
		"3":{w:102,h:96},
		"4":{w:102,h:96},
	};

	export let noTipCmd=[
	];

	export function init():void
	{
		stage = egret.MainContext.instance.stage;
		const screenWidth = egret.MainContext.instance.stage.stageWidth;
		const screenHeight = egret.MainContext.instance.stage.stageHeight;
		if (App.DeviceUtil.checkIsIpadScreen()) {
			// pad屏
			stageWidth = stageMinWidth;
			stageHeigth = stageMinHeight;
		} else {
			// 正常屏或全面屏
			stageWidth = screenWidth;
			stageHeigth = Math.min(screenHeight, stageMaxHeight);
		}
	}

	/**
	 * 根据统计ID获取大渠道标识
	 * @param subAppId 默认统计ID，可不传，不传情况默认使用切区sdk传参的id
	 */
	export function getAreaBysubId(subAppId?:string):string
	{
		if(!subAppId)
		{
			subAppId=PlatMgr.getGameArea();
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
	 * 流海屏流海高度
	 */
	export let seaScreenTopH:number=50;

	/**
	 * iPhone X 底部横条
	 */
	export let iphoneXButtomH:number=30;


	export function formatCfg():void
	{		
		let gameCfg=ResMgr.getRes(getConfigName());
		let keysArray:string[] = Object.keys(gameCfg);
		function runCachedFun(f:any):boolean
		{	
			if(!keysArray.length)
			{
				egret.stopTick(runCachedFun, GameConfig);
				GameConfig.isLoaded=true;
			}
			let timeFlag = egret.getTimer();
			while(keysArray.length)
			{	
				let resName:string = keysArray.shift();
				
				let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
				let cfg=gameCfg[resName];
				GameConfig[name]=cfg;
				let configName:string=App.StringUtil.firstCharToUper(name);
				if(Config[configName]&&Config[configName].formatData)
				{
					Config[configName].formatData(cfg);
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

	export function getConfigName():string
	{
		if(!gameConfigName)
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
			gameConfigName=configResName;
		}
		return gameConfigName;
	}

	/**
	 * 获取品质颜色
	 */
	export function getQualityColor(quality:number|string):number
	{
		let color:number=ColorEnums.white;
		switch(Number(quality))
		{
			case 1:
				color=ColorEnums.normal;
				break;
			case 2:
				color=ColorEnums.rare;
				break;
			case 3:
				color=ColorEnums.epic;
				break;
			case 4:
				color=ColorEnums.legend;
				break;
            default:
                color= ColorEnums.normal;
		}
		return color;
	}


	/**
	 * 特殊处理，港澳台，新加坡使用繁体
	 */
	export function getAreaLangKey():string
	{
		let countryCode:string = PlatMgr.getGameCountryCode().toLowerCase();
		let gameLang:string=PlatMgr.getGameLanguage().toLowerCase();
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