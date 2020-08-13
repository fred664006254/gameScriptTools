/**
 * 京东618活动
 * author yanyuling
 * date 2018/05/25
 * @class AcJD618View
 */
class AcJD618View  extends BaseView
{
	public constructor() 
	{
		super();
	}
    public initView()
    { 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_JD618_GETREWARD),this.collect618RewardCallBack,this);

        let acImg = BaseBitmap.create("jd_activityimg");
        acImg.x = GameConfig.stageWidth/2 - acImg.width/2;
        acImg.y = GameConfig.stageHeigth/2 - acImg.height/2;
        this.addChild(acImg);
        
        let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"collect618BtnTxt",this.collect618Reward,this);
        collectBtn.x =  GameConfig.stageWidth/2 - collectBtn.width/2;
        collectBtn.y = acImg.y + acImg.height - collectBtn.height - 10 ;
        this.addChild(collectBtn);
    }

    protected collect618Reward()
    {
        if(Api.otherInfoVoApi.isJD618RewardEnable())
        {
            NetManager.request(NetRequestConst.REQUEST_JD618_GETREWARD,{});
        }
       
    }

    protected collect618RewardCallBack(event:egret.Event)
    {
        let ret = event.data.data.ret;
        if(ret == 0)
        {
            let rewardStr = event.data.data.data.rewards;
            let rList = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        this.hide();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "jd_activityimg",
		]);
	}

    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_JD618_GETREWARD),this.collect618RewardCallBack,this);
		super.dispose();
	}
}