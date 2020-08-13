namespace Config
{
	export namespace ShopnewCfg
	{
		let shopItemList: Array<ShopItemCfg> = [];
		export function formatData(data: any): void 
		{
			for (var key in data) 
			{ 
				let shopItemCfg = new ShopItemCfg(); 
				shopItemCfg = data[key]; 
				shopItemList.push(shopItemCfg); 
			}
		}

		export function getNewShopArr():Array<ShopItemCfg> 
		{
			var maxVip =  Config.VipCfg.getMaxLevel();
			var obj1:any = shopItemList[0];
			var buyNumLength = obj1.buyNum.length;
			if(buyNumLength<maxVip)
			{
				for(var i:number=0;i<shopItemList.length; i++)
				{
					var obj:any = shopItemList[i];
					for(var j:number=0;j<=maxVip;j++)
					{
						if(obj.buyNum)
						{
							var lastNum = obj.buyNum[obj.buyNum.length-1];
							if(j>=buyNumLength&&j<=maxVip-1)
							{ 
								obj.buyNum[j] = lastNum;
							} 
						} 
					
					}  
				}
				return shopItemList;
			} 
		
			return shopItemList;
		}
		/**
		 * 通过商品id获取单个商品配置
		 * @param id 商品id
		 */
		export function getnewShopItemCfgById(id: number): ShopItemCfg 
		{
			for(var i:number=0;i<shopItemList.length;i++)
			{
				if(shopItemList[i].sortId==id)
				{
					return shopItemList[i];
				}
			} 
		}
	}
}
