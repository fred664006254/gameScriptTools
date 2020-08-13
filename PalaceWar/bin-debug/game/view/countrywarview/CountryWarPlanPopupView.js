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
 * 	国战计策相关
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarPlanPopupView
 */
var CountryWarPlanPopupView = (function (_super) {
    __extends(CountryWarPlanPopupView, _super);
    function CountryWarPlanPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    CountryWarPlanPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, this.planSuccessHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE, this.shopHandle, this);
        var bg = BaseLoadBitmap.create("countrywarplanbg");
        bg.width = 548;
        bg.height = 156;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        this.addChildToContainer(bg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarPlanPopupViewTip"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        tipTxt.setPosition(bg.x + 15, bg.y + 15);
        tipTxt.width = 400;
        tipTxt.lineSpacing = 3;
        this.addChildToContainer(tipTxt);
        var shopBg = BaseBitmap.create("alliance_iconbg");
        shopBg.setPosition(bg.x + bg.width - shopBg.width - 20, bg.y + bg.height / 2 - shopBg.height / 2);
        this.addChildToContainer(shopBg);
        var shopBtn = ComponentManager.getButton("alliance_exicon", null, this.shopBtnClick, this);
        shopBtn.setPosition(shopBg.x + shopBg.width / 2 - shopBtn.width / 2 - 5, shopBg.y + shopBg.height / 2 - shopBtn.height / 2);
        this.addChildToContainer(shopBtn);
        var shopName = BaseBitmap.create("alliance_ex");
        shopName.setPosition(shopBg.x + shopBg.width / 2 - shopName.width / 2, shopBg.y + shopBg.height - 10);
        this.addChildToContainer(shopName);
        var planCfg = Config.CountrywarCfg.getSecretListCfg();
        var rect = new egret.Rectangle(0, 0, 530, 550);
        this._scrollList = ComponentManager.getScrollList(CountryWarPlanItem, planCfg, rect, { cityId: this.param.data.cityId });
        this._scrollList.setPosition(bg.x + bg.width / 2 - this._scrollList.width / 2, bg.y + bg.height + 10);
        this.addChildToContainer(this._scrollList);
    };
    CountryWarPlanPopupView.prototype.shopBtnClick = function () {
        if (Api.playerVoApi.getPlayerAllianceId() && Api.playerVoApi.getPlayerAllianceId() != 0) {
            this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, {});
            this.request(NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE, {});
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("countryWarPlanPopupViewNotAlliance"));
    };
    CountryWarPlanPopupView.prototype.shopHandle = function (event) {
        if (event && event.data && event.data.ret) {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEEXPOPUPVIEW);
        }
    };
    CountryWarPlanPopupView.prototype.planSuccessHandle = function (event) {
        if (event && event.data && event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("countryWarPlanSuccessTip"));
            this.hide();
        }
    };
    CountryWarPlanPopupView.prototype.refreashView = function (event) {
        if (event && event.data && event.data.ret) {
            var planCfg = Config.CountrywarCfg.getSecretListCfg();
            this._scrollList.refreshData(planCfg, { cityId: this.param.data.cityId });
        }
    };
    CountryWarPlanPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "alliance_exicon", "alliance_ex", "alliance_iconbg", "awused"
        ]);
    };
    CountryWarPlanPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    CountryWarPlanPopupView.prototype.getTitleStr = function () {
        return "countryWarPlanPopupViewTitle";
    };
    CountryWarPlanPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, this.planSuccessHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE, this.shopHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarPlanPopupView;
}(PopupView));
__reflect(CountryWarPlanPopupView.prototype, "CountryWarPlanPopupView");
//# sourceMappingURL=CountryWarPlanPopupView.js.map