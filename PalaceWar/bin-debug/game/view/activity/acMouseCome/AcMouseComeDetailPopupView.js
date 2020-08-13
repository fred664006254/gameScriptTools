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
* 鼠来如意 活动详情
* date 2020.6.1
* author ycg
* @name AcMouseComeDetailPopupView
*/
var AcMouseComeDetailPopupView = (function (_super) {
    __extends(AcMouseComeDetailPopupView, _super);
    function AcMouseComeDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AcMouseComeDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acMouseComeDetailPopupTitle", this.getTypeCode());
    };
    AcMouseComeDetailPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "acthrowarrowview_wifeskinbg", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1", "progress3", "progress3_bg").concat(list);
    };
    AcMouseComeDetailPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACMOUSECOME_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcMouseComeDetailPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcMouseComeDetailPopupView.prototype.getMyRankData = function () {
        if (this._rankData) {
            return this._rankData;
        }
        return null;
    };
    AcMouseComeDetailPopupView.prototype.initView = function () {
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
    AcMouseComeDetailPopupView.prototype.refreshView = function () {
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
    AcMouseComeDetailPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcMouseComeDetailPopupView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName4", this.getTypeCode()),
        ];
        return list;
    };
    AcMouseComeDetailPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcMouseComeDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcMouseComeDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcMouseComeDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMouseComeDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeDetailPopupView;
}(PopupView));
__reflect(AcMouseComeDetailPopupView.prototype, "AcMouseComeDetailPopupView");
//# sourceMappingURL=AcMouseComeDetailPopupView.js.map