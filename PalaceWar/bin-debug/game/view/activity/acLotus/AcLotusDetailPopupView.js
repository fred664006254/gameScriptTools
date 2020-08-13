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
 * 兰亭荷花 活动详情
 * date 2020.4.14
 * author ycg
 * @name AcLotusDetailPopupView
 */
var AcLotusDetailPopupView = (function (_super) {
    __extends(AcLotusDetailPopupView, _super);
    function AcLotusDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AcLotusDetailPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACLOTUS_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcLotusDetailPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcLotusDetailPopupView.prototype.getMyRankData = function () {
        if (this._rankData) {
            return this._rankData;
        }
        return null;
    };
    AcLotusDetailPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcLotusDetailPopupView.prototype.initView = function () {
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
    AcLotusDetailPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetAchieveReward()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isCanExchange()) {
            this.tabbarGroup.addRedPoint(3);
        }
        else {
            this.tabbarGroup.removeRedPoint(3);
        }
    };
    Object.defineProperty(AcLotusDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcLotusDetailPopupView.prototype.getTabbarTextArr = function () {
        return [
            App.CommonUtil.getCnByCode("acLotusDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acLotusDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acLotusDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acLotusDetailTabName4", this.getTypeCode()),
        ];
    };
    AcLotusDetailPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcLotusDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcLotusDetailPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    /**标题 */
    AcLotusDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acLotusDetailPopupTitle", this.getTypeCode());
    };
    AcLotusDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcLotusDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3", "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "acthreekingdomrecharge_topbg", "acthreekingdomrecharge_topbgline", "acthrowarrowview_wifeskinbg", "ackite_processtitlebg-1", "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1",
        ]);
    };
    AcLotusDetailPopupView.prototype.getOffsetX = function () {
        return 8;
    };
    AcLotusDetailPopupView.prototype.getOffsetY = function () {
        return -6;
    };
    AcLotusDetailPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcLotusDetailPopupView;
}(PopupView));
__reflect(AcLotusDetailPopupView.prototype, "AcLotusDetailPopupView");
//# sourceMappingURL=AcLotusDetailPopupView.js.map