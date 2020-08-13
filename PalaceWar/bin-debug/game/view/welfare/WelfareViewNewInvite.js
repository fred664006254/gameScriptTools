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
var WelfareViewNewInvite = (function (_super) {
    __extends(WelfareViewNewInvite, _super);
    function WelfareViewNewInvite() {
        return _super.call(this) || this;
    }
    WelfareViewNewInvite.prototype.getTabbarTextArr = function () {
        return [
            "newinviteTab1",
            "newinviteTab2"
        ];
    };
    // 页签图名称
    WelfareViewNewInvite.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB2;
    };
    WelfareViewNewInvite.prototype.addTabbarGroupBg = function () {
        return true;
    };
    Object.defineProperty(WelfareViewNewInvite.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewNewInvite.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    WelfareViewNewInvite.prototype.getTabbarGroupY = function () {
        return this.tabbarGroup.y + this.tabbarGroup.height;
    };
    Object.defineProperty(WelfareViewNewInvite.prototype, "api", {
        get: function () {
            return Api.newinviteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WelfareViewNewInvite.prototype, "cfg", {
        get: function () {
            return Config.Invitefriend2Cfg;
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewNewInvite.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_NEWINVITE_GETINFO, {});
        NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO, {});
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE, this.checkWelfareState, this);
        var temW = 491;
        var temH = this.bottomBg.height + this.bottomBg.y;
        // let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        // view.height = baseview.tabHeight;
        // view.width = baseview.tabWidth;
        view.initTabbarGroup();
        var tabArr = view.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            view.changeTab();
        }
        view.tabbarGroup.setColor(0xe1ba86, 0x472c26);
        for (var i = 0; i < 2; ++i) {
            var unit = view.tabbarGroup.getTabBar(i);
            if (unit) {
                unit.x = 150 * i;
            }
        }
        view.tabbarGroupBg.x = -5;
        view.tabbarGroupBg.y = this.bottomBg.y;
        view.bottomBg.visible = false;
    };
    WelfareViewNewInvite.prototype.checkWelfareState = function () {
        if (this.api.getInviteTaskRedPoint() || this.api.getInvitePowerRedPoint()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    WelfareViewNewInvite.prototype.setTabBarPosition = function () {
        var view = this;
        view.tabbarGroup.x = 0;
        view.tabbarGroup.y = this.bottomBg.y - 7;
    };
    WelfareViewNewInvite.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "newinvite_btn_down", "newinvite_btn", "newinvitelistbg1", "newinvitelistbg2", "newinvitelistbgkuang", "newinviterewardbox",
            "newinvitestate1", "newinvitetitlebg", "progress21_bg", "progress21", "shopview_itemtitle", "dailyrechargelistnamebg"
        ]);
    };
    WelfareViewNewInvite.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE, this.checkWelfareState, this);
        _super.prototype.dispose.call(this);
    };
    return WelfareViewNewInvite;
}(WelfareViewTab));
__reflect(WelfareViewNewInvite.prototype, "WelfareViewNewInvite");
//# sourceMappingURL=WelfareViewNewInvite.js.map