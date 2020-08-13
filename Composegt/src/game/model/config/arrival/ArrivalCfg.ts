
namespace Config
{
	/**
	 * 签到配置类
	 * author dmj
	 * date 2017/11/04
	 * @class ArrivalCfg
	 */
	export namespace  ArrivalCfg 
	{
		let arrivaceList: Object = {};
		export function formatData(data: any): void 
		{
			for (var key in data.rewards) 
			{
				if (!arrivaceList.hasOwnProperty(String(key))) 
				{
					arrivaceList[String(key)] = data.rewards[key];
				}
			}
		}

		/**
		 * 根据索引获取奖励物品
		 * @param index 
		 */
		export function getContentByIndex(index:number):string
		{
			if(arrivaceList.hasOwnProperty(String(index)))
			{
				return arrivaceList[String(index)];
			}
			return "";
		}
	}
}