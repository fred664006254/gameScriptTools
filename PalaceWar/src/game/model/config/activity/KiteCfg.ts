namespace Config
{
    export namespace AcCfg
    {
        export class KiteCfg
        {
            public extraTime:number =0;
            public corePrize:string = null;
            public cost:number = 0;
            public transformation:number = 0;
            public unitLength:number = 0;
            public length:number = 0;
            public loopNum:number = 0;
            public followingWindNum:number = 0;
            public againstWind:number = 0;
            public followingWindEffect:number = 0;
            public againstWindEffect:number = 0;
            public needGemCost:number = 0;
            public height:number = 0;

            public pool:{[key:string]:number};
            public progress:{need:number,getReward:string}[];
            public progressList:KiteProgressItemCfg[] = [];
            public qualifyingReward1:{rank:number[],getReward:string}[] = [];
            public rankReward:{rank:number[],getReward:string}[] =[];
			public rankItemList:KiteRankItemCfg[] = [];
            /**         
             活动期间的活跃任务   注：每日不重置
            openType：跳转
            questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
            value：进度
            getReward：奖励
            */
            public task:{openType:string,specialGift:number,group:number,questType:number,value:number,getReward:number}[] = null;
            private taskList:KiteTaskItemCfg[] = [];
            private poolRewards:string = null;

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(let key in data){
                    this[key] = data[key];
                    if(key == "task")
                    {
                        this.taskList = [];
                        for(let k in data[key])
                        {
                            let itemCfg = new KiteTaskItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k) + 1);
                            this.taskList.push(itemCfg);
                        }
                    }
                    else if (key == "progress"){
                        this.progressList = [];
                        for (let k in data[key]){
                            let itemCfg = new KiteProgressItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.progressList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward"){
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new KiteRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = String(Number(k) + 1);
                            this.rankItemList.push(itemCfg);
                        }
                    }
                    else if (key == "pool"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }  
            }

            public getTaskListById(min:number,max:number):KiteTaskItemCfg[]{

                let length = this.taskList.length;
                let taskList:KiteTaskItemCfg[] = [];
                for(let i = 0; i < length; i ++){
                    if(min<4){
                        if(this.taskList[i].group >= min && this.taskList[i].group <= max){
                            taskList.push(this.taskList[i]);
                        }
                    }
                }
                return taskList;
            }

            public getMaxBoxNeedNum () {
                return this.progressList[this.progressList.length-1].need;
            }
 
            /**
             * 获得任务列表
             */
            public getTaskList():KiteTaskItemCfg[]
            {
                return this.taskList;
            }

            /**
             * 进度列表
             */
            public getProgressList():KiteProgressItemCfg[]{
                return this.progressList;
            }

            /**
             * 奖池
             */
            public getPoolRewards():string{
                return this.poolRewards;
            }

        }

        /**
         * 进度
         */
        export class KiteProgressItemCfg extends BaseItemCfg{
            public id:number = 0;
            public sortId:number = 0;
            public need:number = 0;
            public getReward:string = null;
        }

        /**
         * 任务的
         */
        export class KiteTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;
            public openType:string = null;
            /**
             * 任务类型
             */
            public specialGift:number;
            /**
             * 奖励樱花
             */
            public group:number;
            /**
             * 任务进度
             */
            public questType:number;
            public value:number;
            /**
             * 奖励 
             * */
            public getReward:string;

            public sortId:number;
        }

        export class KiteRankItemCfg extends BaseItemCfg
		{
			public id:string;
			/**
			 * 排名上下限
			 */

            private rank:number[] = [];
            public getReward:string = '';
		
			/**
			 * 奖励
			 */
			public initData(data:any):void
            {
                if(data)
                {
                    for(var key in data)
                    {
						this[key]=data[key];
					}
	
                }
            }
		
			public get minRank():number
			{
				return this.rank[0];
			}
			public get maxRank():number
			{
				return this.rank[1];
			}
		}  
    }
}