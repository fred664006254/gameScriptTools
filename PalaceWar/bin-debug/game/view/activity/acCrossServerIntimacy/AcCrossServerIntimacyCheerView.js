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
 * 跨服亲密助威
 * date 2020.6.5
 * author wxz
 * @class AcCrossServerIntimacyCheerView
 */
var AcCrossServerIntimacyCheerView = /** @class */ (function (_super) {
    __extends(AcCrossServerIntimacyCheerView, _super);
    function AcCrossServerIntimacyCheerView() {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        return _this;
    }
    AcCrossServerIntimacyCheerView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyCheerView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcCrossServerIntimacyCheerView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("crossserverintititle", this.getUiCode());
    };
    AcCrossServerIntimacyCheerView.prototype.getTitleStr = function () {
        return "";
    };
    AcCrossServerIntimacyCheerView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    // protected getCloseBtnName():string{
    //     return ButtonConst.COMMON_CLOSE_1;
    // }
    AcCrossServerIntimacyCheerView.prototype.getTabbarName = function () {
        return [
            App.CommonUtil.getResByCode("accrosspower_cheertabbtn1", this.getUiCode()),
            App.CommonUtil.getResByCode("accrossintimacy_cheertabbtn2", this.getUiCode()),
            App.CommonUtil.getResByCode("accrosspower_cheertabbtn3", this.getUiCode()),
            App.CommonUtil.getResByCode("accrosspower_cheertabbtn4", this.getUiCode()),
        ];
    };
    AcCrossServerIntimacyCheerView.prototype.getResourceList = function () {
        var needId = this.cfg.change.needNum.split("_")[1];
        return _super.prototype.getResourceList.call(this).concat([
            "mldetailtarbarbg-1", "accshegemony_shopitembg", "ackite_tasktitlebg-1", "accshegemony_ranktitlebg", "arena_bottom", "accrosspower_cheertabbtn1-" + this.getUiCode(), "accrosspower_cheertabbtn2-" + this.getUiCode(), "accrosspower_cheertabbtn3-" + this.getUiCode(), "accrosspower_cheertabbtn4-" + this.getUiCode(), "crossserverintititle-" + this.getUiCode(), "commonview_tabbar_bg",
            "accshegemony_rulebtn", "accrosspower_juanzhou-" + this.getUiCode(), "accrosspower_tasklock-" + this.getUiCode(), "accrosspower_skindetailbg-" + this.getUiCode(), "accrosspower_skindetailarrow-" + this.getUiCode(), "accrosspower_skindetailtitle-" + this.getUiCode(), "accrosspower_skininfobg-" + this.getUiCode(), "accrossintimacy_cheertabbtn2-" + this.getUiCode(), "itemicon" + needId,
            "accrosspower_flagicon-" + this.getUiCode(), "accrosspower_skinflag-" + this.code,
            "accshegemony_ranklistbg", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "accshegemonyprank1", "accshegemonyprank2", "accshegemonyprank3", "servant_star", "progress21", "progress21_bg", "accrosspower_tasktitlebg"
        ]);
    };
    AcCrossServerIntimacyCheerView.prototype.dipose = function () {
        this._tabHeight = null;
        this.tabbarGroup = null;
        this._selectedTabIndex = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    AcCrossServerIntimacyCheerView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_FLAGRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcCrossServerIntimacyCheerView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data && data.data.data.atkranks)
                this.api.setFlagRankInfo(data.data.data.atkranks);
        }
    };
    // 初始化tabbarGroup
    AcCrossServerIntimacyCheerView.prototype.initTabbarGroup = function () {
        var tabbarName = this.getTabbarName();
        if (tabbarName && tabbarName.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), ["", "", "", ""], this.clickTabbarHandler, this, null, null, null, true);
            this.tabbarGroup.setSpace(0);
            var tabBarX = (this instanceof PopupView) ? 30 : 6;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            // this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        }
    };
    AcCrossServerIntimacyCheerView.prototype.setTabBarPosition = function () {
        var view = this;
        if (view.tabbarGroup) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0, view.titleBg.height - 7]);
        }
    };
    Object.defineProperty(AcCrossServerIntimacyCheerView.prototype, "tabHeight", {
        get: function () {
            return this._tabHeight;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyCheerView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var tarbg = BaseBitmap.create("mldetailtarbarbg-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0, view.titleBg.height - 7]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);
        view._tabHeight = view.height - tarbg.y - tarbg.height + 2;
        this.bigframe.height = GameConfig.stageHeigth - tarbg.y - tarbg.height + 2;
        this.bigframe.y = 0;
        this.container.y = tarbg.y + tarbg.height - 2;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        this.changeTab();
        this.refreshView();
    };
    AcCrossServerIntimacyCheerView.prototype.refreshView = function () {
        if (this.tabbarGroup) {
            if (this.vo.checkExchangeRedDot()) {
                this.tabbarGroup.addRedPoint(0);
            }
            else {
                this.tabbarGroup.removeRedPoint(0);
            }
            if (this.vo.checkCheerUpRedDot()) {
                this.tabbarGroup.addRedPoint(1);
            }
            else {
                this.tabbarGroup.removeRedPoint(1);
            }
            if (this.vo.checkTaskRedDot()) {
                this.tabbarGroup.addRedPoint(2);
            }
            else {
                this.tabbarGroup.removeRedPoint(2);
            }
            if (this.vo.checkShopRedDot()) {
                this.tabbarGroup.addRedPoint(3);
            }
            else {
                this.tabbarGroup.removeRedPoint(3);
            }
        }
    };
    return AcCrossServerIntimacyCheerView;
}(CommonView));
//# sourceMappingURL=AcCrossServerIntimacyCheerView.js.map