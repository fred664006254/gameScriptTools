/**
 * 主线任务vo
 * author yanyuling
 * date 2018/01/04
 * @class TradeVo
 */
class TradeVo extends BaseVo
{
	public point:number =0; //"通商分数",
	public lastday:number =0; //"特殊数据重置时间",
	public updated_at:number =0; //"数据上次更新时间",
	public rewards:string[]=null;
    public cid:string;
	public batchFlag:number=0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
	 
		if(data.point != null )
		{
			this.point = data.point;
		}
		if(data.lastday != null )
		{
			this.lastday = data.lastday;
		}
		if(data.updated_at != null )
		{
			this.updated_at = data.updated_at;
		}
		if(data.info != null )
		{
			this.cid = data.info.cid
			this.rewards = data.info.rewards;
		}
		if(data.flag != null )
		{
			this.batchFlag = data.flag;
		}
    }

    public dispose():void
	{
		this.point= 0;
		this.lastday = 0;
		this.updated_at = 0;
		this.cid = null;
		this.rewards = null;
		this.batchFlag = 0;
	}
}