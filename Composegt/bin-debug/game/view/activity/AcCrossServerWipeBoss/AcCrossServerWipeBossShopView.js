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
var AcCrossServerWipeBossShopView = (function (_super) {
    __extends(AcCrossServerWipeBossShopView, _super);
    function AcCrossServerWipeBossShopView() {
        var _this = _super.call(this) || this;
        _this._gemGroup = null;
        _this._gemTxt = null;
        _this._pointTxt = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossShopView.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossShopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossShopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossShopView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB_OLD;
    };
    AcCrossServerWipeBossShopView.prototype.getTabbarTextArr = function () {
        return [
            "accrossserverwipeBossShopTab1",
            "accrossserverwipeBossShopTab2",
        ];
    };
    AcCrossServerWipeBossShopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_bottombg",
            "servant_topnumbg"
        ]);
    };
    // protected setTabBarPosition():void
    // {
    // 	if(this.tabbarGroup)
    // 	{
    // 		let tabX:number=0;
    // 		let tabY:number=0;
    // 		if(egret.is(this,"PopupView"))
    // 		{
    // 			tabX=this.viewBg.x+30;
    // 			tabY=this.viewBg.y+60;
    // 		}
    // 		else
    // 		{
    // 			tabX=15;
    //             tabY=this.titleBg?this.titleBg.y+this.titleBg.height:92;
    // 		}
    // 		tabY+=this.getTabbarGroupY();;
    // 		this.tabbarGroup.setPosition(tabX,tabY);
    // 	}
    // }
    AcCrossServerWipeBossShopView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcCrossServerWipeBossShopView.prototype.getTabbarGroupY = function () {
        return 60;
    };
    AcCrossServerWipeBossShopView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        view._gemGroup.visible = data.index == 0;
        view._pointTxt.visible = !view._gemGroup.visible;
    };
    AcCrossServerWipeBossShopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.freshView, view);
        var Bg = BaseBitmap.create("public_tc_bg01");
        Bg.width = 526;
        Bg.height = 610;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0, 115]);
        view.addChildToContainer(Bg);
        this.tabbarGroup.setSpace(10);
        var txtBg = BaseBitmap.create("public_tc_bg02");
        txtBg.x = this.viewBg.width / 2 - txtBg.width / 2;
        txtBg.y = 15;
        this.addChildToContainer(txtBg);
        var gemGroup = new BaseDisplayObjectContainer();
        gemGroup.width = 150;
        gemGroup.height = 35;
        gemGroup.x = txtBg.x + txtBg.width / 2 - gemGroup.width / 2;
        gemGroup.y = txtBg.y + txtBg.height / 2 - gemGroup.height / 2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, gemGroup, txtBg, [0,0], true);
        view.addChildToContainer(gemGroup);
        view._gemGroup = gemGroup;
        // let servantNumBg = BaseBitmap.create("public_9_resbg");
        // // servantNumBg.width = 130;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0,0], true);
        // gemGroup.addChild(servantNumBg);
        var gemIcon = BaseBitmap.create("public_icon1");
        gemIcon.x = 0;
        gemIcon.y = gemGroup.height / 2 - gemIcon.height / 2;
        gemGroup.addChild(gemIcon);
        var gemTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        gemTxt.x = gemIcon.x + gemIcon.width + 10;
        gemTxt.y = gemGroup.height / 2 - gemTxt.height / 2;
        gemGroup.addChild(gemTxt);
        view._gemTxt = gemTxt;
        var pointTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        pointTxt.visible = false;
        pointTxt.x = this.viewBg.width / 2 - pointTxt.width / 2;
        pointTxt.y = txtBg.y + txtBg.height / 2 - pointTxt.height / 2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, view.container, [0,25], true);
        view.addChildToContainer(pointTxt);
        view._pointTxt = pointTxt;
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1, null, null, 5, -3);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcCrossServerWipeBossShopView.prototype.getShowWidth = function () {
        return 570;
    };
    AcCrossServerWipeBossShopView.prototype.getShowHeight = function () {
        return 820;
    };
    AcCrossServerWipeBossShopView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1, null, null, 5, -3);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._gemTxt, servantNumBg, [gemIcon.width * gemIcon.scaleX, 0]);
        view._pointTxt.text = LanguageManager.getlocal('accrossserverwipeBossPoint', [App.StringUtil.changeIntToText(view.vo.getActPoints())]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [-10,25], true);
        view._pointTxt.x = this.viewBg.width / 2 - view._pointTxt.width / 2;
    };
    AcCrossServerWipeBossShopView.prototype.getTitleStr = function () {
        return 'accrossserverwipeBossShop';
    };
    AcCrossServerWipeBossShopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.freshView, view);
        view._gemGroup.dispose();
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossShopView;
}(PopupView));
__reflect(AcCrossServerWipeBossShopView.prototype, "AcCrossServerWipeBossShopView");
