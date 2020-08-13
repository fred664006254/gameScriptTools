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
* 奖励详情
* date 2020.6.15
* author yangtao
* @name AcWeaponHouseRankShowPopupView
*/
var AcWeaponHouseRankShowPopupView = (function (_super) {
    __extends(AcWeaponHouseRankShowPopupView, _super);
    function AcWeaponHouseRankShowPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AcWeaponHouseRankShowPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acWeaponHouse_rank_title", this.getTypeCode());
    };
    AcWeaponHouseRankShowPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("rankbgs_4", "rankinglist_rankn1", "rankinglist_rankn2", "rankinglist_rankn3", "rankbgs_1", "rankbgs_2", "rank_line", "rankbgs_3", "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "acthrowarrowview_wifeskinbg", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1", "progress3", "progress3_bg").concat(list);
    };
    AcWeaponHouseRankShowPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = data.data.data;
    };
    AcWeaponHouseRankShowPopupView.prototype.getMyRankData = function () {
        if (this._rankData) {
            return this._rankData;
        }
        return null;
    };
    AcWeaponHouseRankShowPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        var tab = this.param.data.tab ? parseInt(this.param.data.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        this.refreshView();
    };
    AcWeaponHouseRankShowPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
    };
    AcWeaponHouseRankShowPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = this.viewBg.x + 45;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcWeaponHouseRankShowPopupView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acWeaponHouse_rankOneList_title", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponHouse_rankAllList_title", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponHouse_rankOneListUp_title", this.getTypeCode()),
        ];
        return list;
    };
    AcWeaponHouseRankShowPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcWeaponHouseRankShowPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcWeaponHouseRankShowPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcWeaponHouseRankShowPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankShowPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankShowPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankShowPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHouseRankShowPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseRankShowPopupView;
}(PopupView));
__reflect(AcWeaponHouseRankShowPopupView.prototype, "AcWeaponHouseRankShowPopupView");
//# sourceMappingURL=AcWeaponHouseRankShowPopupView.js.map