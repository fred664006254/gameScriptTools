namespace Config
{
	/**
	 * 帮会等级配置
	 */
	export namespace AllianceCfg 
	{
		let allianceListCfg:AllianceItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:AllianceItemCfg;
				if(!allianceListCfg.hasOwnProperty(String(key)))
				{
					allianceListCfg[String(key)]=new AllianceItemCfg();
				}
				itemCfg=allianceListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.level = String(key);
		
			}
		}

		export function getAllianceCfgByLv(level:string):AllianceItemCfg
		{
			return allianceListCfg[String(level)];
		}
        export function getAllainceCfgList():Array<AllianceItemCfg>
		{
			return allianceListCfg;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(allianceListCfg).length;
		}
	}

	export class AllianceItemCfg extends BaseItemCfg
	{
        /**
		 * 联盟等级1
		 */
		public level: string;
		/**
		 * exp  所需经验
		 */
		public exp:number;

		/**
		 * count  军团人数
		 */
		public count:number;

		/**
		 * leader  帮主名额
		 */

		public leader:number;
		/**
		 * viceLeader  副帮主名额
		 */

		public viceLeader:number;
		/**
		 * elite  精英名额
		 */

		public elite:number;

		/**
		 * asset  联盟增加财富
		 */
		public asset:number;
		/**
		 * contribution  个人获得贡献
		 */
		public contribution:number;
	

		
		public constructor()
		{
			super();	
		}
	}
}