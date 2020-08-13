/**
 * 任务
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
var AcCarnivalNightTaskPopupView = (function (_super) {
    __extends(AcCarnivalNightTaskPopupView, _super);
    function AcCarnivalNightTaskPopupView() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        _this.code = null;
        _this.aid = null;
        _this.type = null;
        _this._itemCount = null;
        return _this;
    }
    AcCarnivalNightTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
            "acmoonlight_red-1",
            "collectflag",
        ]);
    };
    Object.defineProperty(AcCarnivalNightTaskPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCarnivalNightTaskPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    AcCarnivalNightTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM, this.checkTabRed, this);
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;
        // this.type = this.param.data.type;
        this.tabbarGroup.setSpace(5);
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        this.checkTabRed();
    };
    // protected getTabbarGroupX():number
    // {
    //     return 20;
    // }
    // protected getTabbarGroupY():number
    // {
    //     return 22;
    // }
    AcCarnivalNightTaskPopupView.prototype.checkTabRed = function () {
        if (this.vo.isShowTaskTab1Red()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowTaskTab2Red()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isShowTaskTab3Red()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcCarnivalNightTaskPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB_OLD;
    };
    AcCarnivalNightTaskPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acCarnivalNightTaskPopupViewTabTitle1",
            "acCarnivalNightTaskPopupViewTabTitle2",
            "acCarnivalNightTaskPopupViewTabTitle3",
        ];
    };
    AcCarnivalNightTaskPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcCarnivalNightTaskPopupView.prototype.setTabBarPosition = function () {
        //this.tabbarGroup.setSpace(12);
        var tabX = 0;
        var tabY = 0;
        tabX = this.viewBg.x + 48;
        tabY = this.viewBg.y + 95;
        tabY += this.getTabbarGroupY();
        ;
        this.tabbarGroup.setPosition(tabX, tabY);
    };
    // private refreshData(){
    // 	// let itemCount1 = this.vo.titleinfo[""+this.type]==null?0:this.vo.titleinfo[""+this.type];
    // 	// this._itemCount.text = LanguageManager.getlocal(this.getDefaultCn("acReignTitle_itemcount"+this.type),[String(itemCount1)]);
    // }
    AcCarnivalNightTaskPopupView.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM, this.checkTabRed, this);
        this._mainTaskHandKey = null;
        this.code = null;
        this.aid = null;
        this.type = null;
        this._itemCount = null;
        _super.prototype.dispose.call(this);
    };
    return AcCarnivalNightTaskPopupView;
}(PopupView));
__reflect(AcCarnivalNightTaskPopupView.prototype, "AcCarnivalNightTaskPopupView");
