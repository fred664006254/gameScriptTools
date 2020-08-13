/**
 * 每日任务,单个任务详情vo
 * author yanyuling
 * date 2017/10/27
 * @class DailyTaskAttrVo
 */
class DailyTaskAttrVo extends BaseVo
{  
    public taskId:string;
    public task_f:number;
    public task_v:number;
     public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        this.task_f = data.f;
        this.task_v = data.v;
    }

    public dispose()
    {
        this.task_f = null;
        this.task_v = null;
    }
}
