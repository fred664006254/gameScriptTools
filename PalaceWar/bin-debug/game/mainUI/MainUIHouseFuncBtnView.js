var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 府内功能
 */
var MainUIHouseFuncBtnView = /** @class */ (function (_super) {
    __extends(MainUIHouseFuncBtnView, _super);
    function MainUIHouseFuncBtnView(param) {
        var _this = _super.call(this) || this;
        _this._zhenqifangBtn = null;
        _this._changeBgBtn = null;
        _this._friendsBtn = null;
        _this._btnList = [];
        _this._bg = null;
        _this._paramData = null;
        _this._paramData = param;
        _this.init();
        return _this;
    }
    MainUIHouseFuncBtnView.prototype.init = function () {
        var _this = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshBtn, this);
        var bg = BaseBitmap.create("mainui_houseBtnbg");
        this.addChild(bg);
        this._bg = bg;
        if (this._paramData) {
            bg.addTouchTap(function () {
                _this._paramData.callback.apply(_this._paramData.obj);
            }, this);
        }
        else {
            bg.touchEnabled = true;
        }
        //珍器房
        var offX = 20;
        var offY = 20;
        var offW = 86;
        if ((!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkZhenQiFangOpen()) || (Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkZhenQiFangOpen() && Api.zhenqifangVoApi.isShowNpc())) {
            this._zhenqifangBtn = ComponentManager.getButton("zhenqifangenter", null, this.openZhenqifang, this, null, 1);
            this._zhenqifangBtn.setPosition(offX, offY);
            this.addChild(this._zhenqifangBtn);
            this.checkZhenQiFangState();
            this._btnList.push(this._zhenqifangBtn);
            offX = this._zhenqifangBtn.x + offW;
        }
        if (Api.switchVoApi.checkOpenChangeBg() && Config.SceneCfg.isSceneMulti()) {
            this._changeBgBtn = ComponentManager.getButton("mainui_changebg_btn", null, this.openChangeBg, this, null, 1);
            this._changeBgBtn.setPosition(offX, offY);
            this.addChild(this._changeBgBtn);
            this.checkChangeBgState();
            this._btnList.push(this._changeBgBtn);
            offX = this._changeBgBtn.x + offW;
        }
        if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
            if (Api.friendVoApi.isShowNpc() && (!Api.unlocklist2VoApi.isInNeedShowEffect("friend")) || this._paramData.isOpenFunc) {
                this.showFriend(offX, offY);
                if (this._paramData.isOpenFunc) {
                    this._friendsBtn.visible = false;
                }
            }
        }
        else {
            this.showFriend(offX, offY);
        }
        bg.width = this._btnList.length * offW + 30;
        bg.height = 134;
        this.width = bg.width;
        this.height = bg.height;
        TickManager.addTick(this.tick, this);
    };
    MainUIHouseFuncBtnView.prototype.showFriend = function (x, y) {
        this._friendsBtn = ComponentManager.getButton("mainui_friends_btn", "", this.openFriends, this, null, 1);
        this._friendsBtn.x = x;
        this._friendsBtn.y = y;
        this.addChild(this._friendsBtn);
        if (Api.friendVoApi.isShowNpc()) {
            this._friendsBtn.setGray(false);
        }
        else {
            this._friendsBtn.setGray(true);
        }
        this._btnList.push(this._friendsBtn);
        this.checkFriendsState();
    };
    MainUIHouseFuncBtnView.prototype.freshBtn = function (evt) {
        var data = evt.data;
        if (data.key == "friend") {
            this._friendsBtn.visible = true;
        }
    };
    MainUIHouseFuncBtnView.prototype.resetBtnPos = function () {
        var offW = 86;
        var offX = 20;
        for (var i = 0; i < this._btnList.length; i++) {
            var btn = this._btnList[i];
            if (btn && btn.visible) {
                btn.x = offX + i * offW;
            }
        }
        this._bg.width = this._btnList.length * offW + 30;
        this._bg.height = 134;
    };
    MainUIHouseFuncBtnView.prototype.tick = function () {
        this.checkZhenQiFangState();
        this.checkFriendsState();
        this.checkChangeBgState();
    };
    //珍器坊
    MainUIHouseFuncBtnView.prototype.openZhenqifang = function () {
        if (Api.rookieVoApi.isGuiding && Api.rookieVoApi.curStep == "102") {
            return;
        }
        if (Api.zhenqifangVoApi.isShowNpc()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ZHENQIFANGVIEW);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]));
        }
    };
    //切换场景
    MainUIHouseFuncBtnView.prototype.openChangeBg = function () {
        if (Api.rookieVoApi.isGuiding) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHANGEBGVIEW);
    };
    //好友
    MainUIHouseFuncBtnView.prototype.openFriends = function () {
        if (!Api.friendVoApi.isShowNpc()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + GameConfig.config.friendCfg.needLv)]));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.FRIENDSVIEW);
    };
    //珍器坊
    MainUIHouseFuncBtnView.prototype.checkZhenQiFangState = function () {
        if (this._zhenqifangBtn) {
            if (Api.zhenqifangVoApi.isShowNpc()) {
                this._zhenqifangBtn.setGray(false);
                if (Api.zhenqifangVoApi.checkNpcMessage()) {
                    App.CommonUtil.addIconToBDOC(this._zhenqifangBtn);
                    var reddot = this._zhenqifangBtn.getChildByName("reddot");
                    reddot.x = 51;
                    reddot.y = 10;
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(this._zhenqifangBtn);
                }
            }
            else {
                this._zhenqifangBtn.setGray(true);
            }
        }
    };
    //场景
    MainUIHouseFuncBtnView.prototype.checkChangeBgState = function () {
        if (this._changeBgBtn) {
            if (Api.otherInfoVoApi.isHasSceneRedot()) {
                App.CommonUtil.addIconToBDOC(this._changeBgBtn);
                var reddot = this._changeBgBtn.getChildByName("reddot");
                reddot.x = 51;
                reddot.y = 10;
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._changeBgBtn);
            }
        }
    };
    //好友
    MainUIHouseFuncBtnView.prototype.checkFriendsState = function () {
        if (this._friendsBtn && Api.friendVoApi.isShowNpc()) {
            this._friendsBtn.setGray(false);
            if (Api.friendVoApi.isShowRedForEnter()) {
                App.CommonUtil.addIconToBDOC(this._friendsBtn);
                var reddot = this._friendsBtn.getChildByName("reddot");
                reddot.x = 51;
                reddot.y = 10;
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._friendsBtn);
            }
        }
    };
    MainUIHouseFuncBtnView.prototype.hide = function () {
        this.dispose();
    };
    MainUIHouseFuncBtnView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshBtn, this);
        TickManager.removeTick(this.tick, this);
        this._zhenqifangBtn = null;
        this._changeBgBtn = null;
        this._friendsBtn = null;
        this._btnList = [];
        this._bg = null;
        this._paramData = null;
        _super.prototype.dispose.call(this);
    };
    return MainUIHouseFuncBtnView;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=MainUIHouseFuncBtnView.js.map