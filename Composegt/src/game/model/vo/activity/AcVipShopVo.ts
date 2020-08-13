class AcVipShopVo extends AcBaseVo
{
 

	public shop:any=null;
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
	 
		if(data.shop != null)
		{
			this.shop = data.shop;
		}
		 
	}
	 
	public dispose():void
	{
	 	this.shop=null;
	}
}