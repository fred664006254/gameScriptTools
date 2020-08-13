/**
 * 好友申请列表
 * author yanyuling
 * date 2018/106/22
 * @class FriendApplyPopupView
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
var FriendApplyPopupView = (function (_super) {
    __extends(FriendApplyPopupView, _super);
    function FriendApplyPopupView() {
        var _this = _super.call(this) || this;
        _this._applyList = [];
        return _this;
    }
    FriendApplyPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY), this.applyCancelCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 530;
        bg1.height = 650;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 5;
        this._nodeContainer.addChild(bg1);
        var bottombg = BaseBitmap.create("public_9_cell_title");
        bottombg.width = bg1.width;
        bottombg.x = bg1.x;
        bottombg.y = bg1.y + bg1.height - bottombg.height;
        this._nodeContainer.addChild(bottombg);
        this._friendsTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        this._friendsTxt.x = this.viewBg.width / 2;
        this._friendsTxt.y = bottombg.y + 3;
        this._nodeContainer.addChild(this._friendsTxt);
        var rect = new egret.Rectangle(0, 0, 520, bg1.height - 10 - bottombg.height);
        var dataList = [];
        var scrollView = ComponentManager.getScrollList(FriendScrollItem, dataList, rect);
        scrollView.x = bg1.x + 5;
        scrollView.y = bg1.y + 5;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("friends_emptyTip4"));
        this._scrollView = scrollView;
        this.doRefreshList();
    };
    FriendApplyPopupView.prototype.doRefreshList = function () {
        if (this._scrollView) {
            var uiType = null;
            var dataList = [];
            for (var index = 0; index < this._applyList.length; index++) {
                var tmpData = this._applyList[index];
                if (Api.friendVoApi.isAppliedByUid(tmpData.uid)) {
                    // tmpData["uiType"] = FriendScrollItem.UITYPE6;
                    uiType = FriendScrollItem.UITYPE6;
                    dataList.push(tmpData);
                }
            }
            this._scrollView.refreshData(dataList, { uiType: uiType });
        }
        var maxSendRequest = GameConfig.config.friendCfg.maxSendRequest;
        this._friendsTxt.text = LanguageManager.getlocal("friends_applyNumTxt", [Api.friendVoApi.getApplyCount() + "/" + maxSendRequest]);
        this._friendsTxt.anchorOffsetX = this._friendsTxt.width / 2;
    };
    FriendApplyPopupView.prototype.getShowHeight = function () {
        return 735;
    };
    FriendApplyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    FriendApplyPopupView.prototype.applyCancelCallback = function (data) {
        if (data.data.ret) {
            var rData = data.data.data;
            if (rData.ret == 0) {
                // this.doRefreshList();
                egret.Tween.get(this, { loop: false }).wait(150).call(this.doRefreshList, this);
            }
        }
    };
    FriendApplyPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rData = data.data;
            if (rData.ret == 0) {
                var cmd = rData.cmd;
                if (cmd == NetRequestConst.REQUEST_FRIEND_APPLYLIST) {
                    var applyList = rData.data.applyList;
                    this._applyList = applyList;
                    Api.friendVoApi.applyList = applyList;
                }
            }
        }
    };
    FriendApplyPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_FRIEND_APPLYLIST, requestData: {} };
    };
    FriendApplyPopupView.prototype.dispose = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY), this.applyCancelCallback, this);
        this._nodeContainer = null;
        this._scrollView = null;
        this._friendsTxt = null;
        this._applyList = null;
        _super.prototype.dispose.call(this);
    };
    return FriendApplyPopupView;
}(PopupView));
__reflect(FriendApplyPopupView.prototype, "FriendApplyPopupView");
//# sourceMappingURL=FriendApplyPopupView.js.map