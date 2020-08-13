
class ChatViewTab5 extends CommonViewTab
{
    private _inputTextField:BaseTextField;
    // 滑动列表
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
        this.initView();
	}

	protected initView():void
	{
		let view = this;
		//view.height = ;
		// let chatview : any = ViewController.getInstance().getView('ChatView');
		// view.height = chatview.tabHeight;
		// view.width = boatview.tabWidth;
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG), view.refreshChat, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.refreshChat,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS,this.refreshTrans,this);

		let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
		listBg.width = GameConfig.stageWidth - 30;
		listBg.height = GameConfig.stageHeigth - 143 - 110 - 103;
		listBg.x = 15;
		listBg.y = 12;
		this.addChild(listBg);

		
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,604,GameConfig.stageHeigth - 263 - 110);
		let chatList = Api.chatVoApi.getTabChatList();
		this._scrollList = ComponentManager.getScrollList(PriChatScrollItem,chatList,rect,NaN,0);
		this.addChild(this._scrollList);
		this.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, listBg, [0,5]);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatPriNoData"));
		//this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
	}

	public refreshWhenSwitchBack():void{
		let view = this;
	}

	private refreshChat(evt : egret.Event)
	{ 
		let view = this;
		let chatList = Api.chatVoApi.getTabChatList();
		view._scrollList.refreshData(chatList);
		// let isButtom:boolean = this._scrollList.checkIsAtButtom();
		// if(isButtom)
		// {
		// 	let chatList = Api.chatVoApi.getAllianceList();
		// 	this._scrollList.refreshData(chatList);
		// 	this._scrollList.moveToButtom();
		// }
		// Api.chatVoApi.clearPriChatList();
		//Api.chatVoApi.setPriChatList(evt.data.data.data);
		
		//this._scrollList.moveToButtom();
	}

	private setreadCallBack(evt : egret.Event) : void{
		let view = this;
		if(evt.data.data.data && evt.data.data.ret == 0){
			Api.chatVoApi.setMsgRead(evt.data.data.data[0]);
		}
	}

	// private refreshTrans()
	// {
	// 	let isButtom:boolean = this._scrollList.checkIsAtButtom();
	// 	this._scrollList.refreshData(Api.chatVoApi.getAllianceList());
	// 	if(isButtom)
	// 	{			
	// 		this._scrollList.moveToButtom();
	// 	}
	// }

	public dispose():void
	{
        // this._inputTextField.removeEventListener();
		let view = this;
		view._scrollList = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS,this.refreshTrans,this);
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG), view.refreshChat, view);
		super.dispose();
	}
}