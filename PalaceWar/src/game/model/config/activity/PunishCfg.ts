namespace Config
{
	export namespace AcCfg
	{
		export class PunishCfg 
		{
			// private itemListCfg:Object={};
			/**
			 * 女囚血量
			 */
			public punishhp:any[];
			/**
			 * 女囚血量
			 */
			public Hp:number;
			/**
			 * 女囚击杀奖励
			 */
			public killReward:string;

			/**
			 * 道具列表
			 */
			public punishList:Object;

			/**
			 * 商店
			 */
			public shop:Object;

			/**
			 * 个人排行奖励
			 */
			public personRank:Object;

			/**
			 * 活动会有一天领取时间  单位：天
			 */
			public extraTime:number;

			/**
			 * 活动每天的开始，结束时间
			 */
			public activeTime:number[];
			public itemNum:number=0;
			/**
			 * 联盟排行奖励
			 * --reward1 盟主奖励
        		--reward2 成员奖励
			 */
			public allianceRank:Object;
			
			public changeReward:{string,number}[];

			/**
			 * 每次出拳消耗体力
			 */
			public needEnergy:number;
			/**
			 * 每天会赠送初始体力
			 */
			public iniEnergy:number;
			/**
			 * 转换道具数量 = (剩余体力 - iniEnergy) / needEnergy
			 */
			public exchange:string;
			/**
			 * 出拳伤害
			 */
			public atkList:Object;

			public formatData(data:any):void
			{
				if(data)
				{
					for(var key in data)
					{
						this[key]=data[key];
					}
				}
			}

			public getHp(day : number):number{
				let hp = 0;
				hp = this.Hp;
				// day = Math.min(this.punishhp[this.punishhp.length -1].day, day);
				// for(let i in this.punishhp){
				// 	let unit = this.punishhp[i];
				// 	if(unit.day == day || unit.day.indexOf(day) > -1){
				// 		hp = unit.Hp;
				// 		break; 
				// 	}
				// }
				return hp;
			}
		}
	}
}