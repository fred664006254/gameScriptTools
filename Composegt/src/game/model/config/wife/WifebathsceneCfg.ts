namespace Config
{
    export namespace WifebathsceneCfg
    {
        let wifeBathSceneList: WifeBathSceneItemCfg[] = [];
        export function formatData(data:any): void
        {
          
            for(var key in data)
            {
                let itemCfg: WifeBathSceneItemCfg;
                if(!wifeBathSceneList.hasOwnProperty(String(key)))
                {
                    wifeBathSceneList[String(key)] = new WifeBathSceneItemCfg()
                }
                itemCfg = wifeBathSceneList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }

        }
        export function getSceneCfgById(id:string|number):WifeBathSceneItemCfg
        {
            return wifeBathSceneList[String(id)];
        }
    }
    export class WifeBathSceneItemCfg extends BaseItemCfg
    {
        public id: string;

        //红颜ID
        public wifeId: string;      

        //红颜传唤佳人经验加成  增加对应红颜的佳人经验的加成
        public wifeBathingExpRate: number;

        //红颜基础魅力值增加  只增加对应红颜的魅力值
        public wifeBathingGlamour: number;
        public constructor()
		{
			super();	
		}
    }

}