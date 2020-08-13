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
 * author:qianjun
 * desc:活动弹窗
*/
var AcAnnualPrayGetRewardPopupView = (function (_super) {
    __extends(AcAnnualPrayGetRewardPopupView, _super);
    function AcAnnualPrayGetRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._stop = false;
        return _this;
    }
    Object.defineProperty(AcAnnualPrayGetRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayGetRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayGetRewardPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayGetRewardPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayGetRewardPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualPrayGetRewardPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcAnnualPrayGetRewardPopupView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("annualpraygetrewardbg", this.getUiCode());
    };
    AcAnnualPrayGetRewardPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "annualpraygetrewardbg-1",
        ]).concat(arr);
    };
    AcAnnualPrayGetRewardPopupView.prototype.initView = function () {
        var view = this;
    };
    AcAnnualPrayGetRewardPopupView.prototype.getShowWidth = function () {
        return 600;
    };
    AcAnnualPrayGetRewardPopupView.prototype.getShowHeight = function () {
        return 728;
    };
    AcAnnualPrayGetRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcAnnualPrayGetRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcAnnualPrayGetRewardPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcAnnualPrayGetRewardPopupView.prototype.resetBgSize = function () {
        var view = this;
        _super.prototype.resetBgSize.call(this);
        var index = view.param.data.index;
        var code = view.getUiCode();
        var titleImg = BaseBitmap.create(App.CommonUtil.getResByCode("annualpraygetrewardtitle", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, this.viewBg, [0, 70]);
        view.addChild(titleImg);
        if (!index) {
            index = App.MathUtil.getRandom(1, 5);
        }
        var str = "annualpraybless" + index + "-" + code;
        if (!RES.hasRes(str)) {
            str = "annualpraybless1-" + code;
        }
        var flag = BaseLoadBitmap.create(str);
        flag.width = 197;
        flag.height = 166;
        flag.anchorOffsetX = flag.width / 2;
        flag.anchorOffsetY = flag.height / 2;
        view.addChild(flag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, flag, this.viewBg, [25 + GameData.popupviewOffsetX, 60]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip7", code)), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.lineSpacing = 18;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, titleImg, [0, titleImg.height + 20]);
        var tipBg = BaseBitmap.create("public_9_bg87");
        view.addChild(tipBg);
        var getTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acAnnualPrayPrayTip8", code), [view.param.data.add]), 20, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(getTotalTxt);
        tipBg.width = getTotalTxt.textWidth + 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, tipTxt, [0, tipTxt.textHeight + 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getTotalTxt, tipBg);
        var group = new BaseDisplayObjectContainer();
        group.width = 550;
        view.addChild(group);
        var icons = GameData.getRewardItemIcons(view.param.data.rewards, true);
        var tmpX = 0;
        var tmpY = 0;
        var len = icons.length;
        if (len <= 5) {
            tmpX = (group.width - len * (109)) / 2;
            tmpY = (245 - 108) / 2;
        }
        else {
            tmpX = 0;
            tmpY = 10;
        }
        for (var i = 0; i < len; ++i) {
            var element = icons[i];
            element.x = tmpX + (109) * (i % 5);
            element.y = tmpY + (111) * (Math.floor(i / 5));
            group.addChild(element);
        }
        group.height += 20;
        var scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, 550, 245));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, tipBg, [0, tipBg.height + 10]);
        view.addChild(scrollview);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sysConfirm", view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, this.viewBg, [0, 100]);
        view.addChild(btn);
        view._stop = true;
        flag.alpha = 0;
        flag.setScale(4);
        egret.Tween.get(flag).wait(500).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400).call(function () {
            egret.Tween.removeTweens(flag);
            view._stop = false;
        }, view);
    };
    AcAnnualPrayGetRewardPopupView.prototype.hide = function () {
        var view = this;
        if (view._stop) {
            return;
        }
        if (this.param.data.callObj && this.param.data.callFunc) {
            this.param.data.callFunc.apply(this.param.data.callObj);
        }
        _super.prototype.hide.call(this);
    };
    AcAnnualPrayGetRewardPopupView.prototype.dispose = function () {
        var view = this;
        view._stop = false;
        _super.prototype.dispose.call(this);
    };
    return AcAnnualPrayGetRewardPopupView;
}(PopupView));
__reflect(AcAnnualPrayGetRewardPopupView.prototype, "AcAnnualPrayGetRewardPopupView");
//# sourceMappingURL=AcAnnualPrayGetRewardPopupView.js.map