namespace Config {
	/**
	 * 道具配置类
	 * author dmj
	 * date 2017/9/25
	 * @class ItemCfg
	 */
	export namespace ItemdropCfg {
		let itemdrapList: Object = {};
		export function formatData(data: any): void {
			for (var key in data) {
				let itemCfg: ItemDropItemCfg;
				if (!itemdrapList.hasOwnProperty(String(key))) {
					itemdrapList[String(key)] = new ItemDropItemCfg();
				}
				itemCfg = itemdrapList[String(key)];
				itemCfg.initData(data[key]);
		 
			}
		}
		/**
		 * 通过道具id获取单个道具配置
		 * @param id 道具id
		 */
		export function getItemCfgById(id: number|string): ItemDropItemCfg {
			return itemdrapList[String(id)];
		}

		
	}  
	export class ItemDropItemCfg extends BaseItemCfg 
	{
		 public id: string;
	}
}

 