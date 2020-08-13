namespace Config
{
	export namespace NamesCfg 
	{
        export function getCfg():string[]
		{   

			return GameData.getLanguageRes("names_");
		}

        function getRandomName2():string
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

        export function getRandomName():string
		{   
            let nameStr = getRandomName2();
            // nameStr = "陪睡";
            let k:number = 0;
            while (Config.ShieldCfg.checkShield(nameStr,false)==false && k<=12)
            {
                k++;
                nameStr = getRandomName2();
            }

            return nameStr;
        }

        function getRandomSecondName2():string
		{   
            let namesCfg=getCfg();
            let nameStr:string = "";

            if (PlatformManager.checkIsRuLang())
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

        export function getRandomSecondName():string
		{   
            let nameStr = getRandomSecondName2();
            let k:number = 0;
            while (Config.ShieldCfg.checkShield(nameStr,false)==false && k<=12)
            {
                k++;
                nameStr = getRandomSecondName2();
            }

            return nameStr;
        }
    }
}