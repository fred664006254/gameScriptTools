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
			return Object.keys(levelListCfg).length;
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
		 * 解锁门客皮肤ID
		 */
		public servantSkin:string;

		/**
		 * 经营商产累积次数上限
		 */
		public gold:number;

		/**
		 * 经营农产累积次数上限
		 */
		public food:number;

		/**
		 * 招募士兵累积次数上限
		 */
		public soldier:number;

		/**
		 * 处理政务的累计次数上限
		 */
		public affair:number;

		/**
		 * 门客等级上限
		 */
		public servantLv:number;

		/**
		 * 每日俸禄可获得的元宝数量
		 */
		public gem:number;
	  	/**
		 * 属性加成类型 {武力，智力，政治，魅力}
		 */
		public powerAddType:any;
		/**
		 * 属性增加
		 */
		public powerAdd:number;
		public constructor()
		{
			super();	
		}
	}
}