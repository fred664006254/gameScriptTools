var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 情系良缘 活动详情
 * date 2020.7.21
 */
var AcGoodMatchDetailPopupView = /** @class */ (function (_super) {
    __extends(AcGoodMatchDetailPopupView, _super);
    function AcGoodMatchDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._isFirst = false;
        return _this;
    }
    AcGoodMatchDetailPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcGoodMatchDetailPopupView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHDATA, requestData: {
                activeId: view.vo.aidAndCode
            } };
    };
    AcGoodMatchDetailPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
        }
    };
    AcGoodMatchDetailPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        if (view.param && view.param.data.isFirst) {
            view._isFirst = true;
        }
        this.refreshView();
    };
    AcGoodMatchDetailPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.checkAchieveRed()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.checkServerRewardRed()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.checkExchangeRed()) {
            this.tabbarGroup.addRedPoint(3);
        }
        else {
            this.tabbarGroup.removeRedPoint(3);
        }
    };
    AcGoodMatchDetailPopupView.prototype.closeHandler = function () {
        if (this._isFirst) {
            this._isFirst = false;
            if (this.vo.getPoolRewardId() == 0 && this.vo.getProcessNum() == 0) {
                this.showSelectPoolTip();
            }
            else {
                this.hide();
            }
        }
        else {
            this.hide();
        }
    };
    AcGoodMatchDetailPopupView.prototype.showSelectPoolTip = function () {
        var _this = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTip1", this.getTypeCode())),
            touchMaskClose: true,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                _this.hide();
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "sysConfirm",
            cancelcallback: null
        });
    };
    Object.defineProperty(AcGoodMatchDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcGoodMatchDetailPopupView.prototype.getTabbarTextArr = function () {
        return [
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName4", this.getTypeCode()),
        ];
    };
    AcGoodMatchDetailPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    Object.defineProperty(AcGoodMatchDetailPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    /**标题 */
    AcGoodMatchDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acGoodMatchDetailPopupTitle", this.getTypeCode());
    };
    AcGoodMatchDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcGoodMatchDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3", "collectflag", "servant_star", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "ackite_processtitlebg-1",
            "shopview_corner", "acpowerfull_skinexchangebg", "specialview_commoni_namebg", "previewbg_wifeskin", "ac_skinoflibai_chargeitem_green",
            "ac_skinoflibai_chargeitem_red", "acgoodmatch_pooltitlebg", "acgoodmatch_topbg", "acgoodmatch_selected",
        ]);
    };
    AcGoodMatchDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._isFirst = false;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchDetailPopupView;
}(PopupView));
//# sourceMappingURL=AcGoodMatchDetailPopupView.js.map