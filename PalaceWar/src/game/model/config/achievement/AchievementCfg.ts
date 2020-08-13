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
				itemCfg.id = String(key);
				itemCfg.initData(data[key]);
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
		public _value:number[];
		public get value():number[]
		{
			if(this.id == "106")
			{
				let tmpValue = [];
				let maxCh = ChallengeCfg.getChallengeTotalPass();
				for (var index = 0; index < this._value.length; index++) {
					if(this._value[index] > maxCh){
						break;
					}
					tmpValue.push(this._value[index])
				}
				return tmpValue;
			}
			return this._value;
		}
		
		public set value(values:number[])
		{
			this._value = values;
		}
		public getMaxV()
		{
			let val = this.value;
			return val[val.length - 1];
		}
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
			let str = "achievementicon_" + this.icon;
			if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${str}_blueType`)){
				str = `${str}_blueType`;
			}
			return str;
		}

			/**成就icon */
		public get nameIcon():string
		{
			let str = "achievementname_" + this.icon;
			if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${str}_blueType`)){
				str = `${str}_blueType`;
			}
			return str;
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