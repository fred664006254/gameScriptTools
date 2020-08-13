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
author : qinajun
date : 2018.4.14
desc : 消除奖励
*/
var AcDestroySamePopupViewTab4 = (function (_super) {
    __extends(AcDestroySamePopupViewTab4, _super);
    //滑动列表
    function AcDestroySamePopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDestroySamePopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySamePopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySamePopupViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySamePopupViewTab4.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDestroySamePopupViewTab4.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 545 - 10;
        Bg.height = 640;
        Bg.x = 27 + 5;
        Bg.y = 55;
        view.addChild(Bg);
        var tipbg = BaseBitmap.create("countrywarrewardview_itembg");
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameRewardTip", this.code, this.getUiCode())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipbg.width = 450;
        view.addChild(tipbg);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, Bg, [0, 12]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        var vo = this.vo;
        var arr = [1, 2, 3];
        var tmpRect = new egret.Rectangle(0, 0, 530, 585);
        var scrollList = ComponentManager.getScrollList(AcDestroySameRewardItem, arr, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tipbg, [0, tipbg.height + 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcDestroySamePopupViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcDestroySamePopupViewTab4;
}(AcCommonViewTab));
__reflect(AcDestroySamePopupViewTab4.prototype, "AcDestroySamePopupViewTab4");
//# sourceMappingURL=AcDestroySamePopupViewTab4.js.map