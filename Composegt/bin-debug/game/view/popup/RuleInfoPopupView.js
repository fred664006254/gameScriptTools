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
 * 规则说明小弹板
 * author dmj
 * date 2017/9/28
 * @class RuleInfoPopupView
 */
var RuleInfoPopupView = (function (_super) {
    __extends(RuleInfoPopupView, _super);
    function RuleInfoPopupView() {
        return _super.call(this) || this;
    }
    // "bookroomProbInfo":
    RuleInfoPopupView.prototype.initView = function () {
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
    RuleInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    RuleInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["btn_dailyboss_guize"]);
    };
    RuleInfoPopupView.prototype.getBgName = function () {
        return "public_rule_bg";
    };
    RuleInfoPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    RuleInfoPopupView.prototype.getShowWidth = function () {
        return 594;
    };
    RuleInfoPopupView.prototype.getTitleBgName = function () {
        return "btn_dailyboss_guize";
    };
    RuleInfoPopupView.prototype.getTitleStr = function () {
        return "";
    };
    RuleInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return RuleInfoPopupView;
}(PopupView));
__reflect(RuleInfoPopupView.prototype, "RuleInfoPopupView");
