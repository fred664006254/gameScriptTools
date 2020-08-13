class LevyVo extends BaseVo
{
	private uid:number = 0;
	public pinfo:any = {};
	public info:any = {};
	public attr:{grate:number,frate:number,srate:number} = {grate:0,frate:0,srate:0};
	public st:any = {};
	public sinfo:any = {};
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			for (var key in data) {
				this[key] = data[key];
			}
			this.st = {};
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESHVO_LEVY);	
		}


	}

	public dispose():void
	{
		this.uid = 0;
		this.pinfo = {};
		this.info = {};
	}
}
