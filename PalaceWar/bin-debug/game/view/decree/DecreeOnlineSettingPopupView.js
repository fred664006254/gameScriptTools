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
var DecreeOnlineSettingPopupView = (function (_super) {
    __extends(DecreeOnlineSettingPopupView, _super);
    function DecreeOnlineSettingPopupView() {
        var _this = _super.call(this) || this;
        _this._isSel = false;
        return _this;
    }
    DecreeOnlineSettingPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG), this.switchCallBack, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_9_bg41");
        bg.width = 526;
        bg.height = 144;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._nodeContainer.addChild(bg);
        var res = "public_select";
        this._isSel = Api.otherInfoVoApi.isEmpireOnlineNotice();
        if (this._isSel) {
            res = "public_select_down";
        }
        var public_select = BaseBitmap.create(res);
        public_select.width = public_select.height = 38;
        public_select.x = bg.x + 20;
        public_select.y = bg.y + 15;
        this._nodeContainer.addChild(public_select);
        this._public_select = public_select;
        this._public_select.addTouchTap(this.switchStatus, this);
        var txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.text = LanguageManager.getlocal("decreeonline_txt");
        txt1.x = public_select.x + public_select.width + 10;
        txt1.y = public_select.y + public_select.height / 2 - txt1.height / 2;
        this._nodeContainer.addChild(txt1);
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        txt.multiline = true;
        txt.lineSpacing = 6;
        txt.width = bg.width - 40;
        txt.x = bg.x + 20;
        txt.y = public_select.y + public_select.height + 10;
        txt.text = LanguageManager.getlocal("decreeonline_tip1");
        this._nodeContainer.addChild(txt);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.goHandler, this);
        goBtn.x = bg.x + bg.width / 2 - goBtn.width / 2;
        goBtn.y = bg.y + bg.height + 25;
        goBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(goBtn);
    };
    DecreeOnlineSettingPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    DecreeOnlineSettingPopupView.prototype.switchStatus = function () {
        var tarRes = "public_select_down";
        if (this._isSel) {
            tarRes = "public_select";
        }
        this._isSel = !this._isSel;
        this._public_select.texture = ResourceManager.getRes(tarRes);
    };
    DecreeOnlineSettingPopupView.prototype.switchCallBack = function (event) {
        if (event && event.data && event.data.ret) {
            var ret = event.data.data.ret;
            if (ret == 0) {
                this.showNotiMsg();
            }
        }
        this.hide();
    };
    DecreeOnlineSettingPopupView.prototype.showNotiMsg = function () {
        if (Api.otherInfoVoApi.isEmpireOnlineNotice()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("decreeonline_tip_on"));
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("decreeonline_tip_off"));
        }
    };
    DecreeOnlineSettingPopupView.prototype.getShowHeight = function () {
        return 300;
    };
    //需要针对每个任务处理跳转关系
    DecreeOnlineSettingPopupView.prototype.goHandler = function () {
        if (Api.otherInfoVoApi.isEmpireOnlineNotice() == this._isSel) {
            this.showNotiMsg();
            this.hide();
            return;
        }
        var flag = this._isSel ? 0 : 1;
        NetManager.request(NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG, { banFlag: flag });
    };
    DecreeOnlineSettingPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    DecreeOnlineSettingPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG), this.switchCallBack, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return DecreeOnlineSettingPopupView;
}(PopupView));
__reflect(DecreeOnlineSettingPopupView.prototype, "DecreeOnlineSettingPopupView");
//# sourceMappingURL=DecreeOnlineSettingPopupView.js.map