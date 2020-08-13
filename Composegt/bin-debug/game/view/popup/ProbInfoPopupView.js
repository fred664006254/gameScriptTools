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
 * 概率说明小弹板
 * author jiangliuyang
 * date 2018/9/13
 * @class ProbInfoPopupView
 */
var ProbInfoPopupView = (function (_super) {
    __extends(ProbInfoPopupView, _super);
    function ProbInfoPopupView() {
        return _super.call(this) || this;
    }
    ProbInfoPopupView.prototype.initView = function () {
        var msg = this.param.data;
        var contanier = new BaseDisplayObjectContainer();
        var tf = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        tf.y = 3;
        tf.width = 510;
        tf.lineSpacing = 5;
        contanier.addChild(tf);
        contanier.height = tf.height + 6;
        var offY = 10;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, tf.width, 200 + offY + 5);
        var scrollList = ComponentManager.getScrollView(contanier, rect);
        this.addChildToContainer(scrollList);
        scrollList.setPosition((GameConfig.stageWidth - scrollList.width) / 2, 75 - offY);
        // this.viewBg.addTouchTap(this.hide,this);
    };
    ProbInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    // protected getResourceList():string[]
    // {
    // 	return super.getResourceList().concat(["btn_dailyboss_guize"]);
    // }
    ProbInfoPopupView.prototype.getBgName = function () {
        return "public_rule_bg";
    };
    ProbInfoPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    ProbInfoPopupView.prototype.getShowWidth = function () {
        return 594;
    };
    ProbInfoPopupView.prototype.getTitleBgName = function () {
        return "probinfopopupview_title";
    };
    ProbInfoPopupView.prototype.getTitleStr = function () {
        return "";
    };
    ProbInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ProbInfoPopupView;
}(PopupView));
__reflect(ProbInfoPopupView.prototype, "ProbInfoPopupView");
