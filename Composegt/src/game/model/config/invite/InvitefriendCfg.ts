namespace Config
{
    // 邀请有礼配置
	export namespace InvitefriendCfg 
	{
        // 权势
        export let friendPower:any;
        // 人数
        export let friendNum:any;
        // 充值
        export let friendRecharge:any;
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				this[key]=data[key];
			}
		}
    }
}