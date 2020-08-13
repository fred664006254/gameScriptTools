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
 * 	计策选择界面
 * @author 张朝阳
 * date 2018/10/15
 * @class AllianceWarSelectServantPopupView
 */
var AllianceWarSelectPlanPopupView = (function (_super) {
    __extends(AllianceWarSelectPlanPopupView, _super);
    function AllianceWarSelectPlanPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    AllianceWarSelectPlanPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.refreashData, this);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 645;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var planList = Config.AlliancewarCfg.getItemList();
        var rect = new egret.Rectangle(0, 0, bg.width - 15, bg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AllianceWarSelectPlanScrollItem, planList, rect);
        this._scrollList.setPosition(bg.x + 8, bg.y + 10);
        this.addChildToContainer(this._scrollList);
    };
    AllianceWarSelectPlanPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarSelectPlanPopupViewButtomTip"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width - 20, this.viewBg.y + this.viewBg.height + 10);
        this.addChild(buttomTip);
    };
    AllianceWarSelectPlanPopupView.prototype.refreashData = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
        var planList = Config.AlliancewarCfg.getItemList();
        this._scrollList.refreshData(planList);
    };
    /**
     * 备战期结束关闭界面
     */
    AllianceWarSelectPlanPopupView.prototype.tick = function () {
        var periodType = Api.allianceWarVoApi.getWarPeriod();
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AllianceWarSelectPlanPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg", "awused",
        ]);
    };
    AllianceWarSelectPlanPopupView.prototype.getTitleStr = function () {
        return "allianceWarSelectPlanPopupViewTitle";
    };
    AllianceWarSelectPlanPopupView.prototype.dispose = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.refreashData, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarSelectPlanPopupView;
}(PopupView));
__reflect(AllianceWarSelectPlanPopupView.prototype, "AllianceWarSelectPlanPopupView");
//# sourceMappingURL=AllianceWarSelectPlanPopupView.js.map