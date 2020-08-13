namespace Config
{
	/**
	 * 玩吧Vip特权礼包配置
	 */
	export namespace WanbagamegiftCfg 
	{
		let cfg:{[key:string]:{reward:string, limit:number}} = {};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
                cfg[key] = data[key];
			}
		}
		/** 获取vip特权礼包奖励 */
		export function getVipReward(vipLevel) : {reward:string, limit:number} {
			return cfg[vipLevel];
		}
    }
}