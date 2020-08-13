/**
 * 编号查找玩家
 * author shaoliang
 * date 2017/10/31
 * @class DinnerFindPopupView
 */
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
var DinnerFindPopupView = (function (_super) {
    __extends(DinnerFindPopupView, _super);
    function DinnerFindPopupView() {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._dinnerInfoContainer = null;
        _this._dinnerInfo = null;
        _this._gotoBtn = null;
        _this._timeCountDown = null;
        return _this;
    }
    ;
    DinnerFindPopupView.prototype.getTitleStr = function () {
        return "codeToDinner";
    };
    DinnerFindPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_tc_bg01");
        typeBg.width = 520;
        typeBg.height = 600;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("playerIdFind"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.setPosition(70, 27 + typeBg.y);
        this.addChildToContainer(titleText);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 490, 44, "public_tc_srkbg05", LanguageManager.getlocal("inputPlayerId"), TextFieldConst.COLOR_WHITE);
        inputTF.x = this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = typeBg.y + 55;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.restrict = "0-9";
        this._inputTextField.maxChars = 40;
        //查找按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "find", this.findHandle, this);
        confirmBtn.setPosition(this.viewBg.width - confirmBtn.width - 70, inputTF.y + inputTF.height + 12);
        this.addChildToContainer(confirmBtn);
        //宴会信息
        var infoText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerInfo") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText.setPosition(titleText.x, 155 + typeBg.y);
        this.addChildToContainer(infoText);
        var rankBg = BaseBitmap.create("public_tc_bg03");
        rankBg.width = 496;
        rankBg.height = 300;
        this._rankBg = rankBg;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, infoText.y + infoText.height + 8);
        this.addChildToContainer(rankBg);
        this._gotoBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.gotoHandle, this);
        this._gotoBtn.setPosition(confirmBtn.x, rankBg.y + rankBg.height + 22);
        this.addChildToContainer(this._gotoBtn);
        this._gotoBtn.visible = false;
    };
    DinnerFindPopupView.prototype.findHandle = function () {
        if (this._inputTextField.text.length < 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        if (Number(this._inputTextField.text) == Api.playerVoApi.getPlayerID()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinnerCannotSelf"));
            return;
        }
        this.request(NetRequestConst.REQUEST_DINNER_GETDINNER, { "getuid": Number(this._inputTextField.text) });
    };
    DinnerFindPopupView.prototype.gotoHandle = function () {
        var info = this._dinnerInfo;
        ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, { "info": info });
        this.hide();
    };
    DinnerFindPopupView.prototype.receiveData = function (data) {
        if (data.ret == true && data.data.ret == 0) {
            if (data.data.data.dinnerinfo && !data.data.data.dinnerinfo.dtype) {
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdIsNoDinner"));
                return;
            }
            if (data.data.data.proflag == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2"));
                return;
            }
            this._gotoBtn.visible = true;
            this._dinnerInfo = data.data.data.dinnerinfo;
            // this._dinnerInfo["uid"] = Number(this._inputTextField.text);
            // this._dinnerInfo["uid"] = da
            this.showFindInfo();
        }
    };
    DinnerFindPopupView.prototype.showFindInfo = function () {
        if (this._dinnerInfoContainer) {
            this.removeChildFromContainer(this._dinnerInfoContainer);
            this._dinnerInfoContainer = null;
        }
        this._dinnerInfoContainer = new BaseDisplayObjectContainer();
        this._dinnerInfoContainer.setPosition(this._rankBg.x + 20, 215);
        this.addChildToContainer(this._dinnerInfoContainer);
        var dinnerHost = ComponentManager.getTextField(LanguageManager.getlocal("dinnerHost"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._dinnerInfoContainer.addChild(dinnerHost);
        var dinnerType = ComponentManager.getTextField(LanguageManager.getlocal("dinnerType"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        dinnerType.y = 33;
        this._dinnerInfoContainer.addChild(dinnerType);
        var dinnerSeat = ComponentManager.getTextField(LanguageManager.getlocal("dinnerSeat") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        dinnerSeat.y = 66;
        this._dinnerInfoContainer.addChild(dinnerSeat);
        var dinnerCountDown = ComponentManager.getTextField(LanguageManager.getlocal("dinnerCountDown"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        dinnerCountDown.y = 99;
        this._dinnerInfoContainer.addChild(dinnerCountDown);
        var hostName = ComponentManager.getTextField(this._dinnerInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        hostName.x = dinnerHost.width + 10;
        this._dinnerInfoContainer.addChild(hostName);
        var typeName = ComponentManager.getTextField(LanguageManager.getlocal("dinnerType" + this._dinnerInfo.dtype), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        typeName.setPosition(dinnerType.width + 10, dinnerType.y);
        this._dinnerInfoContainer.addChild(typeName);
        var num = this._dinnerInfo.join_num;
        var totalNum = Config.DinnerCfg.getFeastItemCfg(this._dinnerInfo.dtype).contain;
        var seat = ComponentManager.getTextField(num + "/" + totalNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        seat.setPosition(dinnerSeat.width + 10, dinnerSeat.y);
        this._dinnerInfoContainer.addChild(seat);
        this._timeCountDown = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._timeCountDown.setPosition(dinnerCountDown.width + 10, dinnerCountDown.y);
        this._dinnerInfoContainer.addChild(this._timeCountDown);
        this.tick();
    };
    DinnerFindPopupView.prototype.tick = function () {
        if (this._dinnerInfo && this._timeCountDown) {
            var time = this._dinnerInfo.end_time - GameData.serverTime;
            if (time < 0) {
                time = 0;
            }
            this._timeCountDown.text = App.DateUtil.getFormatBySecond(time);
        }
    };
    DinnerFindPopupView.prototype.dispose = function () {
        this._inputTextField = null;
        this._dinnerInfoContainer = null;
        this._gotoBtn = null;
        this._rankBg = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerFindPopupView;
}(PopupView));
__reflect(DinnerFindPopupView.prototype, "DinnerFindPopupView");
