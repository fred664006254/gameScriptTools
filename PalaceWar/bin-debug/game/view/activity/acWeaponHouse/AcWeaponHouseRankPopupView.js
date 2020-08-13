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
* @name AcMouseComeDetailPopupView
*/
var AcWeaponHouseRankPopupView = (function (_super) {
    __extends(AcWeaponHouseRankPopupView, _super);
    function AcWeaponHouseRankPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        _this._allirank = null; //成员涨幅
        _this._myrank = null; //我的排名
        _this._rankList = null; //个人排行榜
        _this._amyrank = null; //军团我的排名
        _this._arankList = null; //军团排行榜
        _this._name = null; //昵称
        _this._aname = null; //军团昵称
        _this._amScore = null; //军团分数
        _this._allmask = null; //涨幅信息
        return _this;
    }
    AcWeaponHouseRankPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acWeaponHouse_rank_title", this.getTypeCode());
    };
    AcWeaponHouseRankPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "acthrowarrowview_wifeskinbg", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1", "progress3", "progress3_bg").concat(list);
    };
    AcWeaponHouseRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_WEAPONHOUSE_GETRANK, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcWeaponHouseRankPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        var rankData = data.data.data;
        this._allirank = rankData.allirank.rankList;
        this._allmask = rankData.allirank.myrank;
        this._myrank = rankData.rabbitRank.myrank;
        this._rankList = rankData.rabbitRank.rankList;
        this._amyrank = rankData.rabbitRank.amyrank;
        this._arankList = rankData.rabbitRank.arankList;
    };
    AcWeaponHouseRankPopupView.prototype.getMyRankData = function () {
        if (this._rankData) {
            return this._rankData;
        }
        return null;
    };
    /**
     * 涨幅
     */
    AcWeaponHouseRankPopupView.prototype.getAllirank = function () {
        if (this._allirank) {
            return this._allirank;
        }
        return null;
    };
    /**
     * 涨幅个人信息
     */
    AcWeaponHouseRankPopupView.prototype.getAllMask = function () {
        if (this._allmask) {
            return this._allmask;
        }
        return null;
    };
    /**
     * 我的排名
     */
    AcWeaponHouseRankPopupView.prototype.getMyrank = function () {
        if (this._myrank) {
            return this._myrank;
        }
        return null;
    };
    /**
     * 个人排行榜
     */
    AcWeaponHouseRankPopupView.prototype.getRankList = function () {
        if (this._rankList) {
            return this._rankList;
        }
        return null;
    };
    /**
     * 军团我的
     */
    AcWeaponHouseRankPopupView.prototype.getAmyrank = function () {
        if (this._amyrank) {
            return this._amyrank;
        }
        return null;
    };
    /**
     * 军团排行榜
     */
    AcWeaponHouseRankPopupView.prototype.getArankList = function () {
        if (this._arankList) {
            return this._arankList;
        }
        return null;
    };
    AcWeaponHouseRankPopupView.prototype.getMyname = function () {
        if (this._rankList) {
            for (var key in this._rankList) {
                if (this._rankList[key].iud == this._myrank.uid) {
                    this.name = this._rankList[key].name;
                }
            }
        }
    };
    AcWeaponHouseRankPopupView.prototype.initView = function () {
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
    AcWeaponHouseRankPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
    };
    AcWeaponHouseRankPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = this.viewBg.x + 45;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcWeaponHouseRankPopupView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acWeaponHouse_rankRewardOne_title", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponHouse_rankRewardAll_title", this.getTypeCode()),
        ];
        return list;
    };
    AcWeaponHouseRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcWeaponHouseRankPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcWeaponHouseRankPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcWeaponHouseRankPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHouseRankPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseRankPopupView;
}(PopupView));
__reflect(AcWeaponHouseRankPopupView.prototype, "AcWeaponHouseRankPopupView");
//# sourceMappingURL=AcWeaponHouseRankPopupView.js.map