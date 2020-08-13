/**
 * 好友 我的好友部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem1
 */
class FriendItem1 extends BaseDisplayObjectContainer
{
	private _scrollView:ScrollList = null;
	private _friendsTxt:BaseTextField;
	private _emptyTipNode:BaseDisplayObjectContainer;

    public constructor(bottomH:number)
	{
		super();
		this.init(bottomH);
	}

	public init(bottomH:number):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_SENDALL),this.sendBtnCAllBack,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED,this.doRefreshList,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETINFO),this.receiveData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE,this.doRequestFriendList,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEALL),this.doRefreshList,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN,this.doRefreshList,this);
		
		this.doRequestFriendList();
		this.width = GameConfig.stageWidth;
		let buttombg = BaseBitmap.create("adult_lowbg");
		buttombg.y = bottomH - buttombg.height;
		buttombg.x = this.width/2 - buttombg.width/2;
		this.addChild(buttombg);

		this._friendsTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._friendsTxt.x = buttombg.x + 20;
		this._friendsTxt.y = buttombg.y + buttombg.height/2 - this._friendsTxt.height/2-10;
		this.addChild(this._friendsTxt);
		
		// if(! PlatformManager.checkIsKRSp()){
			let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"friendsBtnTxt1",this.collectBtnHandler,this);
			collectBtn.x = buttombg.x + buttombg.width - collectBtn.width*2 - 20;
			collectBtn.y = buttombg.y + buttombg.height/2 - collectBtn.height/2 + 3;
			collectBtn.name = "collectBtn";
			this.addChild(collectBtn);

			let sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"friendsBtnTxt2",this.sendBtnHandler,this);
			sendBtn.x = collectBtn.x  + collectBtn.width + 8;
			sendBtn.y = collectBtn.y ;
			sendBtn.name = "sendBtn";
			this.addChild(sendBtn);
		// }
 
		let rect = new egret.Rectangle(0,0,622,bottomH-buttombg.height - 10);
		this._scrollView = ComponentManager.getScrollList(FriendScrollItem,[],rect);
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		this.addChild(this._scrollView);
	}

	protected doRequestFriendList()
	{
		NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO,{});
	}
	protected refreshCollectRedPoints()
	{
		// if(PlatformManager.checkIsKRSp()){
		// 	return;
		// }
		let collectBtn = <BaseButton>this.getChildByName("collectBtn");
		if(Api.friendVoApi.isGiftCollectEnable()){
			App.CommonUtil.addIconToBDOC(collectBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(collectBtn);
		}
	}

	protected doRefreshList()
	{
		this.refreshCollectRedPoints();
		let dataList = [];
		let friendDataList = [];
		let sadunList = [];
		// Api.friendVoApi.sadunList
		let maxF = GameConfig.config.friendCfg.maxFriend;
		this._friendsTxt.text = LanguageManager.getlocal("friendsNumTxt",[ Api.friendVoApi.getFriendsCount() +"/"+maxF]);
		if(Api.friendVoApi.isHideFriendsList() == false){
			for (var index = 0; index < Api.friendVoApi.friendList.length; index++) {
				let tmpData = Api.friendVoApi.friendList[index];
				if(Api.friendVoApi.isFriendByUid(tmpData.uid)){
					tmpData["uiType"] = FriendScrollItem.UITYPE1;
					friendDataList.push(tmpData);
				}
			}
			friendDataList.sort((dataA:any,dataB:any)=>{
				return dataB["power"] -  dataA["power"];
			});
		}

		let isEmpty = true;
		if(  Api.friendVoApi.friendList.length > 0){
			isEmpty = false;
		}

		if(Api.switchVoApi.checkopenSadun()){
			if(Api.friendVoApi.isHideSaduList() == false){
				// sadunList = Api.friendVoApi.sadunList;
				for (var index = 0; index < Api.friendVoApi.sadunList.length; index++) {
					let tmpData = Api.friendVoApi.sadunList[index];
					tmpData["uiType"] = FriendScrollItem.UITYPE7;
					sadunList.push(tmpData);
				}
				if(sadunList.length > 0){
					isEmpty = false;
				}
			}
			dataList.push({sadTitle:true});//亲家标题
			dataList = dataList.concat(sadunList);
			dataList.push({friendsTitle:true});//亲家标题
		}
		
		dataList = dataList.concat(friendDataList);
		if(this._scrollView)
		{
			this._scrollView.refreshData(dataList);
		}
		
		if( (Api.switchVoApi.checkopenSadun() && dataList.length == 2))
		{
			if(!this._emptyTipNode){
				this._emptyTipNode = new BaseDisplayObjectContainer();
				this.addChild(this._emptyTipNode);

				let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip1"),20,TextFieldConst.COLOR_WHITE);
				tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2;
				tipTxt.y = GameConfig.stageHeigth/2  - tipTxt.height/2 - 90;
				this._emptyTipNode.addChild(tipTxt);

				let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt19",this.goBtnHandler,this);
				goBtn.x = tipTxt.x + tipTxt.width/2 - goBtn.width/2;
				goBtn.y = tipTxt.y + 30;
				goBtn.name = "collectBtn";
				this._emptyTipNode.addChild(goBtn);
			}
		}
		
		if(this._emptyTipNode)
		{
			this._emptyTipNode.visible =  isEmpty;
		}
		
	}

	protected collectBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.FRIENDSGIFTPOPUPVIEW);
	}

	protected sendBtnCAllBack(data: egret.Event): void
    {
        let rData = data.data.data;
       	if(rData.ret == 0)
        {
			this.doRefreshList();
		}
	}
	protected sendBtnHandler()
	{
		if(!Api.friendVoApi.isBatchSendGiftEnable()){
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_batchSendTip"));
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_FRIEND_SENDALL,{});
	}
	
	protected goBtnHandler()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_SWITCH_TAB,{index:1});
	}

	protected receiveData(data: egret.Event): void
    {
        let rData = data.data.data;
       if(rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_FRIEND_GETINFO){
				Api.friendVoApi.friendList = rData.data.friendList;
			}else if(cmd == NetRequestConst.REQUEST_FRIEND_SENDALL){
			}
			this.doRefreshList();
        }
    }

    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETINFO),this.receiveData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED,this.doRefreshList,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_SENDALL),this.sendBtnCAllBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEALL),this.doRefreshList,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE,this.doRequestFriendList,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN,this.doRefreshList,this);

		this._scrollView = null;
		this._friendsTxt = null;
		this._emptyTipNode = null;

		super.dispose();
	}

}