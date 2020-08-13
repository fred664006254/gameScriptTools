namespace Config
{
	export namespace ShieldCfg 
	{
		export function getCfg():string[]
		{
			return ResourceManager.getRes("shield_"+GameData.getCountry());
		}

		export function checkShield(str:string):boolean
		{
			let shieldCfg=getCfg();
			if(shieldCfg&&str)
			{
				if(shieldCfg.indexOf(str)>-1||shieldCfg.indexOf(str.replace(/\s/g,""))>-1)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
					return false;
				}
				else
				{
					let l:number=shieldCfg.length;
					for(let i:number=0;i<l;i++)
					{
						if(str.toLowerCase().indexOf(shieldCfg[i].toLowerCase())>-1)
						{
							App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
							return false;
						}
					}
				}
			}
			return true;
		}

		export function checkOnlyShield(str:string):boolean
		{
			let shieldCfg=getCfg();
			/**
			 * 空字符
			 */
			if (str.replace(/\s/g,"").length == 0)
			{
				return true;
			}
			if(shieldCfg&&str&&shieldCfg.indexOf(str)>-1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
				return false;
			}
			return true;
		}
	}
}