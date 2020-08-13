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
 * 查看帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceShowInfoPopupView
 */
var AllianceDetailsPopupView = (function (_super) {
    __extends(AllianceDetailsPopupView, _super);
    function AllianceDetailsPopupView() {
        return _super.call(this) || this;
    }
    AllianceDetailsPopupView.prototype.initView = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 240;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var container = new BaseDisplayObjectContainer();
        // this.addChildToContainer(container);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 475, 210);
        // 中部可滑动区域
        var scrollView = ComponentManager.getScrollView(container, rect);
        scrollView.setPosition(45 + GameData.popupviewOffsetX, 40);
        this.addChildToContainer(scrollView);
        var msgStr = allianceVo.message;
        if (msgStr == "" || !allianceVo) {
            msgStr = LanguageManager.getlocal("allianceMessageTip");
        }
        var desStr = msgStr;
        var alphabg = BaseBitmap.create("public_alphabg");
        container.addChild(alphabg);
        var info1TF = ComponentManager.getTextField(desStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info1TF.y = 10;
        info1TF.width = 475;
        container.addChild(info1TF);
        var _Btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.oncloseHadler, this);
        _Btn.x = (bg.width - _Btn.width) * 0.5 + 24 + GameData.popupviewOffsetX;
        _Btn.y = bg.height + bg.y + 30;
        this.addChildToContainer(_Btn);
    };
    AllianceDetailsPopupView.prototype.oncloseHadler = function () {
        this.hide();
    };
    AllianceDetailsPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceDetailsPopupView;
}(PopupView));
__reflect(AllianceDetailsPopupView.prototype, "AllianceDetailsPopupView");
//# sourceMappingURL=AllianceDetailsPopupView.js.map