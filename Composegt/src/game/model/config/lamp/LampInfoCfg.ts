namespace Config {
    
    export namespace LampinfoCfg
	{
        let lampList:Object={};

        export function formatData(data:any):void
		{
            for(var key in data)
			{
				let itemCfg:LampinfoItemCfg;
				if(!lampList.hasOwnProperty(String(key)))
				{
					lampList[String(key)]=new LampinfoItemCfg();
				}
				itemCfg=lampList[String(key)];
				itemCfg.initData(data[key]);
			}
        }

        export function getLampInfoItemCfg(idx:string):LampinfoItemCfg
		{
			return lampList[idx];
		}
    }


    class LampinfoItemCfg extends BaseItemCfg
	{
        public sortId:number;
    }
}