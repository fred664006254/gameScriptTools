namespace Config
{
	export namespace AcCfg
	{
		export class WishTreeCfg 
		{
            //单抽消耗：X元宝
            public cost1:string="";
            public cost2:string="";

            //兑换所需道具（皮肤券）  已拥有此皮肤后，不可再次兑换
            public shopItemList={};
            
            public ownList =[];
            public notOwnList=[];

            public formatData(data:any):void
			{
				if(data)
				{
                    this.cost1 = data.cost1;
                    this.cost2 = data.cost2;

					for(var key in data.shop)
					{
                        let itemCfg:WishTreeShopItem = this.shopItemList[key]
                        if (!itemCfg)
                        {
                            itemCfg = new WishTreeShopItem();
                            this.shopItemList[key]= itemCfg;
                        }
						itemCfg.initData(data.shop[key]);
                        itemCfg.id = key;
					}
                    

				}
			}

            public dealList()
            {
                this.notOwnList = [];
                this.ownList = [];
                for (var key in this.shopItemList) {
                    let item:WishTreeShopItem = <WishTreeShopItem>this.shopItemList[key];
                    if(!Api.wifeVoApi.getWifeInfoVoById(item.wifeId))
                    {
                        this.notOwnList.push(item);
                    }else{
                        this.ownList.push(item);
                    }
                }
            }
            /**
             * 获取可购买的红颜id列表
             */
            public getWishWifeIdList()
            {
                this.dealList();
                return  this.notOwnList.concat( this.ownList);
            }

            public getLastWishTimes()
            {
                this.dealList();
                return this.notOwnList.length;
            }

            public getMaxTimes()
            {
                return Object.keys(this.shopItemList).length;
            }
            // public getShowDataList()
            // {
            //     let list1 = [];
            //     let list2 = [];
            //     let idList = this.getWishWifeIdList();
            //     for (var index = 0; index < idList.length; index++) {
            //         if(Api.wifeVoApi.getWifeInfoVoById(idList[index]))
            //     }
            //     return resData;
            // }
            /**
             * 根据id取配置
             */
            public getWishCfgById(id:string)
            {
                return this.shopItemList[id];
            }
        }

        export class WishTreeShopItem  extends BaseItemCfg
		{
            public id:string = "";
            public wifeId:string = "";
            public needItem:string = "";
            public needNum:number = 0;

        }
	}
}