
namespace Config {

    export namespace PrestigeCfg
	{	
        let itemList: Object = {};

        export function formatData(data: any): void {
			for (var key in data) {
				let itemCfg: AllianceRightItemCfg;
				if (!itemList.hasOwnProperty(String(key))) {
					itemList[String(key)] = new PrestigeItemCfg();
				}
				itemCfg = itemList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = String(key);
			}
		}
		/**
		 * 通过职位获取单个权限配置
		 * @param id 权限id
		 */
		export function getPrestigeCfgById(id: number|string): PrestigeItemCfg {
			return itemList[String(id)];
		}
    }

    export class PrestigeItemCfg extends BaseItemCfg {
        /**
		 * 声望id
		 */
		public id: string;
		/**
		 * 达到这个进度所需要的名望
		 */
		public prestige: number;
		/**
		 * 是否具备称帝资格竞拍的资格  1：可参与竞拍  0：不可参与
		 */
		public canEmperor: number;
        /**
		 * 达到进度的奖励
		 */
		public getReward: string;
    }
}


