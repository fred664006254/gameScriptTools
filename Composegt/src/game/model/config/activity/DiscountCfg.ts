namespace Config
{
	export namespace AcCfg
	{
		export class DiscountCfg 
		{
			
			public vipList:Object={};
			public formatData(data:any):void
			{				
				for(var key in data)
				{
					let itemCfg:DiscountItemCfg;
					if(!this.vipList.hasOwnProperty(String(key)))
					{
						this.vipList[String(key)]=new DiscountItemCfg();
					}
					itemCfg=this.vipList[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.level=Number(key);
				}
			}
		}
		export class DiscountItemCfg 
		{
			/**
			 * vip等级
			 */
			public level:number;
			/**
			 * 所需充值额度  单位是元宝数量
			 */
			public needGem:number;
			public initData(data) {
				this.needGem = data.needGem;
			}
		}

	}
}