class AcDraftVo extends AcBaseVo
{

	private ainfo : any = null;
	private binfo : any = null;
	private cinfo : any = null;
	 
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key] = data[key];
		}
		 
		if(data.ainfo)
		{
			this.ainfo = data.ainfo;
		}

		if(data.binfo)
		{
			this.binfo = data.binfo;
		}

		if(data.cinfo)
		{
			this.cinfo = data.cinfo;
		}
		//App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DBDAY_FRESH_ITEM);
	}

	public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
	}

	public getCurFlower():number{
		return 0;
	}
}