namespace Config
{
	export namespace AcCfg
	{
		export class MonopolyCfg 
		{
			public diceCycle:number=0;
			//骰子周期总格子数范围
			public diceRange:number[] = [];
			//总格子数
			public diceMaxNum:number=20;

			//格子奖励
			public diceGrid:{rate:number,gridReward:string}[] = [];
			//每轮结束的奖励

			public taskList:MonopolyTaskItemCfg[] = [];
			public turnrewardList:MonopolyTurnRewardItemCfg[] = []
			public diceTitleID:string ;
			
			public get task()
			{
				return this.taskList;
			}
			public get turnReward()
			{
				return this.turnrewardList;
			}

			public formatData(data:any):void
			{
              	for (var key in data) {
				  	if (data.hasOwnProperty(key)) {
						
						if(key == "task")
                        {
                            this.taskList = [];
                            let i = 0;
                            for(let k in data[key])
                            {
                                let itemcfg = new MonopolyTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        } else if(key == "turnReward")
                        {
                            this.turnrewardList = [];
                            let ii = 0;
                            for(let k in data[key])
                            {
                                let itemcfg = new MonopolyTurnRewardItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(ii+1);
                                this.turnrewardList.push(itemcfg);
                                ii ++;
                            }
                        }
						else{
							this[key] = data[key];
						}
					}
			  	}
			}

		}

		/**
         * 任务的
         */
        export class MonopolyTaskItemCfg extends BaseItemCfg
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
			public dice:number;

            /**奖励 */
            public getReward:string;
			
        }

		 export class MonopolyTurnRewardItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;

            public rate:number;
            /**奖励 */
            public getReward:string;
			
        }
	}
}
