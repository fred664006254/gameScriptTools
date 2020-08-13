namespace Config
{
	export namespace ManageCfg
	{

		/**
		 * --一键经营所需官职  levelCfg中的等级  正五品
		 */
		export let autoNeedLv:number;
		/**
		 * 最大的恢复时间 单位：秒
		 */
		let maxTime:number;

		/**
		 * 恢复1次经营所需道具
		 */
		export let needItem:string;

		/**
		 * 解锁自动经营所需官职  levelCfg中的等级 
		 */
		export let needLv:number;

		/**
		 * 解锁自动经营所需Vip等级
		 */
		export let needVip:number;

		/**
		 * 招募1个士兵需要的粮草数量
		 */
		export let needFood:number;

		/**
		 * 非挂机，点击收获的暴击几率与倍率   {几率，倍率}
		 */
		export let getCrit:number[];

		export let supplyManNum:number =0;
    	//物资商人每天购买基础值
    	export let supplyManBase:number=0;
  
		export let supplyMan:{needGem:number,limit:number,effect:number}[] = [];

		export function formatData(data:any):void
		{
			for(var key in data)
			{
				ManageCfg[key]=data[key];
			}
		}

		/**
		 * 获取经营恢复速率
		 * @param value 为所有智力+所有政治+所有魅力之和
		 */
		export function getManageNeedTime(value:number):number
		{
			let calculateTime:number = Math.floor(value/3/10000*60+60);
			let minNeedTime:number = Math.min(calculateTime,maxTime);
			return minNeedTime;
		}
	}

}