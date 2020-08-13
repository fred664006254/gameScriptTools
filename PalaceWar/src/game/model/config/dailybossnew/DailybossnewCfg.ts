namespace Config
{
	export namespace DailybossnewCfg 
	{
        /**
		 * [晚上BOSS的开始,结束时间]
		 */
		export let boss2Time:[number,number];

        /**
		 * 晚上BOSS
		 */
		export let boss2:Object = {};
        /**
		 * 每日限购次数
		 */
        export let shopList:Object={};

        export function getShopList():DailybossnewShopItemCfg[]
		{
			let shoptemp:DailybossnewShopItemCfg[] = [];
			for (let k in shopList)
			{
				if (shopList[k] && shopList[k].levelNeed <= Api.playerVoApi.getPlayerLevel())
				{	
					if (shopList[k].getReward == "6_1740_1")
					{
						if (Api.switchVoApi.checkOpenServantLevel450())
						{
							shoptemp.push(shopList[k]);
						}
					}
					else
					{
						shoptemp.push(shopList[k]);
					}
				}
			}

			return shoptemp;
		}


		export function getShopItemById(id:string|number):DailybossnewShopItemCfg
		{
			return shopList[id];
		}

		export function getBossNameByType(type:string|number):string
		{
			return LanguageManager.getlocal("dailybossTitleNew");
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
			let start1Time:number=boss2Time[0]*App.DateUtil.hourSeconds;
			let end1Time:number=boss2Time[1]*App.DateUtil.hourSeconds;
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

		/**
		 * 返回boss战状态0等待开始状态,1开始,2结束等待下一轮
		 */
		export function getStatusByName(leftDayTime:number,name:string):number
		{
			let status:number=0;

			let startTime:number;
			let endTime:number;

			startTime= boss2Time[0]*App.DateUtil.hourSeconds;
			endTime=boss2Time[1]*App.DateUtil.hourSeconds;

			if(leftDayTime>=startTime&&leftDayTime<=endTime)
			{
				status=1;
			}


			return status;
		}

		export function getInTimeStr(type:number):string
		{
			var boos1Time  =  App.DateUtil.formatSvrHourByLocalTimeZone(boss2Time[0]).hour; 
			var boos1Time2  =  App.DateUtil.formatSvrHourByLocalTimeZone(boss2Time[1]).hour;   
			var boos2Time  =  App.DateUtil.formatSvrHourByLocalTimeZone(boss2Time[0]).hour; 
			var boos2Time2  =  App.DateUtil.formatSvrHourByLocalTimeZone(boss2Time[1]).hour;   
			if(type==1)
			{
				if (boos1Time2 == 0)
				{
					boos1Time2 = 24;
				}
				return boos1Time+":00-"+boos1Time2+":00";
			}
			else
			{
				if (boos2Time2 == 0)
				{
					boos2Time2 = 24;
				}
				return boos2Time+":00-"+boos2Time2+":00";
			}
		}

		export function getNextStartLeftTime(leftDayTime:number):number
		{
			let status=getStatus(leftDayTime);
			let start1Time:number=boss2Time[0]*App.DateUtil.hourSeconds;
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
		
		export function getEndTimeByName(leftDayTime:number,name:string):number
		{
			let endTime:number;
			if (name == "boss1")
			{
				endTime=boss2Time[1]*App.DateUtil.hourSeconds;
			}
			else
			{
				endTime=boss2Time[1]*App.DateUtil.hourSeconds;
			}

			return endTime - leftDayTime;
		}

		export function getNextStartLeftTimeByName(leftDayTime:number,name:string):number
		{
			let status=getStatusByName(leftDayTime,name);
			let startTime:number;
			if (name == "boss1")
			{
				startTime=boss2Time[0]*App.DateUtil.hourSeconds;
			}
			else
			{
				startTime=boss2Time[0]*App.DateUtil.hourSeconds;
			}

			if(status==0)
			{
				if(leftDayTime<startTime)
				{
					return startTime-leftDayTime;
				}
				else
				{
					return startTime-leftDayTime + 86400;
				}
			}
			return 0;
		}

		export function getLeftTime(leftDayTime:number):number
		{
			let leftTime:number=0;
			let endTime:number=boss2Time[1]*App.DateUtil.hourSeconds;
			leftTime=endTime-leftDayTime;
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
						let dailyBossShopItemCfg:DailybossnewShopItemCfg=new DailybossnewShopItemCfg();
						dailyBossShopItemCfg.initData(shopData[shopkey]);
						dailyBossShopItemCfg.id=Number(shopkey)+1;
						shopList[dailyBossShopItemCfg.id] = dailyBossShopItemCfg;
					}
					
				}
				else if(key=="boss2")
				{	
					boss2=data[key];
				}
				else if(key=="boss2Time")
				{
					boss2Time=data[key];
				}
				else
				{
					if(!DailybossCfg[key])
					{
						DailybossCfg[key]=data[key];
					}
				}
			}
		}
    }


	/**
	 * 排名奖励
	 */
	export class DailybossnewAwardCfg extends BaseItemCfg
	{
		public id:string;
		public rank:number[];
		public getReward:string;
	}



    /**
	 * boss商店
	 */
	export class DailybossnewShopItemCfg extends BaseItemCfg
	{
		/**
		 * 积分id
		 */
		public id:number;
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
		public getReward:string;

		public levelNeed:number = 0;

		public get itemCfg():ItemItemCfg
		{
			return ItemCfg.getItemCfgById(this.getReward.split("_")[1]);
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