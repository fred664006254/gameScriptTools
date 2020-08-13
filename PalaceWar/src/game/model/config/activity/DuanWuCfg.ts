namespace Config
{
	export namespace AcCfg
	{
		export class DuanWuCfg 
		{
			/**展示时间 */
            public extraTime:number = 0;

			/**
			 *  --活动期间的累计充值奖励
				--needGem:所需额度：单位（元宝）
				--zongZiGet:粽子奖励
				--getReward:奖励
			 */
			public recharge:Object={};

			/**
			 * --活动期间的活跃任务   注：每日不重置
				--openType:跳转
				--questType:任务类型 
				--value:进度
				--xiongHuangGet:雄黄酒
				--getReward:奖励
			 */
			public task:Object={};

			/**
			 * --活动期间的活跃任务   注：每日不重置
				--openType:跳转
				--questType:任务类型 
				--value:进度
				--xiongHuangGet:雄黄酒
				--getReward:奖励
			 */
			public shopTask:any={};

			/**
			 * --商店
				--item:道具
				--price:价格
				--rebate:折扣
				--limit:限购
			 */
			public shop:Object={};

			/**
			 * --兑换
				--item:道具
				--costZongZi:需要粽子
				--costXiongHuang:需要雄黄酒
				--costDaGao:需要打糕
				--limit:活动限购
				--getXiongHuang:得到雄黄
				--getDaGao:得到打糕
			 */
			public claim:Object={};

			public formatData(data:any):void
            {
				for(var key in data.recharge)
                {
                    let itemCfg:DWRechargeItemCfg;
					let id = Number(key) + 1;
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new DWRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

				for(var key in data.task)
                {
                    let itemCfg:DWTaskItemCfg;
					let id = Number(key) + 1;
                    if(!this.task[id])
                    {
                        this.task[id]=new DWTaskItemCfg();
                    }
                    itemCfg=this.task[id];
                    itemCfg.initData(data.task[key]);

                    itemCfg.taskId=id;
                }

				this.shopTask =data.shopTask;
				this.extraTime = data.extraTime;

				for(var key in data.shop)
				{
					let itemCfg:DWShopItemCfg;
					let id = Number(key) + 1;
					if(!this.shop[id])
					{
						this.shop[id]=new DWShopItemCfg();
					}
					itemCfg=this.shop[id];
					itemCfg.initData(data.shop[key]);
					itemCfg.id=id;
				}

				for(var key in data.claim)
				{
					let itemCfg:DWClaimItemCfg;
					let id = Number(key) + 1;
					if(!this.claim[id])
					{
						this.claim[id]=new DWClaimItemCfg();
					}
					itemCfg=this.claim[id];
					itemCfg.initData(data.claim[key]);
					itemCfg.id=id;
				}
			}
		}

		export class DWRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
            * 所需额度：单位（元宝）
            */
            public needGem:number;
            /**
            * 奖励
            */
            public getReward:string;
            /*
            * 特殊道具：粽子
            */
            public zongZiGet:number;
            
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

		export class DWTaskItemCfg extends BaseItemCfg
        {
            /**
             * 任务id
             */
            public taskId:number;
    
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
              获得雄黄酒
             */
            public xiongHuangGet:number = 0;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                // this.getReward += (`18_0001_${this.zongziGet}`);
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

		export class DWShopItemCfg extends BaseItemCfg
		{
			public id: number;
			/**
			 * 道具内容
			 */
			public item:string;

			/**
			 * 价格
			 */
			public price:number;

			/**
			 * 折扣
			 */
			public rebate:number=1;

			/**
			 * 限购
			 */
			public limit:number;

			public get rewardIcons():BaseDisplayObjectContainer
            {
				return GameData.getRewardItemIcons(this.item,true,false)[0];
            }
		}

		export class DWClaimItemCfg extends BaseItemCfg
		{
			public id: number;
			/**
			 * 道具内容
			 */
			public item:string;

			/**
			 * 需要粽子
			 */
			public costZongZi:number;

			/**
			 * 需要雄黄
			 */
			public costXiongHuang:number;

			/**
			 * 需要打糕
			 */
			public costDaGao:number;

			/**
			 * 得到雄黄
			 */
			public getXiongHuang:number;

			/**
			 * 得到打糕
			 */
			public getDaGao:number;

			/**
			 * 限购
			 */
			public limit:number;
		}
	}
}