namespace Config
{
	export namespace AcCfg
	{
		export class CarnivalChargeCfg 
		{
			private itemListCfg:Object={};
			public formatData(data:any):void
			{
				for(var key in data)
				{
					let itemCfg:CarnivalChargeItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new CarnivalChargeItemCfg();
					}
					itemCfg=this.itemListCfg[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.id=String(key);
				}
			}
			public getList()
			{
				return this.itemListCfg;
			}
			public getRechargeItemById(id:string)
			{
				return this.itemListCfg[id];
			}
		}

		export class CarnivalChargeItemCfg extends BaseItemCfg
		{
			/**
			 * 档位
			 */
			public id:string;
			/**
			 * 需要充值的数值
			 */
			public needGem:number;

			/**
			 * 每一档对应奖励
			 */
			public reward:string;
            //是否是特殊
			public isSpecial:number;
		}
	}
}