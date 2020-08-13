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
        	this.taskId = data.info.id;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI);
		}
		if(oldId && oldId != this.taskId){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE);
		}
    }

    public dispose():void
	{
        this.value = 0;
        this.taskId = null;
	}
}