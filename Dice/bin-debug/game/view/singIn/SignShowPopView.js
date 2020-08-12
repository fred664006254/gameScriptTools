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
 * 每日签到确认面板 金币和钻石
 * author yangtao
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var SignShowPopView = (function (_super) {
    __extends(SignShowPopView, _super);
    function SignShowPopView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    SignShowPopView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        var bg = BaseBitmap.create("popupview_content1");
        bg.width = 110;
        bg.height = 110;
        bg.x = view.viewBg.x + 67;
        bg.y = 30;
        // view.addChildToContainer(bg);
        var itemGroup = GameData.getItemIcon(param.param); //, rewardVo.num);
        itemGroup.setScale(1.5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg, [-5, 0]);
        view.addChildToContainer(itemGroup);
        var iconTxt = ComponentMgr.getTextField("11", TextFieldConst.SIZE_28);
        iconTxt.text = "x" + param.param.num;
        view.addChildToContainer(iconTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconTxt, bg, [-5, 90]);
        var txtBg = BaseBitmap.create('bird_des_shop_bg');
        this.addChildToContainer(txtBg);
        txtBg.y = 0;
        txtBg.x = 203;
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        this.addChildToContainer(txt);
        txt.stroke = 2;
        txt.strokeColor = 0x0C2C77;
        txt.width = 240;
        txt.wordWrap = true;
        txt.lineSpacing = 10;
        txt.text = LangMger.getlocal(param.param.type == 1 ? "sign_diamond_introduce" : "sign_gold_introduce");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, txtBg, [38, 35]);
        // let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,param.costnum,view.clickConHandler,view);
        // view.addChildToContainer(conBtn);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, conBtn, bg, [0,15]);
    };
    SignShowPopView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        var param = view.param.data;
        var conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, param.costnum, view.clickConHandler, view);
        // if(param.costIcon){
        // 	conBtn.addTextIcon(param.costIcon);
        // 	conBtn.setColor(ColorEnums.white);
        // }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, view.viewBg, [0,0]);
        view.addChild(conBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, conBtn, view.viewBg, [0, 15]);
    };
    SignShowPopView.prototype.getBgExtraHeight = function () {
        return 150;
    };
    SignShowPopView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose == false) ? false : true;
    };
    SignShowPopView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
    };
    SignShowPopView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    // protected getShowHeight(){
    // 	return 500;
    // }
    SignShowPopView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    SignShowPopView.prototype.getCloseBtnName = function () {
        return this.param.data.needClose === 1 ? _super.prototype.getCloseBtnName.call(this) : null;
    };
    SignShowPopView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    SignShowPopView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    SignShowPopView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    SignShowPopView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SignShowPopView;
}(PopupView));
__reflect(SignShowPopView.prototype, "SignShowPopView");
//# sourceMappingURL=SignShowPopView.js.map