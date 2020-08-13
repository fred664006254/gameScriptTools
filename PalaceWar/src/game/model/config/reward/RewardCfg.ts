namespace Config
{
	export namespace RewardCfg 
	{
		export function getNameByTypeAndId(type:string|number,id?:string|number):string
		{
			return LanguageManager.getlocal("itemName_"+getLocalKey(type,id));
		}

		export function getIconByTypeAndId(type:string|number,id?:string|number):string
		{
			return "itemicon"+getLocalKey(type,id);
		}

		function getLocalKey(type:string|number,id?:string|number):string
		{
			if(typeof(type)!="number")
			{
				type=ItemEnums[type];
			}
			let localKey:string|number;
			if(Number(type)>0&&Number(type)<6)
			{
				localKey = type;
			}
			else
			{
				if(id)
				{
					localKey = id;
				}
				else
				{
					localKey = type;
				}
			}
			return String(localKey);
		}

		export function getNotEnoughLocalTip(type:string|number,id?:string|number):string
		{
			return LanguageManager.getlocal("resNotEnoughDesc",[getNameByTypeAndId(type,id)]);
		}
	}
}