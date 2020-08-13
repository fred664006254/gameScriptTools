namespace Config
{
	export namespace MasterCfg
    {
        /**
		 * 官职限制，官职达到 X 品及以上玩家，才能使用小师爷功能
		 */
		export let levelLimit:number = 0;
		 /**
		 * 使用间隔（单位：秒）
		 */
		export let turnTime:number = 0;


        export function formatData(data:any):void
		{
			for(var key in data)
			{
				MasterCfg[key]=data[key];
			}
		}
    }
}