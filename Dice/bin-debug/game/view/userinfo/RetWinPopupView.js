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
/*
 *@description: 重置胜率的弹窗
 *@author: hwc
 *@date: 2020-04-15 11:04:28
 *@version 0.0.1
 */
var RetWinPopupView = (function (_super) {
    __extends(RetWinPopupView, _super);
    function RetWinPopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needGem = 50;
        return _this;
    }
    RetWinPopupView.prototype.initView = function () {
        var info = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, 0xCFDEFF);
        this.addChildToContainer(info);
        info.width = 534;
        info.height = 160;
        info.lineSpacing = 10;
        info.textAlign = egret.HorizontalAlign.CENTER;
        info.verticalAlign = egret.VerticalAlign.MIDDLE;
        info.stroke = 1.5;
        info.strokeColor = 0x0C2C77;
        info.text = LangMger.getlocal("user_refresh_win_info");
        info.x = (this.viewBg.width - info.width) / 2;
        info.y = 0;
    };
    RetWinPopupView.prototype.confirmBtnOnClick = function () {
        var gem = Api.UserinfoVoApi.getGem();
        var needGem = this.needGem;
        if (gem >= needGem) {
            this.request(NetConst.USER_RESETWIN, {});
        }
        else {
            App.CommonUtil.gemNotEnough(1);
            // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
            //     title : LangMger.getlocal("sysTip"),
            //     msg : LangMger.getlocal(`sysgemNotEnough`),
            //     needCancel : false,
            // });
        }
    };
    RetWinPopupView.prototype.netEventCallBack = function (evt) {
        var data = evt.data;
        if (data && data.ret) {
            switch (data.data.cmd) {
                case NetConst.USER_RESETWIN:
                    this.closeHandler();
                    break;
                default:
                    break;
            }
        }
    };
    RetWinPopupView.prototype.closeHandler = function () {
        _super.prototype.closeHandler.call(this);
        ViewController.getInstance().openView(ViewConst.USERINFO_POPUPVIEW);
    };
    RetWinPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.confirmBtnOnClick, this);
        this.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, this.viewBg, [0, 15]);
        this.confirmBtn = btn;
        var icon = BaseBitmap.create("ab_mainui_gem");
        btn.addChild(icon);
        icon.x = btn.width / 2 - icon.width;
        icon.y = (btn.height - icon.height) / 2;
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_28, ColorEnums.white);
        btn.addChild(txt);
        txt.width = btn.width / 2;
        // txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.text = String(this.needGem);
        txt.x = icon.x + icon.width;
        txt.y = icon.y + (icon.height - txt.height) / 2 + 5;
    };
    RetWinPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    RetWinPopupView.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
    };
    // 需要加载的资源
    RetWinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this);
    };
    RetWinPopupView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
    };
    RetWinPopupView.prototype.showLineFrame = function () {
        return false;
    };
    RetWinPopupView.prototype.checkShowContentBg = function () {
        return false;
    };
    // 弹框面板宽度，高度动态计算
    // protected getShowWidth():number
    // {
    //     return 554;
    // }
    // 弹框面板高度，重新该方法后，不会动态计算高度
    RetWinPopupView.prototype.getShowHeight = function () {
        return 350;
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    RetWinPopupView.prototype.getBgExtraHeight = function () {
        return _super.prototype.getBgExtraHeight.call(this);
    };
    RetWinPopupView.prototype.getTitleStr = function () {
        return LangMger.getlocal("user_refresh_win_rate_title");
    };
    // 确认按钮名称
    RetWinPopupView.prototype.getConfirmBtnName = function () {
        return _super.prototype.getConfirmBtnName.call(this);
    };
    RetWinPopupView.prototype.getConfirmBtnStr = function () {
        return _super.prototype.getConfirmBtnStr.call(this);
    };
    RetWinPopupView.prototype.dispose = function () {
        this.confirmBtn = null;
        _super.prototype.dispose.call(this);
    };
    return RetWinPopupView;
}(PopupView));
__reflect(RetWinPopupView.prototype, "RetWinPopupView");
//# sourceMappingURL=RetWinPopupView.js.map