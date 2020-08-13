namespace Config
{   
   
	export namespace ServantBaseCfg 
	{    
        let newObject:Object;
        export function getServantLvList():Object
        {   
            let servantLvList:Object = GameConfig.config.servantbaseCfg.servantLvList;
            if (!Api.switchVoApi.checkOpenServantLevel450() && Object.keys(servantLvList).length>7)
            {   
                if (!newObject)
                {
                    newObject = {};
                    for (let i:number = 0; i<=6 ; i++)
                    {
                        newObject[String(i)] = servantLvList[String(i)]
                    }
                }
                return newObject;
            }
            else
            {
                return servantLvList;
            }
        }
        export function getDanShuID():string
        {
            return  GameConfig.config.servantbaseCfg.danShuID;
        }
        export function commonMaxClv():number
        {
            return  6;
        }
        export function commonMaxLv():number
        {
            return  400;
        }
        export function getLvUpNeedItemNum(lv:number):number
        {   
            let idx:number = lv - commonMaxLv();
            return  GameConfig.config.servantbaseCfg.danShuCost[idx];
        }
    }
}