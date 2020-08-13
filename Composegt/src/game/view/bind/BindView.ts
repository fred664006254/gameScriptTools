class BindView extends PopupView
{
	private _scrollList:ScrollList;
	private _mainBtn:BaseButton;
	/** 对话框是否在打开状态 */
	private _opening:boolean;
	/** 绑定状态 */
	private _bindState:number;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this._opening = true;
		this._bindState = 0;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD,this.rewardCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_BIND,this.checkBindStateCallback,this);

		let bottomBgStr = "bindViewBg";
		let bottomBg = BaseBitmap.create(bottomBgStr);
		bottomBg.x = 10;
		this.addChildToContainer(bottomBg);
		
		// 文字
		let bindWay = ComponentManager.getTextField(LanguageManager.getlocal("bindWay"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		bindWay.textAlign = TextFieldConst.ALIGH_LEFT;
		bindWay.x = 250;
		bindWay.y = 120;
		bindWay.width = 300;
		bindWay.lineSpacing = 10;
		this.addChildToContainer(bindWay);


		// 绑定或领取按钮
		let btnStr = "bindBtn";
		let bindOrGetRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnStr,this.bindOrGetRewardButtonHandler ,this);        
		bindOrGetRewardBtn.x = 400-bindOrGetRewardBtn.width/2;
		bindOrGetRewardBtn.y = 222-bindOrGetRewardBtn.height/2;
		bindOrGetRewardBtn.name = "bindOrGetRewardBtn";
		bindOrGetRewardBtn.visible = false;
		this.addChildToContainer(bindOrGetRewardBtn);
		this._mainBtn = bindOrGetRewardBtn;

		// 不同平台，奖励不同
		var rewardStr = Config.GameprojectCfg.rewardGT1;
		let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(rewardStr);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,500,110);

		this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem,rewardVoList,rect);
		this._scrollList.x = 284 - (Math.min(5,rewardVoList.length)/2) * 100;
		this._scrollList.y = 320;
		this.addChildToContainer(this._scrollList);

		this.checkBindState();
	}
	private bindOrGetRewardButtonHandler():void
	{
		if (this._bindState === 1) { // 已绑定
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD,{});
		} else { // 未绑定
			PlatformManager.openUserCenter();
			this.hide();
		}
	}
	// 检查绑定状态
	private checkBindState():void
	{
		RSDKHelper.bindAccountStatus();
	}
	// 检查绑定状态回调
	private checkBindStateCallback(event:egret.Event):void
	{
		let result = event.data;
		if (this._opening) {
			this._bindState = parseInt(result);
			if (parseInt(result) === 1) {
				this._mainBtn.setText("taskCollect");
			} else {
				this._mainBtn.setText("bindBtn");
			}
			if (!this._mainBtn.visible) {
				this._mainBtn.visible = true;
			}
		}
	}
	private rewardCallback(event:egret.Event):void
	{
		let {ret,data}=<{ret:boolean,data:any}>event.data;
		if (ret) {
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
			this.hide();
		}
	}
	protected getShowHeight():number
	{
		return 500;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["bindViewBg"]);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD,this.rewardCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_BIND,this.checkBindStateCallback,this);
		this._scrollList = null;
		this._mainBtn = null;
		this._opening = false;
		this._bindState = 0;
		super.dispose();
	}
}