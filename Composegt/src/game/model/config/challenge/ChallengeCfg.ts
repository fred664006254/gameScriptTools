/**
 * 关卡配置类
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeCfg
 */

namespace ChallengeCfg {

	let unlockCfg={};
    export function getChallengeCfgById(id:number):any
	{
		if(GameConfig.config.challengeCfg && GameConfig.config.challengeCfg[id.toString()])
		{
			return GameConfig.config.challengeCfg[id.toString()];
		}
		return null;
	}

	export function formatData(data:any):void
	{
		let keys=Object.keys(data);
		keys.sort((a,b)=>{return Number(a)-Number(b)});
		let l=keys.length;
		let personLimit=0;
		for(let i=0;i<l;i++)
		{
			let cid=Number(keys[i]);
			let itemCfg=getChallengeCfgById(cid);
			if(itemCfg.personLimit)
			{
				unlockCfg[itemCfg.personLimit]=cid;
				personLimit=itemCfg.personLimit;
			}
			else
			{
				itemCfg.personLimit=personLimit;
			}
		}
	}

	/**
	 * 关卡总数
	 */
	export function getChallengeTotalPass():number
	{
		return Object.keys(GameConfig.config.challengeCfg).length;
	}

	export function getCurMiddleLeftCfgList():any[]
	{
		let leftCfgList = [];
		let curId = Api.challengeVoApi.getCurChannelId();
		let middleId = Api.challengeVoApi.getCurMiddleChannelId();
		for (let i = 0; i < 10; i++) {
			let tmpCfg = GameConfig.config.challengeCfg[(curId+i).toString()];
			if(tmpCfg.type == 1 && Api.challengeVoApi.getMiddleChannelById((curId-1+i)) == middleId){
				leftCfgList.push(tmpCfg);
			}
		}
		// console.log(leftCfgList);
		return leftCfgList;

	}

	/**
	 * 根据关卡章节获取名字
	 * @param bid 
	 */
	export function getLocalStrByBigId(bid:string):string
	{
		return LanguageManager.getlocal("challengeTitle"+bid);
	}

}