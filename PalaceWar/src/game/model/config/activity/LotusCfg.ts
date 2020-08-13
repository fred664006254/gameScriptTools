namespace Config
{
    export namespace AcCfg
    {
        export class LotusCfg
        {
            public extraTime:number =0;
            public show:number = 0;
            public freeTime:number = 0;
            public needGem:number = 0;
            public consume:number = 0;
            public addProcess:number = 0;
            public loopNum:number = 0;
            public critical:any = {};
            public exchange:any = {};
            public needTimes:number = 0;
            private rankItemList:LotusRankItemCfg[] = [];
            private achieveList:LotusAchieveItemCfg[] = [];
            private poolRewards:string = null;

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(let key in data){
                    this[key] = data[key];
                    if(key == "achievement")
                    {
                        this.achieveList = [];
                        for(let k in data[key])
                        {
                            let itemCfg = new LotusAchieveItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward"){
                        this.rankItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new LotusRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k);
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

            /**
             * 进度列表
             */
            public getAchieveList():LotusAchieveItemCfg[]{
                return this.achieveList;
            }

            /**
             * 奖池
             */
            public getPoolRewards():string{
                return this.poolRewards;
            }

            /**
             * 排名奖励
             */
            public getRankItemList():LotusRankItemCfg[]{
                return this.rankItemList;
            }

        }

        /**
         * 进度
         */
        export class LotusAchieveItemCfg extends BaseItemCfg{
            public id:number = 0;
            public sortId:number = 0;
            public specialnum:number = 0;
            public getReward:string = null;
        }

        /**
         * 排名奖励
         */
        export class LotusRankItemCfg extends BaseItemCfg
		{
			public id:number;
            private rank:number[] = [];
            public getReward:string = '';
		
			/**
			 * 奖励
			 */
			// public initData(data:any):void
            // {
            //     if(data)
            //     {
            //         for(var key in data)
            //         {
			// 			this[key]=data[key];
			// 		}
	
            //     }
            // }
		
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