/**
 * 编号查找玩家
 * author shaoliang
 * date 2017/10/31
 * @class AllianceFindPopupView
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
var AllianceFindPopupView = (function (_super) {
    __extends(AllianceFindPopupView, _super);
    // private _timeCountDown:BaseTextField = null;
    function AllianceFindPopupView() {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._dinnerInfoContainer = null;
        _this._scrollView = null;
        _this._allianceInfo = null;
        _this._gotoBtn = null;
        return _this;
    }
    ;
    AllianceFindPopupView.prototype.getTitleStr = function () {
        return "allianceCreateSearchBtn";
    };
    AllianceFindPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 518;
        typeBg.height = 500;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("allianceFindId"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.setPosition(52 + GameData.popupviewOffsetX, 27 + typeBg.y);
        this.addChildToContainer(titleText);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 44, "public_9_bg5", LanguageManager.getlocal("allianceFindInputHolder"), 0xa4917f);
        inputTF.x = this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = typeBg.y + 55;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.restrict = "0-9";
        this._inputTextField.maxChars = 40;
        //查找按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "find", this.findHandle, this);
        confirmBtn.setPosition(this.viewBg.width - confirmBtn.width - 55 - GameData.popupviewOffsetX, inputTF.y + inputTF.height + 12);
        this.addChildToContainer(confirmBtn);
        //宴会信息
        var infoText = ComponentManager.getTextField(LanguageManager.getlocal("allianceFindIInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText.setPosition(titleText.x, 155 + typeBg.y);
        this.addChildToContainer(infoText);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 500;
        rankBg.height = 228;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, infoText.y + infoText.height + 8);
        this.addChildToContainer(rankBg);
        this._gotoBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceRankApply", this.gotoHandle, this);
        this._gotoBtn.setPosition(confirmBtn.x, rankBg.y + rankBg.height + 12);
        this.addChildToContainer(this._gotoBtn);
        this._gotoBtn.visible = false;
    };
    AllianceFindPopupView.prototype.findHandle = function () {
        if (!this._inputTextField.bindData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceFindInputHolder"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCE_FINDALLIANCE, { "aid": Number(this._inputTextField.text) });
    };
    AllianceFindPopupView.prototype.gotoHandle = function () {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.nextt - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip"));
            return;
        }
        if (this._allianceInfo.mn >= this._allianceInfo.maxmn) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_joinNumMax"));
            return;
        }
        if (Api.allianceVoApi.isShowConfirmWhenJoin()) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("allianceJoinLimitTip1"),
                callback: function () {
                    this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE, { aid: this._allianceInfo.id });
                },
                handler: this,
                needCancel: true
            });
        }
        else {
            this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE, { aid: this._allianceInfo.id });
        }
    };
    AllianceFindPopupView.prototype.receiveData = function (data) {
        if (data.ret == true) {
            if (data.data.data.allianceFlag == 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
                return;
            }
            if (data.data.data.allianceFlag == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
                return;
            }
            if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_FINDALLIANCE) {
                this._gotoBtn.visible = true;
                this._allianceInfo = data.data.data.falliance;
                // this._allianceInfo["uid"] = Number(this._inputTextField.text);
                this.showFindInfo();
            }
            if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplySuccess"));
            }
        }
    };
    AllianceFindPopupView.prototype.showFindInfo = function () {
        if (this._scrollView) {
            this.removeChildFromContainer(this._scrollView);
            this._scrollView = null;
        }
        var container = new BaseDisplayObjectContainer();
        // this.addChildToContainer(container);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 500, 210);
        // 中部可滑动区域
        this._scrollView = ComponentManager.getScrollView(container, rect);
        this._scrollView.setPosition(50 + GameData.popupviewOffsetX, 210);
        // scrollView.y= 100;
        this.addChildToContainer(this._scrollView);
        var nameStr = LanguageManager.getlocal("allianceFindInfo1", [this._allianceInfo.name, this._allianceInfo.level]);
        var info1TF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info1TF.y = 5;
        container.addChild(info1TF);
        var info2Str = LanguageManager.getlocal("allianceFindInfo2", [this._allianceInfo.creatorname]);
        var info2TF = ComponentManager.getTextField(info2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info2TF.y = info1TF.y + info1TF.height + 10;
        container.addChild(info2TF);
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(this._allianceInfo.level);
        var info3Str = LanguageManager.getlocal("allianceFindInfo3", [this._allianceInfo.exp + "/" + allianceCfg.exp]);
        var info3TF = ComponentManager.getTextField(info3Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info3TF.y = info2TF.y + info2TF.height + 10;
        container.addChild(info3TF);
        var info4Str = LanguageManager.getlocal("allianceFindInfo4", [this._allianceInfo.wealth]);
        var info4TF = ComponentManager.getTextField(info4Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info4TF.y = info3TF.y + info3TF.height + 10;
        container.addChild(info4TF);
        var info5Str = LanguageManager.getlocal("allianceFindInfo5", [this._allianceInfo.affect]);
        var info5TF = ComponentManager.getTextField(info5Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info5TF.y = info4TF.y + info4TF.height + 10;
        container.addChild(info5TF);
        var info6Str = LanguageManager.getlocal("allianceFindInfo6", [this._allianceInfo.mn + "/" + this._allianceInfo.maxmn]);
        var info6TF = ComponentManager.getTextField(info6Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info6TF.y = info5TF.y + info5TF.height + 10;
        container.addChild(info6TF);
        var info9Str = LanguageManager.getlocal("allianceFindInfo9", [this._allianceInfo.cweixin]);
        var info9TF = ComponentManager.getTextField(info9Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info9TF.width = 490;
        info9TF.lineSpacing = 5;
        info9TF.y = info6TF.y + info6TF.height + 10;
        info9TF.x = info1TF.x;
        container.addChild(info9TF);
        var info7Str = LanguageManager.getlocal("allianceFindInfo7", [this._allianceInfo.cqq]);
        var info7TF = ComponentManager.getTextField(info7Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info7TF.width = 490;
        info7TF.lineSpacing = 5;
        info7TF.y = info9TF.y + info9TF.height + 10;
        container.addChild(info7TF);
        var info8Str = LanguageManager.getlocal("allianceFindInfo8", [this._allianceInfo.intro]);
        var info8TF = ComponentManager.getTextField(info8Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        info8TF.y = info7TF.y + info7TF.height + 10;
        info8TF.width = 480;
        info8TF.lineSpacing = 5;
        container.addChild(info8TF);
        container.height = container.height + 10;
    };
    AllianceFindPopupView.prototype.dispose = function () {
        this._inputTextField = null;
        this._dinnerInfoContainer = null;
        this._gotoBtn = null;
        this._scrollView = null;
        this._allianceInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceFindPopupView;
}(PopupView));
__reflect(AllianceFindPopupView.prototype, "AllianceFindPopupView");
//# sourceMappingURL=AllianceFindPopupView.js.map