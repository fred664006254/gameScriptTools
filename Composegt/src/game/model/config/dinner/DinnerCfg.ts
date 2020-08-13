

namespace Config {

	/**
	 * 婚宴配置
	 */
	export namespace DinnerCfg
	{	
		/**
		 * 宴会解锁所需官职
		 */
		let needLv:number;

		/**
		 * 每日赴宴的次数上限
		 */
		let goToFeastNum:number;

		/**
		 * 商店刷新时间 单位：秒
		 */
		let shopReTime:number;

		/**
		 * 商店刷新次数 每日重置
		 */
		let shopReset:number;

		/**
		 * 商店每次刷新物品 相同物品可重复
		 */
		let shopItemNum:number;

		/**
		 * 商店刷新消耗
		 */
		let shopNeedGem:number[];

		//高级赴宴vip限制1 
		let needVip: number;

		//高级赴宴vip限制2
		let joinLv: number;

		/**
		 * 宴会列表
		 */
		let feastList:Object={};
		/**
		 * 参与宴会列表
		 */
		let goToFeastList:Object={};
		/**
		 * 商店物品列表
		 */
        let shopList:Object={};


		/**
		 * 商店刷新次数 每日重置
		 */
		let serverShopReset:number;

		/**
		 * 商店刷新消耗
		 */
		let serverShopNeedGem:number[];

		/**
		 * 跨服商店物品列表
		 */
        let serverShopList:Object={};

		let needItem:string = null;

		export function formatData(data:any):void
		{
			
			needLv = data.needLv;
			goToFeastNum = data.goToFeastNum;
 			shopReTime = data.shopReTime;
			shopItemNum = data.shopItemNum;
			shopNeedGem = data.shopNeedGem;
			shopReset = data.shopReset;
			needItem = data.needItem;
			serverShopNeedGem = data.servershopNeedGem;
			serverShopReset = data.servershopReset;
			needVip = data.needVip;
			joinLv = data.joinLv;


			for(var key in data.feast)
			{
				let itemCfg:DinnerFeastItemCfg;
				if(!feastList.hasOwnProperty(String(key)))
				{
					feastList[String(key)]=new DinnerFeastItemCfg();
				}
				itemCfg=feastList[String(key)];
				itemCfg.initData(data.feast[key]);
				itemCfg.id=String(key);
			}

			for(var key in data.goToFeast)
			{
				let itemCfg:DinnerGoToFeastItemCfg;
				if(!goToFeastList.hasOwnProperty(String(key)))
				{
					goToFeastList[String(key)]=new DinnerGoToFeastItemCfg();
				}
				itemCfg=goToFeastList[String(key)];
				itemCfg.initData(data.goToFeast[key]);
				itemCfg.id=String(key);
			}

            for(var key in data.shop)
			{
				let itemCfg:DinnerShopItemCfg;
				if(!shopList.hasOwnProperty(String(key)))
				{
					shopList[String(key)]=new DinnerShopItemCfg();
				}
				itemCfg=shopList[String(key)];
				itemCfg.initData(data.shop[key]);
				itemCfg.id=String(key);
			}
			for(var key in data.servershop)
			{
				let itemCfg:DinnerShopItemCfg;
				if(!serverShopList.hasOwnProperty(String(key)))
				{
					serverShopList[String(key)]=new DinnerShopItemCfg();
				}
				itemCfg=serverShopList[String(key)];
				itemCfg.initData(data.servershop[key]);
				itemCfg.id=String(key);
			}
			
		}

		export function getFeastItemCfg(idx:number):DinnerFeastItemCfg
		{
			return feastList[idx.toString()];
		}

		export function getFeastItemList():Object
		{
			return goToFeastList;
		}

		export function getGoToFeastItemCfg(idx:number):DinnerGoToFeastItemCfg
		{
			if(idx == 2){
				if(Api.switchVoApi.checkOpen1524JoinDinner()&&goToFeastList[idx.toString()].needGem){
					goToFeastList[idx.toString()].needGem = null;
				}
			}
			return goToFeastList[idx.toString()];
		}

		export function getShopItemCfg(idx:string):DinnerShopItemCfg
		{
			let returnlist = shopList[idx];
			//判断是否跨服
			if (Api.switchVoApi.checkIsCrossDinner()){
				returnlist = serverShopList[idx];
			}
			return returnlist;
		}

		export function getNeedLv():number
		{
			return needLv;
		}
		export function getNeedVip():number
		{
			return needVip;
		}
		export function getJoinLv():number
		{
			return joinLv;
		}
		export function getGoToFeastNum():number
		{
			return goToFeastNum;
		}

		export function getShopReTime():number
		{
			return shopReTime;
		}

		export function getShopReset():number
		{
			let returnlist = shopReset;
			//判断是否跨服
			if (Api.switchVoApi.checkIsCrossDinner()){
				returnlist = serverShopReset;
			}
			return returnlist;
		}

		export function getNeedItem():string
		{
			return needItem;
		}

		export function getShopItemNum():number
		{
			return shopItemNum;
		}

		export function getShopNeedGem():number[]
		{
			let returnData = shopNeedGem
			//判断是否跨服
			if (Api.switchVoApi.checkIsCrossDinner()){
				returnData = serverShopNeedGem;
			}

			return returnData;
		}
	}
	
	class DinnerFeastItemCfg extends BaseItemCfg
	{
		public id:string;
		/**
		 * 可容纳人数
		 */
		public contain:number;
		/**
		 * 宴会持续时间
		 */
		public lastTime:number;
		/**
		 * 办宴会所需元宝
		 */
		public needGem:number;

		/**
		 * 办宴会所需道具
		 */
		public needItem:Object;
	}

	class DinnerGoToFeastItemCfg extends BaseItemCfg
	{
		public id:string;
		/**
		 * 赴宴所需的元宝数量
		 */
		public needGem:number;
		public needItem:string;
		/**
		 * 宴会分数，宴会分数是给举办宴会的玩家   注意有负数！在捣乱时
		 */
		public getPoint:number;

		/**
		 * 宴会积分，宴会积分是给赴宴的自己
		 */
		public getScore:number;
	}

	class DinnerShopItemCfg extends BaseItemCfg
	{
		public id: string;
		/**
		 * 道具内容
		 */
		public content:string;

		/**
		 * 购买所需积分
		 */
		public cost:number;

		/**
		 * 随机出物品的权重
		 */
		public weight:number;

		/**
		 * 购买所需消耗的道具类型 
		 * 1  积分
		 * 2  元宝
		*/
		public type:number = 1;
	}
}