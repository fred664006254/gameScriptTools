/**
 * 每日任务vo
 * author yanyuling
 * date 2017/10/27
 * @class DailyTaskVo
 */
class DailytaskVo extends BaseVo
{  
    public dailyTaskList = {};
    public rewards:Object; //奖励信息
    public liveness:number=0; //活跃度
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if (this.dailyTaskList == null)
        {
            this.dailyTaskList = {};
        }
        if (data.liveness != null)
        {
            this.liveness = data.liveness;
        }
        
        this.rewards = data.rewards;
        for (var key in data.info) {
            let tmpTaskAttr:DailyTaskAttrVo = this.dailyTaskList[key];
            if(tmpTaskAttr == null)
            {
                tmpTaskAttr = new DailyTaskAttrVo();
                this.dailyTaskList[key] = tmpTaskAttr
            }
            tmpTaskAttr.initData(data.info[key]);
            tmpTaskAttr.taskId = key;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC);
    }

    public dispose()
    {
        this.dailyTaskList = [];
        this.rewards = null;
        this.liveness = 0;
    }
}
