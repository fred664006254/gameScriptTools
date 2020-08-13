/**
 * 新七日签到
 * author jiangliuyang
 * date 2018/10/23
 * @class WifeView
 */
class SignUpView extends PopupView
{

	private _curTab: BaseDisplayObjectContainer = null;
	private _detailBg: BaseLoadBitmap = null;
	private _itemList:BaseDisplayObjectContainer[] = [];
	private _itemDataList1:any[] = [];
	private _itemDataList2:any[] = [];

	private _collectBtn: BaseButton = null;
	private _signDay = 0;
	private _curState = 0;
	private _signupData:any = null;
	private _signupRewardData: any = null;
	private _signupRewardSharedData: any = null;

	private _curIndex = 0;

	private _flagList:any[] = [];
	private _tabList:BaseDisplayObjectContainer[] = [];
	private _isOpen: false;
	private _checkBox:CheckBox = null;
	public constructor() 
	{
		super();
	}
	private get vo():any{
		return Api.otherInfoVoApi.getArrivalNewInfo();
	}
	private get cfg():any{
		return Config.SignupCfg;
	}
	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVALNEW),this.collectCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.updateStatus,this); 


        let title = BaseBitmap.create("signupview_title");
        title.x = this.viewBg.width / 2 - title.width/2;
        title.y = this.viewBg.y + 5;
        this.addChild(title);


		this._signDay = this.vo.count;
		this._curState = this.vo.flag;  //1已经签到  0没有签到
		this._signupData = this.cfg.getSignup();
		this._signupRewardData = this.cfg.getSignupReward();
		this._signupRewardSharedData = this.cfg.getSignupRewardShared();
		for(let i = 1;i < 8;i++)
		{
			let tab = new BaseDisplayObjectContainer();

			let	tabBg = BaseBitmap.create("signupview_titlebg");
			tab.width = tabBg.width;
			tab.height = tabBg.height;
			
			tabBg.x = tab.width/2 - tabBg.width/2;
			tabBg.y = 0;
			tab.addChild(tabBg);

			

			let name = BaseBitmap.create("signupview_name"+i);
			name.x = tab.width/2 - name.width/2;
			name.y = 11;
			tab.addChild(name);

			let iconStr = this._signupData[i];
			let rewardItem:RewardItemVo = GameData.formatRewardItem(iconStr)[0];
			if(rewardItem){
				let icon = BaseLoadBitmap.create(rewardItem.icon);
				icon.width = 100;
				icon.height = 100;

				icon.setScale(0.7);
				
				icon.x = tab.width/2 - icon.scaleX * icon.width / 2;
				icon.y = tab.height/2 - icon.scaleY * icon.height/2 + 4;
				tab.addChild(icon);

			}
			// let icon = BaseLoadBitmap.create();

			let flag = BaseBitmap.create("signupview_flag");
			flag.name = "flag";
			flag.visible = false;
			flag.x = tab.width/2 - flag.width/2;
			flag.y = tab.height/2 - flag.height/2;
			
			this._flagList.push(flag);
			tab.addChild(flag);

			let desc = ComponentManager.getTextField(LanguageManager.getlocal("signUpViewTabName"+i),20,TextFieldConst.COLOR_LIGHT_YELLOW);
			desc.x = tab.width/2 - desc.width/2;
			desc.y = tab.height - desc.height-9;
			tab.addChild(desc);

			tab.addTouchTap(this.tabHandler,this,[i]);
			
			tab.anchorOffsetX = tab.width/2;

			tab.x = this.viewBg.x + this.viewBg.width / 2 - 480 / 2 + (i-1) * (480 / 6);
			tab.y = this.viewBg.y + 105;
			if(this._curState == 0){//没有签到
				//不是当前天
				if(i != this._signDay + 1){
					tab.setScale(0.9);
				} else {
					this._curTab = tab;
				}
			} else {			//签到
				//不是当前天
				if(i != this._signDay){
					tab.setScale(0.9);
				} else {
					this._curTab = tab;
				}
			}

			this._tabList.push(tab);
			this.addChild(tab);
			
			if(this._curState == 0){
				this.initDetail(this._signDay + 1);
			} else {
				this.initDetail(this._signDay);
			}
		}

		this.refreshFlag();
				
		// TickManager.removeTick(this.tick,this);
		// //启动定时器
		// TickManager.addTick(this.tick,this);
	}
	// private tick():void
	// {
		// console.log("tick-----",GameData.serverTime,Api.otherInfoVoApi.getLastday() + 24 * 3600);
		// if(GameData.serverTime > Api.otherInfoVoApi.getLastday() + 24 * 3600)
		// {
		// 	TickManager.removeTick(this.tick,this);
		// 	Api.otherInfoVoApi.setLastday(Api.otherInfoVoApi.getLastday() + 24 * 3600);
			
		// 	Api.otherInfoVoApi.refreshArrivalNewInfoFlag();
		// 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_OTHERINFO_REFRESHVO);
		// } else {

		// 	return
		// }
		

	// }


	private refreshFlag():void
	{
		if(this._flagList.length != 7){
			return;
		}
		for(let i = 1; i < 8; i++){

			if(i <= this._signDay){
				//之前天 已经领取
				this._flagList[i-1].visible = true;
			
			} else {
				this._flagList[i-1].visible = false;
			}

		}

	}
	//1,2,3,4,5,6,7
	private initDetail(index:number,isDouble?:number):void  //1 2
	{
		if(index > 7){
			return;
		}
		if(index != null){
			this._curIndex = index;
		}
		

		for(let i = 0;i < this._itemList.length;i ++){
			if(this._itemList[i].parent){
				this.removeChild(this._itemList[i]);
			}
			
		}
		this._itemList = [];
		this._itemDataList1 = [];
		this._itemDataList2 = [];
		let itemData = null;
		if(isDouble == 1){
			itemData = this._signupRewardData[this._curIndex];
		} else if(isDouble==2) {
			itemData = this._signupRewardSharedData[this._curIndex];
		} else {
			itemData = this._signupRewardData[this._curIndex];
		}

		let rewardItemVos = GameData.formatRewardItem(itemData);


		let iconScale = 0.8;
		let spaceX = 16;
		let spaceY = 10;
		let iconWidth = 106;
		let iconHeight = 106;
		let startX = this.viewBg.width/2 - (iconWidth * iconScale * 5 + spaceX * 4) / 2;
		let startY = this.viewBg.y + 580;



		
		for(let i = 0; i< rewardItemVos.length; i ++){
			let itemIcon = GameData.getItemIcon(rewardItemVos[i],true,false);
			itemIcon.setScale(iconScale);
			itemIcon.x = startX + (i % 5) * (spaceX + iconWidth * itemIcon.scaleX);
			itemIcon.y = startY + Math.floor(i / 5) * (spaceY + iconHeight * itemIcon.scaleX);
			this._itemList.push(itemIcon);
			this._itemDataList1.push(rewardItemVos[i]);
			this.addChild(itemIcon);


		}

		if(!this._detailBg){
			this._detailBg = BaseLoadBitmap.create("signupview_daybg"+this._curIndex);
			this._detailBg.width = 527;
			this._detailBg.height = 272;
			this._detailBg.x = this.viewBg.width / 2 - this._detailBg.width/2;
			this._detailBg.y = this.viewBg.y + 277;
			this.addChild(this._detailBg);
		} else {
			// this._detailBg.texture = ResourceManager.getRes("signupview_daybg"+index);
			this._detailBg.setload("signupview_daybg"+this._curIndex);
		}

		if(!this._collectBtn){
			this._collectBtn = ComponentManager.getButton("firstchargebutton01","signUpViewCollect",this.collectHandler,this);
			this._collectBtn.x = this.viewBg.width / 2 - this._collectBtn.width / 2;
			this._collectBtn.y = this.viewBg.y + this.viewBg.height - this._collectBtn.height - 23;
			this._collectBtn.setColor(TextFieldConst.COLOR_BROWN);
			this.addChild(this._collectBtn);
		}

		this._collectBtn.visible = true;

		if(this._curIndex <= this._signDay){
			//之前天 已经领取
			this._collectBtn.setText("signUpViewCollected");
		
			this._collectBtn.setEnable(false);
		} else if(this._curIndex == this._signDay +1 && this._curState == 1){
			//当前天 已经领取
		
			this._collectBtn.visible = false;

		} else if(this._curIndex == this._signDay+1  && this._curState == 0){
			//当前天 可以领取
			this._collectBtn.setText("signUpViewCollect");
			this._collectBtn.setEnable(true);
			
		} else {
			this._collectBtn.visible = false;
		}
		// if(this._collectBtn.visible){
			
		// }
		if(isDouble==null){
			this.checkShowGetBtn();
		}
		
		
	}
	private checkShowGetBtn():void
	{

		
		if(PlatformManager.checkGetShare()){
		
			// 显示勾选分享
			if(!this._checkBox){
				this._checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("shareFriendDoubleText"),false,18,0xc2aca0,"public_select_down3","public_select3");
				this._checkBox.x = this._collectBtn.x + this._collectBtn.width + 20;
				this._checkBox.y = this._collectBtn.y + this._checkBox.height/2 - 5 ;
				this._checkBox.setSelected(true);
				this.addChild(this._checkBox);
			}
			this._checkBox.setCallback(this.checkBoxCallback,this);
			this._checkBox.visible = this._collectBtn.visible;
			if(this._checkBox.visible){
				this._checkBox.visible = this._collectBtn.isEnable();
			}
			if(this._checkBox.visible){
				// this.setShareGiftNum(true);
				if(this._checkBox.checkSelected()){
					this.initDetail(null,2);
				} else {
					this.initDetail(null,1);
				}
				
			}
		}
	}
	private checkBoxCallback(isSelect):void{
		if(isSelect){
			// this.setShareGiftNum(true);
			this.initDetail(null,2);
		} else {
			// this.setShareGiftNum(false);
			this.initDetail(null,1);
		}
	}
	// private setShareGiftNum(isDouble:boolean):void{
	// 	// this._itemList.push(itemIcon);
	// 	for(let i = 0;i < this._itemList.length; i ++){
	// 		let itemIcon:BaseDisplayObjectContainer = this._itemList[i];
	// 		let itemData:RewardItemVo = this._itemDataList1[i];
	// 		let showNum:number = itemData.num;
	// 		let numLb:BaseTextField = <BaseTextField>itemIcon.getChildByName("numLb");
	// 		numLb.text = String(showNum);
			
	// 		let iconBg:BaseBitmap = <BaseBitmap>itemIcon.getChildByName("iconBg");
	// 		numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
	// 	}
	// }

    private updateStatus(): void{
		this._signDay = this.vo.count;
		this._curState = this.vo.flag; 
		
		let event = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);


		let clickTabNum = 0;
		if(this._curState == 0){
			// this.initDetail(this._signDay + 1);
			clickTabNum = this._signDay + 1;
		} else {
			// this.initDetail(this._signDay);
			clickTabNum = this._signDay
		}
		if(clickTabNum >7){
			clickTabNum = 7;
		}
		if(this._tabList.length >0){
			this._tabList[clickTabNum - 1].dispatchEvent(event);
		}
		
		

		this.refreshFlag();
    }	
	private tabHandler(event: egret.TouchEvent ,p):void
	{
		if(this._curTab){
			this._curTab.setScale(0.9);
		}
		this._curTab = event.target;
		this._curTab.setScale(1);
		this.initDetail(p);

	}
	public hide():void
	{

		if(this.param){
			this._isOpen = this.param.data;
		}
	
		
		if(this._isOpen){
			super.hide();
			//限时红颜 和 首充的强弹
			if(Api.switchVoApi.checkOpenShowPopupWin())
			{
				if(Api.switchVoApi.checkClosePay())
				{
					return;
				}
				if(GameData.checkTimeLimitWife())
				{
					ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEVIEW);
				}
				else
				{
					if(Api.shopVoApi.getPayFlag()!=2 && Api.servantVoApi.getServantObj("1033") == null)
					{
						ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
					}
				}
			}
		} else {
			super.hide();
		}

	}

	protected collectCallback(event:egret.Event)
	{
		let data = event.data.data.data;
		let rewards = data.rewards;
		let rList = GameData.formatRewardItem(rewards);
		let pos = this._collectBtn.localToGlobal(this._collectBtn.width/2,50);
		App.CommonUtil.playRewardFlyAction(rList,pos);
	}
	private collectHandler(event: egret.TouchEvent):void
	{

		if(PlatformManager.checkGetShare()){
			if(this._checkBox && this._checkBox.checkSelected()){
				this.shareCollect();

			} else {
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					"needCancel":1,
					// "callback":this.,
					"clickNotAutoHide":false,
					"cancelcallback":this.commonCollect,
					"title":"confirmShareCollectTitle",
					"msg":LanguageManager.getlocal("confirmShareCollectSignTip"),
					"canelTxt":"canelTxt",
					"handler":this
				});
			}
		} else {
			NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW,{});
		}




		// if(this._checkBox && this._checkBox.checkSelected()){
		// 	// console.log("分享");
		// 	PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_SEVENDAYAUTO,()=>{},this);
		// }

		// // console.log("领取");
		// NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW,{});


	}
	private shareCollect():void
	{
		if(PlatformManager.checkIsLocal()){
			NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW,{shareFlag:1});
		} else {
			PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_SEVENDAYAUTO,()=>{
				NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW,{shareFlag:1});
			},this);
		}

		
	}
	private commonCollect():void
	{
		NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW,{});
	}
    /**
	 * 重写 初始化viewbg
	 * 
	 */
    protected initBg():void
    {
        this.viewBg = BaseLoadBitmap.create("signupview_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 861;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
    }
    /**
	 * 重新一下关闭按钮 
	 * 
	 */
	protected getCloseBtnName():string
	{
		return "load_closebtn";
	}
    protected resetBgSize():void
    {
		this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10,this.viewBg.y + 50);



    }

	protected getTitleStr():string
	{
		return null;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"firstchargebutton01"
		]);
	}
	public dispose():void
	{
		// TickManager.removeTick(this.tick,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVALNEW),this.collectCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO,this.updateStatus,this); 
		this._curTab = null;
		this._detailBg = null;
		this._itemList = [];
		this._itemDataList1 = [];
		this._itemDataList2 = [];
		this._collectBtn = null;
		this._signDay = 0;
		this._curState = 0;
		this._signupData = null;
		this._signupRewardData = null;
		this._signupRewardSharedData = null;
		this._curIndex = 0;
		this._flagList = [];
		this._tabList = [];
		this._isOpen = false;
		this._checkBox = null;
		
		super.dispose();
	}
}