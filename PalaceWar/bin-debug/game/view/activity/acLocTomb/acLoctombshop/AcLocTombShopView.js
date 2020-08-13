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
var AcLocTombShopView = (function (_super) {
    __extends(AcLocTombShopView, _super);
    function AcLocTombShopView() {
        var _this = _super.call(this) || this;
        _this._gemGroup = null;
        _this._gemTxt = null;
        _this._pointTxt = null;
        return _this;
    }
    Object.defineProperty(AcLocTombShopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombShopView.prototype.getTabbarTextArr = function () {
        return [
            "acwipeBossShopTab1",
            "acwipeBossShopTab2",
        ];
    };
    AcLocTombShopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_bottombg",
            "servant_topnumbg"
        ]);
    };
    AcLocTombShopView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        view._gemGroup.visible = data.index == 0;
        view._pointTxt.visible = !view._gemGroup.visible;
    };
    AcLocTombShopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH, view.freshView, view);
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
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0, 0], true);
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
    AcLocTombShopView.prototype.getShowWidth = function () {
        return 570;
    };
    AcLocTombShopView.prototype.getShowHeight = function () {
        return 692;
    };
    AcLocTombShopView.prototype.freshView = function () {
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
    AcLocTombShopView.prototype.getTitleStr = function () {
        return 'acwipeBossShop';
    };
    AcLocTombShopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH, view.freshView, view);
        view._gemGroup.dispose();
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombShopView;
}(PopupView));
__reflect(AcLocTombShopView.prototype, "AcLocTombShopView");
//# sourceMappingURL=AcLocTombShopView.js.map