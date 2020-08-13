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
 * desc:活动商店
*/
var AcWipeBossShopView = (function (_super) {
    __extends(AcWipeBossShopView, _super);
    function AcWipeBossShopView() {
        var _this = _super.call(this) || this;
        _this._gemGroup = null;
        _this._gemTxt = null;
        _this._pointTxt = null;
        return _this;
    }
    Object.defineProperty(AcWipeBossShopView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossShopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossShopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossShopView.prototype.getTabbarTextArr = function () {
        return [
            "acwipeBossShopTab1",
            "acwipeBossShopTab2",
        ];
    };
    AcWipeBossShopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_bottombg",
            "servant_topnumbg"
        ]);
    };
    AcWipeBossShopView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        view._gemGroup.visible = data.index == 0;
        view._pointTxt.visible = !view._gemGroup.visible;
    };
    AcWipeBossShopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.freshView, view);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 526;
        Bg.height = 526;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0, 55]);
        view.addChildToContainer(Bg);
        var gemGroup = new BaseDisplayObjectContainer();
        gemGroup.width = 150;
        gemGroup.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, gemGroup, view.container, [15, 15], true);
        view.addChildToContainer(gemGroup);
        view._gemGroup = gemGroup;
        var servantNumBg = BaseBitmap.create("public_9_resbg");
        // servantNumBg.width = 130;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [20, 0], true);
        gemGroup.addChild(servantNumBg);
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.scaleX = 45 / gemIcon.width;
        gemIcon.scaleY = 45 / gemIcon.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemIcon, servantNumBg, [0, 0]);
        gemGroup.addChild(gemIcon);
        var gemTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, servantNumBg, [gemIcon.width * gemIcon.scaleX, 0]);
        gemGroup.addChild(gemTxt);
        view._gemTxt = gemTxt;
        var pointTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        pointTxt.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, pointTxt, view.container, [-10, 25], true);
        view.addChildToContainer(pointTxt);
        view._pointTxt = pointTxt;
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcWipeBossShopView.prototype.getShowWidth = function () {
        return 570;
    };
    AcWipeBossShopView.prototype.getShowHeight = function () {
        return 692;
    };
    AcWipeBossShopView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._gemTxt, servantNumBg, [gemIcon.width * gemIcon.scaleX, 0]);
        view._pointTxt.text = LanguageManager.getlocal('acwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [-10, 25], true);
    };
    AcWipeBossShopView.prototype.getTitleStr = function () {
        return 'acwipeBossShop';
    };
    AcWipeBossShopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.freshView, view);
        view._gemGroup.dispose();
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossShopView;
}(PopupView));
__reflect(AcWipeBossShopView.prototype, "AcWipeBossShopView");
//# sourceMappingURL=AcWipeBossShopView.js.map