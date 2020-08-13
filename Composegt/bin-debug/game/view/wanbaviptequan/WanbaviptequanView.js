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
var WanbaviptequanView = (function (_super) {
    __extends(WanbaviptequanView, _super);
    function WanbaviptequanView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._fourPeopleInfoVoList = null;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText = null;
        return _this;
    }
    WanbaviptequanView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "strengthen_button", "activity_db_01", "wanbaviptequanbanner", "activity_charge_red",
            "wanbaviptequanicon0",
            "wanbaviptequanicon1",
            "wanbaviptequanicon2",
            "wanbaviptequanicon3",
            "wanbaviptequanicon4",
            "wanbaviptequanicon5",
            "wanbaviptequanicon6"
        ]);
    };
    WanbaviptequanView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD), this.getRewardHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.refreshVipLevel, this);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 735;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var banner = BaseBitmap.create("wanbaviptequanbanner");
        banner.x = this.viewBg.x + this.viewBg.width / 2 - banner.width / 2;
        banner.y = 13;
        this.addChildToContainer(banner);
        this.showList();
        var currentDesc = ComponentManager.getTextField(LanguageManager.getlocal("wanbaviptequanCurrentDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        currentDesc.x = banner.x + 90;
        currentDesc.y = banner.y + 77 - currentDesc.height / 2;
        this.addChildToContainer(currentDesc);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("wanbaviptequanDesc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.x = banner.x + 90;
        desc2.y = banner.y + 107 - desc2.height / 2;
        this.addChildToContainer(desc2);
        var vipIcon = BaseBitmap.create("wanbaviptequanicon" + (WanbaviptequanView.currentVip));
        vipIcon.x = currentDesc.x + currentDesc.width + 10;
        vipIcon.y = banner.y + 77 - vipIcon.height / 2;
        this.addChildToContainer(vipIcon);
        var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "gotocharge", this.rechargeBtnClick, this);
        rechargeBtn.setScale(0.7);
        rechargeBtn.x = banner.x + 453 - rechargeBtn.width / 2 * rechargeBtn.scaleX;
        rechargeBtn.y = banner.y + 107 - rechargeBtn.height / 2 * rechargeBtn.scaleY;
        this.addChildToContainer(rechargeBtn);
    };
    WanbaviptequanView.prototype.showList = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 515, 560);
        this._scrollList = ComponentManager.getScrollList(WanbaviptequanCell, [1, 2, 3, 4, 5, 6], rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(50, 165);
    };
    // 获得奖励
    WanbaviptequanView.prototype.getRewardHandler = function (event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD) {
            if (event.data.data.ret === 0) {
                var rewardList = GameData.formatRewardItem(event.data.data.data.rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
        this._scrollList.refreshData([1, 2, 3, 4, 5, 6]);
    };
    WanbaviptequanView.prototype.refreshVipLevel = function () {
        var _this = this;
        if (PlatformManager.checkIsWanbaSp() && Api.switchVoApi.checkOpenWanbaviptequan()) {
            if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                RSDKHelper.getWanbaviptequanLevel(function (vipLevel) {
                    WanbaviptequanView.currentVip = parseInt(vipLevel);
                    _this._scrollList.refreshData([1, 2, 3, 4, 5, 6]);
                });
            }
        }
    };
    WanbaviptequanView.prototype.rechargeBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    WanbaviptequanView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshVipLevel, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD), this.getRewardHandler, this);
        _super.prototype.dispose.call(this);
    };
    /** 当前vip */
    WanbaviptequanView.currentVip = 5;
    return WanbaviptequanView;
}(PopupView));
__reflect(WanbaviptequanView.prototype, "WanbaviptequanView");
