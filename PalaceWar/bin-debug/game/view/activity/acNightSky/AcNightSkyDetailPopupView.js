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
* 夜观天象活动详情
* date 2020.6.15
* author ycg
* @name AcNightSkyDetailPopupView
*/
var AcNightSkyDetailPopupView = (function (_super) {
    __extends(AcNightSkyDetailPopupView, _super);
    function AcNightSkyDetailPopupView() {
        return _super.call(this) || this;
    }
    AcNightSkyDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acNightSkyetailPopupTitle", this.getTypeCode());
    };
    AcNightSkyDetailPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "servant_star", "collectflag", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1").concat(list);
    };
    AcNightSkyDetailPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        this.refreshView();
    };
    AcNightSkyDetailPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetAchieveReward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCanExchange()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcNightSkyDetailPopupView.prototype.setTabBarPosition = function () {
        // this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcNightSkyDetailPopupView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acNightSkyDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acNightSkyDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acNightSkyDetailTabName3", this.getTypeCode()),
        ];
        return list;
    };
    AcNightSkyDetailPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcNightSkyDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcNightSkyDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcNightSkyDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNightSkyDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcNightSkyDetailPopupView;
}(PopupView));
__reflect(AcNightSkyDetailPopupView.prototype, "AcNightSkyDetailPopupView");
//# sourceMappingURL=AcNightSkyDetailPopupView.js.map