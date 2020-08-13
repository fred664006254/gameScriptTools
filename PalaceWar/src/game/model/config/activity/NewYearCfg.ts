namespace Config
{
	export namespace AcCfg
	{
		export class NewYearCfg 
		{
			public maxGem:number = 500;
			private itemListCfg:Object={};
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					let itemCfg:AcNewYearItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new AcNewYearItemCfg();
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

		export class AcNewYearItemCfg extends BaseItemCfg
		{ 
        	public id:string; 
		}
		 
	}
}