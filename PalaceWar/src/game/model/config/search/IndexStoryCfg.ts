/**
 * 配置
 */
namespace Config
{
	/**
	 * 寻访配置
	 */
	export namespace IndexstoryCfg
	{
		let indexlist:any={};

		export function formatData(data:any):void
		{
			for(var key in data)
			{
				if(typeof(data[key])=="object")
				{
					if(key=="indexlist")
					{
						formatIndexList(data[key]);
					}

				}
				else
				{
					IndexstoryCfg[key]=data[key];
				}
			}
		}

		function formatIndexList(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:IndexStoryItemCfg=new IndexStoryItemCfg();
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
				indexlist[key]=itemCfg;
			}
		}

		export function getIndexItemCfgById(id:string):IndexStoryItemCfg
		{
			return indexlist[id];
		}
	}

	class IndexStoryItemCfg extends BaseItemCfg
	{
        public id :string;
		/**
		 * 触发类型：1是寻访次数，2是好感度（目前不需要）
		 */
		public triggerType:number;

		/**
		 * 事件类型：1是主线剧情，2是随机剧情
		 */
		public eventType:number;
        /**
         * 触发几率
         */
        public rate:number;

		/**
		 * 条件区间下限
		 */
		public lower:number;

		/**
		 * 条件区间上限
		 */
        public upper:number;

		/**
		 * 触发剧情ID
		 */
		public storyID:string;

		public constructor() 
		{
			super()
		}
	}

}