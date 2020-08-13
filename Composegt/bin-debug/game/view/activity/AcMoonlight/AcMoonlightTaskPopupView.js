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
var AcMoonlightTaskPopupView = (function (_super) {
    __extends(AcMoonlightTaskPopupView, _super);
    function AcMoonlightTaskPopupView() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        _this.code = null;
        _this.aid = null;
        _this.type = null;
        _this._itemCount = null;
        return _this;
    }
    AcMoonlightTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    Object.defineProperty(AcMoonlightTaskPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMoonlightTaskPopupView.prototype.getShowHeight = function () {
        return 750;
    };
    AcMoonlightTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO, this.checkTabRed, this);
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;
        // this.type = this.param.data.type;
        var tabBar1 = this.tabbarGroup.getTabBar(1);
        var tabBar2 = this.tabbarGroup.getTabBar(2);
        this.checkTabRed();
        // egret.callLater(()=>{
        // 	this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
        // 		this,
        // 		this.container.x + tabBar1.x + tabBar1.width/2,
        // 		this.container.y + tabBar1.y + tabBar1.height/2, 
        // 		[tabBar1,tabBar2],
        // 		603, 
        // 		true, 
        // 		function() {
        // 			return true;
        // 		}, 
        // 		this
        // 	);
        // },this);
    };
    AcMoonlightTaskPopupView.prototype.checkTabRed = function () {
        if (this.vo.isShowTaskTab1Red) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowTaskTab2Red) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isShowTaskTab3Red) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcMoonlightTaskPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcMoonlightTaskPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acMoonlightTaskPopupViewTabTitle1",
            "acMoonlightTaskPopupViewTabTitle2",
            "acMoonlightTaskPopupViewTabTitle3",
        ];
    };
    AcMoonlightTaskPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcMoonlightTaskPopupView.prototype.setTabBarPosition = function () {
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
    AcMoonlightTaskPopupView.prototype.dispose = function () {
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO, this.checkTabRed, this);
        this._mainTaskHandKey = null;
        this.code = null;
        this.aid = null;
        this.type = null;
        this._itemCount = null;
        _super.prototype.dispose.call(this);
    };
    return AcMoonlightTaskPopupView;
}(PopupView));
__reflect(AcMoonlightTaskPopupView.prototype, "AcMoonlightTaskPopupView");
