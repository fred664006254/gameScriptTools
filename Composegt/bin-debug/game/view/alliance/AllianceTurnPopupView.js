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
 * 成员列表
 * author dky
 * date 2017/11/30
 * @class AllianceTurnPopupView
 */
var AllianceTurnPopupView = (function (_super) {
    __extends(AllianceTurnPopupView, _super);
    // private _punishRewardList: any = {};
    function AllianceTurnPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        // private _applyData :any;
        _this._index = 0;
        return _this;
    }
    AllianceTurnPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_TRANSFER, this.doApply, this);
        // this._rankData = this.param.data.acData;
        this._allianceVo = Api.allianceVoApi.getAllianceVo();
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 530;
        bg1.height = 544;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 60;
        this.addChildToContainer(bg1);
        var numStr = LanguageManager.getlocal("alliance_wealth", [this._allianceVo.wealth.toString()]);
        var memberText = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        memberText.x = 50;
        memberText.y = 20;
        this.addChildToContainer(memberText);
        var costStr = LanguageManager.getlocal("alliance_turnCost", ["10000"]);
        var costText = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        costText.x = memberText.x;
        costText.y = bg1.y + bg1.height + 10;
        this.addChildToContainer(costText);
        var obStr = LanguageManager.getlocal("alliance_turnObject");
        var obText = ComponentManager.getTextField(obStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        obText.x = memberText.x;
        obText.y = costText.y + costText.height + 10;
        this.addChildToContainer(obText);
        // let applyData = Api.allianceVoApi.getMyAllianceVo().apply;
        var dataList = Api.allianceVoApi.getAllianceTurnVoList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 20, bg1.height - 20);
        this._scrollList = ComponentManager.getScrollList(AllianceTurnScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
        this._scrollList.x = bg1.x + 10;
        this._scrollList.y = bg1.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceTurnTip"));
    };
    AllianceTurnPopupView.prototype.refuseAllHandler = function () {
        if (!this._scrollList.getItemByIndex(0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY, {});
    };
    /**
     * 获取
     */
    AllianceTurnPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETMEMBER, requestData: {} };
    };
    //请求回调
    AllianceTurnPopupView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.data.allianceFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        if (data.data.data.allianceFlag == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
            return;
        }
        if (data.data.data.allianceFlag == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETMEMBER) {
            // this._applyData  = data.data.data.allianceapply;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_TRANSFER) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnSuccess"));
            this.hide();
        }
    };
    AllianceTurnPopupView.prototype.doApply = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_TRANSFER, { auid: event.data.auid });
    };
    AllianceTurnPopupView.prototype.rankBtnClick = function () {
    };
    AllianceTurnPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AllianceTurnPopupView.prototype.refreshRankList = function () {
    };
    AllianceTurnPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AllianceTurnPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "dinnerrankpopupview",
        ]);
    };
    AllianceTurnPopupView.prototype.getTitleStr = function () {
        return "alliance_changePo1";
    };
    AllianceTurnPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_TRANSFER, this.doApply, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._allianceVo = null;
        this._index = null;
        this._curTabIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTurnPopupView;
}(PopupView));
__reflect(AllianceTurnPopupView.prototype, "AllianceTurnPopupView");
