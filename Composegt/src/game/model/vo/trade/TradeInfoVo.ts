/**
 * 主线任务vo
 * author yanyuling
 * date 2018/01/04
 * @class TradeVo
 */
class TradeInfoVo extends BaseVo
{
	// 门客vo列表
	public rewards:string;
    public cid:string;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data.cid != null)
		{
			this.cid = data.cid;
        	this.rewards = data.rewards;
		}
    }

    public dispose():void
	{
        this.cid = null;
        this.rewards = null;
	}
}