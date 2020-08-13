namespace Config {
	/**
	 * 列传本纪配置
	 */
	export namespace BiographyCfg
    {
        let biographyList: Object = {};

        export function formatData(data: any): void {
			for (var key in data) {
				let itemCfg: BiographyItemCfg;
				if (!biographyList.hasOwnProperty(String(key))) {
					biographyList[String(key)] = new BiographyItemCfg();
				}
				itemCfg = biographyList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = String(key);
			}
		}

		export function getCfgBgId(id:string):BiographyItemCfg
		{
			return biographyList[id];
		}
    }

    class BiographyItemCfg extends BaseItemCfg
    {
        public id: string;
        /**
		 * 类型：1：明君传  2：神帝纪
		 */
		public type:number;
        /**
		 *  排序：1在前，2在后，升序排列
		 */
		public sortID:number;
        /**
		 *  是否唯一  唯一的称号，在他人获得时，会取缔上一个获得者
		 */
		public isOnly:number;

		//lastTime  称号持续时间：没有字段的，则是无限时间  单位：天
		public lastTime:number;

		public get name():string
        {
			return LanguageManager.getlocal("biography_name"+this.id);
        }

		public get desc():string
        {
			return LanguageManager.getlocal("biography_desc"+this.id);
        }

		public get typeName():string
        {
			return LanguageManager.getlocal("biography_type"+this.type);
        }

		public get typeName2():string
        {
			return LanguageManager.getlocal("biography_typename"+this.type);
        }

		public get typeNameColor():number
		{	
			if (this.type == 2)
			{
				return TextFieldConst.COLOR_WARN_YELLOW;
			}
			return TextFieldConst.COLOR_LIGHT_YELLOW;
		}
    }
}