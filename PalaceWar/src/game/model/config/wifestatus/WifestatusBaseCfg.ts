namespace Config
{
	/**
	 * --册封基础信息配置
	 */
	export namespace WifestatusbaseCfg 
	{
		/**
		 *  --每个星星等效于 所有子嗣培养属性增加 X%，此处的0.1是0.1%
		 * starEffect
		 */
		export let starEffect:number;
		//--解锁一键册封所需VIP等级
		export let needVip:number;

		
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				WifestatusbaseCfg[key]=data[key];
			}
		}
	}
}