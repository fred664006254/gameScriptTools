

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

		let needItem:string = null;

		let needVip:number;
		let needChallenge:number;
		let addScore:number;
		/**
		 * 一键收宴，VIP X 及以上才能解锁
		 */
		let vipLock:number;
		/**
		 * VIP对应的一键收宴每日次数上限 
		 */
		let vipNum:number[] = null;

		let finishDinner:Object={};

		export function formatData(data:any):void
		{
			
			needLv = data.needLv;
			goToFeastNum = data.goToFeastNum;
 			shopReTime = data.shopReTime;
			shopItemNum = data.shopItemNum;
			shopNeedGem = data.shopNeedGem;
			shopReset = data.shopReset;
			needItem = data.needItem;
			needVip = data.needVip;
			needChallenge = data.needChallenge;
			addScore = data.addScore;
			vipLock = data.vipLock;
			vipNum = data.vipNum;

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

			for(var key in data.finishDinner)
			{
				let itemCfg:DinnerFinishItemCfg;
				if(!finishDinner.hasOwnProperty(String(key)))
				{
					finishDinner[String(key)]=new DinnerFinishItemCfg();
				}
				itemCfg=finishDinner[String(key)];
				itemCfg.initData(data.finishDinner[key]);
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
			return goToFeastList[idx.toString()];
		}

		export function getShopItemCfg(idx:string):DinnerShopItemCfg
		{
			return shopList[idx];
		}

		export function getNeedLv():number
		{
			return needLv;
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
			return shopReset;
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
			return shopNeedGem;
		}

		export function getNeedVip():number
		{
			return needVip;
		}
		export function getNeedChallenge():number
		{
			return needChallenge;
		}

		export function getAddScore():number
		{
			return addScore;
		}

		export function getFeastListCfg():any{
			return feastList;
		}

		export function getVipLock():number
		{
			return vipLock;
		}

		export function getVipNum(vipLv:number):number
		{
			return vipNum[vipLv];
		}

		export function getUnlockVipNum():number
		{	
			for (let i =0; i<vipNum.length; i++)
			{
				if (vipNum[i]>0)
				{
					return i;
				}
			}
			return 0;
		}


		export function getFinishRechargeId(type:number):string
		{
			return finishDinner[String(type)].rechargeId;
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
	}

	class DinnerFinishItemCfg extends BaseItemCfg
	{
		public id: string;

		/**
		 * 一键收宴对应档位
		 */
		public rechargeId:string;
	}
}