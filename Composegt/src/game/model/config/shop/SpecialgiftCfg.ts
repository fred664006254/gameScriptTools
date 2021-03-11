namespace Config
{
	/**
	 * 商店特殊礼包配置
	 * author dmj
	 * date 2018/9/27
	 * @class SpecialGiftCfg
	 */
	export namespace SpecialgiftCfg 
	{
		//检查购买物品的时候是否需要弹出消费提示框的元宝阈值
		//大于等于这个值 显示消费提示框
		// export let buyItemCheckVal = 1000;

		let shopItemList: Object = {};
		export function formatData(data: any): void 
		{
			for (var key in data) 
			{
				
				if (!shopItemList.hasOwnProperty(String(key))) 
				{
					
					let shopItemCfg: ShopItemCfg = new ShopItemCfg();
					
					shopItemCfg.initData(data[key]);
					shopItemCfg.id = Number(key);
					shopItemCfg.isSpecial = true;
					shopItemList[String(key)] = shopItemCfg;
				}

				// let innerData =  data[key];
				// for (var key2 in innerData ) {
				// 	let shopItemCfg: ShopItemCfg = shopItemList[String(key)][key2];
				// 	if(!shopItemCfg)
				// 	{
				// 		shopItemCfg = new ShopItemCfg();
				// 		shopItemList[String(key)][key2] = shopItemCfg;
				// 	}
				// 	shopItemCfg.initData(innerData[key2]);
				// 	shopItemCfg.id = Number(key2);
				// }
			}
			
		}
		/**
		 * 通过商品id获取单个商品配置
		 * @param id 商品id
		 */
		export function getShopItemCfgById(id: number): ShopItemCfg 
		{
			return shopItemList[String(id)];
		}
		/**
		 * 获取类型获取页签配置
		 * @param sheetType 
		 */
		export function getShopItemCfgList():Array<ShopItemCfg>
		{
			let arr:Array<ShopItemCfg> = new Array();
			let isMerged = Api.mergeServerVoApi.isInMergeZone();
			// let mergetimes = Api.shopVoApi.getMergeTimes();
			let opentime = Api.shopVoApi.getOpenTimes();
			if(isMerged){
				opentime = Api.shopVoApi.getMergeTimes();
			}
			for(let key in shopItemList)
			{
				let tmpItem:ShopItemCfg = shopItemList[key];
				//和服
				if( (tmpItem.isMergezone == 1 && !isMerged ) || (tmpItem.isMergezone == 0 && isMerged)){
					continue;
				} 
				if(tmpItem.startTime >= 0 && tmpItem.endTime > 0){
					let deltaSecs = GameData.serverTime - opentime;
					if(opentime && deltaSecs >= (tmpItem.startTime-1) * 86400 && deltaSecs <= tmpItem.endTime * 86400){
						arr.push( tmpItem);
					}
				}else{
					arr.push( tmpItem);
				}
			}
			return arr;
		}
	}
}