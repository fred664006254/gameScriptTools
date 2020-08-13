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
 * 红颜技能两个
 * author ycg
 * date 2019.10.23
 * @class WifeMultiSkillPopupView
 */
var WifeMultiSkillPopupView = (function (_super) {
    __extends(WifeMultiSkillPopupView, _super);
    function WifeMultiSkillPopupView() {
        var _this = _super.call(this) || this;
        _this._wifeId = null;
        return _this;
    }
    WifeMultiSkillPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);
        this._wifeId = this.param.data.id;
        this.tabbarGroup.setSpace(0);
        var topBg = BaseBitmap.create("wifeview_skilltabbtn_bg");
        topBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2, 0);
        this.addChildToContainer(topBg);
        this.refreshView();
    };
    WifeMultiSkillPopupView.prototype.refreshView = function () {
        var wifeApi = Api.wifeVoApi;
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        var isCanExchange = Api.switchVoApi.checkWifeExpExchangeOpen() && wifeApi.hasTransformRed(this._wifeId) && wifeApi.hasTransformRed2(this._wifeId);
        if (wifeVo.cfg.servantId) {
            if (Api.servantVoApi.getServantObj(String(wifeVo.cfg.servantId)) && (wifeApi.isSkillCanLevelUp(this._wifeId) || isCanExchange)) {
                this.tabbarGroup.addRedPoint(0);
            }
            else {
                this.tabbarGroup.removeRedPoint(0);
            }
        }
        else {
            if (wifeApi.isSkillCanLevelUp(this._wifeId) || isCanExchange) {
                this.tabbarGroup.addRedPoint(0);
            }
            else {
                this.tabbarGroup.removeRedPoint(0);
            }
        }
        if (wifeApi.isSkill2CanLevelUp(this._wifeId) || isCanExchange) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
    };
    WifeMultiSkillPopupView.prototype.getWifeId = function () {
        return this.param.data.id;
    };
    WifeMultiSkillPopupView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = this.viewBg.x + 11;
            var tabY = this.viewBg.y + 57;
            this.tabbarGroup.setPosition(tabX, tabY);
        }
    };
    WifeMultiSkillPopupView.prototype.getShowHeight = function () {
        if (Api.switchVoApi.checkWifeExpExchangeOpen()) {
            return 870;
        }
        return 810;
    };
    WifeMultiSkillPopupView.prototype.getShowWidth = function () {
        return 572;
    };
    WifeMultiSkillPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WifeMultiSkillPopupView.prototype.getTabbarTextArr = function () {
        return ["wifeMultiSkillPopupTab1Name",
            "wifeMultiSkillPopupTab2Name"
        ];
    };
    WifeMultiSkillPopupView.prototype.getTabbarName = function () {
        return [
            "wifeview_skilltabbtn",
            "wifeview_skilltabbtn"
        ];
    };
    WifeMultiSkillPopupView.prototype.getTitleStr = function () {
        return "wifeSkillPopupViewTitle";
    };
    WifeMultiSkillPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_skilltabbtn_bg",
            "wifeview_skilltabbtn_down",
            "wifeview_skilltabbtn",
            "skin_head_bg"
        ]);
    };
    WifeMultiSkillPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return WifeMultiSkillPopupView;
}(PopupView));
__reflect(WifeMultiSkillPopupView.prototype, "WifeMultiSkillPopupView");
//# sourceMappingURL=WifeMultiSkillPopupView.js.map