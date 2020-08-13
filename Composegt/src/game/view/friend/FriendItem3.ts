/**
 * 好友 申请列表部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem3
 */
class FriendItem3 extends BaseDisplayObjectContainer
{
	private _scrollView:ScrollList = null;
	private _friendsTxt:BaseTextField;
	private _isBatchEnable:boolean = false;
    public constructor(bottomH:number)
	{
		super();
		this.init(bottomH);
	}
	
	public init(bottomH:number):void
	{
		
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_REFUSEALL),this.denyBtnCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVELIST),this.receiveData,this);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3,this.doRefreshList,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE,this.doRequestRecvList,this); //有新的申请时刷新UI
		this.doRequestRecvList();

		this.width = GameConfig.stageWidth;
		let buttombg = BaseBitmap.create("adult_lowbg");
		buttombg.y = bottomH - buttombg.height;
		buttombg.x = this.width/2 - buttombg.width/2;
		this.addChild(buttombg);

		this._friendsTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._friendsTxt.x = buttombg.x + 20;
		this._friendsTxt.y = buttombg.y + buttombg.height/2 - this._friendsTxt.height/2-10;
		this.addChild(this._friendsTxt);

		let denyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"friendsBtnTxt6",this.denyBtnHandler,this);
		denyBtn.x = buttombg.x + buttombg.width - denyBtn.width*2 - 20;
		denyBtn.y = buttombg.y + buttombg.height/2 - denyBtn.height/2 + 3;
		denyBtn.name = "denyBtn";
		this.addChild(denyBtn);

		let  batchBtn= ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"friendsBtnTxt21",this.batchBtnHandler ,this);
		batchBtn.x =  denyBtn.x  + denyBtn.width + 8; //buttombg.x + buttombg.width - batchBtn.width - 30;
		batchBtn.y =  denyBtn.y ; //buttombg.y + buttombg.height/2 - batchBtn.height/2;
		batchBtn.name = "batchBtn";
		this.addChild(batchBtn);

		let rect = new egret.Rectangle(0,0,622,bottomH-buttombg.height - 10);
		this._scrollView = ComponentManager.getScrollList(FriendScrollItem,[],rect);
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		// this._scrollView.y = 5;
		this.addChild(this._scrollView);
	}

	protected batchCallBack(data: egret.Event): void
    {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FRIEND_ACCEPTALL,this.batchCallBack,this);
		let rData = data.data.data;

		let friendFlag = rData.data.friendFlag;
		if(friendFlag){
			Api.friendVoApi.showFriendsNetFlags(friendFlag);
		}else{
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_accept_all_tip"));
		}
	}

	protected batchBtnHandler()
	{
		if(!this._isBatchEnable){
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_emptyTip5"));
			return;
		}
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FRIEND_ACCEPTALL,this.batchCallBack,this);
		NetManager.request(NetRequestConst.REQUEST_FRIEND_ACCEPTALL,{});
	}
	protected doRequestRecvList()
	{
		NetManager.request(NetRequestConst.REQUEST_FRIEND_RECEIVELIST,{});
	}
	protected doRefreshList()
	{
		let maxF = GameConfig.config.friendCfg.maxFriend;
		this._friendsTxt.text = LanguageManager.getlocal("friendsNumTxt",[ Api.friendVoApi.getFriendsCount() +"/"+maxF]);
		let dataList = [];
		let receiveList = Api.friendVoApi.receiveList;
		for (var index = 0; index < receiveList.length; index++) {
			let tmpData = receiveList[index];
			if(Api.friendVoApi.isInvalidInList3(tmpData.uid))
			{
				tmpData["uiType"] = FriendScrollItem.UITYPE3;
				dataList.push(tmpData);
			}
		} 
		if(this._scrollView)
		{
			this._scrollView.refreshData(dataList);
		}

		let tipTxt = this.getChildByName("tipTxt");
		if(dataList.length == 0){
			this._isBatchEnable = false;
			if(!tipTxt){
				tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip5"),20,TextFieldConst.COLOR_WHITE);
				tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2;
				tipTxt.y = GameConfig.stageHeigth/2  - tipTxt.height/2 - 90;
				tipTxt.name = "tipTxt";
				this.addChild( tipTxt );
			}
			tipTxt.visible = true;
		}else{
			this._isBatchEnable = true;
			if(tipTxt)
			{
				tipTxt.visible = false
			}
		}
	}
	protected denyBtnCallback(data: egret.Event): void
    {
		let rData = data.data.data;
       	if(rData.ret == 0 )
        {
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3);
		}
	}

	protected denyBtnHandler()
	{
		if(!this._isBatchEnable){
			App.CommonUtil.showTip(LanguageManager.getlocal("friends_emptyTip5"));
			return;
		}
		App.CommonUtil.showTip(LanguageManager.getlocal("friends_rrefuseAllTip"));
		NetManager.request(NetRequestConst.REQUEST_FRIEND_REFUSEALL,{});
	}

	protected receiveData(data: egret.Event): void
    {
		let rData = data.data.data;
       	if(rData.ret == 0 ){
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_FRIEND_RECEIVELIST){
				Api.friendVoApi.receiveList = rData.data.receiveList;
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3);
			this.doRefreshList();
        }
    }

    public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE,this.doRequestRecvList,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_REFUSEALL),this.denyBtnCallback,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3,this.doRefreshList,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVELIST),this.receiveData,this);
		this._scrollView = null;
		this._friendsTxt = null;
		super.dispose();
	}

}