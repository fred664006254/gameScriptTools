namespace Config
{
	/**
	 * 第三方充值配置
	 */
	export namespace ExtraRechargeCfg 
	{ 
		let normalRechargeListCfg:ExtraRechargeItemCfg[];
		let rechargeListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:ExtraRechargeItemCfg;
				if(!rechargeListCfg.hasOwnProperty(String(key)))
				{
					rechargeListCfg[String(key)]=new ExtraRechargeItemCfg();
				}
				itemCfg=rechargeListCfg[String(key)];
				itemCfg.initData(data[key]); 
				 
				itemCfg.id=String(key);
			}  
		}

	 

		/**
		 * 获取普通充值档
		 */
		export function getNormalRechargeCfg():ExtraRechargeItemCfg[]
		{
			if(normalRechargeListCfg==null)
			{
				normalRechargeListCfg=[];
				for(let key in rechargeListCfg)
				{
					let itemCfg:ExtraRechargeItemCfg=rechargeListCfg[key];
					let gemCost = Number(itemCfg.gemCost);
					 
					if(itemCfg.isAndroidOnly)
					{
						normalRechargeListCfg.push(itemCfg);
					}
					
				}
				normalRechargeListCfg.sort((a:ExtraRechargeItemCfg,b:ExtraRechargeItemCfg)=>{
					return a.sortId<b.sortId?-1:1;
				});
			}
			return normalRechargeListCfg;
		} 
	}

	export class ExtraRechargeItemCfg extends BaseItemCfg
	{
		/**
		 * 充值档位
		 */
		public id:string;
		
		/**
		 * 价格
		 */
		public cost:number;

		/**
		 * 价格2 (泰铢)
		 */
		public costT2:number;
		/**
		 * 购买钻石
		 */
		public gemCost:number;

		/**
		 * 首充赠送
		 */
		public firstGet:number;

		/**
		 * 首充之后赠送
		 */
		public secondGet:number;

		/**
		 * 月卡天数
		 */
		public dayCount:number;

		/**
		 * 每日获得
		 */
		public dayGet:number;

		/**
		 * 购买上限
		 */
		public dayLimit:number;

		/**
		 * 显示顺序
		 */
		public sortId:number; 

	 
		public isAndroidOnly:string;

		public constructor()
		{
			super();	
		}
	}
}
