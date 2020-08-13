namespace Config
{
	/**
	 * 充值配置
	 */
	export namespace RechargeCfg 
	{

		/**
		 * 充值配置是否已经初始化
		 */
		let isInit:boolean=false;
		let moneyNameCfg={
			wanba:{QZ1:"星币",SQ1:"星币",QZ2:"星币",SQ2:"秀币",QQLive1:"星币",QQLive2:"秀币"}
		};

		export function getMoneyName():string
		{
			let moneyName:string;
			if(PlatformManager.checkIsWanbaSp() || PlatformManager.checkIsQQGameSp())
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
			else if(PlatformManager.checkisLocalPrice())
			{
				moneyName=GameData.platMoney;
			}
			return moneyName;
		}

		/**
		 * 安卓 1
		 * ios 2
		 */
		export let wanbaCfg={
			"g1":{
				"pid1":21237,"pid2":21229
			},
			"g2":{
				"pid1":21238,"pid2":21230
			},
			"g3":{
				"pid1":21239,"pid2":21231
			},
			"g4":{
				"pid1":21240,"pid2":21232
			},
			"g5":{
				"pid1":21241,"pid2":21233
			},
			"g6":{
				"pid1":21242,"pid2":21234
			},
			"g7":{ 
				"pid1":21243,"pid2":21235
			},
			"g8":{
				"pid1":21244,"pid2":21236
			},
			"g11":{
				"pid1":25196,"pid2":25197
			},
			"g12":{
				"pid1":25751,"pid2":25755
			},
			"g13":{
				"pid1":25752,"pid2":25756
			},
			"g14":{
				"pid1":25749,"pid2":25753
			},
			"g15":{
				"pid1":25750,"pid2":25754
			},
			"g16":{
				"pid1":36414,"pid2":36415
			},
			"g65":{"pid1":43277,pid2:43314},
			"g64":{"pid1":43276,pid2:43313},
			"g63":{"pid1":43275,pid2:43312},
			"g62":{"pid1":43274,pid2:43311},
			"g61":{"pid1":43273,pid2:43310},
			"g60":{"pid1":43272,pid2:43309},
			"g59":{"pid1":43271,pid2:43308},
			"g58":{"pid1":43270,pid2:43307},
			"g57":{"pid1":43269,pid2:43306},
			"g56":{"pid1":43268,pid2:43305},
			"g55":{"pid1":43267,pid2:43304},
			"g54":{"pid1":43266,pid2:43303},
			"g53":{"pid1":43265,pid2:43302},
			"g52":{"pid1":43264,pid2:43301},
			"g51":{"pid1":43263,pid2:43300},
			"g50":{"pid1":43262,pid2:43299},
			"g49":{"pid1":43261,pid2:43298},
			"g48":{"pid1":43260,pid2:43297},
			"g47":{"pid1":43259,pid2:43296},
			"g46":{"pid1":43258,pid2:43295},
			"g45":{"pid1":43257,pid2:43294},
			"g44":{"pid1":43256,pid2:43293},
			"g43":{"pid1":43255,pid2:43292},
			"g42":{"pid1":43254,pid2:43291},
			"g41":{"pid1":43253,pid2:43290},
			"g40":{"pid1":43252,pid2:43289},
			"g39":{"pid1":43251,pid2:43288},
			"g38":{"pid1":43250,pid2:43287},
			"g37":{"pid1":43249,pid2:43286},
			"g36":{"pid1":43248,pid2:43285},
			"g35":{"pid1":43247,pid2:43284},
			"g34":{"pid1":43246,pid2:43283},
			"g33":{"pid1":43245,pid2:43282},
			"g32":{"pid1":43244,pid2:43281},
			"g31":{"pid1":43243,pid2:43280},
			"g30":{"pid1":43242,pid2:43279},
			"g29":{"pid1":43241,pid2:43278},

			"g66":{"pid1":54958,pid2:54959},
			"g67":{"pid1":54960,pid2:54961},
			"g68":{"pid1":54962,pid2:54963},
			"g69":{"pid1":54964,pid2:54965},
			"g70":{"pid1":54966,pid2:54967},
			"g71":{"pid1":54968,pid2:54969},
			"g72":{"pid1":54970,pid2:54971},
			"g73":{"pid1":55584,pid2:55585},
			"g103":{"pid1":56357,"pid2":56358},
			"g79":{"pid1":56309,"pid2":56315},
			"g80":{"pid1":56310,"pid2":56316},
			"g81":{"pid1":56311,"pid2":56317},
			"g82":{"pid1":56312,"pid2":56318},
			"g83":{"pid1":56313,"pid2":56319},
			"g84":{"pid1":56314,"pid2":56320},
			"g85":{"pid1":56321,"pid2":56339},
			"g86":{"pid1":56322,"pid2":56340},
			"g87":{"pid1":56323,"pid2":56341},
			"g88":{"pid1":56324,"pid2":56342},
			"g89":{"pid1":56325,"pid2":56343},
			"g90":{"pid1":56326,"pid2":56344},
			"g91":{"pid1":56327,"pid2":56345},
			"g92":{"pid1":56328,"pid2":56346},
			"g93":{"pid1":56329,"pid2":56347},
			"g94":{"pid1":56330,"pid2":56348},
			"g95":{"pid1":56331,"pid2":56349},
			"g96":{"pid1":56332,"pid2":56350},
			"g97":{"pid1":56333,"pid2":56351},
			"g98":{"pid1":56334,"pid2":56352},
			"g99":{"pid1":56335,"pid2":56353},
			"g100":{"pid1":56336,"pid2":56354},
			"g101":{"pid1":56337,"pid2":56355},
			"g102":{"pid1":56338,"pid2":56356},
			"g110":{"pid1":57133,"pid2":57135},
			"g111":{"pid1":57233,"pid2":57237},
			"g112":{"pid1":57234,"pid2":57238},
			"g113":{"pid1":57235,"pid2":57239},
			"g114":{"pid1":57236,"pid2":57240},
			"g115":{"pid1":58051,"pid2":58052},

			"g118":{"pid1":59246,"pid2":59251},
			"g119":{"pid1":59247,"pid2":59252},
			"g120":{"pid1":59248,"pid2":59253},
			"g121":{"pid1":59249,"pid2":59254},
			"g122":{"pid1":59250,"pid2":59255},
			"g123":{"pid1":60372,"pid2":60375},
			"g165":{"pid1":60373,"pid2":60376},
			"g167":{"pid1":60374,"pid2":60377},
			"g171":{"pid1":62266,"pid2":62276},
			"g172":{"pid1":62267,"pid2":62277},
			"g173":{"pid1":62268,"pid2":62278},
			"g174":{"pid1":62269,"pid2":62279},
			"g175":{"pid1":62270,"pid2":62280},
			"g176":{"pid1":62271,"pid2":62281},
			"g177":{"pid1":62272,"pid2":62282},
			"g181":{"pid1":62273,"pid2":62283},
			"g182":{"pid1":62274,"pid2":62284},
			"g183":{"pid1":62275,"pid2":62285},
		};

		export function getAllProductid():string[]
		{
			let idArr:string[]=[];
			let orderidArr:string[]=[];
			try
			{
				for(let key in rechargeListCfg)
				{
					let itemCfg:RechargeItemCfg=rechargeListCfg[key];
					
					if((PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK()))
					{
						let data=window["OPEN_DATA"];
						let platform:string=data.platform;
						let app:string=data.qua.app;
						let productId=Config.RechargeCfg.wanbaCfg[itemCfg.id]["pid"+platform];
						orderidArr.push(productId);
					}
					else
					{
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
				if(itemCfg.costT2&&PlatformManager.checkIsThHw())
				{
					itemCfg.cost = itemCfg.costT2;
				}
				itemCfg.id=String(key);
			}
			isInit=true;
			formatLocalPriceCfg();
		}

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
					if(PlatformManager.checkIsShenHeYiWan() && (key=="g7"||key=="g8")){
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
			// for(let key in rechargeListCfg)
			// {
			// 	let itemCfg:RechargeItemCfg=rechargeListCfg[key];
			// 	if(itemCfg.id == id)
			// 	{
			// 		return itemCfg;
			// 	}
			// }
			// return null;
			return rechargeListCfg[id];
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

		/**
		 * 特殊档位，只获得VIP经验    
		 */
		public getVipExp:number;

		public constructor()
		{
			super();	
		}

		public get name():string 
		{
			return LanguageManager.getlocal("rechargeName_" + this.id);
		}

		public get desc():string 
		{
			return LanguageManager.getlocal("rechargeDesc_" + this.id);
		}
	}
}