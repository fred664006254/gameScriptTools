/**
 * 好友 屏蔽列表部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem4
 */
class FriendItem4 extends BaseDisplayObjectContainer
{
	private _scrollView:ScrollList = null;
	private _friendsTxt:BaseTextField;
    public constructor(bottomH:number)
	{
		super();
		this.init(bottomH);
	}
	
	public init(bottomH:number):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_LIST),this.receiveData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK),this.receiveData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK),this.receiveData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_BLOCK),this.receiveData,this);
		NetManager.request(NetRequestConst.REQUEST_CHAT_LIST,{});

		this.width = GameConfig.stageWidth;

		// let buttombg = BaseBitmap.create("adult_lowbg");
		// buttombg.y = bottomH - buttombg.height;
		// buttombg.x = this.width/2 - buttombg.width/2;
		// this.addChild(buttombg);

		this._friendsTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._friendsTxt.x = GameConfig.stageWidth/2; 
		this._friendsTxt.y = bottomH - 30;
		this.addChild(this._friendsTxt);

		let rect = new egret.Rectangle(0,0,622,bottomH-40);
		this._scrollView = ComponentManager.getScrollList(FriendScrollItem,[],rect);
		this._scrollView.x = GameConfig.stageWidth/2 - this._scrollView.width/2;
		this.addChild(this._scrollView);
		// this.doRefreshList();

	}

	protected doRefreshList()
	{
		let dataList = Api.friendVoApi.shieldList;
		for (var index = 0; index < dataList.length; index++) {
			dataList[index]["uiType"] = FriendScrollItem.UITYPE4;
		}
		if(this._scrollView)
		{
			this._scrollView.refreshData(dataList);
		}

		let tipTxt = this.getChildByName("tipTxt");
		if(!dataList.length || dataList.length == 0){
			if(!tipTxt){
				tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip6"),20,TextFieldConst.COLOR_WHITE);
				tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2 ;
				tipTxt.y = GameConfig.stageHeigth/2  - tipTxt.height/2  - 90 ;
				tipTxt.name = "tipTxt";
				this.addChild( tipTxt );
			}
			tipTxt.visible = true;
		}else{
			if(tipTxt){
				tipTxt.visible = false
			}
		}

		let num = 0;
		if(Api.chatVoApi.getChatBlockVo().info && Api.chatVoApi.getChatBlockVo().info.length)
		{
			num = Api.chatVoApi.getChatBlockVo().info.length;
		}
		let maxShieldPlayer = GameConfig.config.friendCfg.maxShieldPlayer;
		let str = LanguageManager.getlocal("chatblockCount",[num + "/"+ maxShieldPlayer])
		this._friendsTxt.text = str;
		this._friendsTxt.anchorOffsetX = this._friendsTxt.width/2;
	}

	protected receiveData(data: egret.Event): void
    {
        let rData = data.data.data;
       	if( rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_CHAT_LIST){
				Api.friendVoApi.shieldList = rData.data.list;
			}else if(cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK){
				Api.friendVoApi.shieldList = rData.data.list;
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
			}else if(cmd == NetRequestConst.REQUEST_CHAT_BLOCK){
				NetManager.request(NetRequestConst.REQUEST_CHAT_LIST,{});
			}
			this.doRefreshList();
        }
    }

    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_LIST),this.receiveData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK),this.receiveData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK),this.receiveData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_BLOCK),this.receiveData,this);

		this._scrollView = null;
		this._friendsTxt = null;

		super.dispose();
	}

}