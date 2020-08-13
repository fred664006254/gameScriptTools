namespace Config
{
	export namespace AcCfg
	{
		export class DragonBoatDayCfg 
		{
			/**
			 * 活动期间充值元宝与获得粽子比例（玩家每充值1元宝获得1粽子）
			 */
			public ratio1:number;
			/**
			 * 活动期间消耗元宝与获得粽子比例（玩家每消耗10元宝获得1粽子）
			 */
			public ratio2:number;

			/**
			 *全服玩家持有粽子总量与龙舟前行距离的比例（每1个粽子则龙舟前行0.1米）
			 */
			public ratio3:number;

			/**
			 * 活动期间排行榜上榜限制：持有粽子数量达到X个，可以上榜
			 */
			public rankNeed:number;

			/**
			 * --龙舟前行米数奖励（全服所有玩家均可获得）
                --needMeter：前行距离（单位：米）
                --getReward：奖励
			 */
            public teamReward:Object={};
            
            /**
			 * --活动期间，粽子持有数量排名奖励
                --rank：排行榜上下限  例：{5,10} 第五名至第十名
                --getReward：奖励
			 */
            public rankReward:Object={};

			/**
			 * --活动期间累计充值奖励 
             *  --needGem：所需额度：单位（元宝）
                --getReward：奖励
			 */
			public recharge:Object={};

			/**
			 * --活动期间活跃任务   注：每日不重置
                --openType：跳转
                --questType：任务类型  特殊类型：1--登录X天
                --value：进度
                --zongziGet：获得粽子
                --getReward：奖励
			 */
			public task:Object={};
			/**
			 * 节日商店
			 *  --limit：购买次数限制
                --originalCost：原价
                --needGem：所需元宝
                --discount：折扣
                --goods：商品内容
			 */
            public festivalMarket:Object={};

            public exchange : string = '';
            
            public formatData(data:any):void
            {
                this.ratio1 = data.ratio1;
                this.ratio2 = data.ratio2;
                this.ratio3 = data.ratio3;
                this.rankNeed = data.rankNeed;
                if(data.exchange){
                    this.exchange = data.exchange;
                }
    
                for(var key in data.teamReward)
                {
                    let itemCfg:DBTeamRewardItemCfg;
                    if(!this.teamReward.hasOwnProperty(String(key)))
                    {
                        this.teamReward[String(key)]=new DBTeamRewardItemCfg();
                    }
                    itemCfg=this.teamReward[String(key)];
                    itemCfg.initData(data.teamReward[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.rankReward)
                {
                    let itemCfg:DBRankRewardItemCfg;
                    if(!this.rankReward.hasOwnProperty(String(key)))
                    {
                        this.rankReward[String(key)]=new DBRankRewardItemCfg();
                    }
                    itemCfg=this.rankReward[String(key)];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.recharge)
                {
                    let itemCfg:DBRechargeItemCfg;
                    if(!this.recharge.hasOwnProperty(String(key)))
                    {
                        this.recharge[String(key)]=new DBRechargeItemCfg();
                    }
                    itemCfg=this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.task)
                {
                    let itemCfg:DBTaskItemCfg;
                    if(!this.task.hasOwnProperty(String(key)))
                    {
                        this.task[String(key)]=new DBTaskItemCfg();
                    }
                    itemCfg=this.task[String(key)];
                    itemCfg.initData(data.task[key]);
                    // itemCfg.getReward += (`|20_0001_${data.task[key].zongziGet}`);
                    itemCfg.taskId=String(key);
                }

                for(var key in data.festivalMarket)
                {
                    let itemCfg:DBFestivalMarketItemCfg;
                    if(!this.festivalMarket.hasOwnProperty(String(key)))
                    {
                        this.festivalMarket[String(key)]=new DBFestivalMarketItemCfg();
                    }
                    itemCfg=this.festivalMarket[String(key)];
                    itemCfg.initData(data.festivalMarket[key]);
                    itemCfg.sortId=Number(key);
                }
            }    
        }


        class DBTeamRewardItemCfg extends BaseItemCfg
        {
            public id:string;
            /**
             * 前行距离（单位：米）
             */
            public needMeter:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        class DBRankRewardItemCfg extends BaseItemCfg
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

        class DBRechargeItemCfg extends BaseItemCfg
        {
            public id:string;
            /**
             * 所需额度：单位（元宝）
             */
            public needGem:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        class DBTaskItemCfg extends BaseItemCfg
        {
            /**
             * 任务id
             */
            public taskId:string;
    
            public openType:string;
            /**
             * 任务类型
             */
            public questType:number;
            /**
             * 进度
             */
            public value:number
            /**
              获得粽子
             */
            public zongziGet:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                // this.getReward += (`18_0001_${this.zongziGet}`);
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
        
        class DBFestivalMarketItemCfg extends BaseItemCfg
        {
            public sortId:number;
            /**
             * 限购次数 
             */
            public limit:number;
            /*
            道具原价
            */
            public originalCost:number;
            /*
            实际购买的价格
            */
            public needGem:number;
            /*
            折扣
            */
            public discount:number;
            /**
             * 内容和数量
             */
            public goods:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.goods,true,false);
            }
        }
	}
}