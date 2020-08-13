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
 * 派遣门课弹板
 * author qianjun
 * date 2017/10/10
 */
var ServantSendConstPopupView = (function (_super) {
    __extends(ServantSendConstPopupView, _super);
    function ServantSendConstPopupView() {
        return _super.call(this) || this;
    }
    ServantSendConstPopupView.prototype.initView = function () {
        var data = this.param.data;
        var servantid = data.id;
        if (data.cancelCallback) {
            this._cancelCallback = data.cancelCallback;
        }
        this._confirmCallback = data.confirmCallback;
        this._handler = data.handler;
        var iconPic = data.icon;
        var iconBg = data.iconBg;
        var msg = data.msg;
        var num = data.num;
        var useNum = data.useNum || 0;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 340;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        // let temX = this.viewBg.x + this.viewBg.width/2 - 50;
        var temY = 29;
        // let itembg : BaseLoadBitmap = BaseLoadBitmap.create(iconBg);
        // itembg.x = temX
        // itembg.y = temY;
        // itembg.setScale(0.5);
        // this.addChildToContainer(itembg);
        // //点击物品增加文字说明 添加物品iconitem
        // let iconItem : BaseLoadBitmap = BaseLoadBitmap.create(iconPic);
        // iconItem.setScale(0.5);
        // iconItem.x =  temX;
        // iconItem.y =  temY;
        // this.addChildToContainer(iconItem);
        var temW = 150;
        var iconBgBt = BaseLoadBitmap.create(iconBg);
        iconBgBt.x = this.viewBg.x + this.viewBg.width / 2 - temW / 2;
        iconBgBt.y = temY;
        this.addChildToContainer(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(iconPic);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChildToContainer(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        // msg += `\n${cur_have}`;
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = temY + temW + 25;
        msgTF.lineSpacing = 6;
        this.addChildToContainer(msgTF);
        // msgTF.lineSpacing = data.linespacing || 20;
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2;
        this._cancelBtn.y = bg.y + bg.height - 10 - 60;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    ServantSendConstPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    ServantSendConstPopupView.prototype.clickConfirmHandler = function (data) {
        if (this.param.data.useNum && this.param.data.useNum > this.param.data.num) {
            if (this.param.data.icon == "itemicon1") {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            }
            this.hide();
            return;
        }
        App.LogUtil.log("clickConfirmHandler");
        if (this._confirmCallback) {
            this._confirmCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ServantSendConstPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    ServantSendConstPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    ServantSendConstPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ServantSendConstPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_BIG_YELLOW;
    };
    ServantSendConstPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSendConstPopupView;
}(PopupView));
__reflect(ServantSendConstPopupView.prototype, "ServantSendConstPopupView");
//# sourceMappingURL=ServantSendConstPopupView.js.map