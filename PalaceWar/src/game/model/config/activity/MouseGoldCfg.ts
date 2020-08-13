namespace Config{
    export namespace AcCfg{
        /**
         * 鼠来招财
         * author wxz
         * date 2020.6.30
         * @class MouseGoldCfg
         */
        export class MouseGoldCfg{
            public extraTime:number;
            public show:number;
            public freeTime:number;
            public needGem:number;
            public cost:number;
            public add:number;
            public maxNum:number;
            public bigReward:any[] = [];
            public pool:any;
            private poolRewards:string;
            public exchange:any;
            public needTimes:any;
            public special:string[] = [];
            private achieveList:MouseGoldAchieveItem[] =[];
            private rankItemList:MouseGoldRankItemCfg[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new MouseGoldAchieveItem();
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
                            let itemCfg = new MouseGoldRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankItemList.push(itemCfg);
                        }
                    }
                }

                //pool
                let str = "";
                for (let k in this.pool){
                    str += this.pool[k][0] + "|";
                }
                this.poolRewards = str.substring(0, str.length - 1);
            }

            public getAchieveCfg():MouseGoldAchieveItem[]{
                return this.achieveList;
            }

            public getRankItemCfg():MouseGoldRankItemCfg[]{
                return this.rankItemList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
        }

        /**进度奖励item */
        export class MouseGoldAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public specialnum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**
         * 排名奖励
         */
        export class MouseGoldRankItemCfg extends BaseItemCfg
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