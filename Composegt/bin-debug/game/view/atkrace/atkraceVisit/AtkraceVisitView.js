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
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    AtkraceVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
            "playerview_centerinfobg"
        ]);
    };
    // protected isHaveTabBg():boolean
    // {
    // 	return true;
    // }
    AtkraceVisitView.prototype.getShowHeight = function () {
        return 860;
    };
    AtkraceVisitView.prototype.initView = function () {
        var _this = this;
        this.tabbarGroup.setSpace(5);
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        egret.callLater(function () {
            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, _this.container.x + tabBar1.x + tabBar1.width / 2, _this.container.y + tabBar1.y + tabBar1.height / 2, [tabBar1, tabBar2], 603, true, function () {
                return true;
            }, _this);
        }, this);
    };
    AtkraceVisitView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AtkraceVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
        ];
    };
    // protected setTabBarPosition():void
    // {
    // 	this.tabbarGroup.setSpace(15);
    // 	let tabX:number=0;
    // 	let tabY:number=0;
    // 	tabX=this.viewBg.x+43;
    // 	tabY=this.viewBg.y+60;
    // 	tabY+=this.getTabbarGroupY();;
    // 	this.tabbarGroup.setPosition(tabX,tabY);
    // }
    AtkraceVisitView.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceVisitView;
}(PopupView));
__reflect(AtkraceVisitView.prototype, "AtkraceVisitView");
