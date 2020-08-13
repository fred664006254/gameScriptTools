namespace Config
{
	export namespace AcCfg
	{
		export class BlackMarketCfg 
		{
            private bankBox:any =null;
            private blackMarket:any =null;
            private courier:any =null;
            private gamble:any =null;
            private hotel:any =null;
            private marry:any =null;
            // private rechargeBoxItemListCfg:RechargeBoxItemCfg2[] = [];
			private blackMarketListCfg:BlackItemsListItemCfg[] = []; 
			// public itemsList:Object={};
			   /** 展示时间 */
            public extraTime : number = 0;
			public formatData(data:any):void
			{
				for(var key in data)
				{  
                    if(data.blackMkt)
                    {
                        this.blackMarket = data.blackMkt;
						this.initBlackMarket();
                    } 
					if(data.extraTime)
					{
						this.extraTime =data.extraTime;
					}
				}
			}  
			private initBlackMarket():void
			{ 
				 for(var key in this.blackMarket){
                    let itemCfg:BlackItemsListItemCfg;
                    if(!this.blackMarketListCfg.hasOwnProperty(String(key)))
                    {
                       this.blackMarketListCfg[String(key)]=new BlackItemsListItemCfg();
                    }
                    itemCfg=this.blackMarketListCfg[String(key)];
                    itemCfg.initData(this.blackMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }
			} 
			public getBlackMarketArr():BlackItemsListItemCfg[]
			{
				// let arr:BlackItemsListItemCfg[] = [];
				// for(let i = 0;i<this.blackMarket.length;i++)
				// {
				// 	arr.push(this.blackMarket[i])
				// }
				return this.blackMarketListCfg;

			} 

            // public getBoxListData():RechargeBoxItemCfg2[]
			// {
			// 	let arr:RechargeBoxItemCfg2[] = [];
			// 	for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
			// 	{
			// 		if(i == 0)
			// 		{
			// 			arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - 1]);
			// 		}
			// 		else if(i == 1)
			// 		{
			// 			arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1]);
			// 		}
			// 		else
			// 		{
			// 			arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - i]);
			// 		} 
			// 	}
			// 	return arr;
			// }

			// /**
			//  * 通过id取当前的cfg
			//  */
			// public getBoxData(gears:string):RechargeBoxItemCfg
			// {
			// 	for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
			// 	{
			// 		let boxData = this.rechargeBoxItemListCfg[i];
			// 		if(boxData.needGem == gears)
			// 		{
			// 			return boxData;
			// 		}
			// 	}
			// } 
		}   
	} 
		export class BlackItemsListItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 限购次数 
             */
            public limit2:number;
            /*
            道具原价
            */
            public price:number;
            /*
            折扣
            */
            public rebate:number;
            /**
             * 内容和数量
             */
            public item:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.item,true,false);
            }
      }
}
