class InviteFriendVo extends BaseVo
{
    public code : string = ``;//邀请码
    public score = 0;//我的邀请积分
    public iscore = 0;//我带来的邀请积分
    public iuid = 0;//邀请者
    public rinfo : any = null//奖励领取信息

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
		}
	}

	public dispose():void
	{
		this.code = "";
        this.score = 0;
        this.iscore = 0;
        this.iuid = 0;
        this.rinfo = null;
	}
}