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
var AcLanternTaskPopupView = (function (_super) {
    __extends(AcLanternTaskPopupView, _super);
    function AcLanternTaskPopupView() {
        var _this = _super.call(this) || this;
        // private _mainTaskHandKey:string = null;
        _this.code = null;
        _this.aid = null;
        _this.type = null;
        _this._itemCount = null;
        return _this;
    }
    AcLanternTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
            "acmoonlight_red-1"
        ]);
    };
    Object.defineProperty(AcLanternTaskPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLanternTaskPopupView.prototype.getShowHeight = function () {
        return 750;
    };
    AcLanternTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO, this.checkTabRed, this);
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;
        // this.type = this.param.data.type;
        this.checkTabRed();
        this.selectedTabIndex = this.vo.getCurDay() - 1;
        this.tabbarGroup.selectedIndex = this.selectedTabIndex;
        // this.clickTabbarHandler({index:this.vo.getCurDay()-1});
        // this.tabbarGroup.selectedIndex = this.vo.getCurDay()-1;
        // this.selectedTabIndex = this.vo.getCurDay()-1;
        // this.tabbarGroup.selectedIndex = this.vo.getCurDay()-1;
    };
    // protected clickTabbarHandler(data:any):void
    // {
    // 	super.clickTabbarHandler(data);
    // }
    AcLanternTaskPopupView.prototype.checkTabRed = function () {
        if (this.vo.isShowTaskTabRed1) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowTaskTabRed2) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isShowTaskTabRed3) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
        if (this.vo.isShowTaskTabRed4) {
            this.tabbarGroup.addRedPoint(3);
        }
        else {
            this.tabbarGroup.removeRedPoint(3);
        }
    };
    AcLanternTaskPopupView.prototype.getTabbarName = function () {
        return "aclanternview_tabbtn";
    };
    AcLanternTaskPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acLanternTaskPopupViewTabTitle1",
            "acLanternTaskPopupViewTabTitle2",
            "acLanternTaskPopupViewTabTitle3",
            "acLanternTaskPopupViewTabTitle4",
        ];
    };
    AcLanternTaskPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcLanternTaskPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.setSpace(12);
        var tabX = 0;
        var tabY = 0;
        tabX = this.viewBg.x + 48;
        tabY = this.viewBg.y + 60;
        tabY += this.getTabbarGroupY();
        ;
        this.tabbarGroup.setPosition(tabX, tabY);
    };
    // private refreshData(){
    // 	// let itemCount1 = this.vo.titleinfo[""+this.type]==null?0:this.vo.titleinfo[""+this.type];
    // 	// this._itemCount.text = LanguageManager.getlocal(this.getDefaultCn("acReignTitle_itemcount"+this.type),[String(itemCount1)]);
    // }
    AcLanternTaskPopupView.prototype.dispose = function () {
        // App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO, this.checkTabRed, this);
        // this._mainTaskHandKey = null;
        this.code = null;
        this.aid = null;
        this.type = null;
        this._itemCount = null;
        _super.prototype.dispose.call(this);
    };
    return AcLanternTaskPopupView;
}(PopupView));
__reflect(AcLanternTaskPopupView.prototype, "AcLanternTaskPopupView");
