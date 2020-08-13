class ChatViewTab3 extends CommonViewTab
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
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW,this.refreshChat,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);


		let hh = 60;
		let bottomBg0 = BaseBitmap.create("public_9v_bg02");
		bottomBg0.width = GameConfig.stageWidth;
		bottomBg0.height = GameConfig.stageHeigth - hh ;//- 300 + 100;
		bottomBg0.x = 0;
		bottomBg0.y = 0;
		this.addChild(bottomBg0);

		let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
		listBg.width = GameConfig.stageWidth - 30;
		listBg.height = GameConfig.stageHeigth - 143 - 110 - 103- hh;
		listBg.x = 15;
		listBg.y = 0;
		this.addChild(listBg);

		let lisetBg = BaseBitmap.create("public_9v_bg03");
		lisetBg.width = GameConfig.stageWidth;
		lisetBg.height = GameConfig.stageHeigth - 150;
		lisetBg.x = 0;
		lisetBg.y = 0;
		this.addChild(lisetBg);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,604,GameConfig.stageHeigth - 180- hh);
		let chatList = Api.chatVoApi.getTabChatList();
		this._scrollList = ComponentManager.getScrollList(PriChatScrollItem,chatList,rect,NaN,0);
		this.addChild(this._scrollList);
		this.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, listBg, [0,5]);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatPriNoData"));

		let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");
		// bottom.height = 200;
		bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChild(bottom);
	}

	public refreshWhenSwitchBack():void{
		let view = this;
	}

	private refreshChat(evt : egret.Event)
	{ 
		let view = this;
		let chatList = Api.chatVoApi.getTabChatList();
		view._scrollList.refreshData(chatList);
	}

	private setreadCallBack(evt : egret.Event) : void{
		let view = this;
		if(evt.data.data.data && evt.data.data.ret == 0){
			Api.chatVoApi.setMsgRead(evt.data.data.data[0]);
		}
	}

	public dispose():void
	{
		let view = this;
		view._scrollList = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
		super.dispose();
	}
}