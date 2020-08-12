namespace Config
{
	/**
	 * 充值配置
	 */
	export namespace RechargeCfg 
	{

		/**
		 * 货币类型
		 */
		export let moneyType:string="CNY";

		/**
		 * 充值配置是否已经初始化
		 */
		let isInit:boolean=false;
		// let orderIdData:{[key:string]:string}=null;
		let moneyNameCfg={
			wanba:{QZ1:"星币",SQ1:"星币",QZ2:"星币",SQ2:"秀币",QQLive1:"星币",QQLive2:"秀币"}
		};

		export function getMoneyName():string
		{
			let moneyName:string;
			if(PlatMgr.checkIsWanbaSp() || PlatMgr.checkIsQQGameSp())
			{
				try
				{
					let data=window["OPEN_DATA"];
					let platform:string=data.platform;
					let app:string=data.qua.app;
					moneyName=moneyNameCfg.wanba[app+platform];
				}
				catch(e)
				{
					
				}
			}
			else if(PlatMgr.checkisLocalPrice())
			{
				moneyName=GameData.platMoney;
			}
			return moneyName;
		}

		let normalRechargeListCfg:RechargeItemCfg[];
		let rechargeListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:RechargeItemCfg;
				if(!rechargeListCfg.hasOwnProperty(String(key)))
				{
					rechargeListCfg[String(key)]=new RechargeItemCfg();
				}
				itemCfg=rechargeListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.orderid=getOrderId(key);
				if(moneyType)
				{
					itemCfg.cost=data[key][moneyType];
				}
				itemCfg.id=String(key);
			}
			isInit=true;
			formatLocalPriceCfg();
		}

		function getOrderId(id:string):string
		{
			let orderId=id;
			let nid=Number(id.replace("g",""));
			let idx = Math.floor(nid/100);
			if(idx)
			{
				orderId="gift"+idx;
			}
			return orderId;
		}

		// export function formatOrderid(oData:{[key:string]:string}):void
		// {
		// 	if(isInit)
		// 	{
		// 		for(let key in oData)
		// 		{
		// 			if(oData.hasOwnProperty(key))
		// 			{
		// 				let itemCfg:RechargeItemCfg=rechargeListCfg[key];
		// 				if(itemCfg)
		// 				{
		// 					itemCfg.orderid=oData[key];
		// 					itemCfg.cost=itemCfg[moneyType];
		// 				}
		// 			}
		// 		}
		// 	}
		// 	// else
		// 	// {
		// 	// 	orderIdData=oData;
		// 	// }
		// }

		export function formatLocalPriceCfg():void
		{
			if(isInit&&(GameData.platMoneyData||GameData.platMoneyData2))
			{	
				//"productNo":string,"price":string,"currency":string
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];

					if (GameData.platMoneyData)
					{
						let platCfg:{"productNo":string,"price":string,"currency":string}=itemCfg.orderid?GameData.platMoneyData[itemCfg.orderid]:null;
						if(platCfg)
						{
							itemCfg.platFullPrice=platCfg.price;
						}
					}
					let pricestr:string = String(itemCfg.cost);
					if (GameData.platMoneyData2 && GameData.platMoneyData2[pricestr])
					{	
						let oneprice = GameData.platMoneyData2[pricestr];
						itemCfg.platFullPrice=oneprice.priceLocaleSymbol+oneprice.price;
					}
				}
			}
		}
		/**
		 * 获取特权充值档位
		 */
		export function getSpecailVipList():string[]{
			let arr : any[] = [`g7`, `g8`];
			let list = Config.ShopCfg.getBuyExpressionShopList();
			arr = arr.concat(list);
			return arr;
		}

		/**
		 * 获取普通充值档
		 */
		export function getNormalRechargeCfg():RechargeItemCfg[]
		{
			if(normalRechargeListCfg==null)
			{
				normalRechargeListCfg=[];
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];
					let gemCost = Number(itemCfg.gemCost);
					if(PlatMgr.checkIsShenHeYiWan() && (key=="g7"||key=="g8")){
						itemCfg.sortId = key=="g7" ? 9 : 10;
						
					}
					if(itemCfg.sortId)
					{
						normalRechargeListCfg.push(itemCfg);
					}
					
				}
				normalRechargeListCfg.sort((a:RechargeItemCfg,b:RechargeItemCfg)=>{
					return a.sortId<b.sortId?1:-1;
				});
			}
			return normalRechargeListCfg;
		}

		/**
		 * 根据key取对应档位的配置
		 * @param key 
		 */
		export function getRechargeItemCfgByKey(id:string):RechargeItemCfg
		{
			for(let key in rechargeListCfg)
			{
				let itemCfg:RechargeItemCfg=rechargeListCfg[key];
				if(itemCfg.id == id)
				{
					return itemCfg;
				}
			}
			return null;
		}

		export function getPlatFullPriceById(id:string):string
		{
			let itemcfg=getRechargeItemCfgByKey(id);
			return itemcfg?itemcfg.platFullPrice:"";
		}
	}

	export class RechargeItemCfg extends BaseItemCfg
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
		 * 购买钻石
		 */
		public gemCost:number = 0;

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

		/**
		 * 推荐 0,1
		 */
		public recommend:number;

		/**
		 * 渠道对应的充值档id
		 */
		public orderid:string;

		/**
		 * 权势礼包奖励
		 */
		public getReward:string;

		/**
		 * 权势礼包奖励持续时间
		 */
		public lastTime:number;

		/**
		 * 平台完整价格 "USD 6"
		 */
		public platFullPrice:string;
		
		/**
		 * 上一个档位
		 */
		public lastID:string;

		/**
		 * 最大购买次数
		 */
		public maxNum:number;
		/**
		 * 每日购买上限
		 */
		public oneDayLimit:number;

		public constructor()
		{
			super();	
		}

		public get name():string 
		{
			return LangMger.getlocal("rechargeName_" + this.id);
		}

		public get desc():string 
		{
			return LangMger.getlocal("rechargeDesc_" + this.id);
		}
	}
}