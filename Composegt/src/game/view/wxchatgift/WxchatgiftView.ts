class WxchatgiftView extends PopupView
{
    private getButton:BaseButton;
	protected initView():void
	{
        this.getButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.getButtonClick, this);
        this.addChild(this.getButton);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.updateStatus,this); 
		this.updateStatus();
	}
    private getButtonClick():void
    {
		if (Api.otherInfoVoApi.getWxchatgift() == 2) {
			// 已领取
			App.LogUtil.log("getButtonClick 已领取");
		} else if (Api.otherInfoVoApi.getWxchatgift() == 1) {
			// 可领取
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETWXCHATWARD, {});
		} else {
			// 需要跳转
			App.LogUtil.log("getButtonClick 需要跳转");
			PlatformManager.wxchatgiftKeFu({
				showMessageCard:true, 
				sendMessageTitle:LanguageManager.getlocal("wxchatgift_title"), 
				sendMessageImg:ServerCfg.getWxGameResourceUrl() + "other/wxchatgift_image/wxchatgift_image.png"
			});
		}
    }
	protected receiveData(data: { ret: boolean, data: any }) {
		if (data.ret) {
			if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWXCHATWARD) {
				if(data.data.data && data.data.data.rewards)
				{
					let rewards= GameData.formatRewardItem(data.data.data.rewards);
					if(rewards&&rewards.length>0)
					{
						App.CommonUtil.playRewardFlyAction(rewards);						
					}
				}
			}
			this.hide();
		}
	}
	private updateStatus() {
		if (Api.otherInfoVoApi.getWxchatgift() == 1) {
			App.CommonUtil.addIconToBDOC(this.getButton);
			this.getButton.setText("taskCollect");
		} else {
			App.CommonUtil.removeIconFromBDOC(this.getButton);
			this.getButton.setText("wxchatgift_go");
		}
	}
	protected getCloseBtnName():string
	{
		return "btn_lantern";
	}
	protected getTitleBgName():string
	{
		return "";
	}
	protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("wxchatgift_bg");		
		this.viewBg.width = 640;
		this.viewBg.height = 660;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
	}
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + 490, this.viewBg.y + 40);
		this.closeBtn.setScale(0.8);
        this.getButton.x = this.viewBg.x + this.viewBg.width/2 - this.getButton.width/2;
        this.getButton.y = this.viewBg.y + 553 - this.getButton.height/2;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([]);
	}
	protected getTitleStr():string
	{
		return null;
	}
	public dispose() {
		this.getButton = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO,this.updateStatus,this);
		super.dispose();
	}
}