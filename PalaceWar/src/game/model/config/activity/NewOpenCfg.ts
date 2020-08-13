namespace Config
{
	export namespace AcCfg
	{
		export class NewOpenCfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            public task:Object={};
            public recharge:Object={};
            public shop:Object={};

            public formatData(data:any):void
            {
                this.extraTime = data.extraTime;

                this.task = data.task;
                for(var key in data.costGem)
                {
                    let itemCfg:NewOpenRechargeItemCfg;
					let id = Number(key) + 1;
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new NewOpenRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.costGem[key]);
                    itemCfg.id=id;
                }
                for(var key in data.shop)
				{
					let itemCfg:NewOpenShopItemCfg;
					let id = Number(key) + 1;
					if(!this.shop[id])
					{
						this.shop[id]=new NewOpenShopItemCfg();
					}
					itemCfg=this.shop[id];
					itemCfg.initData(data.shop[key]);
					itemCfg.id=id;
				}
            }
        }

        export class NewOpenRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
            * 所需额度：单位（元宝）
            */
            public needGem:number;
            /*
            * 兑换货币
            */
            public specialGift:number;
             /*
            * 最大次数
            */
            public maxNum:number;
            /**
            * 奖励
            */
            public getReward:string;
           
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        export class NewOpenShopItemCfg extends BaseItemCfg
		{
			public id: number;
            /**
			 * 排序
			 */
			public sortId:number;
			/**
			 * 需要印记
			 */
			public specialCost:number;
			/**
			 * 限购
			 */
			public limit:number;
            /**
			 * 道具内容
			 */
			public getReward:string;

			public get rewardIcons():RewardItemVo
            {
				return GameData.formatRewardItem(this.getReward,true)[0];
            }
		}
    }
}