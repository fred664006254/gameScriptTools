namespace Config
{
	export namespace NamesCfg 
	{
        export function getCfg():string[]
		{   

			return GameData.getLanguageRes("names_");
		}
        export function getRandomName():string
		{   
            let namesCfg=getCfg();
            let nameStr:string = "";

            for (let k in namesCfg)
            {
                let namesArray = namesCfg[k];
                nameStr+=namesArray[App.MathUtil.getRandom(0,namesArray.length)];
            }

            return nameStr;
        }

        export function getRandomNameBySeed(seed:number):string
		{   
            let namesCfg=getCfg();
            let nameStr:string = "";

            for (let k in namesCfg)
            {
                let namesArray = namesCfg[k];
                let name = namesArray[seed];
                while(name == null || name == undefined)
                {
                    name = namesArray[seed % namesArray.length];
                }
                nameStr+=name;
            }

            return nameStr;
        }

        export function getEnemyName(info:any):string
		{   
            return info.uid < 1000?Config.NamesCfg.getRandomNameBySeed(Number(info.name)):info.name;
        }

        export function getRandomSecondName():string
		{   
            let namesCfg=getCfg();
            let nameStr:string = "";

            if (PlatMgr.checkIsRuLang())
            {   
                let namesArray = namesCfg[0];
                nameStr+=namesArray[App.MathUtil.getRandom(0,namesArray.length)];
            }
            else
            {
                for (let k:number=1 ; k<namesCfg.length; k++ )
                {
                    let namesArray = namesCfg[k];
                    nameStr+=namesArray[App.MathUtil.getRandom(0,namesArray.length)];
                }
            }

            

            return nameStr;
        }
    }
}