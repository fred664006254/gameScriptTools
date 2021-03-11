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
 * author yangtao
 * date 2020/06/03
 * @class PalaceHistoryPopupView
 */
var Realname3PopupView = (function (_super) {
    __extends(Realname3PopupView, _super);
    function Realname3PopupView() {
        var _this = _super.call(this) || this;
        _this._okBtn = null;
        _this._cancelBtn = null;
        _this._nameInput = null;
        _this._idInput = null;
        return _this;
    }
    Realname3PopupView.prototype.initView = function () {
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
        if (this.param && this.param.data) {
            this._nameInput.text = this.param.data.name;
            this._idInput.text = this.param.data.id;
            if (this.param.data.errorMsg != "") {
                var nameTF = new BaseTextField();
                nameTF.x = bg.x + bg.width / 2;
                nameTF.y = bg.y + 18;
                nameTF.text = this.param.data.errorMsg;
                this.addChildToContainer(nameTF);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, nameTF, bg);
            }
        }
    };
    /** 点击确认 */
    Realname3PopupView.prototype.okBtnClick = function () {
        var view = this;
        if (this.param && this.param.data) {
            this.param.data.success.bind(this.param.data.obj)(this._nameInput.text, this._idInput.text);
        }
        _super.prototype.closeHandler.call(this);
        return;
    };
    // 点击关闭按钮的处理
    Realname3PopupView.prototype.closeHandler = function () {
        if (this.param && this.param.data) {
            this.param.data.cancel.apply(this.param.data.obj, [this]);
        }
        _super.prototype.closeHandler.call(this);
        return;
    };
    Realname3PopupView.prototype.getTitleStr = function () {
        return "realname2PopupViewTitle";
    };
    Realname3PopupView.prototype.dispose = function () {
        this._okBtn = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return Realname3PopupView;
}(PopupView));
__reflect(Realname3PopupView.prototype, "Realname3PopupView");
//# sourceMappingURL=Realname3PopupView.js.map