namespace Config
{
	export namespace AcCfg
	{
		export class ArenaCfg 
		{
            /**
			 * 展示时间
			 */
            public extraTime:number;
            /**
			 * 活动期间充值元宝与获得砖块比例（玩家每充值1元宝获得1砖块）
			 */
			public ratio1:number;

			/**
			 *全服玩家持有砖块总量与斗场完成的比例（每1块砖块斗场完成1）
			 */
			public ratio3:number;

			/**
			 * 活动期间排行榜上榜限制：持有砖块数量达到X个，可以上榜
			 */
			public rankNeed:number;

			/**
			 * --砖块建造奖励（全服所有玩家均可获得）
                --needMeter:前行距离（单位：米）
                --state:斗场状态
                --getReward:奖励
			 */
            public teamReward:Object={};
            
            /**
			 * --活动期间，砖块持有数量排名奖励
                --rank:排行榜上下限  例：{5,10} 第五名至第十名
                --getReward:奖励
			 */
            public rankReward:Object={};

			/**
			 * --活动期间累计充值奖励
                --needGem:所需额度：单位（元宝）
                --specialItem:特殊道具：水瓢
                --getReward:奖励
			 */
			public recharge:Object={};

			/**
			 * --活动期间活跃任务   注：每日不重置
                --openType:跳转
                --questType:任务类型  特殊类型：1--登录X天
                --value:进度
                --shuipiaoGet:获得水瓢
                --getReward:奖励
			 */
			public task:Object={};
			/**
			 * 节日商店
			 * --节日商店
            --limit:购买次数限制
            --originalCost:原价
            --needGem:所需元宝
            --discount:折扣
            --goods:商品内容
			 */
            public festivalMarket:Object={};
            /**
            --场景变化标识
            */
            public animation:number[]=[];
            
            
            public formatData(data:any):void
            {
                this.ratio1 = data.ratio1;
                this.ratio3 = data.ratio3;
                this.rankNeed = data.rankNeed;
                this.extraTime = data.extraTime;
                this.animation = data.animation;
                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
    
                for(var key in data.teamReward)
                {
                    let itemCfg:ArenaTeamRewardItemCfg;
                    let id = Number(key) + 1;
                    if(!this.teamReward[id])
                    {
                        this.teamReward[id]=new ArenaTeamRewardItemCfg();
                    }
                    itemCfg=this.teamReward[id];
                    itemCfg.initData(data.teamReward[key]);
                    itemCfg.id=id;
                }

                for(var key in data.rankReward)
                {
                    let itemCfg:ArenaRankRewardItemCfg;
                    let id = Number(key) + 1;
                    if(!this.rankReward[id])
                    {
                        this.rankReward[id]=new ArenaRankRewardItemCfg();
                    }
                    itemCfg=this.rankReward[id];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id=id;
                }

                for(var key in data.recharge)
                {
                    let itemCfg:ArenaRechargeItemCfg;
                    let id = Number(key) + 1;
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new ArenaRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                for(var key in data.task)
                {
                    let itemCfg:ArenaTaskItemCfg;
                    let id = Number(key) + 1;
                    if(!this.task[id])
                    {
                        this.task[id]=new ArenaTaskItemCfg();
                    }
                    itemCfg=this.task[id];
                    itemCfg.initData(data.task[key]);
                    itemCfg.taskId=id;
                }

                for(var key in data.festivalMarket)
                {
                    let itemCfg:ArenaFestivalMarketItemCfg;
                    let id = Number(key) + 1;
                    if(!this.festivalMarket[id])
                    {
                        this.festivalMarket[id]=new ArenaFestivalMarketItemCfg();
                    }
                    itemCfg=this.festivalMarket[id];
                    itemCfg.initData(data.festivalMarket[key]);
                    itemCfg.sortId=id;
                }
            }   
            
            public getSkin(code) : string{
                let skinId = '';
                switch(Number(code)){
                    case 1:
                        skinId = '10342'
                        break;
                }
                return skinId;
            }
        }

        /**
         * --needMeter:前行距离（单位：米）
        --state:斗场状态
        --getReward:奖励
        */
        export class ArenaTeamRewardItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 前行距离（单位：米）
             */
            public needMeter:number;
             /**
             * 奖励
             */
            public state:number[];
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
        /** 
         *  --活动期间，砖块持有数量排名奖励
        --rank:排行榜上下限  例：{5,10} 第五名至第十名
        --getReward:奖励
        */
        export class ArenaRankRewardItemCfg extends BaseItemCfg
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
        /** 
         *  --活动期间累计充值奖励
        --needGem:所需额度：单位（元宝）
        --specialItem:特殊道具：水瓢
        --getReward:奖励
        */
        export class ArenaRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 所需额度：单位（元宝）
             */
            public needGem:number;
            /**
             * 特殊道具：水瓢
             */
            public specialItem:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
        /** 
         *  --活动期间活跃任务   注：每日不重置
        --openType:跳转
        --questType:任务类型  特殊类型：1--登录X天
        --value:进度
        --shuipiaoGet:获得水瓢
        --getReward:奖励
        */
        export class ArenaTaskItemCfg extends BaseItemCfg
        {
            /**
             * 任务id
             */
            public taskId:number;
    
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
              获得特殊道具
             */
            public shuipiaoGet:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]{
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
        /**
         *  --节日商店
        --limit:购买次数限制
        --originalCost:原价
        --needGem:所需元宝
        --discount:折扣
        --goods:商品内容
         * */
        export class ArenaFestivalMarketItemCfg extends BaseItemCfg
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