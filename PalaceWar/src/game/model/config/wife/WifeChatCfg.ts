namespace Config
{
	/**
	 * 皮肤配置
	 */
	export namespace WifechatCfg 
	{
        /**每次重置每个剧情消耗*/
        export let resetCost : string = ``;
        /**红颜剧情，所有红颜用一套*/
		export let conversation : any = null;        

		export function formatData(data:any):void
		{
			for(var key in data)
			{
				this[key] = data[key];
			}
        }
    }
}