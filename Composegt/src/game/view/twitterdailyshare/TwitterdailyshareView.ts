class TwitterdailyshareView extends PopupView
{

	public constructor() 
	{
		super();
	}
	private get vo():any{
		return Api.otherInfoVoApi.getGeneralShareInfo();
	}
	protected initView():void
	{
		this.showShareView();
	}

	/**
	 * 重写 初始化viewbg
	 * 仅适用于新的分享
	 */
	protected initBg():void
	{
		
		this.viewBg = BaseLoadBitmap.create("twitter_share_fenxiang");
		
		
		this.viewBg.width = 640;
		this.viewBg.height = 644;

		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "btn_lantern";
	}
	/**
	 * 重新一下title按钮 
	 * 仅适用于新的分享
	 */
	protected getTitleBgName():string
	{
		return "";
	}
	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + 510, this.viewBg.y +50 + 32);
	}
	/**
	 * 使用新的分享面板
	 */
	private showShareView()
	{
		//分享的奖励列表
		let _reward = Config.GameprojectCfg.shareRewardtwJP;   
		//从左到右413    从右到左227       横向距离640
		let shareTF = ComponentManager.getTextField(LanguageManager.getlocal("sharePopupViewShareGameTip"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
		shareTF.anchorOffsetX = shareTF.width / 2;
		// shareTF.setPosition(this.viewBg.x + this.viewBg.width - 227,this.viewBg.y + shareTF.height + 95);
		shareTF.setPosition(450,this.viewBg.y - shareTF.height/2 + 195);
		this.addChildToContainer(shareTF);

		let rewardVo = GameData.formatRewardItem(_reward);
		for(let i = 0; i < rewardVo.length;i++)
		{
			let reward = GameData.getItemIcon(rewardVo[i],true,true);
			reward.anchorOffsetX = reward.width  / 2;
			reward.setScale(0.7);
			reward.setPosition(425 + (i % 3 - 1) * (reward.width - 20), this.viewBg.y + 230 + (Math.floor(i/3)* (reward.height - 18)));
			this.addChildToContainer(reward);
		}
 

		let confirmBtn:BaseButton=ComponentManager.getButton("share_button_fenxiang",null,this.shareBtnClick,this);
		confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - 65 ,this.viewBg.y + this.viewBg.height - confirmBtn.height - 90);
		this.addChildToContainer(confirmBtn);

	}

	//分享回调
	private shareCallback(data:any):void
	{
		console.log("shareCallback-->",data);
		this.requestRewardShare();
	}

	//点击分享按钮
	private shareBtnClick()
	{
		if( Api.otherInfoVoApi.getTwdailyshare() != 1){
			//本地
			if(PlatformManager.checkIsLocal())
			{	
				App.CommonUtil.showTip("本地环境，直接领取奖励");
				this.requestRewardShare();
				return;
			}

			let shareType = App.ShareGuideUtil.SHARETYPE_SHARE_TWITTERDAILY;
			//分享  
			PlatformManager.share(shareType,this.shareCallback,this);
		}else{
			App.CommonUtil.showTip(LanguageManager.getlocal("sharePopupViewShareOver"));
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"share_button_fenxiang"
					]);
	}
	protected getTitleStr():string
	{
		return null;
	}
	/**
	 * 领奖请求
	 */
	private requestRewardShare()
	{
		this.request(NetRequestConst.REQUST_OTHERINFO_GETSHAREREWARD,{});
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.data.rewards)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
				this.hide();
			}

		}
	}
}



