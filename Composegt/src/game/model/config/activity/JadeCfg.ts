namespace Config
{
    export namespace AcCfg
    {
        export class JadeCfg
        {
            public cost :number = 0;
            public rankListlim:number = 0;
            public totalListmin:number = 0;
            private rankList :JadeRankItemCfg[] = [];
            private totalList:JadeTotalItemCfg[] = [];
            private taskList: JadeTaskItemCfg [] = [];
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					// this[`${key}`]=data[key];
                    if(key =="cost"){
                        this.cost = data[key];
                    }

                    if(key =="rankListlim"){
                        this.rankListlim = data[key];
                    }

                     if(key =="totalListmin"){
                        this.totalListmin = data[key];
                    }
                    if(key == "rankList")
                    {
                        this.rankList = []
                        //  for(let i = 0;i < data[key].length;i++)
                        let i = 0;
                        for(let k in data[key])
                        {
                            let itemcfg = new JadeRankItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = String(i+1);
                            this.rankList.push(itemcfg);
                            i ++;
                        }
                    }
                    
                    if(key == "totalList")
                    {
                        this.totalList = []
                        let i = 0;
                        for(let k in data[key])
                        {
                            let itemcfg = new JadeTotalItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = String(i+1);
                            this.totalList.push(itemcfg);
                            i ++;
                        }
                        this.totalList.sort((a,b)=>{
                            return Number(b.id)- Number(a.id);
                        });
                    }
                    if(key == "task")
                    {
                        this.taskList = [];
                        let i = 0;
                        for(let k in data[key])
                        {
                            let itemcfg = new JadeTaskItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = String(i+1);
                            this.taskList.push(itemcfg);
                            i ++;
                        }
                    }
				}
                
            }
            public getRankList():JadeRankItemCfg[]
            {
                return this.rankList;
            }
            public getTotalList():JadeTotalItemCfg[]
            {
                return this.totalList;
            }
            /**
             * 获得任务列表
             */
            public getTaskList():JadeTaskItemCfg[]
            {
                return this.taskList;
            }
           public getTaskValue(id:string):number
            {
                for(let i = 0;i<this.taskList.length;i++)
                {
                    if(id = this.taskList[i].id)
                    {
                        return this.taskList[i].value;
                    }
                }
                return null;
            }
        }

        /**
         * 排名奖励
         */
        export class JadeRankItemCfg extends BaseItemCfg
		{
            /**充值ID */
			public id:string;

            public rankV1:number;
            public rankV2:number;

            /**奖励 */
			public reward:string;
            public initData(data:any):void
            {
                if(data)
                {
                    for(var key in data)
                    {
                       
                        if(key == "rank")
                        {
                            this.rankV1 = data[key][0];
                            this.rankV2 = data[key][1];

                        }  else {
                            this[key] = data[key];
                        }
                    }
                }
            }
    
		}
        /**
         * 累计奖励
         */
        export class JadeTotalItemCfg extends BaseItemCfg
		{
            /**充值ID */
			public id:string;

            public rankV1:number;
            public rankV2:number;

            /**奖励 */
			public reward:string;

            public initData(data:any):void
            {
                if(data)
                {
                    for(var key in data)
                    {
                        // this[key]=data[key];
                        if(key == "rank")
                        {
                            this.rankV1 = data[key][0];
                            this.rankV2 = data[key][1];

                        }  else {
                            this[key] = data[key];
                        }
                    }
                }
            }
		}
        /**
         * 任务的
         */
        export class JadeTaskItemCfg extends BaseItemCfg
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
            public jadeGet:number;
            /**奖励 */
            public getReward:string;

            public sortId:number;
        }

    }


}