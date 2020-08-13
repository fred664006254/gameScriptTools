namespace Config
{
	/**
	 * 成就配置
	 */
	export namespace AchievementCfg 
	{
		let achievenmentListCfg:AchievementItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:AchievementItemCfg;
				if(!achievenmentListCfg.hasOwnProperty(String(key)))
				{
					achievenmentListCfg[String(key)]=new AchievementItemCfg();
				}
				itemCfg=achievenmentListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
			}
		}

		export function getAchievementCfgById(id:string):AchievementItemCfg
		{
			return achievenmentListCfg[String(id)];
		}
        export function getAchievemenCfgList():Array<AchievementItemCfg>
		{
			return achievenmentListCfg;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(achievenmentListCfg).length;
		}
	}

	export class AchievementItemCfg extends BaseItemCfg
	{
        /**
		 * 成就id
		 */
		public id: string;
		/**
		 * 排序
		 */
		public sort:number;

		/**
		 * 成就进度所需
		 */
		public value:number[];

		/**
		 * 成就奖励
		 */
		public reward:string[];

		public icon: number;

		
        /**成就名称 */

        public get name():string
        {
            return LanguageManager.getlocal("achievementName_" + this.id);
        }

        /**成就icon */
        public get acIcon():string
        {
            return "achievementicon_" + this.icon;
        }

		 /**成就icon */
        public get nameIcon():string
        {
            return "achievementname_" + this.icon;
        }

		/**
		 * 是否需要屏蔽审核服
		 */
		public get isShieldWhenShenhe()
		{
			if(Api.switchVoApi.checkOpenShenhe())
			{
				if(this.id == "703")
				{
					return true;
				}
			}
			return false;
		}

		public constructor()
		{
			super();	
		}
	}
}