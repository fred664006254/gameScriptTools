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
 * 清风纸鸢 活动详情
 * date 2020.4.1
 * author ycg
 * @name AcKiteDetailPopupView
 */
var AcKiteDetailPopupView = (function (_super) {
    __extends(AcKiteDetailPopupView, _super);
    function AcKiteDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AcKiteDetailPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACKITE_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcKiteDetailPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcKiteDetailPopupView.prototype.getMyRankData = function () {
        if (this._rankData) {
            return this._rankData;
        }
        return null;
    };
    AcKiteDetailPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcKiteDetailPopupView.prototype.initView = function () {
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
    AcKiteDetailPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isHaveBoxRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isHaveTaskRedDot()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    Object.defineProperty(AcKiteDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteDetailPopupView.prototype.getTabbarTextArr = function () {
        return [
            App.CommonUtil.getCnByCode("acKiteDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acKiteDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acKiteDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acKiteDetailTabName4", this.getTypeCode()),
        ];
    };
    AcKiteDetailPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcKiteDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcKiteDetailPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    /**标题 */
    AcKiteDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acKiteDetailPopupTitle", this.getTypeCode());
    };
    AcKiteDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    // protected getShowWidth():number
    // {
    // 	return 580;
    // }
    AcKiteDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3", "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "acthreekingdomrecharge_topbg", "acthreekingdomrecharge_topbgline",
        ]);
    };
    AcKiteDetailPopupView.prototype.getOffsetX = function () {
        return 8;
    };
    AcKiteDetailPopupView.prototype.getOffsetY = function () {
        return -6;
    };
    AcKiteDetailPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcKiteDetailPopupView;
}(PopupView));
__reflect(AcKiteDetailPopupView.prototype, "AcKiteDetailPopupView");
//# sourceMappingURL=AcKiteDetailPopupView.js.map