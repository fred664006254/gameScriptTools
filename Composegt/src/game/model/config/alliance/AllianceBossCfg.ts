namespace Config
{
	/**
	 * 帮会等级配置
	 */
	export namespace AlliancebossCfg 
	{
		let allianceBossListCfg:AllianceBossItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:AllianceBossItemCfg;
				if(!allianceBossListCfg.hasOwnProperty(String(key)))
				{
					allianceBossListCfg[String(key)]=new AllianceBossItemCfg();
				}
				itemCfg=allianceBossListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = key;
			}
		}

		export function getAllianceCfgByLv(level:string):AllianceBossItemCfg
		{
			return allianceBossListCfg[String(level)];
		}
        export function getAllainceCfgIdList()
		{
			return Object.keys(allianceBossListCfg);
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(allianceBossListCfg).length;
		}
	}

	export class AllianceBossItemCfg extends BaseItemCfg
	{
		public id:string;
		public needAllianceLv:number;
		public needAsset:number;
		public needGem:number;
		/**
		 * count  军团人数
		 */
		public attribution:number;
		/**
		 * leader  帮主名额
		 */
		public addAsset:number;
		/**
		 * viceLeader  副帮主名额
		 */
		public addExp:number;
		/**
		 * elite  精英名额
		 */
		public bossHp:number;
		public drop:{reward:string,num:number}[];
		public bossPic:number =1;
		public constructor()
		{
			super();	
		}
	}
}