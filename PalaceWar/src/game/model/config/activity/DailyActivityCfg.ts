namespace Config
{
	export namespace AcCfg
	{
		export class DailyActivityCfg 
		{
			private itemListCfg:Object={};
			public formatData(data:any):void
			{
                if(data && data.dailyActivity){
                    let dailyActivity = data.dailyActivity
                    for(var key in dailyActivity)
                    {
                        let itemCfg:DailyActivityItemCfg;
                        if(!this.itemListCfg.hasOwnProperty(String(key)))
                        {
                            this.itemListCfg[String(key)]=new DailyActivityItemCfg();
                        }
                        itemCfg=this.itemListCfg[String(key)];
                        itemCfg.initData(dailyActivity[key]);
                        itemCfg.id=String(key);
                    }
                }
			}
			public getList()
			{
				return this.itemListCfg;
			}
			public getRechargeItemById(id:string)
			{
				return this.itemListCfg[id];
			}
		}

		export class DailyActivityItemCfg extends BaseItemCfg
		{
			/**
			 * 档位
			 */
			public id:string;
			/**
			 * 需要充值的数值
			 */
            public cost:string;
			
			/**
			 * 每一档对应购买次数限制
			 */
			public limit:number;
            public show:number;
		}
	}
}