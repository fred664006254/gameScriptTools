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
 * @author jiang
 * date 2018/10/15
 * @class AcCrossServerHegemonySelectServantPopupView
 */
var AcCrossServerHegemonySelectServantPopupView = (function (_super) {
    __extends(AcCrossServerHegemonySelectServantPopupView, _super);
    function AcCrossServerHegemonySelectServantPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._isAscendingSort = false;
        _this._fightBtn = null;
        _this._servantList = [];
        _this._cfgId = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonySelectServantPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonySelectServantPopupView.prototype.showTip = function (event) {
        if (!event || !event.data || !event.data.ret) {
            this.hide();
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectServantTip"));
        this.hide();
    };
    AcCrossServerHegemonySelectServantPopupView.prototype.showPlanTip = function (event) {
        if (!event || !event.data || !event.data.ret) {
            this.hide();
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
        this.hide();
    };
    AcCrossServerHegemonySelectServantPopupView.prototype.showCancelTip = function (event) {
        if (!event || !event.data || !event.data.ret) {
            this.hide();
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
        this.hide();
    };
    Object.defineProperty(AcCrossServerHegemonySelectServantPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonySelectServantPopupView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    AcCrossServerHegemonySelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.showPlanTip, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT, this.showCancelTip, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT, this.showTip, this);
        this._servantList = this.param.data.servantList;
        // console.log("this._servantList",this._servantList);
        this._cfgId = this.param.data.cfgId;
        // console.log(this.param.data);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 645;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        bg.visible = false;
        // let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var rect = new egret.Rectangle(0, 0, bg.width - 15, bg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AcCrossServerHegemonySelectServantScrollItem, this._servantList, rect, { cfgId: this._cfgId, aid: this.param.data.aid, code: this.param.data.code, matchId: this.param.data.matchId });
        this._scrollList.setPosition(bg.x + 8, bg.y + 10);
        this.addChildToContainer(this._scrollList);
        this._fightBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "allianceWarSelectServantPopupViewFightDesc", this.fightSortClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._fightBtn.setPosition(bg.x + bg.width / 2 - this._fightBtn.width / 2, bg.y + bg.height + 10);
        this.addChildToContainer(this._fightBtn);
        this.fightSortClick();
    };
    /**
     * 升降序排列
     */
    AcCrossServerHegemonySelectServantPopupView.prototype.fightSortClick = function () {
        if (this._isAscendingSort) {
            this._isAscendingSort = false;
            this._scrollList.refreshData(this.descendingSort(), { cfgId: this._cfgId, aid: this.param.data.aid, code: this.param.data.code, matchId: this.param.data.matchId });
            this._fightBtn.setText("allianceWarSelectServantPopupViewFightAsce");
        }
        else {
            this._isAscendingSort = true;
            this._scrollList.refreshData(this.ascendingSort(), { cfgId: this._cfgId, aid: this.param.data.aid, code: this.param.data.code, matchId: this.param.data.matchId });
            this._fightBtn.setText("allianceWarSelectServantPopupViewFightDesc");
        }
    };
    /**
     * 升序排列
     */
    AcCrossServerHegemonySelectServantPopupView.prototype.ascendingSort = function () {
        // let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
        var dispatchArr = [];
        var sortArr = [];
        var useServant = null;
        for (var i = 0; i < this._servantList.length; i++) {
            // console.log(this._servantList[i]);
            var servantState = this.vo.sinfo[this._servantList[i].servantId];
            ; //Api.allianceWarVoApi.getServantState(this._servantList[i].servantId);
            var myInfo = Api.crossServerHegemonyVoApi.getMyInfo();
            ; // Api.allianceWarVoApi.getMyInfo();
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
    AcCrossServerHegemonySelectServantPopupView.prototype.descendingSort = function () {
        var servantInfo = [];
        var servantInfoVoList = this._servantList;
        var useServant = null;
        var dispatchArr = [];
        var sortArr = [];
        for (var i = 0; i < servantInfoVoList.length; i++) {
            servantInfo.push(servantInfoVoList[servantInfoVoList.length - 1 - i]);
        }
        for (var i = 0; i < servantInfo.length; i++) {
            var servantState = this.vo.sinfo[servantInfo[i].servantId]; //Api.allianceWarVoApi.getServantState(servantInfo[i].servantId);
            var myInfo = Api.crossServerHegemonyVoApi.getMyInfo(); //Api.allianceWarVoApi.getMyInfo();
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
        if (useServant) {
            sortArr.unshift(useServant);
        }
        for (var i = 0; i < dispatchArr.length; i++) {
            sortArr.push(dispatchArr[i]);
        }
        return sortArr;
    };
    /**
     * 备战期结束关闭界面
     */
    AcCrossServerHegemonySelectServantPopupView.prototype.tick = function () {
        var periodType = this.vo.checkStatusByMatchId(Number(this.param.data.matchId)); //Api.allianceWarVoApi.getWarPeriod();
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AcCrossServerHegemonySelectServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg", "awservantstate1", "awservantstate2", "public_titlebg"
        ]);
    };
    AcCrossServerHegemonySelectServantPopupView.prototype.getTitleStr = function () {
        return "allianceWarSelectServantPopupViewTitle";
    };
    AcCrossServerHegemonySelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.showPlanTip, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT, this.hide, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT, this.showTip, this);
        this._scrollList = null;
        this._isAscendingSort = false;
        this._fightBtn = null;
        this._servantList = [];
        this._cfgId = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonySelectServantPopupView;
}(PopupView));
__reflect(AcCrossServerHegemonySelectServantPopupView.prototype, "AcCrossServerHegemonySelectServantPopupView");
//# sourceMappingURL=AcCrossServerHegemonySelectServantPopupView.js.map