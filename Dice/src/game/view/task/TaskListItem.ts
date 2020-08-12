/*
 *@description: 任务列表的 item
 *@author: hwc 
 *@date: 2020-04-11 16:06:16
 *@version 0.0.1
 */
enum taskitemconst {
    random_title_pre = "random_task_title_",
    random_task_dec ="random_task_desc",
    random_task_had_reward = "random_task_had_reward",
    random_task_can_reward = "random_task_can_reward"
}
class TaskListItem extends ScrollListItem{

    private dailytask:DailyTask;
    private randomTask:RandomTask;
    private opeTask:OperrationTask;
    constructor(){
        super()
    }
    protected initItem(index:number,data:any,itemParam?:any):void
	{   
        switch (data.type) {
            case 0:
                this.opeTask = new OperrationTask();
                this.opeTask.initView();
                this.addChild(this.opeTask)
                break;
            case 1:
                this.dailytask = new DailyTask();
                this.dailytask.initView();
                this.addChild(this.dailytask);
                break;
            case 2:
                this.randomTask = new RandomTask(this, index - 1);
                this.randomTask.initView();
                break;
            default:
                break;
        }
    }

	/**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
        this.randomTask = null;
        this.opeTask = null;
        this.dailytask = null;
		super.dispose();
	}
}