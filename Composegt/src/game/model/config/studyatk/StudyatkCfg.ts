namespace Config
{
	export namespace StudyatkCfg 
	{
		let studyatkList:Object={};
		let maxLevel:number=0;
		export function formatData(data:any):void
		{
			studyatkList={};
			maxLevel=0;
			for(var key in data)
			{
				let itemCfg:StudyatkItemCfg;
				if(!studyatkList.hasOwnProperty(String(key)))
				{
					studyatkList[String(key)]=new StudyatkItemCfg();
				}
				itemCfg=studyatkList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
				maxLevel = Math.max(maxLevel,Number(key));
			}
		}
		export function getStudyatkCfgById(id:string|number)
		{
			return studyatkList[id];
		}
        export function getStudyatkList()
		{
			return studyatkList;
		}

		export function getMaxLevel():number
		{
			return maxLevel;
		}
	}
	class StudyatkItemCfg extends BaseItemCfg
	{
		/**
		 * 配置id
		 */
		public id:string;
		/**
		 * 书籍（资质）的ID
		 */
		public ability:string;
		/**
		 *升级所需的经验
		 */
		public needExp:number;
		/**
		 * 书籍提升 X 级
		 */
		public upLv:number;
	}
}