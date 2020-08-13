/**
 * 分享窗口
 * 在很多地方分享
 * jiangliuyang
 * 
 */
class ShareCommonPopupView extends PopupView
{



	private _shareBtn:BaseButton = null;

	private _rewardContainer:BaseDisplayObjectContainer[] = [];

	private _shareTF1:BaseTextField = null;

	private _shareTF2:BaseTextField = null;

	private _reward:string = null;


	

	////////////////
	private _type: string = null;
	private _lv : string = null;
	private _wxshare:[string,string,string,string,string,string] = null;

	private _callback: Function = null;
	private _target: any = null;

	public constructor() 
	{
		super();
	}
	// private get vo():any{
	// 	return Api.otherInfoVoApi.getGeneralShareInfo();
	// }
	protected initView():void
	{

		//创建分享界面
		this.createShareView();
	}
	// protected getParent():egret.DisplayObjectContainer
	// {
	// 	if(this._type == ShareVoApi.TYPE_GRADE){
	// 		return LayerManager.maskLayer;
	// 	} else {
	// 		return LayerManager.panelLayer;
	// 	}
        
	// }
	/**
	 * 创建分享界面
	 */
	private createShareView()
	{
		

		//从配置中取得奖励数据
		this._reward = null;
		switch(this._type){
			case "a":
				this._reward = Config.GameprojectCfg.rewardALL2;
				break;
			case "b":
				this._reward = Config.GameprojectCfg.rewardAll3;
				break;
			case "c":
				let rewardList = Config.GameprojectCfg.rewardAll4;
				this._reward = rewardList[this._lv];
				break;			
		}
		
		if(this._wxshare.length > 0){
			//从左到右413    从右到左227       横向距离640
			this._shareTF1 = ComponentManager.getTextField(this._wxshare[0],30,TextFieldConst.COLOR_BLACK);
			// this._shareTF1.width = 400;
			this._shareTF1.textAlign = TextFieldConst.ALIGH_CENTER;
			this._shareTF1.setPosition(this.viewBg.width/2 - this._shareTF1.width/2, this.viewBg.y + 70 - this._shareTF1.height/2);
			this.addChildToContainer(this._shareTF1);
		}

		if(this._wxshare.length > 1){
			this._shareTF2 = ComponentManager.getTextField(this._wxshare[1],TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
			// this._shareTF2.width = 400;
			this._shareTF2.textAlign = TextFieldConst.ALIGH_CENTER;
			this._shareTF2.setPosition(this.viewBg.width/2 - this._shareTF2.width/2, this.viewBg.y + 285 - this._shareTF2.height/2);
			this.addChildToContainer(this._shareTF2);
		}



		let rewardVo = GameData.formatRewardItem(this._reward);
		let startX = this.viewBg.x + this.viewBg.width / 2 - (rewardVo.length * 108 * 0.8 + (rewardVo.length - 1) * 10) / 2;

		for(let i = 0; i < rewardVo.length;i++)
		{
			let reward = GameData.getItemIcon(rewardVo[i],true,true);
			reward.setScale(0.8);
			reward.x = startX + i * (reward.width * 0.8 + 10);
			reward.y = this.viewBg.y + 159;
			this.addChildToContainer(reward);

		}

		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sharePopupViewTitle",this.shareBtnClickEvent,this);
		confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - confirmBtn.width/2 ,this.viewBg.y + this.viewBg.height - confirmBtn.height - 105);
		this.addChildToContainer(confirmBtn);
		this._shareBtn = confirmBtn;

		
	}
	protected getTitleStr():string
	{
		return null;
	}
	//点击分享按钮
	private shareBtnClickEvent()
	{
	
		/**判断是否为本地地址 */
		if(PlatformManager.checkIsLocal())
		{
			this.shareSuccessCallback();
			return;
		}
		this.confirmHandler();
		
	}
	//分享
	private confirmHandler():void
	{	
		
	
		//是微信平台
		if(App.DeviceUtil.isWXgame()){
			//微信平台分享次数统计
			NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETSHARENUM,{type:this._type, lv:this._lv});
			//分享标头
			let shareTitle = this._wxshare[4];
			//分享内容
			let shareContent = this._wxshare[5];
	
			let shareId = this._wxshare[2];
			let shareImgUrl = ServerCfg.getWxGameResourceUrl() + "other/share_guide_image/" + this._wxshare[3];

			let content = {title: shareTitle, desc: shareContent, imageurl:shareImgUrl}

			RSDKHelper.guideShare(content,this.shareSuccessCallback.bind(this), shareId);
		} else{
			//分享失败
			App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
		}
	
	}

	//分享成功回调
	private shareSuccessCallback():void
	{
		//查看是否有分享界面
		let shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHARECOMMONPOPUPVIEW)
		if(shareView && shareView.isInit())
		{
			//添加获得奖励监听
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD,this.showReward,this);
			//获得奖励
			NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD,{type:this._type, lv:this._lv});

		}
	}

	//分享成功处理
	private showReward(event):void
	{	
		
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD,this.showReward,this);
	

		let r = event.data.data.ret;
		if(r == 0){
			if(event.data.data.data.rewards)
			{	
				//分享成功后刷新界面
				this.refreshShareSuccessView()
				//调用奖励界面
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
			} else {
				//领取失败
				App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonReceiveFailed"));
			}
		} else if (r == -3){
			//已经领取过了
			App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonReceived"));
		} else {
			//领取失败
			App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonReceiveFailed"));
		}


	}

	//分享成功后刷新界面
	private refreshShareSuccessView():void
	{
		//分享按钮禁用 并致灰色
		this._shareBtn.setGray(true);
		this._shareBtn.setEnable(false);
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
	 * 重写 初始化viewbg
	 * 仅适用于新的分享
	 */
	protected initBg():void
	{	

		if(this.param != null)
		{
			this._type = this.param.data.type;
			this._lv = this.param.data.lv;
			this._wxshare = this.param.data.wxshare;
			this._callback = this.param.data.callback;
			this._target = this.param.data.target;
		}
		let bgName = null;
		switch(this._type){
			case "a":
				bgName = "shareBgWife";	
				break;
			case "b":
				bgName = "shareBgChild";
				break;
			case "c":
				bgName = "shareBgLv";
				break;

		}
		this.viewBg = BaseLoadBitmap.create(bgName);
		this.viewBg.width = 635;
		this.viewBg.height = 474;
		
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		// this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width,this.viewBg.y - 5);
		this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width - 10,this.viewBg.y + 20);
	}

	/**
	 * 重写关闭方法
	 * 仅适用于新的分享
	 */
	protected closeHandler():void
	{
		if (this._callback != null && this._target != null){
			this._callback.call(this._target);
		}
		this.hide();
	}

	public dispose():void
	{

		this._shareTF1 = null;
		this._shareTF2 = null;
		this._shareBtn = null;
		this._reward = null;
		this._type = null;
		this._lv = null;
		this._wxshare = null;
		this._callback = null;
		this._target = null;

		super.dispose();
	}
}

 