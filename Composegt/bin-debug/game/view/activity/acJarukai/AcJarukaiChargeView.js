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
var AcJarukaiChargeView = (function (_super) {
    __extends(AcJarukaiChargeView, _super);
    function AcJarukaiChargeView() {
        var _this = _super.call(this) || this;
        _this._timeCD = null;
        return _this;
    }
    Object.defineProperty(AcJarukaiChargeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiChargeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiChargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiChargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcJarukaiChargeView.prototype.getUiCode = function () {
        return this.code;
    };
    AcJarukaiChargeView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        var uicode = view.getUiCode();
        var bg = BaseBitmap.create("commonview_woodbg");
        bg.width = 553;
        bg.height = this.viewBg.height - 91;
        bg.x = (this.viewBg.width - bg.width) * 0.5 + 4;
        bg.y = this.viewBg.y + 61;
        this.addChildAt(bg, this.getChildIndex(this.viewBg) + 1);
        var redbg = view.container.getChildByName("newRedBg");
        redbg.height = 95;
        var timeDateTxt = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_acttimer", ["4\u67081\u65E5", "4\u67082\u65E5"]), 18, 0xFDF3B5);
        view.addChildToContainer(timeDateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDateTxt, redbg, [30, 20]);
        var acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acJarukaiChargeDesc", uicode)), 18, 0xFDF3B5);
        view.addChildToContainer(acDescTxt);
        acDescTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acDescTxt, timeDateTxt, [0, timeDateTxt.height + 8]);
        var end = App.DateUtil.getWeeTs(GameData.serverTime) + 86400;
        var str = LanguageManager.getlocal("acFanliReviewReward_acCD", [App.DateUtil.getFormatBySecond(end - GameData.serverTime)]);
        if (end == 0) {
            str = LanguageManager.getlocal("acSurprisedGiftViewTimeNotEnough");
        }
        var timeCDTxt = ComponentManager.getTextField(str, 18, 0xFDF3B5);
        view.addChildToContainer(timeCDTxt);
        view._timeCD = timeCDTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeCDTxt, redbg, [30, 20]);
        var list = ComponentManager.getScrollList(AcRechargeItem, [], new egret.Rectangle(0, 0, 522, 640));
        view.addChildToContainer(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, redbg, [0, redbg.height + 20]);
    };
    AcJarukaiChargeView.prototype.getBgExtraHeight = function () {
        return 60;
    };
    AcJarukaiChargeView.prototype.tick = function () {
        var view = this;
        var end = App.DateUtil.getWeeTs(GameData.serverTime) + 86400;
        var str = LanguageManager.getlocal("acFanliReviewReward_acCD", [App.DateUtil.getFormatBySecond(end - GameData.serverTime)]);
        if (end == 0) {
            str = LanguageManager.getlocal("acSurprisedGiftViewTimeNotEnough");
        }
        view._timeCD.text = str;
    };
    AcJarukaiChargeView.prototype.initView = function () {
    };
    AcJarukaiChargeView.prototype.isHaveTitle = function () {
        return true;
    };
    AcJarukaiChargeView.prototype.initPartReward = function (resultStr, must) {
        // public_listbg3
        // shopview_redbg
    };
    AcJarukaiChargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "commonview_woodbg", "shopview_redbg"
        ]);
    };
    AcJarukaiChargeView.prototype.getShowHeight = function () {
        return 900;
    };
    AcJarukaiChargeView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acJarukaiCharge", this.getUiCode());
    };
    AcJarukaiChargeView.prototype.dispose = function () {
        var view = this;
        view._timeCD = null;
        _super.prototype.dispose.call(this);
    };
    return AcJarukaiChargeView;
}(PopupView));
__reflect(AcJarukaiChargeView.prototype, "AcJarukaiChargeView");
