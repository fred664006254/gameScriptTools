namespace Config
{
	/**
	 * 红颜配置
	 */
	export namespace WifebattleCfg 
	{

        /**
		 * 服务器解锁条件  拥有 X 个玩家的红颜被册封
		 */
		export let unlock_player:number;
		/**
		 * 个人解锁条件  拥有红颜册封的星级大于等于X
		 */
		export let unlock_wifeStar:number;

		/**
		 * 每日对战次数
		 */
		export let dailyNum:number;

		/**
		 * 每次间隔时间 单位（秒）
		 */
		export let intervalTime:number;

		/**
		 * 对战消耗道具
		 */
		export let fightAdd:string;

		/**
		 * 学习用了大典消耗道具
		 */
		export let itemCostID:string;

		/**
		 * 红颜连续战斗次数
		 */
		export let battleTime:number;
		//每1位红颜册封加成
		export let talentStatusBuff: number;

        export let shop:any;
		export let shopList:WifebattleShopItemCfg[]=[];
		export let yongleCanon:any;
		export let yongleCanonList:WifebattleStudyItemCfg[]=[];
		export function getWifeStudyCfgList()
		{
			return yongleCanonList;
		}
		export function getWifeStudyCfgById(id:string|number):WifebattleStudyItemCfg
		{
			if(Number(id) > yongleCanonList.length){
				return null;
			} else {
				return yongleCanonList[Number(id)-1];
			}
			
		}
		export function getShopItemById(id:string|number):WifebattleShopItemCfg
		{
			return shop[id];
		}
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				if(key=="shop")
				{
					let shopData=data[key];
					WifebattleCfg["shop"] = data["shop"];
					for(let shopkey in shopData)
					{
						let wifebattleShopItemCfg:WifebattleShopItemCfg=new WifebattleShopItemCfg();
						wifebattleShopItemCfg.initData(shopData[shopkey]);
						wifebattleShopItemCfg.id=String(shopkey);
						shop[shopkey]=wifebattleShopItemCfg;
						shopList.push(wifebattleShopItemCfg);
					}
					shopList.sort((a,b)=>{
						return Number(a.id)-Number(b.id);
					});
				} else if(key == "yongleCanon") {
					yongleCanon = data[key];
					for(let yonglekey in yongleCanon)
					{
						let itemCfg: WifebattleStudyItemCfg = new WifebattleStudyItemCfg();
						itemCfg.initData(yongleCanon[yonglekey]);
						itemCfg.id = String(yonglekey);
						yongleCanonList.push(itemCfg);
					}
					yongleCanonList.sort((a,b)=>{
						return Number(a.id)-Number(b.id);
					});


				} else {
					WifebattleCfg[key]=data[key];
				}
				
			}
			
		}
	}
	export class WifebattleStudyItemCfg extends BaseItemCfg
	{
		public id:string;
		public itemCost:number;
		public wifeSkillExp:number;
		public wifeStatusNum:number;


	}
	/**
	 * boss商店
	 */
	export class WifebattleShopItemCfg extends BaseItemCfg
	{
		/**
		 * 积分id
		 */
		public id:string;

		public cost:number;

		public limitType:number;

		public limitNum:number;

		/**
		 * 物品内容
		 */
		public sell:string;

		public get itemCfg():ItemItemCfg
		{
			return ItemCfg.getItemCfgById(this.sell.split("_")[1]);
		}

		public get name():string
		{
			return this.itemCfg.name;
		}

		public get iconContainer():BaseDisplayObjectContainer
		{
			return this.itemCfg.getIconContainer(true);
		}

		public getNeedScoreByNum():number
		{
			return this.limitNum;
		}
	}

}