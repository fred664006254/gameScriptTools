class AcDailyActivityVo extends AcBaseVo
{
	public ainfo={};
    public rp:number = 1;
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
        if( data.rp && data.rp == 1){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH);
        }
	}
	public get isShowRedDot():boolean
	{
		return this.rp == 1;
	}

    public getBuyTimes(gid:string)
    {
        if (this.ainfo && this.ainfo[gid]) {
            return this.ainfo[gid];
        }
        return 0;
    }

	public dispose():void
	{
		this.ainfo = null;
        this.rp = 1;
	}
}