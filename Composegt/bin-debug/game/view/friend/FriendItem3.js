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
 * 好友 申请列表部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem3
 */
var FriendItem3 = (function (_super) {
    __extends(FriendItem3, _super);
    function FriendItem3(bottomH) {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this._isBatchEnable = false;
        _this.init(bottomH);
        return _this;
    }
    FriendItem3.prototype.init = function (bottomH) {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_REFUSEALL),this.denyBtnCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVELIST), this.receiveData, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3,this.doRefreshList,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE, this.doRequestRecvList, this); //有新的申请时刷新UI
        this.doRequestRecvList();
        this.width = GameConfig.stageWidth;
        var buttombg = BaseBitmap.create("adult_lowbg");
        buttombg.y = bottomH - buttombg.height;
        buttombg.x = this.width / 2 - buttombg.width / 2;
        this.addChild(buttombg);
        this._friendsTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._friendsTxt.x = buttombg.x + 20;
        this._friendsTxt.y = buttombg.y + buttombg.height / 2 - this._friendsTxt.height / 2 - 10;
        this.addChild(this._friendsTxt);
        var denyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "friendsBtnTxt6", this.denyBtnHandler, this);
        denyBtn.x = buttombg.x + buttombg.width - denyBtn.width * 2 - 20;
        denyBtn.y = buttombg.y + buttombg.height / 2 - denyBtn.height / 2 + 3;
        denyBtn.name = "denyBtn";
        this.addChild(denyBtn);
        var batchBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "friendsBtnTxt21", this.batchBtnHandler, this);
        batchBtn.x = denyBtn.x + denyBtn.width + 8; //buttombg.x + buttombg.width - batchBtn.width - 30;
        batchBtn.y = denyBtn.y; //buttombg.y + buttombg.height/2 - batchBtn.height/2;
        batchBtn.name = "batchBtn";
        this.addChild(batchBtn);
        var rect = new egret.Rectangle(0, 0, 622, bottomH - buttombg.height - 10);
        this._scrollView = ComponentManager.getScrollList(FriendScrollItem, [], rect);
        this._scrollView.x = GameConfig.stageWidth / 2 - this._scrollView.width / 2;
        // this._scrollView.y = 5;
        this.addChild(this._scrollView);
    };
    FriendItem3.prototype.batchCallBack = function (data) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FRIEND_ACCEPTALL, this.batchCallBack, this);
        var rData = data.data.data;
        var friendFlag = rData.data.friendFlag;
        if (friendFlag) {
            Api.friendVoApi.showFriendsNetFlags(friendFlag);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_accept_all_tip"));
        }
    };
    FriendItem3.prototype.batchBtnHandler = function () {
        if (!this._isBatchEnable) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_emptyTip5"));
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FRIEND_ACCEPTALL, this.batchCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_FRIEND_ACCEPTALL, {});
    };
    FriendItem3.prototype.doRequestRecvList = function () {
        NetManager.request(NetRequestConst.REQUEST_FRIEND_RECEIVELIST, {});
    };
    FriendItem3.prototype.doRefreshList = function () {
        var maxF = GameConfig.config.friendCfg.maxFriend;
        this._friendsTxt.text = LanguageManager.getlocal("friendsNumTxt", [Api.friendVoApi.getFriendsCount() + "/" + maxF]);
        var dataList = [];
        var receiveList = Api.friendVoApi.receiveList;
        for (var index = 0; index < receiveList.length; index++) {
            var tmpData = receiveList[index];
            if (Api.friendVoApi.isInvalidInList3(tmpData.uid)) {
                tmpData["uiType"] = FriendScrollItem.UITYPE3;
                dataList.push(tmpData);
            }
        }
        if (this._scrollView) {
            this._scrollView.refreshData(dataList);
        }
        var tipTxt = this.getChildByName("tipTxt");
        if (dataList.length == 0) {
            this._isBatchEnable = false;
            if (!tipTxt) {
                tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip5"), 20, TextFieldConst.COLOR_WHITE);
                tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
                tipTxt.y = GameConfig.stageHeigth / 2 - tipTxt.height / 2 - 90;
                tipTxt.name = "tipTxt";
                this.addChild(tipTxt);
            }
            tipTxt.visible = true;
        }
        else {
            this._isBatchEnable = true;
            if (tipTxt) {
                tipTxt.visible = false;
            }
        }
    };
    FriendItem3.prototype.denyBtnCallback = function (data) {
        var rData = data.data.data;
        if (rData.ret == 0) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3);
        }
    };
    FriendItem3.prototype.denyBtnHandler = function () {
        if (!this._isBatchEnable) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_emptyTip5"));
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("friends_rrefuseAllTip"));
        NetManager.request(NetRequestConst.REQUEST_FRIEND_REFUSEALL, {});
    };
    FriendItem3.prototype.receiveData = function (data) {
        var rData = data.data.data;
        if (rData.ret == 0) {
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_FRIEND_RECEIVELIST) {
                Api.friendVoApi.receiveList = rData.data.receiveList;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3);
            this.doRefreshList();
        }
    };
    FriendItem3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE, this.doRequestRecvList, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_REFUSEALL),this.denyBtnCallback,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3,this.doRefreshList,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVELIST), this.receiveData, this);
        this._scrollView = null;
        this._friendsTxt = null;
        _super.prototype.dispose.call(this);
    };
    return FriendItem3;
}(BaseDisplayObjectContainer));
__reflect(FriendItem3.prototype, "FriendItem3");
