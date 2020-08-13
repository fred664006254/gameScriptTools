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
var AttentionPopupView = (function (_super) {
    __extends(AttentionPopupView, _super);
    function AttentionPopupView() {
        return _super.call(this) || this;
    }
    AttentionPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 180;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var msgTF = ComponentManager.getTextField(LanguageManager.getlocal("attentionDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = bg.y + 20;
        // msgTF.lineSpacing = 5;
        this.addChildToContainer(msgTF);
        var rewardStr = Config.GameprojectCfg.rewardFKYLC1;
        var icons = GameData.getRewardItemIcons(rewardStr, true);
        var l = icons.length;
        var rewardContainer = new BaseDisplayObjectContainer();
        for (var i = 0; i < l; i++) {
            icons[i].setPosition((icons[i].width + 10) * i, 0);
            rewardContainer.addChild(icons[i]);
        }
        rewardContainer.setPosition(this.viewBg.x + (this.viewBg.width - rewardContainer.width) / 2, msgTF.y + msgTF.height + 10);
        this.addChildToContainer(rewardContainer);
        var str = "attentionBtn";
        if (PlatformManager.checkAttention()) {
            str = "taskCollect";
            if (Api.otherInfoVoApi.getFkFocusInfo()) {
                str = "candyGetAlready";
            }
        }
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, str, this.attentionHandler, this);
        // conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = this.getShowWidth() / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        if (PlatformManager.checkAttention()) {
            if (Api.otherInfoVoApi.getFkFocusInfo()) {
                conBtn.setEnable(false);
            }
        }
    };
    AttentionPopupView.prototype.attentionHandler = function () {
        if (PlatformManager.checkAttention()) {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD, {});
        }
        else {
            PlatformManager.attention(this.attentionCallback, this);
            this.hide();
        }
    };
    AttentionPopupView.prototype.attentionCallback = function () {
        this.request(NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD, {});
    };
    AttentionPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD) {
                if (data.data.data.rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
                    this.hide();
                }
            }
        }
    };
    return AttentionPopupView;
}(PopupView));
__reflect(AttentionPopupView.prototype, "AttentionPopupView");
