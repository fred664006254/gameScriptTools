namespace Config
{
	/**
	 * 官阶配置
	 */
	export namespace LevelCfg 
	{
		let levelListCfg:Object={};
		export function formatData(data:any):void
		{
			levelListCfg={};
			for(var key in data)
			{
				let itemCfg:LevelItemCfg;
				if(!levelListCfg.hasOwnProperty(String(key)))
				{
					levelListCfg[String(key)]=new LevelItemCfg();
				}
				itemCfg=levelListCfg[String(key)];
				itemCfg.initData(data[key]);
			}
		}

		export function getCfgByLevel(level:string):LevelItemCfg
		{
			return levelListCfg[String(level)];
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLevel():number
		{
			return Object.keys(levelListCfg).length-3;
		}
	}

	class LevelItemCfg extends BaseItemCfg
	{
		/**
		 * 所需政绩，初始是9品
		 */
		public exp:number;

		/**
		 * 解锁门客
		 */
		public servant:string;

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
		
		public constructor()
		{
			super();	
		}
	}
}