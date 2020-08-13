class GameinfoVo extends BaseVo
{
	public regdt:number;
	public ip:string;
	public newerflag:number;
	public info:{downType?:string,realnameRewards?:number};

	public sexnum:number = 0;//"玩家性别 1代表是女，不存在则为男",
    public sexswitch:number = 0;//"性转开关 大于等于1为开 否则为关",
	public sexdefault:number = 0;//"性转默认值 1代表有 不存在则为没有",
	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			for(let key in data)
			{
				this[key]=data[key];
			}

			 if(data.info && data.info.sexnum != null)
			{
				this.sexnum = data.info.sexnum;
			}
			else{
				this.sexnum = 0;
			}
			if(data.info && data.info.sexswitch != null)
			{
				this.sexswitch = data.info.sexswitch;
			}
			else{
				this.sexswitch = 0;
			}
			if(data.info && data.info.sexdefault != null)
			{
				this.sexdefault = data.info.sexdefault;
			}
			else{
				this.sexdefault = 0;
			}
		}
	}

	public dispose():void
	{
		this.newerflag = 0;
		this.info = null;
		this.sexnum = 0;//"玩家性别 1代表是女，不存在则为男",
        this.sexswitch = 0;//"性转开关 大于等于1为开 否则为关",
        this.sexdefault = 0;//"性转默认值 1代表有 不存在则为没有",
	}
}