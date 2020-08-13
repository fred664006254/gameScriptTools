namespace Config
{
	export namespace AcCfg
	{
		export class TwAnniversaryCfg 
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

			public formatData(data:any):void
			{
				for(var key in data)
				{ 
                    if(data.bankBox)
                    {
                        this.bankBox = data.bankBox;
                        this.initBox()
                    } 
                    if(data.blackMarket)
                    {
                        this.blackMarket = data.blackMarket;
						this.initBlackMarket();
                    }
                    if(data.courier)
                    {
                        this.courier = data.courier;
                    }
                    if(data.gamble)
                    {
                        this.courier = data.gamble;
                    }
                    if(data.hotel)
                    {
                        this.courier = data.hotel;
                    }
                    if(data.marry)
                    {
                        this.courier = data.marry;
                    }  
				}
			} 
            private initBox()
            {

                for(var key in this.bankBox.boxList)
				{
					let itemCfg:RechargeBoxItemCfg2;
					if(!this.rechargeBoxItemListCfg.hasOwnProperty(String(key)))
					{
						this.rechargeBoxItemListCfg[String(key)]=new RechargeBoxItemCfg2();
					}
					itemCfg=this.rechargeBoxItemListCfg[String(key)];
					itemCfg.initData(this.bankBox.boxList[key]);
					itemCfg.id = Number(key) + 1;
				}

            }
			
			private initBlackMarket():void
			{ 
				 for(var key in this.blackMarket.blackMkt){
                    let itemCfg:BlackItemsListItemCfg;
                    if(!this.blackMarketListCfg.hasOwnProperty(String(key)))
                    {
                       this.blackMarketListCfg[String(key)]=new BlackItemsListItemCfg();
                    }
                    itemCfg=this.blackMarketListCfg[String(key)];
                    itemCfg.initData(this.blackMarket.blackMkt[key]);
                    itemCfg.id = Number(key) + 1;
                }
			} 
			public getBlackMarketArr():BlackItemsListItemCfg[]
			{
				let arr:BlackItemsListItemCfg[] = [];
				for(let i = 0;i<this.blackMarket.blackMkt.length;i++)
				{
					arr.push(this.blackMarket.blackMkt[i])
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
    
		
		 
}
