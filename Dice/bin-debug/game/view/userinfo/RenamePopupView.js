/*
 *@description: 用户修改名字弹窗
 *@author: hwc
 *@date: 2020-04-15 13:30:01
 *@version 0.0.1
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
var RenamePopupView = (function (_super) {
    __extends(RenamePopupView, _super);
    function RenamePopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needGem = 0;
        _this.newName = "";
        _this._maxLen = 12;
        return _this;
    }
    RenamePopupView.prototype.initView = function () {
        this.name = "RenamePopupView";
        this.needGem = Api.SigninfoVoApi.getRenameNum() == 0 ? 0 : Config.GamebaseCfg.renameGem;
        var perstr = ""; //LangMger.getlocal("user_rename_per_input");
        var input = ComponentMgr.getInputTextField(ColorEnums.gray, TextFieldConst.SIZE_22, 320, 48, "joinwarinputbg", perstr, ColorEnums.gray);
        this.addChildToContainer(input);
        input.x = (this.getShowWidth() - 320) / 2 - 10;
        input.y = 20;
        var inputTxt = input.getChildByName("textField");
        inputTxt.setColor(ColorEnums.gray);
        inputTxt.maxChars = this._maxLen;
        inputTxt.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
        //inputTxt.restrict = "/\u4e00-\u9fa5_0-9a-zA-Z/";//"/A-Za-z0-9-\(\)\u4e00-\u9fa5/";
        this._inputTextField = inputTxt;
        var randomBtn = ComponentMgr.getButton("chooserole_dice", "", this.clickRanomHandler, this);
        randomBtn.x = input.x + input.width - randomBtn.width - 6;
        randomBtn.y = input.y + input.height / 2 - randomBtn.height / 2;
        this.addChildToContainer(randomBtn);
        var warn = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, 0x5D8EC0);
        this.addChildToContainer(warn);
        warn.width = 534;
        warn.textAlign = egret.HorizontalAlign.CENTER;
        warn.text = LangMger.getlocal("user_rename_tip");
        warn.x = (this.getShowWidth() - warn.width) / 2;
        warn.y = input.y + input.height + 10;
        var btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.confirmBtnOnClick, this);
        this.addChildToContainer(btn);
        btn.x = (this.viewBg.width - btn.width) / 2;
        btn.y = this.getShowHeight() - btn.height - 100;
        this.confirmBtn = btn;
        if (Api.GameinfoVoApi.checlIsInGuideId(25)) {
            btn.setText(LangMger.getlocal("confirmBtn"));
            this.clickRanomHandler();
        }
        else {
            var icon = BaseBitmap.create("ab_mainui_gem");
            btn.addChild(icon);
            icon.x = btn.width / 2 - icon.width * 1.2;
            icon.y = (btn.height - icon.height) / 2;
            var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_28, ColorEnums.white);
            btn.addChild(txt);
            txt.width = btn.width / 2;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.text = String(this.needGem);
            txt.x = icon.x + icon.width;
            txt.y = icon.y + (icon.height - txt.height) / 2;
            this.newName = this._inputTextField.text = Api.UserinfoVoApi.getName();
        }
    };
    RenamePopupView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        if (Api.GameinfoVoApi.checlIsInGuideId(25)) {
            App.CommonUtil.sendNewGuideId(25);
            Api.GameinfoVoApi.setCurGudingId(26);
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    RenamePopupView.prototype.confirmBtnOnClick = function () {
        var curname = Api.UserinfoVoApi.getName();
        if (Api.GameinfoVoApi.checlIsInGuideId(26)) {
        }
        else {
            if (this.needGem > Api.UserinfoVoApi.getGem()) {
                // App.CommonUtil.showTip("钻石不足，走钻石不足的通用逻辑");
                App.CommonUtil.gemNotEnough(1);
                // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                //     title : LangMger.getlocal("sysTip"),
                //     msg : LangMger.getlocal(`sysgemNotEnough`),
                //     needCancel : false,
                // });
                return;
            }
            else {
                if (this.needGem > Api.UserinfoVoApi.getGem()) {
                    App.CommonUtil.showTip("钻石不足，走钻石不足的通用逻辑");
                    return;
                }
            }
        }
        if (this.newName === "") {
            App.CommonUtil.showTip(LangMger.getlocal("user_name_cannot_empty"));
            return;
        }
        if (curname == this.newName) {
            App.CommonUtil.showTip(LangMger.getlocal("userinfo_reneme_nochange"));
            return;
        }
        if (App.StringUtil.getEnLength(this.newName) > 12 || App.StringUtil.getEnLength(this.newName) < 4) {
            App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_2"));
            return;
        }
        if (!App.StringUtil.userNameCheck(this.newName)) {
            App.CommonUtil.showTip(LangMger.getlocal("user_name_have_illegal_char"));
            return;
        }
        if (!Config.ShieldCfg.checkShield(this.newName)) {
            App.CommonUtil.showTip(LangMger.getlocal("user_name_have_illegal_char"));
            return;
        }
        if (Api.GameinfoVoApi.checlIsInGuideId(26)) {
            this.request(NetConst.REQUEST_USER_CREATENAME, { name: this.newName });
        }
        else {
            this.request(NetConst.USER_RENAME, { name: this.newName });
            this.closeHandler();
        }
    };
    RenamePopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    RenamePopupView.prototype.clickRanomHandler = function () {
        this.randomName();
    };
    RenamePopupView.prototype.randomName = function () {
        this.newName = Config.NamesCfg.getRandomName();
        this._inputTextField.text = this.newName;
    };
    RenamePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x = this.viewBg.x;
    };
    RenamePopupView.prototype.callbackInput = function (event) {
        var txt = event.target.text;
        this.newName = txt.trim();
        // let view = this;
        // let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
        // let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
        // let inputMaxText = <BaseTextField>inputTF2.getChildByName("inputMaxText");
        // let _length = inputtxt.text.length;//+nNum;
        // let newlength1:number = this._maxLen -_length;
        // if(newlength1<0)
        // {
        //     newlength1=0;
        // }
        // // inputMaxText.text = LangMger.getlocal(`acQuestionAnswerWord-${view.code}`,[newlength1+""]); 
        // if(newlength1==0)
        // {
        //     inputMaxText.textColor = ColorEnums.red;
        // }
        // else
        // {
        // inputMaxText.textColor = 0xc2b89e;
        //     }
        //     if(inputtxt.text === ''){
        //         return;
        //     }
        // if(Config.ShieldCfg.checkShield(inputtxt.text)==false)
        // {
        //     App.CommonUtil.showTip(LangMger.getlocal("chatShieldTip"));
        //     return;
        // }
        // if(App.StringUtil.checkChar(inputtxt.text))
        // {
        //     App.CommonUtil.showTip(LangMger.getlocal("chatShieldTip"));
        //     return;
        // }
    };
    RenamePopupView.prototype.netEventCallBack = function (evt) {
        var data = evt.data;
        if (data && data.ret) {
            switch (data.data.cmd) {
                case NetConst.USER_RENAME:
                    this.renameResponse(data.data.data);
                    break;
                case NetConst.REQUEST_USER_CREATENAME:
                    this.renameResponse(data.data.data);
                    break;
                default:
                    break;
            }
        }
    };
    RenamePopupView.prototype.renameResponse = function (data) {
        if (data) {
            switch (data.nameFlag) {
                case 0:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_0"));
                    if (Api.GameinfoVoApi.checlIsInGuideId(26)) {
                        App.CommonUtil.sendNewGuideId(26);
                        Api.GameinfoVoApi.setCurGudingId(27);
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        this.hide();
                    }
                    break;
                case 1:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_1"));
                    break;
                case 2:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_2"));
                    break;
                case 3:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_3"));
                    break;
                default:
                    break;
            }
        }
        else {
            App.LogUtil.log(">>>完犊子了<<<");
        }
    };
    // 关闭按钮回调
    RenamePopupView.prototype.closeHandler = function () {
        if (Api.GameinfoVoApi.checlIsInGuideId(26)) {
            return;
        }
        _super.prototype.closeHandler.call(this);
        ViewController.getInstance().openView(ViewConst.USERINFO_POPUPVIEW);
    };
    RenamePopupView.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
    };
    // 需要加载的资源
    RenamePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["joinwarinputbg",]);
    };
    // 标题文字内容
    RenamePopupView.prototype.getTitleStr = function () {
        return Api.GameinfoVoApi.checlIsInGuideId(25) ? LangMger.getlocal("user_createname_title") : LangMger.getlocal("user_rename_title");
    };
    // 弹框面板宽度，高度动态计算
    RenamePopupView.prototype.getShowWidth = function () {
        return _super.prototype.getShowWidth.call(this);
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    RenamePopupView.prototype.getShowHeight = function () {
        return 350;
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    RenamePopupView.prototype.getBgExtraHeight = function () {
        return _super.prototype.getBgExtraHeight.call(this);
    };
    RenamePopupView.prototype.dispose = function () {
        this.confirmBtn = null;
        _super.prototype.dispose.call(this);
    };
    return RenamePopupView;
}(PopupView));
__reflect(RenamePopupView.prototype, "RenamePopupView");
//# sourceMappingURL=RenamePopupView.js.map