namespace Config
{
	/**
	 * 场景配置类
	 * date 2018/4/2
	 * @class ShopCfg
	 */
	export namespace SceneCfg 
	{
		let cfg={};
		export function formatData(data:any):void
		{
			
			if (data.main)
			{
				cfg=getFullData(data.main);

				let languageResKey:string=GameData.getLanguageKey("sceneCfg");//App.CommonUtil.getLanguageResKey();
				// if (languageResKey == "pt")
				// {
				// 	languageResKey = "en";
				// }
				if (data[languageResKey])
				{
					let spData = data[languageResKey];
					for (let k1 in spData) //homeScene
					{
						if (cfg[k1] == null)
						{
							cfg[k1] = spData[k1];
						}
						else 
						{	
							for (let k2 in spData[k1]) // "101"
							{	
								if (cfg[k1][k2] == null)
								{
									cfg[k1][k2] = spData[k1][k2];
								}
								else 
								{
									for (let k3 in spData[k1][k2])
									{
										cfg[k1][k2][k3] = spData[k1][k2][k3];
									}	
								}
							}	
						}
					}
				}
			}
			else
			{
				cfg=data;
			}
		}
		export function getFullData(data:any):any
		{	
			for (let k1 in data) //homeScene
			{
				let fulldata:any = null;
				for (let k2 in data[k1]) // "101"
				{	
					if (fulldata == null)
					{
						fulldata = data[k1][k2];
					}
					else 
					{
						for (let k3 in fulldata)
						{	
							if (data[k1][k2][k3] == null)
							{
								data[k1][k2][k3] = fulldata[k3]
							}
						}	
					}
				}	
			}

			return data;
		}


		//如果sceneCfg中配置了npcnameRect 则用配置的，如果没有配置 使用默认的
		export function getNpcnameRect():{x:any,y:any,w:any,h:any}
		{	
			if (cfg["npcnameRect"])
			{
				return cfg["npcnameRect"];
			} else {
				return null;
			}
			
		}



		export function getSceneCfgBySceneName(sceneName:string,sceneId?:string):{posCfg:any,namePosCfg:any,reddotPosCfg?:any,shadowCfg?:any,npcMessageCfg?:any,guideNeedTouchCfg?:any,cheCfg?:any,buildBgCfg?:any,bubbleCfg?:any,personalityCfg?:any}
		{
			sceneName=App.StringUtil.firstCharToLower(sceneName);

			if (cfg[sceneName]["posCfg"])
			{	
				return cfg[sceneName];
			}
			else
			{	
				if (sceneId && cfg[sceneName][sceneId])
				{
					return cfg[sceneName][sceneId];
				}
				else
				{	
					let allKey = Object.keys(cfg[sceneName]);
					return cfg[sceneName][allKey[0]];
				}
			}		
		}

		export function getAllScene():string[]
		{
			let list:string[] = ["homeScene","cityScene","searchScene"];
			return list;
		}

		export function getSceneAllId(sceneName:string = "homeScene"):string[]
		{
			let list:string[] = [];
			let scfg = cfg[sceneName];
			for (var key in scfg) {
				if ((key== "101" && !PlatformManager.checkIsRuSp()) || (key== "201" && !PlatformManager.checkIsRuSp()) || key== "301" || Api.switchVoApi.checkIsSceneState(key))
				{	
					if (key == "203")
					{
						list.splice(0,0,key);
					}
					else
					{
						list.push(key);
					}
					
				}
			}
			return list;
		}

		export function isSceneMulti():boolean
		{
			if (cfg["homeScene"]["posCfg"])
			{	
				return false;
			}
			else
			{	
				let allKey = Object.keys(cfg["homeScene"]);
				return allKey.length>1;
			}	
		}

		export function getChangeKey():string
		{
			//暂时写成wife 后续可以走配置
			return `wife`;
		}

		export function getIsSceneScroll(sid:string):boolean
		{
			return sid == "205" || sid == "106";
		}
	}
}