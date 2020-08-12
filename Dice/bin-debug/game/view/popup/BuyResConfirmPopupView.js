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
 * 购买资源通用确认面板 金币和钻石
 * author qianjun
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var BuyResConfirmPopupView = (function (_super) {
    __extends(BuyResConfirmPopupView, _super);
    function BuyResConfirmPopupView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    BuyResConfirmPopupView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        var bg = null;
        if (param.id && param.id != "") {
            bg = BaseBitmap.create("popupview_content1");
            bg.width = 160;
            bg.height = 160;
            bg.x = view.viewBg.x + view.viewBg.width / 2 - bg.width * bg.scaleX / 2;
            bg.y = 20;
            view.addChildToContainer(bg);
            var rewardVo = GameData.formatRewardItem(param.id)[0];
            var itemGroup = GameData.getItemIcon(rewardVo, rewardVo.num);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg);
            view.addChildToContainer(itemGroup);
            var iconbg = itemGroup.getChildByName("iconBg");
            iconbg.visible = false;
        }
        // let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
        // view.addChildToContainer(numTxt)
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, itemGroup, [0,itemGroup.height]);
        var messageStr = view.param.data.msg;
        var msgTF = ComponentMgr.getTextField(messageStr, TextFieldConst.SIZE_CONTENT_COMMON);
        msgTF.setColor(view.param.data.txtcolor ? view.param.data.txtcolor : ColorEnums.black);
        view.addChildToContainer(msgTF);
        if (bg) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, msgTF, bg, [0, bg.height + 20]);
        }
        else {
            msgTF.textAlign = egret.HorizontalAlign.CENTER;
            msgTF.width = this.getShowWidth() - 20;
            msgTF.x = 10;
            msgTF.y = 50;
        }
        // let line = BaseBitmap.create(`public_line1`);
        // line.width = 506;
        // view.addChildToContainer(line);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, msgTF, [0,msgTF.height+20]);
        var conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, param.costnum, view.clickConHandler, view);
        conBtn.addTextIcon(param.costIcon);
        conBtn.setColor(ColorEnums.white);
        this.addChildToContainer(conBtn);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, line, [0,line.height+25]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, conBtn, view.viewBg, [0, 0]);
        if (bg) {
            conBtn.y = 330;
        }
        else {
            var temY = Math.max(140, msgTF.y + msgTF.height + 30);
            conBtn.y = temY;
        }
        if (view.param.data.needCancel) {
            var canelStr = "canelStr";
            if (this.param.data.canelTxt) {
                canelStr = this.param.data.canelTxt;
            }
            var cancelBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal(canelStr), this.clickCancelHandler, this);
            cancelBtn.setColor(ColorEnums.white);
            cancelBtn.x = 80;
            // cancelBtn.y = line.y + line.height + 25;
            this.addChildToContainer(cancelBtn);
            conBtn.x = 330;
        }
    };
    BuyResConfirmPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
    };
    BuyResConfirmPopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    BuyResConfirmPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    BuyResConfirmPopupView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    // protected getShowHeight(){
    // 	return 500;
    // }
    BuyResConfirmPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    BuyResConfirmPopupView.prototype.getCloseBtnName = function () {
        return this.param.data.needClose === 1 ? _super.prototype.getCloseBtnName.call(this) : null;
    };
    BuyResConfirmPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    BuyResConfirmPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    BuyResConfirmPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    BuyResConfirmPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BuyResConfirmPopupView;
}(PopupView));
__reflect(BuyResConfirmPopupView.prototype, "BuyResConfirmPopupView");
//# sourceMappingURL=BuyResConfirmPopupView.js.map