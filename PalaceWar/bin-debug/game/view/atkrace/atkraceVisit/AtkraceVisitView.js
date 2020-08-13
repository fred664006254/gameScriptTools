/**
 * 来访消息主界面
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
var AtkraceVisitView = (function (_super) {
    __extends(AtkraceVisitView, _super);
    function AtkraceVisitView() {
        return _super.call(this) || this;
    }
    //是否展示弹窗动效
    AtkraceVisitView.prototype.isShowOpenAni = function () {
        if (Api.rookieVoApi.isGuiding) {
            return false;
        }
        return true;
    };
    AtkraceVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    AtkraceVisitView.prototype.getOffsetY = function () {
        return -2;
    };
    AtkraceVisitView.prototype.getShowHeight = function () {
        return 760;
    };
    AtkraceVisitView.prototype.initView = function () {
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
    };
    AtkraceVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
        ];
    };
    AtkraceVisitView.prototype.doGuide = function () {
        this.hide();
    };
    AtkraceVisitView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        _super.prototype.dispose.call(this);
    };
    return AtkraceVisitView;
}(PopupView));
__reflect(AtkraceVisitView.prototype, "AtkraceVisitView");
//# sourceMappingURL=AtkraceVisitView.js.map