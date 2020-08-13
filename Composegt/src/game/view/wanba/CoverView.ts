class CoverView extends CommonView
{
	private _scrollList:ScrollList;
	/**
	 * 可以检测的次数
	 */
	private _canCheckCount:number;
	/**
	 * 是否正在检测
	 */
	private _checking:boolean;
	/**
	 * 去设置，或领取按钮
	 */
	private _oneBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this._canCheckCount = 0;
		this._checking = false;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_SETCOVER,this.setCoverCallback,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD,this.rewardCallback,this);

		let bottomBg = BaseBitmap.create("coverBg");
		bottomBg.y = -10;
		bottomBg.height = GameConfig.stageHeigth;
		this.addChildToContainer(bottomBg);
		
		// 设置或领取按钮
		let btnStr = "";
		if (Api.otherInfoVoApi.getCoverState() === 0) {
			btnStr = "cover_goSetting";
		} else {
			btnStr = "taskCollect";
		}
		let setOrGetRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnStr,this.setOrGetRewardButtonHandler ,this);        
		setOrGetRewardBtn.x = GameConfig.stageWidth/2-setOrGetRewardBtn.width/2;
		setOrGetRewardBtn.y = 810-setOrGetRewardBtn.height/2;
		setOrGetRewardBtn.name = "setOrGetRewardBtn";
		this.addChildToContainer(setOrGetRewardBtn);
		this._oneBtn = setOrGetRewardBtn;

		// 奖励
		// let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem("6_1150_1|6_1201_1|6_1207_1|6_1208_1|6_1209_1|6_1210_1|6_1001_5|6_1003_5");
		let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(Config.GameprojectCfg.rewardWB5);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,400,200);

		this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem,rewardVoList,rect);
		this._scrollList.x = GameConfig.stageWidth/2 - (Math.min(4,rewardVoList.length)/2) * 100;
		this._scrollList.y = 545;
		this.addChildToContainer(this._scrollList);

		// 文字
		let enterTxt = ComponentManager.getTextField(LanguageManager.getlocal("cover_desc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
		enterTxt.textAlign = TextFieldConst.ALIGH_LEFT;
		enterTxt.x = 37;
		enterTxt.y = 455- enterTxt.height/2;
		enterTxt.lineSpacing = 10;
		this.addChildToContainer(enterTxt);
		let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("cover_desc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
		getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
		getTxt.x = GameConfig.stageWidth/2-getTxt.width/2;
		getTxt.y = 505- getTxt.height/2;
		getTxt.lineSpacing = 10;
		this.addChildToContainer(getTxt);
	}
	private setCoverCallback(event:egret.Event):void
	{
		console.log("setCoverCallback");
		let {ret,data}=<{ret:boolean,data:any}>event.data;
		if (ret) {
			this._oneBtn.setText("taskCollect");
		}
	}

	private rewardCallback(event:egret.Event):void
	{
		console.log("rewardCallback");
		let {ret,data}=<{ret:boolean,data:any}>event.data;
		if (ret) {
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
			this.hide();
		}
	}
	private setOrGetRewardButtonHandler():void
	{
		console.log("setOrGetRewardButtonHandler");
		if (Api.otherInfoVoApi.getCoverState() === 0) {
			console.log("callBackDrop");
			RSDKHelper.callBackDrop();
			this._canCheckCount = 3;
		} 
		else if (Api.otherInfoVoApi.getCoverState() === 1) {
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD,{});
		} else {
			console.log("已领取了奖励,为什么还要点按钮");
		}
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["coverBg"]);
	}
	private tick():void
	{
		if (!this._checking && this._canCheckCount > 0) {
			this._checking = true;
			RSDKHelper.checkBackDrop((result:boolean)=>{
				console.log("checkBackDrop检测结果"+result);
				this._checking = false;
				if (result) {
					this._canCheckCount = 0;
					this.request(NetRequestConst.REQUEST_OTHERINFO_SETCOVER,{});
				} else {
					this._canCheckCount--;
				}
			});
		}
		// console.log("tick");
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_SETCOVER,this.setCoverCallback,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD,this.rewardCallback,this);
		this._scrollList = null;
		this._oneBtn = null;
		this._canCheckCount = 0;
		this._checking = false;
		super.dispose();
	}
}