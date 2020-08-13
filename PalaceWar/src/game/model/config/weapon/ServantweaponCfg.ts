namespace Config
{
	export namespace ServantweaponCfg 
	{   
        /**
		 * 官品限制
		 */
        export let lvNeed:number;
        /**
		 * 神器
		 */
		let weaponList:{[key:string]:ServantWeaponItemCfg} = {};
        /**
        --神器等级经验表  初始为1级，1级的为1升2的消耗
        --lv:等级
        --needItem:需要道具
		 */
        export let weaponLv:Object={};
        /**
		 * 神器进阶
		 */
        let weaponPromotion:Object={};
        /**
		 * 铸魂消耗
         * needItem:需要道具数量，每个神器需要的道具就是自己
		 */
        export let weaponSoul:Object={};
      /**
		 * 珍器坊商店
		 */
		let shop1:Object={};
		let shop2:Object={};
		let shop_part3:Object={};

        export function formatData(data:any):void
		{
            lvNeed = data.lvNeed;
			weaponLv = data.weaponLv;
            weaponSoul = data.weaponSoul;

            for(var key in data.weapon)
			{
				let itemCfg:ServantWeaponItemCfg;
				if(!weaponList.hasOwnProperty(String(key)))
				{
					weaponList[String(key)]=new ServantWeaponItemCfg();
				}
				itemCfg=weaponList[String(key)];
				itemCfg.initData(data.weapon[key]);
				itemCfg.id=String(key);
			}

            for(var key in data.weaponPromotion)
			{
				let itemCfg:ServantWeaponPromotionItemCfg;
				if(!weaponPromotion.hasOwnProperty(String(key)))
				{
					weaponPromotion[String(key)]=new ServantWeaponPromotionItemCfg();
				}
				itemCfg=weaponPromotion[String(key)];
				itemCfg.initData(data.weaponPromotion[key]);
				itemCfg.id=String(key);
			}
			shop1 = data.shop1;
			shop2 = data.shop2;
		}
		
		export function getShopArr():ServantWeaponShopItemCfg[]
		{	
			let arr = [];
			var date: Date = App.DateUtil.getServerDate();
			var year:number = date.getFullYear();
			var month:number = date.getMonth() + 1;
						// for(let key in data.shop)
			// {
			// 	let itemCfg:ServantWeaponShopItemCfg;
			// 	let index = Number(key);
			// 	if(!shop.hasOwnProperty(String(index)))
			// 	{
			// 		shop[String(index)]=new ServantWeaponShopItemCfg();
			// 	}
			// 	itemCfg=shop[String(index)];
			// 	itemCfg.initData(data.shop[key]);
			// 	itemCfg.id=(index);
			// }
			//按月刷新
			for(let i in shop1[month]){
				arr.push(shop1[month][i]);
			}
			//固定位置
			for(let i in shop2){
				arr.push(shop2[i]);
			}

			let tmp = [];
			for(let i in arr){
				let itemCfg:ServantWeaponShopItemCfg=new ServantWeaponShopItemCfg();
				let index = Number(i) + 1;
				itemCfg.initData(arr[i]);
				itemCfg.id=(index);
				tmp.push(itemCfg);
			}
			return tmp;
		}

		export function getWeaponItemById(id:string|number):ServantWeaponItemCfg
		{
			return weaponList[String(id)];
		}

		export function getWeaponPromotionItemById(id:string|number):ServantWeaponPromotionItemCfg
		{
			return weaponPromotion[String(id)];
		}
		
		export function getWeaponIdByServantId(id:string|number):string
		{	
			for (let key in weaponList)
			{
				if (weaponList[key].servantID == id)
				{
					return String(key);
				}
			}
			return null;
		}

		export function getWeaponItemByServantId(id:string|number):ServantWeaponItemCfg
		{	
			let wId = this.getWeaponIdByServantId(id);
			if (wId)
			{
				return this.getWeaponItemById(wId);
			}
			return null;
		}

		export function checkOpenWeaponByServantId(id:string|number):boolean
		{
			let cfg = this.getWeaponItemByServantId(id);
			if (cfg )//&& Api.switchVoApi.checkWeaponById(cfg.id)
			{
				return true;
			}

			return false;
		}
		
    }

    export class ServantWeaponItemCfg extends BaseItemCfg
	{
		public id: string;
		/**
		 * 对应道具
		 */
		public itemID:string;

		/**
		 * 对应门客
		 */
		public servantID:number;

		/**
		 * 初始武力星
		 */
		public iniStrength:number;
        /**
		 * 初始智力星
		 */
		public iniIntelligence:number;
        /**
		 * 初始政治星
		 */
		public iniPolitics:number;
        /**
		 * 初始魅力星
		 */
		public iniCharm:number;
        
        /**
		 * 可升最大等级
		 */
		public maxLevel:number;
        /**
		 * 可升最大品级
		 */
		public maxPromotion:number;
        /**
		 * 可升最大熔炼
		 */
		public maxSoul:number;
        /**
		 * 神器技能1：天赋
		 */
		public skill1:number[];
        /**
		 * 神器技能2每级对应的值
		 */
		public skill2:number[];
		 /**
		 * 三国争霸神器属性：1单人加攻击 2单人加血量 3单人加暴击伤害 4全体加攻击 5全体加血量 6全体加暴击伤害 7单体死亡时造成伤害
		 */
		public attributeType1:number;
        /**
		 * 三国争霸神器属性基础值  最终值 = 基础值 + 成长值（与神器等级与品阶有关）
		 */
		public attribute1:number;

		//分解所得神器玉数量
		public resolveNum:number;

		public get icon():string
		{
			return  "weapon_icon_"+this.id;
		}

		public get itemIcon():string
		{
			return  "itemicon"+this.itemID;
		}

		public get name():string
		{
			return LanguageManager.getlocal("weapon_name_"+this.id);
		}

		public get desc():string
		{
			return LanguageManager.getlocal("weapon_desc_"+this.id);
		}

		public getMaxLv():number
		{	
			return this.maxLevel;
		}

		public getMaxPromotionLv():number
		{	
			return this.maxPromotion;
		}

		public getMaxSoulLv():number
		{	
			return this.maxSoul;
		}
		//取当前等级神器的各项资质和总和， 计算各种战斗加成值用
		public getWeaponPromotionValue(clv:number):number[]
		{	
			// 星星数
			let addTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
			//总值
			let valueTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
			let starTab = [0,0,0,0];
			for (let i = 1; i<clv; i++)
			{	
				for (let j = 0; j<4; j++)
				{
					valueTab[j] += addTab[j];
				}

				let cfg:ServantWeaponPromotionItemCfg = Config.ServantweaponCfg.getWeaponPromotionItemById(i);
				let staradd:number = cfg.star;
				if (staradd)
				{	
					for (let k in cfg.abilityType)
					{
						let v = cfg.abilityType[k];
						addTab[v-1]+=staradd;
					}
				}
			}
			valueTab[4] = valueTab[0]+valueTab[1]+valueTab[2]+valueTab[3];

			return valueTab;
		}
		//对照表
		public getPromationList():any[]
		{	
			// 星星数
			let addTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
			let valueTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
			//总值
			let array = [];
			array.push([1,valueTab[0],valueTab[1],valueTab[2],valueTab[3],valueTab[0]+valueTab[1]+valueTab[2]+valueTab[3]]);
			let starTab = [0,0,0,0];

			let clv = this.maxPromotion;			
			for (let i = 1; i<clv; i++)
			{
				for (let j = 0; j<4; j++)
				{
					valueTab[j] += addTab[j];
				}

				let cfg:ServantWeaponPromotionItemCfg = Config.ServantweaponCfg.getWeaponPromotionItemById(i);
				let staradd:number = cfg.star;
				if (staradd)
				{	
					for (let k in cfg.abilityType)
					{
						let v = cfg.abilityType[k];
						addTab[v-1]+=staradd;
					}
				}
				let total = valueTab[0]+valueTab[1]+valueTab[2]+valueTab[3];
				array.push([i+1,valueTab[0],valueTab[1],valueTab[2],valueTab[3],total]);
			}


			return array;
		}
		// 下一级增加资质和星级。 神器加工用
		public getWeaponPromotionStarAndAdd(clv:number):any[]
		{
			// 星星数
			let addTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
			//总值
			// let valueTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
			let starTab = [0,0,0,0];
			let showTab = [1,1,1,1];

			for (let i = 1; i<clv; i++)
			{
				// for (let j = 0; j<4; j++)
				// {
				// 	valueTab[j] += addTab[j];
				// }

				let cfg:ServantWeaponPromotionItemCfg = Config.ServantweaponCfg.getWeaponPromotionItemById(i);
				let staradd:number = cfg.star;
				if (staradd)
				{	
					for (let k in cfg.abilityType)
					{
						let v = cfg.abilityType[k];
						addTab[v-1]+=staradd;
					}
				}				
			}
			let cfg:ServantWeaponPromotionItemCfg = Config.ServantweaponCfg.getWeaponPromotionItemById(clv);
			let staradd:number = cfg.star;
			if (staradd)
			{	
				for (let k in cfg.abilityType)
				{
					let v = cfg.abilityType[k];
					starTab[v-1]=staradd;
				}
			}				

			return [addTab,starTab,showTab]
		}

	}

    class ServantWeaponPromotionItemCfg extends BaseItemCfg
	{
		public id: string;
		/**
		 * 精锻消耗
		 */
		public needItem:string;

		/**
		 * 每次升级，升星增加类型，特殊等级升星时
		 */
        public abilityType:number[];
        /**
		 * 每次升品增加星数（资质数）
		 */
		public star:number = 0;
    }

	export class ServantWeaponShopItemCfg extends BaseItemCfg
	{
		public id: number;

		/**
		 * 道具
		 */
		public item:string;

		/**
		 * 排序: 1排在第一位
		 */
        public sortId:number;
        
        /**
		 * 显示限制 1：需要获得该道具后，才可看到以及兑换 
		 */
        public show:number;

        /**
		 * 购买限制 1:月刷新  2：周刷新  3：日刷新
		 */
        public limitType:number;

        /**
		 * 购买所需：有可能消耗元宝，也可能消耗其他道具
		 */
        public price:string;

        /**
		 * 特殊道具购买逻辑：每次购买此道具，获得的数量和珍器坊的等级有关
		 */
        public specialItem:number;

        /**
		 * 特殊道具购买，数量与珍器坊等级的关系，超过最大值取最大值
		 */
        public specialGet:number;

        /**
		 * 限购次数，可以购买N次(根据珍器坊等级)
		 */
        public limit:number;

    }
}