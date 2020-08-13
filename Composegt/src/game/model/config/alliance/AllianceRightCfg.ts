namespace Config {
	/**
	 * 联盟权限配置
	 * author dky
	 * date 2017/11/29
	 * @class AllianceRightCfg
	 */
	export namespace AllianceRightCfg {
		let itemList: Object = {};
		export function formatData(data: any): void {
			for (var key in data) {
				let itemCfg: AllianceRightItemCfg;
				if (!itemList.hasOwnProperty(String(key))) {
					itemList[String(key)] = new AllianceRightItemCfg();
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
		export function getRightCfgById(id: number|string): AllianceRightItemCfg {
			return itemList[String(id)];
		}

		
	}

	export class AllianceRightItemCfg extends BaseItemCfg {
		/**
		 * 权限id
		 */
		public id: string;
		/**
		 * 类型  修改公告&招募设置
		 */
		public recruit: number;
		/**
		 * 转移团长
		 */
		public turnBoss: number;
		/**
		 * 提升&解除副团长
		 */
		public manageDeputy: number;
		/**
		 * 提升&解除官员
		 */
		public manageOfficer: number;
		/**
		 * 被提升职务
		 */
		public promotion: number;
		/**
		 * 踢人
		 */
		public deletePerson: number;
		/**
		 * 招人（通过申请）
		 */
		public addPerson: number;
		/**
		 * 退出军团
		 */
		public quit: number;
		/**
		 * 解散军团
		 */
		public dissolve: number;
		/**
		 * 消耗联盟财富开BOSS
		 */
		public bossCostAsset: number;
		/**
		 * 消耗元宝开BOSS
		 */
		public bossCostGem: number;


		
	}

}