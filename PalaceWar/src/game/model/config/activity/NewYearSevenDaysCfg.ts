namespace Config
{
	export namespace AcCfg
	{
		export class NewYearSevenDaysCfg 
		{
			public maxGem:number = 500;
			public extraTime:number = 1;
			public itemListCfg:any={};
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					let itemCfg:AcNewYearSevenDaysItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new AcNewYearSevenDaysItemCfg();
					}
					itemCfg=this.itemListCfg[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.id=String(key);
				}
			}
			// public getList(sheetType:number):Array<VipShopItemCfg>
			// {
			// 	let arr:Array<VipShopItemCfg> = new Array();
			// 	for(let key in this.itemListCfg)
			// 	{
			// 		if(sheetType == this.itemListCfg[key].sheetType)
			// 		{
			// 			arr.push(this.itemListCfg[key]);
			// 		}
			// 	}
			// 	return arr; 
			// }
			
			public getRechargeItemById(id:string)
			{
				return this.itemListCfg[id];
			}
		}

		export class AcNewYearSevenDaysItemCfg extends BaseItemCfg
		{ 
			public id:string; 
		}
		 
	}
}