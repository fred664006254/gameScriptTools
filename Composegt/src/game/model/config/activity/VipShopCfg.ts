namespace Config
{
	export namespace AcCfg
	{

		export class VipShopCfg 
		{
			private itemListCfg:Object={};
			public formatData(data:any):void
			{
				for(var key in data)
				{
					let itemCfg:VipShopItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new VipShopItemCfg();
					}
					itemCfg=this.itemListCfg[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.id=String(key);
				}
			}
			public getList(sheetType:number):Array<VipShopItemCfg>
			{
				let arr:Array<VipShopItemCfg> = new Array();
				for(let key in this.itemListCfg)
				{
					if(sheetType == this.itemListCfg[key].sheetType)
					{
						arr.push(this.itemListCfg[key]);
					}
				}
				return arr;
				 
			}
			public getRechargeItemById(id:string)
			{
				return this.itemListCfg[id];
			}
		}

		export class VipShopItemCfg extends BaseItemCfg
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

			public sheetType:number;

			// --sheetType  类型  1.常规  2.门客  3：红颜
			// --sortId  显示顺序 
			// --needVip  购买所需Vip等级  达到VIP X 可购买
			// --buyNum  不同Vip等级可购买次数  对应VIP0--VIP11
			// --buyCost  购买的价格,每次购买，价格可能不相同  超过上限，取上限值
			// --content  内容和数量

		}	
	}
}