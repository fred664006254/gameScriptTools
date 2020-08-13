var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChatViewTab5 = (function (_super) {
    __extends(ChatViewTab5, _super);
    function ChatViewTab5() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    ChatViewTab5.prototype.initView = function () {
        var view = this;
        //view.height = ;
        // let chatview : any = ViewController.getInstance().getView('ChatView');
        // view.height = chatview.tabHeight;
        // view.width = boatview.tabWidth;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG), view.refreshChat, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, this.refreshChat, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS,this.refreshTrans,this);
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 30;
        listBg.height = GameConfig.stageHeigth - 143 - 110 - 103;
        listBg.x = 15;
        listBg.y = 12;
        this.addChild(listBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 604, GameConfig.stageHeigth - 263 - 110);
        var chatList = Api.chatVoApi.getTabChatList();
        this._scrollList = ComponentManager.getScrollList(PriChatScrollItem, chatList, rect, NaN, 0);
        this.addChild(this._scrollList);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, listBg, [0, 5]);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatPriNoData"));
        //this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
    };
    ChatViewTab5.prototype.refreshWhenSwitchBack = function () {
        var view = this;
    };
    ChatViewTab5.prototype.refreshChat = function (evt) {
        var view = this;
        var chatList = Api.chatVoApi.getTabChatList();
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
    };
    ChatViewTab5.prototype.setreadCallBack = function (evt) {
        var view = this;
        if (evt.data.data.data && evt.data.data.ret == 0) {
            Api.chatVoApi.setMsgRead(evt.data.data.data[0]);
        }
    };
    // private refreshTrans()
    // {
    // 	let isButtom:boolean = this._scrollList.checkIsAtButtom();
    // 	this._scrollList.refreshData(Api.chatVoApi.getAllianceList());
    // 	if(isButtom)
    // 	{			
    // 		this._scrollList.moveToButtom();
    // 	}
    // }
    ChatViewTab5.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        var view = this;
        view._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS,this.refreshTrans,this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG), view.refreshChat, view);
        _super.prototype.dispose.call(this);
    };
    return ChatViewTab5;
}(CommonViewTab));
__reflect(ChatViewTab5.prototype, "ChatViewTab5");
//# sourceMappingURL=ChatViewTab5.js.map