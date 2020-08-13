namespace Config
{
	export namespace AcCfg
	{
		export class NvyouComingCfg 
		{
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[key]=data[key];
				}
            }
        }
    }
}