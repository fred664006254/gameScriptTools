namespace Config
{
	export namespace AcCfg
    {   
         /**
         * 神奇地宫
         * author sl
         * date 2020.8.11
         * @class WeaponPrisonCfg
         */

        export class WeaponPrisonCfg 
        {
            public extraTime:number;
            public coreReward:string = "";
            public coreReward1:number[];
            public needGem:number = 0;
            private poolRewardsList:WeaponPrisonPoolItemCfg[] = [];
            /** 个人进度奖励  */
            public achievementOne: WeaponPrisonAchievementItem[] = [];
            public needScore:number = 0;
            public scoreRank:WeaponPrisonRankRewardItemCfg[] = [];

            public formatData(data: any): void {
                for (var key in data) {
                    if (key == "achievementOne") {
                        this.achievementOne = []
                        for (let k in data[key]) {
                            let itemcfg = new WeaponPrisonAchievementItem();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = Number(k);
                            this.achievementOne.push(itemcfg);
                        }
                    }
                    else if (key == "scoreRank") {
                        this.scoreRank = []
                        for (let k in data[key]) {
                            let itemcfg = new WeaponPrisonRankRewardItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = Number(k);
                            this.scoreRank.push(itemcfg);
                        }
                    }
                    else if (key == "pool"){
                        this.poolRewardsList = [];
                        let cfgData = data[key];
                        for (let k in cfgData){
                            let itemCfg = new WeaponPrisonPoolItemCfg();
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
                    else
                    {
                        this[`${key}`] = data[key];
                    }
                }
            }


            /**
             * 奖池
             */
            public getPoolRewards():WeaponPrisonPoolItemCfg[]{
                return this.poolRewardsList;
            }
        }


        export class WeaponPrisonAchievementItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }

        export class WeaponPrisonPoolItemCfg extends BaseItemCfg{
            public id:number = 0;
            public poolItem:any = null;
            public getRewards:string = null;
        }

        export class WeaponPrisonRankRewardItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 排名上限
             */
            public rank:number[];
            /**
             * 达到进度的奖励
             */
            public getReward:string;

            public get minRank():number
            {
                return this.rank[0];
            }
            public get maxRank():number
            {
                return this.rank[1];
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,true);
            }
        }
    }
}