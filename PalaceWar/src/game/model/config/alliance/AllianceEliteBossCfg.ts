namespace Config
{
	/**
	 * 帮会精英boss配置
	 */
	export namespace AllianceelitebossCfg 
	{
		let allianceEliteBossListCfg:AllianceEliteBossItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:AllianceEliteBossItemCfg;
				if(!allianceEliteBossListCfg.hasOwnProperty(String(key)))
				{
					allianceEliteBossListCfg[String(key)]=new AllianceEliteBossItemCfg();
				}
				itemCfg=allianceEliteBossListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = key;
				itemCfg.sortId = Number(key.substring(1));
			}
		}

		export function getAllianceCfgByLv(level:string):AllianceEliteBossItemCfg
		{
			return allianceEliteBossListCfg[String(level)];
		}
		/**
		 * 获得所有的id 。Ps：可能是乱序
		 */
        export function getAllainceCfgIdList()
		{
			return Object.keys(allianceEliteBossListCfg);
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(allianceEliteBossListCfg).length;
		}
	}

	export class AllianceEliteBossItemCfg extends BaseItemCfg
	{
		public id:string;
		/**
		 * 开启精英BOSS消耗联盟财富
		 */
		public eliteNeedAsset:number;
		/**
		 * 开启精英BOSS消耗元宝
		 */
		public eliteNeedGem:number;
		/**
		 * BOSS总贡献  计算贡献奖励时的系数
		 */
		public eliteAttribution:number;

		/**
		 * 精英BOSS血量
		 */
		public eliteBossHp:number;
		/**
		 * 击杀精英BOSS奖励
		 */
		public eliteDrop:{reward:string,num:number}[];

		public sortId :number;
		public constructor()
		{
			super();	
		}
	}
}