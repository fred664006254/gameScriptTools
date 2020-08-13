class AffairVo extends BaseVo
{
	public num:number;
	public st:number;
	public opt:number;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(data.ainfo)
		{
			// if(data.ainfo.num)
			// {
				this.num=data.ainfo.num;
				this.st=data.ainfo.st;
				this.opt=data.ainfo.afid;
			// }
		}
	}

	public dispose():void
	{
		this.num=undefined;
		this.st=undefined;
		this.opt=undefined;
	}
}