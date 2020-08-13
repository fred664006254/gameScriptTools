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
 * 通用文字展示面板
 * author hyd
 * date 2019/10/15
 * @class CommonTextPopupView
 * 参数 ：title  msg
 *
 */
var CommonTextPopupView = (function (_super) {
    __extends(CommonTextPopupView, _super);
    function CommonTextPopupView() {
        var _this = _super.call(this) || this;
        _this._bgHeight = 0;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    CommonTextPopupView.prototype.initView = function () {
        var textRectWidth = 500;
        var textRectHeight = 500;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = textRectWidth + 30;
        bg.height = textRectHeight + 45;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var topBg = BaseBitmap.create("public_tc_bg03");
        topBg.width = textRectWidth + 20;
        topBg.height = textRectHeight + 20;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = bg.y + 13;
        this.addChildToContainer(topBg);
        var cor1 = BaseBitmap.create("public_tcdw_bg01");
        // cor1.skewX = 180;
        cor1.x = topBg.x;
        cor1.y = topBg.y;
        this.addChildToContainer(cor1);
        var cor2 = BaseBitmap.create("public_tcdw_bg02");
        cor2.x = topBg.x + topBg.width - cor2.width;
        cor2.y = topBg.y;
        this.addChildToContainer(cor2);
        this._bgHeight = bg.height;
        var messageStr = this.param.data.msg;
        var contanier = new BaseDisplayObjectContainer();
        var msgTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = textRectWidth;
        msgTF.setColor(TextFieldConst.COLOR_BROWN);
        msgTF.textAlign = TextFieldConst.ALIGH_LEFT;
        msgTF.y = 5;
        // msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
        // msgTF.y = bg.y + bg.height/2 - msgTF.height/2;
        msgTF.lineSpacing = 8;
        contanier.addChild(msgTF);
        contanier.height = msgTF.height + 6;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, msgTF.width, textRectHeight);
        //this.addChildToContainer(msgTF);
        var scrollList = ComponentManager.getScrollView(contanier, rect);
        this.addChildToContainer(scrollList);
        scrollList.setPosition(topBg.x + 10, topBg.y + 10);
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    CommonTextPopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    CommonTextPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    CommonTextPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    CommonTextPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    CommonTextPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    CommonTextPopupView.prototype.getTitleBgName = function () {
        return '';
    };
    CommonTextPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CommonTextPopupView;
}(PopupView));
__reflect(CommonTextPopupView.prototype, "CommonTextPopupView");
