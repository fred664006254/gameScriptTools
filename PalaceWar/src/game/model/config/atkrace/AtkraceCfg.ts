

namespace Config {
	/**
	 * 擂台配置
	 */
	export namespace AtkraceCfg {
		/**
		 * 解锁条件  拥有 X 个门客
		 */
		let unlock: number;

		/**
		 * 门客等级
		 */
		let servantLv: number;


		let dailyNum: number;

		/**
		 * 每次间隔时间 单位（秒）
		 */
		let intervalTime: number;

		/**
		 * 出使消耗道具
		 */
		let fightAdd: string;

		/**
		 * 复仇消耗道具
		 */
		let revenge: string;

		/**
		 * 挑战消耗道具
		 */
		let challenge: string;

		/**
		 * 追杀消耗道具 暂用道具
		 */
		let hunt: string;

		/**
		 * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
		 */
		let parameter1: number;
		let parameter3: number;

		let iniAtt: Object;
		let juniorAtt: Object;
		let mediumAtt: Object;
		let seniorAtt: Object;

		//门客名望分阶
		let atkraceFameListCfg: AtkraceFameItemCfg[] = [];
		export let reputation1: number = 0;
		export let reputation2: number = 0;
		export let reputation3: number = 0;
		export let reputation4: number = 0;
		export let reputation5: number = 0;

		export function formatData(data: any): void {
			unlock = data.unlock;
			servantLv = data.servantLv;
			dailyNum = data.dailyNum;
			intervalTime = data.intervalTime;
			fightAdd = data.fightAdd;
			revenge = data.revenge;
			challenge = data.challenge;
			hunt = data.hunt;
			parameter1 = data.parameter1;
			parameter3 = data.parameter3;

			iniAtt = data.iniAtt;
			juniorAtt = data.juniorAtt;
			mediumAtt = data.mediumAtt;
			seniorAtt = data.seniorAtt;
			reputation1 = data.reputation1;
			reputation2 = data.reputation2;
			reputation3 = data.reputation3;
			reputation4 = data.reputation4;
			reputation5 = data.reputation5;
			if (data.reputation) {
				for (var key in data.reputation) {
					let itemCfg: AtkraceFameItemCfg = new AtkraceFameItemCfg();
					itemCfg.initData(data.reputation[key]);
					itemCfg.id = String(key);
					atkraceFameListCfg.push(itemCfg);

				}
				atkraceFameListCfg.reverse();
			}
		}
		/**
		 * 每日武馆次数
		 */
		export function getDailyNum(): number {
			return dailyNum;
		}

		/**
		 * 额外出战系数
		 */
		export function getParameter1(): number {
			return parameter1;
		}

		/**
		 * 门客等级限制
		 */
		export function getServantLv(): number {
			return servantLv;
		}

		/**
		 * 每次间隔时间 单位（秒）
		 */
		export function getIntervalTime(): number {
			return intervalTime;
		}

		/**
		 * 解锁条件  拥有 X 个门客
		 */
		export function getUnlock(): number {
			return unlock;
		}

		/**
		 * 初始属性
		 */
		export function getInitAtt(key: string): Object {
			return iniAtt[key];
		}
		/**
		 * 初级属性
		 */
		export function getJuniorAtt(key: string): Object {
			return juniorAtt[key];
		}
		/**
		 * 中级属性
		 */
		export function getMediumAtt(key: string): Object {
			return mediumAtt[key];
		}
		/**
		 * 高级属性
		 */
		export function getSeniorAtt(key: string): Object {
			return seniorAtt[key];
		}

		export function getFightAdd(): string {
			return fightAdd;
		}
		/**
		 * 上榜条件 击败多少名
		 */
		export function getbeatNum(): number {
			return parameter3;
		}

		export function getFameList(): Array<any> {
			return atkraceFameListCfg;
		}
		export function getFameCfgBylevel(fameLv: number | string): AtkraceFameItemCfg {
			let fameCfg: AtkraceFameItemCfg = null
			atkraceFameListCfg.forEach(element => {
				if (element.id == String(fameLv)) {
					fameCfg = element;
				}
			});
			return fameCfg;
		}
		export function getNeedFameBylevel(fameLv: number | string): number {
			fameLv = (Number(fameLv) + 1) > atkraceFameListCfg.length ? atkraceFameListCfg.length : (Number(fameLv) + 1);
			let needFame = getFameCfgBylevel(fameLv).expNeed;
			return needFame;
		}

		export function getMaxFamelevel(): number {
			return atkraceFameListCfg.length;
		}

		export class AtkraceFameItemCfg extends BaseItemCfg {
			/**
			 * 门客名望iD
			 */
			public id: string;
			/**
			 * expNeed  需要X声望达到当前低等级，每一级不清空，是累计值
			 */
			public expNeed: number;

			/**
			 * att1Type  擂台攻击力增加  1：固定值  2：百分比
			 */
			public att1Type: number;
			/**
			 * att1 擂台/跨服擂台/绝地擂台攻击力增加，全体门客  擂台攻击力 = （门客攻击力+功勋固定值求和）*(1 + 功勋百分比求和) + 神器攻击力
			 */
			public att1: number;
			/**
			 * att2  暴击伤害增加，全体门客    暴击伤害 = 门客技能的暴击伤害 + 功勋的暴击伤害和
			 */
			public att2: number;
			/**
			 * att3  增加门客自身总属性，单门客
			 */
			public att3: number;


			public constructor() {
				super();
			}
		}

	}
}
