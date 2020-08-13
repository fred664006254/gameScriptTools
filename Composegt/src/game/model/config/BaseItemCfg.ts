abstract class BaseItemCfg extends BaseClass
{
	public constructor() 
	{
		super()
	}

	public initData(data:any):void
	{
		if(data)
		{
			for(var key in data)
			{
				this[key]=data[key];
			}
		}
	}

	public dispose():void
	{

	}
}