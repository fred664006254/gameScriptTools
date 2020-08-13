namespace Config {
	export namespace ExileCfg {
		/**
		 * --解锁门客数量
		 */
		export let numNeed: number = 0;
		/**
		 * --出海后门客需大于。否则出海失败
		 */
		export let servantNeed: number = 0;
		/**
		 * --出海时间。单位：天
		 */
		export let exileTime: number = 0;
		/**
		 * --提前召回费用。天数*单位元宝
		 */
		export let unitGem: number = 0;
		/**
		 * --出海席位info
		 */
		export let exileSeatItemCfgList: ExileSeatItemCfg[] = [];

		export let buff1: ExileBuffsItemCfg[] = [];
		export let buff2: any;

		export let changeBuffCost: number = 0;
		/**
		 * --流放卡最多同时使用个数
		 */
		export let maxPos: number = 0;

		/**
		 * 解析数据
		 */
		export function formatData(data: any): void {
			exileSeatItemCfgList.length = 0;
			numNeed = data.numNeed;
			servantNeed = data.servantNeed;
			exileTime = data.exileTime;
			unitGem = data.unitGem;
			changeBuffCost = data.changeCost;
			maxPos = data.maxPos;

			for (let key in data.seat) {
				let itemcfg = new ExileSeatItemCfg();
				itemcfg.initData(data.seat[key])
				itemcfg.id = String(key);
				exileSeatItemCfgList.push(itemcfg);
			}

			for (let key in data.buff1) {
				let itemcfg = new ExileBuffsItemCfg();
				itemcfg.initData(data.buff1[key])
				itemcfg.id = String(key);
				buff1.push(itemcfg);
			}

			// for (let key in data.buff2) {
			// 	let itemcfg = new ExileBuffsItemCfg();
			// 	itemcfg.initData(data.buff2[key])
			// 	itemcfg.id = String(key);
			// 	buff2.push(itemcfg);
			// }
			this.buff2 = data.buff2;
		}
		/**
		 * 下一个解锁席位的信息
		 */
		export function getNextSeat(id: string): ExileSeatItemCfg {
			for (let key in exileSeatItemCfgList) {
				if (exileSeatItemCfgList[key].id == id) {
					return exileSeatItemCfgList[key]
				}
			}
		}

	}
	/**席位item */
	export class ExileSeatItemCfg extends BaseItemCfg {
		/**
		 * 席位的id
		 */
		public id: string;
		/**
		 * 初始席位    1-是，0-否
		 */
		public initial: any;
		/**
		 * 解锁花费元宝数
		 */
		public unlockGem: string;

	}

	/**buff item */
	export class ExileBuffsItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: string;
		/**
		 * 生效玩法   1本服擂台  2跨服擂台  3绝地擂台
		 */
		public playType: any;
		/**
		 * 攻击增加基础值  s
		 */
		public atkBase: number;
		/**
		 * 攻击增加系数
		 */
		public atkRatio: number;
		/**
		 * 血量增加基础值
		 */
		public hpBase: number;
		/**
		 * 血量增加系数
		 */
		public hpRatio: number;

		/**
		 * 攻击增加百分比
		 */
		public atkAdd1: number;
		/**
		 * 攻击增加百分比
		 */
		public atkAdd2: number;
		/**
		 * 出海门客数量
		 */
		public exileNum: number;

	}
}