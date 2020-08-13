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
 * 加入成功
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var AcThreeKingdomsSelectSuccessView = (function (_super) {
    __extends(AcThreeKingdomsSelectSuccessView, _super);
    function AcThreeKingdomsSelectSuccessView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        return _this;
    }
    AcThreeKingdomsSelectSuccessView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("threekingdomselectsuccessbg", "1");
    };
    AcThreeKingdomsSelectSuccessView.prototype.getCloseBtnName = function () {
        return App.CommonUtil.getResByCode("threekingdomsclose", "1");
    };
    AcThreeKingdomsSelectSuccessView.prototype.getTitleBgName = function () {
        return null;
    };
    // 打开该面板时，需要传参数msg
    AcThreeKingdomsSelectSuccessView.prototype.initView = function () {
        var view = this;
        var title = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomselectsuccess" + view.param.data.team, "1"));
        view.addChildToContainer(title);
        title.x = this.viewBg.x + this.viewBg.width / 2 - title.width / 2;
        title.y = -40;
        var msgTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip21", "1"), [LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTeam" + view.param.data.team, "1"))]), 18, TextFieldConst.COLOR_BROWN);
        msgTF.width = 350;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.lineSpacing = 5;
        msgTF.y = 170;
        this.addChildToContainer(msgTF);
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    AcThreeKingdomsSelectSuccessView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var pen = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdompen", "1"));
        this.addChild(pen);
        pen.setPosition(this.viewBg.x + this.viewBg.width - 90, this.viewBg.y + 160);
        var conBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, this.param.data.confirmTxt ? this.param.data.confirmTxt : "confirmBtn", this.clickConHandler, this);
        conBtn.setColor(TextFieldConst.COLOR_BROWN);
        conBtn.x = this.viewBg.x + this.viewBg.width - conBtn.width - 80;
        conBtn.y = this.viewBg.y + this.viewBg.height + 40;
        this.addChild(conBtn);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode("acThreeKingdomsTip20", "1"), this.clickCancelHandler, this);
        cancelBtn.setColor(TextFieldConst.COLOR_BROWN);
        cancelBtn.x = this.viewBg.x + 80;
        cancelBtn.y = this.viewBg.y + this.viewBg.height + 40;
        this.addChild(cancelBtn);
        var flag = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomselectsuccessflag", "1"));
        this.addChild(flag);
        flag.alpha = 0;
        flag.anchorOffsetX = flag.width / 2;
        flag.anchorOffsetY = flag.height / 2;
        flag.setPosition(this.viewBg.x + this.viewBg.width - flag.width / 2, this.viewBg.y + 45 + flag.height / 2);
        flag.setScale(1.5);
        egret.Tween.get(flag).wait(600).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300).call(function () {
            egret.Tween.removeTweens(flag);
        }, this);
    };
    AcThreeKingdomsSelectSuccessView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    AcThreeKingdomsSelectSuccessView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    AcThreeKingdomsSelectSuccessView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        //关闭到预热
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_RULEOUT);
        this.hide();
    };
    AcThreeKingdomsSelectSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsSelectSuccessView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    AcThreeKingdomsSelectSuccessView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcThreeKingdomsSelectSuccessView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsSelectSuccessView;
}(PopupView));
__reflect(AcThreeKingdomsSelectSuccessView.prototype, "AcThreeKingdomsSelectSuccessView");
//# sourceMappingURL=AcThreeKingdomsSelectSuccessView.js.map