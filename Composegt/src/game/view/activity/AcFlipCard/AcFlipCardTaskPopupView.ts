/**
 * author yanyuling
 */
class AcFlipCardTaskPopupView extends PopupView
{
    public constructor() {
		super();
	}
    private scrollView:ScrollList;
     protected get acVo():AcFlipCardVo
	{
		return <AcFlipCardVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
	}
    protected initView():void
	{

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH,this.refreshTaskRed,this);
		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height =620
        bg1.x =42;
        bg1.y =10;
        this.addChildToContainer(bg1);

        let rect = new egret.Rectangle(0,0,bg1.width -20,bg1.height - 20);
        let scrollView = ComponentManager.getScrollList(AcFlipCardTaskScrollItem,[],rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = bg1.x + 10;
        scrollView.y = bg1.y + 10;
        this.addChildToContainer(scrollView);
        this.scrollView = scrollView;
        this.refreshTaskRed();

        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD,this.onReciveRes,this);
    }

    private onReciveRes(event: egret.Event) {
        if(event.data&&event.data.ret){
            let data = event.data.data.data;
            let rewards = data.rewards;
            let cfrewards = data.cfrewards;
            let rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);

            if(rewards != cfrewards){
                let rewardItemvo:RewardItemVo[] = GameData.formatRewardItem(cfrewards);
                for (var index = 0; index < rewardItemvo.length; index++) {
                    var element = rewardItemvo[index];
                    if(element.type == 8){
                        let sercfg = Config.ServantCfg.getServantItemById(element.id);
                        if(sercfg.exchange){
                            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":sercfg.name,"touch":sercfg.exchange,"message":"changeOtherRewardTip"});
                            break;
                        }
                    }else if(element.type == 10) {
                        let wifecfg = Config.WifeCfg.getWifeCfgById(element.id);
                        if(wifecfg.exchange){
                            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":wifecfg.name,"touch":wifecfg.exchange,"message":"changeOtherRewardTip"});
                            break;
                        }
                    }
                }
            }
        }
    }

    private refreshTaskRed()
    {
        let cfg = <Config.AcCfg.FlipCardCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
        let task = cfg.task;
        let list1 = [];
        let list2 = [];
        let list3 = [];
        for (var index = 0; index < task.length; index++) {
            var element = task[index];
            let openType = element.openType;

            if(element.questType =="1")
			{
				let openDay  = App.DateUtil.getActivityDay(this.acVo.et,this.acVo.st);
				if(openDay <element.value)
				{
					continue;
				}
			}
            //任务进度
            let taskNum = this.acVo.gettTaskNum(""+element.questType);
            let newTaskNum = element.value;
            if(this.acVo.getTaskStatus( "" + (element.id) )){
                list3.push(element)
            }else{
                if(taskNum >= newTaskNum){
                    list1.push(element);
                }else{
                    list2.push(element);
                }
            }
        }
        let list = list1.concat(list2).concat(list3);
        this.scrollView.refreshData(list);
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
			"acchristmasview_1_red"
        ]);
	}

    // protected getShowHeight():number
	// {
	// 	return 850;
	// }

	// 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}


    public dispose()
    {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH,this.refreshTaskRed,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD,this.onReciveRes,this);
        this.scrollView = null;
        super.dispose()
    }
}