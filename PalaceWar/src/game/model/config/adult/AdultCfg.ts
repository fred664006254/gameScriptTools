namespace Config {
	/**
	 * 成年子嗣配置类
	 * author dky
	 * date 2017/10/30
	 * @class AdultCfg
	 */
	export namespace AdultCfg {

		/**
		 * --提亲的持续时间 单位：秒
		 */
		export let lastTime:number;

		/**
		 * --刷新消耗  消耗元宝
		 */
		export let freshGem:number;

		let itemList: Object = {};
		export function formatData(data: any): void {
			for (var key in data.adultQuality) {
				let itemCfg: AdultItemCfg;
				if (!itemList.hasOwnProperty(String(key))) {
					itemList[String(key)] = new AdultItemCfg();
				}
				itemCfg = itemList[String(key)];
				itemCfg.initData(data.adultQuality[key]);
			}
			this.lastTime = data.lastTime;
			this.freshGem = data.freshGem;
		}
		/**
		 * 通过子嗣品质获取单个子嗣配置
		 * @param id 道具id
		 */
		export function getItemCfgById(id: number): AdultItemCfg {
			return itemList[String(id)];
		}

		
	}

	export class AdultItemCfg extends BaseItemCfg {
		/**
		 * 子嗣成年后身份   1:童生 2:秀才 3:举人 4：进士 5：探花 6：榜眼 7：状元
		 */
		public quality: number;
		/**
		 * needGem：联姻所需元宝
		 */
		public needGem: number;
		/**
		 * 联姻所需的道具   道具和元宝二选一
		 */
		public needItem: string;
		/**
		 * 自己取消提亲返还的元宝数  道具直接返还，元宝返还部分
		 */
		public returnGem: number;
		/**
		 * 对应属性
		*/
		public lower : number;
		public upper : number;
		
		
	}

}