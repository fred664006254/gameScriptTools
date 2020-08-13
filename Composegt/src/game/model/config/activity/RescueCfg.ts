namespace Config
{
	export namespace AcCfg
	{
		export class RescueCfg 
		{
			// private itemListCfg:Object={};
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
			 * 阶段奖励
			 */
			public interimReward:{interim:number,reward:string}[];

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

			/**
			 * 每日充值x元宝获得道具：佛跳墙
			 */
			public rechangeReward:Object;
			
			public changeReward:{string,number}[];
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

		}


	}
}