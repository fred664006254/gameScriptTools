class SharePopupView extends PopupView
{
	private _handContainer:BaseDisplayObjectContainer;
	private _shareType:number = 0;
	private _isTask:boolean = false;

	private _shareBtn:BaseButton = null;

	private _numTxt:BaseTextField = null;

	private _rewardContainer:BaseDisplayObjectContainer[] = [];
	/** 分享的次数 */
	private _shareNum = 0;

	private _shareTF:BaseTextField = null;

	private _allShareNum = 0;

	private _reward:any[] = [];

	private _receiveBM:BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	private get vo():any{
		return Api.otherInfoVoApi.getGeneralShareInfo();
	}
	protected initView():void
	{

		if(this.param != null)
		{
			if(String(this.param.data.isTask) == "1")
			{
				this._isTask = true;
			}
			
		}
		this._shareType = PlatformManager.checkShare();
		this.showNewShareView();
	

	}
	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "sharepopupview_closebtn";
	}
	/**
	 * 重新一下title按钮 
	 * 仅适用于新的分享
	 */
	protected getTitleBgName():string
	{
		return "";
	}
	protected getTitleStr():string
	{
		return "";
	}	
	/**
	 * 重写 初始化viewbg
	 * 仅适用于新的分享
	 */
	protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("sharepopupview_bg");
		this.viewBg.height = 560;
		this.viewBg.width = 640;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width,this.viewBg.y + this.closeBtn.height + 10);
	}
	/**
	 * 使用新的分享面板
	 */
	private showNewShareView()
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS,this.sendShareSuccess,this);

		//这块需要服务器返回次数和分享信息
		this._shareNum = this.vo.sharenum    //添加一个字段  是已经分享的次数
		
		this._allShareNum = Config.GameprojectCfg.rewardAllNum;
		//分享的奖励列表
		this._reward = Config.GameprojectCfg.rewardAll1;   
		//从左到右413    从右到左227       横向距离640
		let shareTF = ComponentManager.getTextField(LanguageManager.getlocal("sharePopupViewShareGameTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		shareTF.anchorOffsetX = shareTF.width / 2;
		shareTF.setPosition(this.viewBg.x + this.viewBg.width - 227-GameData.popupviewOffsetX,this.viewBg.y + shareTF.height + 95);
		this.addChildToContainer(shareTF);
		this._shareTF = shareTF;

		let nextRewardIndex = 0;
		if(this._shareNum >= this._allShareNum)
		{
			nextRewardIndex = this._shareNum;
		}
		else
		{
			nextRewardIndex = this._shareNum + 1;
		}
		if(nextRewardIndex > this._reward.length)
		{
			nextRewardIndex = this._reward.length;
		} 
		let rewardVo = GameData.formatRewardItem(this._reward[nextRewardIndex]);
		for(let i = 0; i < rewardVo.length;i++)
		{
			let reward = GameData.getItemIcon(rewardVo[i],true,true);
			reward.anchorOffsetX = reward.width  / 2;
			reward.setScale(0.8);
			// reward.anchorOffsetY = reward.height  / 2;
			reward.setPosition(shareTF.x + (i % 3 - 1) * reward.width,shareTF.y + shareTF.height + (Math.floor(i/3)* (reward.height - 10)) + 12);
			this.addChildToContainer(reward);
			this._rewardContainer.push(reward);
		}

		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sharePopupViewTitle",this.showHand,this);
		confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 ,this.viewBg.y + this.viewBg.height - confirmBtn.height - 90);
		this.addChildToContainer(confirmBtn);
		this._shareBtn = confirmBtn;

		let receiveBM = BaseBitmap.create("collectflag");
		receiveBM.anchorOffsetX = receiveBM.width / 2;
		receiveBM.anchorOffsetY = receiveBM.height / 2;
		receiveBM.setPosition(this._shareBtn.x + this._shareBtn.width / 2,this._shareBtn.y + this._shareBtn.height / 2);
		receiveBM.setScale(0.7);
		this.addChildToContainer(receiveBM);
		this._receiveBM = receiveBM;
		this._receiveBM.setVisible(false);


		//public_searchdescbg
		let txtBg = BaseBitmap.create("public_searchdescbg");
		txtBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - txtBg.width / 2,this.viewBg.y + this.viewBg.height + txtBg.height - 105);
		this.addChildToContainer(txtBg);
		if(this._isTask)
		{
			txtBg.setVisible(false);
		}

		let numTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WHITE);
		if(this._shareNum >= this._allShareNum)
		{
			numTxt.text = LanguageManager.getlocal("sharePopupViewShareOver");
			this._shareBtn.setVisible(false);
			this._receiveBM.setVisible(true);
		}
		else if( this.vo && this.vo.et && this.vo.et > GameData.serverTime)
		{
			let time = App.DateUtil.getFormatBySecond(this.vo.et -GameData.serverTime,1);
			numTxt.text = LanguageManager.getlocal("sharePopupViewShareTime",[time]);
			this.tick();	
			this._shareBtn.setVisible(true);
			this._shareBtn.setEnable(false);
		}
		else
		{
			numTxt.text = LanguageManager.getlocal("sharePopupViewShareNum",[String(this._allShareNum - this._shareNum)]);
			this._shareBtn.setVisible(true);
			this._shareBtn.setEnable(true);
		}

		numTxt.setPosition(this.viewBg.x + this.viewBg.width / 2- numTxt.width / 2,txtBg.y + txtBg.height / 2  - numTxt.height / 2);
		this.addChildToContainer(numTxt);
		this._numTxt = numTxt;
		if(this._isTask)
		{
			this._numTxt.setVisible(false);
		}

		
			
	}
	/**
	 * 刷新新的分享面板的UI  处理返回消息之后的刷新处理
	 */
	private updateView()
	{
		this._shareNum = this.vo.sharenum //添加一个字段  是已经分享的次数

		if(this._shareNum >= this._allShareNum)
		{
			this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareOver");
			this._shareBtn.setVisible(false);
			this._receiveBM.setVisible(true);
			this._receiveBM.setScale(1.5);
			egret.Tween.get(this._receiveBM).to({scaleX:0.7,scaleY:0.7},200);
		}
		else if(this.vo && this.vo.et && this.vo.et > GameData.serverTime)
		{
			let time = App.DateUtil.getFormatBySecond(this.vo.et -GameData.serverTime,1);
			this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareTime",[time]);
			this._shareBtn.setVisible(true);
			this._shareBtn.setEnable(false);
			this._receiveBM.setVisible(false);
			this.tick();	
		}
		else
		{
			this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareNum",[String(this._allShareNum - this._shareNum)]);
			this._shareBtn.setVisible(true);
			this._shareBtn.setEnable(true);
			this._receiveBM.setVisible(false);

		}
		this._numTxt.x = this.viewBg.x + this.viewBg.width / 2- this._numTxt.width / 2;
		//分享成功之后 刷新界面
		let nextRewardIndex = 0;
		if(this._shareNum >= this._allShareNum)
		{
			nextRewardIndex = this._shareNum;
		}
		else
		{
			nextRewardIndex = this._shareNum + 1;
		}
	
		if(nextRewardIndex > this._reward.length)
		{
			nextRewardIndex = this._reward.length;
		} 
		let rewardVo = GameData.formatRewardItem(this._reward[nextRewardIndex]);
		for(let i = 0; i < rewardVo.length;i++)
		{
			this.container.removeChild(this._rewardContainer[i]);
		}
		this._rewardContainer = [];   //清空数据
		for(let i = 0; i < rewardVo.length;i++)
		{
			
			let reward = GameData.getItemIcon(rewardVo[i],true,true);
			reward.anchorOffsetX = reward.width  / 2;
			reward.setScale(0.8);
			reward.setPosition(this._shareTF.x + (i % 3 - 1) * reward.width,this._shareTF.y + this._shareTF.height + (Math.floor(i/3)* (reward.height - 10)) + 12);
			this.addChildToContainer(reward);
			this._rewardContainer.push(reward);
		}
	}


	private fkcwShareCallback():void
	{
		let shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW)
		if(shareView && shareView.isInit())
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
		}
		else{
			NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{});
			
		}
	}


	private showHand()
	{
		if(PlatformManager.checkIsLocal())
		{
			this.requestRewardNewShare();
			return;
		}

		if(this._shareType==2 || this._shareType==3)
		{
			if (this._shareType==3)
			{	
				if(PlatformManager.checkIsWanbaFromWx())
				{
					window["rsdkShareCallback"](0);
				}
				else
				{
					PlatformManager.share(this.fkcwShareCallback,this);
					return;
				}
			}

			if(!this._handContainer){
				this._handContainer = new BaseDisplayObjectContainer();
				this.addChild(this._handContainer)

				let maskBmp = BaseBitmap.create("public_9_viewmask");
				maskBmp.width=GameConfig.stageWidth;
				maskBmp.height=GameConfig.stageHeigth;
				maskBmp.touchEnabled = true;
				this._handContainer.addChild(maskBmp);
				maskBmp.addTouchTap(this.hideMask,this);

				let clickHand = BaseBitmap.create("guide_hand");
				clickHand.skewY = 180;
				clickHand.x = 590;
				clickHand.y = 10;
				this._handContainer.addChild(clickHand);

				egret.Tween.get(clickHand,{loop:true})
					.to({y:60}, 500)
					.to({y:10}, 500)

				let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
				getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
				getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
				getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
				getTxt.lineSpacing = 10;
				this._handContainer.addChild(getTxt);

			}
			else{
				this._handContainer.visible = true;
			}
		}
		else
		{
			this.confirmHandler();
		}
		
	}

	private hideMask()
	{
		if(this._handContainer){
			this._handContainer.visible = false;
		}
	}

	public tick()
	{
		if(this._numTxt != null && this.vo )
		{
			if(this.vo.et > GameData.serverTime)
			{
				let time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime,1);
				this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareTime",[time]);
				this._shareBtn.setVisible(true);
				this._shareBtn.setEnable(false);
				this._receiveBM.setVisible(false);
			}
			else if(this.vo.et <= GameData.serverTime)
			{
				this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareNum",[String(this._allShareNum - this._shareNum)]);
				this._shareBtn.setVisible(true);
				this._shareBtn.setEnable(true);
				this._receiveBM.setVisible(false);
			}
			if(this._shareNum >= this._allShareNum)
			{
				this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareOver");
				this._shareBtn.setVisible(false);
				this._receiveBM.setVisible(true);
			}
			this._numTxt.x = this.viewBg.x + this.viewBg.width / 2- this._numTxt.width / 2;
			
		}
	}
	private confirmHandler():void
	{	
		
		PlatformManager.share(this.requestReward,this);
	}

	private sendShareSuccess():void
	{	
		this.hideMask();
		this.requestRewardNewShare();

	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"sharepopupview_closebtn_down","sharepopupview_closebtn"
					]);
	}

	private requestReward():void
	{
		this.requestRewardNewShare();
	}
	/**
	 * 新的面板请求
	 */
	private requestRewardNewShare()
	{
		this.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{});
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.data.rewards)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
			}

			this._isTask = false;
			this.updateView();

			
		}
	}
	/**
	 * 重写关闭方法
	 * 仅适用于新的分享
	 */
	protected closeHandler():void
	{
		if(this._isTask)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"needCancel":1,
				"callback":this.hide,
				"msg":LanguageManager.getlocal("sharePopupViewTip"),
				"canelTxt":"canelTxt",
				"handler":this
			});
		}
		else
		{
			this.hide();
		}
		
	}

	public dispose():void
	{
		this._handContainer = null;
		this._shareType = 0;

		this._isTask = false;
		this._rewardContainer = [];
		this._numTxt =null;
		this._shareNum = 0;
		this._shareTF = null;
		this._shareBtn = null;

		this._reward = [];
		this._allShareNum = null;
		this._receiveBM = null;

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS,this.sendShareSuccess,this);
		super.dispose();
	}
}
window["rsdkShareCallback"] = function (code)
{
	if(Number(code) == 0){
		let shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW)
		if(shareView && shareView.isInit())
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
		}
		else{
			App.MessageHelper.addNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,this.gameShareRewardCallBack,this);

			NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,null);
		}
		// 发送分享统计
		NetManager.request(NetRequestConst.REQUEST_SHAREADDCOPYSHARENUM, {copytype:App.ShareGuideUtil.sharingId});
	}
	// 不管是分享成功了还是分享失败了，如果是情景分享，就取消掉情景分享
	if (Api.switchVoApi.checkOpenShareGate() && App.ShareGuideUtil.sharingType !== "") {
		RSDKHelper.setShareInfo(GameData.userId.toString());
		NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[App.ShareGuideUtil.sharingType], operate:"success"});
		App.ShareGuideUtil.sharingType = "";
	}	
}
window["gameShareRewardCallBack"] = function(event)
{
		if(event.data.ret)
		{
			if(event.data.data.data.rewards)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
			}
		}
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,this.gameShareRewardCallBack,this);
}
 