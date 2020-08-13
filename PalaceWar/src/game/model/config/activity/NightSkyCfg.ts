namespace Config{
    export namespace AcCfg{
        /**
         * 夜观天象
         * author ycg
         * date 2020.6.15
         * @class NightSkyCfg
         */
        export class NightSkyCfg{
            public extraTime:number;
            public needGem:number;
            public show:number;
            public freeTime:number;
            public nightPool:any;
            public getReward:string;
            public baseChance:number;
            public addChance:number;
            public change:any;
            public specialLimit:number;
            private poolRewardsList:NightSkyPoolItemCfg[] = [];
            private achieveList:NightSkyAchieveItem[] =[];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "nightNum"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new NightSkyAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                }

                if (data.nightPool){
                    this.poolRewardsList = [];
                    let cfgData = data.nightPool;
                    for (let k in cfgData){
                        let itemCfg = new NightSkyPoolItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        let str = "";
                        let pools = cfgData[k].poolItem;
                        for (let key in pools){
                            str += pools[key][0] + "|";
                        }
                        itemCfg.getRewards = str.substring(0, str.length - 1);
                        this.poolRewardsList.push(itemCfg);
                    }
                }
            }

            public getAchieveCfg():NightSkyAchieveItem[]{
                return this.achieveList;
            }

            /**
             * 奖池
             */
            public getPoolRewards():GoodMatchPoolItemCfg[]{
                return this.poolRewardsList;
            }
        }

        /**进度奖励item */
        export class NightSkyAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

         /**
         * 奖池
         */
        export class NightSkyPoolItemCfg extends BaseItemCfg{
            public id:number = 0;
            public poolItem:any = null;
            public getRewards:string = null;
        }

        /**
         * 排名奖励
         */
        // export class MouseComeRankItemCfg extends BaseItemCfg
		// {
		// 	public id:number;
        //     private rank:number[] = [];
        //     public getReward:string = '';
		
		// 	public get minRank():number
		// 	{
		// 		return this.rank[0];
        //     }
            
		// 	public get maxRank():number
		// 	{
		// 		return this.rank[1];
		// 	}
		// }  
    }
}