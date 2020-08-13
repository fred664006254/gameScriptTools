/**
 * 关卡配置类
 * author shaoliang
 * date 2017/10/23
 * @class ChallengestoryCfg
 */

namespace Config 
{
	export namespace ChallengestoryCfg
	{
		export function getChallengestoryCfgById(id:string):any
		{
			if(GameConfig.config.challengestoryCfg && GameConfig.config.challengestoryCfg[id])
			{
				return GameConfig.config.challengestoryCfg[id];
			}
			return null;
		}
	}
}