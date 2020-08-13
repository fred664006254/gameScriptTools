class AcCrossServerAtkRaceVo extends AcBaseVo
{	
	public info:any = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getPreward()
	{
		return this["info"]["preward"];
	}
	public getZonereward()
	{
		return this["info"]["zonereward"];
	}
	
	public dispose():void
	{
		this.info = null;

		super.dispose();
	}
}