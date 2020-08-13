/**
 * 至劲 下载新包
 * author shaoliang
 * date 2018/03/15
 * @class SetPasswordPopupView
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
var DownloadPackagePopupView = (function (_super) {
    __extends(DownloadPackagePopupView, _super);
    function DownloadPackagePopupView() {
        return _super.call(this) || this;
    }
    DownloadPackagePopupView.prototype.getTitleStr = function () {
        return "downloadPackage";
    };
    DownloadPackagePopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    DownloadPackagePopupView.prototype.initView = function () {
        if (App.DeviceUtil.isIOS() == false) {
            this.initViewAndroid();
        }
        else {
            this.initViewIos();
        }
    };
    DownloadPackagePopupView.prototype.initViewIos = function () {
        var bg2 = BaseBitmap.create("public_9_bg4");
        bg2.width = 520;
        bg2.height = 240;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = 10;
        this.addChildToContainer(bg2);
        var msgTF2 = ComponentManager.getTextField(LanguageManager.getlocal("copyUrlDesc2", [this.getDownloadUrl()]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF2.width = 480;
        msgTF2.setColor(TextFieldConst.COLOR_BLACK);
        msgTF2.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF2.x = this.viewBg.x + this.viewBg.width / 2 - msgTF2.width / 2;
        msgTF2.y = bg2.y + bg2.height / 2 - msgTF2.height / 2 - 20;
        msgTF2.lineSpacing = 10;
        this.addChildToContainer(msgTF2);
        var copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "copyUrl", this.clickCopyHandler, this);
        copyBtn.setColor(TextFieldConst.COLOR_BLACK);
        copyBtn.x = bg2.x + bg2.width / 2 - copyBtn.width / 2;
        copyBtn.y = bg2.y + bg2.height + 20;
        this.addChildToContainer(copyBtn);
    };
    DownloadPackagePopupView.prototype.initViewAndroid = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 120;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var msgTF = ComponentManager.getTextField(LanguageManager.getlocal("downloadPackageDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = bg.y + bg.height / 2 - msgTF.height / 2;
        msgTF.lineSpacing = 10;
        this.addChildToContainer(msgTF);
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "downloadPackage", this.clickConHandler, this);
        conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = bg.x + bg.width / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        var bg2 = BaseBitmap.create("public_9_bg4");
        bg2.width = 520;
        bg2.height = 240;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg2.y = conBtn.y + 80;
        this.addChildToContainer(bg2);
        var msgTF2 = ComponentManager.getTextField(LanguageManager.getlocal("copyUrlDesc", [this.getDownloadUrl()]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF2.width = 480;
        msgTF2.setColor(TextFieldConst.COLOR_BLACK);
        msgTF2.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF2.x = this.viewBg.x + this.viewBg.width / 2 - msgTF2.width / 2;
        msgTF2.y = bg2.y + bg2.height / 2 - msgTF2.height / 2 - 20;
        msgTF2.lineSpacing = 10;
        this.addChildToContainer(msgTF2);
        var copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "copyUrl", this.clickCopyHandler, this);
        copyBtn.setColor(TextFieldConst.COLOR_BLACK);
        copyBtn.x = bg.x + bg.width / 2 - copyBtn.width / 2;
        copyBtn.y = bg2.y + bg2.height + 20;
        this.addChildToContainer(copyBtn);
    };
    DownloadPackagePopupView.prototype.clickConHandler = function (data) {
        if (App.DeviceUtil.IsHtml5()) {
            window.open(this.getDownloadUrl());
        }
        // this.hide();		
    };
    DownloadPackagePopupView.prototype.clickCopyHandler = function (data) {
        var str = this.getDownloadUrl();
        var input = document.createElement("input");
        input.value = str;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        App.CommonUtil.showTip(LanguageManager.getlocal("copyUrlSuccessed"));
    };
    DownloadPackagePopupView.prototype.getDownloadUrl = function () {
        var str;
        if (App.DeviceUtil.isIOS() == false) {
            str = ("http://yxfile.gowan8.com/apk/lyjd/zjwl_lyjd_ly_gwhf.apk");
        }
        else {
            str = ("https://itunes.apple.com/cn/app/id1330534234");
        }
        return str;
    };
    DownloadPackagePopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    return DownloadPackagePopupView;
}(PopupView));
__reflect(DownloadPackagePopupView.prototype, "DownloadPackagePopupView");
//# sourceMappingURL=DownloadPackagePopupView.js.map