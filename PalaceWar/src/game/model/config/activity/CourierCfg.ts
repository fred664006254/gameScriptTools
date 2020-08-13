namespace Config
{
	export namespace AcCfg
	{
		export class CourierCfg
		{
			public maxGem:number = 500;
			public extraTime:number = 0;
			private itemListCfg:Object={};
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					let itemCfg:AcCourierItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new AcCourierItemCfg();
					}
					itemCfg=this.itemListCfg[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.id=String(key);
				}
				if (data.extraTime)
				{
					this.extraTime = data.extraTime;
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

		export class AcCourierItemCfg extends BaseItemCfg
		{ 
        	public id:string; 
		}
		 
	}
}