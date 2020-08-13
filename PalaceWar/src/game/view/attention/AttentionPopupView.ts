class AttentionPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 180;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9+GameData.popupviewOffsetX;
		this.addChildToContainer(bg);

		let msgTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("attentionDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BLACK);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = bg.y + 20;
		// msgTF.lineSpacing = 5;
		this.addChildToContainer(msgTF);

		let rewardStr:string=Config.GameprojectCfg.rewardFKYLC1;
		let icons:BaseDisplayObjectContainer[]=GameData.getRewardItemIcons(rewardStr,true);
		let l:number=icons.length;
		let rewardContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		for(let i:number=0;i<l;i++)
		{
			icons[i].setPosition((icons[i].width+10)*i,0);
			rewardContainer.addChild(icons[i]);
		}
		rewardContainer.setPosition(this.viewBg.x+(this.viewBg.width-rewardContainer.width)/2,msgTF.y+msgTF.height+10);
		this.addChildToContainer(rewardContainer);


		let str = "attentionBtn";
		if(PlatformManager.checkAttention()){
			str = "taskCollect";
			if(Api.otherInfoVoApi.getFkFocusInfo()){
				str = "candyGetAlready";
			}
		}
		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,str,this.attentionHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = this.getShowWidth()/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);

		if(PlatformManager.checkAttention()){

			if(Api.otherInfoVoApi.getFkFocusInfo()){
				conBtn.setEnable(false);
			}
		}
	}

	protected attentionHandler():void
	{
		if(PlatformManager.checkAttention())
		{
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD,{});
		}
		else{
			PlatformManager.attention(this.attentionCallback,this);
			this.hide();
		}
		
		
	}

	protected attentionCallback():void
	{	
		this.request(NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD,{});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.cmd==NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD)
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