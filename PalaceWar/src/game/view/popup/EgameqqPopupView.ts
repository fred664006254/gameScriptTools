class EgameqqPopupView extends PopupView
{   
    private _rewardBtn:BaseButton = null;
	public constructor() 
	{
		super();
	}

    protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("egameqqpopupview_bg");
		this.viewBg.height = 774;
		this.viewBg.width = 620;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}

    public initView():void
	{
        this._rewardBtn=ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"wanbaegameqq_reward",this.rewardHandle,this);
		this._rewardBtn.setPosition(this.viewBg.x + this.viewBg.width/2 -this._rewardBtn.width/2,220);
		this.addChildToContainer(this._rewardBtn);

        if (Api.otherInfoVoApi.checkWanbaEGameHasReward())
        {
            this._rewardBtn.setEnable(false);
            this._rewardBtn.setText("candyGetAlready");
        }

        let lookBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"wanbaegameqq_look",this.lookHandle,this);
		lookBtn.setPosition(this.viewBg.x + this.viewBg.width / 2  -lookBtn.width/2,618);
		this.addChildToContainer(lookBtn);

        let rewardList = GameData.formatRewardItem(Config.GameprojectCfg.rewardWB7);
        if(rewardList)
        {
            for (var index = 0; index < rewardList.length; index++) {
                let iconItem = GameData.getItemIcon(rewardList[index],true);
                iconItem.setScale(0.9);
                let posX:number=this.viewBg.x + this.viewBg.width/2 - rewardList.length*55+10 + index*110;
                iconItem.setPosition(posX,94);
                this.addChildToContainer(iconItem);
            }
        }
    }

    private rewardHandle():void
    {
        this.request(NetRequestConst.REQUEST_OTHERINFO_GETQQESREWARD,{});
    }

    protected receiveData(data:{ret:boolean, data:any}):void 
    {
		if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETQQESREWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
                this._rewardBtn.setEnable(false);
                this._rewardBtn.setText("candyGetAlready");
			}
		}
	}

    private lookHandle():void
    {
        // RSDKHelper.openUrl("https://m.egame.qq.com/download/app?adtag=lmxldy",null,null);
        RSDKHelper.openUrl("http%253a%252f%252fm.egame.qq.com%252fdownload%252fapp%253fchannel%253dh5ldy2%2526type%253dact%2526url%253dqgameapi%253a%252f%252fbrowser%253furl%253dhttp%253a%252f%252fcdn.egame.qq.com%252fgame-weex%252fpage%252fdetailV2.html%253fappid%253d101477809%2526_pggwv%253d8%2526_wv%253d1%2526v%253d20180730%2526ADTAG%253dkjldy%2526weex%253dhttp%253a%252f%252fcdn.egame.qq.com%252fgame-weex%252fweex%252fdetailV2%252fapp.js%253fappid%253d101477809%2526_pggwv%253d8%2526_wv%253d1%2526v%253d20180730%2526ADTAG%253dkjldy",null,null);
    }

    protected getTitleStr():string
	{
		return null;
	}

    public dispose():void
	{
        this._rewardBtn = null;
		super.dispose();
	}
}