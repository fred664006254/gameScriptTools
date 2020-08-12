/*
 *@description: 成就面板
 *@author: hwc 
 *@date: 2020-06-08 20:17:02
 *@version 
 */

class TaskPopupViewTab2 extends CommonViewTab {

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
        this.listdata = Api.AchievementVoApi.getAchList();
        let h = 690;
        let listview = ComponentMgr.getScrollList(AchieveListItem, this.listdata, new egret.Rectangle(0,0,495, h));
        listview.setPosition(16, 60);
        this.addChild(listview);
        this.listview = listview;
        this.initEventListener();
    }

    protected getNetConstEventArr():string[]{
		return [
            NetConst.TASK_GETACHIEVEMENT,
		];
    }

    protected netEventCallBack(evt: egret.Event){
        let data = evt.data;
        if(data && data.ret){
            switch (data.data.cmd) {
				case NetConst.TASK_GETACHIEVEMENT:
					this.getReward(data.data.data);
					break;
				default:
					break;
			}
		}
    }
    
    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_ACHIEVEMENT
		];
	}

    protected msgEventCallBack(evt : egret.Event){
        switch(evt.type){
            case MsgConst.MODEL_ACHIEVEMENT:
                this.refreshList();
                break;
            default:
                break;
        }
    }

    private refreshList(){
        this.listdata = Api.AchievementVoApi.getAchList();
        this.listview.refreshData(this.listdata);
    }

    private getReward(data:any){
        let type = Api.AchievementVoApi.rewardType;
        if(type === 100){
            ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                title : LangMger.getlocal("reward_pupopview_title"),
                rewards : data.rewards,
                callback: () => {
                    // App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                }
            });
        } else {
            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
        }
        
    }
}