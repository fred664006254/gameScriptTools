class SwitchVo extends BaseVo
{
	public switchList:any={};
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this.switchList[key]=data[key]?Number(data[key]):0;
		}
	}

	public dispose():void
	{
		this.switchList={};
	} 
}