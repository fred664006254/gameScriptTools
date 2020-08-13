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
var DesktopPopupView = (function (_super) {
    __extends(DesktopPopupView, _super);
    function DesktopPopupView() {
        return _super.call(this) || this;
    }
    DesktopPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 322;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var txtBg = BaseBitmap.create("public_tc_bg02");
        txtBg.width = 380;
        txtBg.setPosition(bg.x + (bg.width - txtBg.width) / 2, bg.y + 25);
        this.addChildToContainer(txtBg);
        var txt = ComponentManager.getTextField(LanguageManager.getlocal("desktopConfirmDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.setPosition(txtBg.x + (txtBg.width - txt.width) / 2, txtBg.y + (txtBg.height - txt.height) / 2);
        this.addChildToContainer(txt);
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 514;
        bg2.height = 208;
        bg2.setPosition((this.viewBg.width - bg2.width) / 2, txtBg.y + txtBg.height + 25);
        this.addChildToContainer(bg2);
        var rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("desktopSuccessDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        rewardTxt.setPosition(bg2.x + 27, bg2.y + 22);
        this.addChildToContainer(rewardTxt);
        var iconList = GameData.getRewardItemIcons(Config.GameprojectCfg.rewardWB1, true);
        var l = iconList ? iconList.length : 0;
        for (var i = 0; i < l; i++) {
            var icon = iconList[i];
            icon.setPosition(bg2.x + 27 + (icon.width + 10) * i, bg2.y + 77);
            this.addChildToContainer(icon);
        }
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.confirmHandler, this);
        confirmBtn.setPosition(bg.x + (bg.width - confirmBtn.width) / 2, bg.y + bg.height + 20);
        this.addChildToContainer(confirmBtn);
    };
    DesktopPopupView.prototype.confirmHandler = function () {
        if (PlatformManager.checkIsTWBSp()) {
            // window.open("resource/other/一個官人七個妻.url");
            if (App.DeviceUtil.IsMobile()) {
                // this.showHand2();
            }
            else {
                this.showHand();
            }
        }
        else {
            PlatformManager.sendToDesktop(this.sendCallback, this);
            // this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD,{});
        }
    };
    DesktopPopupView.prototype.sendCallback = function (code) {
        if (String(code) == "0") {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD, {});
        }
        else if (String(code) == "-2") {
            //取消
            App.CommonUtil.showTip(LanguageManager.getlocal("desktopFailTip1"));
        }
        else {
            //失败
            App.CommonUtil.showTip(LanguageManager.getlocal("desktopFailTip2"));
        }
        // this.showHand();
    };
    DesktopPopupView.prototype.showHand = function () {
        if (!this._handContainer) {
            this._handContainer = new BaseDisplayObjectContainer();
            this.addChild(this._handContainer);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            this._handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(this.hideMask, this);
            var clickHand = BaseBitmap.create("twsshareDesc");
            // clickHand.skewY = 180;
            clickHand.x = GameConfig.stageWidth / 2 - clickHand.width / 2;
            clickHand.y = GameConfig.stageHeigth / 2 - clickHand.height / 2;
            this._handContainer.addChild(clickHand);
            // egret.Tween.get(clickHand,{loop:true})
            // 	.to({y:60}, 500)
            // 	.to({y:10}, 500)
            // let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("savegGameTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            // getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            // getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
            // getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
            // getTxt.lineSpacing = 10;
            // this._handContainer.addChild(getTxt);
            // egret.Tween.get(clickHand,{loop:true})
            // 		.to({scaleX: 0.9,scaleY:0.9}, 500)
            // 		.to({scaleX: 1,scaleY:1}, 500)
        }
        else {
            this._handContainer.visible = true;
        }
    };
    DesktopPopupView.prototype.showHand2 = function () {
        if (!this._handContainer) {
            this._handContainer = new BaseDisplayObjectContainer();
            this.addChild(this._handContainer);
            var maskBmp1 = BaseBitmap.create("public_9_viewmask");
            maskBmp1.width = GameConfig.stageWidth;
            maskBmp1.height = GameConfig.stageHeigth;
            // maskBmp1.touchEnabled = true;
            this._handContainer.addChild(maskBmp1);
            // maskBmp1.addTouchTap(this.hideMask,this);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            this._handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(this.hideMask, this);
            var icon = BaseBitmap.create("twshareicon");
            // clickHand.skewY = 180;
            icon.x = GameConfig.stageWidth / 2 - icon.width / 2;
            icon.y = 170;
            this._handContainer.addChild(icon);
            var iconName = ComponentManager.getTextField(LanguageManager.getlocal("twShareName"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            iconName.textAlign = TextFieldConst.ALIGH_CENTER;
            iconName.x = GameConfig.stageWidth / 2 - iconName.width / 2;
            iconName.y = icon.y + icon.height + 10;
            iconName.lineSpacing = 10;
            this._handContainer.addChild(iconName);
            var msg1 = ComponentManager.getTextField(LanguageManager.getlocal("twShareMsg1"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            msg1.x = GameConfig.stageWidth / 2 - msg1.width / 2;
            msg1.y = iconName.y + iconName.height + 100;
            this._handContainer.addChild(msg1);
            var msg2 = ComponentManager.getTextField(LanguageManager.getlocal("twShareMsg2"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            msg2.x = GameConfig.stageWidth / 2 - msg2.width / 2 - 30;
            msg2.y = msg1.y + msg1.height + 30;
            this._handContainer.addChild(msg2);
            var icon2 = BaseBitmap.create("twsshareDescicon");
            // clickHand.skewY = 180;
            icon2.x = msg2.x + msg2.width + 20;
            icon2.y = msg2.y - 10;
            this._handContainer.addChild(icon2);
            var msg3 = ComponentManager.getTextField(LanguageManager.getlocal("twShareMsg3"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            msg3.x = GameConfig.stageWidth / 2 - msg3.width / 2;
            msg3.y = msg2.y + msg2.height + 30;
            this._handContainer.addChild(msg3);
            var clickHand = BaseBitmap.create("studyatk_arrow");
            // clickHand.skewY = 180;
            clickHand.x = 300;
            clickHand.y = GameConfig.stageHeigth - clickHand.height - 30;
            this._handContainer.addChild(clickHand);
            egret.Tween.get(clickHand, { loop: true })
                .to({ y: GameConfig.stageHeigth - clickHand.height - 70 }, 500)
                .to({ y: GameConfig.stageHeigth - clickHand.height - 30 }, 500);
            // let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("savegGameTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            // getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            // getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
            // getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
            // getTxt.lineSpacing = 10;
            // this._handContainer.addChild(getTxt);
            // egret.Tween.get(clickHand,{loop:true})
            // 		.to({scaleX: 0.9,scaleY:0.9}, 500)
            // 		.to({scaleX: 1,scaleY:1}, 500)
        }
        else {
            this._handContainer.visible = true;
        }
    };
    DesktopPopupView.prototype.hideMask = function () {
        if (this._handContainer) {
            this._handContainer.visible = false;
        }
        // this.sendShareSuccess();
        this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD, {});
    };
    DesktopPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "twsshareDesc", "twsshareDescicon", "studyatk_arrow", "twshareicon",
        ]);
    };
    DesktopPopupView.prototype.dispose = function () {
        this._handContainer = null;
        _super.prototype.dispose.call(this);
    };
    DesktopPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD) {
                if (data.data.data.rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
                    this.hide();
                }
            }
        }
    };
    return DesktopPopupView;
}(PopupView));
__reflect(DesktopPopupView.prototype, "DesktopPopupView");
