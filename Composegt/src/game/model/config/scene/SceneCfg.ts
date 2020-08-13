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
			cfg=data;
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

		export function getSceneCfgBySceneName(sceneName:string):{posCfg:any,namePosCfg:any,reddotPosCfg?:any,shadowCfg?:any,npcMessageCfg?:any,guideNeedTouchCfg?:any,cheCfg?:any,buildBgCfg?:any,bubbleCfg?:any}
		{
			sceneName=App.StringUtil.firstCharToLower(sceneName);
			if (sceneName == "cityScene" && Api.switchVoApi.checkScrollCityScene()) {
				return cfg["cityScene_scroll"];
			} else {
				return cfg[sceneName];
			}
		}
	}
}