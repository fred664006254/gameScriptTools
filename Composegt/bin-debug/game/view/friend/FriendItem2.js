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
 * 好友 结交好友部分
 * author yanyuling
 * ddate 2018/06/21
 * @class FriendItem2
 */
var FriendItem2 = (function (_super) {
    __extends(FriendItem2, _super);
    function FriendItem2(bottomH) {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this._refreshCd = 0;
        _this.init(bottomH);
        return _this;
    }
    FriendItem2.prototype.init = function (bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.searchBtnCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETRECONMEND), this.receiveData, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.refreshAfterApplyOrCancel,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.refreshAfterApplyOrCancel,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE, this.refreshAfterApplyOrCancel, this);
        var bg = BaseBitmap.create("recharge_diban_01");
        bg.width = GameConfig.stageWidth - 16;
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.height = 120;
        bg.y = -5;
        this.addChild(bg);
        //输入框
        var tarWidth = 350;
        var tarHeight = 40;
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, 18, tarWidth, tarHeight, "public_tc_srkbg05", LanguageManager.getlocal("friends_searchTxt"), TextFieldConst.COLOR_WHITE);
        inputTF.x = 80;
        inputTF.y = 30;
        var textField = inputTF.getChildByName("textField");
        // textField.y -= 30;
        this.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.height = tarHeight;
        this._inputTextField.width = tarWidth;
        this._inputTextField.maxChars = 20;
        // this._inputTextField.textColor = 0x858688;
        var searchBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "friendsBtnTxt15", this.searchBtnHandler, this);
        searchBtn.x = inputTF.x + inputTF.width + 5;
        searchBtn.y = inputTF.y + inputTF.height / 2 - searchBtn.height / 2 - 3;
        searchBtn.name = "searchBtn";
        this.addChild(searchBtn);
        var maskbg = BaseBitmap.create("public_9_viewmask");
        maskbg.width = GameConfig.stageWidth - 10;
        maskbg.x = GameConfig.stageWidth / 2 - maskbg.width / 2;
        maskbg.height = 40;
        maskbg.y = bg.y + bg.height;
        this.addChild(maskbg);
        // let lineImg =  BaseBitmap.create("public_line3");
        // lineImg.width = 460;
        // lineImg.x = maskbg.x + maskbg.width/2 - lineImg.width/2;
        // lineImg.y = maskbg.y + maskbg.height/2 - lineImg.height/2;
        // this.addChild(lineImg);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.setPosition(maskbg.x + maskbg.width / 2 - leftLine.width - 70, maskbg.y + maskbg.height / 2 - leftLine.height / 2);
        this.addChild(leftLine);
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.anchorOffsetX = rightLine.width / 2;
        rightLine.anchorOffsetY = rightLine.height / 2;
        rightLine.rotation = 180;
        rightLine.setPosition(maskbg.x + maskbg.width / 2 + rightLine.width / 2 + 70, leftLine.y + leftLine.height / 2);
        this.addChild(rightLine);
        var suggestTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        suggestTxt.text = LanguageManager.getlocal("friends_suggestTxt");
        suggestTxt.x = maskbg.x + maskbg.width / 2 - suggestTxt.width / 2;
        suggestTxt.y = maskbg.y + maskbg.height / 2 - suggestTxt.height / 2;
        this.addChild(suggestTxt);
        this.width = GameConfig.stageWidth;
        var buttombg = BaseBitmap.create("adult_lowbg");
        buttombg.y = bottomH - buttombg.height;
        buttombg.x = this.width / 2 - buttombg.width / 2;
        this.addChild(buttombg);
        this._friendsTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._friendsTxt.x = buttombg.x + 20;
        this._friendsTxt.y = buttombg.y + buttombg.height / 2 - this._friendsTxt.height / 2 - 10;
        this.addChild(this._friendsTxt);
        var applyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "friendsBtnTxt4", this.applyBtnHandler, this);
        applyBtn.x = buttombg.x + buttombg.width - applyBtn.width * 2 - 20;
        applyBtn.y = buttombg.y + buttombg.height / 2 - applyBtn.height / 2 + 3;
        applyBtn.name = "applyBtn";
        this.addChild(applyBtn);
        var refreshBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "friendsBtnTxt5", this.refreshBtnHandler, this);
        refreshBtn.x = applyBtn.x + applyBtn.width + 8;
        refreshBtn.y = applyBtn.y;
        refreshBtn.name = "refreshBtn";
        this.addChild(refreshBtn);
        this._refreshBtn = refreshBtn;
        var rect = new egret.Rectangle(0, maskbg.y + maskbg.height + 5, 622, bottomH - buttombg.height - maskbg.y - maskbg.height - 10);
        this._scrollView = ComponentManager.getScrollList(FriendScrollItem, [], rect);
        this._scrollView.x = GameConfig.stageWidth / 2 - this._scrollView.width / 2;
        this._scrollView.y = maskbg.y + maskbg.height;
        this.addChild(this._scrollView);
        if (Api.friendVoApi.recommendList.length == 0) {
            this.doRequtstApplyList();
        }
        else {
            this.doRefreshList();
        }
        this.tick();
        TickManager.addTick(this.tick, this);
    };
    FriendItem2.prototype.doRequtstApplyList = function () {
        NetManager.request(NetRequestConst.REQUEST_FRIEND_GETRECONMEND, {});
    };
    FriendItem2.prototype.refreshAfterApplyOrCancel = function (data) {
        // let rData = data.data.data;
        // if( rData.ret == 0)
        // {
        // 	egret.callLater(this.doRefreshList,this);
        // }
        egret.callLater(this.doRequtstApplyList, this);
    };
    FriendItem2.prototype.doRefreshList = function () {
        var maxF = GameConfig.config.friendCfg.maxFriend;
        this._friendsTxt.text = LanguageManager.getlocal("friendsNumTxt", [Api.friendVoApi.getFriendsCount() + "/" + maxF]);
        var dataList = [];
        for (var index = 0; index < Api.friendVoApi.recommendList.length; index++) {
            var tmpData = Api.friendVoApi.recommendList[index];
            if (!Api.friendVoApi.isFriendByUid(tmpData.uid)) {
                tmpData["uiType"] = FriendScrollItem.UITYPE2;
                dataList.push(tmpData);
            }
        }
        if (this._scrollView) {
            this._scrollView.refreshData(dataList);
        }
        var tipTxt = this.getChildByName("tipTxt");
        if (dataList.length == 0) {
            if (!tipTxt) {
                tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip3"), 20, TextFieldConst.COLOR_WHITE);
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
    };
    FriendItem2.prototype.searchBtnCallBack = function (data) {
        var rData = data.data.data;
        if (rData.ret == 0) {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, rData.data);
        }
        else if (rData.ret < 0 || rData.data.usernotexist == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_searchTip1"));
        }
    };
    FriendItem2.prototype.searchBtnHandler = function () {
        var taruid = this._inputTextField.text;
        if (taruid == "") {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_searchTxt"));
            return;
        }
        if (Number(taruid) == Api.playerVoApi.getPlayerID()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinnerCannotSelf"));
            return;
        }
        if (!Number(taruid)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_searchTip1"));
            return;
        }
        if (!this._inputTextField.bindData) {
            this._inputTextField.bindData = "";
            this._inputTextField.text = "";
        }
        if (Config.ShieldCfg.checkOnlyShield(taruid) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: taruid });
    };
    FriendItem2.prototype.applyBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.FRIENDSAPPLYPOPUPVIEW);
    };
    FriendItem2.prototype.refreshBtnHandler = function () {
        if (this._refreshCd > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("friends_refreshListTip", ["" + this._refreshCd]));
            return;
        }
        this._refreshCd = GameConfig.config.friendCfg.refreshCD;
        this.doRequtstApplyList();
    };
    FriendItem2.prototype.tick = function () {
        if (this._refreshCd > 0) {
            this._refreshCd--;
            this._refreshBtn.setText(App.DateUtil.getFormatBySecond(this._refreshCd, 3), false);
        }
        else {
            this._refreshBtn.setText("friendsBtnTxt5");
        }
        return true;
    };
    FriendItem2.prototype.receiveData = function (data) {
        var rData = data.data.data;
        if (rData.ret == 0) {
            var data_1 = rData;
            var cmd = rData.cmd;
            if (cmd == NetRequestConst.REQUEST_FRIEND_GETRECONMEND) {
                Api.friendVoApi.recommendList = rData.data.commendList;
            }
            this.doRefreshList();
        }
    };
    FriendItem2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE, this.refreshAfterApplyOrCancel, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.searchBtnCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETRECONMEND), this.receiveData, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_CANCELAPPLY),this.refreshAfterApplyOrCancel,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_APPLY),this.refreshAfterApplyOrCancel,this);
        TickManager.removeTick(this.tick, this);
        this._refreshCd = 0;
        this._scrollView = null;
        this._friendsTxt = null;
        this._inputTextField = null;
        this._refreshBtn = null;
        _super.prototype.dispose.call(this);
    };
    return FriendItem2;
}(BaseDisplayObjectContainer));
__reflect(FriendItem2.prototype, "FriendItem2");
