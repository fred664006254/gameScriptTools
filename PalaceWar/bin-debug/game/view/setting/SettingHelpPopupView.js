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
var SettingHelpPopupView = (function (_super) {
    __extends(SettingHelpPopupView, _super);
    function SettingHelpPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(SettingHelpPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    SettingHelpPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wife_homechoose_btn"
        ]);
    };
    SettingHelpPopupView.prototype.getTitleStr = function () {
        return "settingHelpTitle";
    };
    SettingHelpPopupView.prototype.initView = function () {
        var text1;
        var text2;
        var url1;
        var url2;
        if (PlatformManager.checkIsRuSp()) {
            text1 = "settingHelpOpenFB";
            text2 = "settingHelpOpenVK";
            url1 = "https://www.facebook.com/com.heyyogame.gdru/";
            url2 = "https://vk.com/emperorandbeauties";
        }
        else {
            text1 = "settingHelpOpenFanGroup";
            text2 = "settingHelpOpenOfficialPage";
            url1 = "https://www.facebook.com/groups/1943936972334565/";
            url2 = "https://www.facebook.com/pg/com.heyyogame.gden/posts/?ref=page_internal";
        }
        var btn1 = ComponentManager.getButton("wife_homechoose_btn", text1, function () {
            PlatformManager.loadUrl(url1, null);
            // PlatformManager.loadUrl("https://page.heyyogame.com/gd/event/20191108/");
        }, this, null, 1);
        btn1.setPosition(this.viewBg.width / 2 - btn1.width / 2, 51);
        btn1.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn1);
        var btn2 = ComponentManager.getButton("wife_homechoose_btn", text2, function () {
            PlatformManager.loadUrl(url2, null);
        }, this, null, 1);
        btn2.setPosition(btn1.x, btn1.y + 85);
        btn2.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn2);
    };
    SettingHelpPopupView.prototype.getBgExtraHeight = function () {
        return 90;
    };
    return SettingHelpPopupView;
}(PopupView));
__reflect(SettingHelpPopupView.prototype, "SettingHelpPopupView");
//# sourceMappingURL=SettingHelpPopupView.js.map