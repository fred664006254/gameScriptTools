namespace Config
{
	/**
	 * 寻访基础配置
	 */
	export namespace SearchbaseCfg 
	{
		/**
		 * 寻访解锁所需官职
		 */
		export let needLv:number;
		/**
		 * 每点体力回复所需时间（秒）
		 */
		export let needTime:number;
		/**
		 * 恢复体力的道具ID
		 */
		export let needItem:string;
		/**
		 * 一键寻访所需VIP等级
		 */
		export let needVip:number;
		
		/**
		 * 寻访运势上限
		 */
		export let luckMax:number;

		/**
		 * 资源最多可将运势增加到 X
		 */
		export let resAddMax:number;

		/**
		 * 每次寻访，消耗运势值
		 */
		export let luckCost:number;

		/**
		 * 每点运势恢复时间  单位：秒
		 */
		export let luckNeedTime:number;

		/**
		 * 资源增加运势的每日初始消耗，以及每次递增消耗
		 */
    	export let resCost:number;

		/**
		 * 资源恢复运势，每次增加值
		 */
		export let resAddLuck:number;

		/**
		 * 元宝恢复运势，每次增加值
		 */
		export let gemAddLuck:number;

		/**
		 * 不同运势下，对应元宝增加运势的消耗
		 * {low:运势下限   up:运势上限  gemCost:运势区间，对应元宝消耗}
		 */
		export let gemCostList:{low:number,up:number,gemCost:number}[];

		export function formatData(data:any):void
		{
			for(var key in data)
			{
				SearchbaseCfg[key]=data[key];
			}
		}

		export function getGemCostByLuck(curLuck:number):number
		{
			let gemCost:number=0;
			if(gemCostList)
			{
				for(let key in gemCostList)
				{
					if(gemCostList[key].low<=curLuck&&gemCostList[key].up>=curLuck)
					{
						gemCost=gemCostList[key].gemCost;
						break;
					}
				}
			}
			return gemCost;
		}
	}
}