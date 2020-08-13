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
var WxchatgiftView = (function (_super) {
    __extends(WxchatgiftView, _super);
    function WxchatgiftView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WxchatgiftView.prototype.initView = function () {
        this.getButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.getButtonClick, this);
        this.addChild(this.getButton);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO, this.updateStatus, this);
        this.updateStatus();
    };
    WxchatgiftView.prototype.getButtonClick = function () {
        if (Api.otherInfoVoApi.getWxchatgift() == 2) {
            // 已领取
            App.LogUtil.log("getButtonClick 已领取");
        }
        else if (Api.otherInfoVoApi.getWxchatgift() == 1) {
            // 可领取
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWXCHATWARD, {});
        }
        else {
            // 需要跳转
            App.LogUtil.log("getButtonClick 需要跳转");
            PlatformManager.wxchatgiftKeFu({
                showMessageCard: true,
                sendMessageTitle: LanguageManager.getlocal("wxchatgift_title"),
                sendMessageImg: ServerCfg.getWxGameResourceUrl() + "other/wxchatgift_image/wxchatgift_image.png"
            });
        }
    };
    WxchatgiftView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWXCHATWARD) {
                if (data.data.data && data.data.data.rewards) {
                    var rewards = GameData.formatRewardItem(data.data.data.rewards);
                    if (rewards && rewards.length > 0) {
                        App.CommonUtil.playRewardFlyAction(rewards);
                    }
                }
            }
            this.hide();
        }
    };
    WxchatgiftView.prototype.updateStatus = function () {
        if (Api.otherInfoVoApi.getWxchatgift() == 1) {
            App.CommonUtil.addIconToBDOC(this.getButton);
            this.getButton.setText("taskCollect");
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this.getButton);
            this.getButton.setText("wxchatgift_go");
        }
    };
    WxchatgiftView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    WxchatgiftView.prototype.getTitleBgName = function () {
        return "";
    };
    WxchatgiftView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("wxchatgift_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 660;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    WxchatgiftView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 490, this.viewBg.y + 40);
        this.closeBtn.setScale(0.8);
        this.getButton.x = this.viewBg.x + this.viewBg.width / 2 - this.getButton.width / 2;
        this.getButton.y = this.viewBg.y + 553 - this.getButton.height / 2;
    };
    WxchatgiftView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WxchatgiftView.prototype.getTitleStr = function () {
        return null;
    };
    WxchatgiftView.prototype.dispose = function () {
        this.getButton = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_OTHERINFO, this.updateStatus, this);
        _super.prototype.dispose.call(this);
    };
    return WxchatgiftView;
}(PopupView));
__reflect(WxchatgiftView.prototype, "WxchatgiftView");
