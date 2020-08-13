namespace Config
{
	export namespace DailytaskCfg 
	{
		let dailyTaskList:Object={};
        let dailyRewardsList:Object={};
		export function formatData(data:any):void
		{
			for(var key in data.task)
			{
				let itemCfg:DailytaskItemCfg;
				if(!dailyTaskList.hasOwnProperty(String(key)))
				{
					dailyTaskList[String(key)]=new DailytaskItemCfg();
				}
				itemCfg=dailyTaskList[String(key)];
				itemCfg.initData(data.task[key]);
				itemCfg.taskId=String(key);
			}

            for(var key in data.rewards)
			{
				let itemCfg:DailyRewardsItemCfg;
				if(!dailyRewardsList.hasOwnProperty(String(key)))
				{
					dailyRewardsList[String(key)]=new DailyRewardsItemCfg();
				}
				itemCfg=dailyRewardsList[String(key)];
				itemCfg.initData(data.rewards[key]);
				itemCfg.id=String(key);
			}
		}
		export function getDailytaskCfgByTaskId(taskId:string)
		{
			return dailyTaskList[taskId];
		}
		export function getTasksIdList()
		{
			let resultTab = [];
			for (var key in dailyTaskList) {
				let openType = dailyTaskList[key].openType
				if(Api.switchVoApi.checkOpenShenhe() && (openType == "rank" || openType == "alliance"))
				{
					continue;
				}
				
				if(openType == "trade" && !Api.switchVoApi.checkOpenTrade()) {
					continue;
				}
				if(openType == "conquest" && !Api.switchVoApi.checkOpenConquest()) {
					continue;
				}
				resultTab.push(key);
			}
			return resultTab;
		}

		export function getDailyRewardsList()
		{
			return dailyRewardsList;
		}

		export function getDailyRewardsCfgByRewardId(rewardId:string)
		{
			return dailyRewardsList[rewardId];
		}

	}
	class DailytaskItemCfg extends BaseItemCfg
	{
		public icon:number;
		/**
		 * 任务id
		 */
		public taskId:string;

		public openType:string;
		/**
		 * 任务类型
		 */
		public questType:number;
		/**
		 * 进度
		 */
		public value:number
		/**
		 * 活跃度
		 */
		public liveness:number;
		/**
		 * 奖励
		 */
		public reward:string;
		public need:string;
		public openNeed:string;
		
	}

    class DailyRewardsItemCfg extends BaseItemCfg
	{
		/**
		 * 任务id
		 */
		public id:string;
		/**
		 * 需要的奖励
		 */
		public needLiveness:number;
		/**
		 * 奖励
		 */
		public mustReward:number[];
		public canReward:string[];
		public canRatio:number[];
	}

}