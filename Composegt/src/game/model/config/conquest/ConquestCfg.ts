namespace Config
{
	/**
	 * 征伐配置
	 */
	export namespace ConquestCfg 
	{
		let conquestListCfg:ConquestItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:ConquestItemCfg;
				if(!conquestListCfg.hasOwnProperty(String(key)))
				{
					conquestListCfg[String(key)]=new ConquestItemCfg();
				}
				itemCfg=conquestListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
			}
		}

		export function getConquestCfgById(id:string|number):ConquestItemCfg
		{
			return conquestListCfg[String(id)];
		}
        export function getConquestCfgList():Array<ConquestItemCfg>
		{
			return conquestListCfg;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(conquestListCfg).length;
		}
	}

	export class ConquestItemCfg extends BaseItemCfg
	{
        /**
		 * 波数id
		 */
		public id: string;
		/**
		 * 每关的均值  用于一键讨伐
		 */
		public soldierMid:number;
		/**
		 * 人物字段  用于前端引图片与名称  引关卡BOSS的图与名称
		 */
		public person1:number;
		public person2:number;
		public person3:number;
		/**
		 * 每关增加讨伐分数
		 */
		public score:number;


		/**
		 * 每关增加政绩
		 */
		public reward:any;
        /**讨伐名称 */

        public get name():string
        {
            return LanguageManager.getlocal("wifeName_" + this.id);
        }

      
        /**讨伐敌人icon */
        public get icon():string
        {
            return "wife_half_" + this.id;
        }

		public constructor()
		{
			super();	
		}
	}
}