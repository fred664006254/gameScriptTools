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
 * 申请
 * author dky
 * date 2017/11/29
 * @class AllianceApplyPopupView
 */
var AllianceApplyPopupView = (function (_super) {
    __extends(AllianceApplyPopupView, _super);
    function AllianceApplyPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._index = 0;
        _this._type = "";
        return _this;
    }
    AllianceApplyPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_AGREEAPPLY, this.doApply, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_REFUSEAPPLY, this.doCancel, this);
        // this._rankData = this.param.data.acData;
        this._allianceVo = Api.allianceVoApi.getAllianceVo();
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 600;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 60;
        this.addChildToContainer(bg1);
        this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("allianceJoinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._soundText.x = 30 + GameData.popupviewOffsetX;
        this._soundText.y = 20;
        this.addChildToContainer(this._soundText);
        this._soundBB = BaseBitmap.create("btn_swicth");
        if (PlatformManager.checkIsEnLang()) {
            this._soundBB.x = 146 + GameData.popupviewOffsetX;
        }
        else {
            this._soundBB.x = 300 + GameData.popupviewOffsetX;
        }
        this._soundBB.x = this._soundText.x + this._soundText.width + 10;
        this._soundBB.y = this._soundText.y + this._soundText.height / 2 - this._soundBB.height / 2;
        this.addChildToContainer(this._soundBB);
        this._soundBB.addTouchTap(this.sonndHander, this);
        // this._soundBB.addTouch(this.sonndHander,this,null);	
        this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._soundState.x = this._soundBB.x + 15;
        ;
        this._soundState.y = this._soundBB.y + this._soundBB.height / 2 - this._soundState.height / 2;
        this.addChildToContainer(this._soundState);
        // this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (this._allianceVo.switch == 0) {
            this._type = "ON";
        }
        else {
            this._type = "OFF";
        }
        if (this._type == "") {
            this._type = "ON";
        }
        if (this._type != "ON") {
            this._soundBB.skewY = 180;
            this._soundBB.x = this._soundBB.x + this._soundBB.width;
            this._soundState.x = this._soundBB.x - 50;
            if (PlatformManager.checkIsEnLang()) {
                this._soundState.x = 146 + 70;
            }
            color = 0xb1b1b1;
        }
        else {
        }
        this._soundState.text = this._type;
        this._soundState.textColor = color;
        // let applyData = Api.allianceVoApi.getMyAllianceVo().apply;
        var dataList = this._applyData;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 10, bg1.height - 70);
        this._scrollList = ComponentManager.getScrollList(AllianceApplyScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
        this._scrollList.x = bg1.x + 5;
        this._scrollList.y = bg1.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceApplyTip"));
        var rankeStr = "";
        if (dataList.length) {
            rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + dataList.length;
        }
        else {
            rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + 0;
        }
        this._applyTxt = ComponentManager.getTextField(rankeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._applyTxt.x = bg1.x + 20;
        this._applyTxt.y = bg1.y + bg1.height + 33;
        this.addChildToContainer(this._applyTxt);
        //一键拒绝
        var allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarryRequestRefuseAll", this.refuseAllHandler, this);
        allMarryBtn.x = bg1.x + bg1.width - allMarryBtn.width - 30;
        allMarryBtn.y = bg1.y + bg1.height + 15;
        // allMarryBtn.
        this.addChildToContainer(allMarryBtn);
        allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AllianceApplyPopupView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    AllianceApplyPopupView.prototype.refuseAllHandler = function () {
        if (!this._scrollList.getItemByIndex(0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY, {});
    };
    AllianceApplyPopupView.prototype.sonndHander = function (param) {
        var switch1 = 0;
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (this._type == "" || this._type == "ON") {
            this._type = "OFF";
        }
        else {
            this._type = "ON";
        }
        // LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
        if (this._type != "ON") {
            this._soundBB.skewY = 180;
            this._soundBB.x = this._soundBB.x + this._soundBB.width;
            this._soundState.x = this._soundBB.x - 50;
            color = 0xb1b1b1;
            switch1 = 1;
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip2"));
        }
        else {
            this._soundBB.skewY = 0;
            this._soundBB.x = this._soundText.x + this._soundText.width + 10;
            this._soundState.x = this._soundBB.x + 15;
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip1"));
        }
        this._soundState.text = this._type;
        this._soundState.textColor = color;
        this.request(NetRequestConst.REQUEST_ALLIANCE_SETSWITCH, { switch: switch1 });
    };
    /**
     * 获取
     */
    AllianceApplyPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETALLIANCEAPPLY, requestData: {} };
    };
    //请求回调
    AllianceApplyPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.data.allianceFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        if (data.data.data.allianceFlag == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
            this.hide();
            return;
        }
        if (data.data.data.allianceFlag == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
            this.hide();
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETALLIANCEAPPLY) {
            this._applyData = data.data.data.allianceapply;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_ACCEPT) {
            this._applyData = data.data.data.allianceapply;
            this._scrollList.refreshData(this._applyData);
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_REFUSEAPPLY) {
            this._applyData = data.data.data.allianceapply;
            this._scrollList.refreshData(this._applyData);
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY) {
            this._applyData = [];
            this._scrollList.refreshData(this._applyData);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTip2"));
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SETSWITCH) {
        }
        var rankeStr = "";
        if (this._applyData && this._applyData.length) {
            rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + this._applyData.length;
        }
        else {
            rankeStr = LanguageManager.getlocal("allianceApplyPopupApplyNum") + 0;
        }
        if (this._applyTxt) {
            this._applyTxt.text = rankeStr;
        }
    };
    AllianceApplyPopupView.prototype.doApply = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_ACCEPT, { auid: event.data.uid });
    };
    AllianceApplyPopupView.prototype.doCancel = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_REFUSEAPPLY, { auid: event.data.uid });
    };
    AllianceApplyPopupView.prototype.rankBtnClick = function () {
    };
    AllianceApplyPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AllianceApplyPopupView.prototype.refreshRankList = function () {
    };
    AllianceApplyPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AllianceApplyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "dinnerrankpopupview",
        ]);
    };
    AllianceApplyPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE, this.doApply, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE, this.doCancel, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._allianceVo = null;
        this._index = null;
        this._soundBB = null;
        this._soundState = null;
        this._type = "";
        this._selectChildData = null;
        this._curTabIdx = 0;
        this._applyData = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceApplyPopupView;
}(PopupView));
__reflect(AllianceApplyPopupView.prototype, "AllianceApplyPopupView");
//# sourceMappingURL=AllianceApplyPopupView.js.map