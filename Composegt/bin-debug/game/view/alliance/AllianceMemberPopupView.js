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
 * @class AllianceMemberPopupView
 */
var AllianceMemberPopupView = (function (_super) {
    __extends(AllianceMemberPopupView, _super);
    // private _punishRewardList: any = {};
    function AllianceMemberPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        // private _applyData :any;
        _this._index = 0;
        return _this;
    }
    AllianceMemberPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE, this.doQuit, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE, this.doRefresh, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE, this.quitAlliance, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.quitAlliance, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND, this.quitAlliance, this);
        // this._rankData = this.param.data.acData;
        this._allianceVo = Api.allianceVoApi.getAllianceVo();
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 530;
        bg1.height = 600;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 60;
        this.addChildToContainer(bg1);
        var numStr = LanguageManager.getlocal("allianceMemberNum") + this._allianceVo.mn + "/" + this._allianceVo.maxmn;
        this._memberText = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._memberText.x = 50;
        this._memberText.y = 20;
        this.addChildToContainer(this._memberText);
        // let applyData = Api.allianceVoApi.getMyAllianceVo().apply;
        var dataList = Api.allianceVoApi.getAllianceMemberInfoVoList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 20, bg1.height - 20);
        this._scrollList = ComponentManager.getScrollList(AllianceMemberScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
        this._scrollList.x = bg1.x + 10;
        this._scrollList.y = bg1.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));
    };
    AllianceMemberPopupView.prototype.refuseAllHandler = function () {
        if (!this._scrollList.getItemByIndex(0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY, {});
    };
    AllianceMemberPopupView.prototype.quitAlliance = function () {
        this.hide();
    };
    /**
     * 获取
     */
    AllianceMemberPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETMEMBER, requestData: {} };
    };
    //请求回调
    AllianceMemberPopupView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETMEMBER) {
            // this._applyData  = data.data.data.allianceapply;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE) {
            this.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceMemberQuitSuccess"));
        }
    };
    AllianceMemberPopupView.prototype.doRefresh = function () {
        var dataList = Api.allianceVoApi.getAllianceMemberInfoVoList();
        this._scrollList.refreshData(dataList);
        var numStr = LanguageManager.getlocal("allianceMemberNum") + this._allianceVo.mn + "/" + this._allianceVo.maxmn;
        this._memberText.text = numStr;
    };
    AllianceMemberPopupView.prototype.doQuit = function (event) {
        // let data  = event.data;
        // this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE, {});
    };
    AllianceMemberPopupView.prototype.rankBtnClick = function () {
    };
    AllianceMemberPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AllianceMemberPopupView.prototype.refreshRankList = function () {
    };
    AllianceMemberPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AllianceMemberPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "dinnerrankpopupview",
        ]);
    };
    AllianceMemberPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE, this.doQuit, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE, this.doRefresh, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE, this.quitAlliance, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.quitAlliance, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_DISBAND, this.quitAlliance, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._allianceVo = null;
        this._index = null;
        this._curTabIdx = 0;
        this._memberText = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceMemberPopupView;
}(PopupView));
__reflect(AllianceMemberPopupView.prototype, "AllianceMemberPopupView");
