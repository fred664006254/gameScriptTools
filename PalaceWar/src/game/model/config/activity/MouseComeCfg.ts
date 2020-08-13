namespace Config{
    export namespace AcCfg{
        /**
         * 鼠来如意
         * author ycg
         * date 2020.6.1
         * @class MouseComeCfg
         */
        export class MouseComeCfg{
            public extraTime:number;
            public show:number;
            public freeTime:number;
            public needGem:number;
            public cost:number;
            public add:number;
            public maxNum:number;
            public bigReward:any[] = [];
            public mousePool:any;
            private poolRewards:string;
            public exchange:any;
            public needTimes:any;
            private achieveList:MouseComeAchieveItem[] =[];
            private rankItemList:MouseComeRankItemCfg[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "mouseNum"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new MouseComeAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward"){
                        this.rankItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new MouseComeRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankItemList.push(itemCfg);
                        }
                    }
                }

                //pool
                let str = "";
                for (let k in this.mousePool){
                    str += this.mousePool[k][0] + "|";
                }
                this.poolRewards = str.substring(0, str.length - 1);
            }

            public getAchieveCfg():MouseComeAchieveItem[]{
                return this.achieveList;
            }

            public getRankItemCfg():MouseComeRankItemCfg[]{
                return this.rankItemList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
        }

        /**进度奖励item */
        export class MouseComeAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**
         * 排名奖励
         */
        export class MouseComeRankItemCfg extends BaseItemCfg
		{
			public id:number;
            private rank:number[] = [];
            public getReward:string = '';
		
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