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
 * 门客选择界面
 * @author 张朝阳
 * date 2018/10/15
 * @class AllianceWarSelectServantPopupView
 */
var AllianceWarSelectServantPopupView = (function (_super) {
    __extends(AllianceWarSelectServantPopupView, _super);
    function AllianceWarSelectServantPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._isAscendingSort = false;
        _this._fightBtn = null;
        _this._servantList = [];
        _this._cfgId = null;
        return _this;
    }
    AllianceWarSelectServantPopupView.prototype.showTip = function (evt) {
        if (!evt.data.ret) {
            this.hide();
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectServantTip"));
        this.hide();
    };
    AllianceWarSelectServantPopupView.prototype.showPlanTip = function (evt) {
        if (!evt.data.ret) {
            this.hide();
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
        this.hide();
    };
    AllianceWarSelectServantPopupView.prototype.showCancelTip = function (evt) {
        if (!evt.data.ret) {
            this.hide();
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
        this.hide();
    };
    AllianceWarSelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.showPlanTip, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_CANCELSERVANT, this.showCancelTip, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSERVANT, this.showTip, this);
        this._servantList = this.param.data.servantList;
        this._cfgId = this.param.data.cfgId;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 645;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        // let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var rect = new egret.Rectangle(0, 0, bg.width - 15, bg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AllianceWarSelectServantScrollItem, this._servantList, rect, { cfgId: this._cfgId });
        this._scrollList.setPosition(bg.x + 8, bg.y + 10);
        this.addChildToContainer(this._scrollList);
        this._fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "allianceWarSelectServantPopupViewFightDesc", this.fightSortClick, this);
        this._fightBtn.setPosition(bg.x + bg.width / 2 - this._fightBtn.width / 2, bg.y + bg.height + 20);
        this.addChildToContainer(this._fightBtn);
        this.fightSortClick();
    };
    /**
     * 升降序排列
     */
    AllianceWarSelectServantPopupView.prototype.fightSortClick = function () {
        if (this._isAscendingSort) {
            this._isAscendingSort = false;
            this._scrollList.refreshData(this.descendingSort(), { cfgId: this._cfgId });
            this._fightBtn.setText("allianceWarSelectServantPopupViewFightAsce");
        }
        else {
            this._isAscendingSort = true;
            this._scrollList.refreshData(this.ascendingSort(), { cfgId: this._cfgId });
            this._fightBtn.setText("allianceWarSelectServantPopupViewFightDesc");
        }
    };
    /**
     * 升序排列
     */
    AllianceWarSelectServantPopupView.prototype.ascendingSort = function () {
        // let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var dispatchArr = [];
        var sortArr = [];
        var useServant = null;
        for (var i = 0; i < this._servantList.length; i++) {
            var servantState = Api.allianceWarVoApi.getServantState(this._servantList[i].servantId);
            var myInfo = Api.allianceWarVoApi.getMyInfo();
            if (myInfo && myInfo.servant2 && myInfo.servant2 == this._servantList[i].servantId) {
                sortArr.push(this._servantList[i]);
                continue;
            }
            if (servantState && (myInfo && myInfo.servant != this._servantList[i].servantId || (!myInfo))) {
                dispatchArr.push(this._servantList[i]);
                continue;
            }
            if (servantState && myInfo && myInfo.servant == this._servantList[i].servantId) {
                useServant = this._servantList[i];
                continue;
            }
            sortArr.push(this._servantList[i]);
        }
        if (Api.switchVoApi.checkOpenExile()) {
            sortArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return b.fightValue - a.fightValue;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return b.fightValue - a.fightValue;
                }
            });
            dispatchArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return b.fightValue - a.fightValue;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return b.fightValue - a.fightValue;
                }
            });
        }
        if (useServant) {
            sortArr.unshift(useServant);
        }
        for (var i = 0; i < dispatchArr.length; i++) {
            sortArr.push(dispatchArr[i]);
        }
        return sortArr;
    };
    /**
     * 降序排列
     */
    AllianceWarSelectServantPopupView.prototype.descendingSort = function () {
        var servantInfo = [];
        var servantInfoVoList = this._servantList;
        var useServant = null;
        var dispatchArr = [];
        var sortArr = [];
        for (var i = 0; i < servantInfoVoList.length; i++) {
            servantInfo.push(servantInfoVoList[servantInfoVoList.length - 1 - i]);
        }
        for (var i = 0; i < servantInfo.length; i++) {
            var servantState = Api.allianceWarVoApi.getServantState(servantInfo[i].servantId);
            var myInfo = Api.allianceWarVoApi.getMyInfo();
            if (myInfo && myInfo.servant2 && myInfo.servant2 == servantInfo[i].servantId) {
                sortArr.push(servantInfo[i]);
                continue;
            }
            if (servantState && (myInfo && myInfo.servant != servantInfo[i].servantId || (!myInfo))) {
                dispatchArr.push(servantInfo[i]);
                continue;
            }
            if (servantState && myInfo && myInfo.servant == servantInfo[i].servantId) {
                useServant = servantInfo[i];
                continue;
            }
            sortArr.push(servantInfo[i]);
        }
        if (Api.switchVoApi.checkOpenExile()) {
            sortArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return a.fightValue - b.fightValue;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return a.fightValue - b.fightValue;
                }
            });
            dispatchArr.sort(function (a, b) {
                if (a.banishSt && (!b.banishSt)) {
                    return 1;
                }
                else if (a.banishSt && b.banishSt) {
                    return a.fightValue - b.fightValue;
                }
                else if ((!a.banishSt) && b.banishSt) {
                    return -1;
                }
                else if ((!a.banishSt) && (!b.banishSt)) {
                    return a.fightValue - b.fightValue;
                }
            });
        }
        if (useServant) {
            sortArr.unshift(useServant);
        }
        for (var i = 0; i < dispatchArr.length; i++) {
            sortArr.push(dispatchArr[i]);
        }
        return sortArr;
    };
    AllianceWarSelectServantPopupView.prototype.getShowHeight = function () {
        return 835;
    };
    /**
     * 备战期结束关闭界面
     */
    AllianceWarSelectServantPopupView.prototype.tick = function () {
        var periodType = Api.allianceWarVoApi.getWarPeriod();
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AllianceWarSelectServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg", "awservantstate1", "awservantstate2"
        ]);
    };
    AllianceWarSelectServantPopupView.prototype.getTitleStr = function () {
        return "allianceWarSelectServantPopupViewTitle";
    };
    AllianceWarSelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.showPlanTip, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_CANCELSERVANT, this.hide, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSERVANT, this.showTip, this);
        this._scrollList = null;
        this._isAscendingSort = false;
        this._fightBtn = null;
        this._servantList = [];
        this._cfgId = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarSelectServantPopupView;
}(PopupView));
__reflect(AllianceWarSelectServantPopupView.prototype, "AllianceWarSelectServantPopupView");
//# sourceMappingURL=AllianceWarSelectServantPopupView.js.map