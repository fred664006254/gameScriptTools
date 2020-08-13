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
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskRewardView
 */
var AllianceTaskRewardView = (function (_super) {
    __extends(AllianceTaskRewardView, _super);
    function AllianceTaskRewardView() {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this._scrollView2 = null;
        _this._curTabIdx = 0;
        return _this;
    }
    AllianceTaskRewardView.prototype.initView = function () {
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 605;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 53;
        this.addChildToContainer(bg1);
        var tabName = ["allianceBtnRewardType1", "allianceBtnRewardType2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(2);
        tabbarGroup.x = 40;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 20, bg1.height - 30);
        this._scrollView = ComponentManager.getScrollList(AllianceTaskRewardScrollItem, list, rect);
        this._scrollView.x = bg1.x + 10;
        this._scrollView.y = bg1.y + 15;
        this.addChildToContainer(this._scrollView);
        var list2 = Config.AlliancetaskCfg.getAllianceMonTaskIdList();
        this._scrollView2 = ComponentManager.getScrollList(AllianceTaskRewardScrollItem, list2, rect, 1);
        this._scrollView2.x = bg1.x + 10;
        this._scrollView2.y = bg1.y + 15;
        this.addChildToContainer(this._scrollView2);
        this._scrollView2.visible = false;
        var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipTxt.text = LanguageManager.getlocal("allianceBtnRewarDesc1");
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bg1.y + bg1.height + 45 - tipTxt.height / 2;
        this.addChildToContainer(tipTxt);
        this._tipTxt = tipTxt;
    };
    AllianceTaskRewardView.prototype.receiveData = function (data) {
    };
    AllianceTaskRewardView.prototype.getRequestData = function () {
        return null;
    };
    AllianceTaskRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress_type1_yellow2", "progress_type3_bg", "isover", "notover"
        ]);
    };
    AllianceTaskRewardView.prototype.getShowHeight = function () {
        return 820;
    };
    // protected setTabBarPosition():void
    // {
    // 	this.tabbarGroup.setSpace(15);
    // 	let tabX:number=0;
    // 	let tabY:number=0;
    // 	tabX=this.viewBg.x+43;
    // 	tabY=this.viewBg.y+60;
    // 	tabY+=this.getTabbarGroupY();
    // 	this.tabbarGroup.setPosition(tabX,tabY);
    // }
    // 页签图名称
    AllianceTaskRewardView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["allianceBtnRewardType1","allianceBtnRewardType2"];
    // }
    AllianceTaskRewardView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        if (this._curTabIdx == 1) {
            this._scrollView.visible = false;
            this._scrollView2.visible = true;
            this._tipTxt.text = LanguageManager.getlocal("allianceBtnRewarDesc2");
        }
        else {
            this._scrollView2.visible = false;
            this._scrollView.visible = true;
            this._tipTxt.text = LanguageManager.getlocal("allianceBtnRewarDesc1");
        }
        this._tipTxt.x = this.viewBg.width / 2 - this._tipTxt.width / 2;
        this._curTabIdx = params.index;
        // this.refreshRankList();
    };
    AllianceTaskRewardView.prototype.dispose = function () {
        this._scrollView = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskRewardView;
}(PopupView));
__reflect(AllianceTaskRewardView.prototype, "AllianceTaskRewardView");
