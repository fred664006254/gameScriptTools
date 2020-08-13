class AcDiscountVo extends AcBaseVo
{
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
	public get isShowRedDot():boolean
	{
		return false;
	}
	public dispose():void
	{
		this.v = 0;
	}
}