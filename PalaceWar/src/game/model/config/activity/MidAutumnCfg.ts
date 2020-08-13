namespace Config
{
	export namespace AcCfg
	{
        /**
        * 中秋活动 的 cfg
        * @author 张朝阳
        * date 2018/8/28
        * @class MidAutumnCfg
        */
		export class MidAutumnCfg 
		{
            /** 单抽一次的价格 */
            public cost : number = 0;
            /** 连续购买十次的折扣 */
            public discount : number = 0;
            /**任务列表 */
			private taskItemListCfg:MidAutumnTaskItemCfg[] = [];
            /**充值列表 */
            private rechargeItemCfg:MidAutumnRechargeItemCfg[] = [];

            private lotteryItemCfg:MidAutumnLotteryItemCfg[] = [];

            private lotteryPool:Array<any> = []
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[`${key}`]=data[key];
					if(key == "task")
                    {
                        this.taskItemListCfg = [];
                        for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new MidAutumnTaskItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if(key == "recharge")
                    {
                        this.rechargeItemCfg = []
                         for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new MidAutumnRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.rechargeItemCfg.push(itemcfg);
                        }
                    }
                    if(key == "lotteryNum")
                    {
                        this.lotteryItemCfg = []
                         for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new MidAutumnLotteryItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.lotteryItemCfg.push(itemcfg);
                        }
                    }
                    console.log("11");
				}
            }
            /**
             * 获得充值列表
             */
            public rechargeList() : MidAutumnRechargeItemCfg[]{
                return this.rechargeItemCfg;
            }
			/**
             * 获得任务列表
             */
            public getTaskList():MidAutumnTaskItemCfg[]
            {
                return this.taskItemListCfg;
            }

            public getTaskValue(id:string):number
            {
                for(let i = 0;i<this.taskItemListCfg.length;i++)
                {
                    if(id = this.taskItemListCfg[i].id)
                    {
                        return this.taskItemListCfg[i].value;
                    }
                }
                return null;
            }
            /**
             * 获得宝箱列表
             */
            public getBoxList():MidAutumnLotteryItemCfg[]
            {
                return this.lotteryItemCfg;
            }

            /**奖池 */
            public rewardPoolList(): string {
                let rewards = "";
                for (let key in this.lotteryPool) {
                    rewards += this.lotteryPool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            }
            public getRewardWife(): string {
                return '223';
            }
            public getRewardServant(): string {
                return '1056';
            }
		}
        /**
         * 任务的
         */
		export class MidAutumnTaskItemCfg extends BaseItemCfg
		{
            /**任务ID */
			public id:string;

            public openType:string = null;
			/**
			 * 任务类型
			 */
			public questType:string;
			/**
			 * 任务进度
			 */
			public value:number;
            /**奖励 */
			public getReward:string;

            public sortId:number;
		}
        /**
         * 充值的
         */
        export class MidAutumnRechargeItemCfg extends BaseItemCfg
		{
            /**充值ID */
			public id:string;

            public sortId:number;
			/**
			 * 充值的需要金额数
			 */
			public needGem:number;
            /**奖励 */
			public getReward:string;

		}
        /**
         * 宝箱的
         */
        export class MidAutumnLotteryItemCfg extends BaseItemCfg
		{
            /**宝箱ID */
			public id:string;
			/**
			 * 抽奖的次数
			 */
			public needNum:number;
            /**奖励 */
			public getReward:string;

		}
	}
}