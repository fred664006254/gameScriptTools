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
		export let costItem:string=`1`;

		//每1位红颜册封加成
		export let talentStatusBuff: number;
			
		//--匹配区间：排名
		export let rankRange : number[];

		//--红颜连胜上限
		export let battleTime : number;

		//--显示最近X条对战记录
		export let dataParameter : number;

		// 	--每次对战获胜分数奖励  score红颜对战分数  胜利分数 = 胜利基础分数 + 击败人数 * 奖励分数
		// --victoryScoreBaseParam:基础分
		// --victoryScoreNumParam:奖励分
		export let victoryScore : any;
    
		// --每次对战失败分数奖励  score红颜对战积分数  失败分数 = 失败基础分数 + 击败人数 * 奖励分数
		// --victoryScoreBaseParam:基础分
		// --victoryScoreNumParam:奖励分
		export let lostScore : any;
    
		// --每次获胜兑换积分奖励  score红颜对战积分  胜利积分 = 胜利基础积分 + 战胜人数 * 奖励积分
		// --victoryScoreBaseParam:基础分
		// --victoryScoreNumParam:奖励分
		export let victoryPoint : any;
    
		// --每次失败兑换积分奖励  score红颜对战积分  失败积分 = 失败基础积分 + 失败击杀人数 * 奖励积分
		// --victoryScoreBaseParam:基础分
		// --victoryScoreNumParam:奖励分
		export let lostPoint : any;

		// --每1位参战红颜战斗结束后增加红颜经验
    	export let  wifeExpAdd : number;
		// --每1位参战红颜战斗结束后增加红颜经验
		export let buffAdd : number;
    

        export let shop:any;
		export let shopList:WifebattleShopItemCfg[]=[];
		export let yongleCanon:any;
		export let yongleCanonList:WifebattleStudyItemCfg[]=[];

		export let rankBuff:number = 0;
		export let extraTime:number;
		export let wifeBattleBuff:{artistryRange:number[],rankBuff:number}[] = [];

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
		/*
		--永乐宝典
    --scoreNeed:升级需要的红颜擂台分数
    --servantID:加成门客
    --abilityID:加成资质
    --unlock:解锁条件。册封人数达到*/
		public id:string;
		public scoreNeed:number;
		public servantID:number;
		public abilityID:number;
		public unlock:number;
		public costNum:number;

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

		public costScore:number;

		public limitType:number;

		public limitNum:number;

		/**
		 * 物品内容
		 */
		public item:string;

		public get itemCfg():ItemItemCfg
		{
			return Config.ItemCfg.getItemCfgById(this.item.split("_")[1]);
		}

		public get name():string
		{
			let name = ``;
			if(this.itemCfg){
				name = this.itemCfg.name;
			}
			return name;
		}

		public get iconContainer():BaseDisplayObjectContainer
		{
			let obj = new BaseDisplayObjectContainer();
			if(this.itemCfg){
				obj = this.itemCfg.getIconContainer(true);
			}
			return obj;
		}

		public getNeedScoreByNum():number
		{
			return this.limitNum;
		}
	}

}