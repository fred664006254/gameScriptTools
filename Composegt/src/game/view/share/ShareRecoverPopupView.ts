/**
 * 分享窗口
 * 在很多地方分享
 * jiangliuyang
 * 
 */
class ShareRecoverPopupView extends PopupView
{


    //使用按钮
    private _useBtn:BaseButton = null;
    //分享按钮
	private _shareBtn:BaseButton = null;

	private _shareTF1:BaseTextField = null;

	private _shareTF2:BaseTextField = null;

    private _shareTitle:BaseTextField = null;


	private _needItem:string = null;
	private _info:any = null;


	private _curShareId:string = "000";


	
	private _numLb:BaseTextField = null;
	////////////////
	private _type: string = null;
	private _itemId:string = null;
	private _hasNum:number = 0;
	private _maxNum:number = 0;
	private _index:number = 0;

	private _wxshare:[string,string,string,string,string,string] = null;
	private _callback: Function = null;
	private _target: any = null;

	private _isShared:boolean = false;
	public constructor() 
	{
		super();
	}
	// private get vo():any{
	// 	return Api.otherInfoVoApi.getGeneralShareInfo();
	// }
	protected initView():void
	{
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refresh,this);
		
		//创建分享界面
		this.createShareView();
	}

	/**
	 * 创建分享界面
	 */
	private createShareView()
	{
		

		//从配置中取得奖励数据
		this._needItem = null;


		let titleStr = null;
		let tipStr = null;
		let tipStr1 = null;
		let tipStr2 = null;

		switch(this._type){
			case "a":
				//征收
				this._needItem = "6_1101_"+this._hasNum;   // 征收令 Config.GameprojectCfg.rewardALL2;
				titleStr = LanguageManager.getlocal("shareManageRecoverTitle");
				tipStr = "";
				tipStr1 = LanguageManager.getlocal("shareRecoverManagerTip1");
				tipStr2 = LanguageManager.getlocal("shareRecoverManagerTip2");
				break;
			case "b":
				//出战令
				let hasNum = Api.itemVoApi.getItemNumInfoVoById("1090");
				this._needItem = "6_1090_"+hasNum; 
				titleStr = LanguageManager.getlocal("shareChallengeRecoverTitle");
				tipStr = LanguageManager.getlocal("shareChallengeManagerTip");
				tipStr1 = LanguageManager.getlocal("shareChallengeManagerTip1");
				tipStr2 = LanguageManager.getlocal("shareChallengeManagerTip2");
				break;
		}
		
		
		let title = ComponentManager.getTextField(titleStr,22,TextFieldConst.COLOR_LIGHT_YELLOW);
		title.x = this.width/2 - title.width/2;
		title.y = this.viewBg.y + 66;
		this.addChild(title);

		let userBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"useBtn",this.useBtnClick,this,null,3);
		// userBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		userBtn.x = 200 - userBtn.width/2;
		userBtn.y = this.viewBg.y + 480;
		this.addChild(userBtn);

		let shareBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"shareRecoverShareBtn",this.shareBtnClick,this,null,3);
		// userBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		shareBtn.x = 640 - 200 - shareBtn.width/2;
		shareBtn.y = this.viewBg.y + 480;
		this._shareBtn = shareBtn;
		this.addChild(shareBtn);

		let rewardVo = GameData.formatRewardItem(this._needItem);
		// let needIcon = GameData.getItemIcon(rewardVo[0],true,false);
		let needIcon = BaseLoadBitmap.create("itemicon"+rewardVo[0].id);
		needIcon.width = 100;
		needIcon.height = 100;
		needIcon.setScale(0.8);
		needIcon.x = this.viewBg.x +200 - needIcon.width*0.8/2 - 12;
		needIcon.y = this.viewBg.y +240 - needIcon.height*0.8/2 + 20-13;
		this.addChild(needIcon);


		let numLb = ComponentManager.getTextField(String(rewardVo[0].num),18,TextFieldConst.COLOR_BROWN);
		
		numLb.x = this.viewBg.x + 230;
		numLb.y = this.viewBg.y + 270;
		this.addChild(numLb);
		this._numLb = numLb;

		if(rewardVo[0].num == 0){
			numLb.setColor(TextFieldConst.COLOR_WARN_RED);
		}

		let shareIcon = BaseBitmap.create("shareRecoverIcon");
		shareIcon.x = this.viewBg.x + 380;
		shareIcon.y = this.viewBg.y + 200;
		this.addChild(shareIcon);

		let tip = ComponentManager.getTextField(tipStr,20,TextFieldConst.COLOR_BROWN);
		tip.width = 400;
		tip.x = 320 - tip.width/2;
		tip.y = this.viewBg.y + 140 - tip.height/2;
		this.addChild(tip);



		let tip1 = ComponentManager.getTextField(tipStr1,20,TextFieldConst.COLOR_BROWN);
		tip1.width = 150 ;
		tip1.x = 200 - tip1.width/2;
		tip1.y = this.viewBg.y + 370- tip1.height/2;
		this.addChild(tip1);

		let tip2 = ComponentManager.getTextField(tipStr2,20,TextFieldConst.COLOR_BROWN);
		tip2.width = 150;
		tip2.x = 640-200 - tip2.width/2;
		tip2.y = this.viewBg.y + 370 - tip2.height/2;
		this.addChild(tip2);

		
	}
	protected getTitleStr():string
	{
		return null;
	}
	private useBtnClick(){
		if(this._type=="a"){
			if(this._hasNum > 0)
			{
				if(this._hasNum < 5)
				{
					NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:1});
					
				} else {
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._itemId,hasNum:this._hasNum,callback:this._callback,handler:this._target});
				}
			} else {
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW,{itemId:this._itemId,callback:null,handler:this});
			}
		} else {
			////b
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_BATTLE,"info":this._info,callback:this._callback,handler:this._target});
		}

		this.hide();
	}
	private manageItemCallbask(){
		if (this._callback != null && this._target != null){
			egret.callLater(this._callback,this._target)
		}
		this.hide();
	}
	//点击分享按钮
	private shareBtnClick()
	{
	
		/**判断是否为本地地址 */
		//test
		if(PlatformManager.checkIsLocal())
		{
						//按钮重灰
			this.refreshShareSuccessView()
			this.shareSuccessCallback("0",{});
			// this.shareSuccessCallback("0",{groupId:"1234567890"});
			return;
		}
		this.confirmHandler();
		
	}
	protected isShowOpenAni():boolean
	{
		return false;
	}
	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{

		return "btn_closebtn4";
	}
	//分享
	private confirmHandler():void
	{	
		


		//是微信平台
		//test
		if(PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp()){
			
			//微信平台分享次数统计
			// NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETSHARENUM,{type:this._type});

			let shareType = "";
			switch(this._type){
				case "a":
					// bgName = "shareBgWife";	
					shareType = App.ShareGuideUtil.SHARETYPE_SHARE_JINGYING;

					break;
				case "b":
					// bgName = "shareBgChild";
					shareType = App.ShareGuideUtil.SHARETYPE_SHARE_GUANKA;

					break;
			}

			PlatformManager.share(shareType,this.shareSuccessCallback,this);
		} else{
			//分享失败
			App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
		}
	
	}

	//分享成功回调
	private shareSuccessCallback(code:string,data?:any):void
	{
			this._isShared = true;
	
			//查看是否有分享界面
			//按钮重灰
			this.refreshShareSuccessView()

			if(this._type=="a"){
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE,this.showReward,this);
				NetManager.request(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE,{shareFlag:1});
			} else if(this._type=="b"){
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER,this.showReward,this);
				NetManager.request(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER,{shareFlag:1});
			}
			
			

	}

	//分享成功处理
	private showReward(event):void
	{	
		
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER,this.showReward,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE,this.showReward,this);
	
	
		let r = event.data.data.ret;
		if(r == 0){

			// if(event.data.data.data.groupexist){
			
			// 	console.log("分享到相同群了，不能获得奖励",event);
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("wxshareTip"));
			// 	this.refreshShareFailureView()
			// 	return;
			// }
			App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverSuccess"));
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_COUNT);	
			// if(event.data.data.data.rewards)
			// {	
			// 	//分享成功后刷新界面
			// 	// this.refreshShareSuccessView()
			// 	//调用奖励界面
			// 	// ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverSuccess"));
			// } else {
			// 	//领取失败
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverFailed"));
			// }

		} else if (r == -3){
			//已经领取过了
			App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverFailed"));
		} else {
			//领取失败
			App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverFailed"));
		}

		this.hide();

	}
	// public refresh(event?:egret.Event):void
	// {
		
		

	// }
	//分享成功后刷新界面
	private refreshShareSuccessView():void
	{
		//分享按钮禁用 并致灰色
		// this._shareBtn.setGray(true);
		this._shareBtn.setEnable(false);


	}
	//分享失败后按钮还原
	private refreshShareFailureView():void
	{
		//分享按钮禁用 并致灰色
		// this._shareBtn.setGray(false);
		this._shareBtn.setEnable(true);
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
			this._itemId = this.param.data.itemId;
			this._hasNum = this.param.data.hasNum;
			this._maxNum = this.param.data.maxNum;
			this._index = this.param.data.index;
			this._wxshare = this.param.data.wxshare;
			this._callback = this.param.data.callback;
			this._target = this.param.data.target;
			this._info = this.param.data.info;
		}
		let bgName = null;
		let bgWidth = 0;
		let bgHeight = 0;
        bgName = "shareRecoverBg";
        bgWidth = 615;
        bgHeight = 594;

		this.viewBg = BaseLoadBitmap.create(bgName);
		this.viewBg.width = bgWidth;
		this.viewBg.height = bgHeight;
		
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		this.closeBtn.x = this.viewBg.x + 570-7;
		this.closeBtn.y = this.viewBg.y + 40-5;

	}

	/**
	 * 重写关闭方法
	 * 仅适用于新的分享
	 */
	protected closeHandler():void
	{
		this.shareClose();

	}
	private shareClose():void
	{
		// if (this._callback != null && this._target != null){
		// 	// this._callback.call(this._target);
		// 	egret.callLater(this._callback,this._target)
		// }
		this.hide();
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([

			"shareRecoverIcon"
		]);
	}
	public dispose():void
	{
// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refresh,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER,this.showReward,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE,this.showReward,this);
		this._shareTF1 = null;
		this._shareTF2 = null;
		this._shareBtn = null;
		this._needItem = null;
		this._type = null;
		this._itemId = null;
		this._hasNum = 0;
		this._maxNum = 0;
		this._index = 0;
		this._numLb = null;
		// this._lv = null;
		this._wxshare = null;
		this._callback = null;
		this._target = null;
		this._curShareId = "000";
		this._isShared = false;
		this._info = null;

		super.dispose();
	}
}

 