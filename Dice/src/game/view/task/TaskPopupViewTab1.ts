/*
 *@description: 任务面板
 *@author: hwc 
 *@date: 2020-06-08 20:17:02
 *@version 
 */

class TaskPopupViewTab1 extends CommonViewTab {

    private listview:ScrollList = null;
    private listdata = null;

    public dispose(){

        super.dispose();
    }
    
    constructor(parameters) {
        super();
        this.initView();
    }

    protected initView(): void {
        this.listdata = Api.DailytaskVoApi.getTaskListData();
        let h = 690;
        let listview = ComponentMgr.getScrollList(TaskListItem, this.listdata, new egret.Rectangle(0,0,495, h));
        listview.setPosition(16, 60);
        this.addChild(listview);
        this.listview = listview;
        this.initEventListener();
    }

    protected getNetConstEventArr():string[]{
		return [
            NetConst.TASK_GET_REWARDS,
		];
    }
    
    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_DAILYTASK, MsgConst.REWARD_RANDOM_TASK,
		];
	}

    protected msgEventCallBack(evt : egret.Event){
        let view = this;
        switch(evt.type){
            case MsgConst.MODEL_DAILYTASK:
                view.refreshList();
                break;
            case MsgConst.REWARD_RANDOM_TASK:
                view.rewardRandomTask(evt);
                break;
        }
    }

    protected netEventCallBack(evt : egret.Event){
        let view = this;
        switch(evt.type){
            case NetConst.TASK_GET_REWARDS:
                view.openRewardPopupview(evt);
                break;
        }
    }

    private openRewardPopupview(event){
        let data = event.data.data;
        let ret = event.data.ret;
        let gold = Config.DailytaskCfg.getRandomTaskGoldByID(Api.DailytaskVoApi.getTouchID());
        let gem = Config.DailytaskCfg.getRandomTaskGemByID(Api.DailytaskVoApi.getTouchID());
        if(ret){
            // ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
            //     title : LangMger.getlocal("reward_pupopview_title"),
            //     rewards : `2_1_${gold}|1_1_${gem}`
            // });
        } else {
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title : LangMger.getlocal("reward_pupopview_title"),
                msg : data.msg
            });
        }
    }

    private rewardRandomTask(event){
        let taskId = event.data.taskID;
        let index = event.data.index;
        NetManager.request(NetConst.TASK_GET_REWARDS, {taskId:taskId});
    }

    private refreshList(){
        this.listdata = Api.DailytaskVoApi.getTaskListData();
        this.listview.refreshData(this.listdata);
    }
}