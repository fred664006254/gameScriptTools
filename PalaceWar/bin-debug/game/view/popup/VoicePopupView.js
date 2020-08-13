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
var VoicePopupView = (function (_super) {
    __extends(VoicePopupView, _super);
    function VoicePopupView() {
        return _super.call(this) || this;
    }
    VoicePopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg44");
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var voiceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        voiceTxt.text = LanguageManager.getlocal("voiceDes");
        voiceTxt.x = 180 + GameData.popupviewOffsetX;
        voiceTxt.y = 110;
        this.addChildToContainer(voiceTxt);
        var nationalBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.clickRanomHandler, this);
        nationalBtn.x = 80 + GameData.popupviewOffsetX;
        nationalBtn.y = bg.y + bg.height + 20;
        nationalBtn.setText("national");
        this.addChildToContainer(nationalBtn);
        var cantoneseBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.clickRanomHandler2, this);
        cantoneseBtn.x = 330 + GameData.popupviewOffsetX;
        cantoneseBtn.y = bg.y + bg.height + 20;
        cantoneseBtn.setText("cantonese");
        this.addChildToContainer(cantoneseBtn);
        this.closeBtn.visible = false;
    };
    VoicePopupView.prototype.clickRanomHandler = function () {
        SoundManager.setVoiceOn(false);
        LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH, "false");
        this.hide();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SOUND_CATEGORY);
    };
    VoicePopupView.prototype.clickRanomHandler2 = function () {
        SoundManager.setVoiceOn(true);
        LocalStorageManager.set(LocalStorageConst.LOCAL_VIOICE_SWITCH, "true");
        this.hide();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SOUND_CATEGORY);
    };
    VoicePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return VoicePopupView;
}(PopupView));
__reflect(VoicePopupView.prototype, "VoicePopupView");
//# sourceMappingURL=VoicePopupView.js.map