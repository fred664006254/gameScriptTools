namespace Config
{
	export namespace  AmuletaruaCfg 
	{
		let amuletaruList: Object = {};
		export function formatData(data: any): void 
		{
			for (var key in data) 
			{
                let tmpcfg:AmuletAuraItemCfg = amuletaruList[key]; 
				if (!tmpcfg) 
				{
                    tmpcfg = new AmuletAuraItemCfg();
					amuletaruList[String(key)] = tmpcfg;
				}
                tmpcfg.initData(data[key]);
                tmpcfg.id = key;
			}
		}

		/**
		 * 根据索引获取奖励物品
		 * @param index 
		 */
		export function getAmuletAuraItemById(key:string)
		{
			return amuletaruList[String(key)] ;
		}

        
        export class AmuletAuraItemCfg extends BaseItemCfg
        {
            public id:string;
			public attrLvList:{attType:number[],attEffect:number,update:number}[] = [];
			public initData(data:any):void
			{
				if(data)
				{
					for(var key in data)
					{
						this.attrLvList[key]=data[key];
					}
				}
			}
			
        }

    }
}