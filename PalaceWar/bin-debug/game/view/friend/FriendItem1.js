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
 * 好友 我的好友部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem1
 */
var FriendItem1 = (function (_super) {
    __extends(FriendItem1, _super);
    function FriendItem1(bottomH) {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this.init(bottomH);
        return _this;
    }
    FriendItem1.prototype.init = function (bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_SENDALL), this.sendBtnCAllBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED, this.doRefreshList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETINFO), this.receiveData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE, this.doRequestFriendList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEALL), this.doRefreshList, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN, this.doRefreshList, this);
        this.doRequestFriendList();
        var buttombg = BaseBitmap.create("arena_bottom");
        buttombg.y = bottomH - buttombg.height;
        this.addChild(buttombg);
        this._friendsTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._friendsTxt.x = buttombg.x + 20;
        this._friendsTxt.y = buttombg.y + buttombg.height / 2 - this._friendsTxt.height / 2 - 10;
        this.addChild(this._friendsTxt);
        // if(! PlatformManager.checkIsKRSp()){
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "friendsBtnTxt1", this.collectBtnHandler, this);
        collectBtn.x = buttombg.x + buttombg.width - collectBtn.width * 2 - 50;
        collectBtn.y = buttombg.y + buttombg.height / 2 - collectBtn.height / 2;
        collectBtn.name = "collectBtn";
        this.addChild(collectBtn);
        var sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "friendsBtnTxt2", this.sendBtnHandler, this);
        sendBtn.x = collectBtn.x + collectBtn.width + 20;
        sendBtn.y = collectBtn.y;
        sendBtn.name = "sendBtn";
        this.addChild(sendBtn);
        // }
        var rect = new egret.Rectangle(0, 0, 622, bottomH - buttombg.height - 10);
        this._scrollView = ComponentManager.getScrollList(FriendScrollItem, [], rect);
        this._scrollView.x = GameConfig.stageWidth / 2 - this._scrollView.width / 2;
        this.addChild(this._scrollView);
    };
    FriendItem1.prototype.doRequestFriendList = function () {
        NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO, {});
    };
    FriendItem1.prototype.refreshCollectRedPoints = function () {
        // if(PlatformManager.checkIsKRSp()){
        // 	return;
        // }
        var collectBtn = this.getChildByName("collectBtn");
        if (Api.friendVoApi.isGiftCollectEnable()) {
            App.CommonUtil.addIconToBDOC(collectBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(collectBtn);
        }
    };
    FriendItem1.prototype.doRefreshList = function () {
        var uiType = null;
        this.refreshCollectRedPoints();
        var dataList = [];
        var friendDataList = [];
        var sadunList = [];
        // Api.friendVoApi.sadunList
        var maxF = GameConfig.config.friendCfg.maxFriend;
        this._friendsTxt.text = LanguageManager.getlocal("friendsNumTxt", [Api.friendVoApi.getFriendsCount() + "/" + maxF]);
        if (Api.friendVoApi.isHideFriendsList() == false) {
            for (var index = 0; index < Api.friendVoApi.friendList.length; index++) {
                var tmpData = Api.friendVoApi.friendList[index];
                if (Api.friendVoApi.isFriendByUid(tmpData.uid)) {
                    tmpData["uiType"] = FriendScrollItem.UITYPE1;
                    uiType = FriendScrollItem.UITYPE1;
                    friendDataList.push(tmpData);
                }
            }
            friendDataList.sort(function (dataA, dataB) {
                return dataB["power"] - dataA["power"];
            });
        }
        if (Api.switchVoApi.checkopenSadun()) {
            if (Api.friendVoApi.isHideSaduList() == false) {
                // sadunList = Api.friendVoApi.sadunList;
                for (var index = 0; index < Api.friendVoApi.sadunList.length; index++) {
                    var tmpData = Api.friendVoApi.sadunList[index];
                    tmpData["uiType"] = FriendScrollItem.UITYPE7;
                    uiType = FriendScrollItem.UITYPE7;
                    sadunList.push(tmpData);
                }
                sadunList.sort(function (dataA, dataB) {
                    if (dataA.olt != dataB.olt) {
                        return dataB.olt - dataA.olt;
                    }
                    return dataB["friend"] - dataA["friend"];
                });
            }
            dataList.push({ sadTitle: true }); //亲家标题
            dataList = dataList.concat(sadunList);
            dataList.push({ friendsTitle: true }); //亲家标题
        }
        dataList = dataList.concat(friendDataList);
        if (this._scrollView) {
            this._scrollView.refreshData(dataList, { uiType: uiType });
        }
        var isEmpty = true;
        if (Api.friendVoApi.sadunList.length > 0 || Api.friendVoApi.friendList.length > 0) {
            isEmpty = false;
        }
        if ((Api.switchVoApi.checkopenSadun() && dataList.length == 2) && isEmpty) {
            if (!this._emptyTipNode) {
                this._emptyTipNode = new BaseDisplayObjectContainer();
                this.addChild(this._emptyTipNode);
                var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                tipTxt.x = GameConfig.stageWidth / 2 - tipTxt.width / 2;
                tipTxt.y = GameConfig.stageHeigth / 2 - tipTxt.height / 2 - 90;
                this._emptyTipNode.addChild(tipTxt);
                var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "friendsBtnTxt19", this.goBtnHandler, this);
                goBtn.x = tipTxt.x + tipTxt.width / 2 - goBtn.width / 2;
                goBtn.y = tipTxt.y + 30;
                goBtn.name = "collectBtn";
                this._emptyTipNode.addChild(goBtn);
            }
            this._emptyTipNode.visible = true;
        }
        else {
            if (this._emptyTipNode) {
                this._emptyTipNode.visible = false;
            }
        }
    };
    FriendItem1.prototype.collectBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.FRIENDSGIFTPOPUPVIEW);
    };
    FriendItem1.prototype.sendBtnCAllBack = function (data) {
        if (data.data.ret) {
            var rData = data.data.data;
            if (rData.ret == 0) {
                this.doRefreshList();
            }
        }
    };
    FriendItem1.prototype.sendBtnHandler = function () {
        if (!Api.friendVoApi.isBatchSendGiftEnable()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_batchSendTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_FRIEND_SENDALL, {});
    };
    FriendItem1.prototype.goBtnHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_SWITCH_TAB, { index: 1 });
    };
    FriendItem1.prototype.receiveData = function (data) {
        if (data.data.ret) {
            var rData = data.data.data;
            if (rData.ret == 0) {
                var cmd = rData.cmd;
                if (cmd == NetRequestConst.REQUEST_FRIEND_GETINFO) {
                    Api.friendVoApi.friendList = rData.data.friendList;
                }
                else if (cmd == NetRequestConst.REQUEST_FRIEND_SENDALL) {
                }
                this.doRefreshList();
            }
        }
    };
    FriendItem1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETINFO), this.receiveData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED, this.doRefreshList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_SENDALL), this.sendBtnCAllBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_RECEIVEALL), this.doRefreshList, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE, this.doRequestFriendList, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN, this.doRefreshList, this);
        this._scrollView = null;
        this._friendsTxt = null;
        this._emptyTipNode = null;
        _super.prototype.dispose.call(this);
    };
    return FriendItem1;
}(BaseDisplayObjectContainer));
__reflect(FriendItem1.prototype, "FriendItem1");
//# sourceMappingURL=FriendItem1.js.map