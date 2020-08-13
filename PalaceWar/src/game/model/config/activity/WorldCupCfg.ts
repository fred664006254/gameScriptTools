namespace Config
{
	export namespace AcCfg
	{
		export class WorldCupCfg 
		{
			/**
			 * 玩家每天达到X活跃度可获得100足球币
			 */
			public needAct:number = 0;
			/**
			 * 玩家每天达到120活跃度可获得足球币数量
			 */
			public giftCoin:number = 0;

			/**
			 *单次购买可获得足球币的数量
			 */
			public coinNum:number = 0;

			/**
			 * 购买一次需要花费的元宝
			 */
			public cost:number = 0;

			/**
			 * --每天最多购买次数
			 */
            public maxBuy:number = 0;
            
            /**
			 * 每次竞猜需要的足球币限制（每次竞猜都必须是100足球币的倍数）
			 */
            public coinLimit:number = 0;

			/**
			 *  竞猜错误返还足球币比例
			 */
			public ratio1:number = 0;

			/**
			 *每天赔率
			 */
            public odds:any[]=[];
            
			/**
			 * 活动商店
             *  --limit：购买次数限制
                --originalCost：原价（单位：元宝）
                --needCoin：所需足球币
                --discount：折扣
                --goods：商品内容
			 */
            public actMarket:Object={};
            /**
			--国家列表
                --countryName：国家简称
			 */
            public country:any[]=[];
            
            public formatData(data:any):void
            {
                for(let key in data){
                    if(typeof this[key] != 'undefined' && key != 'actMarket'){
                        this[key] = data[key];
                    }
                };

                for(var key in data.actMarket)
                {
                    let itemCfg : WorldCupMarketItemCfg;
                    if(!this.actMarket.hasOwnProperty(String(key)))
                    {
                        this.actMarket[String(key)] = new WorldCupMarketItemCfg();
                    }
                    itemCfg = this.actMarket[String(key)];
                    itemCfg.initData(data.actMarket[key]);
                    itemCfg.sortId = Number(key);
                }
            }    
        }
        
        class WorldCupMarketItemCfg extends BaseItemCfg
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
            所需足球币
            */
            public needCoin:number;
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