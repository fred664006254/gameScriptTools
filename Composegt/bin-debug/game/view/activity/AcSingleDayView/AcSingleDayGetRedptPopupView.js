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
 * 获得代金券
 * author qianjun
 */
var AcSingleDayGetRedptPopupView = (function (_super) {
    __extends(AcSingleDayGetRedptPopupView, _super);
    function AcSingleDayGetRedptPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcSingleDayGetRedptPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayGetRedptPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayGetRedptPopupView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayGetRedptPopupView.prototype.getTitleStr = function () {
        return 'itemBtn';
    };
    AcSingleDayGetRedptPopupView.prototype.initView = function () {
        var view = this;
        var data = this.param.data;
        var itemid = data.id;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 250;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        view.addChildToContainer(bg);
        var itemcfg = view.cfg.coupon[itemid - 1];
        var descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetRed'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, bg, [0, 20]);
        view.addChildToContainer(descTxt1);
        // let iconPic:string = data.icon;
        // let iconBg:string = data.iconBg;
        // let msg:string = data.msg;
        // let num = data.num;
        // let useNum = data.useNum || 0;
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 515;
        bg2.height = 150;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, descTxt1, [0, descTxt1.textHeight + 10]);
        view.addChildToContainer(bg2);
        var cor1 = BaseBitmap.create("public_tcdw_bg01");
        cor1.x = bg2.x;
        cor1.y = bg2.y;
        this.addChildToContainer(cor1);
        var cor2 = BaseBitmap.create("public_tcdw_bg02");
        cor2.x = bg2.x + bg2.width - cor2.width;
        cor2.y = bg2.y;
        this.addChildToContainer(cor2);
        var icon = GameData.getRewardItemIcons("25_" + itemid + "_1_" + view.cfg.coupon[itemid - 1].value, true, false)[0];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg2);
        view.addChildToContainer(icon);
    };
    AcSingleDayGetRedptPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        // view.setLayoutPosition(LayoutConst.leftbottom, view._cancelBtn, view._bg, [65,10]);
        // view.setLayoutPosition(LayoutConst.rightbottom, view._confirmBtn, view._bg, [65,10]);
        //this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
    };
    AcSingleDayGetRedptPopupView.prototype.clickConfirmHandler = function (data) {
        this.hide();
    };
    AcSingleDayGetRedptPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    AcSingleDayGetRedptPopupView.prototype.clickCancelHandler = function (param) {
        this.hide();
    };
    AcSingleDayGetRedptPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcSingleDayGetRedptPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    AcSingleDayGetRedptPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayGetRedptPopupView;
}(PopupView));
__reflect(AcSingleDayGetRedptPopupView.prototype, "AcSingleDayGetRedptPopupView");
