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
 * 门客出海回归弹框
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantExileServantBackPopupView
 */
var ServantExileServantBackPopupView = (function (_super) {
    __extends(ServantExileServantBackPopupView, _super);
    function ServantExileServantBackPopupView() {
        return _super.call(this) || this;
    }
    ServantExileServantBackPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 174;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var messageTF = ComponentManager.getTextField(this.param.data.message, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        messageTF.width = 460;
        messageTF.textAlign = egret.HorizontalAlign.CENTER;
        messageTF.setPosition(bg.x + bg.width / 2 - messageTF.width / 2, bg.y + bg.height / 2 - messageTF.height / 2);
        this.addChildToContainer(messageTF);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        btn.setPosition(this.viewBg.x + this.viewBg.width / 2 - btn.width / 2, bg.y + bg.height + 25);
        this.addChildToContainer(btn);
    };
    ServantExileServantBackPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    ServantExileServantBackPopupView.prototype.getTitleStr = function () {
        return 'servantExileServantBackPopupViewTitle';
    };
    ServantExileServantBackPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ServantExileServantBackPopupView;
}(PopupView));
__reflect(ServantExileServantBackPopupView.prototype, "ServantExileServantBackPopupView");
//# sourceMappingURL=ServantExileServantBackPopupView.js.map