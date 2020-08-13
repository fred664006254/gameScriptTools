namespace Config
{
	export namespace AcCfg
	{
		export class TotalDayRechargeCfg 
		{
			private itemListCfg:Object={};
			private lastKey = null;
			public formatData(data:any):void
			{
				for(var key in data)
				{
					let itemCfg:TotalDayRechargeItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new TotalDayRechargeItemCfg();
					}
					itemCfg=this.itemListCfg[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.id=String(key);
					this.lastKey = key;
					
				}
			}
			public getList()
			{
				return this.itemListCfg;
			}
			/**
			 * 对最后一个奖励的处理
			 * @param id 当前的ID
			 * @param level 充值最后一天的ID
			 */
			public getRechargeItemById(id:string,level?:string):TotalDayRechargeItemCfg
			{
				if(level)
				{
					if(id == level)
					{
						this.itemListCfg[id].showGem = this.itemListCfg[this.lastKey].showGem;
						this.itemListCfg[id].reward = this.itemListCfg[this.lastKey].reward;
						return this.itemListCfg[id];
					}
					else if(Number(id) > Number(level))
					{
						return null;
					}
					else
					{
						return  this.itemListCfg[id];
					}
				}
				else
				{
					return this.itemListCfg[id];
				}
				
			}
		}

		export class TotalDayRechargeItemCfg extends BaseItemCfg
		{
			/**
			 * 档位
			 */
			public id:string;
			/**
			 * 需要充值的数值
			 */
			public showGem:number;

			/**
			 * 每一档对应奖励
			 */
			public reward:string;

			public needDay:number;
			public isSpecial:number;
		}
	}
}