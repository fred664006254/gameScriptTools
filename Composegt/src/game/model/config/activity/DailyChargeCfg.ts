namespace Config
{
	export namespace AcCfg
	{
		export class DailyChargeCfg 
		{
			private itemListCfg:Object={};
			public formatData(data:any):void
			{
				for(var key in data)
				{
					let itemCfg:DailyChargeItemCfg;
					if(!this.itemListCfg.hasOwnProperty(String(key)))
					{
						this.itemListCfg[String(key)]=new DailyChargeItemCfg();
					}
					itemCfg=this.itemListCfg[String(key)];
					itemCfg.initData(data[key]);
					itemCfg.id=String(key);
				}
			}
			public getList()
			{
				let dailyExtraVo = Api.acVoApi.getActivityVoByAidAndCode("dailyChargeExtra");
				if (dailyExtraVo)
				{
					let dailyVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
					if(dailyExtraVo.st <= GameData.serverTime && dailyExtraVo.et >= GameData.serverTime && dailyVo.st == dailyExtraVo.st){
						let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("dailyChargeExtra",dailyExtraVo.code);
						if (cfgObj)
						{
							let extraList = cfgObj.getList();
							for (var key in this.itemListCfg) 
							{
								let tmpCfg = this.itemListCfg[key];
								if(extraList[key] && extraList[key].reward != ""){
									tmpCfg.reward = tmpCfg.reward+'|'+extraList[key].reward;
									extraList[key].reward = "";
								} 
							}
						}
					}
				}
				return this.itemListCfg;
			}
			public getRechargeItemById(id:string)
			{
				return this.itemListCfg[id];
			}
		}

		export class DailyChargeItemCfg extends BaseItemCfg
		{
			/**
			 * 档位
			 */
			public id:string;
			/**
			 * 需要充值的数值
			 */
			public needGem:number;

			/**
			 * 每一档对应奖励
			 */
			public reward:string;
			public isSpecial:number;
		}
	}
}