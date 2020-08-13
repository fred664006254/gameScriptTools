namespace Config
{
	export namespace DailyluckCfg 
	{
		let dailyLuckList:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:DailyluckItemCfg;
				if(!dailyLuckList.hasOwnProperty(String(key)))
				{
					dailyLuckList[String(key)]=new DailyluckItemCfg();
					
				}
				itemCfg=dailyLuckList[String(key)];
				itemCfg.rate = data[key][0];
				itemCfg.times = data[key][1];
				itemCfg.name=String(key);
			}
		}

		export function getManageTimes():number
		{
			return getDailylucyCfgByName("manage").times;
		}
		export function getDailylucyCfgByName(name:string):DailyluckItemCfg
		{
			return dailyLuckList[name];
		}
		export function getLuckIdList():DailyluckItemCfg[]
		{	
			let dailyLuckArray:DailyluckItemCfg[] = [];
			for(var key in dailyLuckList)
			{
				dailyLuckArray.push(dailyLuckList[key]);
			} 
			return dailyLuckArray;
		}
	}

	class DailyluckItemCfg extends BaseItemCfg
	{
		/**
		 * 几率
		 */
		public rate:number;
	
		public name:string;
		/**
		 * 倍数
		 */
		public times:number;
		
	}
}