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
var AcBattileGroundVisitView = (function (_super) {
    __extends(AcBattileGroundVisitView, _super);
    function AcBattileGroundVisitView() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    AcBattileGroundVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    // 页签图名称
    AcBattileGroundVisitView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcBattileGroundVisitView.prototype.getTitleStr = function () {
        return "acBattileGroundVisit-1";
    };
    AcBattileGroundVisitView.prototype.getShowHeight = function () {
        return 780;
    };
    AcBattileGroundVisitView.prototype.initView = function () {
        var _this = this;
        this.tabbarGroup.setSpace(5);
        // this.tabbarGroup.x = this.viewBg.x + 45;
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        egret.callLater(function () {
            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, _this.container.x + tabBar1.x + tabBar1.width / 2, _this.container.y + tabBar1.y + tabBar1.height / 2, [tabBar1, tabBar2], 603, true, function () {
                return true;
            }, _this);
        }, this);
    };
    AcBattileGroundVisitView.prototype.getTabbarGroupX = function () {
        return 10;
    };
    AcBattileGroundVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
        ];
    };
    AcBattileGroundVisitView.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattileGroundVisitView;
}(PopupView));
__reflect(AcBattileGroundVisitView.prototype, "AcBattileGroundVisitView");
