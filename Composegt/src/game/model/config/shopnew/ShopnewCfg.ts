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
