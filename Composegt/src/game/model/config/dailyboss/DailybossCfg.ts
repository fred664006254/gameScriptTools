namespace Config
{
	export namespace DailybossCfg 
	{

		/**
		 * [中午BOSS的开始时间,结束时间]
		 */
		export let boss1Time:[number,number];

		/**
		 * [晚上BOSS的开始,结束时间]
		 */
		export let boss2Time:[number,number];

		/**
		 * 恢复出战所需道具
		 */
		export let needItem:string;


		/**
		 * 中午BOSS的最大波数
		 */
		export let boss1MaxNum:number;

		/**
		 * 雁门关中午通关礼包
		 */
		export let clearReward:string;
		/**
		 * 中午BOSS 突厥来袭
		 */
		export let boss1:Object;

		/**
		 * 晚上BOSS
		 */
		let boss2:Object;

		/**
		 * 每日限购次数
		 */
		let shop:Object={};
		export let shopList:DailybossShopItemCfg[]=[];

		export function getShopItemById(id:string|number):DailybossShopItemCfg
		{
			return shop[id];
		}

		export function getShopByOpenTime():DailybossShopItemCfg[]
		{
			let shops:DailybossShopItemCfg[]=[];

			let splist = Config.DailybossCfg.shopList
			// let j=1
			for(let i:number=0;i<splist.length;i++)
            {
                let day = Math.ceil((GameData.serverTime - GameData.serverOpenTime)/86400) 
				if(day >= splist[i]["timeRange"][0]&&day<=splist[i]["timeRange"][1])
				{
					// splist[i].id = j+""
					shops.push(splist[i]);	
					// j++
				}
				
            }
			
			return shops;
		}

		export function getBossNameByType(type:string|number):string
		{
			return LanguageManager.getlocal("dailybossTitle"+type);
		}


		export function checkInBoss1Time(leftDayTime:number):boolean
		{
			let startTime:number=boss1Time[0]*App.DateUtil.hourSeconds;
			let endTime:number=boss1Time[1]*App.DateUtil.hourSeconds;
			if(leftDayTime>=startTime&&leftDayTime<=endTime)
			{
				return true;
			}
			return false;
		}

		export function checkInBoss2Time(leftDayTime:number):boolean
		{
			let startTime:number=boss2Time[0]*App.DateUtil.hourSeconds;
			let endTime:number=boss2Time[1]*App.DateUtil.hourSeconds;
			if(leftDayTime>=startTime&&leftDayTime<=endTime)
			{
				return true;
			}
			return false;
		}

		/**
		 * 返回boss战状态0等待开始状态,1开始,2结束等待下一轮
		 */
		export function getStatus(leftDayTime:number):number
		{
			let status:number=0;
			let start1Time:number=boss1Time[0]*App.DateUtil.hourSeconds;
			let end1Time:number=boss1Time[1]*App.DateUtil.hourSeconds;
			let start2Time:number=boss2Time[0]*App.DateUtil.hourSeconds;
			let end2Time:number=boss2Time[1]*App.DateUtil.hourSeconds;
			
			if(leftDayTime<start1Time)
			{
				status=0;
			}
			else if(leftDayTime>=start1Time&&leftDayTime<=end1Time)
			{
				status=1;
			}
			else if(leftDayTime>end1Time)
			{
				if(leftDayTime<start2Time)
				{
					status=0;
				}
				else if(leftDayTime>=start2Time&&leftDayTime<=end2Time)
				{
					status=1;
				}
				else if(leftDayTime>end2Time)
				{
					status=2;
				}
			}
			return status;
		}

		export function getInTimeStr(type:number):string
		{
			if(type==1)
			{
				return boss1Time[0]+":00-"+boss1Time[1]+":00";
			}
			else
			{
				return boss2Time[0]+":00-"+boss2Time[1]+":00";
			}
		}

		export function getNextStartLeftTime(leftDayTime:number):number
		{
			let status=getStatus(leftDayTime);
			let start1Time:number=boss1Time[0]*App.DateUtil.hourSeconds;
			let start2Time:number=boss2Time[0]*App.DateUtil.hourSeconds;
			if(status==0)
			{
				if(leftDayTime<start1Time)
				{
					return start1Time-leftDayTime;
				}
				else
				{
					return start2Time-leftDayTime;
				}
			}
			return 0;
		}

		export function getLeftTime(leftDayTime:number):number
		{
			let leftTime:number=0;
			if(checkInBoss1Time(leftDayTime))
			{
				let endTime:number=boss1Time[1]*App.DateUtil.hourSeconds;
				leftTime=endTime-leftDayTime;
			}
			else if(checkInBoss2Time(leftDayTime))
			{
				let endTime:number=boss2Time[1]*App.DateUtil.hourSeconds;
				leftTime=endTime-leftDayTime;
			}
			return leftTime;
		}

		export function formatData(data:any):void
		{
			for(var key in data)
			{
				if(key=="shop")
				{
					let shopData=data[key];
					for(let shopkey in shopData)
					{
						let dailyBossShopItemCfg:DailybossShopItemCfg=new DailybossShopItemCfg();
						dailyBossShopItemCfg.initData(shopData[shopkey]);
						dailyBossShopItemCfg.id=String(shopkey);
						shop[shopkey]=dailyBossShopItemCfg;
						shopList.push(dailyBossShopItemCfg);
					}
					shopList.sort((a,b)=>{
						return Number(a.id)-Number(b.id);
					});
				}
				else if(key=="boss1")
				{
					boss1=data[key];
				}
				else if(key=="boss2")
				{
					boss2=data[key];
				}
				else
				{
					if(!DailybossCfg[key])
					{
						DailybossCfg[key]=data[key];
					}
				}
				// boss1MaxNum = 3;
				
			}
		}

		export function formatDataByServer(data:any):void
		{
			for(var key in data)
			{
				DailybossCfg[key]=data[key];
			}
		}
	}

	/**
	 * boss商店
	 */
	export class DailybossShopItemCfg extends BaseItemCfg
	{
		/**
		 * 积分id
		 */
		public id:string;
		/**
		 * 每日限购次数
		 */
		public limit:number;

		/**
		 * 兑换商品所需积分  积分是递增的
		 */
		public needScore:number[];

		/**
		 * 物品内容
		 */
		public content:string;

		public get itemCfg():ItemItemCfg
		{
			return Config.ItemCfg.getItemCfgById(this.content.split("_")[1]);
		}

		public get name():string
		{
			return this.itemCfg.name;
		}

		public get iconContainer():BaseDisplayObjectContainer
		{
			return this.itemCfg.getIconContainer(true);
		}

		public getNeedScoreByNum(num:number):number
		{
			if(!num)
			{
				num=0
			}
			num=Math.max(0,Math.min(this.needScore.length-1,num));
			return this.needScore[num];
		}
	}
}