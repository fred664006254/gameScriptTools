namespace Config
{
	export namespace  AmuletCfg 
	{
		let amuletList: Object = {};
		export function formatData(data: any): void 
		{
			for (var key in data) 
			{
                let tmpcfg:AmuletItemCfg = amuletList[key]; 
				if (!tmpcfg) 
				{
                    tmpcfg = new AmuletItemCfg();
					amuletList[String(key)] = tmpcfg;
				}
                tmpcfg.initData(data[key]);
                tmpcfg.id = key;
			}
		}

		/**
		 * 根据索引获取奖励物品
		 * @param index 
		 */
		export function getAmucfgIndex(key:string)
		{
			return amuletList[String(key)] ;
		}

		export function getAmucfgBySerId(serId:string)
		{
			for (var key in amuletList) {
				if (amuletList.hasOwnProperty(key)) {
					var element = amuletList[key];
					if(element.servantId == serId){
						return amuletList[String(key)] ;
					}
				}
			}
			return null;
		}

        
        export class AmuletItemCfg extends BaseItemCfg
        {
            public id:string;
			public iconID:number;
            public servantSkin:string;
            public servantId:string;
            public amuletEffect:{att:number[],attNum:number};
        }

    }
}