namespace Config
{
	export namespace AcCfg
	{
		export class LaborDayCfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            /**
			 * 活动期间充值元宝与获得水瓢比例（玩家每充值1元宝获得1茱萸）
			 */
			public ratio1:number;
			/**
			 * 活动期间消耗元宝与获得水瓢比例（玩家每消耗10元宝获得1茱萸）
			 */
			public ratio2:number;

			/**
			 *全服玩家持有水瓢总量与幼苗长大的比例（每1个茱萸则爬山前行0.1米）
			 */
			public ratio3:number;

			/**
			 * 活动期间排行榜上榜限制：持有水瓢数量达到X个，可以上榜
			 */
			public rankNeed:number;

			/**
			 * --水瓢浇水奖励（全服所有玩家均可获得）
                --needMeter：前行距离（单位：米）
                --getReward：奖励
			 */
            public teamReward:Object={};
            
            /**
			 * ----活动期间，水瓢持有数量排名奖励
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
			 * --活动期间活跃任务
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
            
            public formatData(data:any):void
            {
                this.ratio1 = data.ratio1;
                this.ratio2 = data.ratio2;
                this.ratio3 = data.ratio3;
                this.rankNeed = data.rankNeed;
                this.extraTime = data.extraTime;
                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
    
                for(var key in data.teamReward)
                {
                    let itemCfg:LBTeamRewardItemCfg;
                    if(!this.teamReward.hasOwnProperty(String(key)))
                    {
                        this.teamReward[String(key)]=new LBTeamRewardItemCfg();
                    }
                    itemCfg=this.teamReward[String(key)];
                    itemCfg.initData(data.teamReward[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.rankReward)
                {
                    let itemCfg:LBRankRewardItemCfg;
                    if(!this.rankReward.hasOwnProperty(String(key)))
                    {
                        this.rankReward[String(key)]=new LBRankRewardItemCfg();
                    }
                    itemCfg=this.rankReward[String(key)];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.recharge)
                {
                    let itemCfg:LBRechargeItemCfg;
                    if(!this.recharge.hasOwnProperty(String(key)))
                    {
                        this.recharge[String(key)]=new LBRechargeItemCfg();
                    }
                    itemCfg=this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=String(key);
                }

                for(var key in data.task)
                {
                    let itemCfg:LBTaskItemCfg;
                    if(!this.task.hasOwnProperty(String(key)))
                    {
                        this.task[String(key)]=new LBTaskItemCfg();
                    }
                    itemCfg=this.task[String(key)];
                    itemCfg.initData(data.task[key]);

                    itemCfg.taskId=String(key);
                }

                for(var key in data.festivalMarket)
                {
                    let itemCfg:LBFestivalMarketItemCfg;
                    if(!this.festivalMarket.hasOwnProperty(String(key)))
                    {
                        this.festivalMarket[String(key)]=new LBFestivalMarketItemCfg();
                    }
                    itemCfg=this.festivalMarket[String(key)];
                    itemCfg.initData(data.festivalMarket[key]);
                    itemCfg.sortId=Number(key);
                }
            }    
        }


        class LBTeamRewardItemCfg extends BaseItemCfg
        {
            public id:string;
            /** 
             * state
            */
            public state : number[];
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

        class LBRankRewardItemCfg extends BaseItemCfg
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

        class LBRechargeItemCfg extends BaseItemCfg
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
            /*
            * 特殊道具：水瓢
            */
            public specialItem:number;
            
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        class LBTaskItemCfg extends BaseItemCfg
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
            public shuipiaoGet:number;
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
        
        class LBFestivalMarketItemCfg extends BaseItemCfg
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