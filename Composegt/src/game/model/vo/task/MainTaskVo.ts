/**
 * 主线任务vo
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVo
 */
class MainTaskVo extends BaseVo
{
	// 门客vo列表
	public value:number;
	public taskId:string;
	public task:any = {};
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		let oldId = this.taskId;
		if(data.info)
		{
			this.value = data.info.v;
			let curTaskId = this.taskId;
        	this.taskId = data.info.id;
			if(curTaskId != this.taskId && this.taskId == "3" && curTaskId == "2"){

				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
			}
			// else if(this.taskId == "3" && curTaskId == "3"&&Api.mainTaskVoApi.isCurTaskReach()&&this.value==4){

			// 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND);
			// }
			if(Number(this.taskId)>2 && Number(this.taskId)<=10&&Api.mainTaskVoApi.isCurTaskReach())
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND);
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI);
		}
		if(oldId && oldId != this.taskId){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE);
		}
		if(data.task){
			this.task = data.task;
		}
    }

    public dispose():void
	{
        this.value = 0;
		this.taskId = null;
		this.task = {};
	}
}