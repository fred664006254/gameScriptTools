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
        var _this = _super.call(this) || this;
        _this._scrollview = null;
        return _this;
    }
    RuleInfoPopupView.prototype.initView = function () {
        var msg = this.param.data;
        var contanier = new BaseDisplayObjectContainer();
        var tf = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // let param = (new egret.HtmlTextParser).parse(msg);
        // tf.textFlow = param;
        tf.y = 3;
        tf.width = 510;
        tf.lineSpacing = 5;
        contanier.addChild(tf);
        contanier.height = tf.height + 6;
        var offY = 10;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, tf.width, 200 + offY + 30);
        var scrollList = ComponentManager.getScrollView(contanier, rect);
        // scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
        this._scrollview = scrollList;
        scrollList.setPosition((GameConfig.stageWidth - scrollList.width) / 2, 75 - 20);
        this.addChildToContainer(scrollList);
        // this.viewBg.addTouchTap(this.hide,this);
        // let arrow = BaseBitmap.create("popupview_rulearrow");
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, scrollList, [0,scrollList.height + 10]);
        // this.addChildToContainer(arrow);
        // let startY = arrow.y;
        // egret.Tween.get(arrow,{loop : true}).to({y : startY - 10}, 800).to({y : startY}, 800);
        // arrow.visible = scrollList.checkShowArrow();
        // this._arrow = arrow;
    };
    // private refreshChatByScroll():void
    // {
    // 	let view = this;
    // 	view._arrow.visible = view._scrollview.checkShowArrow();
    // }
    RuleInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    RuleInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["popupview_ruletitle", "popupview_rulearrow"]);
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
        return "popupview_ruletitle";
    };
    RuleInfoPopupView.prototype.getTitleStr = function () {
        return "";
    };
    RuleInfoPopupView.prototype.dispose = function () {
        this._scrollview = null;
        _super.prototype.dispose.call(this);
    };
    return RuleInfoPopupView;
}(PopupView));
__reflect(RuleInfoPopupView.prototype, "RuleInfoPopupView");
//# sourceMappingURL=RuleInfoPopupView.js.map