/**
 * 签到vo
 * author dmj
 * date 2017/11/04
 * @class ArrivalVo
 */
class ArrivalVo  extends BaseVo
{
	/**签到状态，1已领奖 0未领奖 */
	public flag:number = 0;
	/**累积签到多少天 */
	public arrival_count:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.info != null)
			{
				this.flag = Number(data.info);
			}
			if(data.arrival_count != null)
			{
				if(this.flag == 0)
				{
					this.arrival_count = Number(data.arrival_count) + 1;
				}
				else
				{
					this.arrival_count = Number(data.arrival_count);
				}
				
			}
		}
	}

	public dispose():void
	{
		this.flag = 0;
		this.arrival_count = 0;
	}
}