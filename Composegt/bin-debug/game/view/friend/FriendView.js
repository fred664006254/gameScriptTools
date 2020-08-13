/**
 * 好友
 * author yanyuling
 * date 2018/06/21
 * @class FriendView
 */
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
var FriendView = (function (_super) {
    __extends(FriendView, _super);
    function FriendView() {
        var _this = _super.call(this) || this;
        _this._bottomNodeList = [];
        return _this;
    }
    FriendView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3, this.refreshGroupRedPoints, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_SWITCH_TAB, this.switchTabHandler, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._innerbg = BaseBitmap.create("public_9_bg23");
        this._innerbg.width = GameConfig.stageWidth - 10;
        this._innerbg.x = 5;
        this._nodeContainer.addChild(this._innerbg);
        var tabName = ["friendsTabBtn1", "friendsTabBtn2", "friendsTabBtn3", "friendsTabBtn4"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        // tabbarGroup.setSpace(5);
        tabbarGroup.anchorOffsetX = tabbarGroup.width / 2;
        tabbarGroup.x = GameConfig.stageWidth / 2;
        tabbarGroup.y = -10;
        tabbarGroup.name = "tabbarGroup";
        this._tabbarGroup = tabbarGroup;
        // this._nodeContainer.addChild(tabbarGroup);
        this._innerbg.y = tabbarGroup.y + tabbarGroup.height;
        this._innerbg.height = GameConfig.stageHeigth - this.container.y - this._innerbg.y;
        var tarHeight = GameConfig.stageHeigth - this.container.y - tabbarGroup.height - tabbarGroup.y - 18;
        var friendsItem1 = new FriendItem1(tarHeight);
        var friendsItem2 = new FriendItem2(tarHeight);
        var friendsItem3 = new FriendItem3(tarHeight);
        var friendsItem4 = new FriendItem4(tarHeight);
        friendsItem1.y = tabbarGroup.y + tabbarGroup.height + 5;
        friendsItem2.y = friendsItem1.y;
        friendsItem3.y = friendsItem1.y;
        friendsItem4.y = friendsItem1.y;
        this._nodeContainer.addChild(friendsItem1);
        this._nodeContainer.addChild(friendsItem2);
        this._nodeContainer.addChild(friendsItem3);
        this._nodeContainer.addChild(friendsItem4);
        this._bottomNodeList.push(friendsItem1);
        this._bottomNodeList.push(friendsItem2);
        this._bottomNodeList.push(friendsItem3);
        this._bottomNodeList.push(friendsItem4);
        this.tabBtnClickHandler({ index: 0 });
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y + 10;
        bottomBg.x = 0;
        bottomBg.y = -10;
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(tabbarGroup);
        this.refreshGroupRedPoints();
    };
    FriendView.prototype.refreshGroupRedPoints = function () {
        //请求列表
        if (Api.friendVoApi.isShowRedForItem3()) {
            this._tabbarGroup.addRedPoint(2);
        }
        else {
            this._tabbarGroup.removeRedPoint(2);
        }
    };
    FriendView.prototype.switchTabHandler = function (event) {
        this.tabBtnClickHandler(event.data);
        this._tabbarGroup.selectedIndex = event.data.index;
    };
    FriendView.prototype.tabBtnClickHandler = function (params) {
        for (var index = 0; index < this._bottomNodeList.length; index++) {
            this._bottomNodeList[index].visible = false;
        }
        var tarIdx = params.index;
        this._bottomNodeList[tarIdx].visible = true;
        if (tarIdx <= 2) {
            this._innerbg.height = GameConfig.stageHeigth - this.container.y - this._innerbg.y - 80;
        }
        else {
            this._innerbg.height = GameConfig.stageHeigth - this.container.y - this._innerbg.y - 30;
        }
    };
    FriendView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (rData.ret == 0) {
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO) {
                Api.friendVoApi.sadunList = rData.data.sadunList;
            }
        }
    };
    FriendView.prototype.getRequestData = function () {
        if (Api.switchVoApi.checkopenSadun()) {
            return { requestType: NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO, requestData: {} };
        }
        return null;
    };
    FriendView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "friends_applyflag", "friends_arrow1", "friends_arrow2",
            "friends_progress", "friends_progressbg", "progress3_bg",
            "arena_bottom", "friends_sendflag",
            "adult_lowbg", "recharge_diban_01", "public_listbtn"
        ]);
    };
    FriendView.prototype.hide = function () {
        Api.friendVoApi.hideSaduList(false);
        Api.friendVoApi.hideFriendsList(false);
        _super.prototype.hide.call(this);
    };
    FriendView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3, this.refreshGroupRedPoints, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_SWITCH_TAB, this.switchTabHandler, this);
        this._nodeContainer = null;
        this._bottomNodeList = [];
        this._innerbg = null;
        this._tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return FriendView;
}(CommonView));
__reflect(FriendView.prototype, "FriendView");
