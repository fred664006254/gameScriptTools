namespace Config
{
	export namespace MaintaskguideposCfg 
	{
		export let poscfg:any={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				this[key] = data[key];	
			}
		}

	}
}