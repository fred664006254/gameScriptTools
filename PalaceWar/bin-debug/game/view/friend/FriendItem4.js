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
/**
 * 好友 屏蔽列表部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem4
 */
var FriendItem4 = (function (_super) {
    __extends(FriendItem4, _super);
    function FriendItem4(bottomH) {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this.init(bottomH);
        return _this;
    }
    FriendItem4.prototype.init = function (bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_LIST), this.receiveData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK), this.receiveData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK), this.receiveData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_BLOCK), this.receiveData, this);
        NetManager.request(NetRequestConst.REQUEST_CHAT_LIST, {});
        this._friendsTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._friendsTxt.x = GameConfig.stageWidth / 2;
        this._friendsTxt.y = bottomH - 30;
        this.addChild(this._friendsTxt);
        var rect = new egret.Rectangle(0, 0, 622, bottomH - 40);
        this._scrollView = ComponentManager.getScrollList(FriendScrollItem, [], rect);
        this._scrollView.x = GameConfig.stageWidth / 2 - this._scrollView.width / 2;
        this.addChild(this._scrollView);
        // this.doRefreshList();
    };
    FriendItem4.prototype.doRefreshList = function () {
        var uiType = null;
        var dataList = Api.friendVoApi.shieldList;
        for (var index = 0; index < dataList.length; index++) {
            // dataList[index]["uiType"] = FriendScrollItem.UITYPE4;
            uiType = FriendScrollItem.UITYPE4;
        }
        if (this._scrollView) {
            this._scrollView.refreshData(dataList, { uiType: uiType });
        }
        var tipTxt = this.getChildByName("tipTxt");
        if (!dataList.length || dataList.length == 0) {
            if (!tipTxt) {
                tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip6"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
                tipTxt.y = GameConfig.stageHeigth / 2 - tipTxt.height / 2 - 90;
                tipTxt.name = "tipTxt";
                this.addChild(tipTxt);
            }
            tipTxt.visible = true;
        }
        else {
            if (tipTxt) {
                tipTxt.visible = false;
            }
        }
        var num = 0;
        if (Api.chatVoApi.getChatBlockVo().info && Api.chatVoApi.getChatBlockVo().info.length) {
            num = Api.chatVoApi.getChatBlockVo().info.length;
        }
        var maxShieldPlayer = GameConfig.config.friendCfg.maxShieldPlayer;
        var str = LanguageManager.getlocal("chatblockCount", [num + "/" + maxShieldPlayer]);
        this._friendsTxt.text = str;
        this._friendsTxt.anchorOffsetX = this._friendsTxt.width / 2;
    };
    FriendItem4.prototype.receiveData = function (data) {
        var rData = data.data.data;
        if (rData.ret == 0) {
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_CHAT_LIST) {
                Api.friendVoApi.shieldList = rData.data.list;
            }
            else if (cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK) {
                Api.friendVoApi.shieldList = rData.data.list;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
            }
            else if (cmd == NetRequestConst.REQUEST_CHAT_BLOCK) {
                NetManager.request(NetRequestConst.REQUEST_CHAT_LIST, {});
            }
            this.doRefreshList();
        }
    };
    FriendItem4.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_LIST), this.receiveData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK), this.receiveData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_UNBLOCK), this.receiveData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHAT_BLOCK), this.receiveData, this);
        this._scrollView = null;
        this._friendsTxt = null;
        _super.prototype.dispose.call(this);
    };
    return FriendItem4;
}(BaseDisplayObjectContainer));
__reflect(FriendItem4.prototype, "FriendItem4");
//# sourceMappingURL=FriendItem4.js.map