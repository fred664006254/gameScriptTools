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
				if(Api.switchVoApi.checkOpenDailyActivityHeightTap()){
					//打开高档开关
					return this.itemListCfg; 
					
				} else {
					//关闭高档开关 "128":true,
					let heightTap:Object = {};//{"128":true,"328":true,"648":true};
					if(PlatformManager.checkIsWxSp() || PlatformManager.checkIsH5lySp()|| PlatformManager.checkIsQQXYXSp()){
						heightTap = {"128":true,"328":true,"648":true};
					} else if(PlatformManager.checkIsViSp()){
						heightTap = {"19.99":true,"49.99":true,"99.99":true};
					}
					let resultListCfg:Object = {};
					let itemObj = null;
					for(let key in this.itemListCfg){
						itemObj = this.itemListCfg[key];
						let rechargecfgObj = Config.RechargeCfg.getRechargeItemCfgByKey(itemObj.cost);
						//如果不是需要屏蔽的档位
						if(!heightTap[rechargecfgObj.cost+""]){
							resultListCfg[key] = this.itemListCfg[key];
						}
					}
					return resultListCfg;
				}
				

				
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