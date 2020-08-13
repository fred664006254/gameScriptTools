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
 * 红颜技能
 * author dky
 * date 2017/11/18
 * @class WifeSkillPopupView
 */
var WifeSkillPopupView = (function (_super) {
    __extends(WifeSkillPopupView, _super);
    function WifeSkillPopupView() {
        var _this = _super.call(this) || this;
        _this._wifeId = null;
        return _this;
    }
    WifeSkillPopupView.prototype.getResourceList = function () {
        var resArray = _super.prototype.getResourceList.call(this);
        if (Api.switchVoApi.checkOpenWifeExSkill()) {
            resArray = resArray.concat(["wifeexskill_bg2", "wifeexskill_icon", "wifeexskill_iconbg", "wifeexskill_text2",
                "newinvitelistbg2", "wifestatus_namebg", "commonview_smalltitlebg",
                "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4", "wifeexskill_icon2"]);
        }
        return resArray;
    };
    WifeSkillPopupView.prototype.getTabbarTextArr = function () {
        var tabarray = ["wifeSkillPopupViewTitle"];
        var id = this.param.data.id;
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        if (cfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock()) {
            tabarray.push("wifeMultiSkillPopupTab2Name");
        }
        if (Api.switchVoApi.checkOpenWifeExSkill()) {
            if (cfg.servantId) {
                tabarray.push("wifeExSkill");
            }
        }
        return tabarray;
    };
    WifeSkillPopupView.prototype.changeTab = function () {
        var tabname = this.getClassName() + "Tab" + (this.selectedTabIndex + 1);
        var tabArray = this.getTabbarTextArr();
        if (tabArray[this.selectedTabIndex] == "wifeMultiSkillPopupTab2Name") {
            tabname = "WifeSkillPopupViewTab2";
        }
        else if (tabArray[this.selectedTabIndex] == "wifeExSkill") {
            tabname = "WifeSkillPopupViewTab3";
        }
        var tabveiwClass = egret.getDefinitionByName(tabname);
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x, this.container.y + this.getTabbarGroupY());
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
        if (this.tabViewData[this.selectedTabIndex]) {
            this.tabViewData[this.selectedTabIndex].x = this.getOffsetX();
        }
    };
    WifeSkillPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);
        this._wifeId = this.param.data.id;
        this.tabbarGroup.setSpace(0);
        var topBg = BaseBitmap.create("wifeview_skilltabbtn_bg");
        topBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2, 0);
        this.addChildToContainer(topBg);
        this.refreshView();
    };
    WifeSkillPopupView.prototype.getWifeId = function () {
        return this.param.data.id;
    };
    WifeSkillPopupView.prototype.refreshView = function () {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var isCanExchange = Api.switchVoApi.checkWifeExpExchangeOpen() && Api.wifeVoApi.hasTransformRed(this._wifeId) && Api.wifeVoApi.hasTransformRed2(this._wifeId);
        if (wifeVo.cfg.servantId) {
            if (Api.servantVoApi.getServantObj(String(wifeVo.cfg.servantId)) && (Api.wifeVoApi.isSkillCanLevelUp(this._wifeId) || isCanExchange)) {
                this.tabbarGroup.addRedPoint(0);
            }
            else {
                this.tabbarGroup.removeRedPoint(0);
            }
        }
        else {
            if (Api.wifeVoApi.isSkillCanLevelUp(this._wifeId) || isCanExchange) {
                this.tabbarGroup.addRedPoint(0);
            }
            else {
                this.tabbarGroup.removeRedPoint(0);
            }
        }
        if (wifeCfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock()) {
            if (Api.wifeVoApi.isSkill2CanLevelUp(this._wifeId) || isCanExchange) {
                this.tabbarGroup.addRedPoint(1);
            }
            else {
                this.tabbarGroup.removeRedPoint(1);
            }
        }
    };
    WifeSkillPopupView.prototype.getShowHeight = function () {
        return 816;
    };
    WifeSkillPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);
        this._wifeId = null;
        _super.prototype.dispose.call(this);
    };
    return WifeSkillPopupView;
}(PopupView));
__reflect(WifeSkillPopupView.prototype, "WifeSkillPopupView");
//# sourceMappingURL=WifeSkillPopupView.js.map