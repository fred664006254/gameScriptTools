namespace Config {
    
    export namespace AcCfg
	{
        /**
         * 美女冲榜配置
         */
        export class DraftConfig
        {	
            /**
             * 活动期间充值元宝与获得鲜花比例（玩家每充值10元宝获得1鲜花）
             */
            public ratio1:number;

            /**
             * 活动期间玩家获得活跃度与获得鲜花比例（玩家每获得10点活跃度可获赠1鲜花）
             */
            public ratio2:number;

            /**
             * 活动期间玩家上榜所需消耗鲜花数量（消耗鲜花低于此数量的玩家将不会上榜）
             */
            public rankNeed:number;

            /**
             * -玩家消耗鲜花数量奖励（活动期间不重置）
             --needNum：消耗鲜花数量
            --getReward：奖励
            */
            public flowerReward:Object={};

            /**
             * --消耗鲜花数量全区排名奖励
             --rank：排行榜上下限  例：{5,10} 第五名至第十名
            --getReward：奖励
            */
            public crossServerRankList:Object={};
            
            public formatData(data:any):void
            {
                this.ratio1 = data.ratio1;
                this.ratio2 = data.ratio2;
                this.rankNeed = data.rankNeed;
                for(var key in data.flowerReward)
                {
                    let itemCfg:FlowerRewardItemCfg;
                    if(!this.flowerReward.hasOwnProperty(String(key)))
                    {
                        this.flowerReward[String(key)]=new FlowerRewardItemCfg();
                    }
                    itemCfg=this.flowerReward[String(key)];
                    itemCfg.initData(data.flowerReward[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.crossServerRankList)
                {
                    let itemCfg:crossServerRewardItemCfg;
                    if(!this.crossServerRankList.hasOwnProperty(String(key)))
                    {
                        this.crossServerRankList[String(key)]=new crossServerRewardItemCfg();
                    }
                    itemCfg=this.crossServerRankList[String(key)];
                    itemCfg.initData(data.crossServerRankList[key]);
                    itemCfg.id=String(key);
                }
            }
        }

        class FlowerRewardItemCfg extends BaseItemCfg
        {
            public id:string;
            /**
             * needNum：消耗鲜花数量
             */
            public needNum:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        class crossServerRewardItemCfg extends BaseItemCfg
        {
            public id:string;
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