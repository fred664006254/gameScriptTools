class FairArenaVo extends BaseVo
{
    public status = 0;//1 结束 2开始
    public winNum = 0;//胜利次数
    public loseNum = 0;//失败次数
    public line : any = null;//选取队列
    public pool : any = null;//骰子信息
    public rewards : any = null//奖励领取信息

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
		this.status = 0;//0 结束 1开始
        this.winNum = 0;//胜利次数
        this.loseNum = 0;//失败次数
        this.line = null;//选取队列
        this.pool = null;//骰子信息
        this.rewards = null//奖励领取信息
	}
}