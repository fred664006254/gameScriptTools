namespace Config
{
	/**
	 * 充值配置
	 */
	export namespace RechargeCfg 
	{
		let moneyNameCfg={
			wanba:{QZ1:"星币",SQ1:"星币",QZ2:"星币",SQ2:"秀币"}
		};

		export function getMoneyName():string
		{
			let moneyName:string;
			if(PlatformManager.checkIsWanbaSp())
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
			return moneyName;
		}

		export function getAllProductid():string[]
		{
			let idArr:string[]=[];
			let orderidArr:string[]=[];
			try
			{
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];
					
					if(itemCfg.orderid)
					{
						orderidArr.push(itemCfg.orderid);
					}
					else
					{
						idArr.push(itemCfg.id);
					}
					
				}
			}
			catch(e)
			{

			}
			if(orderidArr&&orderidArr.length>0)
			{
				return orderidArr;
			}
			return idArr;
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
				itemCfg.id=String(key);
			}
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
					if(PlatformManager.checkIs37WdShenheSp() && (key=="g7"||key=="g8")){
						itemCfg.sortId = key=="g7" ? 9 : 10; 
					}
					if(itemCfg.sortId)
					{
						normalRechargeListCfg.push(itemCfg);
					}
					if(Api.switchVoApi.checkOpenAuditFile()&&key=="g11"&&PlatformManager.checkIsJPSp())
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
		 * 获取37审核充值档
		 */
		export function get37wdShenHeRechargeCfg():RechargeItemCfg[]
		{
			if(normalRechargeListCfg==null)
			{
				normalRechargeListCfg=[];
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];
					let gemCost = Number(itemCfg.gemCost);
					if(PlatformManager.checkIs37WdShenheSp() && (key=="g7"||key=="g8")){
						itemCfg.sortId = key=="g7" ? 9 : 10; 
					}
					if(key=="g9"||key=="g10"||key=="g12"||key=="g13"||key=="g14"||key=="g15"
					||key=="g17"
					||key=="g18"||key=="g19"||key=="g20"||key=="g21"||key=="g22"||key=="g23"||key=="g24"
					||key=="g25"||key=="g26"||key=="g27"||key=="g28"
					)
					{
						continue;
					}
					normalRechargeListCfg.push(itemCfg);
					
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

		/**
		 * 获取第一个充值宝箱
		 */
		export function rewardList1():Array<RewardItemVo>
		{
			// let rewardStr = rechargeListCfg["g9"].getReward;
			let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			let rewards =  "1_1_"  +cfg11.gemCost + "|" + cfg11.getReward;
			return GameData.formatRewardItem(rewards);
		}

		/**
		 * 获取第二个充值宝箱
		 */
		export function rewardList2():Array<RewardItemVo>
		{
			// let rewardStr = rechargeListCfg["g10"].getReward;
			let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
			let rewards =  "1_1_"  +cfg11.gemCost + "|" + cfg11.getReward;
			return GameData.formatRewardItem(rewards);
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

		public constructor()
		{
			super();	
		}
	}
}