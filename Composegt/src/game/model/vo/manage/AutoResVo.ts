class AutoResVo extends BaseVo
{
	public gold:number=0;
	public food:number=0;
	public soldier:number=0;
	public constructor()
	{
		super();
	}

	public initData(data:any):void
	{
		this.reset();
		if(data)
		{
			for(let key in data)
			{
				this[key]=data[key];
			}
		}
	}

	public get notice():boolean
	{
		return Boolean(this.food||this.gold||this.soldier);
	}

	public reset():void
	{
		this.gold=0;
		this.food=0;
		this.soldier=0;
	}

	public dispose():void
	{
		this.reset();
	}
}