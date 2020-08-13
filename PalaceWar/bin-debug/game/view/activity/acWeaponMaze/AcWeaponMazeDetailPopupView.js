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
 * 神器迷宫 活动详情
 * date 2020.4.24
 * author ycg
 * @name AcWeaponMazeDetailPopupView
 */
var AcWeaponMazeDetailPopupView = (function (_super) {
    __extends(AcWeaponMazeDetailPopupView, _super);
    function AcWeaponMazeDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	return {requestType:NetRequestConst.REQUEST_ACLOTUS_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    //     if (!data.ret){
    //         return;
    //     }
    //     this._rankData = data.data.data;
    // }
    // public getMyRankData():any{
    //     if (this._rankData){
    //         return this._rankData;
    //     }
    //     return null;
    // }
    AcWeaponMazeDetailPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcWeaponMazeDetailPopupView.prototype.initView = function () {
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
    AcWeaponMazeDetailPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetAchieveReward()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isCanGetRechargeReward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    Object.defineProperty(AcWeaponMazeDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeDetailPopupView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName4", this.getTypeCode()),
        ];
        return list;
    };
    AcWeaponMazeDetailPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcWeaponMazeDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        return this.code;
    };
    Object.defineProperty(AcWeaponMazeDetailPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    /**标题 */
    AcWeaponMazeDetailPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acWeaponMazeDetailPopupTitle", this.getTypeCode());
    };
    AcWeaponMazeDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcWeaponMazeDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "skin_detail_namebg", "progress5", "progress3_bg", "progress3",  "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            // "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "acthreekingdomrecharge_topbg", "acthreekingdomrecharge_topbgline", "acthrowarrowview_wifeskinbg", 
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3", "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1", "ackite_skintopbg", "ackite_skintopline",
            "skin_detail_namebg", "servantweaponshowbg", "specialview_commoni_namebg", "tailor_get_light",
            "titleupgradearrow",
        ]);
    };
    // protected getOffsetX():number
    // {
    // 	return 8;
    // }
    // protected getOffsetY():number
    // {	
    // 	return -6;
    // }
    AcWeaponMazeDetailPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponMazeDetailPopupView;
}(PopupView));
__reflect(AcWeaponMazeDetailPopupView.prototype, "AcWeaponMazeDetailPopupView");
//# sourceMappingURL=AcWeaponMazeDetailPopupView.js.map