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
var ChatViewTab3 = (function (_super) {
    __extends(ChatViewTab3, _super);
    function ChatViewTab3() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    ChatViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, this.refreshChat, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
        var hh = 60;
        var bottomBg0 = BaseBitmap.create("public_9v_bg02");
        bottomBg0.width = GameConfig.stageWidth;
        bottomBg0.height = GameConfig.stageHeigth - hh; //- 300 + 100;
        bottomBg0.x = 0;
        bottomBg0.y = 0;
        this.addChild(bottomBg0);
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 30;
        listBg.height = GameConfig.stageHeigth - 143 - 110 - 103 - hh;
        listBg.x = 15;
        listBg.y = 0;
        this.addChild(listBg);
        var lisetBg = BaseBitmap.create("public_9v_bg03");
        lisetBg.width = GameConfig.stageWidth;
        lisetBg.height = GameConfig.stageHeigth - 150;
        lisetBg.x = 0;
        lisetBg.y = 0;
        this.addChild(lisetBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 604, GameConfig.stageHeigth - 180 - hh);
        var chatList = Api.chatVoApi.getTabChatList();
        this._scrollList = ComponentManager.getScrollList(PriChatScrollItem, chatList, rect, NaN, 0);
        this.addChild(this._scrollList);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, listBg, [0, 5]);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatPriNoData"));
        var bottom = BaseBitmap.create("chatview_bottom");
        // bottom.height = 200;
        bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChild(bottom);
    };
    ChatViewTab3.prototype.refreshWhenSwitchBack = function () {
        var view = this;
    };
    ChatViewTab3.prototype.refreshChat = function (evt) {
        var view = this;
        var chatList = Api.chatVoApi.getTabChatList();
        view._scrollList.refreshData(chatList);
    };
    ChatViewTab3.prototype.setreadCallBack = function (evt) {
        var view = this;
        if (evt.data.data.data && evt.data.data.ret == 0) {
            Api.chatVoApi.setMsgRead(evt.data.data.data[0]);
        }
    };
    ChatViewTab3.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SETREAD), view.setreadCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return ChatViewTab3;
}(CommonViewTab));
__reflect(ChatViewTab3.prototype, "ChatViewTab3");
