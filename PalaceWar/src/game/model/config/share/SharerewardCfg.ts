namespace Config
{
    /** 分享奖励配置 */
	export namespace SharerewardCfg 
	{
        /** 每日最大分享奖励的领取次数 */
		export let maxReward:number;
        /** 分享奖励 */
        export let shareReward:string;
        export let shareList:any;
		export function formatData(data:any):void
		{
			for(var key in data)
			{
                this[key] = data[key];
			}
		}
	}
}