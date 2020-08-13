namespace Config
{
	/**
	 * 官阶配置
	 */
	export namespace MinlevelCfg 
	{
		let minlevelListCfg:Object={};
		let maxMinLv:number=0;


		/**一键购买小人需要官品 */
		export let oneClickBuy:number=0;
		export function formatData(data:any):void
		{
			minlevelListCfg={};
			for(var key in data)
			{
				let itemCfg:MinLevelItemCfg;
				if(!minlevelListCfg.hasOwnProperty(String(key)))
				{
					minlevelListCfg[String(key)]=new MinLevelItemCfg();
				}
				itemCfg=minlevelListCfg[String(key)];
				itemCfg.initData(data[key]);
				if(data[key].oneClickBuy)
				{
					oneClickBuy=data[key].lv;
				}
				maxMinLv=Math.max(Number(key),maxMinLv);
			}
		}

		export function getCfgByMinLevelId(minLevelId:string|number):MinLevelItemCfg
		{
			return minlevelListCfg[String(minLevelId)];
		}

		/**
		 * 根据官品获取招募存储上限
		 * @param minLvId 官品
		 */
		export function getbuyLimitByMinLvId(minLvId:string|number):number
		{
			return getCfgByMinLevelId(minLvId).buyLimit;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLevel():number
		{
			return Object.keys(minlevelListCfg).length-3;
		}

		/**
		 * 获取最大小官职长度
		 */
		export function getMaxMinLevel():number
		{
			return maxMinLv;
		}
		
			
        
	}

	class MinLevelItemCfg extends BaseItemCfg
	{
        //大官职
        public lv:number;
        //小官职
        public zlv:number;
        //赚速限制
        public needRate:number;
		/**
		 * 所需政绩，初始是9品
		 */
		public exp:number;

		/**
		 * 解锁门客
		 */
		public servant:string;
		/**
		 * 门客可寻访
		 */
        public servantShow:string;
        
		/**
		 * 解锁家丁等级
		 */
		public personLv:number;


		/**
		 * 门客等级上限
		 */
		public servantLv:number;

		/**
		 * 每日俸禄可获得的元宝数量
		 */
		public gem:number;
		public unlock:number;
		public batchCompose:number;
		public oneClickBuy:number;

		/**每个官品招募存储数量 */
		public buyLimit:number;
		
		public constructor()
		{
			super();	
		}

	}
}