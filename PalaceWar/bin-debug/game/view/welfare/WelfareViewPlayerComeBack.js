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
var WelfareViewPlayerComeBack = (function (_super) {
    __extends(WelfareViewPlayerComeBack, _super);
    function WelfareViewPlayerComeBack() {
        return _super.call(this) || this;
    }
    WelfareViewPlayerComeBack.prototype.getTabbarTextArr = function () {
        return [
            "playercomebackTab1",
            "playercomebackTab2"
        ];
    };
    // 页签图名称
    WelfareViewPlayerComeBack.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB2;
    };
    WelfareViewPlayerComeBack.prototype.addTabbarGroupBg = function () {
        return true;
    };
    Object.defineProperty(WelfareViewPlayerComeBack.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewPlayerComeBack.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    WelfareViewPlayerComeBack.prototype.getTabbarGroupY = function () {
        return this.tabbarGroup.y + this.tabbarGroup.height;
    };
    Object.defineProperty(WelfareViewPlayerComeBack.prototype, "api", {
        get: function () {
            return Api.newrebackVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WelfareViewPlayerComeBack.prototype, "cfg", {
        get: function () {
            return Config.PlayercomebackCfg;
        },
        enumerable: true,
        configurable: true
    });
    // protected checkTabCondition(index:number):boolean{
    //     let view = this;
    //     if(index == 1 && !view.api.isInReturnTime()){
    //         App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebackcodetip13`));
    //         return false;
    //     }
    // }
    WelfareViewPlayerComeBack.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_REBACK_GETINFO, {});
        NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO, {});
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK, this.checkWelfareState, this);
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
            // if(i == 1 && !view.api.isInReturnTime()){
            // 	App.DisplayUtil.changeToGray(unit);
            // }
        }
        view.tabbarGroupBg.x = -5;
        view.tabbarGroupBg.y = this.bottomBg.y;
        view.bottomBg.visible = false;
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    WelfareViewPlayerComeBack.prototype.checkWelfareState = function () {
        if (this.api.getInviteTaskRedPoint()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    WelfareViewPlayerComeBack.prototype.setTabBarPosition = function () {
        var view = this;
        view.tabbarGroup.x = 0;
        view.tabbarGroup.y = this.bottomBg.y - 7;
    };
    WelfareViewPlayerComeBack.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playercomeback_btn_down", "playercomeback_btn", "newinvitelistbg1", "newinvitelistbg2", "newinvitelistbgkuang", "newinviterewardbox",
            "playercomebacklistbg", "newinvitetitlebg", "progress21_bg", "progress21", "shopview_itemtitle", "dailyrechargelistnamebg", "playercomebacknumorderbg", "qingyuanitemtitlebg"
        ]);
    };
    WelfareViewPlayerComeBack.prototype.tick = function () {
        var view = this;
        if (view && view.tabbarGroup) {
            if (view.api.secondRed()) {
                view.tabbarGroup.addRedPoint(1);
            }
            else {
                view.tabbarGroup.removeRedPoint(1);
            }
        }
    };
    WelfareViewPlayerComeBack.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(view.tick, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK, this.checkWelfareState, this);
        _super.prototype.dispose.call(this);
    };
    return WelfareViewPlayerComeBack;
}(WelfareViewTab));
__reflect(WelfareViewPlayerComeBack.prototype, "WelfareViewPlayerComeBack");
//# sourceMappingURL=WelfareViewPlayerComeBack.js.map