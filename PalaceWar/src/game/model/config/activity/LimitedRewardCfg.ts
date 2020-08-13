namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 限时活动配置类
		 * author dmj
		 * date 2017/11/07
		 * @class LimitedRewardCfg
		 */
		export class LimitedRewardCfg 
		{
			/**
			 * 类型
			 */
			public type:number;
			/**
			 * 进度值
			 */
			private value:Object;

			/**
			 * 奖励
			 */
			private reward:Object;

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