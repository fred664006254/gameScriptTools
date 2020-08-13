class ReturnRewardPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.width=520;
		bg.height=264;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);

		// let iconList:BaseDisplayObjectContainer[]=GameData.getRewardItemIcons(Config.GameprojectCfg.rewardWB6,true);
		let rewardArrList = GameData.formatRewardItem(Config.GameprojectCfg.rewardWB6);
		// let l:number=Config.GameprojectCfg.rewardWB6z?iconList.length:0;

		let itemContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        let l:number=rewardArrList.length;
        let scaleNum:number=0.88;
        var newnum :number =0;
        for(let i:number=0;i<l;i++)
        {
            let icon:BaseDisplayObjectContainer=GameData.getItemIcon(rewardArrList[i]);
             var num= i%4;
            icon.setPosition((icon.width+10)*num,(icon.height+20)*Math.floor(i/4));
            icon.scaleX =scaleNum;
            icon.scaleY =scaleNum;
            itemContainer.addChild(icon);
            newnum =(icon.height+10)*Math.floor(i/4);
        }
        itemContainer.setPosition(this.viewBg.x+(this.viewBg.width-itemContainer.width)/2,30);
        this.addChildToContainer(itemContainer);

		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"wanbaReturnReward",this.confirmHandler,this);
		confirmBtn.setPosition(bg.x+(bg.width-confirmBtn.width)/2,bg.y+bg.height+10);
		this.addChildToContainer(confirmBtn);

		this.closeBtn.visible = false;
	}

	private confirmHandler():void
	{
		this.request(NetRequestConst.REQUST_USER_GETRETURNREWARD,{});
		
	}

	
	

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			//  "twsshareDesc","twsshareDescicon","studyatk_arrow","twshareicon",

		]);
	}
	public dispose():void
	{

		super.dispose();
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.cmd==NetRequestConst.REQUST_USER_GETRETURNREWARD)
			{
				if(data.data.data.rewards)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
					this.hide();
				}
			}
		}
	}
}