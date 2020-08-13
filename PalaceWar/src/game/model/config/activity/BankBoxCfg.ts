namespace Config
{
	export namespace AcCfg
	{
		export class BankBoxCfg 
		{
            private bankBox:any =null;
            private blackMarket:any =null;
            private courier:any =null;
            private gamble:any =null;
            private hotel:any =null;
            private marry:any =null;
            private rechargeBoxItemListCfg:RechargeBoxItemCfg2[] = [];
			private blackMarketListCfg:BlackItemsListItemCfg[] = []; 
			public itemsList:Object={};
			public extraTime : number = 0;
			public formatData(data:any):void
			{	
				if(data.extraTime)
				{
					this.extraTime =data.extraTime;
				}
				
				for(var key in data.boxList)
				{
					let itemCfg:RechargeBoxItemCfg2;
					if(!this.rechargeBoxItemListCfg.hasOwnProperty(String(key)))
					{
						this.rechargeBoxItemListCfg[String(key)]=new RechargeBoxItemCfg2();
					}
					itemCfg=this.rechargeBoxItemListCfg[String(key)];
					itemCfg.initData(data.boxList[key]);
					itemCfg.id = Number(key) + 1;
				}
			}  
			 
			public getBlackMarketArr():BlackItemsListItemCfg[]
			{
				let arr:BlackItemsListItemCfg[] = [];
				for(let i = 0;i<this.blackMarket.length;i++)
				{
					arr.push(this.blackMarket[i])
				}
				return arr;

			} 

            public getBoxListData():RechargeBoxItemCfg2[]
			{
				let arr:RechargeBoxItemCfg2[] = [];
				for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
				{
					if(i == 0)
					{
						arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - 1]);
					}
					else if(i == 1)
					{
						arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1]);
					}
					else
					{
						arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - i]);
					} 
				}
				return arr;
			}

			/**
			 * 通过id取当前的cfg
			 */
			public getBoxData(gears:string):RechargeBoxItemCfg
			{
				for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
				{
					let boxData = this.rechargeBoxItemListCfg[i];
					if(boxData.needGem == gears)
					{
						return boxData;
					}
				}
			} 
		}   
	}
    export class RechargeBoxItemCfg2 extends BaseItemCfg
		{
            /**充值档位ID */
			public id:number;
			/**
			 * 所需充值档位
			 */
			public needGem:string;
            /**
			 * 可获得奖励次数
			 */
			public limit:string;
			/**
			 * 固定道具奖励
			 */
			public getReward:string;

		}

	 
}
