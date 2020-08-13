namespace Config
{
	export namespace AcCfg
	{   
         /**
         * 鼠来进宝
         * author sl
         * date 2020.7.18
         * @class MouseTreasureCfg
         */
		export class MouseTreasureCfg 
        {
            public extraTime:number;
            /**
                --兑换奖励
                --changeItem:兑换道具
                --changeReward:兑换奖励
            */
            public change:any;
            //初始免费次数（免费次数上限）
            public baseChance:number = 0;
            public cdTime:number = 0;
            public buyLimit:number = 0;
            public cost1:number = 0;
            public cost2:number = 0;
            public tipsTime:number = 0;
            public typeScore:any;
            public addItem:any;
            public needScore:number = 0;

            public rechargeList:MouseTreasureRecharageItem[] = [];
            public achievementList:MouseTreasureAchievementItem[] = [];
            public rankList:MouseTreasureRankRewardItemCfg[] = [];
			public pumpkinPool:any;
            public gameMap:any[] = [];

            public maxX:number = 0;
            public maxY:number = 0;

            /** 网格数宽度 */
			public get GRID_WIDTH() 
			{
				return this.maxX + 2;
			}
			/** 网格数高度 */
			public get GRID_HEIGHT() 
			{
				return this.maxY + 2;
			}

            public formatData(data: any): void {
                for (var key in data) {
                    if (key == "recharge") {
                        this.rechargeList = []
                        for (let k in data[key]) {
                            let itemcfg = new MouseTreasureRecharageItem();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = Number(k);
                            this.rechargeList.push(itemcfg);
                        }
                    }
                    else if (key == "achievement") {
                        this.achievementList = []
                        for (let k in data[key]) {
                            let itemcfg = new MouseTreasureAchievementItem();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = Number(k);
                            this.achievementList.push(itemcfg);
                        }
                    }
                    else if (key == "rankReward") {
                        this.rankList = []
                        for (let k in data[key]) {
                            let itemcfg = new MouseTreasureRankRewardItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = Number(k);
                            this.rankList.push(itemcfg);
                        }
                    }
                    else
                    {
                        this[`${key}`] = data[key];
                    }
                }
            }

             public getPoolRewards():string{
                let str = "";
                for (let k in this.pumpkinPool){
                    str += this.pumpkinPool[k][0] + "|";
                }
                str = str.substring(0, str.length - 1);
                return str;
            }

            public getAddItemVo():RewardItemVo
            {
                let itemvo = GameData.formatRewardItem(this.addItem.Item)[0];
                return itemvo;
            }
        }
        /**累充item */
        export class MouseTreasureRecharageItem extends BaseItemCfg{
            /**充值id */
            public id:number = null;
            /**充值金额 */
            public needGem:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
        /**进度奖励item */
        export class MouseTreasureAchievementItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needScore:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }  

        export class MouseTreasureRankRewardItemCfg extends BaseItemCfg
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