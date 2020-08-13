namespace Config
{
	export namespace AcCfg
	{
        /**
        * 客栈 的 cfg
        * @author 张朝阳
        * date 2018/12/7
        * @class HotelCfg
        */
		export class HotelCfg 
		{
            /** 单抽一次的价格 */
            public hotelCost : number = 0;
            /** 连续购买十次的折扣 */
            public hotelDiscount : number = 0;
            /**展示时间 */
            public extraTime:number = 0;

            public hotelGetReward: string;
            /**任务列表 */
			private taskItemListCfg:HotelTaskItemCfg[] = [];
            /**充值列表 */
            private rechargeItemCfg:HotelRechargeItemCfg[] = [];

            private lotteryItemCfg:HotelLotteryItemCfg[] = [];
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[`${key}`]=data[key];
					if(key == "hotelTask")
                    {
                        this.taskItemListCfg = [];
                        for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new HotelTaskItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if(key == "hotelRecharge")
                    {
                        this.rechargeItemCfg = []
                         for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new HotelRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.rechargeItemCfg.push(itemcfg);
                        }
                    }
                    if(key == "hotelLotteryNum")
                    {
                        this.lotteryItemCfg = []
                         for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new HotelLotteryItemCfg();
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
            public getBoxList():HotelLotteryItemCfg[]
            {
                return this.lotteryItemCfg;
            }
		}
        /**
         * 任务的
         */
		export class HotelTaskItemCfg extends BaseItemCfg
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
        export class HotelRechargeItemCfg extends BaseItemCfg
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
        export class HotelLotteryItemCfg extends BaseItemCfg
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