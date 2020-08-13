/**
 * 关卡配置类
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeCfg
 */

namespace ChallengeCfg {

    export function getChallengeCfgById(id:number):any
	{
		if(GameConfig.config.challengeCfg && GameConfig.config.challengeCfg[id.toString()])
		{
			return GameConfig.config.challengeCfg[id.toString()];
		}
		return null;
	}

	/**
	 * 关卡总数
	 */
	export function getChallengeTotalPass():number
	{	
		let opened = Api.switchVoApi.getChallengeOpen();
		if (opened > 0)
		{
			return opened * 41;
		}
		else
		{
			return Object.keys(GameConfig.config.challengeCfg).length;
		}
		
	}

	export function getMaxStoryBigId():number
	{	
		let bigId:number = 0;
		let hasStory:boolean = false;

		do {
			bigId++;
			hasStory = false;
			let startIdx:number = 1 + (bigId-1)*41;
			let endIdx:number = bigId * 41;
			for (let i=startIdx; i<=endIdx; i++)
			{
				let cfg = getChallengeCfgById(i);
				if (cfg.dialogue)
				{
					hasStory = true;
					break;
				}
			}
		}
		while (hasStory)

		let opened = Api.switchVoApi.getChallengeOpen();
		if (opened>0 && bigId>opened)
		{
			bigId = opened;
		}

		return bigId;
	}

}