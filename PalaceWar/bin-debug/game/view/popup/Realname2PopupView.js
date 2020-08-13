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
var Realname2PopupView = (function (_super) {
    __extends(Realname2PopupView, _super);
    function Realname2PopupView() {
        var _this = _super.call(this) || this;
        _this._okBtn = null;
        _this._cancelBtn = null;
        _this._nameInput = null;
        _this._idInput = null;
        return _this;
    }
    Realname2PopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 230;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 20;
        this.addChildToContainer(bg);
        // 姓名
        var nameTF = new BaseTextField();
        nameTF.x = 50 + GameData.popupviewOffsetX;
        nameTF.y = bg.y + bg.height / 2 - nameTF.height / 2 - 50;
        nameTF.text = LanguageManager.getlocal("realname_name");
        this.addChildToContainer(nameTF);
        var nameBg = new egret.Shape();
        nameBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED, 1);
        nameBg.graphics.drawRect(0, 0, 340, 50);
        nameBg.graphics.endFill();
        nameBg.graphics.beginFill(TextFieldConst.COLOR_BLACK, 1);
        nameBg.graphics.drawRect(1, 1, 338, 48);
        nameBg.graphics.endFill();
        nameBg.x = 150 + GameData.popupviewOffsetX;
        nameBg.y = nameTF.y + nameTF.height / 2 - nameBg.height / 2;
        this.addChildToContainer(nameBg);
        var nameInput = new BaseTextField();
        nameInput.type = egret.TextFieldType.INPUT;
        nameInput.width = 320;
        nameInput.height = nameTF.height;
        nameInput.x = 160 + GameData.popupviewOffsetX;
        nameInput.y = nameBg.y + nameBg.height / 2 - nameInput.height / 2;
        this.addChildToContainer(nameInput);
        this._nameInput = nameInput;
        // 身份证
        var idTF = new BaseTextField();
        idTF.x = 50 + GameData.popupviewOffsetX;
        idTF.y = bg.y + bg.height / 2 - idTF.height / 2 + 50;
        idTF.text = LanguageManager.getlocal("realname_id");
        this.addChildToContainer(idTF);
        var idBg = new egret.Shape();
        idBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED, 1);
        idBg.graphics.drawRect(0, 0, 340, 50);
        idBg.graphics.endFill();
        idBg.graphics.beginFill(TextFieldConst.COLOR_BLACK, 1);
        idBg.graphics.drawRect(1, 1, 338, 48);
        idBg.graphics.endFill();
        idBg.x = 150 + GameData.popupviewOffsetX;
        idBg.y = idTF.y + idTF.height / 2 - idBg.height / 2;
        this.addChildToContainer(idBg);
        var idInput = new BaseTextField();
        idInput.type = egret.TextFieldType.INPUT;
        idInput.width = 420;
        idInput.height = idTF.height;
        idInput.x = 160 + GameData.popupviewOffsetX;
        idInput.y = idBg.y + idBg.height / 2 - idInput.height / 2;
        this.addChildToContainer(idInput);
        this._idInput = idInput;
        this._okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.okBtnClick, this);
        this._okBtn.x = bg.x + bg.width / 2 - this._okBtn.width / 2;
        this._okBtn.y = bg.y + bg.height - this._okBtn.height / 2 + 55;
        this.addChildToContainer(this._okBtn);
        // this._cancelBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"cancelBtn",this.cancelBtnClick,this);
        // this._cancelBtn.x = bg.x+bg.width/2-this._cancelBtn.width/2 -100;
        // this._cancelBtn.y = bg.y+bg.height -this._cancelBtn.height/2+55;
        // this.addChildToContainer(this._cancelBtn);  
        if (this.param && this.param.data && this.param.data.hidecancle == true) {
            if (this.closeBtn) {
                this.closeBtn.visible = false;
            }
        }
    };
    /** 点击确认 */
    Realname2PopupView.prototype.okBtnClick = function () {
        var _this = this;
        console.log("okBtnClick", this._nameInput.text, this._idInput.text);
        if ((!App.CommonUtil.isCardNo(this._idInput.text)) || (!App.CommonUtil.isTrueName(this._nameInput.text))) {
            App.CommonUtil.showTip(LanguageManager.getlocal("realname_noid"));
            return;
        }
        if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit && GameData.idcardNoFreeApiSwitch === 0) {
            RSDKHelper.realname_auth(this._idInput.text, this._nameInput.text, function (ret, msg) {
                if (ret === 0) {
                    console.log("验证成功");
                    _this.realnameCheckOk();
                }
                else {
                    console.log("验证失败", msg.error);
                    App.CommonUtil.showTip(msg.error);
                }
            });
        }
        else {
            this.realnameCheckOk();
        }
    };
    Realname2PopupView.prototype.realnameCheckOk = function () {
        var _this = this;
        // 是否成年
        var adult = App.CommonUtil.getAge(this._idInput.text) >= 18;
        Api.realnameVoApi.setIdcardInfo(this._idInput.text, this._nameInput.text, adult ? "3" : "2", function (err) {
            if (!err) {
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_ok"));
                GameData.idcardType = adult ? RealnameConst.USERTYPE_3 : RealnameConst.USERTYPE_2;
                if (LoginManager.isCreateScene) {
                    // 如果在游戏内，就再发一下登录
                    LoginManager.reLoginGame();
                }
                _this.hide();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
            }
        });
    };
    // 点击关闭按钮的处理
    Realname2PopupView.prototype.closeHandler = function () {
        var _this = this;
        if (LoginManager.isCreateScene) {
            // 如果是在游戏内，则关闭不处理东西
            _super.prototype.closeHandler.call(this);
            return;
        }
        if (GameData.idcardNormal === 1) {
            // 正常模式
            Realname2PopupView.showTipDialog();
            _super.prototype.closeHandler.call(this);
        }
        else {
            // 简易模式
            Api.realnameVoApi.setIdcardInfo(null, null, RealnameConst.USERTYPE_1, function (err) {
                if (!err) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("realname_enter_with_type1"));
                    GameData.idcardType = RealnameConst.USERTYPE_1;
                    _super.prototype.closeHandler.call(_this);
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
                }
            });
        }
    };
    Realname2PopupView.prototype.dispose = function () {
        this._okBtn = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    Realname2PopupView.showTipDialog = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "realname2TipTitle",
            msg: LanguageManager.getlocal(GameData.idcardNormal === 0 ? "realname_info_easy" : "realname_info_normal"),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.POPUP.REAlNAME2POPUPVIEW);
            },
            cancelcallback: function () {
                console.log("clickcancel");
                GameData.idcardType = RealnameConst.USERTYPE_1;
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_enter_with_type1"));
                Api.realnameVoApi.setIdcardInfo(null, null, GameData.idcardType, function (err) {
                    if (err) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
                    }
                });
            },
            closecallback: function () {
                console.log("clickclose");
                GameData.idcardType = RealnameConst.USERTYPE_1;
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_enter_with_type1"));
                Api.realnameVoApi.setIdcardInfo(null, null, GameData.idcardType, function (err) {
                    if (err) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
                    }
                });
            },
            handler: RSDKHelper,
            height: 200,
            needClose: GameData.idcardNormal === 0 ? 1 : 0,
            needCancel: 1,
            canelTxt: "realname_guest_login",
            confirmTxt: "realname_goto"
        });
    };
    return Realname2PopupView;
}(PopupView));
__reflect(Realname2PopupView.prototype, "Realname2PopupView");
//# sourceMappingURL=Realname2PopupView.js.map