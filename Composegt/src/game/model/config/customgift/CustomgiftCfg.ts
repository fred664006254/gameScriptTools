namespace Config
{
	export namespace CustomgiftCfg
	{
        
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				CustomgiftCfg[key]=data[key];
			}
		}
    }
}