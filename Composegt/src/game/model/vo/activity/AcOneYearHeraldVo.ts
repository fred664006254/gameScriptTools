
class AcOneYearHeraldVo extends AcBaseVo
{
	public firstOpen:number = 0;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}
	public isFirstOpen()
	{
		return this.firstOpen == 0  ;
	}

	public get isShowRedDot():boolean
	{
	
		return (this.firstOpen == 0  ) ;
	}

	public dispose():void 
	{ 
		this.firstOpen = 0;
		super.dispose();
	}
}