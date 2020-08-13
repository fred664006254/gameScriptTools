namespace Config
{
	export namespace PromoteCfg
	{
		/**
		 * ---分封消耗 单位：元宝  首次分封是免费的，撤销分封是消耗元宝的
		 */
        export let promoteCost:number;
        
		/**
		 * 分封的官职限制 官职大于X才能被分封
		 */
		export let needLv:number;

		/**
		 *  --type  职位类型
            --effect1  国策1加成值  加法加成
            --effect2  国策2加成值  加法加成
            --effect3  国策3加成值  加法加成
            --effect4  国策4加成值  加法加成
		 */
        export let positionList:any;
        
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				PromoteCfg[key]=data[key];
			}
		}
	}

}